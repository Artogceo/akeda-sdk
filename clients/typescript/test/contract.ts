/**
 * Чтение опубликованного контракта доставки для тестов.
 *
 * Векторы берутся ИЗ СНИМКА, а не из копии в тесте. Копия — это вторая
 * реализация правды: она переживает смену алгоритма и оставляет тест зелёным
 * ровно тогда, когда он обязан покраснеть.
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export interface DeliveryVector {
  name: string;
  keyId: string;
  secret: string;
  installationId: string;
  eventId: string;
  timestampUnix: number;
  body: string;
  signature: string;
}

export interface DeliveryContract {
  version: number;
  signature: {
    version: string;
    algorithm: string;
    windowSeconds: number;
    headers: Record<string, string>;
    signingBase: string[];
  };
  envelope: {
    requiredFields: string[];
    headerMustMatchBody: string[];
  };
  delivery: {
    requestTimeoutSeconds: number;
    maxAttempts: number;
    acceptedStatusFrom: number;
    acceptedStatusTo: number;
    retryableStatuses: number[];
    retryableStatusFrom: number;
  };
  vectors: DeliveryVector[];
}

/**
 * Корень репозитория ищется подъёмом до `snapshot/SNAPSHOT.json`, а не
 * относительным путём: путь от исходника и от собранного файла разный, и
 * зашитая «..»-цепочка ломается при первой же смене раскладки сборки.
 */
function repositoryRoot(): string {
  let current = dirname(fileURLToPath(import.meta.url));
  for (let depth = 0; depth < 10; depth += 1) {
    if (existsSync(join(current, "snapshot", "SNAPSHOT.json"))) return current;
    const parent = dirname(current);
    if (parent === current) break;
    current = parent;
  }
  throw new Error("не найден snapshot/SNAPSHOT.json: тест запущен вне репозитория SDK");
}

export const deliveryContract: DeliveryContract = JSON.parse(
  readFileSync(
    join(repositoryRoot(), "snapshot", "extension-delivery", "v1", "delivery-contract.json"),
    "utf8",
  ),
) as DeliveryContract;
