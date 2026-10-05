/*
 * Сгенерировано scripts/generate.py. Руками не править.
 * Источник: snapshot/openapi/akeda-v1.json (контракт 0.21.0-core-public, sha256 190b6c5ee47d0286df0d3c66a3834efe2694b28ed4d024c02814ae9e01e24e51).
 * Рантайм клиента написан руками и живёт рядом; здесь только типы.
 */

import type * as models from "./models.js";

/** Форма одной операции контракта: то, чем её зовёт рантайм. */
export interface OperationSpec {
  readonly method: string;
  readonly path: string;
  readonly module: string;
  readonly stage: string;
  readonly permission: string;
  /** Операция читает заголовок Idempotency-Key. */
  readonly idempotent: boolean;
  /** Операция открыта токену установки (ai_live_… / ai_test_…). */
  readonly installation: boolean;
  /** Схема листания: limit_offset | limit | page | cursor | none. */
  readonly pagination: string;
  /** Объявленный контрактом потолок размера страницы. */
  readonly pageSizeMax: number | null;
  /** Объявленное контрактом умолчание размера страницы. */
  readonly pageSizeDefault: number | null;
}

/** Типы запроса и ответа каждой операции. Ключ — operationId контракта. */
export interface OperationTypes {
  /** POST /api/v1/app/docflow/sales/{id}/cancel — Отменить продажу, загруженный этим приложением */
  appDocflowCancelSale: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowSalesOrder;
  };
  /** GET /api/v1/app/docflow/sales/lookup — Найти свою продажу по внешнему номеру */
  appDocflowFindSaleByExternalID: {
    params: Record<string, never>;
    query: { "external_id": string };
    body: never;
    response: models.DocflowSalesOrder;
  };
  /** GET /api/v1/app/docflow/sales/{id} — Получить продажу, загруженный этим приложением */
  appDocflowGetSale: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowSalesOrder;
  };
  /** POST /api/v1/app/docflow/sales/import — Загрузить продажу от имени установки */
  appDocflowImportSale: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocflowAppSalesOrderInput;
    response: models.DocflowSalesOrder;
  };
  /** POST /api/v1/app/docflow/sales/{id}/act — Выпустить акт по своей продаже приложения */
  appDocflowIssueSaleAct: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowOrderActInput;
    response: models.DocflowFlowDocument;
  };
  /** POST /api/v1/app/docflow/sales/{id}/invoice — Выставить счёт по своей продаже приложения */
  appDocflowIssueSaleInvoice: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowOrderInvoiceInput;
    response: models.DocflowFlowDocument;
  };
  /** POST /api/v1/app/docflow/sales/{id}/upd — Выпустить УПД и исполнить свою продажу приложения */
  appDocflowIssueSaleUPD: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowOrderActInput;
    response: models.DocflowFlowDocument;
  };
  /** GET /api/v1/app/docflow/sale-imports — Прочитать журнал загрузок продаж этого приложения */
  appDocflowListSaleImports: {
    params: Record<string, never>;
    query: { "limit"?: number };
    body: never;
    response: models.DocflowOrderImportPage;
  };
  /** GET /api/v1/app/docflow/sales/{saleId}/invoices/{documentId}/print — Получить печатную форму своего счёта по продаже */
  appDocflowPrintSaleInvoice: {
    params: { "documentId": models.UUID; "saleId": models.UUID };
    query: { "facsimile"?: boolean; "format"?: "html" | "pdf" };
    body: never;
    response: void;
  };
  /** GET /api/v1/app/docflow/sales/{saleId}/upds/{documentId}/print — Получить визуальную печатную форму УПД своей продажи */
  appDocflowPrintSaleUPD: {
    params: { "documentId": models.UUID; "saleId": models.UUID };
    query: { "format"?: "html" | "pdf" };
    body: never;
    response: void;
  };
  /** POST /api/v1/app/docflow/sales/{id}/payments — Подтвердить эквайринг по продаже приложения (устаревший путь) */
  appDocflowRecordSalePayment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.AppDocflowRecordSalePaymentRequest;
    response: models.DocflowSalesOrder;
  };
  /** POST /api/v1/app/docflow/sales/{id}/status — Сменить состояние продажи, загруженного этим приложением */
  appDocflowSetSaleStatus: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowSalesOrderStatusInput;
    response: models.DocflowSalesOrder;
  };
  /** POST /api/v1/app/finance/operations/{id}/cancel — Отменить операцию от имени установки */
  appFinanceCancelOperation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceOperationAction;
    response: models.FinanceOperation;
  };
  /** POST /api/v1/app/finance/operations — Завести продажу или закупку от имени установки */
  appFinanceCreateOperation: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceOperationCreate;
    response: models.FinanceOperation;
  };
  /** POST /api/v1/app/finance/operations/{id}/accruals — Провести начисление по плану от имени установки */
  appFinanceCreateOperationAccrual: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceOperationAccrualCreate;
    response: models.FinanceOperationAccrualResult;
  };
  /** GET /api/v1/app/finance/operations/{id} — Получить операцию от имени установки */
  appFinanceGetOperation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceOperation;
  };
  /** POST /api/v1/app/finance/acquiring/captures — Записать подтверждённое списание карты по продаже приложения */
  appFinanceRecordAcquiringCapture: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceAcquiringCaptureInput;
    response: models.FinanceAcquiringCaptureResult;
  };
  /** POST /api/v1/app/finance/transactions/{id}/classification-suggestions — Предложить классификацию финансовой операции */
  appFinanceSuggestTransactionClassification: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.AppFinanceClassificationSuggestionInput;
    response: models.AppFinanceClassificationSuggestionAccepted;
  };
  /** DELETE /api/v1/app/reference/{key}/items/{code} — Погасить запись собственного справочника приложения */
  appReferenceDeactivateItem: {
    params: { "code": string; "key": string };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/app/reference/{key}/items — Прочитать записи собственного справочника приложения */
  appReferenceItems: {
    params: { "key": string };
    query: { "limit"?: number; "offset"?: number; "q"?: string };
    body: never;
    response: models.AppReferenceItemPage;
  };
  /** PUT /api/v1/app/reference/{key}/items — Записать пачку записей в собственный справочник приложения */
  appReferenceUpsertItems: {
    params: { "key": string };
    query: Record<string, never>;
    body: models.AppReferenceUpsertInput;
    response: models.AppReferenceUpsertResult;
  };
  /** GET /api/v1/app/config — Прочитать собственную настройку установки */
  appRuntimeConfig: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.AppRuntimeConfig;
  };
  /** GET /api/v1/app/installation — Прочитать собственную установку приложения */
  appRuntimeInstallation: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.AppRuntimeInstallation;
  };
  /** POST /api/v1/app/config/{key}/lease — Получить краткосрочную выдачу секрета настройки */
  appRuntimeLeaseSecret: {
    params: { "key": string };
    query: Record<string, never>;
    body: models.AppRuntimeLeaseInput;
    response: models.AppRuntimeLease;
  };
  /** POST /api/v1/app/slot-launch — Погасить одноразовый токен запуска слота интерфейса */
  appRuntimeRedeemSlotLaunch: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.AppRuntimeSlotLaunchInput;
    response: models.AppRuntimeSlotLaunch;
  };
  /** POST /api/v1/assistant/digests — Подписаться на личную сводку */
  assistantCreateDigest: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.AssistantDigestInput;
    response: models.AssistantDigest;
  };
  /** GET /api/v1/assistant/digests — Получить свои подписки на сводки */
  assistantListDigests: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.AssistantListDigestsResponse;
  };
  /** PUT /api/v1/assistant/digests/{id} — Изменить или отключить свою сводку */
  assistantReplaceDigest: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.AssistantReplaceDigestRequest;
    response: models.AssistantDigest;
  };
  /** GET /api/v1/automation/manifest — Получить манифест возможностей автоматизаций */
  automationManifest: {
    params: Record<string, never>;
    query: { "detail"?: "full" | "brief"; "locale"?: "ru" | "en" };
    body: never;
    response: models.AutomationManifest;
  };
  /** POST /api/v1/automation/rules/simulate — Прогнать правило автоматизации на истории кабинета */
  automationRuleSimulate: {
    params: Record<string, never>;
    query: { "locale"?: "ru" | "en" };
    body: models.AutomationRuleSimulateRequest;
    response: models.AutomationRuleSimulateResponse;
  };
  /** POST /api/v1/automation/rules/test — Проверить правило автоматизации на настоящем факте */
  automationRuleTest: {
    params: Record<string, never>;
    query: { "locale"?: "ru" | "en" };
    body: models.AutomationRuleTestRequest;
    response: models.AutomationRuleTestResponse;
  };
  /** GET /api/v1/automation/rules — Получить правила автоматизаций кабинета */
  automationRules: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.AutomationRulesResponse;
  };
  /** POST /api/v1/bank/transactions/{id}/mark-deleted — Пометить банковскую операцию на удаление (исторический адрес) */
  bankMarkTransactionDeleted: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** POST /api/v1/bank/transactions/{id}/repost — Перепровести банковскую операцию (исторический адрес) */
  bankRepostTransaction: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.BankRepostTransactionRequest;
    response: { [key: string]: unknown };
  };
  /** POST /api/v1/bank/transactions/repost — Перепровести выбранные банковские операции (исторический адрес) */
  bankRepostTransactions: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.BankRepostTransactionsRequest;
    response: { [key: string]: unknown };
  };
  /** POST /api/v1/bank/transactions/{id}/restore — Вернуть удалённую банковскую операцию (исторический адрес) */
  bankRestoreTransaction: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceTransactionRestoreResult;
  };
  /** POST /api/v1/calendar/availability — Создать правило рабочего времени */
  calendarCreateAvailability: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CalendarAvailabilityCreate;
    response: models.CalendarAvailabilityEnvelope;
  };
  /** POST /api/v1/calendar/booking-links — Создать ссылку самозаписи */
  calendarCreateBookingLink: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CalendarBookingLinkCreate;
    response: models.CalendarBookingLinkEnvelope;
  };
  /** POST /api/v1/calendar/connectors — Подключить CalDAV, iCloud или Яндекс.Календарь */
  calendarCreateConnector: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CalendarConnectorCreate;
    response: models.CalendarConnectorEnvelope;
  };
  /** POST /api/v1/calendar/events — Создать событие */
  calendarCreateEvent: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CalendarEventCreate;
    response: models.CalendarEventEnvelope;
  };
  /** DELETE /api/v1/calendar/availability/{id} — Удалить правило рабочего времени */
  calendarDeleteAvailability: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.OK;
  };
  /** DELETE /api/v1/calendar/booking-links/{id} — Архивировать ссылку самозаписи */
  calendarDeleteBookingLink: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.OK;
  };
  /** DELETE /api/v1/calendar/connectors/{id} — Удалить личное подключение внешнего календаря */
  calendarDeleteConnector: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.OK;
  };
  /** DELETE /api/v1/calendar/events/{id} — Отменить событие или одно вхождение серии */
  calendarDeleteEvent: {
    params: { "id": models.UUID };
    query: { "occurrence"?: string };
    body: never;
    response: models.OK;
  };
  /** GET /api/v1/calendar/booking-links/{id}/slots — Получить свободные слоты своей ссылки */
  calendarGetBookingLinkSlots: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CalendarSlotPage;
  };
  /** GET /api/v1/calendar/busy — Получить занятые интервалы пользователей */
  calendarGetBusy: {
    params: Record<string, never>;
    query: { "end": string; "exclude_event"?: string; "start": string; "users"?: string };
    body: never;
    response: models.CalendarBusyPage;
  };
  /** GET /api/v1/calendar/events/{id} — Получить событие */
  calendarGetEvent: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CalendarEventEnvelope;
  };
  /** GET /api/v1/calendar/settings — Получить личные настройки календаря */
  calendarGetSettings: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CalendarSettingsEnvelope;
  };
  /** GET /api/v1/calendar/availability — Получить правила рабочего времени */
  calendarListAvailability: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CalendarAvailabilityPage;
  };
  /** GET /api/v1/calendar/booking-links — Получить ссылки самозаписи текущего пользователя */
  calendarListBookingLinks: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CalendarBookingLinkPage;
  };
  /** GET /api/v1/calendar/connectors — Получить личные подключения внешних календарей */
  calendarListConnectors: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CalendarConnectorPage;
  };
  /** GET /api/v1/calendar/events — Получить события в диапазоне */
  calendarListEvents: {
    params: Record<string, never>;
    query: { "end": string; "owner"?: number; "q"?: string; "start": string; "user"?: number };
    body: never;
    response: models.CalendarEventPage;
  };
  /** GET /api/v1/calendar/invitations — Получить приглашения, ожидающие ответа */
  calendarListInvitations: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CalendarInvitationPage;
  };
  /** GET /api/v1/calendar/members — Получить доступных участников кабинета */
  calendarListMembers: {
    params: Record<string, never>;
    query: { "limit"?: number; "q"?: string };
    body: never;
    response: models.CalendarMemberDirectory;
  };
  /** PUT /api/v1/calendar/settings — Заменить личные настройки календаря */
  calendarPutSettings: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CalendarSettingsEnvelope;
    response: models.CalendarSettingsEnvelope;
  };
  /** POST /api/v1/calendar/events/{id}/response — Ответить на приглашение */
  calendarRespondToEvent: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CalendarEventResponseInput;
    response: models.CalendarEventEnvelope;
  };
  /** POST /api/v1/calendar/connectors/{id}/sync — Запустить ручную синхронизацию коннектора */
  calendarSyncConnector: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CalendarConnectorSyncInput;
    response: models.CalendarSyncResult;
  };
  /** PATCH /api/v1/calendar/availability/{id} — Частично изменить правило рабочего времени */
  calendarUpdateAvailability: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CalendarAvailabilityPatch;
    response: models.CalendarAvailabilityEnvelope;
  };
  /** PATCH /api/v1/calendar/booking-links/{id} — Частично изменить ссылку самозаписи */
  calendarUpdateBookingLink: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CalendarBookingLinkPatch;
    response: models.CalendarBookingLinkEnvelope;
  };
  /** PATCH /api/v1/calendar/connectors/{id} — Изменить личное подключение внешнего календаря */
  calendarUpdateConnector: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CalendarConnectorPatch;
    response: models.CalendarConnectorEnvelope;
  };
  /** PATCH /api/v1/calendar/events/{id} — Частично изменить событие или одно вхождение серии */
  calendarUpdateEvent: {
    params: { "id": models.UUID };
    query: { "occurrence"?: string };
    body: models.CalendarEventPatch;
    response: models.CalendarEventEnvelope;
  };
  /** DELETE /api/v1/chat/upload-sessions/{sessionId} — Отменить незавершённую сессию загрузки чата */
  chatAbortAttachmentUploadSession: {
    params: { "sessionId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** PATCH /api/v1/chat/conversations/{id}/notification-mode — Изменить режим уведомлений чата */
  chatChangeNotificationMode: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.ChatNotificationModeInput;
    response: models.ChatNotificationModeResult;
  };
  /** DELETE /api/v1/chat/conversations/{id}/manual-unread — Снять ручную отметку непрочитанного */
  chatClearManualUnread: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatReceiptState;
  };
  /** GET /api/v1/chat/attachments/{attachmentId}/download-session — Получить временный адрес скачивания вложения чата */
  chatCreateAttachmentDownloadSession: {
    params: { "attachmentId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatAttachmentDownloadSession;
  };
  /** POST /api/v1/chat/conversations/{id}/upload-sessions — Открыть сессию загрузки вложения чата */
  chatCreateAttachmentUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.ChatUploadSessionCreate;
    response: models.ChatUploadSession;
  };
  /** POST /api/v1/chat/conversations — Создать групповой чат */
  chatCreateGroup: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.ChatCreateGroup;
    response: models.ChatCreateGroupResult;
  };
  /** POST /api/v1/chat/conversations/direct — Найти или создать личный диалог */
  chatEnsureDirect: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.ChatEnsureDirect;
    response: models.ChatEnsureDirectResult;
  };
  /** POST /api/v1/chat/entities/{module}/{entity}/{entityId}/conversation — Найти или создать каноническое обсуждение доступного объекта */
  chatEnsureEntityConversation: {
    params: { "entity": "task"; "entityId": models.UUID; "module": "tasks" };
    query: Record<string, never>;
    body: { [key: string]: unknown };
    response: models.ChatEntityConversation;
  };
  /** GET /api/v1/chat/entities/{module}/{entity}/{entityId}/conversation — Найти каноническое обсуждение доступного объекта */
  chatFindEntityConversation: {
    params: { "entity": "task"; "entityId": models.UUID; "module": "tasks" };
    query: Record<string, never>;
    body: never;
    response: models.ChatEntityConversation;
  };
  /** POST /api/v1/chat/upload-sessions/{sessionId}/finish — Проверить и опубликовать вложение чата */
  chatFinishAttachmentUploadSession: {
    params: { "sessionId": models.UUID };
    query: Record<string, never>;
    body: models.EmptyObject;
    response: models.ChatForwardedAttachment;
  };
  /** GET /api/v1/chat/conversations/{id}/attachments/{attachmentId} — Получить карточку вложения */
  chatGetAttachment: {
    params: { "attachmentId": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatForwardedAttachment;
  };
  /** GET /api/v1/chat/upload-sessions/{sessionId} — Получить состояние сессии загрузки чата */
  chatGetAttachmentUploadSession: {
    params: { "sessionId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatUploadSession;
  };
  /** GET /api/v1/chat/conversations/{id} — Получить доступный чат */
  chatGetConversation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatConversation;
  };
  /** GET /api/v1/chat/conversations/{id}/attachments — Получить вложения доступного чата */
  chatListAttachments: {
    params: { "id": models.UUID };
    query: { "cursor"?: string; "limit"?: number; "media_kind"?: string; "q"?: string };
    body: never;
    response: models.ChatAttachmentPage;
  };
  /** GET /api/v1/chat/conversations/{id}/members — Получить безопасный состав доступного чата */
  chatListConversationMembers: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatMemberPage;
  };
  /** GET /api/v1/chat/conversations — Получить доступные чаты */
  chatListConversations: {
    params: Record<string, never>;
    query: { "cursor"?: string; "limit"?: number };
    body: never;
    response: models.ChatConversationPage;
  };
  /** GET /api/v1/chat/conversations/{id}/mentions/candidates — Получить точных адресатов упоминания в чате */
  chatListMentionCandidates: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatMentionCandidatePage;
  };
  /** GET /api/v1/chat/conversations/{id}/messages — Получить окно сообщений */
  chatListMessages: {
    params: { "id": models.UUID };
    query: { "after_seq"?: number; "around_seq"?: number; "before_seq"?: number; "limit"?: number; "q"?: string };
    body: never;
    response: models.ChatMessagePage;
  };
  /** GET /api/v1/chat/people — Получить безопасный picker людей кабинета */
  chatListPeople: {
    params: Record<string, never>;
    query: { "offset"?: number; "q"?: string };
    body: never;
    response: models.ChatPeoplePage;
  };
  /** GET /api/v1/chat/conversations/{id}/presence — Получить присутствие других участников доступного чата */
  chatListPresence: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatPresencePage;
  };
  /** GET /api/v1/chat/conversations/{id}/mentions/unread — Получить непрочитанные точные упоминания текущего пользователя */
  chatListUnreadMentions: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatUnreadMentionPage;
  };
  /** POST /api/v1/chat/conversations/{id}/manual-unread — Пометить чат непрочитанным от последнего подтверждённого read */
  chatMarkManualUnread: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.EmptyObject;
    response: models.ChatReceiptState;
  };
  /** POST /api/v1/chat/conversations/{id}/mentions/{messageId}/read — Пометить точное упоминание прочитанным */
  chatMarkMentionRead: {
    params: { "id": models.UUID; "messageId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatMentionReadResult;
  };
  /** POST /api/v1/chat/conversations/{id}/read — Продвинуть last_read_seq текущего участника */
  chatMarkRead: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.ChatReceiptInput;
    response: models.ChatReceiptState;
  };
  /** POST /api/v1/chat/conversations/{id}/messages — Идемпотентно отправить текстовое сообщение */
  chatSendMessage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.ChatSendMessage;
    response: models.ChatSendMessageResult;
  };
  /** POST /api/v1/chat/conversations/{id}/video-meeting — Отправить в беседу карточку видеовстречи */
  chatSendVideoMeeting: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.ChatSendVideoMeeting;
    response: models.ChatSendMessageResult;
  };
  /** DELETE /api/v1/core/upload-sessions/{id} — Отменить сессию загрузки core */
  coreAbortUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/core/accounting-policy/companies/{id}/payroll-official — Официальная часть зарплаты юрлица с даты */
  coreAddPolicyPayrollOfficial: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CorePolicyPayrollOfficialInput;
    response: models.CoreAccountingPolicy;
  };
  /** POST /api/v1/core/accounting-policy/companies/{id}/tax-regime — Система налогообложения юрлица с даты */
  coreAddPolicyTaxRegime: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CorePolicyTaxRegimeInput;
    response: models.CoreAccountingPolicy;
  };
  /** POST /api/v1/core/product-imports/{id}/apply — Атомарно применить подтверждённый preview */
  coreApplyProductImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreProductImportApplyRequest;
    response: models.CoreProductImportRun;
  };
  /** POST /api/v1/core/contacts/{id}/archive — Архивировать контрагента без удаления истории */
  coreArchiveContact: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreContact;
  };
  /** POST /api/v1/core/products/{id}/archive — Архивировать позицию без удаления истории */
  coreArchiveProduct: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreProduct;
  };
  /** POST /api/v1/core/documents/{id}/cancel — Отменить проведение без удаления документа */
  coreCancelDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** POST /api/v1/core/purchases/{id}/cancel — Отменить закупку */
  coreCancelPurchase: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreOrder;
  };
  /** POST /api/v1/core/sales/{id}/cancel — Отменить продажу */
  coreCancelSale: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreOrder;
  };
  /** POST /api/v1/core/purchases/{id}/close — Закрыть закупку с остатком */
  coreClosePurchase: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderCloseInput;
    response: models.CoreOrder;
  };
  /** POST /api/v1/core/sales/{id}/close — Закрыть продажу с остатком */
  coreCloseSale: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderCloseInput;
    response: models.CoreOrder;
  };
  /** POST /api/v1/core/purchases/{id}/steps/{key}/done — Отметить шаг закупки выполненным */
  coreCompletePurchaseStep: {
    params: { "id": models.UUID; "key": string };
    query: Record<string, never>;
    body: never;
    response: models.CoreOrderFunnelView;
  };
  /** POST /api/v1/core/sales/{id}/steps/{key}/done — Отметить шаг продажи выполненным */
  coreCompleteSaleStep: {
    params: { "id": models.UUID; "key": string };
    query: Record<string, never>;
    body: never;
    response: models.CoreOrderFunnelView;
  };
  /** POST /api/v1/core/purchases/{id}/confirm — Подтвердить закупку */
  coreConfirmPurchase: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreOrder;
  };
  /** POST /api/v1/core/sales/{id}/confirm — Подтвердить продажу */
  coreConfirmSale: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreOrder;
  };
  /** POST /api/v1/core/businesses — Создать управленческий бизнес */
  coreCreateBusiness: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreBusinessInput;
    response: models.CoreBusiness;
  };
  /** POST /api/v1/core/businesses/{id}/ownership — Утвердить новую версию структуры владения бизнесом */
  coreCreateBusinessOwnership: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOwnershipVersionInput;
    response: models.CoreOwnershipVersion;
  };
  /** POST /api/v1/core/contacts — Создать контрагента */
  coreCreateContact: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreContactCreate;
    response: models.CoreContact;
  };
  /** POST /api/v1/core/dictionaries — Создать пользовательский справочник */
  coreCreateDictionary: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreDictionaryCreate;
    response: models.CoreDictionary;
  };
  /** POST /api/v1/core/dictionaries/{id}/items — Добавить запись справочника */
  coreCreateDictionaryItem: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreDictionaryItemCreate;
    response: models.CoreDictionaryItem;
  };
  /** POST /api/v1/core/documents — Создать черновик документа */
  coreCreateDocument: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreDocumentCreate;
    response: models.CoreDocument;
  };
  /** POST /api/v1/core/document-types — Создать тип документа конструктора */
  coreCreateDocumentType: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreDocumentTypeCreate;
    response: models.CoreDocumentType;
  };
  /** POST /api/v1/core/employees — Создать карточку сотрудника */
  coreCreateEmployee: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreEmployeeCreate;
    response: models.CoreEmployee;
  };
  /** POST /api/v1/core/gl-accounts — Создать клиентский счёт поверх системного плана */
  coreCreateGLAccount: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreGLAccountCreate;
    response: models.CoreGLAccount;
  };
  /** POST /api/v1/core/gl-mappings — Установить версионированное правило проводки */
  coreCreateGLMapping: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreGLMappingCreate;
    response: models.CoreGLMapping;
  };
  /** POST /api/v1/core/items — Создать статью ДДС/ОПиУ */
  coreCreateItem: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreItemInput;
    response: models.CoreItem;
  };
  /** POST /api/v1/core/products — Создать товар, услугу, материал, полуфабрикат, семейство или вариант */
  coreCreateProduct: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreProductCreate;
    response: models.CoreProduct;
  };
  /** POST /api/v1/core/product-exports — Сформировать снимок номенклатуры для скачивания */
  coreCreateProductExport: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreProductExportRequest;
    response: models.CoreProductExport;
  };
  /** POST /api/v1/core/products/{id}/identifiers — Добавить внешний артикул или штрихкод */
  coreCreateProductIdentifier: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreProductIdentifierInput;
    response: models.CoreProductIdentifier;
  };
  /** POST /api/v1/core/product-imports — Загрузить небольшой импорт или завершить большую загрузку */
  coreCreateProductImport: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreProductImportFinishRequest;
    response: models.CoreProductImportRun;
  };
  /** POST /api/v1/core/product-import-upload-sessions — Открыть сессию загрузки файла импорта номенклатуры */
  coreCreateProductImportUploadSession: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreProductImportUploadSessionRequest;
    response: models.TransferSession;
  };
  /** POST /api/v1/core/products/{id}/upload-sessions — Открыть сессию загрузки файла или фото товара */
  coreCreateProductUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreProductFileUploadRequest;
    response: models.TransferSession;
  };
  /** POST /api/v1/core/purchases — Завести закупку */
  coreCreatePurchase: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreOrderInput;
    response: models.CoreOrder;
  };
  /** POST /api/v1/core/registers — Создать определение регистра */
  coreCreateRegister: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreRegisterCreate;
    response: models.CoreRegister;
  };
  /** POST /api/v1/core/sales — Завести продажу */
  coreCreateSale: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreOrderInput;
    response: models.CoreOrder;
  };
  /** POST /api/v1/core/trade/funnels — Завести воронку продаж или закупок */
  coreCreateTradeFunnel: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreOrderFunnelInput;
    response: models.CoreOrderFunnel;
  };
  /** POST /api/v1/core/trade/templates — Создать шаблон продажи или закупки */
  coreCreateTradeTemplate: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreOrderTemplateInput;
    response: models.CoreOrderTemplate;
  };
  /** POST /api/v1/core/products/{id}/identifiers/{identifierId}/deactivate — Деактивировать внешний идентификатор */
  coreDeactivateProductIdentifier: {
    params: { "id": models.UUID; "identifierId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreProductIdentifier;
  };
  /** DELETE /api/v1/core/products/{id}/files/{fileId} — Удалить файл товара */
  coreDeleteProductFile: {
    params: { "fileId": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** PUT /api/v1/core/accounting-policy/companies/{id}/payroll-official/open — Поправить открытую версию — официальная часть зарплаты юрлица */
  coreEditPolicyPayrollOfficial: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CorePolicyPayrollOfficialInput;
    response: models.CoreAccountingPolicy;
  };
  /** PUT /api/v1/core/accounting-policy/companies/{id}/tax-regime/open — Поправить открытую версию — система налогообложения юрлица */
  coreEditPolicyTaxRegime: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CorePolicyTaxRegimeInput;
    response: models.CoreAccountingPolicy;
  };
  /** POST /api/v1/core/purchases/execute-now — Продать сразу — закупка и акт одной командой */
  coreExecutePurchaseNow: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreOrderNowInput;
    response: models.CoreOrderNowResult;
  };
  /** POST /api/v1/core/sales/execute-now — Продать сразу — продажа и акт одной командой */
  coreExecuteSaleNow: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreOrderNowInput;
    response: models.CoreOrderNowResult;
  };
  /** POST /api/v1/core/upload-sessions/{id}/finish — Завершить загрузку файла товара или импорта */
  coreFinishUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreUploadFinishResult;
  };
  /** GET /api/v1/core/accounting-settings — Получить валюту учёта и состояние замка */
  coreGetAccountingSettings: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreAccountingSettings;
  };
  /** GET /api/v1/core/businesses/{id} — Получить управленческий бизнес */
  coreGetBusiness: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreBusiness;
  };
  /** GET /api/v1/core/contacts/{id} — Получить карточку контрагента */
  coreGetContact: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreContact;
  };
  /** GET /api/v1/core/documents/{id} — Получить документ конструктора */
  coreGetDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** GET /api/v1/core/documents/{id}/blockers — Проверить доступность проведения, отмены и пометки удаления */
  coreGetDocumentBlockers: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocumentBlockers;
  };
  /** GET /api/v1/core/documents/{id}/links — Получить структуру оснований, зависимых документов и движений */
  coreGetDocumentLinks: {
    params: { "id": models.UUID };
    query: { "depth"?: number };
    body: never;
    response: models.CoreDocumentLinks;
  };
  /** GET /api/v1/core/employees/{id} — Получить карточку сотрудника */
  coreGetEmployee: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreEmployee;
  };
  /** GET /api/v1/core/products/{id} — Получить карточку номенклатуры */
  coreGetProduct: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreProduct;
  };
  /** GET /api/v1/core/products/custom-fields/schema — Получить активную схему дополнительных реквизитов */
  coreGetProductCustomFieldSchema: {
    params: Record<string, never>;
    query: { "entity_type"?: string };
    body: never;
    response: models.CoreProductFieldSchema;
  };
  /** GET /api/v1/core/product-exports/{id} — Получить метаданные своего экспорта */
  coreGetProductExport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreProductExport;
  };
  /** GET /api/v1/core/product-exports/{id}/content — Скачать файл своего экспорта */
  coreGetProductExportContent: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/core/products/{id}/files/{fileId}/content — Скачать файл товара или миниатюру фото */
  coreGetProductFileContent: {
    params: { "fileId": models.UUID; "id": models.UUID };
    query: { "download"?: boolean; "w"?: number };
    body: never;
    response: void;
  };
  /** GET /api/v1/core/product-imports/{id} — Получить запуск импорта и доступные поля сопоставления */
  coreGetProductImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreProductImportRun;
  };
  /** GET /api/v1/core/product-imports/{id}/errors — Получить структурированные ошибки или XLSX-отчёт */
  coreGetProductImportErrors: {
    params: { "id": models.UUID };
    query: { "format"?: "json" | "xlsx" };
    body: never;
    response: models.CoreProductImportIssuePage;
  };
  /** GET /api/v1/core/product-imports/{id}/source — Скачать исходный файл своего запуска импорта */
  coreGetProductImportSource: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/core/product-import-templates/{kind} — Скачать шаблон импорта номенклатуры */
  coreGetProductImportTemplate: {
    params: { "kind": models.CoreProductTransferKind };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/core/purchases/{id} — Получить карточку закупки */
  coreGetPurchase: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreOrder;
  };
  /** GET /api/v1/core/purchases/{id}/blockers — Проверить, что мешает подтвердить или отменить закупку */
  coreGetPurchaseBlockers: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocumentBlockers;
  };
  /** GET /api/v1/core/purchases/{id}/funnel — Получить воронку и шаги закупки */
  coreGetPurchaseFunnel: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreOrderFunnelView;
  };
  /** GET /api/v1/core/purchases/{id}/history — Получить ленту закупки */
  coreGetPurchaseHistory: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreOrderHistory;
  };
  /** GET /api/v1/core/registers/{key} — Получить определение регистра */
  coreGetRegister: {
    params: { "key": string };
    query: Record<string, never>;
    body: never;
    response: models.CoreRegister;
  };
  /** GET /api/v1/core/registers/{key}/balance — Получить остатки регистра */
  coreGetRegisterBalance: {
    params: { "key": string };
    query: { "date_from"?: string; "date_to"?: string; "dim.<key>"?: string; "group"?: string; "limit"?: number; "offset"?: number };
    body: never;
    response: models.CoreRegisterBalancePage;
  };
  /** GET /api/v1/core/registers/{key}/turnovers — Получить приход, расход и чистый оборот */
  coreGetRegisterTurnovers: {
    params: { "key": string };
    query: { "date_from"?: string; "date_to"?: string; "dim.<key>"?: string; "group"?: string; "limit"?: number; "offset"?: number; "period"?: "day" | "week" | "month" };
    body: never;
    response: models.CoreRegisterTurnoverPage;
  };
  /** GET /api/v1/core/sales/{id} — Получить карточку продажи */
  coreGetSale: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreOrder;
  };
  /** GET /api/v1/core/sales/{id}/blockers — Проверить, что мешает подтвердить или отменить продажу */
  coreGetSaleBlockers: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocumentBlockers;
  };
  /** GET /api/v1/core/sales/{id}/funnel — Получить воронку и шаги продажи */
  coreGetSaleFunnel: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreOrderFunnelView;
  };
  /** GET /api/v1/core/sales/{id}/history — Получить ленту продажи */
  coreGetSaleHistory: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreOrderHistory;
  };
  /** GET /api/v1/core/trade/templates/{id} — Получить шаблон продажи или закупки */
  coreGetTradeTemplate: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreOrderTemplate;
  };
  /** GET /api/v1/core/ledger/trial-balance — Получить оборотно-сальдовую ведомость и проверку баланса */
  coreGetTrialBalance: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "company"?: string; "date_from"?: string; "date_to"?: string; "group"?: "contact"; "include_empty"?: boolean };
    body: never;
    response: models.CoreTrialBalance;
  };
  /** GET /api/v1/core/upload-sessions/{id} — Состояние сессии загрузки core */
  coreGetUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.TransferSession;
  };
  /** POST /api/v1/core/dictionaries/{id}/items/import — Дополнить справочник пачкой до 1000 записей */
  coreImportDictionaryItems: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreDictionaryItemImport;
    response: models.CoreImportResult;
  };
  /** POST /api/v1/core/purchases/import — Загрузить закупку из внешней системы */
  coreImportPurchase: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreOrderImportInput;
    response: models.CoreOrder;
  };
  /** POST /api/v1/core/sales/import — Загрузить продажу из внешней системы */
  coreImportSale: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreOrderImportInput;
    response: models.CoreOrder;
  };
  /** POST /api/v1/core/product-imports/{id}/inspect — Осмотреть лист и строку заголовков без сохранения */
  coreInspectProductImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreProductImportInspectRequest;
    response: models.CoreProductImportRun;
  };
  /** GET /api/v1/core/accounting-dimensions — Получить включённые аналитические разрезы и готовность истории */
  coreListAccountingDimensions: {
    params: Record<string, never>;
    query: { "on"?: string };
    body: never;
    response: models.CoreAccountingDimensionPage;
  };
  /** GET /api/v1/core/businesses/{id}/ownership — Получить историю структуры владения бизнесом */
  coreListBusinessOwnership: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreListBusinessOwnershipResponse;
  };
  /** GET /api/v1/core/businesses — Получить управленческие бизнесы кабинета */
  coreListBusinesses: {
    params: Record<string, never>;
    query: { "include_inactive"?: boolean };
    body: never;
    response: models.CoreListBusinessesResponse;
  };
  /** GET /api/v1/core/cashflow-items — Получить статьи, применимые в ДДС */
  coreListCashflowItems: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreItemPage;
  };
  /** GET /api/v1/core/contacts — Получить контрагентов */
  coreListContacts: {
    params: Record<string, never>;
    query: { "folder"?: string; "include_archived"?: boolean; "limit"?: number; "offset"?: number; "q"?: string };
    body: never;
    response: models.CoreContactPage;
  };
  /** GET /api/v1/core/currency-rate-sources — Получить доступные источники курса для валютной пары */
  coreListCurrencyRateSources: {
    params: Record<string, never>;
    query: { "currency"?: string };
    body: never;
    response: models.CoreCurrencyRateSourcePage;
  };
  /** GET /api/v1/core/currency-rates — Получить историю курсов валют */
  coreListCurrencyRates: {
    params: Record<string, never>;
    query: { "currency"?: string };
    body: never;
    response: models.CoreCurrencyRatePage;
  };
  /** GET /api/v1/core/dictionaries — Получить пользовательские справочники */
  coreListDictionaries: {
    params: Record<string, never>;
    query: { "limit"?: number; "offset"?: number; "q"?: string };
    body: never;
    response: models.CoreDictionaryPage;
  };
  /** GET /api/v1/core/dictionaries/{id}/items — Получить записи справочника */
  coreListDictionaryItems: {
    params: { "id": models.UUID };
    query: { "limit"?: number; "offset"?: number; "q"?: string };
    body: never;
    response: models.CoreDictionaryItemPage;
  };
  /** GET /api/v1/core/directories — Получить единый каталог справочников */
  coreListDirectories: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreDirectoryPage;
  };
  /** GET /api/v1/core/documents/{id}/entries — Получить движения документа по всем доступным регистрам */
  coreListDocumentEntries: {
    params: { "id": models.UUID };
    query: { "date_from"?: string; "date_to"?: string; "dim.<key>"?: string; "limit"?: number };
    body: never;
    response: models.CoreRegisterEntryPage;
  };
  /** GET /api/v1/core/document-types — Получить типы документов конструктора */
  coreListDocumentTypes: {
    params: Record<string, never>;
    query: { "include_module"?: boolean; "q"?: string };
    body: never;
    response: models.CoreDocumentTypePage;
  };
  /** GET /api/v1/core/documents — Получить журнал документов конструктора */
  coreListDocuments: {
    params: Record<string, never>;
    query: { "basis"?: models.UUID; "date_from"?: string; "date_to"?: string; "include_deleted"?: boolean; "limit"?: number; "q"?: string; "status"?: models.CoreDocumentStatus; "type"?: models.UUID };
    body: never;
    response: models.CoreDocumentPage;
  };
  /** GET /api/v1/core/employees — Получить сотрудников кабинета */
  coreListEmployees: {
    params: Record<string, never>;
    query: { "limit"?: number; "offset"?: number; "q"?: string };
    body: never;
    response: models.CoreEmployeePage;
  };
  /** GET /api/v1/core/gl-accounts — Получить план счетов главной книги */
  coreListGLAccounts: {
    params: Record<string, never>;
    query: { "include_inactive"?: boolean };
    body: never;
    response: models.CoreGLAccountPage;
  };
  /** GET /api/v1/core/gl-mappings — Получить правила схемы проводок */
  coreListGLMappings: {
    params: Record<string, never>;
    query: { "include_closed"?: boolean; "subject_type"?: string };
    body: never;
    response: models.CoreGLMappingPage;
  };
  /** GET /api/v1/core/items — Получить единый справочник статей */
  coreListItems: {
    params: Record<string, never>;
    query: { "apply"?: "cashflow" | "pnl" };
    body: never;
    response: models.CoreItemPage;
  };
  /** GET /api/v1/core/pnl-items — Получить статьи, применимые в ОПиУ */
  coreListPnlItems: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreItemPage;
  };
  /** GET /api/v1/core/products/{id}/files — Получить файлы и фото товара */
  coreListProductFiles: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreProductFilePage;
  };
  /** GET /api/v1/core/products/{id}/identifiers — Получить внешние артикулы и штрихкоды */
  coreListProductIdentifiers: {
    params: { "id": models.UUID };
    query: { "include_inactive"?: boolean };
    body: never;
    response: models.CoreProductIdentifierPage;
  };
  /** GET /api/v1/core/products/{id}/variants — Получить варианты семейства */
  coreListProductVariants: {
    params: { "id": models.UUID };
    query: { "status"?: "active" | "archived" | "all" };
    body: never;
    response: models.CoreProductPage;
  };
  /** GET /api/v1/core/products — Получить номенклатуру */
  coreListProducts: {
    params: Record<string, never>;
    query: { "custom"?: string; "folder"?: string; "is_stockable"?: boolean; "kind"?: "goods" | "service" | "material" | "semi_product" | "goods,material,semi_product"; "limit"?: number; "offset"?: number; "operational_only"?: boolean; "parent_product_id"?: models.UUID; "profile"?: "sell" | "stock" | "purchase" | "produce"; "q"?: string; "record_kind"?: "standalone" | "family" | "variant" | "standalone,family" | "standalone,variant" | "family,variant" | "standalone,family,variant"; "sort"?: "name" | "-name" | "sku" | "-sku" | "price" | "-price" | "updated" | "-updated"; "status"?: "active" | "archived" | "all" };
    body: never;
    response: models.CoreProductPage;
  };
  /** GET /api/v1/core/purchases — Получить журнал закупок */
  coreListPurchases: {
    params: Record<string, never>;
    query: { "business_id"?: models.UUID; "company_id"?: models.UUID; "contact_id"?: models.UUID; "contract_id"?: models.UUID; "date_from"?: string; "date_to"?: string; "external_id"?: string; "limit"?: number; "offset"?: number; "project_id"?: models.UUID; "responsible_id"?: models.UUID; "search"?: string; "side"?: models.CoreOrderSide; "source"?: models.CoreOrderSourceKind; "status"?: string; "with"?: string };
    body: never;
    response: models.CoreOrderPage;
  };
  /** GET /api/v1/core/registers/{key}/entries — Получить расшифровку движений регистра */
  coreListRegisterEntries: {
    params: { "key": string };
    query: { "date_from"?: string; "date_to"?: string; "dim.<key>"?: string; "limit"?: number; "registrar"?: models.UUID };
    body: never;
    response: models.CoreRegisterEntryPage;
  };
  /** GET /api/v1/core/registers — Получить определения пользовательских регистров */
  coreListRegisters: {
    params: Record<string, never>;
    query: { "kind"?: models.CoreRegisterKind; "limit"?: number; "module"?: string; "offset"?: number; "q"?: string };
    body: never;
    response: models.CoreRegisterPage;
  };
  /** GET /api/v1/core/sales — Получить журнал продаж */
  coreListSales: {
    params: Record<string, never>;
    query: { "business_id"?: models.UUID; "company_id"?: models.UUID; "contact_id"?: models.UUID; "contract_id"?: models.UUID; "date_from"?: string; "date_to"?: string; "external_id"?: string; "limit"?: number; "offset"?: number; "project_id"?: models.UUID; "responsible_id"?: models.UUID; "search"?: string; "side"?: models.CoreOrderSide; "source"?: models.CoreOrderSourceKind; "status"?: string; "with"?: string };
    body: never;
    response: models.CoreOrderPage;
  };
  /** GET /api/v1/core/seller-companies — Получить доступные юрлица продавца */
  coreListSellerCompanies: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreSellerCompanyList;
  };
  /** GET /api/v1/core/trade/funnels/templates — Получить шаблоны воронок продаж или закупок */
  coreListTradeFunnelTemplates: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreOrderFunnelTemplateList;
  };
  /** GET /api/v1/core/trade/funnels/{id}/versions — Получить версии воронки продаж или закупок */
  coreListTradeFunnelVersions: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreOrderFunnelVersionList;
  };
  /** GET /api/v1/core/trade/funnels — Получить воронки продаж или закупок кабинета */
  coreListTradeFunnels: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreOrderFunnelList;
  };
  /** GET /api/v1/core/trade/imports — Получить журнал загрузок продаж или закупок */
  coreListTradeImports: {
    params: Record<string, never>;
    query: { "limit"?: number };
    body: never;
    response: models.CoreOrderImportList;
  };
  /** GET /api/v1/core/trade/statuses — Получить статусы продажи или закупки кабинета */
  coreListTradeStatuses: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreOrderStatusList;
  };
  /** GET /api/v1/core/trade/templates/{id}/documents — Получить продажи или закупки, созданные шаблоном */
  coreListTradeTemplateDocuments: {
    params: { "id": models.UUID };
    query: { "limit"?: number };
    body: never;
    response: models.CoreOrderPage;
  };
  /** GET /api/v1/core/trade/templates — Получить шаблоны продаж или закупок */
  coreListTradeTemplates: {
    params: Record<string, never>;
    query: { "archived"?: boolean; "contact_id"?: models.UUID; "contract_id"?: models.UUID; "department_id"?: models.UUID; "limit"?: number; "offset"?: number; "side"?: "sale" | "purchase"; "state"?: "active" | "paused" | "archived" };
    body: never;
    response: models.CoreOrderTemplateList;
  };
  /** GET /api/v1/core/lookup/bank — Найти банк по БИК */
  coreLookupBank: {
    params: Record<string, never>;
    query: { "bic": string };
    body: never;
    response: models.FinanceBankLookup;
  };
  /** POST /api/v1/core/documents/{id}/mark-deleted — Поставить или снять пометку удаления */
  coreMarkDocumentDeleted: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreDocumentMarkDeleted;
    response: models.CoreDocument;
  };
  /** POST /api/v1/core/items/{id}/move — Переместить статью внутри дерева одного отчёта */
  coreMoveItem: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreItemMove;
    response: models.CoreItemPage;
  };
  /** POST /api/v1/core/documents/{id}/post — Провести или перепровести документ */
  corePostDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** POST /api/v1/core/product-imports/{id}/preview — Рассчитать изменения и ошибки без записи данных */
  corePreviewProductImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreProductImportRun;
  };
  /** GET /api/v1/core/product-exports/{id}/download-session — Временный адрес файла своего экспорта */
  coreProductExportDownloadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDownloadLink;
  };
  /** GET /api/v1/core/products/{id}/files/{fileId}/download-session — Временный адрес файла товара */
  coreProductFileDownloadSession: {
    params: { "fileId": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDownloadLink;
  };
  /** GET /api/v1/core/product-imports/{id}/errors/download-session — Временный адрес отчёта ошибок импорта */
  coreProductImportErrorsDownloadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDownloadLink;
  };
  /** GET /api/v1/core/product-imports/{id}/source/download-session — Временный адрес исходного файла импорта */
  coreProductImportSourceDownloadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDownloadLink;
  };
  /** GET /api/v1/core/product-import-templates/{kind}/download-session — Временный адрес шаблона импорта номенклатуры */
  coreProductImportTemplateDownloadSession: {
    params: { "kind": models.CoreProductTransferKind };
    query: Record<string, never>;
    body: never;
    response: models.CoreDownloadLink;
  };
  /** GET /api/v1/reference/catalog — Получить каталог справочников, доступных в кабинете */
  coreReferenceCatalog: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreDirectoryPage;
  };
  /** GET /api/v1/reference/changes — Получить изменения, случившиеся после момента, названного курсором */
  coreReferenceChanges: {
    params: Record<string, never>;
    query: { "cursor"?: string; "entity"?: string; "limit"?: number };
    body: never;
    response: models.CoreChangeFeedPage;
  };
  /** GET /api/v1/reference/{key}/items — Получить значения справочника по ключу */
  coreReferenceItems: {
    params: { "key": string };
    query: { "q"?: string };
    body: never;
    response: models.CoreReferenceItemPage;
  };
  /** POST /api/v1/reference/resolve — Разрешить пакет ссылок на значения справочников */
  coreReferenceResolve: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreReferenceResolveRequest;
    response: models.CoreReferenceResolveResult;
  };
  /** POST /api/v1/core/currency-rates/refresh — Запустить загрузку курсов сейчас */
  coreRefreshCurrencyRates: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreCurrencyRateRefreshResult;
  };
  /** POST /api/v1/core/purchases/{id}/reopen — Вернуть закупку в работу */
  coreReopenPurchase: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreOrder;
  };
  /** POST /api/v1/core/sales/{id}/reopen — Вернуть продажу в работу */
  coreReopenSale: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreOrder;
  };
  /** POST /api/v1/core/contacts/{id}/restore — Восстановить контрагента из архива */
  coreRestoreContact: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreContact;
  };
  /** POST /api/v1/core/products/{id}/restore — Восстановить позицию из архива */
  coreRestoreProduct: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreProduct;
  };
  /** PUT /api/v1/core/purchases/{id} — Изменить закупку */
  coreRevisePurchase: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderRevision;
    response: models.CoreOrder;
  };
  /** PUT /api/v1/core/sales/{id} — Изменить продажу */
  coreReviseSale: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderRevision;
    response: models.CoreOrder;
  };
  /** POST /api/v1/core/accounting-dimensions/{key}/versions — Записать решение по разрезу с даты «действует с» или поправить действующую запись истории */
  coreSaveAccountingDimensionVersion: {
    params: { "key": "company" | "project" | "department" | "cfo" };
    query: Record<string, never>;
    body: models.CoreAccountingDimensionVersionInput;
    response: models.CoreAccountingDimension;
  };
  /** GET /api/v1/core/companies/{id}/seller-bank — Получить банковский счёт бланка юрлица */
  coreSellerBank: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreSellerBank;
  };
  /** POST /api/v1/core/businesses/{id}/accounting-method — Переключить метод учёта бизнеса */
  coreSetBusinessAccountingMethod: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreBusinessAccountingMethodInput;
    response: models.CoreBusiness;
  };
  /** POST /api/v1/core/businesses/{id}/activation — Включить или отключить управленческий бизнес */
  coreSetBusinessActive: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreSetBusinessActiveRequest;
    response: models.CoreBusiness;
  };
  /** PUT /api/v1/core/purchases/{id}/cabinet-status — Поставить статус кабинета */
  coreSetPurchaseCabinetStatus: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderCabinetStatusInput;
    response: models.CoreOrder;
  };
  /** PUT /api/v1/core/purchases/{id}/funnel — Сменить воронку закупки */
  coreSetPurchaseFunnel: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderFunnelChoice;
    response: models.CoreOrderFunnelView;
  };
  /** PUT /api/v1/core/purchases/{id}/responsibles — Назначить ответственных закупки */
  coreSetPurchaseResponsibles: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderResponsiblesInput;
    response: models.CoreOrder;
  };
  /** PUT /api/v1/core/purchases/{id}/steps/{key}/due — Изменить срок шага закупки */
  coreSetPurchaseStepDue: {
    params: { "id": models.UUID; "key": string };
    query: Record<string, never>;
    body: models.CoreOrderStepDueInput;
    response: models.CoreOrderFunnelView;
  };
  /** PUT /api/v1/core/sales/{id}/cabinet-status — Поставить статус кабинета */
  coreSetSaleCabinetStatus: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderCabinetStatusInput;
    response: models.CoreOrder;
  };
  /** PUT /api/v1/core/sales/{id}/funnel — Сменить воронку продажи */
  coreSetSaleFunnel: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderFunnelChoice;
    response: models.CoreOrderFunnelView;
  };
  /** PUT /api/v1/core/sales/{id}/responsibles — Назначить ответственных продажи */
  coreSetSaleResponsibles: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderResponsiblesInput;
    response: models.CoreOrder;
  };
  /** PUT /api/v1/core/sales/{id}/steps/{key}/due — Изменить срок шага продажи */
  coreSetSaleStepDue: {
    params: { "id": models.UUID; "key": string };
    query: Record<string, never>;
    body: models.CoreOrderStepDueInput;
    response: models.CoreOrderFunnelView;
  };
  /** POST /api/v1/core/trade/templates/{id}/state — Приостановить, возобновить или архивировать шаблон продажи или закупки */
  coreSetTradeTemplateState: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderTemplateStateInput;
    response: models.CoreOrderTemplate;
  };
  /** GET /api/v1/core/lookup/banks — Подсказать банки по части БИК или названия */
  coreSuggestBanks: {
    params: Record<string, never>;
    query: { "q": string };
    body: never;
    response: models.FinanceBankSuggestions;
  };
  /** PATCH /api/v1/core/accounting-dimensions/{key} — Включить разрез или изменить его обязательность */
  coreUpdateAccountingDimension: {
    params: { "key": "company" | "project" | "department" | "cfo" };
    query: Record<string, never>;
    body: models.CoreAccountingDimensionPatch;
    response: models.CoreAccountingDimension;
  };
  /** PATCH /api/v1/core/accounting-settings — Изменить валюту учёта до появления движений */
  coreUpdateAccountingSettings: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreAccountingSettingsInput;
    response: models.CoreAccountingSettings;
  };
  /** PATCH /api/v1/core/businesses/{id} — Переименовать управленческий бизнес */
  coreUpdateBusiness: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreBusinessInput;
    response: models.CoreBusiness;
  };
  /** PATCH /api/v1/core/contacts/{id} — Частично изменить контрагента */
  coreUpdateContact: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreContactPatch;
    response: models.CoreContact;
  };
  /** PATCH /api/v1/core/documents/{id} — Частично изменить черновик документа */
  coreUpdateDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreDocumentPatch;
    response: models.CoreDocument;
  };
  /** PATCH /api/v1/core/items/{id} — Изменить статью и её применения */
  coreUpdateItem: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreItemInput;
    response: models.CoreItem;
  };
  /** PATCH /api/v1/core/products/{id} — Частично изменить карточку номенклатуры */
  coreUpdateProduct: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreProductPatch;
    response: models.CoreProduct;
  };
  /** PATCH /api/v1/core/products/{id}/custom — Заменить дополнительные реквизиты карточки */
  coreUpdateProductCustom: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreProductCustomInput;
    response: models.CoreProduct;
  };
  /** PATCH /api/v1/core/products/{id}/files/{fileId} — Изменить тип, имя или основное фото */
  coreUpdateProductFile: {
    params: { "fileId": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreProductFilePatch;
    response: models.CoreProductFile;
  };
  /** PATCH /api/v1/core/products/{id}/identifiers/{identifierId} — Частично изменить внешний идентификатор */
  coreUpdateProductIdentifier: {
    params: { "id": models.UUID; "identifierId": models.UUID };
    query: Record<string, never>;
    body: models.CoreProductIdentifierPatch;
    response: models.CoreProductIdentifier;
  };
  /** PATCH /api/v1/core/product-imports/{id}/mapping — Сохранить сопоставление колонок импорта */
  coreUpdateProductImportMapping: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreProductImportMapping;
    response: models.CoreProductImportRun;
  };
  /** PUT /api/v1/core/trade/funnels/{id} — Изменить воронку продаж или закупок */
  coreUpdateTradeFunnel: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderFunnelInput;
    response: models.CoreOrderFunnel;
  };
  /** PUT /api/v1/core/trade/templates/{id} — Изменить шаблон продажи или закупки */
  coreUpdateTradeTemplate: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderTemplateInput;
    response: models.CoreOrderTemplate;
  };
  /** DELETE /api/v1/crm/import-upload-sessions/{id} — Отменить сессию загрузки файла импорта */
  crmAbortImportUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/crm/inbox/upload-sessions/{id} — Отменить сессию загрузки файла диалога */
  crmAbortInboxUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/crm/{entity}/{id}/notes — Добавить заметку в ленту записи */
  crmAddNote: {
    params: { "entity": "lead" | "deal" | "customer"; "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMNoteInput;
    response: models.CRMActivity;
  };
  /** POST /api/v1/crm/pipelines/{id}/archive — Архивировать воронку */
  crmArchivePipeline: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMPipeline;
  };
  /** PATCH /api/v1/crm/inbox/conversations/{id}/assign — Назначить ответственного за диалог */
  crmAssignInboxConversation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMInboxAssignInput;
    response: models.CRMInboxConversation;
  };
  /** POST /api/v1/crm/leads/{id}/convert — Перевести лид в сделку */
  crmConvertLead: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMConvertLeadInput;
    response: models.CRMLead;
  };
  /** POST /api/v1/crm/automation/rules — Создать правило автоматизации */
  crmCreateAutomationRule: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMAutomationRuleInput;
    response: models.CRMAutomationRule;
  };
  /** POST /api/v1/crm/customers — Создать клиента CRM */
  crmCreateCustomer: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMCustomerInput;
    response: models.CRMCustomer;
  };
  /** POST /api/v1/crm/deals — Создать сделку */
  crmCreateDeal: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMDealInput;
    response: models.CRMDeal;
  };
  /** POST /api/v1/crm/inbox/conversations/{id}/deals — Создать сделку из диалога */
  crmCreateDealFromConversation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMInboxDealInput;
    response: models.CRMInboxConversationLink;
  };
  /** POST /api/v1/crm/{entity}/{id}/engagements — Запланировать дело по лиду, сделке или клиенту */
  crmCreateEngagement: {
    params: { "entity": "lead" | "deal" | "customer"; "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMEngagementInput;
    response: models.CRMEngagement;
  };
  /** POST /api/v1/crm/{entity}/{id}/events — Создать событие календаря по записи CRM */
  crmCreateEventLink: {
    params: { "entity": "lead" | "deal"; "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMCreateEventLinkInput;
    response: models.CRMExternalLink;
  };
  /** POST /api/v1/crm/imports/{id}/upload-sessions — Открыть сессию загрузки файла импорта */
  crmCreateImportUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.TransferUploadRequest;
    response: models.TransferSession;
  };
  /** POST /api/v1/crm/inbox/conversations/{id}/upload-sessions — Открыть сессию загрузки файла для сообщения диалога */
  crmCreateInboxUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.TransferUploadRequest;
    response: models.TransferSession;
  };
  /** POST /api/v1/crm/leads — Создать лид */
  crmCreateLead: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMLeadInput;
    response: models.CRMLead;
  };
  /** POST /api/v1/crm/inbox/conversations/{id}/leads — Создать лид из диалога */
  crmCreateLeadFromConversation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMInboxConversationLink;
  };
  /** POST /api/v1/crm/lead-stages — Добавить этап доски лидов */
  crmCreateLeadStage: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMLeadStageInput;
    response: models.CRMLeadStage;
  };
  /** POST /api/v1/crm/loss-reasons — Добавить причину отказа */
  crmCreateLossReason: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMLossReasonInput;
    response: models.CRMLossReason;
  };
  /** POST /api/v1/crm/pipelines — Создать воронку */
  crmCreatePipeline: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMPipelineInput;
    response: models.CRMPipeline;
  };
  /** POST /api/v1/crm/pipelines/{id}/stages — Добавить стадию в воронку */
  crmCreateStage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMStageInput;
    response: models.CRMStage;
  };
  /** POST /api/v1/crm/{entity}/{id}/tasks — Создать задачу по записи CRM */
  crmCreateTaskLink: {
    params: { "entity": "lead" | "deal"; "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMCreateTaskLinkInput;
    response: models.CRMExternalLink;
  };
  /** DELETE /api/v1/crm/customers/{id} — Удалить клиента CRM */
  crmDeleteCustomer: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/crm/customers/duplicates — Найти похожие карточки клиента */
  crmFindCustomerDuplicates: {
    params: Record<string, never>;
    query: { "email"?: string; "inn"?: string; "kpp"?: string; "name"?: string; "phone"?: string };
    body: never;
    response: Array<models.CRMCustomerDuplicate>;
  };
  /** POST /api/v1/crm/import-upload-sessions/{id}/finish — Завершить загрузку файла импорта */
  crmFinishImportUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMImportFileInfo;
  };
  /** POST /api/v1/crm/inbox/upload-sessions/{id}/finish — Завершить загрузку файла для сообщения диалога */
  crmFinishInboxUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMInboxOutboundUpload;
  };
  /** GET /api/v1/crm/analytics — Получить аналитику продаж */
  crmGetAnalytics: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CRMAnalytics;
  };
  /** GET /api/v1/crm/automation/rules/{id} — Получить правило автоматизации */
  crmGetAutomationRule: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMAutomationRule;
  };
  /** GET /api/v1/crm/automation/runs/{id}/actions — Получить журнал действий запуска */
  crmGetAutomationRunActions: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMAutomationActionJournal>;
  };
  /** GET /api/v1/crm/customers/{id} — Получить клиента CRM */
  crmGetCustomer: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMCustomer;
  };
  /** GET /api/v1/crm/deals/{id} — Получить карточку сделки */
  crmGetDeal: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMDealCard;
  };
  /** GET /api/v1/crm/deals/board — Получить доску сделок воронки */
  crmGetDealBoard: {
    params: Record<string, never>;
    query: { "archived"?: boolean; "customer"?: models.UUID; "limit"?: number; "owner"?: number; "pipeline": models.UUID; "q"?: string; "sort"?: string };
    body: never;
    response: models.CRMDealBoard;
  };
  /** GET /api/v1/crm/deals/{id}/stage-history — Получить историю стадий сделки */
  crmGetDealStageHistory: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMDealStageHistory>;
  };
  /** GET /api/v1/crm/contacts/{id} — Получить контрагента справочника ERP */
  crmGetDirectoryContact: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMContactRef;
  };
  /** GET /api/v1/crm/import-upload-sessions/{id} — Состояние сессии загрузки файла импорта */
  crmGetImportUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.TransferSession;
  };
  /** GET /api/v1/crm/inbox/conversations/{id} — Получить диалог */
  crmGetInboxConversation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMInboxConversation;
  };
  /** GET /api/v1/crm/inbox/upload-sessions/{id} — Состояние сессии загрузки файла диалога */
  crmGetInboxUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.TransferSession;
  };
  /** GET /api/v1/crm/leads/{id} — Получить лид */
  crmGetLead: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMLeadCard;
  };
  /** GET /api/v1/crm/leads/board — Получить доску приёма лидов */
  crmGetLeadBoard: {
    params: Record<string, never>;
    query: { "archived"?: boolean; "customer"?: models.UUID; "owner"?: number; "q"?: string; "sort"?: "updated_desc" | "created_asc"; "source"?: string; "stage"?: models.UUID; "status"?: models.CRMLeadStatus };
    body: never;
    response: models.CRMLeadBoard;
  };
  /** GET /api/v1/crm/leads/{id}/history — Получить решения по лиду */
  crmGetLeadHistory: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMLeadDecision>;
  };
  /** GET /api/v1/crm/leads/summary — Получить счётчики раздела лидов */
  crmGetLeadSummary: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CRMLeadSummary;
  };
  /** GET /api/v1/crm/overview — Получить сводку менеджера */
  crmGetOverview: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CRMOverview;
  };
  /** GET /api/v1/crm/pipelines/{id} — Получить воронку */
  crmGetPipeline: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMPipeline;
  };
  /** GET /api/v1/crm/settings — Получить настройки CRM кабинета */
  crmGetSettings: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CRMSettings;
  };
  /** GET /api/v1/crm/{entity}/{id}/timeline — Получить единую хронологию лида, сделки или клиента */
  crmGetTimeline: {
    params: { "entity": "lead" | "deal" | "customer"; "id": models.UUID };
    query: { "before"?: string; "before_id"?: models.UUID; "limit"?: number };
    body: never;
    response: Array<models.CRMTimelineEntry>;
  };
  /** GET /api/v1/crm/inbox/attachments/{id}/download-session — Временный адрес вложения диалога */
  crmInboxAttachmentDownloadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.TransferDownloadLink;
  };
  /** GET /api/v1/crm/leads/{id}/duplicates — Похожие обращения */
  crmLeadDuplicates: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMLeadDuplicate>;
  };
  /** POST /api/v1/crm/inbox/entities/{entity}/{id}/conversations — Привязать диалог к записи CRM */
  crmLinkEntityConversation: {
    params: { "entity": "lead" | "deal"; "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMInboxLinkConversationInput;
    response: models.CRMInboxConversationLink;
  };
  /** GET /api/v1/crm/automation/rules — Получить правила автоматизации */
  crmListAutomationRules: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMAutomationRule>;
  };
  /** GET /api/v1/crm/automation/runs — Получить запуски автоматизации */
  crmListAutomationRuns: {
    params: Record<string, never>;
    query: { "rule_id"?: models.UUID };
    body: never;
    response: Array<models.CRMAutomationRun>;
  };
  /** GET /api/v1/crm/customers/duplicate-groups — Найти дубли во всей базе клиентов */
  crmListCustomerDuplicateGroups: {
    params: Record<string, never>;
    query: { "limit"?: number };
    body: never;
    response: Array<models.CRMCustomerDuplicateGroup>;
  };
  /** GET /api/v1/crm/customers — Получить базу клиентов CRM */
  crmListCustomers: {
    params: Record<string, never>;
    query: { "archived"?: boolean; "in_core"?: boolean; "limit"?: number; "offset"?: number; "owner"?: number; "phone"?: string; "q"?: string };
    body: never;
    response: Array<models.CRMCustomer>;
  };
  /** GET /api/v1/crm/deals/{id}/activities — Получить ленту сделки */
  crmListDealActivities: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMActivity>;
  };
  /** GET /api/v1/crm/deals/{id}/contacts — Получить контрагентов сделки */
  crmListDealContacts: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMDealContact>;
  };
  /** GET /api/v1/crm/deals/{id}/items — Получить смету сделки */
  crmListDealItems: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMDealItem>;
  };
  /** GET /api/v1/crm/contacts — Найти контрагента в справочнике ERP */
  crmListDirectoryContacts: {
    params: Record<string, never>;
    query: { "q"?: string };
    body: never;
    response: Array<models.CRMContactRef>;
  };
  /** GET /api/v1/crm/engagement-kinds — Получить справочник видов дел */
  crmListEngagementKinds: {
    params: Record<string, never>;
    query: { "active"?: boolean };
    body: never;
    response: Array<models.CRMEngagementKindItem>;
  };
  /** GET /api/v1/crm/{entity}/{id}/engagements — Получить дела по лиду, сделке или клиенту */
  crmListEngagements: {
    params: { "entity": "lead" | "deal" | "customer"; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMEngagement>;
  };
  /** GET /api/v1/crm/inbox/entities/{entity}/{id}/conversations — Получить диалоги записи CRM */
  crmListEntityConversations: {
    params: { "entity": "lead" | "deal"; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMInboxLinkedConversation>;
  };
  /** GET /api/v1/crm/inbox/entities/{entity}/{id}/messages — Получить переписку записи CRM */
  crmListEntityMessages: {
    params: { "entity": "lead" | "deal"; "id": models.UUID };
    query: { "limit"?: number };
    body: never;
    response: Array<models.CRMInboxEntityMessage>;
  };
  /** GET /api/v1/crm/{entity}/{id}/links — Получить связи записи с задачами, событиями и встречами */
  crmListExternalLinks: {
    params: { "entity": "lead" | "deal"; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMExternalLink>;
  };
  /** GET /api/v1/crm/inbox/connections — Получить подключённые каналы */
  crmListInboxConnections: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMInboxConnection>;
  };
  /** GET /api/v1/crm/inbox/conversations/{id}/links — Получить записи CRM, связанные с диалогом */
  crmListInboxConversationLinks: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMInboxConversationLink>;
  };
  /** GET /api/v1/crm/inbox/conversations — Получить диалоги каналов */
  crmListInboxConversations: {
    params: Record<string, never>;
    query: { "assigned_to"?: string; "connection"?: models.UUID; "limit"?: number; "offset"?: number; "q"?: string; "status"?: models.CRMInboxConversationStatus };
    body: never;
    response: Array<models.CRMInboxConversation>;
  };
  /** GET /api/v1/crm/inbox/messages/{id}/attachments — Получить вложения сообщения */
  crmListInboxMessageAttachments: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMInboxAttachment>;
  };
  /** GET /api/v1/crm/inbox/conversations/{id}/messages — Получить переписку диалога */
  crmListInboxMessages: {
    params: { "id": models.UUID };
    query: { "limit"?: number; "offset"?: number };
    body: never;
    response: Array<models.CRMInboxMessage>;
  };
  /** GET /api/v1/crm/inbox/providers — Получить каталог каналов */
  crmListInboxProviders: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMInboxProvider>;
  };
  /** GET /api/v1/crm/inbox/templates — Получить шаблоны быстрых ответов */
  crmListInboxTemplates: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMInboxTemplate>;
  };
  /** GET /api/v1/crm/leads/{id}/activities — Получить ленту лида */
  crmListLeadActivities: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMActivity>;
  };
  /** GET /api/v1/crm/lead-stages — Получить этапы доски лидов */
  crmListLeadStages: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMLeadStage>;
  };
  /** GET /api/v1/crm/leads — Получить лиды */
  crmListLeads: {
    params: Record<string, never>;
    query: { "archived"?: boolean; "customer"?: models.UUID; "limit"?: number; "offset"?: number; "owner"?: number; "q"?: string; "sort"?: "updated_desc" | "created_asc"; "source"?: string; "stage"?: models.UUID; "status"?: models.CRMLeadStatus };
    body: never;
    response: Array<models.CRMLeadCard>;
  };
  /** GET /api/v1/crm/loss-reasons — Получить причины отказа */
  crmListLossReasons: {
    params: Record<string, never>;
    query: { "kind"?: "deal" | "lead" };
    body: never;
    response: Array<models.CRMLossReason>;
  };
  /** GET /api/v1/crm/members — Получить сотрудников для назначения ответственным */
  crmListMembers: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMUserRef>;
  };
  /** GET /api/v1/crm/pipelines/{id}/deals — Получить сделки воронки */
  crmListPipelineDeals: {
    params: { "id": models.UUID };
    query: { "archived"?: boolean; "customer"?: models.UUID; "limit"?: number; "offset"?: number; "owner"?: number; "q"?: string; "sort"?: string; "stage"?: models.UUID };
    body: never;
    response: Array<models.CRMDeal>;
  };
  /** GET /api/v1/crm/pipelines — Получить воронки со стадиями */
  crmListPipelines: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMPipeline>;
  };
  /** POST /api/v1/crm/inbox/conversations/{id}/read — Обнулить непрочитанные в диалоге */
  crmMarkInboxConversationRead: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/crm/customers/{id}/merge — Слить карточки клиента в эту */
  crmMergeCustomers: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMMergeCustomersInput;
    response: models.CRMCustomer;
  };
  /** POST /api/v1/crm/leads/{id}/merge — Свести дубли в одно обращение */
  crmMergeLeads: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMMergeLeadsInput;
    response: models.CRMLead;
  };
  /** POST /api/v1/crm/deals/{id}/move — Перевести сделку на другую стадию */
  crmMoveDeal: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMMoveDealInput;
    response: models.CRMDeal;
  };
  /** POST /api/v1/crm/customers/{id}/promote — Завести клиента в справочнике контрагентов ERP */
  crmPromoteCustomer: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMCustomer;
  };
  /** POST /api/v1/crm/leads/{id}/qualify — Квалифицировать или отсеять лид */
  crmQualifyLead: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMQualifyLeadInput;
    response: models.CRMLead;
  };
  /** POST /api/v1/crm/deals/{id}/reopen — Переоткрыть закрытую сделку */
  crmReopenDeal: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMReopenDealInput;
    response: models.CRMDeal;
  };
  /** PATCH /api/v1/crm/lead-stages/reorder — Изменить порядок этапов доски лидов */
  crmReorderLeadStages: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMReorderInput;
    response: void;
  };
  /** PATCH /api/v1/crm/pipelines/reorder — Изменить порядок воронок */
  crmReorderPipelines: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMReorderInput;
    response: void;
  };
  /** PATCH /api/v1/crm/pipelines/{id}/stages/reorder — Изменить порядок стадий воронки */
  crmReorderStages: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMReorderInput;
    response: void;
  };
  /** POST /api/v1/crm/automation/runs/{id}/retry — Повторить неуспешный запуск */
  crmRetryAutomationRun: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMAutomationRun;
  };
  /** GET /api/v1/crm/sales-plans — Планы продаж на месяц */
  crmSalesPlans: {
    params: Record<string, never>;
    query: { "period"?: string };
    body: never;
    response: Array<models.CRMSalesPlan>;
  };
  /** POST /api/v1/crm/inbox/templates — Сохранить шаблон быстрого ответа */
  crmSaveInboxTemplate: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMInboxTemplateInput;
    response: models.CRMInboxTemplate;
  };
  /** PUT /api/v1/crm/sales-plans — Переписать планы месяца */
  crmSaveSalesPlans: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMSalesPlansInput;
    response: Array<models.CRMSalesPlan>;
  };
  /** POST /api/v1/crm/inbox/conversations/{id}/messages — Отправить сообщение в диалог */
  crmSendInboxMessage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMInboxSendInput;
    response: models.CRMInboxMessage;
  };
  /** PUT /api/v1/crm/automation/rules/{id} — Заменить правило автоматизации */
  crmUpdateAutomationRule: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMAutomationRuleInput;
    response: models.CRMAutomationRule;
  };
  /** PATCH /api/v1/crm/customers/{id} — Изменить клиента CRM */
  crmUpdateCustomer: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMCustomerPatch;
    response: models.CRMCustomer;
  };
  /** PATCH /api/v1/crm/deals/{id} — Изменить сделку */
  crmUpdateDeal: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMDealPatch;
    response: models.CRMDeal;
  };
  /** PATCH /api/v1/crm/engagements/{id} — Изменить или закрыть дело */
  crmUpdateEngagement: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMEngagementPatch;
    response: models.CRMEngagement;
  };
  /** PATCH /api/v1/crm/leads/{id} — Изменить лид */
  crmUpdateLead: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMLeadPatch;
    response: models.CRMLead;
  };
  /** PATCH /api/v1/crm/lead-stages/{id} — Изменить этап доски лидов */
  crmUpdateLeadStage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMLeadStagePatch;
    response: models.CRMLeadStage;
  };
  /** PATCH /api/v1/crm/pipelines/{id} — Изменить воронку */
  crmUpdatePipeline: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMPipelinePatch;
    response: models.CRMPipeline;
  };
  /** PATCH /api/v1/crm/settings — Изменить настройки CRM кабинета */
  crmUpdateSettings: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMSettingsPatch;
    response: models.CRMSettings;
  };
  /** PATCH /api/v1/crm/stages/{id} — Изменить стадию */
  crmUpdateStage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMStagePatch;
    response: models.CRMStage;
  };
  /** GET /api/v1/dashboard/metrics/{id}/snapshot — Рассчитать снимок показателя */
  dashboardGetMetricSnapshot: {
    params: { "id": string };
    query: { "company"?: models.UUID; "from": string; "project"?: models.UUID; "to": string };
    body: never;
    response: models.DashboardMetricSnapshot;
  };
  /** GET /api/v1/dashboard/metrics — Получить доступные показатели */
  dashboardListMetrics: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.DashboardListMetricsResponse;
  };
  /** GET /api/v1/developer/apps/{key}/installations/{id}/api-calls — Прочитать, что делал мой ключ */
  developerAppAPICalls: {
    params: { "id": models.UUID; "key": string };
    query: { "limit"?: number; "offset"?: number };
    body: never;
    response: models.DeveloperAPICallPage;
  };
  /** GET /api/v1/developer/app-blocks — Прочитать запреты своих документов */
  developerAppBlocks: {
    params: Record<string, never>;
    query: { "limit"?: number };
    body: never;
    response: models.DeveloperAppBlockList;
  };
  /** GET /api/v1/developer/apps/{key}/installations/{id}/deliveries — Прочитать журнал доставки своей установки */
  developerAppDeliveries: {
    params: { "id": models.UUID; "key": string };
    query: { "limit"?: number; "offset"?: number; "status"?: "pending" | "delivered" | "failed" | "dead" };
    body: never;
    response: models.DeveloperDeliveryPage;
  };
  /** GET /api/v1/developer/apps/{key}/installations — Прочитать установки своего приложения */
  developerAppInstallations: {
    params: { "key": string };
    query: Record<string, never>;
    body: never;
    response: models.DeveloperInstallationPage;
  };
  /** GET /api/v1/developer/apps/{key}/keys — Прочитать учётные данные своего приложения */
  developerAppKeys: {
    params: { "key": string };
    query: Record<string, never>;
    body: never;
    response: models.DeveloperAppKeyPage;
  };
  /** GET /api/v1/developer/apps/{key}/versions/{version}/function-artifacts — Прочитать модули функций своей версии */
  developerAppVersionFunctionArtifacts: {
    params: { "key": string; "version": string };
    query: Record<string, never>;
    body: never;
    response: models.DeveloperFunctionArtifactsResult;
  };
  /** GET /api/v1/developer/apps/{key}/versions/{version}/publication — Прочитать готовность своей версии к публикации */
  developerAppVersionPublicationReport: {
    params: { "key": string; "version": string };
    query: Record<string, never>;
    body: never;
    response: models.DeveloperPublicationResult;
  };
  /** GET /api/v1/developer/apps/{key}/versions — Прочитать версии своего приложения */
  developerAppVersions: {
    params: { "key": string };
    query: Record<string, never>;
    body: never;
    response: models.DeveloperAppVersionPage;
  };
  /** GET /api/v1/developer/apps — Прочитать свои приложения */
  developerApps: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.DeveloperAppPage;
  };
  /** DELETE /api/v1/developer/sessions/current — Выйти из контура разработчика */
  developerCloseSession: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/developer/apps/{key}/keys — Выпустить учётные данные приложения */
  developerIssueAppKey: {
    params: { "key": string };
    query: Record<string, never>;
    body: models.DeveloperAppKeyInput;
    response: models.DeveloperIssuedAppKey;
  };
  /** POST /api/v1/developer/sessions — Обменять одноразовую ссылку на сессию */
  developerOpenSession: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DeveloperSessionInput;
    response: models.DeveloperSession;
  };
  /** GET /api/v1/developer/profile — Прочитать своё состояние */
  developerProfile: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.DeveloperProfile;
  };
  /** GET /api/v1/developer/publisher-application — Прочитать свою заявку на издателя */
  developerPublisherApplication: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.DeveloperApplicationResult;
  };
  /** POST /api/v1/developer/registrations — Зарегистрировать аккаунт разработчика */
  developerRegister: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DeveloperRegistrationInput;
    response: models.DeveloperAccepted;
  };
  /** POST /api/v1/developer/sign-in-links — Запросить ссылку входа разработчика */
  developerRequestSignInLink: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DeveloperSignInLinkInput;
    response: models.DeveloperAccepted;
  };
  /** POST /api/v1/developer/apps/{key}/keys/{id}/revocation — Отозвать учётные данные приложения */
  developerRevokeAppKey: {
    params: { "id": models.UUID; "key": string };
    query: Record<string, never>;
    body: models.DeveloperAppKeyRevocationInput;
    response: void;
  };
  /** POST /api/v1/developer/apps/{key}/keys/{id}/rotation — Заменить учётные данные приложения с перекрытием */
  developerRotateAppKey: {
    params: { "id": models.UUID; "key": string };
    query: Record<string, never>;
    body: models.DeveloperAppKeyRotationInput;
    response: models.DeveloperIssuedAppKey;
  };
  /** POST /api/v1/developer/apps — Завести своё приложение или переименовать его */
  developerSaveApp: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DeveloperAppInput;
    response: models.DeveloperAppResult;
  };
  /** POST /api/v1/developer/apps/{key}/versions — Завести версию своего приложения */
  developerSaveAppVersion: {
    params: { "key": string };
    query: Record<string, never>;
    body: models.DeveloperAppVersionInput;
    response: models.DeveloperAppVersionResult;
  };
  /** POST /api/v1/developer/publisher-application — Подать заявку на имя издателя */
  developerSubmitPublisherApplication: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DeveloperApplicationInput;
    response: models.DeveloperApplicationResult;
  };
  /** POST /api/v1/developer/apps/{key}/versions/{version}/function-artifact — Загрузить модуль функции своей версии */
  developerUploadAppFunctionArtifact: {
    params: { "key": string; "version": string };
    query: Record<string, never>;
    body: never;
    response: models.DeveloperFunctionUploadResult;
  };
  /** DELETE /api/v1/docflow/flow/upload-sessions/{id} — Отменить сессию загрузки файла в документ */
  docflowAbortFlowUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/docflow/approvals/{id}/acknowledge — Отметить «ознакомлен» */
  docflowAcknowledgeApproval: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowApproval;
  };
  /** GET /api/v1/docflow/flow/advance-invoices — Получить счёт-фактуру на аванс */
  docflowAdvanceInvoice: {
    params: Record<string, never>;
    query: { "advance_id": models.UUID };
    body: never;
    response: models.DocflowFlowDocument;
  };
  /** GET /api/v1/docflow/approvals/{id} — Получить согласование целиком */
  docflowApproval: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowApproval;
  };
  /** GET /api/v1/docflow/approval-routes — Получить маршруты согласования */
  docflowApprovalRoutes: {
    params: Record<string, never>;
    query: { "kind"?: "flow_document" | "payment_request" | "edo_message" | "any"; "module"?: "docflow" | "finance" };
    body: never;
    response: models.DocflowApprovalRouteList;
  };
  /** GET /api/v1/docflow/approval-settings — Получить справочники конструктора маршрутов */
  docflowApprovalSettings: {
    params: Record<string, never>;
    query: { "search"?: string };
    body: never;
    response: models.DocflowApprovalDirectories;
  };
  /** GET /api/v1/docflow/approvals/{id}/sheet — Скачать лист согласования */
  docflowApprovalSheetDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/docflow/approvals/{id}/sheet/download-session — Временный адрес листа согласования */
  docflowApprovalSheetDownloadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.TransferDownloadLink;
  };
  /** GET /api/v1/docflow/approvals/state — Узнать состояние согласования одного предмета */
  docflowApprovalState: {
    params: Record<string, never>;
    query: { "id": models.UUID; "kind": "flow_document" | "payment_request" | "edo_message"; "module": "docflow" | "finance" };
    body: never;
    response: models.DocflowApprovalSubjectState;
  };
  /** GET /api/v1/docflow/approvals — Получить очередь согласований */
  docflowApprovals: {
    params: Record<string, never>;
    query: { "limit"?: number; "mine"?: "true" | "false"; "module"?: "docflow" | "finance"; "offset"?: number; "overdue"?: "true" | "false"; "search"?: string; "state"?: "pending" | "approved" | "rejected" | "returned" | "cancelled" };
    body: never;
    response: models.DocflowApprovalInboxPage;
  };
  /** POST /api/v1/docflow/approvals/{id}/cancel — Отозвать предмет с согласования */
  docflowCancelApproval: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowApprovalCancelInput;
    response: models.DocflowApproval;
  };
  /** POST /api/v1/docflow/messages/{id}/intake/cancel — Отменить приёмку входящего документа к учёту */
  docflowCancelIntake: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowIntakePreview;
  };
  /** GET /api/v1/docflow/approval-routes/check — Проверить, по какому маршруту пойдёт предмет */
  docflowCheckApprovalRoute: {
    params: Record<string, never>;
    query: { "amount"?: string; "business_id"?: models.UUID; "company_id"?: models.UUID; "contact_folder_id"?: models.UUID; "contact_id"?: models.UUID; "currency"?: string; "document_kind"?: string; "item_id"?: models.UUID; "kind": "flow_document" | "payment_request" | "edo_message"; "module"?: "docflow" };
    body: never;
    response: models.DocflowApprovalChainPreview;
  };
  /** POST /api/v1/docflow/flow/documents/{id}/upload-sessions — Открыть сессию загрузки файла в документ */
  docflowCreateFlowUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowFlowUploadRequest;
    response: models.TransferSession;
  };
  /** POST /api/v1/docflow/approvals/{id}/decisions — Принять решение согласующего */
  docflowDecideApproval: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowApprovalDecisionInput;
    response: models.DocflowApproval;
  };
  /** POST /api/v1/docflow/flow/upload-sessions/{id}/finish — Завершить загрузку и приложить файл к документу */
  docflowFinishFlowUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowFlowUploadResult | models.DocflowFlowOriginal;
  };
  /** POST /api/v1/docflow/flow/documents/{id}/commands — Выполнить команду правки документа */
  docflowFlowChangeDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowFlowChangeInput;
    response: models.DocflowFlowDocument;
  };
  /** GET /api/v1/docflow/flow/contacts — Документы по контрагентам */
  docflowFlowContactStats: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.DocflowFlowContactStatsResponse;
  };
  /** POST /api/v1/docflow/flow/documents — Завести документ внутреннего контура */
  docflowFlowCreateDocument: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocflowFlowCreateInput;
    response: models.DocflowFlowDocument;
  };
  /** GET /api/v1/docflow/flow/documents/{id} — Получить карточку документа */
  docflowFlowDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowFlowDocument;
  };
  /** GET /api/v1/docflow/flow/documents/{id}/revisions/{version} — Получить историческую редакцию документа */
  docflowFlowDocumentRevision: {
    params: { "id": models.UUID; "version": number };
    query: Record<string, never>;
    body: never;
    response: models.DocflowFlowDocument;
  };
  /** GET /api/v1/docflow/flow/documents/{id}/revisions — Получить историю редакций документа */
  docflowFlowDocumentRevisions: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowFlowDocumentRevisionsResponse;
  };
  /** GET /api/v1/docflow/flow/documents — Получить документы внутреннего контура */
  docflowFlowDocuments: {
    params: Record<string, never>;
    query: { "awaiting_my_approval"?: "true" | "false"; "company_id"?: models.UUID; "contact_id"?: models.UUID; "contact_ids"?: string; "deal"?: "yes" | "no"; "kind"?: models.DocflowFlowKind; "kinds"?: string; "limit"?: number; "offset"?: number; "regular"?: "true" | "false"; "related_to"?: models.UUID; "search"?: string; "status"?: "draft" | "registered" | "archived"; "validity"?: "active" | "expiring" | "expired"; "with"?: string };
    body: never;
    response: models.DocflowFlowPage;
  };
  /** GET /api/v1/docflow/flow/documents/{id}/files/{fileId}/content — Скачать файл документа */
  docflowFlowFileContent: {
    params: { "fileId": models.UUID; "id": models.UUID };
    query: { "preview"?: "1" };
    body: never;
    response: void;
  };
  /** GET /api/v1/docflow/flow/documents/{id}/files/{fileId}/download-session — Временный адрес файла документа */
  docflowFlowFileDownloadSession: {
    params: { "fileId": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.TransferDownloadLink;
  };
  /** GET /api/v1/docflow/flow/documents/{id}/revisions/{version}/files/{fileId}/content — Скачать файл исторической редакции */
  docflowFlowRevisionFileContent: {
    params: { "fileId": models.UUID; "id": models.UUID; "version": number };
    query: { "preview"?: "1" };
    body: never;
    response: void;
  };
  /** GET /api/v1/docflow/flow/documents/{id}/revisions/{version}/files/{fileId}/download-session — Временный адрес файла исторической редакции */
  docflowFlowRevisionFileDownloadSession: {
    params: { "fileId": models.UUID; "id": models.UUID; "version": number };
    query: Record<string, never>;
    body: never;
    response: models.TransferDownloadLink;
  };
  /** GET /api/v1/docflow/flow/documents/{id}/signatures/sheet — Скачать лист электронной подписи документа */
  docflowFlowSignatureSheet: {
    params: { "id": models.UUID };
    query: { "signature"?: models.UUID };
    body: never;
    response: void;
  };
  /** GET /api/v1/docflow/flow/documents/{id}/signatures/sheet/download-session — Временный адрес листа электронной подписи */
  docflowFlowSignatureSheetDownloadSession: {
    params: { "id": models.UUID };
    query: { "signature"?: models.UUID };
    body: never;
    response: models.TransferDownloadLink;
  };
  /** GET /api/v1/docflow/flow/upload-sessions/{id} — Состояние сессии загрузки файла в документ */
  docflowGetFlowUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.TransferSession;
  };
  /** GET /api/v1/docflow/messages/{id} — Получить пакет документов */
  docflowGetMessage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowMessage;
  };
  /** POST /api/v1/docflow/flow/advance-invoices — Выставить счёт-фактуру на аванс */
  docflowIssueAdvanceInvoice: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocflowAdvanceInvoiceInput;
    response: models.DocflowFlowDocument;
  };
  /** POST /api/v1/docflow/sales/{id}/act — Сделать акт по продаже */
  docflowIssueSaleAct: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowOrderActInput;
    response: models.DocflowFlowDocument;
  };
  /** POST /api/v1/docflow/sales/{id}/invoice — Выставить счёт на оплату по продаже */
  docflowIssueSaleInvoice: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowOrderInvoiceInput;
    response: models.DocflowFlowDocument;
  };
  /** POST /api/v1/docflow/sales/{id}/upd — Сделать УПД по продаже */
  docflowIssueSaleUPD: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowOrderUPDInput;
    response: models.DocflowFlowDocument;
  };
  /** POST /api/v1/docflow/sale-templates/{id}/past-acts — Выпустить акты за прошедшие периоды шаблона */
  docflowIssueTemplatePastActs: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowTemplatePastActs;
  };
  /** GET /api/v1/docflow/connections — Получить подключения к операторам ЭДО */
  docflowListConnections: {
    params: Record<string, never>;
    query: { "all"?: "1"; "company"?: models.UUID; "provider"?: "saby" | "diadoc" };
    body: never;
    response: models.DocflowConnectionList;
  };
  /** GET /api/v1/docflow/messages — Получить пакеты документов оператора */
  docflowListMessages: {
    params: Record<string, never>;
    query: { "actions_due"?: "1"; "company"?: models.UUID; "connection"?: models.UUID; "contact"?: models.UUID; "counterparty_inn"?: string; "date_from"?: string; "date_to"?: string; "direction"?: "incoming" | "outgoing"; "limit"?: number; "offset"?: number; "state_category"?: models.DocflowStateCategory; "state_code"?: string };
    body: never;
    response: models.DocflowMessageList;
  };
  /** GET /api/v1/docflow/payment-requests/route-preview — Предварительно определить путь заявки на оплату */
  docflowPaymentRequestRoutePreview: {
    params: Record<string, never>;
    query: { "amount"?: string; "company_id"?: models.UUID; "contact_id"?: models.UUID; "currency"?: string; "item_id"?: models.UUID };
    body: never;
    response: models.DocflowPaymentRequestRoutePreview;
  };
  /** POST /api/v1/docflow/approvals/{id}/resubmit — Отправить предмет повторно после доработки */
  docflowResubmitApproval: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowApprovalResubmitInput;
    response: models.DocflowApproval;
  };
  /** GET /api/v1/docflow/sales/{id}/set — Получить комплект документов продажи */
  docflowSaleDocumentSet: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowOrderDocumentSet;
  };
  /** POST /api/v1/docflow/approvals — Отправить предмет на согласование */
  docflowSubmitApproval: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocflowApprovalSubject;
    response: models.DocflowApproval;
  };
  /** GET /api/v1/docflow/sale-templates/{id}/past-acts — Акты за прошедшие периоды шаблона — предпросмотр */
  docflowTemplatePastActs: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowTemplatePastActs;
  };
  /** DELETE /api/v1/files/uploads/{id} — Отменить загрузку */
  filesAbortUpload: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/files/uploads/{id}/complete — Завершить загрузку */
  filesCompleteUpload: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FilesFile;
  };
  /** GET /api/v1/files/items/{id}/content-url — Временный адрес содержимого */
  filesContentLink: {
    params: { "id": models.UUID };
    query: { "kind"?: "content" | "preview" | "thumbnail" };
    body: never;
    response: models.FilesContentLinkResponse;
  };
  /** POST /api/v1/files/folders — Создать папку */
  filesCreateFolder: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FilesFolderInput;
    response: models.FilesFolder;
  };
  /** POST /api/v1/files/shares — Выпустить внешнюю ссылку */
  filesCreateShare: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FilesShareInput;
    response: models.FilesShare;
  };
  /** POST /api/v1/files/shortcuts — Создать ярлык на внешний ресурс */
  filesCreateShortcut: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FilesCreateShortcutRequest;
    response: models.FilesFile;
  };
  /** GET /api/v1/files/folders/{id}/access — Получить состав участников папки */
  filesFolderAccess: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FilesAccessPolicy;
  };
  /** GET /api/v1/files/items/{id} — Получить карточку файла */
  filesGetFile: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FilesFile;
  };
  /** GET /api/v1/files/folders/{id}/entries — Получить содержимое папки */
  filesListEntries: {
    params: { "id": models.UUID };
    query: { "limit"?: number; "offset"?: number; "order"?: "asc" | "desc"; "q"?: string; "sort"?: "name" | "size" | "updated" | "type" };
    body: never;
    response: models.FilesListing;
  };
  /** GET /api/v1/files/roots — Получить доступные хранилища */
  filesListRoots: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.FilesListRootsResponse;
  };
  /** GET /api/v1/files/items/{id}/versions — История версий файла */
  filesListVersions: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FilesListVersionsResponse;
  };
  /** DELETE /api/v1/files/shares/{id} — Отозвать внешнюю ссылку */
  filesRevokeShare: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/files/search — Найти файлы */
  filesSearch: {
    params: Record<string, never>;
    query: { "limit"?: number; "offset"?: number; "q": string; "root_id"?: models.UUID };
    body: never;
    response: models.FilesSearchResponse;
  };
  /** POST /api/v1/files/uploads — Открыть загрузку файла */
  filesStartUpload: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FilesUploadInput;
    response: models.FilesUpload;
  };
  /** GET /api/v1/files/uploads/{id} — Узнать принятые части загрузки */
  filesUploadStatus: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FilesUpload;
  };
  /** GET /api/v1/files/versions/{id}/content-url — Временный адрес версии файла */
  filesVersionContentLink: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FilesVersionContentLinkResponse;
  };
  /** GET /api/v1/finance/accountable/balances — Получить остатки подотчётных лиц */
  financeAccountableBalances: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "on"?: string };
    body: never;
    response: models.FinanceAccountableBalances;
  };
  /** POST /api/v1/finance/settlements/allocation-rules — Добавить версию правила авторазнесения */
  financeAddAllocationRule: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceAllocationRuleInput;
    response: models.FinanceAllocationRule;
  };
  /** POST /api/v1/finance/taxes/settings/recipients — Взять получателя ЕНС образцом с платежа */
  financeAddTaxRecipientFromPayment: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceTaxRecipientFromPaymentInput;
    response: models.FinanceTaxSettings;
  };
  /** POST /api/v1/finance/settlements/unapplied/apply-rules — Разнести очередь по правилу авторазнесения */
  financeApplyAllocationRules: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceAllocationRuleRunInput;
    response: models.FinanceAllocationRuleRun;
  };
  /** POST /api/v1/finance/exchange/items/{id}/apply — Связать элемент обмена с каноническим документом Akeda */
  financeApplyExchangeItem: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceExchangeApply;
    response: models.FinanceExchangeItem;
  };
  /** POST /api/v1/finance/dividends/decisions/{id}/approve — Утвердить черновик начисления */
  financeApproveDividendDecision: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: { [key: string]: unknown };
  };
  /** POST /api/v1/finance/dividends/policies/{id}/approve — Утвердить политику и архивировать предыдущую версию */
  financeApproveDividendPolicy: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: { [key: string]: unknown };
  };
  /** POST /api/v1/finance/operations/{id}/cancel — Отменить текущий документ операции */
  financeCancelOperation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceOperationAction;
    response: models.FinanceOperation;
  };
  /** POST /api/v1/finance/settlements/documents/{id}/cancel — Отменить проведение документа взаиморасчётов */
  financeCancelSettlementDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** POST /api/v1/finance/taxes/months/{id}/cancel — Отменить «Налоги за месяц» */
  financeCancelTaxMonth: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceTaxMonth;
  };
  /** GET /api/v1/finance/reports/cashflow/entries — Получить расшифровку ячейки отчёта о движении денег */
  financeCashflowEntries: {
    params: Record<string, never>;
    query: { "cfo"?: models.UUID; "company"?: models.UUID; "currency"?: string; "department"?: models.UUID; "from"?: string; "item"?: models.UUID; "project"?: models.UUID; "source"?: models.UUID; "to"?: string };
    body: never;
    response: models.FinanceCashflowEntryPage;
  };
  /** POST /api/v1/finance/cash-operations/{id}/categorize — Проставить статью ДДС кассовой операции */
  financeCategorizeCashOperation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceCashflowEntryCategorize;
    response: void;
  };
  /** POST /api/v1/finance/transactions/{id}/categorize — Привязать операцию к статье ДДС, контрагенту или продаже или закупке */
  financeCategorizeTransaction: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceTransactionCategorize;
    response: models.FinanceTransaction;
  };
  /** POST /api/v1/finance/accounts — Создать банковский счёт */
  financeCreateAccount: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceAccountCreate;
    response: models.FinanceAccount;
  };
  /** POST /api/v1/finance/counterparties/{contactId}/terms — Создать новую версию коммерческих условий */
  financeCreateCounterpartyTerms: {
    params: { "contactId": models.UUID };
    query: Record<string, never>;
    body: models.FinanceCounterpartyTermsCreate;
    response: models.FinanceCounterpartyTerms;
  };
  /** POST /api/v1/finance/dividends/decisions — Создать черновик начисления по закрытому периоду */
  financeCreateDividendDecision: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceDividendDecisionInput;
    response: { [key: string]: unknown };
  };
  /** POST /api/v1/finance/dividends/policies — Создать черновик новой версии политики */
  financeCreateDividendPolicy: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceDividendPolicyInput;
    response: { [key: string]: unknown };
  };
  /** POST /api/v1/finance/accountable/reports — Создать авансовый отчёт */
  financeCreateExpenseReport: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceExpenseReportCreate;
    response: models.CoreDocument;
  };
  /** POST /api/v1/finance/opening-debts — Завести начальный долг контрагента документом */
  financeCreateOpeningDebt: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceOpeningDebtRequest;
    response: models.CoreDocument;
  };
  /** POST /api/v1/finance/operations — Завести продажу или закупку */
  financeCreateOperation: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceOperationCreate;
    response: models.FinanceOperation;
  };
  /** POST /api/v1/finance/operations/{id}/accruals — Провести начисление по плану операции */
  financeCreateOperationAccrual: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceOperationAccrualCreate;
    response: models.FinanceOperationAccrualResult;
  };
  /** POST /api/v1/finance/payment-calendar/plans — Создать ручную плановую строку */
  financeCreatePaymentPlan: {
    params: Record<string, never>;
    query: { "business"?: models.UUID };
    body: models.FinancePaymentPlanInput;
    response: models.FinancePaymentPlan;
  };
  /** POST /api/v1/finance/settlements/documents — Создать типизированный документ взаиморасчётов */
  financeCreateSettlementDocument: {
    params: Record<string, never>;
    query: { "business"?: models.UUID };
    body: models.FinanceSettlementDocumentCreate;
    response: models.CoreDocument;
  };
  /** POST /api/v1/finance/statements — Создать заголовок выписки вручную */
  financeCreateStatement: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceStatementCreate;
    response: models.FinanceStatement;
  };
  /** POST /api/v1/finance/taxes/months — Сохранить черновик «Налоги за месяц» */
  financeCreateTaxMonth: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceTaxMonthInput;
    response: models.FinanceTaxMonth;
  };
  /** POST /api/v1/finance/trade/{id}/acts — Выставить акт финансов по продаже или закупке */
  financeCreateTradeAct: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceOrderActInput;
    response: models.FinanceOperationAccrualResult;
  };
  /** POST /api/v1/finance/transactions — Создать банковскую операцию */
  financeCreateTransaction: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceTransactionCreate;
    response: models.FinanceTransaction;
  };
  /** DELETE /api/v1/finance/acquirers/{id} — Снять выбор эквайера */
  financeDeleteAcquirer: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/finance/settlements/documents/{id} — Удалить черновик документа взаиморасчётов */
  financeDeleteSettlementDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** GET /api/v1/finance/accountable/reports — Получить авансовые отчёты */
  financeExpenseReports: {
    params: Record<string, never>;
    query: { "limit"?: number };
    body: never;
    response: models.CoreDocumentPage;
  };
  /** GET /api/v1/finance/accounts/{id} — Получить карточку банковского счёта */
  financeGetAccount: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceAccount;
  };
  /** GET /api/v1/finance/acquiring/overview — Получить сверку эквайринга */
  financeGetAcquiringOverview: {
    params: Record<string, never>;
    query: { "company_id"?: models.UUID };
    body: never;
    response: models.FinanceAcquiringOverview;
  };
  /** GET /api/v1/finance/acquiring/registries/{id} — Получить реестр провайдера со строками */
  financeGetAcquiringRegistry: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceAcquiringRegistry;
  };
  /** GET /api/v1/finance/reports/balance — Построить управленческий баланс на дату */
  financeGetBalanceReport: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "on"?: string };
    body: never;
    response: models.FinanceBalanceReport;
  };
  /** GET /api/v1/finance/reports/cashflow — Построить отчёт движения денежных средств */
  financeGetCashflowReport: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "company"?: string; "currency"?: string; "from"?: string; "layout"?: models.UUID; "project"?: models.UUID; "source"?: models.UUID; "step"?: "month" | "quarter" | "total"; "to"?: string };
    body: never;
    response: models.FinanceCashflowReport;
  };
  /** GET /api/v1/finance/connectors/{id} — Получить карточку подключения к банку */
  financeGetConnector: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceConnector;
  };
  /** GET /api/v1/finance/counterparties/{contactId}/terms — Получить коммерческие условия на указанную дату */
  financeGetCounterpartyTerms: {
    params: { "contactId": models.UUID };
    query: { "at"?: string; "company_id"?: models.UUID; "currency"?: string };
    body: never;
    response: models.FinanceCounterpartyTerms;
  };
  /** GET /api/v1/finance/dividends/summary — Получить начальное сальдо, начисления, выплаты собственнику, НДФЛ и расшифровку документов */
  financeGetDividendSummary: {
    params: Record<string, never>;
    query: { "as_of"?: string; "business_id"?: models.UUID; "company_id"?: models.UUID; "date_from"?: string; "date_to"?: string };
    body: never;
    response: { [key: string]: unknown };
  };
  /** GET /api/v1/finance/operations/{id} — Получить состояние продажи или закупки */
  financeGetOperation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceOperation;
  };
  /** GET /api/v1/finance/operations/{id}/documents/{documentId}/links — Развернуть документ операции до основания и движений */
  financeGetOperationDocumentLinks: {
    params: { "documentId": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocumentLinks;
  };
  /** GET /api/v1/finance/payment-calendar — Получить платёжный календарь и прогноз остатка */
  financeGetPaymentCalendar: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "company"?: string; "currency"?: string; "from"?: string; "project"?: string; "step"?: "day" | "month" | "quarter"; "to"?: string };
    body: never;
    response: models.FinancePaymentCalendar;
  };
  /** GET /api/v1/finance/payroll/automation — Получить настройку автоначисления зарплаты */
  financeGetPayrollAutomation: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.FinancePayrollAutomationSettings;
  };
  /** GET /api/v1/finance/reports/pnl — Построить отчёт о прибылях и убытках */
  financeGetPnlReport: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "company"?: string; "from"?: string; "layout"?: models.UUID; "project"?: models.UUID; "step"?: "month" | "quarter" | "total"; "to"?: string };
    body: never;
    response: models.FinancePnlReport;
  };
  /** GET /api/v1/finance/project-budgets — Последние 250 версий бюджета проекта и юрлица */
  financeGetProjectBudgetHistory: {
    params: Record<string, never>;
    query: { "company": string; "project": string };
    body: never;
    response: models.FinanceGetProjectBudgetHistoryResponse;
  };
  /** GET /api/v1/finance/reports/projects — Экономика проектов с начала учёта на дату в валюте учёта */
  financeGetProjectEconomics: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "company"?: string; "on"?: string };
    body: never;
    response: models.FinanceProjectReport;
  };
  /** GET /api/v1/finance/transactions/reconciliation — Получить очередь операций, требующих сверки */
  financeGetReconciliation: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.FinanceReconciliation;
  };
  /** GET /api/v1/finance/settlements/documents/{id} — Получить документ взаиморасчётов */
  financeGetSettlementDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** GET /api/v1/finance/settlements/position — Получить коммерческую позицию по контрагенту */
  financeGetSettlementPosition: {
    params: Record<string, never>;
    query: { "at"?: string; "company_id": models.UUID; "contact_id": models.UUID; "currency"?: string };
    body: never;
    response: models.FinanceCommercialPosition;
  };
  /** GET /api/v1/finance/taxes/months/{id} — Получить документ «Налоги за месяц» */
  financeGetTaxMonth: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceTaxMonth;
  };
  /** GET /api/v1/finance/taxes/settings — Получить настройку раздела «Налоги» */
  financeGetTaxSettings: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.FinanceTaxSettings;
  };
  /** GET /api/v1/finance/taxes/summary — Получить сальдо ЕНС и обороты раздела «Налоги» */
  financeGetTaxSummary: {
    params: Record<string, never>;
    query: { "company_id": models.UUID; "date_from": string; "date_to": string };
    body: never;
    response: models.FinanceTaxSummary;
  };
  /** GET /api/v1/finance/transactions/{id} — Получить банковскую операцию с подсказками сверки */
  financeGetTransaction: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceTransaction;
  };
  /** POST /api/v1/finance/acquiring/registries — Загрузить реестр платежей провайдера */
  financeImportAcquiringRegistry: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceAcquiringRegistryInput;
    response: models.FinanceAcquiringRegistryImport;
  };
  /** POST /api/v1/finance/statements/{id}/transactions — Привязать существующие операции к выписке */
  financeLinkStatementTransactions: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceStatementLinkInput;
    response: models.FinanceStatementLinkResult;
  };
  /** GET /api/v1/finance/accounts — Получить доступные банковские счета */
  financeListAccounts: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "q"?: string };
    body: never;
    response: models.FinanceAccountPage;
  };
  /** GET /api/v1/finance/acquirers — Список эквайеров юрлиц */
  financeListAcquirers: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.FinanceAcquirerList;
  };
  /** GET /api/v1/finance/settlements/allocation-rules — Получить правила авторазнесения оплаты */
  financeListAllocationRules: {
    params: Record<string, never>;
    query: { "business"?: models.UUID };
    body: never;
    response: models.FinanceListAllocationRulesResponse;
  };
  /** GET /api/v1/finance/connectors/{id}/accounts — Получить банковские счета подключения и их привязки */
  financeListConnectorAccounts: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceConnectorAccountPage;
  };
  /** GET /api/v1/finance/connectors/providers — Получить поддерживаемые банки и способы подключения */
  financeListConnectorProviders: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.FinanceConnectorProviderPage;
  };
  /** GET /api/v1/finance/connectors/{id}/runs — Получить журнал запусков синхронизации */
  financeListConnectorRuns: {
    params: { "id": models.UUID };
    query: { "limit"?: number };
    body: never;
    response: models.FinanceConnectorSyncRunPage;
  };
  /** GET /api/v1/finance/connectors — Получить подключения к банкам */
  financeListConnectors: {
    params: Record<string, never>;
    query: { "all"?: "1"; "business"?: models.UUID; "provider"?: models.FinanceConnectorProviderKey };
    body: never;
    response: models.FinanceConnectorPage;
  };
  /** GET /api/v1/finance/dividends/access-users — Получить активных пользователей для связи с личной сводкой собственника */
  financeListDividendAccessUsers: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.FinanceListDividendAccessUsersResponse;
  };
  /** GET /api/v1/finance/dividends/automation/runs — Получить историю автозапусков, включая блокировки и причины ошибок */
  financeListDividendAutomationRuns: {
    params: Record<string, never>;
    query: { "limit"?: number; "policy_id"?: models.UUID };
    body: never;
    response: models.FinanceListDividendAutomationRunsResponse;
  };
  /** GET /api/v1/finance/dividends/decisions — Получить начисления дивидендов */
  financeListDividendDecisions: {
    params: Record<string, never>;
    query: { "limit"?: number };
    body: never;
    response: models.FinanceListDividendDecisionsResponse;
  };
  /** GET /api/v1/finance/dividends/owners — Получить владельцев бизнеса на дату или доступных получателей выплаты */
  financeListDividendOwners: {
    params: Record<string, never>;
    query: { "business_id": models.UUID; "on"?: string; "purpose"?: "payment" };
    body: never;
    response: models.FinanceListDividendOwnersResponse;
  };
  /** GET /api/v1/finance/dividends/policies — Получить версии дивидендных политик бизнеса */
  financeListDividendPolicies: {
    params: Record<string, never>;
    query: { "business_id"?: models.UUID; "company_id"?: models.UUID };
    body: never;
    response: models.FinanceListDividendPoliciesResponse;
  };
  /** GET /api/v1/finance/exchange/journal — Получить журнал обмена с внешними системами */
  financeListExchangeJournal: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "limit"?: number; "offset"?: number; "status"?: models.FinanceExchangeStatus };
    body: never;
    response: models.FinanceExchangePage;
  };
  /** GET /api/v1/finance/payment-calendar/operations — Найти операции для подтверждения исполнения плана */
  financeListPaymentFacts: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "currency"?: string; "direction"?: models.FinanceDirection; "from"?: string; "limit"?: number; "offset"?: number; "q"?: string; "to"?: string };
    body: never;
    response: models.FinancePaymentFactPage;
  };
  /** GET /api/v1/finance/payroll/automation/runs — Получить журнал прогонов автоначисления зарплаты */
  financeListPayrollAutomationRuns: {
    params: Record<string, never>;
    query: { "limit"?: number };
    body: never;
    response: models.FinancePayrollRunList;
  };
  /** GET /api/v1/finance/settlements/balances — Получить остатки обязательств, доступных пользователю */
  financeListSettlementBalances: {
    params: Record<string, never>;
    query: { "business"?: models.UUID };
    body: never;
    response: models.FinanceSettlementBalancePage;
  };
  /** GET /api/v1/finance/settlements/documents — Получить журнал документов взаиморасчётов */
  financeListSettlementDocuments: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "date_from"?: string; "date_to"?: string; "include_deleted"?: boolean; "limit"?: number; "offset"?: number; "q"?: string; "status"?: "draft" | "posted" | "cancelled" };
    body: never;
    response: models.CoreDocumentPage;
  };
  /** GET /api/v1/finance/settlements/payments — Получить оплаты с нераспределённым остатком */
  financeListSettlementPayments: {
    params: Record<string, never>;
    query: { "company_id": models.UUID; "contact_id"?: models.UUID; "currency"?: string; "direction"?: "in" | "out"; "offset"?: number; "q"?: string };
    body: never;
    response: models.FinanceSettlementPaymentPage;
  };
  /** GET /api/v1/finance/settlements/sources — Получить доступные документы-основания расчёта */
  financeListSettlementSources: {
    params: Record<string, never>;
    query: { "company_id": models.UUID; "contact_id": models.UUID; "q"?: string };
    body: never;
    response: models.FinanceSettlementSourcePage;
  };
  /** GET /api/v1/finance/statements — Получить выписки кабинета */
  financeListStatements: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "limit"?: number; "offset"?: number };
    body: never;
    response: models.FinanceStatementPage;
  };
  /** GET /api/v1/finance/taxes/kinds — Получить виды налогов раздела «Налоги» */
  financeListTaxKinds: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.FinanceTaxKindPage;
  };
  /** GET /api/v1/finance/taxes/months — Получить документы «Налоги за месяц» */
  financeListTaxMonths: {
    params: Record<string, never>;
    query: { "company_id"?: models.UUID; "limit"?: number; "offset"?: number };
    body: never;
    response: models.FinanceTaxMonthPage;
  };
  /** GET /api/v1/finance/taxes/payments — Получить платежи по статье налогов */
  financeListTaxPayments: {
    params: Record<string, never>;
    query: { "company_id": models.UUID; "date_from": string; "date_to": string };
    body: never;
    response: models.FinanceTaxPaymentPage;
  };
  /** GET /api/v1/finance/transactions — Получить банковские операции */
  financeListTransactions: {
    params: Record<string, never>;
    query: { "account"?: models.UUID; "allocation"?: "unallocated"; "business"?: models.UUID; "direction"?: models.FinanceDirection; "limit"?: number; "match_state"?: string; "offset"?: number };
    body: never;
    response: models.FinanceTransactionPage;
  };
  /** POST /api/v1/finance/transactions/{id}/mark-deleted — Пометить банковскую операцию на удаление */
  financeMarkTransactionDeleted: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceMarkTransactionDeletedRequest;
    response: models.CoreDocument;
  };
  /** POST /api/v1/finance/items/{id}/merge — Объединить статью с другой и удалить её */
  financeMergeItem: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceItemMergeRequest;
    response: models.FinanceItemMergeResult;
  };
  /** POST /api/v1/finance/trade/{id}/advance-offset — Зачесть свободные авансы в долг продажи или закупки */
  financeOffsetTradeAdvances: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: { [key: string]: unknown };
  };
  /** POST /api/v1/finance/dividends/decisions/{id}/post — Провести утверждённое начисление в счета 84 и 75 */
  financePostDividendDecision: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: { [key: string]: unknown };
  };
  /** POST /api/v1/finance/accountable/reports/{id}/post — Провести авансовый отчёт */
  financePostExpenseReport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** POST /api/v1/finance/settlements/documents/{id}/post — Провести документ взаиморасчётов */
  financePostSettlementDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** POST /api/v1/finance/taxes/months/{id}/post — Провести «Налоги за месяц» */
  financePostTaxMonth: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceTaxMonth;
  };
  /** POST /api/v1/finance/z-reports — Провести Z-отчёт смены розницы услуг */
  financePostZReport: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceZReportInput;
    response: models.FinanceZReportResult;
  };
  /** GET /api/v1/finance/dividends/decisions/preview — Рассчитать доступную прибыль и заполнить распределение собственникам */
  financePreviewDividendDecision: {
    params: Record<string, never>;
    query: { "business_id"?: models.UUID; "company_id"?: models.UUID; "period_from": string; "period_to": string; "policy_id"?: models.UUID };
    body: never;
    response: { [key: string]: unknown };
  };
  /** POST /api/v1/finance/items/{id}/merge/preview — Предпросмотр объединения статьи с другой */
  financePreviewItemMerge: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceItemMergeRequest;
    response: models.FinanceItemMergeResult;
  };
  /** POST /api/v1/finance/exchange/items/{id}/quarantine — Поместить элемент обмена в карантин */
  financeQuarantineExchangeItem: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceExchangeQuarantine;
    response: models.FinanceExchangeItem;
  };
  /** GET /api/v1/finance/registers/reconcile — Сверить регистры с операциями и главной книгой */
  financeReconcileRegisters: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.FinanceRegisterReconciliation;
  };
  /** POST /api/v1/finance/exchange/items — Зарегистрировать внешний объект в журнале обмена */
  financeRecordExchangeItem: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceExchangeCreate;
    response: models.FinanceExchangeItem;
  };
  /** POST /api/v1/finance/registers/repair — Атомарно восстановить проводки указанных операций */
  financeRepairRegisters: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceRegisterRepairRequest;
    response: models.FinanceRegisterRepairResult;
  };
  /** POST /api/v1/finance/transactions/{id}/repost — Перепровести банковскую операцию без смены полей */
  financeRepostTransaction: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceRepostTransactionRequest;
    response: { [key: string]: unknown };
  };
  /** POST /api/v1/finance/transactions/repost — Перепровести выбранные банковские операции без смены полей */
  financeRepostTransactions: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceRepostTransactionsRequest;
    response: { [key: string]: unknown };
  };
  /** POST /api/v1/finance/transactions/{id}/restore — Вернуть удалённую банковскую операцию */
  financeRestoreTransaction: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceTransactionRestoreResult;
  };
  /** POST /api/v1/finance/registers/resync — Пересинхронизировать финансовые документы и регистры */
  financeResyncRegisters: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.FinanceRegistersResyncResult;
  };
  /** POST /api/v1/finance/dividends/automation/run — Запустить расчёт наступивших политик текущего кабинета */
  financeRunDividendAutomation: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/finance/payroll/automation/run — Запустить автоначисление зарплаты за месяц */
  financeRunPayrollAutomation: {
    params: Record<string, never>;
    query: { "month"?: string };
    body: never;
    response: models.FinancePayrollRunList;
  };
  /** PUT /api/v1/finance/acquirers — Выбрать эквайера юрлица */
  financeSaveAcquirer: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceAcquirerInput;
    response: models.FinanceAcquirer;
  };
  /** PUT /api/v1/finance/payroll/automation — Сохранить настройку автоначисления зарплаты */
  financeSavePayrollAutomation: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinancePayrollAutomationSettings;
    response: models.FinancePayrollAutomationSettings;
  };
  /** POST /api/v1/finance/project-budgets — Сохранить новую версию бюджета без создания учётных фактов */
  financeSaveProjectBudget: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceProjectBudgetInput;
    response: models.FinanceProjectBudget;
  };
  /** PUT /api/v1/finance/taxes/settings — Сохранить настройку раздела «Налоги» */
  financeSaveTaxSettings: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceTaxSettingsInput;
    response: models.FinanceTaxSettings;
  };
  /** POST /api/v1/finance/connectors/{id}/sync — Запустить синхронизацию подключения вручную */
  financeSyncConnector: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceConnectorSyncResult;
  };
  /** GET /api/v1/finance/trade/{id}/advance-offer — Свободные авансы для зачёта по продаже или закупке */
  financeTradeAdvanceOffer: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: { [key: string]: unknown };
  };
  /** PATCH /api/v1/finance/accounts/{id} — Частично изменить банковский счёт */
  financeUpdateAccount: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceAccountPatch;
    response: models.FinanceAccount;
  };
  /** PATCH /api/v1/finance/cash-operations/{id}/responsible — Изменить инициатора кассовой операции */
  financeUpdateCashOperationResponsible: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceResponsiblePatch;
    response: void;
  };
  /** PATCH /api/v1/finance/connectors/accounts/{accountId} — Привязать внешний счёт к счёту Akeda или изменить импорт */
  financeUpdateConnectorAccount: {
    params: { "accountId": models.UUID };
    query: Record<string, never>;
    body: models.FinanceConnectorAccountPatch;
    response: models.FinanceConnectorAccount;
  };
  /** PUT /api/v1/finance/taxes/months/{id} — Пересохранить черновик «Налоги за месяц» */
  financeUpdateTaxMonth: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceTaxMonthUpdateInput;
    response: models.FinanceTaxMonth;
  };
  /** PATCH /api/v1/finance/transactions/{id}/responsible — Изменить инициатора операции без перепроведения */
  financeUpdateTransactionResponsible: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceResponsiblePatch;
    response: models.FinanceTransaction;
  };
  /** DELETE /api/v1/knowledge/upload-sessions/{sessionId} — Отменить сессию загрузки файла страницы */
  knowledgeAbortAssetUploadSession: {
    params: { "sessionId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/knowledge/answer — Ответить по материалам базы знаний */
  knowledgeAnswer: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.KnowledgeAnswerInput;
    response: models.KnowledgeAnswer;
  };
  /** POST /api/v1/knowledge/assets/{id}/download-session — Временный адрес файла базы знаний */
  knowledgeCreateAssetDownloadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.EmptyObject;
    response: models.KnowledgeAssetLink;
  };
  /** POST /api/v1/knowledge/nodes/{id}/upload-sessions — Открыть сессию загрузки файла на страницу */
  knowledgeCreateAssetUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.TransferUploadRequest;
    response: models.TransferSession;
  };
  /** POST /api/v1/knowledge/nodes — Создать страницу базы знаний */
  knowledgeCreatePage: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.KnowledgeNodeInput;
    response: models.KnowledgeNode;
  };
  /** POST /api/v1/knowledge/spaces — Создать пространство базы знаний */
  knowledgeCreateSpace: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.KnowledgeSpaceInput;
    response: models.KnowledgeSpace;
  };
  /** DELETE /api/v1/knowledge/assets/{id} — Удалить файл базы знаний */
  knowledgeDeleteAsset: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/knowledge/upload-sessions/{sessionId}/finish — Завершить загрузку файла на страницу */
  knowledgeFinishAssetUploadSession: {
    params: { "sessionId": models.UUID };
    query: Record<string, never>;
    body: models.EmptyObject;
    response: models.KnowledgeAsset;
  };
  /** GET /api/v1/knowledge/assets/{id}/content — Скачать содержимое файла базы знаний */
  knowledgeGetAssetContent: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/knowledge/upload-sessions/{sessionId} — Состояние сессии загрузки файла страницы */
  knowledgeGetAssetUploadSession: {
    params: { "sessionId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.TransferSession;
  };
  /** GET /api/v1/knowledge/nodes/{id} — Получить страницу базы знаний */
  knowledgeGetPage: {
    params: { "id": models.UUID };
    query: { "published_only"?: boolean };
    body: never;
    response: models.KnowledgeNode;
  };
  /** GET /api/v1/knowledge/nodes/{id}/access — Получить состав участников страницы */
  knowledgeGetPageAccess: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.KnowledgeNodeAccessPolicy;
  };
  /** GET /api/v1/knowledge/spaces/{id}/access — Получить состав участников пространства */
  knowledgeGetSpaceAccess: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.KnowledgeSpaceAccessPolicy;
  };
  /** GET /api/v1/knowledge/spaces/{id}/tree — Получить дерево страниц пространства */
  knowledgeGetSpaceTree: {
    params: { "id": models.UUID };
    query: { "published_only"?: boolean };
    body: never;
    response: Array<models.KnowledgeNode>;
  };
  /** GET /api/v1/knowledge/access-options — Получить принципалов для списка доступа */
  knowledgeListAccessOptions: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.KnowledgeAccessOptions;
  };
  /** GET /api/v1/knowledge/nodes/{id}/assets — Получить файлы страницы */
  knowledgeListPageAssets: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.KnowledgeAsset>;
  };
  /** GET /api/v1/knowledge/spaces — Получить доступные пространства базы знаний */
  knowledgeListSpaces: {
    params: Record<string, never>;
    query: { "include_archived"?: boolean };
    body: never;
    response: Array<models.KnowledgeSpace>;
  };
  /** GET /api/v1/knowledge/archive — Получить страницы в корзине */
  knowledgeListTrashedPages: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: Array<models.KnowledgeNode>;
  };
  /** POST /api/v1/knowledge/nodes/{id}/move — Перенести страницу в дереве пространства */
  knowledgeMovePage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.KnowledgeMoveInput;
    response: models.KnowledgeNode;
  };
  /** POST /api/v1/knowledge/nodes/{id}/publish — Опубликовать редакцию страницы */
  knowledgePublishPage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.KnowledgeVersionInput;
    response: models.KnowledgeNode;
  };
  /** PUT /api/v1/knowledge/nodes/{id}/access — Заменить состав участников страницы */
  knowledgeReplacePageAccess: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.KnowledgeNodeAccessInput;
    response: models.KnowledgeNodeAccessPolicy;
  };
  /** PUT /api/v1/knowledge/spaces/{id}/access — Заменить состав участников пространства */
  knowledgeReplaceSpaceAccess: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.KnowledgeSpaceAccessInput;
    response: models.KnowledgeSpaceAccessPolicy;
  };
  /** POST /api/v1/knowledge/nodes/{id}/restore — Вернуть страницу из корзины */
  knowledgeRestorePage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.KnowledgeVersionInput;
    response: models.KnowledgeNode;
  };
  /** POST /api/v1/knowledge/nodes/{id}/revisions — Сохранить черновую редакцию страницы */
  knowledgeSavePageRevision: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.KnowledgeRevisionInput;
    response: models.KnowledgeNode;
  };
  /** GET /api/v1/knowledge/search — Найти материалы базы знаний */
  knowledgeSearch: {
    params: Record<string, never>;
    query: { "limit"?: number; "q": string };
    body: never;
    response: Array<models.KnowledgeSearchResult>;
  };
  /** POST /api/v1/knowledge/nodes/{id}/submit — Отправить редакцию на согласование */
  knowledgeSubmitPage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.KnowledgeReviewInput;
    response: models.KnowledgeNode;
  };
  /** POST /api/v1/knowledge/nodes/{id}/archive — Убрать страницу в корзину */
  knowledgeTrashPage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.KnowledgeVersionInput;
    response: models.KnowledgeNode;
  };
  /** POST /api/v1/knowledge/nodes/{id}/assets — Прикрепить файл к странице базы знаний */
  knowledgeUploadPageAsset: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.KnowledgeAsset;
  };
  /** DELETE /api/v1/mail/upload-sessions/{id} — Отменить сессию загрузки */
  mailAbortUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/mail/accounts/{id}/rules/apply — Применить правила к уже лежащим письмам */
  mailApplyRules: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MailApplyRulesRequest;
    response: models.MailApplyRulesResponse;
  };
  /** POST /api/v1/mail/accounts/{id}/uploads/from-file — Приложить к письму файл из хранилища */
  mailAttachStoredFile: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MailAttachStoredFileRequest;
    response: models.MailOutboundUpload;
  };
  /** GET /api/v1/mail/attachments/{id}/download-session — Временный адрес вложения письма */
  mailAttachmentDownloadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MailAttachmentLink;
  };
  /** POST /api/v1/mail/accounts/{id}/messages — Отправить письмо или сохранить черновик */
  mailComposeMessage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MailComposeInput;
    response: models.MailComposeMessageResponse;
  };
  /** GET /api/v1/mail/vip-senders/unread — Число непрочитанных писем от важных отправителей */
  mailCountVIPUnread: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.MailCountVIPUnreadResponse;
  };
  /** POST /api/v1/mail/accounts/{id}/folders — Создать папку ящика */
  mailCreateFolder: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MailFolderInput;
    response: models.MailFolder;
  };
  /** POST /api/v1/mail/accounts/{id}/rules — Создать правило разбора почты */
  mailCreateRule: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MailRuleInput;
    response: models.MailRule;
  };
  /** POST /api/v1/mail/accounts/{id}/upload-sessions — Открыть сессию загрузки файла для письма */
  mailCreateUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.TransferUploadRequest;
    response: models.TransferSession;
  };
  /** DELETE /api/v1/mail/folders/{id} — Удалить пользовательскую папку */
  mailDeleteFolder: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/mail/messages/{id} — Переложить письмо в корзину */
  mailDeleteMessage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/mail/rules/{id} — Удалить правило разбора почты */
  mailDeleteRule: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/mail/upload-sessions/{id}/finish — Завершить загрузку файла для письма */
  mailFinishUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MailOutboundUpload;
  };
  /** POST /api/v1/mail/messages/{id}/flag — Поставить или снять отметку важности */
  mailFlagMessage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MailFlagMessageRequest;
    response: void;
  };
  /** GET /api/v1/mail/accounts/{id} — Получить почтовый ящик */
  mailGetAccount: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MailAccount;
  };
  /** GET /api/v1/mail/attachments/{id}/content — Скачать вложение письма */
  mailGetAttachmentContent: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/mail/messages/{id} — Получить письмо целиком */
  mailGetMessage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MailMessage;
  };
  /** GET /api/v1/mail/threads/{id} — Получить переписку целиком */
  mailGetThread: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MailThread;
  };
  /** GET /api/v1/mail/upload-sessions/{id} — Состояние сессии загрузки */
  mailGetUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.TransferSession;
  };
  /** GET /api/v1/mail/accounts — Получить почтовые ящики сотрудника */
  mailListAccounts: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.MailListAccountsResponse;
  };
  /** GET /api/v1/mail/accounts/{id}/folders — Получить папки ящика */
  mailListFolders: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MailListFoldersResponse;
  };
  /** GET /api/v1/mail/messages/{id}/attachments — Получить вложения письма */
  mailListMessageAttachments: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MailListMessageAttachmentsResponse;
  };
  /** GET /api/v1/mail/messages — Получить письма по фильтру */
  mailListMessages: {
    params: Record<string, never>;
    query: { "account_id"?: models.UUID; "folder_id"?: models.UUID; "folder_role"?: models.MailFolderRole; "from"?: string; "has_files"?: boolean; "is_flagged"?: boolean; "is_read"?: boolean; "limit"?: number; "offset"?: number; "q"?: string; "sent_after"?: string; "sent_before"?: string; "spam_verdict"?: models.MailSpamVerdict; "thread_id"?: models.UUID };
    body: never;
    response: models.MailMessagePage;
  };
  /** GET /api/v1/mail/accounts/{id}/outbox — Получить очередь отправки ящика */
  mailListOutbox: {
    params: { "id": models.UUID };
    query: { "limit"?: number; "offset"?: number };
    body: never;
    response: models.MailOutboundPage;
  };
  /** GET /api/v1/mail/people — Получить сотрудников для поимённого доступа к ящику */
  mailListPeople: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.MailListPeopleResponse;
  };
  /** GET /api/v1/mail/providers — Получить подсказки почтовых провайдеров */
  mailListProviders: {
    params: Record<string, never>;
    query: { "email"?: string };
    body: never;
    response: models.MailListProvidersResponse;
  };
  /** GET /api/v1/mail/accounts/{id}/rules — Получить правила разбора ящика */
  mailListRules: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MailListRulesResponse;
  };
  /** GET /api/v1/mail/vip-senders — Список важных отправителей кабинета */
  mailListVIPSenders: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.MailListVIPSendersResponse;
  };
  /** POST /api/v1/mail/messages/{id}/not-spam — Вернуть письмо из спама */
  mailMarkMessageNotSpam: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/mail/messages/{id}/read — Отметить письмо прочитанным */
  mailMarkMessageRead: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/mail/messages/{id}/spam — Отправить письмо в спам */
  mailMarkMessageSpam: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/mail/messages/{id}/unread — Снять отметку прочтения */
  mailMarkMessageUnread: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/mail/messages/{id}/move — Переложить письмо в другую папку */
  mailMoveMessage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MailMoveMessageRequest;
    response: void;
  };
  /** POST /api/v1/mail/messages/read — Отметить письма, папку или весь выбранный вид прочитанными */
  mailReadBatch: {
    params: Record<string, never>;
    query: { "account_id"?: models.UUID; "all_matching"?: boolean; "folder_id"?: models.UUID; "folder_name"?: string; "folder_role"?: string; "is_read"?: boolean; "is_vip"?: boolean; "q"?: string; "sent_after"?: string; "sent_before"?: string };
    body: models.MailReadBatchRequest;
    response: models.MailReadBatchResponse;
  };
  /** PATCH /api/v1/mail/folders/{id} — Переименовать папку ящика */
  mailRenameFolder: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MailFolderInput;
    response: models.MailFolder;
  };
  /** POST /api/v1/mail/vip-senders — Добавить или убрать важного отправителя */
  mailSetVIPSender: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MailSetVIPSenderRequest;
    response: void;
  };
  /** POST /api/v1/mail/accounts/{id}/sync — Синхронизировать ящик по требованию */
  mailSyncAccount: {
    params: { "id": models.UUID };
    query: { "folder_id"?: models.UUID };
    body: never;
    response: models.MailSyncReport;
  };
  /** PATCH /api/v1/mail/rules/{id} — Изменить правило разбора почты */
  mailUpdateRule: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MailRuleInput;
    response: models.MailRule;
  };
  /** POST /api/v1/marketplace/ozon/stores — Завести магазин Ozon */
  marketplaceCreateOzonStore: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarketplaceStoreInput;
    response: models.MarketplaceStore;
  };
  /** POST /api/v1/marketplace/wb/stores — Завести магазин Wildberries */
  marketplaceCreateWbStore: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarketplaceStoreInput;
    response: models.MarketplaceStore;
  };
  /** POST /api/v1/marketplace/yandex/stores — Завести магазин Яндекс Маркета */
  marketplaceCreateYandexStore: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarketplaceStoreInput;
    response: models.MarketplaceStore;
  };
  /** GET /api/v1/marketplace/ozon/decomposition — Получить декомпозицию юнит-экономики Ozon */
  marketplaceOzonDecomposition: {
    params: Record<string, never>;
    query: { "group"?: string; "month"?: string; "store"?: string };
    body: never;
    response: models.MarketplaceOzonDecomposition;
  };
  /** GET /api/v1/marketplace/ozon/orders/overview — Получить сводку заказов Ozon */
  marketplaceOzonOrdersOverview: {
    params: Record<string, never>;
    query: { "from"?: string; "group"?: string; "scheme"?: "all" | "fbo" | "fbs"; "store"?: string; "summary"?: "1"; "to"?: string };
    body: never;
    response: models.MarketplaceOzonOrdersOverview;
  };
  /** GET /api/v1/marketplace/ozon/pnl — Получить отчёт о прибылях и убытках Ozon */
  marketplaceOzonPnl: {
    params: Record<string, never>;
    query: { "group"?: string; "period"?: "week" | "month"; "scheme"?: "all" | "fbo" | "fbs"; "store"?: string; "year"?: number };
    body: never;
    response: models.MarketplaceOzonPnl;
  };
  /** GET /api/v1/marketplace/ozon/products — Получить товары Ozon */
  marketplaceOzonProducts: {
    params: Record<string, never>;
    query: { "group"?: string; "page"?: number; "page_size"?: number; "q"?: string; "search"?: string; "status"?: string; "store"?: string; "subject"?: string };
    body: never;
    response: models.MarketplaceOzonProductPage;
  };
  /** POST /api/v1/marketplace/ozon/cost — Задать себестоимость товара Ozon */
  marketplaceOzonSetCost: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarketplaceOzonCostRequest;
    response: models.MarketplaceOzonCost;
  };
  /** GET /api/v1/marketplace/ozon/stocks — Получить остатки Ozon по складам */
  marketplaceOzonStocks: {
    params: Record<string, never>;
    query: { "group"?: string; "q"?: string; "search"?: string; "store"?: string };
    body: never;
    response: models.MarketplaceOzonStocksPage;
  };
  /** GET /api/v1/marketplace/ozon/stores — Получить магазины Ozon */
  marketplaceOzonStores: {
    params: Record<string, never>;
    query: { "all"?: "1"; "reports"?: "1" };
    body: never;
    response: models.MarketplaceStorePage;
  };
  /** GET /api/v1/marketplace/ozon/sync-jobs — Получить задания синхронизации Ozon */
  marketplaceOzonSyncJobs: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.MarketplaceOzonSyncJobList;
  };
  /** POST /api/v1/marketplace/yandex/cost — Задать себестоимость товара Яндекс Маркета */
  marketplaceSetYandexCost: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarketplaceYandexCostInput;
    response: models.MarketplaceYandexCost;
  };
  /** GET /api/v1/marketplace/wb/card/board — Получить борд одной карточки Wildberries */
  marketplaceWbCardBoard: {
    params: Record<string, never>;
    query: { "nm": number; "store": models.UUID };
    body: never;
    response: models.MarketplaceWbCardBoard;
  };
  /** GET /api/v1/marketplace/wb/card/options — Получить список карточек Wildberries для разбора */
  marketplaceWbCardOptions: {
    params: Record<string, never>;
    query: { "store": models.UUID };
    body: never;
    response: models.MarketplaceWbCardOptions;
  };
  /** GET /api/v1/marketplace/wb/decomposition — Получить декомпозицию прибыли Wildberries */
  marketplaceWbDecomposition: {
    params: Record<string, never>;
    query: { "month"?: string; "store"?: string };
    body: never;
    response: models.MarketplaceWbDecomposition;
  };
  /** GET /api/v1/marketplace/wb/orders/overview — Получить сводку заказов и продаж Wildberries */
  marketplaceWbOrdersOverview: {
    params: Record<string, never>;
    query: { "from"?: string; "store"?: string; "summary"?: "1"; "to"?: string };
    body: never;
    response: models.MarketplaceWbOrdersOverview;
  };
  /** GET /api/v1/marketplace/wb/pnl — Получить отчёт о прибылях и убытках Wildberries */
  marketplaceWbPnl: {
    params: Record<string, never>;
    query: { "group"?: string; "period"?: "week" | "month"; "store"?: string; "year"?: number };
    body: never;
    response: models.MarketplaceWbPnl;
  };
  /** GET /api/v1/marketplace/wb/products — Получить товары Wildberries */
  marketplaceWbProducts: {
    params: Record<string, never>;
    query: { "brand"?: string; "group"?: string; "page"?: number; "page_size"?: number; "q"?: string; "search"?: string; "store"?: string; "subject"?: string };
    body: never;
    response: models.MarketplaceWbProductPage;
  };
  /** POST /api/v1/marketplace/wb/cost — Задать себестоимость артикула Wildberries */
  marketplaceWbSetCost: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarketplaceWbCostRequest;
    response: models.MarketplaceWbCost;
  };
  /** GET /api/v1/marketplace/wb/stocks — Получить остатки Wildberries по складам */
  marketplaceWbStocks: {
    params: Record<string, never>;
    query: { "group"?: string; "q"?: string; "search"?: string; "store"?: string };
    body: never;
    response: models.MarketplaceWbStockPage;
  };
  /** GET /api/v1/marketplace/wb/stores — Получить магазины Wildberries */
  marketplaceWbStores: {
    params: Record<string, never>;
    query: { "all"?: "1"; "reports"?: "1" };
    body: never;
    response: models.MarketplaceStorePage;
  };
  /** GET /api/v1/marketplace/yandex/orders/overview — Получить сводку заказов Яндекс Маркета */
  marketplaceYandexOrdersOverview: {
    params: Record<string, never>;
    query: { "from"?: string; "group"?: string; "store"?: string; "summary"?: "1"; "to"?: string };
    body: never;
    response: models.MarketplaceYandexOrdersOverview;
  };
  /** GET /api/v1/marketplace/yandex/pnl — Получить отчёт о прибылях и убытках Яндекс Маркета */
  marketplaceYandexPnl: {
    params: Record<string, never>;
    query: { "group"?: string; "period"?: "week" | "month"; "scheme"?: string; "store"?: string; "year"?: number };
    body: never;
    response: models.MarketplaceYandexPnl;
  };
  /** GET /api/v1/marketplace/yandex/products — Получить витрину товаров Яндекс Маркета */
  marketplaceYandexProducts: {
    params: Record<string, never>;
    query: { "group"?: string; "page"?: number; "page_size"?: number; "q"?: string; "search"?: string; "status"?: string; "store"?: string };
    body: never;
    response: models.MarketplaceYandexProductPage;
  };
  /** GET /api/v1/marketplace/yandex/stores — Получить магазины Яндекс Маркета */
  marketplaceYandexStores: {
    params: Record<string, never>;
    query: { "all"?: "1"; "reports"?: "1" };
    body: never;
    response: models.MarketplaceStorePage;
  };
  /** GET /api/v1/print/forms/{kind}/{id}/download-session — Временный адрес печатной формы документа */
  printFormDownloadSession: {
    params: { "id": models.UUID; "kind": string };
    query: { "facsimile"?: boolean; "template"?: string };
    body: never;
    response: models.TransferDownloadLink;
  };
  /** GET /api/v1/settings/companies — Получить юрлица кабинета */
  settingsListCompanies: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.SettingsCompanyPage;
  };
  /** GET /api/v1/settings/members — Получить участников кабинета */
  settingsListMembers: {
    params: Record<string, never>;
    query: { "status"?: "active" | "disabled" | "all" };
    body: never;
    response: models.SettingsMemberPage;
  };
  /** GET /api/v1/settings/roles — Получить роли кабинета */
  settingsListRoles: {
    params: Record<string, never>;
    query: { "status"?: "active" | "disabled" | "all" };
    body: never;
    response: models.SettingsRolePage;
  };
  /** GET /api/v1/settings/companies/selectable — Получить юрлица для фильтров и полей выбора */
  settingsListSelectableCompanies: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.SettingsCompanyPage;
  };
  /** GET /api/v1/settings/vat-rates — Получить профиль ставок НДС */
  settingsListVatRates: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.SettingsVatRates;
  };
  /** PUT /api/v1/settings/members/{id}/access — Заменить бизнесы сотрудника */
  settingsReplaceMemberAccess: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.SettingsMemberAccessInput;
    response: models.SettingsMember;
  };
  /** DELETE /api/v1/stock/upload-sessions/{id} — Отменить сессию загрузки склада */
  stockAbortUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/stock/account-transfers/proposal — Показать остаток запасов, который надо перенести на счёт по новому правилу */
  stockAccountTransferProposal: {
    params: Record<string, never>;
    query: { "business_id"?: models.UUID; "date": string };
    body: never;
    response: models.StockAccountTransferProposal;
  };
  /** POST /api/v1/stock/imports/{id}/apply — Атомарно применить подтверждённый preview */
  stockApplyImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockImportApplyRequest;
    response: models.StockImportRun;
  };
  /** POST /api/v1/stock/warehouses/{id}/zones/allocation — Разнести остаток склада по зонам */
  stockApplyWarehouseZoneAllocation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockZoneAllocationInput;
    response: models.StockZoneAllocationResult;
  };
  /** POST /api/v1/stock/documents/{id}/cancel — Отменить проведение складского документа */
  stockCancelDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/account-transfers — Создать черновик переноса остатка на счёт по новому правилу */
  stockCreateAccountTransfer: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockAccountTransferCreate;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/assembly-specs — Завести новую версию спецификации */
  stockCreateAssemblySpec: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockAssemblySpecCreate;
    response: models.StockAssemblySpec;
  };
  /** POST /api/v1/stock/claim-writeoffs — Создать черновик списания претензии поставщику */
  stockCreateClaimWriteoff: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockClaimWriteoffCreate;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/documents — Создать черновик складского документа */
  stockCreateDocument: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockDocumentCreate;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/exports — Сформировать складской снимок для скачивания */
  stockCreateExport: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockExportRequest;
    response: models.StockExport;
  };
  /** POST /api/v1/stock/imports/upload-sessions — Открыть сессию загрузки файла складского импорта */
  stockCreateImportUploadSession: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockImportUploadSessionRequest;
    response: models.TransferSession;
  };
  /** POST /api/v1/stock/opening-balances — Создать черновик ввода начальных остатков товара */
  stockCreateOpeningBalance: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockOpeningBalanceCreate;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/purchasing/purchases — Создать закупку по рассчитанной потребности */
  stockCreatePurchase: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockPurchaseOrderCreate;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/receipt-corrections — Создать черновик корректировки приёмки по УКД поставщика */
  stockCreateReceiptCorrection: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockReceiptCorrectionCreate;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/warehouses — Создать склад */
  stockCreateWarehouse: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockWarehouseInput;
    response: models.StockWarehouse;
  };
  /** POST /api/v1/stock/warehouses/{id}/zones — Завести зону склада */
  stockCreateWarehouseZone: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockWarehouseZoneInput;
    response: models.StockWarehouse;
  };
  /** POST /api/v1/stock/warehouses/{id}/deactivate — Вывести склад из работы */
  stockDeactivateWarehouse: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockWarehouse;
  };
  /** POST /api/v1/stock/documents/{id}/derive — Создать акты списания и оприходования по инвентаризации */
  stockDeriveInventoryActs: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockInventoryDeriveResult;
  };
  /** POST /api/v1/stock/warehouses/{id}/zones/disable — Выключить зоны склада одним действием */
  stockDisableWarehouseZones: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockZoneAllocationInput;
    response: models.StockZoneAllocationResult;
  };
  /** DELETE /api/v1/stock/warehouses/{id}/zones/allocation/draft — Удалить черновик разнесения */
  stockDropWarehouseZoneAllocationDraft: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/stock/warehouses/{id}/zones/enable — Включить зоны склада */
  stockEnableWarehouseZones: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockWarehouse;
  };
  /** GET /api/v1/stock/exports/{id}/download-session — Временный адрес файла своего складского экспорта */
  stockExportDownloadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockDownloadLink;
  };
  /** POST /api/v1/stock/documents/{id}/inventory-finish — Завершить пересчёт инвентаризации */
  stockFinishInventoryCount: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockInventoryFinishInput;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/upload-sessions/{id}/finish — Завершить загрузку файла складского импорта */
  stockFinishUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockUploadFinishResult;
  };
  /** GET /api/v1/stock/assembly-specs/{id} — Получить версию спецификации */
  stockGetAssemblySpec: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockAssemblySpec;
  };
  /** GET /api/v1/stock/documents/{id} — Получить складской документ */
  stockGetDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** GET /api/v1/stock/documents/{id}/blockers — Проверить доступность проведения, отмены и пометки удаления */
  stockGetDocumentBlockers: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocumentBlockers;
  };
  /** GET /api/v1/stock/documents/{id}/fulfillment — Получить остаток исполнения заявки или продажи или закупки */
  stockGetDocumentFulfillment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockDocumentFulfillment;
  };
  /** GET /api/v1/stock/documents/{id}/links — Получить основания, зависимые документы и движения складского документа */
  stockGetDocumentLinks: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocumentLinks;
  };
  /** GET /api/v1/stock/exports/{id} — Получить метаданные своего складского экспорта */
  stockGetExport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockExport;
  };
  /** GET /api/v1/stock/exports/{id}/content — Скачать файл своего складского экспорта */
  stockGetExportContent: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/stock/handling-units/{id} — Получить карточку физической складской единицы */
  stockGetHandlingUnit: {
    params: { "id": models.UUID };
    query: { "limit"?: number };
    body: never;
    response: models.StockHandlingUnitCard;
  };
  /** GET /api/v1/stock/imports/{id} — Получить состояние складского импорта */
  stockGetImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockImportRun;
  };
  /** GET /api/v1/stock/imports/{id}/errors — Получить структурированные ошибки или XLSX-отчёт */
  stockGetImportErrors: {
    params: { "id": models.UUID };
    query: { "format"?: "json" | "xlsx" };
    body: never;
    response: models.CoreProductImportIssuePage;
  };
  /** GET /api/v1/stock/imports/{id}/source — Скачать исходный файл своего прогона импорта */
  stockGetImportSource: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/stock/import-templates/{kind} — Скачать шаблон складского импорта */
  stockGetImportTemplate: {
    params: { "kind": models.StockImportKind };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/stock/documents/{id}/count-sheet — Получить бланк пересчёта инвентаризации */
  stockGetInventoryCountSheet: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockInventoryCountSheet;
  };
  /** GET /api/v1/stock/report/reservations/overdue — Получить просроченные резервы */
  stockGetOverdueReservations: {
    params: Record<string, never>;
    query: { "as_of"?: string; "company_id"?: models.UUID; "limit"?: number; "warehouse_id"?: models.UUID };
    body: never;
    response: models.StockReportOverduePage;
  };
  /** GET /api/v1/stock/report/purchasing — Получить отчёт потребности в закупке */
  stockGetPurchasingReport: {
    params: Record<string, never>;
    query: { "business_id"?: models.UUID; "company_id"?: models.UUID; "demand_from"?: string; "demand_to"?: string; "expected_from"?: string; "expected_to"?: string; "include_empty"?: boolean; "limit"?: number; "min_from"?: string; "min_to"?: string; "offset"?: number; "on_hand_from"?: string; "on_hand_to"?: string; "projected_from"?: string; "projected_to"?: string; "q"?: string; "reserved_from"?: string; "reserved_to"?: string; "suggested_from"?: string; "suggested_to"?: string; "warehouse_id"?: models.UUID };
    body: never;
    response: models.StockReportPurchasingPage;
  };
  /** GET /api/v1/stock/documents/{id}/claim — Получить остаток претензии приёмки по недостаче */
  stockGetReceiptClaimBalance: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockReceiptClaimBalance;
  };
  /** GET /api/v1/stock/report/reservations — Получить сводку по резервам */
  stockGetReservationSummaries: {
    params: Record<string, never>;
    query: { "as_of"?: string; "company_id"?: models.UUID; "limit"?: number; "warehouse_id"?: models.UUID };
    body: never;
    response: models.StockReportReservationPage;
  };
  /** GET /api/v1/stock/sales/{id}/shipping — Получить исполнение продажи складом */
  stockGetSaleShipping: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockOrderShipping;
  };
  /** GET /api/v1/stock/sales/to-ship — Получить очередь продаж к отгрузке */
  stockGetSalesToShip: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.StockOrderShippingPage;
  };
  /** GET /api/v1/stock/settings — Получить настройки склада кабинета */
  stockGetSettings: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.StockSettings;
  };
  /** GET /api/v1/stock/report/stocks — Получить отчёт по остаткам */
  stockGetStocksReport: {
    params: Record<string, never>;
    query: { "amount_from"?: string; "amount_to"?: string; "as_of"?: string; "available_from"?: string; "available_to"?: string; "below_minimum"?: boolean; "business_id"?: models.UUID; "company_id"?: models.UUID; "direction"?: "asc" | "desc"; "expected_from"?: string; "expected_to"?: string; "forecast_from"?: string; "forecast_to"?: string; "include_empty"?: boolean; "limit"?: number; "minimum_from"?: string; "minimum_to"?: string; "mode"?: "products" | "warehouses" | "companies" | "matrix"; "offset"?: number; "on_hand_from"?: string; "on_hand_to"?: string; "product_id"?: models.UUID; "product_ids"?: string; "q"?: string; "reserved_from"?: string; "reserved_to"?: string; "rollup_zones"?: boolean; "sort"?: "name" | "on_hand" | "reserved" | "available" | "expected" | "forecast" | "minimum" | "suggested" | "unit_cost" | "amount"; "suggested_from"?: string; "suggested_to"?: string; "unit_cost_from"?: string; "unit_cost_to"?: string; "warehouse_id"?: models.UUID; "warehouse_ids"?: string; "with_reserve"?: boolean; "without_company"?: boolean };
    body: never;
    response: models.StockReportPage;
  };
  /** GET /api/v1/stock/upload-sessions/{id} — Состояние сессии загрузки склада */
  stockGetUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.TransferSession;
  };
  /** GET /api/v1/stock/valuation/rebuild/{id} — Получить состояние прогона пересчёта стоимости */
  stockGetValuationRun: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockValuationRun;
  };
  /** GET /api/v1/stock/warehouses/{id} — Получить склад */
  stockGetWarehouse: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockWarehouse;
  };
  /** GET /api/v1/stock/warehouses/{id}/zones/allocation — Получить матрицу разнесения остатка по зонам */
  stockGetWarehouseZoneAllocation: {
    params: { "id": models.UUID };
    query: { "direction"?: "to_zones" | "to_warehouse" };
    body: never;
    response: models.StockZoneAllocation;
  };
  /** GET /api/v1/stock/imports/{id}/errors/download-session — Временный адрес отчёта ошибок складского импорта */
  stockImportErrorsDownloadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockDownloadLink;
  };
  /** GET /api/v1/stock/imports/{id}/source/download-session — Временный адрес исходного файла складского импорта */
  stockImportSourceDownloadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockDownloadLink;
  };
  /** GET /api/v1/stock/import-templates/{kind}/download-session — Временный адрес шаблона складского импорта */
  stockImportTemplateDownloadSession: {
    params: { "kind": models.StockImportKind };
    query: Record<string, never>;
    body: never;
    response: models.StockDownloadLink;
  };
  /** POST /api/v1/stock/imports/{id}/inspect — Осмотреть лист и строку заголовков без сохранения */
  stockInspectImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockImportInspectRequest;
    response: models.StockImportRun;
  };
  /** GET /api/v1/stock/assembly-specs — Получить версии спецификаций изделий */
  stockListAssemblySpecs: {
    params: Record<string, never>;
    query: { "limit"?: number; "offset"?: number; "product_id"?: models.UUID; "q"?: string; "spec_id"?: models.UUID; "status"?: "draft" | "active" | "archived" };
    body: never;
    response: models.StockAssemblySpecPage;
  };
  /** GET /api/v1/stock/batches — Получить список партий */
  stockListBatches: {
    params: Record<string, never>;
    query: { "amount_from"?: string; "amount_to"?: string; "batch"?: string; "company_id"?: models.UUID; "direction"?: "asc" | "desc"; "expiry"?: "expired" | "soon" | "all"; "limit"?: number; "offset"?: number; "produced_from"?: string; "produced_to"?: string; "product"?: string; "product_id"?: models.UUID; "q"?: string; "quantity_from"?: string; "quantity_to"?: string; "received_from"?: string; "received_to"?: string; "sort"?: "received_at" | "expires_at" | "product" | "company" | "quantity" | "amount" };
    body: never;
    response: models.StockBatchPage;
  };
  /** GET /api/v1/stock/company-policies — Получить складские политики юрлиц */
  stockListCompanyPolicies: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.StockCompanyPolicyPage;
  };
  /** GET /api/v1/stock/documents/authors — Получить авторов складских документов */
  stockListDocumentAuthors: {
    params: Record<string, never>;
    query: { "type"?: models.StockDocumentTypeKey; "types"?: string };
    body: never;
    response: models.StockListDocumentAuthorsResponse;
  };
  /** GET /api/v1/stock/documents/fulfillments — Получить остатки исполнения по пакету заявок и продаж или закупок */
  stockListDocumentFulfillments: {
    params: Record<string, never>;
    query: { "ids": string };
    body: never;
    response: models.StockDocumentFulfillmentPage;
  };
  /** GET /api/v1/stock/documents — Получить журнал складских документов */
  stockListDocuments: {
    params: Record<string, never>;
    query: { "comment"?: string; "company_id"?: models.UUID; "contact_id"?: models.UUID; "created_by"?: string; "date_from"?: string; "date_to"?: string; "direction"?: "asc" | "desc"; "limit"?: number; "lines_from"?: number; "lines_to"?: number; "number"?: string; "offset"?: number; "q"?: string; "qty_from"?: string; "qty_to"?: string; "reason_id"?: models.UUID; "sale"?: string; "sort"?: "date" | "number" | "status" | "company" | "warehouse" | "contact" | "updated_at"; "status"?: models.CoreDocumentStatus; "type"?: models.StockDocumentTypeKey; "updated_from"?: string; "updated_to"?: string; "warehouse_id"?: models.UUID; "warehouse_ids"?: string };
    body: never;
    response: models.StockDocumentPage;
  };
  /** GET /api/v1/stock/handling-units — Получить список физических складских единиц */
  stockListHandlingUnits: {
    params: Record<string, never>;
    query: { "balance_from"?: string; "balance_to"?: string; "batch_id"?: models.UUID; "code"?: string; "company_id"?: models.UUID; "cost_from"?: string; "cost_to"?: string; "exclude_status"?: Array<models.StockHandlingUnitState>; "initial_from"?: string; "initial_to"?: string; "limit"?: number; "offset"?: number; "product"?: string; "product_id"?: models.UUID; "q"?: string; "status"?: Array<models.StockHandlingUnitState>; "warehouse_id"?: models.UUID };
    body: never;
    response: models.StockHandlingUnitPage;
  };
  /** GET /api/v1/stock/documents/{id}/inventory-changes — Получить движения склада после снимка инвентаризации */
  stockListInventoryChanges: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockInventoryChangePage;
  };
  /** GET /api/v1/stock/products/{productId}/uoms — Получить товарные единицы ввода товара */
  stockListProductUOMs: {
    params: { "productId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockProductUOMPage;
  };
  /** GET /api/v1/stock/reorder-rules — Получить правила пополнения запаса */
  stockListReorderRules: {
    params: Record<string, never>;
    query: { "business_id"?: models.UUID; "company_id"?: models.UUID; "direction"?: "asc" | "desc"; "lead_from"?: string; "lead_to"?: string; "limit"?: number; "max_from"?: string; "max_to"?: string; "min_from"?: string; "min_to"?: string; "multiple_from"?: string; "multiple_to"?: string; "offset"?: number; "product_id"?: models.UUID; "q"?: string; "sort"?: "business" | "company" | "product" | "warehouse" | "min_qty" | "updated_at"; "status"?: "active" | "inactive"; "supplier_id"?: models.UUID; "warehouse_id"?: models.UUID };
    body: never;
    response: models.StockReorderRulePage;
  };
  /** GET /api/v1/stock/suppliers — Получить активных контрагентов с ролью поставщика */
  stockListSuppliers: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.StockSupplierPage;
  };
  /** GET /api/v1/stock/warehouses — Получить список складов кабинета */
  stockListWarehouses: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.StockWarehousePage;
  };
  /** POST /api/v1/stock/documents/{id}/post — Провести или перепровести складской документ */
  stockPostDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/imports/{id}/preview — Рассчитать изменения и ошибки без записи данных */
  stockPreviewImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockImportRun;
  };
  /** POST /api/v1/stock/valuation/preview — Рассчитать переоценку по документу накладных расходов без записи */
  stockPreviewValuation: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockValuationPreviewRequest;
    response: models.StockValuationResult;
  };
  /** POST /api/v1/stock/valuation/rebuild — Запустить пересчёт стоимости по документу накладных расходов */
  stockRebuildValuation: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockValuationRebuildRequest;
    response: models.StockValuationRun;
  };
  /** POST /api/v1/stock/documents/{id}/inventory-refresh — Пересобрать снимок остатков инвентаризации */
  stockRefreshInventorySnapshot: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockInventoryRefreshInput;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/documents/{id}/release — Снять неисполненный остаток резерва */
  stockReleaseReservation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** PATCH /api/v1/stock/documents/{id}/inventory-counts — Записать фактические количества пересчёта */
  stockSaveInventoryCounts: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockInventoryCountsInput;
    response: models.CoreDocument;
  };
  /** PUT /api/v1/stock/product-uoms — Завести или изменить товарную единицу ввода */
  stockSaveProductUOM: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockProductUOMInput;
    response: models.StockProductUOM;
  };
  /** PUT /api/v1/stock/reorder-rules — Завести или переписать правило пополнения по ключу */
  stockSaveReorderRule: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockReorderRuleInput;
    response: models.StockReorderRule;
  };
  /** PUT /api/v1/stock/warehouses/{id}/zones/allocation/draft — Сохранить незавершённую матрицу разнесения */
  stockSaveWarehouseZoneAllocationDraft: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockZoneAllocationInput;
    response: void;
  };
  /** GET /api/v1/stock/products/scan — Определить товар и единицу ввода по штрихкоду */
  stockScanProduct: {
    params: Record<string, never>;
    query: { "code": string };
    body: never;
    response: models.StockScanResult;
  };
  /** POST /api/v1/stock/assembly-specs/{id}/status — Сделать версию действующей или архивной */
  stockSetAssemblySpecStatus: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockAssemblySpecStatus;
    response: models.StockAssemblySpec;
  };
  /** POST /api/v1/stock/sales/{id}/shipment — Отгрузить по продаже */
  stockShipSale: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockOrderShipInput;
    response: models.StockOrderShipment;
  };
  /** GET /api/v1/stock/handling-units/suggestions — Подобрать физические единицы под требуемое количество */
  stockSuggestHandlingUnits: {
    params: Record<string, never>;
    query: { "business_id"?: models.UUID; "company_id"?: models.UUID; "product_id": models.UUID; "qty": string; "warehouse_id": models.UUID };
    body: never;
    response: models.StockHandlingUnitSuggestionResult;
  };
  /** PUT /api/v1/stock/assembly-specs/{id} — Изменить черновик версии спецификации */
  stockUpdateAssemblySpec: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockAssemblySpecUpdate;
    response: models.StockAssemblySpec;
  };
  /** PATCH /api/v1/stock/company-policies/{companyId} — Частично изменить складскую политику юрлица */
  stockUpdateCompanyPolicy: {
    params: { "companyId": models.UUID };
    query: Record<string, never>;
    body: models.StockCompanyPolicyPatch;
    response: models.StockCompanyPolicy;
  };
  /** PATCH /api/v1/stock/documents/{id} — Частично изменить черновик складского документа */
  stockUpdateDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockDocumentPatch;
    response: models.CoreDocument;
  };
  /** PATCH /api/v1/stock/handling-units/{id}/status — Изменить статус физической складской единицы */
  stockUpdateHandlingUnitStatus: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockHandlingUnitStatusPatch;
    response: models.StockHandlingUnit;
  };
  /** PATCH /api/v1/stock/imports/{id}/mapping — Сохранить сопоставление колонок складского импорта */
  stockUpdateImportMapping: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreProductImportMapping;
    response: models.StockImportRun;
  };
  /** PATCH /api/v1/stock/reorder-rules/{id} — Частично изменить существующее правило пополнения */
  stockUpdateReorderRule: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockReorderRulePatch;
    response: models.StockReorderRule;
  };
  /** PATCH /api/v1/stock/settings — Частично изменить настройки склада кабинета */
  stockUpdateSettings: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockSettingsPatch;
    response: models.StockSettings;
  };
  /** PATCH /api/v1/stock/warehouses/{id} — Частично изменить склад */
  stockUpdateWarehouse: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockWarehousePatch;
    response: models.StockWarehouse;
  };
  /** POST /api/v1/tasks/sections/{id}/members — Добавить участника в проект задач */
  tasksAddSectionMember: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.SectionMemberAssignment;
    response: models.SectionMember;
  };
  /** DELETE /api/v1/tasks/projects/{id} — Архивировать группу проектов задач */
  tasksArchiveProject: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.ArchiveTransfer;
    response: void;
  };
  /** DELETE /api/v1/tasks/sections/{id} — Архивировать проект задач */
  tasksArchiveSection: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.ArchiveTransfer;
    response: void;
  };
  /** DELETE /api/v1/tasks/tasks/{id} — Мягко архивировать задачу */
  tasksArchiveTask: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/tasks/templates/{id} — Архивировать шаблон регулярной задачи */
  tasksArchiveTemplate: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/tasks/attachments/{id}/replace-sessions — Создать прямую upload-сессию для замены файла */
  tasksCreateAttachmentReplacementSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.AttachmentReplacementSessionCreate;
    response: models.AttachmentUploadSession;
  };
  /** POST /api/v1/tasks/attachments/upload-sessions — Создать прямую upload-сессию файла */
  tasksCreateAttachmentUploadSession: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.AttachmentUploadSessionCreate;
    response: models.AttachmentUploadSession;
  };
  /** POST /api/v1/tasks/tasks/{id}/comments — Добавить комментарий к задаче */
  tasksCreateComment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CommentCreate;
    response: models.Comment;
  };
  /** POST /api/v1/tasks/customers — Создать заказчика проектов */
  tasksCreateCustomer: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CustomerCreate;
    response: models.Customer;
  };
  /** POST /api/v1/tasks/customer-needs — Создать потребность заказчика */
  tasksCreateCustomerNeed: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CustomerNeedCreate;
    response: models.CustomerNeed;
  };
  /** POST /api/v1/tasks/cycles — Создать цикл или спринт */
  tasksCreateCycle: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CycleCreate;
    response: models.Cycle;
  };
  /** POST /api/v1/tasks/discussion-comments — Добавить комментарий или ответ в обсуждение */
  tasksCreateDiscussionComment: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DiscussionCommentCreate;
    response: models.DiscussionComment;
  };
  /** POST /api/v1/tasks/documents — Создать документ задачи или проекта */
  tasksCreateDocument: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocumentCreate;
    response: models.TaskDocument;
  };
  /** POST /api/v1/tasks/tasks/{id}/links — Привязать задачу к сущности ERP */
  tasksCreateLink: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.LinkCreate;
    response: models.Link;
  };
  /** POST /api/v1/tasks/hub/meetings — Создать встречу Project Hub */
  tasksCreateMeeting: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MeetingCreate;
    response: models.Meeting;
  };
  /** POST /api/v1/tasks/milestones — Создать веху проекта задач */
  tasksCreateMilestone: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MilestoneCreate;
    response: models.Milestone;
  };
  /** POST /api/v1/tasks/projects — Создать группу проектов задач */
  tasksCreateProject: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.ProjectCreate;
    response: models.Project;
  };
  /** POST /api/v1/tasks/pull-requests — Привязать или обновить pull request */
  tasksCreatePullRequest: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.PullRequestCreate;
    response: models.PullRequest;
  };
  /** POST /api/v1/tasks/tasks/{id}/relations — Связать задачу с другой задачей */
  tasksCreateRelation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.RelationCreate;
    response: models.Relation;
  };
  /** POST /api/v1/tasks/sections — Создать раздел задач */
  tasksCreateSection: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.SectionCreate;
    response: models.Section;
  };
  /** POST /api/v1/tasks/statuses — Создать workflow-статус */
  tasksCreateStatus: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StatusCreate;
    response: models.Status;
  };
  /** POST /api/v1/tasks/status-updates — Опубликовать отчёт о состоянии проекта */
  tasksCreateStatusUpdate: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StatusUpdateCreate;
    response: models.StatusUpdate;
  };
  /** POST /api/v1/tasks/tags — Создать метку задач */
  tasksCreateTag: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.TaskTagCreate;
    response: models.TaskTagCatalogItem;
  };
  /** POST /api/v1/tasks/tasks — Создать задачу */
  tasksCreateTask: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.TaskCreate;
    response: models.Task;
  };
  /** POST /api/v1/tasks/templates — Создать шаблон регулярной задачи */
  tasksCreateTemplate: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.TaskTemplateCreate;
    response: models.TaskTemplate;
  };
  /** POST /api/v1/tasks/views — Сохранить вид задач */
  tasksCreateView: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.TaskViewCreate;
    response: models.TaskView;
  };
  /** DELETE /api/v1/tasks/attachments/{id} — Удалить вложение и его файл */
  tasksDeleteAttachment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.OK;
  };
  /** DELETE /api/v1/tasks/comments/{id} — Удалить комментарий */
  tasksDeleteComment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/tasks/customers/{id} — Архивировать заказчика проектов */
  tasksDeleteCustomer: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.OK;
  };
  /** DELETE /api/v1/tasks/customer-needs/{id} — Архивировать потребность заказчика */
  tasksDeleteCustomerNeed: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.OK;
  };
  /** DELETE /api/v1/tasks/cycles/{id} — Архивировать цикл или спринт */
  tasksDeleteCycle: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.OK;
  };
  /** DELETE /api/v1/tasks/discussion-comments/{id} — Архивировать комментарий обсуждения */
  tasksDeleteDiscussionComment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/tasks/documents/{id} — Архивировать документ задачи или проекта */
  tasksDeleteDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.OK;
  };
  /** DELETE /api/v1/tasks/links/{id} — Удалить привязку задачи к сущности ERP */
  tasksDeleteLink: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/tasks/hub/meetings/{id} — Архивировать встречу */
  tasksDeleteMeeting: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.OK;
  };
  /** DELETE /api/v1/tasks/milestones/{id} — Архивировать веху */
  tasksDeleteMilestone: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.OK;
  };
  /** DELETE /api/v1/tasks/pull-requests/{id} — Архивировать связь с pull request */
  tasksDeletePullRequest: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/tasks/relations/{id} — Удалить связь задач */
  tasksDeleteRelation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/tasks/section-members/{id} — Удалить участника из проекта задач */
  tasksDeleteSectionMember: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/tasks/statuses/{id} — Удалить workflow-статус */
  tasksDeleteStatus: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StatusDelete;
    response: void;
  };
  /** DELETE /api/v1/tasks/status-updates/{id} — Архивировать отчёт о состоянии проекта */
  tasksDeleteStatusUpdate: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.OK;
  };
  /** DELETE /api/v1/tasks/tags/{id} — Архивировать метку задач */
  tasksDeleteTag: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/tasks/views/{id} — Удалить сохранённый вид задач */
  tasksDeleteView: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/tasks/attachments/upload-sessions/{id}/finish — Завершить прямую upload-сессию и зарегистрировать вложение */
  tasksFinishAttachmentUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.Attachment;
  };
  /** GET /api/v1/tasks/attachments/{id}/content — Скачать содержимое вложения через Akeda */
  tasksGetAttachmentContent: {
    params: { "id": models.UUID };
    query: { "w"?: number };
    body: never;
    response: void;
  };
  /** GET /api/v1/tasks/customers/{id} — Получить заказчика проектов */
  tasksGetCustomer: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.Customer;
  };
  /** GET /api/v1/tasks/customer-needs/{id} — Получить потребность заказчика */
  tasksGetCustomerNeed: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CustomerNeed;
  };
  /** GET /api/v1/tasks/cycles/{id} — Получить цикл или спринт */
  tasksGetCycle: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.Cycle;
  };
  /** GET /api/v1/tasks/documents/{id} — Получить документ задачи или проекта */
  tasksGetDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.TaskDocument;
  };
  /** GET /api/v1/tasks/hub/overview — Получить паспорт и сводку Project Hub */
  tasksGetHubOverview: {
    params: Record<string, never>;
    query: { "project": string };
    body: never;
    response: models.HubOverview;
  };
  /** GET /api/v1/tasks/hub/meetings/{id} — Получить встречу Project Hub */
  tasksGetMeeting: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.Meeting;
  };
  /** GET /api/v1/tasks/milestones/{id} — Получить веху */
  tasksGetMilestone: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.Milestone;
  };
  /** GET /api/v1/tasks/projects/{id}/team-metrics — Получить командный отчёт проекта задач */
  tasksGetProjectTeamMetrics: {
    params: { "id": models.UUID };
    query: { "period"?: "week" | "month" | "quarter" | "all"; "tz"?: string };
    body: never;
    response: models.TeamMetrics;
  };
  /** GET /api/v1/tasks/pull-requests/{id} — Получить связь с pull request */
  tasksGetPullRequest: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.PullRequest;
  };
  /** GET /api/v1/tasks/scrum/metrics/{cycle} — Получить командные метрики спринта */
  tasksGetSprintMetrics: {
    params: { "cycle": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.SprintMetrics;
  };
  /** GET /api/v1/tasks/tasks/{id}/status-metrics — Получить историю переходов и время задачи в статусах */
  tasksGetStatusMetrics: {
    params: { "id": models.UUID };
    query: { "from"?: string; "to"?: string };
    body: never;
    response: models.StatusMetrics;
  };
  /** GET /api/v1/tasks/status-updates/{id} — Получить отчёт о состоянии проекта */
  tasksGetStatusUpdate: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StatusUpdate;
  };
  /** GET /api/v1/tasks/tasks/{id} — Получить карточку задачи */
  tasksGetTask: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.Task;
  };
  /** GET /api/v1/tasks/tasks/{id}/activity — Получить ленту изменений задачи */
  tasksListActivity: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ActivityList;
  };
  /** GET /api/v1/tasks/tasks/{id}/comments — Получить обсуждение задачи */
  tasksListComments: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CommentList;
  };
  /** GET /api/v1/tasks/customer-needs — Получить потребности заказчиков */
  tasksListCustomerNeeds: {
    params: Record<string, never>;
    query: { "customer"?: string; "include_archived"?: boolean; "q"?: string; "section"?: string; "task"?: string };
    body: never;
    response: models.CustomerNeedPage;
  };
  /** GET /api/v1/tasks/customers — Получить заказчиков проектов */
  tasksListCustomers: {
    params: Record<string, never>;
    query: { "include_archived"?: boolean; "q"?: string };
    body: never;
    response: models.CustomerPage;
  };
  /** GET /api/v1/tasks/cycles — Получить циклы и спринты */
  tasksListCycles: {
    params: Record<string, never>;
    query: { "include_archived"?: boolean; "owner_id"?: string; "owner_type"?: "section" | "project"; "project"?: string; "q"?: string; "section"?: string };
    body: never;
    response: models.CyclePage;
  };
  /** GET /api/v1/tasks/discussion-comments — Получить обсуждение сущности задачника */
  tasksListDiscussionComments: {
    params: Record<string, never>;
    query: { "customer_need"?: string; "document"?: string; "include_archived"?: boolean; "milestone"?: string; "owner_id"?: string; "owner_type"?: models.DiscussionOwnerType; "parent_id"?: string; "project"?: string; "pull_request"?: string; "q"?: string; "section"?: string; "task"?: string; "type"?: models.DiscussionOwnerType };
    body: never;
    response: models.DiscussionCommentPage;
  };
  /** GET /api/v1/tasks/documents — Получить документы задач и проектов */
  tasksListDocuments: {
    params: Record<string, never>;
    query: { "include_archived"?: boolean; "milestone"?: string; "owner_id"?: string; "owner_type"?: models.DocumentOwnerType; "project"?: string; "q"?: string; "section"?: string; "task"?: string };
    body: never;
    response: models.DocumentPage;
  };
  /** GET /api/v1/tasks/hub/sections — Получить дерево разделов Project Hub */
  tasksListHubSections: {
    params: Record<string, never>;
    query: { "project": string };
    body: never;
    response: models.HubSectionPage;
  };
  /** GET /api/v1/tasks/tasks/{id}/links — Получить привязки задачи к сущностям ERP */
  tasksListLinks: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.LinkList;
  };
  /** GET /api/v1/tasks/hub/meetings — Получить встречи Project Hub */
  tasksListMeetings: {
    params: Record<string, never>;
    query: { "client"?: boolean; "from"?: string; "kind"?: models.MeetingKind; "project": string; "q"?: string; "status"?: models.MeetingStatus; "to"?: string };
    body: never;
    response: models.MeetingPage;
  };
  /** GET /api/v1/tasks/milestones — Получить вехи проектов задач */
  tasksListMilestones: {
    params: Record<string, never>;
    query: { "include_archived"?: boolean; "project"?: string; "section"?: string };
    body: never;
    response: models.MilestonePage;
  };
  /** GET /api/v1/tasks/projects — Получить доступные группы проектов задач */
  tasksListProjects: {
    params: Record<string, never>;
    query: { "counters"?: "mine"; "mine_roles"?: string };
    body: never;
    response: models.ProjectPage;
  };
  /** GET /api/v1/tasks/pull-requests — Получить pull request, связанные с задачами и проектами */
  tasksListPullRequests: {
    params: Record<string, never>;
    query: { "include_archived"?: boolean; "owner_id"?: string; "owner_type"?: models.PullRequestOwnerType; "q"?: string; "section"?: string; "task"?: string; "type"?: models.PullRequestOwnerType };
    body: never;
    response: models.PullRequestPage;
  };
  /** GET /api/v1/tasks/tasks/{id}/relations — Получить связи задачи с другими задачами */
  tasksListRelations: {
    params: { "id": models.UUID };
    query: { "direction"?: models.RelationDirection };
    body: never;
    response: models.RelationList;
  };
  /** GET /api/v1/tasks/sections/{id}/members — Получить участников проекта задач */
  tasksListSectionMembers: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.SectionMember>;
  };
  /** GET /api/v1/tasks/sections — Получить проекты задач */
  tasksListSections: {
    params: Record<string, never>;
    query: { "counters"?: "mine"; "mine_roles"?: string };
    body: never;
    response: models.SectionPage;
  };
  /** GET /api/v1/tasks/status-updates — Получить отчёты о состоянии проекта */
  tasksListStatusUpdates: {
    params: Record<string, never>;
    query: { "include_archived"?: boolean; "owner_id"?: string; "owner_type"?: "section" | "project"; "project"?: string; "section"?: string; "type"?: "section" | "project" };
    body: never;
    response: models.StatusUpdatePage;
  };
  /** GET /api/v1/tasks/statuses — Получить workflow-статусы задач */
  tasksListStatuses: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.StatusPage;
  };
  /** GET /api/v1/tasks/tags — Получить каталог меток задач */
  tasksListTagCatalog: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.TaskTagPage;
  };
  /** GET /api/v1/tasks/tasks/{id}/attachments — Получить вложения задачи */
  tasksListTaskAttachments: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.AttachmentPage;
  };
  /** GET /api/v1/tasks/tasks — Получить видимые пользователю задачи */
  tasksListTasks: {
    params: Record<string, never>;
    query: { "compact"?: boolean; "limit"?: number; "milestone"?: string; "mine_roles"?: string; "offset"?: number; "priority"?: models.TaskPriority; "project"?: string; "q"?: string; "scope"?: "mine"; "search_rank"?: boolean; "section"?: string; "status"?: string };
    body: never;
    response: models.TaskPage;
  };
  /** GET /api/v1/tasks/templates — Получить шаблоны регулярных задач */
  tasksListTemplates: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.TaskTemplatePage;
  };
  /** GET /api/v1/tasks/views — Получить сохранённые виды задач */
  tasksListViews: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.TaskViewPage;
  };
  /** POST /api/v1/tasks/tasks/{id}/move — Переместить задачу в другой workflow-статус */
  tasksMoveTask: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.TaskMove;
    response: models.Task;
  };
  /** PATCH /api/v1/tasks/statuses/reorder — Изменить порядок workflow-статусов */
  tasksReorderStatuses: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StatusReorder;
    response: models.OK;
  };
  /** POST /api/v1/tasks/templates/run-due — Запустить все шаблоны, срок которых наступил */
  tasksRunDueTemplates: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.TemplateRunPage;
  };
  /** POST /api/v1/tasks/templates/{id}/run — Немедленно создать задачу из шаблона */
  tasksRunTemplate: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.TemplateRunResult;
  };
  /** PATCH /api/v1/tasks/customers/{id} — Изменить заказчика проектов */
  tasksUpdateCustomer: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CustomerUpdate;
    response: models.Customer;
  };
  /** PATCH /api/v1/tasks/customer-needs/{id} — Изменить потребность заказчика */
  tasksUpdateCustomerNeed: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CustomerNeedUpdate;
    response: models.CustomerNeed;
  };
  /** PATCH /api/v1/tasks/cycles/{id} — Изменить цикл или спринт */
  tasksUpdateCycle: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CycleUpdate;
    response: models.Cycle;
  };
  /** PATCH /api/v1/tasks/discussion-comments/{id} — Изменить комментарий обсуждения */
  tasksUpdateDiscussionComment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DiscussionCommentUpdate;
    response: models.DiscussionComment;
  };
  /** PATCH /api/v1/tasks/documents/{id} — Изменить документ задачи или проекта */
  tasksUpdateDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocumentUpdate;
    response: models.TaskDocument;
  };
  /** PATCH /api/v1/tasks/hub/sections/{id} — Настроить раздел Project Hub */
  tasksUpdateHubSection: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.HubSectionUpdate;
    response: models.HubSection;
  };
  /** PATCH /api/v1/tasks/hub/meetings/{id} — Изменить встречу и её разбор */
  tasksUpdateMeeting: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MeetingUpdate;
    response: models.Meeting;
  };
  /** PATCH /api/v1/tasks/milestones/{id} — Изменить веху */
  tasksUpdateMilestone: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MilestoneUpdate;
    response: models.Milestone;
  };
  /** PATCH /api/v1/tasks/pull-requests/{id} — Изменить связь с pull request */
  tasksUpdatePullRequest: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.PullRequestUpdate;
    response: models.PullRequest;
  };
  /** PATCH /api/v1/tasks/sections/{id} — Изменить проект задач */
  tasksUpdateSection: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.SectionUpdate;
    response: models.Section;
  };
  /** PATCH /api/v1/tasks/statuses/{id} — Изменить workflow-статус */
  tasksUpdateStatus: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.WorkflowStatusUpdate;
    response: models.Status;
  };
  /** PATCH /api/v1/tasks/status-updates/{id} — Изменить отчёт о состоянии проекта */
  tasksUpdateStatusUpdate: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StatusUpdatePatch;
    response: models.StatusUpdate;
  };
  /** PATCH /api/v1/tasks/tags/{id} — Изменить метку задач */
  tasksUpdateTag: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.TaskTagUpdate;
    response: models.TaskTagCatalogItem;
  };
  /** PATCH /api/v1/tasks/tasks/{id} — Частично изменить задачу */
  tasksUpdateTask: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.TaskUpdate;
    response: models.Task;
  };
  /** POST /api/v1/tasks/tasks/{id}/attachments — Загрузить вложение задачи до 25 МБ */
  tasksUploadTaskAttachment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.Attachment;
  };
}

export type OperationId = keyof OperationTypes;

export const operationSpecs: Record<OperationId, OperationSpec> = {
  appDocflowCancelSale: { method: "POST", path: "/api/v1/app/docflow/sales/{id}/cancel", module: "docflow", stage: "preview", permission: "docflow.trade:import", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appDocflowFindSaleByExternalID: { method: "GET", path: "/api/v1/app/docflow/sales/lookup", module: "docflow", stage: "preview", permission: "docflow.trade:import", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appDocflowGetSale: { method: "GET", path: "/api/v1/app/docflow/sales/{id}", module: "docflow", stage: "preview", permission: "docflow.trade:import", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appDocflowImportSale: { method: "POST", path: "/api/v1/app/docflow/sales/import", module: "docflow", stage: "preview", permission: "docflow.trade:import", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appDocflowIssueSaleAct: { method: "POST", path: "/api/v1/app/docflow/sales/{id}/act", module: "docflow", stage: "preview", permission: "docflow.trade:issue", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appDocflowIssueSaleInvoice: { method: "POST", path: "/api/v1/app/docflow/sales/{id}/invoice", module: "docflow", stage: "preview", permission: "docflow.trade:issue", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appDocflowIssueSaleUPD: { method: "POST", path: "/api/v1/app/docflow/sales/{id}/upd", module: "docflow", stage: "preview", permission: "docflow.trade:issue", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appDocflowListSaleImports: { method: "GET", path: "/api/v1/app/docflow/sale-imports", module: "docflow", stage: "preview", permission: "docflow.trade:import", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 200, pageSizeDefault: 50 },
  appDocflowPrintSaleInvoice: { method: "GET", path: "/api/v1/app/docflow/sales/{saleId}/invoices/{documentId}/print", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appDocflowPrintSaleUPD: { method: "GET", path: "/api/v1/app/docflow/sales/{saleId}/upds/{documentId}/print", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appDocflowRecordSalePayment: { method: "POST", path: "/api/v1/app/docflow/sales/{id}/payments", module: "docflow", stage: "preview", permission: "docflow.trade:payments", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appDocflowSetSaleStatus: { method: "POST", path: "/api/v1/app/docflow/sales/{id}/status", module: "docflow", stage: "preview", permission: "docflow.trade:import", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appFinanceCancelOperation: { method: "POST", path: "/api/v1/app/finance/operations/{id}/cancel", module: "finance", stage: "preview", permission: "finance.operations:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appFinanceCreateOperation: { method: "POST", path: "/api/v1/app/finance/operations", module: "finance", stage: "preview", permission: "finance.operations:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appFinanceCreateOperationAccrual: { method: "POST", path: "/api/v1/app/finance/operations/{id}/accruals", module: "finance", stage: "preview", permission: "finance.operations:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appFinanceGetOperation: { method: "GET", path: "/api/v1/app/finance/operations/{id}", module: "finance", stage: "preview", permission: "finance.operations:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appFinanceRecordAcquiringCapture: { method: "POST", path: "/api/v1/app/finance/acquiring/captures", module: "finance", stage: "preview", permission: "finance.acquiring:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appFinanceSuggestTransactionClassification: { method: "POST", path: "/api/v1/app/finance/transactions/{id}/classification-suggestions", module: "finance", stage: "preview", permission: "finance:suggest", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appReferenceDeactivateItem: { method: "DELETE", path: "/api/v1/app/reference/{key}/items/{code}", module: "core", stage: "preview", permission: "app:reference", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appReferenceItems: { method: "GET", path: "/api/v1/app/reference/{key}/items", module: "core", stage: "preview", permission: "app:reference", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: null },
  appReferenceUpsertItems: { method: "PUT", path: "/api/v1/app/reference/{key}/items", module: "core", stage: "preview", permission: "app:reference", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appRuntimeConfig: { method: "GET", path: "/api/v1/app/config", module: "platform", stage: "preview", permission: "app:self", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appRuntimeInstallation: { method: "GET", path: "/api/v1/app/installation", module: "platform", stage: "preview", permission: "app:self", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appRuntimeLeaseSecret: { method: "POST", path: "/api/v1/app/config/{key}/lease", module: "platform", stage: "preview", permission: "app:secrets", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appRuntimeRedeemSlotLaunch: { method: "POST", path: "/api/v1/app/slot-launch", module: "platform", stage: "preview", permission: "app:launch", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  assistantCreateDigest: { method: "POST", path: "/api/v1/assistant/digests", module: "assistant", stage: "preview", permission: "assistant:self", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  assistantListDigests: { method: "GET", path: "/api/v1/assistant/digests", module: "assistant", stage: "preview", permission: "assistant:self", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  assistantReplaceDigest: { method: "PUT", path: "/api/v1/assistant/digests/{id}", module: "assistant", stage: "preview", permission: "assistant:self", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  automationManifest: { method: "GET", path: "/api/v1/automation/manifest", module: "platform", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  automationRuleSimulate: { method: "POST", path: "/api/v1/automation/rules/simulate", module: "automation", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  automationRuleTest: { method: "POST", path: "/api/v1/automation/rules/test", module: "automation", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  automationRules: { method: "GET", path: "/api/v1/automation/rules", module: "automation", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankMarkTransactionDeleted: { method: "POST", path: "/api/v1/bank/transactions/{id}/mark-deleted", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankRepostTransaction: { method: "POST", path: "/api/v1/bank/transactions/{id}/repost", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankRepostTransactions: { method: "POST", path: "/api/v1/bank/transactions/repost", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankRestoreTransaction: { method: "POST", path: "/api/v1/bank/transactions/{id}/restore", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarCreateAvailability: { method: "POST", path: "/api/v1/calendar/availability", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarCreateBookingLink: { method: "POST", path: "/api/v1/calendar/booking-links", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarCreateConnector: { method: "POST", path: "/api/v1/calendar/connectors", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarCreateEvent: { method: "POST", path: "/api/v1/calendar/events", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarDeleteAvailability: { method: "DELETE", path: "/api/v1/calendar/availability/{id}", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarDeleteBookingLink: { method: "DELETE", path: "/api/v1/calendar/booking-links/{id}", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarDeleteConnector: { method: "DELETE", path: "/api/v1/calendar/connectors/{id}", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarDeleteEvent: { method: "DELETE", path: "/api/v1/calendar/events/{id}", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarGetBookingLinkSlots: { method: "GET", path: "/api/v1/calendar/booking-links/{id}/slots", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarGetBusy: { method: "GET", path: "/api/v1/calendar/busy", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarGetEvent: { method: "GET", path: "/api/v1/calendar/events/{id}", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarGetSettings: { method: "GET", path: "/api/v1/calendar/settings", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarListAvailability: { method: "GET", path: "/api/v1/calendar/availability", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarListBookingLinks: { method: "GET", path: "/api/v1/calendar/booking-links", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarListConnectors: { method: "GET", path: "/api/v1/calendar/connectors", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarListEvents: { method: "GET", path: "/api/v1/calendar/events", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarListInvitations: { method: "GET", path: "/api/v1/calendar/invitations", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarListMembers: { method: "GET", path: "/api/v1/calendar/members", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 200 },
  calendarPutSettings: { method: "PUT", path: "/api/v1/calendar/settings", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarRespondToEvent: { method: "POST", path: "/api/v1/calendar/events/{id}/response", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarSyncConnector: { method: "POST", path: "/api/v1/calendar/connectors/{id}/sync", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarUpdateAvailability: { method: "PATCH", path: "/api/v1/calendar/availability/{id}", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarUpdateBookingLink: { method: "PATCH", path: "/api/v1/calendar/booking-links/{id}", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarUpdateConnector: { method: "PATCH", path: "/api/v1/calendar/connectors/{id}", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarUpdateEvent: { method: "PATCH", path: "/api/v1/calendar/events/{id}", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatAbortAttachmentUploadSession: { method: "DELETE", path: "/api/v1/chat/upload-sessions/{sessionId}", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatChangeNotificationMode: { method: "PATCH", path: "/api/v1/chat/conversations/{id}/notification-mode", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatClearManualUnread: { method: "DELETE", path: "/api/v1/chat/conversations/{id}/manual-unread", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatCreateAttachmentDownloadSession: { method: "GET", path: "/api/v1/chat/attachments/{attachmentId}/download-session", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatCreateAttachmentUploadSession: { method: "POST", path: "/api/v1/chat/conversations/{id}/upload-sessions", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatCreateGroup: { method: "POST", path: "/api/v1/chat/conversations", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatEnsureDirect: { method: "POST", path: "/api/v1/chat/conversations/direct", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatEnsureEntityConversation: { method: "POST", path: "/api/v1/chat/entities/{module}/{entity}/{entityId}/conversation", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatFindEntityConversation: { method: "GET", path: "/api/v1/chat/entities/{module}/{entity}/{entityId}/conversation", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatFinishAttachmentUploadSession: { method: "POST", path: "/api/v1/chat/upload-sessions/{sessionId}/finish", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatGetAttachment: { method: "GET", path: "/api/v1/chat/conversations/{id}/attachments/{attachmentId}", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatGetAttachmentUploadSession: { method: "GET", path: "/api/v1/chat/upload-sessions/{sessionId}", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatGetConversation: { method: "GET", path: "/api/v1/chat/conversations/{id}", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatListAttachments: { method: "GET", path: "/api/v1/chat/conversations/{id}/attachments", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "cursor", pageSizeMax: 100, pageSizeDefault: 50 },
  chatListConversationMembers: { method: "GET", path: "/api/v1/chat/conversations/{id}/members", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatListConversations: { method: "GET", path: "/api/v1/chat/conversations", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "cursor", pageSizeMax: 100, pageSizeDefault: 50 },
  chatListMentionCandidates: { method: "GET", path: "/api/v1/chat/conversations/{id}/mentions/candidates", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatListMessages: { method: "GET", path: "/api/v1/chat/conversations/{id}/messages", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "limit", pageSizeMax: 100, pageSizeDefault: 50 },
  chatListPeople: { method: "GET", path: "/api/v1/chat/people", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatListPresence: { method: "GET", path: "/api/v1/chat/conversations/{id}/presence", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatListUnreadMentions: { method: "GET", path: "/api/v1/chat/conversations/{id}/mentions/unread", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatMarkManualUnread: { method: "POST", path: "/api/v1/chat/conversations/{id}/manual-unread", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatMarkMentionRead: { method: "POST", path: "/api/v1/chat/conversations/{id}/mentions/{messageId}/read", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatMarkRead: { method: "POST", path: "/api/v1/chat/conversations/{id}/read", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatSendMessage: { method: "POST", path: "/api/v1/chat/conversations/{id}/messages", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatSendVideoMeeting: { method: "POST", path: "/api/v1/chat/conversations/{id}/video-meeting", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreAbortUploadSession: { method: "DELETE", path: "/api/v1/core/upload-sessions/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreAddPolicyPayrollOfficial: { method: "POST", path: "/api/v1/core/accounting-policy/companies/{id}/payroll-official", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreAddPolicyTaxRegime: { method: "POST", path: "/api/v1/core/accounting-policy/companies/{id}/tax-regime", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreApplyProductImport: { method: "POST", path: "/api/v1/core/product-imports/{id}/apply", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreArchiveContact: { method: "POST", path: "/api/v1/core/contacts/{id}/archive", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreArchiveProduct: { method: "POST", path: "/api/v1/core/products/{id}/archive", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCancelDocument: { method: "POST", path: "/api/v1/core/documents/{id}/cancel", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCancelPurchase: { method: "POST", path: "/api/v1/core/purchases/{id}/cancel", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCancelSale: { method: "POST", path: "/api/v1/core/sales/{id}/cancel", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreClosePurchase: { method: "POST", path: "/api/v1/core/purchases/{id}/close", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCloseSale: { method: "POST", path: "/api/v1/core/sales/{id}/close", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCompletePurchaseStep: { method: "POST", path: "/api/v1/core/purchases/{id}/steps/{key}/done", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCompleteSaleStep: { method: "POST", path: "/api/v1/core/sales/{id}/steps/{key}/done", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreConfirmPurchase: { method: "POST", path: "/api/v1/core/purchases/{id}/confirm", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreConfirmSale: { method: "POST", path: "/api/v1/core/sales/{id}/confirm", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateBusiness: { method: "POST", path: "/api/v1/core/businesses", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateBusinessOwnership: { method: "POST", path: "/api/v1/core/businesses/{id}/ownership", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateContact: { method: "POST", path: "/api/v1/core/contacts", module: "core", stage: "preview", permission: "core:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateDictionary: { method: "POST", path: "/api/v1/core/dictionaries", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateDictionaryItem: { method: "POST", path: "/api/v1/core/dictionaries/{id}/items", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateDocument: { method: "POST", path: "/api/v1/core/documents", module: "core", stage: "preview", permission: "core:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateDocumentType: { method: "POST", path: "/api/v1/core/document-types", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateEmployee: { method: "POST", path: "/api/v1/core/employees", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateGLAccount: { method: "POST", path: "/api/v1/core/gl-accounts", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateGLMapping: { method: "POST", path: "/api/v1/core/gl-mappings", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateItem: { method: "POST", path: "/api/v1/core/items", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateProduct: { method: "POST", path: "/api/v1/core/products", module: "core", stage: "preview", permission: "core:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateProductExport: { method: "POST", path: "/api/v1/core/product-exports", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateProductIdentifier: { method: "POST", path: "/api/v1/core/products/{id}/identifiers", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateProductImport: { method: "POST", path: "/api/v1/core/product-imports", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateProductImportUploadSession: { method: "POST", path: "/api/v1/core/product-import-upload-sessions", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateProductUploadSession: { method: "POST", path: "/api/v1/core/products/{id}/upload-sessions", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreatePurchase: { method: "POST", path: "/api/v1/core/purchases", module: "core", stage: "preview", permission: "core.trade:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateRegister: { method: "POST", path: "/api/v1/core/registers", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateSale: { method: "POST", path: "/api/v1/core/sales", module: "core", stage: "preview", permission: "core.trade:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateTradeFunnel: { method: "POST", path: "/api/v1/core/trade/funnels", module: "core", stage: "preview", permission: "settings:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateTradeTemplate: { method: "POST", path: "/api/v1/core/trade/templates", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeactivateProductIdentifier: { method: "POST", path: "/api/v1/core/products/{id}/identifiers/{identifierId}/deactivate", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteProductFile: { method: "DELETE", path: "/api/v1/core/products/{id}/files/{fileId}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreEditPolicyPayrollOfficial: { method: "PUT", path: "/api/v1/core/accounting-policy/companies/{id}/payroll-official/open", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreEditPolicyTaxRegime: { method: "PUT", path: "/api/v1/core/accounting-policy/companies/{id}/tax-regime/open", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreExecutePurchaseNow: { method: "POST", path: "/api/v1/core/purchases/execute-now", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreExecuteSaleNow: { method: "POST", path: "/api/v1/core/sales/execute-now", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreFinishUploadSession: { method: "POST", path: "/api/v1/core/upload-sessions/{id}/finish", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetAccountingSettings: { method: "GET", path: "/api/v1/core/accounting-settings", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetBusiness: { method: "GET", path: "/api/v1/core/businesses/{id}", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetContact: { method: "GET", path: "/api/v1/core/contacts/{id}", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetDocument: { method: "GET", path: "/api/v1/core/documents/{id}", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetDocumentBlockers: { method: "GET", path: "/api/v1/core/documents/{id}/blockers", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetDocumentLinks: { method: "GET", path: "/api/v1/core/documents/{id}/links", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetEmployee: { method: "GET", path: "/api/v1/core/employees/{id}", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProduct: { method: "GET", path: "/api/v1/core/products/{id}", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductCustomFieldSchema: { method: "GET", path: "/api/v1/core/products/custom-fields/schema", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductExport: { method: "GET", path: "/api/v1/core/product-exports/{id}", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductExportContent: { method: "GET", path: "/api/v1/core/product-exports/{id}/content", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductFileContent: { method: "GET", path: "/api/v1/core/products/{id}/files/{fileId}/content", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductImport: { method: "GET", path: "/api/v1/core/product-imports/{id}", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductImportErrors: { method: "GET", path: "/api/v1/core/product-imports/{id}/errors", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductImportSource: { method: "GET", path: "/api/v1/core/product-imports/{id}/source", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductImportTemplate: { method: "GET", path: "/api/v1/core/product-import-templates/{kind}", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetPurchase: { method: "GET", path: "/api/v1/core/purchases/{id}", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetPurchaseBlockers: { method: "GET", path: "/api/v1/core/purchases/{id}/blockers", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetPurchaseFunnel: { method: "GET", path: "/api/v1/core/purchases/{id}/funnel", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetPurchaseHistory: { method: "GET", path: "/api/v1/core/purchases/{id}/history", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetRegister: { method: "GET", path: "/api/v1/core/registers/{key}", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetRegisterBalance: { method: "GET", path: "/api/v1/core/registers/{key}/balance", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: 200 },
  coreGetRegisterTurnovers: { method: "GET", path: "/api/v1/core/registers/{key}/turnovers", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: 200 },
  coreGetSale: { method: "GET", path: "/api/v1/core/sales/{id}", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetSaleBlockers: { method: "GET", path: "/api/v1/core/sales/{id}/blockers", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetSaleFunnel: { method: "GET", path: "/api/v1/core/sales/{id}/funnel", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetSaleHistory: { method: "GET", path: "/api/v1/core/sales/{id}/history", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetTradeTemplate: { method: "GET", path: "/api/v1/core/trade/templates/{id}", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetTrialBalance: { method: "GET", path: "/api/v1/core/ledger/trial-balance", module: "core", stage: "preview", permission: "core.trial_balance:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetUploadSession: { method: "GET", path: "/api/v1/core/upload-sessions/{id}", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreImportDictionaryItems: { method: "POST", path: "/api/v1/core/dictionaries/{id}/items/import", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreImportPurchase: { method: "POST", path: "/api/v1/core/purchases/import", module: "core", stage: "preview", permission: "core.trade:import", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreImportSale: { method: "POST", path: "/api/v1/core/sales/import", module: "core", stage: "preview", permission: "core.trade:import", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreInspectProductImport: { method: "POST", path: "/api/v1/core/product-imports/{id}/inspect", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListAccountingDimensions: { method: "GET", path: "/api/v1/core/accounting-dimensions", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListBusinessOwnership: { method: "GET", path: "/api/v1/core/businesses/{id}/ownership", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListBusinesses: { method: "GET", path: "/api/v1/core/businesses", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListCashflowItems: { method: "GET", path: "/api/v1/core/cashflow-items", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListContacts: { method: "GET", path: "/api/v1/core/contacts", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 100 },
  coreListCurrencyRateSources: { method: "GET", path: "/api/v1/core/currency-rate-sources", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListCurrencyRates: { method: "GET", path: "/api/v1/core/currency-rates", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListDictionaries: { method: "GET", path: "/api/v1/core/dictionaries", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: 100 },
  coreListDictionaryItems: { method: "GET", path: "/api/v1/core/dictionaries/{id}/items", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 500 },
  coreListDirectories: { method: "GET", path: "/api/v1/core/directories", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListDocumentEntries: { method: "GET", path: "/api/v1/core/documents/{id}/entries", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 200 },
  coreListDocumentTypes: { method: "GET", path: "/api/v1/core/document-types", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListDocuments: { method: "GET", path: "/api/v1/core/documents", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 200 },
  coreListEmployees: { method: "GET", path: "/api/v1/core/employees", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 200 },
  coreListGLAccounts: { method: "GET", path: "/api/v1/core/gl-accounts", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListGLMappings: { method: "GET", path: "/api/v1/core/gl-mappings", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListItems: { method: "GET", path: "/api/v1/core/items", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListPnlItems: { method: "GET", path: "/api/v1/core/pnl-items", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListProductFiles: { method: "GET", path: "/api/v1/core/products/{id}/files", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListProductIdentifiers: { method: "GET", path: "/api/v1/core/products/{id}/identifiers", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListProductVariants: { method: "GET", path: "/api/v1/core/products/{id}/variants", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListProducts: { method: "GET", path: "/api/v1/core/products", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 100 },
  coreListPurchases: { method: "GET", path: "/api/v1/core/purchases", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 25 },
  coreListRegisterEntries: { method: "GET", path: "/api/v1/core/registers/{key}/entries", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 200 },
  coreListRegisters: { method: "GET", path: "/api/v1/core/registers", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 200 },
  coreListSales: { method: "GET", path: "/api/v1/core/sales", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 25 },
  coreListSellerCompanies: { method: "GET", path: "/api/v1/core/seller-companies", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListTradeFunnelTemplates: { method: "GET", path: "/api/v1/core/trade/funnels/templates", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListTradeFunnelVersions: { method: "GET", path: "/api/v1/core/trade/funnels/{id}/versions", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListTradeFunnels: { method: "GET", path: "/api/v1/core/trade/funnels", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListTradeImports: { method: "GET", path: "/api/v1/core/trade/imports", module: "core", stage: "preview", permission: "core.trade:import", idempotent: false, installation: false, pagination: "limit", pageSizeMax: 200, pageSizeDefault: 25 },
  coreListTradeStatuses: { method: "GET", path: "/api/v1/core/trade/statuses", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListTradeTemplateDocuments: { method: "GET", path: "/api/v1/core/trade/templates/{id}/documents", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 200, pageSizeDefault: null },
  coreListTradeTemplates: { method: "GET", path: "/api/v1/core/trade/templates", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: null },
  coreLookupBank: { method: "GET", path: "/api/v1/core/lookup/bank", module: "finance", stage: "preview", permission: "core:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreMarkDocumentDeleted: { method: "POST", path: "/api/v1/core/documents/{id}/mark-deleted", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreMoveItem: { method: "POST", path: "/api/v1/core/items/{id}/move", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  corePostDocument: { method: "POST", path: "/api/v1/core/documents/{id}/post", module: "core", stage: "preview", permission: "core:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  corePreviewProductImport: { method: "POST", path: "/api/v1/core/product-imports/{id}/preview", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreProductExportDownloadSession: { method: "GET", path: "/api/v1/core/product-exports/{id}/download-session", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreProductFileDownloadSession: { method: "GET", path: "/api/v1/core/products/{id}/files/{fileId}/download-session", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreProductImportErrorsDownloadSession: { method: "GET", path: "/api/v1/core/product-imports/{id}/errors/download-session", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreProductImportSourceDownloadSession: { method: "GET", path: "/api/v1/core/product-imports/{id}/source/download-session", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreProductImportTemplateDownloadSession: { method: "GET", path: "/api/v1/core/product-import-templates/{kind}/download-session", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReferenceCatalog: { method: "GET", path: "/api/v1/reference/catalog", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReferenceChanges: { method: "GET", path: "/api/v1/reference/changes", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: false, pagination: "cursor", pageSizeMax: 1000, pageSizeDefault: 100 },
  coreReferenceItems: { method: "GET", path: "/api/v1/reference/{key}/items", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReferenceResolve: { method: "POST", path: "/api/v1/reference/resolve", module: "core", stage: "public", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreRefreshCurrencyRates: { method: "POST", path: "/api/v1/core/currency-rates/refresh", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReopenPurchase: { method: "POST", path: "/api/v1/core/purchases/{id}/reopen", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReopenSale: { method: "POST", path: "/api/v1/core/sales/{id}/reopen", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreRestoreContact: { method: "POST", path: "/api/v1/core/contacts/{id}/restore", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreRestoreProduct: { method: "POST", path: "/api/v1/core/products/{id}/restore", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreRevisePurchase: { method: "PUT", path: "/api/v1/core/purchases/{id}", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReviseSale: { method: "PUT", path: "/api/v1/core/sales/{id}", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSaveAccountingDimensionVersion: { method: "POST", path: "/api/v1/core/accounting-dimensions/{key}/versions", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSellerBank: { method: "GET", path: "/api/v1/core/companies/{id}/seller-bank", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetBusinessAccountingMethod: { method: "POST", path: "/api/v1/core/businesses/{id}/accounting-method", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetBusinessActive: { method: "POST", path: "/api/v1/core/businesses/{id}/activation", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetPurchaseCabinetStatus: { method: "PUT", path: "/api/v1/core/purchases/{id}/cabinet-status", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetPurchaseFunnel: { method: "PUT", path: "/api/v1/core/purchases/{id}/funnel", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetPurchaseResponsibles: { method: "PUT", path: "/api/v1/core/purchases/{id}/responsibles", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetPurchaseStepDue: { method: "PUT", path: "/api/v1/core/purchases/{id}/steps/{key}/due", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetSaleCabinetStatus: { method: "PUT", path: "/api/v1/core/sales/{id}/cabinet-status", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetSaleFunnel: { method: "PUT", path: "/api/v1/core/sales/{id}/funnel", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetSaleResponsibles: { method: "PUT", path: "/api/v1/core/sales/{id}/responsibles", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetSaleStepDue: { method: "PUT", path: "/api/v1/core/sales/{id}/steps/{key}/due", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetTradeTemplateState: { method: "POST", path: "/api/v1/core/trade/templates/{id}/state", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSuggestBanks: { method: "GET", path: "/api/v1/core/lookup/banks", module: "finance", stage: "preview", permission: "core:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateAccountingDimension: { method: "PATCH", path: "/api/v1/core/accounting-dimensions/{key}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateAccountingSettings: { method: "PATCH", path: "/api/v1/core/accounting-settings", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateBusiness: { method: "PATCH", path: "/api/v1/core/businesses/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateContact: { method: "PATCH", path: "/api/v1/core/contacts/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateDocument: { method: "PATCH", path: "/api/v1/core/documents/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateItem: { method: "PATCH", path: "/api/v1/core/items/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateProduct: { method: "PATCH", path: "/api/v1/core/products/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateProductCustom: { method: "PATCH", path: "/api/v1/core/products/{id}/custom", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateProductFile: { method: "PATCH", path: "/api/v1/core/products/{id}/files/{fileId}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateProductIdentifier: { method: "PATCH", path: "/api/v1/core/products/{id}/identifiers/{identifierId}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateProductImportMapping: { method: "PATCH", path: "/api/v1/core/product-imports/{id}/mapping", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateTradeFunnel: { method: "PUT", path: "/api/v1/core/trade/funnels/{id}", module: "core", stage: "preview", permission: "settings:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateTradeTemplate: { method: "PUT", path: "/api/v1/core/trade/templates/{id}", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmAbortImportUploadSession: { method: "DELETE", path: "/api/v1/crm/import-upload-sessions/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmAbortInboxUploadSession: { method: "DELETE", path: "/api/v1/crm/inbox/upload-sessions/{id}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmAddNote: { method: "POST", path: "/api/v1/crm/{entity}/{id}/notes", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmArchivePipeline: { method: "POST", path: "/api/v1/crm/pipelines/{id}/archive", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmAssignInboxConversation: { method: "PATCH", path: "/api/v1/crm/inbox/conversations/{id}/assign", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmConvertLead: { method: "POST", path: "/api/v1/crm/leads/{id}/convert", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateAutomationRule: { method: "POST", path: "/api/v1/crm/automation/rules", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateCustomer: { method: "POST", path: "/api/v1/crm/customers", module: "crm", stage: "preview", permission: "crm:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateDeal: { method: "POST", path: "/api/v1/crm/deals", module: "crm", stage: "preview", permission: "crm:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateDealFromConversation: { method: "POST", path: "/api/v1/crm/inbox/conversations/{id}/deals", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateEngagement: { method: "POST", path: "/api/v1/crm/{entity}/{id}/engagements", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateEventLink: { method: "POST", path: "/api/v1/crm/{entity}/{id}/events", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateImportUploadSession: { method: "POST", path: "/api/v1/crm/imports/{id}/upload-sessions", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateInboxUploadSession: { method: "POST", path: "/api/v1/crm/inbox/conversations/{id}/upload-sessions", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateLead: { method: "POST", path: "/api/v1/crm/leads", module: "crm", stage: "preview", permission: "crm:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateLeadFromConversation: { method: "POST", path: "/api/v1/crm/inbox/conversations/{id}/leads", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateLeadStage: { method: "POST", path: "/api/v1/crm/lead-stages", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateLossReason: { method: "POST", path: "/api/v1/crm/loss-reasons", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreatePipeline: { method: "POST", path: "/api/v1/crm/pipelines", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateStage: { method: "POST", path: "/api/v1/crm/pipelines/{id}/stages", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateTaskLink: { method: "POST", path: "/api/v1/crm/{entity}/{id}/tasks", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmDeleteCustomer: { method: "DELETE", path: "/api/v1/crm/customers/{id}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmFindCustomerDuplicates: { method: "GET", path: "/api/v1/crm/customers/duplicates", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmFinishImportUploadSession: { method: "POST", path: "/api/v1/crm/import-upload-sessions/{id}/finish", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmFinishInboxUploadSession: { method: "POST", path: "/api/v1/crm/inbox/upload-sessions/{id}/finish", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetAnalytics: { method: "GET", path: "/api/v1/crm/analytics", module: "crm", stage: "preview", permission: "crm:team_read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetAutomationRule: { method: "GET", path: "/api/v1/crm/automation/rules/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetAutomationRunActions: { method: "GET", path: "/api/v1/crm/automation/runs/{id}/actions", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetCustomer: { method: "GET", path: "/api/v1/crm/customers/{id}", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetDeal: { method: "GET", path: "/api/v1/crm/deals/{id}", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetDealBoard: { method: "GET", path: "/api/v1/crm/deals/board", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "limit", pageSizeMax: 100, pageSizeDefault: 50 },
  crmGetDealStageHistory: { method: "GET", path: "/api/v1/crm/deals/{id}/stage-history", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetDirectoryContact: { method: "GET", path: "/api/v1/crm/contacts/{id}", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetImportUploadSession: { method: "GET", path: "/api/v1/crm/import-upload-sessions/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetInboxConversation: { method: "GET", path: "/api/v1/crm/inbox/conversations/{id}", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetInboxUploadSession: { method: "GET", path: "/api/v1/crm/inbox/upload-sessions/{id}", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetLead: { method: "GET", path: "/api/v1/crm/leads/{id}", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetLeadBoard: { method: "GET", path: "/api/v1/crm/leads/board", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetLeadHistory: { method: "GET", path: "/api/v1/crm/leads/{id}/history", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetLeadSummary: { method: "GET", path: "/api/v1/crm/leads/summary", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetOverview: { method: "GET", path: "/api/v1/crm/overview", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetPipeline: { method: "GET", path: "/api/v1/crm/pipelines/{id}", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetSettings: { method: "GET", path: "/api/v1/crm/settings", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetTimeline: { method: "GET", path: "/api/v1/crm/{entity}/{id}/timeline", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "limit", pageSizeMax: 100, pageSizeDefault: 30 },
  crmInboxAttachmentDownloadSession: { method: "GET", path: "/api/v1/crm/inbox/attachments/{id}/download-session", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmLeadDuplicates: { method: "GET", path: "/api/v1/crm/leads/{id}/duplicates", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmLinkEntityConversation: { method: "POST", path: "/api/v1/crm/inbox/entities/{entity}/{id}/conversations", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListAutomationRules: { method: "GET", path: "/api/v1/crm/automation/rules", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListAutomationRuns: { method: "GET", path: "/api/v1/crm/automation/runs", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListCustomerDuplicateGroups: { method: "GET", path: "/api/v1/crm/customers/duplicate-groups", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "limit", pageSizeMax: 200, pageSizeDefault: 50 },
  crmListCustomers: { method: "GET", path: "/api/v1/crm/customers", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 50 },
  crmListDealActivities: { method: "GET", path: "/api/v1/crm/deals/{id}/activities", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListDealContacts: { method: "GET", path: "/api/v1/crm/deals/{id}/contacts", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListDealItems: { method: "GET", path: "/api/v1/crm/deals/{id}/items", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListDirectoryContacts: { method: "GET", path: "/api/v1/crm/contacts", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListEngagementKinds: { method: "GET", path: "/api/v1/crm/engagement-kinds", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListEngagements: { method: "GET", path: "/api/v1/crm/{entity}/{id}/engagements", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListEntityConversations: { method: "GET", path: "/api/v1/crm/inbox/entities/{entity}/{id}/conversations", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListEntityMessages: { method: "GET", path: "/api/v1/crm/inbox/entities/{entity}/{id}/messages", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "limit", pageSizeMax: 200, pageSizeDefault: 100 },
  crmListExternalLinks: { method: "GET", path: "/api/v1/crm/{entity}/{id}/links", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListInboxConnections: { method: "GET", path: "/api/v1/crm/inbox/connections", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListInboxConversationLinks: { method: "GET", path: "/api/v1/crm/inbox/conversations/{id}/links", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListInboxConversations: { method: "GET", path: "/api/v1/crm/inbox/conversations", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 50 },
  crmListInboxMessageAttachments: { method: "GET", path: "/api/v1/crm/inbox/messages/{id}/attachments", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListInboxMessages: { method: "GET", path: "/api/v1/crm/inbox/conversations/{id}/messages", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 50 },
  crmListInboxProviders: { method: "GET", path: "/api/v1/crm/inbox/providers", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListInboxTemplates: { method: "GET", path: "/api/v1/crm/inbox/templates", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListLeadActivities: { method: "GET", path: "/api/v1/crm/leads/{id}/activities", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListLeadStages: { method: "GET", path: "/api/v1/crm/lead-stages", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListLeads: { method: "GET", path: "/api/v1/crm/leads", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 50 },
  crmListLossReasons: { method: "GET", path: "/api/v1/crm/loss-reasons", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListMembers: { method: "GET", path: "/api/v1/crm/members", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListPipelineDeals: { method: "GET", path: "/api/v1/crm/pipelines/{id}/deals", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 50 },
  crmListPipelines: { method: "GET", path: "/api/v1/crm/pipelines", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmMarkInboxConversationRead: { method: "POST", path: "/api/v1/crm/inbox/conversations/{id}/read", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmMergeCustomers: { method: "POST", path: "/api/v1/crm/customers/{id}/merge", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmMergeLeads: { method: "POST", path: "/api/v1/crm/leads/{id}/merge", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmMoveDeal: { method: "POST", path: "/api/v1/crm/deals/{id}/move", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmPromoteCustomer: { method: "POST", path: "/api/v1/crm/customers/{id}/promote", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmQualifyLead: { method: "POST", path: "/api/v1/crm/leads/{id}/qualify", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmReopenDeal: { method: "POST", path: "/api/v1/crm/deals/{id}/reopen", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmReorderLeadStages: { method: "PATCH", path: "/api/v1/crm/lead-stages/reorder", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmReorderPipelines: { method: "PATCH", path: "/api/v1/crm/pipelines/reorder", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmReorderStages: { method: "PATCH", path: "/api/v1/crm/pipelines/{id}/stages/reorder", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmRetryAutomationRun: { method: "POST", path: "/api/v1/crm/automation/runs/{id}/retry", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmSalesPlans: { method: "GET", path: "/api/v1/crm/sales-plans", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmSaveInboxTemplate: { method: "POST", path: "/api/v1/crm/inbox/templates", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmSaveSalesPlans: { method: "PUT", path: "/api/v1/crm/sales-plans", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmSendInboxMessage: { method: "POST", path: "/api/v1/crm/inbox/conversations/{id}/messages", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateAutomationRule: { method: "PUT", path: "/api/v1/crm/automation/rules/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateCustomer: { method: "PATCH", path: "/api/v1/crm/customers/{id}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateDeal: { method: "PATCH", path: "/api/v1/crm/deals/{id}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateEngagement: { method: "PATCH", path: "/api/v1/crm/engagements/{id}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateLead: { method: "PATCH", path: "/api/v1/crm/leads/{id}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateLeadStage: { method: "PATCH", path: "/api/v1/crm/lead-stages/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdatePipeline: { method: "PATCH", path: "/api/v1/crm/pipelines/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateSettings: { method: "PATCH", path: "/api/v1/crm/settings", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateStage: { method: "PATCH", path: "/api/v1/crm/stages/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  dashboardGetMetricSnapshot: { method: "GET", path: "/api/v1/dashboard/metrics/{id}/snapshot", module: "dashboard", stage: "preview", permission: "dashboard:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  dashboardListMetrics: { method: "GET", path: "/api/v1/dashboard/metrics", module: "dashboard", stage: "preview", permission: "dashboard:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerAppAPICalls: { method: "GET", path: "/api/v1/developer/apps/{key}/installations/{id}/api-calls", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 100 },
  developerAppBlocks: { method: "GET", path: "/api/v1/developer/app-blocks", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, installation: false, pagination: "limit", pageSizeMax: 500, pageSizeDefault: null },
  developerAppDeliveries: { method: "GET", path: "/api/v1/developer/apps/{key}/installations/{id}/deliveries", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 50 },
  developerAppInstallations: { method: "GET", path: "/api/v1/developer/apps/{key}/installations", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerAppKeys: { method: "GET", path: "/api/v1/developer/apps/{key}/keys", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerAppVersionFunctionArtifacts: { method: "GET", path: "/api/v1/developer/apps/{key}/versions/{version}/function-artifacts", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerAppVersionPublicationReport: { method: "GET", path: "/api/v1/developer/apps/{key}/versions/{version}/publication", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerAppVersions: { method: "GET", path: "/api/v1/developer/apps/{key}/versions", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerApps: { method: "GET", path: "/api/v1/developer/apps", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerCloseSession: { method: "DELETE", path: "/api/v1/developer/sessions/current", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerIssueAppKey: { method: "POST", path: "/api/v1/developer/apps/{key}/keys", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerOpenSession: { method: "POST", path: "/api/v1/developer/sessions", module: "developer", stage: "preview", permission: "developer:anonymous", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerProfile: { method: "GET", path: "/api/v1/developer/profile", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerPublisherApplication: { method: "GET", path: "/api/v1/developer/publisher-application", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerRegister: { method: "POST", path: "/api/v1/developer/registrations", module: "developer", stage: "preview", permission: "developer:anonymous", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerRequestSignInLink: { method: "POST", path: "/api/v1/developer/sign-in-links", module: "developer", stage: "preview", permission: "developer:anonymous", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerRevokeAppKey: { method: "POST", path: "/api/v1/developer/apps/{key}/keys/{id}/revocation", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerRotateAppKey: { method: "POST", path: "/api/v1/developer/apps/{key}/keys/{id}/rotation", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerSaveApp: { method: "POST", path: "/api/v1/developer/apps", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerSaveAppVersion: { method: "POST", path: "/api/v1/developer/apps/{key}/versions", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerSubmitPublisherApplication: { method: "POST", path: "/api/v1/developer/publisher-application", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerUploadAppFunctionArtifact: { method: "POST", path: "/api/v1/developer/apps/{key}/versions/{version}/function-artifact", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowAbortFlowUploadSession: { method: "DELETE", path: "/api/v1/docflow/flow/upload-sessions/{id}", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowAcknowledgeApproval: { method: "POST", path: "/api/v1/docflow/approvals/{id}/acknowledge", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowAdvanceInvoice: { method: "GET", path: "/api/v1/docflow/flow/advance-invoices", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowApproval: { method: "GET", path: "/api/v1/docflow/approvals/{id}", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowApprovalRoutes: { method: "GET", path: "/api/v1/docflow/approval-routes", module: "docflow", stage: "preview", permission: "docflow.flow:configure_payments", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowApprovalSettings: { method: "GET", path: "/api/v1/docflow/approval-settings", module: "docflow", stage: "preview", permission: "docflow.flow:configure_payments", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowApprovalSheetDocument: { method: "GET", path: "/api/v1/docflow/approvals/{id}/sheet", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowApprovalSheetDownloadSession: { method: "GET", path: "/api/v1/docflow/approvals/{id}/sheet/download-session", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowApprovalState: { method: "GET", path: "/api/v1/docflow/approvals/state", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowApprovals: { method: "GET", path: "/api/v1/docflow/approvals", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 50 },
  docflowCancelApproval: { method: "POST", path: "/api/v1/docflow/approvals/{id}/cancel", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowCancelIntake: { method: "POST", path: "/api/v1/docflow/messages/{id}/intake/cancel", module: "docflow", stage: "preview", permission: "docflow.edo:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowCheckApprovalRoute: { method: "GET", path: "/api/v1/docflow/approval-routes/check", module: "docflow", stage: "preview", permission: "docflow.flow:configure_payments", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowCreateFlowUploadSession: { method: "POST", path: "/api/v1/docflow/flow/documents/{id}/upload-sessions", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowDecideApproval: { method: "POST", path: "/api/v1/docflow/approvals/{id}/decisions", module: "docflow", stage: "preview", permission: "docflow.flow:approve", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFinishFlowUploadSession: { method: "POST", path: "/api/v1/docflow/flow/upload-sessions/{id}/finish", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowChangeDocument: { method: "POST", path: "/api/v1/docflow/flow/documents/{id}/commands", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowContactStats: { method: "GET", path: "/api/v1/docflow/flow/contacts", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowCreateDocument: { method: "POST", path: "/api/v1/docflow/flow/documents", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowDocument: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowDocumentRevision: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/revisions/{version}", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowDocumentRevisions: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/revisions", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowDocuments: { method: "GET", path: "/api/v1/docflow/flow/documents", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 50 },
  docflowFlowFileContent: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/files/{fileId}/content", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowFileDownloadSession: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/files/{fileId}/download-session", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowRevisionFileContent: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/revisions/{version}/files/{fileId}/content", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowRevisionFileDownloadSession: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/revisions/{version}/files/{fileId}/download-session", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowSignatureSheet: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/signatures/sheet", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowSignatureSheetDownloadSession: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/signatures/sheet/download-session", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowGetFlowUploadSession: { method: "GET", path: "/api/v1/docflow/flow/upload-sessions/{id}", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowGetMessage: { method: "GET", path: "/api/v1/docflow/messages/{id}", module: "docflow", stage: "preview", permission: "docflow.edo:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowIssueAdvanceInvoice: { method: "POST", path: "/api/v1/docflow/flow/advance-invoices", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowIssueSaleAct: { method: "POST", path: "/api/v1/docflow/sales/{id}/act", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowIssueSaleInvoice: { method: "POST", path: "/api/v1/docflow/sales/{id}/invoice", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowIssueSaleUPD: { method: "POST", path: "/api/v1/docflow/sales/{id}/upd", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowIssueTemplatePastActs: { method: "POST", path: "/api/v1/docflow/sale-templates/{id}/past-acts", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowListConnections: { method: "GET", path: "/api/v1/docflow/connections", module: "docflow", stage: "preview", permission: "docflow.edo:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowListMessages: { method: "GET", path: "/api/v1/docflow/messages", module: "docflow", stage: "preview", permission: "docflow.edo:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 50 },
  docflowPaymentRequestRoutePreview: { method: "GET", path: "/api/v1/docflow/payment-requests/route-preview", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowResubmitApproval: { method: "POST", path: "/api/v1/docflow/approvals/{id}/resubmit", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowSaleDocumentSet: { method: "GET", path: "/api/v1/docflow/sales/{id}/set", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowSubmitApproval: { method: "POST", path: "/api/v1/docflow/approvals", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowTemplatePastActs: { method: "GET", path: "/api/v1/docflow/sale-templates/{id}/past-acts", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesAbortUpload: { method: "DELETE", path: "/api/v1/files/uploads/{id}", module: "files", stage: "preview", permission: "files:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesCompleteUpload: { method: "POST", path: "/api/v1/files/uploads/{id}/complete", module: "files", stage: "preview", permission: "files:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesContentLink: { method: "GET", path: "/api/v1/files/items/{id}/content-url", module: "files", stage: "preview", permission: "files:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesCreateFolder: { method: "POST", path: "/api/v1/files/folders", module: "files", stage: "preview", permission: "files:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesCreateShare: { method: "POST", path: "/api/v1/files/shares", module: "files", stage: "preview", permission: "files:share", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesCreateShortcut: { method: "POST", path: "/api/v1/files/shortcuts", module: "files", stage: "preview", permission: "files:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesFolderAccess: { method: "GET", path: "/api/v1/files/folders/{id}/access", module: "files", stage: "preview", permission: "files:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesGetFile: { method: "GET", path: "/api/v1/files/items/{id}", module: "files", stage: "preview", permission: "files:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesListEntries: { method: "GET", path: "/api/v1/files/folders/{id}/entries", module: "files", stage: "preview", permission: "files:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 200 },
  filesListRoots: { method: "GET", path: "/api/v1/files/roots", module: "files", stage: "preview", permission: "files:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesListVersions: { method: "GET", path: "/api/v1/files/items/{id}/versions", module: "files", stage: "preview", permission: "files:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesRevokeShare: { method: "DELETE", path: "/api/v1/files/shares/{id}", module: "files", stage: "preview", permission: "files:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesSearch: { method: "GET", path: "/api/v1/files/search", module: "files", stage: "preview", permission: "files:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 25 },
  filesStartUpload: { method: "POST", path: "/api/v1/files/uploads", module: "files", stage: "preview", permission: "files:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesUploadStatus: { method: "GET", path: "/api/v1/files/uploads/{id}", module: "files", stage: "preview", permission: "files:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesVersionContentLink: { method: "GET", path: "/api/v1/files/versions/{id}/content-url", module: "files", stage: "preview", permission: "files:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeAccountableBalances: { method: "GET", path: "/api/v1/finance/accountable/balances", module: "finance", stage: "preview", permission: "finance.accountable:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeAddAllocationRule: { method: "POST", path: "/api/v1/finance/settlements/allocation-rules", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeAddTaxRecipientFromPayment: { method: "POST", path: "/api/v1/finance/taxes/settings/recipients", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeApplyAllocationRules: { method: "POST", path: "/api/v1/finance/settlements/unapplied/apply-rules", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeApplyExchangeItem: { method: "POST", path: "/api/v1/finance/exchange/items/{id}/apply", module: "finance", stage: "preview", permission: "finance.exchange:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeApproveDividendDecision: { method: "POST", path: "/api/v1/finance/dividends/decisions/{id}/approve", module: "finance", stage: "preview", permission: "finance.dividends:approve", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeApproveDividendPolicy: { method: "POST", path: "/api/v1/finance/dividends/policies/{id}/approve", module: "finance", stage: "preview", permission: "finance.dividends:approve", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCancelOperation: { method: "POST", path: "/api/v1/finance/operations/{id}/cancel", module: "finance", stage: "preview", permission: "finance.operations:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCancelSettlementDocument: { method: "POST", path: "/api/v1/finance/settlements/documents/{id}/cancel", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCancelTaxMonth: { method: "POST", path: "/api/v1/finance/taxes/months/{id}/cancel", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCashflowEntries: { method: "GET", path: "/api/v1/finance/reports/cashflow/entries", module: "finance", stage: "preview", permission: "finance.reports.cashflow:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCategorizeCashOperation: { method: "POST", path: "/api/v1/finance/cash-operations/{id}/categorize", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCategorizeTransaction: { method: "POST", path: "/api/v1/finance/transactions/{id}/categorize", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateAccount: { method: "POST", path: "/api/v1/finance/accounts", module: "finance", stage: "preview", permission: "finance.accounts:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateCounterpartyTerms: { method: "POST", path: "/api/v1/finance/counterparties/{contactId}/terms", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateDividendDecision: { method: "POST", path: "/api/v1/finance/dividends/decisions", module: "finance", stage: "preview", permission: "finance.dividends:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateDividendPolicy: { method: "POST", path: "/api/v1/finance/dividends/policies", module: "finance", stage: "preview", permission: "finance.dividends:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateExpenseReport: { method: "POST", path: "/api/v1/finance/accountable/reports", module: "finance", stage: "preview", permission: "finance.accountable:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateOpeningDebt: { method: "POST", path: "/api/v1/finance/opening-debts", module: "finance", stage: "preview", permission: "finance.accounts:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateOperation: { method: "POST", path: "/api/v1/finance/operations", module: "finance", stage: "preview", permission: "finance.operations:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateOperationAccrual: { method: "POST", path: "/api/v1/finance/operations/{id}/accruals", module: "finance", stage: "preview", permission: "finance.operations:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreatePaymentPlan: { method: "POST", path: "/api/v1/finance/payment-calendar/plans", module: "finance", stage: "preview", permission: "finance.payment_calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateSettlementDocument: { method: "POST", path: "/api/v1/finance/settlements/documents", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateStatement: { method: "POST", path: "/api/v1/finance/statements", module: "finance", stage: "preview", permission: "finance.statements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateTaxMonth: { method: "POST", path: "/api/v1/finance/taxes/months", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateTradeAct: { method: "POST", path: "/api/v1/finance/trade/{id}/acts", module: "finance", stage: "preview", permission: "finance.operations:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateTransaction: { method: "POST", path: "/api/v1/finance/transactions", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeDeleteAcquirer: { method: "DELETE", path: "/api/v1/finance/acquirers/{id}", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeDeleteSettlementDocument: { method: "DELETE", path: "/api/v1/finance/settlements/documents/{id}", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeExpenseReports: { method: "GET", path: "/api/v1/finance/accountable/reports", module: "finance", stage: "preview", permission: "finance.accountable:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 200 },
  financeGetAccount: { method: "GET", path: "/api/v1/finance/accounts/{id}", module: "finance", stage: "preview", permission: "finance.accounts:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetAcquiringOverview: { method: "GET", path: "/api/v1/finance/acquiring/overview", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetAcquiringRegistry: { method: "GET", path: "/api/v1/finance/acquiring/registries/{id}", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetBalanceReport: { method: "GET", path: "/api/v1/finance/reports/balance", module: "finance", stage: "preview", permission: "finance.reports.balance:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetCashflowReport: { method: "GET", path: "/api/v1/finance/reports/cashflow", module: "finance", stage: "preview", permission: "finance.reports.cashflow:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetConnector: { method: "GET", path: "/api/v1/finance/connectors/{id}", module: "finance", stage: "preview", permission: "finance.connectors:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetCounterpartyTerms: { method: "GET", path: "/api/v1/finance/counterparties/{contactId}/terms", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetDividendSummary: { method: "GET", path: "/api/v1/finance/dividends/summary", module: "finance", stage: "preview", permission: "finance.dividends:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetOperation: { method: "GET", path: "/api/v1/finance/operations/{id}", module: "finance", stage: "preview", permission: "finance.operations:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetOperationDocumentLinks: { method: "GET", path: "/api/v1/finance/operations/{id}/documents/{documentId}/links", module: "finance", stage: "preview", permission: "finance.operations:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetPaymentCalendar: { method: "GET", path: "/api/v1/finance/payment-calendar", module: "finance", stage: "preview", permission: "finance.payment_calendar:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetPayrollAutomation: { method: "GET", path: "/api/v1/finance/payroll/automation", module: "finance", stage: "preview", permission: "finance.payroll:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetPnlReport: { method: "GET", path: "/api/v1/finance/reports/pnl", module: "finance", stage: "preview", permission: "finance.reports.pnl:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetProjectBudgetHistory: { method: "GET", path: "/api/v1/finance/project-budgets", module: "finance", stage: "preview", permission: "finance.project_budgets:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetProjectEconomics: { method: "GET", path: "/api/v1/finance/reports/projects", module: "finance", stage: "preview", permission: "finance.reports.projects:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetReconciliation: { method: "GET", path: "/api/v1/finance/transactions/reconciliation", module: "finance", stage: "preview", permission: "finance.transactions:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetSettlementDocument: { method: "GET", path: "/api/v1/finance/settlements/documents/{id}", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetSettlementPosition: { method: "GET", path: "/api/v1/finance/settlements/position", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetTaxMonth: { method: "GET", path: "/api/v1/finance/taxes/months/{id}", module: "finance", stage: "preview", permission: "finance.period:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetTaxSettings: { method: "GET", path: "/api/v1/finance/taxes/settings", module: "finance", stage: "preview", permission: "finance.period:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetTaxSummary: { method: "GET", path: "/api/v1/finance/taxes/summary", module: "finance", stage: "preview", permission: "finance.period:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetTransaction: { method: "GET", path: "/api/v1/finance/transactions/{id}", module: "finance", stage: "preview", permission: "finance.transactions:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeImportAcquiringRegistry: { method: "POST", path: "/api/v1/finance/acquiring/registries", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeLinkStatementTransactions: { method: "POST", path: "/api/v1/finance/statements/{id}/transactions", module: "finance", stage: "preview", permission: "finance.statements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListAccounts: { method: "GET", path: "/api/v1/finance/accounts", module: "finance", stage: "preview", permission: "finance.accounts:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListAcquirers: { method: "GET", path: "/api/v1/finance/acquirers", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListAllocationRules: { method: "GET", path: "/api/v1/finance/settlements/allocation-rules", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListConnectorAccounts: { method: "GET", path: "/api/v1/finance/connectors/{id}/accounts", module: "finance", stage: "preview", permission: "finance.connectors:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListConnectorProviders: { method: "GET", path: "/api/v1/finance/connectors/providers", module: "finance", stage: "preview", permission: "finance.connectors:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListConnectorRuns: { method: "GET", path: "/api/v1/finance/connectors/{id}/runs", module: "finance", stage: "preview", permission: "finance.connectors:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 100, pageSizeDefault: 20 },
  financeListConnectors: { method: "GET", path: "/api/v1/finance/connectors", module: "finance", stage: "preview", permission: "finance.connectors:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListDividendAccessUsers: { method: "GET", path: "/api/v1/finance/dividends/access-users", module: "finance", stage: "preview", permission: "finance.dividends:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListDividendAutomationRuns: { method: "GET", path: "/api/v1/finance/dividends/automation/runs", module: "finance", stage: "preview", permission: "finance.dividends:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 200, pageSizeDefault: 100 },
  financeListDividendDecisions: { method: "GET", path: "/api/v1/finance/dividends/decisions", module: "finance", stage: "preview", permission: "finance.dividends:write", idempotent: false, installation: false, pagination: "limit", pageSizeMax: 200, pageSizeDefault: 100 },
  financeListDividendOwners: { method: "GET", path: "/api/v1/finance/dividends/owners", module: "finance", stage: "preview", permission: "finance.dividends:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListDividendPolicies: { method: "GET", path: "/api/v1/finance/dividends/policies", module: "finance", stage: "preview", permission: "finance.dividends:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListExchangeJournal: { method: "GET", path: "/api/v1/finance/exchange/journal", module: "finance", stage: "preview", permission: "finance.exchange:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 200 },
  financeListPaymentFacts: { method: "GET", path: "/api/v1/finance/payment-calendar/operations", module: "finance", stage: "preview", permission: "finance.payment_calendar:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 200 },
  financeListPayrollAutomationRuns: { method: "GET", path: "/api/v1/finance/payroll/automation/runs", module: "finance", stage: "preview", permission: "finance.payroll:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 100 },
  financeListSettlementBalances: { method: "GET", path: "/api/v1/finance/settlements/balances", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListSettlementDocuments: { method: "GET", path: "/api/v1/finance/settlements/documents", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 200 },
  financeListSettlementPayments: { method: "GET", path: "/api/v1/finance/settlements/payments", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListSettlementSources: { method: "GET", path: "/api/v1/finance/settlements/sources", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListStatements: { method: "GET", path: "/api/v1/finance/statements", module: "finance", stage: "preview", permission: "finance.statements:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 100 },
  financeListTaxKinds: { method: "GET", path: "/api/v1/finance/taxes/kinds", module: "finance", stage: "preview", permission: "finance.period:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListTaxMonths: { method: "GET", path: "/api/v1/finance/taxes/months", module: "finance", stage: "preview", permission: "finance.period:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: null },
  financeListTaxPayments: { method: "GET", path: "/api/v1/finance/taxes/payments", module: "finance", stage: "preview", permission: "finance.period:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListTransactions: { method: "GET", path: "/api/v1/finance/transactions", module: "finance", stage: "preview", permission: "finance.transactions:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 500 },
  financeMarkTransactionDeleted: { method: "POST", path: "/api/v1/finance/transactions/{id}/mark-deleted", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeMergeItem: { method: "POST", path: "/api/v1/finance/items/{id}/merge", module: "finance", stage: "preview", permission: "finance.statements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeOffsetTradeAdvances: { method: "POST", path: "/api/v1/finance/trade/{id}/advance-offset", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePostDividendDecision: { method: "POST", path: "/api/v1/finance/dividends/decisions/{id}/post", module: "finance", stage: "preview", permission: "finance.dividends:approve", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePostExpenseReport: { method: "POST", path: "/api/v1/finance/accountable/reports/{id}/post", module: "finance", stage: "preview", permission: "finance.accountable:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePostSettlementDocument: { method: "POST", path: "/api/v1/finance/settlements/documents/{id}/post", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePostTaxMonth: { method: "POST", path: "/api/v1/finance/taxes/months/{id}/post", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePostZReport: { method: "POST", path: "/api/v1/finance/z-reports", module: "finance", stage: "preview", permission: "finance.operations:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePreviewDividendDecision: { method: "GET", path: "/api/v1/finance/dividends/decisions/preview", module: "finance", stage: "preview", permission: "finance.dividends:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePreviewItemMerge: { method: "POST", path: "/api/v1/finance/items/{id}/merge/preview", module: "finance", stage: "preview", permission: "finance.statements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeQuarantineExchangeItem: { method: "POST", path: "/api/v1/finance/exchange/items/{id}/quarantine", module: "finance", stage: "preview", permission: "finance.exchange:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeReconcileRegisters: { method: "GET", path: "/api/v1/finance/registers/reconcile", module: "finance", stage: "preview", permission: "finance.registers:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRecordExchangeItem: { method: "POST", path: "/api/v1/finance/exchange/items", module: "finance", stage: "preview", permission: "finance.exchange:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRepairRegisters: { method: "POST", path: "/api/v1/finance/registers/repair", module: "finance", stage: "preview", permission: "finance.registers:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRepostTransaction: { method: "POST", path: "/api/v1/finance/transactions/{id}/repost", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRepostTransactions: { method: "POST", path: "/api/v1/finance/transactions/repost", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRestoreTransaction: { method: "POST", path: "/api/v1/finance/transactions/{id}/restore", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeResyncRegisters: { method: "POST", path: "/api/v1/finance/registers/resync", module: "finance", stage: "preview", permission: "finance.registers:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRunDividendAutomation: { method: "POST", path: "/api/v1/finance/dividends/automation/run", module: "finance", stage: "preview", permission: "finance.dividends:auto", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRunPayrollAutomation: { method: "POST", path: "/api/v1/finance/payroll/automation/run", module: "finance", stage: "preview", permission: "finance.payroll:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSaveAcquirer: { method: "PUT", path: "/api/v1/finance/acquirers", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSavePayrollAutomation: { method: "PUT", path: "/api/v1/finance/payroll/automation", module: "finance", stage: "preview", permission: "finance.payroll:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSaveProjectBudget: { method: "POST", path: "/api/v1/finance/project-budgets", module: "finance", stage: "preview", permission: "finance.project_budgets:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSaveTaxSettings: { method: "PUT", path: "/api/v1/finance/taxes/settings", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSyncConnector: { method: "POST", path: "/api/v1/finance/connectors/{id}/sync", module: "finance", stage: "preview", permission: "finance.connectors:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeTradeAdvanceOffer: { method: "GET", path: "/api/v1/finance/trade/{id}/advance-offer", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateAccount: { method: "PATCH", path: "/api/v1/finance/accounts/{id}", module: "finance", stage: "preview", permission: "finance.accounts:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateCashOperationResponsible: { method: "PATCH", path: "/api/v1/finance/cash-operations/{id}/responsible", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateConnectorAccount: { method: "PATCH", path: "/api/v1/finance/connectors/accounts/{accountId}", module: "finance", stage: "preview", permission: "finance.connectors:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateTaxMonth: { method: "PUT", path: "/api/v1/finance/taxes/months/{id}", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateTransactionResponsible: { method: "PATCH", path: "/api/v1/finance/transactions/{id}/responsible", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeAbortAssetUploadSession: { method: "DELETE", path: "/api/v1/knowledge/upload-sessions/{sessionId}", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeAnswer: { method: "POST", path: "/api/v1/knowledge/answer", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeCreateAssetDownloadSession: { method: "POST", path: "/api/v1/knowledge/assets/{id}/download-session", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeCreateAssetUploadSession: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/upload-sessions", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeCreatePage: { method: "POST", path: "/api/v1/knowledge/nodes", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeCreateSpace: { method: "POST", path: "/api/v1/knowledge/spaces", module: "knowledge", stage: "preview", permission: "knowledge:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeDeleteAsset: { method: "DELETE", path: "/api/v1/knowledge/assets/{id}", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeFinishAssetUploadSession: { method: "POST", path: "/api/v1/knowledge/upload-sessions/{sessionId}/finish", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetAssetContent: { method: "GET", path: "/api/v1/knowledge/assets/{id}/content", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetAssetUploadSession: { method: "GET", path: "/api/v1/knowledge/upload-sessions/{sessionId}", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetPage: { method: "GET", path: "/api/v1/knowledge/nodes/{id}", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetPageAccess: { method: "GET", path: "/api/v1/knowledge/nodes/{id}/access", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetSpaceAccess: { method: "GET", path: "/api/v1/knowledge/spaces/{id}/access", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetSpaceTree: { method: "GET", path: "/api/v1/knowledge/spaces/{id}/tree", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeListAccessOptions: { method: "GET", path: "/api/v1/knowledge/access-options", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeListPageAssets: { method: "GET", path: "/api/v1/knowledge/nodes/{id}/assets", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeListSpaces: { method: "GET", path: "/api/v1/knowledge/spaces", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeListTrashedPages: { method: "GET", path: "/api/v1/knowledge/archive", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeMovePage: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/move", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgePublishPage: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/publish", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeReplacePageAccess: { method: "PUT", path: "/api/v1/knowledge/nodes/{id}/access", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeReplaceSpaceAccess: { method: "PUT", path: "/api/v1/knowledge/spaces/{id}/access", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeRestorePage: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/restore", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeSavePageRevision: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/revisions", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeSearch: { method: "GET", path: "/api/v1/knowledge/search", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "limit", pageSizeMax: 100, pageSizeDefault: 20 },
  knowledgeSubmitPage: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/submit", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeTrashPage: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/archive", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeUploadPageAsset: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/assets", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailAbortUploadSession: { method: "DELETE", path: "/api/v1/mail/upload-sessions/{id}", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailApplyRules: { method: "POST", path: "/api/v1/mail/accounts/{id}/rules/apply", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailAttachStoredFile: { method: "POST", path: "/api/v1/mail/accounts/{id}/uploads/from-file", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailAttachmentDownloadSession: { method: "GET", path: "/api/v1/mail/attachments/{id}/download-session", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailComposeMessage: { method: "POST", path: "/api/v1/mail/accounts/{id}/messages", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailCountVIPUnread: { method: "GET", path: "/api/v1/mail/vip-senders/unread", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailCreateFolder: { method: "POST", path: "/api/v1/mail/accounts/{id}/folders", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailCreateRule: { method: "POST", path: "/api/v1/mail/accounts/{id}/rules", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailCreateUploadSession: { method: "POST", path: "/api/v1/mail/accounts/{id}/upload-sessions", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailDeleteFolder: { method: "DELETE", path: "/api/v1/mail/folders/{id}", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailDeleteMessage: { method: "DELETE", path: "/api/v1/mail/messages/{id}", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailDeleteRule: { method: "DELETE", path: "/api/v1/mail/rules/{id}", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailFinishUploadSession: { method: "POST", path: "/api/v1/mail/upload-sessions/{id}/finish", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailFlagMessage: { method: "POST", path: "/api/v1/mail/messages/{id}/flag", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailGetAccount: { method: "GET", path: "/api/v1/mail/accounts/{id}", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailGetAttachmentContent: { method: "GET", path: "/api/v1/mail/attachments/{id}/content", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailGetMessage: { method: "GET", path: "/api/v1/mail/messages/{id}", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailGetThread: { method: "GET", path: "/api/v1/mail/threads/{id}", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailGetUploadSession: { method: "GET", path: "/api/v1/mail/upload-sessions/{id}", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailListAccounts: { method: "GET", path: "/api/v1/mail/accounts", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailListFolders: { method: "GET", path: "/api/v1/mail/accounts/{id}/folders", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailListMessageAttachments: { method: "GET", path: "/api/v1/mail/messages/{id}/attachments", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailListMessages: { method: "GET", path: "/api/v1/mail/messages", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 50 },
  mailListOutbox: { method: "GET", path: "/api/v1/mail/accounts/{id}/outbox", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 50 },
  mailListPeople: { method: "GET", path: "/api/v1/mail/people", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailListProviders: { method: "GET", path: "/api/v1/mail/providers", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailListRules: { method: "GET", path: "/api/v1/mail/accounts/{id}/rules", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailListVIPSenders: { method: "GET", path: "/api/v1/mail/vip-senders", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailMarkMessageNotSpam: { method: "POST", path: "/api/v1/mail/messages/{id}/not-spam", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailMarkMessageRead: { method: "POST", path: "/api/v1/mail/messages/{id}/read", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailMarkMessageSpam: { method: "POST", path: "/api/v1/mail/messages/{id}/spam", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailMarkMessageUnread: { method: "POST", path: "/api/v1/mail/messages/{id}/unread", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailMoveMessage: { method: "POST", path: "/api/v1/mail/messages/{id}/move", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailReadBatch: { method: "POST", path: "/api/v1/mail/messages/read", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailRenameFolder: { method: "PATCH", path: "/api/v1/mail/folders/{id}", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailSetVIPSender: { method: "POST", path: "/api/v1/mail/vip-senders", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailSyncAccount: { method: "POST", path: "/api/v1/mail/accounts/{id}/sync", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailUpdateRule: { method: "PATCH", path: "/api/v1/mail/rules/{id}", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceCreateOzonStore: { method: "POST", path: "/api/v1/marketplace/ozon/stores", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceCreateWbStore: { method: "POST", path: "/api/v1/marketplace/wb/stores", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceCreateYandexStore: { method: "POST", path: "/api/v1/marketplace/yandex/stores", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonDecomposition: { method: "GET", path: "/api/v1/marketplace/ozon/decomposition", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonOrdersOverview: { method: "GET", path: "/api/v1/marketplace/ozon/orders/overview", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonPnl: { method: "GET", path: "/api/v1/marketplace/ozon/pnl", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonProducts: { method: "GET", path: "/api/v1/marketplace/ozon/products", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "page", pageSizeMax: 10000, pageSizeDefault: 50 },
  marketplaceOzonSetCost: { method: "POST", path: "/api/v1/marketplace/ozon/cost", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonStocks: { method: "GET", path: "/api/v1/marketplace/ozon/stocks", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonStores: { method: "GET", path: "/api/v1/marketplace/ozon/stores", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonSyncJobs: { method: "GET", path: "/api/v1/marketplace/ozon/sync-jobs", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceSetYandexCost: { method: "POST", path: "/api/v1/marketplace/yandex/cost", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbCardBoard: { method: "GET", path: "/api/v1/marketplace/wb/card/board", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbCardOptions: { method: "GET", path: "/api/v1/marketplace/wb/card/options", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbDecomposition: { method: "GET", path: "/api/v1/marketplace/wb/decomposition", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbOrdersOverview: { method: "GET", path: "/api/v1/marketplace/wb/orders/overview", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbPnl: { method: "GET", path: "/api/v1/marketplace/wb/pnl", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbProducts: { method: "GET", path: "/api/v1/marketplace/wb/products", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "page", pageSizeMax: 10000, pageSizeDefault: 50 },
  marketplaceWbSetCost: { method: "POST", path: "/api/v1/marketplace/wb/cost", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbStocks: { method: "GET", path: "/api/v1/marketplace/wb/stocks", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbStores: { method: "GET", path: "/api/v1/marketplace/wb/stores", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceYandexOrdersOverview: { method: "GET", path: "/api/v1/marketplace/yandex/orders/overview", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceYandexPnl: { method: "GET", path: "/api/v1/marketplace/yandex/pnl", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceYandexProducts: { method: "GET", path: "/api/v1/marketplace/yandex/products", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "page", pageSizeMax: 10000, pageSizeDefault: 50 },
  marketplaceYandexStores: { method: "GET", path: "/api/v1/marketplace/yandex/stores", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  printFormDownloadSession: { method: "GET", path: "/api/v1/print/forms/{kind}/{id}/download-session", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListCompanies: { method: "GET", path: "/api/v1/settings/companies", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListMembers: { method: "GET", path: "/api/v1/settings/members", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListRoles: { method: "GET", path: "/api/v1/settings/roles", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListSelectableCompanies: { method: "GET", path: "/api/v1/settings/companies/selectable", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListVatRates: { method: "GET", path: "/api/v1/settings/vat-rates", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsReplaceMemberAccess: { method: "PUT", path: "/api/v1/settings/members/{id}/access", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockAbortUploadSession: { method: "DELETE", path: "/api/v1/stock/upload-sessions/{id}", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockAccountTransferProposal: { method: "GET", path: "/api/v1/stock/account-transfers/proposal", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockApplyImport: { method: "POST", path: "/api/v1/stock/imports/{id}/apply", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockApplyWarehouseZoneAllocation: { method: "POST", path: "/api/v1/stock/warehouses/{id}/zones/allocation", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCancelDocument: { method: "POST", path: "/api/v1/stock/documents/{id}/cancel", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateAccountTransfer: { method: "POST", path: "/api/v1/stock/account-transfers", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateAssemblySpec: { method: "POST", path: "/api/v1/stock/assembly-specs", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateClaimWriteoff: { method: "POST", path: "/api/v1/stock/claim-writeoffs", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateDocument: { method: "POST", path: "/api/v1/stock/documents", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateExport: { method: "POST", path: "/api/v1/stock/exports", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateImportUploadSession: { method: "POST", path: "/api/v1/stock/imports/upload-sessions", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateOpeningBalance: { method: "POST", path: "/api/v1/stock/opening-balances", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreatePurchase: { method: "POST", path: "/api/v1/stock/purchasing/purchases", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateReceiptCorrection: { method: "POST", path: "/api/v1/stock/receipt-corrections", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateWarehouse: { method: "POST", path: "/api/v1/stock/warehouses", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateWarehouseZone: { method: "POST", path: "/api/v1/stock/warehouses/{id}/zones", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockDeactivateWarehouse: { method: "POST", path: "/api/v1/stock/warehouses/{id}/deactivate", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockDeriveInventoryActs: { method: "POST", path: "/api/v1/stock/documents/{id}/derive", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockDisableWarehouseZones: { method: "POST", path: "/api/v1/stock/warehouses/{id}/zones/disable", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockDropWarehouseZoneAllocationDraft: { method: "DELETE", path: "/api/v1/stock/warehouses/{id}/zones/allocation/draft", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockEnableWarehouseZones: { method: "POST", path: "/api/v1/stock/warehouses/{id}/zones/enable", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockExportDownloadSession: { method: "GET", path: "/api/v1/stock/exports/{id}/download-session", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockFinishInventoryCount: { method: "POST", path: "/api/v1/stock/documents/{id}/inventory-finish", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockFinishUploadSession: { method: "POST", path: "/api/v1/stock/upload-sessions/{id}/finish", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetAssemblySpec: { method: "GET", path: "/api/v1/stock/assembly-specs/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetDocument: { method: "GET", path: "/api/v1/stock/documents/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetDocumentBlockers: { method: "GET", path: "/api/v1/stock/documents/{id}/blockers", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetDocumentFulfillment: { method: "GET", path: "/api/v1/stock/documents/{id}/fulfillment", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetDocumentLinks: { method: "GET", path: "/api/v1/stock/documents/{id}/links", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetExport: { method: "GET", path: "/api/v1/stock/exports/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetExportContent: { method: "GET", path: "/api/v1/stock/exports/{id}/content", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetHandlingUnit: { method: "GET", path: "/api/v1/stock/handling-units/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 1000, pageSizeDefault: 200 },
  stockGetImport: { method: "GET", path: "/api/v1/stock/imports/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetImportErrors: { method: "GET", path: "/api/v1/stock/imports/{id}/errors", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetImportSource: { method: "GET", path: "/api/v1/stock/imports/{id}/source", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetImportTemplate: { method: "GET", path: "/api/v1/stock/import-templates/{kind}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetInventoryCountSheet: { method: "GET", path: "/api/v1/stock/documents/{id}/count-sheet", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetOverdueReservations: { method: "GET", path: "/api/v1/stock/report/reservations/overdue", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 1000, pageSizeDefault: 200 },
  stockGetPurchasingReport: { method: "GET", path: "/api/v1/stock/report/purchasing", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 200 },
  stockGetReceiptClaimBalance: { method: "GET", path: "/api/v1/stock/documents/{id}/claim", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetReservationSummaries: { method: "GET", path: "/api/v1/stock/report/reservations", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 1000, pageSizeDefault: 500 },
  stockGetSaleShipping: { method: "GET", path: "/api/v1/stock/sales/{id}/shipping", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetSalesToShip: { method: "GET", path: "/api/v1/stock/sales/to-ship", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetSettings: { method: "GET", path: "/api/v1/stock/settings", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetStocksReport: { method: "GET", path: "/api/v1/stock/report/stocks", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: 200 },
  stockGetUploadSession: { method: "GET", path: "/api/v1/stock/upload-sessions/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetValuationRun: { method: "GET", path: "/api/v1/stock/valuation/rebuild/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetWarehouse: { method: "GET", path: "/api/v1/stock/warehouses/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetWarehouseZoneAllocation: { method: "GET", path: "/api/v1/stock/warehouses/{id}/zones/allocation", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockImportErrorsDownloadSession: { method: "GET", path: "/api/v1/stock/imports/{id}/errors/download-session", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockImportSourceDownloadSession: { method: "GET", path: "/api/v1/stock/imports/{id}/source/download-session", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockImportTemplateDownloadSession: { method: "GET", path: "/api/v1/stock/import-templates/{kind}/download-session", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockInspectImport: { method: "POST", path: "/api/v1/stock/imports/{id}/inspect", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListAssemblySpecs: { method: "GET", path: "/api/v1/stock/assembly-specs", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 50 },
  stockListBatches: { method: "GET", path: "/api/v1/stock/batches", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 100 },
  stockListCompanyPolicies: { method: "GET", path: "/api/v1/stock/company-policies", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListDocumentAuthors: { method: "GET", path: "/api/v1/stock/documents/authors", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListDocumentFulfillments: { method: "GET", path: "/api/v1/stock/documents/fulfillments", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListDocuments: { method: "GET", path: "/api/v1/stock/documents", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 200 },
  stockListHandlingUnits: { method: "GET", path: "/api/v1/stock/handling-units", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: 200 },
  stockListInventoryChanges: { method: "GET", path: "/api/v1/stock/documents/{id}/inventory-changes", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListProductUOMs: { method: "GET", path: "/api/v1/stock/products/{productId}/uoms", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListReorderRules: { method: "GET", path: "/api/v1/stock/reorder-rules", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 50 },
  stockListSuppliers: { method: "GET", path: "/api/v1/stock/suppliers", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListWarehouses: { method: "GET", path: "/api/v1/stock/warehouses", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockPostDocument: { method: "POST", path: "/api/v1/stock/documents/{id}/post", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockPreviewImport: { method: "POST", path: "/api/v1/stock/imports/{id}/preview", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockPreviewValuation: { method: "POST", path: "/api/v1/stock/valuation/preview", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockRebuildValuation: { method: "POST", path: "/api/v1/stock/valuation/rebuild", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockRefreshInventorySnapshot: { method: "POST", path: "/api/v1/stock/documents/{id}/inventory-refresh", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockReleaseReservation: { method: "POST", path: "/api/v1/stock/documents/{id}/release", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSaveInventoryCounts: { method: "PATCH", path: "/api/v1/stock/documents/{id}/inventory-counts", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSaveProductUOM: { method: "PUT", path: "/api/v1/stock/product-uoms", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSaveReorderRule: { method: "PUT", path: "/api/v1/stock/reorder-rules", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSaveWarehouseZoneAllocationDraft: { method: "PUT", path: "/api/v1/stock/warehouses/{id}/zones/allocation/draft", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockScanProduct: { method: "GET", path: "/api/v1/stock/products/scan", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSetAssemblySpecStatus: { method: "POST", path: "/api/v1/stock/assembly-specs/{id}/status", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockShipSale: { method: "POST", path: "/api/v1/stock/sales/{id}/shipment", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSuggestHandlingUnits: { method: "GET", path: "/api/v1/stock/handling-units/suggestions", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateAssemblySpec: { method: "PUT", path: "/api/v1/stock/assembly-specs/{id}", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateCompanyPolicy: { method: "PATCH", path: "/api/v1/stock/company-policies/{companyId}", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateDocument: { method: "PATCH", path: "/api/v1/stock/documents/{id}", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateHandlingUnitStatus: { method: "PATCH", path: "/api/v1/stock/handling-units/{id}/status", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateImportMapping: { method: "PATCH", path: "/api/v1/stock/imports/{id}/mapping", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateReorderRule: { method: "PATCH", path: "/api/v1/stock/reorder-rules/{id}", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateSettings: { method: "PATCH", path: "/api/v1/stock/settings", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateWarehouse: { method: "PATCH", path: "/api/v1/stock/warehouses/{id}", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksAddSectionMember: { method: "POST", path: "/api/v1/tasks/sections/{id}/members", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksArchiveProject: { method: "DELETE", path: "/api/v1/tasks/projects/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksArchiveSection: { method: "DELETE", path: "/api/v1/tasks/sections/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksArchiveTask: { method: "DELETE", path: "/api/v1/tasks/tasks/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksArchiveTemplate: { method: "DELETE", path: "/api/v1/tasks/templates/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateAttachmentReplacementSession: { method: "POST", path: "/api/v1/tasks/attachments/{id}/replace-sessions", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateAttachmentUploadSession: { method: "POST", path: "/api/v1/tasks/attachments/upload-sessions", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateComment: { method: "POST", path: "/api/v1/tasks/tasks/{id}/comments", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateCustomer: { method: "POST", path: "/api/v1/tasks/customers", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateCustomerNeed: { method: "POST", path: "/api/v1/tasks/customer-needs", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateCycle: { method: "POST", path: "/api/v1/tasks/cycles", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateDiscussionComment: { method: "POST", path: "/api/v1/tasks/discussion-comments", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateDocument: { method: "POST", path: "/api/v1/tasks/documents", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateLink: { method: "POST", path: "/api/v1/tasks/tasks/{id}/links", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateMeeting: { method: "POST", path: "/api/v1/tasks/hub/meetings", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateMilestone: { method: "POST", path: "/api/v1/tasks/milestones", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateProject: { method: "POST", path: "/api/v1/tasks/projects", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreatePullRequest: { method: "POST", path: "/api/v1/tasks/pull-requests", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateRelation: { method: "POST", path: "/api/v1/tasks/tasks/{id}/relations", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateSection: { method: "POST", path: "/api/v1/tasks/sections", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateStatus: { method: "POST", path: "/api/v1/tasks/statuses", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateStatusUpdate: { method: "POST", path: "/api/v1/tasks/status-updates", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateTag: { method: "POST", path: "/api/v1/tasks/tags", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateTask: { method: "POST", path: "/api/v1/tasks/tasks", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateTemplate: { method: "POST", path: "/api/v1/tasks/templates", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateView: { method: "POST", path: "/api/v1/tasks/views", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteAttachment: { method: "DELETE", path: "/api/v1/tasks/attachments/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteComment: { method: "DELETE", path: "/api/v1/tasks/comments/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteCustomer: { method: "DELETE", path: "/api/v1/tasks/customers/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteCustomerNeed: { method: "DELETE", path: "/api/v1/tasks/customer-needs/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteCycle: { method: "DELETE", path: "/api/v1/tasks/cycles/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteDiscussionComment: { method: "DELETE", path: "/api/v1/tasks/discussion-comments/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteDocument: { method: "DELETE", path: "/api/v1/tasks/documents/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteLink: { method: "DELETE", path: "/api/v1/tasks/links/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteMeeting: { method: "DELETE", path: "/api/v1/tasks/hub/meetings/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteMilestone: { method: "DELETE", path: "/api/v1/tasks/milestones/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeletePullRequest: { method: "DELETE", path: "/api/v1/tasks/pull-requests/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteRelation: { method: "DELETE", path: "/api/v1/tasks/relations/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteSectionMember: { method: "DELETE", path: "/api/v1/tasks/section-members/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteStatus: { method: "DELETE", path: "/api/v1/tasks/statuses/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteStatusUpdate: { method: "DELETE", path: "/api/v1/tasks/status-updates/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteTag: { method: "DELETE", path: "/api/v1/tasks/tags/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteView: { method: "DELETE", path: "/api/v1/tasks/views/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksFinishAttachmentUploadSession: { method: "POST", path: "/api/v1/tasks/attachments/upload-sessions/{id}/finish", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetAttachmentContent: { method: "GET", path: "/api/v1/tasks/attachments/{id}/content", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetCustomer: { method: "GET", path: "/api/v1/tasks/customers/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetCustomerNeed: { method: "GET", path: "/api/v1/tasks/customer-needs/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetCycle: { method: "GET", path: "/api/v1/tasks/cycles/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetDocument: { method: "GET", path: "/api/v1/tasks/documents/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetHubOverview: { method: "GET", path: "/api/v1/tasks/hub/overview", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetMeeting: { method: "GET", path: "/api/v1/tasks/hub/meetings/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetMilestone: { method: "GET", path: "/api/v1/tasks/milestones/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetProjectTeamMetrics: { method: "GET", path: "/api/v1/tasks/projects/{id}/team-metrics", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetPullRequest: { method: "GET", path: "/api/v1/tasks/pull-requests/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetSprintMetrics: { method: "GET", path: "/api/v1/tasks/scrum/metrics/{cycle}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetStatusMetrics: { method: "GET", path: "/api/v1/tasks/tasks/{id}/status-metrics", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetStatusUpdate: { method: "GET", path: "/api/v1/tasks/status-updates/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetTask: { method: "GET", path: "/api/v1/tasks/tasks/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListActivity: { method: "GET", path: "/api/v1/tasks/tasks/{id}/activity", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListComments: { method: "GET", path: "/api/v1/tasks/tasks/{id}/comments", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListCustomerNeeds: { method: "GET", path: "/api/v1/tasks/customer-needs", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListCustomers: { method: "GET", path: "/api/v1/tasks/customers", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListCycles: { method: "GET", path: "/api/v1/tasks/cycles", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListDiscussionComments: { method: "GET", path: "/api/v1/tasks/discussion-comments", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListDocuments: { method: "GET", path: "/api/v1/tasks/documents", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListHubSections: { method: "GET", path: "/api/v1/tasks/hub/sections", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListLinks: { method: "GET", path: "/api/v1/tasks/tasks/{id}/links", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListMeetings: { method: "GET", path: "/api/v1/tasks/hub/meetings", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListMilestones: { method: "GET", path: "/api/v1/tasks/milestones", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListProjects: { method: "GET", path: "/api/v1/tasks/projects", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListPullRequests: { method: "GET", path: "/api/v1/tasks/pull-requests", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListRelations: { method: "GET", path: "/api/v1/tasks/tasks/{id}/relations", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListSectionMembers: { method: "GET", path: "/api/v1/tasks/sections/{id}/members", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListSections: { method: "GET", path: "/api/v1/tasks/sections", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListStatusUpdates: { method: "GET", path: "/api/v1/tasks/status-updates", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListStatuses: { method: "GET", path: "/api/v1/tasks/statuses", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListTagCatalog: { method: "GET", path: "/api/v1/tasks/tags", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListTaskAttachments: { method: "GET", path: "/api/v1/tasks/tasks/{id}/attachments", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListTasks: { method: "GET", path: "/api/v1/tasks/tasks", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: null },
  tasksListTemplates: { method: "GET", path: "/api/v1/tasks/templates", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListViews: { method: "GET", path: "/api/v1/tasks/views", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksMoveTask: { method: "POST", path: "/api/v1/tasks/tasks/{id}/move", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksReorderStatuses: { method: "PATCH", path: "/api/v1/tasks/statuses/reorder", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksRunDueTemplates: { method: "POST", path: "/api/v1/tasks/templates/run-due", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksRunTemplate: { method: "POST", path: "/api/v1/tasks/templates/{id}/run", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateCustomer: { method: "PATCH", path: "/api/v1/tasks/customers/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateCustomerNeed: { method: "PATCH", path: "/api/v1/tasks/customer-needs/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateCycle: { method: "PATCH", path: "/api/v1/tasks/cycles/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateDiscussionComment: { method: "PATCH", path: "/api/v1/tasks/discussion-comments/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateDocument: { method: "PATCH", path: "/api/v1/tasks/documents/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateHubSection: { method: "PATCH", path: "/api/v1/tasks/hub/sections/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateMeeting: { method: "PATCH", path: "/api/v1/tasks/hub/meetings/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateMilestone: { method: "PATCH", path: "/api/v1/tasks/milestones/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdatePullRequest: { method: "PATCH", path: "/api/v1/tasks/pull-requests/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateSection: { method: "PATCH", path: "/api/v1/tasks/sections/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateStatus: { method: "PATCH", path: "/api/v1/tasks/statuses/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateStatusUpdate: { method: "PATCH", path: "/api/v1/tasks/status-updates/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateTag: { method: "PATCH", path: "/api/v1/tasks/tags/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateTask: { method: "PATCH", path: "/api/v1/tasks/tasks/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUploadTaskAttachment: { method: "POST", path: "/api/v1/tasks/tasks/{id}/attachments", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
};
