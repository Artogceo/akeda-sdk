// Сгенерировано scripts/generate.py. Руками не править.
// Источник: snapshot/openapi/akeda-v1.json (контракт 0.21.0-core-public, sha256 3b4e5818e72cb98786a0f06776813205755d9e95e5752df061d59d58c0db6522).
// Рантайм клиента написан руками и живёт рядом; здесь только типы.

package generated

import "encoding/json"

type Activity struct {
	ID        UUID    `json:"id"`
	Action    string  `json:"action"`
	ActorName *string `json:"actor_name"`
	CreatedAt string  `json:"created_at"`
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

// AppRuntimeSlotActor — Человек, открывший панель, в том объёме, в каком приложению позволено его знать. Полей ровно три, и четвёртого не появится: имя и почта — это штат клиента, роли — его оргструктура, а числовой идентификатор общий на всю платформу и связал бы два кабинета между собой.
type AppRuntimeSlotActor struct {
	// Subject — Псевдоним, свой у каждой пары «установка + человек». Устойчив внутри установки, поэтому панель помнит выбор сотрудника; в другой установке того же приложения у того же человека он ДРУГОЙ; умирает вместе с установкой
	Subject UUID `json:"subject"`
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

type AttachmentDownloadSession struct {
	Attachment Attachment        `json:"attachment"`
	URL        string            `json:"url"`
	Method     string            `json:"method"`
	Headers    map[string]string `json:"headers,omitempty"`
	ExpiresAt  string            `json:"expires_at"`
}

type AttachmentMove struct {
	FolderID *string `json:"folder_id"`
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
	UploadedBy          int64               `json:"uploaded_by"`
	Name                string              `json:"name"`
	MimeType            string              `json:"mime_type"`
	SizeBytes           int64               `json:"size_bytes"`
	Sha256              *string             `json:"sha256,omitempty"`
	Status              string              `json:"status"`
	ExpiresAt           string              `json:"expires_at"`
	CompletedAt         *string             `json:"completed_at,omitempty"`
	CreatedAt           string              `json:"created_at"`
	UploadURL           *string             `json:"upload_url,omitempty"`
	Method              *string             `json:"method,omitempty"`
	Headers             map[string]string   `json:"headers,omitempty"`
	Fields              map[string]string   `json:"fields,omitempty"`
	FileField           *string             `json:"file_field,omitempty"`
	MaxBytes            *int64              `json:"max_bytes,omitempty"`
}

type AttachmentUploadSessionCreate struct {
	OwnerType AttachmentOwnerType `json:"owner_type"`
	OwnerID   UUID                `json:"owner_id"`
	Filename  string              `json:"filename"`
	MimeType  *string             `json:"mime_type,omitempty"`
	SizeBytes int64               `json:"size_bytes"`
	Sha256    *string             `json:"sha256,omitempty"`
}

// CRMActivity — Лента только дописывается
type CRMActivity struct {
	ID         UUID   `json:"id"`
	EntityType string `json:"entity_type"`
	EntityID   UUID   `json:"entity_id"`
	// Action — Ключ факта; note - заметка сотрудника
	Action    string                     `json:"action"`
	Details   map[string]json.RawMessage `json:"details"`
	ActorID   int64                      `json:"actor_id"`
	ActorName *string                    `json:"actor_name,omitempty"`
	CreatedAt string                     `json:"created_at"`
}

// CRMAnalytics — Живая витрина по всему кабинету; суммы в валюте сделки
type CRMAnalytics struct {
	Stages     []CRMStageMetric    `json:"stages"`
	Conversion CRMConversionMetric `json:"conversion"`
	// WeightedForecast — Сумма открытых сделок, взвешенная вероятностью
	WeightedForecast int64                 `json:"weighted_forecast"`
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
}

type CRMAutomationRuleInput struct {
	Name       string                 `json:"name"`
	EventType  CRMAutomationEventType `json:"event_type"`
	Conditions map[string]string      `json:"conditions,omitempty"`
	Actions    []CRMAutomationAction  `json:"actions"`
	IsEnabled  *bool                  `json:"is_enabled,omitempty"`
}

type CRMAutomationRun struct {
	ID           UUID     `json:"id"`
	RuleID       UUID     `json:"rule_id"`
	EventID      UUID     `json:"event_id"`
	Status       string   `json:"status"`
	Attempts     int64    `json:"attempts"`
	ActionErrors []string `json:"action_errors"`
	CreatedAt    string   `json:"created_at"`
	UpdatedAt    string   `json:"updated_at"`
}

// CRMContactRef — Узкая проекция карточки справочника ERP; CRM её не редактирует
type CRMContactRef struct {
	ID         UUID    `json:"id"`
	Name       string  `json:"name"`
	LegalName  *string `json:"legal_name,omitempty"`
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
	PipelineID      UUID    `json:"pipeline_id"`
	StageID         UUID    `json:"stage_id"`
	Title           string  `json:"title"`
	Amount          *int64  `json:"amount,omitempty"`
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

type CRMCreateHubMeetingInput struct {
	ProjectID       string  `json:"project_id"`
	CalendarEventID UUID    `json:"calendar_event_id"`
	Title           *string `json:"title,omitempty"`
	StartsAt        *string `json:"starts_at,omitempty"`
}

type CRMCreateTaskLinkInput struct {
	SectionID   UUID    `json:"section_id"`
	Title       string  `json:"title"`
	Description *string `json:"description,omitempty"`
	DueAt       *string `json:"due_at,omitempty"`
}

type CRMCustomer struct {
	ID        UUID   `json:"id"`
	Kind      string `json:"kind"`
	Name      string `json:"name"`
	LegalName string `json:"legal_name"`
	Phone     string `json:"phone"`
	Email     string `json:"email"`
	// Messengers — Ник или номер клиента по мессенджерам
	Messengers    map[string]string `json:"messengers"`
	Tags          []string          `json:"tags"`
	Source        string            `json:"source"`
	OwnerID       *int64            `json:"owner_id,omitempty"`
	OwnerName     *string           `json:"owner_name,omitempty"`
	Note          string            `json:"note"`
	CoreContactID *UUID             `json:"core_contact_id,omitempty"`
	// PromotedAt — Момент переноса в справочник контрагентов ERP
	PromotedAt *string `json:"promoted_at,omitempty"`
	ArchivedAt *string `json:"archived_at,omitempty"`
	OpenDeals  int64   `json:"open_deals"`
	CreatedAt  string  `json:"created_at"`
	UpdatedAt  string  `json:"updated_at"`
}

type CRMCustomerDuplicate struct {
	ID        UUID   `json:"id"`
	Kind      string `json:"kind"`
	Name      string `json:"name"`
	LegalName string `json:"legal_name"`
	Phone     string `json:"phone"`
	Email     string `json:"email"`
	// Messengers — Ник или номер клиента по мессенджерам
	Messengers    map[string]string `json:"messengers"`
	Tags          []string          `json:"tags"`
	Source        string            `json:"source"`
	OwnerID       *int64            `json:"owner_id,omitempty"`
	OwnerName     *string           `json:"owner_name,omitempty"`
	Note          string            `json:"note"`
	CoreContactID *UUID             `json:"core_contact_id,omitempty"`
	// PromotedAt — Момент переноса в справочник контрагентов ERP
	PromotedAt *string `json:"promoted_at,omitempty"`
	ArchivedAt *string `json:"archived_at,omitempty"`
	OpenDeals  int64   `json:"open_deals"`
	CreatedAt  string  `json:"created_at"`
	UpdatedAt  string  `json:"updated_at"`
	MatchedBy  string  `json:"matched_by"`
}

type CRMCustomerInput struct {
	Kind       *string           `json:"kind,omitempty"`
	Name       string            `json:"name"`
	LegalName  *string           `json:"legal_name,omitempty"`
	Phone      *string           `json:"phone,omitempty"`
	Email      *string           `json:"email,omitempty"`
	Messengers map[string]string `json:"messengers,omitempty"`
	Tags       []string          `json:"tags,omitempty"`
	Source     *string           `json:"source,omitempty"`
	OwnerID    *int64            `json:"owner_id,omitempty"`
	Note       *string           `json:"note,omitempty"`
}

type CRMCustomerPatch struct {
	Kind       *string           `json:"kind,omitempty"`
	Name       *string           `json:"name,omitempty"`
	LegalName  *string           `json:"legal_name,omitempty"`
	Phone      *string           `json:"phone,omitempty"`
	Email      *string           `json:"email,omitempty"`
	Messengers map[string]string `json:"messengers,omitempty"`
	Tags       []string          `json:"tags,omitempty"`
	Source     *string           `json:"source,omitempty"`
	OwnerID    *int64            `json:"owner_id,omitempty"`
	Note       *string           `json:"note,omitempty"`
	Archived   *bool             `json:"archived,omitempty"`
}

type CRMDeal struct {
	ID         UUID   `json:"id"`
	PipelineID UUID   `json:"pipeline_id"`
	StageID    UUID   `json:"stage_id"`
	Title      string `json:"title"`
	Amount     int64  `json:"amount"`
	// Currency — Код валюты из справочника ERP
	Currency string `json:"currency"`
	// Source — Канал обращения; manual для ручного заведения
	Source          string  `json:"source"`
	Probability     int64   `json:"probability"`
	ExpectedCloseAt *string `json:"expected_close_at,omitempty"`
	OwnerID         *int64  `json:"owner_id,omitempty"`
	CustomerID      *UUID   `json:"customer_id,omitempty"`
	CRMCustomerID   *UUID   `json:"crm_customer_id,omitempty"`
	NextAction      string  `json:"next_action"`
	NextActionAt    *string `json:"next_action_at,omitempty"`
	ArchivedAt      *string `json:"archived_at,omitempty"`
	ClosedAt        *string `json:"closed_at,omitempty"`
	LossReasonID    *UUID   `json:"loss_reason_id,omitempty"`
	CreatedAt       string  `json:"created_at"`
	UpdatedAt       string  `json:"updated_at"`
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
	// OriginalTotals — Суммы по валютам сделок колонки
	OriginalTotals map[string]int64 `json:"original_totals"`
	// AmountInAccounting — Сумма в валюте учёта; отсутствует при неполном покрытии курсами
	AmountInAccounting   *float64      `json:"amount_in_accounting,omitempty"`
	WeightedInAccounting *float64      `json:"weighted_in_accounting,omitempty"`
	Cards                []CRMDealCard `json:"cards"`
	HasMore              bool          `json:"has_more"`
}

type CRMDealCard struct {
	ID         UUID   `json:"id"`
	PipelineID UUID   `json:"pipeline_id"`
	StageID    UUID   `json:"stage_id"`
	Title      string `json:"title"`
	Amount     int64  `json:"amount"`
	// Currency — Код валюты из справочника ERP
	Currency string `json:"currency"`
	// Source — Канал обращения; manual для ручного заведения
	Source          string  `json:"source"`
	Probability     int64   `json:"probability"`
	ExpectedCloseAt *string `json:"expected_close_at,omitempty"`
	OwnerID         *int64  `json:"owner_id,omitempty"`
	CustomerID      *UUID   `json:"customer_id,omitempty"`
	CRMCustomerID   *UUID   `json:"crm_customer_id,omitempty"`
	NextAction      string  `json:"next_action"`
	NextActionAt    *string `json:"next_action_at,omitempty"`
	ArchivedAt      *string `json:"archived_at,omitempty"`
	ClosedAt        *string `json:"closed_at,omitempty"`
	LossReasonID    *UUID   `json:"loss_reason_id,omitempty"`
	CreatedAt       string  `json:"created_at"`
	UpdatedAt       string  `json:"updated_at"`
	CustomerName    *string `json:"customer_name,omitempty"`
	OwnerName       *string `json:"owner_name,omitempty"`
}

type CRMDealContact struct {
	ID        UUID   `json:"id"`
	DealID    UUID   `json:"deal_id"`
	ContactID UUID   `json:"contact_id"`
	IsPrimary bool   `json:"is_primary"`
	CreatedAt string `json:"created_at"`
}

type CRMDealContactInput struct {
	ContactID UUID  `json:"contact_id"`
	IsPrimary *bool `json:"is_primary,omitempty"`
}

type CRMDealInput struct {
	PipelineID UUID   `json:"pipeline_id"`
	StageID    UUID   `json:"stage_id"`
	Title      string `json:"title"`
	Amount     *int64 `json:"amount,omitempty"`
	// Currency — Обязателен при ненулевой сумме
	Currency        *string `json:"currency,omitempty"`
	Source          *string `json:"source,omitempty"`
	Probability     *int64  `json:"probability,omitempty"`
	ExpectedCloseAt *string `json:"expected_close_at,omitempty"`
	OwnerID         *int64  `json:"owner_id,omitempty"`
	CustomerID      *string `json:"customer_id,omitempty"`
	CRMCustomerID   *string `json:"crm_customer_id,omitempty"`
	NextAction      *string `json:"next_action,omitempty"`
	NextActionAt    *string `json:"next_action_at,omitempty"`
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
	// Price — В тех же единицах, что и сумма сделки
	Price           int64   `json:"price"`
	DiscountPercent float64 `json:"discount_percent"`
	// Total — Сумма строки со скидкой; считает сервер, чтобы клиенты не разошлись на округлении
	Total     int64  `json:"total"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type CRMDealItemInput struct {
	Name            string   `json:"name"`
	ProductID       *string  `json:"product_id,omitempty"`
	Quantity        float64  `json:"quantity"`
	Unit            *string  `json:"unit,omitempty"`
	Price           *int64   `json:"price,omitempty"`
	DiscountPercent *float64 `json:"discount_percent,omitempty"`
}

type CRMDealPatch struct {
	Title           *string `json:"title,omitempty"`
	Amount          *int64  `json:"amount,omitempty"`
	Currency        *string `json:"currency,omitempty"`
	Source          *string `json:"source,omitempty"`
	Probability     *int64  `json:"probability,omitempty"`
	ExpectedCloseAt *string `json:"expected_close_at,omitempty"`
	OwnerID         *int64  `json:"owner_id,omitempty"`
	CustomerID      *string `json:"customer_id,omitempty"`
	CRMCustomerID   *string `json:"crm_customer_id,omitempty"`
	NextAction      *string `json:"next_action,omitempty"`
	NextActionAt    *string `json:"next_action_at,omitempty"`
	Archived        *bool   `json:"archived,omitempty"`
}

type CRMDealStageHistory struct {
	ID          UUID   `json:"id"`
	DealID      UUID   `json:"deal_id"`
	FromStageID *UUID  `json:"from_stage_id,omitempty"`
	ToStageID   UUID   `json:"to_stage_id"`
	ChangedBy   int64  `json:"changed_by"`
	CreatedAt   string `json:"created_at"`
}

type CRMEngagement struct {
	ID         UUID              `json:"id"`
	EntityType string            `json:"entity_type"`
	EntityID   UUID              `json:"entity_id"`
	Kind       CRMEngagementKind `json:"kind"`
	Title      string            `json:"title"`
	DueAt      *string           `json:"due_at,omitempty"`
	// DoneAt — Пусто, пока дело не выполнено
	DoneAt    *string `json:"done_at,omitempty"`
	OwnerID   *int64  `json:"owner_id,omitempty"`
	OwnerName *string `json:"owner_name,omitempty"`
	CreatedBy int64   `json:"created_by"`
	CreatedAt string  `json:"created_at"`
	UpdatedAt string  `json:"updated_at"`
}

type CRMEngagementInput struct {
	Kind  *CRMEngagementKind `json:"kind,omitempty"`
	Title string             `json:"title"`
	DueAt *string            `json:"due_at,omitempty"`
	// OwnerID — По умолчанию - вызывающий сотрудник
	OwnerID *int64 `json:"owner_id,omitempty"`
}

type CRMEngagementKind = string

type CRMEngagementPatch struct {
	Kind    *CRMEngagementKind `json:"kind,omitempty"`
	Title   *string            `json:"title,omitempty"`
	DueAt   *string            `json:"due_at,omitempty"`
	OwnerID *int64             `json:"owner_id,omitempty"`
	// Done — true закрывает дело, false возвращает в работу
	Done *bool `json:"done,omitempty"`
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

type CRMInboxAssignInput struct {
	// AssignedTo — null снимает назначение
	AssignedTo *int64 `json:"assigned_to,omitempty"`
}

type CRMInboxAttachment struct {
	ID          UUID   `json:"id"`
	MessageID   UUID   `json:"message_id"`
	Filename    string `json:"filename"`
	ContentType string `json:"content_type"`
	SizeBytes   int64  `json:"size_bytes"`
	CreatedAt   string `json:"created_at"`
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

type CRMInboxConnectionCheck struct {
	OK        bool    `json:"ok"`
	Status    string  `json:"status"`
	ErrorCode *string `json:"error_code,omitempty"`
}

type CRMInboxConnectionInput struct {
	Name     string `json:"name"`
	Provider string `json:"provider"`
	// Credentials — Поля из каталога провайдера; хранятся зашифрованными
	Credentials map[string]string          `json:"credentials,omitempty"`
	Settings    map[string]json.RawMessage `json:"settings,omitempty"`
	// BotToken — Историческое поле Telegram; равнозначно credentials.bot_token
	BotToken      *string `json:"bot_token,omitempty"`
	WebhookSecret *string `json:"webhook_secret,omitempty"`
}

type CRMInboxConnectionPatch struct {
	Name *string `json:"name,omitempty"`
	// Credentials — Пустое значение сохраняет уже записанный секрет
	Credentials map[string]string          `json:"credentials,omitempty"`
	Settings    map[string]json.RawMessage `json:"settings,omitempty"`
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
	Title      string  `json:"title"`
	PipelineID UUID    `json:"pipeline_id"`
	StageID    UUID    `json:"stage_id"`
	Amount     *int64  `json:"amount,omitempty"`
	Currency   *string `json:"currency,omitempty"`
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
	Provider          string  `json:"provider"`
	ConnectionName    string  `json:"connection_name"`
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
}

type CRMInboxOutboundUpload struct {
	ID             UUID   `json:"id"`
	ConversationID UUID   `json:"conversation_id"`
	Filename       string `json:"filename"`
	ContentType    string `json:"content_type"`
	SizeBytes      int64  `json:"size_bytes"`
	ExpiresAt      string `json:"expires_at"`
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

type CRMInboxSendInput struct {
	Body *string `json:"body,omitempty"`
	// UploadIds — Идентификаторы заранее загруженных файлов
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
	CustomerID          *UUID         `json:"customer_id,omitempty"`
	CRMCustomerID       *UUID         `json:"crm_customer_id,omitempty"`
	NextAction          string        `json:"next_action"`
	NextActionAt        *string       `json:"next_action_at,omitempty"`
	ArchivedAt          *string       `json:"archived_at,omitempty"`
	Status              CRMLeadStatus `json:"status"`
	QualificationReason *string       `json:"qualification_reason,omitempty"`
	RejectReasonID      *UUID         `json:"reject_reason_id,omitempty"`
	ConvertedDealID     *UUID         `json:"converted_deal_id,omitempty"`
	// MergedIntoLeadID — Во что вошло это обращение при слиянии дублей; заполнено только у архивной записи-источника
	MergedIntoLeadID *UUID  `json:"merged_into_lead_id,omitempty"`
	CreatedAt        string `json:"created_at"`
	UpdatedAt        string `json:"updated_at"`
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
	CustomerID          *UUID         `json:"customer_id,omitempty"`
	CRMCustomerID       *UUID         `json:"crm_customer_id,omitempty"`
	NextAction          string        `json:"next_action"`
	NextActionAt        *string       `json:"next_action_at,omitempty"`
	ArchivedAt          *string       `json:"archived_at,omitempty"`
	Status              CRMLeadStatus `json:"status"`
	QualificationReason *string       `json:"qualification_reason,omitempty"`
	RejectReasonID      *UUID         `json:"reject_reason_id,omitempty"`
	ConvertedDealID     *UUID         `json:"converted_deal_id,omitempty"`
	// MergedIntoLeadID — Во что вошло это обращение при слиянии дублей; заполнено только у архивной записи-источника
	MergedIntoLeadID   *UUID             `json:"merged_into_lead_id,omitempty"`
	CreatedAt          string            `json:"created_at"`
	UpdatedAt          string            `json:"updated_at"`
	CustomerName       *string           `json:"customer_name,omitempty"`
	CustomerPhone      *string           `json:"customer_phone,omitempty"`
	CustomerMessengers map[string]string `json:"customer_messengers,omitempty"`
	OwnerName          *string           `json:"owner_name,omitempty"`
	RejectReason       *string           `json:"reject_reason,omitempty"`
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
	CustomerID          *UUID         `json:"customer_id,omitempty"`
	CRMCustomerID       *UUID         `json:"crm_customer_id,omitempty"`
	NextAction          string        `json:"next_action"`
	NextActionAt        *string       `json:"next_action_at,omitempty"`
	ArchivedAt          *string       `json:"archived_at,omitempty"`
	Status              CRMLeadStatus `json:"status"`
	QualificationReason *string       `json:"qualification_reason,omitempty"`
	RejectReasonID      *UUID         `json:"reject_reason_id,omitempty"`
	ConvertedDealID     *UUID         `json:"converted_deal_id,omitempty"`
	// MergedIntoLeadID — Во что вошло это обращение при слиянии дублей; заполнено только у архивной записи-источника
	MergedIntoLeadID   *UUID             `json:"merged_into_lead_id,omitempty"`
	CreatedAt          string            `json:"created_at"`
	UpdatedAt          string            `json:"updated_at"`
	CustomerName       *string           `json:"customer_name,omitempty"`
	CustomerPhone      *string           `json:"customer_phone,omitempty"`
	CustomerMessengers map[string]string `json:"customer_messengers,omitempty"`
	OwnerName          *string           `json:"owner_name,omitempty"`
	RejectReason       *string           `json:"reject_reason,omitempty"`
}

type CRMLeadInput struct {
	Title         string  `json:"title"`
	Source        *string `json:"source,omitempty"`
	Description   *string `json:"description,omitempty"`
	FirstMessage  *string `json:"first_message,omitempty"`
	ContactHandle *string `json:"contact_handle,omitempty"`
	ReferenceID   *string `json:"reference_id,omitempty"`
	OwnerID       *int64  `json:"owner_id,omitempty"`
	CustomerID    *string `json:"customer_id,omitempty"`
	CRMCustomerID *string `json:"crm_customer_id,omitempty"`
	NextAction    *string `json:"next_action,omitempty"`
	NextActionAt  *string `json:"next_action_at,omitempty"`
}

type CRMLeadPatch struct {
	Title         *string `json:"title,omitempty"`
	Source        *string `json:"source,omitempty"`
	Description   *string `json:"description,omitempty"`
	FirstMessage  *string `json:"first_message,omitempty"`
	ContactHandle *string `json:"contact_handle,omitempty"`
	ReferenceID   *string `json:"reference_id,omitempty"`
	OwnerID       *int64  `json:"owner_id,omitempty"`
	CustomerID    *string `json:"customer_id,omitempty"`
	CRMCustomerID *string `json:"crm_customer_id,omitempty"`
	NextAction    *string `json:"next_action,omitempty"`
	NextActionAt  *string `json:"next_action_at,omitempty"`
	Archived      *bool   `json:"archived,omitempty"`
}

type CRMLeadStatus = string

type CRMLossReason struct {
	ID   UUID   `json:"id"`
	Name string `json:"name"`
	// Kind — deal - почему проиграна сделка, lead - почему лид оказался не наш
	Kind      string `json:"kind"`
	IsActive  bool   `json:"is_active"`
	CreatedAt string `json:"created_at"`
}

type CRMLossReasonInput struct {
	Name string  `json:"name"`
	Kind *string `json:"kind,omitempty"`
}

type CRMLossReasonMetric struct {
	ID     *string `json:"id,omitempty"`
	Name   string  `json:"name"`
	Count  int64   `json:"count"`
	Amount int64   `json:"amount"`
}

type CRMManagerWorkload struct {
	OwnerID           int64   `json:"owner_id"`
	OwnerName         *string `json:"owner_name,omitempty"`
	OpenLeads         int64   `json:"open_leads"`
	OpenDeals         int64   `json:"open_deals"`
	OpenConversations int64   `json:"open_conversations"`
	WonDeals          int64   `json:"won_deals"`
	// WonAmount — Выиграно за всё время
	WonAmount int64 `json:"won_amount"`
	LostDeals int64 `json:"lost_deals"`
	// PlanAmount — План на текущий месяц; 0 - план не задан
	PlanAmount *int64 `json:"plan_amount,omitempty"`
	// WonAmountMonth — Закрыто в текущем месяце - с этим и сравнивают план
	WonAmountMonth *int64 `json:"won_amount_month,omitempty"`
}

// CRMMergeLeadsInput — Какие обращения свести в это
type CRMMergeLeadsInput struct {
	// SourceIds — Источники: уходят в архив со ссылкой на цель, их переписка и дела переезжают
	SourceIds []UUID `json:"source_ids"`
}

type CRMMoveDealInput struct {
	StageID UUID `json:"stage_id"`
	// LossReasonID — Обязательна для стадии категории lost
	LossReasonID *string `json:"loss_reason_id,omitempty"`
}

type CRMNoteInput struct {
	Text string `json:"text"`
}

// CRMOverview — Сводка менеджера; «мои» - записи с owner_id текущего пользователя
type CRMOverview struct {
	OpenLeads     []CRMLead             `json:"open_leads"`
	OpenDeals     []CRMDeal             `json:"open_deals"`
	PipelineStats []CRMPipelineOverview `json:"pipeline_stats"`
}

type CRMPipeline struct {
	ID        UUID       `json:"id"`
	Name      string     `json:"name"`
	SortOrder int64      `json:"sort_order"`
	IsDefault bool       `json:"is_default"`
	IsActive  bool       `json:"is_active"`
	Stages    []CRMStage `json:"stages,omitempty"`
	CreatedAt string     `json:"created_at"`
	UpdatedAt string     `json:"updated_at"`
}

type CRMPipelineInput struct {
	Name      string `json:"name"`
	IsDefault *bool  `json:"is_default,omitempty"`
}

type CRMPipelineOverview struct {
	PipelineID   UUID               `json:"pipeline_id"`
	PipelineName string             `json:"pipeline_name"`
	OpenCount    int64              `json:"open_count"`
	OpenAmount   int64              `json:"open_amount"`
	Stages       []CRMStageOverview `json:"stages,omitempty"`
}

type CRMPipelinePatch struct {
	Name      *string `json:"name,omitempty"`
	IsDefault *bool   `json:"is_default,omitempty"`
	IsActive  *bool   `json:"is_active,omitempty"`
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
	Period   string `json:"period"`
	Amount   int64  `json:"amount"`
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
	OwnerID  *int64  `json:"owner_id,omitempty"`
	Amount   int64   `json:"amount"`
	Currency *string `json:"currency,omitempty"`
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
	SortOrder   int64            `json:"sort_order"`
	Category    CRMStageCategory `json:"category"`
	Color       string           `json:"color"`
	Probability int64            `json:"probability"`
	// SLAHours — Норматив пребывания на стадии в часах; 0 - без норматива
	SLAHours       int64              `json:"sla_hours"`
	RequiredFields []CRMRequiredField `json:"required_fields"`
	IsActive       bool               `json:"is_active"`
	CreatedAt      string             `json:"created_at"`
	UpdatedAt      string             `json:"updated_at"`
}

type CRMStageCategory = string

type CRMStageInput struct {
	Name     string            `json:"name"`
	Category *CRMStageCategory `json:"category,omitempty"`
	// Color — Пустое значение подставляет цвет категории
	Color          *string            `json:"color,omitempty"`
	Probability    *int64             `json:"probability,omitempty"`
	SLAHours       *int64             `json:"sla_hours,omitempty"`
	RequiredFields []CRMRequiredField `json:"required_fields,omitempty"`
}

type CRMStageMetric struct {
	PipelineID   string           `json:"pipeline_id"`
	PipelineName string           `json:"pipeline_name"`
	StageID      string           `json:"stage_id"`
	StageName    string           `json:"stage_name"`
	Category     CRMStageCategory `json:"category"`
	Count        int64            `json:"count"`
	Amount       int64            `json:"amount"`
}

type CRMStageOverview struct {
	StageID    UUID             `json:"stage_id"`
	StageName  string           `json:"stage_name"`
	Category   CRMStageCategory `json:"category"`
	DealCount  int64            `json:"deal_count"`
	DealAmount int64            `json:"deal_amount"`
	UpdatedAt  string           `json:"updated_at"`
}

type CRMStagePatch struct {
	Name           *string            `json:"name,omitempty"`
	Category       *CRMStageCategory  `json:"category,omitempty"`
	Color          *string            `json:"color,omitempty"`
	Probability    *int64             `json:"probability,omitempty"`
	SLAHours       *int64             `json:"sla_hours,omitempty"`
	RequiredFields []CRMRequiredField `json:"required_fields,omitempty"`
	IsActive       *bool              `json:"is_active,omitempty"`
}

// CRMTimelineEntry — Одна запись ленты; вид говорит, из какого источника она пришла
type CRMTimelineEntry struct {
	ID UUID `json:"id"`
	// Kind — note - заметка сотрудника, system - системный факт, stage - смена этапа, decision - решение по лиду, message - сообщение канала, link - связь с задачей, событием или встречей
	Kind      string  `json:"kind"`
	At        string  `json:"at"`
	ActorID   *int64  `json:"actor_id,omitempty"`
	ActorName *string `json:"actor_name,omitempty"`
	// Title — Заголовок записи: действие, название этапа, решение или направление сообщения
	Title string                     `json:"title"`
	Body  *string                    `json:"body,omitempty"`
	Meta  map[string]json.RawMessage `json:"meta,omitempty"`
}

type CRMUserRef struct {
	ID          int64   `json:"id"`
	DisplayName string  `json:"display_name"`
	Username    *string `json:"username,omitempty"`
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
	User       int64   `json:"user"`
	UserName   string  `json:"user_name"`
	Email      *string `json:"email,omitempty"`
	Department *string `json:"department,omitempty"`
	Position   *string `json:"position,omitempty"`
	Company    *string `json:"company,omitempty"`
	AvatarURL  *string `json:"avatar_url,omitempty"`
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

type CalendarOAuthCompleteInput struct {
	Code  string `json:"code"`
	State string `json:"state"`
}

type CalendarOAuthStart struct {
	Provider    string  `json:"provider"`
	AuthURL     string  `json:"auth_url"`
	Configured  bool    `json:"configured"`
	RedirectURI *string `json:"redirect_uri,omitempty"`
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

type CalendarPublicBookInput struct {
	// StartsAt — ISO instant либо local datetime в timezone ссылки
	StartsAt   string  `json:"starts_at"`
	GuestName  *string `json:"guest_name,omitempty"`
	GuestEmail *string `json:"guest_email,omitempty"`
	GuestNote  *string `json:"guest_note,omitempty"`
}

type CalendarPublicBookResult struct {
	OK       bool   `json:"ok"`
	StartsAt string `json:"starts_at"`
	EndsAt   string `json:"ends_at"`
	Title    string `json:"title"`
}

type CalendarPublicBookingLink struct {
	Slug             string                       `json:"slug"`
	Title            string                       `json:"title"`
	Description      string                       `json:"description"`
	DurationMin      int64                        `json:"duration_min"`
	Timezone         string                       `json:"timezone"`
	OwnerName        string                       `json:"owner_name"`
	Participants     []CalendarBookingParticipant `json:"participants"`
	ParticipantCount int64                        `json:"participant_count"`
	Company          string                       `json:"company"`
}

type CalendarSettingsEnvelope struct {
	Settings map[string]json.RawMessage `json:"settings"`
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

type CalendarWebPushConfig struct {
	PublicKey  string `json:"public_key"`
	Configured bool   `json:"configured"`
}

type CalendarWebPushSubscription struct {
	Endpoint string  `json:"endpoint"`
	P256dh   string  `json:"p256dh"`
	Auth     string  `json:"auth"`
	Device   *string `json:"device,omitempty"`
}

type CalendarWebPushUnsubscribe struct {
	Endpoint string `json:"endpoint"`
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

type ChatAttachmentPage struct {
	Items []ChatForwardedAttachment `json:"items"`
}

// ChatAttachmentUpload — Один файл на запрос. Ссылка на уже загруженный объект не принимается.
type ChatAttachmentUpload struct {
	// File — Непустой файл до 100 MiB. Содержимое, распознанное как голос, дополнительно ограничено 20 MiB.
	File string `json:"file"`
}

type ChatChangePinResult struct {
	Pin     *ChatMessagePin `json:"pin,omitempty"`
	Changed bool            `json:"changed"`
}

type ChatConversation struct {
	ID               UUID                          `json:"id"`
	Type             string                        `json:"type"`
	Status           string                        `json:"status"`
	Title            string                        `json:"title"`
	Description      string                        `json:"description"`
	LastSeq          int64                         `json:"last_seq"`
	LastMessageID    *UUID                         `json:"last_message_id"`
	LastMessageAt    *string                       `json:"last_message_at"`
	CreatedAt        string                        `json:"created_at"`
	UpdatedAt        string                        `json:"updated_at"`
	Capabilities     *ChatConversationCapabilities `json:"capabilities,omitempty"`
	UnreadCount      int64                         `json:"unread_count"`
	ManualUnreadSeq  *int64                        `json:"manual_unread_seq"`
	NotificationMode string                        `json:"notification_mode"`
	MentionCount     int64                         `json:"mention_count"`
}

// ChatConversationAvatarUpload — Одно изображение на запрос. Ссылка на уже загруженный объект не принимается.
type ChatConversationAvatarUpload struct {
	// File — Непустое изображение до 5 MiB. Распознаются jpeg, png, webp и gif; прочие форматы отвергаются.
	File string `json:"file"`
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

type ChatEditMessage struct {
	// Body — Лимит считается по кодовым точкам Unicode после нормализации переводов строк и обрезки пробелов по краям.
	Body string `json:"body"`
}

type ChatEnsureDirect struct {
	PeerUserID int64 `json:"peer_user_id"`
}

type ChatEnsureDirectResult struct {
	ConversationID UUID `json:"conversation_id"`
	Created        bool `json:"created"`
}

type ChatFolder struct {
	ID       UUID   `json:"id"`
	Name     string `json:"name"`
	Position int64  `json:"position"`
	// Scopes — Разделы всегда возвращаются в порядке direct, group, task независимо от порядка в запросе.
	Scopes                 []string `json:"scopes"`
	IncludeConversationIds []UUID   `json:"include_conversation_ids"`
	ExcludeConversationIds []UUID   `json:"exclude_conversation_ids"`
	CreatedAt              string   `json:"created_at"`
	UpdatedAt              string   `json:"updated_at"`
}

type ChatFolderPage struct {
	Items []ChatFolder `json:"items"`
}

type ChatForwardMessage struct {
	TargetConversationID UUID `json:"target_conversation_id"`
	ClientMessageID      UUID `json:"client_message_id"`
}

type ChatForwardMessageResult struct {
	Message ChatForwardedMessage `json:"message"`
	Created bool                 `json:"created"`
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

type ChatForwardedMessage struct {
	ID                     UUID                      `json:"id"`
	ConversationID         UUID                      `json:"conversation_id"`
	Seq                    int64                     `json:"seq"`
	SenderUserID           *int64                    `json:"sender_user_id"`
	Kind                   string                    `json:"kind"`
	Body                   string                    `json:"body"`
	ReplyToMessageID       *string                   `json:"reply_to_message_id"`
	ForwardedFromMessageID *string                   `json:"forwarded_from_message_id"`
	Mentions               []ChatMessageMention      `json:"mentions"`
	Reactions              []ChatMessageReaction     `json:"reactions"`
	ClientMessageID        *string                   `json:"client_message_id"`
	CreatedAt              string                    `json:"created_at"`
	EditedAt               *string                   `json:"edited_at"`
	DeletedAt              *string                   `json:"deleted_at"`
	Attachments            []ChatForwardedAttachment `json:"attachments"`
}

type ChatMarkAllRead struct {
	// Scope — Раздел списка бесед: user — переписка людей без чатов задач.
	Scope string `json:"scope"`
}

type ChatMarkAllReadResult struct {
	Scope             string `json:"scope"`
	ConversationsRead int64  `json:"conversations_read"`
	MentionsRead      int64  `json:"mentions_read"`
	NotificationsRead int64  `json:"notifications_read"`
}

type ChatMediaUpload struct {
	ClientMessageID UUID   `json:"client_message_id"`
	MediaKind       string `json:"media_kind"`
	// DurationMs — Для video_circle дополнительно действует runtime-лимит 60000 ms.
	DurationMs int64 `json:"duration_ms"`
	// File — audio/mp4, audio/webm или audio/ogg до 12 MiB либо video/mp4/video/quicktime до 40 MiB
	File string `json:"file"`
}

type ChatMember struct {
	UserID      int64  `json:"user_id"`
	DisplayName string `json:"display_name"`
	AvatarURL   string `json:"avatar_url"`
	Role        string `json:"role"`
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
	ID              UUID                 `json:"id"`
	ConversationID  UUID                 `json:"conversation_id"`
	Seq             int64                `json:"seq"`
	SenderUserID    *int64               `json:"sender_user_id"`
	Kind            string               `json:"kind"`
	Body            string               `json:"body"`
	Mentions        []ChatMessageMention `json:"mentions"`
	ClientMessageID *UUID                `json:"client_message_id"`
	CreatedAt       string               `json:"created_at"`
	Attachments     []ChatAttachment     `json:"attachments"`
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

type ChatMessagePin struct {
	Message  ChatForwardedMessage `json:"message"`
	PinnedBy int64                `json:"pinned_by"`
	PinnedAt string               `json:"pinned_at"`
}

type ChatMessagePinPage struct {
	Items []ChatMessagePin `json:"items"`
}

type ChatMessageReaction struct {
	Emoji string `json:"emoji"`
	Count int64  `json:"count"`
	IsOwn bool   `json:"is_own"`
}

type ChatMobileDeviceRegistration struct {
	DeviceID string `json:"device_id"`
	// Platform — Платформа APNs-клиента. Если поле не передано, используется ios для обратной совместимости.
	Platform      *string `json:"platform,omitempty"`
	PushToken     string  `json:"push_token"`
	BundleID      string  `json:"bundle_id"`
	Environment   string  `json:"environment"`
	Locale        *string `json:"locale,omitempty"`
	Timezone      *string `json:"timezone,omitempty"`
	DeviceName    *string `json:"device_name,omitempty"`
	AppVersion    *string `json:"app_version,omitempty"`
	SystemVersion *string `json:"system_version,omitempty"`
	// Preview — Показывать текст сообщения в уведомлении. Поле отсутствует — уведомление полное.
	Preview *bool `json:"preview,omitempty"`
	// Sound — Звук уведомления. Поле отсутствует — со звуком.
	Sound *bool `json:"sound,omitempty"`
}

type ChatMobileDeviceRegistrationState struct {
	Enabled bool `json:"enabled"`
}

type ChatMobilePushTestResult struct {
	Delivered int64 `json:"delivered"`
}

type ChatNotificationModeInput struct {
	Mode string `json:"mode"`
}

type ChatNotificationModeResult struct {
	Mode    string `json:"mode"`
	Changed bool   `json:"changed"`
}

type ChatPeoplePage struct {
	Items []ChatPerson `json:"items"`
}

type ChatPerson struct {
	UserID      int64  `json:"user_id"`
	DisplayName string `json:"display_name"`
	AvatarURL   string `json:"avatar_url"`
	IsSelf      bool   `json:"is_self"`
}

type ChatReactionResult struct {
	MessageID UUID `json:"message_id"`
	// Reactions — Сводка по сообщению целиком, по одной строке на эмодзи.
	Reactions []ChatMessageReaction `json:"reactions"`
	Changed   bool                  `json:"changed"`
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

// ChatSaveFolder — Нужен непустой name и хотя бы один scope или один include_conversation_ids, иначе 400.
type ChatSaveFolder struct {
	Name     string `json:"name"`
	Position *int64 `json:"position,omitempty"`
	// Scopes — Повтор раздела отвергается.
	Scopes                 []string `json:"scopes,omitempty"`
	IncludeConversationIds []UUID   `json:"include_conversation_ids,omitempty"`
	ExcludeConversationIds []UUID   `json:"exclude_conversation_ids,omitempty"`
}

type ChatSendMessage struct {
	// ClientMessageID — Ключ идемпотентности отправки. Уникален в пределах беседы и отправителя: повтор с тем же ключом не заводит второе сообщение, а возвращает уже отправленное. Заголовок Idempotency-Key эта операция не читает
	ClientMessageID map[string]json.RawMessage `json:"client_message_id"`
	// Body — Предел считается в кодовых точках, а не в байтах: сервер режет по 10 000 кодовых точек
	Body           string  `json:"body"`
	MentionUserIds []int64 `json:"mention_user_ids,omitempty"`
}

type ChatSendMessageResult struct {
	Message ChatMessage `json:"message"`
	Created bool        `json:"created"`
}

type ChatSetReaction struct {
	// Emoji — Закрытый список допустимых реакций.
	Emoji string `json:"emoji"`
}

type ChatUnreadMention struct {
	MessageID UUID  `json:"message_id"`
	Seq       int64 `json:"seq"`
}

type ChatUnreadMentionPage struct {
	Items []ChatUnreadMention `json:"items"`
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

type CoreAccountingPeriodClose struct {
	ClosedThrough string   `json:"closed_through"`
	Reason        *string  `json:"reason,omitempty"`
	Forced        *bool    `json:"forced,omitempty"`
	Warnings      []string `json:"warnings,omitempty"`
}

type CoreAccountingPeriodEvent struct {
	ID     UUID   `json:"id"`
	Action string `json:"action"`
	// ClosedThrough — Empty means fully reopened
	ClosedThrough string   `json:"closed_through"`
	ActorUserID   int64    `json:"actor_user_id"`
	ActorName     string   `json:"actor_name"`
	HappenedAt    string   `json:"happened_at"`
	Reason        string   `json:"reason"`
	Forced        bool     `json:"forced"`
	Warnings      []string `json:"warnings"`
}

type CoreAccountingPeriodReopen struct {
	// ClosedThrough — Earlier date or empty to reopen fully
	ClosedThrough string `json:"closed_through"`
	Reason        string `json:"reason"`
}

type CoreAccountingPeriodState struct {
	// ClosedThrough — Empty means accounting is open
	ClosedThrough string                      `json:"closed_through"`
	History       []CoreAccountingPeriodEvent `json:"history"`
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

type CoreBulkResult struct {
	Updated int64 `json:"updated"`
}

type CoreBusiness struct {
	ID       UUID   `json:"id"`
	Name     string `json:"name"`
	IsActive bool   `json:"is_active"`
}

type CoreBusinessInput struct {
	Name string `json:"name"`
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

type CoreCabinetPreferences struct {
	Locale       string `json:"locale"`
	Timezone     string `json:"timezone"`
	DateFormat   string `json:"date_format"`
	NumberFormat string `json:"number_format"`
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
	ID          UUID                       `json:"id"`
	Name        string                     `json:"name"`
	Kind        CoreContactKind            `json:"kind"`
	IsCustomer  bool                       `json:"is_customer"`
	IsSupplier  bool                       `json:"is_supplier"`
	FolderID    *UUID                      `json:"folder_id"`
	EntityType  CoreContactEntityType      `json:"entity_type"`
	LegalName   string                     `json:"legal_name"`
	Phone       string                     `json:"phone"`
	Email       string                     `json:"email"`
	Position    string                     `json:"position"`
	Tags        []json.RawMessage          `json:"tags"`
	Messengers  map[string]json.RawMessage `json:"messengers"`
	Source      string                     `json:"source"`
	INN         string                     `json:"inn"`
	KPP         string                     `json:"kpp"`
	Ogrn        string                     `json:"ogrn"`
	Address     string                     `json:"address"`
	BankName    string                     `json:"bank_name"`
	BankBIC     string                     `json:"bank_bic"`
	BankAccount string                     `json:"bank_account"`
	ExternalID  string                     `json:"external_id"`
	Custom      map[string]json.RawMessage `json:"custom"`
	IsActive    bool                       `json:"is_active"`
	CreatedAt   string                     `json:"created_at"`
	UpdatedAt   string                     `json:"updated_at"`
}

type CoreContactBulkPatch struct {
	Ids        []UUID `json:"ids"`
	FolderID   *UUID  `json:"folder_id,omitempty"`
	IsCustomer *bool  `json:"is_customer,omitempty"`
	IsSupplier *bool  `json:"is_supplier,omitempty"`
}

type CoreContactCreate struct {
	Name        string                     `json:"name"`
	Kind        *CoreContactKind           `json:"kind,omitempty"`
	EntityType  *CoreContactEntityType     `json:"entity_type,omitempty"`
	LegalName   *string                    `json:"legal_name,omitempty"`
	Phone       *string                    `json:"phone,omitempty"`
	Email       *string                    `json:"email,omitempty"`
	Position    *string                    `json:"position,omitempty"`
	Tags        []json.RawMessage          `json:"tags,omitempty"`
	Messengers  map[string]json.RawMessage `json:"messengers,omitempty"`
	Source      *string                    `json:"source,omitempty"`
	INN         *string                    `json:"inn,omitempty"`
	KPP         *string                    `json:"kpp,omitempty"`
	Ogrn        *string                    `json:"ogrn,omitempty"`
	Address     *string                    `json:"address,omitempty"`
	BankName    *string                    `json:"bank_name,omitempty"`
	BankBIC     *string                    `json:"bank_bic,omitempty"`
	BankAccount *string                    `json:"bank_account,omitempty"`
	ExternalID  *string                    `json:"external_id,omitempty"`
	Custom      map[string]json.RawMessage `json:"custom,omitempty"`
}

type CoreContactEntityType = string

type CoreContactKind = string

type CoreContactPage struct {
	Count   int64         `json:"count"`
	Results []CoreContact `json:"results"`
}

type CoreContactPatch struct {
	Name        *string                    `json:"name,omitempty"`
	Kind        *CoreContactKind           `json:"kind,omitempty"`
	EntityType  *CoreContactEntityType     `json:"entity_type,omitempty"`
	LegalName   *string                    `json:"legal_name,omitempty"`
	Phone       *string                    `json:"phone,omitempty"`
	Email       *string                    `json:"email,omitempty"`
	Position    *string                    `json:"position,omitempty"`
	Tags        []json.RawMessage          `json:"tags,omitempty"`
	Messengers  map[string]json.RawMessage `json:"messengers,omitempty"`
	Source      *string                    `json:"source,omitempty"`
	INN         *string                    `json:"inn,omitempty"`
	KPP         *string                    `json:"kpp,omitempty"`
	Ogrn        *string                    `json:"ogrn,omitempty"`
	Address     *string                    `json:"address,omitempty"`
	BankName    *string                    `json:"bank_name,omitempty"`
	BankBIC     *string                    `json:"bank_bic,omitempty"`
	BankAccount *string                    `json:"bank_account,omitempty"`
	ExternalID  *string                    `json:"external_id,omitempty"`
	Custom      map[string]json.RawMessage `json:"custom,omitempty"`
	IsCustomer  *bool                      `json:"is_customer,omitempty"`
	IsSupplier  *bool                      `json:"is_supplier,omitempty"`
	FolderID    *UUID                      `json:"folder_id,omitempty"`
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

type CoreCurrencyRateInput struct {
	CurrencyCode string `json:"currency_code"`
	BaseCode     string `json:"base_code"`
	// Rate — Positive decimal string; comma or dot accepted
	Rate      string                     `json:"rate"`
	Nominal   *int64                     `json:"nominal,omitempty"`
	ValidFrom string                     `json:"valid_from"`
	Source    *CoreCurrencyRateSourceKey `json:"source,omitempty"`
	Reason    *string                    `json:"reason,omitempty"`
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

type CoreDictionaryUpdate struct {
	Name        string  `json:"name"`
	Description *string `json:"description,omitempty"`
	AllowTree   *bool   `json:"allow_tree,omitempty"`
	FolderID    *UUID   `json:"folder_id,omitempty"`
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

type CoreDocumentTypePatch struct {
	Name           *string                    `json:"name,omitempty"`
	NumberTemplate *string                    `json:"number_template,omitempty"`
	NumberReset    *CoreNumberReset           `json:"number_reset,omitempty"`
	Settings       map[string]json.RawMessage `json:"settings,omitempty"`
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
	Phone             string  `json:"phone"`
	Email             string  `json:"email"`
	UserID            *int64  `json:"user_id"`
	Username          string  `json:"username"`
	RoleName          string  `json:"role_name"`
	// EmployedAt — Date or empty string
	EmployedAt string `json:"employed_at"`
	IsActive   bool   `json:"is_active"`
	Notes      string `json:"notes"`
	HasPhoto   bool   `json:"has_photo"`
	CreatedAt  string `json:"created_at"`
	UpdatedAt  string `json:"updated_at"`
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

type CoreEmployeeEquipment struct {
	ID           UUID   `json:"id"`
	EmployeeID   UUID   `json:"employee_id"`
	EmployeeName string `json:"employee_name"`
	Name         string `json:"name"`
	InventoryNo  string `json:"inventory_no"`
	Status       string `json:"status"`
	// AssignedAt — Date or empty string
	AssignedAt string `json:"assigned_at"`
	// ReturnedAt — Date or empty string
	ReturnedAt string `json:"returned_at"`
	Notes      string `json:"notes"`
	CreatedAt  string `json:"created_at"`
	UpdatedAt  string `json:"updated_at"`
}

type CoreEmployeeEquipmentInput struct {
	EmployeeID  UUID    `json:"employee_id"`
	Name        string  `json:"name"`
	InventoryNo *string `json:"inventory_no,omitempty"`
	Status      string  `json:"status"`
	AssignedAt  *string `json:"assigned_at,omitempty"`
	ReturnedAt  *string `json:"returned_at,omitempty"`
	Notes       *string `json:"notes,omitempty"`
}

type CoreEmployeeEquipmentPage struct {
	Count   int64                   `json:"count"`
	Results []CoreEmployeeEquipment `json:"results"`
}

type CoreEmployeeLifecycleKind = string

type CoreEmployeeLifecycleTemplate struct {
	ID        UUID                      `json:"id"`
	Kind      CoreEmployeeLifecycleKind `json:"kind"`
	Name      string                    `json:"name"`
	Checklist []string                  `json:"checklist"`
	IsActive  bool                      `json:"is_active"`
	CreatedAt string                    `json:"created_at"`
	UpdatedAt string                    `json:"updated_at"`
}

type CoreEmployeeLifecycleTemplateInput struct {
	Kind      CoreEmployeeLifecycleKind `json:"kind"`
	Name      string                    `json:"name"`
	Checklist []string                  `json:"checklist"`
	IsActive  *bool                     `json:"is_active,omitempty"`
}

type CoreEmployeeLifecycleTemplatePage struct {
	Count   int64                           `json:"count"`
	Results []CoreEmployeeLifecycleTemplate `json:"results"`
}

type CoreEmployeePage struct {
	Count int64 `json:"count"`
	// Limit — Применённый размер страницы — после зажима до потолка
	Limit int64 `json:"limit"`
	// Offset — Применённое смещение
	Offset  int64          `json:"offset"`
	Results []CoreEmployee `json:"results"`
}

type CoreEmployeePatch struct {
	FullName          *string `json:"full_name,omitempty"`
	FirstName         *string `json:"first_name,omitempty"`
	LastName          *string `json:"last_name,omitempty"`
	MiddleName        *string `json:"middle_name,omitempty"`
	Position          *string `json:"position,omitempty"`
	PositionID        *string `json:"position_id,omitempty"`
	CompanyID         *string `json:"company_id,omitempty"`
	Department        *string `json:"department,omitempty"`
	Location          *string `json:"location,omitempty"`
	Phone             *string `json:"phone,omitempty"`
	Email             *string `json:"email,omitempty"`
	UserID            *int64  `json:"user_id,omitempty"`
	ManagerEmployeeID *string `json:"manager_employee_id,omitempty"`
	EmployedAt        *string `json:"employed_at,omitempty"`
	IsActive          *bool   `json:"is_active,omitempty"`
	Notes             *string `json:"notes,omitempty"`
}

type CoreExternalContactCandidate struct {
	ExternalID   string `json:"external_id"`
	ExternalName string `json:"external_name"`
	INN          string `json:"inn"`
	KPP          string `json:"kpp"`
}

type CoreExternalContactMatchOption struct {
	ID   UUID   `json:"id"`
	Name string `json:"name"`
	KPP  string `json:"kpp"`
}

type CoreExternalContactMatchOutcome = string

type CoreExternalContactMatchReport struct {
	Summary CoreExternalContactMatchSummary  `json:"summary"`
	Results []CoreExternalContactMatchResult `json:"results"`
}

type CoreExternalContactMatchRequest struct {
	SourceSystem string                         `json:"source_system"`
	SourceRef    *string                        `json:"source_ref,omitempty"`
	ExternalKind string                         `json:"external_kind"`
	Candidates   []CoreExternalContactCandidate `json:"candidates"`
}

type CoreExternalContactMatchResult struct {
	Candidate CoreExternalContactCandidate     `json:"candidate"`
	Outcome   CoreExternalContactMatchOutcome  `json:"outcome"`
	ContactID *string                          `json:"contact_id"`
	Notes     []string                         `json:"notes"`
	Options   []CoreExternalContactMatchOption `json:"options"`
}

type CoreExternalContactMatchSummary struct {
	Total         int64 `json:"total"`
	Matched       int64 `json:"matched"`
	Ambiguous     int64 `json:"ambiguous"`
	NotFound      int64 `json:"not_found"`
	NoINN         int64 `json:"no_inn"`
	InvalidINN    int64 `json:"invalid_inn"`
	Rejected      int64 `json:"rejected"`
	AlreadyLinked int64 `json:"already_linked"`
	NoExternalID  int64 `json:"no_external_id"`
}

type CoreExternalRef struct {
	ID           UUID                       `json:"id"`
	SourceSystem string                     `json:"source_system"`
	SourceRef    string                     `json:"source_ref"`
	ExternalKind string                     `json:"external_kind"`
	ExternalID   string                     `json:"external_id"`
	ExternalName string                     `json:"external_name"`
	EntityType   CoreExternalRefEntityType  `json:"entity_type"`
	EntityID     *string                    `json:"entity_id"`
	MatchSource  CoreExternalRefMatchSource `json:"match_source"`
	DecidedAt    *string                    `json:"decided_at,omitempty"`
	CreatedAt    string                     `json:"created_at"`
	UpdatedAt    string                     `json:"updated_at"`
}

type CoreExternalRefEntityType = string

type CoreExternalRefInput struct {
	// SourceSystem — Known value onec or another stable integration key
	SourceSystem string `json:"source_system"`
	// SourceRef — Concrete connection or export namespace
	SourceRef    *string                     `json:"source_ref,omitempty"`
	ExternalKind string                      `json:"external_kind"`
	ExternalID   string                      `json:"external_id"`
	ExternalName *string                     `json:"external_name,omitempty"`
	EntityType   CoreExternalRefEntityType   `json:"entity_type"`
	EntityID     *string                     `json:"entity_id,omitempty"`
	MatchSource  *CoreExternalRefMatchSource `json:"match_source,omitempty"`
}

type CoreExternalRefLinkRequest struct {
	EntityID UUID `json:"entity_id"`
}

type CoreExternalRefMatchSource = string

type CoreExternalRefPage struct {
	Count   int64             `json:"count"`
	Results []CoreExternalRef `json:"results"`
}

type CoreExternalRefRememberRequest = json.RawMessage

type CoreExternalRefResolveRequest struct {
	SourceSystem string   `json:"source_system"`
	SourceRef    *string  `json:"source_ref,omitempty"`
	ExternalKind string   `json:"external_kind"`
	ExternalIds  []string `json:"external_ids"`
}

type CoreExternalRefResolveResult struct {
	Count   int64             `json:"count"`
	Matches map[string]string `json:"matches"`
}

type CoreFolder struct {
	ID        UUID                       `json:"id"`
	Scope     CoreFolderScope            `json:"scope"`
	ParentID  *UUID                      `json:"parent_id"`
	Name      string                     `json:"name"`
	Defaults  map[string]json.RawMessage `json:"defaults"`
	SortOrder int64                      `json:"sort_order"`
	ItemCount int64                      `json:"item_count"`
}

type CoreFolderInput struct {
	Scope     CoreFolderScope            `json:"scope"`
	ParentID  *UUID                      `json:"parent_id,omitempty"`
	Name      string                     `json:"name"`
	Defaults  map[string]json.RawMessage `json:"defaults,omitempty"`
	SortOrder *int64                     `json:"sort_order,omitempty"`
}

type CoreFolderPage struct {
	Count   int64        `json:"count"`
	Results []CoreFolder `json:"results"`
}

type CoreFolderScope = string

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

type CoreGLAccountPatch struct {
	Name            *string `json:"name,omitempty"`
	ParentID        *UUID   `json:"parent_id,omitempty"`
	IsActive        *bool   `json:"is_active,omitempty"`
	AffectsCashflow *bool   `json:"affects_cashflow,omitempty"`
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

type CoreGLOpeningImport struct {
	ID          UUID                      `json:"id"`
	Status      CoreGLOpeningImportStatus `json:"status"`
	Format      CoreProductTransferFormat `json:"format"`
	SourceName  string                    `json:"source_name"`
	SourceSize  int64                     `json:"source_size"`
	ReportTitle string                    `json:"report_title"`
	HasOpening  bool                      `json:"has_opening"`
	HasClosing  bool                      `json:"has_closing"`
	DocumentID  *string                   `json:"document_id"`
	CreatedAt   string                    `json:"created_at"`
	AppliedAt   *string                   `json:"applied_at,omitempty"`
	Rows        []CoreGLOpeningImportRow  `json:"rows"`
	Warnings    []CoreGLOpeningWarning    `json:"warnings"`
}

type CoreGLOpeningImportAppliedRequest struct {
	DocumentID UUID `json:"document_id"`
}

type CoreGLOpeningImportPage struct {
	Count   int64                 `json:"count"`
	Results []CoreGLOpeningImport `json:"results"`
}

type CoreGLOpeningImportRow struct {
	Line     int64   `json:"line"`
	Code     string  `json:"code"`
	Name     string  `json:"name"`
	Subconto *string `json:"subconto,omitempty"`
	// OpeningDebit — Decimal string without float conversion
	OpeningDebit string `json:"opening_debit"`
	// OpeningCredit — Decimal string without float conversion
	OpeningCredit string `json:"opening_credit"`
	// ClosingDebit — Decimal string without float conversion
	ClosingDebit string `json:"closing_debit"`
	// ClosingCredit — Decimal string without float conversion
	ClosingCredit string              `json:"closing_credit"`
	AccountID     *string             `json:"account_id"`
	AccountCode   string              `json:"account_code"`
	AccountName   string              `json:"account_name"`
	OpeningInput  string              `json:"opening_input"`
	Match         CoreGLOpeningMatch  `json:"match"`
	Notes         []CoreGLOpeningNote `json:"notes"`
	ContactID     *string             `json:"contact_id,omitempty"`
	ContactName   *string             `json:"contact_name,omitempty"`
	EmployeeID    *string             `json:"employee_id,omitempty"`
	EmployeeName  *string             `json:"employee_name,omitempty"`
}

type CoreGLOpeningImportStatus = string

type CoreGLOpeningMatch = string

type CoreGLOpeningNote = string

type CoreGLOpeningWarning = string

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
	PNLSign             *int64  `json:"pnl_sign,omitempty"`
	IsSystem            bool    `json:"is_system"`
	PNLParentID         *UUID   `json:"pnl_parent_id,omitempty"`
	PNLSortOrder        int64   `json:"pnl_sort_order"`
	UsageCount          int64   `json:"usage_count"`
}

type CoreItemInput struct {
	Code              *string `json:"code,omitempty"`
	Name              string  `json:"name"`
	UseCashflow       *bool   `json:"use_cashflow,omitempty"`
	CashflowSection   *string `json:"cashflow_section,omitempty"`
	CashflowParentID  *UUID   `json:"cashflow_parent_id,omitempty"`
	CashflowSortOrder *int64  `json:"cashflow_sort_order,omitempty"`
	UsePNL            *bool   `json:"use_pnl,omitempty"`
	PNLSign           *int64  `json:"pnl_sign,omitempty"`
	PNLParentID       *UUID   `json:"pnl_parent_id,omitempty"`
	PNLSortOrder      *int64  `json:"pnl_sort_order,omitempty"`
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

type CoreNumberReset = string

type CoreNumberSource = string

type CoreObjectUsage struct {
	Blocked bool                 `json:"blocked"`
	Rows    []CoreObjectUsageRow `json:"rows"`
	Message string               `json:"message"`
}

type CoreObjectUsageRow struct {
	Source string `json:"source"`
	Key    string `json:"key"`
	Name   string `json:"name"`
	Count  int64  `json:"count"`
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
}

type CoreProductBulkPatch struct {
	Ids           []UUID `json:"ids"`
	FolderID      *UUID  `json:"folder_id,omitempty"`
	IsSellable    *bool  `json:"is_sellable,omitempty"`
	IsStockable   *bool  `json:"is_stockable,omitempty"`
	IsPurchasable *bool  `json:"is_purchasable,omitempty"`
	IsProducible  *bool  `json:"is_producible,omitempty"`
}

type CoreProductCreate struct {
	SKU             *string                    `json:"sku,omitempty"`
	Name            string                     `json:"name"`
	Unit            *string                    `json:"unit,omitempty"`
	UnitID          *UUID                      `json:"unit_id,omitempty"`
	Price           *string                    `json:"price,omitempty"`
	ExternalID      *string                    `json:"external_id,omitempty"`
	Kind            *CoreProductKind           `json:"kind,omitempty"`
	IsSellable      *bool                      `json:"is_sellable,omitempty"`
	IsStockable     *bool                      `json:"is_stockable,omitempty"`
	IsPurchasable   *bool                      `json:"is_purchasable,omitempty"`
	IsProducible    *bool                      `json:"is_producible,omitempty"`
	CategoryID      *UUID                      `json:"category_id,omitempty"`
	RecordKind      *CoreProductRecordKind     `json:"record_kind,omitempty"`
	ParentProductID *UUID                      `json:"parent_product_id,omitempty"`
	Custom          map[string]json.RawMessage `json:"custom,omitempty"`
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
}

type CoreProductFieldSchema struct {
	Fields []CoreProductFieldDefinition `json:"fields"`
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
	// SourceRef — Required for article kinds; optional for barcode
	SourceRef *string                    `json:"source_ref,omitempty"`
	Value     string                     `json:"value"`
	IsPrimary *bool                      `json:"is_primary,omitempty"`
	Attrs     map[string]json.RawMessage `json:"attrs,omitempty"`
}

type CoreProductIdentifierKind = string

type CoreProductIdentifierPage struct {
	Count   int64                   `json:"count"`
	Results []CoreProductIdentifier `json:"results"`
}

type CoreProductIdentifierPatch struct {
	Kind      *CoreProductIdentifierKind `json:"kind,omitempty"`
	SourceRef *string                    `json:"source_ref,omitempty"`
	Value     *string                    `json:"value,omitempty"`
	IsPrimary *bool                      `json:"is_primary,omitempty"`
	Attrs     map[string]json.RawMessage `json:"attrs,omitempty"`
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

type CoreProductImportUploadSession struct {
	FileID UUID `json:"file_id"`
	// UploadURL — Относительный защищённый API URL
	UploadURL             string            `json:"upload_url"`
	Method                string            `json:"method"`
	Headers               map[string]string `json:"headers"`
	MaxBytes              json.RawMessage   `json:"max_bytes"`
	ExpiresAt             string            `json:"expires_at"`
	RequiresAuthorization string            `json:"requires_authorization"`
}

type CoreProductImportUploadSessionRequest struct {
	Kind CoreProductTransferKind `json:"kind"`
	Mode CoreProductImportMode   `json:"mode"`
	// Filename — Имя с расширением xlsx, xls, ods, csv или tsv
	Filename string `json:"filename"`
	Size     int64  `json:"size"`
}

type CoreProductKind = string

type CoreProductPage struct {
	Count   int64         `json:"count"`
	Results []CoreProduct `json:"results"`
}

type CoreProductPatch struct {
	SKU           *string          `json:"sku,omitempty"`
	Name          *string          `json:"name,omitempty"`
	Unit          *string          `json:"unit,omitempty"`
	UnitID        *UUID            `json:"unit_id,omitempty"`
	Price         *string          `json:"price,omitempty"`
	ExternalID    *string          `json:"external_id,omitempty"`
	Kind          *CoreProductKind `json:"kind,omitempty"`
	IsSellable    *bool            `json:"is_sellable,omitempty"`
	IsStockable   *bool            `json:"is_stockable,omitempty"`
	IsPurchasable *bool            `json:"is_purchasable,omitempty"`
	IsProducible  *bool            `json:"is_producible,omitempty"`
	CategoryID    *UUID            `json:"category_id,omitempty"`
	FolderID      *UUID            `json:"folder_id,omitempty"`
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

type CoreRegisterPatch struct {
	Name       *string                 `json:"name,omitempty"`
	Dimensions []CoreRegisterDimension `json:"dimensions,omitempty"`
	Resources  []CoreRegisterResource  `json:"resources,omitempty"`
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

type CoreTrialBalance struct {
	DateFrom string                 `json:"date_from"`
	DateTo   string                 `json:"date_to"`
	Currency string                 `json:"currency"`
	Rows     []CoreTrialBalanceRow  `json:"rows"`
	Totals   CoreTrialBalanceTotals `json:"totals"`
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

type CoreUIState struct {
	Screens map[string]json.RawMessage `json:"screens"`
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

type DeveloperProfile struct {
	Account     DeveloperAccount      `json:"account"`
	Application *DeveloperApplication `json:"application,omitempty"`
	// Publishers — Издатели, которыми распоряжается аккаунт
	Publishers []PlatformAppPublisher `json:"publishers"`
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

type FinanceAccount struct {
	ID                   UUID    `json:"id"`
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
}

type FinanceBalanceSection struct {
	Key   string               `json:"key"`
	Label string               `json:"label"`
	Total string               `json:"total"`
	Items []FinanceBalanceItem `json:"items"`
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
	// Employee — Идентификатор ответственного; пустая строка снимает ответственного
	Employee *string `json:"employee,omitempty"`
	// Contact — Идентификатор собственника; пустая строка снимает собственника
	Contact *string `json:"contact,omitempty"`
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
	From             string                   `json:"from"`
	To               string                   `json:"to"`
	Inflow           string                   `json:"inflow"`
	Outflow          string                   `json:"outflow"`
	UncategorizedNet string                   `json:"uncategorized_net"`
	NetCashFlow      string                   `json:"net_cash_flow"`
	TransferIn       string                   `json:"transfer_in"`
	TransferOut      string                   `json:"transfer_out"`
	Sections         []FinanceCashflowSection `json:"sections"`
	Columns          []FinanceReportColumn    `json:"columns"`
}

type FinanceCashflowSection struct {
	Key   string                `json:"key"`
	Label string                `json:"label"`
	Net   string                `json:"net"`
	Items []FinanceCashflowItem `json:"items"`
}

// FinanceClassificationSuggestion — Мнение внешнего расширения о том, какой статьёй разнести операцию. Классификацией не является: пока человек не принял её штатной командой, в отчётах операции нет.
type FinanceClassificationSuggestion struct {
	ID          UUID `json:"id"`
	Transaction UUID `json:"transaction"`
	// Installation — Установка-автор. Человек обязан видеть, чьё это мнение — иначе совет выглядит выводом самой Akeda
	Installation map[string]json.RawMessage `json:"installation"`
	// App — Пространство имён приложения: app.<издатель>.<ключ>
	App              string  `json:"app"`
	AppVersion       string  `json:"app_version"`
	CashflowItem     UUID    `json:"cashflow_item"`
	CashflowItemName *string `json:"cashflow_item_name"`
	Contact          *string `json:"contact"`
	ContactName      *string `json:"contact_name"`
	// Confidence — Уверенность долей единицы, decimal string; проценты не принимаются
	Confidence    string `json:"confidence"`
	ExplanationRu string `json:"explanation_ru"`
	// ExplanationEn — Объяснение локализует сам разработчик расширения; обе половины обязательны
	ExplanationEn string  `json:"explanation_en"`
	Status        string  `json:"status"`
	DecidedAt     *string `json:"decided_at"`
	CreatedAt     string  `json:"created_at"`
	UpdatedAt     string  `json:"updated_at"`
}

type FinanceCommercialPosition struct {
	Terms    FinanceCounterpartyTerms  `json:"terms"`
	Exposure FinanceSettlementExposure `json:"exposure"`
}

type FinanceCompanyMatch struct {
	Status     string                    `json:"status"`
	INN        string                    `json:"inn"`
	Company    *FinanceDirectoryCompany  `json:"company"`
	OwnerName  string                    `json:"owner_name"`
	Suggestion *FinanceCompanySuggestion `json:"suggestion"`
	Message    string                    `json:"message"`
}

type FinanceCompanyMatchError struct {
	Detail       string              `json:"detail"`
	CompanyMatch FinanceCompanyMatch `json:"company_match"`
}

type FinanceCompanySuggestion struct {
	Name      string `json:"name"`
	LegalName string `json:"legal_name"`
	INN       string `json:"inn"`
	KPP       string `json:"kpp"`
	Address   string `json:"address"`
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
	// LastError — The provider's own words and nothing else — what the cabinet user can act on ("consent expired", "certificate revoked"). Empty when the failure was ours: an internal cause never reaches this field, it is logged and named by last_error_code instead.
	LastError string `json:"last_error"`
	// LastErrorCode — Machine code of the last failure, translated by the client. Present because the text is stored: it is written in whatever locale the background sync happened to run in, and only a finite code can be rendered in the reader's language.
	LastErrorCode  string `json:"last_error_code"`
	AccountsTotal  int64  `json:"accounts_total"`
	AccountsLinked int64  `json:"accounts_linked"`
	CreatedAt      string `json:"created_at"`
	UpdatedAt      string `json:"updated_at"`
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

type FinanceConnectorConsent struct {
	AuthURL string `json:"auth_url"`
}

type FinanceConnectorCreate struct {
	Provider    FinanceConnectorProviderKey `json:"provider"`
	DisplayName *string                     `json:"display_name,omitempty"`
	CompanyName *string                     `json:"company_name,omitempty"`
	Company     *string                     `json:"company,omitempty"`
	// Credential — Банковский токен либо JSON с client_id/client_secret; никогда не передаётся через MCP
	Credential      *string `json:"credential,omitempty"`
	ImportDepthDays *int64  `json:"import_depth_days,omitempty"`
	OverlapDays     *int64  `json:"overlap_days,omitempty"`
}

type FinanceConnectorCredentialTestInput struct {
	Provider   FinanceConnectorProviderKey `json:"provider"`
	Credential string                      `json:"credential"`
}

type FinanceConnectorCredentialTestResult struct {
	OK           bool                 `json:"ok"`
	Message      string               `json:"message"`
	Accounts     int64                `json:"accounts"`
	CompanyMatch *FinanceCompanyMatch `json:"company_match,omitempty"`
}

type FinanceConnectorMTLSInput struct {
	// Certificate — PEM-сертификат клиента
	Certificate string `json:"certificate"`
	// PrivateKey — PEM-закрытый ключ; в ответах и журналах отсутствует
	PrivateKey string `json:"private_key"`
}

type FinanceConnectorMTLSStatus struct {
	Configured bool    `json:"configured"`
	ExpiresAt  *string `json:"expires_at,omitempty"`
	Warning    *string `json:"warning,omitempty"`
}

type FinanceConnectorPage struct {
	Count   int64              `json:"count"`
	Results []FinanceConnector `json:"results"`
}

type FinanceConnectorPatch struct {
	DisplayName *string `json:"display_name,omitempty"`
	CompanyName *string `json:"company_name,omitempty"`
	Company     *string `json:"company,omitempty"`
	// Credential — Непустой новый секрет; пустая строка сохраняет прежний
	Credential      *string `json:"credential,omitempty"`
	ImportDepthDays *int64  `json:"import_depth_days,omitempty"`
	OverlapDays     *int64  `json:"overlap_days,omitempty"`
	Status          *string `json:"status,omitempty"`
}

type FinanceConnectorProvider struct {
	Key             FinanceConnectorProviderKey `json:"key"`
	Name            string                      `json:"name"`
	AuthKind        FinanceConnectorAuthKind    `json:"auth_kind"`
	SupportsWebhook bool                        `json:"supports_webhook"`
	CredentialHint  string                      `json:"credential_hint"`
	RedirectPath    *string                     `json:"redirect_path,omitempty"`
}

type FinanceConnectorProviderKey = string

type FinanceConnectorProviderPage struct {
	Count   int64                      `json:"count"`
	Results []FinanceConnectorProvider `json:"results"`
}

type FinanceConnectorStatementCheck struct {
	OK           json.RawMessage `json:"ok"`
	Transactions int64           `json:"transactions"`
	Message      string          `json:"message"`
}

type FinanceConnectorStatus = string

type FinanceConnectorSyncIntervalOption struct {
	Minutes int64  `json:"minutes"`
	Label   string `json:"label"`
}

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

type FinanceConnectorSyncSettings struct {
	ScheduleIntervalMinutes int64                                `json:"schedule_interval_minutes"`
	Mode                    string                               `json:"mode"`
	ModulbankWebhookURL     string                               `json:"modulbank_webhook_url"`
	IntervalOptions         []FinanceConnectorSyncIntervalOption `json:"interval_options"`
}

type FinanceConnectorSyncSettingsInput struct {
	ScheduleIntervalMinutes int64 `json:"schedule_interval_minutes"`
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

type FinanceDirectoryCompany struct {
	ID        UUID   `json:"id"`
	Name      string `json:"name"`
	LegalName string `json:"legal_name"`
	INN       string `json:"inn"`
	KPP       string `json:"kpp"`
	IsActive  bool   `json:"is_active"`
}

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
	CompanyID *UUID   `json:"company_id,omitempty"`
	Name      string  `json:"name"`
	ValidFrom string  `json:"valid_from"`
	BaseKind  *string `json:"base_kind,omitempty"`
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

type FinanceImportApply struct {
	ConfirmWarnings *bool `json:"confirm_warnings,omitempty"`
}

type FinanceImportDiff struct {
	Row     int64             `json:"row"`
	Label   string            `json:"label"`
	Values  map[string]string `json:"values"`
	Skipped *bool             `json:"skipped,omitempty"`
}

type FinanceImportField struct {
	Key      string `json:"key"`
	Label    string `json:"label"`
	Required bool   `json:"required"`
}

type FinanceImportInspect struct {
	SheetName *string `json:"sheet_name,omitempty"`
	HeaderRow *int64  `json:"header_row,omitempty"`
}

type FinanceImportIssue struct {
	Row      int64   `json:"row"`
	Column   *string `json:"column,omitempty"`
	Severity string  `json:"severity"`
	Message  string  `json:"message"`
}

type FinanceImportItemMappingRequest struct {
	// Items — Карта целиком: «название статьи в файле» → идентификатор статьи справочника ДДС. Заменяет прежнюю карту, поэтому присылать надо всё накопленное, а не одну новую пару. Пустое значение означает «оставить без статьи» и не сохраняется; непустое, но не UUID, отклоняется.
	Items map[string]string `json:"items"`
}

type FinanceImportKind = string

type FinanceImportMapping struct {
	SheetName *string `json:"sheet_name,omitempty"`
	HeaderRow *int64  `json:"header_row,omitempty"`
	// Columns — Сопоставление «целевое поле Akeda → имя колонки файла».
	Columns map[string]string `json:"columns"`
	// OpeningBalance — Decimal string из заголовка или введённое вручную значение
	OpeningBalance *string `json:"opening_balance,omitempty"`
	// ClosingBalance — Decimal string из заголовка или введённое вручную значение
	ClosingBalance *string `json:"closing_balance,omitempty"`
}

type FinanceImportRun struct {
	ID           UUID                `json:"id"`
	Kind         FinanceImportKind   `json:"kind"`
	Format       string              `json:"format"`
	Status       FinanceImportStatus `json:"status"`
	AccountID    *UUID               `json:"account_id,omitempty"`
	WalletID     *UUID               `json:"wallet_id,omitempty"`
	SourceName   string              `json:"source_name"`
	SourceSha256 string              `json:"source_sha256"`
	SourceSize   int64               `json:"source_size"`
	SheetName    string              `json:"sheet_name"`
	HeaderRow    int64               `json:"header_row"`
	Mapping      map[string]string   `json:"mapping"`
	// ItemMapping — Соответствие «название статьи в файле» и идентификатора статьи справочника. Уточняется отдельным маршрутом, потому что набор статей известен только после предпросмотра
	ItemMapping map[string]string `json:"item_mapping,omitempty"`
	// UnknownItems — Названия статей из файла, которых нет ни в справочнике, ни в карте соответствий
	UnknownItems           []string             `json:"unknown_items,omitempty"`
	Diff                   []FinanceImportDiff  `json:"diff,omitempty"`
	Issues                 []FinanceImportIssue `json:"issues,omitempty"`
	OpeningBalance         string               `json:"opening_balance"`
	ClosingBalance         string               `json:"closing_balance"`
	ComputedClosingBalance string               `json:"computed_closing_balance"`
	CreatedCount           int64                `json:"created_count"`
	WarningCount           int64                `json:"warning_count"`
	ErrorCount             int64                `json:"error_count"`
	CreatedBy              *int64               `json:"created_by,omitempty"`
	CreatedAt              string               `json:"created_at"`
	PreviewedAt            *string              `json:"previewed_at,omitempty"`
	AppliedAt              *string              `json:"applied_at,omitempty"`
	SourceColumns          []string             `json:"source_columns,omitempty"`
	SourceSheets           []FinanceImportSheet `json:"source_sheets,omitempty"`
	TargetFields           []FinanceImportField `json:"target_fields,omitempty"`
}

type FinanceImportSheet struct {
	Name string `json:"name"`
}

type FinanceImportStatus = string

type FinanceImportUpload struct {
	File      string            `json:"file"`
	Kind      FinanceImportKind `json:"kind"`
	AccountID *UUID             `json:"account_id,omitempty"`
	WalletID  *UUID             `json:"wallet_id,omitempty"`
}

type FinanceOpenAdvance struct {
	ID     UUID   `json:"id"`
	Number string `json:"number"`
	Date   string `json:"date"`
	// Amount — Decimal string
	Amount   string `json:"amount"`
	Currency string `json:"currency"`
	// Outstanding — Незачтённая decimal string
	Outstanding string `json:"outstanding"`
}

type FinanceOpeningBalanceRequest struct {
	// Amount — Decimal string
	Amount string `json:"amount"`
	Date   string `json:"date"`
	// Comment — Обязателен при исправлении сторно-документом
	Comment *string `json:"comment,omitempty"`
}

type FinancePaymentCalendar struct {
	// ValuationDate — Дата доступных курсов для пересчёта прогноза без переоценки в главной книге
	ValuationDate *string `json:"valuation_date,omitempty"`
	Project       *string `json:"project,omitempty"`
	// BalanceAvailable — При фильтре проекта false; opening/closing/balance пустые, остатки счетов проекту не приписываются
	BalanceAvailable *bool                           `json:"balance_available,omitempty"`
	From             string                          `json:"from"`
	To               string                          `json:"to"`
	Currency         string                          `json:"currency"`
	DerivedAvailable bool                            `json:"derived_available"`
	DerivedNote      string                          `json:"derived_note"`
	Opening          string                          `json:"opening"`
	Inflow           string                          `json:"inflow"`
	Outflow          string                          `json:"outflow"`
	Closing          string                          `json:"closing"`
	OverdueIn        string                          `json:"overdue_in"`
	OverdueOut       string                          `json:"overdue_out"`
	DoneIn           string                          `json:"done_in"`
	DoneOut          string                          `json:"done_out"`
	Companies        []FinancePaymentCalendarCompany `json:"companies"`
	Step             string                          `json:"step"`
	Periods          []FinancePaymentCalendarPeriod  `json:"periods"`
	Totals           []FinancePaymentCalendarCell    `json:"totals"`
	Days             []FinancePaymentCalendarDay     `json:"days"`
	Rows             []FinancePaymentCalendarRow     `json:"rows"`
	Overdue          []FinancePaymentCalendarRow     `json:"overdue"`
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
	Fact             *FinancePaymentFact      `json:"fact,omitempty"`
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

type FinancePaymentPlanExecute struct {
	// ExecutedOn — Пустое значение означает дату фактической операции
	ExecutedOn *string `json:"executed_on,omitempty"`
	DocumentID UUID    `json:"document_id"`
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

type FinancePayoutRegister struct {
	ID UUID `json:"id"`
	// Number — Номер документа реестра
	Number string `json:"number"`
	Date   string `json:"date"`
	// Amount — Decimal string; итог официальных и неофициальных частей строк
	Amount string `json:"amount"`
	// People — Сколько человек в реестре
	People int64 `json:"people"`
	// PaidBy — Ключ банковской операции, закрывшей реестр; пусто — реестр ждёт оплаты
	PaidBy string                      `json:"paid_by"`
	Status FinancePayoutRegisterStatus `json:"status"`
}

type FinancePayoutRegisterPage struct {
	Count   int64                   `json:"count"`
	Results []FinancePayoutRegister `json:"results"`
}

type FinancePayoutRegisterStatus = string

type FinancePayoutSheetRequest struct {
	Account UUID `json:"account"`
	// Company — Юрлицо реестра; пусто — берётся из карточки счёта, и без него реестр не завести
	Company *string `json:"company,omitempty"`
	// Date — Дата файла и реестра; неразобранная означает сегодня
	Date *string `json:"date,omitempty"`
	// Purpose — Назначение платежа; пусто — «Заработная плата»
	Purpose *string                 `json:"purpose,omitempty"`
	Rows    []FinancePayoutSheetRow `json:"rows"`
}

type FinancePayoutSheetRow struct {
	Employee UUID `json:"employee"`
	// Amount — Decimal string; положительная сумма к выплате
	Amount string `json:"amount"`
}

// FinancePayrollAccrualPayload — Содержимое документа начисления. Начисленный итог и неофициальная часть не хранятся: они выводятся из оклада, премий и официальной части, а второе место с той же истиной разошлось бы с первым.
type FinancePayrollAccrualPayload struct {
	// Period — Месяц начисления в формате YYYY-MM; дата документа отвечает, когда начисление отражено в учёте
	Period *string                    `json:"period,omitempty"`
	Rows   []FinancePayrollAccrualRow `json:"rows"`
}

// FinancePayrollAccrualRow — Одна строка начисления — человек за месяц
type FinancePayrollAccrualRow struct {
	Employee UUID `json:"employee"`
	// Salary — Decimal string; оклад, постоянная часть
	Salary *string `json:"salary,omitempty"`
	// Bonus1 — Decimal string; первая премия
	Bonus1 *string `json:"bonus1,omitempty"`
	// Bonus2 — Decimal string; вторая премия
	Bonus2 *string `json:"bonus2,omitempty"`
	// Official — Decimal string; официальная часть начисления, не больше суммы оклада и премий
	Official *string `json:"official,omitempty"`
	// Tax — Decimal string; НДФЛ, удержанный из официальной части
	Tax *string `json:"tax,omitempty"`
	// Insurance — Decimal string; страховые взносы сверх начисления, а не удержание из него
	Insurance *string `json:"insurance,omitempty"`
	// Project — Разрез проекта; пустой в регистр не идёт
	Project *string `json:"project,omitempty"`
	// Department — Разрез подразделения; пустой в регистр не идёт
	Department *string `json:"department,omitempty"`
	// Cfo — Разрез центра финансовой ответственности; пустой в регистр не идёт
	Cfo *string `json:"cfo,omitempty"`
}

type FinancePayrollDocumentCreate struct {
	Type    FinancePayrollDocumentTypeKey `json:"type"`
	Date    *string                       `json:"date,omitempty"`
	Comment *string                       `json:"comment,omitempty"`
	Refs    FinancePayrollDocumentRefs    `json:"refs"`
	// Payload — Строки начисления или реестра; разбор нестрогий — незнакомое поле не отклоняется
	Payload json.RawMessage `json:"payload,omitempty"`
	// Post — Провести сразу; для реестра выплаты флаг игнорируется
	Post *bool `json:"post,omitempty"`
}

// FinancePayrollDocumentRefs — Ссылки зарплатного документа. Юрлицо обязательно уже при заведении: главная книга отвечает на вопрос, чьи это деньги. Статьи нужны проведению начисления, а не заведению черновика.
type FinancePayrollDocumentRefs struct {
	Company UUID `json:"company"`
	// Item — Статья затрат на оплату труда; нужна проведению начисления и выдаче наличными
	Item *string `json:"item,omitempty"`
	// TaxItem — Статья НДФЛ; нужна проведению начисления с удержанием
	TaxItem *string `json:"tax_item,omitempty"`
	// InsuranceItem — Статья страховых взносов; нужна проведению начисления со взносами
	InsuranceItem *string `json:"insurance_item,omitempty"`
	// Account — Счёт списания реестра; его проставляет выгрузка списка на оплату
	Account *string `json:"account,omitempty"`
	// Wallet — Касса выдачи; заполненная означает расходный кассовый ордер по реестру
	Wallet *string `json:"wallet,omitempty"`
	// Extra — поля сверх схемы; заполняется вызывающим кодом при необходимости.
	Extra map[string]string `json:"-"`
}

type FinancePayrollDocumentTypeKey = string

type FinancePayrollImportInspection struct {
	Sheets []FinancePayrollImportSheet `json:"sheets"`
	// Fields — Целевые поля разбора; обязателен только сотрудник
	Fields []FinanceImportField `json:"fields"`
}

type FinancePayrollImportPreview struct {
	Rows []FinancePayrollImportRow `json:"rows"`
	// Ready — Строк, годных к начислению
	Ready int64 `json:"ready"`
	// Broken — Строк с проблемой
	Broken int64 `json:"broken"`
	// Accrued — Decimal string; итог начисленного по годным строкам
	Accrued string `json:"accrued"`
}

type FinancePayrollImportRow struct {
	// Line — Номер строки в файле, а не в ответе: человек правит исходник
	Line int64 `json:"line"`
	// Source — Как человек назван в файле
	Source string `json:"source"`
	// Employee — Найденный сотрудник справочника; пусто — строка не сопоставлена
	Employee string `json:"employee"`
	// Name — ФИО найденного сотрудника
	Name string `json:"name"`
	// Salary — Decimal string; оклад
	Salary string `json:"salary"`
	// Bonus1 — Decimal string; первая премия
	Bonus1 string `json:"bonus1"`
	// Bonus2 — Decimal string; вторая премия
	Bonus2 string `json:"bonus2"`
	// Official — Decimal string; официальная часть, равная начисленному при отсутствии своей колонки
	Official string `json:"official"`
	// Tax — Decimal string; НДФЛ
	Tax string `json:"tax"`
	// Insurance — Decimal string; страховые взносы
	Insurance string `json:"insurance"`
	// Accrued — Decimal string; оклад плюс обе премии
	Accrued string `json:"accrued"`
	// Unofficial — Decimal string; начисленное за вычетом официальной части
	Unofficial string `json:"unofficial"`
	// Problem — Почему строку нельзя начислить; пусто — можно
	Problem string `json:"problem"`
}

type FinancePayrollImportSheet struct {
	Name string `json:"name"`
	// Header — Заголовки строки, выбранной как шапка
	Header []string `json:"header"`
	// Sample — Первые пять строк данных
	Sample [][]string `json:"sample"`
	// Rows — Строк данных на листе, без шапки
	Rows int64 `json:"rows"`
	// Guessed — Предложенное соответствие «целевое поле → заголовок колонки»
	Guessed map[string]string `json:"guessed"`
}

type FinancePayrollJournal struct {
	From   string                      `json:"from"`
	To     string                      `json:"to"`
	Rows   []FinancePayrollJournalRow  `json:"rows"`
	Totals FinancePayrollJournalTotals `json:"totals"`
}

// FinancePayrollJournalRow — Строка журнала — человек за месяц. Все суммы строками: отчёт о деньгах, округлённый по дороге, перестаёт сходиться с книгой ровно там, где на него смотрят.
type FinancePayrollJournalRow struct {
	// Employee — Идентификатор сотрудника
	Employee     string `json:"employee"`
	EmployeeName string `json:"employee_name"`
	JobTitle     string `json:"job_title"`
	Department   string `json:"department"`
	// Period — Месяц строки в формате YYYY-MM
	Period string `json:"period"`
	// Salary — Decimal string
	Salary string `json:"salary"`
	// Bonus1 — Decimal string
	Bonus1 string `json:"bonus1"`
	// Bonus2 — Decimal string
	Bonus2 string `json:"bonus2"`
	// Accrued — Decimal string — начислено всего
	Accrued string `json:"accrued"`
	// Official — Decimal string — официальная часть начисления
	Official string `json:"official"`
	// Unofficial — Decimal string — неофициальная часть начисления
	Unofficial string `json:"unofficial"`
	// Tax — Decimal string — НДФЛ
	Tax string `json:"tax"`
	// Insurance — Decimal string — взносы
	Insurance string `json:"insurance"`
	// NetOfficial — Decimal string — на руки официально: официальная часть за вычетом НДФЛ
	NetOfficial string `json:"net_official"`
	// NetUnofficial — Decimal string — на руки неофициально: неофициальная часть целиком, с неё не удерживают
	NetUnofficial string `json:"net_unofficial"`
	// PaidOfficial — Decimal string
	PaidOfficial string `json:"paid_official"`
	// PaidUnofficial — Decimal string
	PaidUnofficial string `json:"paid_unofficial"`
	// Debt — Decimal string — сколько человеку должны на конец месяца строки. Долг один: сальдо счетов 70.01 и 70.02 вместе, а не вычитание колонок.
	Debt string `json:"debt"`
}

type FinancePayrollJournalTotals struct {
	// Accrued — Decimal string
	Accrued string `json:"accrued"`
	// Official — Decimal string
	Official string `json:"official"`
	// Unofficial — Decimal string
	Unofficial string `json:"unofficial"`
	// Tax — Decimal string
	Tax string `json:"tax"`
	// Insurance — Decimal string
	Insurance string `json:"insurance"`
	// PaidOfficial — Decimal string
	PaidOfficial string `json:"paid_official"`
	// PaidUnofficial — Decimal string
	PaidUnofficial string `json:"paid_unofficial"`
	// Debt — Decimal string — берётся только с последней строки каждого сотрудника: сальдо накопительное
	Debt string `json:"debt"`
}

// FinancePayrollPaymentPayload — Содержимое реестра выплаты. Строка без человека и строка с двумя нулями не годятся, и узнаётся это при заведении, а не в момент оплаты.
type FinancePayrollPaymentPayload struct {
	// Period — Месяц выплаты в формате YYYY-MM
	Period *string                    `json:"period,omitempty"`
	Rows   []FinancePayrollPaymentRow `json:"rows"`
	// Purpose — Назначение платежа; так его записывает выгрузка списка на оплату
	Purpose *string `json:"purpose,omitempty"`
}

// FinancePayrollPaymentRow — Одна строка реестра выплаты
type FinancePayrollPaymentRow struct {
	Employee UUID `json:"employee"`
	// Official — Decimal string; официальная часть выплаты
	Official *string `json:"official,omitempty"`
	// Unofficial — Decimal string; неофициальная часть выплаты
	Unofficial *string `json:"unofficial,omitempty"`
}

type FinancePeriodCheck struct {
	Key    string `json:"key"`
	Title  string `json:"title"`
	Detail string `json:"detail"`
	Passed bool   `json:"passed"`
}

type FinancePeriodCheckPage struct {
	Checks []FinancePeriodCheck `json:"checks"`
}

type FinancePnlCoverage struct {
	Missing    []FinancePnlCoverageItem `json:"missing"`
	Duplicated []FinancePnlCoverageItem `json:"duplicated"`
}

type FinancePnlCoverageItem struct {
	ID    UUID   `json:"id"`
	Name  string `json:"name"`
	Path  string `json:"path"`
	Times *int64 `json:"times,omitempty"`
}

type FinancePnlEntry struct {
	ID   UUID   `json:"id"`
	Date string `json:"date"`
	// Amount — Decimal string со знаком ОТЧЁТА, а не со знаком книги: расшифровка обязана складываться в ту строку, которую раскрывают
	Amount         string `json:"amount"`
	DocumentID     *UUID  `json:"document_id,omitempty"`
	DocumentNumber string `json:"document_number"`
	// DocumentType — Вид документа словами: продажа, закупка, банковская операция
	DocumentType string `json:"document_type"`
	// DocumentTypeKey — Вид документа машинным ключом — по нему документ открывается ТАМ, где он живёт: модульные документы общий журнал не отдаёт
	DocumentTypeKey string `json:"document_type_key"`
	Counterparty    string `json:"counterparty"`
	// AccountCode — Счёт результата: одна статья может лечь на разные счета, если правило проводки менялось
	AccountCode string `json:"account_code"`
	AccountName string `json:"account_name"`
	Comment     string `json:"comment"`
}

type FinancePnlEntryPage struct {
	// Count — Длина `results`, а не число проводок ячейки: список уже обрезан потолком 200
	Count   int64             `json:"count"`
	Results []FinancePnlEntry `json:"results"`
}

type FinancePnlFormulaToken struct {
	Kind  string  `json:"kind"`
	RowID *UUID   `json:"row_id,omitempty"`
	Op    *string `json:"op,omitempty"`
	Value *string `json:"value,omitempty"`
}

type FinancePnlItem struct {
	ID   UUID   `json:"id"`
	Name string `json:"name"`
	// ParentID — Пустая строка у корневой статьи
	ParentID string `json:"parent_id"`
}

type FinancePnlItemPage struct {
	Count   int64            `json:"count"`
	Results []FinancePnlItem `json:"results"`
}

type FinancePnlLayout struct {
	ID        UUID                  `json:"id"`
	Name      string                `json:"name"`
	IsDefault bool                  `json:"is_default"`
	Rows      []FinancePnlLayoutRow `json:"rows"`
}

type FinancePnlLayoutCreate struct {
	Name      string `json:"name"`
	IsDefault *bool  `json:"is_default,omitempty"`
}

type FinancePnlLayoutPage struct {
	Count   int64              `json:"count"`
	Results []FinancePnlLayout `json:"results"`
}

type FinancePnlLayoutRow struct {
	ID        UUID                     `json:"id"`
	Kind      string                   `json:"kind"`
	ParentID  *UUID                    `json:"parent_id,omitempty"`
	Title     string                   `json:"title"`
	ItemID    *UUID                    `json:"item_id,omitempty"`
	Formula   []FinancePnlFormulaToken `json:"formula"`
	Format    string                   `json:"format"`
	Collapsed bool                     `json:"collapsed"`
	SystemRow *string                  `json:"system_row,omitempty"`
}

type FinancePnlLayoutSave struct {
	Name      string                `json:"name"`
	IsDefault bool                  `json:"is_default"`
	Rows      []FinancePnlLayoutRow `json:"rows"`
}

type FinancePnlLine struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Sign   int64  `json:"sign"`
	Amount string `json:"amount"`
}

type FinancePnlReport struct {
	From            string                  `json:"from"`
	To              string                  `json:"to"`
	Revenue         string                  `json:"revenue"`
	Expense         string                  `json:"expense"`
	Profit          string                  `json:"profit"`
	UnclassifiedIn  string                  `json:"unclassified_in"`
	UnclassifiedOut string                  `json:"unclassified_out"`
	Lines           []FinancePnlLine        `json:"lines"`
	LayoutRows      []FinancePnlReportRow   `json:"layout_rows,omitempty"`
	Layout          *FinancePnlReportLayout `json:"layout,omitempty"`
	Columns         []FinanceReportColumn   `json:"columns"`
	Companies       []FinanceReportCompany  `json:"companies,omitempty"`
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

type FinanceReconciliationAccount struct {
	AccountID UUID   `json:"account_id"`
	Account   string `json:"account"`
	Currency  string `json:"currency"`
	// On — Дата, на которую сделан расчёт
	On string `json:"on"`
	// Ours — Decimal string — наш расчёт: входящий остаток плюс движения по дату
	Ours string `json:"ours"`
	// OpeningBalance — Decimal string — слагаемое расчёта
	OpeningBalance string `json:"opening_balance"`
	// TurnoverIn — Decimal string — приход за период
	TurnoverIn string `json:"turnover_in"`
	// TurnoverOut — Decimal string — расход за период
	TurnoverOut string `json:"turnover_out"`
	// Theirs — Decimal string — слово банка на дату `as_of`. Отсутствует, когда сверять не с чем; это не «сошлось».
	Theirs *string `json:"theirs,omitempty"`
	// AsOf — Дата, на которую банк назвал остаток
	AsOf   *string                      `json:"as_of,omitempty"`
	Source *FinanceReconciliationSource `json:"source,omitempty"`
	// Difference — Decimal string — наш расчёт минус банк. Отсутствует вместе с `theirs`: разница с тем, чего не сказали, не равна нулю.
	Difference    *string                             `json:"difference,omitempty"`
	Days          []FinanceReconciliationDay          `json:"days"`
	StatementGaps []FinanceReconciliationStatementGap `json:"statement_gaps"`
}

type FinanceReconciliationDay struct {
	Date   string                         `json:"date"`
	Reason FinanceReconciliationDayReason `json:"reason"`
	// Count — Сколько операций этого дня попало под причину
	Count int64 `json:"count"`
	// Amount — Decimal string — сумма операций дня по этой причине, со знаком движения
	Amount string `json:"amount"`
}

type FinanceReconciliationDayReason = string

type FinanceReconciliationSource = string

// FinanceReconciliationStatementGap — Промежуток, не покрытый ни одной выпиской: за эти дни банк ничего не подтверждал, и всё, что там есть, держится только на нашем вводе.
type FinanceReconciliationStatementGap struct {
	From string `json:"from"`
	To   string `json:"to"`
}

type FinanceReconciliationSummary struct {
	TotalCount          int64 `json:"total_count"`
	NeedsAttentionCount int64 `json:"needs_attention_count"`
	UnmatchedCount      int64 `json:"unmatched_count"`
	// MissingOrderCount — Входящие платежи без заказа и без проекта; имя поля сохранено для совместимости
	MissingOrderCount    int64 `json:"missing_order_count"`
	MissingCashflowCount int64 `json:"missing_cashflow_count"`
	// IncomingUnlinkedAmount — Сумма входящих платежей без заказа и без проекта; decimal string
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
}

type FinanceRegisterRepairFailure struct {
	ID    UUID   `json:"id"`
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
}

type FinanceRequisitesLookup struct {
	Organization        *FinanceRequisitesParty `json:"organization"`
	Bank                *FinanceRequisitesBank  `json:"bank"`
	NumberValid         *bool                   `json:"number_valid"`
	Warnings            []string                `json:"warnings"`
	DirectoryConfigured bool                    `json:"directory_configured"`
}

type FinanceRequisitesParty struct {
	Name     string `json:"name"`
	FullName string `json:"full_name"`
	INN      string `json:"inn"`
	KPP      string `json:"kpp"`
	Ogrn     string `json:"ogrn"`
	Address  string `json:"address"`
	Status   string `json:"status"`
}

type FinanceResponsiblePatch struct {
	Responsible *string `json:"responsible"`
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
	// ObligationID — Обязательно для зачёта аванса и распределения оплаты
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
	Side    *string `json:"side,omitempty"`
	Comment *string `json:"comment,omitempty"`
	// SourceSystem — Ключ идемпотентности сделки (только продажа и закупка): система-источник — учётная система клиента или ключ стороннего приложения
	SourceSystem *string `json:"source_system,omitempty"`
	// SourceRef — Какая именно база/кабинет клиента внутри source_system; пусто — единственный источник
	SourceRef *string `json:"source_ref,omitempty"`
	// ExternalID — Идентификатор сделки в source_system; повтор того же (source_system, source_ref, external_id) возвращает уже созданный документ вместо второго
	ExternalID *string `json:"external_id,omitempty"`
}

type FinanceSettlementDocumentType = string

type FinanceSettlementExposure struct {
	Available bool   `json:"available"`
	AsOf      string `json:"as_of"`
	ContactID UUID   `json:"contact_id"`
	CompanyID UUID   `json:"company_id"`
	Currency  string `json:"currency"`
	// Receivable — Decimal string
	Receivable string `json:"receivable"`
	// Overdue — Decimal string
	Overdue         string `json:"overdue"`
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

type FinanceTradeAdvance struct {
	// Amount — Общая свободная decimal string
	Amount   string               `json:"amount"`
	Advances []FinanceOpenAdvance `json:"advances"`
}

type FinanceTradeJournalPage struct {
	Count   int64                    `json:"count"`
	Results []FinanceTradeJournalRow `json:"results"`
}

type FinanceTradeJournalRow struct {
	ID          UUID    `json:"id"`
	Number      string  `json:"number"`
	Date        string  `json:"date"`
	Status      string  `json:"status"`
	ContactID   *string `json:"contact_id"`
	ContactName string  `json:"contact_name"`
	CompanyID   *string `json:"company_id"`
	CompanyName string  `json:"company_name"`
	ProjectID   *string `json:"project_id"`
	ProjectName string  `json:"project_name"`
	ItemName    string  `json:"item_name"`
	// Amount — Decimal string
	Amount   string `json:"amount"`
	Currency string `json:"currency"`
	DueDate  string `json:"due_date"`
	// Outstanding — Decimal string из регистра расчётов
	Outstanding string `json:"outstanding"`
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
	Order               *string `json:"order"`
	OrderNumber         *string `json:"order_number"`
	Project             *string `json:"project"`
	ProjectName         *string `json:"project_name"`
	// Responsible — Операционный ответственный, не участвующий в проводках
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
	Order        *string `json:"order,omitempty"`
	Project      *string `json:"project,omitempty"`
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
	ID          UUID        `json:"id"`
	Key         string      `json:"key"`
	Name        string      `json:"name"`
	Description string      `json:"description"`
	Color       string      `json:"color"`
	ContactID   *UUID       `json:"contact_id"`
	ContactName string      `json:"contact_name"`
	CompanyID   *UUID       `json:"company_id"`
	StartDate   string      `json:"start_date"`
	TargetDate  string      `json:"target_date"`
	LeadUserID  *int64      `json:"lead_user_id"`
	LeadName    string      `json:"lead_name"`
	Counters    HubCounters `json:"counters"`
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
	// PrincipalKey — Ключ принципала: id пользователя, UUID роли, название подразделения или * для всех
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

type KnowledgeAnswerFeedbackInput struct {
	// Helpful — Ответ помог; при true причина и комментарий очищаются
	Helpful bool `json:"helpful"`
	// Issue — Что было не так с ответом; обязательно при helpful=false
	Issue *string `json:"issue,omitempty"`
	// Comment — Пояснение к отрицательной оценке; при helpful=true отбрасывается
	Comment *string `json:"comment,omitempty"`
}

type KnowledgeAnswerInput struct {
	Question string `json:"question"`
	// Limit — Сколько фрагментов-опор искать; по умолчанию 6
	Limit *int64 `json:"limit,omitempty"`
	// History — Предыдущие ходы диалога; доступ они не расширяют
	History []KnowledgeAnswerTurn `json:"history,omitempty"`
	// Scope — Где искать: company — материалы компании, guides — встроенные руководства продукта, all — оба корпуса
	Scope *string `json:"scope,omitempty"`
}

type KnowledgeAnswerQuality struct {
	// PeriodDays — Длина периода в днях; по умолчанию 30
	PeriodDays int64 `json:"period_days"`
	// Total — Прогонов ответа за период
	Total int64 `json:"total"`
	// Abstained — Ответов без опоры в материалах
	Abstained int64 `json:"abstained"`
	// Generated — Ответов собранных генеративной моделью
	Generated int64 `json:"generated"`
	// Helpful — Положительных оценок
	Helpful int64 `json:"helpful"`
	// Unhelpful — Отрицательных оценок
	Unhelpful int64 `json:"unhelpful"`
	// AverageLatencyMs — Средняя длительность ответа в миллисекундах
	AverageLatencyMs float64 `json:"average_latency_ms"`
	// ContentGaps — Частые вопросы без ответа или с отрицательной оценкой; сюда смотрят когда решают что дописать
	ContentGaps []KnowledgeContentGap `json:"content_gaps"`
	Index       KnowledgeIndexHealth  `json:"index"`
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
	ProcessingStatus string  `json:"processing_status"`
	ParserName       *string `json:"parser_name,omitempty"`
	ParserVersion    *string `json:"parser_version,omitempty"`
	ProcessingError  *string `json:"processing_error,omitempty"`
	ProcessedAt      *string `json:"processed_at,omitempty"`
	UploadedBy       int64   `json:"uploaded_by"`
	CreatedAt        string  `json:"created_at"`
	UpdatedAt        string  `json:"updated_at"`
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

type KnowledgeContentGap struct {
	// Question — Вопрос без ответа или с отрицательной оценкой
	Question string `json:"question"`
	// Count — Сколько раз вопрос задали за период; вопросы группируются без учёта регистра
	Count       int64  `json:"count"`
	LastAskedAt string `json:"last_asked_at"`
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

type KnowledgeIndexHealth struct {
	// ActiveGenerations — Поколений индекса в работе
	ActiveGenerations int64 `json:"active_generations"`
	// BuildingGenerations — Поколений индекса в сборке
	BuildingGenerations int64 `json:"building_generations"`
	// FailedGenerations — Поколений индекса со сбоем
	FailedGenerations int64 `json:"failed_generations"`
	// Chunks — Фрагментов в индексе; страницы и файлы вместе
	Chunks int64 `json:"chunks"`
	// PendingAssets — Файлов в очереди разбора
	PendingAssets int64 `json:"pending_assets"`
	// ProcessingAssets — Файлов в разборе
	ProcessingAssets int64 `json:"processing_assets"`
	// ReadyAssets — Файлов в индексе
	ReadyAssets int64 `json:"ready_assets"`
	// FailedAssets — Файлов со сбоем разбора
	FailedAssets int64 `json:"failed_assets"`
	// UnsupportedAssets — Файлов с неподдерживаемым форматом
	UnsupportedAssets int64 `json:"unsupported_assets"`
	// LastActivatedAt — Когда индекс переключался на новое поколение
	LastActivatedAt *string `json:"last_activated_at,omitempty"`
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

type KnowledgeRevisionRestoreInput struct {
	// ExpectedVersion — Версия страницы из её карточки
	ExpectedVersion int64 `json:"expected_version"`
	RevisionID      UUID  `json:"revision_id"`
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
	CanManage bool   `json:"can_manage"`
	HasCover  bool   `json:"has_cover"`
	PageCount int64  `json:"page_count"`
	CreatedBy int64  `json:"created_by"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
	IsPinned  bool   `json:"is_pinned"`
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
}

type KnowledgeTag struct {
	ID        UUID   `json:"id"`
	Name      string `json:"name"`
	Color     string `json:"color"`
	CreatedBy int64  `json:"created_by"`
	CreatedAt string `json:"created_at"`
}

type KnowledgeTagInput struct {
	// Name — Имя метки уникально в кабинете без учёта регистра
	Name string `json:"name"`
	// Color — Ключ цвета метки; по умолчанию neutral
	Color *string `json:"color,omitempty"`
}

type KnowledgeTagSetInput struct {
	// TagIds — Полный набор меток страницы; пустой массив снимает все метки
	TagIds []UUID `json:"tag_ids"`
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

// MarketplaceEconBaseRow — Сырьё строки прайса в том виде в каком его отдаёт витрина ценообразования
type MarketplaceEconBaseRow struct {
	// Price — Установочная цена, до скидки площадки
	Price *float64 `json:"price,omitempty"`
	// Spp — Доля скидки площадки, 0..1
	Spp  *float64 `json:"spp,omitempty"`
	Cost *float64 `json:"cost,omitempty"`
	// Comm — Комиссия в процентах
	Comm *float64 `json:"comm,omitempty"`
	// Tax — Налог в процентах
	Tax *float64 `json:"tax,omitempty"`
	// Acquiring — Эквайринг в процентах
	Acquiring *float64 `json:"acquiring,omitempty"`
	// Log — Логистика итого; запасное значение для доставки
	Log       *float64 `json:"log,omitempty"`
	LogDirect *float64 `json:"logDirect,omitempty"`
	LogReturn *float64 `json:"logReturn,omitempty"`
	// StorageUnit — Хранение на единицу
	StorageUnit *float64 `json:"storageUnit,omitempty"`
	// AcceptUnit — Приёмка на единицу
	AcceptUnit *float64 `json:"acceptUnit,omitempty"`
	// PenaltyUnit — Штрафы на единицу
	PenaltyUnit *float64 `json:"penaltyUnit,omitempty"`
}

// MarketplaceEconOverrides — Ручные правки; отсутствие поля означает значение площадки
type MarketplaceEconOverrides struct {
	Price *float64 `json:"price,omitempty"`
	// Hold — Репрайсер держит эту цену клиента
	Hold *float64 `json:"hold,omitempty"`
	// Spp — Скидка площадки в процентах, а не долей
	Spp      *float64 `json:"spp,omitempty"`
	CostBuy  *float64 `json:"costBuy,omitempty"`
	Cost     *float64 `json:"cost,omitempty"`
	Pack     *float64 `json:"pack,omitempty"`
	LogToWh  *float64 `json:"logToWh,omitempty"`
	Comm     *float64 `json:"comm,omitempty"`
	Handling *float64 `json:"handling,omitempty"`
	Storage  *float64 `json:"storage,omitempty"`
	Accept   *float64 `json:"accept,omitempty"`
	LogDir   *float64 `json:"logDir,omitempty"`
	LogRet   *float64 `json:"logRet,omitempty"`
	Acq      *float64 `json:"acq,omitempty"`
	AdIn     *float64 `json:"adIn,omitempty"`
	AdEx     *float64 `json:"adEx,omitempty"`
	Tax      *float64 `json:"tax,omitempty"`
}

// MarketplaceEconOzonInput — Разрешённый вход расчёта Ozon после правок и сценария акции
type MarketplaceEconOzonInput struct {
	Price    float64 `json:"price"`
	Spp      float64 `json:"spp"`
	CostBuy  float64 `json:"costBuy"`
	Pack     float64 `json:"pack"`
	LogToWh  float64 `json:"logToWh"`
	Comm     float64 `json:"comm"`
	Handling float64 `json:"handling"`
	Storage  float64 `json:"storage"`
	LogDir   float64 `json:"logDir"`
	LogRet   float64 `json:"logRet"`
	Acq      float64 `json:"acq"`
	AdIn     float64 `json:"adIn"`
	AdEx     float64 `json:"adEx"`
	// AdExR — Внешняя реклама задана рублями за единицу
	AdExR bool    `json:"adExR"`
	Tax   float64 `json:"tax"`
}

type MarketplaceEconQuoteItem struct {
	Base *MarketplaceEconBaseRow   `json:"base,omitempty"`
	Ov   *MarketplaceEconOverrides `json:"ov,omitempty"`
	// Drr — Доля рекламных расходов по умолчанию
	Drr *float64 `json:"drr,omitempty"`
	// AdExAll — Внешняя реклама по умолчанию
	AdExAll *float64 `json:"adExAll,omitempty"`
	// AdExUnit — Значение rub трактует внешнюю рекламу как рубли за единицу
	AdExUnit *string `json:"adExUnit,omitempty"`
	// Promo — Скидка акции в процентах; задана — считается сценарий акции
	Promo *float64 `json:"promo,omitempty"`
}

type MarketplaceEconQuoteRequest struct {
	// Platform — Иное значение даёт 400 даже при пустом батче
	Platform string                     `json:"platform"`
	Items    []MarketplaceEconQuoteItem `json:"items,omitempty"`
}

type MarketplaceEconQuoteResponse struct {
	Rows []MarketplaceEconQuoteRow `json:"rows"`
}

type MarketplaceEconQuoteRow struct {
	Ozon *MarketplaceEconOzonInput `json:"ozon,omitempty"`
	Wb   *MarketplaceEconWbInput   `json:"wb,omitempty"`
	Out  MarketplaceEconResult     `json:"out"`
}

// MarketplaceEconResult — Неприменимые к площадке поля остаются нулями, а не пропадают
type MarketplaceEconResult struct {
	// Buyer — Ozon: цена клиента
	Buyer float64 `json:"buyer"`
	// Client — Wildberries: цена клиента
	Client float64 `json:"client"`
	// Rev — Ozon: выручка продавца
	Rev float64 `json:"rev"`
	// Ppvz — Wildberries: выплата продавцу
	Ppvz float64 `json:"ppvz"`
	// Comm — Комиссия на единицу
	Comm float64 `json:"comm"`
	Acq  float64 `json:"acq"`
	AdIn float64 `json:"adIn"`
	AdEx float64 `json:"adEx"`
	Tax  float64 `json:"tax"`
	// CostBefore — Себестоимость до продажи на единицу
	CostBefore float64 `json:"costBefore"`
	// During — Сумма затрат во время продажи
	During float64 `json:"during"`
	// Margin — Маржа на единицу
	Margin float64 `json:"margin"`
	// Mpct — Маржинальность долей; null при нулевой базе
	Mpct *float64 `json:"mpct"`
	Roi  *float64 `json:"roi"`
}

// MarketplaceEconWbInput — Разрешённый вход расчёта Wildberries после правок и сценария акции
type MarketplaceEconWbInput struct {
	Price   float64 `json:"price"`
	Spp     float64 `json:"spp"`
	Cost    float64 `json:"cost"`
	Comm    float64 `json:"comm"`
	LogDir  float64 `json:"logDir"`
	Storage float64 `json:"storage"`
	Accept  float64 `json:"accept"`
	Penalty float64 `json:"penalty"`
	Acq     float64 `json:"acq"`
	AdIn    float64 `json:"adIn"`
	AdEx    float64 `json:"adEx"`
	Tax     float64 `json:"tax"`
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
	Anchor   string                                  `json:"anchor"`
	Months   []MarketplaceOzonDecompositionMonth     `json:"months"`
	Month    *MarketplaceOzonDecompositionMonth      `json:"month"`
	Periods  []MarketplaceOzonDecompositionPeriod    `json:"periods"`
	Articles []MarketplaceOzonDecompositionArticle   `json:"articles"`
	Other    *MarketplaceOzonDecompositionOtherBlock `json:"other"`
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

type MarketplaceOzonDecompositionOtherPage struct {
	Items []MarketplaceOzonDecompositionOtherItem `json:"items"`
	Total int64                                   `json:"total"`
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

type MarketplaceOzonFbs struct {
	Platform string                    `json:"platform"`
	Source   *string                   `json:"source,omitempty"`
	From     *string                   `json:"from,omitempty"`
	To       *string                   `json:"to,omitempty"`
	Totals   *MarketplaceOzonFbsTotals `json:"totals,omitempty"`
	// Funnel — Семь этапов в фиксированном порядке
	Funnel     []MarketplaceOzonFbsFunnelStage `json:"funnel,omitempty"`
	Tiles      *MarketplaceOzonFbsTiles        `json:"tiles,omitempty"`
	Histogram  []MarketplaceOzonFbsSpeedBucket `json:"histogram,omitempty"`
	Warehouses []MarketplaceOzonFbsWarehouse   `json:"warehouses,omitempty"`
	Rows       []MarketplaceOzonFbsPosting     `json:"rows"`
	// Note — Оговорка о границах окна или причина пустого ответа
	Note *string `json:"note,omitempty"`
	// Analytics — Присутствует и равно false, когда аналитика не подключена
	Analytics *bool `json:"analytics,omitempty"`
}

type MarketplaceOzonFbsFunnelStage struct {
	Key   string `json:"key"`
	Label string `json:"label"`
	Count int64  `json:"count"`
	Sum   int64  `json:"sum"`
}

type MarketplaceOzonFbsPosting struct {
	// Posting — Номер отправления
	Posting string `json:"posting"`
	OrderNo string `json:"order_no"`
	// Name — Название первой позиции отправления
	Name string `json:"name"`
	// Offer — Артикул первой позиции
	Offer     string `json:"offer"`
	SKU       int64  `json:"sku"`
	Warehouse string `json:"warehouse"`
	// Status — Этап воронки
	Status string `json:"status"`
	// StatusRaw — Исходный статус площадки
	StatusRaw string  `json:"status_raw"`
	Qty       int64   `json:"qty"`
	Amount    int64   `json:"amount"`
	CreatedAt *string `json:"created_at"`
	// ProcessHrs — Часы в обработке; null пока не отгружено
	ProcessHrs *float64 `json:"process_hrs"`
	DeadlineAt *string  `json:"deadline_at"`
	// Tariff — Надбавка положительна, льгота отрицательна
	Tariff int64 `json:"tariff"`
}

type MarketplaceOzonFbsSpeedBucket struct {
	Index int64    `json:"index"`
	Label string   `json:"label"`
	Count int64    `json:"count"`
	Pct   *float64 `json:"pct"`
	// WbCommDeltaPp — Сетка Wildberries переиспользована как единая шкала скорости; к комиссии Ozon не применяется
	WbCommDeltaPp float64 `json:"wb_comm_delta_pp"`
	PerHour       bool    `json:"per_hour"`
}

type MarketplaceOzonFbsTiles struct {
	OnTimePct *float64 `json:"on_time_pct"`
	// TariffNet — Штрафы минус льготы в рублях; льгота отрицательна
	TariffNet int64    `json:"tariff_net"`
	AvgPrice  *int64   `json:"avg_price"`
	BuyoutPct *float64 `json:"buyout_pct"`
	// AvgProcessHrs — Часы от заказа до передачи в доставку
	AvgProcessHrs *float64 `json:"avg_process_hrs"`
}

type MarketplaceOzonFbsTotals struct {
	Count int64 `json:"count"`
	Sum   int64 `json:"sum"`
}

type MarketplaceOzonFbsWarehouse struct {
	Warehouse  string   `json:"warehouse"`
	Count      int64    `json:"count"`
	ProcessHrs *float64 `json:"process_hrs"`
	OnTimePct  *float64 `json:"on_time_pct"`
	Tariff     int64    `json:"tariff"`
}

type MarketplaceOzonFunnel struct {
	Platform string                       `json:"platform"`
	Source   *string                      `json:"source,omitempty"`
	From     *string                      `json:"from,omitempty"`
	To       *string                      `json:"to,omitempty"`
	Totals   *MarketplaceOzonFunnelTotals `json:"totals,omitempty"`
	Rows     []MarketplaceOzonFunnelRow   `json:"rows"`
	// Note — Почему воронка пуста или неполна
	Note *string `json:"note,omitempty"`
	// Analytics — Присутствует и равно false, когда аналитика не подключена
	Analytics *bool `json:"analytics,omitempty"`
}

type MarketplaceOzonFunnelDaily struct {
	Platform string  `json:"platform"`
	Source   *string `json:"source,omitempty"`
	// SKU — Артикул за который построена матрица
	SKU  *string `json:"sku,omitempty"`
	From *string `json:"from,omitempty"`
	To   *string `json:"to,omitempty"`
	// Days — Четырнадцать дней от старого к новому
	Days     []string                            `json:"days"`
	Series   MarketplaceOzonFunnelDailySeries    `json:"series"`
	Totals   *MarketplaceOzonFunnelDailyTotals   `json:"totals,omitempty"`
	Card     *MarketplaceOzonFunnelDailyCard     `json:"card,omitempty"`
	Articles []MarketplaceOzonFunnelDailyArticle `json:"articles,omitempty"`
	// Note — Пустая строка, когда сказать нечего
	Note *string `json:"note,omitempty"`
	// Analytics — Присутствует и равно false, когда аналитика не подключена
	Analytics *bool `json:"analytics,omitempty"`
}

type MarketplaceOzonFunnelDailyArticle struct {
	SKU   string `json:"sku"`
	Name  string `json:"name"`
	Photo string `json:"photo"`
}

type MarketplaceOzonFunnelDailyCard struct {
	// SKU — Артикул продавца
	SKU   string `json:"sku"`
	Name  string `json:"name"`
	Photo string `json:"photo"`
	// Stock — Доступный остаток
	Stock *float64 `json:"stock,omitempty"`
	Cost  *float64 `json:"cost,omitempty"`
	// Commission — Последняя ставка комиссии в процентах
	Commission *float64 `json:"commission,omitempty"`
}

// MarketplaceOzonFunnelDailySeries — Каждый ряд — значение на каждый день окна в том же порядке что days. Ряды без источника заполнены null целиком.
type MarketplaceOzonFunnelDailySeries struct {
	Traffic []*float64 `json:"traffic"`
	Views   []*float64 `json:"views"`
	Cv2     []*float64 `json:"cv2"`
	Cart    []*float64 `json:"cart"`
	Cv3     []*float64 `json:"cv3"`
	Orders  []*float64 `json:"orders"`
	// AdShare — Источника пока нет
	AdShare    []json.RawMessage `json:"adShare"`
	OrdersSum  []*float64        `json:"ordersSum"`
	Buyouts    []*float64        `json:"buyouts"`
	BuyoutsSum []*float64        `json:"buyoutsSum"`
	AvgBuyer   []*float64        `json:"avgBuyer"`
	Spp        []*float64        `json:"spp"`
	// Position — Источника пока нет
	Position    []json.RawMessage `json:"position"`
	AdSpend     []*float64        `json:"adSpend"`
	DrrOrders   []*float64        `json:"drrOrders"`
	DrrSales    []*float64        `json:"drrSales"`
	Margin      []*float64        `json:"margin"`
	MarginSheet []*float64        `json:"marginSheet"`
	// Umd — Источника пока нет
	Umd            []json.RawMessage `json:"umd"`
	Roi            []*float64        `json:"roi"`
	MarginTot      []*float64        `json:"marginTot"`
	MarginSheetTot []*float64        `json:"marginSheetTot"`
}

// MarketplaceOzonFunnelDailyTotals — Каждый итог — массив из одного значения, чтобы колонка ИТОГО рисовалась тем же кодом что и дни
type MarketplaceOzonFunnelDailyTotals struct {
	Traffic        []*float64 `json:"traffic"`
	Views          []*float64 `json:"views"`
	Cart           []*float64 `json:"cart"`
	Orders         []*float64 `json:"orders"`
	OrdersSum      []*float64 `json:"ordersSum"`
	Buyouts        []*float64 `json:"buyouts"`
	MarginTot      []*float64 `json:"marginTot"`
	MarginSheetTot []*float64 `json:"marginSheetTot"`
	AdSpend        []*float64 `json:"adSpend"`
	Cv2            []*float64 `json:"cv2"`
	Cv3            []*float64 `json:"cv3"`
	// AvgBuyer — Появляется только когда есть по чему считать
	AvgBuyer []*float64 `json:"avgBuyer,omitempty"`
}

type MarketplaceOzonFunnelRow struct {
	// NmID — Артикул продавца строкой: имя поля досталось от Wildberries
	NmID       string          `json:"nm_id"`
	Vendor     string          `json:"vendor"`
	Name       string          `json:"name"`
	Photo      string          `json:"photo"`
	Open       int64           `json:"open"`
	Cart       int64           `json:"cart"`
	Orders     int64           `json:"orders"`
	Buyouts    json.RawMessage `json:"buyouts"`
	OrdersSum  int64           `json:"orders_sum"`
	BuyoutsSum json.RawMessage `json:"buyouts_sum"`
	CvCart     *float64        `json:"cv_cart"`
	CvOrder    *float64        `json:"cv_order"`
	BuyoutPct  json.RawMessage `json:"buyout_pct"`
}

type MarketplaceOzonFunnelTotals struct {
	// Open — Показы; 0 без подписки Premium Plus
	Open   int64 `json:"open"`
	Cart   int64 `json:"cart"`
	Orders int64 `json:"orders"`
	// Buyouts — Всегда null: выкупов у Ozon нет
	Buyouts    json.RawMessage `json:"buyouts"`
	OrdersSum  int64           `json:"orders_sum"`
	BuyoutsSum json.RawMessage `json:"buyouts_sum"`
	// CvCart — Конверсия в корзину в процентах
	CvCart    *float64        `json:"cv_cart"`
	CvOrder   *float64        `json:"cv_order"`
	BuyoutPct json.RawMessage `json:"buyout_pct"`
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
	// Day — Самый свежий день в аналитике, а не сегодняшний
	Day     string  `json:"day"`
	Updated *string `json:"updated"`
	Scheme  string  `json:"scheme"`
	// Kpi — Ключи orders и sales
	Kpi map[string]MarketplaceOzonOrdersKpi `json:"kpi"`
	// Daily — Ровно 14 дней подряд
	Daily    []MarketplaceOzonOrdersDailyRow   `json:"daily"`
	Products []MarketplaceOzonOrdersProductRow `json:"products"`
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

type MarketplaceOzonPricing struct {
	Platform string `json:"platform"`
	// From — Начало окна в 30 дней
	From *string `json:"from,omitempty"`
	// To — Последняя дата финотчёта
	To *string `json:"to,omitempty"`
	// Total — Строк до отсечки по n
	Total *int64                      `json:"total,omitempty"`
	Shown *int64                      `json:"shown,omitempty"`
	Rows  []MarketplaceOzonPricingRow `json:"rows"`
	// Analytics — Присутствует и равно false, когда аналитика не подключена
	Analytics *bool `json:"analytics,omitempty"`
}

type MarketplaceOzonPricingRow struct {
	// SKU — Артикул продавца, а не числовой SKU площадки
	SKU string `json:"sku"`
	// StoreID — Внешний числовой идентификатор магазина в аналитике
	StoreID int64  `json:"store_id"`
	Name    string `json:"name"`
	Photo   string `json:"photo"`
	// Store — Название магазина
	Store string `json:"store"`
	// Price — Установочная цена карточки, до скидки площадки
	Price float64 `json:"price"`
	// SetPrice — То же значение что price
	SetPrice float64 `json:"setPrice"`
	// FactBuyer — Фактическая цена покупателя за единицу
	FactBuyer float64 `json:"factBuyer"`
	OldPrice  float64 `json:"oldPrice"`
	MinPrice  float64 `json:"minPrice"`
	// Cost — Себестоимость из базы кабинета; 0 — не заведена
	Cost float64 `json:"cost"`
	// Comm — Последняя фактическая ставка комиссии по артикулу, проценты
	Comm float64 `json:"comm"`
	// Log — Логистика доставки и возврата суммарно на единицу
	Log       float64 `json:"log"`
	LogDirect float64 `json:"logDirect"`
	LogReturn float64 `json:"logReturn"`
	// Acquiring — Эквайринг в процентах от выручки
	Acquiring float64 `json:"acquiring"`
	// Tax — Ставка налога магазина в процентах
	Tax float64 `json:"tax"`
	// Spp — Доля скидки площадки, 0..1
	Spp float64 `json:"spp"`
	// Units — Доставленных единиц за окно
	Units int64 `json:"units"`
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
}

type MarketplaceOzonProductFacets struct {
	// Subjects — Категории карточек Ozon
	Subjects []string `json:"subjects"`
	// Brands — Всегда пустой: бренда у Ozon в аналитике нет
	Brands []string `json:"brands"`
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

type MarketplaceOzonPromotion struct {
	ID   int64  `json:"id"`
	Name string `json:"name"`
	// Type — Тип акции площадки
	Type  string `json:"type"`
	Start string `json:"start"`
	End   string `json:"end"`
	// DaysLeft — Дней до конца; null когда дата не разобралась
	DaysLeft *int64 `json:"days_left"`
	// Disc — Скидка акции в процентах; 0 когда задаётся продавцом
	Disc float64 `json:"disc"`
	// Desc — Пояснение по типу акции
	Desc string `json:"desc"`
}

type MarketplaceOzonPromotions struct {
	Promos []MarketplaceOzonPromotion `json:"promos"`
	// Note — Почему список пуст
	Note *string `json:"note,omitempty"`
}

type MarketplaceOzonStockProduct struct {
	Store      UUID                            `json:"store"`
	StoreName  string                          `json:"store_name"`
	OfferID    string                          `json:"offer_id"`
	Name       string                          `json:"name"`
	Image      string                          `json:"image"`
	Total      int64                           `json:"total"`
	Warehouses []MarketplaceOzonStockWarehouse `json:"warehouses"`
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

// MarketplaceProductGroup — Срез (группа) товаров маркетплейса внутри кабинета и одной площадки. Один товар может входить в несколько срезов.
type MarketplaceProductGroup struct {
	ID       UUID                            `json:"id"`
	Platform MarketplaceProductGroupPlatform `json:"platform"`
	Name     string                          `json:"name"`
	// Color — HEX-цвет метки среза, например #6366f1
	Color string `json:"color"`
	// ItemCount — Число товаров в срезе. При создании среза всегда приходит нулевым
	ItemCount int64  `json:"item_count"`
	CreatedAt string `json:"created_at"`
}

type MarketplaceProductGroupInput struct {
	// Name — Обрезается по краям. Пустое название даёт 400
	Name string `json:"name"`
	// Color — HEX-цвет метки. Пустое значение даёт цвет по умолчанию #6366f1
	Color *string `json:"color,omitempty"`
}

// MarketplaceProductGroupItem — Товар маркетплейса в составе среза. Пара store_id и offer_id и есть его адрес — собственного идентификатора у строки состава нет.
type MarketplaceProductGroupItem struct {
	StoreID UUID `json:"store_id"`
	// OfferID — Артикул продавца на площадке
	OfferID string `json:"offer_id"`
}

type MarketplaceProductGroupItemPage struct {
	Count   int64                         `json:"count"`
	Results []MarketplaceProductGroupItem `json:"results"`
}

type MarketplaceProductGroupItemsAdded struct {
	// Added — Сколько строк реально легло в срез. Повторы и товары чужих магазинов сюда не попадают
	Added int64 `json:"added"`
}

type MarketplaceProductGroupItemsInput struct {
	// Items — Строки без store_id или offer_id отбрасываются молча
	Items []MarketplaceProductGroupItem `json:"items"`
}

type MarketplaceProductGroupPage struct {
	Count   int64                     `json:"count"`
	Results []MarketplaceProductGroup `json:"results"`
}

// MarketplaceProductGroupPatch — Отсутствующее или пустое поле сохраняет текущее значение.
type MarketplaceProductGroupPatch struct {
	Name  *string `json:"name,omitempty"`
	Color *string `json:"color,omitempty"`
}

type MarketplaceProductGroupPlatform = string

// MarketplaceStore — Магазин маркетплейса в кабинете. Форма одна для Ozon, Wildberries и Яндекс Маркета — их различает только поле platform. Ключи и токены доступа к площадке в ответ не попадают.
type MarketplaceStore struct {
	ID UUID `json:"id"`
	// Platform — Платформа задаётся маршрутом, а не телом запроса
	Platform string `json:"platform"`
	Name     string `json:"name"`
	// ExternalID — Идентификатор магазина на стороне площадки
	ExternalID int64 `json:"external_id"`
	// TaxPercent — Ставка налога в процентах; decimal строкой
	TaxPercent string `json:"tax_percent"`
	IsActive   bool   `json:"is_active"`
}

// MarketplaceStoreInput — Тело заведения магазина. Одинаково для трёх площадок — платформу задаёт маршрут.
type MarketplaceStoreInput struct {
	Name string `json:"name"`
	// ExternalID — Должен помещаться в int32 — по нему магазин сопоставляется с аналитической базой
	ExternalID int64 `json:"external_id"`
	// TaxPercent — Ставка налога в процентах; пустая строка сохраняется как ноль
	TaxPercent *string `json:"tax_percent,omitempty"`
	IsActive   *bool   `json:"is_active,omitempty"`
}

type MarketplaceStorePage struct {
	Count   int64              `json:"count"`
	Results []MarketplaceStore `json:"results"`
}

// MarketplaceStorePatch — Отсутствующее или пустое поле сохраняет текущее значение. Название и external_id этим маршрутом не меняются.
type MarketplaceStorePatch struct {
	// TaxPercent — Пустая строка оставляет сохранённую ставку
	TaxPercent *string `json:"tax_percent,omitempty"`
	IsActive   *bool   `json:"is_active,omitempty"`
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
	// OrdersQty — Из «Джема», а без него из заказов
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

type MarketplaceWbDecompOther struct {
	// Items — Отсортированы по сумме по возрастанию
	Items []MarketplaceWbDecompOtherItem `json:"items"`
	Total int64                          `json:"total"`
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
	Demo *bool `json:"demo,omitempty"`
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

type MarketplaceWbFacets struct {
	Subjects []string `json:"subjects"`
	Brands   []string `json:"brands"`
}

type MarketplaceWbFunnel struct {
	Platform string `json:"platform"`
	// Store — Название магазина
	Store *string `json:"store,omitempty"`
	// Source — jam — данные подписки, v3 — живой отчёт WB, v3_pending — площадка не ответила
	Source *string                    `json:"source,omitempty"`
	From   *string                    `json:"from,omitempty"`
	To     *string                    `json:"to,omitempty"`
	Totals *MarketplaceWbFunnelTotals `json:"totals,omitempty"`
	// Rows — Отсортированы по числу заказов по убыванию
	Rows []MarketplaceWbFunnelRow `json:"rows"`
	Note *string                  `json:"note,omitempty"`
	// Analytics — Присутствует и равно false, когда аналитическая база не подключена
	Analytics *bool `json:"analytics,omitempty"`
}

type MarketplaceWbFunnelDaily struct {
	Platform string  `json:"platform"`
	Source   *string `json:"source,omitempty"`
	// SKU — Артикул поставщика выбранной строки
	SKU  *string `json:"sku,omitempty"`
	From *string `json:"from,omitempty"`
	To   *string `json:"to,omitempty"`
	// Days — Окно 14 дней по опорный включительно
	Days []string `json:"days"`
	// Series — Ряды по дням окна той же длины, что days. Ключи traffic, views, cv2, cart, cv3, orders, adShare, ordersSum, buyouts, buyoutsSum, avgBuyer, spp, position, adSpend, drrOrders, drrSales, margin, umd, roi, marginTot. Заполнены только spp, avgBuyer, margin, roi и marginTot — воронка WB ещё не подключена и остальные ряды приходят пустыми.
	Series map[string][]*float64 `json:"series"`
	// Totals — Итог по каждому ряду одним элементом массива
	Totals map[string][]*float64         `json:"totals,omitempty"`
	Card   *MarketplaceWbFunnelDailyCard `json:"card,omitempty"`
	// Articles — До 300 артикулов по выручке за окно
	Articles []MarketplaceWbFunnelDailyArticle `json:"articles,omitempty"`
	Note     *string                           `json:"note,omitempty"`
	// Analytics — Присутствует и равно false, когда аналитическая база не подключена
	Analytics *bool `json:"analytics,omitempty"`
}

type MarketplaceWbFunnelDailyArticle struct {
	// SKU — Артикул поставщика
	SKU  string `json:"sku"`
	Name string `json:"name"`
	// Photo — В этом списке не заполняется и приходит пустой строкой
	Photo string `json:"photo"`
}

type MarketplaceWbFunnelDailyCard struct {
	// SKU — Артикул поставщика
	SKU   string `json:"sku"`
	Name  string `json:"name"`
	Photo string `json:"photo"`
	// Cost — Себестоимость из кабинета
	Cost *int64 `json:"cost,omitempty"`
}

type MarketplaceWbFunnelRow struct {
	NmID int64 `json:"nm_id"`
	// Vendor — Артикул поставщика
	Vendor string `json:"vendor"`
	Name   string `json:"name"`
	Photo  string `json:"photo"`
	// Open — Открытия карточки
	Open       int64 `json:"open"`
	Cart       int64 `json:"cart"`
	Orders     int64 `json:"orders"`
	Buyouts    int64 `json:"buyouts"`
	OrdersSum  int64 `json:"orders_sum"`
	BuyoutsSum int64 `json:"buyouts_sum"`
	// CvCart — Конверсия из открытия в корзину в процентах
	CvCart *float64 `json:"cv_cart"`
	// CvOrder — Конверсия из корзины в заказ в процентах
	CvOrder   *float64 `json:"cv_order"`
	BuyoutPct *float64 `json:"buyout_pct"`
}

type MarketplaceWbFunnelTotals struct {
	Open       int64    `json:"open"`
	Cart       int64    `json:"cart"`
	Orders     int64    `json:"orders"`
	Buyouts    int64    `json:"buyouts"`
	OrdersSum  int64    `json:"orders_sum"`
	BuyoutsSum int64    `json:"buyouts_sum"`
	CvCart     *float64 `json:"cv_cart"`
	CvOrder    *float64 `json:"cv_order"`
	BuyoutPct  *float64 `json:"buyout_pct"`
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
	// Day — Опорный день выборки
	Day     string                         `json:"day"`
	Updated *string                        `json:"updated"`
	Kpi     MarketplaceWbOrdersOverviewKpi `json:"kpi"`
	// Daily — Ровно 14 дней по опорный включительно
	Daily []MarketplaceWbOrdersDay `json:"daily"`
	// Products — Не более 200 товаров опорного дня
	Products []MarketplaceWbOrdersProduct `json:"products"`
	// Demo — Аналитическая база не подключена и цифры синтетические
	Demo *bool `json:"demo,omitempty"`
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

type MarketplaceWbPricing struct {
	Platform string                    `json:"platform"`
	From     *string                   `json:"from,omitempty"`
	To       *string                   `json:"to,omitempty"`
	Total    *int64                    `json:"total,omitempty"`
	Shown    *int64                    `json:"shown,omitempty"`
	Rows     []MarketplaceWbPricingRow `json:"rows"`
	// Analytics — Присутствует и равно false, когда аналитическая база не подключена
	Analytics *bool `json:"analytics,omitempty"`
}

type MarketplaceWbPricingRow struct {
	// SKU — Артикул поставщика
	SKU string `json:"sku"`
	// StoreID — Внешний идентификатор магазина в аналитике
	StoreID int64  `json:"store_id"`
	NmID    int64  `json:"nm_id"`
	Name    string `json:"name"`
	Photo   string `json:"photo"`
	// Store — Название магазина
	Store string `json:"store"`
	// Price — Установочная цена до СПП
	Price int64 `json:"price"`
	// SetPrice — Установочная цена до СПП
	SetPrice int64 `json:"setPrice"`
	// FactClient — Фактическая цена клиента
	FactClient int64 `json:"factClient"`
	Cost       int64 `json:"cost"`
	// Comm — Комиссия в процентах от установочной цены
	Comm float64 `json:"comm"`
	// ForPay — Выплата продавцу на единицу
	ForPay int64 `json:"forPay"`
	// LogDirect — Логистика на единицу
	LogDirect int64 `json:"logDirect"`
	// StorageUnit — Хранение на единицу
	StorageUnit int64 `json:"storageUnit"`
	// AcceptUnit — Платная приёмка на единицу
	AcceptUnit int64 `json:"acceptUnit"`
	// PenaltyUnit — Штрафы на единицу
	PenaltyUnit int64 `json:"penaltyUnit"`
	// Acquiring — Эквайринг в процентах от установочной цены
	Acquiring float64 `json:"acquiring"`
	// Tax — Ставка налога магазина в процентах
	Tax float64 `json:"tax"`
	// Spp — Скидка постоянного покупателя долей единицы
	Spp float64 `json:"spp"`
	// Units — Продано единиц за окно
	Units int64 `json:"units"`
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
	// BuyerPrice — Последняя цена покупателя из заказов или продаж
	BuyerPrice      string `json:"buyer_price"`
	Stock           int64  `json:"stock"`
	InWayToClient   int64  `json:"in_way_to_client"`
	InWayFromClient int64  `json:"in_way_from_client"`
	// Cost — Себестоимость из кабинета
	Cost *string `json:"cost"`
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

type MarketplaceWbPromotion struct {
	ID   int64  `json:"id"`
	Name string `json:"name"`
	// Type — Тип акции WB, например auto или regular
	Type string `json:"type"`
	// Start — Начало акции по стандарту RFC 3339
	Start string `json:"start"`
	// End — Конец акции по стандарту RFC 3339
	End      string `json:"end"`
	DaysLeft *int64 `json:"days_left"`
	// Disc — Всегда ноль: скидку по товару задаёт оператор
	Disc float64 `json:"disc"`
	// Desc — Пояснение к типу акции
	Desc string `json:"desc"`
}

type MarketplaceWbPromotions struct {
	// Promos — Отсортированы по дате окончания по возрастанию
	Promos []MarketplaceWbPromotion `json:"promos"`
	// Note — Причина пустого списка: нет токена WB либо площадка недоступна
	Note *string `json:"note,omitempty"`
}

type MarketplaceWbStockPage struct {
	// Count — Число товаров, а не строк «товар × склад»
	Count int64 `json:"count"`
	// Warehouses — Склады в порядке первого появления
	Warehouses []string                    `json:"warehouses"`
	Results    []MarketplaceWbStockProduct `json:"results"`
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
	// OrdersSum — Сумма заказов кроме отменённых; decimal строкой
	OrdersSum string `json:"orders_sum"`
	OrdersQty int64  `json:"orders_qty"`
	// SalesSum — Сумма доставленных заказов; decimal строкой
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
	// Day — Последний день с заказами; к нему привязаны показатели и товары
	Day string `json:"day"`
	// Updated — Момент последней синхронизации источника
	Updated *string                            `json:"updated"`
	Kpi     MarketplaceYandexOrdersOverviewKpi `json:"kpi"`
	// Daily — Четырнадцать дней подряд по возрастанию даты; дни без заказов заполнены нулями
	Daily []MarketplaceYandexOrdersDay `json:"daily"`
	// Products — Товары дня по убыванию суммы
	Products []MarketplaceYandexOrdersProduct `json:"products"`
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

type Member struct {
	ID       int64  `json:"id"`
	Username string `json:"username"`
	Name     string `json:"name"`
}

// MemberAssignment — Требуется `user_id`; `user` поддерживается только для совместимости старых клиентов.
type MemberAssignment struct {
	UserID *int64       `json:"user_id,omitempty"`
	User   *int64       `json:"user,omitempty"`
	Role   *SectionRole `json:"role,omitempty"`
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
	CreatedAt   string  `json:"created_at"`
	UpdatedAt   string  `json:"updated_at"`
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
	// CreatedBy — Сотрудник платформы, заведший приложение
	CreatedBy *int64 `json:"created_by,omitempty"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type PlatformAppBlockList struct {
	Blocks []PlatformAppManifestBlock `json:"blocks"`
}

type PlatformAppConsentDiff struct {
	// Requested — Что просит целевая версия
	Requested []string `json:"requested"`
	// Granted — Что кабинет одобрил сейчас
	Granted []string `json:"granted"`
	// New — Чего не просила установленная версия; это разница манифеста, а не разница доступа
	New []string `json:"new"`
	// Missing — Просит, но кабинет не одобрял
	Missing []string `json:"missing"`
	// MissingRequired — Обязательная часть missing — только она останавливает обновление
	MissingRequired []string `json:"missing_required"`
	MissingOptional []string `json:"missing_optional"`
	// Dropped — Одобрено, но целевая версия не просит
	Dropped []string `json:"dropped"`
	// Kept — Набор установки, если нового согласия не дают
	Kept []string `json:"kept"`
}

type PlatformAppConsentRequired struct {
	Detail string `json:"detail"`
	// Code — platform.app_consent_required, когда обновление остановлено новым обязательным правом
	Code *string `json:"code,omitempty"`
	// Version — Версия, которая просит
	Version *string `json:"version,omitempty"`
	// Scopes — Права, которых кабинет не одобрял; только они, чтобы решающее не утонуло в списке
	Scopes []string `json:"scopes,omitempty"`
}

type PlatformAppDataPolicy struct {
	// Declared — false означает, что версия ничего не обещала о данных при удалении
	Declared      bool     `json:"declared"`
	Categories    []string `json:"categories,omitempty"`
	Regions       []string `json:"regions,omitempty"`
	RetentionDays int64    `json:"retention_days"`
	Uninstall     *string  `json:"uninstall,omitempty"`
}

// PlatformAppDeliveryHealth — Сводка доставки событий установке. Только числа, которые считает Akeda: ни тела события, ни ответа приёмника здесь нет и быть не может — текст приёмника недоверен, а сводку читает кабинетный экран.
type PlatformAppDeliveryHealth struct {
	InstallationID UUID `json:"installation_id"`
	// LastAttemptAt — Когда установке в последний раз пытались дозвониться. Отсутствует, если ей ещё ничего не отправляли
	LastAttemptAt *string `json:"last_attempt_at,omitempty"`
	// LastDeliveredAt — Последняя удачная доставка. Отсутствие при заполненном last_attempt_at означает «отправляли, и ни разу не доехало» — это не то же самое, что «ещё не отправляли»
	LastDeliveredAt *string `json:"last_delivered_at,omitempty"`
	// ConsecutiveDead — Мёртвые письма подряд. Любая удачная доставка обнуляет счётчик; по нему принимается решение о парковке
	ConsecutiveDead int64 `json:"consecutive_dead"`
	// DeadLetters — Сколько мёртвых писем накопилось всего. Ровно столько фактов не доехало и ждёт повтора; число монотонно — повтор заводит новый наряд, а не оживляет мёртвый
	DeadLetters int64 `json:"dead_letters"`
	// WindowStartedAt — Начало окна доли отказов. Окно фиксированное; отдаётся вместе со счётчиками, чтобы «0 из 0» читалось как «за окно не отправляли», а не как «отказов нет»
	WindowStartedAt string `json:"window_started_at"`
	// WindowAttempts — Попыток за окно. Ноль означает, что доли нет вовсе
	WindowAttempts int64 `json:"window_attempts"`
	// WindowFailures — Из них неудачных (отложенных и мёртвых). Доля считается читателем: процент без знаменателя врёт на обоих концах
	WindowFailures int64 `json:"window_failures"`
	// PausedAt — Проекция парковки в базе кабинета: очередь проходит мимо этой установки. Правда о парковке — parked_at самой установки
	PausedAt *string `json:"paused_at,omitempty"`
}

type PlatformAppHealthCheck struct {
	// Status — skipped — спрашивать некого: у декларативного расширения нет своего приёмника
	Status string `json:"status"`
	// URL — Адрес, который спрашивали; живёт в манифесте версии, а версию потом снимут с публикации
	URL *string `json:"url,omitempty"`
	// HTTPStatus — Ноль означает «не ответил вовсе», и это не то же самое, что «ответил пятисоткой»
	HTTPStatus *int64 `json:"http_status,omitempty"`
	LatencyMs  *int64 `json:"latency_ms,omitempty"`
	// Reason — Класс отказа для разбора; человеку показывают не его
	Reason    *string `json:"reason,omitempty"`
	CheckedAt string  `json:"checked_at"`
}

type PlatformAppInstallResult struct {
	Installation PlatformAppInstallation `json:"installation"`
	App          PlatformApp             `json:"app"`
	Version      PlatformAppVersion      `json:"version"`
	Diff         PlatformAppConsentDiff  `json:"diff"`
	DataPolicy   PlatformAppDataPolicy   `json:"data_policy"`
	Health       PlatformAppHealthCheck  `json:"health"`
}

type PlatformAppInstallation struct {
	ID        UUID `json:"id"`
	TenantID  UUID `json:"tenant_id"`
	AppID     UUID `json:"app_id"`
	VersionID UUID `json:"version_id"`
	// GrantedScopes — На что согласился кабинет; итоговый доступ ещё уже — он пересекается с политикой публикации, включённостью модуля, RBAC и RLS
	GrantedScopes []string                      `json:"granted_scopes"`
	Status        PlatformAppInstallationStatus `json:"status"`
	// InstalledBy — След администратора для аудита; прав поставившего установка не наследует
	InstalledBy   *int64  `json:"installed_by,omitempty"`
	ConsentAt     *string `json:"consent_at,omitempty"`
	SuspendedAt   *string `json:"suspended_at,omitempty"`
	RevokedAt     *string `json:"revoked_at,omitempty"`
	DisableReason string  `json:"disable_reason"`
	// DeliveryEndpointURL — Куда уезжают подписанные события этой установки. Снят с манифеста версии при установке; переход версии его не меняет. Пусто у декларативного расширения
	DeliveryEndpointURL string `json:"delivery_endpoint_url"`
	// DeliveryEndpointChangedAt — Момент последней смены адреса — ограда повтора: доставки, заведённые до него, переигрывает только персонал платформы. Отсутствует, пока адрес не менялся
	DeliveryEndpointChangedAt *string `json:"delivery_endpoint_changed_at,omitempty"`
	// ParkedAt — Приёмник признан мёртвым, и доставка приостановлена: наряды копятся, ничего не теряется. Не отзыв — статус установки, её токены и секрет подписи не меняются. Отсутствует, пока установка не запаркована
	ParkedAt *string `json:"parked_at,omitempty"`
	// ParkReason — Машинный код причины. Список закрыт: слова недоверенного приёмника в это поле не попадают ни при каких условиях
	ParkReason *string `json:"park_reason,omitempty"`
	// ParkedDeadLetters — Сколько мёртвых писем подряд насчиталось на момент парковки. Порог мог с тех пор поменяться, и без числа причина непроверяема
	ParkedDeadLetters *int64 `json:"parked_dead_letters,omitempty"`
	CreatedAt         string `json:"created_at"`
	UpdatedAt         string `json:"updated_at"`
}

type PlatformAppInstallationEvent struct {
	ID UUID `json:"id"`
	// Sequence — Номер записи в журнале установки
	Sequence       int64    `json:"sequence"`
	InstallationID UUID     `json:"installation_id"`
	TenantID       UUID     `json:"tenant_id"`
	TokenID        *UUID    `json:"token_id,omitempty"`
	Kind           string   `json:"kind"`
	ActorUserID    *int64   `json:"actor_user_id,omitempty"`
	Scopes         []string `json:"scopes"`
	Reason         string   `json:"reason"`
	// Details — Прежнее и новое значение перехода; форма зависит от вида записи
	Details   map[string]json.RawMessage `json:"details,omitempty"`
	CreatedAt string                     `json:"created_at"`
}

type PlatformAppInstallationEventPage struct {
	Events []PlatformAppInstallationEvent `json:"events"`
	// Limit — Применённая глубина выборки, а не запрошенная
	Limit int64 `json:"limit"`
}

type PlatformAppInstallationStatus = string

type PlatformAppManifestBlock struct {
	// ManifestFingerprint — sha256 компактной формы документа — тот же отпечаток, которым ворота публикации связывают результат внешнего линтера с проверенным манифестом
	ManifestFingerprint string `json:"manifest_fingerprint"`
	// Publisher — Где документ впервые увидели. Улика, а не предмет запрета: тот же отпечаток у другого издателя закрыт этим же запретом
	Publisher  string `json:"publisher"`
	AppKey     string `json:"app_key"`
	ReasonCode string `json:"reason_code"`
	// Summary — Объяснение словами; уезжает кабинету в карточку уведомления, поэтому это наш текст, а не эхо приёмника
	Summary string `json:"summary"`
	// Advisory — Внешний https-адрес разбора: CVE, бюллетень, тикет
	Advisory  *string `json:"advisory,omitempty"`
	BlockedBy *int64  `json:"blocked_by,omitempty"`
	BlockedAt string  `json:"blocked_at"`
}

type PlatformAppManifestPermissions struct {
	// Required — Без этих прав приложение не работает; их появление останавливает обновление до согласия
	Required []string `json:"required"`
	// Optional — Появление такого права обновление не останавливает — оно просто не активируется
	Optional []string `json:"optional"`
}

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

type PlatformAppReasonInput struct {
	// Reason — Причина перехода; уезжает в журнал установки и в причину отзыва токенов
	Reason *string `json:"reason,omitempty"`
}

type PlatformAppRollbackResult struct {
	Installation PlatformAppInstallation `json:"installation"`
	From         PlatformAppVersion      `json:"from"`
	To           PlatformAppVersion      `json:"to"`
	Diff         PlatformAppConsentDiff  `json:"diff"`
}

type PlatformAppStatus = string

type PlatformAppSwitchResult struct {
	Installation PlatformAppInstallation `json:"installation"`
	// RevokedTokens — Сколько живых токенов погасила операция; ноль означает, что доступ и так не был выдан
	RevokedTokens int64 `json:"revoked_tokens"`
	// RevokedSigningKeys — Сколько секретов подписи погасило удаление: токен закрывает вызовы приложения к нам, секрет подписи — наши доставки к нему
	RevokedSigningKeys *int64 `json:"revoked_signing_keys,omitempty"`
	// PurgedConfigValues — Сколько сохранённых настроек и секретов уничтожено; по самой таблице этого уже не увидеть
	PurgedConfigValues *int64                      `json:"purged_config_values,omitempty"`
	DataPolicy         *PlatformAppDataPolicy      `json:"data_policy,omitempty"`
	Notice             *PlatformAppUninstallNotice `json:"notice,omitempty"`
}

type PlatformAppUninstallNotice struct {
	// Status — unavailable — не смогла отправить сама платформа: чинить это ей, а не издателю
	Status string  `json:"status"`
	URL    *string `json:"url,omitempty"`
	// KeyID — Идентификатор ключа подписи; секретом не является и нужен приёмнику, чтобы доказать, чем проверял
	KeyID      *string `json:"key_id,omitempty"`
	HTTPStatus *int64  `json:"http_status,omitempty"`
	Reason     *string `json:"reason,omitempty"`
	SentAt     string  `json:"sent_at"`
}

type PlatformAppUnparkResult struct {
	Installation PlatformAppInstallation `json:"installation"`
	Health       PlatformAppHealthCheck  `json:"health"`
	// ParkedForSeconds — Сколько установка простояла запаркованной. Числом, а не строкой: собранная сервером фраза не переводится на второй язык
	ParkedForSeconds int64 `json:"parked_for_seconds"`
}

type PlatformAppUpdateInput struct {
	// Version — Пусто означает «остаться на текущей»: тогда обновляется только согласие
	Version *string `json:"version,omitempty"`
	// Approved — Отсутствие поля означает «согласия не давали»; пустой список — «ни на что», и это разные ответы
	Approved []string `json:"approved,omitempty"`
	Reason   *string  `json:"reason,omitempty"`
}

type PlatformAppUpdateResult struct {
	Installation PlatformAppInstallation `json:"installation"`
	From         PlatformAppVersion      `json:"from"`
	To           PlatformAppVersion      `json:"to"`
	Diff         PlatformAppConsentDiff  `json:"diff"`
	// Consented — Обновление прошло по новому согласию, а не по прежнему
	Consented bool                    `json:"consented"`
	Health    *PlatformAppHealthCheck `json:"health,omitempty"`
}

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
}

type ProjectCreate struct {
	Name        string  `json:"name"`
	Key         *string `json:"key,omitempty"`
	Description *string `json:"description,omitempty"`
	Color       *string `json:"color,omitempty"`
}

type ProjectFileFolder struct {
	ID        UUID    `json:"id"`
	ProjectID UUID    `json:"project_id"`
	ParentID  *string `json:"parent_id"`
	Name      string  `json:"name"`
	SortOrder int64   `json:"sort_order"`
	CreatedBy *int64  `json:"created_by"`
	CreatedAt string  `json:"created_at"`
	UpdatedAt string  `json:"updated_at"`
}

type ProjectFileFolderCreate struct {
	Name     string `json:"name"`
	ParentID *UUID  `json:"parent_id,omitempty"`
}

type ProjectFileFolderPage struct {
	Count   int64               `json:"count"`
	Results []ProjectFileFolder `json:"results"`
}

type ProjectFileFolderRename struct {
	Name string `json:"name"`
}

type ProjectFileUpload struct {
	File   string `json:"file"`
	Folder *UUID  `json:"folder,omitempty"`
}

type ProjectPage struct {
	Count   int64     `json:"count"`
	Results []Project `json:"results"`
}

type ProjectUpdate struct {
	Name        *string `json:"name,omitempty"`
	Key         *string `json:"key,omitempty"`
	Description *string `json:"description,omitempty"`
	Color       *string `json:"color,omitempty"`
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

type ScrumSection struct {
	Section   UUID   `json:"section"`
	Name      string `json:"name"`
	Key       string `json:"key"`
	IsEnabled bool   `json:"is_enabled"`
	Tasks     int64  `json:"tasks"`
}

type ScrumSettings struct {
	Project           UUID              `json:"project"`
	ProjectKey        string            `json:"project_key"`
	ProjectName       string            `json:"project_name"`
	IsEnabled         bool              `json:"is_enabled"`
	SprintLengthWeeks int64             `json:"sprint_length_weeks"`
	CloseWeekday      int64             `json:"close_weekday"`
	CloseTime         string            `json:"close_time"`
	DailyWeekdays     []int64           `json:"daily_weekdays"`
	Timezone          string            `json:"timezone"`
	UpdatedAt         string            `json:"updated_at"`
	Sections          []ScrumSection    `json:"sections"`
	Team              []ScrumTeamMember `json:"team"`
}

type ScrumSettingsPage struct {
	Count   int64           `json:"count"`
	Results []ScrumSettings `json:"results"`
}

type ScrumSettingsUpdate struct {
	IsEnabled         *bool   `json:"is_enabled,omitempty"`
	SprintLengthWeeks *int64  `json:"sprint_length_weeks,omitempty"`
	CloseWeekday      *int64  `json:"close_weekday,omitempty"`
	CloseTime         *string `json:"close_time,omitempty"`
	DailyWeekdays     []int64 `json:"daily_weekdays,omitempty"`
	Timezone          *string `json:"timezone,omitempty"`
	ExcludedSections  []UUID  `json:"excluded_sections,omitempty"`
	TeamUserIds       []int64 `json:"team_user_ids,omitempty"`
}

type ScrumTeamMember struct {
	User     int64  `json:"user"`
	Name     string `json:"name"`
	InTeam   bool   `json:"in_team"`
	Sections int64  `json:"sections"`
}

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

type SettingsApiKey struct {
	ID   UUID   `json:"id"`
	Name string `json:"name"`
	// Prefix — Первые 12 знаков значения; открытая часть ключа
	Prefix   string   `json:"prefix"`
	Scopes   []string `json:"scopes"`
	IsActive bool     `json:"is_active"`
	// ExpiresAt — Отметка времени в текстовом виде из базы
	ExpiresAt       *string `json:"expires_at"`
	RateLimitPerMin int64   `json:"rate_limit_per_min"`
	// LastUsedAt — Отметка времени в текстовом виде из базы
	LastUsedAt *string `json:"last_used_at"`
	// CreatedAt — Отметка времени в текстовом виде из базы
	CreatedAt string `json:"created_at"`
	// Hint — Маска значения вида ••••abcd; пусто у ключей, выпущенных до хранилища
	Hint string `json:"hint"`
	// CanReveal — Значение ключа сохранено в кабинете; false означает «сохранён только хеш», а не отсутствие прав
	CanReveal bool `json:"can_reveal"`
	// RevokedAt — Отметка времени в текстовом виде из базы
	RevokedAt *string `json:"revoked_at"`
	// LastRevealedAt — Отметка времени в текстовом виде из базы
	LastRevealedAt *string `json:"last_revealed_at"`
	// Personal — Ключ выдан человеку, а не кабинету, и работает в каждом кабинете владельца с правами этого кабинета
	Personal bool `json:"personal"`
}

type SettingsApiKeyAccessEntry struct {
	ID       UUID   `json:"id"`
	APIKeyID UUID   `json:"api_key_id"`
	UserID   *int64 `json:"user_id"`
	// UserName — Полное имя автора события или его логин
	UserName string `json:"user_name"`
	Action   string `json:"action"`
	// CreatedAt — Отметка времени в текстовом виде из базы
	CreatedAt string `json:"created_at"`
}

type SettingsApiKeyAccessPage struct {
	// Count — Число строк в results, а не общее число событий
	Count   int64                       `json:"count"`
	Results []SettingsApiKeyAccessEntry `json:"results"`
}

type SettingsApiKeyActivationResult struct {
	ID UUID `json:"id"`
	// IsActive — false после отзыва, true после возврата в работу
	IsActive bool `json:"is_active"`
}

type SettingsApiKeyCreated struct {
	ID   UUID   `json:"id"`
	Name string `json:"name"`
	// Prefix — Первые 12 знаков значения
	Prefix   string   `json:"prefix"`
	Scopes   []string `json:"scopes"`
	IsActive bool     `json:"is_active"`
	// ExpiresAt — Отметка времени в текстовом виде из базы
	ExpiresAt       *string `json:"expires_at"`
	RateLimitPerMin int64   `json:"rate_limit_per_min"`
	// LastUsedAt — Отметка времени в текстовом виде из базы
	LastUsedAt *string `json:"last_used_at"`
	// CreatedAt — Отметка времени в текстовом виде из базы
	CreatedAt string `json:"created_at"`
	// Key — Полное значение ключа. Показывается единственный раз — в этом ответе; список ключей его не возвращает
	Key      string `json:"key"`
	Personal bool   `json:"personal"`
}

type SettingsApiKeyInput struct {
	// Name — Пустое имя заменяется на «Ключ»
	Name *string `json:"name,omitempty"`
	// Scopes — Пустой список заменяется на ["tasks:read"]; каждое право обязано быть у создателя
	Scopes []string `json:"scopes,omitempty"`
	// RateLimitPerMin — Ноль и отрицательное значение заменяются на 600
	RateLimitPerMin *int64 `json:"rate_limit_per_min,omitempty"`
	// Personal — true выдаёт ключ человеку, а не кабинету
	Personal *bool `json:"personal,omitempty"`
}

type SettingsApiKeyPage struct {
	// Count — Число строк в results, а не общее число ключей кабинета
	Count   int64            `json:"count"`
	Results []SettingsApiKey `json:"results"`
}

type SettingsAppCatalog struct {
	Apps []SettingsAppCatalogEntry `json:"apps"`
}

type SettingsAppCatalogEntry struct {
	App       PlatformApp              `json:"app"`
	Publisher SettingsAppPublisherCard `json:"publisher"`
	// Versions — Версии, открытые кабинету, свежие первыми; пусто у стоящего приложения, если ставить и обновлять больше не на что
	Versions         []SettingsAppVersion     `json:"versions"`
	Installation     *PlatformAppInstallation `json:"installation,omitempty"`
	InstalledVersion *SettingsAppVersion      `json:"installed_version,omitempty"`
}

type SettingsAppConsentPermission struct {
	Scope string `json:"scope"`
	// Required — Без этого права приложение не работает; необъяснённое манифестом право считается обязательным
	Required bool `json:"required"`
	// RiskClass — Пусто, если манифест право не объяснил: класс не выдумывается
	RiskClass   string                   `json:"risk_class"`
	Explanation SettingsAppLocalizedText `json:"explanation"`
	// Explained — Манифест объяснил право; false означает, что администратор одобряет вслепую
	Explained bool `json:"explained"`
	// Declared — Платформа объявляла такую область. False означает, что сказать о праве нечего, кроме имени, — и экран обязан сказать именно это
	Declared bool `json:"declared"`
	// Tier — Ярус чувствительности из таксономии платформы. Пусто у необъявленной области: ярус не выдумывается, а «обычная» по умолчанию означала бы, что неизвестное безобиднее известного
	Tier string `json:"tier"`
	// Deprecated — Область устарела и снимется не раньше чем через полгода после пометки; она открывает заметно больше нужного и осталась работающей ради уже поставленных приложений
	Deprecated bool                     `json:"deprecated"`
	Grants     SettingsAppLocalizedText `json:"grants"`
	Purpose    SettingsAppLocalizedText `json:"purpose"`
	// RetentionDays — Сколько приложение держит у себя полученное этим правом; ноль — «не храню»
	RetentionDays int64 `json:"retention_days"`
	// RetentionDeclared — Срок назван. Отличает «не храню» (ноль) от «срок не назван» (поля в манифесте нет)
	RetentionDeclared bool `json:"retention_declared"`
}

type SettingsAppConsentPreview struct {
	App         PlatformApp                    `json:"app"`
	Version     SettingsAppVersion             `json:"version"`
	Permissions PlatformAppManifestPermissions `json:"permissions"`
	// Installed — true означает, что это предпросмотр обновления
	Installed      bool                     `json:"installed"`
	Installation   *PlatformAppInstallation `json:"installation,omitempty"`
	CurrentVersion *SettingsAppVersion      `json:"current_version,omitempty"`
	Diff           PlatformAppConsentDiff   `json:"diff"`
	DataPolicy     PlatformAppDataPolicy    `json:"data_policy"`
	Publisher      SettingsAppPublisherCard `json:"publisher"`
	Sheet          SettingsAppConsentSheet  `json:"sheet"`
}

type SettingsAppConsentResult struct {
	Preview SettingsAppConsentPreview `json:"preview"`
	// RequiresConsent — Без нового согласия установка или обновление дальше не пойдут
	RequiresConsent bool `json:"requires_consent"`
}

// SettingsAppConsentSheet — Лист согласия, снятый с манифеста сервером: единственное утверждение платформы о приложении, на которое кабинет соглашается
type SettingsAppConsentSheet struct {
	Name          SettingsAppLocalizedText         `json:"name"`
	Description   SettingsAppLocalizedText         `json:"description"`
	Homepage      string                           `json:"homepage"`
	Runtime       string                           `json:"runtime"`
	Channel       string                           `json:"channel"`
	Permissions   []SettingsAppConsentPermission   `json:"permissions"`
	Subscriptions []SettingsAppConsentSubscription `json:"subscriptions"`
	Slots         []SettingsAppConsentSlot         `json:"slots"`
	// PersonFacts — Что приложение узнает о человеке, открывшем панель: пересечение запрошенного слотами с закрытым словарём платформы; больше ничего оно узнать не может
	PersonFacts []string                  `json:"person_facts"`
	DataPolicy  PlatformAppDataPolicy     `json:"data_policy"`
	Support     SettingsAppConsentSupport `json:"support"`
}

type SettingsAppConsentSlot struct {
	Slot  string                   `json:"slot"`
	Type  string                   `json:"type"`
	Title SettingsAppLocalizedText `json:"title"`
	// Context — Поля контекста запуска, которые слот просит, по алфавиту
	Context []string `json:"context"`
}

type SettingsAppConsentSubscription struct {
	Topic string `json:"topic"`
	// Filtered — Приложение сузило поток отбором
	Filtered bool `json:"filtered"`
}

type SettingsAppConsentSupport struct {
	Email         string `json:"email"`
	URL           string `json:"url"`
	IncidentEmail string `json:"incident_email"`
	ResponseHours int64  `json:"response_hours"`
}

type SettingsAppDeclaredSlot struct {
	// Slot — Ключ слота из контракта платформы; объявление вне контракта в ответ не попадает
	Slot string `json:"slot"`
	Type string `json:"type"`
	// URL — Адрес рамки. Только у слота, показывающегося отдельным источником
	URL *string `json:"url,omitempty"`
	// Origin — Источник адреса — схема, хост и порт. Считает сервер: сравнение источников обязано быть одним и тем же на выдаче запуска и в оболочке
	Origin    *string `json:"origin,omitempty"`
	MinWidth  *int64  `json:"min_width,omitempty"`
	MinHeight *int64  `json:"min_height,omitempty"`
	// Context — Поля контекста запуска, которые слот просит. Человека словарь называет псевдонимом
	Context    []string                 `json:"context"`
	Title      SettingsAppLocalizedText `json:"title"`
	ThemeAware bool                     `json:"theme_aware"`
	// BridgeSends — Что расширение вправе прислать оболочке; уже пересечено с закрытым списком платформы
	BridgeSends []string `json:"bridge_sends"`
	// BridgeReceives — Что оболочка вправе прислать расширению
	BridgeReceives []string `json:"bridge_receives"`
}

type SettingsAppExposureReport struct {
	InstallationID string  `json:"installation_id"`
	App            *string `json:"app,omitempty"`
	Version        *string `json:"version,omitempty"`
	// Scopes — Верхняя граница ущерба: на что кабинет соглашался и чем расширение имело право пользоваться
	Scopes []string `json:"scopes"`
	// SecretLeases — Сколько раз расширение забирало секреты кабинета. Это НЕ граница, а факт: каждая выдача записана до того, как значение ушло
	SecretLeases    int64    `json:"secret_leases"`
	SecretLeaseKeys []string `json:"secret_lease_keys"`
	LastSecretLease *string  `json:"last_secret_lease,omitempty"`
	// SlotLaunches — Сколько раз человек кабинета открывал панель расширения
	SlotLaunches int64 `json:"slot_launches"`
	TokenIssues  int64 `json:"token_issues"`
	// LastTokenUse — МОМЕНТ последнего предъявления токена. Что именно расширение читало, у нас не записано нигде — см. unknown
	LastTokenUse *string `json:"last_token_use,omitempty"`
	// LastDeliveredAt — Последняя удачная доставка. Число из СВОДКИ здоровья, а не из журнала: журнал наружу не открыт, потому что в его причине отказа живёт эхо недоверенного приёмника
	LastDeliveredAt *string `json:"last_delivered_at,omitempty"`
	// DeadLetters — Сколько фактов кабинета не доехало и ждёт повтора
	DeadLetters             int64   `json:"dead_letters"`
	DeliveryWindowStartedAt *string `json:"delivery_window_started_at,omitempty"`
	// DeliveryWindowAttempts — Окно отдаётся целиком, а не готовым процентом: «0 из 0» читается как «за окно не отправляли», а не как «отказов нет»
	DeliveryWindowAttempts *int64 `json:"delivery_window_attempts,omitempty"`
	DeliveryWindowFailures *int64 `json:"delivery_window_failures,omitempty"`
	// DeliveryEndpointURL — Куда уезжали события. Адрес называет издатель, данных кабинета в нём нет по определению
	DeliveryEndpointURL *string `json:"delivery_endpoint_url,omitempty"`
	// Unknown — Чего отчёт назвать не может. api_calls — какие операции расширение вызывало своим токеном: есть момент предъявления, нет предмета. event_bodies — что лежало в телах уехавших событий: тела в журнале доставки нет намеренно. delivery_summary — сводку доставки не спросили или она не ответила; это пропуск, а не нули, потому что «мёртвых писем ноль» читается как «всё доезжало». Первые две позиции стоят в списке ВСЕГДА: непроговорённый пропуск читается как хорошая новость.
	Unknown []string `json:"unknown"`
}

type SettingsAppIncident struct {
	Installation PlatformAppInstallation   `json:"installation"`
	App          PlatformApp               `json:"app"`
	Block        PlatformAppManifestBlock  `json:"block"`
	Exposure     SettingsAppExposureReport `json:"exposure"`
}

type SettingsAppIncidentList struct {
	Incidents []SettingsAppIncident `json:"incidents"`
}

type SettingsAppInstallInput struct {
	// Version — Конкретная версия; последняя открытая не подразумевается
	Version string `json:"version"`
	// Approved — Согласие целиком: одобрить можно только запрошенное версией, и все её обязательные права обязаны войти сюда
	Approved []string `json:"approved"`
	// Reason — Уезжает в журнал установки
	Reason *string `json:"reason,omitempty"`
}

type SettingsAppInstallation struct {
	Installation PlatformAppInstallation  `json:"installation"`
	App          PlatformApp              `json:"app"`
	Publisher    SettingsAppPublisherCard `json:"publisher"`
	Version      SettingsAppVersion       `json:"version"`
	// Live — Издатель, приложение и версия не выключены платформой
	Live bool `json:"live"`
	// Updates — Версии, на которые кабинет вправе перейти сам, свежие первыми
	Updates []SettingsAppVersion `json:"updates"`
	// Slots — Места на экране, которые занимает текущая версия установки: адрес рамки, источник, размер и мост сообщений. Оболочка строит рамку до запроса токена запуска, поэтому объявление приезжает вместе со списком установок
	Slots  []SettingsAppDeclaredSlot `json:"slots,omitempty"`
	Health PlatformAppDeliveryHealth `json:"health"`
}

type SettingsAppInstallationPage struct {
	Installations []SettingsAppInstallation `json:"installations"`
}

// SettingsAppLocalizedText — Текст на двух языках, как он объявлен в манифесте; пустая половина означает, что издатель её не заполнил
type SettingsAppLocalizedText struct {
	Ru string `json:"ru"`
	En string `json:"en"`
}

// SettingsAppPublisherCard — Издатель глазами кабинета: без основания проверки, адреса на аварию и причин выключения
type SettingsAppPublisherCard struct {
	Slug         string `json:"slug"`
	LegalName    string `json:"legal_name"`
	Country      string `json:"country"`
	Homepage     string `json:"homepage"`
	ContactEmail string `json:"contact_email"`
	// Verified — Платформа подтвердила, что имя принадлежит названному юрлицу
	Verified bool `json:"verified"`
	// Live — Издатель не выключен платформой
	Live bool `json:"live"`
}

// SettingsAppVersion — Версия глазами кабинета: без манифеста целиком; лист согласия по версии отдаёт экран согласия
type SettingsAppVersion struct {
	ID      UUID                     `json:"id"`
	Version string                   `json:"version"`
	Status  PlatformAppVersionStatus `json:"status"`
	// Channel — Канал, объявленный манифестом; пусто, если манифест канал не назвал
	Channel     string                         `json:"channel"`
	ReleasedAt  *string                        `json:"released_at,omitempty"`
	Name        SettingsAppLocalizedText       `json:"name"`
	Description SettingsAppLocalizedText       `json:"description"`
	Permissions PlatformAppManifestPermissions `json:"permissions"`
}

type SettingsCompany struct {
	ID        UUID   `json:"id"`
	Name      string `json:"name"`
	LegalName string `json:"legal_name"`
	// INN — Пустой только у юрлица внутреннего учёта
	INN      string `json:"inn"`
	KPP      string `json:"kpp"`
	IsActive bool   `json:"is_active"`
	// IsInternal — Псевдо-юрлицо «Внутренний учёт» — контур неофициальных касс, одно на кабинет
	IsInternal bool `json:"is_internal"`
	// AccountingMethod — Метод учёта cash или accrual; на этой поверхности всегда приходит пустым, потому что накладка справочника его не переносит
	AccountingMethod string `json:"accounting_method"`
	// AccrualFrom — Дата перехода на accrual; на этой поверхности не приходит никогда
	AccrualFrom *string `json:"accrual_from,omitempty"`
}

type SettingsCompanyAccountingMethodInput struct {
	// Method — Значение приводится к нижнему регистру
	Method string `json:"method"`
	// AccrualFrom — Дата перехода на начисление; обязательна при accrual и не используется при cash
	AccrualFrom *string `json:"accrual_from,omitempty"`
}

type SettingsCompanyInput struct {
	// Name — Пробельное название отклоняется
	Name      string  `json:"name"`
	LegalName *string `json:"legal_name,omitempty"`
	// INN — Проверяется контрольной цифрой; пустой ИНН отклоняется
	INN string  `json:"inn"`
	KPP *string `json:"kpp,omitempty"`
}

type SettingsCompanyPage struct {
	// Count — Число отданных строк, страниц у справочника нет
	Count   int64             `json:"count"`
	Results []SettingsCompany `json:"results"`
}

type SettingsFieldDefinition struct {
	ID         UUID   `json:"id"`
	EntityType string `json:"entity_type"`
	Key        string `json:"key"`
	Label      string `json:"label"`
	Type       string `json:"type"`
	Required   bool   `json:"required"`
	Dictionary *UUID  `json:"dictionary"`
	Order      int64  `json:"order"`
	IsActive   bool   `json:"is_active"`
	Help       string `json:"help"`
	// CreatedAt — Отметка времени как её печатает Postgres, а не RFC 3339
	CreatedAt string `json:"created_at"`
	// UpdatedAt — Отметка времени как её печатает Postgres, а не RFC 3339
	UpdatedAt string `json:"updated_at"`
}

type SettingsFieldDefinitionInput struct {
	EntityType string `json:"entity_type"`
	Key        string `json:"key"`
	Label      string `json:"label"`
	// Type — Пустое значение подставляется как text
	Type     *string `json:"type,omitempty"`
	Required *bool   `json:"required,omitempty"`
	// Dictionary — Справочник значений для типа select
	Dictionary *UUID  `json:"dictionary,omitempty"`
	Order      *int64 `json:"order,omitempty"`
	// IsActive — Читается только при изменении; на заведении определение всегда действующее
	IsActive *bool   `json:"is_active,omitempty"`
	Help     *string `json:"help,omitempty"`
}

type SettingsFieldDefinitionPage struct {
	// Count — Число отданных строк, а не всего в базе; выборка обрезана 200 строками
	Count   int64                     `json:"count"`
	Results []SettingsFieldDefinition `json:"results"`
}

type SettingsFieldSchema struct {
	Fields []SettingsFieldDefinition `json:"fields"`
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
}

type SettingsMemberCreateInput struct {
	Username string `json:"username"`
	// Password — Уходит во внешний сервис входа и в ответе не повторяется
	Password string `json:"password"`
	// FirstName — Полное имя человека; в ответе это поле называется full_name
	FirstName *string `json:"first_name,omitempty"`
	// BirthDate — Строго ГГГГ-ММ-ДД; пустая строка означает «не указана»
	BirthDate *string `json:"birth_date,omitempty"`
	AvatarURL *string `json:"avatar_url,omitempty"`
	Role      *UUID   `json:"role,omitempty"`
	// CompanyScope — Умолчание — all
	CompanyScope *string `json:"company_scope,omitempty"`
	Companies    []UUID  `json:"companies,omitempty"`
}

type SettingsMemberPage struct {
	// Count — Число строк в results, а не общее число участников кабинета
	Count   int64            `json:"count"`
	Results []SettingsMember `json:"results"`
}

type SettingsMemberPatch struct {
	// Username — Меняется и во внешнем сервисе входа
	Username *string `json:"username,omitempty"`
	FullName *string `json:"full_name,omitempty"`
	// BirthDate — Строго ГГГГ-ММ-ДД; пустая строка снимает дату
	BirthDate *string `json:"birth_date,omitempty"`
	AvatarURL *string `json:"avatar_url,omitempty"`
	// Role — null или пустая строка снимают роль
	Role *UUID `json:"role,omitempty"`
	// CompanyScope — Пустая строка игнорируется
	CompanyScope *string `json:"company_scope,omitempty"`
	Companies    []UUID  `json:"companies,omitempty"`
	IsActive     *bool   `json:"is_active,omitempty"`
}

type SettingsRole struct {
	ID   UUID   `json:"id"`
	Name string `json:"name"`
	// IsAdmin — У административной роли permissions всегда равны ["*:*"]
	IsAdmin  bool `json:"is_admin"`
	IsActive bool `json:"is_active"`
	// Permissions — Право записывается как «модуль:действие», например settings:read
	Permissions []string `json:"permissions"`
	// RecordRules — Ключ — ресурс модуля; пустая карта означает видимость только своих записей
	RecordRules map[string]string `json:"record_rules"`
}

type SettingsRoleActivationInput struct {
	// IsActive — true включает роль, false отключает; это переключатель, а не одностороннее включение
	IsActive bool `json:"is_active"`
}

type SettingsRoleActivationResult struct {
	ID       UUID `json:"id"`
	IsActive bool `json:"is_active"`
}

type SettingsRoleInput struct {
	// Name — Пробелы по краям срезаются; пустое имя отклоняется
	Name string `json:"name"`
	// IsAdmin — Через этот маршрут остаётся false: административную роль создать или назначить нельзя
	IsAdmin *bool `json:"is_admin,omitempty"`
	// Permissions — Отсутствие поля равно пустому списку прав
	Permissions []string `json:"permissions,omitempty"`
	// RecordRules — Отсутствие поля равно пустой карте
	RecordRules map[string]string `json:"record_rules,omitempty"`
}

type SettingsRolePage struct {
	// Count — Число строк в results, а не общее число ролей кабинета
	Count   int64          `json:"count"`
	Results []SettingsRole `json:"results"`
}

type SettingsRoleTransferInput struct {
	// TargetRoleID — Действующая роль-получатель; обязательна, нулевой UUID отклоняется
	TargetRoleID UUID `json:"target_role_id"`
}

type SettingsRoleTransferResult struct {
	// Count — Сколько участников переставлено на целевую роль
	Count        int64 `json:"count"`
	TargetRoleID UUID  `json:"target_role_id"`
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

type StockBatch struct {
	ID                    UUID    `json:"id"`
	CompanyID             UUID    `json:"company_id"`
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

type StockCompanyRef struct {
	ID   UUID   `json:"id"`
	Name string `json:"name"`
}

type StockCompanyRefPage struct {
	Count   int64             `json:"count"`
	Results []StockCompanyRef `json:"results"`
}

type StockDocumentCreate struct {
	TypeKey StockDocumentCreateTypeKey `json:"type_key"`
	// Date — Пусто или отсутствует означает рабочую дату кабинета
	Date       *string           `json:"date,omitempty"`
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
	// UnitID — Физическая единица справочника
	UnitID *UUID `json:"unit_id,omitempty"`
	// ProductUomID — Товарная единица представления
	ProductUomID *UUID `json:"product_uom_id,omitempty"`
	// BaseQty — Количество в базовой единице номенклатуры; присланное значение обязано совпасть с серверным пересчётом
	BaseQty *string `json:"base_qty,omitempty"`
	// Price — Decimal string
	Price *string `json:"price,omitempty"`
	// Amount — Decimal string
	Amount      *string `json:"amount,omitempty"`
	BasisLineID *UUID   `json:"basis_line_id,omitempty"`
	// BasisDocumentID — Построчное происхождение, когда один заказ поставщику сводит несколько заявок
	BasisDocumentID         *UUID                                 `json:"basis_document_id,omitempty"`
	BatchCode               *string                               `json:"batch_code,omitempty"`
	ProducedAt              *string                               `json:"produced_at,omitempty"`
	ExpiresAt               *string                               `json:"expires_at,omitempty"`
	HandlingUnits           []StockDocumentLineHandlingUnit       `json:"handling_units,omitempty"`
	HandlingUnitAllocations []StockDocumentLineHandlingAllocation `json:"handling_unit_allocations,omitempty"`
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

// StockDocumentPayload — Содержимое складского документа. Разбор строгий — незнакомое поле отклоняется. У документа-факта, заявки, заказа и резерва `items` обязателен и не длиннее 1000 строк.
type StockDocumentPayload struct {
	Version    int64   `json:"version"`
	Reason     *string `json:"reason,omitempty"`
	DesiredAt  *string `json:"desired_at,omitempty"`
	DeliveryAt *string `json:"delivery_at,omitempty"`
	// ExpiresAt — Срок резерва; не раньше даты документа
	ExpiresAt *string             `json:"expires_at,omitempty"`
	Items     []StockDocumentLine `json:"items,omitempty"`
	// Amount — Decimal string; сумма накладных расходов
	Amount           *string                         `json:"amount,omitempty"`
	AllocationMethod *string                         `json:"allocation_method,omitempty"`
	Targets          []StockDocumentLandedCostTarget `json:"targets,omitempty"`
	// Posting — Разложение проведения по строкам и партиям, которое пишет сам движок
	Posting map[string]json.RawMessage `json:"posting,omitempty"`
}

// StockDocumentRefs — Ссылки шапки складского документа. Набор допустимых полей зависит от вида — перемещению нужны склад-отправитель и склад-получатель, инвентаризации только юрлицо и склад.
type StockDocumentRefs struct {
	Company       UUID  `json:"company"`
	Warehouse     *UUID `json:"warehouse,omitempty"`
	WarehouseFrom *UUID `json:"warehouse_from,omitempty"`
	WarehouseTo   *UUID `json:"warehouse_to,omitempty"`
	Contact       *UUID `json:"contact,omitempty"`
}

type StockDocumentTypeKey = string

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

type StockExportRequest struct {
	Kind   StockImportKind            `json:"kind"`
	Format *CoreProductTransferFormat `json:"format,omitempty"`
	// TargetDocumentID — Обязателен для всех видов, кроме reorder_rules
	TargetDocumentID *UUID `json:"target_document_id,omitempty"`
}

type StockHandlingUnit struct {
	ID                   UUID               `json:"id"`
	BatchID              UUID               `json:"batch_id"`
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
	IsDefaultReceipt     bool   `json:"is_default_receipt"`
	IsActive             bool   `json:"is_active"`
	UpdatedAt            string `json:"updated_at"`
}

type StockProductUOMInput struct {
	// ID — Без идентификатора заводится новая товарная единица
	ID           *UUID                 `json:"id,omitempty"`
	ProductID    UUID                  `json:"product_id"`
	Code         string                `json:"code"`
	Name         string                `json:"name"`
	InputUnitID  UUID                  `json:"input_unit_id"`
	Usage        *StockProductUOMUsage `json:"usage,omitempty"`
	FactorToBase string                `json:"factor_to_base"`
	// CreatesHandlingUnits — Требует единицы измерения с целой точностью
	CreatesHandlingUnits *bool `json:"creates_handling_units,omitempty"`
	IsDefaultReceipt     *bool `json:"is_default_receipt,omitempty"`
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

type StockReorderRule struct {
	ID          UUID   `json:"id"`
	CompanyID   UUID   `json:"company_id"`
	CompanyName string `json:"company_name"`
	ProductID   UUID   `json:"product_id"`
	ProductSKU  string `json:"product_sku"`
	ProductName string `json:"product_name"`
	// WarehouseID — null означает правило юрлица на все склады
	WarehouseID   *UUID  `json:"warehouse_id"`
	WarehouseName string `json:"warehouse_name"`
	// MinQty — Decimal string неснижаемого остатка
	MinQty string `json:"min_qty"`
	// MaxQty — Decimal string целевого остатка; null — потолок не задан
	MaxQty *string `json:"max_qty"`
	// OrderMultiple — Decimal string кратности заказа; null — кратность не задана
	OrderMultiple         *string `json:"order_multiple"`
	LeadTimeDays          int64   `json:"lead_time_days"`
	PreferredSupplierID   *UUID   `json:"preferred_supplier_id"`
	PreferredSupplierName string  `json:"preferred_supplier_name"`
	IsActive              bool    `json:"is_active"`
	UpdatedAt             string  `json:"updated_at"`
}

type StockReorderRuleInput struct {
	CompanyID UUID `json:"company_id"`
	// ProductID — Складская номенклатура — отдельный товар или вариант; семейство вариантов и услуга не принимаются
	ProductID UUID `json:"product_id"`
	// WarehouseID — Пропуск или null заводит правило юрлица на все склады
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

type StockReportDrilldown struct {
	ProductID UUID `json:"product_id"`
	// Count — Число движений регистра, а не строк отчёта
	Count   int64                       `json:"count"`
	Limit   int64                       `json:"limit"`
	Offset  int64                       `json:"offset"`
	Rows    []StockReportRow            `json:"rows"`
	Entries []StockReportDrilldownEntry `json:"entries"`
}

type StockReportDrilldownEntry struct {
	ID                UUID                       `json:"id"`
	RegistrarID       UUID                       `json:"registrar_id"`
	RegistrarNumber   string                     `json:"registrar_number"`
	RegistrarTypeKey  string                     `json:"registrar_type_key"`
	RegistrarTypeName string                     `json:"registrar_type_name"`
	RegistrarStatus   string                     `json:"registrar_status"`
	Date              string                     `json:"date"`
	Sign              int64                      `json:"sign"`
	Dims              map[string]json.RawMessage `json:"dims"`
	Values            map[string]json.RawMessage `json:"values"`
	Unit              string                     `json:"unit"`
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
	Count   int64            `json:"count"`
	Limit   int64            `json:"limit"`
	Offset  int64            `json:"offset"`
	Results []StockReportRow `json:"results"`
	Formula string           `json:"formula"`
}

type StockReportPurchasingPage struct {
	Count   int64                      `json:"count"`
	Results []StockReportPurchasingRow `json:"results"`
	Formula string                     `json:"formula"`
}

type StockReportPurchasingRow struct {
	CompanyID     UUID   `json:"company_id"`
	CompanyName   string `json:"company_name"`
	WarehouseID   *UUID  `json:"warehouse_id"`
	WarehouseCode string `json:"warehouse_code"`
	WarehouseName string `json:"warehouse_name"`
	ProductID     UUID   `json:"product_id"`
	ProductSKU    string `json:"product_sku"`
	ProductName   string `json:"product_name"`
	Unit          string `json:"unit"`
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
	// SuggestedQty — Decimal string
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
	RemainingQty string                       `json:"remaining_qty"`
	State        string                       `json:"state"`
	IsOverdue    bool                         `json:"is_overdue"`
	Lines        []StockReportReservationLine `json:"lines"`
}

type StockReportRow struct {
	CompanyID     UUID   `json:"company_id"`
	CompanyName   string `json:"company_name"`
	WarehouseID   UUID   `json:"warehouse_id"`
	WarehouseCode string `json:"warehouse_code"`
	WarehouseName string `json:"warehouse_name"`
	ProductID     UUID   `json:"product_id"`
	ProductSKU    string `json:"product_sku"`
	ProductName   string `json:"product_name"`
	Unit          string `json:"unit"`
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
	// Amount — Decimal string
	Amount string `json:"amount"`
	// UnitCost — Decimal string
	UnitCost   string `json:"unit_cost"`
	EntryCount int64  `json:"entry_count"`
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
	AutoCancelExpiredReservations bool   `json:"auto_cancel_expired_reservations"`
	DefaultReservationDays        int64  `json:"default_reservation_days"`
	UpdatedAt                     string `json:"updated_at"`
}

type StockSettingsPatch struct {
	BlockShipmentOverFree         *bool  `json:"block_shipment_over_free,omitempty"`
	BlockReservationOverAvailable *bool  `json:"block_reservation_over_available,omitempty"`
	AutoCancelExpiredReservations *bool  `json:"auto_cancel_expired_reservations,omitempty"`
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
	// CompanyIds — Пустой список означает доступность склада всем активным юрлицам кабинета
	CompanyIds []UUID `json:"company_ids"`
	CreatedAt  string `json:"created_at"`
	UpdatedAt  string `json:"updated_at"`
}

type StockWarehouseBlocker struct {
	Register  string `json:"register"`
	CompanyID UUID   `json:"company_id"`
	ProductID UUID   `json:"product_id"`
	// Quantity — Ненулевой остаток decimal
	Quantity string `json:"quantity"`
}

type StockWarehouseBlockerCheck struct {
	Allowed  bool                    `json:"allowed"`
	Blockers []StockWarehouseBlocker `json:"blockers"`
}

type StockWarehouseInput struct {
	// Code — Приводится к верхнему регистру
	Code                  string                     `json:"code"`
	Name                  string                     `json:"name"`
	ParentID              *UUID                      `json:"parent_id,omitempty"`
	Address               map[string]json.RawMessage `json:"address,omitempty"`
	ResponsibleEmployeeID *UUID                      `json:"responsible_employee_id,omitempty"`
	SortOrder             *int64                     `json:"sort_order,omitempty"`
	CompanyIds            []UUID                     `json:"company_ids,omitempty"`
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
	CompanyIds            []UUID                     `json:"company_ids,omitempty"`
}

type Subtask struct {
	ID             UUID    `json:"id"`
	Identifier     string  `json:"identifier"`
	Title          string  `json:"title"`
	StatusCategory *string `json:"status_category"`
	ExecutorName   *string `json:"executor_name"`
	DueAt          *string `json:"due_at"`
}

type Tag struct {
	ID          UUID   `json:"id"`
	Project     *UUID  `json:"project"`
	Name        string `json:"name"`
	Color       string `json:"color"`
	Description string `json:"description"`
	IsArchived  bool   `json:"is_archived"`
}

// TagAttach — Передайте `tag_id` существующей метки либо `name` для создания новой.
type TagAttach struct {
	TagID *UUID   `json:"tag_id,omitempty"`
	Name  *string `json:"name,omitempty"`
	Color *string `json:"color,omitempty"`
}

type TagPage struct {
	Count   int64 `json:"count"`
	Results []Tag `json:"results"`
}

type Task struct {
	ID                 UUID                         `json:"id"`
	Identifier         string                       `json:"identifier"`
	Section            *UUID                        `json:"section"`
	SectionKey         *string                      `json:"section_key"`
	SectionName        *string                      `json:"section_name"`
	Title              string                       `json:"title"`
	Description        string                       `json:"description"`
	Status             *UUID                        `json:"status"`
	StatusName         *string                      `json:"status_name"`
	StatusCategory     *string                      `json:"status_category"`
	Priority           TaskPriority                 `json:"priority"`
	IsImportant        bool                         `json:"is_important"`
	Creator            *int64                       `json:"creator"`
	CreatorName        *string                      `json:"creator_name"`
	Executor           *int64                       `json:"executor"`
	ExecutorName       *string                      `json:"executor_name"`
	Assignee           *int64                       `json:"assignee,omitempty"`
	AssigneeName       *string                      `json:"assignee_name,omitempty"`
	Coexecutors        []TaskWatcher                `json:"coexecutors"`
	Cycle              *UUID                        `json:"cycle"`
	CycleName          *string                      `json:"cycle_name"`
	StartAt            *string                      `json:"start_at"`
	CreatedAt          string                       `json:"created_at"`
	DueAt              *string                      `json:"due_at"`
	Estimate           *float64                     `json:"estimate"`
	SortOrder          float64                      `json:"sort_order"`
	IsArchived         bool                         `json:"is_archived"`
	Parent             *UUID                        `json:"parent"`
	ParentIdentifier   *string                      `json:"parent_identifier"`
	ParentTitle        *string                      `json:"parent_title"`
	Recurrence         string                       `json:"recurrence"`
	RecurrenceInterval int64                        `json:"recurrence_interval"`
	RecurrenceUntil    *string                      `json:"recurrence_until"`
	Custom             map[string]json.RawMessage   `json:"custom"`
	Watchers           []TaskWatcher                `json:"watchers"`
	Subtasks           []Subtask                    `json:"subtasks"`
	SubtasksTotal      int64                        `json:"subtasks_total"`
	SubtasksDone       int64                        `json:"subtasks_done"`
	Tags               []TaskTag                    `json:"tags"`
	Links              []map[string]json.RawMessage `json:"links"`
	CommentsCount      int64                        `json:"comments_count"`
	BlockedByCount     int64                        `json:"blocked_by_count"`
}

type TaskCreate struct {
	Section            UUID                       `json:"section"`
	Title              string                     `json:"title"`
	Description        *string                    `json:"description,omitempty"`
	Status             *UUID                      `json:"status,omitempty"`
	Priority           *TaskPriority              `json:"priority,omitempty"`
	IsImportant        *bool                      `json:"is_important,omitempty"`
	Creator            *int64                     `json:"creator,omitempty"`
	Executor           *int64                     `json:"executor,omitempty"`
	Assignee           *int64                     `json:"assignee,omitempty"`
	CoexecutorIds      []int64                    `json:"coexecutor_ids,omitempty"`
	WatcherIds         []int64                    `json:"watcher_ids,omitempty"`
	TagIds             []UUID                     `json:"tag_ids,omitempty"`
	StartAt            *string                    `json:"start_at,omitempty"`
	DueAt              *string                    `json:"due_at,omitempty"`
	Estimate           *float64                   `json:"estimate,omitempty"`
	Parent             *UUID                      `json:"parent,omitempty"`
	Recurrence         *string                    `json:"recurrence,omitempty"`
	RecurrenceInterval *int64                     `json:"recurrence_interval,omitempty"`
	RecurrenceUntil    *string                    `json:"recurrence_until,omitempty"`
	Cycle              *string                    `json:"cycle,omitempty"`
	Custom             map[string]json.RawMessage `json:"custom,omitempty"`
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

type TaskTemplateUpdate struct {
	Section            *UUID                      `json:"section,omitempty"`
	Status             *UUID                      `json:"status,omitempty"`
	Name               *string                    `json:"name,omitempty"`
	Title              *string                    `json:"title,omitempty"`
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

type TaskUpdate struct {
	Title              *string                    `json:"title,omitempty"`
	Description        *string                    `json:"description,omitempty"`
	Section            *UUID                      `json:"section,omitempty"`
	Status             *UUID                      `json:"status,omitempty"`
	Priority           *TaskPriority              `json:"priority,omitempty"`
	IsImportant        *bool                      `json:"is_important,omitempty"`
	Executor           *int64                     `json:"executor,omitempty"`
	Assignee           *int64                     `json:"assignee,omitempty"`
	CoexecutorIds      []int64                    `json:"coexecutor_ids,omitempty"`
	WatcherIds         []int64                    `json:"watcher_ids,omitempty"`
	TagIds             []UUID                     `json:"tag_ids,omitempty"`
	StartAt            *string                    `json:"start_at,omitempty"`
	DueAt              *string                    `json:"due_at,omitempty"`
	Estimate           *float64                   `json:"estimate,omitempty"`
	Parent             *UUID                      `json:"parent,omitempty"`
	Recurrence         *string                    `json:"recurrence,omitempty"`
	RecurrenceInterval *int64                     `json:"recurrence_interval,omitempty"`
	RecurrenceUntil    *string                    `json:"recurrence_until,omitempty"`
	Cycle              *string                    `json:"cycle,omitempty"`
	Custom             map[string]json.RawMessage `json:"custom,omitempty"`
	ManagedChecklist   *ManagedChecklistPatch     `json:"managed_checklist,omitempty"`
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

type TasksSnapshot struct {
	FetchedAt    string               `json:"fetched_at"`
	Revision     string               `json:"revision"`
	Projects     []Project            `json:"projects"`
	Sections     []Section            `json:"sections"`
	Statuses     []Status             `json:"statuses"`
	Tags         []TaskTagCatalogItem `json:"tags"`
	Members      []Member             `json:"members"`
	Views        []TaskView           `json:"views"`
	Cycles       []Cycle              `json:"cycles"`
	Tasks        []Task               `json:"tasks"`
	TasksLimit   *int64               `json:"tasks_limit,omitempty"`
	TasksHasMore bool                 `json:"tasks_has_more"`
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

type UUID = string

type WorkflowStatusUpdate struct {
	Name      *string         `json:"name,omitempty"`
	Category  *StatusCategory `json:"category,omitempty"`
	Color     *string         `json:"color,omitempty"`
	Order     *int64          `json:"order,omitempty"`
	IsDefault *bool           `json:"is_default,omitempty"`
	IsFinal   *bool           `json:"is_final,omitempty"`
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
