"""Проверка подписи входящей доставки.

Это половина приёмника, которую нельзя списать с примера в документации:
реализация подписи существует в трёх местах — в диспетчере Akeda, в
опубликованном контракте ``snapshot/extension-delivery/v1/delivery-contract.json``
и здесь, — и расходиться им нечем: тесты пакета проверяют её теми же векторами,
что лежат в контракте.

ПОРЯДОК ПРОВЕРОК ЧАСТЬ ЗАЩИТЫ. Сначала HMAC, потом окно свежести. Обратный
порядок дал бы тому, у кого ключа нет, различимый по ответу способ нащупать
границу окна и подобрать момент для переигрывания перехваченного запроса.

КЛЮЧ ВЫБИРАЕТСЯ ПО ИДЕНТИФИКАТОРУ, а не перебором. Перебор принял бы подпись,
сделанную ключом, который отправитель не называл, и стёр бы единственный отказ,
по которому видно, что приёмник остался на секрете с кончившимся перекрытием
ротации.
"""

from __future__ import annotations

import hashlib
import hmac
import json
import time
from typing import Any, Callable, Dict, Iterable, Mapping, Optional, Sequence, Union

#: Версия схемы подписи. Входит в подписываемую строку, а не только в заголовок.
SIGNATURE_VERSION = "v1"

#: Окно свежести подписи, секунды. Двустороннее.
DEFAULT_WINDOW_SECONDS = 300

HEADER_SIGNATURE = "Akeda-Signature"
HEADER_KEY_ID = "Akeda-Signature-Key-Id"
HEADER_TIMESTAMP = "Akeda-Signature-Timestamp"
HEADER_INSTALLATION_ID = "Akeda-Installation-Id"
HEADER_EVENT_ID = "Akeda-Event-Id"

REQUIRED_ENVELOPE_FIELDS = (
    "event_id",
    "installation_id",
    "tenant_id",
    "occurred_at",
    "schema_version",
    "trace_id",
    "type",
    "idempotency_key",
)


class WebhookVerificationError(Exception):
    """Отказ проверки. ``reason`` называет причину машинно.

    Причина названа не ради красоты: приёмник, отвечающий на подделку молчаливым
    401, внешний разработчик отлаживает наугад.
    """

    def __init__(self, reason: str, message: str) -> None:
        super().__init__(message)
        self.reason = reason


class SigningKey:
    """Секрет подписи установки и идентификатор ключа, по которому его выбирают."""

    __slots__ = ("id", "secret")

    def __init__(self, id: str, secret: Union[str, bytes]) -> None:
        self.id = id.strip()
        self.secret = secret.encode("utf-8") if isinstance(secret, str) else secret

    def __repr__(self) -> str:
        return f"SigningKey(id={self.id!r}, secret=<скрыт>)"


class Signature:
    __slots__ = ("version", "key_id", "installation_id", "event_id", "issued_at_unix", "value")

    def __init__(
        self,
        version: str,
        key_id: str,
        installation_id: str,
        event_id: str,
        issued_at_unix: int,
        value: str = "",
    ) -> None:
        self.version = version
        self.key_id = key_id
        self.installation_id = installation_id
        self.event_id = event_id
        self.issued_at_unix = issued_at_unix
        self.value = value


HeaderSource = Union[Mapping[str, Any], Callable[[str], Optional[str]]]


def _reader(headers: HeaderSource) -> Callable[[str], Optional[str]]:
    if callable(headers):
        return headers
    lowered = {str(key).lower(): value for key, value in headers.items()}

    def read(name: str) -> Optional[str]:
        value = lowered.get(name.lower())
        if value is None:
            return None
        if isinstance(value, (list, tuple)):
            return str(value[0]) if value else None
        return str(value)

    return read


def signing_base(signature: Signature, body: bytes) -> bytes:
    """Подписываемая строка. Тело входит дайджестом, а не целиком."""
    digest = hashlib.sha256(body).hexdigest()
    return "\n".join(
        [
            signature.version,
            signature.key_id,
            str(signature.issued_at_unix),
            signature.installation_id,
            signature.event_id,
            digest,
        ]
    ).encode("utf-8")


def sign(key: SigningKey, signature: Signature, body: bytes) -> str:
    return hmac.new(key.secret, signing_base(signature, body), hashlib.sha256).hexdigest()


def parse_signature(headers: HeaderSource) -> Signature:
    read = _reader(headers)
    raw = (read(HEADER_SIGNATURE) or "").strip()
    if not raw:
        raise WebhookVerificationError("missing", "запрос без заголовков подписи")
    version, sep, value = raw.partition("=")
    version, value = version.strip(), value.strip()
    if not sep or not version or not value:
        raise WebhookVerificationError("malformed", "заголовок подписи не разбирается")
    try:
        issued_at = int((read(HEADER_TIMESTAMP) or "").strip())
    except ValueError:
        raise WebhookVerificationError("malformed", "заголовки подписи не разбираются") from None
    installation_id = (read(HEADER_INSTALLATION_ID) or "").strip()
    event_id = (read(HEADER_EVENT_ID) or "").strip()
    if not installation_id or not event_id:
        raise WebhookVerificationError("malformed", "заголовки подписи не разбираются")
    return Signature(
        version=version,
        key_id=(read(HEADER_KEY_ID) or "").strip(),
        installation_id=installation_id,
        event_id=event_id,
        issued_at_unix=issued_at,
        value=value,
    )


def verify_webhook(
    headers: HeaderSource,
    raw_body: Union[bytes, str],
    keys: Union[SigningKey, Sequence[SigningKey], Iterable[SigningKey]],
    now: Optional[float] = None,
    window_seconds: int = DEFAULT_WINDOW_SECONDS,
) -> Dict[str, Any]:
    """Полный приёмный контур: подпись, окно, разбор конверта и сверка с заголовками.

    ТЕЛО — СЫРЫЕ БАЙТЫ. Не разобранный JSON и не пересобранная строка: дайджест
    считается по тому, что пришло. Фреймворк, разбирающий тело до вас, ломает
    проверку подписи — включайте raw body.
    """
    body = raw_body.encode("utf-8") if isinstance(raw_body, str) else bytes(raw_body)
    signature = parse_signature(headers)

    if signature.version != SIGNATURE_VERSION:
        raise WebhookVerificationError(
            "version_unknown", f"неизвестная версия схемы подписи {signature.version}"
        )

    candidates = [keys] if isinstance(keys, SigningKey) else list(keys)
    key = next((item for item in candidates if item.id and item.id == signature.key_id), None)
    if key is None:
        raise WebhookVerificationError(
            "unknown_key",
            f"подпись сделана ключом {signature.key_id}, которого нет среди действующих",
        )

    if not hmac.compare_digest(signature.value, sign(key, signature, body)):
        raise WebhookVerificationError("mismatch", "подпись не сходится")

    moment = time.time() if now is None else now
    if abs(moment - signature.issued_at_unix) > window_seconds:
        raise WebhookVerificationError("expired", "подпись вне временного окна")

    try:
        envelope = json.loads(body.decode("utf-8"))
    except (ValueError, UnicodeDecodeError) as error:
        raise WebhookVerificationError("envelope_invalid", f"конверт не разбирается: {error}") from error
    if not isinstance(envelope, dict):
        raise WebhookVerificationError("envelope_invalid", "конверт не объект")
    for field in REQUIRED_ENVELOPE_FIELDS:
        value = envelope.get(field)
        if value in (None, "") or (field == "schema_version" and int(value) < 1):
            raise WebhookVerificationError("envelope_invalid", f"в конверте нет обязательного поля {field}")

    # Сверка обязательна: приёмник выбирает ключ и дедуплицирует повтор ПО
    # ЗАГОЛОВКАМ, до разбора тела. Если заголовок обещает одно событие, а тело
    # несёт другое, дедупликация защищает не тот факт, который приняли.
    if envelope["event_id"] != signature.event_id or envelope["installation_id"] != signature.installation_id:
        raise WebhookVerificationError("event_mismatch", "заголовки подписи не совпадают с конвертом")
    return envelope
