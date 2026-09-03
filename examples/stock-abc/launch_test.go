package main

import (
	"encoding/json"
	"errors"
	"strings"
	"testing"
	"time"
)

// Разбор и проверка контекста запуска.
//
// Проверяется не «разбирается ли JSON», а то, ради чего проверка вообще
// написана: страница живёт в браузере, и всё, что она прислала, — это
// утверждение браузера. Единственное, чему здесь верят, — ответ Akeda на
// погашение токена, и он тоже сверяется с тем, чего страница ждала.

// Форма ответа взята из контракта (AppRuntimeSlotLaunch): если платформа
// переименует поле, тест упадёт здесь, а не показом пустой панели у клиента.
const launchPayload = `{
  "tenant": {"id": "0199a1f0-0000-7000-8000-000000000003", "slug": "akeda-demo"},
  "installation_id": "0199a1f0-0000-7000-8000-000000000001",
  "slot": "platform.embedded_panel.v1",
  "nonce": "AbCdEfGhIjKlMnOpQrStUv",
  "actor": {
    "subject": "0199a1f0-0000-7000-8000-0000000000aa",
    "locale": "en",
    "theme": "dark"
  },
  "anchor": {
    "module": "core",
    "entity": "product",
    "entity_id": "0199a1f0-0000-7000-8000-0000000000bb"
  },
  "origin": "https://abc.example.test",
  "issued_at": "2026-09-03T10:00:00Z",
  "redeemed_at": "2026-09-03T10:00:03Z",
  "audit_id": "0199a1f0-0000-7000-8000-0000000000cc"
}`

func decodeLaunch(t *testing.T) LaunchContext {
	t.Helper()
	var launch LaunchContext
	if err := json.Unmarshal([]byte(launchPayload), &launch); err != nil {
		t.Fatalf("контекст запуска не разбирается: %v", err)
	}
	return launch
}

func TestLaunchContextMatchesContractShape(t *testing.T) {
	launch := decodeLaunch(t)

	if launch.Tenant.Slug != "akeda-demo" {
		t.Errorf("кабинет %q", launch.Tenant.Slug)
	}
	if launch.Slot != slotPanel {
		t.Errorf("слот %q", launch.Slot)
	}
	if launch.Anchor.EntityID == "" {
		t.Error("товар карточки не разобрался: панели нечего показывать")
	}
	if launch.Actor.Subject == "" {
		t.Error("псевдоним человека не разобрался")
	}
	if launch.Origin != "https://abc.example.test" {
		t.Errorf("источник рамки %q", launch.Origin)
	}
}

// Человек в контексте назван ПСЕВДОНИМОМ, и другого о нём не приезжает. Тест
// сторожит не платформу, а нас: поле с именем или почтой, добавленное сюда
// «на будущее», превратилось бы в требование, которого контракт не даёт.
func TestLaunchContextCarriesNoIdentity(t *testing.T) {
	blob, err := json.Marshal(decodeLaunch(t))
	if err != nil {
		t.Fatal(err)
	}
	for _, forbidden := range []string{"user_id", "email", "name", "roles"} {
		if strings.Contains(string(blob), forbidden) {
			t.Errorf("в разобранном контексте появилось поле %q", forbidden)
		}
	}
}

func TestCheckLaunchInput(t *testing.T) {
	goodToken := "al_" + strings.Repeat("ab", 32)
	goodNonce := "AbCdEfGhIjKlMnOp"

	if err := CheckLaunchInput(goodToken, goodNonce); err != nil {
		t.Fatalf("законная пара отвергнута: %v", err)
	}
	if err := CheckLaunchInput(goodToken, "короткий"); !errors.Is(err, ErrBadNonce) {
		t.Errorf("nonce не той формы принят: %v", err)
	}
	if err := CheckLaunchInput(goodToken, "AbCdEfGhIjKlMnOp!!"); !errors.Is(err, ErrBadNonce) {
		t.Errorf("nonce с посторонним знаком принят: %v", err)
	}
	if err := CheckLaunchInput("ai_"+strings.Repeat("ab", 32), goodNonce); !errors.Is(err, ErrBadToken) {
		t.Errorf("токен установки принят вместо токена запуска: %v", err)
	}
	if err := CheckLaunchInput("al_"+strings.Repeat("AB", 32), goodNonce); !errors.Is(err, ErrBadToken) {
		t.Errorf("токен в верхнем регистре принят: форма объявлена строчной: %v", err)
	}
}

func TestVerifyLaunchAcceptsOwnPanel(t *testing.T) {
	launch := decodeLaunch(t)
	if err := VerifyLaunch(launch, PagePanel, launch.Nonce, "https://abc.example.test"); err != nil {
		t.Fatalf("свой запуск отвергнут: %v", err)
	}
}

// Чужой nonce означает, что странице подсунули ответ на не её запрос.
func TestVerifyLaunchRejectsForeignNonce(t *testing.T) {
	launch := decodeLaunch(t)
	if err := VerifyLaunch(launch, PagePanel, "AnotherNonceValue00", ""); !errors.Is(err, ErrNonceMismatch) {
		t.Fatalf("чужой nonce принят: %v", err)
	}
}

// Панель объявлена на карточку товара. Запуск с карточки сделки означает, что
// панель открыли там, куда кабинет её не звал, — и она получила бы контекст
// записи, о которой её не спрашивали.
func TestVerifyLaunchRejectsForeignAnchor(t *testing.T) {
	launch := decodeLaunch(t)
	launch.Anchor.Module = "crm"
	launch.Anchor.Entity = "deal"

	if err := VerifyLaunch(launch, PagePanel, launch.Nonce, ""); !errors.Is(err, ErrWrongAnchor) {
		t.Fatalf("запуск с чужого экрана принят: %v", err)
	}
}

func TestVerifyLaunchRejectsPanelWithoutRecord(t *testing.T) {
	launch := decodeLaunch(t)
	launch.Anchor.EntityID = ""

	if err := VerifyLaunch(launch, PagePanel, launch.Nonce, ""); !errors.Is(err, ErrWrongAnchor) {
		t.Fatalf("панель без записи принята: показывать было бы нечего: %v", err)
	}
}

// Страница настройки не стоит ни на какой записи, и полей записи ей не
// передают вовсе.
func TestVerifyLaunchRejectsSettingsWithRecord(t *testing.T) {
	launch := decodeLaunch(t)
	launch.Slot = slotSettings

	if err := VerifyLaunch(launch, PageSettings, launch.Nonce, ""); !errors.Is(err, ErrWrongAnchor) {
		t.Fatalf("страница настройки принята вместе с записью: %v", err)
	}
}

func TestVerifyLaunchRejectsWrongSlot(t *testing.T) {
	launch := decodeLaunch(t)
	if err := VerifyLaunch(launch, PageSettings, launch.Nonce, ""); err == nil {
		t.Fatal("запуск панели открыл страницу настройки")
	}
	launch.Slot = "platform.context_action.v1"
	if err := VerifyLaunch(launch, PagePanel, launch.Nonce, ""); !errors.Is(err, ErrWrongSlot) {
		t.Fatalf("запуск другого слота принят: %v", err)
	}
}

func TestVerifyLaunchChecksOrigin(t *testing.T) {
	launch := decodeLaunch(t)
	if err := VerifyLaunch(launch, PagePanel, launch.Nonce, "https://other.example.test"); !errors.Is(err, ErrWrongOrigin) {
		t.Fatalf("рамка с чужого источника принята: %v", err)
	}
	// Пустой источник в ответе законен: кабинет мог обновить приложение на
	// версию без этого слота уже после выдачи, и обрывать живой запуск незачем.
	launch.Origin = ""
	if err := VerifyLaunch(launch, PagePanel, launch.Nonce, "https://abc.example.test"); err != nil {
		t.Fatalf("пустой источник отвергнут: %v", err)
	}
}

func TestSessionsLifecycle(t *testing.T) {
	sessions := NewSessions(time.Minute)
	now := time.Date(2026, time.September, 3, 12, 0, 0, 0, time.UTC)
	sessions.now = func() time.Time { return now }

	session, err := sessions.Open(PagePanel, decodeLaunch(t))
	if err != nil {
		t.Fatal(err)
	}
	if len(session.ID) < 32 {
		t.Fatalf("идентификатор сеанса короток: %d знаков", len(session.ID))
	}
	if session.ProductID() == "" {
		t.Fatal("сеанс потерял товар карточки")
	}

	if _, err := sessions.Get(session.ID); err != nil {
		t.Fatalf("живой сеанс не найден: %v", err)
	}
	if _, err := sessions.Get("подставной"); !errors.Is(err, ErrNoSession) {
		t.Fatalf("неизвестный сеанс принят: %v", err)
	}

	now = now.Add(2 * time.Minute)
	if _, err := sessions.Get(session.ID); !errors.Is(err, ErrNoSession) {
		t.Fatalf("истёкший сеанс принят: %v", err)
	}
}

func TestSessionIDsDiffer(t *testing.T) {
	sessions := NewSessions(time.Minute)
	first, err := sessions.Open(PagePanel, decodeLaunch(t))
	if err != nil {
		t.Fatal(err)
	}
	second, err := sessions.Open(PagePanel, decodeLaunch(t))
	if err != nil {
		t.Fatal(err)
	}
	if first.ID == second.ID {
		t.Fatal("два сеанса получили один идентификатор")
	}
}

func TestNormalizeLocaleAndTheme(t *testing.T) {
	cases := map[string]string{"en": "en", "EN": "en", "ru": "ru", "": "ru", "de": "ru"}
	for input, want := range cases {
		if got := NormalizeLocale(input); got != want {
			t.Errorf("язык %q превратился в %q, ожидалось %q", input, got, want)
		}
	}
	if NormalizeTheme("dark") != "dark" || NormalizeTheme("DARK") != "dark" {
		t.Error("тёмная тема не распознана")
	}
	if NormalizeTheme("") != "light" || NormalizeTheme("neon") != "light" {
		t.Error("неизвестная тема обязана становиться светлой, а не пустой")
	}
}

func TestOriginOf(t *testing.T) {
	cases := map[string]string{
		"https://abc.example.test/ui/panel": "https://abc.example.test",
		"https://abc.example.test:8443":     "https://abc.example.test:8443",
		"abc.example.test":                  "",
		"":                                  "",
	}
	for input, want := range cases {
		if got := OriginOf(input); got != want {
			t.Errorf("источник из %q — %q, ожидалось %q", input, got, want)
		}
	}
}
