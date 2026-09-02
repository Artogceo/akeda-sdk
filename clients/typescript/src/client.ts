/**
 * Тонкий рантайм поверх сгенерированных типов.
 *
 * Клиент НЕ содержит 770 методов. Операции описаны контрактом, и метод на
 * каждую — это ещё один список, который расходится с контрактом молча. Вместо
 * этого один вызов `call(operationId, …)`, типизированный сгенерированной
 * картой `OperationTypes`: имя операции проверяет компилятор, форму параметров
 * и ответа — тоже.
 *
 * Руками здесь написано ровно то, где нужны решения:
 *   — какой адрес контура (вшитого нет);
 *   — какие заголовки и почему;
 *   — что делать с Idempotency-Key у операции, которая его не читает;
 *   — когда повтор осмыслен, а когда он второй раз проводит документ;
 *   — как разобрать отказ.
 */

import { AkedaError, AkedaTransportError, AkedaUsageError, errorFromResponse, readRateLimit, type RateLimitState } from "./errors.js";
import { authHeaders, requiresTenantHeader, type Credentials } from "./credentials.js";
import { operationSpecs, type OperationId, type OperationSpec, type OperationTypes } from "./generated/operations.js";

/** Известные контуры. Адрес задаётся, а не вшивается: контуров больше одного. */
export const ENVIRONMENTS = {
  production: "https://erp.akeda.ru",
} as const;

export interface ClientOptions {
  /** Адрес контура целиком, например https://erp.akeda.ru. */
  baseUrl: string;
  credentials: Credentials;
  /** slug кабинета. Кабинет — tenant, а не юрлицо: юрлицо живёт внутри него. */
  tenant?: string;
  /** RU или EN: язык поля detail в отказе. */
  acceptLanguage?: string;
  /** Своя реализация fetch — для тестов и для сред без глобального fetch. */
  fetch?: typeof fetch;
  /** Сколько ждать ответа, мс. 0 — не ограничивать. */
  timeoutMs?: number;
  /** Сколько раз повторять то, что сервер сам просит повторить. */
  maxRetries?: number;
  /** Имя приложения в заголовке X-Akeda-Client: по нему нас находят в журнале. */
  userAgent?: string;
}

/**
 * Параметры вызова, типизированные самой операцией.
 *
 * Обобщение по `K` здесь не украшение: без него `params` и `body` пришлось бы
 * объявить широкими типами и пересекать их с типами операции, а пересечение
 * `Record<string, never>` с чем угодно даёт `never` — и вызов операции БЕЗ
 * параметров пути переставал бы компилироваться вместе с вызовом операции с
 * параметрами.
 */
export interface CallOptions<K extends OperationId = OperationId> {
  params?: OperationTypes[K]["params"];
  query?: OperationTypes[K]["query"];
  body?: OperationTypes[K]["body"];
  /**
   * Ключ идемпотентности. Принимается ТОЛЬКО операцией, которая его читает:
   * заголовок, тихо выброшенный по дороге, — это защита, в которую вызывающий
   * поверил зря.
   */
  idempotencyKey?: string;
  signal?: AbortSignal;
  headers?: Record<string, string>;
}

export interface CallResult<T> {
  data: T;
  status: number;
  headers: Headers;
  /** Ответ пришёл из хранилища идемпотентности (заголовок Idempotent-Replay). */
  idempotentReplay: boolean;
  rateLimit: RateLimitState;
  /** Идентификатор случая; на успешном ответе он тоже приходит. */
  requestId: string | null;
}

const IDEMPOTENT_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

export class AkedaClient {
  private readonly baseUrl: string;
  private readonly credentials: Credentials;
  private readonly tenant: string | null;
  private readonly acceptLanguage: string;
  private readonly fetchImpl: typeof fetch;
  private readonly timeoutMs: number;
  private readonly maxRetries: number;
  private readonly userAgent: string;

  constructor(options: ClientOptions) {
    if (!options.baseUrl || !/^https?:\/\//.test(options.baseUrl)) {
      throw new AkedaUsageError("baseUrl обязателен и должен начинаться с http:// или https://");
    }
    this.baseUrl = options.baseUrl.replace(/\/+$/, "");
    this.credentials = options.credentials;
    this.tenant = options.tenant?.trim() || null;
    if (requiresTenantHeader(this.credentials) && !this.tenant) {
      // Личный ключ без кабинета отвечает 400 tenant_required, кабинетный —
      // работает. Разница видна только в проде, поэтому спрашиваем сразу.
      throw new AkedaUsageError(
        "для ключа ak_… нужен tenant: личный ключ без заголовка X-Tenant отвечает 400 tenant_required",
      );
    }
    this.acceptLanguage = options.acceptLanguage ?? "ru";
    const globalFetch = options.fetch ?? globalThis.fetch;
    if (typeof globalFetch !== "function") {
      throw new AkedaUsageError("в этой среде нет fetch; передайте свою реализацию в options.fetch");
    }
    this.fetchImpl = globalFetch;
    this.timeoutMs = options.timeoutMs ?? 30_000;
    this.maxRetries = options.maxRetries ?? 2;
    this.userAgent = options.userAgent ?? "akeda-sdk-typescript";
  }

  spec(operationId: OperationId): OperationSpec {
    const spec = operationSpecs[operationId];
    if (!spec) {
      throw new AkedaUsageError(`операции ${String(operationId)} нет в контракте этого снимка`);
    }
    return spec;
  }

  async call<K extends OperationId>(
    operationId: K,
    options: CallOptions<K> = {},
  ): Promise<CallResult<OperationTypes[K]["response"]>> {
    const spec = this.spec(operationId);

    if (options.idempotencyKey !== undefined && !spec.idempotent) {
      throw new AkedaUsageError(
        `операция ${String(operationId)} не читает Idempotency-Key. ` +
          "Заголовок был бы отброшен сервером, а вызывающий считал бы повтор защищённым. " +
          "Заголовок читают только coreCreateContact, coreCreateProduct, coreCreateDocument, " +
          "corePostDocument и tasksCreateTask.",
      );
    }

    const url = this.buildUrl(spec, options.params as Record<string, string | number> | undefined, options.query);
    const headers: Record<string, string> = {
      Accept: "application/json",
      "Accept-Language": this.acceptLanguage,
      "X-Akeda-Client": this.userAgent,
      ...authHeaders(this.credentials, this.tenant),
      ...(options.headers ?? {}),
    };
    if (options.idempotencyKey) {
      headers["Idempotency-Key"] = options.idempotencyKey;
    }

    let payload: string | undefined;
    if (options.body !== undefined && options.body !== null) {
      payload = JSON.stringify(options.body);
      headers["Content-Type"] = "application/json";
    }

    return this.send(spec, url, headers, payload, options.signal) as Promise<
      CallResult<OperationTypes[K]["response"]>
    >;
  }

  private buildUrl(
    spec: OperationSpec,
    params: Record<string, string | number> | undefined,
    query: Record<string, unknown> | undefined,
  ): string {
    let path = spec.path;
    for (const [name, value] of Object.entries(params ?? {})) {
      const token = `{${name}}`;
      if (!path.includes(token)) {
        throw new AkedaUsageError(`у операции нет параметра пути ${name}`);
      }
      path = path.replace(token, encodeURIComponent(String(value)));
    }
    const missing = path.match(/\{([^}]+)\}/);
    if (missing) {
      throw new AkedaUsageError(`не задан параметр пути ${missing[1]}`);
    }

    const search = new URLSearchParams();
    for (const [name, value] of Object.entries(query ?? {})) {
      if (value === undefined || value === null) continue;
      if (name === "limit" && spec.pageSizeMax !== null && Number(value) > spec.pageSizeMax) {
        // Просьба сверх потолка НЕ даёт 400. Сервер либо урежет выборку, либо
        // сбросит её к умолчанию — и укороченная страница читается вызывающим
        // как «данных больше нет». Отказываем здесь, где это ещё видно.
        throw new AkedaUsageError(
          `limit=${String(value)} больше объявленного потолка ${spec.pageSizeMax}. ` +
            "Сервер не ответит ошибкой: он молча вернёт меньше, и это прочитается как конец выборки.",
        );
      }
      if (Array.isArray(value)) {
        for (const item of value) search.append(name, String(item));
      } else {
        search.append(name, String(value));
      }
    }
    const suffix = search.toString();
    return `${this.baseUrl}${path}${suffix ? `?${suffix}` : ""}`;
  }

  private async send(
    spec: OperationSpec,
    url: string,
    headers: Record<string, string>,
    body: string | undefined,
    signal: AbortSignal | undefined,
  ): Promise<CallResult<unknown>> {
    // Повторяем только то, что безопасно повторить: чтение либо команду с
    // ключом идемпотентности. Автоповтор POST без ключа проводит документ
    // дважды — цена ошибки здесь несопоставима с удобством.
    const safeToRetry = IDEMPOTENT_METHODS.has(spec.method) || headers["Idempotency-Key"] !== undefined;
    const attempts = safeToRetry ? this.maxRetries + 1 : 1;

    let lastError: AkedaError | null = null;
    for (let attempt = 0; attempt < attempts; attempt += 1) {
      const controller = new AbortController();
      const timer = this.timeoutMs > 0 ? setTimeout(() => controller.abort(), this.timeoutMs) : null;
      const onAbort = () => controller.abort();
      signal?.addEventListener("abort", onAbort, { once: true });

      let response: Response;
      try {
        response = await this.fetchImpl(url, {
          method: spec.method,
          headers,
          body,
          signal: controller.signal,
        });
      } catch (cause) {
        throw new AkedaTransportError(`запрос ${spec.method} ${url} не выполнен`, cause);
      } finally {
        if (timer) clearTimeout(timer);
        signal?.removeEventListener("abort", onAbort);
      }

      const parsed = await readBody(response);
      if (response.ok) {
        return {
          data: parsed,
          status: response.status,
          headers: response.headers,
          idempotentReplay: response.headers.get("Idempotent-Replay") === "true",
          rateLimit: readRateLimit(response.headers),
          requestId: response.headers.get("X-Request-ID"),
        };
      }

      lastError = errorFromResponse(spec.method, url, response.status, response.headers, parsed);
      if (!lastError.retryable || attempt === attempts - 1) {
        throw lastError;
      }
      await sleep(backoffMs(attempt, lastError.retryAfter));
    }
    throw lastError ?? new AkedaTransportError("повторы исчерпаны без ответа");
  }
}

async function readBody(response: Response): Promise<unknown> {
  if (response.status === 204) return undefined;
  const text = await response.text();
  if (text === "") return undefined;
  const contentType = response.headers.get("Content-Type") ?? "";
  if (!contentType.includes("json")) return text;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function backoffMs(attempt: number, retryAfter: number | null): number {
  // Retry-After — это просьба сервера, и она главнее нашей арифметики.
  if (retryAfter !== null && retryAfter >= 0) return Math.min(retryAfter * 1000, 60_000);
  return Math.min(2 ** attempt * 500, 8_000);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
