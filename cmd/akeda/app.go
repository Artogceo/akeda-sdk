package main

import (
	"context"
	"fmt"
	"os"

	"github.com/Artogceo/akeda-sdk/clients/go/akeda"
)

// Приложения и версии.
//
// ЗДЕСЬ CLI ГОВОРИТ «НЕТ». Каталог «Akeda Apps» существует, но внешней двери к
// нему нет: завести приложение, опубликовать версию, установить, обновить,
// откатить и удалить умеет персонал платформы своими операторскими операциями,
// а их в опубликованном контракте нет вовсе — и не должно быть. Команда,
// которая делала бы вид, что умеет это, врала бы дважды: про существование
// вызова и про то, что у партнёра есть право его сделать.
//
// Что доступно на самом деле, перечислено ниже, и именно это команда и
// показывает.

func commandApps(options globals) error {
	fmt.Println("Приложения и версии сегодня ведёт персонал платформы.")
	fmt.Println()
	fmt.Println("Внешней двери к каталогу в опубликованном контракте нет: завести приложение,")
	fmt.Println("выпустить версию, поставить её кабинету, обновить, откатить и удалить —")
	fmt.Println("операторские операции, и наружу они не выходят. Это состояние контура, а не")
	fmt.Println("ограничение CLI.")
	fmt.Println()
	fmt.Println("Что разработчику доступно уже сейчас:")
	fmt.Println("  akeda login link <почта>     завести вход в контур разработчика")
	fmt.Println("  akeda whoami                 свой аккаунт и своих издателей")
	fmt.Println("  akeda publisher submit       заявка на имя издателя (решает человек)")
	fmt.Println("  akeda manifest lint <файл>   проверить форму манифеста версии до подачи")
	fmt.Println("  akeda app installation       прочитать установку токеном ai_… (когда он выдан)")
	fmt.Println("  akeda app config             прочитать свою настройку установки")
	fmt.Println("  akeda conformance run        проверить приёмник событий, ничего не поднимая у нас")
	fmt.Println()
	fmt.Println("Токен установки выдаёт человек: публичного обмена учётных данных на токен нет")
	fmt.Println("и не будет, пока нет брокера долгой половины секрета, асимметричного")
	fmt.Println("подтверждения и ограничителя частоты с аудитом НЕУДАЧНЫХ попыток.")

	profile := loadConfig()
	if profile.DeveloperToken != "" {
		fmt.Println()
		fmt.Println("Сессия разработчика есть — akeda whoami покажет издателей этого аккаунта.")
	}
	return nil
}

func commandApp(options globals, args []string) error {
	if len(args) == 0 {
		return fmt.Errorf("нужна подкоманда: installation или config")
	}
	token := os.Getenv("AKEDA_INSTALLATION_TOKEN")
	if token == "" {
		return fmt.Errorf(
			"нужен токен установки в AKEDA_INSTALLATION_TOKEN (значение вида ai_…). " +
				"Во флаге его нет намеренно: argv виден любому пользователю машины через ps. " +
				"Токен выдаёт персонал платформы и живёт он минуты")
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
