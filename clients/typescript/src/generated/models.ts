/*
 * Сгенерировано scripts/generate.py. Руками не править.
 * Источник: snapshot/openapi/akeda-v1.json (контракт 0.21.0-core-public, sha256 3b4e5818e72cb98786a0f06776813205755d9e95e5752df061d59d58c0db6522).
 * Рантайм клиента написан руками и живёт рядом; здесь только типы.
 */

export interface Activity {
  "id": UUID;
  "action": string;
  "actor_name": string | null;
  "created_at": string;
}

export type ActivityList = Array<Activity>;

/** Ответ расширению. Ровно то, что оно прислало само, плюс идентификатор строки и её состояние: ни назначения платежа, ни суммы, ни имени статьи здесь нет — иначе право писать рекомендации стало бы правом читать операции. */
export interface AppFinanceClassificationSuggestionAccepted {
  "suggestion_id": UUID;
  "transaction": UUID;
  /** pending, пока человек не решил. Повторный ответ той же установки на ту же операцию обновляет строку, а не заводит вторую */
  "status": "pending" | "accepted" | "rejected";
  "updated_at": string;
}

/** Ответ расширения на точку finance.classification_provider.v1. Автора в теле нет: установка, приложение и версия берутся из токена — иначе первое же расширение подписало бы рекомендацию соседним. */
export interface AppFinanceClassificationSuggestionInput {
  /** Статья ДДС ссылкой. Ключ справочника — core.items; статья, не участвующая в ДДС, отклоняется кодом directory_entry_unknown */
  "cashflow_item": AppFinanceClassificationSuggestionInputCashflowItem;
  /** Контрагент ссылкой, ключ справочника core.contacts. Необязателен: у половины операций он уже проставлен банком */
  "contact"?: AppFinanceDirectoryRef | null;
  /** Доля единицы, не проценты. Значение вне диапазона отклоняется кодом confidence_out_of_range: приславший 87 имел в виду проценты, и принять это молча значит показать человеку уверенность 8700 %. */
  "confidence": number;
  /** Обе половины обязательны — кабинет с английским интерфейсом не должен читать объяснение по-русски */
  "explanation": AppFinanceClassificationSuggestionInputExplanation;
}

/** Статья ДДС ссылкой. Ключ справочника — core.items; статья, не участвующая в ДДС, отклоняется кодом directory_entry_unknown */
export interface AppFinanceClassificationSuggestionInputCashflowItem {
  /** Полное имя справочника: core.items или core.contacts */
  "directory_key": string;
  "id": UUID;
}

/** Обе половины обязательны — кабинет с английским интерфейсом не должен читать объяснение по-русски */
export interface AppFinanceClassificationSuggestionInputExplanation {
  "ru": string;
  "en": string;
}

/** Ссылка на запись справочника: ключ и идентификатор. Голый UUID здесь не принимается — он доказывает, что строка есть, и ничего не говорит о том, из какого она справочника и чья. Ключ не тот — отказ directory_mismatch, записи нет в этом кабинете — directory_entry_unknown. */
export interface AppFinanceDirectoryRef {
  /** Полное имя справочника: core.items или core.contacts */
  "directory_key": string;
  "id": UUID;
}

export interface AppRuntimeConfig {
  "values": Array<AppRuntimeConfigValue>;
  /** Обязательные поля манифеста без значения. Непустой список означает «не настроено», а не «сломано» */
  "missing": Array<string>;
}

export interface AppRuntimeConfigValue {
  "key": string;
  /** Как значение ХРАНИТСЯ. Истина означает, что value пуст и остаётся пустым: за значением идут краткосрочной выдачей */
  "secret": boolean;
  /** Просит ли эту настройку версия, которая стоит сейчас; ложь означает значение от прошлой версии */
  "declared": boolean;
  /** Значение задано */
  "set": boolean;
  /** Значение ОБЫЧНОЙ настройки. У секрета отсутствует всегда */
  "value"?: string;
  "updated_at"?: string;
}

export interface AppRuntimeInstallation {
  "tenant": AppRuntimeTenant;
  "installation_id": UUID;
  "status": "pending" | "active" | "suspended" | "revoked";
  /** Пространство имён приложения app.<издатель>.<ключ> — единственное, в котором оно вправе объявлять свои справочники */
  "namespace": string;
  "publisher": string;
  "key": string;
  /** Версия, которая стоит у кабинета сейчас; её манифест и режет права */
  "version": string;
  /** Действующий набор: пересечение одобренного кабинетом, объявленного версией и записанного в токен */
  "scopes": Array<string>;
  /** Куда Akeda везёт события этой установки. Только чтение: сменить адрес через внешний контур нельзя, это делает персонал платформы по заявке издателя */
  "delivery_endpoint_url": string;
  "token_id": UUID;
  /** Когда предъявленный токен перестанет работать */
  "token_expires_at": string;
}

export interface AppRuntimeLease {
  "key": string;
  /** Значение секрета. Уходит вызывающему один раз и не возвращается больше никаким ответом */
  "value": string;
  "issued_at": string;
  /** Контракт «после этого забирай заново». Срок платформа на чужой стороне не исполняет: работают журнал обращений и отзыв установки */
  "expires_at": string;
  "audit_id": UUID;
}

export interface AppRuntimeLeaseInput {
  /** Запрошенный срок выдачи. Ноль или отсутствие поля означают умолчание сервера (пять минут), значение сверх потолка — отказ */
  "ttl_seconds"?: number;
}

/** Человек, открывший панель, в том объёме, в каком приложению позволено его знать. Полей ровно три, и четвёртого не появится: имя и почта — это штат клиента, роли — его оргструктура, а числовой идентификатор общий на всю платформу и связал бы два кабинета между собой. */
export interface AppRuntimeSlotActor {
  /** Псевдоним, свой у каждой пары «установка + человек». Устойчив внутри установки, поэтому панель помнит выбор сотрудника; в другой установке того же приложения у того же человека он ДРУГОЙ; умирает вместе с установкой */
  "subject": UUID;
  /** Язык интерфейса человека: слот обязан показывать текст на русском и английском, и без языка он показал бы не тот */
  "locale": "ru" | "en";
  /** Тема кабинета. Слот, объявивший themeAware, без неё исполнить объявленное не может */
  "theme": "light" | "dark";
}

/** Экран и запись, рядом с которыми стоит слот. Модуль назван всегда — по нему считается право ЧЕЛОВЕКА на запуск; вид и запись есть только у слота, стоящего на карточке. Само содержимое записи здесь не приезжает: читать её приложение идёт в public API своими одобренными scopes. */
export interface AppRuntimeSlotAnchor {
  /** Модуль экрана, с которого открыли панель */
  "module": string;
  /** Вид записи. Отсутствует у слота без карточки */
  "entity"?: string;
  /** Идентификатор записи: uuid, код или номер документа */
  "entity_id"?: string;
}

export interface AppRuntimeSlotLaunch {
  "tenant": AppRuntimeTenant;
  "installation_id": UUID;
  /** Ключ слота с версией: место на экране, откуда открыли панель */
  "slot": string;
  /** Тот же nonce, что прислала страница: по нему сервер расширения связывает погашенный запуск с конкретной рамкой, не веря на слово ей самой */
  "nonce": string;
  "actor": AppRuntimeSlotActor;
  "anchor": AppRuntimeSlotAnchor;
  /** Источник, из которого оболочка загрузила рамку. Пусто, если кабинет успел обновить приложение на версию без этого слота: запуск был разрешён по прежнему объявлению и обрывать его незачем */
  "origin": string;
  "issued_at": string;
  "redeemed_at": string;
  /** Строка журнала установки об этом погашении */
  "audit_id": UUID;
}

export interface AppRuntimeSlotLaunchInput {
  /** Одноразовый токен запуска (`al_…`), который оболочка передала странице сообщением akeda.slot.launch. Учётными данными не является: без токена установки он не открывает ничего */
  "token": string;
  /** Значение, которое страница расширения придумала сама и прислала оболочке сообщением akeda.slot.ready. Секретом не является — оно доказывает, что запуск отвечает именно на этот запрос страницы */
  "nonce": string;
}

export interface AppRuntimeTenant {
  "id": UUID;
  /** Канонический slug кабинета из справочника, а не строка заголовка; его же ставят в X-Tenant следующего запроса */
  "slug": string;
}

export interface ArchiveTransfer {
  "target_section"?: UUID;
}

export interface Attachment {
  "id": UUID;
  "owner_type": string;
  "owner_id": UUID;
  "folder_id": UUID | null;
  "name": string;
  "mime_type": string;
  "size_bytes": number;
  "kind": string;
  "url": string;
  "content_path": string;
  "public_url": string;
  "markdown": string;
  "uploaded_by": number | null;
  "uploader": string;
  "created_at": string;
}

export interface AttachmentDownloadSession {
  "attachment": Attachment;
  "url": string;
  "method": string;
  "headers"?: { [key: string]: string };
  "expires_at": string;
}

export interface AttachmentMove {
  "folder_id": string | null;
}

export type AttachmentOwnerType = "task" | "section" | "project" | "comment" | "meeting" | "document";

export interface AttachmentPage {
  "count": number;
  "results": Array<Attachment>;
}

export interface AttachmentReplacementSessionCreate {
  "filename": string;
  "mime_type"?: string;
  "size_bytes": number;
  "sha256"?: string;
}

export interface AttachmentUploadSession {
  "id": UUID;
  "attachment_id": UUID;
  "replace_attachment_id"?: UUID;
  "owner_type": AttachmentOwnerType;
  "owner_id": UUID;
  "uploaded_by": number;
  "name": string;
  "mime_type": string;
  "size_bytes": number;
  "sha256"?: string;
  "status": string;
  "expires_at": string;
  "completed_at"?: string;
  "created_at": string;
  "upload_url"?: string;
  "method"?: string;
  "headers"?: { [key: string]: string };
  "fields"?: { [key: string]: string };
  "file_field"?: string;
  "max_bytes"?: number;
}

export interface AttachmentUploadSessionCreate {
  "owner_type": AttachmentOwnerType;
  "owner_id": UUID;
  "filename": string;
  "mime_type"?: string;
  "size_bytes": number;
  "sha256"?: string;
}

/** Лента только дописывается */
export interface CRMActivity {
  "id": UUID;
  "entity_type": "lead" | "deal";
  "entity_id": UUID;
  /** Ключ факта; note - заметка сотрудника */
  "action": string;
  "details": { [key: string]: unknown } | null;
  "actor_id": number;
  "actor_name"?: string;
  "created_at": string;
}

/** Живая витрина по всему кабинету; суммы в валюте сделки */
export interface CRMAnalytics {
  "stages": Array<CRMStageMetric> | null;
  "conversion": CRMConversionMetric;
  /** Сумма открытых сделок, взвешенная вероятностью */
  "weighted_forecast": number;
  "loss_reasons": Array<CRMLossReasonMetric> | null;
  "sla": CRMSLAMetric;
  "manager_workload": Array<CRMManagerWorkload> | null;
  "lead_sources": Array<CRMSourceMetric> | null;
}

export interface CRMAutomationAction {
  "type": "assign_owner" | "create_task" | "create_event" | "internal_notification";
  /** Обязателен для assign_owner */
  "owner_id"?: number;
  /** Обязателен для create_task и create_event */
  "title"?: string;
  "description"?: string;
  "section_id"?: UUID;
  "starts_at"?: string;
  "ends_at"?: string;
  "timezone"?: string;
}

export interface CRMAutomationActionJournal {
  "action_index": number;
  "status": "success" | "failed" | "skipped";
  "detail": string;
  "created_at": string;
  "updated_at": string;
}

export type CRMAutomationEventType = "lead.created" | "lead.qualified" | "deal.created" | "deal.stage_changed" | "inbox.message_received";

export interface CRMAutomationRule {
  "id": UUID;
  "name": string;
  "event_type": CRMAutomationEventType;
  /** Допустимые ключи - status, stage_id, owner_id */
  "conditions": { [key: string]: string } | null;
  "actions": Array<CRMAutomationAction> | null;
  "is_enabled": boolean;
  "created_by": number;
  "created_at": string;
  "updated_at": string;
}

export interface CRMAutomationRuleInput {
  "name": string;
  "event_type": CRMAutomationEventType;
  "conditions"?: { [key: string]: string } | null;
  "actions": Array<CRMAutomationAction>;
  "is_enabled"?: boolean;
}

export interface CRMAutomationRun {
  "id": UUID;
  "rule_id": UUID;
  "event_id": UUID;
  "status": "queued" | "running" | "success" | "failed" | "skipped";
  "attempts": number;
  "action_errors": Array<string> | null;
  "created_at": string;
  "updated_at": string;
}

/** Узкая проекция карточки справочника ERP; CRM её не редактирует */
export interface CRMContactRef {
  "id": UUID;
  "name": string;
  "legal_name"?: string;
  "entity_type": string;
  "is_active": boolean;
  /** false, когда карточка недоступна текущему пользователю */
  "available": boolean;
}

export interface CRMConversionMetric {
  "qualified_leads": number;
  "converted_leads": number;
  "rate": number;
}

export interface CRMConvertLeadInput {
  "pipeline_id": UUID;
  "stage_id": UUID;
  "title": string;
  "amount"?: number;
  "currency"?: string;
  "probability"?: number;
  "expected_close_at"?: string | null;
}

export interface CRMCreateEventLinkInput {
  "title": string;
  "description"?: string;
  "starts_at": string;
  "ends_at": string;
  /** IANA-зона события */
  "timezone"?: string;
}

export interface CRMCreateHubMeetingInput {
  "project_id": string;
  "calendar_event_id": UUID;
  "title"?: string;
  "starts_at"?: string;
}

export interface CRMCreateTaskLinkInput {
  "section_id": UUID;
  "title": string;
  "description"?: string;
  "due_at"?: string | null;
}

export interface CRMCustomer {
  "id": UUID;
  "kind": "person" | "company";
  "name": string;
  "legal_name": string;
  "phone": string;
  "email": string;
  /** Ник или номер клиента по мессенджерам */
  "messengers": { [key: string]: string } | null;
  "tags": Array<string> | null;
  "source": string;
  "owner_id"?: number;
  "owner_name"?: string;
  "note": string;
  "core_contact_id"?: UUID;
  /** Момент переноса в справочник контрагентов ERP */
  "promoted_at"?: string;
  "archived_at"?: string;
  "open_deals": number;
  "created_at": string;
  "updated_at": string;
}

export interface CRMCustomerDuplicate {
  "id": UUID;
  "kind": "person" | "company";
  "name": string;
  "legal_name": string;
  "phone": string;
  "email": string;
  /** Ник или номер клиента по мессенджерам */
  "messengers": { [key: string]: string } | null;
  "tags": Array<string> | null;
  "source": string;
  "owner_id"?: number;
  "owner_name"?: string;
  "note": string;
  "core_contact_id"?: UUID;
  /** Момент переноса в справочник контрагентов ERP */
  "promoted_at"?: string;
  "archived_at"?: string;
  "open_deals": number;
  "created_at": string;
  "updated_at": string;
  "matched_by": "name" | "phone";
}

export interface CRMCustomerInput {
  "kind"?: "person" | "company";
  "name": string;
  "legal_name"?: string;
  "phone"?: string;
  "email"?: string;
  "messengers"?: { [key: string]: string } | null;
  "tags"?: Array<string> | null;
  "source"?: string;
  "owner_id"?: number | null;
  "note"?: string;
}

export interface CRMCustomerPatch {
  "kind"?: "person" | "company";
  "name"?: string;
  "legal_name"?: string;
  "phone"?: string;
  "email"?: string;
  "messengers"?: { [key: string]: string } | null;
  "tags"?: Array<string> | null;
  "source"?: string;
  "owner_id"?: number | null;
  "note"?: string;
  "archived"?: boolean;
}

export interface CRMDeal {
  "id": UUID;
  "pipeline_id": UUID;
  "stage_id": UUID;
  "title": string;
  "amount": number;
  /** Код валюты из справочника ERP */
  "currency": string;
  /** Канал обращения; manual для ручного заведения */
  "source": string;
  "probability": number;
  "expected_close_at"?: string;
  "owner_id"?: number;
  "customer_id"?: UUID;
  "crm_customer_id"?: UUID;
  "next_action": string;
  "next_action_at"?: string;
  "archived_at"?: string;
  "closed_at"?: string;
  "loss_reason_id"?: UUID;
  "created_at": string;
  "updated_at": string;
}

export interface CRMDealBoard {
  "pipeline_id": UUID;
  "accounting_currency"?: string;
  /** false означает, что итоги в валюте учёта неполные */
  "totals_available": boolean;
  "missing_rates": Array<string> | null;
  "stages": Array<CRMDealBoardStage> | null;
}

export interface CRMDealBoardStage {
  "stage": CRMStage;
  "total_count": number;
  /** Суммы по валютам сделок колонки */
  "original_totals": { [key: string]: number } | null;
  /** Сумма в валюте учёта; отсутствует при неполном покрытии курсами */
  "amount_in_accounting"?: number;
  "weighted_in_accounting"?: number;
  "cards": Array<CRMDealCard> | null;
  "has_more": boolean;
}

export interface CRMDealCard {
  "id": UUID;
  "pipeline_id": UUID;
  "stage_id": UUID;
  "title": string;
  "amount": number;
  /** Код валюты из справочника ERP */
  "currency": string;
  /** Канал обращения; manual для ручного заведения */
  "source": string;
  "probability": number;
  "expected_close_at"?: string;
  "owner_id"?: number;
  "customer_id"?: UUID;
  "crm_customer_id"?: UUID;
  "next_action": string;
  "next_action_at"?: string;
  "archived_at"?: string;
  "closed_at"?: string;
  "loss_reason_id"?: UUID;
  "created_at": string;
  "updated_at": string;
  "customer_name"?: string;
  "owner_name"?: string;
}

export interface CRMDealContact {
  "id": UUID;
  "deal_id": UUID;
  "contact_id": UUID;
  "is_primary": boolean;
  "created_at": string;
}

export interface CRMDealContactInput {
  "contact_id": UUID;
  "is_primary"?: boolean;
}

export interface CRMDealInput {
  "pipeline_id": UUID;
  "stage_id": UUID;
  "title": string;
  "amount"?: number;
  /** Обязателен при ненулевой сумме */
  "currency"?: string;
  "source"?: string;
  "probability"?: number;
  "expected_close_at"?: string | null;
  "owner_id"?: number | null;
  "customer_id"?: string | null;
  "crm_customer_id"?: string | null;
  "next_action"?: string;
  "next_action_at"?: string | null;
}

export interface CRMDealItem {
  "id": UUID;
  "deal_id": UUID;
  "position": number;
  "name": string;
  /** Ссылка на номенклатуру необязательна - на этапе расчёта половина строк ещё не заведена в каталоге */
  "product_id"?: UUID;
  "quantity": number;
  "unit": string;
  /** В тех же единицах, что и сумма сделки */
  "price": number;
  "discount_percent": number;
  /** Сумма строки со скидкой; считает сервер, чтобы клиенты не разошлись на округлении */
  "total": number;
  "created_at": string;
  "updated_at": string;
}

export interface CRMDealItemInput {
  "name": string;
  "product_id"?: string | null;
  "quantity": number;
  "unit"?: string;
  "price"?: number;
  "discount_percent"?: number;
}

export interface CRMDealPatch {
  "title"?: string;
  "amount"?: number;
  "currency"?: string;
  "source"?: string;
  "probability"?: number;
  "expected_close_at"?: string | null;
  "owner_id"?: number | null;
  "customer_id"?: string | null;
  "crm_customer_id"?: string | null;
  "next_action"?: string;
  "next_action_at"?: string | null;
  "archived"?: boolean;
}

export interface CRMDealStageHistory {
  "id": UUID;
  "deal_id": UUID;
  "from_stage_id"?: UUID;
  "to_stage_id": UUID;
  "changed_by": number;
  "created_at": string;
}

export interface CRMEngagement {
  "id": UUID;
  "entity_type": "lead" | "deal";
  "entity_id": UUID;
  "kind": CRMEngagementKind;
  "title": string;
  "due_at"?: string;
  /** Пусто, пока дело не выполнено */
  "done_at"?: string;
  "owner_id"?: number;
  "owner_name"?: string;
  "created_by": number;
  "created_at": string;
  "updated_at": string;
}

export interface CRMEngagementInput {
  "kind"?: CRMEngagementKind;
  "title": string;
  "due_at"?: string | null;
  /** По умолчанию - вызывающий сотрудник */
  "owner_id"?: number | null;
}

export type CRMEngagementKind = "call" | "meeting" | "measurement" | "email" | "task";

export interface CRMEngagementPatch {
  "kind"?: CRMEngagementKind;
  "title"?: string;
  "due_at"?: string | null;
  "owner_id"?: number | null;
  /** true закрывает дело, false возвращает в работу */
  "done"?: boolean;
}

/** Указатель CRM на запись другого модуля; владельцем записи остаётся тот модуль */
export interface CRMExternalLink {
  "id": UUID;
  "entity_type": "lead" | "deal";
  "entity_id": UUID;
  "link_type": "task" | "calendar_event" | "hub_meeting";
  "external_id": UUID;
  "created_at": string;
}

export interface CRMInboxAssignInput {
  /** null снимает назначение */
  "assigned_to"?: number | null;
}

export interface CRMInboxAttachment {
  "id": UUID;
  "message_id": UUID;
  "filename": string;
  "content_type": string;
  "size_bytes": number;
  "created_at": string;
}

export interface CRMInboxConnection {
  "id": UUID;
  /** Публичный идентификатор для адреса вебхука провайдера */
  "public_id": UUID;
  "provider": "telegram" | "vk" | "max" | "avito" | "email" | "telephony";
  "name": string;
  "status": "active" | "disabled" | "error";
  "settings": { [key: string]: unknown } | null;
  /** Сами учётные данные не возвращаются никогда */
  "credentials_configured": boolean;
  "checked_at"?: string;
  "last_error_code"?: string;
  "created_at": string;
  "updated_at": string;
}

export interface CRMInboxConnectionCheck {
  "ok": boolean;
  "status": "active" | "disabled" | "error";
  "error_code"?: string;
}

export interface CRMInboxConnectionInput {
  "name": string;
  "provider": "telegram" | "vk" | "max" | "avito" | "email" | "telephony";
  /** Поля из каталога провайдера; хранятся зашифрованными */
  "credentials"?: { [key: string]: string } | null;
  "settings"?: { [key: string]: unknown } | null;
  /** Историческое поле Telegram; равнозначно credentials.bot_token */
  "bot_token"?: string;
  "webhook_secret"?: string;
}

export interface CRMInboxConnectionPatch {
  "name"?: string;
  /** Пустое значение сохраняет уже записанный секрет */
  "credentials"?: { [key: string]: string } | null;
  "settings"?: { [key: string]: unknown } | null;
}

export interface CRMInboxConversation {
  "id": UUID;
  "connection_id": UUID;
  "external_identity_id": UUID;
  "external_chat_id": string;
  "subject": string;
  "assigned_to"?: number;
  "unread_count": number;
  "sla_due_at"?: string;
  "status": CRMInboxConversationStatus;
  "last_message_at"?: string;
  "created_at": string;
  "updated_at": string;
}

export interface CRMInboxConversationLink {
  "id": UUID;
  "conversation_id": UUID;
  "entity_type": "lead" | "deal";
  "entity_id": UUID;
  "created_at": string;
}

export type CRMInboxConversationStatus = "open" | "closed";

export interface CRMInboxDealInput {
  "title": string;
  "pipeline_id": UUID;
  "stage_id": UUID;
  "amount"?: number;
  "currency"?: string;
}

export interface CRMInboxEntityMessage {
  "id": UUID;
  "conversation_id": UUID;
  "direction": "inbound" | "outbound" | "system";
  "provider_message_id"?: string;
  "body": string;
  "status": "queued" | "received" | "sent" | "delivered" | "failed";
  "sent_by"?: number;
  "created_at": string;
  "provider": string;
  "connection_name": string;
}

export interface CRMInboxLinkConversationInput {
  "conversation_id": UUID;
}

export interface CRMInboxLinkedConversation {
  "id": UUID;
  "connection_id": UUID;
  "external_identity_id": UUID;
  "external_chat_id": string;
  "subject": string;
  "assigned_to"?: number;
  "unread_count": number;
  "sla_due_at"?: string;
  "status": CRMInboxConversationStatus;
  "last_message_at"?: string;
  "created_at": string;
  "updated_at": string;
  "provider": string;
  "connection_name": string;
}

export interface CRMInboxMessage {
  "id": UUID;
  "conversation_id": UUID;
  "direction": "inbound" | "outbound" | "system";
  "provider_message_id"?: string;
  "body": string;
  "status": "queued" | "received" | "sent" | "delivered" | "failed";
  "sent_by"?: number;
  "created_at": string;
}

export interface CRMInboxOutboundUpload {
  "id": UUID;
  "conversation_id": UUID;
  "filename": string;
  "content_type": string;
  "size_bytes": number;
  "expires_at": string;
}

export interface CRMInboxProvider {
  "key": "telegram" | "vk" | "max" | "avito" | "email" | "telephony";
  "label": string;
  "connectable": boolean;
  "notice"?: string;
  "fields": Array<CRMInboxProviderField> | null;
  "capabilities": CRMInboxProviderCapabilities;
}

export interface CRMInboxProviderCapabilities {
  "inbound": boolean;
  "send": boolean;
  "files": boolean;
  "reply": boolean;
  "edit": boolean;
  "delete": boolean;
  "reactions": boolean;
  "delivered": boolean;
  "read": boolean;
  "sync": boolean;
}

export interface CRMInboxProviderField {
  "key": string;
  "label": string;
  "type": string;
  "required": boolean;
  /** true - значение хранится зашифрованным и не возвращается */
  "secret": boolean;
  "help"?: string;
}

export interface CRMInboxSendInput {
  "body"?: string;
  /** Идентификаторы заранее загруженных файлов */
  "upload_ids"?: Array<UUID>;
}

export interface CRMInboxTemplate {
  "id": UUID;
  "name": string;
  "body": string;
  "created_at": string;
  "updated_at": string;
}

export interface CRMInboxTemplateInput {
  "name": string;
  "body": string;
}

export interface CRMLead {
  "id": UUID;
  "title": string;
  /** Канал обращения; по нему собирается аналитика источников */
  "source": string;
  /** Заметка менеджера о заявке */
  "description": string;
  /** Что написал или сказал клиент - слова самого обращения, а не пересказ */
  "first_message": string;
  /** Ник, номер или адрес в канале, пока карточка клиента не заведена */
  "contact_handle": string;
  "reference_id"?: UUID;
  "owner_id"?: number;
  "customer_id"?: UUID;
  "crm_customer_id"?: UUID;
  "next_action": string;
  "next_action_at"?: string;
  "archived_at"?: string;
  "status": CRMLeadStatus;
  "qualification_reason"?: string;
  "reject_reason_id"?: UUID;
  "converted_deal_id"?: UUID;
  /** Во что вошло это обращение при слиянии дублей; заполнено только у архивной записи-источника */
  "merged_into_lead_id"?: UUID;
  "created_at": string;
  "updated_at": string;
}

/** Лид для экрана: тот же лид плюс человек за обращением и ответственный читаемыми именами */
export interface CRMLeadCard {
  "id": UUID;
  "title": string;
  /** Канал обращения; по нему собирается аналитика источников */
  "source": string;
  /** Заметка менеджера о заявке */
  "description": string;
  /** Что написал или сказал клиент - слова самого обращения, а не пересказ */
  "first_message": string;
  /** Ник, номер или адрес в канале, пока карточка клиента не заведена */
  "contact_handle": string;
  "reference_id"?: UUID;
  "owner_id"?: number;
  "customer_id"?: UUID;
  "crm_customer_id"?: UUID;
  "next_action": string;
  "next_action_at"?: string;
  "archived_at"?: string;
  "status": CRMLeadStatus;
  "qualification_reason"?: string;
  "reject_reason_id"?: UUID;
  "converted_deal_id"?: UUID;
  /** Во что вошло это обращение при слиянии дублей; заполнено только у архивной записи-источника */
  "merged_into_lead_id"?: UUID;
  "created_at": string;
  "updated_at": string;
  "customer_name"?: string;
  "customer_phone"?: string;
  "customer_messengers"?: { [key: string]: string } | null;
  "owner_name"?: string;
  "reject_reason"?: string;
}

export interface CRMLeadDecision {
  "id": UUID;
  "lead_id": UUID;
  "decision": "created" | "qualified" | "disqualified" | "converted";
  "reason"?: string;
  "deal_id"?: UUID;
  "changed_by": number;
  "created_at": string;
}

/** Обращение, похожее на заданное, и признак, по которому похоже */
export interface CRMLeadDuplicate {
  "id": UUID;
  "title": string;
  /** Канал обращения; по нему собирается аналитика источников */
  "source": string;
  /** Заметка менеджера о заявке */
  "description": string;
  /** Что написал или сказал клиент - слова самого обращения, а не пересказ */
  "first_message": string;
  /** Ник, номер или адрес в канале, пока карточка клиента не заведена */
  "contact_handle": string;
  "reference_id"?: UUID;
  "owner_id"?: number;
  "customer_id"?: UUID;
  "crm_customer_id"?: UUID;
  "next_action": string;
  "next_action_at"?: string;
  "archived_at"?: string;
  "status": CRMLeadStatus;
  "qualification_reason"?: string;
  "reject_reason_id"?: UUID;
  "converted_deal_id"?: UUID;
  /** Во что вошло это обращение при слиянии дублей; заполнено только у архивной записи-источника */
  "merged_into_lead_id"?: UUID;
  "created_at": string;
  "updated_at": string;
  "customer_name"?: string;
  "customer_phone"?: string;
  "customer_messengers"?: { [key: string]: string } | null;
  "owner_name"?: string;
  "reject_reason"?: string;
}

export interface CRMLeadInput {
  "title": string;
  "source"?: string;
  "description"?: string;
  "first_message"?: string;
  "contact_handle"?: string;
  "reference_id"?: string | null;
  "owner_id"?: number | null;
  "customer_id"?: string | null;
  "crm_customer_id"?: string | null;
  "next_action"?: string;
  "next_action_at"?: string | null;
}

export interface CRMLeadPatch {
  "title"?: string;
  "source"?: string;
  "description"?: string;
  "first_message"?: string;
  "contact_handle"?: string;
  "reference_id"?: string | null;
  "owner_id"?: number | null;
  "customer_id"?: string | null;
  "crm_customer_id"?: string | null;
  "next_action"?: string;
  "next_action_at"?: string | null;
  "archived"?: boolean;
}

export type CRMLeadStatus = "new" | "qualified" | "disqualified" | "converted";

export interface CRMLossReason {
  "id": UUID;
  "name": string;
  /** deal - почему проиграна сделка, lead - почему лид оказался не наш */
  "kind": "deal" | "lead";
  "is_active": boolean;
  "created_at": string;
}

export interface CRMLossReasonInput {
  "name": string;
  "kind"?: "deal" | "lead";
}

export interface CRMLossReasonMetric {
  "id"?: string;
  "name": string;
  "count": number;
  "amount": number;
}

export interface CRMManagerWorkload {
  "owner_id": number;
  "owner_name"?: string;
  "open_leads": number;
  "open_deals": number;
  "open_conversations": number;
  "won_deals": number;
  /** Выиграно за всё время */
  "won_amount": number;
  "lost_deals": number;
  /** План на текущий месяц; 0 - план не задан */
  "plan_amount"?: number;
  /** Закрыто в текущем месяце - с этим и сравнивают план */
  "won_amount_month"?: number;
}

/** Какие обращения свести в это */
export interface CRMMergeLeadsInput {
  /** Источники: уходят в архив со ссылкой на цель, их переписка и дела переезжают */
  "source_ids": Array<UUID>;
}

export interface CRMMoveDealInput {
  "stage_id": UUID;
  /** Обязательна для стадии категории lost */
  "loss_reason_id"?: string | null;
}

export interface CRMNoteInput {
  "text": string;
}

/** Сводка менеджера; «мои» - записи с owner_id текущего пользователя */
export interface CRMOverview {
  "open_leads": Array<CRMLead> | null;
  "open_deals": Array<CRMDeal> | null;
  "pipeline_stats": Array<CRMPipelineOverview> | null;
}

export interface CRMPipeline {
  "id": UUID;
  "name": string;
  "sort_order": number;
  "is_default": boolean;
  "is_active": boolean;
  "stages"?: Array<CRMStage> | null;
  "created_at": string;
  "updated_at": string;
}

export interface CRMPipelineInput {
  "name": string;
  "is_default"?: boolean;
}

export interface CRMPipelineOverview {
  "pipeline_id": UUID;
  "pipeline_name": string;
  "open_count": number;
  "open_amount": number;
  "stages"?: Array<CRMStageOverview> | null;
}

export interface CRMPipelinePatch {
  "name"?: string;
  "is_default"?: boolean;
  "is_active"?: boolean;
}

export interface CRMQualifyLeadInput {
  "status": "qualified" | "disqualified";
  /** Подробности решения свободным текстом */
  "reason": string;
  /** Причина из справочника вида lead - по ней строится аналитика отказов */
  "reason_id"?: string | null;
}

export interface CRMReopenDealInput {
  "stage_id": UUID;
  "reason": string;
}

/** Полный порядок без повторов; частичный список отклоняется */
export interface CRMReorderInput {
  "ids": Array<UUID>;
}

export type CRMRequiredField = "title" | "amount" | "currency" | "probability" | "expected_close_at";

export interface CRMSLAMetric {
  "open_deals": number;
  "overdue_deals": number;
  "open_conversations": number;
  "overdue_conversations": number;
  "calculated_at": string;
}

/** План продаж на месяц. Пустой owner_id - план на весь отдел */
export interface CRMSalesPlan {
  "id": UUID;
  "owner_id"?: number;
  "owner_name"?: string;
  /** Первое число месяца */
  "period": string;
  "amount": number;
  "currency": string;
}

/** Планы месяца целиком: сохранение переписывает месяц, план с нулём убирается совсем */
export interface CRMSalesPlansInput {
  /** YYYY-MM или YYYY-MM-DD; пусто - текущий месяц */
  "period"?: string;
  "items": Array<CRMSalesPlansInputItemsItem>;
}

export interface CRMSalesPlansInputItemsItem {
  /** Пусто - план на весь отдел */
  "owner_id"?: number | null;
  "amount": number;
  "currency"?: string;
}

/** Откуда приходят лиды и какой источник доходит до сделки */
export interface CRMSourceMetric {
  "source": string;
  "leads": number;
  "converted": number;
  "rate": number;
}

export interface CRMStage {
  "id": UUID;
  "pipeline_id": UUID;
  "name": string;
  "sort_order": number;
  "category": CRMStageCategory;
  "color": string;
  "probability": number;
  /** Норматив пребывания на стадии в часах; 0 - без норматива */
  "sla_hours": number;
  "required_fields": Array<CRMRequiredField> | null;
  "is_active": boolean;
  "created_at": string;
  "updated_at": string;
}

export type CRMStageCategory = "open" | "won" | "lost";

export interface CRMStageInput {
  "name": string;
  "category"?: CRMStageCategory;
  /** Пустое значение подставляет цвет категории */
  "color"?: string;
  "probability"?: number;
  "sla_hours"?: number;
  "required_fields"?: Array<CRMRequiredField>;
}

export interface CRMStageMetric {
  "pipeline_id": string;
  "pipeline_name": string;
  "stage_id": string;
  "stage_name": string;
  "category": CRMStageCategory;
  "count": number;
  "amount": number;
}

export interface CRMStageOverview {
  "stage_id": UUID;
  "stage_name": string;
  "category": CRMStageCategory;
  "deal_count": number;
  "deal_amount": number;
  "updated_at": string;
}

export interface CRMStagePatch {
  "name"?: string;
  "category"?: CRMStageCategory;
  "color"?: string;
  "probability"?: number;
  "sla_hours"?: number;
  "required_fields"?: Array<CRMRequiredField>;
  "is_active"?: boolean;
}

/** Одна запись ленты; вид говорит, из какого источника она пришла */
export interface CRMTimelineEntry {
  "id": UUID;
  /** note - заметка сотрудника, system - системный факт, stage - смена этапа, decision - решение по лиду, message - сообщение канала, link - связь с задачей, событием или встречей */
  "kind": "note" | "system" | "stage" | "decision" | "message" | "link";
  "at": string;
  "actor_id"?: number;
  "actor_name"?: string;
  /** Заголовок записи: действие, название этапа, решение или направление сообщения */
  "title": string;
  "body"?: string;
  "meta"?: { [key: string]: unknown } | null;
}

export interface CRMUserRef {
  "id": number;
  "display_name": string;
  "username"?: string;
}

export interface CalendarAvailability {
  "id": UUID;
  "owner": number;
  "owner_name": string;
  "name": string;
  "timezone": string;
  "weekdays": Array<number>;
  "start_time": string;
  "end_time": string;
  "slot_duration_min": number;
  "buffer_min": number;
  "is_active": boolean;
}

export interface CalendarAvailabilityCreate {
  "owner"?: number;
  "name"?: string;
  "timezone"?: string;
  "weekdays"?: Array<number>;
  "start_time"?: string;
  "end_time"?: string;
  "slot_duration_min"?: number;
  "buffer_min"?: number;
  "is_active"?: boolean;
}

export interface CalendarAvailabilityEnvelope {
  "ok": true;
  "item": CalendarAvailability;
  "id": UUID;
}

export interface CalendarAvailabilityPage {
  "count": number;
  "results": Array<CalendarAvailability>;
  "items": Array<CalendarAvailability>;
}

export interface CalendarAvailabilityPatch {
  "name"?: string;
  "timezone"?: string;
  "weekdays"?: Array<number>;
  "start_time"?: string;
  "end_time"?: string;
  "slot_duration_min"?: number;
  "buffer_min"?: number;
  "is_active"?: boolean;
}

export interface CalendarBookingLink {
  "id": UUID;
  "owner": number;
  "owner_name": string;
  "owner_avatar_url"?: string;
  "availability": UUID | null;
  "slug": string;
  "title": string;
  "description": string;
  "calendar_source": "booking";
  "export_target": string;
  "timezone": string;
  "duration_min": number;
  "buffer_min": number;
  "min_notice_min": number;
  "max_days_ahead": number;
  "date_range_start"?: string | null;
  "date_range_end"?: string | null;
  "status": "active" | "paused" | "archived";
  "public_url": string;
  "members": Array<CalendarMember>;
  "participants": Array<CalendarBookingParticipant>;
  "participant_count": number;
}

export interface CalendarBookingLinkCreate {
  "owner"?: number;
  "availability"?: UUID;
  "availability_id"?: UUID;
  "slug"?: string;
  "title"?: string;
  "description"?: string;
  /** Нормализуется сервером в booking */
  "calendar_source"?: string;
  "export_target"?: string;
  "timezone"?: string;
  "duration_min"?: number;
  "buffer_min"?: number;
  "min_notice_min"?: number;
  "max_days_ahead"?: number;
  "date_range_start"?: string;
  "date_range_end"?: string;
  "status"?: "active" | "paused" | "archived";
  "member_ids"?: Array<number>;
  "member_user_ids"?: Array<number>;
}

export interface CalendarBookingLinkEnvelope {
  "ok": true;
  "item": CalendarBookingLink;
  "id": UUID;
}

export interface CalendarBookingLinkPage {
  "count": number;
  "results": Array<CalendarBookingLink>;
  "items": Array<CalendarBookingLink>;
}

export interface CalendarBookingLinkPatch {
  "availability"?: UUID;
  "availability_id"?: UUID;
  "title"?: string;
  "description"?: string;
  /** Нормализуется сервером в booking */
  "calendar_source"?: string;
  "export_target"?: string;
  "timezone"?: string;
  "duration_min"?: number;
  "buffer_min"?: number;
  "min_notice_min"?: number;
  "max_days_ahead"?: number;
  "date_range_start"?: string;
  "date_range_end"?: string;
  "status"?: "active" | "paused" | "archived";
  "member_ids"?: Array<number>;
  "member_user_ids"?: Array<number>;
}

export interface CalendarBookingParticipant {
  "user_id": string;
  "display_name": string;
  "avatar_url": string;
  "role": string;
}

export interface CalendarBusy {
  "user": number;
  "user_name": string;
  "starts_at": string;
  "ends_at": string;
  "source": string;
  "all_day": boolean;
}

export interface CalendarBusyPage {
  "count": number;
  "results": Array<CalendarBusy>;
  "items": Array<CalendarBusy>;
}

export interface CalendarConnector {
  "id": UUID;
  "owner": number;
  "owner_name": string;
  "provider": "caldav" | "icloud" | "yandex" | "google" | "office365";
  "display_name": string;
  "account_email": string;
  "direction": "both" | "import" | "export";
  "status": "connected" | "paused" | "disconnected" | "error";
  "calendar_url": string;
  "username": string;
  "has_credentials": boolean;
  "selected_calendars": Array<CalendarExternalCalendar>;
  "last_sync_at"?: string | null;
  "last_sync_status": string;
  /** The provider's own words and nothing else. Empty when the failure was ours; last_error_code names it and the log carries the cause. */
  "last_error": string;
  "last_error_code": "" | "calendar.connector.internal" | "calendar.connector.provider_declined" | "calendar.connector.disconnected";
  "supports_import": boolean;
  "supports_export": boolean;
  "created_at": string;
  "updated_at": string;
}

export interface CalendarConnectorCreate {
  "provider": "caldav" | "icloud" | "yandex";
  "display_name"?: string;
  "account_email"?: string;
  "direction"?: "both" | "import" | "export";
  "status"?: "connected" | "paused" | "disconnected" | "error";
  "calendar_url"?: string;
  "username"?: string;
  "credential"?: string;
  /** KEIS-совместимый alias credential */
  "password"?: string;
  "selected_calendars"?: Array<CalendarExternalCalendar>;
}

export interface CalendarConnectorEnvelope {
  "ok": true;
  "item": CalendarConnector;
  "id": UUID;
}

export interface CalendarConnectorPage {
  "count": number;
  "results": Array<CalendarConnector>;
  "items": Array<CalendarConnector>;
  "providers": { [key: string]: CalendarConnectorProvider };
}

export interface CalendarConnectorPatch {
  "provider"?: "caldav" | "icloud" | "yandex" | "google" | "office365";
  "display_name"?: string;
  "account_email"?: string;
  "direction"?: "both" | "import" | "export";
  "status"?: "connected" | "paused" | "disconnected" | "error";
  "calendar_url"?: string;
  "username"?: string;
  "credential"?: string;
  "password"?: string;
  "selected_calendars"?: Array<CalendarExternalCalendar>;
}

export interface CalendarConnectorProvider {
  "configured"?: boolean;
  "supports_import"?: boolean;
  "supports_export"?: boolean;
}

export interface CalendarConnectorSyncInput {
  "provider"?: string;
}

export interface CalendarEvent {
  "id": UUID;
  "owner": number | null;
  "owner_user_id"?: number | null;
  "owner_name": string;
  "title": string;
  "description": string;
  "location": string;
  "starts_at": string;
  "ends_at": string;
  "timezone": string;
  "all_day": boolean;
  "important": boolean;
  "visibility": "private" | "public";
  "busy_status": "busy" | "free";
  "recurrence_freq": "none" | "daily" | "weekly" | "monthly" | "yearly";
  "recurrence_interval": number;
  "recurrence_days": Array<number>;
  "recurrence_month_day"?: number | null;
  "recurrence_until"?: string | null;
  "recurrence_count"?: number | null;
  "status": "confirmed" | "cancelled" | "tentative";
  "source": string;
  "export_target": string;
  "payload"?: { [key: string]: unknown };
  "booking"?: UUID | null;
  "booking_id"?: UUID | null;
  "participants": Array<CalendarParticipant>;
  "occurrence_id"?: string;
  "is_occurrence": boolean;
  "master_event"?: UUID | null;
  "created_at": string;
  "updated_at": string;
}

export interface CalendarEventCreate {
  "owner"?: number;
  "title": string;
  "description"?: string;
  "location"?: string;
  "starts_at": string;
  "ends_at": string;
  "timezone"?: string;
  "all_day"?: boolean;
  "important"?: boolean;
  "visibility"?: "private" | "public";
  "busy_status"?: "busy" | "free";
  "recurrence_freq"?: "none" | "daily" | "weekly" | "monthly" | "yearly";
  "recurrence_interval"?: number;
  "recurrence_days"?: Array<number>;
  "recurrence_month_day"?: number;
  "recurrence_until"?: string;
  "recurrence_count"?: number;
  "status"?: "confirmed" | "cancelled" | "tentative";
  "participants"?: Array<CalendarParticipantInput>;
  "payload"?: { [key: string]: unknown };
  /** local либо `<connector UUID>/<external calendar id>` */
  "export_target"?: string;
  "calendar_source"?: string;
}

export interface CalendarEventEnvelope {
  "ok": true;
  "item": CalendarEvent;
  "id": UUID;
  "title": string;
  "starts_at": string;
  "ends_at": string;
}

export interface CalendarEventPage {
  "count": number;
  "results": Array<CalendarEvent>;
  "items": Array<CalendarEvent>;
  "current_user_id": number;
}

/** Отсутствующий ключ и null означают «не менять»; participants при наличии заменяет список целиком. */
export interface CalendarEventPatch {
  "owner"?: number | null;
  "title"?: string | null;
  "description"?: string | null;
  "location"?: string | null;
  "starts_at"?: string | null;
  "ends_at"?: string | null;
  "timezone"?: string | null;
  "all_day"?: boolean | null;
  "important"?: boolean | null;
  "visibility"?: "private" | "public" | null | null;
  "busy_status"?: "busy" | "free" | null | null;
  "recurrence_freq"?: "none" | "daily" | "weekly" | "monthly" | "yearly" | null | null;
  "recurrence_interval"?: number | null;
  "recurrence_days"?: Array<number> | null;
  "recurrence_month_day"?: number | null;
  "recurrence_until"?: string | null;
  "recurrence_count"?: number | null;
  "status"?: "confirmed" | "cancelled" | "tentative" | null | null;
  "participants"?: Array<CalendarParticipantInput> | null;
  "payload"?: { [key: string]: unknown } | null;
  "export_target"?: string | null;
  "calendar_source"?: string | null;
}

export interface CalendarEventResponseInput {
  "response_status": "needs_action" | "accepted" | "declined" | "tentative";
}

export interface CalendarExternalCalendar {
  "id": string;
  "name": string;
  "url"?: string;
  "color"?: string;
  "enabled": boolean;
  "read_only"?: boolean;
  "writable"?: boolean;
  "export"?: boolean;
}

export interface CalendarInvitation {
  "event_id": UUID;
  "title": string;
  "starts_at": string;
  "ends_at": string;
  "all_day": boolean;
  "timezone": string;
  "owner_name": string;
  "participant_id": UUID;
}

export interface CalendarInvitationPage {
  "items": Array<CalendarInvitation>;
}

export interface CalendarMember {
  "user": number;
  "user_name": string;
  "email"?: string;
  "department"?: string;
  "position"?: string;
  "company"?: string;
  "avatar_url"?: string;
}

export interface CalendarMemberBundle {
  "id": string;
  "name": string;
  "member_ids": Array<number>;
}

export interface CalendarMemberDirectory {
  "departments": Array<CalendarMemberBundle>;
  "items": Array<CalendarMember>;
}

export interface CalendarOAuthCompleteInput {
  "code": string;
  "state": string;
}

export interface CalendarOAuthStart {
  "provider": "google" | "office365";
  "auth_url": string;
  "configured": boolean;
  "redirect_uri"?: string;
}

export interface CalendarParticipant {
  "id": UUID;
  "user": number | null;
  "user_name": string;
  "external_name": string;
  "external_email": string;
  "role": "required" | "optional" | "organizer";
  "response_status": "needs_action" | "accepted" | "declined" | "tentative";
}

export interface CalendarParticipantInput {
  "user"?: number;
  "external_name"?: string;
  "external_email"?: string;
  "role"?: "required" | "optional" | "organizer";
  "response_status"?: "needs_action" | "accepted" | "declined" | "tentative";
}

export interface CalendarPublicBookInput {
  /** ISO instant либо local datetime в timezone ссылки */
  "starts_at": string;
  "guest_name"?: string;
  "guest_email"?: string;
  "guest_note"?: string;
}

export interface CalendarPublicBookResult {
  "ok": boolean;
  "starts_at": string;
  "ends_at": string;
  "title": string;
}

export interface CalendarPublicBookingLink {
  "slug": string;
  "title": string;
  "description": string;
  "duration_min": number;
  "timezone": string;
  "owner_name": string;
  "participants": Array<CalendarBookingParticipant>;
  "participant_count": number;
  "company": string;
}

export interface CalendarSettingsEnvelope {
  "settings": { [key: string]: unknown };
}

export interface CalendarSlot {
  "starts_at": string;
  "ends_at": string;
}

export interface CalendarSlotPage {
  "items": Array<CalendarSlot>;
}

export interface CalendarSyncResult {
  "connector": CalendarConnector;
  "imported": number;
  "exported": number;
  "skipped": number;
  "message": string;
}

export interface CalendarWebPushConfig {
  "public_key": string;
  "configured": boolean;
}

export interface CalendarWebPushSubscription {
  "endpoint": string;
  "p256dh": string;
  "auth": string;
  "device"?: "desktop" | "mobile";
}

export interface CalendarWebPushUnsubscribe {
  "endpoint": string;
}

export interface ChatAttachment {
  "id": UUID;
  "original_name": string;
  "content_type": "audio/mp4" | "audio/webm" | "audio/ogg" | "video/mp4" | "video/quicktime";
  "size_bytes": number;
  "sha256_hex": string;
  "media_kind": "voice" | "video_circle";
  "duration_ms": number;
  "content_url": string;
}

export interface ChatAttachmentPage {
  "items": Array<ChatForwardedAttachment>;
}

/** Один файл на запрос. Ссылка на уже загруженный объект не принимается. */
export interface ChatAttachmentUpload {
  /** Непустой файл до 100 MiB. Содержимое, распознанное как голос, дополнительно ограничено 20 MiB. */
  "file": string;
}

export interface ChatChangePinResult {
  "pin"?: ChatMessagePin;
  "changed": boolean;
}

export interface ChatConversation {
  "id": UUID;
  "type": "direct" | "group" | "system";
  "status": "active" | "archived";
  "title": string;
  "description": string;
  "last_seq": number;
  "last_message_id": UUID | null;
  "last_message_at": string | null;
  "created_at": string;
  "updated_at": string;
  "capabilities"?: ChatConversationCapabilities;
  "unread_count": number;
  "manual_unread_seq": number | null;
  "notification_mode": string;
  "mention_count": number;
}

/** Одно изображение на запрос. Ссылка на уже загруженный объект не принимается. */
export interface ChatConversationAvatarUpload {
  /** Непустое изображение до 5 MiB. Распознаются jpeg, png, webp и gif; прочие форматы отвергаются. */
  "file": string;
}

export interface ChatConversationCapabilities {
  "canRead": boolean;
  "canWrite": boolean;
  "canManageMembers": boolean;
  "canUpload": boolean;
  "canReact": boolean;
  "canPin": boolean;
  "canMarkRead": boolean;
  "canMarkUnread": boolean;
  "canMention": boolean;
  "canSetNotificationMode": boolean;
}

export interface ChatConversationPage {
  "items": Array<ChatConversation>;
  "next_cursor"?: string;
}

export interface ChatCreateGroup {
  "title": string;
  "description"?: string;
  "member_user_ids": Array<number>;
}

export interface ChatCreateGroupResult {
  "conversation": ChatConversation;
  "created": true;
}

export interface ChatEditMessage {
  /** Лимит считается по кодовым точкам Unicode после нормализации переводов строк и обрезки пробелов по краям. */
  "body": string;
}

export interface ChatEnsureDirect {
  "peer_user_id": number;
}

export interface ChatEnsureDirectResult {
  "conversation_id": UUID;
  "created": boolean;
}

export interface ChatFolder {
  "id": UUID;
  "name": string;
  "position": number;
  /** Разделы всегда возвращаются в порядке direct, group, task независимо от порядка в запросе. */
  "scopes": Array<"direct" | "group" | "task">;
  "include_conversation_ids": Array<UUID>;
  "exclude_conversation_ids": Array<UUID>;
  "created_at": string;
  "updated_at": string;
}

export interface ChatFolderPage {
  "items": Array<ChatFolder>;
}

export interface ChatForwardMessage {
  "target_conversation_id": UUID;
  "client_message_id": UUID;
}

export interface ChatForwardMessageResult {
  "message": ChatForwardedMessage;
  "created": boolean;
}

export interface ChatForwardedAttachment {
  "id": UUID;
  "conversation_id": UUID;
  "message_id": string | null;
  "original_name": string;
  "content_type": string;
  "size_bytes": number;
  "sha256_hex": string;
  "media_kind": "voice" | "video_circle" | "image" | "video" | "file";
  "duration_ms": number | null;
  "waveform": Array<number>;
  "status": "quarantined" | "ready" | "failed" | "deleted";
  "scan_status": "pending" | "clean" | "infected" | "unavailable";
  "scan_error_code"?: string;
  "created_at": string;
  "content_url": string;
}

export interface ChatForwardedMessage {
  "id": UUID;
  "conversation_id": UUID;
  "seq": number;
  "sender_user_id": number | null;
  "kind": "text" | "system" | "application" | "file";
  "body": string;
  "reply_to_message_id": string | null;
  "forwarded_from_message_id": string | null;
  "mentions": Array<ChatMessageMention>;
  "reactions": Array<ChatMessageReaction>;
  "client_message_id": string | null;
  "created_at": string;
  "edited_at": string | null;
  "deleted_at": string | null;
  "attachments": Array<ChatForwardedAttachment>;
}

export interface ChatMarkAllRead {
  /** Раздел списка бесед: user — переписка людей без чатов задач. */
  "scope": "all" | "direct" | "group" | "task" | "user";
}

export interface ChatMarkAllReadResult {
  "scope": "all" | "direct" | "group" | "task" | "user";
  "conversations_read": number;
  "mentions_read": number;
  "notifications_read": number;
}

export interface ChatMediaUpload {
  "client_message_id": UUID;
  "media_kind": "voice" | "video_circle";
  /** Для video_circle дополнительно действует runtime-лимит 60000 ms. */
  "duration_ms": number;
  /** audio/mp4, audio/webm или audio/ogg до 12 MiB либо video/mp4/video/quicktime до 40 MiB */
  "file": string;
}

export interface ChatMember {
  "user_id": number;
  "display_name": string;
  "avatar_url": string;
  "role": "owner" | "moderator" | "member" | "readonly";
}

export interface ChatMemberPage {
  "items": Array<ChatMember>;
}

export interface ChatMentionCandidate {
  "user_id": number;
}

export interface ChatMentionCandidatePage {
  "items": Array<ChatMentionCandidate>;
}

export interface ChatMentionReadResult {
  "message_id": UUID;
  "read_at": string | null;
  "changed": boolean;
}

export interface ChatMessage {
  "id": UUID;
  "conversation_id": UUID;
  "seq": number;
  "sender_user_id": number | null;
  "kind": "text" | "system" | "application" | "file";
  "body": string;
  "mentions": Array<ChatMessageMention>;
  "client_message_id": UUID | null;
  "created_at": string;
  "attachments": Array<ChatAttachment>;
}

export interface ChatMessageMention {
  "user_id": number;
  "display_name": string;
}

export interface ChatMessagePage {
  "items": Array<ChatMessage>;
  "first_seq"?: number;
  "last_seq"?: number;
}

export interface ChatMessagePin {
  "message": ChatForwardedMessage;
  "pinned_by": number;
  "pinned_at": string;
}

export interface ChatMessagePinPage {
  "items": Array<ChatMessagePin>;
}

export interface ChatMessageReaction {
  "emoji": string;
  "count": number;
  "is_own": boolean;
}

export interface ChatMobileDeviceRegistration {
  "device_id": string;
  /** Платформа APNs-клиента. Если поле не передано, используется ios для обратной совместимости. */
  "platform"?: "ios" | "macos";
  "push_token": string;
  "bundle_id": string;
  "environment": "sandbox" | "production";
  "locale"?: string;
  "timezone"?: string;
  "device_name"?: string;
  "app_version"?: string;
  "system_version"?: string;
  /** Показывать текст сообщения в уведомлении. Поле отсутствует — уведомление полное. */
  "preview"?: boolean;
  /** Звук уведомления. Поле отсутствует — со звуком. */
  "sound"?: boolean;
}

export interface ChatMobileDeviceRegistrationState {
  "enabled": boolean;
}

export interface ChatMobilePushTestResult {
  "delivered": number;
}

export interface ChatNotificationModeInput {
  "mode": "all" | "mentions" | "muted";
}

export interface ChatNotificationModeResult {
  "mode": "all" | "mentions" | "muted";
  "changed": boolean;
}

export interface ChatPeoplePage {
  "items": Array<ChatPerson>;
}

export interface ChatPerson {
  "user_id": number;
  "display_name": string;
  "avatar_url": string;
  "is_self": boolean;
}

export interface ChatReactionResult {
  "message_id": UUID;
  /** Сводка по сообщению целиком, по одной строке на эмодзи. */
  "reactions": Array<ChatMessageReaction>;
  "changed": boolean;
}

export interface ChatReceiptInput {
  "seq": number;
}

export interface ChatReceiptState {
  "last_delivered_seq": number;
  "last_read_seq": number;
  "manual_unread_seq": number | null;
  "changed": boolean;
}

/** Нужен непустой name и хотя бы один scope или один include_conversation_ids, иначе 400. */
export interface ChatSaveFolder {
  "name": string;
  "position"?: number;
  /** Повтор раздела отвергается. */
  "scopes"?: Array<"direct" | "group" | "task">;
  "include_conversation_ids"?: Array<UUID>;
  "exclude_conversation_ids"?: Array<UUID>;
}

export interface ChatSendMessage {
  /** Ключ идемпотентности отправки. Уникален в пределах беседы и отправителя: повтор с тем же ключом не заводит второе сообщение, а возвращает уже отправленное. Заголовок Idempotency-Key эта операция не читает */
  "client_message_id": { [key: string]: unknown };
  /** Предел считается в кодовых точках, а не в байтах: сервер режет по 10 000 кодовых точек */
  "body": string;
  "mention_user_ids"?: Array<number>;
}

export interface ChatSendMessageResult {
  "message": ChatMessage;
  "created": boolean;
}

export interface ChatSetReaction {
  /** Закрытый список допустимых реакций. */
  "emoji": "👍" | "👎" | "❤️" | "🔥" | "🎉" | "😄" | "😢" | "😡" | "✍️";
}

export interface ChatUnreadMention {
  "message_id": UUID;
  "seq": number;
}

export interface ChatUnreadMentionPage {
  "items": Array<ChatUnreadMention>;
}

export interface Comment {
  "id": UUID;
  "task_id": UUID;
  "author_id": number | null;
  "author_name": string | null;
  "body": string;
  "attachments": Array<Attachment>;
  "origin": CommentOrigin;
  "created_at": string;
}

/**
 * Передайте непустой `body` либо `allow_empty: true` для комментария
 * только с вложением.
 */
export interface CommentCreate {
  "body"?: string;
  "author"?: number;
  "allow_empty"?: boolean;
  "mentioned_user_ids"?: Array<number>;
}

export type CommentList = Array<Comment>;

export type CommentOrigin = "web" | "mcp" | "agent";

export interface CoreAccountingDimension {
  "key": "company" | "project" | "department" | "cfo";
  "label": string;
  "description": string;
  "dictionary_key"?: string;
  "tree": boolean;
  "always_on": boolean;
  "enabled": boolean;
  "required": boolean;
  "enabled_at"?: string;
}

export interface CoreAccountingDimensionPage {
  "count": number;
  "results": Array<CoreAccountingDimension>;
  "readiness": CoreAccountingDimensionPageReadiness;
}

export interface CoreAccountingDimensionPageReadiness {
  "posted_entries": number;
}

export interface CoreAccountingDimensionPatch {
  "enabled"?: boolean;
  "required"?: boolean;
}

export interface CoreAccountingPeriodClose {
  "closed_through": string;
  "reason"?: string;
  "forced"?: boolean;
  "warnings"?: Array<string>;
}

export interface CoreAccountingPeriodEvent {
  "id": UUID;
  "action": "close" | "reopen";
  /** Empty means fully reopened */
  "closed_through": string;
  "actor_user_id": number;
  "actor_name": string;
  "happened_at": string;
  "reason": string;
  "forced": boolean;
  "warnings": Array<string>;
}

export interface CoreAccountingPeriodReopen {
  /** Earlier date or empty to reopen fully */
  "closed_through": string;
  "reason": string;
}

export interface CoreAccountingPeriodState {
  /** Empty means accounting is open */
  "closed_through": string;
  "history": Array<CoreAccountingPeriodEvent>;
}

export interface CoreAccountingSettings {
  "currency": string;
  "valid_from"?: string;
  "locked": boolean;
  "ledger_entries": number;
}

export interface CoreAccountingSettingsInput {
  "currency": string;
  "reason"?: string;
}

export interface CoreBalanceShortage {
  "register_key": string;
  "register_name": string;
  "dims": { [key: string]: unknown };
  "resource": string;
  "balance": string;
  "shortage": string;
  "conflicts": Array<CoreConflictingRegistrar>;
}

export interface CoreBulkResult {
  "updated": number;
}

export interface CoreBusiness {
  "id": UUID;
  "name": string;
  "is_active": boolean;
}

export interface CoreBusinessInput {
  "name": string;
}

export interface CoreBusinessOwner {
  "id": UUID;
  "account_id": UUID;
  "kind": "employee" | "company" | "contact";
  "employee_id"?: UUID;
  "company_id"?: UUID;
  "contact_id"?: UUID;
  "name": string;
  "share": string;
}

export interface CoreBusinessOwnerInput {
  "kind": "employee" | "company" | "contact";
  "employee_id"?: UUID;
  "company_id"?: UUID;
  "contact_id"?: UUID;
  "share": string;
}

export interface CoreCabinetPreferences {
  "locale": "ru-RU" | "en-US";
  "timezone": string;
  "date_format": string;
  "number_format": string;
}

export interface CoreConflictingRegistrar {
  "id": UUID;
  "number": string;
  "type_key": string;
  "type_name": string;
  "date": string;
  "status": CoreDocumentStatus;
  "sign": number;
}

export interface CoreContact {
  "id": UUID;
  "name": string;
  "kind": CoreContactKind;
  "is_customer": boolean;
  "is_supplier": boolean;
  "folder_id": UUID | null;
  "entity_type": CoreContactEntityType;
  "legal_name": string;
  "phone": string;
  "email": string;
  "position": string;
  "tags": Array<unknown>;
  "messengers": { [key: string]: unknown };
  "source": string;
  "inn": string;
  "kpp": string;
  "ogrn": string;
  "address": string;
  "bank_name": string;
  "bank_bic": string;
  "bank_account": string;
  "external_id": string;
  "custom": { [key: string]: unknown };
  "is_active": boolean;
  "created_at": string;
  "updated_at": string;
}

export interface CoreContactBulkPatch {
  "ids": Array<UUID>;
  "folder_id"?: UUID | null;
  "is_customer"?: boolean;
  "is_supplier"?: boolean;
}

export interface CoreContactCreate {
  "name": string;
  "kind"?: CoreContactKind;
  "entity_type"?: CoreContactEntityType;
  "legal_name"?: string;
  "phone"?: string;
  "email"?: string;
  "position"?: string;
  "tags"?: Array<unknown>;
  "messengers"?: { [key: string]: unknown };
  "source"?: string;
  "inn"?: string;
  "kpp"?: string;
  "ogrn"?: string;
  "address"?: string;
  "bank_name"?: string;
  "bank_bic"?: string;
  "bank_account"?: string;
  "external_id"?: string;
  "custom"?: { [key: string]: unknown };
}

export type CoreContactEntityType = "legal" | "individual" | "sole_prop";

export type CoreContactKind = "client" | "supplier" | "both";

export interface CoreContactPage {
  "count": number;
  "results": Array<CoreContact>;
}

export interface CoreContactPatch {
  "name"?: string;
  "kind"?: CoreContactKind;
  "entity_type"?: CoreContactEntityType;
  "legal_name"?: string;
  "phone"?: string;
  "email"?: string;
  "position"?: string;
  "tags"?: Array<unknown>;
  "messengers"?: { [key: string]: unknown };
  "source"?: string;
  "inn"?: string;
  "kpp"?: string;
  "ogrn"?: string;
  "address"?: string;
  "bank_name"?: string;
  "bank_bic"?: string;
  "bank_account"?: string;
  "external_id"?: string;
  "custom"?: { [key: string]: unknown };
  "is_customer"?: boolean;
  "is_supplier"?: boolean;
  "folder_id"?: UUID | null;
}

export interface CoreCurrencyRate {
  "id": UUID;
  "currency_code": string;
  "base_code": string;
  "rate": string;
  "nominal": number;
  "valid_from": string;
  "valid_to"?: string;
  "source": CoreCurrencyRateSourceKey;
  "reason": string;
  "created_at": string;
}

export interface CoreCurrencyRateInput {
  "currency_code": string;
  "base_code": string;
  /** Positive decimal string; comma or dot accepted */
  "rate": string;
  "nominal"?: number;
  "valid_from": string;
  "source"?: CoreCurrencyRateSourceKey;
  "reason"?: string;
}

export interface CoreCurrencyRatePage {
  "count": number;
  "results": Array<CoreCurrencyRate>;
}

export interface CoreCurrencyRateRefreshResult {
  "added": number;
}

export interface CoreCurrencyRateSource {
  "key": CoreCurrencyRateSourceKey;
  "title": string;
  "auto": boolean;
  "note"?: string;
  "serves": boolean;
  "bridge"?: string;
  "unavailable"?: boolean;
}

export type CoreCurrencyRateSourceKey = "manual" | "cbr" | "ecb" | "coingecko" | "erapi" | "moex" | "fixed";

export interface CoreCurrencyRateSourcePage {
  "items": Array<CoreCurrencyRateSource>;
}

export interface CoreDictionary {
  "id": UUID;
  "key": string;
  "name": string;
  "description": string;
  "is_system": boolean;
  "allow_tree": boolean;
  "folder_id": UUID | null;
  "item_count": number;
  "created_at": string;
  "updated_at": string;
}

export interface CoreDictionaryCreate {
  "key": string;
  "name": string;
  "description"?: string;
  "allow_tree"?: boolean;
  "folder_id"?: UUID | null;
}

export interface CoreDictionaryItem {
  "id": UUID;
  "dictionary_id": UUID;
  "code": string;
  "label": string;
  "parent_id": UUID | null;
  "attrs": { [key: string]: unknown };
  "sort_order": number;
  "is_active": boolean;
  "created_at": string;
  "updated_at": string;
}

export interface CoreDictionaryItemCreate {
  "code"?: string;
  "label": string;
  "parent_id"?: UUID | null;
  "attrs"?: { [key: string]: unknown };
  "sort_order"?: number;
  "is_active"?: boolean;
}

export interface CoreDictionaryItemImport {
  "items": Array<CoreDictionaryItemUpdate>;
}

export interface CoreDictionaryItemPage {
  "count": number;
  /** Применённый размер страницы — после зажима до потолка */
  "limit": number;
  /** Применённое смещение */
  "offset": number;
  "results": Array<CoreDictionaryItem>;
}

export interface CoreDictionaryItemUpdate {
  "code": string;
  "label": string;
  "parent_id"?: UUID | null;
  "attrs"?: { [key: string]: unknown };
  "sort_order"?: number;
  "is_active"?: boolean;
}

export interface CoreDictionaryPage {
  "count": number;
  /** Применённый размер страницы — после зажима до потолка */
  "limit": number;
  /** Применённое смещение */
  "offset": number;
  "results": Array<CoreDictionary>;
}

export interface CoreDictionaryUpdate {
  "name": string;
  "description"?: string;
  "allow_tree"?: boolean;
  "folder_id"?: UUID | null;
}

export interface CoreDirectory {
  /** Ключ кабинета: одинаков во всех кабинетах, без пространства имён. У справочника приложения совпадает с полным именем */
  "key": string;
  "label": string;
  /** Ключ словаря для перевода названия */
  "label_key"?: string;
  "description": string;
  /** Модуль, чей код пишет и проверяет записи: у объявленного справочника — владелец, у списка кабинета и справочника приложения — core как хозяин конструктора */
  "module": string;
  /** Природа справочника: сущность, список кодов, таксономия, стандарт или зеркало внешнего источника */
  "kind": string;
  /** Где лежат записи: своя типизированная таблица или универсальный конструктор */
  "storage": string;
  /** Откуда записи: штатный посев (system), ввод клиента (tenant), интеграция (integration) или установленное приложение (app) */
  "origin": string;
  /** Кому виден справочник: только своему модулю, всему продукту или наружу */
  "visibility": string;
  /** Группа раздела в меню и каталоге */
  "group"?: string;
  /** Значок из общего набора */
  "icon"?: string;
  /** Порядок в чек-листе первичного заполнения кабинета */
  "setup_step"?: number;
  "deeplink": string;
  /** Дополнительные входы. Владение не переносят: справочник остаётся у своего модуля */
  "mounts"?: Array<CoreDirectoryMount>;
  /** Полное имя для внешнего кода: пространство имён владельца плюс ключ — core.units, marketplace.mp_expense_item, app.acme.crm.regions. Его называет manifest приложения, его же принимают операции /api/v1/reference наравне с ключом */
  "reference": string;
  "contract": CoreDirectoryContract;
  "item_count"?: number | null;
  "is_system": boolean;
  "dictionary_id"?: string;
}

/** Дескриптор справочника для внешнего кода (Reference Data SDK). У штатного справочника приходит из объявления модуля-владельца, у списка кабинета выводится из его природы, у справочника приложения снимается с манифеста при установке. Форма дескриптора — preview: набор полей может расшириться */
export interface CoreDirectoryContract {
  /** Пространство имён: ключ модуля-владельца или app.<издатель>.<ключ> у приложения. Выводится из владельца, объявить иначе нельзя */
  "namespace": string;
  /** Полное имя: namespace плюс ключ. То же, что reference у строки */
  "reference": string;
  /** Идентификатор формы записи с версией: core.contact.v1 у типизированного, core.dictionary_item.v1 у любого справочника конструктора, <полное имя>.v<N> у справочника приложения */
  "item_schema": string;
  /** Версия формы записи из суффикса item_schema. Ломающее изменение формы — новая версия рядом со старой, а не тихая подмена */
  "schema_version": number;
  /** Чьё слово последнее по записям: кабинет, сеятель Akeda, внешний источник или установленное приложение */
  "authority": "tenant" | "platform" | "provider" | "app";
  /** Что кабинет вправе делать с записями: править любые, только читать (записи держит владелец) или заводить свои рядом с записями владельца */
  "mutability": "tenant_managed" | "owner_managed" | "shared";
  /** Этап жизни: форма держится; форма меняется; выдавать перестали, существующие не трогают; владелец удалён, справочник остался ради ссылок */
  "lifecycle": "stable" | "beta" | "deprecated" | "retired";
  /** Объём обещания про форму записи: те же стадии, что у операции public API */
  "compatibility": "preview" | "public";
  /** Право, открывающее справочник: <модуль>:read. Им же витрина отбирает строки */
  "permission": string;
}

export interface CoreDirectoryMount {
  /** Модуль, из раздела которого открывается этот справочник */
  "module": string;
  /** Экран второго входа */
  "path": string;
}

export interface CoreDirectoryPage {
  "count": number;
  /** Потолок каталога — сколько справочников конструктора он читает за раз. Параметра запроса у него нет: каталог отдаётся целиком, и число названо здесь, чтобы предел был виден, а не подразумевался */
  "limit": number;
  /** Справочников в кабинете больше потолка, и часть в каталог не попала. Считается по кабинету точно, а не по длине ответа: после чтения набор ещё раз сужают права, и короткий ответ ничего об усечении не говорит. true означает ошибку моделирования на стороне кабинета, а не нормальный режим */
  "truncated": boolean;
  "results": Array<CoreDirectory>;
}

export interface CoreDocument {
  "id": UUID;
  "type_id": UUID;
  "type_key": string;
  "type_name": string;
  "number": string;
  "date": string;
  "status": CoreDocumentStatus;
  "basis_type": UUID | null;
  "basis_id": UUID | null;
  "basis_number": string;
  "entity_refs": { [key: string]: unknown };
  "payload": { [key: string]: unknown };
  "comment": string;
  "is_marked_deleted": boolean;
  "created_by": number | null;
  "created_by_name": string;
  "created_at": string;
  "updated_at": string;
  "posted_at": string;
  "cancelled_at": string;
}

export interface CoreDocumentActionCheck {
  "allowed": boolean;
  "reasons": Array<CoreDocumentBlockReason>;
}

export interface CoreDocumentBlockReason {
  "code": "no_poster" | "marked_deleted" | "posted" | "not_posted" | "payload_invalid" | "movement_invalid" | "balance_negative" | "ledger_incomplete" | "period_closed";
  "message": string;
  "detail"?: string;
  "shortages"?: Array<CoreBalanceShortage>;
}

export interface CoreDocumentBlockers {
  "document_id": UUID;
  "status": CoreDocumentStatus;
  "post": CoreDocumentActionCheck;
  "cancel": CoreDocumentActionCheck;
  "mark_deleted": CoreDocumentActionCheck;
}

export interface CoreDocumentCreate {
  "type_id": UUID;
  /** Required for external numbering and forbidden for sequence numbering */
  "number"?: string;
  /** Empty or omitted means today */
  "date"?: string;
  "basis_id"?: UUID | null;
  "entity_refs"?: { [key: string]: unknown };
  "payload"?: { [key: string]: unknown };
  "comment"?: string;
}

export interface CoreDocumentLinkNode {
  "direction": "self" | "basis" | "dependent";
  "depth": number;
  "id": UUID;
  "type_id": UUID;
  "type_key": string;
  "type_name": string;
  "number": string;
  "date": string;
  "status": CoreDocumentStatus;
  "is_marked_deleted": boolean;
  "basis_id": UUID | null;
}

export interface CoreDocumentLinks {
  "document": CoreDocumentLinkNode;
  "basis": Array<CoreDocumentLinkNode>;
  "dependents": Array<CoreDocumentLinkNode>;
  "movements": Array<CoreDocumentMovementSummary>;
  "truncated": boolean;
}

export interface CoreDocumentMarkDeleted {
  "marked"?: boolean;
}

export interface CoreDocumentMovementSummary {
  "register_id": UUID;
  "register_key": string;
  "register_name": string;
  "register_kind": CoreRegisterKind;
  "dims": { [key: string]: unknown };
  "sign": number;
  "values": { [key: string]: unknown };
  "entry_count": number;
}

export interface CoreDocumentPage {
  "count": number;
  "results": Array<CoreDocument>;
}

export interface CoreDocumentPatch {
  "date"?: string;
  "basis_id"?: UUID | null;
  "entity_refs"?: { [key: string]: unknown };
  "payload"?: { [key: string]: unknown };
  "comment"?: string;
}

export type CoreDocumentStatus = "draft" | "posted" | "cancelled";

export interface CoreDocumentType {
  "id": UUID;
  "key": string;
  "name": string;
  "module": string;
  "is_system": boolean;
  "number_template": string;
  "number_reset": CoreNumberReset;
  "number_source": CoreNumberSource;
  "settings": { [key: string]: unknown };
  "document_count": number;
  "created_at": string;
  "updated_at": string;
}

export interface CoreDocumentTypeCreate {
  "key": string;
  "name": string;
  "module"?: string;
  "number_template"?: string;
  "number_reset"?: CoreNumberReset;
  "number_source"?: CoreNumberSource;
  "settings"?: { [key: string]: unknown };
}

export interface CoreDocumentTypePage {
  "count": number;
  "results": Array<CoreDocumentType>;
}

export interface CoreDocumentTypePatch {
  "name"?: string;
  "number_template"?: string;
  "number_reset"?: CoreNumberReset;
  "settings"?: { [key: string]: unknown };
}

export interface CoreEmployee {
  "id": UUID;
  "full_name": string;
  "first_name": string;
  "last_name": string;
  "middle_name": string;
  "position": string;
  "position_id": string | null;
  "position_label": string;
  "company_id": string | null;
  "company_name": string;
  "department": string;
  "location": string;
  "manager_employee_id": string | null;
  "manager_name": string;
  "phone": string;
  "email": string;
  "user_id": number | null;
  "username": string;
  "role_name": string;
  /** Date or empty string */
  "employed_at": string;
  "is_active": boolean;
  "notes": string;
  "has_photo": boolean;
  "created_at": string;
  "updated_at": string;
}

export interface CoreEmployeeCreateVariant1 {
  "full_name": string;
}

export interface CoreEmployeeCreateVariant2 {
  "first_name": string;
}

export interface CoreEmployeeCreateVariant3 {
  "last_name": string;
}

export interface CoreEmployeeCreateVariant4 {
  "middle_name": string;
}

export type CoreEmployeeCreate = CoreEmployeeCreateVariant1 | CoreEmployeeCreateVariant2 | CoreEmployeeCreateVariant3 | CoreEmployeeCreateVariant4;

export interface CoreEmployeeEquipment {
  "id": UUID;
  "employee_id": UUID;
  "employee_name": string;
  "name": string;
  "inventory_no": string;
  "status": "assigned" | "returned";
  /** Date or empty string */
  "assigned_at": string;
  /** Date or empty string */
  "returned_at": string;
  "notes": string;
  "created_at": string;
  "updated_at": string;
}

export interface CoreEmployeeEquipmentInput {
  "employee_id": UUID;
  "name": string;
  "inventory_no"?: string;
  "status": "assigned" | "returned";
  "assigned_at"?: string;
  "returned_at"?: string;
  "notes"?: string;
}

export interface CoreEmployeeEquipmentPage {
  "count": number;
  "results": Array<CoreEmployeeEquipment>;
}

export type CoreEmployeeLifecycleKind = "onboarding" | "offboarding";

export interface CoreEmployeeLifecycleTemplate {
  "id": UUID;
  "kind": CoreEmployeeLifecycleKind;
  "name": string;
  "checklist": Array<string>;
  "is_active": boolean;
  "created_at": string;
  "updated_at": string;
}

export interface CoreEmployeeLifecycleTemplateInput {
  "kind": CoreEmployeeLifecycleKind;
  "name": string;
  "checklist": Array<string>;
  "is_active"?: boolean;
}

export interface CoreEmployeeLifecycleTemplatePage {
  "count": number;
  "results": Array<CoreEmployeeLifecycleTemplate>;
}

export interface CoreEmployeePage {
  "count": number;
  /** Применённый размер страницы — после зажима до потолка */
  "limit": number;
  /** Применённое смещение */
  "offset": number;
  "results": Array<CoreEmployee>;
}

export interface CoreEmployeePatch {
  "full_name"?: string;
  "first_name"?: string;
  "last_name"?: string;
  "middle_name"?: string;
  "position"?: string | null;
  "position_id"?: string | null;
  "company_id"?: string | null;
  "department"?: string;
  "location"?: string;
  "phone"?: string;
  "email"?: string;
  "user_id"?: number | null;
  "manager_employee_id"?: string | null;
  "employed_at"?: string | null;
  "is_active"?: boolean;
  "notes"?: string;
}

export interface CoreExternalContactCandidate {
  "external_id": string;
  "external_name": string;
  "inn": string;
  "kpp": string;
}

export interface CoreExternalContactMatchOption {
  "id": UUID;
  "name": string;
  "kpp": string;
}

export type CoreExternalContactMatchOutcome = "matched" | "ambiguous" | "not_found" | "no_inn" | "invalid_inn" | "rejected" | "already_linked" | "no_external_id";

export interface CoreExternalContactMatchReport {
  "summary": CoreExternalContactMatchSummary;
  "results": Array<CoreExternalContactMatchResult>;
}

export interface CoreExternalContactMatchRequest {
  "source_system": string;
  "source_ref"?: string;
  "external_kind": string;
  "candidates": Array<CoreExternalContactCandidate>;
}

export interface CoreExternalContactMatchResult {
  "candidate": CoreExternalContactCandidate;
  "outcome": CoreExternalContactMatchOutcome;
  "contact_id": string | null;
  "notes": Array<"kpp_resolved" | "name_differs">;
  "options": Array<CoreExternalContactMatchOption>;
}

export interface CoreExternalContactMatchSummary {
  "total": number;
  "matched": number;
  "ambiguous": number;
  "not_found": number;
  "no_inn": number;
  "invalid_inn": number;
  "rejected": number;
  "already_linked": number;
  "no_external_id": number;
}

export interface CoreExternalRef {
  "id": UUID;
  "source_system": string;
  "source_ref": string;
  "external_kind": string;
  "external_id": string;
  "external_name": string;
  "entity_type": CoreExternalRefEntityType;
  "entity_id": string | null;
  "match_source": CoreExternalRefMatchSource;
  "decided_at"?: string;
  "created_at": string;
  "updated_at": string;
}

export type CoreExternalRefEntityType = "contact" | "product" | "item" | "gl_account" | "employee";

export interface CoreExternalRefInput {
  /** Known value onec or another stable integration key */
  "source_system": string;
  /** Concrete connection or export namespace */
  "source_ref"?: string;
  "external_kind": string;
  "external_id": string;
  "external_name"?: string;
  "entity_type": CoreExternalRefEntityType;
  "entity_id"?: string;
  "match_source"?: CoreExternalRefMatchSource;
}

export interface CoreExternalRefLinkRequest {
  "entity_id": UUID;
}

export type CoreExternalRefMatchSource = "pending" | "rejected" | "auto" | "manual" | "import";

export interface CoreExternalRefPage {
  "count": number;
  "results": Array<CoreExternalRef>;
}

export type CoreExternalRefRememberRequest = unknown | unknown;

export interface CoreExternalRefResolveRequest {
  "source_system": string;
  "source_ref"?: string;
  "external_kind": string;
  "external_ids": Array<string>;
}

export interface CoreExternalRefResolveResult {
  "count": number;
  "matches": { [key: string]: string };
}

export interface CoreFolder {
  "id": UUID;
  "scope": CoreFolderScope;
  "parent_id": UUID | null;
  "name": string;
  "defaults": { [key: string]: unknown };
  "sort_order": number;
  "item_count": number;
}

export interface CoreFolderInput {
  "scope": CoreFolderScope;
  "parent_id"?: UUID | null;
  "name": string;
  "defaults"?: { [key: string]: unknown };
  "sort_order"?: number;
}

export interface CoreFolderPage {
  "count": number;
  "results": Array<CoreFolder>;
}

export type CoreFolderScope = "dictionary" | "product" | "contact";

export interface CoreGLAccount {
  "id": UUID;
  "code": string;
  "name": string;
  "type": CoreGLAccountType;
  "parent_id"?: UUID;
  "is_active": boolean;
  "is_system": boolean;
  "affects_pnl": boolean;
  "opening_input": "free" | "contact" | "employee" | "stock" | "money";
  "affects_cashflow": boolean;
  "created_at": string;
  "updated_at": string;
}

export interface CoreGLAccountCreate {
  "code": string;
  "name": string;
  "type": CoreGLAccountType;
  "parent_id"?: UUID;
  /** Ignored; server derives it from type */
  "affects_pnl"?: boolean;
  "affects_cashflow"?: boolean;
}

export interface CoreGLAccountPage {
  "count": number;
  "results": Array<CoreGLAccount>;
}

export interface CoreGLAccountPatch {
  "name"?: string;
  "parent_id"?: UUID;
  "is_active"?: boolean;
  "affects_cashflow"?: boolean;
}

export type CoreGLAccountType = "asset" | "liability" | "equity" | "income" | "expense";

export interface CoreGLMapping {
  "id": UUID;
  "subject_type": "item" | "money_account" | "contact";
  "subject_id"?: UUID;
  "account_id": UUID;
  "account_code": string;
  "account_name": string;
  "valid_from": string;
  "valid_to"?: string;
  "is_system": boolean;
  "comment": string;
}

export interface CoreGLMappingCreate {
  "subject_type": "item" | "money_account" | "contact";
  "subject_id"?: UUID;
  "account_id": UUID;
  /** Omitted means today */
  "valid_from"?: string;
  "comment"?: string;
}

export interface CoreGLMappingPage {
  "count": number;
  "results": Array<CoreGLMapping>;
}

export interface CoreGLOpeningImport {
  "id": UUID;
  "status": CoreGLOpeningImportStatus;
  "format": CoreProductTransferFormat;
  "source_name": string;
  "source_size": number;
  "report_title": string;
  "has_opening": boolean;
  "has_closing": boolean;
  "document_id": string | null;
  "created_at": string;
  "applied_at"?: string;
  "rows": Array<CoreGLOpeningImportRow> | null;
  "warnings": Array<CoreGLOpeningWarning>;
}

export interface CoreGLOpeningImportAppliedRequest {
  "document_id": UUID;
}

export interface CoreGLOpeningImportPage {
  "count": number;
  "results": Array<CoreGLOpeningImport>;
}

export interface CoreGLOpeningImportRow {
  "line": number;
  "code": string;
  "name": string;
  "subconto"?: string;
  /** Decimal string without float conversion */
  "opening_debit": string;
  /** Decimal string without float conversion */
  "opening_credit": string;
  /** Decimal string without float conversion */
  "closing_debit": string;
  /** Decimal string without float conversion */
  "closing_credit": string;
  "account_id": string | null;
  "account_code": string;
  "account_name": string;
  "opening_input": "" | "free" | "contact" | "employee" | "stock" | "money";
  "match": CoreGLOpeningMatch;
  "notes": Array<CoreGLOpeningNote>;
  "contact_id"?: string;
  "contact_name"?: string;
  "employee_id"?: string;
  "employee_name"?: string;
}

export type CoreGLOpeningImportStatus = "draft" | "applied";

export type CoreGLOpeningMatch = "exact" | "rollup" | "side" | "none" | "skipped";

export type CoreGLOpeningNote = "rollup" | "side_guess" | "no_account" | "has_detail" | "needs_party" | "needs_staff" | "party_found" | "staff_found" | "owned_stock" | "owned_money" | "no_balance";

export type CoreGLOpeningWarning = "no_columns" | "no_rows" | "unbalanced" | "no_opening" | "no_closing";

export interface CoreImportResult {
  "created": number;
  "updated": number;
}

export interface CoreItem {
  "id": UUID;
  "code": string;
  "name": string;
  "use_cashflow": boolean;
  "cashflow_section": "operating" | "investing" | "financing" | "transfer" | "";
  "cashflow_section_name"?: string;
  "cashflow_parent_id"?: UUID;
  "cashflow_sort_order": number;
  "use_pnl": boolean;
  "pnl_sign"?: number;
  "is_system": boolean;
  "pnl_parent_id"?: UUID;
  "pnl_sort_order": number;
  "usage_count": number;
}

export interface CoreItemInput {
  "code"?: string;
  "name": string;
  "use_cashflow"?: boolean;
  "cashflow_section"?: "operating" | "investing" | "financing" | "transfer";
  "cashflow_parent_id"?: UUID;
  "cashflow_sort_order"?: number;
  "use_pnl"?: boolean;
  "pnl_sign"?: number;
  "pnl_parent_id"?: UUID;
  "pnl_sort_order"?: number;
}

export interface CoreItemMove {
  "application": "cashflow" | "pnl";
  "parent_id"?: UUID;
  "cashflow_section"?: "operating" | "investing" | "financing" | "transfer";
  "position": number;
}

export interface CoreItemPage {
  "count": number;
  "results": Array<CoreItem>;
}

export type CoreNumberReset = "year" | "never";

export type CoreNumberSource = "sequence" | "external";

export interface CoreObjectUsage {
  "blocked": boolean;
  "rows": Array<CoreObjectUsageRow>;
  "message": string;
}

export interface CoreObjectUsageRow {
  "source": "register" | "document";
  "key": string;
  "name": string;
  "count": number;
}

export interface CoreOwnershipVersion {
  "id": UUID;
  "business_id": UUID;
  "valid_from": string;
  "valid_to"?: string;
  "owners": Array<CoreBusinessOwner>;
}

export interface CoreOwnershipVersionInput {
  "valid_from": string;
  "owners": Array<CoreBusinessOwnerInput>;
}

export interface CorePhotoResult {
  "photo_url": string;
}

export interface CoreProduct {
  "id": UUID;
  "sku": string;
  "name": string;
  "unit": string;
  "unit_id": UUID | null;
  /** Decimal monetary value */
  "price": string;
  "external_id": string;
  "kind": CoreProductKind;
  "is_sellable": boolean;
  "is_stockable": boolean;
  "is_purchasable": boolean;
  "is_producible": boolean;
  "folder_id": UUID | null;
  "category_id": UUID | null;
  "category_label": string;
  "record_kind": CoreProductRecordKind;
  "parent_product_id": UUID | null;
  "parent_product_name": string;
  "custom": { [key: string]: unknown };
  "is_active": boolean;
  "archived_at": string | null;
  "created_at": string;
  "updated_at": string;
}

export interface CoreProductBulkPatch {
  "ids": Array<UUID>;
  "folder_id"?: UUID | null;
  "is_sellable"?: boolean;
  "is_stockable"?: boolean;
  "is_purchasable"?: boolean;
  "is_producible"?: boolean;
}

export interface CoreProductCreate {
  "sku"?: string;
  "name": string;
  "unit"?: string;
  "unit_id"?: UUID | null;
  "price"?: string;
  "external_id"?: string;
  "kind"?: CoreProductKind;
  "is_sellable"?: boolean;
  "is_stockable"?: boolean;
  "is_purchasable"?: boolean;
  "is_producible"?: boolean;
  "category_id"?: UUID | null;
  "record_kind"?: CoreProductRecordKind;
  "parent_product_id"?: UUID | null;
  "custom"?: { [key: string]: unknown };
}

export interface CoreProductCustomInput {
  "custom": { [key: string]: unknown };
}

export interface CoreProductExport {
  "id": UUID;
  "kind": CoreProductTransferKind;
  "format": CoreProductTransferFormat;
  "status": "ready";
  "file_name": string;
  "size": number;
  "row_count": number;
  "created_by"?: number;
  "created_at": string;
}

export interface CoreProductExportRequest {
  "kind": CoreProductTransferKind;
  "format"?: CoreProductTransferFormat;
}

export interface CoreProductFieldDefinition {
  "id": UUID;
  "entity_type": string;
  "key": string;
  "label": string;
  "type": string;
  "required": boolean;
  "dictionary": UUID | null;
  "order": number;
  "help": string;
}

export interface CoreProductFieldSchema {
  "fields": Array<CoreProductFieldDefinition>;
}

export interface CoreProductIdentifier {
  "id": UUID;
  "product_id": UUID;
  "kind": CoreProductIdentifierKind;
  "source_ref": string;
  "value": string;
  "normalized_value": string;
  "is_primary": boolean;
  "is_active": boolean;
  "attrs": { [key: string]: unknown };
  "created_at": string;
  "updated_at": string;
}

export interface CoreProductIdentifierInput {
  "kind": CoreProductIdentifierKind;
  /** Required for article kinds; optional for barcode */
  "source_ref"?: string;
  "value": string;
  "is_primary"?: boolean;
  "attrs"?: { [key: string]: unknown };
}

export type CoreProductIdentifierKind = "manufacturer_article" | "supplier_article" | "channel_article" | "barcode";

export interface CoreProductIdentifierPage {
  "count": number;
  "results": Array<CoreProductIdentifier>;
}

export interface CoreProductIdentifierPatch {
  "kind"?: CoreProductIdentifierKind;
  "source_ref"?: string;
  "value"?: string;
  "is_primary"?: boolean;
  "attrs"?: { [key: string]: unknown };
}

export interface CoreProductImportApplyRequest {
  "preview_token": string;
  "confirm_warnings"?: boolean;
}

export interface CoreProductImportDiff {
  "row": number;
  "action": "create" | "update" | "unchanged";
  "target_id"?: string;
  "sku"?: string;
  "name"?: string;
  "changes"?: { [key: string]: string };
}

export interface CoreProductImportField {
  "key": string;
  "label": string;
  "required": boolean;
  "type": string;
}

export interface CoreProductImportFinishRequest {
  "file_id": UUID;
}

export interface CoreProductImportInspectRequest {
  "sheet_name": string;
  "header_row": number;
}

export interface CoreProductImportIssue {
  "sheet": string;
  "row": number;
  "column": string;
  "code": string;
  "severity": "warning" | "error";
  "value"?: string;
  "message": string;
  "hint"?: string;
}

export interface CoreProductImportIssuePage {
  "count": number;
  "results": Array<CoreProductImportIssue>;
}

export type CoreProductImportMapping = unknown | unknown;

export interface CoreProductImportMappingState {
  "sheet_name": string;
  "header_row": number;
  "columns": { [key: string]: string };
  "expected_revision"?: number;
}

export type CoreProductImportMode = "create_only" | "upsert";

export interface CoreProductImportRun {
  "id": UUID;
  "kind": CoreProductTransferKind;
  "format": CoreProductTransferFormat;
  "status": CoreProductImportStatus;
  "mode": CoreProductImportMode;
  "source_name": string;
  "source_sha256": string;
  "source_size": number;
  "mapping": CoreProductImportMappingState;
  "schema_version": "core-products-v1";
  "revision": number;
  "schema_revision"?: string;
  "reference_revision"?: string;
  "preview_token"?: string;
  "diff"?: Array<CoreProductImportDiff>;
  "issues"?: Array<CoreProductImportIssue>;
  "created_count": number;
  "updated_count": number;
  "unchanged_count": number;
  "warning_count": number;
  "error_count": number;
  "created_by"?: number;
  "created_at": string;
  "previewed_at"?: string;
  "applied_at"?: string;
  "source_columns"?: Array<string>;
  "source_sheets"?: Array<CoreProductImportSheet>;
  "target_fields"?: Array<CoreProductImportField>;
}

export interface CoreProductImportSheet {
  "name": string;
}

export type CoreProductImportStatus = "awaiting_upload" | "uploading" | "uploaded" | "mapped" | "previewed" | "failed" | "applied";

export interface CoreProductImportUploadSession {
  "file_id": UUID;
  /** Относительный защищённый API URL */
  "upload_url": string;
  "method": "PUT";
  "headers": { [key: string]: string };
  "max_bytes": 26214400;
  "expires_at": string;
  "requires_authorization": "Bearer token or API key";
}

export interface CoreProductImportUploadSessionRequest {
  "kind": CoreProductTransferKind;
  "mode": CoreProductImportMode;
  /** Имя с расширением xlsx, xls, ods, csv или tsv */
  "filename": string;
  "size": number;
}

export type CoreProductKind = "goods" | "service" | "material" | "semi_product";

export interface CoreProductPage {
  "count": number;
  "results": Array<CoreProduct>;
}

export interface CoreProductPatch {
  "sku"?: string;
  "name"?: string;
  "unit"?: string;
  "unit_id"?: UUID | null;
  "price"?: string;
  "external_id"?: string;
  "kind"?: CoreProductKind;
  "is_sellable"?: boolean;
  "is_stockable"?: boolean;
  "is_purchasable"?: boolean;
  "is_producible"?: boolean;
  "category_id"?: UUID | null;
  "folder_id"?: UUID | null;
}

export type CoreProductRecordKind = "standalone" | "family" | "variant";

export type CoreProductTransferFormat = "xlsx" | "xls" | "ods" | "csv" | "tsv";

export type CoreProductTransferKind = "product_families" | "products" | "product_identifiers";

export interface CoreReferenceItem {
  "id": UUID;
  /** Стабильная ссылка на значение: код переживает перенос данных, идентификатор — нет */
  "code": string;
  "label": string;
  "is_active": boolean;
}

export interface CoreReferenceItemPage {
  "count": number;
  "results": Array<CoreReferenceItem>;
  /** Адрес собственного API типизированного справочника. Приходит вместе с пустым списком: общий список значений такой справочник не заменяет */
  "api"?: string;
  /** Пояснение к пустому ответу типизированного справочника */
  "detail"?: string;
}

export interface CoreReferenceRef {
  /** Ключ справочника из каталога (units) либо его полное имя (core.units, app.acme.crm.regions). Полное имя отличает справочник приложения от штатного с тем же последним сегментом */
  "directory_key": string;
  /** Код значения. Указывается код или идентификатор; без обоих ссылка не разрешается */
  "code"?: string;
  "id"?: UUID;
}

export interface CoreReferenceResolveRequest {
  "refs": Array<CoreReferenceRef>;
}

export interface CoreReferenceResolveResult {
  "count": number;
  "results": Array<CoreReferenceVerdict>;
}

export interface CoreReferenceVerdict {
  "directory_key": string;
  "code"?: string;
  "id"?: UUID;
  "resolved": boolean;
  "label"?: string;
  "is_active"?: boolean;
  /** Причина отказа словом. «Справочник не найден или недоступен» и «Значение не найдено в этом справочнике» — разные ошибки */
  "reason"?: string;
}

export interface CoreRegister {
  "id": UUID;
  "key": string;
  "name": string;
  "kind": CoreRegisterKind;
  "module": string;
  "is_system": boolean;
  "dimensions": Array<CoreRegisterDimension>;
  "resources": Array<CoreRegisterResource>;
  "has_entries": boolean;
  "entry_count": number;
  "last_entry_at": string;
  "created_at": string;
  "updated_at": string;
}

export interface CoreRegisterBalancePage {
  "count": number;
  /** Применённый размер страницы — то число, на котором читающая функция реально режет выдачу */
  "limit": number;
  /** Применённое смещение */
  "offset": number;
  "results": Array<CoreRegisterBalanceRow>;
}

export interface CoreRegisterBalanceRow {
  "dims": { [key: string]: unknown };
  "totals": { [key: string]: unknown };
  "entry_count": number;
}

export interface CoreRegisterCreate {
  "key": string;
  "name": string;
  "kind"?: CoreRegisterKind;
  "module"?: string;
  "dimensions"?: Array<CoreRegisterDimension>;
  "resources"?: Array<CoreRegisterResource>;
}

export interface CoreRegisterDimension {
  "key": string;
  "ref": string;
  "name"?: string;
  "required"?: boolean;
}

export interface CoreRegisterEntry {
  "id": UUID;
  "register_id": UUID;
  "register_key": string;
  "register_name": string;
  "registrar_type": UUID;
  "registrar_type_key": string;
  "registrar_type_name": string;
  "registrar_id": UUID;
  "registrar_number": string;
  "registrar_date": string;
  "registrar_status": CoreDocumentStatus;
  "date": string;
  "sign": number;
  "dims": { [key: string]: unknown };
  "values": { [key: string]: unknown };
  "created_at": string;
}

export interface CoreRegisterEntryPage {
  "count": number;
  "results": Array<CoreRegisterEntry>;
}

export type CoreRegisterKind = "balance" | "turnover" | "info";

export interface CoreRegisterPage {
  "count": number;
  /** Применённый размер страницы — после зажима до потолка */
  "limit": number;
  /** Применённое смещение */
  "offset": number;
  "results": Array<CoreRegister>;
}

export interface CoreRegisterPatch {
  "name"?: string;
  "dimensions"?: Array<CoreRegisterDimension>;
  "resources"?: Array<CoreRegisterResource>;
}

export interface CoreRegisterResource {
  "key": string;
  "type": "numeric" | "money";
  "unit"?: string;
  "name"?: string;
  /** Optional translation key for a system resource label. */
  "label_key"?: string;
  "balanced"?: boolean;
  "posts_to_ledger"?: boolean;
  "ledger_account_dim"?: string;
  "ledger_counter_dim"?: string;
  "ledger_account_by_value"?: { [key: string]: string };
  "ledger_liability_values"?: Array<string>;
}

export interface CoreRegisterTurnoverPage {
  "count": number;
  /** Применённый размер страницы — то число, на котором читающая функция реально режет выдачу */
  "limit": number;
  /** Применённое смещение */
  "offset": number;
  "results": Array<CoreRegisterTurnoverRow>;
}

export interface CoreRegisterTurnoverRow {
  "period"?: string;
  "dims": { [key: string]: unknown };
  "incoming": { [key: string]: unknown };
  "outgoing": { [key: string]: unknown };
  "net": { [key: string]: unknown };
  "entry_count": number;
}

export interface CoreTrialBalance {
  "date_from": string;
  "date_to": string;
  "currency": string;
  "rows": Array<CoreTrialBalanceRow>;
  "totals": CoreTrialBalanceTotals;
}

export interface CoreTrialBalanceRow {
  "account_id": UUID;
  "code": string;
  "name": string;
  "type": CoreGLAccountType;
  "opening_debit": string;
  "opening_credit": string;
  "turnover_debit": string;
  "turnover_credit": string;
  "closing_debit": string;
  "closing_credit": string;
  "entry_count": number;
}

export interface CoreTrialBalanceTotals {
  "opening_debit": string;
  "opening_credit": string;
  "turnover_debit": string;
  "turnover_credit": string;
  "closing_debit": string;
  "closing_credit": string;
  "balanced": boolean;
}

export interface CoreUIState {
  "screens": { [key: string]: unknown };
}

export interface Customer {
  "id": UUID;
  "name": string;
  "owner_id": number | null;
  "owner_name": string;
  "status": string;
  "tier": string;
  "revenue": string | null;
  "size": number | null;
  "domains": Array<string>;
  "external_ids": Array<string>;
  "needs_count": number;
  "is_archived": boolean;
  "created_at": string;
  "updated_at": string;
}

export interface CustomerCreate {
  "name": string;
  /** ID, username или полное имя пользователя */
  "owner"?: string;
  "status"?: string;
  "tier"?: string;
  "revenue"?: string;
  "size"?: number;
  "domains"?: Array<string>;
  "external_ids"?: Array<string>;
}

export interface CustomerNeed {
  "id": UUID;
  "customer": UUID | null;
  "customer_name": string;
  "section": UUID | null;
  "section_key": string;
  "section_name": string;
  "task": UUID | null;
  "task_identifier": string;
  "task_title": string;
  "body": string;
  "priority": number;
  "is_archived": boolean;
  "created_at": string;
  "updated_at": string;
}

export interface CustomerNeedCreate {
  "customer"?: string;
  "section"?: string;
  "task"?: string;
  "body": string;
  "priority"?: number;
}

export interface CustomerNeedPage {
  "count": number;
  "results": Array<CustomerNeed>;
}

export interface CustomerNeedUpdate {
  "customer"?: string;
  "section"?: string;
  "task"?: string;
  "body"?: string;
  "priority"?: number;
  "is_archived"?: boolean;
}

export interface CustomerPage {
  "count": number;
  "results": Array<Customer>;
}

export interface CustomerUpdate {
  "name"?: string;
  "owner"?: string;
  "status"?: string;
  "tier"?: string;
  "revenue"?: string;
  "size"?: number;
  "domains"?: Array<string>;
  "external_ids"?: Array<string>;
  "is_archived"?: boolean;
}

export interface Cycle {
  "id": UUID;
  "owner_type": CycleOwnerType;
  "owner_id": UUID;
  "owner_key": string;
  "owner_name": string;
  "name": string;
  "description": string;
  "starts_at": string | null;
  "ends_at": string | null;
  "status": CycleStatus;
  "order": number;
  "is_archived": boolean;
  "task_count": number;
  "tasks_done": number;
  "created_at": string;
  "updated_at": string;
}

/** Владелец задаётся `section`, `project` или парой `owner_type`/`owner_id`. */
export interface CycleCreate {
  "owner_type"?: CycleOwnerType;
  "owner_id"?: string;
  "section"?: string;
  "project"?: string;
  "name": string;
  "description"?: string;
  "starts_at"?: string;
  "ends_at"?: string;
  "status"?: CycleStatus;
  "order"?: number;
}

export type CycleOwnerType = "section" | "project";

export interface CyclePage {
  "count": number;
  "results": Array<Cycle>;
}

export type CycleStatus = "planned" | "active" | "completed" | "cancelled";

export interface CycleUpdate {
  "owner_type"?: CycleOwnerType;
  "owner_id"?: string;
  "section"?: string;
  "project"?: string;
  "name"?: string;
  "description"?: string;
  "starts_at"?: string;
  "ends_at"?: string;
  "status"?: CycleStatus;
  "order"?: number;
  "is_archived"?: boolean;
}

export interface DeveloperAccepted {
  /** Единственное значение: исход не различается снаружи ни телом, ни кодом */
  "status": "accepted";
  /** Условная формулировка «если этот адрес может быть зарегистрирован — мы отправили письмо»: она правдива при любом исходе */
  "detail": string;
}

export interface DeveloperAccount {
  "id": UUID;
  /** Единственный идентификатор человека в этом контуре; кабинета и роли у аккаунта нет вовсе */
  "email": string;
  /** Имя, которым разработчик подписывается; повторная регистрация его не переписывает */
  "display_name": string;
  "status": DeveloperAccountStatus;
  "email_confirmed_at"?: string;
  "last_sign_in_at"?: string;
  "suspended_at"?: string;
  "suspend_reason": string;
  "revoked_at"?: string;
  "revoke_reason": string;
  "created_at": string;
  "updated_at": string;
}

export type DeveloperAccountStatus = "pending" | "active" | "suspended" | "revoked";

export interface DeveloperApplication {
  "id": UUID;
  "account_id": UUID;
  /** Запрошенное имя издателя; из него собирается пространство app.<издатель>.<ключ> */
  "requested_slug": string;
  "legal_name": string;
  /** Код страны из двух букв */
  "country": string;
  /** Внешний адрес https */
  "homepage": string;
  "contact_email": string;
  "incident_email": string;
  "status": DeveloperApplicationStatus;
  "reviewed_at"?: string;
  /** Сотрудник платформы, принявший решение */
  "reviewed_by"?: number;
  /** Причина отказа; заявитель видит её у себя */
  "decision_reason": string;
  /** Заведённый издатель; пусто, пока решения нет */
  "publisher_slug": string;
  "created_at": string;
  "updated_at": string;
}

export interface DeveloperApplicationInput {
  /** Запрошенное имя издателя: строчные латинские буквы, цифры и дефисы; служебные имена платформы и имена модулей продукта не выдаются */
  "slug": string;
  "legal_name": string;
  /** Код страны из двух букв */
  "country"?: string;
  /** Внешний адрес https */
  "homepage"?: string;
  "contact_email": string;
  "incident_email"?: string;
}

export interface DeveloperApplicationResult {
  "application": DeveloperApplication;
}

export type DeveloperApplicationStatus = "submitted" | "approved" | "rejected" | "withdrawn";

export interface DeveloperProfile {
  "account": DeveloperAccount;
  "application"?: DeveloperApplication;
  /** Издатели, которыми распоряжается аккаунт */
  "publishers": Array<PlatformAppPublisher>;
}

export interface DeveloperRegistrationInput {
  "email": string;
  /** Как подписывать письма; необязательно и учётными данными не является */
  "name"?: string;
}

export interface DeveloperSession {
  /** Значение сессии; показывается ровно один раз, в хранилище лежит только хеш */
  "token": string;
  /** Секунды до истечения сессии */
  "expires_in": number;
  "account": DeveloperAccount;
}

export interface DeveloperSessionInput {
  /** Одноразовый секрет из письма; действует минуты и предъявляется один раз */
  "code": string;
}

export interface DeveloperSignInLinkInput {
  "email": string;
}

export interface DiscussionComment {
  "id": UUID;
  "owner_type": DiscussionOwnerType;
  "owner_id": UUID;
  "parent_id": UUID | null;
  "author_id": number | null;
  "author_name": string;
  "body": string;
  "is_archived": boolean;
  "created_at": string;
  "updated_at": string;
}

/** Для ответа достаточно `parent_id`; владелец наследуется от родительского комментария. */
export interface DiscussionCommentCreate {
  "owner_type"?: DiscussionOwnerType;
  "owner_id"?: string;
  "task"?: string;
  "section"?: string;
  "project"?: string;
  "document"?: string;
  "milestone"?: string;
  "customer_need"?: string;
  "pull_request"?: string;
  "parent_id"?: string;
  "body": string;
  "author"?: number;
}

export interface DiscussionCommentPage {
  "count": number;
  "results": Array<DiscussionComment>;
}

export interface DiscussionCommentUpdate {
  "body"?: string;
  "is_archived"?: boolean;
}

export type DiscussionOwnerType = "task" | "section" | "project" | "document" | "milestone" | "customer_need" | "pull_request";

/** Владелец задаётся одной ссылкой `task`, `section`, `project`, `milestone` либо парой `owner_type`/`owner_id`. */
export interface DocumentCreate {
  "owner_type"?: DocumentOwnerType;
  "owner_id"?: string;
  "task"?: string;
  "section"?: string;
  "project"?: string;
  "milestone"?: string;
  "title": string;
  "content"?: string;
  "icon"?: string;
  "color"?: string;
  "author"?: number;
}

export type DocumentOwnerType = "task" | "section" | "project" | "milestone";

export interface DocumentPage {
  "count": number;
  "results": Array<TaskDocument>;
}

export interface DocumentUpdate {
  "owner_type"?: DocumentOwnerType;
  "owner_id"?: string;
  "task"?: string;
  "section"?: string;
  "project"?: string;
  "milestone"?: string;
  "title"?: string;
  "content"?: string;
  "icon"?: string;
  "color"?: string;
  "is_archived"?: boolean;
}

export interface DurationMetric {
  "samples": number;
  "median_seconds": number;
  "percentile_85_seconds": number;
}

export type EmptyObject = { [key: string]: unknown };

export interface Error {
  /** One human sentence in the request language (Accept-Language, echoed as Content-Language) */
  "detail": string;
  /** Stable module error code when the endpoint defines one */
  "code"?: string;
  /** Case id. Always present on 5xx and on any error produced by the server itself; the same value is returned in the X-Request-ID header and recorded in the access log and the incident. Quote it to support instead of the cause, which the response never carries. */
  "request_id"?: string;
}

export interface FileUpload {
  "file": string;
}

export interface FinanceAccount {
  "id": UUID;
  "company": string | null;
  "bank": string | null;
  "company_name": string;
  "company_directory_name": string;
  "company_inn": string;
  "company_is_active": boolean;
  "name": string;
  "bank_name": string;
  "bic": string;
  "number": string;
  "currency": string;
  "gl_account": string | null;
  "is_active": boolean;
  /** Decimal string */
  "opening_balance": string;
  /** Decimal string */
  "balance": string;
  "txn_count": number;
  "connector": string | null;
  "connector_name": string;
  "connector_status": string;
  "sync_enabled": boolean;
  "synced_at": string | null;
  "created_at": string;
  "updated_at": string;
}

export interface FinanceAccountCreate {
  "company"?: string;
  "inn"?: string;
  "company_name"?: string;
  "name": string;
  "bank_name"?: string;
  "bic": string;
  "number": string;
  "currency"?: string;
  "gl_account"?: string;
  /** Decimal string */
  "opening_balance"?: string;
}

export interface FinanceAccountPage {
  "count": number;
  "results": Array<FinanceAccount>;
}

export interface FinanceAccountPatch {
  "company"?: string | null;
  "company_name"?: string;
  "name"?: string;
  "bank_name"?: string;
  "bic"?: string;
  "number"?: string;
  "currency"?: string;
  "gl_account"?: string | null;
  "is_active"?: boolean;
}

export interface FinanceBalanceItem {
  "code": string;
  "name": string;
  "amount": string;
}

export interface FinanceBalanceReport {
  "on": string;
  "currency": string;
  "sections": Array<FinanceBalanceSection>;
  "assets_total": string;
  "passive_total": string;
  "retained_earnings": string;
  "difference": string;
}

export interface FinanceBalanceSection {
  "key": "asset" | "liability" | "equity";
  "label": string;
  "total": string;
  "items": Array<FinanceBalanceItem>;
}

export interface FinanceCashflowEntry {
  "id": UUID;
  "date": string;
  /** Decimal string СО ЗНАКОМ: приход и расход идут одним списком, и знак — единственное, что их различает */
  "amount": string;
  /** Код валюты; нужен и в отчёте по одной валюте, потому что расшифровка открывается и без фильтра */
  "currency": string;
  "counterparty": string;
  /** Назначение платежа */
  "purpose": string;
  /** Счёт или касса — откуда ушли или куда пришли деньги */
  "source": string;
  "document_id"?: UUID;
  "document_number": string;
  "kind"?: FinanceCashflowEntryKind;
  "transaction_id"?: UUID;
}

/** Классификация кассовой операции. Пустая строка в любом поле снимает привязку: операция без статьи, без ответственного и без собственника — законное состояние. */
export interface FinanceCashflowEntryCategorize {
  /** Идентификатор статьи ДДС; пустая строка снимает статью */
  "cashflow_item"?: string;
  /** Идентификатор ответственного; пустая строка снимает ответственного */
  "employee"?: string;
  /** Идентификатор собственника; пустая строка снимает собственника */
  "contact"?: string;
}

export type FinanceCashflowEntryKind = "bank" | "cash";

export interface FinanceCashflowEntryPage {
  /** Сколько операций в ячейке ВСЕГО — считается отдельно, а не по длине выборки */
  "count": number;
  /** Сколько операций поместилось в потолок 200 */
  "shown": number;
  "results": Array<FinanceCashflowEntry>;
}

export interface FinanceCashflowItem {
  "id": string;
  "name": string;
  "net": string;
  "level": string;
}

export interface FinanceCashflowReport {
  "from": string;
  "to": string;
  "inflow": string;
  "outflow": string;
  "uncategorized_net": string;
  "net_cash_flow": string;
  "transfer_in": string;
  "transfer_out": string;
  "sections": Array<FinanceCashflowSection>;
  "columns": Array<FinanceReportColumn>;
}

export interface FinanceCashflowSection {
  "key": "operating" | "investing" | "financing";
  "label": string;
  "net": string;
  "items": Array<FinanceCashflowItem>;
}

/** Мнение внешнего расширения о том, какой статьёй разнести операцию. Классификацией не является: пока человек не принял её штатной командой, в отчётах операции нет. */
export interface FinanceClassificationSuggestion {
  "id": UUID;
  "transaction": UUID;
  /** Установка-автор. Человек обязан видеть, чьё это мнение — иначе совет выглядит выводом самой Akeda */
  "installation": { [key: string]: unknown };
  /** Пространство имён приложения: app.<издатель>.<ключ> */
  "app": string;
  "app_version": string;
  "cashflow_item": UUID;
  "cashflow_item_name": string | null;
  "contact": string | null;
  "contact_name": string | null;
  /** Уверенность долей единицы, decimal string; проценты не принимаются */
  "confidence": string;
  "explanation_ru": string;
  /** Объяснение локализует сам разработчик расширения; обе половины обязательны */
  "explanation_en": string;
  "status": "pending" | "accepted" | "rejected";
  "decided_at": string | null;
  "created_at": string;
  "updated_at": string;
}

export interface FinanceCommercialPosition {
  "terms": FinanceCounterpartyTerms;
  "exposure": FinanceSettlementExposure;
}

export interface FinanceCompanyMatch {
  "status": "linked" | "not_found" | "no_inn";
  "inn": string;
  "company": FinanceDirectoryCompany | null;
  "owner_name": string;
  "suggestion": FinanceCompanySuggestion | null;
  "message": string;
}

export interface FinanceCompanyMatchError {
  "detail": string;
  "company_match": FinanceCompanyMatch;
}

export interface FinanceCompanySuggestion {
  "name": string;
  "legal_name": string;
  "inn": string;
  "kpp": string;
  "address": string;
}

export interface FinanceConnector {
  "id": UUID;
  "provider": FinanceConnectorProviderKey;
  "provider_name": string;
  "display_name": string;
  "company_name": string;
  "company": string | null;
  "company_directory_name": string;
  "company_inn": string;
  "status": FinanceConnectorStatus;
  "status_name": string;
  "auth_kind": FinanceConnectorAuthKind;
  /** Только признак; сохранённый секрет никогда не возвращается */
  "has_credentials": boolean;
  "mtls_certificate": FinanceConnectorMTLSStatus;
  "external_customer_id": string;
  "granted_by_user_id": number | null;
  "granted_by_name": string;
  "granted_at": string | null;
  "import_depth_days": number;
  "overlap_days": number;
  "last_sync_at": string | null;
  "last_sync_status": string;
  /** The provider's own words and nothing else — what the cabinet user can act on ("consent expired", "certificate revoked"). Empty when the failure was ours: an internal cause never reaches this field, it is logged and named by last_error_code instead. */
  "last_error": string;
  /** Machine code of the last failure, translated by the client. Present because the text is stored: it is written in whatever locale the background sync happened to run in, and only a finite code can be rendered in the reader's language. */
  "last_error_code": "" | "finance.connector.internal" | "finance.connector.provider_unauthorized" | "finance.connector.provider_rate_limited" | "finance.connector.provider_declined" | "finance.connector.consent_required";
  "accounts_total": number;
  "accounts_linked": number;
  "created_at": string;
  "updated_at": string;
}

export interface FinanceConnectorAccount {
  "id": UUID;
  "connector": UUID;
  "external_account_id": string;
  "number": string;
  "bic": string;
  "bank_name": string;
  "title": string;
  "currency": string;
  "external_customer_id": string;
  "owner_inn": string;
  "owner_name": string;
  "company": string | null;
  "company_name": string;
  "account": string | null;
  "account_name": string;
  "company_is_active": boolean;
  "is_enabled": boolean;
  "last_synced_at": string | null;
}

export interface FinanceConnectorAccountPage {
  "count": number;
  "results": Array<FinanceConnectorAccount>;
}

export interface FinanceConnectorAccountPatch {
  "account"?: string | null;
  "is_enabled"?: boolean;
}

export type FinanceConnectorAuthKind = "token" | "client_credentials" | "oauth" | "oauth_mtls";

export interface FinanceConnectorConsent {
  "auth_url": string;
}

export interface FinanceConnectorCreate {
  "provider": FinanceConnectorProviderKey;
  "display_name"?: string;
  "company_name"?: string;
  "company"?: string;
  /** Банковский токен либо JSON с client_id/client_secret; никогда не передаётся через MCP */
  "credential"?: string;
  "import_depth_days"?: number;
  "overlap_days"?: number;
}

export interface FinanceConnectorCredentialTestInput {
  "provider": FinanceConnectorProviderKey;
  "credential": string;
}

export interface FinanceConnectorCredentialTestResult {
  "ok": boolean;
  "message": string;
  "accounts": number;
  "company_match"?: FinanceCompanyMatch;
}

export interface FinanceConnectorMTLSInput {
  /** PEM-сертификат клиента */
  "certificate": string;
  /** PEM-закрытый ключ; в ответах и журналах отсутствует */
  "private_key": string;
}

export interface FinanceConnectorMTLSStatus {
  "configured": boolean;
  "expires_at"?: string | null;
  "warning"?: string;
}

export interface FinanceConnectorPage {
  "count": number;
  "results": Array<FinanceConnector>;
}

export interface FinanceConnectorPatch {
  "display_name"?: string;
  "company_name"?: string;
  "company"?: string | null;
  /** Непустой новый секрет; пустая строка сохраняет прежний */
  "credential"?: string;
  "import_depth_days"?: number;
  "overlap_days"?: number;
  "status"?: "connected" | "paused" | "disconnected";
}

export interface FinanceConnectorProvider {
  "key": FinanceConnectorProviderKey;
  "name": string;
  "auth_kind": FinanceConnectorAuthKind;
  "supports_webhook": boolean;
  "credential_hint": string;
  "redirect_path"?: string;
}

export type FinanceConnectorProviderKey = "modulbank" | "tbank" | "tochka" | "alfa" | "sber";

export interface FinanceConnectorProviderPage {
  "count": number;
  "results": Array<FinanceConnectorProvider>;
}

export interface FinanceConnectorStatementCheck {
  "ok": true;
  "transactions": number;
  "message": string;
}

export type FinanceConnectorStatus = "connected" | "paused" | "error" | "reauth_required" | "awaiting_consent" | "disconnected";

export interface FinanceConnectorSyncIntervalOption {
  "minutes": number;
  "label": string;
}

export interface FinanceConnectorSyncResult {
  "connector": FinanceConnector;
  "imported": number;
  "skipped": number;
  "message": string;
}

export interface FinanceConnectorSyncRun {
  "id": UUID;
  "connector": UUID;
  "trigger": "manual" | "schedule" | "webhook";
  "status": "running" | "success" | "partial" | "failed";
  "started_at": string;
  "finished_at": string | null;
  "date_from": string | null;
  "date_to": string | null;
  "imported_count": number;
  "skipped_count": number;
  "error": string;
}

export interface FinanceConnectorSyncRunPage {
  "count": number;
  "results": Array<FinanceConnectorSyncRun>;
}

export interface FinanceConnectorSyncSettings {
  "schedule_interval_minutes": number;
  "mode": string;
  "modulbank_webhook_url": string;
  "interval_options": Array<FinanceConnectorSyncIntervalOption>;
}

export interface FinanceConnectorSyncSettingsInput {
  "schedule_interval_minutes": number;
}

export interface FinanceCounterpartyTerms {
  "id": UUID;
  "contact_id": UUID;
  "company_id"?: string;
  "currency": string;
  /** Decimal string; отсутствие означает, что лимит не задан */
  "credit_limit"?: string;
  "payment_delay_days": number;
  /** Decimal string от 0 до 100 */
  "prepayment_percent": string;
  "valid_from": string;
  "valid_to"?: string;
  "reason": string;
  "created_by"?: number;
  "created_at": string;
  "configured": boolean;
}

export interface FinanceCounterpartyTermsCreate {
  "company_id"?: string;
  "currency": string;
  /** Неотрицательная decimal string */
  "credit_limit"?: string;
  "payment_delay_days": number;
  /** Decimal string от 0 до 100 */
  "prepayment_percent": string;
  "valid_from": string;
  "valid_to"?: string;
  "reason"?: string;
}

export type FinanceDirection = "in" | "out";

export interface FinanceDirectoryCompany {
  "id": UUID;
  "name": string;
  "legal_name": string;
  "inn": string;
  "kpp": string;
  "is_active": boolean;
}

export interface FinanceDividendDecisionInput {
  "policy_id"?: UUID;
  "business_id"?: UUID;
  /** Совместимый алиас: сервер использует бизнес указанного юрлица */
  "company_id"?: UUID;
  "period_from": string;
  "period_to": string;
  /** Пусто = процент политики от сальдо счёта 84 */
  "amount"?: string;
  "comment"?: string;
  "rows"?: Array<FinanceDividendDecisionInputRowsItem>;
}

export interface FinanceDividendDecisionInputRowsItem {
  "owner_id"?: UUID;
  /** Совместимый алиас владельца-контакта */
  "contact_id"?: UUID;
  "amount": string;
}

export interface FinanceDividendPolicyInput {
  "business_id"?: UUID;
  /** Совместимый алиас: сервер использует бизнес указанного юрлица */
  "company_id"?: UUID;
  "name": string;
  "valid_from": string;
  "base_kind"?: "pnl" | "operating_cashflow";
  /** through распределяет прибыль и убыток между владельцами в одинаковых долях */
  "loss_mode"?: "positive_only" | "through";
  /** Доля результата, 0 < x <= 100 */
  "distribution_percent": string;
  /** Устаревшее поле; политика всегда использует процент результата */
  "distribution_rule"?: "percent" | "after_reserve";
  /** Устаревшее поле; резерв больше не участвует в политике */
  "reserve_amount"?: string;
  "cadence": "monthly" | "quarterly" | "yearly" | "interval";
  "interval_months"?: number;
  /** Конец первого периода */
  "starts_on": string;
  "execution_mode": "manual" | "auto_draft" | "auto_post";
  /** Устаревшее поле; владельцы и доли берутся из отдельной структуры владения бизнесом */
  "participants"?: Array<FinanceDividendPolicyInputParticipantsItem>;
}

export interface FinanceDividendPolicyInputParticipantsItem {
  "contact_id": UUID;
  "user_id"?: number;
  "share_percent": string;
}

export interface FinanceExchangeApply {
  "document_id": UUID;
}

export interface FinanceExchangeCreate {
  "company_id": UUID;
  "adapter_key": string;
  "direction": "import" | "export";
  "object_type": "invoice" | "upd" | "closing_document" | "payment";
  "external_id": string;
  "payload_hash": string;
  "metadata"?: { [key: string]: unknown };
}

export interface FinanceExchangeItem {
  "id": UUID;
  "company_id": UUID;
  "adapter_key": string;
  "direction": "import" | "export";
  "object_type": "invoice" | "upd" | "closing_document" | "payment";
  "external_id": string;
  "payload_hash": string;
  "last_payload_hash": string;
  "canonical_document_id"?: string;
  "status": FinanceExchangeStatus;
  "attempt_count": number;
  "first_seen_at": string;
  "last_seen_at": string;
  "applied_at"?: string;
  "last_error": string;
  "last_actor_id"?: number;
  "metadata": { [key: string]: unknown };
  "duplicate"?: boolean;
  "conflict"?: boolean;
}

export interface FinanceExchangePage {
  "count": number;
  "results": Array<FinanceExchangeItem>;
}

export interface FinanceExchangeQuarantine {
  "reason": string;
}

export type FinanceExchangeStatus = "received" | "applied" | "quarantined";

export interface FinanceImportApply {
  "confirm_warnings"?: boolean;
}

export interface FinanceImportDiff {
  "row": number;
  "label": string;
  "values": { [key: string]: string };
  "skipped"?: boolean;
}

export interface FinanceImportField {
  "key": string;
  "label": string;
  "required": boolean;
}

export interface FinanceImportInspect {
  "sheet_name"?: string;
  "header_row"?: number;
}

export interface FinanceImportIssue {
  "row": number;
  "column"?: string;
  "severity": "warning" | "error";
  "message": string;
}

export interface FinanceImportItemMappingRequest {
  /** Карта целиком: «название статьи в файле» → идентификатор статьи справочника ДДС. Заменяет прежнюю карту, поэтому присылать надо всё накопленное, а не одну новую пару. Пустое значение означает «оставить без статьи» и не сохраняется; непустое, но не UUID, отклоняется. */
  "items": { [key: string]: string };
}

export type FinanceImportKind = "bank_transactions" | "cash_operations";

export interface FinanceImportMapping {
  "sheet_name"?: string;
  "header_row"?: number;
  /** Сопоставление «целевое поле Akeda → имя колонки файла». */
  "columns": { [key: string]: string };
  /** Decimal string из заголовка или введённое вручную значение */
  "opening_balance"?: string;
  /** Decimal string из заголовка или введённое вручную значение */
  "closing_balance"?: string;
}

export interface FinanceImportRun {
  "id": UUID;
  "kind": FinanceImportKind;
  "format": string;
  "status": FinanceImportStatus;
  "account_id"?: UUID;
  "wallet_id"?: UUID;
  "source_name": string;
  "source_sha256": string;
  "source_size": number;
  "sheet_name": string;
  "header_row": number;
  "mapping": { [key: string]: string };
  /** Соответствие «название статьи в файле» и идентификатора статьи справочника. Уточняется отдельным маршрутом, потому что набор статей известен только после предпросмотра */
  "item_mapping"?: { [key: string]: string };
  /** Названия статей из файла, которых нет ни в справочнике, ни в карте соответствий */
  "unknown_items"?: Array<string>;
  "diff"?: Array<FinanceImportDiff>;
  "issues"?: Array<FinanceImportIssue>;
  "opening_balance": string;
  "closing_balance": string;
  "computed_closing_balance": string;
  "created_count": number;
  "warning_count": number;
  "error_count": number;
  "created_by"?: number;
  "created_at": string;
  "previewed_at"?: string;
  "applied_at"?: string;
  "source_columns"?: Array<string>;
  "source_sheets"?: Array<FinanceImportSheet>;
  "target_fields"?: Array<FinanceImportField>;
}

export interface FinanceImportSheet {
  "name": string;
}

export type FinanceImportStatus = "uploaded" | "mapped" | "previewed" | "applied";

export interface FinanceImportUpload {
  "file": string;
  "kind": FinanceImportKind;
  "account_id"?: UUID;
  "wallet_id"?: UUID;
}

export interface FinanceOpenAdvance {
  "id": UUID;
  "number": string;
  "date": string;
  /** Decimal string */
  "amount": string;
  "currency": string;
  /** Незачтённая decimal string */
  "outstanding": string;
}

export interface FinanceOpeningBalanceRequest {
  /** Decimal string */
  "amount": string;
  "date": string;
  /** Обязателен при исправлении сторно-документом */
  "comment"?: string;
}

export interface FinancePaymentCalendar {
  /** Дата доступных курсов для пересчёта прогноза без переоценки в главной книге */
  "valuation_date"?: string;
  "project"?: string;
  /** При фильтре проекта false; opening/closing/balance пустые, остатки счетов проекту не приписываются */
  "balance_available"?: boolean;
  "from": string;
  "to": string;
  "currency": string;
  "derived_available": boolean;
  "derived_note": string;
  "opening": string;
  "inflow": string;
  "outflow": string;
  "closing": string;
  "overdue_in": string;
  "overdue_out": string;
  "done_in": string;
  "done_out": string;
  "companies": Array<FinancePaymentCalendarCompany>;
  "step": "day" | "month" | "quarter";
  "periods": Array<FinancePaymentCalendarPeriod>;
  "totals": Array<FinancePaymentCalendarCell>;
  "days": Array<FinancePaymentCalendarDay>;
  "rows": Array<FinancePaymentCalendarRow>;
  "overdue": Array<FinancePaymentCalendarRow>;
}

export interface FinancePaymentCalendarCell {
  "inflow": string;
  "outflow": string;
  "delta": string;
  "balance": string;
  "negative": boolean;
}

export interface FinancePaymentCalendarCompany {
  "id"?: UUID;
  "name": string;
  "opening": string;
  "inflow": string;
  "outflow": string;
  "closing": string;
  "sources": Array<FinancePaymentCalendarSource>;
  "cells": Array<FinancePaymentCalendarCell>;
}

export interface FinancePaymentCalendarDay {
  "date": string;
  "inflow": string;
  "outflow": string;
  "balance": string;
  "negative": boolean;
}

export interface FinancePaymentCalendarPeriod {
  "key": string;
  "from": string;
  "to": string;
  "partial": boolean;
}

export interface FinancePaymentCalendarRow {
  "original_amount"?: string;
  "original_currency"?: string;
  "project_id"?: UUID;
  "id": UUID;
  "origin": "manual" | "receivable" | "payable";
  "date": string;
  "direction": FinanceDirection;
  "amount": string;
  "currency": string;
  "source_kind": FinancePaymentSourceKind;
  "source_id"?: UUID;
  "source_name": string;
  "title": string;
  "note": string;
  "contact_id"?: UUID;
  "contact_name": string;
  "item_id"?: UUID;
  "item_name": string;
  "company_id"?: UUID;
  "company_name": string;
  "status": string;
  "executed_on"?: string;
  "overdue": boolean;
  "document_id"?: UUID;
  "fact"?: FinancePaymentFact;
}

export interface FinancePaymentCalendarSource {
  "id": UUID;
  "kind": FinancePaymentSourceKind;
  "name": string;
  "currency": string;
  "opening": string;
  "inflow": string;
  "outflow": string;
  "closing": string;
  "cells": Array<FinancePaymentCalendarCell>;
}

export interface FinancePaymentFact {
  "document_id": UUID;
  "kind": "bank" | "cash";
  "number": string;
  "date": string;
  "direction": FinanceDirection;
  "amount": string;
  "currency": string;
  "source_name": string;
  "counterparty": string;
  "purpose": string;
  "used_by_plan_id"?: UUID;
}

export interface FinancePaymentFactPage {
  "results": Array<FinancePaymentFact>;
}

export interface FinancePaymentPlan {
  "project_id"?: UUID;
  "id": UUID;
  "company_id"?: UUID;
  "direction": FinanceDirection;
  "plan_date": string;
  "amount": string;
  "currency": string;
  "source_kind": FinancePaymentSourceKind;
  "account_id"?: UUID;
  "wallet_id"?: UUID;
  "contact_id"?: UUID;
  "item_id"?: UUID;
  "title": string;
  "note": string;
  "status": "planned" | "done" | "cancelled";
  "executed_on"?: string;
  "executed_document_id"?: UUID;
  "created_at": string;
  "updated_at": string;
}

export interface FinancePaymentPlanExecute {
  /** Пустое значение означает дату фактической операции */
  "executed_on"?: string;
  "document_id": UUID;
}

export interface FinancePaymentPlanInput {
  "project_id"?: UUID;
  "company_id": UUID;
  "direction": FinanceDirection;
  "plan_date": string;
  /** Positive decimal string */
  "amount": string;
  "currency": string;
  "source_kind": FinancePaymentSourceKind;
  "account_id"?: UUID;
  "wallet_id"?: UUID;
  "contact_id"?: UUID;
  "item_id"?: UUID;
  "title": string;
  "note"?: string;
}

export type FinancePaymentSourceKind = "bank" | "cash" | "unset";

export interface FinancePayoutRegister {
  "id": UUID;
  /** Номер документа реестра */
  "number": string;
  "date": string;
  /** Decimal string; итог официальных и неофициальных частей строк */
  "amount": string;
  /** Сколько человек в реестре */
  "people": number;
  /** Ключ банковской операции, закрывшей реестр; пусто — реестр ждёт оплаты */
  "paid_by": string;
  "status": FinancePayoutRegisterStatus;
}

export interface FinancePayoutRegisterPage {
  "count": number;
  "results": Array<FinancePayoutRegister>;
}

export type FinancePayoutRegisterStatus = "waiting" | "paid";

export interface FinancePayoutSheetRequest {
  "account": UUID;
  /** Юрлицо реестра; пусто — берётся из карточки счёта, и без него реестр не завести */
  "company"?: string;
  /** Дата файла и реестра; неразобранная означает сегодня */
  "date"?: string;
  /** Назначение платежа; пусто — «Заработная плата» */
  "purpose"?: string;
  "rows": Array<FinancePayoutSheetRow>;
}

export interface FinancePayoutSheetRow {
  "employee": UUID;
  /** Decimal string; положительная сумма к выплате */
  "amount": string;
}

/**
 * Содержимое документа начисления. Начисленный итог и неофициальная
 * часть не хранятся: они выводятся из оклада, премий и официальной
 * части, а второе место с той же истиной разошлось бы с первым.
 */
export interface FinancePayrollAccrualPayload {
  /** Месяц начисления в формате YYYY-MM; дата документа отвечает, когда начисление отражено в учёте */
  "period"?: string;
  "rows": Array<FinancePayrollAccrualRow>;
}

/** Одна строка начисления — человек за месяц */
export interface FinancePayrollAccrualRow {
  "employee": UUID;
  /** Decimal string; оклад, постоянная часть */
  "salary"?: string;
  /** Decimal string; первая премия */
  "bonus1"?: string;
  /** Decimal string; вторая премия */
  "bonus2"?: string;
  /** Decimal string; официальная часть начисления, не больше суммы оклада и премий */
  "official"?: string;
  /** Decimal string; НДФЛ, удержанный из официальной части */
  "tax"?: string;
  /** Decimal string; страховые взносы сверх начисления, а не удержание из него */
  "insurance"?: string;
  /** Разрез проекта; пустой в регистр не идёт */
  "project"?: string;
  /** Разрез подразделения; пустой в регистр не идёт */
  "department"?: string;
  /** Разрез центра финансовой ответственности; пустой в регистр не идёт */
  "cfo"?: string;
}

export interface FinancePayrollDocumentCreate {
  "type": FinancePayrollDocumentTypeKey;
  "date"?: string;
  "comment"?: string;
  "refs": FinancePayrollDocumentRefs;
  /** Строки начисления или реестра; разбор нестрогий — незнакомое поле не отклоняется */
  "payload"?: FinancePayrollAccrualPayload | FinancePayrollPaymentPayload;
  /** Провести сразу; для реестра выплаты флаг игнорируется */
  "post"?: boolean;
}

/**
 * Ссылки зарплатного документа. Юрлицо обязательно уже при заведении:
 * главная книга отвечает на вопрос, чьи это деньги. Статьи нужны
 * проведению начисления, а не заведению черновика.
 */
export interface FinancePayrollDocumentRefs {
  "company": UUID;
  /** Статья затрат на оплату труда; нужна проведению начисления и выдаче наличными */
  "item"?: string;
  /** Статья НДФЛ; нужна проведению начисления с удержанием */
  "tax_item"?: string;
  /** Статья страховых взносов; нужна проведению начисления со взносами */
  "insurance_item"?: string;
  /** Счёт списания реестра; его проставляет выгрузка списка на оплату */
  "account"?: string;
  /** Касса выдачи; заполненная означает расходный кассовый ордер по реестру */
  "wallet"?: string;
  [key: string]: string | undefined;
}

export type FinancePayrollDocumentTypeKey = "finance_payroll_accrual" | "finance_payroll_payment";

export interface FinancePayrollImportInspection {
  "sheets": Array<FinancePayrollImportSheet>;
  /** Целевые поля разбора; обязателен только сотрудник */
  "fields": Array<FinanceImportField>;
}

export interface FinancePayrollImportPreview {
  "rows": Array<FinancePayrollImportRow>;
  /** Строк, годных к начислению */
  "ready": number;
  /** Строк с проблемой */
  "broken": number;
  /** Decimal string; итог начисленного по годным строкам */
  "accrued": string;
}

export interface FinancePayrollImportRow {
  /** Номер строки в файле, а не в ответе: человек правит исходник */
  "line": number;
  /** Как человек назван в файле */
  "source": string;
  /** Найденный сотрудник справочника; пусто — строка не сопоставлена */
  "employee": string;
  /** ФИО найденного сотрудника */
  "name": string;
  /** Decimal string; оклад */
  "salary": string;
  /** Decimal string; первая премия */
  "bonus1": string;
  /** Decimal string; вторая премия */
  "bonus2": string;
  /** Decimal string; официальная часть, равная начисленному при отсутствии своей колонки */
  "official": string;
  /** Decimal string; НДФЛ */
  "tax": string;
  /** Decimal string; страховые взносы */
  "insurance": string;
  /** Decimal string; оклад плюс обе премии */
  "accrued": string;
  /** Decimal string; начисленное за вычетом официальной части */
  "unofficial": string;
  /** Почему строку нельзя начислить; пусто — можно */
  "problem": string;
}

export interface FinancePayrollImportSheet {
  "name": string;
  /** Заголовки строки, выбранной как шапка */
  "header": Array<string> | null;
  /** Первые пять строк данных */
  "sample": Array<Array<string>> | null;
  /** Строк данных на листе, без шапки */
  "rows": number;
  /** Предложенное соответствие «целевое поле → заголовок колонки» */
  "guessed": { [key: string]: string };
}

export interface FinancePayrollJournal {
  "from": string;
  "to": string;
  "rows": Array<FinancePayrollJournalRow>;
  "totals": FinancePayrollJournalTotals;
}

/** Строка журнала — человек за месяц. Все суммы строками: отчёт о деньгах, округлённый по дороге, перестаёт сходиться с книгой ровно там, где на него смотрят. */
export interface FinancePayrollJournalRow {
  /** Идентификатор сотрудника */
  "employee": string;
  "employee_name": string;
  "job_title": string;
  "department": string;
  /** Месяц строки в формате YYYY-MM */
  "period": string;
  /** Decimal string */
  "salary": string;
  /** Decimal string */
  "bonus1": string;
  /** Decimal string */
  "bonus2": string;
  /** Decimal string — начислено всего */
  "accrued": string;
  /** Decimal string — официальная часть начисления */
  "official": string;
  /** Decimal string — неофициальная часть начисления */
  "unofficial": string;
  /** Decimal string — НДФЛ */
  "tax": string;
  /** Decimal string — взносы */
  "insurance": string;
  /** Decimal string — на руки официально: официальная часть за вычетом НДФЛ */
  "net_official": string;
  /** Decimal string — на руки неофициально: неофициальная часть целиком, с неё не удерживают */
  "net_unofficial": string;
  /** Decimal string */
  "paid_official": string;
  /** Decimal string */
  "paid_unofficial": string;
  /** Decimal string — сколько человеку должны на конец месяца строки. Долг один: сальдо счетов 70.01 и 70.02 вместе, а не вычитание колонок. */
  "debt": string;
}

export interface FinancePayrollJournalTotals {
  /** Decimal string */
  "accrued": string;
  /** Decimal string */
  "official": string;
  /** Decimal string */
  "unofficial": string;
  /** Decimal string */
  "tax": string;
  /** Decimal string */
  "insurance": string;
  /** Decimal string */
  "paid_official": string;
  /** Decimal string */
  "paid_unofficial": string;
  /** Decimal string — берётся только с последней строки каждого сотрудника: сальдо накопительное */
  "debt": string;
}

/**
 * Содержимое реестра выплаты. Строка без человека и строка с двумя
 * нулями не годятся, и узнаётся это при заведении, а не в момент оплаты.
 */
export interface FinancePayrollPaymentPayload {
  /** Месяц выплаты в формате YYYY-MM */
  "period"?: string;
  "rows": Array<FinancePayrollPaymentRow>;
  /** Назначение платежа; так его записывает выгрузка списка на оплату */
  "purpose"?: string;
}

/** Одна строка реестра выплаты */
export interface FinancePayrollPaymentRow {
  "employee": UUID;
  /** Decimal string; официальная часть выплаты */
  "official"?: string;
  /** Decimal string; неофициальная часть выплаты */
  "unofficial"?: string;
}

export interface FinancePeriodCheck {
  "key": string;
  "title": string;
  "detail": string;
  "passed": boolean;
}

export interface FinancePeriodCheckPage {
  "checks": Array<FinancePeriodCheck>;
}

export interface FinancePnlCoverage {
  "missing": Array<FinancePnlCoverageItem>;
  "duplicated": Array<FinancePnlCoverageItem>;
}

export interface FinancePnlCoverageItem {
  "id": UUID;
  "name": string;
  "path": string;
  "times"?: number;
}

export interface FinancePnlEntry {
  "id": UUID;
  "date": string;
  /** Decimal string со знаком ОТЧЁТА, а не со знаком книги: расшифровка обязана складываться в ту строку, которую раскрывают */
  "amount": string;
  "document_id"?: UUID;
  "document_number": string;
  /** Вид документа словами: продажа, закупка, банковская операция */
  "document_type": string;
  /** Вид документа машинным ключом — по нему документ открывается ТАМ, где он живёт: модульные документы общий журнал не отдаёт */
  "document_type_key": string;
  "counterparty": string;
  /** Счёт результата: одна статья может лечь на разные счета, если правило проводки менялось */
  "account_code": string;
  "account_name": string;
  "comment": string;
}

export interface FinancePnlEntryPage {
  /** Длина `results`, а не число проводок ячейки: список уже обрезан потолком 200 */
  "count": number;
  "results": Array<FinancePnlEntry>;
}

export interface FinancePnlFormulaToken {
  "kind": "row" | "number" | "op" | "open" | "close";
  "row_id"?: UUID;
  "op"?: "+" | "-" | "*" | "/";
  "value"?: string;
}

export interface FinancePnlItem {
  "id": UUID;
  "name": string;
  /** Пустая строка у корневой статьи */
  "parent_id": string;
}

export interface FinancePnlItemPage {
  "count": number;
  "results": Array<FinancePnlItem>;
}

export interface FinancePnlLayout {
  "id": UUID;
  "name": string;
  "is_default": boolean;
  "rows": Array<FinancePnlLayoutRow>;
}

export interface FinancePnlLayoutCreate {
  "name": string;
  "is_default"?: boolean;
}

export interface FinancePnlLayoutPage {
  "count": number;
  "results": Array<FinancePnlLayout>;
}

export interface FinancePnlLayoutRow {
  "id": UUID;
  "kind": "item" | "section" | "formula" | "header" | "source";
  "parent_id"?: UUID;
  "title": string;
  "item_id"?: UUID;
  "formula": Array<FinancePnlFormulaToken>;
  "format": "amount" | "percent";
  "collapsed": boolean;
  "system_row"?: string;
}

export interface FinancePnlLayoutSave {
  "name": string;
  "is_default": boolean;
  "rows": Array<FinancePnlLayoutRow>;
}

export interface FinancePnlLine {
  "id": string;
  "name": string;
  "sign": number;
  "amount": string;
}

export interface FinancePnlReport {
  "from": string;
  "to": string;
  "revenue": string;
  "expense": string;
  "profit": string;
  "unclassified_in": string;
  "unclassified_out": string;
  "lines": Array<FinancePnlLine>;
  "layout_rows"?: Array<FinancePnlReportRow>;
  "layout"?: FinancePnlReportLayout;
  "columns": Array<FinanceReportColumn>;
  "companies"?: Array<FinanceReportCompany>;
}

export interface FinancePnlReportLayout {
  "id": UUID;
  "name": string;
  "is_default": boolean;
  "coverage": FinancePnlCoverage;
  "system_rows": { [key: string]: string };
}

export interface FinancePnlReportRow {
  "id": string;
  "kind": string;
  "name": string;
  "level": number;
  "collapsed": boolean;
  "has_children": boolean;
  "amount"?: string;
  "format": string;
  "system_row"?: string;
  "problem"?: string;
}

export interface FinanceProject {
  "id": UUID;
  "name": string;
  "attrs": { [key: string]: unknown };
  "is_active": boolean;
  "first_fact_date": string | null;
  "revenue": string;
  "expense": string;
  "profit": string;
  "received": string;
  "paid": string;
  "receivable": string;
  "payable": string;
  "customer_advances": string;
  "supplier_advances": string;
  "margin": string | null;
  "plan_revenue": string | null;
  "plan_expense": string | null;
  "plan_profit": string | null;
  "lines": Array<FinanceProjectLine>;
  "budgets": Array<FinanceProjectBudget>;
}

export interface FinanceProjectBudget {
  "id": UUID;
  "project_id": UUID;
  "company_id": UUID;
  "date": string;
  "currency": string;
  "revision": number;
  "note": string;
  "lines": Array<FinanceProjectBudgetLine>;
  "created_at": string;
}

export type FinanceProjectBudgetInput = unknown | unknown;

export interface FinanceProjectBudgetLine {
  "item_id": UUID;
  /** Положительная сумма или ноль; знак определяется статьёй */
  "amount": string;
}

export interface FinanceProjectLine {
  "item_id": string;
  "name": string;
  "sign": number;
  "actual": string;
  "plan": string | null;
  "variance": string | null;
}

export interface FinanceProjectReport {
  "on": string;
  "currency": string;
  "company": string;
  "projects": Array<FinanceProject>;
}

export interface FinanceReconciliation {
  "summary": FinanceReconciliationSummary;
  "results": Array<FinanceTransaction>;
}

export interface FinanceReconciliationAccount {
  "account_id": UUID;
  "account": string;
  "currency": string;
  /** Дата, на которую сделан расчёт */
  "on": string;
  /** Decimal string — наш расчёт: входящий остаток плюс движения по дату */
  "ours": string;
  /** Decimal string — слагаемое расчёта */
  "opening_balance": string;
  /** Decimal string — приход за период */
  "turnover_in": string;
  /** Decimal string — расход за период */
  "turnover_out": string;
  /** Decimal string — слово банка на дату `as_of`. Отсутствует, когда сверять не с чем; это не «сошлось». */
  "theirs"?: string;
  /** Дата, на которую банк назвал остаток */
  "as_of"?: string;
  "source"?: FinanceReconciliationSource;
  /** Decimal string — наш расчёт минус банк. Отсутствует вместе с `theirs`: разница с тем, чего не сказали, не равна нулю. */
  "difference"?: string;
  "days": Array<FinanceReconciliationDay>;
  "statement_gaps": Array<FinanceReconciliationStatementGap>;
}

export interface FinanceReconciliationDay {
  "date": string;
  "reason": FinanceReconciliationDayReason;
  /** Сколько операций этого дня попало под причину */
  "count": number;
  /** Decimal string — сумма операций дня по этой причине, со знаком движения */
  "amount": string;
}

export type FinanceReconciliationDayReason = "unposted" | "duplicate" | "outside_statement";

export type FinanceReconciliationSource = "statement" | "bank";

/** Промежуток, не покрытый ни одной выпиской: за эти дни банк ничего не подтверждал, и всё, что там есть, держится только на нашем вводе. */
export interface FinanceReconciliationStatementGap {
  "from": string;
  "to": string;
}

export interface FinanceReconciliationSummary {
  "total_count": number;
  "needs_attention_count": number;
  "unmatched_count": number;
  /** Входящие платежи без заказа и без проекта; имя поля сохранено для совместимости */
  "missing_order_count": number;
  "missing_cashflow_count": number;
  /** Сумма входящих платежей без заказа и без проекта; decimal string */
  "incoming_unlinked_amount": string;
}

export interface FinanceRegisterAccountCheck {
  "account": string;
  "name": string;
  "register": string;
  "transactions": string;
  "adjustments": string;
  "match": boolean;
}

export interface FinanceRegisterReconciliation {
  "accounts": Array<FinanceRegisterAccountCheck>;
  "accounts_match": boolean;
  "unprojected_count": number;
  "unposted_count": number;
  "ledger": Array<{ [key: string]: unknown }>;
  "ledger_match": boolean;
  "unallocated": string;
  "settlements": Array<{ [key: string]: unknown }>;
  "settlements_match": boolean;
  "transit": Array<{ [key: string]: unknown }>;
  "transit_total": string;
  "transit_match": boolean;
}

export interface FinanceRegisterRepairFailure {
  "id": UUID;
  "error": string;
}

export interface FinanceRegisterRepairRequest {
  "transaction_ids"?: Array<UUID>;
  "cash_document_ids"?: Array<UUID>;
}

export interface FinanceRegisterRepairResult {
  "transactions_repaired": number;
  "cash_documents_repaired": number;
  "failures": Array<FinanceRegisterRepairFailure>;
}

export interface FinanceRegistersResyncResult {
  "projected": number;
  "healed": number;
  "bank_reposted": number;
  "cash_reposted": number;
  "settlements_reposted": number;
  "failed": number;
}

export interface FinanceReportColumn {
  "key": string;
  "label": string;
  "from": string;
  "to": string;
  "total": boolean;
  "payload": { [key: string]: unknown };
}

export interface FinanceReportCompany {
  "id": string;
  "name": string;
}

export interface FinanceRequisitesBank {
  "name": string;
  "bic": string;
  "correspondent_account": string;
  "city": string;
}

export interface FinanceRequisitesLookup {
  "organization": FinanceRequisitesParty | null;
  "bank": FinanceRequisitesBank | null;
  "number_valid": boolean | null;
  "warnings": Array<string> | null;
  "directory_configured": boolean;
}

export interface FinanceRequisitesParty {
  "name": string;
  "full_name": string;
  "inn": string;
  "kpp": string;
  "ogrn": string;
  "address": string;
  "status": string;
}

export interface FinanceResponsiblePatch {
  "responsible": string | null;
}

export interface FinanceSettlementBalance {
  "obligation_id": UUID;
  /** Decimal string */
  "remaining": string;
}

export interface FinanceSettlementBalancePage {
  "count": number;
  "results": Array<FinanceSettlementBalance>;
}

export interface FinanceSettlementDocumentCreate {
  "type_key": FinanceSettlementDocumentType;
  "number"?: string;
  "date"?: string;
  "company_id": UUID;
  "contact_id": UUID;
  "currency": string;
  /** Положительная decimal string для долгов, авансов, сделок, зачёта и распределения */
  "amount"?: string;
  /** Обязательна для долга, продажи и закупки */
  "due_date"?: string;
  /** Обязательно для зачёта аванса и распределения оплаты */
  "obligation_id"?: string;
  /** Оплата-источник аванса либо обязательная оплата для распределения */
  "payment_id"?: string;
  "sources"?: Array<FinanceSettlementSourceAllocationInput>;
  /** Обязателен для зачёта аванса */
  "advance_id"?: string;
  /** Обязательна для продажи и закупки */
  "pnl_item_id"?: string;
  /** Путешествие или проект продажи и закупки */
  "project_id"?: string;
  /** Обязательна только для аванса */
  "side"?: "receivable_advance" | "payable_advance";
  "comment"?: string;
  /** Ключ идемпотентности сделки (только продажа и закупка): система-источник — учётная система клиента или ключ стороннего приложения */
  "source_system"?: string;
  /** Какая именно база/кабинет клиента внутри source_system; пусто — единственный источник */
  "source_ref"?: string;
  /** Идентификатор сделки в source_system; повтор того же (source_system, source_ref, external_id) возвращает уже созданный документ вместо второго */
  "external_id"?: string;
}

export type FinanceSettlementDocumentType = "finance_settlement_baseline" | "finance_receivable_opening" | "finance_receivable" | "finance_payable_opening" | "finance_payable" | "finance_advance" | "finance_advance_offset" | "finance_sale" | "finance_purchase" | "finance_payment_allocation";

export interface FinanceSettlementExposure {
  "available": boolean;
  "as_of": string;
  "contact_id": UUID;
  "company_id": UUID;
  "currency": string;
  /** Decimal string */
  "receivable": string;
  /** Decimal string */
  "overdue": string;
  "open_obligations": number;
  "source": string;
}

export interface FinanceSettlementPayment {
  "document": CoreDocument;
  /** Decimal string */
  "remaining": string;
}

export interface FinanceSettlementPaymentPage {
  "count": number;
  "results": Array<FinanceSettlementPayment>;
}

export interface FinanceSettlementSource {
  "id": UUID;
  "type_key": string;
  "type_name": string;
  "number": string;
  "date": string;
  "status": string;
  /** Decimal string */
  "available_amount": string;
}

export interface FinanceSettlementSourceAllocationInput {
  "document_id": UUID;
  /** Положительная decimal string; сумма строк должна совпасть с amount документа */
  "amount": string;
}

export interface FinanceSettlementSourcePage {
  "count": number;
  "results": Array<FinanceSettlementSource>;
}

export interface FinanceStatement {
  "id": UUID;
  "account": UUID;
  "account_name": string;
  "date_from": string;
  "date_to": string;
  /** Decimal string */
  "opening_balance": string;
  /** Decimal string */
  "closing_balance": string;
  "provider": string;
  "imported_at": string;
}

export interface FinanceStatementCreate {
  "account": UUID;
  "date_from": string;
  "date_to": string;
  /** Decimal string */
  "opening_balance"?: string;
  /** Decimal string */
  "closing_balance"?: string;
  "provider"?: string;
}

export interface FinanceStatementLinkInput {
  "transactions": Array<FinanceStatementLinkInputTransactionsItem>;
}

export interface FinanceStatementLinkInputTransactionsItem {
  "transaction_id": UUID;
  "previous_statement_id": string | null;
}

export interface FinanceStatementLinkResult {
  "statement_id": UUID;
  "linked": number;
  "unchanged": number;
}

export interface FinanceStatementPage {
  "count": number;
  /** Применённый размер страницы — после зажима до потолка */
  "limit": number;
  /** Применённое смещение */
  "offset": number;
  "results": Array<FinanceStatement>;
}

export interface FinanceTradeAdvance {
  /** Общая свободная decimal string */
  "amount": string;
  "advances": Array<FinanceOpenAdvance>;
}

export interface FinanceTradeJournalPage {
  "count": number;
  "results": Array<FinanceTradeJournalRow>;
}

export interface FinanceTradeJournalRow {
  "id": UUID;
  "number": string;
  "date": string;
  "status": string;
  "contact_id": string | null;
  "contact_name": string;
  "company_id": string | null;
  "company_name": string;
  "project_id": string | null;
  "project_name": string;
  "item_name": string;
  /** Decimal string */
  "amount": string;
  "currency": string;
  "due_date": string;
  /** Decimal string из регистра расчётов */
  "outstanding": string;
}

export interface FinanceTransaction {
  "id": UUID;
  "date": string;
  "direction": FinanceDirection;
  /** Positive decimal string */
  "amount": string;
  "currency": string;
  "counterparty_name": string;
  "counterparty_inn": string;
  "counterparty_account": string;
  "purpose": string;
  "bank_txn_id": string;
  "account": UUID;
  "account_name": string;
  "statement": string | null;
  "cashflow_item": string | null;
  "cashflow_item_name": string | null;
  "cashflow_section": string | null;
  "pnl_item": string | null;
  "pnl_item_name": string | null;
  "contact": string | null;
  "contact_name": string | null;
  "order": string | null;
  "order_number": string | null;
  "project": string | null;
  "project_name": string | null;
  /** Операционный ответственный, не участвующий в проводках */
  "responsible"?: string | null;
  "responsible_name"?: string | null;
  "order_total": string | null;
  "order_paid_percent": number;
  "match_state": string;
  "reconciliation_state": string;
  "reconciliation_needs": Array<string>;
  "classification_explanation": string;
  "suggested_order": { [key: string]: unknown } | null;
  "suggested_cashflow_item": { [key: string]: unknown } | null;
  "suggested_pnl_item": { [key: string]: unknown } | null;
  "created_at": string;
  "updated_at": string;
}

export interface FinanceTransactionCategorize {
  "cashflow_item"?: string | null;
  "contact"?: string | null;
  "order"?: string | null;
  "project"?: string | null;
  /** Рекомендация внешнего расширения, которую человек принимает этим вызовом. Не второй способ назвать статью: статья берётся из самой рекомендации, а поле отвечает на другой вопрос — чей совет сработал. Названная в теле другая статья — отказ, а не тихая победа одного из двух значений. Рекомендация с чужой операции и уже решённая отвечают так же, как несуществующая. */
  "suggestion"?: string | null;
}

export interface FinanceTransactionCreate {
  "account": UUID;
  "statement"?: string;
  "date": string;
  "direction": FinanceDirection;
  "amount": string;
  "currency"?: string;
  "counterparty_name"?: string;
  "counterparty_inn"?: string;
  "counterparty_account"?: string;
  "purpose"?: string;
  /** Если пуст, сервер строит детерминированный ключ из операции */
  "bank_txn_id"?: string;
  "cashflow_item"?: string;
  "contact"?: string;
  "order"?: string;
  "project"?: string;
}

export interface FinanceTransactionPage {
  /** Строк на этой странице */
  "count": number;
  /** Сколько операций отвечает отбору целиком; сравнение с count говорит, есть ли ещё страницы */
  "total": number;
  "results": Array<FinanceTransaction>;
  "totals": FinanceTransactionTotals;
}

/** Итоги по всему отбору, а не по странице. Суммы в валюте учёта по историческому курсу */
export interface FinanceTransactionTotals {
  /** Приход; null, когда итог не посчитан */
  "inflow": string | null;
  /** Расход; null, когда итог не посчитан */
  "outflow": string | null;
  "currency": string;
  /** Сколько операций осталось без пересчёта в валюту учёта: неполный пересчёт не должен выглядеть верным итогом */
  "unconverted_count": number;
}

export interface HubCounters {
  "files": number;
  "meetings": number;
  "secrets": number;
  "tasks_total": number;
  "tasks_done": number;
}

export interface HubOverview {
  "project": HubProject;
  "sections": Array<HubSection>;
  "last_status": StatusUpdate | null;
  "meetings_upcoming": Array<Meeting>;
  "meetings_recent": Array<Meeting>;
}

export interface HubProject {
  "id": UUID;
  "key": string;
  "name": string;
  "description": string;
  "color": string;
  "contact_id": UUID | null;
  "contact_name": string;
  "company_id": UUID | null;
  "start_date": string;
  "target_date": string;
  "lead_user_id": number | null;
  "lead_name": string;
  "counters": HubCounters;
}

export interface HubSection {
  "id": UUID;
  "project_id": UUID;
  "kind": "overview" | "journal" | "roadmap" | "meetings" | "files" | "secrets";
  "title": string;
  "icon": string;
  "sort_order": number;
  "is_enabled": boolean;
  "visibility": HubVisibility;
  "created_at": string;
  "updated_at": string;
}

export interface HubSectionPage {
  "count": number;
  "results": Array<HubSection>;
}

export interface HubSectionUpdate {
  "title"?: string;
  "icon"?: string;
  "sort_order"?: number;
  "is_enabled"?: boolean;
  "visibility"?: HubVisibility;
}

export type HubVisibility = "team" | "client";

export interface KnowledgeACLGrant {
  "id"?: UUID;
  "principal_type": "everyone" | "user" | "role" | "department";
  /** Ключ принципала: id пользователя, UUID роли, название подразделения или * для всех */
  "principal_key": string;
  /** Уровень «Просмотр» */
  "can_read": boolean;
  /** Уровень «Редактирование»; включает просмотр */
  "can_write"?: boolean;
  /** Уровень «Публикация»; включает редактирование */
  "can_publish"?: boolean;
  /** Уровень «Владелец»; живёт только на пространстве и только у пользователя */
  "can_manage"?: boolean;
}

export interface KnowledgeAccessOption {
  "key": string;
  "label": string;
}

export interface KnowledgeAccessOptions {
  "users": Array<KnowledgeAccessOption>;
  "roles": Array<KnowledgeAccessOption>;
  "departments": Array<KnowledgeAccessOption>;
}

export interface KnowledgeAnswer {
  "id": UUID;
  "answer": string;
  "citations": Array<KnowledgeCitation>;
  /** Опоры в материалах не нашлось, и ответ не выдуман */
  "abstained": boolean;
  "generated": boolean;
  "retrieval_mode": string;
}

export interface KnowledgeAnswerFeedbackInput {
  /** Ответ помог; при true причина и комментарий очищаются */
  "helpful": boolean;
  /** Что было не так с ответом; обязательно при helpful=false */
  "issue"?: "missing" | "incorrect" | "outdated" | "unclear" | "other";
  /** Пояснение к отрицательной оценке; при helpful=true отбрасывается */
  "comment"?: string;
}

export interface KnowledgeAnswerInput {
  "question": string;
  /** Сколько фрагментов-опор искать; по умолчанию 6 */
  "limit"?: number;
  /** Предыдущие ходы диалога; доступ они не расширяют */
  "history"?: Array<KnowledgeAnswerTurn>;
  /** Где искать: company — материалы компании, guides — встроенные руководства продукта, all — оба корпуса */
  "scope"?: "all" | "company" | "guides";
}

export interface KnowledgeAnswerQuality {
  /** Длина периода в днях; по умолчанию 30 */
  "period_days": number;
  /** Прогонов ответа за период */
  "total": number;
  /** Ответов без опоры в материалах */
  "abstained": number;
  /** Ответов собранных генеративной моделью */
  "generated": number;
  /** Положительных оценок */
  "helpful": number;
  /** Отрицательных оценок */
  "unhelpful": number;
  /** Средняя длительность ответа в миллисекундах */
  "average_latency_ms": number;
  /** Частые вопросы без ответа или с отрицательной оценкой; сюда смотрят когда решают что дописать */
  "content_gaps": Array<KnowledgeContentGap>;
  "index": KnowledgeIndexHealth;
}

export interface KnowledgeAnswerTurn {
  "question": string;
  "answer": string;
}

export interface KnowledgeAsset {
  "id": UUID;
  "space_id": UUID;
  "node_id": UUID;
  "name": string;
  "mime_type": string;
  "size_bytes": number;
  "content_sha256": string;
  /** Разбор файла для индекса: pending, processing, ready, failed или unsupported */
  "processing_status": string;
  "parser_name"?: string;
  "parser_version"?: string;
  "processing_error"?: string;
  "processed_at"?: string;
  "uploaded_by": number;
  "created_at": string;
  "updated_at": string;
}

export interface KnowledgeCitation {
  "chunk_id": UUID;
  /** Откуда фрагмент: страница, файл страницы или встроенное руководство */
  "source_kind": string;
  "asset_id"?: UUID;
  "node_id": UUID;
  "space_id": UUID;
  "revision_id": UUID;
  "title": string;
  "slug": string;
  "breadcrumb": string;
  "section_heading"?: string;
  "quote": string;
  /** Адрес фрагмента внутри источника */
  "locator": { [key: string]: unknown };
  "is_stale": boolean;
}

export interface KnowledgeContentGap {
  /** Вопрос без ответа или с отрицательной оценкой */
  "question": string;
  /** Сколько раз вопрос задали за период; вопросы группируются без учёта регистра */
  "count": number;
  "last_asked_at": string;
}

/** Канонический блочный документ страницы; редактор читает только эту схему. */
export interface KnowledgeDocument {
  "schema": "akeda.knowledge.document";
  /** Актуальная версия схемы — 2 */
  "schema_version": number;
  "type": "doc";
  /** Блоки страницы */
  "content": Array<{ [key: string]: unknown }>;
}

export interface KnowledgeIndexHealth {
  /** Поколений индекса в работе */
  "active_generations": number;
  /** Поколений индекса в сборке */
  "building_generations": number;
  /** Поколений индекса со сбоем */
  "failed_generations": number;
  /** Фрагментов в индексе; страницы и файлы вместе */
  "chunks": number;
  /** Файлов в очереди разбора */
  "pending_assets": number;
  /** Файлов в разборе */
  "processing_assets": number;
  /** Файлов в индексе */
  "ready_assets": number;
  /** Файлов со сбоем разбора */
  "failed_assets": number;
  /** Файлов с неподдерживаемым форматом */
  "unsupported_assets": number;
  /** Когда индекс переключался на новое поколение */
  "last_activated_at"?: string;
}

export interface KnowledgeMoveInput {
  "parent_id"?: UUID;
  /** Место среди соседей, 0 — первое */
  "position"?: number;
  "expected_version": number;
}

export interface KnowledgeNode {
  "id": UUID;
  "space_id": UUID;
  "parent_id"?: UUID;
  "title": string;
  "slug": string;
  "icon": string;
  "sort_order": number;
  /** Состояние страницы: draft, review, published или archived */
  "status": string;
  "owner_id": number;
  "current_draft_revision_id"?: UUID;
  "published_revision_id"?: UUID;
  /** Версия страницы для optimistic locking следующего изменения */
  "version": number;
  "verify_at"?: string;
  "submitted_revision_id"?: UUID;
  "reviewer_id"?: number;
  "submitted_by"?: number;
  "submitted_at"?: string;
  "reviewed_by"?: number;
  "reviewed_at"?: string;
  "review_note"?: string;
  "created_by": number;
  "created_at": string;
  "updated_at": string;
  "is_favorite": boolean;
  /** Срок подтверждения актуальности истёк */
  "is_stale": boolean;
  "tags"?: Array<KnowledgeTag>;
  "draft"?: KnowledgeRevision;
  "published"?: KnowledgeRevision;
}

export interface KnowledgeNodeAccessInput {
  "break_inheritance": boolean;
  "grants": Array<KnowledgeACLGrant>;
}

export interface KnowledgeNodeAccessPolicy {
  "space_id": UUID;
  "node_id": UUID;
  "break_inheritance": boolean;
  "grants": Array<KnowledgeACLGrant>;
}

export interface KnowledgeNodeInput {
  "space_id": UUID;
  "parent_id"?: UUID;
  "title": string;
  "slug"?: string;
  /** Имя иконки Lucide; по умолчанию file-text */
  "icon"?: string;
  /** Ответственный за страницу; по умолчанию автор вызова */
  "owner_id"?: number;
}

export interface KnowledgeReviewInput {
  "expected_version": number;
  /** Сотрудник, которого просят согласовать редакцию */
  "reviewer_id"?: number;
  "note"?: string;
}

export interface KnowledgeRevision {
  "id": UUID;
  "node_id": UUID;
  "revision_no": number;
  "title": string;
  "schema_version": number;
  "content": KnowledgeDocument;
  /** Производное текстовое представление для поиска и ответов */
  "plain_text": string;
  "author_id": number;
  "created_at": string;
  "published_at"?: string;
}

export interface KnowledgeRevisionInput {
  /** Версия страницы из её карточки; чужая правка отдаётся конфликтом */
  "expected_version": number;
  "title": string;
  "content": KnowledgeDocument;
  "plain_text"?: string;
}

export interface KnowledgeRevisionRestoreInput {
  /** Версия страницы из её карточки */
  "expected_version": number;
  "revision_id": UUID;
}

export interface KnowledgeSearchResult {
  "node_id": UUID;
  "space_id": UUID;
  "title": string;
  "slug": string;
  "snippet": string;
  "updated_at": string;
  "rank": number;
}

export interface KnowledgeSpace {
  "id": UUID;
  "name": string;
  "slug": string;
  "description": string;
  "icon": string;
  "sort_order": number;
  "is_archived": boolean;
  /** Закрытое пространство видно только участникам его списка */
  "is_restricted": boolean;
  /** Смотрящий вправе вести пространство; считается сервером по владельцу */
  "can_manage": boolean;
  "has_cover": boolean;
  "page_count": number;
  "created_by": number;
  "created_at": string;
  "updated_at": string;
  "is_pinned": boolean;
}

export interface KnowledgeSpaceAccessInput {
  "restricted": boolean;
  /** Полный список; сохранённый состав заменяется им целиком */
  "grants": Array<KnowledgeACLGrant>;
}

export interface KnowledgeSpaceAccessPolicy {
  "space_id": UUID;
  "restricted": boolean;
  "grants": Array<KnowledgeACLGrant>;
}

export interface KnowledgeSpaceInput {
  "name": string;
  /** Адрес; выводится из названия, когда не задан */
  "slug"?: string;
  "description"?: string;
  /** Имя иконки Lucide; по умолчанию book-open */
  "icon"?: string;
}

export interface KnowledgeTag {
  "id": UUID;
  "name": string;
  "color": string;
  "created_by": number;
  "created_at": string;
}

export interface KnowledgeTagInput {
  /** Имя метки уникально в кабинете без учёта регистра */
  "name": string;
  /** Ключ цвета метки; по умолчанию neutral */
  "color"?: string;
}

export interface KnowledgeTagSetInput {
  /** Полный набор меток страницы; пустой массив снимает все метки */
  "tag_ids": Array<UUID>;
}

export interface KnowledgeVersionInput {
  "expected_version": number;
}

export interface Link {
  "id": UUID;
  "task": UUID;
  "entity_type": string;
  "entity_id": string;
  "label": string;
}

export interface LinkCreate {
  "entity_type": string;
  "entity_id": string;
  "label"?: string;
}

export type LinkList = Array<Link>;

export interface ManagedChecklistItem {
  "text": string;
  "done": boolean;
}

export interface ManagedChecklistPatch {
  /** Стабильный UUID группы, которой владеет интеграция. */
  "id": UUID;
  "title": string;
  /** Пустой массив удаляет только группу с переданным id. */
  "items": Array<ManagedChecklistItem>;
}

/** Сырьё строки прайса в том виде в каком его отдаёт витрина ценообразования */
export interface MarketplaceEconBaseRow {
  /** Установочная цена, до скидки площадки */
  "price"?: number;
  /** Доля скидки площадки, 0..1 */
  "spp"?: number;
  "cost"?: number;
  /** Комиссия в процентах */
  "comm"?: number;
  /** Налог в процентах */
  "tax"?: number;
  /** Эквайринг в процентах */
  "acquiring"?: number | null;
  /** Логистика итого; запасное значение для доставки */
  "log"?: number | null;
  "logDirect"?: number | null;
  "logReturn"?: number | null;
  /** Хранение на единицу */
  "storageUnit"?: number | null;
  /** Приёмка на единицу */
  "acceptUnit"?: number | null;
  /** Штрафы на единицу */
  "penaltyUnit"?: number | null;
}

/** Ручные правки; отсутствие поля означает значение площадки */
export interface MarketplaceEconOverrides {
  "price"?: number | null;
  /** Репрайсер держит эту цену клиента */
  "hold"?: number | null;
  /** Скидка площадки в процентах, а не долей */
  "spp"?: number | null;
  "costBuy"?: number | null;
  "cost"?: number | null;
  "pack"?: number | null;
  "logToWh"?: number | null;
  "comm"?: number | null;
  "handling"?: number | null;
  "storage"?: number | null;
  "accept"?: number | null;
  "logDir"?: number | null;
  "logRet"?: number | null;
  "acq"?: number | null;
  "adIn"?: number | null;
  "adEx"?: number | null;
  "tax"?: number | null;
}

/** Разрешённый вход расчёта Ozon после правок и сценария акции */
export interface MarketplaceEconOzonInput {
  "price": number;
  "spp": number;
  "costBuy": number;
  "pack": number;
  "logToWh": number;
  "comm": number;
  "handling": number;
  "storage": number;
  "logDir": number;
  "logRet": number;
  "acq": number;
  "adIn": number;
  "adEx": number;
  /** Внешняя реклама задана рублями за единицу */
  "adExR": boolean;
  "tax": number;
}

export interface MarketplaceEconQuoteItem {
  "base"?: MarketplaceEconBaseRow;
  "ov"?: MarketplaceEconOverrides;
  /** Доля рекламных расходов по умолчанию */
  "drr"?: number;
  /** Внешняя реклама по умолчанию */
  "adExAll"?: number;
  /** Значение rub трактует внешнюю рекламу как рубли за единицу */
  "adExUnit"?: "pct" | "rub";
  /** Скидка акции в процентах; задана — считается сценарий акции */
  "promo"?: number | null;
}

export interface MarketplaceEconQuoteRequest {
  /** Иное значение даёт 400 даже при пустом батче */
  "platform": "ozon" | "wb" | "wildberries";
  "items"?: Array<MarketplaceEconQuoteItem>;
}

export interface MarketplaceEconQuoteResponse {
  "rows": Array<MarketplaceEconQuoteRow>;
}

export interface MarketplaceEconQuoteRow {
  "ozon"?: MarketplaceEconOzonInput;
  "wb"?: MarketplaceEconWbInput;
  "out": MarketplaceEconResult;
}

/** Неприменимые к площадке поля остаются нулями, а не пропадают */
export interface MarketplaceEconResult {
  /** Ozon: цена клиента */
  "buyer": number;
  /** Wildberries: цена клиента */
  "client": number;
  /** Ozon: выручка продавца */
  "rev": number;
  /** Wildberries: выплата продавцу */
  "ppvz": number;
  /** Комиссия на единицу */
  "comm": number;
  "acq": number;
  "adIn": number;
  "adEx": number;
  "tax": number;
  /** Себестоимость до продажи на единицу */
  "costBefore": number;
  /** Сумма затрат во время продажи */
  "during": number;
  /** Маржа на единицу */
  "margin": number;
  /** Маржинальность долей; null при нулевой базе */
  "mpct": number | null;
  "roi": number | null;
}

/** Разрешённый вход расчёта Wildberries после правок и сценария акции */
export interface MarketplaceEconWbInput {
  "price": number;
  "spp": number;
  "cost": number;
  "comm": number;
  "logDir": number;
  "storage": number;
  "accept": number;
  "penalty": number;
  "acq": number;
  "adIn": number;
  "adEx": number;
  "tax": number;
}

export interface MarketplaceOzonCost {
  "store": UUID;
  "offer_id": string;
  /** Decimal string */
  "cost": string;
}

export interface MarketplaceOzonCostRequest {
  "store": UUID;
  "offer_id": string;
  /** Decimal string; пусто сохраняется как 0 */
  "cost"?: string;
  /** Комментарий; сохраняется, но в ответ не возвращается */
  "note"?: string;
}

export interface MarketplaceOzonDecomposition {
  /** Момент последней синхронизации аналитики */
  "updated": string | null;
  /** Последняя дата с данными */
  "anchor": string;
  "months": Array<MarketplaceOzonDecompositionMonth>;
  "month": MarketplaceOzonDecompositionMonth | null;
  "periods": Array<MarketplaceOzonDecompositionPeriod>;
  "articles": Array<MarketplaceOzonDecompositionArticle>;
  "other": MarketplaceOzonDecompositionOtherBlock | null;
}

export interface MarketplaceOzonDecompositionArticle {
  /** Внешний числовой идентификатор магазина */
  "store_id": number | null;
  "store_name": string;
  "offer_id": string;
  "sku": number | null;
  /** Всегда null: поле Wildberries сохранено ради общей формы */
  "nm_id": null;
  "name": string;
  "category": string;
  "image": string;
  "url": string;
  /** Ключ — идентификатор периода */
  "by_period": { [key: string]: MarketplaceOzonDecompositionCell };
}

export interface MarketplaceOzonDecompositionCell {
  "revenue": number;
  "units": number;
  "return_units": number;
  "returns": number;
  "returns_pct": number | null;
  "commission": number;
  "commission_pct": number | null;
  "logistics": number;
  "logistics_per_unit": number | null;
  "acquiring": number;
  "internal_ad": number;
  "external_ad": number;
  "drr": number | null;
  "cogs": number;
  "other_premium": number;
  "tax": number;
  "expenses": number;
  "profit": number;
  "margin_pct": number | null;
  /** Выручка спроецированная на весь период */
  "rr_revenue": number;
  /** Прибыль спроецированная на период; разовое не проецируется */
  "rr_profit": number;
  /** Идентификатор периода; появляется только в totals */
  "id"?: string;
}

export interface MarketplaceOzonDecompositionMonth {
  "key": string;
  /** Название месяца по-русски */
  "label": string;
  /** Год */
  "sub": string;
  "start": string;
  "end": string;
}

export interface MarketplaceOzonDecompositionOtherBlock {
  "by_period": { [key: string]: MarketplaceOzonDecompositionCell };
  "breakdown": { [key: string]: Array<MarketplaceOzonDecompositionOtherItem> };
}

export interface MarketplaceOzonDecompositionOtherItem {
  /** Наименование операции площадки */
  "name": string;
  /** Сумма в рублях; расход отрицателен */
  "amount": number;
}

export interface MarketplaceOzonDecompositionOtherPage {
  "items": Array<MarketplaceOzonDecompositionOtherItem>;
  "total": number;
}

export interface MarketplaceOzonDecompositionPeriod {
  /** month для накопительной колонки, иначе s и номер спринта */
  "id": string;
  "kind": "month" | "sprint";
  /** Номер спринта; null у накопительной колонки */
  "n": number | null;
  "label": string;
  /** Границы периода в виде дня и месяца */
  "sub": string;
  "start": string;
  "end": string;
  /** Коэффициент проекции незакрытого периода */
  "run_rate_factor": number;
  "totals": MarketplaceOzonDecompositionCell;
}

export interface MarketplaceOzonFbs {
  "platform": "ozon";
  "source"?: "ozon_fbs_live";
  "from"?: string;
  "to"?: string;
  "totals"?: MarketplaceOzonFbsTotals;
  /** Семь этапов в фиксированном порядке */
  "funnel"?: Array<MarketplaceOzonFbsFunnelStage>;
  "tiles"?: MarketplaceOzonFbsTiles;
  "histogram"?: Array<MarketplaceOzonFbsSpeedBucket>;
  "warehouses"?: Array<MarketplaceOzonFbsWarehouse>;
  "rows": Array<MarketplaceOzonFbsPosting>;
  /** Оговорка о границах окна или причина пустого ответа */
  "note"?: string;
  /** Присутствует и равно false, когда аналитика не подключена */
  "analytics"?: boolean;
}

export interface MarketplaceOzonFbsFunnelStage {
  "key": "new" | "work" | "way" | "pvz" | "delivered" | "cancelled" | "problem";
  "label": string;
  "count": number;
  "sum": number;
}

export interface MarketplaceOzonFbsPosting {
  /** Номер отправления */
  "posting": string;
  "order_no": string;
  /** Название первой позиции отправления */
  "name": string;
  /** Артикул первой позиции */
  "offer": string;
  "sku": number;
  "warehouse": string;
  /** Этап воронки */
  "status": string;
  /** Исходный статус площадки */
  "status_raw": string;
  "qty": number;
  "amount": number;
  "created_at": string | null;
  /** Часы в обработке; null пока не отгружено */
  "process_hrs": number | null;
  "deadline_at": string | null;
  /** Надбавка положительна, льгота отрицательна */
  "tariff": number;
}

export interface MarketplaceOzonFbsSpeedBucket {
  "index": number;
  "label": string;
  "count": number;
  "pct": number | null;
  /** Сетка Wildberries переиспользована как единая шкала скорости; к комиссии Ozon не применяется */
  "wb_comm_delta_pp": number;
  "per_hour": boolean;
}

export interface MarketplaceOzonFbsTiles {
  "on_time_pct": number | null;
  /** Штрафы минус льготы в рублях; льгота отрицательна */
  "tariff_net": number;
  "avg_price": number | null;
  "buyout_pct": number | null;
  /** Часы от заказа до передачи в доставку */
  "avg_process_hrs": number | null;
}

export interface MarketplaceOzonFbsTotals {
  "count": number;
  "sum": number;
}

export interface MarketplaceOzonFbsWarehouse {
  "warehouse": string;
  "count": number;
  "process_hrs": number | null;
  "on_time_pct": number | null;
  "tariff": number;
}

export interface MarketplaceOzonFunnel {
  "platform": "ozon";
  "source"?: "ozon_analytics";
  "from"?: string;
  "to"?: string;
  "totals"?: MarketplaceOzonFunnelTotals;
  "rows": Array<MarketplaceOzonFunnelRow>;
  /** Почему воронка пуста или неполна */
  "note"?: string;
  /** Присутствует и равно false, когда аналитика не подключена */
  "analytics"?: boolean;
}

export interface MarketplaceOzonFunnelDaily {
  "platform": "ozon";
  "source"?: "ozon_analytics";
  /** Артикул за который построена матрица */
  "sku"?: string;
  "from"?: string;
  "to"?: string;
  /** Четырнадцать дней от старого к новому */
  "days": Array<string>;
  "series": MarketplaceOzonFunnelDailySeries;
  "totals"?: MarketplaceOzonFunnelDailyTotals;
  "card"?: MarketplaceOzonFunnelDailyCard;
  "articles"?: Array<MarketplaceOzonFunnelDailyArticle>;
  /** Пустая строка, когда сказать нечего */
  "note"?: string;
  /** Присутствует и равно false, когда аналитика не подключена */
  "analytics"?: boolean;
}

export interface MarketplaceOzonFunnelDailyArticle {
  "sku": string;
  "name": string;
  "photo": string;
}

export interface MarketplaceOzonFunnelDailyCard {
  /** Артикул продавца */
  "sku": string;
  "name": string;
  "photo": string;
  /** Доступный остаток */
  "stock"?: number;
  "cost"?: number;
  /** Последняя ставка комиссии в процентах */
  "commission"?: number;
}

/**
 * Каждый ряд — значение на каждый день окна в том же порядке что days.
 * Ряды без источника заполнены null целиком.
 */
export interface MarketplaceOzonFunnelDailySeries {
  "traffic": Array<number | null>;
  "views": Array<number | null>;
  "cv2": Array<number | null>;
  "cart": Array<number | null>;
  "cv3": Array<number | null>;
  "orders": Array<number | null>;
  /** Источника пока нет */
  "adShare": Array<null>;
  "ordersSum": Array<number | null>;
  "buyouts": Array<number | null>;
  "buyoutsSum": Array<number | null>;
  "avgBuyer": Array<number | null>;
  "spp": Array<number | null>;
  /** Источника пока нет */
  "position": Array<null>;
  "adSpend": Array<number | null>;
  "drrOrders": Array<number | null>;
  "drrSales": Array<number | null>;
  "margin": Array<number | null>;
  "marginSheet": Array<number | null>;
  /** Источника пока нет */
  "umd": Array<null>;
  "roi": Array<number | null>;
  "marginTot": Array<number | null>;
  "marginSheetTot": Array<number | null>;
}

/** Каждый итог — массив из одного значения, чтобы колонка ИТОГО рисовалась тем же кодом что и дни */
export interface MarketplaceOzonFunnelDailyTotals {
  "traffic": Array<number | null>;
  "views": Array<number | null>;
  "cart": Array<number | null>;
  "orders": Array<number | null>;
  "ordersSum": Array<number | null>;
  "buyouts": Array<number | null>;
  "marginTot": Array<number | null>;
  "marginSheetTot": Array<number | null>;
  "adSpend": Array<number | null>;
  "cv2": Array<number | null>;
  "cv3": Array<number | null>;
  /** Появляется только когда есть по чему считать */
  "avgBuyer"?: Array<number | null>;
}

export interface MarketplaceOzonFunnelRow {
  /** Артикул продавца строкой: имя поля досталось от Wildberries */
  "nm_id": string;
  "vendor": string;
  "name": string;
  "photo": string;
  "open": number;
  "cart": number;
  "orders": number;
  "buyouts": null;
  "orders_sum": number;
  "buyouts_sum": null;
  "cv_cart": number | null;
  "cv_order": number | null;
  "buyout_pct": null;
}

export interface MarketplaceOzonFunnelTotals {
  /** Показы; 0 без подписки Premium Plus */
  "open": number;
  "cart": number;
  "orders": number;
  /** Всегда null: выкупов у Ozon нет */
  "buyouts": null;
  "orders_sum": number;
  "buyouts_sum": null;
  /** Конверсия в корзину в процентах */
  "cv_cart": number | null;
  "cv_order": number | null;
  "buyout_pct": null;
}

export interface MarketplaceOzonOrdersDailyRow {
  "date": string;
  /** Decimal string */
  "orders_sum": string;
  "orders_qty": number;
  /** Decimal string */
  "sales_sum": string;
  "sales_qty": number;
}

export interface MarketplaceOzonOrdersKpi {
  /** Decimal string */
  "sum": string;
  "qty": number;
  /** Изменение к тому же времени накануне в процентах */
  "delta_sum": number | null;
  "delta_qty": number | null;
}

export interface MarketplaceOzonOrdersOverview {
  /** Самый свежий день в аналитике, а не сегодняшний */
  "day": string;
  "updated": string | null;
  "scheme": "all" | "fbo" | "fbs";
  /** Ключи orders и sales */
  "kpi": { [key: string]: MarketplaceOzonOrdersKpi };
  /** Ровно 14 дней подряд */
  "daily": Array<MarketplaceOzonOrdersDailyRow>;
  "products": Array<MarketplaceOzonOrdersProductRow>;
}

export interface MarketplaceOzonOrdersProductRow {
  /** Внешний числовой идентификатор магазина */
  "store_id": number;
  "offer_id": string;
  "sku": number | null;
  "product_name": string;
  "units": number;
  /** Decimal string */
  "avg_price": string;
  /** Decimal string */
  "total": string;
  "primary_image": string;
  "url": string;
  "store_name": string;
  "status_name": string;
}

export interface MarketplaceOzonPnl {
  "period_kind": "week" | "month";
  "scheme": "all" | "fbo" | "fbs";
  "updated": string | null;
  "year": number;
  /** Годы доступные в аналитике */
  "years": Array<number>;
  "range": MarketplaceOzonPnlRange;
  "periods": Array<MarketplaceOzonPnlPeriod>;
  "rows": Array<MarketplaceOzonPnlRow>;
  "note"?: string;
  /** Аналитика не подключена — цифры синтетические */
  "demo"?: boolean;
  /** Расшифровка прочего по периодам */
  "breakdown"?: { [key: string]: Array<MarketplaceOzonDecompositionOtherItem> };
}

export interface MarketplaceOzonPnlPeriod {
  "key": string;
  "label": string;
  "sub": string;
  "start": string;
  "end": string;
}

export interface MarketplaceOzonPnlRange {
  "from": string;
  "to": string;
}

export interface MarketplaceOzonPnlRow {
  "key": string;
  "label": string;
  /** Роль строки в отчёте */
  "kind": string;
  /** По одному значению на период в том же порядке */
  "values": Array<number | null>;
}

export interface MarketplaceOzonPricing {
  "platform": "ozon";
  /** Начало окна в 30 дней */
  "from"?: string;
  /** Последняя дата финотчёта */
  "to"?: string;
  /** Строк до отсечки по n */
  "total"?: number;
  "shown"?: number;
  "rows": Array<MarketplaceOzonPricingRow>;
  /** Присутствует и равно false, когда аналитика не подключена */
  "analytics"?: boolean;
}

export interface MarketplaceOzonPricingRow {
  /** Артикул продавца, а не числовой SKU площадки */
  "sku": string;
  /** Внешний числовой идентификатор магазина в аналитике */
  "store_id": number;
  "name": string;
  "photo": string;
  /** Название магазина */
  "store": string;
  /** Установочная цена карточки, до скидки площадки */
  "price": number;
  /** То же значение что price */
  "setPrice": number;
  /** Фактическая цена покупателя за единицу */
  "factBuyer": number;
  "oldPrice": number;
  "minPrice": number;
  /** Себестоимость из базы кабинета; 0 — не заведена */
  "cost": number;
  /** Последняя фактическая ставка комиссии по артикулу, проценты */
  "comm": number;
  /** Логистика доставки и возврата суммарно на единицу */
  "log": number;
  "logDirect": number;
  "logReturn": number;
  /** Эквайринг в процентах от выручки */
  "acquiring": number;
  /** Ставка налога магазина в процентах */
  "tax": number;
  /** Доля скидки площадки, 0..1 */
  "spp": number;
  /** Доставленных единиц за окно */
  "units": number;
}

export interface MarketplaceOzonProduct {
  /** Синтетический ключ магазин и артикул через двоеточие */
  "id": string;
  "store": UUID;
  "store_name": string;
  "offer_id": string;
  "sku": number | null;
  "product_name": string;
  "barcode": string;
  /** Decimal string */
  "price": string;
  /** Decimal string */
  "old_price": string;
  /** Decimal string */
  "min_price": string;
  /** Decimal string */
  "vat": string;
  /** Decimal string */
  "volume_weight": string;
  "fbo_present": number;
  "fbs_present": number;
  "fbo_reserved": number;
  "fbs_reserved": number;
  /** Decimal string */
  "commission_fbo_percent": string;
  /** Decimal string */
  "commission_fbs_percent": string;
  "status_name": string;
  "primary_image": string;
  "url": string;
  "category": string;
  /** Себестоимость из базы кабинета; null — не заведена */
  "cost": string | null;
}

export interface MarketplaceOzonProductFacets {
  /** Категории карточек Ozon */
  "subjects": Array<string>;
  /** Всегда пустой: бренда у Ozon в аналитике нет */
  "brands": Array<string>;
}

export interface MarketplaceOzonProductPage {
  "count": number;
  /** Всегда null; постранично ходят page и page_size */
  "next": null;
  /** Всегда null */
  "previous": null;
  "results": Array<MarketplaceOzonProduct>;
  /** Аналитика не подключена — цифры синтетические */
  "demo"?: boolean;
}

export interface MarketplaceOzonPromotion {
  "id": number;
  "name": string;
  /** Тип акции площадки */
  "type": string;
  "start": string;
  "end": string;
  /** Дней до конца; null когда дата не разобралась */
  "days_left": number | null;
  /** Скидка акции в процентах; 0 когда задаётся продавцом */
  "disc": number;
  /** Пояснение по типу акции */
  "desc": string;
}

export interface MarketplaceOzonPromotions {
  "promos": Array<MarketplaceOzonPromotion>;
  /** Почему список пуст */
  "note"?: string;
}

export interface MarketplaceOzonStockProduct {
  "store": UUID;
  "store_name": string;
  "offer_id": string;
  "name": string;
  "image": string;
  "total": number;
  "warehouses": Array<MarketplaceOzonStockWarehouse>;
}

export interface MarketplaceOzonStockWarehouse {
  "warehouse": string;
  "cluster"?: string;
  "qty": number;
}

export interface MarketplaceOzonStocksPage {
  "count": number;
  /** Склады встреченные в выборке */
  "warehouses": Array<string>;
  "results": Array<MarketplaceOzonStockProduct>;
}

export interface MarketplaceOzonSyncJob {
  "id": UUID;
  "platform": "ozon";
  /** Что именно синхронизируется */
  "kind": string;
  "status": string;
  /** Идентификатор задания в очереди */
  "river_job_id": number | null;
  "period": string;
  "store_ids": Array<UUID>;
  "message": string;
  /** Сырой JSON итогов задания; форма зависит от вида */
  "stats": unknown;
  "started_at": string | null;
  "finished_at": string | null;
  "created_at": string;
  "updated_at": string;
}

export interface MarketplaceOzonSyncJobList {
  /** Число строк в ответе, не всего заданий */
  "count": number;
  "results": Array<MarketplaceOzonSyncJob>;
}

/** Срез (группа) товаров маркетплейса внутри кабинета и одной площадки. Один товар может входить в несколько срезов. */
export interface MarketplaceProductGroup {
  "id": UUID;
  "platform": MarketplaceProductGroupPlatform;
  "name": string;
  /** HEX-цвет метки среза, например #6366f1 */
  "color": string;
  /** Число товаров в срезе. При создании среза всегда приходит нулевым */
  "item_count": number;
  "created_at": string;
}

export interface MarketplaceProductGroupInput {
  /** Обрезается по краям. Пустое название даёт 400 */
  "name": string;
  /** HEX-цвет метки. Пустое значение даёт цвет по умолчанию #6366f1 */
  "color"?: string;
}

/** Товар маркетплейса в составе среза. Пара store_id и offer_id и есть его адрес — собственного идентификатора у строки состава нет. */
export interface MarketplaceProductGroupItem {
  "store_id": UUID;
  /** Артикул продавца на площадке */
  "offer_id": string;
}

export interface MarketplaceProductGroupItemPage {
  "count": number;
  "results": Array<MarketplaceProductGroupItem>;
}

export interface MarketplaceProductGroupItemsAdded {
  /** Сколько строк реально легло в срез. Повторы и товары чужих магазинов сюда не попадают */
  "added": number;
}

export interface MarketplaceProductGroupItemsInput {
  /** Строки без store_id или offer_id отбрасываются молча */
  "items": Array<MarketplaceProductGroupItem>;
}

export interface MarketplaceProductGroupPage {
  "count": number;
  "results": Array<MarketplaceProductGroup>;
}

/** Отсутствующее или пустое поле сохраняет текущее значение. */
export interface MarketplaceProductGroupPatch {
  "name"?: string;
  "color"?: string;
}

export type MarketplaceProductGroupPlatform = "ozon" | "wildberries";

/** Магазин маркетплейса в кабинете. Форма одна для Ozon, Wildberries и Яндекс Маркета — их различает только поле platform. Ключи и токены доступа к площадке в ответ не попадают. */
export interface MarketplaceStore {
  "id": UUID;
  /** Платформа задаётся маршрутом, а не телом запроса */
  "platform": "ozon" | "wildberries" | "yandex";
  "name": string;
  /** Идентификатор магазина на стороне площадки */
  "external_id": number;
  /** Ставка налога в процентах; decimal строкой */
  "tax_percent": string;
  "is_active": boolean;
}

/** Тело заведения магазина. Одинаково для трёх площадок — платформу задаёт маршрут. */
export interface MarketplaceStoreInput {
  "name": string;
  /** Должен помещаться в int32 — по нему магазин сопоставляется с аналитической базой */
  "external_id": number;
  /** Ставка налога в процентах; пустая строка сохраняется как ноль */
  "tax_percent"?: string;
  "is_active"?: boolean;
}

export interface MarketplaceStorePage {
  "count": number;
  "results": Array<MarketplaceStore>;
}

/** Отсутствующее или пустое поле сохраняет текущее значение. Название и external_id этим маршрутом не меняются. */
export interface MarketplaceStorePatch {
  /** Пустая строка оставляет сохранённую ставку */
  "tax_percent"?: string;
  "is_active"?: boolean;
}

export interface MarketplaceWbCardAdDay {
  "date": string;
  "spend": number;
  "views": number;
  "clicks": number;
  "ctr": number | null;
  "cpc": number | null;
  /** Добавления в корзину из рекламы */
  "atbs": number;
  "orders": number;
  "cr": number | null;
}

export interface MarketplaceWbCardBoard {
  /** Последний день данных «Джема» */
  "anchor": string;
  /** Ровно 14 дней по опорный включительно */
  "days": Array<string>;
  "meta": MarketplaceWbCardMeta;
  /** Ряд той же длины, что days */
  "funnel": Array<MarketplaceWbCardFunnelDay>;
  /** Ряд той же длины, что days */
  "ads": Array<MarketplaceWbCardAdDay>;
  /** Аналитическая база не подключена и цифры синтетические */
  "demo"?: boolean;
}

export interface MarketplaceWbCardFunnelDay {
  "date": string;
  /** Пусто, когда данных «Джема» за окно нет */
  "open_card": number | null;
  "to_cart": number | null;
  "cv_cart": number | null;
  "cv_order": number | null;
  /** Из «Джема», а без него из заказов */
  "orders_qty": number;
  "orders_sum": number;
  "avg_check": number | null;
  /** Средняя цена покупателя за день */
  "client_price": number | null;
  "spp": number | null;
  /** Из «Джема», а без него из продаж */
  "buyout_qty": number;
  "buyout_sum": number;
  "buyout_pct": number | null;
}

/** Паспорт карточки. В демо-ответе заполнены только nm_id, name и store_name. */
export interface MarketplaceWbCardMeta {
  /** Идентификатор карточки WB; в демо-ответе приходит строкой из параметра nm */
  "nm_id": number;
  /** Артикул поставщика */
  "vendor_code"?: string;
  "name": string;
  /** Предмет WB */
  "subject"?: string;
  "brand"?: string;
  "photo"?: string;
  "store_name": string;
  /** Цена со скидкой продавца */
  "price"?: string | null;
  /** Цена до скидки продавца */
  "old_price"?: string | null;
  /** Последняя цена покупателя */
  "buyer_price"?: string | null;
  "discount_percent"?: number | null;
  "stock"?: number | null;
  "in_way_to_client"?: number | null;
  "in_way_from_client"?: number | null;
  "volume_l"?: string | null;
  /** Себестоимость из кабинета */
  "cost"?: string | null;
  /** Средняя логистика за две недели */
  "logistics"?: number | null;
  /** Средний процент комиссии за две недели */
  "commission"?: number | null;
  /** Среднее хранение за две недели */
  "storage"?: number | null;
  /** Ставка налога магазина */
  "tax_percent"?: number;
  /** Процент выкупа за окно buyout_window */
  "buyout_rate"?: number | null;
  /** Границы окна выкупа через многоточие */
  "buyout_window"?: string;
}

export interface MarketplaceWbCardOption {
  "nm_id": number;
  /** Артикул поставщика */
  "vendor_code": string;
  /** Предмет WB */
  "subject": string;
  "name": string;
  "photo": string;
  "orders": number;
}

export interface MarketplaceWbCardOptions {
  /** Последний день данных «Джема»; пусто, когда данных нет */
  "anchor": string | null;
  "results": Array<MarketplaceWbCardOption>;
  /** Аналитическая база не подключена и цифры синтетические */
  "demo"?: boolean;
}

export interface MarketplaceWbCost {
  "store": string;
  "offer_id": string;
  "cost": string;
}

export interface MarketplaceWbCostRequest {
  "store": UUID;
  /** Артикул поставщика */
  "offer_id": string;
  /** Себестоимость строкой; пустое значение сохраняется как ноль */
  "cost"?: string;
  "note"?: string;
}

export interface MarketplaceWbDecompOther {
  /** Отсортированы по сумме по возрастанию */
  "items": Array<MarketplaceWbDecompOtherItem>;
  "total": number;
}

export interface MarketplaceWbDecompOtherItem {
  /** Наименование операции финансового отчёта */
  "name": string;
  "amount": number;
}

export interface MarketplaceWbDecomposition {
  /** Время последней синхронизации финансового отчёта */
  "updated": string | null;
  /** Последний день данных */
  "anchor": string;
  "months": Array<MarketplaceWbDecompositionMonth>;
  "month": MarketplaceWbDecompositionMonth | null;
  /** Первый блок — накопительно за месяц, далее спринты */
  "periods": Array<MarketplaceWbDecompositionPeriod>;
  "articles": Array<MarketplaceWbDecompositionArticle>;
  "other": MarketplaceWbDecompositionOther | null;
  /** Аналитическая база не подключена и цифры синтетические */
  "demo"?: boolean;
}

export interface MarketplaceWbDecompositionArticle {
  /** Внешний идентификатор магазина в аналитике */
  "store_id": number;
  "store_name": string;
  /** Артикул поставщика */
  "offer_id": string;
  /** У Wildberries не заполняется — идентификатор карточки лежит в nm_id */
  "sku": null;
  "nm_id": number | null;
  "name": string;
  /** Предмет WB */
  "category": string;
  "image": string;
  /** У Wildberries не заполняется и приходит пустой строкой */
  "url": string;
  /** Ключ — идентификатор блока периода */
  "by_period": { [key: string]: MarketplaceWbMetricCell };
}

export interface MarketplaceWbDecompositionMonth {
  "key": string;
  /** Название месяца по-русски */
  "label": string;
  /** Год */
  "sub": string;
  "start": string;
  "end": string;
}

export interface MarketplaceWbDecompositionOther {
  /** Суммы без привязки к артикулу по блокам периодов */
  "by_period": { [key: string]: MarketplaceWbMetricCell };
  /** Разбор строки «Прочее» по наименованиям операций */
  "breakdown": { [key: string]: Array<MarketplaceWbDecompOtherItem> };
}

export interface MarketplaceWbDecompositionPeriod {
  /** Идентификатор блока: month либо s с номером спринта */
  "id": string;
  "kind": "month" | "sprint";
  /** Номер спринта внутри месяца */
  "n": number | null;
  "label": string;
  /** Границы блока в формате дня и месяца */
  "sub": string;
  "start": string;
  "end": string;
  /** Множитель прогноза на полный период */
  "run_rate_factor": number;
  "totals": MarketplaceWbMetricCell;
}

export interface MarketplaceWbFacets {
  "subjects": Array<string>;
  "brands": Array<string>;
}

export interface MarketplaceWbFunnel {
  "platform": "wildberries";
  /** Название магазина */
  "store"?: string;
  /** jam — данные подписки, v3 — живой отчёт WB, v3_pending — площадка не ответила */
  "source"?: "jam" | "v3" | "v3_pending";
  "from"?: string;
  "to"?: string;
  "totals"?: MarketplaceWbFunnelTotals;
  /** Отсортированы по числу заказов по убыванию */
  "rows": Array<MarketplaceWbFunnelRow>;
  "note"?: string;
  /** Присутствует и равно false, когда аналитическая база не подключена */
  "analytics"?: boolean;
}

export interface MarketplaceWbFunnelDaily {
  "platform": "wb";
  "source"?: "wb_finance";
  /** Артикул поставщика выбранной строки */
  "sku"?: string;
  "from"?: string;
  "to"?: string;
  /** Окно 14 дней по опорный включительно */
  "days": Array<string>;
  /**
   * Ряды по дням окна той же длины, что days. Ключи traffic, views, cv2,
   * cart, cv3, orders, adShare, ordersSum, buyouts, buyoutsSum, avgBuyer,
   * spp, position, adSpend, drrOrders, drrSales, margin, umd, roi,
   * marginTot. Заполнены только spp, avgBuyer, margin, roi и marginTot —
   * воронка WB ещё не подключена и остальные ряды приходят пустыми.
   */
  "series": { [key: string]: Array<number | null> };
  /** Итог по каждому ряду одним элементом массива */
  "totals"?: { [key: string]: Array<number | null> };
  "card"?: MarketplaceWbFunnelDailyCard;
  /** До 300 артикулов по выручке за окно */
  "articles"?: Array<MarketplaceWbFunnelDailyArticle>;
  "note"?: string;
  /** Присутствует и равно false, когда аналитическая база не подключена */
  "analytics"?: boolean;
}

export interface MarketplaceWbFunnelDailyArticle {
  /** Артикул поставщика */
  "sku": string;
  "name": string;
  /** В этом списке не заполняется и приходит пустой строкой */
  "photo": string;
}

export interface MarketplaceWbFunnelDailyCard {
  /** Артикул поставщика */
  "sku": string;
  "name": string;
  "photo": string;
  /** Себестоимость из кабинета */
  "cost"?: number;
}

export interface MarketplaceWbFunnelRow {
  "nm_id": number;
  /** Артикул поставщика */
  "vendor": string;
  "name": string;
  "photo": string;
  /** Открытия карточки */
  "open": number;
  "cart": number;
  "orders": number;
  "buyouts": number;
  "orders_sum": number;
  "buyouts_sum": number;
  /** Конверсия из открытия в корзину в процентах */
  "cv_cart": number | null;
  /** Конверсия из корзины в заказ в процентах */
  "cv_order": number | null;
  "buyout_pct": number | null;
}

export interface MarketplaceWbFunnelTotals {
  "open": number;
  "cart": number;
  "orders": number;
  "buyouts": number;
  "orders_sum": number;
  "buyouts_sum": number;
  "cv_cart": number | null;
  "cv_order": number | null;
  "buyout_pct": number | null;
}

/** Ячейка декомпозиции. Расходы приходят отрицательными числами. */
export interface MarketplaceWbMetricCell {
  /** Идентификатор блока; присутствует только в итогах периода */
  "id"?: string;
  "revenue": number;
  "units": number;
  "return_units": number;
  "returns": number;
  "returns_pct": number | null;
  /** Вознаграждение WB как разница выплаты и дохода */
  "commission": number;
  "commission_pct": number | null;
  "logistics": number;
  "logistics_per_unit": number | null;
  "storage": number;
  "acceptance": number;
  "penalty": number;
  "deduction": number;
  "acquiring": number;
  /** Компенсации и прочие операции */
  "other": number;
  /** Внутренняя реклама WB */
  "internal_ad": number;
  /** Доля рекламных расходов в выручке */
  "drr": number | null;
  "cogs": number;
  "tax": number;
  "expenses": number;
  "profit": number;
  "margin_pct": number | null;
  /** Выручка в прогнозе run-rate */
  "rr_revenue": number;
  /** Прибыль в прогнозе run-rate; штрафы, удержания и прочее не проецируются */
  "rr_profit": number;
}

export interface MarketplaceWbOrdersDay {
  "date": string;
  "orders_sum": string;
  "orders_qty": number;
  "sales_sum": string;
  "sales_qty": number;
}

export interface MarketplaceWbOrdersKpi {
  "sum": string;
  "qty": number;
  /** Изменение к предыдущему дню в процентах */
  "delta_sum": number | null;
  /** Изменение к предыдущему дню в процентах */
  "delta_qty": number | null;
}

export interface MarketplaceWbOrdersOverview {
  /** Опорный день выборки */
  "day": string;
  "updated": string | null;
  "kpi": MarketplaceWbOrdersOverviewKpi;
  /** Ровно 14 дней по опорный включительно */
  "daily": Array<MarketplaceWbOrdersDay>;
  /** Не более 200 товаров опорного дня */
  "products": Array<MarketplaceWbOrdersProduct>;
  /** Аналитическая база не подключена и цифры синтетические */
  "demo"?: boolean;
}

export interface MarketplaceWbOrdersOverviewKpi {
  "orders": MarketplaceWbOrdersKpi;
  "sales": MarketplaceWbOrdersKpi;
}

export interface MarketplaceWbOrdersProduct {
  /** Внешний идентификатор магазина в аналитике */
  "store_id": number;
  /** Артикул поставщика */
  "offer_id": string;
  "nm_id": number | null;
  /** Наименование карточки; при его отсутствии подставляется предмет */
  "product_name": string;
  "units": number;
  "avg_price": string;
  "total": string;
  "primary_image": string;
  "store_name": string;
  "brand": string;
}

export interface MarketplaceWbPnl {
  "period_kind": "week" | "month";
  /** У Wildberries не заполняется и приходит пустой строкой */
  "scheme": string;
  "updated": string | null;
  "year": number;
  "years": Array<number>;
  /** Границы года ключами from и to */
  "range": { [key: string]: string };
  "periods": Array<MarketplaceWbPnlPeriod>;
  "rows": Array<MarketplaceWbPnlRow>;
  "note"?: string;
  /** Аналитическая база не подключена и цифры синтетические */
  "demo"?: boolean;
  /** Разбор строки «Прочее» по периодам */
  "breakdown"?: { [key: string]: Array<MarketplaceWbDecompOtherItem> };
}

export interface MarketplaceWbPnlPeriod {
  "key": string;
  "label": string;
  "sub": string;
  "start": string;
  "end": string;
}

export interface MarketplaceWbPnlRow {
  "key": string;
  "label": string;
  "kind": "total" | "subtotal" | "normal" | "percent";
  /** Значения по периодам в порядке periods */
  "values": Array<number | null>;
}

export interface MarketplaceWbPricing {
  "platform": "wb";
  "from"?: string;
  "to"?: string;
  "total"?: number;
  "shown"?: number;
  "rows": Array<MarketplaceWbPricingRow>;
  /** Присутствует и равно false, когда аналитическая база не подключена */
  "analytics"?: boolean;
}

export interface MarketplaceWbPricingRow {
  /** Артикул поставщика */
  "sku": string;
  /** Внешний идентификатор магазина в аналитике */
  "store_id": number;
  "nm_id": number;
  "name": string;
  "photo": string;
  /** Название магазина */
  "store": string;
  /** Установочная цена до СПП */
  "price": number;
  /** Установочная цена до СПП */
  "setPrice": number;
  /** Фактическая цена клиента */
  "factClient": number;
  "cost": number;
  /** Комиссия в процентах от установочной цены */
  "comm": number;
  /** Выплата продавцу на единицу */
  "forPay": number;
  /** Логистика на единицу */
  "logDirect": number;
  /** Хранение на единицу */
  "storageUnit": number;
  /** Платная приёмка на единицу */
  "acceptUnit": number;
  /** Штрафы на единицу */
  "penaltyUnit": number;
  /** Эквайринг в процентах от установочной цены */
  "acquiring": number;
  /** Ставка налога магазина в процентах */
  "tax": number;
  /** Скидка постоянного покупателя долей единицы */
  "spp": number;
  /** Продано единиц за окно */
  "units": number;
}

export interface MarketplaceWbProduct {
  /** Составной ключ строки: идентификатор магазина и артикул поставщика через двоеточие */
  "id": string;
  "store": UUID;
  "store_name": string;
  /** Идентификатор карточки WB */
  "nm_id": number | null;
  /** Артикул поставщика */
  "vendor_code": string;
  /** Баркод карточки */
  "sku": string;
  "product_name": string;
  "brand": string;
  /** Предмет WB */
  "subject_name": string;
  "photo_url": string;
  "vat": string;
  "volume_l": string;
  /** Цена со скидкой продавца */
  "price": string;
  /** Цена до скидки продавца */
  "old_price": string;
  "discount_percent": number;
  /** Последняя цена покупателя из заказов или продаж */
  "buyer_price": string;
  "stock": number;
  "in_way_to_client": number;
  "in_way_from_client": number;
  /** Себестоимость из кабинета */
  "cost": string | null;
}

export interface MarketplaceWbProductPage {
  "count": number;
  /** Задел под курсорную страницу; сейчас всегда пусто */
  "next": null;
  /** Задел под курсорную страницу; сейчас всегда пусто */
  "previous": null;
  "results": Array<MarketplaceWbProduct>;
  /** Аналитическая база не подключена и цифры синтетические */
  "demo"?: boolean;
}

export interface MarketplaceWbPromotion {
  "id": number;
  "name": string;
  /** Тип акции WB, например auto или regular */
  "type": string;
  /** Начало акции по стандарту RFC 3339 */
  "start": string;
  /** Конец акции по стандарту RFC 3339 */
  "end": string;
  "days_left": number | null;
  /** Всегда ноль: скидку по товару задаёт оператор */
  "disc": number;
  /** Пояснение к типу акции */
  "desc": string;
}

export interface MarketplaceWbPromotions {
  /** Отсортированы по дате окончания по возрастанию */
  "promos": Array<MarketplaceWbPromotion>;
  /** Причина пустого списка: нет токена WB либо площадка недоступна */
  "note"?: string;
}

export interface MarketplaceWbStockPage {
  /** Число товаров, а не строк «товар × склад» */
  "count": number;
  /** Склады в порядке первого появления */
  "warehouses": Array<string>;
  "results": Array<MarketplaceWbStockProduct>;
}

export interface MarketplaceWbStockProduct {
  "store": UUID;
  "store_name": string;
  /** Артикул поставщика */
  "offer_id": string;
  "name": string;
  "image": string;
  "total": number;
  "warehouses": Array<MarketplaceWbStockWarehouse>;
}

export interface MarketplaceWbStockWarehouse {
  "warehouse": string;
  /** Кластер склада; у Wildberries не заполняется и в ответ не попадает */
  "cluster"?: string;
  "qty": number;
}

export interface MarketplaceYandexCost {
  "store": UUID;
  "offer_id": string;
  /** Себестоимость decimal строкой */
  "cost": string;
}

export interface MarketplaceYandexCostInput {
  "store": UUID;
  /** Артикул продавца */
  "offer_id": string;
  /** Себестоимость decimal строкой; пустая строка сохраняется как ноль */
  "cost"?: string;
  /** Комментарий; сохраняется, но в ответ не возвращается */
  "note"?: string;
}

export interface MarketplaceYandexOrdersDay {
  "date": string;
  /** Сумма заказов кроме отменённых; decimal строкой */
  "orders_sum": string;
  "orders_qty": number;
  /** Сумма доставленных заказов; decimal строкой */
  "sales_sum": string;
  "sales_qty": number;
}

export interface MarketplaceYandexOrdersKpi {
  /** Сумма decimal строкой */
  "sum": string;
  "qty": number;
  /** Изменение суммы ко вчерашнему дню в процентах; null когда вчера было пусто */
  "delta_sum": number | null;
  /** Изменение количества ко вчерашнему дню в процентах; null когда вчера было пусто */
  "delta_qty": number | null;
}

export interface MarketplaceYandexOrdersOverview {
  /** Последний день с заказами; к нему привязаны показатели и товары */
  "day": string;
  /** Момент последней синхронизации источника */
  "updated": string | null;
  "kpi": MarketplaceYandexOrdersOverviewKpi;
  /** Четырнадцать дней подряд по возрастанию даты; дни без заказов заполнены нулями */
  "daily": Array<MarketplaceYandexOrdersDay>;
  /** Товары дня по убыванию суммы */
  "products": Array<MarketplaceYandexOrdersProduct>;
  /** Присутствует и равно true только в офлайн-ответе без аналитической базы; цифры синтетические */
  "demo"?: boolean;
}

export interface MarketplaceYandexOrdersOverviewKpi {
  "orders": MarketplaceYandexOrdersKpi;
  "sales": MarketplaceYandexOrdersKpi;
}

/** Строка товара за день. Поле market_sku приходит из аналитической базы, поле sku — из офлайн-ответа без неё. */
export interface MarketplaceYandexOrdersProduct {
  /** external_id магазина, а не его UUID */
  "store_id": number;
  "store_name": string;
  /** Артикул продавца */
  "offer_id": string;
  /** Строкой, в отличие от целого market_sku витрины товаров; отсутствует в офлайн-ответе */
  "market_sku"?: string | null;
  /** Только в офлайн-ответе без аналитической базы */
  "sku"?: number;
  "product_name": string;
  "units": number;
  /** Средняя цена decimal строкой */
  "avg_price": string;
  /** Сумма decimal строкой */
  "total": string;
  "primary_image": string;
  "url": string;
}

export interface MarketplaceYandexPnl {
  "period_kind": "week" | "month";
  /** В боевом ответе пустая строка; заполняется только в демо-ответе */
  "scheme": string;
  /** Момент последней синхронизации источника */
  "updated": string | null;
  "year": number;
  /** Годы, за которые есть данные */
  "years": Array<number>;
  "range": MarketplaceYandexPnlRange;
  "periods": Array<MarketplaceYandexPnlPeriod>;
  "rows": Array<MarketplaceYandexPnlRow>;
  /** Пояснение к неполноте источника */
  "note"?: string;
  /** Присутствует и равно true только в офлайн-ответе без аналитической базы; цифры синтетические */
  "demo"?: boolean;
}

export interface MarketplaceYandexPnlRange {
  "from": string;
  "to": string;
}

export interface MarketplaceYandexPnlPeriod {
  /** Первый день периода */
  "key": string;
  /** Номер недели ISO или название месяца */
  "label": string;
  /** Диапазон дат недели или год месяца */
  "sub": string;
  "start": string;
  "end": string;
}

export interface MarketplaceYandexPnlRow {
  "key": "revenue" | "cancelled" | "income" | "payout" | "commission" | "logistics" | "cogs" | "taxes" | "variable" | "margin" | "pct_commission" | "pct_logistics" | "pct_cogs" | "margin_pct";
  "label": string;
  "kind": "total" | "subtotal" | "normal" | "percent";
  /** По одному значению на период в том же порядке; null означает, что показатель не считается */
  "values": Array<number | null>;
}

export interface MarketplaceYandexProduct {
  /** Составной ключ вида «UUID магазина двоеточие артикул» */
  "id": string;
  "store": UUID;
  "store_name": string;
  /** Артикул продавца */
  "offer_id": string;
  "market_sku": number | null;
  "product_name": string;
  "category": string;
  "vendor": string;
  "barcode": string;
  /** Базовая цена decimal строкой; пустая строка когда цены нет */
  "price": string;
  /** Цена до скидки decimal строкой; пустая строка когда её нет */
  "old_price": string;
  "stock": number;
  "status_name": string;
  "primary_image": string;
  /** Первая ссылка витрины; пустая строка когда её нет */
  "url": string;
  /** Себестоимость decimal строкой; null когда она не заведена */
  "cost": string | null;
}

export interface MarketplaceYandexProductPage {
  "count": number;
  /** Всегда null — страницы листаются параметрами page и page_size */
  "next": null;
  /** Всегда null — страницы листаются параметрами page и page_size */
  "previous": null;
  "results": Array<MarketplaceYandexProduct>;
  /** Присутствует и равно true только в офлайн-ответе без аналитической базы; цифры синтетические */
  "demo"?: boolean;
}

export interface Meeting {
  "id": UUID;
  "project_id": UUID;
  "project_key": string;
  "project_name": string;
  "title": string;
  "kind": MeetingKind;
  "status": MeetingStatus;
  "starts_at": string;
  "duration_minutes": number;
  "location": string;
  "meeting_url": string;
  "recording_url": string;
  "summary": string;
  "transcript": string;
  "has_transcript": boolean;
  "calendar_event_id": UUID | null;
  "visibility": HubVisibility;
  "created_by": number | null;
  "created_at": string;
  "updated_at": string;
  "participants": Array<MeetingParticipant>;
  "items": Array<MeetingItem>;
}

export interface MeetingCreate {
  "id"?: string;
  "project": string;
  "title": string;
  "kind"?: MeetingKind;
  "status"?: MeetingStatus;
  "starts_at": string;
  "duration_minutes"?: number;
  "location"?: string;
  "meeting_url"?: string;
  "recording_url"?: string;
  "summary"?: string;
  "transcript"?: string;
  "calendar_event"?: string;
  "visibility"?: HubVisibility;
  "created_by"?: number;
  "participants"?: Array<MeetingParticipantInput>;
  "items"?: Array<MeetingItemInput>;
  "replace_content"?: boolean;
}

export interface MeetingItem {
  "id": UUID;
  "kind": MeetingItemKind;
  "title": string;
  "body": string;
  "task_id": UUID | null;
  "task_key": string;
  "task_title": string;
  "owner_user_id": number | null;
  "owner_name": string;
  "due_date": string;
  "sort_order": number;
}

export interface MeetingItemInput {
  "kind": MeetingItemKind;
  "title": string;
  "body"?: string;
  "task"?: string;
  "owner_user"?: number;
  "owner_name"?: string;
  "due_date"?: string;
}

export type MeetingItemKind = "agenda" | "decision" | "action" | "question" | "note";

export type MeetingKind = "client" | "internal" | "demo" | "planning" | "retro" | "other";

export interface MeetingPage {
  "count": number;
  "results": Array<Meeting>;
}

export interface MeetingParticipant {
  "id": UUID;
  "user_id": number | null;
  "user_name": string;
  "external_name": string;
  "external_email": string;
  "role": string;
  "attended": boolean;
}

export interface MeetingParticipantInput {
  "user"?: number;
  "external_name"?: string;
  "external_email"?: string;
  "role"?: string;
  "attended"?: boolean;
}

export type MeetingStatus = "planned" | "held" | "cancelled";

/** URL-путь задаёт `id`; переданные непустые поля обновляются частично. */
export interface MeetingUpdate {
  "project"?: string;
  "title"?: string;
  "kind"?: MeetingKind;
  "status"?: MeetingStatus;
  "starts_at"?: string;
  "duration_minutes"?: number;
  "location"?: string;
  "meeting_url"?: string;
  "recording_url"?: string;
  "summary"?: string;
  "transcript"?: string;
  "calendar_event"?: string;
  "visibility"?: HubVisibility;
  "created_by"?: number;
  "participants"?: Array<MeetingParticipantInput>;
  "items"?: Array<MeetingItemInput>;
  "replace_content"?: boolean;
}

export interface Member {
  "id": number;
  "username": string;
  "name": string;
}

/** Требуется `user_id`; `user` поддерживается только для совместимости старых клиентов. */
export interface MemberAssignment {
  "user_id"?: number;
  "user"?: number;
  "role"?: SectionRole;
}

export interface Milestone {
  "id": UUID;
  "section": UUID;
  "section_key": string;
  "section_name": string;
  "name": string;
  "description": string;
  "target_date": string | null;
  "order": number;
  "is_archived": boolean;
  "created_at": string;
  "updated_at": string;
}

export interface MilestoneCreate {
  /** UUID, ключ или имя проекта задач */
  "section": string;
  "name": string;
  "description"?: string;
  "target_date"?: string;
  "order"?: number;
}

export interface MilestonePage {
  "count": number;
  "results": Array<Milestone>;
}

export interface MilestoneUpdate {
  "section"?: string;
  "name"?: string;
  "description"?: string;
  "target_date"?: string;
  "order"?: number;
  "is_archived"?: boolean;
}

export interface OK {
  "ok": true;
}

export interface PlatformApp {
  "id": UUID;
  /** Издатель: строчные латинские буквы, цифры и дефисы */
  "publisher": string;
  /** Ключ приложения; вместе с издателем образует пространство имён app.<издатель>.<ключ> */
  "key": string;
  "title": string;
  "status": PlatformAppStatus;
  /** Сотрудник платформы, заведший приложение */
  "created_by"?: number;
  "created_at": string;
  "updated_at": string;
}

export interface PlatformAppBlockList {
  "blocks": Array<PlatformAppManifestBlock>;
}

export interface PlatformAppConsentDiff {
  /** Что просит целевая версия */
  "requested": Array<string>;
  /** Что кабинет одобрил сейчас */
  "granted": Array<string>;
  /** Чего не просила установленная версия; это разница манифеста, а не разница доступа */
  "new": Array<string>;
  /** Просит, но кабинет не одобрял */
  "missing": Array<string>;
  /** Обязательная часть missing — только она останавливает обновление */
  "missing_required": Array<string>;
  "missing_optional": Array<string>;
  /** Одобрено, но целевая версия не просит */
  "dropped": Array<string>;
  /** Набор установки, если нового согласия не дают */
  "kept": Array<string>;
}

export interface PlatformAppConsentRequired {
  "detail": string;
  /** platform.app_consent_required, когда обновление остановлено новым обязательным правом */
  "code"?: string;
  /** Версия, которая просит */
  "version"?: string;
  /** Права, которых кабинет не одобрял; только они, чтобы решающее не утонуло в списке */
  "scopes"?: Array<string>;
}

export interface PlatformAppDataPolicy {
  /** false означает, что версия ничего не обещала о данных при удалении */
  "declared": boolean;
  "categories"?: Array<string>;
  "regions"?: Array<string>;
  "retention_days": number;
  "uninstall"?: "purge" | "export_then_purge" | "archive";
}

/** Сводка доставки событий установке. Только числа, которые считает Akeda: ни тела события, ни ответа приёмника здесь нет и быть не может — текст приёмника недоверен, а сводку читает кабинетный экран. */
export interface PlatformAppDeliveryHealth {
  "installation_id": UUID;
  /** Когда установке в последний раз пытались дозвониться. Отсутствует, если ей ещё ничего не отправляли */
  "last_attempt_at"?: string;
  /** Последняя удачная доставка. Отсутствие при заполненном last_attempt_at означает «отправляли, и ни разу не доехало» — это не то же самое, что «ещё не отправляли» */
  "last_delivered_at"?: string;
  /** Мёртвые письма подряд. Любая удачная доставка обнуляет счётчик; по нему принимается решение о парковке */
  "consecutive_dead": number;
  /** Сколько мёртвых писем накопилось всего. Ровно столько фактов не доехало и ждёт повтора; число монотонно — повтор заводит новый наряд, а не оживляет мёртвый */
  "dead_letters": number;
  /** Начало окна доли отказов. Окно фиксированное; отдаётся вместе со счётчиками, чтобы «0 из 0» читалось как «за окно не отправляли», а не как «отказов нет» */
  "window_started_at": string;
  /** Попыток за окно. Ноль означает, что доли нет вовсе */
  "window_attempts": number;
  /** Из них неудачных (отложенных и мёртвых). Доля считается читателем: процент без знаменателя врёт на обоих концах */
  "window_failures": number;
  /** Проекция парковки в базе кабинета: очередь проходит мимо этой установки. Правда о парковке — parked_at самой установки */
  "paused_at"?: string;
}

export interface PlatformAppHealthCheck {
  /** skipped — спрашивать некого: у декларативного расширения нет своего приёмника */
  "status": "ok" | "skipped" | "failed";
  /** Адрес, который спрашивали; живёт в манифесте версии, а версию потом снимут с публикации */
  "url"?: string;
  /** Ноль означает «не ответил вовсе», и это не то же самое, что «ответил пятисоткой» */
  "http_status"?: number;
  "latency_ms"?: number;
  /** Класс отказа для разбора; человеку показывают не его */
  "reason"?: string;
  "checked_at": string;
}

export interface PlatformAppInstallResult {
  "installation": PlatformAppInstallation;
  "app": PlatformApp;
  "version": PlatformAppVersion;
  "diff": PlatformAppConsentDiff;
  "data_policy": PlatformAppDataPolicy;
  "health": PlatformAppHealthCheck;
}

export interface PlatformAppInstallation {
  "id": UUID;
  "tenant_id": UUID;
  "app_id": UUID;
  "version_id": UUID;
  /** На что согласился кабинет; итоговый доступ ещё уже — он пересекается с политикой публикации, включённостью модуля, RBAC и RLS */
  "granted_scopes": Array<string>;
  "status": PlatformAppInstallationStatus;
  /** След администратора для аудита; прав поставившего установка не наследует */
  "installed_by"?: number;
  "consent_at"?: string;
  "suspended_at"?: string;
  "revoked_at"?: string;
  "disable_reason": string;
  /** Куда уезжают подписанные события этой установки. Снят с манифеста версии при установке; переход версии его не меняет. Пусто у декларативного расширения */
  "delivery_endpoint_url": string;
  /** Момент последней смены адреса — ограда повтора: доставки, заведённые до него, переигрывает только персонал платформы. Отсутствует, пока адрес не менялся */
  "delivery_endpoint_changed_at"?: string;
  /** Приёмник признан мёртвым, и доставка приостановлена: наряды копятся, ничего не теряется. Не отзыв — статус установки, её токены и секрет подписи не меняются. Отсутствует, пока установка не запаркована */
  "parked_at"?: string;
  /** Машинный код причины. Список закрыт: слова недоверенного приёмника в это поле не попадают ни при каких условиях */
  "park_reason"?: "" | "consecutive_dead_letters";
  /** Сколько мёртвых писем подряд насчиталось на момент парковки. Порог мог с тех пор поменяться, и без числа причина непроверяема */
  "parked_dead_letters"?: number;
  "created_at": string;
  "updated_at": string;
}

export interface PlatformAppInstallationEvent {
  "id": UUID;
  /** Номер записи в журнале установки */
  "sequence": number;
  "installation_id": UUID;
  "tenant_id": UUID;
  "token_id"?: UUID;
  "kind": "install" | "consent_update" | "version_update" | "token_issue" | "token_rotate" | "token_revoke" | "suspend" | "resume" | "uninstall";
  "actor_user_id"?: number;
  "scopes": Array<string>;
  "reason": string;
  /** Прежнее и новое значение перехода; форма зависит от вида записи */
  "details"?: { [key: string]: unknown };
  "created_at": string;
}

export interface PlatformAppInstallationEventPage {
  "events": Array<PlatformAppInstallationEvent>;
  /** Применённая глубина выборки, а не запрошенная */
  "limit": number;
}

export type PlatformAppInstallationStatus = "pending" | "active" | "suspended" | "revoked";

export interface PlatformAppManifestBlock {
  /** sha256 компактной формы документа — тот же отпечаток, которым ворота публикации связывают результат внешнего линтера с проверенным манифестом */
  "manifest_fingerprint": string;
  /** Где документ впервые увидели. Улика, а не предмет запрета: тот же отпечаток у другого издателя закрыт этим же запретом */
  "publisher": string;
  "app_key": string;
  "reason_code": "malicious" | "vulnerable" | "data_exfiltration" | "supply_chain" | "publisher_request";
  /** Объяснение словами; уезжает кабинету в карточку уведомления, поэтому это наш текст, а не эхо приёмника */
  "summary": string;
  /** Внешний https-адрес разбора: CVE, бюллетень, тикет */
  "advisory"?: string;
  "blocked_by"?: number;
  "blocked_at": string;
}

export interface PlatformAppManifestPermissions {
  /** Без этих прав приложение не работает; их появление останавливает обновление до согласия */
  "required": Array<string>;
  /** Появление такого права обновление не останавливает — оно просто не активируется */
  "optional": Array<string>;
}

export interface PlatformAppPublisher {
  "id": UUID;
  /** Сегмент пространства имён app.<издатель>.<ключ>; неизменен */
  "slug": string;
  /** Что видит администратор кабинета на экране согласия; правка снимает проверку */
  "legal_name": string;
  /** Код страны из двух букв */
  "country": string;
  /** Внешний адрес https; правка снимает проверку */
  "homepage": string;
  "contact_email": string;
  /** Отдельный адрес на аварию, чтобы она не стояла в общей очереди поддержки */
  "incident_email": string;
  "status": PlatformAppPublisherStatus;
  /** Чем подтверждали; пусто у непроверенного */
  "verification_method": "" | "document" | "contract" | "internal";
  /** Основание проверки текстом: через полгода вопрос будет не «проверен ли», а «на основании чего» */
  "verification_evidence": string;
  "verified_at"?: string;
  "verified_by"?: number;
  "verification_dropped_at"?: string;
  /** Почему проверку сняли; отличает «ещё не проверяли» от «проверенное имя поменяли» */
  "verification_dropped_reason": string;
  "suspended_at"?: string;
  "suspend_reason": string;
  "created_by"?: number;
  "created_at": string;
  "updated_at": string;
}

export type PlatformAppPublisherStatus = "unverified" | "verified" | "suspended";

export interface PlatformAppReasonInput {
  /** Причина перехода; уезжает в журнал установки и в причину отзыва токенов */
  "reason"?: string;
}

export interface PlatformAppRollbackResult {
  "installation": PlatformAppInstallation;
  "from": PlatformAppVersion;
  "to": PlatformAppVersion;
  "diff": PlatformAppConsentDiff;
}

export type PlatformAppStatus = "draft" | "published" | "suspended" | "retired";

export interface PlatformAppSwitchResult {
  "installation": PlatformAppInstallation;
  /** Сколько живых токенов погасила операция; ноль означает, что доступ и так не был выдан */
  "revoked_tokens": number;
  /** Сколько секретов подписи погасило удаление: токен закрывает вызовы приложения к нам, секрет подписи — наши доставки к нему */
  "revoked_signing_keys"?: number;
  /** Сколько сохранённых настроек и секретов уничтожено; по самой таблице этого уже не увидеть */
  "purged_config_values"?: number;
  "data_policy"?: PlatformAppDataPolicy;
  "notice"?: PlatformAppUninstallNotice;
}

export interface PlatformAppUninstallNotice {
  /** unavailable — не смогла отправить сама платформа: чинить это ей, а не издателю */
  "status": "delivered" | "failed" | "skipped" | "unavailable";
  "url"?: string;
  /** Идентификатор ключа подписи; секретом не является и нужен приёмнику, чтобы доказать, чем проверял */
  "key_id"?: string;
  "http_status"?: number;
  "reason"?: string;
  "sent_at": string;
}

export interface PlatformAppUnparkResult {
  "installation": PlatformAppInstallation;
  "health": PlatformAppHealthCheck;
  /** Сколько установка простояла запаркованной. Числом, а не строкой: собранная сервером фраза не переводится на второй язык */
  "parked_for_seconds": number;
}

export interface PlatformAppUpdateInput {
  /** Пусто означает «остаться на текущей»: тогда обновляется только согласие */
  "version"?: string;
  /** Отсутствие поля означает «согласия не давали»; пустой список — «ни на что», и это разные ответы */
  "approved"?: Array<string>;
  "reason"?: string;
}

export interface PlatformAppUpdateResult {
  "installation": PlatformAppInstallation;
  "from": PlatformAppVersion;
  "to": PlatformAppVersion;
  "diff": PlatformAppConsentDiff;
  /** Обновление прошло по новому согласию, а не по прежнему */
  "consented": boolean;
  "health"?: PlatformAppHealthCheck;
}

export interface PlatformAppVersion {
  "id": UUID;
  "app_id": UUID;
  "version": string;
  /** Манифест версии целиком; источник правды о правах и политике данных */
  "manifest": { [key: string]: unknown };
  /** Digest пакета: без него подмену артефакта не с чем сравнить */
  "manifest_digest": string;
  /** Что версия просит; одобренное живёт у установки */
  "requested_scopes": Array<string>;
  "status": PlatformAppVersionStatus;
  "released_at"?: string;
  "created_at": string;
  "updated_at": string;
}

export type PlatformAppVersionStatus = "draft" | "review" | "published" | "deprecated" | "blocked";

export interface Project {
  "id": UUID;
  "key": string;
  "name": string;
  "description": string;
  "color": string;
  "order": number;
  "sections": number;
  "tasks_total": number;
  "tasks_active": number;
  "tasks_done": number;
  "scrum_enabled": boolean;
}

export interface ProjectCreate {
  "name": string;
  "key"?: string;
  "description"?: string;
  "color"?: string;
}

export interface ProjectFileFolder {
  "id": UUID;
  "project_id": UUID;
  "parent_id": string | null;
  "name": string;
  "sort_order": number;
  "created_by": number | null;
  "created_at": string;
  "updated_at": string;
}

export interface ProjectFileFolderCreate {
  "name": string;
  "parent_id"?: UUID;
}

export interface ProjectFileFolderPage {
  "count": number;
  "results": Array<ProjectFileFolder>;
}

export interface ProjectFileFolderRename {
  "name": string;
}

export interface ProjectFileUpload {
  "file": string;
  "folder"?: UUID;
}

export interface ProjectPage {
  "count": number;
  "results": Array<Project>;
}

export interface ProjectUpdate {
  "name"?: string;
  "key"?: string;
  "description"?: string;
  "color"?: string;
}

export interface PullRequest {
  "id": UUID;
  "owner_type": PullRequestOwnerType;
  "owner_id": UUID;
  "owner_key": string;
  "owner_name": string;
  "provider": string;
  "repository": string;
  "number": string;
  "title": string;
  "url": string;
  "status": string;
  "branch": string;
  "commit_sha": string;
  "is_archived": boolean;
  "created_at": string;
  "updated_at": string;
}

/** Владелец задаётся `task`, `section` или парой `owner_type`/`owner_id`. */
export interface PullRequestCreate {
  "owner_type"?: PullRequestOwnerType;
  "owner_id"?: string;
  "task"?: string;
  "section"?: string;
  "provider"?: string;
  "repository"?: string;
  "number"?: string;
  "title"?: string;
  "url": string;
  "status"?: string;
  "branch"?: string;
  "commit_sha"?: string;
}

export type PullRequestOwnerType = "task" | "section";

export interface PullRequestPage {
  "count": number;
  "results": Array<PullRequest>;
}

export interface PullRequestUpdate {
  "provider"?: string;
  "repository"?: string;
  "number"?: string;
  "title"?: string;
  "url"?: string;
  "status"?: string;
  "branch"?: string;
  "commit_sha"?: string;
  "is_archived"?: boolean;
}

export interface Relation {
  "id": UUID;
  "source": UUID;
  "target": UUID;
  "target_identifier": string;
  "target_title": string;
  "kind": RelationKind;
  "direction": RelationDirection;
  "counterpart": UUID;
  "counterpart_identifier": string;
  "counterpart_title": string;
  "counterpart_status": string | null;
  "counterpart_status_category": string | null;
}

export interface RelationCreate {
  "target": UUID;
  "kind"?: RelationKind;
}

export type RelationDirection = "outgoing" | "incoming" | "all";

export type RelationKind = "relates" | "blocks" | "blocked_by" | "duplicate";

export type RelationList = Array<Relation>;

export interface ScrumSection {
  "section": UUID;
  "name": string;
  "key": string;
  "is_enabled": boolean;
  "tasks": number;
}

export interface ScrumSettings {
  "project": UUID;
  "project_key": string;
  "project_name": string;
  "is_enabled": boolean;
  "sprint_length_weeks": number;
  "close_weekday": number;
  "close_time": string;
  "daily_weekdays": Array<number>;
  "timezone": string;
  "updated_at": string;
  "sections": Array<ScrumSection>;
  "team": Array<ScrumTeamMember>;
}

export interface ScrumSettingsPage {
  "count": number;
  "results": Array<ScrumSettings>;
}

export interface ScrumSettingsUpdate {
  "is_enabled"?: boolean;
  "sprint_length_weeks"?: number;
  "close_weekday"?: number;
  "close_time"?: string;
  "daily_weekdays"?: Array<number>;
  "timezone"?: string;
  "excluded_sections"?: Array<UUID>;
  "team_user_ids"?: Array<number>;
}

export interface ScrumTeamMember {
  "user": number;
  "name": string;
  "in_team": boolean;
  "sections": number;
}

export interface Section {
  "id": UUID;
  "project": UUID | null;
  "project_key": string | null;
  "project_name": string | null;
  "key": string;
  "name": string;
  "description": string;
  "color": string;
  "icon": string;
  "status": string;
  "lead": number | null;
  "lead_name": string | null;
  "target_date": string | null;
  "tasks_total": number;
  "tasks_active": number;
  "tasks_done": number;
  "tasks_overdue": number;
  "members_count": number;
  "members": Array<SectionMemberPreview>;
}

export interface SectionCreate {
  "project": UUID;
  "key"?: string;
  "name": string;
  "description"?: string;
  "color"?: string;
  "icon"?: string;
  "status"?: string;
  "lead"?: number;
  "target_date"?: string;
}

export interface SectionMember {
  "id": UUID;
  "user": number;
  "username": string;
  "user_name": string;
  "role": SectionRole;
  "created_at": string;
}

/** Если пользователь не передан, сервер добавляет текущего пользователя. */
export interface SectionMemberAssignment {
  "user_id"?: number;
  "user"?: number;
  "role"?: SectionRole;
}

export interface SectionMemberPreview {
  "id": UUID;
  "user": number;
  "user_name": string | null;
  "role": SectionRole;
}

export interface SectionPage {
  "count": number;
  "results": Array<Section>;
}

export type SectionRole = "owner" | "co_owner" | "member" | "viewer";

export interface SectionUpdate {
  "project"?: UUID;
  "key"?: string;
  "name"?: string;
  "description"?: string;
  "color"?: string;
  "icon"?: string;
  "status"?: string;
  "lead"?: number;
  "target_date"?: string;
}

export interface SettingsApiKey {
  "id": UUID;
  "name": string;
  /** Первые 12 знаков значения; открытая часть ключа */
  "prefix": string;
  "scopes": Array<string>;
  "is_active": boolean;
  /** Отметка времени в текстовом виде из базы */
  "expires_at": string | null;
  "rate_limit_per_min": number;
  /** Отметка времени в текстовом виде из базы */
  "last_used_at": string | null;
  /** Отметка времени в текстовом виде из базы */
  "created_at": string;
  /** Маска значения вида ••••abcd; пусто у ключей, выпущенных до хранилища */
  "hint": string;
  /** Значение ключа сохранено в кабинете; false означает «сохранён только хеш», а не отсутствие прав */
  "can_reveal": boolean;
  /** Отметка времени в текстовом виде из базы */
  "revoked_at": string | null;
  /** Отметка времени в текстовом виде из базы */
  "last_revealed_at": string | null;
  /** Ключ выдан человеку, а не кабинету, и работает в каждом кабинете владельца с правами этого кабинета */
  "personal": boolean;
}

export interface SettingsApiKeyAccessEntry {
  "id": UUID;
  "api_key_id": UUID;
  "user_id": number | null;
  /** Полное имя автора события или его логин */
  "user_name": string;
  "action": "create" | "reveal" | "revoke" | "restore" | "delete";
  /** Отметка времени в текстовом виде из базы */
  "created_at": string;
}

export interface SettingsApiKeyAccessPage {
  /** Число строк в results, а не общее число событий */
  "count": number;
  "results": Array<SettingsApiKeyAccessEntry>;
}

export interface SettingsApiKeyActivationResult {
  "id": UUID;
  /** false после отзыва, true после возврата в работу */
  "is_active": boolean;
}

export interface SettingsApiKeyCreated {
  "id": UUID;
  "name": string;
  /** Первые 12 знаков значения */
  "prefix": string;
  "scopes": Array<string>;
  "is_active": boolean;
  /** Отметка времени в текстовом виде из базы */
  "expires_at": string | null;
  "rate_limit_per_min": number;
  /** Отметка времени в текстовом виде из базы */
  "last_used_at": string | null;
  /** Отметка времени в текстовом виде из базы */
  "created_at": string;
  /** Полное значение ключа. Показывается единственный раз — в этом ответе; список ключей его не возвращает */
  "key": string;
  "personal": boolean;
}

export interface SettingsApiKeyInput {
  /** Пустое имя заменяется на «Ключ» */
  "name"?: string;
  /** Пустой список заменяется на ["tasks:read"]; каждое право обязано быть у создателя */
  "scopes"?: Array<string>;
  /** Ноль и отрицательное значение заменяются на 600 */
  "rate_limit_per_min"?: number;
  /** true выдаёт ключ человеку, а не кабинету */
  "personal"?: boolean;
}

export interface SettingsApiKeyPage {
  /** Число строк в results, а не общее число ключей кабинета */
  "count": number;
  "results": Array<SettingsApiKey>;
}

export interface SettingsAppCatalog {
  "apps": Array<SettingsAppCatalogEntry>;
}

export interface SettingsAppCatalogEntry {
  "app": PlatformApp;
  "publisher": SettingsAppPublisherCard;
  /** Версии, открытые кабинету, свежие первыми; пусто у стоящего приложения, если ставить и обновлять больше не на что */
  "versions": Array<SettingsAppVersion>;
  "installation"?: PlatformAppInstallation;
  "installed_version"?: SettingsAppVersion;
}

export interface SettingsAppConsentPermission {
  "scope": string;
  /** Без этого права приложение не работает; необъяснённое манифестом право считается обязательным */
  "required": boolean;
  /** Пусто, если манифест право не объяснил: класс не выдумывается */
  "risk_class": "low" | "medium" | "high" | "restricted" | "";
  "explanation": SettingsAppLocalizedText;
  /** Манифест объяснил право; false означает, что администратор одобряет вслепую */
  "explained": boolean;
  /** Платформа объявляла такую область. False означает, что сказать о праве нечего, кроме имени, — и экран обязан сказать именно это */
  "declared": boolean;
  /** Ярус чувствительности из таксономии платформы. Пусто у необъявленной области: ярус не выдумывается, а «обычная» по умолчанию означала бы, что неизвестное безобиднее известного */
  "tier": "ordinary" | "sensitive" | "";
  /** Область устарела и снимется не раньше чем через полгода после пометки; она открывает заметно больше нужного и осталась работающей ради уже поставленных приложений */
  "deprecated": boolean;
  "grants": SettingsAppLocalizedText;
  "purpose": SettingsAppLocalizedText;
  /** Сколько приложение держит у себя полученное этим правом; ноль — «не храню» */
  "retention_days": number;
  /** Срок назван. Отличает «не храню» (ноль) от «срок не назван» (поля в манифесте нет) */
  "retention_declared": boolean;
}

export interface SettingsAppConsentPreview {
  "app": PlatformApp;
  "version": SettingsAppVersion;
  "permissions": PlatformAppManifestPermissions;
  /** true означает, что это предпросмотр обновления */
  "installed": boolean;
  "installation"?: PlatformAppInstallation;
  "current_version"?: SettingsAppVersion;
  "diff": PlatformAppConsentDiff;
  "data_policy": PlatformAppDataPolicy;
  "publisher": SettingsAppPublisherCard;
  "sheet": SettingsAppConsentSheet;
}

export interface SettingsAppConsentResult {
  "preview": SettingsAppConsentPreview;
  /** Без нового согласия установка или обновление дальше не пойдут */
  "requires_consent": boolean;
}

/** Лист согласия, снятый с манифеста сервером: единственное утверждение платформы о приложении, на которое кабинет соглашается */
export interface SettingsAppConsentSheet {
  "name": SettingsAppLocalizedText;
  "description": SettingsAppLocalizedText;
  "homepage": string;
  "runtime": "hosted" | "managed" | "declarative" | "";
  "channel": "sandbox" | "private" | "public" | "";
  "permissions": Array<SettingsAppConsentPermission>;
  "subscriptions": Array<SettingsAppConsentSubscription>;
  "slots": Array<SettingsAppConsentSlot>;
  /** Что приложение узнает о человеке, открывшем панель: пересечение запрошенного слотами с закрытым словарём платформы; больше ничего оно узнать не может */
  "person_facts": Array<"actor_subject" | "locale" | "theme">;
  "data_policy": PlatformAppDataPolicy;
  "support": SettingsAppConsentSupport;
}

export interface SettingsAppConsentSlot {
  "slot": string;
  "type": string;
  "title": SettingsAppLocalizedText;
  /** Поля контекста запуска, которые слот просит, по алфавиту */
  "context": Array<string>;
}

export interface SettingsAppConsentSubscription {
  "topic": string;
  /** Приложение сузило поток отбором */
  "filtered": boolean;
}

export interface SettingsAppConsentSupport {
  "email": string;
  "url": string;
  "incident_email": string;
  "response_hours": number;
}

export interface SettingsAppDeclaredSlot {
  /** Ключ слота из контракта платформы; объявление вне контракта в ответ не попадает */
  "slot": string;
  "type": "action" | "iframe" | "panel" | "settings" | "declarative";
  /** Адрес рамки. Только у слота, показывающегося отдельным источником */
  "url"?: string;
  /** Источник адреса — схема, хост и порт. Считает сервер: сравнение источников обязано быть одним и тем же на выдаче запуска и в оболочке */
  "origin"?: string;
  "min_width"?: number;
  "min_height"?: number;
  /** Поля контекста запуска, которые слот просит. Человека словарь называет псевдонимом */
  "context": Array<string>;
  "title": SettingsAppLocalizedText;
  "theme_aware": boolean;
  /** Что расширение вправе прислать оболочке; уже пересечено с закрытым списком платформы */
  "bridge_sends": Array<string>;
  /** Что оболочка вправе прислать расширению */
  "bridge_receives": Array<string>;
}

export interface SettingsAppExposureReport {
  "installation_id": string;
  "app"?: string;
  "version"?: string;
  /** Верхняя граница ущерба: на что кабинет соглашался и чем расширение имело право пользоваться */
  "scopes": Array<string>;
  /** Сколько раз расширение забирало секреты кабинета. Это НЕ граница, а факт: каждая выдача записана до того, как значение ушло */
  "secret_leases": number;
  "secret_lease_keys": Array<string>;
  "last_secret_lease"?: string;
  /** Сколько раз человек кабинета открывал панель расширения */
  "slot_launches": number;
  "token_issues": number;
  /** МОМЕНТ последнего предъявления токена. Что именно расширение читало, у нас не записано нигде — см. unknown */
  "last_token_use"?: string;
  /** Последняя удачная доставка. Число из СВОДКИ здоровья, а не из журнала: журнал наружу не открыт, потому что в его причине отказа живёт эхо недоверенного приёмника */
  "last_delivered_at"?: string;
  /** Сколько фактов кабинета не доехало и ждёт повтора */
  "dead_letters": number;
  "delivery_window_started_at"?: string;
  /** Окно отдаётся целиком, а не готовым процентом: «0 из 0» читается как «за окно не отправляли», а не как «отказов нет» */
  "delivery_window_attempts"?: number;
  "delivery_window_failures"?: number;
  /** Куда уезжали события. Адрес называет издатель, данных кабинета в нём нет по определению */
  "delivery_endpoint_url"?: string;
  /** Чего отчёт назвать не может. api_calls — какие операции расширение вызывало своим токеном: есть момент предъявления, нет предмета. event_bodies — что лежало в телах уехавших событий: тела в журнале доставки нет намеренно. delivery_summary — сводку доставки не спросили или она не ответила; это пропуск, а не нули, потому что «мёртвых писем ноль» читается как «всё доезжало». Первые две позиции стоят в списке ВСЕГДА: непроговорённый пропуск читается как хорошая новость. */
  "unknown": Array<"api_calls" | "event_bodies" | "delivery_summary">;
}

export interface SettingsAppIncident {
  "installation": PlatformAppInstallation;
  "app": PlatformApp;
  "block": PlatformAppManifestBlock;
  "exposure": SettingsAppExposureReport;
}

export interface SettingsAppIncidentList {
  "incidents": Array<SettingsAppIncident>;
}

export interface SettingsAppInstallInput {
  /** Конкретная версия; последняя открытая не подразумевается */
  "version": string;
  /** Согласие целиком: одобрить можно только запрошенное версией, и все её обязательные права обязаны войти сюда */
  "approved": Array<string>;
  /** Уезжает в журнал установки */
  "reason"?: string;
}

export interface SettingsAppInstallation {
  "installation": PlatformAppInstallation;
  "app": PlatformApp;
  "publisher": SettingsAppPublisherCard;
  "version": SettingsAppVersion;
  /** Издатель, приложение и версия не выключены платформой */
  "live": boolean;
  /** Версии, на которые кабинет вправе перейти сам, свежие первыми */
  "updates": Array<SettingsAppVersion>;
  /** Места на экране, которые занимает текущая версия установки: адрес рамки, источник, размер и мост сообщений. Оболочка строит рамку до запроса токена запуска, поэтому объявление приезжает вместе со списком установок */
  "slots"?: Array<SettingsAppDeclaredSlot>;
  "health": PlatformAppDeliveryHealth;
}

export interface SettingsAppInstallationPage {
  "installations": Array<SettingsAppInstallation>;
}

/** Текст на двух языках, как он объявлен в манифесте; пустая половина означает, что издатель её не заполнил */
export interface SettingsAppLocalizedText {
  "ru": string;
  "en": string;
}

/** Издатель глазами кабинета: без основания проверки, адреса на аварию и причин выключения */
export interface SettingsAppPublisherCard {
  "slug": string;
  "legal_name": string;
  "country": string;
  "homepage": string;
  "contact_email": string;
  /** Платформа подтвердила, что имя принадлежит названному юрлицу */
  "verified": boolean;
  /** Издатель не выключен платформой */
  "live": boolean;
}

/** Версия глазами кабинета: без манифеста целиком; лист согласия по версии отдаёт экран согласия */
export interface SettingsAppVersion {
  "id": UUID;
  "version": string;
  "status": PlatformAppVersionStatus;
  /** Канал, объявленный манифестом; пусто, если манифест канал не назвал */
  "channel": "sandbox" | "private" | "public" | "";
  "released_at"?: string;
  "name": SettingsAppLocalizedText;
  "description": SettingsAppLocalizedText;
  "permissions": PlatformAppManifestPermissions;
}

export interface SettingsCompany {
  "id": UUID;
  "name": string;
  "legal_name": string;
  /** Пустой только у юрлица внутреннего учёта */
  "inn": string;
  "kpp": string;
  "is_active": boolean;
  /** Псевдо-юрлицо «Внутренний учёт» — контур неофициальных касс, одно на кабинет */
  "is_internal": boolean;
  /** Метод учёта cash или accrual; на этой поверхности всегда приходит пустым, потому что накладка справочника его не переносит */
  "accounting_method": string;
  /** Дата перехода на accrual; на этой поверхности не приходит никогда */
  "accrual_from"?: string;
}

export interface SettingsCompanyAccountingMethodInput {
  /** Значение приводится к нижнему регистру */
  "method": "cash" | "accrual";
  /** Дата перехода на начисление; обязательна при accrual и не используется при cash */
  "accrual_from"?: string;
}

export interface SettingsCompanyInput {
  /** Пробельное название отклоняется */
  "name": string;
  "legal_name"?: string;
  /** Проверяется контрольной цифрой; пустой ИНН отклоняется */
  "inn": string;
  "kpp"?: string;
}

export interface SettingsCompanyPage {
  /** Число отданных строк, страниц у справочника нет */
  "count": number;
  "results": Array<SettingsCompany>;
}

export interface SettingsFieldDefinition {
  "id": UUID;
  "entity_type": string;
  "key": string;
  "label": string;
  "type": string;
  "required": boolean;
  "dictionary": UUID | null;
  "order": number;
  "is_active": boolean;
  "help": string;
  /** Отметка времени как её печатает Postgres, а не RFC 3339 */
  "created_at": string;
  /** Отметка времени как её печатает Postgres, а не RFC 3339 */
  "updated_at": string;
}

export interface SettingsFieldDefinitionInput {
  "entity_type": string;
  "key": string;
  "label": string;
  /** Пустое значение подставляется как text */
  "type"?: "text" | "number" | "date" | "bool" | "select" | "money";
  "required"?: boolean;
  /** Справочник значений для типа select */
  "dictionary"?: UUID | null;
  "order"?: number;
  /** Читается только при изменении; на заведении определение всегда действующее */
  "is_active"?: boolean;
  "help"?: string;
}

export interface SettingsFieldDefinitionPage {
  /** Число отданных строк, а не всего в базе; выборка обрезана 200 строками */
  "count": number;
  "results": Array<SettingsFieldDefinition>;
}

export interface SettingsFieldSchema {
  "fields": Array<SettingsFieldDefinition>;
}

export interface SettingsMember {
  /** Идентификатор членства в кабинете, а не человека */
  "id": UUID;
  /** Идентификатор человека в общем реестре платформы */
  "user_id": number;
  "username": string;
  "full_name": string;
  "birth_date": string | null;
  "avatar_url": string;
  "role": UUID | null;
  "role_name": string | null;
  "company_scope": "all" | "selected";
  /** Заполнен при company_scope selected */
  "companies": Array<UUID>;
  "is_active": boolean;
}

export interface SettingsMemberCreateInput {
  "username": string;
  /** Уходит во внешний сервис входа и в ответе не повторяется */
  "password": string;
  /** Полное имя человека; в ответе это поле называется full_name */
  "first_name"?: string;
  /** Строго ГГГГ-ММ-ДД; пустая строка означает «не указана» */
  "birth_date"?: string;
  "avatar_url"?: string;
  "role"?: UUID | null;
  /** Умолчание — all */
  "company_scope"?: "all" | "selected";
  "companies"?: Array<UUID>;
}

export interface SettingsMemberPage {
  /** Число строк в results, а не общее число участников кабинета */
  "count": number;
  "results": Array<SettingsMember>;
}

export interface SettingsMemberPatch {
  /** Меняется и во внешнем сервисе входа */
  "username"?: string;
  "full_name"?: string;
  /** Строго ГГГГ-ММ-ДД; пустая строка снимает дату */
  "birth_date"?: string;
  "avatar_url"?: string;
  /** null или пустая строка снимают роль */
  "role"?: UUID | null;
  /** Пустая строка игнорируется */
  "company_scope"?: "all" | "selected";
  "companies"?: Array<UUID>;
  "is_active"?: boolean;
}

export interface SettingsRole {
  "id": UUID;
  "name": string;
  /** У административной роли permissions всегда равны ["*:*"] */
  "is_admin": boolean;
  "is_active": boolean;
  /** Право записывается как «модуль:действие», например settings:read */
  "permissions": Array<string>;
  /** Ключ — ресурс модуля; пустая карта означает видимость только своих записей */
  "record_rules": { [key: string]: "own" | "all" };
}

export interface SettingsRoleActivationInput {
  /** true включает роль, false отключает; это переключатель, а не одностороннее включение */
  "is_active": boolean;
}

export interface SettingsRoleActivationResult {
  "id": UUID;
  "is_active": boolean;
}

export interface SettingsRoleInput {
  /** Пробелы по краям срезаются; пустое имя отклоняется */
  "name": string;
  /** Через этот маршрут остаётся false: административную роль создать или назначить нельзя */
  "is_admin"?: boolean;
  /** Отсутствие поля равно пустому списку прав */
  "permissions"?: Array<string>;
  /** Отсутствие поля равно пустой карте */
  "record_rules"?: { [key: string]: "own" | "all" };
}

export interface SettingsRolePage {
  /** Число строк в results, а не общее число ролей кабинета */
  "count": number;
  "results": Array<SettingsRole>;
}

export interface SettingsRoleTransferInput {
  /** Действующая роль-получатель; обязательна, нулевой UUID отклоняется */
  "target_role_id": UUID;
}

export interface SettingsRoleTransferResult {
  /** Сколько участников переставлено на целевую роль */
  "count": number;
  "target_role_id": UUID;
}

export interface SettingsVatRates {
  /** Фиксированный профиль 22, 20, 10 и 0 процентов */
  "rates": Array<number>;
}

export interface SprintAgingTask {
  "id": UUID;
  "code": string;
  "title": string;
  "seconds": number;
}

export interface SprintMetrics {
  "cycle": UUID;
  "window_from": string;
  "window_to": string;
  "throughput": number;
  "throughput_history": Array<SprintThroughputPoint>;
  "lead_time": DurationMetric;
  "review_time": DurationMetric;
  "reviewed_tasks": number;
  "returned_to_work": number;
  "rework_percent": number;
  "aging_wip": Array<SprintAgingTask>;
  "sizing": SprintSizing;
  "outcomes": SprintOutcomeMetrics;
}

export interface SprintOutcomeMetrics {
  "available": boolean;
}

export interface SprintSizing {
  "up_to_half_tact": number;
  "up_to_tact": number;
  "over_tact": number;
  "unestimated": number;
}

export interface SprintThroughputPoint {
  "cycle": UUID;
  "name": string;
  "completed": number;
  "starts_at": string | null;
  "ends_at": string | null;
}

export interface Status {
  "id": UUID;
  "section": UUID | null;
  "name": string;
  "category": StatusCategory;
  "order": number;
  "color": string;
  "is_default": boolean;
  "is_final": boolean;
}

export type StatusCategory = "backlog" | "todo" | "in_progress" | "review" | "done" | "cancelled";

export interface StatusCreate {
  "section"?: UUID;
  "name": string;
  "category"?: StatusCategory;
  "color"?: string;
  "order"?: number;
  "is_default"?: boolean;
  "is_final"?: boolean;
}

export interface StatusDelete {
  "move_tasks_to"?: UUID;
}

export interface StatusDuration {
  "status": UUID;
  "status_name": string;
  "category": string;
  "seconds": number;
}

export type StatusHealth = "onTrack" | "atRisk" | "offTrack";

export interface StatusMetrics {
  "transitions": Array<StatusTransition>;
  "durations": Array<StatusDuration>;
}

export interface StatusPage {
  "count": number;
  "results": Array<Status>;
}

export interface StatusReorder {
  "items": Array<StatusReorderItem>;
}

export interface StatusReorderItem {
  "id": UUID;
  "order": number;
}

export interface StatusTransition {
  "id": UUID;
  "task": UUID;
  "from_status": UUID | null;
  "from_status_name": string | null;
  "to_status": UUID;
  "to_status_name": string | null;
  "actor": number | null;
  "actor_name": string | null;
  "created_at": string;
}

export interface StatusUpdate {
  "id": UUID;
  "owner_type": CycleOwnerType;
  "owner_id": UUID;
  "owner_key": string;
  "owner_name": string;
  "author_id": number | null;
  "author_name": string;
  "health": StatusHealth;
  "body": string;
  "is_archived": boolean;
  "created_at": string;
  "updated_at": string;
}

/** Владелец задаётся `section`, `project` или парой `owner_type`/`owner_id`. */
export interface StatusUpdateCreate {
  "owner_type"?: CycleOwnerType;
  "owner_id"?: string;
  "section"?: string;
  "project"?: string;
  "health": StatusHealth;
  "body": string;
  "author"?: number;
}

export interface StatusUpdatePage {
  "count": number;
  "results": Array<StatusUpdate>;
}

export interface StatusUpdatePatch {
  "owner_type"?: CycleOwnerType;
  "owner_id"?: string;
  "section"?: string;
  "project"?: string;
  "health"?: StatusHealth;
  "body"?: string;
  "is_archived"?: boolean;
}

export interface StockBatch {
  "id": UUID;
  "company_id": UUID;
  "company_name": string;
  "product_id": UUID;
  "product_sku": string;
  "product_name": string;
  "source_document_id": UUID;
  "source_document_type_key": string;
  "source_line_id": UUID;
  "received_at": string;
  "supplier_batch_code": string;
  "produced_at": string | null;
  "expires_at": string | null;
  "is_active": boolean;
  /** Считается из движений регистра stock */
  "quantity": string;
  /** Считается из движений регистра stock */
  "amount": string;
}

export interface StockBatchPage {
  "count": number;
  "limit": number;
  "offset": number;
  "results": Array<StockBatch>;
}

export interface StockCompanyPolicy {
  "id": UUID;
  "company_id": UUID;
  "company_name": string;
  "costing_method": "fifo" | "moving_average";
  "default_warehouse_id": UUID | null;
  /** Складской учёт закрыт по эту дату включительно; null — период не закрыт */
  "closed_through": string | null;
  "updated_at": string;
}

export interface StockCompanyPolicyPage {
  "count": number;
  "results": Array<StockCompanyPolicy>;
}

export interface StockCompanyPolicyPatch {
  /** Не меняется, пока у юрлица есть товарный остаток */
  "costing_method"?: "fifo" | "moving_average";
  /** Склад должен быть доступен этому юрлицу */
  "default_warehouse_id"?: UUID | null;
  /** Строка YYYY-MM-DD; null снимает закрытие периода */
  "closed_through"?: string | null;
}

export interface StockCompanyRef {
  "id": UUID;
  "name": string;
}

export interface StockCompanyRefPage {
  "count": number;
  "results": Array<StockCompanyRef>;
}

export interface StockDocumentCreate {
  "type_key": StockDocumentCreateTypeKey;
  /** Пусто или отсутствует означает рабочую дату кабинета */
  "date"?: string;
  "basis_id"?: UUID | null;
  "entity_refs": StockDocumentRefs;
  /** Для инвентаризации — фильтр снимка, для остальных видов — содержимое документа */
  "payload": StockDocumentPayload | StockInventoryCreatePayload;
  "comment"?: string;
}

export type StockDocumentCreateTypeKey = "stock_receipt" | "stock_shipment" | "stock_transfer" | "stock_writeoff" | "stock_capitalization" | "stock_supplier_return" | "stock_customer_return" | "stock_purchase_request" | "stock_supplier_order" | "stock_inventory" | "stock_reservation" | "stock_landed_cost";

export interface StockDocumentFulfillment {
  "document_id": UUID;
  "type_key": StockDocumentTypeKey;
  "type_name": string;
  "number": string;
  "status": CoreDocumentStatus;
  "lines": Array<StockDocumentFulfillmentLine>;
}

export interface StockDocumentFulfillmentLine {
  "line_id": UUID;
  "product_id": UUID;
  /** Decimal string из строки документа */
  "ordered_qty": string;
  /** Decimal string из регистра потребности или ожидаемого поступления */
  "remaining_qty": string;
}

export interface StockDocumentFulfillmentPage {
  "count": number;
  "results": Array<StockDocumentFulfillment>;
}

/** Партия, на которую распределяются накладные расходы. */
export interface StockDocumentLandedCostTarget {
  "batch_id": UUID;
  "product_id": UUID;
  /** Decimal string; обязательна при ручном распределении */
  "share"?: string;
}

export interface StockDocumentLine {
  "line_id": UUID;
  "product_id": UUID;
  /** Положительная decimal string в единице строки */
  "qty": string;
  /** Физическая единица справочника */
  "unit_id"?: UUID | null;
  /** Товарная единица представления */
  "product_uom_id"?: UUID | null;
  /** Количество в базовой единице номенклатуры; присланное значение обязано совпасть с серверным пересчётом */
  "base_qty"?: string;
  /** Decimal string */
  "price"?: string;
  /** Decimal string */
  "amount"?: string;
  "basis_line_id"?: UUID | null;
  /** Построчное происхождение, когда один заказ поставщику сводит несколько заявок */
  "basis_document_id"?: UUID | null;
  "batch_code"?: string;
  "produced_at"?: string;
  "expires_at"?: string;
  "handling_units"?: Array<StockDocumentLineHandlingUnit>;
  "handling_unit_allocations"?: Array<StockDocumentLineHandlingAllocation>;
}

/** Списание количества с конкретной физической единицы в расходной строке. */
export interface StockDocumentLineHandlingAllocation {
  "handling_unit_id": UUID;
  /** Положительная decimal string */
  "qty": string;
}

/** Физическая единица (экземпляр, паллета, бухта), создаваемая приходной строкой. */
export interface StockDocumentLineHandlingUnit {
  "id"?: UUID;
  /** Пустой код сервер выдаёт сам из идентификатора */
  "code"?: string;
  /** Положительная decimal string в базовой единице; пусто — равная доля количества строки */
  "initial_base_qty"?: string;
  "custom"?: { [key: string]: unknown };
}

export interface StockDocumentPage {
  "count": number;
  "limit": number;
  "offset": number;
  "results": Array<CoreDocument>;
}

export interface StockDocumentPatch {
  "date"?: string;
  "basis_id"?: UUID | null;
  "entity_refs"?: StockDocumentRefs;
  "payload"?: StockDocumentPayload;
  "comment"?: string;
}

/** Содержимое складского документа. Разбор строгий — незнакомое поле отклоняется. У документа-факта, заявки, заказа и резерва `items` обязателен и не длиннее 1000 строк. */
export interface StockDocumentPayload {
  "version": number;
  "reason"?: string;
  "desired_at"?: string;
  "delivery_at"?: string;
  /** Срок резерва; не раньше даты документа */
  "expires_at"?: string;
  "items"?: Array<StockDocumentLine>;
  /** Decimal string; сумма накладных расходов */
  "amount"?: string;
  "allocation_method"?: "quantity" | "cost" | "manual";
  "targets"?: Array<StockDocumentLandedCostTarget>;
  /** Разложение проведения по строкам и партиям, которое пишет сам движок */
  "posting"?: { [key: string]: unknown };
}

/** Ссылки шапки складского документа. Набор допустимых полей зависит от вида — перемещению нужны склад-отправитель и склад-получатель, инвентаризации только юрлицо и склад. */
export interface StockDocumentRefs {
  "company": UUID;
  "warehouse"?: UUID;
  "warehouse_from"?: UUID;
  "warehouse_to"?: UUID;
  "contact"?: UUID;
}

export type StockDocumentTypeKey = "stock_receipt" | "stock_shipment" | "stock_transfer" | "stock_writeoff" | "stock_capitalization" | "stock_supplier_return" | "stock_customer_return" | "stock_purchase_request" | "stock_supplier_order" | "stock_inventory" | "stock_reservation" | "stock_landed_cost" | "stock_reservation_release";

export interface StockExport {
  "id": UUID;
  "kind": StockImportKind;
  "format": CoreProductTransferFormat;
  "target_document_id"?: UUID;
  "file_name": string;
  "size": number;
  "row_count": number;
  "created_by"?: number;
  "created_at": string;
}

export interface StockExportRequest {
  "kind": StockImportKind;
  "format"?: CoreProductTransferFormat;
  /** Обязателен для всех видов, кроме reorder_rules */
  "target_document_id"?: UUID;
}

export interface StockHandlingUnit {
  "id": UUID;
  "batch_id": UUID;
  "company_id": UUID;
  "company_name": string;
  "product_id": UUID;
  "product_sku": string;
  "product_name": string;
  "base_unit": string;
  "source_document_id": UUID;
  "source_document_number": string;
  "source_document_status": CoreDocumentStatus;
  "source_line_id": UUID;
  "code": string;
  "initial_base_qty": string;
  /** Считается из движений регистра stock */
  "remaining_base_qty": string;
  /** Считается из движений регистра stock_reserved */
  "reserved_base_qty": string;
  "amount": string;
  "status": StockHandlingUnitStatus;
  "state": StockHandlingUnitState;
  /** Отдаётся только когда положительный остаток лежит в одном месте хранения */
  "warehouse_id"?: UUID | null;
  "warehouse_name": string;
  "custom": { [key: string]: unknown };
  "received_at": string;
  "created_at": string;
  "updated_at": string;
}

export interface StockHandlingUnitCard {
  "handling_unit": StockHandlingUnit;
  /** Движения единицы по регистру stock */
  "entries": Array<CoreRegisterEntry>;
}

export interface StockHandlingUnitPage {
  "count": number;
  "limit": number;
  "offset": number;
  "results": Array<StockHandlingUnit>;
}

export type StockHandlingUnitState = "pending" | "sealed" | "opened" | "empty" | "cancelled" | "blocked" | "retired" | "location_conflict";

export type StockHandlingUnitStatus = "active" | "blocked" | "retired";

export interface StockHandlingUnitStatusPatch {
  "status": StockHandlingUnitStatus;
}

export interface StockHandlingUnitSuggestion {
  "handling_unit_id": UUID;
  "code": string;
  "batch_id": UUID;
  "qty": string;
  "available_before": string;
  "available_after": string;
  "state_before": StockHandlingUnitState;
}

export interface StockHandlingUnitSuggestionResult {
  "requested_qty": string;
  "allocated_qty": string;
  /** false означает, что доступных единиц не хватило на всё количество */
  "complete": boolean;
  "allocations": Array<StockHandlingUnitSuggestion>;
}

export interface StockImportApplyRequest {
  "preview_token": string;
  "confirm_warnings"?: boolean;
}

export interface StockImportDiff {
  "row": number;
  /** initial_stock всегда create, остальные виды — update */
  "action": "create" | "update";
  "target_id"?: UUID;
  /** Идентификатор номенклатуры строки, а при его отсутствии — документа */
  "label"?: string;
  "changes"?: { [key: string]: string };
}

export interface StockImportInspectRequest {
  /** Пустое значение берёт первый лист книги */
  "sheet_name"?: string;
  "header_row": number;
}

export type StockImportKind = "initial_stock" | "inventory_count" | "document_items" | "reorder_rules";

export interface StockImportRun {
  "id": UUID;
  "kind": StockImportKind;
  "format": CoreProductTransferFormat;
  "status": StockImportStatus;
  "mode": CoreProductImportMode;
  "target_document_id"?: UUID;
  "source_name": string;
  "source_sha256": string;
  "source_size": number;
  "mapping": CoreProductImportMappingState;
  "schema_version": "stock-v1";
  "revision": number;
  "preview_token"?: string;
  "diff"?: Array<StockImportDiff>;
  "issues"?: Array<CoreProductImportIssue>;
  "created_count": number;
  "updated_count": number;
  "unchanged_count": number;
  "warning_count": number;
  "error_count": number;
  "created_by"?: number;
  "created_at": string;
  "previewed_at"?: string;
  "applied_at"?: string;
  "source_columns"?: Array<string>;
  "source_sheets"?: Array<CoreProductImportSheet>;
  "target_fields"?: Array<CoreProductImportField>;
}

export type StockImportStatus = "uploaded" | "mapped" | "previewed" | "applied";

/** Документ, тронувший товар снимка после момента снимка. */
export interface StockInventoryChange {
  "document_id": UUID;
  "number": string;
  "type_key": string;
  "status": CoreDocumentStatus;
  "occurred_at": string;
}

export interface StockInventoryChangePage {
  "count": number;
  "results": Array<StockInventoryChange>;
}

export interface StockInventoryCount {
  "product_id": UUID;
  /** Неотрицательная decimal string */
  "actual_qty": string;
  /** Неотрицательная decimal string; обязательна для излишка перед созданием актов */
  "surplus_price"?: string;
}

export interface StockInventoryCountSheet {
  "id": UUID;
  "number": string;
  "date": string;
  "workflow": StockInventoryWorkflow;
  "company_id": UUID;
  "warehouse_id": UUID;
  "count": number;
  "items": Array<StockInventoryCountSheetItem>;
}

export interface StockInventoryCountSheetItem {
  "line_id": UUID;
  "product_id": UUID;
  "product_sku": string;
  "product_name": string;
  "unit": string;
  /** Decimal string */
  "actual_qty"?: string;
  /** Decimal string */
  "surplus_price"?: string;
}

export interface StockInventoryCountsInput {
  "counts": Array<StockInventoryCount>;
  /** updated_at документа, известный клиенту; несовпадение отклоняет запись */
  "expected_updated_at"?: string;
}

/** Содержимое инвентаризации при создании. Снимок остатков сервер снимает сам, поэтому строки в теле не передаются. */
export interface StockInventoryCreatePayload {
  "version": number;
  "filter"?: StockInventoryFilter;
}

export interface StockInventoryDeriveResult {
  "inventory": CoreDocument;
  /** Черновики списания и оприходования; пустой список означает, что расхождений нет */
  "documents": Array<CoreDocument>;
}

/** Отбор товаров в снимок. Пустой фильтр берёт весь склад. */
export interface StockInventoryFilter {
  "category_id"?: UUID | null;
  "product_ids"?: Array<UUID>;
}

export interface StockInventoryFinishInput {
  /** updated_at документа, известный клиенту; несовпадение отклоняет запись */
  "expected_updated_at"?: string;
}

export interface StockInventoryRefreshInput {
  /** Переносить ли уже записанный факт на совпавшие товары нового снимка */
  "keep_counts"?: boolean;
  /** updated_at документа, известный клиенту; несовпадение отклоняет запись */
  "expected_updated_at"?: string;
}

export type StockInventoryWorkflow = "counting" | "counted" | "acts_created" | "closed";

export interface StockProductUOM {
  "id": UUID;
  "product_id": UUID;
  "code": string;
  "name": string;
  "input_unit_id": UUID;
  "unit_code": string;
  "unit_label": string;
  "usage": StockProductUOMUsage;
  /** Положительный decimal — сколько базовых единиц товара содержит одна единица ввода */
  "factor_to_base": string;
  "precision": number;
  "creates_handling_units": boolean;
  "is_default_receipt": boolean;
  "is_active": boolean;
  "updated_at": string;
}

export interface StockProductUOMInput {
  /** Без идентификатора заводится новая товарная единица */
  "id"?: UUID | null;
  "product_id": UUID;
  "code": string;
  "name": string;
  "input_unit_id": UUID;
  "usage"?: StockProductUOMUsage;
  "factor_to_base": string;
  /** Требует единицы измерения с целой точностью */
  "creates_handling_units"?: boolean;
  "is_default_receipt"?: boolean;
  /** По умолчанию единица активна */
  "is_active"?: boolean | null;
}

export interface StockProductUOMPage {
  "count": number;
  "results": Array<StockProductUOM>;
}

export type StockProductUOMUsage = "purchase" | "receipt" | "packaging";

export interface StockPurchaseOrderCreate {
  "company_id": UUID;
  "warehouse_id": UUID;
  /** Контрагент с ролью поставщика */
  "supplier_id": UUID;
  /** Пустая или пропущенная означает текущую бизнес-дату кабинета */
  "date"?: string;
  /** Ожидаемая дата поставки */
  "delivery_at"?: string | null;
  "comment"?: string;
  "items": Array<StockPurchaseOrderLineInput>;
}

export interface StockPurchaseOrderLineInput {
  "product_id": UUID;
  /** Decimal string заказываемого количества */
  "qty": string;
  /** Decimal string цены поставщика; пропуск записывается нулём */
  "price"?: string;
  /** Строка заявки на закупку; указывается только вместе с request_id */
  "basis_line_id"?: UUID | null;
  /** Проведённая заявка на закупку того же юрлица и склада; указывается только вместе с basis_line_id */
  "request_id"?: UUID | null;
}

export interface StockReorderRule {
  "id": UUID;
  "company_id": UUID;
  "company_name": string;
  "product_id": UUID;
  "product_sku": string;
  "product_name": string;
  /** null означает правило юрлица на все склады */
  "warehouse_id": UUID | null;
  "warehouse_name": string;
  /** Decimal string неснижаемого остатка */
  "min_qty": string;
  /** Decimal string целевого остатка; null — потолок не задан */
  "max_qty": string | null;
  /** Decimal string кратности заказа; null — кратность не задана */
  "order_multiple": string | null;
  "lead_time_days": number;
  "preferred_supplier_id": UUID | null;
  "preferred_supplier_name": string;
  "is_active": boolean;
  "updated_at": string;
}

export interface StockReorderRuleInput {
  "company_id": UUID;
  /** Складская номенклатура — отдельный товар или вариант; семейство вариантов и услуга не принимаются */
  "product_id": UUID;
  /** Пропуск или null заводит правило юрлица на все склады */
  "warehouse_id"?: UUID | null;
  /** Decimal string неотрицательного неснижаемого остатка */
  "min_qty": string;
  /** Decimal string; не меньше min_qty */
  "max_qty"?: string | null;
  /** Decimal string строго больше нуля */
  "order_multiple"?: string | null;
  "lead_time_days"?: number;
  "preferred_supplier_id"?: UUID | null;
  "is_active"?: boolean;
}

export interface StockReorderRulePage {
  /** Общее число подходящих правил, а не размер страницы */
  "count": number;
  "limit": number;
  "offset": number;
  "results": Array<StockReorderRule>;
}

export interface StockReorderRulePatch {
  "company_id"?: UUID;
  "product_id"?: UUID;
  "warehouse_id"?: UUID | null;
  /** Decimal string */
  "min_qty"?: string;
  "max_qty"?: string | null;
  "order_multiple"?: string | null;
  "lead_time_days"?: number;
  "preferred_supplier_id"?: UUID | null;
  "is_active"?: boolean;
}

export interface StockReportDrilldown {
  "product_id": UUID;
  /** Число движений регистра, а не строк отчёта */
  "count": number;
  "limit": number;
  "offset": number;
  "rows": Array<StockReportRow>;
  "entries": Array<StockReportDrilldownEntry>;
}

export interface StockReportDrilldownEntry {
  "id": UUID;
  "registrar_id": UUID;
  "registrar_number": string;
  "registrar_type_key": string;
  "registrar_type_name": string;
  "registrar_status": string;
  "date": string;
  "sign": number;
  "dims": { [key: string]: unknown };
  "values": { [key: string]: unknown };
  "unit": string;
}

export interface StockReportOverduePage {
  "count": number;
  "results": Array<StockReportOverdueReservation>;
}

export interface StockReportOverdueReservation {
  "document_id": UUID;
  "number": string;
  "date": string;
  "expires_at": string;
  "company_id": UUID;
  "company_name": string;
  "warehouse_id": UUID;
  "warehouse_name": string;
  /** Decimal string */
  "remaining_qty": string;
  "product_count": number;
}

export interface StockReportPage {
  "count": number;
  "limit": number;
  "offset": number;
  "results": Array<StockReportRow>;
  "formula": "available = on_hand - reserved; forecast = available + expected";
}

export interface StockReportPurchasingPage {
  "count": number;
  "results": Array<StockReportPurchasingRow>;
  "formula": "projected = on_hand - reserved + expected; suggested = max(demand, rule_shortage)";
}

export interface StockReportPurchasingRow {
  "company_id": UUID;
  "company_name": string;
  "warehouse_id": UUID | null;
  "warehouse_code": string;
  "warehouse_name": string;
  "product_id": UUID;
  "product_sku": string;
  "product_name": string;
  "unit": string;
  /** Decimal string */
  "on_hand": string;
  /** Decimal string */
  "reserved": string;
  /** Decimal string */
  "available": string;
  /** Decimal string */
  "expected": string;
  /** Decimal string */
  "demand": string;
  /** Decimal string */
  "projected": string;
  /** Decimal string */
  "min_qty": string;
  /** Decimal string */
  "max_qty": string | null;
  /** Decimal string */
  "order_multiple": string | null;
  "lead_time_days": number;
  "preferred_supplier_id": UUID | null;
  "preferred_supplier_name": string;
  /** Decimal string */
  "suggested_qty": string;
  "rule_id": UUID | null;
  /** Какое правило пополнения подобралось к строке */
  "rule_source": "none" | "fallback" | "warehouse";
  "sources": Array<StockReportPurchasingSource> | null;
}

export interface StockReportPurchasingSource {
  "request_id": UUID;
  "request_number": string;
  "request_type": string;
  "request_type_name": string;
  "basis_line_id": UUID;
  /** Decimal string */
  "remaining_qty": string;
}

export interface StockReportReservationLine {
  "basis_line_id": UUID;
  "product_id": UUID;
  /** Decimal string */
  "original_qty": string;
  /** Decimal string */
  "shipped_qty": string;
  /** Decimal string */
  "released_qty": string;
  /** Decimal string */
  "remaining_qty": string;
}

export interface StockReportReservationPage {
  "count": number;
  "results": Array<StockReportReservationSummary>;
}

export interface StockReportReservationSummary {
  "document_id": UUID;
  /** Decimal string */
  "original_qty": string;
  /** Decimal string */
  "shipped_qty": string;
  /** Decimal string */
  "released_qty": string;
  /** Decimal string */
  "remaining_qty": string;
  "state": "active" | "partially_shipped" | "fulfilled" | "released";
  "is_overdue": boolean;
  "lines": Array<StockReportReservationLine>;
}

export interface StockReportRow {
  "company_id": UUID;
  "company_name": string;
  "warehouse_id": UUID;
  "warehouse_code": string;
  "warehouse_name": string;
  "product_id": UUID;
  "product_sku": string;
  "product_name": string;
  "unit": string;
  /** Decimal string */
  "on_hand": string;
  /** Decimal string */
  "reserved": string;
  /** Decimal string */
  "available": string;
  /** Decimal string */
  "expected": string;
  /** Decimal string */
  "forecast": string;
  /** Decimal string */
  "minimum": string;
  /** Decimal string */
  "suggested": string;
  /** Decimal string */
  "amount": string;
  /** Decimal string */
  "unit_cost": string;
  "entry_count": number;
}

export interface StockScanResult {
  "identifier_id": UUID;
  "barcode": string;
  "product_id": UUID;
  "product_sku": string;
  "product_name": string;
  "base_unit": string;
  "product_uom_id": UUID | null;
  "product_uom_name": string;
  "input_unit_id": UUID | null;
  "input_unit_label": string;
  "factor_to_base": string;
}

export interface StockSettings {
  /** Запрещать отгрузку сверх свободного остатка */
  "block_shipment_over_free": boolean;
  /** Запрещать резерв сверх доступного остатка */
  "block_reservation_over_available": boolean;
  /** Снимать просроченные резервы автоматически */
  "auto_cancel_expired_reservations": boolean;
  "default_reservation_days": number;
  "updated_at": string;
}

export interface StockSettingsPatch {
  "block_shipment_over_free"?: boolean;
  "block_reservation_over_available"?: boolean;
  "auto_cancel_expired_reservations"?: boolean;
  "default_reservation_days"?: number;
}

export interface StockSupplier {
  "id": UUID;
  "name": string;
  "kind": CoreContactKind;
  "is_active": boolean;
}

export interface StockSupplierPage {
  "count": number;
  "results": Array<StockSupplier>;
}

export interface StockValuationPreviewRequest {
  "document_id": UUID;
}

export interface StockValuationRebuildRequest {
  "document_id": UUID;
  /** Уникален в пределах кабинета; повтор с тем же ключом возвращает уже заведённый прогон. Пустой ключ заменяется идентификатором документа */
  "idempotency_key"?: string;
}

export interface StockValuationResult {
  "document_id": UUID;
  /** preview — расчёт откачен, completed — пересчёт записан */
  "status": "preview" | "completed";
  /** Decimal string суммы накладных расходов */
  "total_amount": string;
  "affected_documents": number;
  "steps": Array<StockValuationStep>;
}

export interface StockValuationRun {
  "id": UUID;
  "document_id": UUID;
  "idempotency_key": string;
  "status": "pending" | "running" | "completed" | "failed";
  /** Сколько документов цепочки уже перепроведено */
  "progress": number;
  /** Сколько документов цепочки предстоит перепровести */
  "total": number;
  "result"?: StockValuationResult;
  /** Заполняется при status=failed */
  "error"?: string;
  "created_at": string;
  "started_at"?: string;
  "finished_at"?: string;
}

export interface StockValuationStep {
  "document_id": UUID;
  "type_key": string;
  "number": string;
  "date": string;
  /** Число движений регистров, записанных этим документом */
  "movements": number;
}

export interface StockWarehouse {
  "id": UUID;
  "code": string;
  "name": string;
  "parent_id": UUID | null;
  "address": { [key: string]: unknown };
  "responsible_employee_id": UUID | null;
  "is_active": boolean;
  "sort_order": number;
  /** Пустой список означает доступность склада всем активным юрлицам кабинета */
  "company_ids": Array<UUID>;
  "created_at": string;
  "updated_at": string;
}

export interface StockWarehouseBlocker {
  "register": "stock" | "stock_reserved" | "stock_expected";
  "company_id": UUID;
  "product_id": UUID;
  /** Ненулевой остаток decimal */
  "quantity": string;
}

export interface StockWarehouseBlockerCheck {
  "allowed": boolean;
  "blockers": Array<StockWarehouseBlocker>;
}

export interface StockWarehouseInput {
  /** Приводится к верхнему регистру */
  "code": string;
  "name": string;
  "parent_id"?: UUID | null;
  "address"?: { [key: string]: unknown };
  "responsible_employee_id"?: UUID | null;
  "sort_order"?: number;
  "company_ids"?: Array<UUID>;
}

export interface StockWarehousePage {
  "count": number;
  "results": Array<StockWarehouse>;
}

/** Отсутствующее поле сохраняет текущее значение; переданное применяется, включая null для nullable-полей. */
export interface StockWarehousePatch {
  "code"?: string;
  "name"?: string;
  "parent_id"?: UUID | null;
  "address"?: { [key: string]: unknown };
  "responsible_employee_id"?: UUID | null;
  "sort_order"?: number;
  "company_ids"?: Array<UUID>;
}

export interface Subtask {
  "id": UUID;
  "identifier": string;
  "title": string;
  "status_category": string | null;
  "executor_name": string | null;
  "due_at": string | null;
}

export interface Tag {
  "id": UUID;
  "project": UUID | null;
  "name": string;
  "color": string;
  "description": string;
  "is_archived": boolean;
}

/** Передайте `tag_id` существующей метки либо `name` для создания новой. */
export interface TagAttach {
  "tag_id"?: UUID;
  "name"?: string;
  "color"?: string;
}

export interface TagPage {
  "count": number;
  "results": Array<Tag>;
}

export interface Task {
  "id": UUID;
  "identifier": string;
  "section": UUID | null;
  "section_key": string | null;
  "section_name": string | null;
  "title": string;
  "description": string;
  "status": UUID | null;
  "status_name": string | null;
  "status_category": string | null;
  "priority": TaskPriority;
  "is_important": boolean;
  "creator": number | null;
  "creator_name": string | null;
  "executor": number | null;
  "executor_name": string | null;
  "assignee"?: number | null;
  "assignee_name"?: string | null;
  "coexecutors": Array<TaskWatcher>;
  "cycle": UUID | null;
  "cycle_name": string | null;
  "start_at": string | null;
  "created_at": string;
  "due_at": string | null;
  "estimate": number | null;
  "sort_order": number;
  "is_archived": boolean;
  "parent": UUID | null;
  "parent_identifier": string | null;
  "parent_title": string | null;
  "recurrence": string;
  "recurrence_interval": number;
  "recurrence_until": string | null;
  "custom": { [key: string]: unknown };
  "watchers": Array<TaskWatcher>;
  "subtasks": Array<Subtask>;
  "subtasks_total": number;
  "subtasks_done": number;
  "tags": Array<TaskTag>;
  "links": Array<{ [key: string]: unknown }>;
  "comments_count": number;
  "blocked_by_count": number;
}

export interface TaskCreate {
  "section": UUID;
  "title": string;
  "description"?: string;
  "status"?: UUID;
  "priority"?: TaskPriority;
  "is_important"?: boolean;
  "creator"?: number;
  "executor"?: number;
  "assignee"?: number;
  "coexecutor_ids"?: Array<number>;
  "watcher_ids"?: Array<number>;
  "tag_ids"?: Array<UUID>;
  "start_at"?: string;
  "due_at"?: string;
  "estimate"?: number;
  "parent"?: UUID;
  "recurrence"?: string;
  "recurrence_interval"?: number;
  "recurrence_until"?: string;
  "cycle"?: string;
  "custom"?: { [key: string]: unknown };
}

export interface TaskDocument {
  "id": UUID;
  "owner_type": DocumentOwnerType;
  "owner_id": UUID;
  "owner_key": string;
  "owner_name": string;
  "author_id": number | null;
  "author_name": string;
  "title": string;
  "content": string;
  "icon": string;
  "color": string;
  "is_archived": boolean;
  "created_at": string;
  "updated_at": string;
}

export interface TaskMove {
  "status": UUID;
}

export interface TaskPage {
  "count": number;
  "limit"?: number;
  "offset"?: number;
  "has_more"?: boolean;
  "results": Array<Task>;
}

export type TaskPriority = "none" | "low" | "medium" | "high" | "urgent";

export interface TaskTag {
  "id": UUID;
  "name": string;
  "color"?: string;
}

export interface TaskTagCatalogItem {
  "id": UUID;
  "section": UUID | null;
  "name": string;
  "color": string;
  "description": string;
  "is_archived": boolean;
}

export interface TaskTagCreate {
  "section"?: UUID;
  "name": string;
  "color"?: string;
  "description"?: string;
}

export interface TaskTagPage {
  "count": number;
  "results": Array<TaskTagCatalogItem>;
}

export interface TaskTagUpdate {
  "name"?: string;
  "color"?: string;
  "description"?: string;
}

export interface TaskTemplate {
  "id": UUID;
  "section": UUID;
  "section_key": string | null;
  "section_name": string | null;
  "status": UUID | null;
  "status_name": string | null;
  "owner": number | null;
  "name": string;
  "title": string;
  "description": string;
  "priority": TaskPriority;
  "executor": number | null;
  "assignee"?: number;
  "executor_name": string | null;
  "estimate": number | null;
  "start_offset_days": number;
  "due_offset_days": number | null;
  "recurrence": TemplateRecurrence;
  "recurrence_interval": number;
  "recurrence_until": string | null;
  "next_run_at": string | null;
  "last_run_at": string | null;
  "last_task": UUID | null;
  "last_task_identifier": string | null;
  "is_active": boolean;
  "custom": { [key: string]: unknown };
  "created_at": string;
  "updated_at": string;
}

export interface TaskTemplateCreate {
  "section": UUID;
  "status"?: UUID;
  "name": string;
  "title": string;
  "description"?: string;
  "priority"?: TaskPriority;
  "executor"?: number;
  "assignee"?: number;
  "estimate"?: number;
  "start_offset_days"?: number;
  "due_offset_days"?: number;
  "recurrence"?: TemplateRecurrence;
  "recurrence_interval"?: number;
  "recurrence_until"?: string;
  "next_run_at"?: string;
  "is_active"?: boolean;
  "custom"?: { [key: string]: unknown };
}

export interface TaskTemplatePage {
  "count": number;
  "results": Array<TaskTemplate>;
}

export interface TaskTemplateUpdate {
  "section"?: UUID;
  "status"?: UUID;
  "name"?: string;
  "title"?: string;
  "description"?: string;
  "priority"?: TaskPriority;
  "executor"?: number;
  "assignee"?: number;
  "estimate"?: number;
  "start_offset_days"?: number;
  "due_offset_days"?: number;
  "recurrence"?: TemplateRecurrence;
  "recurrence_interval"?: number;
  "recurrence_until"?: string;
  "next_run_at"?: string;
  "is_active"?: boolean;
  "custom"?: { [key: string]: unknown };
}

export interface TaskUpdate {
  "title"?: string;
  "description"?: string;
  "section"?: UUID;
  "status"?: UUID;
  "priority"?: TaskPriority;
  "is_important"?: boolean;
  "executor"?: number;
  "assignee"?: number;
  "coexecutor_ids"?: Array<number>;
  "watcher_ids"?: Array<number>;
  "tag_ids"?: Array<UUID>;
  "start_at"?: string;
  "due_at"?: string;
  "estimate"?: number;
  "parent"?: UUID;
  "recurrence"?: string;
  "recurrence_interval"?: number;
  "recurrence_until"?: string;
  "cycle"?: string;
  "custom"?: { [key: string]: unknown };
  "managed_checklist"?: ManagedChecklistPatch;
}

export interface TaskView {
  "id": UUID;
  "name": string;
  "owner": number | null;
  "owner_name": string | null;
  "section": UUID | null;
  "visibility": "private" | "workspace";
  "filters": { [key: string]: unknown };
  "sort": string;
}

export interface TaskViewCreate {
  "name": string;
  "section"?: UUID;
  "visibility"?: "private" | "workspace";
  "filters"?: { [key: string]: unknown };
  "sort"?: string;
}

export interface TaskViewPage {
  "count": number;
  "results": Array<TaskView>;
}

export interface TaskWatcher {
  "id": number;
  "user": number;
  "user_name": string | null;
}

export interface TasksSnapshot {
  "fetched_at": string;
  "revision": string;
  "projects": Array<Project>;
  "sections": Array<Section>;
  "statuses": Array<Status>;
  "tags": Array<TaskTagCatalogItem>;
  "members": Array<Member>;
  "views": Array<TaskView>;
  "cycles": Array<Cycle>;
  "tasks": Array<Task>;
  "tasks_limit"?: number;
  "tasks_has_more": boolean;
}

export type TemplateRecurrence = "daily" | "weekly" | "monthly" | "yearly";

export interface TemplateRunPage {
  "count": number;
  "results": Array<TemplateRunResult>;
}

export interface TemplateRunResult {
  "template": TaskTemplate;
  "task": Task | null;
  "created": boolean;
  "reason"?: string;
}

export type UUID = string;

export interface WorkflowStatusUpdate {
  "name"?: string;
  "category"?: StatusCategory;
  "color"?: string;
  "order"?: number;
  "is_default"?: boolean;
  "is_final"?: boolean;
}

export interface CoreListBusinessesResponse {
  "results": Array<CoreBusiness>;
}

export interface CoreSetBusinessActiveRequest {
  "active": boolean;
}

export interface CoreListBusinessOwnershipResponse {
  "results": Array<CoreOwnershipVersion>;
}

export interface FinanceListDividendAccessUsersResponse {
  "results"?: Array<FinanceListDividendAccessUsersResponseResultsItem>;
}

export interface FinanceListDividendAccessUsersResponseResultsItem {
  "user_id": number;
  "full_name": string;
  "username": string;
}

export interface FinanceListDividendAutomationRunsResponse {
  "results"?: Array<{ [key: string]: unknown }>;
}

export interface FinanceListDividendDecisionsResponse {
  "results"?: Array<{ [key: string]: unknown }>;
}

export interface FinanceListDividendOwnersResponse {
  "results": Array<FinanceListDividendOwnersResponseResultsItem>;
}

export interface FinanceListDividendOwnersResponseResultsItem {
  "id": UUID;
  "kind": "employee" | "company" | "contact";
  "name": string;
  "share_percent": string;
  "is_active": boolean;
  "payable_balance": string;
}

export interface FinanceListDividendPoliciesResponse {
  "results"?: Array<{ [key: string]: unknown }>;
}

export interface FinanceGetProjectBudgetHistoryResponse {
  "count": number;
  "results": Array<FinanceProjectBudget>;
}
