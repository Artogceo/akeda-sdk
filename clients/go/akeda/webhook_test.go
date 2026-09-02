package akeda_test

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
	"strings"
	"testing"
	"time"

	"github.com/Artogceo/akeda-sdk/clients/go/akeda"
	"github.com/Artogceo/akeda-sdk/snapshot"
)

// Векторы берутся ИЗ СНИМКА, а не из копии в тесте. Копия — это вторая
// реализация правды: она переживает смену алгоритма и оставляет тест зелёным
// ровно тогда, когда он обязан покраснеть.
func contract(t *testing.T) snapshot.DeliveryContract {
	t.Helper()
	parsed, err := snapshot.ReadDeliveryContract()
	if err != nil {
		t.Fatalf("контракт доставки: %v", err)
	}
	if len(parsed.Vectors) < 2 {
		t.Fatalf("векторов должно быть больше одного, получено %d", len(parsed.Vectors))
	}
	return parsed
}

func headersFor(vector snapshot.Vector, signature string) http.Header {
	if signature == "" {
		signature = vector.Signature
	}
	headers := http.Header{}
	headers.Set(akeda.HeaderSignature, akeda.SignatureVersion+"="+signature)
	headers.Set(akeda.HeaderSignatureKeyID, vector.KeyID)
	headers.Set(akeda.HeaderSignatureTimestamp, strconv.FormatInt(vector.TimestampUnix, 10))
	headers.Set(akeda.HeaderInstallationID, vector.InstallationID)
	headers.Set(akeda.HeaderEventID, vector.EventID)
	return headers
}

func signatureOf(vector snapshot.Vector) akeda.Signature {
	return akeda.Signature{
		Version:        akeda.SignatureVersion,
		KeyID:          vector.KeyID,
		InstallationID: vector.InstallationID,
		EventID:        vector.EventID,
		IssuedAt:       time.Unix(vector.TimestampUnix, 0).UTC(),
	}
}

func TestConstantsMatchPublishedContract(t *testing.T) {
	parsed := contract(t)
	if akeda.SignatureVersion != parsed.Signature.Version {
		t.Fatalf("версия подписи: %s против %s", akeda.SignatureVersion, parsed.Signature.Version)
	}
	if int(akeda.DefaultSignatureWindow/time.Second) != parsed.Signature.WindowSeconds {
		t.Fatalf("окно: %v против %d секунд", akeda.DefaultSignatureWindow, parsed.Signature.WindowSeconds)
	}
	if parsed.Signature.Algorithm != "HMAC-SHA256" {
		t.Fatalf("алгоритм: %s", parsed.Signature.Algorithm)
	}
	want := map[string]string{
		"signature":      akeda.HeaderSignature,
		"keyId":          akeda.HeaderSignatureKeyID,
		"timestamp":      akeda.HeaderSignatureTimestamp,
		"installationId": akeda.HeaderInstallationID,
		"eventId":        akeda.HeaderEventID,
	}
	for name, value := range want {
		if parsed.Signature.Headers[name] != value {
			t.Fatalf("заголовок %s: %q против %q", name, parsed.Signature.Headers[name], value)
		}
	}
}

func TestSignatureMatchesContractVectors(t *testing.T) {
	for _, vector := range contract(t).Vectors {
		got := akeda.Sign(akeda.NewSigningKey(vector.KeyID, vector.Secret), signatureOf(vector), []byte(vector.Body))
		if got != vector.Signature {
			t.Fatalf("%s: подпись %s, ожидалась %s", vector.Name, got, vector.Signature)
		}
	}
}

func TestLegitimateDeliveryAccepted(t *testing.T) {
	parsed := contract(t)
	for _, vector := range parsed.Vectors {
		keys := []akeda.SigningKey{akeda.NewSigningKey(vector.KeyID, vector.Secret)}
		envelope, signature, err := akeda.VerifyWebhook(
			headersFor(vector, "").Get, []byte(vector.Body), keys,
			time.Unix(vector.TimestampUnix, 0), 0,
		)
		if err != nil {
			t.Fatalf("%s: %v", vector.Name, err)
		}
		if envelope.EventID != vector.EventID || signature.KeyID != vector.KeyID {
			t.Fatalf("%s: конверт не тот", vector.Name)
		}
	}
}

func TestTamperedBodyRejected(t *testing.T) {
	vector := contract(t).Vectors[0]
	tampered := strings.Replace(vector.Body, `"payload":`, `"injected":true,"payload":`, 1)
	_, _, err := akeda.VerifyWebhook(
		headersFor(vector, "").Get, []byte(tampered),
		[]akeda.SigningKey{akeda.NewSigningKey(vector.KeyID, vector.Secret)},
		time.Unix(vector.TimestampUnix, 0), 0,
	)
	if !errors.Is(err, akeda.ErrSignatureMismatch) {
		t.Fatalf("ожидался ErrSignatureMismatch, получено %v", err)
	}
}

func TestWrongSecretRejected(t *testing.T) {
	vector := contract(t).Vectors[0]
	_, _, err := akeda.VerifyWebhook(
		headersFor(vector, "").Get, []byte(vector.Body),
		[]akeda.SigningKey{akeda.NewSigningKey(vector.KeyID, "whs_"+strings.Repeat("0", 64))},
		time.Unix(vector.TimestampUnix, 0), 0,
	)
	if !errors.Is(err, akeda.ErrSignatureMismatch) {
		t.Fatalf("ожидался ErrSignatureMismatch, получено %v", err)
	}
}

func TestUnknownKeyHasItsOwnReason(t *testing.T) {
	vector := contract(t).Vectors[0]
	_, _, err := akeda.VerifyWebhook(
		headersFor(vector, "").Get, []byte(vector.Body),
		[]akeda.SigningKey{akeda.NewSigningKey("whk_other", vector.Secret)},
		time.Unix(vector.TimestampUnix, 0), 0,
	)
	if !errors.Is(err, akeda.ErrSignatureUnknownKey) {
		t.Fatalf("ожидался ErrSignatureUnknownKey, получено %v", err)
	}
}

func TestRotationAcceptsAnyActiveKey(t *testing.T) {
	vector := contract(t).Vectors[0]
	keys := []akeda.SigningKey{
		akeda.NewSigningKey("whk_new", "whs_"+strings.Repeat("a", 64)),
		akeda.NewSigningKey(vector.KeyID, vector.Secret),
	}
	if _, _, err := akeda.VerifyWebhook(
		headersFor(vector, "").Get, []byte(vector.Body), keys,
		time.Unix(vector.TimestampUnix, 0), 0,
	); err != nil {
		t.Fatalf("подпись предыдущим ключом обязана проходить перекрытие ротации: %v", err)
	}
}

func TestMissingHeadersRejected(t *testing.T) {
	vector := contract(t).Vectors[0]
	_, _, err := akeda.VerifyWebhook(http.Header{}.Get, []byte(vector.Body), nil, time.Now(), 0)
	if !errors.Is(err, akeda.ErrSignatureMissing) {
		t.Fatalf("ожидался ErrSignatureMissing, получено %v", err)
	}
}

func TestUnknownVersionRejected(t *testing.T) {
	vector := contract(t).Vectors[0]
	headers := headersFor(vector, "")
	headers.Set(akeda.HeaderSignature, "v2="+vector.Signature)
	_, _, err := akeda.VerifyWebhook(
		headers.Get, []byte(vector.Body),
		[]akeda.SigningKey{akeda.NewSigningKey(vector.KeyID, vector.Secret)},
		time.Unix(vector.TimestampUnix, 0), 0,
	)
	if !errors.Is(err, akeda.ErrSignatureVersionUnknown) {
		t.Fatalf("ожидался ErrSignatureVersionUnknown, получено %v", err)
	}
}

func TestWindowIsTwoSided(t *testing.T) {
	parsed := contract(t)
	vector := parsed.Vectors[0]
	keys := []akeda.SigningKey{akeda.NewSigningKey(vector.KeyID, vector.Secret)}
	beyond := time.Duration(parsed.Signature.WindowSeconds+60) * time.Second
	for _, shift := range []time.Duration{beyond, -beyond} {
		_, _, err := akeda.VerifyWebhook(
			headersFor(vector, "").Get, []byte(vector.Body), keys,
			time.Unix(vector.TimestampUnix, 0).Add(shift), 0,
		)
		if !errors.Is(err, akeda.ErrSignatureExpired) {
			t.Fatalf("смещение %v: ожидался ErrSignatureExpired, получено %v", shift, err)
		}
	}
	edge := time.Duration(parsed.Signature.WindowSeconds) * time.Second
	if _, _, err := akeda.VerifyWebhook(
		headersFor(vector, "").Get, []byte(vector.Body), keys,
		time.Unix(vector.TimestampUnix, 0).Add(edge), 0,
	); err != nil {
		t.Fatalf("на границе окна доставка ещё принимается: %v", err)
	}
}

func TestHeaderBodyMismatchRejected(t *testing.T) {
	parsed := contract(t)
	vector, other := parsed.Vectors[0], parsed.Vectors[1]
	key := akeda.NewSigningKey(vector.KeyID, vector.Secret)
	// Подписываем ЧУЖОЙ event_id в заголовке своим ключом: подпись сойдётся,
	// потому что заголовок входит в подписываемую строку целиком.
	forged := signatureOf(vector)
	forged.EventID = other.EventID
	value := akeda.Sign(key, forged, []byte(vector.Body))
	headers := headersFor(vector, value)
	headers.Set(akeda.HeaderEventID, other.EventID)
	_, _, err := akeda.VerifyWebhook(
		headers.Get, []byte(vector.Body), []akeda.SigningKey{key},
		time.Unix(vector.TimestampUnix, 0), 0,
	)
	if !errors.Is(err, akeda.ErrEventMismatch) {
		t.Fatalf("ожидался ErrEventMismatch, получено %v", err)
	}
}

func TestEnvelopeWithoutRequiredFieldRejected(t *testing.T) {
	vector := contract(t).Vectors[0]
	key := akeda.NewSigningKey(vector.KeyID, vector.Secret)
	var raw map[string]any
	if err := json.Unmarshal([]byte(vector.Body), &raw); err != nil {
		t.Fatalf("вектор не разбирается: %v", err)
	}
	raw["trace_id"] = ""
	body, err := json.Marshal(raw)
	if err != nil {
		t.Fatalf("сборка тела: %v", err)
	}
	value := akeda.Sign(key, signatureOf(vector), body)
	_, _, err = akeda.VerifyWebhook(
		headersFor(vector, value).Get, body, []akeda.SigningKey{key},
		time.Unix(vector.TimestampUnix, 0), 0,
	)
	if !errors.Is(err, akeda.ErrEnvelopeInvalid) {
		t.Fatalf("ожидался ErrEnvelopeInvalid, получено %v", err)
	}
}

func TestSecretNeverPrinted(t *testing.T) {
	vector := contract(t).Vectors[0]
	key := akeda.NewSigningKey(vector.KeyID, vector.Secret)
	for _, printed := range []string{key.String(), key.GoString()} {
		if strings.Contains(printed, vector.Secret) {
			t.Fatalf("секрет попал в печать ключа: %s", printed)
		}
	}
	encoded, err := json.Marshal(key)
	if err != nil {
		t.Fatalf("маршалинг ключа: %v", err)
	}
	if strings.Contains(string(encoded), vector.Secret) {
		t.Fatalf("секрет попал в JSON ключа: %s", encoded)
	}
}
