// Package akeda — тонкий рантайм публичного API Akeda ERP поверх
// сгенерированных типов.
//
// Клиент НЕ содержит 770 методов. Операции описаны контрактом, и метод на
// каждую — это ещё один список, который расходится с контрактом молча. Вместо
// этого один вызов Call, а форма операции берётся из сгенерированной карты
// generated.Operations.
//
// Руками здесь написано ровно то, где нужны решения: адрес контура, заголовки,
// что делать с Idempotency-Key у операции, которая его не читает, когда повтор
// осмыслен, а когда он второй раз проводит документ.
package akeda

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/Artogceo/akeda-sdk/clients/go/akeda/generated"
)

// ProductionBaseURL — боевой контур. Адрес задаётся, а не вшивается: контуров
// больше одного, и клиент, знающий один, ведёт партнёра в бой на отладке.
const ProductionBaseURL = "https://erp.akeda.ru"

// Options — настройка клиента.
type Options struct {
	BaseURL     string
	Credentials Credentials
	// Tenant — slug кабинета. Кабинет это tenant, а не юрлицо: юрлицо (company)
	// живёт внутри кабинета и заголовком не выбирается.
	Tenant         string
	AcceptLanguage string
	HTTPClient     *http.Client
	// MaxRetries — сколько раз повторять то, что сервер сам просит повторить.
	MaxRetries int
	UserAgent  string
	sleep      func(time.Duration)
}

// Client — предъявитель запросов к одному контуру одного кабинета.
type Client struct {
	baseURL        string
	credentials    Credentials
	tenant         string
	acceptLanguage string
	httpClient     *http.Client
	maxRetries     int
	userAgent      string
	sleep          func(time.Duration)
}

// Result — успешный ответ.
type Result struct {
	Status  int
	Headers http.Header
	Body    []byte
	// IdempotentReplay — ответ пришёл из хранилища идемпотентности.
	IdempotentReplay bool
	RateLimit        RateLimitState
	// RequestID — идентификатор случая; приходит и на успешном ответе.
	RequestID string
}

// Decode разбирает тело ответа в переданную структуру.
func (r Result) Decode(target any) error {
	if len(r.Body) == 0 {
		return nil
	}
	if err := json.Unmarshal(r.Body, target); err != nil {
		return fmt.Errorf("akeda: ответ не разбирается: %w", err)
	}
	return nil
}

// Request — параметры одного вызова.
type Request struct {
	// PathParams — значения параметров пути по именам из контракта.
	PathParams map[string]string
	Query      url.Values
	Body       any
	// IdempotencyKey принимается ТОЛЬКО операцией, которая его читает:
	// заголовок, тихо выброшенный по дороге, — это защита, в которую вызывающий
	// поверил зря.
	IdempotencyKey string
	Headers        map[string]string
}

// New собирает клиента.
func New(options Options) (*Client, error) {
	if !strings.HasPrefix(options.BaseURL, "http://") && !strings.HasPrefix(options.BaseURL, "https://") {
		return nil, usage("BaseURL обязателен и должен начинаться с http:// или https://")
	}
	tenant := strings.TrimSpace(options.Tenant)
	if options.Credentials.RequiresTenantHeader() && tenant == "" {
		// Личный ключ без кабинета отвечает 400 tenant_required, кабинетный —
		// работает. Разница видна только в проде, поэтому спрашиваем сразу.
		return nil, usage("для ключа ak_… нужен Tenant: личный ключ без заголовка X-Tenant отвечает 400 tenant_required")
	}
	client := options.HTTPClient
	if client == nil {
		client = &http.Client{Timeout: 30 * time.Second}
	}
	language := options.AcceptLanguage
	if language == "" {
		language = "ru"
	}
	agent := options.UserAgent
	if agent == "" {
		agent = "akeda-sdk-go"
	}
	pause := options.sleep
	if pause == nil {
		pause = time.Sleep
	}
	return &Client{
		baseURL:        strings.TrimRight(options.BaseURL, "/"),
		credentials:    options.Credentials,
		tenant:         tenant,
		acceptLanguage: language,
		httpClient:     client,
		maxRetries:     options.MaxRetries,
		userAgent:      agent,
		sleep:          pause,
	}, nil
}

// Spec отдаёт описание операции из контракта.
func (c *Client) Spec(operationID string) (generated.Operation, error) {
	operation, ok := generated.Operations[operationID]
	if !ok {
		return generated.Operation{}, usage("операции %s нет в контракте этого снимка", operationID)
	}
	return operation, nil
}

// IdempotentOperations — операции, читающие Idempotency-Key. Список приходит из
// контракта, а не пишется здесь.
func IdempotentOperations() []string {
	names := make([]string, 0, 8)
	for name, operation := range generated.Operations {
		if operation.Idempotent {
			names = append(names, name)
		}
	}
	sort.Strings(names)
	return names
}

// Call выполняет операцию контракта.
func (c *Client) Call(ctx context.Context, operationID string, request Request) (Result, error) {
	operation, err := c.Spec(operationID)
	if err != nil {
		return Result{}, err
	}
	if request.IdempotencyKey != "" && !operation.Idempotent {
		return Result{}, usage(
			"операция %s не читает Idempotency-Key. Заголовок был бы отброшен сервером, "+
				"а вызывающий считал бы повтор защищённым. Заголовок читают только: %s",
			operationID, strings.Join(IdempotentOperations(), ", "))
	}

	target, err := c.buildURL(operation, request)
	if err != nil {
		return Result{}, err
	}

	var payload []byte
	if request.Body != nil {
		payload, err = json.Marshal(request.Body)
		if err != nil {
			return Result{}, fmt.Errorf("akeda: тело запроса не сериализуется: %w", err)
		}
	}

	headers := http.Header{}
	headers.Set("Accept", "application/json")
	headers.Set("Accept-Language", c.acceptLanguage)
	headers.Set("X-Akeda-Client", c.userAgent)
	// Предъявителя может не быть вовсе, и это законно ровно для трёх операций
	// контракта: регистрация разработчика, запрос ссылки входа и обмен ссылки
	// на сессию. У них `security` пуст. Слать «Bearer » с пустым значением
	// нельзя: мидлварь читает это как предъявленные и мёртвые учётные данные,
	// то есть отвечает invalid_token вместо no_credentials.
	if c.credentials.Value() != "" {
		headers.Set("Authorization", "Bearer "+c.credentials.Value())
	}
	// Кабинетный ключ находит свой кабинет сам, личный — нет: без заголовка он
	// получает 400 tenant_required. Шлём всегда, если он задан.
	if c.tenant != "" {
		headers.Set("X-Tenant", c.tenant)
	}
	for name, value := range request.Headers {
		headers.Set(name, value)
	}
	if request.IdempotencyKey != "" {
		headers.Set("Idempotency-Key", request.IdempotencyKey)
	}
	if payload != nil {
		headers.Set("Content-Type", "application/json")
	}

	return c.send(ctx, operation, target, headers, payload)
}

func (c *Client) buildURL(operation generated.Operation, request Request) (string, error) {
	path := operation.Path
	for name, value := range request.PathParams {
		token := "{" + name + "}"
		if !strings.Contains(path, token) {
			return "", usage("у операции %s нет параметра пути %s", operation.ID, name)
		}
		path = strings.ReplaceAll(path, token, url.PathEscape(value))
	}
	if open := strings.Index(path, "{"); open >= 0 {
		close := strings.Index(path[open:], "}")
		if close > 0 {
			return "", usage("не задан параметр пути %s", path[open+1:open+close])
		}
		return "", usage("адрес операции %s разобран неверно", operation.ID)
	}

	query := request.Query
	if raw := query.Get("limit"); raw != "" && operation.PageSizeMax > 0 {
		asked, err := strconv.Atoi(raw)
		if err == nil && asked > operation.PageSizeMax {
			// Просьба сверх потолка НЕ даёт 400. Сервер либо урежет выборку,
			// либо сбросит её к умолчанию — и укороченная страница читается
			// вызывающим как «данных больше нет». Отказываем здесь.
			return "", usage(
				"limit=%d больше объявленного потолка %d. Сервер не ответит ошибкой: "+
					"он молча вернёт меньше, и это прочитается как конец выборки",
				asked, operation.PageSizeMax)
		}
	}
	target := c.baseURL + path
	if encoded := query.Encode(); encoded != "" {
		target += "?" + encoded
	}
	return target, nil
}

func (c *Client) send(
	ctx context.Context,
	operation generated.Operation,
	target string,
	headers http.Header,
	payload []byte,
) (Result, error) {
	// Повторяем только то, что безопасно повторить: чтение либо команду с
	// ключом идемпотентности. Автоповтор POST без ключа проводит документ
	// дважды — цена ошибки здесь несопоставима с удобством.
	safe := operation.Method == http.MethodGet ||
		operation.Method == http.MethodHead ||
		operation.Method == http.MethodOptions ||
		headers.Get("Idempotency-Key") != ""
	attempts := 1
	if safe {
		attempts = c.maxRetries + 1
	}

	var lastErr *APIError
	for attempt := 0; attempt < attempts; attempt++ {
		var reader io.Reader
		if payload != nil {
			reader = bytes.NewReader(payload)
		}
		httpRequest, err := http.NewRequestWithContext(ctx, operation.Method, target, reader)
		if err != nil {
			return Result{}, &TransportError{Method: operation.Method, URL: target, Err: err}
		}
		httpRequest.Header = headers.Clone()

		response, err := c.httpClient.Do(httpRequest)
		if err != nil {
			return Result{}, &TransportError{Method: operation.Method, URL: target, Err: err}
		}
		body, readErr := io.ReadAll(response.Body)
		_ = response.Body.Close()
		if readErr != nil {
			return Result{}, &TransportError{Method: operation.Method, URL: target, Err: readErr}
		}

		if response.StatusCode >= 200 && response.StatusCode < 300 {
			return Result{
				Status:           response.StatusCode,
				Headers:          response.Header,
				Body:             body,
				IdempotentReplay: response.Header.Get("Idempotent-Replay") == "true",
				RateLimit:        readRateLimit(response.Header),
				RequestID:        response.Header.Get("X-Request-ID"),
			}, nil
		}

		lastErr = apiError(operation.Method, target, response, body)
		if !lastErr.Retryable() || attempt == attempts-1 {
			return Result{}, lastErr
		}
		c.sleep(backoff(attempt, lastErr.RetryAfter))
	}
	if lastErr != nil {
		return Result{}, lastErr
	}
	return Result{}, &TransportError{Method: operation.Method, URL: target, Err: fmt.Errorf("повторы исчерпаны без ответа")}
}

func apiError(method, target string, response *http.Response, body []byte) *APIError {
	var envelope errorEnvelope
	_ = json.Unmarshal(body, &envelope)
	detail := envelope.Detail
	if strings.TrimSpace(detail) == "" {
		detail = fmt.Sprintf("Ответ %d без пояснения.", response.StatusCode)
	}
	// request_id приходит и телом, и заголовком. Заголовок — запасной путь: тело
	// 4xx его не обязано нести, а идентификатор случая нужен именно тогда, когда
	// тело оказалось скупым.
	requestID := envelope.RequestID
	if requestID == "" {
		requestID = response.Header.Get("X-Request-ID")
	}
	retryAfter := envelope.RetryAfter
	if retryAfter == 0 {
		retryAfter = headerInt(response.Header, "Retry-After")
	}
	return &APIError{
		Status:     response.StatusCode,
		Code:       envelope.Code,
		Detail:     detail,
		RequestID:  requestID,
		RetryAfter: retryAfter,
		RateLimit:  readRateLimit(response.Header),
		Method:     method,
		URL:        target,
		Body:       body,
	}
}

func backoff(attempt, retryAfter int) time.Duration {
	// Retry-After — это просьба сервера, и она главнее нашей арифметики.
	if retryAfter > 0 {
		if retryAfter > 60 {
			retryAfter = 60
		}
		return time.Duration(retryAfter) * time.Second
	}
	delay := time.Duration(1<<attempt) * 500 * time.Millisecond
	if delay > 8*time.Second {
		delay = 8 * time.Second
	}
	return delay
}
