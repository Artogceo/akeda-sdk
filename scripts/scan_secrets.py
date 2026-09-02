#!/usr/bin/env python3
"""Машинная проверка: секретов и внутренних адресов в дереве нет.

    python3 scripts/scan_secrets.py

Глазами это не ловится. Дерево — четыре с лишним мегабайта снимка плюс миллионы
знаков generated-кода, и «я посмотрел» здесь означает «я не смотрел». Поэтому
правила машинные, а каждое исключение названо поимённо и с причиной: исключение
без причины — способ отключить проверку, не признаваясь в этом.

Проверка идёт по ТРЁМ осям, и ни одной из них по отдельности не хватает:

1. форма значения — ключ, токен, приватный ключ, JWT узнаются по виду;
2. имена внутреннего — адреса служб, ext-модули клиентов, обработчики;
3. структура контракта — операторская операция ничем не отличается от внешней
   на вид, и поймать её можно только по метке.
"""

from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent

# ---------------------------------------------------------------------------
# Ось 1: форма значения
# ---------------------------------------------------------------------------

SECRET_PATTERNS: list[tuple[str, re.Pattern[str]]] = [
    # Ключ кабинета: ak_ и 64 шестнадцатеричных знака. Форма объявлена самим
    # контрактом, поэтому ловится точно, а не по слову «key».
    ("ключ кабинета ak_", re.compile(r"\bak_[0-9a-fA-F]{64}\b")),
    ("токен установки ai_", re.compile(r"\bai_[0-9a-zA-Z_-]{24,}\b")),
    ("сессия разработчика ad_", re.compile(r"\bad_[0-9a-zA-Z_-]{24,}\b")),
    ("приватный ключ PEM", re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----")),
    ("JWT", re.compile(r"\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b")),
    ("строка подключения к PostgreSQL", re.compile(r"postgres(?:ql)?://[^\s\"']+")),
    ("AWS access key", re.compile(r"\bAKIA[0-9A-Z]{16}\b")),
]

# Секрет подписи ловится отдельно: в снимке лежат СИНТЕТИЧЕСКИЕ векторы, и они
# законны. Настоящий отличается от них тем, что не назван вектором, поэтому
# проверка ограничена файлами вне снимка и тестов.
SIGNING_SECRET = re.compile(r"\bwhs_[0-9a-fA-F]{64}\b")
SYNTHETIC_SECRETS = {
    "whs_00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff",
    "whs_ffeeddccbbaa99887766554433221100ffeeddccbbaa99887766554433221100",
}

# ---------------------------------------------------------------------------
# Ось 2: имена внутреннего
# ---------------------------------------------------------------------------

INTERNAL_NAMES: list[tuple[str, re.Pattern[str]]] = [
    ("дев-контур", re.compile(r"deverp\.akeda\.ru")),
    ("сборочный сервер", re.compile(r"akeda-build")),
    ("сервер выгрузок площадок", re.compile(r"akeda-mp\b")),
    ("шлюз к базам", re.compile(r"\bpgbouncer\b", re.I)),
    ("control-plane база", re.compile(r"\bakeda_go\b")),
    ("клиентский ext-модуль", re.compile(r"\bext_(liza|recom|[a-z]+)\b")),
    ("имя внутреннего обработчика в контракте", re.compile(r"x-akeda-source-handler")),
    ("операторский путь", re.compile(r"/api/v1/platform/")),
    ("SSH-псевдоним стенда", re.compile(r"\bssh akeda-(prod|dev|build|mp)\b")),
]

# ---------------------------------------------------------------------------
# Исключения. Каждое — с причиной, и каждое узкое: файл плюс правило.
# ---------------------------------------------------------------------------

ALLOWED: dict[tuple[str, str], str] = {
    ("scripts/scan_secrets.py", "*"): "сам сканер называет то, что ищет",
    ("scripts/snapshot.py", "*"):
        "снятие снимка перечисляет те же запрещённые подстроки, чтобы падать на них при копировании",
    ("SECURITY.md", "*"): "документ объясняет, чего в дереве быть не может",
    ("CONTRIBUTING.md", "*"): "документ объясняет запреты",
    ("docs/state-of-the-contour.md", "операторский путь"):
        "страница объясняет, почему операторского контура здесь нет",
    ("docs/snapshot.md", "операторский путь"):
        "страница объясняет, что снятие снимка отклоняет такие пути",
    ("docs/snapshot.md", "имя внутреннего обработчика в контракте"):
        "страница называет расширение, которое обязано остаться в исходнике Akeda",
    ("cmd/akeda/app.go", "операторский путь"):
        "команда объясняет, что этой двери наружу не существует",
    ("clients/typescript/test/client.test.ts", "ключ кабинета ak_"):
        "синтетический ключ из шестидесяти четырёх нулей: тест собирает его в коде",
    ("clients/python/tests/test_client.py", "ключ кабинета ak_"):
        "то же, синтетический ключ теста",
    ("clients/go/akeda/client_test.go", "ключ кабинета ak_"):
        "то же, синтетический ключ теста",
}

BINARY_SUFFIXES = {".png", ".jpg", ".jpeg", ".gif", ".pdf", ".zip", ".gz", ".ico", ".woff", ".woff2"}


def tracked_files() -> list[Path]:
    """Проверяется то, что уедет в репозиторий, а не то, что валяется рядом.

    git ls-files, а не обход каталога: node_modules и dist проверять
    бессмысленно, а забыть исключить их вручную — легко.
    """
    result = subprocess.run(
        ["git", "-C", str(REPO), "ls-files", "-co", "--exclude-standard"],
        capture_output=True,
        text=True,
        check=True,
    )
    files = []
    for line in result.stdout.splitlines():
        path = REPO / line
        if not path.is_file() or path.suffix.lower() in BINARY_SUFFIXES:
            continue
        files.append(path)
    return files


def allowed(name: str, rule: str) -> bool:
    return (name, "*") in ALLOWED or (name, rule) in ALLOWED


def scan_text(path: Path, name: str, text: str) -> list[str]:
    findings = []
    for rule, pattern in SECRET_PATTERNS + INTERNAL_NAMES:
        if allowed(name, rule):
            continue
        for match in pattern.finditer(text):
            line = text.count("\n", 0, match.start()) + 1
            findings.append(f"{name}:{line}: {rule} — {match.group(0)[:40]}")
    if not allowed(name, "секрет подписи"):
        for match in SIGNING_SECRET.finditer(text):
            value = match.group(0)
            if value in SYNTHETIC_SECRETS:
                # Синтетический вектор опубликованного контракта: он лежит в
                # снимке по замыслу и не подходит ни к одной живой установке.
                continue
            line = text.count("\n", 0, match.start()) + 1
            findings.append(f"{name}:{line}: секрет подписи — {value[:16]}…")
    return findings


def scan_contract() -> list[str]:
    """Ось 3: структурная проверка снимка контракта.

    Текстовой проверки мало: операторская операция ничем не отличается от
    внешней на вид, а путь у неё может быть каким угодно.
    """
    contract_path = REPO / "snapshot" / "openapi" / "akeda-v1.json"
    if not contract_path.is_file():
        return ["snapshot/openapi/akeda-v1.json: снимка нет"]
    contract = json.loads(contract_path.read_text("utf-8"))
    findings = []
    methods = ("get", "post", "put", "patch", "delete", "head", "options")
    for path, item in contract.get("paths", {}).items():
        for method, operation in item.items():
            if method not in methods:
                continue
            audience = operation.get("x-akeda-audience", "operator")
            if audience != "external":
                findings.append(
                    f"snapshot/openapi/akeda-v1.json: {operation.get('operationId')} "
                    f"с аудиторией {audience}"
                )
            if "x-akeda-source-handler" in operation:
                findings.append(
                    f"snapshot/openapi/akeda-v1.json: {operation.get('operationId')} "
                    "несёт имя внутреннего обработчика"
                )
    for server in contract.get("servers", []):
        url = server.get("url", "")
        if url and url != "https://erp.akeda.ru":
            findings.append(f"snapshot/openapi/akeda-v1.json: посторонний контур {url}")
    return findings


def main() -> int:
    findings: list[str] = []
    for path in tracked_files():
        name = path.relative_to(REPO).as_posix()
        try:
            text = path.read_text("utf-8")
        except (UnicodeDecodeError, OSError):
            continue
        findings.extend(scan_text(path, name, text))
    findings.extend(scan_contract())

    if findings:
        print("НАЙДЕНО ТО, ЧЕГО В ДЕРЕВЕ БЫТЬ НЕ ДОЛЖНО:", file=sys.stderr)
        for finding in findings:
            print("  " + finding, file=sys.stderr)
        print(
            f"\nвсего {len(findings)}. Если находка законна — назовите её в ALLOWED "
            "вместе с причиной; исключение без причины отключает проверку молча.",
            file=sys.stderr,
        )
        return 1

    print("секретов, внутренних адресов и операторских операций в дереве нет")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
