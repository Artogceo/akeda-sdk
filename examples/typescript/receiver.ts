/**
 * Приёмник подписанных событий Akeda на Node.js.
 *
 *   export AKEDA_WEBHOOK_SECRET='whs_…'
 *   export AKEDA_WEBHOOK_KEY_ID='whk_…'
 *   export AKEDA_INSTALLATION_ID='…'
 *   export AKEDA_TENANT_ID='…'
 *
 * Проверка (живой Akeda не нужен):
 *
 *   AKEDA_CONFORMANCE_SIGNING_SECRET="$AKEDA_WEBHOOK_SECRET" \
 *     go run ./cmd/akeda conformance run examples/extension/target.json
 *
 * ЧЕТЫРЕ ВЕЩИ, БЕЗ КОТОРЫХ ПРИЁМНИК НЕПРАВИЛЬНЫЙ, и все четыре видны ниже:
 *
 *  1. СЫРЫЕ БАЙТЫ. Дайджест считается по тому, что пришло. Express с
 *     express.json() ломает проверку подписи: включайте raw body;
 *  2. ОКОНЧАТЕЛЬНЫЙ ОТКАЗ. Подделка получает 4xx, а не 5xx: 5xx заставит Akeda
 *     повторить её пятнадцать раз;
 *  3. ПРОВЕРКА КАБИНЕТА. Подпись сошлась — это ещё не «событие моё»: установка
 *     принципал ОДНОГО кабинета;
 *  4. ИДЕМПОТЕНТНОСТЬ. Повтор — норма доставки; факт применяется один раз на
 *     event_id, а 2xx возвращается и на первую доставку, и на все следующие.
 */

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

import {
  WebhookVerificationError,
  verifyWebhook,
  type SigningKey,
} from "../../clients/typescript/src/index.js";

const secret = process.env.AKEDA_WEBHOOK_SECRET ?? "";
const keyId = process.env.AKEDA_WEBHOOK_KEY_ID ?? "";
const installationId = process.env.AKEDA_INSTALLATION_ID ?? "";
const tenantId = process.env.AKEDA_TENANT_ID ?? "";

if (!secret || !keyId || !installationId || !tenantId) {
  console.error(
    "нужны AKEDA_WEBHOOK_SECRET, AKEDA_WEBHOOK_KEY_ID, AKEDA_INSTALLATION_ID и AKEDA_TENANT_ID",
  );
  process.exit(2);
}

// Ключей может быть два: во время ротации Akeda ещё подписывает предыдущим,
// пока вы не выкатили новый. Держите оба, пока перекрытие не кончилось.
const keys: SigningKey[] = [{ id: keyId, secret }];
const previousId = process.env.AKEDA_WEBHOOK_KEY_ID_PREVIOUS;
const previousSecret = process.env.AKEDA_WEBHOOK_SECRET_PREVIOUS;
if (previousId && previousSecret) {
  keys.push({ id: previousId, secret: previousSecret });
}

// В памяти дедупликация только в примере. В бою это строка в вашей базе с
// уникальным индексом по event_id, поставленная ТОЙ ЖЕ транзакцией, что и
// последствие факта: множество теряется при перезапуске, а повтор придёт и
// через сутки.
const applied = new Set<string>();

function readRawBody(request: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    request.on("data", (chunk: Buffer) => chunks.push(chunk));
    request.on("end", () => resolve(Buffer.concat(chunks)));
    request.on("error", reject);
  });
}

const server = createServer(async (request: IncomingMessage, response: ServerResponse) => {
  const url = request.url ?? "/";

  if (request.method === "GET" && url.startsWith("/health")) {
    // Живость — это 2xx в срок, и ничего больше. Ни разбора тела, ни поля
    // status: требование к форме ответа превратило бы проверку в маленький
    // собственный протокол.
    response.writeHead(200).end();
    return;
  }

  if (request.method === "GET" && url.startsWith("/applied") && process.env.AKEDA_EFFECT_PROBE === "1") {
    // Ручка отладочной сборки. В боевой её быть не должно.
    const eventId = new URL(url, "http://localhost").searchParams.get("event_id") ?? "";
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ applied: applied.has(eventId) ? 1 : 0 }));
    return;
  }

  if (request.method !== "POST" || !url.startsWith("/events")) {
    response.writeHead(404).end();
    return;
  }

  const body = await readRawBody(request); // СЫРЫЕ БАЙТЫ
  try {
    const { envelope } = verifyWebhook(request.headers, body, { keys });
    if (envelope.installation_id !== installationId || envelope.tenant_id !== tenantId) {
      console.error(`чужая установка ${envelope.installation_id}`);
      response.writeHead(403).end();
      return;
    }
    if (applied.has(envelope.event_id)) {
      console.log(`повтор ${envelope.event_id} — принят и проигнорирован`);
    } else {
      applied.add(envelope.event_id);
      console.log(`новый факт ${envelope.event_id}: ${envelope.type}`);
      // Здесь ваша работа. Она должна укладываться в дедлайн попытки: долгую —
      // в очередь, а Akeda ответить сразу.
    }
    response.writeHead(200).end();
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      // Причина в свой лог, а не в ответ: тело ответа приёмника Akeda кладёт в
      // журнал доставки как есть.
      console.error(`доставка отклонена (${error.reason}): ${error.message}`);
      response.writeHead(400).end(); // окончательный отказ, не 5xx
      return;
    }
    console.error(error);
    response.writeHead(400).end();
  }
});

const address = process.env.AKEDA_RECEIVER_ADDR ?? "127.0.0.1:8081";
const [host, port] = address.split(":");
server.listen(Number(port), host, () => {
  console.log(`приёмник слушает ${address} (POST /events, GET /health)`);
});
