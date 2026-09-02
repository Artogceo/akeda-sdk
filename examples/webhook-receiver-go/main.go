// Приёмник подписанных событий Akeda на Go.
//
// Запуск:
//
//	export AKEDA_WEBHOOK_SECRET='whs_…'      # секрет подписи установки
//	export AKEDA_WEBHOOK_KEY_ID='whk_…'      # идентификатор ключа
//	export AKEDA_INSTALLATION_ID='…'         # своя установка
//	export AKEDA_TENANT_ID='…'               # кабинет этой установки
//	go run ./examples/webhook-receiver-go     # слушает :8081
//
// Проверка (живой Akeda не нужен):
//
//	AKEDA_CONFORMANCE_SIGNING_SECRET="$AKEDA_WEBHOOK_SECRET" \
//	  go run ./cmd/akeda conformance run examples/extension/target.json
//
// ЧЕТЫРЕ ВЕЩИ, БЕЗ КОТОРЫХ ПРИЁМНИК НЕПРАВИЛЬНЫЙ, и все четыре видны ниже:
//
//  1. СЫРЫЕ БАЙТЫ. Дайджест считается по тому, что пришло; фреймворк,
//     разобравший тело до вас, ломает проверку подписи;
//  2. ОКОНЧАТЕЛЬНЫЙ ОТКАЗ. Подделка получает 4xx, а не 5xx: 5xx заставит Akeda
//     повторить её пятнадцать раз;
//  3. ПРОВЕРКА КАБИНЕТА. Подпись сошлась — это ещё не «событие моё»: у соседней
//     установки может быть тот же секрет, если издатель ошибся. Установка —
//     принципал ОДНОГО кабинета;
//  4. ИДЕМПОТЕНТНОСТЬ. Повтор — норма доставки, а не сбой; факт применяется один
//     раз на event_id, а ответ 2xx возвращается и на первую, и на все следующие.
package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/Artogceo/akeda-sdk/clients/go/akeda"
)

func main() {
	secret := os.Getenv("AKEDA_WEBHOOK_SECRET")
	keyID := os.Getenv("AKEDA_WEBHOOK_KEY_ID")
	installation := os.Getenv("AKEDA_INSTALLATION_ID")
	tenant := os.Getenv("AKEDA_TENANT_ID")
	if secret == "" || keyID == "" || installation == "" || tenant == "" {
		log.Fatal("нужны AKEDA_WEBHOOK_SECRET, AKEDA_WEBHOOK_KEY_ID, " +
			"AKEDA_INSTALLATION_ID и AKEDA_TENANT_ID")
	}

	// Ключей может быть два: во время ротации Akeda ещё подписывает предыдущим,
	// пока вы не выкатили новый. Держите оба, пока перекрытие не кончилось.
	keys := []akeda.SigningKey{akeda.NewSigningKey(keyID, secret)}
	if previousID, previous := os.Getenv("AKEDA_WEBHOOK_KEY_ID_PREVIOUS"), os.Getenv("AKEDA_WEBHOOK_SECRET_PREVIOUS"); previousID != "" && previous != "" {
		keys = append(keys, akeda.NewSigningKey(previousID, previous))
	}

	store := &appliedFacts{seen: map[string]bool{}}

	http.HandleFunc("/health", func(writer http.ResponseWriter, _ *http.Request) {
		// Живость — это 2xx в срок, и ничего больше. Ни разбора тела, ни поля
		// status: требование к форме ответа превратило бы проверку в маленький
		// собственный протокол, который реализуют неправильно ровно один раз.
		writer.WriteHeader(http.StatusOK)
	})

	http.HandleFunc("/events", func(writer http.ResponseWriter, request *http.Request) {
		if request.Method != http.MethodPost {
			writer.WriteHeader(http.StatusMethodNotAllowed)
			return
		}
		body, err := io.ReadAll(io.LimitReader(request.Body, 1<<20))
		if err != nil {
			writer.WriteHeader(http.StatusBadRequest)
			return
		}

		envelope, _, err := akeda.VerifyWebhook(request.Header.Get, body, keys, time.Now(), 0)
		if err != nil {
			// Причина в свой лог, а не в ответ: тело ответа приёмника Akeda
			// кладёт в журнал доставки как есть.
			log.Printf("доставка отклонена: %v", err)
			writer.WriteHeader(http.StatusBadRequest)
			return
		}
		if envelope.InstallationID != installation || envelope.TenantID != tenant {
			log.Printf("чужая установка %s (кабинет %s)", envelope.InstallationID, envelope.TenantID)
			writer.WriteHeader(http.StatusForbidden)
			return
		}

		if store.applyOnce(envelope.EventID) {
			log.Printf("новый факт %s: %s", envelope.EventID, envelope.Type)
			// Здесь ваша работа. Она должна укладываться в дедлайн попытки:
			// долгую — в очередь, а Akeda ответить сразу.
		} else {
			log.Printf("повтор %s — принят и проигнорирован", envelope.EventID)
		}
		writer.WriteHeader(http.StatusOK)
	})

	// Ручка отладочной сборки: отвечает, сколько раз факт был ПРИМЕНЁН.
	// В боевой сборке её быть не должно — она отвечает на вопрос «применял ли
	// ты этот факт», а такой ответ никому снаружи не положен.
	if os.Getenv("AKEDA_EFFECT_PROBE") == "1" {
		http.HandleFunc("/applied", func(writer http.ResponseWriter, request *http.Request) {
			writer.Header().Set("Content-Type", "application/json")
			_ = json.NewEncoder(writer).Encode(map[string]int{
				"applied": store.appliedCount(request.URL.Query().Get("event_id")),
			})
		})
	}

	address := ":8081"
	if custom := os.Getenv("AKEDA_RECEIVER_ADDR"); custom != "" {
		address = custom
	}
	fmt.Printf("приёмник слушает %s (POST /events, GET /health)\n", address)
	server := &http.Server{Addr: address, ReadHeaderTimeout: 5 * time.Second}
	log.Fatal(server.ListenAndServe())
}

// appliedFacts — дедупликация по event_id.
//
// В памяти она только в примере. В бою это строка в вашей базе с уникальным
// индексом по event_id, поставленная ТОЙ ЖЕ транзакцией, что и последствие
// факта: карта в памяти теряется при перезапуске, а повтор придёт и через сутки.
type appliedFacts struct {
	mutex sync.Mutex
	seen  map[string]bool
}

func (a *appliedFacts) applyOnce(eventID string) bool {
	a.mutex.Lock()
	defer a.mutex.Unlock()
	if a.seen[eventID] {
		return false
	}
	a.seen[eventID] = true
	return true
}

func (a *appliedFacts) appliedCount(eventID string) int {
	a.mutex.Lock()
	defer a.mutex.Unlock()
	if a.seen[eventID] {
		return 1
	}
	return 0
}
