from __future__ import annotations

import json
from typing import Any, List, Mapping, Optional

import pytest

from akeda import (
    OPERATIONS,
    AkedaClient,
    AkedaError,
    AkedaUsageError,
    RawResponse,
    Transport,
    api_key,
    collect,
    installation_token,
    paginate,
    public_operations,
)

KEY = "ak_" + "0" * 64


class StubTransport(Transport):
    def __init__(self, responses: List[dict]) -> None:
        self.responses = responses
        self.calls: List[dict] = []
        self._index = 0

    def send(self, method, url, headers, body, timeout) -> RawResponse:
        self.calls.append({"method": method, "url": url, "headers": dict(headers), "body": body})
        response = self.responses[min(self._index, len(self.responses) - 1)]
        self._index += 1
        payload = response.get("body")
        raw = b"" if payload is None else json.dumps(payload, ensure_ascii=False).encode("utf-8")
        response_headers = {"Content-Type": "application/json"}
        response_headers.update(response.get("headers", {}))
        return RawResponse(response["status"], response_headers, raw)


def client(transport: Transport, **extra: Any) -> AkedaClient:
    options = dict(
        base_url="https://erp.example.test",
        credentials=api_key(KEY),
        tenant="acme",
        transport=transport,
        max_retries=0,
        sleep=lambda _: None,
    )
    options.update(extra)
    return AkedaClient(**options)


def test_key_without_prefix_is_rejected_before_sending() -> None:
    with pytest.raises(AkedaUsageError):
        api_key("secret")


def test_tenant_key_requires_tenant() -> None:
    with pytest.raises(AkedaUsageError):
        AkedaClient(base_url="https://erp.example.test", credentials=api_key(KEY))


def test_installation_token_does_not_require_tenant() -> None:
    AkedaClient(
        base_url="https://erp.example.test",
        credentials=installation_token("ai_" + "1" * 32),
        transport=StubTransport([{"status": 200, "body": {}}]),
    )


def test_headers() -> None:
    transport = StubTransport([{"status": 200, "body": {"count": 0, "results": []}}])
    client(transport).call("coreListContacts", query={"limit": 10})
    call = transport.calls[0]
    assert call["headers"]["Authorization"] == f"Bearer {KEY}"
    assert call["headers"]["X-Tenant"] == "acme"
    assert call["url"] == "https://erp.example.test/api/v1/core/contacts?limit=10"


def test_path_parameter_is_substituted_and_escaped() -> None:
    transport = StubTransport([{"status": 200, "body": {}}])
    client(transport).call("coreGetContact", params={"id": "a b/c"})
    assert transport.calls[0]["url"] == "https://erp.example.test/api/v1/core/contacts/a%20b%2Fc"


def test_missing_path_parameter_is_a_usage_error() -> None:
    transport = StubTransport([{"status": 200, "body": {}}])
    with pytest.raises(AkedaUsageError):
        client(transport).call("coreGetContact")


def test_limit_above_declared_cap_is_refused() -> None:
    transport = StubTransport([{"status": 200, "body": {}}])
    assert OPERATIONS["coreListContacts"].page_size_max == 500
    with pytest.raises(AkedaUsageError):
        client(transport).call("coreListContacts", query={"limit": 600})


def test_idempotency_key_on_operation_that_ignores_it_is_refused() -> None:
    transport = StubTransport([{"status": 200, "body": {}}])
    with pytest.raises(AkedaUsageError):
        client(transport).call("coreListContacts", idempotency_key="abc")


def test_idempotency_key_is_sent_where_the_contract_reads_it() -> None:
    transport = StubTransport(
        [{"status": 201, "body": {"id": "1"}, "headers": {"Idempotent-Replay": "true"}}]
    )
    result = client(transport).call(
        "coreCreateContact", body={"name": "ООО Ромашка"}, idempotency_key="order-1"
    )
    assert transport.calls[0]["headers"]["Idempotency-Key"] == "order-1"
    assert result.idempotent_replay is True


def test_error_envelope_is_parsed() -> None:
    transport = StubTransport(
        [
            {
                "status": 403,
                "body": {
                    "detail": "Недостаточно прав.",
                    "code": "forbidden",
                    "request_id": "0199a1f0-0000-7000-8000-000000000009",
                },
            }
        ]
    )
    with pytest.raises(AkedaError) as caught:
        client(transport).call("coreListContacts")
    error = caught.value
    assert error.status == 403
    assert error.code == "forbidden"
    assert error.request_id == "0199a1f0-0000-7000-8000-000000000009"
    assert "случай 0199a1f0" in str(error)


def test_request_id_falls_back_to_header() -> None:
    transport = StubTransport(
        [
            {
                "status": 500,
                "body": {"detail": "Внутренняя ошибка."},
                "headers": {"X-Request-ID": "0199a1f0-0000-7000-8000-00000000000f"},
            }
        ]
    )
    with pytest.raises(AkedaError) as caught:
        client(transport).call("coreListContacts")
    assert caught.value.request_id == "0199a1f0-0000-7000-8000-00000000000f"


def test_rate_limited_response() -> None:
    transport = StubTransport(
        [
            {
                "status": 429,
                "body": {"detail": "Слишком часто.", "code": "rate_limited", "retry_after": 7},
                "headers": {"RateLimit-Limit": "600", "RateLimit-Remaining": "0"},
            }
        ]
    )
    with pytest.raises(AkedaError) as caught:
        client(transport).call("coreListContacts")
    assert caught.value.retry_after == 7
    assert caught.value.rate_limit.limit == 600
    assert caught.value.retryable is True


def test_command_without_idempotency_key_is_not_retried() -> None:
    transport = StubTransport([{"status": 503, "body": {"detail": "Недоступно."}}])
    with pytest.raises(AkedaError):
        client(transport, max_retries=3).call("coreCreateContact", body={})
    assert len(transport.calls) == 1


def test_read_is_retried_while_the_server_asks() -> None:
    transport = StubTransport(
        [
            {"status": 503, "body": {"detail": "Недоступно."}, "headers": {"Retry-After": "0"}},
            {"status": 503, "body": {"detail": "Недоступно."}, "headers": {"Retry-After": "0"}},
            {"status": 200, "body": {"count": 0, "results": []}},
        ]
    )
    result = client(transport, max_retries=2).call("coreListContacts")
    assert result.status == 200
    assert len(transport.calls) == 3


def test_pagination_stops_on_short_page_not_on_count() -> None:
    def page(rows: int) -> dict:
        return {"status": 200, "body": {"count": rows, "results": [{"i": i} for i in range(rows)]}}

    transport = StubTransport([page(500), page(500), page(3)])
    rows = collect(client(transport), "coreListContacts")
    assert len(rows) == 1003
    assert len(transport.calls) == 3
    assert "offset=500" in transport.calls[1]["url"]


def test_pagination_refuses_foreign_schemes() -> None:
    transport = StubTransport([{"status": 200, "body": {"results": []}}])
    assert OPERATIONS["chatListConversations"].pagination == "cursor"
    with pytest.raises(AkedaUsageError):
        next(paginate(client(transport), "chatListConversations"))


def test_contract_facts_match_documentation() -> None:
    """Числа контракта, на которые опирается рантайм."""
    assert len(OPERATIONS) == 770
    assert len(public_operations()) == 30
    assert sorted(name for name, spec in OPERATIONS.items() if spec.idempotent) == [
        "coreCreateContact",
        "coreCreateDocument",
        "coreCreateProduct",
        "corePostDocument",
        "tasksCreateTask",
    ]
