package main

import (
	"fmt"
	"os"
	"strings"
	"time"
)

// Настройка самого сервиса: то, что задаёт не кабинет, а тот, кто его запускает.
//
// Всё приходит окружением. Флага для токена нет НАМЕРЕННО: аргументы командной
// строки видны любому процессу на машине, и «удобно передать ключ флагом»
// стоит ровно столько же, сколько сказать его вслух. Для развёртываний, где
// секрет кладут файлом, есть второй путь — имя файла, а не значение.

const (
	envBaseURL      = "AKEDA_BASE_URL"
	envTenant       = "AKEDA_TENANT"
	envToken        = "AKEDA_INSTALLATION_TOKEN"
	envTokenFile    = "AKEDA_INSTALLATION_TOKEN_FILE"
	envAddr         = "STOCK_ABC_ADDR"
	envPublicURL    = "STOCK_ABC_PUBLIC_URL"
	envShellOrigins = "AKEDA_SHELL_ORIGINS"
	envSnapshotTTL  = "STOCK_ABC_SNAPSHOT_TTL"
	envSessionTTL   = "STOCK_ABC_SESSION_TTL"
)

// Config — всё, что нужно сервису для запуска.
type Config struct {
	BaseURL string
	Tenant  string
	// Token — токен установки. Тип Secret, а не string: `%+v` по этой структуре
	// в отладочном выводе не должен печатать доступ к кабинету клиента.
	Token Secret
	Addr  string
	// PublicURL — адрес, по которому оболочка Akeda открывает рамку. Нужен
	// ровно для одного: сверить источник, названный в контексте запуска, со
	// своим. Пусто означает «сверять нечем», и сверка пропускается.
	PublicURL string
	// ShellOrigins — источники оболочки, которым страница отвечает сообщениями
	// моста и от которых их принимает. Список, а не «любой»: postMessage в "*"
	// отправляет значение туда, куда рамка успела уйти сама.
	ShellOrigins []string
	SnapshotTTL  time.Duration
	SessionTTL   time.Duration
}

// LoadConfig читает окружение.
func LoadConfig() (Config, error) {
	config := Config{
		BaseURL:      envOr(envBaseURL, "https://erp.akeda.ru"),
		Tenant:       strings.TrimSpace(os.Getenv(envTenant)),
		Addr:         envOr(envAddr, ":8090"),
		PublicURL:    strings.TrimSpace(os.Getenv(envPublicURL)),
		ShellOrigins: splitOrigins(envOr(envShellOrigins, "https://erp.akeda.ru")),
	}

	token, err := readToken()
	if err != nil {
		return config, err
	}
	config.Token = token

	if config.Tenant == "" {
		// Кабинетный ключ находит свой кабинет сам, а токен установки — нет:
		// внешний контур требует заголовок X-Tenant у каждой операции и без
		// него отвечает 400. Спросить его позже неоткуда: собственная
		// установка читается тем же заголовком.
		return config, fmt.Errorf("нужен %s — slug КАБИНЕТА (юрлицо живёт внутри кабинета и заголовком не выбирается)", envTenant)
	}
	if config.Token.Empty() {
		return config, fmt.Errorf("нужен %s или %s — токен установки вида ai_live_… либо ai_test_…", envToken, envTokenFile)
	}
	if len(config.ShellOrigins) == 0 {
		return config, fmt.Errorf("%s пуст: странице не с кем разговаривать, а postMessage в «*» запрещён", envShellOrigins)
	}

	config.SnapshotTTL, err = duration(envSnapshotTTL, 15*time.Minute)
	if err != nil {
		return config, err
	}
	config.SessionTTL, err = duration(envSessionTTL, 30*time.Minute)
	if err != nil {
		return config, err
	}
	return config, nil
}

// SelfOrigin — собственный источник для сверки с контекстом запуска.
func (c Config) SelfOrigin() string { return OriginOf(c.PublicURL) }

func readToken() (Secret, error) {
	if path := strings.TrimSpace(os.Getenv(envTokenFile)); path != "" {
		data, err := os.ReadFile(path)
		if err != nil {
			return Secret{}, fmt.Errorf("%s: %w", envTokenFile, err)
		}
		// Перевод строки в конце файла — самая частая причина «токен не той
		// формы» у секрета, положенного через docker secret или echo >.
		return NewSecret(strings.TrimSpace(string(data))), nil
	}
	return NewSecret(os.Getenv(envToken)), nil
}

func envOr(name, fallback string) string {
	if value := strings.TrimSpace(os.Getenv(name)); value != "" {
		return value
	}
	return fallback
}

func duration(name string, fallback time.Duration) (time.Duration, error) {
	raw := strings.TrimSpace(os.Getenv(name))
	if raw == "" {
		return fallback, nil
	}
	value, err := time.ParseDuration(raw)
	if err != nil {
		return 0, fmt.Errorf("%s=%q: %w", name, raw, err)
	}
	if value <= 0 {
		return 0, fmt.Errorf("%s=%q: срок должен быть положительным", name, raw)
	}
	return value, nil
}

func splitOrigins(raw string) []string {
	parts := strings.Split(raw, ",")
	origins := make([]string, 0, len(parts))
	for _, part := range parts {
		if origin := OriginOf(part); origin != "" {
			origins = append(origins, origin)
		}
	}
	return origins
}
