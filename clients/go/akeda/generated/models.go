// Сгенерировано scripts/generate.py. Руками не править.
// Источник: snapshot/openapi/akeda-v1.json (контракт 0.21.0-core-public, sha256 c46bcc956512a51ff7a1a3400788732fa93bcbedb80ccce20857a1c4ab36abd7).
// Рантайм клиента написан руками и живёт рядом; здесь только типы.

package generated

import "encoding/json"

type AccountingBasis = string

type Activity struct {
	ID UUID `json:"id"`
	// Action — Готовый русский текст записи.
	Action string `json:"action"`
	// Kind — Вид записи об этапе задачи — `status_set`, `status_changed` или `status_deleted` (этап удалён, задача перенесена в `detail.to` или осталась без этапа). У остальных записей поле отсутствует; клиент, не знающий вида, показывает `action`.
	Kind *string `json:"kind,omitempty"`
	// Detail — Названия этапов записи об этапе; у удалённого этапа — сохранённое название.
	Detail    *ActivityDetail `json:"detail,omitempty"`
	ActorName *string         `json:"actor_name"`
	CreatedAt string          `json:"created_at"`
}

// ActivityDetail — Названия этапов записи об этапе; у удалённого этапа — сохранённое название.
type ActivityDetail struct {
	From *string `json:"from,omitempty"`
	To   *string `json:"to,omitempty"`
}

type ActivityList = []Activity

// AppFinanceClassificationSuggestionAccepted — Ответ расширению. Ровно то, что оно прислало само, плюс идентификатор строки и её состояние: ни назначения платежа, ни суммы, ни имени статьи здесь нет — иначе право писать рекомендации стало бы правом читать операции.
type AppFinanceClassificationSuggestionAccepted struct {
	SuggestionID UUID `json:"suggestion_id"`
	Transaction  UUID `json:"transaction"`
	// Status — pending, пока человек не решил. Повторный ответ той же установки на ту же операцию обновляет строку, а не заводит вторую
	Status    string `json:"status"`
	UpdatedAt string `json:"updated_at"`
}

// AppFinanceClassificationSuggestionInput — Ответ расширения на точку finance.classification_provider.v1. Автора в теле нет: установка, приложение и версия берутся из токена — иначе первое же расширение подписало бы рекомендацию соседним.
type AppFinanceClassificationSuggestionInput struct {
	// CashflowItem — Статья ДДС ссылкой. Ключ справочника — core.items; статья, не участвующая в ДДС, отклоняется кодом directory_entry_unknown
	CashflowItem AppFinanceClassificationSuggestionInputCashflowItem `json:"cashflow_item"`
	// Contact — Контрагент ссылкой, ключ справочника core.contacts. Необязателен: у половины операций он уже проставлен банком
	Contact *AppFinanceDirectoryRef `json:"contact,omitempty"`
	// Confidence — Доля единицы, не проценты. Значение вне диапазона отклоняется кодом confidence_out_of_range: приславший 87 имел в виду проценты, и принять это молча значит показать человеку уверенность 8700 %.
	Confidence float64 `json:"confidence"`
	// Explanation — Обе половины обязательны — кабинет с английским интерфейсом не должен читать объяснение по-русски
	Explanation AppFinanceClassificationSuggestionInputExplanation `json:"explanation"`
}

// AppFinanceClassificationSuggestionInputCashflowItem — Статья ДДС ссылкой. Ключ справочника — core.items; статья, не участвующая в ДДС, отклоняется кодом directory_entry_unknown
type AppFinanceClassificationSuggestionInputCashflowItem struct {
	// DirectoryKey — Полное имя справочника: core.items или core.contacts
	DirectoryKey string `json:"directory_key"`
	ID           UUID   `json:"id"`
}

// AppFinanceClassificationSuggestionInputExplanation — Обе половины обязательны — кабинет с английским интерфейсом не должен читать объяснение по-русски
type AppFinanceClassificationSuggestionInputExplanation struct {
	Ru string `json:"ru"`
	En string `json:"en"`
}

// AppFinanceDirectoryRef — Ссылка на запись справочника: ключ и идентификатор. Голый UUID здесь не принимается — он доказывает, что строка есть, и ничего не говорит о том, из какого она справочника и чья. Ключ не тот — отказ directory_mismatch, записи нет в этом кабинете — directory_entry_unknown.
type AppFinanceDirectoryRef struct {
	// DirectoryKey — Полное имя справочника: core.items или core.contacts
	DirectoryKey string `json:"directory_key"`
	ID           UUID   `json:"id"`
}

type AppReferenceItem struct {
	ID UUID `json:"id"`
	// Code — Ссылка на запись в смысле SDK: её присылает и по ней адресуется приложение
	Code     string `json:"code"`
	Label    string `json:"label"`
	ParentID *UUID  `json:"parent_id,omitempty"`
	// Attrs — Дополнительные поля записи в том виде, в каком их прислало приложение
	Attrs     map[string]json.RawMessage `json:"attrs,omitempty"`
	SortOrder int64                      `json:"sort_order"`
	// IsActive — Погашенная запись остаётся разрешимой по ссылке и не предлагается в новых
	IsActive bool `json:"is_active"`
}

type AppReferenceItemPage struct {
	Count   int64              `json:"count"`
	Results []AppReferenceItem `json:"results"`
}

type AppReferenceUpsertInput struct {
	Items []AppReferenceUpsertItem `json:"items"`
}

type AppReferenceUpsertItem struct {
	// Code — Ключ идемпотентности: тот же код обновляет ту же запись
	Code string `json:"code"`
	// Label — Подпись для человека кабинета. Пустая заменяется кодом: строка без подписи в отчёте нечитаема
	Label     *string                    `json:"label,omitempty"`
	ParentID  *UUID                      `json:"parent_id,omitempty"`
	Attrs     map[string]json.RawMessage `json:"attrs,omitempty"`
	SortOrder *int64                     `json:"sort_order,omitempty"`
	// IsActive — Пропущенное поле значит «запись жива»: молча гасить присланное было бы ловушкой
	IsActive *bool `json:"is_active,omitempty"`
}

type AppReferenceUpsertResult struct {
	// Created — Сколько записей заведено впервые
	Created int64 `json:"created"`
	// Updated — Сколько существующих кодов обновлено
	Updated int64 `json:"updated"`
}

type AppRuntimeConfig struct {
	Values []AppRuntimeConfigValue `json:"values"`
	// Missing — Обязательные поля манифеста без значения. Непустой список означает «не настроено», а не «сломано»
	Missing []string `json:"missing"`
}

type AppRuntimeConfigValue struct {
	Key string `json:"key"`
	// Secret — Как значение ХРАНИТСЯ. Истина означает, что value пуст и остаётся пустым: за значением идут краткосрочной выдачей
	Secret bool `json:"secret"`
	// Declared — Просит ли эту настройку версия, которая стоит сейчас; ложь означает значение от прошлой версии
	Declared bool `json:"declared"`
	// Set — Значение задано
	Set bool `json:"set"`
	// Value — Значение ОБЫЧНОЙ настройки. У секрета отсутствует всегда
	Value     *string `json:"value,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

type AppRuntimeInstallation struct {
	Tenant         AppRuntimeTenant `json:"tenant"`
	InstallationID UUID             `json:"installation_id"`
	Status         string           `json:"status"`
	// Namespace — Пространство имён приложения app.<издатель>.<ключ> — единственное, в котором оно вправе объявлять свои справочники
	Namespace string `json:"namespace"`
	Publisher string `json:"publisher"`
	Key       string `json:"key"`
	// Version — Версия, которая стоит у кабинета сейчас; её манифест и режет права
	Version string `json:"version"`
	// Scopes — Действующий набор: пересечение одобренного кабинетом, объявленного версией и записанного в токен
	Scopes []string `json:"scopes"`
	// DeliveryEndpointURL — Куда Akeda везёт события этой установки. Только чтение: сменить адрес через внешний контур нельзя, это делает персонал платформы по заявке издателя
	DeliveryEndpointURL string `json:"delivery_endpoint_url"`
	TokenID             UUID   `json:"token_id"`
	// TokenExpiresAt — Когда предъявленный токен перестанет работать
	TokenExpiresAt string `json:"token_expires_at"`
}

type AppRuntimeLease struct {
	Key string `json:"key"`
	// Value — Значение секрета. Уходит вызывающему один раз и не возвращается больше никаким ответом
	Value    string `json:"value"`
	IssuedAt string `json:"issued_at"`
	// ExpiresAt — Контракт «после этого забирай заново». Срок платформа на чужой стороне не исполняет: работают журнал обращений и отзыв установки
	ExpiresAt string `json:"expires_at"`
	AuditID   UUID   `json:"audit_id"`
}

type AppRuntimeLeaseInput struct {
	// TTLSeconds — Запрошенный срок выдачи. Ноль или отсутствие поля означают умолчание сервера (пять минут), значение сверх потолка — отказ
	TTLSeconds *int64 `json:"ttl_seconds,omitempty"`
}

// AppRuntimeSlotActor — Человек, открывший панель, в том объёме, в каком приложению позволено его знать. Имени, почты, ролей и числового идентификатора здесь нет и не появится: имя и почта — это штат клиента, роли — его оргструктура, а числовой идентификатор общий на всю платформу и связал бы два кабинета между собой. Карточка сотрудника (employee_id) — единственное поле, называющее человека настоящей записью кабинета, и приезжает она не всем: только слоту, который назвал actor_employee_id объявлением, и только в той версии, чей лист согласия кабинет читал. Общего на всю платформу в ней ничего нет — она живёт в базе кабинета, и тот же человек у двух клиентов это две разные строки, поэтому довод про связывание кабинетов к ней не относится.
type AppRuntimeSlotActor struct {
	// Subject — Псевдоним, свой у каждой пары «установка + человек». Устойчив внутри установки, поэтому панель помнит выбор сотрудника; в другой установке того же приложения у того же человека он ДРУГОЙ; умирает вместе с установкой
	Subject UUID `json:"subject"`
	// EmployeeID — Карточка сотрудника кабинета (core_employee.id) — та же, на которой висит его работа. Приезжает только слоту, попросившему actor_employee_id. Пусто означает «не просили либо человек не сотрудник»: различать эти случаи приложению незачем, оба означают, что сотрудника нет. Нужна тому, кто ведёт работу людей: без неё приложение заводит второй список сотрудников у себя, а псевдоним для этого не годится — он умирает вместе с установкой, а часы и назначения обязаны её пережить
	EmployeeID *UUID `json:"employee_id,omitempty"`
	// Locale — Язык интерфейса человека: слот обязан показывать текст на русском и английском, и без языка он показал бы не тот
	Locale string `json:"locale"`
	// Theme — Тема кабинета. Слот, объявивший themeAware, без неё исполнить объявленное не может
	Theme string `json:"theme"`
}

// AppRuntimeSlotAnchor — Экран и запись, рядом с которыми стоит слот. Модуль назван всегда — по нему считается право ЧЕЛОВЕКА на запуск; вид и запись есть только у слота, стоящего на карточке. Само содержимое записи здесь не приезжает: читать её приложение идёт в public API своими одобренными scopes.
type AppRuntimeSlotAnchor struct {
	// Module — Модуль экрана, с которого открыли панель
	Module string `json:"module"`
	// Entity — Вид записи. Отсутствует у слота без карточки
	Entity *string `json:"entity,omitempty"`
	// EntityID — Идентификатор записи: uuid, код или номер документа
	EntityID *string `json:"entity_id,omitempty"`
}

type AppRuntimeSlotLaunch struct {
	Tenant         AppRuntimeTenant `json:"tenant"`
	InstallationID UUID             `json:"installation_id"`
	// Slot — Ключ слота с версией: место на экране, откуда открыли панель
	Slot string `json:"slot"`
	// Nonce — Тот же nonce, что прислала страница: по нему сервер расширения связывает погашенный запуск с конкретной рамкой, не веря на слово ей самой
	Nonce  string               `json:"nonce"`
	Actor  AppRuntimeSlotActor  `json:"actor"`
	Anchor AppRuntimeSlotAnchor `json:"anchor"`
	// Origin — Источник, из которого оболочка загрузила рамку. Пусто, если кабинет успел обновить приложение на версию без этого слота: запуск был разрешён по прежнему объявлению и обрывать его незачем
	Origin     string `json:"origin"`
	IssuedAt   string `json:"issued_at"`
	RedeemedAt string `json:"redeemed_at"`
	// AuditID — Строка журнала установки об этом погашении
	AuditID UUID `json:"audit_id"`
}

type AppRuntimeSlotLaunchInput struct {
	// Token — Одноразовый токен запуска (`al_…`), который оболочка передала странице сообщением akeda.slot.launch. Учётными данными не является: без токена установки он не открывает ничего
	Token string `json:"token"`
	// Nonce — Значение, которое страница расширения придумала сама и прислала оболочке сообщением akeda.slot.ready. Секретом не является — оно доказывает, что запуск отвечает именно на этот запрос страницы
	Nonce string `json:"nonce"`
}

type AppRuntimeTenant struct {
	ID UUID `json:"id"`
	// Slug — Канонический slug кабинета из справочника, а не строка заголовка; его же ставят в X-Tenant следующего запроса
	Slug string `json:"slug"`
}

type ArchiveTransfer struct {
	TargetSection *UUID `json:"target_section,omitempty"`
}

type AssistantDigest struct {
	Name               string   `json:"name"`
	MetricIds          []string `json:"metric_ids"`
	Company            *UUID    `json:"company,omitempty"`
	Project            *UUID    `json:"project,omitempty"`
	Period             string   `json:"period"`
	ScheduleHour       int64    `json:"schedule_hour"`
	ScheduleMinute     int64    `json:"schedule_minute"`
	Timezone           string   `json:"timezone"`
	WeekdaysOnly       bool     `json:"weekdays_only"`
	Locale             string   `json:"locale"`
	Enabled            bool     `json:"enabled"`
	ID                 UUID     `json:"id"`
	Version            int64    `json:"version"`
	NextRunAt          string   `json:"next_run_at"`
	LastRunAt          *string  `json:"last_run_at,omitempty"`
	LastError          *string  `json:"last_error,omitempty"`
	LastConversationID *UUID    `json:"last_conversation_id,omitempty"`
}

type AssistantDigestInput struct {
	Name           string   `json:"name"`
	MetricIds      []string `json:"metric_ids"`
	Company        *UUID    `json:"company,omitempty"`
	Project        *UUID    `json:"project,omitempty"`
	Period         string   `json:"period"`
	ScheduleHour   int64    `json:"schedule_hour"`
	ScheduleMinute int64    `json:"schedule_minute"`
	Timezone       string   `json:"timezone"`
	WeekdaysOnly   bool     `json:"weekdays_only"`
	Locale         string   `json:"locale"`
	Enabled        bool     `json:"enabled"`
}

type Attachment struct {
	ID          UUID   `json:"id"`
	OwnerType   string `json:"owner_type"`
	OwnerID     UUID   `json:"owner_id"`
	FolderID    *UUID  `json:"folder_id"`
	Name        string `json:"name"`
	MimeType    string `json:"mime_type"`
	SizeBytes   int64  `json:"size_bytes"`
	Kind        string `json:"kind"`
	URL         string `json:"url"`
	ContentPath string `json:"content_path"`
	PublicURL   string `json:"public_url"`
	Markdown    string `json:"markdown"`
	UploadedBy  *int64 `json:"uploaded_by"`
	Uploader    string `json:"uploader"`
	CreatedAt   string `json:"created_at"`
}

type AttachmentOwnerType = string

type AttachmentPage struct {
	Count   int64        `json:"count"`
	Results []Attachment `json:"results"`
}

type AttachmentReplacementSessionCreate struct {
	Filename  string  `json:"filename"`
	MimeType  *string `json:"mime_type,omitempty"`
	SizeBytes int64   `json:"size_bytes"`
	Sha256    *string `json:"sha256,omitempty"`
}

type AttachmentUploadSession struct {
	ID                  UUID                `json:"id"`
	AttachmentID        UUID                `json:"attachment_id"`
	ReplaceAttachmentID *UUID               `json:"replace_attachment_id,omitempty"`
	OwnerType           AttachmentOwnerType `json:"owner_type"`
	OwnerID             UUID                `json:"owner_id"`
	// FolderID — Папка файлов проекта, куда ляжет файл
	FolderID    *string           `json:"folder_id,omitempty"`
	UploadedBy  int64             `json:"uploaded_by"`
	Name        string            `json:"name"`
	MimeType    string            `json:"mime_type"`
	SizeBytes   int64             `json:"size_bytes"`
	Sha256      *string           `json:"sha256,omitempty"`
	Status      string            `json:"status"`
	ExpiresAt   string            `json:"expires_at"`
	CompletedAt *string           `json:"completed_at,omitempty"`
	CreatedAt   string            `json:"created_at"`
	UploadURL   *string           `json:"upload_url,omitempty"`
	Method      *string           `json:"method,omitempty"`
	Headers     map[string]string `json:"headers,omitempty"`
	Fields      map[string]string `json:"fields,omitempty"`
	FileField   *string           `json:"file_field,omitempty"`
	MaxBytes    *int64            `json:"max_bytes,omitempty"`
}

type AttachmentUploadSessionCreate struct {
	OwnerType AttachmentOwnerType `json:"owner_type"`
	OwnerID   UUID                `json:"owner_id"`
	// FolderID — Папка файлов проекта, куда сразу ляжет файл; только при owner_type=project
	FolderID  *string `json:"folder_id,omitempty"`
	Filename  string  `json:"filename"`
	MimeType  *string `json:"mime_type,omitempty"`
	SizeBytes int64   `json:"size_bytes"`
	Sha256    *string `json:"sha256,omitempty"`
}

// AutomationManifest — Документ akeda.automation.manifest версии 1 (AUTOMATION.md § 10.1).
type AutomationManifest struct {
	Schema  *string `json:"$schema,omitempty"`
	Format  string  `json:"format"`
	Version int64   `json:"version"`
	// Revision — Отпечаток содержимого sha256:…
	Revision     string                               `json:"revision"`
	Locale       string                               `json:"locale"`
	Detail       string                               `json:"detail"`
	Events       []AutomationManifestEvent            `json:"events"`
	Conditions   AutomationManifestConditions         `json:"conditions"`
	Actions      []AutomationManifestAction           `json:"actions"`
	References   []AutomationManifestReferencesItem   `json:"references"`
	Placeholders []AutomationManifestPlaceholdersItem `json:"placeholders"`
	Limits       AutomationManifestLimits             `json:"limits"`
}

type AutomationManifestConditions struct {
	Combinator     string                                      `json:"combinator"`
	Operators      []AutomationManifestConditionsOperatorsItem `json:"operators"`
	MaxClauses     int64                                       `json:"max_clauses"`
	MaxValueLength int64                                       `json:"max_value_length"`
}

type AutomationManifestConditionsOperatorsItem struct {
	Op              string   `json:"op"`
	Label           string   `json:"label"`
	FieldTypes      []string `json:"field_types"`
	NeedsValue      bool     `json:"needs_value"`
	CaseInsensitive bool     `json:"case_insensitive"`
}

type AutomationManifestReferencesItem struct {
	Kind   string `json:"kind"`
	Module string `json:"module"`
	Label  string `json:"label"`
	// LookupTool — MCP-инструмент поиска значения по имени
	LookupTool    string `json:"lookup_tool"`
	ParameterKind bool   `json:"parameter_kind"`
	Status        string `json:"status"`
}

type AutomationManifestPlaceholdersItem struct {
	Syntax  string `json:"syntax"`
	Meaning string `json:"meaning"`
	Status  string `json:"status"`
}

type AutomationManifestLimits struct {
	MaxActions             int64 `json:"max_actions"`
	MaxConditions          int64 `json:"max_conditions"`
	MaxConditionLength     int64 `json:"max_condition_length"`
	ChainDepth             int64 `json:"chain_depth"`
	RunsPerTenantPerMinute int64 `json:"runs_per_tenant_per_minute"`
	MaxAttempts            int64 `json:"max_attempts"`
}

type AutomationManifestAction struct {
	Command           string                               `json:"command"`
	Module            string                               `json:"module"`
	LabelKey          string                               `json:"label_key"`
	Label             string                               `json:"label"`
	Description       string                               `json:"description"`
	WhenToUse         string                               `json:"when_to_use"`
	Status            string                               `json:"status"`
	UnavailableReason *string                              `json:"unavailable_reason,omitempty"`
	Permission        string                               `json:"permission"`
	Reversible        bool                                 `json:"reversible"`
	Danger            string                               `json:"danger"`
	Idempotency       string                               `json:"idempotency"`
	Target            string                               `json:"target"`
	EventEntities     []string                             `json:"event_entities,omitempty"`
	MCPTwin           *string                              `json:"mcp_twin,omitempty"`
	Inputs            []AutomationManifestActionInputsItem `json:"inputs,omitempty"`
	ExampleInputs     map[string]string                    `json:"example_inputs,omitempty"`
}

type AutomationManifestActionInputsItem struct {
	Key                 string                     `json:"key"`
	Type                string                     `json:"type"`
	Required            bool                       `json:"required"`
	Label               string                     `json:"label"`
	Options             []AutomationManifestOption `json:"options,omitempty"`
	Ref                 *string                    `json:"ref,omitempty"`
	AcceptsPlaceholders bool                       `json:"accepts_placeholders"`
}

type AutomationManifestEvent struct {
	Topic             string  `json:"topic"`
	Module            string  `json:"module"`
	Entity            string  `json:"entity"`
	Fact              string  `json:"fact"`
	LabelKey          string  `json:"label_key"`
	Label             string  `json:"label"`
	Description       string  `json:"description"`
	WhenToUse         string  `json:"when_to_use"`
	Status            string  `json:"status"`
	UnavailableReason *string `json:"unavailable_reason,omitempty"`
	// SourceVisibility — Правило сработает, только если исполнитель видит источник
	SourceVisibility bool                                `json:"source_visibility"`
	Fields           []AutomationManifestEventFieldsItem `json:"fields,omitempty"`
	ExamplePayload   map[string]json.RawMessage          `json:"example_payload,omitempty"`
}

type AutomationManifestEventFieldsItem struct {
	Key       string                     `json:"key"`
	Type      string                     `json:"type"`
	Label     string                     `json:"label"`
	Options   []AutomationManifestOption `json:"options,omitempty"`
	Ref       *string                    `json:"ref,omitempty"`
	Operators []string                   `json:"operators"`
}

type AutomationManifestOption struct {
	Value string `json:"value"`
	Label string `json:"label"`
}

type AutomationRuleDocument struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	EventType string `json:"event_type"`
	// Condition — Выражение вычислителя; у правила из конструктора собрано из conditions
	Condition      string                                 `json:"condition"`
	Conditions     []AutomationRuleDocumentConditionsItem `json:"conditions"`
	Actions        []AutomationRuleDocumentActionsItem    `json:"actions"`
	ExecutorUserID int64                                  `json:"executor_user_id"`
	IsEnabled      bool                                   `json:"is_enabled"`
	Origin         string                                 `json:"origin"`
	Version        int64                                  `json:"version"`
	CreatedBy      *int64                                 `json:"created_by,omitempty"`
	CreatedAt      *string                                `json:"created_at,omitempty"`
	UpdatedAt      *string                                `json:"updated_at,omitempty"`
}

type AutomationRuleDocumentConditionsItem struct {
	Field   string  `json:"field"`
	Op      string  `json:"op"`
	Value   *string `json:"value,omitempty"`
	ValueTo *string `json:"value_to,omitempty"`
	Of      *string `json:"of,omitempty"`
	Group   *int64  `json:"group,omitempty"`
}

type AutomationRuleDocumentActionsItem struct {
	Command string            `json:"command"`
	Inputs  map[string]string `json:"inputs,omitempty"`
}

type AutomationRuleProblem struct {
	// Field — Путь в документе правила: event_type, conditions[1].op, actions[0].inputs.title
	Field   string            `json:"field"`
	Code    string            `json:"code"`
	Message string            `json:"message"`
	Hint    *string           `json:"hint,omitempty"`
	Params  map[string]string `json:"params,omitempty"`
	Allowed []string          `json:"allowed,omitempty"`
}

type AutomationRuleSimulateRequest struct {
	// Rule — Документ правила в той же форме, что у проверки правила (event_type, conditions, actions); название и исполнитель не нужны.
	Rule AutomationRuleSimulateRequestRule `json:"rule"`
	// RuleID — Сохранённое правило: его версия на тех же фактах — «было»
	RuleID *string `json:"rule_id,omitempty"`
	// Days — Период прогона в днях; по умолчанию 30
	Days *int64 `json:"days,omitempty"`
}

// AutomationRuleSimulateRequestRule — Документ правила в той же форме, что у проверки правила (event_type, conditions, actions); название и исполнитель не нужны.
type AutomationRuleSimulateRequestRule struct {
	EventType string `json:"event_type"`
}

type AutomationRuleSimulation struct {
	Days  int64  `json:"days"`
	Since string `json:"since"`
	// Events — Фактов события за период, видимых вызывающему
	Events int64 `json:"events"`
	// Fired — Сколько раз правило сработало бы
	Fired int64 `json:"fired"`
	// Truncated — Учтены только последние 2000 фактов периода
	Truncated bool `json:"truncated"`
	// MaxPerDay — Больше всего срабатываний за один день
	MaxPerDay int64                                 `json:"max_per_day"`
	Records   []AutomationRuleSimulationRecordsItem `json:"records"`
	Actions   []AutomationRuleSimulationActionsItem `json:"actions"`
	Before    *AutomationRuleSimulationBefore       `json:"before,omitempty"`
	// Executed — Всегда false: прогон ничего не исполняет
	Executed bool `json:"executed"`
}

type AutomationRuleSimulationRecordsItem struct {
	Key      string `json:"key"`
	EntityID string `json:"entity_id"`
	// Title — Номер, идентификатор или тема записи
	Title      *string `json:"title,omitempty"`
	OccurredAt string  `json:"occurred_at"`
}

type AutomationRuleSimulationActionsItem struct {
	Index      int64  `json:"index"`
	Command    string `json:"command"`
	Label      string `json:"label"`
	Permission string `json:"permission"`
	Allowed    bool   `json:"allowed"`
	Connected  bool   `json:"connected"`
	// Count — Сколько раз действие выполнилось бы; 0 — его заблокировали права или нет исполнителя
	Count   int64   `json:"count"`
	Code    *string `json:"code,omitempty"`
	Message *string `json:"message,omitempty"`
}

type AutomationRuleSimulationBefore struct {
	Enabled bool  `json:"enabled"`
	Version int64 `json:"version"`
	// Fired — Сколько раз сработала бы сохранённая версия; выключенное правило — 0
	Fired int64 `json:"fired"`
}

type AutomationRuleTestRequest struct {
	// Rule — Документ правила в той же форме, что у записи правила; название и исполнитель не нужны.
	Rule AutomationRuleTestRequestRule `json:"rule"`
	// SampleKey — Ключ факта из выборки последних фактов события; пусто — последний факт
	SampleKey *string `json:"sample_key,omitempty"`
	// Payload — Тело события для проверки «что если» вместо настоящего факта
	Payload map[string]string `json:"payload,omitempty"`
}

// AutomationRuleTestRequestRule — Документ правила в той же форме, что у записи правила; название и исполнитель не нужны.
type AutomationRuleTestRequestRule struct {
	Name       *string                                       `json:"name,omitempty"`
	EventType  string                                        `json:"event_type"`
	Condition  *string                                       `json:"condition,omitempty"`
	Conditions []AutomationRuleTestRequestRuleConditionsItem `json:"conditions,omitempty"`
	Actions    []AutomationRuleTestRequestRuleActionsItem    `json:"actions,omitempty"`
}

type AutomationRuleTestRequestRuleConditionsItem struct {
	Field string `json:"field"`
	// Op — equals, not_equals, contains, starts_with, ends_with, is_true, is_false; числа — gt, gte, lt, lte, between; даты — before, on_or_before, after, on_or_after, between
	Op    string  `json:"op"`
	Value *string `json:"value,omitempty"`
	// ValueTo — Верхняя граница «между», включительно
	ValueTo *string `json:"value_to,omitempty"`
	// Of — Числовое поле-основа: value и value_to — проценты от него
	Of *string `json:"of,omitempty"`
	// Group — Группа «или»: сравнения группы — «и», группы между собой — «или»
	Group *int64 `json:"group,omitempty"`
}

type AutomationRuleTestRequestRuleActionsItem struct {
	Command string            `json:"command"`
	Inputs  map[string]string `json:"inputs,omitempty"`
}

type AutomationRuleTestResult struct {
	Sample         *AutomationRuleTestResultSample       `json:"sample,omitempty"`
	ExecutorUserID int64                                 `json:"executor_user_id"`
	When           AutomationRuleTestResultWhen          `json:"when"`
	Condition      AutomationRuleTestResultCondition     `json:"condition"`
	Matched        bool                                  `json:"matched"`
	Actions        []AutomationRuleTestResultActionsItem `json:"actions"`
	Problem        *AutomationRuleProblem                `json:"problem,omitempty"`
	// Executed — Всегда false: проверка ничего не делает
	Executed bool `json:"executed"`
}

type AutomationRuleTestResultSample struct {
	Key       string `json:"key"`
	EventType string `json:"event_type"`
	Entity    string `json:"entity"`
	EntityID  string `json:"entity_id"`
	// Title — Номер, идентификатор или тема записи
	Title      *string           `json:"title,omitempty"`
	OccurredAt string            `json:"occurred_at"`
	Payload    map[string]string `json:"payload"`
	Source     string            `json:"source"`
}

type AutomationRuleTestResultWhen struct {
	OK         bool                                     `json:"ok"`
	EventLabel string                                   `json:"event_label"`
	Values     []AutomationRuleTestResultWhenValuesItem `json:"values"`
	// Code — no_sample — фактов события за 30 дней нет
	Code    *string `json:"code,omitempty"`
	Message *string `json:"message,omitempty"`
}

type AutomationRuleTestResultWhenValuesItem struct {
	Key   string `json:"key"`
	Label string `json:"label"`
	Value string `json:"value"`
}

type AutomationRuleTestResultCondition struct {
	OK         bool                                           `json:"ok"`
	Empty      bool                                           `json:"empty"`
	Expression bool                                           `json:"expression"`
	Clauses    []AutomationRuleTestResultConditionClausesItem `json:"clauses"`
	Code       *string                                        `json:"code,omitempty"`
	Message    *string                                        `json:"message,omitempty"`
}

type AutomationRuleTestResultConditionClausesItem struct {
	Index      int64   `json:"index"`
	Field      string  `json:"field"`
	FieldLabel string  `json:"field_label"`
	Op         string  `json:"op"`
	OpLabel    string  `json:"op_label"`
	Expected   *string `json:"expected,omitempty"`
	ExpectedTo *string `json:"expected_to,omitempty"`
	Of         *string `json:"of,omitempty"`
	OfLabel    *string `json:"of_label,omitempty"`
	OfActual   *string `json:"of_actual,omitempty"`
	Group      *int64  `json:"group,omitempty"`
	Actual     string  `json:"actual"`
	Present    bool    `json:"present"`
	OK         bool    `json:"ok"`
}

type AutomationRuleTestResultActionsItem struct {
	Index      int64                                           `json:"index"`
	Command    string                                          `json:"command"`
	Label      string                                          `json:"label"`
	Permission string                                          `json:"permission"`
	Allowed    bool                                            `json:"allowed"`
	Connected  bool                                            `json:"connected"`
	Status     string                                          `json:"status"`
	Code       *string                                         `json:"code,omitempty"`
	Message    *string                                         `json:"message,omitempty"`
	Inputs     []AutomationRuleTestResultActionsItemInputsItem `json:"inputs"`
}

type AutomationRuleTestResultActionsItemInputsItem struct {
	Key      string   `json:"key"`
	Label    string   `json:"label"`
	Template string   `json:"template"`
	Value    string   `json:"value"`
	Missing  []string `json:"missing,omitempty"`
}

// CRMActivity — Лента только дописывается
type CRMActivity struct {
	ID         UUID   `json:"id"`
	EntityType string `json:"entity_type"`
	EntityID   UUID   `json:"entity_id"`
	// Action — Ключ факта; note - заметка сотрудника
	Action string `json:"action"`
	// Details — Подробности факта. У заметки: text - текст, mentions - упомянутые коллеги [{id, name}]
	Details   map[string]json.RawMessage `json:"details"`
	ActorID   int64                      `json:"actor_id"`
	ActorName *string                    `json:"actor_name,omitempty"`
	CreatedAt string                     `json:"created_at"`
}

// CRMAnalytics — Живая витрина по всему кабинету; суммы в валюте сделки
type CRMAnalytics struct {
	Stages     []CRMStageMetric    `json:"stages"`
	Conversion CRMConversionMetric `json:"conversion"`
	// WeightedForecast — Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
	WeightedForecast string                `json:"weighted_forecast"`
	LossReasons      []CRMLossReasonMetric `json:"loss_reasons"`
	SLA              CRMSLAMetric          `json:"sla"`
	ManagerWorkload  []CRMManagerWorkload  `json:"manager_workload"`
	LeadSources      []CRMSourceMetric     `json:"lead_sources"`
}

type CRMAutomationAction struct {
	Type string `json:"type"`
	// OwnerID — Обязателен для assign_owner
	OwnerID *int64 `json:"owner_id,omitempty"`
	// Title — Обязателен для create_task и create_event
	Title       *string `json:"title,omitempty"`
	Description *string `json:"description,omitempty"`
	SectionID   *UUID   `json:"section_id,omitempty"`
	StartsAt    *string `json:"starts_at,omitempty"`
	EndsAt      *string `json:"ends_at,omitempty"`
	Timezone    *string `json:"timezone,omitempty"`
}

type CRMAutomationActionJournal struct {
	ActionIndex int64  `json:"action_index"`
	Status      string `json:"status"`
	Detail      string `json:"detail"`
	CreatedAt   string `json:"created_at"`
	UpdatedAt   string `json:"updated_at"`
}

type CRMAutomationEventType = string

type CRMAutomationRule struct {
	ID        UUID                   `json:"id"`
	Name      string                 `json:"name"`
	EventType CRMAutomationEventType `json:"event_type"`
	// Conditions — Допустимые ключи - status, stage_id, owner_id
	Conditions map[string]string     `json:"conditions"`
	Actions    []CRMAutomationAction `json:"actions"`
	IsEnabled  bool                  `json:"is_enabled"`
	CreatedBy  int64                 `json:"created_by"`
	CreatedAt  string                `json:"created_at"`
	UpdatedAt  string                `json:"updated_at"`
	// AdoptedAt — Правило перенесено на общий движок: события после этого момента исполняет правило adopted_rule_id; здесь оно не правится (409)
	AdoptedAt     *string `json:"adopted_at,omitempty"`
	AdoptedRuleID *UUID   `json:"adopted_rule_id,omitempty"`
}

type CRMAutomationRuleInput struct {
	Name       string                 `json:"name"`
	EventType  CRMAutomationEventType `json:"event_type"`
	Conditions map[string]string      `json:"conditions,omitempty"`
	Actions    []CRMAutomationAction  `json:"actions"`
	IsEnabled  *bool                  `json:"is_enabled,omitempty"`
}

type CRMAutomationRun struct {
	ID      UUID `json:"id"`
	RuleID  UUID `json:"rule_id"`
	EventID UUID `json:"event_id"`
	// RuleName — Имя правила — журнал отвечает, что сработало
	RuleName *string `json:"rule_name,omitempty"`
	// EventType — Событие, вызвавшее запуск
	EventType *string `json:"event_type,omitempty"`
	// EntityType — lead или deal — по какой записи был запуск
	EntityType   *string  `json:"entity_type,omitempty"`
	EntityID     *UUID    `json:"entity_id,omitempty"`
	Status       string   `json:"status"`
	Attempts     int64    `json:"attempts"`
	ActionErrors []string `json:"action_errors"`
	CreatedAt    string   `json:"created_at"`
	UpdatedAt    string   `json:"updated_at"`
}

// CRMCardFile — Файл, прикреплённый к лиду, сделке или клиенту
type CRMCardFile struct {
	ID         UUID   `json:"id"`
	EntityType string `json:"entity_type"`
	EntityID   UUID   `json:"entity_id"`
	// Name — Имя файла с расширением
	Name      string `json:"name"`
	MimeType  string `json:"mime_type"`
	SizeBytes int64  `json:"size_bytes"`
	// Sha256 — Контрольная сумма SHA-256, если её заявили при загрузке
	Sha256 *string `json:"sha256,omitempty"`
	// ScanStatus — Вердикт антивируса: clean и skipped скачиваются, pending - ещё проверяется, infected - заражён
	ScanStatus     string  `json:"scan_status"`
	UploadedBy     int64   `json:"uploaded_by"`
	UploadedByName *string `json:"uploaded_by_name,omitempty"`
	CreatedAt      string  `json:"created_at"`
}

// CRMCardFileList — Файлы карточки, новые сверху
type CRMCardFileList struct {
	Items []CRMCardFile `json:"items"`
}

// CRMContactRef — Узкая проекция карточки справочника ERP; CRM её не редактирует
type CRMContactRef struct {
	ID         UUID    `json:"id"`
	Name       string  `json:"name"`
	LegalName  *string `json:"legal_name,omitempty"`
	INN        *string `json:"inn,omitempty"`
	KPP        *string `json:"kpp,omitempty"`
	EntityType string  `json:"entity_type"`
	IsActive   bool    `json:"is_active"`
	// Available — false, когда карточка недоступна текущему пользователю
	Available bool `json:"available"`
}

type CRMConversionMetric struct {
	QualifiedLeads int64   `json:"qualified_leads"`
	ConvertedLeads int64   `json:"converted_leads"`
	Rate           float64 `json:"rate"`
}

type CRMConvertLeadInput struct {
	PipelineID UUID   `json:"pipeline_id"`
	StageID    UUID   `json:"stage_id"`
	Title      string `json:"title"`
	// Amount — Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
	Amount          *string `json:"amount,omitempty"`
	Currency        *string `json:"currency,omitempty"`
	Probability     *int64  `json:"probability,omitempty"`
	ExpectedCloseAt *string `json:"expected_close_at,omitempty"`
}

type CRMCreateEventLinkInput struct {
	Title       string  `json:"title"`
	Description *string `json:"description,omitempty"`
	StartsAt    string  `json:"starts_at"`
	EndsAt      string  `json:"ends_at"`
	// Timezone — IANA-зона события
	Timezone *string `json:"timezone,omitempty"`
}

type CRMCreateTaskLinkInput struct {
	SectionID   UUID    `json:"section_id"`
	Title       string  `json:"title"`
	Description *string `json:"description,omitempty"`
	DueAt       *string `json:"due_at,omitempty"`
	// ExecutorID — Исполнитель; по умолчанию — тот, кто создаёт задачу
	ExecutorID *int64 `json:"executor_id,omitempty"`
}

type CRMCustomer struct {
	ID        UUID   `json:"id"`
	Kind      string `json:"kind"`
	Name      string `json:"name"`
	LegalName string `json:"legal_name"`
	// INN — ИНН без пробелов; пустая строка - не указан
	INN string `json:"inn"`
	// KPP — КПП в верхнем регистре; бывает только при ИНН из 10 цифр
	KPP string `json:"kpp"`
	// Phone — Основной телефон — значение основного канала phone
	Phone string `json:"phone"`
	// Email — Основная почта — значение основного канала email
	Email string `json:"email"`
	// Messengers — Ник или номер клиента по мессенджерам
	Messengers map[string]string `json:"messengers"`
	// Channels — Все телефоны, почты и мессенджеры клиента
	Channels      []CRMCustomerChannel `json:"channels"`
	Tags          []string             `json:"tags"`
	Source        string               `json:"source"`
	OwnerID       *int64               `json:"owner_id,omitempty"`
	OwnerName     *string              `json:"owner_name,omitempty"`
	Note          string               `json:"note"`
	CoreContactID *UUID                `json:"core_contact_id,omitempty"`
	// PromotedAt — Момент переноса в справочник контрагентов ERP
	PromotedAt *string `json:"promoted_at,omitempty"`
	ArchivedAt *string `json:"archived_at,omitempty"`
	// MergedIntoCustomerID — Карточка слита с этой и лежит в архиве
	MergedIntoCustomerID *UUID `json:"merged_into_customer_id,omitempty"`
	OpenDeals            int64 `json:"open_deals"`
	// Custom — Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
	Custom    map[string]json.RawMessage `json:"custom,omitempty"`
	CreatedAt string                     `json:"created_at"`
	UpdatedAt string                     `json:"updated_at"`
}

type CRMCustomerChannel struct {
	Kind string `json:"kind"`
	// Network — Сеть мессенджера: telegram, whatsapp, max, vk и т. п.; у телефона и почты не передаётся
	Network *string `json:"network,omitempty"`
	// Value — Значение, как его ввели
	Value string `json:"value"`
	// Normalized — Вид для сравнения: телефон цифрами с кодом страны, почта и ник в нижнем регистре
	Normalized string `json:"normalized"`
	// Primary — Основной канал своего вида; он уходит в справочник контрагентов ERP
	Primary bool `json:"primary"`
}

type CRMCustomerChannelInput struct {
	Kind string `json:"kind"`
	// Network — Сеть мессенджера; обязательна для messenger
	Network *string `json:"network,omitempty"`
	// Value — Телефон в любом формате, адрес почты или ник
	Value string `json:"value"`
	// Primary — Основной канал своего вида; без отметки основным становится первый
	Primary *bool `json:"primary,omitempty"`
}

type CRMCustomerDuplicate struct {
	ID        UUID   `json:"id"`
	Kind      string `json:"kind"`
	Name      string `json:"name"`
	LegalName string `json:"legal_name"`
	// INN — ИНН без пробелов; пустая строка - не указан
	INN string `json:"inn"`
	// KPP — КПП в верхнем регистре; бывает только при ИНН из 10 цифр
	KPP string `json:"kpp"`
	// Phone — Основной телефон — значение основного канала phone
	Phone string `json:"phone"`
	// Email — Основная почта — значение основного канала email
	Email string `json:"email"`
	// Messengers — Ник или номер клиента по мессенджерам
	Messengers map[string]string `json:"messengers"`
	// Channels — Все телефоны, почты и мессенджеры клиента
	Channels      []CRMCustomerChannel `json:"channels"`
	Tags          []string             `json:"tags"`
	Source        string               `json:"source"`
	OwnerID       *int64               `json:"owner_id,omitempty"`
	OwnerName     *string              `json:"owner_name,omitempty"`
	Note          string               `json:"note"`
	CoreContactID *UUID                `json:"core_contact_id,omitempty"`
	// PromotedAt — Момент переноса в справочник контрагентов ERP
	PromotedAt *string `json:"promoted_at,omitempty"`
	ArchivedAt *string `json:"archived_at,omitempty"`
	// MergedIntoCustomerID — Карточка слита с этой и лежит в архиве
	MergedIntoCustomerID *UUID `json:"merged_into_customer_id,omitempty"`
	OpenDeals            int64 `json:"open_deals"`
	// Custom — Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
	Custom    map[string]json.RawMessage `json:"custom,omitempty"`
	CreatedAt string                     `json:"created_at"`
	UpdatedAt string                     `json:"updated_at"`
	MatchedBy string                     `json:"matched_by"`
}

type CRMCustomerDuplicateGroup struct {
	MatchedBy string `json:"matched_by"`
	// Value — Общее значение признака: ИНН/КПП, последние десять цифр телефона, почта или имя
	Value     string        `json:"value"`
	Customers []CRMCustomer `json:"customers"`
}

type CRMCustomerDuplicateRefusal struct {
	Code   string `json:"code"`
	Detail string `json:"detail"`
	// Matches — Похожие карточки; чужая карточка без права видеть чужих клиентов — только имя, вид и ответственный
	Matches []CRMCustomerDuplicate `json:"matches"`
}

type CRMCustomerInput struct {
	Kind      *string `json:"kind,omitempty"`
	Name      string  `json:"name"`
	LegalName *string `json:"legal_name,omitempty"`
	// INN — ИНН: 10 цифр у организации, 12 у предпринимателя, с верной контрольной цифрой
	INN *string `json:"inn,omitempty"`
	// KPP — КПП: девять знаков, только вместе с ИНН из 10 цифр
	KPP *string `json:"kpp,omitempty"`
	// Phone — Телефон; несколько номеров можно перечислить через запятую. Не читается, если передан channels
	Phone *string `json:"phone,omitempty"`
	// Email — Почта; не читается, если передан channels
	Email *string `json:"email,omitempty"`
	// Messengers — Мессенджеры объектом «сеть → ник»; не читаются, если передан channels
	Messengers map[string]string `json:"messengers,omitempty"`
	// Channels — Полный список каналов связи; главнее полей phone, email и messengers
	Channels []CRMCustomerChannelInput `json:"channels,omitempty"`
	Tags     []string                  `json:"tags,omitempty"`
	Source   *string                   `json:"source,omitempty"`
	OwnerID  *int64                    `json:"owner_id,omitempty"`
	Note     *string                   `json:"note,omitempty"`
	// Custom — Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
	Custom map[string]json.RawMessage `json:"custom,omitempty"`
	// ConfirmDuplicate — Это правда новый клиент: создать, хотя телефон или почта совпали с живой карточкой. Совпадение ИНН и КПП так не обходится
	ConfirmDuplicate *bool `json:"confirm_duplicate,omitempty"`
}

type CRMCustomerPatch struct {
	Kind      *string `json:"kind,omitempty"`
	Name      *string `json:"name,omitempty"`
	LegalName *string `json:"legal_name,omitempty"`
	// INN — Пустая строка стирает ИНН
	INN *string `json:"inn,omitempty"`
	// KPP — Пустая строка стирает КПП
	KPP *string `json:"kpp,omitempty"`
	// Phone — Заменяет основной телефон, остальные номера остаются; пустая строка снимает основной
	Phone *string `json:"phone,omitempty"`
	// Email — Заменяет основную почту, остальные адреса остаются; пустая строка снимает основную
	Email *string `json:"email,omitempty"`
	// Messengers — Заменяет все мессенджеры клиента
	Messengers map[string]string `json:"messengers,omitempty"`
	// Channels — Заменяет список каналов целиком; поля phone, email и messengers при этом не читаются
	Channels []CRMCustomerChannelInput `json:"channels,omitempty"`
	Tags     []string                  `json:"tags,omitempty"`
	Source   *string                   `json:"source,omitempty"`
	OwnerID  *int64                    `json:"owner_id,omitempty"`
	Note     *string                   `json:"note,omitempty"`
	Archived *bool                     `json:"archived,omitempty"`
	// Custom — Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
	Custom map[string]json.RawMessage `json:"custom,omitempty"`
}

type CRMDeal struct {
	ID         UUID   `json:"id"`
	PipelineID UUID   `json:"pipeline_id"`
	StageID    UUID   `json:"stage_id"`
	Title      string `json:"title"`
	// Amount — Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
	Amount string `json:"amount"`
	// Currency — Код валюты из справочника ERP
	Currency string `json:"currency"`
	// Source — Канал обращения; manual для ручного заведения
	Source          string  `json:"source"`
	Probability     int64   `json:"probability"`
	ExpectedCloseAt *string `json:"expected_close_at,omitempty"`
	OwnerID         *int64  `json:"owner_id,omitempty"`
	CRMCustomerID   *UUID   `json:"crm_customer_id,omitempty"`
	NextAction      string  `json:"next_action"`
	NextActionAt    *string `json:"next_action_at,omitempty"`
	ArchivedAt      *string `json:"archived_at,omitempty"`
	ClosedAt        *string `json:"closed_at,omitempty"`
	LossReasonID    *UUID   `json:"loss_reason_id,omitempty"`
	Description     *string `json:"description,omitempty"`
	FirstMessage    *string `json:"first_message,omitempty"`
	UtmSource       *string `json:"utm_source,omitempty"`
	UtmMedium       *string `json:"utm_medium,omitempty"`
	UtmCampaign     *string `json:"utm_campaign,omitempty"`
	UtmTerm         *string `json:"utm_term,omitempty"`
	UtmContent      *string `json:"utm_content,omitempty"`
	LandingPage     *string `json:"landing_page,omitempty"`
	Referrer        *string `json:"referrer,omitempty"`
	// Custom — Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
	Custom    map[string]json.RawMessage `json:"custom,omitempty"`
	CreatedAt string                     `json:"created_at"`
	UpdatedAt string                     `json:"updated_at"`
}

type CRMDealBoard struct {
	PipelineID         UUID    `json:"pipeline_id"`
	AccountingCurrency *string `json:"accounting_currency,omitempty"`
	// TotalsAvailable — false означает, что итоги в валюте учёта неполные
	TotalsAvailable bool                `json:"totals_available"`
	MissingRates    []string            `json:"missing_rates"`
	Stages          []CRMDealBoardStage `json:"stages"`
}

type CRMDealBoardStage struct {
	Stage      CRMStage `json:"stage"`
	TotalCount int64    `json:"total_count"`
	// OriginalTotals — Суммы по валютам сделок колонки, десятичными строками
	OriginalTotals map[string]string `json:"original_totals"`
	// AmountInAccounting — Сумма в валюте учёта десятичной строкой; отсутствует при неполном покрытии курсами
	AmountInAccounting   *string       `json:"amount_in_accounting,omitempty"`
	WeightedInAccounting *string       `json:"weighted_in_accounting,omitempty"`
	Cards                []CRMDealCard `json:"cards"`
	HasMore              bool          `json:"has_more"`
}

type CRMDealCard struct {
	ID         UUID   `json:"id"`
	PipelineID UUID   `json:"pipeline_id"`
	StageID    UUID   `json:"stage_id"`
	Title      string `json:"title"`
	// Amount — Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
	Amount string `json:"amount"`
	// Currency — Код валюты из справочника ERP
	Currency string `json:"currency"`
	// Source — Канал обращения; manual для ручного заведения
	Source          string  `json:"source"`
	Probability     int64   `json:"probability"`
	ExpectedCloseAt *string `json:"expected_close_at,omitempty"`
	OwnerID         *int64  `json:"owner_id,omitempty"`
	CRMCustomerID   *UUID   `json:"crm_customer_id,omitempty"`
	NextAction      string  `json:"next_action"`
	NextActionAt    *string `json:"next_action_at,omitempty"`
	ArchivedAt      *string `json:"archived_at,omitempty"`
	ClosedAt        *string `json:"closed_at,omitempty"`
	LossReasonID    *UUID   `json:"loss_reason_id,omitempty"`
	Description     *string `json:"description,omitempty"`
	FirstMessage    *string `json:"first_message,omitempty"`
	UtmSource       *string `json:"utm_source,omitempty"`
	UtmMedium       *string `json:"utm_medium,omitempty"`
	UtmCampaign     *string `json:"utm_campaign,omitempty"`
	UtmTerm         *string `json:"utm_term,omitempty"`
	UtmContent      *string `json:"utm_content,omitempty"`
	LandingPage     *string `json:"landing_page,omitempty"`
	Referrer        *string `json:"referrer,omitempty"`
	// Custom — Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
	Custom       map[string]json.RawMessage `json:"custom,omitempty"`
	CreatedAt    string                     `json:"created_at"`
	UpdatedAt    string                     `json:"updated_at"`
	CustomerName *string                    `json:"customer_name,omitempty"`
	OwnerName    *string                    `json:"owner_name,omitempty"`
	// StageSince — Когда сделка встала на текущий этап; от этого момента считается норматив этапа
	StageSince *string `json:"stage_since,omitempty"`
}

type CRMDealContact struct {
	ID        UUID   `json:"id"`
	DealID    UUID   `json:"deal_id"`
	ContactID UUID   `json:"contact_id"`
	IsPrimary bool   `json:"is_primary"`
	CreatedAt string `json:"created_at"`
}

type CRMDealInput struct {
	PipelineID UUID   `json:"pipeline_id"`
	StageID    UUID   `json:"stage_id"`
	Title      string `json:"title"`
	// Amount — Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
	Amount *string `json:"amount,omitempty"`
	// Currency — Обязателен при ненулевой сумме
	Currency        *string `json:"currency,omitempty"`
	Source          *string `json:"source,omitempty"`
	Description     *string `json:"description,omitempty"`
	Probability     *int64  `json:"probability,omitempty"`
	ExpectedCloseAt *string `json:"expected_close_at,omitempty"`
	OwnerID         *int64  `json:"owner_id,omitempty"`
	// CustomerID — Прежний вход: контрагент справочника ERP. Сервер находит или заводит по нему клиента CRM и записывает crm_customer_id; в ответе поля нет.
	CustomerID    *string `json:"customer_id,omitempty"`
	CRMCustomerID *string `json:"crm_customer_id,omitempty"`
	NextAction    *string `json:"next_action,omitempty"`
	NextActionAt  *string `json:"next_action_at,omitempty"`
	// Custom — Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
	Custom map[string]json.RawMessage `json:"custom,omitempty"`
}

type CRMDealItem struct {
	ID       UUID   `json:"id"`
	DealID   UUID   `json:"deal_id"`
	Position int64  `json:"position"`
	Name     string `json:"name"`
	// ProductID — Ссылка на номенклатуру необязательна - на этапе расчёта половина строк ещё не заведена в каталоге
	ProductID *UUID   `json:"product_id,omitempty"`
	Quantity  float64 `json:"quantity"`
	Unit      string  `json:"unit"`
	// Price — Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
	Price           string  `json:"price"`
	DiscountPercent float64 `json:"discount_percent"`
	// Total — Сумма строки со скидкой; считает сервер, чтобы клиенты не разошлись на округлении
	Total     int64  `json:"total"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type CRMDealPatch struct {
	Title *string `json:"title,omitempty"`
	// Amount — Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
	Amount          *string `json:"amount,omitempty"`
	Currency        *string `json:"currency,omitempty"`
	Source          *string `json:"source,omitempty"`
	Description     *string `json:"description,omitempty"`
	Probability     *int64  `json:"probability,omitempty"`
	ExpectedCloseAt *string `json:"expected_close_at,omitempty"`
	OwnerID         *int64  `json:"owner_id,omitempty"`
	// CustomerID — Прежний вход: контрагент справочника ERP. Сервер находит или заводит по нему клиента CRM и записывает crm_customer_id; в ответе поля нет.
	CustomerID    *string `json:"customer_id,omitempty"`
	CRMCustomerID *string `json:"crm_customer_id,omitempty"`
	NextAction    *string `json:"next_action,omitempty"`
	NextActionAt  *string `json:"next_action_at,omitempty"`
	// Custom — Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
	Custom   map[string]json.RawMessage `json:"custom,omitempty"`
	Archived *bool                      `json:"archived,omitempty"`
}

type CRMDealStageHistory struct {
	ID          UUID  `json:"id"`
	DealID      UUID  `json:"deal_id"`
	FromStageID *UUID `json:"from_stage_id,omitempty"`
	ToStageID   UUID  `json:"to_stage_id"`
	ChangedBy   int64 `json:"changed_by"`
	// Kind — Вид записи: created - сделка заведена, move - перенос по этапам, pipeline_change - перенос в другую воронку, reopen - повторное открытие закрытой сделки
	Kind string `json:"kind"`
	// Reason — Причина; заполнена у повторного открытия
	Reason    *string `json:"reason,omitempty"`
	CreatedAt string  `json:"created_at"`
}

type CRMEngagement struct {
	ID         UUID              `json:"id"`
	EntityType string            `json:"entity_type"`
	EntityID   UUID              `json:"entity_id"`
	Kind       CRMEngagementKind `json:"kind"`
	Title      string            `json:"title"`
	// Description — Подробности дела: что обсудить, адрес встречи
	Description string  `json:"description"`
	DueAt       *string `json:"due_at,omitempty"`
	// DoneAt — Пусто, пока дело не выполнено
	DoneAt *string `json:"done_at,omitempty"`
	// RemindAt — Когда напомнить ответственному
	RemindAt *string `json:"remind_at,omitempty"`
	// RemindedAt — Когда напоминание ушло в центр уведомлений
	RemindedAt *string             `json:"reminded_at,omitempty"`
	Repeat     CRMEngagementRepeat `json:"repeat"`
	// CalendarEventID — Событие календаря, заведённое из дела
	CalendarEventID *UUID `json:"calendar_event_id,omitempty"`
	// TaskID — Задача модуля «Задачи», заведённая из дела
	TaskID    *UUID   `json:"task_id,omitempty"`
	OwnerID   *int64  `json:"owner_id,omitempty"`
	OwnerName *string `json:"owner_name,omitempty"`
	// EntityTitle — Название карточки дела (в списке «Мои дела»)
	EntityTitle *string `json:"entity_title,omitempty"`
	// Warnings — Дело сохранено, но событие календаря не заведено или не обновлено
	Warnings  []string `json:"warnings,omitempty"`
	CreatedBy int64    `json:"created_by"`
	CreatedAt string   `json:"created_at"`
	UpdatedAt string   `json:"updated_at"`
}

type CRMEngagementInput struct {
	Kind  *CRMEngagementKind `json:"kind,omitempty"`
	Title string             `json:"title"`
	// Description — Подробности дела
	Description *string `json:"description,omitempty"`
	DueAt       *string `json:"due_at,omitempty"`
	// RemindAt — Когда напомнить ответственному; не позже срока
	RemindAt *string              `json:"remind_at,omitempty"`
	Repeat   *CRMEngagementRepeat `json:"repeat,omitempty"`
	// OwnerID — По умолчанию - вызывающий сотрудник
	OwnerID *int64 `json:"owner_id,omitempty"`
	// InCalendar — Поставить дело событием в календарь ответственного; нужен срок
	InCalendar *bool `json:"in_calendar,omitempty"`
}

type CRMEngagementKind = string

type CRMEngagementKindItem struct {
	// Code — Код вида: то, что ложится в kind дела; после заведения не меняется
	Code string `json:"code"`
	// Label — Подпись вида - право кабинета
	Label     string `json:"label"`
	SortOrder int64  `json:"sort_order"`
	// IsActive — Выключенный вид не предлагается для новых дел, но подписывает старые
	IsActive bool `json:"is_active"`
}

type CRMEngagementPatch struct {
	Kind  *CRMEngagementKind `json:"kind,omitempty"`
	Title *string            `json:"title,omitempty"`
	// Description — Подробности дела
	Description *string `json:"description,omitempty"`
	// DueAt — null снимает срок
	DueAt *string `json:"due_at,omitempty"`
	// RemindAt — null снимает напоминание; новое время снова ставит его в очередь
	RemindAt *string              `json:"remind_at,omitempty"`
	Repeat   *CRMEngagementRepeat `json:"repeat,omitempty"`
	OwnerID  *int64               `json:"owner_id,omitempty"`
	// Done — true закрывает дело, false возвращает в работу; закрытие повторяющегося дела заводит следующее
	Done *bool `json:"done,omitempty"`
	// InCalendar — true ставит в календарь дело, у которого события ещё нет
	InCalendar *bool `json:"in_calendar,omitempty"`
}

type CRMEngagementRepeat = string

type CRMEngagementTaskInput struct {
	SectionID UUID `json:"section_id"`
	// Title — Название задачи; по умолчанию - название дела
	Title *string `json:"title,omitempty"`
	// Description — Описание задачи; по умолчанию - подробности дела
	Description *string `json:"description,omitempty"`
	// DueAt — Срок задачи; по умолчанию - срок дела
	DueAt *string `json:"due_at,omitempty"`
	// ExecutorID — Исполнитель; по умолчанию - ответственный за дело
	ExecutorID *int64 `json:"executor_id,omitempty"`
}

// CRMExternalLink — Указатель CRM на запись другого модуля; владельцем записи остаётся тот модуль
type CRMExternalLink struct {
	ID         UUID   `json:"id"`
	EntityType string `json:"entity_type"`
	EntityID   UUID   `json:"entity_id"`
	LinkType   string `json:"link_type"`
	ExternalID UUID   `json:"external_id"`
	CreatedAt  string `json:"created_at"`
}

type CRMImportFileInfo struct {
	Filename string               `json:"filename"`
	Format   string               `json:"format"`
	Sheets   []CRMImportSheetInfo `json:"sheets"`
	// Warnings — Сколько ячеек с формулами прочитано по сохранённому значению
	Warnings int64 `json:"warnings"`
}

type CRMImportSheetInfo struct {
	Name      string     `json:"name"`
	Rows      int64      `json:"rows"`
	HeaderRow int64      `json:"header_row"`
	Headers   []string   `json:"headers"`
	Sample    [][]string `json:"sample"`
	// Suggested — Заголовок -> предложенное поле
	Suggested map[string]string `json:"suggested,omitempty"`
}

type CRMInboxAssignInput struct {
	// AssignedTo — null снимает назначение
	AssignedTo *int64 `json:"assigned_to,omitempty"`
}

type CRMInboxAttachment struct {
	ID          UUID               `json:"id"`
	MessageID   UUID               `json:"message_id"`
	Filename    string             `json:"filename"`
	ContentType string             `json:"content_type"`
	SizeBytes   int64              `json:"size_bytes"`
	ScanStatus  CRMInboxScanStatus `json:"scan_status"`
	CreatedAt   string             `json:"created_at"`
}

type CRMInboxConnection struct {
	ID UUID `json:"id"`
	// PublicID — Публичный идентификатор для адреса вебхука провайдера
	PublicID UUID                       `json:"public_id"`
	Provider string                     `json:"provider"`
	Name     string                     `json:"name"`
	Status   string                     `json:"status"`
	Settings map[string]json.RawMessage `json:"settings"`
	// CredentialsConfigured — Сами учётные данные не возвращаются никогда
	CredentialsConfigured bool    `json:"credentials_configured"`
	CheckedAt             *string `json:"checked_at,omitempty"`
	LastErrorCode         *string `json:"last_error_code,omitempty"`
	CreatedAt             string  `json:"created_at"`
	UpdatedAt             string  `json:"updated_at"`
}

type CRMInboxConversation struct {
	ID                 UUID                       `json:"id"`
	ConnectionID       UUID                       `json:"connection_id"`
	ExternalIdentityID UUID                       `json:"external_identity_id"`
	ExternalChatID     string                     `json:"external_chat_id"`
	Subject            string                     `json:"subject"`
	AssignedTo         *int64                     `json:"assigned_to,omitempty"`
	UnreadCount        int64                      `json:"unread_count"`
	SLADueAt           *string                    `json:"sla_due_at,omitempty"`
	Status             CRMInboxConversationStatus `json:"status"`
	LastMessageAt      *string                    `json:"last_message_at,omitempty"`
	CreatedAt          string                     `json:"created_at"`
	UpdatedAt          string                     `json:"updated_at"`
}

type CRMInboxConversationLink struct {
	ID             UUID   `json:"id"`
	ConversationID UUID   `json:"conversation_id"`
	EntityType     string `json:"entity_type"`
	EntityID       UUID   `json:"entity_id"`
	CreatedAt      string `json:"created_at"`
}

type CRMInboxConversationStatus = string

type CRMInboxDealInput struct {
	Title      string `json:"title"`
	PipelineID UUID   `json:"pipeline_id"`
	StageID    UUID   `json:"stage_id"`
	// Amount — Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
	Amount   *string `json:"amount,omitempty"`
	Currency *string `json:"currency,omitempty"`
}

type CRMInboxEntityMessage struct {
	ID                UUID    `json:"id"`
	ConversationID    UUID    `json:"conversation_id"`
	Direction         string  `json:"direction"`
	ProviderMessageID *string `json:"provider_message_id,omitempty"`
	Body              string  `json:"body"`
	Status            string  `json:"status"`
	SentBy            *int64  `json:"sent_by,omitempty"`
	CreatedAt         string  `json:"created_at"`
	// AttachmentCount — Сколько файлов у сообщения; список — GET /api/v1/crm/inbox/messages/{id}/attachments
	AttachmentCount *int64 `json:"attachment_count,omitempty"`
	Provider        string `json:"provider"`
	ConnectionName  string `json:"connection_name"`
}

type CRMInboxLinkConversationInput struct {
	ConversationID UUID `json:"conversation_id"`
}

type CRMInboxLinkedConversation struct {
	ID                 UUID                       `json:"id"`
	ConnectionID       UUID                       `json:"connection_id"`
	ExternalIdentityID UUID                       `json:"external_identity_id"`
	ExternalChatID     string                     `json:"external_chat_id"`
	Subject            string                     `json:"subject"`
	AssignedTo         *int64                     `json:"assigned_to,omitempty"`
	UnreadCount        int64                      `json:"unread_count"`
	SLADueAt           *string                    `json:"sla_due_at,omitempty"`
	Status             CRMInboxConversationStatus `json:"status"`
	LastMessageAt      *string                    `json:"last_message_at,omitempty"`
	CreatedAt          string                     `json:"created_at"`
	UpdatedAt          string                     `json:"updated_at"`
	Provider           string                     `json:"provider"`
	ConnectionName     string                     `json:"connection_name"`
}

type CRMInboxMessage struct {
	ID                UUID    `json:"id"`
	ConversationID    UUID    `json:"conversation_id"`
	Direction         string  `json:"direction"`
	ProviderMessageID *string `json:"provider_message_id,omitempty"`
	Body              string  `json:"body"`
	Status            string  `json:"status"`
	SentBy            *int64  `json:"sent_by,omitempty"`
	CreatedAt         string  `json:"created_at"`
	// AttachmentCount — Сколько файлов у сообщения; список — GET /api/v1/crm/inbox/messages/{id}/attachments
	AttachmentCount *int64 `json:"attachment_count,omitempty"`
}

type CRMInboxOutboundUpload struct {
	ID             UUID   `json:"id"`
	ConversationID UUID   `json:"conversation_id"`
	Filename       string `json:"filename"`
	ContentType    string `json:"content_type"`
	SizeBytes      int64  `json:"size_bytes"`
	// Sha256 — Контрольная сумма, посчитанная на завершении сессии; у загрузки формой её нет
	Sha256     *string            `json:"sha256,omitempty"`
	ScanStatus CRMInboxScanStatus `json:"scan_status"`
	ExpiresAt  string             `json:"expires_at"`
}

type CRMInboxProvider struct {
	Key          string                       `json:"key"`
	Label        string                       `json:"label"`
	Connectable  bool                         `json:"connectable"`
	Notice       *string                      `json:"notice,omitempty"`
	Fields       []CRMInboxProviderField      `json:"fields"`
	Capabilities CRMInboxProviderCapabilities `json:"capabilities"`
}

type CRMInboxProviderCapabilities struct {
	Inbound   bool `json:"inbound"`
	Send      bool `json:"send"`
	Files     bool `json:"files"`
	Reply     bool `json:"reply"`
	Edit      bool `json:"edit"`
	Delete    bool `json:"delete"`
	Reactions bool `json:"reactions"`
	Delivered bool `json:"delivered"`
	Read      bool `json:"read"`
	Sync      bool `json:"sync"`
}

type CRMInboxProviderField struct {
	Key      string `json:"key"`
	Label    string `json:"label"`
	Type     string `json:"type"`
	Required bool   `json:"required"`
	// Secret — true - значение хранится зашифрованным и не возвращается
	Secret bool    `json:"secret"`
	Help   *string `json:"help,omitempty"`
}

type CRMInboxScanStatus = string

type CRMInboxSendInput struct {
	Body *string `json:"body,omitempty"`
	// UploadIds — Идентификаторы заранее загруженных файлов: id из crmFinishInboxUploadSession (сессия загрузки) или из crmUploadInboxOutboundFile (форма)
	UploadIds []UUID `json:"upload_ids,omitempty"`
}

type CRMInboxTemplate struct {
	ID        UUID   `json:"id"`
	Name      string `json:"name"`
	Body      string `json:"body"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type CRMInboxTemplateInput struct {
	Name string `json:"name"`
	Body string `json:"body"`
}

type CRMLabelKey = string

type CRMLead struct {
	ID    UUID   `json:"id"`
	Title string `json:"title"`
	// Source — Канал обращения; по нему собирается аналитика источников
	Source string `json:"source"`
	// Description — Заметка менеджера о заявке
	Description string `json:"description"`
	// FirstMessage — Что написал или сказал клиент - слова самого обращения, а не пересказ
	FirstMessage string `json:"first_message"`
	// ContactHandle — Ник, номер или адрес в канале, пока карточка клиента не заведена
	ContactHandle       string        `json:"contact_handle"`
	ReferenceID         *UUID         `json:"reference_id,omitempty"`
	OwnerID             *int64        `json:"owner_id,omitempty"`
	StageID             *UUID         `json:"stage_id,omitempty"`
	CRMCustomerID       *UUID         `json:"crm_customer_id,omitempty"`
	NextAction          string        `json:"next_action"`
	NextActionAt        *string       `json:"next_action_at,omitempty"`
	ArchivedAt          *string       `json:"archived_at,omitempty"`
	Status              CRMLeadStatus `json:"status"`
	QualificationReason *string       `json:"qualification_reason,omitempty"`
	RejectReasonID      *UUID         `json:"reject_reason_id,omitempty"`
	ConvertedDealID     *UUID         `json:"converted_deal_id,omitempty"`
	// MergedIntoLeadID — Во что вошло это обращение при слиянии дублей; заполнено только у архивной записи-источника
	MergedIntoLeadID *UUID   `json:"merged_into_lead_id,omitempty"`
	UtmSource        *string `json:"utm_source,omitempty"`
	UtmMedium        *string `json:"utm_medium,omitempty"`
	UtmCampaign      *string `json:"utm_campaign,omitempty"`
	UtmTerm          *string `json:"utm_term,omitempty"`
	UtmContent       *string `json:"utm_content,omitempty"`
	LandingPage      *string `json:"landing_page,omitempty"`
	Referrer         *string `json:"referrer,omitempty"`
	// Custom — Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
	Custom    map[string]json.RawMessage `json:"custom,omitempty"`
	CreatedAt string                     `json:"created_at"`
	UpdatedAt string                     `json:"updated_at"`
}

type CRMLeadBoard struct {
	Stages []CRMLeadBoardStage `json:"stages"`
}

type CRMLeadBoardStage struct {
	Stage CRMLeadStage `json:"stage"`
	// TotalCount — Сколько лидов отбора стоит на этапе
	TotalCount int64         `json:"total_count"`
	Cards      []CRMLeadCard `json:"cards"`
	// HasMore — На этапе больше лидов, чем карточек в ответе
	HasMore bool `json:"has_more"`
}

// CRMLeadCard — Лид для экрана: тот же лид плюс человек за обращением и ответственный читаемыми именами
type CRMLeadCard struct {
	ID    UUID   `json:"id"`
	Title string `json:"title"`
	// Source — Канал обращения; по нему собирается аналитика источников
	Source string `json:"source"`
	// Description — Заметка менеджера о заявке
	Description string `json:"description"`
	// FirstMessage — Что написал или сказал клиент - слова самого обращения, а не пересказ
	FirstMessage string `json:"first_message"`
	// ContactHandle — Ник, номер или адрес в канале, пока карточка клиента не заведена
	ContactHandle       string        `json:"contact_handle"`
	ReferenceID         *UUID         `json:"reference_id,omitempty"`
	OwnerID             *int64        `json:"owner_id,omitempty"`
	StageID             *UUID         `json:"stage_id,omitempty"`
	CRMCustomerID       *UUID         `json:"crm_customer_id,omitempty"`
	NextAction          string        `json:"next_action"`
	NextActionAt        *string       `json:"next_action_at,omitempty"`
	ArchivedAt          *string       `json:"archived_at,omitempty"`
	Status              CRMLeadStatus `json:"status"`
	QualificationReason *string       `json:"qualification_reason,omitempty"`
	RejectReasonID      *UUID         `json:"reject_reason_id,omitempty"`
	ConvertedDealID     *UUID         `json:"converted_deal_id,omitempty"`
	// MergedIntoLeadID — Во что вошло это обращение при слиянии дублей; заполнено только у архивной записи-источника
	MergedIntoLeadID *UUID   `json:"merged_into_lead_id,omitempty"`
	UtmSource        *string `json:"utm_source,omitempty"`
	UtmMedium        *string `json:"utm_medium,omitempty"`
	UtmCampaign      *string `json:"utm_campaign,omitempty"`
	UtmTerm          *string `json:"utm_term,omitempty"`
	UtmContent       *string `json:"utm_content,omitempty"`
	LandingPage      *string `json:"landing_page,omitempty"`
	Referrer         *string `json:"referrer,omitempty"`
	// Custom — Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
	Custom             map[string]json.RawMessage `json:"custom,omitempty"`
	CreatedAt          string                     `json:"created_at"`
	UpdatedAt          string                     `json:"updated_at"`
	CustomerName       *string                    `json:"customer_name,omitempty"`
	CustomerPhone      *string                    `json:"customer_phone,omitempty"`
	CustomerMessengers map[string]string          `json:"customer_messengers,omitempty"`
	OwnerName          *string                    `json:"owner_name,omitempty"`
	RejectReason       *string                    `json:"reject_reason,omitempty"`
}

type CRMLeadDecision struct {
	ID        UUID    `json:"id"`
	LeadID    UUID    `json:"lead_id"`
	Decision  string  `json:"decision"`
	Reason    *string `json:"reason,omitempty"`
	DealID    *UUID   `json:"deal_id,omitempty"`
	ChangedBy int64   `json:"changed_by"`
	CreatedAt string  `json:"created_at"`
}

// CRMLeadDuplicate — Обращение, похожее на заданное, и признак, по которому похоже
type CRMLeadDuplicate struct {
	ID    UUID   `json:"id"`
	Title string `json:"title"`
	// Source — Канал обращения; по нему собирается аналитика источников
	Source string `json:"source"`
	// Description — Заметка менеджера о заявке
	Description string `json:"description"`
	// FirstMessage — Что написал или сказал клиент - слова самого обращения, а не пересказ
	FirstMessage string `json:"first_message"`
	// ContactHandle — Ник, номер или адрес в канале, пока карточка клиента не заведена
	ContactHandle       string        `json:"contact_handle"`
	ReferenceID         *UUID         `json:"reference_id,omitempty"`
	OwnerID             *int64        `json:"owner_id,omitempty"`
	StageID             *UUID         `json:"stage_id,omitempty"`
	CRMCustomerID       *UUID         `json:"crm_customer_id,omitempty"`
	NextAction          string        `json:"next_action"`
	NextActionAt        *string       `json:"next_action_at,omitempty"`
	ArchivedAt          *string       `json:"archived_at,omitempty"`
	Status              CRMLeadStatus `json:"status"`
	QualificationReason *string       `json:"qualification_reason,omitempty"`
	RejectReasonID      *UUID         `json:"reject_reason_id,omitempty"`
	ConvertedDealID     *UUID         `json:"converted_deal_id,omitempty"`
	// MergedIntoLeadID — Во что вошло это обращение при слиянии дублей; заполнено только у архивной записи-источника
	MergedIntoLeadID *UUID   `json:"merged_into_lead_id,omitempty"`
	UtmSource        *string `json:"utm_source,omitempty"`
	UtmMedium        *string `json:"utm_medium,omitempty"`
	UtmCampaign      *string `json:"utm_campaign,omitempty"`
	UtmTerm          *string `json:"utm_term,omitempty"`
	UtmContent       *string `json:"utm_content,omitempty"`
	LandingPage      *string `json:"landing_page,omitempty"`
	Referrer         *string `json:"referrer,omitempty"`
	// Custom — Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
	Custom             map[string]json.RawMessage `json:"custom,omitempty"`
	CreatedAt          string                     `json:"created_at"`
	UpdatedAt          string                     `json:"updated_at"`
	CustomerName       *string                    `json:"customer_name,omitempty"`
	CustomerPhone      *string                    `json:"customer_phone,omitempty"`
	CustomerMessengers map[string]string          `json:"customer_messengers,omitempty"`
	OwnerName          *string                    `json:"owner_name,omitempty"`
	RejectReason       *string                    `json:"reject_reason,omitempty"`
}

type CRMLeadInput struct {
	Title         string  `json:"title"`
	Source        *string `json:"source,omitempty"`
	Description   *string `json:"description,omitempty"`
	FirstMessage  *string `json:"first_message,omitempty"`
	ContactHandle *string `json:"contact_handle,omitempty"`
	ReferenceID   *string `json:"reference_id,omitempty"`
	OwnerID       *int64  `json:"owner_id,omitempty"`
	// CustomerID — Прежний вход: контрагент справочника ERP. Сервер находит или заводит по нему клиента CRM и записывает crm_customer_id; в ответе поля нет.
	CustomerID    *string `json:"customer_id,omitempty"`
	CRMCustomerID *string `json:"crm_customer_id,omitempty"`
	NextAction    *string `json:"next_action,omitempty"`
	NextActionAt  *string `json:"next_action_at,omitempty"`
	// Custom — Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
	Custom      map[string]json.RawMessage `json:"custom,omitempty"`
	UtmSource   *string                    `json:"utm_source,omitempty"`
	UtmMedium   *string                    `json:"utm_medium,omitempty"`
	UtmCampaign *string                    `json:"utm_campaign,omitempty"`
	UtmTerm     *string                    `json:"utm_term,omitempty"`
	UtmContent  *string                    `json:"utm_content,omitempty"`
	LandingPage *string                    `json:"landing_page,omitempty"`
	Referrer    *string                    `json:"referrer,omitempty"`
}

type CRMLeadLockMode = string

type CRMLeadPatch struct {
	Title         *string `json:"title,omitempty"`
	Source        *string `json:"source,omitempty"`
	Description   *string `json:"description,omitempty"`
	FirstMessage  *string `json:"first_message,omitempty"`
	ContactHandle *string `json:"contact_handle,omitempty"`
	ReferenceID   *string `json:"reference_id,omitempty"`
	OwnerID       *int64  `json:"owner_id,omitempty"`
	// CustomerID — Прежний вход: контрагент справочника ERP. Сервер находит или заводит по нему клиента CRM и записывает crm_customer_id; в ответе поля нет.
	CustomerID    *string `json:"customer_id,omitempty"`
	CRMCustomerID *string `json:"crm_customer_id,omitempty"`
	NextAction    *string `json:"next_action,omitempty"`
	NextActionAt  *string `json:"next_action_at,omitempty"`
	Archived      *bool   `json:"archived,omitempty"`
	// Custom — Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
	Custom map[string]json.RawMessage `json:"custom,omitempty"`
}

type CRMLeadStage struct {
	ID UUID `json:"id"`
	// Name — Имя этапа задаёт кабинет; код на конкретные имена не ссылается
	Name      string       `json:"name"`
	LabelKey  *CRMLabelKey `json:"label_key,omitempty"`
	SortOrder int64        `json:"sort_order"`
	// IsActive — Ненужный этап выключают, а не удаляют
	IsActive bool                `json:"is_active"`
	Meaning  CRMLeadStageMeaning `json:"meaning"`
	// Color — Цвет этапа #RRGGBB; пусто - цвет по умолчанию
	Color     *string `json:"color,omitempty"`
	CreatedAt string  `json:"created_at"`
	UpdatedAt string  `json:"updated_at"`
}

type CRMLeadStageInput struct {
	Name    string               `json:"name"`
	Meaning *CRMLeadStageMeaning `json:"meaning,omitempty"`
	// Color — Цвет этапа #RRGGBB; пусто - цвет по умолчанию
	Color *string `json:"color,omitempty"`
}

type CRMLeadStageMeaning = string

type CRMLeadStagePatch struct {
	Name     *string              `json:"name,omitempty"`
	IsActive *bool                `json:"is_active,omitempty"`
	Meaning  *CRMLeadStageMeaning `json:"meaning,omitempty"`
	// Color — Цвет этапа #RRGGBB; пусто - цвет по умолчанию
	Color *string `json:"color,omitempty"`
}

type CRMLeadStatus = string

type CRMLeadSummary struct {
	// Unsorted — Лиды в очереди разбора: статус new вне архива, видимые читающему
	Unsorted int64 `json:"unsorted"`
}

type CRMLossReason struct {
	ID   UUID   `json:"id"`
	Name string `json:"name"`
	// Kind — Из какого справочника запись: deal - crm_loss_reason (почему проиграна сделка), lead - crm_lead_reject_reason (почему лид оказался не наш)
	Kind      string `json:"kind"`
	IsActive  bool   `json:"is_active"`
	CreatedAt string `json:"created_at"`
}

type CRMLossReasonInput struct {
	Name string  `json:"name"`
	Kind *string `json:"kind,omitempty"`
}

type CRMLossReasonMetric struct {
	ID    *string `json:"id,omitempty"`
	Name  string  `json:"name"`
	Count int64   `json:"count"`
	// Amount — Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
	Amount string `json:"amount"`
}

type CRMManagerWorkload struct {
	OwnerID           int64   `json:"owner_id"`
	OwnerName         *string `json:"owner_name,omitempty"`
	OpenLeads         int64   `json:"open_leads"`
	OpenDeals         int64   `json:"open_deals"`
	OpenConversations int64   `json:"open_conversations"`
	WonDeals          int64   `json:"won_deals"`
	// WonAmount — Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
	WonAmount string `json:"won_amount"`
	LostDeals int64  `json:"lost_deals"`
	// PlanAmount — Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
	PlanAmount *string `json:"plan_amount,omitempty"`
	// WonAmountMonth — Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
	WonAmountMonth *string `json:"won_amount_month,omitempty"`
}

type CRMMergeCustomersInput struct {
	// Sources — Карточки, которые сливаются в эту
	Sources []UUID `json:"sources"`
}

// CRMMergeLeadsInput — Какие обращения свести в это
type CRMMergeLeadsInput struct {
	// SourceIds — Источники: уходят в архив со ссылкой на цель, их переписка и дела переезжают
	SourceIds []UUID `json:"source_ids"`
}

type CRMMoveDealInput struct {
	StageID UUID `json:"stage_id"`
	// PipelineID — Целевая воронка. Пусто или текущая - перенос по этапам своей воронки; другая - сделка переезжает в неё, а stage_id должен быть этапом целевой воронки. Закрытую сделку не переносят
	PipelineID *string `json:"pipeline_id,omitempty"`
	// LossReasonID — Обязательна для стадии категории lost
	LossReasonID *string `json:"loss_reason_id,omitempty"`
}

type CRMNoteInput struct {
	Text string `json:"text"`
	// MentionedUserIds — Упомянутые коллеги — номера сотрудников из GET /api/v1/crm/members. Засчитывается тот, чьё «@Имя» стоит в тексте заметки
	MentionedUserIds []int64 `json:"mentioned_user_ids,omitempty"`
}

// CRMOverview — Сводка менеджера; «мои» - записи с owner_id текущего пользователя
type CRMOverview struct {
	OpenLeads     []CRMLead             `json:"open_leads"`
	OpenDeals     []CRMDeal             `json:"open_deals"`
	PipelineStats []CRMPipelineOverview `json:"pipeline_stats"`
}

type CRMPipeline struct {
	ID        UUID         `json:"id"`
	Name      string       `json:"name"`
	LabelKey  *CRMLabelKey `json:"label_key,omitempty"`
	SortOrder int64        `json:"sort_order"`
	IsDefault bool         `json:"is_default"`
	IsActive  bool         `json:"is_active"`
	// BusinessID — Бизнес воронки: её сделки, лиды, ставшие такими сделками, и привязанные диалоги видят участники, чья область доступа касается бизнеса, и ответственные. null — воронка всего кабинета
	BusinessID *UUID      `json:"business_id"`
	Stages     []CRMStage `json:"stages,omitempty"`
	CreatedAt  string     `json:"created_at"`
	UpdatedAt  string     `json:"updated_at"`
}

type CRMPipelineInput struct {
	Name      string `json:"name"`
	IsDefault *bool  `json:"is_default,omitempty"`
	// BusinessID — Бизнес воронки. Пусто — единственный бизнес области доступа или весь кабинет (его заводит только доступ ко всем бизнесам). Бизнес вне области доступа — 403 crm.pipeline_business_forbidden
	BusinessID *UUID `json:"business_id,omitempty"`
}

type CRMPipelineOverview struct {
	PipelineID       UUID         `json:"pipeline_id"`
	PipelineName     string       `json:"pipeline_name"`
	PipelineLabelKey *CRMLabelKey `json:"pipeline_label_key,omitempty"`
	OpenCount        int64        `json:"open_count"`
	// OpenAmount — Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
	OpenAmount string             `json:"open_amount"`
	Stages     []CRMStageOverview `json:"stages,omitempty"`
}

type CRMPipelinePatch struct {
	Name      *string `json:"name,omitempty"`
	IsDefault *bool   `json:"is_default,omitempty"`
	IsActive  *bool   `json:"is_active,omitempty"`
	// BusinessID — Бизнес воронки; поле не передано — не менять, null — весь кабинет. Бизнес вне области доступа — 403 crm.pipeline_business_forbidden
	BusinessID *UUID `json:"business_id,omitempty"`
}

type CRMQualifyLeadInput struct {
	Status string `json:"status"`
	// Reason — Подробности решения свободным текстом
	Reason string `json:"reason"`
	// ReasonID — Причина из справочника вида lead - по ней строится аналитика отказов
	ReasonID *string `json:"reason_id,omitempty"`
}

type CRMReopenDealInput struct {
	StageID UUID   `json:"stage_id"`
	Reason  string `json:"reason"`
}

// CRMReorderInput — Полный порядок без повторов; частичный список отклоняется
type CRMReorderInput struct {
	Ids []UUID `json:"ids"`
}

type CRMRequiredField = string

type CRMSLAMetric struct {
	OpenDeals            int64  `json:"open_deals"`
	OverdueDeals         int64  `json:"overdue_deals"`
	OpenConversations    int64  `json:"open_conversations"`
	OverdueConversations int64  `json:"overdue_conversations"`
	CalculatedAt         string `json:"calculated_at"`
}

// CRMSalesPlan — План продаж на месяц. Пустой owner_id - план на весь отдел
type CRMSalesPlan struct {
	ID        UUID    `json:"id"`
	OwnerID   *int64  `json:"owner_id,omitempty"`
	OwnerName *string `json:"owner_name,omitempty"`
	// Period — Первое число месяца
	Period string `json:"period"`
	// Amount — Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
	Amount   string `json:"amount"`
	Currency string `json:"currency"`
}

// CRMSalesPlansInput — Планы месяца целиком: сохранение переписывает месяц, план с нулём убирается совсем
type CRMSalesPlansInput struct {
	// Period — YYYY-MM или YYYY-MM-DD; пусто - текущий месяц
	Period *string                       `json:"period,omitempty"`
	Items  []CRMSalesPlansInputItemsItem `json:"items"`
}

type CRMSalesPlansInputItemsItem struct {
	// OwnerID — Пусто - план на весь отдел
	OwnerID *int64 `json:"owner_id,omitempty"`
	// Amount — Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
	Amount   string  `json:"amount"`
	Currency *string `json:"currency,omitempty"`
}

type CRMSettings struct {
	LeadLockMode CRMLeadLockMode `json:"lead_lock_mode"`
	// UpdatedAt — Нет, пока кабинет не менял настройки
	UpdatedAt *string `json:"updated_at,omitempty"`
}

type CRMSettingsPatch struct {
	LeadLockMode *CRMLeadLockMode `json:"lead_lock_mode,omitempty"`
}

// CRMSourceMetric — Откуда приходят лиды и какой источник доходит до сделки
type CRMSourceMetric struct {
	Source    string  `json:"source"`
	Leads     int64   `json:"leads"`
	Converted int64   `json:"converted"`
	Rate      float64 `json:"rate"`
}

type CRMStage struct {
	ID          UUID             `json:"id"`
	PipelineID  UUID             `json:"pipeline_id"`
	Name        string           `json:"name"`
	LabelKey    *CRMLabelKey     `json:"label_key,omitempty"`
	SortOrder   int64            `json:"sort_order"`
	Category    CRMStageCategory `json:"category"`
	Color       string           `json:"color"`
	Probability int64            `json:"probability"`
	// SLAHours — Норматив пребывания на стадии в часах; 0 - без норматива
	SLAHours       int64                `json:"sla_hours"`
	RequiredFields []CRMRequiredField   `json:"required_fields"`
	IsActive       bool                 `json:"is_active"`
	ShowOnBoard    *CRMStageShowOnBoard `json:"show_on_board,omitempty"`
	CreatedAt      string               `json:"created_at"`
	UpdatedAt      string               `json:"updated_at"`
}

type CRMStageCategory = string

type CRMStageInput struct {
	Name     string            `json:"name"`
	Category *CRMStageCategory `json:"category,omitempty"`
	// Color — Пустое значение подставляет цвет категории
	Color          *string              `json:"color,omitempty"`
	Probability    *int64               `json:"probability,omitempty"`
	SLAHours       *int64               `json:"sla_hours,omitempty"`
	RequiredFields []CRMRequiredField   `json:"required_fields,omitempty"`
	ShowOnBoard    *CRMStageShowOnBoard `json:"show_on_board,omitempty"`
}

type CRMStageMetric struct {
	PipelineID       string           `json:"pipeline_id"`
	PipelineName     string           `json:"pipeline_name"`
	PipelineLabelKey *CRMLabelKey     `json:"pipeline_label_key,omitempty"`
	StageID          string           `json:"stage_id"`
	StageName        string           `json:"stage_name"`
	StageLabelKey    *CRMLabelKey     `json:"stage_label_key,omitempty"`
	Category         CRMStageCategory `json:"category"`
	Count            int64            `json:"count"`
	// Amount — Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
	Amount string `json:"amount"`
}

type CRMStageOverview struct {
	StageID       UUID             `json:"stage_id"`
	StageName     string           `json:"stage_name"`
	StageLabelKey *CRMLabelKey     `json:"stage_label_key,omitempty"`
	Category      CRMStageCategory `json:"category"`
	DealCount     int64            `json:"deal_count"`
	// DealAmount — Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
	DealAmount string `json:"deal_amount"`
	UpdatedAt  string `json:"updated_at"`
}

type CRMStagePatch struct {
	Name           *string              `json:"name,omitempty"`
	Category       *CRMStageCategory    `json:"category,omitempty"`
	Color          *string              `json:"color,omitempty"`
	Probability    *int64               `json:"probability,omitempty"`
	SLAHours       *int64               `json:"sla_hours,omitempty"`
	RequiredFields []CRMRequiredField   `json:"required_fields,omitempty"`
	IsActive       *bool                `json:"is_active,omitempty"`
	ShowOnBoard    *CRMStageShowOnBoard `json:"show_on_board,omitempty"`
}

type CRMStageShowOnBoard = bool

// CRMTimelineEntry — Одна запись ленты; вид говорит, из какого источника она пришла
type CRMTimelineEntry struct {
	ID UUID `json:"id"`
	// Kind — note - заметка сотрудника, system - системный факт или правка полей, stage - смена этапа, decision - решение по лиду, message - сообщение канала, link - связь с задачей, событием или встречей, engagement - дело: звонок, встреча, задача, file - файл прикреплён к записи или удалён
	Kind      string  `json:"kind"`
	At        string  `json:"at"`
	ActorID   *int64  `json:"actor_id,omitempty"`
	ActorName *string `json:"actor_name,omitempty"`
	// Title — Заголовок записи: действие, название этапа, решение или направление сообщения
	Title string  `json:"title"`
	Body  *string `json:"body,omitempty"`
	// Meta — Подробности записи. У заметки: mentions - упомянутые коллеги [{id, name}], их имена стоят в тексте как «@Имя»
	Meta map[string]json.RawMessage `json:"meta,omitempty"`
	// Source — Откуда пришла запись: ui - менеджер в интерфейсе, api - внешний API, automation - робот, import - импорт, merge - слияние дублей, system - система. Пусто у переписки и у старых записей
	Source *string `json:"source,omitempty"`
	// RecordType — Запись, которой принадлежит событие. В ленте клиента это его сделка или лид, а не он сам
	RecordType *string `json:"record_type,omitempty"`
	RecordID   *UUID   `json:"record_id,omitempty"`
	// RecordTitle — Название записи; заполняется только в ленте клиента
	RecordTitle *string `json:"record_title,omitempty"`
}

type CRMUserRef struct {
	ID          int64   `json:"id"`
	DisplayName string  `json:"display_name"`
	Username    *string `json:"username,omitempty"`
	// Email — Рабочая почта; по ней импорт узнаёт сотрудника чужой CRM
	Email *string `json:"email,omitempty"`
}

type CalendarAvailability struct {
	ID              UUID    `json:"id"`
	Owner           int64   `json:"owner"`
	OwnerName       string  `json:"owner_name"`
	Name            string  `json:"name"`
	Timezone        string  `json:"timezone"`
	Weekdays        []int64 `json:"weekdays"`
	StartTime       string  `json:"start_time"`
	EndTime         string  `json:"end_time"`
	SlotDurationMin int64   `json:"slot_duration_min"`
	BufferMin       int64   `json:"buffer_min"`
	IsActive        bool    `json:"is_active"`
}

type CalendarAvailabilityCreate struct {
	Owner           *int64  `json:"owner,omitempty"`
	Name            *string `json:"name,omitempty"`
	Timezone        *string `json:"timezone,omitempty"`
	Weekdays        []int64 `json:"weekdays,omitempty"`
	StartTime       *string `json:"start_time,omitempty"`
	EndTime         *string `json:"end_time,omitempty"`
	SlotDurationMin *int64  `json:"slot_duration_min,omitempty"`
	BufferMin       *int64  `json:"buffer_min,omitempty"`
	IsActive        *bool   `json:"is_active,omitempty"`
}

type CalendarAvailabilityEnvelope struct {
	OK   json.RawMessage      `json:"ok"`
	Item CalendarAvailability `json:"item"`
	ID   UUID                 `json:"id"`
}

type CalendarAvailabilityPage struct {
	Count   int64                  `json:"count"`
	Results []CalendarAvailability `json:"results"`
	Items   []CalendarAvailability `json:"items"`
}

type CalendarAvailabilityPatch struct {
	Name            *string `json:"name,omitempty"`
	Timezone        *string `json:"timezone,omitempty"`
	Weekdays        []int64 `json:"weekdays,omitempty"`
	StartTime       *string `json:"start_time,omitempty"`
	EndTime         *string `json:"end_time,omitempty"`
	SlotDurationMin *int64  `json:"slot_duration_min,omitempty"`
	BufferMin       *int64  `json:"buffer_min,omitempty"`
	IsActive        *bool   `json:"is_active,omitempty"`
}

type CalendarBookingLink struct {
	ID               UUID                         `json:"id"`
	Owner            int64                        `json:"owner"`
	OwnerName        string                       `json:"owner_name"`
	OwnerAvatarURL   *string                      `json:"owner_avatar_url,omitempty"`
	Availability     *UUID                        `json:"availability"`
	Slug             string                       `json:"slug"`
	Title            string                       `json:"title"`
	Description      string                       `json:"description"`
	CalendarSource   string                       `json:"calendar_source"`
	ExportTarget     string                       `json:"export_target"`
	Timezone         string                       `json:"timezone"`
	DurationMin      int64                        `json:"duration_min"`
	BufferMin        int64                        `json:"buffer_min"`
	MinNoticeMin     int64                        `json:"min_notice_min"`
	MaxDaysAhead     int64                        `json:"max_days_ahead"`
	DateRangeStart   *string                      `json:"date_range_start,omitempty"`
	DateRangeEnd     *string                      `json:"date_range_end,omitempty"`
	Status           string                       `json:"status"`
	PublicURL        string                       `json:"public_url"`
	Members          []CalendarMember             `json:"members"`
	Participants     []CalendarBookingParticipant `json:"participants"`
	ParticipantCount int64                        `json:"participant_count"`
}

type CalendarBookingLinkCreate struct {
	Owner          *int64  `json:"owner,omitempty"`
	Availability   *UUID   `json:"availability,omitempty"`
	AvailabilityID *UUID   `json:"availability_id,omitempty"`
	Slug           *string `json:"slug,omitempty"`
	Title          *string `json:"title,omitempty"`
	Description    *string `json:"description,omitempty"`
	// CalendarSource — Нормализуется сервером в booking
	CalendarSource *string `json:"calendar_source,omitempty"`
	ExportTarget   *string `json:"export_target,omitempty"`
	Timezone       *string `json:"timezone,omitempty"`
	DurationMin    *int64  `json:"duration_min,omitempty"`
	BufferMin      *int64  `json:"buffer_min,omitempty"`
	MinNoticeMin   *int64  `json:"min_notice_min,omitempty"`
	MaxDaysAhead   *int64  `json:"max_days_ahead,omitempty"`
	DateRangeStart *string `json:"date_range_start,omitempty"`
	DateRangeEnd   *string `json:"date_range_end,omitempty"`
	Status         *string `json:"status,omitempty"`
	MemberIds      []int64 `json:"member_ids,omitempty"`
	MemberUserIds  []int64 `json:"member_user_ids,omitempty"`
}

type CalendarBookingLinkEnvelope struct {
	OK   json.RawMessage     `json:"ok"`
	Item CalendarBookingLink `json:"item"`
	ID   UUID                `json:"id"`
}

type CalendarBookingLinkPage struct {
	Count   int64                 `json:"count"`
	Results []CalendarBookingLink `json:"results"`
	Items   []CalendarBookingLink `json:"items"`
}

type CalendarBookingLinkPatch struct {
	Availability   *UUID   `json:"availability,omitempty"`
	AvailabilityID *UUID   `json:"availability_id,omitempty"`
	Title          *string `json:"title,omitempty"`
	Description    *string `json:"description,omitempty"`
	// CalendarSource — Нормализуется сервером в booking
	CalendarSource *string `json:"calendar_source,omitempty"`
	ExportTarget   *string `json:"export_target,omitempty"`
	Timezone       *string `json:"timezone,omitempty"`
	DurationMin    *int64  `json:"duration_min,omitempty"`
	BufferMin      *int64  `json:"buffer_min,omitempty"`
	MinNoticeMin   *int64  `json:"min_notice_min,omitempty"`
	MaxDaysAhead   *int64  `json:"max_days_ahead,omitempty"`
	DateRangeStart *string `json:"date_range_start,omitempty"`
	DateRangeEnd   *string `json:"date_range_end,omitempty"`
	Status         *string `json:"status,omitempty"`
	MemberIds      []int64 `json:"member_ids,omitempty"`
	MemberUserIds  []int64 `json:"member_user_ids,omitempty"`
}

type CalendarBookingParticipant struct {
	UserID      string `json:"user_id"`
	DisplayName string `json:"display_name"`
	AvatarURL   string `json:"avatar_url"`
	Role        string `json:"role"`
}

type CalendarBusy struct {
	User     int64  `json:"user"`
	UserName string `json:"user_name"`
	StartsAt string `json:"starts_at"`
	EndsAt   string `json:"ends_at"`
	Source   string `json:"source"`
	AllDay   bool   `json:"all_day"`
}

type CalendarBusyPage struct {
	Count   int64          `json:"count"`
	Results []CalendarBusy `json:"results"`
	Items   []CalendarBusy `json:"items"`
}

type CalendarCabinet struct {
	ID   string `json:"id"`
	Slug string `json:"slug"`
	Name string `json:"name"`
	// Source — Идентификатор источника в шторке: cabinet:<slug>.
	Source string `json:"source"`
}

type CalendarConnector struct {
	ID                UUID                       `json:"id"`
	Owner             int64                      `json:"owner"`
	OwnerName         string                     `json:"owner_name"`
	Provider          string                     `json:"provider"`
	DisplayName       string                     `json:"display_name"`
	AccountEmail      string                     `json:"account_email"`
	Direction         string                     `json:"direction"`
	Status            string                     `json:"status"`
	CalendarURL       string                     `json:"calendar_url"`
	Username          string                     `json:"username"`
	HasCredentials    bool                       `json:"has_credentials"`
	SelectedCalendars []CalendarExternalCalendar `json:"selected_calendars"`
	LastSyncAt        *string                    `json:"last_sync_at,omitempty"`
	LastSyncStatus    string                     `json:"last_sync_status"`
	// LastError — The provider's own words and nothing else. Empty when the failure was ours; last_error_code names it and the log carries the cause.
	LastError      string `json:"last_error"`
	LastErrorCode  string `json:"last_error_code"`
	SupportsImport bool   `json:"supports_import"`
	SupportsExport bool   `json:"supports_export"`
	CreatedAt      string `json:"created_at"`
	UpdatedAt      string `json:"updated_at"`
}

type CalendarConnectorCreate struct {
	Provider     string  `json:"provider"`
	DisplayName  *string `json:"display_name,omitempty"`
	AccountEmail *string `json:"account_email,omitempty"`
	Direction    *string `json:"direction,omitempty"`
	Status       *string `json:"status,omitempty"`
	CalendarURL  *string `json:"calendar_url,omitempty"`
	Username     *string `json:"username,omitempty"`
	Credential   *string `json:"credential,omitempty"`
	// Password — KEIS-совместимый alias credential
	Password          *string                    `json:"password,omitempty"`
	SelectedCalendars []CalendarExternalCalendar `json:"selected_calendars,omitempty"`
}

type CalendarConnectorEnvelope struct {
	OK   json.RawMessage   `json:"ok"`
	Item CalendarConnector `json:"item"`
	ID   UUID              `json:"id"`
}

type CalendarConnectorPage struct {
	Count     int64                                `json:"count"`
	Results   []CalendarConnector                  `json:"results"`
	Items     []CalendarConnector                  `json:"items"`
	Providers map[string]CalendarConnectorProvider `json:"providers"`
}

type CalendarConnectorPatch struct {
	Provider          *string                    `json:"provider,omitempty"`
	DisplayName       *string                    `json:"display_name,omitempty"`
	AccountEmail      *string                    `json:"account_email,omitempty"`
	Direction         *string                    `json:"direction,omitempty"`
	Status            *string                    `json:"status,omitempty"`
	CalendarURL       *string                    `json:"calendar_url,omitempty"`
	Username          *string                    `json:"username,omitempty"`
	Credential        *string                    `json:"credential,omitempty"`
	Password          *string                    `json:"password,omitempty"`
	SelectedCalendars []CalendarExternalCalendar `json:"selected_calendars,omitempty"`
}

type CalendarConnectorProvider struct {
	Configured     *bool `json:"configured,omitempty"`
	SupportsImport *bool `json:"supports_import,omitempty"`
	SupportsExport *bool `json:"supports_export,omitempty"`
}

type CalendarConnectorSyncInput struct {
	Provider *string `json:"provider,omitempty"`
}

type CalendarEvent struct {
	ID                 UUID                       `json:"id"`
	Owner              *int64                     `json:"owner"`
	OwnerUserID        *int64                     `json:"owner_user_id,omitempty"`
	OwnerName          string                     `json:"owner_name"`
	Title              string                     `json:"title"`
	Description        string                     `json:"description"`
	Location           string                     `json:"location"`
	StartsAt           string                     `json:"starts_at"`
	EndsAt             string                     `json:"ends_at"`
	Timezone           string                     `json:"timezone"`
	AllDay             bool                       `json:"all_day"`
	Important          bool                       `json:"important"`
	Visibility         string                     `json:"visibility"`
	BusyStatus         string                     `json:"busy_status"`
	RecurrenceFreq     string                     `json:"recurrence_freq"`
	RecurrenceInterval int64                      `json:"recurrence_interval"`
	RecurrenceDays     []int64                    `json:"recurrence_days"`
	RecurrenceMonthDay *int64                     `json:"recurrence_month_day,omitempty"`
	RecurrenceUntil    *string                    `json:"recurrence_until,omitempty"`
	RecurrenceCount    *int64                     `json:"recurrence_count,omitempty"`
	Status             string                     `json:"status"`
	Source             string                     `json:"source"`
	ExportTarget       string                     `json:"export_target"`
	Payload            map[string]json.RawMessage `json:"payload,omitempty"`
	Booking            *UUID                      `json:"booking,omitempty"`
	BookingID          *UUID                      `json:"booking_id,omitempty"`
	Participants       []CalendarParticipant      `json:"participants"`
	OccurrenceID       *string                    `json:"occurrence_id,omitempty"`
	IsOccurrence       bool                       `json:"is_occurrence"`
	MasterEvent        *UUID                      `json:"master_event,omitempty"`
	CreatedAt          string                     `json:"created_at"`
	UpdatedAt          string                     `json:"updated_at"`
	// ConferenceURL — Ссылка на видеовстречу (https). Поля нет, если видеовстречи нет.
	ConferenceURL *string `json:"conference_url,omitempty"`
	// ConferenceProvider — Откуда ссылка: telemost — комната Яндекс Телемоста, personal — постоянная ссылка человека, link — вставлена вручную.
	ConferenceProvider *string `json:"conference_provider,omitempty"`
	// ConferenceID — Идентификатор конференции Яндекс Телемоста; только при conference_provider=telemost.
	ConferenceID *string `json:"conference_id,omitempty"`
}

type CalendarEventCreate struct {
	Owner              *int64                     `json:"owner,omitempty"`
	Title              string                     `json:"title"`
	Description        *string                    `json:"description,omitempty"`
	Location           *string                    `json:"location,omitempty"`
	StartsAt           string                     `json:"starts_at"`
	EndsAt             string                     `json:"ends_at"`
	Timezone           *string                    `json:"timezone,omitempty"`
	AllDay             *bool                      `json:"all_day,omitempty"`
	Important          *bool                      `json:"important,omitempty"`
	Visibility         *string                    `json:"visibility,omitempty"`
	BusyStatus         *string                    `json:"busy_status,omitempty"`
	RecurrenceFreq     *string                    `json:"recurrence_freq,omitempty"`
	RecurrenceInterval *int64                     `json:"recurrence_interval,omitempty"`
	RecurrenceDays     []int64                    `json:"recurrence_days,omitempty"`
	RecurrenceMonthDay *int64                     `json:"recurrence_month_day,omitempty"`
	RecurrenceUntil    *string                    `json:"recurrence_until,omitempty"`
	RecurrenceCount    *int64                     `json:"recurrence_count,omitempty"`
	Status             *string                    `json:"status,omitempty"`
	Participants       []CalendarParticipantInput `json:"participants,omitempty"`
	Payload            map[string]json.RawMessage `json:"payload,omitempty"`
	// ExportTarget — local либо `<connector UUID>/<external calendar id>`
	ExportTarget   *string `json:"export_target,omitempty"`
	CalendarSource *string `json:"calendar_source,omitempty"`
	// ConferenceURL — Ссылка на видеовстречу: пусто либо абсолютный https:// без пробелов. Если поля видеовстречи не переданы, сервер применяет личную настройку «Для новых встреч»: новая комната Яндекс Телемоста или постоянная ссылка.
	ConferenceURL *string `json:"conference_url,omitempty"`
	// ConferenceProvider — Источник ссылки. telemost без ссылки — сервер заводит комнату Яндекс Телемоста от имени человека; Телемост должен быть подключён в настройках календаря. Пусто при непустой ссылке означает link.
	ConferenceProvider *string `json:"conference_provider,omitempty"`
	// ConferenceID — Идентификатор конференции Телемоста; для других источников сбрасывается.
	ConferenceID *string `json:"conference_id,omitempty"`
}

type CalendarEventEnvelope struct {
	OK       json.RawMessage `json:"ok"`
	Item     CalendarEvent   `json:"item"`
	ID       UUID            `json:"id"`
	Title    string          `json:"title"`
	StartsAt string          `json:"starts_at"`
	EndsAt   string          `json:"ends_at"`
}

type CalendarEventPage struct {
	Count         int64           `json:"count"`
	Results       []CalendarEvent `json:"results"`
	Items         []CalendarEvent `json:"items"`
	CurrentUserID int64           `json:"current_user_id"`
}

// CalendarEventPatch — Отсутствующий ключ и null означают «не менять»; participants при наличии заменяет список целиком.
type CalendarEventPatch struct {
	Owner              *int64                     `json:"owner,omitempty"`
	Title              *string                    `json:"title,omitempty"`
	Description        *string                    `json:"description,omitempty"`
	Location           *string                    `json:"location,omitempty"`
	StartsAt           *string                    `json:"starts_at,omitempty"`
	EndsAt             *string                    `json:"ends_at,omitempty"`
	Timezone           *string                    `json:"timezone,omitempty"`
	AllDay             *bool                      `json:"all_day,omitempty"`
	Important          *bool                      `json:"important,omitempty"`
	Visibility         *json.RawMessage           `json:"visibility,omitempty"`
	BusyStatus         *json.RawMessage           `json:"busy_status,omitempty"`
	RecurrenceFreq     *json.RawMessage           `json:"recurrence_freq,omitempty"`
	RecurrenceInterval *int64                     `json:"recurrence_interval,omitempty"`
	RecurrenceDays     []int64                    `json:"recurrence_days,omitempty"`
	RecurrenceMonthDay *int64                     `json:"recurrence_month_day,omitempty"`
	RecurrenceUntil    *string                    `json:"recurrence_until,omitempty"`
	RecurrenceCount    *int64                     `json:"recurrence_count,omitempty"`
	Status             *json.RawMessage           `json:"status,omitempty"`
	Participants       []CalendarParticipantInput `json:"participants,omitempty"`
	Payload            map[string]json.RawMessage `json:"payload,omitempty"`
	ExportTarget       *string                    `json:"export_target,omitempty"`
	CalendarSource     *string                    `json:"calendar_source,omitempty"`
	// ConferenceURL — Пустая строка убирает видеовстречу. Новая ссылка без conference_provider считается вставленной вручную (link).
	ConferenceURL      *string          `json:"conference_url,omitempty"`
	ConferenceProvider *json.RawMessage `json:"conference_provider,omitempty"`
	ConferenceID       *string          `json:"conference_id,omitempty"`
}

type CalendarEventResponseInput struct {
	ResponseStatus string `json:"response_status"`
}

type CalendarExternalCalendar struct {
	ID       string  `json:"id"`
	Name     string  `json:"name"`
	URL      *string `json:"url,omitempty"`
	Color    *string `json:"color,omitempty"`
	Enabled  bool    `json:"enabled"`
	ReadOnly *bool   `json:"read_only,omitempty"`
	Writable *bool   `json:"writable,omitempty"`
	Export   *bool   `json:"export,omitempty"`
}

type CalendarInvitation struct {
	EventID       UUID   `json:"event_id"`
	Title         string `json:"title"`
	StartsAt      string `json:"starts_at"`
	EndsAt        string `json:"ends_at"`
	AllDay        bool   `json:"all_day"`
	Timezone      string `json:"timezone"`
	OwnerName     string `json:"owner_name"`
	ParticipantID UUID   `json:"participant_id"`
}

type CalendarInvitationPage struct {
	Items []CalendarInvitation `json:"items"`
}

type CalendarMember struct {
	User         int64   `json:"user"`
	UserName     string  `json:"user_name"`
	Email        *string `json:"email,omitempty"`
	Department   *string `json:"department,omitempty"`
	DepartmentID *string `json:"department_id,omitempty"`
	Position     *string `json:"position,omitempty"`
	Company      *string `json:"company,omitempty"`
	AvatarURL    *string `json:"avatar_url,omitempty"`
}

type CalendarMemberBundle struct {
	ID        string  `json:"id"`
	Name      string  `json:"name"`
	MemberIds []int64 `json:"member_ids"`
}

type CalendarMemberDirectory struct {
	Departments []CalendarMemberBundle `json:"departments"`
	Items       []CalendarMember       `json:"items"`
}

type CalendarParticipant struct {
	ID             UUID   `json:"id"`
	User           *int64 `json:"user"`
	UserName       string `json:"user_name"`
	ExternalName   string `json:"external_name"`
	ExternalEmail  string `json:"external_email"`
	Role           string `json:"role"`
	ResponseStatus string `json:"response_status"`
}

type CalendarParticipantInput struct {
	User           *int64  `json:"user,omitempty"`
	ExternalName   *string `json:"external_name,omitempty"`
	ExternalEmail  *string `json:"external_email,omitempty"`
	Role           *string `json:"role,omitempty"`
	ResponseStatus *string `json:"response_status,omitempty"`
}

type CalendarSettingsEnvelope struct {
	Settings map[string]json.RawMessage `json:"settings"`
	// Cabinets — Другие кабинеты человека; их занятость учитывается по профилю, видимость и учёт переключаются в шторке «Календари». Только в ответе GET.
	Cabinets []CalendarCabinet `json:"cabinets,omitempty"`
}

type CalendarSlot struct {
	StartsAt string `json:"starts_at"`
	EndsAt   string `json:"ends_at"`
}

type CalendarSlotPage struct {
	Items []CalendarSlot `json:"items"`
}

type CalendarSyncResult struct {
	Connector CalendarConnector `json:"connector"`
	Imported  int64             `json:"imported"`
	Exported  int64             `json:"exported"`
	Skipped   int64             `json:"skipped"`
	Message   string            `json:"message"`
}

type ChatAttachment struct {
	ID           UUID   `json:"id"`
	OriginalName string `json:"original_name"`
	ContentType  string `json:"content_type"`
	SizeBytes    int64  `json:"size_bytes"`
	Sha256Hex    string `json:"sha256_hex"`
	MediaKind    string `json:"media_kind"`
	DurationMs   int64  `json:"duration_ms"`
	ContentURL   string `json:"content_url"`
}

type ChatAttachmentDownloadSession struct {
	// URL — Подписанный абсолютный URL при direct=true; иначе авторизованный относительный путь API.
	URL string `json:"url"`
	// Direct — true — адрес хранилища открывается без Authorization.
	Direct     bool   `json:"direct"`
	ExpiresAt  string `json:"expires_at"`
	ScanStatus string `json:"scan_status"`
}

type ChatAttachmentPage struct {
	Items []ChatForwardedAttachment `json:"items"`
	// HasMore — Следующая страница доказана прочитанной строкой за границей текущей, а не тем, что страница оказалась полной.
	HasMore bool `json:"has_more"`
	// NextCursor — Курсор следующей страницы; присутствует только вместе с has_more=true.
	NextCursor *string `json:"next_cursor,omitempty"`
}

type ChatConversation struct {
	ID               UUID                          `json:"id"`
	Type             string                        `json:"type"`
	Status           string                        `json:"status"`
	Title            string                        `json:"title"`
	Description      string                        `json:"description"`
	LastSeq          int64                         `json:"last_seq"`
	LastMessageID    *UUID                         `json:"last_message_id"`
	Preview          *ChatMessage                  `json:"preview,omitempty"`
	LastMessageAt    *string                       `json:"last_message_at"`
	CreatedAt        string                        `json:"created_at"`
	UpdatedAt        string                        `json:"updated_at"`
	Capabilities     *ChatConversationCapabilities `json:"capabilities,omitempty"`
	UnreadCount      int64                         `json:"unread_count"`
	FirstUnreadSeq   *int64                        `json:"first_unread_seq"`
	ManualUnreadSeq  *int64                        `json:"manual_unread_seq"`
	NotificationMode string                        `json:"notification_mode"`
	MentionCount     int64                         `json:"mention_count"`
	Origin           *string                       `json:"origin,omitempty"`
	OriginRef        *UUID                         `json:"origin_ref,omitempty"`
	LastReadSeq      *int64                        `json:"last_read_seq,omitempty"`
	OthersReadSeq    *int64                        `json:"others_read_seq,omitempty"`
	HasAvatar        *bool                         `json:"has_avatar,omitempty"`
	AvatarURL        *string                       `json:"avatar_url,omitempty"`
	PeerUserID       *int64                        `json:"peer_user_id,omitempty"`
	PeerAvatarURL    *string                       `json:"peer_avatar_url,omitempty"`
}

type ChatConversationCapabilities struct {
	CanRead                bool `json:"canRead"`
	CanWrite               bool `json:"canWrite"`
	CanManageMembers       bool `json:"canManageMembers"`
	CanUpload              bool `json:"canUpload"`
	CanReact               bool `json:"canReact"`
	CanPin                 bool `json:"canPin"`
	CanMarkRead            bool `json:"canMarkRead"`
	CanMarkUnread          bool `json:"canMarkUnread"`
	CanMention             bool `json:"canMention"`
	CanSetNotificationMode bool `json:"canSetNotificationMode"`
}

type ChatConversationPage struct {
	Items      []ChatConversation `json:"items"`
	NextCursor *string            `json:"next_cursor,omitempty"`
}

type ChatCreateGroup struct {
	Title         string  `json:"title"`
	Description   *string `json:"description,omitempty"`
	MemberUserIds []int64 `json:"member_user_ids"`
}

type ChatCreateGroupResult struct {
	Conversation ChatConversation `json:"conversation"`
	Created      json.RawMessage  `json:"created"`
}

type ChatEnsureDirect struct {
	PeerUserID int64 `json:"peer_user_id"`
}

type ChatEnsureDirectResult struct {
	ConversationID UUID `json:"conversation_id"`
	Created        bool `json:"created"`
}

type ChatEntityConversation struct {
	ConversationID UUID   `json:"conversation_id"`
	Title          string `json:"title"`
	DeepLink       string `json:"deep_link"`
}

type ChatForwardedAttachment struct {
	ID             UUID    `json:"id"`
	ConversationID UUID    `json:"conversation_id"`
	MessageID      *string `json:"message_id"`
	OriginalName   string  `json:"original_name"`
	ContentType    string  `json:"content_type"`
	SizeBytes      int64   `json:"size_bytes"`
	Sha256Hex      string  `json:"sha256_hex"`
	MediaKind      string  `json:"media_kind"`
	DurationMs     *int64  `json:"duration_ms"`
	Waveform       []int64 `json:"waveform"`
	Status         string  `json:"status"`
	ScanStatus     string  `json:"scan_status"`
	ScanErrorCode  *string `json:"scan_error_code,omitempty"`
	CreatedAt      string  `json:"created_at"`
	ContentURL     string  `json:"content_url"`
}

type ChatMember struct {
	UserID      int64  `json:"user_id"`
	DisplayName string `json:"display_name"`
	AvatarURL   string `json:"avatar_url"`
	Role        string `json:"role"`
	// IsFormer — Человека больше нет в справочнике кабинета: членство или учётная запись выключены. Он остаётся в составе беседы, потому что его сообщения в ней остались и подпись под ними обязана кем-то называться. Пустое display_name означает, что о нём не осталось даже имени — подписывать такую строку клиент решает сам.
	IsFormer bool `json:"is_former"`
}

type ChatMemberPage struct {
	Items []ChatMember `json:"items"`
}

type ChatMentionCandidate struct {
	UserID int64 `json:"user_id"`
}

type ChatMentionCandidatePage struct {
	Items []ChatMentionCandidate `json:"items"`
}

type ChatMentionReadResult struct {
	MessageID UUID    `json:"message_id"`
	ReadAt    *string `json:"read_at"`
	Changed   bool    `json:"changed"`
}

type ChatMessage struct {
	ID               UUID                 `json:"id"`
	ConversationID   UUID                 `json:"conversation_id"`
	Seq              int64                `json:"seq"`
	SenderUserID     *int64               `json:"sender_user_id"`
	Kind             string               `json:"kind"`
	Body             string               `json:"body"`
	Mentions         []ChatMessageMention `json:"mentions"`
	ClientMessageID  *UUID                `json:"client_message_id"`
	CreatedAt        string               `json:"created_at"`
	Attachments      []ChatAttachment     `json:"attachments"`
	ReplyToMessageID *string              `json:"reply_to_message_id,omitempty"`
	// ReplyQuote — Цитата части исходного сообщения; поля нет, когда ответ на сообщение целиком, исходное удалено или недоступно
	ReplyQuote *string `json:"reply_quote,omitempty"`
}

type ChatMessageMention struct {
	UserID      int64  `json:"user_id"`
	DisplayName string `json:"display_name"`
}

type ChatMessagePage struct {
	Items    []ChatMessage `json:"items"`
	FirstSeq *int64        `json:"first_seq,omitempty"`
	LastSeq  *int64        `json:"last_seq,omitempty"`
}

type ChatNotificationModeInput struct {
	Mode string `json:"mode"`
}

type ChatNotificationModeResult struct {
	Mode    string `json:"mode"`
	Changed bool   `json:"changed"`
}

type ChatPeoplePage struct {
	Items   []ChatPerson `json:"items"`
	HasMore bool         `json:"has_more"`
	// NextOffset — Присутствует только когда есть следующая страница коллег
	NextOffset *int64 `json:"next_offset,omitempty"`
}

type ChatPerson struct {
	UserID      int64  `json:"user_id"`
	DisplayName string `json:"display_name"`
	AvatarURL   string `json:"avatar_url"`
	IsSelf      bool   `json:"is_self"`
}

type ChatPresencePage struct {
	Items []ChatPresencePageItemsItem `json:"items"`
}

type ChatPresencePageItemsItem struct {
	UserID int64 `json:"user_id"`
	Typing bool  `json:"typing"`
}

type ChatReceiptInput struct {
	Seq int64 `json:"seq"`
}

type ChatReceiptState struct {
	LastDeliveredSeq int64  `json:"last_delivered_seq"`
	LastReadSeq      int64  `json:"last_read_seq"`
	ManualUnreadSeq  *int64 `json:"manual_unread_seq"`
	Changed          bool   `json:"changed"`
}

type ChatSendMessage struct {
	// ClientMessageID — Ключ идемпотентности отправки. Уникален в пределах беседы и отправителя: повтор с тем же ключом не заводит второе сообщение, а возвращает уже отправленное. Заголовок Idempotency-Key эта операция не читает
	ClientMessageID map[string]json.RawMessage `json:"client_message_id"`
	// Body — Текст сообщения; без attachment_ids обязателен, с ними — подпись к вложениям и может быть пустым. Предел считается в кодовых точках, а не в байтах: сервер режет по 10 000 кодовых точек
	Body *string `json:"body,omitempty"`
	// ReplyToMessageID — Сообщение этой беседы, на которое отвечает новое
	ReplyToMessageID map[string]json.RawMessage `json:"reply_to_message_id,omitempty"`
	MentionUserIds   []int64                    `json:"mention_user_ids,omitempty"`
	// AttachmentIds — Готовые вложения этой беседы — id из завершения сессии загрузки или из списка вложений. Не сочетаются с mention_user_ids в одном сообщении
	AttachmentIds []UUID `json:"attachment_ids,omitempty"`
	// ReplyQuote — Цитата части исходного сообщения, как в Телеграме: дословный кусок его текста, не длиннее 1024 кодовых точек. Только вместе с reply_to_message_id; фрагмента нет в исходном — 404. Пустая строка — ответ на сообщение целиком
	ReplyQuote *string `json:"reply_quote,omitempty"`
	// SupportReport — Сообщение формы «Сообщить об ошибке». В чате поддержки открывает новое обращение и новую заявку, даже если в беседе уже есть открытое; обычное сообщение продолжает открытое. В любой другой беседе — 400
	SupportReport *bool `json:"support_report,omitempty"`
}

type ChatSendMessageResult struct {
	Message ChatMessage `json:"message"`
	Created bool        `json:"created"`
}

type ChatSendVideoMeeting struct {
	// ClientMessageID — Ключ идемпотентности отправки. Уникален в пределах беседы и отправителя: повтор с тем же ключом не заводит вторую комнату и второе сообщение, а возвращает уже отправленное
	ClientMessageID map[string]json.RawMessage `json:"client_message_id"`
}

type ChatUnreadMention struct {
	MessageID UUID  `json:"message_id"`
	Seq       int64 `json:"seq"`
}

type ChatUnreadMentionPage struct {
	Items []ChatUnreadMention `json:"items"`
}

type ChatUploadInstructions struct {
	Mode                  string            `json:"mode"`
	URL                   *string           `json:"url,omitempty"`
	Method                *string           `json:"method,omitempty"`
	Fields                map[string]string `json:"fields,omitempty"`
	FileField             *string           `json:"file_field,omitempty"`
	PartBytes             *int64            `json:"part_bytes,omitempty"`
	PartCount             *int64            `json:"part_count,omitempty"`
	DirectUrls            map[string]string `json:"direct_urls,omitempty"`
	RequiresAuthorization *bool             `json:"requires_authorization,omitempty"`
	MaxBytes              int64             `json:"max_bytes"`
	ExpiresAt             string            `json:"expires_at"`
}

type ChatUploadSession struct {
	ID            UUID                    `json:"id"`
	OwnerType     string                  `json:"owner_type"`
	OwnerID       *UUID                   `json:"owner_id,omitempty"`
	Name          string                  `json:"name"`
	MimeType      string                  `json:"mime_type"`
	SizeBytes     int64                   `json:"size_bytes"`
	Sha256        *string                 `json:"sha256,omitempty"`
	Status        string                  `json:"status"`
	Failure       *string                 `json:"failure,omitempty"`
	FailureDetail *string                 `json:"failure_detail,omitempty"`
	ScanStatus    *string                 `json:"scan_status,omitempty"`
	ScanVerdict   *string                 `json:"scan_verdict,omitempty"`
	PublishedRef  *UUID                   `json:"published_ref,omitempty"`
	ExpiresAt     string                  `json:"expires_at"`
	CreatedAt     string                  `json:"created_at"`
	CompletedAt   *string                 `json:"completed_at,omitempty"`
	Upload        *ChatUploadInstructions `json:"upload,omitempty"`
}

type ChatUploadSessionCreate struct {
	Name      string  `json:"name"`
	MimeType  *string `json:"mime_type,omitempty"`
	SizeBytes int64   `json:"size_bytes"`
	// Sha256 — Необязательная lowercase SHA-256 сумма файла.
	Sha256 *string `json:"sha256,omitempty"`
}

type Comment struct {
	ID          UUID          `json:"id"`
	TaskID      UUID          `json:"task_id"`
	AuthorID    *int64        `json:"author_id"`
	AuthorName  *string       `json:"author_name"`
	Body        string        `json:"body"`
	Attachments []Attachment  `json:"attachments"`
	Origin      CommentOrigin `json:"origin"`
	CreatedAt   string        `json:"created_at"`
}

// CommentCreate — Передайте непустой `body` либо `allow_empty: true` для комментария только с вложением.
type CommentCreate struct {
	Body             *string `json:"body,omitempty"`
	Author           *int64  `json:"author,omitempty"`
	AllowEmpty       *bool   `json:"allow_empty,omitempty"`
	MentionedUserIds []int64 `json:"mentioned_user_ids,omitempty"`
}

type CommentList = []Comment

type CommentOrigin = string

type CoreAccountingDimension struct {
	Key           string  `json:"key"`
	Label         string  `json:"label"`
	Description   string  `json:"description"`
	DictionaryKey *string `json:"dictionary_key,omitempty"`
	Tree          bool    `json:"tree"`
	AlwaysOn      bool    `json:"always_on"`
	Enabled       bool    `json:"enabled"`
	Required      bool    `json:"required"`
	EnabledAt     *string `json:"enabled_at,omitempty"`
	// On — Дата, на которую показаны enabled и required
	On       *string                          `json:"on,omitempty"`
	Versions []CoreAccountingDimensionVersion `json:"versions,omitempty"`
}

type CoreAccountingDimensionPage struct {
	Count     int64                                `json:"count"`
	Results   []CoreAccountingDimension            `json:"results"`
	Readiness CoreAccountingDimensionPageReadiness `json:"readiness"`
}

type CoreAccountingDimensionPageReadiness struct {
	PostedEntries int64 `json:"posted_entries"`
}

type CoreAccountingDimensionPatch struct {
	Enabled  *bool `json:"enabled,omitempty"`
	Required *bool `json:"required,omitempty"`
}

type CoreAccountingDimensionVersion struct {
	ID string `json:"id"`
	// ValidFrom — 0001-01-01 — с начала учёта
	ValidFrom string `json:"valid_from"`
	// ValidTo — Пусто — запись действует
	ValidTo  *string `json:"valid_to,omitempty"`
	Enabled  bool    `json:"enabled"`
	Required bool    `json:"required"`
}

type CoreAccountingDimensionVersionInput struct {
	ValidFrom string `json:"valid_from"`
	Enabled   bool   `json:"enabled"`
	Required  bool   `json:"required"`
	// EditOpen — Поправить действующую запись истории вместо новой
	EditOpen *bool `json:"edit_open,omitempty"`
}

type CoreAccountingPolicy struct {
	Businesses []CoreBusinessPolicy `json:"businesses"`
	Companies  []CoreCompanyPolicy  `json:"companies"`
}

type CoreAccountingSettings struct {
	Currency      string  `json:"currency"`
	ValidFrom     *string `json:"valid_from,omitempty"`
	Locked        bool    `json:"locked"`
	LedgerEntries int64   `json:"ledger_entries"`
}

type CoreAccountingSettingsInput struct {
	Currency string  `json:"currency"`
	Reason   *string `json:"reason,omitempty"`
}

type CoreBalanceShortage struct {
	RegisterKey  string                     `json:"register_key"`
	RegisterName string                     `json:"register_name"`
	Dims         map[string]json.RawMessage `json:"dims"`
	Resource     string                     `json:"resource"`
	Balance      string                     `json:"balance"`
	Shortage     string                     `json:"shortage"`
	Conflicts    []CoreConflictingRegistrar `json:"conflicts"`
}

type CoreBusiness struct {
	ID       UUID   `json:"id"`
	Name     string `json:"name"`
	IsActive bool   `json:"is_active"`
	// AccountingMethod — Что считать выручкой — cash это деньги, accrual это сделка
	AccountingMethod string `json:"accounting_method"`
	// AccrualFrom — Дата перехода на начисление; отсутствует у кассового бизнеса
	AccrualFrom *string `json:"accrual_from,omitempty"`
	// VATPresentation — Очищаются ли суммы отчётов от косвенного налога сегодня; gross это полные суммы. Меняется в учётной политике с датой
	VATPresentation *string `json:"vat_presentation,omitempty"`
	// VATSince — Дата начала действующей сегодня версии очистки сумм; отсутствует, если версия действует с начала учёта
	VATSince *string `json:"vat_since,omitempty"`
	// OnecMigratedUntil — Дата переноса бизнеса из 1С: акт поставщика со ссылкой на документ 1С по эту дату включительно принимается без бумаги
	OnecMigratedUntil *string `json:"onec_migrated_until,omitempty"`
}

type CoreBusinessAccountingMethodInput struct {
	// Method — Значение приводится к нижнему регистру
	Method string `json:"method"`
	// AccrualFrom — Дата перехода на начисление; обязательна при accrual и не используется при cash
	AccrualFrom *string `json:"accrual_from,omitempty"`
}

type CoreBusinessInput struct {
	Name string `json:"name"`
	// OnecMigratedUntil — Дата переноса из 1С, ГГГГ-ММ-ДД; пустая строка снимает дату, без поля — не меняется
	OnecMigratedUntil *string `json:"onec_migrated_until,omitempty"`
}

type CoreBusinessOwner struct {
	ID         UUID   `json:"id"`
	AccountID  UUID   `json:"account_id"`
	Kind       string `json:"kind"`
	EmployeeID *UUID  `json:"employee_id,omitempty"`
	CompanyID  *UUID  `json:"company_id,omitempty"`
	ContactID  *UUID  `json:"contact_id,omitempty"`
	Name       string `json:"name"`
	Share      string `json:"share"`
}

type CoreBusinessOwnerInput struct {
	Kind       string `json:"kind"`
	EmployeeID *UUID  `json:"employee_id,omitempty"`
	CompanyID  *UUID  `json:"company_id,omitempty"`
	ContactID  *UUID  `json:"contact_id,omitempty"`
	Share      string `json:"share"`
}

// CoreBusinessPatch — Частичное изменение бизнеса: поле без значения не меняется
type CoreBusinessPatch struct {
	// Name — Новое название; без поля — прежнее
	Name *string `json:"name,omitempty"`
	// OnecMigratedUntil — Дата переноса из 1С, ГГГГ-ММ-ДД; пустая строка снимает дату, без поля — не меняется
	OnecMigratedUntil *string `json:"onec_migrated_until,omitempty"`
}

type CoreBusinessPolicy struct {
	ID               UUID                               `json:"id"`
	Name             string                             `json:"name"`
	IsActive         bool                               `json:"is_active"`
	AccountingMethod string                             `json:"accounting_method"`
	AccrualFrom      *string                            `json:"accrual_from,omitempty"`
	VATPresentation  []CorePolicyVATPresentationVersion `json:"vat_presentation"`
	VATPending       []CorePolicyVATPendingVersion      `json:"vat_pending"`
	// AccountableDays — Срок авансового отчёта, дней (ERP-1176); пусто — умолчание 30
	AccountableDays []CorePolicyAccountableDaysVersion `json:"accountable_days,omitempty"`
	// RevenueItems — Статьи выручки исполнений продажи или закупки по виду строки (этап 4 ERP-1427)
	RevenueItems []CoreOrderRevenueItemRule `json:"revenue_items,omitempty"`
}

type CoreChange struct {
	// Entity — Имя сущности из реестра ленты (core.contact)
	Entity string `json:"entity"`
	// ID — Идентификатор объекта в его собственном API
	ID string       `json:"id"`
	Op CoreChangeOp `json:"op"`
	// ChangedAt — Момент изменения. Для человека и для журнала; порядок ленты задаёт не он, а фиксация транзакции, поэтому фильтровать по нему на своей стороне нельзя
	ChangedAt string `json:"changed_at"`
}

type CoreChangeFeedPage struct {
	// Entities — Сущности, которые эта лента обслуживает предъявителю
	Entities []string `json:"entities"`
	// Count — Число строк, а не прогонов
	Count int64 `json:"count"`
	Limit int64 `json:"limit"`
	// HasMore — «В этом прогоне есть ещё». Ложь закрывает прогон, а не кабинет: следующий запрос увидит случившееся после
	HasMore bool `json:"has_more"`
	// Cursor — Непрозрачная строка. Возвращается как есть; разбирать и собирать её нельзя
	Cursor  string       `json:"cursor"`
	Changes []CoreChange `json:"changes"`
}

type CoreChangeOp = string

type CoreCompanyPolicy struct {
	ID         UUID                        `json:"id"`
	Name       string                      `json:"name"`
	IsActive   bool                        `json:"is_active"`
	BusinessID UUID                        `json:"business_id"`
	TaxMode    []CorePolicyTaxModeVersion  `json:"tax_mode"`
	VATRates   []CorePolicyVATRatesVersion `json:"vat_rates"`
	// TaxRegime — Система налогообложения с историей (ERP-1579)
	TaxRegime []CorePolicyTaxRegimeVersion `json:"tax_regime,omitempty"`
	// SoleProprietor — Юрлицо — ИП (вид организации в карточке): доступны ПСН, НПД и патент
	SoleProprietor *bool `json:"sole_proprietor,omitempty"`
	// PayrollOfficial — Вся ли зарплата в бухгалтерии и источник официальной части, с историей (ERP-1700); пусто — вся официальная
	PayrollOfficial []CorePolicyPayrollOfficialVersion `json:"payroll_official,omitempty"`
}

type CoreConflictingRegistrar struct {
	ID       UUID               `json:"id"`
	Number   string             `json:"number"`
	TypeKey  string             `json:"type_key"`
	TypeName string             `json:"type_name"`
	Date     string             `json:"date"`
	Status   CoreDocumentStatus `json:"status"`
	Sign     int64              `json:"sign"`
}

type CoreContact struct {
	ID           UUID                       `json:"id"`
	Name         string                     `json:"name"`
	Kind         CoreContactKind            `json:"kind"`
	IsCustomer   bool                       `json:"is_customer"`
	IsSupplier   bool                       `json:"is_supplier"`
	FolderID     *UUID                      `json:"folder_id"`
	EntityType   CoreContactEntityType      `json:"entity_type"`
	LegalName    string                     `json:"legal_name"`
	Phone        string                     `json:"phone"`
	Email        string                     `json:"email"`
	Position     string                     `json:"position"`
	Tags         []json.RawMessage          `json:"tags"`
	Messengers   map[string]json.RawMessage `json:"messengers"`
	Source       string                     `json:"source"`
	INN          string                     `json:"inn"`
	KPP          string                     `json:"kpp"`
	Ogrn         string                     `json:"ogrn"`
	Address      string                     `json:"address"`
	LegalAddress CoreContactAddress         `json:"legal_address"`
	// PostalAddress — Почтовый адрес для писем и печатных форм (ERP-1782). Из реестра ФНС не приходит: автозаполнение по ИНН его не меняет
	PostalAddress CoreContactPostalAddress   `json:"postal_address"`
	BankName      string                     `json:"bank_name"`
	BankBIC       string                     `json:"bank_bic"`
	BankAccount   string                     `json:"bank_account"`
	ExternalID    string                     `json:"external_id"`
	Custom        map[string]json.RawMessage `json:"custom"`
	IsActive      bool                       `json:"is_active"`
	CreatedAt     string                     `json:"created_at"`
	UpdatedAt     string                     `json:"updated_at"`
	// Country — Нерезидент: страна регистрации кодом ISO 3166 (две буквы). Пусто — Россия.
	Country *string `json:"country,omitempty"`
	// TaxNumber — Нерезидент: налоговый номер страны регистрации вместо ИНН.
	TaxNumber *string `json:"tax_number,omitempty"`
	// SystemKey — Код системного контрагента (fns, sfr, bank:<БИК>). Только чтение.
	SystemKey *string `json:"system_key,omitempty"`
	// RequisitesIssue — Что подсветить в реквизитах по правилу ИНН. Пусто — всё в порядке.
	RequisitesIssue *string `json:"requisites_issue,omitempty"`
}

// CoreContactPostalAddress — Почтовый адрес для писем и печатных форм (ERP-1782). Из реестра ФНС не приходит: автозаполнение по ИНН его не меняет
type CoreContactPostalAddress struct {
	PostalCode string `json:"postal_code"`
	// RegionCode — Код субъекта РФ для формализованного документа
	RegionCode string `json:"region_code"`
	RegionName string `json:"region_name"`
	District   string `json:"district"`
	City       string `json:"city"`
	Settlement string `json:"settlement"`
	Street     string `json:"street"`
	Building   string `json:"building"`
	Block      string `json:"block"`
	// Flat — Офис или помещение
	Flat string `json:"flat"`
	Info string `json:"info"`
}

type CoreContactAddress struct {
	PostalCode string `json:"postal_code"`
	// RegionCode — Код субъекта РФ для формализованного документа
	RegionCode string `json:"region_code"`
	RegionName string `json:"region_name"`
	District   string `json:"district"`
	City       string `json:"city"`
	Settlement string `json:"settlement"`
	Street     string `json:"street"`
	Building   string `json:"building"`
	Block      string `json:"block"`
	// Flat — Офис или помещение
	Flat string `json:"flat"`
	Info string `json:"info"`
}

type CoreContactCreate struct {
	Name         string                     `json:"name"`
	Kind         *CoreContactKind           `json:"kind,omitempty"`
	EntityType   *CoreContactEntityType     `json:"entity_type,omitempty"`
	LegalName    *string                    `json:"legal_name,omitempty"`
	Phone        *string                    `json:"phone,omitempty"`
	Email        *string                    `json:"email,omitempty"`
	Position     *string                    `json:"position,omitempty"`
	Tags         []json.RawMessage          `json:"tags,omitempty"`
	Messengers   map[string]json.RawMessage `json:"messengers,omitempty"`
	Source       *string                    `json:"source,omitempty"`
	INN          *string                    `json:"inn,omitempty"`
	KPP          *string                    `json:"kpp,omitempty"`
	Ogrn         *string                    `json:"ogrn,omitempty"`
	Address      *string                    `json:"address,omitempty"`
	LegalAddress *CoreContactAddress        `json:"legal_address,omitempty"`
	// PostalAddress — Почтовый адрес для писем и печатных форм (ERP-1782). Из реестра ФНС не приходит: автозаполнение по ИНН его не меняет
	PostalAddress *CoreContactCreatePostalAddress `json:"postal_address,omitempty"`
	BankName      *string                         `json:"bank_name,omitempty"`
	BankBIC       *string                         `json:"bank_bic,omitempty"`
	BankAccount   *string                         `json:"bank_account,omitempty"`
	ExternalID    *string                         `json:"external_id,omitempty"`
	// Country — Нерезидент: страна регистрации кодом ISO 3166 (две буквы).
	Country *string `json:"country,omitempty"`
	// TaxNumber — Нерезидент: налоговый номер страны регистрации вместо ИНН.
	TaxNumber *string                    `json:"tax_number,omitempty"`
	Custom    map[string]json.RawMessage `json:"custom,omitempty"`
}

// CoreContactCreatePostalAddress — Почтовый адрес для писем и печатных форм (ERP-1782). Из реестра ФНС не приходит: автозаполнение по ИНН его не меняет
type CoreContactCreatePostalAddress struct {
	PostalCode string `json:"postal_code"`
	// RegionCode — Код субъекта РФ для формализованного документа
	RegionCode string `json:"region_code"`
	RegionName string `json:"region_name"`
	District   string `json:"district"`
	City       string `json:"city"`
	Settlement string `json:"settlement"`
	Street     string `json:"street"`
	Building   string `json:"building"`
	Block      string `json:"block"`
	// Flat — Офис или помещение
	Flat string `json:"flat"`
	Info string `json:"info"`
}

type CoreContactEntityType = string

type CoreContactKind = string

type CoreContactPage struct {
	Count   int64         `json:"count"`
	Results []CoreContact `json:"results"`
}

type CoreContactPatch struct {
	Name         *string                    `json:"name,omitempty"`
	Kind         *CoreContactKind           `json:"kind,omitempty"`
	EntityType   *CoreContactEntityType     `json:"entity_type,omitempty"`
	LegalName    *string                    `json:"legal_name,omitempty"`
	Phone        *string                    `json:"phone,omitempty"`
	Email        *string                    `json:"email,omitempty"`
	Position     *string                    `json:"position,omitempty"`
	Tags         []json.RawMessage          `json:"tags,omitempty"`
	Messengers   map[string]json.RawMessage `json:"messengers,omitempty"`
	Source       *string                    `json:"source,omitempty"`
	INN          *string                    `json:"inn,omitempty"`
	KPP          *string                    `json:"kpp,omitempty"`
	Ogrn         *string                    `json:"ogrn,omitempty"`
	Address      *string                    `json:"address,omitempty"`
	LegalAddress *CoreContactAddress        `json:"legal_address,omitempty"`
	// PostalAddress — Почтовый адрес для писем и печатных форм (ERP-1782). Из реестра ФНС не приходит: автозаполнение по ИНН его не меняет
	PostalAddress *CoreContactPatchPostalAddress `json:"postal_address,omitempty"`
	BankName      *string                        `json:"bank_name,omitempty"`
	BankBIC       *string                        `json:"bank_bic,omitempty"`
	BankAccount   *string                        `json:"bank_account,omitempty"`
	ExternalID    *string                        `json:"external_id,omitempty"`
	Country       *string                        `json:"country,omitempty"`
	TaxNumber     *string                        `json:"tax_number,omitempty"`
	Custom        map[string]json.RawMessage     `json:"custom,omitempty"`
	IsCustomer    *bool                          `json:"is_customer,omitempty"`
	IsSupplier    *bool                          `json:"is_supplier,omitempty"`
	FolderID      *UUID                          `json:"folder_id,omitempty"`
}

// CoreContactPatchPostalAddress — Почтовый адрес для писем и печатных форм (ERP-1782). Из реестра ФНС не приходит: автозаполнение по ИНН его не меняет
type CoreContactPatchPostalAddress struct {
	PostalCode string `json:"postal_code"`
	// RegionCode — Код субъекта РФ для формализованного документа
	RegionCode string `json:"region_code"`
	RegionName string `json:"region_name"`
	District   string `json:"district"`
	City       string `json:"city"`
	Settlement string `json:"settlement"`
	Street     string `json:"street"`
	Building   string `json:"building"`
	Block      string `json:"block"`
	// Flat — Офис или помещение
	Flat string `json:"flat"`
	Info string `json:"info"`
}

type CoreCurrencyRate struct {
	ID           UUID                      `json:"id"`
	CurrencyCode string                    `json:"currency_code"`
	BaseCode     string                    `json:"base_code"`
	Rate         string                    `json:"rate"`
	Nominal      int64                     `json:"nominal"`
	ValidFrom    string                    `json:"valid_from"`
	ValidTo      *string                   `json:"valid_to,omitempty"`
	Source       CoreCurrencyRateSourceKey `json:"source"`
	Reason       string                    `json:"reason"`
	CreatedAt    string                    `json:"created_at"`
}

type CoreCurrencyRatePage struct {
	Count   int64              `json:"count"`
	Results []CoreCurrencyRate `json:"results"`
}

type CoreCurrencyRateRefreshResult struct {
	Added int64 `json:"added"`
}

type CoreCurrencyRateSource struct {
	Key         CoreCurrencyRateSourceKey `json:"key"`
	Title       string                    `json:"title"`
	Auto        bool                      `json:"auto"`
	Note        *string                   `json:"note,omitempty"`
	Serves      bool                      `json:"serves"`
	Bridge      *string                   `json:"bridge,omitempty"`
	Unavailable *bool                     `json:"unavailable,omitempty"`
}

type CoreCurrencyRateSourceKey = string

type CoreCurrencyRateSourcePage struct {
	Items []CoreCurrencyRateSource `json:"items"`
}

type CoreDictionary struct {
	ID          UUID   `json:"id"`
	Key         string `json:"key"`
	Name        string `json:"name"`
	Description string `json:"description"`
	IsSystem    bool   `json:"is_system"`
	AllowTree   bool   `json:"allow_tree"`
	FolderID    *UUID  `json:"folder_id"`
	ItemCount   int64  `json:"item_count"`
	CreatedAt   string `json:"created_at"`
	UpdatedAt   string `json:"updated_at"`
}

type CoreDictionaryCreate struct {
	Key         string  `json:"key"`
	Name        string  `json:"name"`
	Description *string `json:"description,omitempty"`
	AllowTree   *bool   `json:"allow_tree,omitempty"`
	FolderID    *UUID   `json:"folder_id,omitempty"`
}

type CoreDictionaryItem struct {
	ID           UUID                       `json:"id"`
	DictionaryID UUID                       `json:"dictionary_id"`
	Code         string                     `json:"code"`
	Label        string                     `json:"label"`
	ParentID     *UUID                      `json:"parent_id"`
	Attrs        map[string]json.RawMessage `json:"attrs"`
	SortOrder    int64                      `json:"sort_order"`
	IsActive     bool                       `json:"is_active"`
	CreatedAt    string                     `json:"created_at"`
	UpdatedAt    string                     `json:"updated_at"`
}

type CoreDictionaryItemCreate struct {
	Code      *string                    `json:"code,omitempty"`
	Label     string                     `json:"label"`
	ParentID  *UUID                      `json:"parent_id,omitempty"`
	Attrs     map[string]json.RawMessage `json:"attrs,omitempty"`
	SortOrder *int64                     `json:"sort_order,omitempty"`
	IsActive  *bool                      `json:"is_active,omitempty"`
}

type CoreDictionaryItemImport struct {
	Items []CoreDictionaryItemUpdate `json:"items"`
}

type CoreDictionaryItemPage struct {
	Count int64 `json:"count"`
	// Limit — Применённый размер страницы — после зажима до потолка
	Limit int64 `json:"limit"`
	// Offset — Применённое смещение
	Offset  int64                `json:"offset"`
	Results []CoreDictionaryItem `json:"results"`
}

type CoreDictionaryItemUpdate struct {
	Code      string                     `json:"code"`
	Label     string                     `json:"label"`
	ParentID  *UUID                      `json:"parent_id,omitempty"`
	Attrs     map[string]json.RawMessage `json:"attrs,omitempty"`
	SortOrder *int64                     `json:"sort_order,omitempty"`
	IsActive  *bool                      `json:"is_active,omitempty"`
}

type CoreDictionaryPage struct {
	Count int64 `json:"count"`
	// Limit — Применённый размер страницы — после зажима до потолка
	Limit int64 `json:"limit"`
	// Offset — Применённое смещение
	Offset  int64            `json:"offset"`
	Results []CoreDictionary `json:"results"`
}

type CoreDirectory struct {
	// Key — Ключ кабинета: одинаков во всех кабинетах, без пространства имён. У справочника приложения совпадает с полным именем
	Key   string `json:"key"`
	Label string `json:"label"`
	// LabelKey — Ключ словаря для перевода названия
	LabelKey    *string `json:"label_key,omitempty"`
	Description string  `json:"description"`
	// Module — Модуль, чей код пишет и проверяет записи: у объявленного справочника — владелец, у списка кабинета и справочника приложения — core как хозяин конструктора
	Module string `json:"module"`
	// Kind — Природа справочника: сущность, список кодов, таксономия, стандарт или зеркало внешнего источника
	Kind string `json:"kind"`
	// Storage — Где лежат записи: своя типизированная таблица или универсальный конструктор
	Storage string `json:"storage"`
	// Origin — Откуда записи: штатный посев (system), ввод клиента (tenant), интеграция (integration) или установленное приложение (app)
	Origin string `json:"origin"`
	// Visibility — Кому виден справочник: только своему модулю, всему продукту или наружу
	Visibility string `json:"visibility"`
	// Group — Группа раздела в меню и каталоге
	Group *string `json:"group,omitempty"`
	// Icon — Значок из общего набора
	Icon *string `json:"icon,omitempty"`
	// SetupStep — Порядок в чек-листе первичного заполнения кабинета
	SetupStep *int64 `json:"setup_step,omitempty"`
	Deeplink  string `json:"deeplink"`
	// Mounts — Дополнительные входы. Владение не переносят: справочник остаётся у своего модуля
	Mounts []CoreDirectoryMount `json:"mounts,omitempty"`
	// Reference — Полное имя для внешнего кода: пространство имён владельца плюс ключ — core.units, marketplace.mp_expense_item, app.acme.crm.regions. Его называет manifest приложения, его же принимают операции /api/v1/reference наравне с ключом
	Reference    string                `json:"reference"`
	Contract     CoreDirectoryContract `json:"contract"`
	ItemCount    *int64                `json:"item_count,omitempty"`
	IsSystem     bool                  `json:"is_system"`
	DictionaryID *string               `json:"dictionary_id,omitempty"`
}

// CoreDirectoryContract — Дескриптор справочника для внешнего кода (Reference Data SDK). У штатного справочника приходит из объявления модуля-владельца, у списка кабинета выводится из его природы, у справочника приложения снимается с манифеста при установке. Форма дескриптора — preview: набор полей может расшириться
type CoreDirectoryContract struct {
	// Namespace — Пространство имён: ключ модуля-владельца или app.<издатель>.<ключ> у приложения. Выводится из владельца, объявить иначе нельзя
	Namespace string `json:"namespace"`
	// Reference — Полное имя: namespace плюс ключ. То же, что reference у строки
	Reference string `json:"reference"`
	// ItemSchema — Идентификатор формы записи с версией: core.contact.v1 у типизированного, core.dictionary_item.v1 у любого справочника конструктора, <полное имя>.v<N> у справочника приложения
	ItemSchema string `json:"item_schema"`
	// SchemaVersion — Версия формы записи из суффикса item_schema. Ломающее изменение формы — новая версия рядом со старой, а не тихая подмена
	SchemaVersion int64 `json:"schema_version"`
	// Authority — Чьё слово последнее по записям: кабинет, сеятель Akeda, внешний источник или установленное приложение
	Authority string `json:"authority"`
	// Mutability — Что кабинет вправе делать с записями: править любые, только читать (записи держит владелец) или заводить свои рядом с записями владельца
	Mutability string `json:"mutability"`
	// Lifecycle — Этап жизни: форма держится; форма меняется; выдавать перестали, существующие не трогают; владелец удалён, справочник остался ради ссылок
	Lifecycle string `json:"lifecycle"`
	// Compatibility — Объём обещания про форму записи: те же стадии, что у операции public API
	Compatibility string `json:"compatibility"`
	// Permission — Право, открывающее справочник: <модуль>:read. Им же витрина отбирает строки
	Permission string `json:"permission"`
}

type CoreDirectoryMount struct {
	// Module — Модуль, из раздела которого открывается этот справочник
	Module string `json:"module"`
	// Path — Экран второго входа
	Path string `json:"path"`
}

type CoreDirectoryPage struct {
	Count int64 `json:"count"`
	// Limit — Потолок каталога — сколько справочников конструктора он читает за раз. Параметра запроса у него нет: каталог отдаётся целиком, и число названо здесь, чтобы предел был виден, а не подразумевался
	Limit int64 `json:"limit"`
	// Truncated — Справочников в кабинете больше потолка, и часть в каталог не попала. Считается по кабинету точно, а не по длине ответа: после чтения набор ещё раз сужают права, и короткий ответ ничего об усечении не говорит. true означает ошибку моделирования на стороне кабинета, а не нормальный режим
	Truncated bool            `json:"truncated"`
	Results   []CoreDirectory `json:"results"`
}

type CoreDocument struct {
	ID              UUID                       `json:"id"`
	TypeID          UUID                       `json:"type_id"`
	TypeKey         string                     `json:"type_key"`
	TypeName        string                     `json:"type_name"`
	Number          string                     `json:"number"`
	Date            string                     `json:"date"`
	Status          CoreDocumentStatus         `json:"status"`
	BasisType       *UUID                      `json:"basis_type"`
	BasisID         *UUID                      `json:"basis_id"`
	BasisNumber     string                     `json:"basis_number"`
	EntityRefs      map[string]json.RawMessage `json:"entity_refs"`
	Payload         map[string]json.RawMessage `json:"payload"`
	Comment         string                     `json:"comment"`
	IsMarkedDeleted bool                       `json:"is_marked_deleted"`
	CreatedBy       *int64                     `json:"created_by"`
	CreatedByName   string                     `json:"created_by_name"`
	CreatedAt       string                     `json:"created_at"`
	UpdatedAt       string                     `json:"updated_at"`
	PostedAt        string                     `json:"posted_at"`
	CancelledAt     string                     `json:"cancelled_at"`
	// Custom — Значения своих полей кабинета (графы вида core.document.<ключ вида>). Отдаёт карточка документа; списки поле не несут
	Custom map[string]json.RawMessage `json:"custom,omitempty"`
}

type CoreDocumentActionCheck struct {
	Allowed bool                      `json:"allowed"`
	Reasons []CoreDocumentBlockReason `json:"reasons"`
}

type CoreDocumentBlockReason struct {
	Code      string                `json:"code"`
	Message   string                `json:"message"`
	Detail    *string               `json:"detail,omitempty"`
	Shortages []CoreBalanceShortage `json:"shortages,omitempty"`
	// DetailCode — Код отказа проводчика внутри причины (например stock_backdated_conflict); detail для него собран на языке запроса.
	DetailCode *string `json:"detail_code,omitempty"`
	// DetailParams — Параметры отказа с кодом detail_code: из них собрана фраза detail.
	DetailParams map[string]string `json:"detail_params,omitempty"`
}

type CoreDocumentBlockers struct {
	DocumentID  UUID                    `json:"document_id"`
	Status      CoreDocumentStatus      `json:"status"`
	Post        CoreDocumentActionCheck `json:"post"`
	Cancel      CoreDocumentActionCheck `json:"cancel"`
	MarkDeleted CoreDocumentActionCheck `json:"mark_deleted"`
}

type CoreDocumentCreate struct {
	TypeID UUID `json:"type_id"`
	// Number — Required for external numbering and forbidden for sequence numbering
	Number *string `json:"number,omitempty"`
	// Date — Empty or omitted means today
	Date       *string                    `json:"date,omitempty"`
	BasisID    *UUID                      `json:"basis_id,omitempty"`
	EntityRefs map[string]json.RawMessage `json:"entity_refs,omitempty"`
	Payload    map[string]json.RawMessage `json:"payload,omitempty"`
	Comment    *string                    `json:"comment,omitempty"`
}

type CoreDocumentLinkNode struct {
	Direction       string             `json:"direction"`
	Depth           int64              `json:"depth"`
	ID              UUID               `json:"id"`
	TypeID          UUID               `json:"type_id"`
	TypeKey         string             `json:"type_key"`
	TypeName        string             `json:"type_name"`
	Number          string             `json:"number"`
	Date            string             `json:"date"`
	Status          CoreDocumentStatus `json:"status"`
	IsMarkedDeleted bool               `json:"is_marked_deleted"`
	BasisID         *UUID              `json:"basis_id"`
}

type CoreDocumentLinks struct {
	Document   CoreDocumentLinkNode          `json:"document"`
	Basis      []CoreDocumentLinkNode        `json:"basis"`
	Dependents []CoreDocumentLinkNode        `json:"dependents"`
	Movements  []CoreDocumentMovementSummary `json:"movements"`
	Truncated  bool                          `json:"truncated"`
}

type CoreDocumentMarkDeleted struct {
	Marked *bool `json:"marked,omitempty"`
}

type CoreDocumentMovementSummary struct {
	RegisterID   UUID                       `json:"register_id"`
	RegisterKey  string                     `json:"register_key"`
	RegisterName string                     `json:"register_name"`
	RegisterKind CoreRegisterKind           `json:"register_kind"`
	Dims         map[string]json.RawMessage `json:"dims"`
	Sign         int64                      `json:"sign"`
	Values       map[string]json.RawMessage `json:"values"`
	EntryCount   int64                      `json:"entry_count"`
}

type CoreDocumentPage struct {
	Count   int64          `json:"count"`
	Results []CoreDocument `json:"results"`
}

type CoreDocumentPatch struct {
	Date       *string                    `json:"date,omitempty"`
	BasisID    *UUID                      `json:"basis_id,omitempty"`
	EntityRefs map[string]json.RawMessage `json:"entity_refs,omitempty"`
	Payload    map[string]json.RawMessage `json:"payload,omitempty"`
	Comment    *string                    `json:"comment,omitempty"`
}

type CoreDocumentStatus = string

type CoreDocumentType struct {
	ID             UUID                       `json:"id"`
	Key            string                     `json:"key"`
	Name           string                     `json:"name"`
	Module         string                     `json:"module"`
	IsSystem       bool                       `json:"is_system"`
	NumberTemplate string                     `json:"number_template"`
	NumberReset    CoreNumberReset            `json:"number_reset"`
	NumberSource   CoreNumberSource           `json:"number_source"`
	Settings       map[string]json.RawMessage `json:"settings"`
	DocumentCount  int64                      `json:"document_count"`
	CreatedAt      string                     `json:"created_at"`
	UpdatedAt      string                     `json:"updated_at"`
}

type CoreDocumentTypeCreate struct {
	Key            string                     `json:"key"`
	Name           string                     `json:"name"`
	Module         *string                    `json:"module,omitempty"`
	NumberTemplate *string                    `json:"number_template,omitempty"`
	NumberReset    *CoreNumberReset           `json:"number_reset,omitempty"`
	NumberSource   *CoreNumberSource          `json:"number_source,omitempty"`
	Settings       map[string]json.RawMessage `json:"settings,omitempty"`
}

type CoreDocumentTypePage struct {
	Count   int64              `json:"count"`
	Results []CoreDocumentType `json:"results"`
}

// CoreDownloadLink — Временный адрес файла core: подписанный адрес хранилища или адрес этого API.
type CoreDownloadLink struct {
	URL    string `json:"url"`
	Method string `json:"method"`
	// Direct — true — подписанный адрес хранилища, без заголовка авторизации; false — адрес этого API, с авторизацией
	Direct bool `json:"direct"`
	// RequiresAuthorization — true — адрес требует токен API, агенту по MCP он недоступен
	RequiresAuthorization bool `json:"requires_authorization"`
	// ExpiresAt — Срок подписанного адреса; у адреса API его нет
	ExpiresAt *string `json:"expires_at,omitempty"`
	Name      string  `json:"name"`
	MimeType  string  `json:"mime_type"`
	SizeBytes int64   `json:"size_bytes"`
	// Sha256 — Контрольная сумма SHA-256, если известна
	Sha256 *string `json:"sha256,omitempty"`
	// ScanStatus — Вердикт антивируса у файла от человека; skipped — файл антивирус не проверял
	ScanStatus *string `json:"scan_status,omitempty"`
}

type CoreEmployee struct {
	ID                UUID    `json:"id"`
	FullName          string  `json:"full_name"`
	FirstName         string  `json:"first_name"`
	LastName          string  `json:"last_name"`
	MiddleName        string  `json:"middle_name"`
	Position          string  `json:"position"`
	PositionID        *string `json:"position_id"`
	PositionLabel     string  `json:"position_label"`
	CompanyID         *string `json:"company_id"`
	CompanyName       string  `json:"company_name"`
	Department        string  `json:"department"`
	Location          string  `json:"location"`
	ManagerEmployeeID *string `json:"manager_employee_id"`
	ManagerName       string  `json:"manager_name"`
	// Phone — Пусто у чужой карточки без права core.employee_requisites:read
	Phone string `json:"phone"`
	// Email — Пусто у чужой карточки без права core.employee_requisites:read
	Email    string `json:"email"`
	UserID   *int64 `json:"user_id"`
	Username string `json:"username"`
	RoleName string `json:"role_name"`
	// EmployedAt — Date or empty string
	EmployedAt string `json:"employed_at"`
	IsActive   bool   `json:"is_active"`
	// Notes — Пусто у чужой карточки без права core.employee_requisites:read
	Notes     string `json:"notes"`
	HasPhoto  bool   `json:"has_photo"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
	// INN — ИНН для выплаты; пусто у чужой карточки без права core.employee_requisites:read
	INN *string `json:"inn,omitempty"`
	// BankBIC — БИК банка выплаты; пусто у чужой карточки без права core.employee_requisites:read
	BankBIC *string `json:"bank_bic,omitempty"`
	// BankAccount — Счёт или карта выплаты; пусто у чужой карточки без права core.employee_requisites:read
	BankAccount *string `json:"bank_account,omitempty"`
}

type CoreEmployeeCreateVariant1 struct {
	FullName string `json:"full_name"`
}

type CoreEmployeeCreateVariant2 struct {
	FirstName string `json:"first_name"`
}

type CoreEmployeeCreateVariant3 struct {
	LastName string `json:"last_name"`
}

type CoreEmployeeCreateVariant4 struct {
	MiddleName string `json:"middle_name"`
}

type CoreEmployeeCreate = json.RawMessage

type CoreEmployeePage struct {
	Count int64 `json:"count"`
	// Limit — Применённый размер страницы — после зажима до потолка
	Limit int64 `json:"limit"`
	// Offset — Применённое смещение
	Offset  int64          `json:"offset"`
	Results []CoreEmployee `json:"results"`
}

type CoreGLAccount struct {
	ID              UUID              `json:"id"`
	Code            string            `json:"code"`
	Name            string            `json:"name"`
	Type            CoreGLAccountType `json:"type"`
	ParentID        *UUID             `json:"parent_id,omitempty"`
	IsActive        bool              `json:"is_active"`
	IsSystem        bool              `json:"is_system"`
	AffectsPNL      bool              `json:"affects_pnl"`
	OpeningInput    string            `json:"opening_input"`
	AffectsCashflow bool              `json:"affects_cashflow"`
	CreatedAt       string            `json:"created_at"`
	UpdatedAt       string            `json:"updated_at"`
}

type CoreGLAccountCreate struct {
	Code     string            `json:"code"`
	Name     string            `json:"name"`
	Type     CoreGLAccountType `json:"type"`
	ParentID *UUID             `json:"parent_id,omitempty"`
	// AffectsPNL — Ignored; server derives it from type
	AffectsPNL      *bool `json:"affects_pnl,omitempty"`
	AffectsCashflow *bool `json:"affects_cashflow,omitempty"`
}

type CoreGLAccountPage struct {
	Count   int64           `json:"count"`
	Results []CoreGLAccount `json:"results"`
}

type CoreGLAccountType = string

type CoreGLMapping struct {
	ID          UUID    `json:"id"`
	SubjectType string  `json:"subject_type"`
	SubjectID   *UUID   `json:"subject_id,omitempty"`
	AccountID   UUID    `json:"account_id"`
	AccountCode string  `json:"account_code"`
	AccountName string  `json:"account_name"`
	ValidFrom   string  `json:"valid_from"`
	ValidTo     *string `json:"valid_to,omitempty"`
	IsSystem    bool    `json:"is_system"`
	Comment     string  `json:"comment"`
}

type CoreGLMappingCreate struct {
	SubjectType string `json:"subject_type"`
	SubjectID   *UUID  `json:"subject_id,omitempty"`
	AccountID   UUID   `json:"account_id"`
	// ValidFrom — Omitted means today
	ValidFrom *string `json:"valid_from,omitempty"`
	Comment   *string `json:"comment,omitempty"`
}

type CoreGLMappingPage struct {
	Count   int64           `json:"count"`
	Results []CoreGLMapping `json:"results"`
}

type CoreImportResult struct {
	Created int64 `json:"created"`
	Updated int64 `json:"updated"`
}

type CoreItem struct {
	ID                  UUID    `json:"id"`
	Code                string  `json:"code"`
	Name                string  `json:"name"`
	UseCashflow         bool    `json:"use_cashflow"`
	CashflowSection     string  `json:"cashflow_section"`
	CashflowSectionName *string `json:"cashflow_section_name,omitempty"`
	CashflowParentID    *UUID   `json:"cashflow_parent_id,omitempty"`
	CashflowSortOrder   int64   `json:"cashflow_sort_order"`
	UsePNL              bool    `json:"use_pnl"`
	// InternalTurnover — Статья внутреннего оборота между ЦФО; обороты исключаются из сводного ОПиУ (ERP-1493)
	InternalTurnover *bool  `json:"internal_turnover,omitempty"`
	PNLSign          *int64 `json:"pnl_sign,omitempty"`
	IsSystem         bool   `json:"is_system"`
	PNLParentID      *UUID  `json:"pnl_parent_id,omitempty"`
	PNLSortOrder     int64  `json:"pnl_sort_order"`
	UsageCount       int64  `json:"usage_count"`
	// VATKind — Вид ставки НДС сделки без товара по статье дохода; пусто — общая
	VATKind *string `json:"vat_kind,omitempty"`
}

type CoreItemInput struct {
	Code              *string `json:"code,omitempty"`
	Name              string  `json:"name"`
	UseCashflow       *bool   `json:"use_cashflow,omitempty"`
	CashflowSection   *string `json:"cashflow_section,omitempty"`
	CashflowParentID  *UUID   `json:"cashflow_parent_id,omitempty"`
	CashflowSortOrder *int64  `json:"cashflow_sort_order,omitempty"`
	UsePNL            *bool   `json:"use_pnl,omitempty"`
	// InternalTurnover — Статья внутреннего оборота между ЦФО; обороты исключаются из сводного ОПиУ (ERP-1493)
	InternalTurnover *bool  `json:"internal_turnover,omitempty"`
	PNLSign          *int64 `json:"pnl_sign,omitempty"`
	PNLParentID      *UUID  `json:"pnl_parent_id,omitempty"`
	PNLSortOrder     *int64 `json:"pnl_sort_order,omitempty"`
	// VATKind — Вид ставки НДС статьи дохода; не передан — не меняется; у статьи не дохода — 400
	VATKind *string `json:"vat_kind,omitempty"`
}

type CoreItemMove struct {
	Application     string  `json:"application"`
	ParentID        *UUID   `json:"parent_id,omitempty"`
	CashflowSection *string `json:"cashflow_section,omitempty"`
	Position        int64   `json:"position"`
}

type CoreItemPage struct {
	Count   int64      `json:"count"`
	Results []CoreItem `json:"results"`
}

// CoreLetterhead — Бланк юрлица. Ключи файлов наружу не отдаются: images говорит только, есть ли картинка на месте.
type CoreLetterhead struct {
	CompanyID       UUID                 `json:"company_id"`
	Version         int64                `json:"version"`
	DirectorName    *string              `json:"director_name,omitempty"`
	DirectorTitle   *string              `json:"director_title,omitempty"`
	AccountantName  *string              `json:"accountant_name,omitempty"`
	AccountantTitle *string              `json:"accountant_title,omitempty"`
	BankAccountID   *UUID                `json:"bank_account_id,omitempty"`
	PrintFacsimile  *bool                `json:"print_facsimile,omitempty"`
	Images          CoreLetterheadImages `json:"images"`
}

type CoreLetterheadImages struct {
	Logo                bool `json:"logo"`
	Stamp               bool `json:"stamp"`
	DirectorSignature   bool `json:"director_signature"`
	AccountantSignature bool `json:"accountant_signature"`
}

type CoreNumberReset = string

type CoreNumberSource = string

// CoreOrder — Продажа или закупка — документ ядра. В журнале строка без obligation и allowed_actions; карточка и ответы команд несут обе.
type CoreOrder struct {
	ID             UUID               `json:"id"`
	Side           CoreOrderSide      `json:"side"`
	TypeKey        string             `json:"type_key"`
	Number         string             `json:"number"`
	Date           string             `json:"date"`
	DocumentStatus CoreDocumentStatus `json:"document_status"`
	State          CoreOrderState     `json:"state"`
	BusinessID     UUID               `json:"business_id"`
	CompanyID      *UUID              `json:"company_id,omitempty"`
	ContactID      UUID               `json:"contact_id"`
	BusinessName   *string            `json:"business_name,omitempty"`
	CompanyName    *string            `json:"company_name,omitempty"`
	ContactName    *string            `json:"contact_name,omitempty"`
	ContractID     *UUID              `json:"contract_id,omitempty"`
	// ContractNumber — Номер договора продажи или закупки — для экрана
	ContractNumber *string `json:"contract_number,omitempty"`
	// ContractDate — Дата договора продажи или закупки — для экрана
	ContractDate *string            `json:"contract_date,omitempty"`
	Progress     *CoreOrderProgress `json:"progress,omitempty"`
	ProjectID    *UUID              `json:"project_id,omitempty"`
	// DepartmentID — Подразделение продажи или закупки — элемент справочника «Подразделения»; наследуют исполнения и себестоимость (КЦ § 4.4)
	DepartmentID map[string]json.RawMessage `json:"department_id,omitempty"`
	// CfoID — ЦФО продажи или закупки — элемент справочника «ЦФО»; наследуют исполнения и себестоимость (КЦ § 4.4)
	CfoID map[string]json.RawMessage `json:"cfo_id,omitempty"`
	// PNLItemID — Статья исполнений продажи или закупки (выручка у продажи, расход у закупки); пусто — правило учётной политики по виду строки, иначе системная статья
	PNLItemID map[string]json.RawMessage `json:"pnl_item_id,omitempty"`
	// ExecutionCutover — Бизнес продажи или закупки прошёл отсечку этапа 4: исполнение закрывает вклад регистра «Продажи и закупки» и признаёт выручку; «Сделать акт» в документообороте выпускает бумагу и проводит исполнение одной командой
	ExecutionCutover *bool  `json:"execution_cutover,omitempty"`
	WarehouseID      *UUID  `json:"warehouse_id,omitempty"`
	BasisID          *UUID  `json:"basis_id,omitempty"`
	Title            string `json:"title"`
	Currency         string `json:"currency"`
	PricesIncludeVAT bool   `json:"prices_include_vat"`
	// Discount — Скидка на продажу или закупку целиком, как её ввели; в суммах строк уже учтена
	Discount          string                 `json:"discount"`
	DeliveryDate      *string                `json:"delivery_date,omitempty"`
	DueDate           *string                `json:"due_date,omitempty"`
	Scenario          string                 `json:"scenario"`
	ManagerNote       *string                `json:"manager_note,omitempty"`
	Comment           *string                `json:"comment,omitempty"`
	Buyer             *CoreOrderBuyer        `json:"buyer,omitempty"`
	SourceKind        CoreOrderSourceKind    `json:"source_kind"`
	SourceSystem      *string                `json:"source_system,omitempty"`
	ExternalID        *string                `json:"external_id,omitempty"`
	CabinetStatusID   *UUID                  `json:"cabinet_status_id,omitempty"`
	CabinetStatusName *string                `json:"cabinet_status_name,omitempty"`
	FunnelID          *UUID                  `json:"funnel_id,omitempty"`
	Version           int64                  `json:"version"`
	ClosedAt          *string                `json:"closed_at,omitempty"`
	ClosedReason      *string                `json:"closed_reason,omitempty"`
	CloseDocumentID   *UUID                  `json:"close_document_id,omitempty"`
	MigratedFrom      *string                `json:"migrated_from,omitempty"`
	Lines             []CoreOrderLine        `json:"lines"`
	Responsibles      []CoreOrderResponsible `json:"responsibles"`
	// Stages — Этапы работ продажи или закупки (этап 4 ERP-1427)
	Stages []CoreOrderStage `json:"stages,omitempty"`
	// PaymentTerms — График оплат продажи или закупки; id строки — разрез stage регистра расчётов
	PaymentTerms []CoreOrderPaymentTerm `json:"payment_terms,omitempty"`
	Totals       CoreOrderTotals        `json:"totals"`
	CreatedBy    *int64                 `json:"created_by,omitempty"`
	CreatedAt    string                 `json:"created_at"`
	UpdatedAt    string                 `json:"updated_at"`
	PostedAt     *string                `json:"posted_at,omitempty"`
	CancelledAt  *string                `json:"cancelled_at,omitempty"`
	Obligation   *CoreOrderObligation   `json:"obligation,omitempty"`
	// AllowedActions — Только в карточке и ответах команд
	AllowedActions []CoreOrderAllowedAction `json:"allowed_actions,omitempty"`
	// VATWarnings — Только в карточке: строки со ставкой, названной человеком, равной прежней общей ставке юрлица, когда на сегодня общая ставка уже другая — «проверьте ставку», не отказ
	VATWarnings []CoreOrderVATWarning `json:"vat_warnings,omitempty"`
}

type CoreOrderAllowedAction struct {
	Action  string `json:"action"`
	Allowed bool   `json:"allowed"`
	// ReasonCode — Код отказа: core.trade.has_executions, core.trade.has_dependents (оплаты, авансы, черновики исполнений), core.trade.closed, core.trade.forbidden
	ReasonCode *string `json:"reason_code,omitempty"`
	// Reason — Причина словами на языке запроса
	Reason *string `json:"reason,omitempty"`
}

// CoreOrderBuyer — Покупатель-физлицо: розничный продажа или закупка стоит на общей карточке покупателя, и различает покупателей только это.
type CoreOrderBuyer struct {
	Name  *string `json:"name,omitempty"`
	Phone *string `json:"phone,omitempty"`
	Email *string `json:"email,omitempty"`
}

type CoreOrderCabinetStatusInput struct {
	StatusID UUID `json:"status_id"`
}

type CoreOrderCloseInput struct {
	// Reason — Почему остаток больше не нужен
	Reason *string `json:"reason,omitempty"`
}

// CoreOrderCounterparty — Покупатель загрузки без id: юрлицо узнаётся по ИНН и КПП, физлицо — по телефону или заводится.
type CoreOrderCounterparty struct {
	Name  *string `json:"name,omitempty"`
	INN   *string `json:"inn,omitempty"`
	KPP   *string `json:"kpp,omitempty"`
	Phone *string `json:"phone,omitempty"`
	Email *string `json:"email,omitempty"`
}

type CoreOrderEvent struct {
	ID      UUID `json:"id"`
	OrderID UUID `json:"order_id"`
	// Kind — created, revised, confirmed, cancelled, closed, reopened, status, responsibles, import, migrated, executing, executed, execution_reverted (состояние исполнения сменилось само после акта, отгрузки, приёмки, их отмены или возврата: payload state, previous_state, baseline — true у строки досева продажи или закупки, исполненного до появления этих событий, без вебхука; автор — система; execution_reverted — продажа или закупка снова confirmed), step (срок шага воронки: payload step_key, step_title, due_date, previous_due_date, shifted), automation (сработало правило: payload rule_id, rule_name, funnel_name, event_type, commands, failed)
	Kind          string  `json:"kind"`
	Detail        *string `json:"detail,omitempty"`
	EffectiveDate *string `json:"effective_date,omitempty"`
	StatusID      *UUID   `json:"status_id,omitempty"`
	ActorID       *int64  `json:"actor_id,omitempty"`
	ActorKind     *string `json:"actor_kind,omitempty"`
	ActorName     *string `json:"actor_name,omitempty"`
	StatusName    *string `json:"status_name,omitempty"`
	// Payload — Разница версий: у revised — версия и что изменилось
	Payload   map[string]json.RawMessage `json:"payload,omitempty"`
	CreatedAt string                     `json:"created_at"`
}

type CoreOrderFunnel struct {
	ID         UUID                   `json:"id"`
	Side       string                 `json:"side"`
	Name       string                 `json:"name"`
	Source     string                 `json:"source"`
	IsDefault  bool                   `json:"is_default"`
	IsArchived bool                   `json:"is_archived"`
	Version    int64                  `json:"version"`
	Steps      []CoreOrderFunnelStep  `json:"steps"`
	Stages     []CoreOrderFunnelStage `json:"stages"`
	UpdatedAt  string                 `json:"updated_at"`
}

type CoreOrderFunnelChoice struct {
	// FunnelID — null — продажа или закупка без воронки
	FunnelID *UUID `json:"funnel_id"`
}

type CoreOrderFunnelInput struct {
	Side string `json:"side"`
	Name string `json:"name"`
	// Source — Источник заказа: общий вид или точное приложение app.издатель.ключ; точное приложение имеет приоритет. Пусто — по источнику не выбирать
	Source *string `json:"source,omitempty"`
	// IsDefault — Воронка стороны по умолчанию — одна на сторону
	IsDefault  *bool                  `json:"is_default,omitempty"`
	IsArchived *bool                  `json:"is_archived,omitempty"`
	Steps      []CoreOrderFunnelStep  `json:"steps,omitempty"`
	Stages     []CoreOrderFunnelStage `json:"stages,omitempty"`
}

type CoreOrderFunnelList struct {
	Funnels []CoreOrderFunnel `json:"funnels"`
}

type CoreOrderFunnelStage struct {
	ID       *UUID          `json:"id,omitempty"`
	Name     string         `json:"name"`
	Category CoreOrderState `json:"category"`
	Color    *string        `json:"color,omitempty"`
	Position *int64         `json:"position,omitempty"`
}

type CoreOrderFunnelStep struct {
	// Key — Пусто — вид и номер шага
	Key   *string `json:"key,omitempty"`
	Kind  string  `json:"kind"`
	Title string  `json:"title"`
	// Required — Участвует ли шаг в воронке: ненужный шаг продаже или закупке не строится
	Required *bool                   `json:"required,omitempty"`
	Due      *CoreOrderFunnelStepDue `json:"due,omitempty"`
	// DoneWhen — Что закрывает шаг: manual — человек отметит (пусто так же); state:<состояние> — продажа или закупка дошёл до состояния; paid:<N> — оплачено не меньше N % суммы продажи или закупки (финансы); paper:act_signed, paper:upd_signed — контрагент подписал акт или УПД в ЭДО (документооборот)
	DoneWhen *string `json:"done_when,omitempty"`
	// RemindDays — За сколько дней до срока прийти событию «срок подходит»
	RemindDays *int64 `json:"remind_days,omitempty"`
}

type CoreOrderFunnelStepDue struct {
	// After — От чего считается срок; пусто — без срока
	After *string `json:"after,omitempty"`
	Days  *int64  `json:"days,omitempty"`
}

type CoreOrderFunnelTemplate struct {
	Key         string               `json:"key"`
	Name        string               `json:"name"`
	Description string               `json:"description"`
	Funnel      CoreOrderFunnelInput `json:"funnel"`
}

type CoreOrderFunnelTemplateList struct {
	Templates []CoreOrderFunnelTemplate `json:"templates"`
}

type CoreOrderFunnelVersion struct {
	Version      int64                `json:"version"`
	Document     CoreOrderFunnelInput `json:"document"`
	AuthorUserID *int64               `json:"author_user_id,omitempty"`
	CreatedAt    string               `json:"created_at"`
}

type CoreOrderFunnelVersionList struct {
	Versions []CoreOrderFunnelVersion `json:"versions"`
}

type CoreOrderFunnelView struct {
	FunnelID   *UUID                `json:"funnel_id,omitempty"`
	FunnelName *string              `json:"funnel_name,omitempty"`
	Steps      []CoreOrderStepState `json:"steps"`
}

type CoreOrderHistory struct {
	Events    []CoreOrderEvent           `json:"events"`
	Documents []CoreOrderHistoryDocument `json:"documents"`
}

// CoreOrderHistoryDocument — Документ модуля, выросший из продажи или закупки: акт, отгрузка, счёт.
type CoreOrderHistoryDocument struct {
	Source    string  `json:"source"`
	Module    string  `json:"module"`
	Section   string  `json:"section"`
	ID        UUID    `json:"id"`
	Kind      string  `json:"kind"`
	KindName  *string `json:"kind_name,omitempty"`
	Number    string  `json:"number"`
	Date      string  `json:"date"`
	DueDate   *string `json:"due_date,omitempty"`
	Amount    *string `json:"amount,omitempty"`
	Currency  *string `json:"currency,omitempty"`
	Direction *string `json:"direction,omitempty"`
	// Provider — Эквайер подтверждённой оплаты картой; только у документа оплаты. Внешний номер платежа не раскрывается.
	Provider   *string `json:"provider,omitempty"`
	Status     string  `json:"status"`
	StatusName *string `json:"status_name,omitempty"`
	Title      *string `json:"title,omitempty"`
	CreatedAt  string  `json:"created_at"`
}

type CoreOrderImportEntry struct {
	ID         UUID          `json:"id"`
	Side       CoreOrderSide `json:"side"`
	ExternalID string        `json:"external_id"`
	Source     string        `json:"source"`
	Outcome    string        `json:"outcome"`
	Reason     *string       `json:"reason,omitempty"`
	Detail     *string       `json:"detail,omitempty"`
	OrderID    *UUID         `json:"order_id,omitempty"`
	CreatedAt  string        `json:"created_at"`
}

type CoreOrderImportInput struct {
	Side CoreOrderSide `json:"side"`
	// Number — Свой номер; пусто — номер выдаёт счётчик вида
	Number     *string `json:"number,omitempty"`
	Date       string  `json:"date"`
	BusinessID *UUID   `json:"business_id,omitempty"`
	CompanyID  *UUID   `json:"company_id,omitempty"`
	// ContactID — Контрагент; у загрузки вместо него можно прислать counterparty
	ContactID    *UUID                  `json:"contact_id,omitempty"`
	Counterparty *CoreOrderCounterparty `json:"counterparty,omitempty"`
	ContractID   *UUID                  `json:"contract_id,omitempty"`
	ProjectID    *UUID                  `json:"project_id,omitempty"`
	// DepartmentID — Подразделение продажи или закупки — элемент справочника «Подразделения»; наследуют исполнения и себестоимость (КЦ § 4.4)
	DepartmentID map[string]json.RawMessage `json:"department_id,omitempty"`
	// CfoID — ЦФО продажи или закупки — элемент справочника «ЦФО»; наследуют исполнения и себестоимость (КЦ § 4.4)
	CfoID       map[string]json.RawMessage `json:"cfo_id,omitempty"`
	WarehouseID *UUID                      `json:"warehouse_id,omitempty"`
	// BasisID — Основание — например, заявка на закупку
	BasisID  *UUID   `json:"basis_id,omitempty"`
	Title    *string `json:"title,omitempty"`
	Currency string  `json:"currency"`
	// PricesIncludeVAT — Цены с НДС («в том числе»); по умолчанию true
	PricesIncludeVAT *bool `json:"prices_include_vat,omitempty"`
	// Discount — Скидка на продажу или закупку целиком; раскладывается по строкам пропорционально их суммам до НДС
	Discount        *string                `json:"discount,omitempty"`
	DeliveryDate    *string                `json:"delivery_date,omitempty"`
	DueDate         *string                `json:"due_date,omitempty"`
	Scenario        *string                `json:"scenario,omitempty"`
	ManagerNote     *string                `json:"manager_note,omitempty"`
	Comment         *string                `json:"comment,omitempty"`
	Buyer           *CoreOrderBuyer        `json:"buyer,omitempty"`
	Lines           []CoreOrderLineInput   `json:"lines"`
	Responsibles    []CoreOrderResponsible `json:"responsibles,omitempty"`
	CabinetStatusID *UUID                  `json:"cabinet_status_id,omitempty"`
	// Confirm — Подтвердить продажу или закупку, если он ещё черновик
	Confirm *bool `json:"confirm,omitempty"`
	// ExternalID — Номер продажи или закупки у источника; по стороне и нему узнаётся повтор
	ExternalID string `json:"external_id"`
	// SourceSystem — Имя источника для журнала загрузок: сайт, CRM
	SourceSystem *string `json:"source_system,omitempty"`
	// FunnelID — Необязательная действующая воронка этой стороны в данном кабинете. Выбирается атомарно с созданием продажи или закупки; повтор с другим funnel_id возвращает 409, неверная или архивная воронка — 422. Без поля действует воронка договора, источника или умолчание.
	FunnelID *UUID `json:"funnel_id,omitempty"`
}

type CoreOrderImportList struct {
	Items []CoreOrderImportEntry `json:"items"`
}

// CoreOrderInput — Продажа или закупка из запроса: поля одни для формы, загрузки и фасадов модулей.
type CoreOrderInput struct {
	Side CoreOrderSide `json:"side"`
	// Number — Свой номер; пусто — номер выдаёт счётчик вида
	Number     *string `json:"number,omitempty"`
	Date       string  `json:"date"`
	BusinessID *UUID   `json:"business_id,omitempty"`
	CompanyID  *UUID   `json:"company_id,omitempty"`
	// ContactID — Контрагент; у загрузки вместо него можно прислать counterparty
	ContactID    *UUID                  `json:"contact_id,omitempty"`
	Counterparty *CoreOrderCounterparty `json:"counterparty,omitempty"`
	ContractID   *UUID                  `json:"contract_id,omitempty"`
	ProjectID    *UUID                  `json:"project_id,omitempty"`
	// DepartmentID — Подразделение продажи или закупки — элемент справочника «Подразделения»; наследуют исполнения и себестоимость (КЦ § 4.4)
	DepartmentID map[string]json.RawMessage `json:"department_id,omitempty"`
	// CfoID — ЦФО продажи или закупки — элемент справочника «ЦФО»; наследуют исполнения и себестоимость (КЦ § 4.4)
	CfoID map[string]json.RawMessage `json:"cfo_id,omitempty"`
	// PNLItemID — Статья исполнений продажи или закупки; не названа при правке — сохраняется прежняя
	PNLItemID   map[string]json.RawMessage `json:"pnl_item_id,omitempty"`
	WarehouseID *UUID                      `json:"warehouse_id,omitempty"`
	// BasisID — Основание — например, заявка на закупку
	BasisID  *UUID   `json:"basis_id,omitempty"`
	Title    *string `json:"title,omitempty"`
	Currency string  `json:"currency"`
	// PricesIncludeVAT — Цены с НДС («в том числе»); по умолчанию true
	PricesIncludeVAT *bool `json:"prices_include_vat,omitempty"`
	// Discount — Скидка на продажу или закупку целиком; раскладывается по строкам пропорционально их суммам до НДС
	Discount     *string                `json:"discount,omitempty"`
	DeliveryDate *string                `json:"delivery_date,omitempty"`
	DueDate      *string                `json:"due_date,omitempty"`
	Scenario     *string                `json:"scenario,omitempty"`
	ManagerNote  *string                `json:"manager_note,omitempty"`
	Comment      *string                `json:"comment,omitempty"`
	Buyer        *CoreOrderBuyer        `json:"buyer,omitempty"`
	Lines        []CoreOrderLineInput   `json:"lines"`
	Responsibles []CoreOrderResponsible `json:"responsibles,omitempty"`
	// Stages — Этапы работ целиком, правка по id; не названы — не меняются
	Stages []CoreOrderStage `json:"stages,omitempty"`
	// PaymentTerms — График оплат целиком, правка по id; не назван — не меняется
	PaymentTerms    []CoreOrderPaymentTerm `json:"payment_terms,omitempty"`
	CabinetStatusID *UUID                  `json:"cabinet_status_id,omitempty"`
	// Confirm — Сразу подтвердить созданный продажу или закупку
	Confirm *bool `json:"confirm,omitempty"`
}

type CoreOrderLine struct {
	ID        UUID              `json:"id"`
	Position  int64             `json:"position"`
	Kind      CoreOrderLineKind `json:"kind"`
	ProductID *UUID             `json:"product_id,omitempty"`
	Title     string            `json:"title"`
	Unit      *string           `json:"unit,omitempty"`
	UnitID    *UUID             `json:"unit_id,omitempty"`
	// Quantity — Десятичное число строкой
	Quantity string `json:"quantity"`
	// Price — Десятичное число строкой
	Price string `json:"price"`
	// Discount — Скидка самой строки
	Discount string `json:"discount"`
	// DiscountAmount — Доля скидки продажи или закупки на этой строке; суммы строки посчитаны после обеих скидок
	DiscountAmount string `json:"discount_amount"`
	// VATRate — Ставка, как её ввели; пусто — по учётной политике
	VATRate *string `json:"vat_rate,omitempty"`
	// VATRateApplied — Ставка, по которой строка посчитана; пусто — налог не выделен
	VATRateApplied *string `json:"vat_rate_applied,omitempty"`
	// AmountNet — Сумма строкой в разрядности валюты продажи или закупки
	AmountNet string `json:"amount_net"`
	// VATAmount — Сумма строкой в разрядности валюты продажи или закупки
	VATAmount string `json:"vat_amount"`
	// AmountGross — Сумма строкой в разрядности валюты продажи или закупки
	AmountGross string `json:"amount_gross"`
	// BaseQty — Количество в базовой единице склада
	BaseQty         *string `json:"base_qty,omitempty"`
	BasisDocumentID *UUID   `json:"basis_document_id,omitempty"`
	BasisLineID     *UUID   `json:"basis_line_id,omitempty"`
}

type CoreOrderLineInput struct {
	// ID — Id существующей строки — её правка; без id — новая строка
	ID        *UUID              `json:"id,omitempty"`
	Kind      *CoreOrderLineKind `json:"kind,omitempty"`
	ProductID *UUID              `json:"product_id,omitempty"`
	// Article — Артикул — позиция узнаётся по нему, если id не назван
	Article *string `json:"article,omitempty"`
	Title   string  `json:"title"`
	Unit    *string `json:"unit,omitempty"`
	UnitID  *UUID   `json:"unit_id,omitempty"`
	// Quantity — Десятичное число строкой
	Quantity string `json:"quantity"`
	// Price — Десятичное число строкой
	Price string `json:"price"`
	// Discount — Десятичное число строкой
	Discount *string `json:"discount,omitempty"`
	// VATRate — Ставка НДС строки; пусто — по учётной политике юрлица на дату продажи или закупки
	VATRate *string `json:"vat_rate,omitempty"`
	// BaseQty — Десятичное число строкой
	BaseQty         *string `json:"base_qty,omitempty"`
	BasisDocumentID *UUID   `json:"basis_document_id,omitempty"`
	BasisLineID     *UUID   `json:"basis_line_id,omitempty"`
}

type CoreOrderLineKind = string

// CoreOrderNowAct — Реквизиты акта; пусто — дата продажи или закупки, номер по счётчику, название по продаже или закупке
type CoreOrderNowAct struct {
	Date   *string `json:"date,omitempty"`
	Number *string `json:"number,omitempty"`
	Title  *string `json:"title,omitempty"`
	// SupplierDocument — Номер и дата документа поставщика (СФ, УПД); только у закупки
	SupplierDocument *CoreOrderNowActSupplierDocument `json:"supplier_document,omitempty"`
	// VATAmount — «В т.ч. НДС» с документа поставщика; только у закупки. Без поля — налог заказа по строкам
	VATAmount *string               `json:"vat_amount,omitempty"`
	Source1c  *CoreOrderNowSource1C `json:"source_1c,omitempty"`
}

// CoreOrderNowActSupplierDocument — Номер и дата документа поставщика (СФ, УПД); только у закупки
type CoreOrderNowActSupplierDocument struct {
	Number *string `json:"number,omitempty"`
	Date   *string `json:"date,omitempty"`
}

// CoreOrderNowExecution — Что выпустил владелец исполнения. docflow — бумага документооборота (paper_*), при финансах после отсечки — с учётным документом исполнения (execution_*); finance — акт финансов без бумаги.
type CoreOrderNowExecution struct {
	Owner       string  `json:"owner"`
	PaperID     *UUID   `json:"paper_id,omitempty"`
	PaperNumber *string `json:"paper_number,omitempty"`
	// PaperStatus — registered — бумага с проведённым исполнением; draft — бумага без книги (финансы выключены)
	PaperStatus     *string `json:"paper_status,omitempty"`
	ExecutionID     *UUID   `json:"execution_id,omitempty"`
	ExecutionNumber *string `json:"execution_number,omitempty"`
}

// CoreOrderNowInput — Продажа или закупка целиком, его внешний номер и акт. Поля продажи или закупки — те же, что у загрузки; подтверждение подразумевается.
type CoreOrderNowInput struct {
	Side CoreOrderSide `json:"side"`
	// Number — Свой номер; пусто — номер выдаёт счётчик вида
	Number     *string `json:"number,omitempty"`
	Date       string  `json:"date"`
	BusinessID *UUID   `json:"business_id,omitempty"`
	CompanyID  *UUID   `json:"company_id,omitempty"`
	// ContactID — Контрагент; вместо него можно прислать counterparty
	ContactID    *UUID                  `json:"contact_id,omitempty"`
	Counterparty *CoreOrderCounterparty `json:"counterparty,omitempty"`
	ContractID   *UUID                  `json:"contract_id,omitempty"`
	ProjectID    *UUID                  `json:"project_id,omitempty"`
	// DepartmentID — Подразделение продажи или закупки — элемент справочника «Подразделения»; наследуют исполнения и себестоимость (КЦ § 4.4)
	DepartmentID map[string]json.RawMessage `json:"department_id,omitempty"`
	// CfoID — ЦФО продажи или закупки — элемент справочника «ЦФО»; наследуют исполнения и себестоимость (КЦ § 4.4)
	CfoID map[string]json.RawMessage `json:"cfo_id,omitempty"`
	// PNLItemID — Статья выручки (у закупки — расхода) исполнения; пусто — по учётной политике бизнеса
	PNLItemID   map[string]json.RawMessage `json:"pnl_item_id,omitempty"`
	WarehouseID *UUID                      `json:"warehouse_id,omitempty"`
	BasisID     *UUID                      `json:"basis_id,omitempty"`
	Title       *string                    `json:"title,omitempty"`
	Currency    string                     `json:"currency"`
	// PricesIncludeVAT — Цены с НДС («в том числе»); по умолчанию true
	PricesIncludeVAT *bool                  `json:"prices_include_vat,omitempty"`
	Discount         *string                `json:"discount,omitempty"`
	DeliveryDate     *string                `json:"delivery_date,omitempty"`
	DueDate          *string                `json:"due_date,omitempty"`
	Scenario         *string                `json:"scenario,omitempty"`
	ManagerNote      *string                `json:"manager_note,omitempty"`
	Comment          *string                `json:"comment,omitempty"`
	Buyer            *CoreOrderBuyer        `json:"buyer,omitempty"`
	Lines            []CoreOrderLineInput   `json:"lines"`
	Responsibles     []CoreOrderResponsible `json:"responsibles,omitempty"`
	Stages           []CoreOrderStage       `json:"stages,omitempty"`
	PaymentTerms     []CoreOrderPaymentTerm `json:"payment_terms,omitempty"`
	CabinetStatusID  *UUID                  `json:"cabinet_status_id,omitempty"`
	// ExternalID — Номер продажи или закупки у источника; по стороне и нему узнаётся повтор
	ExternalID string `json:"external_id"`
	// SourceSystem — Имя источника: сайт, CRM, маркетплейс
	SourceSystem *string          `json:"source_system,omitempty"`
	Act          *CoreOrderNowAct `json:"act,omitempty"`
}

type CoreOrderNowResult struct {
	Order     CoreOrder             `json:"order"`
	Execution CoreOrderNowExecution `json:"execution"`
	// Replayed — true — продажа или закупка уже был исполнен этой командой; ничего не записано
	Replayed bool `json:"replayed"`
}

// CoreOrderNowSource1C — Документ 1С, из которого перенесён акт поставщика: до даты переноса бизнеса принимается без бумаги
type CoreOrderNowSource1C struct {
	// RefKey — Ref_Key документа 1С
	RefKey string `json:"ref_key"`
	// Number — Номер документа в 1С
	Number *string `json:"number,omitempty"`
	// Date — Дата документа в 1С
	Date *string `json:"date,omitempty"`
}

type CoreOrderObligation struct {
	// Ordered — Действующий приход подтверждения в регистре «Продажи и закупки»
	Ordered string `json:"ordered"`
	// Remaining — Остаток портфеля продажи или закупки в регистре «Продажи и закупки»: заказано минус снятое закрытием. Это не денежный долг: долг контрагента и зачёт аванса живут в расчётах (settlement), и при «Долг 0,00» этот остаток остаётся полным. До этапа 4 исполнение его не уменьшает, поэтому это и не «осталось исполнить»
	Remaining string `json:"remaining"`
	// Executed — Исполнено: сумма проведённых исполнений продажи или закупки (акт, продажа, закупка, приёмка) за вычетом возвратов, в валюте продажи или закупки. То же число, что в журнале продаж и закупок финансов (core_order_executed)
	Executed string `json:"executed"`
	// RemainingToExecute — Осталось исполнить: заказано минус исполнено, не меньше нуля
	RemainingToExecute string `json:"remaining_to_execute"`
}

type CoreOrderPage struct {
	Items []CoreOrder `json:"items"`
	// Total — Сколько продаж или закупок под отбором всего
	Total   int64 `json:"total"`
	Limit   int64 `json:"limit"`
	Offset  int64 `json:"offset"`
	HasMore bool  `json:"has_more"`
	// StateCounts — Только с with=counts: число продаж или закупок по состояниям при том же отборе без отбора состояний
	StateCounts map[string]int64 `json:"state_counts,omitempty"`
}

// CoreOrderPaymentTerm — Строка графика оплат продажи или закупки — когда и сколько платят (ERP-1427, этап 4).
type CoreOrderPaymentTerm struct {
	ID       *UUID   `json:"id,omitempty"`
	Position *int64  `json:"position,omitempty"`
	Title    *string `json:"title,omitempty"`
	Amount   *string `json:"amount,omitempty"`
	DueDate  *string `json:"due_date,omitempty"`
	// DueTrigger — '' — срок датой; after_stage — через delay_days после исполнения этапа stage_id
	DueTrigger *string `json:"due_trigger,omitempty"`
	StageID    *UUID   `json:"stage_id,omitempty"`
	DelayDays  *int64  `json:"delay_days,omitempty"`
}

// CoreOrderProgress — Ход продажи или закупки для строки списка (with=progress). executed — исполнено в валюте продажи или закупки; paid — оплачено, нет поля — финансы выключены; papers — счёт, акт и УПД: done — есть, wait — ждём подписи, нет ключа — нет; нет поля — документооборот выключен.
type CoreOrderProgress struct {
	Executed string            `json:"executed"`
	Paid     *string           `json:"paid,omitempty"`
	Papers   map[string]string `json:"papers,omitempty"`
}

type CoreOrderResponsible struct {
	EmployeeID   UUID    `json:"employee_id"`
	EmployeeName *string `json:"employee_name,omitempty"`
	// Share — Доля в процентах: больше нуля, не больше ста
	Share string `json:"share"`
}

type CoreOrderResponsiblesInput struct {
	Responsibles []CoreOrderResponsible `json:"responsibles"`
}

type CoreOrderRevenueItemRule struct {
	Kind      *string `json:"kind,omitempty"`
	ItemID    *UUID   `json:"item_id,omitempty"`
	ItemName  *string `json:"item_name,omitempty"`
	ValidFrom *string `json:"valid_from,omitempty"`
}

type CoreOrderRevision struct {
	Side CoreOrderSide `json:"side"`
	// Number — Свой номер; пусто — номер выдаёт счётчик вида
	Number     *string `json:"number,omitempty"`
	Date       string  `json:"date"`
	BusinessID *UUID   `json:"business_id,omitempty"`
	CompanyID  *UUID   `json:"company_id,omitempty"`
	// ContactID — Контрагент; у загрузки вместо него можно прислать counterparty
	ContactID    *UUID                  `json:"contact_id,omitempty"`
	Counterparty *CoreOrderCounterparty `json:"counterparty,omitempty"`
	ContractID   *UUID                  `json:"contract_id,omitempty"`
	ProjectID    *UUID                  `json:"project_id,omitempty"`
	// DepartmentID — Подразделение продажи или закупки — элемент справочника «Подразделения»; наследуют исполнения и себестоимость (КЦ § 4.4)
	DepartmentID map[string]json.RawMessage `json:"department_id,omitempty"`
	// CfoID — ЦФО продажи или закупки — элемент справочника «ЦФО»; наследуют исполнения и себестоимость (КЦ § 4.4)
	CfoID       map[string]json.RawMessage `json:"cfo_id,omitempty"`
	WarehouseID *UUID                      `json:"warehouse_id,omitempty"`
	// BasisID — Основание — например, заявка на закупку
	BasisID  *UUID   `json:"basis_id,omitempty"`
	Title    *string `json:"title,omitempty"`
	Currency string  `json:"currency"`
	// PricesIncludeVAT — Цены с НДС («в том числе»); по умолчанию true
	PricesIncludeVAT *bool `json:"prices_include_vat,omitempty"`
	// Discount — Скидка на продажу или закупку целиком; раскладывается по строкам пропорционально их суммам до НДС
	Discount     *string                `json:"discount,omitempty"`
	DeliveryDate *string                `json:"delivery_date,omitempty"`
	DueDate      *string                `json:"due_date,omitempty"`
	Scenario     *string                `json:"scenario,omitempty"`
	ManagerNote  *string                `json:"manager_note,omitempty"`
	Comment      *string                `json:"comment,omitempty"`
	Buyer        *CoreOrderBuyer        `json:"buyer,omitempty"`
	Lines        []CoreOrderLineInput   `json:"lines"`
	Responsibles []CoreOrderResponsible `json:"responsibles,omitempty"`
	// Stages — Этапы работ целиком, правка по id; не названы — не меняются
	Stages []CoreOrderStage `json:"stages,omitempty"`
	// PaymentTerms — График оплат целиком, правка по id; не назван — не меняется
	PaymentTerms    []CoreOrderPaymentTerm `json:"payment_terms,omitempty"`
	CabinetStatusID *UUID                  `json:"cabinet_status_id,omitempty"`
	// ExpectedVersion — Версия, которую видел правящий; 0 — без сверки
	ExpectedVersion *int64 `json:"expected_version,omitempty"`
}

type CoreOrderSide = string

type CoreOrderSourceKind = string

// CoreOrderStage — Этап работ продажи или закупки — что и когда сдаём (ERP-1427, этап 4).
type CoreOrderStage struct {
	ID          *UUID   `json:"id,omitempty"`
	Position    *int64  `json:"position,omitempty"`
	Title       *string `json:"title,omitempty"`
	PlannedDate *string `json:"planned_date,omitempty"`
	// Amount — Сумма этапа в валюте продажи или закупки с налогом
	Amount *string `json:"amount,omitempty"`
	// LineIds — Строки продажи или закупки, которые закрывает этап; пусто — строки-услуги по порядку
	LineIds []UUID `json:"line_ids,omitempty"`
}

type CoreOrderState = string

type CoreOrderStatus struct {
	ID UUID `json:"id"`
	// Key — Есть только у системной строки
	Key *string `json:"key,omitempty"`
	// Side — Пусто — статус годится обеим сторонам
	Side     *string        `json:"side,omitempty"`
	Name     string         `json:"name"`
	Category CoreOrderState `json:"category"`
	Position int64          `json:"position"`
	Color    *string        `json:"color,omitempty"`
	IsActive bool           `json:"is_active"`
	IsSystem bool           `json:"is_system"`
	FunnelID *UUID          `json:"funnel_id,omitempty"`
}

type CoreOrderStatusList struct {
	Items []CoreOrderStatus `json:"items"`
}

type CoreOrderStepDueInput struct {
	DueDate string `json:"due_date"`
	// ShiftNext — Сдвинуть следующие невыполненные шаги с датой на ту же разницу
	ShiftNext *bool `json:"shift_next,omitempty"`
}

type CoreOrderStepState struct {
	Key      string  `json:"key"`
	Kind     string  `json:"kind"`
	Title    string  `json:"title"`
	Position int64   `json:"position"`
	DueDate  *string `json:"due_date,omitempty"`
	DoneAt   *string `json:"done_at,omitempty"`
	Status   string  `json:"status"`
	// DoneWhen — Что закрывает шаг; manual — отмечает человек
	DoneWhen *string `json:"done_when,omitempty"`
}

type CoreOrderTemplate struct {
	ID             UUID                      `json:"id"`
	Side           string                    `json:"side"`
	State          string                    `json:"state"`
	Order          CoreOrderInput            `json:"order"`
	Schedule       CoreOrderTemplateSchedule `json:"schedule"`
	Actions        CoreOrderTemplateActions  `json:"actions"`
	ResumedFrom    *string                   `json:"resumed_from,omitempty"`
	Version        int64                     `json:"version"`
	CreatedBy      *int64                    `json:"created_by,omitempty"`
	UpdatedBy      *int64                    `json:"updated_by,omitempty"`
	CreatedAt      *string                   `json:"created_at,omitempty"`
	UpdatedAt      *string                   `json:"updated_at,omitempty"`
	ContactName    *string                   `json:"contact_name,omitempty"`
	ContractNumber *string                   `json:"contract_number,omitempty"`
	ContractDate   *string                   `json:"contract_date,omitempty"`
	DepartmentName *string                   `json:"department_name,omitempty"`
	// Amount — Сумма строк шаблона — подсказка списка.
	Amount    string                 `json:"amount"`
	Upcoming  []CoreOrderTemplateRun `json:"upcoming,omitempty"`
	LastRun   *string                `json:"last_run,omitempty"`
	LastError *string                `json:"last_error,omitempty"`
	// LastErrorText — Причина отказа последнего срабатывания словами.
	LastErrorText *string `json:"last_error_text,omitempty"`
}

type CoreOrderTemplateActions struct {
	// Confirm — Провести продажу или закупку сразу; false — черновик.
	Confirm     *bool   `json:"confirm,omitempty"`
	Invoice     *string `json:"invoice,omitempty"`
	InvoiceDays *int64  `json:"invoice_days,omitempty"`
	Closing     *string `json:"closing,omitempty"`
	ClosingWhen *string `json:"closing_when,omitempty"`
	ClosingDays *int64  `json:"closing_days,omitempty"`
}

type CoreOrderTemplateInput struct {
	Order    CoreOrderInput            `json:"order"`
	Schedule CoreOrderTemplateSchedule `json:"schedule"`
	Actions  *CoreOrderTemplateActions `json:"actions,omitempty"`
	// ExpectedVersion — Только при правке.
	ExpectedVersion *int64 `json:"expected_version,omitempty"`
}

type CoreOrderTemplateList struct {
	Results []CoreOrderTemplate `json:"results"`
	Total   int64               `json:"total"`
}

type CoreOrderTemplateRun struct {
	Key         string  `json:"key"`
	Date        string  `json:"date"`
	InvoiceDate *string `json:"invoice_date,omitempty"`
	ClosingDate *string `json:"closing_date,omitempty"`
}

type CoreOrderTemplateSchedule struct {
	Period string `json:"period"`
	// Day — Число месяца или день недели ISO (1 — понедельник).
	Day   int64   `json:"day"`
	From  string  `json:"from"`
	Until *string `json:"until,omitempty"`
}

type CoreOrderTemplateStateInput struct {
	State           string `json:"state"`
	ExpectedVersion int64  `json:"expected_version"`
}

// CoreOrderTotals — Итоги — сумма строк: скидка продажи или закупки уже разложена по строкам и второй раз не вычитается.
type CoreOrderTotals struct {
	// Net — Сумма строкой в разрядности валюты продажи или закупки
	Net string `json:"net"`
	// VAT — Сумма строкой в разрядности валюты продажи или закупки
	VAT string `json:"vat"`
	// Gross — Сумма строкой в разрядности валюты продажи или закупки
	Gross string `json:"gross"`
	// GoodsGross — Сумма строкой в разрядности валюты продажи или закупки
	GoodsGross string `json:"goods_gross"`
	// ServicesGross — Сумма строкой в разрядности валюты продажи или закупки
	ServicesGross string `json:"services_gross"`
	Currency      string `json:"currency"`
}

type CoreOrderVATWarning struct {
	LineID UUID   `json:"line_id"`
	Title  string `json:"title"`
	// Rate — Ставка строки, названная человеком
	Rate string `json:"rate"`
	// General — Общая ставка юрлица на дату
	General string `json:"general"`
	Date    string `json:"date"`
}

type CoreOwnershipVersion struct {
	ID         UUID                `json:"id"`
	BusinessID UUID                `json:"business_id"`
	ValidFrom  string              `json:"valid_from"`
	ValidTo    *string             `json:"valid_to,omitempty"`
	Owners     []CoreBusinessOwner `json:"owners"`
}

type CoreOwnershipVersionInput struct {
	ValidFrom string                   `json:"valid_from"`
	Owners    []CoreBusinessOwnerInput `json:"owners"`
}

type CorePhotoResult struct {
	PhotoURL string `json:"photo_url"`
}

type CorePolicyAccountableDaysVersion struct {
	ID UUID `json:"id"`
	// ValidFrom — Начало версии; 0001-01-01 означает «с начала учёта»
	ValidFrom string `json:"valid_from"`
	// ValidTo — Последний день версии; отсутствует у открытой версии
	ValidTo *string `json:"valid_to,omitempty"`
	Days    int64   `json:"days"`
}

type CorePolicyPayrollOfficialInput struct {
	// ValidFrom — 0001-01-01 — с начала учёта
	ValidFrom string `json:"valid_from"`
	// AllOfficial — Вся начисленная зарплата отражается в бухгалтерии
	AllOfficial bool `json:"all_official"`
	// PayrollSource — Источник официальной части; обязателен при all_official = false
	PayrollSource *string `json:"payroll_source,omitempty"`
}

type CorePolicyPayrollOfficialVersion struct {
	ID UUID `json:"id"`
	// ValidFrom — Начало версии; 0001-01-01 означает «с начала учёта»
	ValidFrom string `json:"valid_from"`
	// ValidTo — Последний день версии; отсутствует у открытой версии
	ValidTo *string `json:"valid_to,omitempty"`
	// AllOfficial — Вся начисленная зарплата отражается в бухгалтерии
	AllOfficial bool `json:"all_official"`
	// Source — Источник официальной части; нет при all_official
	Source *string `json:"source,omitempty"`
}

type CorePolicyPeriod struct {
	ID UUID `json:"id"`
	// ValidFrom — Начало версии; 0001-01-01 означает «с начала учёта»
	ValidFrom string `json:"valid_from"`
	// ValidTo — Последний день версии; отсутствует у открытой версии
	ValidTo *string `json:"valid_to,omitempty"`
}

type CorePolicyTaxModeVersion struct {
	ID UUID `json:"id"`
	// ValidFrom — Начало версии; 0001-01-01 означает «с начала учёта»
	ValidFrom string `json:"valid_from"`
	// ValidTo — Последний день версии; отсутствует у открытой версии
	ValidTo *string `json:"valid_to,omitempty"`
	Mode    string  `json:"mode"`
	// TaxCurrency — Налоговая валюта юрлица: в ней ведутся суммы налога регистров НДС и документа «НДС за квартал». По умолчанию RUB.
	TaxCurrency string `json:"tax_currency"`
}

type CorePolicyTaxRegimeInput struct {
	// ValidFrom — 0001-01-01 — с начала учёта
	ValidFrom string `json:"valid_from"`
	Regime    string `json:"regime"`
	// RegimeRate — Ставка режима, от 0 до 100; обязательна, кроме ПСН и НПД
	RegimeRate *string `json:"regime_rate,omitempty"`
	// Patent — ИП совмещает основной режим с патентом; только ОСНО, УСН или ЕСХН
	Patent *bool `json:"patent,omitempty"`
}

type CorePolicyTaxRegimeVersion struct {
	ID UUID `json:"id"`
	// ValidFrom — Начало версии; 0001-01-01 означает «с начала учёта»
	ValidFrom string `json:"valid_from"`
	// ValidTo — Последний день версии; отсутствует у открытой версии
	ValidTo *string `json:"valid_to,omitempty"`
	Regime  string  `json:"regime"`
	// Rate — Ставка основного режима в процентах с двумя знаками; нет — не задана (у ПСН и НПД необязательна)
	Rate *string `json:"rate,omitempty"`
	// Patent — Вместе с основным режимом ИП применяет патент
	Patent bool `json:"patent"`
}

type CorePolicyVATPendingVersion struct {
	ID UUID `json:"id"`
	// ValidFrom — Начало версии; 0001-01-01 означает «с начала учёта»
	ValidFrom string `json:"valid_from"`
	// ValidTo — Последний день версии; отсутствует у открытой версии
	ValidTo *string `json:"valid_to,omitempty"`
	Months  int64   `json:"months"`
}

type CorePolicyVATPresentationVersion struct {
	ID UUID `json:"id"`
	// ValidFrom — Начало версии; 0001-01-01 означает «с начала учёта»
	ValidFrom string `json:"valid_from"`
	// ValidTo — Последний день версии; отсутствует у открытой версии
	ValidTo      *string `json:"valid_to,omitempty"`
	Presentation string  `json:"presentation"`
}

type CorePolicyVATRatesVersion struct {
	ID UUID `json:"id"`
	// ValidFrom — Начало версии; 0001-01-01 означает «с начала учёта»
	ValidFrom string `json:"valid_from"`
	// ValidTo — Последний день версии; отсутствует у открытой версии
	ValidTo *string `json:"valid_to,omitempty"`
	// General — Процент общей ставки с двумя знаками; пусто — вид не заведён
	General string `json:"general"`
	// Reduced — Процент льготной ставки с двумя знаками; пусто — вид не заведён
	Reduced string `json:"reduced"`
}

type CoreProduct struct {
	ID     UUID   `json:"id"`
	SKU    string `json:"sku"`
	Name   string `json:"name"`
	Unit   string `json:"unit"`
	UnitID *UUID  `json:"unit_id"`
	// Price — Decimal monetary value
	Price             string                     `json:"price"`
	ExternalID        string                     `json:"external_id"`
	Kind              CoreProductKind            `json:"kind"`
	IsSellable        bool                       `json:"is_sellable"`
	IsStockable       bool                       `json:"is_stockable"`
	IsPurchasable     bool                       `json:"is_purchasable"`
	IsProducible      bool                       `json:"is_producible"`
	FolderID          *UUID                      `json:"folder_id"`
	CategoryID        *UUID                      `json:"category_id"`
	CategoryLabel     string                     `json:"category_label"`
	RecordKind        CoreProductRecordKind      `json:"record_kind"`
	ParentProductID   *UUID                      `json:"parent_product_id"`
	ParentProductName string                     `json:"parent_product_name"`
	Custom            map[string]json.RawMessage `json:"custom"`
	IsActive          bool                       `json:"is_active"`
	ArchivedAt        *string                    `json:"archived_at"`
	CreatedAt         string                     `json:"created_at"`
	UpdatedAt         string                     `json:"updated_at"`
	// PurchasePrice — Закупочная цена десятичной строкой; подставляется в строку приёмки
	PurchasePrice string `json:"purchase_price"`
	// VATRate — Устарело (ERP-484): снимается, ставка определяется видом товара (vat_kind) и налоговой политикой юрлица на дату документа. Всегда пустая строка
	VATRate string `json:"vat_rate"`
	// VATKind — Вид ставки НДС товара: общая, льготная, нулевая, без НДС; пусто — общая. Процент берётся у юрлица на дату документа (учётная политика)
	VATKind *string `json:"vat_kind,omitempty"`
	// WeightKg — Вес одной базовой единицы, кг; пусто — не задан
	WeightKg string `json:"weight_kg"`
	// VolumeM3 — Объём одной базовой единицы, м³; пусто — не задан
	VolumeM3 string `json:"volume_m3"`
	// LengthMm — Длина, мм; пусто — не задана
	LengthMm string `json:"length_mm"`
	// WidthMm — Ширина, мм; пусто — не задана
	WidthMm string `json:"width_mm"`
	// HeightMm — Высота, мм; пусто — не задана
	HeightMm string `json:"height_mm"`
	// CountryItemID — Страна происхождения — запись справочника countries (код ОКСМ в code)
	CountryItemID *UUID `json:"country_item_id"`
	// CustomsCode — Код ТН ВЭД, до десяти цифр
	CustomsCode string `json:"customs_code"`
	// CountryLabel — Название страны происхождения; пусто без страны
	CountryLabel string `json:"country_label"`
	// OptionSchema — Оси характеристик семейства; у остальных записей пусто
	OptionSchema []CoreProductAxis `json:"option_schema"`
	// VariantValues — Значения варианта по осям семейства: ось → код; у остальных записей пусто
	VariantValues map[string]string `json:"variant_values"`
}

type CoreProductAxis struct {
	// Key — Ключ оси: латиница, цифры, _ и -
	Key    string                 `json:"key"`
	Label  string                 `json:"label"`
	Values []CoreProductAxisValue `json:"values"`
}

type CoreProductAxisValue struct {
	// Code — Машинный код значения: латиница, цифры, _ и -
	Code string `json:"code"`
	// Label — Подпись значения; пусто — код
	Label string `json:"label"`
}

type CoreProductCreate struct {
	SKU        *string          `json:"sku,omitempty"`
	Name       string           `json:"name"`
	Unit       *string          `json:"unit,omitempty"`
	UnitID     *UUID            `json:"unit_id,omitempty"`
	Price      *string          `json:"price,omitempty"`
	ExternalID *string          `json:"external_id,omitempty"`
	Kind       *CoreProductKind `json:"kind,omitempty"`
	IsSellable *bool            `json:"is_sellable,omitempty"`
	// IsStockable — Хранится на складе. У услуги (kind=service) всегда false: сочетание service + true отклоняется 400. Позицию со складскими движениями нельзя перевести в услугу или снять с неё признак — 409 (ERP-1547)
	IsStockable     *bool                      `json:"is_stockable,omitempty"`
	IsPurchasable   *bool                      `json:"is_purchasable,omitempty"`
	IsProducible    *bool                      `json:"is_producible,omitempty"`
	CategoryID      *UUID                      `json:"category_id,omitempty"`
	RecordKind      *CoreProductRecordKind     `json:"record_kind,omitempty"`
	ParentProductID *UUID                      `json:"parent_product_id,omitempty"`
	Custom          map[string]json.RawMessage `json:"custom,omitempty"`
	// Identifiers — Штрихкод и артикулы с формы создания; ложатся в той же транзакции, что и карточка. Занятый код отклоняет создание целиком (409).
	Identifiers []CoreProductIdentifierInput `json:"identifiers,omitempty"`
	// PurchasePrice — Закупочная цена десятичной строкой; подставляется в строку приёмки
	PurchasePrice *string `json:"purchase_price,omitempty"`
	// VATKind — Вид ставки НДС товара: общая, льготная, нулевая, без НДС; пусто — общая. Процент берётся у юрлица на дату документа (учётная политика)
	VATKind *string `json:"vat_kind,omitempty"`
	// WeightKg — Вес одной базовой единицы, кг; пусто — не задан
	WeightKg *string `json:"weight_kg,omitempty"`
	// VolumeM3 — Объём одной базовой единицы, м³; пусто — не задан
	VolumeM3 *string `json:"volume_m3,omitempty"`
	// LengthMm — Длина, мм; пусто — не задана
	LengthMm *string `json:"length_mm,omitempty"`
	// WidthMm — Ширина, мм; пусто — не задана
	WidthMm *string `json:"width_mm,omitempty"`
	// HeightMm — Высота, мм; пусто — не задана
	HeightMm *string `json:"height_mm,omitempty"`
	// CountryItemID — Страна происхождения — запись справочника countries (код ОКСМ в code)
	CountryItemID *UUID `json:"country_item_id,omitempty"`
	// CustomsCode — Код ТН ВЭД, до десяти цифр
	CustomsCode *string `json:"customs_code,omitempty"`
	// OptionSchema — Оси характеристик семейства; у остальных записей пусто
	OptionSchema []CoreProductAxis `json:"option_schema,omitempty"`
	// VariantValues — Значения варианта по осям семейства: ось → код; у остальных записей пусто
	VariantValues map[string]string `json:"variant_values,omitempty"`
}

type CoreProductCustomInput struct {
	Custom map[string]json.RawMessage `json:"custom"`
}

type CoreProductExport struct {
	ID        UUID                      `json:"id"`
	Kind      CoreProductTransferKind   `json:"kind"`
	Format    CoreProductTransferFormat `json:"format"`
	Status    string                    `json:"status"`
	FileName  string                    `json:"file_name"`
	Size      int64                     `json:"size"`
	RowCount  int64                     `json:"row_count"`
	CreatedBy *int64                    `json:"created_by,omitempty"`
	CreatedAt string                    `json:"created_at"`
}

type CoreProductExportRequest struct {
	Kind   CoreProductTransferKind    `json:"kind"`
	Format *CoreProductTransferFormat `json:"format,omitempty"`
}

type CoreProductFieldDefinition struct {
	ID         UUID   `json:"id"`
	EntityType string `json:"entity_type"`
	Key        string `json:"key"`
	Label      string `json:"label"`
	Type       string `json:"type"`
	Required   bool   `json:"required"`
	Dictionary *UUID  `json:"dictionary"`
	Order      int64  `json:"order"`
	Help       string `json:"help"`
	// Group — Панель карточки, в которой показывается поле; пусто — общая панель дополнительных реквизитов
	Group string `json:"group"`
	// Pinned — Закреплённая характеристика: под названием в шапке карточки и столбцом каталога
	Pinned bool `json:"pinned"`
	// Filterable — Поле участвует в отборе каталога
	Filterable bool `json:"filterable"`
	// CategoryIds — Категории (элементы справочника product_categories), у товаров которых и их потомков поле показывается; пусто — у всех
	CategoryIds []UUID `json:"category_ids"`
	// UnitSuffix — Суффикс единицы после значения: кг, мм, мл
	UnitSuffix string `json:"unit_suffix"`
}

type CoreProductFieldSchema struct {
	Fields []CoreProductFieldDefinition `json:"fields"`
}

type CoreProductFile struct {
	ID         UUID  `json:"id"`
	ProductID  UUID  `json:"product_id"`
	KindItemID *UUID `json:"kind_item_id"`
	// KindCode — Код элемента справочника product_file_kinds; пусто без типа
	KindCode  string `json:"kind_code"`
	KindLabel string `json:"kind_label"`
	Name      string `json:"name"`
	MimeType  string `json:"mime_type"`
	SizeBytes int64  `json:"size_bytes"`
	IsImage   bool   `json:"is_image"`
	// IsPrimary — Основное фото товара; бывает только у изображения
	IsPrimary      bool   `json:"is_primary"`
	SortOrder      int64  `json:"sort_order"`
	UploadedByName string `json:"uploaded_by_name"`
	CreatedAt      string `json:"created_at"`
	// ScanStatus — Вердикт антивируса; skipped — файл не проверялся (загружен формой). Ссылку на скачивание получают clean и skipped
	ScanStatus string `json:"scan_status"`
}

type CoreProductFilePage struct {
	Count   int64             `json:"count"`
	Results []CoreProductFile `json:"results"`
}

type CoreProductFilePatch struct {
	// Kind — Код типа из product_file_kinds; пустая строка снимает тип
	Kind *string `json:"kind,omitempty"`
	Name *string `json:"name,omitempty"`
	// IsPrimary — true делает изображение основным фото
	IsPrimary *bool `json:"is_primary,omitempty"`
}

// CoreProductFileUploadRequest — Заявка на сессию загрузки файла или фото товара.
type CoreProductFileUploadRequest struct {
	// Name — Имя файла с расширением
	Name string `json:"name"`
	// MimeType — Тип содержимого; изображения — image/*
	MimeType *string `json:"mime_type,omitempty"`
	// SizeBytes — Точный размер файла в байтах
	SizeBytes int64 `json:"size_bytes"`
	// Sha256 — Необязательная контрольная сумма SHA-256 строчными шестнадцатеричными знаками
	Sha256 *string `json:"sha256,omitempty"`
	// Kind — Код типа файла из справочника product_file_kinds; изображению без кода достаётся photo
	Kind *string `json:"kind,omitempty"`
}

type CoreProductIdentifier struct {
	ID              UUID                       `json:"id"`
	ProductID       UUID                       `json:"product_id"`
	Kind            CoreProductIdentifierKind  `json:"kind"`
	SourceRef       string                     `json:"source_ref"`
	Value           string                     `json:"value"`
	NormalizedValue string                     `json:"normalized_value"`
	IsPrimary       bool                       `json:"is_primary"`
	IsActive        bool                       `json:"is_active"`
	Attrs           map[string]json.RawMessage `json:"attrs"`
	CreatedAt       string                     `json:"created_at"`
	UpdatedAt       string                     `json:"updated_at"`
}

type CoreProductIdentifierInput struct {
	Kind CoreProductIdentifierKind `json:"kind"`
	// SourceRef — Пространство имён: у артикулов обязателен (производитель, поставщик, код канала из справочника sales_channels); у штрихкода — код активного канала продаж этого кабинета либо global (по умолчанию), иное значение — 400. Значение штрихкода уникально по кабинету независимо от канала
	SourceRef *string `json:"source_ref,omitempty"`
	Value     string  `json:"value"`
	IsPrimary *bool   `json:"is_primary,omitempty"`
	// Attrs — У штрихкода: type ∈ ean13|ean8|upc_a|gtin14|code128 и product_uom_id упаковки. Названный type проверяется строго, включая контрольную цифру EAN/UPC/GTIN (400 с текстом ошибки). Без type символика угадывается по форме значения, и несошедшаяся контрольная цифра не отказ, а code128: догадка не вправе отвергать существующий код
	Attrs map[string]json.RawMessage `json:"attrs,omitempty"`
}

type CoreProductIdentifierKind = string

type CoreProductIdentifierPage struct {
	Count   int64                   `json:"count"`
	Results []CoreProductIdentifier `json:"results"`
}

type CoreProductIdentifierPatch struct {
	Kind *CoreProductIdentifierKind `json:"kind,omitempty"`
	// SourceRef — Пространство имён: у артикулов обязателен; у штрихкода — код активного канала продаж этого кабинета либо global, иное значение — 400
	SourceRef *string `json:"source_ref,omitempty"`
	Value     *string `json:"value,omitempty"`
	IsPrimary *bool   `json:"is_primary,omitempty"`
	// Attrs — У штрихкода: type ∈ ean13|ean8|upc_a|gtin14|code128 и product_uom_id упаковки. Названный type проверяется строго, включая контрольную цифру EAN/UPC/GTIN (400 с текстом ошибки). Без type символика угадывается по форме значения, и несошедшаяся контрольная цифра не отказ, а code128. Поле заменяет объект целиком, а не сливается с прежним
	Attrs map[string]json.RawMessage `json:"attrs,omitempty"`
}

type CoreProductImportApplyRequest struct {
	PreviewToken    string `json:"preview_token"`
	ConfirmWarnings *bool  `json:"confirm_warnings,omitempty"`
}

type CoreProductImportDiff struct {
	Row      int64             `json:"row"`
	Action   string            `json:"action"`
	TargetID *string           `json:"target_id,omitempty"`
	SKU      *string           `json:"sku,omitempty"`
	Name     *string           `json:"name,omitempty"`
	Changes  map[string]string `json:"changes,omitempty"`
}

type CoreProductImportField struct {
	Key      string `json:"key"`
	Label    string `json:"label"`
	Required bool   `json:"required"`
	Type     string `json:"type"`
}

type CoreProductImportFinishRequest struct {
	FileID UUID `json:"file_id"`
}

type CoreProductImportInspectRequest struct {
	SheetName string `json:"sheet_name"`
	HeaderRow int64  `json:"header_row"`
}

type CoreProductImportIssue struct {
	Sheet    string  `json:"sheet"`
	Row      int64   `json:"row"`
	Column   string  `json:"column"`
	Code     string  `json:"code"`
	Severity string  `json:"severity"`
	Value    *string `json:"value,omitempty"`
	Message  string  `json:"message"`
	Hint     *string `json:"hint,omitempty"`
}

type CoreProductImportIssuePage struct {
	Count   int64                    `json:"count"`
	Results []CoreProductImportIssue `json:"results"`
}

type CoreProductImportMapping = json.RawMessage

type CoreProductImportMappingState struct {
	SheetName        string            `json:"sheet_name"`
	HeaderRow        int64             `json:"header_row"`
	Columns          map[string]string `json:"columns"`
	ExpectedRevision *int64            `json:"expected_revision,omitempty"`
}

type CoreProductImportMode = string

type CoreProductImportRun struct {
	ID                UUID                          `json:"id"`
	Kind              CoreProductTransferKind       `json:"kind"`
	Format            CoreProductTransferFormat     `json:"format"`
	Status            CoreProductImportStatus       `json:"status"`
	Mode              CoreProductImportMode         `json:"mode"`
	SourceName        string                        `json:"source_name"`
	SourceSha256      string                        `json:"source_sha256"`
	SourceSize        int64                         `json:"source_size"`
	Mapping           CoreProductImportMappingState `json:"mapping"`
	SchemaVersion     string                        `json:"schema_version"`
	Revision          int64                         `json:"revision"`
	SchemaRevision    *string                       `json:"schema_revision,omitempty"`
	ReferenceRevision *string                       `json:"reference_revision,omitempty"`
	PreviewToken      *string                       `json:"preview_token,omitempty"`
	Diff              []CoreProductImportDiff       `json:"diff,omitempty"`
	Issues            []CoreProductImportIssue      `json:"issues,omitempty"`
	CreatedCount      int64                         `json:"created_count"`
	UpdatedCount      int64                         `json:"updated_count"`
	UnchangedCount    int64                         `json:"unchanged_count"`
	WarningCount      int64                         `json:"warning_count"`
	ErrorCount        int64                         `json:"error_count"`
	CreatedBy         *int64                        `json:"created_by,omitempty"`
	CreatedAt         string                        `json:"created_at"`
	PreviewedAt       *string                       `json:"previewed_at,omitempty"`
	AppliedAt         *string                       `json:"applied_at,omitempty"`
	SourceColumns     []string                      `json:"source_columns,omitempty"`
	SourceSheets      []CoreProductImportSheet      `json:"source_sheets,omitempty"`
	TargetFields      []CoreProductImportField      `json:"target_fields,omitempty"`
}

type CoreProductImportSheet struct {
	Name string `json:"name"`
}

type CoreProductImportStatus = string

// CoreProductImportUploadSessionRequest — Заявка на сессию загрузки файла импорта. filename и size — прежние имена name и size_bytes.
type CoreProductImportUploadSessionRequest struct {
	Kind CoreProductTransferKind `json:"kind"`
	Mode CoreProductImportMode   `json:"mode"`
	// Name — Имя файла с расширением xlsx, xls, ods, csv или tsv
	Name *string `json:"name,omitempty"`
	// MimeType — Тип содержимого; по умолчанию — по расширению файла
	MimeType *string `json:"mime_type,omitempty"`
	// SizeBytes — Точный размер файла в байтах
	SizeBytes *int64 `json:"size_bytes,omitempty"`
	// Sha256 — Необязательная контрольная сумма SHA-256 строчными шестнадцатеричными знаками
	Sha256 *string `json:"sha256,omitempty"`
	// Filename — Прежнее имя поля name
	Filename *string `json:"filename,omitempty"`
	// Size — Прежнее имя поля size_bytes
	Size *int64 `json:"size,omitempty"`
}

type CoreProductKind = string

type CoreProductPage struct {
	Count   int64         `json:"count"`
	Results []CoreProduct `json:"results"`
}

type CoreProductPatch struct {
	SKU        *string          `json:"sku,omitempty"`
	Name       *string          `json:"name,omitempty"`
	Unit       *string          `json:"unit,omitempty"`
	UnitID     *UUID            `json:"unit_id,omitempty"`
	Price      *string          `json:"price,omitempty"`
	ExternalID *string          `json:"external_id,omitempty"`
	Kind       *CoreProductKind `json:"kind,omitempty"`
	IsSellable *bool            `json:"is_sellable,omitempty"`
	// IsStockable — Хранится на складе. У услуги (kind=service) всегда false: сочетание service + true отклоняется 400. Позицию со складскими движениями нельзя перевести в услугу или снять с неё признак — 409 (ERP-1547)
	IsStockable   *bool `json:"is_stockable,omitempty"`
	IsPurchasable *bool `json:"is_purchasable,omitempty"`
	IsProducible  *bool `json:"is_producible,omitempty"`
	CategoryID    *UUID `json:"category_id,omitempty"`
	FolderID      *UUID `json:"folder_id,omitempty"`
	// PurchasePrice — Закупочная цена десятичной строкой; подставляется в строку приёмки
	PurchasePrice *string `json:"purchase_price,omitempty"`
	// VATKind — Вид ставки НДС товара: общая, льготная, нулевая, без НДС; пусто — общая. Процент берётся у юрлица на дату документа (учётная политика)
	VATKind *string `json:"vat_kind,omitempty"`
	// WeightKg — Вес одной базовой единицы, кг; пусто — не задан
	WeightKg *string `json:"weight_kg,omitempty"`
	// VolumeM3 — Объём одной базовой единицы, м³; пусто — не задан
	VolumeM3 *string `json:"volume_m3,omitempty"`
	// LengthMm — Длина, мм; пусто — не задана
	LengthMm *string `json:"length_mm,omitempty"`
	// WidthMm — Ширина, мм; пусто — не задана
	WidthMm *string `json:"width_mm,omitempty"`
	// HeightMm — Высота, мм; пусто — не задана
	HeightMm *string `json:"height_mm,omitempty"`
	// CountryItemID — Страна происхождения — запись справочника countries (код ОКСМ в code)
	CountryItemID *UUID `json:"country_item_id,omitempty"`
	// CustomsCode — Код ТН ВЭД, до десяти цифр
	CustomsCode *string `json:"customs_code,omitempty"`
	// OptionSchema — Оси характеристик семейства; у остальных записей пусто
	OptionSchema []CoreProductAxis `json:"option_schema,omitempty"`
	// VariantValues — Значения варианта по осям семейства: ось → код; у остальных записей пусто
	VariantValues map[string]string `json:"variant_values,omitempty"`
}

type CoreProductRecordKind = string

type CoreProductTransferFormat = string

type CoreProductTransferKind = string

type CoreReferenceItem struct {
	ID UUID `json:"id"`
	// Code — Стабильная ссылка на значение: код переживает перенос данных, идентификатор — нет
	Code     string `json:"code"`
	Label    string `json:"label"`
	IsActive bool   `json:"is_active"`
}

type CoreReferenceItemPage struct {
	Count   int64               `json:"count"`
	Results []CoreReferenceItem `json:"results"`
	// API — Адрес собственного API типизированного справочника. Приходит вместе с пустым списком: общий список значений такой справочник не заменяет
	API *string `json:"api,omitempty"`
	// Detail — Пояснение к пустому ответу типизированного справочника
	Detail *string `json:"detail,omitempty"`
}

type CoreReferenceRef struct {
	// DirectoryKey — Ключ справочника из каталога (units) либо его полное имя (core.units, app.acme.crm.regions). Полное имя отличает справочник приложения от штатного с тем же последним сегментом
	DirectoryKey string `json:"directory_key"`
	// Code — Код значения. Указывается код или идентификатор; без обоих ссылка не разрешается
	Code *string `json:"code,omitempty"`
	ID   *UUID   `json:"id,omitempty"`
}

type CoreReferenceResolveRequest struct {
	Refs []CoreReferenceRef `json:"refs"`
}

type CoreReferenceResolveResult struct {
	Count   int64                  `json:"count"`
	Results []CoreReferenceVerdict `json:"results"`
}

type CoreReferenceVerdict struct {
	DirectoryKey string  `json:"directory_key"`
	Code         *string `json:"code,omitempty"`
	ID           *UUID   `json:"id,omitempty"`
	Resolved     bool    `json:"resolved"`
	Label        *string `json:"label,omitempty"`
	IsActive     *bool   `json:"is_active,omitempty"`
	// Reason — Причина отказа словом. «Справочник не найден или недоступен» и «Значение не найдено в этом справочнике» — разные ошибки
	Reason *string `json:"reason,omitempty"`
}

type CoreRegister struct {
	ID          UUID                    `json:"id"`
	Key         string                  `json:"key"`
	Name        string                  `json:"name"`
	Kind        CoreRegisterKind        `json:"kind"`
	Module      string                  `json:"module"`
	IsSystem    bool                    `json:"is_system"`
	Dimensions  []CoreRegisterDimension `json:"dimensions"`
	Resources   []CoreRegisterResource  `json:"resources"`
	HasEntries  bool                    `json:"has_entries"`
	EntryCount  int64                   `json:"entry_count"`
	LastEntryAt string                  `json:"last_entry_at"`
	CreatedAt   string                  `json:"created_at"`
	UpdatedAt   string                  `json:"updated_at"`
}

type CoreRegisterBalancePage struct {
	Count int64 `json:"count"`
	// Limit — Применённый размер страницы — то число, на котором читающая функция реально режет выдачу
	Limit int64 `json:"limit"`
	// Offset — Применённое смещение
	Offset  int64                    `json:"offset"`
	Results []CoreRegisterBalanceRow `json:"results"`
}

type CoreRegisterBalanceRow struct {
	Dims       map[string]json.RawMessage `json:"dims"`
	Totals     map[string]json.RawMessage `json:"totals"`
	EntryCount int64                      `json:"entry_count"`
}

type CoreRegisterCreate struct {
	Key        string                  `json:"key"`
	Name       string                  `json:"name"`
	Kind       *CoreRegisterKind       `json:"kind,omitempty"`
	Module     *string                 `json:"module,omitempty"`
	Dimensions []CoreRegisterDimension `json:"dimensions,omitempty"`
	Resources  []CoreRegisterResource  `json:"resources,omitempty"`
}

type CoreRegisterDimension struct {
	Key      string  `json:"key"`
	Ref      string  `json:"ref"`
	Name     *string `json:"name,omitempty"`
	Required *bool   `json:"required,omitempty"`
}

type CoreRegisterEntry struct {
	ID                UUID                       `json:"id"`
	RegisterID        UUID                       `json:"register_id"`
	RegisterKey       string                     `json:"register_key"`
	RegisterName      string                     `json:"register_name"`
	RegistrarType     UUID                       `json:"registrar_type"`
	RegistrarTypeKey  string                     `json:"registrar_type_key"`
	RegistrarTypeName string                     `json:"registrar_type_name"`
	RegistrarID       UUID                       `json:"registrar_id"`
	RegistrarNumber   string                     `json:"registrar_number"`
	RegistrarDate     string                     `json:"registrar_date"`
	RegistrarStatus   CoreDocumentStatus         `json:"registrar_status"`
	Date              string                     `json:"date"`
	Sign              int64                      `json:"sign"`
	Dims              map[string]json.RawMessage `json:"dims"`
	Values            map[string]json.RawMessage `json:"values"`
	CreatedAt         string                     `json:"created_at"`
}

type CoreRegisterEntryPage struct {
	Count   int64               `json:"count"`
	Results []CoreRegisterEntry `json:"results"`
}

type CoreRegisterKind = string

type CoreRegisterPage struct {
	Count int64 `json:"count"`
	// Limit — Применённый размер страницы — после зажима до потолка
	Limit int64 `json:"limit"`
	// Offset — Применённое смещение
	Offset  int64          `json:"offset"`
	Results []CoreRegister `json:"results"`
}

type CoreRegisterResource struct {
	Key  string  `json:"key"`
	Type string  `json:"type"`
	Unit *string `json:"unit,omitempty"`
	Name *string `json:"name,omitempty"`
	// LabelKey — Optional translation key for a system resource label.
	LabelKey              *string           `json:"label_key,omitempty"`
	Balanced              *bool             `json:"balanced,omitempty"`
	PostsToLedger         *bool             `json:"posts_to_ledger,omitempty"`
	LedgerAccountDim      *string           `json:"ledger_account_dim,omitempty"`
	LedgerCounterDim      *string           `json:"ledger_counter_dim,omitempty"`
	LedgerAccountByValue  map[string]string `json:"ledger_account_by_value,omitempty"`
	LedgerLiabilityValues []string          `json:"ledger_liability_values,omitempty"`
}

type CoreRegisterTurnoverPage struct {
	Count int64 `json:"count"`
	// Limit — Применённый размер страницы — то число, на котором читающая функция реально режет выдачу
	Limit int64 `json:"limit"`
	// Offset — Применённое смещение
	Offset  int64                     `json:"offset"`
	Results []CoreRegisterTurnoverRow `json:"results"`
}

type CoreRegisterTurnoverRow struct {
	Period     *string                    `json:"period,omitempty"`
	Dims       map[string]json.RawMessage `json:"dims"`
	Incoming   map[string]json.RawMessage `json:"incoming"`
	Outgoing   map[string]json.RawMessage `json:"outgoing"`
	Net        map[string]json.RawMessage `json:"net"`
	EntryCount int64                      `json:"entry_count"`
}

type CoreSellerBank struct {
	// Account — Расчётный счёт получателя
	Account string `json:"account"`
	// Bank — Наименование банка
	Bank string `json:"bank"`
	// Bik — БИК банка
	Bik string `json:"bik"`
	// CorrAccount — Корреспондентский счёт банка
	CorrAccount string `json:"corr_account"`
}

type CoreSellerCompany struct {
	ID UUID `json:"id"`
	// Name — Имя юрлица в кабинете
	Name string `json:"name"`
	// LegalName — Полное наименование для счёта
	LegalName string `json:"legal_name"`
	// INN — ИНН продавца
	INN string `json:"inn"`
	// KPP — КПП продавца, если есть
	KPP string `json:"kpp"`
}

type CoreSellerCompanyList struct {
	Companies []CoreSellerCompany `json:"companies"`
}

type CoreTrialBalance struct {
	DateFrom        string                 `json:"date_from"`
	DateTo          string                 `json:"date_to"`
	Currency        string                 `json:"currency"`
	Rows            []CoreTrialBalanceRow  `json:"rows"`
	Totals          CoreTrialBalanceTotals `json:"totals"`
	AccountingBasis *AccountingBasis       `json:"accounting_basis,omitempty"`
	// UnassignedCompany — При отборе по юрлицу — итоги проводок без юрлица за тот же период; только при доступе ко всей книге
	UnassignedCompany *CoreTrialBalanceUnassignedCompany `json:"unassigned_company,omitempty"`
}

// CoreTrialBalanceUnassignedCompany — При отборе по юрлицу — итоги проводок без юрлица за тот же период; только при доступе ко всей книге
type CoreTrialBalanceUnassignedCompany struct {
	OpeningDebit   string `json:"opening_debit"`
	OpeningCredit  string `json:"opening_credit"`
	TurnoverDebit  string `json:"turnover_debit"`
	TurnoverCredit string `json:"turnover_credit"`
	ClosingDebit   string `json:"closing_debit"`
	ClosingCredit  string `json:"closing_credit"`
	Balanced       bool   `json:"balanced"`
}

type CoreTrialBalanceRow struct {
	AccountID      UUID              `json:"account_id"`
	Code           string            `json:"code"`
	Name           string            `json:"name"`
	Type           CoreGLAccountType `json:"type"`
	OpeningDebit   string            `json:"opening_debit"`
	OpeningCredit  string            `json:"opening_credit"`
	TurnoverDebit  string            `json:"turnover_debit"`
	TurnoverCredit string            `json:"turnover_credit"`
	ClosingDebit   string            `json:"closing_debit"`
	ClosingCredit  string            `json:"closing_credit"`
	EntryCount     int64             `json:"entry_count"`
	ContactID      *UUID             `json:"contact_id,omitempty"`
	EmployeeID     *UUID             `json:"employee_id,omitempty"`
}

type CoreTrialBalanceTotals struct {
	OpeningDebit   string `json:"opening_debit"`
	OpeningCredit  string `json:"opening_credit"`
	TurnoverDebit  string `json:"turnover_debit"`
	TurnoverCredit string `json:"turnover_credit"`
	ClosingDebit   string `json:"closing_debit"`
	ClosingCredit  string `json:"closing_credit"`
	Balanced       bool   `json:"balanced"`
}

// CoreUploadFinishResult — Итог завершения сессии core: заведённый файл товара, запуск импорта, фото сотрудника или бланк юрлица.
type CoreUploadFinishResult struct {
	Session       TransferSession       `json:"session"`
	ProductFile   *CoreProductFile      `json:"product_file,omitempty"`
	ProductImport *CoreProductImportRun `json:"product_import,omitempty"`
	EmployeePhoto *CorePhotoResult      `json:"employee_photo,omitempty"`
	Letterhead    *CoreLetterhead       `json:"letterhead,omitempty"`
}

// CredentialRequestGap — Окно, в котором обращения были, а записей о них нет: очередь писателя переполнилась либо база кабинета не приняла пачку. Признание в НАШЕЙ аварии, и печатается оно обеим сторонам — страница без него читалась бы как полная история. Кабинета в окне нет ни у одной из дверей.
type CredentialRequestGap struct {
	StartedAt string `json:"started_at"`
	EndedAt   string `json:"ended_at"`
	// Dropped — Сколько обращений потеряно в этом окне
	Dropped int64 `json:"dropped"`
}

type Customer struct {
	ID          UUID     `json:"id"`
	Name        string   `json:"name"`
	OwnerID     *int64   `json:"owner_id"`
	OwnerName   string   `json:"owner_name"`
	Status      string   `json:"status"`
	Tier        string   `json:"tier"`
	Revenue     *string  `json:"revenue"`
	Size        *int64   `json:"size"`
	Domains     []string `json:"domains"`
	ExternalIds []string `json:"external_ids"`
	NeedsCount  int64    `json:"needs_count"`
	IsArchived  bool     `json:"is_archived"`
	CreatedAt   string   `json:"created_at"`
	UpdatedAt   string   `json:"updated_at"`
}

type CustomerCreate struct {
	Name string `json:"name"`
	// Owner — ID, username или полное имя пользователя
	Owner       *string  `json:"owner,omitempty"`
	Status      *string  `json:"status,omitempty"`
	Tier        *string  `json:"tier,omitempty"`
	Revenue     *string  `json:"revenue,omitempty"`
	Size        *int64   `json:"size,omitempty"`
	Domains     []string `json:"domains,omitempty"`
	ExternalIds []string `json:"external_ids,omitempty"`
}

type CustomerNeed struct {
	ID             UUID   `json:"id"`
	Customer       *UUID  `json:"customer"`
	CustomerName   string `json:"customer_name"`
	Section        *UUID  `json:"section"`
	SectionKey     string `json:"section_key"`
	SectionName    string `json:"section_name"`
	Task           *UUID  `json:"task"`
	TaskIdentifier string `json:"task_identifier"`
	TaskTitle      string `json:"task_title"`
	Body           string `json:"body"`
	Priority       int64  `json:"priority"`
	IsArchived     bool   `json:"is_archived"`
	CreatedAt      string `json:"created_at"`
	UpdatedAt      string `json:"updated_at"`
}

type CustomerNeedCreate struct {
	Customer *string `json:"customer,omitempty"`
	Section  *string `json:"section,omitempty"`
	Task     *string `json:"task,omitempty"`
	Body     string  `json:"body"`
	Priority *int64  `json:"priority,omitempty"`
}

type CustomerNeedPage struct {
	Count   int64          `json:"count"`
	Results []CustomerNeed `json:"results"`
}

type CustomerNeedUpdate struct {
	Customer   *string `json:"customer,omitempty"`
	Section    *string `json:"section,omitempty"`
	Task       *string `json:"task,omitempty"`
	Body       *string `json:"body,omitempty"`
	Priority   *int64  `json:"priority,omitempty"`
	IsArchived *bool   `json:"is_archived,omitempty"`
}

type CustomerPage struct {
	Count   int64      `json:"count"`
	Results []Customer `json:"results"`
}

type CustomerUpdate struct {
	Name        *string  `json:"name,omitempty"`
	Owner       *string  `json:"owner,omitempty"`
	Status      *string  `json:"status,omitempty"`
	Tier        *string  `json:"tier,omitempty"`
	Revenue     *string  `json:"revenue,omitempty"`
	Size        *int64   `json:"size,omitempty"`
	Domains     []string `json:"domains,omitempty"`
	ExternalIds []string `json:"external_ids,omitempty"`
	IsArchived  *bool    `json:"is_archived,omitempty"`
}

type Cycle struct {
	ID          UUID           `json:"id"`
	OwnerType   CycleOwnerType `json:"owner_type"`
	OwnerID     UUID           `json:"owner_id"`
	OwnerKey    string         `json:"owner_key"`
	OwnerName   string         `json:"owner_name"`
	Name        string         `json:"name"`
	Description string         `json:"description"`
	StartsAt    *string        `json:"starts_at"`
	EndsAt      *string        `json:"ends_at"`
	Status      CycleStatus    `json:"status"`
	Order       int64          `json:"order"`
	IsArchived  bool           `json:"is_archived"`
	TaskCount   int64          `json:"task_count"`
	TasksDone   int64          `json:"tasks_done"`
	CreatedAt   string         `json:"created_at"`
	UpdatedAt   string         `json:"updated_at"`
}

// CycleCreate — Владелец задаётся `section`, `project` или парой `owner_type`/`owner_id`.
type CycleCreate struct {
	OwnerType   *CycleOwnerType `json:"owner_type,omitempty"`
	OwnerID     *string         `json:"owner_id,omitempty"`
	Section     *string         `json:"section,omitempty"`
	Project     *string         `json:"project,omitempty"`
	Name        string          `json:"name"`
	Description *string         `json:"description,omitempty"`
	StartsAt    *string         `json:"starts_at,omitempty"`
	EndsAt      *string         `json:"ends_at,omitempty"`
	Status      *CycleStatus    `json:"status,omitempty"`
	Order       *int64          `json:"order,omitempty"`
}

type CycleOwnerType = string

type CyclePage struct {
	Count   int64   `json:"count"`
	Results []Cycle `json:"results"`
}

type CycleStatus = string

type CycleUpdate struct {
	OwnerType   *CycleOwnerType `json:"owner_type,omitempty"`
	OwnerID     *string         `json:"owner_id,omitempty"`
	Section     *string         `json:"section,omitempty"`
	Project     *string         `json:"project,omitempty"`
	Name        *string         `json:"name,omitempty"`
	Description *string         `json:"description,omitempty"`
	StartsAt    *string         `json:"starts_at,omitempty"`
	EndsAt      *string         `json:"ends_at,omitempty"`
	Status      *CycleStatus    `json:"status,omitempty"`
	Order       *int64          `json:"order,omitempty"`
	IsArchived  *bool           `json:"is_archived,omitempty"`
}

type DashboardMetricDefinition struct {
	ID          string `json:"id"`
	Module      string `json:"module"`
	Template    string `json:"template"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Deeplink    string `json:"deeplink"`
}

type DashboardMetricSnapshot struct {
	ID       string                               `json:"id"`
	Template string                               `json:"template"`
	Title    string                               `json:"title"`
	Value    string                               `json:"value"`
	Currency string                               `json:"currency"`
	Caption  string                               `json:"caption"`
	AsOf     string                               `json:"as_of"`
	Deeplink string                               `json:"deeplink"`
	Points   []DashboardMetricSnapshotPointsItem  `json:"points"`
	Rows     []DashboardMetricSnapshotRowsItem    `json:"rows"`
	Tiles    []DashboardMetricSnapshotTilesItem   `json:"tiles"`
	Bars     []DashboardMetricSnapshotBarsItem    `json:"bars"`
	Columns  []DashboardMetricSnapshotColumnsItem `json:"columns"`
	Table    []DashboardMetricSnapshotTableItem   `json:"table"`
}

type DashboardMetricSnapshotPointsItem struct {
	Label string `json:"label"`
	Value string `json:"value"`
}

type DashboardMetricSnapshotRowsItem struct {
	Title  string `json:"title"`
	Value  string `json:"value"`
	Detail string `json:"detail"`
}

type DashboardMetricSnapshotTilesItem struct {
	Label string `json:"label"`
	Value string `json:"value"`
	Note  string `json:"note"`
	Tone  string `json:"tone"`
}

type DashboardMetricSnapshotBarsItem struct {
	Title string  `json:"title"`
	Value string  `json:"value"`
	Note  string  `json:"note"`
	Fill  float64 `json:"fill"`
	Tone  string  `json:"tone"`
}

type DashboardMetricSnapshotColumnsItem struct {
	Title string `json:"title"`
}

type DashboardMetricSnapshotTableItem struct {
	Title string                                      `json:"title"`
	Cells []DashboardMetricSnapshotTableItemCellsItem `json:"cells"`
}

type DashboardMetricSnapshotTableItemCellsItem struct {
	Value string `json:"value"`
	Tone  string `json:"tone"`
}

// DeveloperAPICall — То же обращение глазами издателя. Правило отбора одно: издателю видно только то, что его собственный сервер уже держал в руках — он сам сформировал этот запрос и сам получил этот ответ. Чего нет: кабинета ни одним полем, идентификатора строки журнала, идентификатора выданного токена (нить в журнал установки, который принадлежит кабинету) и обращений кабинетными ключами.
type DeveloperAPICall struct {
	InstallationID UUID   `json:"installation_id"`
	Method         string `json:"method"`
	// Route — Шаблон маршрута, который издатель же и звал
	Route  string `json:"route"`
	Entity string `json:"entity"`
	Shape  string `json:"shape"`
	Rows   *int64 `json:"rows,omitempty"`
	Bytes  int64  `json:"bytes"`
	Status int64  `json:"status"`
	// Outcome — Машинный код исхода, тот же, что уехал в теле отказа: одно событие не называется в двух местах разными словами
	Outcome string `json:"outcome"`
	// DurationMs — Сколько отвечали МЫ. Своё время издатель видит с сетью, наше — без
	DurationMs int64  `json:"duration_ms"`
	OccurredAt string `json:"occurred_at"`
}

type DeveloperAPICallPage struct {
	Calls   []DeveloperAPICall     `json:"calls"`
	Gaps    []CredentialRequestGap `json:"gaps"`
	Limit   int64                  `json:"limit"`
	Offset  int64                  `json:"offset"`
	HasMore bool                   `json:"has_more"`
}

type DeveloperAccepted struct {
	// Status — Единственное значение: исход не различается снаружи ни телом, ни кодом
	Status string `json:"status"`
	// Detail — Условная формулировка «если этот адрес может быть зарегистрирован — мы отправили письмо»: она правдива при любом исходе
	Detail string `json:"detail"`
}

type DeveloperAccount struct {
	ID UUID `json:"id"`
	// Email — Единственный идентификатор человека в этом контуре; кабинета и роли у аккаунта нет вовсе
	Email string `json:"email"`
	// DisplayName — Имя, которым разработчик подписывается; повторная регистрация его не переписывает
	DisplayName      string                 `json:"display_name"`
	Status           DeveloperAccountStatus `json:"status"`
	EmailConfirmedAt *string                `json:"email_confirmed_at,omitempty"`
	LastSignInAt     *string                `json:"last_sign_in_at,omitempty"`
	SuspendedAt      *string                `json:"suspended_at,omitempty"`
	SuspendReason    string                 `json:"suspend_reason"`
	RevokedAt        *string                `json:"revoked_at,omitempty"`
	RevokeReason     string                 `json:"revoke_reason"`
	CreatedAt        string                 `json:"created_at"`
	UpdatedAt        string                 `json:"updated_at"`
}

type DeveloperAccountStatus = string

type DeveloperAppBlockList struct {
	Blocks []DeveloperManifestBlock `json:"blocks"`
}

type DeveloperAppInput struct {
	// Key — Ключ приложения: строчные латинские буквы, цифры и дефисы. Издатель приезжает из владельца пространства имён и в теле не называется
	Key string `json:"key"`
	// Title — Название, которое увидит администратор кабинета на экране согласия
	Title *string `json:"title,omitempty"`
}

type DeveloperAppKey struct {
	ID    UUID `json:"id"`
	AppID UUID `json:"app_id"`
	// Name — Человеческое имя ключа: вежливость, а не учётные данные
	Name string `json:"name"`
	// Hint — Последние знаки значения. Не секрет: по ним ключ не восстанавливается, а без них список не отвечает на вопрос «какой из них отзывать»
	Hint          string  `json:"hint"`
	IssuedAt      string  `json:"issued_at"`
	IssuedBy      *UUID   `json:"issued_by,omitempty"`
	RotatedFromID *UUID   `json:"rotated_from_id,omitempty"`
	RotatedAt     *string `json:"rotated_at,omitempty"`
	// ExpiresAt — Конец перекрытия. Пусто у текущего ключа: он живёт до собственной ротации или отзыва
	ExpiresAt    *string `json:"expires_at,omitempty"`
	RevokedAt    *string `json:"revoked_at,omitempty"`
	RevokeReason string  `json:"revoke_reason"`
	// LastUsedAt — Когда этим ключом ходили в последний раз: единственный ответ на вопрос «можно ли уже отозвать вон тот»
	LastUsedAt *string `json:"last_used_at,omitempty"`
}

type DeveloperAppKeyInput struct {
	// Name — Человеческое имя ключа для списка
	Name *string `json:"name,omitempty"`
}

type DeveloperAppKeyPage struct {
	Keys []DeveloperAppKey `json:"keys"`
}

type DeveloperAppKeyRevocationInput struct {
	// Reason — Почему ключ погашен
	Reason *string `json:"reason,omitempty"`
}

type DeveloperAppKeyRotationInput struct {
	// OverlapHours — Сколько часов доживает вытесненный ключ. Ноль — умолчание в сутки, а не «без перекрытия»
	OverlapHours *int64 `json:"overlap_hours,omitempty"`
}

type DeveloperAppPage struct {
	Apps []PlatformApp `json:"apps"`
}

type DeveloperAppResult struct {
	App PlatformApp `json:"app"`
}

type DeveloperAppVersionInput struct {
	// Version — Номер версии
	Version string `json:"version"`
	// Manifest — Манифест версии целиком
	Manifest map[string]json.RawMessage `json:"manifest"`
	// ManifestDigest — Digest пакета: без него подмену артефакта не с чем сравнить
	ManifestDigest *string `json:"manifest_digest,omitempty"`
	// RequestedScopes — Что версия просит; одобряет кабинет при установке
	RequestedScopes []string `json:"requested_scopes,omitempty"`
	// Review — Отправить версию на ревью вместо черновика. Опубликовать этим полем нельзя: публикация идёт через ворота
	Review *bool `json:"review,omitempty"`
}

type DeveloperAppVersionPage struct {
	App      PlatformApp          `json:"app"`
	Versions []PlatformAppVersion `json:"versions"`
}

type DeveloperAppVersionResult struct {
	Version PlatformAppVersion `json:"version"`
}

type DeveloperApplication struct {
	ID        UUID `json:"id"`
	AccountID UUID `json:"account_id"`
	// RequestedSlug — Запрошенное имя издателя; из него собирается пространство app.<издатель>.<ключ>
	RequestedSlug string `json:"requested_slug"`
	LegalName     string `json:"legal_name"`
	// Country — Код страны из двух букв
	Country string `json:"country"`
	// Homepage — Внешний адрес https
	Homepage      string                     `json:"homepage"`
	ContactEmail  string                     `json:"contact_email"`
	IncidentEmail string                     `json:"incident_email"`
	Status        DeveloperApplicationStatus `json:"status"`
	ReviewedAt    *string                    `json:"reviewed_at,omitempty"`
	// ReviewedBy — Сотрудник платформы, принявший решение
	ReviewedBy *int64 `json:"reviewed_by,omitempty"`
	// DecisionReason — Причина отказа; заявитель видит её у себя
	DecisionReason string `json:"decision_reason"`
	// PublisherSlug — Заведённый издатель; пусто, пока решения нет
	PublisherSlug string `json:"publisher_slug"`
	CreatedAt     string `json:"created_at"`
	UpdatedAt     string `json:"updated_at"`
}

type DeveloperApplicationInput struct {
	// Slug — Запрошенное имя издателя: строчные латинские буквы, цифры и дефисы; служебные имена платформы и имена модулей продукта не выдаются
	Slug      string `json:"slug"`
	LegalName string `json:"legal_name"`
	// Country — Код страны из двух букв
	Country *string `json:"country,omitempty"`
	// Homepage — Внешний адрес https
	Homepage      *string `json:"homepage,omitempty"`
	ContactEmail  string  `json:"contact_email"`
	IncidentEmail *string `json:"incident_email,omitempty"`
}

type DeveloperApplicationResult struct {
	Application DeveloperApplication `json:"application"`
}

type DeveloperApplicationStatus = string

type DeveloperDelivery struct {
	ID             UUID `json:"id"`
	EventID        UUID `json:"event_id"`
	InstallationID UUID `json:"installation_id"`
	// Topic — Тема подписки, объявленная манифестом самого издателя
	Topic         string `json:"topic"`
	SchemaVersion int64  `json:"schema_version"`
	// OccurredAt — Когда произошёл факт, а не когда его отправили
	OccurredAt    string  `json:"occurred_at"`
	Status        string  `json:"status"`
	Attempts      int64   `json:"attempts"`
	NextAttemptAt string  `json:"next_attempt_at"`
	DeliveredAt   *string `json:"delivered_at,omitempty"`
	DeadAt        *string `json:"dead_at,omitempty"`
	// LastStatusCode — Код ответа приёмника. Пусто означает, что ответа не было вовсе
	LastStatusCode *int64 `json:"last_status_code,omitempty"`
	// EndpointURL — Адрес установки. Его называет издатель, а не кабинет, поэтому данных кабинета в нём нет по определению
	EndpointURL string `json:"endpoint_url"`
	// SignatureKeyID — Каким ключом подписано. Не секрет: по нему приёмник выбирает, чем проверять, во время перекрытия
	SignatureKeyID string `json:"signature_key_id"`
	ReplayOfID     *UUID  `json:"replay_of_id,omitempty"`
}

type DeveloperDeliveryPage struct {
	Deliveries []DeveloperDelivery `json:"deliveries"`
	// Limit — Глубина, которая реально применилась
	Limit  int64 `json:"limit"`
	Offset int64 `json:"offset"`
	// HasMore — Признак, а не общее число: счёт по журналу — полный проход по истории кабинета ради числа, которое никому не нужно точным
	HasMore bool `json:"has_more"`
}

type DeveloperFunctionArtifactRow struct {
	// Key — Имя функции внутри приложения. У лишнего модуля его нет: манифест этих байтов не называет
	Key *string `json:"key,omitempty"`
	// Point — Ключ точки расширения, на которой стоит функция
	Point *string `json:"point,omitempty"`
	// Digest — Отпечаток модуля: он и есть имя, под которым байты опознают
	Digest string `json:"digest"`
	// DocumentTypes — Виды документа, на которых функция зовётся. ПУСТОЙ СПИСОК ОЗНАЧАЕТ «на всех», и это то же умолчание, что на экране согласия кабинета.
	DocumentTypes []string `json:"document_types"`
	// Uploaded — Байты с этим отпечатком лежат у этой версии
	Uploaded bool `json:"uploaded"`
	// Size — Размер модуля в байтах. Есть только у загруженного
	Size *int64 `json:"size,omitempty"`
	// UploadedAt — Когда байты положили. Есть только у загруженного
	UploadedAt *string `json:"uploaded_at,omitempty"`
}

type DeveloperFunctionArtifacts struct {
	Version string `json:"version"`
	// Status — Состояние версии. Им объясняется, почему выпущенная версия байтов больше не принимает
	Status string `json:"status"`
	// Editable — Версия ещё принимает байты. Отдельным полем: выводить это из состояния — ошибиться в пользу разрешения
	Editable  bool                           `json:"editable"`
	Functions []DeveloperFunctionArtifactRow `json:"functions"`
	// Undeclared — Отпечатки, которые лежат у версии, но манифестом не названы. Байты приняты и вреда не делают, но исполнены не будут никогда: диспетчер ходит от манифеста, а не от хранилища. Чаще всего это пересобранный модуль, под который забыли поправить отпечаток в манифесте.
	Undeclared []DeveloperFunctionArtifactRow `json:"undeclared"`
}

type DeveloperFunctionArtifactsResult struct {
	Functions DeveloperFunctionArtifacts `json:"functions"`
}

type DeveloperFunctionUpload struct {
	// Digest — Отпечаток, ПОСЧИТАННЫЙ по байтам. Присланный полем digest к этому моменту уже сверен
	Digest    string `json:"digest"`
	Size      int64  `json:"size"`
	CreatedAt string `json:"created_at"`
	// Declared — Манифест версии называет этот отпечаток. Загрузка НЕ ОТКАЗЫВАЕТ модулю, которого манифест не называет: байты целы, а виноват может быть и файл, и манифест — какой из двух, решает издатель. Но узнать об этом он обязан сразу, а не от ворот публикации через день.
	Declared bool `json:"declared"`
	// Verified — Модуль годен к исполнению: импорты по белому списку, оба экспорта ABI, память в пределах. При выключенной песочнице всегда true — рантайма нет, судить нечем.
	Verified bool `json:"verified"`
	// VerifyReason — Машинный код негодности: forbidden_import, abi_missing, module_invalid, verify_failed. Слова на двух языках собирает портал
	VerifyReason *string `json:"verify_reason,omitempty"`
	// VerifyDetail — То единственное, чего кодом не сказать: какой именно импорт запрещён, какого экспорта не хватает
	VerifyDetail *string `json:"verify_detail,omitempty"`
}

type DeveloperFunctionUploadResult struct {
	Upload DeveloperFunctionUpload `json:"upload"`
}

type DeveloperGateCheck struct {
	// Gate — Какое ворот
	Gate string `json:"gate"`
	// Status — `awaiting_review` — ход за персоналом платформы: результат внешнего ворота либо не приносили вовсе, либо приносили для другого документа. Своё состояние, а не `failed`: чинить издателю там нечего, и общий ответ отправил бы его править исправный манифест.
	Status string `json:"status"`
	// External — Результат приносит не сервер — по нему видно, чинится ли отказ правкой манифеста
	External bool `json:"external"`
	// Reason — Машинный код отказа: текст на двух языках собирает портал
	Reason *string `json:"reason,omitempty"`
	// Values — Что именно не подошло: имена прав, адреса, режим, отпечаток. Всё это издатель подал сам
	Values []string `json:"values,omitempty"`
	// CheckedAt — Когда внешнее ворот смотрели в последний раз; у несмотренного его нет
	CheckedAt *string `json:"checked_at,omitempty"`
}

type DeveloperInstallation struct {
	ID UUID `json:"id"`
	// Version — Версия, на которой стоит установка
	Version string                        `json:"version"`
	Status  PlatformAppInstallationStatus `json:"status"`
	// Parked — Приёмник признан мёртвым, и данные кабинета встали. Самое важное поле для издателя
	Parked      bool    `json:"parked"`
	ParkedAt    *string `json:"parked_at,omitempty"`
	InstalledAt string  `json:"installed_at"`
	UpdatedAt   string  `json:"updated_at"`
}

type DeveloperInstallationPage struct {
	Installations []DeveloperInstallation `json:"installations"`
}

type DeveloperIssuedAppKey struct {
	Key DeveloperAppKey `json:"key"`
	// Secret — Значение ключа. Показывается ОДИН РАЗ и больше никогда: в хранилище лежит хеш, и второго способа его узнать не существует
	Secret string `json:"secret"`
}

// DeveloperManifestBlock — Тот же запрет, что видит оператор, без одного поля: идентификатора сотрудника платформы, принявшего решение. Внешний контур — не место для наших внутренних идентификаторов, а имя решавшего превращает решение платформы в решение конкретного лица, с которым можно «договориться».
type DeveloperManifestBlock struct {
	// ManifestFingerprint — sha256 компактной формы документа — тот же отпечаток, который печатает отчёт готовности версии
	ManifestFingerprint string `json:"manifest_fingerprint"`
	// Publisher — Где документ впервые увидели. Улика, а не предмет запрета: тот же отпечаток у другого приложения закрыт этим же запретом
	Publisher  string `json:"publisher"`
	AppKey     string `json:"app_key"`
	ReasonCode string `json:"reason_code"`
	// Summary — Объяснение словами. Наш текст, а не эхо чьих-то слов: его же читает кабинет в карточке уведомления
	Summary string `json:"summary"`
	// Advisory — Внешний https-адрес разбора: CVE, бюллетень, тикет
	Advisory  *string `json:"advisory,omitempty"`
	BlockedAt string  `json:"blocked_at"`
}

type DeveloperProfile struct {
	Account     DeveloperAccount      `json:"account"`
	Application *DeveloperApplication `json:"application,omitempty"`
	// Publishers — Издатели, которыми распоряжается аккаунт
	Publishers []PlatformAppPublisher `json:"publishers"`
}

type DeveloperPublicationReport struct {
	Version string `json:"version"`
	// Status — Состояние версии: черновик, на ревью, опубликована
	Status string `json:"status"`
	// Channel — Канал, объявленный манифестом этой версии
	Channel string `json:"channel"`
	// PublisherStatus — Состояние СВОЕГО издателя: оно объясняет ворот publisher
	PublisherStatus string `json:"publisher_status"`
	// ManifestFingerprint — Отпечаток текущего манифеста: им запрет называет предмет, и по нему видно, что документ поменялся после проверки
	ManifestFingerprint string `json:"manifest_fingerprint"`
	// Ready — Все обязательные ворота пройдены. Отдельным полем: выводить готовность из списка — ошибиться в пользу разрешения
	Ready  bool                 `json:"ready"`
	Checks []DeveloperGateCheck `json:"checks"`
}

type DeveloperPublicationResult struct {
	Publication DeveloperPublicationReport `json:"publication"`
}

type DeveloperRegistrationInput struct {
	Email string `json:"email"`
	// Name — Как подписывать письма; необязательно и учётными данными не является
	Name *string `json:"name,omitempty"`
}

type DeveloperSession struct {
	// Token — Значение сессии; показывается ровно один раз, в хранилище лежит только хеш
	Token string `json:"token"`
	// ExpiresIn — Секунды до истечения сессии
	ExpiresIn int64            `json:"expires_in"`
	Account   DeveloperAccount `json:"account"`
}

type DeveloperSessionInput struct {
	// Code — Одноразовый секрет из письма; действует минуты и предъявляется один раз
	Code string `json:"code"`
}

type DeveloperSignInLinkInput struct {
	Email string `json:"email"`
}

type DiscussionComment struct {
	ID         UUID                `json:"id"`
	OwnerType  DiscussionOwnerType `json:"owner_type"`
	OwnerID    UUID                `json:"owner_id"`
	ParentID   *UUID               `json:"parent_id"`
	AuthorID   *int64              `json:"author_id"`
	AuthorName string              `json:"author_name"`
	Body       string              `json:"body"`
	IsArchived bool                `json:"is_archived"`
	CreatedAt  string              `json:"created_at"`
	UpdatedAt  string              `json:"updated_at"`
}

// DiscussionCommentCreate — Для ответа достаточно `parent_id`; владелец наследуется от родительского комментария.
type DiscussionCommentCreate struct {
	OwnerType    *DiscussionOwnerType `json:"owner_type,omitempty"`
	OwnerID      *string              `json:"owner_id,omitempty"`
	Task         *string              `json:"task,omitempty"`
	Section      *string              `json:"section,omitempty"`
	Project      *string              `json:"project,omitempty"`
	Document     *string              `json:"document,omitempty"`
	Milestone    *string              `json:"milestone,omitempty"`
	CustomerNeed *string              `json:"customer_need,omitempty"`
	PullRequest  *string              `json:"pull_request,omitempty"`
	ParentID     *string              `json:"parent_id,omitempty"`
	Body         string               `json:"body"`
	Author       *int64               `json:"author,omitempty"`
}

type DiscussionCommentPage struct {
	Count   int64               `json:"count"`
	Results []DiscussionComment `json:"results"`
}

type DiscussionCommentUpdate struct {
	Body       *string `json:"body,omitempty"`
	IsArchived *bool   `json:"is_archived,omitempty"`
}

type DiscussionOwnerType = string

// DocflowAcceptedDocument — Учётный документ кабинета, заведённый приёмкой.
type DocflowAcceptedDocument struct {
	ID UUID `json:"id"`
	// Number — Наш номер из нумератора кабинета. Номер продавца лежит в содержимом документа: занять им наш сквозной счётчик значит однажды получить два своих документа с одним номером от двух разных поставщиков
	Number string `json:"number"`
	// Date — Дата документа ГГГГ-ММ-ДД. По умолчанию это дата документа поставщика: операция произошла тогда, когда её совершил он, и датировать её днём приёмки значит поставить факт не в тот период
	Date string `json:"date"`
	// TypeKey — Ключ вида документа; у приёмки docflow_incoming
	TypeKey string `json:"type_key"`
	// TypeName — Имя вида в кабинете. Право клиента: вид можно переименовать, и код держит его за ключ, а не за название
	TypeName string `json:"type_name"`
	// Status — Состояние учётного документа. Приёмка заводит ЧЕРНОВИК: проведение принадлежит модулям — владельцам регистров
	Status string `json:"status"`
	// MarkedDeleted — Документ помечен на удаление. Такой пакет принимается заново: пометка и есть способ сказать «этот документ ошибочный»
	MarkedDeleted bool `json:"marked_deleted"`
	// AcceptedAt — Момент приёмки; пусто, если он не записан
	AcceptedAt string `json:"accepted_at"`
}

type DocflowAdvanceInvoiceInput struct {
	AdvanceID UUID `json:"advance_id"`
	// Date — Дата счёта-фактуры; пусто — дата получения аванса
	Date *string `json:"date,omitempty"`
}

// DocflowAppSalesOrderCounterparty — Покупатель человеческими ключами. ИНН узнаётся строго; телефон — признак физлица. Имя, телефон и почта остаются в продаже или закупке как реквизиты плательщика
type DocflowAppSalesOrderCounterparty struct {
	Name  *string `json:"name,omitempty"`
	INN   *string `json:"inn,omitempty"`
	KPP   *string `json:"kpp,omitempty"`
	Phone *string `json:"phone,omitempty"`
	Email *string `json:"email,omitempty"`
}

type DocflowAppSalesOrderInput struct {
	CompanyID          UUID                              `json:"company_id"`
	ContactID          *UUID                             `json:"contact_id,omitempty"`
	ContractDocumentID *UUID                             `json:"contract_document_id,omitempty"`
	Counterparty       *DocflowAppSalesOrderCounterparty `json:"counterparty,omitempty"`
	// FunnelID — Необязательная действующая воронка продаж этого кабинета; повтор с другой воронкой отвечает 409
	FunnelID *UUID `json:"funnel_id,omitempty"`
	// ExternalID — Номер продажи или закупки у магазина — ключ идемпотентности загрузки
	ExternalID string `json:"external_id"`
	// Number — Пусто — кабинет выдаст следующий номер
	Number *string `json:"number,omitempty"`
	Title  *string `json:"title,omitempty"`
	// Currency — Код валюты сделки, например RUB
	Currency  string  `json:"currency"`
	Manager   *string `json:"manager,omitempty"`
	Comment   *string `json:"comment,omitempty"`
	OrderDate string  `json:"order_date"`
	ShipDate  *string `json:"ship_date,omitempty"`
	DueDate   *string `json:"due_date,omitempty"`
	Discount  *string `json:"discount,omitempty"`
	// PricesIncludeVAT — Цены включают налог; пусто — умолчание кабинета
	PricesIncludeVAT *bool `json:"prices_include_vat,omitempty"`
	// Scenario — Путь сделки; продажа или закупка с оплатой на сайте — self_service
	Scenario *string                      `json:"scenario,omitempty"`
	Payment  *DocflowAppSalesOrderPayment `json:"payment,omitempty"`
	// Source — Не используется контуром приложения: источник журнала — пространство приложения из токена
	Source      *string                    `json:"source,omitempty"`
	WarehouseID *UUID                      `json:"warehouse_id,omitempty"`
	Items       []DocflowAppSalesOrderItem `json:"items"`
}

type DocflowAppSalesOrderItem struct {
	// Article — Артикул или штрихкод позиции у магазина; узнаётся справочником номенклатуры точным совпадением
	Article   *string `json:"article,omitempty"`
	ProductID *UUID   `json:"product_id,omitempty"`
	// Title — Пусто — название берётся из номенклатуры
	Title *string `json:"title,omitempty"`
	// Kind — Пусто — вид номенклатуры
	Kind     *string `json:"kind,omitempty"`
	Unit     *string `json:"unit,omitempty"`
	Quantity string  `json:"quantity"`
	Price    string  `json:"price"`
	Discount *string `json:"discount,omitempty"`
	// VATRate — Ставка строки: 22%, 10%, без НДС; пусто — учётная политика юрлица на дату продажи или закупки
	VATRate *string `json:"vat_rate,omitempty"`
}

// DocflowAppSalesOrderPayment — Сообщение эквайринга о продаже или закупке. Идемпотентно по паре provider + external_id
type DocflowAppSalesOrderPayment struct {
	// Provider — Кто подтвердил списание: yookassa, tochka, имя платёжного кабинета сайта
	Provider string `json:"provider"`
	// ExternalID — Номер платежа у провайдера
	ExternalID string `json:"external_id"`
	// Kind — Пусто — списание (payment)
	Kind *string `json:"kind,omitempty"`
	// Amount — Сумма больше нуля; возврат присылается видом refund, а не минусом
	Amount   string  `json:"amount"`
	Currency *string `json:"currency,omitempty"`
	// PaidAt — Когда провайдер списал; пусто — момент сообщения
	PaidAt *string `json:"paid_at,omitempty"`
}

// DocflowApproval — Один проход предмета по маршруту. Согласование ничего не проводит и ни строки регистра не пишет: оно отвечает на один вопрос — можно ли уже выполнить действие, выпускающее бумагу или деньги наружу. Возврат на доработку проход не закрывает: предмет правят и продолжают тот же проход, сохраняя чужие визы.
type DocflowApproval struct {
	ID            UUID                   `json:"id"`
	Subject       DocflowApprovalSubject `json:"subject"`
	SubjectTitle  *string                `json:"subject_title,omitempty"`
	SubjectNumber *string                `json:"subject_number,omitempty"`
	CompanyID     *UUID                  `json:"company_id,omitempty"`
	ContactID     *UUID                  `json:"contact_id,omitempty"`
	ItemID        *UUID                  `json:"item_id,omitempty"`
	RouteID       *UUID                  `json:"route_id,omitempty"`
	RouteName     *string                `json:"route_name,omitempty"`
	ReworkMode    string                 `json:"rework_mode"`
	// Amount — Пусто законно: у рамочного договора суммы нет
	Amount   *string `json:"amount,omitempty"`
	Currency *string `json:"currency,omitempty"`
	// ContentVersion — Редакция предмета, по которой решают
	ContentVersion int64  `json:"content_version"`
	State          string `json:"state"`
	// ActiveStage — Номер текущего этапа
	ActiveStage   int64                  `json:"active_stage"`
	RequestedBy   int64                  `json:"requested_by"`
	RequestedName *string                `json:"requested_name,omitempty"`
	RequestedAt   string                 `json:"requested_at"`
	FinishedAt    *string                `json:"finished_at,omitempty"`
	RemindedAt    *string                `json:"reminded_at,omitempty"`
	EscalatedAt   *string                `json:"escalated_at,omitempty"`
	UpdatedAt     string                 `json:"updated_at"`
	Stages        []DocflowApprovalStage `json:"stages"`
	Events        []DocflowApprovalEvent `json:"events,omitempty"`
}

// DocflowApprovalActionCheck — Вердикт по одному действию вместе с причинами отказа.
type DocflowApprovalActionCheck struct {
	Allowed bool                         `json:"allowed"`
	Reasons []DocflowApprovalBlockReason `json:"reasons"`
}

// DocflowApprovalBlockReason — Почему действие запрещено, словами, а не кодом состояния.
type DocflowApprovalBlockReason struct {
	Code       string  `json:"code"`
	Message    string  `json:"message"`
	ApprovalID *UUID   `json:"approval_id,omitempty"`
	StageTitle *string `json:"stage_title,omitempty"`
}

// DocflowApprovalBlockers — Что можно сделать с предметом прямо сейчас и почему нельзя остальное. Согласование блокирует РОВНО ДВА действия — отправку контрагенту и отправку заявки в банк; editing_stays_unlocked говорит прямо, что редактирование карточки не глушится никогда. Это СНИМОК: между чтением и нажатием кнопки мир может измениться, и настоящую защиту держит транзакция самого действия.
type DocflowApprovalBlockers struct {
	Subject DocflowApprovalSubject `json:"subject"`
	// Required — Объявлен ли вид предмета требующим согласования
	Required           bool                       `json:"required"`
	ApprovalID         *UUID                      `json:"approval_id,omitempty"`
	State              *string                    `json:"state,omitempty"`
	SendToCounterparty DocflowApprovalActionCheck `json:"send_to_counterparty"`
	SendToBank         DocflowApprovalActionCheck `json:"send_to_bank"`
	CanSubmit          bool                       `json:"can_submit"`
	CanDecide          bool                       `json:"can_decide"`
	// CanAcknowledge — У человека есть неотмеченное «ознакомиться» в этом проходе — своё или делегированное
	CanAcknowledge   *bool   `json:"can_acknowledge,omitempty"`
	CanCancel        bool    `json:"can_cancel"`
	CanResubmit      bool    `json:"can_resubmit"`
	MatchedRouteID   *UUID   `json:"matched_route_id,omitempty"`
	MatchedRouteName *string `json:"matched_route_name,omitempty"`
	// EditingStaysUnlocked — Всегда истинно: редактирование карточки согласование не глушит
	EditingStaysUnlocked bool `json:"editing_stays_unlocked"`
}

type DocflowApprovalCancelInput struct {
	// Comment — Причина отзыва остаётся в истории прохода
	Comment string `json:"comment"`
}

// DocflowApprovalChainPreview — Кто согласует предмет по его фактам: маршрут, этапы, пропуски по сумме и люди.
type DocflowApprovalChainPreview struct {
	// Outcome — auto — маршрут подошёл, но все его этапы согласования отсечены порогами по сумме: предмет согласуется автоматически, без виз
	Outcome string `json:"outcome"`
	// Required — Согласование вида объявлено обязательным
	Required  bool    `json:"required"`
	RouteID   *UUID   `json:"route_id,omitempty"`
	RouteName *string `json:"route_name,omitempty"`
	// RouteStandard — Подобран стандартный маршрут: ни один маршрут кабинета не подошёл
	RouteStandard      *bool                       `json:"route_standard,omitempty"`
	PaymentDestination *string                     `json:"payment_destination,omitempty"`
	Stages             []DocflowApprovalChainStage `json:"stages"`
}

// DocflowApprovalChainStage — Этап маршрута глазами «кто согласует» до отправки.
type DocflowApprovalChainStage struct {
	Position int64   `json:"position"`
	Title    *string `json:"title,omitempty"`
	// StageKind — Что делает этап: approve — согласует и держит маршрут; acknowledge — «ознакомиться»: извещает участников (нужно право docflow.flow:read), маршрут не держит, отказа не знает (ERP-1566). Пусто — approve
	StageKind     *string `json:"stage_kind,omitempty"`
	Mode          string  `json:"mode"`
	AssigneeKind  string  `json:"assignee_kind"`
	AssigneeLabel *string `json:"assignee_label,omitempty"`
	// MinAmount — Лимит этапа: выполняется при сумме от этого значения
	MinAmount *string `json:"min_amount,omitempty"`
	DueHours  *int64  `json:"due_hours,omitempty"`
	// Applies — Этап выполнится при этих фактах
	Applies bool `json:"applies"`
	// SkipReason — Почему этап не выполнится
	SkipReason *string `json:"skip_reason,omitempty"`
	// Problem — Этап выполнится, но спросить некого
	Problem *string                 `json:"problem,omitempty"`
	People  []DocflowApprovalPerson `json:"people"`
}

// DocflowApprovalDecisionInput — Одно решение. Комментарий обязателен у return и reject и не требуется у approve: отказ без слов отправляет автора чинить неизвестно что.
type DocflowApprovalDecisionInput struct {
	// ApprovalID — Заполняется из адреса; значение в теле роли не играет
	ApprovalID *UUID `json:"approval_id,omitempty"`
	// ReviewerID — ЧЬЯ виза закрывается. Не обязательно тот, кто нажимает: замещающий закрывает визу отсутствующего, оставаясь собой в истории
	ReviewerID *int64  `json:"reviewer_id,omitempty"`
	Decision   string  `json:"decision"`
	Comment    *string `json:"comment,omitempty"`
}

// DocflowApprovalDepartment — Подразделение справочника ядра глазами согласования.
type DocflowApprovalDepartment struct {
	ID    UUID   `json:"id"`
	Code  string `json:"code"`
	Label string `json:"label"`
}

// DocflowApprovalDirectories — Справочники конструктора маршрутов ОДНИМ ответом: три отдельных запроса ради одной формы означают три повода ей мигнуть и три места, где список окажется из разных моментов времени.
type DocflowApprovalDirectories struct {
	Departments []DocflowApprovalDepartment `json:"departments"`
	Roles       []DocflowApprovalRoleRef    `json:"roles"`
	People      []DocflowApprovalPerson     `json:"people"`
	// Subjects — Виды предметов, которые сегодня умеют согласовываться, вместе с их обязательностью
	Subjects []DocflowApprovalPolicy `json:"subjects"`
}

// DocflowApprovalEvent — Строка истории прохода. Не переписывается.
type DocflowApprovalEvent struct {
	ID            UUID   `json:"id"`
	StagePosition *int64 `json:"stage_position,omitempty"`
	// Action — auto_approved — согласовано автоматически: сумма меньше порогов маршрута. operator_* — ответ оператору по входящему пакету ЭДО после прохода (настройка подключения reply_after_approval); comment несёт слова оператора или машинный код отказа docflow.edo.*
	Action    string  `json:"action"`
	UserID    *int64  `json:"user_id,omitempty"`
	UserName  *string `json:"user_name,omitempty"`
	Comment   *string `json:"comment,omitempty"`
	CreatedAt string  `json:"created_at"`
}

// DocflowApprovalInboxItem — Строка очереди. Это НЕ урезанный предмет: ни файлов, ни строк, ни связей здесь нет — очередь открывают, чтобы решить, что открывать дальше.
type DocflowApprovalInboxItem struct {
	ApprovalID    UUID                   `json:"approval_id"`
	Subject       DocflowApprovalSubject `json:"subject"`
	SubjectTitle  string                 `json:"subject_title"`
	SubjectNumber *string                `json:"subject_number,omitempty"`
	RouteName     *string                `json:"route_name,omitempty"`
	StageTitle    *string                `json:"stage_title,omitempty"`
	StagePosition int64                  `json:"stage_position"`
	// StageCount — Сколько этапов в маршруте всего
	StageCount    int64   `json:"stage_count"`
	StageMode     string  `json:"stage_mode"`
	Amount        *string `json:"amount,omitempty"`
	Currency      *string `json:"currency,omitempty"`
	CompanyName   *string `json:"company_name,omitempty"`
	ContactName   *string `json:"contact_name,omitempty"`
	RequestedName *string `json:"requested_name,omitempty"`
	RequestedAt   string  `json:"requested_at"`
	DueAt         *string `json:"due_at,omitempty"`
	Overdue       bool    `json:"overdue"`
	// OnBehalfOf — Чью визу вы ставите, если это не ваша собственная
	OnBehalfOf  *string `json:"on_behalf_of,omitempty"`
	OnBehalfVia *string `json:"on_behalf_via,omitempty"`
	// ReturnedToMe — Истинно у собственной отправки, которую вернули на доработку
	ReturnedToMe bool `json:"returned_to_me"`
	// Informational — Строка этапа «ознакомиться»: решения не ждут, нужна отметка POST /approvals/{id}/acknowledge
	Informational *bool `json:"informational,omitempty"`
}

type DocflowApprovalInboxPage struct {
	Items   []DocflowApprovalInboxItem `json:"items"`
	HasMore bool                       `json:"has_more"`
}

// DocflowApprovalPerson — Человек в списках согласования. Логин, роли и права наружу не отдаются.
type DocflowApprovalPerson struct {
	ID   int64  `json:"id"`
	Name string `json:"name"`
}

// DocflowApprovalPolicy — Обязательность согласования у ОДНОГО вида предмета, а не глобальный выключатель кабинета: у заявки на оплату согласование может быть обязательным, а у письма контрагенту — нет.
type DocflowApprovalPolicy struct {
	SubjectModule string `json:"subject_module"`
	SubjectKind   string `json:"subject_kind"`
	Required      bool   `json:"required"`
}

// DocflowApprovalResubmitInput — Повторная отправка после доработки. Что произойдёт с визами, решает настройка маршрута: restart гасит все, returner_only сохраняет визы всех, кроме вернувшего.
type DocflowApprovalResubmitInput struct {
	// ApprovalID — Заполняется из адреса; значение в теле роли не играет
	ApprovalID *UUID `json:"approval_id,omitempty"`
	// AskAgain — Кого инициатор решил переспросить дополнительно. Вернувший этап переспрашивается всегда и в списке не нужен
	AskAgain []UUID  `json:"ask_again,omitempty"`
	Comment  *string `json:"comment,omitempty"`
}

// DocflowApprovalReview — Персональная виза. actor_id — чья она, decided_by — чья рука её поставила, если это не сам согласующий, а decided_via — на каком основании: замещение, поручение или вмешательство администратора.
type DocflowApprovalReview struct {
	ID            UUID    `json:"id"`
	ActorID       int64   `json:"actor_id"`
	ActorName     *string `json:"actor_name,omitempty"`
	DecidedBy     *int64  `json:"decided_by,omitempty"`
	DecidedByName *string `json:"decided_by_name,omitempty"`
	DecidedVia    *string `json:"decided_via,omitempty"`
	DelegatedTo   *int64  `json:"delegated_to,omitempty"`
	// Decision — Пусто, пока человек не решил; acknowledge — отметка «ознакомлен» на этапе ознакомления
	Decision *string `json:"decision,omitempty"`
	// Comment — Обязателен у return и reject: без слов автор не узнает, что исправлять
	Comment   *string `json:"comment,omitempty"`
	DecidedAt *string `json:"decided_at,omitempty"`
}

// DocflowApprovalRoleRef — Роль кабинета глазами согласования: идентификатор и имя, без состава прав.
type DocflowApprovalRoleRef struct {
	ID   UUID   `json:"id"`
	Name string `json:"name"`
}

// DocflowApprovalRoute — Именованный ШАБЛОН маршрута, а не разовый список людей. Подошло несколько — берётся самый конкретный; нижняя граница суммы включается, верхняя нет, поэтому смежные диапазоны стыкуются без щели и без нахлёста. Названия юрлица, контрагента, папки и статьи подставляются на чтении: в шаблоне хранятся только ссылки.
type DocflowApprovalRoute struct {
	ID            UUID   `json:"id"`
	Name          string `json:"name"`
	SubjectModule string `json:"subject_module"`
	// SubjectKind — any — любой вид предмета своего модуля
	SubjectKind string `json:"subject_kind"`
	// DocumentKind — Вид бумаги у владельца предмета
	DocumentKind    *string `json:"document_kind,omitempty"`
	CompanyID       *UUID   `json:"company_id,omitempty"`
	CompanyName     *string `json:"company_name,omitempty"`
	ContactID       *UUID   `json:"contact_id,omitempty"`
	ContactName     *string `json:"contact_name,omitempty"`
	ContactFolderID *UUID   `json:"contact_folder_id,omitempty"`
	ContactFolder   *string `json:"contact_folder,omitempty"`
	ItemID          *UUID   `json:"item_id,omitempty"`
	ItemName        *string `json:"item_name,omitempty"`
	// BusinessID — Условие «бизнес предмета»; без юрлица у предмета бизнес берётся из формы проверки
	BusinessID   *UUID   `json:"business_id,omitempty"`
	BusinessName *string `json:"business_name,omitempty"`
	// DepartmentID — Условие «подразделение автора»: срабатывает и на подотделы
	DepartmentID   *UUID   `json:"department_id,omitempty"`
	DepartmentName *string `json:"department_name,omitempty"`
	// AmountFrom — Нижняя граница суммы ВКЛЮЧАЕТСЯ
	AmountFrom *string `json:"amount_from,omitempty"`
	// AmountTo — Верхняя граница суммы НЕ включается
	AmountTo *string `json:"amount_to,omitempty"`
	// ReworkMode — Что будет после возврата на доработку: весь путь заново либо продолжает вернувший, визы остальных сохраняются
	ReworkMode string `json:"rework_mode"`
	// PaymentDestination — Для заявки на оплату (docflow / payment_request): куда идёт согласованная — сразу в платёжный календарь (дата оплаты = срок) или казначею, который ставит дату платежа (ERP-1427, этап 6)
	PaymentDestination *string `json:"payment_destination,omitempty"`
	// SystemKey — Код стандартного маршрута кабинета. Его заводит система выключенным; включённый, он подбирается последним — когда ни один другой маршрут не подошёл. Пусто — маршрут заведён кабинетом
	SystemKey *string `json:"system_key,omitempty"`
	// IsActive — Выключенный маршрут не подбирается новым проходам, но остаётся на месте
	IsActive  bool                        `json:"is_active"`
	Stages    []DocflowApprovalRouteStage `json:"stages"`
	CreatedAt string                      `json:"created_at"`
	UpdatedAt string                      `json:"updated_at"`
}

type DocflowApprovalRouteList struct {
	Items []DocflowApprovalRoute `json:"items"`
}

// DocflowApprovalRouteStage — Этап ШАБЛОНА маршрута. Согласующий назван одним из пяти способов, и каждый отвечает своему вопросу: user — «решает именно он», department — «согласует склад», role — «согласует любой бухгалтер», manager — «спросить начальника автора, кем бы автор ни оказался», department_head — «спросить руководителя отдела» по оргструктуре: отдела автора или названного, а нет руководителя или автор руководит сам — выше по дереву. Согласующий может быть не выбран (способ назван, ссылки нет) только у выключенного маршрута: так сеется этап «Финансы» стандартного маршрута заявок.
type DocflowApprovalRouteStage struct {
	ID *UUID `json:"id,omitempty"`
	// Position — Порядок этапа в маршруте
	Position             int64   `json:"position"`
	Title                *string `json:"title,omitempty"`
	AssigneeKind         string  `json:"assignee_kind"`
	AssigneeUserID       *int64  `json:"assignee_user_id,omitempty"`
	AssigneeDepartmentID *UUID   `json:"assignee_department_id,omitempty"`
	AssigneeRoleID       *UUID   `json:"assignee_role_id,omitempty"`
	// IncludeSubdepartments — Только для department: спросить и сотрудников подотделов
	IncludeSubdepartments *bool `json:"include_subdepartments,omitempty"`
	// AssigneeLabel — Как назначение читается человеком. Подставляется на чтении; в шаблоне не хранится
	AssigneeLabel *string `json:"assignee_label,omitempty"`
	// StageKind — Что делает этап: approve — согласует и держит маршрут; acknowledge — «ознакомиться»: извещает участников (нужно право docflow.flow:read), маршрут не держит, отказа не знает (ERP-1566). Пусто — approve
	StageKind *string `json:"stage_kind,omitempty"`
	// Mode — Решают все или достаточно одного. Кворума с процентом нет
	Mode string `json:"mode"`
	// DueHours — Срок ЭТАПА в часах. Просрочка даёт напоминание и эскалацию на одно звено; автоотклонения по сроку нет
	DueHours *int64 `json:"due_hours,omitempty"`
	// MinAmount — Лимит по сумме УСЛОВИЕМ НА ЭТАП: выполнять только при сумме от N. Этап, чей лимит не достигнут, остаётся в проходе строкой skipped
	MinAmount *string `json:"min_amount,omitempty"`
}

// DocflowApprovalStage — Этап ПРОХОДА: кого спросили на самом деле. Состояние skipped означает «этап не выполняется, его лимит по сумме не достигнут»; строка всё равно есть, чтобы человек видел, ПОЧЕМУ финансового директора не спросили.
type DocflowApprovalStage struct {
	ID       UUID    `json:"id"`
	Position int64   `json:"position"`
	Title    *string `json:"title,omitempty"`
	// StageKind — Что делает этап: approve — согласует и держит маршрут; acknowledge — «ознакомиться»: извещает участников (нужно право docflow.flow:read), маршрут не держит, отказа не знает (ERP-1566). Пусто — approve
	StageKind     *string `json:"stage_kind,omitempty"`
	Mode          string  `json:"mode"`
	AssigneeKind  string  `json:"assignee_kind"`
	AssigneeLabel *string `json:"assignee_label,omitempty"`
	MinAmount     *string `json:"min_amount,omitempty"`
	DueHours      *int64  `json:"due_hours,omitempty"`
	DueAt         *string `json:"due_at,omitempty"`
	// State — notified — этап ознакомления известил участников и пропустил проход дальше; acknowledged — все отметились
	State     string                  `json:"state"`
	StartedAt *string                 `json:"started_at,omitempty"`
	DecidedAt *string                 `json:"decided_at,omitempty"`
	Reviews   []DocflowApprovalReview `json:"reviews"`
}

// DocflowApprovalSubject — Предмет согласования НЕЙТРАЛЬНОЙ ТРОЙКОЙ «модуль — вид — идентификатор». Внешнего ключа на предмет нет вовсе: без этого приёма к заявке на оплату, живущей в модуле finance (счета, выписки и расчёты), лист было бы не прицепить.
type DocflowApprovalSubject struct {
	// Module — Модуль-владелец предмета
	Module string `json:"module"`
	// Kind — Вид предмета: карточка документооборота, заявка на оплату или входящий документ ЭДО
	Kind string `json:"kind"`
	// ID — Идентификатор предмета у его владельца
	ID UUID `json:"id"`
}

// DocflowApprovalSubjectFacts — Что владелец предмета рассказывает о нём согласованию своим портом. Пустая сумма законна — у рамочного договора её нет, и ноль вместо неё назвал бы сумму, которой не называли.
type DocflowApprovalSubjectFacts struct {
	Subject DocflowApprovalSubject `json:"subject"`
	Title   string                 `json:"title"`
	Number  *string                `json:"number,omitempty"`
	// DocumentKind — Вид бумаги у владельца: договор, счёт, акт
	DocumentKind    *string `json:"document_kind,omitempty"`
	CompanyID       *UUID   `json:"company_id,omitempty"`
	ContactID       *UUID   `json:"contact_id,omitempty"`
	ContactFolderID *UUID   `json:"contact_folder_id,omitempty"`
	// ItemID — Статья расхода предмета
	ItemID *UUID `json:"item_id,omitempty"`
	// Amount — Сумма десятичным текстом; пусто там, где суммы нет
	Amount   *string `json:"amount,omitempty"`
	Currency *string `json:"currency,omitempty"`
	// ContentVersion — Редакция предмета у владельца — основание значимой правки
	ContentVersion int64 `json:"content_version"`
	// AuthorID — Кто завёл предмет; нужен этапу «руководитель автора»
	AuthorID int64 `json:"author_id"`
}

// DocflowApprovalSubjectState — Согласование одного предмета глазами его карточки.
type DocflowApprovalSubjectState struct {
	Blockers DocflowApprovalBlockers `json:"blockers"`
	// Approval — Отсутствует, пока предмет ни разу не отправляли
	Approval *DocflowApproval            `json:"approval,omitempty"`
	Facts    DocflowApprovalSubjectFacts `json:"facts"`
	// Preview — Кто согласует, если отправить сейчас; есть, только когда открытого или согласованного прохода нет
	Preview *DocflowApprovalChainPreview `json:"preview,omitempty"`
}

// DocflowAttachment — Файл внутри пакета. Внутреннего пути в хранилище здесь нет: снаружи файл получают отдельной операцией, а путь не часть контракта и не подсказка для перебора.
type DocflowAttachment struct {
	ID      UUID `json:"id"`
	Message UUID `json:"message"`
	// ExternalID — Идентификатор вложения у оператора
	ExternalID string `json:"external_id"`
	// Name — Имя файла словами оператора
	Name string `json:"name"`
	// Kind — Наш словарь, а не оператора: документ, ответный титул, служебное извещение. Пусто означает, что вид неизвестен, и это законно
	Kind        string `json:"kind"`
	ContentType string `json:"content_type"`
	SizeBytes   int64  `json:"size_bytes"`
	Sha256      string `json:"sha256"`
	// Stored — Байты скачаны и лежат у НАС. Ссылка оператора хранилищем не считается: она живёт около месяца, а накладную спрашивают через три года
	Stored       bool    `json:"stored"`
	DownloadedAt *string `json:"downloaded_at,omitempty"`
	CreatedAt    string  `json:"created_at"`
}

// DocflowCancellation — Соглашение сторон об аннулировании документа. Запускает его любая сторона, а решает вторая: согласие даёт состояние 22 «Документ аннулирован», отказ — состояние 40 «Аннулирование отклонено», при котором состояние самого документа НЕ меняется. Шаг цепочки выводится из ленты СОБЫТИЙ пакета, а не из кода состояния: состояние 27 «Ожидает аннулирования» оператор отдаёт только отдельным методом выборки по событиям.
type DocflowCancellation struct {
	// State — Шаг цепочки: none — её нет; requested — ждём решения; agreed — аннулирован по соглашению; refused — в аннулировании отказано, и документ остался действующим
	State string `json:"state"`
	// StateName — Слова ОПЕРАТОРА о состоянии, когда оно относится к аннулированию. Своего перевода состояний у нас нет и быть не должно
	StateName string `json:"state_name"`
	// Initiator — Кто запустил цепочку. Пусто означает «неизвестно», а не «мы»
	Initiator string `json:"initiator"`
	// Reason — Причина словами того, кто её написал. Не переводится
	Reason      string  `json:"reason"`
	RequestedAt *string `json:"requested_at"`
	DecidedAt   *string `json:"decided_at"`
	// Available — Вид документа вообще допускает аннулирование. У электронной транспортной накладной его нет: там отказ 409 с кодом docflow.edo.cancellation_unavailable
	Available bool `json:"available"`
	// CanRequest — Ход за нами и цепочку можно начать
	CanRequest bool `json:"can_request"`
	// CanApprove — Соглашение прислали нам и на него можно согласиться
	CanApprove bool `json:"can_approve"`
	// CanReject — Соглашение прислали нам и в нём можно отказать
	CanReject bool `json:"can_reject"`
}

// DocflowCertificate — Сертификат, которым подпись доказывают спустя годы: имя подписанта меняется, отпечаток нет.
type DocflowCertificate struct {
	Thumbprint string  `json:"thumbprint"`
	Subject    string  `json:"subject"`
	ValidFrom  *string `json:"valid_from,omitempty"`
	ValidTo    *string `json:"valid_to,omitempty"`
}

// DocflowConnection — Подключение юрлица к оператору ЭДО. Учётных данных здесь нет ни одним полем: снаружи виден только признак has_credentials.
type DocflowConnection struct {
	ID UUID `json:"id"`
	// Provider — Оператор ЭДО. Диадок объявлен, адаптера к нему пока нет
	Provider string `json:"provider"`
	// ProviderName — Имя оператора для интерфейса; торговая марка, не переводится
	ProviderName string `json:"provider_name"`
	DisplayName  string `json:"display_name"`
	Company      *UUID  `json:"company,omitempty"`
	CompanyName  string `json:"company_name"`
	CompanyINN   string `json:"company_inn"`
	CompanyKPP   string `json:"company_kpp"`
	// Status — reauth_required отделён от error намеренно: сеть починится сама, а отозванный доступ требует человека
	Status     string `json:"status"`
	StatusName string `json:"status_name"`
	// HasCredentials — Тройка ключей оператора задана. Самих значений наружу не отдают никогда
	HasCredentials bool `json:"has_credentials"`
	// ReadOnly — Действующее ограничение: отправка, подписание и изменение состояний в ЭДО отключены
	ReadOnly bool `json:"read_only"`
	// DraftWrite — Режим «Черновики в ЭДО» (ERP-1551): при read_only=true оператору уходят черновики; подпись, отправка и ответы остаются закрытыми
	DraftWrite *bool `json:"draft_write,omitempty"`
	// ReplyAfterApproval — «После нашего согласования — ответить у оператора». Когда проход внутреннего маршрута по входящему пакету закончен, документооборот выполняет у оператора действие текущего этапа: «согласован» — «Утвердить», «отклонён» — «Отклонить» с причиной из визы. Этап с подписью не закрывается: пакет ждёт человека в «Ждут меня → Подписать». Итог — строкой журнала прохода (operator_*). По умолчанию выключено.
	ReplyAfterApproval bool `json:"reply_after_approval"`
	// ExternalOrgID — Идентификатор нашей организации у оператора; выясняется сопоставлением по ИНН и КПП, руками не вводится
	ExternalOrgID string `json:"external_org_id"`
	// GrantedByUserID — Кто из ERP выдал доступ; имя человека на стороне оператора нам неизвестно
	GrantedByUserID *int64  `json:"granted_by_user_id,omitempty"`
	GrantedByName   string  `json:"granted_by_name"`
	GrantedAt       *string `json:"granted_at,omitempty"`
	LastSyncAt      *string `json:"last_sync_at,omitempty"`
	// LastSyncStatus — Итог последнего прохода синхронизации
	LastSyncStatus string `json:"last_sync_status"`
	// LastError — СЛОВА ОПЕРАТОРА и только они: по ним человек чинит доступ в кабинете оператора
	LastError string `json:"last_error"`
	// LastErrorCode — Машинный код последней неудачи (docflow.edo.*); его переводит интерфейс
	LastErrorCode string `json:"last_error_code"`
	MessagesTotal int64  `json:"messages_total"`
	// ActionsDue — Сколько пакетов ждут нашего действия
	ActionsDue int64  `json:"actions_due"`
	CreatedAt  string `json:"created_at"`
	UpdatedAt  string `json:"updated_at"`
}

type DocflowConnectionList struct {
	Count   int64               `json:"count"`
	Results []DocflowConnection `json:"results"`
}

// DocflowCounterparty — Вторая сторона обмена. Реквизиты хранятся текстом всегда, даже когда сопоставление с нашим контрагентом состоялось: карточку могут удалить или переименовать, а пакет обязан остаться читаемым спустя годы.
type DocflowCounterparty struct {
	Name string `json:"name"`
	INN  string `json:"inn"`
	KPP  string `json:"kpp"`
	// ExternalID — Идентификатор участника обмена у оператора: надёжнее ИНН, потому что у одного ИНН бывает несколько ящиков
	ExternalID string `json:"external_id"`
	Contact    *UUID  `json:"contact,omitempty"`
	// ContactName — Наш контрагент, если сопоставление состоялось. Это наша догадка по ИНН либо выбор человека, а не факт от оператора
	ContactName string `json:"contact_name"`
}

// DocflowEvent — Событие ленты пакета. Лента — то, по чему человек восстанавливает ход спора с контрагентом, поэтому название и комментарий хранятся словами оператора и не переводятся.
type DocflowEvent struct {
	ID         UUID    `json:"id"`
	Message    UUID    `json:"message"`
	ExternalID string  `json:"external_id"`
	Name       string  `json:"name"`
	Comment    string  `json:"comment"`
	OccurredAt *string `json:"occurred_at,omitempty"`
	CreatedAt  string  `json:"created_at"`
}

// DocflowFlowAccountingLink — Ссылка на учётный документ чужого модуля по личности. Состояние, остаток и содержимое чужого документа сюда не копируются: правда о нём живёт у его владельца.
type DocflowFlowAccountingLink struct {
	ID         UUID   `json:"id"`
	Owner      string `json:"owner"`
	DocumentID UUID   `json:"document_id"`
	// SourceAction — Команда, породившая связь: create_plan, accept_act и подобные
	SourceAction *string `json:"source_action,omitempty"`
	// SourceVersion — Редакция бумаги, закреплённая командой
	SourceVersion *int64 `json:"source_version,omitempty"`
	// TargetVersion — Редакция учётного документа, из которой сделана бумага
	TargetVersion *int64 `json:"target_version,omitempty"`
}

// DocflowFlowChangeInput — Одна команда правки. Поля, не относящиеся к названному действию, отвергаются, а не игнорируются: запрос, просящий две разные вещи сразу, сам не знает, чего хочет.
type DocflowFlowChangeInput struct {
	// ExpectedVersion — Версия, которую видел клиент. Разошлась — 409 docflow.flow.version_conflict
	ExpectedVersion int64               `json:"expected_version"`
	Action          string              `json:"action"`
	Content         *DocflowFlowContent `json:"content,omitempty"`
	// Custom — Для action=custom: значения своих полей целиком. Правятся у черновика и зарегистрированной карточки; значение, не подходящее к типу графы, — 422 с названиями граф
	Custom     map[string]json.RawMessage `json:"custom,omitempty"`
	CompanyID  *UUID                      `json:"company_id,omitempty"`
	ContactID  *UUID                      `json:"contact_id,omitempty"`
	Kind       *DocflowFlowKind           `json:"kind,omitempty"`
	Direction  *string                    `json:"direction,omitempty"`
	FileID     *UUID                      `json:"file_id,omitempty"`
	Relation   *DocflowFlowRelationInput  `json:"relation,omitempty"`
	RelationID *UUID                      `json:"relation_id,omitempty"`
}

// DocflowFlowCommercial — Коммерческая часть бумаги — сумма, валюта, строки и графики. Пустая amount законна только вместе с payment_rule, у которого названа сумма платежа: у бессрочного договора итога нет и быть не может, а строк оригинала и этапов работ у такой сделки не бывает — их суммы обязаны сойтись с итогом.
type DocflowFlowCommercial struct {
	Currency string `json:"currency"`
	// Amount — Десятичным текстом; пусто — итога нет или его выводит правило графика
	Amount       string                      `json:"amount"`
	PaymentTerms *string                     `json:"payment_terms,omitempty"`
	DueDate      *string                     `json:"due_date,omitempty"`
	Lines        []DocflowFlowCommercialLine `json:"lines,omitempty"`
	// Milestones — Этапы работ
	Milestones []DocflowFlowScheduleStage `json:"milestones,omitempty"`
	// Payments — График платежей; при payment_rule — его раскрытие
	Payments    []DocflowFlowScheduleStage `json:"payments,omitempty"`
	PaymentRule *DocflowFlowPaymentRule    `json:"payment_rule,omitempty"`
}

// DocflowFlowCommercialLine — Строка переписанного оригинала, а не расчёт. Сумма строки приходит явно: скидка поставщика, налог и округление не заменяются местным произведением количества на цену.
type DocflowFlowCommercialLine struct {
	ID          UUID    `json:"id"`
	ProductID   *UUID   `json:"product_id,omitempty"`
	ProductName *string `json:"product_name,omitempty"`
	Name        string  `json:"name"`
	Unit        *string `json:"unit,omitempty"`
	Quantity    *string `json:"quantity,omitempty"`
	Price       *string `json:"price,omitempty"`
	Amount      string  `json:"amount"`
	// VATAmount — null означает, что налог не переписывали, а не что строка без налога
	VATAmount *string `json:"vat_amount,omitempty"`
}

// DocflowFlowCommercialTaxLine — Вычисленная строка НДС для чтения карточки: тот же результат, что в печатной форме, но не часть сохранённого оригинала
type DocflowFlowCommercialTaxLine struct {
	LineID UUID `json:"line_id"`
	// Rate — Ставка для показа; пусто, если политика не дала ставку
	Rate *string `json:"rate,omitempty"`
	// Amount — НДС десятичным текстом; пусто, если налог не определён
	Amount *string `json:"amount,omitempty"`
}

// DocflowFlowContent — Реквизиты бумаги — то, что переписано с документа.
type DocflowFlowContent struct {
	Title      string                    `json:"title"`
	Number     *string                   `json:"number,omitempty"`
	Date       string                    `json:"date"`
	Contract   *DocflowFlowContractTerms `json:"contract,omitempty"`
	Commercial *DocflowFlowCommercial    `json:"commercial,omitempty"`
	Recognized *DocflowFlowRecognized    `json:"recognized,omitempty"`
	// Custom — Значения своих полей кабинета (графы вида docflow.document.<вид>). В save не прислано — не меняются; правятся действием custom
	Custom map[string]json.RawMessage `json:"custom,omitempty"`
}

// DocflowFlowContractTerms — Условия договора в старой форме. Остаётся читаемой и принимается, но новую коммерческую часть описывает commercial. У договора без лимита (mode=framework) суммы и валюты в условиях нет вовсе — искусственного нуля здесь не бывает. Коммерческая часть рядом с ним законна только с payment_rule, у которого названа сумма платежа: это бессрочный договор с регулярным платежом. Без неё это рамочный договор, суммы которого ведутся спецификациями, и commercial с ним не сохраняется.
type DocflowFlowContractTerms struct {
	Mode       string  `json:"mode"`
	Subject    string  `json:"subject"`
	ValidFrom  string  `json:"valid_from"`
	ValidUntil *string `json:"valid_until,omitempty"`
	// Amount — Только у mode=fixed
	Amount       *string `json:"amount,omitempty"`
	Currency     *string `json:"currency,omitempty"`
	PaymentTerms *string `json:"payment_terms,omitempty"`
	RenewalTerms *string `json:"renewal_terms,omitempty"`
	// OrderFunnelID — Воронка продаж или закупок договора: продажи или закупки по договору идут в неё (пометка кабинета, не текст бумаги)
	OrderFunnelID *string `json:"order_funnel_id,omitempty"`
	// Responsibles — Ответственные по договору с долями: продажи и закупки периодов получают их по умолчанию; сумма долей — ровно 100
	Responsibles []DocflowFlowResponsible `json:"responsibles,omitempty"`
}

type DocflowFlowCreateInput struct {
	CompanyID UUID               `json:"company_id"`
	ContactID UUID               `json:"contact_id"`
	Kind      DocflowFlowKind    `json:"kind"`
	Direction string             `json:"direction"`
	Content   DocflowFlowContent `json:"content"`
}

// DocflowFlowDocument — Карточка документа внутреннего контура в одной редакции. Каждая принятая команда рождает новую неизменяемую редакцию, а прежняя остаётся читаемой по своему адресу.
type DocflowFlowDocument struct {
	ID        UUID `json:"id"`
	CompanyID UUID `json:"company_id"`
	// ExecutionCutover — Бизнес юрлица бумаги прошёл отсечку этапа 4: мастер «Принять акт» и «Создать продажу / закупку» у бумаги сняты
	ExecutionCutover *bool           `json:"execution_cutover,omitempty"`
	CompanyName      string          `json:"company_name"`
	ContactID        UUID            `json:"contact_id"`
	ContactName      string          `json:"contact_name"`
	Kind             DocflowFlowKind `json:"kind"`
	Direction        string          `json:"direction"`
	Status           string          `json:"status"`
	// ArchivedFrom — Из какого состояния бумага ушла в архив
	ArchivedFrom *string `json:"archived_from,omitempty"`
	Version      int64   `json:"version"`
	// IdentityEditable — Ложь означает: стороны и вид уже закреплены редакцией или связью и не меняются
	IdentityEditable bool                        `json:"identity_editable"`
	Content          DocflowFlowContent          `json:"content"`
	Files            []DocflowFlowFile           `json:"files,omitempty"`
	Relations        []DocflowFlowRelation       `json:"relations,omitempty"`
	AccountingLinks  []DocflowFlowAccountingLink `json:"accounting_links,omitempty"`
	// CommercialTax — Только в ответе чтения карточки: вычисленные суммы НДС строк из источника печати. В редакцию документа не записываются
	CommercialTax []DocflowFlowCommercialTaxLine `json:"commercial_tax,omitempty"`
	Edo           *DocflowFlowEDOState           `json:"edo,omitempty"`
	// EdoLinks — Конверты, которыми карточка уходила и приходила. Заполняется только при чтении карточки и в редакцию не пишется: связь живёт своей строкой, её правит синхронизация, а редакция неизменяема
	EdoLinks []DocflowFlowEDOLink `json:"edo_links,omitempty"`
	// Gaps — Чего карточке не хватает до полноты: содержательного файла, подтверждённой суммы, срока действия (последний — только у договора и дополнительного соглашения). Считается при чтении одной карточки и в редакцию не пишется. Пустой список у карточки из ЭДО означает, что приёмка зарегистрировала её сразу; непустой — что карточка осталась черновиком и ждёт подтверждения человека.
	Gaps      []string `json:"gaps,omitempty"`
	CreatedAt string   `json:"created_at"`
	UpdatedAt string   `json:"updated_at"`
	UpdatedBy int64    `json:"updated_by"`
}

// DocflowFlowEDOAttachment — Файл конверта глазами карточки: чем оператор его назвал, чем он является, сколько весит и есть ли он у нас. Скачивается адресом вложения пакета.
type DocflowFlowEDOAttachment struct {
	ID      UUID   `json:"id"`
	Message UUID   `json:"message"`
	Name    string `json:"name"`
	// Kind — document, title либо пусто
	Kind        string `json:"kind"`
	ContentType string `json:"content_type"`
	SizeBytes   int64  `json:"size_bytes"`
	// Stored — Байты скачаны в наше хранилище; ложь — файл пока живёт только у оператора
	Stored bool `json:"stored"`
}

// DocflowFlowEDOLink — Конверт, которым карточка уехала или пришла. Пакет — канал доставки, и здесь видно, чем карточка ему приходится и каким файлом она в нём поехала. Содержания конверта тут нет: за ним идут в сам пакет.
type DocflowFlowEDOLink struct {
	ID         UUID `json:"id"`
	Connection UUID `json:"connection"`
	// Message — Пакет у оператора; пусто при непустом external_doc_id означает черновик у оператора, наружу не ушедший
	Message *UUID `json:"message,omitempty"`
	// Role — Чем карточка приходится конверту: основной документ, приложение или основание
	Role string `json:"role"`
	// File — Какой файл карточки уехал вложением
	File *UUID `json:"file,omitempty"`
	// ExternalDocID — Идентификатор документа у оператора
	ExternalDocID string `json:"external_doc_id"`
	// ExternalAttachmentID — Идентификатор вложения у оператора: им адресуется замена файла при повторной отправке
	ExternalAttachmentID *string `json:"external_attachment_id,omitempty"`
	// Draft — Черновик, который ещё можно удалить у оператора
	Draft bool `json:"draft"`
	// Direction — Слова оператора о самом пакете, собранные при чтении карточки
	Direction string `json:"direction"`
	Number    string `json:"number"`
	Date      string `json:"date"`
	StateCode string `json:"state_code"`
	StateName string `json:"state_name"`
	// Attachments — Содержательные файлы конверта, показанные в карточке ссылкой, а не копией: байты лежат в хранилище кабинета один раз. Извещений здесь нет. Заполняется только при чтении одной карточки
	Attachments []DocflowFlowEDOAttachment `json:"attachments,omitempty"`
	CreatedBy   *int64                     `json:"created_by,omitempty"`
	CreatedAt   string                     `json:"created_at"`
}

// DocflowFlowEDOState — Ответ контрагента по документу, как его понимает карточка: подписал, отказал или аннулировали по соглашению сторон. Пересказа состояний оператора здесь нет — регламентов у него десятки, и свой словарь на них отстал бы от первой же правки закона. Живёт в редакции карточки и поэтому попадает в её историю сам.
type DocflowFlowEDOState struct {
	Message UUID `json:"message"`
	// Outcome — Подписал, отказал (отклонение либо уведомление об уточнении) или аннулирован по соглашению сторон
	Outcome string `json:"outcome"`
	// StateName — Состояние словами оператора: показывается как есть, человек сверяет его с кабинетом оператора
	StateName *string `json:"state_name,omitempty"`
	// OccurredAt — Когда это случилось у оператора
	OccurredAt string `json:"occurred_at"`
}

// DocflowFlowFile — Приложенный файл. Всё это описание делает владелец при загрузке, и командой правки оно не принимается.
type DocflowFlowFile struct {
	ID   UUID   `json:"id"`
	Name string `json:"name"`
	// Size — Байт; не больше 26214400
	Size        int64  `json:"size"`
	Sha256      string `json:"sha256"`
	ContentType string `json:"content_type"`
	UploadedBy  int64  `json:"uploaded_by"`
	UploadedAt  string `json:"uploaded_at"`
	// ScanStatus — Вердикт антивируса у файла, пришедшего сессией загрузки; у файла формы поля нет
	ScanStatus *string `json:"scan_status,omitempty"`
}

type DocflowFlowKind = string

// DocflowFlowOriginal — Сканы подписанного оригинала документа.
type DocflowFlowOriginal struct {
	DocumentID UUID                      `json:"document_id"`
	Scans      []DocflowFlowOriginalScan `json:"scans"`
}

// DocflowFlowOriginalScan — Скан подписанного оригинала; номер скана из сессии загрузки — номер сессии.
type DocflowFlowOriginalScan struct {
	ID          UUID   `json:"id"`
	DocumentID  UUID   `json:"document_id"`
	Name        string `json:"name"`
	Size        int64  `json:"size"`
	Sha256      string `json:"sha256"`
	ContentType string `json:"content_type"`
	UploadedBy  int64  `json:"uploaded_by"`
	UploadedAt  string `json:"uploaded_at"`
}

// DocflowFlowPage — Страница карточек. Набор строк называется items — как у остальных страниц этого крыла; крыло обмена с контрагентами в том же модуле исторически называет его results.
type DocflowFlowPage struct {
	Items   []DocflowFlowDocument `json:"items"`
	HasMore bool                  `json:"has_more"`
	// StateCounts — Только по запросу with=counts. Сколько карточек в каждой пилюле списка договоров при прочих отборах: expiring входит в active, а удалённые не считаются нигде.
	StateCounts *DocflowFlowPageStateCounts `json:"state_counts,omitempty"`
}

// DocflowFlowPageStateCounts — Только по запросу with=counts. Сколько карточек в каждой пилюле списка договоров при прочих отборах: expiring входит в active, а удалённые не считаются нигде.
type DocflowFlowPageStateCounts struct {
	Draft    int64 `json:"draft"`
	Active   int64 `json:"active"`
	Expiring int64 `json:"expiring"`
	Expired  int64 `json:"expired"`
	Archived int64 `json:"archived"`
}

// DocflowFlowPaymentRule — Регулярный график оплат одним правилом: сумма платежа, период, день, начало и ровно одно из трёх окончаний — число платежей, последняя дата или open («пока действует договор»). Сервер раскрывает правило в строки payments сам; план финансов и расчёты видят только строки, как при ручном графике. При названной сумме платежа сумма документа (commercial.amount) может быть пустой: с count или until она вычисляется как N × платёж, с open её нет вовсе. Бессрочное правило раскрывается на горизонт в 12 ближайших платежей — это план, а не весь договор.
type DocflowFlowPaymentRule struct {
	// Amount — Сумма одного платежа десятичным текстом; пусто — сумма документа делится поровну. Обязательна, когда суммы документа нет
	Amount *string `json:"amount,omitempty"`
	Period string  `json:"period"`
	// Day — День месяца (month, quarter; короткий месяц прижимает к своему концу) или день недели ISO 1..7 (week)
	Day int64 `json:"day"`
	// Start — Первый платёж — ближайшая дата не раньше этой
	Start string `json:"start"`
	// Count — Число платежей; задаётся вместо until
	Count *int64 `json:"count,omitempty"`
	// Until — Последняя допустимая дата включительно; задаётся вместо count
	Until *string `json:"until,omitempty"`
	// Open — Пока действует договор: окончания нет, итога нет, раскрываются ближайшие 12 платежей
	Open   *bool                         `json:"open,omitempty"`
	Orders *DocflowFlowPaymentRuleOrders `json:"orders,omitempty"`
}

// DocflowFlowPaymentRuleOrders — «Заводить продажу или закупку на каждый период» — только у договора (kind=contract). Зарегистрированный договор сам заводит на каждую наступившую стадию правила подтверждённый продажу или закупку ядра (source_kind=contract, external_id «<id договора>/<период>»): сразу после регистрации и фоновым проходом раз в час. Один договор и один период — один продажа или закупка навсегда: отменённый не воскресает, период не позже последнего продажи или закупки договора не заводится. Будущие периоды не заводятся; исполнение и бумаги периода — вручную.
type DocflowFlowPaymentRuleOrders struct {
	// From — Первый период: стадии раньше этой даты продаж или закупок не получают. Пусто — с начала правила, прошедшие периоды догоняются
	From *string `json:"from,omitempty"`
	// ProductID — Услуга строки продажи или закупки — активная номенклатура вида service; пусто — строка без номенклатуры, названная предметом договора
	ProductID *UUID `json:"product_id,omitempty"`
	// ProductName — Название услуги на момент выбора; пишет сервер, присланное не читается
	ProductName *string `json:"product_name,omitempty"`
}

// DocflowFlowRecognized — Прочитанное машиной из файла карточки — НА ПРОВЕРКУ. Живёт отдельно от условий договора: в условия сумма и срок попадают только рукой человека. Пустое поле означает «не прочиталось», а не ноль. Приёмка входящего договора в PDF заполняет его текстом бумаги.
type DocflowFlowRecognized struct {
	// Source — Имя вложения словами оператора: по нему человек откроет ту же бумагу и сверит
	Source *string `json:"source,omitempty"`
	// Amount — Десятичная строка
	Amount     *string `json:"amount,omitempty"`
	Currency   *string `json:"currency,omitempty"`
	ValidFrom  *string `json:"valid_from,omitempty"`
	ValidUntil *string `json:"valid_until,omitempty"`
}

// DocflowFlowRelation — Связь между бумагами кабинета — основание, приложение, изменение или замена. Учётной инструкцией она не является.
type DocflowFlowRelation struct {
	ID       UUID   `json:"id"`
	Kind     string `json:"kind"`
	TargetID UUID   `json:"target_id"`
	// TargetVersion — Закреплённая редакция другой бумаги
	TargetVersion int64 `json:"target_version"`
}

type DocflowFlowRelationInput struct {
	Kind          string `json:"kind"`
	TargetID      UUID   `json:"target_id"`
	TargetVersion int64  `json:"target_version"`
}

// DocflowFlowResponsible — Ответственный сотрудник договора и его доля в процентах.
type DocflowFlowResponsible struct {
	EmployeeID string `json:"employee_id"`
	// Share — Доля в процентах десятичным текстом
	Share string `json:"share"`
}

// DocflowFlowScheduleStage — Плановая сумма этапа работ или платежа. Ни выполнения, ни оплаты она не утверждает — это то, о чём договорились.
type DocflowFlowScheduleStage struct {
	ID    UUID    `json:"id"`
	Label *string `json:"label,omitempty"`
	Date  *string `json:"date,omitempty"`
	// Amount — Десятичным текстом, не числом с плавающей точкой
	Amount string `json:"amount"`
	// DueTrigger — Чем открывается срок платежа: датой или закрытием этапа
	DueTrigger   *string `json:"due_trigger,omitempty"`
	AfterStageID *UUID   `json:"after_stage_id,omitempty"`
	// DelayDays — Дней после события срока
	DelayDays *int64 `json:"delay_days,omitempty"`
}

// DocflowFlowUploadRequest — Заявка на сессию загрузки файла в документ.
type DocflowFlowUploadRequest struct {
	// ExpectedVersion — Ожидаемая версия документа
	ExpectedVersion int64 `json:"expected_version"`
	ReplaceID       *UUID `json:"replace_id,omitempty"`
	// Name — Имя файла с расширением, без пути
	Name     string  `json:"name"`
	MimeType *string `json:"mime_type,omitempty"`
	// SizeBytes — Точный размер файла в байтах
	SizeBytes int64 `json:"size_bytes"`
	// Sha256 — Необязательная контрольная сумма SHA-256 строчными шестнадцатеричными знаками
	Sha256 *string `json:"sha256,omitempty"`
}

// DocflowFlowUploadResult — Документ после приложения файла и номер этого файла.
type DocflowFlowUploadResult struct {
	Document DocflowFlowDocument `json:"document"`
	FileID   UUID                `json:"file_id"`
}

// DocflowIntakeCounterparty — Вторая сторона и то, с кем мы её свели. Порядок узнавания жёсткий, и каждая ступень сильнее следующей: решение человека этим же запросом, сопоставление зеркала пакета, ЗАПИСАННОЕ решение по этому участнику обмена и, наконец, поиск в справочнике по ИНН и КПП. Последняя ступень — догадка, и она называет себя догадкой (match: guess), а не выдаёт себя за чьё-то решение. Разбор у неё общий с автоматчем выгрузок: второй механизм узнавания рядом с существующим разошёлся бы с ним на первой же правке — молча и в пользу дубля. Неоднозначность не разрешается никогда: ИНН, совпавший у двух юрлиц, которых не развёл КПП, уходит человеку списком options.
type DocflowIntakeCounterparty struct {
	// Contact — Карточка контрагента кабинета; null — свести не с кем, и приёмка отвечает проверкой docflow.edo.contact_required
	Contact *UUID `json:"contact"`
	// ContactName — Имя этой карточки в кабинете
	ContactName string `json:"contact_name"`
	// Name — Имя стороны словами оператора либо файла продавца
	Name string `json:"name"`
	INN  string `json:"inn"`
	KPP  string `json:"kpp"`
	// Match — Откуда взялся контрагент: manual — решение человека, auto — записанное сопоставление, guess — наша догадка по реквизитам прямо сейчас, нигде не записанная, none — не свели ни с кем
	Match string `json:"match"`
	// Options — Наши контрагенты с тем же ИНН, когда выбрать между ними обязан человек. Непустой список означает «такие у нас уже есть, выбери» — и потому же означает, что заводить нового НЕ НАДО: там, где контрагент с такими реквизитами уже заведён, место кнопке «связать с существующим», а не «завести».
	Options []DocflowIntakeCounterpartyOption `json:"options,omitempty"`
}

// DocflowIntakeCounterpartyOption — Один наш контрагент на выбор человеку. КПП здесь не для полноты: он единственное, чем два юрлица с одним ИНН различаются.
type DocflowIntakeCounterpartyOption struct {
	ID   UUID   `json:"id"`
	Name string `json:"name"`
	KPP  string `json:"kpp"`
}

// DocflowIntakeLine — Строка товарной таблицы чужого документа вместе с тем, что мы про неё предлагаем. Числа остаются СТРОКАМИ ровно так, как их написал поставщик: сумма в чужом документе такая, какую он подписал, и наша задача её донести, а не поправить. Расхождения покажет сверка, а не молчаливое округление.
type DocflowIntakeLine struct {
	// Number — Номер строки в файле поставщика. По нему человек соотносит экран с бумагой, и по нему же приходит его решение
	Number int64 `json:"number"`
	// Name — Наименование товара словами поставщика
	Name string `json:"name"`
	// Article — Артикул поставщика
	Article string `json:"article"`
	// Code — Код товара у поставщика
	Code string `json:"code"`
	// UnitCode — Код ОКЕИ единицы измерения
	UnitCode string `json:"unit_code"`
	UnitName string `json:"unit_name"`
	Quantity string `json:"quantity"`
	// Price — Цена единицы словами поставщика
	Price            string `json:"price"`
	AmountWithoutVAT string `json:"amount_without_vat"`
	// VATRate — Ставка налога словами файла
	VATRate string `json:"vat_rate"`
	// VATAmount — Сумма налога. Пуста при отметке «без НДС»: нуля там нет, и подставить его значит превратить необлагаемую поставку в облагаемую с нулевым налогом
	VATAmount string `json:"vat_amount"`
	// VATWithout — Отметка «без НДС» у строки
	VATWithout    bool   `json:"vat_without"`
	AmountWithVAT string `json:"amount_with_vat"`
	// Key — Ключ соответствия: то, по чему эта строка узнаётся в СЛЕДУЮЩЕМ документе того же поставщика. Собирается с приставкой вида `арт:`, `код:` или `наим:` — артикул «100» и наименование «100» разные вещи, и без приставки они стали бы одной строкой соответствий. Показывается затем, чтобы человек понимал, что именно он сопоставляет: не эту накладную, а артикул поставщика на все будущие поставки.
	Key string `json:"key"`
	// Product — Номенклатура кабинета; null — не выбрана
	Product *UUID `json:"product"`
	// ProductName — Имя выбранной карточки. Подсказка, а не реквизит: карточку могли заархивировать
	ProductName string `json:"product_name"`
	// Match — Откуда взялась номенклатура строки. `manual` — сопоставил человек, `auto` — сопоставила машина и решение записано, `rejected` — человек уже посмотрел и сказал «не это» (догадку по такой строке мы больше не показываем), `guess` — наша догадка ПРЯМО СЕЙЧАС, нигде не записанная, `none` — сопоставить не с чем. Записанное соответствие приносит свой способ из справочника внешних ссылок, поэтому здесь встречаются и его значения (`pending`, `import`). Различать обязательно: на экране «это решил человек» и «это мы угадали» выглядят одинаково — одна строка с названием товара, — а значат противоположное.
	Match string `json:"match"`
	// Options — С чем ещё эта строка могла совпасть. Непусто только у неоднозначной догадки: выбрать за человека из двух одинаково подходящих товаров значит угадать монеткой и записать это как факт
	Options []DocflowIntakeProductOption `json:"options,omitempty"`
}

// DocflowIntakeParty — Сторона сделки, прочитанная из чужого файла. Показывается ТЕКСТОМ, даже когда контрагент сопоставлен: карточку могут переименовать, а документ обязан остаться читаемым таким, каким его прислали.
type DocflowIntakeParty struct {
	// Kind — Вид участника словами файла: юридическое лицо, предприниматель, иностранное лицо, физическое лицо
	Kind string `json:"kind"`
	Name string `json:"name"`
	INN  string `json:"inn"`
	KPP  string `json:"kpp"`
	// Address — Адрес одной строкой, собранный из частей формата
	Address string `json:"address"`
}

// DocflowIntakePnlItem — Подсказка статьи расходов первого акта закупки (ERP-1810), по порядку: статья закупки, статья оплаты закупки или её счёта, статья последнего акта этого поставщика, правило разнесения контрагента. Только расходная статья ОПиУ в обращении.
type DocflowIntakePnlItem struct {
	ID UUID `json:"id"`
	// Name — Название статьи — так, как его назвал кабинет
	Name string `json:"name"`
	// Source — Откуда подсказка: order — статья закупки; payment — статья её оплаты или оплаты её счёта; last_act — статья последнего акта поставщика; rule — правило разнесения контрагента
	Source *string `json:"source,omitempty"`
}

// DocflowIntakePreview — Что мы предлагаем принять к учёту. Ничего не меняет и никуда не ходит: предложение обязано быть безопасным, иначе «посмотреть, что там» становится действием с последствиями, и человек побоится его открыть раньше, чем решит принимать.
type DocflowIntakePreview struct {
	Message UUID `json:"message"`
	// Formalized — Нашёлся ли во вложениях титул продавца. Ложь означает, что принимать нечего: пакет либо неформализованный, либо файлы ещё не скачаны — чинится это синхронизацией, а не заполнением формы
	Formalized bool `json:"formalized"`
	// Ready — Принимается ли пакет прямо сейчас, без правок
	Ready bool `json:"ready"`
	// FlowCardKind — Вид карточки документооборота, которую заведёт приёмка; пусто — карточки по этому пакету не будет. Читается вместе с formalized: непустой вид при formalized = false означает «учётного документа не будет, карточка будет», и приёмка по такому пакету осмысленна. Договор формализованным титулом не бывает по определению — его присылают подписанным PDF, — поэтому кнопку приёмки на нём гасить нельзя, её следует назвать «Завести карточку».
	FlowCardKind string `json:"flow_card_kind"`
	// Accepted — Учётный документ, если пакет уже принят; иначе null. Показывается вместо повторной приёмки: второй документ по тому же пакету — это задвоенный приход и задвоенный долг перед поставщиком.
	Accepted     *DocflowAcceptedDocument  `json:"accepted"`
	Source       DocflowIntakeSource       `json:"source"`
	Counterparty DocflowIntakeCounterparty `json:"counterparty"`
	// Lines — Товарная таблица чужого документа вместе с тем, что мы про неё предлагаем. Всегда массив, даже пустой
	Lines  []DocflowIntakeLine `json:"lines"`
	Totals DocflowIntakeTotals `json:"totals"`
	// Issues — Что мешает принять. Тот же тип и тот же порядок, что у предполётной проверки исходящего документа: интерфейс переводит их одним словарём
	Issues []DocflowIssue `json:"issues"`
	// ExecutesOrder — Бумага закрывающая (УПД, акт, накладная поставщика): приёмка с закупкой проводит её исполнение — акт поставщика по заказу, без ВХ и без разнесения (ERP-1810). Строки без номенклатуры этот путь не держат: акт исполняет строки заказа
	ExecutesOrder *bool `json:"executes_order,omitempty"`
	// Purchases — Подбор закупки для «Куда в учёт» (ERP-1810): закупка, в которой бумага уже лежит (linked), открытые закупки того же поставщика и юрлица с остатком, равным сумме бумаги (amount), затем прочие, куда она помещается (open). Пусто у счёта и договора и когда закупок нет
	Purchases []DocflowIntakePurchase `json:"purchases,omitempty"`
	// Warehouses — Действующие склады для выбора склада приёмки (ERP-1810). Приходят, когда в подборе есть закупка с товаром при включённом складе; выбирать склад нужно, только если у закупки goods = true нет warehouse_id
	Warehouses []DocflowIntakeWarehouse `json:"warehouses,omitempty"`
}

// DocflowIntakeProductOption — Вариант номенклатуры, предложенный неоднозначной строке.
type DocflowIntakeProductOption struct {
	ID   UUID   `json:"id"`
	Name string `json:"name"`
	SKU  string `json:"sku"`
}

// DocflowIntakePurchase — Закупка, исполнением которой можно принять закрывающую бумагу поставщика (ERP-1810).
type DocflowIntakePurchase struct {
	OrderID UUID `json:"order_id"`
	// Number — Номер закупки
	Number string  `json:"number"`
	Title  *string `json:"title,omitempty"`
	// Date — Дата закупки ГГГГ-ММ-ДД
	Date *string `json:"date,omitempty"`
	// Amount — Заказано
	Amount string `json:"amount"`
	// Remaining — Осталось исполнить: заказано минус проведённые исполнения
	Remaining string  `json:"remaining"`
	Currency  *string `json:"currency,omitempty"`
	// ContractNumber — Договор закупки
	ContractNumber *string `json:"contract_number,omitempty"`
	// Reason — Почему предложена: linked — бумага уже лежит в ней; amount — остаток равен сумме бумаги; open — бумага помещается в остаток
	Reason string `json:"reason"`
	// PNLItemRequired — Первому акту этой закупки нужна статья расходов: у закупки её нет, а операции заказа в финансах ещё нет. Приёмка без pnl_item_id ответит 409 docflow.edo.intake_pnl_item_required
	PNLItemRequired  *bool                 `json:"pnl_item_required,omitempty"`
	SuggestedPNLItem *DocflowIntakePnlItem `json:"suggested_pnl_item,omitempty"`
	// Goods — В закупке товар, и склад включён (ERP-1810): строки бумаги на товар закупки «Принять к учёту» заводит черновиком приёмки склада по закупке (проводит его склад), строки на услуги — актом поставщика
	Goods *bool `json:"goods,omitempty"`
	// WarehouseID — Склад приёмки товара: склад закупки, иначе склад по умолчанию юрлица. Нет при goods = true — склад выбирают из warehouses предложения и присылают полем warehouse_id приёмки
	WarehouseID *UUID `json:"warehouse_id,omitempty"`
	// WarehouseName — Название склада приёмки
	WarehouseName *string `json:"warehouse_name,omitempty"`
}

// DocflowIntakeSource — Реквизиты чужого файла обмена, из которого всё прочитано. Разбор частичный и ничего не проверяет: файл уже подписан и юридически значим, и отказать в его чтении из-за реквизита, который нам не нужен, значит потерять поставку из-за чужой ошибки в необязательном поле.
type DocflowIntakeSource struct {
	Attachment UUID `json:"attachment"`
	// AttachmentName — Как это вложение назвал ОПЕРАТОР. Стоит рядом с file_name намеренно: имя оператора («Счёт-фактура № 12») человек видит в списке вложений, а file_name — имя файла обмена, и это разные строки
	AttachmentName string `json:"attachment_name"`
	// FileName — ИдФайл: имя файла обмена без расширения, как его записал продавец
	FileName string `json:"file_name"`
	// FormatVersion — ВерсФорм: редакция формата словами самого файла
	FormatVersion string `json:"format_version"`
	// Knd — Код документа по классификатору; у титула продавца 1115131
	Knd string `json:"knd"`
	// Function — Функция документа словами продавца: СЧФ, ДОП, СЧФДОП
	Function string `json:"function"`
	// DocumentKindName — Наименование документа, данное ему составителем
	DocumentKindName string `json:"document_kind_name"`
	// Number — Номер документа продавца
	Number string `json:"number"`
	// Date — Дата документа в форме ГГГГ-ММ-ДД. Пусто — дата не разобралась
	Date string `json:"date"`
	// DateRaw — Она же в форме поставщика ДД.ММ.ГГГГ. Показывается, когда разбор не удался: чужую опечатку человек поймёт быстрее, чем пустое поле
	DateRaw string `json:"date_raw"`
	// Currency — Валюта документа наименованием и кодом, словами файла
	Currency string `json:"currency"`
	// Operation — Содержание операции словами продавца
	Operation string             `json:"operation"`
	Seller    DocflowIntakeParty `json:"seller"`
	Buyer     DocflowIntakeParty `json:"buyer"`
}

// DocflowIntakeTotals — Итоги таблицы словами поставщика. Мы их не пересчитываем: итог в чужом документе такой, какой он подписал.
type DocflowIntakeTotals struct {
	WithoutVAT string `json:"without_vat"`
	// VATAmount — Пусто при отметке «без НДС» у документа
	VATAmount string `json:"vat_amount"`
	WithVAT   string `json:"with_vat"`
	// VATWithout — Отметка «без НДС» у документа целиком
	VATWithout bool `json:"vat_without"`
}

// DocflowIntakeWarehouse — Склад, на который можно принять товар закупки (ERP-1810).
type DocflowIntakeWarehouse struct {
	ID UUID `json:"id"`
	// Name — Название склада
	Name string `json:"name"`
}

// DocflowIssue — Одна невыполненная проверка. Форма одна на сборку файла формата ФНС и на приёмку входящего документа к учёту: интерфейс переводит их одним словарём, и вторая форма списка означала бы второй словарь. Ни одной надписи для человека здесь нет: код, путь реквизита и подробности значениями — фразу собирает интерфейс, и собирает её на языке читателя.
type DocflowIssue struct {
	// Code — Машинный код проверки. Стабилен: по нему интерфейс ищет перевод. Проверки формата приходят кодами docflow.formats.* (required, too_long, too_short, pattern, not_allowed, not_a_number, negative, too_many_decimals, too_many_digits, not_encodable, conflict, no_lines, unsupported), а перевод учётного документа в титул добавляет свои — docflow.edo.counterparty_required (в документе не указан контрагент) и docflow.edo.seller_title_missing (во входящем пакете нет формализованного документа продавца: отвечать титулом покупателя не на что, а принимать к учёту нечего). Приёмка к учёту добавляет свои пять: docflow.edo.contact_required (не выбран контрагент), docflow.edo.date_unreadable (дата документа продавца не разобралась), docflow.edo.no_lines (в титуле продавца нет ни одной товарной строки), docflow.edo.product_required (строке документа не сопоставлена номенклатура) и docflow.edo.sign_first (документ ещё не подписан: в учёт его принимают после подписи)
	Code string `json:"code"`
	// Path — Путь до реквизита ИМЕНАМИ ФНС — именами приказа, а не нашими: этими же словами человек будет искать требование в письме налоговой. Например `Документ/СвСчФакт/СвПрод/Адрес`.
	Path string `json:"path"`
	// Line — Номер товарной строки с единицы. Отсутствует, когда реквизит не про строку
	Line *int64 `json:"line,omitempty"`
	// Params — Подробности значениями: предел длины, перечень допустимых значений, пришедшее значение. Отсутствует, когда проверке нечего добавить.
	Params map[string]string `json:"params,omitempty"`
}

// DocflowMessage — Пакет документов у оператора — конверт, а не учётный документ Акеды.
type DocflowMessage struct {
	ID         UUID `json:"id"`
	Connection UUID `json:"connection"`
	// ExternalID — Идентификатор пакета у оператора
	ExternalID string `json:"external_id"`
	// ExternalRevision — Редакция пакета: оператор меняет содержимое конверта, не меняя его идентификатор
	ExternalRevision string `json:"external_revision"`
	Direction        string `json:"direction"`
	// DocType — Слова оператора, а не наша классификация
	DocType       string `json:"doc_type"`
	DocSubtype    string `json:"doc_subtype"`
	DocRegulation string `json:"doc_regulation"`
	Number        string `json:"number"`
	// Date — Календарная дата документа ГГГГ-ММ-ДД; пусто означает, что даты нет вовсе
	Date string `json:"date"`
	// Amount — Сумма строкой ровно так, как её прислал оператор; пусто означает «суммы нет», а не ноль
	Amount       string              `json:"amount"`
	Currency     string              `json:"currency"`
	Counterparty DocflowCounterparty `json:"counterparty"`
	// StateCode — Код состояния документооборота у оператора
	StateCode string `json:"state_code"`
	// StateName — Состояние словами оператора: своего перевода состояний у нас нет и быть не должно
	StateName          string  `json:"state_name"`
	OurOrgExternalID   string  `json:"our_org_external_id"`
	ReceivedAt         *string `json:"received_at,omitempty"`
	CreatedAt          string  `json:"created_at"`
	UpdatedAt          string  `json:"updated_at"`
	ConnectionName     string  `json:"connection_name"`
	ConnectionProvider string  `json:"connection_provider"`
	Company            *UUID   `json:"company,omitempty"`
	CompanyName        string  `json:"company_name"`
	AttachmentsTotal   int64   `json:"attachments_total"`
	SignaturesTotal    int64   `json:"signatures_total"`
	// ActionsDue — Сколько незакрытых этапов у пакета. Ноль означает «ход не за нами»
	ActionsDue int64 `json:"actions_due"`
	// StageName — Название ближайшего незакрытого этапа словами оператора
	StageName string `json:"stage_name"`
	// SignRequired — У пакета открыт этап, который закрывается нашей подписью под самим документом. Отдельно от actions_due и stage_name: счётчик говорит «ход за нами», а название этапа — слова оператора, и отличить по ним подпись от согласования нельзя. Пока признак поднят, приёмка к учёту отказывает кодом docflow.edo.sign_first
	SignRequired bool `json:"sign_required"`
	// NoticeSignRequired — Открытый подписной этап служебный: извещение о получении, подтверждение даты, квитанция. Отдельным признаком, потому что человеку это другое дело — «Подписать извещение» подтверждает технологию обмена, а не содержание документа. Приёмку к учёту служебный этап НЕ держит
	NoticeSignRequired bool `json:"notice_sign_required"`
	// Attachments — Состав пакета. Наполняется ТОЛЬКО в карточке одного пакета; в списке остаётся null. null означает «не спрашивали», пустой массив — «спросили, и там пусто»
	Attachments []DocflowAttachment `json:"attachments,omitempty"`
	Signatures  []DocflowSignature  `json:"signatures,omitempty"`
	Stages      []DocflowStage      `json:"stages,omitempty"`
	Events      []DocflowEvent      `json:"events,omitempty"`
	// FlowDocuments — Карточки документооборота, которые вёз этот конверт. Как и весь состав, наполняется ТОЛЬКО в карточке одного пакета; в списке остаётся null
	FlowDocuments []DocflowMessageFlowLink `json:"flow_documents,omitempty"`
	// Cancellation — Соглашение сторон об аннулировании. Наполняется ТОЛЬКО в карточке одного пакета; в списке остаётся null — null означает «не спрашивали»
	Cancellation *DocflowCancellation `json:"cancellation,omitempty"`
	// AccountingDocument — Учётный документ, которым пакет принят к учёту. Пусто означает «не принимали» и делает пакет принимаемым; обнулиться поле может и после приёмки, когда учётный документ удалили
	AccountingDocument *UUID `json:"accounting_document,omitempty"`
	// AcceptedAt — Когда пакет приняли к учёту. Переживает удаление учётного документа: приёмка была
	AcceptedAt *string `json:"accepted_at,omitempty"`
	// AcceptedBy — Кто принял пакет к учёту
	AcceptedBy *int64 `json:"accepted_by,omitempty"`
	// AccountingNumber — Номер учётного документа приёмки для строки «В учёте: … № …»; пусто — не принят или документ не прочитан
	AccountingNumber *string `json:"accounting_number,omitempty"`
	// AccountingType — Вид учётного документа приёмки (ключ вида документа ядра), например finance_purchase
	AccountingType *string `json:"accounting_type,omitempty"`
	// Draft — Пакет записан оператору и наружу ещё не ушёл. Выводится из состава пакета при чтении: исходящий, без единого события обмена и без единой подписи
	Draft bool `json:"draft"`
	// DeletedAt — Корзина НАШЕГО зеркала: контрагент её не видит, и пакет у оператора остаётся прежним
	DeletedAt *string `json:"deleted_at,omitempty"`
	DeletedBy *int64  `json:"deleted_by,omitempty"`
	// DeletedReason — Возвращают из корзины только trashed: у draft_removed документа у оператора больше нет
	DeletedReason string             `json:"deleted_reason"`
	Recognized    *DocflowRecognized `json:"recognized,omitempty"`
	// Payment — Что стало с оплатой этого счёта. Приходит И В СПИСКЕ, в отличие от состава пакета: состояние оплаты — ровно то, что человек читает глазами в каждой строке. Считает его модуль finance (счета, выписки и расчёты) одним запросом на всю страницу. null означает «этот счёт никто не оплачивает»: ни заведённой заявки, ни платежа, — именно там и остаётся кнопка «Отправить в оплату».
	Payment *DocflowMessagePayment `json:"payment,omitempty"`
	// Viewed — Открывал ли карточку пакета текущий сотрудник — личная отметка, а не состояние у оператора. Считается в ленте одним запросом на страницу; карточка отдаёт false, потому что её открытие само ставит отметку дверью viewed.
	Viewed        bool                 `json:"viewed"`
	StateCategory DocflowStateCategory `json:"state_category"`
	// OperatorLink — Карточка документа в кабинете нашей организации у оператора («СсылкаДляНашаОрганизация»); пусто, пока карточку не перечитали
	OperatorLink string `json:"operator_link"`
	// PrintForm — Печатный вид пакета (GET .../print); null — показать нечего
	PrintForm *DocflowMessagePrintForm `json:"print_form"`
}

// DocflowMessageFlowLink — Карточка документооборота в пакете — обратная сторона связи edo_links карточки. Пакет доказывает отправку и подпись, а содержание живёт в карточке; здесь видно, чьё содержание он вёз и чем карточка ему приходится.
type DocflowMessageFlowLink struct {
	ID       UUID `json:"id"`
	Document UUID `json:"document"`
	// Role — Чем карточка приходится конверту: основной документ, приложение или основание
	Role string `json:"role"`
	// Version — Текущая редакция карточки: открывать человеку следует её
	Version   int64           `json:"version"`
	Kind      DocflowFlowKind `json:"kind"`
	Status    string          `json:"status"`
	Title     string          `json:"title"`
	Number    string          `json:"number"`
	Date      string          `json:"date"`
	CreatedAt string          `json:"created_at"`
}

type DocflowMessageList struct {
	Count   int64            `json:"count"`
	Results []DocflowMessage `json:"results"`
}

// DocflowMessagePayment — Состояние оплаты входящего счёта. Два состояния, а не шесть: путь заявки внутри финансов подробнее (план, отправлена, ждёт подписи, исполнена, отклонена, отменена), но ленте нужен ответ на один вопрос — деньги уже ушли или ещё нет. Оплаченным платёж делает ВЫПИСКА, а не наша кнопка и не слово банка: «отправлено в банк» означает лишь, что платёжка легла в интернет-банк на подпись.
type DocflowMessagePayment struct {
	// State — requested — заявка заведена, денег ещё нет; paid — платёж подтверждён выпиской
	State   string `json:"state"`
	Request UUID   `json:"request"`
	// Number — Номер заявки на оплату словами для человека
	Number *string `json:"number,omitempty"`
	// PaidOn — Дата оплаты из выписки в форме ГГГГ-ММ-ДД. Заполнена только у state=paid
	PaidOn *string `json:"paid_on,omitempty"`
	// Step — Шаг заявки словарём хода заявки «Документов»: до согласования — состояние документа заявки, после — строка очереди финансов
	Step *string `json:"step,omitempty"`
	// DocflowRequest — Заявка «Документов» по этому счёту, если она есть
	DocflowRequest map[string]json.RawMessage `json:"docflow_request,omitempty"`
	// Order — Счёт оплачен своей закупкой: заявки нет (request нулевой), оплата закупки покрывает сумму счёта
	Order map[string]json.RawMessage `json:"order,omitempty"`
}

// DocflowMessagePrintForm — Печатный вид пакета. operator — PDF оператора с впечатанными подписями, лежащий у нас; ours — наша форма счёта или УПД по формализованному XML, когда оператор своего вида не отдал (штампа подписи оператора на ней нет).
type DocflowMessagePrintForm struct {
	Source string `json:"source"`
	Size   int64  `json:"size"`
	// Revision — Редакция пакета, с которой снят PDF оператора
	Revision  string `json:"revision"`
	FetchedAt string `json:"fetched_at"`
}

type DocflowOrderActInput struct {
	// Date — Дата акта; пусто — дата продажи или закупки
	Date *string `json:"date,omitempty"`
	// Number — Пусто — следующий номер счётчика актов
	Number *string `json:"number,omitempty"`
	Title  *string `json:"title,omitempty"`
	// Amount — Пусто — все услуги продажи или закупки; меньше — частичный акт суммой
	Amount *string `json:"amount,omitempty"`
}

type DocflowOrderDocumentSet struct {
	Members []DocflowOrderSetMember `json:"members"`
	Missing []string                `json:"missing"`
	Order   *DocflowOrderSetOrder   `json:"order,omitempty"`
	Basis   string                  `json:"basis"`
}

type DocflowOrderImport struct {
	ID         UUID    `json:"id"`
	ExternalID *string `json:"external_id,omitempty"`
	// Source — Пространство приложения, которое загружало
	Source  *string `json:"source,omitempty"`
	Outcome string  `json:"outcome"`
	// Reason — Машинный код отказа, например docflow.sale.contact_unknown
	Reason *string `json:"reason,omitempty"`
	// Detail — Причина отказа словами
	Detail  *string `json:"detail,omitempty"`
	OrderID *UUID   `json:"order_id,omitempty"`
	// Payload — Тело загрузки, как его прислали, — для повтора
	Payload   *string `json:"payload,omitempty"`
	CreatedAt string  `json:"created_at"`
}

type DocflowOrderImportPage struct {
	Results []DocflowOrderImport `json:"results"`
}

type DocflowOrderInvoiceInput struct {
	// DueDate — Оплатить до
	DueDate        string  `json:"due_date"`
	ExpectedUntil  *string `json:"expected_until,omitempty"`
	PaymentPurpose *string `json:"payment_purpose,omitempty"`
	// PaymentPurposeAuto — Собрать назначение платежа умолчанием
	PaymentPurposeAuto *bool `json:"payment_purpose_auto,omitempty"`
	// Amount — Пусто — на весь продажу или закупку; меньше — частичный счёт
	Amount *string `json:"amount,omitempty"`
	// Date — Дата счёта; пусто — дата продажи или закупки
	Date *string `json:"date,omitempty"`
	// Number — Пусто — следующий номер счётчика счетов
	Number *string `json:"number,omitempty"`
	Title  *string `json:"title,omitempty"`
	// PaymentTermID — Строка графика оплат продажи, по которой выставлен счёт: запоминается в счёте; чужая строка — 409 docflow.sale.payment_term_unknown
	PaymentTermID *UUID `json:"payment_term_id,omitempty"`
	// Draft — Сохранить черновиком вместо «Выставить»
	Draft *bool `json:"draft,omitempty"`
}

type DocflowOrderSetMember struct {
	ID         UUID    `json:"id"`
	Kind       string  `json:"kind"`
	Title      string  `json:"title"`
	Number     *string `json:"number,omitempty"`
	Date       *string `json:"date,omitempty"`
	Status     string  `json:"status"`
	Direction  string  `json:"direction"`
	Settlement *string `json:"settlement,omitempty"`
	Amount     *string `json:"amount,omitempty"`
	Currency   *string `json:"currency,omitempty"`
	DueDate    *string `json:"due_date,omitempty"`
	// PaymentPurpose — Назначение платежа, записанное на выданном счёте; только для invoice
	PaymentPurpose *string `json:"payment_purpose,omitempty"`
	// PaymentTermID — Строка графика оплат продажи, по которой выставлен счёт; только для invoice
	PaymentTermID *UUID `json:"payment_term_id,omitempty"`
	Self          *bool `json:"self,omitempty"`
	// PaidByOrder — Входящий счёт оплачен своей закупкой: оплата закупки комплекта покрывает его сумму
	PaidByOrder *bool `json:"paid_by_order,omitempty"`
}

type DocflowOrderSetOrder struct {
	ID       UUID    `json:"id"`
	Number   *string `json:"number,omitempty"`
	Title    string  `json:"title"`
	Date     *string `json:"date,omitempty"`
	Status   string  `json:"status"`
	Amount   *string `json:"amount,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Side     *string `json:"side,omitempty"`
	Self     *bool   `json:"self,omitempty"`
}

type DocflowOrderUPDInput struct {
	// Date — Дата УПД; пусто — дата продажи или закупки
	Date *string `json:"date,omitempty"`
	// Amount — Пусто — все услуги продажи или закупки; меньше — частичный УПД суммой
	Amount  *string `json:"amount,omitempty"`
	StageID *UUID   `json:"stage_id,omitempty"`
	// Function — Пусто — СЧФДОП
	Function *string `json:"function,omitempty"`
}

type DocflowPaymentRequestRoutePreview struct {
	Approval    bool    `json:"approval"`
	Required    bool    `json:"required"`
	Direct      bool    `json:"direct"`
	RouteID     *UUID   `json:"route_id,omitempty"`
	RouteName   *string `json:"route_name,omitempty"`
	Destination string  `json:"destination"`
}

// DocflowRecognized — Сумма и реквизиты, прочитанные ИЗ ФАЙЛА пакета, а не присланные оператором. Оператор присылает сумму отдельным реквизитом только у формализованных документов — УПД и счёта-фактуры; у счёта на оплату и договора она живёт внутри PDF. Поле стоит РЯДОМ с amount, а не вместо него: amount — слова оператора, по ним сверяют переписку спустя годы, и подменять их нашим чтением чужой бумаги нельзя. Разбор локальный и детерминированный: текстовый слой PDF, у скана — распознавание изображения; ни одной нейросети и ни одного обращения к платному справочнику. Строк товарной таблицы здесь нет: со скана они не восстанавливаются и фактом не выдаются.
type DocflowRecognized struct {
	// At — Когда разбирали. Пусто — попытки ещё не было; это не то же самое, что source=none («читали и брать оказалось нечего»)
	At *string `json:"at,omitempty"`
	// Source — Чем прочитано, и заодно насколько верить. title — подписанный файл обмена ФНС, проверять нечего; text — вытащено якорными правилами из чужой раскладки, и рядом со значением интерфейс ставит «проверьте»; none — читали и брать было нечего; пустая строка — разбора не было
	Source string `json:"source"`
	// Document — Имя вложения СЛОВАМИ ОПЕРАТОРА: по нему человек откроет ту же бумагу и сверит показанную цифру
	Document string `json:"document"`
	// Amount — Итог к оплате строкой, как и amount: через число с плавающей точкой здесь теряются копейки. Пустая строка — итог в бумаге не нашёлся
	Amount string `json:"amount"`
	// Currency — Валюта счёта, если бумага её назвала. Пусто означает «не сказано»: подставлять рубль молча нельзя
	Currency string `json:"currency"`
	Number   string `json:"number"`
	// Date — Дата документа в форме ГГГГ-ММ-ДД; пустая строка означает, что даты нет
	Date string `json:"date"`
}

type DocflowSalesOrder struct {
	ID                 UUID    `json:"id"`
	CompanyID          UUID    `json:"company_id"`
	ContactID          UUID    `json:"contact_id"`
	ContractDocumentID *UUID   `json:"contract_document_id,omitempty"`
	Number             *string `json:"number,omitempty"`
	Title              string  `json:"title"`
	Status             string  `json:"status"`
	StatusID           *UUID   `json:"status_id,omitempty"`
	// StatusName — Имя статуса, которое придумал кабинет
	StatusName *string                 `json:"status_name,omitempty"`
	FunnelID   *UUID                   `json:"funnel_id,omitempty"`
	Scenario   string                  `json:"scenario"`
	Steps      []string                `json:"steps"`
	Currency   string                  `json:"currency"`
	Manager    *string                 `json:"manager,omitempty"`
	Comment    *string                 `json:"comment,omitempty"`
	ExternalID *string                 `json:"external_id,omitempty"`
	Buyer      *DocflowSalesOrderBuyer `json:"buyer,omitempty"`
	// AcquiringAmount — Сколько подтвердил эквайринг — списания минус возвраты
	AcquiringAmount  *string                 `json:"acquiring_amount,omitempty"`
	OrderDate        *string                 `json:"order_date,omitempty"`
	ShipDate         *string                 `json:"ship_date,omitempty"`
	DueDate          *string                 `json:"due_date,omitempty"`
	Discount         *string                 `json:"discount,omitempty"`
	PricesIncludeVAT bool                    `json:"prices_include_vat"`
	Items            []DocflowSalesOrderItem `json:"items"`
	Amount           string                  `json:"amount"`
	GoodsAmount      string                  `json:"goods_amount"`
	ServiceAmount    string                  `json:"service_amount"`
	// PaidAmount — Сколько денег пришло на счёт по продаже или закупке
	PaidAmount      string  `json:"paid_amount"`
	ShippedAmount   string  `json:"shipped_amount"`
	InvoicedAmount  string  `json:"invoiced_amount"`
	ClosedAmount    string  `json:"closed_amount"`
	PaymentStatus   string  `json:"payment_status"`
	ShipmentStatus  string  `json:"shipment_status"`
	CompanyName     *string `json:"company_name,omitempty"`
	ContactName     *string `json:"contact_name,omitempty"`
	ContractTitle   *string `json:"contract_title,omitempty"`
	CompanyArchived *bool   `json:"company_archived,omitempty"`
	ContactArchived *bool   `json:"contact_archived,omitempty"`
	CreatedAt       string  `json:"created_at"`
	UpdatedAt       string  `json:"updated_at"`
}

// DocflowSalesOrderBuyer — Как покупатель представился в продаже или закупке
type DocflowSalesOrderBuyer struct {
	Name  *string `json:"name,omitempty"`
	Phone *string `json:"phone,omitempty"`
	Email *string `json:"email,omitempty"`
}

type DocflowSalesOrderItem struct {
	ID        UUID    `json:"id"`
	ProductID *UUID   `json:"product_id,omitempty"`
	Title     string  `json:"title"`
	Kind      string  `json:"kind"`
	Unit      *string `json:"unit,omitempty"`
	Quantity  string  `json:"quantity"`
	Price     string  `json:"price"`
	Discount  *string `json:"discount,omitempty"`
	VATRate   *string `json:"vat_rate,omitempty"`
	Position  int64   `json:"position"`
	Amount    *string `json:"amount,omitempty"`
}

type DocflowSalesOrderStatusInput struct {
	Status string `json:"status"`
}

// DocflowSignature — Подпись под вложением или под пакетом целиком. Подписей под одним файлом несколько — наша и контрагента, — и каждая приходит своим файлом со своим сертификатом.
type DocflowSignature struct {
	ID             UUID               `json:"id"`
	Message        UUID               `json:"message"`
	Attachment     *UUID              `json:"attachment,omitempty"`
	Side           string             `json:"side"`
	SignerName     string             `json:"signer_name"`
	SignerPosition string             `json:"signer_position"`
	Certificate    DocflowCertificate `json:"certificate"`
	// PoaNumber — Номер машиночитаемой доверенности. С 2023 года подпись сотрудника без неё недействительна
	PoaNumber string  `json:"poa_number"`
	SignedAt  *string `json:"signed_at,omitempty"`
	// Stored — Контейнер подписи скачан к нам и открывается отдельной операцией
	Stored    bool   `json:"stored"`
	CreatedAt string `json:"created_at"`
}

// DocflowStage — Этап документооборота: что с пакетом можно сделать сейчас. Список действий приходит от ОПЕРАТОРА и не выводится из нашего состояния.
type DocflowStage struct {
	ID      UUID `json:"id"`
	Message UUID `json:"message"`
	// ExternalID — Идентификатор этапа у оператора; он же адресует действие
	ExternalID string               `json:"external_id"`
	Name       string               `json:"name"`
	Actions    []DocflowStageAction `json:"actions"`
	// RequiresSignature — Этап закрывается подписью. Признак оператора, а не наш вывод из названия
	RequiresSignature bool `json:"requires_signature"`
	// Closed — Ход не за нами. Закрытые этапы не показываются и не считаются
	Closed bool `json:"closed"`
	// Service — Служебный этап оператора — извещение о получении, подтверждение, квитанция. Технология обмена, а не решение по документу: клиент обрабатывает все служебные этапы пакета одним действием, а не по кнопке на каждый
	Service bool `json:"service"`
	// StartedAt — С какого момента этап ждёт человека: дата этапа у оператора, без неё — когда зеркало увидело его открытым; открытый снова этап считается заново
	StartedAt string `json:"started_at"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

// DocflowStageAction — Действие, которое оператор разрешает на этапе. Код отправляют оператору, надпись показывают человеку.
type DocflowStageAction struct {
	Code string `json:"code"`
	Name string `json:"name"`
	// RequiresSignature — Действие закрывается подписью («ТребуетПодписания» оператора). Точнее признака этапа: на этапе «Утверждение» подписи требует «Утвердить», а «Переназначить» — нет. У этапов, записанных до появления признака, false у всех действий — тогда судят по requires_signature этапа
	RequiresSignature *bool `json:"requires_signature,omitempty"`
}

type DocflowStateCategory = string

type DocflowTemplatePastAct struct {
	OrderID UUID   `json:"order_id"`
	Number  string `json:"number"`
	Date    string `json:"date"`
	// ClosingDate — Дата закрывающей бумаги по правилу шаблона
	ClosingDate string `json:"closing_date"`
	Amount      string `json:"amount"`
	Currency    string `json:"currency"`
	// Issued — Бумага выпущена этим нажатием
	Issued bool `json:"issued"`
	// Error — Почему бумага не выпущена
	Error *string `json:"error,omitempty"`
}

type DocflowTemplatePastActs struct {
	Items  []DocflowTemplatePastAct `json:"items"`
	Issued int64                    `json:"issued"`
	Failed int64                    `json:"failed"`
}

// DocumentCreate — Владелец задаётся одной ссылкой `task`, `section`, `project`, `milestone` либо парой `owner_type`/`owner_id`.
type DocumentCreate struct {
	OwnerType *DocumentOwnerType `json:"owner_type,omitempty"`
	OwnerID   *string            `json:"owner_id,omitempty"`
	Task      *string            `json:"task,omitempty"`
	Section   *string            `json:"section,omitempty"`
	Project   *string            `json:"project,omitempty"`
	Milestone *string            `json:"milestone,omitempty"`
	Title     string             `json:"title"`
	Content   *string            `json:"content,omitempty"`
	Icon      *string            `json:"icon,omitempty"`
	Color     *string            `json:"color,omitempty"`
	Author    *int64             `json:"author,omitempty"`
}

type DocumentOwnerType = string

type DocumentPage struct {
	Count   int64          `json:"count"`
	Results []TaskDocument `json:"results"`
}

type DocumentUpdate struct {
	OwnerType  *DocumentOwnerType `json:"owner_type,omitempty"`
	OwnerID    *string            `json:"owner_id,omitempty"`
	Task       *string            `json:"task,omitempty"`
	Section    *string            `json:"section,omitempty"`
	Project    *string            `json:"project,omitempty"`
	Milestone  *string            `json:"milestone,omitempty"`
	Title      *string            `json:"title,omitempty"`
	Content    *string            `json:"content,omitempty"`
	Icon       *string            `json:"icon,omitempty"`
	Color      *string            `json:"color,omitempty"`
	IsArchived *bool              `json:"is_archived,omitempty"`
}

type DurationMetric struct {
	Samples             int64 `json:"samples"`
	MedianSeconds       int64 `json:"median_seconds"`
	Percentile85Seconds int64 `json:"percentile_85_seconds"`
}

type EmptyObject = map[string]json.RawMessage

type Error struct {
	// Detail — One human sentence in the request language (Accept-Language, echoed as Content-Language)
	Detail string `json:"detail"`
	// Code — Stable module error code when the endpoint defines one
	Code *string `json:"code,omitempty"`
	// RequestID — Case id. Always present on 5xx and on any error produced by the server itself; the same value is returned in the X-Request-ID header and recorded in the access log and the incident. Quote it to support instead of the cause, which the response never carries.
	RequestID *string `json:"request_id,omitempty"`
}

type FileUpload struct {
	File string `json:"file"`
}

type FilesAccessPolicy struct {
	FolderID         UUID         `json:"folder_id"`
	RootID           UUID         `json:"root_id"`
	IsRoot           bool         `json:"is_root"`
	Restricted       bool         `json:"restricted"`
	BreakInheritance bool         `json:"break_inheritance"`
	Grants           []FilesGrant `json:"grants"`
	// Inherited — Права, действующие сверху по дереву
	Inherited []FilesGrant `json:"inherited"`
}

type FilesBreadcrumb struct {
	ID   UUID   `json:"id"`
	Name string `json:"name"`
}

type FilesEntry struct {
	Kind   string       `json:"kind"`
	Folder *FilesFolder `json:"folder,omitempty"`
	File   *FilesFile   `json:"file,omitempty"`
}

type FilesFile struct {
	ID       UUID   `json:"id"`
	FolderID UUID   `json:"folder_id"`
	RootID   UUID   `json:"root_id"`
	Name     string `json:"name"`
	// ExternalURL — HTTP(S)-адрес внешнего ярлыка; отсутствует у обычных файлов
	ExternalURL *string `json:"external_url,omitempty"`
	Extension   string  `json:"extension"`
	MimeType    string  `json:"mime_type"`
	SizeBytes   int64   `json:"size_bytes"`
	VersionNo   int64   `json:"version_no"`
	VersionID   *UUID   `json:"version_id,omitempty"`
	OwnerID     int64   `json:"owner_id"`
	CreatedBy   int64   `json:"created_by"`
	UpdatedBy   *int64  `json:"updated_by,omitempty"`
	TrashedAt   *string `json:"trashed_at,omitempty"`
	CreatedAt   string  `json:"created_at"`
	UpdatedAt   string  `json:"updated_at"`
	// ScanStatus — skipped — содержимое крупнее порога проверки: оно выдаётся, но честно помечено непроверенным
	ScanStatus    string            `json:"scan_status"`
	ScanVerdict   *string           `json:"scan_verdict,omitempty"`
	PreviewStatus string            `json:"preview_status"`
	HasThumbnail  bool              `json:"has_thumbnail"`
	IsFavorite    bool              `json:"is_favorite"`
	FolderName    *string           `json:"folder_name,omitempty"`
	Path          []FilesBreadcrumb `json:"path,omitempty"`
}

type FilesFolder struct {
	ID       UUID   `json:"id"`
	ParentID *UUID  `json:"parent_id,omitempty"`
	RootID   UUID   `json:"root_id"`
	Depth    int64  `json:"depth"`
	Name     string `json:"name"`
	// Kind — Личное хранилище принадлежит своему владельцу целиком
	Kind        string `json:"kind"`
	Icon        string `json:"icon"`
	Color       string `json:"color"`
	Description string `json:"description"`
	// IsRestricted — Закрытое хранилище видно только участникам его списка
	IsRestricted bool `json:"is_restricted"`
	// BreakInheritance — Права хранилища на эту папку не действуют
	BreakInheritance bool `json:"break_inheritance"`
	// BusinessID — Бизнес хранилища; у вложенной папки — бизнес её хранилища. Хранилище бизнеса видят участники, чья область доступа касается бизнеса, и поимённо выданные; null — хранилище всего кабинета или личное
	BusinessID *UUID   `json:"business_id"`
	OwnerID    int64   `json:"owner_id"`
	CreatedBy  int64   `json:"created_by"`
	TrashedAt  *string `json:"trashed_at,omitempty"`
	CreatedAt  string  `json:"created_at"`
	UpdatedAt  string  `json:"updated_at"`
	CanRead    bool    `json:"can_read"`
	CanWrite   bool    `json:"can_write"`
	// CanShare — Право выпускать внешние ссылки; из открытости хранилища не следует
	CanShare    bool  `json:"can_share"`
	CanManage   bool  `json:"can_manage"`
	IsFavorite  bool  `json:"is_favorite"`
	FolderCount int64 `json:"folder_count"`
	FileCount   int64 `json:"file_count"`
	SizeBytes   int64 `json:"size_bytes"`
}

type FilesFolderInput struct {
	ParentID     *UUID   `json:"parent_id,omitempty"`
	Name         string  `json:"name"`
	Icon         *string `json:"icon,omitempty"`
	Color        *string `json:"color,omitempty"`
	Description  *string `json:"description,omitempty"`
	Kind         *string `json:"kind,omitempty"`
	IsRestricted *bool   `json:"is_restricted,omitempty"`
	// BusinessID — Бизнес общего хранилища (только у верхнего уровня). Поле не передано — не менять (у нового — единственный бизнес области доступа или весь кабинет); null — хранилище всего кабинета. Бизнес вне области доступа — 403 files.business_forbidden
	BusinessID *UUID `json:"business_id,omitempty"`
}

type FilesGrant struct {
	ID            *UUID  `json:"id,omitempty"`
	PrincipalType string `json:"principal_type"`
	PrincipalKey  string `json:"principal_key"`
	CanRead       bool   `json:"can_read"`
	CanWrite      bool   `json:"can_write"`
	CanShare      bool   `json:"can_share"`
	CanManage     bool   `json:"can_manage"`
}

type FilesListing struct {
	Folder  FilesFolder       `json:"folder"`
	Path    []FilesBreadcrumb `json:"path"`
	Entries []FilesEntry      `json:"entries"`
	Total   int64             `json:"total"`
}

type FilesSearchHit struct {
	File    FilesFile `json:"file"`
	Snippet *string   `json:"snippet,omitempty"`
	Matched string    `json:"matched"`
}

type FilesShare struct {
	ID       UUID  `json:"id"`
	FolderID *UUID `json:"folder_id,omitempty"`
	FileID   *UUID `json:"file_id,omitempty"`
	RootID   UUID  `json:"root_id"`
	// Mode — upload — приёмник файлов: получатель кладёт своё и не видит чужого
	Mode          string  `json:"mode"`
	Title         string  `json:"title"`
	HasPassword   bool    `json:"has_password"`
	ExpiresAt     *string `json:"expires_at,omitempty"`
	MaxDownloads  *int64  `json:"max_downloads,omitempty"`
	DownloadCount int64   `json:"download_count"`
	LastAccessAt  *string `json:"last_access_at,omitempty"`
	RevokedAt     *string `json:"revoked_at,omitempty"`
	CreatedBy     int64   `json:"created_by"`
	CreatedAt     string  `json:"created_at"`
	TargetName    *string `json:"target_name,omitempty"`
	// Token — Показывается один раз при создании; в базе лежит только его хэш
	Token *string `json:"token,omitempty"`
	URL   *string `json:"url,omitempty"`
}

type FilesShareInput struct {
	FolderID *UUID   `json:"folder_id,omitempty"`
	FileID   *UUID   `json:"file_id,omitempty"`
	Mode     string  `json:"mode"`
	Title    *string `json:"title,omitempty"`
	Password *string `json:"password,omitempty"`
	// ExpiresAt — Момент, после которого ссылка перестаёт открываться
	ExpiresAt    *string `json:"expires_at,omitempty"`
	MaxDownloads *int64  `json:"max_downloads,omitempty"`
}

type FilesUpload struct {
	ID        UUID    `json:"id"`
	FolderID  UUID    `json:"folder_id"`
	RootID    UUID    `json:"root_id"`
	FileID    *UUID   `json:"file_id,omitempty"`
	Name      string  `json:"name"`
	MimeType  string  `json:"mime_type"`
	SizeBytes int64   `json:"size_bytes"`
	PartBytes int64   `json:"part_bytes"`
	PartCount int64   `json:"part_count"`
	Status    string  `json:"status"`
	ErrorCode *string `json:"error_code,omitempty"`
	ExpiresAt string  `json:"expires_at"`
	CreatedAt string  `json:"created_at"`
	// Uploaded — Уже принятые части; на них держится докачка
	Uploaded []FilesUploadedPart `json:"uploaded,omitempty"`
	// DirectUrls — Подписанные адреса частей для прямой записи в объектное хранилище
	DirectUrls map[string]string `json:"direct_urls,omitempty"`
}

type FilesUploadInput struct {
	FolderID UUID `json:"folder_id"`
	// FileID — Задан при загрузке новой версии существующего файла
	FileID *UUID  `json:"file_id,omitempty"`
	Name   string `json:"name"`
	// RelativePath — Путь файла внутри загружаемой папки; недостающие папки создаются по нему
	RelativePath *string `json:"relative_path,omitempty"`
	MimeType     *string `json:"mime_type,omitempty"`
	SizeBytes    int64   `json:"size_bytes"`
	Comment      *string `json:"comment,omitempty"`
}

type FilesUploadedPart struct {
	Number int64  `json:"number"`
	Etag   string `json:"etag"`
	Size   int64  `json:"size"`
}

type FilesVersion struct {
	ID            UUID    `json:"id"`
	FileID        UUID    `json:"file_id"`
	VersionNo     int64   `json:"version_no"`
	SizeBytes     int64   `json:"size_bytes"`
	MimeType      string  `json:"mime_type"`
	ContentSha256 *string `json:"content_sha256,omitempty"`
	// ScanStatus — Версия со статусом pending, scanning или infected не отдаётся
	ScanStatus    string  `json:"scan_status"`
	ScanVerdict   *string `json:"scan_verdict,omitempty"`
	PreviewStatus string  `json:"preview_status"`
	TextStatus    string  `json:"text_status"`
	Comment       *string `json:"comment,omitempty"`
	CreatedBy     int64   `json:"created_by"`
	CreatedAt     string  `json:"created_at"`
}

type FinanceAccount struct {
	ID UUID `json:"id"`
	// Business — Бизнес, которому принадлежат деньги — у счёта из юрлица, у кассы из её карточки. null только у старого счёта без юрлица в кабинете с несколькими бизнесами.
	Business *string `json:"business,omitempty"`
	// Kind — Где лежат деньги. `bank` — расчётный счёт, `cash` — касса из справочника «Кассы». Список общий намеренно: вопрос «сколько у меня денег» задаётся один раз. У кассы банковские поля (`bic`, `number`, `bank_name`, `connector`) пусты по построению, а не «ещё не заполнены», и карточка счёта по её идентификатору не открывается.
	Kind                 string  `json:"kind"`
	Company              *string `json:"company"`
	Bank                 *string `json:"bank"`
	CompanyName          string  `json:"company_name"`
	CompanyDirectoryName string  `json:"company_directory_name"`
	CompanyINN           string  `json:"company_inn"`
	CompanyIsActive      bool    `json:"company_is_active"`
	Name                 string  `json:"name"`
	BankName             string  `json:"bank_name"`
	BIC                  string  `json:"bic"`
	Number               string  `json:"number"`
	Currency             string  `json:"currency"`
	GLAccount            *string `json:"gl_account"`
	IsActive             bool    `json:"is_active"`
	// OpeningBalance — Decimal string
	OpeningBalance string `json:"opening_balance"`
	// Balance — Decimal string
	Balance         string  `json:"balance"`
	TxnCount        int64   `json:"txn_count"`
	Connector       *string `json:"connector"`
	ConnectorName   string  `json:"connector_name"`
	ConnectorStatus string  `json:"connector_status"`
	SyncEnabled     bool    `json:"sync_enabled"`
	SyncedAt        *string `json:"synced_at"`
	CreatedAt       string  `json:"created_at"`
	UpdatedAt       string  `json:"updated_at"`
	// BankBalance — Остаток по данным банка на момент `bank_balance_at`, decimal string. null — банк остатка не называл (счёт не подключён или остаток ещё не приходил): это не ноль, и сверять с ним нечего.
	BankBalance *string `json:"bank_balance,omitempty"`
	// BankBalanceAt — Когда банк назвал остаток `bank_balance`.
	BankBalanceAt *string `json:"bank_balance_at,omitempty"`
	// BankClosedAt — Когда счёт закрыт банком. null — счёт действующий.
	BankClosedAt *string `json:"bank_closed_at,omitempty"`
	// InUseSince — «Используется с»: с какой даты счёт принадлежит бизнесу. Операции раньше неё коннектор не запрашивает, загрузка файла пропускает, ручной ввод отклоняет. Поля нет — ограничения нет.
	InUseSince *string `json:"in_use_since,omitempty"`
	// BankTimezone — Часовой пояс банковских суток счёта (IANA), например Asia/Novosibirsk. По нему банк режет сутки выписки, и по нему считаются окно синхронизации, «Загрузить период» и остаток на дату. Умолчание — по БИК подразделения банка. null у кассы.
	BankTimezone *string `json:"bank_timezone,omitempty"`
	// BankTimezoneSource — Откуда пояс: `bic` — определён по БИК, `default` — определить не удалось, стоит умолчание (проверьте пояс), `manual` — задан человеком; подключение банка ручной пояс не трогает.
	BankTimezoneSource *json.RawMessage `json:"bank_timezone_source,omitempty"`
	// AccountType — Вид счёта. `settlement` — расчётный (счёт книги 51), `deposit` — вклад. Деньги вклада учитываются статьёй «Депозиты и вклады»: отправка и возврат идут ею, а остаток депозитного счёта в итог денег не входит.
	AccountType *string `json:"account_type,omitempty"`
	// AccountTypeSource — Откуда вид: `number` — выведен из номера счёта (421…–422… и 423…, 426… — вклад), `bank` — назван банком, `manual` — выбран человеком. Ручной выбор номер и банк не перебивают.
	AccountTypeSource *string `json:"account_type_source,omitempty"`
}

type FinanceAccountCreate struct {
	Company     *string `json:"company,omitempty"`
	INN         *string `json:"inn,omitempty"`
	CompanyName *string `json:"company_name,omitempty"`
	Name        string  `json:"name"`
	BankName    *string `json:"bank_name,omitempty"`
	BIC         string  `json:"bic"`
	Number      string  `json:"number"`
	Currency    *string `json:"currency,omitempty"`
	GLAccount   *string `json:"gl_account,omitempty"`
	// OpeningBalance — Decimal string
	OpeningBalance *string `json:"opening_balance,omitempty"`
	IsActive       *bool   `json:"is_active,omitempty"`
	// InUseSince — «Используется с», ГГГГ-ММ-ДД; пусто — без ограничения.
	InUseSince *string `json:"in_use_since,omitempty"`
}

type FinanceAccountPage struct {
	Count   int64            `json:"count"`
	Results []FinanceAccount `json:"results"`
}

type FinanceAccountPatch struct {
	Company     *string `json:"company,omitempty"`
	CompanyName *string `json:"company_name,omitempty"`
	Name        *string `json:"name,omitempty"`
	BankName    *string `json:"bank_name,omitempty"`
	BIC         *string `json:"bic,omitempty"`
	Number      *string `json:"number,omitempty"`
	Currency    *string `json:"currency,omitempty"`
	GLAccount   *string `json:"gl_account,omitempty"`
	IsActive    *bool   `json:"is_active,omitempty"`
	// InUseSince — «Используется с», ГГГГ-ММ-ДД; null или пустая строка снимают ограничение.
	InUseSince *string `json:"in_use_since,omitempty"`
	// BankTimezone — Часовой пояс банковских суток (IANA). Источник пояса становится manual.
	BankTimezone *string `json:"bank_timezone,omitempty"`
}

type FinanceAccountableBalance struct {
	Business *string `json:"business,omitempty"`
	// Employee — Сотрудник; пусто — проводки 71 без сотрудника
	Employee     string `json:"employee"`
	EmployeeName string `json:"employee_name"`
	// Issued — Выдано под отчёт
	Issued string `json:"issued"`
	// Reported — Отчитано авансовыми отчётами
	Reported string `json:"reported"`
	// Returned — Возвращено деньгами
	Returned string `json:"returned"`
	// Balance — На руках; минус — перерасход
	Balance string `json:"balance"`
	// OldestOpen — Старейшая непокрытая выдача
	OldestOpen *string `json:"oldest_open,omitempty"`
	DaysOpen   int64   `json:"days_open"`
	// Deadline — Срок авансового отчёта бизнеса, дней
	Deadline int64 `json:"deadline"`
	Overdue  bool  `json:"overdue"`
}

type FinanceAccountableBalances struct {
	On   string                      `json:"on"`
	Rows []FinanceAccountableBalance `json:"rows"`
}

type FinanceAcquirer struct {
	// ID — Настройка эквайринга
	ID UUID `json:"id"`
	// CompanyID — Юрлицо-продавец
	CompanyID UUID `json:"company_id"`
	// Provider — Ключ провайдера, как в подтверждении оплаты картой (yookassa)
	Provider string `json:"provider"`
	// ContactID — Контрагент-эквайер
	ContactID UUID `json:"contact_id"`
	// ContactName — Название контрагента-эквайера
	ContactName *string `json:"contact_name,omitempty"`
	// FeeVATRate — Ставка НДС, которую эквайер начисляет на комиссию, в процентах; null — без НДС
	FeeVATRate *string `json:"fee_vat_rate"`
	// FeeRecognition — Когда признаётся расход по комиссии: payment — по данным платежа; closing_document — по закрывающему документу эквайера (УПД или акт за период)
	FeeRecognition string `json:"fee_recognition"`
}

type FinanceAcquirerInput struct {
	// CompanyID — Юрлицо-продавец
	CompanyID UUID `json:"company_id"`
	// Provider — Ключ провайдера, как в подтверждении оплаты картой (yookassa)
	Provider string `json:"provider"`
	// ContactID — Действующий контрагент кабинета — эквайер
	ContactID UUID `json:"contact_id"`
	// FeeVATRate — Ставка НДС эквайера на комиссию в процентах, от 0 до 100; пусто или null — без НДС
	FeeVATRate *string `json:"fee_vat_rate,omitempty"`
	// FeeRecognition — Когда признаётся расход по комиссии: payment — по данным платежа; closing_document — по закрывающему документу эквайера
	FeeRecognition *string `json:"fee_recognition,omitempty"`
}

type FinanceAcquirerList struct {
	// Acquirers — Эквайеры доступных юрлиц
	Acquirers []FinanceAcquirer `json:"acquirers"`
}

type FinanceAcquiringCaptureInput struct {
	// OrderID — Продажа, заведённая этой установкой приложения. Без неё обязателен company_id: оплата розницы ложится на покупателя и разносится алгоритмом — в продажу дня, если она есть (ERP-1727)
	OrderID *UUID `json:"order_id,omitempty"`
	// CompanyID — Юрлицо-продавец оплаты без продажи; при order_id не нужно
	CompanyID *UUID `json:"company_id,omitempty"`
	// ContactID — Покупатель оплаты без продажи; не передан — системный «Розничный покупатель»
	ContactID *UUID `json:"contact_id,omitempty"`
	// Provider — Ключ проверенного провайдера платежа
	Provider string `json:"provider"`
	// ExternalID — Уникальный номер списания у провайдера; повтор использует тот же номер
	ExternalID string `json:"external_id"`
	// Amount — Положительная сумма списания в валюте продажи, десятичная строка
	Amount string `json:"amount"`
	// Currency — Валюта продажи, ISO 4217
	Currency string `json:"currency"`
	// PaidAt — Дата подтверждённого списания у провайдера
	PaidAt string `json:"paid_at"`
	// Fee — Сколько провайдер удержал из этого платежа, всего с налогом, десятичная строка; меньше суммы списания. Не передаётся, если провайдер удержание по платежу не называет. Создаёт документ «Комиссия эквайринга» (Дт 44 / Кт 57.03); в отпечаток повтора не входит, поэтому может прийти позже повтором того же платежа
	Fee *string `json:"fee,omitempty"`
	// FeeVAT — В том числе налог с комиссии, десятичная строка, если провайдер его называет; передаётся только вместе с fee. Не передан — финансы считают налог по ставке эквайера из настройки «Эквайринг». К вычету (Дт 19) идёт, если юрлицо на дату выделяет входной налог; иначе остаётся в расходе
	FeeVAT *string `json:"fee_vat,omitempty"`
}

type FinanceAcquiringCaptureResult struct {
	// DocumentID — Финансовый документ оплаты картой
	DocumentID UUID `json:"document_id"`
	// Status — Оплата проведена в учёте
	Status string `json:"status"`
	// OrderID — Продажа, на которую указано списание
	OrderID UUID `json:"order_id"`
	// Replayed — true при повторе уже записанного списания
	Replayed bool `json:"replayed"`
}

type FinanceAcquiringInTransit struct {
	// ReceiptDocumentID — Документ «Оплата картой»
	ReceiptDocumentID UUID `json:"receipt_document_id"`
	// Number — Номер документа оплаты
	Number string `json:"number"`
	// Date — Дата оплаты
	Date string `json:"date"`
	// CompanyID — Юрлицо
	CompanyID UUID `json:"company_id"`
	// Provider — Ключ провайдера
	Provider string `json:"provider"`
	// ExternalID — Идентификатор платежа у провайдера
	ExternalID string `json:"external_id"`
	// OrderID — Продажа
	OrderID *UUID `json:"order_id,omitempty"`
	// ContactID — Покупатель
	ContactID *UUID `json:"contact_id,omitempty"`
	// ContactName — Название покупателя
	ContactName *string `json:"contact_name,omitempty"`
	// Amount — Сумма оплаты в валюте учёта
	Amount string `json:"amount"`
	// Fee — Удержание провайдера в валюте учёта; 0 — ещё неизвестно
	Fee string `json:"fee"`
	// NetAmount — Ожидаемая сумма к зачислению
	NetAmount string `json:"net_amount"`
	// FeeKnown — Удержание уже заведено «Комиссией эквайринга»
	FeeKnown bool `json:"fee_known"`
}

type FinanceAcquiringOverview struct {
	// InTransit — Оплаты, которые эквайер ещё не перечислил
	InTransit []FinanceAcquiringInTransit `json:"in_transit"`
	// InTransitTotal — Ожидаемая сумма к зачислению по ним
	InTransitTotal string `json:"in_transit_total"`
	// Payouts — Выплаты эквайера, новые сверху
	Payouts []FinanceAcquiringPayout `json:"payouts"`
	// Registries — Последние реестры провайдера
	Registries []FinanceAcquiringRegistry `json:"registries"`
	// Acquirers — Эквайеры юрлиц
	Acquirers []FinanceAcquirer `json:"acquirers"`
}

type FinanceAcquiringPayout struct {
	// DocumentID — Банковская операция выплаты
	DocumentID UUID `json:"document_id"`
	// Number — Номер банковской операции
	Number string `json:"number"`
	// Date — Дата зачисления
	Date string `json:"date"`
	// CompanyID — Юрлицо
	CompanyID UUID `json:"company_id"`
	// Amount — Сумма зачисления
	Amount string `json:"amount"`
	// ClearedCount — Сколько оплат сверено с выплатой
	ClearedCount int64 `json:"cleared_count"`
	// ClearedNet — Сумма к зачислению сверенных оплат
	ClearedNet string `json:"cleared_net"`
	// Reconciled — Сверенные оплаты дают ровно сумму выплаты
	Reconciled bool `json:"reconciled"`
	// ContactName — Плательщик выплаты
	ContactName *string `json:"contact_name,omitempty"`
	// ClearingSource — auto — по сумме к зачислению; registry — по реестру провайдера
	ClearingSource *string `json:"clearing_source,omitempty"`
}

type FinanceAcquiringRegistry struct {
	// ID — Реестр
	ID UUID `json:"id"`
	// CompanyID — Юрлицо
	CompanyID UUID `json:"company_id"`
	// Provider — Ключ провайдера
	Provider string `json:"provider"`
	// FileName — Имя загруженного файла
	FileName string `json:"file_name"`
	// Currency — Валюта платежей, ISO 4217
	Currency string `json:"currency"`
	// RowsCount — Число платежей в реестре
	RowsCount int64 `json:"rows_count"`
	// Amount — Сумма платежей
	Amount string `json:"amount"`
	// NetAmount — Сумма к зачислению — ею реестр находит выплату
	NetAmount string `json:"net_amount"`
	// FeeAmount — Удержано всего
	FeeAmount string `json:"fee_amount"`
	// PayoutDocumentID — Выплата эквайера, с которой реестр сверен
	PayoutDocumentID *UUID `json:"payout_document_id,omitempty"`
	// Status — awaiting_payout — выплаты на сумму реестра ещё нет; matched — сверен; discrepancy — сверен, но есть строки для человека
	Status string `json:"status"`
	// UploadedAt — Когда загружен
	UploadedAt string `json:"uploaded_at"`
	// Rows — Строки реестра
	Rows []FinanceAcquiringRegistryRow `json:"rows,omitempty"`
}

type FinanceAcquiringRegistryImport struct {
	Registry FinanceAcquiringRegistry `json:"registry"`
	// Replayed — true — этот файл уже был загружен
	Replayed bool `json:"replayed"`
}

type FinanceAcquiringRegistryInput struct {
	// CompanyID — Юрлицо, чьи платежи в реестре
	CompanyID UUID `json:"company_id"`
	// Provider — Ключ провайдера (yookassa)
	Provider string `json:"provider"`
	// FileName — Имя файла для истории загрузок
	FileName *string `json:"file_name,omitempty"`
	// Content — Содержимое CSV реестра текстом в UTF-8, до 4 МБ
	Content string `json:"content"`
}

type FinanceAcquiringRegistryRow struct {
	// Line — Номер строки в файле
	Line int64 `json:"line"`
	// ExternalID — Идентификатор платежа у провайдера
	ExternalID string `json:"external_id"`
	// Amount — Сумма платежа, десятичная строка
	Amount string `json:"amount"`
	// NetAmount — Сумма к зачислению, десятичная строка
	NetAmount string `json:"net_amount"`
	// Fee — Удержано провайдером, всего с налогом
	Fee string `json:"fee"`
	// FeeVAT — В том числе налог с комиссии
	FeeVAT *string `json:"fee_vat,omitempty"`
	// PaidAt — Время платежа из реестра
	PaidAt *string `json:"paid_at,omitempty"`
	// ReceiptDocumentID — Найденная оплата картой
	ReceiptDocumentID *UUID `json:"receipt_document_id,omitempty"`
	// Status — matched — оплата найдена и удержание сходится; unknown_payment — оплаты с таким номером в учёте нет; fee_mismatch — в учёте другое удержание
	Status string `json:"status"`
}

// FinanceAllocationRule — Версия правила авторазнесения. Пустые уровни — правило не сужено.
type FinanceAllocationRule struct {
	ID         *UUID `json:"id,omitempty"`
	BusinessID *UUID `json:"business_id,omitempty"`
	CompanyID  *UUID `json:"company_id,omitempty"`
	AccountID  *UUID `json:"account_id,omitempty"`
	ContactID  *UUID `json:"contact_id,omitempty"`
	ContractID *UUID `json:"contract_id,omitempty"`
	// Side — Поступления или выплаты
	Side *string `json:"side,omitempty"`
	// Rule — Правило; inherit — как у уровня выше
	Rule *string `json:"rule,omitempty"`
	// ValidFrom — Дата начала действия версии
	ValidFrom *string `json:"valid_from,omitempty"`
	CreatedBy *int64  `json:"created_by,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
}

// FinanceAllocationRuleInput — Новая версия правила авторазнесения.
type FinanceAllocationRuleInput struct {
	BusinessID UUID   `json:"business_id"`
	CompanyID  *UUID  `json:"company_id,omitempty"`
	AccountID  *UUID  `json:"account_id,omitempty"`
	ContactID  *UUID  `json:"contact_id,omitempty"`
	ContractID *UUID  `json:"contract_id,omitempty"`
	Side       string `json:"side"`
	Rule       string `json:"rule"`
	ValidFrom  string `json:"valid_from"`
}

// FinanceAllocationRuleRun — Оплаты, которые разнесёт правило, и сколько разнесено. Отказ одной оплаты прогон не обрывает: её строка несёт failure (period_closed, posting_refused или failed).
type FinanceAllocationRuleRun struct {
	DryRun *bool `json:"dry_run,omitempty"`
	// Applied — Сколько оплат разнесено; в предпросмотре 0
	Applied *int64                       `json:"applied,omitempty"`
	Items   []map[string]json.RawMessage `json:"items,omitempty"`
}

// FinanceAllocationRuleRunInput — Разнесение очереди по правилу; dry_run — предпросмотр.
type FinanceAllocationRuleRunInput struct {
	BusinessID *UUID `json:"business_id,omitempty"`
	// DryRun — Предпросмотр без записи
	DryRun *bool `json:"dry_run,omitempty"`
}

type FinanceBalanceItem struct {
	Code   string `json:"code"`
	Name   string `json:"name"`
	Amount string `json:"amount"`
}

type FinanceBalanceReport struct {
	On               string                  `json:"on"`
	Currency         string                  `json:"currency"`
	Sections         []FinanceBalanceSection `json:"sections"`
	AssetsTotal      string                  `json:"assets_total"`
	PassiveTotal     string                  `json:"passive_total"`
	RetainedEarnings string                  `json:"retained_earnings"`
	Difference       string                  `json:"difference"`
	AccountingBasis  *AccountingBasis        `json:"accounting_basis,omitempty"`
}

type FinanceBalanceSection struct {
	Key   string               `json:"key"`
	Label string               `json:"label"`
	Total string               `json:"total"`
	Items []FinanceBalanceItem `json:"items"`
}

type FinanceBankLookup struct {
	DirectoryConfigured bool                   `json:"directory_configured"`
	Bank                *FinanceRequisitesBank `json:"bank"`
}

type FinanceBankSuggestions struct {
	DirectoryConfigured bool                    `json:"directory_configured"`
	Banks               []FinanceRequisitesBank `json:"banks"`
}

type FinanceCashflowEntry struct {
	ID   UUID   `json:"id"`
	Date string `json:"date"`
	// Amount — Decimal string СО ЗНАКОМ: приход и расход идут одним списком, и знак — единственное, что их различает
	Amount string `json:"amount"`
	// Currency — Код валюты; нужен и в отчёте по одной валюте, потому что расшифровка открывается и без фильтра
	Currency     string `json:"currency"`
	Counterparty string `json:"counterparty"`
	// Purpose — Назначение платежа
	Purpose string `json:"purpose"`
	// Source — Счёт или касса — откуда ушли или куда пришли деньги
	Source         string                    `json:"source"`
	DocumentID     *UUID                     `json:"document_id,omitempty"`
	DocumentNumber string                    `json:"document_number"`
	Kind           *FinanceCashflowEntryKind `json:"kind,omitempty"`
	TransactionID  *UUID                     `json:"transaction_id,omitempty"`
}

// FinanceCashflowEntryCategorize — Классификация кассовой операции. Пустая строка в любом поле снимает привязку: операция без статьи, без ответственного и без собственника — законное состояние.
type FinanceCashflowEntryCategorize struct {
	// CashflowItem — Идентификатор статьи ДДС; пустая строка снимает статью
	CashflowItem *string `json:"cashflow_item,omitempty"`
	// Employee — Прежнее учётное физлицо зарплаты; пустая строка снимает его. Новое разнесение указывает человека в for_contact
	Employee *string `json:"employee,omitempty"`
	// Contact — Идентификатор контрагента; пустая строка снимает контрагента
	Contact *string `json:"contact,omitempty"`
	// ForContact — «За кого»: контрагент сотрудника или собственника, чей расчёт гасит выдача. Пусто — как контрагент; не присланное поле остаётся как было
	ForContact *string `json:"for_contact,omitempty"`
	// Order — Продажа или закупка, который оплачивают наличные (приход — продажа, расход — закупка того же контрагента). Пустая строка снимает продажу или закупку; не присланное поле остаётся как было
	Order *string `json:"order,omitempty"`
}

type FinanceCashflowEntryKind = string

type FinanceCashflowEntryPage struct {
	// Count — Сколько операций в ячейке ВСЕГО — считается отдельно, а не по длине выборки
	Count int64 `json:"count"`
	// Shown — Сколько операций поместилось в потолок 200
	Shown   int64                  `json:"shown"`
	Results []FinanceCashflowEntry `json:"results"`
}

type FinanceCashflowItem struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Net   string `json:"net"`
	Level string `json:"level"`
}

type FinanceCashflowReport struct {
	// UnassignedCompany — При отборе по юрлицу — чистый поток движений без юрлица и всего бизнеса
	UnassignedCompany *FinanceCashflowReportUnassignedCompany `json:"unassigned_company,omitempty"`
	Currency          *string                                 `json:"currency,omitempty"`
	From              string                                  `json:"from"`
	To                string                                  `json:"to"`
	Inflow            string                                  `json:"inflow"`
	Outflow           string                                  `json:"outflow"`
	UncategorizedNet  string                                  `json:"uncategorized_net"`
	NetCashFlow       string                                  `json:"net_cash_flow"`
	TransferIn        string                                  `json:"transfer_in"`
	TransferOut       string                                  `json:"transfer_out"`
	Sections          []FinanceCashflowSection                `json:"sections"`
	Columns           []FinanceReportColumn                   `json:"columns"`
}

// FinanceCashflowReportUnassignedCompany — При отборе по юрлицу — чистый поток движений без юрлица и всего бизнеса
type FinanceCashflowReportUnassignedCompany struct {
	NetCashFlow         *string `json:"net_cash_flow,omitempty"`
	BusinessNetCashFlow *string `json:"business_net_cash_flow,omitempty"`
}

type FinanceCashflowSection struct {
	Key   string                `json:"key"`
	Label string                `json:"label"`
	Net   string                `json:"net"`
	Items []FinanceCashflowItem `json:"items"`
}

type FinanceCommercialPosition struct {
	Terms    FinanceCounterpartyTerms  `json:"terms"`
	Exposure FinanceSettlementExposure `json:"exposure"`
}

type FinanceConnector struct {
	ID                   UUID                        `json:"id"`
	Provider             FinanceConnectorProviderKey `json:"provider"`
	ProviderName         string                      `json:"provider_name"`
	DisplayName          string                      `json:"display_name"`
	CompanyName          string                      `json:"company_name"`
	Company              *string                     `json:"company"`
	CompanyDirectoryName string                      `json:"company_directory_name"`
	CompanyINN           string                      `json:"company_inn"`
	Status               FinanceConnectorStatus      `json:"status"`
	StatusName           string                      `json:"status_name"`
	AuthKind             FinanceConnectorAuthKind    `json:"auth_kind"`
	// HasCredentials — Только признак; сохранённый секрет никогда не возвращается
	HasCredentials     bool                       `json:"has_credentials"`
	MtlsCertificate    FinanceConnectorMTLSStatus `json:"mtls_certificate"`
	ExternalCustomerID string                     `json:"external_customer_id"`
	GrantedByUserID    *int64                     `json:"granted_by_user_id"`
	GrantedByName      string                     `json:"granted_by_name"`
	GrantedAt          *string                    `json:"granted_at"`
	ImportDepthDays    int64                      `json:"import_depth_days"`
	OverlapDays        int64                      `json:"overlap_days"`
	LastSyncAt         *string                    `json:"last_sync_at"`
	LastSyncStatus     string                     `json:"last_sync_status"`
	// LastError — The provider's technical reply, verbatim — material for an investigation, not a message for the cabinet screen: it may carry machine keys such as "invalid_client". The portal operator reads it in full on the bank connectors page, while the cabinet card renders last_error_code instead. Empty when the failure was ours: an internal cause never reaches this field, it is logged and named by last_error_code instead.
	LastError string `json:"last_error"`
	// LastErrorCode — Machine code of the last failure, translated by the client. Present because the text is stored: it is written in whatever locale the background sync happened to run in, and only a finite code can be rendered in the reader's language.
	LastErrorCode  string `json:"last_error_code"`
	AccountsTotal  int64  `json:"accounts_total"`
	AccountsLinked int64  `json:"accounts_linked"`
	// CanDelete — True only for an abandoned connection attempt: no accounts returned by the bank and no sync run at all. Everything else is the origin trail of the imported operations and is never deleted — both links cascade — so such a connection is disconnected instead.
	CanDelete bool   `json:"can_delete"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type FinanceConnectorAccount struct {
	ID                 UUID    `json:"id"`
	Connector          UUID    `json:"connector"`
	ExternalAccountID  string  `json:"external_account_id"`
	Number             string  `json:"number"`
	BIC                string  `json:"bic"`
	BankName           string  `json:"bank_name"`
	Title              string  `json:"title"`
	Currency           string  `json:"currency"`
	ExternalCustomerID string  `json:"external_customer_id"`
	OwnerINN           string  `json:"owner_inn"`
	OwnerName          string  `json:"owner_name"`
	Company            *string `json:"company"`
	CompanyName        string  `json:"company_name"`
	Account            *string `json:"account"`
	AccountName        string  `json:"account_name"`
	CompanyIsActive    bool    `json:"company_is_active"`
	IsEnabled          bool    `json:"is_enabled"`
	LastSyncedAt       *string `json:"last_synced_at"`
}

type FinanceConnectorAccountPage struct {
	Count   int64                     `json:"count"`
	Results []FinanceConnectorAccount `json:"results"`
}

type FinanceConnectorAccountPatch struct {
	Account   *string `json:"account,omitempty"`
	IsEnabled *bool   `json:"is_enabled,omitempty"`
}

type FinanceConnectorAuthKind = string

type FinanceConnectorMTLSStatus struct {
	Configured bool    `json:"configured"`
	ExpiresAt  *string `json:"expires_at,omitempty"`
	Warning    *string `json:"warning,omitempty"`
}

type FinanceConnectorPage struct {
	Count   int64              `json:"count"`
	Results []FinanceConnector `json:"results"`
}

type FinanceConnectorProvider struct {
	Key             FinanceConnectorProviderKey `json:"key"`
	Name            string                      `json:"name"`
	AuthKind        FinanceConnectorAuthKind    `json:"auth_kind"`
	SupportsWebhook bool                        `json:"supports_webhook"`
	CredentialHint  string                      `json:"credential_hint"`
	RedirectPath    *string                     `json:"redirect_path,omitempty"`
	// RequiresEgressAllowlist — Банк принимает запросы только с адресов, объявленных в его кабинете.
	RequiresEgressAllowlist bool `json:"requires_egress_allowlist"`
	// RequiresAccountNumber — Банк не отдаёт списка счетов организации — номер счёта называет человек.
	RequiresAccountNumber bool `json:"requires_account_number"`
	// EgressIps — Исходящие адреса контура для белого списка банка. Пусто — адрес контура не настроен.
	EgressIps []string `json:"egress_ips,omitempty"`
	// Timezone — Пояс банковских суток (IANA), например Europe/Moscow. По нему считаются окно выписки и «сегодня» банка; даты операций банка не пересчитываются.
	Timezone string `json:"timezone"`
}

type FinanceConnectorProviderKey = string

type FinanceConnectorProviderPage struct {
	Count   int64                      `json:"count"`
	Results []FinanceConnectorProvider `json:"results"`
}

type FinanceConnectorStatus = string

type FinanceConnectorSyncResult struct {
	Connector FinanceConnector `json:"connector"`
	Imported  int64            `json:"imported"`
	Skipped   int64            `json:"skipped"`
	Message   string           `json:"message"`
}

type FinanceConnectorSyncRun struct {
	ID            UUID    `json:"id"`
	Connector     UUID    `json:"connector"`
	Trigger       string  `json:"trigger"`
	Status        string  `json:"status"`
	StartedAt     string  `json:"started_at"`
	FinishedAt    *string `json:"finished_at"`
	DateFrom      *string `json:"date_from"`
	DateTo        *string `json:"date_to"`
	ImportedCount int64   `json:"imported_count"`
	SkippedCount  int64   `json:"skipped_count"`
	Error         string  `json:"error"`
}

type FinanceConnectorSyncRunPage struct {
	Count   int64                     `json:"count"`
	Results []FinanceConnectorSyncRun `json:"results"`
}

type FinanceCounterpartyTerms struct {
	ID        UUID    `json:"id"`
	ContactID UUID    `json:"contact_id"`
	CompanyID *string `json:"company_id,omitempty"`
	Currency  string  `json:"currency"`
	// CreditLimit — Decimal string; отсутствие означает, что лимит не задан
	CreditLimit      *string `json:"credit_limit,omitempty"`
	PaymentDelayDays int64   `json:"payment_delay_days"`
	// PrepaymentPercent — Decimal string от 0 до 100
	PrepaymentPercent string  `json:"prepayment_percent"`
	ValidFrom         string  `json:"valid_from"`
	ValidTo           *string `json:"valid_to,omitempty"`
	Reason            string  `json:"reason"`
	CreatedBy         *int64  `json:"created_by,omitempty"`
	CreatedAt         string  `json:"created_at"`
	Configured        bool    `json:"configured"`
}

type FinanceCounterpartyTermsCreate struct {
	CompanyID *string `json:"company_id,omitempty"`
	Currency  string  `json:"currency"`
	// CreditLimit — Неотрицательная decimal string
	CreditLimit      *string `json:"credit_limit,omitempty"`
	PaymentDelayDays int64   `json:"payment_delay_days"`
	// PrepaymentPercent — Decimal string от 0 до 100
	PrepaymentPercent string  `json:"prepayment_percent"`
	ValidFrom         string  `json:"valid_from"`
	ValidTo           *string `json:"valid_to,omitempty"`
	Reason            *string `json:"reason,omitempty"`
}

type FinanceDirection = string

type FinanceDividendDecisionInput struct {
	PolicyID   *UUID `json:"policy_id,omitempty"`
	BusinessID *UUID `json:"business_id,omitempty"`
	// CompanyID — Совместимый алиас: сервер использует бизнес указанного юрлица
	CompanyID  *UUID  `json:"company_id,omitempty"`
	PeriodFrom string `json:"period_from"`
	PeriodTo   string `json:"period_to"`
	// Amount — Пусто = процент политики от сальдо счёта 84
	Amount  *string                                `json:"amount,omitempty"`
	Comment *string                                `json:"comment,omitempty"`
	Rows    []FinanceDividendDecisionInputRowsItem `json:"rows,omitempty"`
}

type FinanceDividendDecisionInputRowsItem struct {
	OwnerID *UUID `json:"owner_id,omitempty"`
	// ContactID — Совместимый алиас владельца-контакта
	ContactID *UUID  `json:"contact_id,omitempty"`
	Amount    string `json:"amount"`
}

type FinanceDividendPolicyInput struct {
	BusinessID *UUID `json:"business_id,omitempty"`
	// CompanyID — Совместимый алиас: сервер использует бизнес указанного юрлица
	CompanyID *UUID  `json:"company_id,omitempty"`
	Name      string `json:"name"`
	ValidFrom string `json:"valid_from"`
	// BaseKind — База: ledger_profit — прибыль по книге (general_ledger_profit ОПиУ); cashflow_total — весь ДДС, чистый поток без внутренних переводов; operating_cashflow — операционный раздел ДДС; pnl_layout_row — строка макета ОПиУ (нужны base_layout_id и base_layout_row); pnl — устаревшее имя ledger_profit
	BaseKind *string `json:"base_kind,omitempty"`
	// BaseLayoutID — Макет ОПиУ для base_kind=pnl_layout_row
	BaseLayoutID *UUID `json:"base_layout_id,omitempty"`
	// BaseLayoutRow — Идентификатор строки макета ОПиУ для base_kind=pnl_layout_row
	BaseLayoutRow *string `json:"base_layout_row,omitempty"`
	// LossMode — through распределяет прибыль и убыток между владельцами в одинаковых долях
	LossMode *string `json:"loss_mode,omitempty"`
	// DistributionPercent — Доля результата, 0 < x <= 100
	DistributionPercent string `json:"distribution_percent"`
	// DistributionRule — Устаревшее поле; политика всегда использует процент результата
	DistributionRule *string `json:"distribution_rule,omitempty"`
	// ReserveAmount — Устаревшее поле; резерв больше не участвует в политике
	ReserveAmount  *string `json:"reserve_amount,omitempty"`
	Cadence        string  `json:"cadence"`
	IntervalMonths *int64  `json:"interval_months,omitempty"`
	// StartsOn — Конец первого периода
	StartsOn      string `json:"starts_on"`
	ExecutionMode string `json:"execution_mode"`
	// Participants — Устаревшее поле; владельцы и доли берутся из отдельной структуры владения бизнесом
	Participants []FinanceDividendPolicyInputParticipantsItem `json:"participants,omitempty"`
}

type FinanceDividendPolicyInputParticipantsItem struct {
	ContactID    UUID   `json:"contact_id"`
	UserID       *int64 `json:"user_id,omitempty"`
	SharePercent string `json:"share_percent"`
}

type FinanceExchangeApply struct {
	DocumentID UUID `json:"document_id"`
}

type FinanceExchangeCreate struct {
	CompanyID   UUID                       `json:"company_id"`
	AdapterKey  string                     `json:"adapter_key"`
	Direction   string                     `json:"direction"`
	ObjectType  string                     `json:"object_type"`
	ExternalID  string                     `json:"external_id"`
	PayloadHash string                     `json:"payload_hash"`
	Metadata    map[string]json.RawMessage `json:"metadata,omitempty"`
}

type FinanceExchangeItem struct {
	ID                  UUID                       `json:"id"`
	CompanyID           UUID                       `json:"company_id"`
	AdapterKey          string                     `json:"adapter_key"`
	Direction           string                     `json:"direction"`
	ObjectType          string                     `json:"object_type"`
	ExternalID          string                     `json:"external_id"`
	PayloadHash         string                     `json:"payload_hash"`
	LastPayloadHash     string                     `json:"last_payload_hash"`
	CanonicalDocumentID *string                    `json:"canonical_document_id,omitempty"`
	Status              FinanceExchangeStatus      `json:"status"`
	AttemptCount        int64                      `json:"attempt_count"`
	FirstSeenAt         string                     `json:"first_seen_at"`
	LastSeenAt          string                     `json:"last_seen_at"`
	AppliedAt           *string                    `json:"applied_at,omitempty"`
	LastError           string                     `json:"last_error"`
	LastActorID         *int64                     `json:"last_actor_id,omitempty"`
	Metadata            map[string]json.RawMessage `json:"metadata"`
	Duplicate           *bool                      `json:"duplicate,omitempty"`
	Conflict            *bool                      `json:"conflict,omitempty"`
}

type FinanceExchangePage struct {
	Count   int64                 `json:"count"`
	Results []FinanceExchangeItem `json:"results"`
}

type FinanceExchangeQuarantine struct {
	Reason string `json:"reason"`
}

type FinanceExchangeStatus = string

type FinanceExpenseReportCreate struct {
	Date    *string `json:"date,omitempty"`
	Comment *string `json:"comment,omitempty"`
	// Refs — business или company обязателен; item — статья вида «подотчёт»; for_contact — сотрудник (контрагент из папки «Сотрудники»)
	Refs    map[string]string                  `json:"refs"`
	Payload *FinanceExpenseReportCreatePayload `json:"payload,omitempty"`
	// Post — Провести сразу
	Post *bool `json:"post,omitempty"`
}

type FinanceExpenseReportCreatePayload struct {
	// Currency — Валюта учёта; другая отклоняется
	Currency *string                   `json:"currency,omitempty"`
	Rows     []FinanceExpenseReportRow `json:"rows,omitempty"`
}

type FinanceExpenseReportRow struct {
	// Item — Статья траты — любая
	Item UUID `json:"item"`
	// Amount — Сумма в валюте учёта, больше нуля
	Amount string `json:"amount"`
	// Contact — Продавец, кому заплатил сотрудник
	Contact *UUID `json:"contact,omitempty"`
	// ForContact — «За кого» у статей, которым нужен человек
	ForContact    *UUID   `json:"for_contact,omitempty"`
	ReceiptDate   *string `json:"receipt_date,omitempty"`
	ReceiptNumber *string `json:"receipt_number,omitempty"`
	Project       *UUID   `json:"project,omitempty"`
	Deal          *UUID   `json:"deal,omitempty"`
	Comment       *string `json:"comment,omitempty"`
	// Closes — «Закрывает» — долг поставщику (закупка, счёт), который гасит строка по статье расчётов с поставщиками (ERP-1249); пусто — долг подберёт правило
	Closes *UUID `json:"closes,omitempty"`
}

type FinanceItemMergeRequest struct {
	TargetID UUID `json:"target_id"`
}

type FinanceItemMergeResult struct {
	Preview    *bool                        `json:"preview,omitempty"`
	SourceID   *UUID                        `json:"source_id,omitempty"`
	SourceName *string                      `json:"source_name,omitempty"`
	TargetID   *UUID                        `json:"target_id,omitempty"`
	TargetName *string                      `json:"target_name,omitempty"`
	Documents  []map[string]json.RawMessage `json:"documents,omitempty"`
	Months     []map[string]json.RawMessage `json:"months,omitempty"`
	Settings   []map[string]json.RawMessage `json:"settings,omitempty"`
	References []map[string]json.RawMessage `json:"references,omitempty"`
	Totals     []map[string]json.RawMessage `json:"totals,omitempty"`
	Deleted    *bool                        `json:"deleted,omitempty"`
}

type FinanceOpeningDebtRequest struct {
	// Date — Дата остатков — дата старта учёта
	Date       string `json:"date"`
	BusinessID UUID   `json:"business_id"`
	// CompanyID — Юрлицо; пусто — долг без юрлица
	CompanyID *UUID `json:"company_id,omitempty"`
	ContactID UUID  `json:"contact_id"`
	// AccountCode — Счёт долга: 60.01 — наш долг поставщику, 62.01 — долг покупателя
	AccountCode string `json:"account_code"`
	// Direction — Сторона ноги книги. Кредит на 62.01 — отрицательная дебиторка, не аванс
	Direction string `json:"direction"`
	// Amount — Сумма в валюте долга, больше нуля
	Amount string `json:"amount"`
	// Currency — Валюта долга (ISO 4217); пусто — валюта учёта кабинета
	Currency *string `json:"currency,omitempty"`
	// DueDate — Срок оплаты; пусто — «без срока»
	DueDate *string `json:"due_date,omitempty"`
	// Batch — Общий признак одного ввода остатков (entity_refs.opening_batch)
	Batch *string `json:"batch,omitempty"`
	// Source — Откуда строка: введена вручную или загружена из 1С
	Source *string `json:"source,omitempty"`
}

type FinanceOperation struct {
	RecognitionMode string `json:"recognition_mode"`
	// CashPaid — Фактически оплачено по проведённым распределениям
	CashPaid string `json:"cash_paid"`
	// Advance — Оплата сверх признанного начисления
	Advance      string                 `json:"advance"`
	CashPayments []FinanceOperationFact `json:"cash_payments"`
	// UnattributedFacts — Применения к долгу, не привязанные к строке графика (ERP-1417)
	UnattributedFacts []FinanceOperationFact `json:"unattributed_facts"`
	ID                UUID                   `json:"id"`
	Kind              string                 `json:"kind"`
	CompanyID         UUID                   `json:"company_id"`
	ContactID         UUID                   `json:"contact_id"`
	Currency          string                 `json:"currency"`
	// Amount — Decimal string
	Amount        string                    `json:"amount"`
	DueDate       *string                   `json:"due_date,omitempty"`
	Purpose       *string                   `json:"purpose,omitempty"`
	PNLItemID     *string                   `json:"pnl_item_id,omitempty"`
	ProjectID     *string                   `json:"project_id,omitempty"`
	ContractID    *string                   `json:"contract_id,omitempty"`
	SourceSystem  string                    `json:"source_system"`
	SourceRef     string                    `json:"source_ref"`
	ExternalID    string                    `json:"external_id"`
	SchemaVersion int64                     `json:"schema_version"`
	Status        CoreDocumentStatus        `json:"status"`
	Current       FinanceOperationVersion   `json:"current"`
	Versions      []FinanceOperationVersion `json:"versions"`
}

type FinanceOperationAccrualAllocation struct {
	AccrualID UUID `json:"accrual_id"`
	// Amount — Положительная decimal string
	Amount string `json:"amount"`
}

// FinanceOperationAccrualCreate — Указывает ровно одну цель распределения: accrual_id для одной части плана либо allocations для нескольких частей. Совместимость этого ограничения проверяет сервер; плоская форма сохранена, чтобы сгенерированные TypeScript- и Swift-клиенты не теряли общие поля.
type FinanceOperationAccrualCreate struct {
	Source          FinanceOperationSource              `json:"source"`
	ExpectedVersion int64                               `json:"expected_version"`
	AccrualID       *UUID                               `json:"accrual_id,omitempty"`
	Allocations     []FinanceOperationAccrualAllocation `json:"allocations,omitempty"`
	Date            string                              `json:"date"`
	// Amount — Сумма документа; должна совпасть с суммой allocations
	Amount string `json:"amount"`
	// DueDate — Обычно вычисляется из графика; переданное значение не может ему противоречить
	DueDate *string `json:"due_date,omitempty"`
	Reason  *string `json:"reason,omitempty"`
	// VATAmount — Только закупка без «в т.ч. НДС» на плане (ERP-484, подшаг 5.3в): «в т.ч. НДС» акта поставщика. Обязательна, если на дату начисления бизнес очищает суммы и юрлицо принимает налог к вычету; 0 — налог не выделен. У плана с налогом начисление берёт долю нарастающим итогом, и непустое значение — 400
	VATAmount        *string           `json:"vat_amount,omitempty"`
	SupplierDocument *SupplierDocument `json:"supplier_document,omitempty"`
}

type FinanceOperationAccrualResult struct {
	OperationID UUID                                `json:"operation_id"`
	VersionID   UUID                                `json:"version_id"`
	AccrualID   *string                             `json:"accrual_id,omitempty"`
	Allocations []FinanceOperationAccrualAllocation `json:"allocations"`
	Document    CoreDocument                        `json:"document"`
	Operation   FinanceOperation                    `json:"operation"`
	// VATWarnings — Акт по продаже или закупке: строки со ставкой человека, равной прежней общей ставке юрлица, а на дату акта общая ставка другая
	VATWarnings []CoreOrderVATWarning `json:"vat_warnings,omitempty"`
}

type FinanceOperationAction struct {
	Source          FinanceOperationSource `json:"source"`
	ExpectedVersion int64                  `json:"expected_version"`
	Reason          *string                `json:"reason,omitempty"`
}

type FinanceOperationCreate struct {
	// RecognitionMode — document — один документ начисления; plan — план, который сам не создаёт долг
	RecognitionMode *string                `json:"recognition_mode,omitempty"`
	Source          FinanceOperationSource `json:"source"`
	Kind            string                 `json:"kind"`
	CompanyID       UUID                   `json:"company_id"`
	ContactID       UUID                   `json:"contact_id"`
	Date            string                 `json:"date"`
	Currency        string                 `json:"currency"`
	// Amount — Положительная decimal string
	Amount     string                           `json:"amount"`
	DueDate    *string                          `json:"due_date,omitempty"`
	Purpose    *string                          `json:"purpose,omitempty"`
	PNLItemID  UUID                             `json:"pnl_item_id"`
	ProjectID  *string                          `json:"project_id,omitempty"`
	ContractID *string                          `json:"contract_id,omitempty"`
	Accruals   []FinanceOperationStageInput     `json:"accruals,omitempty"`
	Payments   []FinanceOperationStageInput     `json:"payments,omitempty"`
	References []FinanceOperationReferenceInput `json:"references,omitempty"`
	// VATAmount — Только закупка: «в т.ч. НДС» документа поставщика (ERP-484, подшаги 5.3 и 5.3в). У закупки по документу обязательна, если на дату бизнес очищает суммы и юрлицо принимает налог к вычету; 0 — налог не выделен. У плана по периодам необязательна: указана — начисления берут долю нарастающим итогом, нет — налог приносит каждое начисление. Вне периода непустое значение — 400
	VATAmount        *string           `json:"vat_amount,omitempty"`
	SupplierDocument *SupplierDocument `json:"supplier_document,omitempty"`
}

type FinanceOperationFact struct {
	DocumentID UUID               `json:"document_id"`
	TypeKey    string             `json:"type_key"`
	TypeName   string             `json:"type_name"`
	Number     string             `json:"number"`
	Date       string             `json:"date"`
	Status     CoreDocumentStatus `json:"status"`
	// Amount — Decimal string из движений проведённого регистратора
	Amount   string `json:"amount"`
	Currency string `json:"currency"`
}

type FinanceOperationReferenceInput struct {
	Relation     string `json:"relation"`
	TargetModule string `json:"target_module"`
	TargetType   string `json:"target_type"`
	TargetID     string `json:"target_id"`
}

type FinanceOperationSource struct {
	SchemaVersion  int64  `json:"schema_version"`
	SourceSystem   string `json:"source_system"`
	SourceRef      string `json:"source_ref"`
	ExternalID     string `json:"external_id"`
	IdempotencyKey string `json:"idempotency_key"`
}

type FinanceOperationStage struct {
	ID       UUID    `json:"id"`
	Sequence int64   `json:"sequence"`
	Label    *string `json:"label,omitempty"`
	Date     string  `json:"date"`
	// Amount — Плановая decimal string
	Amount   string `json:"amount"`
	Currency string `json:"currency"`
	// ActualAmount — Decimal string из проведённых документов
	ActualAmount              string                 `json:"actual_amount"`
	DueTrigger                *string                `json:"due_trigger,omitempty"`
	AfterAccrualID            *string                `json:"after_accrual_id,omitempty"`
	DelayDays                 *int64                 `json:"delay_days,omitempty"`
	PaymentAttributionPending *bool                  `json:"payment_attribution_pending,omitempty"`
	Facts                     []FinanceOperationFact `json:"facts"`
}

type FinanceOperationStageInput struct {
	Sequence int64   `json:"sequence"`
	Label    *string `json:"label,omitempty"`
	// Date — Необязательная календарная дата; пусто означает без срока
	Date *string `json:"date,omitempty"`
	// Amount — Положительная decimal string
	Amount string `json:"amount"`
	// Currency — По умолчанию валюта операции; другая валюта не принимается
	Currency *string `json:"currency,omitempty"`
	// DueTrigger — Только для графика оплаты: считать срок от проведённого начисления
	DueTrigger *string `json:"due_trigger,omitempty"`
	// AfterAccrualSequence — Номер части начисления; отсутствие означает от любого начисления
	AfterAccrualSequence *int64 `json:"after_accrual_sequence,omitempty"`
	DelayDays            *int64 `json:"delay_days,omitempty"`
}

type FinanceOperationVersion struct {
	ID                UUID                    `json:"id"`
	Version           int64                   `json:"version"`
	ChangeKind        string                  `json:"change_kind"`
	PreviousVersionID *string                 `json:"previous_version_id,omitempty"`
	DocumentID        UUID                    `json:"document_id"`
	DocumentStatus    CoreDocumentStatus      `json:"document_status"`
	IsMarkedDeleted   bool                    `json:"is_marked_deleted"`
	CompanyID         UUID                    `json:"company_id"`
	ContactID         UUID                    `json:"contact_id"`
	Currency          string                  `json:"currency"`
	EffectiveDate     string                  `json:"effective_date"`
	Reason            *string                 `json:"reason,omitempty"`
	Accruals          []FinanceOperationStage `json:"accruals"`
	Payments          []FinanceOperationStage `json:"payments"`
}

type FinanceOrderActInput struct {
	Source FinanceOperationSource `json:"source"`
	Date   string                 `json:"date"`
	// Amount — Сумма акта с НДС в валюте продажи или закупки, decimal string
	Amount string `json:"amount"`
	// DueDate — Срок оплаты; пусто — по строке графика продажи или закупки или условиям контрагента
	DueDate *string `json:"due_date,omitempty"`
	Reason  *string `json:"reason,omitempty"`
	// PNLItemID — Статья выручки (расхода); пусто — статья продажи или закупки, политика бизнеса или системная
	PNLItemID map[string]json.RawMessage `json:"pnl_item_id,omitempty"`
	// StageID — Этап работ продажи или закупки, который закрывает акт
	StageID          map[string]json.RawMessage `json:"stage_id,omitempty"`
	VATAmount        *string                    `json:"vat_amount,omitempty"`
	PricesIncludeVAT *bool                      `json:"prices_include_vat,omitempty"`
}

type FinancePaymentCalendar struct {
	RnpMetrics *FinancePaymentCalendarRnpMetrics `json:"rnp_metrics,omitempty"`
	// ValuationDate — Дата доступных курсов для пересчёта прогноза без переоценки в главной книге
	ValuationDate *string `json:"valuation_date,omitempty"`
	Project       *string `json:"project,omitempty"`
	// BalanceAvailable — При фильтре проекта false; opening/closing/balance пустые, остатки счетов проекту не приписываются
	BalanceAvailable *bool  `json:"balance_available,omitempty"`
	From             string `json:"from"`
	To               string `json:"to"`
	Currency         string `json:"currency"`
	DerivedAvailable bool   `json:"derived_available"`
	DerivedNote      string `json:"derived_note"`
	Opening          string `json:"opening"`
	Inflow           string `json:"inflow"`
	Outflow          string `json:"outflow"`
	Closing          string `json:"closing"`
	OverdueIn        string `json:"overdue_in"`
	OverdueOut       string `json:"overdue_out"`
	DoneIn           string `json:"done_in"`
	DoneOut          string `json:"done_out"`
	// CommittedIn — «Должны» — поступления, выведенные из регистра расчётов: долг записан, его можно требовать
	CommittedIn string `json:"committed_in"`
	// ExpectedIn — «С ожиданиями» — то же плюс выставленные счета и этапы графиков договоров
	ExpectedIn string                          `json:"expected_in"`
	Undated    *FinancePaymentCalendarUndated  `json:"undated,omitempty"`
	Companies  []FinancePaymentCalendarCompany `json:"companies"`
	Step       string                          `json:"step"`
	Periods    []FinancePaymentCalendarPeriod  `json:"periods"`
	Totals     []FinancePaymentCalendarCell    `json:"totals"`
	Days       []FinancePaymentCalendarDay     `json:"days"`
	Rows       []FinancePaymentCalendarRow     `json:"rows"`
	Overdue    []FinancePaymentCalendarRow     `json:"overdue"`
}

type FinancePaymentCalendarRnpMetrics struct {
	MinimumBalance *string `json:"minimum_balance,omitempty"`
	MinimumOn      *string `json:"minimum_on,omitempty"`
	FirstGapOn     *string `json:"first_gap_on,omitempty"`
}

type FinancePaymentCalendarUndated struct {
	CountIn   int64                       `json:"count_in"`
	CountOut  int64                       `json:"count_out"`
	AmountIn  string                      `json:"amount_in"`
	AmountOut string                      `json:"amount_out"`
	Rows      []FinancePaymentCalendarRow `json:"rows"`
}

type FinancePaymentCalendarCell struct {
	Inflow   string `json:"inflow"`
	Outflow  string `json:"outflow"`
	Delta    string `json:"delta"`
	Balance  string `json:"balance"`
	Negative bool   `json:"negative"`
}

type FinancePaymentCalendarCompany struct {
	ID      *UUID                          `json:"id,omitempty"`
	Name    string                         `json:"name"`
	Opening string                         `json:"opening"`
	Inflow  string                         `json:"inflow"`
	Outflow string                         `json:"outflow"`
	Closing string                         `json:"closing"`
	Sources []FinancePaymentCalendarSource `json:"sources"`
	Cells   []FinancePaymentCalendarCell   `json:"cells"`
}

type FinancePaymentCalendarDay struct {
	Date     string `json:"date"`
	Inflow   string `json:"inflow"`
	Outflow  string `json:"outflow"`
	Balance  string `json:"balance"`
	Negative bool   `json:"negative"`
}

type FinancePaymentCalendarPeriod struct {
	Key     string `json:"key"`
	From    string `json:"from"`
	To      string `json:"to"`
	Partial bool   `json:"partial"`
}

type FinancePaymentCalendarRow struct {
	OriginalAmount   *string                  `json:"original_amount,omitempty"`
	OriginalCurrency *string                  `json:"original_currency,omitempty"`
	ProjectID        *UUID                    `json:"project_id,omitempty"`
	ID               UUID                     `json:"id"`
	Origin           string                   `json:"origin"`
	Date             string                   `json:"date"`
	Direction        FinanceDirection         `json:"direction"`
	Amount           string                   `json:"amount"`
	Currency         string                   `json:"currency"`
	SourceKind       FinancePaymentSourceKind `json:"source_kind"`
	SourceID         *UUID                    `json:"source_id,omitempty"`
	SourceName       string                   `json:"source_name"`
	Title            string                   `json:"title"`
	Note             string                   `json:"note"`
	ContactID        *UUID                    `json:"contact_id,omitempty"`
	ContactName      string                   `json:"contact_name"`
	ItemID           *UUID                    `json:"item_id,omitempty"`
	ItemName         string                   `json:"item_name"`
	CompanyID        *UUID                    `json:"company_id,omitempty"`
	CompanyName      string                   `json:"company_name"`
	Status           string                   `json:"status"`
	ExecutedOn       *string                  `json:"executed_on,omitempty"`
	Overdue          bool                     `json:"overdue"`
	DocumentID       *UUID                    `json:"document_id,omitempty"`
	OperationID      *UUID                    `json:"operation_id,omitempty"`
	OperationKind    *string                  `json:"operation_kind,omitempty"`
	OperationVersion *int64                   `json:"operation_version,omitempty"`
	ContractID       *UUID                    `json:"contract_id,omitempty"`
	// InvoiceID — Карточка выставленного счёта у происхождения invoice; учётным документом счёт не является
	InvoiceID *UUID `json:"invoice_id,omitempty"`
	// Expectation — Строка ожидания, а не долга: счёт и этап договора обещают деньги, но требовать по ним нельзя
	Expectation *bool `json:"expectation,omitempty"`
	// Undated — Обязательство без срока оплаты: рядом со шкалой, а не на ней
	Undated *bool `json:"undated,omitempty"`
	// WithheldFromPayout — Сумма удерживается контрагентом из будущей выплаты нам, а не уходит переводом: строка стоит во входящих с отрицательной суммой (неделя маркетплейса с перевесом возвратов)
	WithheldFromPayout *bool               `json:"withheld_from_payout,omitempty"`
	Fact               *FinancePaymentFact `json:"fact,omitempty"`
}

type FinancePaymentCalendarSource struct {
	ID       UUID                         `json:"id"`
	Kind     FinancePaymentSourceKind     `json:"kind"`
	Name     string                       `json:"name"`
	Currency string                       `json:"currency"`
	Opening  string                       `json:"opening"`
	Inflow   string                       `json:"inflow"`
	Outflow  string                       `json:"outflow"`
	Closing  string                       `json:"closing"`
	Cells    []FinancePaymentCalendarCell `json:"cells"`
}

type FinancePaymentFact struct {
	DocumentID   UUID             `json:"document_id"`
	Kind         string           `json:"kind"`
	Number       string           `json:"number"`
	Date         string           `json:"date"`
	Direction    FinanceDirection `json:"direction"`
	Amount       string           `json:"amount"`
	Currency     string           `json:"currency"`
	SourceName   string           `json:"source_name"`
	Counterparty string           `json:"counterparty"`
	Purpose      string           `json:"purpose"`
	UsedByPlanID *UUID            `json:"used_by_plan_id,omitempty"`
	Item         *UUID            `json:"item,omitempty"`
	// ItemName — Название статьи ДДС; пусто у неразнесённой операции
	ItemName *string `json:"item_name,omitempty"`
	// Allocated — Разнесена ли операция: есть ли у неё статья ДДС. Тот же признак отдаёт журнал кассы, и ответ на этот вопрос у обоих один.
	Allocated bool `json:"allocated"`
}

type FinancePaymentFactPage struct {
	Results []FinancePaymentFact `json:"results"`
}

type FinancePaymentPlan struct {
	ProjectID          *UUID                    `json:"project_id,omitempty"`
	ID                 UUID                     `json:"id"`
	CompanyID          *UUID                    `json:"company_id,omitempty"`
	Direction          FinanceDirection         `json:"direction"`
	PlanDate           string                   `json:"plan_date"`
	Amount             string                   `json:"amount"`
	Currency           string                   `json:"currency"`
	SourceKind         FinancePaymentSourceKind `json:"source_kind"`
	AccountID          *UUID                    `json:"account_id,omitempty"`
	WalletID           *UUID                    `json:"wallet_id,omitempty"`
	ContactID          *UUID                    `json:"contact_id,omitempty"`
	ItemID             *UUID                    `json:"item_id,omitempty"`
	Title              string                   `json:"title"`
	Note               string                   `json:"note"`
	Status             string                   `json:"status"`
	ExecutedOn         *string                  `json:"executed_on,omitempty"`
	ExecutedDocumentID *UUID                    `json:"executed_document_id,omitempty"`
	CreatedAt          string                   `json:"created_at"`
	UpdatedAt          string                   `json:"updated_at"`
}

type FinancePaymentPlanInput struct {
	ProjectID *UUID            `json:"project_id,omitempty"`
	CompanyID UUID             `json:"company_id"`
	Direction FinanceDirection `json:"direction"`
	PlanDate  string           `json:"plan_date"`
	// Amount — Positive decimal string
	Amount     string                   `json:"amount"`
	Currency   string                   `json:"currency"`
	SourceKind FinancePaymentSourceKind `json:"source_kind"`
	AccountID  *UUID                    `json:"account_id,omitempty"`
	WalletID   *UUID                    `json:"wallet_id,omitempty"`
	ContactID  *UUID                    `json:"contact_id,omitempty"`
	ItemID     *UUID                    `json:"item_id,omitempty"`
	Title      string                   `json:"title"`
	Note       *string                  `json:"note,omitempty"`
}

type FinancePaymentSourceKind = string

type FinancePayrollAutomationSettings struct {
	// AutoAccrual — Ежемесячно заводить черновики начисления по штату
	AutoAccrual bool `json:"auto_accrual"`
}

type FinancePayrollRun struct {
	ID         UUID   `json:"id"`
	ScopeKey   string `json:"scope_key"`
	CompanyID  *UUID  `json:"company_id,omitempty"`
	BusinessID *UUID  `json:"business_id,omitempty"`
	ScopeName  string `json:"scope_name"`
	// Month — Месяц в формате YYYY-MM
	Month      string  `json:"month"`
	Status     string  `json:"status"`
	DocumentID *UUID   `json:"document_id,omitempty"`
	Number     *string `json:"number,omitempty"`
	// Error — Причина блокировки или ошибки
	Error     *string `json:"error,omitempty"`
	CreatedAt string  `json:"created_at"`
	UpdatedAt string  `json:"updated_at"`
}

type FinancePayrollRunList struct {
	Results []FinancePayrollRun `json:"results"`
}

type FinancePnlCoverage struct {
	Missing    []FinancePnlCoverageItem `json:"missing"`
	Duplicated []FinancePnlCoverageItem `json:"duplicated"`
	// Taxes — Налоги раздела «Налоги» за период без строки-источника «Налоги» в макете; итог и прибыль их включают
	Taxes *string `json:"taxes,omitempty"`
}

type FinancePnlCoverageItem struct {
	ID    UUID   `json:"id"`
	Name  string `json:"name"`
	Path  string `json:"path"`
	Times *int64 `json:"times,omitempty"`
}

type FinancePnlLine struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Sign   int64  `json:"sign"`
	Amount string `json:"amount"`
}

type FinancePnlReport struct {
	// UnassignedCompany — При отборе по юрлицу — результат движений без юрлица и всего бизнеса
	UnassignedCompany *FinancePnlReportUnassignedCompany `json:"unassigned_company,omitempty"`
	RnpMetrics        map[string]string                  `json:"rnp_metrics,omitempty"`
	Currency          *string                            `json:"currency,omitempty"`
	From              string                             `json:"from"`
	To                string                             `json:"to"`
	Revenue           string                             `json:"revenue"`
	Expense           string                             `json:"expense"`
	Profit            string                             `json:"profit"`
	UnclassifiedIn    string                             `json:"unclassified_in"`
	UnclassifiedOut   string                             `json:"unclassified_out"`
	Lines             []FinancePnlLine                   `json:"lines"`
	// Taxes — Налоги раздела «Налоги» по видам — строка ОПиУ «Налоги»
	Taxes []FinanceTaxKindAmount `json:"taxes,omitempty"`
	// TaxesTotal — Итог строки «Налоги»; входит в расходы и прибыль
	TaxesTotal *string `json:"taxes_total,omitempty"`
	// TaxesNotAllocated — Отбор по проекту или разрезу учёта — налоги начислены на юрлицо и на этот разрез не распределяются
	TaxesNotAllocated *bool                   `json:"taxes_not_allocated,omitempty"`
	LayoutRows        []FinancePnlReportRow   `json:"layout_rows,omitempty"`
	Layout            *FinancePnlReportLayout `json:"layout,omitempty"`
	Columns           []FinanceReportColumn   `json:"columns"`
	Companies         []FinanceReportCompany  `json:"companies,omitempty"`
	AccountingBasis   *AccountingBasis        `json:"accounting_basis,omitempty"`
}

// FinancePnlReportUnassignedCompany — При отборе по юрлицу — результат движений без юрлица и всего бизнеса
type FinancePnlReportUnassignedCompany struct {
	Profit         *string `json:"profit,omitempty"`
	BusinessProfit *string `json:"business_profit,omitempty"`
}

type FinancePnlReportLayout struct {
	ID         UUID               `json:"id"`
	Name       string             `json:"name"`
	IsDefault  bool               `json:"is_default"`
	Coverage   FinancePnlCoverage `json:"coverage"`
	SystemRows map[string]string  `json:"system_rows"`
}

type FinancePnlReportRow struct {
	ID          string  `json:"id"`
	Kind        string  `json:"kind"`
	Name        string  `json:"name"`
	Level       int64   `json:"level"`
	Collapsed   bool    `json:"collapsed"`
	HasChildren bool    `json:"has_children"`
	Amount      *string `json:"amount,omitempty"`
	Format      string  `json:"format"`
	SystemRow   *string `json:"system_row,omitempty"`
	Problem     *string `json:"problem,omitempty"`
	// TaxKind — Вид налога у строки вида налога и у подстроки «Налогов»
	TaxKind *string `json:"tax_kind,omitempty"`
}

type FinanceProject struct {
	ID               UUID                       `json:"id"`
	Name             string                     `json:"name"`
	Attrs            map[string]json.RawMessage `json:"attrs"`
	IsActive         bool                       `json:"is_active"`
	FirstFactDate    *string                    `json:"first_fact_date"`
	Revenue          string                     `json:"revenue"`
	Expense          string                     `json:"expense"`
	Profit           string                     `json:"profit"`
	Received         string                     `json:"received"`
	Paid             string                     `json:"paid"`
	Receivable       string                     `json:"receivable"`
	Payable          string                     `json:"payable"`
	CustomerAdvances string                     `json:"customer_advances"`
	SupplierAdvances string                     `json:"supplier_advances"`
	Margin           *string                    `json:"margin"`
	PlanRevenue      *string                    `json:"plan_revenue"`
	PlanExpense      *string                    `json:"plan_expense"`
	PlanProfit       *string                    `json:"plan_profit"`
	Lines            []FinanceProjectLine       `json:"lines"`
	Budgets          []FinanceProjectBudget     `json:"budgets"`
}

type FinanceProjectBudget struct {
	ID        UUID                       `json:"id"`
	ProjectID UUID                       `json:"project_id"`
	CompanyID UUID                       `json:"company_id"`
	Date      string                     `json:"date"`
	Currency  string                     `json:"currency"`
	Revision  int64                      `json:"revision"`
	Note      string                     `json:"note"`
	Lines     []FinanceProjectBudgetLine `json:"lines"`
	CreatedAt string                     `json:"created_at"`
}

type FinanceProjectBudgetInput = json.RawMessage

type FinanceProjectBudgetLine struct {
	ItemID UUID `json:"item_id"`
	// Amount — Положительная сумма или ноль; знак определяется статьёй
	Amount string `json:"amount"`
}

type FinanceProjectLine struct {
	ItemID   string  `json:"item_id"`
	Name     string  `json:"name"`
	Sign     int64   `json:"sign"`
	Actual   string  `json:"actual"`
	Plan     *string `json:"plan"`
	Variance *string `json:"variance"`
}

type FinanceProjectReport struct {
	On       string           `json:"on"`
	Currency string           `json:"currency"`
	Company  string           `json:"company"`
	Projects []FinanceProject `json:"projects"`
}

type FinanceReconciliation struct {
	Summary FinanceReconciliationSummary `json:"summary"`
	Results []FinanceTransaction         `json:"results"`
}

type FinanceReconciliationSummary struct {
	TotalCount          int64 `json:"total_count"`
	NeedsAttentionCount int64 `json:"needs_attention_count"`
	UnmatchedCount      int64 `json:"unmatched_count"`
	// MissingOrderCount — Входящие платежи без продажи или закупки и без проекта; имя поля сохранено для совместимости
	MissingOrderCount    int64 `json:"missing_order_count"`
	MissingCashflowCount int64 `json:"missing_cashflow_count"`
	// IncomingUnlinkedAmount — Сумма входящих платежей без продажи или закупки и без проекта; decimal string
	IncomingUnlinkedAmount string `json:"incoming_unlinked_amount"`
}

type FinanceRegisterAccountCheck struct {
	Account      string `json:"account"`
	Name         string `json:"name"`
	Register     string `json:"register"`
	Transactions string `json:"transactions"`
	Adjustments  string `json:"adjustments"`
	Match        bool   `json:"match"`
}

type FinanceRegisterReconciliation struct {
	Accounts         []FinanceRegisterAccountCheck `json:"accounts"`
	AccountsMatch    bool                          `json:"accounts_match"`
	UnprojectedCount int64                         `json:"unprojected_count"`
	UnpostedCount    int64                         `json:"unposted_count"`
	Ledger           []map[string]json.RawMessage  `json:"ledger"`
	LedgerMatch      bool                          `json:"ledger_match"`
	Unallocated      string                        `json:"unallocated"`
	Settlements      []map[string]json.RawMessage  `json:"settlements"`
	SettlementsMatch bool                          `json:"settlements_match"`
	Transit          []map[string]json.RawMessage  `json:"transit"`
	TransitTotal     string                        `json:"transit_total"`
	TransitMatch     bool                          `json:"transit_match"`
	// InputVATMatch — Нет минуса входного НДС по источнику без возврата поставщику после вычета.
	InputVATMatch *bool `json:"input_vat_match,omitempty"`
	// InputVATUnexplained — Источники с отрицательным остатком входного НДС, который не объяснён возвратом поставщику после вычета.
	InputVATUnexplained []FinanceRegisterReconciliationInputVatUnexplainedItem `json:"input_vat_unexplained,omitempty"`
	// Stock — Сверка стоимости склада с книгой по счетам запасов.
	Stock []FinanceRegisterReconciliationStockItem `json:"stock,omitempty"`
	// StockTransferPending — Остаток запасов, который после смены правила счёта лежит в книге на старом счёте и ещё не перенесён документом «Перенос остатка» (ERP-1146). Разрез — пара счетов.
	StockTransferPending []FinanceRegisterReconciliationStockTransferPendingItem `json:"stock_transfer_pending,omitempty"`
	// StockTransferHint — Пояснение к неперенесённому остатку для человека; пусто, если переносить нечего.
	StockTransferHint *string `json:"stock_transfer_hint,omitempty"`
}

type FinanceRegisterReconciliationInputVatUnexplainedItem struct {
	Source       string `json:"source"`
	SourceNumber string `json:"source_number"`
	SourceDate   string `json:"source_date"`
	Company      string `json:"company"`
	Amount       string `json:"amount"`
}

type FinanceRegisterReconciliationStockItem struct {
	// TransferPendingOut — Неперенесённый остаток, который уйдёт с этого счёта документом «Перенос остатка» (ERP-1146); нет поля — переносить нечего.
	TransferPendingOut *string `json:"transfer_pending_out,omitempty"`
	// TransferPendingIn — Неперенесённый остаток, который придёт на этот счёт документом «Перенос остатка» (ERP-1146); нет поля — переносить нечего.
	TransferPendingIn *string `json:"transfer_pending_in,omitempty"`
}

type FinanceRegisterReconciliationStockTransferPendingItem struct {
	FromCode   string `json:"from_code"`
	ToCode     string `json:"to_code"`
	Amount     string `json:"amount"`
	Warehouses int64  `json:"warehouses"`
}

type FinanceRegisterRepairFailure struct {
	ID UUID `json:"id"`
	// Code — Machine-readable reason (not_found, nothing_to_restore, wrong_document_type, period_closed, document_changed, payload_invalid, ledger_setup_missing, balance_shortage, ledger_imbalance, unexpected).
	Code string `json:"code"`
	// Error — Human-readable reason in the request language; an internal failure carries the case code instead of the raw error.
	Error string `json:"error"`
}

type FinanceRegisterRepairRequest struct {
	TransactionIds  []UUID `json:"transaction_ids,omitempty"`
	CashDocumentIds []UUID `json:"cash_document_ids,omitempty"`
}

type FinanceRegisterRepairResult struct {
	TransactionsRepaired  int64                          `json:"transactions_repaired"`
	CashDocumentsRepaired int64                          `json:"cash_documents_repaired"`
	Failures              []FinanceRegisterRepairFailure `json:"failures"`
}

type FinanceRegistersResyncResult struct {
	Projected           int64 `json:"projected"`
	Healed              int64 `json:"healed"`
	BankReposted        int64 `json:"bank_reposted"`
	CashReposted        int64 `json:"cash_reposted"`
	SettlementsReposted int64 `json:"settlements_reposted"`
	Failed              int64 `json:"failed"`
}

type FinanceReportColumn struct {
	Key     string                     `json:"key"`
	Label   string                     `json:"label"`
	From    string                     `json:"from"`
	To      string                     `json:"to"`
	Total   bool                       `json:"total"`
	Payload map[string]json.RawMessage `json:"payload"`
}

type FinanceReportCompany struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type FinanceRequisitesBank struct {
	Name                 string `json:"name"`
	BIC                  string `json:"bic"`
	CorrespondentAccount string `json:"correspondent_account"`
	City                 string `json:"city"`
	// INN — ИНН банка; пусто — справочник не назвал
	INN string `json:"inn"`
	// KPP — КПП банка; пусто — справочник не назвал
	KPP string `json:"kpp"`
}

type FinanceResponsiblePatch struct {
	Responsible *string `json:"responsible"`
}

type FinanceSaleLineInput struct {
	// ProductID — Товар строки; без него строка обязана назвать name
	ProductID *string `json:"product_id,omitempty"`
	// UnitID — Единица измерения строки
	UnitID *string `json:"unit_id,omitempty"`
	// Unit — Единица словами, когда справочной нет
	Unit *string `json:"unit,omitempty"`
	// Name — Наименование строки; у строки с товаром необязательно — его даёт карточка товара
	Name *string `json:"name,omitempty"`
	// Quantity — Положительная decimal string
	Quantity string `json:"quantity"`
	// Price — Цена единицы в режиме prices_include_vat документа
	Price string `json:"price"`
	// Discount — Скидка строки суммой, в том же режиме цены
	Discount *string `json:"discount,omitempty"`
	// Kind — ПрТовРаб формата ФНС: 1 товар, 3 услуга; пусто — товар, если назван товар, иначе услуга
	Kind *string `json:"kind,omitempty"`
}

type FinanceSettlementBalance struct {
	ObligationID UUID `json:"obligation_id"`
	// Remaining — Decimal string
	Remaining string `json:"remaining"`
}

type FinanceSettlementBalancePage struct {
	Count   int64                      `json:"count"`
	Results []FinanceSettlementBalance `json:"results"`
}

type FinanceSettlementDocumentCreate struct {
	TypeKey   FinanceSettlementDocumentType `json:"type_key"`
	Number    *string                       `json:"number,omitempty"`
	Date      *string                       `json:"date,omitempty"`
	CompanyID UUID                          `json:"company_id"`
	ContactID UUID                          `json:"contact_id"`
	Currency  string                        `json:"currency"`
	// Amount — Положительная decimal string для долгов, авансов, сделок, зачёта и распределения
	Amount *string `json:"amount,omitempty"`
	// DueDate — Обязательна для долга, продажи и закупки
	DueDate *string `json:"due_date,omitempty"`
	// ObligationID — Обязательно для зачёта аванса, распределения оплаты и возврата по продаже (продажа-основание)
	ObligationID *string `json:"obligation_id,omitempty"`
	// PaymentID — Оплата-источник аванса либо обязательная оплата для распределения
	PaymentID *string                                  `json:"payment_id,omitempty"`
	Sources   []FinanceSettlementSourceAllocationInput `json:"sources,omitempty"`
	// AdvanceID — Обязателен для зачёта аванса
	AdvanceID *string `json:"advance_id,omitempty"`
	// PNLItemID — Обязательна для продажи и закупки
	PNLItemID *string `json:"pnl_item_id,omitempty"`
	// ProjectID — Путешествие или проект продажи и закупки
	ProjectID *string `json:"project_id,omitempty"`
	// Side — Обязательна только для аванса
	Side *string `json:"side,omitempty"`
	// StockReturnID — Только возврат по продаже: складской возврат от покупателя по этой продаже; без amount сумма — доля продажи по количеству
	StockReturnID *string `json:"stock_return_id,omitempty"`
	Comment       *string `json:"comment,omitempty"`
	// SourceSystem — Ключ идемпотентности сделки (только продажа и закупка): система-источник — учётная система клиента или ключ стороннего приложения
	SourceSystem *string `json:"source_system,omitempty"`
	// SourceRef — Какая именно база/кабинет клиента внутри source_system; пусто — единственный источник
	SourceRef *string `json:"source_ref,omitempty"`
	// ExternalID — Идентификатор сделки в source_system; повтор того же (source_system, source_ref, external_id) возвращает уже созданный документ вместо второго
	ExternalID *string `json:"external_id,omitempty"`
	// VATAmount — Только закупка: «в т.ч. НДС» документа поставщика (ERP-484, подшаг 5.3). Обязательна, если на дату бизнес очищает суммы и юрлицо принимает налог к вычету; 0 — налог не выделен. Вне периода непустое значение — 400
	VATAmount        *string           `json:"vat_amount,omitempty"`
	SupplierDocument *SupplierDocument `json:"supplier_document,omitempty"`
	// Lines — Только продажа (ERP-1265): строки товаров и услуг. Сумма продажи — сумма строк; переданная рядом amount обязана с ней совпасть. Налог считается по строке — по виду товара строки и режиму юрлица на дату
	Lines []FinanceSaleLineInput `json:"lines,omitempty"`
	// PricesIncludeVAT — Только вместе со строками: цены строк включают налог (умолчание) либо налог начисляется сверху
	PricesIncludeVAT *bool `json:"prices_include_vat,omitempty"`
}

type FinanceSettlementDocumentType = string

type FinanceSettlementExposure struct {
	Available bool   `json:"available"`
	AsOf      string `json:"as_of"`
	ContactID UUID   `json:"contact_id"`
	CompanyID UUID   `json:"company_id"`
	Currency  string `json:"currency"`
	// Receivable — Decimal string. What the counterparty owes us (side receivable); equals the receivable column of settlement positions for the same scope.
	Receivable string `json:"receivable"`
	// Overdue — Decimal string. Part of receivable whose due date has passed.
	Overdue string `json:"overdue"`
	// Undated — Decimal string. Part of receivable without a due date; it is never overdue, so zero overdue does not mean everything is on time.
	Undated         string `json:"undated"`
	OpenObligations int64  `json:"open_obligations"`
	Source          string `json:"source"`
}

type FinanceSettlementPayment struct {
	Document CoreDocument `json:"document"`
	// Remaining — Decimal string
	Remaining string `json:"remaining"`
}

type FinanceSettlementPaymentPage struct {
	Count   int64                      `json:"count"`
	Results []FinanceSettlementPayment `json:"results"`
}

type FinanceSettlementSource struct {
	ID       UUID   `json:"id"`
	TypeKey  string `json:"type_key"`
	TypeName string `json:"type_name"`
	Number   string `json:"number"`
	Date     string `json:"date"`
	Status   string `json:"status"`
	// AvailableAmount — Decimal string
	AvailableAmount string `json:"available_amount"`
}

type FinanceSettlementSourceAllocationInput struct {
	DocumentID UUID `json:"document_id"`
	// Amount — Положительная decimal string; сумма строк должна совпасть с amount документа
	Amount string `json:"amount"`
}

type FinanceSettlementSourcePage struct {
	Count   int64                     `json:"count"`
	Results []FinanceSettlementSource `json:"results"`
}

type FinanceStatement struct {
	ID          UUID   `json:"id"`
	Account     UUID   `json:"account"`
	AccountName string `json:"account_name"`
	DateFrom    string `json:"date_from"`
	DateTo      string `json:"date_to"`
	// OpeningBalance — Decimal string
	OpeningBalance string `json:"opening_balance"`
	// ClosingBalance — Decimal string
	ClosingBalance string `json:"closing_balance"`
	Provider       string `json:"provider"`
	ImportedAt     string `json:"imported_at"`
}

type FinanceStatementCreate struct {
	Account  UUID   `json:"account"`
	DateFrom string `json:"date_from"`
	DateTo   string `json:"date_to"`
	// OpeningBalance — Decimal string
	OpeningBalance *string `json:"opening_balance,omitempty"`
	// ClosingBalance — Decimal string
	ClosingBalance *string `json:"closing_balance,omitempty"`
	Provider       *string `json:"provider,omitempty"`
}

type FinanceStatementLinkInput struct {
	Transactions []FinanceStatementLinkInputTransactionsItem `json:"transactions"`
}

type FinanceStatementLinkInputTransactionsItem struct {
	TransactionID       UUID    `json:"transaction_id"`
	PreviousStatementID *string `json:"previous_statement_id"`
}

type FinanceStatementLinkResult struct {
	StatementID UUID  `json:"statement_id"`
	Linked      int64 `json:"linked"`
	Unchanged   int64 `json:"unchanged"`
}

type FinanceStatementPage struct {
	Count int64 `json:"count"`
	// Limit — Применённый размер страницы — после зажима до потолка
	Limit int64 `json:"limit"`
	// Offset — Применённое смещение
	Offset  int64              `json:"offset"`
	Results []FinanceStatement `json:"results"`
}

// FinanceTaxKind — Вид налога кабинета.
type FinanceTaxKind struct {
	// Code — Код вида из перечня закона
	Code string `json:"code"`
	// Name — Название вида в кабинете
	Name string `json:"name"`
	// PNLExpense — Налог-расход — начисление идёт в строку ОПиУ «Налоги»
	PNLExpense bool `json:"pnl_expense"`
	// Sort — Порядок показа
	Sort int64 `json:"sort"`
}

type FinanceTaxKindAmount struct {
	// Kind — Код вида налога
	Kind string `json:"kind"`
	// Amount — Сумма
	Amount string `json:"amount"`
	// Name — Название вида налога в кабинете
	Name *string `json:"name,omitempty"`
}

type FinanceTaxKindPage struct {
	Items []FinanceTaxKind `json:"items"`
}

// FinanceTaxMonth — Документ «Налоги за месяц».
type FinanceTaxMonth struct {
	ID     UUID   `json:"id"`
	Number string `json:"number"`
	// Date — Последний день месяца
	Date string `json:"date"`
	// Status — Статус документа
	Status string `json:"status"`
	// CompanyID — Юрлицо
	CompanyID string                 `json:"company_id"`
	Comment   string                 `json:"comment"`
	UpdatedAt string                 `json:"updated_at"`
	Payload   FinanceTaxMonthPayload `json:"payload"`
}

// FinanceTaxMonthInput — Новый черновик «Налоги за месяц».
type FinanceTaxMonthInput struct {
	CompanyID *UUID                 `json:"company_id,omitempty"`
	Year      *int64                `json:"year,omitempty"`
	Month     *int64                `json:"month,omitempty"`
	Lines     []FinanceTaxMonthLine `json:"lines,omitempty"`
	// Opening — Сальдо ЕНС на начало учёта — только в первом документе юрлица; плюс — долг, минус — переплата
	Opening *string `json:"opening,omitempty"`
	Comment *string `json:"comment,omitempty"`
}

// FinanceTaxMonthLine — Строка начисления.
type FinanceTaxMonthLine struct {
	// Kind — Код вида налога
	Kind string `json:"kind"`
	// Amount — Сумма со знаком; минус — уменьшение по декларации
	Amount string `json:"amount"`
	// Comment — Комментарий строки
	Comment *string `json:"comment,omitempty"`
	// Source — Строку заполнил сервер — из начислений зарплаты или «НДС за квартал»; во входе такие строки игнорируются
	Source *string `json:"source,omitempty"`
	// Declared — Сумма по декларации; строка с ней — строка декларации за прошлый период
	Declared *string `json:"declared,omitempty"`
	// Calculated — Расчёт раздела за период декларации; заполняет сервер
	Calculated *string `json:"calculated,omitempty"`
	// PeriodFrom — Начало периода декларации
	PeriodFrom *string `json:"period_from,omitempty"`
	// PeriodTo — Конец периода декларации; не позже конца месяца документа
	PeriodTo *string `json:"period_to,omitempty"`
}

type FinanceTaxMonthPage struct {
	Items []FinanceTaxMonth `json:"items"`
}

type FinanceTaxMonthPayload struct {
	Version  int64                    `json:"version"`
	Year     int64                    `json:"year"`
	Month    int64                    `json:"month"`
	Lines    []FinanceTaxMonthLine    `json:"lines"`
	Payments []FinanceTaxMonthPayment `json:"payments,omitempty"`
	// Opening — Сальдо ЕНС на начало учёта; плюс — долг перед бюджетом, минус — переплата
	Opening *string `json:"opening,omitempty"`
}

// FinanceTaxMonthPayment — Пополнение ЕНС за месяц, собранное сервером.
type FinanceTaxMonthPayment struct {
	// Document — Документ банковской операции
	Document string `json:"document"`
	Date     string `json:"date"`
	// Amount — Сумма платежа
	Amount string `json:"amount"`
}

// FinanceTaxMonthUpdateInput — Пересохранение черновика «Налоги за месяц» — строки и комментарий.
type FinanceTaxMonthUpdateInput struct {
	Lines []FinanceTaxMonthLine `json:"lines,omitempty"`
	// Opening — Сальдо ЕНС на начало учёта — только в первом документе юрлица; плюс — долг, минус — переплата
	Opening *string `json:"opening,omitempty"`
	Comment *string `json:"comment,omitempty"`
}

// FinanceTaxPayment — Платёж по статье налогов.
type FinanceTaxPayment struct {
	Company     UUID   `json:"company"`
	Transaction UUID   `json:"transaction"`
	Document    UUID   `json:"document"`
	Date        string `json:"date"`
	// Amount — Сумма платежа
	Amount string `json:"amount"`
	// CounterpartyName — Получатель
	CounterpartyName string `json:"counterparty_name"`
	// CounterpartyINN — ИНН получателя
	CounterpartyINN string `json:"counterparty_inn"`
	// CounterpartyAccount — Счёт получателя
	CounterpartyAccount string `json:"counterparty_account"`
	// Ens — Пополнение единого налогового счёта по правилу раздела
	Ens bool `json:"ens"`
}

type FinanceTaxPaymentPage struct {
	Items []FinanceTaxPayment `json:"items"`
}

// FinanceTaxRecipient — Получатель единого налогового счёта.
type FinanceTaxRecipient struct {
	// INN — ИНН получателя — 10 или 12 цифр
	INN string `json:"inn"`
	// Account — Счёт получателя; пусто — любой счёт этого ИНН
	Account *string `json:"account,omitempty"`
	// Name — Название получателя для экрана
	Name *string `json:"name,omitempty"`
}

type FinanceTaxRecipientFromPaymentInput struct {
	TransactionID UUID `json:"transaction_id"`
}

// FinanceTaxSettings — Настройка раздела «Налоги».
type FinanceTaxSettings struct {
	// PaymentItemIds — Статьи ДДС платежей налогов в порядке выбора; пусто — не настроены
	PaymentItemIds []string `json:"payment_item_ids"`
	// EnsRecipients — Получатели единого налогового счёта
	EnsRecipients []FinanceTaxRecipient `json:"ens_recipients"`
}

// FinanceTaxSettingsInput — Настройка раздела «Налоги» целиком.
type FinanceTaxSettingsInput struct {
	// PaymentItemIds — Статьи ДДС вида «Налоги»; пустой список — снять все
	PaymentItemIds []string `json:"payment_item_ids,omitempty"`
	// EnsRecipients — Получатели единого налогового счёта
	EnsRecipients []FinanceTaxRecipient `json:"ens_recipients,omitempty"`
}

// FinanceTaxSummary — Сальдо ЕНС юрлица и обороты отрезка из регистра раздела. Плюс — долг перед бюджетом, минус — переплата.
type FinanceTaxSummary struct {
	Company  UUID   `json:"company"`
	DateFrom string `json:"date_from"`
	DateTo   string `json:"date_to"`
	// Opening — Сальдо ЕНС на начало отрезка
	Opening string `json:"opening"`
	// Accrued — Начислено по видам налогов
	Accrued []FinanceTaxKindAmount `json:"accrued"`
	// AccruedTotal — Начислено всего
	AccruedTotal string `json:"accrued_total"`
	// Paid — Пополнено ЕНС
	Paid string `json:"paid"`
	// Closing — Сальдо ЕНС на конец отрезка
	Closing string `json:"closing"`
}

type FinanceTransaction struct {
	ID        UUID             `json:"id"`
	Date      string           `json:"date"`
	Direction FinanceDirection `json:"direction"`
	// Amount — Positive decimal string
	Amount              string  `json:"amount"`
	Currency            string  `json:"currency"`
	CounterpartyName    string  `json:"counterparty_name"`
	CounterpartyINN     string  `json:"counterparty_inn"`
	CounterpartyAccount string  `json:"counterparty_account"`
	Purpose             string  `json:"purpose"`
	BankTxnID           string  `json:"bank_txn_id"`
	Account             UUID    `json:"account"`
	AccountName         string  `json:"account_name"`
	Statement           *string `json:"statement"`
	CashflowItem        *string `json:"cashflow_item"`
	CashflowItemName    *string `json:"cashflow_item_name"`
	CashflowSection     *string `json:"cashflow_section"`
	PNLItem             *string `json:"pnl_item"`
	PNLItemName         *string `json:"pnl_item_name"`
	Contact             *string `json:"contact"`
	ContactName         *string `json:"contact_name"`
	// ForContact — «За кого»: контрагент из папки «Сотрудники» или «Собственники», чей расчёт гасит платёж. Пусто — как контрагент: платили самому человеку
	ForContact     *string `json:"for_contact,omitempty"`
	ForContactName *string `json:"for_contact_name,omitempty"`
	// ContactEmployee — Сотрудник, связанный с контрагентом. У зарплаты пустое «За кого» при нём означает самого получателя
	ContactEmployee *string `json:"contact_employee,omitempty"`
	Order           *string `json:"order"`
	OrderNumber     *string `json:"order_number"`
	Project         *string `json:"project"`
	ProjectName     *string `json:"project_name"`
	// Responsible — Инициатор: кто завёл или согласовал платёж. В проводки не идёт; чей расчёт гасится, задаёт for_contact
	Responsible               *string                    `json:"responsible,omitempty"`
	ResponsibleName           *string                    `json:"responsible_name,omitempty"`
	OrderTotal                *string                    `json:"order_total"`
	OrderPaidPercent          int64                      `json:"order_paid_percent"`
	MatchState                string                     `json:"match_state"`
	ReconciliationState       string                     `json:"reconciliation_state"`
	ReconciliationNeeds       []string                   `json:"reconciliation_needs"`
	ClassificationExplanation string                     `json:"classification_explanation"`
	SuggestedOrder            map[string]json.RawMessage `json:"suggested_order"`
	SuggestedCashflowItem     map[string]json.RawMessage `json:"suggested_cashflow_item"`
	SuggestedPNLItem          map[string]json.RawMessage `json:"suggested_pnl_item"`
	CreatedAt                 string                     `json:"created_at"`
	UpdatedAt                 string                     `json:"updated_at"`
}

type FinanceTransactionCategorize struct {
	CashflowItem *string `json:"cashflow_item,omitempty"`
	Contact      *string `json:"contact,omitempty"`
	// ForContact — «За кого»: чей расчёт гасит платёж. У зарплаты — контрагент из папки «Сотрудники», у расчётов с собственником — контрагент из состава владельцев на дату платежа. Пусто — как контрагент. Не присланное поле остаётся как было.
	ForContact *string `json:"for_contact,omitempty"`
	Order      *string `json:"order,omitempty"`
	Project    *string `json:"project,omitempty"`
	// Suggestion — Рекомендация внешнего расширения, которую человек принимает этим вызовом. Не второй способ назвать статью: статья берётся из самой рекомендации, а поле отвечает на другой вопрос — чей совет сработал. Названная в теле другая статья — отказ, а не тихая победа одного из двух значений. Рекомендация с чужой операции и уже решённая отвечают так же, как несуществующая.
	Suggestion *string `json:"suggestion,omitempty"`
}

type FinanceTransactionCreate struct {
	Account             UUID             `json:"account"`
	Statement           *string          `json:"statement,omitempty"`
	Date                string           `json:"date"`
	Direction           FinanceDirection `json:"direction"`
	Amount              string           `json:"amount"`
	Currency            *string          `json:"currency,omitempty"`
	CounterpartyName    *string          `json:"counterparty_name,omitempty"`
	CounterpartyINN     *string          `json:"counterparty_inn,omitempty"`
	CounterpartyAccount *string          `json:"counterparty_account,omitempty"`
	Purpose             *string          `json:"purpose,omitempty"`
	// BankTxnID — Если пуст, сервер строит детерминированный ключ из операции
	BankTxnID    *string `json:"bank_txn_id,omitempty"`
	CashflowItem *string `json:"cashflow_item,omitempty"`
	Contact      *string `json:"contact,omitempty"`
	Order        *string `json:"order,omitempty"`
	Project      *string `json:"project,omitempty"`
}

type FinanceTransactionPage struct {
	// Count — Строк на этой странице
	Count int64 `json:"count"`
	// Total — Сколько операций отвечает отбору целиком; сравнение с count говорит, есть ли ещё страницы
	Total   int64                    `json:"total"`
	Results []FinanceTransaction     `json:"results"`
	Totals  FinanceTransactionTotals `json:"totals"`
}

// FinanceTransactionRestoreResult — Какие операции вернулись в учёт и какие нет.
type FinanceTransactionRestoreResult struct {
	// Restored — Возвращённые операции.
	Restored []UUID `json:"restored"`
	// Failed — Операции, которые вернуть не удалось, с причиной.
	Failed []FinanceTransactionRestoreResultFailedItem `json:"failed"`
}

type FinanceTransactionRestoreResultFailedItem struct {
	ID UUID `json:"id"`
	// Reason — Причина отказа для человека.
	Reason string `json:"reason"`
}

// FinanceTransactionTotals — Итоги по всему отбору, а не по странице. Суммы в валюте учёта по историческому курсу
type FinanceTransactionTotals struct {
	// Inflow — Приход; null, когда итог не посчитан
	Inflow *string `json:"inflow"`
	// Outflow — Расход; null, когда итог не посчитан
	Outflow  *string `json:"outflow"`
	Currency string  `json:"currency"`
	// UnconvertedCount — Сколько операций осталось без пересчёта в валюту учёта: неполный пересчёт не должен выглядеть верным итогом
	UnconvertedCount int64 `json:"unconverted_count"`
}

type FinanceZReportInput struct {
	CompanyID UUID   `json:"company_id"`
	Date      string `json:"date"`
	// ShiftNumber — Номер смены ККТ; пусто — один отчёт на юрлицо и день
	ShiftNumber *string `json:"shift_number,omitempty"`
	// PNLItemID — Статья выручки; пусто — статья продажи дня или умолчание
	PNLItemID map[string]json.RawMessage `json:"pnl_item_id,omitempty"`
	Lines     []FinanceZReportLine       `json:"lines"`
	// Cash — Наличные смены, decimal string
	Cash *string `json:"cash,omitempty"`
	// CashWalletID — Касса для наличных; обязательна, если наличные больше нуля
	CashWalletID map[string]json.RawMessage `json:"cash_wallet_id,omitempty"`
	// CashItemID — Статья движения денег для прихода наличных
	CashItemID map[string]json.RawMessage `json:"cash_item_id,omitempty"`
	// Card — Оплаты картой и СБП для сверки, decimal string
	Card *string `json:"card,omitempty"`
}

type FinanceZReportLine struct {
	// ProductID — Услуга из каталога; без неё нужно название
	ProductID map[string]json.RawMessage `json:"product_id,omitempty"`
	// Title — Название услуги, если каталога нет
	Title *string `json:"title,omitempty"`
	// Quantity — Количество больше нуля, decimal string
	Quantity string `json:"quantity"`
	// Amount — Сумма строки с НДС больше нуля, decimal string
	Amount string `json:"amount"`
}

type FinanceZReportResult struct {
	// Key — Ключ отчёта: юрлицо, день и смена
	Key            string  `json:"key"`
	Replayed       bool    `json:"replayed"`
	OrderID        string  `json:"order_id"`
	OrderNumber    string  `json:"order_number"`
	ActDocumentID  string  `json:"act_document_id"`
	CashDocumentID *string `json:"cash_document_id,omitempty"`
	// Revenue — Сумма услуг
	Revenue string `json:"revenue"`
	// Paid — Наличные и карта
	Paid string `json:"paid"`
	// Difference — Услуги минус оплаты: долг или аванс дня
	Difference string `json:"difference"`
	Card       string `json:"card"`
}

type HubCounters struct {
	Files      int64 `json:"files"`
	Meetings   int64 `json:"meetings"`
	Secrets    int64 `json:"secrets"`
	TasksTotal int64 `json:"tasks_total"`
	TasksDone  int64 `json:"tasks_done"`
}

type HubOverview struct {
	Project          HubProject    `json:"project"`
	Sections         []HubSection  `json:"sections"`
	LastStatus       *StatusUpdate `json:"last_status"`
	MeetingsUpcoming []Meeting     `json:"meetings_upcoming"`
	MeetingsRecent   []Meeting     `json:"meetings_recent"`
}

type HubProject struct {
	ID          UUID   `json:"id"`
	Key         string `json:"key"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Color       string `json:"color"`
	ContactID   *UUID  `json:"contact_id"`
	ContactName string `json:"contact_name"`
	// BusinessID — Бизнес проекта (заменил информационное юрлицо); null — проект всего кабинета
	BusinessID *UUID       `json:"business_id"`
	StartDate  string      `json:"start_date"`
	TargetDate string      `json:"target_date"`
	LeadUserID *int64      `json:"lead_user_id"`
	LeadName   string      `json:"lead_name"`
	Counters   HubCounters `json:"counters"`
}

type HubSection struct {
	ID         UUID          `json:"id"`
	ProjectID  UUID          `json:"project_id"`
	Kind       string        `json:"kind"`
	Title      string        `json:"title"`
	Icon       string        `json:"icon"`
	SortOrder  int64         `json:"sort_order"`
	IsEnabled  bool          `json:"is_enabled"`
	Visibility HubVisibility `json:"visibility"`
	CreatedAt  string        `json:"created_at"`
	UpdatedAt  string        `json:"updated_at"`
}

type HubSectionPage struct {
	Count   int64        `json:"count"`
	Results []HubSection `json:"results"`
}

type HubSectionUpdate struct {
	Title      *string        `json:"title,omitempty"`
	Icon       *string        `json:"icon,omitempty"`
	SortOrder  *int64         `json:"sort_order,omitempty"`
	IsEnabled  *bool          `json:"is_enabled,omitempty"`
	Visibility *HubVisibility `json:"visibility,omitempty"`
}

type HubVisibility = string

type KnowledgeACLGrant struct {
	ID            *UUID  `json:"id,omitempty"`
	PrincipalType string `json:"principal_type"`
	// PrincipalKey — Ключ принципала: id пользователя, UUID роли, UUID подразделения из справочника departments или * для всех
	PrincipalKey string `json:"principal_key"`
	// CanRead — Уровень «Просмотр»
	CanRead bool `json:"can_read"`
	// CanWrite — Уровень «Редактирование»; включает просмотр
	CanWrite *bool `json:"can_write,omitempty"`
	// CanPublish — Уровень «Публикация»; включает редактирование
	CanPublish *bool `json:"can_publish,omitempty"`
	// CanManage — Уровень «Владелец»; живёт только на пространстве и только у пользователя
	CanManage *bool `json:"can_manage,omitempty"`
}

type KnowledgeAccessOption struct {
	Key   string `json:"key"`
	Label string `json:"label"`
}

type KnowledgeAccessOptions struct {
	Users       []KnowledgeAccessOption `json:"users"`
	Roles       []KnowledgeAccessOption `json:"roles"`
	Departments []KnowledgeAccessOption `json:"departments"`
}

type KnowledgeAnswer struct {
	ID        UUID                `json:"id"`
	Answer    string              `json:"answer"`
	Citations []KnowledgeCitation `json:"citations"`
	// Abstained — Опоры в материалах не нашлось, и ответ не выдуман
	Abstained     bool   `json:"abstained"`
	Generated     bool   `json:"generated"`
	RetrievalMode string `json:"retrieval_mode"`
}

type KnowledgeAnswerInput struct {
	Question string `json:"question"`
	// Limit — Сколько фрагментов-опор искать; по умолчанию 6
	Limit *int64 `json:"limit,omitempty"`
	// History — Предыдущие ходы диалога; доступ они не расширяют
	History []KnowledgeAnswerTurn `json:"history,omitempty"`
	// Scope — Где искать: company — материалы компании, guides — встроенные руководства продукта, all — оба корпуса
	Scope *string `json:"scope,omitempty"`
	// CitationsOnly — Не сочинять ответ моделью, вернуть только найденные фрагменты и извлечённую сводку. Для того, кто говорит своим голосом и сам собирает ответ из цитат: без генерации ответ приходит за время поиска
	CitationsOnly *bool `json:"citations_only,omitempty"`
}

type KnowledgeAnswerTurn struct {
	Question string `json:"question"`
	Answer   string `json:"answer"`
}

type KnowledgeAsset struct {
	ID            UUID   `json:"id"`
	SpaceID       UUID   `json:"space_id"`
	NodeID        UUID   `json:"node_id"`
	Name          string `json:"name"`
	MimeType      string `json:"mime_type"`
	SizeBytes     int64  `json:"size_bytes"`
	ContentSha256 string `json:"content_sha256"`
	// ProcessingStatus — Разбор файла для индекса: pending, processing, ready, failed или unsupported
	ProcessingStatus string `json:"processing_status"`
	// ScanStatus — Вердикт антивируса. В поисковый разбор идёт только clean; skipped — файл антивирус не проверял
	ScanStatus      string  `json:"scan_status"`
	ParserName      *string `json:"parser_name,omitempty"`
	ParserVersion   *string `json:"parser_version,omitempty"`
	ProcessingError *string `json:"processing_error,omitempty"`
	ProcessedAt     *string `json:"processed_at,omitempty"`
	UploadedBy      int64   `json:"uploaded_by"`
	CreatedAt       string  `json:"created_at"`
	UpdatedAt       string  `json:"updated_at"`
}

// KnowledgeAssetLink — Временный адрес файла страницы базы знаний.
type KnowledgeAssetLink struct {
	// URL — Подписанный адрес хранилища при direct=true; иначе относительный адрес этого API с авторизацией
	URL string `json:"url"`
	// Direct — true — подписанный адрес хранилища, без заголовка авторизации; false — адрес этого API, с авторизацией
	Direct bool `json:"direct"`
	// ExpiresAt — Срок подписанного адреса; у адреса API его нет
	ExpiresAt *string `json:"expires_at,omitempty"`
	Method    string  `json:"method"`
	Name      string  `json:"name"`
	MimeType  string  `json:"mime_type"`
	SizeBytes int64   `json:"size_bytes"`
	Sha256    string  `json:"sha256"`
	// ScanStatus — skipped — файл антивирус не проверял
	ScanStatus string `json:"scan_status"`
}

type KnowledgeCitation struct {
	ChunkID UUID `json:"chunk_id"`
	// SourceKind — Откуда фрагмент: страница, файл страницы или встроенное руководство
	SourceKind     string  `json:"source_kind"`
	AssetID        *UUID   `json:"asset_id,omitempty"`
	NodeID         UUID    `json:"node_id"`
	SpaceID        UUID    `json:"space_id"`
	RevisionID     UUID    `json:"revision_id"`
	Title          string  `json:"title"`
	Slug           string  `json:"slug"`
	Breadcrumb     string  `json:"breadcrumb"`
	SectionHeading *string `json:"section_heading,omitempty"`
	Quote          string  `json:"quote"`
	// Locator — Адрес фрагмента внутри источника
	Locator map[string]json.RawMessage `json:"locator"`
	IsStale bool                       `json:"is_stale"`
}

// KnowledgeDocument — Канонический блочный документ страницы; редактор читает только эту схему.
type KnowledgeDocument struct {
	Schema string `json:"schema"`
	// SchemaVersion — Актуальная версия схемы — 2
	SchemaVersion int64  `json:"schema_version"`
	Type          string `json:"type"`
	// Content — Блоки страницы
	Content []map[string]json.RawMessage `json:"content"`
}

type KnowledgeMoveInput struct {
	ParentID *UUID `json:"parent_id,omitempty"`
	// Position — Место среди соседей, 0 — первое
	Position        *int64 `json:"position,omitempty"`
	ExpectedVersion int64  `json:"expected_version"`
}

type KnowledgeNode struct {
	ID        UUID   `json:"id"`
	SpaceID   UUID   `json:"space_id"`
	ParentID  *UUID  `json:"parent_id,omitempty"`
	Title     string `json:"title"`
	Slug      string `json:"slug"`
	Icon      string `json:"icon"`
	SortOrder int64  `json:"sort_order"`
	// Status — Состояние страницы: draft, review, published или archived
	Status                 string `json:"status"`
	OwnerID                int64  `json:"owner_id"`
	CurrentDraftRevisionID *UUID  `json:"current_draft_revision_id,omitempty"`
	PublishedRevisionID    *UUID  `json:"published_revision_id,omitempty"`
	// Version — Версия страницы для optimistic locking следующего изменения
	Version             int64   `json:"version"`
	VerifyAt            *string `json:"verify_at,omitempty"`
	SubmittedRevisionID *UUID   `json:"submitted_revision_id,omitempty"`
	ReviewerID          *int64  `json:"reviewer_id,omitempty"`
	SubmittedBy         *int64  `json:"submitted_by,omitempty"`
	SubmittedAt         *string `json:"submitted_at,omitempty"`
	ReviewedBy          *int64  `json:"reviewed_by,omitempty"`
	ReviewedAt          *string `json:"reviewed_at,omitempty"`
	ReviewNote          *string `json:"review_note,omitempty"`
	CreatedBy           int64   `json:"created_by"`
	CreatedAt           string  `json:"created_at"`
	UpdatedAt           string  `json:"updated_at"`
	IsFavorite          bool    `json:"is_favorite"`
	// IsStale — Срок подтверждения актуальности истёк
	IsStale   bool               `json:"is_stale"`
	Tags      []KnowledgeTag     `json:"tags,omitempty"`
	Draft     *KnowledgeRevision `json:"draft,omitempty"`
	Published *KnowledgeRevision `json:"published,omitempty"`
}

type KnowledgeNodeAccessInput struct {
	BreakInheritance bool                `json:"break_inheritance"`
	Grants           []KnowledgeACLGrant `json:"grants"`
}

type KnowledgeNodeAccessPolicy struct {
	SpaceID          UUID                `json:"space_id"`
	NodeID           UUID                `json:"node_id"`
	BreakInheritance bool                `json:"break_inheritance"`
	Grants           []KnowledgeACLGrant `json:"grants"`
}

type KnowledgeNodeInput struct {
	SpaceID  UUID    `json:"space_id"`
	ParentID *UUID   `json:"parent_id,omitempty"`
	Title    string  `json:"title"`
	Slug     *string `json:"slug,omitempty"`
	// Icon — Имя иконки Lucide; по умолчанию file-text
	Icon *string `json:"icon,omitempty"`
	// OwnerID — Ответственный за страницу; по умолчанию автор вызова
	OwnerID *int64 `json:"owner_id,omitempty"`
}

type KnowledgeReviewInput struct {
	ExpectedVersion int64 `json:"expected_version"`
	// ReviewerID — Сотрудник, которого просят согласовать редакцию
	ReviewerID *int64  `json:"reviewer_id,omitempty"`
	Note       *string `json:"note,omitempty"`
}

type KnowledgeRevision struct {
	ID            UUID              `json:"id"`
	NodeID        UUID              `json:"node_id"`
	RevisionNo    int64             `json:"revision_no"`
	Title         string            `json:"title"`
	SchemaVersion int64             `json:"schema_version"`
	Content       KnowledgeDocument `json:"content"`
	// PlainText — Производное текстовое представление для поиска и ответов
	PlainText   string  `json:"plain_text"`
	AuthorID    int64   `json:"author_id"`
	CreatedAt   string  `json:"created_at"`
	PublishedAt *string `json:"published_at,omitempty"`
}

type KnowledgeRevisionInput struct {
	// ExpectedVersion — Версия страницы из её карточки; чужая правка отдаётся конфликтом
	ExpectedVersion int64             `json:"expected_version"`
	Title           string            `json:"title"`
	Content         KnowledgeDocument `json:"content"`
	PlainText       *string           `json:"plain_text,omitempty"`
}

type KnowledgeSearchResult struct {
	NodeID    UUID    `json:"node_id"`
	SpaceID   UUID    `json:"space_id"`
	Title     string  `json:"title"`
	Slug      string  `json:"slug"`
	Snippet   string  `json:"snippet"`
	UpdatedAt string  `json:"updated_at"`
	Rank      float64 `json:"rank"`
}

type KnowledgeSpace struct {
	ID          UUID   `json:"id"`
	Name        string `json:"name"`
	Slug        string `json:"slug"`
	Description string `json:"description"`
	Icon        string `json:"icon"`
	SortOrder   int64  `json:"sort_order"`
	IsArchived  bool   `json:"is_archived"`
	// IsRestricted — Закрытое пространство видно только участникам его списка
	IsRestricted bool `json:"is_restricted"`
	// CanManage — Смотрящий вправе вести пространство; считается сервером по владельцу
	CanManage bool `json:"can_manage"`
	// BusinessID — Бизнес пространства: его видят, ищут и цитируют в ответах помощника участники, чья область доступа касается бизнеса, и поимённо выданные. null — пространство всего кабинета
	BusinessID *UUID  `json:"business_id"`
	HasCover   bool   `json:"has_cover"`
	PageCount  int64  `json:"page_count"`
	CreatedBy  int64  `json:"created_by"`
	CreatedAt  string `json:"created_at"`
	UpdatedAt  string `json:"updated_at"`
	IsPinned   bool   `json:"is_pinned"`
}

type KnowledgeSpaceAccessInput struct {
	Restricted bool `json:"restricted"`
	// Grants — Полный список; сохранённый состав заменяется им целиком
	Grants []KnowledgeACLGrant `json:"grants"`
}

type KnowledgeSpaceAccessPolicy struct {
	SpaceID    UUID                `json:"space_id"`
	Restricted bool                `json:"restricted"`
	Grants     []KnowledgeACLGrant `json:"grants"`
}

type KnowledgeSpaceInput struct {
	Name string `json:"name"`
	// Slug — Адрес; выводится из названия, когда не задан
	Slug        *string `json:"slug,omitempty"`
	Description *string `json:"description,omitempty"`
	// Icon — Имя иконки Lucide; по умолчанию book-open
	Icon *string `json:"icon,omitempty"`
	// BusinessID — Бизнес пространства. Поле не передано — не менять (у нового — единственный бизнес области доступа или весь кабинет); null — пространство всего кабинета. Бизнес вне области доступа — 403 knowledge.business_forbidden
	BusinessID *UUID `json:"business_id,omitempty"`
}

type KnowledgeTag struct {
	ID        UUID   `json:"id"`
	Name      string `json:"name"`
	Color     string `json:"color"`
	CreatedBy int64  `json:"created_by"`
	CreatedAt string `json:"created_at"`
}

type KnowledgeVersionInput struct {
	ExpectedVersion int64 `json:"expected_version"`
}

type Link struct {
	ID         UUID   `json:"id"`
	Task       UUID   `json:"task"`
	EntityType string `json:"entity_type"`
	EntityID   string `json:"entity_id"`
	Label      string `json:"label"`
}

type LinkCreate struct {
	EntityType string  `json:"entity_type"`
	EntityID   string  `json:"entity_id"`
	Label      *string `json:"label,omitempty"`
}

type LinkList = []Link

// MailAccount — Почтовый ящик кабинета. Пароль подключения не сериализуется никогда: наружу уходит только признак has_credentials.
type MailAccount struct {
	ID UUID `json:"id"`
	// OwnerUserID — Сотрудник, которому принадлежит ящик
	OwnerUserID int64 `json:"owner_user_id"`
	// Shared — Общий ящик отдела виден всем, у кого есть право на модуль; личный — владельцу и тому, кто видит все записи
	Shared bool `json:"shared"`
	// BusinessID — Бизнес общего ящика: ящик видят участники, чья область доступа касается этого бизнеса, а также владелец и поимённо названные сотрудники. null — ящик всего кабинета или личный
	BusinessID  *UUID  `json:"business_id"`
	Email       string `json:"email"`
	DisplayName string `json:"display_name"`
	// NotificationMode — Уведомления владельца ящика о новой почте: все письма, только важные отправители или выключено
	NotificationMode string         `json:"notification_mode"`
	ImapHost         string         `json:"imap_host"`
	ImapPort         int64          `json:"imap_port"`
	ImapEncryption   MailEncryption `json:"imap_encryption"`
	SmtpHost         string         `json:"smtp_host"`
	SmtpPort         int64          `json:"smtp_port"`
	SmtpEncryption   MailEncryption `json:"smtp_encryption"`
	// Username — Логин подключения; по умолчанию равен адресу
	Username string `json:"username"`
	// HasCredentials — Пароль приложения сохранён. Самого пароля не отдаёт ни одна операция
	HasCredentials bool              `json:"has_credentials"`
	Status         MailAccountStatus `json:"status"`
	SyncStatus     MailSyncStatus    `json:"sync_status"`
	// SyncSinceDays — Глубина первичного импорта в днях; ноль означает весь ящик
	SyncSinceDays int64 `json:"sync_since_days"`
	// Signature — Подпись, подставляемая в исходящие письма
	Signature  string  `json:"signature"`
	LastSyncAt *string `json:"last_sync_at"`
	// LastError — Последняя ошибка подключения для человека
	LastError string `json:"last_error"`
	// LastErrorCode — Машинный код последней ошибки подключения, например mail.account.credentials_rejected; пусто, когда ошибки нет
	LastErrorCode string `json:"last_error_code"`
	UnreadCount   int64  `json:"unread_count"`
	CreatedAt     string `json:"created_at"`
	UpdatedAt     string `json:"updated_at"`
}

type MailAccountStatus = string

// MailAttachment — Вложение письма. Ключ объектного хранилища наружу не отдаётся: знание ключа — половина пути к чужому файлу.
type MailAttachment struct {
	ID          UUID   `json:"id"`
	MessageID   UUID   `json:"message_id"`
	Filename    string `json:"filename"`
	ContentType string `json:"content_type"`
	SizeBytes   int64  `json:"size_bytes"`
	// ContentID — Заполняется у картинок, вставленных в тело письма через cid:
	ContentID *string `json:"content_id,omitempty"`
	// IsInline — Встроенная в тело картинка, а не документ
	IsInline   bool           `json:"is_inline"`
	ScanStatus MailScanStatus `json:"scan_status"`
	CreatedAt  string         `json:"created_at"`
}

// MailAttachmentLink — Временный адрес вложения письма.
type MailAttachmentLink struct {
	URL string `json:"url"`
	// Direct — true — подписанный адрес хранилища, без заголовка авторизации; false — адрес этого API, с авторизацией
	Direct bool `json:"direct"`
	// ExpiresAt — Срок подписанного адреса; у адреса API его нет
	ExpiresAt  *string        `json:"expires_at,omitempty"`
	Name       string         `json:"name"`
	MimeType   string         `json:"mime_type"`
	SizeBytes  int64          `json:"size_bytes"`
	ScanStatus MailScanStatus `json:"scan_status"`
}

// MailComposeInput — Отправка письма или сохранение черновика. Поле in_reply_to_id указывает на письмо в нашей базе, а не на Message-ID: заголовки ответа собираем мы.
type MailComposeInput struct {
	Subject *string `json:"subject,omitempty"`
	// To — Одна строка может содержать несколько адресов через запятую
	To       []string `json:"to,omitempty"`
	Cc       []string `json:"cc,omitempty"`
	Bcc      []string `json:"bcc,omitempty"`
	BodyText *string  `json:"body_text,omitempty"`
	BodyHTML *string  `json:"body_html,omitempty"`
	// InReplyToID — Письмо, на которое отвечаем
	InReplyToID *UUID `json:"in_reply_to_id,omitempty"`
	// ForwardOfID — Письмо, которое пересылаем
	ForwardOfID *UUID `json:"forward_of_id,omitempty"`
	// UploadIds — Идентификаторы заранее загруженных файлов
	UploadIds []UUID `json:"upload_ids,omitempty"`
	// SaveAsDraft — Значение true СОХРАНЯЕТ письмо в «Черновиках» и не отправляет его; без признака письмо уходит получателю и отозвать его нельзя
	SaveAsDraft *bool `json:"save_as_draft,omitempty"`
}

type MailEncryption = string

// MailFolder — Папка ящика. Координаты синхронизации IMAP (UIDVALIDITY, UIDNEXT, последний прочитанный UID) наружу не отдаются.
type MailFolder struct {
	ID        UUID `json:"id"`
	AccountID UUID `json:"account_id"`
	// ExternalID — Имя папки на почтовом сервере
	ExternalID string         `json:"external_id"`
	Name       string         `json:"name"`
	Role       MailFolderRole `json:"role"`
	ParentID   *UUID          `json:"parent_id"`
	// Delimiter — Разделитель иерархии, который назвал сервер
	Delimiter   string `json:"delimiter"`
	TotalCount  int64  `json:"total_count"`
	UnreadCount int64  `json:"unread_count"`
	// SortOrder — Вес папки в привычном порядке системных папок
	SortOrder  int64 `json:"sort_order"`
	Subscribed bool  `json:"subscribed"`
	// Mirror — Вид на ту же почту (Gmail «Вся почта», «Важное», «Помеченные»): письма в нём — копии писем из настоящих папок, в сводные выборки они не попадают
	Mirror    bool   `json:"mirror"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

// MailFolderInput — Создание и переименование пользовательской папки
type MailFolderInput struct {
	// Name — Косые черты запрещены: разделитель иерархии задаёт сервер
	Name string `json:"name"`
	// ParentID — Родительская папка
	ParentID *UUID `json:"parent_id,omitempty"`
}

type MailFolderRole = string

// MailMessage — Письмо в копии кабинета. Внутренние координаты IMAP (UID и UIDVALIDITY) наружу не отдаются. Тело в HTML хранится таким, каким его прислал отправитель: обезвреживание живёт на отдаче, а не в хранимой копии.
type MailMessage struct {
	ID        UUID `json:"id"`
	AccountID UUID `json:"account_id"`
	FolderID  UUID `json:"folder_id"`
	ThreadID  UUID `json:"thread_id"`
	// MessageRef — Message-ID без угловых скобок; письму без него присваивается наш
	MessageRef string `json:"message_ref"`
	// InReplyTo — Заголовок In-Reply-To
	InReplyTo *string `json:"in_reply_to,omitempty"`
	// References — Заголовок References целиком
	References  *string `json:"references,omitempty"`
	Subject     string  `json:"subject"`
	FromAddress string  `json:"from_address"`
	FromName    string  `json:"from_name"`
	// Addresses — Конверт письма целиком
	Addresses []MailMessageAddress `json:"addresses,omitempty"`
	// Snippet — Короткий пересказ письма для списка
	Snippet        string          `json:"snippet"`
	BodyText       *string         `json:"body_text,omitempty"`
	BodyHTML       *string         `json:"body_html,omitempty"`
	SizeBytes      int64           `json:"size_bytes"`
	Direction      string          `json:"direction"`
	IsRead         bool            `json:"is_read"`
	IsFlagged      bool            `json:"is_flagged"`
	IsAnswered     bool            `json:"is_answered"`
	IsDraft        bool            `json:"is_draft"`
	HasAttachments bool            `json:"has_attachments"`
	SpamVerdict    MailSpamVerdict `json:"spam_verdict"`
	// SpamSource — Кто вынес вердикт. Решение человека сильнее флага сервера и правил
	SpamSource  *string          `json:"spam_source,omitempty"`
	SpamReason  *string          `json:"spam_reason,omitempty"`
	SentAt      *string          `json:"sent_at"`
	ReceivedAt  string           `json:"received_at"`
	CreatedAt   string           `json:"created_at"`
	UpdatedAt   string           `json:"updated_at"`
	Attachments []MailAttachment `json:"attachments,omitempty"`
}

// MailMessageAddress — Один адрес в конверте письма
type MailMessageAddress struct {
	// Kind — Вид адреса: from, to, cc, bcc, reply_to. Значение list_id несёт идентификатор рассылки, а не адрес человека
	Kind    string `json:"kind"`
	Address string `json:"address"`
	// Name — Имя отправителя или получателя, если оно было в конверте
	Name string `json:"name"`
	// Position — Порядок адреса в своей группе
	Position int64 `json:"position"`
}

// MailMessagePage — Страница писем. Общее число нужно, чтобы решить, стоит ли листать дальше.
type MailMessagePage struct {
	Items   []MailMessage `json:"items"`
	Total   int64         `json:"total"`
	Limit   int64         `json:"limit"`
	Offset  int64         `json:"offset"`
	HasMore bool          `json:"has_more"`
}

// MailOutbound — Исходящее письмо в очереди отправки. Постоянный отказ SMTP (код 5xx) не повторяется: повторять отклонённое навсегда письмо вредно для репутации отправителя.
type MailOutbound struct {
	ID            UUID    `json:"id"`
	AccountID     UUID    `json:"account_id"`
	MessageID     UUID    `json:"message_id"`
	Status        string  `json:"status"`
	Attempts      int64   `json:"attempts"`
	MaxAttempts   int64   `json:"max_attempts"`
	NextAttemptAt *string `json:"next_attempt_at"`
	LastError     string  `json:"last_error"`
	LastErrorCode string  `json:"last_error_code"`
	SentAt        *string `json:"sent_at"`
	// CreatedBy — Сотрудник, отправивший письмо
	CreatedBy int64  `json:"created_by"`
	CreatedAt string `json:"created_at"`
}

// MailOutboundPage — Страница очереди отправки
type MailOutboundPage struct {
	Items   []MailOutbound `json:"items"`
	Total   int64          `json:"total"`
	Limit   int64          `json:"limit"`
	Offset  int64          `json:"offset"`
	HasMore bool           `json:"has_more"`
}

// MailOutboundUpload — Файл, загруженный до отправки письма. Ключ объектного хранилища наружу не отдаётся.
type MailOutboundUpload struct {
	ID          UUID           `json:"id"`
	AccountID   UUID           `json:"account_id"`
	Filename    string         `json:"filename"`
	ContentType string         `json:"content_type"`
	SizeBytes   int64          `json:"size_bytes"`
	ScanStatus  MailScanStatus `json:"scan_status"`
	Status      string         `json:"status"`
	ExpiresAt   string         `json:"expires_at"`
	CreatedAt   string         `json:"created_at"`
}

type MailPerson struct {
	UserID int64  `json:"user_id"`
	Name   string `json:"name"`
}

// MailProvider — Подсказка настроек для формы подключения ящика
type MailProvider struct {
	// Key — Машинный ключ провайдера
	Key string `json:"key"`
	// Label — Название провайдера для человека
	Label string `json:"label"`
	// Domains — Домены адресов, по которым подсказка подбирается
	Domains        []string       `json:"domains"`
	ImapHost       string         `json:"imap_host"`
	ImapPort       int64          `json:"imap_port"`
	ImapEncryption MailEncryption `json:"imap_encryption"`
	SmtpHost       string         `json:"smtp_host"`
	SmtpPort       int64          `json:"smtp_port"`
	SmtpEncryption MailEncryption `json:"smtp_encryption"`
	// PasswordHint — Какой именно пароль нужен: у перечисленных провайдеров обычный пароль от аккаунта не подходит
	PasswordHint string `json:"password_hint"`
	// HelpURL — Ссылка на справку провайдера; у части провайдеров пуста
	HelpURL string `json:"help_url"`
}

// MailRule — Правило разбора входящей почты
type MailRule struct {
	ID        UUID   `json:"id"`
	AccountID UUID   `json:"account_id"`
	Name      string `json:"name"`
	Enabled   bool   `json:"enabled"`
	// SortOrder — Порядок применения правил ящика
	SortOrder int64 `json:"sort_order"`
	// Match — Правило применяется при всех условиях или при любом из них
	Match      string              `json:"match"`
	Conditions []MailRuleCondition `json:"conditions"`
	Actions    []MailRuleAction    `json:"actions"`
	// StopProcessing — Прекратить разбор письма после этого правила
	StopProcessing bool `json:"stop_processing"`
	// AppliedCount — Сколько писем правило разобрало: единственный способ увидеть, что правило молчит из-за опечатки
	AppliedCount  int64   `json:"applied_count"`
	LastAppliedAt *string `json:"last_applied_at"`
	CreatedAt     string  `json:"created_at"`
	UpdatedAt     string  `json:"updated_at"`
}

// MailRuleAction — Одно действие правила
type MailRuleAction struct {
	Type string `json:"type"`
	// FolderID — Заполняется только для переноса в папку; остальные действия папку не принимают
	FolderID *UUID `json:"folder_id,omitempty"`
}

// MailRuleCondition — Одно условие правила. Набор полей и операторов закрытый: правило исполняется на сервере над чужой почтой.
type MailRuleCondition struct {
	Field string `json:"field"`
	// Op — Сравнение по домену доступно только адресным полям; поле has_attachment проверяется как is_true или is_false.
	Op string `json:"op"`
	// Value — Обязательно для всех полей, кроме has_attachment
	Value *string `json:"value,omitempty"`
}

// MailRuleInput — Создание и изменение правила; условия и действия передаются целиком
type MailRuleInput struct {
	Name      string `json:"name"`
	Enabled   *bool  `json:"enabled,omitempty"`
	SortOrder *int64 `json:"sort_order,omitempty"`
	// Match — Без значения — all
	Match          *string             `json:"match,omitempty"`
	Conditions     []MailRuleCondition `json:"conditions"`
	Actions        []MailRuleAction    `json:"actions"`
	StopProcessing *bool               `json:"stop_processing,omitempty"`
}

// MailRuleOutcome — Что правило сделало с письмом
type MailRuleOutcome struct {
	RuleID        UUID    `json:"rule_id"`
	RuleName      string  `json:"rule_name"`
	MessageID     UUID    `json:"message_id"`
	Subject       string  `json:"subject"`
	MovedToFolder *UUID   `json:"moved_to_folder,omitempty"`
	MarkedRead    *bool   `json:"marked_read,omitempty"`
	Flagged       *bool   `json:"flagged,omitempty"`
	SpamVerdict   *string `json:"spam_verdict,omitempty"`
}

type MailScanStatus = string

type MailSpamVerdict = string

// MailSyncReport — Итог одного прохода по ящику: «ничего не изменилось» — тоже ответ
type MailSyncReport struct {
	AccountID UUID `json:"account_id"`
	// Folders — Сколько папок прочитано
	Folders     int64 `json:"folders"`
	NewMessages int64 `json:"new_messages"`
	// RulesApplied — Сколько писем разобрали правила
	RulesApplied int64  `json:"rules_applied"`
	FinishedAt   string `json:"finished_at"`
	// FullReloaded — Папки, перечитанные целиком после смены UIDVALIDITY на сервере
	FullReloaded []string `json:"full_reloaded,omitempty"`
	// FailedFolders — Папки, которые в этот проход прочитать не удалось; остальные разобраны
	FailedFolders []string `json:"failed_folders,omitempty"`
	// Updated — Письма, у которых проход перенёс с сервера прочтение, отметку или удаление из другого клиента
	Updated *int64 `json:"updated,omitempty"`
	// State — Только у проверки по требованию: done — проверено, running — ящик проверяется фоном и письма появятся сами
	State *string `json:"state,omitempty"`
	// Partial — Проверка по требованию успела не все свои папки; остальное доделает фон
	Partial *bool `json:"partial,omitempty"`
}

type MailSyncStatus = string

// MailThread — Переписка: письма, связанные ответами. Склейка идёт по корню цепочки References, а не по теме.
type MailThread struct {
	ID        UUID   `json:"id"`
	AccountID UUID   `json:"account_id"`
	Subject   string `json:"subject"`
	// RootRef — Корневой Message-ID ветки
	RootRef        string               `json:"root_ref"`
	MessageCount   int64                `json:"message_count"`
	UnreadCount    int64                `json:"unread_count"`
	HasAttachments bool                 `json:"has_attachments"`
	Participants   []MailMessageAddress `json:"participants"`
	LastMessageAt  string               `json:"last_message_at"`
	Messages       []MailMessage        `json:"messages,omitempty"`
}

type ManagedChecklistItem struct {
	Text string `json:"text"`
	Done bool   `json:"done"`
}

type ManagedChecklistPatch struct {
	// ID — Стабильный UUID группы, которой владеет интеграция.
	ID    UUID   `json:"id"`
	Title string `json:"title"`
	// Items — Пустой массив удаляет только группу с переданным id.
	Items []ManagedChecklistItem `json:"items"`
}

// MarketplaceBuyoutCohort — Выкуп когорты заказов периода — тот же расчёт, что у воронки: доля выкупленных среди заказов, у которых успело решиться, выкуплены ли они (не позже сегодня−8), окно не короче 14 дней — короткий период добирает решённые дни раньше; у Ozon — FBO и FBS вместе
type MarketplaceBuyoutCohort struct {
	// From — Первый день заказов когорты
	From string `json:"from"`
	// To — Последний день заказов когорты включительно
	To string `json:"to"`
	// Bought — Выкуплено, шт
	Bought float64 `json:"bought"`
	// Base — Заказано без отмен, шт
	Base float64 `json:"base"`
	// Pct — Выкуп, %; нет решённых заказов — null
	Pct *float64 `json:"pct"`
}

// MarketplaceComponentDataThrough — Последняя дата операций площадки, уже включённых в каждый компонент отчёта; отсутствующее или null-значение означает, что дата покрытия пока неизвестна.
type MarketplaceComponentDataThrough struct {
	// Finance — Финансовые операции площадки
	Finance *string `json:"finance,omitempty"`
	// Ads — Реклама Wildberries
	Ads *string `json:"ads,omitempty"`
	// AdsClicks — Клики рекламы Ozon
	AdsClicks *string `json:"ads_clicks,omitempty"`
	// AdsOrders — Заказы из рекламы Ozon
	AdsOrders *string `json:"ads_orders,omitempty"`
	// Products — Карточки товаров по дате последней синхронизации
	Products *string `json:"products,omitempty"`
}

// MarketplaceComponentFreshness — Время последней успешной загрузки каждого компонента отчёта; отсутствующее или null-значение означает, что компонент ещё не загружался успешно.
type MarketplaceComponentFreshness struct {
	// Finance — Финансовые операции площадки
	Finance *string `json:"finance,omitempty"`
	// Ads — Реклама Wildberries
	Ads *string `json:"ads,omitempty"`
	// AdsClicks — Клики рекламы Ozon
	AdsClicks *string `json:"ads_clicks,omitempty"`
	// AdsOrders — Заказы из рекламы Ozon
	AdsOrders *string `json:"ads_orders,omitempty"`
	// Products — Карточки товаров
	Products *string `json:"products,omitempty"`
}

type MarketplaceOzonCost struct {
	Store   UUID   `json:"store"`
	OfferID string `json:"offer_id"`
	// Cost — Decimal string
	Cost string `json:"cost"`
}

type MarketplaceOzonCostRequest struct {
	Store   UUID   `json:"store"`
	OfferID string `json:"offer_id"`
	// Cost — Decimal string; пусто сохраняется как 0
	Cost *string `json:"cost,omitempty"`
	// Note — Комментарий; сохраняется, но в ответ не возвращается
	Note *string `json:"note,omitempty"`
}

type MarketplaceOzonDecomposition struct {
	// Updated — Момент последней синхронизации аналитики
	Updated *string `json:"updated"`
	// Anchor — Последняя дата с данными
	Anchor      string                                  `json:"anchor"`
	Months      []MarketplaceOzonDecompositionMonth     `json:"months"`
	Month       *MarketplaceOzonDecompositionMonth      `json:"month"`
	Periods     []MarketplaceOzonDecompositionPeriod    `json:"periods"`
	Articles    []MarketplaceOzonDecompositionArticle   `json:"articles"`
	Other       *MarketplaceOzonDecompositionOtherBlock `json:"other"`
	Freshness   *MarketplaceComponentFreshness          `json:"freshness,omitempty"`
	DataThrough *MarketplaceComponentDataThrough        `json:"data_through,omitempty"`
	// Incomplete — Хотя бы один обязательный компонент не загружался успешно, последняя загрузка завершилась ошибкой или давно не запускалась
	Incomplete *bool `json:"incomplete,omitempty"`
}

type MarketplaceOzonDecompositionArticle struct {
	// StoreID — Внешний числовой идентификатор магазина
	StoreID   *int64 `json:"store_id"`
	StoreName string `json:"store_name"`
	OfferID   string `json:"offer_id"`
	SKU       *int64 `json:"sku"`
	// NmID — Всегда null: поле Wildberries сохранено ради общей формы
	NmID     json.RawMessage `json:"nm_id"`
	Name     string          `json:"name"`
	Category string          `json:"category"`
	Image    string          `json:"image"`
	URL      string          `json:"url"`
	// ByPeriod — Ключ — идентификатор периода
	ByPeriod map[string]MarketplaceOzonDecompositionCell `json:"by_period"`
	// CostMissing — Себестоимость артикула не заведена: прибыль завышена (ERP-1169)
	CostMissing *bool `json:"cost_missing,omitempty"`
	// UnitsMissing — Площадка прислала выручку, но не количество проданных штук: себестоимость посчитана нулём (ERP-1217)
	UnitsMissing *bool `json:"units_missing,omitempty"`
}

type MarketplaceOzonDecompositionCell struct {
	Revenue          int64    `json:"revenue"`
	Units            int64    `json:"units"`
	ReturnUnits      int64    `json:"return_units"`
	Returns          int64    `json:"returns"`
	ReturnsPct       *float64 `json:"returns_pct"`
	Commission       int64    `json:"commission"`
	CommissionPct    *float64 `json:"commission_pct"`
	Logistics        int64    `json:"logistics"`
	LogisticsPerUnit *float64 `json:"logistics_per_unit"`
	Acquiring        int64    `json:"acquiring"`
	InternalAd       int64    `json:"internal_ad"`
	ExternalAd       int64    `json:"external_ad"`
	Drr              *float64 `json:"drr"`
	Cogs             int64    `json:"cogs"`
	OtherPremium     int64    `json:"other_premium"`
	Tax              int64    `json:"tax"`
	Expenses         int64    `json:"expenses"`
	Profit           int64    `json:"profit"`
	MarginPct        *float64 `json:"margin_pct"`
	// RrRevenue — Выручка спроецированная на весь период
	RrRevenue int64 `json:"rr_revenue"`
	// RrProfit — Прибыль спроецированная на период; разовое не проецируется
	RrProfit int64 `json:"rr_profit"`
	// ID — Идентификатор периода; появляется только в totals
	ID *string `json:"id,omitempty"`
}

type MarketplaceOzonDecompositionMonth struct {
	Key string `json:"key"`
	// Label — Название месяца по-русски
	Label string `json:"label"`
	// Sub — Год
	Sub   string `json:"sub"`
	Start string `json:"start"`
	End   string `json:"end"`
}

type MarketplaceOzonDecompositionOtherBlock struct {
	ByPeriod  map[string]MarketplaceOzonDecompositionCell        `json:"by_period"`
	Breakdown map[string][]MarketplaceOzonDecompositionOtherItem `json:"breakdown"`
}

type MarketplaceOzonDecompositionOtherItem struct {
	// Name — Наименование операции площадки
	Name string `json:"name"`
	// Amount — Сумма в рублях; расход отрицателен
	Amount int64 `json:"amount"`
}

type MarketplaceOzonDecompositionPeriod struct {
	// ID — month для накопительной колонки, иначе s и номер спринта
	ID   string `json:"id"`
	Kind string `json:"kind"`
	// N — Номер спринта; null у накопительной колонки
	N     *int64 `json:"n"`
	Label string `json:"label"`
	// Sub — Границы периода в виде дня и месяца
	Sub   string `json:"sub"`
	Start string `json:"start"`
	End   string `json:"end"`
	// RunRateFactor — Коэффициент проекции незакрытого периода
	RunRateFactor float64                          `json:"run_rate_factor"`
	Totals        MarketplaceOzonDecompositionCell `json:"totals"`
}

type MarketplaceOzonOrdersDailyRow struct {
	Date string `json:"date"`
	// OrdersSum — Decimal string
	OrdersSum string `json:"orders_sum"`
	OrdersQty int64  `json:"orders_qty"`
	// SalesSum — Decimal string
	SalesSum string `json:"sales_sum"`
	SalesQty int64  `json:"sales_qty"`
}

type MarketplaceOzonOrdersKpi struct {
	// Sum — Decimal string
	Sum string `json:"sum"`
	Qty int64  `json:"qty"`
	// DeltaSum — Изменение к тому же времени накануне в процентах
	DeltaSum *float64 `json:"delta_sum"`
	DeltaQty *float64 `json:"delta_qty"`
}

type MarketplaceOzonOrdersOverview struct {
	// Day — Последний день периода; без параметров — самый свежий день в аналитике, а не сегодняшний
	Day string `json:"day"`
	// From — Первый день периода
	From string `json:"from"`
	// To — Последний день периода включительно
	To string `json:"to"`
	// ChartFrom — Первый день графика: не позже from и не меньше 14 дней до to
	ChartFrom string  `json:"chart_from"`
	Updated   *string `json:"updated"`
	Scheme    string  `json:"scheme"`
	// Kpi — Ключи orders и sales
	Kpi map[string]MarketplaceOzonOrdersKpi `json:"kpi"`
	// Daily — Дни подряд от chart_from по to: не меньше 14
	Daily    []MarketplaceOzonOrdersDailyRow   `json:"daily"`
	Products []MarketplaceOzonOrdersProductRow `json:"products"`
	// SummaryTotal — Недели и месяцы всего магазина (?summary=1): окно → заказано штук
	SummaryTotal map[string]int64         `json:"summary_total,omitempty"`
	Buyout       *MarketplaceBuyoutCohort `json:"buyout,omitempty"`
}

type MarketplaceOzonOrdersProductRow struct {
	// StoreID — Внешний числовой идентификатор магазина
	StoreID     int64  `json:"store_id"`
	OfferID     string `json:"offer_id"`
	SKU         *int64 `json:"sku"`
	ProductName string `json:"product_name"`
	Units       int64  `json:"units"`
	// AvgPrice — Decimal string
	AvgPrice string `json:"avg_price"`
	// Total — Decimal string
	Total        string `json:"total"`
	PrimaryImage string `json:"primary_image"`
	URL          string `json:"url"`
	StoreName    string `json:"store_name"`
	StatusName   string `json:"status_name"`
	// ByDay — Заказано штук по дням периода: день ГГГГ-ММ-ДД → шт
	ByDay map[string]int64 `json:"by_day,omitempty"`
	// Summary — Недели и месяцы (?summary=1): окно (w3, w2, w1, prev_month, month) → заказано штук
	Summary map[string]int64 `json:"summary,omitempty"`
}

type MarketplaceOzonPnl struct {
	PeriodKind string  `json:"period_kind"`
	Scheme     string  `json:"scheme"`
	Updated    *string `json:"updated"`
	Year       int64   `json:"year"`
	// Years — Годы доступные в аналитике
	Years   []int64                    `json:"years"`
	Range   MarketplaceOzonPnlRange    `json:"range"`
	Periods []MarketplaceOzonPnlPeriod `json:"periods"`
	Rows    []MarketplaceOzonPnlRow    `json:"rows"`
	Note    *string                    `json:"note,omitempty"`
	// Demo — Аналитика не подключена — цифры синтетические
	Demo *bool `json:"demo,omitempty"`
	// Breakdown — Расшифровка прочего по периодам
	Breakdown map[string][]MarketplaceOzonDecompositionOtherItem `json:"breakdown,omitempty"`
	// CostMissing — Сколько штук продано в периоде без действующей ставки себестоимости: они посчитаны с нулевой закупкой, маржа периода завышена. Ключ — начало периода
	CostMissing map[string]float64 `json:"cost_missing,omitempty"`
	// UnitsMissing — Выручка периода, по которой площадка не прислала количество проданных штук (ERP-1217): себестоимость посчитана нулём, маржа завышена. Ключ — начало периода. Заполняется только для Ozon
	UnitsMissing map[string]float64               `json:"units_missing,omitempty"`
	Freshness    *MarketplaceComponentFreshness   `json:"freshness,omitempty"`
	DataThrough  *MarketplaceComponentDataThrough `json:"data_through,omitempty"`
	// Incomplete — Хотя бы один обязательный компонент не загружался успешно, последняя загрузка завершилась ошибкой или давно не запускалась
	Incomplete *bool `json:"incomplete,omitempty"`
}

type MarketplaceOzonPnlPeriod struct {
	Key   string `json:"key"`
	Label string `json:"label"`
	Sub   string `json:"sub"`
	Start string `json:"start"`
	End   string `json:"end"`
}

type MarketplaceOzonPnlRange struct {
	From string `json:"from"`
	To   string `json:"to"`
}

type MarketplaceOzonPnlRow struct {
	Key   string `json:"key"`
	Label string `json:"label"`
	// Kind — Роль строки в отчёте
	Kind string `json:"kind"`
	// Values — По одному значению на период в том же порядке
	Values []*float64 `json:"values"`
}

type MarketplaceOzonProduct struct {
	// ID — Синтетический ключ магазин и артикул через двоеточие
	ID          string `json:"id"`
	Store       UUID   `json:"store"`
	StoreName   string `json:"store_name"`
	OfferID     string `json:"offer_id"`
	SKU         *int64 `json:"sku"`
	ProductName string `json:"product_name"`
	Barcode     string `json:"barcode"`
	// Price — Decimal string
	Price string `json:"price"`
	// OldPrice — Decimal string
	OldPrice string `json:"old_price"`
	// MinPrice — Decimal string
	MinPrice string `json:"min_price"`
	// VAT — Decimal string
	VAT string `json:"vat"`
	// VolumeWeight — Decimal string
	VolumeWeight string `json:"volume_weight"`
	FboPresent   int64  `json:"fbo_present"`
	FbsPresent   int64  `json:"fbs_present"`
	FboReserved  int64  `json:"fbo_reserved"`
	FbsReserved  int64  `json:"fbs_reserved"`
	// CommissionFboPercent — Decimal string
	CommissionFboPercent string `json:"commission_fbo_percent"`
	// CommissionFbsPercent — Decimal string
	CommissionFbsPercent string `json:"commission_fbs_percent"`
	StatusName           string `json:"status_name"`
	PrimaryImage         string `json:"primary_image"`
	URL                  string `json:"url"`
	Category             string `json:"category"`
	// Cost — Себестоимость из базы кабинета; null — не заведена
	Cost *string `json:"cost"`
	// LinkedProductID — Номенклатура кабинета, к которой привязан артикул канала (core_product_identifier вида channel_article); null — не привязан
	LinkedProductID *UUID `json:"linked_product_id"`
	// LinkedProductSKU — SKU привязанной номенклатуры; пусто без связи
	LinkedProductSKU string `json:"linked_product_sku"`
	// LinkedProductName — Название привязанной номенклатуры; пусто без связи
	LinkedProductName string `json:"linked_product_name"`
}

type MarketplaceOzonProductPage struct {
	Count int64 `json:"count"`
	// Next — Всегда null; постранично ходят page и page_size
	Next json.RawMessage `json:"next"`
	// Previous — Всегда null
	Previous json.RawMessage          `json:"previous"`
	Results  []MarketplaceOzonProduct `json:"results"`
	// Demo — Аналитика не подключена — цифры синтетические
	Demo *bool `json:"demo,omitempty"`
}

type MarketplaceOzonStockProduct struct {
	Store      UUID                            `json:"store"`
	StoreName  string                          `json:"store_name"`
	OfferID    string                          `json:"offer_id"`
	Name       string                          `json:"name"`
	Image      string                          `json:"image"`
	Total      int64                           `json:"total"`
	Warehouses []MarketplaceOzonStockWarehouse `json:"warehouses"`
	// ToClient — Товар в пути к покупателю, шт
	ToClient *int64 `json:"to_client,omitempty"`
	// BuyoutPct — Выкуп, % — когорта созревших заказов, как у воронки; нет — поля нет
	BuyoutPct *float64 `json:"buyout_pct,omitempty"`
	// Effective — Остаток с возвратом невыкупленного из того, что в пути: остаток + в пути × (1 − выкуп)
	Effective *float64 `json:"effective,omitempty"`
}

type MarketplaceOzonStockWarehouse struct {
	Warehouse string  `json:"warehouse"`
	Cluster   *string `json:"cluster,omitempty"`
	Qty       int64   `json:"qty"`
}

type MarketplaceOzonStocksPage struct {
	Count int64 `json:"count"`
	// Warehouses — Склады встреченные в выборке
	Warehouses []string                      `json:"warehouses"`
	Results    []MarketplaceOzonStockProduct `json:"results"`
	// Truncated — Строк «товар × склад» больше предела 8000: хвост артикулов не пришёл, отсутствие товара не значит «остатка нет»
	Truncated *bool `json:"truncated,omitempty"`
}

type MarketplaceOzonSyncJob struct {
	ID       UUID   `json:"id"`
	Platform string `json:"platform"`
	// Kind — Что именно синхронизируется
	Kind   string `json:"kind"`
	Status string `json:"status"`
	// RiverJobID — Идентификатор задания в очереди
	RiverJobID *int64 `json:"river_job_id"`
	Period     string `json:"period"`
	StoreIds   []UUID `json:"store_ids"`
	Message    string `json:"message"`
	// Stats — Сырой JSON итогов задания; форма зависит от вида
	Stats      json.RawMessage `json:"stats"`
	StartedAt  *string         `json:"started_at"`
	FinishedAt *string         `json:"finished_at"`
	CreatedAt  string          `json:"created_at"`
	UpdatedAt  string          `json:"updated_at"`
}

type MarketplaceOzonSyncJobList struct {
	// Count — Число строк в ответе, не всего заданий
	Count   int64                    `json:"count"`
	Results []MarketplaceOzonSyncJob `json:"results"`
}

// MarketplaceStore — Магазин маркетплейса в кабинете. Форма одна для Ozon, Wildberries и Яндекс Маркета — их различает только поле platform. Ключи, токены и proxy в ответ не попадают; вместо них возвращаются безопасные признаки настройки.
type MarketplaceStore struct {
	ID UUID `json:"id"`
	// Platform — Платформа задаётся маршрутом, а не телом запроса
	Platform string `json:"platform"`
	Name     string `json:"name"`
	// ExternalID — Внутренний идентификатор MPTrack; назначается после передачи настройки и не вводится пользователем
	ExternalID *int64 `json:"external_id,omitempty"`
	// TaxPercent — Ставка налога в процентах; decimal строкой
	TaxPercent string `json:"tax_percent"`
	IsActive   bool   `json:"is_active"`
	// HasFbs — Для подключения включена загрузка схемы FBS
	HasFbs bool `json:"has_fbs"`
	// HasJam — Для подключения Wildberries включена аналитика «Джем»
	HasJam bool `json:"has_jam"`
	// CredentialsConfigured — Есть хотя бы один сохранённый API-реквизит
	CredentialsConfigured bool `json:"credentials_configured"`
	OzonClientIDSet       bool `json:"ozon_client_id_set"`
	OzonAPIKeySet         bool `json:"ozon_api_key_set"`
	OzonPfClientIDSet     bool `json:"ozon_pf_client_id_set"`
	OzonPfClientSecretSet bool `json:"ozon_pf_client_secret_set"`
	WbTokenSet            bool `json:"wb_token_set"`
	YmBusinessIDSet       bool `json:"ym_business_id_set"`
	YmAPIKeySet           bool `json:"ym_api_key_set"`
	ProxySet              bool `json:"proxy_set"`
	// ConfigSyncStatus — Состояние передачи настройки в MPTrack
	ConfigSyncStatus string  `json:"config_sync_status"`
	ConfigSyncedAt   *string `json:"config_synced_at,omitempty"`
	// TokenClass — Безопасная классификация токена Wildberries без раскрытия токена: basic — ограниченный базовый, personal — персональный, test — тестовый, service — сервисный, unknown — тип не определён
	TokenClass *string `json:"token_class,omitempty"`
	// ConnectionStatus — Безопасное состояние подключения в ERP: not_checked — проверка ещё не запускалась, pending — MPTrack проверяет реквизиты или запускает первую загрузку, disabled — загрузки отключены, ok — подключение работает, warning — требуется внимание, error — подключение не работает. Сырые статусы и тексты MPTrack не публикуются
	ConnectionStatus string `json:"connection_status"`
	// ConnectionErrorCode — Безопасный стабильный код состояния подключения; сырой текст ошибки не публикуется
	ConnectionErrorCode *string `json:"connection_error_code,omitempty"`
	// LastEtlAt — Момент последней успешной загрузки этого подключения
	LastEtlAt *string `json:"last_etl_at,omitempty"`
	// ArticleSizeSeparator — Разделитель базы и размера в артикуле продавца, объявленный владельцем магазина. Пустая строка — правило не объявлено, и размер берётся только из полей площадки. Применяется на Ozon, где каждый размер продаётся своим артикулом
	ArticleSizeSeparator *string `json:"article_size_separator,omitempty"`
	// BusinessID — Бизнес магазина — бизнес юрлица из учётных настроек; по нему магазин и его отчёты сужаются областью доступа участника. null — юрлицо ещё не выбрано в кабинете с несколькими бизнесами: такой магазин видит только доступ ко всем бизнесам
	BusinessID *UUID `json:"business_id,omitempty"`
}

// MarketplaceStoreInput — Тело создания управляемого подключения. Платформу задаёт маршрут, а external_id назначает MPTrack. Для Ozon нужны ozon_client_id и ozon_api_key, для Wildberries — wb_token, для Яндекс Маркета — ym_business_id и ym_api_key.
type MarketplaceStoreInput struct {
	Name string `json:"name"`
	// TaxPercent — Ставка налога в процентах; пустая строка сохраняется как ноль
	TaxPercent *string `json:"tax_percent,omitempty"`
	IsActive   *bool   `json:"is_active,omitempty"`
	HasFbs     *bool   `json:"has_fbs,omitempty"`
	// HasJam — Используется для Wildberries
	HasJam *bool `json:"has_jam,omitempty"`
	// ArticleSizeSeparator — Правило именования артикула Ozon: «БАЗА<разделитель>РАЗМЕР». Список закрыт; пустая строка означает «правила нет». Официальные поля размера площадки всегда старше этого правила
	ArticleSizeSeparator *string `json:"article_size_separator,omitempty"`
	OzonClientID         *string `json:"ozon_client_id,omitempty"`
	OzonAPIKey           *string `json:"ozon_api_key,omitempty"`
	OzonPfClientID       *string `json:"ozon_pf_client_id,omitempty"`
	OzonPfClientSecret   *string `json:"ozon_pf_client_secret,omitempty"`
	// WbToken — Рекомендуется персональный токен класса personal; значение не возвращается
	WbToken *string `json:"wb_token,omitempty"`
	// YmBusinessID — Business ID вводится строкой; ERP проверяет числовой идентификатор и преобразует его для MPTrack
	YmBusinessID *string `json:"ym_business_id,omitempty"`
	YmAPIKey     *string `json:"ym_api_key,omitempty"`
	// Proxy — Необязательный адрес proxy; значение не возвращается
	Proxy *string `json:"proxy,omitempty"`
	// BusinessID — Бизнес магазина. В кабинете с одним бизнесом подставляется сам; при нескольких обязателен — без него ответ 400 marketplace.store_business_required. Бизнес должен входить в область права участника целиком, иначе 403 marketplace.store_business_forbidden; юрлицо учёта магазина потом выбирается только этого бизнеса
	BusinessID *UUID `json:"business_id,omitempty"`
}

type MarketplaceStorePage struct {
	Count   int64              `json:"count"`
	Results []MarketplaceStore `json:"results"`
}

type MarketplaceWbCardAdDay struct {
	Date   string   `json:"date"`
	Spend  int64    `json:"spend"`
	Views  int64    `json:"views"`
	Clicks int64    `json:"clicks"`
	Ctr    *float64 `json:"ctr"`
	Cpc    *float64 `json:"cpc"`
	// Atbs — Добавления в корзину из рекламы
	Atbs   int64    `json:"atbs"`
	Orders int64    `json:"orders"`
	Cr     *float64 `json:"cr"`
}

type MarketplaceWbCardBoard struct {
	// Anchor — Последний день данных «Джема»
	Anchor string `json:"anchor"`
	// Days — Ровно 14 дней по опорный включительно
	Days []string              `json:"days"`
	Meta MarketplaceWbCardMeta `json:"meta"`
	// Funnel — Ряд той же длины, что days
	Funnel []MarketplaceWbCardFunnelDay `json:"funnel"`
	// Ads — Ряд той же длины, что days
	Ads []MarketplaceWbCardAdDay `json:"ads"`
	// Demo — Аналитическая база не подключена и цифры синтетические
	Demo *bool `json:"demo,omitempty"`
}

type MarketplaceWbCardFunnelDay struct {
	Date string `json:"date"`
	// OpenCard — Пусто, когда данных «Джема» за окно нет
	OpenCard *int64   `json:"open_card"`
	ToCart   *int64   `json:"to_cart"`
	CvCart   *float64 `json:"cv_cart"`
	CvOrder  *float64 `json:"cv_order"`
	// OrdersQty — Из «Джема», а без него из продаж или закупок
	OrdersQty int64  `json:"orders_qty"`
	OrdersSum int64  `json:"orders_sum"`
	AvgCheck  *int64 `json:"avg_check"`
	// ClientPrice — Средняя цена покупателя за день
	ClientPrice *float64 `json:"client_price"`
	Spp         *float64 `json:"spp"`
	// BuyoutQty — Из «Джема», а без него из продаж
	BuyoutQty int64    `json:"buyout_qty"`
	BuyoutSum int64    `json:"buyout_sum"`
	BuyoutPct *float64 `json:"buyout_pct"`
}

// MarketplaceWbCardMeta — Паспорт карточки. В демо-ответе заполнены только nm_id, name и store_name.
type MarketplaceWbCardMeta struct {
	// NmID — Идентификатор карточки WB; в демо-ответе приходит строкой из параметра nm
	NmID int64 `json:"nm_id"`
	// VendorCode — Артикул поставщика
	VendorCode *string `json:"vendor_code,omitempty"`
	Name       string  `json:"name"`
	// Subject — Предмет WB
	Subject   *string `json:"subject,omitempty"`
	Brand     *string `json:"brand,omitempty"`
	Photo     *string `json:"photo,omitempty"`
	StoreName string  `json:"store_name"`
	// Price — Цена со скидкой продавца
	Price *string `json:"price,omitempty"`
	// OldPrice — Цена до скидки продавца
	OldPrice *string `json:"old_price,omitempty"`
	// BuyerPrice — Последняя цена покупателя
	BuyerPrice      *string  `json:"buyer_price,omitempty"`
	DiscountPercent *float64 `json:"discount_percent,omitempty"`
	Stock           *int64   `json:"stock,omitempty"`
	InWayToClient   *int64   `json:"in_way_to_client,omitempty"`
	InWayFromClient *int64   `json:"in_way_from_client,omitempty"`
	VolumeL         *string  `json:"volume_l,omitempty"`
	// Cost — Себестоимость из кабинета
	Cost *string `json:"cost,omitempty"`
	// Logistics — Средняя логистика за две недели
	Logistics *float64 `json:"logistics,omitempty"`
	// Commission — Средний процент комиссии за две недели
	Commission *float64 `json:"commission,omitempty"`
	// Storage — Среднее хранение за две недели
	Storage *float64 `json:"storage,omitempty"`
	// TaxPercent — Ставка налога магазина
	TaxPercent *float64 `json:"tax_percent,omitempty"`
	// BuyoutRate — Процент выкупа за окно buyout_window
	BuyoutRate *float64 `json:"buyout_rate,omitempty"`
	// BuyoutWindow — Границы окна выкупа через многоточие
	BuyoutWindow *string `json:"buyout_window,omitempty"`
}

type MarketplaceWbCardOption struct {
	NmID int64 `json:"nm_id"`
	// VendorCode — Артикул поставщика
	VendorCode string `json:"vendor_code"`
	// Subject — Предмет WB
	Subject string `json:"subject"`
	Name    string `json:"name"`
	Photo   string `json:"photo"`
	Orders  int64  `json:"orders"`
}

type MarketplaceWbCardOptions struct {
	// Anchor — Последний день данных «Джема»; пусто, когда данных нет
	Anchor  *string                   `json:"anchor"`
	Results []MarketplaceWbCardOption `json:"results"`
	// Demo — Аналитическая база не подключена и цифры синтетические
	Demo *bool `json:"demo,omitempty"`
}

type MarketplaceWbCost struct {
	Store   string `json:"store"`
	OfferID string `json:"offer_id"`
	Cost    string `json:"cost"`
}

type MarketplaceWbCostRequest struct {
	Store UUID `json:"store"`
	// OfferID — Артикул поставщика
	OfferID string `json:"offer_id"`
	// Cost — Себестоимость строкой; пустое значение сохраняется как ноль
	Cost *string `json:"cost,omitempty"`
	Note *string `json:"note,omitempty"`
}

type MarketplaceWbDecompOtherItem struct {
	// Name — Наименование операции финансового отчёта
	Name   string `json:"name"`
	Amount int64  `json:"amount"`
}

type MarketplaceWbDecomposition struct {
	// Updated — Время последней синхронизации финансового отчёта
	Updated *string `json:"updated"`
	// Anchor — Последний день данных
	Anchor string                            `json:"anchor"`
	Months []MarketplaceWbDecompositionMonth `json:"months"`
	Month  *MarketplaceWbDecompositionMonth  `json:"month"`
	// Periods — Первый блок — накопительно за месяц, далее спринты
	Periods  []MarketplaceWbDecompositionPeriod  `json:"periods"`
	Articles []MarketplaceWbDecompositionArticle `json:"articles"`
	Other    *MarketplaceWbDecompositionOther    `json:"other"`
	// Demo — Аналитическая база не подключена и цифры синтетические
	Demo        *bool                            `json:"demo,omitempty"`
	Freshness   *MarketplaceComponentFreshness   `json:"freshness,omitempty"`
	DataThrough *MarketplaceComponentDataThrough `json:"data_through,omitempty"`
	// Incomplete — Хотя бы один обязательный компонент не загружался успешно, последняя загрузка завершилась ошибкой или давно не запускалась
	Incomplete *bool `json:"incomplete,omitempty"`
}

type MarketplaceWbDecompositionArticle struct {
	// StoreID — Внешний идентификатор магазина в аналитике
	StoreID   int64  `json:"store_id"`
	StoreName string `json:"store_name"`
	// OfferID — Артикул поставщика
	OfferID string `json:"offer_id"`
	// SKU — У Wildberries не заполняется — идентификатор карточки лежит в nm_id
	SKU  json.RawMessage `json:"sku"`
	NmID *int64          `json:"nm_id"`
	Name string          `json:"name"`
	// Category — Предмет WB
	Category string `json:"category"`
	Image    string `json:"image"`
	// URL — У Wildberries не заполняется и приходит пустой строкой
	URL string `json:"url"`
	// ByPeriod — Ключ — идентификатор блока периода
	ByPeriod map[string]MarketplaceWbMetricCell `json:"by_period"`
	// CostMissing — Себестоимость артикула не заведена: прибыль завышена (ERP-1169)
	CostMissing *bool `json:"cost_missing,omitempty"`
	// UnitsMissing — Площадка прислала выручку, но не количество проданных штук: себестоимость посчитана нулём (ERP-1217)
	UnitsMissing *bool `json:"units_missing,omitempty"`
}

type MarketplaceWbDecompositionMonth struct {
	Key string `json:"key"`
	// Label — Название месяца по-русски
	Label string `json:"label"`
	// Sub — Год
	Sub   string `json:"sub"`
	Start string `json:"start"`
	End   string `json:"end"`
}

type MarketplaceWbDecompositionOther struct {
	// ByPeriod — Суммы без привязки к артикулу по блокам периодов
	ByPeriod map[string]MarketplaceWbMetricCell `json:"by_period"`
	// Breakdown — Разбор строки «Прочее» по наименованиям операций
	Breakdown map[string][]MarketplaceWbDecompOtherItem `json:"breakdown"`
}

type MarketplaceWbDecompositionPeriod struct {
	// ID — Идентификатор блока: month либо s с номером спринта
	ID   string `json:"id"`
	Kind string `json:"kind"`
	// N — Номер спринта внутри месяца
	N     *int64 `json:"n"`
	Label string `json:"label"`
	// Sub — Границы блока в формате дня и месяца
	Sub   string `json:"sub"`
	Start string `json:"start"`
	End   string `json:"end"`
	// RunRateFactor — Множитель прогноза на полный период
	RunRateFactor float64                 `json:"run_rate_factor"`
	Totals        MarketplaceWbMetricCell `json:"totals"`
}

// MarketplaceWbMetricCell — Ячейка декомпозиции. Расходы приходят отрицательными числами.
type MarketplaceWbMetricCell struct {
	// ID — Идентификатор блока; присутствует только в итогах периода
	ID          *string  `json:"id,omitempty"`
	Revenue     int64    `json:"revenue"`
	Units       int64    `json:"units"`
	ReturnUnits int64    `json:"return_units"`
	Returns     int64    `json:"returns"`
	ReturnsPct  *float64 `json:"returns_pct"`
	// Commission — Вознаграждение WB как разница выплаты и дохода
	Commission       int64    `json:"commission"`
	CommissionPct    *float64 `json:"commission_pct"`
	Logistics        int64    `json:"logistics"`
	LogisticsPerUnit *int64   `json:"logistics_per_unit"`
	Storage          int64    `json:"storage"`
	Acceptance       int64    `json:"acceptance"`
	Penalty          int64    `json:"penalty"`
	Deduction        int64    `json:"deduction"`
	Acquiring        int64    `json:"acquiring"`
	// Other — Компенсации и прочие операции
	Other int64 `json:"other"`
	// InternalAd — Внутренняя реклама WB
	InternalAd int64 `json:"internal_ad"`
	// Drr — Доля рекламных расходов в выручке
	Drr       *float64 `json:"drr"`
	Cogs      int64    `json:"cogs"`
	Tax       int64    `json:"tax"`
	Expenses  int64    `json:"expenses"`
	Profit    int64    `json:"profit"`
	MarginPct *float64 `json:"margin_pct"`
	// RrRevenue — Выручка в прогнозе run-rate
	RrRevenue int64 `json:"rr_revenue"`
	// RrProfit — Прибыль в прогнозе run-rate; штрафы, удержания и прочее не проецируются
	RrProfit int64 `json:"rr_profit"`
}

type MarketplaceWbOrdersDay struct {
	Date      string `json:"date"`
	OrdersSum string `json:"orders_sum"`
	OrdersQty int64  `json:"orders_qty"`
	SalesSum  string `json:"sales_sum"`
	SalesQty  int64  `json:"sales_qty"`
}

type MarketplaceWbOrdersKpi struct {
	Sum string `json:"sum"`
	Qty int64  `json:"qty"`
	// DeltaSum — Изменение к предыдущему дню в процентах
	DeltaSum *float64 `json:"delta_sum"`
	// DeltaQty — Изменение к предыдущему дню в процентах
	DeltaQty *float64 `json:"delta_qty"`
}

type MarketplaceWbOrdersOverview struct {
	// Day — Последний день периода
	Day string `json:"day"`
	// From — Первый день периода
	From string `json:"from"`
	// To — Последний день периода включительно
	To string `json:"to"`
	// ChartFrom — Первый день графика: не позже from и не меньше 14 дней до to
	ChartFrom string                         `json:"chart_from"`
	Updated   *string                        `json:"updated"`
	Kpi       MarketplaceWbOrdersOverviewKpi `json:"kpi"`
	// Daily — Дни подряд от chart_from по to: не меньше 14
	Daily []MarketplaceWbOrdersDay `json:"daily"`
	// Products — Не более 200 товаров периода
	Products []MarketplaceWbOrdersProduct `json:"products"`
	// SummaryTotal — Недели и месяцы всего магазина (?summary=1): окно → заказано штук
	SummaryTotal map[string]int64 `json:"summary_total,omitempty"`
	// Demo — Аналитическая база не подключена и цифры синтетические
	Demo   *bool                    `json:"demo,omitempty"`
	Buyout *MarketplaceBuyoutCohort `json:"buyout,omitempty"`
}

type MarketplaceWbOrdersOverviewKpi struct {
	Orders MarketplaceWbOrdersKpi `json:"orders"`
	Sales  MarketplaceWbOrdersKpi `json:"sales"`
}

type MarketplaceWbOrdersProduct struct {
	// StoreID — Внешний идентификатор магазина в аналитике
	StoreID int64 `json:"store_id"`
	// OfferID — Артикул поставщика
	OfferID string `json:"offer_id"`
	NmID    *int64 `json:"nm_id"`
	// ProductName — Наименование карточки; при его отсутствии подставляется предмет
	ProductName  string `json:"product_name"`
	Units        int64  `json:"units"`
	AvgPrice     string `json:"avg_price"`
	Total        string `json:"total"`
	PrimaryImage string `json:"primary_image"`
	StoreName    string `json:"store_name"`
	Brand        string `json:"brand"`
	// ByDay — Заказано штук по дням периода: день ГГГГ-ММ-ДД → шт
	ByDay map[string]int64 `json:"by_day,omitempty"`
	// Summary — Недели и месяцы (?summary=1): окно (w3, w2, w1, prev_month, month) → заказано штук
	Summary map[string]int64 `json:"summary,omitempty"`
}

type MarketplaceWbPnl struct {
	PeriodKind string `json:"period_kind"`
	// Scheme — У Wildberries не заполняется и приходит пустой строкой
	Scheme  string  `json:"scheme"`
	Updated *string `json:"updated"`
	Year    int64   `json:"year"`
	Years   []int64 `json:"years"`
	// Range — Границы года ключами from и to
	Range   map[string]string        `json:"range"`
	Periods []MarketplaceWbPnlPeriod `json:"periods"`
	Rows    []MarketplaceWbPnlRow    `json:"rows"`
	Note    *string                  `json:"note,omitempty"`
	// Demo — Аналитическая база не подключена и цифры синтетические
	Demo *bool `json:"demo,omitempty"`
	// Breakdown — Разбор строки «Прочее» по периодам
	Breakdown map[string][]MarketplaceWbDecompOtherItem `json:"breakdown,omitempty"`
	// CostMissing — Сколько штук продано в периоде без действующей ставки себестоимости: они посчитаны с нулевой закупкой, маржа периода завышена. Ключ — начало периода
	CostMissing map[string]float64 `json:"cost_missing,omitempty"`
	// UnitsMissing — Выручка периода, по которой площадка не прислала количество проданных штук (ERP-1217): себестоимость посчитана нулём, маржа завышена. Ключ — начало периода. Заполняется только для Ozon
	UnitsMissing map[string]float64               `json:"units_missing,omitempty"`
	Freshness    *MarketplaceComponentFreshness   `json:"freshness,omitempty"`
	DataThrough  *MarketplaceComponentDataThrough `json:"data_through,omitempty"`
	// Incomplete — Хотя бы один обязательный компонент не загружался успешно, последняя загрузка завершилась ошибкой или давно не запускалась
	Incomplete *bool `json:"incomplete,omitempty"`
}

type MarketplaceWbPnlPeriod struct {
	Key   string `json:"key"`
	Label string `json:"label"`
	Sub   string `json:"sub"`
	Start string `json:"start"`
	End   string `json:"end"`
}

type MarketplaceWbPnlRow struct {
	Key   string `json:"key"`
	Label string `json:"label"`
	Kind  string `json:"kind"`
	// Values — Значения по периодам в порядке periods
	Values []*float64 `json:"values"`
}

type MarketplaceWbProduct struct {
	// ID — Составной ключ строки: идентификатор магазина и артикул поставщика через двоеточие
	ID        string `json:"id"`
	Store     UUID   `json:"store"`
	StoreName string `json:"store_name"`
	// NmID — Идентификатор карточки WB
	NmID *int64 `json:"nm_id"`
	// VendorCode — Артикул поставщика
	VendorCode string `json:"vendor_code"`
	// SKU — Баркод карточки
	SKU         string `json:"sku"`
	ProductName string `json:"product_name"`
	Brand       string `json:"brand"`
	// SubjectName — Предмет WB
	SubjectName string `json:"subject_name"`
	PhotoURL    string `json:"photo_url"`
	VAT         string `json:"vat"`
	VolumeL     string `json:"volume_l"`
	// Price — Цена со скидкой продавца
	Price string `json:"price"`
	// OldPrice — Цена до скидки продавца
	OldPrice        string `json:"old_price"`
	DiscountPercent int64  `json:"discount_percent"`
	// BuyerPrice — Последняя цена покупателя из продаж или закупок или продаж
	BuyerPrice      string `json:"buyer_price"`
	Stock           int64  `json:"stock"`
	InWayToClient   int64  `json:"in_way_to_client"`
	InWayFromClient int64  `json:"in_way_from_client"`
	// Cost — Себестоимость из кабинета
	Cost *string `json:"cost"`
	// LinkedProductID — Номенклатура кабинета, к которой привязан артикул канала (core_product_identifier вида channel_article); null — не привязан
	LinkedProductID *UUID `json:"linked_product_id"`
	// LinkedProductSKU — SKU привязанной номенклатуры; пусто без связи
	LinkedProductSKU string `json:"linked_product_sku"`
	// LinkedProductName — Название привязанной номенклатуры; пусто без связи
	LinkedProductName string `json:"linked_product_name"`
}

type MarketplaceWbProductPage struct {
	Count int64 `json:"count"`
	// Next — Задел под курсорную страницу; сейчас всегда пусто
	Next json.RawMessage `json:"next"`
	// Previous — Задел под курсорную страницу; сейчас всегда пусто
	Previous json.RawMessage        `json:"previous"`
	Results  []MarketplaceWbProduct `json:"results"`
	// Demo — Аналитическая база не подключена и цифры синтетические
	Demo *bool `json:"demo,omitempty"`
}

type MarketplaceWbStockPage struct {
	// Count — Число товаров, а не строк «товар × склад»
	Count int64 `json:"count"`
	// Warehouses — Склады в порядке первого появления
	Warehouses []string                    `json:"warehouses"`
	Results    []MarketplaceWbStockProduct `json:"results"`
	// Truncated — Строк «товар × склад» больше предела 8000: хвост артикулов не пришёл, отсутствие товара не значит «остатка нет»
	Truncated *bool `json:"truncated,omitempty"`
}

type MarketplaceWbStockProduct struct {
	Store     UUID   `json:"store"`
	StoreName string `json:"store_name"`
	// OfferID — Артикул поставщика
	OfferID    string                        `json:"offer_id"`
	Name       string                        `json:"name"`
	Image      string                        `json:"image"`
	Total      int64                         `json:"total"`
	Warehouses []MarketplaceWbStockWarehouse `json:"warehouses"`
	// ToClient — Товар в пути к покупателю, шт
	ToClient *int64 `json:"to_client,omitempty"`
	// BuyoutPct — Выкуп, % — когорта созревших заказов, как у воронки; нет — поля нет
	BuyoutPct *float64 `json:"buyout_pct,omitempty"`
	// Effective — Остаток с возвратом невыкупленного из того, что в пути: остаток + в пути × (1 − выкуп)
	Effective *float64 `json:"effective,omitempty"`
}

type MarketplaceWbStockWarehouse struct {
	Warehouse string `json:"warehouse"`
	// Cluster — Кластер склада; у Wildberries не заполняется и в ответ не попадает
	Cluster *string `json:"cluster,omitempty"`
	Qty     int64   `json:"qty"`
}

type MarketplaceYandexCost struct {
	Store   UUID   `json:"store"`
	OfferID string `json:"offer_id"`
	// Cost — Себестоимость decimal строкой
	Cost string `json:"cost"`
}

type MarketplaceYandexCostInput struct {
	Store UUID `json:"store"`
	// OfferID — Артикул продавца
	OfferID string `json:"offer_id"`
	// Cost — Себестоимость decimal строкой; пустая строка сохраняется как ноль
	Cost *string `json:"cost,omitempty"`
	// Note — Комментарий; сохраняется, но в ответ не возвращается
	Note *string `json:"note,omitempty"`
}

type MarketplaceYandexOrdersDay struct {
	Date string `json:"date"`
	// OrdersSum — Сумма продаж или закупок кроме отменённых; decimal строкой
	OrdersSum string `json:"orders_sum"`
	OrdersQty int64  `json:"orders_qty"`
	// SalesSum — Сумма доставленных продаж или закупок; decimal строкой
	SalesSum string `json:"sales_sum"`
	SalesQty int64  `json:"sales_qty"`
}

type MarketplaceYandexOrdersKpi struct {
	// Sum — Сумма decimal строкой
	Sum string `json:"sum"`
	Qty int64  `json:"qty"`
	// DeltaSum — Изменение суммы ко вчерашнему дню в процентах; null когда вчера было пусто
	DeltaSum *float64 `json:"delta_sum"`
	// DeltaQty — Изменение количества ко вчерашнему дню в процентах; null когда вчера было пусто
	DeltaQty *float64 `json:"delta_qty"`
}

type MarketplaceYandexOrdersOverview struct {
	// Day — Последний день периода; без параметров — последний день с продажами или закупками
	Day string `json:"day"`
	// From — Первый день периода
	From string `json:"from"`
	// To — Последний день периода включительно
	To string `json:"to"`
	// ChartFrom — Первый день графика: не позже from и не меньше 14 дней до to
	ChartFrom string `json:"chart_from"`
	// Updated — Момент последней синхронизации источника
	Updated *string                            `json:"updated"`
	Kpi     MarketplaceYandexOrdersOverviewKpi `json:"kpi"`
	// Daily — Дни подряд от chart_from по to по возрастанию даты; дни без заказов заполнены нулями
	Daily []MarketplaceYandexOrdersDay `json:"daily"`
	// Products — Товары периода по убыванию суммы
	Products []MarketplaceYandexOrdersProduct `json:"products"`
	// SummaryTotal — Недели и месяцы всего магазина (?summary=1): окно → заказано штук
	SummaryTotal map[string]int64 `json:"summary_total,omitempty"`
	// Demo — Присутствует и равно true только в офлайн-ответе без аналитической базы; цифры синтетические
	Demo *bool `json:"demo,omitempty"`
}

type MarketplaceYandexOrdersOverviewKpi struct {
	Orders MarketplaceYandexOrdersKpi `json:"orders"`
	Sales  MarketplaceYandexOrdersKpi `json:"sales"`
}

// MarketplaceYandexOrdersProduct — Строка товара за день. Поле market_sku приходит из аналитической базы, поле sku — из офлайн-ответа без неё.
type MarketplaceYandexOrdersProduct struct {
	// StoreID — external_id магазина, а не его UUID
	StoreID   int64  `json:"store_id"`
	StoreName string `json:"store_name"`
	// OfferID — Артикул продавца
	OfferID string `json:"offer_id"`
	// MarketSKU — Строкой, в отличие от целого market_sku витрины товаров; отсутствует в офлайн-ответе
	MarketSKU *string `json:"market_sku,omitempty"`
	// SKU — Только в офлайн-ответе без аналитической базы
	SKU         *int64 `json:"sku,omitempty"`
	ProductName string `json:"product_name"`
	Units       int64  `json:"units"`
	// AvgPrice — Средняя цена decimal строкой
	AvgPrice string `json:"avg_price"`
	// Total — Сумма decimal строкой
	Total        string `json:"total"`
	PrimaryImage string `json:"primary_image"`
	URL          string `json:"url"`
	// ByDay — Заказано штук по дням периода: день ГГГГ-ММ-ДД → шт
	ByDay map[string]int64 `json:"by_day,omitempty"`
	// Summary — Недели и месяцы (?summary=1): окно (w3, w2, w1, prev_month, month) → заказано штук
	Summary map[string]int64 `json:"summary,omitempty"`
}

type MarketplaceYandexPnl struct {
	PeriodKind string `json:"period_kind"`
	// Scheme — В боевом ответе пустая строка; заполняется только в демо-ответе
	Scheme string `json:"scheme"`
	// Updated — Момент последней синхронизации источника
	Updated *string `json:"updated"`
	Year    int64   `json:"year"`
	// Years — Годы, за которые есть данные
	Years   []int64                      `json:"years"`
	Range   MarketplaceYandexPnlRange    `json:"range"`
	Periods []MarketplaceYandexPnlPeriod `json:"periods"`
	Rows    []MarketplaceYandexPnlRow    `json:"rows"`
	// CostMissing — Сколько штук продано в периоде без действующей ставки себестоимости: они посчитаны с нулевой закупкой, маржа периода завышена. Ключ — начало периода
	CostMissing map[string]float64 `json:"cost_missing,omitempty"`
	// UnitsMissing — Выручка периода, по которой площадка не прислала количество проданных штук (ERP-1217): себестоимость посчитана нулём, маржа завышена. Ключ — начало периода. Заполняется только для Ozon
	UnitsMissing map[string]float64 `json:"units_missing,omitempty"`
	// Note — Пояснение к неполноте источника
	Note *string `json:"note,omitempty"`
	// Demo — Присутствует и равно true только в офлайн-ответе без аналитической базы; цифры синтетические
	Demo *bool `json:"demo,omitempty"`
}

type MarketplaceYandexPnlRange struct {
	From string `json:"from"`
	To   string `json:"to"`
}

type MarketplaceYandexPnlPeriod struct {
	// Key — Первый день периода
	Key string `json:"key"`
	// Label — Номер недели ISO или название месяца
	Label string `json:"label"`
	// Sub — Диапазон дат недели или год месяца
	Sub   string `json:"sub"`
	Start string `json:"start"`
	End   string `json:"end"`
}

type MarketplaceYandexPnlRow struct {
	Key   string `json:"key"`
	Label string `json:"label"`
	Kind  string `json:"kind"`
	// Values — По одному значению на период в том же порядке; null означает, что показатель не считается
	Values []*float64 `json:"values"`
}

type MarketplaceYandexProduct struct {
	// ID — Составной ключ вида «UUID магазина двоеточие артикул»
	ID        string `json:"id"`
	Store     UUID   `json:"store"`
	StoreName string `json:"store_name"`
	// OfferID — Артикул продавца
	OfferID     string `json:"offer_id"`
	MarketSKU   *int64 `json:"market_sku"`
	ProductName string `json:"product_name"`
	Category    string `json:"category"`
	Vendor      string `json:"vendor"`
	Barcode     string `json:"barcode"`
	// Price — Базовая цена decimal строкой; пустая строка когда цены нет
	Price string `json:"price"`
	// OldPrice — Цена до скидки decimal строкой; пустая строка когда её нет
	OldPrice     string `json:"old_price"`
	Stock        int64  `json:"stock"`
	StatusName   string `json:"status_name"`
	PrimaryImage string `json:"primary_image"`
	// URL — Первая ссылка витрины; пустая строка когда её нет
	URL string `json:"url"`
	// Cost — Себестоимость decimal строкой; null когда она не заведена
	Cost *string `json:"cost"`
	// LinkedProductID — Номенклатура кабинета, к которой привязан артикул канала (core_product_identifier вида channel_article); null — не привязан
	LinkedProductID *UUID `json:"linked_product_id"`
	// LinkedProductSKU — SKU привязанной номенклатуры; пусто без связи
	LinkedProductSKU string `json:"linked_product_sku"`
	// LinkedProductName — Название привязанной номенклатуры; пусто без связи
	LinkedProductName string `json:"linked_product_name"`
}

type MarketplaceYandexProductPage struct {
	Count int64 `json:"count"`
	// Next — Всегда null — страницы листаются параметрами page и page_size
	Next json.RawMessage `json:"next"`
	// Previous — Всегда null — страницы листаются параметрами page и page_size
	Previous json.RawMessage            `json:"previous"`
	Results  []MarketplaceYandexProduct `json:"results"`
	// Demo — Присутствует и равно true только в офлайн-ответе без аналитической базы; цифры синтетические
	Demo *bool `json:"demo,omitempty"`
}

type Meeting struct {
	ID              UUID                 `json:"id"`
	ProjectID       UUID                 `json:"project_id"`
	ProjectKey      string               `json:"project_key"`
	ProjectName     string               `json:"project_name"`
	Title           string               `json:"title"`
	Kind            MeetingKind          `json:"kind"`
	Status          MeetingStatus        `json:"status"`
	StartsAt        string               `json:"starts_at"`
	DurationMinutes int64                `json:"duration_minutes"`
	Location        string               `json:"location"`
	MeetingURL      string               `json:"meeting_url"`
	RecordingURL    string               `json:"recording_url"`
	Summary         string               `json:"summary"`
	Transcript      string               `json:"transcript"`
	HasTranscript   bool                 `json:"has_transcript"`
	CalendarEventID *UUID                `json:"calendar_event_id"`
	Visibility      HubVisibility        `json:"visibility"`
	CreatedBy       *int64               `json:"created_by"`
	CreatedAt       string               `json:"created_at"`
	UpdatedAt       string               `json:"updated_at"`
	Participants    []MeetingParticipant `json:"participants"`
	Items           []MeetingItem        `json:"items"`
}

type MeetingCreate struct {
	ID              *string                   `json:"id,omitempty"`
	Project         string                    `json:"project"`
	Title           string                    `json:"title"`
	Kind            *MeetingKind              `json:"kind,omitempty"`
	Status          *MeetingStatus            `json:"status,omitempty"`
	StartsAt        string                    `json:"starts_at"`
	DurationMinutes *int64                    `json:"duration_minutes,omitempty"`
	Location        *string                   `json:"location,omitempty"`
	MeetingURL      *string                   `json:"meeting_url,omitempty"`
	RecordingURL    *string                   `json:"recording_url,omitempty"`
	Summary         *string                   `json:"summary,omitempty"`
	Transcript      *string                   `json:"transcript,omitempty"`
	CalendarEvent   *string                   `json:"calendar_event,omitempty"`
	Visibility      *HubVisibility            `json:"visibility,omitempty"`
	CreatedBy       *int64                    `json:"created_by,omitempty"`
	Participants    []MeetingParticipantInput `json:"participants,omitempty"`
	Items           []MeetingItemInput        `json:"items,omitempty"`
	ReplaceContent  *bool                     `json:"replace_content,omitempty"`
}

type MeetingItem struct {
	ID          UUID            `json:"id"`
	Kind        MeetingItemKind `json:"kind"`
	Title       string          `json:"title"`
	Body        string          `json:"body"`
	TaskID      *UUID           `json:"task_id"`
	TaskKey     string          `json:"task_key"`
	TaskTitle   string          `json:"task_title"`
	OwnerUserID *int64          `json:"owner_user_id"`
	OwnerName   string          `json:"owner_name"`
	DueDate     string          `json:"due_date"`
	SortOrder   int64           `json:"sort_order"`
}

type MeetingItemInput struct {
	Kind      MeetingItemKind `json:"kind"`
	Title     string          `json:"title"`
	Body      *string         `json:"body,omitempty"`
	Task      *string         `json:"task,omitempty"`
	OwnerUser *int64          `json:"owner_user,omitempty"`
	OwnerName *string         `json:"owner_name,omitempty"`
	DueDate   *string         `json:"due_date,omitempty"`
}

type MeetingItemKind = string

type MeetingKind = string

type MeetingPage struct {
	Count   int64     `json:"count"`
	Results []Meeting `json:"results"`
}

type MeetingParticipant struct {
	ID            UUID   `json:"id"`
	UserID        *int64 `json:"user_id"`
	UserName      string `json:"user_name"`
	ExternalName  string `json:"external_name"`
	ExternalEmail string `json:"external_email"`
	Role          string `json:"role"`
	Attended      bool   `json:"attended"`
}

type MeetingParticipantInput struct {
	User          *int64  `json:"user,omitempty"`
	ExternalName  *string `json:"external_name,omitempty"`
	ExternalEmail *string `json:"external_email,omitempty"`
	Role          *string `json:"role,omitempty"`
	Attended      *bool   `json:"attended,omitempty"`
}

type MeetingStatus = string

// MeetingUpdate — URL-путь задаёт `id`; переданные непустые поля обновляются частично.
type MeetingUpdate struct {
	Project         *string                   `json:"project,omitempty"`
	Title           *string                   `json:"title,omitempty"`
	Kind            *MeetingKind              `json:"kind,omitempty"`
	Status          *MeetingStatus            `json:"status,omitempty"`
	StartsAt        *string                   `json:"starts_at,omitempty"`
	DurationMinutes *int64                    `json:"duration_minutes,omitempty"`
	Location        *string                   `json:"location,omitempty"`
	MeetingURL      *string                   `json:"meeting_url,omitempty"`
	RecordingURL    *string                   `json:"recording_url,omitempty"`
	Summary         *string                   `json:"summary,omitempty"`
	Transcript      *string                   `json:"transcript,omitempty"`
	CalendarEvent   *string                   `json:"calendar_event,omitempty"`
	Visibility      *HubVisibility            `json:"visibility,omitempty"`
	CreatedBy       *int64                    `json:"created_by,omitempty"`
	Participants    []MeetingParticipantInput `json:"participants,omitempty"`
	Items           []MeetingItemInput        `json:"items,omitempty"`
	ReplaceContent  *bool                     `json:"replace_content,omitempty"`
}

type Milestone struct {
	ID          UUID    `json:"id"`
	Section     UUID    `json:"section"`
	SectionKey  string  `json:"section_key"`
	SectionName string  `json:"section_name"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	TargetDate  *string `json:"target_date"`
	Order       int64   `json:"order"`
	IsArchived  bool    `json:"is_archived"`
	// TaskCount — Живые задачи вехи, без архивных
	TaskCount int64 `json:"task_count"`
	// TasksDone — Из них в финальном статусе
	TasksDone int64  `json:"tasks_done"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type MilestoneCreate struct {
	// Section — UUID, ключ или имя проекта задач
	Section     string  `json:"section"`
	Name        string  `json:"name"`
	Description *string `json:"description,omitempty"`
	TargetDate  *string `json:"target_date,omitempty"`
	Order       *int64  `json:"order,omitempty"`
}

type MilestonePage struct {
	Count   int64       `json:"count"`
	Results []Milestone `json:"results"`
}

type MilestoneUpdate struct {
	Section     *string `json:"section,omitempty"`
	Name        *string `json:"name,omitempty"`
	Description *string `json:"description,omitempty"`
	TargetDate  *string `json:"target_date,omitempty"`
	Order       *int64  `json:"order,omitempty"`
	IsArchived  *bool   `json:"is_archived,omitempty"`
}

type OK struct {
	OK json.RawMessage `json:"ok"`
}

type PlatformApp struct {
	ID UUID `json:"id"`
	// Publisher — Издатель: строчные латинские буквы, цифры и дефисы
	Publisher string `json:"publisher"`
	// Key — Ключ приложения; вместе с издателем образует пространство имён app.<издатель>.<ключ>
	Key    string            `json:"key"`
	Title  string            `json:"title"`
	Status PlatformAppStatus `json:"status"`
	// Internal — Наше приложение: его установка получает долгий потолок срока жизни токена. Ставится персоналом платформы, из манифеста не выводится
	Internal *bool `json:"internal,omitempty"`
	// CreatedBy — Сотрудник платформы, заведший приложение
	CreatedBy *int64 `json:"created_by,omitempty"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type PlatformAppInstallationStatus = string

type PlatformAppPublisher struct {
	ID UUID `json:"id"`
	// Slug — Сегмент пространства имён app.<издатель>.<ключ>; неизменен
	Slug string `json:"slug"`
	// LegalName — Что видит администратор кабинета на экране согласия; правка снимает проверку
	LegalName string `json:"legal_name"`
	// Country — Код страны из двух букв
	Country string `json:"country"`
	// Homepage — Внешний адрес https; правка снимает проверку
	Homepage     string `json:"homepage"`
	ContactEmail string `json:"contact_email"`
	// IncidentEmail — Отдельный адрес на аварию, чтобы она не стояла в общей очереди поддержки
	IncidentEmail string                     `json:"incident_email"`
	Status        PlatformAppPublisherStatus `json:"status"`
	// VerificationMethod — Чем подтверждали; пусто у непроверенного
	VerificationMethod string `json:"verification_method"`
	// VerificationEvidence — Основание проверки текстом: через полгода вопрос будет не «проверен ли», а «на основании чего»
	VerificationEvidence  string  `json:"verification_evidence"`
	VerifiedAt            *string `json:"verified_at,omitempty"`
	VerifiedBy            *int64  `json:"verified_by,omitempty"`
	VerificationDroppedAt *string `json:"verification_dropped_at,omitempty"`
	// VerificationDroppedReason — Почему проверку сняли; отличает «ещё не проверяли» от «проверенное имя поменяли»
	VerificationDroppedReason string  `json:"verification_dropped_reason"`
	SuspendedAt               *string `json:"suspended_at,omitempty"`
	SuspendReason             string  `json:"suspend_reason"`
	CreatedBy                 *int64  `json:"created_by,omitempty"`
	CreatedAt                 string  `json:"created_at"`
	UpdatedAt                 string  `json:"updated_at"`
}

type PlatformAppPublisherStatus = string

type PlatformAppStatus = string

type PlatformAppVersion struct {
	ID      UUID   `json:"id"`
	AppID   UUID   `json:"app_id"`
	Version string `json:"version"`
	// Manifest — Манифест версии целиком; источник правды о правах и политике данных
	Manifest map[string]json.RawMessage `json:"manifest"`
	// ManifestDigest — Digest пакета: без него подмену артефакта не с чем сравнить
	ManifestDigest string `json:"manifest_digest"`
	// RequestedScopes — Что версия просит; одобренное живёт у установки
	RequestedScopes []string                 `json:"requested_scopes"`
	Status          PlatformAppVersionStatus `json:"status"`
	ReleasedAt      *string                  `json:"released_at,omitempty"`
	CreatedAt       string                   `json:"created_at"`
	UpdatedAt       string                   `json:"updated_at"`
}

type PlatformAppVersionStatus = string

type Project struct {
	ID           UUID    `json:"id"`
	Key          string  `json:"key"`
	Name         string  `json:"name"`
	Description  string  `json:"description"`
	Color        string  `json:"color"`
	Order        float64 `json:"order"`
	Sections     int64   `json:"sections"`
	TasksTotal   int64   `json:"tasks_total"`
	TasksActive  int64   `json:"tasks_active"`
	TasksDone    int64   `json:"tasks_done"`
	ScrumEnabled bool    `json:"scrum_enabled"`
	// BusinessID — Бизнес проекта: правило «все задачи» при области доступа не на все бизнесы видит только проекты её бизнесов и кабинета; участники проекта видят его всегда. null — проект всего кабинета
	BusinessID *UUID `json:"business_id"`
}

type ProjectCreate struct {
	Name        string  `json:"name"`
	Key         *string `json:"key,omitempty"`
	Description *string `json:"description,omitempty"`
	Color       *string `json:"color,omitempty"`
	// BusinessID — Бизнес проекта. Пусто — единственный бизнес области доступа или весь кабинет (его заводит только доступ ко всем бизнесам). Бизнес вне области доступа — 403 tasks.project_business_forbidden
	BusinessID *UUID `json:"business_id,omitempty"`
}

type ProjectPage struct {
	Count   int64     `json:"count"`
	Results []Project `json:"results"`
}

type PullRequest struct {
	ID         UUID                 `json:"id"`
	OwnerType  PullRequestOwnerType `json:"owner_type"`
	OwnerID    UUID                 `json:"owner_id"`
	OwnerKey   string               `json:"owner_key"`
	OwnerName  string               `json:"owner_name"`
	Provider   string               `json:"provider"`
	Repository string               `json:"repository"`
	Number     string               `json:"number"`
	Title      string               `json:"title"`
	URL        string               `json:"url"`
	Status     string               `json:"status"`
	Branch     string               `json:"branch"`
	CommitSha  string               `json:"commit_sha"`
	IsArchived bool                 `json:"is_archived"`
	CreatedAt  string               `json:"created_at"`
	UpdatedAt  string               `json:"updated_at"`
}

// PullRequestCreate — Владелец задаётся `task`, `section` или парой `owner_type`/`owner_id`.
type PullRequestCreate struct {
	OwnerType  *PullRequestOwnerType `json:"owner_type,omitempty"`
	OwnerID    *string               `json:"owner_id,omitempty"`
	Task       *string               `json:"task,omitempty"`
	Section    *string               `json:"section,omitempty"`
	Provider   *string               `json:"provider,omitempty"`
	Repository *string               `json:"repository,omitempty"`
	Number     *string               `json:"number,omitempty"`
	Title      *string               `json:"title,omitempty"`
	URL        string                `json:"url"`
	Status     *string               `json:"status,omitempty"`
	Branch     *string               `json:"branch,omitempty"`
	CommitSha  *string               `json:"commit_sha,omitempty"`
}

type PullRequestOwnerType = string

type PullRequestPage struct {
	Count   int64         `json:"count"`
	Results []PullRequest `json:"results"`
}

type PullRequestUpdate struct {
	Provider   *string `json:"provider,omitempty"`
	Repository *string `json:"repository,omitempty"`
	Number     *string `json:"number,omitempty"`
	Title      *string `json:"title,omitempty"`
	URL        *string `json:"url,omitempty"`
	Status     *string `json:"status,omitempty"`
	Branch     *string `json:"branch,omitempty"`
	CommitSha  *string `json:"commit_sha,omitempty"`
	IsArchived *bool   `json:"is_archived,omitempty"`
}

type Relation struct {
	ID                        UUID              `json:"id"`
	Source                    UUID              `json:"source"`
	Target                    UUID              `json:"target"`
	TargetIdentifier          string            `json:"target_identifier"`
	TargetTitle               string            `json:"target_title"`
	Kind                      RelationKind      `json:"kind"`
	Direction                 RelationDirection `json:"direction"`
	Counterpart               UUID              `json:"counterpart"`
	CounterpartIdentifier     string            `json:"counterpart_identifier"`
	CounterpartTitle          string            `json:"counterpart_title"`
	CounterpartStatus         *string           `json:"counterpart_status"`
	CounterpartStatusCategory *string           `json:"counterpart_status_category"`
}

type RelationCreate struct {
	Target UUID          `json:"target"`
	Kind   *RelationKind `json:"kind,omitempty"`
}

type RelationDirection = string

type RelationKind = string

type RelationList = []Relation

type Section struct {
	ID           UUID                   `json:"id"`
	Project      *UUID                  `json:"project"`
	ProjectKey   *string                `json:"project_key"`
	ProjectName  *string                `json:"project_name"`
	Key          string                 `json:"key"`
	Name         string                 `json:"name"`
	Description  string                 `json:"description"`
	Color        string                 `json:"color"`
	Icon         string                 `json:"icon"`
	Status       string                 `json:"status"`
	Lead         *int64                 `json:"lead"`
	LeadName     *string                `json:"lead_name"`
	TargetDate   *string                `json:"target_date"`
	TasksTotal   int64                  `json:"tasks_total"`
	TasksActive  int64                  `json:"tasks_active"`
	TasksDone    int64                  `json:"tasks_done"`
	TasksOverdue int64                  `json:"tasks_overdue"`
	MembersCount int64                  `json:"members_count"`
	Members      []SectionMemberPreview `json:"members"`
}

type SectionCreate struct {
	Project     UUID    `json:"project"`
	Key         *string `json:"key,omitempty"`
	Name        string  `json:"name"`
	Description *string `json:"description,omitempty"`
	Color       *string `json:"color,omitempty"`
	Icon        *string `json:"icon,omitempty"`
	Status      *string `json:"status,omitempty"`
	Lead        *int64  `json:"lead,omitempty"`
	TargetDate  *string `json:"target_date,omitempty"`
}

type SectionMember struct {
	ID        UUID        `json:"id"`
	User      int64       `json:"user"`
	Username  string      `json:"username"`
	UserName  string      `json:"user_name"`
	Role      SectionRole `json:"role"`
	CreatedAt string      `json:"created_at"`
}

// SectionMemberAssignment — Если пользователь не передан, сервер добавляет текущего пользователя.
type SectionMemberAssignment struct {
	UserID *int64       `json:"user_id,omitempty"`
	User   *int64       `json:"user,omitempty"`
	Role   *SectionRole `json:"role,omitempty"`
}

type SectionMemberPreview struct {
	ID       UUID        `json:"id"`
	User     int64       `json:"user"`
	UserName *string     `json:"user_name"`
	Role     SectionRole `json:"role"`
}

type SectionPage struct {
	Count   int64     `json:"count"`
	Results []Section `json:"results"`
}

type SectionRole = string

type SectionUpdate struct {
	Project     *UUID   `json:"project,omitempty"`
	Key         *string `json:"key,omitempty"`
	Name        *string `json:"name,omitempty"`
	Description *string `json:"description,omitempty"`
	Color       *string `json:"color,omitempty"`
	Icon        *string `json:"icon,omitempty"`
	Status      *string `json:"status,omitempty"`
	Lead        *int64  `json:"lead,omitempty"`
	TargetDate  *string `json:"target_date,omitempty"`
}

type SettingsCompany struct {
	ID         UUID   `json:"id"`
	BusinessID UUID   `json:"business_id"`
	Name       string `json:"name"`
	LegalName  string `json:"legal_name"`
	// EntityType — Юридическое лицо или индивидуальный предприниматель
	EntityType string `json:"entity_type"`
	// INN — Пустой только у юрлица внутреннего учёта
	INN string `json:"inn"`
	KPP string `json:"kpp"`
	// Ogrn — ОГРН у юрлица или ОГРНИП у предпринимателя
	Ogrn string `json:"ogrn"`
	// Okpo — ОКПО; необязательный реквизит формализованного документа
	Okpo string `json:"okpo"`
	// BranchCode — Код филиала у оператора ЭДО; не КПП
	BranchCode string `json:"branch_code"`
	// VATAccountingMode — Режим налога, действующий сегодня (версия учётной политики): deductible — в вычет, non_deductible — в стоимость, none — налога нет, пусто — не выбран
	VATAccountingMode string `json:"vat_accounting_mode"`
	// VATAccountingModeSource — Кто поставил значение: manual — человек, import — внешняя система; импорт не перезаписывает manual
	VATAccountingModeSource string                 `json:"vat_accounting_mode_source"`
	LegalAddress            SettingsCompanyAddress `json:"legal_address"`
	Entrepreneur            SettingsCompanyPerson  `json:"entrepreneur"`
	Head                    *SettingsCompanyHead   `json:"head,omitempty"`
	IsActive                bool                   `json:"is_active"`
	// Custom — Значения своих полей кабинета: графа («Настройки → Поля», вид core.company) → значение
	Custom map[string]json.RawMessage `json:"custom"`
	// ClosingControl — Контроль закрывающих документов по выданным авансам: вкладка «Ждём закрывающие» ведёт авансы этого юрлица. Для режима «доходы минус расходы» обязателен, на «доходах» не нужен
	ClosingControl *bool `json:"closing_control,omitempty"`
}

type SettingsCompanyAddress struct {
	PostalCode string `json:"postal_code"`
	// RegionCode — Код субъекта РФ для формализованного документа
	RegionCode string `json:"region_code"`
	RegionName string `json:"region_name"`
	District   string `json:"district"`
	City       string `json:"city"`
	Settlement string `json:"settlement"`
	Street     string `json:"street"`
	Building   string `json:"building"`
	Block      string `json:"block"`
	// Flat — Офис или помещение
	Flat string `json:"flat"`
	// Info — Дополнение, которое не раскладывается по остальным частям адреса
	Info string `json:"info"`
}

// SettingsCompanyHead — Руководитель юрлица полным ФИО и должностью — подписант документов без доверенности; ФИО как в сертификате подписи
type SettingsCompanyHead struct {
	Surname    *string `json:"surname,omitempty"`
	Name       *string `json:"name,omitempty"`
	Patronymic *string `json:"patronymic,omitempty"`
	Position   *string `json:"position,omitempty"`
}

type SettingsCompanyPage struct {
	// Count — Число отданных строк, страниц у справочника нет
	Count   int64             `json:"count"`
	Results []SettingsCompany `json:"results"`
}

type SettingsCompanyPerson struct {
	Surname    string `json:"surname"`
	Name       string `json:"name"`
	Patronymic string `json:"patronymic"`
	// OgrnipDate — Дата присвоения ОГРНИП; с 01.04.2026 печатается в счёте-фактуре под подписью ИП вместе с ОГРНИП
	OgrnipDate *string `json:"ogrnip_date,omitempty"`
}

type SettingsMember struct {
	// ID — Идентификатор членства в кабинете, а не человека
	ID UUID `json:"id"`
	// UserID — Идентификатор человека в общем реестре платформы
	UserID       int64   `json:"user_id"`
	Username     string  `json:"username"`
	FullName     string  `json:"full_name"`
	BirthDate    *string `json:"birth_date"`
	AvatarURL    string  `json:"avatar_url"`
	Role         *UUID   `json:"role"`
	RoleName     *string `json:"role_name"`
	CompanyScope string  `json:"company_scope"`
	// Companies — Заполнен при company_scope selected
	Companies []UUID `json:"companies"`
	IsActive  bool   `json:"is_active"`
	// AllBusinesses — Роль действует во всех бизнесах кабинета, включая заведённые позже. У администратора всегда true
	AllBusinesses bool `json:"all_businesses"`
	// Businesses — Бизнесы сотрудника; пуст при all_businesses
	Businesses []SettingsMemberBusinessScope `json:"businesses"`
}

type SettingsMemberAccessInput struct {
	// AllBusinesses — Все бизнесы кабинета; тогда businesses не передаётся
	AllBusinesses *bool `json:"all_businesses,omitempty"`
	// Businesses — Бизнесы сотрудника целиком; повторы и юрлица бизнеса, выданного целиком, сворачиваются
	Businesses []SettingsMemberBusinessScope `json:"businesses,omitempty"`
}

type SettingsMemberBusinessScope struct {
	Business UUID `json:"business"`
	// Company — Сужает доступ до юрлица этого бизнеса; без поля — бизнес целиком
	Company *UUID `json:"company,omitempty"`
}

type SettingsMemberPage struct {
	// Count — Число строк в results, а не общее число участников кабинета
	Count   int64            `json:"count"`
	Results []SettingsMember `json:"results"`
}

type SettingsRole struct {
	ID   UUID   `json:"id"`
	Name string `json:"name"`
	// IsAdmin — У административной роли permissions всегда равны ["*:*"]
	IsAdmin  bool `json:"is_admin"`
	IsActive bool `json:"is_active"`
	// Permissions — Право записывается как «модуль:действие», например settings:read
	Permissions []string `json:"permissions"`
	// RecordRules — Ключ — ресурс модуля: tasks.task, crm.lead, crm.deal, crm.customer, crm.conversation, core.order, docflow.payment_request и ресурсы клиентских модулей. Значение — own (свои), projects (свои и проекты участия, у задач), team (свои и подчинённых), department (своего подразделения), department_tree (подразделения с подотделами) или all (все записи области). Пустая карта означает видимость только своих записей
	RecordRules map[string]string `json:"record_rules"`
}

type SettingsRolePage struct {
	// Count — Число строк в results, а не общее число ролей кабинета
	Count   int64          `json:"count"`
	Results []SettingsRole `json:"results"`
}

type SettingsVatRates struct {
	// Rates — Фиксированный профиль 22, 20, 10 и 0 процентов
	Rates []int64 `json:"rates"`
}

type SprintAgingTask struct {
	ID      UUID   `json:"id"`
	Code    string `json:"code"`
	Title   string `json:"title"`
	Seconds int64  `json:"seconds"`
}

type SprintMetrics struct {
	Cycle             UUID                    `json:"cycle"`
	WindowFrom        string                  `json:"window_from"`
	WindowTo          string                  `json:"window_to"`
	Throughput        int64                   `json:"throughput"`
	ThroughputHistory []SprintThroughputPoint `json:"throughput_history"`
	LeadTime          DurationMetric          `json:"lead_time"`
	ReviewTime        DurationMetric          `json:"review_time"`
	ReviewedTasks     int64                   `json:"reviewed_tasks"`
	ReturnedToWork    int64                   `json:"returned_to_work"`
	ReworkPercent     float64                 `json:"rework_percent"`
	AgingWip          []SprintAgingTask       `json:"aging_wip"`
	Sizing            SprintSizing            `json:"sizing"`
	Outcomes          SprintOutcomeMetrics    `json:"outcomes"`
}

type SprintOutcomeMetrics struct {
	Available bool `json:"available"`
}

type SprintSizing struct {
	UpToHalfTact int64 `json:"up_to_half_tact"`
	UpToTact     int64 `json:"up_to_tact"`
	OverTact     int64 `json:"over_tact"`
	Unestimated  int64 `json:"unestimated"`
}

type SprintThroughputPoint struct {
	Cycle     UUID    `json:"cycle"`
	Name      string  `json:"name"`
	Completed int64   `json:"completed"`
	StartsAt  *string `json:"starts_at"`
	EndsAt    *string `json:"ends_at"`
}

type Status struct {
	ID        UUID           `json:"id"`
	Section   *UUID          `json:"section"`
	Name      string         `json:"name"`
	Category  StatusCategory `json:"category"`
	Order     int64          `json:"order"`
	Color     string         `json:"color"`
	IsDefault bool           `json:"is_default"`
	IsFinal   bool           `json:"is_final"`
}

type StatusCategory = string

type StatusCreate struct {
	Section   *UUID           `json:"section,omitempty"`
	Name      string          `json:"name"`
	Category  *StatusCategory `json:"category,omitempty"`
	Color     *string         `json:"color,omitempty"`
	Order     *int64          `json:"order,omitempty"`
	IsDefault *bool           `json:"is_default,omitempty"`
	IsFinal   *bool           `json:"is_final,omitempty"`
}

type StatusDelete struct {
	MoveTasksTo *UUID `json:"move_tasks_to,omitempty"`
}

type StatusDuration struct {
	Status     UUID   `json:"status"`
	StatusName string `json:"status_name"`
	Category   string `json:"category"`
	Seconds    int64  `json:"seconds"`
}

type StatusHealth = string

type StatusMetrics struct {
	Transitions []StatusTransition `json:"transitions"`
	Durations   []StatusDuration   `json:"durations"`
}

type StatusPage struct {
	Count   int64    `json:"count"`
	Results []Status `json:"results"`
}

type StatusReorder struct {
	Items []StatusReorderItem `json:"items"`
}

type StatusReorderItem struct {
	ID    UUID  `json:"id"`
	Order int64 `json:"order"`
}

type StatusTransition struct {
	ID             UUID    `json:"id"`
	Task           UUID    `json:"task"`
	FromStatus     *UUID   `json:"from_status"`
	FromStatusName *string `json:"from_status_name"`
	ToStatus       UUID    `json:"to_status"`
	ToStatusName   *string `json:"to_status_name"`
	Actor          *int64  `json:"actor"`
	ActorName      *string `json:"actor_name"`
	CreatedAt      string  `json:"created_at"`
}

type StatusUpdate struct {
	ID         UUID           `json:"id"`
	OwnerType  CycleOwnerType `json:"owner_type"`
	OwnerID    UUID           `json:"owner_id"`
	OwnerKey   string         `json:"owner_key"`
	OwnerName  string         `json:"owner_name"`
	AuthorID   *int64         `json:"author_id"`
	AuthorName string         `json:"author_name"`
	Health     StatusHealth   `json:"health"`
	Body       string         `json:"body"`
	IsArchived bool           `json:"is_archived"`
	CreatedAt  string         `json:"created_at"`
	UpdatedAt  string         `json:"updated_at"`
}

// StatusUpdateCreate — Владелец задаётся `section`, `project` или парой `owner_type`/`owner_id`.
type StatusUpdateCreate struct {
	OwnerType *CycleOwnerType `json:"owner_type,omitempty"`
	OwnerID   *string         `json:"owner_id,omitempty"`
	Section   *string         `json:"section,omitempty"`
	Project   *string         `json:"project,omitempty"`
	Health    StatusHealth    `json:"health"`
	Body      string          `json:"body"`
	Author    *int64          `json:"author,omitempty"`
}

type StatusUpdatePage struct {
	Count   int64          `json:"count"`
	Results []StatusUpdate `json:"results"`
}

type StatusUpdatePatch struct {
	OwnerType  *CycleOwnerType `json:"owner_type,omitempty"`
	OwnerID    *string         `json:"owner_id,omitempty"`
	Section    *string         `json:"section,omitempty"`
	Project    *string         `json:"project,omitempty"`
	Health     *StatusHealth   `json:"health,omitempty"`
	Body       *string         `json:"body,omitempty"`
	IsArchived *bool           `json:"is_archived,omitempty"`
}

// StockAccountTransferCreate — Тело черновика переноса остатка; строки подбирает сервер.
type StockAccountTransferCreate struct {
	// Date — Пусто или отсутствует означает рабочую дату кабинета
	Date       *string `json:"date,omitempty"`
	BusinessID UUID    `json:"business_id"`
	Comment    *string `json:"comment,omitempty"`
}

// StockAccountTransferLine — Строка переноса остатка — стоимость склада и товара, которая лежит в книге на счёте `from_*`, хотя по правилу на дату принадлежит счёту `to_*`.
type StockAccountTransferLine struct {
	BusinessID    UUID   `json:"business_id"`
	CompanyID     *UUID  `json:"company_id,omitempty"`
	WarehouseID   UUID   `json:"warehouse_id"`
	WarehouseName string `json:"warehouse_name"`
	ProductID     UUID   `json:"product_id"`
	ProductName   string `json:"product_name"`
	FromAccount   UUID   `json:"from_account"`
	// FromCode — Код старого счёта, например 41
	FromCode  string `json:"from_code"`
	ToAccount UUID   `json:"to_account"`
	// ToCode — Код счёта по действующему правилу, например 10
	ToCode string `json:"to_code"`
	// Amount — Сумма переноса, десятичная строка
	Amount string `json:"amount"`
}

type StockAccountTransferProposal struct {
	Count   int64                      `json:"count"`
	Results []StockAccountTransferLine `json:"results"`
}

// StockAssemblySpec — Одна версия спецификации изделия. Состав опубликованной версии неизменяем — новая редакция заводится новой версией.
type StockAssemblySpec struct {
	ID      *UUID   `json:"id,omitempty"`
	SpecID  *UUID   `json:"spec_id,omitempty"`
	Version *int64  `json:"version,omitempty"`
	Name    *string `json:"name,omitempty"`
	Status  *string `json:"status,omitempty"`
	// Kind — Вид состава: assembly — «Сборка», production — «Производство», kit — «Комплект» (заложен, пока не заводится). Хранится у версии: следующая редакция может сменить вид
	Kind        *string                 `json:"kind,omitempty"`
	ProductID   *UUID                   `json:"product_id,omitempty"`
	ProductSKU  *string                 `json:"product_sku,omitempty"`
	ProductName *string                 `json:"product_name,omitempty"`
	Unit        *string                 `json:"unit,omitempty"`
	OutputQty   *string                 `json:"output_qty,omitempty"`
	Comment     *string                 `json:"comment,omitempty"`
	CreatedAt   *string                 `json:"created_at,omitempty"`
	UpdatedAt   *string                 `json:"updated_at,omitempty"`
	ActivatedAt *string                 `json:"activated_at,omitempty"`
	ArchivedAt  *string                 `json:"archived_at,omitempty"`
	Lines       []StockAssemblySpecLine `json:"lines,omitempty"`
	// ArchivedVersions — Версии, которые это действие убрало в архив: активация архивирует прежнюю действующую версию того же товара — своей или другой спецификации. Поле есть только в ответе смены состояния; отсутствует, если в архив ничего не ушло
	ArchivedVersions []StockAssemblySpecArchivedVersion `json:"archived_versions,omitempty"`
}

type StockAssemblySpecArchivedVersion struct {
	ID      UUID   `json:"id"`
	SpecID  UUID   `json:"spec_id"`
	Name    string `json:"name"`
	Version int64  `json:"version"`
}

// StockAssemblySpecCreate — Новая версия состава. Пустой `spec_id` заводит новую спецификацию, названный — следующую редакцию существующей. Версия рождается черновиком.
type StockAssemblySpecCreate struct {
	// SpecID — Спецификация, к которой заводится следующая редакция. Должна существовать в кабинете, а product_id — совпадать с её выходным товаром; состояние прежних версий не важно — редакцию заводят и от архивной. Пусто — новая спецификация
	SpecID *UUID  `json:"spec_id,omitempty"`
	Name   string `json:"name"`
	// Kind — Вид состава: assembly — «Сборка» (по умолчанию), production — «Производство». Вид kit («Комплект») пока не принимается — ответ 400
	Kind      *string `json:"kind,omitempty"`
	ProductID UUID    `json:"product_id"`
	// OutputQty — Сколько выходного товара даёт этот состав
	OutputQty string                             `json:"output_qty"`
	Comment   *string                            `json:"comment,omitempty"`
	Lines     []StockAssemblySpecCreateLinesItem `json:"lines"`
}

type StockAssemblySpecCreateLinesItem struct {
	ProductID UUID    `json:"product_id"`
	Qty       string  `json:"qty"`
	Share     *string `json:"share,omitempty"`
}

type StockAssemblySpecLine struct {
	ID          *UUID   `json:"id,omitempty"`
	ProductID   UUID    `json:"product_id"`
	ProductSKU  *string `json:"product_sku,omitempty"`
	ProductName *string `json:"product_name,omitempty"`
	Unit        *string `json:"unit,omitempty"`
	// ProductUomID — Единица товара, в которой задано qty (рулон, грамм); пусто — базовая единица карточки
	ProductUomID *UUID `json:"product_uom_id,omitempty"`
	// UomName — Название единицы товара
	UomName *string `json:"uom_name,omitempty"`
	// Qty — Положительная decimal string в единице товара или в базовой единице карточки
	Qty string `json:"qty"`
	// BaseQty — То же количество в базовой единице на момент заведения версии; считает сервер. Смысл состава — это число: коэффициент упаковки может измениться позже
	BaseQty *string `json:"base_qty,omitempty"`
	// Share — Доля стоимости при разукомплектации; задаётся сразу для всего состава или не задаётся вовсе
	Share    *string `json:"share,omitempty"`
	Position *int64  `json:"position,omitempty"`
}

type StockAssemblySpecPage struct {
	Count   int64               `json:"count"`
	Limit   int64               `json:"limit"`
	Offset  int64               `json:"offset"`
	Results []StockAssemblySpec `json:"results"`
}

// StockAssemblySpecRef — Снимок версии спецификации, по которой заполнен документ. Ссылка на версию, а не на справочник: состав уже скопирован в строки, и правка спецификации завтра не меняет смысл проведённого вчера. Версию сервер читает, только когда ссылка появляется — при создании документа и при правке, называющей другую версию: такая версия обязана быть действующей, черновая и архивная отклоняются. Правка черновика с прежним version_id версию не читает, и документ остаётся правимым, даже если версия ушла в архив или удалена; ссылку можно снять.
type StockAssemblySpecRef struct {
	SpecID    UUID    `json:"spec_id"`
	VersionID UUID    `json:"version_id"`
	Version   int64   `json:"version"`
	Name      *string `json:"name,omitempty"`
	// Kind — Вид версии состава на момент заполнения документа; ставит сервер
	Kind *string `json:"kind,omitempty"`
}

type StockAssemblySpecStatus struct {
	Status string `json:"status"`
}

// StockAssemblySpecUpdate — Полная замена реквизитов и состава черновика. Номер версии и спецификация, к которой она относится, не меняются. Проверки те же, что при заведении версии.
type StockAssemblySpecUpdate struct {
	Name string `json:"name"`
	// Kind — Вид состава: assembly — «Сборка» (по умолчанию), production — «Производство». Вид kit («Комплект») пока не принимается — ответ 400
	Kind *string `json:"kind,omitempty"`
	// ProductID — Выходной товар. Сменить его можно только у единственной версии спецификации: другой товар при нескольких версиях — это другая спецификация
	ProductID UUID `json:"product_id"`
	// OutputQty — Сколько выходного товара даёт этот состав
	OutputQty string                             `json:"output_qty"`
	Comment   *string                            `json:"comment,omitempty"`
	Lines     []StockAssemblySpecUpdateLinesItem `json:"lines"`
}

type StockAssemblySpecUpdateLinesItem struct {
	ProductID UUID `json:"product_id"`
	// ProductUomID — Единица товара, в которой задано qty; пусто — базовая единица карточки
	ProductUomID *UUID   `json:"product_uom_id,omitempty"`
	Qty          string  `json:"qty"`
	Share        *string `json:"share,omitempty"`
}

type StockBatch struct {
	ID UUID `json:"id"`
	// BusinessID — Бизнес партии — учётная единица, которой принадлежит товар
	BusinessID   map[string]json.RawMessage `json:"business_id"`
	BusinessName string                     `json:"business_name"`
	// CompanyID — Юрлицо партии — разрез официального контура. У неофициального прихода его нет, и тогда поле пустое (ERP-704).
	CompanyID             *UUID   `json:"company_id"`
	CompanyName           string  `json:"company_name"`
	ProductID             UUID    `json:"product_id"`
	ProductSKU            string  `json:"product_sku"`
	ProductName           string  `json:"product_name"`
	SourceDocumentID      UUID    `json:"source_document_id"`
	SourceDocumentTypeKey string  `json:"source_document_type_key"`
	SourceLineID          UUID    `json:"source_line_id"`
	ReceivedAt            string  `json:"received_at"`
	SupplierBatchCode     string  `json:"supplier_batch_code"`
	ProducedAt            *string `json:"produced_at"`
	ExpiresAt             *string `json:"expires_at"`
	IsActive              bool    `json:"is_active"`
	// Quantity — Считается из движений регистра stock
	Quantity string `json:"quantity"`
	// Amount — Считается из движений регистра stock
	Amount string `json:"amount"`
}

type StockBatchPage struct {
	Count   int64        `json:"count"`
	Limit   int64        `json:"limit"`
	Offset  int64        `json:"offset"`
	Results []StockBatch `json:"results"`
}

// StockClaimWriteoffCreate — Тело черновика списания претензии поставщику по недостаче приёмки.
type StockClaimWriteoffCreate struct {
	BasisID UUID `json:"basis_id"`
	// Date — Пусто или отсутствует означает рабочую дату кабинета
	Date *string `json:"date,omitempty"`
	// Amount — Сумма в валюте приёмки; пусто — весь остаток претензии
	Amount  *string `json:"amount,omitempty"`
	ItemID  UUID    `json:"item_id"`
	Comment *string `json:"comment,omitempty"`
}

type StockCompanyPolicy struct {
	ID                 UUID   `json:"id"`
	CompanyID          UUID   `json:"company_id"`
	CompanyName        string `json:"company_name"`
	CostingMethod      string `json:"costing_method"`
	DefaultWarehouseID *UUID  `json:"default_warehouse_id"`
	// ClosedThrough — Складской учёт закрыт по эту дату включительно; null — период не закрыт
	ClosedThrough *string `json:"closed_through"`
	UpdatedAt     string  `json:"updated_at"`
}

type StockCompanyPolicyPage struct {
	Count   int64                `json:"count"`
	Results []StockCompanyPolicy `json:"results"`
}

type StockCompanyPolicyPatch struct {
	// CostingMethod — Не меняется, пока у юрлица есть товарный остаток
	CostingMethod *string `json:"costing_method,omitempty"`
	// DefaultWarehouseID — Склад должен быть доступен этому юрлицу
	DefaultWarehouseID *UUID `json:"default_warehouse_id,omitempty"`
	// ClosedThrough — Строка YYYY-MM-DD; null снимает закрытие периода
	ClosedThrough *string `json:"closed_through,omitempty"`
}

type StockDocumentCreate struct {
	TypeKey StockDocumentCreateTypeKey `json:"type_key"`
	// Date — Пусто или отсутствует означает рабочую дату кабинета
	Date *string `json:"date,omitempty"`
	// BasisID — Документ-основание. У разукомплектации (stock_disassembly) основанием может быть проведённая комплектация (stock_assembly) того же бизнеса и юрлица, родившая разбираемый товар, датой не позже разбора. Тогда части — только товары, которые комплектация списывала (вернуть можно не все), доли стоимости не присылают, комплектация вида production обратно не разбирается, а проведёнными разборами по одной комплектации нельзя разобрать больше, чем она родила. Основание-резерв у разукомплектации этих правил не включает
	BasisID    *UUID             `json:"basis_id,omitempty"`
	EntityRefs StockDocumentRefs `json:"entity_refs"`
	// Payload — Для инвентаризации — фильтр снимка, для остальных видов — содержимое документа
	Payload json.RawMessage `json:"payload"`
	Comment *string         `json:"comment,omitempty"`
}

type StockDocumentCreateTypeKey = string

type StockDocumentFulfillment struct {
	DocumentID UUID                           `json:"document_id"`
	TypeKey    StockDocumentTypeKey           `json:"type_key"`
	TypeName   string                         `json:"type_name"`
	Number     string                         `json:"number"`
	Status     CoreDocumentStatus             `json:"status"`
	Lines      []StockDocumentFulfillmentLine `json:"lines"`
}

type StockDocumentFulfillmentLine struct {
	LineID    UUID `json:"line_id"`
	ProductID UUID `json:"product_id"`
	// OrderedQty — Decimal string из строки документа
	OrderedQty string `json:"ordered_qty"`
	// RemainingQty — Decimal string из регистра потребности или ожидаемого поступления
	RemainingQty string `json:"remaining_qty"`
}

type StockDocumentFulfillmentPage struct {
	Count   int64                      `json:"count"`
	Results []StockDocumentFulfillment `json:"results"`
}

// StockDocumentLandedCostTarget — Партия, на которую распределяются накладные расходы.
type StockDocumentLandedCostTarget struct {
	BatchID   UUID `json:"batch_id"`
	ProductID UUID `json:"product_id"`
	// Share — Decimal string; обязательна при ручном распределении
	Share *string `json:"share,omitempty"`
}

type StockDocumentLine struct {
	LineID    UUID `json:"line_id"`
	ProductID UUID `json:"product_id"`
	// Qty — Положительная decimal string в единице строки
	Qty string `json:"qty"`
	// DocumentQty — Количество по документу поставщика, если пришло меньше (ERP-1230): сумма строки — по документу, склад и налог к вычету — по qty, разница — претензия поставщику (сторона claim, 76.02). Только у stock_receipt; меньше qty — 400
	DocumentQty *string `json:"document_qty,omitempty"`
	// UnitID — Физическая единица справочника
	UnitID *UUID `json:"unit_id,omitempty"`
	// ProductUomID — Товарная единица представления
	ProductUomID *UUID `json:"product_uom_id,omitempty"`
	// BaseQty — Количество в базовой единице номенклатуры; присланное значение обязано совпасть с серверным пересчётом. У прихода в единице с переменной мерой — сумма фактических мер handling_units
	BaseQty *string `json:"base_qty,omitempty"`
	// VariableMeasure — Ставит сервер: строка введена в единице с переменной мерой. qty — число конкретных единиц, base_qty — сумма их фактических мер, price — цена за базовую единицу
	VariableMeasure *bool `json:"variable_measure,omitempty"`
	// Price — Decimal string; за единицу строки, а у единицы с переменной мерой — за базовую единицу
	Price *string `json:"price,omitempty"`
	// Amount — Decimal string
	Amount *string `json:"amount,omitempty"`
	// AmountWithoutVAT — Сумма строки без налога. Считает сервер из paper_vat_amount и перезаписывает присланное
	AmountWithoutVAT *string `json:"amount_without_vat,omitempty"`
	// VATAmount — Доля налога документа в строке: пропорционально сумме строки, копеечный остаток — на самую крупную. Считает сервер и перезаписывает присланное; по её наличию судят о разбивке при перепроведении
	VATAmount   *string `json:"vat_amount,omitempty"`
	BasisLineID *UUID   `json:"basis_line_id,omitempty"`
	// BasisDocumentID — Построчное происхождение, когда одна закупка сводит несколько заявок
	BasisDocumentID         *UUID                                 `json:"basis_document_id,omitempty"`
	BatchCode               *string                               `json:"batch_code,omitempty"`
	ProducedAt              *string                               `json:"produced_at,omitempty"`
	ExpiresAt               *string                               `json:"expires_at,omitempty"`
	HandlingUnits           []StockDocumentLineHandlingUnit       `json:"handling_units,omitempty"`
	HandlingUnitAllocations []StockDocumentLineHandlingAllocation `json:"handling_unit_allocations,omitempty"`
	// Share — Доля стоимости рождённой строки; только у разукомплектации без комплектации-основания на несколько частей. У разукомплектации на основании комплектации доли не присылают: присланная доля отклоняется, веса частей сервер берёт из проведения основания
	Share *string `json:"share,omitempty"`
}

// StockDocumentLineHandlingAllocation — Списание количества с конкретной физической единицы в расходной строке.
type StockDocumentLineHandlingAllocation struct {
	HandlingUnitID UUID `json:"handling_unit_id"`
	// Qty — Положительная decimal string
	Qty string `json:"qty"`
}

// StockDocumentLineHandlingUnit — Физическая единица (экземпляр, паллета, бухта), создаваемая приходной строкой.
type StockDocumentLineHandlingUnit struct {
	ID *UUID `json:"id,omitempty"`
	// Code — Пустой код сервер выдаёт сам из идентификатора
	Code *string `json:"code,omitempty"`
	// InitialBaseQty — Положительная decimal string в базовой единице; пусто — равная доля количества строки
	InitialBaseQty *string                    `json:"initial_base_qty,omitempty"`
	Custom         map[string]json.RawMessage `json:"custom,omitempty"`
}

type StockDocumentPage struct {
	Count   int64          `json:"count"`
	Limit   int64          `json:"limit"`
	Offset  int64          `json:"offset"`
	Results []CoreDocument `json:"results"`
}

type StockDocumentPatch struct {
	Date       *string               `json:"date,omitempty"`
	BasisID    *UUID                 `json:"basis_id,omitempty"`
	EntityRefs *StockDocumentRefs    `json:"entity_refs,omitempty"`
	Payload    *StockDocumentPayload `json:"payload,omitempty"`
	Comment    *string               `json:"comment,omitempty"`
}

// StockDocumentPayload — Содержимое складского документа. Разбор строгий — незнакомое поле отклоняется. У документа-факта, заявки, продажи или закупки и резерва `items` обязателен и не длиннее 1000 строк.
type StockDocumentPayload struct {
	Version int64   `json:"version"`
	Reason  *string `json:"reason,omitempty"`
	// ReasonID — Причина списания из справочника stock.stock_writeoff_reasons. Есть только у списания. Текст reason при этом остаётся: ссылка даёт единое значение причины, текст несёт подробности. Не прислан — сервер сам пробует узнать текст в справочнике; прислан явно, в том числе null, — решение вызывающего не переигрывается; неизвестная ссылка отклоняется
	ReasonID   *UUID   `json:"reason_id,omitempty"`
	DesiredAt  *string `json:"desired_at,omitempty"`
	DeliveryAt *string `json:"delivery_at,omitempty"`
	// ExpiresAt — Срок резерва; не раньше даты документа
	ExpiresAt *string             `json:"expires_at,omitempty"`
	Items     []StockDocumentLine `json:"items,omitempty"`
	// Produced — Строки, которые документ РОЖДАЕТ на складе. Только у комплектации и разукомплектации: их `items` — сторона расхода. Цена и сумма здесь не задаются, стоимость выхода равна списанной.
	Produced []StockDocumentLine   `json:"produced,omitempty"`
	Spec     *StockAssemblySpecRef `json:"spec,omitempty"`
	// Kind — Вид комплектации (только stock_assembly): assembly — «Сборка», production — «Производство». Документ, заполненный по составу (`spec`), получает вид версии состава — присланное значение, которое с ней расходится, отклоняется; без состава вид выбирает человек, пусто — assembly. Снимок: новая версия состава с другим видом документ не меняет. Документ без поля читается как assembly. У разукомплектации вида нет
	Kind *string `json:"kind,omitempty"`
	// PaperAmount — Итого по документу поставщика. Только проверка суммы строк: расхождение показывает экран, сохранение не останавливается
	PaperAmount *string `json:"paper_amount,omitempty"`
	// PaperVATAmount — В т.ч. НДС документа поставщика, одна сумма (ERP-484, подшаг 5.3). Обязательна, если на дату документа бизнес очищает суммы и юрлицо принимает налог к вычету; 0 — налог не выделен. Вне этого периода непустое значение — 400. Сервер раскладывает сумму по строкам
	PaperVATAmount   *string           `json:"paper_vat_amount,omitempty"`
	SupplierDocument *SupplierDocument `json:"supplier_document,omitempty"`
	// TaxCurrency — Налоговая валюта юрлица на дату приёмки (ERP-484, Р21). Пишет сервер вместе с разбивкой налога; присланное значение перезаписывается
	TaxCurrency *string `json:"tax_currency,omitempty"`
	// VATFromLines — Налог строк взят из документа поставщика как есть (ERP-1230): сервер не раскладывает paper_vat_amount, а проверяет vat_amount строк и пишет их сумму в paper_vat_amount
	VATFromLines *bool `json:"vat_from_lines,omitempty"`
	// Currency — Валюта приёмки (ERP-1230): ISO-код валюты документа поставщика; пусто или валюта учёта — документ в валюте учёта. Только у stock_receipt
	Currency *string `json:"currency,omitempty"`
	// Rate — Курс валюты документа: единиц валюты учёта за 1 единицу валюты документа. Без rate_manual сервер берёт его из справочника курсов на дату документа; нет курса — черновик без курса, проведение — 400
	Rate *string `json:"rate,omitempty"`
	// RateManual — Курс введён вручную: справочник его не перезаписывает
	RateManual *bool `json:"rate_manual,omitempty"`
	// Amount — Decimal string; сумма накладных расходов
	Amount           *string                         `json:"amount,omitempty"`
	AllocationMethod *string                         `json:"allocation_method,omitempty"`
	Targets          []StockDocumentLandedCostTarget `json:"targets,omitempty"`
	// Posting — Разложение проведения по строкам и партиям, которое пишет сам движок. У разукомплектации на основании комплектации есть блок `disassembly_basis`: `document_id` и `number` основания, `amount` — фактически списанная сумма, `basis_amount` — сумма того же количества по основанию (рождённая сумма основания ÷ рождённое количество × разбираемое количество), `difference` — amount минус basis_amount, `weights` — веса частей по строкам (`line_id`, `weight`), по которым списанное разделено между частями. Веса и `basis_amount` — снимок первого проведения: пересчёт себестоимости цепочки их сохраняет и пересчитывает только `amount` и `difference`; отмена и повторное проведение считают всё заново
	Posting map[string]json.RawMessage `json:"posting,omitempty"`
}

// StockDocumentRefs — Ссылки шапки складского документа. Набор допустимых полей зависит от вида — перемещению нужны склад-отправитель и склад-получатель, инвентаризации только юрлицо и склад.
type StockDocumentRefs struct {
	Company       UUID  `json:"company"`
	Warehouse     *UUID `json:"warehouse,omitempty"`
	WarehouseFrom *UUID `json:"warehouse_from,omitempty"`
	// WarehouseTo — Склад-получатель перемещения; у комплектации и разукомплектации — необязательный склад выпуска, без него выпуск появляется на складе списания
	WarehouseTo map[string]json.RawMessage `json:"warehouse_to,omitempty"`
	Contact     *UUID                      `json:"contact,omitempty"`
}

type StockDocumentTypeKey = string

// StockDownloadLink — Временный адрес файла склада: подписанный адрес хранилища или адрес этого API.
type StockDownloadLink struct {
	URL    string `json:"url"`
	Method string `json:"method"`
	// Direct — true — подписанный адрес хранилища, без заголовка авторизации; false — адрес этого API, с авторизацией
	Direct bool `json:"direct"`
	// RequiresAuthorization — true — адрес требует токен API, агенту по MCP он недоступен
	RequiresAuthorization bool `json:"requires_authorization"`
	// ExpiresAt — Срок подписанного адреса; у адреса API его нет
	ExpiresAt *string `json:"expires_at,omitempty"`
	Name      string  `json:"name"`
	MimeType  string  `json:"mime_type"`
	SizeBytes int64   `json:"size_bytes"`
	// Sha256 — Контрольная сумма SHA-256, если известна
	Sha256 *string `json:"sha256,omitempty"`
}

type StockExport struct {
	ID               UUID                      `json:"id"`
	Kind             StockImportKind           `json:"kind"`
	Format           CoreProductTransferFormat `json:"format"`
	TargetDocumentID *UUID                     `json:"target_document_id,omitempty"`
	FileName         string                    `json:"file_name"`
	Size             int64                     `json:"size"`
	RowCount         int64                     `json:"row_count"`
	CreatedBy        *int64                    `json:"created_by,omitempty"`
	CreatedAt        string                    `json:"created_at"`
}

type StockExportKind = string

type StockExportRequest struct {
	Kind   StockExportKind            `json:"kind"`
	Format *CoreProductTransferFormat `json:"format,omitempty"`
	// TargetDocumentID — Обязателен для всех видов, кроме reorder_rules и stock_report
	TargetDocumentID *UUID `json:"target_document_id,omitempty"`
	// Report — Обязателен для stock_report и запрещён остальным видам: без отбора запрос означал бы «выгрузите весь кабинет»
	Report *StockReportExportRequest `json:"report,omitempty"`
}

type StockHandlingUnit struct {
	ID         UUID  `json:"id"`
	BatchID    UUID  `json:"batch_id"`
	BusinessID *UUID `json:"business_id,omitempty"`
	// CompanyID — Нулевой UUID — единица без юрлица
	CompanyID            UUID               `json:"company_id"`
	CompanyName          string             `json:"company_name"`
	ProductID            UUID               `json:"product_id"`
	ProductSKU           string             `json:"product_sku"`
	ProductName          string             `json:"product_name"`
	BaseUnit             string             `json:"base_unit"`
	SourceDocumentID     UUID               `json:"source_document_id"`
	SourceDocumentNumber string             `json:"source_document_number"`
	SourceDocumentStatus CoreDocumentStatus `json:"source_document_status"`
	SourceLineID         UUID               `json:"source_line_id"`
	Code                 string             `json:"code"`
	InitialBaseQty       string             `json:"initial_base_qty"`
	// RemainingBaseQty — Считается из движений регистра stock
	RemainingBaseQty string `json:"remaining_base_qty"`
	// IsRemnant — Остаток меньше порога обрезка у единицы товара: вычисляется по остатку, а не хранится
	IsRemnant bool `json:"is_remnant"`
	// ReservedBaseQty — Считается из движений регистра stock_reserved
	ReservedBaseQty string                  `json:"reserved_base_qty"`
	Amount          string                  `json:"amount"`
	Status          StockHandlingUnitStatus `json:"status"`
	State           StockHandlingUnitState  `json:"state"`
	// WarehouseID — Отдаётся только когда положительный остаток лежит в одном месте хранения
	WarehouseID   *UUID                      `json:"warehouse_id,omitempty"`
	WarehouseName string                     `json:"warehouse_name"`
	Custom        map[string]json.RawMessage `json:"custom"`
	ReceivedAt    string                     `json:"received_at"`
	CreatedAt     string                     `json:"created_at"`
	UpdatedAt     string                     `json:"updated_at"`
}

type StockHandlingUnitCard struct {
	HandlingUnit StockHandlingUnit `json:"handling_unit"`
	// Entries — Движения единицы по регистру stock
	Entries []CoreRegisterEntry `json:"entries"`
}

type StockHandlingUnitPage struct {
	Count   int64               `json:"count"`
	Limit   int64               `json:"limit"`
	Offset  int64               `json:"offset"`
	Results []StockHandlingUnit `json:"results"`
}

type StockHandlingUnitState = string

type StockHandlingUnitStatus = string

type StockHandlingUnitStatusPatch struct {
	Status StockHandlingUnitStatus `json:"status"`
}

type StockHandlingUnitSuggestion struct {
	HandlingUnitID  UUID                   `json:"handling_unit_id"`
	Code            string                 `json:"code"`
	BatchID         UUID                   `json:"batch_id"`
	Qty             string                 `json:"qty"`
	AvailableBefore string                 `json:"available_before"`
	AvailableAfter  string                 `json:"available_after"`
	StateBefore     StockHandlingUnitState `json:"state_before"`
}

type StockHandlingUnitSuggestionResult struct {
	RequestedQty string `json:"requested_qty"`
	AllocatedQty string `json:"allocated_qty"`
	// Complete — false означает, что доступных единиц не хватило на всё количество
	Complete    bool                          `json:"complete"`
	Allocations []StockHandlingUnitSuggestion `json:"allocations"`
}

type StockImportApplyRequest struct {
	PreviewToken    string `json:"preview_token"`
	ConfirmWarnings *bool  `json:"confirm_warnings,omitempty"`
}

type StockImportDiff struct {
	Row int64 `json:"row"`
	// Action — initial_stock всегда create, остальные виды — update
	Action   string `json:"action"`
	TargetID *UUID  `json:"target_id,omitempty"`
	// Label — Идентификатор номенклатуры строки, а при его отсутствии — документа
	Label   *string           `json:"label,omitempty"`
	Changes map[string]string `json:"changes,omitempty"`
}

type StockImportInspectRequest struct {
	// SheetName — Пустое значение берёт первый лист книги
	SheetName *string `json:"sheet_name,omitempty"`
	HeaderRow int64   `json:"header_row"`
}

type StockImportKind = string

type StockImportRun struct {
	ID               UUID                          `json:"id"`
	Kind             StockImportKind               `json:"kind"`
	Format           CoreProductTransferFormat     `json:"format"`
	Status           StockImportStatus             `json:"status"`
	Mode             CoreProductImportMode         `json:"mode"`
	TargetDocumentID *UUID                         `json:"target_document_id,omitempty"`
	SourceName       string                        `json:"source_name"`
	SourceSha256     string                        `json:"source_sha256"`
	SourceSize       int64                         `json:"source_size"`
	Mapping          CoreProductImportMappingState `json:"mapping"`
	SchemaVersion    string                        `json:"schema_version"`
	Revision         int64                         `json:"revision"`
	PreviewToken     *string                       `json:"preview_token,omitempty"`
	Diff             []StockImportDiff             `json:"diff,omitempty"`
	Issues           []CoreProductImportIssue      `json:"issues,omitempty"`
	CreatedCount     int64                         `json:"created_count"`
	UpdatedCount     int64                         `json:"updated_count"`
	UnchangedCount   int64                         `json:"unchanged_count"`
	WarningCount     int64                         `json:"warning_count"`
	ErrorCount       int64                         `json:"error_count"`
	CreatedBy        *int64                        `json:"created_by,omitempty"`
	CreatedAt        string                        `json:"created_at"`
	PreviewedAt      *string                       `json:"previewed_at,omitempty"`
	AppliedAt        *string                       `json:"applied_at,omitempty"`
	SourceColumns    []string                      `json:"source_columns,omitempty"`
	SourceSheets     []CoreProductImportSheet      `json:"source_sheets,omitempty"`
	TargetFields     []CoreProductImportField      `json:"target_fields,omitempty"`
}

type StockImportStatus = string

// StockImportUploadSessionRequest — Заявка на сессию загрузки файла складского импорта. filename и size — синонимы name и size_bytes.
type StockImportUploadSessionRequest struct {
	Kind StockImportKind       `json:"kind"`
	Mode CoreProductImportMode `json:"mode"`
	// Name — Имя файла с расширением xlsx, xls, ods, csv или tsv
	Name *string `json:"name,omitempty"`
	// MimeType — Тип содержимого; по умолчанию — по расширению файла
	MimeType *string `json:"mime_type,omitempty"`
	// SizeBytes — Точный размер файла в байтах
	SizeBytes *int64 `json:"size_bytes,omitempty"`
	// Sha256 — Необязательная контрольная сумма SHA-256 строчными шестнадцатеричными знаками
	Sha256 *string `json:"sha256,omitempty"`
	// TargetDocumentID — Складской документ, к которому привязан прогон; строки без document_id получают его
	TargetDocumentID *UUID `json:"target_document_id,omitempty"`
	// Filename — Синоним поля name
	Filename *string `json:"filename,omitempty"`
	// Size — Синоним поля size_bytes
	Size *int64 `json:"size,omitempty"`
}

// StockInventoryChange — Документ, тронувший товар снимка после момента снимка.
type StockInventoryChange struct {
	DocumentID UUID               `json:"document_id"`
	Number     string             `json:"number"`
	TypeKey    string             `json:"type_key"`
	Status     CoreDocumentStatus `json:"status"`
	OccurredAt string             `json:"occurred_at"`
}

type StockInventoryChangePage struct {
	Count   int64                  `json:"count"`
	Results []StockInventoryChange `json:"results"`
}

type StockInventoryCount struct {
	ProductID UUID `json:"product_id"`
	// ActualQty — Неотрицательная decimal string
	ActualQty string `json:"actual_qty"`
	// SurplusPrice — Неотрицательная decimal string; обязательна для излишка перед созданием актов
	SurplusPrice *string `json:"surplus_price,omitempty"`
}

type StockInventoryCountSheet struct {
	ID          UUID                           `json:"id"`
	Number      string                         `json:"number"`
	Date        string                         `json:"date"`
	Workflow    StockInventoryWorkflow         `json:"workflow"`
	CompanyID   UUID                           `json:"company_id"`
	WarehouseID UUID                           `json:"warehouse_id"`
	Count       int64                          `json:"count"`
	Items       []StockInventoryCountSheetItem `json:"items"`
}

type StockInventoryCountSheetItem struct {
	LineID      UUID   `json:"line_id"`
	ProductID   UUID   `json:"product_id"`
	ProductSKU  string `json:"product_sku"`
	ProductName string `json:"product_name"`
	Unit        string `json:"unit"`
	// ActualQty — Decimal string
	ActualQty *string `json:"actual_qty,omitempty"`
	// SurplusPrice — Decimal string
	SurplusPrice *string `json:"surplus_price,omitempty"`
}

type StockInventoryCountsInput struct {
	Counts []StockInventoryCount `json:"counts"`
	// ExpectedUpdatedAt — updated_at документа, известный клиенту; несовпадение отклоняет запись
	ExpectedUpdatedAt *string `json:"expected_updated_at,omitempty"`
}

// StockInventoryCreatePayload — Содержимое инвентаризации при создании. Снимок остатков сервер снимает сам, поэтому строки в теле не передаются.
type StockInventoryCreatePayload struct {
	Version int64                 `json:"version"`
	Filter  *StockInventoryFilter `json:"filter,omitempty"`
}

type StockInventoryDeriveResult struct {
	Inventory CoreDocument `json:"inventory"`
	// Documents — Черновики списания и оприходования; пустой список означает, что расхождений нет
	Documents []CoreDocument `json:"documents"`
}

// StockInventoryFilter — Отбор товаров в снимок. Пустой фильтр берёт весь склад.
type StockInventoryFilter struct {
	CategoryID *UUID  `json:"category_id,omitempty"`
	ProductIds []UUID `json:"product_ids,omitempty"`
}

type StockInventoryFinishInput struct {
	// ExpectedUpdatedAt — updated_at документа, известный клиенту; несовпадение отклоняет запись
	ExpectedUpdatedAt *string `json:"expected_updated_at,omitempty"`
}

type StockInventoryRefreshInput struct {
	// KeepCounts — Переносить ли уже записанный факт на совпавшие товары нового снимка
	KeepCounts *bool `json:"keep_counts,omitempty"`
	// ExpectedUpdatedAt — updated_at документа, известный клиенту; несовпадение отклоняет запись
	ExpectedUpdatedAt *string `json:"expected_updated_at,omitempty"`
}

type StockInventoryWorkflow = string

// StockOpeningBalanceCreate — Тело черновика ввода начальных остатков товара; вид задаёт ручка.
type StockOpeningBalanceCreate struct {
	// Date — Пусто или отсутствует означает рабочую дату кабинета
	Date       *string              `json:"date,omitempty"`
	EntityRefs StockDocumentRefs    `json:"entity_refs"`
	Payload    StockDocumentPayload `json:"payload"`
	Comment    *string              `json:"comment,omitempty"`
}

// StockOrderShipInput — warehouse_id необязателен — без него склад выбирает сервер тем же правилом, что ship_warehouse
type StockOrderShipInput struct {
	WarehouseID *UUID `json:"warehouse_id,omitempty"`
	// Date — Дата отгрузки; пусто — текущая бизнес-дата
	Date    *string                        `json:"date,omitempty"`
	Comment *string                        `json:"comment,omitempty"`
	Lines   []StockOrderShipInputLinesItem `json:"lines"`
}

type StockOrderShipInputLinesItem struct {
	ItemID   UUID   `json:"item_id"`
	Quantity string `json:"quantity"`
}

type StockOrderShipment struct {
	ID          UUID                     `json:"id"`
	OrderID     UUID                     `json:"order_id"`
	Number      string                   `json:"number"`
	Date        string                   `json:"date"`
	Status      string                   `json:"status"`
	WarehouseID *UUID                    `json:"warehouse_id,omitempty"`
	Deal        *UUID                    `json:"deal,omitempty"`
	Lines       []StockOrderShipmentLine `json:"lines"`
}

type StockOrderShipmentLine struct {
	ProductID UUID   `json:"product_id"`
	Qty       string `json:"qty"`
}

type StockOrderShipping struct {
	OrderID     UUID                     `json:"order_id"`
	Number      string                   `json:"number"`
	Date        string                   `json:"date"`
	State       string                   `json:"state"`
	ContactID   UUID                     `json:"contact_id"`
	ContactName *string                  `json:"contact_name,omitempty"`
	CompanyID   *UUID                    `json:"company_id,omitempty"`
	WarehouseID *UUID                    `json:"warehouse_id,omitempty"`
	Lines       []StockOrderShippingLine `json:"lines"`
	Shipments   []StockOrderShipment     `json:"shipments"`
	Reserved    bool                     `json:"reserved"`
	// Reservations — Остаток резерва самой продажи по складам (товар → количество). Свободный остаток склада его уже вычел, а отгрузка по продаже гасит свой резерв
	Reservations []StockOrderShippingReservationsItem `json:"reservations,omitempty"`
	CanShip      bool                                 `json:"can_ship"`
	ShipBlocked  *string                              `json:"ship_blocked,omitempty"`
	// ShipWarehouse — Склад отгрузки по умолчанию; нет поля — сервер склад не подобрал, его выбирает человек
	ShipWarehouse *StockOrderShippingShipWarehouse `json:"ship_warehouse,omitempty"`
}

type StockOrderShippingReservationsItem struct {
	WarehouseID UUID              `json:"warehouse_id"`
	Products    map[string]string `json:"products"`
}

// StockOrderShippingShipWarehouse — Склад отгрузки по умолчанию; нет поля — сервер склад не подобрал, его выбирает человек
type StockOrderShippingShipWarehouse struct {
	ID     UUID   `json:"id"`
	Name   string `json:"name"`
	Source string `json:"source"`
}

type StockOrderShippingLine struct {
	LineID       UUID    `json:"line_id"`
	ProductID    UUID    `json:"product_id"`
	Title        string  `json:"title"`
	Unit         *string `json:"unit,omitempty"`
	OrderedQty   string  `json:"ordered_qty"`
	ShippedQty   string  `json:"shipped_qty"`
	RemainingQty string  `json:"remaining_qty"`
}

type StockOrderShippingPage struct {
	Results []StockOrderShipping `json:"results"`
	Count   int64                `json:"count"`
}

type StockProductUOM struct {
	ID          UUID                 `json:"id"`
	ProductID   UUID                 `json:"product_id"`
	Code        string               `json:"code"`
	Name        string               `json:"name"`
	InputUnitID UUID                 `json:"input_unit_id"`
	UnitCode    string               `json:"unit_code"`
	UnitLabel   string               `json:"unit_label"`
	Usage       StockProductUOMUsage `json:"usage"`
	// FactorToBase — Положительный decimal — сколько базовых единиц товара содержит одна единица ввода
	FactorToBase         string `json:"factor_to_base"`
	Precision            int64  `json:"precision"`
	CreatesHandlingUnits bool   `json:"creates_handling_units"`
	// VariableMeasure — Коэффициент — номинал: фактическая мера у каждой конкретной единицы своя (рулон ~50 м)
	VariableMeasure *bool `json:"variable_measure,omitempty"`
	// QtyStep — Шаг количества в этой единице: «режем по 10 см». Пусто — без ограничения
	QtyStep *string `json:"qty_step,omitempty"`
	// RemnantThreshold — Порог обрезка: остаток конкретной единицы меньше порога считается обрезком. Только для единиц с учётом конкретных единиц
	RemnantThreshold *string `json:"remnant_threshold,omitempty"`
	IsDefaultReceipt bool    `json:"is_default_receipt"`
	IsActive         bool    `json:"is_active"`
	UpdatedAt        string  `json:"updated_at"`
}

type StockProductUOMInput struct {
	// ID — Без идентификатора заводится новая товарная единица
	ID          *UUID                 `json:"id,omitempty"`
	ProductID   UUID                  `json:"product_id"`
	Code        string                `json:"code"`
	Name        string                `json:"name"`
	InputUnitID UUID                  `json:"input_unit_id"`
	Usage       *StockProductUOMUsage `json:"usage,omitempty"`
	// FactorToBase — Положительное число; десятичный разделитель — точка или запятая, хранится запись с точкой
	FactorToBase string `json:"factor_to_base"`
	// CreatesHandlingUnits — Требует единицы измерения с целой точностью
	CreatesHandlingUnits *bool `json:"creates_handling_units,omitempty"`
	// VariableMeasure — Переменная мера: приход складывает количество из фактических мер конкретных единиц, цена за базовую единицу; расход в такой единице невозможен. Требует creates_handling_units
	VariableMeasure *bool `json:"variable_measure,omitempty"`
	// QtyStep — Положительное число (точка или запятая) или пусто: количество строки в этой единице обязано быть кратно шагу
	QtyStep *string `json:"qty_step,omitempty"`
	// RemnantThreshold — Положительное число (точка или запятая) или пусто. Требует creates_handling_units
	RemnantThreshold *string `json:"remnant_threshold,omitempty"`
	IsDefaultReceipt *bool   `json:"is_default_receipt,omitempty"`
	// IsActive — По умолчанию единица активна
	IsActive *bool `json:"is_active,omitempty"`
}

type StockProductUOMPage struct {
	Count   int64             `json:"count"`
	Results []StockProductUOM `json:"results"`
}

type StockProductUOMUsage = string

type StockPurchaseOrderCreate struct {
	CompanyID   UUID `json:"company_id"`
	WarehouseID UUID `json:"warehouse_id"`
	// SupplierID — Контрагент с ролью поставщика
	SupplierID UUID `json:"supplier_id"`
	// Date — Пустая или пропущенная означает текущую бизнес-дату кабинета
	Date *string `json:"date,omitempty"`
	// DeliveryAt — Ожидаемая дата поставки
	DeliveryAt *string                       `json:"delivery_at,omitempty"`
	Comment    *string                       `json:"comment,omitempty"`
	Items      []StockPurchaseOrderLineInput `json:"items"`
}

type StockPurchaseOrderLineInput struct {
	ProductID UUID `json:"product_id"`
	// Qty — Decimal string заказываемого количества
	Qty string `json:"qty"`
	// Price — Decimal string цены поставщика; пропуск записывается нулём
	Price *string `json:"price,omitempty"`
	// BasisLineID — Строка заявки на закупку; указывается только вместе с request_id
	BasisLineID *UUID `json:"basis_line_id,omitempty"`
	// RequestID — Проведённая заявка на закупку того же юрлица и склада; указывается только вместе с basis_line_id
	RequestID *UUID `json:"request_id,omitempty"`
}

type StockReceiptClaimBalance struct {
	DocumentID UUID `json:"document_id"`
	// Currency — Валюта претензии; пусто — валюта учёта.
	Currency *string `json:"currency,omitempty"`
	// ClaimedAmount — Претензия с налогом — движение расчётов самой приёмки; есть только у проведённой.
	ClaimedAmount *string `json:"claimed_amount,omitempty"`
	// OpenAmount — Незакрытый остаток претензии в расчётах.
	OpenAmount string `json:"open_amount"`
}

// StockReceiptCorrectionCreate — Тело черновика корректировки приёмки по УКД поставщика на уменьшение или увеличение.
type StockReceiptCorrectionCreate struct {
	BasisID UUID `json:"basis_id"`
	// Direction — Уменьшение (по умолчанию) или увеличение стоимости
	Direction *string `json:"direction,omitempty"`
	// Date — Пусто или отсутствует означает рабочую дату кабинета
	Date             *string                                      `json:"date,omitempty"`
	SupplierDocument StockReceiptCorrectionCreateSupplierDocument `json:"supplier_document"`
	// Amount — Изменение с налогом в валюте приёмки, без знака
	Amount string `json:"amount"`
	// VAT — Налог изменения в валюте приёмки
	VAT     *string `json:"vat,omitempty"`
	Comment *string `json:"comment,omitempty"`
}

type StockReceiptCorrectionCreateSupplierDocument struct {
	// Number — Номер УКД поставщика
	Number string `json:"number"`
	// Date — Дата УКД поставщика
	Date string `json:"date"`
}

type StockReorderRule struct {
	ID           UUID   `json:"id"`
	BusinessID   UUID   `json:"business_id"`
	BusinessName string `json:"business_name"`
	// CompanyID — null означает правило бизнеса без юрлица
	CompanyID *UUID `json:"company_id"`
	// CompanyName — Пустая строка у правила без юрлица
	CompanyName string `json:"company_name"`
	ProductID   UUID   `json:"product_id"`
	ProductSKU  string `json:"product_sku"`
	ProductName string `json:"product_name"`
	// WarehouseID — null означает правило на все склады
	WarehouseID   *UUID  `json:"warehouse_id"`
	WarehouseName string `json:"warehouse_name"`
	// MinQty — Decimal string неснижаемого остатка
	MinQty string `json:"min_qty"`
	// MaxQty — Decimal string целевого остатка; null — потолок не задан
	MaxQty *string `json:"max_qty"`
	// OrderMultiple — Decimal string кратности продажи или закупки; null — кратность не задана
	OrderMultiple         *string `json:"order_multiple"`
	LeadTimeDays          int64   `json:"lead_time_days"`
	PreferredSupplierID   *UUID   `json:"preferred_supplier_id"`
	PreferredSupplierName string  `json:"preferred_supplier_name"`
	IsActive              bool    `json:"is_active"`
	UpdatedAt             string  `json:"updated_at"`
}

type StockReorderRuleInput struct {
	// BusinessID — Бизнес правила; обязателен без company_id, с company_id выводится от юрлица и обязан с ним совпасть
	BusinessID *UUID `json:"business_id,omitempty"`
	// CompanyID — Пропуск или null заводит правило бизнеса без юрлица
	CompanyID *UUID `json:"company_id,omitempty"`
	// ProductID — Складская номенклатура — отдельный товар или вариант; семейство вариантов и услуга не принимаются
	ProductID UUID `json:"product_id"`
	// WarehouseID — Пропуск или null заводит правило на все склады; правилу без юрлица годится только склад, не закреплённый за юрлицами
	WarehouseID *UUID `json:"warehouse_id,omitempty"`
	// MinQty — Decimal string неотрицательного неснижаемого остатка
	MinQty string `json:"min_qty"`
	// MaxQty — Decimal string; не меньше min_qty
	MaxQty *string `json:"max_qty,omitempty"`
	// OrderMultiple — Decimal string строго больше нуля
	OrderMultiple       *string `json:"order_multiple,omitempty"`
	LeadTimeDays        *int64  `json:"lead_time_days,omitempty"`
	PreferredSupplierID *UUID   `json:"preferred_supplier_id,omitempty"`
	IsActive            *bool   `json:"is_active,omitempty"`
}

type StockReorderRulePage struct {
	// Count — Общее число подходящих правил, а не размер страницы
	Count   int64              `json:"count"`
	Limit   int64              `json:"limit"`
	Offset  int64              `json:"offset"`
	Results []StockReorderRule `json:"results"`
}

type StockReorderRulePatch struct {
	BusinessID *UUID `json:"business_id,omitempty"`
	// CompanyID — null переносит правило в бизнес без юрлица
	CompanyID   *UUID `json:"company_id,omitempty"`
	ProductID   *UUID `json:"product_id,omitempty"`
	WarehouseID *UUID `json:"warehouse_id,omitempty"`
	// MinQty — Decimal string
	MinQty              *string `json:"min_qty,omitempty"`
	MaxQty              *string `json:"max_qty,omitempty"`
	OrderMultiple       *string `json:"order_multiple,omitempty"`
	LeadTimeDays        *int64  `json:"lead_time_days,omitempty"`
	PreferredSupplierID *UUID   `json:"preferred_supplier_id,omitempty"`
	IsActive            *bool   `json:"is_active,omitempty"`
}

// StockReportExportRequest — Отбор экрана остатков и его видимые колонки. Имена полей повторяют параметры GET /api/v1/stock/report/stocks: файл обязан содержать то же, что видел человек, и одно имя на два входа защищает от расхождения. Отличается только перенос: список складов идёт массивом, а не строкой через запятую, и дополнительные поля — объектом вместо параметров cf.*. Колонки берутся из перечня; неизвестная колонка — 400, а не молча пропущенная. Опознавательные колонки (бизнес, юрлицо, склад и зона с кодами, товар, SKU, единица) пишутся всегда, и порядок колонок в файле повторяет экран. Выборка обходится постранично целиком; слишком широкая отклоняется как 400 — книга собирается в памяти, и потолок общий с загрузкой.
type StockReportExportRequest struct {
	Mode           *string           `json:"mode,omitempty"`
	Q              *string           `json:"q,omitempty"`
	AsOf           *string           `json:"as_of,omitempty"`
	BusinessID     *UUID             `json:"business_id,omitempty"`
	CompanyID      *UUID             `json:"company_id,omitempty"`
	WarehouseID    *UUID             `json:"warehouse_id,omitempty"`
	WarehouseIds   []UUID            `json:"warehouse_ids,omitempty"`
	ProductID      *UUID             `json:"product_id,omitempty"`
	CustomFields   map[string]string `json:"custom_fields,omitempty"`
	WithoutCompany *bool             `json:"without_company,omitempty"`
	RollupZones    *bool             `json:"rollup_zones,omitempty"`
	BelowMinimum   *bool             `json:"below_minimum,omitempty"`
	WithReserve    *bool             `json:"with_reserve,omitempty"`
	IncludeEmpty   *bool             `json:"include_empty,omitempty"`
	Sort           *string           `json:"sort,omitempty"`
	Direction      *string           `json:"direction,omitempty"`
	Columns        []string          `json:"columns,omitempty"`
}

type StockReportOverduePage struct {
	Count   int64                           `json:"count"`
	Results []StockReportOverdueReservation `json:"results"`
}

type StockReportOverdueReservation struct {
	DocumentID    UUID   `json:"document_id"`
	Number        string `json:"number"`
	Date          string `json:"date"`
	ExpiresAt     string `json:"expires_at"`
	CompanyID     UUID   `json:"company_id"`
	CompanyName   string `json:"company_name"`
	WarehouseID   UUID   `json:"warehouse_id"`
	WarehouseName string `json:"warehouse_name"`
	// RemainingQty — Decimal string
	RemainingQty string `json:"remaining_qty"`
	ProductCount int64  `json:"product_count"`
}

type StockReportPage struct {
	Count   int64             `json:"count"`
	Limit   int64             `json:"limit"`
	Offset  int64             `json:"offset"`
	Results []StockReportRow  `json:"results"`
	Totals  StockReportTotals `json:"totals"`
	// WarehouseTotals — Суммы по складам всей выборки, без постраничного окна
	WarehouseTotals []StockReportWarehouseTotal `json:"warehouse_totals"`
	Formula         string                      `json:"formula"`
}

type StockReportPurchasingPage struct {
	// Count — Общее число строк отбора, а не длина страницы: усечение по limit на нём видно.
	Count   int64                      `json:"count"`
	Limit   int64                      `json:"limit"`
	Offset  int64                      `json:"offset"`
	Results []StockReportPurchasingRow `json:"results"`
	Formula string                     `json:"formula"`
}

type StockReportPurchasingRow struct {
	// BusinessID — Бизнес строки — учётная единица закупки
	BusinessID   map[string]json.RawMessage `json:"business_id"`
	BusinessName string                     `json:"business_name"`
	// CompanyID — Юрлицо строки — разрез официального контура. У неофициальной потребности его нет, и тогда поле пустое; правило пополнения такой строке не подбирается, потому что ключуется юрлицом (ERP-704).
	CompanyID     *UUID  `json:"company_id"`
	CompanyName   string `json:"company_name"`
	WarehouseID   *UUID  `json:"warehouse_id"`
	WarehouseCode string `json:"warehouse_code"`
	WarehouseName string `json:"warehouse_name"`
	// WarehouseParentName — Склад над зоной (дочерним складом); у склада верхнего уровня пусто. Витрина пишет «склад · зона» (ERP-1522).
	WarehouseParentName string `json:"warehouse_parent_name"`
	ProductID           UUID   `json:"product_id"`
	ProductSKU          string `json:"product_sku"`
	ProductName         string `json:"product_name"`
	Unit                string `json:"unit"`
	// PurchasePrice — Decimal string. Закупочная цена карточки — умолчание цены строки закупки из витрины (ERP-1522); ноль — цены в карточке нет.
	PurchasePrice string `json:"purchase_price"`
	// OnHand — Decimal string
	OnHand string `json:"on_hand"`
	// Reserved — Decimal string
	Reserved string `json:"reserved"`
	// Available — Decimal string
	Available string `json:"available"`
	// Expected — Decimal string
	Expected string `json:"expected"`
	// Demand — Decimal string
	Demand string `json:"demand"`
	// Projected — Decimal string
	Projected string `json:"projected"`
	// MinQty — Decimal string
	MinQty string `json:"min_qty"`
	// MaxQty — Decimal string
	MaxQty *string `json:"max_qty"`
	// OrderMultiple — Decimal string
	OrderMultiple         *string `json:"order_multiple"`
	LeadTimeDays          int64   `json:"lead_time_days"`
	PreferredSupplierID   *UUID   `json:"preferred_supplier_id"`
	PreferredSupplierName string  `json:"preferred_supplier_name"`
	// SuggestedQty — Decimal string. Максимум из незаказанной потребности и дефицита по правилу пополнения; дефицит считается тем же ядром, что и suggested в /stock/report/stocks.
	SuggestedQty string `json:"suggested_qty"`
	RuleID       *UUID  `json:"rule_id"`
	// RuleSource — Какое правило пополнения подобралось к строке
	RuleSource string                        `json:"rule_source"`
	Sources    []StockReportPurchasingSource `json:"sources"`
}

type StockReportPurchasingSource struct {
	RequestID       UUID   `json:"request_id"`
	RequestNumber   string `json:"request_number"`
	RequestType     string `json:"request_type"`
	RequestTypeName string `json:"request_type_name"`
	BasisLineID     UUID   `json:"basis_line_id"`
	// RemainingQty — Decimal string
	RemainingQty string `json:"remaining_qty"`
}

type StockReportReservationLine struct {
	BasisLineID UUID `json:"basis_line_id"`
	ProductID   UUID `json:"product_id"`
	// OriginalQty — Decimal string
	OriginalQty string `json:"original_qty"`
	// ShippedQty — Decimal string
	ShippedQty string `json:"shipped_qty"`
	// ReleasedQty — Decimal string
	ReleasedQty string `json:"released_qty"`
	// RemainingQty — Decimal string
	RemainingQty string `json:"remaining_qty"`
	// UnbackedQty — Decimal string в базовой единице товара. Часть остатка строки, не покрытая остатком склада: обещание ждёт поступления. Сумма по строкам равна unbacked_qty резерва; без товара остаются самые новые обещания
	UnbackedQty string `json:"unbacked_qty"`
	// ActiveSpec — Действующий состав товара строки; null, если действующего состава у товара нет. Сам резерв состав не использует
	ActiveSpec *StockReportReservationLineSpec `json:"active_spec"`
}

// StockReportReservationLineSpec — Действующая версия состава изделия у товара строки резерва.
type StockReportReservationLineSpec struct {
	VersionID UUID   `json:"version_id"`
	SpecID    UUID   `json:"spec_id"`
	Version   int64  `json:"version"`
	Name      string `json:"name"`
	Kind      string `json:"kind"`
	// OutputQty — Decimal string. Сколько изделия даёт один состав, в базовой единице товара
	OutputQty string `json:"output_qty"`
}

type StockReportReservationPage struct {
	Count   int64                           `json:"count"`
	Results []StockReportReservationSummary `json:"results"`
}

type StockReportReservationSummary struct {
	DocumentID UUID `json:"document_id"`
	// OriginalQty — Decimal string
	OriginalQty string `json:"original_qty"`
	// ShippedQty — Decimal string
	ShippedQty string `json:"shipped_qty"`
	// ReleasedQty — Decimal string
	ReleasedQty string `json:"released_qty"`
	// RemainingQty — Decimal string
	RemainingQty string `json:"remaining_qty"`
	// UnbackedQty — Часть остатка резерва, не покрытая остатком склада: списание товар забрало, обещание ждёт поступления. Без товара остаются самые новые обещания
	UnbackedQty string                       `json:"unbacked_qty"`
	State       string                       `json:"state"`
	IsOverdue   bool                         `json:"is_overdue"`
	Lines       []StockReportReservationLine `json:"lines"`
}

type StockReportRow struct {
	// Scope — Измерения, которыми строка опознаётся. Режим сворачивает часть из них, и тогда пустое поле значит «много значений», а не «значения нет»: в «по товарам» юрлица у строки нет потому, что она накрывает их все, а в «по складам» — потому, что остаток неофициальный. По значению эти случаи неразличимы, поэтому разбор строки собирается по этому полю, а не по её пустотам.
	Scope []string `json:"scope"`
	// BusinessID — Бизнес остатка — учётная единица строки
	BusinessID   map[string]json.RawMessage `json:"business_id"`
	BusinessName string                     `json:"business_name"`
	// CompanyID — Юрлицо остатка — разрез официального контура. У неофициального товара его нет, и тогда поле пустое (ERP-704).
	CompanyID   *UUID  `json:"company_id"`
	CompanyName string `json:"company_name"`
	// WarehouseID — Склад строки. Пусто в режимах, где он свёрнут: «по товарам» и «по юрлицам» его в разрезе нет вовсе, и нулевой идентификатор соврал бы — это значение конкретного склада.
	WarehouseID   *UUID  `json:"warehouse_id"`
	WarehouseCode string `json:"warehouse_code"`
	WarehouseName string `json:"warehouse_name"`
	ProductID     UUID   `json:"product_id"`
	ProductSKU    string `json:"product_sku"`
	ProductName   string `json:"product_name"`
	// CategoryID — Категория товара — заголовок группы строк, а не измерение разреза: в scope её нет, по ней ничего не сворачивается и не суммируется. Пусто, если категория у карточки не задана.
	CategoryID   *UUID  `json:"category_id"`
	CategoryName string `json:"category_name"`
	Unit         string `json:"unit"`
	// OnHand — Decimal string
	OnHand string `json:"on_hand"`
	// Reserved — Decimal string
	Reserved string `json:"reserved"`
	// Available — Decimal string
	Available string `json:"available"`
	// Expected — Decimal string
	Expected string `json:"expected"`
	// Forecast — Decimal string
	Forecast string `json:"forecast"`
	// Minimum — Decimal string. В свёрнутых режимах — сумма минимумов разрезов «юрлицо × склад», из которых сложена строка.
	Minimum string `json:"minimum"`
	// Suggested — Decimal string. Только правило пополнения: ноль, пока прогноз не ниже минимума или правила нет, иначе добор до максимума с округлением вверх по кратности. Нехватка считается в разрезе «юрлицо × склад» (со свёрткой зон) против прогноза того же разреза; свёрнутая строка products, companies и matrix складывает нехватки своих разрезов, и остаток без правила, остаток без юрлица и излишек другого разреза её не гасят — итог одинаков во всех режимах. Незаказанная потребность сюда не входит — она есть только в /stock/report/purchasing.
	Suggested string `json:"suggested"`
	// Amount — Decimal string
	Amount string `json:"amount"`
	// UnitCost — Decimal string. Пусто в режимах matrix и products без company_id и without_company: строка складывает партии разных владельцев, и среднее по ним не лежит ни на одном складе. Сортировка по unit_cost там идёт по имени.
	UnitCost   string `json:"unit_cost"`
	EntryCount int64  `json:"entry_count"`
}

// StockReportTotals — Итог по всей выборке отчёта, а не по странице. Количества, включая минимум, имеют смысл только при одной единице измерения на всю выборку — её называет поле unit. Себестоимости единицы здесь нет вовсе: сумма средних цен не значит ничего ни при какой однородности.
type StockReportTotals struct {
	// OnHand — Decimal string
	OnHand string `json:"on_hand"`
	// Reserved — Decimal string
	Reserved string `json:"reserved"`
	// Available — Decimal string
	Available string `json:"available"`
	// Expected — Decimal string
	Expected string `json:"expected"`
	// Forecast — Decimal string
	Forecast string `json:"forecast"`
	// Minimum — Decimal string
	Minimum string `json:"minimum"`
	// Suggested — Decimal string
	Suggested string `json:"suggested"`
	// Amount — Decimal string. Деньги аддитивны всегда и от единицы измерения не зависят
	Amount string `json:"amount"`
	// Unit — Единица измерения итога, если она одна на всю выборку. Пусто, когда единицы разные: складывать штуки с килограммами нельзя, и потребитель обязан показать прочерк вместо суммы.
	Unit string `json:"unit"`
}

// StockReportWarehouseTotal — Сумма по складу под тем же отбором, что и страница отчёта. Дерево складов показывает эти числа рядом с именами узлов; считать их отдельным запросом нельзя — он не знал бы про отборы экрана и расходился бы с таблицей.
type StockReportWarehouseTotal struct {
	WarehouseID UUID `json:"warehouse_id"`
	// OnHand — Decimal string
	OnHand string `json:"on_hand"`
	// Amount — Decimal string
	Amount string `json:"amount"`
}

type StockScanResult struct {
	IdentifierID   UUID   `json:"identifier_id"`
	Barcode        string `json:"barcode"`
	ProductID      UUID   `json:"product_id"`
	ProductSKU     string `json:"product_sku"`
	ProductName    string `json:"product_name"`
	BaseUnit       string `json:"base_unit"`
	ProductUomID   *UUID  `json:"product_uom_id"`
	ProductUomName string `json:"product_uom_name"`
	InputUnitID    *UUID  `json:"input_unit_id"`
	InputUnitLabel string `json:"input_unit_label"`
	FactorToBase   string `json:"factor_to_base"`
}

type StockSettings struct {
	// BlockShipmentOverFree — Запрещать отгрузку сверх свободного остатка
	BlockShipmentOverFree bool `json:"block_shipment_over_free"`
	// BlockReservationOverAvailable — Запрещать резерв сверх доступного остатка
	BlockReservationOverAvailable bool `json:"block_reservation_over_available"`
	// AutoCancelExpiredReservations — Снимать просроченные резервы автоматически
	AutoCancelExpiredReservations bool `json:"auto_cancel_expired_reservations"`
	// TransferCarriesReservation — Перемещение зарезервированного: везти резерв на склад-получатель вместо отказа
	TransferCarriesReservation bool `json:"transfer_carries_reservation"`
	// PurchaseRequestsEnabled — Кабинет работает с заявками на закупку (ERP-1523). Выключено — новая заявка не заводится, открытые учитываются до закрытия. Пока владелец не выбирал, следует факту: включено, если заявки в кабинете уже заводили
	PurchaseRequestsEnabled bool   `json:"purchase_requests_enabled"`
	DefaultReservationDays  int64  `json:"default_reservation_days"`
	UpdatedAt               string `json:"updated_at"`
}

type StockSettingsPatch struct {
	BlockShipmentOverFree         *bool  `json:"block_shipment_over_free,omitempty"`
	BlockReservationOverAvailable *bool  `json:"block_reservation_over_available,omitempty"`
	AutoCancelExpiredReservations *bool  `json:"auto_cancel_expired_reservations,omitempty"`
	TransferCarriesReservation    *bool  `json:"transfer_carries_reservation,omitempty"`
	PurchaseRequestsEnabled       *bool  `json:"purchase_requests_enabled,omitempty"`
	DefaultReservationDays        *int64 `json:"default_reservation_days,omitempty"`
}

type StockSupplier struct {
	ID       UUID            `json:"id"`
	Name     string          `json:"name"`
	Kind     CoreContactKind `json:"kind"`
	IsActive bool            `json:"is_active"`
}

type StockSupplierPage struct {
	Count   int64           `json:"count"`
	Results []StockSupplier `json:"results"`
}

// StockUploadFinishResult — Итог завершения сессии склада: сессия и заведённый прогон импорта.
type StockUploadFinishResult struct {
	Session TransferSession `json:"session"`
	Import  *StockImportRun `json:"import,omitempty"`
}

type StockValuationPreviewRequest struct {
	DocumentID UUID `json:"document_id"`
}

type StockValuationRebuildRequest struct {
	DocumentID UUID `json:"document_id"`
	// IdempotencyKey — Уникален в пределах кабинета; повтор с тем же ключом возвращает уже заведённый прогон. Пустой ключ заменяется идентификатором документа
	IdempotencyKey *string `json:"idempotency_key,omitempty"`
}

type StockValuationResult struct {
	DocumentID UUID `json:"document_id"`
	// Status — preview — расчёт откачен, completed — пересчёт записан
	Status string `json:"status"`
	// TotalAmount — Decimal string суммы накладных расходов
	TotalAmount       string               `json:"total_amount"`
	AffectedDocuments int64                `json:"affected_documents"`
	Steps             []StockValuationStep `json:"steps"`
}

type StockValuationRun struct {
	ID             UUID   `json:"id"`
	DocumentID     UUID   `json:"document_id"`
	IdempotencyKey string `json:"idempotency_key"`
	Status         string `json:"status"`
	// Progress — Сколько документов цепочки уже перепроведено
	Progress int64 `json:"progress"`
	// Total — Сколько документов цепочки предстоит перепровести
	Total  int64                 `json:"total"`
	Result *StockValuationResult `json:"result,omitempty"`
	// Error — Заполняется при status=failed
	Error      *string `json:"error,omitempty"`
	CreatedAt  string  `json:"created_at"`
	StartedAt  *string `json:"started_at,omitempty"`
	FinishedAt *string `json:"finished_at,omitempty"`
}

type StockValuationStep struct {
	DocumentID UUID   `json:"document_id"`
	TypeKey    string `json:"type_key"`
	Number     string `json:"number"`
	Date       string `json:"date"`
	// Movements — Число движений регистров, записанных этим документом
	Movements int64 `json:"movements"`
}

type StockWarehouse struct {
	ID                    UUID                       `json:"id"`
	Code                  string                     `json:"code"`
	Name                  string                     `json:"name"`
	ParentID              *UUID                      `json:"parent_id"`
	Address               map[string]json.RawMessage `json:"address"`
	ResponsibleEmployeeID *UUID                      `json:"responsible_employee_id"`
	IsActive              bool                       `json:"is_active"`
	SortOrder             int64                      `json:"sort_order"`
	// ZonesEnabled — Внутри склада работают зоны — приход разрешён только в подчинённую зону
	ZonesEnabled bool `json:"zones_enabled"`
	// NeedsAllocation — На самом зональном складе ещё лежит остаток, оставшийся с момента включения зон
	NeedsAllocation bool `json:"needs_allocation"`
	// InboundMode — documents — приход обычными складскими документами; external_receipt — склад внешней стороны: приход даёт только её приёмка, поступление и входящее перемещение запрещены
	InboundMode string `json:"inbound_mode"`
	// BusinessID — Бизнес склада: по нему склад и его данные сужаются областью доступа участника. null — общий склад: юрлица из нескольких бизнесов либо склад всего кабинета (например, склад площадки)
	BusinessID *UUID `json:"business_id"`
	// CompanyIds — Пустой список означает доступность склада всем активным юрлицам кабинета
	CompanyIds []UUID `json:"company_ids"`
	CreatedAt  string `json:"created_at"`
	UpdatedAt  string `json:"updated_at"`
}

type StockWarehouseInput struct {
	// Code — Приводится к верхнему регистру
	Code                  string                     `json:"code"`
	Name                  string                     `json:"name"`
	ParentID              *UUID                      `json:"parent_id,omitempty"`
	Address               map[string]json.RawMessage `json:"address,omitempty"`
	ResponsibleEmployeeID *UUID                      `json:"responsible_employee_id,omitempty"`
	SortOrder             *int64                     `json:"sort_order,omitempty"`
	// BusinessID — Бизнес склада. Пусто — выводится: у зоны от родителя, у склада с юрлицами одного бизнеса — их бизнес, в кабинете с одним бизнесом — он; юрлица нескольких бизнесов дают общий склад. Юрлица склада обязаны принадлежать названному бизнесу
	BusinessID *UUID  `json:"business_id,omitempty"`
	CompanyIds []UUID `json:"company_ids,omitempty"`
}

type StockWarehousePage struct {
	Count   int64            `json:"count"`
	Results []StockWarehouse `json:"results"`
}

// StockWarehousePatch — Отсутствующее поле сохраняет текущее значение; переданное применяется, включая null для nullable-полей.
type StockWarehousePatch struct {
	Code                  *string                    `json:"code,omitempty"`
	Name                  *string                    `json:"name,omitempty"`
	ParentID              *UUID                      `json:"parent_id,omitempty"`
	Address               map[string]json.RawMessage `json:"address,omitempty"`
	ResponsibleEmployeeID *UUID                      `json:"responsible_employee_id,omitempty"`
	SortOrder             *int64                     `json:"sort_order,omitempty"`
	// BusinessID — Бизнес склада; null — вывести заново из родителя и юрлиц. Править склад можно только в бизнесе, доступном целиком; общий склад — только при доступе ко всем бизнесам
	BusinessID *UUID  `json:"business_id,omitempty"`
	CompanyIds []UUID `json:"company_ids,omitempty"`
}

type StockWarehouseZoneInput struct {
	// Name — Название зоны; код зоны присваивает сервер
	Name string `json:"name"`
}

type StockZoneAllocation struct {
	WarehouseID  UUID                `json:"warehouse_id"`
	ZonesEnabled bool                `json:"zones_enabled"`
	Direction    string              `json:"direction"`
	Zones        []StockWarehouse    `json:"zones"`
	Rows         []StockZoneStockRow `json:"rows"`
	// Draft — Незавершённая матрица разнесения; у обратного переноса всегда null, потому что выключение атомарно
	Draft *StockZoneAllocationInput `json:"draft,omitempty"`
}

type StockZoneAllocationInput struct {
	// Date — Пусто — бизнес-дата кабинета
	Date  *string                   `json:"date,omitempty"`
	Lines []StockZoneAllocationLine `json:"lines"`
}

// StockZoneAllocationLine — Клетка матрицы. Для остатка без юрлица business_id обязателен; для остатка юрлица сервер выводит бизнес из юрлица, если он не передан.
type StockZoneAllocationLine struct {
	BusinessID *UUID `json:"business_id,omitempty"`
	// CompanyID — Пусто или null — остаток без юрлица
	CompanyID *UUID  `json:"company_id,omitempty"`
	ProductID UUID   `json:"product_id"`
	ZoneID    UUID   `json:"zone_id"`
	Quantity  string `json:"quantity"`
}

type StockZoneAllocationResult struct {
	Warehouse StockWarehouse `json:"warehouse"`
	// Documents — Проведённые перемещения — по одному на сочетание «бизнес, юрлицо или его отсутствие, зона»
	Documents []CoreDocument `json:"documents"`
	// Remaining — Остаток, который после разнесения всё ещё ждёт на складе
	Remaining []StockZoneStockRow `json:"remaining"`
}

// StockZoneStockRow — Строка остатка склада или зоны. Ключ строки — бизнес и необязательное юрлицо; остаток без юрлица приходит отдельной строкой на каждый бизнес.
type StockZoneStockRow struct {
	WarehouseID UUID `json:"warehouse_id"`
	BusinessID  UUID `json:"business_id"`
	// CompanyID — null — остаток без юрлица
	CompanyID *UUID `json:"company_id"`
	ProductID UUID  `json:"product_id"`
	// Quantity — Точное decimal-количество строкой
	Quantity string `json:"quantity"`
}

type Subtask struct {
	ID             UUID    `json:"id"`
	Identifier     string  `json:"identifier"`
	Title          string  `json:"title"`
	StatusCategory *string `json:"status_category"`
	Executor       *int64  `json:"executor"`
	ExecutorName   *string `json:"executor_name"`
	DueAt          *string `json:"due_at"`
}

// SupplierDocument — Номер и дата документа поставщика (ERP-484, подшаг 5.3): по ним входящий НДС сверяется с книгой покупок. Оба поля необязательны
type SupplierDocument struct {
	Number *string `json:"number,omitempty"`
	Date   *string `json:"date,omitempty"`
}

type Task struct {
	ID                 UUID                       `json:"id"`
	Identifier         string                     `json:"identifier"`
	Section            *UUID                      `json:"section"`
	SectionKey         *string                    `json:"section_key"`
	SectionName        *string                    `json:"section_name"`
	Title              string                     `json:"title"`
	Description        string                     `json:"description"`
	Status             *UUID                      `json:"status"`
	StatusName         *string                    `json:"status_name"`
	StatusCategory     *string                    `json:"status_category"`
	Priority           TaskPriority               `json:"priority"`
	IsImportant        bool                       `json:"is_important"`
	Creator            *int64                     `json:"creator"`
	CreatorName        *string                    `json:"creator_name"`
	Executor           *int64                     `json:"executor"`
	ExecutorName       *string                    `json:"executor_name"`
	Assignee           *int64                     `json:"assignee,omitempty"`
	AssigneeName       *string                    `json:"assignee_name,omitempty"`
	Coexecutors        []TaskWatcher              `json:"coexecutors"`
	Cycle              *UUID                      `json:"cycle"`
	CycleName          *string                    `json:"cycle_name"`
	Milestone          *UUID                      `json:"milestone"`
	MilestoneName      *string                    `json:"milestone_name"`
	StartAt            *string                    `json:"start_at"`
	CreatedAt          string                     `json:"created_at"`
	DueAt              *string                    `json:"due_at"`
	Estimate           *float64                   `json:"estimate"`
	SortOrder          float64                    `json:"sort_order"`
	IsArchived         bool                       `json:"is_archived"`
	Parent             *UUID                      `json:"parent"`
	ParentIdentifier   *string                    `json:"parent_identifier"`
	ParentTitle        *string                    `json:"parent_title"`
	Recurrence         string                     `json:"recurrence"`
	RecurrenceInterval int64                      `json:"recurrence_interval"`
	RecurrenceUntil    *string                    `json:"recurrence_until"`
	Custom             map[string]json.RawMessage `json:"custom"`
	Watchers           []TaskWatcher              `json:"watchers"`
	Subtasks           []Subtask                  `json:"subtasks"`
	SubtasksTotal      int64                      `json:"subtasks_total"`
	SubtasksDone       int64                      `json:"subtasks_done"`
	// ChecklistTotal — Пунктов во всех чек-листах задачи (ERP-1488); есть и в компактной строке списка.
	ChecklistTotal int64 `json:"checklist_total"`
	// ChecklistDone — Отмеченных пунктов во всех чек-листах задачи.
	ChecklistDone  int64                        `json:"checklist_done"`
	Tags           []TaskTag                    `json:"tags"`
	Links          []map[string]json.RawMessage `json:"links"`
	CommentsCount  int64                        `json:"comments_count"`
	BlockedByCount int64                        `json:"blocked_by_count"`
}

type TaskCreate struct {
	Section            UUID          `json:"section"`
	Title              string        `json:"title"`
	Description        *string       `json:"description,omitempty"`
	Status             *UUID         `json:"status,omitempty"`
	Priority           *TaskPriority `json:"priority,omitempty"`
	IsImportant        *bool         `json:"is_important,omitempty"`
	Creator            *int64        `json:"creator,omitempty"`
	Executor           *int64        `json:"executor,omitempty"`
	Assignee           *int64        `json:"assignee,omitempty"`
	CoexecutorIds      []int64       `json:"coexecutor_ids,omitempty"`
	WatcherIds         []int64       `json:"watcher_ids,omitempty"`
	TagIds             []UUID        `json:"tag_ids,omitempty"`
	StartAt            *string       `json:"start_at,omitempty"`
	DueAt              *string       `json:"due_at,omitempty"`
	Estimate           *float64      `json:"estimate,omitempty"`
	Parent             *UUID         `json:"parent,omitempty"`
	Recurrence         *string       `json:"recurrence,omitempty"`
	RecurrenceInterval *int64        `json:"recurrence_interval,omitempty"`
	RecurrenceUntil    *string       `json:"recurrence_until,omitempty"`
	Cycle              *string       `json:"cycle,omitempty"`
	// Milestone — Веха: UUID или имя этапа своего проекта задач
	Milestone *string                    `json:"milestone,omitempty"`
	Custom    map[string]json.RawMessage `json:"custom,omitempty"`
}

type TaskDocument struct {
	ID         UUID              `json:"id"`
	OwnerType  DocumentOwnerType `json:"owner_type"`
	OwnerID    UUID              `json:"owner_id"`
	OwnerKey   string            `json:"owner_key"`
	OwnerName  string            `json:"owner_name"`
	AuthorID   *int64            `json:"author_id"`
	AuthorName string            `json:"author_name"`
	Title      string            `json:"title"`
	Content    string            `json:"content"`
	Icon       string            `json:"icon"`
	Color      string            `json:"color"`
	IsArchived bool              `json:"is_archived"`
	CreatedAt  string            `json:"created_at"`
	UpdatedAt  string            `json:"updated_at"`
}

type TaskMove struct {
	Status UUID `json:"status"`
}

type TaskPage struct {
	Count   int64  `json:"count"`
	Limit   *int64 `json:"limit,omitempty"`
	Offset  *int64 `json:"offset,omitempty"`
	HasMore *bool  `json:"has_more,omitempty"`
	Results []Task `json:"results"`
}

type TaskPriority = string

type TaskTag struct {
	ID    UUID    `json:"id"`
	Name  string  `json:"name"`
	Color *string `json:"color,omitempty"`
}

type TaskTagCatalogItem struct {
	ID          UUID   `json:"id"`
	Section     *UUID  `json:"section"`
	Name        string `json:"name"`
	Color       string `json:"color"`
	Description string `json:"description"`
	IsArchived  bool   `json:"is_archived"`
}

type TaskTagCreate struct {
	Section     *UUID   `json:"section,omitempty"`
	Name        string  `json:"name"`
	Color       *string `json:"color,omitempty"`
	Description *string `json:"description,omitempty"`
}

type TaskTagPage struct {
	Count   int64                `json:"count"`
	Results []TaskTagCatalogItem `json:"results"`
}

type TaskTagUpdate struct {
	Name        *string `json:"name,omitempty"`
	Color       *string `json:"color,omitempty"`
	Description *string `json:"description,omitempty"`
}

type TaskTemplate struct {
	ID                 UUID                       `json:"id"`
	Section            UUID                       `json:"section"`
	SectionKey         *string                    `json:"section_key"`
	SectionName        *string                    `json:"section_name"`
	Status             *UUID                      `json:"status"`
	StatusName         *string                    `json:"status_name"`
	Owner              *int64                     `json:"owner"`
	Name               string                     `json:"name"`
	Title              string                     `json:"title"`
	Description        string                     `json:"description"`
	Priority           TaskPriority               `json:"priority"`
	Executor           *int64                     `json:"executor"`
	Assignee           *int64                     `json:"assignee,omitempty"`
	ExecutorName       *string                    `json:"executor_name"`
	Estimate           *float64                   `json:"estimate"`
	StartOffsetDays    int64                      `json:"start_offset_days"`
	DueOffsetDays      *int64                     `json:"due_offset_days"`
	Recurrence         TemplateRecurrence         `json:"recurrence"`
	RecurrenceInterval int64                      `json:"recurrence_interval"`
	RecurrenceUntil    *string                    `json:"recurrence_until"`
	NextRunAt          *string                    `json:"next_run_at"`
	LastRunAt          *string                    `json:"last_run_at"`
	LastTask           *UUID                      `json:"last_task"`
	LastTaskIdentifier *string                    `json:"last_task_identifier"`
	IsActive           bool                       `json:"is_active"`
	Custom             map[string]json.RawMessage `json:"custom"`
	CreatedAt          string                     `json:"created_at"`
	UpdatedAt          string                     `json:"updated_at"`
}

type TaskTemplateCreate struct {
	Section            UUID                       `json:"section"`
	Status             *UUID                      `json:"status,omitempty"`
	Name               string                     `json:"name"`
	Title              string                     `json:"title"`
	Description        *string                    `json:"description,omitempty"`
	Priority           *TaskPriority              `json:"priority,omitempty"`
	Executor           *int64                     `json:"executor,omitempty"`
	Assignee           *int64                     `json:"assignee,omitempty"`
	Estimate           *float64                   `json:"estimate,omitempty"`
	StartOffsetDays    *int64                     `json:"start_offset_days,omitempty"`
	DueOffsetDays      *int64                     `json:"due_offset_days,omitempty"`
	Recurrence         *TemplateRecurrence        `json:"recurrence,omitempty"`
	RecurrenceInterval *int64                     `json:"recurrence_interval,omitempty"`
	RecurrenceUntil    *string                    `json:"recurrence_until,omitempty"`
	NextRunAt          *string                    `json:"next_run_at,omitempty"`
	IsActive           *bool                      `json:"is_active,omitempty"`
	Custom             map[string]json.RawMessage `json:"custom,omitempty"`
}

type TaskTemplatePage struct {
	Count   int64          `json:"count"`
	Results []TaskTemplate `json:"results"`
}

type TaskUpdate struct {
	Title              *string       `json:"title,omitempty"`
	Description        *string       `json:"description,omitempty"`
	Section            *UUID         `json:"section,omitempty"`
	Status             *UUID         `json:"status,omitempty"`
	Priority           *TaskPriority `json:"priority,omitempty"`
	IsImportant        *bool         `json:"is_important,omitempty"`
	Executor           *int64        `json:"executor,omitempty"`
	Assignee           *int64        `json:"assignee,omitempty"`
	CoexecutorIds      []int64       `json:"coexecutor_ids,omitempty"`
	WatcherIds         []int64       `json:"watcher_ids,omitempty"`
	TagIds             []UUID        `json:"tag_ids,omitempty"`
	StartAt            *string       `json:"start_at,omitempty"`
	DueAt              *string       `json:"due_at,omitempty"`
	Estimate           *float64      `json:"estimate,omitempty"`
	Parent             *UUID         `json:"parent,omitempty"`
	Recurrence         *string       `json:"recurrence,omitempty"`
	RecurrenceInterval *int64        `json:"recurrence_interval,omitempty"`
	RecurrenceUntil    *string       `json:"recurrence_until,omitempty"`
	Cycle              *string       `json:"cycle,omitempty"`
	// Milestone — Веха: UUID или имя этапа; пустая строка снимает задачу с вехи
	Milestone        *string                    `json:"milestone,omitempty"`
	Custom           map[string]json.RawMessage `json:"custom,omitempty"`
	ManagedChecklist *ManagedChecklistPatch     `json:"managed_checklist,omitempty"`
}

type TaskView struct {
	ID         UUID                       `json:"id"`
	Name       string                     `json:"name"`
	Owner      *int64                     `json:"owner"`
	OwnerName  *string                    `json:"owner_name"`
	Section    *UUID                      `json:"section"`
	Visibility string                     `json:"visibility"`
	Filters    map[string]json.RawMessage `json:"filters"`
	Sort       string                     `json:"sort"`
}

type TaskViewCreate struct {
	Name       string                     `json:"name"`
	Section    *UUID                      `json:"section,omitempty"`
	Visibility *string                    `json:"visibility,omitempty"`
	Filters    map[string]json.RawMessage `json:"filters,omitempty"`
	Sort       *string                    `json:"sort,omitempty"`
}

type TaskViewPage struct {
	Count   int64      `json:"count"`
	Results []TaskView `json:"results"`
}

type TaskWatcher struct {
	ID       int64   `json:"id"`
	User     int64   `json:"user"`
	UserName *string `json:"user_name"`
}

type TeamFlowTotals struct {
	Taken  int64 `json:"taken"`
	Handed int64 `json:"handed"`
	Closed int64 `json:"closed"`
}

type TeamMemberMetrics struct {
	User                int64               `json:"user"`
	Name                string              `json:"name"`
	Taken               int64               `json:"taken"`
	Handed              int64               `json:"handed"`
	Closed              int64               `json:"closed"`
	DoneOfTaken         int64               `json:"done_of_taken"`
	HandedWithDue       int64               `json:"handed_with_due"`
	HandedOnTime        int64               `json:"handed_on_time"`
	Efficiency          *int64              `json:"efficiency"`
	InWork              int64               `json:"in_work"`
	Review              int64               `json:"review"`
	ReviewOldestSeconds int64               `json:"review_oldest_seconds"`
	Overdue             int64               `json:"overdue"`
	OverdueInReview     int64               `json:"overdue_in_review"`
	Backlog             int64               `json:"backlog"`
	CycleMedianSeconds  int64               `json:"cycle_median_seconds"`
	ReworkPercent       float64             `json:"rework_percent"`
	Buckets             []TeamMetricsBucket `json:"buckets"`
}

type TeamMetrics struct {
	Project             UUID                  `json:"project"`
	Period              string                `json:"period"`
	WindowFrom          string                `json:"window_from"`
	WindowTo            string                `json:"window_to"`
	BucketDays          int64                 `json:"bucket_days"`
	Taken               int64                 `json:"taken"`
	Handed              int64                 `json:"handed"`
	Closed              int64                 `json:"closed"`
	Previous            *TeamFlowTotals       `json:"previous"`
	Review              int64                 `json:"review"`
	ReviewMedianSeconds int64                 `json:"review_median_seconds"`
	ReviewStale         int64                 `json:"review_stale"`
	Overdue             int64                 `json:"overdue"`
	Backlog             int64                 `json:"backlog"`
	InWork              int64                 `json:"in_work"`
	CycleMedianSeconds  int64                 `json:"cycle_median_seconds"`
	Buckets             []TeamMetricsBucket   `json:"buckets"`
	Members             []TeamMemberMetrics   `json:"members"`
	Unassigned          TeamMetricsUnassigned `json:"unassigned"`
}

type TeamMetricsUnassigned struct {
	Open    int64 `json:"open"`
	Overdue int64 `json:"overdue"`
}

type TeamMetricsBucket struct {
	Start      string `json:"start"`
	Taken      int64  `json:"taken"`
	Handed     int64  `json:"handed"`
	HandedLate int64  `json:"handed_late"`
	Closed     int64  `json:"closed"`
}

type TemplateRecurrence = string

type TemplateRunPage struct {
	Count   int64               `json:"count"`
	Results []TemplateRunResult `json:"results"`
}

type TemplateRunResult struct {
	Template TaskTemplate `json:"template"`
	Task     *Task        `json:"task"`
	Created  bool         `json:"created"`
	Reason   *string      `json:"reason,omitempty"`
}

// TransferDownloadLink — Временный адрес файла: подписанный адрес хранилища или адрес этого API.
type TransferDownloadLink struct {
	URL    string `json:"url"`
	Method string `json:"method"`
	// Direct — true — подписанный адрес хранилища, без заголовка авторизации; false — адрес этого API, с авторизацией
	Direct bool `json:"direct"`
	// RequiresAuthorization — true — адрес требует токен API, агенту по MCP он недоступен
	RequiresAuthorization bool `json:"requires_authorization"`
	// ExpiresAt — Срок подписанного адреса; у адреса API его нет
	ExpiresAt *string `json:"expires_at,omitempty"`
	Name      string  `json:"name"`
	MimeType  string  `json:"mime_type"`
	SizeBytes int64   `json:"size_bytes"`
	// ScanStatus — Вердикт антивируса; skipped — файл антивирус не проверял
	ScanStatus *string `json:"scan_status,omitempty"`
	// Facsimile — Что стало с просьбой о факсимиле у печатной формы
	Facsimile *string `json:"facsimile,omitempty"`
}

// TransferInstructions — Как передать байты. Выдаётся один раз, при открытии сессии.
type TransferInstructions struct {
	// Mode — post — один multipart POST; parts — PUT каждой части; api — PUT через этот API с авторизацией
	Mode   string  `json:"mode"`
	URL    *string `json:"url,omitempty"`
	Method *string `json:"method,omitempty"`
	// Fields — Поля формы для POST; файл идёт после них последним полем
	Fields map[string]string `json:"fields,omitempty"`
	// FileField — Имя поля формы для файла
	FileField *string           `json:"file_field,omitempty"`
	Headers   map[string]string `json:"headers,omitempty"`
	PartBytes *int64            `json:"part_bytes,omitempty"`
	PartCount *int64            `json:"part_count,omitempty"`
	// DirectUrls — Подписанный адрес каждой части по её номеру, начиная с 1
	DirectUrls map[string]string `json:"direct_urls,omitempty"`
	// RequiresAuthorization — true — адрес требует токен API, агенту по MCP этот путь недоступен
	RequiresAuthorization bool   `json:"requires_authorization"`
	MaxBytes              int64  `json:"max_bytes"`
	ExpiresAt             string `json:"expires_at"`
}

// TransferSession — Сессия загрузки файла по подписанному адресу хранилища. Ключи хранилища наружу не отдаются.
type TransferSession struct {
	ID            UUID              `json:"id"`
	OwnerType     string            `json:"owner_type"`
	OwnerID       *string           `json:"owner_id,omitempty"`
	Name          string            `json:"name"`
	MimeType      string            `json:"mime_type"`
	SizeBytes     int64             `json:"size_bytes"`
	Sha256        *string           `json:"sha256,omitempty"`
	Attributes    map[string]string `json:"attributes,omitempty"`
	Status        string            `json:"status"`
	Failure       *string           `json:"failure,omitempty"`
	FailureDetail *string           `json:"failure_detail,omitempty"`
	ScanStatus    *string           `json:"scan_status,omitempty"`
	ScanVerdict   *string           `json:"scan_verdict,omitempty"`
	// PublishedRef — Номер строки, заведённой по файлу; у почты — id загрузки для upload_ids
	PublishedRef *string               `json:"published_ref,omitempty"`
	ExpiresAt    string                `json:"expires_at"`
	CreatedAt    string                `json:"created_at"`
	CompletedAt  *string               `json:"completed_at,omitempty"`
	Upload       *TransferInstructions `json:"upload,omitempty"`
}

// TransferUploadRequest — Заявка на сессию загрузки файла по подписанному адресу.
type TransferUploadRequest struct {
	// Name — Имя файла с расширением
	Name string `json:"name"`
	// MimeType — Тип содержимого; по умолчанию application/octet-stream
	MimeType *string `json:"mime_type,omitempty"`
	// SizeBytes — Точный размер файла в байтах
	SizeBytes int64 `json:"size_bytes"`
	// Sha256 — Необязательная контрольная сумма SHA-256 строчными шестнадцатеричными знаками
	Sha256 *string `json:"sha256,omitempty"`
}

type UUID = string

type WorkflowStatusUpdate struct {
	Name      *string         `json:"name,omitempty"`
	Category  *StatusCategory `json:"category,omitempty"`
	Color     *string         `json:"color,omitempty"`
	Order     *int64          `json:"order,omitempty"`
	IsDefault *bool           `json:"is_default,omitempty"`
	IsFinal   *bool           `json:"is_final,omitempty"`
}

type AppDocflowRecordSalePaymentRequest struct {
	Provider   string  `json:"provider"`
	ExternalID string  `json:"external_id"`
	Kind       *string `json:"kind,omitempty"`
	Amount     string  `json:"amount"`
	Currency   *string `json:"currency,omitempty"`
	PaidAt     *string `json:"paid_at,omitempty"`
}

type AssistantListDigestsResponse struct {
	Items []AssistantDigest `json:"items"`
}

type AssistantReplaceDigestRequest struct {
	Name           string   `json:"name"`
	MetricIds      []string `json:"metric_ids"`
	Company        *UUID    `json:"company,omitempty"`
	Project        *UUID    `json:"project,omitempty"`
	Period         string   `json:"period"`
	ScheduleHour   int64    `json:"schedule_hour"`
	ScheduleMinute int64    `json:"schedule_minute"`
	Timezone       string   `json:"timezone"`
	WeekdaysOnly   bool     `json:"weekdays_only"`
	Locale         string   `json:"locale"`
	Enabled        bool     `json:"enabled"`
	Version        int64    `json:"version"`
}

type AutomationRulesResponse struct {
	Rules []AutomationRuleDocument `json:"rules"`
}

type AutomationRuleSimulateResponse struct {
	Result  AutomationRuleSimulation `json:"result"`
	Problem *AutomationRuleProblem   `json:"problem,omitempty"`
}

type AutomationRuleTestResponse struct {
	Result  AutomationRuleTestResult `json:"result"`
	Problem *AutomationRuleProblem   `json:"problem,omitempty"`
}

type BankRepostTransactionsRequest struct {
	Ids            []UUID `json:"ids"`
	ConfirmRelease *bool  `json:"confirm_release,omitempty"`
}

type BankRepostTransactionRequest struct {
	ConfirmRelease *bool `json:"confirm_release,omitempty"`
}

type CoreListBusinessesResponse struct {
	Results []CoreBusiness `json:"results"`
}

type CoreSetBusinessActiveRequest struct {
	Active bool `json:"active"`
}

type CoreListBusinessOwnershipResponse struct {
	Results []CoreOwnershipVersion `json:"results"`
}

type DashboardListMetricsResponse struct {
	Count   int64                       `json:"count"`
	Results []DashboardMetricDefinition `json:"results"`
}

type DocflowFlowContactStatsResponse struct {
	Items []DocflowFlowContactStatsResponseItemsItem `json:"items"`
}

type DocflowFlowContactStatsResponseItemsItem struct {
	ContactID UUID  `json:"contact_id"`
	Documents int64 `json:"documents"`
	// LastDate — Дата последнего документа, YYYY-MM-DD; пусто — без даты
	LastDate string `json:"last_date"`
}

type DocflowFlowDocumentRevisionsResponse struct {
	Items []DocflowFlowDocumentRevisionsResponseItemsItem `json:"items"`
}

type DocflowFlowDocumentRevisionsResponseItemsItem struct {
	Version     int64   `json:"version"`
	CreatedAt   string  `json:"created_at"`
	AuthorID    int64   `json:"author_id"`
	AuthorName  *string `json:"author_name,omitempty"`
	Status      string  `json:"status"`
	Files       int64   `json:"files"`
	HasApproval bool    `json:"has_approval"`
	// Reason — Причина системной ревизии: schedule:<вид бумаги>:<registered|cancelled>:<номер>:<дата> — график договора пересчитан по допсоглашению или спецификации
	Reason *string `json:"reason,omitempty"`
	// System — Ревизию записала система, а не человек правкой карточки
	System *bool `json:"system,omitempty"`
}

type FilesContentLinkResponse struct {
	URL string `json:"url"`
	// Direct — true — адрес ведёт прямо в хранилище; false — на этот API, с заголовком авторизации
	Direct    bool    `json:"direct"`
	ExpiresAt *string `json:"expires_at,omitempty"`
	Name      string  `json:"name"`
	MimeType  string  `json:"mime_type"`
	SizeBytes *int64  `json:"size_bytes,omitempty"`
	VersionID *UUID   `json:"version_id,omitempty"`
	// VersionNo — Номер версии, содержимое которой адресуется
	VersionNo *int64 `json:"version_no,omitempty"`
}

type FilesListVersionsResponse struct {
	Versions []FilesVersion `json:"versions"`
}

type FilesListRootsResponse struct {
	Roots []FilesFolder `json:"roots"`
}

type FilesSearchResponse struct {
	Results []FilesSearchHit `json:"results"`
}

type FilesCreateShortcutRequest struct {
	FolderID UUID   `json:"folder_id"`
	Name     string `json:"name"`
	URL      string `json:"url"`
}

type FilesVersionContentLinkResponse struct {
	URL string `json:"url"`
	// Direct — true — адрес ведёт прямо в хранилище; false — на этот API, с заголовком авторизации
	Direct    bool    `json:"direct"`
	ExpiresAt *string `json:"expires_at,omitempty"`
	Name      string  `json:"name"`
	MimeType  string  `json:"mime_type"`
	SizeBytes *int64  `json:"size_bytes,omitempty"`
	VersionID UUID    `json:"version_id"`
	VersionNo int64   `json:"version_no"`
}

type FinanceListDividendAccessUsersResponse struct {
	Results []FinanceListDividendAccessUsersResponseResultsItem `json:"results,omitempty"`
}

type FinanceListDividendAccessUsersResponseResultsItem struct {
	UserID   int64  `json:"user_id"`
	FullName string `json:"full_name"`
	Username string `json:"username"`
}

type FinanceListDividendAutomationRunsResponse struct {
	Results []map[string]json.RawMessage `json:"results,omitempty"`
}

type FinanceListDividendDecisionsResponse struct {
	Results []map[string]json.RawMessage `json:"results,omitempty"`
}

type FinanceListDividendOwnersResponse struct {
	Results []FinanceListDividendOwnersResponseResultsItem `json:"results"`
}

type FinanceListDividendOwnersResponseResultsItem struct {
	ID             UUID   `json:"id"`
	Kind           string `json:"kind"`
	Name           string `json:"name"`
	SharePercent   string `json:"share_percent"`
	IsActive       bool   `json:"is_active"`
	PayableBalance string `json:"payable_balance"`
}

type FinanceListDividendPoliciesResponse struct {
	Results []map[string]json.RawMessage `json:"results,omitempty"`
}

type FinanceGetProjectBudgetHistoryResponse struct {
	Count   int64                  `json:"count"`
	Results []FinanceProjectBudget `json:"results"`
}

type FinanceListAllocationRulesResponse struct {
	Results []FinanceAllocationRule `json:"results,omitempty"`
}

type FinanceRepostTransactionsRequest struct {
	Ids            []UUID `json:"ids"`
	ConfirmRelease *bool  `json:"confirm_release,omitempty"`
}

type FinanceMarkTransactionDeletedRequest struct {
	// ConfirmRelease — Согласие снять аванс и зачёты операции
	ConfirmRelease *bool `json:"confirm_release,omitempty"`
}

type FinanceRepostTransactionRequest struct {
	ConfirmRelease *bool `json:"confirm_release,omitempty"`
}

type MailListAccountsResponse struct {
	Items []MailAccount `json:"items"`
}

type MailListFoldersResponse struct {
	Items []MailFolder `json:"items"`
}

type MailComposeMessageResponse struct {
	Message  MailMessage  `json:"message"`
	Outbound MailOutbound `json:"outbound"`
}

type MailListRulesResponse struct {
	Items []MailRule `json:"items"`
}

type MailApplyRulesRequest struct {
	// FolderID — Папка разбора; без неё разбираются «Входящие»
	FolderID *UUID `json:"folder_id,omitempty"`
	// Limit — Сколько писем взять в разбор; ноль и меньше означает умолчание
	Limit *int64 `json:"limit,omitempty"`
}

type MailApplyRulesResponse struct {
	Items []MailRuleOutcome `json:"items"`
	// Applied — Сколько писем правила разобрали
	Applied int64 `json:"applied"`
}

type MailAttachStoredFileRequest struct {
	// FileID — Файл в хранилище кабинета
	FileID string `json:"file_id"`
}

type MailReadBatchRequest struct {
	Ids      []UUID `json:"ids,omitempty"`
	FolderID *UUID  `json:"folder_id,omitempty"`
	Read     *bool  `json:"read,omitempty"`
}

type MailReadBatchResponse struct {
	Updated int64 `json:"updated"`
}

type MailListMessageAttachmentsResponse struct {
	Items []MailAttachment `json:"items"`
}

type MailFlagMessageRequest struct {
	// Flagged — Значение false снимает отметку важности
	Flagged *bool `json:"flagged,omitempty"`
}

type MailMoveMessageRequest struct {
	FolderID UUID `json:"folder_id"`
}

type MailListPeopleResponse struct {
	Items []MailPerson `json:"items"`
}

type MailListProvidersResponse struct {
	Items      []MailProvider `json:"items"`
	Suggestion *MailProvider  `json:"suggestion,omitempty"`
}

type MailListVIPSendersResponse struct {
	Items []MailListVIPSendersResponseItemsItem `json:"items"`
}

type MailListVIPSendersResponseItemsItem struct {
	Address string `json:"address"`
}

type MailSetVIPSenderRequest struct {
	Address   string `json:"address"`
	Important *bool  `json:"important,omitempty"`
}

type MailCountVIPUnreadResponse struct {
	Unread int64 `json:"unread"`
}

type StockListDocumentAuthorsResponse struct {
	Count   int64                                         `json:"count"`
	Results []StockListDocumentAuthorsResponseResultsItem `json:"results"`
}

type StockListDocumentAuthorsResponseResultsItem struct {
	ID   int64  `json:"id"`
	Name string `json:"name"`
}
