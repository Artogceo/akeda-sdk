/**
 * Проверка подписи входящей доставки.
 *
 * Это половина приёмника, которую нельзя списать с примера в документации:
 * реализация подписи существует в трёх местах — в диспетчере Akeda, в
 * опубликованном контракте `snapshot/extension-delivery/v1/delivery-contract.json`
 * и здесь, — и расходиться им нечем: тесты этого пакета проверяют её теми же
 * векторами, что лежат в контракте.
 *
 * ПОРЯДОК ПРОВЕРОК ЧАСТЬ ЗАЩИТЫ. Сначала HMAC, потом окно свежести. Обратный
 * порядок дал бы тому, у кого ключа нет, различимый по ответу способ нащупать
 * границу окна и подобрать момент для переигрывания перехваченного запроса.
 *
 * КЛЮЧ ВЫБИРАЕТСЯ ПО ИДЕНТИФИКАТОРУ, а не перебором. Перебор принял бы подпись,
 * сделанную ключом, который отправитель не называл, и стёр бы единственный
 * отказ, по которому видно, что приёмник остался на секрете с кончившимся
 * перекрытием ротации.
 *
 * Модуль работает на сервере: он берёт HMAC из `node:crypto`. Приёмник вебхука
 * сервером и обязан быть — проверять подпись в браузере значит отдать туда
 * секрет.
 */

import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/** Версия схемы подписи. Входит в подписываемую строку, а не только в заголовок. */
export const SIGNATURE_VERSION = "v1";

/** Окно свежести подписи, миллисекунды. Двустороннее. */
export const DEFAULT_WINDOW_MS = 300_000;

export const HEADERS = {
  signature: "akeda-signature",
  keyId: "akeda-signature-key-id",
  timestamp: "akeda-signature-timestamp",
  installationId: "akeda-installation-id",
  eventId: "akeda-event-id",
} as const;

export type SignatureFailure =
  | "missing"
  | "malformed"
  | "version_unknown"
  | "unknown_key"
  | "mismatch"
  | "expired"
  | "envelope_invalid"
  | "event_mismatch";

export class WebhookVerificationError extends Error {
  readonly reason: SignatureFailure;
  constructor(reason: SignatureFailure, message: string) {
    super(message);
    this.name = "WebhookVerificationError";
    this.reason = reason;
  }
}

/** Секрет подписи установки и идентификатор ключа, по которому его выбирают. */
export interface SigningKey {
  readonly id: string;
  readonly secret: string;
}

/** Конверт доставки. Восемь полей обязательны — их перечисляет контракт. */
export interface Envelope {
  event_id: string;
  installation_id: string;
  tenant_id: string;
  occurred_at: string;
  schema_version: number;
  trace_id: string;
  type: string;
  idempotency_key: string;
  payload?: unknown;
}

export interface ParsedSignature {
  version: string;
  keyId: string;
  installationId: string;
  eventId: string;
  issuedAtUnix: number;
  value: string;
}

/** Как читать заголовок: у каждого фреймворка свой способ. */
export type HeaderReader = (name: string) => string | null | undefined;

export function headerReaderFrom(
  headers: Headers | Record<string, string | string[] | undefined>,
): HeaderReader {
  if (typeof (headers as Headers).get === "function") {
    return (name) => (headers as Headers).get(name);
  }
  const lowered = new Map<string, string>();
  for (const [key, value] of Object.entries(headers as Record<string, string | string[] | undefined>)) {
    if (value === undefined) continue;
    lowered.set(key.toLowerCase(), Array.isArray(value) ? (value[0] ?? "") : value);
  }
  return (name) => lowered.get(name.toLowerCase()) ?? null;
}

export function parseSignature(read: HeaderReader): ParsedSignature {
  const raw = (read(HEADERS.signature) ?? "").trim();
  if (raw === "") {
    throw new WebhookVerificationError("missing", "запрос без заголовков подписи");
  }
  const separator = raw.indexOf("=");
  if (separator <= 0 || separator === raw.length - 1) {
    throw new WebhookVerificationError("malformed", "заголовок подписи не разбирается");
  }
  const version = raw.slice(0, separator).trim();
  const value = raw.slice(separator + 1).trim();
  const timestamp = Number.parseInt((read(HEADERS.timestamp) ?? "").trim(), 10);
  const installationId = (read(HEADERS.installationId) ?? "").trim();
  const eventId = (read(HEADERS.eventId) ?? "").trim();
  if (!Number.isFinite(timestamp) || installationId === "" || eventId === "" || version === "" || value === "") {
    throw new WebhookVerificationError("malformed", "заголовки подписи не разбираются");
  }
  return {
    version,
    keyId: (read(HEADERS.keyId) ?? "").trim(),
    installationId,
    eventId,
    issuedAtUnix: timestamp,
    value,
  };
}

/** Подписываемая строка. Тело входит дайджестом, а не целиком. */
export function signingBase(signature: ParsedSignature, body: Buffer | Uint8Array | string): string {
  const raw = typeof body === "string" ? Buffer.from(body, "utf8") : Buffer.from(body);
  const digest = createHash("sha256").update(raw).digest("hex");
  return [
    signature.version,
    signature.keyId,
    String(signature.issuedAtUnix),
    signature.installationId,
    signature.eventId,
    digest,
  ].join("\n");
}

export function sign(
  key: SigningKey,
  parts: Omit<ParsedSignature, "value" | "version"> & { version?: string },
  body: Buffer | Uint8Array | string,
): string {
  const signature: ParsedSignature = {
    version: parts.version ?? SIGNATURE_VERSION,
    keyId: key.id,
    installationId: parts.installationId,
    eventId: parts.eventId,
    issuedAtUnix: parts.issuedAtUnix,
    value: "",
  };
  return createHmac("sha256", key.secret).update(signingBase(signature, body)).digest("hex");
}

export interface VerifyOptions {
  /** Все ДЕЙСТВУЮЩИЕ ключи установки: текущий и, пока идёт ротация, предыдущий. */
  keys: SigningKey[] | SigningKey;
  now?: Date;
  windowMs?: number;
}

/**
 * Полный приёмный контур: подпись, окно, разбор конверта и сверка его с
 * заголовками.
 *
 * Сверка обязательна: приёмник выбирает ключ и дедуплицирует повтор ПО
 * ЗАГОЛОВКАМ, до разбора тела. Если заголовок обещает одно событие, а тело
 * несёт другое, дедупликация защищает не тот факт, который приняли.
 *
 * ТЕЛО — СЫРЫЕ БАЙТЫ. Не `JSON.parse` и не пересобранная строка: дайджест
 * считается по тому, что пришло. Фреймворк, разбирающий тело до вас, ломает
 * проверку подписи — включайте raw body.
 */
export function verifyWebhook(
  headers: Headers | Record<string, string | string[] | undefined> | HeaderReader,
  rawBody: Buffer | Uint8Array | string,
  options: VerifyOptions,
): { envelope: Envelope; signature: ParsedSignature } {
  const read: HeaderReader = typeof headers === "function" ? headers : headerReaderFrom(headers);
  const signature = parseSignature(read);

  if (signature.version !== SIGNATURE_VERSION) {
    throw new WebhookVerificationError(
      "version_unknown",
      `неизвестная версия схемы подписи ${signature.version}`,
    );
  }

  const keys = Array.isArray(options.keys) ? options.keys : [options.keys];
  const key = keys.find((candidate) => candidate.id !== "" && candidate.id === signature.keyId);
  if (!key) {
    throw new WebhookVerificationError(
      "unknown_key",
      `подпись сделана ключом ${signature.keyId}, которого нет среди действующих`,
    );
  }

  const expected = Buffer.from(
    createHmac("sha256", key.secret).update(signingBase(signature, rawBody)).digest("hex"),
    "utf8",
  );
  const got = Buffer.from(signature.value, "utf8");
  if (got.length !== expected.length || !timingSafeEqual(got, expected)) {
    throw new WebhookVerificationError("mismatch", "подпись не сходится");
  }

  const now = options.now ?? new Date();
  const windowMs = options.windowMs ?? DEFAULT_WINDOW_MS;
  const age = Math.abs(now.getTime() - signature.issuedAtUnix * 1000);
  if (age > windowMs) {
    throw new WebhookVerificationError("expired", "подпись вне временного окна");
  }

  const text = typeof rawBody === "string" ? rawBody : Buffer.from(rawBody).toString("utf8");
  let envelope: Envelope;
  try {
    envelope = JSON.parse(text) as Envelope;
  } catch (cause) {
    throw new WebhookVerificationError("envelope_invalid", `конверт не разбирается: ${String(cause)}`);
  }
  const required: (keyof Envelope)[] = [
    "event_id",
    "installation_id",
    "tenant_id",
    "occurred_at",
    "schema_version",
    "trace_id",
    "type",
    "idempotency_key",
  ];
  for (const field of required) {
    const value = envelope?.[field];
    if (value === undefined || value === null || value === "" || (field === "schema_version" && Number(value) < 1)) {
      throw new WebhookVerificationError("envelope_invalid", `в конверте нет обязательного поля ${field}`);
    }
  }
  if (envelope.event_id !== signature.eventId || envelope.installation_id !== signature.installationId) {
    throw new WebhookVerificationError("event_mismatch", "заголовки подписи не совпадают с конвертом");
  }
  return { envelope, signature };
}
