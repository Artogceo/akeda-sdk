"""Akeda SDK для Python.

Что здесь написано руками, а что сгенерировано:

* ``akeda/generated/`` собирает ``scripts/generate.py`` из снимка контракта,
  править эти файлы нельзя;
* всё остальное написано руками: там, где нужно принять решение, генератор
  решать не умеет.

Зависимостей нет — только стандартная библиотека.
"""

from .client import (
    ENVIRONMENTS,
    IDEMPOTENT_OPERATIONS,
    AkedaClient,
    RawResponse,
    Result,
    Transport,
    UrllibTransport,
    operations_of_module,
    public_operations,
)
from .credentials import Credentials, api_key, developer_session, installation_token
from .errors import (
    AkedaError,
    AkedaTransportError,
    AkedaUsageError,
    RateLimitState,
)
from .generated.operations import OPERATIONS, OperationSpec
from .pagination import collect, paginate
from .webhook import (
    DEFAULT_WINDOW_SECONDS,
    REQUIRED_ENVELOPE_FIELDS,
    SIGNATURE_VERSION,
    Signature,
    SigningKey,
    WebhookVerificationError,
    parse_signature,
    sign,
    signing_base,
    verify_webhook,
)

__all__ = [
    "AkedaClient",
    "AkedaError",
    "AkedaTransportError",
    "AkedaUsageError",
    "Credentials",
    "DEFAULT_WINDOW_SECONDS",
    "ENVIRONMENTS",
    "IDEMPOTENT_OPERATIONS",
    "OPERATIONS",
    "OperationSpec",
    "RateLimitState",
    "RawResponse",
    "REQUIRED_ENVELOPE_FIELDS",
    "Result",
    "SIGNATURE_VERSION",
    "Signature",
    "SigningKey",
    "Transport",
    "UrllibTransport",
    "WebhookVerificationError",
    "api_key",
    "collect",
    "developer_session",
    "installation_token",
    "operations_of_module",
    "paginate",
    "parse_signature",
    "public_operations",
    "sign",
    "signing_base",
    "verify_webhook",
]

__version__ = "0.1.0"
