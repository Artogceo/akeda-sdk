// Первый вызов Akeda на Go.
//
//	export AKEDA_API_KEY='ak_…'          # Настройки → API-ключи, scope core:read
//	export AKEDA_TENANT='ваш-кабинет'    # slug КАБИНЕТА, а не юрлица
//	go run ./examples/quickstart-go
//
// Адрес контура берётся из AKEDA_BASE_URL и по умолчанию боевой: вшитого адреса
// в SDK нет, потому что контуров больше одного.
package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"os"

	"github.com/Artogceo/akeda-sdk/clients/go/akeda"
)

func main() {
	key := os.Getenv("AKEDA_API_KEY")
	if key == "" {
		log.Fatal("нужен AKEDA_API_KEY (значение вида ak_…, приходит один раз при создании ключа)")
	}
	credentials, err := akeda.APIKey(key)
	if err != nil {
		// Ключ без префикса ak_ Akeda считает НЕПРЕДЪЯВЛЕННЫМ и отвечает 401
		// no_credentials — то есть «заголовка не было». Отказ здесь честнее.
		log.Fatal(err)
	}

	baseURL := os.Getenv("AKEDA_BASE_URL")
	if baseURL == "" {
		baseURL = akeda.ProductionBaseURL
	}
	client, err := akeda.New(akeda.Options{
		BaseURL:     baseURL,
		Credentials: credentials,
		Tenant:      os.Getenv("AKEDA_TENANT"),
		UserAgent:   "akeda-quickstart-go",
	})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("контур: %s\n\n", baseURL)

	// Каталог справочников — операция стадии public: её форма зафиксирована.
	// Листания у неё нет намеренно: это дерево навигации, и клиент, вынужденный
	// листать собственное меню, показать его не может.
	result, err := client.Call(context.Background(), "coreReferenceCatalog", akeda.Request{})
	if err != nil {
		report(err)
		os.Exit(1)
	}

	var catalog struct {
		Count     int  `json:"count"`
		Limit     int  `json:"limit"`
		Truncated bool `json:"truncated"`
		Results   []struct {
			Key       string `json:"key"`
			Label     string `json:"label"`
			Module    string `json:"module"`
			Reference string `json:"reference"`
			IsSystem  bool   `json:"is_system"`
		} `json:"results"`
	}
	if err := result.Decode(&catalog); err != nil {
		log.Fatal(err)
	}

	fmt.Printf("справочников доступно: %d\n", catalog.Count)
	if catalog.Truncated {
		fmt.Println("внимание: каталог усечён — справочников в кабинете стало слишком много")
	}
	for index, directory := range catalog.Results {
		if index == 10 {
			fmt.Printf("  … и ещё %d\n", len(catalog.Results)-10)
			break
		}
		fmt.Printf("  %-28s %-24s модуль %s\n", directory.Key, directory.Reference, directory.Module)
	}

	// Второй вызов: листание. Конец выборки — КОРОТКАЯ страница, а не сравнение
	// с count: count это длина страницы, а не общее число записей.
	fmt.Println()
	seen := 0
	err = client.Paginate(context.Background(), "coreListContacts",
		akeda.PageOptions{MaxItems: 25},
		func(row json.RawMessage) (bool, error) {
			var contact struct {
				Name string `json:"name"`
			}
			if err := json.Unmarshal(row, &contact); err != nil {
				return false, err
			}
			seen++
			fmt.Printf("  контрагент: %s\n", contact.Name)
			return true, nil
		})
	if err != nil {
		report(err)
		return
	}
	fmt.Printf("\nполучено контрагентов: %d\n", seen)
}

func report(err error) {
	var apiErr *akeda.APIError
	if errors.As(err, &apiErr) {
		fmt.Fprintf(os.Stderr, "отказ %d %s: %s\n", apiErr.Status, apiErr.Code, apiErr.Detail)
		if apiErr.RequestID != "" {
			// Идентификатор случая — единственное, что имеет смысл нести в
			// поддержку: причины отказа в теле нет и не будет.
			fmt.Fprintf(os.Stderr, "идентификатор случая: %s\n", apiErr.RequestID)
		}
		return
	}
	fmt.Fprintln(os.Stderr, err)
}
