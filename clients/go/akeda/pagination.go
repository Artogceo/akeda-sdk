package akeda

import (
	"context"
	"encoding/json"
	"net/url"
	"strconv"
)

// Листание.
//
// Схема в контракте одна — limit и offset, — и у неё два поведения, о которых
// спотыкаются в первый день:
//
//  1. count — это ДЛИНА СТРАНИЦЫ, а не общее число записей. Цикл «пока получено
//     меньше count» не заканчивается никогда;
//  2. конец выборки определяется тем, что страница КОРОЧЕ запрошенного limit.
//
// Поэтому обход написан руками: вывести его из count означало бы вывести из
// поля, которое отвечает на другой вопрос.
//
// Исключений в контракте два, и оба названы поимённо: витрины площадок
// (page/page_size) и список бесед (курсор). Обход их не умеет и говорит об этом
// вслух — молчаливая выдача первой страницы под видом всех хуже отказа.

// PageOptions — настройка обхода.
type PageOptions struct {
	PathParams map[string]string
	Query      url.Values
	// PageSize — размер страницы. Ноль означает объявленный контрактом потолок.
	PageSize int
	// MaxItems — верхняя граница обхода. Ноль — без границы.
	MaxItems int
}

// Paginate обходит страницы и отдаёт каждую запись в visit. Возврат false из
// visit останавливает обход.
func (c *Client) Paginate(
	ctx context.Context,
	operationID string,
	options PageOptions,
	visit func(row json.RawMessage) (bool, error),
) error {
	operation, err := c.Spec(operationID)
	if err != nil {
		return err
	}
	if operation.Pagination != "limit_offset" {
		return usage(
			"операция %s листается схемой «%s», а не limit/offset. Обход умеет только "+
				"limit/offset; остальные схемы — названные исключения контракта "+
				"(витрины площадок и список бесед), и листать их надо своим кодом",
			operationID, operation.Pagination)
	}

	limit := options.PageSize
	if limit <= 0 {
		limit = operation.PageSizeMax
	}
	if limit <= 0 {
		limit = operation.PageSizeDefault
	}
	if limit <= 0 {
		limit = 100
	}
	if operation.PageSizeMax > 0 && limit > operation.PageSizeMax {
		return usage("PageSize=%d больше объявленного потолка %d", limit, operation.PageSizeMax)
	}

	offset := 0
	produced := 0
	for {
		query := url.Values{}
		for name, values := range options.Query {
			for _, value := range values {
				query.Add(name, value)
			}
		}
		query.Set("limit", strconv.Itoa(limit))
		query.Set("offset", strconv.Itoa(offset))

		result, err := c.Call(ctx, operationID, Request{PathParams: options.PathParams, Query: query})
		if err != nil {
			return err
		}
		rows, err := pageRows(result.Body)
		if err != nil {
			return err
		}
		for _, row := range rows {
			keepGoing, err := visit(row)
			if err != nil {
				return err
			}
			produced++
			if !keepGoing || (options.MaxItems > 0 && produced >= options.MaxItems) {
				return nil
			}
		}
		// Конец выборки — короткая страница. Пустая тоже короткая, так что
		// отдельной проверки на неё не нужно.
		if len(rows) < limit {
			return nil
		}
		offset += len(rows)
	}
}

type pageEnvelope struct {
	Results []json.RawMessage `json:"results"`
}

func pageRows(body []byte) ([]json.RawMessage, error) {
	var asArray []json.RawMessage
	if err := json.Unmarshal(body, &asArray); err == nil {
		return asArray, nil
	}
	var envelope pageEnvelope
	if err := json.Unmarshal(body, &envelope); err == nil && envelope.Results != nil {
		return envelope.Results, nil
	}
	return nil, usage("ответ не похож на страницу: ни массив, ни объект с полем results")
}
