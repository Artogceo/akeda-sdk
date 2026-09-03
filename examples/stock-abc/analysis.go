package main

import (
	"math"
	"sort"
)

// Расчёт ABC-XYZ. Чистые функции без Akeda, без HTTP и без времени: границы
// классов — единственное место этого расширения, где ошибка не видна глазом и
// не падает в проде, поэтому она обязана проверяться тестом, а не запуском.
//
// ── ЧТО СЧИТАЕТСЯ ───────────────────────────────────────────────────────────
//
// ABC делит номенклатуру по ВЕЛИЧИНЕ расхода за окно: A — товары, дающие
// первые N процентов расхода, B — следующие M, C — остальные.
//
// XYZ делит по РОВНОСТИ расхода: коэффициент вариации (отношение
// среднеквадратичного отклонения к среднему) по ряду периодов. Малый —
// потребление предсказуемо (X), большой — рвано (Z).
//
// Две оси независимы: AX — то, чем торгуют много и ровно, CZ — то, что лежит.
//
// ── ЧЕТЫРЕ РЕШЕНИЯ, КОТОРЫЕ ЗДЕСЬ ПРИНЯТЫ ЯВНО ──────────────────────────────
//
//  1. ТОВАР, ПЕРЕСЕКАЮЩИЙ ГРАНИЦУ, ОСТАЁТСЯ В ВЕРХНЕМ КЛАССЕ. Класс считается
//     по накопленной доле ДО этого товара, а не включая его. Иначе при пороге
//     80% и одном товаре, дающем 90% расхода, класс A оказался бы ПУСТ — самый
//     важный товар склада попал бы в B, потому что переступил границу сам.
//
//  2. НУЛЕВОЙ РАСХОД — ВСЕГДА C. Правило выписано отдельной строкой, хотя из
//     накопления оно и так выходит: товар без движения не должен зависеть от
//     того, как легли пороги.
//
//  3. РЯД XYZ СОДЕРЖИТ НУЛИ. Месяц без расхода — это наблюдение «ноль», а не
//     отсутствие наблюдения. Выбросив его, мы бы получили ровный ряд у товара,
//     который продали дважды за полгода, и назвали бы его X.
//
//  4. ОТКЛОНЕНИЕ СЧИТАЕТСЯ ПО ГЕНЕРАЛЬНОЙ СОВОКУПНОСТИ (делим на n, не на n-1).
//     Окно анализа — это не выборка из чего-то большего, а всё, что мы
//     рассматриваем: других месяцев в вопросе нет.

// Классы. Строки, а не числа: они уезжают в JSON и на экран, и «1» вместо «A»
// пришлось бы переводить в двух местах.
const (
	ClassA = "A"
	ClassB = "B"
	ClassC = "C"

	ClassX = "X"
	ClassY = "Y"
	ClassZ = "Z"

	// ClassUnknown — ряда не хватило на суждение. Пустая строка, а не буква:
	// четвёртая буква рядом с XYZ читалась бы как ещё один класс товара,
	// которого в методике нет.
	ClassUnknown = ""
)

// Thresholds — пороги, заданные кабинетом. Ради них расширение и существует:
// у одного A — это 80% выручки, у другого 70% оборота в штуках, и назначать
// это за клиента платформа не вправе.
type Thresholds struct {
	// APercent, BPercent — доли накопленного расхода. C — остаток, отдельного
	// порога у него нет: третье число, обязанное дополнять первые два до ста,
	// однажды перестанет их дополнять.
	APercent float64
	BPercent float64
	// XMaxCV, YMaxCV — потолки коэффициента вариации в процентах, включительно.
	XMaxCV float64
	YMaxCV float64
	// MinPeriods — сколько периодов нужно, чтобы вариация вообще что-то
	// значила. По одному-двум месяцам коэффициент считается, но означает шум:
	// ряд [10] даёт вариацию 0, то есть «идеально ровный спрос» по одной
	// продаже.
	MinPeriods int
}

// ProductSeries — расход одного товара по периодам окна.
//
// Периоды здесь неполны намеренно: Akeda отдаёт обороты только там, где были
// движения, и месяц без расхода в ответе отсутствует. Нули дописывает расчёт,
// а не сборщик данных, — иначе правило «ряд содержит нули» жило бы в слое
// транспорта, где его никто не ищет.
type ProductSeries struct {
	Product string
	// Value — расход по выбранной кабинетом мере (себестоимость или
	// количество) по ключу периода.
	Value map[string]float64
	// Qty — расход в количестве по тому же ключу. Нужен отдельно от Value:
	// «на сколько дней хватит остатка» считается только в штуках, чем бы ни
	// мерили ABC.
	Qty map[string]float64
}

// Result — приговор по одному товару.
type Result struct {
	Product string `json:"product_id"`
	// Value — расход за всё окно в выбранной мере.
	Value float64 `json:"value"`
	// Share — доля товара в общем расходе, проценты.
	Share float64 `json:"share_percent"`
	// CumulativeShare — накопленная доля ВКЛЮЧАЯ этот товар. Именно её
	// показывают человеку; классифицируется он по накопленной ДО него.
	CumulativeShare float64 `json:"cumulative_percent"`
	ABC             string  `json:"abc"`
	XYZ             string  `json:"xyz"`
	// CV — коэффициент вариации в процентах. Отдаётся всегда, когда его можно
	// посчитать: пороги задаёт кабинет, и он вправе увидеть само число.
	CV float64 `json:"variation_percent"`
	// QtyTotal и QtyPerPeriod — расход в количестве: всего за окно и в среднем
	// за период.
	QtyTotal     float64 `json:"qty_total"`
	QtyPerPeriod float64 `json:"qty_per_period"`
	// Periods — сколько периодов в ряду. Столько же у всех товаров: ряд
	// достраивается нулями по окну, а не по своим движениям.
	Periods int `json:"periods"`
}

// Classify раскладывает номенклатуру по классам.
//
// periods — все периоды окна В ПОРЯДКЕ, включая те, где ни у кого не было
// движения. Список приходит снаружи, потому что расчёт не знает календаря:
// вывести «сколько месяцев в окне» из самих данных нельзя — пустой месяц в них
// не представлен ничем.
func Classify(periods []string, series []ProductSeries, thresholds Thresholds) []Result {
	results := make([]Result, 0, len(series))
	total := 0.0

	for _, product := range series {
		value := 0.0
		qty := 0.0
		row := make([]float64, 0, len(periods))
		for _, period := range periods {
			amount := product.Value[period]
			row = append(row, amount)
			value += amount
			qty += product.Qty[period]
		}
		if value < 0 {
			// Расход отрицательным не бывает: это сумма движений со знаком
			// «минус», взятая по модулю самим регистром. Отрицательное здесь
			// означает, что мера собрана не из того поля, и класть такое в
			// сортировку по убыванию нельзя — товар уедет в конец списка и
			// молча станет C.
			value = 0
		}
		result := Result{
			Product:  product.Product,
			Value:    value,
			QtyTotal: qty,
			Periods:  len(periods),
			XYZ:      ClassUnknown,
		}
		if len(periods) > 0 {
			result.QtyPerPeriod = qty / float64(len(periods))
		}
		result.CV, result.XYZ = variation(row, thresholds)
		results = append(results, result)
		total += value
	}

	// Порядок устойчив: по убыванию расхода, при равенстве — по
	// идентификатору. Без второго ключа два одинаковых товара меняются местами
	// от прогона к прогону, и один из них через день оказывается в другом
	// классе без единого движения на складе.
	sort.SliceStable(results, func(i, j int) bool {
		if results[i].Value != results[j].Value {
			return results[i].Value > results[j].Value
		}
		return results[i].Product < results[j].Product
	})

	boundaryA := thresholds.APercent
	boundaryB := thresholds.APercent + thresholds.BPercent

	cumulativeBefore := 0.0
	for index := range results {
		if total > 0 {
			results[index].Share = results[index].Value / total * 100
		}
		switch {
		case results[index].Value <= 0:
			// Решение 2: товар без расхода не участвует в дележе долей вовсе.
			results[index].ABC = ClassC
		case total <= 0:
			results[index].ABC = ClassC
		case cumulativeBefore < boundaryA:
			results[index].ABC = ClassA
		case cumulativeBefore < boundaryB:
			results[index].ABC = ClassB
		default:
			results[index].ABC = ClassC
		}
		cumulativeBefore += results[index].Share
		results[index].CumulativeShare = cumulativeBefore
	}
	return results
}

// variation считает коэффициент вариации ряда и класс XYZ.
//
// Возвращает два значения, а не одно: само число нужно показать человеку —
// пороги задаёт он, и «Z» без коэффициента не объясняет, насколько мимо.
func variation(row []float64, thresholds Thresholds) (float64, string) {
	if len(row) == 0 || len(row) < thresholds.MinPeriods {
		return 0, ClassUnknown
	}
	sum := 0.0
	for _, value := range row {
		sum += value
	}
	mean := sum / float64(len(row))
	if mean <= 0 {
		// Расхода не было вовсе. Вариация относительна, и делить на ноль
		// нечем: «ровно ничего не продавали» — это не ровный спрос.
		return 0, ClassUnknown
	}
	squares := 0.0
	for _, value := range row {
		diff := value - mean
		squares += diff * diff
	}
	// Решение 4: делим на n. Окно — вся рассматриваемая совокупность.
	deviation := math.Sqrt(squares / float64(len(row)))
	cv := deviation / mean * 100
	switch {
	case cv <= thresholds.XMaxCV:
		return cv, ClassX
	case cv <= thresholds.YMaxCV:
		return cv, ClassY
	default:
		return cv, ClassZ
	}
}

// Distribution — сводка «сколько товаров в каждой клетке». Считается здесь, а
// не на странице: то же число показывают и панель, и страница настройки, и
// два независимых подсчёта однажды разойдутся.
type Distribution struct {
	// Cells — ключ вида "AX", "BZ"; у товара без класса XYZ ключ короткий:
	// "A", "C".
	Cells map[string]int `json:"cells"`
	// ByABC и ByXYZ — итоги по осям.
	ByABC map[string]int `json:"by_abc"`
	ByXYZ map[string]int `json:"by_xyz"`
	Total int            `json:"total"`
	// Value — суммарный расход за окно в выбранной мере.
	Value float64 `json:"value"`
}

// Summarize собирает сводку по результатам.
func Summarize(results []Result) Distribution {
	summary := Distribution{
		Cells: map[string]int{},
		ByABC: map[string]int{},
		ByXYZ: map[string]int{},
		Total: len(results),
	}
	for _, result := range results {
		summary.Cells[result.ABC+result.XYZ]++
		summary.ByABC[result.ABC]++
		summary.ByXYZ[result.XYZ]++
		summary.Value += result.Value
	}
	return summary
}
