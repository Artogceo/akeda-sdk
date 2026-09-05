package main

import (
	"encoding/json"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/Artogceo/akeda-sdk/snapshot"
)

// Обе стороны проверки обязаны быть доказаны: на настоящем примере замечаний
// нет, а на примере с подсаженной ошибкой находится ровно то правило, ради
// которого её подсадили. Валидатор, который всегда молчит, выглядит так же
// зелено, как правильный манифест.

func exampleManifest(t *testing.T) map[string]any {
	t.Helper()
	root := repositoryRoot(t)
	data, err := os.ReadFile(filepath.Join(root, "examples", "extension", "app.json"))
	if err != nil {
		t.Fatalf("пример манифеста: %v", err)
	}
	var document map[string]any
	if err := json.Unmarshal(data, &document); err != nil {
		t.Fatalf("пример не разбирается: %v", err)
	}
	return document
}

func repositoryRoot(t *testing.T) string {
	t.Helper()
	current, err := os.Getwd()
	if err != nil {
		t.Fatalf("рабочий каталог: %v", err)
	}
	for depth := 0; depth < 10; depth++ {
		if _, err := os.Stat(filepath.Join(current, "snapshot", "SNAPSHOT.json")); err == nil {
			return current
		}
		parent := filepath.Dir(current)
		if parent == current {
			break
		}
		current = parent
	}
	t.Fatal("не найден snapshot/SNAPSHOT.json: тест запущен вне репозитория SDK")
	return ""
}

func lint(t *testing.T, document map[string]any) []schemaIssue {
	t.Helper()
	checker, err := newValidator(snapshot.ManifestSchemaJSON())
	if err != nil {
		t.Fatalf("схема манифеста: %v", err)
	}
	catalog, err := snapshot.ReadPlatformCatalog()
	if err != nil {
		t.Fatalf("каталог снимка: %v", err)
	}
	issues := append(checker.validate(document), localManifestRules(document)...)
	return append(issues, catalogManifestRules(document, catalog)...)
}

// manifestFrom читает манифест по пути от корня репозитория.
func manifestFrom(t *testing.T, parts ...string) map[string]any {
	t.Helper()
	whole := append([]string{repositoryRoot(t)}, parts...)
	data, err := os.ReadFile(filepath.Join(whole...))
	if err != nil {
		t.Fatalf("манифест: %v", err)
	}
	var document map[string]any
	if err := json.Unmarshal(data, &document); err != nil {
		t.Fatalf("манифест не разбирается: %v", err)
	}
	return document
}

// Каталог обязан быть непустым: пустой превратил бы правила мест в проверку,
// которая всегда молчит, — и выглядела бы она ровно так же зелено.
func TestCatalogIsNotEmpty(t *testing.T) {
	catalog, err := snapshot.ReadPlatformCatalog()
	if err != nil {
		t.Fatalf("каталог снимка: %v", err)
	}
	if len(catalog.UIPlacements) == 0 || len(catalog.UISlots) == 0 || len(catalog.ExtensionPoints) == 0 {
		t.Fatalf("каталог пуст: точек %d, слотов %d, мест %d",
			len(catalog.ExtensionPoints), len(catalog.UISlots), len(catalog.UIPlacements))
	}
}

// Живое расширение репозитория обязано проходить линт целиком, а не «в
// основном»: это единственный манифест SDK, у которого есть слоты, места и
// контекст запуска.
func TestStockABCManifestPasses(t *testing.T) {
	for _, issue := range lint(t, manifestFrom(t, "examples", "stock-abc", "app.json")) {
		t.Errorf("манифест stock-abc: %s", issue)
	}
}

func TestCatalogRulesCatchUnknownPlacementsAndPoints(t *testing.T) {
	cases := []struct {
		name    string
		break_  func(map[string]any)
		expects string
	}{
		{
			name: "места нет в каталоге",
			break_: func(m map[string]any) {
				slot := m["ui"].([]any)[1].(map[string]any)
				slot["placements"] = []any{"crm.deal.sidebar"}
			},
			expects: `места "crm.deal.sidebar" в каталоге нет`,
		},
		{
			name: "место не принимает вид слота",
			break_: func(m map[string]any) {
				slot := m["ui"].([]any)[0].(map[string]any)
				slot["placements"] = []any{"core.product.list"}
			},
			expects: "не принимает вид",
		},
		{
			name: "место не даёт запрошенного поля",
			break_: func(m map[string]any) {
				slot := m["ui"].([]any)[2].(map[string]any)
				slot["placements"] = []any{"core.document.list"}
			},
			expects: "не даёт поля",
		},
		{
			name: "место названо дважды",
			break_: func(m map[string]any) {
				slot := m["ui"].([]any)[1].(map[string]any)
				slot["placements"] = []any{"core.product.card", "core.product.card"}
			},
			expects: "названо второй раз",
		},
		{
			name: "слота нет в каталоге",
			break_: func(m map[string]any) {
				slot := m["ui"].([]any)[1].(map[string]any)
				slot["slot"] = "platform.side_panel.v1"
			},
			expects: `слота "platform.side_panel.v1" в каталоге нет`,
		},
		{
			name: "удалённая точка расширения",
			break_: func(m map[string]any) {
				m["extensionPoints"] = []any{"stock.price_list_source.v1"}
			},
			expects: `точки "stock.price_list_source.v1" в каталоге нет`,
		},
	}

	for _, testCase := range cases {
		t.Run(testCase.name, func(t *testing.T) {
			document := manifestFrom(t, "examples", "stock-abc", "app.json")
			testCase.break_(document)
			found := false
			for _, issue := range lint(t, document) {
				if strings.Contains(issue.Message, testCase.expects) {
					found = true
				}
			}
			if !found {
				t.Fatalf("подсаженная ошибка %q не поймана", testCase.name)
			}
		})
	}
}

func TestExampleManifestPasses(t *testing.T) {
	issues := lint(t, exampleManifest(t))
	for _, issue := range issues {
		t.Errorf("пример манифеста: %s", issue)
	}
}

func TestBrokenManifestsAreCaught(t *testing.T) {
	cases := []struct {
		name    string
		break_  func(map[string]any)
		expects string
	}{
		{
			name:    "нет обязательного раздела",
			break_:  func(m map[string]any) { delete(m, "support") },
			expects: "support",
		},
		{
			name: "чужое пространство имён справочника",
			break_: func(m map[string]any) {
				reference := m["referenceData"].(map[string]any)
				provides := reference["provides"].([]any)
				provides[0].(map[string]any)["key"] = "core.units"
			},
			expects: "вне собственного пространства",
		},
		{
			name: "значение секрета в манифесте",
			break_: func(m map[string]any) {
				secrets := m["secrets"].([]any)
				secrets[0].(map[string]any)["value"] = "s3cret"
			},
			expects: "значение секрета в манифесте",
		},
		{
			name: "область со звёздочкой",
			break_: func(m map[string]any) {
				permissions := m["permissions"].(map[string]any)
				required := permissions["required"].([]any)
				required[0].(map[string]any)["scope"] = "finance:*"
			},
			expects: "звёздочкой",
		},
		{
			name: "режим managed",
			break_: func(m map[string]any) {
				m["runtime"].(map[string]any)["mode"] = "managed"
			},
			expects: "изолированного пула воркеров нет",
		},
		{
			name: "приёмник на петле",
			break_: func(m map[string]any) {
				m["runtime"].(map[string]any)["webhookUrl"] = "https://127.0.0.1:8080/events"
			},
			expects: "127.0.0.1",
		},
		{
			name: "приёмник внутри Akeda",
			break_: func(m map[string]any) {
				m["runtime"].(map[string]any)["webhookUrl"] = "https://erp.akeda.ru/api/v1/core/contacts"
			},
			expects: "внутри Akeda",
		},
		{
			name: "одно имя и настройкой, и секретом",
			break_: func(m map[string]any) {
				config := m["configSchema"].(map[string]any)
				properties := config["properties"].(map[string]any)
				properties["bank_api_credentials"] = map[string]any{"type": "string"}
			},
			expects: "пространство имён у них общее",
		},
		{
			name: "id не собирается из publisher и key",
			break_: func(m map[string]any) {
				m["metadata"].(map[string]any)["id"] = "app.sber.statement-import"
			},
			expects: "не собирается из publisher и key",
		},
		{
			name: "назначение без срока хранения",
			break_: func(m map[string]any) {
				permissions := m["permissions"].(map[string]any)
				required := permissions["required"].([]any)
				required[0].(map[string]any)["purpose"] = map[string]any{
					"ru": "зачем", "en": "why",
				}
			},
			expects: "требует рядом retentionDays",
		},
	}

	for _, testCase := range cases {
		t.Run(testCase.name, func(t *testing.T) {
			document := exampleManifest(t)
			testCase.break_(document)
			issues := lint(t, document)
			found := false
			for _, issue := range issues {
				if strings.Contains(issue.Message, testCase.expects) {
					found = true
				}
			}
			if !found {
				t.Fatalf("подсаженная ошибка %q не поймана; замечания: %v", testCase.name, issues)
			}
		})
	}
}

func TestValidatorRejectsWrongTypes(t *testing.T) {
	document := exampleManifest(t)
	document["metadata"].(map[string]any)["version"] = 100
	issues := lint(t, document)
	if len(issues) == 0 {
		t.Fatal("число вместо semver прошло проверку типа")
	}
}
