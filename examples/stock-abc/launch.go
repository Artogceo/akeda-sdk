package main

import (
	"crypto/rand"
	"encoding/base64"
	"errors"
	"fmt"
	"net/url"
	"regexp"
	"strings"
	"sync"
	"time"
)

// Запуск слота: что страница присылает серверу и чему сервер обязан не верить.
//
// ── ПОРЯДОК ─────────────────────────────────────────────────────────────────
//
//  1. Рамка загружается РАНЬШЕ выдачи токена — иначе неоткуда взять nonce,
//     который придумывает сама страница.
//  2. Страница шлёт оболочке akeda.slot.ready со своим nonce.
//  3. Оболочка отвечает akeda.slot.launch с одноразовым токеном и тем же nonce.
//  4. Страница отправляет пару сюда, на СВОЙ сервер.
//  5. Сервер гасит токен у Akeda своим токеном установки и получает контекст.
//
// Токена нет в адресе рамки намеренно: адрес попадает в журналы сервера, в
// историю браузера и в заголовок Referer, а сообщение моста не попадает никуда.
//
// ── ЧЕМУ НЕ ВЕРИМ ───────────────────────────────────────────────────────────
//
// Странице не верим ни в чём, кроме двух значений, которые она обязана
// прислать. Всё остальное — кабинет, человек, товар — берётся ИЗ ОТВЕТА Akeda
// на погашение, а не из тела запроса страницы: страница живёт в браузере, и
// поле «кабинет» в её запросе означает ровно «кабинет, который назвал браузер».
//
// Отдельно проверяется, ТУДА ЛИ пришёл запуск. Панель объявлена на карточку
// товара; запуск, приехавший с другого якоря или другого слота, означает либо
// ошибку оболочки, либо попытку открыть панель там, куда кабинет её не звал.
// Akeda проверяет это на своей стороне — и мы проверяем на своей: одна
// проверка, стоящая в одном месте, отключается одной строкой.

// Виды страниц расширения.
const (
	PagePanel    = "panel"
	PageSettings = "settings"
)

// Ключи слотов. Дословно те же, что в манифесте: разойдясь с ним, проверка
// начнёт отвергать законный запуск.
const (
	slotPanel    = "platform.embedded_panel.v1"
	slotSettings = "platform.settings_page.v1"
)

// Якорь панели: карточка товара модуля core.
const (
	anchorModule = "core"
	anchorEntity = "product"
)

var (
	// nonceShape — форма nonce из контракта. Проверяется ЗДЕСЬ, до обращения к
	// Akeda: мусор из браузера не должен уезжать в тело нашего запроса и
	// тратить единственную попытку живого токена.
	nonceShape = regexp.MustCompile(`^[A-Za-z0-9_-]{16,128}$`)
	// tokenShape — форма одноразового токена запуска.
	tokenShape = regexp.MustCompile(`^al_[0-9a-f]{64}$`)
)

// Ошибки разбора запуска. Отдельные значения, а не строки: страница показывает
// человеку разный текст на «токен не той формы» и «панель открыта не там».
var (
	ErrBadNonce      = errors.New("nonce не той формы")
	ErrBadToken      = errors.New("токен запуска не той формы")
	ErrNonceMismatch = errors.New("Akeda вернула другой nonce")
	ErrWrongSlot     = errors.New("запуск пришёл от другого слота")
	ErrWrongAnchor   = errors.New("запуск пришёл с другого экрана")
	ErrWrongOrigin   = errors.New("рамку открыли с чужого источника")
	ErrNoSession     = errors.New("сеанс страницы неизвестен или истёк")
)

// CheckLaunchInput проверяет то, что прислала страница, до обращения к Akeda.
func CheckLaunchInput(token, nonce string) error {
	if !nonceShape.MatchString(nonce) {
		return ErrBadNonce
	}
	if !tokenShape.MatchString(token) {
		return ErrBadToken
	}
	return nil
}

// VerifyLaunch сверяет погашенный запуск с тем, чего страница ждала.
//
// selfOrigin — источник, с которого раздаётся эта страница. Пустой origin в
// ответе законен: кабинет мог обновить приложение на версию без этого слота
// уже после выдачи, и обрывать живой запуск из-за этого незачем.
func VerifyLaunch(launch LaunchContext, page, nonce, selfOrigin string) error {
	if launch.Nonce != nonce {
		return ErrNonceMismatch
	}
	switch page {
	case PagePanel:
		if launch.Slot != slotPanel {
			return fmt.Errorf("%w: %s", ErrWrongSlot, launch.Slot)
		}
		if launch.Anchor.Module != anchorModule || launch.Anchor.Entity != anchorEntity || launch.Anchor.EntityID == "" {
			return fmt.Errorf("%w: %s/%s", ErrWrongAnchor, launch.Anchor.Module, launch.Anchor.Entity)
		}
	case PageSettings:
		if launch.Slot != slotSettings {
			return fmt.Errorf("%w: %s", ErrWrongSlot, launch.Slot)
		}
		if launch.Anchor.Entity != "" || launch.Anchor.EntityID != "" {
			// Страница настройки не стоит ни на какой записи, и поля записи ей
			// не передаются вовсе. Запуск с записью означает, что открыли не то.
			return fmt.Errorf("%w: %s", ErrWrongAnchor, launch.Anchor.Entity)
		}
	default:
		return fmt.Errorf("%w: %s", ErrWrongSlot, page)
	}
	if launch.Origin != "" && selfOrigin != "" && !strings.EqualFold(launch.Origin, selfOrigin) {
		return fmt.Errorf("%w: %s", ErrWrongOrigin, launch.Origin)
	}
	return nil
}

// NormalizeLocale приводит язык к тому, что умеет страница.
//
// Словарь закрыт: язык приезжает перечислением ru|en, и «взять как есть» — это
// способ однажды получить на экране ключи вместо слов.
func NormalizeLocale(locale string) string {
	if strings.EqualFold(locale, "en") {
		return "en"
	}
	return "ru"
}

// NormalizeTheme приводит тему к светлой или тёмной.
func NormalizeTheme(theme string) string {
	if strings.EqualFold(theme, "dark") {
		return "dark"
	}
	return "light"
}

// Session — открытая страница расширения.
//
// Живёт в памяти и недолго: за ней нет ничего, что стоило бы хранить, а
// восстановление стоит одного нажатия — человек открывает панель заново.
type Session struct {
	ID      string
	Page    string
	Launch  LaunchContext
	Expires time.Time
}

// ProductID — товар, на карточке которого открыли панель.
func (s Session) ProductID() string { return s.Launch.Anchor.EntityID }

// Sessions — хранилище сеансов страниц.
type Sessions struct {
	ttl   time.Duration
	now   func() time.Time
	mutex sync.Mutex
	byID  map[string]*Session
}

// NewSessions собирает хранилище.
func NewSessions(ttl time.Duration) *Sessions {
	return &Sessions{ttl: ttl, now: time.Now, byID: map[string]*Session{}}
}

// Open заводит сеанс по погашенному запуску.
func (s *Sessions) Open(page string, launch LaunchContext) (*Session, error) {
	id, err := randomID()
	if err != nil {
		return nil, err
	}
	session := &Session{
		ID:      id,
		Page:    page,
		Launch:  launch,
		Expires: s.now().Add(s.ttl),
	}
	s.mutex.Lock()
	defer s.mutex.Unlock()
	s.sweep()
	s.byID[id] = session
	return session, nil
}

// Get находит живой сеанс.
func (s *Sessions) Get(id string) (*Session, error) {
	s.mutex.Lock()
	defer s.mutex.Unlock()
	session, ok := s.byID[id]
	if !ok {
		return nil, ErrNoSession
	}
	if s.now().After(session.Expires) {
		delete(s.byID, id)
		return nil, ErrNoSession
	}
	return session, nil
}

// sweep выкидывает истёкшие. Вызывается на открытии, а не по таймеру: сеансов
// у одной установки единицы, и отдельная горутина ради них — это лишняя
// сущность, которую надо останавливать.
func (s *Sessions) sweep() {
	now := s.now()
	for id, session := range s.byID {
		if now.After(session.Expires) {
			delete(s.byID, id)
		}
	}
}

// randomID — идентификатор сеанса.
//
// Тридцать два случайных байта, а не счётчик и не хэш от чего-нибудь: по
// идентификатору сеанса читаются данные кабинета, и угадываемый идентификатор
// здесь равен открытому доступу.
func randomID() (string, error) {
	buffer := make([]byte, 32)
	if _, err := rand.Read(buffer); err != nil {
		return "", err
	}
	return base64.RawURLEncoding.EncodeToString(buffer), nil
}

// OriginOf вырезает источник из адреса.
//
// Источник — схема, хост и порт, без пути: мост оболочки адресует сообщения
// именно источнику, и путь в этом сравнении не участвует.
func OriginOf(address string) string {
	address = strings.TrimSpace(address)
	if address == "" {
		return ""
	}
	parsed, err := url.Parse(address)
	if err != nil || parsed.Scheme == "" || parsed.Host == "" {
		return ""
	}
	return parsed.Scheme + "://" + parsed.Host
}
