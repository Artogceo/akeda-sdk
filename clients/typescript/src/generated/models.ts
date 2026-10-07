/*
 * Сгенерировано scripts/generate.py. Руками не править.
 * Источник: snapshot/openapi/akeda-v1.json (контракт 0.21.0-core-public, sha256 c4ace798ceb5b73f4f0c1e80df57d77999a90287645e6ba4cc63c73547d52ef6).
 * Рантайм клиента написан руками и живёт рядом; здесь только типы.
 */

export type AccountingBasis = "cash" | "accrual" | "mixed";

export interface Activity {
  "id": UUID;
  /** Готовый русский текст записи. */
  "action": string;
  /** Вид записи об этапе задачи — `status_set`, `status_changed` или `status_deleted` (этап удалён, задача перенесена в `detail.to` или осталась без этапа). У остальных записей поле отсутствует; клиент, не знающий вида, показывает `action`. */
  "kind"?: string;
  /** Названия этапов записи об этапе; у удалённого этапа — сохранённое название. */
  "detail"?: ActivityDetail;
  "actor_name": string | null;
  "created_at": string;
}

/** Названия этапов записи об этапе; у удалённого этапа — сохранённое название. */
export interface ActivityDetail {
  "from"?: string | null;
  "to"?: string | null;
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

export interface AppReferenceItem {
  "id": UUID;
  /** Ссылка на запись в смысле SDK: её присылает и по ней адресуется приложение */
  "code": string;
  "label": string;
  "parent_id"?: UUID;
  /** Дополнительные поля записи в том виде, в каком их прислало приложение */
  "attrs"?: { [key: string]: unknown };
  "sort_order": number;
  /** Погашенная запись остаётся разрешимой по ссылке и не предлагается в новых */
  "is_active": boolean;
}

export interface AppReferenceItemPage {
  "count": number;
  "results": Array<AppReferenceItem>;
}

export interface AppReferenceUpsertInput {
  "items": Array<AppReferenceUpsertItem>;
}

export interface AppReferenceUpsertItem {
  /** Ключ идемпотентности: тот же код обновляет ту же запись */
  "code": string;
  /** Подпись для человека кабинета. Пустая заменяется кодом: строка без подписи в отчёте нечитаема */
  "label"?: string;
  "parent_id"?: UUID;
  "attrs"?: { [key: string]: unknown };
  "sort_order"?: number;
  /** Пропущенное поле значит «запись жива»: молча гасить присланное было бы ловушкой */
  "is_active"?: boolean;
}

export interface AppReferenceUpsertResult {
  /** Сколько записей заведено впервые */
  "created": number;
  /** Сколько существующих кодов обновлено */
  "updated": number;
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

/**
 * Человек, открывший панель, в том объёме, в каком приложению позволено его знать. Имени, почты, ролей и числового идентификатора здесь нет и не появится: имя и почта — это штат клиента, роли — его оргструктура, а числовой идентификатор общий на всю платформу и связал бы два кабинета между собой.
 * 
 * Карточка сотрудника (employee_id) — единственное поле, называющее человека настоящей записью кабинета, и приезжает она не всем: только слоту, который назвал actor_employee_id объявлением, и только в той версии, чей лист согласия кабинет читал. Общего на всю платформу в ней ничего нет — она живёт в базе кабинета, и тот же человек у двух клиентов это две разные строки, поэтому довод про связывание кабинетов к ней не относится.
 */
export interface AppRuntimeSlotActor {
  /** Псевдоним, свой у каждой пары «установка + человек». Устойчив внутри установки, поэтому панель помнит выбор сотрудника; в другой установке того же приложения у того же человека он ДРУГОЙ; умирает вместе с установкой */
  "subject": UUID;
  /** Карточка сотрудника кабинета (core_employee.id) — та же, на которой висит его работа. Приезжает только слоту, попросившему actor_employee_id. Пусто означает «не просили либо человек не сотрудник»: различать эти случаи приложению незачем, оба означают, что сотрудника нет. Нужна тому, кто ведёт работу людей: без неё приложение заводит второй список сотрудников у себя, а псевдоним для этого не годится — он умирает вместе с установкой, а часы и назначения обязаны её пережить */
  "employee_id"?: UUID;
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

export interface AssistantDigest {
  "name": string;
  "metric_ids": Array<string>;
  "company"?: UUID;
  "project"?: UUID;
  "period": "this_month" | "previous_month" | "last_30_days";
  "schedule_hour": number;
  "schedule_minute": number;
  "timezone": string;
  "weekdays_only": boolean;
  "locale": "ru-RU" | "en-US";
  "enabled": boolean;
  "id": UUID;
  "version": number;
  "next_run_at": string;
  "last_run_at"?: string;
  "last_error"?: "" | "access_removed" | "source_unavailable";
  "last_conversation_id"?: UUID;
}

export interface AssistantDigestInput {
  "name": string;
  "metric_ids": Array<string>;
  "company"?: UUID;
  "project"?: UUID;
  "period": "this_month" | "previous_month" | "last_30_days";
  "schedule_hour": number;
  "schedule_minute": number;
  "timezone": string;
  "weekdays_only": boolean;
  "locale": "ru-RU" | "en-US";
  "enabled": boolean;
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
  /** Папка файлов проекта, куда ляжет файл */
  "folder_id"?: string;
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
  /** Папка файлов проекта, куда сразу ляжет файл; только при owner_type=project */
  "folder_id"?: string;
  "filename": string;
  "mime_type"?: string;
  "size_bytes": number;
  "sha256"?: string;
}

/** Документ akeda.automation.manifest версии 1 (AUTOMATION.md § 10.1). */
export interface AutomationManifest {
  "$schema"?: string;
  "format": "akeda.automation.manifest";
  "version": number;
  /** Отпечаток содержимого sha256:… */
  "revision": string;
  "locale": "ru" | "en";
  "detail": "full" | "brief";
  "events": Array<AutomationManifestEvent>;
  "conditions": AutomationManifestConditions;
  "actions": Array<AutomationManifestAction>;
  "references": Array<AutomationManifestReferencesItem>;
  "placeholders": Array<AutomationManifestPlaceholdersItem>;
  "limits": AutomationManifestLimits;
}

export interface AutomationManifestConditions {
  "combinator": "all";
  "operators": Array<AutomationManifestConditionsOperatorsItem>;
  "max_clauses": number;
  "max_value_length": number;
}

export interface AutomationManifestConditionsOperatorsItem {
  "op": string;
  "label": string;
  "field_types": Array<string>;
  "needs_value": boolean;
  "case_insensitive": boolean;
}

export interface AutomationManifestReferencesItem {
  "kind": string;
  "module": string;
  "label": string;
  /** MCP-инструмент поиска значения по имени */
  "lookup_tool": string;
  "parameter_kind": boolean;
  "status": "live" | "unavailable";
}

export interface AutomationManifestPlaceholdersItem {
  "syntax": string;
  "meaning": string;
  "status": string;
}

export interface AutomationManifestLimits {
  "max_actions": number;
  "max_conditions": number;
  "max_condition_length": number;
  "chain_depth": number;
  "runs_per_tenant_per_minute": number;
  "max_attempts": number;
}

export interface AutomationManifestAction {
  "command": string;
  "module": string;
  "label_key": string;
  "label": string;
  "description": string;
  "when_to_use": string;
  "status": "live" | "declared" | "unavailable";
  "unavailable_reason"?: string;
  "permission": string;
  "reversible": boolean;
  "danger": "none" | "external" | "irreversible";
  "idempotency": string;
  "target": "new" | "event_entity";
  "event_entities"?: Array<string>;
  "mcp_twin"?: string;
  "inputs"?: Array<AutomationManifestActionInputsItem>;
  "example_inputs"?: { [key: string]: string };
}

export interface AutomationManifestActionInputsItem {
  "key": string;
  "type": "string" | "number" | "bool" | "reference" | "datetime" | "choice";
  "required": boolean;
  "label": string;
  "options"?: Array<AutomationManifestOption>;
  "ref"?: string;
  "accepts_placeholders": boolean;
}

export interface AutomationManifestEvent {
  "topic": string;
  "module": string;
  "entity": string;
  "fact": string;
  "label_key": string;
  "label": string;
  "description": string;
  "when_to_use": string;
  "status": "live" | "unavailable";
  "unavailable_reason"?: string;
  /** Правило сработает, только если исполнитель видит источник */
  "source_visibility": boolean;
  "fields"?: Array<AutomationManifestEventFieldsItem>;
  "example_payload"?: { [key: string]: unknown };
}

export interface AutomationManifestEventFieldsItem {
  "key": string;
  "type": "string" | "number" | "bool" | "timestamp";
  "label": string;
  "options"?: Array<AutomationManifestOption>;
  "ref"?: string;
  "operators": Array<string>;
}

export interface AutomationManifestOption {
  "value": string;
  "label": string;
}

export interface AutomationRuleDocument {
  "id": string;
  "name": string;
  "event_type": string;
  /** Выражение вычислителя; у правила из конструктора собрано из conditions */
  "condition": string;
  "conditions": Array<AutomationRuleDocumentConditionsItem>;
  "actions": Array<AutomationRuleDocumentActionsItem>;
  "executor_user_id": number;
  "is_enabled": boolean;
  "origin": "manual" | "configuration";
  "version": number;
  "created_by"?: number;
  "created_at"?: string;
  "updated_at"?: string;
}

export interface AutomationRuleDocumentConditionsItem {
  "field": string;
  "op": string;
  "value"?: string;
  "value_to"?: string;
  "of"?: string;
  "group"?: number;
}

export interface AutomationRuleDocumentActionsItem {
  "command": string;
  "inputs"?: { [key: string]: string };
}

export interface AutomationRuleProblem {
  /** Путь в документе правила: event_type, conditions[1].op, actions[0].inputs.title */
  "field": string;
  "code": string;
  "message": string;
  "hint"?: string;
  "params"?: { [key: string]: string };
  "allowed"?: Array<string>;
}

export interface AutomationRuleSimulateRequest {
  /** Документ правила в той же форме, что у проверки правила (event_type, conditions, actions); название и исполнитель не нужны. */
  "rule": AutomationRuleSimulateRequestRule;
  /** Сохранённое правило: его версия на тех же фактах — «было» */
  "rule_id"?: string;
  /** Период прогона в днях; по умолчанию 30 */
  "days"?: number;
}

/** Документ правила в той же форме, что у проверки правила (event_type, conditions, actions); название и исполнитель не нужны. */
export interface AutomationRuleSimulateRequestRule {
  "event_type": string;
}

export interface AutomationRuleSimulation {
  "days": number;
  "since": string;
  /** Фактов события за период, видимых вызывающему */
  "events": number;
  /** Сколько раз правило сработало бы */
  "fired": number;
  /** Учтены только последние 2000 фактов периода */
  "truncated": boolean;
  /** Больше всего срабатываний за один день */
  "max_per_day": number;
  "records": Array<AutomationRuleSimulationRecordsItem>;
  "actions": Array<AutomationRuleSimulationActionsItem>;
  "before"?: AutomationRuleSimulationBefore;
  /** Всегда false: прогон ничего не исполняет */
  "executed": boolean;
}

export interface AutomationRuleSimulationRecordsItem {
  "key": string;
  "entity_id": string;
  /** Номер, идентификатор или тема записи */
  "title"?: string;
  "occurred_at": string;
}

export interface AutomationRuleSimulationActionsItem {
  "index": number;
  "command": string;
  "label": string;
  "permission": string;
  "allowed": boolean;
  "connected": boolean;
  /** Сколько раз действие выполнилось бы; 0 — его заблокировали права или нет исполнителя */
  "count": number;
  "code"?: string;
  "message"?: string;
}

export interface AutomationRuleSimulationBefore {
  "enabled": boolean;
  "version": number;
  /** Сколько раз сработала бы сохранённая версия; выключенное правило — 0 */
  "fired": number;
}

export interface AutomationRuleTestRequest {
  /** Документ правила в той же форме, что у записи правила; название и исполнитель не нужны. */
  "rule": AutomationRuleTestRequestRule;
  /** Ключ факта из выборки последних фактов события; пусто — последний факт */
  "sample_key"?: string;
  /** Тело события для проверки «что если» вместо настоящего факта */
  "payload"?: { [key: string]: string };
}

/** Документ правила в той же форме, что у записи правила; название и исполнитель не нужны. */
export interface AutomationRuleTestRequestRule {
  "name"?: string;
  "event_type": string;
  "condition"?: string;
  "conditions"?: Array<AutomationRuleTestRequestRuleConditionsItem>;
  "actions"?: Array<AutomationRuleTestRequestRuleActionsItem>;
}

export interface AutomationRuleTestRequestRuleConditionsItem {
  "field": string;
  /** equals, not_equals, contains, starts_with, ends_with, is_true, is_false; числа — gt, gte, lt, lte, between; даты — before, on_or_before, after, on_or_after, between */
  "op": string;
  "value"?: string;
  /** Верхняя граница «между», включительно */
  "value_to"?: string;
  /** Числовое поле-основа: value и value_to — проценты от него */
  "of"?: string;
  /** Группа «или»: сравнения группы — «и», группы между собой — «или» */
  "group"?: number;
}

export interface AutomationRuleTestRequestRuleActionsItem {
  "command": string;
  "inputs"?: { [key: string]: string };
}

export interface AutomationRuleTestResult {
  "sample"?: AutomationRuleTestResultSample | null;
  "executor_user_id": number;
  "when": AutomationRuleTestResultWhen;
  "condition": AutomationRuleTestResultCondition;
  "matched": boolean;
  "actions": Array<AutomationRuleTestResultActionsItem>;
  "problem"?: AutomationRuleProblem;
  /** Всегда false: проверка ничего не делает */
  "executed": boolean;
}

export interface AutomationRuleTestResultSample {
  "key": string;
  "event_type": string;
  "entity": string;
  "entity_id": string;
  /** Номер, идентификатор или тема записи */
  "title"?: string;
  "occurred_at": string;
  "payload": { [key: string]: string };
  "source": "outbox" | "direct" | "payload";
}

export interface AutomationRuleTestResultWhen {
  "ok": boolean;
  "event_label": string;
  "values": Array<AutomationRuleTestResultWhenValuesItem>;
  /** no_sample — фактов события за 30 дней нет */
  "code"?: string;
  "message"?: string;
}

export interface AutomationRuleTestResultWhenValuesItem {
  "key": string;
  "label": string;
  "value": string;
}

export interface AutomationRuleTestResultCondition {
  "ok": boolean;
  "empty": boolean;
  "expression": boolean;
  "clauses": Array<AutomationRuleTestResultConditionClausesItem>;
  "code"?: string;
  "message"?: string;
}

export interface AutomationRuleTestResultConditionClausesItem {
  "index": number;
  "field": string;
  "field_label": string;
  "op": string;
  "op_label": string;
  "expected"?: string;
  "expected_to"?: string;
  "of"?: string;
  "of_label"?: string;
  "of_actual"?: string;
  "group"?: number;
  "actual": string;
  "present": boolean;
  "ok": boolean;
}

export interface AutomationRuleTestResultActionsItem {
  "index": number;
  "command": string;
  "label": string;
  "permission": string;
  "allowed": boolean;
  "connected": boolean;
  "status": "would_run" | "not_reached" | "blocked";
  "code"?: string;
  "message"?: string;
  "inputs": Array<AutomationRuleTestResultActionsItemInputsItem>;
}

export interface AutomationRuleTestResultActionsItemInputsItem {
  "key": string;
  "label": string;
  "template": string;
  "value": string;
  "missing"?: Array<string>;
}

/** Лента только дописывается */
export interface CRMActivity {
  "id": UUID;
  "entity_type": "lead" | "deal" | "customer";
  "entity_id": UUID;
  /** Ключ факта; note - заметка сотрудника */
  "action": string;
  /** Подробности факта. У заметки: text - текст, mentions - упомянутые коллеги [{id, name}] */
  "details": { [key: string]: unknown } | null;
  "actor_id": number;
  "actor_name"?: string;
  "created_at": string;
}

/** Живая витрина по всему кабинету; суммы в валюте сделки */
export interface CRMAnalytics {
  "stages": Array<CRMStageMetric> | null;
  "conversion": CRMConversionMetric;
  /** Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md) */
  "weighted_forecast": string;
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
  /** Правило перенесено на общий движок: события после этого момента исполняет правило adopted_rule_id; здесь оно не правится (409) */
  "adopted_at"?: string;
  "adopted_rule_id"?: UUID;
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
  /** Имя правила — журнал отвечает, что сработало */
  "rule_name"?: string;
  /** Событие, вызвавшее запуск */
  "event_type"?: string;
  /** lead или deal — по какой записи был запуск */
  "entity_type"?: string;
  "entity_id"?: UUID;
  "status": "queued" | "running" | "success" | "failed" | "skipped";
  "attempts": number;
  "action_errors": Array<string> | null;
  "created_at": string;
  "updated_at": string;
}

/** Файл, прикреплённый к лиду, сделке или клиенту */
export interface CRMCardFile {
  "id": UUID;
  "entity_type": "lead" | "deal" | "customer";
  "entity_id": UUID;
  /** Имя файла с расширением */
  "name": string;
  "mime_type": string;
  "size_bytes": number;
  /** Контрольная сумма SHA-256, если её заявили при загрузке */
  "sha256"?: string;
  /** Вердикт антивируса: clean и skipped скачиваются, pending - ещё проверяется, infected - заражён */
  "scan_status": "clean" | "skipped" | "pending" | "infected";
  "uploaded_by": number;
  "uploaded_by_name"?: string;
  "created_at": string;
}

/** Файлы карточки, новые сверху */
export interface CRMCardFileList {
  "items": Array<CRMCardFile>;
}

/** Узкая проекция карточки справочника ERP; CRM её не редактирует */
export interface CRMContactRef {
  "id": UUID;
  "name": string;
  "legal_name"?: string;
  "inn"?: string;
  "kpp"?: string;
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
  /** Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md) */
  "amount"?: string;
  "currency"?: string;
  "probability"?: number;
  "expected_close_at"?: string | null;
}

export interface CRMCounters {
  /** Лиды в очереди разбора: статус new вне архива, видимые читающему */
  "new_leads": number;
  /** Открытые дела читающего, срок которых уже прошёл */
  "overdue_engagements": number;
}

export interface CRMCreateEventLinkInput {
  "title": string;
  "description"?: string;
  "starts_at": string;
  "ends_at": string;
  /** IANA-зона события */
  "timezone"?: string;
}

export interface CRMCreateTaskLinkInput {
  "section_id": UUID;
  "title": string;
  "description"?: string;
  "due_at"?: string | null;
  /** Исполнитель; по умолчанию — тот, кто создаёт задачу */
  "executor_id"?: number | null;
}

export interface CRMCustomer {
  "id": UUID;
  "kind": "person" | "company" | "sole_prop";
  "name": string;
  "legal_name": string;
  /** ИНН без пробелов; пустая строка - не указан */
  "inn": string;
  /** КПП в верхнем регистре; бывает только при ИНН из 10 цифр */
  "kpp": string;
  /** Основной телефон — значение основного канала phone */
  "phone": string;
  /** Основная почта — значение основного канала email */
  "email": string;
  /** Ник или номер клиента по мессенджерам */
  "messengers": { [key: string]: string } | null;
  /** Все телефоны, почты и мессенджеры клиента */
  "channels": Array<CRMCustomerChannel>;
  "tags": Array<string> | null;
  "source": string;
  "owner_id"?: number;
  "owner_name"?: string;
  "note": string;
  "core_contact_id"?: UUID;
  /** Момент переноса в справочник контрагентов ERP */
  "promoted_at"?: string;
  "archived_at"?: string;
  /** Карточка слита с этой и лежит в архиве */
  "merged_into_customer_id"?: UUID;
  "open_deals": number;
  /** Дополнительные поля кабинета: состав задаёт «Настройки → Поля» */
  "custom"?: { [key: string]: unknown } | null;
  "created_at": string;
  "updated_at": string;
}

export interface CRMCustomerChannel {
  "kind": "phone" | "email" | "messenger";
  /** Сеть мессенджера: telegram, whatsapp, max, vk и т. п.; у телефона и почты не передаётся */
  "network"?: string;
  /** Значение, как его ввели */
  "value": string;
  /** Вид для сравнения: телефон цифрами с кодом страны, почта и ник в нижнем регистре */
  "normalized": string;
  /** Основной канал своего вида; он уходит в справочник контрагентов ERP */
  "primary": boolean;
}

export interface CRMCustomerChannelInput {
  "kind": "phone" | "email" | "messenger";
  /** Сеть мессенджера; обязательна для messenger */
  "network"?: string;
  /** Телефон в любом формате, адрес почты или ник */
  "value": string;
  /** Основной канал своего вида; без отметки основным становится первый */
  "primary"?: boolean;
}

export interface CRMCustomerDuplicate {
  "id": UUID;
  "kind": "person" | "company" | "sole_prop";
  "name": string;
  "legal_name": string;
  /** ИНН без пробелов; пустая строка - не указан */
  "inn": string;
  /** КПП в верхнем регистре; бывает только при ИНН из 10 цифр */
  "kpp": string;
  /** Основной телефон — значение основного канала phone */
  "phone": string;
  /** Основная почта — значение основного канала email */
  "email": string;
  /** Ник или номер клиента по мессенджерам */
  "messengers": { [key: string]: string } | null;
  /** Все телефоны, почты и мессенджеры клиента */
  "channels": Array<CRMCustomerChannel>;
  "tags": Array<string> | null;
  "source": string;
  "owner_id"?: number;
  "owner_name"?: string;
  "note": string;
  "core_contact_id"?: UUID;
  /** Момент переноса в справочник контрагентов ERP */
  "promoted_at"?: string;
  "archived_at"?: string;
  /** Карточка слита с этой и лежит в архиве */
  "merged_into_customer_id"?: UUID;
  "open_deals": number;
  /** Дополнительные поля кабинета: состав задаёт «Настройки → Поля» */
  "custom"?: { [key: string]: unknown } | null;
  "created_at": string;
  "updated_at": string;
  "matched_by": "inn" | "phone" | "email" | "name";
}

export interface CRMCustomerDuplicateGroup {
  "matched_by": "inn" | "phone" | "email" | "name";
  /** Общее значение признака: ИНН/КПП, последние десять цифр телефона, почта или имя */
  "value": string;
  "customers": Array<CRMCustomer>;
}

export interface CRMCustomerDuplicateRefusal {
  "code": "crm.customer_inn_taken" | "crm.customer_possible_duplicate";
  "detail": string;
  /** Похожие карточки; чужая карточка без права видеть чужих клиентов — только имя, вид и ответственный */
  "matches": Array<CRMCustomerDuplicate>;
}

export interface CRMCustomerInput {
  "kind"?: "person" | "company" | "sole_prop";
  "name": string;
  "legal_name"?: string;
  /** ИНН: 10 цифр у организации, 12 у предпринимателя, с верной контрольной цифрой */
  "inn"?: string;
  /** КПП: девять знаков, только вместе с ИНН из 10 цифр */
  "kpp"?: string;
  /** Телефон; несколько номеров можно перечислить через запятую. Не читается, если передан channels */
  "phone"?: string;
  /** Почта; не читается, если передан channels */
  "email"?: string;
  /** Мессенджеры объектом «сеть → ник»; не читаются, если передан channels */
  "messengers"?: { [key: string]: string } | null;
  /** Полный список каналов связи; главнее полей phone, email и messengers */
  "channels"?: Array<CRMCustomerChannelInput> | null;
  "tags"?: Array<string> | null;
  "source"?: string;
  "owner_id"?: number | null;
  "note"?: string;
  /** Дополнительные поля кабинета: состав задаёт «Настройки → Поля» */
  "custom"?: { [key: string]: unknown } | null;
  /** Это правда новый клиент: создать, хотя телефон или почта совпали с живой карточкой. Совпадение ИНН и КПП так не обходится */
  "confirm_duplicate"?: boolean;
}

export interface CRMCustomerPatch {
  "kind"?: "person" | "company" | "sole_prop";
  "name"?: string;
  "legal_name"?: string;
  /** Пустая строка стирает ИНН */
  "inn"?: string;
  /** Пустая строка стирает КПП */
  "kpp"?: string;
  /** Заменяет основной телефон, остальные номера остаются; пустая строка снимает основной */
  "phone"?: string;
  /** Заменяет основную почту, остальные адреса остаются; пустая строка снимает основную */
  "email"?: string;
  /** Заменяет все мессенджеры клиента */
  "messengers"?: { [key: string]: string } | null;
  /** Заменяет список каналов целиком; поля phone, email и messengers при этом не читаются */
  "channels"?: Array<CRMCustomerChannelInput> | null;
  "tags"?: Array<string> | null;
  "source"?: string;
  "owner_id"?: number | null;
  "note"?: string;
  "archived"?: boolean;
  /** Дополнительные поля кабинета: состав задаёт «Настройки → Поля» */
  "custom"?: { [key: string]: unknown } | null;
}

export interface CRMDeal {
  "id": UUID;
  "pipeline_id": UUID;
  "stage_id": UUID;
  "title": string;
  /** Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md) */
  "amount": string;
  /** Код валюты из справочника ERP */
  "currency": string;
  /** Канал обращения; manual для ручного заведения */
  "source": string;
  "probability": number;
  "expected_close_at"?: string;
  "owner_id"?: number;
  "crm_customer_id"?: UUID;
  "next_action": string;
  "next_action_at"?: string;
  "archived_at"?: string;
  "closed_at"?: string;
  "loss_reason_id"?: UUID;
  "description"?: string;
  "first_message"?: string;
  "utm_source"?: string;
  "utm_medium"?: string;
  "utm_campaign"?: string;
  "utm_term"?: string;
  "utm_content"?: string;
  "landing_page"?: string;
  "referrer"?: string;
  /** Дополнительные поля кабинета: состав задаёт «Настройки → Поля» */
  "custom"?: { [key: string]: unknown } | null;
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
  /** Суммы по валютам сделок колонки, десятичными строками */
  "original_totals": { [key: string]: string } | null;
  /** Сумма в валюте учёта десятичной строкой; отсутствует при неполном покрытии курсами */
  "amount_in_accounting"?: string;
  "weighted_in_accounting"?: string;
  "cards": Array<CRMDealCard> | null;
  "has_more": boolean;
}

export interface CRMDealCard {
  "id": UUID;
  "pipeline_id": UUID;
  "stage_id": UUID;
  "title": string;
  /** Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md) */
  "amount": string;
  /** Код валюты из справочника ERP */
  "currency": string;
  /** Канал обращения; manual для ручного заведения */
  "source": string;
  "probability": number;
  "expected_close_at"?: string;
  "owner_id"?: number;
  "crm_customer_id"?: UUID;
  "next_action": string;
  "next_action_at"?: string;
  "archived_at"?: string;
  "closed_at"?: string;
  "loss_reason_id"?: UUID;
  "description"?: string;
  "first_message"?: string;
  "utm_source"?: string;
  "utm_medium"?: string;
  "utm_campaign"?: string;
  "utm_term"?: string;
  "utm_content"?: string;
  "landing_page"?: string;
  "referrer"?: string;
  /** Дополнительные поля кабинета: состав задаёт «Настройки → Поля» */
  "custom"?: { [key: string]: unknown } | null;
  "created_at": string;
  "updated_at": string;
  "customer_name"?: string;
  "owner_name"?: string;
  /** Когда сделка встала на текущий этап; от этого момента считается норматив этапа */
  "stage_since"?: string;
}

export interface CRMDealContact {
  "id": UUID;
  "deal_id": UUID;
  "contact_id": UUID;
  "is_primary": boolean;
  "created_at": string;
}

export interface CRMDealInput {
  "pipeline_id": UUID;
  "stage_id": UUID;
  "title": string;
  /** Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md) */
  "amount"?: string;
  /** Обязателен при ненулевой сумме */
  "currency"?: string;
  "source"?: string;
  "description"?: string;
  "probability"?: number;
  "expected_close_at"?: string | null;
  "owner_id"?: number | null;
  /** Прежний вход: контрагент справочника ERP. Сервер находит или заводит по нему клиента CRM и записывает crm_customer_id; в ответе поля нет. */
  "customer_id"?: string | null;
  "crm_customer_id"?: string | null;
  "next_action"?: string;
  "next_action_at"?: string | null;
  /** Дополнительные поля кабинета: состав задаёт «Настройки → Поля» */
  "custom"?: { [key: string]: unknown } | null;
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
  /** Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md) */
  "price": string;
  "discount_percent": number;
  /** Сумма строки со скидкой; считает сервер, чтобы клиенты не разошлись на округлении */
  "total": number;
  "created_at": string;
  "updated_at": string;
}

export interface CRMDealPatch {
  "title"?: string;
  /** Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md) */
  "amount"?: string;
  "currency"?: string;
  "source"?: string;
  "description"?: string;
  "probability"?: number;
  "expected_close_at"?: string | null;
  "owner_id"?: number | null;
  /** Прежний вход: контрагент справочника ERP. Сервер находит или заводит по нему клиента CRM и записывает crm_customer_id; в ответе поля нет. */
  "customer_id"?: string | null;
  "crm_customer_id"?: string | null;
  "next_action"?: string;
  "next_action_at"?: string | null;
  /** Дополнительные поля кабинета: состав задаёт «Настройки → Поля» */
  "custom"?: { [key: string]: unknown } | null;
  "archived"?: boolean;
}

export interface CRMDealStageHistory {
  "id": UUID;
  "deal_id": UUID;
  "from_stage_id"?: UUID;
  "to_stage_id": UUID;
  "changed_by": number;
  /** Вид записи: created - сделка заведена, move - перенос по этапам, pipeline_change - перенос в другую воронку, reopen - повторное открытие закрытой сделки */
  "kind": "created" | "move" | "pipeline_change" | "reopen";
  /** Причина; заполнена у повторного открытия */
  "reason"?: string;
  "created_at": string;
}

export interface CRMEngagement {
  "id": UUID;
  "entity_type": "lead" | "deal" | "customer";
  "entity_id": UUID;
  "kind": CRMEngagementKind;
  "title": string;
  /** Подробности дела: что обсудить, адрес встречи */
  "description": string;
  "due_at"?: string;
  /** Пусто, пока дело не выполнено */
  "done_at"?: string;
  /** Когда напомнить ответственному */
  "remind_at"?: string;
  /** Когда напоминание ушло в центр уведомлений */
  "reminded_at"?: string;
  "repeat": CRMEngagementRepeat;
  /** Событие календаря, заведённое из дела */
  "calendar_event_id"?: UUID;
  /** Задача модуля «Задачи», заведённая из дела */
  "task_id"?: UUID;
  "owner_id"?: number;
  "owner_name"?: string;
  /** Название карточки дела (в списке «Мои дела») */
  "entity_title"?: string;
  /** Дело сохранено, но событие календаря не заведено или не обновлено */
  "warnings"?: Array<"calendar_unavailable" | "calendar_failed">;
  "created_by": number;
  "created_at": string;
  "updated_at": string;
}

export interface CRMEngagementInput {
  "kind"?: CRMEngagementKind;
  "title": string;
  /** Подробности дела */
  "description"?: string;
  "due_at"?: string | null;
  /** Когда напомнить ответственному; не позже срока */
  "remind_at"?: string | null;
  "repeat"?: CRMEngagementRepeat;
  /** По умолчанию - вызывающий сотрудник */
  "owner_id"?: number | null;
  /** Поставить дело событием в календарь ответственного; нужен срок */
  "in_calendar"?: boolean;
}

export type CRMEngagementKind = string;

export interface CRMEngagementKindItem {
  /** Код вида: то, что ложится в kind дела; после заведения не меняется */
  "code": string;
  /** Подпись вида - право кабинета */
  "label": string;
  "sort_order": number;
  /** Выключенный вид не предлагается для новых дел, но подписывает старые */
  "is_active": boolean;
}

export interface CRMEngagementPatch {
  "kind"?: CRMEngagementKind;
  "title"?: string;
  /** Подробности дела */
  "description"?: string;
  /** null снимает срок */
  "due_at"?: string | null;
  /** null снимает напоминание; новое время снова ставит его в очередь */
  "remind_at"?: string | null;
  "repeat"?: CRMEngagementRepeat;
  "owner_id"?: number | null;
  /** true закрывает дело, false возвращает в работу; закрытие повторяющегося дела заводит следующее */
  "done"?: boolean;
  /** true ставит в календарь дело, у которого события ещё нет */
  "in_calendar"?: boolean;
}

export type CRMEngagementRepeat = "none" | "daily" | "weekly" | "monthly";

export interface CRMEngagementTaskInput {
  "section_id": UUID;
  /** Название задачи; по умолчанию - название дела */
  "title"?: string;
  /** Описание задачи; по умолчанию - подробности дела */
  "description"?: string;
  /** Срок задачи; по умолчанию - срок дела */
  "due_at"?: string | null;
  /** Исполнитель; по умолчанию - ответственный за дело */
  "executor_id"?: number | null;
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

export interface CRMImportFileInfo {
  "filename": string;
  "format": string;
  "sheets": Array<CRMImportSheetInfo>;
  /** Сколько ячеек с формулами прочитано по сохранённому значению */
  "warnings": number;
}

export interface CRMImportSheetInfo {
  "name": string;
  "rows": number;
  "header_row": number;
  "headers": Array<string>;
  "sample": Array<Array<string>>;
  /** Заголовок -> предложенное поле */
  "suggested"?: { [key: string]: string };
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
  "scan_status": CRMInboxScanStatus;
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
  /** Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md) */
  "amount"?: string;
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
  /** Сколько файлов у сообщения; список — GET /api/v1/crm/inbox/messages/{id}/attachments */
  "attachment_count"?: number;
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
  /** Сколько файлов у сообщения; список — GET /api/v1/crm/inbox/messages/{id}/attachments */
  "attachment_count"?: number;
}

export interface CRMInboxOutboundUpload {
  "id": UUID;
  "conversation_id": UUID;
  "filename": string;
  "content_type": string;
  "size_bytes": number;
  /** Контрольная сумма, посчитанная на завершении сессии; у загрузки формой её нет */
  "sha256"?: string;
  "scan_status": CRMInboxScanStatus;
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

export type CRMInboxScanStatus = "pending" | "clean" | "infected" | "skipped";

export interface CRMInboxSendInput {
  "body"?: string;
  /** Идентификаторы заранее загруженных файлов: id из crmFinishInboxUploadSession (сессия загрузки) или из crmUploadInboxOutboundFile (форма) */
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

export type CRMLabelKey = string;

export interface CRMLead {
  "id": UUID;
  "title": string;
  /** Сумма лида десятичной строкой: «19990.50»; переходит в сделку при конвертации */
  "amount"?: string;
  /** Код валюты из справочника ERP; пусто — валюта не выбрана */
  "currency"?: string;
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
  "stage_id"?: UUID;
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
  "utm_source"?: string;
  "utm_medium"?: string;
  "utm_campaign"?: string;
  "utm_term"?: string;
  "utm_content"?: string;
  "landing_page"?: string;
  "referrer"?: string;
  /** Дополнительные поля кабинета: состав задаёт «Настройки → Поля» */
  "custom"?: { [key: string]: unknown } | null;
  "created_at": string;
  "updated_at": string;
}

export interface CRMLeadBoard {
  "stages": Array<CRMLeadBoardStage>;
}

export interface CRMLeadBoardStage {
  "stage": CRMLeadStage;
  /** Сколько лидов отбора стоит на этапе */
  "total_count": number;
  "cards": Array<CRMLeadCard>;
  /** На этапе больше лидов, чем карточек в ответе */
  "has_more": boolean;
}

/** Лид для экрана: тот же лид плюс человек за обращением и ответственный читаемыми именами */
export interface CRMLeadCard {
  "id": UUID;
  "title": string;
  /** Сумма лида десятичной строкой: «19990.50»; переходит в сделку при конвертации */
  "amount"?: string;
  /** Код валюты из справочника ERP; пусто — валюта не выбрана */
  "currency"?: string;
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
  "stage_id"?: UUID;
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
  "utm_source"?: string;
  "utm_medium"?: string;
  "utm_campaign"?: string;
  "utm_term"?: string;
  "utm_content"?: string;
  "landing_page"?: string;
  "referrer"?: string;
  /** Дополнительные поля кабинета: состав задаёт «Настройки → Поля» */
  "custom"?: { [key: string]: unknown } | null;
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
  /** Сумма лида десятичной строкой: «19990.50»; переходит в сделку при конвертации */
  "amount"?: string;
  /** Код валюты из справочника ERP; пусто — валюта не выбрана */
  "currency"?: string;
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
  "stage_id"?: UUID;
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
  "utm_source"?: string;
  "utm_medium"?: string;
  "utm_campaign"?: string;
  "utm_term"?: string;
  "utm_content"?: string;
  "landing_page"?: string;
  "referrer"?: string;
  /** Дополнительные поля кабинета: состав задаёт «Настройки → Поля» */
  "custom"?: { [key: string]: unknown } | null;
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
  /** Сумма лида десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md) */
  "amount"?: string;
  /** Обязателен при ненулевой сумме */
  "currency"?: string;
  "source"?: string;
  "description"?: string;
  "first_message"?: string;
  "contact_handle"?: string;
  "reference_id"?: string | null;
  "owner_id"?: number | null;
  /** Прежний вход: контрагент справочника ERP. Сервер находит или заводит по нему клиента CRM и записывает crm_customer_id; в ответе поля нет. */
  "customer_id"?: string | null;
  "crm_customer_id"?: string | null;
  "next_action"?: string;
  "next_action_at"?: string | null;
  /** Дополнительные поля кабинета: состав задаёт «Настройки → Поля» */
  "custom"?: { [key: string]: unknown } | null;
  "utm_source"?: string;
  "utm_medium"?: string;
  "utm_campaign"?: string;
  "utm_term"?: string;
  "utm_content"?: string;
  "landing_page"?: string;
  "referrer"?: string;
}

export type CRMLeadLockMode = "owner_only" | "after_qualification";

export interface CRMLeadPatch {
  "title"?: string;
  /** Сумма лида десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md) */
  "amount"?: string;
  /** Обязателен при ненулевой сумме */
  "currency"?: string;
  "source"?: string;
  "description"?: string;
  "first_message"?: string;
  "contact_handle"?: string;
  "reference_id"?: string | null;
  "owner_id"?: number | null;
  /** Прежний вход: контрагент справочника ERP. Сервер находит или заводит по нему клиента CRM и записывает crm_customer_id; в ответе поля нет. */
  "customer_id"?: string | null;
  "crm_customer_id"?: string | null;
  "next_action"?: string;
  "next_action_at"?: string | null;
  "archived"?: boolean;
  /** Дополнительные поля кабинета: состав задаёт «Настройки → Поля» */
  "custom"?: { [key: string]: unknown } | null;
}

export interface CRMLeadStage {
  "id": UUID;
  /** Имя этапа задаёт кабинет; код на конкретные имена не ссылается */
  "name": string;
  "label_key"?: CRMLabelKey;
  "sort_order": number;
  /** Ненужный этап выключают, а не удаляют */
  "is_active": boolean;
  "meaning": CRMLeadStageMeaning;
  /** Цвет этапа #RRGGBB; пусто - цвет по умолчанию */
  "color"?: string;
  "created_at": string;
  "updated_at": string;
}

export interface CRMLeadStageInput {
  "name": string;
  "meaning"?: CRMLeadStageMeaning;
  /** Цвет этапа #RRGGBB; пусто - цвет по умолчанию */
  "color"?: string;
}

export type CRMLeadStageMeaning = "open" | "qualified" | "converted" | "rejected";

export interface CRMLeadStagePatch {
  "name"?: string;
  "is_active"?: boolean;
  "meaning"?: CRMLeadStageMeaning;
  /** Цвет этапа #RRGGBB; пусто - цвет по умолчанию */
  "color"?: string;
  /** Вместе с is_active=false: другой действующий рабочий этап, куда переносятся все лиды убираемого этапа */
  "move_leads_to"?: string;
}

export type CRMLeadStatus = "new" | "qualified" | "disqualified" | "converted";

export interface CRMLeadSummary {
  /** Лиды в очереди разбора: статус new вне архива, видимые читающему */
  "unsorted": number;
}

export interface CRMLossReason {
  "id": UUID;
  "name": string;
  /** Из какого справочника запись: deal - crm_loss_reason (почему проиграна сделка), lead - crm_lead_reject_reason (почему лид оказался не наш) */
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
  /** Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md) */
  "amount": string;
}

export interface CRMManagerWorkload {
  "owner_id": number;
  "owner_name"?: string;
  "open_leads": number;
  "open_deals": number;
  "open_conversations": number;
  "won_deals": number;
  /** Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md) */
  "won_amount": string;
  "lost_deals": number;
  /** Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md) */
  "plan_amount"?: string;
  /** Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md) */
  "won_amount_month"?: string;
}

export interface CRMMergeCustomersInput {
  /** Карточки, которые сливаются в эту */
  "sources": Array<UUID>;
}

/** Какие обращения свести в это */
export interface CRMMergeLeadsInput {
  /** Источники: уходят в архив со ссылкой на цель, их переписка и дела переезжают */
  "source_ids": Array<UUID>;
}

export interface CRMMoveDealInput {
  "stage_id": UUID;
  /** Целевая воронка. Пусто или текущая - перенос по этапам своей воронки; другая - сделка переезжает в неё, а stage_id должен быть этапом целевой воронки. Закрытую сделку не переносят */
  "pipeline_id"?: string | null;
  /** Обязательна для стадии категории lost */
  "loss_reason_id"?: string | null;
}

export interface CRMNoteInput {
  "text": string;
  /** Упомянутые коллеги — номера сотрудников из GET /api/v1/crm/members. Засчитывается тот, чьё «@Имя» стоит в тексте заметки */
  "mentioned_user_ids"?: Array<number>;
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
  "label_key"?: CRMLabelKey;
  "sort_order": number;
  "is_default": boolean;
  "is_active": boolean;
  /** Бизнес воронки: её сделки, лиды, ставшие такими сделками, и привязанные диалоги видят участники, чья область доступа касается бизнеса, и ответственные. null — воронка всего кабинета */
  "business_id": UUID | null;
  "stages"?: Array<CRMStage> | null;
  "created_at": string;
  "updated_at": string;
}

export interface CRMPipelineInput {
  "name": string;
  "is_default"?: boolean;
  /** Бизнес воронки. Пусто — единственный бизнес области доступа или весь кабинет (его заводит только доступ ко всем бизнесам). Бизнес вне области доступа — 403 crm.pipeline_business_forbidden */
  "business_id"?: UUID | null;
}

export interface CRMPipelineOverview {
  "pipeline_id": UUID;
  "pipeline_name": string;
  "pipeline_label_key"?: CRMLabelKey;
  "open_count": number;
  /** Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md) */
  "open_amount": string;
  "stages"?: Array<CRMStageOverview> | null;
}

export interface CRMPipelinePatch {
  "name"?: string;
  "is_default"?: boolean;
  "is_active"?: boolean;
  /** Бизнес воронки; поле не передано — не менять, null — весь кабинет. Бизнес вне области доступа — 403 crm.pipeline_business_forbidden */
  "business_id"?: UUID | null;
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

export type CRMRequiredField = string;

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
  /** Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md) */
  "amount": string;
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
  /** Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md) */
  "amount": string;
  "currency"?: string;
}

export interface CRMSettings {
  "lead_lock_mode": CRMLeadLockMode;
  /** Нет, пока кабинет не менял настройки */
  "updated_at"?: string;
}

export interface CRMSettingsPatch {
  "lead_lock_mode"?: CRMLeadLockMode;
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
  "label_key"?: CRMLabelKey;
  "sort_order": number;
  "category": CRMStageCategory;
  "color": string;
  "probability": number;
  /** Норматив пребывания на стадии в часах; 0 - без норматива */
  "sla_hours": number;
  "required_fields": Array<CRMRequiredField> | null;
  "is_active": boolean;
  "show_on_board"?: CRMStageShowOnBoard;
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
  "show_on_board"?: CRMStageShowOnBoard;
}

export interface CRMStageMetric {
  "pipeline_id": string;
  "pipeline_name": string;
  "pipeline_label_key"?: CRMLabelKey;
  "stage_id": string;
  "stage_name": string;
  "stage_label_key"?: CRMLabelKey;
  "category": CRMStageCategory;
  "count": number;
  /** Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md) */
  "amount": string;
}

export interface CRMStageOverview {
  "stage_id": UUID;
  "stage_name": string;
  "stage_label_key"?: CRMLabelKey;
  "category": CRMStageCategory;
  "deal_count": number;
  /** Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md) */
  "deal_amount": string;
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
  "show_on_board"?: CRMStageShowOnBoard;
}

export type CRMStageShowOnBoard = boolean;

/** Одна запись ленты; вид говорит, из какого источника она пришла */
export interface CRMTimelineEntry {
  "id": UUID;
  /** note - заметка сотрудника, system - системный факт или правка полей, stage - смена этапа, decision - решение по лиду, message - сообщение канала, link - связь с задачей, событием или встречей, engagement - дело: звонок, встреча, задача, file - файл прикреплён к записи или удалён */
  "kind": "note" | "system" | "stage" | "decision" | "message" | "link" | "engagement" | "file";
  "at": string;
  "actor_id"?: number;
  "actor_name"?: string;
  /** Заголовок записи: действие, название этапа, решение или направление сообщения */
  "title": string;
  "body"?: string;
  /** Подробности записи. У заметки: mentions - упомянутые коллеги [{id, name}], их имена стоят в тексте как «@Имя» */
  "meta"?: { [key: string]: unknown } | null;
  /** Откуда пришла запись: ui - менеджер в интерфейсе, api - внешний API, automation - робот, import - импорт, merge - слияние дублей, system - система. Пусто у переписки и у старых записей */
  "source"?: "ui" | "api" | "automation" | "import" | "merge" | "system";
  /** Запись, которой принадлежит событие. В ленте клиента это его сделка или лид, а не он сам */
  "record_type"?: "lead" | "deal" | "customer";
  "record_id"?: UUID;
  /** Название записи; заполняется только в ленте клиента */
  "record_title"?: string;
}

export interface CRMUserRef {
  "id": number;
  "display_name": string;
  "username"?: string;
  /** Рабочая почта; по ней импорт узнаёт сотрудника чужой CRM */
  "email"?: string;
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

export interface CalendarCabinet {
  "id": string;
  "slug": string;
  "name": string;
  /** Идентификатор источника в шторке: cabinet:<slug>. */
  "source": string;
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
  "last_error_code": "" | "calendar.connector.internal" | "calendar.connector.credentials_rejected" | "calendar.connector.provider_declined" | "calendar.connector.disconnected";
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
  /** Ссылка на видеовстречу (https). Поля нет, если видеовстречи нет. */
  "conference_url"?: string;
  /** Откуда ссылка: telemost — комната Яндекс Телемоста, personal — постоянная ссылка человека, link — вставлена вручную. */
  "conference_provider"?: "telemost" | "personal" | "link";
  /** Идентификатор конференции Яндекс Телемоста; только при conference_provider=telemost. */
  "conference_id"?: string;
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
  /** Ссылка на видеовстречу: пусто либо абсолютный https:// без пробелов. Если поля видеовстречи не переданы, сервер применяет личную настройку «Для новых встреч»: новая комната Яндекс Телемоста или постоянная ссылка. */
  "conference_url"?: string;
  /** Источник ссылки. telemost без ссылки — сервер заводит комнату Яндекс Телемоста от имени человека; Телемост должен быть подключён в настройках календаря. Пусто при непустой ссылке означает link. */
  "conference_provider"?: "" | "telemost" | "personal" | "link";
  /** Идентификатор конференции Телемоста; для других источников сбрасывается. */
  "conference_id"?: string;
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
  /** Пустая строка убирает видеовстречу. Новая ссылка без conference_provider считается вставленной вручную (link). */
  "conference_url"?: string | null;
  "conference_provider"?: "" | "telemost" | "personal" | "link" | null | null;
  "conference_id"?: string | null;
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
  "department_id"?: string;
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

export interface CalendarSettingsEnvelope {
  "settings": { [key: string]: unknown };
  /** Другие кабинеты человека; их занятость учитывается по профилю, видимость и учёт переключаются в шторке «Календари». Только в ответе GET. */
  "cabinets"?: Array<CalendarCabinet>;
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

export interface ChatAttachmentDownloadSession {
  /** Подписанный абсолютный URL при direct=true; иначе авторизованный относительный путь API. */
  "url": string;
  /** true — адрес хранилища открывается без Authorization. */
  "direct": boolean;
  "expires_at": string;
  "scan_status": "clean";
}

export interface ChatAttachmentPage {
  "items": Array<ChatForwardedAttachment>;
  /** Следующая страница доказана прочитанной строкой за границей текущей, а не тем, что страница оказалась полной. */
  "has_more": boolean;
  /** Курсор следующей страницы; присутствует только вместе с has_more=true. */
  "next_cursor"?: string;
}

export interface ChatConversation {
  "id": UUID;
  "type": "direct" | "group" | "system";
  "status": "active" | "archived";
  "title": string;
  "description": string;
  "last_seq": number;
  "last_message_id": UUID | null;
  "preview"?: ChatMessage;
  "last_message_at": string | null;
  "created_at": string;
  "updated_at": string;
  "capabilities"?: ChatConversationCapabilities;
  "unread_count": number;
  "first_unread_seq": number | null;
  "manual_unread_seq": number | null;
  "notification_mode": string;
  "mention_count": number;
  "origin"?: string;
  "origin_ref"?: UUID | null;
  "last_read_seq"?: number;
  "others_read_seq"?: number;
  "has_avatar"?: boolean;
  "avatar_url"?: string;
  "peer_user_id"?: number | null;
  "peer_avatar_url"?: string;
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

export interface ChatEnsureDirect {
  "peer_user_id": number;
}

export interface ChatEnsureDirectResult {
  "conversation_id": UUID;
  "created": boolean;
}

export interface ChatEntityConversation {
  "conversation_id": UUID;
  "title": string;
  "deep_link": string;
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

export interface ChatMember {
  "user_id": number;
  "display_name": string;
  "avatar_url": string;
  "role": "owner" | "moderator" | "member" | "readonly";
  /** Человека больше нет в справочнике кабинета: членство или учётная запись выключены. Он остаётся в составе беседы, потому что его сообщения в ней остались и подпись под ними обязана кем-то называться. Пустое display_name означает, что о нём не осталось даже имени — подписывать такую строку клиент решает сам. */
  "is_former": boolean;
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
  "reply_to_message_id"?: string | null;
  /** Цитата части исходного сообщения; поля нет, когда ответ на сообщение целиком, исходное удалено или недоступно */
  "reply_quote"?: string;
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

export interface ChatNotificationModeInput {
  "mode": "all" | "mentions" | "muted";
}

export interface ChatNotificationModeResult {
  "mode": "all" | "mentions" | "muted";
  "changed": boolean;
}

export interface ChatPeoplePage {
  "items": Array<ChatPerson>;
  "has_more": boolean;
  /** Присутствует только когда есть следующая страница коллег */
  "next_offset"?: number;
}

export interface ChatPerson {
  "user_id": number;
  "display_name": string;
  "avatar_url": string;
  "is_self": boolean;
}

export interface ChatPresencePage {
  "items": Array<ChatPresencePageItemsItem>;
}

export interface ChatPresencePageItemsItem {
  "user_id": number;
  "typing": boolean;
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

export interface ChatSendMessage {
  /** Ключ идемпотентности отправки. Уникален в пределах беседы и отправителя: повтор с тем же ключом не заводит второе сообщение, а возвращает уже отправленное. Заголовок Idempotency-Key эта операция не читает */
  "client_message_id": { [key: string]: unknown };
  /** Текст сообщения; без attachment_ids обязателен, с ними — подпись к вложениям и может быть пустым. Предел считается в кодовых точках, а не в байтах: сервер режет по 10 000 кодовых точек */
  "body"?: string;
  /** Сообщение этой беседы, на которое отвечает новое */
  "reply_to_message_id"?: { [key: string]: unknown };
  "mention_user_ids"?: Array<number>;
  /** Готовые вложения этой беседы — id из завершения сессии загрузки или из списка вложений. Не сочетаются с mention_user_ids в одном сообщении */
  "attachment_ids"?: Array<UUID>;
  /** Цитата части исходного сообщения, как в Телеграме: дословный кусок его текста, не длиннее 1024 кодовых точек. Только вместе с reply_to_message_id; фрагмента нет в исходном — 404. Пустая строка — ответ на сообщение целиком */
  "reply_quote"?: string;
  /** Сообщение формы «Сообщить об ошибке». В чате поддержки открывает новое обращение и новую заявку, даже если в беседе уже есть открытое; обычное сообщение продолжает открытое. В любой другой беседе — 400 */
  "support_report"?: boolean;
}

export interface ChatSendMessageResult {
  "message": ChatMessage;
  "created": boolean;
}

export interface ChatSendVideoMeeting {
  /** Ключ идемпотентности отправки. Уникален в пределах беседы и отправителя: повтор с тем же ключом не заводит вторую комнату и второе сообщение, а возвращает уже отправленное */
  "client_message_id": { [key: string]: unknown };
}

export interface ChatUnreadMention {
  "message_id": UUID;
  "seq": number;
}

export interface ChatUnreadMentionPage {
  "items": Array<ChatUnreadMention>;
}

export interface ChatUploadInstructions {
  "mode": "post" | "parts" | "api";
  "url"?: string;
  "method"?: string;
  "fields"?: { [key: string]: string };
  "file_field"?: string;
  "part_bytes"?: number;
  "part_count"?: number;
  "direct_urls"?: { [key: string]: string };
  "requires_authorization"?: boolean;
  "max_bytes": number;
  "expires_at": string;
}

export interface ChatUploadSession {
  "id": UUID;
  "owner_type": "conversation";
  "owner_id"?: UUID;
  "name": string;
  "mime_type": string;
  "size_bytes": number;
  "sha256"?: string;
  "status": "pending" | "processing" | "attached" | "failed" | "expired";
  "failure"?: string;
  "failure_detail"?: string;
  "scan_status"?: "clean" | "infected" | "skipped";
  "scan_verdict"?: string;
  "published_ref"?: UUID;
  "expires_at": string;
  "created_at": string;
  "completed_at"?: string;
  "upload"?: ChatUploadInstructions;
}

export interface ChatUploadSessionCreate {
  "name": string;
  "mime_type"?: string;
  "size_bytes": number;
  /** Необязательная lowercase SHA-256 сумма файла. */
  "sha256"?: string;
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

export interface CommentUpdate {
  "body"?: string;
  "allow_empty"?: boolean;
}

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
  /** Дата, на которую показаны enabled и required */
  "on"?: string;
  "versions"?: Array<CoreAccountingDimensionVersion>;
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

export interface CoreAccountingDimensionVersion {
  "id": string;
  /** 0001-01-01 — с начала учёта */
  "valid_from": string;
  /** Пусто — запись действует */
  "valid_to"?: string;
  "enabled": boolean;
  "required": boolean;
}

export interface CoreAccountingDimensionVersionInput {
  "valid_from": string;
  "enabled": boolean;
  "required": boolean;
  /** Поправить действующую запись истории вместо новой */
  "edit_open"?: boolean;
}

export interface CoreAccountingPolicy {
  "businesses": Array<CoreBusinessPolicy>;
  "companies": Array<CoreCompanyPolicy>;
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

export interface CoreBusiness {
  "id": UUID;
  "name": string;
  "is_active": boolean;
  /** Что считать выручкой — cash это деньги, accrual это сделка */
  "accounting_method": "cash" | "accrual";
  /** Дата перехода на начисление; отсутствует у кассового бизнеса */
  "accrual_from"?: string;
  /** Очищаются ли суммы отчётов от косвенного налога сегодня; gross это полные суммы. Меняется в учётной политике с датой */
  "vat_presentation"?: "gross" | "net";
  /** Дата начала действующей сегодня версии очистки сумм; отсутствует, если версия действует с начала учёта */
  "vat_since"?: string;
  /** Дата переноса бизнеса из 1С: акт поставщика со ссылкой на документ 1С по эту дату включительно принимается без бумаги */
  "onec_migrated_until"?: string;
}

export interface CoreBusinessAccountingMethodInput {
  /** Значение приводится к нижнему регистру */
  "method": "cash" | "accrual";
  /** Дата перехода на начисление; обязательна при accrual и не используется при cash */
  "accrual_from"?: string;
}

export interface CoreBusinessInput {
  "name": string;
  /** Дата переноса из 1С, ГГГГ-ММ-ДД; пустая строка снимает дату, без поля — не меняется */
  "onec_migrated_until"?: string;
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

/** Частичное изменение бизнеса: поле без значения не меняется */
export interface CoreBusinessPatch {
  /** Новое название; без поля — прежнее */
  "name"?: string;
  /** Дата переноса из 1С, ГГГГ-ММ-ДД; пустая строка снимает дату, без поля — не меняется */
  "onec_migrated_until"?: string;
}

export interface CoreBusinessPolicy {
  "id": UUID;
  "name": string;
  "is_active": boolean;
  "accounting_method": "cash" | "accrual";
  "accrual_from"?: string;
  "vat_presentation": Array<CorePolicyVATPresentationVersion>;
  "vat_pending": Array<CorePolicyVATPendingVersion>;
  /** Срок авансового отчёта, дней (ERP-1176); пусто — умолчание 30 */
  "accountable_days"?: Array<CorePolicyAccountableDaysVersion>;
  /** Статьи выручки исполнений продажи или закупки по виду строки (этап 4 ERP-1427) */
  "revenue_items"?: Array<CoreOrderRevenueItemRule>;
}

export interface CoreChange {
  /** Имя сущности из реестра ленты (core.contact) */
  "entity": string;
  /** Идентификатор объекта в его собственном API */
  "id": string;
  "op": CoreChangeOp;
  /** Момент изменения. Для человека и для журнала; порядок ленты задаёт не он, а фиксация транзакции, поэтому фильтровать по нему на своей стороне нельзя */
  "changed_at": string;
}

export interface CoreChangeFeedPage {
  /** Сущности, которые эта лента обслуживает предъявителю */
  "entities": Array<string>;
  /** Число строк, а не прогонов */
  "count": number;
  "limit": number;
  /** «В этом прогоне есть ещё». Ложь закрывает прогон, а не кабинет: следующий запрос увидит случившееся после */
  "has_more": boolean;
  /** Непрозрачная строка. Возвращается как есть; разбирать и собирать её нельзя */
  "cursor": string;
  "changes": Array<CoreChange>;
}

export type CoreChangeOp = "upsert" | "delete";

export interface CoreCompanyPolicy {
  "id": UUID;
  "name": string;
  "is_active": boolean;
  "business_id": UUID;
  "tax_mode": Array<CorePolicyTaxModeVersion>;
  "vat_rates": Array<CorePolicyVATRatesVersion>;
  /** Система налогообложения с историей (ERP-1579) */
  "tax_regime"?: Array<CorePolicyTaxRegimeVersion>;
  /** Юрлицо — ИП (вид организации в карточке): доступны ПСН, НПД и патент */
  "sole_proprietor"?: boolean;
  /** Вся ли зарплата в бухгалтерии и источник официальной части, с историей (ERP-1700); пусто — вся официальная */
  "payroll_official"?: Array<CorePolicyPayrollOfficialVersion>;
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
  "legal_address": CoreContactAddress;
  /** Почтовый адрес для писем и печатных форм (ERP-1782). Из реестра ФНС не приходит: автозаполнение по ИНН его не меняет */
  "postal_address": CoreContactPostalAddress;
  "bank_name": string;
  "bank_bic": string;
  "bank_account": string;
  "external_id": string;
  "custom": { [key: string]: unknown };
  "is_active": boolean;
  "created_at": string;
  "updated_at": string;
  /** Нерезидент: страна регистрации кодом ISO 3166 (две буквы). Пусто — Россия. */
  "country"?: string;
  /** Нерезидент: налоговый номер страны регистрации вместо ИНН. */
  "tax_number"?: string;
  /** Код системного контрагента (fns, sfr, bank:<БИК>). Только чтение. */
  "system_key"?: string;
  /** Что подсветить в реквизитах по правилу ИНН. Пусто — всё в порядке. */
  "requisites_issue"?: "" | "inn_missing" | "inn_invalid" | "kpp_invalid" | "foreign_tax_missing" | "country_invalid";
}

/** Почтовый адрес для писем и печатных форм (ERP-1782). Из реестра ФНС не приходит: автозаполнение по ИНН его не меняет */
export interface CoreContactPostalAddress {
  "postal_code": string;
  /** Код субъекта РФ для формализованного документа */
  "region_code": string;
  "region_name": string;
  "district": string;
  "city": string;
  "settlement": string;
  "street": string;
  "building": string;
  "block": string;
  /** Офис или помещение */
  "flat": string;
  "info": string;
}

export interface CoreContactAddress {
  "postal_code": string;
  /** Код субъекта РФ для формализованного документа */
  "region_code": string;
  "region_name": string;
  "district": string;
  "city": string;
  "settlement": string;
  "street": string;
  "building": string;
  "block": string;
  /** Офис или помещение */
  "flat": string;
  "info": string;
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
  "legal_address"?: CoreContactAddress;
  /** Почтовый адрес для писем и печатных форм (ERP-1782). Из реестра ФНС не приходит: автозаполнение по ИНН его не меняет */
  "postal_address"?: CoreContactCreatePostalAddress;
  "bank_name"?: string;
  "bank_bic"?: string;
  "bank_account"?: string;
  "external_id"?: string;
  /** Нерезидент: страна регистрации кодом ISO 3166 (две буквы). */
  "country"?: string;
  /** Нерезидент: налоговый номер страны регистрации вместо ИНН. */
  "tax_number"?: string;
  "custom"?: { [key: string]: unknown };
}

/** Почтовый адрес для писем и печатных форм (ERP-1782). Из реестра ФНС не приходит: автозаполнение по ИНН его не меняет */
export interface CoreContactCreatePostalAddress {
  "postal_code": string;
  /** Код субъекта РФ для формализованного документа */
  "region_code": string;
  "region_name": string;
  "district": string;
  "city": string;
  "settlement": string;
  "street": string;
  "building": string;
  "block": string;
  /** Офис или помещение */
  "flat": string;
  "info": string;
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
  "legal_address"?: CoreContactAddress;
  /** Почтовый адрес для писем и печатных форм (ERP-1782). Из реестра ФНС не приходит: автозаполнение по ИНН его не меняет */
  "postal_address"?: CoreContactPatchPostalAddress;
  "bank_name"?: string;
  "bank_bic"?: string;
  "bank_account"?: string;
  "external_id"?: string;
  "country"?: string;
  "tax_number"?: string;
  "custom"?: { [key: string]: unknown };
  "is_customer"?: boolean;
  "is_supplier"?: boolean;
  "folder_id"?: UUID | null;
}

/** Почтовый адрес для писем и печатных форм (ERP-1782). Из реестра ФНС не приходит: автозаполнение по ИНН его не меняет */
export interface CoreContactPatchPostalAddress {
  "postal_code": string;
  /** Код субъекта РФ для формализованного документа */
  "region_code": string;
  "region_name": string;
  "district": string;
  "city": string;
  "settlement": string;
  "street": string;
  "building": string;
  "block": string;
  /** Офис или помещение */
  "flat": string;
  "info": string;
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
  /** Значения своих полей кабинета (графы вида core.document.<ключ вида>). Отдаёт карточка документа; списки поле не несут */
  "custom"?: { [key: string]: unknown };
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
  /** Код отказа проводчика внутри причины (например stock_backdated_conflict); detail для него собран на языке запроса. */
  "detail_code"?: string;
  /** Параметры отказа с кодом detail_code: из них собрана фраза detail. */
  "detail_params"?: { [key: string]: string };
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

/** Временный адрес файла core: подписанный адрес хранилища или адрес этого API. */
export interface CoreDownloadLink {
  "url": string;
  "method": "GET";
  /** true — подписанный адрес хранилища, без заголовка авторизации; false — адрес этого API, с авторизацией */
  "direct": boolean;
  /** true — адрес требует токен API, агенту по MCP он недоступен */
  "requires_authorization": boolean;
  /** Срок подписанного адреса; у адреса API его нет */
  "expires_at"?: string;
  "name": string;
  "mime_type": string;
  "size_bytes": number;
  /** Контрольная сумма SHA-256, если известна */
  "sha256"?: string;
  /** Вердикт антивируса у файла от человека; skipped — файл антивирус не проверял */
  "scan_status"?: "clean" | "skipped";
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
  /** Пусто у чужой карточки без права core.employee_requisites:read */
  "phone": string;
  /** Пусто у чужой карточки без права core.employee_requisites:read */
  "email": string;
  "user_id": number | null;
  "username": string;
  "role_name": string;
  /** Date or empty string */
  "employed_at": string;
  "is_active": boolean;
  /** Пусто у чужой карточки без права core.employee_requisites:read */
  "notes": string;
  "has_photo": boolean;
  "created_at": string;
  "updated_at": string;
  /** ИНН для выплаты; пусто у чужой карточки без права core.employee_requisites:read */
  "inn"?: string;
  /** БИК банка выплаты; пусто у чужой карточки без права core.employee_requisites:read */
  "bank_bic"?: string;
  /** Счёт или карта выплаты; пусто у чужой карточки без права core.employee_requisites:read */
  "bank_account"?: string;
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

export interface CoreEmployeePage {
  "count": number;
  /** Применённый размер страницы — после зажима до потолка */
  "limit": number;
  /** Применённое смещение */
  "offset": number;
  "results": Array<CoreEmployee>;
}

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
  /** Статья внутреннего оборота между ЦФО; обороты исключаются из сводного ОПиУ (ERP-1493) */
  "internal_turnover"?: boolean;
  "pnl_sign"?: number;
  "is_system": boolean;
  "pnl_parent_id"?: UUID;
  "pnl_sort_order": number;
  "usage_count": number;
  /** Вид ставки НДС сделки без товара по статье дохода; пусто — общая */
  "vat_kind"?: "" | "general" | "reduced" | "zero" | "exempt";
}

export interface CoreItemInput {
  "code"?: string;
  "name": string;
  "use_cashflow"?: boolean;
  "cashflow_section"?: "operating" | "investing" | "financing" | "transfer";
  "cashflow_parent_id"?: UUID;
  "cashflow_sort_order"?: number;
  "use_pnl"?: boolean;
  /** Статья внутреннего оборота между ЦФО; обороты исключаются из сводного ОПиУ (ERP-1493) */
  "internal_turnover"?: boolean;
  "pnl_sign"?: number;
  "pnl_parent_id"?: UUID;
  "pnl_sort_order"?: number;
  /** Вид ставки НДС статьи дохода; не передан — не меняется; у статьи не дохода — 400 */
  "vat_kind"?: "" | "general" | "reduced" | "zero" | "exempt";
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

/** Бланк юрлица. Ключи файлов наружу не отдаются: images говорит только, есть ли картинка на месте. */
export interface CoreLetterhead {
  "company_id": UUID;
  "version": number;
  "director_name"?: string;
  "director_title"?: string;
  "accountant_name"?: string;
  "accountant_title"?: string;
  "bank_account_id"?: UUID | null;
  "print_facsimile"?: boolean;
  "images": CoreLetterheadImages;
}

export interface CoreLetterheadImages {
  "logo": boolean;
  "stamp": boolean;
  "director_signature": boolean;
  "accountant_signature": boolean;
}

export interface CoreMarkingGroup {
  "id": UUID;
  /** Устойчивый код группы. У групп Akeda — код товарной группы «Честного знака»; у групп кабинета выдаётся сервером с префиксом own-. */
  "code": string;
  "name": string;
  "accounting_mode": CoreMarkingGroupMode;
  /** Дата (ГГГГ-ММ-ДД), с которой группа с режимом volume учитывается поштучно; пустая строка — перехода нет. */
  "piece_from": string;
  /** Префиксы кода ТН ВЭД, по которым группа подсказывается товару. */
  "tnved": Array<string>;
  /** Правила группы ведёт Akeda: кабинет может изменить только её название, но не правила, активность и не может удалить. */
  "is_system": boolean;
  "is_active": boolean;
  "sort_order": number;
  "created_at": string;
  "updated_at": string;
}

export interface CoreMarkingGroupCreate {
  "name": string;
  "accounting_mode"?: CoreMarkingGroupMode;
  /** Дата перехода на поштучный учёт, ГГГГ-ММ-ДД; допустима только с режимом volume. */
  "piece_from"?: string;
  /** Префиксы кода ТН ВЭД: только цифры, от 2 до 10 знаков. */
  "tnved"?: Array<string>;
  /** Место в списке. Не прислано — группа встаёт после всех существующих групп кабинета. */
  "sort_order"?: number;
}

export type CoreMarkingGroupMode = "" | "piece" | "volume";

export interface CoreMarkingGroupPage {
  "count": number;
  "results": Array<CoreMarkingGroup>;
}

export interface CoreMarkingGroupPatch {
  "name"?: string;
  "accounting_mode"?: CoreMarkingGroupMode;
  /** Дата перехода на поштучный учёт, ГГГГ-ММ-ДД; пустая строка снимает дату. Допустима только с режимом volume. */
  "piece_from"?: string;
  /** Префиксы кода ТН ВЭД: только цифры, от 2 до 10 знаков. */
  "tnved"?: Array<string>;
  "sort_order"?: number;
  "is_active"?: boolean;
}

export type CoreNumberReset = "year" | "never";

export type CoreNumberSource = "sequence" | "sequence_or_given" | "external";

/** Продажа или закупка — документ ядра. В журнале строка без obligation и allowed_actions; карточка и ответы команд несут обе. */
export interface CoreOrder {
  "id": UUID;
  "side": CoreOrderSide;
  "type_key": "customer_order" | "supplier_order";
  "number": string;
  "date": string;
  "document_status": CoreDocumentStatus;
  "state": CoreOrderState;
  "business_id": UUID;
  "company_id"?: UUID;
  "contact_id": UUID;
  "business_name"?: string;
  "company_name"?: string;
  "contact_name"?: string;
  "contract_id"?: UUID;
  /** Номер договора продажи или закупки — для экрана */
  "contract_number"?: string;
  /** Дата договора продажи или закупки — для экрана */
  "contract_date"?: string;
  "progress"?: CoreOrderProgress;
  "project_id"?: UUID;
  /** Подразделение продажи или закупки — элемент справочника «Подразделения»; наследуют исполнения и себестоимость (КЦ § 4.4) */
  "department_id"?: { [key: string]: unknown };
  /** ЦФО продажи или закупки — элемент справочника «ЦФО»; наследуют исполнения и себестоимость (КЦ § 4.4) */
  "cfo_id"?: { [key: string]: unknown };
  /** Статья исполнений продажи или закупки (выручка у продажи, расход у закупки); пусто — правило учётной политики по виду строки, иначе системная статья */
  "pnl_item_id"?: { [key: string]: unknown };
  /** Бизнес продажи или закупки прошёл отсечку этапа 4: исполнение закрывает вклад регистра «Продажи и закупки» и признаёт выручку; «Сделать акт» в документообороте выпускает бумагу и проводит исполнение одной командой */
  "execution_cutover"?: boolean;
  "warehouse_id"?: UUID;
  "basis_id"?: UUID;
  "title": string;
  "currency": string;
  "prices_include_vat": boolean;
  /** Скидка на продажу или закупку целиком, как её ввели; в суммах строк уже учтена */
  "discount": string;
  "delivery_date"?: string;
  "due_date"?: string;
  "scenario": string;
  "manager_note"?: string;
  "comment"?: string;
  "buyer"?: CoreOrderBuyer;
  "source_kind": CoreOrderSourceKind;
  "source_system"?: string;
  "external_id"?: string;
  "cabinet_status_id"?: UUID;
  "cabinet_status_name"?: string;
  "funnel_id"?: UUID;
  "version": number;
  "closed_at"?: string;
  "closed_reason"?: string;
  "close_document_id"?: UUID;
  "migrated_from"?: string;
  "lines": Array<CoreOrderLine>;
  "responsibles": Array<CoreOrderResponsible>;
  /** Этапы работ продажи или закупки (этап 4 ERP-1427) */
  "stages"?: Array<CoreOrderStage>;
  /** График оплат продажи или закупки; id строки — разрез stage регистра расчётов */
  "payment_terms"?: Array<CoreOrderPaymentTerm>;
  "totals": CoreOrderTotals;
  "created_by"?: number;
  "created_at": string;
  "updated_at": string;
  "posted_at"?: string;
  "cancelled_at"?: string;
  "obligation"?: CoreOrderObligation;
  /** Только в карточке и ответах команд */
  "allowed_actions"?: Array<CoreOrderAllowedAction>;
  /** Только в карточке: строки со ставкой, названной человеком, равной прежней общей ставке юрлица, когда на сегодня общая ставка уже другая — «проверьте ставку», не отказ */
  "vat_warnings"?: Array<CoreOrderVATWarning>;
}

export interface CoreOrderAllowedAction {
  "action": "edit" | "confirm" | "cancel" | "close" | "reopen" | "cabinet_status" | "responsibles" | "contract";
  "allowed": boolean;
  /** Код отказа: core.trade.has_executions, core.trade.has_dependents (оплаты, авансы, черновики исполнений), core.trade.closed, core.trade.forbidden */
  "reason_code"?: string;
  /** Причина словами на языке запроса */
  "reason"?: string;
}

/** Покупатель-физлицо: розничный продажа или закупка стоит на общей карточке покупателя, и различает покупателей только это. */
export interface CoreOrderBuyer {
  "name"?: string;
  "phone"?: string;
  "email"?: string;
}

export interface CoreOrderCabinetStatusInput {
  "status_id": UUID;
}

export interface CoreOrderCloseInput {
  /** Почему остаток больше не нужен */
  "reason"?: string;
}

/** Покупатель загрузки без id: юрлицо узнаётся по ИНН и КПП, физлицо — по телефону или заводится. */
export interface CoreOrderCounterparty {
  "name"?: string;
  "inn"?: string;
  "kpp"?: string;
  "phone"?: string;
  "email"?: string;
}

export interface CoreOrderEvent {
  "id": UUID;
  "order_id": UUID;
  /** created, revised, confirmed, cancelled, closed, reopened, status, responsibles, import, migrated, executing, executed, execution_reverted (состояние исполнения сменилось само после акта, отгрузки, приёмки, их отмены или возврата: payload state, previous_state, baseline — true у строки досева продажи или закупки, исполненного до появления этих событий, без вебхука; автор — система; execution_reverted — продажа или закупка снова confirmed), step (срок шага воронки: payload step_key, step_title, due_date, previous_due_date, shifted), automation (сработало правило: payload rule_id, rule_name, funnel_name, event_type, commands, failed) */
  "kind": string;
  "detail"?: string;
  "effective_date"?: string;
  "status_id"?: UUID;
  "actor_id"?: number;
  "actor_kind"?: "user" | "app" | "system";
  "actor_name"?: string;
  "status_name"?: string;
  /** Разница версий: у revised — версия и что изменилось */
  "payload"?: { [key: string]: unknown };
  "created_at": string;
}

export interface CoreOrderFunnel {
  "id": UUID;
  "side": "sale" | "purchase";
  "name": string;
  "source": string;
  "is_default": boolean;
  "is_archived": boolean;
  "version": number;
  "steps": Array<CoreOrderFunnelStep>;
  "stages": Array<CoreOrderFunnelStage>;
  "updated_at": string;
}

export interface CoreOrderFunnelChoice {
  /** null — продажа или закупка без воронки */
  "funnel_id": UUID | null;
}

export interface CoreOrderFunnelInput {
  "side": "sale" | "purchase";
  "name": string;
  /** Источник заказа: общий вид или точное приложение app.издатель.ключ; точное приложение имеет приоритет. Пусто — по источнику не выбирать */
  "source"?: string;
  /** Воронка стороны по умолчанию — одна на сторону */
  "is_default"?: boolean;
  "is_archived"?: boolean;
  "steps"?: Array<CoreOrderFunnelStep>;
  "stages"?: Array<CoreOrderFunnelStage>;
}

export interface CoreOrderFunnelList {
  "funnels": Array<CoreOrderFunnel>;
}

export interface CoreOrderFunnelStage {
  "id"?: UUID;
  "name": string;
  "category": CoreOrderState;
  "color"?: string;
  "position"?: number;
}

export interface CoreOrderFunnelStep {
  /** Пусто — вид и номер шага */
  "key"?: string;
  "kind": "contract" | "approval" | "prepayment_invoice" | "payment" | "shipment" | "act" | "upd" | "closing" | "custom";
  "title": string;
  /** Участвует ли шаг в воронке: ненужный шаг продаже или закупке не строится */
  "required"?: boolean;
  "due"?: CoreOrderFunnelStepDue;
  /** Что закрывает шаг: manual — человек отметит (пусто так же); state:<состояние> — продажа или закупка дошёл до состояния; paid:<N> — оплачено не меньше N % суммы продажи или закупки (финансы); paper:act_signed, paper:upd_signed — контрагент подписал акт или УПД в ЭДО (документооборот) */
  "done_when"?: string;
  /** За сколько дней до срока прийти событию «срок подходит» */
  "remind_days"?: number;
}

export interface CoreOrderFunnelStepDue {
  /** От чего считается срок; пусто — без срока */
  "after"?: "" | "created" | "confirmed" | "delivery_date";
  "days"?: number;
}

export interface CoreOrderFunnelTemplate {
  "key": string;
  "name": string;
  "description": string;
  "funnel": CoreOrderFunnelInput;
}

export interface CoreOrderFunnelTemplateList {
  "templates": Array<CoreOrderFunnelTemplate>;
}

export interface CoreOrderFunnelVersion {
  "version": number;
  "document": CoreOrderFunnelInput;
  "author_user_id"?: number;
  "created_at": string;
}

export interface CoreOrderFunnelVersionList {
  "versions": Array<CoreOrderFunnelVersion>;
}

export interface CoreOrderFunnelView {
  "funnel_id"?: UUID;
  "funnel_name"?: string;
  "steps": Array<CoreOrderStepState>;
}

export interface CoreOrderHistory {
  "events": Array<CoreOrderEvent>;
  "documents": Array<CoreOrderHistoryDocument>;
}

/** Документ модуля, выросший из продажи или закупки: акт, отгрузка, счёт. */
export interface CoreOrderHistoryDocument {
  "source": string;
  "module": string;
  "section": string;
  "id": UUID;
  "kind": string;
  "kind_name"?: string;
  "number": string;
  "date": string;
  "due_date"?: string;
  "amount"?: string;
  "currency"?: string;
  "direction"?: string;
  /** Эквайер подтверждённой оплаты картой; только у документа оплаты. Внешний номер платежа не раскрывается. */
  "provider"?: string;
  "status": string;
  "status_name"?: string;
  "title"?: string;
  "created_at": string;
}

export interface CoreOrderImportEntry {
  "id": UUID;
  "side": CoreOrderSide;
  "external_id": string;
  "source": string;
  "outcome": "accepted" | "updated" | "rejected";
  "reason"?: string;
  "detail"?: string;
  "order_id"?: UUID;
  "created_at": string;
}

export interface CoreOrderImportInput {
  "side": CoreOrderSide;
  /** Свой номер; пусто — номер выдаёт счётчик вида */
  "number"?: string;
  "date": string;
  "business_id"?: UUID;
  "company_id"?: UUID;
  /** Контрагент; у загрузки вместо него можно прислать counterparty */
  "contact_id"?: UUID;
  "counterparty"?: CoreOrderCounterparty;
  "contract_id"?: UUID;
  "project_id"?: UUID;
  /** Подразделение продажи или закупки — элемент справочника «Подразделения»; наследуют исполнения и себестоимость (КЦ § 4.4) */
  "department_id"?: { [key: string]: unknown };
  /** ЦФО продажи или закупки — элемент справочника «ЦФО»; наследуют исполнения и себестоимость (КЦ § 4.4) */
  "cfo_id"?: { [key: string]: unknown };
  "warehouse_id"?: UUID;
  /** Основание — например, заявка на закупку */
  "basis_id"?: UUID;
  "title"?: string;
  "currency": string;
  /** Цены с НДС («в том числе»); по умолчанию true */
  "prices_include_vat"?: boolean;
  /** Скидка на продажу или закупку целиком; раскладывается по строкам пропорционально их суммам до НДС */
  "discount"?: string;
  "delivery_date"?: string;
  "due_date"?: string;
  "scenario"?: "one_off_sale" | "contract_sale" | "self_service";
  "manager_note"?: string;
  "comment"?: string;
  "buyer"?: CoreOrderBuyer;
  "lines": Array<CoreOrderLineInput>;
  "responsibles"?: Array<CoreOrderResponsible>;
  "cabinet_status_id"?: UUID;
  /** Подтвердить продажу или закупку, если он ещё черновик */
  "confirm"?: boolean;
  /** Номер продажи или закупки у источника; по стороне и нему узнаётся повтор */
  "external_id": string;
  /** Имя источника для журнала загрузок: сайт, CRM */
  "source_system"?: string;
  /** Необязательная действующая воронка этой стороны в данном кабинете. Выбирается атомарно с созданием продажи или закупки; повтор с другим funnel_id возвращает 409, неверная или архивная воронка — 422. Без поля действует воронка договора, источника или умолчание. */
  "funnel_id"?: UUID;
}

export interface CoreOrderImportList {
  "items": Array<CoreOrderImportEntry>;
}

/** Продажа или закупка из запроса: поля одни для формы, загрузки и фасадов модулей. */
export interface CoreOrderInput {
  "side": CoreOrderSide;
  /** Свой номер; пусто — номер выдаёт счётчик вида */
  "number"?: string;
  "date": string;
  "business_id"?: UUID;
  "company_id"?: UUID;
  /** Контрагент; у загрузки вместо него можно прислать counterparty */
  "contact_id"?: UUID;
  "counterparty"?: CoreOrderCounterparty;
  "contract_id"?: UUID;
  "project_id"?: UUID;
  /** Подразделение продажи или закупки — элемент справочника «Подразделения»; наследуют исполнения и себестоимость (КЦ § 4.4) */
  "department_id"?: { [key: string]: unknown };
  /** ЦФО продажи или закупки — элемент справочника «ЦФО»; наследуют исполнения и себестоимость (КЦ § 4.4) */
  "cfo_id"?: { [key: string]: unknown };
  /** Статья исполнений продажи или закупки; не названа при правке — сохраняется прежняя */
  "pnl_item_id"?: { [key: string]: unknown };
  "warehouse_id"?: UUID;
  /** Основание — например, заявка на закупку */
  "basis_id"?: UUID;
  "title"?: string;
  "currency": string;
  /** Цены с НДС («в том числе»); по умолчанию true */
  "prices_include_vat"?: boolean;
  /** Скидка на продажу или закупку целиком; раскладывается по строкам пропорционально их суммам до НДС */
  "discount"?: string;
  "delivery_date"?: string;
  "due_date"?: string;
  "scenario"?: "one_off_sale" | "contract_sale" | "self_service";
  "manager_note"?: string;
  "comment"?: string;
  "buyer"?: CoreOrderBuyer;
  "lines": Array<CoreOrderLineInput>;
  "responsibles"?: Array<CoreOrderResponsible>;
  /** Этапы работ целиком, правка по id; не названы — не меняются */
  "stages"?: Array<CoreOrderStage>;
  /** График оплат целиком, правка по id; не назван — не меняется */
  "payment_terms"?: Array<CoreOrderPaymentTerm>;
  "cabinet_status_id"?: UUID;
  /** Сразу подтвердить созданный продажу или закупку */
  "confirm"?: boolean;
}

export interface CoreOrderLine {
  "id": UUID;
  "position": number;
  "kind": CoreOrderLineKind;
  "product_id"?: UUID;
  "title": string;
  "unit"?: string;
  "unit_id"?: UUID;
  /** Десятичное число строкой */
  "quantity": string;
  /** Десятичное число строкой */
  "price": string;
  /** Скидка самой строки */
  "discount": string;
  /** Доля скидки продажи или закупки на этой строке; суммы строки посчитаны после обеих скидок */
  "discount_amount": string;
  /** Ставка, как её ввели; пусто — по учётной политике */
  "vat_rate"?: string;
  /** Ставка, по которой строка посчитана; пусто — налог не выделен */
  "vat_rate_applied"?: string;
  /** Сумма строкой в разрядности валюты продажи или закупки */
  "amount_net": string;
  /** Сумма строкой в разрядности валюты продажи или закупки */
  "vat_amount": string;
  /** Сумма строкой в разрядности валюты продажи или закупки */
  "amount_gross": string;
  /** Количество в базовой единице склада */
  "base_qty"?: string;
  "basis_document_id"?: UUID;
  "basis_line_id"?: UUID;
}

export interface CoreOrderLineInput {
  /** Id существующей строки — её правка; без id — новая строка */
  "id"?: UUID;
  "kind"?: CoreOrderLineKind;
  "product_id"?: UUID;
  /** Артикул — позиция узнаётся по нему, если id не назван */
  "article"?: string;
  "title": string;
  "unit"?: string;
  "unit_id"?: UUID;
  /** Десятичное число строкой */
  "quantity": string;
  /** Десятичное число строкой */
  "price": string;
  /** Десятичное число строкой */
  "discount"?: string;
  /** Ставка НДС строки; пусто — по учётной политике юрлица на дату продажи или закупки */
  "vat_rate"?: string;
  /** Десятичное число строкой */
  "base_qty"?: string;
  "basis_document_id"?: UUID;
  "basis_line_id"?: UUID;
}

export type CoreOrderLineKind = "goods" | "service" | "material" | "semi_product";

/** Реквизиты акта; пусто — дата продажи или закупки, номер по счётчику, название по продаже или закупке */
export interface CoreOrderNowAct {
  "date"?: string;
  "number"?: string;
  "title"?: string;
  /** «За кого» закупки со статьёй вне ОПиУ: собственник для 75, сотрудник для 70/71; только у закупки */
  "for_contact"?: { [key: string]: unknown };
  /** Номер и дата документа поставщика (СФ, УПД); только у закупки */
  "supplier_document"?: CoreOrderNowActSupplierDocument;
  /** «В т.ч. НДС» с документа поставщика; только у закупки. Без поля — налог заказа по строкам */
  "vat_amount"?: string;
  "source_1c"?: CoreOrderNowSource1C;
}

/** Номер и дата документа поставщика (СФ, УПД); только у закупки */
export interface CoreOrderNowActSupplierDocument {
  "number"?: string;
  "date"?: string;
}

/** Что выпустил владелец исполнения. docflow — бумага документооборота (paper_*), при финансах после отсечки — с учётным документом исполнения (execution_*); finance — акт финансов без бумаги. */
export interface CoreOrderNowExecution {
  "owner": "docflow" | "finance";
  "paper_id"?: UUID;
  "paper_number"?: string;
  /** registered — бумага с проведённым исполнением; draft — бумага без книги (финансы выключены) */
  "paper_status"?: string;
  "execution_id"?: UUID;
  "execution_number"?: string;
}

/** Продажа или закупка целиком, его внешний номер и акт. Поля продажи или закупки — те же, что у загрузки; подтверждение подразумевается. */
export interface CoreOrderNowInput {
  "side": CoreOrderSide;
  /** Свой номер; пусто — номер выдаёт счётчик вида */
  "number"?: string;
  "date": string;
  "business_id"?: UUID;
  "company_id"?: UUID;
  /** Контрагент; вместо него можно прислать counterparty */
  "contact_id"?: UUID;
  "counterparty"?: CoreOrderCounterparty;
  "contract_id"?: UUID;
  "project_id"?: UUID;
  /** Подразделение продажи или закупки — элемент справочника «Подразделения»; наследуют исполнения и себестоимость (КЦ § 4.4) */
  "department_id"?: { [key: string]: unknown };
  /** ЦФО продажи или закупки — элемент справочника «ЦФО»; наследуют исполнения и себестоимость (КЦ § 4.4) */
  "cfo_id"?: { [key: string]: unknown };
  /** Статья выручки (у закупки — расхода) исполнения; пусто — по учётной политике бизнеса */
  "pnl_item_id"?: { [key: string]: unknown };
  "warehouse_id"?: UUID;
  "basis_id"?: UUID;
  "title"?: string;
  "currency": string;
  /** Цены с НДС («в том числе»); по умолчанию true */
  "prices_include_vat"?: boolean;
  "discount"?: string;
  "delivery_date"?: string;
  "due_date"?: string;
  "scenario"?: "one_off_sale" | "contract_sale" | "self_service";
  "manager_note"?: string;
  "comment"?: string;
  "buyer"?: CoreOrderBuyer;
  "lines": Array<CoreOrderLineInput>;
  "responsibles"?: Array<CoreOrderResponsible>;
  "stages"?: Array<CoreOrderStage>;
  "payment_terms"?: Array<CoreOrderPaymentTerm>;
  "cabinet_status_id"?: UUID;
  /** Номер продажи или закупки у источника; по стороне и нему узнаётся повтор */
  "external_id": string;
  /** Имя источника: сайт, CRM, маркетплейс */
  "source_system"?: string;
  "act"?: CoreOrderNowAct;
}

export interface CoreOrderNowResult {
  "order": CoreOrder;
  "execution": CoreOrderNowExecution;
  /** true — продажа или закупка уже был исполнен этой командой; ничего не записано */
  "replayed": boolean;
}

/** Документ 1С, из которого перенесён акт поставщика: до даты переноса бизнеса принимается без бумаги */
export interface CoreOrderNowSource1C {
  /** Ref_Key документа 1С */
  "ref_key": string;
  /** Номер документа в 1С */
  "number"?: string;
  /** Дата документа в 1С */
  "date"?: string;
}

export interface CoreOrderObligation {
  /** Действующий приход подтверждения в регистре «Продажи и закупки» */
  "ordered": string;
  /** Остаток портфеля продажи или закупки в регистре «Продажи и закупки»: заказано минус снятое закрытием. Это не денежный долг: долг контрагента и зачёт аванса живут в расчётах (settlement), и при «Долг 0,00» этот остаток остаётся полным. До этапа 4 исполнение его не уменьшает, поэтому это и не «осталось исполнить» */
  "remaining": string;
  /** Исполнено: сумма проведённых исполнений продажи или закупки (акт, продажа, закупка, приёмка) за вычетом возвратов, в валюте продажи или закупки. То же число, что в журнале продаж и закупок финансов (core_order_executed) */
  "executed": string;
  /** Осталось исполнить: заказано минус исполнено, не меньше нуля */
  "remaining_to_execute": string;
}

export interface CoreOrderPage {
  "items": Array<CoreOrder>;
  /** Сколько продаж или закупок под отбором всего */
  "total": number;
  "limit": number;
  "offset": number;
  "has_more": boolean;
  /** Только с with=counts: число продаж или закупок по состояниям при том же отборе без отбора состояний */
  "state_counts"?: { [key: string]: number };
}

/** Строка графика оплат продажи или закупки — когда и сколько платят (ERP-1427, этап 4). */
export interface CoreOrderPaymentTerm {
  "id"?: UUID;
  "position"?: number;
  "title"?: string;
  "amount"?: string;
  "due_date"?: string;
  /** '' — срок датой; after_stage — через delay_days после исполнения этапа stage_id */
  "due_trigger"?: "" | "after_stage";
  "stage_id"?: UUID;
  "delay_days"?: number;
}

/** Ход продажи или закупки для строки списка (with=progress). executed — исполнено в валюте продажи или закупки; paid — оплачено, нет поля — финансы выключены; papers — счёт, акт и УПД: done — есть, wait — ждём подписи, нет ключа — нет; нет поля — документооборот выключен. */
export interface CoreOrderProgress {
  "executed": string;
  "paid"?: string;
  "papers"?: { [key: string]: "done" | "wait" };
}

export interface CoreOrderResponsible {
  "employee_id": UUID;
  "employee_name"?: string;
  /** Доля в процентах: больше нуля, не больше ста */
  "share": string;
}

export interface CoreOrderResponsiblesInput {
  "responsibles": Array<CoreOrderResponsible>;
}

export interface CoreOrderRevenueItemRule {
  "kind"?: "goods" | "service";
  "item_id"?: UUID;
  "item_name"?: string;
  "valid_from"?: string;
}

export interface CoreOrderRevision {
  "side": CoreOrderSide;
  /** Свой номер; пусто — номер выдаёт счётчик вида */
  "number"?: string;
  "date": string;
  "business_id"?: UUID;
  "company_id"?: UUID;
  /** Контрагент; у загрузки вместо него можно прислать counterparty */
  "contact_id"?: UUID;
  "counterparty"?: CoreOrderCounterparty;
  "contract_id"?: UUID;
  "project_id"?: UUID;
  /** Подразделение продажи или закупки — элемент справочника «Подразделения»; наследуют исполнения и себестоимость (КЦ § 4.4) */
  "department_id"?: { [key: string]: unknown };
  /** ЦФО продажи или закупки — элемент справочника «ЦФО»; наследуют исполнения и себестоимость (КЦ § 4.4) */
  "cfo_id"?: { [key: string]: unknown };
  "warehouse_id"?: UUID;
  /** Основание — например, заявка на закупку */
  "basis_id"?: UUID;
  "title"?: string;
  "currency": string;
  /** Цены с НДС («в том числе»); по умолчанию true */
  "prices_include_vat"?: boolean;
  /** Скидка на продажу или закупку целиком; раскладывается по строкам пропорционально их суммам до НДС */
  "discount"?: string;
  "delivery_date"?: string;
  "due_date"?: string;
  "scenario"?: "one_off_sale" | "contract_sale" | "self_service";
  "manager_note"?: string;
  "comment"?: string;
  "buyer"?: CoreOrderBuyer;
  "lines": Array<CoreOrderLineInput>;
  "responsibles"?: Array<CoreOrderResponsible>;
  /** Этапы работ целиком, правка по id; не названы — не меняются */
  "stages"?: Array<CoreOrderStage>;
  /** График оплат целиком, правка по id; не назван — не меняется */
  "payment_terms"?: Array<CoreOrderPaymentTerm>;
  "cabinet_status_id"?: UUID;
  /** Версия, которую видел правящий; 0 — без сверки */
  "expected_version"?: number;
}

export type CoreOrderSide = "sale" | "purchase";

export type CoreOrderSourceKind = "manual" | "app" | "import" | "marketplace" | "crm" | "migration" | "contract";

/** Этап работ продажи или закупки — что и когда сдаём (ERP-1427, этап 4). */
export interface CoreOrderStage {
  "id"?: UUID;
  "position"?: number;
  "title"?: string;
  "planned_date"?: string;
  /** Сумма этапа в валюте продажи или закупки с налогом */
  "amount"?: string;
  /** Строки продажи или закупки, которые закрывает этап; пусто — строки-услуги по порядку */
  "line_ids"?: Array<UUID>;
}

export type CoreOrderState = "draft" | "confirmed" | "executing" | "executed" | "closed" | "cancelled";

export interface CoreOrderStatus {
  "id": UUID;
  /** Есть только у системной строки */
  "key"?: string;
  /** Пусто — статус годится обеим сторонам */
  "side"?: "" | "sale" | "purchase";
  "name": string;
  "category": CoreOrderState;
  "position": number;
  "color"?: string;
  "is_active": boolean;
  "is_system": boolean;
  "funnel_id"?: UUID;
}

export interface CoreOrderStatusList {
  "items": Array<CoreOrderStatus>;
}

export interface CoreOrderStepDueInput {
  "due_date": string;
  /** Сдвинуть следующие невыполненные шаги с датой на ту же разницу */
  "shift_next"?: boolean;
}

export interface CoreOrderStepState {
  "key": string;
  "kind": string;
  "title": string;
  "position": number;
  "due_date"?: string;
  "done_at"?: string;
  "status": "done" | "overdue" | "waiting";
  /** Что закрывает шаг; manual — отмечает человек */
  "done_when"?: string;
}

export interface CoreOrderTemplate {
  "id": UUID;
  "side": "sale" | "purchase";
  "state": "active" | "paused" | "archived";
  "order": CoreOrderInput;
  "schedule": CoreOrderTemplateSchedule;
  "actions": CoreOrderTemplateActions;
  "resumed_from"?: string;
  "version": number;
  "created_by"?: number;
  "updated_by"?: number;
  "created_at"?: string;
  "updated_at"?: string;
  "contact_name"?: string;
  "contract_number"?: string;
  "contract_date"?: string;
  "department_name"?: string;
  /** Сумма строк шаблона — подсказка списка. */
  "amount": string;
  "upcoming"?: Array<CoreOrderTemplateRun>;
  "last_run"?: string;
  "last_error"?: string;
  /** Причина отказа последнего срабатывания словами. */
  "last_error_text"?: string;
}

export interface CoreOrderTemplateActions {
  /** Провести продажу или закупку сразу; false — черновик. */
  "confirm"?: boolean;
  "invoice"?: "" | "issue" | "draft";
  "invoice_days"?: number;
  "closing"?: "" | "upd" | "act";
  "closing_when"?: "" | "on_order" | "after_days" | "period_end";
  "closing_days"?: number;
}

export interface CoreOrderTemplateInput {
  "order": CoreOrderInput;
  "schedule": CoreOrderTemplateSchedule;
  "actions"?: CoreOrderTemplateActions;
  /** Только при правке. */
  "expected_version"?: number;
}

export interface CoreOrderTemplateList {
  "results": Array<CoreOrderTemplate>;
  "total": number;
}

export interface CoreOrderTemplateRun {
  "key": string;
  "date": string;
  "invoice_date"?: string;
  "closing_date"?: string;
}

export interface CoreOrderTemplateSchedule {
  "period": "month" | "quarter" | "week";
  /** Число месяца или день недели ISO (1 — понедельник). */
  "day": number;
  "from": string;
  "until"?: string;
}

export interface CoreOrderTemplateStateInput {
  "state": "active" | "paused" | "archived";
  "expected_version": number;
}

/** Итоги — сумма строк: скидка продажи или закупки уже разложена по строкам и второй раз не вычитается. */
export interface CoreOrderTotals {
  /** Сумма строкой в разрядности валюты продажи или закупки */
  "net": string;
  /** Сумма строкой в разрядности валюты продажи или закупки */
  "vat": string;
  /** Сумма строкой в разрядности валюты продажи или закупки */
  "gross": string;
  /** Сумма строкой в разрядности валюты продажи или закупки */
  "goods_gross": string;
  /** Сумма строкой в разрядности валюты продажи или закупки */
  "services_gross": string;
  "currency": string;
}

export interface CoreOrderVATWarning {
  "line_id": UUID;
  "title": string;
  /** Ставка строки, названная человеком */
  "rate": string;
  /** Общая ставка юрлица на дату */
  "general": string;
  "date": string;
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

export interface CorePolicyAccountableDaysVersion {
  "id": UUID;
  /** Начало версии; 0001-01-01 означает «с начала учёта» */
  "valid_from": string;
  /** Последний день версии; отсутствует у открытой версии */
  "valid_to"?: string;
  "days": number;
}

export interface CorePolicyPayrollOfficialInput {
  /** 0001-01-01 — с начала учёта */
  "valid_from": string;
  /** Вся начисленная зарплата отражается в бухгалтерии */
  "all_official": boolean;
  /** Источник официальной части; обязателен при all_official = false */
  "payroll_source"?: "manual" | "onec_bp" | "onec_zup";
}

export interface CorePolicyPayrollOfficialVersion {
  "id": UUID;
  /** Начало версии; 0001-01-01 означает «с начала учёта» */
  "valid_from": string;
  /** Последний день версии; отсутствует у открытой версии */
  "valid_to"?: string;
  /** Вся начисленная зарплата отражается в бухгалтерии */
  "all_official": boolean;
  /** Источник официальной части; нет при all_official */
  "source"?: "manual" | "onec_bp" | "onec_zup";
}

export interface CorePolicyPeriod {
  "id": UUID;
  /** Начало версии; 0001-01-01 означает «с начала учёта» */
  "valid_from": string;
  /** Последний день версии; отсутствует у открытой версии */
  "valid_to"?: string;
}

export interface CorePolicyTaxModeVersion {
  "id": UUID;
  /** Начало версии; 0001-01-01 означает «с начала учёта» */
  "valid_from": string;
  /** Последний день версии; отсутствует у открытой версии */
  "valid_to"?: string;
  "mode": "deductible" | "non_deductible" | "none";
  /** Налоговая валюта юрлица: в ней ведутся суммы налога регистров НДС и документа «НДС за квартал». По умолчанию RUB. */
  "tax_currency": string;
}

export interface CorePolicyTaxRegimeInput {
  /** 0001-01-01 — с начала учёта */
  "valid_from": string;
  "regime": "osno" | "usn_income" | "usn_income_expense" | "ausn_income" | "ausn_income_expense" | "eshn" | "psn" | "npd";
  /** Ставка режима, от 0 до 100; обязательна, кроме ПСН и НПД */
  "regime_rate"?: string;
  /** ИП совмещает основной режим с патентом; только ОСНО, УСН или ЕСХН */
  "patent"?: boolean;
}

export interface CorePolicyTaxRegimeVersion {
  "id": UUID;
  /** Начало версии; 0001-01-01 означает «с начала учёта» */
  "valid_from": string;
  /** Последний день версии; отсутствует у открытой версии */
  "valid_to"?: string;
  "regime": "osno" | "usn_income" | "usn_income_expense" | "ausn_income" | "ausn_income_expense" | "eshn" | "psn" | "npd";
  /** Ставка основного режима в процентах с двумя знаками; нет — не задана (у ПСН и НПД необязательна) */
  "rate"?: string;
  /** Вместе с основным режимом ИП применяет патент */
  "patent": boolean;
}

export interface CorePolicyVATPendingVersion {
  "id": UUID;
  /** Начало версии; 0001-01-01 означает «с начала учёта» */
  "valid_from": string;
  /** Последний день версии; отсутствует у открытой версии */
  "valid_to"?: string;
  "months": number;
}

export interface CorePolicyVATPresentationVersion {
  "id": UUID;
  /** Начало версии; 0001-01-01 означает «с начала учёта» */
  "valid_from": string;
  /** Последний день версии; отсутствует у открытой версии */
  "valid_to"?: string;
  "presentation": "gross" | "net";
}

export interface CorePolicyVATRatesVersion {
  "id": UUID;
  /** Начало версии; 0001-01-01 означает «с начала учёта» */
  "valid_from": string;
  /** Последний день версии; отсутствует у открытой версии */
  "valid_to"?: string;
  /** Процент общей ставки с двумя знаками; пусто — вид не заведён */
  "general": string;
  /** Процент льготной ставки с двумя знаками; пусто — вид не заведён */
  "reduced": string;
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
  /** Закупочная цена десятичной строкой; подставляется в строку приёмки */
  "purchase_price": string;
  /** Устарело (ERP-484): снимается, ставка определяется видом товара (vat_kind) и налоговой политикой юрлица на дату документа. Всегда пустая строка */
  "vat_rate": string;
  /** Вид ставки НДС товара: общая, льготная, нулевая, без НДС; пусто — общая. Процент берётся у юрлица на дату документа (учётная политика) */
  "vat_kind"?: "" | "general" | "reduced" | "zero" | "exempt";
  /** Вес одной базовой единицы, кг; пусто — не задан */
  "weight_kg": string;
  /** Объём одной базовой единицы, м³; пусто — не задан */
  "volume_m3": string;
  /** Длина, мм; пусто — не задана */
  "length_mm": string;
  /** Ширина, мм; пусто — не задана */
  "width_mm": string;
  /** Высота, мм; пусто — не задана */
  "height_mm": string;
  /** Страна происхождения — запись справочника countries (код ОКСМ в code) */
  "country_item_id": UUID | null;
  "marking_source"?: CoreProductMarkingSource;
  /** Своя группа маркировки товара; задана только при marking_source = own */
  "marking_group_id"?: UUID | null;
  /** Действующая группа маркировки: своя либо унаследованная от категории; null — товар не маркируется. Считается при чтении и не хранится */
  "effective_marking_group"?: CoreProductEffectiveMarkingGroup | null;
  /** Код ТН ВЭД, до десяти цифр */
  "customs_code": string;
  /** Название страны происхождения; пусто без страны */
  "country_label": string;
  /** Оси характеристик семейства; у остальных записей пусто */
  "option_schema": Array<CoreProductAxis>;
  /** Значения варианта по осям семейства: ось → код; у остальных записей пусто */
  "variant_values": { [key: string]: string };
}

export interface CoreProductAxis {
  /** Ключ оси: латиница, цифры, _ и - */
  "key": string;
  "label": string;
  "values": Array<CoreProductAxisValue>;
}

export interface CoreProductAxisValue {
  /** Машинный код значения: латиница, цифры, _ и - */
  "code": string;
  /** Подпись значения; пусто — код */
  "label": string;
}

export interface CoreProductCategoryMarking {
  "category_id": UUID;
  /** Группа маркировки категории; null — категория группу не задаёт (так отвечает запись, снявшая группу). */
  "marking_group_id": UUID | null;
  "marking_group_name": string;
  "accounting_mode": CoreMarkingGroupMode;
  /** Дата (ГГГГ-ММ-ДД), с которой группа с режимом volume учитывается поштучно; пустая строка — перехода нет. */
  "piece_from": string;
}

export interface CoreProductCategoryMarkingPage {
  "count": number;
  "results": Array<CoreProductCategoryMarking>;
}

export interface CoreProductCategoryMarkingSet {
  /** Группа маркировки категории; null снимает группу. */
  "marking_group_id": UUID | null;
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
  /** Хранится на складе. У услуги (kind=service) всегда false: сочетание service + true отклоняется 400. Позицию со складскими движениями нельзя перевести в услугу или снять с неё признак — 409 (ERP-1547) */
  "is_stockable"?: boolean;
  "is_purchasable"?: boolean;
  "is_producible"?: boolean;
  "category_id"?: UUID | null;
  "record_kind"?: CoreProductRecordKind;
  "parent_product_id"?: UUID | null;
  "custom"?: { [key: string]: unknown };
  /** Штрихкод и артикулы с формы создания; ложатся в той же транзакции, что и карточка. Занятый код отклоняет создание целиком (409). */
  "identifiers"?: Array<CoreProductIdentifierInput>;
  /** Закупочная цена десятичной строкой; подставляется в строку приёмки */
  "purchase_price"?: string;
  /** Вид ставки НДС товара: общая, льготная, нулевая, без НДС; пусто — общая. Процент берётся у юрлица на дату документа (учётная политика) */
  "vat_kind"?: "" | "general" | "reduced" | "zero" | "exempt";
  /** Вес одной базовой единицы, кг; пусто — не задан */
  "weight_kg"?: string;
  /** Объём одной базовой единицы, м³; пусто — не задан */
  "volume_m3"?: string;
  /** Длина, мм; пусто — не задана */
  "length_mm"?: string;
  /** Ширина, мм; пусто — не задана */
  "width_mm"?: string;
  /** Высота, мм; пусто — не задана */
  "height_mm"?: string;
  /** Страна происхождения — запись справочника countries (код ОКСМ в code) */
  "country_item_id"?: UUID | null;
  "marking_source"?: CoreProductMarkingSource;
  /** Своя группа маркировки. Обязательна при marking_source = own; при category и none не передаётся — группа со значением отклоняется 400 */
  "marking_group_id"?: UUID | null;
  /** Код ТН ВЭД, до десяти цифр */
  "customs_code"?: string;
  /** Оси характеристик семейства; у остальных записей пусто */
  "option_schema"?: Array<CoreProductAxis>;
  /** Значения варианта по осям семейства: ось → код; у остальных записей пусто */
  "variant_values"?: { [key: string]: string };
}

export interface CoreProductCustomInput {
  "custom": { [key: string]: unknown };
}

export interface CoreProductEffectiveMarkingGroup {
  "id": UUID;
  "name": string;
  "accounting_mode": CoreMarkingGroupMode;
  /** Дата (ГГГГ-ММ-ДД), с которой группа с режимом volume учитывается поштучно; пустая строка — перехода нет. */
  "piece_from": string;
  /** Категория, от которой группа пришла товару: категория товара или её родитель. null — группа своя. */
  "inherited_from_category_id": UUID | null;
  /** Название категории, от которой пришла группа; пустая строка у своей группы. */
  "inherited_from_category_name": string;
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
  /** Панель карточки, в которой показывается поле; пусто — общая панель дополнительных реквизитов */
  "group": string;
  /** Закреплённая характеристика: под названием в шапке карточки и столбцом каталога */
  "pinned": boolean;
  /** Поле участвует в отборе каталога */
  "filterable": boolean;
  /** Категории (элементы справочника product_categories), у товаров которых и их потомков поле показывается; пусто — у всех */
  "category_ids": Array<UUID>;
  /** Суффикс единицы после значения: кг, мм, мл */
  "unit_suffix": string;
}

export interface CoreProductFieldSchema {
  "fields": Array<CoreProductFieldDefinition>;
}

export interface CoreProductFile {
  "id": UUID;
  "product_id": UUID;
  "kind_item_id": UUID | null;
  /** Код элемента справочника product_file_kinds; пусто без типа */
  "kind_code": string;
  "kind_label": string;
  "name": string;
  "mime_type": string;
  "size_bytes": number;
  "is_image": boolean;
  /** Основное фото товара; бывает только у изображения */
  "is_primary": boolean;
  "sort_order": number;
  "uploaded_by_name": string;
  "created_at": string;
  /** Вердикт антивируса; skipped — файл не проверялся (загружен формой). Ссылку на скачивание получают clean и skipped */
  "scan_status": "pending" | "clean" | "infected" | "skipped";
}

export interface CoreProductFilePage {
  "count": number;
  "results": Array<CoreProductFile>;
}

export interface CoreProductFilePatch {
  /** Код типа из product_file_kinds; пустая строка снимает тип */
  "kind"?: string;
  "name"?: string;
  /** true делает изображение основным фото */
  "is_primary"?: boolean;
}

/** Заявка на сессию загрузки файла или фото товара. */
export interface CoreProductFileUploadRequest {
  /** Имя файла с расширением */
  "name": string;
  /** Тип содержимого; изображения — image/* */
  "mime_type"?: string;
  /** Точный размер файла в байтах */
  "size_bytes": number;
  /** Необязательная контрольная сумма SHA-256 строчными шестнадцатеричными знаками */
  "sha256"?: string;
  /** Код типа файла из справочника product_file_kinds; изображению без кода достаётся photo */
  "kind"?: string;
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
  /** Пространство имён: у артикулов обязателен (производитель, поставщик, код канала из справочника sales_channels); у штрихкода — код активного канала продаж этого кабинета либо global (по умолчанию), иное значение — 400. Значение штрихкода уникально по кабинету независимо от канала */
  "source_ref"?: string;
  "value": string;
  "is_primary"?: boolean;
  /** У штрихкода: type ∈ ean13|ean8|upc_a|gtin14|code128 и product_uom_id упаковки. Названный type проверяется строго, включая контрольную цифру EAN/UPC/GTIN (400 с текстом ошибки). Без type символика угадывается по форме значения, и несошедшаяся контрольная цифра не отказ, а code128: догадка не вправе отвергать существующий код */
  "attrs"?: { [key: string]: unknown };
}

export type CoreProductIdentifierKind = "manufacturer_article" | "supplier_article" | "channel_article" | "barcode";

export interface CoreProductIdentifierPage {
  "count": number;
  "results": Array<CoreProductIdentifier>;
}

export interface CoreProductIdentifierPatch {
  "kind"?: CoreProductIdentifierKind;
  /** Пространство имён: у артикулов обязателен; у штрихкода — код активного канала продаж этого кабинета либо global, иное значение — 400 */
  "source_ref"?: string;
  "value"?: string;
  "is_primary"?: boolean;
  /** У штрихкода: type ∈ ean13|ean8|upc_a|gtin14|code128 и product_uom_id упаковки. Названный type проверяется строго, включая контрольную цифру EAN/UPC/GTIN (400 с текстом ошибки). Без type символика угадывается по форме значения, и несошедшаяся контрольная цифра не отказ, а code128. Поле заменяет объект целиком, а не сливается с прежним */
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

/** Заявка на сессию загрузки файла импорта. filename и size — прежние имена name и size_bytes. */
export interface CoreProductImportUploadSessionRequest {
  "kind": CoreProductTransferKind;
  "mode": CoreProductImportMode;
  /** Имя файла с расширением xlsx, xls, ods, csv или tsv */
  "name"?: string;
  /** Тип содержимого; по умолчанию — по расширению файла */
  "mime_type"?: string;
  /** Точный размер файла в байтах */
  "size_bytes"?: number;
  /** Необязательная контрольная сумма SHA-256 строчными шестнадцатеричными знаками */
  "sha256"?: string;
  /** Прежнее имя поля name */
  "filename"?: string;
  /** Прежнее имя поля size_bytes */
  "size"?: number;
}

export type CoreProductKind = "goods" | "service" | "material" | "semi_product";

export type CoreProductMarkingSource = "category" | "own" | "none";

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
  /** Хранится на складе. У услуги (kind=service) всегда false: сочетание service + true отклоняется 400. Позицию со складскими движениями нельзя перевести в услугу или снять с неё признак — 409 (ERP-1547) */
  "is_stockable"?: boolean;
  "is_purchasable"?: boolean;
  "is_producible"?: boolean;
  "category_id"?: UUID | null;
  "folder_id"?: UUID | null;
  /** Закупочная цена десятичной строкой; подставляется в строку приёмки */
  "purchase_price"?: string;
  /** Вид ставки НДС товара: общая, льготная, нулевая, без НДС; пусто — общая. Процент берётся у юрлица на дату документа (учётная политика) */
  "vat_kind"?: "" | "general" | "reduced" | "zero" | "exempt";
  /** Вес одной базовой единицы, кг; пусто — не задан */
  "weight_kg"?: string;
  /** Объём одной базовой единицы, м³; пусто — не задан */
  "volume_m3"?: string;
  /** Длина, мм; пусто — не задана */
  "length_mm"?: string;
  /** Ширина, мм; пусто — не задана */
  "width_mm"?: string;
  /** Высота, мм; пусто — не задана */
  "height_mm"?: string;
  /** Страна происхождения — запись справочника countries (код ОКСМ в code) */
  "country_item_id"?: UUID | null;
  "marking_source"?: CoreProductMarkingSource;
  /** Своя группа маркировки. Обязательна при marking_source = own; при category и none не передаётся — группа со значением отклоняется 400 */
  "marking_group_id"?: UUID | null;
  /** Код ТН ВЭД, до десяти цифр */
  "customs_code"?: string;
  /** Оси характеристик семейства; у остальных записей пусто */
  "option_schema"?: Array<CoreProductAxis>;
  /** Значения варианта по осям семейства: ось → код; у остальных записей пусто */
  "variant_values"?: { [key: string]: string };
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

export interface CoreSellerBank {
  /** Расчётный счёт получателя */
  "account": string;
  /** Наименование банка */
  "bank": string;
  /** БИК банка */
  "bik": string;
  /** Корреспондентский счёт банка */
  "corr_account": string;
}

export interface CoreSellerCompany {
  "id": UUID;
  /** Имя юрлица в кабинете */
  "name": string;
  /** Полное наименование для счёта */
  "legal_name": string;
  /** ИНН продавца */
  "inn": string;
  /** КПП продавца, если есть */
  "kpp": string;
}

export interface CoreSellerCompanyList {
  "companies": Array<CoreSellerCompany>;
}

export interface CoreTrialBalance {
  "date_from": string;
  "date_to": string;
  "currency": string;
  "rows": Array<CoreTrialBalanceRow>;
  "totals": CoreTrialBalanceTotals;
  "accounting_basis"?: AccountingBasis;
  /** При отборе по юрлицу — итоги проводок без юрлица за тот же период; только при доступе ко всей книге */
  "unassigned_company"?: CoreTrialBalanceUnassignedCompany;
}

/** При отборе по юрлицу — итоги проводок без юрлица за тот же период; только при доступе ко всей книге */
export interface CoreTrialBalanceUnassignedCompany {
  "opening_debit": string;
  "opening_credit": string;
  "turnover_debit": string;
  "turnover_credit": string;
  "closing_debit": string;
  "closing_credit": string;
  "balanced": boolean;
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
  "contact_id"?: UUID;
  "employee_id"?: UUID;
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

/** Итог завершения сессии core: заведённый файл товара, запуск импорта, фото сотрудника или бланк юрлица. */
export interface CoreUploadFinishResult {
  "session": TransferSession;
  "product_file"?: CoreProductFile;
  "product_import"?: CoreProductImportRun;
  "employee_photo"?: CorePhotoResult;
  "letterhead"?: CoreLetterhead;
}

/** Окно, в котором обращения были, а записей о них нет: очередь писателя переполнилась либо база кабинета не приняла пачку. Признание в НАШЕЙ аварии, и печатается оно обеим сторонам — страница без него читалась бы как полная история. Кабинета в окне нет ни у одной из дверей. */
export interface CredentialRequestGap {
  "started_at": string;
  "ended_at": string;
  /** Сколько обращений потеряно в этом окне */
  "dropped": number;
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

export interface DashboardMetricDefinition {
  "id": string;
  "module": string;
  "template": "amount" | "trend" | "rows" | "tiles" | "bars" | "table";
  "title": string;
  "description": string;
  "deeplink": string;
}

export interface DashboardMetricSnapshot {
  "id": string;
  "template": "amount" | "trend" | "rows" | "tiles" | "bars" | "table";
  "title": string;
  "value": string;
  "currency": string;
  "caption": string;
  "as_of": string;
  "deeplink": string;
  "points": Array<DashboardMetricSnapshotPointsItem>;
  "rows": Array<DashboardMetricSnapshotRowsItem>;
  "tiles": Array<DashboardMetricSnapshotTilesItem>;
  "bars": Array<DashboardMetricSnapshotBarsItem>;
  "columns": Array<DashboardMetricSnapshotColumnsItem>;
  "table": Array<DashboardMetricSnapshotTableItem>;
}

export interface DashboardMetricSnapshotPointsItem {
  "label": string;
  "value": string;
}

export interface DashboardMetricSnapshotRowsItem {
  "title": string;
  "value": string;
  "detail": string;
}

export interface DashboardMetricSnapshotTilesItem {
  "label": string;
  "value": string;
  "note": string;
  "tone": "" | "positive" | "negative";
}

export interface DashboardMetricSnapshotBarsItem {
  "title": string;
  "value": string;
  "note": string;
  "fill": number;
  "tone": "" | "positive" | "negative";
}

export interface DashboardMetricSnapshotColumnsItem {
  "title": string;
}

export interface DashboardMetricSnapshotTableItem {
  "title": string;
  "cells": Array<DashboardMetricSnapshotTableItemCellsItem>;
}

export interface DashboardMetricSnapshotTableItemCellsItem {
  "value": string;
  "tone": "" | "positive" | "negative";
}

/**
 * То же обращение глазами издателя. Правило отбора одно: издателю видно только то, что его собственный сервер уже держал в руках — он сам сформировал этот запрос и сам получил этот ответ.
 * 
 * Чего нет: кабинета ни одним полем, идентификатора строки журнала, идентификатора выданного токена (нить в журнал установки, который принадлежит кабинету) и обращений кабинетными ключами.
 */
export interface DeveloperAPICall {
  "installation_id": UUID;
  "method": string;
  /** Шаблон маршрута, который издатель же и звал */
  "route": string;
  "entity": string;
  "shape": "collection" | "record";
  "rows"?: number;
  "bytes": number;
  "status": number;
  /** Машинный код исхода, тот же, что уехал в теле отказа: одно событие не называется в двух местах разными словами */
  "outcome": string;
  /** Сколько отвечали МЫ. Своё время издатель видит с сетью, наше — без */
  "duration_ms": number;
  "occurred_at": string;
}

export interface DeveloperAPICallPage {
  "calls": Array<DeveloperAPICall>;
  "gaps": Array<CredentialRequestGap>;
  "limit": number;
  "offset": number;
  "has_more": boolean;
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

export interface DeveloperAppBlockList {
  "blocks": Array<DeveloperManifestBlock>;
}

export interface DeveloperAppInput {
  /** Ключ приложения: строчные латинские буквы, цифры и дефисы. Издатель приезжает из владельца пространства имён и в теле не называется */
  "key": string;
  /** Название, которое увидит администратор кабинета на экране согласия */
  "title"?: string;
}

export interface DeveloperAppKey {
  "id": UUID;
  "app_id": UUID;
  /** Человеческое имя ключа: вежливость, а не учётные данные */
  "name": string;
  /** Последние знаки значения. Не секрет: по ним ключ не восстанавливается, а без них список не отвечает на вопрос «какой из них отзывать» */
  "hint": string;
  "issued_at": string;
  "issued_by"?: UUID;
  "rotated_from_id"?: UUID;
  "rotated_at"?: string;
  /** Конец перекрытия. Пусто у текущего ключа: он живёт до собственной ротации или отзыва */
  "expires_at"?: string;
  "revoked_at"?: string;
  "revoke_reason": string;
  /** Когда этим ключом ходили в последний раз: единственный ответ на вопрос «можно ли уже отозвать вон тот» */
  "last_used_at"?: string;
}

export interface DeveloperAppKeyInput {
  /** Человеческое имя ключа для списка */
  "name"?: string;
}

export interface DeveloperAppKeyPage {
  "keys": Array<DeveloperAppKey>;
}

export interface DeveloperAppKeyRevocationInput {
  /** Почему ключ погашен */
  "reason"?: string;
}

export interface DeveloperAppKeyRotationInput {
  /** Сколько часов доживает вытесненный ключ. Ноль — умолчание в сутки, а не «без перекрытия» */
  "overlap_hours"?: number;
}

export interface DeveloperAppPage {
  "apps": Array<PlatformApp>;
}

export interface DeveloperAppResult {
  "app": PlatformApp;
}

export interface DeveloperAppVersionInput {
  /** Номер версии */
  "version": string;
  /** Манифест версии целиком */
  "manifest": { [key: string]: unknown };
  /** Digest пакета: без него подмену артефакта не с чем сравнить */
  "manifest_digest"?: string;
  /** Что версия просит; одобряет кабинет при установке */
  "requested_scopes"?: Array<string>;
  /** Отправить версию на ревью вместо черновика. Опубликовать этим полем нельзя: публикация идёт через ворота */
  "review"?: boolean;
}

export interface DeveloperAppVersionPage {
  "app": PlatformApp;
  "versions": Array<PlatformAppVersion>;
}

export interface DeveloperAppVersionResult {
  "version": PlatformAppVersion;
}

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

export interface DeveloperDelivery {
  "id": UUID;
  "event_id": UUID;
  "installation_id": UUID;
  /** Тема подписки, объявленная манифестом самого издателя */
  "topic": string;
  "schema_version": number;
  /** Когда произошёл факт, а не когда его отправили */
  "occurred_at": string;
  "status": "pending" | "delivered" | "failed" | "dead";
  "attempts": number;
  "next_attempt_at": string;
  "delivered_at"?: string;
  "dead_at"?: string;
  /** Код ответа приёмника. Пусто означает, что ответа не было вовсе */
  "last_status_code"?: number;
  /** Адрес установки. Его называет издатель, а не кабинет, поэтому данных кабинета в нём нет по определению */
  "endpoint_url": string;
  /** Каким ключом подписано. Не секрет: по нему приёмник выбирает, чем проверять, во время перекрытия */
  "signature_key_id": string;
  "replay_of_id"?: UUID;
}

export interface DeveloperDeliveryPage {
  "deliveries": Array<DeveloperDelivery>;
  /** Глубина, которая реально применилась */
  "limit": number;
  "offset": number;
  /** Признак, а не общее число: счёт по журналу — полный проход по истории кабинета ради числа, которое никому не нужно точным */
  "has_more": boolean;
}

export interface DeveloperFunctionArtifactRow {
  /** Имя функции внутри приложения. У лишнего модуля его нет: манифест этих байтов не называет */
  "key"?: string;
  /** Ключ точки расширения, на которой стоит функция */
  "point"?: string;
  /** Отпечаток модуля: он и есть имя, под которым байты опознают */
  "digest": string;
  /** Виды документа, на которых функция зовётся. ПУСТОЙ СПИСОК ОЗНАЧАЕТ «на всех», и это то же умолчание, что на экране согласия кабинета. */
  "document_types": Array<string>;
  /** Байты с этим отпечатком лежат у этой версии */
  "uploaded": boolean;
  /** Размер модуля в байтах. Есть только у загруженного */
  "size"?: number;
  /** Когда байты положили. Есть только у загруженного */
  "uploaded_at"?: string;
}

export interface DeveloperFunctionArtifacts {
  "version": string;
  /** Состояние версии. Им объясняется, почему выпущенная версия байтов больше не принимает */
  "status": string;
  /** Версия ещё принимает байты. Отдельным полем: выводить это из состояния — ошибиться в пользу разрешения */
  "editable": boolean;
  "functions": Array<DeveloperFunctionArtifactRow>;
  /** Отпечатки, которые лежат у версии, но манифестом не названы. Байты приняты и вреда не делают, но исполнены не будут никогда: диспетчер ходит от манифеста, а не от хранилища. Чаще всего это пересобранный модуль, под который забыли поправить отпечаток в манифесте. */
  "undeclared": Array<DeveloperFunctionArtifactRow>;
}

export interface DeveloperFunctionArtifactsResult {
  "functions": DeveloperFunctionArtifacts;
}

export interface DeveloperFunctionUpload {
  /** Отпечаток, ПОСЧИТАННЫЙ по байтам. Присланный полем digest к этому моменту уже сверен */
  "digest": string;
  "size": number;
  "created_at": string;
  /** Манифест версии называет этот отпечаток. Загрузка НЕ ОТКАЗЫВАЕТ модулю, которого манифест не называет: байты целы, а виноват может быть и файл, и манифест — какой из двух, решает издатель. Но узнать об этом он обязан сразу, а не от ворот публикации через день. */
  "declared": boolean;
  /** Модуль годен к исполнению: импорты по белому списку, оба экспорта ABI, память в пределах. При выключенной песочнице всегда true — рантайма нет, судить нечем. */
  "verified": boolean;
  /** Машинный код негодности: forbidden_import, abi_missing, module_invalid, verify_failed. Слова на двух языках собирает портал */
  "verify_reason"?: string;
  /** То единственное, чего кодом не сказать: какой именно импорт запрещён, какого экспорта не хватает */
  "verify_detail"?: string;
}

export interface DeveloperFunctionUploadResult {
  "upload": DeveloperFunctionUpload;
}

export interface DeveloperGateCheck {
  /** Какое ворот */
  "gate": "publisher" | "scopes" | "sensitivity" | "endpoints" | "egress" | "manifest" | "scope_review" | "blocklist" | "functions";
  /** `awaiting_review` — ход за персоналом платформы: результат внешнего ворота либо не приносили вовсе, либо приносили для другого документа. Своё состояние, а не `failed`: чинить издателю там нечего, и общий ответ отправил бы его править исправный манифест. */
  "status": "passed" | "failed" | "awaiting_review";
  /** Результат приносит не сервер — по нему видно, чинится ли отказ правкой манифеста */
  "external": boolean;
  /** Машинный код отказа: текст на двух языках собирает портал */
  "reason"?: string;
  /** Что именно не подошло: имена прав, адреса, режим, отпечаток. Всё это издатель подал сам */
  "values"?: Array<string>;
  /** Когда внешнее ворот смотрели в последний раз; у несмотренного его нет */
  "checked_at"?: string;
}

export interface DeveloperInstallation {
  "id": UUID;
  /** Версия, на которой стоит установка */
  "version": string;
  "status": PlatformAppInstallationStatus;
  /** Приёмник признан мёртвым, и данные кабинета встали. Самое важное поле для издателя */
  "parked": boolean;
  "parked_at"?: string;
  "installed_at": string;
  "updated_at": string;
}

export interface DeveloperInstallationPage {
  "installations": Array<DeveloperInstallation>;
}

export interface DeveloperIssuedAppKey {
  "key": DeveloperAppKey;
  /** Значение ключа. Показывается ОДИН РАЗ и больше никогда: в хранилище лежит хеш, и второго способа его узнать не существует */
  "secret": string;
}

/** Тот же запрет, что видит оператор, без одного поля: идентификатора сотрудника платформы, принявшего решение. Внешний контур — не место для наших внутренних идентификаторов, а имя решавшего превращает решение платформы в решение конкретного лица, с которым можно «договориться». */
export interface DeveloperManifestBlock {
  /** sha256 компактной формы документа — тот же отпечаток, который печатает отчёт готовности версии */
  "manifest_fingerprint": string;
  /** Где документ впервые увидели. Улика, а не предмет запрета: тот же отпечаток у другого приложения закрыт этим же запретом */
  "publisher": string;
  "app_key": string;
  "reason_code": "malicious" | "vulnerable" | "data_exfiltration" | "supply_chain" | "publisher_request";
  /** Объяснение словами. Наш текст, а не эхо чьих-то слов: его же читает кабинет в карточке уведомления */
  "summary": string;
  /** Внешний https-адрес разбора: CVE, бюллетень, тикет */
  "advisory"?: string;
  "blocked_at": string;
}

export interface DeveloperProfile {
  "account": DeveloperAccount;
  "application"?: DeveloperApplication;
  /** Издатели, которыми распоряжается аккаунт */
  "publishers": Array<PlatformAppPublisher>;
}

export interface DeveloperPublicationReport {
  "version": string;
  /** Состояние версии: черновик, на ревью, опубликована */
  "status": string;
  /** Канал, объявленный манифестом этой версии */
  "channel": string;
  /** Состояние СВОЕГО издателя: оно объясняет ворот publisher */
  "publisher_status": string;
  /** Отпечаток текущего манифеста: им запрет называет предмет, и по нему видно, что документ поменялся после проверки */
  "manifest_fingerprint": string;
  /** Все обязательные ворота пройдены. Отдельным полем: выводить готовность из списка — ошибиться в пользу разрешения */
  "ready": boolean;
  "checks": Array<DeveloperGateCheck>;
}

export interface DeveloperPublicationResult {
  "publication": DeveloperPublicationReport;
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

/** Учётный документ кабинета, заведённый приёмкой. */
export interface DocflowAcceptedDocument {
  "id": UUID;
  /** Наш номер из нумератора кабинета. Номер продавца лежит в содержимом документа: занять им наш сквозной счётчик значит однажды получить два своих документа с одним номером от двух разных поставщиков */
  "number": string;
  /** Дата документа ГГГГ-ММ-ДД. По умолчанию это дата документа поставщика: операция произошла тогда, когда её совершил он, и датировать её днём приёмки значит поставить факт не в тот период */
  "date": string;
  /** Ключ вида документа; у приёмки docflow_incoming */
  "type_key": string;
  /** Имя вида в кабинете. Право клиента: вид можно переименовать, и код держит его за ключ, а не за название */
  "type_name": string;
  /** Состояние учётного документа. Приёмка заводит ЧЕРНОВИК: проведение принадлежит модулям — владельцам регистров */
  "status": string;
  /** Документ помечен на удаление. Такой пакет принимается заново: пометка и есть способ сказать «этот документ ошибочный» */
  "marked_deleted": boolean;
  /** Момент приёмки; пусто, если он не записан */
  "accepted_at": string;
}

export interface DocflowAdvanceInvoiceInput {
  "advance_id": UUID;
  /** Дата счёта-фактуры; пусто — дата получения аванса */
  "date"?: string;
}

/** Покупатель человеческими ключами. ИНН узнаётся строго; телефон — признак физлица. Имя, телефон и почта остаются в продаже или закупке как реквизиты плательщика */
export interface DocflowAppSalesOrderCounterparty {
  "name"?: string;
  "inn"?: string;
  "kpp"?: string;
  "phone"?: string;
  "email"?: string;
}

export interface DocflowAppSalesOrderInput {
  "company_id": UUID;
  "contact_id"?: UUID;
  "contract_document_id"?: UUID;
  "counterparty"?: DocflowAppSalesOrderCounterparty;
  /** Необязательная действующая воронка продаж этого кабинета; повтор с другой воронкой отвечает 409 */
  "funnel_id"?: UUID;
  /** Номер продажи или закупки у магазина — ключ идемпотентности загрузки */
  "external_id": string;
  /** Пусто — кабинет выдаст следующий номер */
  "number"?: string;
  "title"?: string;
  /** Код валюты сделки, например RUB */
  "currency": string;
  "manager"?: string;
  "comment"?: string;
  "order_date": string;
  "ship_date"?: string;
  "due_date"?: string;
  "discount"?: string;
  /** Цены включают налог; пусто — умолчание кабинета */
  "prices_include_vat"?: boolean;
  /** Путь сделки; продажа или закупка с оплатой на сайте — self_service */
  "scenario"?: "self_service" | "one_off_sale" | "contract_sale";
  "payment"?: DocflowAppSalesOrderPayment;
  /** Не используется контуром приложения: источник журнала — пространство приложения из токена */
  "source"?: string;
  "warehouse_id"?: UUID;
  "items": Array<DocflowAppSalesOrderItem>;
}

export interface DocflowAppSalesOrderItem {
  /** Артикул или штрихкод позиции у магазина; узнаётся справочником номенклатуры точным совпадением */
  "article"?: string;
  "product_id"?: UUID;
  /** Пусто — название берётся из номенклатуры */
  "title"?: string;
  /** Пусто — вид номенклатуры */
  "kind"?: "goods" | "service" | "material" | "semi_product";
  "unit"?: string;
  "quantity": string;
  "price": string;
  "discount"?: string;
  /** Ставка строки: 22%, 10%, без НДС; пусто — учётная политика юрлица на дату продажи или закупки */
  "vat_rate"?: string;
}

/** Сообщение эквайринга о продаже или закупке. Идемпотентно по паре provider + external_id */
export interface DocflowAppSalesOrderPayment {
  /** Кто подтвердил списание: yookassa, tochka, имя платёжного кабинета сайта */
  "provider": string;
  /** Номер платежа у провайдера */
  "external_id": string;
  /** Пусто — списание (payment) */
  "kind"?: "payment" | "refund";
  /** Сумма больше нуля; возврат присылается видом refund, а не минусом */
  "amount": string;
  "currency"?: string;
  /** Когда провайдер списал; пусто — момент сообщения */
  "paid_at"?: string;
}

/** Один проход предмета по маршруту. Согласование ничего не проводит и ни строки регистра не пишет: оно отвечает на один вопрос — можно ли уже выполнить действие, выпускающее бумагу или деньги наружу. Возврат на доработку проход не закрывает: предмет правят и продолжают тот же проход, сохраняя чужие визы. */
export interface DocflowApproval {
  "id": UUID;
  "subject": DocflowApprovalSubject;
  "subject_title"?: string;
  "subject_number"?: string;
  "company_id"?: UUID;
  "contact_id"?: UUID;
  "item_id"?: UUID;
  "route_id"?: UUID;
  "route_name"?: string;
  "rework_mode": "restart" | "returner_only";
  /** Пусто законно: у рамочного договора суммы нет */
  "amount"?: string;
  "currency"?: string;
  /** Редакция предмета, по которой решают */
  "content_version": number;
  "state": "pending" | "approved" | "rejected" | "returned" | "cancelled";
  /** Номер текущего этапа */
  "active_stage": number;
  "requested_by": number;
  "requested_name"?: string;
  "requested_at": string;
  "finished_at"?: string;
  "reminded_at"?: string;
  "escalated_at"?: string;
  "updated_at": string;
  "stages": Array<DocflowApprovalStage>;
  "events"?: Array<DocflowApprovalEvent>;
}

/** Вердикт по одному действию вместе с причинами отказа. */
export interface DocflowApprovalActionCheck {
  "allowed": boolean;
  "reasons": Array<DocflowApprovalBlockReason>;
}

/** Почему действие запрещено, словами, а не кодом состояния. */
export interface DocflowApprovalBlockReason {
  "code": string;
  "message": string;
  "approval_id"?: UUID;
  "stage_title"?: string;
}

/**
 * Что можно сделать с предметом прямо сейчас и почему нельзя остальное. Согласование блокирует РОВНО ДВА действия — отправку контрагенту и отправку заявки в банк; editing_stays_unlocked говорит прямо, что редактирование карточки не глушится никогда.
 * 
 * Это СНИМОК: между чтением и нажатием кнопки мир может измениться, и настоящую защиту держит транзакция самого действия.
 */
export interface DocflowApprovalBlockers {
  "subject": DocflowApprovalSubject;
  /** Объявлен ли вид предмета требующим согласования */
  "required": boolean;
  "approval_id"?: UUID;
  "state"?: "pending" | "approved" | "rejected" | "returned" | "cancelled";
  "send_to_counterparty": DocflowApprovalActionCheck;
  "send_to_bank": DocflowApprovalActionCheck;
  "can_submit": boolean;
  "can_decide": boolean;
  /** У человека есть неотмеченное «ознакомиться» в этом проходе — своё или делегированное */
  "can_acknowledge"?: boolean;
  "can_cancel": boolean;
  "can_resubmit": boolean;
  "matched_route_id"?: UUID;
  "matched_route_name"?: string;
  /** Всегда истинно: редактирование карточки согласование не глушит */
  "editing_stays_unlocked": boolean;
}

export interface DocflowApprovalCancelInput {
  /** Причина отзыва остаётся в истории прохода */
  "comment": string;
}

/** Кто согласует предмет по его фактам: маршрут, этапы, пропуски по сумме и люди. */
export interface DocflowApprovalChainPreview {
  /** auto — маршрут подошёл, но все его этапы согласования отсечены порогами по сумме: предмет согласуется автоматически, без виз */
  "outcome": "route" | "direct" | "blocked" | "auto";
  /** Согласование вида объявлено обязательным */
  "required": boolean;
  "route_id"?: UUID;
  "route_name"?: string;
  /** Подобран стандартный маршрут: ни один маршрут кабинета не подошёл */
  "route_standard"?: boolean;
  "payment_destination"?: "calendar" | "treasury";
  "stages": Array<DocflowApprovalChainStage>;
}

/** Этап маршрута глазами «кто согласует» до отправки. */
export interface DocflowApprovalChainStage {
  "position": number;
  "title"?: string;
  /** Что делает этап: approve — согласует и держит маршрут; acknowledge — «ознакомиться»: извещает участников (нужно право docflow.flow:read), маршрут не держит, отказа не знает (ERP-1566). Пусто — approve */
  "stage_kind"?: "approve" | "acknowledge";
  "mode": "all" | "any";
  "assignee_kind": "user" | "department" | "role" | "manager" | "department_head";
  "assignee_label"?: string;
  /** Лимит этапа: выполняется при сумме от этого значения */
  "min_amount"?: string;
  "due_hours"?: number;
  /** Этап выполнится при этих фактах */
  "applies": boolean;
  /** Почему этап не выполнится */
  "skip_reason"?: "amount_below";
  /** Этап выполнится, но спросить некого */
  "problem"?: "no_reviewers";
  "people": Array<DocflowApprovalPerson>;
}

/** Одно решение. Комментарий обязателен у return и reject и не требуется у approve: отказ без слов отправляет автора чинить неизвестно что. */
export interface DocflowApprovalDecisionInput {
  /** Заполняется из адреса; значение в теле роли не играет */
  "approval_id"?: UUID;
  /** ЧЬЯ виза закрывается. Не обязательно тот, кто нажимает: замещающий закрывает визу отсутствующего, оставаясь собой в истории */
  "reviewer_id"?: number;
  "decision": "approve" | "return" | "reject";
  "comment"?: string;
}

/** Подразделение справочника ядра глазами согласования. */
export interface DocflowApprovalDepartment {
  "id": UUID;
  "code": string;
  "label": string;
}

/** Справочники конструктора маршрутов ОДНИМ ответом: три отдельных запроса ради одной формы означают три повода ей мигнуть и три места, где список окажется из разных моментов времени. */
export interface DocflowApprovalDirectories {
  "departments": Array<DocflowApprovalDepartment>;
  "roles": Array<DocflowApprovalRoleRef>;
  "people": Array<DocflowApprovalPerson>;
  /** Виды предметов, которые сегодня умеют согласовываться, вместе с их обязательностью */
  "subjects": Array<DocflowApprovalPolicy>;
}

/** Строка истории прохода. Не переписывается. */
export interface DocflowApprovalEvent {
  "id": UUID;
  "stage_position"?: number;
  /** auto_approved — согласовано автоматически: сумма меньше порогов маршрута. operator_* — ответ оператору по входящему пакету ЭДО после прохода (настройка подключения reply_after_approval); comment несёт слова оператора или машинный код отказа docflow.edo.* */
  "action": "submitted" | "approved" | "returned" | "rejected" | "cancelled" | "resubmitted" | "reset_significant_change" | "delegated" | "escalated" | "reminded" | "operator_replied" | "operator_refused" | "operator_signature_required" | "operator_skipped" | "acknowledged" | "auto_approved";
  "user_id"?: number;
  "user_name"?: string;
  "comment"?: string;
  "created_at": string;
}

/** Строка очереди. Это НЕ урезанный предмет: ни файлов, ни строк, ни связей здесь нет — очередь открывают, чтобы решить, что открывать дальше. */
export interface DocflowApprovalInboxItem {
  "approval_id": UUID;
  "subject": DocflowApprovalSubject;
  "subject_title": string;
  "subject_number"?: string;
  "route_name"?: string;
  "stage_title"?: string;
  "stage_position": number;
  /** Сколько этапов в маршруте всего */
  "stage_count": number;
  "stage_mode": "all" | "any";
  "amount"?: string;
  "currency"?: string;
  "company_name"?: string;
  "contact_name"?: string;
  "requested_name"?: string;
  "requested_at": string;
  "due_at"?: string;
  "overdue": boolean;
  /** Чью визу вы ставите, если это не ваша собственная */
  "on_behalf_of"?: string;
  "on_behalf_via"?: "self" | "substitute" | "delegate" | "administrator";
  /** Истинно у собственной отправки, которую вернули на доработку */
  "returned_to_me": boolean;
  /** Строка этапа «ознакомиться»: решения не ждут, нужна отметка POST /approvals/{id}/acknowledge */
  "informational"?: boolean;
}

export interface DocflowApprovalInboxPage {
  "items": Array<DocflowApprovalInboxItem>;
  "has_more": boolean;
}

/** Человек в списках согласования. Логин, роли и права наружу не отдаются. */
export interface DocflowApprovalPerson {
  "id": number;
  "name": string;
}

/** Обязательность согласования у ОДНОГО вида предмета, а не глобальный выключатель кабинета: у заявки на оплату согласование может быть обязательным, а у письма контрагенту — нет. */
export interface DocflowApprovalPolicy {
  "subject_module": "docflow" | "finance";
  "subject_kind": "flow_document" | "payment_request" | "edo_message";
  "required": boolean;
}

/** Повторная отправка после доработки. Что произойдёт с визами, решает настройка маршрута: restart гасит все, returner_only сохраняет визы всех, кроме вернувшего. */
export interface DocflowApprovalResubmitInput {
  /** Заполняется из адреса; значение в теле роли не играет */
  "approval_id"?: UUID;
  /** Кого инициатор решил переспросить дополнительно. Вернувший этап переспрашивается всегда и в списке не нужен */
  "ask_again"?: Array<UUID>;
  "comment"?: string;
}

/** Персональная виза. actor_id — чья она, decided_by — чья рука её поставила, если это не сам согласующий, а decided_via — на каком основании: замещение, поручение или вмешательство администратора. */
export interface DocflowApprovalReview {
  "id": UUID;
  "actor_id": number;
  "actor_name"?: string;
  "decided_by"?: number;
  "decided_by_name"?: string;
  "decided_via"?: "self" | "substitute" | "delegate" | "administrator";
  "delegated_to"?: number;
  /** Пусто, пока человек не решил; acknowledge — отметка «ознакомлен» на этапе ознакомления */
  "decision"?: "approve" | "return" | "reject" | "acknowledge";
  /** Обязателен у return и reject: без слов автор не узнает, что исправлять */
  "comment"?: string;
  "decided_at"?: string;
}

/** Роль кабинета глазами согласования: идентификатор и имя, без состава прав. */
export interface DocflowApprovalRoleRef {
  "id": UUID;
  "name": string;
}

/** Именованный ШАБЛОН маршрута, а не разовый список людей. Подошло несколько — берётся самый конкретный; нижняя граница суммы включается, верхняя нет, поэтому смежные диапазоны стыкуются без щели и без нахлёста. Названия юрлица, контрагента, папки и статьи подставляются на чтении: в шаблоне хранятся только ссылки. */
export interface DocflowApprovalRoute {
  "id": UUID;
  "name": string;
  "subject_module": "docflow" | "finance";
  /** any — любой вид предмета своего модуля */
  "subject_kind": "flow_document" | "payment_request" | "edo_message" | "any";
  /** Вид бумаги у владельца предмета */
  "document_kind"?: string;
  "company_id"?: UUID;
  "company_name"?: string;
  "contact_id"?: UUID;
  "contact_name"?: string;
  "contact_folder_id"?: UUID;
  "contact_folder"?: string;
  "item_id"?: UUID;
  "item_name"?: string;
  /** Условие «бизнес предмета»; без юрлица у предмета бизнес берётся из формы проверки */
  "business_id"?: UUID;
  "business_name"?: string;
  /** Условие «подразделение автора»: срабатывает и на подотделы */
  "department_id"?: UUID;
  "department_name"?: string;
  /** Нижняя граница суммы ВКЛЮЧАЕТСЯ */
  "amount_from"?: string;
  /** Верхняя граница суммы НЕ включается */
  "amount_to"?: string;
  /** Что будет после возврата на доработку: весь путь заново либо продолжает вернувший, визы остальных сохраняются */
  "rework_mode": "restart" | "returner_only";
  /** Для заявки на оплату (docflow / payment_request): куда идёт согласованная — сразу в платёжный календарь (дата оплаты = срок) или казначею, который ставит дату платежа (ERP-1427, этап 6) */
  "payment_destination"?: "calendar" | "treasury";
  /** Код стандартного маршрута кабинета. Его заводит система выключенным; включённый, он подбирается последним — когда ни один другой маршрут не подошёл. Пусто — маршрут заведён кабинетом */
  "system_key"?: "payment_request" | "invoice" | "contract";
  /** Выключенный маршрут не подбирается новым проходам, но остаётся на месте */
  "is_active": boolean;
  "stages": Array<DocflowApprovalRouteStage>;
  "created_at": string;
  "updated_at": string;
}

export interface DocflowApprovalRouteList {
  "items": Array<DocflowApprovalRoute>;
}

/** Этап ШАБЛОНА маршрута. Согласующий назван одним из пяти способов, и каждый отвечает своему вопросу: user — «решает именно он», department — «согласует склад», role — «согласует любой бухгалтер», manager — «спросить начальника автора, кем бы автор ни оказался», department_head — «спросить руководителя отдела» по оргструктуре: отдела автора или названного, а нет руководителя или автор руководит сам — выше по дереву. Согласующий может быть не выбран (способ назван, ссылки нет) только у выключенного маршрута: так сеется этап «Финансы» стандартного маршрута заявок. */
export interface DocflowApprovalRouteStage {
  "id"?: UUID;
  /** Порядок этапа в маршруте */
  "position": number;
  "title"?: string;
  "assignee_kind": "user" | "department" | "role" | "manager" | "department_head";
  "assignee_user_id"?: number;
  "assignee_department_id"?: UUID;
  "assignee_role_id"?: UUID;
  /** Только для department: спросить и сотрудников подотделов */
  "include_subdepartments"?: boolean;
  /** Как назначение читается человеком. Подставляется на чтении; в шаблоне не хранится */
  "assignee_label"?: string;
  /** Что делает этап: approve — согласует и держит маршрут; acknowledge — «ознакомиться»: извещает участников (нужно право docflow.flow:read), маршрут не держит, отказа не знает (ERP-1566). Пусто — approve */
  "stage_kind"?: "approve" | "acknowledge";
  /** Решают все или достаточно одного. Кворума с процентом нет */
  "mode": "all" | "any";
  /** Срок ЭТАПА в часах. Просрочка даёт напоминание и эскалацию на одно звено; автоотклонения по сроку нет */
  "due_hours"?: number;
  /** Лимит по сумме УСЛОВИЕМ НА ЭТАП: выполнять только при сумме от N. Этап, чей лимит не достигнут, остаётся в проходе строкой skipped */
  "min_amount"?: string;
}

/** Этап ПРОХОДА: кого спросили на самом деле. Состояние skipped означает «этап не выполняется, его лимит по сумме не достигнут»; строка всё равно есть, чтобы человек видел, ПОЧЕМУ финансового директора не спросили. */
export interface DocflowApprovalStage {
  "id": UUID;
  "position": number;
  "title"?: string;
  /** Что делает этап: approve — согласует и держит маршрут; acknowledge — «ознакомиться»: извещает участников (нужно право docflow.flow:read), маршрут не держит, отказа не знает (ERP-1566). Пусто — approve */
  "stage_kind"?: "approve" | "acknowledge";
  "mode": "all" | "any";
  "assignee_kind": "user" | "department" | "role" | "manager" | "department_head";
  "assignee_label"?: string;
  "min_amount"?: string;
  "due_hours"?: number;
  "due_at"?: string;
  /** notified — этап ознакомления известил участников и пропустил проход дальше; acknowledged — все отметились */
  "state": "waiting" | "active" | "approved" | "rejected" | "returned" | "skipped" | "notified" | "acknowledged";
  "started_at"?: string;
  "decided_at"?: string;
  "reviews": Array<DocflowApprovalReview>;
}

/** Предмет согласования НЕЙТРАЛЬНОЙ ТРОЙКОЙ «модуль — вид — идентификатор». Внешнего ключа на предмет нет вовсе: без этого приёма к заявке на оплату, живущей в модуле finance (счета, выписки и расчёты), лист было бы не прицепить. */
export interface DocflowApprovalSubject {
  /** Модуль-владелец предмета */
  "module": "docflow" | "finance";
  /** Вид предмета: карточка документооборота, заявка на оплату или входящий документ ЭДО */
  "kind": "flow_document" | "payment_request" | "edo_message";
  /** Идентификатор предмета у его владельца */
  "id": UUID;
}

/** Что владелец предмета рассказывает о нём согласованию своим портом. Пустая сумма законна — у рамочного договора её нет, и ноль вместо неё назвал бы сумму, которой не называли. */
export interface DocflowApprovalSubjectFacts {
  "subject": DocflowApprovalSubject;
  "title": string;
  "number"?: string;
  /** Вид бумаги у владельца: договор, счёт, акт */
  "document_kind"?: string;
  "company_id"?: UUID;
  "contact_id"?: UUID;
  "contact_folder_id"?: UUID;
  /** Статья расхода предмета */
  "item_id"?: UUID;
  /** Сумма десятичным текстом; пусто там, где суммы нет */
  "amount"?: string;
  "currency"?: string;
  /** Редакция предмета у владельца — основание значимой правки */
  "content_version": number;
  /** Кто завёл предмет; нужен этапу «руководитель автора» */
  "author_id": number;
}

/** Согласование одного предмета глазами его карточки. */
export interface DocflowApprovalSubjectState {
  "blockers": DocflowApprovalBlockers;
  /** Отсутствует, пока предмет ни разу не отправляли */
  "approval"?: DocflowApproval;
  "facts": DocflowApprovalSubjectFacts;
  /** Кто согласует, если отправить сейчас; есть, только когда открытого или согласованного прохода нет */
  "preview"?: DocflowApprovalChainPreview;
}

/** Файл внутри пакета. Внутреннего пути в хранилище здесь нет: снаружи файл получают отдельной операцией, а путь не часть контракта и не подсказка для перебора. */
export interface DocflowAttachment {
  "id": UUID;
  "message": UUID;
  /** Идентификатор вложения у оператора */
  "external_id": string;
  /** Имя файла словами оператора */
  "name": string;
  /** Наш словарь, а не оператора: документ, ответный титул, служебное извещение. Пусто означает, что вид неизвестен, и это законно */
  "kind": "" | "document" | "title" | "notice";
  "content_type": string;
  "size_bytes": number;
  "sha256": string;
  /** Байты скачаны и лежат у НАС. Ссылка оператора хранилищем не считается: она живёт около месяца, а накладную спрашивают через три года */
  "stored": boolean;
  "downloaded_at"?: string;
  "created_at": string;
}

/** Соглашение сторон об аннулировании документа. Запускает его любая сторона, а решает вторая: согласие даёт состояние 22 «Документ аннулирован», отказ — состояние 40 «Аннулирование отклонено», при котором состояние самого документа НЕ меняется. Шаг цепочки выводится из ленты СОБЫТИЙ пакета, а не из кода состояния: состояние 27 «Ожидает аннулирования» оператор отдаёт только отдельным методом выборки по событиям. */
export interface DocflowCancellation {
  /** Шаг цепочки: none — её нет; requested — ждём решения; agreed — аннулирован по соглашению; refused — в аннулировании отказано, и документ остался действующим */
  "state": "none" | "requested" | "agreed" | "refused";
  /** Слова ОПЕРАТОРА о состоянии, когда оно относится к аннулированию. Своего перевода состояний у нас нет и быть не должно */
  "state_name": string;
  /** Кто запустил цепочку. Пусто означает «неизвестно», а не «мы» */
  "initiator": "" | "us" | "counterparty";
  /** Причина словами того, кто её написал. Не переводится */
  "reason": string;
  "requested_at": string | null;
  "decided_at": string | null;
  /** Вид документа вообще допускает аннулирование. У электронной транспортной накладной его нет: там отказ 409 с кодом docflow.edo.cancellation_unavailable */
  "available": boolean;
  /** Ход за нами и цепочку можно начать */
  "can_request": boolean;
  /** Соглашение прислали нам и на него можно согласиться */
  "can_approve": boolean;
  /** Соглашение прислали нам и в нём можно отказать */
  "can_reject": boolean;
}

/** Сертификат, которым подпись доказывают спустя годы: имя подписанта меняется, отпечаток нет. */
export interface DocflowCertificate {
  "thumbprint": string;
  "subject": string;
  "valid_from"?: string;
  "valid_to"?: string;
}

/** Подключение юрлица к оператору ЭДО. Учётных данных здесь нет ни одним полем: снаружи виден только признак has_credentials. */
export interface DocflowConnection {
  "id": UUID;
  /** Оператор ЭДО. Диадок объявлен, адаптера к нему пока нет */
  "provider": "saby" | "diadoc";
  /** Имя оператора для интерфейса; торговая марка, не переводится */
  "provider_name": string;
  "display_name": string;
  "company"?: UUID;
  "company_name": string;
  "company_inn": string;
  "company_kpp": string;
  /** reauth_required отделён от error намеренно: сеть починится сама, а отозванный доступ требует человека */
  "status": "connected" | "paused" | "error" | "reauth_required" | "disconnected";
  "status_name": string;
  /** Тройка ключей оператора задана. Самих значений наружу не отдают никогда */
  "has_credentials": boolean;
  /** Действующее ограничение: отправка, подписание и изменение состояний в ЭДО отключены */
  "read_only": boolean;
  /** Режим «Черновики в ЭДО» (ERP-1551): при read_only=true оператору уходят черновики; подпись, отправка и ответы остаются закрытыми */
  "draft_write"?: boolean;
  /** «После нашего согласования — ответить у оператора». Когда проход внутреннего маршрута по входящему пакету закончен, документооборот выполняет у оператора действие текущего этапа: «согласован» — «Утвердить», «отклонён» — «Отклонить» с причиной из визы. Этап с подписью не закрывается: пакет ждёт человека в «Ждут меня → Подписать». Итог — строкой журнала прохода (operator_*). По умолчанию выключено. */
  "reply_after_approval": boolean;
  /** Идентификатор нашей организации у оператора; выясняется сопоставлением по ИНН и КПП, руками не вводится */
  "external_org_id": string;
  /** Кто из ERP выдал доступ; имя человека на стороне оператора нам неизвестно */
  "granted_by_user_id"?: number;
  "granted_by_name": string;
  "granted_at"?: string;
  "last_sync_at"?: string;
  /** Итог последнего прохода синхронизации */
  "last_sync_status": "" | "ok" | "failed" | "skipped";
  /** СЛОВА ОПЕРАТОРА и только они: по ним человек чинит доступ в кабинете оператора */
  "last_error": string;
  /** Машинный код последней неудачи (docflow.edo.*); его переводит интерфейс */
  "last_error_code": string;
  "messages_total": number;
  /** Сколько пакетов ждут нашего действия */
  "actions_due": number;
  "created_at": string;
  "updated_at": string;
}

export interface DocflowConnectionList {
  "count": number;
  "results": Array<DocflowConnection>;
}

/** Вторая сторона обмена. Реквизиты хранятся текстом всегда, даже когда сопоставление с нашим контрагентом состоялось: карточку могут удалить или переименовать, а пакет обязан остаться читаемым спустя годы. */
export interface DocflowCounterparty {
  "name": string;
  "inn": string;
  "kpp": string;
  /** Идентификатор участника обмена у оператора: надёжнее ИНН, потому что у одного ИНН бывает несколько ящиков */
  "external_id": string;
  "contact"?: UUID;
  /** Наш контрагент, если сопоставление состоялось. Это наша догадка по ИНН либо выбор человека, а не факт от оператора */
  "contact_name": string;
}

/** Событие ленты пакета. Лента — то, по чему человек восстанавливает ход спора с контрагентом, поэтому название и комментарий хранятся словами оператора и не переводятся. */
export interface DocflowEvent {
  "id": UUID;
  "message": UUID;
  "external_id": string;
  "name": string;
  "comment": string;
  "occurred_at"?: string;
  "created_at": string;
}

/** Ссылка на учётный документ чужого модуля по личности. Состояние, остаток и содержимое чужого документа сюда не копируются: правда о нём живёт у его владельца. */
export interface DocflowFlowAccountingLink {
  "id": UUID;
  "owner": "finance" | "stock";
  "document_id": UUID;
  /** Команда, породившая связь: create_plan, accept_act и подобные */
  "source_action"?: string;
  /** Редакция бумаги, закреплённая командой */
  "source_version"?: number;
  /** Редакция учётного документа, из которой сделана бумага */
  "target_version"?: number;
}

/** Одна команда правки. Поля, не относящиеся к названному действию, отвергаются, а не игнорируются: запрос, просящий две разные вещи сразу, сам не знает, чего хочет. */
export interface DocflowFlowChangeInput {
  /** Версия, которую видел клиент. Разошлась — 409 docflow.flow.version_conflict */
  "expected_version": number;
  "action": "save" | "link" | "unlink" | "remove_file" | "register" | "revise" | "archive" | "restore" | "delete" | "custom";
  "content"?: DocflowFlowContent;
  /** Для action=custom: значения своих полей целиком. Правятся у черновика и зарегистрированной карточки; значение, не подходящее к типу графы, — 422 с названиями граф */
  "custom"?: { [key: string]: unknown };
  "company_id"?: UUID;
  "contact_id"?: UUID;
  "kind"?: DocflowFlowKind;
  "direction"?: "incoming" | "outgoing" | "internal";
  "file_id"?: UUID;
  "relation"?: DocflowFlowRelationInput;
  "relation_id"?: UUID;
}

/** Коммерческая часть бумаги — сумма, валюта, строки и графики. Пустая amount законна только вместе с payment_rule, у которого названа сумма платежа: у бессрочного договора итога нет и быть не может, а строк оригинала и этапов работ у такой сделки не бывает — их суммы обязаны сойтись с итогом. */
export interface DocflowFlowCommercial {
  "currency": string;
  /** Десятичным текстом; пусто — итога нет или его выводит правило графика */
  "amount": string;
  "payment_terms"?: string;
  "due_date"?: string;
  "lines"?: Array<DocflowFlowCommercialLine>;
  /** Этапы работ */
  "milestones"?: Array<DocflowFlowScheduleStage>;
  /** График платежей; при payment_rule — его раскрытие */
  "payments"?: Array<DocflowFlowScheduleStage>;
  "payment_rule"?: DocflowFlowPaymentRule;
}

/** Строка переписанного оригинала, а не расчёт. Сумма строки приходит явно: скидка поставщика, налог и округление не заменяются местным произведением количества на цену. */
export interface DocflowFlowCommercialLine {
  "id": UUID;
  "product_id"?: UUID;
  "product_name"?: string;
  "name": string;
  "unit"?: string;
  "quantity"?: string;
  "price"?: string;
  "amount": string;
  /** null означает, что налог не переписывали, а не что строка без налога */
  "vat_amount"?: string | null;
}

/** Вычисленная строка НДС для чтения карточки: тот же результат, что в печатной форме, но не часть сохранённого оригинала */
export interface DocflowFlowCommercialTaxLine {
  "line_id": UUID;
  /** Ставка для показа; пусто, если политика не дала ставку */
  "rate"?: string;
  /** НДС десятичным текстом; пусто, если налог не определён */
  "amount"?: string;
}

/** Реквизиты бумаги — то, что переписано с документа. */
export interface DocflowFlowContent {
  "title": string;
  "number"?: string;
  "date": string;
  "contract"?: DocflowFlowContractTerms;
  "commercial"?: DocflowFlowCommercial;
  "recognized"?: DocflowFlowRecognized;
  /** Значения своих полей кабинета (графы вида docflow.document.<вид>). В save не прислано — не меняются; правятся действием custom */
  "custom"?: { [key: string]: unknown };
}

/** Условия договора в старой форме. Остаётся читаемой и принимается, но новую коммерческую часть описывает commercial. У договора без лимита (mode=framework) суммы и валюты в условиях нет вовсе — искусственного нуля здесь не бывает. Коммерческая часть рядом с ним законна только с payment_rule, у которого названа сумма платежа: это бессрочный договор с регулярным платежом. Без неё это рамочный договор, суммы которого ведутся спецификациями, и commercial с ним не сохраняется. */
export interface DocflowFlowContractTerms {
  "mode": "framework" | "fixed";
  "subject": string;
  "valid_from": string;
  "valid_until"?: string;
  /** Только у mode=fixed */
  "amount"?: string;
  "currency"?: string;
  "payment_terms"?: string;
  "renewal_terms"?: string;
  /** Воронка продаж или закупок договора: продажи или закупки по договору идут в неё (пометка кабинета, не текст бумаги) */
  "order_funnel_id"?: string;
  /** Ответственные по договору с долями: продажи и закупки периодов получают их по умолчанию; сумма долей — ровно 100 */
  "responsibles"?: Array<DocflowFlowResponsible>;
}

export interface DocflowFlowCreateInput {
  "company_id": UUID;
  "contact_id": UUID;
  "kind": DocflowFlowKind;
  "direction": "incoming" | "outgoing" | "internal";
  "content": DocflowFlowContent;
}

/** Карточка документа внутреннего контура в одной редакции. Каждая принятая команда рождает новую неизменяемую редакцию, а прежняя остаётся читаемой по своему адресу. */
export interface DocflowFlowDocument {
  "id": UUID;
  "company_id": UUID;
  /** Бизнес юрлица бумаги прошёл отсечку этапа 4: мастер «Принять акт» и «Создать продажу / закупку» у бумаги сняты */
  "execution_cutover"?: boolean;
  "company_name": string;
  "contact_id": UUID;
  "contact_name": string;
  "kind": DocflowFlowKind;
  "direction": "incoming" | "outgoing" | "internal";
  "status": "draft" | "registered" | "archived";
  /** Из какого состояния бумага ушла в архив */
  "archived_from"?: "draft" | "registered";
  "version": number;
  /** Ложь означает: стороны и вид уже закреплены редакцией или связью и не меняются */
  "identity_editable": boolean;
  "content": DocflowFlowContent;
  "files"?: Array<DocflowFlowFile>;
  "relations"?: Array<DocflowFlowRelation>;
  "accounting_links"?: Array<DocflowFlowAccountingLink>;
  /** Только в ответе чтения карточки: вычисленные суммы НДС строк из источника печати. В редакцию документа не записываются */
  "commercial_tax"?: Array<DocflowFlowCommercialTaxLine>;
  "edo"?: DocflowFlowEDOState;
  /** Конверты, которыми карточка уходила и приходила. Заполняется только при чтении карточки и в редакцию не пишется: связь живёт своей строкой, её правит синхронизация, а редакция неизменяема */
  "edo_links"?: Array<DocflowFlowEDOLink>;
  /** Чего карточке не хватает до полноты: содержательного файла, подтверждённой суммы, срока действия (последний — только у договора и дополнительного соглашения). Считается при чтении одной карточки и в редакцию не пишется. Пустой список у карточки из ЭДО означает, что приёмка зарегистрировала её сразу; непустой — что карточка осталась черновиком и ждёт подтверждения человека. */
  "gaps"?: Array<"file" | "amount" | "validity">;
  "created_at": string;
  "updated_at": string;
  "updated_by": number;
}

/** Файл конверта глазами карточки: чем оператор его назвал, чем он является, сколько весит и есть ли он у нас. Скачивается адресом вложения пакета. */
export interface DocflowFlowEDOAttachment {
  "id": UUID;
  "message": UUID;
  "name": string;
  /** document, title либо пусто */
  "kind": string;
  "content_type": string;
  "size_bytes": number;
  /** Байты скачаны в наше хранилище; ложь — файл пока живёт только у оператора */
  "stored": boolean;
}

/** Конверт, которым карточка уехала или пришла. Пакет — канал доставки, и здесь видно, чем карточка ему приходится и каким файлом она в нём поехала. Содержания конверта тут нет: за ним идут в сам пакет. */
export interface DocflowFlowEDOLink {
  "id": UUID;
  "connection": UUID;
  /** Пакет у оператора; пусто при непустом external_doc_id означает черновик у оператора, наружу не ушедший */
  "message"?: UUID | null;
  /** Чем карточка приходится конверту: основной документ, приложение или основание */
  "role": "primary" | "attachment" | "basis";
  /** Какой файл карточки уехал вложением */
  "file"?: UUID | null;
  /** Идентификатор документа у оператора */
  "external_doc_id": string;
  /** Идентификатор вложения у оператора: им адресуется замена файла при повторной отправке */
  "external_attachment_id"?: string;
  /** Черновик, который ещё можно удалить у оператора */
  "draft": boolean;
  /** Слова оператора о самом пакете, собранные при чтении карточки */
  "direction": string;
  "number": string;
  "date": string;
  "state_code": string;
  "state_name": string;
  /** Содержательные файлы конверта, показанные в карточке ссылкой, а не копией: байты лежат в хранилище кабинета один раз. Извещений здесь нет. Заполняется только при чтении одной карточки */
  "attachments"?: Array<DocflowFlowEDOAttachment>;
  "created_by"?: number | null;
  "created_at": string;
}

/** Ответ контрагента по документу, как его понимает карточка: подписал, отказал или аннулировали по соглашению сторон. Пересказа состояний оператора здесь нет — регламентов у него десятки, и свой словарь на них отстал бы от первой же правки закона. Живёт в редакции карточки и поэтому попадает в её историю сам. */
export interface DocflowFlowEDOState {
  "message": UUID;
  /** Подписал, отказал (отклонение либо уведомление об уточнении) или аннулирован по соглашению сторон */
  "outcome": "signed" | "refused" | "cancelled";
  /** Состояние словами оператора: показывается как есть, человек сверяет его с кабинетом оператора */
  "state_name"?: string;
  /** Когда это случилось у оператора */
  "occurred_at": string;
}

/** Приложенный файл. Всё это описание делает владелец при загрузке, и командой правки оно не принимается. */
export interface DocflowFlowFile {
  "id": UUID;
  "name": string;
  /** Байт; не больше 26214400 */
  "size": number;
  "sha256": string;
  "content_type": string;
  "uploaded_by": number;
  "uploaded_at": string;
  /** Вердикт антивируса у файла, пришедшего сессией загрузки; у файла формы поля нет */
  "scan_status"?: "clean" | "skipped";
}

export type DocflowFlowKind = "contract" | "specification" | "amendment" | "invoice" | "act" | "upd" | "goods_waybill" | "transport_waybill" | "consignment_note" | "transport_order" | "tax_invoice" | "correction" | "return" | "discrepancy_act" | "reconciliation_act" | "power_of_attorney" | "other";

/** Сканы подписанного оригинала документа. */
export interface DocflowFlowOriginal {
  "document_id": UUID;
  "scans": Array<DocflowFlowOriginalScan>;
}

/** Скан подписанного оригинала; номер скана из сессии загрузки — номер сессии. */
export interface DocflowFlowOriginalScan {
  "id": UUID;
  "document_id": UUID;
  "name": string;
  "size": number;
  "sha256": string;
  "content_type": string;
  "uploaded_by": number;
  "uploaded_at": string;
}

/** Страница карточек. Набор строк называется items — как у остальных страниц этого крыла; крыло обмена с контрагентами в том же модуле исторически называет его results. */
export interface DocflowFlowPage {
  "items": Array<DocflowFlowDocument>;
  "has_more": boolean;
  /** Только по запросу with=counts. Сколько карточек в каждой пилюле списка договоров при прочих отборах: expiring входит в active, а удалённые не считаются нигде. */
  "state_counts"?: DocflowFlowPageStateCounts;
}

/** Только по запросу with=counts. Сколько карточек в каждой пилюле списка договоров при прочих отборах: expiring входит в active, а удалённые не считаются нигде. */
export interface DocflowFlowPageStateCounts {
  "draft": number;
  "active": number;
  "expiring": number;
  "expired": number;
  "archived": number;
}

/**
 * Регулярный график оплат одним правилом: сумма платежа, период, день, начало и ровно одно из трёх окончаний — число платежей, последняя дата или open («пока действует договор»). Сервер раскрывает правило в строки payments сам; план финансов и расчёты видят только строки, как при ручном графике.
 * 
 * При названной сумме платежа сумма документа (commercial.amount) может быть пустой: с count или until она вычисляется как N × платёж, с open её нет вовсе. Бессрочное правило раскрывается на горизонт в 12 ближайших платежей — это план, а не весь договор.
 */
export interface DocflowFlowPaymentRule {
  /** Сумма одного платежа десятичным текстом; пусто — сумма документа делится поровну. Обязательна, когда суммы документа нет */
  "amount"?: string;
  "period": "month" | "week" | "quarter";
  /** День месяца (month, quarter; короткий месяц прижимает к своему концу) или день недели ISO 1..7 (week) */
  "day": number;
  /** Первый платёж — ближайшая дата не раньше этой */
  "start": string;
  /** Число платежей; задаётся вместо until */
  "count"?: number;
  /** Последняя допустимая дата включительно; задаётся вместо count */
  "until"?: string;
  /** Пока действует договор: окончания нет, итога нет, раскрываются ближайшие 12 платежей */
  "open"?: boolean;
  "orders"?: DocflowFlowPaymentRuleOrders;
}

/** «Заводить продажу или закупку на каждый период» — только у договора (kind=contract). Зарегистрированный договор сам заводит на каждую наступившую стадию правила подтверждённый продажу или закупку ядра (source_kind=contract, external_id «<id договора>/<период>»): сразу после регистрации и фоновым проходом раз в час. Один договор и один период — один продажа или закупка навсегда: отменённый не воскресает, период не позже последнего продажи или закупки договора не заводится. Будущие периоды не заводятся; исполнение и бумаги периода — вручную. */
export interface DocflowFlowPaymentRuleOrders {
  /** Первый период: стадии раньше этой даты продаж или закупок не получают. Пусто — с начала правила, прошедшие периоды догоняются */
  "from"?: string;
  /** Услуга строки продажи или закупки — активная номенклатура вида service; пусто — строка без номенклатуры, названная предметом договора */
  "product_id"?: UUID;
  /** Название услуги на момент выбора; пишет сервер, присланное не читается */
  "product_name"?: string;
}

/** Прочитанное машиной из файла карточки — НА ПРОВЕРКУ. Живёт отдельно от условий договора: в условия сумма и срок попадают только рукой человека. Пустое поле означает «не прочиталось», а не ноль. Приёмка входящего договора в PDF заполняет его текстом бумаги. */
export interface DocflowFlowRecognized {
  /** Имя вложения словами оператора: по нему человек откроет ту же бумагу и сверит */
  "source"?: string;
  /** Десятичная строка */
  "amount"?: string;
  "currency"?: string;
  "valid_from"?: string;
  "valid_until"?: string;
}

/** Связь между бумагами кабинета — основание, приложение, изменение или замена. Учётной инструкцией она не является. */
export interface DocflowFlowRelation {
  "id": UUID;
  "kind": "basis" | "attachment" | "amends" | "replaces";
  "target_id": UUID;
  /** Закреплённая редакция другой бумаги */
  "target_version": number;
}

export interface DocflowFlowRelationInput {
  "kind": "basis" | "attachment" | "amends" | "replaces";
  "target_id": UUID;
  "target_version": number;
}

/** Ответственный сотрудник договора и его доля в процентах. */
export interface DocflowFlowResponsible {
  "employee_id": string;
  /** Доля в процентах десятичным текстом */
  "share": string;
}

/** Плановая сумма этапа работ или платежа. Ни выполнения, ни оплаты она не утверждает — это то, о чём договорились. */
export interface DocflowFlowScheduleStage {
  "id": UUID;
  "label"?: string;
  "date"?: string;
  /** Десятичным текстом, не числом с плавающей точкой */
  "amount": string;
  /** Чем открывается срок платежа: датой или закрытием этапа */
  "due_trigger"?: string;
  "after_stage_id"?: UUID;
  /** Дней после события срока */
  "delay_days"?: number;
}

/** Заявка на сессию загрузки файла в документ. */
export interface DocflowFlowUploadRequest {
  /** Ожидаемая версия документа */
  "expected_version": number;
  "replace_id"?: UUID;
  /** Имя файла с расширением, без пути */
  "name": string;
  "mime_type"?: string;
  /** Точный размер файла в байтах */
  "size_bytes": number;
  /** Необязательная контрольная сумма SHA-256 строчными шестнадцатеричными знаками */
  "sha256"?: string;
}

/** Документ после приложения файла и номер этого файла. */
export interface DocflowFlowUploadResult {
  "document": DocflowFlowDocument;
  "file_id": UUID;
}

/**
 * Вторая сторона и то, с кем мы её свели.
 * 
 * Порядок узнавания жёсткий, и каждая ступень сильнее следующей: решение человека этим же запросом, сопоставление зеркала пакета, ЗАПИСАННОЕ решение по этому участнику обмена и, наконец, поиск в справочнике по ИНН и КПП. Последняя ступень — догадка, и она называет себя догадкой (match: guess), а не выдаёт себя за чьё-то решение. Разбор у неё общий с автоматчем выгрузок: второй механизм узнавания рядом с существующим разошёлся бы с ним на первой же правке — молча и в пользу дубля.
 * 
 * Неоднозначность не разрешается никогда: ИНН, совпавший у двух юрлиц, которых не развёл КПП, уходит человеку списком options.
 */
export interface DocflowIntakeCounterparty {
  /** Карточка контрагента кабинета; null — свести не с кем, и приёмка отвечает проверкой docflow.edo.contact_required */
  "contact": UUID | null;
  /** Имя этой карточки в кабинете */
  "contact_name": string;
  /** Имя стороны словами оператора либо файла продавца */
  "name": string;
  "inn": string;
  "kpp": string;
  /** Откуда взялся контрагент: manual — решение человека, auto — записанное сопоставление, guess — наша догадка по реквизитам прямо сейчас, нигде не записанная, none — не свели ни с кем */
  "match": "manual" | "auto" | "guess" | "none";
  /** Наши контрагенты с тем же ИНН, когда выбрать между ними обязан человек. Непустой список означает «такие у нас уже есть, выбери» — и потому же означает, что заводить нового НЕ НАДО: там, где контрагент с такими реквизитами уже заведён, место кнопке «связать с существующим», а не «завести». */
  "options"?: Array<DocflowIntakeCounterpartyOption>;
}

/** Один наш контрагент на выбор человеку. КПП здесь не для полноты: он единственное, чем два юрлица с одним ИНН различаются. */
export interface DocflowIntakeCounterpartyOption {
  "id": UUID;
  "name": string;
  "kpp": string;
}

/** Строка товарной таблицы чужого документа вместе с тем, что мы про неё предлагаем. Числа остаются СТРОКАМИ ровно так, как их написал поставщик: сумма в чужом документе такая, какую он подписал, и наша задача её донести, а не поправить. Расхождения покажет сверка, а не молчаливое округление. */
export interface DocflowIntakeLine {
  /** Номер строки в файле поставщика. По нему человек соотносит экран с бумагой, и по нему же приходит его решение */
  "number": number;
  /** Наименование товара словами поставщика */
  "name": string;
  /** Артикул поставщика */
  "article": string;
  /** Код товара у поставщика */
  "code": string;
  /** Код ОКЕИ единицы измерения */
  "unit_code": string;
  "unit_name": string;
  "quantity": string;
  /** Цена единицы словами поставщика */
  "price": string;
  "amount_without_vat": string;
  /** Ставка налога словами файла */
  "vat_rate": string;
  /** Сумма налога. Пуста при отметке «без НДС»: нуля там нет, и подставить его значит превратить необлагаемую поставку в облагаемую с нулевым налогом */
  "vat_amount": string;
  /** Отметка «без НДС» у строки */
  "vat_without": boolean;
  "amount_with_vat": string;
  /** Ключ соответствия: то, по чему эта строка узнаётся в СЛЕДУЮЩЕМ документе того же поставщика. Собирается с приставкой вида `арт:`, `код:` или `наим:` — артикул «100» и наименование «100» разные вещи, и без приставки они стали бы одной строкой соответствий. Показывается затем, чтобы человек понимал, что именно он сопоставляет: не эту накладную, а артикул поставщика на все будущие поставки. */
  "key": string;
  /** Номенклатура кабинета; null — не выбрана */
  "product": UUID | null;
  /** Имя выбранной карточки. Подсказка, а не реквизит: карточку могли заархивировать */
  "product_name": string;
  /** Откуда взялась номенклатура строки. `manual` — сопоставил человек, `auto` — сопоставила машина и решение записано, `rejected` — человек уже посмотрел и сказал «не это» (догадку по такой строке мы больше не показываем), `guess` — наша догадка ПРЯМО СЕЙЧАС, нигде не записанная, `none` — сопоставить не с чем. Записанное соответствие приносит свой способ из справочника внешних ссылок, поэтому здесь встречаются и его значения (`pending`, `import`). Различать обязательно: на экране «это решил человек» и «это мы угадали» выглядят одинаково — одна строка с названием товара, — а значат противоположное. */
  "match": string;
  /** С чем ещё эта строка могла совпасть. Непусто только у неоднозначной догадки: выбрать за человека из двух одинаково подходящих товаров значит угадать монеткой и записать это как факт */
  "options"?: Array<DocflowIntakeProductOption>;
}

/** Сторона сделки, прочитанная из чужого файла. Показывается ТЕКСТОМ, даже когда контрагент сопоставлен: карточку могут переименовать, а документ обязан остаться читаемым таким, каким его прислали. */
export interface DocflowIntakeParty {
  /** Вид участника словами файла: юридическое лицо, предприниматель, иностранное лицо, физическое лицо */
  "kind": string;
  "name": string;
  "inn": string;
  "kpp": string;
  /** Адрес одной строкой, собранный из частей формата */
  "address": string;
}

/** Подсказка статьи расходов первого акта закупки (ERP-1810), по порядку: статья закупки, статья оплаты закупки или её счёта, статья последнего акта этого поставщика, правило разнесения контрагента. Только расходная статья ОПиУ в обращении. */
export interface DocflowIntakePnlItem {
  "id": UUID;
  /** Название статьи — так, как его назвал кабинет */
  "name": string;
  /** Откуда подсказка: order — статья закупки; payment — статья её оплаты или оплаты её счёта; last_act — статья последнего акта поставщика; rule — правило разнесения контрагента */
  "source"?: "order" | "payment" | "last_act" | "rule";
}

/** Что мы предлагаем принять к учёту. Ничего не меняет и никуда не ходит: предложение обязано быть безопасным, иначе «посмотреть, что там» становится действием с последствиями, и человек побоится его открыть раньше, чем решит принимать. */
export interface DocflowIntakePreview {
  "message": UUID;
  /** Нашёлся ли во вложениях титул продавца. Ложь означает, что принимать нечего: пакет либо неформализованный, либо файлы ещё не скачаны — чинится это синхронизацией, а не заполнением формы */
  "formalized": boolean;
  /** Принимается ли пакет прямо сейчас, без правок */
  "ready": boolean;
  /** Вид карточки документооборота, которую заведёт приёмка; пусто — карточки по этому пакету не будет. Читается вместе с formalized: непустой вид при formalized = false означает «учётного документа не будет, карточка будет», и приёмка по такому пакету осмысленна. Договор формализованным титулом не бывает по определению — его присылают подписанным PDF, — поэтому кнопку приёмки на нём гасить нельзя, её следует назвать «Завести карточку». */
  "flow_card_kind": "" | "contract" | "amendment" | "specification" | "act";
  /** Учётный документ, если пакет уже принят; иначе null. Показывается вместо повторной приёмки: второй документ по тому же пакету — это задвоенный приход и задвоенный долг перед поставщиком. */
  "accepted": DocflowAcceptedDocument | null;
  "source": DocflowIntakeSource;
  "counterparty": DocflowIntakeCounterparty;
  /** Товарная таблица чужого документа вместе с тем, что мы про неё предлагаем. Всегда массив, даже пустой */
  "lines": Array<DocflowIntakeLine>;
  "totals": DocflowIntakeTotals;
  /** Что мешает принять. Тот же тип и тот же порядок, что у предполётной проверки исходящего документа: интерфейс переводит их одним словарём */
  "issues": Array<DocflowIssue>;
  /** Бумага закрывающая (УПД, акт, накладная поставщика): приёмка с закупкой проводит её исполнение — акт поставщика по заказу, без ВХ и без разнесения (ERP-1810). Строки без номенклатуры этот путь не держат: акт исполняет строки заказа */
  "executes_order"?: boolean;
  /** Подбор закупки для «Куда в учёт» (ERP-1810): закупка, в которой бумага уже лежит (linked), открытые закупки того же поставщика и юрлица с остатком, равным сумме бумаги (amount), затем прочие, куда она помещается (open). Пусто у счёта и договора и когда закупок нет */
  "purchases"?: Array<DocflowIntakePurchase>;
  /** Действующие склады для выбора склада приёмки (ERP-1810). Приходят, когда в подборе есть закупка с товаром при включённом складе; выбирать склад нужно, только если у закупки goods = true нет warehouse_id */
  "warehouses"?: Array<DocflowIntakeWarehouse>;
}

/** Вариант номенклатуры, предложенный неоднозначной строке. */
export interface DocflowIntakeProductOption {
  "id": UUID;
  "name": string;
  "sku": string;
}

/** Закупка, исполнением которой можно принять закрывающую бумагу поставщика (ERP-1810). */
export interface DocflowIntakePurchase {
  "order_id": UUID;
  /** Номер закупки */
  "number": string;
  "title"?: string;
  /** Дата закупки ГГГГ-ММ-ДД */
  "date"?: string;
  /** Заказано */
  "amount": string;
  /** Осталось исполнить: заказано минус проведённые исполнения */
  "remaining": string;
  "currency"?: string;
  /** Договор закупки */
  "contract_number"?: string;
  /** Почему предложена: linked — бумага уже лежит в ней; amount — остаток равен сумме бумаги; open — бумага помещается в остаток */
  "reason": "linked" | "amount" | "open";
  /** Первому акту этой закупки нужна статья расходов: у закупки её нет, а операции заказа в финансах ещё нет. Приёмка без pnl_item_id ответит 409 docflow.edo.intake_pnl_item_required */
  "pnl_item_required"?: boolean;
  "suggested_pnl_item"?: DocflowIntakePnlItem;
  /** В закупке товар, и склад включён (ERP-1810): строки бумаги на товар закупки «Принять к учёту» заводит черновиком приёмки склада по закупке (проводит его склад), строки на услуги — актом поставщика */
  "goods"?: boolean;
  /** Склад приёмки товара: склад закупки, иначе склад по умолчанию юрлица. Нет при goods = true — склад выбирают из warehouses предложения и присылают полем warehouse_id приёмки */
  "warehouse_id"?: UUID;
  /** Название склада приёмки */
  "warehouse_name"?: string;
}

/** Реквизиты чужого файла обмена, из которого всё прочитано. Разбор частичный и ничего не проверяет: файл уже подписан и юридически значим, и отказать в его чтении из-за реквизита, который нам не нужен, значит потерять поставку из-за чужой ошибки в необязательном поле. */
export interface DocflowIntakeSource {
  "attachment": UUID;
  /** Как это вложение назвал ОПЕРАТОР. Стоит рядом с file_name намеренно: имя оператора («Счёт-фактура № 12») человек видит в списке вложений, а file_name — имя файла обмена, и это разные строки */
  "attachment_name": string;
  /** ИдФайл: имя файла обмена без расширения, как его записал продавец */
  "file_name": string;
  /** ВерсФорм: редакция формата словами самого файла */
  "format_version": string;
  /** Код документа по классификатору; у титула продавца 1115131 */
  "knd": string;
  /** Функция документа словами продавца: СЧФ, ДОП, СЧФДОП */
  "function": string;
  /** Наименование документа, данное ему составителем */
  "document_kind_name": string;
  /** Номер документа продавца */
  "number": string;
  /** Дата документа в форме ГГГГ-ММ-ДД. Пусто — дата не разобралась */
  "date": string;
  /** Она же в форме поставщика ДД.ММ.ГГГГ. Показывается, когда разбор не удался: чужую опечатку человек поймёт быстрее, чем пустое поле */
  "date_raw": string;
  /** Валюта документа наименованием и кодом, словами файла */
  "currency": string;
  /** Содержание операции словами продавца */
  "operation": string;
  "seller": DocflowIntakeParty;
  "buyer": DocflowIntakeParty;
}

/** Итоги таблицы словами поставщика. Мы их не пересчитываем: итог в чужом документе такой, какой он подписал. */
export interface DocflowIntakeTotals {
  "without_vat": string;
  /** Пусто при отметке «без НДС» у документа */
  "vat_amount": string;
  "with_vat": string;
  /** Отметка «без НДС» у документа целиком */
  "vat_without": boolean;
}

/** Склад, на который можно принять товар закупки (ERP-1810). */
export interface DocflowIntakeWarehouse {
  "id": UUID;
  /** Название склада */
  "name": string;
}

/** Одна невыполненная проверка. Форма одна на сборку файла формата ФНС и на приёмку входящего документа к учёту: интерфейс переводит их одним словарём, и вторая форма списка означала бы второй словарь. Ни одной надписи для человека здесь нет: код, путь реквизита и подробности значениями — фразу собирает интерфейс, и собирает её на языке читателя. */
export interface DocflowIssue {
  /** Машинный код проверки. Стабилен: по нему интерфейс ищет перевод. Проверки формата приходят кодами docflow.formats.* (required, too_long, too_short, pattern, not_allowed, not_a_number, negative, too_many_decimals, too_many_digits, not_encodable, conflict, no_lines, unsupported), а перевод учётного документа в титул добавляет свои — docflow.edo.counterparty_required (в документе не указан контрагент) и docflow.edo.seller_title_missing (во входящем пакете нет формализованного документа продавца: отвечать титулом покупателя не на что, а принимать к учёту нечего). Приёмка к учёту добавляет свои пять: docflow.edo.contact_required (не выбран контрагент), docflow.edo.date_unreadable (дата документа продавца не разобралась), docflow.edo.no_lines (в титуле продавца нет ни одной товарной строки), docflow.edo.product_required (строке документа не сопоставлена номенклатура) и docflow.edo.sign_first (документ ещё не подписан: в учёт его принимают после подписи). Коды маркировки исходящего УПД добавляют три: docflow.edo.marks_missing (отгрузка проведена не со всеми кодами; params required и assigned), docflow.edo.marks_not_in_circulation (коды не в обороте у продавца по последнему статусу ГИС МТ; params value — сколько) и docflow.edo.marks_gtin_missing (товар передаётся по GTIN, а штрихкода GTIN у него нет) */
  "code": string;
  /** Путь до реквизита ИМЕНАМИ ФНС — именами приказа, а не нашими: этими же словами человек будет искать требование в письме налоговой. Например `Документ/СвСчФакт/СвПрод/Адрес`. */
  "path": string;
  /** Номер товарной строки с единицы. Отсутствует, когда реквизит не про строку */
  "line"?: number;
  /** Подробности значениями: предел длины, перечень допустимых значений, пришедшее значение. Отсутствует, когда проверке нечего добавить. */
  "params"?: { [key: string]: string };
}

/** Пакет документов у оператора — конверт, а не учётный документ Акеды. */
export interface DocflowMessage {
  "id": UUID;
  "connection": UUID;
  /** Идентификатор пакета у оператора */
  "external_id": string;
  /** Редакция пакета: оператор меняет содержимое конверта, не меняя его идентификатор */
  "external_revision": string;
  "direction": "incoming" | "outgoing";
  /** Слова оператора, а не наша классификация */
  "doc_type": string;
  "doc_subtype": string;
  "doc_regulation": string;
  "number": string;
  /** Календарная дата документа ГГГГ-ММ-ДД; пусто означает, что даты нет вовсе */
  "date": string;
  /** Сумма строкой ровно так, как её прислал оператор; пусто означает «суммы нет», а не ноль */
  "amount": string;
  "currency": string;
  "counterparty": DocflowCounterparty;
  /** Код состояния документооборота у оператора */
  "state_code": string;
  /** Состояние словами оператора: своего перевода состояний у нас нет и быть не должно */
  "state_name": string;
  "our_org_external_id": string;
  "received_at"?: string;
  "created_at": string;
  "updated_at": string;
  "connection_name": string;
  "connection_provider": string;
  "company"?: UUID;
  "company_name": string;
  "attachments_total": number;
  "signatures_total": number;
  /** Сколько незакрытых этапов у пакета. Ноль означает «ход не за нами» */
  "actions_due": number;
  /** Название ближайшего незакрытого этапа словами оператора */
  "stage_name": string;
  /** У пакета открыт этап, который закрывается нашей подписью под самим документом. Отдельно от actions_due и stage_name: счётчик говорит «ход за нами», а название этапа — слова оператора, и отличить по ним подпись от согласования нельзя. Пока признак поднят, приёмка к учёту отказывает кодом docflow.edo.sign_first */
  "sign_required": boolean;
  /** Открытый подписной этап служебный: извещение о получении, подтверждение даты, квитанция. Отдельным признаком, потому что человеку это другое дело — «Подписать извещение» подтверждает технологию обмена, а не содержание документа. Приёмку к учёту служебный этап НЕ держит */
  "notice_sign_required": boolean;
  /** Состав пакета. Наполняется ТОЛЬКО в карточке одного пакета; в списке остаётся null. null означает «не спрашивали», пустой массив — «спросили, и там пусто» */
  "attachments"?: Array<DocflowAttachment> | null;
  "signatures"?: Array<DocflowSignature> | null;
  "stages"?: Array<DocflowStage> | null;
  "events"?: Array<DocflowEvent> | null;
  /** Карточки документооборота, которые вёз этот конверт. Как и весь состав, наполняется ТОЛЬКО в карточке одного пакета; в списке остаётся null */
  "flow_documents"?: Array<DocflowMessageFlowLink> | null;
  /** Соглашение сторон об аннулировании. Наполняется ТОЛЬКО в карточке одного пакета; в списке остаётся null — null означает «не спрашивали» */
  "cancellation"?: DocflowCancellation | null;
  /** Учётный документ, которым пакет принят к учёту. Пусто означает «не принимали» и делает пакет принимаемым; обнулиться поле может и после приёмки, когда учётный документ удалили */
  "accounting_document"?: UUID | null;
  /** Когда пакет приняли к учёту. Переживает удаление учётного документа: приёмка была */
  "accepted_at"?: string | null;
  /** Кто принял пакет к учёту */
  "accepted_by"?: number | null;
  /** Номер учётного документа приёмки для строки «В учёте: … № …»; пусто — не принят или документ не прочитан */
  "accounting_number"?: string;
  /** Вид учётного документа приёмки (ключ вида документа ядра), например finance_purchase */
  "accounting_type"?: string;
  /** Пакет записан оператору и наружу ещё не ушёл. Выводится из состава пакета при чтении: исходящий, без единого события обмена и без единой подписи */
  "draft": boolean;
  /** Корзина НАШЕГО зеркала: контрагент её не видит, и пакет у оператора остаётся прежним */
  "deleted_at"?: string | null;
  "deleted_by"?: number | null;
  /** Возвращают из корзины только trashed: у draft_removed документа у оператора больше нет */
  "deleted_reason": "" | "trashed" | "draft_removed";
  "recognized"?: DocflowRecognized;
  /** Что стало с оплатой этого счёта. Приходит И В СПИСКЕ, в отличие от состава пакета: состояние оплаты — ровно то, что человек читает глазами в каждой строке. Считает его модуль finance (счета, выписки и расчёты) одним запросом на всю страницу. null означает «этот счёт никто не оплачивает»: ни заведённой заявки, ни платежа, — именно там и остаётся кнопка «Отправить в оплату». */
  "payment"?: DocflowMessagePayment | null;
  /** Открывал ли карточку пакета текущий сотрудник — личная отметка, а не состояние у оператора. Считается в ленте одним запросом на страницу; карточка отдаёт false, потому что её открытие само ставит отметку дверью viewed. */
  "viewed": boolean;
  "state_category": DocflowStateCategory;
  /** Карточка документа в кабинете нашей организации у оператора («СсылкаДляНашаОрганизация»); пусто, пока карточку не перечитали */
  "operator_link": string;
  /** Печатный вид пакета (GET .../print); null — показать нечего */
  "print_form": DocflowMessagePrintForm | null;
}

/** Карточка документооборота в пакете — обратная сторона связи edo_links карточки. Пакет доказывает отправку и подпись, а содержание живёт в карточке; здесь видно, чьё содержание он вёз и чем карточка ему приходится. */
export interface DocflowMessageFlowLink {
  "id": UUID;
  "document": UUID;
  /** Чем карточка приходится конверту: основной документ, приложение или основание */
  "role": "primary" | "attachment" | "basis";
  /** Текущая редакция карточки: открывать человеку следует её */
  "version": number;
  "kind": DocflowFlowKind;
  "status": "draft" | "registered" | "archived";
  "title": string;
  "number": string;
  "date": string;
  "created_at": string;
}

export interface DocflowMessageList {
  "count": number;
  "results": Array<DocflowMessage>;
}

/** Состояние оплаты входящего счёта. Два состояния, а не шесть: путь заявки внутри финансов подробнее (план, отправлена, ждёт подписи, исполнена, отклонена, отменена), но ленте нужен ответ на один вопрос — деньги уже ушли или ещё нет. Оплаченным платёж делает ВЫПИСКА, а не наша кнопка и не слово банка: «отправлено в банк» означает лишь, что платёжка легла в интернет-банк на подпись. */
export interface DocflowMessagePayment {
  /** requested — заявка заведена, денег ещё нет; paid — платёж подтверждён выпиской */
  "state": "requested" | "paid";
  "request": UUID;
  /** Номер заявки на оплату словами для человека */
  "number"?: string;
  /** Дата оплаты из выписки в форме ГГГГ-ММ-ДД. Заполнена только у state=paid */
  "paid_on"?: string;
  /** Шаг заявки словарём хода заявки «Документов»: до согласования — состояние документа заявки, после — строка очереди финансов */
  "step"?: "draft" | "on_approval" | "rework" | "approved" | "scheduled" | "sent" | "paid" | "payment_cancelled";
  /** Заявка «Документов» по этому счёту, если она есть */
  "docflow_request"?: { [key: string]: unknown };
  /** Счёт оплачен своей закупкой: заявки нет (request нулевой), оплата закупки покрывает сумму счёта */
  "order"?: { [key: string]: unknown };
}

/** Печатный вид пакета. operator — PDF оператора с впечатанными подписями, лежащий у нас; ours — наша форма счёта или УПД по формализованному XML, когда оператор своего вида не отдал (штампа подписи оператора на ней нет). */
export interface DocflowMessagePrintForm {
  "source": "operator" | "ours";
  "size": number;
  /** Редакция пакета, с которой снят PDF оператора */
  "revision": string;
  "fetched_at": string;
}

export interface DocflowOrderActInput {
  /** Дата акта; пусто — дата продажи или закупки */
  "date"?: string;
  /** Пусто — следующий номер счётчика актов */
  "number"?: string;
  "title"?: string;
  /** Пусто — все услуги продажи или закупки; меньше — частичный акт суммой */
  "amount"?: string;
}

export interface DocflowOrderDocumentSet {
  "members": Array<DocflowOrderSetMember>;
  "missing": Array<string>;
  "order"?: DocflowOrderSetOrder;
  "basis": string;
}

export interface DocflowOrderImport {
  "id": UUID;
  "external_id"?: string;
  /** Пространство приложения, которое загружало */
  "source"?: string;
  "outcome": "accepted" | "updated" | "rejected";
  /** Машинный код отказа, например docflow.sale.contact_unknown */
  "reason"?: string;
  /** Причина отказа словами */
  "detail"?: string;
  "order_id"?: UUID;
  /** Тело загрузки, как его прислали, — для повтора */
  "payload"?: string;
  "created_at": string;
}

export interface DocflowOrderImportPage {
  "results": Array<DocflowOrderImport>;
}

export interface DocflowOrderInvoiceInput {
  /** Оплатить до */
  "due_date": string;
  "expected_until"?: string;
  "payment_purpose"?: string;
  /** Собрать назначение платежа умолчанием */
  "payment_purpose_auto"?: boolean;
  /** Пусто — на весь продажу или закупку; меньше — частичный счёт */
  "amount"?: string;
  /** Дата счёта; пусто — дата продажи или закупки */
  "date"?: string;
  /** Пусто — следующий номер счётчика счетов */
  "number"?: string;
  "title"?: string;
  /** Строка графика оплат продажи, по которой выставлен счёт: запоминается в счёте; чужая строка — 409 docflow.sale.payment_term_unknown */
  "payment_term_id"?: UUID;
  /** Сохранить черновиком вместо «Выставить» */
  "draft"?: boolean;
}

export interface DocflowOrderSetMember {
  "id": UUID;
  "kind": string;
  "title": string;
  "number"?: string;
  "date"?: string;
  "status": string;
  "direction": string;
  "settlement"?: string;
  "amount"?: string;
  "currency"?: string;
  "due_date"?: string;
  /** Назначение платежа, записанное на выданном счёте; только для invoice */
  "payment_purpose"?: string;
  /** Строка графика оплат продажи, по которой выставлен счёт; только для invoice */
  "payment_term_id"?: UUID;
  "self"?: boolean;
  /** Входящий счёт оплачен своей закупкой: оплата закупки комплекта покрывает его сумму */
  "paid_by_order"?: boolean;
}

export interface DocflowOrderSetOrder {
  "id": UUID;
  "number"?: string;
  "title": string;
  "date"?: string;
  "status": string;
  "amount"?: string;
  "currency"?: string;
  "side"?: string;
  "self"?: boolean;
}

export interface DocflowOrderUPDInput {
  /** Дата УПД; пусто — дата продажи или закупки */
  "date"?: string;
  /** Пусто — все услуги продажи или закупки; меньше — частичный УПД суммой */
  "amount"?: string;
  "stage_id"?: UUID;
  /** Пусто — СЧФДОП */
  "function"?: "СЧФДОП" | "ДОП";
}

export interface DocflowPaymentRequestRoutePreview {
  "approval": boolean;
  "required": boolean;
  "direct": boolean;
  "route_id"?: UUID;
  "route_name"?: string;
  "destination": "calendar" | "treasury";
}

/** Сумма и реквизиты, прочитанные ИЗ ФАЙЛА пакета, а не присланные оператором. Оператор присылает сумму отдельным реквизитом только у формализованных документов — УПД и счёта-фактуры; у счёта на оплату и договора она живёт внутри PDF. Поле стоит РЯДОМ с amount, а не вместо него: amount — слова оператора, по ним сверяют переписку спустя годы, и подменять их нашим чтением чужой бумаги нельзя. Разбор локальный и детерминированный: текстовый слой PDF, у скана — распознавание изображения; ни одной нейросети и ни одного обращения к платному справочнику. Строк товарной таблицы здесь нет: со скана они не восстанавливаются и фактом не выдаются. */
export interface DocflowRecognized {
  /** Когда разбирали. Пусто — попытки ещё не было; это не то же самое, что source=none («читали и брать оказалось нечего») */
  "at"?: string | null;
  /** Чем прочитано, и заодно насколько верить. title — подписанный файл обмена ФНС, проверять нечего; text — вытащено якорными правилами из чужой раскладки, и рядом со значением интерфейс ставит «проверьте»; none — читали и брать было нечего; пустая строка — разбора не было */
  "source": "" | "title" | "text" | "none";
  /** Имя вложения СЛОВАМИ ОПЕРАТОРА: по нему человек откроет ту же бумагу и сверит показанную цифру */
  "document": string;
  /** Итог к оплате строкой, как и amount: через число с плавающей точкой здесь теряются копейки. Пустая строка — итог в бумаге не нашёлся */
  "amount": string;
  /** Валюта счёта, если бумага её назвала. Пусто означает «не сказано»: подставлять рубль молча нельзя */
  "currency": string;
  "number": string;
  /** Дата документа в форме ГГГГ-ММ-ДД; пустая строка означает, что даты нет */
  "date": string;
}

export interface DocflowSalesOrder {
  "id": UUID;
  "company_id": UUID;
  "contact_id": UUID;
  "contract_document_id"?: UUID;
  "number"?: string;
  "title": string;
  "status": "draft" | "confirmed" | "done" | "cancelled";
  "status_id"?: UUID;
  /** Имя статуса, которое придумал кабинет */
  "status_name"?: string;
  "funnel_id"?: UUID;
  "scenario": "self_service" | "one_off_sale" | "contract_sale";
  "steps": Array<string>;
  "currency": string;
  "manager"?: string;
  "comment"?: string;
  "external_id"?: string;
  "buyer"?: DocflowSalesOrderBuyer;
  /** Сколько подтвердил эквайринг — списания минус возвраты */
  "acquiring_amount"?: string;
  "order_date"?: string;
  "ship_date"?: string;
  "due_date"?: string;
  "discount"?: string;
  "prices_include_vat": boolean;
  "items": Array<DocflowSalesOrderItem>;
  "amount": string;
  "goods_amount": string;
  "service_amount": string;
  /** Сколько денег пришло на счёт по продаже или закупке */
  "paid_amount": string;
  "shipped_amount": string;
  "invoiced_amount": string;
  "closed_amount": string;
  "payment_status": "unpaid" | "partial" | "paid";
  "shipment_status": "not_shipped" | "partial" | "shipped";
  "company_name"?: string;
  "contact_name"?: string;
  "contract_title"?: string;
  "company_archived"?: boolean;
  "contact_archived"?: boolean;
  "created_at": string;
  "updated_at": string;
}

/** Как покупатель представился в продаже или закупке */
export interface DocflowSalesOrderBuyer {
  "name"?: string;
  "phone"?: string;
  "email"?: string;
}

export interface DocflowSalesOrderItem {
  "id": UUID;
  "product_id"?: UUID;
  "title": string;
  "kind": string;
  "unit"?: string;
  "quantity": string;
  "price": string;
  "discount"?: string;
  "vat_rate"?: string;
  "position": number;
  "amount"?: string;
}

export interface DocflowSalesOrderStatusInput {
  "status": "draft" | "confirmed" | "done" | "cancelled";
}

/** Подпись под вложением или под пакетом целиком. Подписей под одним файлом несколько — наша и контрагента, — и каждая приходит своим файлом со своим сертификатом. */
export interface DocflowSignature {
  "id": UUID;
  "message": UUID;
  "attachment"?: UUID;
  "side": "ours" | "counterparty";
  "signer_name": string;
  "signer_position": string;
  "certificate": DocflowCertificate;
  /** Номер машиночитаемой доверенности. С 2023 года подпись сотрудника без неё недействительна */
  "poa_number": string;
  "signed_at"?: string;
  /** Контейнер подписи скачан к нам и открывается отдельной операцией */
  "stored": boolean;
  "created_at": string;
}

/** Этап документооборота: что с пакетом можно сделать сейчас. Список действий приходит от ОПЕРАТОРА и не выводится из нашего состояния. */
export interface DocflowStage {
  "id": UUID;
  "message": UUID;
  /** Идентификатор этапа у оператора; он же адресует действие */
  "external_id": string;
  "name": string;
  "actions": Array<DocflowStageAction>;
  /** Этап закрывается подписью. Признак оператора, а не наш вывод из названия */
  "requires_signature": boolean;
  /** Ход не за нами. Закрытые этапы не показываются и не считаются */
  "closed": boolean;
  /** Служебный этап оператора — извещение о получении, подтверждение, квитанция. Технология обмена, а не решение по документу: клиент обрабатывает все служебные этапы пакета одним действием, а не по кнопке на каждый */
  "service": boolean;
  /** С какого момента этап ждёт человека: дата этапа у оператора, без неё — когда зеркало увидело его открытым; открытый снова этап считается заново */
  "started_at": string;
  "created_at": string;
  "updated_at": string;
}

/** Действие, которое оператор разрешает на этапе. Код отправляют оператору, надпись показывают человеку. */
export interface DocflowStageAction {
  "code": string;
  "name": string;
  /** Действие закрывается подписью («ТребуетПодписания» оператора). Точнее признака этапа: на этапе «Утверждение» подписи требует «Утвердить», а «Переназначить» — нет. У этапов, записанных до появления признака, false у всех действий — тогда судят по requires_signature этапа */
  "requires_signature"?: boolean;
}

export type DocflowStateCategory = "in_work" | "awaiting_signature" | "cancellation_requested" | "cancellation_refused" | "draft" | "error" | "signer_invalid" | "approved" | "rejected" | "cancelled" | "interrupted";

export interface DocflowTemplatePastAct {
  "order_id": UUID;
  "number": string;
  "date": string;
  /** Дата закрывающей бумаги по правилу шаблона */
  "closing_date": string;
  "amount": string;
  "currency": string;
  /** Бумага выпущена этим нажатием */
  "issued": boolean;
  /** Почему бумага не выпущена */
  "error"?: "period_closed" | "act_needs_no_vat" | "failed";
}

export interface DocflowTemplatePastActs {
  "items": Array<DocflowTemplatePastAct>;
  "issued": number;
  "failed": number;
}

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

export interface FilesAccessPolicy {
  "folder_id": UUID;
  "root_id": UUID;
  "is_root": boolean;
  "restricted": boolean;
  "break_inheritance": boolean;
  "grants": Array<FilesGrant>;
  /** Права, действующие сверху по дереву */
  "inherited": Array<FilesGrant>;
}

export interface FilesBreadcrumb {
  "id": UUID;
  "name": string;
}

export interface FilesEntry {
  "kind": "folder" | "file";
  "folder"?: FilesFolder;
  "file"?: FilesFile;
}

export interface FilesFile {
  "id": UUID;
  "folder_id": UUID;
  "root_id": UUID;
  "name": string;
  /** HTTP(S)-адрес внешнего ярлыка; отсутствует у обычных файлов */
  "external_url"?: string;
  "extension": string;
  "mime_type": string;
  "size_bytes": number;
  "version_no": number;
  "version_id"?: UUID;
  "owner_id": number;
  "created_by": number;
  "updated_by"?: number;
  "trashed_at"?: string;
  "created_at": string;
  "updated_at": string;
  /** skipped — содержимое крупнее порога проверки: оно выдаётся, но честно помечено непроверенным */
  "scan_status": "pending" | "scanning" | "clean" | "infected" | "skipped" | "error";
  "scan_verdict"?: string;
  "preview_status": "pending" | "processing" | "ready" | "unsupported" | "error";
  "has_thumbnail": boolean;
  "is_favorite": boolean;
  "folder_name"?: string;
  "path"?: Array<FilesBreadcrumb>;
}

export interface FilesFolder {
  "id": UUID;
  "parent_id"?: UUID;
  "root_id": UUID;
  "depth": number;
  "name": string;
  /** Личное хранилище принадлежит своему владельцу целиком */
  "kind": "shared" | "personal";
  "icon": string;
  "color": string;
  "description": string;
  /** Закрытое хранилище видно только участникам его списка */
  "is_restricted": boolean;
  /** Права хранилища на эту папку не действуют */
  "break_inheritance": boolean;
  /** Бизнес хранилища; у вложенной папки — бизнес её хранилища. Хранилище бизнеса видят участники, чья область доступа касается бизнеса, и поимённо выданные; null — хранилище всего кабинета или личное */
  "business_id": UUID | null;
  "owner_id": number;
  "created_by": number;
  "trashed_at"?: string;
  "created_at": string;
  "updated_at": string;
  "can_read": boolean;
  "can_write": boolean;
  /** Право выпускать внешние ссылки; из открытости хранилища не следует */
  "can_share": boolean;
  "can_manage": boolean;
  "is_favorite": boolean;
  "folder_count": number;
  "file_count": number;
  "size_bytes": number;
}

export interface FilesFolderInput {
  "parent_id"?: UUID;
  "name": string;
  "icon"?: string;
  "color"?: string;
  "description"?: string;
  "kind"?: "shared";
  "is_restricted"?: boolean;
  /** Бизнес общего хранилища (только у верхнего уровня). Поле не передано — не менять (у нового — единственный бизнес области доступа или весь кабинет); null — хранилище всего кабинета. Бизнес вне области доступа — 403 files.business_forbidden */
  "business_id"?: UUID | null;
}

export interface FilesGrant {
  "id"?: UUID;
  "principal_type": "everyone" | "user" | "role" | "department";
  "principal_key": string;
  "can_read": boolean;
  "can_write": boolean;
  "can_share": boolean;
  "can_manage": boolean;
}

export interface FilesListing {
  "folder": FilesFolder;
  "path": Array<FilesBreadcrumb>;
  "entries": Array<FilesEntry>;
  "total": number;
}

export interface FilesSearchHit {
  "file": FilesFile;
  "snippet"?: string;
  "matched": "name" | "content";
}

export interface FilesShare {
  "id": UUID;
  "folder_id"?: UUID;
  "file_id"?: UUID;
  "root_id": UUID;
  /** upload — приёмник файлов: получатель кладёт своё и не видит чужого */
  "mode": "view" | "download" | "upload";
  "title": string;
  "has_password": boolean;
  "expires_at"?: string;
  "max_downloads"?: number;
  "download_count": number;
  "last_access_at"?: string;
  "revoked_at"?: string;
  "created_by": number;
  "created_at": string;
  "target_name"?: string;
  /** Показывается один раз при создании; в базе лежит только его хэш */
  "token"?: string;
  "url"?: string;
}

export interface FilesShareInput {
  "folder_id"?: UUID;
  "file_id"?: UUID;
  "mode": "view" | "download" | "upload";
  "title"?: string;
  "password"?: string;
  /** Момент, после которого ссылка перестаёт открываться */
  "expires_at"?: string | null;
  "max_downloads"?: number | null;
}

export interface FilesUpload {
  "id": UUID;
  "folder_id": UUID;
  "root_id": UUID;
  "file_id"?: UUID;
  "name": string;
  "mime_type": string;
  "size_bytes": number;
  "part_bytes": number;
  "part_count": number;
  "status": "pending" | "uploading" | "completed" | "failed" | "aborted";
  "error_code"?: string;
  "expires_at": string;
  "created_at": string;
  /** Уже принятые части; на них держится докачка */
  "uploaded"?: Array<FilesUploadedPart>;
  /** Подписанные адреса частей для прямой записи в объектное хранилище */
  "direct_urls"?: { [key: string]: string };
}

export interface FilesUploadInput {
  "folder_id": UUID;
  /** Задан при загрузке новой версии существующего файла */
  "file_id"?: UUID;
  "name": string;
  /** Путь файла внутри загружаемой папки; недостающие папки создаются по нему */
  "relative_path"?: string;
  "mime_type"?: string;
  "size_bytes": number;
  "comment"?: string;
}

export interface FilesUploadedPart {
  "number": number;
  "etag": string;
  "size": number;
}

export interface FilesVersion {
  "id": UUID;
  "file_id": UUID;
  "version_no": number;
  "size_bytes": number;
  "mime_type": string;
  "content_sha256"?: string;
  /** Версия со статусом pending, scanning или infected не отдаётся */
  "scan_status": "pending" | "scanning" | "clean" | "infected" | "skipped" | "error";
  "scan_verdict"?: string;
  "preview_status": "pending" | "processing" | "ready" | "unsupported" | "error";
  "text_status": "pending" | "processing" | "ready" | "unsupported" | "error";
  "comment"?: string;
  "created_by": number;
  "created_at": string;
}

export interface FinanceAccount {
  "id": UUID;
  /** Бизнес, которому принадлежат деньги — у счёта из юрлица, у кассы из её карточки. null только у старого счёта без юрлица в кабинете с несколькими бизнесами. */
  "business"?: string | null;
  /** Где лежат деньги. `bank` — расчётный счёт, `cash` — касса из справочника «Кассы». Список общий намеренно: вопрос «сколько у меня денег» задаётся один раз. У кассы банковские поля (`bic`, `number`, `bank_name`, `connector`) пусты по построению, а не «ещё не заполнены», и карточка счёта по её идентификатору не открывается. */
  "kind": "bank" | "cash";
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
  /** Остаток по данным банка на момент `bank_balance_at`, decimal string. null — банк остатка не называл (счёт не подключён или остаток ещё не приходил): это не ноль, и сверять с ним нечего. */
  "bank_balance"?: string | null;
  /** Когда банк назвал остаток `bank_balance`. */
  "bank_balance_at"?: string | null;
  /** Когда счёт закрыт банком. null — счёт действующий. */
  "bank_closed_at"?: string | null;
  /** «Используется с»: с какой даты счёт принадлежит бизнесу. Операции раньше неё коннектор не запрашивает, загрузка файла пропускает, ручной ввод отклоняет. Поля нет — ограничения нет. */
  "in_use_since"?: string;
  /** Часовой пояс банковских суток счёта (IANA), например Asia/Novosibirsk. По нему банк режет сутки выписки, и по нему считаются окно синхронизации, «Загрузить период» и остаток на дату. Умолчание — по БИК подразделения банка. null у кассы. */
  "bank_timezone"?: string | null;
  /** Откуда пояс: `bic` — определён по БИК, `default` — определить не удалось, стоит умолчание (проверьте пояс), `manual` — задан человеком; подключение банка ручной пояс не трогает. */
  "bank_timezone_source"?: "bic" | "default" | "manual" | null | null;
  /** Вид счёта. `settlement` — расчётный (счёт книги 51), `deposit` — вклад. Деньги вклада учитываются статьёй «Депозиты и вклады»: отправка и возврат идут ею, а остаток депозитного счёта в итог денег не входит. */
  "account_type"?: "settlement" | "deposit";
  /** Откуда вид: `number` — выведен из номера счёта (421…–422… и 423…, 426… — вклад), `bank` — назван банком, `manual` — выбран человеком. Ручной выбор номер и банк не перебивают. */
  "account_type_source"?: "number" | "bank" | "manual";
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
  "is_active"?: boolean;
  /** «Используется с», ГГГГ-ММ-ДД; пусто — без ограничения. */
  "in_use_since"?: string;
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
  /** «Используется с», ГГГГ-ММ-ДД; null или пустая строка снимают ограничение. */
  "in_use_since"?: string | null;
  /** Часовой пояс банковских суток (IANA). Источник пояса становится manual. */
  "bank_timezone"?: string;
}

export interface FinanceAccountableBalance {
  "business"?: string;
  /** Сотрудник; пусто — проводки 71 без сотрудника */
  "employee": string;
  "employee_name": string;
  /** Выдано под отчёт */
  "issued": string;
  /** Отчитано авансовыми отчётами */
  "reported": string;
  /** Возвращено деньгами */
  "returned": string;
  /** На руках; минус — перерасход */
  "balance": string;
  /** Старейшая непокрытая выдача */
  "oldest_open"?: string;
  "days_open": number;
  /** Срок авансового отчёта бизнеса, дней */
  "deadline": number;
  "overdue": boolean;
}

export interface FinanceAccountableBalances {
  "on": string;
  "rows": Array<FinanceAccountableBalance>;
}

export interface FinanceAcquirer {
  /** Настройка эквайринга */
  "id": UUID;
  /** Юрлицо-продавец */
  "company_id": UUID;
  /** Ключ провайдера, как в подтверждении оплаты картой (yookassa) */
  "provider": string;
  /** Контрагент-эквайер */
  "contact_id": UUID;
  /** Название контрагента-эквайера */
  "contact_name"?: string;
  /** Ставка НДС, которую эквайер начисляет на комиссию, в процентах; null — без НДС */
  "fee_vat_rate": string | null;
  /** Когда признаётся расход по комиссии: payment — по данным платежа; closing_document — по закрывающему документу эквайера (УПД или акт за период) */
  "fee_recognition": "payment" | "closing_document";
}

export interface FinanceAcquirerInput {
  /** Юрлицо-продавец */
  "company_id": UUID;
  /** Ключ провайдера, как в подтверждении оплаты картой (yookassa) */
  "provider": string;
  /** Действующий контрагент кабинета — эквайер */
  "contact_id": UUID;
  /** Ставка НДС эквайера на комиссию в процентах, от 0 до 100; пусто или null — без НДС */
  "fee_vat_rate"?: string | null;
  /** Когда признаётся расход по комиссии: payment — по данным платежа; closing_document — по закрывающему документу эквайера */
  "fee_recognition"?: "payment" | "closing_document";
}

export interface FinanceAcquirerList {
  /** Эквайеры доступных юрлиц */
  "acquirers": Array<FinanceAcquirer>;
}

export interface FinanceAcquiringCaptureInput {
  /** Продажа, заведённая этой установкой приложения. Без неё обязателен company_id: оплата розницы ложится на покупателя и разносится алгоритмом — в продажу дня, если она есть (ERP-1727) */
  "order_id"?: UUID;
  /** Юрлицо-продавец оплаты без продажи; при order_id не нужно */
  "company_id"?: UUID;
  /** Покупатель оплаты без продажи; не передан — системный «Розничный покупатель» */
  "contact_id"?: UUID;
  /** Ключ проверенного провайдера платежа */
  "provider": string;
  /** Уникальный номер списания у провайдера; повтор использует тот же номер */
  "external_id": string;
  /** Положительная сумма списания в валюте продажи, десятичная строка */
  "amount": string;
  /** Валюта продажи, ISO 4217 */
  "currency": string;
  /** Дата подтверждённого списания у провайдера */
  "paid_at": string;
  /** Сколько провайдер удержал из этого платежа, всего с налогом, десятичная строка; меньше суммы списания. Не передаётся, если провайдер удержание по платежу не называет. Создаёт документ «Комиссия эквайринга» (Дт 44 / Кт 57.03); в отпечаток повтора не входит, поэтому может прийти позже повтором того же платежа */
  "fee"?: string;
  /** В том числе налог с комиссии, десятичная строка, если провайдер его называет; передаётся только вместе с fee. Не передан — финансы считают налог по ставке эквайера из настройки «Эквайринг». К вычету (Дт 19) идёт, если юрлицо на дату выделяет входной налог; иначе остаётся в расходе */
  "fee_vat"?: string;
}

export interface FinanceAcquiringCaptureResult {
  /** Финансовый документ оплаты картой */
  "document_id": UUID;
  /** Оплата проведена в учёте */
  "status": "posted";
  /** Продажа, на которую указано списание */
  "order_id": UUID;
  /** true при повторе уже записанного списания */
  "replayed": boolean;
}

export interface FinanceAcquiringInTransit {
  /** Документ «Оплата картой» */
  "receipt_document_id": UUID;
  /** Номер документа оплаты */
  "number": string;
  /** Дата оплаты */
  "date": string;
  /** Юрлицо */
  "company_id": UUID;
  /** Ключ провайдера */
  "provider": string;
  /** Идентификатор платежа у провайдера */
  "external_id": string;
  /** Продажа */
  "order_id"?: UUID;
  /** Покупатель */
  "contact_id"?: UUID;
  /** Название покупателя */
  "contact_name"?: string;
  /** Сумма оплаты в валюте учёта */
  "amount": string;
  /** Удержание провайдера в валюте учёта; 0 — ещё неизвестно */
  "fee": string;
  /** Ожидаемая сумма к зачислению */
  "net_amount": string;
  /** Удержание уже заведено «Комиссией эквайринга» */
  "fee_known": boolean;
}

export interface FinanceAcquiringOverview {
  /** Оплаты, которые эквайер ещё не перечислил */
  "in_transit": Array<FinanceAcquiringInTransit>;
  /** Ожидаемая сумма к зачислению по ним */
  "in_transit_total": string;
  /** Выплаты эквайера, новые сверху */
  "payouts": Array<FinanceAcquiringPayout>;
  /** Последние реестры провайдера */
  "registries": Array<FinanceAcquiringRegistry>;
  /** Эквайеры юрлиц */
  "acquirers": Array<FinanceAcquirer>;
}

export interface FinanceAcquiringPayout {
  /** Банковская операция выплаты */
  "document_id": UUID;
  /** Номер банковской операции */
  "number": string;
  /** Дата зачисления */
  "date": string;
  /** Юрлицо */
  "company_id": UUID;
  /** Сумма зачисления */
  "amount": string;
  /** Сколько оплат сверено с выплатой */
  "cleared_count": number;
  /** Сумма к зачислению сверенных оплат */
  "cleared_net": string;
  /** Сверенные оплаты дают ровно сумму выплаты */
  "reconciled": boolean;
  /** Плательщик выплаты */
  "contact_name"?: string;
  /** auto — по сумме к зачислению; registry — по реестру провайдера */
  "clearing_source"?: string;
}

export interface FinanceAcquiringRegistry {
  /** Реестр */
  "id": UUID;
  /** Юрлицо */
  "company_id": UUID;
  /** Ключ провайдера */
  "provider": string;
  /** Имя загруженного файла */
  "file_name": string;
  /** Валюта платежей, ISO 4217 */
  "currency": string;
  /** Число платежей в реестре */
  "rows_count": number;
  /** Сумма платежей */
  "amount": string;
  /** Сумма к зачислению — ею реестр находит выплату */
  "net_amount": string;
  /** Удержано всего */
  "fee_amount": string;
  /** Выплата эквайера, с которой реестр сверен */
  "payout_document_id"?: UUID;
  /** awaiting_payout — выплаты на сумму реестра ещё нет; matched — сверен; discrepancy — сверен, но есть строки для человека */
  "status": "matched" | "awaiting_payout" | "discrepancy";
  /** Когда загружен */
  "uploaded_at": string;
  /** Строки реестра */
  "rows"?: Array<FinanceAcquiringRegistryRow>;
}

export interface FinanceAcquiringRegistryImport {
  "registry": FinanceAcquiringRegistry;
  /** true — этот файл уже был загружен */
  "replayed": boolean;
}

export interface FinanceAcquiringRegistryInput {
  /** Юрлицо, чьи платежи в реестре */
  "company_id": UUID;
  /** Ключ провайдера (yookassa) */
  "provider": string;
  /** Имя файла для истории загрузок */
  "file_name"?: string;
  /** Содержимое CSV реестра текстом в UTF-8, до 4 МБ */
  "content": string;
}

export interface FinanceAcquiringRegistryRow {
  /** Номер строки в файле */
  "line": number;
  /** Идентификатор платежа у провайдера */
  "external_id": string;
  /** Сумма платежа, десятичная строка */
  "amount": string;
  /** Сумма к зачислению, десятичная строка */
  "net_amount": string;
  /** Удержано провайдером, всего с налогом */
  "fee": string;
  /** В том числе налог с комиссии */
  "fee_vat"?: string;
  /** Время платежа из реестра */
  "paid_at"?: string;
  /** Найденная оплата картой */
  "receipt_document_id"?: UUID;
  /** matched — оплата найдена и удержание сходится; unknown_payment — оплаты с таким номером в учёте нет; fee_mismatch — в учёте другое удержание */
  "status": "matched" | "unknown_payment" | "fee_mismatch";
}

/** Версия правила авторазнесения. Пустые уровни — правило не сужено. */
export interface FinanceAllocationRule {
  "id"?: UUID;
  "business_id"?: UUID;
  "company_id"?: UUID;
  "account_id"?: UUID;
  "contact_id"?: UUID;
  "contract_id"?: UUID;
  /** Поступления или выплаты */
  "side"?: "receipt" | "payout";
  /** Правило; inherit — как у уровня выше */
  "rule"?: "ask" | "fifo" | "due_date" | "exact_amount" | "inherit";
  /** Дата начала действия версии */
  "valid_from"?: string;
  "created_by"?: number;
  "created_at"?: string;
}

/** Новая версия правила авторазнесения. */
export interface FinanceAllocationRuleInput {
  "business_id": UUID;
  "company_id"?: UUID;
  "account_id"?: UUID;
  "contact_id"?: UUID;
  "contract_id"?: UUID;
  "side": "receipt" | "payout";
  "rule": "ask" | "fifo" | "due_date" | "exact_amount" | "inherit";
  "valid_from": string;
}

/** Оплаты, которые разнесёт правило, и сколько разнесено. Отказ одной оплаты прогон не обрывает: её строка несёт failure (period_closed, posting_refused или failed). */
export interface FinanceAllocationRuleRun {
  "dry_run"?: boolean;
  /** Сколько оплат разнесено; в предпросмотре 0 */
  "applied"?: number;
  "items"?: Array<{ [key: string]: unknown }>;
}

/** Разнесение очереди по правилу; dry_run — предпросмотр. */
export interface FinanceAllocationRuleRunInput {
  "business_id"?: UUID;
  /** Предпросмотр без записи */
  "dry_run"?: boolean;
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
  "accounting_basis"?: AccountingBasis;
}

export interface FinanceBalanceSection {
  "key": "asset" | "liability" | "equity";
  "label": string;
  "total": string;
  "items": Array<FinanceBalanceItem>;
}

export interface FinanceBankLookup {
  "directory_configured": boolean;
  "bank": FinanceRequisitesBank | null;
}

export interface FinanceBankSuggestions {
  "directory_configured": boolean;
  "banks": Array<FinanceRequisitesBank>;
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
  /** Прежнее учётное физлицо зарплаты; пустая строка снимает его. Новое разнесение указывает человека в for_contact */
  "employee"?: string;
  /** Идентификатор контрагента; пустая строка снимает контрагента */
  "contact"?: string;
  /** «За кого»: контрагент сотрудника или собственника, чей расчёт гасит выдача. Пусто — как контрагент; не присланное поле остаётся как было */
  "for_contact"?: string | null;
  /** Продажа или закупка, который оплачивают наличные (приход — продажа, расход — закупка того же контрагента). Пустая строка снимает продажу или закупку; не присланное поле остаётся как было */
  "order"?: string | null;
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
  /** При отборе по юрлицу — чистый поток движений без юрлица и всего бизнеса */
  "unassigned_company"?: FinanceCashflowReportUnassignedCompany;
  "currency"?: string;
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

/** При отборе по юрлицу — чистый поток движений без юрлица и всего бизнеса */
export interface FinanceCashflowReportUnassignedCompany {
  "net_cash_flow"?: string;
  "business_net_cash_flow"?: string;
}

export interface FinanceCashflowSection {
  "key": "operating" | "investing" | "financing";
  "label": string;
  "net": string;
  "items": Array<FinanceCashflowItem>;
}

export interface FinanceCommercialPosition {
  "terms": FinanceCounterpartyTerms;
  "exposure": FinanceSettlementExposure;
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
  /** The provider's technical reply, verbatim — material for an investigation, not a message for the cabinet screen: it may carry machine keys such as "invalid_client". The portal operator reads it in full on the bank connectors page, while the cabinet card renders last_error_code instead. Empty when the failure was ours: an internal cause never reaches this field, it is logged and named by last_error_code instead. */
  "last_error": string;
  /** Machine code of the last failure, translated by the client. Present because the text is stored: it is written in whatever locale the background sync happened to run in, and only a finite code can be rendered in the reader's language. */
  "last_error_code": "" | "finance.connector.internal" | "finance.connector.provider_unauthorized" | "finance.connector.provider_rate_limited" | "finance.connector.provider_declined" | "finance.connector.consent_required";
  "accounts_total": number;
  "accounts_linked": number;
  /** True only for an abandoned connection attempt: no accounts returned by the bank and no sync run at all. Everything else is the origin trail of the imported operations and is never deleted — both links cascade — so such a connection is disconnected instead. */
  "can_delete": boolean;
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

export interface FinanceConnectorMTLSStatus {
  "configured": boolean;
  "expires_at"?: string | null;
  "warning"?: string;
}

export interface FinanceConnectorPage {
  "count": number;
  "results": Array<FinanceConnector>;
}

export interface FinanceConnectorProvider {
  "key": FinanceConnectorProviderKey;
  "name": string;
  "auth_kind": FinanceConnectorAuthKind;
  "supports_webhook": boolean;
  "credential_hint": string;
  "redirect_path"?: string;
  /** Банк принимает запросы только с адресов, объявленных в его кабинете. */
  "requires_egress_allowlist": boolean;
  /** Банк не отдаёт списка счетов организации — номер счёта называет человек. */
  "requires_account_number": boolean;
  /** Исходящие адреса контура для белого списка банка. Пусто — адрес контура не настроен. */
  "egress_ips"?: Array<string>;
  /** Пояс банковских суток (IANA), например Europe/Moscow. По нему считаются окно выписки и «сегодня» банка; даты операций банка не пересчитываются. */
  "timezone": string;
}

export type FinanceConnectorProviderKey = "modulbank" | "tbank" | "tochka" | "alfa" | "sber";

export interface FinanceConnectorProviderPage {
  "count": number;
  "results": Array<FinanceConnectorProvider>;
}

export type FinanceConnectorStatus = "connected" | "paused" | "error" | "reauth_required" | "awaiting_consent" | "disconnected";

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
  /** База: ledger_profit — прибыль по книге (general_ledger_profit ОПиУ); cashflow_total — весь ДДС, чистый поток без внутренних переводов; operating_cashflow — операционный раздел ДДС; pnl_layout_row — строка макета ОПиУ (нужны base_layout_id и base_layout_row); pnl — устаревшее имя ledger_profit */
  "base_kind"?: "ledger_profit" | "cashflow_total" | "operating_cashflow" | "pnl_layout_row" | "pnl";
  /** Макет ОПиУ для base_kind=pnl_layout_row */
  "base_layout_id"?: UUID;
  /** Идентификатор строки макета ОПиУ для base_kind=pnl_layout_row */
  "base_layout_row"?: string;
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

export interface FinanceExpenseReportCreate {
  "date"?: string;
  "comment"?: string;
  /** business или company обязателен; item — статья вида «подотчёт»; for_contact — сотрудник (контрагент из папки «Сотрудники») */
  "refs": { [key: string]: string };
  "payload"?: FinanceExpenseReportCreatePayload;
  /** Провести сразу */
  "post"?: boolean;
}

export interface FinanceExpenseReportCreatePayload {
  /** Валюта учёта; другая отклоняется */
  "currency"?: string;
  "rows"?: Array<FinanceExpenseReportRow>;
}

export interface FinanceExpenseReportRow {
  /** Статья траты — любая */
  "item": UUID;
  /** Сумма в валюте учёта, больше нуля */
  "amount": string;
  /** Продавец, кому заплатил сотрудник */
  "contact"?: UUID;
  /** «За кого» у статей, которым нужен человек */
  "for_contact"?: UUID;
  "receipt_date"?: string;
  "receipt_number"?: string;
  "project"?: UUID;
  "deal"?: UUID;
  "comment"?: string;
  /** «Закрывает» — долг поставщику (закупка, счёт), который гасит строка по статье расчётов с поставщиками (ERP-1249); пусто — долг подберёт правило */
  "closes"?: UUID;
}

export interface FinanceItemMergeRequest {
  "target_id": UUID;
}

export interface FinanceItemMergeResult {
  "preview"?: boolean;
  "source_id"?: UUID;
  "source_name"?: string;
  "target_id"?: UUID;
  "target_name"?: string;
  "documents"?: Array<{ [key: string]: unknown }>;
  "months"?: Array<{ [key: string]: unknown }>;
  "settings"?: Array<{ [key: string]: unknown }>;
  "references"?: Array<{ [key: string]: unknown }>;
  "totals"?: Array<{ [key: string]: unknown }>;
  "deleted"?: boolean;
}

export interface FinanceOneCConnection {
  "id": UUID;
  "company_id": UUID;
  "company_name": string;
  /** Адрес публикации базы 1С без хвоста /ws */
  "base_url": string;
  "username": string;
  "has_password": boolean;
  /** Версия EnterpriseData; пусто — старшая, которую назовёт база */
  "format_version": string;
  "node_code": UUID;
  "node_prefix": string;
  "base_node_code": string;
  "base_name": string;
  "base_config_version": string;
  /** access — доступ не проверен; node — узла Акеды в базе нет; wizard — бухгалтер не прошёл мастер в 1С; ready — обмен идёт */
  "setup_step": "access" | "node" | "wizard" | "ready";
  "sent_no": number;
  "received_no": number;
  "objects": FinanceOneCObjects;
  "documents_since"?: string;
  "send_every_minutes": number;
  "receive_daily_at": string;
  "errors_owner_user_id"?: number;
  "last_session_at"?: string;
  "last_error"?: string;
  "created_at": string;
  "updated_at": string;
}

export interface FinanceOneCConnectionInput {
  "company_id": UUID;
  /** Адрес публикации базы 1С: https://сервер/ИмяБазы */
  "base_url": string;
  "username": string;
  /** Пароль пользователя 1С; вводится только на экране подключения, через MCP не передаётся */
  "password"?: string;
  "format_version"?: string;
  "objects"?: FinanceOneCObjects;
  "documents_since"?: string;
  "send_every_minutes"?: number;
  "receive_daily_at"?: string;
  "errors_owner_user_id"?: number;
}

export interface FinanceOneCConnectionPage {
  "count": number;
  "results": Array<FinanceOneCConnection>;
}

/** Состав обмена — вид данных → включён. */
export interface FinanceOneCObjects {
  "counterparties"?: boolean;
  "contracts"?: boolean;
  "services"?: boolean;
  "sales"?: boolean;
  "purchases"?: boolean;
  "bank"?: boolean;
  "cash"?: boolean;
  "payroll"?: boolean;
  "budget"?: boolean;
  "declarations"?: boolean;
}

export interface FinanceOpeningDebtRequest {
  /** Дата остатков — дата старта учёта */
  "date": string;
  "business_id": UUID;
  /** Юрлицо; пусто — долг без юрлица */
  "company_id"?: UUID | null;
  "contact_id": UUID;
  /** Счёт долга: 60.01 — наш долг поставщику, 62.01 — долг покупателя */
  "account_code": "60.01" | "62.01";
  /** Сторона ноги книги. Кредит на 62.01 — отрицательная дебиторка, не аванс */
  "direction": "debit" | "credit";
  /** Сумма в валюте долга, больше нуля */
  "amount": string;
  /** Валюта долга (ISO 4217); пусто — валюта учёта кабинета */
  "currency"?: string;
  /** Срок оплаты; пусто — «без срока» */
  "due_date"?: string;
  /** Общий признак одного ввода остатков (entity_refs.opening_batch) */
  "batch"?: string;
  /** Откуда строка: введена вручную или загружена из 1С */
  "source"?: "manual" | "onec";
}

export interface FinanceOperation {
  "recognition_mode": "document" | "plan";
  /** Фактически оплачено по проведённым распределениям */
  "cash_paid": string;
  /** Оплата сверх признанного начисления */
  "advance": string;
  "cash_payments": Array<FinanceOperationFact>;
  /** Применения к долгу, не привязанные к строке графика (ERP-1417) */
  "unattributed_facts": Array<FinanceOperationFact>;
  "id": UUID;
  "kind": "sale" | "purchase";
  "company_id": UUID;
  "contact_id": UUID;
  "currency": string;
  /** Decimal string */
  "amount": string;
  "due_date"?: string;
  "purpose"?: string;
  "pnl_item_id"?: string;
  "project_id"?: string;
  "contract_id"?: string;
  "source_system": string;
  "source_ref": string;
  "external_id": string;
  "schema_version": number;
  "status": CoreDocumentStatus;
  "current": FinanceOperationVersion;
  "versions": Array<FinanceOperationVersion>;
}

export interface FinanceOperationAccrualAllocation {
  "accrual_id": UUID;
  /** Положительная decimal string */
  "amount": string;
}

/** Указывает ровно одну цель распределения: accrual_id для одной части плана либо allocations для нескольких частей. Совместимость этого ограничения проверяет сервер; плоская форма сохранена, чтобы сгенерированные TypeScript- и Swift-клиенты не теряли общие поля. */
export interface FinanceOperationAccrualCreate {
  "source": FinanceOperationSource;
  "expected_version": number;
  "accrual_id"?: UUID;
  "allocations"?: Array<FinanceOperationAccrualAllocation>;
  "date": string;
  /** Сумма документа; должна совпасть с суммой allocations */
  "amount": string;
  /** Обычно вычисляется из графика; переданное значение не может ему противоречить */
  "due_date"?: string;
  "reason"?: string;
  /** Только закупка без «в т.ч. НДС» на плане (ERP-484, подшаг 5.3в): «в т.ч. НДС» акта поставщика. Обязательна, если на дату начисления бизнес очищает суммы и юрлицо принимает налог к вычету; 0 — налог не выделен. У плана с налогом начисление берёт долю нарастающим итогом, и непустое значение — 400 */
  "vat_amount"?: string;
  "supplier_document"?: SupplierDocument;
}

export interface FinanceOperationAccrualResult {
  "operation_id": UUID;
  "version_id": UUID;
  "accrual_id"?: string;
  "allocations": Array<FinanceOperationAccrualAllocation>;
  "document": CoreDocument;
  "operation": FinanceOperation;
  /** Акт по продаже или закупке: строки со ставкой человека, равной прежней общей ставке юрлица, а на дату акта общая ставка другая */
  "vat_warnings"?: Array<CoreOrderVATWarning>;
}

export interface FinanceOperationAction {
  "source": FinanceOperationSource;
  "expected_version": number;
  "reason"?: string;
}

export interface FinanceOperationCreate {
  /** document — один документ начисления; plan — план, который сам не создаёт долг */
  "recognition_mode"?: "document" | "plan";
  "source": FinanceOperationSource;
  "kind": "sale" | "purchase";
  "company_id": UUID;
  "contact_id": UUID;
  "date": string;
  "currency": string;
  /** Положительная decimal string */
  "amount": string;
  "due_date"?: string;
  "purpose"?: string;
  "pnl_item_id": UUID;
  "project_id"?: string;
  "contract_id"?: string;
  "accruals"?: Array<FinanceOperationStageInput>;
  "payments"?: Array<FinanceOperationStageInput>;
  "references"?: Array<FinanceOperationReferenceInput>;
  /** Только закупка: «в т.ч. НДС» документа поставщика (ERP-484, подшаги 5.3 и 5.3в). У закупки по документу обязательна, если на дату бизнес очищает суммы и юрлицо принимает налог к вычету; 0 — налог не выделен. У плана по периодам необязательна: указана — начисления берут долю нарастающим итогом, нет — налог приносит каждое начисление. Вне периода непустое значение — 400 */
  "vat_amount"?: string;
  "supplier_document"?: SupplierDocument;
}

export interface FinanceOperationFact {
  "document_id": UUID;
  "type_key": string;
  "type_name": string;
  "number": string;
  "date": string;
  "status": CoreDocumentStatus;
  /** Decimal string из движений проведённого регистратора */
  "amount": string;
  "currency": string;
}

export interface FinanceOperationReferenceInput {
  "relation": string;
  "target_module": string;
  "target_type": string;
  "target_id": string;
}

export interface FinanceOperationSource {
  "schema_version": number;
  "source_system": string;
  "source_ref": string;
  "external_id": string;
  "idempotency_key": string;
}

export interface FinanceOperationStage {
  "id": UUID;
  "sequence": number;
  "label"?: string;
  "date": string;
  /** Плановая decimal string */
  "amount": string;
  "currency": string;
  /** Decimal string из проведённых документов */
  "actual_amount": string;
  "due_trigger"?: "after_accrual";
  "after_accrual_id"?: string;
  "delay_days"?: number;
  "payment_attribution_pending"?: boolean;
  "facts": Array<FinanceOperationFact>;
}

export interface FinanceOperationStageInput {
  "sequence": number;
  "label"?: string;
  /** Необязательная календарная дата; пусто означает без срока */
  "date"?: string;
  /** Положительная decimal string */
  "amount": string;
  /** По умолчанию валюта операции; другая валюта не принимается */
  "currency"?: string;
  /** Только для графика оплаты: считать срок от проведённого начисления */
  "due_trigger"?: "after_accrual";
  /** Номер части начисления; отсутствие означает от любого начисления */
  "after_accrual_sequence"?: number;
  "delay_days"?: number;
}

export interface FinanceOperationVersion {
  "id": UUID;
  "version": number;
  "change_kind": "initial" | "correction" | "reversal";
  "previous_version_id"?: string;
  "document_id": UUID;
  "document_status": CoreDocumentStatus;
  "is_marked_deleted": boolean;
  "company_id": UUID;
  "contact_id": UUID;
  "currency": string;
  "effective_date": string;
  "reason"?: string;
  "accruals": Array<FinanceOperationStage>;
  "payments": Array<FinanceOperationStage>;
}

export interface FinanceOrderActInput {
  "source": FinanceOperationSource;
  "date": string;
  /** Сумма акта с НДС в валюте продажи или закупки, decimal string */
  "amount": string;
  /** Срок оплаты; пусто — по строке графика продажи или закупки или условиям контрагента */
  "due_date"?: string;
  "reason"?: string;
  /** Статья выручки (расхода); пусто — статья продажи или закупки, политика бизнеса или системная */
  "pnl_item_id"?: { [key: string]: unknown };
  /** Этап работ продажи или закупки, который закрывает акт */
  "stage_id"?: { [key: string]: unknown };
  "vat_amount"?: string;
  "prices_include_vat"?: boolean;
  /** «За кого» закупки со статьёй вне ОПиУ: собственник для 75, сотрудник для 70/71; только у закупки */
  "for_contact"?: { [key: string]: unknown };
}

export interface FinancePaymentCalendar {
  "rnp_metrics"?: FinancePaymentCalendarRnpMetrics;
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
  /** «Должны» — поступления, выведенные из регистра расчётов: долг записан, его можно требовать */
  "committed_in": string;
  /** «С ожиданиями» — то же плюс выставленные счета и этапы графиков договоров */
  "expected_in": string;
  "undated"?: FinancePaymentCalendarUndated;
  "companies": Array<FinancePaymentCalendarCompany>;
  "step": "day" | "month" | "quarter";
  "periods": Array<FinancePaymentCalendarPeriod>;
  "totals": Array<FinancePaymentCalendarCell>;
  "days": Array<FinancePaymentCalendarDay>;
  "rows": Array<FinancePaymentCalendarRow>;
  "overdue": Array<FinancePaymentCalendarRow>;
}

export interface FinancePaymentCalendarRnpMetrics {
  "minimum_balance"?: string;
  "minimum_on"?: string;
  "first_gap_on"?: string;
}

export interface FinancePaymentCalendarUndated {
  "count_in": number;
  "count_out": number;
  "amount_in": string;
  "amount_out": string;
  "rows": Array<FinancePaymentCalendarRow>;
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
  "origin": "manual" | "receivable" | "payable" | "payment_request" | "contract_stage" | "invoice" | "contract_rule";
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
  "operation_id"?: UUID;
  "operation_kind"?: "sale" | "purchase";
  "operation_version"?: number;
  "contract_id"?: UUID;
  /** Карточка выставленного счёта у происхождения invoice; учётным документом счёт не является */
  "invoice_id"?: UUID;
  /** Строка ожидания, а не долга: счёт и этап договора обещают деньги, но требовать по ним нельзя */
  "expectation"?: boolean;
  /** Обязательство без срока оплаты: рядом со шкалой, а не на ней */
  "undated"?: boolean;
  /** Сумма удерживается контрагентом из будущей выплаты нам, а не уходит переводом: строка стоит во входящих с отрицательной суммой (неделя маркетплейса с перевесом возвратов) */
  "withheld_from_payout"?: boolean;
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
  "item"?: UUID;
  /** Название статьи ДДС; пусто у неразнесённой операции */
  "item_name"?: string;
  /** Разнесена ли операция: есть ли у неё статья ДДС. Тот же признак отдаёт журнал кассы, и ответ на этот вопрос у обоих один. */
  "allocated": boolean;
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

export interface FinancePayrollAutomationSettings {
  /** Ежемесячно заводить черновики начисления по штату */
  "auto_accrual": boolean;
}

export interface FinancePayrollRun {
  "id": UUID;
  "scope_key": string;
  "company_id"?: UUID;
  "business_id"?: UUID;
  "scope_name": string;
  /** Месяц в формате YYYY-MM */
  "month": string;
  "status": "running" | "draft" | "empty" | "blocked" | "failed";
  "document_id"?: UUID;
  "number"?: string;
  /** Причина блокировки или ошибки */
  "error"?: string;
  "created_at": string;
  "updated_at": string;
}

export interface FinancePayrollRunList {
  "results": Array<FinancePayrollRun>;
}

export interface FinancePnlCoverage {
  "missing": Array<FinancePnlCoverageItem>;
  "duplicated": Array<FinancePnlCoverageItem>;
  /** Налоги раздела «Налоги» за период без строки-источника «Налоги» в макете; итог и прибыль их включают */
  "taxes"?: string;
}

export interface FinancePnlCoverageItem {
  "id": UUID;
  "name": string;
  "path": string;
  "times"?: number;
}

export interface FinancePnlLine {
  "id": string;
  "name": string;
  "sign": number;
  "amount": string;
}

export interface FinancePnlReport {
  /** При отборе по юрлицу — результат движений без юрлица и всего бизнеса */
  "unassigned_company"?: FinancePnlReportUnassignedCompany;
  "rnp_metrics"?: { [key: string]: string };
  "currency"?: string;
  "from": string;
  "to": string;
  "revenue": string;
  "expense": string;
  "profit": string;
  "unclassified_in": string;
  "unclassified_out": string;
  "lines": Array<FinancePnlLine>;
  /** Налоги раздела «Налоги» по видам — строка ОПиУ «Налоги» */
  "taxes"?: Array<FinanceTaxKindAmount>;
  /** Итог строки «Налоги»; входит в расходы и прибыль */
  "taxes_total"?: string;
  /** Отбор по проекту или разрезу учёта — налоги начислены на юрлицо и на этот разрез не распределяются */
  "taxes_not_allocated"?: boolean;
  "layout_rows"?: Array<FinancePnlReportRow>;
  "layout"?: FinancePnlReportLayout;
  "columns": Array<FinanceReportColumn>;
  "companies"?: Array<FinanceReportCompany>;
  "accounting_basis"?: AccountingBasis;
}

/** При отборе по юрлицу — результат движений без юрлица и всего бизнеса */
export interface FinancePnlReportUnassignedCompany {
  "profit"?: string;
  "business_profit"?: string;
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
  /** Вид налога у строки вида налога и у подстроки «Налогов» */
  "tax_kind"?: string;
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

export interface FinanceReconciliationSummary {
  "total_count": number;
  "needs_attention_count": number;
  "unmatched_count": number;
  /** Входящие платежи без продажи или закупки и без проекта; имя поля сохранено для совместимости */
  "missing_order_count": number;
  "missing_cashflow_count": number;
  /** Сумма входящих платежей без продажи или закупки и без проекта; decimal string */
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
  /** Нет минуса входного НДС по источнику без возврата поставщику после вычета. */
  "input_vat_match"?: boolean;
  /** Источники с отрицательным остатком входного НДС, который не объяснён возвратом поставщику после вычета. */
  "input_vat_unexplained"?: Array<FinanceRegisterReconciliationInputVatUnexplainedItem>;
  /** Сверка стоимости склада с книгой по счетам запасов. */
  "stock"?: Array<FinanceRegisterReconciliationStockItem> | null;
  /** Остаток запасов, который после смены правила счёта лежит в книге на старом счёте и ещё не перенесён документом «Перенос остатка» (ERP-1146). Разрез — пара счетов. */
  "stock_transfer_pending"?: Array<FinanceRegisterReconciliationStockTransferPendingItem>;
  /** Пояснение к неперенесённому остатку для человека; пусто, если переносить нечего. */
  "stock_transfer_hint"?: string;
}

export interface FinanceRegisterReconciliationInputVatUnexplainedItem {
  "source": string;
  "source_number": string;
  "source_date": string;
  "company": string;
  "amount": string;
}

export interface FinanceRegisterReconciliationStockItem {
  /** Неперенесённый остаток, который уйдёт с этого счёта документом «Перенос остатка» (ERP-1146); нет поля — переносить нечего. */
  "transfer_pending_out"?: string;
  /** Неперенесённый остаток, который придёт на этот счёт документом «Перенос остатка» (ERP-1146); нет поля — переносить нечего. */
  "transfer_pending_in"?: string;
}

export interface FinanceRegisterReconciliationStockTransferPendingItem {
  "from_code": string;
  "to_code": string;
  "amount": string;
  "warehouses": number;
}

export interface FinanceRegisterRepairFailure {
  "id": UUID;
  /** Machine-readable reason (not_found, nothing_to_restore, wrong_document_type, period_closed, document_changed, payload_invalid, ledger_setup_missing, balance_shortage, ledger_imbalance, unexpected). */
  "code": string;
  /** Human-readable reason in the request language; an internal failure carries the case code instead of the raw error. */
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
  /** ИНН банка; пусто — справочник не назвал */
  "inn": string;
  /** КПП банка; пусто — справочник не назвал */
  "kpp": string;
}

export interface FinanceResponsiblePatch {
  "responsible": string | null;
}

export interface FinanceSaleLineInput {
  /** Товар строки; без него строка обязана назвать name */
  "product_id"?: string;
  /** Единица измерения строки */
  "unit_id"?: string;
  /** Единица словами, когда справочной нет */
  "unit"?: string;
  /** Наименование строки; у строки с товаром необязательно — его даёт карточка товара */
  "name"?: string;
  /** Положительная decimal string */
  "quantity": string;
  /** Цена единицы в режиме prices_include_vat документа */
  "price": string;
  /** Скидка строки суммой, в том же режиме цены */
  "discount"?: string;
  /** ПрТовРаб формата ФНС: 1 товар, 3 услуга; пусто — товар, если назван товар, иначе услуга */
  "kind"?: "1" | "3";
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
  /** Обязательно для зачёта аванса, распределения оплаты и возврата по продаже (продажа-основание) */
  "obligation_id"?: string;
  /** Оплата-источник аванса либо обязательная оплата для распределения */
  "payment_id"?: string;
  "sources"?: Array<FinanceSettlementSourceAllocationInput>;
  /** Обязателен для зачёта аванса и переноса аванса между контрагентами (finance_advance_contact_transfer): переносимый аванс; контрагент документа — получатель, источник — тот, за кем числится остаток */
  "advance_id"?: string;
  /** Продажа или закупка: у аванса — его заказ, у переноса аванса между контрагентами — заказ получателя; пусто — без заказа */
  "order_id"?: string;
  /** Обязательна для продажи и закупки */
  "pnl_item_id"?: string;
  /** Путешествие или проект продажи и закупки */
  "project_id"?: string;
  /** Обязательна только для аванса */
  "side"?: "receivable_advance" | "payable_advance";
  /** Только возврат по продаже: складской возврат от покупателя по этой продаже; без amount сумма — доля продажи по количеству */
  "stock_return_id"?: string;
  "comment"?: string;
  /** Ключ идемпотентности сделки (только продажа и закупка): система-источник — учётная система клиента или ключ стороннего приложения */
  "source_system"?: string;
  /** Какая именно база/кабинет клиента внутри source_system; пусто — единственный источник */
  "source_ref"?: string;
  /** Идентификатор сделки в source_system; повтор того же (source_system, source_ref, external_id) возвращает уже созданный документ вместо второго */
  "external_id"?: string;
  /** Только закупка: «в т.ч. НДС» документа поставщика (ERP-484, подшаг 5.3). Обязательна, если на дату бизнес очищает суммы и юрлицо принимает налог к вычету; 0 — налог не выделен. Вне периода непустое значение — 400 */
  "vat_amount"?: string;
  "supplier_document"?: SupplierDocument;
  /** Только продажа (ERP-1265): строки товаров и услуг. Сумма продажи — сумма строк; переданная рядом amount обязана с ней совпасть. Налог считается по строке — по виду товара строки и режиму юрлица на дату */
  "lines"?: Array<FinanceSaleLineInput>;
  /** Только вместе со строками: цены строк включают налог (умолчание) либо налог начисляется сверху */
  "prices_include_vat"?: boolean;
}

export type FinanceSettlementDocumentType = "finance_settlement_baseline" | "finance_receivable_opening" | "finance_receivable" | "finance_payable_opening" | "finance_payable" | "finance_advance" | "finance_advance_offset" | "finance_sale" | "finance_purchase" | "finance_payment_allocation" | "finance_sale_return" | "finance_advance_contact_transfer";

export interface FinanceSettlementExposure {
  "available": boolean;
  "as_of": string;
  "contact_id": UUID;
  "company_id": UUID;
  "currency": string;
  /** Decimal string. What the counterparty owes us (side receivable); equals the receivable column of settlement positions for the same scope. */
  "receivable": string;
  /** Decimal string. Part of receivable whose due date has passed. */
  "overdue": string;
  /** Decimal string. Part of receivable without a due date; it is never overdue, so zero overdue does not mean everything is on time. */
  "undated": string;
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

export interface FinanceTaxCalcPage {
  "items": Array<FinanceTaxCalcRow>;
}

/** Месяц предварительного расчёта налога юрлица. */
export interface FinanceTaxCalcRow {
  /** Месяц */
  "month": number;
  /** Вид налога раздела */
  "kind": string;
  /** Режим юрлица */
  "regime": string;
  /** Ставка в процентах */
  "rate": string;
  /** Доходы с начала года */
  "base_income": string;
  /** Расходы с начала года; только у режимов с расходами */
  "base_expense"?: string;
  /** Неофициальная зарплата вне налоговой базы с начала года */
  "payroll_outside"?: string;
  /** Налог с начала года */
  "due_cumulative": string;
  /** Налог месяца */
  "amount": string;
  /** Начислено строкой «из расчёта» в проведённом документе месяца */
  "posted"?: string;
}

/** Вид налога кабинета. */
export interface FinanceTaxKind {
  /** Код вида из перечня закона */
  "code": "usn" | "ausn" | "profit" | "eshn" | "patent" | "ip_insurance" | "property" | "transport" | "land" | "trade_fee" | "penalties" | "ndfl" | "insurance" | "vat";
  /** Название вида в кабинете */
  "name": string;
  /** Налог-расход — начисление идёт в строку ОПиУ «Налоги» */
  "pnl_expense": boolean;
  /** Порядок показа */
  "sort": number;
}

export interface FinanceTaxKindAmount {
  /** Код вида налога */
  "kind": string;
  /** Сумма */
  "amount": string;
  /** Название вида налога в кабинете */
  "name"?: string;
}

export interface FinanceTaxKindPage {
  "items": Array<FinanceTaxKind>;
}

/** Документ «Налоги за месяц». */
export interface FinanceTaxMonth {
  "id": UUID;
  "number": string;
  /** Последний день месяца */
  "date": string;
  /** Статус документа */
  "status": string;
  /** Юрлицо */
  "company_id": string;
  "comment": string;
  "updated_at": string;
  "payload": FinanceTaxMonthPayload;
}

/** Новый черновик «Налоги за месяц». */
export interface FinanceTaxMonthInput {
  "company_id"?: UUID;
  "year"?: number;
  "month"?: number;
  "lines"?: Array<FinanceTaxMonthLine>;
  /** Сальдо ЕНС на начало учёта — только в первом документе юрлица; плюс — долг, минус — переплата */
  "opening"?: string | null;
  "comment"?: string | null;
}

/** Строка начисления. */
export interface FinanceTaxMonthLine {
  /** Код вида налога */
  "kind": string;
  /** Сумма со знаком; минус — уменьшение по декларации */
  "amount": string;
  /** Комментарий строки */
  "comment"?: string;
  /** Строку заполнил сервер — из начислений зарплаты, «НДС за квартал» или предварительного расчёта по режиму; во входе такие строки игнорируются */
  "source"?: "payroll" | "vat_quarter" | "calc";
  /** Режим юрлица строки «из расчёта» */
  "regime"?: string;
  /** Ставка режима в процентах */
  "rate"?: string;
  /** Доходы базы с начала года */
  "base_income"?: string;
  /** Расходы базы с начала года; только у режимов «доходы минус расходы» */
  "base_expense"?: string;
  /** Начислено «из расчёта» в прошлых месяцах года */
  "accrued_before"?: string;
  /** Неофициальная часть зарплаты — исключена из расходов базы */
  "payroll_outside"?: string;
  /** Сумма по декларации; строка с ней — строка декларации за прошлый период */
  "declared"?: string;
  /** Расчёт раздела за период декларации; заполняет сервер */
  "calculated"?: string;
  /** Начало периода декларации */
  "period_from"?: string;
  /** Конец периода декларации; не позже конца месяца документа */
  "period_to"?: string;
}

export interface FinanceTaxMonthPage {
  "items": Array<FinanceTaxMonth>;
}

export interface FinanceTaxMonthPayload {
  "version": number;
  "year": number;
  "month": number;
  "lines": Array<FinanceTaxMonthLine>;
  "payments"?: Array<FinanceTaxMonthPayment>;
  /** Сальдо ЕНС на начало учёта; плюс — долг перед бюджетом, минус — переплата */
  "opening"?: string;
}

/** Пополнение ЕНС за месяц, собранное сервером. */
export interface FinanceTaxMonthPayment {
  /** Документ банковской операции */
  "document": string;
  "date": string;
  /** Сумма платежа */
  "amount": string;
}

/** Пересохранение черновика «Налоги за месяц» — строки и комментарий. */
export interface FinanceTaxMonthUpdateInput {
  "lines"?: Array<FinanceTaxMonthLine>;
  /** Сальдо ЕНС на начало учёта — только в первом документе юрлица; плюс — долг, минус — переплата */
  "opening"?: string | null;
  "comment"?: string | null;
}

/** Платёж по статье налогов. */
export interface FinanceTaxPayment {
  "company": UUID;
  "transaction": UUID;
  "document": UUID;
  "date": string;
  /** Сумма платежа */
  "amount": string;
  /** Получатель */
  "counterparty_name": string;
  /** ИНН получателя */
  "counterparty_inn": string;
  /** Счёт получателя */
  "counterparty_account": string;
  /** Пополнение единого налогового счёта по правилу раздела */
  "ens": boolean;
}

export interface FinanceTaxPaymentPage {
  "items": Array<FinanceTaxPayment>;
}

/** Получатель единого налогового счёта. */
export interface FinanceTaxRecipient {
  /** ИНН получателя — 10 или 12 цифр */
  "inn": string;
  /** Счёт получателя; пусто — любой счёт этого ИНН */
  "account"?: string;
  /** Название получателя для экрана */
  "name"?: string;
}

export interface FinanceTaxRecipientFromPaymentInput {
  "transaction_id": UUID;
}

/** Настройка раздела «Налоги». */
export interface FinanceTaxSettings {
  /** Статьи ДДС платежей налогов в порядке выбора; пусто — не настроены */
  "payment_item_ids": Array<string>;
  /** Получатели единого налогового счёта */
  "ens_recipients": Array<FinanceTaxRecipient>;
}

/** Настройка раздела «Налоги» целиком. */
export interface FinanceTaxSettingsInput {
  /** Статьи ДДС вида «Налоги»; пустой список — снять все */
  "payment_item_ids"?: Array<string>;
  /** Получатели единого налогового счёта */
  "ens_recipients"?: Array<FinanceTaxRecipient>;
}

/** Сальдо ЕНС юрлица и обороты отрезка из регистра раздела. Плюс — долг перед бюджетом, минус — переплата. */
export interface FinanceTaxSummary {
  "company": UUID;
  "date_from": string;
  "date_to": string;
  /** Сальдо ЕНС на начало отрезка */
  "opening": string;
  /** Начислено по видам налогов */
  "accrued": Array<FinanceTaxKindAmount>;
  /** Начислено всего */
  "accrued_total": string;
  /** Пополнено ЕНС */
  "paid": string;
  /** Сальдо ЕНС на конец отрезка */
  "closing": string;
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
  /** «За кого»: контрагент из папки «Сотрудники» или «Собственники», чей расчёт гасит платёж. Пусто — как контрагент: платили самому человеку */
  "for_contact"?: string | null;
  "for_contact_name"?: string | null;
  /** Сотрудник, связанный с контрагентом. У зарплаты пустое «За кого» при нём означает самого получателя */
  "contact_employee"?: string | null;
  "order": string | null;
  "order_number": string | null;
  "project": string | null;
  "project_name": string | null;
  /** Инициатор: кто завёл или согласовал платёж. В проводки не идёт; чей расчёт гасится, задаёт for_contact */
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
  /** «За кого»: чей расчёт гасит платёж. У зарплаты — контрагент из папки «Сотрудники», у расчётов с собственником — контрагент из состава владельцев на дату платежа. Пусто — как контрагент. Не присланное поле остаётся как было. */
  "for_contact"?: string | null;
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

/** Какие операции вернулись в учёт и какие нет. */
export interface FinanceTransactionRestoreResult {
  /** Возвращённые операции. */
  "restored": Array<UUID>;
  /** Операции, которые вернуть не удалось, с причиной. */
  "failed": Array<FinanceTransactionRestoreResultFailedItem>;
}

export interface FinanceTransactionRestoreResultFailedItem {
  "id": UUID;
  /** Причина отказа для человека. */
  "reason": string;
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

export interface FinanceZReportInput {
  "company_id": UUID;
  "date": string;
  /** Номер смены ККТ; пусто — один отчёт на юрлицо и день */
  "shift_number"?: string;
  /** Статья выручки; пусто — статья продажи дня или умолчание */
  "pnl_item_id"?: { [key: string]: unknown };
  "lines": Array<FinanceZReportLine>;
  /** Наличные смены, decimal string */
  "cash"?: string;
  /** Касса для наличных; обязательна, если наличные больше нуля */
  "cash_wallet_id"?: { [key: string]: unknown };
  /** Статья движения денег для прихода наличных */
  "cash_item_id"?: { [key: string]: unknown };
  /** Оплаты картой и СБП для сверки, decimal string */
  "card"?: string;
}

export interface FinanceZReportLine {
  /** Услуга из каталога; без неё нужно название */
  "product_id"?: { [key: string]: unknown };
  /** Название услуги, если каталога нет */
  "title"?: string;
  /** Количество больше нуля, decimal string */
  "quantity": string;
  /** Сумма строки с НДС больше нуля, decimal string */
  "amount": string;
}

export interface FinanceZReportResult {
  /** Ключ отчёта: юрлицо, день и смена */
  "key": string;
  "replayed": boolean;
  "order_id": string;
  "order_number": string;
  "act_document_id": string;
  "cash_document_id"?: string;
  /** Сумма услуг */
  "revenue": string;
  /** Наличные и карта */
  "paid": string;
  /** Услуги минус оплаты: долг или аванс дня */
  "difference": string;
  "card": string;
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
  /** Бизнес проекта (заменил информационное юрлицо); null — проект всего кабинета */
  "business_id": UUID | null;
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
  /** Ключ принципала: id пользователя, UUID роли, UUID подразделения из справочника departments или * для всех */
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

export interface KnowledgeAnswerInput {
  "question": string;
  /** Сколько фрагментов-опор искать; по умолчанию 6 */
  "limit"?: number;
  /** Предыдущие ходы диалога; доступ они не расширяют */
  "history"?: Array<KnowledgeAnswerTurn>;
  /** Где искать: company — материалы компании, guides — встроенные руководства продукта, all — оба корпуса */
  "scope"?: "all" | "company" | "guides";
  /** Не сочинять ответ моделью, вернуть только найденные фрагменты и извлечённую сводку. Для того, кто говорит своим голосом и сам собирает ответ из цитат: без генерации ответ приходит за время поиска */
  "citations_only"?: boolean;
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
  /** Вердикт антивируса. В поисковый разбор идёт только clean; skipped — файл антивирус не проверял */
  "scan_status": "pending" | "clean" | "infected" | "skipped";
  "parser_name"?: string;
  "parser_version"?: string;
  "processing_error"?: string;
  "processed_at"?: string;
  "uploaded_by": number;
  "created_at": string;
  "updated_at": string;
}

/** Временный адрес файла страницы базы знаний. */
export interface KnowledgeAssetLink {
  /** Подписанный адрес хранилища при direct=true; иначе относительный адрес этого API с авторизацией */
  "url": string;
  /** true — подписанный адрес хранилища, без заголовка авторизации; false — адрес этого API, с авторизацией */
  "direct": boolean;
  /** Срок подписанного адреса; у адреса API его нет */
  "expires_at"?: string;
  "method": "GET";
  "name": string;
  "mime_type": string;
  "size_bytes": number;
  "sha256": string;
  /** skipped — файл антивирус не проверял */
  "scan_status": "clean" | "skipped";
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

/** Канонический блочный документ страницы; редактор читает только эту схему. */
export interface KnowledgeDocument {
  "schema": "akeda.knowledge.document";
  /** Актуальная версия схемы — 2 */
  "schema_version": number;
  "type": "doc";
  /** Блоки страницы */
  "content": Array<{ [key: string]: unknown }>;
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
  /** Бизнес пространства: его видят, ищут и цитируют в ответах помощника участники, чья область доступа касается бизнеса, и поимённо выданные. null — пространство всего кабинета */
  "business_id": UUID | null;
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
  /** Бизнес пространства. Поле не передано — не менять (у нового — единственный бизнес области доступа или весь кабинет); null — пространство всего кабинета. Бизнес вне области доступа — 403 knowledge.business_forbidden */
  "business_id"?: UUID | null;
}

export interface KnowledgeTag {
  "id": UUID;
  "name": string;
  "color": string;
  "created_by": number;
  "created_at": string;
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

/** Почтовый ящик кабинета. Пароль подключения не сериализуется никогда: наружу уходит только признак has_credentials. */
export interface MailAccount {
  "id": UUID;
  /** Сотрудник, которому принадлежит ящик */
  "owner_user_id": number;
  /** Общий ящик виден каждому сотруднику кабинета с правом mail:read (или участникам бизнеса business_id); личный — владельцу и поимённо названным в shared_with. Право видеть все записи чтения чужого ящика не даёт */
  "shared": boolean;
  /** Бизнес общего ящика: ящик видят участники, чья область доступа касается этого бизнеса, а также владелец и поимённо названные сотрудники. null — ящик всего кабинета или личный */
  "business_id": UUID | null;
  /** Сотрудники, которым ящик открыт поимённо, поверх правила access_scope. Всегда список: пустой — поимённо никому */
  "shared_with": Array<number>;
  /** Кому виден ящик кроме владельца: personal — никому; users — только сотрудникам из shared_with; cabinet — каждому сотруднику кабинета с mail:read; business — сотрудникам с mail:read, чья область касается business_id */
  "access_scope": "personal" | "users" | "cabinet" | "business";
  "email": string;
  "display_name": string;
  /** Уведомления владельца ящика о новой почте: все письма, только важные отправители или выключено */
  "notification_mode": "all" | "important" | "off";
  "imap_host": string;
  "imap_port": number;
  "imap_encryption": MailEncryption;
  "smtp_host": string;
  "smtp_port": number;
  "smtp_encryption": MailEncryption;
  /** Логин подключения; по умолчанию равен адресу */
  "username": string;
  /** Пароль приложения сохранён. Самого пароля не отдаёт ни одна операция */
  "has_credentials": boolean;
  "status": MailAccountStatus;
  "sync_status": MailSyncStatus;
  /** Глубина первичного импорта в днях; ноль означает весь ящик */
  "sync_since_days": number;
  /** Подпись, подставляемая в исходящие письма */
  "signature": string;
  "last_sync_at": string | null;
  /** Последняя ошибка подключения для человека */
  "last_error": string;
  /** Машинный код последней ошибки подключения, например mail.account.credentials_rejected; пусто, когда ошибки нет */
  "last_error_code": string;
  "unread_count": number;
  "created_at": string;
  "updated_at": string;
}

export type MailAccountStatus = "active" | "disabled" | "error";

/** Вложение письма. Ключ объектного хранилища наружу не отдаётся: знание ключа — половина пути к чужому файлу. */
export interface MailAttachment {
  "id": UUID;
  "message_id": UUID;
  "filename": string;
  "content_type": string;
  "size_bytes": number;
  /** Заполняется у картинок, вставленных в тело письма через cid: */
  "content_id"?: string;
  /** Встроенная в тело картинка, а не документ */
  "is_inline": boolean;
  "scan_status": MailScanStatus;
  "created_at": string;
}

/** Временный адрес вложения письма. */
export interface MailAttachmentLink {
  "url": string;
  /** true — подписанный адрес хранилища, без заголовка авторизации; false — адрес этого API, с авторизацией */
  "direct": boolean;
  /** Срок подписанного адреса; у адреса API его нет */
  "expires_at"?: string;
  "name": string;
  "mime_type": string;
  "size_bytes": number;
  "scan_status": MailScanStatus;
}

/** Отправка письма или сохранение черновика. Поле in_reply_to_id указывает на письмо в нашей базе, а не на Message-ID: заголовки ответа собираем мы. */
export interface MailComposeInput {
  "subject"?: string;
  /** Одна строка может содержать несколько адресов через запятую */
  "to"?: Array<string>;
  "cc"?: Array<string>;
  "bcc"?: Array<string>;
  "body_text"?: string;
  "body_html"?: string;
  /** Письмо, на которое отвечаем */
  "in_reply_to_id"?: UUID | null;
  /** Письмо, которое пересылаем */
  "forward_of_id"?: UUID | null;
  /** Идентификаторы заранее загруженных файлов */
  "upload_ids"?: Array<UUID>;
  /** Значение true СОХРАНЯЕТ письмо в «Черновиках» и не отправляет его; без признака письмо встаёт в очередь, а принятие SMTP-сервером не подтверждает доставку или прочтение получателем */
  "save_as_draft"?: boolean;
}

export interface MailDeliveryState {
  "status": "queued" | "sending" | "sent" | "failed" | "cancelled";
  "attempts": number;
  "error_code"?: string;
  "next_attempt_at"?: string;
}

export type MailEncryption = "tls" | "starttls";

/** Папка ящика. Координаты синхронизации IMAP (UIDVALIDITY, UIDNEXT, последний прочитанный UID) наружу не отдаются. */
export interface MailFolder {
  "id": UUID;
  "account_id": UUID;
  /** Идентификатор папки у провайдера; локальная папка «Исходящие» использует внутренний идентификатор и не синхронизируется по IMAP */
  "external_id": string;
  "name": string;
  "role": MailFolderRole;
  "parent_id": UUID | null;
  /** Разделитель иерархии, который назвал сервер */
  "delimiter": string;
  "total_count": number;
  "unread_count": number;
  /** Вес папки в привычном порядке системных папок */
  "sort_order": number;
  "subscribed": boolean;
  /** Вид на ту же почту (Gmail «Вся почта», «Важное», «Помеченные»): письма в нём — копии писем из настоящих папок, в сводные выборки они не попадают */
  "mirror": boolean;
  "created_at": string;
  "updated_at": string;
}

/** Создание и переименование пользовательской папки */
export interface MailFolderInput {
  /** Косые черты запрещены: разделитель иерархии задаёт сервер */
  "name": string;
  /** Родительская папка */
  "parent_id"?: UUID | null;
}

export type MailFolderRole = "inbox" | "outbox" | "sent" | "drafts" | "trash" | "spam" | "archive" | "custom";

/** Письмо в копии кабинета. Внутренние координаты IMAP (UID и UIDVALIDITY) наружу не отдаются. Тело в HTML хранится таким, каким его прислал отправитель: обезвреживание живёт на отдаче, а не в хранимой копии. */
export interface MailMessage {
  "id": UUID;
  "account_id": UUID;
  "folder_id": UUID;
  "thread_id": UUID;
  /** Message-ID без угловых скобок; письму без него присваивается наш */
  "message_ref": string;
  /** Заголовок In-Reply-To */
  "in_reply_to"?: string;
  /** Заголовок References целиком */
  "references"?: string;
  "subject": string;
  "from_address": string;
  "from_name": string;
  /** Конверт письма целиком */
  "addresses"?: Array<MailMessageAddress>;
  /** Короткий пересказ письма для списка */
  "snippet": string;
  "body_text"?: string;
  "body_html"?: string;
  "size_bytes": number;
  "direction": "inbound" | "outbound";
  "is_read": boolean;
  "is_flagged": boolean;
  "is_answered": boolean;
  "is_draft": boolean;
  "has_attachments": boolean;
  "spam_verdict": MailSpamVerdict;
  /** Кто вынес вердикт. Решение человека сильнее флага сервера и правил */
  "spam_source"?: "provider" | "rule" | "user" | "agent";
  "spam_reason"?: string;
  "delivery"?: MailDeliveryState;
  "sent_at": string | null;
  "received_at": string;
  "created_at": string;
  "updated_at": string;
  "attachments"?: Array<MailAttachment>;
}

/** Один адрес в конверте письма */
export interface MailMessageAddress {
  /** Вид адреса: from, to, cc, bcc, reply_to. Значение list_id несёт идентификатор рассылки, а не адрес человека */
  "kind": string;
  "address": string;
  /** Имя отправителя или получателя, если оно было в конверте */
  "name": string;
  /** Порядок адреса в своей группе */
  "position": number;
}

/** Страница писем. Общее число нужно, чтобы решить, стоит ли листать дальше. */
export interface MailMessagePage {
  "items": Array<MailMessage>;
  "total": number;
  "limit": number;
  "offset": number;
  "has_more": boolean;
}

/** Исходящее письмо в очереди отправки. Постоянный отказ SMTP (код 5xx) не повторяется: повторять отклонённое навсегда письмо вредно для репутации отправителя. */
export interface MailOutbound {
  "id": UUID;
  "account_id": UUID;
  "message_id": UUID;
  "status": "queued" | "sending" | "sent" | "failed" | "cancelled";
  "attempts": number;
  "max_attempts": number;
  "next_attempt_at": string | null;
  "last_error": string;
  "last_error_code": string;
  "sent_at": string | null;
  /** Сотрудник, отправивший письмо */
  "created_by": number;
  "created_at": string;
}

/** Страница очереди отправки */
export interface MailOutboundPage {
  "items": Array<MailOutbound>;
  "total": number;
  "limit": number;
  "offset": number;
  "has_more": boolean;
}

/** Файл, загруженный до отправки письма. Ключ объектного хранилища наружу не отдаётся. */
export interface MailOutboundUpload {
  "id": UUID;
  "account_id": UUID;
  "filename": string;
  "content_type": string;
  "size_bytes": number;
  "scan_status": MailScanStatus;
  "status": "ready" | "consumed" | "expired";
  "expires_at": string;
  "created_at": string;
}

export interface MailPerson {
  "user_id": number;
  "name": string;
}

/** Подсказка настроек для формы подключения ящика */
export interface MailProvider {
  /** Машинный ключ провайдера */
  "key": string;
  /** Название провайдера для человека */
  "label": string;
  /** Домены адресов, по которым подсказка подбирается */
  "domains": Array<string>;
  "imap_host": string;
  "imap_port": number;
  "imap_encryption": MailEncryption;
  "smtp_host": string;
  "smtp_port": number;
  "smtp_encryption": MailEncryption;
  /** Какой именно пароль нужен: у перечисленных провайдеров обычный пароль от аккаунта не подходит */
  "password_hint": string;
  /** Ссылка на справку провайдера; у части провайдеров пуста */
  "help_url": string;
}

/** Правило разбора входящей почты */
export interface MailRule {
  "id": UUID;
  "account_id": UUID;
  "name": string;
  "enabled": boolean;
  /** Порядок применения правил ящика */
  "sort_order": number;
  /** Правило применяется при всех условиях или при любом из них */
  "match": "all" | "any";
  "conditions": Array<MailRuleCondition>;
  "actions": Array<MailRuleAction>;
  /** Прекратить разбор письма после этого правила */
  "stop_processing": boolean;
  /** Сколько писем правило разобрало: единственный способ увидеть, что правило молчит из-за опечатки */
  "applied_count": number;
  "last_applied_at": string | null;
  "created_at": string;
  "updated_at": string;
}

/** Одно действие правила */
export interface MailRuleAction {
  "type": "move_to_folder" | "mark_read" | "mark_unread" | "flag" | "mark_spam" | "mark_not_spam";
  /** Заполняется только для переноса в папку; остальные действия папку не принимают */
  "folder_id"?: UUID | null;
}

/** Одно условие правила. Набор полей и операторов закрытый: правило исполняется на сервере над чужой почтой. */
export interface MailRuleCondition {
  "field": "from" | "to" | "cc" | "subject" | "body" | "list_id" | "has_attachment" | "spam_verdict";
  /** Сравнение по домену доступно только адресным полям; поле has_attachment проверяется как is_true или is_false. */
  "op": "contains" | "equals" | "starts_with" | "ends_with" | "domain_is" | "is_true" | "is_false";
  /** Обязательно для всех полей, кроме has_attachment */
  "value"?: string;
}

/** Создание и изменение правила; условия и действия передаются целиком */
export interface MailRuleInput {
  "name": string;
  "enabled"?: boolean | null;
  "sort_order"?: number | null;
  /** Без значения — all */
  "match"?: "all" | "any";
  "conditions": Array<MailRuleCondition>;
  "actions": Array<MailRuleAction>;
  "stop_processing"?: boolean | null;
}

/** Что правило сделало с письмом */
export interface MailRuleOutcome {
  "rule_id": UUID;
  "rule_name": string;
  "message_id": UUID;
  "subject": string;
  "moved_to_folder"?: UUID | null;
  "marked_read"?: boolean | null;
  "flagged"?: boolean;
  "spam_verdict"?: string;
}

export type MailScanStatus = "pending" | "clean" | "infected" | "skipped";

export type MailSpamVerdict = "unknown" | "spam" | "ham";

/** Итог одного прохода по ящику: «ничего не изменилось» — тоже ответ */
export interface MailSyncReport {
  "account_id": UUID;
  /** Сколько папок прочитано */
  "folders": number;
  "new_messages": number;
  /** Сколько писем разобрали правила */
  "rules_applied": number;
  "finished_at": string;
  /** Папки, перечитанные целиком после смены UIDVALIDITY на сервере */
  "full_reloaded"?: Array<string>;
  /** Папки, которые в этот проход прочитать не удалось; остальные разобраны */
  "failed_folders"?: Array<string>;
  /** Письма, у которых проход перенёс с сервера прочтение, отметку или удаление из другого клиента */
  "updated"?: number;
  /** Только у проверки по требованию: done — проверено, running — ящик проверяется фоном и письма появятся сами */
  "state"?: "done" | "running";
  /** Проверка по требованию успела не все свои папки; остальное доделает фон */
  "partial"?: boolean;
}

export type MailSyncStatus = "never" | "ok" | "running" | "failed";

/** Переписка: письма, связанные ответами. Склейка идёт по корню цепочки References, а не по теме. */
export interface MailThread {
  "id": UUID;
  "account_id": UUID;
  "subject": string;
  /** Корневой Message-ID ветки */
  "root_ref": string;
  "message_count": number;
  "unread_count": number;
  "has_attachments": boolean;
  "participants": Array<MailMessageAddress>;
  "last_message_at": string;
  "messages"?: Array<MailMessage>;
}

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

/** Выкуп когорты заказов периода — тот же расчёт, что у воронки: доля выкупленных среди заказов, у которых успело решиться, выкуплены ли они (не позже сегодня−8), окно не короче 14 дней — короткий период добирает решённые дни раньше; у Ozon — FBO и FBS вместе */
export interface MarketplaceBuyoutCohort {
  /** Первый день заказов когорты */
  "from": string;
  /** Последний день заказов когорты включительно */
  "to": string;
  /** Выкуплено, шт */
  "bought": number;
  /** Заказано без отмен, шт */
  "base": number;
  /** Выкуп, %; нет решённых заказов — null */
  "pct": number | null;
}

/** Последняя дата операций площадки, уже включённых в каждый компонент отчёта; отсутствующее или null-значение означает, что дата покрытия пока неизвестна. */
export interface MarketplaceComponentDataThrough {
  /** Финансовые операции площадки */
  "finance"?: string | null;
  /** Реклама Wildberries */
  "ads"?: string | null;
  /** Клики рекламы Ozon */
  "ads_clicks"?: string | null;
  /** Заказы из рекламы Ozon */
  "ads_orders"?: string | null;
  /** Карточки товаров по дате последней синхронизации */
  "products"?: string | null;
}

/** Время последней успешной загрузки каждого компонента отчёта; отсутствующее или null-значение означает, что компонент ещё не загружался успешно. */
export interface MarketplaceComponentFreshness {
  /** Финансовые операции площадки */
  "finance"?: string | null;
  /** Реклама Wildberries */
  "ads"?: string | null;
  /** Клики рекламы Ozon */
  "ads_clicks"?: string | null;
  /** Заказы из рекламы Ozon */
  "ads_orders"?: string | null;
  /** Карточки товаров */
  "products"?: string | null;
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
  "freshness"?: MarketplaceComponentFreshness;
  "data_through"?: MarketplaceComponentDataThrough;
  /** Хотя бы один обязательный компонент не загружался успешно, последняя загрузка завершилась ошибкой или давно не запускалась */
  "incomplete"?: boolean;
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
  /** Себестоимость артикула не заведена: прибыль завышена (ERP-1169) */
  "cost_missing"?: boolean;
  /** Площадка прислала выручку, но не количество проданных штук: себестоимость посчитана нулём (ERP-1217) */
  "units_missing"?: boolean;
}

export interface MarketplaceOzonDecompositionCell {
  "revenue": number;
  "units": number;
  /** Средний чек: выручка на проданную штуку; null без продаж */
  "avg_check": number | null;
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
  /** Прибыль к себестоимости по модулю, %; null без себестоимости */
  "roi": number | null;
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

export interface MarketplaceOzonDecompositionPeriod {
  /** month для накопительной колонки, иначе s и номер спринта */
  "id": string;
  "kind": "month" | "sprint" | "range";
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
  /** Последний день периода; без параметров — самый свежий день в аналитике, а не сегодняшний */
  "day": string;
  /** Первый день периода */
  "from": string;
  /** Последний день периода включительно */
  "to": string;
  /** Первый день графика: не позже from и не меньше 14 дней до to */
  "chart_from": string;
  "updated": string | null;
  "scheme": "all" | "fbo" | "fbs";
  /** Ключи orders и sales */
  "kpi": { [key: string]: MarketplaceOzonOrdersKpi };
  /** Дни подряд от chart_from по to: не меньше 14 */
  "daily": Array<MarketplaceOzonOrdersDailyRow>;
  "products": Array<MarketplaceOzonOrdersProductRow>;
  /** Недели и месяцы всего магазина (?summary=1): окно → заказано штук */
  "summary_total"?: { [key: string]: number };
  "buyout"?: MarketplaceBuyoutCohort;
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
  /** Заказано штук по дням периода: день ГГГГ-ММ-ДД → шт */
  "by_day"?: { [key: string]: number };
  /** Недели и месяцы (?summary=1): окно (w3, w2, w1, prev_month, month) → заказано штук */
  "summary"?: { [key: string]: number };
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
  /** Сколько штук продано в периоде без действующей ставки себестоимости: они посчитаны с нулевой закупкой, маржа периода завышена. Ключ — начало периода */
  "cost_missing"?: { [key: string]: number };
  /** Выручка периода, по которой площадка не прислала количество проданных штук (ERP-1217): себестоимость посчитана нулём, маржа завышена. Ключ — начало периода. Заполняется только для Ozon */
  "units_missing"?: { [key: string]: number };
  "freshness"?: MarketplaceComponentFreshness;
  "data_through"?: MarketplaceComponentDataThrough;
  /** Хотя бы один обязательный компонент не загружался успешно, последняя загрузка завершилась ошибкой или давно не запускалась */
  "incomplete"?: boolean;
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
  /** Номенклатура кабинета, к которой привязан артикул канала (core_product_identifier вида channel_article); null — не привязан */
  "linked_product_id": UUID | null;
  /** SKU привязанной номенклатуры; пусто без связи */
  "linked_product_sku": string;
  /** Название привязанной номенклатуры; пусто без связи */
  "linked_product_name": string;
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

export interface MarketplaceOzonStockProduct {
  "store": UUID;
  "store_name": string;
  "offer_id": string;
  "name": string;
  "image": string;
  "total": number;
  "warehouses": Array<MarketplaceOzonStockWarehouse>;
  /** Товар в пути к покупателю, шт */
  "to_client"?: number;
  /** Выкуп, % — когорта созревших заказов, как у воронки; нет — поля нет */
  "buyout_pct"?: number;
  /** Остаток с возвратом невыкупленного из того, что в пути: остаток + в пути × (1 − выкуп) */
  "effective"?: number;
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
  /** Строк «товар × склад» больше предела 8000: хвост артикулов не пришёл, отсутствие товара не значит «остатка нет» */
  "truncated"?: boolean;
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

/** Магазин маркетплейса в кабинете. Форма одна для Ozon, Wildberries и Яндекс Маркета — их различает только поле platform. Ключи, токены и proxy в ответ не попадают; вместо них возвращаются безопасные признаки настройки. */
export interface MarketplaceStore {
  "id": UUID;
  /** Платформа задаётся маршрутом, а не телом запроса */
  "platform": "ozon" | "wildberries" | "yandex";
  "name": string;
  /** Внутренний идентификатор MPTrack; назначается после передачи настройки и не вводится пользователем */
  "external_id"?: number;
  /** Ставка налога в процентах; decimal строкой */
  "tax_percent": string;
  "is_active": boolean;
  /** Для подключения включена загрузка схемы FBS */
  "has_fbs": boolean;
  /** Для подключения Wildberries включена аналитика «Джем» */
  "has_jam": boolean;
  /** Есть хотя бы один сохранённый API-реквизит */
  "credentials_configured": boolean;
  "ozon_client_id_set": boolean;
  "ozon_api_key_set": boolean;
  "ozon_pf_client_id_set": boolean;
  "ozon_pf_client_secret_set": boolean;
  "wb_token_set": boolean;
  "ym_business_id_set": boolean;
  "ym_api_key_set": boolean;
  "proxy_set": boolean;
  /** Состояние передачи настройки в MPTrack */
  "config_sync_status": "not_configured" | "synced" | "error";
  "config_synced_at"?: string;
  /** Безопасная классификация токена Wildberries без раскрытия токена: basic — ограниченный базовый, personal — персональный, test — тестовый, service — сервисный, unknown — тип не определён */
  "token_class"?: "basic" | "personal" | "test" | "service" | "unknown";
  /** Несекретные сведения о ключе площадки: тип, категории доступа, только чтение и срок действия; сейчас — для токена Wildberries, разобранного из самого токена */
  "credential"?: MarketplaceStoreCredential;
  /** Безопасное состояние подключения в ERP: not_checked — проверка ещё не запускалась, pending — MPTrack проверяет реквизиты или запускает первую загрузку, disabled — загрузки отключены, ok — подключение работает, warning — требуется внимание, error — подключение не работает. Сырые статусы и тексты MPTrack не публикуются */
  "connection_status": "not_checked" | "pending" | "disabled" | "ok" | "warning" | "error";
  /** Безопасный стабильный код состояния подключения; сырой текст ошибки не публикуется */
  "connection_error_code"?: string;
  /** Момент последней успешной загрузки этого подключения */
  "last_etl_at"?: string;
  /** Разделитель базы и размера в артикуле продавца, объявленный владельцем магазина. Пустая строка — правило не объявлено, и размер берётся только из полей площадки. Применяется на Ozon, где каждый размер продаётся своим артикулом */
  "article_size_separator"?: "" | "-" | "/" | "_";
  /** Бизнес магазина — бизнес юрлица из учётных настроек; по нему магазин и его отчёты сужаются областью доступа участника. null — юрлицо ещё не выбрано в кабинете с несколькими бизнесами: такой магазин видит только доступ ко всем бизнесам */
  "business_id"?: UUID | null;
}

/** Несекретные сведения о ключе площадки: тип, категории доступа, только чтение и срок действия; сейчас — для токена Wildberries, разобранного из самого токена */
export interface MarketplaceStoreCredential {
  /** Тип ключа по полю acc токена */
  "kind": "basic" | "personal" | "test" | "service" | "unknown";
  /** Категории методов, к которым у ключа есть доступ */
  "scopes": Array<"content" | "analytics" | "prices" | "marketplace" | "statistics" | "promotion" | "feedbacks" | "chat" | "supplies" | "returns" | "documents" | "finance" | "users">;
  /** Ключ только на чтение */
  "read_only": boolean;
  /** Когда ключ перестанет работать */
  "expires_at"?: string;
}

/** Тело создания управляемого подключения. Платформу задаёт маршрут, а external_id назначает MPTrack. Для Ozon нужны ozon_client_id и ozon_api_key, для Wildberries — wb_token, для Яндекс Маркета — ym_business_id и ym_api_key. */
export interface MarketplaceStoreInput {
  "name": string;
  /** Ставка налога в процентах; пустая строка сохраняется как ноль */
  "tax_percent"?: string;
  "is_active"?: boolean;
  "has_fbs"?: boolean;
  /** Используется для Wildberries */
  "has_jam"?: boolean;
  /** Правило именования артикула Ozon: «БАЗА<разделитель>РАЗМЕР». Список закрыт; пустая строка означает «правила нет». Официальные поля размера площадки всегда старше этого правила */
  "article_size_separator"?: "" | "-" | "/" | "_";
  "ozon_client_id"?: string;
  "ozon_api_key"?: string;
  "ozon_pf_client_id"?: string;
  "ozon_pf_client_secret"?: string;
  /** Рекомендуется персональный токен класса personal; значение не возвращается */
  "wb_token"?: string;
  /** Business ID вводится строкой; ERP проверяет числовой идентификатор и преобразует его для MPTrack */
  "ym_business_id"?: string;
  "ym_api_key"?: string;
  /** Необязательный адрес proxy; значение не возвращается */
  "proxy"?: string;
  /** Бизнес магазина. В кабинете с одним бизнесом подставляется сам; при нескольких обязателен — без него ответ 400 marketplace.store_business_required. Бизнес должен входить в область права участника целиком, иначе 403 marketplace.store_business_forbidden; юрлицо учёта магазина потом выбирается только этого бизнеса */
  "business_id"?: UUID;
}

export interface MarketplaceStorePage {
  "count": number;
  "results": Array<MarketplaceStore>;
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
  /** Из «Джема», а без него из продаж или закупок */
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
  "freshness"?: MarketplaceComponentFreshness;
  "data_through"?: MarketplaceComponentDataThrough;
  /** Хотя бы один обязательный компонент не загружался успешно, последняя загрузка завершилась ошибкой или давно не запускалась */
  "incomplete"?: boolean;
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
  /** Себестоимость артикула не заведена: прибыль завышена (ERP-1169) */
  "cost_missing"?: boolean;
  /** Площадка прислала выручку, но не количество проданных штук: себестоимость посчитана нулём (ERP-1217) */
  "units_missing"?: boolean;
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
  "kind": "month" | "sprint" | "range";
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

/** Ячейка декомпозиции. Расходы приходят отрицательными числами. */
export interface MarketplaceWbMetricCell {
  /** Идентификатор блока; присутствует только в итогах периода */
  "id"?: string;
  "revenue": number;
  "units": number;
  /** Средний чек: выручка на проданную штуку; null без продаж */
  "avg_check": number | null;
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
  /** Штрафы, удержания, компенсации и доплаты одной суммой */
  "penalties_other": number;
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
  /** Прибыль к себестоимости по модулю, %; null без себестоимости */
  "roi": number | null;
  /** Доставки покупателю в штуках по строкам логистики отчёта; null — штук доставки за период нет в своде */
  "deliveries": number | null;
  /** Обратные доставки в штуках по строкам логистики отчёта; null — штук доставки за период нет в своде */
  "back_deliveries": number | null;
  /** Выкуп: доставки минус обратные доставки к доставкам, %; null без доставок */
  "buyout_pct": number | null;
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
  /** Последний день периода */
  "day": string;
  /** Первый день периода */
  "from": string;
  /** Последний день периода включительно */
  "to": string;
  /** Первый день графика: не позже from и не меньше 14 дней до to */
  "chart_from": string;
  "updated": string | null;
  "kpi": MarketplaceWbOrdersOverviewKpi;
  /** Дни подряд от chart_from по to: не меньше 14 */
  "daily": Array<MarketplaceWbOrdersDay>;
  /** Не более 200 товаров периода */
  "products": Array<MarketplaceWbOrdersProduct>;
  /** Недели и месяцы всего магазина (?summary=1): окно → заказано штук */
  "summary_total"?: { [key: string]: number };
  /** Аналитическая база не подключена и цифры синтетические */
  "demo"?: boolean;
  "buyout"?: MarketplaceBuyoutCohort;
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
  /** Заказано штук по дням периода: день ГГГГ-ММ-ДД → шт */
  "by_day"?: { [key: string]: number };
  /** Недели и месяцы (?summary=1): окно (w3, w2, w1, prev_month, month) → заказано штук */
  "summary"?: { [key: string]: number };
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
  /** Сколько штук продано в периоде без действующей ставки себестоимости: они посчитаны с нулевой закупкой, маржа периода завышена. Ключ — начало периода */
  "cost_missing"?: { [key: string]: number };
  /** Выручка периода, по которой площадка не прислала количество проданных штук (ERP-1217): себестоимость посчитана нулём, маржа завышена. Ключ — начало периода. Заполняется только для Ozon */
  "units_missing"?: { [key: string]: number };
  "freshness"?: MarketplaceComponentFreshness;
  "data_through"?: MarketplaceComponentDataThrough;
  /** Хотя бы один обязательный компонент не загружался успешно, последняя загрузка завершилась ошибкой или давно не запускалась */
  "incomplete"?: boolean;
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
  /** Последняя цена покупателя из продаж или закупок или продаж */
  "buyer_price": string;
  "stock": number;
  "in_way_to_client": number;
  "in_way_from_client": number;
  /** Себестоимость из кабинета */
  "cost": string | null;
  /** Номенклатура кабинета, к которой привязан артикул канала (core_product_identifier вида channel_article); null — не привязан */
  "linked_product_id": UUID | null;
  /** SKU привязанной номенклатуры; пусто без связи */
  "linked_product_sku": string;
  /** Название привязанной номенклатуры; пусто без связи */
  "linked_product_name": string;
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

export interface MarketplaceWbStockPage {
  /** Число товаров, а не строк «товар × склад» */
  "count": number;
  /** Склады в порядке первого появления */
  "warehouses": Array<string>;
  "results": Array<MarketplaceWbStockProduct>;
  /** Строк «товар × склад» больше предела 8000: хвост артикулов не пришёл, отсутствие товара не значит «остатка нет» */
  "truncated"?: boolean;
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
  /** Товар в пути к покупателю, шт */
  "to_client"?: number;
  /** Выкуп, % — когорта созревших заказов, как у воронки; нет — поля нет */
  "buyout_pct"?: number;
  /** Остаток с возвратом невыкупленного из того, что в пути: остаток + в пути × (1 − выкуп) */
  "effective"?: number;
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
  /** Сумма продаж или закупок кроме отменённых; decimal строкой */
  "orders_sum": string;
  "orders_qty": number;
  /** Сумма доставленных продаж или закупок; decimal строкой */
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
  /** Последний день периода; без параметров — последний день с продажами или закупками */
  "day": string;
  /** Первый день периода */
  "from": string;
  /** Последний день периода включительно */
  "to": string;
  /** Первый день графика: не позже from и не меньше 14 дней до to */
  "chart_from": string;
  /** Момент последней синхронизации источника */
  "updated": string | null;
  "kpi": MarketplaceYandexOrdersOverviewKpi;
  /** Дни подряд от chart_from по to по возрастанию даты; дни без заказов заполнены нулями */
  "daily": Array<MarketplaceYandexOrdersDay>;
  /** Товары периода по убыванию суммы */
  "products": Array<MarketplaceYandexOrdersProduct>;
  /** Недели и месяцы всего магазина (?summary=1): окно → заказано штук */
  "summary_total"?: { [key: string]: number };
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
  /** Заказано штук по дням периода: день ГГГГ-ММ-ДД → шт */
  "by_day"?: { [key: string]: number };
  /** Недели и месяцы (?summary=1): окно (w3, w2, w1, prev_month, month) → заказано штук */
  "summary"?: { [key: string]: number };
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
  /** Сколько штук продано в периоде без действующей ставки себестоимости: они посчитаны с нулевой закупкой, маржа периода завышена. Ключ — начало периода */
  "cost_missing"?: { [key: string]: number };
  /** Выручка периода, по которой площадка не прислала количество проданных штук (ERP-1217): себестоимость посчитана нулём, маржа завышена. Ключ — начало периода. Заполняется только для Ozon */
  "units_missing"?: { [key: string]: number };
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
  /** Номенклатура кабинета, к которой привязан артикул канала (core_product_identifier вида channel_article); null — не привязан */
  "linked_product_id": UUID | null;
  /** SKU привязанной номенклатуры; пусто без связи */
  "linked_product_sku": string;
  /** Название привязанной номенклатуры; пусто без связи */
  "linked_product_name": string;
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

export interface MarkingAcceptExpectedResult {
  /** Кодов назначено строкам этим действием */
  "added": number;
  /** Ожидаемых кодов не назначено: в строке меньше штук, чем по УПД, или строка без поштучных кодов */
  "skipped": number;
  "document": MarkingDocumentCodes;
}

export interface MarkingApplication {
  "id": UUID;
  "company_id": UUID;
  "order_id": string | null;
  "product_group": string;
  /** Отчёт в СУЗ с подписью или отметка у групп, где отчёт СУЗ формирует сама */
  "mode": "report" | "auto";
  /** Черновик, отправлен, принят (коды нанесены), отклонён (коды освобождены) */
  "status": "draft" | "sent" | "accepted" | "rejected";
  /** reportId СУЗ */
  "oms_report_id": string;
  /** reportStatus СУЗ последней проверки как есть */
  "oms_status": string;
  /** Отказ словами СУЗ или причина неотправки */
  "error_text": string;
  /** Атрибуты отчёта группы как в теле */
  "attributes": { [key: string]: unknown };
  "codes_count": number;
  "ranges": Array<MarkingSeqRange>;
  "created_by": number | null;
  "created_at": string;
  "send_attempted_at": string | null;
  "sent_at": string | null;
  "checked_at": string | null;
}

export interface MarkingApplicationEnvelope {
  "application": MarkingApplication;
}

export interface MarkingBalanceList {
  "balances": Array<MarkingBalanceListBalancesItem> | null;
}

export interface MarkingBalanceListBalancesItem {
  "product_group_id": number;
  "product_group": string;
  /** Рубли строкой с двумя знаками; null — счёта по группе нет */
  "balance": string | null;
  "contract_id": string;
}

export interface MarkingBox {
  "id": UUID;
  "company_id": UUID;
  "company_name": string;
  /** Код короба в реестре (вид BOX) */
  "code_id": UUID;
  /** 18 цифр SSCC без AI */
  "sscc": string;
  /** КИТУ «00» + SSCC */
  "identity": string;
  /** Товарная группа; у чужого короба без товара в кабинете — пусто */
  "group": string;
  /** own — собран здесь, gismt — снимок чужого из ГИС МТ */
  "origin": "own" | "gismt";
  "status": "assembling" | "closed" | "signing" | "sent" | "accepted" | "rejected" | "disbanding" | "disbanded" | "received";
  /** Вложений первого уровня */
  "units": number;
  /** Этикеток короба напечатано, без тестовых */
  "printed": number;
  /** SSCC паллеты, где лежит короб; пусто — нигде */
  "parent_sscc": string;
  /** Наш документ «Формирование упаковки» */
  "aggregation_document_id": UUID | null;
  /** Наш документ «Расформирование упаковки» */
  "disaggregation_document_id": UUID | null;
  /** Отказ ГИС МТ по отчёту агрегации */
  "error_text": string;
  "created_at": string;
  "closed_at": string | null;
  "disbanded_at": string | null;
}

export interface MarkingBoxCard {
  "box": MarkingBox;
  "items": Array<MarkingBoxItem> | null;
  "products": Array<MarkingBoxProduct> | null;
  /** Вложений с полным кодом */
  "printable": number;
}

export interface MarkingBoxContent {
  "box": MarkingBox;
  /** Откуда состав */
  "source": "own" | "gismt";
  "codes": Array<MarkingBoxContentCode> | null;
}

export interface MarkingBoxContentCode {
  "code_id": UUID;
  /** Код без криптохвоста */
  "identity": string;
  "gtin": string;
  "product_id": UUID | null;
  "product_name": string;
  /** Есть полный код для перепечатки */
  "printable": boolean;
}

export interface MarkingBoxCreateInput {
  "company_id": UUID;
  /** Товарная группа; пусто — единственная включённая у юрлица */
  "group"?: string;
}

export interface MarkingBoxDocumentScanResult {
  "box": MarkingBox;
  "source": "own" | "gismt";
  /** Кодов единиц в коробе */
  "units": number;
  /** Легло сейчас */
  "added": number;
  /** Уже были в документе */
  "already": number;
  /** Не легли всего */
  "skipped": number;
  "skipped_codes": Array<MarkingBoxExpandSkip> | null;
  "shortage": Array<MarkingBoxShortage> | null;
  "document": MarkingDocumentCodes;
}

export interface MarkingBoxDraftResult {
  "box": MarkingBox;
  /** Черновик на подпись; null — отчёт не нужен */
  "draft": MarkingDocumentDraft | null;
}

export interface MarkingBoxExpandSkip {
  "identity": string;
  /** Машинная причина, как у скана по одному */
  "reason": string;
}

export interface MarkingBoxInventoryScanResult {
  "box": MarkingBox;
  "source": "own" | "gismt";
  "units": number;
  "added": number;
  "already": number;
  "skipped": number;
  "skipped_codes": Array<MarkingBoxExpandSkip> | null;
  "shortage": Array<MarkingBoxShortage> | null;
  "inventory": MarkingInventoryCodes;
}

export interface MarkingBoxItem {
  "code_id": UUID;
  /** Код без криптохвоста */
  "identity": string;
  /** UNIT, GROUP, SET, BUNDLE или BOX */
  "kind": string;
  "gtin": string;
  "product_id": UUID | null;
  "product_name": string;
  /** Есть полный код: этикетку можно перепечатать */
  "printable": boolean;
  /** Вложение — короб: его карточка */
  "box_id": UUID | null;
  "added_at": string;
}

export interface MarkingBoxList {
  "items": Array<MarkingBox> | null;
  "total": number;
}

export interface MarkingBoxProduct {
  "gtin": string;
  "product_id": UUID | null;
  "product_name": string;
  /** Строка — вложенные короба, а не товар */
  "boxes": boolean;
  "count": number;
}

export interface MarkingBoxResolveInput {
  /** Юрлицо, от имени которого читается ГИС МТ и заводятся коды */
  "company_id": UUID;
  /** Скан SSCC */
  "raw": string;
}

export interface MarkingBoxScanInput {
  /** Скан марки или SSCC */
  "raw": string;
}

export interface MarkingBoxScanResult {
  "item": MarkingBoxItem;
  "card": MarkingBoxCard;
}

export interface MarkingBoxShortage {
  "product_id": UUID;
  /** Кодам не хватило строки или штук */
  "count": number;
}

export interface MarkingCertificate {
  "thumbprint"?: string;
  "owner"?: string;
  "inn"?: string;
  "valid_to"?: string;
}

export type MarkingCheckStatus = "" | "ok" | "unauthorized" | "rate_limited" | "declined" | "unavailable";

export interface MarkingCisInfo {
  "requested_cis": string;
  "cis"?: string;
  "gtin"?: string;
  "product_name"?: string;
  "brand"?: string;
  "product_group_id"?: number;
  "product_group"?: string;
  "status"?: string;
  "status_ex"?: string;
  "owner_inn"?: string;
  "owner_name"?: string;
  "producer_inn"?: string;
  "package_type"?: string;
  "general_package_type"?: string;
  "parent"?: string;
  "child"?: Array<string>;
  "emission_date"?: string;
  "produced_date"?: string;
  /** Отказ ГИС МТ по этому коду */
  "error_message"?: string;
}

export interface MarkingCisInfoList {
  "results": Array<MarkingCisInfo>;
}

export interface MarkingCisesInfoInput {
  "company_id": UUID;
  "codes": Array<string>;
  /** Ключ товарной группы; необязателен */
  "product_group"?: string;
}

/** Строка реестра кодов. Полного кода с криптохвостом в ней нет никогда. */
export interface MarkingCode {
  "id": UUID;
  "company_id": UUID;
  "company_name": string;
  "product_id"?: UUID;
  "product_name": string;
  /** Ключ товарной группы */
  "group": string;
  /** Вид кода (единица или агрегат) */
  "kind": string;
  "gtin": string;
  "serial": string;
  /** Код идентификации без криптохвоста */
  "identity": string;
  /** Сохранён ли полный код для печати */
  "has_crypto_tail": boolean;
  "source": "order" | "import" | "upd" | "scan" | "aggregation";
  "import_id"?: UUID;
  "order_id"?: UUID;
  "produced_at"?: string;
  "expires_at"?: string;
  /** Вес в граммах из кода */
  "weight_g"?: number;
  /** Последний известный статус ГИС МТ */
  "gismt_status": string;
  "gismt_owner_inn": string;
  "gismt_checked_at"?: string;
  /** Этикеток напечатано без тестовых */
  "printed": number;
  /** Из них дубликатов */
  "duplicates": number;
  "created_at": string;
}

export interface MarkingCodeOrder {
  "id": UUID;
  "oms_order_id": string;
  "company_id": UUID;
  "company_name": string;
  "product_group": string;
  "release_method": string;
  "cis_type": string;
  "origin": "akeda" | "oms";
  /** orderStatus СУЗ как есть */
  "status": string;
  /** Статус словами на языке запроса с причиной отказа */
  "status_text": string;
  "status_reason": string;
  "created_at": string;
  "oms_created_at": string | null;
  "expires_at": string | null;
  "last_synced_at": string | null;
  "created_by": number | null;
  "items": Array<MarkingCodeOrderItem> | null;
  "quantity": number;
  "received": number;
}

export interface MarkingCodeOrderEnvelope {
  "order": MarkingCodeOrder;
}

export interface MarkingCodeOrderItem {
  "gtin": string;
  "product_id": string | null;
  "product_name": string;
  "quantity": number;
  "received": number;
  "template_id": number | null;
  /** Статус буфера СУЗ как есть */
  "buffer_status": string;
  "left_in_buffer": number | null;
  "available_codes": number | null;
  "total_passed": number | null;
  "rejection_reason": string;
  "expires_at": string | null;
}

export interface MarkingCodeOrderPage {
  "items": Array<MarkingCodeOrder> | null;
  "total": number;
}

export interface MarkingCodePage {
  "items": Array<MarkingCode> | null;
  "total": number;
}

export type MarkingCodeState = "received" | "printed" | "applying" | "applied" | "introducing" | "introduced" | "spoiled";

export interface MarkingCompany {
  "id": UUID;
  "name": string;
  "inn": string;
  "business_id": UUID;
  "is_active": boolean;
}

export interface MarkingCompanyGroup {
  "company_id": UUID;
  /** Ключ товарной группы */
  "group": string;
  "enabled": boolean;
  "transfer_mode": MarkingTransferMode;
  "updated_at": string;
}

export interface MarkingCompanyGroupInput {
  "company_id": UUID;
  /** Ключ товарной группы */
  "group": string;
  "enabled": boolean;
  "transfer_mode": MarkingTransferMode;
}

export interface MarkingCompanyGroupList {
  "company_groups": Array<MarkingCompanyGroup> | null;
}

export interface MarkingCompanyList {
  "companies": Array<MarkingCompany>;
}

export interface MarkingCompanySettings {
  "company_id"?: UUID;
  /** Префикс предприятия GS1 из 6–12 цифр или пусто */
  "gs1_prefix"?: string;
  /** Ключ шаблона этикетки; пусто — 58×40 */
  "label_template"?: string;
  "label_preset"?: "" | "marking" | "marking_marketplace";
  "label_channel"?: "" | "wildberries" | "ozon" | "yandex";
  /** Вид складского документа → строгость */
  "strictness"?: { [key: string]: MarkingStrictness };
  /** Причина списания склада → ключ причины вывода ГИС МТ */
  "withdrawal_reasons"?: { [key: string]: string };
}

export interface MarkingCompanySettingsEnvelope {
  "settings": MarkingCompanySettings;
}

export interface MarkingCompanySettingsView {
  "settings": MarkingCompanySettings;
  "writeoff_reasons": Array<MarkingCompanySettingsViewWriteoffReasonsItem> | null;
  "withdrawal_reason_options": Array<MarkingCompanySettingsViewWithdrawalReasonOptionsItem>;
  "templates": Array<MarkingCompanySettingsViewTemplatesItem>;
}

export interface MarkingCompanySettingsViewWriteoffReasonsItem {
  "id": UUID;
  "name": string;
  "active": boolean;
}

export interface MarkingCompanySettingsViewWithdrawalReasonOptionsItem {
  "key": string;
  "name_ru": string;
  "name_en": string;
  "document": "LK_RECEIPT" | "WRITE_OFF";
}

export interface MarkingCompanySettingsViewTemplatesItem {
  "key": string;
  "name": string;
}

/** Подключение юрлица. Токенов True API и СУЗ здесь нет и не будет. */
export interface MarkingConnection {
  "company_id": UUID;
  "company_name": string;
  "company_inn": string;
  "connected": boolean;
  "contour"?: "sandbox" | "production";
  /** ИНН входа */
  "inn"?: string;
  /** Есть живой вход в ГИС МТ */
  "has_token": boolean;
  "token_kind"?: "jwt" | "uuid";
  "token_expires_at"?: string;
  "token_issued_at"?: string;
  "token_issued_by"?: number;
  "certificate"?: MarkingCertificate;
  /** Несекретные сведения об участнике из входа */
  "participant"?: { [key: string]: unknown };
  "last_check_at"?: string;
  "last_check_status"?: MarkingCheckStatus;
  "last_check_message"?: string;
  "oms_id": string;
  "oms_connection": string;
  /** Есть живой вход в СУЗ */
  "oms_has_token": boolean;
  "oms_token_expires_at": string | null;
  "oms_token_issued_at": string | null;
  "oms_last_ping_at": string | null;
  "oms_last_ping_status": MarkingCheckStatus;
  "oms_last_ping_message": string;
}

export interface MarkingConnectionEnvelope {
  "connection": MarkingConnection;
}

export interface MarkingConnectionList {
  "connections": Array<MarkingConnection> | null;
}

export interface MarkingDocumentCodeLine {
  "line": UUID;
  /** Сторона строки у комплектации (расход или выпуск); пусто у прочих */
  "side": string;
  "product_id": UUID;
  "product_name": string;
  "product_sku": string;
  /** Количество в базовой единице строкой */
  "quantity": string;
  /** Товар маркируется на дату документа */
  "marked": boolean;
  "mode": "" | "unit" | "gtin";
  "group": string;
  /** Сколько кодов ждёт строка */
  "required": number;
  "assigned": number;
  "strictness": MarkingStrictness;
  "status": "ok" | "missing" | "excess" | "not_required";
  "codes": Array<MarkingStockLineCode> | null;
  /** Сколько кодов единиц ждём по входящему УПД; 0 — ожидания нет */
  "expected": number;
  /** Ожидаемые коды без криптохвоста */
  "expected_codes": Array<string> | null;
  "expected_packages": Array<MarkingExpectedPackage> | null;
  /** Отсканировано из ожидаемых */
  "accepted": number;
  /** Ожидались по УПД и не отсканированы */
  "missing": number;
  /** Отсканированы, но в УПД их нет */
  "extra": number;
}

export interface MarkingDocumentCodeProblem {
  /** Вид проблемы */
  "code": string;
  "line"?: UUID;
  "product_id"?: UUID;
  "code_id"?: UUID;
  "identity"?: string;
  "required"?: number;
  "assigned"?: number;
  "strictness"?: MarkingStrictness;
}

export interface MarkingDocumentCodes {
  "document_id": UUID;
  "type": string;
  "status": string;
  "company_id": UUID;
  /** Коды можно менять — документ не проведён */
  "editable": boolean;
  "lines": Array<MarkingDocumentCodeLine> | null;
  "summary": MarkingDocumentCodesSummary;
}

export interface MarkingDocumentCodesSummary {
  "required": number;
  "assigned": number;
  "status": "ok" | "missing" | "excess" | "not_required";
  "problems": Array<MarkingDocumentCodeProblem> | null;
  /** Кодов единиц ждём по входящему УПД */
  "expected": number;
  "accepted": number;
  "missing": number;
  "extra": number;
  /** Упаковок в УПД; их состав сверяется позже */
  "expected_packages": number;
  /** Входящий документ поставщика (ВХ) — основание поступления; null — основания нет */
  "basis_document_id": UUID | null;
  /** Итог сверки для титула покупателя: принять, принять с расхождениями или отказ возможен. Нет поля — сверять не с чем. */
  "verdict"?: "accept" | "accept_with_discrepancy" | "reject_possible";
  /** УПД сейчас не прочитался — ожидание не показано */
  "expected_unavailable"?: boolean;
}

export interface MarkingDocumentDraft {
  "id": UUID;
  "company_id": UUID;
  "kind": MarkingDocumentKind;
  "gismt_type": string;
  "product_group": string;
  "codes_count": number;
  "status": "draft" | "sent" | "accepted" | "rejected" | "cancelled";
  "gismt_doc_id": string;
  "gismt_status": string;
  "error_text": string;
  "params": MarkingDocumentParams;
  "created_at": string;
  "sent_at": string | null;
  "checked_at": string | null;
  /** Тело документа base64 — его подписывает человек */
  "body_base64": string;
  /** SHA-256 тела шестнадцатеричный */
  "body_hash": string;
}

export interface MarkingDocumentDraftEnvelope {
  "draft": MarkingDocumentDraft;
}

export interface MarkingDocumentDraftInput {
  "company_id": UUID;
  "kind": MarkingDocumentKind;
  "product_group": string;
  /** Коды документа; достаточно кода без криптохвоста */
  "codes"?: Array<string>;
  "params"?: MarkingDocumentParams;
}

export type MarkingDocumentKind = "withdrawal" | "withdrawal_cancel" | "return" | "introduce" | "introduce_remains" | "cancel_codes" | "aggregation" | "disaggregation";

/** Параметры вида документа; незнакомое поле — отказ */
export interface MarkingDocumentParams {
  "reason"?: string;
  "reason_other"?: string;
  "action_date"?: string;
  "buyer_inn"?: string;
  /** Цена за единицу в копейках с НДС */
  "product_cost"?: number;
  "kpp"?: string;
  "fias_id"?: string;
  "primary_document_type"?: string;
  "primary_document_number"?: string;
  "primary_document_date"?: string;
  "primary_document_name"?: string;
  "withdrawal_document_id"?: string;
  "return_type"?: string;
  "paid"?: boolean;
  "production_date"?: string;
  "production_type"?: string;
  "tnved_code"?: string;
  "certificate_type"?: string;
  "certificate_number"?: string;
  "certificate_date"?: string;
  /** Формирование упаковки — код короба «00» + SSCC */
  "unit_serial_number"?: string;
}

/** Отказ модуля маркировки. Поля сверх `code` и `detail` приходят только у отказов, где экран подсвечивает место: параметр документа ГИС МТ, номер кода в запросе или код со строкой складского документа. */
export interface MarkingError {
  /** Машинный код отказа (`marking.…` или код причины разбора скана) */
  "code"?: string;
  /** Одно предложение на языке запроса */
  "detail": string;
  /** Идентификатор случая у ответов 5xx */
  "request_id"?: string;
  /** Параметр документа ГИС МТ с ошибкой */
  "field"?: string;
  /** Что не так с параметром */
  "problem"?: "required" | "format" | "value" | "not_allowed" | "unavailable" | "unsupported" | "date_range" | "unknown";
  /** Номер нераспознанного кода в запросе с единицы */
  "index"?: number;
  /** Нераспознанный код как пришёл */
  "value"?: string;
  /** Код без криптохвоста, по которому отказ */
  "identity"?: string;
  /** SSCC короба, где уже лежит код (или паллеты, где лежит короб) */
  "box"?: string;
  /** Строка складского документа отказа */
  "line"?: string;
}

export interface MarkingExpectedPackage {
  /** Код упаковки из УПД без криптохвоста */
  "identity": string;
  /** Групповая (НомУпак) или транспортная (ИдентТрансУпак) упаковка */
  "kind": "group" | "transport";
  /** Сколько единиц в упаковке по УПД; 0 — не указано */
  "units": number;
}

export interface MarkingGISMTCodePage {
  "items": Array<MarkingGISMTCodePageItemsItem>;
  "is_last": boolean;
  "next_emission_date"?: string;
  "next_sgtin"?: string;
  "scanned": number;
}

export interface MarkingGISMTCodePageItemsItem {
  "sgtin": string;
  "gtin": string;
  "status": string;
  "status_ex"?: string;
  "emission_date"?: string;
  "application_date"?: string;
  "produced_date"?: string;
  "package_type"?: string;
  "general_package_type"?: string;
  "owner_inn"?: string;
  "product_group"?: string;
  "parent"?: string;
  "product_name"?: string;
  "brand"?: string;
  "product_sku"?: string;
  "product_id"?: string;
}

export interface MarkingGISMTCodesInput {
  "company_id": UUID;
  /** Ключ товарной группы; пусто — все включённые группы юрлица */
  "group"?: string;
  /** Статусы ГИС МТ (EMITTED, APPLIED, INTRODUCED …); пусто — все */
  "statuses"?: Array<string>;
  /** GTIN из 8–14 цифр */
  "gtin"?: string;
  "per_page"?: number;
  "cursor_date"?: string;
  "cursor_sgtin"?: string;
}

export interface MarkingGISMTDocument {
  "id": string;
  "number": string;
  "doc_date": string;
  "received_at": string;
  "type": string;
  "status": string;
  "sender_inn": string;
  "sender_name": string;
  "receiver_inn": string;
  "receiver_name": string;
  "product_group": string;
  "incoming": boolean;
}

export interface MarkingGISMTDocumentList {
  "items": Array<MarkingGISMTDocument> | null;
}

export interface MarkingGISMTDocumentView {
  /** Документ документооборота с тем же файлом; пока всегда null */
  "docflow_message_id": string | null;
  "document": MarkingGISMTDocumentViewDocument;
}

export interface MarkingGISMTDocumentViewDocument {
  "id": string;
  "number": string;
  "doc_date": string;
  "received_at": string;
  /** Вид словами на языке запроса */
  "type": string;
  /** Код вида ГИС МТ */
  "raw_type": string;
  "status": string;
  "sender_inn": string;
  "sender_name": string;
  "receiver_inn": string;
  "receiver_name": string;
  "product_group": string;
  "incoming": boolean;
  "errors": Array<string> | null;
  "codes": Array<MarkingGISMTDocumentViewDocumentCodesItem> | null;
  "items": Array<MarkingGISMTDocumentViewDocumentItemsItem> | null;
  "codes_total": number;
}

export interface MarkingGISMTDocumentViewDocumentCodesItem {
  "cis": string;
  "gtin": string;
  "status"?: string;
}

export interface MarkingGISMTDocumentViewDocumentItemsItem {
  "line"?: number;
  "name": string;
  "gtin": string;
  "quantity": number;
  /** Цена за единицу строкой, как в документе */
  "price"?: string;
}

export interface MarkingGroup {
  /** Ключ товарной группы (`pg` ГИС МТ) */
  "key": string;
  /** Название на языке запроса */
  "name": string;
  "name_ru": string;
  "name_en": string;
  /** Допускает ли группа маркировку остатков */
  "remains": boolean;
  /** Режимы передачи в УПД, разрешённые сегодня */
  "transfer_modes": Array<MarkingTransferMode>;
  /** Норма, разрешающая передачу по GTIN; нет поля — не разрешена */
  "gtin_rule"?: string;
}

export interface MarkingGroupList {
  "groups": Array<MarkingGroup>;
}

export interface MarkingImport {
  "id": UUID;
  "company_id": UUID;
  "source": "paste" | "file" | "scan";
  "file_name": string;
  "group": string;
  "total": number;
  "accepted": number;
  "duplicates": number;
  "rejected": number;
  "errors": Array<MarkingImportLineError> | null;
  "created_at": string;
}

export interface MarkingImportLineError {
  "line": number;
  /** Код причины отказа */
  "code": string;
  "pos": number;
  /** Начало строки без криптохвоста */
  "input": string;
}

export interface MarkingImportPage {
  "items": Array<MarkingImport> | null;
  "total": number;
}

export interface MarkingInventoryCode {
  "id": UUID;
  /** Код без криптохвоста */
  "identity": string;
  "gtin": string;
  /** Последний известный статус в ГИС МТ */
  "gismt_status": string;
  /** Найден, не найден (недостача) или лишний */
  "state": "found" | "missing" | "extra";
  /** Почему код лишний */
  "reason"?: "other_warehouse" | "other_company" | "not_on_stock";
  /** Склад, где лишний код числится за этим юрлицом */
  "warehouse_id"?: UUID;
  /** Когда отсканирован; у недостающего нет */
  "scanned_at"?: string;
}

export interface MarkingInventoryCodeLine {
  "line": UUID;
  "product_id": UUID;
  "product_name": string;
  "product_sku": string;
  /** Товарная группа профиля маркировки */
  "group": string;
  /** unit — коды поштучно; gtin — юрлицо передаёт товар по GTIN; пусто — товар не маркируется на дату */
  "mode": "" | "unit" | "gtin";
  /** Количество по учёту из снимка инвентаризации */
  "book_qty": string;
  /** Факт пересчёта; пусто — ещё не введён */
  "actual_qty": string | null;
  /** Кодов числится на складе */
  "expected": number;
  /** Отсканировано всего (найдено и лишних) */
  "scanned": number;
  "found": number;
  /** Числится, но не найдено */
  "missing": number;
  /** Найдено, но здесь не числится */
  "extra": number;
  /** Лишние важнее нехватки */
  "status": "ok" | "missing" | "extra" | "not_required";
  "codes": Array<MarkingInventoryCode>;
}

export interface MarkingInventoryCodes {
  "inventory_id": UUID;
  "company_id": UUID;
  "warehouse_id": UUID;
  /** Дата инвентаризации: на неё читается остаток кодов */
  "date": string;
  /** Состояние пересчёта склада: counting, counted, acts_created, closed */
  "workflow": string;
  /** Марки ещё сканируются — акты не сформированы */
  "editable": boolean;
  /** С чем сверено: регистр marking_codes */
  "source": "register";
  "lines": Array<MarkingInventoryCodeLine>;
  "summary": MarkingInventoryCodesSummary;
}

export interface MarkingInventoryCodesSummary {
  "expected": number;
  "scanned": number;
  "found": number;
  "missing": number;
  "extra": number;
  "status": "ok" | "missing" | "extra" | "not_required";
}

export interface MarkingInventoryRemoveResult {
  "line": MarkingInventoryCodeLine;
}

export interface MarkingInventoryScanInput {
  /** Скан или код без криптохвоста */
  "raw": string;
}

export interface MarkingInventoryScanResult {
  "code": MarkingInventoryCode;
  /** Код заведён в реестре юрлица этим сканом */
  "created": boolean;
  "line": MarkingInventoryCodeLine;
}

export interface MarkingInventoryTransferDocument {
  "document_id": UUID;
  "type": "stock_writeoff" | "stock_capitalization";
  "status": string;
  /** Кодов перенесено этим вызовом */
  "transferred": number;
  /** Кодов в акте */
  "codes": number;
  /** Почему акт не тронут */
  "skipped"?: "document_posted" | "document_has_codes";
}

export interface MarkingInventoryTransferResult {
  "documents": Array<MarkingInventoryTransferDocument>;
  "skipped": Array<MarkingInventoryTransferSkip>;
}

export interface MarkingInventoryTransferSkip {
  "code_id": UUID;
  "identity": string;
  "product_id": UUID;
  "state": "missing" | "extra";
  /** Причина лишнего или почему код не лёг в акт */
  "reason": "other_warehouse" | "other_company" | "no_line" | "no_document";
}

export interface MarkingLabelTemplate {
  "key": string;
  /** Название на языке запроса */
  "name": string;
  "width_mm": number;
  "height_mm": number;
  /** Этикетки раскладываются на лист */
  "sheet": boolean;
  "per_page": number;
  "page_width_mm": number;
  "page_height_mm": number;
}

export interface MarkingLabelTemplates {
  "templates": Array<MarkingLabelTemplate>;
  "fields": Array<string>;
  "channels": Array<string>;
  "presets": Array<string>;
  "reasons": Array<string>;
  "limits": MarkingLabelTemplatesLimits;
}

export interface MarkingLabelTemplatesLimits {
  /** Кодов в одной печати */
  "codes": number;
  /** Копий на код */
  "copies": number;
  /** Этикеток в одной печати */
  "labels": number;
}

export interface MarkingModList {
  "mods": Array<MarkingModListModsItem> | null;
}

export interface MarkingModListModsItem {
  "kpp": string;
  "fias_id": string;
  "address": string;
  "inn"?: string;
  "product_groups"?: Array<string>;
}

export interface MarkingOrderCode {
  "id": UUID;
  "gtin": string;
  /** Порядковый номер кода в заказе по GTIN */
  "seq": number | null;
  /** Код без криптохвоста */
  "identity": string;
  "state": MarkingCodeState;
  /** Этикеток напечатано без тестовых */
  "printed": number;
  /** Из них дубликатов */
  "duplicates": number;
  /** Живой отчёт о нанесении кода */
  "application_id": string | null;
  /** Пояснение к испорченному коду */
  "spoiled_note": string;
  "spoiled_at": string | null;
}

export interface MarkingOrderCodes {
  "order": MarkingCodeOrder;
  /** Как наносятся коды группы заказа */
  "application_mode": "report" | "auto";
  "gtins": Array<MarkingOrderGtinSummary>;
  "items": Array<MarkingOrderCode>;
  /** Кодов по отбору */
  "total": number;
  "print_jobs": Array<MarkingOrderPrintJob>;
  "applications": Array<MarkingApplication>;
}

export interface MarkingOrderGtinSummary {
  "gtin": string;
  "product_id": string | null;
  "product_name": string;
  /** Заказано */
  "quantity": number;
  /** Получено в реестр */
  "received": number;
  /** Напечатано хотя бы раз */
  "printed": number;
  /** В отчёте о нанесении в обработке */
  "applying": number;
  /** Нанесено, включая введённые в оборот */
  "applied": number;
  /** В отправленном документе ввода */
  "introducing": number;
  /** В обороте */
  "introduced": number;
  /** Испорчено */
  "spoiled": number;
  /** Получено и ещё не напечатано, не нанесено и не испорчено */
  "unprinted": number;
  /** Можно отметить нанесёнными */
  "applicable": number;
  /** Нанесено, но ещё не вводится и не в обороте */
  "introducible": number;
}

export interface MarkingOrderInput {
  "company_id": UUID;
  "product_group": string;
  "release_method": "PRODUCTION" | "IMPORT" | "REMAINS" | "REMARK" | "COMMISSION" | "REAPPLY";
  /** Вид кода всех строк; пусто — UNIT */
  "cis_type"?: "" | "UNIT" | "GROUP" | "SET" | "BUNDLE";
  "contact_person"?: string;
  /** Откреплённая подпись УКЭП (CMS в base64) тела заказа из «Подготовить заказ»; СУЗ без неё заказ отклоняет */
  "signature"?: string;
  "items": Array<MarkingOrderInputItemsItem>;
}

export interface MarkingOrderInputItemsItem {
  /** GTIN из 14 цифр */
  "gtin": string;
  "quantity": number;
  "product_id"?: UUID;
  /** Шаблон кода СУЗ; 0 — по группе */
  "template_id"?: number;
}

export interface MarkingOrderPrintJob {
  "id": UUID;
  "created_at": string;
  "created_by": number | null;
  "reason": "first" | "duplicate" | "test";
  "template": string;
  "copies": number;
  "note": string;
  /** Диапазоны номеров напечатанных кодов по GTIN */
  "ranges": Array<MarkingSeqRange>;
}

export interface MarkingOrderReceiveResult {
  "order": MarkingCodeOrder;
  "received_now": number;
  "duplicates": number;
  "rejected": number;
  "has_more": boolean;
}

export interface MarkingOrderSyncResult {
  "seen": number;
  "created": number;
  "updated": number;
}

export interface MarkingOutboxDocument {
  "id": UUID;
  "company_id": UUID;
  "kind": MarkingDocumentKind;
  "gismt_type": string;
  "product_group": string;
  "codes_count": number;
  "status": "draft" | "sent" | "accepted" | "rejected" | "cancelled";
  "gismt_doc_id": string;
  "gismt_status": string;
  "error_text": string;
  "params": MarkingDocumentParams;
  "created_at": string;
  "sent_at": string | null;
  "checked_at": string | null;
}

export interface MarkingOutboxDocumentEnvelope {
  "document": MarkingOutboxDocument;
}

export interface MarkingOutboxPage {
  "items": Array<MarkingOutboxDocument> | null;
  "total": number;
}

export interface MarkingParseCodeInput {
  "company_id": UUID;
  /** Строка из поля поиска или скан */
  "raw": string;
}

export interface MarkingParsedCode {
  "is_marking_code": boolean;
  "gtin": string;
  /** Код без криптохвоста */
  "identity": string;
  "serial": string;
  /** Группа, по формату которой код разобран */
  "group": string;
  /** Группы юрлица, под формат которых код подходит */
  "groups": Array<string> | null;
  "has_crypto_tail": boolean;
  "kind": string;
  "product_id"?: UUID;
  "product_name"?: string;
}

export interface MarkingProductProfile {
  "product_id": UUID;
  /** Ключ товарной группы */
  "group": string;
  "package_kind": "unit" | "group" | "set";
  /** Способ ввода в оборот */
  "intro_method": "production" | "contract" | "import" | "remains" | "commission";
  /** С какой даты товар маркируется; нет поля — с начала учёта */
  "marked_since"?: string;
  "updated_at": string;
}

export interface MarkingProductProfileEnvelope {
  "profile": MarkingProductProfile | null;
}

/** Реквизиты модуля у маркируемого товара. Группу маркировки задаёт карточка товара (core), здесь её нет. */
export interface MarkingProductProfileInput {
  "package_kind": "unit" | "group" | "set";
  /** Способ ввода в оборот; remains — только у групп с маркировкой остатков */
  "intro_method": "production" | "contract" | "import" | "remains" | "commission";
  /** Дата ГГГГ-ММ-ДД или пусто */
  "marked_since"?: string;
}

export interface MarkingReplaceCodesInput {
  "company_id": UUID;
  "lines": Array<MarkingReplaceCodesInputLinesItem>;
}

export interface MarkingReplaceCodesInputLinesItem {
  "line": UUID;
  "product_id"?: UUID;
  /** Коды строки; достаточно кода без криптохвоста */
  "codes": Array<string>;
}

export interface MarkingScanDocumentInput {
  "line"?: UUID;
  /** Скан или код без криптохвоста */
  "raw": string;
}

export interface MarkingScanDocumentResult {
  "code": MarkingCode;
  "line": UUID;
  /** Код заведён в реестре этим сканом */
  "created": boolean;
  "document": MarkingDocumentCodes;
}

export interface MarkingSeqRange {
  "gtin": string;
  /** Наименьший номер кода в заказе по GTIN */
  "from": number;
  /** Наибольший номер кода в заказе по GTIN */
  "to": number;
  /** Сколько кодов */
  "count": number;
}

export interface MarkingSpoilInput {
  "code_ids": Array<UUID>;
  /** true — отметить испорченными, false — снять отметку */
  "spoiled": boolean;
  /** Что случилось: испорчена, утрачена */
  "note"?: string;
}

export interface MarkingStockLineCode {
  "id": UUID;
  /** Код без криптохвоста */
  "identity": string;
  "gtin": string;
  "gismt_status": string;
  /** Код есть во входящем УПД поставщика */
  "expected": boolean;
}

export type MarkingStrictness = "off" | "warn" | "require";

export type MarkingTransferMode = "unit" | "gtin";

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
  /** Живые задачи вехи, без архивных */
  "task_count": number;
  /** Из них в финальном статусе */
  "tasks_done": number;
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
  /** Наше приложение: его установка получает долгий потолок срока жизни токена. Ставится персоналом платформы, из манифеста не выводится */
  "internal"?: boolean;
  /** Сотрудник платформы, заведший приложение */
  "created_by"?: number;
  "created_at": string;
  "updated_at": string;
}

export type PlatformAppInstallationStatus = "pending" | "active" | "suspended" | "revoked";

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

export type PlatformAppStatus = "draft" | "published" | "suspended" | "retired";

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
  /** Бизнес проекта: правило «все задачи» при области доступа не на все бизнесы видит только проекты её бизнесов и кабинета; участники проекта видят его всегда. null — проект всего кабинета */
  "business_id": UUID | null;
}

export interface ProjectCreate {
  "name": string;
  "key"?: string;
  "description"?: string;
  "color"?: string;
  /** Бизнес проекта. Пусто — единственный бизнес области доступа или весь кабинет (его заводит только доступ ко всем бизнесам). Бизнес вне области доступа — 403 tasks.project_business_forbidden */
  "business_id"?: UUID | null;
}

export interface ProjectPage {
  "count": number;
  "results": Array<Project>;
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

export interface SettingsCompany {
  "id": UUID;
  "business_id": UUID;
  "name": string;
  "legal_name": string;
  /** Юридическое лицо или индивидуальный предприниматель */
  "entity_type": "legal" | "sole_prop";
  /** Пустой только у юрлица внутреннего учёта */
  "inn": string;
  "kpp": string;
  /** ОГРН у юрлица или ОГРНИП у предпринимателя */
  "ogrn": string;
  /** ОКПО; необязательный реквизит формализованного документа */
  "okpo": string;
  /** Код филиала у оператора ЭДО; не КПП */
  "branch_code": string;
  /** Режим налога, действующий сегодня (версия учётной политики): deductible — в вычет, non_deductible — в стоимость, none — налога нет, пусто — не выбран */
  "vat_accounting_mode": "" | "deductible" | "non_deductible" | "none";
  /** Кто поставил значение: manual — человек, import — внешняя система; импорт не перезаписывает manual */
  "vat_accounting_mode_source": "manual" | "import";
  "legal_address": SettingsCompanyAddress;
  "entrepreneur": SettingsCompanyPerson;
  "head"?: SettingsCompanyHead;
  "is_active": boolean;
  /** Значения своих полей кабинета: графа («Настройки → Поля», вид core.company) → значение */
  "custom": { [key: string]: unknown };
  /** Контроль закрывающих документов по выданным авансам: вкладка «Ждём закрывающие» ведёт авансы этого юрлица. Для режима «доходы минус расходы» обязателен, на «доходах» не нужен */
  "closing_control"?: boolean;
}

export interface SettingsCompanyAddress {
  "postal_code": string;
  /** Код субъекта РФ для формализованного документа */
  "region_code": string;
  "region_name": string;
  "district": string;
  "city": string;
  "settlement": string;
  "street": string;
  "building": string;
  "block": string;
  /** Офис или помещение */
  "flat": string;
  /** Дополнение, которое не раскладывается по остальным частям адреса */
  "info": string;
}

/** Руководитель юрлица полным ФИО и должностью — подписант документов без доверенности; ФИО как в сертификате подписи */
export interface SettingsCompanyHead {
  "surname"?: string;
  "name"?: string;
  "patronymic"?: string;
  "position"?: string;
}

export interface SettingsCompanyPage {
  /** Число отданных строк, страниц у справочника нет */
  "count": number;
  "results": Array<SettingsCompany>;
}

export interface SettingsCompanyPerson {
  "surname": string;
  "name": string;
  "patronymic": string;
  /** Дата присвоения ОГРНИП; с 01.04.2026 печатается в счёте-фактуре под подписью ИП вместе с ОГРНИП */
  "ogrnip_date"?: string;
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
  /** Роль действует во всех бизнесах кабинета, включая заведённые позже. У администратора всегда true */
  "all_businesses": boolean;
  /** Бизнесы сотрудника; пуст при all_businesses */
  "businesses": Array<SettingsMemberBusinessScope>;
}

export interface SettingsMemberAccessInput {
  /** Все бизнесы кабинета; тогда businesses не передаётся */
  "all_businesses"?: boolean;
  /** Бизнесы сотрудника целиком; повторы и юрлица бизнеса, выданного целиком, сворачиваются */
  "businesses"?: Array<SettingsMemberBusinessScope>;
}

export interface SettingsMemberBusinessScope {
  "business": UUID;
  /** Сужает доступ до юрлица этого бизнеса; без поля — бизнес целиком */
  "company"?: UUID;
}

export interface SettingsMemberPage {
  /** Число строк в results, а не общее число участников кабинета */
  "count": number;
  "results": Array<SettingsMember>;
}

export interface SettingsRole {
  "id": UUID;
  "name": string;
  /** У административной роли permissions всегда равны ["*:*"] */
  "is_admin": boolean;
  "is_active": boolean;
  /** Право записывается как «модуль:действие», например settings:read */
  "permissions": Array<string>;
  /** Ключ — ресурс модуля: tasks.task, crm.lead, crm.deal, crm.customer, crm.conversation, core.order, docflow.payment_request и ресурсы клиентских модулей. Значение — own (свои), projects (свои и проекты участия, у задач), team (свои и подчинённых), department (своего подразделения), department_tree (подразделения с подотделами) или all (все записи области). Пустая карта означает видимость только своих записей */
  "record_rules": { [key: string]: "own" | "projects" | "team" | "department" | "department_tree" | "all" };
}

export interface SettingsRolePage {
  /** Число строк в results, а не общее число ролей кабинета */
  "count": number;
  "results": Array<SettingsRole>;
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

/** Тело черновика переноса остатка; строки подбирает сервер. */
export interface StockAccountTransferCreate {
  /** Пусто или отсутствует означает рабочую дату кабинета */
  "date"?: string;
  "business_id": UUID;
  "comment"?: string;
}

/** Строка переноса остатка — стоимость склада и товара, которая лежит в книге на счёте `from_*`, хотя по правилу на дату принадлежит счёту `to_*`. */
export interface StockAccountTransferLine {
  "business_id": UUID;
  "company_id"?: UUID;
  "warehouse_id": UUID;
  "warehouse_name": string;
  "product_id": UUID;
  "product_name": string;
  "from_account": UUID;
  /** Код старого счёта, например 41 */
  "from_code": string;
  "to_account": UUID;
  /** Код счёта по действующему правилу, например 10 */
  "to_code": string;
  /** Сумма переноса, десятичная строка */
  "amount": string;
}

export interface StockAccountTransferProposal {
  "count": number;
  "results": Array<StockAccountTransferLine>;
}

/** Одна версия спецификации изделия. Состав опубликованной версии неизменяем — новая редакция заводится новой версией. */
export interface StockAssemblySpec {
  "id"?: UUID;
  "spec_id"?: UUID;
  "version"?: number;
  "name"?: string;
  "status"?: "draft" | "active" | "archived";
  /** Вид состава: assembly — «Сборка», production — «Производство», kit — «Комплект» (заложен, пока не заводится). Хранится у версии: следующая редакция может сменить вид */
  "kind"?: "assembly" | "production" | "kit";
  "product_id"?: UUID;
  "product_sku"?: string;
  "product_name"?: string;
  "unit"?: string;
  "output_qty"?: string;
  "comment"?: string;
  "created_at"?: string;
  "updated_at"?: string;
  "activated_at"?: string;
  "archived_at"?: string;
  "lines"?: Array<StockAssemblySpecLine>;
  /** Версии, которые это действие убрало в архив: активация архивирует прежнюю действующую версию того же товара — своей или другой спецификации. Поле есть только в ответе смены состояния; отсутствует, если в архив ничего не ушло */
  "archived_versions"?: Array<StockAssemblySpecArchivedVersion>;
}

export interface StockAssemblySpecArchivedVersion {
  "id": UUID;
  "spec_id": UUID;
  "name": string;
  "version": number;
}

/** Новая версия состава. Пустой `spec_id` заводит новую спецификацию, названный — следующую редакцию существующей. Версия рождается черновиком. */
export interface StockAssemblySpecCreate {
  /** Спецификация, к которой заводится следующая редакция. Должна существовать в кабинете, а product_id — совпадать с её выходным товаром; состояние прежних версий не важно — редакцию заводят и от архивной. Пусто — новая спецификация */
  "spec_id"?: UUID;
  "name": string;
  /** Вид состава: assembly — «Сборка» (по умолчанию), production — «Производство». Вид kit («Комплект») пока не принимается — ответ 400 */
  "kind"?: "assembly" | "production";
  "product_id": UUID;
  /** Сколько выходного товара даёт этот состав */
  "output_qty": string;
  "comment"?: string;
  "lines": Array<StockAssemblySpecCreateLinesItem>;
}

export interface StockAssemblySpecCreateLinesItem {
  "product_id": UUID;
  "qty": string;
  "share"?: string;
}

export interface StockAssemblySpecLine {
  "id"?: UUID;
  "product_id": UUID;
  "product_sku"?: string;
  "product_name"?: string;
  "unit"?: string;
  /** Единица товара, в которой задано qty (рулон, грамм); пусто — базовая единица карточки */
  "product_uom_id"?: UUID;
  /** Название единицы товара */
  "uom_name"?: string;
  /** Положительная decimal string в единице товара или в базовой единице карточки */
  "qty": string;
  /** То же количество в базовой единице на момент заведения версии; считает сервер. Смысл состава — это число: коэффициент упаковки может измениться позже */
  "base_qty"?: string;
  /** Доля стоимости при разукомплектации; задаётся сразу для всего состава или не задаётся вовсе */
  "share"?: string;
  "position"?: number;
}

export interface StockAssemblySpecPage {
  "count": number;
  "limit": number;
  "offset": number;
  "results": Array<StockAssemblySpec>;
}

/** Снимок версии спецификации, по которой заполнен документ. Ссылка на версию, а не на справочник: состав уже скопирован в строки, и правка спецификации завтра не меняет смысл проведённого вчера. Версию сервер читает, только когда ссылка появляется — при создании документа и при правке, называющей другую версию: такая версия обязана быть действующей, черновая и архивная отклоняются. Правка черновика с прежним version_id версию не читает, и документ остаётся правимым, даже если версия ушла в архив или удалена; ссылку можно снять. */
export interface StockAssemblySpecRef {
  "spec_id": UUID;
  "version_id": UUID;
  "version": number;
  "name"?: string;
  /** Вид версии состава на момент заполнения документа; ставит сервер */
  "kind"?: "assembly" | "production";
}

export interface StockAssemblySpecStatus {
  "status": "active" | "archived";
}

/** Полная замена реквизитов и состава черновика. Номер версии и спецификация, к которой она относится, не меняются. Проверки те же, что при заведении версии. */
export interface StockAssemblySpecUpdate {
  "name": string;
  /** Вид состава: assembly — «Сборка» (по умолчанию), production — «Производство». Вид kit («Комплект») пока не принимается — ответ 400 */
  "kind"?: "assembly" | "production";
  /** Выходной товар. Сменить его можно только у единственной версии спецификации: другой товар при нескольких версиях — это другая спецификация */
  "product_id": UUID;
  /** Сколько выходного товара даёт этот состав */
  "output_qty": string;
  "comment"?: string;
  "lines": Array<StockAssemblySpecUpdateLinesItem>;
}

export interface StockAssemblySpecUpdateLinesItem {
  "product_id": UUID;
  /** Единица товара, в которой задано qty; пусто — базовая единица карточки */
  "product_uom_id"?: UUID;
  "qty": string;
  "share"?: string;
}

export interface StockBatch {
  "id": UUID;
  /** Бизнес партии — учётная единица, которой принадлежит товар */
  "business_id": { [key: string]: unknown };
  "business_name": string;
  /** Юрлицо партии — разрез официального контура. У неофициального прихода его нет, и тогда поле пустое (ERP-704). */
  "company_id": UUID | null;
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

/** Тело черновика списания претензии поставщику по недостаче приёмки. */
export interface StockClaimWriteoffCreate {
  "basis_id": UUID;
  /** Пусто или отсутствует означает рабочую дату кабинета */
  "date"?: string;
  /** Сумма в валюте приёмки; пусто — весь остаток претензии */
  "amount"?: string;
  "item_id": UUID;
  "comment"?: string;
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

export interface StockDocumentCreate {
  "type_key": StockDocumentCreateTypeKey;
  /** Пусто или отсутствует означает рабочую дату кабинета */
  "date"?: string;
  /** Документ-основание. У разукомплектации (stock_disassembly) основанием может быть проведённая комплектация (stock_assembly) того же бизнеса и юрлица, родившая разбираемый товар, датой не позже разбора. Тогда части — только товары, которые комплектация списывала (вернуть можно не все), доли стоимости не присылают, комплектация вида production обратно не разбирается, а проведёнными разборами по одной комплектации нельзя разобрать больше, чем она родила. Основание-резерв у разукомплектации этих правил не включает */
  "basis_id"?: UUID | null;
  "entity_refs": StockDocumentRefs;
  /** Для инвентаризации — фильтр снимка, для остальных видов — содержимое документа */
  "payload": StockDocumentPayload | StockInventoryCreatePayload;
  "comment"?: string;
}

export type StockDocumentCreateTypeKey = "stock_receipt" | "stock_shipment" | "stock_transfer" | "stock_writeoff" | "stock_capitalization" | "stock_supplier_return" | "stock_customer_return" | "stock_purchase_request" | "stock_supplier_order" | "stock_inventory" | "stock_reservation" | "stock_landed_cost" | "stock_assembly" | "stock_disassembly";

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
  /** Количество по документу поставщика, если пришло меньше (ERP-1230): сумма строки — по документу, склад и налог к вычету — по qty, разница — претензия поставщику (сторона claim, 76.02). Только у stock_receipt; меньше qty — 400 */
  "document_qty"?: string;
  /** Физическая единица справочника */
  "unit_id"?: UUID | null;
  /** Товарная единица представления */
  "product_uom_id"?: UUID | null;
  /** Количество в базовой единице номенклатуры; присланное значение обязано совпасть с серверным пересчётом. У прихода в единице с переменной мерой — сумма фактических мер handling_units */
  "base_qty"?: string;
  /** Ставит сервер: строка введена в единице с переменной мерой. qty — число конкретных единиц, base_qty — сумма их фактических мер, price — цена за базовую единицу */
  "variable_measure"?: boolean;
  /** Decimal string; за единицу строки, а у единицы с переменной мерой — за базовую единицу */
  "price"?: string;
  /** Decimal string */
  "amount"?: string;
  /** Сумма строки без налога. Считает сервер из paper_vat_amount и перезаписывает присланное */
  "amount_without_vat"?: string;
  /** Доля налога документа в строке: пропорционально сумме строки, копеечный остаток — на самую крупную. Считает сервер и перезаписывает присланное; по её наличию судят о разбивке при перепроведении */
  "vat_amount"?: string;
  "basis_line_id"?: UUID | null;
  /** Построчное происхождение, когда одна закупка сводит несколько заявок */
  "basis_document_id"?: UUID | null;
  "batch_code"?: string;
  "produced_at"?: string;
  "expires_at"?: string;
  "handling_units"?: Array<StockDocumentLineHandlingUnit>;
  "handling_unit_allocations"?: Array<StockDocumentLineHandlingAllocation>;
  /** Доля стоимости рождённой строки; только у разукомплектации без комплектации-основания на несколько частей. У разукомплектации на основании комплектации доли не присылают: присланная доля отклоняется, веса частей сервер берёт из проведения основания */
  "share"?: string;
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

/** Содержимое складского документа. Разбор строгий — незнакомое поле отклоняется. У документа-факта, заявки, продажи или закупки и резерва `items` обязателен и не длиннее 1000 строк. */
export interface StockDocumentPayload {
  "version": number;
  "reason"?: string;
  /** Причина списания из справочника stock.stock_writeoff_reasons. Есть только у списания. Текст reason при этом остаётся: ссылка даёт единое значение причины, текст несёт подробности. Не прислан — сервер сам пробует узнать текст в справочнике; прислан явно, в том числе null, — решение вызывающего не переигрывается; неизвестная ссылка отклоняется */
  "reason_id"?: UUID | null;
  "desired_at"?: string;
  "delivery_at"?: string;
  /** Срок резерва; не раньше даты документа */
  "expires_at"?: string;
  "items"?: Array<StockDocumentLine>;
  /** Строки, которые документ РОЖДАЕТ на складе. Только у комплектации и разукомплектации: их `items` — сторона расхода. Цена и сумма здесь не задаются, стоимость выхода равна списанной. */
  "produced"?: Array<StockDocumentLine>;
  "spec"?: StockAssemblySpecRef;
  /** Вид комплектации (только stock_assembly): assembly — «Сборка», production — «Производство». Документ, заполненный по составу (`spec`), получает вид версии состава — присланное значение, которое с ней расходится, отклоняется; без состава вид выбирает человек, пусто — assembly. Снимок: новая версия состава с другим видом документ не меняет. Документ без поля читается как assembly. У разукомплектации вида нет */
  "kind"?: "assembly" | "production";
  /** Итого по документу поставщика. Только проверка суммы строк: расхождение показывает экран, сохранение не останавливается */
  "paper_amount"?: string;
  /** В т.ч. НДС документа поставщика, одна сумма (ERP-484, подшаг 5.3). Обязательна, если на дату документа бизнес очищает суммы и юрлицо принимает налог к вычету; 0 — налог не выделен. Вне этого периода непустое значение — 400. Сервер раскладывает сумму по строкам */
  "paper_vat_amount"?: string;
  "supplier_document"?: SupplierDocument;
  /** Налоговая валюта юрлица на дату приёмки (ERP-484, Р21). Пишет сервер вместе с разбивкой налога; присланное значение перезаписывается */
  "tax_currency"?: string;
  /** Налог строк взят из документа поставщика как есть (ERP-1230): сервер не раскладывает paper_vat_amount, а проверяет vat_amount строк и пишет их сумму в paper_vat_amount */
  "vat_from_lines"?: boolean;
  /** Валюта приёмки (ERP-1230): ISO-код валюты документа поставщика; пусто или валюта учёта — документ в валюте учёта. Только у stock_receipt */
  "currency"?: string;
  /** Курс валюты документа: единиц валюты учёта за 1 единицу валюты документа. Без rate_manual сервер берёт его из справочника курсов на дату документа; нет курса — черновик без курса, проведение — 400 */
  "rate"?: string;
  /** Курс введён вручную: справочник его не перезаписывает */
  "rate_manual"?: boolean;
  /** Decimal string; сумма накладных расходов */
  "amount"?: string;
  "allocation_method"?: "quantity" | "cost" | "manual";
  "targets"?: Array<StockDocumentLandedCostTarget>;
  /** Разложение проведения по строкам и партиям, которое пишет сам движок. У разукомплектации на основании комплектации есть блок `disassembly_basis`: `document_id` и `number` основания, `amount` — фактически списанная сумма, `basis_amount` — сумма того же количества по основанию (рождённая сумма основания ÷ рождённое количество × разбираемое количество), `difference` — amount минус basis_amount, `weights` — веса частей по строкам (`line_id`, `weight`), по которым списанное разделено между частями. Веса и `basis_amount` — снимок первого проведения: пересчёт себестоимости цепочки их сохраняет и пересчитывает только `amount` и `difference`; отмена и повторное проведение считают всё заново */
  "posting"?: { [key: string]: unknown };
}

/** Ссылки шапки складского документа. Набор допустимых полей зависит от вида — перемещению нужны склад-отправитель и склад-получатель, инвентаризации только юрлицо и склад. */
export interface StockDocumentRefs {
  "company": UUID;
  "warehouse"?: UUID;
  "warehouse_from"?: UUID;
  /** Склад-получатель перемещения; у комплектации и разукомплектации — необязательный склад выпуска, без него выпуск появляется на складе списания */
  "warehouse_to"?: { [key: string]: unknown };
  "contact"?: UUID;
}

export type StockDocumentTypeKey = "stock_receipt" | "stock_shipment" | "stock_transfer" | "stock_writeoff" | "stock_capitalization" | "stock_supplier_return" | "stock_customer_return" | "stock_purchase_request" | "stock_supplier_order" | "stock_inventory" | "stock_reservation" | "stock_landed_cost" | "stock_assembly" | "stock_disassembly" | "stock_reservation_release" | "stock_supplier_order_close" | "stock_opening_balance" | "stock_marketplace_return" | "stock_account_transfer" | "supplier_order";

/** Временный адрес файла склада: подписанный адрес хранилища или адрес этого API. */
export interface StockDownloadLink {
  "url": string;
  "method": "GET";
  /** true — подписанный адрес хранилища, без заголовка авторизации; false — адрес этого API, с авторизацией */
  "direct": boolean;
  /** true — адрес требует токен API, агенту по MCP он недоступен */
  "requires_authorization": boolean;
  /** Срок подписанного адреса; у адреса API его нет */
  "expires_at"?: string;
  "name": string;
  "mime_type": string;
  "size_bytes": number;
  /** Контрольная сумма SHA-256, если известна */
  "sha256"?: string;
}

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

export type StockExportKind = "initial_stock" | "inventory_count" | "document_items" | "reorder_rules" | "stock_report";

export interface StockExportRequest {
  "kind": StockExportKind;
  "format"?: CoreProductTransferFormat;
  /** Обязателен для всех видов, кроме reorder_rules и stock_report */
  "target_document_id"?: UUID;
  /** Обязателен для stock_report и запрещён остальным видам: без отбора запрос означал бы «выгрузите весь кабинет» */
  "report"?: StockReportExportRequest;
}

export interface StockHandlingUnit {
  "id": UUID;
  "batch_id": UUID;
  "business_id"?: UUID;
  /** Нулевой UUID — единица без юрлица */
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
  /** Остаток меньше порога обрезка у единицы товара: вычисляется по остатку, а не хранится */
  "is_remnant": boolean;
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

/** Заявка на сессию загрузки файла складского импорта. filename и size — синонимы name и size_bytes. */
export interface StockImportUploadSessionRequest {
  "kind": StockImportKind;
  "mode": CoreProductImportMode;
  /** Имя файла с расширением xlsx, xls, ods, csv или tsv */
  "name"?: string;
  /** Тип содержимого; по умолчанию — по расширению файла */
  "mime_type"?: string;
  /** Точный размер файла в байтах */
  "size_bytes"?: number;
  /** Необязательная контрольная сумма SHA-256 строчными шестнадцатеричными знаками */
  "sha256"?: string;
  /** Складской документ, к которому привязан прогон; строки без document_id получают его */
  "target_document_id"?: UUID;
  /** Синоним поля name */
  "filename"?: string;
  /** Синоним поля size_bytes */
  "size"?: number;
}

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

/** Тело черновика ввода начальных остатков товара; вид задаёт ручка. */
export interface StockOpeningBalanceCreate {
  /** Пусто или отсутствует означает рабочую дату кабинета */
  "date"?: string;
  "entity_refs": StockDocumentRefs;
  "payload": StockDocumentPayload;
  "comment"?: string;
}

/** warehouse_id необязателен — без него склад выбирает сервер тем же правилом, что ship_warehouse */
export interface StockOrderShipInput {
  "warehouse_id"?: UUID;
  /** Дата отгрузки; пусто — текущая бизнес-дата */
  "date"?: string;
  "comment"?: string;
  "lines": Array<StockOrderShipInputLinesItem>;
}

export interface StockOrderShipInputLinesItem {
  "item_id": UUID;
  "quantity": string;
}

export interface StockOrderShipment {
  "id": UUID;
  "order_id": UUID;
  "number": string;
  "date": string;
  "status": string;
  "warehouse_id"?: UUID;
  "deal"?: UUID;
  "lines": Array<StockOrderShipmentLine>;
}

export interface StockOrderShipmentLine {
  "product_id": UUID;
  "qty": string;
}

export interface StockOrderShipping {
  "order_id": UUID;
  "number": string;
  "date": string;
  "state": string;
  "contact_id": UUID;
  "contact_name"?: string;
  "company_id"?: UUID;
  "warehouse_id"?: UUID;
  "lines": Array<StockOrderShippingLine>;
  "shipments": Array<StockOrderShipment>;
  "reserved": boolean;
  /** Остаток резерва самой продажи по складам (товар → количество). Свободный остаток склада его уже вычел, а отгрузка по продаже гасит свой резерв */
  "reservations"?: Array<StockOrderShippingReservationsItem>;
  "can_ship": boolean;
  "ship_blocked"?: string;
  /** Склад отгрузки по умолчанию; нет поля — сервер склад не подобрал, его выбирает человек */
  "ship_warehouse"?: StockOrderShippingShipWarehouse;
}

export interface StockOrderShippingReservationsItem {
  "warehouse_id": UUID;
  "products": { [key: string]: string };
}

/** Склад отгрузки по умолчанию; нет поля — сервер склад не подобрал, его выбирает человек */
export interface StockOrderShippingShipWarehouse {
  "id": UUID;
  "name": string;
  "source": "order" | "reservation" | "policy" | "stock";
}

export interface StockOrderShippingLine {
  "line_id": UUID;
  "product_id": UUID;
  "title": string;
  "unit"?: string;
  "ordered_qty": string;
  "shipped_qty": string;
  "remaining_qty": string;
}

export interface StockOrderShippingPage {
  "results": Array<StockOrderShipping>;
  "count": number;
}

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
  /** Коэффициент — номинал: фактическая мера у каждой конкретной единицы своя (рулон ~50 м) */
  "variable_measure"?: boolean;
  /** Шаг количества в этой единице: «режем по 10 см». Пусто — без ограничения */
  "qty_step"?: string;
  /** Порог обрезка: остаток конкретной единицы меньше порога считается обрезком. Только для единиц с учётом конкретных единиц */
  "remnant_threshold"?: string;
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
  /** Положительное число; десятичный разделитель — точка или запятая, хранится запись с точкой */
  "factor_to_base": string;
  /** Требует единицы измерения с целой точностью */
  "creates_handling_units"?: boolean;
  /** Переменная мера: приход складывает количество из фактических мер конкретных единиц, цена за базовую единицу; расход в такой единице невозможен. Требует creates_handling_units */
  "variable_measure"?: boolean;
  /** Положительное число (точка или запятая) или пусто: количество строки в этой единице обязано быть кратно шагу */
  "qty_step"?: string;
  /** Положительное число (точка или запятая) или пусто. Требует creates_handling_units */
  "remnant_threshold"?: string;
  "is_default_receipt"?: boolean;
  /** По умолчанию единица активна */
  "is_active"?: boolean | null;
}

export interface StockProductUOMPage {
  "count": number;
  "results": Array<StockProductUOM>;
}

export type StockProductUOMUsage = "purchase" | "receipt" | "packaging" | "consumption" | "sale";

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

export interface StockReceiptClaimBalance {
  "document_id": UUID;
  /** Валюта претензии; пусто — валюта учёта. */
  "currency"?: string;
  /** Претензия с налогом — движение расчётов самой приёмки; есть только у проведённой. */
  "claimed_amount"?: string;
  /** Незакрытый остаток претензии в расчётах. */
  "open_amount": string;
}

/** Тело черновика корректировки приёмки по УКД поставщика на уменьшение или увеличение. */
export interface StockReceiptCorrectionCreate {
  "basis_id": UUID;
  /** Уменьшение (по умолчанию) или увеличение стоимости */
  "direction"?: "decrease" | "increase";
  /** Пусто или отсутствует означает рабочую дату кабинета */
  "date"?: string;
  "supplier_document": StockReceiptCorrectionCreateSupplierDocument;
  /** Изменение с налогом в валюте приёмки, без знака */
  "amount": string;
  /** Налог изменения в валюте приёмки */
  "vat"?: string;
  "comment"?: string;
}

export interface StockReceiptCorrectionCreateSupplierDocument {
  /** Номер УКД поставщика */
  "number": string;
  /** Дата УКД поставщика */
  "date": string;
}

export interface StockReorderRule {
  "id": UUID;
  "business_id": UUID;
  "business_name": string;
  /** null означает правило бизнеса без юрлица */
  "company_id": UUID | null;
  /** Пустая строка у правила без юрлица */
  "company_name": string;
  "product_id": UUID;
  "product_sku": string;
  "product_name": string;
  /** null означает правило на все склады */
  "warehouse_id": UUID | null;
  "warehouse_name": string;
  /** Decimal string неснижаемого остатка */
  "min_qty": string;
  /** Decimal string целевого остатка; null — потолок не задан */
  "max_qty": string | null;
  /** Decimal string кратности продажи или закупки; null — кратность не задана */
  "order_multiple": string | null;
  "lead_time_days": number;
  "preferred_supplier_id": UUID | null;
  "preferred_supplier_name": string;
  "is_active": boolean;
  "updated_at": string;
}

export interface StockReorderRuleInput {
  /** Бизнес правила; обязателен без company_id, с company_id выводится от юрлица и обязан с ним совпасть */
  "business_id"?: UUID | null;
  /** Пропуск или null заводит правило бизнеса без юрлица */
  "company_id"?: UUID | null;
  /** Складская номенклатура — отдельный товар или вариант; семейство вариантов и услуга не принимаются */
  "product_id": UUID;
  /** Пропуск или null заводит правило на все склады; правилу без юрлица годится только склад, не закреплённый за юрлицами */
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
  "business_id"?: UUID;
  /** null переносит правило в бизнес без юрлица */
  "company_id"?: UUID | null;
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

/**
 * Отбор экрана остатков и его видимые колонки. Имена полей повторяют
 * параметры GET /api/v1/stock/report/stocks: файл обязан содержать то
 * же, что видел человек, и одно имя на два входа защищает от
 * расхождения. Отличается только перенос: список складов идёт массивом,
 * а не строкой через запятую, и дополнительные поля — объектом вместо
 * параметров cf.*.
 * Колонки берутся из перечня; неизвестная колонка — 400, а не молча
 * пропущенная. Опознавательные колонки (бизнес, юрлицо, склад и зона с
 * кодами, товар, SKU, единица) пишутся всегда, и порядок колонок в файле
 * повторяет экран.
 * Выборка обходится постранично целиком; слишком широкая отклоняется
 * как 400 — книга собирается в памяти, и потолок общий с загрузкой.
 */
export interface StockReportExportRequest {
  "mode"?: "products" | "warehouses" | "companies";
  "q"?: string;
  "as_of"?: string;
  "business_id"?: UUID;
  "company_id"?: UUID;
  "warehouse_id"?: UUID;
  "warehouse_ids"?: Array<UUID>;
  "product_id"?: UUID;
  "custom_fields"?: { [key: string]: string };
  "without_company"?: boolean;
  "rollup_zones"?: boolean;
  "below_minimum"?: boolean;
  "with_reserve"?: boolean;
  "include_empty"?: boolean;
  "sort"?: "name" | "on_hand" | "reserved" | "available" | "expected" | "forecast" | "minimum" | "suggested" | "unit_cost" | "amount";
  "direction"?: "asc" | "desc";
  "columns"?: Array<"on_hand" | "reserved" | "available" | "expected" | "forecast" | "minimum" | "suggested" | "unit_cost" | "amount">;
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
  "totals": StockReportTotals;
  /** Суммы по складам всей выборки, без постраничного окна */
  "warehouse_totals": Array<StockReportWarehouseTotal>;
  "formula": "available = on_hand - reserved; forecast = available + expected";
}

export interface StockReportPurchasingPage {
  /** Общее число строк отбора, а не длина страницы: усечение по limit на нём видно. */
  "count": number;
  "limit": number;
  "offset": number;
  "results": Array<StockReportPurchasingRow>;
  "formula": "projected = on_hand - reserved + expected; suggested = max(demand, rule_shortage)";
}

export interface StockReportPurchasingRow {
  /** Бизнес строки — учётная единица закупки */
  "business_id": { [key: string]: unknown };
  "business_name": string;
  /** Юрлицо строки — разрез официального контура. У неофициальной потребности его нет, и тогда поле пустое; правило пополнения такой строке не подбирается, потому что ключуется юрлицом (ERP-704). */
  "company_id": UUID | null;
  "company_name": string;
  "warehouse_id": UUID | null;
  "warehouse_code": string;
  "warehouse_name": string;
  /** Склад над зоной (дочерним складом); у склада верхнего уровня пусто. Витрина пишет «склад · зона» (ERP-1522). */
  "warehouse_parent_name": string;
  "product_id": UUID;
  "product_sku": string;
  "product_name": string;
  "unit": string;
  /** Decimal string. Закупочная цена карточки — умолчание цены строки закупки из витрины (ERP-1522); ноль — цены в карточке нет. */
  "purchase_price": string;
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
  /** Decimal string. Максимум из незаказанной потребности и дефицита по правилу пополнения; дефицит считается тем же ядром, что и suggested в /stock/report/stocks. */
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
  /** Decimal string в базовой единице товара. Часть остатка строки, не покрытая остатком склада: обещание ждёт поступления. Сумма по строкам равна unbacked_qty резерва; без товара остаются самые новые обещания */
  "unbacked_qty": string;
  /** Действующий состав товара строки; null, если действующего состава у товара нет. Сам резерв состав не использует */
  "active_spec": StockReportReservationLineSpec | null;
}

/** Действующая версия состава изделия у товара строки резерва. */
export interface StockReportReservationLineSpec {
  "version_id": UUID;
  "spec_id": UUID;
  "version": number;
  "name": string;
  "kind": "assembly" | "production";
  /** Decimal string. Сколько изделия даёт один состав, в базовой единице товара */
  "output_qty": string;
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
  /** Часть остатка резерва, не покрытая остатком склада: списание товар забрало, обещание ждёт поступления. Без товара остаются самые новые обещания */
  "unbacked_qty": string;
  "state": "active" | "partially_shipped" | "fulfilled" | "released";
  "is_overdue": boolean;
  "lines": Array<StockReportReservationLine>;
}

export interface StockReportRow {
  /** Измерения, которыми строка опознаётся. Режим сворачивает часть из них, и тогда пустое поле значит «много значений», а не «значения нет»: в «по товарам» юрлица у строки нет потому, что она накрывает их все, а в «по складам» — потому, что остаток неофициальный. По значению эти случаи неразличимы, поэтому разбор строки собирается по этому полю, а не по её пустотам. */
  "scope": Array<"business" | "company" | "warehouse">;
  /** Бизнес остатка — учётная единица строки */
  "business_id": { [key: string]: unknown };
  "business_name": string;
  /** Юрлицо остатка — разрез официального контура. У неофициального товара его нет, и тогда поле пустое (ERP-704). */
  "company_id": UUID | null;
  "company_name": string;
  /** Склад строки. Пусто в режимах, где он свёрнут: «по товарам» и «по юрлицам» его в разрезе нет вовсе, и нулевой идентификатор соврал бы — это значение конкретного склада. */
  "warehouse_id": UUID | null;
  "warehouse_code": string;
  "warehouse_name": string;
  "product_id": UUID;
  "product_sku": string;
  "product_name": string;
  /** Категория товара — заголовок группы строк, а не измерение разреза: в scope её нет, по ней ничего не сворачивается и не суммируется. Пусто, если категория у карточки не задана. */
  "category_id": UUID | null;
  "category_name": string;
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
  /** Decimal string. В свёрнутых режимах — сумма минимумов разрезов «юрлицо × склад», из которых сложена строка. */
  "minimum": string;
  /** Decimal string. Только правило пополнения: ноль, пока прогноз не ниже минимума или правила нет, иначе добор до максимума с округлением вверх по кратности. Нехватка считается в разрезе «юрлицо × склад» (со свёрткой зон) против прогноза того же разреза; свёрнутая строка products, companies и matrix складывает нехватки своих разрезов, и остаток без правила, остаток без юрлица и излишек другого разреза её не гасят — итог одинаков во всех режимах. Незаказанная потребность сюда не входит — она есть только в /stock/report/purchasing. */
  "suggested": string;
  /** Decimal string */
  "amount": string;
  /** Decimal string. Пусто в режимах matrix и products без company_id и without_company: строка складывает партии разных владельцев, и среднее по ним не лежит ни на одном складе. Сортировка по unit_cost там идёт по имени. */
  "unit_cost": string;
  "entry_count": number;
}

/** Итог по всей выборке отчёта, а не по странице. Количества, включая минимум, имеют смысл только при одной единице измерения на всю выборку — её называет поле unit. Себестоимости единицы здесь нет вовсе: сумма средних цен не значит ничего ни при какой однородности. */
export interface StockReportTotals {
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
  /** Decimal string. Деньги аддитивны всегда и от единицы измерения не зависят */
  "amount": string;
  /** Единица измерения итога, если она одна на всю выборку. Пусто, когда единицы разные: складывать штуки с килограммами нельзя, и потребитель обязан показать прочерк вместо суммы. */
  "unit": string;
}

/** Сумма по складу под тем же отбором, что и страница отчёта. Дерево складов показывает эти числа рядом с именами узлов; считать их отдельным запросом нельзя — он не знал бы про отборы экрана и расходился бы с таблицей. */
export interface StockReportWarehouseTotal {
  "warehouse_id": UUID;
  /** Decimal string */
  "on_hand": string;
  /** Decimal string */
  "amount": string;
}

/** Разобранный код GS1 — код маркировки или логистическая этикетка. У обычного штрихкода блока нет. Поля, которых в коде не было, пусты. Блок криптохвост маркировки не несёт; поле barcode — сохранённое значение идентификатора как есть. */
export interface StockScanGS1 {
  /** GTIN из кода — четырнадцать цифр */
  "gtin": string;
  /** Серийный номер экземпляра */
  "serial": string;
  /** Код идентификации экземпляра — 01, GTIN, 21 и серийный номер, без криптохвоста */
  "identification_code": string;
  /** Партия производителя */
  "batch": string;
  /** Срок годности из кода датой ГГГГ-ММ-ДД; пусто — срока в коде нет */
  "expires_on": string;
  /** Код транспортной упаковки — восемнадцать цифр */
  "sscc": string;
  /** Код считан вместе с криптохвостом маркировки */
  "has_crypto_tail": boolean;
}

/** Действующая группа маркировки найденного товара — своя или от категории. Поле про товар, а не про код: оно есть и у обычного штрихкода. У товара, который не маркируется, поля нет. */
export interface StockScanMarkingGroup {
  /** Идентификатор группы маркировки */
  "id": { [key: string]: unknown };
  /** Название группы маркировки */
  "name": string;
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
  "gs1"?: StockScanGS1;
  "marking_group"?: StockScanMarkingGroup;
}

export interface StockSettings {
  /** Запрещать отгрузку сверх свободного остатка */
  "block_shipment_over_free": boolean;
  /** Запрещать резерв сверх доступного остатка */
  "block_reservation_over_available": boolean;
  /** Снимать просроченные резервы автоматически */
  "auto_cancel_expired_reservations": boolean;
  /** Перемещение зарезервированного: везти резерв на склад-получатель вместо отказа */
  "transfer_carries_reservation": boolean;
  /** Кабинет работает с заявками на закупку (ERP-1523). Выключено — новая заявка не заводится, открытые учитываются до закрытия. Пока владелец не выбирал, следует факту: включено, если заявки в кабинете уже заводили */
  "purchase_requests_enabled": boolean;
  "default_reservation_days": number;
  "updated_at": string;
}

export interface StockSettingsPatch {
  "block_shipment_over_free"?: boolean;
  "block_reservation_over_available"?: boolean;
  "auto_cancel_expired_reservations"?: boolean;
  "transfer_carries_reservation"?: boolean;
  "purchase_requests_enabled"?: boolean;
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

/** Итог завершения сессии склада: сессия и заведённый прогон импорта. */
export interface StockUploadFinishResult {
  "session": TransferSession;
  "import"?: StockImportRun;
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
  /** Внутри склада работают зоны — приход разрешён только в подчинённую зону */
  "zones_enabled": boolean;
  /** На самом зональном складе ещё лежит остаток, оставшийся с момента включения зон */
  "needs_allocation": boolean;
  /** documents — приход обычными складскими документами; external_receipt — склад внешней стороны: приход даёт только её приёмка, поступление и входящее перемещение запрещены */
  "inbound_mode": "documents" | "external_receipt";
  /** Бизнес склада: по нему склад и его данные сужаются областью доступа участника. null — общий склад: юрлица из нескольких бизнесов либо склад всего кабинета (например, склад площадки) */
  "business_id": UUID | null;
  /** Пустой список означает доступность склада всем активным юрлицам кабинета */
  "company_ids": Array<UUID>;
  "created_at": string;
  "updated_at": string;
}

export interface StockWarehouseInput {
  /** Приводится к верхнему регистру */
  "code": string;
  "name": string;
  "parent_id"?: UUID | null;
  "address"?: { [key: string]: unknown };
  "responsible_employee_id"?: UUID | null;
  "sort_order"?: number;
  /** Бизнес склада. Пусто — выводится: у зоны от родителя, у склада с юрлицами одного бизнеса — их бизнес, в кабинете с одним бизнесом — он; юрлица нескольких бизнесов дают общий склад. Юрлица склада обязаны принадлежать названному бизнесу */
  "business_id"?: UUID | null;
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
  /** Бизнес склада; null — вывести заново из родителя и юрлиц. Править склад можно только в бизнесе, доступном целиком; общий склад — только при доступе ко всем бизнесам */
  "business_id"?: UUID | null;
  "company_ids"?: Array<UUID>;
}

export interface StockWarehouseZoneInput {
  /** Название зоны; код зоны присваивает сервер */
  "name": string;
}

export interface StockZoneAllocation {
  "warehouse_id": UUID;
  "zones_enabled": boolean;
  "direction": "to_zones" | "to_warehouse";
  "zones": Array<StockWarehouse>;
  "rows": Array<StockZoneStockRow>;
  /** Незавершённая матрица разнесения; у обратного переноса всегда null, потому что выключение атомарно */
  "draft"?: StockZoneAllocationInput | null;
}

export interface StockZoneAllocationInput {
  /** Пусто — бизнес-дата кабинета */
  "date"?: string;
  "lines": Array<StockZoneAllocationLine>;
}

/** Клетка матрицы. Для остатка без юрлица business_id обязателен; для остатка юрлица сервер выводит бизнес из юрлица, если он не передан. */
export interface StockZoneAllocationLine {
  "business_id"?: UUID;
  /** Пусто или null — остаток без юрлица */
  "company_id"?: UUID | null;
  "product_id": UUID;
  "zone_id": UUID;
  "quantity": string;
}

export interface StockZoneAllocationResult {
  "warehouse": StockWarehouse;
  /** Проведённые перемещения — по одному на сочетание «бизнес, юрлицо или его отсутствие, зона» */
  "documents": Array<CoreDocument>;
  /** Остаток, который после разнесения всё ещё ждёт на складе */
  "remaining": Array<StockZoneStockRow>;
}

/** Строка остатка склада или зоны. Ключ строки — бизнес и необязательное юрлицо; остаток без юрлица приходит отдельной строкой на каждый бизнес. */
export interface StockZoneStockRow {
  "warehouse_id": UUID;
  "business_id": UUID;
  /** null — остаток без юрлица */
  "company_id": UUID | null;
  "product_id": UUID;
  /** Точное decimal-количество строкой */
  "quantity": string;
}

export interface Subtask {
  "id": UUID;
  "identifier": string;
  "title": string;
  "status_category": string | null;
  "executor": number | null;
  "executor_name": string | null;
  "due_at": string | null;
}

/** Номер и дата документа поставщика (ERP-484, подшаг 5.3): по ним входящий НДС сверяется с книгой покупок. Оба поля необязательны */
export interface SupplierDocument {
  "number"?: string;
  "date"?: string;
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
  "milestone": UUID | null;
  "milestone_name": string | null;
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
  /** Пунктов во всех чек-листах задачи (ERP-1488); есть и в компактной строке списка. */
  "checklist_total": number;
  /** Отмеченных пунктов во всех чек-листах задачи. */
  "checklist_done": number;
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
  /** Веха: UUID или имя этапа своего проекта задач */
  "milestone"?: string;
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
  /** Веха: UUID или имя этапа; пустая строка снимает задачу с вехи */
  "milestone"?: string;
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

export interface TeamFlowTotals {
  "taken": number;
  "handed": number;
  "closed": number;
}

export interface TeamMemberMetrics {
  "user": number;
  "name": string;
  "taken": number;
  "handed": number;
  "closed": number;
  "done_of_taken": number;
  "handed_with_due": number;
  "handed_on_time": number;
  "efficiency": number | null;
  "in_work": number;
  "review": number;
  "review_oldest_seconds": number;
  "overdue": number;
  "overdue_in_review": number;
  "backlog": number;
  "cycle_median_seconds": number;
  "rework_percent": number;
  "buckets": Array<TeamMetricsBucket>;
}

export interface TeamMetrics {
  "project": UUID;
  "period": "week" | "month" | "quarter" | "all";
  "window_from": string;
  "window_to": string;
  "bucket_days": number;
  "taken": number;
  "handed": number;
  "closed": number;
  "previous": TeamFlowTotals | null;
  "review": number;
  "review_median_seconds": number;
  "review_stale": number;
  "overdue": number;
  "backlog": number;
  "in_work": number;
  "cycle_median_seconds": number;
  "buckets": Array<TeamMetricsBucket>;
  "members": Array<TeamMemberMetrics>;
  "unassigned": TeamMetricsUnassigned;
}

export interface TeamMetricsUnassigned {
  "open": number;
  "overdue": number;
}

export interface TeamMetricsBucket {
  "start": string;
  "taken": number;
  "handed": number;
  "handed_late": number;
  "closed": number;
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

/** Временный адрес файла: подписанный адрес хранилища или адрес этого API. */
export interface TransferDownloadLink {
  "url": string;
  "method": "GET";
  /** true — подписанный адрес хранилища, без заголовка авторизации; false — адрес этого API, с авторизацией */
  "direct": boolean;
  /** true — адрес требует токен API, агенту по MCP он недоступен */
  "requires_authorization": boolean;
  /** Срок подписанного адреса; у адреса API его нет */
  "expires_at"?: string;
  "name": string;
  "mime_type": string;
  "size_bytes": number;
  /** Вердикт антивируса; skipped — файл антивирус не проверял */
  "scan_status"?: "clean" | "skipped";
  /** Что стало с просьбой о факсимиле у печатной формы */
  "facsimile"?: "applied" | "not_allowed";
}

/** Как передать байты. Выдаётся один раз, при открытии сессии. */
export interface TransferInstructions {
  /** post — один multipart POST; parts — PUT каждой части; api — PUT через этот API с авторизацией */
  "mode": "post" | "parts" | "api";
  "url"?: string;
  "method"?: string;
  /** Поля формы для POST; файл идёт после них последним полем */
  "fields"?: { [key: string]: string };
  /** Имя поля формы для файла */
  "file_field"?: string;
  "headers"?: { [key: string]: string };
  "part_bytes"?: number;
  "part_count"?: number;
  /** Подписанный адрес каждой части по её номеру, начиная с 1 */
  "direct_urls"?: { [key: string]: string };
  /** true — адрес требует токен API, агенту по MCP этот путь недоступен */
  "requires_authorization": boolean;
  "max_bytes": number;
  "expires_at": string;
}

/** Сессия загрузки файла по подписанному адресу хранилища. Ключи хранилища наружу не отдаются. */
export interface TransferSession {
  "id": UUID;
  "owner_type": string;
  "owner_id"?: string;
  "name": string;
  "mime_type": string;
  "size_bytes": number;
  "sha256"?: string;
  "attributes"?: { [key: string]: string };
  "status": "pending" | "processing" | "attached" | "failed" | "expired";
  "failure"?: "infected" | "size" | "checksum" | "storage" | "owner" | "aborted" | "expired";
  "failure_detail"?: string;
  "scan_status"?: "pending" | "clean" | "infected" | "skipped";
  "scan_verdict"?: string;
  /** Номер строки, заведённой по файлу; у почты — id загрузки для upload_ids */
  "published_ref"?: string;
  "expires_at": string;
  "created_at": string;
  "completed_at"?: string;
  "upload"?: TransferInstructions;
}

/** Заявка на сессию загрузки файла по подписанному адресу. */
export interface TransferUploadRequest {
  /** Имя файла с расширением */
  "name": string;
  /** Тип содержимого; по умолчанию application/octet-stream */
  "mime_type"?: string;
  /** Точный размер файла в байтах */
  "size_bytes": number;
  /** Необязательная контрольная сумма SHA-256 строчными шестнадцатеричными знаками */
  "sha256"?: string;
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

export interface AppDocflowRecordSalePaymentRequest {
  "provider": string;
  "external_id": string;
  "kind"?: "payment" | "refund";
  "amount": string;
  "currency"?: string;
  "paid_at"?: string;
}

export interface AssistantListDigestsResponse {
  "items": Array<AssistantDigest>;
}

export interface AssistantReplaceDigestRequest {
  "name": string;
  "metric_ids": Array<string>;
  "company"?: UUID;
  "project"?: UUID;
  "period": "this_month" | "previous_month" | "last_30_days";
  "schedule_hour": number;
  "schedule_minute": number;
  "timezone": string;
  "weekdays_only": boolean;
  "locale": "ru-RU" | "en-US";
  "enabled": boolean;
  "version": number;
}

export interface AutomationRulesResponse {
  "rules": Array<AutomationRuleDocument>;
}

export interface AutomationRuleSimulateResponse {
  "result": AutomationRuleSimulation;
  "problem"?: AutomationRuleProblem;
}

export interface AutomationRuleTestResponse {
  "result": AutomationRuleTestResult;
  "problem"?: AutomationRuleProblem;
}

export interface BankRepostTransactionsRequest {
  "ids": Array<UUID>;
  "confirm_release"?: boolean;
}

export interface BankRepostTransactionRequest {
  "confirm_release"?: boolean;
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

export interface DashboardListMetricsResponse {
  "count": number;
  "results": Array<DashboardMetricDefinition>;
}

export interface DocflowFlowContactStatsResponse {
  "items": Array<DocflowFlowContactStatsResponseItemsItem>;
}

export interface DocflowFlowContactStatsResponseItemsItem {
  "contact_id": UUID;
  "documents": number;
  /** Дата последнего документа, YYYY-MM-DD; пусто — без даты */
  "last_date": string;
}

export interface DocflowFlowDocumentRevisionsResponse {
  "items": Array<DocflowFlowDocumentRevisionsResponseItemsItem>;
}

export interface DocflowFlowDocumentRevisionsResponseItemsItem {
  "version": number;
  "created_at": string;
  "author_id": number;
  "author_name"?: string;
  "status": "draft" | "registered" | "archived";
  "files": number;
  "has_approval": boolean;
  /** Причина системной ревизии: schedule:<вид бумаги>:<registered|cancelled>:<номер>:<дата> — график договора пересчитан по допсоглашению или спецификации */
  "reason"?: string;
  /** Ревизию записала система, а не человек правкой карточки */
  "system"?: boolean;
}

export interface FilesContentLinkResponse {
  "url": string;
  /** true — адрес ведёт прямо в хранилище; false — на этот API, с заголовком авторизации */
  "direct": boolean;
  "expires_at"?: string;
  "name": string;
  "mime_type": string;
  "size_bytes"?: number;
  "version_id"?: UUID;
  /** Номер версии, содержимое которой адресуется */
  "version_no"?: number;
}

export interface FilesListVersionsResponse {
  "versions": Array<FilesVersion>;
}

export interface FilesListRootsResponse {
  "roots": Array<FilesFolder>;
}

export interface FilesSearchResponse {
  "results": Array<FilesSearchHit>;
}

export interface FilesCreateShortcutRequest {
  "folder_id": UUID;
  "name": string;
  "url": string;
}

export interface FilesVersionContentLinkResponse {
  "url": string;
  /** true — адрес ведёт прямо в хранилище; false — на этот API, с заголовком авторизации */
  "direct": boolean;
  "expires_at"?: string;
  "name": string;
  "mime_type": string;
  "size_bytes"?: number;
  "version_id": UUID;
  "version_no": number;
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

export interface FinanceListAllocationRulesResponse {
  "results"?: Array<FinanceAllocationRule>;
}

export interface FinanceRelinkPaymentRequest {
  "from_order"?: UUID;
  "to_order"?: UUID;
  "to_contract"?: UUID;
  "amount"?: string;
  "preview"?: boolean;
  "detach"?: boolean;
  "confirm_release"?: boolean;
}

export interface FinanceRepostTransactionsRequest {
  "ids": Array<UUID>;
  "confirm_release"?: boolean;
}

export interface FinanceMarkTransactionDeletedRequest {
  /** Согласие снять аванс и зачёты операции */
  "confirm_release"?: boolean;
}

export interface FinanceRepostTransactionRequest {
  "confirm_release"?: boolean;
}

export interface MailListAccountsResponse {
  "items": Array<MailAccount>;
}

export interface MailListFoldersResponse {
  "items": Array<MailFolder>;
}

export interface MailComposeMessageResponse {
  "message": MailMessage;
  "outbound": MailOutbound;
}

export interface MailListRulesResponse {
  "items": Array<MailRule>;
}

export interface MailApplyRulesRequest {
  /** Папка разбора; без неё разбираются «Входящие» */
  "folder_id"?: UUID | null;
  /** Сколько писем взять в разбор; ноль и меньше означает умолчание */
  "limit"?: number;
}

export interface MailApplyRulesResponse {
  "items": Array<MailRuleOutcome>;
  /** Сколько писем правила разобрали */
  "applied": number;
}

export interface MailAttachStoredFileRequest {
  /** Файл в хранилище кабинета */
  "file_id": string;
}

export interface MailReadBatchRequest {
  "ids"?: Array<UUID>;
  "folder_id"?: UUID;
  "read"?: boolean;
}

export interface MailReadBatchResponse {
  "updated": number;
}

export interface MailListMessageAttachmentsResponse {
  "items": Array<MailAttachment>;
}

export interface MailFlagMessageRequest {
  /** Значение false снимает отметку важности */
  "flagged"?: boolean;
}

export interface MailMoveMessageRequest {
  "folder_id": UUID;
}

export interface MailListPeopleResponse {
  "items": Array<MailPerson>;
}

export interface MailListProvidersResponse {
  "items": Array<MailProvider>;
  "suggestion"?: MailProvider;
}

export interface MailListVIPSendersResponse {
  "items": Array<MailListVIPSendersResponseItemsItem>;
}

export interface MailListVIPSendersResponseItemsItem {
  "address": string;
}

export interface MailSetVIPSenderRequest {
  "address": string;
  "important"?: boolean;
}

export interface MailCountVIPUnreadResponse {
  "unread": number;
}

export interface MarkingSpoilOrderCodesResponse {
  /** У скольких кодов отметка изменилась */
  "changed": number;
}

export interface StockListDocumentAuthorsResponse {
  "count": number;
  "results": Array<StockListDocumentAuthorsResponseResultsItem>;
}

export interface StockListDocumentAuthorsResponseResultsItem {
  "id": number;
  "name": string;
}
