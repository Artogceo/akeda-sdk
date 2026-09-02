package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/Artogceo/akeda-sdk/snapshot"
)

// Проверка манифеста расширения.
//
// ЧТО ЭТА КОМАНДА ПРОВЕРЯЕТ И ЧЕГО НЕ ПРОВЕРЯЕТ — половина её пользы.
//
// Проверяет ФОРМУ по схеме из снимка плюс несколько правил, которые формой не
// выражаются, но проверяются локально: чужое пространство имён справочника,
// значение секрета внутри манифеста, назначение и срок хранения рядом с
// областью, wildcard в областях.
//
// НЕ проверяет то, для чего нужны исходники Akeda: существование точки
// расширения и слота в живом реестре, объявленность области в таксономии,
// ярус чувствительности области. Эти проверки делает `tools/manifest-lint` при
// подаче версии, и зелёный ответ здесь НЕ означает «версию примут». Команда
// говорит это вслух: молчание читалось бы как обещание.

func commandManifest(options globals, args []string) error {
	if len(args) < 2 || args[0] != "lint" {
		return fmt.Errorf("использование: akeda manifest lint <файл>")
	}
	data, err := os.ReadFile(args[1])
	if err != nil {
		return fmt.Errorf("манифест: %w", err)
	}
	var document any
	if err := json.Unmarshal(data, &document); err != nil {
		return fmt.Errorf("манифест не разбирается как JSON: %w", err)
	}

	checker, err := newValidator(snapshot.ManifestSchemaJSON())
	if err != nil {
		return err
	}
	issues := checker.validate(document)

	object, _ := document.(map[string]any)
	issues = append(issues, localManifestRules(object)...)

	if options.asJSON {
		payload := make([]map[string]string, 0, len(issues))
		for _, issue := range issues {
			payload = append(payload, map[string]string{"path": issue.Path, "message": issue.Message})
		}
		if err := printJSON(map[string]any{"issues": payload, "ok": len(issues) == 0}); err != nil {
			return err
		}
		if len(issues) > 0 {
			os.Exit(1)
		}
		return nil
	}

	if len(issues) == 0 {
		fmt.Println("форма манифеста принята.")
	} else {
		for _, issue := range issues {
			fmt.Printf("  %s\n", issue)
		}
		fmt.Printf("\nнайдено замечаний: %d\n", len(issues))
	}
	fmt.Println()
	fmt.Println("Проверена ФОРМА. Существование точки расширения, слота и области, а также")
	fmt.Println("ярус чувствительности проверяются при подаче версии линтером Akeda: ему нужен")
	fmt.Println("живой реестр из исходников, которого здесь нет. Зелёный ответ не означает,")
	fmt.Println("что версию опубликуют.")
	if len(issues) > 0 {
		os.Exit(1)
	}
	return nil
}

// localManifestRules — правила, которые схемой не выражаются, но проверяются
// без единого запроса и без исходников Akeda.
func localManifestRules(manifest map[string]any) []schemaIssue {
	if manifest == nil {
		return nil
	}
	var issues []schemaIssue
	add := func(path, format string, args ...any) {
		issues = append(issues, schemaIssue{Path: path, Message: fmt.Sprintf(format, args...)})
	}

	metadata, _ := manifest["metadata"].(map[string]any)
	publisher, _ := metadata["publisher"].(string)
	key, _ := metadata["key"].(string)
	namespace := "app." + publisher + "." + key

	if id, ok := metadata["id"].(string); ok && publisher != "" && key != "" && id != namespace {
		// Пространство имён собирается ИЗ имени издателя и ключа приложения;
		// id, расходящийся с ними, — это заявка на чужое пространство.
		add("$.metadata.id", "id %q не собирается из publisher и key: ожидалось %q", id, namespace)
	}

	// Приложение объявляет свои справочники ТОЛЬКО в собственном пространстве.
	// Чужое отклоняется трижды — здесь, линтером публикации и репозиторием
	// модуля core перед таблицей; это первая из трёх дверей и самая дешёвая.
	if reference, ok := manifest["referenceData"].(map[string]any); ok {
		provides, _ := reference["provides"].([]any)
		for index, item := range provides {
			entry, _ := item.(map[string]any)
			name, _ := entry["key"].(string)
			if name != "" && !strings.HasPrefix(name, namespace+".") {
				add(fmt.Sprintf("$.referenceData.provides[%d].key", index),
					"справочник %q вне собственного пространства %s.*", name, namespace)
			}
		}
	}

	// Секретов в манифесте не бывает. Значение вводит пользователь в Akeda либо
	// выдаёт OAuth-провайдер; манифест объявляет только ИМЯ поля.
	for index, item := range asList(manifest["secrets"]) {
		entry, _ := item.(map[string]any)
		for _, forbidden := range []string{"value", "secret", "token", "password"} {
			if _, present := entry[forbidden]; present {
				add(fmt.Sprintf("$.secrets[%d].%s", index, forbidden),
					"значение секрета в манифесте: манифест объявляет имя поля, а не его значение")
			}
		}
	}

	// Пространство имён у конфигурации и секретов общее, потому что значение
	// хранится по имени. Одно имя в обоих списках отклоняется: прошедшее мимо
	// проверки читалось бы строго как секрет, и владелец увидел бы сохранённое
	// значение обычной настройкой.
	secretNames := map[string]bool{}
	for _, item := range asList(manifest["secrets"]) {
		entry, _ := item.(map[string]any)
		if name, ok := entry["key"].(string); ok {
			secretNames[name] = true
		}
	}
	if configSchema, ok := manifest["configSchema"].(map[string]any); ok {
		properties, _ := configSchema["properties"].(map[string]any)
		for name := range properties {
			if secretNames[name] {
				add("$.configSchema.properties."+name,
					"имя %q объявлено и настройкой, и секретом: пространство имён у них общее", name)
			}
		}
	}

	// Область даётся на ресурс. Звёздочки в имени области нет ни в одной форме:
	// согласие, которое нельзя показать человеку поимённо, не согласие.
	for _, group := range []string{"required", "optional"} {
		permissions, _ := manifest["permissions"].(map[string]any)
		for index, item := range asList(permissions[group]) {
			entry, _ := item.(map[string]any)
			scope, _ := entry["scope"].(string)
			if strings.Contains(scope, "*") {
				add(fmt.Sprintf("$.permissions.%s[%d].scope", group, index),
					"область %q со звёздочкой: право показывается кабинету поимённо", scope)
			}
		}
	}

	if runtime, ok := manifest["runtime"].(map[string]any); ok {
		mode, _ := runtime["mode"].(string)
		if mode == "managed" {
			// Режим managed ворота публикации не проходит вовсе: изолированного
			// пула воркеров нет, и опубликованную версию нечем исполнять.
			add("$.runtime.mode",
				"режим managed сегодня не публикуется: изолированного пула воркеров нет")
		}
		for _, field := range []string{"webhookUrl", "healthUrl"} {
			address, _ := runtime[field].(string)
			if address == "" {
				continue
			}
			if strings.Contains(address, "akeda.ru") {
				add("$.runtime."+field,
					"адрес внутри Akeda: платформа ходит по нему своей рукой изнутри своего периметра")
			}
			for _, local := range []string{"localhost", "127.0.0.1", ".local", ".internal"} {
				if strings.Contains(address, local) {
					add("$.runtime."+field, "непубличный адрес %q ворота публикации не проходит", address)
				}
			}
		}
	}

	return issues
}

func asList(value any) []any {
	list, _ := value.([]any)
	return list
}
