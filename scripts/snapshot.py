#!/usr/bin/env python3
"""Снятие снимка релиза Akeda в этот репозиторий.

    python3 scripts/snapshot.py --source <каталог Akeda ERP>
    python3 scripts/snapshot.py --check          # снимок совпадает со своим SNAPSHOT.json

ЕДИНСТВЕННЫЙ ИСТОЧНИК КОНТРАКТА — ОПУБЛИКОВАННЫЙ АРТЕФАКТ.
`frontend/public/openapi/akeda-v1.{json,yaml}` — это то, что Akeda уже отдаёт
анонимному читателю справочника: в нём только операции с аудиторией `external`,
и из него снят `x-akeda-source-handler`. Исходник `docs/api/openapi/akeda-v1.yaml`
содержит операторскую половину системы и имена наших Go-обработчиков, поэтому
скрипт его не читает НИКОГДА — и не просто «не читает», а падает, если ему
подсунули путь к исходнику (см. refuse_source_contract).

Скрипт детерминирован и не хранит времени снятия. Метка времени сделала бы два
прогона на одном входе разными файлами, то есть уничтожила бы единственное
свойство, ради которого снимок вообще скриптуется: одинаковый вход — одинаковый
выход. Кому и когда снимали, отвечает история git, а не поле в JSON.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path

SNAPSHOT_VERSION = 1

REPO = Path(__file__).resolve().parent.parent
OUT = REPO / "snapshot"

# Что и откуда берётся. Слева — путь ВНУТРИ снимка, справа — путь в дереве Akeda.
# Все четыре входа — документы, предназначенные внешнему читателю. Ни одного
# пути к исходникам, конфигурации или коду здесь нет и появиться не может:
# список закрыт, а всё остальное скрипт не копирует.
COPIES: list[tuple[str, str]] = [
    ("openapi/akeda-v1.json", "frontend/public/openapi/akeda-v1.json"),
    ("openapi/akeda-v1.yaml", "frontend/public/openapi/akeda-v1.yaml"),
    (
        "extension-manifest/v1/manifest.schema.json",
        "docs/api/extension-manifest/v1/manifest.schema.json",
    ),
    (
        "extension-delivery/v1/delivery-contract.json",
        "docs/api/extension-delivery/v1/delivery-contract.json",
    ),
]

# Производный артефакт: схемы слоя ссылок на справочники. Отдельным файлом в
# Akeda его нет — он живёт внутри контракта, — а внешнему коду нужен сам по себе:
# по нему валидируют ссылку до отправки. Собирается ИЗ ОПУБЛИКОВАННОГО контракта
# замыканием по $ref, а не переписывается руками.
REFERENCE_DATA = "reference-data/v1/reference-data.schema.json"
REFERENCE_PATH_PREFIX = "/api/v1/reference"

MANIFEST_FILE = "SNAPSHOT.json"

# Файлы снимка, которые скрипт не трогает: это код, а не данные.
KEEP = {"embed.go", MANIFEST_FILE}

# Подстроки, которых в снимке быть не может. Находка означает не «почини по-тихому»,
# а «дыра в самом источнике»: опубликованный артефакт собран не тем конвейером.
FORBIDDEN_SUBSTRINGS = [
    "x-akeda-source-handler",
    "deverp.akeda.ru",
    "akeda-build",
    "akeda-mp",
    "ext_liza",
    "ext_recom",
    "akeda_go",
    "pgbouncer",
]


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def canonical_json(value: object) -> bytes:
    """Байты, одинаковые при каждом прогоне.

    sort_keys нужен не ради красоты: порядок ключей входного JSON зависит от
    того, чем его собрали, и снимок, отличающийся только порядком, читался бы
    как «релиз изменился».
    """
    text = json.dumps(value, ensure_ascii=False, indent=2, sort_keys=True)
    return (text + "\n").encode("utf-8")


def refuse_source_contract(source: Path) -> None:
    """Отказ, если --source указывает на каталог с исходником контракта.

    Ошибка «взял исходник вместо публикации» тихая: файл разбирается, операций
    в нём больше, всё выглядит богаче. Поэтому она ловится здесь, а не глазами
    в ревью.
    """
    published = source / "frontend/public/openapi/akeda-v1.json"
    if not published.is_file():
        raise SystemExit(
            f"снимок берётся только из опубликованных артефактов, а {published} нет.\n"
            "Соберите их в дереве Akeda (task openapi:generate) и повторите."
        )


def collect_contract_facts(contract: dict) -> dict:
    """Числа, по которым видно, какому релизу соответствует снимок."""
    stages: dict[str, int] = {}
    audiences: dict[str, int] = {}
    modules: dict[str, int] = {}
    total = 0
    methods = ("get", "post", "put", "patch", "delete", "head", "options")
    for item in contract.get("paths", {}).values():
        for method, operation in item.items():
            if method not in methods:
                continue
            total += 1
            stage = operation.get("x-akeda-release-stage", "internal")
            audience = operation.get("x-akeda-audience", "operator")
            module = operation.get("x-akeda-module", "")
            stages[stage] = stages.get(stage, 0) + 1
            audiences[audience] = audiences.get(audience, 0) + 1
            if module:
                modules[module] = modules.get(module, 0) + 1
    return {
        "title": contract.get("info", {}).get("title", ""),
        "version": contract.get("info", {}).get("version", ""),
        "license": contract.get("info", {}).get("license", {}).get("identifier", ""),
        "servers": [server.get("url", "") for server in contract.get("servers", [])],
        "operations": {
            "total": total,
            "by_stage": dict(sorted(stages.items())),
            "by_audience": dict(sorted(audiences.items())),
            "by_module": dict(sorted(modules.items())),
        },
        "schemas": len(contract.get("components", {}).get("schemas", {})),
    }


def audit_contract(contract: dict, facts: dict) -> None:
    """Структурная проверка того, что уезжает наружу.

    Текстовой проверки по подстрокам мало: операторская операция ничем не
    отличается от внешней на вид, и поймать её можно только по метке.
    """
    audiences = facts["operations"]["by_audience"]
    foreign = {name: count for name, count in audiences.items() if name != "external"}
    if foreign:
        raise SystemExit(
            "в опубликованном контракте есть операции с аудиторией не external: "
            f"{foreign}. Это дыра в конвейере публикации Akeda, а не в снимке."
        )
    for path in contract.get("paths", {}):
        if path.startswith("/api/v1/platform"):
            raise SystemExit(f"в опубликованном контракте остался операторский путь {path}")


def audit_text(name: str, data: bytes) -> None:
    lowered = data.lower()
    for needle in FORBIDDEN_SUBSTRINGS:
        if needle.encode("utf-8") in lowered:
            raise SystemExit(
                f"{name}: найдена подстрока {needle!r}. Внутреннее не уезжает наружу; "
                "чинить надо источник, а не снимок."
            )


def build_reference_bundle(contract: dict) -> bytes:
    """Схемы слоя ссылок, замкнутые по $ref.

    Берутся не по списку имён, а обходом от самих операций `/api/v1/reference`:
    список имён устарел бы на первой же правке контракта молча, а обход — нет.
    """
    schemas = contract.get("components", {}).get("schemas", {})
    prefix = "#/components/schemas/"

    seen: set[str] = set()

    def visit(node: object) -> None:
        if isinstance(node, dict):
            ref = node.get("$ref")
            if isinstance(ref, str) and ref.startswith(prefix):
                name = ref[len(prefix):]
                if name not in seen:
                    seen.add(name)
                    visit(schemas.get(name, {}))
            for key, value in node.items():
                if key != "$ref":
                    visit(value)
        elif isinstance(node, list):
            for value in node:
                visit(value)

    operations: dict[str, dict] = {}
    methods = ("get", "post", "put", "patch", "delete")
    for path, item in sorted(contract.get("paths", {}).items()):
        if not path.startswith(REFERENCE_PATH_PREFIX):
            continue
        for method, operation in item.items():
            if method not in methods:
                continue
            visit(operation)
            operations[operation["operationId"]] = {
                "method": method.upper(),
                "path": path,
                "summary": operation.get("summary", ""),
                "permission": operation.get("x-akeda-permission", ""),
                "stage": operation.get("x-akeda-release-stage", ""),
            }

    defs = {}
    for name in sorted(seen):
        schema = json.loads(json.dumps(schemas[name]))
        defs[name] = rewrite_refs(schema, prefix)

    bundle = {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://developers.akeda.ru/schemas/reference-data/v1/reference-data.schema.json",
        "title": "Akeda Reference Data v1",
        "description": (
            "Схемы слоя ссылок на справочники Akeda: каталог, значения по ключу и "
            "серверное разрешение пакета ссылок. Ссылка — это пара «ключ справочника "
            "плюс код», а не голый идентификатор. Собрано из опубликованного контракта "
            "замыканием по $ref; руками не правится."
        ),
        "x-akeda-contract-version": contract.get("info", {}).get("version", ""),
        "x-akeda-operations": operations,
        "$defs": defs,
    }
    return canonical_json(bundle)


def rewrite_refs(node: object, prefix: str) -> object:
    if isinstance(node, dict):
        out = {}
        for key, value in node.items():
            if key == "$ref" and isinstance(value, str) and value.startswith(prefix):
                out[key] = "#/$defs/" + value[len(prefix):]
            else:
                out[key] = rewrite_refs(value, prefix)
        return out
    if isinstance(node, list):
        return [rewrite_refs(value, prefix) for value in node]
    return node


def write(path: Path, data: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)


def snapshot_manifest(files: list[tuple[str, bytes]], facts: dict) -> bytes:
    entries = [
        {"path": name, "bytes": len(data), "sha256": sha256_bytes(data)}
        for name, data in sorted(files)
    ]
    # Общий отпечаток снимка. Считается по списку «путь + сумма», а не по
    # склейке содержимого: тогда переименование файла меняет отпечаток так же,
    # как правка его байтов, — а склейка переименование бы проспала.
    digest = hashlib.sha256()
    for entry in entries:
        digest.update(f"{entry['path']}\n{entry['sha256']}\n".encode("utf-8"))
    return canonical_json(
        {
            "snapshot_version": SNAPSHOT_VERSION,
            "contract": facts,
            "files": entries,
            "snapshot_digest": digest.hexdigest(),
        }
    )


def take(source: Path) -> dict[str, bytes]:
    refuse_source_contract(source)

    produced: dict[str, bytes] = {}
    for target, origin in COPIES:
        data = (source / origin).read_bytes()
        audit_text(origin, data)
        produced[target] = data

    contract = json.loads(produced["openapi/akeda-v1.json"].decode("utf-8"))
    facts = collect_contract_facts(contract)
    audit_contract(contract, facts)

    bundle = build_reference_bundle(contract)
    audit_text(REFERENCE_DATA, bundle)
    produced[REFERENCE_DATA] = bundle

    produced[MANIFEST_FILE] = snapshot_manifest(list(produced.items()), facts)
    return produced


def verify(strict: bool) -> int:
    """Снимок совпадает со своим SNAPSHOT.json.

    Проверка нужна не только против ручной правки: она же ловит снимок, который
    забыли досоздать целиком — файл в описи есть, на диске нет.
    """
    manifest_path = OUT / MANIFEST_FILE
    if not manifest_path.is_file():
        print(f"нет {manifest_path}", file=sys.stderr)
        return 1
    manifest = json.loads(manifest_path.read_text("utf-8"))
    problems: list[str] = []
    listed = set()
    for entry in manifest["files"]:
        listed.add(entry["path"])
        if entry["path"] == MANIFEST_FILE:
            continue
        target = OUT / entry["path"]
        if not target.is_file():
            problems.append(f"нет файла {entry['path']}")
            continue
        data = target.read_bytes()
        if sha256_bytes(data) != entry["sha256"]:
            problems.append(f"контрольная сумма разошлась: {entry['path']}")
        if len(data) != entry["bytes"]:
            problems.append(f"размер разошёлся: {entry['path']}")
        audit_text(entry["path"], data)
    if strict:
        for path in OUT.rglob("*"):
            if not path.is_file():
                continue
            name = path.relative_to(OUT).as_posix()
            if name in KEEP or name in listed:
                continue
            problems.append(f"файл вне описи: {name}")
    for problem in problems:
        print(problem, file=sys.stderr)
    if problems:
        return 1
    print(
        f"снимок цел: {len(manifest['files'])} файлов, контракт "
        f"{manifest['contract']['version']}, отпечаток {manifest['snapshot_digest'][:16]}…"
    )
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--source",
        type=Path,
        help="каталог репозитория Akeda ERP; берутся только опубликованные артефакты",
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="только проверить целость уже снятого снимка",
    )
    args = parser.parse_args()

    if args.check:
        return verify(strict=True)
    if not args.source:
        parser.error("нужен --source или --check")

    produced = take(args.source.resolve())
    for name, data in sorted(produced.items()):
        write(OUT / name, data)
    manifest = json.loads(produced[MANIFEST_FILE].decode("utf-8"))
    print(
        f"снимок снят: контракт {manifest['contract']['version']}, "
        f"{manifest['contract']['operations']['total']} операций, "
        f"отпечаток {manifest['snapshot_digest']}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
