# Первый вызов и первое событие

Цель — первый успешный вызов за пятнадцать минут и первое обработанное событие
за тридцать.

## Шаг 1. Ключ

**Настройки → API-ключи** в кабинете, либо `POST /api/v1/settings/api-keys`.

Что важно знать до выпуска:

- значение приходит в поле `key` **ровно один раз** — в ответе на создание.
  Список ключей отдаёт только `prefix` (первые 12 знаков) и маску `hint`;
- ключу нельзя выдать право, которого нет у создателя. Попытка — `403`;
- пустой список `scopes` заменяется на `["tasks:read"]`. Для примеров ниже нужен
  `core:read`, для разрешения ссылок — ещё и `core:write`;
- `rate_limit_per_min` по умолчанию 600;
- `personal: true` выдаёт ключ человеку, а не кабинету. Права такого ключа —
  пересечение роли владельца и областей ключа.

Форма значения — `ak_` и 64 шестнадцатеричных знака.

```bash
export AKEDA_API_KEY='ak_…'
export AKEDA_TENANT='ваш-кабинет'   # slug КАБИНЕТА; юрлицо живёт внутри кабинета
```

Заголовок `X-Tenant` шлите **всегда**. Кабинетный ключ находит свой кабинет сам
и на заголовок не смотрит; личный без заголовка отвечает `400 tenant_required`.
Один и тот же код тогда работает с обоими видами ключа.

## Шаг 2. Вызов без всякого SDK

```bash
curl -sS "https://erp.akeda.ru/api/v1/reference/catalog" \
  -H "Authorization: Bearer $AKEDA_API_KEY" \
  -H "X-Tenant: $AKEDA_TENANT" \
  -H "Accept: application/json"
```

Если это не сработало — SDK не поможет, дело в ключе или правах. Смотрите
[errors-and-limits.md](errors-and-limits.md) § 1.

## Шаг 3. Тот же вызов из кода

### TypeScript

```bash
cd clients/typescript && npm install && npm run build && cd -
```

```ts
import { AkedaClient, apiKey, collect, ENVIRONMENTS } from "@akeda/sdk";

const client = new AkedaClient({
  baseUrl: process.env.AKEDA_BASE_URL ?? ENVIRONMENTS.production,
  credentials: apiKey(process.env.AKEDA_API_KEY!),
  tenant: process.env.AKEDA_TENANT,
});

const { data } = await client.call("coreReferenceCatalog");
console.log(data.count, data.results[0]?.key);

// Листание: обход останавливается на короткой странице, а не по count.
const contacts = await collect(client, "coreListContacts", { maxItems: 25 });
```

Имя операции проверяет компилятор, форму параметров и ответа — тоже: `call`
типизирован сгенерированной картой `OperationTypes`.

### Python

Зависимостей нет — только стандартная библиотека.

```python
from akeda import AkedaClient, api_key, paginate

client = AkedaClient(
    base_url=os.environ.get("AKEDA_BASE_URL", "https://erp.akeda.ru"),
    credentials=api_key(os.environ["AKEDA_API_KEY"]),
    tenant=os.environ.get("AKEDA_TENANT"),
)

catalog = client.call("coreReferenceCatalog").data
for contact in paginate(client, "coreListContacts", max_items=25):
    print(contact["name"])
```

```bash
PYTHONPATH=clients/python python3 examples/quickstart-python/first_call.py
```

### Go

```go
credentials, err := akeda.APIKey(os.Getenv("AKEDA_API_KEY"))
client, err := akeda.New(akeda.Options{
    BaseURL: akeda.ProductionBaseURL,
    Credentials: credentials,
    Tenant: os.Getenv("AKEDA_TENANT"),
})
result, err := client.Call(ctx, "coreReferenceCatalog", akeda.Request{})
```

```bash
go run ./examples/quickstart-go
```

## Шаг 4. Найти нужную операцию

858 операций — это много, и листать контракт руками не надо:

```bash
go run ./cmd/akeda contract find contacts
go run ./cmd/akeda contract op coreListContacts
go run ./cmd/akeda contract modules
go run ./cmd/akeda contract reach      # что открыто токену установки ai_…
```

`contract op` печатает то, что определяет поведение клиента: стадию, право,
схему листания с потолком, читает ли операция `Idempotency-Key` — и открыта ли
она токену установки.

**Достижимость установкой — ось отдельная.** Ключ кабинета `ak_…` и токен
установки `ai_…` видят контракт по-разному: из 858 операций установке открыты
538, остальные обслуживают человека или ключ кабинета. Из стадии и права это не
выводится, поэтому спрашивайте прямо:

```bash
go run ./cmd/akeda contract op coreGetRegisterTurnovers | grep установка
```

## Шаг 5. Ссылки на справочники

Главное правило слоя: **ссылка — это пара «ключ справочника плюс код», а не
голый идентификатор.** Голый идентификатор ничего не доказывает: он может
принадлежать другому справочнику или вовсе другому кабинету.

```bash
curl -sS -X POST "https://erp.akeda.ru/api/v1/reference/resolve" \
  -H "Authorization: Bearer $AKEDA_API_KEY" -H "X-Tenant: $AKEDA_TENANT" \
  -H "Content-Type: application/json" \
  -d '{"refs":[{"directory_key":"units","code":"pcs"},
               {"directory_key":"units","code":"parsec"}]}'
```

Неразрешённая ссылка не делает ответ ошибкой: приговор приходит по каждой
отдельно. Потолок пакета — 200 ссылок. Ссылайтесь **кодом**: он читаем и
переживает перенос данных, а идентификатор — нет.

Операция требует `core:write`, хотя ничего не пишет: действие выводится из
HTTP-метода, а `POST` — это `write`.

## Шаг 6. Первое событие

Событий на ваш адрес пока не пришлют: установка заводится персоналом платформы.
Но приёмник пишется и проверяется уже сейчас, без живой Akeda:

```bash
export AKEDA_WEBHOOK_SECRET='whs_…' AKEDA_WEBHOOK_KEY_ID='whk_…'
export AKEDA_INSTALLATION_ID='…'   AKEDA_TENANT_ID='…' AKEDA_EFFECT_PROBE=1

go run ./examples/webhook-receiver-go &
AKEDA_CONFORMANCE_SIGNING_SECRET="$AKEDA_WEBHOOK_SECRET" \
  go run ./cmd/akeda conformance run examples/extension/target.json
```

Шестнадцать проверок и четыре честных пропуска. Что именно проверяется и почему
— [webhooks.md](webhooks.md).

## Шаг 7. Манифест расширения

```bash
go run ./cmd/akeda manifest lint examples/stock-abc/app.json
go run ./cmd/akeda catalog placements
```

Проверяется форма по схеме снимка плюс правила, которые формой не выражаются:
чужое пространство имён справочника, значение секрета внутри манифеста,
назначение без срока хранения, область со звёздочкой, режим `managed`,
непубличный адрес приёмника.

Проверяется и то, для чего формы мало, а нужен сам список: точка расширения,
слот и **место** обязаны существовать в каталоге, вид слота — приниматься этим
местом, а поля контекста — приходить от него. Место `crm.deal.sidebar` формально
правильное и не существует: слот, попросившийся туда, не показался бы ни на одном
экране, и отказа при этом не было бы ни одного. Каталог и правила — в
[extension-points.md](extension-points.md).

У слота обязателен непустой `placements`, а раздел `extensionPoints` в манифесте
необязателен: приложению, которому нужны только события, перечислять там нечего.
Песочничную точку в нём не пишут вовсе — её объявляют разделом `functions`
вместе с отпечатком артефакта. Линт отклоняет и строку без артефакта, и функцию,
поставленную на сетевую точку: вызвана она не будет никогда, а кабинет уже
подписал согласие «проверяет документы перед проведением».

Графы, которые приложение добавляет карточкам кабинета (раздел `fields`),
проверяются настолько, насколько это возможно без Akeda: ссылка только на
собственный справочник этого же манифеста, подпись не из одних пробелов, ключ
графы не объявлен у сущности дважды.

Зелёный ответ **не означает**, что версию примут: объявленность области доступа
и её ярус чувствительности проверяет линтер Akeda при подаче версии — ему нужна
живая таксономия, которой у вас нет. Ему же принадлежат сверка объявленных граф
с предыдущей опубликованной версией и вопрос, лежат ли у платформы байты
объявленного отпечатка.

## Чего дальше не будет — и почему

Установка, публикация версии, каталог и стенд разработчика — см.
[state-of-the-contour.md](state-of-the-contour.md). Коротко: интеграция на REST
делается сегодня; продукт из каталога, живущий на событиях, начинать рано.
