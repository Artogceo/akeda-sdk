import assert from "node:assert/strict";
import test from "node:test";

import { AkedaClient } from "../src/client.js";
import { apiKey, installationToken } from "../src/credentials.js";
import { AkedaError, AkedaUsageError } from "../src/errors.js";
import { collect } from "../src/pagination.js";
import { operationSpecs } from "../src/generated/operations.js";

const KEY = "ak_" + "0".repeat(64);

interface Recorded {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string | undefined;
}

function stub(responses: Array<{ status: number; body?: unknown; headers?: Record<string, string> }>) {
  const calls: Recorded[] = [];
  let index = 0;
  const fetchImpl: typeof fetch = async (input, init) => {
    const request = init ?? {};
    calls.push({
      url: String(input),
      method: String(request.method ?? "GET"),
      headers: { ...((request.headers ?? {}) as Record<string, string>) },
      body: typeof request.body === "string" ? request.body : undefined,
    });
    const next = responses[Math.min(index, responses.length - 1)]!;
    index += 1;
    const headers = new Headers({ "Content-Type": "application/json", ...(next.headers ?? {}) });
    return new Response(next.body === undefined ? "" : JSON.stringify(next.body), {
      status: next.status,
      headers,
    });
  };
  return { calls, fetchImpl };
}

function client(fetchImpl: typeof fetch, extra: Partial<ConstructorParameters<typeof AkedaClient>[0]> = {}) {
  return new AkedaClient({
    baseUrl: "https://erp.example.test",
    credentials: apiKey(KEY),
    tenant: "acme",
    fetch: fetchImpl,
    maxRetries: 0,
    ...extra,
  });
}

test("ключ без префикса ak_ отвергается до отправки", () => {
  assert.throws(() => apiKey("secret"), AkedaUsageError);
});

test("ключ кабинета без tenant не собирается", () => {
  assert.throws(
    () => new AkedaClient({ baseUrl: "https://erp.example.test", credentials: apiKey(KEY) }),
    AkedaUsageError,
  );
});

test("токен установки не требует кабинета: он берётся из токена", () => {
  const { fetchImpl } = stub([{ status: 200, body: {} }]);
  const instance = new AkedaClient({
    baseUrl: "https://erp.example.test",
    credentials: installationToken("ai_" + "1".repeat(32)),
    fetch: fetchImpl,
  });
  assert.ok(instance);
});

test("заголовки: Bearer, X-Tenant, Accept-Language", async () => {
  const { calls, fetchImpl } = stub([{ status: 200, body: { count: 0, results: [] } }]);
  await client(fetchImpl).call("coreListContacts", { query: { limit: 10 } });
  const call = calls[0]!;
  assert.equal(call.headers["Authorization"], `Bearer ${KEY}`);
  assert.equal(call.headers["X-Tenant"], "acme");
  assert.equal(call.headers["Accept-Language"], "ru");
  assert.equal(call.url, "https://erp.example.test/api/v1/core/contacts?limit=10");
});

test("параметр пути подставляется и экранируется", async () => {
  const { calls, fetchImpl } = stub([{ status: 200, body: {} }]);
  await client(fetchImpl).call("coreGetContact", { params: { id: "a b/c" } });
  assert.equal(calls[0]!.url, "https://erp.example.test/api/v1/core/contacts/a%20b%2Fc");
});

test("незаданный параметр пути — ошибка вызывающего, а не запрос с фигурными скобками", async () => {
  const { fetchImpl } = stub([{ status: 200, body: {} }]);
  await assert.rejects(() => client(fetchImpl).call("coreGetContact", {}), AkedaUsageError);
});

test("limit сверх объявленного потолка отвергается клиентом", async () => {
  const { fetchImpl } = stub([{ status: 200, body: {} }]);
  const spec = operationSpecs.coreListContacts;
  assert.equal(spec.pageSizeMax, 500);
  await assert.rejects(
    () => client(fetchImpl).call("coreListContacts", { query: { limit: 600 } }),
    AkedaUsageError,
  );
});

test("Idempotency-Key у операции, которая его не читает, отвергается", async () => {
  const { fetchImpl } = stub([{ status: 200, body: {} }]);
  await assert.rejects(
    () => client(fetchImpl).call("coreListContacts", { idempotencyKey: "abc" }),
    AkedaUsageError,
  );
});

test("Idempotency-Key уезжает у операции, которая его читает", async () => {
  const { calls, fetchImpl } = stub([
    { status: 201, body: { id: "1" }, headers: { "Idempotent-Replay": "true" } },
  ]);
  const result = await client(fetchImpl).call("coreCreateContact", {
    body: { name: "ООО Ромашка" } as never,
    idempotencyKey: "order-1",
  });
  assert.equal(calls[0]!.headers["Idempotency-Key"], "order-1");
  assert.equal(result.idempotentReplay, true);
});

test("конверт отказа разбирается: code, detail, request_id", async () => {
  const { fetchImpl } = stub([
    {
      status: 403,
      body: { detail: "Недостаточно прав.", code: "forbidden", request_id: "0199a1f0-0000-7000-8000-000000000009" },
    },
  ]);
  await assert.rejects(
    () => client(fetchImpl).call("coreListContacts"),
    (error: unknown) => {
      assert.ok(error instanceof AkedaError);
      assert.equal(error.status, 403);
      assert.equal(error.code, "forbidden");
      assert.equal(error.detail, "Недостаточно прав.");
      assert.equal(error.requestId, "0199a1f0-0000-7000-8000-000000000009");
      assert.match(error.message, /случай 0199a1f0/);
      return true;
    },
  );
});

test("идентификатор случая берётся из заголовка, когда тела нет", async () => {
  const { fetchImpl } = stub([
    { status: 500, body: { detail: "Внутренняя ошибка." }, headers: { "X-Request-ID": "0199a1f0-0000-7000-8000-00000000000f" } },
  ]);
  await assert.rejects(
    () => client(fetchImpl).call("coreListContacts"),
    (error: unknown) => error instanceof AkedaError && error.requestId === "0199a1f0-0000-7000-8000-00000000000f",
  );
});

test("429 несёт retry_after и заголовки RateLimit-*", async () => {
  const { fetchImpl } = stub([
    {
      status: 429,
      body: { detail: "Слишком часто.", code: "rate_limited", retry_after: 7 },
      headers: { "RateLimit-Limit": "600", "RateLimit-Remaining": "0", "RateLimit-Reset": "7" },
    },
  ]);
  await assert.rejects(
    () => client(fetchImpl).call("coreListContacts"),
    (error: unknown) => {
      assert.ok(error instanceof AkedaError);
      assert.equal(error.retryAfter, 7);
      assert.equal(error.rateLimit.limit, 600);
      assert.equal(error.retryable, true);
      return true;
    },
  );
});

test("команда без ключа идемпотентности не повторяется автоматически", async () => {
  const { calls, fetchImpl } = stub([{ status: 503, body: { detail: "Недоступно." } }]);
  const instance = client(fetchImpl, { maxRetries: 3 });
  await assert.rejects(() => instance.call("coreCreateContact", { body: {} as never }));
  assert.equal(calls.length, 1, "POST без ключа повторять нельзя: документ провёлся бы дважды");
});

test("чтение повторяется, пока сервер сам просит", async () => {
  const { calls, fetchImpl } = stub([
    { status: 503, body: { detail: "Недоступно." }, headers: { "Retry-After": "0" } },
    { status: 503, body: { detail: "Недоступно." }, headers: { "Retry-After": "0" } },
    { status: 200, body: { count: 0, results: [] } },
  ]);
  const instance = client(fetchImpl, { maxRetries: 2 });
  const result = await instance.call("coreListContacts");
  assert.equal(result.status, 200);
  assert.equal(calls.length, 3);
});

test("листание идёт до короткой страницы, а не до count", async () => {
  const page = (n: number) => ({ status: 200, body: { count: n, results: Array.from({ length: n }, (_, i) => ({ i })) } });
  const { calls, fetchImpl } = stub([page(500), page(500), page(3)]);
  const rows = await collect(client(fetchImpl), "coreListContacts");
  assert.equal(rows.length, 1003);
  assert.equal(calls.length, 3);
  assert.match(calls[1]!.url, /offset=500/);
});

test("операция с чужой схемой листания отвергается вслух", async () => {
  const { fetchImpl } = stub([{ status: 200, body: { results: [] } }]);
  assert.equal(operationSpecs.chatListConversations.pagination, "cursor");
  await assert.rejects(async () => {
    for await (const _row of (await import("../src/pagination.js")).paginate(
      client(fetchImpl),
      "chatListConversations",
    )) {
      break;
    }
  }, AkedaUsageError);
});
