package main

import (
	"context"
	"sort"
	"strings"
	"sync"
	"time"
)

// Сбор данных и снимок расчёта.
//
// ── ПОЧЕМУ СНИМОК, А НЕ ЗАПРОС НА КАЖДУЮ ПАНЕЛЬ ─────────────────────────────
//
// Класс товара — величина не индивидуальная: чтобы сказать, что этот товар A,
// надо знать расход ВСЕЙ номенклатуры за окно. Считать это заново на каждое
// открытие карточки значит проходить обороты всего склада ради одной строки на
// экране — и упереться в частотный лимит ключа на десятом сотруднике.
//
// Поэтому расчёт делается один раз на окно и живёт в памяти. Снимок общий на
// установку: пороги задаёт кабинет, а не человек, и второй снимок под второго
// сотрудника считал бы то же самое.
//
// Кэш в памяти теряется при перезапуске — и это правильно: снимок не данные, а
// вывод из них. Терять его безопасно, хранить дольше окна вредно.

// Snapshot — посчитанный ABC-XYZ на момент сборки.
type Snapshot struct {
	BuiltAt      time.Time
	Settings     Settings
	Window       Window
	Warehouses   []Warehouse
	UnknownCodes []string
	Results      []Result
	ByProduct    map[string]Result
	Distribution Distribution
	// OnHand — остаток в количестве по товарам на момент сборки, в разрезе
	// выбранных складов.
	OnHand map[string]float64
	// MissingConfig — обязательные поля настройки без значения. У этого
	// приложения обязательных полей нет вовсе, поэтому непустой список
	// означает расхождение манифеста с кодом, и молчать о нём нельзя.
	MissingConfig []string
}

// Collector собирает снимок из Akeda.
type Collector struct {
	api *Akeda
	// now подменяется в тестах: окно анализа зависит от календаря, и «работает
	// до конца месяца» иначе не проверить.
	now func() time.Time
}

// NewCollector собирает сборщика.
func NewCollector(api *Akeda) *Collector {
	return &Collector{api: api, now: time.Now}
}

// Build читает Akeda и считает снимок.
func (c *Collector) Build(ctx context.Context) (*Snapshot, error) {
	if err := c.api.EnsureStockRegister(ctx); err != nil {
		return nil, err
	}
	values, missing, err := c.api.Config(ctx)
	if err != nil {
		return nil, err
	}
	settings := ParseSettings(values)
	window := MakeWindow(c.now(), settings.PeriodMonths)

	warehouses, err := c.api.Warehouses(ctx)
	if err != nil {
		return nil, err
	}
	chosen, unknown := resolveWarehouses(warehouses, settings.WarehouseCodes)

	series := map[string]*ProductSeries{}
	onHand := map[string]float64{}
	for _, filter := range dimFilters(chosen) {
		query := TurnoverQuery{
			GroupBy: dimProduct,
			Period:  "month",
			From:    window.FromISO(),
			To:      window.ToISO(),
			Dims:    filter,
		}
		err := c.api.Turnovers(ctx, query, func(row TurnoverRow) error {
			product := dimString(row.Dims, dimProduct)
			if product == "" {
				// Строка без товара — это итог по разрезу, в котором товар не
				// назван. При group=product такого не бывает, но молча
				// сложить её в «пустой товар» значит завести в отчёте строку,
				// которую невозможно открыть.
				return nil
			}
			entry, ok := series[product]
			if !ok {
				entry = &ProductSeries{
					Product: product,
					Value:   map[string]float64{},
					Qty:     map[string]float64{},
				}
				series[product] = entry
			}
			period := PeriodKey(row.Period)
			// Берём РАСХОД (outgoing), а не чистый оборот: приход на склад —
			// это закупка, и товар, купленный впрок и не проданный ни разу,
			// стал бы по чистому обороту важным.
			entry.Value[period] += decimal(row.Outgoing[resourceFor(settings.Metric)])
			entry.Qty[period] += decimal(row.Outgoing[resourceQty])
			return nil
		})
		if err != nil {
			return nil, err
		}
		err = c.api.Balance(ctx, filter, func(row BalanceRow) error {
			product := dimString(row.Dims, dimProduct)
			if product == "" {
				return nil
			}
			onHand[product] += decimal(row.Totals[resourceQty])
			return nil
		})
		if err != nil {
			return nil, err
		}
	}

	list := make([]ProductSeries, 0, len(series))
	for _, entry := range series {
		list = append(list, *entry)
	}
	results := Classify(window.Periods, list, settings.Thresholds)

	byProduct := make(map[string]Result, len(results))
	for _, result := range results {
		byProduct[result.Product] = result
	}
	return &Snapshot{
		BuiltAt:       c.now(),
		Settings:      settings,
		Window:        window,
		Warehouses:    chosen,
		UnknownCodes:  unknown,
		Results:       results,
		ByProduct:     byProduct,
		Distribution:  Summarize(results),
		OnHand:        onHand,
		MissingConfig: missing,
	}, nil
}

// LastIssue — когда товар в последний раз уходил со склада.
type LastIssue struct {
	// Date — дата последнего расхода; пусто означает «за проверенный срок
	// расхода не было».
	Date string
	// Dormant — товар неподвижен: за dead_days ни одного расхода.
	Dormant bool
	// Since — сколько дней проверяли.
	Since int
}

// LastIssueOf выясняет, двигался ли товар в последние dead_days дней.
//
// Отдельный запрос с разрезом по ДНЯМ, а не вывод из месячного ряда окна.
// Причин две. Окно кончается прошлым месяцем, и товар, проданный вчера,
// выглядел бы в нём мёртвым. И месяц — слишком грубая мера для вопроса «лежит
// ли это уже квартал»: ответ «был расход в марте» не отличает первое марта от
// тридцать первого.
func (c *Collector) LastIssueOf(ctx context.Context, snapshot *Snapshot, product string) (LastIssue, error) {
	answer := LastIssue{Since: snapshot.Settings.DeadDays}
	now := c.now()
	from := now.AddDate(0, 0, -snapshot.Settings.DeadDays)

	for _, filter := range dimFilters(snapshot.Warehouses) {
		dims := map[string]string{dimProduct: product}
		for key, value := range filter {
			dims[key] = value
		}
		query := TurnoverQuery{
			GroupBy: dimProduct,
			Period:  "day",
			From:    from.Format("2006-01-02"),
			To:      now.Format("2006-01-02"),
			Dims:    dims,
		}
		err := c.api.Turnovers(ctx, query, func(row TurnoverRow) error {
			if decimal(row.Outgoing[resourceQty]) <= 0 {
				return nil
			}
			day := strings.TrimSpace(row.Period)
			if len(day) > 10 {
				day = day[:10]
			}
			if day > answer.Date {
				answer.Date = day
			}
			return nil
		})
		if err != nil {
			return answer, err
		}
	}
	answer.Dormant = answer.Date == ""
	return answer, nil
}

// resourceFor — какой ресурс регистра меряет ABC.
func resourceFor(metric string) string {
	if metric == MetricQty {
		return resourceQty
	}
	return resourceAmount
}

// dimFilters превращает выбранные склады в набор отборов.
//
// Пустой набор складов даёт ОДИН отбор без измерения — то есть «все склады».
// Несколько складов дают несколько запросов: отбор по измерению идёт
// оператором вхождения по JSON и принимает одно значение, а не список.
func dimFilters(warehouses []Warehouse) []map[string]string {
	if len(warehouses) == 0 {
		return []map[string]string{nil}
	}
	filters := make([]map[string]string, 0, len(warehouses))
	for _, warehouse := range warehouses {
		filters = append(filters, map[string]string{dimWarehouse: warehouse.ID})
	}
	return filters
}

// resolveWarehouses сопоставляет коды из настройки со складами кабинета.
//
// Возвращает и НЕНАЙДЕННЫЕ коды: опечатка в коде склада иначе превращается в
// пустой отчёт без единого слова о причине, и кабинет ищет поломку в
// приложении вместо своей настройки.
func resolveWarehouses(all []Warehouse, codes []string) ([]Warehouse, []string) {
	if len(codes) == 0 {
		return nil, nil
	}
	index := make(map[string]Warehouse, len(all))
	for _, warehouse := range all {
		index[strings.ToUpper(warehouse.Code)] = warehouse
	}
	chosen := make([]Warehouse, 0, len(codes))
	unknown := []string{}
	for _, code := range codes {
		warehouse, ok := index[code]
		if !ok {
			unknown = append(unknown, code)
			continue
		}
		chosen = append(chosen, warehouse)
	}
	sort.Slice(chosen, func(i, j int) bool { return chosen[i].Code < chosen[j].Code })
	return chosen, unknown
}

// Cache — снимок с ограниченным сроком.
type Cache struct {
	ttl       time.Duration
	collector *Collector

	mutex    sync.Mutex
	snapshot *Snapshot
	builtAt  time.Time
}

// NewCache собирает кэш.
func NewCache(collector *Collector, ttl time.Duration) *Cache {
	return &Cache{ttl: ttl, collector: collector}
}

// Get отдаёт свежий снимок, считая его при необходимости.
//
// Замок держится ВСЮ сборку намеренно. Снимок обходит обороты всего склада, и
// десять сотрудников, открывших панель одновременно на холодном кэше, запустили
// бы десять таких обходов и упёрлись в частотный лимит ключа. Ждать чужую
// сборку дешевле, чем повторить её.
func (c *Cache) Get(ctx context.Context) (*Snapshot, error) {
	c.mutex.Lock()
	defer c.mutex.Unlock()
	if c.snapshot != nil && time.Since(c.builtAt) < c.ttl {
		return c.snapshot, nil
	}
	snapshot, err := c.collector.Build(ctx)
	if err != nil {
		// Прошлый снимок при отказе НЕ отдаётся: панель, показывающая вчерашние
		// классы как сегодняшние, врёт молча, а отказ виден.
		return nil, err
	}
	c.snapshot = snapshot
	c.builtAt = snapshot.BuiltAt
	return snapshot, nil
}
