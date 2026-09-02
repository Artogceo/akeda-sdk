"""Тонкий рантайм поверх сгенерированных типов.

Клиент НЕ содержит 770 методов. Операции описаны контрактом, и метод на каждую —
это ещё один список, который расходится с контрактом молча. Вместо этого один
вызов ``call(operation_id, …)``, а форма операции берётся из сгенерированной
карты ``OPERATIONS``.

Руками здесь написано ровно то, где нужны решения: адрес контура, заголовки,
что делать с ``Idempotency-Key`` у операции, которая его не читает, когда
повтор осмыслен, а когда он второй раз проводит документ.

Зависимостей нет: только стандартная библиотека. Партнёр ставит SDK в свой
контур, и лишняя зависимость там — это чужой код на его машине.
"""

from __future__ import annotations

import json
import time
import urllib.error
import urllib.parse
import urllib.request
from typing import Any, Dict, Iterable, Mapping, Optional, Sequence, Tuple

from .credentials import Credentials
from .errors import (
    AkedaError,
    AkedaTransportError,
    AkedaUsageError,
    RateLimitState,
    error_from_response,
    read_rate_limit,
)
from .generated.operations import OPERATIONS, OperationSpec

#: Известные контуры. Адрес задаётся, а не вшивается: контуров больше одного.
ENVIRONMENTS = {"production": "https://erp.akeda.ru"}

_SAFE_METHODS = frozenset({"GET", "HEAD", "OPTIONS"})

#: Операции, читающие Idempotency-Key. Список приходит из контракта, а не пишется
#: здесь; переменная нужна лишь для внятного текста отказа.
IDEMPOTENT_OPERATIONS: Tuple[str, ...] = tuple(
    sorted(name for name, spec in OPERATIONS.items() if spec.idempotent)
)


class RawResponse:
    __slots__ = ("status", "headers", "body")

    def __init__(self, status: int, headers: Mapping[str, str], body: bytes) -> None:
        self.status = status
        self.headers = dict(headers)
        self.body = body


class Transport:
    """Как уходит запрос. Отдельный объект — чтобы тесты не ходили в сеть."""

    def send(
        self, method: str, url: str, headers: Mapping[str, str], body: Optional[bytes], timeout: float
    ) -> RawResponse:  # pragma: no cover - интерфейс
        raise NotImplementedError


class UrllibTransport(Transport):
    def send(
        self, method: str, url: str, headers: Mapping[str, str], body: Optional[bytes], timeout: float
    ) -> RawResponse:
        request = urllib.request.Request(url, data=body, method=method)
        for name, value in headers.items():
            request.add_header(name, value)
        try:
            with urllib.request.urlopen(request, timeout=timeout) as response:
                return RawResponse(response.status, dict(response.headers.items()), response.read())
        except urllib.error.HTTPError as error:  # отказ — это ответ, а не сбой транспорта
            return RawResponse(error.code, dict(error.headers.items()), error.read())
        except urllib.error.URLError as error:
            raise AkedaTransportError(f"запрос {method} {url} не выполнен: {error}") from error


class Result:
    __slots__ = ("data", "status", "headers", "idempotent_replay", "rate_limit", "request_id")

    def __init__(
        self,
        data: Any,
        status: int,
        headers: Mapping[str, str],
        idempotent_replay: bool,
        rate_limit: RateLimitState,
        request_id: Optional[str],
    ) -> None:
        self.data = data
        self.status = status
        self.headers = dict(headers)
        self.idempotent_replay = idempotent_replay
        self.rate_limit = rate_limit
        self.request_id = request_id


class AkedaClient:
    def __init__(
        self,
        base_url: str,
        credentials: Credentials,
        tenant: Optional[str] = None,
        accept_language: str = "ru",
        timeout: float = 30.0,
        max_retries: int = 2,
        user_agent: str = "akeda-sdk-python",
        transport: Optional[Transport] = None,
        sleep=time.sleep,
    ) -> None:
        if not base_url or not base_url.startswith(("http://", "https://")):
            raise AkedaUsageError("base_url обязателен и должен начинаться с http:// или https://")
        self.base_url = base_url.rstrip("/")
        self.credentials = credentials
        self.tenant = tenant.strip() if tenant else None
        if credentials.requires_tenant_header and not self.tenant:
            # Личный ключ без кабинета отвечает 400 tenant_required, кабинетный —
            # работает. Разница видна только в проде, поэтому спрашиваем сразу.
            raise AkedaUsageError(
                "для ключа ak_… нужен tenant: личный ключ без заголовка X-Tenant "
                "отвечает 400 tenant_required"
            )
        self.accept_language = accept_language
        self.timeout = timeout
        self.max_retries = max_retries
        self.user_agent = user_agent
        self.transport = transport or UrllibTransport()
        self._sleep = sleep

    def spec(self, operation_id: str) -> OperationSpec:
        try:
            return OPERATIONS[operation_id]
        except KeyError:
            raise AkedaUsageError(f"операции {operation_id} нет в контракте этого снимка") from None

    def call(
        self,
        operation_id: str,
        params: Optional[Mapping[str, Any]] = None,
        query: Optional[Mapping[str, Any]] = None,
        body: Any = None,
        idempotency_key: Optional[str] = None,
        headers: Optional[Mapping[str, str]] = None,
    ) -> Result:
        spec = self.spec(operation_id)

        if idempotency_key is not None and not spec.idempotent:
            raise AkedaUsageError(
                f"операция {operation_id} не читает Idempotency-Key. Заголовок был бы отброшен "
                "сервером, а вызывающий считал бы повтор защищённым. Заголовок читают только: "
                + ", ".join(IDEMPOTENT_OPERATIONS)
            )

        url = self._build_url(spec, params, query)
        request_headers: Dict[str, str] = {
            "Accept": "application/json",
            "Accept-Language": self.accept_language,
            "X-Akeda-Client": self.user_agent,
        }
        request_headers.update(self.credentials.headers(self.tenant))
        if headers:
            request_headers.update(headers)
        if idempotency_key:
            request_headers["Idempotency-Key"] = idempotency_key

        payload: Optional[bytes] = None
        if body is not None:
            payload = json.dumps(body, ensure_ascii=False).encode("utf-8")
            request_headers["Content-Type"] = "application/json"

        return self._send(spec, url, request_headers, payload)

    # ---- внутреннее ------------------------------------------------------

    def _build_url(
        self,
        spec: OperationSpec,
        params: Optional[Mapping[str, Any]],
        query: Optional[Mapping[str, Any]],
    ) -> str:
        path = spec.path
        for name, value in (params or {}).items():
            token = "{" + name + "}"
            if token not in path:
                raise AkedaUsageError(f"у операции нет параметра пути {name}")
            path = path.replace(token, urllib.parse.quote(str(value), safe=""))
        if "{" in path:
            missing = path[path.index("{") + 1 : path.index("}")]
            raise AkedaUsageError(f"не задан параметр пути {missing}")

        pairs = []
        for name, value in (query or {}).items():
            if value is None:
                continue
            if name == "limit" and spec.page_size_max is not None and int(value) > spec.page_size_max:
                # Просьба сверх потолка НЕ даёт 400. Сервер либо урежет выборку,
                # либо сбросит её к умолчанию — и укороченная страница читается
                # вызывающим как «данных больше нет». Отказываем здесь.
                raise AkedaUsageError(
                    f"limit={value} больше объявленного потолка {spec.page_size_max}. "
                    "Сервер не ответит ошибкой: он молча вернёт меньше, "
                    "и это прочитается как конец выборки."
                )
            if isinstance(value, bool):
                pairs.append((name, "true" if value else "false"))
            elif isinstance(value, (list, tuple)):
                pairs.extend((name, str(item)) for item in value)
            else:
                pairs.append((name, str(value)))
        suffix = urllib.parse.urlencode(pairs)
        return f"{self.base_url}{path}" + (f"?{suffix}" if suffix else "")

    def _send(
        self, spec: OperationSpec, url: str, headers: Mapping[str, str], body: Optional[bytes]
    ) -> Result:
        # Повторяем только то, что безопасно повторить: чтение либо команду с
        # ключом идемпотентности. Автоповтор POST без ключа проводит документ
        # дважды — цена ошибки здесь несопоставима с удобством.
        safe = spec.method in _SAFE_METHODS or "Idempotency-Key" in headers
        attempts = self.max_retries + 1 if safe else 1

        last: Optional[AkedaError] = None
        for attempt in range(attempts):
            response = self.transport.send(spec.method, url, headers, body, self.timeout)
            parsed = _decode(response)
            if 200 <= response.status < 300:
                return Result(
                    data=parsed,
                    status=response.status,
                    headers=response.headers,
                    idempotent_replay=_header(response.headers, "Idempotent-Replay") == "true",
                    rate_limit=read_rate_limit(response.headers),
                    request_id=_header(response.headers, "X-Request-ID"),
                )
            last = error_from_response(spec.method, url, response.status, response.headers, parsed)
            if not last.retryable or attempt == attempts - 1:
                raise last
            self._sleep(_backoff(attempt, last.retry_after))
        raise last or AkedaTransportError("повторы исчерпаны без ответа")


def _header(headers: Mapping[str, str], name: str) -> Optional[str]:
    lowered = name.lower()
    for key, value in headers.items():
        if key.lower() == lowered:
            return value
    return None


def _decode(response: RawResponse) -> Any:
    if response.status == 204 or not response.body:
        return None
    content_type = _header(response.headers, "Content-Type") or ""
    text = response.body.decode("utf-8", "replace")
    if "json" not in content_type:
        return text
    try:
        return json.loads(text)
    except ValueError:
        return text


def _backoff(attempt: int, retry_after: Optional[int]) -> float:
    # Retry-After — это просьба сервера, и она главнее нашей арифметики.
    if retry_after is not None and retry_after >= 0:
        return min(float(retry_after), 60.0)
    return min(2**attempt * 0.5, 8.0)


def operations_of_module(module: str) -> Sequence[str]:
    """Все операции модуля. Удобно для разведки контракта из REPL."""
    return tuple(sorted(name for name, spec in OPERATIONS.items() if spec.module == module))


def public_operations() -> Iterable[str]:
    """Операции стадии ``public``: только у них форма зафиксирована."""
    return tuple(sorted(name for name, spec in OPERATIONS.items() if spec.stage == "public"))
