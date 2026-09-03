package main

import (
	"math"
	"testing"
	"time"
)

// Границы классов — единственное место расширения, где ошибка не видна глазом.
// Товар, уехавший из A в B, выглядит на экране совершенно обычно, и заметить
// это можно только тем, что цифры не сходятся у кладовщика через месяц.

func thresholds() Thresholds {
	return Thresholds{APercent: 80, BPercent: 15, XMaxCV: 10, YMaxCV: 25, MinPeriods: 3}
}

func seriesOf(product string, values ...float64) ProductSeries {
	entry := ProductSeries{Product: product, Value: map[string]float64{}, Qty: map[string]float64{}}
	for index, value := range values {
		period := periodName(index)
		entry.Value[period] = value
		entry.Qty[period] = value
	}
	return entry
}

func periodName(index int) string {
	return time.Date(2026, time.January, 1, 0, 0, 0, 0, time.UTC).AddDate(0, index, 0).Format("2006-01")
}

func periodsOf(count int) []string {
	periods := make([]string, 0, count)
	for index := 0; index < count; index++ {
		periods = append(periods, periodName(index))
	}
	return periods
}

func classOf(results []Result, product string) Result {
	for _, result := range results {
		if result.Product == product {
			return result
		}
	}
	return Result{}
}

// Главный случай, ради которого правило выписано явно: один товар даёт весь
// расход склада. Если класс считать по накопленной доле ВКЛЮЧАЯ товар, класс A
// окажется пуст, а важнейшая позиция кабинета — в B.
func TestClassifyLoneDominantProductStaysInA(t *testing.T) {
	results := Classify(periodsOf(3), []ProductSeries{seriesOf("one", 100, 0, 0)}, thresholds())
	if got := classOf(results, "one").ABC; got != ClassA {
		t.Fatalf("товар со всем расходом склада получил класс %q, а не A", got)
	}
}

// Ровно на границе: 80, 15, 5 при порогах 80/15 должны дать A, B, C.
// Второй товар начинается на отметке 80 — то есть граница уже пересечена
// первым, и второй в A попасть не должен.
func TestClassifyExactBoundaries(t *testing.T) {
	results := Classify(periodsOf(3), []ProductSeries{
		seriesOf("a", 80, 0, 0),
		seriesOf("b", 15, 0, 0),
		seriesOf("c", 5, 0, 0),
	}, thresholds())

	want := map[string]string{"a": ClassA, "b": ClassB, "c": ClassC}
	for product, expected := range want {
		if got := classOf(results, product).ABC; got != expected {
			t.Errorf("товар %s: класс %q, ожидался %q", product, got, expected)
		}
	}
}

// Товар, переступающий границу серединой своей доли, остаётся в верхнем классе.
func TestClassifyCrossingProductStaysAbove(t *testing.T) {
	results := Classify(periodsOf(3), []ProductSeries{
		seriesOf("big", 70, 0, 0),
		seriesOf("crossing", 20, 0, 0), // с 70 до 90: переступает 80
		seriesOf("tail", 10, 0, 0),
	}, thresholds())

	if got := classOf(results, "crossing").ABC; got != ClassA {
		t.Fatalf("товар, переступивший порог A, получил %q вместо A", got)
	}
	if got := classOf(results, "tail").ABC; got != ClassB {
		t.Fatalf("товар после порога A получил %q вместо B", got)
	}
}

func TestClassifyZeroConsumptionIsAlwaysC(t *testing.T) {
	results := Classify(periodsOf(3), []ProductSeries{
		seriesOf("moving", 100, 0, 0),
		seriesOf("dead", 0, 0, 0),
	}, thresholds())

	dead := classOf(results, "dead")
	if dead.ABC != ClassC {
		t.Fatalf("товар без расхода получил класс %q вместо C", dead.ABC)
	}
	if dead.XYZ != ClassUnknown {
		t.Fatalf("у товара без расхода появился класс XYZ %q: делить на нулевое среднее нечем", dead.XYZ)
	}
	if dead.Share != 0 {
		t.Fatalf("доля товара без расхода %v, ожидался ноль", dead.Share)
	}
}

// Ничего не двигалось вовсе: доли не считаются, NaN на экран не уезжает.
func TestClassifyEverythingZero(t *testing.T) {
	results := Classify(periodsOf(3), []ProductSeries{
		seriesOf("a", 0, 0, 0),
		seriesOf("b", 0, 0, 0),
	}, thresholds())

	for _, result := range results {
		if result.ABC != ClassC {
			t.Errorf("товар %s получил %q при пустом складе", result.Product, result.ABC)
		}
		if math.IsNaN(result.Share) || math.IsNaN(result.CumulativeShare) {
			t.Errorf("товар %s: доля посчитана как NaN", result.Product)
		}
	}
}

// Порядок при равных значениях устойчив: иначе два одинаковых товара меняются
// местами от прогона к прогону и один из них назавтра оказывается в другом
// классе без единого движения на складе.
func TestClassifyTiesOrderedByProduct(t *testing.T) {
	first := Classify(periodsOf(3), []ProductSeries{
		seriesOf("zebra", 50, 0, 0),
		seriesOf("alpha", 50, 0, 0),
	}, thresholds())
	second := Classify(periodsOf(3), []ProductSeries{
		seriesOf("alpha", 50, 0, 0),
		seriesOf("zebra", 50, 0, 0),
	}, thresholds())

	if first[0].Product != "alpha" || second[0].Product != "alpha" {
		t.Fatalf("порядок при равных значениях зависит от входа: %q и %q", first[0].Product, second[0].Product)
	}
}

// Сумма порогов больше ста ловится в разборе настройки, но расчёт обязан
// пережить её и без него: класс C иначе стал бы пуст.
func TestClassifyHandlesWideThresholds(t *testing.T) {
	wide := Thresholds{APercent: 100, BPercent: 0, XMaxCV: 10, YMaxCV: 25, MinPeriods: 3}
	results := Classify(periodsOf(3), []ProductSeries{
		seriesOf("a", 60, 0, 0),
		seriesOf("b", 40, 0, 0),
	}, wide)

	for _, result := range results {
		if result.ABC != ClassA {
			t.Errorf("при пороге A=100 товар %s получил %q", result.Product, result.ABC)
		}
	}
}

// Пустой ряд XYZ — не отсутствие наблюдения, а наблюдение «ноль». Товар,
// проданный трижды за полгода, не должен выглядеть ровным.
func TestVariationCountsEmptyPeriods(t *testing.T) {
	dense := Classify(periodsOf(6), []ProductSeries{seriesOf("dense", 10, 10, 10, 10, 10, 10)}, thresholds())
	sparse := Classify(periodsOf(6), []ProductSeries{seriesOf("sparse", 10, 10, 10, 0, 0, 0)}, thresholds())

	if got := classOf(dense, "dense").XYZ; got != ClassX {
		t.Fatalf("ровный расход получил класс %q вместо X", got)
	}
	if got := classOf(sparse, "sparse").XYZ; got == ClassX {
		t.Fatalf("рваный расход получил класс X: нули периодов в ряд не попали")
	}
}

// Потолок вариации включающий: значение РОВНО на пороге относится к верхнему
// классу. Иначе кабинет, поставивший порог 10, не получает X ни у чего с
// вариацией десять — и читает это как ошибку расчёта.
func TestVariationBoundaryIsInclusive(t *testing.T) {
	// [90, 110]: среднее 100, отклонение по совокупности 10, вариация ровно 10 %.
	limits := Thresholds{APercent: 80, BPercent: 15, XMaxCV: 10, YMaxCV: 25, MinPeriods: 2}
	results := Classify(periodsOf(2), []ProductSeries{seriesOf("edge", 90, 110)}, limits)

	edge := classOf(results, "edge")
	if math.Abs(edge.CV-10) > 1e-9 {
		t.Fatalf("коэффициент вариации %v, ожидалось 10", edge.CV)
	}
	if edge.XYZ != ClassX {
		t.Fatalf("вариация ровно на пороге дала класс %q вместо X", edge.XYZ)
	}
}

func TestVariationSecondBoundaryIsInclusive(t *testing.T) {
	limits := Thresholds{APercent: 80, BPercent: 15, XMaxCV: 5, YMaxCV: 10, MinPeriods: 2}
	results := Classify(periodsOf(2), []ProductSeries{seriesOf("edge", 90, 110)}, limits)

	if got := classOf(results, "edge").XYZ; got != ClassY {
		t.Fatalf("вариация ровно на пороге Y дала класс %q вместо Y", got)
	}
}

// Ряд короче объявленного минимума не даёт буквы вовсе. Один месяц продаж даёт
// вариацию ноль, то есть «идеально ровный спрос» по одной отгрузке.
func TestVariationRefusesShortSeries(t *testing.T) {
	results := Classify(periodsOf(2), []ProductSeries{seriesOf("young", 10, 10)}, thresholds())

	young := classOf(results, "young")
	if young.XYZ != ClassUnknown {
		t.Fatalf("по двум периодам при минимуме три выставлен класс %q", young.XYZ)
	}
	if young.ABC != ClassA {
		t.Fatalf("короткий ряд отменил и класс ABC: %q", young.ABC)
	}
}

func TestSummarizeCountsCells(t *testing.T) {
	results := Classify(periodsOf(6), []ProductSeries{
		seriesOf("steady", 10, 10, 10, 10, 10, 10),
		seriesOf("spiky", 60, 0, 0, 0, 0, 0),
		seriesOf("dead", 0, 0, 0, 0, 0, 0),
	}, thresholds())

	summary := Summarize(results)
	if summary.Total != 3 {
		t.Fatalf("итого товаров %d, ожидалось 3", summary.Total)
	}
	if summary.ByABC[ClassC] < 1 {
		t.Fatalf("товар без расхода не попал в C: %v", summary.ByABC)
	}
	if summary.Cells["C"] != 1 {
		t.Fatalf("клетка «C без XYZ» содержит %d, ожидался один товар без расхода", summary.Cells["C"])
	}
	if math.Abs(summary.Value-120) > 1e-9 {
		t.Fatalf("суммарный расход %v, ожидалось 120", summary.Value)
	}
}

// Окно кончается ПРОШЛЫМ месяцем: незакрытый короче остальных и завысил бы
// разброс у всего склада.
func TestMakeWindowEndsWithPreviousMonth(t *testing.T) {
	window := MakeWindow(time.Date(2026, time.September, 3, 14, 0, 0, 0, time.UTC), 6)

	if window.FromISO() != "2026-03-01" {
		t.Errorf("начало окна %s, ожидалось 2026-03-01", window.FromISO())
	}
	if window.ToISO() != "2026-08-31" {
		t.Errorf("конец окна %s, ожидалось 2026-08-31", window.ToISO())
	}
	if len(window.Periods) != 6 {
		t.Fatalf("периодов %d, ожидалось 6: %v", len(window.Periods), window.Periods)
	}
	if window.Periods[0] != "2026-03" || window.Periods[5] != "2026-08" {
		t.Errorf("границы ряда периодов: %v", window.Periods)
	}
	if window.Days != 184 {
		t.Errorf("длина окна %d дней, ожидалось 184", window.Days)
	}
}

// Первое число месяца — тот самый день, когда незакрытый месяц пуст. Окно
// обязано остаться прежним, а не превратиться в «сегодня по сегодня».
func TestMakeWindowOnFirstDayOfMonth(t *testing.T) {
	window := MakeWindow(time.Date(2026, time.January, 1, 0, 30, 0, 0, time.UTC), 3)

	if window.FromISO() != "2025-10-01" || window.ToISO() != "2025-12-31" {
		t.Fatalf("окно %s — %s, ожидалось 2025-10-01 — 2025-12-31", window.FromISO(), window.ToISO())
	}
}

func TestPeriodKeyTakesMonth(t *testing.T) {
	if got := PeriodKey("2026-03-01"); got != "2026-03" {
		t.Fatalf("ключ периода %q, ожидался 2026-03", got)
	}
	if got := PeriodKey("2026-03"); got != "2026-03" {
		t.Fatalf("короткий ключ испорчен: %q", got)
	}
}
