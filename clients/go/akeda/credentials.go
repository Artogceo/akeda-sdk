package akeda

import "strings"

// Учётные данные и заголовки.
//
// У Akeda три вида предъявителя, и они различаются ПРЕФИКСОМ значения:
//
//	ak_… — API-ключ кабинета либо личный ключ человека;
//	ai_… — краткосрочный токен установки приложения (контур /api/v1/app);
//	ad_… — сессия аккаунта разработчика (контур /api/v1/developer).
//
// Префикс проверяется до отправки. Причина не в педантизме: значение без `ak_`
// мидлварь Akeda считает НЕПРЕДЪЯВЛЕННЫМ и отвечает 401 no_credentials — то
// есть «заголовка не было». Разработчик, опечатавшийся в ключе, читает это как
// «мой заголовок не доехал» и чинит транспорт вместо ключа.

// CredentialKind — вид предъявителя.
type CredentialKind string

const (
	KindAPIKey       CredentialKind = "api_key"
	KindInstallation CredentialKind = "installation"
	KindDeveloper    CredentialKind = "developer"
)

var credentialPrefix = map[CredentialKind]string{
	KindAPIKey:       "ak_",
	KindInstallation: "ai_",
	KindDeveloper:    "ad_",
}

// Credentials — предъявитель запроса.
type Credentials struct {
	Kind  CredentialKind
	value string
}

// String печатает предъявителя без секрета: String попадает в лог именно тогда,
// когда отладить хочется больше всего.
func (c Credentials) String() string {
	if len(c.value) <= 6 {
		return string(c.Kind) + ":<скрыт>"
	}
	return string(c.Kind) + ":" + c.value[:6] + "…"
}

// Value отдаёт значение для заголовка. Отдельный метод, чтобы секрет не уезжал
// в лог случайным %v по структуре.
func (c Credentials) Value() string { return c.value }

// RequiresTenantHeader — контур установки кабинет не называет: он берётся из токена.
func (c Credentials) RequiresTenantHeader() bool { return c.Kind == KindAPIKey }

// APIKey — ключ кабинета или личный ключ человека.
func APIKey(value string) (Credentials, error) { return newCredential(KindAPIKey, value) }

// InstallationToken — краткосрочный токен установки приложения.
func InstallationToken(value string) (Credentials, error) {
	return newCredential(KindInstallation, value)
}

// DeveloperSession — сессия аккаунта разработчика.
func DeveloperSession(value string) (Credentials, error) {
	return newCredential(KindDeveloper, value)
}

func newCredential(kind CredentialKind, value string) (Credentials, error) {
	trimmed := strings.TrimSpace(value)
	if trimmed == "" {
		return Credentials{}, usage("пустое значение учётных данных")
	}
	prefix := credentialPrefix[kind]
	if !strings.HasPrefix(trimmed, prefix) {
		return Credentials{}, usage(
			"значение не похоже на %s: ожидался префикс %s. Akeda считает такое значение "+
				"непредъявленным и отвечает 401 no_credentials", kind, prefix)
	}
	return Credentials{Kind: kind, value: trimmed}, nil
}
