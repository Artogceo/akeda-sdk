"""Учётные данные и заголовки.

У Akeda три вида предъявителя, и они различаются ПРЕФИКСОМ значения:

``ak_…``
    API-ключ кабинета либо личный ключ человека;
``ai_…``
    краткосрочный токен установки приложения (контур ``/api/v1/app``);
``ad_…``
    сессия аккаунта разработчика (контур ``/api/v1/developer``).

Префикс проверяется до отправки. Причина не в педантизме: значение без ``ak_``
мидлварь Akeda считает НЕПРЕДЪЯВЛЕННЫМ и отвечает 401 ``no_credentials`` — то
есть «заголовка не было». Разработчик, опечатавшийся в ключе, читает это как
«мой заголовок не доехал» и чинит транспорт вместо ключа.
"""

from __future__ import annotations

from typing import Dict, Optional

from .errors import AkedaUsageError

_PREFIXES = {
    "api_key": "ak_",
    "installation": "ai_",
    "developer": "ad_",
}


class Credentials:
    __slots__ = ("kind", "value")

    def __init__(self, kind: str, value: str) -> None:
        trimmed = value.strip()
        if not trimmed:
            raise AkedaUsageError("пустое значение учётных данных")
        prefix = _PREFIXES[kind]
        if not trimmed.startswith(prefix):
            raise AkedaUsageError(
                f"значение не похоже на {kind}: ожидался префикс {prefix}. "
                "Akeda считает такое значение непредъявленным и отвечает 401 no_credentials."
            )
        self.kind = kind
        self.value = trimmed

    def __repr__(self) -> str:
        # Секрет не печатается ни при каких условиях: repr попадает в трассу
        # исключения, а трасса — в лог.
        return f"Credentials(kind={self.kind!r}, value='{self.value[:6]}…')"

    @property
    def requires_tenant_header(self) -> bool:
        """Контур установки кабинет не называет: он берётся из токена."""
        return self.kind == "api_key"

    def headers(self, tenant: Optional[str]) -> Dict[str, str]:
        headers = {"Authorization": f"Bearer {self.value}"}
        # Кабинетный ключ находит свой кабинет сам, личный — нет: без заголовка
        # он получает 400 tenant_required. Шлём всегда, если он задан: один и
        # тот же код тогда работает с обоими видами ключа.
        if tenant:
            headers["X-Tenant"] = tenant
        return headers


def api_key(value: str) -> Credentials:
    return Credentials("api_key", value)


def installation_token(value: str) -> Credentials:
    return Credentials("installation", value)


def developer_session(value: str) -> Credentials:
    return Credentials("developer", value)
