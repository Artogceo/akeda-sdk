package main

import (
	"fmt"
	"sort"
	"strings"

	"github.com/Artogceo/akeda-sdk/snapshot"
)

// Каталог точек расширения, слотов и мест интерфейса — и проверки по нему.
//
// ЧЕМ ЭТО ОТЛИЧАЕТСЯ ОТ СХЕМЫ. Схема манифеста знает про место только форму
// ключа: `<модуль>.<сущность>.<поверхность>`. По ней проходит и место, которое
// есть, и `crm.deal.sidebar`, которого нет вовсе. Разница между ними — не форма,
// а СПИСОК, и он лежит в снимке рядом с контрактом.
//
// Цена ошибки здесь та же, что у точки расширения: манифест принимают, кабинет
// подписывает согласие, а панель не показывается ни на одном экране — и отказа
// при этом нет ни одного. Разработчик узнаёт о своей ошибке от пользователя.

func commandCatalog(options globals, args []string) error {
	catalog, err := snapshot.ReadPlatformCatalog()
	if err != nil {
		return err
	}
	section := "all"
	if len(args) > 0 {
		section = args[0]
	}
	switch section {
	case "all", "points", "slots", "placements":
	default:
		return fmt.Errorf("неизвестный раздел каталога %q; есть points, slots, placements", section)
	}

	if options.asJSON {
		switch section {
		case "points":
			return printJSON(catalog.ExtensionPoints)
		case "slots":
			return printJSON(catalog.UISlots)
		case "placements":
			return printJSON(catalog.UIPlacements)
		default:
			return printJSON(catalog)
		}
	}

	if section == "all" || section == "points" {
		fmt.Printf("точки расширения (%d)\n", len(catalog.ExtensionPoints))
		for _, point := range catalog.ExtensionPoints {
			fmt.Printf("  %-38s %-5s %s\n", point.Key, point.Model, point.Summary)
			if point.RequestTopic != "" {
				fmt.Printf("  %-38s запрос темой %s, ответ операцией %s\n", "", point.RequestTopic, point.ResponseOperation)
			}
			if len(point.Scopes) > 0 {
				fmt.Printf("  %-38s области: %s\n", "", strings.Join(point.Scopes, ", "))
			}
		}
		fmt.Println()
	}
	if section == "all" || section == "slots" {
		fmt.Printf("слоты интерфейса (%d)\n", len(catalog.UISlots))
		for _, slot := range catalog.UISlots {
			fmt.Printf("  %-38s виды: %s\n", slot.Slot, strings.Join(slot.Types, ", "))
			fmt.Printf("  %-38s контекст: %s\n", "", strings.Join(slot.Context, ", "))
		}
		fmt.Println()
	}
	if section == "all" || section == "placements" {
		fmt.Printf("места интерфейса (%d)\n", len(catalog.UIPlacements))
		for _, place := range catalog.UIPlacements {
			fmt.Printf("  %-34s виды: %s\n", place.Placement, strings.Join(place.Types, ", "))
			fmt.Printf("  %-34s %s\n", "", place.Summary)
		}
		fmt.Println()
		fmt.Println("Пустой список мест у слота означает «нигде», а не «везде».")
	}
	return nil
}

// catalogManifestRules — правила, которым нужен САМ СПИСОК, а не форма ключа.
//
// Те же три вопроса о месте, что задаёт линтер платформы при подаче версии:
// существует ли оно, уместен ли в нём слот такого вида и может ли оно дать то,
// что слот попросил в контексте. Разойтись формулировками с платформой можно,
// вердиктом — нельзя: CLI, принимающий манифест, который платформа отвергнет,
// хуже отсутствующего.
func catalogManifestRules(manifest map[string]any, catalog snapshot.PlatformCatalog) []schemaIssue {
	if manifest == nil {
		return nil
	}
	var issues []schemaIssue
	add := func(path, format string, args ...any) {
		issues = append(issues, schemaIssue{Path: path, Message: fmt.Sprintf(format, args...)})
	}

	pointKeys := make([]string, 0, len(catalog.ExtensionPoints))
	for _, point := range catalog.ExtensionPoints {
		pointKeys = append(pointKeys, point.Key)
	}
	for index, item := range asList(manifest["extensionPoints"]) {
		key, _ := item.(string)
		if key == "" {
			continue
		}
		if _, known := catalog.PointOf(key); !known {
			add(fmt.Sprintf("$.extensionPoints[%d]", index),
				"точки %q в каталоге нет; объявлены сегодня: %s", key, strings.Join(pointKeys, ", "))
		}
	}

	for index, item := range asList(manifest["ui"]) {
		entry, _ := item.(map[string]any)
		if entry == nil {
			continue
		}
		where := fmt.Sprintf("$.ui[%d]", index)
		key, _ := entry["slot"].(string)
		slotType, _ := entry["type"].(string)

		contract, known := catalog.SlotOf(key)
		if !known {
			slotKeys := make([]string, 0, len(catalog.UISlots))
			for _, slot := range catalog.UISlots {
				slotKeys = append(slotKeys, slot.Slot)
			}
			add(where+".slot", "слота %q в каталоге нет; объявлены сегодня: %s", key, strings.Join(slotKeys, ", "))
			continue
		}
		if slotType != "" && !contains(contract.Types, slotType) {
			// Вид и слот связаны: страница настройки не бывает пунктом меню, а
			// контекстное действие не бывает рамкой со своим источником.
			add(where+".type", "слот %q не объявляется видом %q; его виды: %s",
				key, slotType, strings.Join(contract.Types, ", "))
		}

		requested := make([]string, 0, 8)
		for _, field := range asList(entry["context"]) {
			name, _ := field.(string)
			if name == "" {
				continue
			}
			requested = append(requested, name)
			if !contains(contract.Context, name) {
				add(where+".context", "слот %q просит поле %q, которого ему не передают; его словарь: %s",
					key, name, strings.Join(contract.Context, ", "))
			}
		}

		seen := map[string]bool{}
		for _, field := range asList(entry["placements"]) {
			name, _ := field.(string)
			name = strings.ToLower(strings.TrimSpace(name))
			if name == "" {
				continue
			}
			if seen[name] {
				add(where+".placements", "место %q названо второй раз", name)
				continue
			}
			seen[name] = true

			place, exists := catalog.PlacementOf(name)
			if !exists {
				add(where+".placements", "места %q в каталоге нет; объявлены сегодня: %s",
					name, strings.Join(catalog.PlacementKeys(), ", "))
				continue
			}
			if slotType != "" && !contains(place.Types, slotType) {
				add(where+".placements", "место %q не принимает вид %q; оно принимает: %s",
					name, slotType, strings.Join(place.Types, ", "))
				continue
			}
			// Словарь контекста принадлежит МЕСТУ: кнопка над списком не
			// получает записи вовсе, и попросить её идентификатор — ошибка
			// манифеста, а не пустая панель в проде.
			for _, wanted := range requested {
				if contains(place.Context, wanted) {
					continue
				}
				add(where+".context", "место %q не даёт поля %q; оно даёт: %s",
					name, wanted, strings.Join(place.Context, ", "))
			}
		}
	}

	sort.SliceStable(issues, func(i, j int) bool { return issues[i].Path < issues[j].Path })
	return issues
}

func contains(list []string, value string) bool {
	for _, item := range list {
		if item == value {
			return true
		}
	}
	return false
}
