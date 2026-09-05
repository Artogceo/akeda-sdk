#!/usr/bin/env python3
"""Каталог точек расширения, слотов и мест интерфейса — из объявлений платформы.

ПОЧЕМУ ЭТОТ ФАЙЛ ВООБЩЕ ЕСТЬ.

Схема манифеста говорит про место только форму ключа:
`<модуль>.<сущность>.<поверхность>`. По ней проходит и `stock.document.toolbar`,
который существует, и `crm.deal.sidebar`, которого нет. Разработчик узнаёт
разницу на подаче версии — то есть после того, как написал панель, которая
никогда бы не показалась.

Значит проверке нужен САМ СПИСОК мест. Взять его неоткуда, кроме объявлений
платформы: машинного артефакта с каталогом Akeda наружу не публикует, а копия
списка, набранная в этом репозитории руками, разошлась бы с платформой в первый
же день и делала бы ровно то, от чего защищает: принимала бы место, которого
оболочка не знает.

ЧТО ИМЕННО ЧИТАЕТСЯ. Три файла объявлений модуля `platform`: реестр точек,
контракты слотов и каталог мест. Читаются они как ТЕКСТ, разбором литералов, —
исполнять чужой код ради списка имён незачем. Из них берутся только имена и
словари, которые платформа и так называет разработчику: ключи точек и мест,
виды слотов, поля контекста запуска, коды отказов. Ни маршрутов, ни имён
обработчиков, ни конфигурации здесь нет — этим отличается каталог от исходника
контракта, который снимок не читает никогда (см. scripts/snapshot.py).

ПОЧЕМУ РАЗБОР ПАДАЕТ, А НЕ ПРОПУСКАЕТ. Каталог, разобранный наполовину, — это
проверка, которая молча начинает отвергать существующие места. Поэтому любое
непонятное объявление, неразвёрнутая константа и пустой раздел — ошибка снятия
снимка, а не пропуск.
"""

from __future__ import annotations

import re
from pathlib import Path

# Объявления платформы. Список закрыт: разбираются ровно эти три файла.
POINTS_FILE = "backend/internal/erp/internal/modules/platform/domain/extension_point.go"
SLOTS_FILE = "backend/internal/erp/internal/modules/platform/domain/ui_slot.go"
PLACEMENTS_FILE = "backend/internal/erp/internal/modules/platform/domain/ui_placement.go"

CATALOG_VERSION = 1

FIELD_NAME = re.compile(r"^[a-z][a-z0-9_]*$")

# Форма ключей берётся из СХЕМЫ МАНИФЕСТА, а не пишется здесь второй раз.
# Причина простая: ключ, который не проходит схему, объявить в манифесте нельзя,
# каким бы он ни был в каталоге, — и такое расхождение обязано остановить съёмку,
# а не проехать в снимок молча. Своя копия паттерна отвечала бы на этот вопрос
# сама и однажды разошлась бы со схемой.
POINT_KEY_AT = ("properties", "extensionPoints", "items", "pattern")
PLACEMENT_KEY_AT = ("$defs", "uiSlot", "properties", "placements", "items", "pattern")


class CatalogError(RuntimeError):
    """Каталог не разобрался. Снятие снимка на этом кончается."""


# ---- разбор Go-литералов ---------------------------------------------------


def strip_comments(text: str) -> str:
    """Убрать комментарии, не тронув строковые литералы.

    Комментарии в этих файлах длиннее кода и содержат и фигурные скобки, и
    кавычки: разбирать литералы поверх них — значит считать скобку из объяснения
    частью объявления.
    """
    out: list[str] = []
    index = 0
    length = len(text)
    while index < length:
        char = text[index]
        if char == '"' or char == "`":
            quote = char
            out.append(char)
            index += 1
            while index < length:
                out.append(text[index])
                if quote == '"' and text[index] == "\\":
                    index += 1
                    if index < length:
                        out.append(text[index])
                        index += 1
                    continue
                if text[index] == quote:
                    index += 1
                    break
                index += 1
            continue
        if char == "/" and index + 1 < length and text[index + 1] == "/":
            while index < length and text[index] != "\n":
                index += 1
            continue
        if char == "/" and index + 1 < length and text[index + 1] == "*":
            index += 2
            while index + 1 < length and not (text[index] == "*" and text[index + 1] == "/"):
                index += 1
            index += 2
            continue
        out.append(char)
        index += 1
    return "".join(out)


def constants(text: str) -> dict[str, str]:
    """Строковые константы файла: `SlotTypeAction = "action"` и соседи."""
    found: dict[str, str] = {}
    for name, value in re.findall(r"\b([A-Z][A-Za-z0-9_]*)\s*=\s*\"([^\"]*)\"", text):
        found[name] = value
    return found


def block_of(text: str, declaration: str) -> str:
    """Тело литерала после `var <declaration> = …{` до парной скобки."""
    anchor = re.search(r"\bvar\s+" + re.escape(declaration) + r"\b[^{]*\{", text)
    if not anchor:
        raise CatalogError(
            f"в объявлениях платформы нет {declaration}: каталог переехал, и снимок "
            "обязан переехать за ним, а не молча остаться со старым списком"
        )
    start = anchor.end()
    depth = 1
    index = start
    while index < len(text) and depth > 0:
        char = text[index]
        if char == '"':
            index += 1
            while index < len(text) and text[index] != '"':
                index += 2 if text[index] == "\\" else 1
        elif char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0:
                return text[start:index]
        index += 1
    raise CatalogError(f"литерал {declaration} не закрыт")


def split_top(body: str) -> list[str]:
    """Разбить тело литерала на элементы верхнего уровня по запятым."""
    parts: list[str] = []
    depth = 0
    current: list[str] = []
    index = 0
    while index < len(body):
        char = body[index]
        if char == '"':
            current.append(char)
            index += 1
            while index < len(body):
                current.append(body[index])
                if body[index] == "\\":
                    index += 1
                    if index < len(body):
                        current.append(body[index])
                        index += 1
                    continue
                if body[index] == '"':
                    index += 1
                    break
                index += 1
            continue
        if char in "{[(":
            depth += 1
        elif char in "}])":
            depth -= 1
        if char == "," and depth == 0:
            parts.append("".join(current))
            current = []
            index += 1
            continue
        current.append(char)
        index += 1
    tail = "".join(current).strip()
    if tail:
        parts.append(tail)
    return [part.strip() for part in parts if part.strip()]


def split_pair(element: str) -> tuple[str, str]:
    """Разбить `ключ: значение` верхнего уровня."""
    depth = 0
    index = 0
    while index < len(element):
        char = element[index]
        if char == '"':
            index += 1
            while index < len(element) and element[index] != '"':
                index += 2 if element[index] == "\\" else 1
        elif char in "{[(":
            depth += 1
        elif char in "}])":
            depth -= 1
        elif char == ":" and depth == 0:
            return element[:index].strip(), element[index + 1:].strip()
        index += 1
    raise CatalogError(f"элемент каталога не является парой «ключ: значение»: {element[:60]!r}")


def string_value(raw: str, known: dict[str, str], where: str) -> str:
    """Строка литералом или именованной константой; иначе — ошибка."""
    text = raw.strip().rstrip(",").strip()
    if text.startswith('"') and text.endswith('"'):
        return text[1:-1]
    if text in known:
        return known[text]
    raise CatalogError(
        f"{where}: значение {text!r} не строка и не известная константа платформы. "
        "Каталог обязан разобраться целиком: половина списка молча отвергала бы "
        "существующие объявления"
    )


def string_list(raw: str, known: dict[str, str], where: str) -> list[str]:
    """`[]string{…}` — в список строк, сохраняя порядок объявления."""
    text = raw.strip().rstrip(",").strip()
    opening = text.find("{")
    if opening < 0 or not text.endswith("}"):
        raise CatalogError(f"{where}: {text[:60]!r} не список")
    inner = text[opening + 1:-1]
    return [string_value(item, known, where) for item in split_top(inner)]


def fields_of(element: str) -> dict[str, str]:
    """Поля одной структуры литерала: `{Key: …, Summary: …}` → карта."""
    text = element.strip().rstrip(",").strip()
    opening = text.find("{")
    if opening < 0 or not text.endswith("}"):
        raise CatalogError(f"объявление каталога не является структурой: {text[:60]!r}")
    out: dict[str, str] = {}
    for item in split_top(text[opening + 1:-1]):
        name, value = split_pair(item)
        out[name] = value.strip()
    return out


# ---- сборка каталога -------------------------------------------------------


def read(source: Path, relative: str) -> str:
    path = source / relative
    if not path.is_file():
        raise CatalogError(
            f"нет объявлений платформы {relative}: каталог мест и точек берётся из них, "
            "и снимок без него принимал бы любое место"
        )
    return strip_comments(path.read_text("utf-8"))


def pattern_from(schema: dict, path: tuple[str, ...]) -> re.Pattern:
    """Паттерн ключа из схемы манифеста. Нет его — съёмка не идёт."""
    node: object = schema
    for step in path:
        if not isinstance(node, dict) or step not in node:
            raise CatalogError(
                f"в схеме манифеста нет {'/'.join(path)}: форма ключей переехала, и проверка "
                "каталога обязана переехать за ней, а не остаться со своей копией правила"
            )
        node = node[step]
    if not isinstance(node, str):
        raise CatalogError(f"в схеме манифеста {'/'.join(path)} не строка")
    return re.compile(node)


def build(source: Path, manifest_schema: dict) -> dict:
    point_key = pattern_from(manifest_schema, POINT_KEY_AT)
    placement_key = pattern_from(manifest_schema, PLACEMENT_KEY_AT)

    points_text = read(source, POINTS_FILE)
    slots_text = read(source, SLOTS_FILE)
    placements_text = read(source, PLACEMENTS_FILE)

    known = {}
    known.update(constants(points_text))
    known.update(constants(slots_text))
    known.update(constants(placements_text))
    # Модель точки объявлена константами того же файла; строкой её не пишут.
    known.setdefault("ExtensionModelSync", "sync")
    known.setdefault("ExtensionModelAsync", "async")

    surfaces = sorted({value for name, value in known.items() if name.startswith("Surface")})
    slot_types = sorted({value for name, value in known.items() if name.startswith("SlotType")})
    launch_fields = sorted({value for name, value in known.items() if name.startswith("LaunchField")})

    catalog = {
        "catalog_version": CATALOG_VERSION,
        "surfaces": surfaces,
        "slot_types": slot_types,
        "launch_context_fields": launch_fields,
        "bridge": {
            "from_extension": string_list(
                "{" + block_of(slots_text, "slotBridgeFromExtension") + "}", known, "мост от расширения"
            ),
            "to_extension": string_list(
                "{" + block_of(slots_text, "slotBridgeToExtension") + "}", known, "мост к расширению"
            ),
        },
        "extension_points": extension_points(points_text, known),
        "ui_slots": ui_slots(slots_text, known),
        "ui_placements": ui_placements(placements_text, known),
    }
    audit(catalog, point_key, placement_key)
    return catalog


def extension_points(text: str, known: dict[str, str]) -> list[dict]:
    """Точки расширения. Владелец — из ключа карты, как и в самой платформе."""
    out: list[dict] = []
    for module_element in split_top(block_of(text, "moduleExtensionPoints")):
        module, declarations = split_pair(module_element)
        module = string_value(module, known, "владелец точки")
        for element in split_top(fields_body(declarations)):
            fields = fields_of(element)
            where = f"точка модуля {module}"
            point = {
                "key": string_value(fields["Key"], known, where),
                "owner": module,
                "summary": string_value(fields.get("Summary", '""'), known, where),
                "model": string_value(fields.get("Model", '""'), known, where),
                "request_schema": string_value(fields.get("RequestSchema", '""'), known, where),
                "response_schema": string_value(fields.get("ResponseSchema", '""'), known, where),
                "scopes": string_list(fields.get("Scopes", "[]string{}"), known, where),
            }
            if "RequestTopic" in fields:
                point["request_topic"] = string_value(fields["RequestTopic"], known, where)
            if "ResponseOperation" in fields:
                point["response_operation"] = string_value(fields["ResponseOperation"], known, where)
            if "Errors" in fields:
                point["errors"] = string_list(fields["Errors"], known, where)
            out.append(point)
    return sorted(out, key=lambda item: item["key"])


def fields_body(raw: str) -> str:
    """Тело списка объявлений модуля: `{ {…}, {…} }` → содержимое."""
    text = raw.strip().rstrip(",").strip()
    opening = text.find("{")
    if opening < 0 or not text.endswith("}"):
        raise CatalogError(f"список объявлений модуля не разобрался: {text[:60]!r}")
    return text[opening + 1:-1]


def ui_slots(text: str, known: dict[str, str]) -> list[dict]:
    out: list[dict] = []
    for element in split_top(block_of(text, "uiSlotContracts")):
        key, declaration = split_pair(element)
        slot = string_value(key, known, "слот интерфейса")
        fields = fields_of(declaration)
        where = f"слот {slot}"
        out.append(
            {
                "slot": slot,
                "types": string_list(fields["Types"], known, where),
                "context": string_list(fields["Context"], known, where),
                "action": string_value(fields.get("Action", '""'), known, where),
                "framed": fields.get("Framed", "false").strip().rstrip(",") == "true",
            }
        )
    return sorted(out, key=lambda item: item["slot"])


def ui_placements(text: str, known: dict[str, str]) -> list[dict]:
    out: list[dict] = []
    for module_element in split_top(block_of(text, "moduleUIPlacements")):
        module, declarations = split_pair(module_element)
        module = string_value(module, known, "владелец места")
        for element in split_top(fields_body(declarations)):
            fields = fields_of(element)
            where = f"место модуля {module}"
            entity = string_value(fields.get("Entity", '""'), known, where)
            surface = string_value(fields["Surface"], known, where)
            key = f"{module}.{entity}.{surface}" if entity else f"{module}.{surface}"
            out.append(
                {
                    "placement": key,
                    "module": module,
                    "entity": entity,
                    "surface": surface,
                    "types": string_list(fields["Types"], known, where),
                    "context": string_list(fields["Context"], known, where),
                    "summary": string_value(fields.get("Summary", '""'), known, where),
                }
            )
    return sorted(out, key=lambda item: item["placement"])


def audit(catalog: dict, point_key: re.Pattern, placement_key: re.Pattern) -> None:
    """Сторожа разбора. Пустой раздел — это не «пусто», это сломанный разбор."""
    for section in ("extension_points", "ui_slots", "ui_placements"):
        if not catalog[section]:
            raise CatalogError(f"каталог: раздел {section} пуст — разбор объявлений сломался")
    surfaces = set(catalog["surfaces"])
    types = set(catalog["slot_types"])
    for point in catalog["extension_points"]:
        if not point_key.match(point["key"]):
            raise CatalogError(
                f"каталог: точка {point['key']!r} объявлена ключом, который не принимает её же "
                "схема манифеста: объявить такую точку в манифесте нельзя, и снимок с ней "
                "обещал бы разработчику невозможное"
            )
        if point["model"] not in ("sync", "async"):
            raise CatalogError(f"каталог: у точки {point['key']} непонятная модель {point['model']!r}")
    for slot in catalog["ui_slots"]:
        if not point_key.match(slot["slot"]):
            raise CatalogError(
                f"каталог: слот {slot['slot']!r} объявлен ключом, который не принимает схема манифеста"
            )
        unknown = sorted(set(slot["types"]) - types)
        if unknown:
            raise CatalogError(f"каталог: у слота {slot['slot']} виды вне списка платформы: {unknown}")
    for place in catalog["ui_placements"]:
        if not placement_key.match(place["placement"]):
            raise CatalogError(
                f"каталог: место {place['placement']!r} объявлено ключом, который не принимает "
                "схема манифеста: назвать такое место в манифесте нельзя"
            )
        if place["surface"] not in surfaces:
            raise CatalogError(
                f"каталог: у места {place['placement']} поверхность {place['surface']!r} "
                "вне закрытого списка платформы"
            )
        if not place["types"]:
            raise CatalogError(f"каталог: место {place['placement']} не принимает ни одного вида слота")
        unknown = sorted(set(place["types"]) - types)
        if unknown:
            raise CatalogError(f"каталог: у места {place['placement']} виды вне списка платформы: {unknown}")
        for field in place["context"]:
            if not FIELD_NAME.match(field):
                raise CatalogError(
                    f"каталог: у места {place['placement']} поле контекста {field!r} не развернулось "
                    "в значение — разбор констант сломался"
                )
    keys = [place["placement"] for place in catalog["ui_placements"]]
    duplicates = sorted({key for key in keys if keys.count(key) > 1})
    if duplicates:
        raise CatalogError(f"каталог: место объявлено дважды: {duplicates}")
