package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/url"
	"strconv"
	"strings"

	"github.com/Artogceo/akeda-sdk/clients/go/akeda"
)

// Разговор с Akeda. Только чтение.
//
// Ни одной операции, меняющей учёт, здесь нет и появиться не может: список
// вызываемых операций закрыт четырьмя чтениями плюс два обращения к
// собственному контуру установки. Это первое живое расширение, и оно физически
// не должно уметь испортить учёт клиента — поэтому проверка не «мы аккуратны»,
// а «команды нет в коде».
//
// ── ПОЧЕМУ РЕГИСТР, А НЕ ОТЧЁТ ──────────────────────────────────────────────
//
// Расход товара — это движения регистра `stock`, а не строки документов.
// Документ может быть черновиком, отменённым или проведённым задним числом;
// регистр показывает то, что действительно случилось со складом, и ровно то же
// число, что видит кабинет в своём отчёте остатков.

const (
	// registerStock — регистр физического остатка и стоимости модуля `stock`.
	// Заводится сеятелем модуля, ключ фиксирован. Если модуль у кабинета
	// выключен, обращение отвечает 404 — и это правильный ответ, а не поломка.
	registerStock = "stock"

	// dimProduct, dimWarehouse — измерения регистра, по которым мы режем.
	dimProduct   = "product"
	dimWarehouse = "warehouse"

	// resourceQty, resourceAmount — ресурсы регистра. Выручки и маржи здесь
	// нет: на складе лежит себестоимость и количество, и мерить ABC по выручке
	// расширение не может, сколько бы этого ни хотелось.
	resourceQty    = "qty"
	resourceAmount = "amount"
)

// Akeda — тонкая обёртка над клиентом SDK: только те операции, которые нужны.
type Akeda struct {
	client *akeda.Client
}

// NewAkeda собирает клиента на токене установки.
func NewAkeda(baseURL string, token Secret, tenant string) (*Akeda, error) {
	credentials, err := akeda.InstallationToken(token.Reveal())
	if err != nil {
		// Значение без префикса ai_ Akeda считает НЕПРЕДЪЯВЛЕННЫМ и отвечает
		// 401 no_credentials, то есть «заголовка не было». Отказ здесь честнее
		// отказа в проде через час работы.
		return nil, err
	}
	client, err := akeda.New(akeda.Options{
		BaseURL:     baseURL,
		Credentials: credentials,
		Tenant:      tenant,
		UserAgent:   "akeda-stock-abc",
		// Повторяет клиент только то, что сервер сам просит повторить: 429,
		// 503 и занятый ключ идемпотентности. Мы читаем, так что повтор
		// безопасен всегда.
		MaxRetries: 2,
	})
	if err != nil {
		return nil, err
	}
	return &Akeda{client: client}, nil
}

// LaunchContext — контекст запуска слота, каким его отдаёт Akeda.
//
// Человек назван ПСЕВДОНИМОМ. Ни имени, ни почты, ни роли здесь нет и не
// будет: реестр людей в Akeda общий на всю платформу, и по числовому
// идентификатору приложение, стоящее в двух кабинетах, связало бы двух разных
// клиентов между собой.
type LaunchContext struct {
	Tenant struct {
		ID   string `json:"id"`
		Slug string `json:"slug"`
	} `json:"tenant"`
	InstallationID string `json:"installation_id"`
	Slot           string `json:"slot"`
	Nonce          string `json:"nonce"`
	Actor          struct {
		Subject string `json:"subject"`
		Locale  string `json:"locale"`
		Theme   string `json:"theme"`
	} `json:"actor"`
	Anchor struct {
		Module   string `json:"module"`
		Entity   string `json:"entity"`
		EntityID string `json:"entity_id"`
	} `json:"anchor"`
	Origin string `json:"origin"`
}

// RedeemSlotLaunch гасит одноразовый токен запуска.
//
// Токен живёт минуту и гаснет первым предъявлением. Второе предъявление
// отвечает 410 и остаётся в журнале установки отдельной записью: повтор
// означает либо утечку токена, либо переигрывание запросов, и разбирают это
// люди. Поэтому не дошедший запуск НЕ чинится повтором — человек открывает
// панель заново, это одно нажатие.
func (a *Akeda) RedeemSlotLaunch(ctx context.Context, token, nonce string) (LaunchContext, error) {
	var launch LaunchContext
	result, err := a.client.Call(ctx, "appRuntimeRedeemSlotLaunch", akeda.Request{
		Body: map[string]string{"token": token, "nonce": nonce},
	})
	if err != nil {
		return launch, err
	}
	return launch, result.Decode(&launch)
}

// Config читает настройку установки.
//
// ЗАПИСИ ЗДЕСЬ НЕТ И НЕ БУДЕТ: внешний контур её не имеет вовсе. Значения
// вводит кабинет в Akeda — иначе приложение могло бы переставить порог, по
// которому кабинет думает, что оно считает.
func (a *Akeda) Config(ctx context.Context) ([]ConfigValue, []string, error) {
	result, err := a.client.Call(ctx, "appRuntimeConfig", akeda.Request{})
	if err != nil {
		return nil, nil, err
	}
	var payload struct {
		Values  []ConfigValue `json:"values"`
		Missing []string      `json:"missing"`
	}
	if err := result.Decode(&payload); err != nil {
		return nil, nil, err
	}
	return payload.Values, payload.Missing, nil
}

// Warehouse — склад кабинета в том объёме, который нужен настройке.
type Warehouse struct {
	ID       string `json:"id"`
	Code     string `json:"code"`
	Name     string `json:"name"`
	IsActive bool   `json:"is_active"`
}

// Warehouses читает справочник складов. Листания у операции нет — она отдаёт
// весь список.
func (a *Akeda) Warehouses(ctx context.Context) ([]Warehouse, error) {
	result, err := a.client.Call(ctx, "stockListWarehouses", akeda.Request{})
	if err != nil {
		return nil, err
	}
	var payload struct {
		Results []Warehouse `json:"results"`
	}
	if err := result.Decode(&payload); err != nil {
		return nil, err
	}
	return payload.Results, nil
}

// Product — карточка номенклатуры в том объёме, который показывает панель.
type Product struct {
	ID   string `json:"id"`
	SKU  string `json:"sku"`
	Name string `json:"name"`
	Unit string `json:"unit"`
}

// Product читает одну карточку.
//
// Панель читает ровно один товар — тот, на карточке которого её открыли.
// Списком номенклатуру расширение не тянет НИКОГДА: у списка нет отбора по
// набору идентификаторов, только q/folder/limit, и «дочитать имена ко всем
// строкам отчёта» превратилось бы в обход всего каталога кабинета на каждую
// перерисовку.
func (a *Akeda) Product(ctx context.Context, id string) (Product, error) {
	var product Product
	result, err := a.client.Call(ctx, "coreGetProduct", akeda.Request{
		PathParams: map[string]string{"id": id},
	})
	if err != nil {
		return product, err
	}
	return product, result.Decode(&product)
}

// EnsureStockRegister проверяет, что регистр склада у кабинета есть.
//
// Отдельным вызовом, до сбора данных: 404 на обороты и 404 на определение
// означают разное, а разбирать «почему пусто» по одинаковому коду отказа
// невозможно.
func (a *Akeda) EnsureStockRegister(ctx context.Context) error {
	_, err := a.client.Call(ctx, "coreGetRegister", akeda.Request{
		PathParams: map[string]string{"key": registerStock},
	})
	var apiErr *akeda.APIError
	if errors.As(err, &apiErr) && apiErr.Status == 404 {
		return fmt.Errorf("регистра %q в кабинете нет: модуль склада выключен либо ещё не засеян (%w)", registerStock, err)
	}
	return err
}

// TurnoverRow — строка оборотов регистра.
type TurnoverRow struct {
	Period   string                     `json:"period"`
	Dims     map[string]any             `json:"dims"`
	Incoming map[string]json.RawMessage `json:"incoming"`
	Outgoing map[string]json.RawMessage `json:"outgoing"`
	Net      map[string]json.RawMessage `json:"net"`
}

// TurnoverQuery — один срез оборотов.
type TurnoverQuery struct {
	// GroupBy — измерения разреза через запятую. Пусто означает все измерения
	// регистра, а у `stock` их шесть: строк стало бы на порядки больше, чем
	// товаров, поэтому разрез называется всегда.
	GroupBy string
	// Period — day, week или month. Пусто означает итог за всё окно одной
	// строкой.
	Period string
	From   string
	To     string
	// Dims — отбор по измерениям. ОДНО значение на измерение: отбор идёт
	// оператором вхождения по JSON, перечисления он не понимает. Несколько
	// складов поэтому означают несколько запросов, а не один со списком.
	Dims map[string]string
}

func (q TurnoverQuery) values() url.Values {
	query := url.Values{}
	if q.GroupBy != "" {
		query.Set("group", q.GroupBy)
	}
	if q.Period != "" {
		query.Set("period", q.Period)
	}
	if q.From != "" {
		query.Set("date_from", q.From)
	}
	if q.To != "" {
		query.Set("date_to", q.To)
	}
	for key, value := range q.Dims {
		query.Set("dim."+key, value)
	}
	return query
}

// Turnovers обходит страницы оборотов.
//
// Обход — через Paginate клиента, а не своим циклом: конец выборки определяется
// КОРОТКОЙ страницей, а не полем count (count — это длина страницы, а не общее
// число записей), и написать это правило второй раз значит однажды написать его
// иначе.
func (a *Akeda) Turnovers(ctx context.Context, query TurnoverQuery, visit func(TurnoverRow) error) error {
	return a.client.Paginate(ctx, "coreGetRegisterTurnovers", akeda.PageOptions{
		PathParams: map[string]string{"key": registerStock},
		Query:      query.values(),
	}, func(raw json.RawMessage) (bool, error) {
		var row TurnoverRow
		if err := json.Unmarshal(raw, &row); err != nil {
			return false, err
		}
		return true, visit(row)
	})
}

// BalanceRow — строка остатка регистра.
type BalanceRow struct {
	Dims   map[string]any             `json:"dims"`
	Totals map[string]json.RawMessage `json:"totals"`
}

// Balance обходит страницы остатка на текущий момент.
func (a *Akeda) Balance(ctx context.Context, dims map[string]string, visit func(BalanceRow) error) error {
	query := url.Values{}
	query.Set("group", dimProduct)
	for key, value := range dims {
		query.Set("dim."+key, value)
	}
	return a.client.Paginate(ctx, "coreGetRegisterBalance", akeda.PageOptions{
		PathParams: map[string]string{"key": registerStock},
		Query:      query,
	}, func(raw json.RawMessage) (bool, error) {
		var row BalanceRow
		if err := json.Unmarshal(raw, &row); err != nil {
			return false, err
		}
		return true, visit(row)
	})
}

// decimal вытаскивает число из значения ресурса.
//
// Читается и число, и строка. Регистр отдаёт количества и суммы numeric-ом, и
// его точность шире double; сегодня это приезжает числом JSON, но строка —
// законный способ отдать decimal без потери знаков, и приложение, умеющее
// только один из двух видов, ломается от совершенно правильного ответа.
//
// Дальше значение всё равно становится float64: доли процентов и коэффициент
// вариации считаются в плавающей точке, и восстанавливать десятичную
// арифметику ради сортировки по убыванию незачем. Деньгами это число не
// становится нигде — платежей расширение не делает.
func decimal(raw json.RawMessage) float64 {
	text := strings.TrimSpace(string(raw))
	if text == "" || text == "null" {
		return 0
	}
	text = strings.Trim(text, `"`)
	value, err := strconv.ParseFloat(text, 64)
	if err != nil {
		return 0
	}
	return value
}

// dimString вытаскивает значение измерения.
//
// Измерения приходят объектом JSON, и значением там бывает не только строка:
// ссылка на документ — это идентификатор, а признак — число или булево.
// Панель сравнивает их со строкой (идентификатором товара), поэтому приведение
// одно и оно здесь.
func dimString(dims map[string]any, key string) string {
	value, ok := dims[key]
	if !ok || value == nil {
		return ""
	}
	switch typed := value.(type) {
	case string:
		return typed
	case float64:
		return strconv.FormatFloat(typed, 'f', -1, 64)
	case bool:
		return strconv.FormatBool(typed)
	default:
		return fmt.Sprint(typed)
	}
}
