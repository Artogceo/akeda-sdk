/**
 * Разбор отказа Akeda.
 *
 * Конверт один на весь контракт и несёт ровно три поля (схема `Error`):
 *
 *   code       — машинный код, по нему ветвится программа;
 *   detail     — одно предложение на языке запроса, его читает человек;
 *   request_id — ИДЕНТИФИКАТОР СЛУЧАЯ, по нему вызывающий получает помощь.
 *
 * Причины отказа в теле нет и не будет: ни SQL, ни имён таблиц, ни трассы.
 * Поэтому `requestId` — единственное, что имеет смысл нести в поддержку, и
 * ошибка кладёт его в сообщение, а не прячет в поле, которое никто не смотрит.
 */

/** Что вернул сервер в заголовках RateLimit-*. */
export interface RateLimitState {
  readonly limit: number | null;
  readonly remaining: number | null;
  readonly reset: number | null;
}

export class AkedaError extends Error {
  readonly status: number;
  /** Машинный код (`no_credentials`, `rate_limited`, `idempotency.key_mismatch`, …). */
  readonly code: string | null;
  /** Одно предложение для человека, на языке запроса. */
  readonly detail: string;
  /** Идентификатор случая: тот же UUID стоит в заголовке X-Request-ID и в журнале. */
  readonly requestId: string | null;
  /** Секунды до осмысленного повтора: из тела `retry_after` либо из заголовка Retry-After. */
  readonly retryAfter: number | null;
  readonly rateLimit: RateLimitState;
  readonly method: string;
  readonly url: string;
  readonly body: unknown;

  constructor(init: {
    status: number;
    code: string | null;
    detail: string;
    requestId: string | null;
    retryAfter: number | null;
    rateLimit: RateLimitState;
    method: string;
    url: string;
    body: unknown;
  }) {
    const suffix = init.requestId ? ` (случай ${init.requestId})` : "";
    super(`Akeda ${init.status}${init.code ? ` ${init.code}` : ""}: ${init.detail}${suffix}`);
    this.name = "AkedaError";
    this.status = init.status;
    this.code = init.code;
    this.detail = init.detail;
    this.requestId = init.requestId;
    this.retryAfter = init.retryAfter;
    this.rateLimit = init.rateLimit;
    this.method = init.method;
    this.url = init.url;
    this.body = init.body;
  }

  /**
   * Повтор осмыслен.
   *
   * Список закрыт намеренно. 429 и 503 сервер сам просит повторить; 409
   * `idempotency.in_progress` означает «тот же ключ прямо сейчас выполняется»
   * и тоже ждёт. Всё остальное — 4xx, и повтор того же запроса даст тот же
   * ответ, только позже.
   */
  get retryable(): boolean {
    if (this.status === 429 || this.status === 503) return true;
    return this.status === 409 && this.code === "idempotency.in_progress";
  }
}

/** Отказ до сети или после неё: приёмник не ответил, тело не разобралось. */
export class AkedaTransportError extends Error {
  readonly cause: unknown;
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = "AkedaTransportError";
    this.cause = cause;
  }
}

/** Клиент собран неверно: это ошибка программиста, а не сервера. */
export class AkedaUsageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AkedaUsageError";
  }
}

function integerHeader(headers: Headers, name: string): number | null {
  const raw = headers.get(name);
  if (raw === null) return null;
  const value = Number.parseInt(raw.trim(), 10);
  return Number.isFinite(value) ? value : null;
}

export function readRateLimit(headers: Headers): RateLimitState {
  return {
    limit: integerHeader(headers, "RateLimit-Limit"),
    remaining: integerHeader(headers, "RateLimit-Remaining"),
    reset: integerHeader(headers, "RateLimit-Reset"),
  };
}

export function errorFromResponse(
  method: string,
  url: string,
  status: number,
  headers: Headers,
  body: unknown,
): AkedaError {
  const envelope = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const detail = typeof envelope.detail === "string" && envelope.detail.trim() !== ""
    ? envelope.detail
    : `Ответ ${status} без пояснения.`;
  const code = typeof envelope.code === "string" ? envelope.code : null;
  // request_id приходит и телом, и заголовком. Заголовок — запасной путь: тело
  // 4xx его не обязано нести, а идентификатор случая нужен именно тогда, когда
  // тело оказалось скупым.
  const requestId = typeof envelope.request_id === "string"
    ? envelope.request_id
    : headers.get("X-Request-ID");
  const bodyRetry = typeof envelope.retry_after === "number" ? envelope.retry_after : null;
  const retryAfter = bodyRetry ?? integerHeader(headers, "Retry-After");
  return new AkedaError({
    status,
    code,
    detail,
    requestId,
    retryAfter,
    rateLimit: readRateLimit(headers),
    method,
    url,
    body,
  });
}
