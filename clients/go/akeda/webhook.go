package akeda

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"strconv"
	"strings"
	"time"
)

// Проверка подписи входящей доставки.
//
// Это половина приёмника, которую нельзя списать с примера в документации:
// реализация подписи существует в трёх местах — в диспетчере Akeda, в
// опубликованном контракте snapshot/extension-delivery/v1/delivery-contract.json
// и здесь, — и расходиться им нечем: тесты пакета проверяют её теми же
// векторами, что лежат в контракте.
//
// ПОРЯДОК ПРОВЕРОК ЧАСТЬ ЗАЩИТЫ. Сначала HMAC, потом окно свежести. Обратный
// порядок дал бы тому, у кого ключа нет, различимый по ответу способ нащупать
// границу окна и подобрать момент для переигрывания перехваченного запроса.
//
// КЛЮЧ ВЫБИРАЕТСЯ ПО ИДЕНТИФИКАТОРУ, а не перебором. Перебор принял бы подпись,
// сделанную ключом, который отправитель не называл, и стёр бы единственный
// отказ, по которому видно, что приёмник остался на секрете с кончившимся
// перекрытием ротации.

const (
	// SignatureVersion входит в подписываемую строку, а не только в заголовок:
	// смена алгоритма обязана делать старую подпись недействительной.
	SignatureVersion = "v1"

	// DefaultSignatureWindow — окно свежести подписи. Двустороннее.
	DefaultSignatureWindow = 5 * time.Minute

	HeaderSignature          = "Akeda-Signature"
	HeaderSignatureKeyID     = "Akeda-Signature-Key-Id"
	HeaderSignatureTimestamp = "Akeda-Signature-Timestamp"
	HeaderInstallationID     = "Akeda-Installation-Id"
	HeaderEventID            = "Akeda-Event-Id"
)

// Причины отказа. Каждая названа отдельно: интеграцию, которая отвечает
// молчаливым 401, внешний разработчик отлаживает наугад.
var (
	ErrSignatureMissing        = errors.New("akeda: запрос без заголовков подписи")
	ErrSignatureMalformed      = errors.New("akeda: заголовки подписи не разбираются")
	ErrSignatureVersionUnknown = errors.New("akeda: неизвестная версия схемы подписи")
	ErrSignatureUnknownKey     = errors.New("akeda: подпись сделана другим ключом")
	ErrSignatureMismatch       = errors.New("akeda: подпись не сходится")
	ErrSignatureExpired        = errors.New("akeda: подпись вне временного окна")
	ErrEnvelopeInvalid         = errors.New("akeda: конверт не проходит проверку")
	ErrEventMismatch           = errors.New("akeda: заголовки подписи не совпадают с конвертом")
)

// SigningKey — секрет подписи установки и идентификатор ключа, по которому
// получатель выбирает, чем проверять.
type SigningKey struct {
	ID     string
	Secret []byte
}

// String печатает ключ без секрета — как и GoString: %v и %#v это два разных
// канала, через которые секрет попадает в лог по невнимательности.
func (k SigningKey) String() string {
	return "akeda.SigningKey{ID: " + k.ID + ", Secret: <скрыт>}"
}
func (k SigningKey) GoString() string { return k.String() }

// MarshalJSON не отдаёт секрет наружу.
func (k SigningKey) MarshalJSON() ([]byte, error) {
	return json.Marshal(struct {
		ID     string `json:"id"`
		Secret string `json:"secret"`
	}{ID: k.ID, Secret: "<скрыт>"})
}

// NewSigningKey собирает ключ из строкового секрета.
func NewSigningKey(id, secret string) SigningKey {
	return SigningKey{ID: strings.TrimSpace(id), Secret: []byte(secret)}
}

// Signature — то, что уехало в заголовках.
type Signature struct {
	Version        string
	KeyID          string
	InstallationID string
	EventID        string
	IssuedAt       time.Time
	Value          string
}

// Envelope — конверт доставки. Восемь полей обязательны, их перечисляет контракт.
type Envelope struct {
	EventID        string          `json:"event_id"`
	InstallationID string          `json:"installation_id"`
	TenantID       string          `json:"tenant_id"`
	OccurredAt     string          `json:"occurred_at"`
	SchemaVersion  int             `json:"schema_version"`
	TraceID        string          `json:"trace_id"`
	Type           string          `json:"type"`
	IdempotencyKey string          `json:"idempotency_key"`
	Payload        json.RawMessage `json:"payload,omitempty"`
}

// Validate держит список обязательных полей контракта.
func (e Envelope) Validate() error {
	missing := ""
	switch {
	case e.EventID == "":
		missing = "event_id"
	case e.InstallationID == "":
		missing = "installation_id"
	case e.TenantID == "":
		missing = "tenant_id"
	case e.OccurredAt == "":
		missing = "occurred_at"
	case e.SchemaVersion < 1:
		missing = "schema_version"
	case strings.TrimSpace(e.TraceID) == "":
		missing = "trace_id"
	case strings.TrimSpace(e.Type) == "":
		missing = "type"
	case strings.TrimSpace(e.IdempotencyKey) == "":
		missing = "idempotency_key"
	}
	if missing != "" {
		return fmt.Errorf("%w: нет обязательного поля %s", ErrEnvelopeInvalid, missing)
	}
	return nil
}

// SigningBase собирает подписываемую строку.
//
// Тело входит в неё дайджестом, а не целиком: получателю не приходится
// удерживать весь запрос в памяти, а разделитель не может встретиться внутри
// подписываемых данных и склеить два поля в одно.
func SigningBase(signature Signature, body []byte) string {
	digest := sha256.Sum256(body)
	return strings.Join([]string{
		signature.Version,
		signature.KeyID,
		strconv.FormatInt(signature.IssuedAt.Unix(), 10),
		signature.InstallationID,
		signature.EventID,
		hex.EncodeToString(digest[:]),
	}, "\n")
}

// Sign подписывает тело доставки. Нужен приёмнику для тестов и conformance-набору.
func Sign(key SigningKey, signature Signature, body []byte) string {
	if signature.Version == "" {
		signature.Version = SignatureVersion
	}
	mac := hmac.New(sha256.New, key.Secret)
	_, _ = mac.Write([]byte(SigningBase(signature, body)))
	return hex.EncodeToString(mac.Sum(nil))
}

// ParseSignature собирает подпись из заголовков. get — то, чем получатель
// читает заголовок (например http.Header.Get): пакет не знает и не должен
// знать, на каком фреймворке написан приёмник.
func ParseSignature(get func(name string) string) (Signature, error) {
	if get == nil {
		return Signature{}, ErrSignatureMissing
	}
	raw := strings.TrimSpace(get(HeaderSignature))
	if raw == "" {
		return Signature{}, ErrSignatureMissing
	}
	version, value, ok := strings.Cut(raw, "=")
	version, value = strings.TrimSpace(version), strings.TrimSpace(value)
	if !ok || version == "" || value == "" {
		return Signature{}, ErrSignatureMalformed
	}
	seconds, err := strconv.ParseInt(strings.TrimSpace(get(HeaderSignatureTimestamp)), 10, 64)
	if err != nil {
		return Signature{}, ErrSignatureMalformed
	}
	installationID := strings.TrimSpace(get(HeaderInstallationID))
	eventID := strings.TrimSpace(get(HeaderEventID))
	if installationID == "" || eventID == "" {
		return Signature{}, ErrSignatureMalformed
	}
	return Signature{
		Version:        version,
		KeyID:          strings.TrimSpace(get(HeaderSignatureKeyID)),
		InstallationID: installationID,
		EventID:        eventID,
		IssuedAt:       time.Unix(seconds, 0).UTC(),
		Value:          value,
	}, nil
}

// VerifyWebhook — полный приёмный контур: подпись, окно, разбор конверта и
// сверка его с заголовками.
//
// keys — все ДЕЙСТВУЮЩИЕ ключи установки: текущий и, пока идёт перекрытие
// ротации, предыдущий. Ротация без перекрытия невозможна: между тем моментом,
// когда Akeda завела новый секрет, и тем, когда партнёр выкатил его в свой
// приёмник, проходит ЕГО релиз.
//
// body — СЫРЫЕ БАЙТЫ запроса. Не пересобранный JSON: дайджест считается по
// тому, что пришло.
func VerifyWebhook(
	get func(name string) string,
	body []byte,
	keys []SigningKey,
	now time.Time,
	window time.Duration,
) (Envelope, Signature, error) {
	signature, err := ParseSignature(get)
	if err != nil {
		return Envelope{}, Signature{}, err
	}
	if signature.Version != SignatureVersion {
		return Envelope{}, signature, fmt.Errorf("%w: %s", ErrSignatureVersionUnknown, signature.Version)
	}

	var key SigningKey
	found := false
	for _, candidate := range keys {
		if candidate.ID != "" && len(candidate.Secret) > 0 && candidate.ID == signature.KeyID {
			key, found = candidate, true
			break
		}
	}
	if !found {
		return Envelope{}, signature, fmt.Errorf("%w: %s", ErrSignatureUnknownKey, signature.KeyID)
	}

	expected := Sign(key, signature, body)
	if !hmac.Equal([]byte(signature.Value), []byte(expected)) {
		return Envelope{}, signature, ErrSignatureMismatch
	}

	if window <= 0 {
		window = DefaultSignatureWindow
	}
	age := now.Sub(signature.IssuedAt)
	if age < 0 {
		age = -age
	}
	if age > window {
		return Envelope{}, signature, ErrSignatureExpired
	}

	var envelope Envelope
	if err := json.Unmarshal(body, &envelope); err != nil {
		return Envelope{}, signature, fmt.Errorf("%w: %v", ErrEnvelopeInvalid, err)
	}
	if err := envelope.Validate(); err != nil {
		return Envelope{}, signature, err
	}
	// Сверка обязательна: приёмник выбирает ключ и дедуплицирует повтор ПО
	// ЗАГОЛОВКАМ, до разбора тела. Если заголовок обещает одно событие, а тело
	// несёт другое, дедупликация защищает не тот факт, который приняли.
	if envelope.EventID != signature.EventID || envelope.InstallationID != signature.InstallationID {
		return Envelope{}, signature, ErrEventMismatch
	}
	return envelope, signature, nil
}
