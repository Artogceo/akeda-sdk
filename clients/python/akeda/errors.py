"""Разбор отказа Akeda.

Конверт один на весь контракт (схема ``Error``) и несёт ровно три поля:

``code``
    машинный код, по нему ветвится программа;
``detail``
    одно предложение на языке запроса, его читает человек;
``request_id``
    ИДЕНТИФИКАТОР СЛУЧАЯ, по нему вызывающий получает помощь.

Причины отказа в теле нет и не будет: ни SQL, ни имён таблиц, ни трассы стека.
Поэтому ``request_id`` — единственное, что имеет смысл нести в поддержку, и
исключение кладёт его прямо в текст сообщения, а не прячет в поле, которое
никто не смотрит.
"""

from __future__ import annotations

from typing import Any, Mapping, Optional


class AkedaUsageError(Exception):
    """Клиент собран или вызван неверно: ошибка программиста, а не сервера."""


class AkedaTransportError(Exception):
    """До сервера не дошли или ответ не разобрался."""


class RateLimitState:
    """Заголовки RateLimit-*; приходят и на успешном ответе."""

    __slots__ = ("limit", "remaining", "reset")

    def __init__(self, limit: Optional[int], remaining: Optional[int], reset: Optional[int]) -> None:
        self.limit = limit
        self.remaining = remaining
        self.reset = reset

    def __repr__(self) -> str:
        return f"RateLimitState(limit={self.limit}, remaining={self.remaining}, reset={self.reset})"


class AkedaError(Exception):
    """Отказ, о котором сервер сказал явно."""

    def __init__(
        self,
        status: int,
        code: Optional[str],
        detail: str,
        request_id: Optional[str],
        retry_after: Optional[int],
        rate_limit: RateLimitState,
        method: str,
        url: str,
        body: Any,
    ) -> None:
        suffix = f" (случай {request_id})" if request_id else ""
        super().__init__(f"Akeda {status}{' ' + code if code else ''}: {detail}{suffix}")
        self.status = status
        self.code = code
        self.detail = detail
        self.request_id = request_id
        self.retry_after = retry_after
        self.rate_limit = rate_limit
        self.method = method
        self.url = url
        self.body = body

    @property
    def retryable(self) -> bool:
        """Повтор осмыслен.

        Список закрыт намеренно. 429 и 503 сервер сам просит повторить; 409
        ``idempotency.in_progress`` означает «тот же ключ прямо сейчас
        выполняется» и тоже ждёт. Всё остальное — 4xx, и повтор того же запроса
        даст тот же ответ, только позже.
        """
        if self.status in (429, 503):
            return True
        return self.status == 409 and self.code == "idempotency.in_progress"


def _int_header(headers: Mapping[str, str], name: str) -> Optional[int]:
    raw = _get_header(headers, name)
    if raw is None:
        return None
    try:
        return int(raw.strip())
    except ValueError:
        return None


def _get_header(headers: Mapping[str, str], name: str) -> Optional[str]:
    lowered = name.lower()
    for key, value in headers.items():
        if key.lower() == lowered:
            return value
    return None


def read_rate_limit(headers: Mapping[str, str]) -> RateLimitState:
    return RateLimitState(
        _int_header(headers, "RateLimit-Limit"),
        _int_header(headers, "RateLimit-Remaining"),
        _int_header(headers, "RateLimit-Reset"),
    )


def error_from_response(
    method: str, url: str, status: int, headers: Mapping[str, str], body: Any
) -> AkedaError:
    envelope = body if isinstance(body, dict) else {}
    detail = envelope.get("detail")
    if not isinstance(detail, str) or not detail.strip():
        detail = f"Ответ {status} без пояснения."
    code = envelope.get("code")
    # request_id приходит и телом, и заголовком. Заголовок — запасной путь: тело
    # 4xx его не обязано нести, а идентификатор случая нужен именно тогда, когда
    # тело оказалось скупым.
    request_id = envelope.get("request_id")
    if not isinstance(request_id, str):
        request_id = _get_header(headers, "X-Request-ID")
    retry_after = envelope.get("retry_after")
    if not isinstance(retry_after, int):
        retry_after = _int_header(headers, "Retry-After")
    return AkedaError(
        status=status,
        code=code if isinstance(code, str) else None,
        detail=detail,
        request_id=request_id,
        retry_after=retry_after,
        rate_limit=read_rate_limit(headers),
        method=method,
        url=url,
        body=body,
    )
