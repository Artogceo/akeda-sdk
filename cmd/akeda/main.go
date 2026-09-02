// Команда akeda — CLI разработчика расширений Akeda.
//
// ТРИ ПРАВИЛА, ОТ КОТОРЫХ ЗАВИСИТ ОСТАЛЬНОЕ.
//
//  1. Адрес контура ЗАДАЁТСЯ, а не вшивается. Боевой известен, но CLI, знающий
//     один адрес, ведёт партнёра в бой на отладке. Стенд разработчика
//     (sandbox.akeda.ru из ADR) ещё НЕ СУЩЕСТВУЕТ, и делать вид, что команды
//     против него проверены, нельзя: --base-url и AKEDA_BASE_URL есть, адрес по
//     умолчанию — боевой, и он назван вслух в выводе каждой сетевой команды.
//
//  2. СЕКРЕТА В АРГУМЕНТАХ КОМАНДЫ НЕТ И НЕ БУДЕТ. argv процесса виден любому
//     пользователю машины через ps, а на общей машине или на раннере это ровно
//     та утечка, от которой секрет и защищает. Значения берутся из окружения или
//     из файла, права которого держит сам разработчик.
//
//  3. Чего в контракте нет, того CLI не делает и не изображает. Каталог
//     приложений и версий сегодня ведёт персонал платформы; внешней двери к нему
//     нет. `akeda apps` говорит это прямым текстом и показывает то, что доступно
//     на самом деле, а не выдумывает вызов.
package main

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

const usageText = `akeda — CLI разработчика расширений Akeda

  akeda contract                     что лежит в снимке контракта
  akeda contract op <operationId>    форма одной операции
  akeda contract find <подстрока>    поиск операций по имени, пути и модулю
  akeda contract modules             покрытие по модулям

  akeda login register <почта>       завести аккаунт разработчика
  akeda login link <почта>           запросить ссылку входа письмом
  akeda login exchange               обменять код из письма на сессию
  akeda whoami                       кто я в контуре разработчика
  akeda publisher show               моя заявка на имя издателя
  akeda publisher submit <файл>      подать заявку (JSON по контракту)
  akeda logout                       закрыть сессию

  akeda apps                         что сегодня доступно по приложениям
  akeda app installation             прочитать свою установку (токен ai_…)
  akeda app config                   прочитать свою настройку установки

  akeda manifest lint <файл>         проверить ФОРМУ манифеста по схеме снимка
  akeda receiver check <файл>        одна законная доставка в приёмник
  akeda conformance run <файл>       весь набор проверок приёмника

Общие флаги:
  --base-url URL   адрес контура (или AKEDA_BASE_URL); по умолчанию боевой
  --tenant SLUG    кабинет (или AKEDA_TENANT)
  --json           машинный вывод

Секреты только через окружение:
  AKEDA_API_KEY                     ключ кабинета ak_…
  AKEDA_INSTALLATION_TOKEN          токен установки ai_…
  AKEDA_DEVELOPER_TOKEN             сессия разработчика ad_… (иначе из конфигурации)
  AKEDA_CONFORMANCE_SIGNING_SECRET  секрет подписи для conformance
`

type globals struct {
	baseURL string
	tenant  string
	asJSON  bool
}

func main() {
	if err := run(os.Args[1:]); err != nil {
		fmt.Fprintln(os.Stderr, "akeda: "+err.Error())
		os.Exit(1)
	}
}

func run(args []string) error {
	options := globals{
		baseURL: firstNonEmpty(os.Getenv("AKEDA_BASE_URL"), storedBaseURL(), productionBaseURL),
		tenant:  os.Getenv("AKEDA_TENANT"),
	}

	rest := make([]string, 0, len(args))
	for index := 0; index < len(args); index++ {
		switch args[index] {
		case "--base-url":
			if index+1 >= len(args) {
				return fmt.Errorf("--base-url без значения")
			}
			index++
			options.baseURL = args[index]
		case "--tenant":
			if index+1 >= len(args) {
				return fmt.Errorf("--tenant без значения")
			}
			index++
			options.tenant = args[index]
		case "--json":
			options.asJSON = true
		case "-h", "--help", "help":
			fmt.Print(usageText)
			return nil
		default:
			rest = append(rest, args[index])
		}
	}

	if len(rest) == 0 {
		fmt.Print(usageText)
		return nil
	}

	switch rest[0] {
	case "contract":
		return commandContract(options, rest[1:])
	case "login":
		return commandLogin(options, rest[1:])
	case "whoami":
		return commandWhoami(options)
	case "publisher":
		return commandPublisher(options, rest[1:])
	case "logout":
		return commandLogout(options)
	case "apps":
		return commandApps(options)
	case "app":
		return commandApp(options, rest[1:])
	case "manifest":
		return commandManifest(options, rest[1:])
	case "receiver":
		return commandReceiver(options, rest[1:])
	case "conformance":
		return commandConformance(options, rest[1:])
	case "version":
		return commandVersion(options)
	default:
		return fmt.Errorf("неизвестная команда %q; см. akeda --help", rest[0])
	}
}

func firstNonEmpty(values ...string) string {
	for _, value := range values {
		if strings.TrimSpace(value) != "" {
			return value
		}
	}
	return ""
}

// ---- конфигурация ---------------------------------------------------------

// config хранит только то, что не является секретом само по себе, ПЛЮС сессию
// разработчика. Сессия — секрет, поэтому файл пишется с правами 0600 и лежит в
// каталоге пользователя, а не рядом с проектом: файл в проекте рано или поздно
// уезжает в git.
type config struct {
	BaseURL        string `json:"base_url,omitempty"`
	Tenant         string `json:"tenant,omitempty"`
	DeveloperToken string `json:"developer_token,omitempty"`
	DeveloperEmail string `json:"developer_email,omitempty"`
	SessionExpires string `json:"session_expires_at,omitempty"`
}

func configPath() string {
	if custom := os.Getenv("AKEDA_CONFIG"); custom != "" {
		return custom
	}
	base, err := os.UserConfigDir()
	if err != nil || base == "" {
		home, _ := os.UserHomeDir()
		base = filepath.Join(home, ".config")
	}
	return filepath.Join(base, "akeda", "config.json")
}

func loadConfig() config {
	var stored config
	data, err := os.ReadFile(configPath())
	if err != nil {
		return stored
	}
	_ = json.Unmarshal(data, &stored)
	return stored
}

func saveConfig(stored config) error {
	path := configPath()
	if err := os.MkdirAll(filepath.Dir(path), 0o700); err != nil {
		return fmt.Errorf("каталог конфигурации: %w", err)
	}
	data, err := json.MarshalIndent(stored, "", "  ")
	if err != nil {
		return err
	}
	// 0600, а не 0644: в файле лежит живая сессия разработчика.
	if err := os.WriteFile(path, append(data, '\n'), 0o600); err != nil {
		return fmt.Errorf("запись конфигурации: %w", err)
	}
	return nil
}

func storedBaseURL() string { return loadConfig().BaseURL }
