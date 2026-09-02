package akeda

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"
)

// Разбор отказа Akeda.
//
// Конверт один на весь контракт (схема Error) и несёт ровно три поля:
//
//	code       — машинный код, по нему ветвится программа;
//	detail     — одно предложение на языке запроса, его читает человек;
//	request_id — ИДЕНТИФИКАТОР СЛУЧАЯ, по нему вызывающий получает помощь.
//
// Причины отказа в теле нет и не будет: ни SQL, ни имён таблиц, ни трассы
// стека. Поэтому RequestID — единственное, что имеет смысл нести в поддержку,
// и Error() кладёт его прямо в текст, а не прячет в поле, которое не смотрят.

// ErrUsage — клиент собран или вызван неверно: ошибка программиста, а не сервера.
var ErrUsage = errors.New("akeda: ошибка использования клиента")

// UsageError оборачивает ErrUsage с пояснением.
type UsageError struct{ Detail string }

func (e *UsageError) Error() string        { return "akeda: " + e.Detail }
func (e *UsageError) Is(target error) bool { return target == ErrUsage }

func usage(format string, args ...any) error {
	return &UsageError{Detail: fmt.Sprintf(format, args...)}
}

// RateLimitState — заголовки RateLimit-*; приходят и на успешном ответе.
type RateLimitState struct {
	Limit     int
	Remaining int
	Reset     int
}

// APIError — отказ, о котором сервер сказал явно.
type APIError struct {
	Status     int
	Code       string
	Detail     string
	RequestID  string
	RetryAfter int
	RateLimit  RateLimitState
	Method     string
	URL        string
	Body       []byte
}

func (e *APIError) Error() string {
	message := fmt.Sprintf("akeda %d", e.Status)
	if e.Code != "" {
		message += " " + e.Code
	}
	message += ": " + e.Detail
	if e.RequestID != "" {
		message += " (случай " + e.RequestID + ")"
	}
	return message
}

// Retryable сообщает, осмыслен ли повтор.
//
// Список закрыт намеренно. 429 и 503 сервер сам просит повторить; 409
// idempotency.in_progress означает «тот же ключ прямо сейчас выполняется» и
// тоже ждёт. Всё остальное — 4xx, и повтор того же запроса даст тот же ответ,
// только позже.
func (e *APIError) Retryable() bool {
	if e.Status == http.StatusTooManyRequests || e.Status == http.StatusServiceUnavailable {
		return true
	}
	return e.Status == http.StatusConflict && e.Code == "idempotency.in_progress"
}

// TransportError — до сервера не дошли.
type TransportError struct {
	Method string
	URL    string
	Err    error
}

func (e *TransportError) Error() string {
	return fmt.Sprintf("akeda: запрос %s %s не выполнен: %v", e.Method, e.URL, e.Err)
}

func (e *TransportError) Unwrap() error { return e.Err }

type errorEnvelope struct {
	Detail     string `json:"detail"`
	Code       string `json:"code"`
	RequestID  string `json:"request_id"`
	RetryAfter int    `json:"retry_after"`
}

func headerInt(headers http.Header, name string) int {
	raw := headers.Get(name)
	if raw == "" {
		return 0
	}
	value, err := strconv.Atoi(raw)
	if err != nil {
		return 0
	}
	return value
}

func readRateLimit(headers http.Header) RateLimitState {
	return RateLimitState{
		Limit:     headerInt(headers, "RateLimit-Limit"),
		Remaining: headerInt(headers, "RateLimit-Remaining"),
		Reset:     headerInt(headers, "RateLimit-Reset"),
	}
}
