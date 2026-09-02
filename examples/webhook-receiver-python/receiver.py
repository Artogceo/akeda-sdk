#!/usr/bin/env python3
"""Приёмник подписанных событий Akeda на Python (стандартная библиотека).

    export AKEDA_WEBHOOK_SECRET='whs_…'
    export AKEDA_WEBHOOK_KEY_ID='whk_…'
    export AKEDA_INSTALLATION_ID='…'
    export AKEDA_TENANT_ID='…'
    PYTHONPATH=clients/python python3 examples/webhook-receiver-python/receiver.py

Проверка (живой Akeda не нужен):

    AKEDA_CONFORMANCE_SIGNING_SECRET="$AKEDA_WEBHOOK_SECRET" \\
      go run ./cmd/akeda conformance run examples/extension/target.json

ЧЕТЫРЕ ВЕЩИ, БЕЗ КОТОРЫХ ПРИЁМНИК НЕПРАВИЛЬНЫЙ, и все четыре видны ниже:

1. СЫРЫЕ БАЙТЫ. Дайджест считается по тому, что пришло; фреймворк, разобравший
   тело до вас, ломает проверку подписи;
2. ОКОНЧАТЕЛЬНЫЙ ОТКАЗ. Подделка получает 4xx, а не 5xx: 5xx заставит Akeda
   повторить её пятнадцать раз;
3. ПРОВЕРКА КАБИНЕТА. Подпись сошлась — это ещё не «событие моё»: установка
   принципал ОДНОГО кабинета;
4. ИДЕМПОТЕНТНОСТЬ. Повтор — норма доставки; факт применяется один раз на
   event_id, а 2xx возвращается и на первую доставку, и на все следующие.
"""

from __future__ import annotations

import json
import os
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from akeda import SigningKey, WebhookVerificationError, verify_webhook

SECRET = os.environ.get("AKEDA_WEBHOOK_SECRET", "")
KEY_ID = os.environ.get("AKEDA_WEBHOOK_KEY_ID", "")
INSTALLATION_ID = os.environ.get("AKEDA_INSTALLATION_ID", "")
TENANT_ID = os.environ.get("AKEDA_TENANT_ID", "")

# Ключей может быть два: во время ротации Akeda ещё подписывает предыдущим, пока
# вы не выкатили новый. Держите оба, пока перекрытие не кончилось.
KEYS = [SigningKey(KEY_ID, SECRET)]
if os.environ.get("AKEDA_WEBHOOK_KEY_ID_PREVIOUS") and os.environ.get("AKEDA_WEBHOOK_SECRET_PREVIOUS"):
    KEYS.append(
        SigningKey(
            os.environ["AKEDA_WEBHOOK_KEY_ID_PREVIOUS"],
            os.environ["AKEDA_WEBHOOK_SECRET_PREVIOUS"],
        )
    )

# В памяти дедупликация только в примере. В бою это строка в вашей базе с
# уникальным индексом по event_id, поставленная ТОЙ ЖЕ транзакцией, что и
# последствие факта: словарь теряется при перезапуске, а повтор придёт и через
# сутки.
APPLIED: set[str] = set()


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt: str, *args) -> None:
        sys.stderr.write("%s\n" % (fmt % args))

    def do_GET(self) -> None:  # noqa: N802
        if self.path.startswith("/health"):
            # Живость — это 2xx в срок, и ничего больше. Ни разбора тела, ни
            # поля status: требование к форме ответа превратило бы проверку в
            # маленький собственный протокол.
            self.send_response(200)
            self.end_headers()
            return
        if self.path.startswith("/applied") and os.environ.get("AKEDA_EFFECT_PROBE") == "1":
            # Ручка отладочной сборки. В боевой её быть не должно: она отвечает
            # на вопрос «применял ли ты этот факт».
            from urllib.parse import parse_qs, urlparse

            event_id = parse_qs(urlparse(self.path).query).get("event_id", [""])[0]
            payload = json.dumps({"applied": 1 if event_id in APPLIED else 0}).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return
        self.send_response(404)
        self.end_headers()

    def do_POST(self) -> None:  # noqa: N802
        if not self.path.startswith("/events"):
            self.send_response(404)
            self.end_headers()
            return
        length = int(self.headers.get("Content-Length") or 0)
        body = self.rfile.read(length)  # СЫРЫЕ БАЙТЫ

        try:
            envelope = verify_webhook(dict(self.headers.items()), body, KEYS)
        except WebhookVerificationError as error:
            # Причина в свой лог, а не в ответ: тело ответа приёмника Akeda
            # кладёт в журнал доставки как есть.
            self.log_message("доставка отклонена (%s): %s", error.reason, error)
            self.send_response(400)  # окончательный отказ, не 5xx
            self.end_headers()
            return

        if envelope["installation_id"] != INSTALLATION_ID or envelope["tenant_id"] != TENANT_ID:
            self.log_message("чужая установка %s", envelope["installation_id"])
            self.send_response(403)
            self.end_headers()
            return

        event_id = envelope["event_id"]
        if event_id in APPLIED:
            self.log_message("повтор %s — принят и проигнорирован", event_id)
        else:
            APPLIED.add(event_id)
            self.log_message("новый факт %s: %s", event_id, envelope["type"])
            # Здесь ваша работа. Она должна укладываться в дедлайн попытки:
            # долгую — в очередь, а Akeda ответить сразу.

        self.send_response(200)
        self.end_headers()


def main() -> int:
    if not all([SECRET, KEY_ID, INSTALLATION_ID, TENANT_ID]):
        print(
            "нужны AKEDA_WEBHOOK_SECRET, AKEDA_WEBHOOK_KEY_ID, "
            "AKEDA_INSTALLATION_ID и AKEDA_TENANT_ID",
            file=sys.stderr,
        )
        return 2
    address = os.environ.get("AKEDA_RECEIVER_ADDR", "127.0.0.1:8081")
    host, _, port = address.rpartition(":")
    server = ThreadingHTTPServer((host or "127.0.0.1", int(port)), Handler)
    print(f"приёмник слушает {address} (POST /events, GET /health)")
    server.serve_forever()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
