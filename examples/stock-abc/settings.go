package main

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

// Настройка установки: как строки, введённые кабинетом, превращаются в пороги.
//
// ── ЗНАЧЕНИЯ ПРИХОДЯТ СТРОКАМИ ──────────────────────────────────────────────
//
// Внешний контур отдаёт значение настройки полем `value` типа string, каким бы
// типом оно ни было объявлено в манифесте. Разбор поэтому свой, и он обязан
// отвечать не «ошибка», а «взял умолчание, потому что вот это»: приложение,
// молча упавшее из-за опечатки в проценте, разбирают часами.
//
// ── ПОЧЕМУ ОКНО СЧИТАЕТСЯ ЦЕЛЫМИ МЕСЯЦАМИ ───────────────────────────────────
//
// XYZ меряет РОВНОСТЬ ряда, а незакрытый месяц короче остальных ровно на то,
// сколько его ещё не прошло. Третьего сентября он даст десятую часть обычного
// расхода — и товар с идеально ровными продажами получит класс Z каждое первое
// число. Поэтому окно кончается последним днём прошлого месяца, а текущий
// месяц в вариацию не входит вовсе.
//
// Свежесть от этого не страдает: «неподвижен ли товар» считается отдельным
// запросом и идёт до сегодняшнего дня.

// Значения по умолчанию. Они же объявлены в манифесте полем `default`: манифест
// показывает их человеку в форме, а эти — работают, когда поле не заполнено.
const (
	defaultPeriodMonths = 6
	defaultMetric       = MetricAmount
	defaultAPercent     = 80.0
	defaultBPercent     = 15.0
	defaultXMaxCV       = 10.0
	defaultYMaxCV       = 25.0
	defaultMinPeriods   = 3
	defaultDeadDays     = 90
)

// Мера ABC. Ресурсы регистра `stock`, и других у него нет: выручки и маржи на
// складе не лежит — там себестоимость и количество.
const (
	// MetricAmount — себестоимость расхода, ресурс `amount`.
	MetricAmount = "amount"
	// MetricQty — количество расхода, ресурс `qty`.
	MetricQty = "qty"
)

// Ключи настройки. Те же строки стоят в configSchema манифеста: имя настройки
// живёт в одном пространстве имён с секретами, и второго дома у него нет.
const (
	keyPeriodMonths   = "period_months"
	keyMetric         = "metric"
	keyAPercent       = "abc_a_percent"
	keyBPercent       = "abc_b_percent"
	keyXMaxCV         = "xyz_x_max_percent"
	keyYMaxCV         = "xyz_y_max_percent"
	keyMinPeriods     = "min_periods"
	keyWarehouseCodes = "warehouse_codes"
	keyDeadDays       = "dead_days"
)

// Issue — замечание к настройке. Код, а не текст: страница показывает его на
// языке человека, а язык человека приезжает вместе с запуском, а не с
// настройкой.
type Issue struct {
	Key  string `json:"key"`
	Code string `json:"code"`
	// Raw — что было введено. Показывается человеку рядом с замечанием:
	// «взял 6» без «вместо шести с половиной» не объясняет ничего.
	Raw string `json:"raw"`
}

// Коды замечаний.
const (
	issueNotNumber   = "not_number"
	issueOutOfRange  = "out_of_range"
	issueUnknown     = "unknown_value"
	issueSumOverflow = "abc_sum_over_100"
	issueXYZOrder    = "xyz_bounds_swapped"
	issueStale       = "not_declared"
)

// Settings — разобранная настройка установки.
type Settings struct {
	PeriodMonths int    `json:"period_months"`
	Metric       string `json:"metric"`
	Thresholds   `json:"-"`
	DeadDays     int `json:"dead_days"`
	// WarehouseCodes — коды складов, которые считаем. Пусто означает ВСЕ
	// склады кабинета: пустой список здесь — это ответ «границы не ставлю», а
	// не «ни одного», потому что настройка не обязательна и по умолчанию не
	// заполнена.
	WarehouseCodes []string `json:"warehouse_codes"`
	// Issues — всё, что пришлось поправить. Пустой список означает, что
	// кабинет настроил приложение так, как оно и работает.
	Issues []Issue `json:"issues"`
}

// MarshalableThresholds — пороги в ответе страницы. Отдельная структура, чтобы
// не встраивать Thresholds в JSON плоско: страница показывает их таблицей.
type MarshalableThresholds struct {
	APercent   float64 `json:"abc_a_percent"`
	BPercent   float64 `json:"abc_b_percent"`
	XMaxCV     float64 `json:"xyz_x_max_percent"`
	YMaxCV     float64 `json:"xyz_y_max_percent"`
	MinPeriods int     `json:"min_periods"`
}

// Values — пороги для ответа.
func (s Settings) Values() MarshalableThresholds {
	return MarshalableThresholds{
		APercent:   s.APercent,
		BPercent:   s.BPercent,
		XMaxCV:     s.XMaxCV,
		YMaxCV:     s.YMaxCV,
		MinPeriods: s.MinPeriods,
	}
}

// ConfigValue — одно значение настройки, как его отдаёт внешний контур.
type ConfigValue struct {
	Key      string `json:"key"`
	Secret   bool   `json:"secret"`
	Declared bool   `json:"declared"`
	Set      bool   `json:"set"`
	Value    string `json:"value"`
}

// ParseSettings собирает пороги из того, что ввёл кабинет.
//
// Ошибок не возвращает намеренно: у любого поля есть рабочее умолчание, и
// приложение, отказавшееся показывать панель из-за лишнего пробела в проценте,
// хуже приложения, которое показало панель и сказало, что взяло умолчание.
func ParseSettings(values []ConfigValue) Settings {
	raw := map[string]ConfigValue{}
	for _, value := range values {
		raw[value.Key] = value
	}
	settings := Settings{
		PeriodMonths: defaultPeriodMonths,
		Metric:       defaultMetric,
		DeadDays:     defaultDeadDays,
		Thresholds: Thresholds{
			APercent:   defaultAPercent,
			BPercent:   defaultBPercent,
			XMaxCV:     defaultXMaxCV,
			YMaxCV:     defaultYMaxCV,
			MinPeriods: defaultMinPeriods,
		},
		Issues: []Issue{},
	}

	read := func(key string) (string, bool) {
		value, ok := raw[key]
		if !ok || !value.Set || strings.TrimSpace(value.Value) == "" {
			return "", false
		}
		if !value.Declared {
			// Значение от прошлой версии приложения. Оно лежит в базе, и
			// сегодняшняя версия его не просит: применить его тихо значит
			// работать по настройке, которой на экране кабинета уже нет.
			settings.Issues = append(settings.Issues, Issue{Key: key, Code: issueStale, Raw: value.Value})
			return "", false
		}
		return strings.TrimSpace(value.Value), true
	}

	if text, ok := read(keyPeriodMonths); ok {
		settings.PeriodMonths = settings.wholeInRange(keyPeriodMonths, text, 1, 36, defaultPeriodMonths)
	}
	if text, ok := read(keyDeadDays); ok {
		settings.DeadDays = settings.wholeInRange(keyDeadDays, text, 1, 3650, defaultDeadDays)
	}
	if text, ok := read(keyMinPeriods); ok {
		settings.MinPeriods = settings.wholeInRange(keyMinPeriods, text, 1, 36, defaultMinPeriods)
	}
	if text, ok := read(keyMetric); ok {
		switch strings.ToLower(text) {
		case MetricAmount:
			settings.Metric = MetricAmount
		case MetricQty:
			settings.Metric = MetricQty
		default:
			settings.Issues = append(settings.Issues, Issue{Key: keyMetric, Code: issueUnknown, Raw: text})
		}
	}
	if text, ok := read(keyAPercent); ok {
		settings.APercent = settings.fractionInRange(keyAPercent, text, 0, 100, defaultAPercent)
	}
	if text, ok := read(keyBPercent); ok {
		settings.BPercent = settings.fractionInRange(keyBPercent, text, 0, 100, defaultBPercent)
	}
	if text, ok := read(keyXMaxCV); ok {
		settings.XMaxCV = settings.fractionInRange(keyXMaxCV, text, 0, 1000, defaultXMaxCV)
	}
	if text, ok := read(keyYMaxCV); ok {
		settings.YMaxCV = settings.fractionInRange(keyYMaxCV, text, 0, 1000, defaultYMaxCV)
	}
	if text, ok := read(keyWarehouseCodes); ok {
		settings.WarehouseCodes = splitCodes(text)
	}

	if settings.APercent+settings.BPercent > 100 {
		// Класс C — остаток, и отрицательным он не бывает. Зажимаем B, а не A:
		// A — то, ради чего анализ и делают, и урезать его молча значит
		// переложить в B самые важные позиции.
		settings.Issues = append(settings.Issues, Issue{
			Key:  keyBPercent,
			Code: issueSumOverflow,
			Raw:  fmt.Sprintf("%g + %g", settings.APercent, settings.BPercent),
		})
		settings.BPercent = 100 - settings.APercent
	}
	if settings.XMaxCV > settings.YMaxCV {
		// Порядок порогов перепутан: X должен быть уже Y. Иначе класс Y не
		// достаётся никому, и таблица показывает две буквы вместо трёх.
		settings.Issues = append(settings.Issues, Issue{
			Key:  keyYMaxCV,
			Code: issueXYZOrder,
			Raw:  fmt.Sprintf("%g > %g", settings.XMaxCV, settings.YMaxCV),
		})
		settings.XMaxCV, settings.YMaxCV = settings.YMaxCV, settings.XMaxCV
	}
	return settings
}

func (s *Settings) wholeInRange(key, text string, low, high, fallback int) int {
	value, err := strconv.Atoi(text)
	if err != nil {
		s.Issues = append(s.Issues, Issue{Key: key, Code: issueNotNumber, Raw: text})
		return fallback
	}
	if value < low || value > high {
		s.Issues = append(s.Issues, Issue{Key: key, Code: issueOutOfRange, Raw: text})
		return fallback
	}
	return value
}

func (s *Settings) fractionInRange(key, text string, low, high, fallback float64) float64 {
	// Запятая как разделитель дробной части: настройку заполняет человек, и в
	// русской раскладке «12,5» — это то, что он напечатает.
	value, err := strconv.ParseFloat(strings.ReplaceAll(text, ",", "."), 64)
	if err != nil {
		s.Issues = append(s.Issues, Issue{Key: key, Code: issueNotNumber, Raw: text})
		return fallback
	}
	if value < low || value > high {
		s.Issues = append(s.Issues, Issue{Key: key, Code: issueOutOfRange, Raw: text})
		return fallback
	}
	return value
}

func splitCodes(text string) []string {
	parts := strings.FieldsFunc(text, func(r rune) bool {
		return r == ',' || r == ';' || r == '\n' || r == ' '
	})
	codes := make([]string, 0, len(parts))
	seen := map[string]bool{}
	for _, part := range parts {
		// Код склада Akeda приводит к верхнему регистру при создании, поэтому
		// сравнивать введённое с ним нужно так же — иначе «осн» не найдёт
		// склад «ОСН» и кабинет увидит пустой отчёт вместо своего склада.
		code := strings.ToUpper(strings.TrimSpace(part))
		if code == "" || seen[code] {
			continue
		}
		seen[code] = true
		codes = append(codes, code)
	}
	return codes
}

// Window — окно анализа: целые календарные месяцы.
type Window struct {
	From time.Time `json:"-"`
	// To — последний день окна ВКЛЮЧИТЕЛЬНО. Akeda растягивает дату конца
	// периода до конца дня, поэтому здесь стоит именно день, а не полночь
	// следующего.
	To time.Time `json:"-"`
	// Periods — ключи месяцев окна по порядку, вида 2026-03. Ряд XYZ
	// достраивается нулями именно по этому списку.
	Periods []string `json:"periods"`
	// Days — длина окна в днях. По ней считается средний дневной расход.
	Days int `json:"days"`
}

// FromISO и ToISO — границы окна для запроса и для показа человеку.
func (w Window) FromISO() string { return w.From.Format("2006-01-02") }
func (w Window) ToISO() string   { return w.To.Format("2006-01-02") }

// MakeWindow строит окно из целых месяцев, заканчивая ПРОШЛЫМ месяцем.
//
// now передаётся аргументом, а не берётся из time.Now: расчёт окна — ровно то
// место, где «работает до конца месяца» проверяется только тестом.
func MakeWindow(now time.Time, months int) Window {
	if months < 1 {
		months = 1
	}
	// Первое число текущего месяца — граница, за которой начинается незакрытый
	// месяц. Окно кончается днём раньше.
	currentStart := time.Date(now.Year(), now.Month(), 1, 0, 0, 0, 0, now.Location())
	to := currentStart.AddDate(0, 0, -1)
	from := currentStart.AddDate(0, -months, 0)

	periods := make([]string, 0, months)
	for cursor := from; cursor.Before(currentStart); cursor = cursor.AddDate(0, 1, 0) {
		periods = append(periods, cursor.Format("2006-01"))
	}
	return Window{
		From:    from,
		To:      to,
		Periods: periods,
		Days:    wholeDays(from, to),
	}
}

// wholeDays — длина окна в календарных днях, включая обе границы.
//
// Считается по датам, приведённым к UTC, а не вычитанием моментов: в зоне с
// переводом часов сутки бывают длиной двадцать три часа, и деление разницы на
// двадцать четыре теряет день. Окном делится расход при расчёте «на сколько
// хватит остатка», так что потерянный день — это ошибка в цифре на экране.
func wholeDays(from, to time.Time) int {
	start := time.Date(from.Year(), from.Month(), from.Day(), 0, 0, 0, 0, time.UTC)
	end := time.Date(to.Year(), to.Month(), to.Day(), 0, 0, 0, 0, time.UTC)
	return int(end.Sub(start).Hours()/24) + 1
}

// PeriodKey приводит дату периода из ответа Akeda к ключу окна.
//
// Обороты с period=month приходят полем `period` — датой первого дня месяца.
// Сравнивать её со строкой окна напрямую нельзя: там дата целиком, здесь месяц.
func PeriodKey(raw string) string {
	raw = strings.TrimSpace(raw)
	if len(raw) >= 7 {
		return raw[:7]
	}
	return raw
}
