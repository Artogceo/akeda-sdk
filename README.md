# Akeda SDK

Всё, что нужно партнёру, чтобы написать расширение Akeda ERP: снимок контракта,
типизированные клиенты для TypeScript, Python и Go, CLI и работающие примеры.

Репозиторий **открытый**, но пакеты отсюда никуда не публикуются: ни в npm, ни
в PyPI, ни в pkg.go.dev — берите исходники. Права — [LICENSE](LICENSE):
использовать и поставлять В СОСТАВЕ своего расширения, пока действует договор.

---

## Что здесь есть и чего нет

**Есть.** Публичный REST `/api/v1/*` под ключом кабинета: 770 внешних операций,
из них 30 стадии `public` с зафиксированной формой. Слой ссылок на справочники.
Схема манифеста расширения. Контракт подписанной доставки событий с векторами.
Проверка приёмника событий, не требующая живой Akeda.

**Нет, и SDK этого не изображает.** Внешней двери к каталогу приложений: завести
приложение, выпустить версию, поставить её кабинету, обновить и откатить умеет
персонал платформы, и операторские операции наружу не выходят. Токен установки
выдаёт человек — публичного обмена учётных данных на токен нет. `akeda apps`
говорит это прямым текстом вместо того, чтобы выдумывать вызов.

Стенд разработчика `sandbox.akeda.ru` поднят: отдельная машина, своя база, свои
ключи, синтетические данные. Команды этого SDK против него **не проверены** —
адрес по умолчанию боевой, и стенд задаётся через `--base-url`.

Развёрнуто: [docs/state-of-the-contour.md](docs/state-of-the-contour.md).

---

## За пятнадцать минут: первый вызов

Нужен ключ кабинета: **Настройки → API-ключи**, область `core:read`. Значение
приходит в поле `key` РОВНО ОДИН РАЗ, в ответе на создание.

```bash
export AKEDA_API_KEY='ak_…'        # 'ak_' и 64 шестнадцатеричных знака
export AKEDA_TENANT='ваш-кабинет'  # slug КАБИНЕТА; юрлицо живёт внутри кабинета
```

Проверить ключ можно раньше любого SDK:

```bash
curl -sS "https://erp.akeda.ru/api/v1/reference/catalog" \
  -H "Authorization: Bearer $AKEDA_API_KEY" \
  -H "X-Tenant: $AKEDA_TENANT"
```

Дальше — на своём языке.

```bash
# Go
go run ./examples/quickstart-go

# Python (зависимостей нет)
PYTHONPATH=clients/python python3 examples/quickstart-python/first_call.py

# TypeScript — сборка и запуск описаны в examples/README.md
cd clients/typescript && npm install && npm run build && cd -
```

Что делает пример: читает каталог справочников (операция `public`), затем
листает контрагентов правильным способом. Полностью —
[docs/quickstart.md](docs/quickstart.md).

## За тридцать минут: первое событие

Событие приходит на ваш сервер подписанным. Поднимите приёмник и проверьте его
**не поднимая ничего у Akeda**: набор сам становится диспетчером и бьёт по вашему
адресу теми же байтами, что уедут в бою.

```bash
export AKEDA_WEBHOOK_SECRET='whs_…' AKEDA_WEBHOOK_KEY_ID='whk_…'
export AKEDA_INSTALLATION_ID='…'   AKEDA_TENANT_ID='…'
export AKEDA_EFFECT_PROBE=1        # ручка отладочной сборки; в бою её быть не должно

go run ./examples/webhook-receiver-go &                       # или Python/TypeScript
AKEDA_CONFORMANCE_SIGNING_SECRET="$AKEDA_WEBHOOK_SECRET" \
  go run ./cmd/akeda conformance run examples/extension/target.json
```

Ожидаемый итог — шестнадцать пройденных проверок и четыре честных пропуска:
обратное направление (расширение как клиент нашего API) снаружи непроверяемо, и
набор говорит об этом так же громко, как об отказах.

Подробно — [docs/webhooks.md](docs/webhooks.md).

---

## Раскладка

| Каталог | Что это |
|---|---|
| `snapshot/` | снимок релиза: OpenAPI, схема манифеста, контракт доставки, схемы слоя ссылок, опись с контрольными суммами |
| `clients/typescript`, `clients/python`, `clients/go` | клиенты: `generated/` собирает генератор, остальное написано руками |
| `cmd/akeda` | CLI: контракт, вход разработчика, линт манифеста, проверка приёмника |
| `examples/` | запускаемые примеры: первый вызов и приёмник на трёх языках |
| `scripts/` | снятие снимка, генерация типов, машинная проверка на секреты |
| `docs/` | как этим пользоваться и почему оно устроено именно так |

## Снимок: откуда берётся контракт

Снимок снимается **скриптом и только из опубликованных артефактов Akeda** —
из того, что Akeda уже отдаёт анонимному читателю справочника. Исходник
контракта не читается никогда: в нём операторская половина системы и имена
внутренних обработчиков.

```bash
python3 scripts/snapshot.py --source <дерево Akeda ERP>   # снять
python3 scripts/snapshot.py --check                       # опись сходится
python3 scripts/generate.py                               # типы клиентов
python3 scripts/generate.py --check                       # generated совпадают со снимком
```

Скрипт детерминирован и не хранит времени снятия: одинаковый вход даёт
побайтово одинаковый выход. Подробно — [docs/snapshot.md](docs/snapshot.md).

## Проверки

```bash
python3 scripts/snapshot.py --check
python3 scripts/generate.py --check
python3 scripts/scan_secrets.py

cd clients/typescript && npm install && npm test && cd -
cd clients/python && python3 -m pytest && cd -
gofmt -l . && go vet ./... && go test ./...
```

## Что читать дальше

- [docs/quickstart.md](docs/quickstart.md) — первый вызов, шаг за шагом
- [docs/errors-and-limits.md](docs/errors-and-limits.md) — отказы, листание, идемпотентность, лимиты
- [docs/webhooks.md](docs/webhooks.md) — подпись, приёмник, conformance
- [docs/state-of-the-contour.md](docs/state-of-the-contour.md) — что работает, что построено и не открыто, чего нет вовсе
- [docs/snapshot.md](docs/snapshot.md) — как обновляется снимок на следующем релизе
- [CONTRIBUTING.md](CONTRIBUTING.md) — как вносить правки
- [SECURITY.md](SECURITY.md) — куда сообщать об уязвимости

---

## English

Akeda ERP partner SDK: a snapshot of the published API contract, typed clients
for TypeScript, Python and Go, a CLI, and runnable examples.

This repository is **public**, but nothing here is published to npm, PyPI or
pkg.go.dev — take the sources. See [LICENSE](LICENSE): you may use and ship
these materials **as part of your own Akeda extension** while your agreement
with Akeda is in force.

The contract snapshot is taken **only from Akeda's published artifacts**, by a
deterministic script — never from the internal source of the contract, which
contains the operator half of the system.

Documentation is written in Russian, the working language of the platform. Code,
identifiers and error codes are English; system-facing texts on Akeda's own
screens are localised in both languages.
