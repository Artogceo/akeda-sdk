package akeda_test

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"testing"

	"github.com/Artogceo/akeda-sdk/clients/go/akeda"
	"github.com/Artogceo/akeda-sdk/clients/go/akeda/generated"
)

const testKey = "ak_0000000000000000000000000000000000000000000000000000000000000000"

type recorded struct {
	Method string
	Path   string
	Query  string
	Header http.Header
	Body   string
}

type stub struct {
	responses []response
	calls     []recorded
	index     int
}

type response struct {
	status  int
	body    any
	headers map[string]string
}

func newServer(t *testing.T, responses ...response) (*httptest.Server, *stub) {
	t.Helper()
	state := &stub{responses: responses}
	server := httptest.NewServer(http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		body := new(strings.Builder)
		_, _ = fmt.Fscan(request.Body, body)
		state.calls = append(state.calls, recorded{
			Method: request.Method,
			Path:   request.URL.Path,
			Query:  request.URL.RawQuery,
			Header: request.Header.Clone(),
			Body:   body.String(),
		})
		next := state.responses[min(state.index, len(state.responses)-1)]
		state.index++
		for name, value := range next.headers {
			writer.Header().Set(name, value)
		}
		writer.Header().Set("Content-Type", "application/json")
		writer.WriteHeader(next.status)
		if next.body != nil {
			_ = json.NewEncoder(writer).Encode(next.body)
		}
	}))
	t.Cleanup(server.Close)
	return server, state
}

func newClient(t *testing.T, baseURL string, retries int) *akeda.Client {
	t.Helper()
	credentials, err := akeda.APIKey(testKey)
	if err != nil {
		t.Fatalf("ключ: %v", err)
	}
	client, err := akeda.New(akeda.Options{
		BaseURL:     baseURL,
		Credentials: credentials,
		Tenant:      "acme",
		MaxRetries:  retries,
	})
	if err != nil {
		t.Fatalf("клиент: %v", err)
	}
	return client
}

func TestKeyWithoutPrefixRejected(t *testing.T) {
	if _, err := akeda.APIKey("secret"); !errors.Is(err, akeda.ErrUsage) {
		t.Fatalf("ожидалась ошибка использования, получено %v", err)
	}
}

func TestTenantKeyRequiresTenant(t *testing.T) {
	credentials, _ := akeda.APIKey(testKey)
	if _, err := akeda.New(akeda.Options{BaseURL: "https://example.test", Credentials: credentials}); !errors.Is(err, akeda.ErrUsage) {
		t.Fatalf("ожидалась ошибка использования, получено %v", err)
	}
}

func TestInstallationTokenDoesNotRequireTenant(t *testing.T) {
	credentials, err := akeda.InstallationToken("ai_" + strings.Repeat("1", 32))
	if err != nil {
		t.Fatalf("токен: %v", err)
	}
	if _, err := akeda.New(akeda.Options{BaseURL: "https://example.test", Credentials: credentials}); err != nil {
		t.Fatalf("установка кабинет не называет: %v", err)
	}
}

func TestHeadersAndQuery(t *testing.T) {
	server, state := newServer(t, response{status: 200, body: map[string]any{"count": 0, "results": []any{}}})
	client := newClient(t, server.URL, 0)
	if _, err := client.Call(context.Background(), "coreListContacts", akeda.Request{
		Query: url.Values{"limit": {"10"}},
	}); err != nil {
		t.Fatalf("вызов: %v", err)
	}
	call := state.calls[0]
	if got := call.Header.Get("Authorization"); got != "Bearer "+testKey {
		t.Fatalf("Authorization: %s", got)
	}
	if got := call.Header.Get("X-Tenant"); got != "acme" {
		t.Fatalf("X-Tenant: %s", got)
	}
	if call.Path != "/api/v1/core/contacts" || call.Query != "limit=10" {
		t.Fatalf("адрес: %s?%s", call.Path, call.Query)
	}
}

func TestPathParameterSubstituted(t *testing.T) {
	server, state := newServer(t, response{status: 200, body: map[string]any{}})
	client := newClient(t, server.URL, 0)
	if _, err := client.Call(context.Background(), "coreGetContact", akeda.Request{
		PathParams: map[string]string{"id": "a b"},
	}); err != nil {
		t.Fatalf("вызов: %v", err)
	}
	if state.calls[0].Path != "/api/v1/core/contacts/a b" {
		t.Fatalf("путь: %q", state.calls[0].Path)
	}
}

func TestMissingPathParameterIsUsageError(t *testing.T) {
	server, _ := newServer(t, response{status: 200, body: map[string]any{}})
	client := newClient(t, server.URL, 0)
	_, err := client.Call(context.Background(), "coreGetContact", akeda.Request{})
	if !errors.Is(err, akeda.ErrUsage) {
		t.Fatalf("ожидалась ошибка использования, получено %v", err)
	}
}

func TestLimitAboveDeclaredCapRefused(t *testing.T) {
	server, _ := newServer(t, response{status: 200, body: map[string]any{}})
	client := newClient(t, server.URL, 0)
	if generated.Operations["coreListContacts"].PageSizeMax != 500 {
		t.Fatalf("потолок контракта изменился")
	}
	_, err := client.Call(context.Background(), "coreListContacts", akeda.Request{
		Query: url.Values{"limit": {"600"}},
	})
	if !errors.Is(err, akeda.ErrUsage) {
		t.Fatalf("ожидалась ошибка использования, получено %v", err)
	}
}

func TestIdempotencyKeyRefusedWhereContractIgnoresIt(t *testing.T) {
	server, _ := newServer(t, response{status: 200, body: map[string]any{}})
	client := newClient(t, server.URL, 0)
	_, err := client.Call(context.Background(), "coreListContacts", akeda.Request{IdempotencyKey: "abc"})
	if !errors.Is(err, akeda.ErrUsage) {
		t.Fatalf("ожидалась ошибка использования, получено %v", err)
	}
}

func TestIdempotencyKeySentWhereContractReadsIt(t *testing.T) {
	server, state := newServer(t, response{
		status:  201,
		body:    map[string]any{"id": "1"},
		headers: map[string]string{"Idempotent-Replay": "true"},
	})
	client := newClient(t, server.URL, 0)
	result, err := client.Call(context.Background(), "coreCreateContact", akeda.Request{
		Body:           map[string]any{"name": "ООО Ромашка"},
		IdempotencyKey: "order-1",
	})
	if err != nil {
		t.Fatalf("вызов: %v", err)
	}
	if state.calls[0].Header.Get("Idempotency-Key") != "order-1" {
		t.Fatalf("ключ идемпотентности не уехал")
	}
	if !result.IdempotentReplay {
		t.Fatalf("повтор из хранилища не распознан")
	}
}

func TestErrorEnvelopeParsed(t *testing.T) {
	server, _ := newServer(t, response{status: 403, body: map[string]any{
		"detail":     "Недостаточно прав.",
		"code":       "forbidden",
		"request_id": "0199a1f0-0000-7000-8000-000000000009",
	}})
	client := newClient(t, server.URL, 0)
	_, err := client.Call(context.Background(), "coreListContacts", akeda.Request{})
	var apiErr *akeda.APIError
	if !errors.As(err, &apiErr) {
		t.Fatalf("ожидался APIError, получено %v", err)
	}
	if apiErr.Status != 403 || apiErr.Code != "forbidden" || apiErr.RequestID == "" {
		t.Fatalf("конверт разобран неверно: %+v", apiErr)
	}
	if !strings.Contains(apiErr.Error(), "случай 0199a1f0") {
		t.Fatalf("идентификатор случая не попал в текст: %s", apiErr.Error())
	}
}

func TestRequestIDFallsBackToHeader(t *testing.T) {
	server, _ := newServer(t, response{
		status:  500,
		body:    map[string]any{"detail": "Внутренняя ошибка."},
		headers: map[string]string{"X-Request-ID": "0199a1f0-0000-7000-8000-00000000000f"},
	})
	client := newClient(t, server.URL, 0)
	_, err := client.Call(context.Background(), "coreListContacts", akeda.Request{})
	var apiErr *akeda.APIError
	if !errors.As(err, &apiErr) || apiErr.RequestID != "0199a1f0-0000-7000-8000-00000000000f" {
		t.Fatalf("идентификатор случая не взят из заголовка: %v", err)
	}
}

func TestCommandWithoutIdempotencyKeyIsNotRetried(t *testing.T) {
	server, state := newServer(t, response{status: 503, body: map[string]any{"detail": "Недоступно."}})
	client := newClient(t, server.URL, 3)
	_, _ = client.Call(context.Background(), "coreCreateContact", akeda.Request{Body: map[string]any{}})
	if len(state.calls) != 1 {
		t.Fatalf("POST без ключа повторён %d раз: документ провёлся бы дважды", len(state.calls))
	}
}

func TestReadIsRetriedWhileServerAsks(t *testing.T) {
	server, state := newServer(t,
		response{status: 503, body: map[string]any{"detail": "Недоступно."}, headers: map[string]string{"Retry-After": "0"}},
		response{status: 503, body: map[string]any{"detail": "Недоступно."}, headers: map[string]string{"Retry-After": "0"}},
		response{status: 200, body: map[string]any{"count": 0, "results": []any{}}},
	)
	credentials, _ := akeda.APIKey(testKey)
	client, err := akeda.New(akeda.Options{
		BaseURL: server.URL, Credentials: credentials, Tenant: "acme", MaxRetries: 2,
	})
	if err != nil {
		t.Fatalf("клиент: %v", err)
	}
	// Ответы несут Retry-After 0, поэтому паузы нулевые и тест не спит.
	if _, err := client.Call(context.Background(), "coreListContacts", akeda.Request{}); err != nil {
		t.Fatalf("вызов: %v", err)
	}
	if len(state.calls) != 3 {
		t.Fatalf("повторов %d, ожидалось 3", len(state.calls))
	}
}

func TestPaginationStopsOnShortPage(t *testing.T) {
	page := func(rows int) response {
		results := make([]map[string]int, rows)
		for i := range results {
			results[i] = map[string]int{"i": i}
		}
		return response{status: 200, body: map[string]any{"count": rows, "results": results}}
	}
	server, state := newServer(t, page(500), page(500), page(3))
	client := newClient(t, server.URL, 0)
	seen := 0
	if err := client.Paginate(context.Background(), "coreListContacts", akeda.PageOptions{},
		func(json.RawMessage) (bool, error) { seen++; return true, nil }); err != nil {
		t.Fatalf("обход: %v", err)
	}
	if seen != 1003 {
		t.Fatalf("получено %d строк, ожидалось 1003", seen)
	}
	if len(state.calls) != 3 {
		t.Fatalf("страниц %d, ожидалось 3", len(state.calls))
	}
	if !strings.Contains(state.calls[1].Query, "offset=500") {
		t.Fatalf("вторая страница без offset: %s", state.calls[1].Query)
	}
}

func TestPaginationRefusesForeignSchemes(t *testing.T) {
	server, _ := newServer(t, response{status: 200, body: map[string]any{"results": []any{}}})
	client := newClient(t, server.URL, 0)
	if generated.Operations["chatListConversations"].Pagination != "cursor" {
		t.Fatalf("схема листания бесед изменилась")
	}
	err := client.Paginate(context.Background(), "chatListConversations", akeda.PageOptions{},
		func(json.RawMessage) (bool, error) { return true, nil })
	if !errors.Is(err, akeda.ErrUsage) {
		t.Fatalf("ожидалась ошибка использования, получено %v", err)
	}
}

func TestContractFactsMatchDocumentation(t *testing.T) {
	if len(generated.Operations) != 770 {
		t.Fatalf("операций %d, в снимке ожидается 770", len(generated.Operations))
	}
	public := 0
	for _, operation := range generated.Operations {
		if operation.Stage == "public" {
			public++
		}
	}
	if public != 30 {
		t.Fatalf("операций стадии public %d, ожидалось 30", public)
	}
	want := []string{
		"coreCreateContact", "coreCreateDocument", "coreCreateProduct",
		"corePostDocument", "tasksCreateTask",
	}
	got := akeda.IdempotentOperations()
	if strings.Join(got, ",") != strings.Join(want, ",") {
		t.Fatalf("идемпотентные операции: %v", got)
	}
}
