package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/Artogceo/akeda-sdk/clients/go/akeda"
)

// Вход в контур разработчика.
//
// Пароля в этом контуре нет намеренно: учётные данные — сам почтовый ящик, а
// одноразовая ссылка живёт пятнадцать минут и гасится выпуском новой. CLI это
// не обходит и обойти не может.
//
// Регистрация и запрос ссылки отвечают 202 с ОДИНАКОВЫМ телом при любом исходе:
// свободен адрес, занят, аккаунт приостановлен или отозван — снаружи ответ один.
// CLI печатает этот ответ как есть и не пытается угадать исход: угадывание и
// было бы тем самым оракулом существования аккаунтов, ради закрытия которого
// ответ сделан одинаковым.

func developerClient(options globals, needSession bool) (*akeda.Client, error) {
	token := firstNonEmpty(os.Getenv("AKEDA_DEVELOPER_TOKEN"), loadConfig().DeveloperToken)
	if token == "" {
		if needSession {
			return nil, fmt.Errorf(
				"нет сессии разработчика: выполните akeda login link <почта>, затем akeda login exchange " +
					"(или задайте AKEDA_DEVELOPER_TOKEN)")
		}
		// Три операции контура разработчика идут без предъявителя вовсе:
		// регистрация, запрос ссылки и обмен ссылки на сессию.
		token = ""
	}

	if token == "" {
		return akeda.New(akeda.Options{
			BaseURL:     options.baseURL,
			Credentials: akeda.Credentials{},
			UserAgent:   "akeda-cli",
		})
	}
	credentials, err := akeda.DeveloperSession(token)
	if err != nil {
		return nil, err
	}
	return akeda.New(akeda.Options{
		BaseURL:     options.baseURL,
		Credentials: credentials,
		UserAgent:   "akeda-cli",
	})
}

func commandLogin(options globals, args []string) error {
	if len(args) == 0 {
		return fmt.Errorf("нужна подкоманда: register, link или exchange")
	}
	switch args[0] {
	case "register":
		if len(args) < 2 {
			return fmt.Errorf("нужна почта: akeda login register you@example.com")
		}
		return developerAnonymousPost(options, "developerRegister",
			map[string]any{"email": args[1]}, args[1])
	case "link":
		if len(args) < 2 {
			return fmt.Errorf("нужна почта: akeda login link you@example.com")
		}
		return developerAnonymousPost(options, "developerRequestSignInLink",
			map[string]any{"email": args[1]}, args[1])
	case "exchange":
		return developerExchange(options, args[1:])
	default:
		return fmt.Errorf("неизвестная подкоманда login %q", args[0])
	}
}

func developerAnonymousPost(options globals, operationID string, body map[string]any, email string) error {
	client, err := developerClient(options, false)
	if err != nil {
		return err
	}
	fmt.Fprintf(os.Stderr, "контур: %s\n", options.baseURL)
	result, err := client.Call(context.Background(), operationID, akeda.Request{Body: body})
	if err != nil {
		return err
	}
	if options.asJSON {
		return printRaw(result.Body)
	}
	fmt.Println("принято. Дальше решает письмо: если такой адрес существует и не отозван,")
	fmt.Printf("ссылка уехала на %s. Ответ одинаков при любом исходе — дверь не отвечает\n", email)
	fmt.Println("на вопрос «есть ли у вас такой разработчик».")
	fmt.Println()
	fmt.Println("Перейдите по ссылке из письма, возьмите из неё код и выполните:")
	fmt.Println("  AKEDA_SIGN_IN_CODE=… akeda login exchange")
	return nil
}

// developerExchange меняет одноразовую ссылку на сессию.
//
// Код берётся из окружения, а не из аргумента: он и есть учётные данные на
// ближайшие пятнадцать минут, а argv видно через ps.
func developerExchange(options globals, args []string) error {
	code := os.Getenv("AKEDA_SIGN_IN_CODE")
	if code == "" && len(args) > 0 && strings.HasPrefix(args[0], "@") {
		data, err := os.ReadFile(strings.TrimPrefix(args[0], "@"))
		if err != nil {
			return fmt.Errorf("файл с кодом: %w", err)
		}
		code = strings.TrimSpace(string(data))
	}
	if code == "" {
		return fmt.Errorf(
			"код одноразовой ссылки берётся из AKEDA_SIGN_IN_CODE или из файла (@путь): " +
				"в аргументе команды он был бы виден любому пользователю машины через ps")
	}

	client, err := developerClient(options, false)
	if err != nil {
		return err
	}
	result, err := client.Call(context.Background(), "developerOpenSession", akeda.Request{
		Body: map[string]any{"code": code},
	})
	if err != nil {
		return err
	}
	// Значение сессии показывается ровно один раз: в хранилище Akeda лежит
	// только его хеш. Поэтому оно сохраняется здесь же, а не «потом».
	var session struct {
		Token     string `json:"token"`
		ExpiresIn int    `json:"expires_in"`
		Account   struct {
			Email string `json:"email"`
		} `json:"account"`
	}
	if err := result.Decode(&session); err != nil {
		return err
	}
	if session.Token == "" {
		// Форма ответа могла измениться: контракт стадии preview этого не
		// запрещает. Сказать об этом честно лучше, чем сохранить пустую сессию.
		return fmt.Errorf("ответ не содержит поля token; сохранять нечего. Ответ: %s", result.Body)
	}

	stored := loadConfig()
	stored.DeveloperToken = session.Token
	stored.DeveloperEmail = session.Account.Email
	stored.SessionExpires = ""
	if session.ExpiresIn > 0 {
		stored.SessionExpires = time.Now().Add(time.Duration(session.ExpiresIn) * time.Second).UTC().Format(time.RFC3339)
	}
	stored.BaseURL = options.baseURL
	if err := saveConfig(stored); err != nil {
		return err
	}
	fmt.Printf("сессия сохранена в %s (права 0600)\n", configPath())
	if stored.SessionExpires != "" {
		fmt.Printf("действует до %s\n", stored.SessionExpires)
	}
	return nil
}

func commandWhoami(options globals) error {
	client, err := developerClient(options, true)
	if err != nil {
		return err
	}
	result, err := client.Call(context.Background(), "developerProfile", akeda.Request{})
	if err != nil {
		return err
	}
	return printRaw(result.Body)
}

func commandLogout(options globals) error {
	client, err := developerClient(options, true)
	if err != nil {
		return err
	}
	_, callErr := client.Call(context.Background(), "developerCloseSession", akeda.Request{})

	// Локальную сессию стираем в любом случае. Оставить её после отказа сервера
	// значило бы держать на диске токен, о котором мы уже не знаем, жив ли он.
	stored := loadConfig()
	stored.DeveloperToken = ""
	stored.SessionExpires = ""
	if err := saveConfig(stored); err != nil {
		return err
	}
	if callErr != nil {
		fmt.Fprintf(os.Stderr, "сервер ответил отказом (%v), локальная сессия всё равно стёрта\n", callErr)
		return nil
	}
	fmt.Println("сессия закрыта")
	return nil
}

func commandPublisher(options globals, args []string) error {
	if len(args) == 0 {
		return fmt.Errorf("нужна подкоманда: show или submit")
	}
	client, err := developerClient(options, true)
	if err != nil {
		return err
	}
	switch args[0] {
	case "show":
		result, err := client.Call(context.Background(), "developerPublisherApplication", akeda.Request{})
		if err != nil {
			return err
		}
		return printRaw(result.Body)
	case "submit":
		if len(args) < 2 {
			return fmt.Errorf("нужен файл заявки: akeda publisher submit application.json")
		}
		data, err := os.ReadFile(args[1])
		if err != nil {
			return fmt.Errorf("файл заявки: %w", err)
		}
		var body map[string]any
		if err := json.Unmarshal(data, &body); err != nil {
			return fmt.Errorf("заявка не разбирается как JSON: %w", err)
		}
		result, err := client.Call(context.Background(), "developerSubmitPublisherApplication",
			akeda.Request{Body: body})
		if err != nil {
			return err
		}
		fmt.Println("заявка подана. Имя издателя выдаётся не автоматически: машина проверяет")
		fmt.Println("форму и уникальность имени, а принадлежит ли имя названному юрлицу — решает")
		fmt.Println("человек. Одобрение заводит НЕПРОВЕРЕННОГО издателя: отметка о проверке — ")
		fmt.Println("отдельное решение.")
		return printRaw(result.Body)
	default:
		return fmt.Errorf("неизвестная подкоманда publisher %q", args[0])
	}
}

func printRaw(body []byte) error {
	if len(body) == 0 {
		fmt.Println("(пустой ответ)")
		return nil
	}
	var value any
	if err := json.Unmarshal(body, &value); err != nil {
		fmt.Println(string(body))
		return nil
	}
	return printJSON(value)
}
