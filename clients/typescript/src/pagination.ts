/**
 * Листание.
 *
 * Схема в контракте одна — `limit` и `offset`, — и у неё два поведения, о
 * которых спотыкаются в первый день:
 *
 * 1. `count` — это ДЛИНА СТРАНИЦЫ, а не общее число записей. Цикл «пока
 *    получено меньше count» не заканчивается никогда;
 * 2. конец выборки определяется тем, что страница КОРОЧЕ запрошенного `limit`.
 *
 * Поэтому обход написан руками, а не выведен из ответа: вывести его из `count`
 * означало бы вывести из поля, которое отвечает на другой вопрос.
 *
 * Исключений в контракте два, и оба названы поимённо: витрины площадок
 * (`page`/`page_size`) и список бесед (курсор). Обход их не умеет и говорит об
 * этом вслух — молчаливая выдача первой страницы под видом всех хуже отказа.
 */

import { AkedaUsageError } from "./errors.js";
import type { AkedaClient } from "./client.js";
import type { OperationId } from "./generated/operations.js";

export interface PageEnvelope {
  count?: number;
  results?: unknown[];
}

export interface PaginateOptions {
  params?: Record<string, string | number>;
  query?: Record<string, unknown>;
  /** Размер страницы. По умолчанию — объявленный контрактом потолок. */
  pageSize?: number;
  /** Верхняя граница на всякий случай: обход не должен молча выкачать кабинет. */
  maxItems?: number;
  signal?: AbortSignal;
}

/**
 * Асинхронный обход страниц. Отдаёт записи по одной.
 *
 * ```ts
 * for await (const contact of paginate(client, "coreListContacts", { query: { q: "ООО" } })) {
 *   console.log(contact);
 * }
 * ```
 */
export async function* paginate<T = unknown>(
  client: AkedaClient,
  operationId: OperationId,
  options: PaginateOptions = {},
): AsyncGenerator<T, void, undefined> {
  const spec = client.spec(operationId);
  if (spec.pagination !== "limit_offset") {
    throw new AkedaUsageError(
      `операция ${String(operationId)} листается схемой «${spec.pagination}», а не limit/offset. ` +
        "Обход умеет только limit/offset; остальные схемы — названные исключения контракта " +
        "(витрины площадок и список бесед), и листать их надо своим кодом.",
    );
  }

  const limit = options.pageSize ?? spec.pageSizeMax ?? spec.pageSizeDefault ?? 100;
  if (spec.pageSizeMax !== null && limit > spec.pageSizeMax) {
    throw new AkedaUsageError(
      `pageSize=${limit} больше объявленного потолка ${spec.pageSizeMax}`,
    );
  }

  let offset = 0;
  let produced = 0;
  for (;;) {
    const result = await client.call(operationId as never, {
      params: options.params as never,
      query: { ...(options.query ?? {}), limit, offset } as never,
      signal: options.signal,
    });
    const rows = extractRows(result.data);
    for (const row of rows) {
      yield row as T;
      produced += 1;
      if (options.maxItems !== undefined && produced >= options.maxItems) return;
    }
    // Конец выборки — короткая страница. Пустая страница тоже короткая, так что
    // отдельной проверки на неё не нужно.
    if (rows.length < limit) return;
    offset += rows.length;
  }
}

/** Собрать весь обход в массив. Удобно и опасно: у выборки бывает миллион строк. */
export async function collect<T = unknown>(
  client: AkedaClient,
  operationId: OperationId,
  options: PaginateOptions = {},
): Promise<T[]> {
  const out: T[] = [];
  for await (const row of paginate<T>(client, operationId, options)) {
    out.push(row);
  }
  return out;
}

function extractRows(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    const results = (data as PageEnvelope).results;
    if (Array.isArray(results)) return results;
  }
  throw new AkedaUsageError(
    "ответ не похож на страницу: ни массив, ни объект с полем results",
  );
}
