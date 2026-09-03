package main

import "testing"

// Разбор настройки установки.
//
// Значения приходят строками, какими бы типами они ни были объявлены в
// манифесте, и вводит их человек. Поэтому проверяется не «разбирается ли
// число», а поведение на том, что человек напечатает на самом деле: запятая
// вместо точки, значение вне границ, значение от прошлой версии приложения.

func configOf(pairs map[string]string) []ConfigValue {
	values := make([]ConfigValue, 0, len(pairs))
	for key, value := range pairs {
		values = append(values, ConfigValue{Key: key, Declared: true, Set: true, Value: value})
	}
	return values
}

func issueCode(settings Settings, key string) string {
	for _, issue := range settings.Issues {
		if issue.Key == key {
			return issue.Code
		}
	}
	return ""
}

func TestParseSettingsDefaults(t *testing.T) {
	settings := ParseSettings(nil)

	if settings.PeriodMonths != defaultPeriodMonths || settings.Metric != MetricAmount {
		t.Errorf("умолчания окна и меры: %d, %q", settings.PeriodMonths, settings.Metric)
	}
	if settings.APercent != 80 || settings.BPercent != 15 {
		t.Errorf("умолчания порогов ABC: %v / %v", settings.APercent, settings.BPercent)
	}
	if settings.XMaxCV != 10 || settings.YMaxCV != 25 || settings.MinPeriods != 3 {
		t.Errorf("умолчания порогов XYZ: %v / %v / %d", settings.XMaxCV, settings.YMaxCV, settings.MinPeriods)
	}
	if len(settings.Issues) != 0 {
		t.Errorf("незаполненная настройка дала замечания: %v", settings.Issues)
	}
}

func TestParseSettingsReadsValues(t *testing.T) {
	settings := ParseSettings(configOf(map[string]string{
		keyPeriodMonths:   "12",
		keyMetric:         "qty",
		keyAPercent:       "70",
		keyBPercent:       "20",
		keyXMaxCV:         "12,5",
		keyYMaxCV:         "40",
		keyMinPeriods:     "4",
		keyDeadDays:       "60",
		keyWarehouseCodes: "осн, доп ; осн",
	}))

	if settings.PeriodMonths != 12 || settings.Metric != MetricQty || settings.DeadDays != 60 {
		t.Errorf("значения не применились: %+v", settings)
	}
	if settings.APercent != 70 || settings.BPercent != 20 || settings.MinPeriods != 4 {
		t.Errorf("пороги не применились: %+v", settings.Thresholds)
	}
	// Запятая как разделитель дробной части: в русской раскладке человек
	// напечатает именно её.
	if settings.XMaxCV != 12.5 {
		t.Errorf("порог с запятой разобран как %v", settings.XMaxCV)
	}
	// Код склада Akeda приводит к верхнему регистру при создании, поэтому и
	// сравнивать надо так же; повтор — не второй склад.
	if len(settings.WarehouseCodes) != 2 || settings.WarehouseCodes[0] != "ОСН" || settings.WarehouseCodes[1] != "ДОП" {
		t.Errorf("коды складов разобраны как %v", settings.WarehouseCodes)
	}
	if len(settings.Issues) != 0 {
		t.Errorf("законная настройка дала замечания: %v", settings.Issues)
	}
}

func TestParseSettingsFallsBackWithReason(t *testing.T) {
	settings := ParseSettings(configOf(map[string]string{
		keyPeriodMonths: "полгода",
		keyDeadDays:     "0",
		keyMetric:       "выручка",
	}))

	if settings.PeriodMonths != defaultPeriodMonths {
		t.Errorf("нечисловой период применён: %d", settings.PeriodMonths)
	}
	if got := issueCode(settings, keyPeriodMonths); got != issueNotNumber {
		t.Errorf("замечание о периоде: %q", got)
	}
	if settings.DeadDays != defaultDeadDays {
		t.Errorf("ноль дней применён: %d", settings.DeadDays)
	}
	if got := issueCode(settings, keyDeadDays); got != issueOutOfRange {
		t.Errorf("замечание о сроке неподвижности: %q", got)
	}
	// Выручки на складе нет: регистр несёт себестоимость и количество, и
	// молча подменить меру значило бы показать не то, что человек просил.
	if settings.Metric != MetricAmount {
		t.Errorf("неизвестная мера применена: %q", settings.Metric)
	}
	if got := issueCode(settings, keyMetric); got != issueUnknown {
		t.Errorf("замечание о мере: %q", got)
	}
}

// Класс C — остаток, и отрицательным он не бывает.
func TestParseSettingsTrimsOverflowingB(t *testing.T) {
	settings := ParseSettings(configOf(map[string]string{
		keyAPercent: "80",
		keyBPercent: "40",
	}))

	if settings.APercent != 80 {
		t.Errorf("порог A урезан вместо B: %v", settings.APercent)
	}
	if settings.BPercent != 20 {
		t.Errorf("порог B стал %v, ожидалось 20", settings.BPercent)
	}
	if got := issueCode(settings, keyBPercent); got != issueSumOverflow {
		t.Errorf("замечание о сумме порогов: %q", got)
	}
}

// Перепутанные пороги XYZ оставили бы класс Y пустым, и таблица показала бы
// две буквы вместо трёх.
func TestParseSettingsSwapsXYZBounds(t *testing.T) {
	settings := ParseSettings(configOf(map[string]string{
		keyXMaxCV: "40",
		keyYMaxCV: "10",
	}))

	if settings.XMaxCV != 10 || settings.YMaxCV != 40 {
		t.Errorf("пороги XYZ: %v / %v", settings.XMaxCV, settings.YMaxCV)
	}
	if got := issueCode(settings, keyYMaxCV); got != issueXYZOrder {
		t.Errorf("замечание о порядке порогов: %q", got)
	}
}

// Значение от прошлой версии лежит в базе, но сегодняшняя версия его не
// просит. Применить его тихо значит работать по настройке, которой на экране
// кабинета уже нет.
func TestParseSettingsIgnoresUndeclaredValue(t *testing.T) {
	settings := ParseSettings([]ConfigValue{
		{Key: keyPeriodMonths, Declared: false, Set: true, Value: "24"},
	})

	if settings.PeriodMonths != defaultPeriodMonths {
		t.Errorf("значение от прошлой версии применено: %d", settings.PeriodMonths)
	}
	if got := issueCode(settings, keyPeriodMonths); got != issueStale {
		t.Errorf("замечание об устаревшем значении: %q", got)
	}
}

func TestParseSettingsIgnoresUnsetValue(t *testing.T) {
	settings := ParseSettings([]ConfigValue{
		{Key: keyPeriodMonths, Declared: true, Set: false, Value: ""},
		{Key: keyWarehouseCodes, Declared: true, Set: true, Value: "   "},
	})

	if settings.PeriodMonths != defaultPeriodMonths {
		t.Errorf("пустое значение применено: %d", settings.PeriodMonths)
	}
	if len(settings.WarehouseCodes) != 0 {
		t.Errorf("пробелы стали кодами складов: %v", settings.WarehouseCodes)
	}
	if len(settings.Issues) != 0 {
		t.Errorf("незаполненное поле дало замечание: %v", settings.Issues)
	}
}

func TestResolveWarehouses(t *testing.T) {
	all := []Warehouse{
		{ID: "1", Code: "ОСН", Name: "Основной", IsActive: true},
		{ID: "2", Code: "ДОП", Name: "Дополнительный", IsActive: true},
	}

	chosen, unknown := resolveWarehouses(all, []string{"ОСН", "НЕТУ"})
	if len(chosen) != 1 || chosen[0].ID != "1" {
		t.Fatalf("выбранные склады: %v", chosen)
	}
	// Опечатка в коде иначе превращается в пустой отчёт без единого слова о
	// причине, и кабинет ищет поломку в приложении вместо своей настройки.
	if len(unknown) != 1 || unknown[0] != "НЕТУ" {
		t.Fatalf("ненайденные коды: %v", unknown)
	}

	empty, none := resolveWarehouses(all, nil)
	if empty != nil || none != nil {
		t.Fatalf("пустой список кодов дал отбор: %v / %v", empty, none)
	}
}

// Пустой набор складов означает «все склады», то есть ОДИН запрос без отбора.
// Несколько складов означают несколько запросов: отбор по измерению принимает
// одно значение, а не список.
func TestDimFilters(t *testing.T) {
	all := dimFilters(nil)
	if len(all) != 1 || all[0] != nil {
		t.Fatalf("отбор без складов: %v", all)
	}

	two := dimFilters([]Warehouse{{ID: "1"}, {ID: "2"}})
	if len(two) != 2 || two[0][dimWarehouse] != "1" || two[1][dimWarehouse] != "2" {
		t.Fatalf("отбор по двум складам: %v", two)
	}
}
