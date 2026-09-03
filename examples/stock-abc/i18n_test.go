package main

import (
	"regexp"
	"sort"
	"strings"
	"testing"
)

// Словарь страниц: русский и английский обязаны совпадать по составу ключей.
//
// Проверяется машиной, а не глазами, по единственной причине: ключ, забытый в
// одном языке, НЕ ломает страницу. Она показывает вместо слова сам ключ — и
// первым это видит пользователь, выбравший тот язык, о котором забыли.
//
// Файл читается тем же embed, которым его отдаёт сервер: проверять копию рядом
// значит проверять не то, что уедет в браузер.
func TestDictionariesHaveSameKeys(t *testing.T) {
	body, err := webFiles.ReadFile("web/i18n.js")
	if err != nil {
		t.Fatal(err)
	}
	text := string(body)

	russian := strings.Index(text, "\n  ru: {")
	english := strings.Index(text, "\n  en: {")
	if russian < 0 || english < 0 || english < russian {
		t.Fatal("в словаре не нашлось разделов ru и en — проверка обязана переехать за файлом, а не молчать")
	}

	keys := func(block string) map[string]bool {
		found := map[string]bool{}
		for _, match := range regexp.MustCompile(`(?m)^\s{4}([a-z0-9_]+):`).FindAllStringSubmatch(block, -1) {
			found[match[1]] = true
		}
		return found
	}
	ru := keys(text[russian:english])
	en := keys(text[english:])

	if len(ru) == 0 || len(en) == 0 {
		t.Fatalf("ключи не разобрались: ru=%d, en=%d", len(ru), len(en))
	}
	report := func(from, to map[string]bool, missing string) {
		var lost []string
		for key := range from {
			if !to[key] {
				lost = append(lost, key)
			}
		}
		sort.Strings(lost)
		if len(lost) > 0 {
			t.Errorf("нет перевода на %s: %s", missing, strings.Join(lost, ", "))
		}
	}
	report(ru, en, "английский")
	report(en, ru, "русский")
}
