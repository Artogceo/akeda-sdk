package main

import (
	"bytes"
	"context"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/Artogceo/akeda-sdk/clients/go/akeda"
	"github.com/Artogceo/akeda-sdk/snapshot"
)

// Conformance-набор приёмника событий.
//
// КАК ОН ДОСТАЁТ ЧУЖОЙ КОД. Контракт доставки идёт в одну сторону: Akeda —
// клиент, расширение — сервер. Значит проверить приёмник можно, ничего не
// поднимая у Akeda: набор САМ становится диспетчером и бьёт по приёмнику
// разработчика теми же байтами, что уедут в бою.
//
// Живой контур здесь не только не нужен, но и вреден: прогон против стенда
// проверял бы заодно нашу сеть, наши квоты и наш журнал — то есть то, за что
// разработчик не отвечает и чего не может починить. Красный набор перестал бы
// означать «почини свой приёмник». ЭТО ЖЕ ОТВЕЧАЕТ НА ВОПРОС «против чего
// проверено»: против приёмника разработчика, и только.
//
// ОТКАЗ ОБЯЗАН БЫТЬ ОКОНЧАТЕЛЬНЫМ. Приёмник, отвечающий на подделку 500,
// заставляет Akeda повторить подделку пятнадцать раз; приёмник, отвечающий
// 2xx, её принял. Половина каждого правила подписи — именно это.

const conformanceSecretEnv = "AKEDA_CONFORMANCE_SIGNING_SECRET"

type target struct {
	WebhookURL string `json:"webhookUrl"`
	// EffectProbeURL — НЕОБЯЗАТЕЛЬНАЯ ручка отладочной сборки расширения,
	// отвечающая на GET ?event_id=… телом {"applied": N}. Без неё
	// идемпотентность потребителя снаружи непроверяема.
	EffectProbeURL string `json:"effectProbeUrl,omitempty"`

	InstallationID string `json:"installationId"`
	TenantID       string `json:"tenantId"`
	SigningKeyID   string `json:"signingKeyId"`
	// SigningSecret можно не хранить в файле: значение читается из окружения.
	SigningSecret string `json:"signingSecret,omitempty"`

	ForeignInstallationID string `json:"foreignInstallationId,omitempty"`
	ForeignTenantID       string `json:"foreignTenantId,omitempty"`
	ForeignSigningKeyID   string `json:"foreignSigningKeyId,omitempty"`
	ForeignSigningSecret  string `json:"foreignSigningSecret,omitempty"`

	Topic          string `json:"topic,omitempty"`
	TimeoutSeconds int    `json:"timeoutSeconds,omitempty"`
}

type checkResult struct {
	Name    string `json:"name"`
	Outcome string `json:"outcome"` // pass, fail, skip
	Detail  string `json:"detail"`
}

func commandReceiver(options globals, args []string) error {
	if len(args) < 2 || args[0] != "check" {
		return fmt.Errorf("использование: akeda receiver check <файл описания>")
	}
	return runSuite(options, args[1], true)
}

func commandConformance(options globals, args []string) error {
	if len(args) < 2 || args[0] != "run" {
		return fmt.Errorf("использование: akeda conformance run <файл описания>")
	}
	return runSuite(options, args[1], false)
}

func runSuite(options globals, path string, quick bool) error {
	spec, err := loadTarget(path)
	if err != nil {
		return err
	}
	contract, err := snapshot.ReadDeliveryContract()
	if err != nil {
		return err
	}

	runner := &suite{
		target:   spec,
		contract: contract,
		client:   &http.Client{Timeout: spec.deadline() + 5*time.Second},
	}

	results := runner.accepted()
	if !quick {
		results = append(results, runner.rest()...)
	}
	results = append(results, runner.skips(quick)...)

	failed := 0
	for _, result := range results {
		if result.Outcome == "fail" {
			failed++
		}
	}

	if options.asJSON {
		if err := printJSON(map[string]any{
			"target":   spec.WebhookURL,
			"checks":   results,
			"failed":   failed,
			"passed":   len(results) - failed,
			"contract": contract.Signature.Version,
		}); err != nil {
			return err
		}
	} else {
		fmt.Printf("приёмник: %s\n", spec.WebhookURL)
		fmt.Printf("контракт доставки: подпись %s, окно %d с, дедлайн попытки %d с\n\n",
			contract.Signature.Version, contract.Signature.WindowSeconds,
			contract.Delivery.RequestTimeoutSeconds)
		for _, result := range results {
			marker := map[string]string{"pass": "✓", "fail": "✗", "skip": "·"}[result.Outcome]
			fmt.Printf("%s %-42s %s\n", marker, result.Name, result.Detail)
		}
		fmt.Printf("\nпройдено %d, отказов %d\n", len(results)-failed, failed)
		fmt.Println()
		fmt.Println("Набор бил по вашему приёмнику и ни разу не обращался к Akeda: живой контур")
		fmt.Println("ему не нужен и вреден — он проверял бы нашу сеть, а не ваш код.")
	}

	// Пропуски код возврата не меняют: пропуск — это честное «снаружи не
	// проверяется», а не отказ.
	if failed > 0 {
		os.Exit(1)
	}
	return nil
}

func loadTarget(path string) (target, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return target{}, fmt.Errorf("описание расширения: %w", err)
	}
	var spec target
	if err := json.Unmarshal(data, &spec); err != nil {
		return target{}, fmt.Errorf("описание не разбирается: %w", err)
	}
	// СЕКРЕТА В АРГУМЕНТАХ КОМАНДЫ НЕТ И НЕ БУДЕТ: argv виден через ps.
	// Окружение важнее файла — файл кладут в репозиторий чаще, чем хотелось бы.
	if fromEnv := os.Getenv(conformanceSecretEnv); fromEnv != "" {
		spec.SigningSecret = fromEnv
	}
	if spec.WebhookURL == "" {
		return target{}, fmt.Errorf("в описании нет webhookUrl")
	}
	if _, err := url.Parse(spec.WebhookURL); err != nil {
		return target{}, fmt.Errorf("webhookUrl не разбирается: %w", err)
	}
	if spec.SigningSecret == "" {
		return target{}, fmt.Errorf(
			"нет секрета подписи: положите его в %s либо в поле signingSecret файла с правами 600",
			conformanceSecretEnv)
	}
	if spec.SigningKeyID == "" || spec.InstallationID == "" || spec.TenantID == "" {
		return target{}, fmt.Errorf("нужны signingKeyId, installationId и tenantId")
	}
	if spec.Topic == "" {
		spec.Topic = "core.document.posted.v1"
	}
	return spec, nil
}

// deadline — срок, за который приёмник обязан ответить. Строгейшее из
// объявленного расширением и потолка платформы: объявить в манифесте шестьдесят
// секунд можно, но попытку всё равно обрывает дедлайн Akeda.
func (t target) deadline() time.Duration {
	declared := time.Duration(t.TimeoutSeconds) * time.Second
	platform := 10 * time.Second
	if declared <= 0 || declared > platform {
		return platform
	}
	return declared
}

func (t target) key() akeda.SigningKey {
	return akeda.NewSigningKey(t.SigningKeyID, t.SigningSecret)
}

// foreign — чужая установка для проверки изоляции. Настоящая чужая установка
// инструменту недоступна и не должна быть доступна, поэтому она выдумывается.
func (t target) foreign() (installation, tenant, keyID, secret string) {
	installation = orElse(t.ForeignInstallationID, randomUUID())
	tenant = orElse(t.ForeignTenantID, randomUUID())
	keyID = orElse(t.ForeignSigningKeyID, "whk_"+randomHex(8))
	secret = orElse(t.ForeignSigningSecret, "whs_"+randomHex(32))
	return
}

// eventType и schemaVersion разбирают тему вида core.document.posted.v1: версия
// схемы живёт в имени темы, а в конверте — отдельным полем.
func (t target) eventType() (string, int) {
	index := strings.LastIndex(t.Topic, ".v")
	if index <= 0 {
		return t.Topic, 1
	}
	version, err := strconv.Atoi(t.Topic[index+2:])
	if err != nil || version < 1 {
		return t.Topic, 1
	}
	return t.Topic[:index], version
}

type suite struct {
	target   target
	contract snapshot.DeliveryContract
	client   *http.Client
}

type envelopeOverrides struct {
	EventID        string
	InstallationID string
	TenantID       string
	Type           string
}

func (s *suite) envelope(overrides envelopeOverrides) ([]byte, string) {
	eventType, schemaVersion := s.target.eventType()
	if overrides.Type != "" {
		eventType = overrides.Type
	}
	eventID := orElse(overrides.EventID, randomUUID())
	envelope := map[string]any{
		"event_id":        eventID,
		"installation_id": orElse(overrides.InstallationID, s.target.InstallationID),
		"tenant_id":       orElse(overrides.TenantID, s.target.TenantID),
		"occurred_at":     time.Now().UTC().Format(time.RFC3339),
		"schema_version":  schemaVersion,
		"trace_id":        randomHex(16),
		"type":            eventType,
		"idempotency_key": eventID,
		"payload":         map[string]any{},
	}
	body, _ := json.Marshal(envelope)
	return body, eventID
}

type attempt struct {
	status  int
	elapsed time.Duration
	err     error
}

func (s *suite) deliver(body []byte, headers map[string]string) attempt {
	ctx, cancel := context.WithTimeout(context.Background(), s.target.deadline()+5*time.Second)
	defer cancel()
	request, err := http.NewRequestWithContext(ctx, http.MethodPost, s.target.WebhookURL, bytes.NewReader(body))
	if err != nil {
		return attempt{err: err}
	}
	request.Header.Set("Content-Type", "application/json")
	for name, value := range headers {
		request.Header.Set(name, value)
	}
	started := time.Now()
	response, err := s.client.Do(request)
	elapsed := time.Since(started)
	if err != nil {
		return attempt{elapsed: elapsed, err: err}
	}
	_, _ = io.Copy(io.Discard, io.LimitReader(response.Body, 1<<16))
	_ = response.Body.Close()
	return attempt{status: response.StatusCode, elapsed: elapsed}
}

func (s *suite) signedHeaders(key akeda.SigningKey, body []byte, signature akeda.Signature) map[string]string {
	value := akeda.Sign(key, signature, body)
	return map[string]string{
		akeda.HeaderSignature:          signature.Version + "=" + value,
		akeda.HeaderSignatureKeyID:     signature.KeyID,
		akeda.HeaderSignatureTimestamp: strconv.FormatInt(signature.IssuedAt.Unix(), 10),
		akeda.HeaderInstallationID:     signature.InstallationID,
		akeda.HeaderEventID:            signature.EventID,
	}
}

func (s *suite) signatureFor(eventID, installationID string, issuedAt time.Time, keyID string) akeda.Signature {
	return akeda.Signature{
		Version:        akeda.SignatureVersion,
		KeyID:          keyID,
		InstallationID: installationID,
		EventID:        eventID,
		IssuedAt:       issuedAt,
	}
}

func (s *suite) accepted() []checkResult {
	body, eventID := s.envelope(envelopeOverrides{})
	signature := s.signatureFor(eventID, s.target.InstallationID, time.Now(), s.target.SigningKeyID)
	outcome := s.deliver(body, s.signedHeaders(s.target.key(), body, signature))

	results := []checkResult{expectAccepted(
		"signature/accepted", outcome,
		"без неё остальное не значит ничего: приёмник, отвергающий всё, выглядит безупречно защищённым")}

	deadline := s.target.deadline()
	switch {
	case outcome.err != nil:
		results = append(results, checkResult{
			Name: "delivery/answer-within-deadline", Outcome: "fail",
			Detail: "ответа нет: " + outcome.err.Error()})
	case outcome.elapsed > deadline:
		results = append(results, checkResult{
			Name: "delivery/answer-within-deadline", Outcome: "fail",
			Detail: fmt.Sprintf("ответ за %s при дедлайне %s: оборванная попытка тратит одну из %d",
				outcome.elapsed.Round(time.Millisecond), deadline, s.contract.Delivery.MaxAttempts)})
	default:
		results = append(results, checkResult{
			Name: "delivery/answer-within-deadline", Outcome: "pass",
			Detail: fmt.Sprintf("ответ за %s при дедлайне %s",
				outcome.elapsed.Round(time.Millisecond), deadline)})
	}
	return results
}

func (s *suite) rest() []checkResult {
	key := s.target.key()
	now := time.Now()
	window := time.Duration(s.contract.Signature.WindowSeconds) * time.Second
	var results []checkResult

	// Тело меняется ПОСЛЕ подписи: тело входит в подписываемую строку
	// дайджестом, и приёмник, проверяющий только заголовки, примет любую начинку.
	body, eventID := s.envelope(envelopeOverrides{})
	signature := s.signatureFor(eventID, s.target.InstallationID, now, s.target.SigningKeyID)
	headers := s.signedHeaders(key, body, signature)
	tampered := append(bytes.TrimSuffix(body, []byte("}")), []byte(`,"injected":true}`)...)
	results = append(results, expectRejected("signature/tampered-body", s.deliver(tampered, headers),
		"тело входит в подписываемую строку дайджестом"))

	// Знакомый идентификатор ключа не секрет и подделывается по дороге.
	body, eventID = s.envelope(envelopeOverrides{})
	signature = s.signatureFor(eventID, s.target.InstallationID, now, s.target.SigningKeyID)
	wrong := akeda.NewSigningKey(s.target.SigningKeyID, "whs_"+randomHex(32))
	results = append(results, expectRejected("signature/wrong-secret",
		s.deliver(body, s.signedHeaders(wrong, body, signature)),
		"идентификатор ключа знаком, секрет чужой"))

	// Ключ выбирается ПО идентификатору, а не перебором.
	body, eventID = s.envelope(envelopeOverrides{})
	unknownID := "whk_" + randomHex(8)
	signature = s.signatureFor(eventID, s.target.InstallationID, now, unknownID)
	results = append(results, expectRejected("signature/unknown-key-id",
		s.deliver(body, s.signedHeaders(akeda.NewSigningKey(unknownID, s.target.SigningSecret), body, signature)),
		"ключа с таким идентификатором приёмник знать не должен"))

	// Akeda не отправляет неподписанных доставок ни при каких условиях.
	body, _ = s.envelope(envelopeOverrides{})
	results = append(results, expectRejected("signature/absent", s.deliver(body, nil),
		"доставка без заголовков подписи"))

	// Версия входит в подписываемую строку: смена алгоритма обязана делать
	// старую подпись недействительной.
	body, eventID = s.envelope(envelopeOverrides{})
	future := s.signatureFor(eventID, s.target.InstallationID, now, s.target.SigningKeyID)
	future.Version = "v2"
	results = append(results, expectRejected("signature/unknown-version",
		s.deliver(body, s.signedHeaders(key, body, future)),
		"версия схемы подписи v2"))

	// Без окна перехваченный законный запрос переигрывается когда угодно.
	body, eventID = s.envelope(envelopeOverrides{})
	stale := s.signatureFor(eventID, s.target.InstallationID, now.Add(-window-time.Minute), s.target.SigningKeyID)
	results = append(results, expectRejected("signature/stale-timestamp",
		s.deliver(body, s.signedHeaders(key, body, stale)),
		fmt.Sprintf("подпись старше окна в %s", window)))

	// Окно двустороннее, иначе подпись «из будущего» вечно свежая.
	body, eventID = s.envelope(envelopeOverrides{})
	ahead := s.signatureFor(eventID, s.target.InstallationID, now.Add(window+time.Minute), s.target.SigningKeyID)
	results = append(results, expectRejected("signature/future-timestamp",
		s.deliver(body, s.signedHeaders(key, body, ahead)),
		"подпись из будущего дальше окна"))

	// Приёмник дедуплицирует по заголовкам ДО разбора тела.
	body, eventID = s.envelope(envelopeOverrides{})
	mismatched := s.signatureFor(randomUUID(), s.target.InstallationID, now, s.target.SigningKeyID)
	results = append(results, expectRejected("envelope/header-body-mismatch",
		s.deliver(body, s.signedHeaders(key, body, mismatched)),
		"заголовок про одно событие, тело про другое"))
	_ = eventID

	// Установка — принципал ОДНОГО кабинета.
	foreignInstallation, foreignTenant, foreignKeyID, foreignSecret := s.target.foreign()
	body, eventID = s.envelope(envelopeOverrides{
		InstallationID: foreignInstallation, TenantID: foreignTenant})
	signature = s.signatureFor(eventID, foreignInstallation, now, foreignKeyID)
	results = append(results, expectRejected("isolation/foreign-installation",
		s.deliver(body, s.signedHeaders(akeda.NewSigningKey(foreignKeyID, foreignSecret), body, signature)),
		"конверт чужой установки, подписанный чужим ключом"))

	// Самая частая ошибка приёмника: один секрет на все установки. Подпись
	// сходится, а проверка кабинета выпадает целиком.
	body, eventID = s.envelope(envelopeOverrides{
		InstallationID: foreignInstallation, TenantID: foreignTenant})
	signature = s.signatureFor(eventID, foreignInstallation, now, s.target.SigningKeyID)
	results = append(results, expectRejected("isolation/foreign-installation-own-key",
		s.deliver(body, s.signedHeaders(key, body, signature)),
		"чужая установка, СВОЙ ключ: подпись сойдётся"))

	// Повтор — норма доставки. Отказ на повтор превращает каждую штатную
	// попытку в мёртвое письмо.
	body, eventID = s.envelope(envelopeOverrides{})
	signature = s.signatureFor(eventID, s.target.InstallationID, now, s.target.SigningKeyID)
	headers = s.signedHeaders(key, body, signature)
	first := s.deliver(body, headers)
	second := s.deliver(body, headers)
	if first.status < 200 || first.status > 299 {
		results = append(results, checkResult{Name: "retry/duplicate-accepted", Outcome: "fail",
			Detail: fmt.Sprintf("первая доставка не принята (%d), повтор проверять не на чем", first.status)})
	} else {
		results = append(results, expectAccepted("retry/duplicate-accepted", second,
			"точный повтор того же запроса"))
	}

	// Дедупликация по значению подписи ломается на первой же повторной попытке.
	resigned := s.signatureFor(eventID, s.target.InstallationID, now.Add(time.Second), s.target.SigningKeyID)
	results = append(results, expectAccepted("retry/resigned-attempt",
		s.deliver(body, s.signedHeaders(key, body, resigned)),
		"тот же event_id, новая подпись"))

	// Незнакомый тип не станет знакомым от пятнадцати повторов: он либо
	// принимается и игнорируется, либо отвергается ОКОНЧАТЕЛЬНО.
	body, eventID = s.envelope(envelopeOverrides{Type: "app.conformance.unknown_event"})
	signature = s.signatureFor(eventID, s.target.InstallationID, now, s.target.SigningKeyID)
	unknown := s.deliver(body, s.signedHeaders(key, body, signature))
	switch {
	case unknown.err != nil:
		results = append(results, checkResult{Name: "deadletter/unknown-event-type", Outcome: "fail",
			Detail: "ответа нет: " + unknown.err.Error()})
	case unknown.status >= 500:
		results = append(results, checkResult{Name: "deadletter/unknown-event-type", Outcome: "fail",
			Detail: fmt.Sprintf("ответ %d: Akeda повторит незнакомое событие %d раз",
				unknown.status, s.contract.Delivery.MaxAttempts)})
	default:
		results = append(results, checkResult{Name: "deadletter/unknown-event-type", Outcome: "pass",
			Detail: fmt.Sprintf("ответ %d — решение окончательное", unknown.status)})
	}

	results = append(results, s.idempotency(key, now))
	return results
}

// idempotency — единственная проверка, у которой есть честный «пропущено».
//
// Ответ 2xx на повтор доказывает, что приёмник повтор ПРИНЯЛ, и ничего не
// говорит о том, применил ли он факт второй раз: последствие живёт в чужой базе.
func (s *suite) idempotency(key akeda.SigningKey, now time.Time) checkResult {
	if s.target.EffectProbeURL == "" {
		return checkResult{Name: "idempotency/effect-applied-once", Outcome: "skip",
			Detail: "нет effectProbeUrl: последствие живёт в вашей базе и снаружи не видно"}
	}
	body, eventID := s.envelope(envelopeOverrides{})
	signature := s.signatureFor(eventID, s.target.InstallationID, now, s.target.SigningKeyID)
	headers := s.signedHeaders(key, body, signature)
	s.deliver(body, headers)
	s.deliver(body, headers)

	probe, err := url.Parse(s.target.EffectProbeURL)
	if err != nil {
		return checkResult{Name: "idempotency/effect-applied-once", Outcome: "fail",
			Detail: "effectProbeUrl не разбирается: " + err.Error()}
	}
	query := probe.Query()
	query.Set("event_id", eventID)
	probe.RawQuery = query.Encode()

	response, err := s.client.Get(probe.String())
	if err != nil {
		return checkResult{Name: "idempotency/effect-applied-once", Outcome: "fail",
			Detail: "ручка не ответила: " + err.Error()}
	}
	defer func() { _ = response.Body.Close() }()
	var applied struct {
		Applied int `json:"applied"`
	}
	if err := json.NewDecoder(io.LimitReader(response.Body, 1<<16)).Decode(&applied); err != nil {
		return checkResult{Name: "idempotency/effect-applied-once", Outcome: "fail",
			Detail: "ответ ручки не разбирается: ожидалось {\"applied\": N}"}
	}
	if applied.Applied != 1 {
		return checkResult{Name: "idempotency/effect-applied-once", Outcome: "fail",
			Detail: fmt.Sprintf("факт применён %d раз(а) после двух доставок одного события", applied.Applied)}
	}
	return checkResult{Name: "idempotency/effect-applied-once", Outcome: "pass",
		Detail: "две доставки одного события применены один раз"}
}

// skips — то, чего набор проверить НЕ МОЖЕТ, и печатает это так же громко, как
// отказы. Обратное направление — расширение как клиент нашего API — снаружи
// непроверяемо: там сервером обязана быть Akeda, и подставить вместо неё
// заглушку значит проверить заглушку.
func (s *suite) skips(quick bool) []checkResult {
	skips := []checkResult{
		{Name: "launch-token/single-use", Outcome: "skip",
			Detail: "второе предъявление гасит Akeda; проверяется на стенде разработчика"},
		{Name: "launch-token/lifetime", Outcome: "skip",
			Detail: "срок назначает Akeda, ручки сократить его у получателя нет"},
		{Name: "installation-token/rotation", Outcome: "skip",
			Detail: "токен выдаёт и отзывает Akeda, самообслуживаемой ротации в контуре нет"},
		{Name: "delivery/journal-and-replay", Outcome: "skip",
			Detail: "журнал и повтор наружу не открыты; попытки не исчерпать — расписание на 26–39 часов"},
	}
	if quick {
		return []checkResult{{Name: "conformance/full-suite", Outcome: "skip",
			Detail: "быстрая проверка: весь набор — akeda conformance run"}}
	}
	return skips
}

func expectAccepted(name string, outcome attempt, why string) checkResult {
	if outcome.err != nil {
		return checkResult{Name: name, Outcome: "fail", Detail: "ответа нет: " + outcome.err.Error()}
	}
	if outcome.status >= 200 && outcome.status <= 299 {
		return checkResult{Name: name, Outcome: "pass", Detail: fmt.Sprintf("ответ %d", outcome.status)}
	}
	return checkResult{Name: name, Outcome: "fail",
		Detail: fmt.Sprintf("ответ %d, ожидался 2xx — %s", outcome.status, why)}
}

// expectRejected требует ОКОНЧАТЕЛЬНОГО отказа: 4xx, а не 5xx.
func expectRejected(name string, outcome attempt, why string) checkResult {
	if outcome.err != nil {
		return checkResult{Name: name, Outcome: "fail", Detail: "ответа нет: " + outcome.err.Error()}
	}
	switch {
	case outcome.status >= 200 && outcome.status <= 299:
		return checkResult{Name: name, Outcome: "fail",
			Detail: fmt.Sprintf("ответ %d: подделка принята — %s", outcome.status, why)}
	case outcome.status >= 500:
		return checkResult{Name: name, Outcome: "fail",
			Detail: fmt.Sprintf("ответ %d: отказ повторяемый, Akeda повторит подделку", outcome.status)}
	default:
		return checkResult{Name: name, Outcome: "pass", Detail: fmt.Sprintf("окончательный отказ %d", outcome.status)}
	}
}

func orElse(value, fallback string) string {
	if strings.TrimSpace(value) == "" {
		return fallback
	}
	return value
}

func randomHex(bytesCount int) string {
	buffer := make([]byte, bytesCount)
	if _, err := rand.Read(buffer); err != nil {
		panic("akeda: нет источника случайности: " + err.Error())
	}
	return hex.EncodeToString(buffer)
}

// randomUUID собирает UUIDv4 из криптографической случайности. Своя функция, а
// не зависимость: одна библиотека ради шестнадцати байт — это чужой код в SBOM
// партнёра.
func randomUUID() string {
	buffer := make([]byte, 16)
	if _, err := rand.Read(buffer); err != nil {
		panic("akeda: нет источника случайности: " + err.Error())
	}
	buffer[6] = (buffer[6] & 0x0f) | 0x40
	buffer[8] = (buffer[8] & 0x3f) | 0x80
	encoded := hex.EncodeToString(buffer)
	return encoded[0:8] + "-" + encoded[8:12] + "-" + encoded[12:16] + "-" + encoded[16:20] + "-" + encoded[20:32]
}
