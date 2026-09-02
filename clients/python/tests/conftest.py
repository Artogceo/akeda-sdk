"""Общее для тестов: путь к пакету и опубликованный контракт доставки.

Векторы берутся ИЗ СНИМКА, а не из копии в тесте. Копия — это вторая реализация
правды: она переживает смену алгоритма и оставляет тест зелёным ровно тогда,
когда он обязан покраснеть.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import pytest

PACKAGE_ROOT = Path(__file__).resolve().parent.parent
if str(PACKAGE_ROOT) not in sys.path:
    sys.path.insert(0, str(PACKAGE_ROOT))


def repository_root() -> Path:
    current = Path(__file__).resolve()
    for candidate in current.parents:
        if (candidate / "snapshot" / "SNAPSHOT.json").is_file():
            return candidate
    raise RuntimeError("не найден snapshot/SNAPSHOT.json: тест запущен вне репозитория SDK")


@pytest.fixture(scope="session")
def delivery_contract() -> dict:
    path = repository_root() / "snapshot" / "extension-delivery" / "v1" / "delivery-contract.json"
    return json.loads(path.read_text("utf-8"))


@pytest.fixture(scope="session")
def vectors(delivery_contract: dict) -> list:
    return delivery_contract["vectors"]
