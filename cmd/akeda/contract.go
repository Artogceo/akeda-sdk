package main

import (
	"encoding/json"
	"fmt"
	"os"
	"sort"
	"strings"

	"github.com/Artogceo/akeda-sdk/clients/go/akeda"
	"github.com/Artogceo/akeda-sdk/clients/go/akeda/generated"
	"github.com/Artogceo/akeda-sdk/snapshot"
)

const productionBaseURL = akeda.ProductionBaseURL

func commandVersion(options globals) error {
	manifest, err := snapshot.ReadManifest()
	if err != nil {
		return err
	}
	if options.asJSON {
		return printJSON(manifest)
	}
	fmt.Printf("akeda CLI, снимок контракта %s, отпечаток %s\n",
		manifest.Contract.Version, manifest.SnapshotDigest)
	return nil
}

func commandContract(options globals, args []string) error {
	if len(args) == 0 {
		return contractSummary(options)
	}
	switch args[0] {
	case "op":
		if len(args) < 2 {
			return fmt.Errorf("нужен operationId: akeda contract op coreListContacts")
		}
		return contractOperation(options, args[1])
	case "find":
		if len(args) < 2 {
			return fmt.Errorf("нужна подстрока: akeda contract find contacts")
		}
		return contractFind(options, args[1])
	case "modules":
		return contractModules(options)
	default:
		return fmt.Errorf("неизвестная подкоманда contract %q", args[0])
	}
}

func contractSummary(options globals) error {
	manifest, err := snapshot.ReadManifest()
	if err != nil {
		return err
	}
	if options.asJSON {
		return printJSON(manifest)
	}
	fmt.Printf("контракт      %s (%s)\n", manifest.Contract.Version, manifest.Contract.Title)
	fmt.Printf("лицензия      %s\n", manifest.Contract.License)
	fmt.Printf("контур        %s\n", strings.Join(manifest.Contract.Servers, ", "))
	fmt.Printf("операций      %d, схем %d\n", manifest.Contract.Operations.Total, manifest.Contract.Schemas)
	fmt.Printf("отпечаток     %s\n", manifest.SnapshotDigest)
	fmt.Println()
	fmt.Println("по стадиям:")
	for _, stage := range sortedCounts(manifest.Contract.Operations.ByStage) {
		fmt.Printf("  %-10s %d\n", stage.name, stage.count)
	}
	fmt.Println()
	// Стадия — обещание, а не оценка готовности: у preview форма может
	// измениться, и CLI обязан сказать это раньше, чем партнёр обопрётся.
	fmt.Println("public — форма зафиксирована; preview — работает, но совместимость не обещана.")
	return nil
}

func contractModules(options globals) error {
	manifest, err := snapshot.ReadManifest()
	if err != nil {
		return err
	}
	if options.asJSON {
		return printJSON(manifest.Contract.Operations.ByModule)
	}
	for _, module := range sortedCounts(manifest.Contract.Operations.ByModule) {
		fmt.Printf("%-14s %d\n", module.name, module.count)
	}
	return nil
}

func contractOperation(options globals, operationID string) error {
	operation, ok := generated.Operations[operationID]
	if !ok {
		suggestions := searchOperations(operationID)
		if len(suggestions) > 0 {
			return fmt.Errorf("операции %s нет в снимке; похожие: %s",
				operationID, strings.Join(firstN(suggestions, 5), ", "))
		}
		return fmt.Errorf("операции %s нет в снимке этого контракта", operationID)
	}
	if options.asJSON {
		return printJSON(operation)
	}
	fmt.Printf("%s\n", operation.ID)
	fmt.Printf("  %s %s\n", operation.Method, operation.Path)
	fmt.Printf("  модуль        %s\n", operation.Module)
	fmt.Printf("  стадия        %s\n", operation.Stage)
	fmt.Printf("  право         %s\n", operation.Permission)
	if len(operation.PathParams) > 0 {
		fmt.Printf("  путь          %s\n", strings.Join(operation.PathParams, ", "))
	}
	fmt.Printf("  листание      %s", operation.Pagination)
	if operation.PageSizeMax > 0 {
		fmt.Printf(" (умолчание %d, потолок %d)", operation.PageSizeDefault, operation.PageSizeMax)
	}
	fmt.Println()
	if operation.Idempotent {
		fmt.Println("  Idempotency-Key: читается")
	} else {
		fmt.Println("  Idempotency-Key: НЕ читается — заголовок был бы отброшен")
	}
	if operation.Stage == "preview" {
		fmt.Println("  внимание: стадия preview, совместимость формы не обещана")
	}
	return nil
}

func contractFind(options globals, needle string) error {
	found := searchOperations(needle)
	if options.asJSON {
		return printJSON(found)
	}
	if len(found) == 0 {
		fmt.Printf("ничего не нашлось по %q\n", needle)
		return nil
	}
	for _, name := range found {
		operation := generated.Operations[name]
		fmt.Printf("%-6s %-58s %s (%s)\n", operation.Method, operation.Path, operation.ID, operation.Stage)
	}
	fmt.Printf("\nнайдено %d операций\n", len(found))
	return nil
}

func searchOperations(needle string) []string {
	lowered := strings.ToLower(needle)
	found := make([]string, 0, 16)
	for name, operation := range generated.Operations {
		haystack := strings.ToLower(name + " " + operation.Path + " " + operation.Module)
		if strings.Contains(haystack, lowered) {
			found = append(found, name)
		}
	}
	sort.Strings(found)
	return found
}

type namedCount struct {
	name  string
	count int
}

func sortedCounts(values map[string]int) []namedCount {
	out := make([]namedCount, 0, len(values))
	for name, count := range values {
		out = append(out, namedCount{name: name, count: count})
	}
	sort.Slice(out, func(a, b int) bool {
		if out[a].count == out[b].count {
			return out[a].name < out[b].name
		}
		return out[a].count > out[b].count
	})
	return out
}

func firstN(values []string, limit int) []string {
	if len(values) <= limit {
		return values
	}
	return values[:limit]
}

func printJSON(value any) error {
	encoder := json.NewEncoder(os.Stdout)
	encoder.SetIndent("", "  ")
	encoder.SetEscapeHTML(false)
	return encoder.Encode(value)
}
