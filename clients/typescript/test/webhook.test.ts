import assert from "node:assert/strict";
import test from "node:test";

import { deliveryContract } from "./contract.js";
import {
  DEFAULT_WINDOW_MS,
  SIGNATURE_VERSION,
  WebhookVerificationError,
  parseSignature,
  sign,
  verifyWebhook,
} from "../src/webhook.js";

function headersFor(vector: (typeof deliveryContract.vectors)[number], signature = vector.signature) {
  return {
    "Akeda-Signature": `${SIGNATURE_VERSION}=${signature}`,
    "Akeda-Signature-Key-Id": vector.keyId,
    "Akeda-Signature-Timestamp": String(vector.timestampUnix),
    "Akeda-Installation-Id": vector.installationId,
    "Akeda-Event-Id": vector.eventId,
  };
}

function at(vector: (typeof deliveryContract.vectors)[number], offsetSeconds = 0): Date {
  return new Date((vector.timestampUnix + offsetSeconds) * 1000);
}

test("константы совпадают с опубликованным контрактом", () => {
  assert.equal(SIGNATURE_VERSION, deliveryContract.signature.version);
  assert.equal(DEFAULT_WINDOW_MS, deliveryContract.signature.windowSeconds * 1000);
  assert.equal(deliveryContract.signature.algorithm, "HMAC-SHA256");
});

test("подпись сходится с векторами контракта", () => {
  assert.ok(deliveryContract.vectors.length >= 2, "векторов должно быть больше одного");
  for (const vector of deliveryContract.vectors) {
    const produced = sign(
      { id: vector.keyId, secret: vector.secret },
      {
        keyId: vector.keyId,
        installationId: vector.installationId,
        eventId: vector.eventId,
        issuedAtUnix: vector.timestampUnix,
      },
      vector.body,
    );
    assert.equal(produced, vector.signature, vector.name);
  }
});

test("законная доставка принимается и конверт разбирается", () => {
  for (const vector of deliveryContract.vectors) {
    const { envelope, signature } = verifyWebhook(headersFor(vector), vector.body, {
      keys: { id: vector.keyId, secret: vector.secret },
      now: at(vector),
    });
    assert.equal(envelope.event_id, vector.eventId);
    assert.equal(envelope.installation_id, vector.installationId);
    assert.equal(signature.keyId, vector.keyId);
    for (const field of deliveryContract.envelope.requiredFields) {
      assert.ok(field in envelope, `в конверте нет ${field}`);
    }
  }
});

test("подмена тела после подписи отвергается", () => {
  const vector = deliveryContract.vectors[0]!;
  const tampered = vector.body.replace('"payload":', '"injected":true,"payload":');
  assert.throws(
    () => verifyWebhook(headersFor(vector), tampered, {
      keys: { id: vector.keyId, secret: vector.secret },
      now: at(vector),
    }),
    (error: unknown) => error instanceof WebhookVerificationError && error.reason === "mismatch",
  );
});

test("чужой секрет при знакомом идентификаторе ключа отвергается", () => {
  const vector = deliveryContract.vectors[0]!;
  assert.throws(
    () => verifyWebhook(headersFor(vector), vector.body, {
      keys: { id: vector.keyId, secret: "whs_" + "0".repeat(64) },
      now: at(vector),
    }),
    (error: unknown) => error instanceof WebhookVerificationError && error.reason === "mismatch",
  );
});

test("незнакомый идентификатор ключа отвергается отдельной причиной", () => {
  const vector = deliveryContract.vectors[0]!;
  assert.throws(
    () => verifyWebhook(headersFor(vector), vector.body, {
      keys: { id: "whk_другой", secret: vector.secret },
      now: at(vector),
    }),
    (error: unknown) => error instanceof WebhookVerificationError && error.reason === "unknown_key",
  );
});

test("ротация: подходит любой из действующих ключей", () => {
  const vector = deliveryContract.vectors[0]!;
  const { envelope } = verifyWebhook(headersFor(vector), vector.body, {
    keys: [
      { id: "whk_новый", secret: "whs_" + "a".repeat(64) },
      { id: vector.keyId, secret: vector.secret },
    ],
    now: at(vector),
  });
  assert.equal(envelope.event_id, vector.eventId);
});

test("доставка без заголовков подписи отвергается", () => {
  const vector = deliveryContract.vectors[0]!;
  assert.throws(
    () => verifyWebhook({}, vector.body, { keys: { id: vector.keyId, secret: vector.secret } }),
    (error: unknown) => error instanceof WebhookVerificationError && error.reason === "missing",
  );
});

test("неизвестная версия схемы подписи отвергается", () => {
  const vector = deliveryContract.vectors[0]!;
  const headers = { ...headersFor(vector), "Akeda-Signature": `v2=${vector.signature}` };
  assert.throws(
    () => verifyWebhook(headers, vector.body, {
      keys: { id: vector.keyId, secret: vector.secret },
      now: at(vector),
    }),
    (error: unknown) => error instanceof WebhookVerificationError && error.reason === "version_unknown",
  );
});

test("окно двустороннее: и просроченная подпись, и подпись из будущего", () => {
  const vector = deliveryContract.vectors[0]!;
  const keys = { id: vector.keyId, secret: vector.secret };
  const beyond = deliveryContract.signature.windowSeconds + 60;
  for (const offset of [beyond, -beyond]) {
    assert.throws(
      () => verifyWebhook(headersFor(vector), vector.body, { keys, now: at(vector, offset) }),
      (error: unknown) => error instanceof WebhookVerificationError && error.reason === "expired",
      `смещение ${offset}`,
    );
  }
  // На границе окна доставка ещё принимается.
  verifyWebhook(headersFor(vector), vector.body, {
    keys,
    now: at(vector, deliveryContract.signature.windowSeconds),
  });
});

test("заголовки про одно событие, тело про другое — отказ", () => {
  const vector = deliveryContract.vectors[0]!;
  const other = deliveryContract.vectors[1]!;
  // Подписываем ЧУЖОЙ event_id в заголовке своим ключом: подпись сойдётся,
  // потому что заголовок входит в подписываемую строку целиком.
  const parts = {
    keyId: vector.keyId,
    installationId: vector.installationId,
    eventId: other.eventId,
    issuedAtUnix: vector.timestampUnix,
  };
  const signature = sign({ id: vector.keyId, secret: vector.secret }, parts, vector.body);
  const headers = { ...headersFor(vector, signature), "Akeda-Event-Id": other.eventId };
  assert.throws(
    () => verifyWebhook(headers, vector.body, {
      keys: { id: vector.keyId, secret: vector.secret },
      now: at(vector),
    }),
    (error: unknown) => error instanceof WebhookVerificationError && error.reason === "event_mismatch",
  );
});

test("конверт без обязательного поля отвергается", () => {
  const vector = deliveryContract.vectors[0]!;
  const body = JSON.stringify({ ...JSON.parse(vector.body), trace_id: "" });
  const parts = {
    keyId: vector.keyId,
    installationId: vector.installationId,
    eventId: vector.eventId,
    issuedAtUnix: vector.timestampUnix,
  };
  const signature = sign({ id: vector.keyId, secret: vector.secret }, parts, body);
  assert.throws(
    () => verifyWebhook(headersFor(vector, signature), body, {
      keys: { id: vector.keyId, secret: vector.secret },
      now: at(vector),
    }),
    (error: unknown) => error instanceof WebhookVerificationError && error.reason === "envelope_invalid",
  );
});

test("заголовки читаются без учёта регистра", () => {
  const vector = deliveryContract.vectors[0]!;
  const lowered = Object.fromEntries(
    Object.entries(headersFor(vector)).map(([name, value]) => [name.toLowerCase(), value]),
  );
  const signature = parseSignature((name) => lowered[name.toLowerCase()] ?? null);
  assert.equal(signature.eventId, vector.eventId);
});
