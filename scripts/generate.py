#!/usr/bin/env python3
"""Генерация типов клиентов из снимка контракта.

    python3 scripts/generate.py            # переписать generated-файлы
    python3 scripts/generate.py --check    # они совпадают с тем, что сгенерировалось бы

ГЕНЕРИРУЮТСЯ ТОЛЬКО ТИПЫ. Рантайм — аутентификация, листание, идемпотентность,
разбор ошибки, проверка подписи — написан руками в каждом клиенте: это места,
где решения принимаются, а генератор решений не принимает. Тип, наоборот,
списывается со схемы механически, и списанный руками расходится с контрактом на
первой же правке.

Один генератор на три языка, а не три генератора: имя модели, имя операции и
разбор одной и той же схемы обязаны совпадать в TypeScript, Python и Go. Три
инструмента разошлись бы на первом же oneOf, и разошлись бы молча.

Скрипт детерминирован: одинаковый снимок — побайтово одинаковый выход. Времени
генерации в заголовке нет намеренно (см. scripts/snapshot.py).
"""

from __future__ import annotations

import argparse
import json
import keyword
import re
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SNAPSHOT = REPO / "snapshot"
CONTRACT = SNAPSHOT / "openapi" / "akeda-v1.json"

TS_OUT = REPO / "clients/typescript/src/generated"
PY_OUT = REPO / "clients/python/akeda/generated"
GO_OUT = REPO / "clients/go/akeda/generated"

REF_PREFIX = "#/components/schemas/"

# Слова, которые в Go принято писать целиком заглавными. Без списка получаются
# поля Id, Url и Api — Go-код с ними читается как переведённый машиной.
INITIALISMS = {
    "id": "ID", "url": "URL", "uri": "URI", "api": "API", "uuid": "UUID",
    "html": "HTML", "http": "HTTP", "https": "HTTPS", "json": "JSON",
    "sql": "SQL", "ip": "IP", "ok": "OK", "crm": "CRM", "erp": "ERP",
    "sku": "SKU", "vat": "VAT", "pnl": "PNL", "sla": "SLA", "ttl": "TTL",
    "mcp": "MCP", "csv": "CSV", "png": "PNG", "eta": "ETA", "inn": "INN",
    "kpp": "KPP", "bic": "BIC", "gl": "GL", "ui": "UI", "db": "DB",
}


def pascal(name: str) -> str:
    parts = [p for p in re.split(r"[^A-Za-z0-9]+", name) if p]
    out = []
    for part in parts:
        if part.islower() or part.isupper():
            out.append(part[:1].upper() + part[1:].lower())
        else:
            out.append(part[:1].upper() + part[1:])
    return "".join(out) or "Value"


def go_name(name: str) -> str:
    parts = [p for p in re.split(r"[^A-Za-z0-9]+", name) if p]
    out = []
    for part in parts:
        lowered = part.lower()
        if lowered in INITIALISMS:
            out.append(INITIALISMS[lowered])
        elif part.islower() or part.isupper():
            out.append(part[:1].upper() + part[1:].lower())
        else:
            out.append(part[:1].upper() + part[1:])
    joined = "".join(out) or "Value"
    if joined[0].isdigit():
        joined = "F" + joined
    return joined


class Model:
    """Именованный объектный тип: то, что станет interface, TypedDict и struct."""

    def __init__(self, name: str, description: str) -> None:
        self.name = name
        self.description = description
        self.fields: list[dict] = []
        self.additional: dict | None = None


class Registry:
    def __init__(self, contract: dict) -> None:
        self.contract = contract
        self.schemas = contract["components"]["schemas"]
        self.models: dict[str, Model] = {}
        self.aliases: dict[str, dict] = {}
        self.order: list[str] = []

    def unique(self, base: str) -> str:
        name = base
        index = 2
        while name in self.models or name in self.aliases:
            name = f"{base}{index}"
            index += 1
        return name

    def declare(self, name: str, schema: dict) -> None:
        """Объявить тип верхнего уровня под точным именем из контракта."""
        node = self.convert(schema, name)
        if node["kind"] == "ref" and node["name"] == name:
            # объект уже зарегистрирован моделью под этим же именем
            return
        self.aliases[name] = node
        self.order.append(name)

    # ---- преобразование схемы в язык-независимое дерево -------------------

    def convert(self, schema: dict | None, hint: str) -> dict:
        if not isinstance(schema, dict) or not schema:
            return {"kind": "any"}

        ref = schema.get("$ref")
        if isinstance(ref, str) and ref.startswith(REF_PREFIX):
            return {"kind": "ref", "name": ref[len(REF_PREFIX):]}

        if "allOf" in schema:
            return self.merge_all_of(schema, hint)

        raw_type = schema.get("type")
        if raw_type == "null" or (isinstance(raw_type, list) and set(raw_type) == {"null"}):
            # Отдельная ветка нужна из-за самой частой формы контракта:
            # oneOf: [$ref, {type: null}]. Разбери её общим путём — и «null»
            # превратится в «неизвестно», а неизвестное в объединении
            # TypeScript поглощает всё остальное: X | unknown это unknown.
            return {"kind": "null"}

        for key in ("oneOf", "anyOf"):
            if key in schema:
                members = [self.convert(item, f"{hint}Variant{i + 1}") for i, item in enumerate(schema[key])]
                nullable = any(m["kind"] == "null" for m in members)
                members = [m for m in members if m["kind"] != "null"]
                if not members:
                    return {"kind": "null"}
                node = members[0] if len(members) == 1 else {"kind": "union", "of": members}
                return {"kind": "nullable", "of": node} if nullable else node

        types = raw_type if isinstance(raw_type, list) else ([raw_type] if raw_type else [])
        nullable = "null" in types
        types = [t for t in types if t != "null"]
        primary = types[0] if types else None

        if "const" in schema:
            node: dict = {"kind": "enum", "values": [schema["const"]]}
        elif "enum" in schema and (primary in (None, "string")):
            node = {"kind": "enum", "values": list(schema["enum"])}
        elif primary == "object" or (primary is None and "properties" in schema):
            node = self.object_node(schema, hint)
        elif primary == "array":
            node = {"kind": "array", "items": self.convert(schema.get("items"), hint + "Item")}
        elif primary in ("string", "integer", "number", "boolean"):
            node = {"kind": "prim", "t": primary, "format": schema.get("format", "")}
        elif primary is None:
            node = {"kind": "any"}
        else:
            node = {"kind": "any"}

        return {"kind": "nullable", "of": node} if nullable else node

    def merge_all_of(self, schema: dict, hint: str) -> dict:
        """allOf сводится к одному объекту.

        Пересечение типов есть только в TypeScript; в Python и Go его нет, и
        три разных ответа на один allOf снова развели бы клиенты. Поэтому слияние
        делается здесь, один раз, до всякого языка.
        """
        merged: dict = {"type": "object", "properties": {}, "required": []}
        for item in schema["allOf"]:
            resolved = item
            ref = item.get("$ref")
            if isinstance(ref, str) and ref.startswith(REF_PREFIX):
                resolved = self.schemas[ref[len(REF_PREFIX):]]
            merged["properties"].update(resolved.get("properties", {}))
            merged["required"].extend(resolved.get("required", []))
            if resolved.get("additionalProperties") is not None and "additionalProperties" not in merged:
                merged["additionalProperties"] = resolved["additionalProperties"]
        for key in ("description", "title"):
            if key in schema:
                merged[key] = schema[key]
        merged["required"] = sorted(set(merged["required"]))
        return self.object_node(merged, hint)

    def object_node(self, schema: dict, hint: str) -> dict:
        properties = schema.get("properties") or {}
        additional = schema.get("additionalProperties")

        if not properties:
            if isinstance(additional, dict):
                return {"kind": "map", "values": self.convert(additional, hint + "Value")}
            return {"kind": "map", "values": {"kind": "any"}}

        name = hint if hint not in self.models and hint not in self.aliases else self.unique(hint)
        model = Model(name, schema.get("description", ""))
        self.models[name] = model
        self.order.append(name)

        required = set(schema.get("required") or [])
        for prop, prop_schema in properties.items():
            model.fields.append(
                {
                    "json": prop,
                    "type": self.convert(prop_schema, name + pascal(prop)),
                    "required": prop in required,
                    "description": (prop_schema or {}).get("description", "")
                    if isinstance(prop_schema, dict)
                    else "",
                }
            )
        if isinstance(additional, dict):
            model.additional = self.convert(additional, name + "Extra")
        return {"kind": "ref", "name": name}


# ---------------------------------------------------------------------------
# Операции
# ---------------------------------------------------------------------------

METHODS = ("get", "post", "put", "patch", "delete", "head", "options")
IDEMPOTENCY_PARAM = "#/components/parameters/IdempotencyKey"


def build_operations(contract: dict, registry: Registry) -> list[dict]:
    components = contract["components"]["parameters"]
    operations: list[dict] = []

    for path in sorted(contract["paths"]):
        item = contract["paths"][path]
        for method in METHODS:
            operation = item.get(method)
            if not operation:
                continue
            op_id = operation["operationId"]
            title = pascal(op_id)

            idempotent = False
            path_params: list[dict] = []
            query_params: list[dict] = []
            # Параметры объявляются на ДВУХ уровнях: у самой операции и у пути
            # целиком, общими для всех его методов. В этом контракте так
            # объявлены параметры 186 путей из 578 — то есть генератор, читающий
            # только уровень операции, теряет `id` у трети адресов и собирает
            # URL с фигурными скобками внутри. Отказ при этом громкий, но
            # приходит он у партнёра, а не в сборке.
            for parameter in list(item.get("parameters", [])) + list(operation.get("parameters", [])):
                ref = parameter.get("$ref")
                if ref == IDEMPOTENCY_PARAM:
                    idempotent = True
                    continue
                resolved = components[ref.rsplit("/", 1)[1]] if ref else parameter
                where = resolved.get("in")
                if where == "path":
                    path_params.append(
                        {
                            "name": resolved["name"],
                            "type": registry.convert(resolved.get("schema"), title + pascal(resolved["name"])),
                            "required": True,
                            "description": resolved.get("description", ""),
                        }
                    )
                elif where == "query":
                    query_params.append(
                        {
                            "name": resolved["name"],
                            "type": registry.convert(resolved.get("schema"), title + pascal(resolved["name"])),
                            "required": bool(resolved.get("required")),
                            "description": resolved.get("description", ""),
                            "schema": resolved.get("schema") or {},
                        }
                    )

            body = None
            request_body = operation.get("requestBody")
            if request_body:
                json_body = (request_body.get("content") or {}).get("application/json")
                if json_body:
                    body = registry.convert(json_body.get("schema"), title + "Request")

            response = None
            success = sorted(code for code in operation.get("responses", {}) if code.startswith("2"))
            if success:
                content = (operation["responses"][success[0]].get("content") or {})
                json_response = content.get("application/json")
                if json_response:
                    response = registry.convert(json_response.get("schema"), title + "Response")

            # Объявление у операции перекрывает одноимённое у пути — так велит
            # OpenAPI, и так же ведёт себя сервер.
            path_params = list({p["name"]: p for p in path_params}.values())
            query_params = list({p["name"]: p for p in query_params}.values())

            names = {p["name"] for p in query_params}
            limit_schema = next((p["schema"] for p in query_params if p["name"] == "limit"), {})
            page_size_schema = next((p["schema"] for p in query_params if p["name"] == "page_size"), {})
            if "limit" in names and "offset" in names:
                pagination = "limit_offset"
            elif "page" in names and "page_size" in names:
                pagination = "page"
            elif names & {"cursor", "after"}:
                pagination = "cursor"
            elif "limit" in names:
                pagination = "limit"
            else:
                pagination = "none"
            size_schema = limit_schema or page_size_schema

            operations.append(
                {
                    "id": op_id,
                    "method": method.upper(),
                    "path": path,
                    "pagination": pagination,
                    # Потолок берётся из контракта, а не назначается клиентом:
                    # просьба сверх потолка НЕ даёт 400 — сервер молча урезает
                    # выборку либо сбрасывает её к умолчанию, и укороченная
                    # страница читается вызывающим как «данных больше нет».
                    "page_size_max": size_schema.get("maximum"),
                    "page_size_default": size_schema.get("default"),
                    "module": operation.get("x-akeda-module", ""),
                    "stage": operation.get("x-akeda-release-stage", ""),
                    "audience": operation.get("x-akeda-audience", ""),
                    "permission": operation.get("x-akeda-permission", ""),
                    "summary": operation.get("summary", ""),
                    "idempotent": idempotent,
                    "params": sorted(path_params, key=lambda p: p["name"]),
                    "query": sorted(query_params, key=lambda p: p["name"]),
                    "body": body,
                    "response": response,
                }
            )

    operations.sort(key=lambda o: o["id"])
    return operations


# ---------------------------------------------------------------------------
# TypeScript
# ---------------------------------------------------------------------------


def ts_type(node: dict, prefix: str = "") -> str:
    """Тип TypeScript. prefix ставится ТОЛЬКО перед именем модели.

    Раньше квалификация делалась регуляркой по уже собранной строке — и
    приписывала `models.` к слову `Array` и к строковым литералам enum
    («Active» внутри кавычек). Имя модели известно ровно в одном месте дерева,
    здесь; там его и надо приписывать.
    """
    kind = node["kind"]
    if kind == "ref":
        return prefix + node["name"]
    if kind == "null":
        return "null"
    if kind == "nullable":
        return f"{ts_type(node['of'], prefix)} | null"
    if kind == "array":
        inner = ts_type(node["items"], prefix)
        return f"Array<{inner}>"
    if kind == "map":
        return f"{{ [key: string]: {ts_type(node['values'], prefix)} }}"
    if kind == "union":
        return " | ".join(ts_type(item, prefix) for item in node["of"])
    if kind == "enum":
        # json.dumps, а не str(): в enum контракта попадаются null, true и false,
        # и питоновские None/True/False в TypeScript не компилируются.
        return " | ".join(json.dumps(value, ensure_ascii=False) for value in node["values"])
    if kind == "prim":
        return {"string": "string", "integer": "number", "number": "number", "boolean": "boolean"}[node["t"]]
    return "unknown"


def ts_doc(text: str, indent: str) -> list[str]:
    if not text:
        return []
    lines = text.strip().splitlines()
    if len(lines) == 1:
        return [f"{indent}/** {lines[0]} */"]
    out = [f"{indent}/**"]
    out.extend(f"{indent} * {line}" for line in lines)
    out.append(f"{indent} */")
    return out


def emit_typescript(registry: Registry, operations: list[dict], header: str) -> dict[Path, str]:
    lines = [header, ""]
    for name in registry.order:
        if name in registry.models:
            model = registry.models[name]
            lines.extend(ts_doc(model.description, ""))
            lines.append(f"export interface {model.name} {{")
            for field in model.fields:
                lines.extend(ts_doc(field["description"], "  "))
                optional = "" if field["required"] else "?"
                lines.append(f"  {json.dumps(field['json'], ensure_ascii=False)}{optional}: {ts_type(field['type'])};")
            if model.additional is not None:
                lines.append(f"  [key: string]: {ts_type(model.additional)} | undefined;")
            lines.append("}")
            lines.append("")
        else:
            lines.append(f"export type {name} = {ts_type(registry.aliases[name])};")
            lines.append("")
    models_ts = "\n".join(lines).rstrip() + "\n"

    lines = [header, "", 'import type * as models from "./models.js";', ""]
    lines.append("/** Форма одной операции контракта: то, чем её зовёт рантайм. */")
    lines.append("export interface OperationSpec {")
    lines.append("  readonly method: string;")
    lines.append("  readonly path: string;")
    lines.append("  readonly module: string;")
    lines.append("  readonly stage: string;")
    lines.append("  readonly permission: string;")
    lines.append("  /** Операция читает заголовок Idempotency-Key. */")
    lines.append("  readonly idempotent: boolean;")
    lines.append('  /** Схема листания: limit_offset | limit | page | cursor | none. */')
    lines.append("  readonly pagination: string;")
    lines.append("  /** Объявленный контрактом потолок размера страницы. */")
    lines.append("  readonly pageSizeMax: number | null;")
    lines.append("  /** Объявленное контрактом умолчание размера страницы. */")
    lines.append("  readonly pageSizeDefault: number | null;")
    lines.append("}")
    lines.append("")
    lines.append("/** Типы запроса и ответа каждой операции. Ключ — operationId контракта. */")
    lines.append("export interface OperationTypes {")
    for operation in operations:
        if operation["summary"]:
            lines.extend(ts_doc(f"{operation['method']} {operation['path']} — {operation['summary']}", "  "))
        lines.append(f"  {operation['id']}: {{")
        lines.append(f"    params: {ts_params(operation['params'])};")
        lines.append(f"    query: {ts_params(operation['query'])};")
        lines.append(f"    body: {ts_qualify(operation['body']) if operation['body'] else 'never'};")
        lines.append(f"    response: {ts_qualify(operation['response']) if operation['response'] else 'void'};")
        lines.append("  };")
    lines.append("}")
    lines.append("")
    lines.append("export type OperationId = keyof OperationTypes;")
    lines.append("")
    lines.append("export const operationSpecs: Record<OperationId, OperationSpec> = {")
    for operation in operations:
        parts = ", ".join(
            [
                f'method: "{operation["method"]}"',
                f'path: {json.dumps(operation["path"])}',
                f'module: "{operation["module"]}"',
                f'stage: "{operation["stage"]}"',
                f'permission: {json.dumps(operation["permission"])}',
                f'idempotent: {"true" if operation["idempotent"] else "false"}',
                f'pagination: "{operation["pagination"]}"',
                f'pageSizeMax: {operation["page_size_max"] if operation["page_size_max"] is not None else "null"}',
                f'pageSizeDefault: {operation["page_size_default"] if operation["page_size_default"] is not None else "null"}',
            ]
        )
        lines.append(f"  {operation['id']}: {{ {parts} }},")
    lines.append("};")
    operations_ts = "\n".join(lines).rstrip() + "\n"

    return {TS_OUT / "models.ts": models_ts, TS_OUT / "operations.ts": operations_ts}


def ts_qualify(node: dict) -> str:
    return ts_type(node, prefix="models.")


def ts_params(params: list[dict]) -> str:
    if not params:
        return "Record<string, never>"
    body = "; ".join(
        f"{json.dumps(p['name'])}{'' if p['required'] else '?'}: {ts_qualify(p['type'])}" for p in params
    )
    return "{ " + body + " }"


# ---------------------------------------------------------------------------
# Python
# ---------------------------------------------------------------------------


def py_type(node: dict) -> str:
    kind = node["kind"]
    if kind == "ref":
        return f'"{node["name"]}"'
    if kind == "null":
        return "None"
    if kind == "nullable":
        return f"Optional[{py_type(node['of'])}]"
    if kind == "array":
        return f"List[{py_type(node['items'])}]"
    if kind == "map":
        return f"Dict[str, {py_type(node['values'])}]"
    if kind == "union":
        return "Union[" + ", ".join(py_type(item) for item in node["of"]) + "]"
    if kind == "enum":
        return "Literal[" + ", ".join(repr(value) for value in node["values"]) + "]"
    if kind == "prim":
        return {"string": "str", "integer": "int", "number": "float", "boolean": "bool"}[node["t"]]
    return "Any"


def emit_python(registry: Registry, operations: list[dict], header: str) -> dict[Path, str]:
    lines = [
        header,
        "",
        "from __future__ import annotations",
        "",
        "from typing import Any, Dict, List, Literal, Optional, TypedDict, Union",
        "",
        "__all__ = [",
    ]
    for name in registry.order:
        lines.append(f'    "{name}",')
    lines.append("]")
    lines.append("")

    for name in registry.order:
        if name not in registry.models:
            lines.append(f"{name} = {py_type(registry.aliases[name])}")
            lines.append("")
            continue
        model = registry.models[name]
        required = [f for f in model.fields if f["required"]]
        optional = [f for f in model.fields if not f["required"]]
        hard_keyword = any(keyword.iskeyword(f["json"]) for f in model.fields)

        if hard_keyword:
            # У поля есть имя, которое в class-синтаксисе не написать («from»).
            # Функциональная форма TypedDict — единственный способ; она же
            # теряет разделение на обязательные и необязательные, поэтому
            # total=False, а обязательность остаётся в контракте.
            entries = ", ".join(f'"{f["json"]}": {py_type(f["type"])}' for f in model.fields)
            lines.append(f'{name} = TypedDict("{name}", {{{entries}}}, total=False)')
            lines.append("")
            continue

        if required and optional:
            base = f"_{name}Required"
            lines.append(f"class {base}(TypedDict):")
            emit_python_fields(lines, required)
            lines.append("")
            lines.append(f"class {name}({base}, total=False):")
            if model.description:
                lines.append(f'    """{python_doc(model.description)}"""')
                lines.append("")
            emit_python_fields(lines, optional)
        else:
            total = "" if required else ", total=False"
            lines.append(f"class {name}(TypedDict{total}):")
            if model.description:
                lines.append(f'    """{python_doc(model.description)}"""')
                lines.append("")
            emit_python_fields(lines, model.fields)
        lines.append("")

    models_py = "\n".join(lines).rstrip() + "\n"

    lines = [
        header,
        "",
        "from __future__ import annotations",
        "",
        "from typing import Dict, NamedTuple, Optional, Tuple",
        "",
        "",
        "class OperationSpec(NamedTuple):",
        '    """Одна операция контракта: то, чем её зовёт рантайм."""',
        "",
        "    method: str",
        "    path: str",
        "    module: str",
        "    stage: str",
        "    permission: str",
        "    #: операция читает заголовок Idempotency-Key",
        "    idempotent: bool",
        "    #: имена параметров пути в порядке появления",
        "    path_params: Tuple[str, ...]",
        "    #: схема листания: limit_offset | limit | page | cursor | none",
        "    pagination: str",
        "    #: объявленный контрактом потолок размера страницы",
        "    page_size_max: Optional[int]",
        "    #: объявленное контрактом умолчание размера страницы",
        "    page_size_default: Optional[int]",
        "",
        "",
        "OPERATIONS: Dict[str, OperationSpec] = {",
    ]
    for operation in operations:
        path_params = ", ".join(repr(p["name"]) for p in operation["params"])
        if path_params:
            path_params += ","
        lines.append(
            f"    {operation['id']!r}: OperationSpec("
            f"{operation['method']!r}, {operation['path']!r}, {operation['module']!r}, "
            f"{operation['stage']!r}, {operation['permission']!r}, {operation['idempotent']!r}, "
            f"({path_params}), {operation['pagination']!r}, "
            f"{operation['page_size_max']!r}, {operation['page_size_default']!r}),"
        )
    lines.append("}")
    operations_py = "\n".join(lines).rstrip() + "\n"

    init_py = "\n".join(
        [
            header,
            "",
            "from .models import *  # noqa: F401,F403",
            "from .operations import OPERATIONS, OperationSpec  # noqa: F401",
            "",
        ]
    )

    return {
        PY_OUT / "models.py": models_py,
        PY_OUT / "operations.py": operations_py,
        PY_OUT / "__init__.py": init_py,
    }


def python_doc(text: str) -> str:
    return " ".join(text.split()).replace('"""', "'''")


def emit_python_fields(lines: list[str], fields: list[dict]) -> None:
    if not fields:
        lines.append("    pass")
        return
    for field in fields:
        if field["description"]:
            lines.append(f'    #: {python_doc(field["description"])}')
        lines.append(f'    {field["json"]}: {py_type(field["type"])}')


# ---------------------------------------------------------------------------
# Go
# ---------------------------------------------------------------------------


def go_type(node: dict, pointer: bool = False) -> str:
    kind = node["kind"]
    if kind == "ref":
        return ("*" if pointer else "") + node["name"]
    if kind == "null":
        return "json.RawMessage"
    if kind == "nullable":
        return go_type(node["of"], pointer=True)
    if kind == "array":
        return "[]" + go_type(node["items"])
    if kind == "map":
        return "map[string]" + go_type(node["values"])
    if kind in ("union", "any"):
        return "json.RawMessage"
    if kind == "enum":
        return ("*" if pointer else "") + ("string" if all(isinstance(v, str) for v in node["values"]) else "json.RawMessage")
    if kind == "prim":
        base = {"string": "string", "integer": "int64", "number": "float64", "boolean": "bool"}[node["t"]]
        return ("*" if pointer else "") + base
    return "json.RawMessage"


def go_optional(node: dict) -> str:
    """Тип необязательного поля.

    Указатель нужен там, где ноль — законное значение: `0` у числа и `false` у
    флага неотличимы от отсутствия, и без указателя клиент не может сказать
    «поле не пришло». У среза и карты для этого есть nil, у сырого JSON — пустые
    байты, и указатель на них только мешает.
    """
    kind = node["kind"]
    if kind in ("array", "map", "union", "any"):
        return go_type(node)
    if kind == "enum" and not all(isinstance(v, str) for v in node["values"]):
        return "json.RawMessage"
    return go_type(node, pointer=True)


def go_doc(text: str, indent: str, prefix: str) -> list[str]:
    if not text:
        return []
    return [f"{indent}// {prefix}{line}" if i == 0 else f"{indent}// {line}" for i, line in enumerate(" ".join(text.split()).splitlines())]


def emit_go(registry: Registry, operations: list[dict], header: str) -> dict[Path, str]:
    lines = [header, "", "package generated", "", 'import "encoding/json"', ""]
    for name in registry.order:
        if name not in registry.models:
            node = registry.aliases[name]
            lines.extend(go_doc(node.get("description", ""), "", f"{name} "))
            lines.append(f"type {name} = {go_type(node)}")
            lines.append("")
            continue
        model = registry.models[name]
        lines.extend(go_doc(model.description, "", f"{model.name} — "))
        lines.append(f"type {model.name} struct {{")
        used: set[str] = set()
        for field in model.fields:
            name_go = go_name(field["json"])
            candidate, index = name_go, 2
            while candidate in used:
                candidate = f"{name_go}{index}"
                index += 1
            used.add(candidate)
            lines.extend(go_doc(field["description"], "\t", f"{candidate} — "))
            if field["required"]:
                lines.append(f'\t{candidate} {go_type(field["type"])} `json:"{field["json"]}"`')
            else:
                lines.append(f'\t{candidate} {go_optional(field["type"])} `json:"{field["json"]},omitempty"`')
        if model.additional is not None:
            lines.append("\t// Extra — поля сверх схемы; заполняется вызывающим кодом при необходимости.")
            lines.append(f'\tExtra map[string]{go_type(model.additional)} `json:"-"`')
        lines.append("}")
        lines.append("")
    models_go = "\n".join(lines).rstrip() + "\n"

    lines = [
        header,
        "",
        "package generated",
        "",
        "// Operation — одна операция контракта: то, чем её зовёт рантайм.",
        "type Operation struct {",
        "\tID         string",
        "\tMethod     string",
        "\tPath       string",
        "\tModule     string",
        "\tStage      string",
        "\tPermission string",
        "\t// Idempotent — операция читает заголовок Idempotency-Key.",
        "\tIdempotent bool",
        "\t// PathParams — имена параметров пути.",
        "\tPathParams []string",
        "\t// Pagination — схема листания: limit_offset, limit, page, cursor, none.",
        "\tPagination string",
        "\t// PageSizeMax — объявленный контрактом потолок размера страницы (0 — не объявлен).",
        "\tPageSizeMax int",
        "\t// PageSizeDefault — объявленное контрактом умолчание (0 — не объявлено).",
        "\tPageSizeDefault int",
        "}",
        "",
        "// Operations — весь контракт по operationId.",
        "var Operations = map[string]Operation{",
    ]
    for operation in operations:
        path_params = ", ".join(json.dumps(p["name"]) for p in operation["params"])
        params_literal = f"[]string{{{path_params}}}" if path_params else "nil"
        lines.append(
            f"\t{json.dumps(operation['id'])}: {{"
            f"ID: {json.dumps(operation['id'])}, "
            f"Method: {json.dumps(operation['method'])}, "
            f"Path: {json.dumps(operation['path'])}, "
            f"Module: {json.dumps(operation['module'])}, "
            f"Stage: {json.dumps(operation['stage'])}, "
            f"Permission: {json.dumps(operation['permission'])}, "
            f"Idempotent: {str(operation['idempotent']).lower()}, "
            f"PathParams: {params_literal}, "
            f"Pagination: {json.dumps(operation['pagination'])}, "
            f"PageSizeMax: {operation['page_size_max'] or 0}, "
            f"PageSizeDefault: {operation['page_size_default'] or 0}}},"
        )
    lines.append("}")
    operations_go = "\n".join(lines).rstrip() + "\n"

    return {
        GO_OUT / "models.go": gofmt(models_go),
        GO_OUT / "operations.go": gofmt(operations_go),
    }


def gofmt(source: str) -> str:
    """Прогон через gofmt.

    Не косметика: без него `go vet ./...` зелёный, а `gofmt -l` — нет, и
    generated-файл начинает отличаться от того, что напишет любой редактор с
    сохранением. Форматирование делается ЗДЕСЬ, а не отдельным шагом, иначе
    `--check` сверял бы отформатированное с неотформатированным и всегда падал.
    """
    result = subprocess.run(
        ["gofmt"], input=source.encode("utf-8"), capture_output=True, check=False
    )
    if result.returncode != 0:
        raise SystemExit("gofmt отказался: " + result.stderr.decode("utf-8", "replace"))
    return result.stdout.decode("utf-8")


# ---------------------------------------------------------------------------


def build_header(digest: str, version: str, comment: str) -> str:
    body = [
        "Сгенерировано scripts/generate.py. Руками не править.",
        f"Источник: snapshot/openapi/akeda-v1.json (контракт {version}, sha256 {digest}).",
        "Рантайм клиента написан руками и живёт рядом; здесь только типы.",
    ]
    if comment == "//":
        return "\n".join(f"// {line}" for line in body)
    if comment == "#":
        return "\n".join(f"# {line}" for line in body)
    return "/*\n" + "\n".join(f" * {line}" for line in body) + "\n */"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="только сверить, ничего не писать")
    args = parser.parse_args()

    contract = json.loads(CONTRACT.read_text("utf-8"))
    manifest = json.loads((SNAPSHOT / "SNAPSHOT.json").read_text("utf-8"))
    digest = next(f["sha256"] for f in manifest["files"] if f["path"] == "openapi/akeda-v1.json")
    version = manifest["contract"]["version"]

    registry = Registry(contract)
    for name in sorted(registry.schemas):
        registry.declare(name, registry.schemas[name])
    operations = build_operations(contract, registry)

    files: dict[Path, str] = {}
    files.update(emit_typescript(registry, operations, build_header(digest, version, "/*")))
    files.update(emit_python(registry, operations, build_header(digest, version, "#")))
    files.update(emit_go(registry, operations, build_header(digest, version, "//")))

    problems = 0
    for path, text in sorted(files.items()):
        data = text.encode("utf-8")
        if args.check:
            if not path.is_file() or path.read_bytes() != data:
                print(f"расходится: {path.relative_to(REPO)}", file=sys.stderr)
                problems += 1
            continue
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)

    if args.check:
        if problems:
            print("generated-файлы не совпадают со снимком; запустите scripts/generate.py", file=sys.stderr)
            return 1
        print(f"generated-файлы совпадают со снимком ({len(files)} файлов)")
        return 0

    print(
        f"сгенерировано: {len(registry.models)} моделей, {len(registry.aliases)} псевдонимов, "
        f"{len(operations)} операций → {len(files)} файлов"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
