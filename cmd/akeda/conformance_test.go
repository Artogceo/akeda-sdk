package main

import (
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/Artogceo/akeda-sdk/clients/go/akeda"
	"github.com/Artogceo/akeda-sdk/snapshot"
)

// Самопроверка набора.
//
// Набор доказывает, что приёмник правильный. Чем доказать, что прав сам набор?
// Двумя приёмниками: образцовым, который обязан пройти всё, и сломанными,
// каждый из которых обязан провалить ИМЕННО ТУ проверку, ради которой он сломан.
// Зелёный набор против приёмника, принимающего всё подряд, — это не проверка, а
// её имитация.

type referenceReceiver struct {
	keys     []akeda.SigningKey
	tenant   string
	install  string
	mutex    sync.Mutex
	applied  map[string]int
	behavior func(w http.ResponseWriter, ok bool) bool
}

func newReferenceReceiver(install, tenant, keyID, secret string) *referenceReceiver {
	return &referenceReceiver{
		keys:    []akeda.SigningKey{akeda.NewSigningKey(keyID, secret)},
		tenant:  tenant,
		install: install,
		applied: map[string]int{},
	}
}

func (r *referenceReceiver) handler() http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		// СЫРЫЕ БАЙТЫ: дайджест считается по тому, что пришло.
		body, err := io.ReadAll(io.LimitReader(request.Body, 1<<20))
		if err != nil {
			writer.WriteHeader(http.StatusBadRequest)
			return
		}
		envelope, _, err := akeda.VerifyWebhook(request.Header.Get, body, r.keys, time.Now(), 0)
		if err != nil {
			if r.behavior != nil && r.behavior(writer, false) {
				return
			}
			// Отказ ОКОНЧАТЕЛЬНЫЙ: 400, а не 500. 500 заставил бы Akeda повторить
			// подделку пятнадцать раз.
			writer.WriteHeader(http.StatusBadRequest)
			return
		}
		// Установка — принципал одного кабинета. Секрет один на все установки —
		// самая частая ошибка приёмника, и она ловится именно здесь.
		if envelope.InstallationID != r.install || envelope.TenantID != r.tenant {
			writer.WriteHeader(http.StatusForbidden)
			return
		}
		r.mutex.Lock()
		if r.applied[envelope.EventID] == 0 {
			r.applied[envelope.EventID] = 1
		}
		r.mutex.Unlock()
		if r.behavior != nil && r.behavior(writer, true) {
			return
		}
		writer.WriteHeader(http.StatusOK)
	})
}

func (r *referenceReceiver) probe() http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		r.mutex.Lock()
		count := r.applied[request.URL.Query().Get("event_id")]
		r.mutex.Unlock()
		writer.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(writer).Encode(map[string]int{"applied": count})
	})
}

func newSuite(t *testing.T, spec target) *suite {
	t.Helper()
	contract, err := snapshot.ReadDeliveryContract()
	if err != nil {
		t.Fatalf("контракт доставки: %v", err)
	}
	return &suite{target: spec, contract: contract, client: &http.Client{Timeout: 10 * time.Second}}
}

func targetFor(webhookURL, probeURL, install, tenant, keyID, secret string) target {
	return target{
		WebhookURL:     webhookURL,
		EffectProbeURL: probeURL,
		InstallationID: install,
		TenantID:       tenant,
		SigningKeyID:   keyID,
		SigningSecret:  secret,
		Topic:          "core.document.posted.v1",
		TimeoutSeconds: 5,
	}
}

const (
	testInstallation = "0199a1f0-0000-7000-8000-000000000001"
	testTenant       = "0199a1f0-0000-7000-8000-000000000003"
	testKeyID        = "whk_0123456789abcdef"
	testSecret       = "whs_00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff"
)

func TestSuitePassesAgainstReferenceReceiver(t *testing.T) {
	receiver := newReferenceReceiver(testInstallation, testTenant, testKeyID, testSecret)
	server := httptest.NewServer(receiver.handler())
	defer server.Close()
	probeServer := httptest.NewServer(receiver.probe())
	defer probeServer.Close()

	runner := newSuite(t, targetFor(server.URL, probeServer.URL, testInstallation, testTenant, testKeyID, testSecret))
	results := append(runner.accepted(), runner.rest()...)

	for _, result := range results {
		if result.Outcome == "fail" {
			t.Errorf("образцовый приёмник провалил %s: %s", result.Name, result.Detail)
		}
	}
	if len(results) < 15 {
		t.Fatalf("проверок %d, ожидалось не меньше 15", len(results))
	}
}

func TestSuiteCatchesBrokenReceivers(t *testing.T) {
	cases := []struct {
		name     string
		fails    string
		behavior func(w http.ResponseWriter, ok bool) bool
	}{
		{
			name:  "принимает всё подряд",
			fails: "signature/absent",
			behavior: func(writer http.ResponseWriter, ok bool) bool {
				writer.WriteHeader(http.StatusOK)
				return true
			},
		},
		{
			name:  "отвечает на подделку 500",
			fails: "signature/tampered-body",
			behavior: func(writer http.ResponseWriter, ok bool) bool {
				if ok {
					return false
				}
				// Повторяемый отказ: Akeda повторит подделку пятнадцать раз.
				writer.WriteHeader(http.StatusInternalServerError)
				return true
			},
		},
		{
			name:  "отвергает законный повтор",
			fails: "retry/duplicate-accepted",
			behavior: func() func(http.ResponseWriter, bool) bool {
				var mutex sync.Mutex
				seen := 0
				return func(writer http.ResponseWriter, ok bool) bool {
					if !ok {
						return false
					}
					mutex.Lock()
					seen++
					count := seen
					mutex.Unlock()
					if count > 1 {
						writer.WriteHeader(http.StatusConflict)
						return true
					}
					return false
				}
			}(),
		},
	}

	for _, testCase := range cases {
		t.Run(testCase.name, func(t *testing.T) {
			receiver := newReferenceReceiver(testInstallation, testTenant, testKeyID, testSecret)
			receiver.behavior = testCase.behavior
			server := httptest.NewServer(receiver.handler())
			defer server.Close()

			runner := newSuite(t, targetFor(server.URL, "", testInstallation, testTenant, testKeyID, testSecret))
			results := append(runner.accepted(), runner.rest()...)

			found := false
			for _, result := range results {
				if result.Name == testCase.fails && result.Outcome == "fail" {
					found = true
				}
			}
			if !found {
				t.Fatalf("проверка %s не поймала поломку %q", testCase.fails, testCase.name)
			}
		})
	}
}

func TestIdempotencySkippedWithoutProbe(t *testing.T) {
	receiver := newReferenceReceiver(testInstallation, testTenant, testKeyID, testSecret)
	server := httptest.NewServer(receiver.handler())
	defer server.Close()

	runner := newSuite(t, targetFor(server.URL, "", testInstallation, testTenant, testKeyID, testSecret))
	result := runner.idempotency(runner.target.key(), time.Now())
	// Ручки нет — проверка ПРОПУЩЕНА и пройденной не считается.
	if result.Outcome != "skip" {
		t.Fatalf("без effectProbeUrl ожидался пропуск, получено %s: %s", result.Outcome, result.Detail)
	}
}

func TestSkipsAreLoudAndCoverWhatCannotBeChecked(t *testing.T) {
	runner := newSuite(t, targetFor("https://example.test", "", testInstallation, testTenant, testKeyID, testSecret))
	names := make([]string, 0, 4)
	for _, result := range runner.skips(false) {
		if result.Outcome != "skip" {
			t.Fatalf("%s объявлен пропуском, но выдан как %s", result.Name, result.Outcome)
		}
		names = append(names, result.Name)
	}
	joined := strings.Join(names, " ")
	for _, expected := range []string{
		"launch-token/single-use", "launch-token/lifetime",
		"installation-token/rotation", "delivery/journal-and-replay",
	} {
		if !strings.Contains(joined, expected) {
			t.Fatalf("пропуск %s не объявлен: непроверяемое обязано быть названо вслух", expected)
		}
	}
}
