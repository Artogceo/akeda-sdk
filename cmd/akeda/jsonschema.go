package main

import (
	"encoding/json"
	"fmt"
	"math"
	"regexp"
	"sort"
	"strings"
)

// Проверка документа по JSON Schema — подмножеством, которое реально использует
// схема манифеста.
//
// Почему подмножество, а не полноценный валидатор: полный 2020-12 — это чужая
// зависимость либо тысяча строк, и ни то ни другое не окупается. Набор ключевых
// слов взят не на глаз, а посчитан по самой схеме; всё, чего в списке нет,
// проверка ПРОПУСКАЕТ МОЛЧА, и это записано здесь, а не выясняется потом.
//
// Главное, чего эта проверка не делает: она не заменяет линтер публикации.
// Тот читает живой реестр точек расширения и таксономию областей из исходников
// Akeda, которых у партнёра нет и не будет. Здесь проверяется ФОРМА, и CLI
// говорит об этом вслух, чтобы зелёный ответ не читался как «версию примут».

type schemaIssue struct {
	Path    string
	Message string
}

func (i schemaIssue) String() string { return i.Path + ": " + i.Message }

type validator struct {
	root     map[string]any
	patterns map[string]*regexp.Regexp
	issues   []schemaIssue
}

func newValidator(schema []byte) (*validator, error) {
	var root map[string]any
	if err := json.Unmarshal(schema, &root); err != nil {
		return nil, fmt.Errorf("схема не разбирается: %w", err)
	}
	return &validator{root: root, patterns: map[string]*regexp.Regexp{}}, nil
}

func (v *validator) validate(document any) []schemaIssue {
	v.issues = nil
	v.check("$", document, v.root)
	sort.Slice(v.issues, func(a, b int) bool {
		if v.issues[a].Path == v.issues[b].Path {
			return v.issues[a].Message < v.issues[b].Message
		}
		return v.issues[a].Path < v.issues[b].Path
	})
	return v.issues
}

func (v *validator) fail(path, format string, args ...any) {
	v.issues = append(v.issues, schemaIssue{Path: path, Message: fmt.Sprintf(format, args...)})
}

func (v *validator) resolve(schema map[string]any) map[string]any {
	ref, ok := schema["$ref"].(string)
	if !ok {
		return schema
	}
	const prefix = "#/$defs/"
	if !strings.HasPrefix(ref, prefix) {
		return schema
	}
	defs, _ := v.root["$defs"].(map[string]any)
	target, _ := defs[strings.TrimPrefix(ref, prefix)].(map[string]any)
	if target == nil {
		return schema
	}
	return target
}

func (v *validator) check(path string, value any, schema map[string]any) {
	schema = v.resolve(schema)

	if constant, ok := schema["const"]; ok && !equalJSON(constant, value) {
		v.fail(path, "ожидалось значение %v", constant)
	}
	if options, ok := schema["enum"].([]any); ok {
		matched := false
		for _, option := range options {
			if equalJSON(option, value) {
				matched = true
				break
			}
		}
		if !matched {
			v.fail(path, "значение не из списка: %s", joinValues(options))
		}
	}
	if variants, ok := schema["oneOf"].([]any); ok {
		matches := 0
		for _, variant := range variants {
			branch, _ := variant.(map[string]any)
			probe := &validator{root: v.root, patterns: v.patterns}
			probe.check(path, value, branch)
			if len(probe.issues) == 0 {
				matches++
			}
		}
		if matches != 1 {
			v.fail(path, "значение подходит под %d вариантов oneOf, а должно ровно под один", matches)
		}
	}

	if declared, ok := schema["type"].(string); ok && !typeMatches(declared, value) {
		v.fail(path, "ожидался тип %s", declared)
		return
	}

	switch typed := value.(type) {
	case map[string]any:
		v.checkObject(path, typed, schema)
	case []any:
		v.checkArray(path, typed, schema)
	case string:
		v.checkString(path, typed, schema)
	case float64:
		v.checkNumber(path, typed, schema)
	}
}

func (v *validator) checkObject(path string, value map[string]any, schema map[string]any) {
	properties, _ := schema["properties"].(map[string]any)

	if required, ok := schema["required"].([]any); ok {
		for _, name := range required {
			key, _ := name.(string)
			if _, present := value[key]; !present {
				v.fail(path, "нет обязательного поля %s", key)
			}
		}
	}
	if dependent, ok := schema["dependentRequired"].(map[string]any); ok {
		for trigger, needed := range dependent {
			if _, present := value[trigger]; !present {
				continue
			}
			for _, name := range toStrings(needed) {
				if _, present := value[name]; !present {
					// Схема требует их парой: назначение без срока отвечает
					// «зачем» и молчит про «на сколько».
					v.fail(path, "поле %s требует рядом %s", trigger, name)
				}
			}
		}
	}
	if limit, ok := schema["maxProperties"].(float64); ok && float64(len(value)) > limit {
		v.fail(path, "полей %d, разрешено не больше %.0f", len(value), limit)
	}
	if names, ok := schema["propertyNames"].(map[string]any); ok {
		for key := range value {
			v.check(path+"."+key, key, names)
		}
	}

	allowExtra := true
	if flag, ok := schema["additionalProperties"].(bool); ok {
		allowExtra = flag
	}
	extraSchema, hasExtraSchema := schema["additionalProperties"].(map[string]any)

	for _, key := range sortedKeys(value) {
		child, described := properties[key].(map[string]any)
		switch {
		case described:
			v.check(path+"."+key, value[key], child)
		case hasExtraSchema:
			v.check(path+"."+key, value[key], extraSchema)
		case !allowExtra:
			v.fail(path, "поле %s схемой не объявлено", key)
		}
	}
}

func (v *validator) checkArray(path string, value []any, schema map[string]any) {
	if limit, ok := schema["minItems"].(float64); ok && float64(len(value)) < limit {
		v.fail(path, "элементов %d, нужно не меньше %.0f", len(value), limit)
	}
	if limit, ok := schema["maxItems"].(float64); ok && float64(len(value)) > limit {
		v.fail(path, "элементов %d, разрешено не больше %.0f", len(value), limit)
	}
	if unique, ok := schema["uniqueItems"].(bool); ok && unique {
		seen := map[string]bool{}
		for _, item := range value {
			encoded, _ := json.Marshal(item)
			if seen[string(encoded)] {
				v.fail(path, "повторяющийся элемент %s", encoded)
				break
			}
			seen[string(encoded)] = true
		}
	}
	if items, ok := schema["items"].(map[string]any); ok {
		for index, item := range value {
			v.check(fmt.Sprintf("%s[%d]", path, index), item, items)
		}
	}
}

func (v *validator) checkString(path, value string, schema map[string]any) {
	if limit, ok := schema["minLength"].(float64); ok && float64(len([]rune(value))) < limit {
		v.fail(path, "строка короче %.0f знаков", limit)
	}
	if limit, ok := schema["maxLength"].(float64); ok && float64(len([]rune(value))) > limit {
		v.fail(path, "строка длиннее %.0f знаков", limit)
	}
	if pattern, ok := schema["pattern"].(string); ok {
		expression, err := v.compile(pattern)
		if err != nil {
			v.fail(path, "шаблон схемы не компилируется: %v", err)
			return
		}
		if !expression.MatchString(value) {
			v.fail(path, "значение %q не соответствует шаблону %s", value, pattern)
		}
	}
}

func (v *validator) checkNumber(path string, value float64, schema map[string]any) {
	if limit, ok := schema["minimum"].(float64); ok && value < limit {
		v.fail(path, "значение %v меньше минимума %v", trim(value), trim(limit))
	}
	if limit, ok := schema["maximum"].(float64); ok && value > limit {
		v.fail(path, "значение %v больше максимума %v", trim(value), trim(limit))
	}
}

func (v *validator) compile(pattern string) (*regexp.Regexp, error) {
	if cached, ok := v.patterns[pattern]; ok {
		return cached, nil
	}
	expression, err := regexp.Compile(pattern)
	if err != nil {
		return nil, err
	}
	v.patterns[pattern] = expression
	return expression, nil
}

func typeMatches(declared string, value any) bool {
	switch declared {
	case "object":
		_, ok := value.(map[string]any)
		return ok
	case "array":
		_, ok := value.([]any)
		return ok
	case "string":
		_, ok := value.(string)
		return ok
	case "boolean":
		_, ok := value.(bool)
		return ok
	case "integer":
		number, ok := value.(float64)
		return ok && number == math.Trunc(number)
	case "number":
		_, ok := value.(float64)
		return ok
	case "null":
		return value == nil
	}
	return true
}

func equalJSON(left, right any) bool {
	a, _ := json.Marshal(left)
	b, _ := json.Marshal(right)
	return string(a) == string(b)
}

func joinValues(values []any) string {
	parts := make([]string, 0, len(values))
	for _, value := range values {
		encoded, _ := json.Marshal(value)
		parts = append(parts, string(encoded))
	}
	return strings.Join(parts, ", ")
}

func toStrings(value any) []string {
	list, _ := value.([]any)
	out := make([]string, 0, len(list))
	for _, item := range list {
		if text, ok := item.(string); ok {
			out = append(out, text)
		}
	}
	return out
}

func sortedKeys(value map[string]any) []string {
	keys := make([]string, 0, len(value))
	for key := range value {
		keys = append(keys, key)
	}
	sort.Strings(keys)
	return keys
}

func trim(value float64) string {
	if value == math.Trunc(value) {
		return fmt.Sprintf("%.0f", value)
	}
	return fmt.Sprintf("%v", value)
}
