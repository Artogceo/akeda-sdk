package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strings"
	"testing"
)

// Секрет не должен попадать в журнал — и проверяется это не чтением кода, а
// прогоном тех трёх способов, которыми он туда попадает на самом деле:
// печатью структуры, сериализацией и чужим текстом, в котором значение уже
// оказалось.

// Синтетическое значение той же формы, что живой токен установки. Живого здесь
// быть не может: репозиторий публичный, а машинная проверка дерева ловит
// настоящие токены по форме.
const fakeToken = "ai_test_0123456789abcdef0123456789abcdef"

func TestSecretNeverPrintsValue(t *testing.T) {
	secret := NewSecret(fakeToken)

	// Три разных глагола печати, три разных пути внутрь fmt. Пропустив хоть
	// один, секрет уезжает в журнал первой же отладочной строкой.
	for _, printed := range []string{
		fmt.Sprintf("%v", secret),
		fmt.Sprintf("%s", secret),
		fmt.Sprintf("%#v", secret),
		fmt.Sprint(secret),
	} {
		if strings.Contains(printed, fakeToken) {
			t.Fatalf("печать секрета вернула значение: %s", printed)
		}
		if !strings.Contains(printed, "ai_test_…") {
			t.Errorf("печать секрета не назвала контур токена: %s", printed)
		}
	}
}

// Самый частый способ утечки: `%+v` по структуре настройки в отладке. Значение
// лежит в неэкспортируемом поле, поэтому fmt зовёт String, а не печатает поля.
func TestSecretInsideStructNeverLeaks(t *testing.T) {
	config := Config{
		BaseURL: "https://erp.akeda.ru",
		Tenant:  "akeda-demo",
		Token:   NewSecret(fakeToken),
	}
	for _, printed := range []string{
		fmt.Sprintf("%v", config),
		fmt.Sprintf("%+v", config),
		fmt.Sprintf("%#v", config),
	} {
		if strings.Contains(printed, fakeToken) {
			t.Fatalf("структура напечатала секрет: %s", printed)
		}
	}
}

// Второй способ: структурный журнал или ответ, собранный json.Marshal.
func TestSecretNeverSerialises(t *testing.T) {
	blob, err := json.Marshal(map[string]any{"token": NewSecret(fakeToken)})
	if err != nil {
		t.Fatal(err)
	}
	if strings.Contains(string(blob), fakeToken) {
		t.Fatalf("секрет уехал в JSON: %s", blob)
	}
}

// Третий способ, и от него не спасают первые два: значение попадает в ЧУЖОЙ
// текст — в адрес запроса, в тело ответа стороннего сервиса, в текст ошибки
// библиотеки. Ни одно из этих мест мы не пишем, а строку на выходе журнала —
// пишем.
func TestLoggerScrubsSecretFromForeignText(t *testing.T) {
	var out bytes.Buffer
	logger := newLogger(&out, NewSecret(fakeToken))

	logger.Printf("сторонняя библиотека сказала: GET https://example.test?token=%s не прошёл", fakeToken)
	logger.Printf("настройка сервиса: переменная AKEDA_INSTALLATION_TOKEN=%s не той формы", fakeToken)

	printed := out.String()
	if strings.Contains(printed, fakeToken) {
		t.Fatalf("секрет остался в журнале: %s", printed)
	}
	if strings.Count(printed, redacted) != 2 {
		t.Fatalf("замен %d, ожидалось две: %s", strings.Count(printed, redacted), printed)
	}
}

// Фильтр укорачивает строку, а io.Writer обязан вернуть len(p) при успехе:
// меньшее число вызывающий читает как «записалось не всё» и печатает хвост
// второй раз.
func TestScrubberReportsFullLength(t *testing.T) {
	var out bytes.Buffer
	filter := newScrubber(&out, NewSecret(fakeToken))

	payload := []byte("до " + fakeToken + " после")
	written, err := filter.Write(payload)
	if err != nil {
		t.Fatal(err)
	}
	if written != len(payload) {
		t.Fatalf("записано %d из %d: вызывающий повторит хвост", written, len(payload))
	}
	if strings.Contains(out.String(), fakeToken) {
		t.Fatalf("фильтр пропустил секрет: %s", out.String())
	}
}

// Пустой и слишком короткий секрет не превращают журнал в решето: замена
// трёхбуквенной подстроки вычистила бы половину осмысленного текста, и фильтр
// отключили бы целиком.
func TestScrubberIgnoresShortValues(t *testing.T) {
	var out bytes.Buffer
	filter := newScrubber(&out, NewSecret(""), NewSecret("ai_"))

	if _, err := filter.Write([]byte("обычная строка про ai_ и пустоту")); err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(out.String(), "обычная строка про ai_ и пустоту") {
		t.Fatalf("фильтр испортил обычный текст: %s", out.String())
	}
}

func TestSecretEmpty(t *testing.T) {
	if !NewSecret("   ").Empty() {
		t.Error("секрет из пробелов считается заданным")
	}
	if NewSecret(fakeToken).Reveal() != fakeToken {
		t.Error("Reveal не отдал значение — заголовок запроса уйдёт пустым")
	}
}
