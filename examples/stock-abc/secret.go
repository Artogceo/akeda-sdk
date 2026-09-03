package main

import (
	"io"
	"log"
	"strings"
)

// Обращение с секретом установки.
//
// Секрет здесь ровно один — токен установки `ai_…`. Утекает он не через
// злодейство, а через три обычные строки кода: `%v` по структуре настройки,
// `fmt.Println(config)` в отладке и адрес с токеном в аргументах команды.
// Поэтому значение не хранится в поле, которое печатается по умолчанию, и
// поверх журнала стоит фильтр: разработчик, добавивший завтра `log.Printf("%+v",
// options)`, не должен для этого помнить правила.
//
// Argv не участвует вовсе: флага для токена у сервиса нет, значение приходит
// только окружением или файлом. Аргументы командной строки видны любому
// процессу на машине (`ps`), и «удобно передать ключ флагом» стоит ровно
// столько же, сколько отдать его вслух.

// redacted — то, что видно вместо секрета. Слово, а не звёздочки: строка в
// журнале должна объяснять, ПОЧЕМУ здесь пусто, а не выглядеть как поломка.
const redacted = "«секрет скрыт»"

// Secret — значение, которое нельзя печатать.
//
// Значение лежит в неэкспортируемом поле: `%+v` по структуре печатает
// результат String, а не содержимое. Reveal называется так намеренно —
// вызывающий видит в коде, что достаёт открытое значение.
type Secret struct {
	value string
}

// NewSecret заворачивает открытое значение.
func NewSecret(value string) Secret {
	return Secret{value: strings.TrimSpace(value)}
}

// Empty — значение не задано.
func (s Secret) Empty() bool { return s.value == "" }

// Reveal отдаёт открытое значение. Единственная дверь к нему.
func (s Secret) Reveal() string { return s.value }

// String — то, что уедет в журнал. Префикс токена оставлен намеренно: по нему
// видно контур (`ai_live_` — боевые данные кабинета, `ai_test_` — песочница),
// и разбор инцидента «какой токен стоял на сервере» не требует самого токена.
func (s Secret) String() string {
	switch {
	case s.value == "":
		return "<не задан>"
	case strings.HasPrefix(s.value, "ai_live_"):
		return "ai_live_…"
	case strings.HasPrefix(s.value, "ai_test_"):
		return "ai_test_…"
	case len(s.value) > 3:
		return s.value[:3] + "…"
	default:
		return redacted
	}
}

// GoString закрывает второй путь: `%#v` печатает структуру по полям и обошёл бы
// String.
func (s Secret) GoString() string { return s.String() }

// MarshalJSON закрывает третий: секрет, попавший в ответ или в структурный
// журнал, уезжает дальше самого журнала.
func (s Secret) MarshalJSON() ([]byte, error) {
	return []byte(`"` + s.String() + `"`), nil
}

// scrubber — последний рубеж: фильтр поверх вывода журнала.
//
// Он не отменяет правил выше, а страхует от того, что их забудут. Значение
// секрета попадает в журнал чаще всего не из нашей структуры, а из чужого
// текста: адрес запроса, тело ответа стороннего сервиса, текст ошибки
// библиотеки. Ни одно из этих мест мы не контролируем, а строку на выходе —
// контролируем.
type scrubber struct {
	out io.Writer
	// values — открытые значения, которых в выводе быть не должно. Короткие
	// сюда не берутся: замена трёхбуквенной подстроки превратила бы журнал в
	// решето и её отключили бы целиком.
	values []string
}

// minScrubbed — короче этого значение не считается секретом. Восемь знаков —
// длина префикса `ai_live_`, то есть заведомо меньше любого настоящего токена.
const minScrubbed = 8

func newScrubber(out io.Writer, secrets ...Secret) *scrubber {
	filter := &scrubber{out: out}
	for _, secret := range secrets {
		if value := secret.Reveal(); len(value) >= minScrubbed {
			filter.values = append(filter.values, value)
		}
	}
	return filter
}

func (s *scrubber) Write(p []byte) (int, error) {
	text := string(p)
	for _, value := range s.values {
		text = strings.ReplaceAll(text, value, redacted)
	}
	if _, err := s.out.Write([]byte(text)); err != nil {
		return 0, err
	}
	// Замена короче исходника, а io.Writer обязан вернуть len(p) при успехе:
	// меньшее число вызывающий читает как «записалось не всё» и повторяет
	// хвост, то есть печатает половину строки второй раз.
	return len(p), nil
}

// newLogger собирает журнал, из которого секрет не выйдет.
func newLogger(out io.Writer, secrets ...Secret) *log.Logger {
	return log.New(newScrubber(out, secrets...), "", log.LstdFlags|log.Lmsgprefix)
}
