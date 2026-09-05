package main

import (
	"context"
	"fmt"
	"os"
	"sort"
	"strings"

	"github.com/Artogceo/akeda-sdk/clients/go/akeda"
	"github.com/Artogceo/akeda-sdk/clients/go/akeda/generated"
)

// Приложения и версии.
//
// КОМАНДА ЧИТАЕТ СНИМОК, А НЕ ПАМЯТЬ АВТОРА. Состав дверей к каталогу меняется
// от релиза к релизу, и список, выписанный здесь словами, разошёлся бы с
// контрактом молча — то есть CLI обещал бы партнёру вызов, которого нет, либо
// молчал бы о появившемся. Поэтому доступное выводится из карты операций
// снимка, а словами названо только то, чего в контракте НЕТ: этого из карты не
// выведешь, а знать это надо раньше, чем начнёшь планировать.

func commandApps(options globals) error {
	developer := operationsUnder("/api/v1/developer")
	workspace := operationsUnder("/api/v1/settings/app")

	if options.asJSON {
		return printJSON(map[string]any{
			"developer_operations": developer,
			"workspace_operations": workspace,
			"absent": []string{
				"публикация версии: снаружи виден только отчёт о её готовности",
				"загрузка артефакта функции: байты .wasm кладёт персонал платформы, портала функций у издателя нет",
				"обмен учётных данных на токен установки: токен выдаёт человек",
				"самообслуживаемая ротация токена установки",
			},
		})
	}

	fmt.Println("Контур разработчика: что открыто снаружи по снимку контракта")
	fmt.Println()
	printOperations(developer)
	fmt.Println()
	fmt.Println("Кабинет ставит и ведёт приложение сам — ключом кабинета с settings:write:")
	fmt.Println()
	printOperations(workspace)
	fmt.Println()
	fmt.Println("Чего в контракте НЕТ, и это состояние контура, а не ограничение CLI:")
	fmt.Println("  · публикации версии. Завести приложение и версию можно самому, а открывает")
	fmt.Println("    её платформа: снаружи виден только отчёт о готовности версии к публикации;")
	fmt.Println("  · загрузки артефакта функции. Раздел `functions` манифеста объявляет отпечаток,")
	fmt.Println("    а сами байты .wasm кладёт персонал платформы: портала функций у издателя нет,")
	fmt.Println("    и версия с необеспеченной функцией молчалива — кабинет подпишет согласие и не")
	fmt.Println("    получит ни одной проверки;")
	fmt.Println("  · обмена учётных данных на токен установки. Токен выдаёт человек. Обмену")
	fmt.Println("    нужен второй, долгоживущий секрет, и он в ту же секунду становится дороже")
	fmt.Println("    всего, что им выпускается;")
	fmt.Println("  · самообслуживаемой ротации токена установки — по той же причине.")
	fmt.Println()
	fmt.Println("Начать: akeda login link <почта>, дальше akeda whoami и akeda publisher submit.")

	profile := loadConfig()
	if profile.DeveloperToken != "" {
		fmt.Println()
		fmt.Println("Сессия разработчика есть — akeda whoami покажет издателей этого аккаунта.")
	}
	return nil
}

// operationsUnder — операции снимка, чей путь начинается с префикса.
func operationsUnder(prefix string) []generated.Operation {
	found := make([]generated.Operation, 0, 16)
	for _, operation := range generated.Operations {
		if strings.HasPrefix(operation.Path, prefix) {
			found = append(found, operation)
		}
	}
	sort.Slice(found, func(a, b int) bool {
		if found[a].Path == found[b].Path {
			return found[a].Method < found[b].Method
		}
		return found[a].Path < found[b].Path
	})
	return found
}

func printOperations(operations []generated.Operation) {
	for _, operation := range operations {
		fmt.Printf("  %-6s %-58s %s\n", operation.Method, operation.Path, operation.ID)
	}
}

func commandApp(options globals, args []string) error {
	if len(args) == 0 {
		return fmt.Errorf("нужна подкоманда: installation или config")
	}
	token := os.Getenv("AKEDA_INSTALLATION_TOKEN")
	if token == "" {
		return fmt.Errorf(
			"нужен токен установки в AKEDA_INSTALLATION_TOKEN (значение вида ai_live_… либо " +
				"ai_test_…). Во флаге его нет намеренно: argv виден любому пользователю машины " +
				"через ps. Токен выдаёт человек; на бою он живёт до часа, в песочнице — до суток")
	}
	credentials, err := akeda.InstallationToken(token)
	if err != nil {
		return err
	}
	// Кабинета в адресах контура установки нет: он берётся из токена, поэтому
	// установка одного кабинета не может назваться другим. Заголовок кабинета
	// здесь не задаётся вовсе.
	client, err := akeda.New(akeda.Options{
		BaseURL:     options.baseURL,
		Credentials: credentials,
		UserAgent:   "akeda-cli",
	})
	if err != nil {
		return err
	}

	switch args[0] {
	case "installation":
		result, err := client.Call(context.Background(), "appRuntimeInstallation", akeda.Request{})
		if err != nil {
			return err
		}
		return printRaw(result.Body)
	case "config":
		result, err := client.Call(context.Background(), "appRuntimeConfig", akeda.Request{})
		if err != nil {
			return err
		}
		fmt.Fprintln(os.Stderr,
			"значения секретов здесь не приходят: их отдаёт отдельная краткосрочная выдача, "+
				"и каждая такая выдача пишется в журнал установки")
		return printRaw(result.Body)
	default:
		return fmt.Errorf("неизвестная подкоманда app %q", args[0])
	}
}
