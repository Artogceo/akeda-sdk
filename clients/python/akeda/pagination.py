"""Листание.

Схема в контракте одна — ``limit`` и ``offset``, — и у неё два поведения, о
которых спотыкаются в первый день:

1. ``count`` — это ДЛИНА СТРАНИЦЫ, а не общее число записей. Цикл «пока получено
   меньше count» не заканчивается никогда;
2. конец выборки определяется тем, что страница КОРОЧЕ запрошенного ``limit``.

Поэтому обход написан руками: вывести его из ``count`` означало бы вывести из
поля, которое отвечает на другой вопрос.

Исключений в контракте два, и оба названы поимённо: витрины площадок
(``page``/``page_size``) и список бесед (курсор). Обход их не умеет и говорит об
этом вслух — молчаливая выдача первой страницы под видом всех хуже отказа.
"""

from __future__ import annotations

from typing import Any, Iterator, List, Mapping, Optional

from .client import AkedaClient
from .errors import AkedaUsageError


def paginate(
    client: AkedaClient,
    operation_id: str,
    params: Optional[Mapping[str, Any]] = None,
    query: Optional[Mapping[str, Any]] = None,
    page_size: Optional[int] = None,
    max_items: Optional[int] = None,
) -> Iterator[Any]:
    """Обойти все страницы, отдавая записи по одной."""
    spec = client.spec(operation_id)
    if spec.pagination != "limit_offset":
        raise AkedaUsageError(
            f"операция {operation_id} листается схемой «{spec.pagination}», а не limit/offset. "
            "Обход умеет только limit/offset; остальные схемы — названные исключения контракта "
            "(витрины площадок и список бесед), и листать их надо своим кодом."
        )

    limit = page_size or spec.page_size_max or spec.page_size_default or 100
    if spec.page_size_max is not None and limit > spec.page_size_max:
        raise AkedaUsageError(f"page_size={limit} больше объявленного потолка {spec.page_size_max}")

    offset = 0
    produced = 0
    while True:
        merged = dict(query or {})
        merged.update({"limit": limit, "offset": offset})
        result = client.call(operation_id, params=params, query=merged)
        rows = _rows(result.data)
        for row in rows:
            yield row
            produced += 1
            if max_items is not None and produced >= max_items:
                return
        # Конец выборки — короткая страница. Пустая тоже короткая, так что
        # отдельной проверки на неё не нужно.
        if len(rows) < limit:
            return
        offset += len(rows)


def collect(
    client: AkedaClient,
    operation_id: str,
    params: Optional[Mapping[str, Any]] = None,
    query: Optional[Mapping[str, Any]] = None,
    page_size: Optional[int] = None,
    max_items: Optional[int] = None,
) -> List[Any]:
    """Собрать обход в список. Удобно и опасно: у выборки бывает миллион строк."""
    return list(paginate(client, operation_id, params, query, page_size, max_items))


def _rows(data: Any) -> List[Any]:
    if isinstance(data, list):
        return data
    if isinstance(data, dict) and isinstance(data.get("results"), list):
        return data["results"]
    raise AkedaUsageError("ответ не похож на страницу: ни массив, ни объект с полем results")
