package main

import (
	"encoding/json"
	"os"
	"regexp"
	"sort"
	"strings"
	"testing"

	"github.com/Artogceo/akeda-sdk/clients/go/akeda/generated"
	"github.com/Artogceo/akeda-sdk/snapshot"
)

// Достижимость вызываемых операций токеном установки.
//
// ЗАЧЕМ ЭТО МАШИНОЙ. Расширение ходит в Akeda токеном установки `ai_…`, и
// операция открыта ему не потому, что она внешняя и не потому, что scope
// одобрен, а потому что назвала installationToken в своём security. Ось
// отдельная, и меняется она на стороне платформы: операция, закрытая для
// установок в следующем релизе, не ломает ни сборку, ни тесты этого примера —
// она отвечает `401` в проде, у клиента, посреди рабочего дня.
//
// Поэтому список вызываемых операций читается ИЗ ИСХОДНИКА, а не переписывается
// рядом: копия разошлась бы с кодом на первом же новом вызове и молчала бы
// ровно про него.

var callPattern = regexp.MustCompile(`(?:Call|Paginate)\(ctx,\s*"([A-Za-z0-9_]+)"`)

// calledOperations — операции, которые пример действительно зовёт.
func calledOperations(t *testing.T) []string {
	t.Helper()
	body, err := os.ReadFile("akeda.go")
	if err != nil {
		t.Fatalf("исходник вызовов: %v", err)
	}
	found := map[string]bool{}
	for _, match := range callPattern.FindAllStringSubmatch(string(body), -1) {
		found[match[1]] = true
	}
	if len(found) < 5 {
		// Сторож против сломанного разбора: пустой список — это зелёная
		// проверка, не проверяющая ничего.
		t.Fatalf("в akeda.go нашлось %d вызовов: разбор сломался, а не вызовы кончились", len(found))
	}
	names := make([]string, 0, len(found))
	for name := range found {
		names = append(names, name)
	}
	sort.Strings(names)
	return names
}

func TestCalledOperationsAreReachableByInstallation(t *testing.T) {
	for _, name := range calledOperations(t) {
		operation, known := generated.Operations[name]
		if !known {
			t.Errorf("операции %q нет в снимке контракта: пример зовёт то, чего в контракте больше нет", name)
			continue
		}
		if !operation.Installation {
			t.Errorf(
				"операция %s (%s %s) закрыта токену установки: расширение получило бы 401 в проде, "+
					"а не отказ на сборке",
				name, operation.Method, operation.Path,
			)
		}
	}
}

// Пример не пишет в Akeda, и это проверяется составом вызовов, а не обещанием
// в README. Единственный не-GET — погашение одноразового токена запуска: оно
// меняет состояние самого запуска (второй раз токен не сработает), а учёта
// кабинета не касается вовсе.
func TestCalledOperationsDoNotWrite(t *testing.T) {
	const redeem = "appRuntimeRedeemSlotLaunch"
	for _, name := range calledOperations(t) {
		operation, known := generated.Operations[name]
		if !known {
			continue
		}
		if operation.Method == "GET" || name == redeem {
			continue
		}
		t.Errorf("пример зовёт %s %s (%s): расширение «только чтение» не должно уметь этого физически",
			operation.Method, operation.Path, name)
	}
}

// Места, названные манифестом примера, обязаны существовать в каталоге.
//
// Ошибка здесь не видна ни на сборке, ни в проде: панель просто не появляется
// ни на одном экране, и разработчик ищет поломку в своём коде.
func TestManifestPlacementsExistInCatalog(t *testing.T) {
	catalog, err := snapshot.ReadPlatformCatalog()
	if err != nil {
		t.Fatalf("каталог снимка: %v", err)
	}
	manifest := readManifest(t)
	slots, _ := manifest["ui"].([]any)
	if len(slots) == 0 {
		t.Fatal("в манифесте примера не нашлось ни одного слота — проверка обязана переехать за манифестом")
	}
	for index, item := range slots {
		slot, _ := item.(map[string]any)
		key, _ := slot["slot"].(string)
		slotType, _ := slot["type"].(string)
		contract, known := catalog.SlotOf(key)
		if !known {
			t.Errorf("ui[%d]: слота %q в каталоге нет", index, key)
			continue
		}
		if !contains(contract.Types, slotType) {
			t.Errorf("ui[%d]: слот %q не объявляется видом %q", index, key, slotType)
		}
		places, _ := slot["placements"].([]any)
		if len(places) == 0 {
			t.Errorf("ui[%d]: у слота %q не названо ни одного места — это «нигде», а не «везде»", index, key)
			continue
		}
		for _, raw := range places {
			name, _ := raw.(string)
			place, exists := catalog.PlacementOf(name)
			if !exists {
				t.Errorf("ui[%d]: места %q в каталоге нет; есть: %s",
					index, name, strings.Join(catalog.PlacementKeys(), ", "))
				continue
			}
			if !contains(place.Types, slotType) {
				t.Errorf("ui[%d]: место %q не принимает вид %q; оно принимает: %s",
					index, name, slotType, strings.Join(place.Types, ", "))
			}
			for _, raw := range asStrings(slot["context"]) {
				if !contains(place.Context, raw) {
					t.Errorf("ui[%d]: место %q не даёт поля %q; оно даёт: %s",
						index, name, raw, strings.Join(place.Context, ", "))
				}
			}
		}
	}
}

// Области, которые просит манифест, обязаны хватать на то, что пример зовёт.
//
// Проверяется не «список красивый», а совпадение с правом каждой вызываемой
// операции: право, которого нет в манифесте, — это `403` у клиента, а лишнее в
// манифесте — согласие, которое кабинет дал ни за что.
func TestRequiredScopesCoverCalledOperations(t *testing.T) {
	manifest := readManifest(t)
	permissions, _ := manifest["permissions"].(map[string]any)
	required := map[string]bool{}
	for _, item := range asList(permissions["required"]) {
		entry, _ := item.(map[string]any)
		if scope, ok := entry["scope"].(string); ok {
			required[scope] = true
		}
	}
	for _, name := range calledOperations(t) {
		operation, known := generated.Operations[name]
		if !known || operation.Permission == "" {
			continue
		}
		if !required[operation.Permission] {
			t.Errorf("операция %s требует области %q, а манифест её не просит: кабинет ответил бы 403",
				name, operation.Permission)
		}
	}
}

func readManifest(t *testing.T) map[string]any {
	t.Helper()
	data, err := os.ReadFile("app.json")
	if err != nil {
		t.Fatalf("манифест примера: %v", err)
	}
	var document map[string]any
	if err := json.Unmarshal(data, &document); err != nil {
		t.Fatalf("манифест не разбирается: %v", err)
	}
	return document
}

func asList(value any) []any {
	list, _ := value.([]any)
	return list
}

func asStrings(value any) []string {
	out := make([]string, 0, 8)
	for _, item := range asList(value) {
		if text, ok := item.(string); ok {
			out = append(out, text)
		}
	}
	return out
}

func contains(list []string, value string) bool {
	for _, item := range list {
		if item == value {
			return true
		}
	}
	return false
}
