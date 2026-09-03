package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

// Сквозной прогон панели: от сообщения моста до цифр на экране.
//
// Akeda здесь поддельная, но говорит формами настоящего контракта — теми же
// полями и той же схемой страниц. Проверяется не разбор JSON по отдельности, а
// то, что вся дорога сходится: погашение токена, сеанс, обход оборотов,
// остаток, класс и «на сколько хватит».

// fakeAkeda — поддельный контур. Отвечает на шесть операций, которые
// расширение зовёт, и запоминает заголовки: без Authorization и X-Tenant
// настоящий контур ответил бы отказом, а поддельный смолчал бы.
type fakeAkeda struct {
	server     *httptest.Server
	authHeader string
	tenant     string
	dayQueries int
}

func newFakeAkeda(t *testing.T) *fakeAkeda {
	t.Helper()
	fake := &fakeAkeda{}
	mux := http.NewServeMux()

	remember := func(next http.HandlerFunc) http.HandlerFunc {
		return func(w http.ResponseWriter, r *http.Request) {
			fake.authHeader = r.Header.Get("Authorization")
			fake.tenant = r.Header.Get("X-Tenant")
			next(w, r)
		}
	}
	send := func(w http.ResponseWriter, payload any) {
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(payload)
	}

	mux.HandleFunc("POST /api/v1/app/slot-launch", remember(func(w http.ResponseWriter, r *http.Request) {
		var body struct {
			Token string `json:"token"`
			Nonce string `json:"nonce"`
		}
		_ = json.NewDecoder(r.Body).Decode(&body)
		send(w, map[string]any{
			"tenant":          map[string]string{"id": "t-1", "slug": "akeda-demo"},
			"installation_id": "i-1",
			"slot":            slotPanel,
			// Nonce возвращается тот же: по нему сервер расширения связывает
			// погашенный запуск с конкретной рамкой.
			"nonce": body.Nonce,
			"actor": map[string]string{"subject": "a-1", "locale": "ru", "theme": "dark"},
			"anchor": map[string]string{
				"module": "core", "entity": "product", "entity_id": "p-steady",
			},
			"origin":      "https://stock-abc.example.test",
			"issued_at":   "2026-09-03T10:00:00Z",
			"redeemed_at": "2026-09-03T10:00:02Z",
			"audit_id":    "au-1",
		})
	}))

	mux.HandleFunc("GET /api/v1/app/config", remember(func(w http.ResponseWriter, r *http.Request) {
		send(w, map[string]any{
			"values": []map[string]any{
				{"key": keyPeriodMonths, "secret": false, "declared": true, "set": true, "value": "6"},
				{"key": keyMetric, "secret": false, "declared": true, "set": true, "value": "amount"},
			},
			"missing": []string{},
		})
	}))

	mux.HandleFunc("GET /api/v1/core/registers/stock", remember(func(w http.ResponseWriter, r *http.Request) {
		send(w, map[string]any{"key": "stock", "kind": "balance"})
	}))

	mux.HandleFunc("GET /api/v1/core/registers/stock/turnovers", remember(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Query().Get("period") == "day" {
			// Запрос про неподвижность: он идёт до сегодняшнего дня, а не по
			// окну анализа, и потому видит расход текущего месяца.
			fake.dayQueries++
			send(w, map[string]any{"count": 1, "limit": 1000, "offset": 0, "results": []map[string]any{
				turnover("2026-09-01", "p-steady", 0, 5),
			}})
			return
		}
		rows := []map[string]any{}
		for index, month := range []string{"03", "04", "05", "06", "07", "08"} {
			rows = append(rows, turnover("2026-"+month+"-01", "p-steady", 100, 10))
			if index == 0 {
				// Рваный расход: всё в одном месяце.
				rows = append(rows, turnover("2026-"+month+"-01", "p-spiky", 300, 3))
			}
		}
		send(w, map[string]any{"count": len(rows), "limit": 1000, "offset": 0, "results": rows})
	}))

	mux.HandleFunc("GET /api/v1/core/registers/stock/balance", remember(func(w http.ResponseWriter, r *http.Request) {
		send(w, map[string]any{"count": 2, "limit": 1000, "offset": 0, "results": []map[string]any{
			{"dims": map[string]any{"product": "p-steady"}, "totals": map[string]any{"qty": 30, "amount": 300}, "entry_count": 6},
			{"dims": map[string]any{"product": "p-spiky"}, "totals": map[string]any{"qty": 1, "amount": 100}, "entry_count": 1},
		}})
	}))

	mux.HandleFunc("GET /api/v1/stock/warehouses", remember(func(w http.ResponseWriter, r *http.Request) {
		send(w, map[string]any{"count": 1, "results": []map[string]any{
			{"id": "w-1", "code": "ОСН", "name": "Основной", "is_active": true},
		}})
	}))

	mux.HandleFunc("GET /api/v1/core/products/{id}", remember(func(w http.ResponseWriter, r *http.Request) {
		send(w, map[string]any{
			"id": r.PathValue("id"), "sku": "SKU-1", "name": "Гайка М6", "unit": "шт",
		})
	}))

	fake.server = httptest.NewServer(mux)
	t.Cleanup(fake.server.Close)
	return fake
}

func turnover(period, product string, amount, qty float64) map[string]any {
	return map[string]any{
		"period":      period,
		"dims":        map[string]any{"product": product},
		"incoming":    map[string]any{"qty": 0, "amount": 0},
		"outgoing":    map[string]any{"qty": qty, "amount": amount},
		"net":         map[string]any{"qty": -qty, "amount": -amount},
		"entry_count": 1,
	}
}

// newTestServer поднимает расширение против поддельной Akeda с замороженным
// календарём: окно анализа зависит от даты, и плавающее «сегодня» сделало бы
// проверку цифр невозможной.
func newTestServer(t *testing.T, fake *fakeAkeda) (*httptest.Server, *Server) {
	t.Helper()
	config := Config{
		BaseURL:      fake.server.URL,
		Tenant:       "akeda-demo",
		Token:        NewSecret(fakeToken),
		PublicURL:    "https://stock-abc.example.test",
		ShellOrigins: []string{"https://erp.akeda.ru"},
		SnapshotTTL:  time.Minute,
		SessionTTL:   time.Minute,
	}
	api, err := NewAkeda(config.BaseURL, config.Token, config.Tenant)
	if err != nil {
		t.Fatal(err)
	}
	server := NewServer(config, api, newLogger(&strings.Builder{}, config.Token))
	server.collector.now = func() time.Time {
		return time.Date(2026, time.September, 3, 12, 0, 0, 0, time.UTC)
	}
	front := httptest.NewServer(server.Handler())
	t.Cleanup(front.Close)
	return front, server
}

func openPanel(t *testing.T, front *httptest.Server) string {
	t.Helper()
	nonce := "AbCdEfGhIjKlMnOpQrSt"
	body := fmt.Sprintf(`{"token":"al_%s","nonce":%q}`, strings.Repeat("ab", 32), nonce)

	response, err := http.Post(front.URL+"/api/session/panel", "application/json", strings.NewReader(body))
	if err != nil {
		t.Fatal(err)
	}
	defer response.Body.Close()
	if response.StatusCode != http.StatusOK {
		t.Fatalf("сеанс не открылся: %d", response.StatusCode)
	}
	var payload struct {
		Session   string `json:"session"`
		Locale    string `json:"locale"`
		Theme     string `json:"theme"`
		ProductID string `json:"product_id"`
	}
	if err := json.NewDecoder(response.Body).Decode(&payload); err != nil {
		t.Fatal(err)
	}
	if payload.Theme != "dark" || payload.Locale != "ru" {
		t.Errorf("тема и язык не доехали: %+v", payload)
	}
	if payload.ProductID != "p-steady" {
		t.Errorf("товар карточки: %q", payload.ProductID)
	}
	return payload.Session
}

func TestPanelEndToEnd(t *testing.T) {
	fake := newFakeAkeda(t)
	front, _ := newTestServer(t, fake)
	session := openPanel(t, front)

	request, _ := http.NewRequest(http.MethodGet, front.URL+"/api/panel", nil)
	request.Header.Set(headerSession, session)
	response, err := http.DefaultClient.Do(request)
	if err != nil {
		t.Fatal(err)
	}
	defer response.Body.Close()
	if response.StatusCode != http.StatusOK {
		t.Fatalf("панель ответила %d", response.StatusCode)
	}

	var panel struct {
		Known         bool     `json:"known"`
		ABC           string   `json:"abc"`
		XYZ           string   `json:"xyz"`
		OnHand        float64  `json:"on_hand"`
		QtyTotal      float64  `json:"qty_total"`
		DaysOfCover   *float64 `json:"days_of_cover"`
		Dormant       bool     `json:"dormant"`
		LastIssue     string   `json:"last_issue"`
		Rank          int      `json:"rank"`
		TotalProducts int      `json:"total_products"`
		Product       struct {
			Name string `json:"name"`
		} `json:"product"`
		Window struct {
			From string `json:"from"`
			To   string `json:"to"`
		} `json:"window"`
	}
	if err := json.NewDecoder(response.Body).Decode(&panel); err != nil {
		t.Fatal(err)
	}

	if !panel.Known || panel.ABC != ClassA || panel.XYZ != ClassX {
		t.Fatalf("класс товара: %s%s (известен: %v)", panel.ABC, panel.XYZ, panel.Known)
	}
	if panel.Product.Name != "Гайка М6" {
		t.Errorf("карточка товара не прочитана: %q", panel.Product.Name)
	}
	if panel.Window.From != "2026-03-01" || panel.Window.To != "2026-08-31" {
		t.Errorf("окно %s — %s", panel.Window.From, panel.Window.To)
	}
	if panel.QtyTotal != 60 || panel.OnHand != 30 {
		t.Errorf("расход %v при остатке %v", panel.QtyTotal, panel.OnHand)
	}
	// 60 штук за 184 дня — примерно треть в день; тридцати штук хватит месяца
	// на три.
	if panel.DaysOfCover == nil || *panel.DaysOfCover < 90 || *panel.DaysOfCover > 93 {
		t.Errorf("хватит на %v дней", panel.DaysOfCover)
	}
	if panel.Dormant || panel.LastIssue != "2026-09-01" {
		t.Errorf("неподвижность: %v, последний расход %q", panel.Dormant, panel.LastIssue)
	}
	if panel.Rank != 1 || panel.TotalProducts != 2 {
		t.Errorf("место %d из %d", panel.Rank, panel.TotalProducts)
	}
	if fake.dayQueries != 1 {
		t.Errorf("запросов о неподвижности %d, ожидался один", fake.dayQueries)
	}

	// Токен установки и кабинет обязаны стоять в каждом запросе: без них
	// настоящий контур отвечает 401 и 400.
	if !strings.HasPrefix(fake.authHeader, "Bearer ai_test_") {
		t.Errorf("заголовок предъявителя: %q", fake.authHeader)
	}
	if fake.tenant != "akeda-demo" {
		t.Errorf("кабинет в заголовке: %q", fake.tenant)
	}
}

func TestPanelNeedsSession(t *testing.T) {
	fake := newFakeAkeda(t)
	front, _ := newTestServer(t, fake)

	response, err := http.Get(front.URL + "/api/panel")
	if err != nil {
		t.Fatal(err)
	}
	defer response.Body.Close()
	if response.StatusCode != http.StatusUnauthorized {
		t.Fatalf("панель без сеанса ответила %d", response.StatusCode)
	}
}

// Сеанс панели не открывает данных страницы настройки: иначе достаточно было
// бы открыть панель на карточке товара, чтобы прочитать то, на что кабинет дал
// право администратора.
func TestPanelSessionCannotReadSettings(t *testing.T) {
	fake := newFakeAkeda(t)
	front, _ := newTestServer(t, fake)
	session := openPanel(t, front)

	request, _ := http.NewRequest(http.MethodGet, front.URL+"/api/settings", nil)
	request.Header.Set(headerSession, session)
	response, err := http.DefaultClient.Do(request)
	if err != nil {
		t.Fatal(err)
	}
	defer response.Body.Close()
	if response.StatusCode != http.StatusForbidden {
		t.Fatalf("сеанс панели прочитал настройку: %d", response.StatusCode)
	}
}

// Страницы отдаются с политикой безопасности содержимого: рамку открывает
// оболочка Akeda и никто больше.
func TestPagesRefuseForeignFraming(t *testing.T) {
	fake := newFakeAkeda(t)
	front, _ := newTestServer(t, fake)

	for _, path := range []string{"/ui/panel", "/ui/settings"} {
		response, err := http.Get(front.URL + path)
		if err != nil {
			t.Fatal(err)
		}
		policy := response.Header.Get("Content-Security-Policy")
		_ = response.Body.Close()
		if !strings.Contains(policy, "frame-ancestors https://erp.akeda.ru") {
			t.Errorf("%s отдан без ограничения рамки: %q", path, policy)
		}
		if !strings.Contains(policy, "default-src 'none'") {
			t.Errorf("%s отдан без запрета внешних адресов: %q", path, policy)
		}
	}
}

func TestBootNamesShellOrigins(t *testing.T) {
	fake := newFakeAkeda(t)
	front, _ := newTestServer(t, fake)

	response, err := http.Get(front.URL + "/api/boot")
	if err != nil {
		t.Fatal(err)
	}
	defer response.Body.Close()
	var payload struct {
		Origins []string `json:"origins"`
	}
	if err := json.NewDecoder(response.Body).Decode(&payload); err != nil {
		t.Fatal(err)
	}
	// Без этого списка страница может только послать сообщение «всем», а это и
	// есть отсутствие моста.
	if len(payload.Origins) != 1 || payload.Origins[0] != "https://erp.akeda.ru" {
		t.Fatalf("источники оболочки: %v", payload.Origins)
	}
}
