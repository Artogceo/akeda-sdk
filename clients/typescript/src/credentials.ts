/**
 * Учётные данные и заголовки.
 *
 * У Akeda три вида предъявителя, и они различаются ПРЕФИКСОМ значения:
 *
 *   ak_… — API-ключ кабинета либо личный ключ человека;
 *   ai_… — краткосрочный токен установки приложения (контур /api/v1/app);
 *   ad_… — сессия аккаунта разработчика (контур /api/v1/developer).
 *
 * Клиент проверяет префикс до отправки. Причина не в педантизме: значение без
 * `ak_` мидлварь Akeda считает НЕПРЕДЪЯВЛЕННЫМ и отвечает 401 `no_credentials`
 * — то есть «заголовка не было». Разработчик, опечатавшийся в ключе, читает
 * это как «мой заголовок не доехал» и чинит транспорт вместо ключа.
 */

import { AkedaUsageError } from "./errors.js";

export type CredentialKind = "api_key" | "installation" | "developer";

const PREFIXES: Record<CredentialKind, string> = {
  api_key: "ak_",
  installation: "ai_",
  developer: "ad_",
};

export interface Credentials {
  readonly kind: CredentialKind;
  readonly value: string;
}

export function apiKey(value: string): Credentials {
  return credential("api_key", value);
}

export function installationToken(value: string): Credentials {
  return credential("installation", value);
}

export function developerSession(value: string): Credentials {
  return credential("developer", value);
}

function credential(kind: CredentialKind, value: string): Credentials {
  const trimmed = value.trim();
  if (trimmed === "") {
    throw new AkedaUsageError("пустое значение учётных данных");
  }
  if (!trimmed.startsWith(PREFIXES[kind])) {
    throw new AkedaUsageError(
      `значение не похоже на ${kind}: ожидался префикс ${PREFIXES[kind]}. ` +
        "Akeda считает такое значение непредъявленным и отвечает 401 no_credentials.",
    );
  }
  return { kind, value: trimmed };
}

/** Заголовок X-Tenant обязателен у каждой операции контракта. */
export function authHeaders(credentials: Credentials, tenant: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${credentials.value}`,
  };
  // Кабинетный ключ находит свой кабинет сам, личный — нет: без заголовка он
  // получает 400 tenant_required. Шлём всегда, если он задан: один и тот же код
  // тогда работает с обоими видами ключа.
  if (tenant) {
    headers["X-Tenant"] = tenant;
  }
  return headers;
}

/**
 * Контур установки кабинет в адресах не называет и заголовком его не выбирает:
 * кабинет берётся из токена. Заголовок с чужим кабинетом здесь — не ошибка
 * сервера, а заблуждение вызывающего, и молчать о нём нельзя.
 */
export function requiresTenantHeader(credentials: Credentials): boolean {
  return credentials.kind === "api_key";
}
