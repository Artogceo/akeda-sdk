from __future__ import annotations

import json

import pytest

from akeda.webhook import (
    DEFAULT_WINDOW_SECONDS,
    SIGNATURE_VERSION,
    Signature,
    SigningKey,
    WebhookVerificationError,
    parse_signature,
    sign,
    verify_webhook,
)


def headers_for(vector: dict, signature: str | None = None) -> dict:
    return {
        "Akeda-Signature": f"{SIGNATURE_VERSION}={signature or vector['signature']}",
        "Akeda-Signature-Key-Id": vector["keyId"],
        "Akeda-Signature-Timestamp": str(vector["timestampUnix"]),
        "Akeda-Installation-Id": vector["installationId"],
        "Akeda-Event-Id": vector["eventId"],
    }


def signature_of(vector: dict, **overrides) -> Signature:
    fields = {
        "version": SIGNATURE_VERSION,
        "key_id": vector["keyId"],
        "installation_id": vector["installationId"],
        "event_id": vector["eventId"],
        "issued_at_unix": vector["timestampUnix"],
    }
    fields.update(overrides)
    return Signature(**fields)


def test_constants_match_published_contract(delivery_contract: dict) -> None:
    assert SIGNATURE_VERSION == delivery_contract["signature"]["version"]
    assert DEFAULT_WINDOW_SECONDS == delivery_contract["signature"]["windowSeconds"]
    assert delivery_contract["signature"]["algorithm"] == "HMAC-SHA256"


def test_signature_matches_contract_vectors(vectors: list) -> None:
    assert len(vectors) >= 2
    for vector in vectors:
        key = SigningKey(vector["keyId"], vector["secret"])
        produced = sign(key, signature_of(vector), vector["body"].encode("utf-8"))
        assert produced == vector["signature"], vector["name"]


def test_legitimate_delivery_is_accepted(vectors: list, delivery_contract: dict) -> None:
    for vector in vectors:
        envelope = verify_webhook(
            headers_for(vector),
            vector["body"],
            SigningKey(vector["keyId"], vector["secret"]),
            now=vector["timestampUnix"],
        )
        assert envelope["event_id"] == vector["eventId"]
        for field in delivery_contract["envelope"]["requiredFields"]:
            assert field in envelope


def test_tampered_body_is_rejected(vectors: list) -> None:
    vector = vectors[0]
    tampered = vector["body"].replace('"payload":', '"injected":true,"payload":')
    with pytest.raises(WebhookVerificationError) as caught:
        verify_webhook(
            headers_for(vector), tampered, SigningKey(vector["keyId"], vector["secret"]),
            now=vector["timestampUnix"],
        )
    assert caught.value.reason == "mismatch"


def test_wrong_secret_with_known_key_id_is_rejected(vectors: list) -> None:
    vector = vectors[0]
    with pytest.raises(WebhookVerificationError) as caught:
        verify_webhook(
            headers_for(vector), vector["body"], SigningKey(vector["keyId"], "whs_" + "0" * 64),
            now=vector["timestampUnix"],
        )
    assert caught.value.reason == "mismatch"


def test_unknown_key_id_has_its_own_reason(vectors: list) -> None:
    vector = vectors[0]
    with pytest.raises(WebhookVerificationError) as caught:
        verify_webhook(
            headers_for(vector), vector["body"], SigningKey("whk_other", vector["secret"]),
            now=vector["timestampUnix"],
        )
    assert caught.value.reason == "unknown_key"


def test_rotation_accepts_any_active_key(vectors: list) -> None:
    vector = vectors[0]
    envelope = verify_webhook(
        headers_for(vector),
        vector["body"],
        [SigningKey("whk_new", "whs_" + "a" * 64), SigningKey(vector["keyId"], vector["secret"])],
        now=vector["timestampUnix"],
    )
    assert envelope["installation_id"] == vector["installationId"]


def test_missing_headers_are_rejected(vectors: list) -> None:
    vector = vectors[0]
    with pytest.raises(WebhookVerificationError) as caught:
        verify_webhook({}, vector["body"], SigningKey(vector["keyId"], vector["secret"]))
    assert caught.value.reason == "missing"


def test_unknown_signature_version_is_rejected(vectors: list) -> None:
    vector = vectors[0]
    headers = headers_for(vector)
    headers["Akeda-Signature"] = f"v2={vector['signature']}"
    with pytest.raises(WebhookVerificationError) as caught:
        verify_webhook(
            headers, vector["body"], SigningKey(vector["keyId"], vector["secret"]),
            now=vector["timestampUnix"],
        )
    assert caught.value.reason == "version_unknown"


@pytest.mark.parametrize("direction", [1, -1])
def test_window_is_two_sided(vectors: list, direction: int) -> None:
    vector = vectors[0]
    beyond = vector["timestampUnix"] + direction * (DEFAULT_WINDOW_SECONDS + 60)
    with pytest.raises(WebhookVerificationError) as caught:
        verify_webhook(
            headers_for(vector), vector["body"], SigningKey(vector["keyId"], vector["secret"]),
            now=beyond,
        )
    assert caught.value.reason == "expired"


def test_window_edge_is_still_accepted(vectors: list) -> None:
    vector = vectors[0]
    verify_webhook(
        headers_for(vector),
        vector["body"],
        SigningKey(vector["keyId"], vector["secret"]),
        now=vector["timestampUnix"] + DEFAULT_WINDOW_SECONDS,
    )


def test_header_body_mismatch_is_rejected(vectors: list) -> None:
    vector, other = vectors[0], vectors[1]
    key = SigningKey(vector["keyId"], vector["secret"])
    # Подписываем ЧУЖОЙ event_id в заголовке своим ключом: подпись сойдётся,
    # потому что заголовок входит в подписываемую строку целиком.
    signature = sign(key, signature_of(vector, event_id=other["eventId"]), vector["body"].encode())
    headers = headers_for(vector, signature)
    headers["Akeda-Event-Id"] = other["eventId"]
    with pytest.raises(WebhookVerificationError) as caught:
        verify_webhook(headers, vector["body"], key, now=vector["timestampUnix"])
    assert caught.value.reason == "event_mismatch"


def test_envelope_without_required_field_is_rejected(vectors: list) -> None:
    vector = vectors[0]
    key = SigningKey(vector["keyId"], vector["secret"])
    body = json.dumps({**json.loads(vector["body"]), "trace_id": ""}).encode("utf-8")
    signature = sign(key, signature_of(vector), body)
    with pytest.raises(WebhookVerificationError) as caught:
        verify_webhook(headers_for(vector, signature), body, key, now=vector["timestampUnix"])
    assert caught.value.reason == "envelope_invalid"


def test_headers_are_case_insensitive(vectors: list) -> None:
    vector = vectors[0]
    lowered = {name.lower(): value for name, value in headers_for(vector).items()}
    assert parse_signature(lowered).event_id == vector["eventId"]


def test_secret_never_appears_in_repr(vectors: list) -> None:
    vector = vectors[0]
    assert vector["secret"] not in repr(SigningKey(vector["keyId"], vector["secret"]))
