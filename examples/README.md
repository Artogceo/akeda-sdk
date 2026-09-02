# Примеры

Все примеры запускаются. Три из них — приёмники событий — проверены целиком:
CLI бил по каждому полным набором conformance, и каждый прошёл шестнадцать
проверок. Примеры первого вызова требуют живого ключа кабинета и проверены
только сборкой и типами: контура для проверки чужого ключа у нас нет.

| Пример | Что делает |
|---|---|
| `quickstart-go/` | первый вызов и листание на Go |
| `quickstart-python/` | то же на Python |
| `typescript/first-call.ts` | то же на TypeScript |
| `webhook-receiver-go/` | приёмник подписанных событий на Go |
| `webhook-receiver-python/` | то же на Python (стандартная библиотека) |
| `typescript/receiver.ts` | то же на Node.js |
| `extension/app.json` | манифест расширения; проходит `akeda manifest lint` |
| `extension/target.json` | описание приёмника для conformance |

## Первый вызов

```bash
export AKEDA_API_KEY='ak_…'
export AKEDA_TENANT='ваш-кабинет'
export AKEDA_BASE_URL='https://erp.akeda.ru'   # необязательно; вшитого адреса нет

go run ./examples/quickstart-go
PYTHONPATH=clients/python python3 examples/quickstart-python/first_call.py
```

TypeScript собирается компилятором пакета:

```bash
cd clients/typescript && npm install && cd -
cd clients/typescript && npx tsc -p ../../examples/typescript/tsconfig.json \
  --noEmit false --outDir /tmp/akeda-examples && cd -
node /tmp/akeda-examples/examples/typescript/first-call.js
```

## Приёмник событий

```bash
export AKEDA_WEBHOOK_SECRET='whs_…'      # секрет подписи установки
export AKEDA_WEBHOOK_KEY_ID='whk_…'
export AKEDA_INSTALLATION_ID='…'
export AKEDA_TENANT_ID='…'
export AKEDA_EFFECT_PROBE=1              # ручка отладочной сборки

go run ./examples/webhook-receiver-go
# или
PYTHONPATH=clients/python python3 examples/webhook-receiver-python/receiver.py
# или (после сборки, как выше)
node /tmp/akeda-examples/examples/typescript/receiver.js
```

В другом окне:

```bash
AKEDA_CONFORMANCE_SIGNING_SECRET="$AKEDA_WEBHOOK_SECRET" \
  go run ./cmd/akeda conformance run examples/extension/target.json
```

Значения из `examples/extension/target.json` синтетические и совпадают с
векторами опубликованного контракта: ни к одной живой установке они не подходят.

`AKEDA_EFFECT_PROBE=1` включает ручку `/applied`, без которой проверка
идемпотентности честно пропускается. **В боевой сборке такой ручки быть не
должно**: она отвечает на вопрос «применял ли ты этот факт», а такой ответ
никому снаружи не положен.

## Что в примерах приёмника стоит перечитать

Дедупликация в них живёт в памяти — только ради краткости. В бою это строка в
вашей базе с уникальным индексом по `event_id`, поставленная **той же
транзакцией**, что и последствие факта: карта в памяти теряется при перезапуске,
а повтор придёт и через сутки.
