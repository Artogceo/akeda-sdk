#!/usr/bin/env python3
"""Первый вызов Akeda на Python.

    export AKEDA_API_KEY='ak_…'          # Настройки → API-ключи, scope core:read
    export AKEDA_TENANT='ваш-кабинет'    # slug КАБИНЕТА, а не юрлица
    PYTHONPATH=clients/python python3 examples/quickstart-python/first_call.py

Адрес контура берётся из AKEDA_BASE_URL и по умолчанию боевой: вшитого адреса в
SDK нет, потому что контуров больше одного.
"""

from __future__ import annotations

import os
import sys

from akeda import AkedaClient, AkedaError, AkedaUsageError, api_key, paginate

ENVIRONMENT = os.environ.get("AKEDA_BASE_URL", "https://erp.akeda.ru")


def main() -> int:
    key = os.environ.get("AKEDA_API_KEY")
    if not key:
        print("нужен AKEDA_API_KEY (значение вида ak_…, приходит один раз при создании ключа)",
              file=sys.stderr)
        return 2
    try:
        # Ключ без префикса ak_ Akeda считает НЕПРЕДЪЯВЛЕННЫМ и отвечает 401
        # no_credentials — то есть «заголовка не было». Отказ здесь честнее.
        credentials = api_key(key)
        client = AkedaClient(
            base_url=ENVIRONMENT,
            credentials=credentials,
            tenant=os.environ.get("AKEDA_TENANT"),
            user_agent="akeda-quickstart-python",
        )
    except AkedaUsageError as error:
        print(error, file=sys.stderr)
        return 2

    print(f"контур: {ENVIRONMENT}\n")

    try:
        # Каталог справочников — операция стадии public: её форма зафиксирована.
        # Листания у неё нет намеренно: это дерево навигации, и клиент,
        # вынужденный листать собственное меню, показать его не может.
        catalog = client.call("coreReferenceCatalog").data
    except AkedaError as error:
        report(error)
        return 1

    print(f"справочников доступно: {catalog['count']}")
    if catalog.get("truncated"):
        print("внимание: каталог усечён — справочников в кабинете стало слишком много")
    for directory in catalog["results"][:10]:
        print(f"  {directory['key']:<28} {directory.get('reference', ''):<24} модуль {directory['module']}")

    # Второй вызов: листание. Конец выборки — КОРОТКАЯ страница, а не сравнение
    # с count: count это длина страницы, а не общее число записей.
    print()
    seen = 0
    try:
        for contact in paginate(client, "coreListContacts", max_items=25):
            seen += 1
            print(f"  контрагент: {contact.get('name')}")
    except AkedaError as error:
        report(error)
        return 1
    print(f"\nполучено контрагентов: {seen}")
    return 0


def report(error: AkedaError) -> None:
    print(f"отказ {error.status} {error.code or ''}: {error.detail}", file=sys.stderr)
    if error.request_id:
        # Идентификатор случая — единственное, что имеет смысл нести в
        # поддержку: причины отказа в теле нет и не будет.
        print(f"идентификатор случая: {error.request_id}", file=sys.stderr)


if __name__ == "__main__":
    raise SystemExit(main())
