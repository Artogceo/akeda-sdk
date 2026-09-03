package main

import (
	"embed"
	"encoding/json"
	"errors"
	"io/fs"
	"log"
	"math"
	"net/http"
	"strings"
	"time"

	"github.com/Artogceo/akeda-sdk/clients/go/akeda"
)

//go:embed web
var webFiles embed.FS

// HTTP-поверхность расширения.
//
// Дверей ровно столько, сколько нужно, и каждая объявлена в манифесте либо
// нужна странице:
//
//	GET  /healthz             — адрес здоровья из манифеста;
//	POST /events              — адрес доставки из манифеста (подписок нет);
//	GET  /ui/panel            — панель на карточке товара;
//	GET  /ui/settings         — страница настройки установки;
//	GET  /static/…            — стили и скрипты страниц, свои, без CDN;
//	GET  /api/boot            — источники оболочки, которым страница отвечает;
//	POST /api/session/{page}  — обмен токена запуска на сеанс страницы;
//	GET  /api/panel           — данные панели;
//	GET  /api/settings        — данные страницы настройки.
//
// Ни одной операции записи ни в Akeda, ни у себя: расширение только читает.

// headerSession — имя заголовка сеанса.
//
// Заголовок, а не кука. Страница живёт в рамке на чужом источнике, то есть
// кука у неё сторонняя: браузеры её режут по умолчанию, и «панель работает у
// меня и не работает у клиента» разбиралось бы неделю. Идентификатор сеанса
// живёт в памяти вкладки и уходит заголовком.
const headerSession = "X-Akeda-Session"

// Server — состояние службы.
type Server struct {
	config    Config
	api       *Akeda
	collector *Collector
	cache     *Cache
	sessions  *Sessions
	log       *log.Logger
}

// NewServer собирает службу.
func NewServer(config Config, api *Akeda, logger *log.Logger) *Server {
	collector := NewCollector(api)
	return &Server{
		config:    config,
		api:       api,
		collector: collector,
		cache:     NewCache(collector, config.SnapshotTTL),
		sessions:  NewSessions(config.SessionTTL),
		log:       logger,
	}
}

// Handler собирает маршруты.
func (s *Server) Handler() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /healthz", s.health)
	mux.HandleFunc("POST /events", s.events)
	mux.HandleFunc("GET /ui/panel", s.page(PagePanel))
	mux.HandleFunc("GET /ui/settings", s.page(PageSettings))
	mux.HandleFunc("GET /api/boot", s.boot)
	mux.HandleFunc("POST /api/session/{page}", s.openSession)
	mux.HandleFunc("GET /api/panel", s.panelData)
	mux.HandleFunc("GET /api/settings", s.settingsData)

	assets, err := fs.Sub(webFiles, "web")
	if err != nil {
		// Файлы вшиты в бинарь директивой embed: подкаталог не может
		// отсутствовать иначе как при поломке сборки.
		panic(err)
	}
	mux.Handle("GET /static/", http.StripPrefix("/static/", s.staticHandler(http.FS(assets))))
	return mux
}

func (s *Server) staticHandler(files http.FileSystem) http.Handler {
	server := http.FileServer(files)
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Cache-Control", "public, max-age=300")
		server.ServeHTTP(w, r)
	})
}

func (s *Server) health(w http.ResponseWriter, r *http.Request) {
	// Здоровье не ходит в Akeda: адрес здоровья отвечает на вопрос «жив ли
	// сервер приложения», и превратив его в проверку чужого контура, мы
	// научились бы гасить своё приложение чужой аварией.
	writeJSON(w, http.StatusOK, map[string]any{
		"status": "ok",
		"app":    "app.akeda.stock-abc",
	})
}

func (s *Server) events(w http.ResponseWriter, r *http.Request) {
	// Адрес доставки объявлен потому, что hosted-приложение обязано его
	// назвать: без него платформе некуда везти события. Подписок у этого
	// расширения нет ни одной — оно читает по запросу человека и ничего не
	// ждёт, — поэтому сюда ничего не приезжает.
	//
	// Отвечаем 204, а не 404: приёмник по объявленному адресу обязан
	// существовать, иначе проверка доставки объявит приложение сломанным.
	// Подпись не проверяется, потому что и применять нечего: тело ни на что не
	// влияет и никуда не записывается.
	//
	// В журнал не уезжает ни одного поля запроса — ни темы события, ни
	// заголовка: адрес открыт наружу, а перевод строки в чужом значении
	// подделывает соседнюю строку журнала.
	s.log.Print("на /events пришло событие, хотя подписок у приложения нет")
	w.WriteHeader(http.StatusNoContent)
}

func (s *Server) boot(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]any{"origins": s.config.ShellOrigins})
}

// page отдаёт HTML страницы.
func (s *Server) page(kind string) http.HandlerFunc {
	name := "web/panel.html"
	if kind == PageSettings {
		name = "web/settings.html"
	}
	body, err := webFiles.ReadFile(name)
	if err != nil {
		panic(err)
	}
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.Header().Set("X-Content-Type-Options", "nosniff")
		// Рамку открывает оболочка Akeda и никто больше. frame-ancestors — то
		// единственное, чем страница может это потребовать сама: без него её
		// можно вложить в чужой сайт и показать человеку данные его кабинета в
		// чужой обёртке.
		w.Header().Set("Content-Security-Policy", strings.Join([]string{
			"default-src 'none'",
			"style-src 'self'",
			"script-src 'self'",
			"connect-src 'self'",
			"img-src 'self' data:",
			"base-uri 'none'",
			"form-action 'none'",
			"frame-ancestors " + strings.Join(s.config.ShellOrigins, " "),
		}, "; "))
		w.Header().Set("Cache-Control", "no-store")
		_, _ = w.Write(body)
	}
}

// openSession гасит токен запуска и заводит сеанс страницы.
func (s *Server) openSession(w http.ResponseWriter, r *http.Request) {
	page := r.PathValue("page")
	if page != PagePanel && page != PageSettings {
		writeFail(w, http.StatusNotFound, "unknown_page", "такой страницы у расширения нет")
		return
	}
	var body struct {
		Token string `json:"token"`
		Nonce string `json:"nonce"`
	}
	if err := json.NewDecoder(http.MaxBytesReader(w, r.Body, 4096)).Decode(&body); err != nil {
		writeFail(w, http.StatusBadRequest, "bad_request", "тело запроса не разбирается")
		return
	}
	if err := CheckLaunchInput(body.Token, body.Nonce); err != nil {
		// Мусор из браузера дальше не едет: у живого токена ровно одна
		// попытка, и тратить её на заведомо негодное значение нельзя.
		writeFail(w, http.StatusBadRequest, "bad_launch", err.Error())
		return
	}

	launch, err := s.api.RedeemSlotLaunch(r.Context(), body.Token, body.Nonce)
	if err != nil {
		s.failUpstream(w, err, "погашение токена запуска")
		return
	}
	if err := VerifyLaunch(launch, page, body.Nonce, s.config.SelfOrigin()); err != nil {
		// Запуск погашен и уже потрачен, но принять его нельзя: он приехал не
		// от того слота или не с того экрана. Молчать об этом опаснее, чем
		// показать отказ, — иначе панель показала бы данные, о которых её не
		// спрашивали.
		s.log.Printf("запуск отвергнут: %v", err)
		writeFail(w, http.StatusForbidden, "launch_rejected", err.Error())
		return
	}

	session, err := s.sessions.Open(page, launch)
	if err != nil {
		writeFail(w, http.StatusInternalServerError, "internal", "не удалось завести сеанс страницы")
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"session": session.ID,
		"page":    page,
		"locale":  NormalizeLocale(launch.Actor.Locale),
		"theme":   NormalizeTheme(launch.Actor.Theme),
		"tenant":  launch.Tenant.Slug,
		// Псевдоним человека — единственное, что расширение о нём знает.
		// Показывать его не для красоты: панель помнит по нему выбор
		// конкретного сотрудника, если такой выбор появится.
		"actor":      launch.Actor.Subject,
		"product_id": launch.Anchor.EntityID,
	})
}

// session достаёт сеанс из заголовка.
func (s *Server) session(w http.ResponseWriter, r *http.Request, page string) (*Session, bool) {
	session, err := s.sessions.Get(strings.TrimSpace(r.Header.Get(headerSession)))
	if err != nil {
		writeFail(w, http.StatusUnauthorized, "no_session", "сеанс страницы неизвестен или истёк")
		return nil, false
	}
	if session.Page != page {
		// Сеанс панели не открывает данные страницы настройки и наоборот:
		// иначе достаточно было бы открыть панель на карточке товара, чтобы
		// прочитать то, на что кабинет дал право администратора.
		writeFail(w, http.StatusForbidden, "wrong_page", "сеанс заведён для другой страницы")
		return nil, false
	}
	return session, true
}

func (s *Server) panelData(w http.ResponseWriter, r *http.Request) {
	session, ok := s.session(w, r, PagePanel)
	if !ok {
		return
	}
	snapshot, err := s.cache.Get(r.Context())
	if err != nil {
		s.failUpstream(w, err, "сбор оборотов склада")
		return
	}
	product, err := s.api.Product(r.Context(), session.ProductID())
	if err != nil {
		s.failUpstream(w, err, "карточка номенклатуры")
		return
	}
	lastIssue, err := s.collector.LastIssueOf(r.Context(), snapshot, session.ProductID())
	if err != nil {
		s.failUpstream(w, err, "последний расход товара")
		return
	}

	result, known := snapshot.ByProduct[session.ProductID()]
	rank := 0
	for index := range snapshot.Results {
		if snapshot.Results[index].Product == session.ProductID() {
			rank = index + 1
			break
		}
	}
	onHand := snapshot.OnHand[session.ProductID()]

	payload := map[string]any{
		"product":        product,
		"known":          known,
		"metric":         snapshot.Settings.Metric,
		"window":         windowPayload(snapshot.Window),
		"built_at":       snapshot.BuiltAt.UTC().Format(time.RFC3339),
		"on_hand":        onHand,
		"days_of_cover":  daysOfCover(onHand, result.QtyTotal, snapshot.Window.Days),
		"dormant":        lastIssue.Dormant,
		"last_issue":     lastIssue.Date,
		"dead_days":      lastIssue.Since,
		"rank":           rank,
		"total_products": len(snapshot.Results),
		"warehouses":     warehouseNames(snapshot.Warehouses),
	}
	if known {
		payload["abc"] = result.ABC
		payload["xyz"] = result.XYZ
		payload["value"] = result.Value
		payload["share_percent"] = result.Share
		payload["cumulative_percent"] = result.CumulativeShare
		payload["variation_percent"] = result.CV
		payload["qty_total"] = result.QtyTotal
		payload["qty_per_period"] = result.QtyPerPeriod
		payload["periods"] = result.Periods
	}
	writeJSON(w, http.StatusOK, payload)
}

func (s *Server) settingsData(w http.ResponseWriter, r *http.Request) {
	if _, ok := s.session(w, r, PageSettings); !ok {
		return
	}
	snapshot, err := s.cache.Get(r.Context())
	if err != nil {
		s.failUpstream(w, err, "сбор оборотов склада")
		return
	}
	all, err := s.api.Warehouses(r.Context())
	if err != nil {
		s.failUpstream(w, err, "справочник складов")
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"settings":     snapshot.Settings,
		"thresholds":   snapshot.Settings.Values(),
		"issues":       snapshot.Settings.Issues,
		"missing":      snapshot.MissingConfig,
		"window":       windowPayload(snapshot.Window),
		"distribution": snapshot.Distribution,
		"built_at":     snapshot.BuiltAt.UTC().Format(time.RFC3339),
		"warehouses": map[string]any{
			"all":      all,
			"selected": snapshot.Warehouses,
			"unknown":  snapshot.UnknownCodes,
		},
	})
}

// failUpstream переводит отказ Akeda в ответ странице.
//
// Идентификатор случая передаётся человеку намеренно: причины отказа в теле
// Akeda нет и не будет — ни SQL, ни трассы, — и в поддержку несут именно его.
func (s *Server) failUpstream(w http.ResponseWriter, err error, what string) {
	var apiErr *akeda.APIError
	if errors.As(err, &apiErr) {
		s.log.Printf("%s: отказ Akeda %d %s (случай %s)", what, apiErr.Status, apiErr.Code, apiErr.RequestID)
		status := http.StatusBadGateway
		if apiErr.Status == http.StatusForbidden || apiErr.Status == http.StatusNotFound {
			status = apiErr.Status
		}
		writeJSON(w, status, map[string]any{
			"code":       "upstream",
			"status":     apiErr.Status,
			"upstream":   apiErr.Code,
			"detail":     apiErr.Detail,
			"request_id": apiErr.RequestID,
		})
		return
	}
	s.log.Printf("%s: %v", what, err)
	writeFail(w, http.StatusBadGateway, "upstream", "Akeda не ответила так, как ожидалось")
}

func windowPayload(window Window) map[string]any {
	return map[string]any{
		"from":    window.FromISO(),
		"to":      window.ToISO(),
		"periods": window.Periods,
		"days":    window.Days,
	}
}

func warehouseNames(warehouses []Warehouse) []string {
	names := make([]string, 0, len(warehouses))
	for _, warehouse := range warehouses {
		names = append(names, warehouse.Name)
	}
	return names
}

// daysOfCover — на сколько дней хватит остатка при среднем расходе окна.
//
// Возвращает указатель: «хватит навсегда» и «хватит на ноль дней» — разные
// ответы, и ноль вместо «расхода не было» прочитался бы как «кончилось».
func daysOfCover(onHand, qtyPerWindow float64, windowDays int) *float64 {
	if qtyPerWindow <= 0 || windowDays <= 0 || onHand <= 0 {
		return nil
	}
	perDay := qtyPerWindow / float64(windowDays)
	if perDay <= 0 {
		return nil
	}
	days := onHand / perDay
	if math.IsInf(days, 0) || math.IsNaN(days) {
		return nil
	}
	return &days
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.Header().Set("Cache-Control", "no-store")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

func writeFail(w http.ResponseWriter, status int, code, detail string) {
	writeJSON(w, status, map[string]any{"code": code, "detail": detail})
}
