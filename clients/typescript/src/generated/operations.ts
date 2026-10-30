/*
 * Сгенерировано scripts/generate.py. Руками не править.
 * Источник: snapshot/openapi/akeda-v1.json (контракт 0.21.0-core-public, sha256 43b97103ee8b6aa5fa33f3dbe0832f467e53b1148993653812fe6de8cd27a6d1).
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
  /** GET /api/v1/automation/connections — Получить подключения и вебхуки автоматизаций */
  automationConnections: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.AutomationConnectionsResponse;
  };
  /** POST /api/v1/automation/rules — Завести правило автоматизации выключенным */
  automationCreateRule: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.AutomationCreateRuleRequest;
    response: models.AutomationRuleEnvelope;
  };
  /** DELETE /api/v1/automation/rules/{id} — Удалить правило автоматизации */
  automationDeleteRule: {
    params: { "id": string };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/automation/rules/{id} — Получить правило автоматизации */
  automationGetRule: {
    params: { "id": string };
    query: Record<string, never>;
    body: never;
    response: models.AutomationRuleDocument;
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
  /** POST /api/v1/automation/rules/validate — Проверить документ правила автоматизации без записи */
  automationRuleValidate: {
    params: Record<string, never>;
    query: { "locale"?: "ru" | "en" };
    body: models.AutomationRuleValidateRequest;
    response: models.AutomationRuleValidation;
  };
  /** GET /api/v1/automation/rules/{id}/versions — Получить версии правила автоматизации */
  automationRuleVersions: {
    params: { "id": string };
    query: Record<string, never>;
    body: never;
    response: models.AutomationRuleVersionsResponse;
  };
  /** GET /api/v1/automation/rules — Получить правила автоматизаций кабинета */
  automationRules: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.AutomationRulesResponse;
  };
  /** GET /api/v1/automation/runs/{id}/actions — Получить журнал действий прогона автоматизации */
  automationRunActions: {
    params: { "id": string };
    query: { "locale"?: "ru" | "en" };
    body: never;
    response: models.AutomationRunActionsResponse;
  };
  /** GET /api/v1/automation/runs — Получить журнал прогонов автоматизаций */
  automationRuns: {
    params: Record<string, never>;
    query: { "entity"?: string; "entity_id"?: string; "limit"?: number; "locale"?: "ru" | "en"; "rule_id"?: string };
    body: never;
    response: models.AutomationRunsResponse;
  };
  /** POST /api/v1/automation/rules/{id}/enabled — Включить или выключить правило автоматизации */
  automationSetRuleEnabled: {
    params: { "id": string };
    query: { "locale"?: "ru" | "en" };
    body: models.AutomationSetRuleEnabledRequest;
    response: models.AutomationRuleEnvelope;
  };
  /** PUT /api/v1/automation/rules/{id} — Изменить выключенное правило автоматизации */
  automationUpdateRule: {
    params: { "id": string };
    query: { "locale"?: "ru" | "en" };
    body: models.AutomationRuleSaveRequest;
    response: models.AutomationRuleEnvelope;
  };
  /** GET /api/v1/bank/staffing/bonus-report-lines — Получить строки отчёта для базы премии (исторический адрес) */
  bankBonusReportLines: {
    params: Record<string, never>;
    query: { "layout"?: models.UUID; "report": "pnl" | "cashflow" };
    body: never;
    response: models.FinanceBonusReportLineList;
  };
  /** GET /api/v1/bank/staffing/bonus-schemes — Получить правила премирования (исторический адрес) */
  bankBonusSchemes: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.FinanceBonusSchemeList;
  };
  /** POST /api/v1/bank/cash-operations/{id}/cancel — Отменить кассовую операцию (исторический адрес) */
  bankCancelCashOperation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: { [key: string]: unknown };
  };
  /** POST /api/v1/bank/staffing/bonus-schemes — Завести правило премирования (исторический адрес) */
  bankCreateBonusScheme: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceBonusSchemeInput;
    response: models.FinanceBonusScheme;
  };
  /** POST /api/v1/bank/staffing/positions — Завести штатную позицию (исторический адрес) */
  bankCreateStaffPosition: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceStaffPositionInput;
    response: models.FinanceStaffPosition;
  };
  /** POST /api/v1/bank/staffing/orders — Провести приказ расстановки штата (исторический адрес) */
  bankCreateStaffingOrder: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceStaffingOrderCreate;
    response: models.FinanceStaffingOrderResult;
  };
  /** POST /api/v1/bank/staffing/dismissals — Уволить сотрудника приказом по штатной позиции (исторический адрес) */
  bankDismissEmployee: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceStaffingDismissalCreate;
    response: models.FinanceStaffingDismissalResult;
  };
  /** GET /api/v1/bank/cash-operations/{id}/cancel-consequences — Получить последствия отмены кассовой операции (исторический адрес) */
  bankGetCashOperationCancelConsequences: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: { [key: string]: unknown };
  };
  /** POST /api/v1/bank/transactions/{id}/mark-deleted — Пометить банковскую операцию на удаление (исторический адрес) */
  bankMarkTransactionDeleted: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** POST /api/v1/bank/staffing/bonus-schemes/preview — Посчитать пример премии по правилу без сохранения (исторический адрес) */
  bankPreviewBonusScheme: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceBonusSchemePreviewInput;
    response: models.FinanceBonusReportLineResult;
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
  /** POST /api/v1/bank/exchange/items/{id}/onec-resolve — Решить, чья версия документа остаётся в 1С (исторический адрес) */
  bankResolveOneCConflict: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceOneCResolve;
    response: models.FinanceExchangeItem;
  };
  /** POST /api/v1/bank/transactions/{id}/restore — Вернуть удалённую банковскую операцию (исторический адрес) */
  bankRestoreTransaction: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceTransactionRestoreResult;
  };
  /** GET /api/v1/bank/staffing/headcount — Получить численность занятых позиций по ЦФО на дату (исторический адрес) */
  bankStaffHeadcount: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "company"?: string; "on"?: string };
    body: never;
    response: models.FinanceStaffHeadcount;
  };
  /** GET /api/v1/bank/staffing/positions — Получить справочник штатных позиций (исторический адрес) */
  bankStaffPositions: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "company"?: string };
    body: never;
    response: models.FinanceStaffPositionList;
  };
  /** GET /api/v1/bank/staffing/bonus-bases — Получить перечисления конструктора правила премии (исторический адрес) */
  bankStaffingBonusOptions: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.FinanceBonusOptions;
  };
  /** GET /api/v1/bank/staffing/sheet — Получить штатное расписание на дату (исторический адрес) */
  bankStaffingSheet: {
    params: Record<string, never>;
    query: { "accrual_month"?: string; "business"?: models.UUID; "company"?: string; "on"?: string };
    body: never;
    response: models.FinanceStaffingSheet;
  };
  /** PATCH /api/v1/bank/staffing/bonus-schemes/{id} — Изменить правило премирования (исторический адрес) */
  bankUpdateBonusScheme: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceBonusSchemeInput;
    response: models.FinanceBonusScheme;
  };
  /** PATCH /api/v1/bank/staffing/positions/{id} — Изменить штатную позицию (исторический адрес) */
  bankUpdateStaffPosition: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceStaffPositionInput;
    response: models.FinanceStaffPosition;
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
    params: { "id": string };
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
    query: { "owner"?: number };
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
  /** GET /api/v1/calendar/events/{id}/recorder — Получить состояние бота встречи */
  calendarRecorderStatus: {
    params: { "id": models.UUID };
    query: { "occurrence"?: string };
    body: never;
    response: models.CalendarRecorderStatus;
  };
  /** POST /api/v1/calendar/events/{id}/response — Ответить на приглашение */
  calendarRespondToEvent: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CalendarEventResponseInput;
    response: models.CalendarEventEnvelope;
  };
  /** POST /api/v1/calendar/events/{id}/recorder — Подключить бота встречи */
  calendarStartRecorder: {
    params: { "id": models.UUID };
    query: { "occurrence"?: string };
    body: models.CalendarStartRecorderRequest;
    response: models.CalendarRecorderJob;
  };
  /** POST /api/v1/calendar/events/{id}/recorder/stop — Завершить работу бота встречи */
  calendarStopRecorder: {
    params: { "id": models.UUID };
    query: { "occurrence"?: string };
    body: models.CalendarStopRecorderRequest;
    response: models.CalendarRecorderJob | models.CalendarRecorderStatus;
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
  /** POST /api/v1/chat/conversations/{id}/members — Добавить человека в группу */
  chatAddGroupMember: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.ChatAddMember;
    response: models.ChatMemberChangeResult;
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
  /** POST /api/v1/chat/folders — Создать личную папку списка бесед */
  chatCreateFolder: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.ChatSaveFolder;
    response: models.ChatFolder;
  };
  /** POST /api/v1/chat/conversations — Создать групповой чат */
  chatCreateGroup: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.ChatCreateGroup;
    response: models.ChatCreateGroupResult;
  };
  /** DELETE /api/v1/chat/folders/{id} — Удалить личную папку списка бесед */
  chatDeleteFolder: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/chat/conversations/{id}/messages/{messageId} — Удалить своё сообщение у всех */
  chatDeleteMessage: {
    params: { "id": models.UUID; "messageId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatForwardedMessage;
  };
  /** PATCH /api/v1/chat/conversations/{id}/messages/{messageId} — Изменить своё текстовое сообщение */
  chatEditMessage: {
    params: { "id": models.UUID; "messageId": models.UUID };
    query: Record<string, never>;
    body: models.ChatEditMessage;
    response: models.ChatForwardedMessage;
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
  /** POST /api/v1/chat/conversations/{id}/messages/{messageId}/forward — Идемпотентно переслать сообщение в доступный чат */
  chatForwardMessage: {
    params: { "id": models.UUID; "messageId": models.UUID };
    query: Record<string, never>;
    body: models.ChatForwardMessage;
    response: models.ChatForwardMessageResult;
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
  /** GET /api/v1/chat/folders — Получить личные папки списка бесед */
  chatListFolders: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.ChatFolderPage;
  };
  /** GET /api/v1/chat/conversations/{id}/mentions/candidates — Получить точных адресатов упоминания в чате */
  chatListMentionCandidates: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatMentionCandidatePage;
  };
  /** GET /api/v1/chat/conversations/{id}/messages/{messageId}/readers — Узнать, кто прочитал сообщение */
  chatListMessageReaders: {
    params: { "id": models.UUID; "messageId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatMessageReaderPage;
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
  /** GET /api/v1/chat/conversations/{id}/pins — Получить закреплённые сообщения чата */
  chatListPins: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatMessagePinPage;
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
  /** POST /api/v1/chat/conversations/read-all — Прочитать раздел списка бесед целиком */
  chatMarkAllConversationsRead: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.ChatMarkAllRead;
    response: models.ChatMarkAllReadResult;
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
  /** PUT /api/v1/chat/conversations/{id}/messages/{messageId}/pin — Закрепить сообщение в чате */
  chatPinMessage: {
    params: { "id": models.UUID; "messageId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatChangePinResult;
  };
  /** DELETE /api/v1/chat/conversations/{id}/members/{userId} — Исключить человека из группы */
  chatRemoveGroupMember: {
    params: { "id": models.UUID; "userId": number };
    query: Record<string, never>;
    body: never;
    response: models.ChatMemberChangeResult;
  };
  /** DELETE /api/v1/chat/conversations/{id}/messages/{messageId}/reaction — Снять свою реакцию с сообщения */
  chatRemoveReaction: {
    params: { "id": models.UUID; "messageId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatReactionResult;
  };
  /** PATCH /api/v1/chat/conversations/{id} — Переименовать группу */
  chatRenameGroup: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.ChatRenameGroup;
    response: models.ChatRenameGroupResult;
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
  /** PUT /api/v1/chat/conversations/{id}/messages/{messageId}/reaction — Поставить свою реакцию на сообщение */
  chatSetReaction: {
    params: { "id": models.UUID; "messageId": models.UUID };
    query: Record<string, never>;
    body: models.ChatSetReaction;
    response: models.ChatReactionResult;
  };
  /** DELETE /api/v1/chat/conversations/{id}/messages/{messageId}/pin — Снять закрепление сообщения */
  chatUnpinMessage: {
    params: { "id": models.UUID; "messageId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatChangePinResult;
  };
  /** GET /api/v1/chat/conversations/unread — Получить числа непрочитанного для значков */
  chatUnreadSummary: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.ChatUnreadSummary;
  };
  /** PATCH /api/v1/chat/folders/{id} — Переписать личную папку списка бесед */
  chatUpdateFolder: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.ChatSaveFolder;
    response: models.ChatFolder;
  };
  /** DELETE /api/v1/core/upload-sessions/{id} — Отменить сессию загрузки core */
  coreAbortUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/core/accounting-policy/businesses/{id}/accountable-days — Срок авансового отчёта у бизнеса с даты */
  coreAddPolicyAccountableDays: {
    params: { "id": models.UUID };
    query: { "view"?: "owner" };
    body: models.CorePolicyAccountableDaysInput;
    response: models.CoreAccountingPolicy | models.CoreAccountingPolicyOwner;
  };
  /** POST /api/v1/core/accounting-policy/companies/{id}/payroll-official — Официальная часть зарплаты юрлица с даты */
  coreAddPolicyPayrollOfficial: {
    params: { "id": models.UUID };
    query: { "view"?: "owner" };
    body: models.CorePolicyPayrollOfficialInput;
    response: models.CoreAccountingPolicy | models.CoreAccountingPolicyOwner;
  };
  /** POST /api/v1/core/accounting-policy/companies/{id}/tax-mode — Режим налога юрлица с даты */
  coreAddPolicyTaxMode: {
    params: { "id": models.UUID };
    query: { "view"?: "owner" };
    body: models.CorePolicyTaxModeInput;
    response: models.CoreAccountingPolicy | models.CoreAccountingPolicyOwner;
  };
  /** POST /api/v1/core/accounting-policy/companies/{id}/tax-regime — Система налогообложения юрлица с даты */
  coreAddPolicyTaxRegime: {
    params: { "id": models.UUID };
    query: { "view"?: "owner" };
    body: models.CorePolicyTaxRegimeInput;
    response: models.CoreAccountingPolicy | models.CoreAccountingPolicyOwner;
  };
  /** POST /api/v1/core/accounting-policy/businesses/{id}/vat-pending — Порог ожидания вычета у бизнеса с даты */
  coreAddPolicyVATPending: {
    params: { "id": models.UUID };
    query: { "view"?: "owner" };
    body: models.CorePolicyVATPendingInput;
    response: models.CoreAccountingPolicy | models.CoreAccountingPolicyOwner;
  };
  /** POST /api/v1/core/accounting-policy/businesses/{id}/vat-presentation — Очистка сумм бизнеса от НДС с даты */
  coreAddPolicyVATPresentation: {
    params: { "id": models.UUID };
    query: { "view"?: "owner" };
    body: models.CorePolicyVATPresentationInput;
    response: models.CoreAccountingPolicy | models.CoreAccountingPolicyOwner;
  };
  /** POST /api/v1/core/accounting-policy/companies/{id}/vat-rates — Ставки НДС юрлица с даты */
  coreAddPolicyVATRates: {
    params: { "id": models.UUID };
    query: { "view"?: "owner" };
    body: models.CorePolicyVATRatesInput;
    response: models.CoreAccountingPolicy | models.CoreAccountingPolicyOwner;
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
  /** DELETE /api/v1/core/employees/{id} — Удалить или архивировать карточку сотрудника */
  coreArchiveEmployee: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreEmployeeDeleteResult;
  };
  /** POST /api/v1/core/products/{id}/archive — Архивировать позицию без удаления истории */
  coreArchiveProduct: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreProduct;
  };
  /** POST /api/v1/core/purchases/executed-services — Подставить услугу в строки исполненных закупок */
  coreBulkExecutedPurchaseServices: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreOrderServiceBulkInput;
    response: models.CoreOrderServiceBulkResult;
  };
  /** POST /api/v1/core/sales/executed-services — Подставить услугу в строки исполненных продаж */
  coreBulkExecutedSaleServices: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreOrderServiceBulkInput;
    response: models.CoreOrderServiceBulkResult;
  };
  /** POST /api/v1/core/contacts/bulk — Группой изменить папку и роли контрагентов */
  coreBulkUpdateContacts: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreContactBulkPatch;
    response: models.CoreBulkResult;
  };
  /** POST /api/v1/core/products/bulk — Группой изменить папку и профили использования номенклатуры */
  coreBulkUpdateProducts: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreProductBulkPatch;
    response: models.CoreBulkResult;
  };
  /** POST /api/v1/core/documents/{id}/cancel — Отменить проведение без удаления документа */
  coreCancelDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** POST /api/v1/core/price-sets/{id}/cancel — Отменить документ цен */
  coreCancelPriceSet: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CorePriceSet;
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
  /** POST /api/v1/core/accounting-periods/close — Закрыть учёт по дату включительно */
  coreCloseAccountingPeriod: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreAccountingPeriodClose;
    response: models.CoreAccountingPeriodEvent;
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
  /** POST /api/v1/core/price-types/for-channel — Создать свой вид цены канала */
  coreCreateChannelPriceType: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreChannelPriceTypeInput;
    response: models.CoreChannelPriceTypeResult;
  };
  /** POST /api/v1/core/contacts — Создать контрагента */
  coreCreateContact: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreContactCreate;
    response: models.CoreContact;
  };
  /** POST /api/v1/core/contacts/{id}/bank-accounts — Добавить расчётный счёт контрагенту */
  coreCreateContactBankAccount: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreContactBankAccountCreate;
    response: models.CoreContactBankAccount;
  };
  /** POST /api/v1/core/contacts/batch — Завести пачку контрагентов */
  coreCreateContactsBatch: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreContactBatchInput;
    response: models.CoreContactBatchResult;
  };
  /** POST /api/v1/core/currency-rates — Установить курс с указанной даты */
  coreCreateCurrencyRate: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreCurrencyRateInput;
    response: models.CoreCurrencyRate;
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
  /** POST /api/v1/core/employee-equipment — Зафиксировать выдачу имущества сотруднику */
  coreCreateEmployeeEquipment: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreEmployeeEquipmentInput;
    response: models.CoreEmployeeEquipment;
  };
  /** POST /api/v1/core/employee-lifecycle-templates — Создать шаблон приёма или увольнения */
  coreCreateEmployeeLifecycleTemplate: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreEmployeeLifecycleTemplateInput;
    response: models.CoreEmployeeLifecycleTemplate;
  };
  /** POST /api/v1/core/employees/batch — Завести пачку карточек сотрудников */
  coreCreateEmployeesBatch: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreEmployeeBatchInput;
    response: models.CoreEmployeeBatchResult;
  };
  /** POST /api/v1/core/folders — Создать папку справочника */
  coreCreateFolder: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreFolderInput;
    response: models.CoreFolder;
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
  /** POST /api/v1/core/marking-groups — Создать свою группу маркировки */
  coreCreateMarkingGroup: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreMarkingGroupCreate;
    response: models.CoreMarkingGroup;
  };
  /** POST /api/v1/core/org-structure/departments — Завести подразделение */
  coreCreateOrgDepartment: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreOrgDepartmentInput;
    response: models.CoreOrgDepartmentSaveResult;
  };
  /** POST /api/v1/core/price-sets — Создать установку цен */
  coreCreatePriceSet: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CorePriceSetInput;
    response: models.CorePriceSet;
  };
  /** POST /api/v1/core/price-types — Создать вид цены */
  coreCreatePriceType: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CorePriceTypeInput;
    response: models.CorePriceType;
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
  /** POST /api/v1/core/sales-channels — Создать канал продаж */
  coreCreateSalesChannel: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreSalesChannelCreate;
    response: models.CoreSalesChannel;
  };
  /** POST /api/v1/core/supplier-price-sets — Записать цены поставщика */
  coreCreateSupplierPriceSet: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreSupplierPriceSetInput;
    response: models.CoreSupplierPriceSet;
  };
  /** POST /api/v1/core/trade/funnels — Завести воронку продаж или закупок */
  coreCreateTradeFunnel: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreOrderFunnelInput;
    response: models.CoreOrderFunnel;
  };
  /** POST /api/v1/core/trade/statuses — Завести свой статус продажи или закупки */
  coreCreateTradeStatus: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreOrderStatusInput;
    response: models.CoreOrderStatus;
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
  /** DELETE /api/v1/core/dictionaries/{id} — Удалить пользовательский справочник */
  coreDeleteDictionary: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/core/dictionaries/{id}/items/{itemId} — Удалить неиспользуемую запись справочника */
  coreDeleteDictionaryItem: {
    params: { "id": models.UUID; "itemId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/core/document-types/{id} — Удалить неиспользуемый пользовательский тип */
  coreDeleteDocumentType: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/core/folders/{id} — Удалить папку и вернуть её содержимое в корень */
  coreDeleteFolder: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/core/gl-accounts/{id} — Удалить пустой клиентский счёт */
  coreDeleteGLAccount: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/core/gl-mappings/{id} — Закрыть правило проводки на выбранную дату */
  coreDeleteGLMapping: {
    params: { "id": models.UUID };
    query: { "on"?: string };
    body: never;
    response: void;
  };
  /** DELETE /api/v1/core/items/{id} — Удалить неиспользуемую статью */
  coreDeleteItem: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/core/marking-groups/{id} — Удалить свою группу маркировки */
  coreDeleteMarkingGroup: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/core/org-structure/departments/{id} — Удалить пустое подразделение */
  coreDeleteOrgDepartment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/core/products/{id}/files/{fileId} — Удалить файл товара */
  coreDeleteProductFile: {
    params: { "fileId": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/core/products/{id}/identifiers/{identifierId} — Удалить внешний идентификатор */
  coreDeleteProductIdentifier: {
    params: { "id": models.UUID; "identifierId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreProductIdentifierRemoval;
  };
  /** DELETE /api/v1/core/registers/{key} — Удалить пустой пользовательский регистр */
  coreDeleteRegister: {
    params: { "key": string };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/core/sales-channels/{id} — Удалить канал продаж */
  coreDeleteSalesChannel: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** PUT /api/v1/core/accounting-policy/businesses/{id}/accountable-days/open — Поправить открытую версию — срок авансового отчёта у бизнеса с даты */
  coreEditPolicyAccountableDays: {
    params: { "id": models.UUID };
    query: { "view"?: "owner" };
    body: models.CorePolicyAccountableDaysInput;
    response: models.CoreAccountingPolicy | models.CoreAccountingPolicyOwner;
  };
  /** PUT /api/v1/core/accounting-policy/companies/{id}/payroll-official/open — Поправить открытую версию — официальная часть зарплаты юрлица */
  coreEditPolicyPayrollOfficial: {
    params: { "id": models.UUID };
    query: { "view"?: "owner" };
    body: models.CorePolicyPayrollOfficialInput;
    response: models.CoreAccountingPolicy | models.CoreAccountingPolicyOwner;
  };
  /** PUT /api/v1/core/accounting-policy/companies/{id}/tax-mode/open — Поправить открытую версию — режим налога юрлица с даты */
  coreEditPolicyTaxMode: {
    params: { "id": models.UUID };
    query: { "view"?: "owner" };
    body: models.CorePolicyTaxModeInput;
    response: models.CoreAccountingPolicy | models.CoreAccountingPolicyOwner;
  };
  /** PUT /api/v1/core/accounting-policy/companies/{id}/tax-regime/open — Поправить открытую версию — система налогообложения юрлица */
  coreEditPolicyTaxRegime: {
    params: { "id": models.UUID };
    query: { "view"?: "owner" };
    body: models.CorePolicyTaxRegimeInput;
    response: models.CoreAccountingPolicy | models.CoreAccountingPolicyOwner;
  };
  /** PUT /api/v1/core/accounting-policy/businesses/{id}/vat-pending/open — Поправить открытую версию — порог ожидания вычета у бизнеса с даты */
  coreEditPolicyVATPending: {
    params: { "id": models.UUID };
    query: { "view"?: "owner" };
    body: models.CorePolicyVATPendingInput;
    response: models.CoreAccountingPolicy | models.CoreAccountingPolicyOwner;
  };
  /** PUT /api/v1/core/accounting-policy/businesses/{id}/vat-presentation/open — Поправить открытую версию — очистка сумм бизнеса от НДС с даты */
  coreEditPolicyVATPresentation: {
    params: { "id": models.UUID };
    query: { "view"?: "owner" };
    body: models.CorePolicyVATPresentationInput;
    response: models.CoreAccountingPolicy | models.CoreAccountingPolicyOwner;
  };
  /** PUT /api/v1/core/accounting-policy/companies/{id}/vat-rates/open — Поправить открытую версию — ставки НДС юрлица с даты */
  coreEditPolicyVATRates: {
    params: { "id": models.UUID };
    query: { "view"?: "owner" };
    body: models.CorePolicyVATRatesInput;
    response: models.CoreAccountingPolicy | models.CoreAccountingPolicyOwner;
  };
  /** POST /api/v1/core/purchases/execute-now — Закупить сразу — закупка и акт поставщика одной командой */
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
  /** POST /api/v1/core/product-identifiers/generate — Сгенерировать внутренний штрихкод */
  coreGenerateProductBarcode: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreGeneratedBarcode;
  };
  /** POST /api/v1/core/products/{id}/variants/generate — Создать варианты семейства по сочетаниям осей */
  coreGenerateProductVariants: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreProductVariantGenerate;
    response: models.CoreProductVariantGenerateResult;
  };
  /** GET /api/v1/core/accounting-periods — Получить закрытую дату и последние 50 решений */
  coreGetAccountingPeriodState: {
    params: Record<string, never>;
    query: { "business"?: models.UUID };
    body: never;
    response: models.CoreAccountingPeriodState;
  };
  /** GET /api/v1/core/accounting-policy — Получить учётную политику бизнесов и юрлиц */
  coreGetAccountingPolicy: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreAccountingPolicy;
  };
  /** GET /api/v1/core/accounting-settings — Получить валюту учёта и состояние замка */
  coreGetAccountingSettings: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreAccountingSettings;
  };
  /** GET /api/v1/core/accounting-start — Узнать день первой проводки и день для начальных остатков */
  coreGetAccountingStart: {
    params: Record<string, never>;
    query: { "business"?: string };
    body: never;
    response: models.CoreGetAccountingStartResponse;
  };
  /** GET /api/v1/core/businesses/{id} — Получить управленческий бизнес */
  coreGetBusiness: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreBusiness;
  };
  /** GET /api/v1/core/businesses/{id}/ledger-start/run — Узнать ход и итог разноски книги бизнеса */
  coreGetBusinessLedgerRun: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreBusinessLedgerRun;
  };
  /** GET /api/v1/core/cabinet-preferences — Получить общие язык, часовой пояс и форматы кабинета */
  coreGetCabinetPreferences: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreCabinetPreferences;
  };
  /** GET /api/v1/core/contacts/{id} — Получить карточку контрагента */
  coreGetContact: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreContact;
  };
  /** GET /api/v1/core/contacts/{id}/usage — Проверить, где используется контрагент */
  coreGetContactUsage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreObjectUsage;
  };
  /** GET /api/v1/core/contracts/{id} — Получить учётный реквизит договора */
  coreGetContractTerms: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreContractTerms;
  };
  /** GET /api/v1/core/dictionaries/{id} — Получить один справочник */
  coreGetDictionary: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDictionary;
  };
  /** GET /api/v1/core/dictionaries/{id}/items/{itemId}/usage — Проверить, где используется запись справочника */
  coreGetDictionaryItemUsage: {
    params: { "id": models.UUID; "itemId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreObjectUsage;
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
  /** GET /api/v1/core/documents/{id}/history — Получить историю документа */
  coreGetDocumentHistory: {
    params: { "id": models.UUID };
    query: { "limit"?: number };
    body: never;
    response: models.CoreActionJournalPage;
  };
  /** GET /api/v1/core/documents/{id}/links — Получить структуру оснований, зависимых документов и движений */
  coreGetDocumentLinks: {
    params: { "id": models.UUID };
    query: { "depth"?: number };
    body: never;
    response: models.CoreDocumentLinks;
  };
  /** GET /api/v1/core/document-types/{id} — Получить тип документа конструктора */
  coreGetDocumentType: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocumentType;
  };
  /** GET /api/v1/core/employees/{id} — Получить карточку сотрудника */
  coreGetEmployee: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreEmployee;
  };
  /** GET /api/v1/core/employees/{id}/requisites — Получить реквизиты сотрудника */
  coreGetEmployeeRequisites: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreEmployeeRequisites;
  };
  /** GET /api/v1/core/employees/{id}/usage — Проверить, где используется сотрудник */
  coreGetEmployeeUsage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreObjectUsage;
  };
  /** GET /api/v1/core/external-refs/{id} — Получить одно внешнее соответствие */
  coreGetExternalRef: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreExternalRef;
  };
  /** GET /api/v1/core/gl-opening-imports/{id} — Получить сохранённый снимок разбора ОСВ */
  coreGetGLOpeningImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreGLOpeningImport;
  };
  /** GET /api/v1/core/org-structure — Получить оргструктуру */
  coreGetOrgStructure: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreOrgStructure;
  };
  /** GET /api/v1/core/price-list — Получить прайс-лист */
  coreGetPriceList: {
    params: Record<string, never>;
    query: { "category_ids"?: string; "date"?: string; "limit"?: number; "missing_type_id"?: models.UUID; "offset"?: number; "only_priced"?: boolean; "price_type_ids"?: string; "priced_type_id"?: models.UUID; "search"?: string };
    body: never;
    response: models.CorePriceList;
  };
  /** GET /api/v1/core/price-sets/{id} — Получить установку цен */
  coreGetPriceSet: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CorePriceSet;
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
  /** GET /api/v1/core/products/{id}/usage — Проверить, где используется номенклатура */
  coreGetProductUsage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreObjectUsage;
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
    response: models.CoreOrderBlockers;
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
    response: models.CoreOrderBlockers;
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
  /** GET /api/v1/core/sales-channels/{id} — Получить канал продаж */
  coreGetSalesChannel: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreSalesChannel;
  };
  /** GET /api/v1/core/supplier-price-sets/{id} — Получить цены поставщика */
  coreGetSupplierPriceSet: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreSupplierPriceSet;
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
  /** POST /api/v1/core/org-structure/import — Загрузить оргструктуру пакетом */
  coreImportOrgStructure: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreOrgImportRequest;
    response: models.CoreOrgImportReport;
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
  /** POST /api/v1/core/external-refs/{id}/link — Вручную связать внешний объект с карточкой Akeda */
  coreLinkExternalRef: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreExternalRefLinkRequest;
    response: models.CoreExternalRef;
  };
  /** GET /api/v1/core/accounting-dimensions — Получить включённые аналитические разрезы и готовность истории */
  coreListAccountingDimensions: {
    params: Record<string, never>;
    query: { "on"?: string };
    body: never;
    response: models.CoreAccountingDimensionPage;
  };
  /** GET /api/v1/core/action-journal — Получить журнал действий кабинета */
  coreListActionJournal: {
    params: Record<string, never>;
    query: { "action"?: string; "actor"?: string; "from"?: string; "limit"?: number; "module"?: string; "object_id"?: models.UUID; "object_type"?: string; "offset"?: number; "q"?: string; "to"?: string };
    body: never;
    response: models.CoreActionJournalPage;
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
  /** GET /api/v1/core/prices/channels — Получить цены товара по каналам */
  coreListChannelProductPrices: {
    params: Record<string, never>;
    query: { "date"?: string; "product_id": models.UUID };
    body: never;
    response: models.CoreChannelProductPricePage;
  };
  /** GET /api/v1/core/contacts/{id}/bank-accounts — Получить расчётные счета контрагента */
  coreListContactBankAccounts: {
    params: { "id": models.UUID };
    query: { "include_inactive"?: boolean };
    body: never;
    response: Array<models.CoreContactBankAccount>;
  };
  /** GET /api/v1/core/contacts — Получить контрагентов */
  coreListContacts: {
    params: Record<string, never>;
    query: { "folder"?: string; "include_archived"?: boolean; "include_employees"?: boolean; "limit"?: number; "offset"?: number; "q"?: string };
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
  /** GET /api/v1/core/document-numbering — Получить нумерацию документов кабинета */
  coreListDocumentNumbering: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreDocumentNumberingList;
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
  /** GET /api/v1/core/employee-equipment — Получить историю выданного сотрудникам имущества */
  coreListEmployeeEquipment: {
    params: Record<string, never>;
    query: { "employee_id"?: models.UUID };
    body: never;
    response: models.CoreEmployeeEquipmentPage;
  };
  /** GET /api/v1/core/employee-lifecycle-templates — Получить шаблоны приёма и увольнения */
  coreListEmployeeLifecycleTemplates: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreEmployeeLifecycleTemplatePage;
  };
  /** GET /api/v1/core/employees — Получить сотрудников кабинета */
  coreListEmployees: {
    params: Record<string, never>;
    query: { "affiliation"?: "own" | "external" | "guest"; "limit"?: number; "offset"?: number; "q"?: string };
    body: never;
    response: models.CoreEmployeePage;
  };
  /** GET /api/v1/core/external-refs — Получить очередь внешних соответствий */
  coreListExternalRefs: {
    params: Record<string, never>;
    query: { "entity_id"?: models.UUID; "entity_type"?: models.CoreExternalRefEntityType; "external_kind"?: string; "limit"?: number; "offset"?: number; "pending"?: boolean; "q"?: string; "source_ref"?: string; "source_system"?: string };
    body: never;
    response: models.CoreExternalRefPage;
  };
  /** GET /api/v1/core/folders — Получить папки раздела справочников */
  coreListFolders: {
    params: Record<string, never>;
    query: { "scope"?: models.CoreFolderScope };
    body: never;
    response: models.CoreFolderPage;
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
    query: { "include_closed"?: boolean; "limit"?: number; "offset"?: number; "subject_type"?: string };
    body: never;
    response: models.CoreGLMappingPage;
  };
  /** GET /api/v1/core/gl-opening-imports — Получить историю загрузок ОСВ кабинета */
  coreListGLOpeningImports: {
    params: Record<string, never>;
    query: { "limit"?: number };
    body: never;
    response: models.CoreGLOpeningImportPage;
  };
  /** GET /api/v1/core/items — Получить единый справочник статей */
  coreListItems: {
    params: Record<string, never>;
    query: { "apply"?: "cashflow" | "pnl" };
    body: never;
    response: models.CoreItemPage;
  };
  /** GET /api/v1/core/marking-groups — Получить группы маркировки */
  coreListMarkingGroups: {
    params: Record<string, never>;
    query: { "include_inactive"?: boolean };
    body: never;
    response: models.CoreMarkingGroupPage;
  };
  /** GET /api/v1/core/contracts — Получить договоры, на которые можно поставить продажу или закупку */
  coreListOrderContracts: {
    params: Record<string, never>;
    query: { "company_id"?: models.UUID; "contact_id": models.UUID; "date"?: string; "include"?: models.UUID; "side": "sale" | "purchase" };
    body: never;
    response: models.CoreContractList;
  };
  /** GET /api/v1/core/org-structure/placements — Постановки в оргструктуру на дату */
  coreListOrgPlacements: {
    params: Record<string, never>;
    query: { "department_id"?: models.UUID; "employee_id"?: models.UUID; "on"?: string };
    body: never;
    response: models.CoreOrgPlacementList;
  };
  /** GET /api/v1/core/pnl-items — Получить статьи, применимые в ОПиУ */
  coreListPnlItems: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreItemPage;
  };
  /** GET /api/v1/core/price-assignments — Получить назначения видов цен */
  coreListPriceAssignments: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CorePriceAssignmentPage;
  };
  /** GET /api/v1/core/prices/history — Получить историю цен товара */
  coreListPriceHistory: {
    params: Record<string, never>;
    query: { "product_id": models.UUID };
    body: never;
    response: models.CorePriceHistoryPage;
  };
  /** GET /api/v1/core/prices/sales — Получить прошлые продажи товара */
  coreListPriceSales: {
    params: Record<string, never>;
    query: { "channel_id"?: models.UUID; "contact_id"?: models.UUID; "limit"?: number; "product_id": models.UUID };
    body: never;
    response: models.CorePriceSalePage;
  };
  /** GET /api/v1/core/price-sets — Получить журнал установок цен */
  coreListPriceSets: {
    params: Record<string, never>;
    query: { "date_from"?: string; "date_to"?: string; "limit"?: number; "offset"?: number; "status"?: "draft" | "posted" | "cancelled" };
    body: never;
    response: models.CorePriceSetPage;
  };
  /** GET /api/v1/core/price-types — Получить виды цен */
  coreListPriceTypes: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CorePriceTypePage;
  };
  /** GET /api/v1/core/prices/at — Получить цены на дату */
  coreListPricesAt: {
    params: Record<string, never>;
    query: { "date"?: string; "price_type_ids"?: string; "product_ids"?: string };
    body: never;
    response: models.CorePriceAtPage;
  };
  /** GET /api/v1/core/product-categories/marking-groups — Получить группы маркировки категорий */
  coreListProductCategoryMarking: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreProductCategoryMarkingPage;
  };
  /** GET /api/v1/core/products/{id}/files — Получить файлы и фото товара */
  coreListProductFiles: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreProductFilePage;
  };
  /** GET /api/v1/core/product-identifiers/gtin-review — Товары без GTIN */
  coreListProductGTINReview: {
    params: Record<string, never>;
    query: { "reason"?: "choose" | "from_barcode" | "none" };
    body: never;
    response: models.CoreProductGTINReviewPage;
  };
  /** GET /api/v1/core/products/{id}/identifier-history — Получить историю внешних идентификаторов */
  coreListProductIdentifierHistory: {
    params: { "id": models.UUID };
    query: { "limit"?: number };
    body: never;
    response: models.CoreProductIdentifierHistoryPage;
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
    query: { "custom"?: string; "folder"?: string; "is_stockable"?: boolean; "kind"?: "goods" | "service" | "material" | "semi_product" | "goods,material,semi_product"; "limit"?: number; "marking"?: "marked" | "unmarked"; "marking_group_id"?: models.UUID; "offset"?: number; "operational_only"?: boolean; "parent_product_id"?: models.UUID; "profile"?: "sell" | "stock" | "purchase" | "produce"; "q"?: string; "record_kind"?: "standalone" | "family" | "variant" | "standalone,family" | "standalone,variant" | "family,variant" | "standalone,family,variant"; "sort"?: "name" | "-name" | "sku" | "-sku" | "price" | "-price" | "updated" | "-updated"; "status"?: "active" | "archived" | "all" };
    body: never;
    response: models.CoreProductPage;
  };
  /** GET /api/v1/core/purchases — Получить журнал закупок */
  coreListPurchases: {
    params: Record<string, never>;
    query: { "amount_from"?: string; "amount_to"?: string; "business_id"?: models.UUID; "company_id"?: models.UUID; "contact_id"?: models.UUID; "contract_id"?: models.UUID; "cost_for_order_id"?: models.UUID; "date_from"?: string; "date_to"?: string; "external_id"?: string; "limit"?: number; "offset"?: number; "papers"?: string; "project_id"?: models.UUID; "responsible_id"?: models.UUID; "search"?: string; "side"?: models.CoreOrderSide; "source"?: models.CoreOrderSourceKind; "status"?: string; "with"?: string };
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
    query: { "amount_from"?: string; "amount_to"?: string; "business_id"?: models.UUID; "company_id"?: models.UUID; "contact_id"?: models.UUID; "contract_id"?: models.UUID; "date_from"?: string; "date_to"?: string; "external_id"?: string; "limit"?: number; "offset"?: number; "papers"?: string; "project_id"?: models.UUID; "responsible_id"?: models.UUID; "search"?: string; "side"?: models.CoreOrderSide; "source"?: models.CoreOrderSourceKind; "status"?: string; "with"?: string };
    body: never;
    response: models.CoreOrderPage;
  };
  /** GET /api/v1/core/sales-channels — Получить каналы продаж */
  coreListSalesChannels: {
    params: Record<string, never>;
    query: { "contact_id"?: string; "include_inactive"?: boolean };
    body: never;
    response: models.CoreSalesChannelPage;
  };
  /** GET /api/v1/core/seller-companies — Получить доступные юрлица продавца */
  coreListSellerCompanies: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreSellerCompanyList;
  };
  /** GET /api/v1/core/supplier-prices — Получить цены поставщиков */
  coreListSupplierPrices: {
    params: Record<string, never>;
    query: { "date"?: string; "limit"?: number; "offset"?: number; "product_id"?: models.UUID; "search"?: string; "supplier_id"?: models.UUID };
    body: never;
    response: models.CoreSupplierPricePage;
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
  /** GET /api/v1/core/product-identifiers/lookup — Чей это штрихкод или артикул */
  coreLookupProductIdentifier: {
    params: Record<string, never>;
    query: { "kind": models.CoreProductIdentifierKind; "source_ref"?: string; "value": string };
    body: never;
    response: models.CoreProductIdentifierMatch;
  };
  /** POST /api/v1/core/documents/{id}/mark-deleted — Поставить или снять пометку удаления */
  coreMarkDocumentDeleted: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreDocumentMarkDeleted;
    response: models.CoreDocument;
  };
  /** POST /api/v1/core/gl-opening-imports/{id}/applied — Связать загрузку с проведённым документом начальных остатков */
  coreMarkGLOpeningImportApplied: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreGLOpeningImportAppliedRequest;
    response: models.CoreGLOpeningImport;
  };
  /** POST /api/v1/core/external-refs/contacts/match — Сопоставить контрагентов выгрузки по ИНН и КПП */
  coreMatchExternalContacts: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreExternalContactMatchRequest;
    response: models.CoreExternalContactMatchReport;
  };
  /** POST /api/v1/core/contacts/{id}/merge — Объединить контрагентов */
  coreMergeContacts: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreContactMergeInput;
    response: models.CoreContactMergeResult;
  };
  /** POST /api/v1/core/items/{id}/move — Переместить статью внутри дерева одного отчёта */
  coreMoveItem: {
    params: { "id": models.UUID };
    query: { "view"?: "item" };
    body: models.CoreItemMove;
    response: models.CoreItemPage | models.CoreItemMoved;
  };
  /** POST /api/v1/core/org-structure/placements — Поставить сотрудника в подразделение */
  corePlaceOrgEmployee: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreOrgPlacementInput;
    response: models.CoreOrgPlacementResult;
  };
  /** POST /api/v1/core/documents/{id}/post — Провести или перепровести документ */
  corePostDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** POST /api/v1/core/org-placements — Поставить, перевести или снять сотрудника в подразделении */
  corePostOrgPlacement: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreOrgPlacementDocInput;
    response: models.CoreOrgPlacementDocResult;
  };
  /** POST /api/v1/core/price-sets/{id}/post — Провести документ цен */
  corePostPriceSet: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CorePriceSet;
  };
  /** POST /api/v1/core/contacts/{id}/merge/preview — Предпросмотр объединения контрагентов */
  corePreviewContactMerge: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreContactMergeInput;
    response: models.CoreContactMergeResult;
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
  /** POST /api/v1/core/products/{id}/identifiers/{identifierId}/reactivate — Вернуть снятый внешний идентификатор */
  coreReactivateProductIdentifier: {
    params: { "id": models.UUID; "identifierId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreProductIdentifier;
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
  /** POST /api/v1/core/trade/execution-openings/release — Снять вводы исполнения с отменённым исполнением */
  coreReleaseExecutionOpenings: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreExecutionOpeningReleaseInput;
    response: models.CoreExecutionOpeningReleaseReport;
  };
  /** POST /api/v1/core/external-refs — Запомнить один внешний объект или пачку */
  coreRememberExternalRefs: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreExternalRefRememberRequest;
    response: models.CoreExternalRefPage;
  };
  /** POST /api/v1/core/accounting-periods/reopen — Сдвинуть закрытую дату назад с обязательной причиной */
  coreReopenAccountingPeriod: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreAccountingPeriodReopen;
    response: models.CoreAccountingPeriodEvent;
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
  /** POST /api/v1/core/products/{id}/files/reorder — Переставить файлы товара */
  coreReorderProductFiles: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreProductFileReorder;
    response: void;
  };
  /** POST /api/v1/core/external-refs/resolve — Разрешить внешние идентификаторы в UUID Akeda */
  coreResolveExternalRefs: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreExternalRefResolveRequest;
    response: models.CoreExternalRefResolveResult;
  };
  /** POST /api/v1/core/prices/resolve — Подобрать цены строк */
  coreResolvePrices: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CorePriceQuery;
    response: models.CorePriceResolution;
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
  /** POST /api/v1/core/price-sets/revaluation — Переоценить по правилам */
  coreRevaluePrices: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreRevaluationInput;
    response: models.CorePriceSet;
  };
  /** POST /api/v1/core/purchases/{id}/executed-revision — Изменить разрезы и услугу исполненной закупки */
  coreReviseExecutedPurchase: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderExecutedRevisionInput;
    response: models.CoreOrder;
  };
  /** POST /api/v1/core/sales/{id}/executed-revision — Изменить разрезы и услугу исполненной продажи */
  coreReviseExecutedSale: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderExecutedRevisionInput;
    response: models.CoreOrder;
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
  /** PUT /api/v1/core/accounting-policy/businesses/{id}/revenue-items — Статьи выручки исполнений продажи или закупки по виду строки у бизнеса с даты */
  coreSaveOrderRevenueItems: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderRevenueItemsInput;
    response: models.CoreAccountingPolicy;
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
  /** POST /api/v1/core/businesses/{id}/ledger-start — Начать книгу бизнеса с даты или перенести дату начала */
  coreSetBusinessLedgerStart: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreBusinessLedgerStartInput;
    response: models.CoreBusinessLedgerStartResult;
  };
  /** POST /api/v1/core/prices/channels — Изменить цену товара в канале */
  coreSetChannelProductPrice: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreChannelProductPriceInput;
    response: models.CorePriceSet;
  };
  /** PUT /api/v1/core/contacts/{id}/employee — Привязать контрагента к сотруднику */
  coreSetContactEmployee: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreContactEmployeeInput;
    response: models.CoreContact;
  };
  /** PUT /api/v1/core/contracts/{id}/settlement-detail — Изменить детализацию расчётов договора */
  coreSetContractSettlementDetail: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreContractSettlementDetailInput;
    response: models.CoreContractTerms;
  };
  /** PUT /api/v1/core/documents/{id}/custom — Заменить значения своих полей черновика */
  coreSetDocumentCustom: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreDocumentCustom;
    response: models.CoreDocument;
  };
  /** PUT /api/v1/core/price-assignments — Назначить вид цены */
  coreSetPriceAssignment: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CorePriceAssignmentInput;
    response: void;
  };
  /** POST /api/v1/core/products/{id}/identifiers/{identifierId}/primary — Сделать идентификатор основным */
  coreSetPrimaryProductIdentifier: {
    params: { "id": models.UUID; "identifierId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreProductIdentifier;
  };
  /** PUT /api/v1/core/product-categories/{id}/marking-group — Задать группу маркировки категории */
  coreSetProductCategoryMarking: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreProductCategoryMarkingSet;
    response: models.CoreProductCategoryMarking;
  };
  /** PUT /api/v1/core/purchases/{id}/cabinet-status — Поставить статус кабинета */
  coreSetPurchaseCabinetStatus: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderCabinetStatusInput;
    response: models.CoreOrder;
  };
  /** PUT /api/v1/core/purchases/{id}/contract — Поставить закупку на договор, сменить или снять договор */
  coreSetPurchaseContract: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderContractInput;
    response: models.CoreOrder;
  };
  /** PUT /api/v1/core/purchases/{id}/cost-for — Отнести закупку доп. расходом на закупку товара */
  coreSetPurchaseCostFor: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderCostForInput;
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
  /** PUT /api/v1/core/sales/{id}/contract — Поставить продажу на договор, сменить или снять договор */
  coreSetSaleContract: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderContractInput;
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
  /** GET /api/v1/core/lookup/parties — Найти организации по части ИНН, ОГРН или названия */
  coreSuggestRequisitesParties: {
    params: Record<string, never>;
    query: { "q": string };
    body: never;
    response: models.FinanceRequisitesSuggestions;
  };
  /** POST /api/v1/core/supplier-price-sets/{id}/cancel — Отменить цены поставщика */
  coreSupplierCancelPriceSet: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CorePriceSet;
  };
  /** POST /api/v1/core/supplier-price-sets/{id}/post — Провести цены поставщика */
  coreSupplierPostPriceSet: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CorePriceSet;
  };
  /** POST /api/v1/core/products/{id}/variant-articles/sync — Проставить вариантам артикулы продавца по артикулу семейства */
  coreSyncProductVariantArticles: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreProductVariantArticleSyncResult;
  };
  /** POST /api/v1/core/external-refs/{id}/unlink — Отклонить связь и вернуть объект в ручной разбор */
  coreUnlinkExternalRef: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreExternalRef;
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
    body: models.CoreBusinessPatch;
    response: models.CoreBusiness;
  };
  /** PATCH /api/v1/core/cabinet-preferences — Изменить общие язык, часовой пояс и форматы кабинета */
  coreUpdateCabinetPreferences: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreCabinetPreferences;
    response: models.CoreCabinetPreferences;
  };
  /** PATCH /api/v1/core/contacts/{id} — Частично изменить контрагента */
  coreUpdateContact: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreContactPatch;
    response: models.CoreContact;
  };
  /** PATCH /api/v1/core/contacts/{id}/bank-accounts/{accountId} — Изменить расчётный счёт контрагента */
  coreUpdateContactBankAccount: {
    params: { "accountId": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreContactBankAccountPatch;
    response: models.CoreContactBankAccount;
  };
  /** PATCH /api/v1/core/dictionaries/{id} — Изменить название, описание и режим дерева */
  coreUpdateDictionary: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreDictionaryUpdate;
    response: models.CoreDictionary;
  };
  /** PATCH /api/v1/core/dictionaries/{id}/items/{itemId} — Изменить запись справочника */
  coreUpdateDictionaryItem: {
    params: { "id": models.UUID; "itemId": models.UUID };
    query: Record<string, never>;
    body: models.CoreDictionaryItemUpdate;
    response: models.CoreDictionaryItem;
  };
  /** PATCH /api/v1/core/documents/{id} — Частично изменить черновик документа */
  coreUpdateDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreDocumentPatch;
    response: models.CoreDocument;
  };
  /** PUT /api/v1/core/document-numbering/{id} — Изменить нумерацию вида документа */
  coreUpdateDocumentNumbering: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreDocumentNumberingInput;
    response: models.CoreDocumentNumbering;
  };
  /** PATCH /api/v1/core/document-types/{id} — Частично изменить тип документа */
  coreUpdateDocumentType: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreDocumentTypePatch;
    response: models.CoreDocumentType;
  };
  /** PATCH /api/v1/core/employees/{id} — Частично изменить карточку сотрудника */
  coreUpdateEmployee: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreEmployeePatch;
    response: models.CoreEmployee;
  };
  /** PATCH /api/v1/core/employee-equipment/{id} — Изменить состояние выданного имущества */
  coreUpdateEmployeeEquipment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreEmployeeEquipmentInput;
    response: models.CoreEmployeeEquipment;
  };
  /** PATCH /api/v1/core/employee-lifecycle-templates/{id} — Изменить шаблон приёма или увольнения */
  coreUpdateEmployeeLifecycleTemplate: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreEmployeeLifecycleTemplateInput;
    response: models.CoreEmployeeLifecycleTemplate;
  };
  /** PUT /api/v1/core/employees/{id}/requisites — Изменить реквизиты сотрудника */
  coreUpdateEmployeeRequisites: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreEmployeeRequisitesUpdate;
    response: models.CoreEmployeeRequisites;
  };
  /** PATCH /api/v1/core/folders/{id} — Изменить папку, её родителя и признаки по умолчанию */
  coreUpdateFolder: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreFolderInput;
    response: models.CoreFolder;
  };
  /** PATCH /api/v1/core/gl-accounts/{id} — Изменить название, родителя, активность или участие в ДДС */
  coreUpdateGLAccount: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreGLAccountPatch;
    response: models.CoreGLAccount;
  };
  /** PATCH /api/v1/core/items/{id} — Изменить статью и её применения */
  coreUpdateItem: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreItemPatch;
    response: models.CoreItem;
  };
  /** PATCH /api/v1/core/marking-groups/{id} — Изменить группу маркировки */
  coreUpdateMarkingGroup: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreMarkingGroupPatch;
    response: models.CoreMarkingGroup;
  };
  /** PATCH /api/v1/core/org-structure/departments/{id} — Изменить подразделение */
  coreUpdateOrgDepartment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrgDepartmentInput;
    response: models.CoreOrgDepartmentSaveResult;
  };
  /** PUT /api/v1/core/price-sets/{id} — Изменить черновик установки цен */
  coreUpdatePriceSet: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CorePriceSetInput;
    response: models.CorePriceSet;
  };
  /** PATCH /api/v1/core/price-types/{id} — Изменить вид цены */
  coreUpdatePriceType: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CorePriceTypeInput;
    response: models.CorePriceType;
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
  /** PATCH /api/v1/core/registers/{key} — Дополнить определение регистра */
  coreUpdateRegister: {
    params: { "key": string };
    query: Record<string, never>;
    body: models.CoreRegisterPatch;
    response: models.CoreRegister;
  };
  /** PATCH /api/v1/core/sales-channels/{id} — Изменить канал продаж */
  coreUpdateSalesChannel: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreSalesChannelPatch;
    response: models.CoreSalesChannel;
  };
  /** PUT /api/v1/core/trade/funnels/{id} — Изменить воронку продаж или закупок */
  coreUpdateTradeFunnel: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderFunnelInput;
    response: models.CoreOrderFunnel;
  };
  /** PATCH /api/v1/core/trade/statuses/{id} — Изменить статус продажи или закупки кабинета */
  coreUpdateTradeStatus: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderStatusPatch;
    response: models.CoreOrderStatus;
  };
  /** PUT /api/v1/core/trade/templates/{id} — Изменить шаблон продажи или закупки */
  coreUpdateTradeTemplate: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreOrderTemplateInput;
    response: models.CoreOrderTemplate;
  };
  /** POST /api/v1/core/employees/without-staffing — Найти сотрудников из пользователей без штатной позиции */
  coreUserEmployeesWithoutStaffing: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreUserEmployeesWithoutStaffingRequest;
    response: { [key: string]: unknown };
  };
  /** DELETE /api/v1/crm/card-upload-sessions/{id} — Отменить сессию загрузки файла карточки */
  crmAbortCardFileUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
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
  /** DELETE /api/v1/crm/web-form-upload-sessions/{id} — Отменить загрузку документа согласия */
  crmAbortWebFormUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/crm/ad-costs — Расходы на рекламу за месяц */
  crmAdCosts: {
    params: Record<string, never>;
    query: { "period"?: string };
    body: never;
    response: models.CRMAdCosts;
  };
  /** POST /api/v1/crm/{entity}/{id}/notes — Добавить заметку в ленту записи */
  crmAddNote: {
    params: { "entity": "lead" | "deal" | "customer"; "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMNoteInput;
    response: models.CRMActivity;
  };
  /** POST /api/v1/crm/contacts/{id}/adopt — Взять контрагента справочника ERP в базу клиентов CRM */
  crmAdoptDirectoryContact: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMCustomer;
  };
  /** POST /api/v1/crm/imports/{id}/apply — Запустить перенос импорта */
  crmApplyImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMImportApplyInput;
    response: models.CRMImportRun;
  };
  /** PATCH /api/v1/crm/inbox/conversations/{id}/assign — Назначить ответственного за диалог */
  crmAssignInboxConversation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMInboxAssignInput;
    response: models.CRMInboxConversation;
  };
  /** POST /api/v1/crm/customers/bulk — Массово изменить клиентов CRM */
  crmBulkCustomers: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMBulkCustomersInput;
    response: models.CRMBulkResult;
  };
  /** POST /api/v1/crm/deals/bulk — Массово изменить сделки */
  crmBulkDeals: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMBulkDealsInput;
    response: models.CRMBulkResult;
  };
  /** POST /api/v1/crm/leads/bulk — Массово изменить лиды */
  crmBulkLeads: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMBulkLeadsInput;
    response: models.CRMBulkResult;
  };
  /** POST /api/v1/crm/imports/{id}/cancel — Отменить запуск импорта */
  crmCancelImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMImportRun;
  };
  /** GET /api/v1/crm/{entity}/{id}/files/{fileId}/download-session — Временный адрес файла карточки */
  crmCardFileDownloadSession: {
    params: { "entity": "lead" | "deal" | "customer"; "fileId": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.TransferDownloadLink;
  };
  /** POST /api/v1/crm/inbox/connections/{id}/check — Проверить подключение канала */
  crmCheckInboxConnection: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMInboxConnectionCheck;
  };
  /** POST /api/v1/crm/inbox/conversations/{id}/close — Закрыть диалог */
  crmCloseInboxConversation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMInboxConversation;
  };
  /** POST /api/v1/crm/imports/{id}/connect — Подключить запуск к аккаунту amoCRM или порталу Битрикс24 */
  crmConnectImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMImportConnectInput;
    response: models.CRMImportRun;
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
  /** POST /api/v1/crm/{entity}/{id}/files/upload-sessions — Открыть сессию загрузки файла в карточку */
  crmCreateCardFileUploadSession: {
    params: { "entity": "lead" | "deal" | "customer"; "id": models.UUID };
    query: Record<string, never>;
    body: models.TransferUploadRequest;
    response: models.TransferSession;
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
  /** POST /api/v1/crm/deals/{id}/order — Создать заказ из сделки */
  crmCreateDealOrder: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMDealOrderInput;
    response: models.CRMDealOrder;
  };
  /** POST /api/v1/crm/{entity}/{id}/engagements — Запланировать дело по лиду, сделке или клиенту */
  crmCreateEngagement: {
    params: { "entity": "lead" | "deal" | "customer"; "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMEngagementInput;
    response: models.CRMEngagement;
  };
  /** POST /api/v1/crm/engagements/{id}/task — Сделать из дела задачу */
  crmCreateEngagementTask: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMEngagementTaskInput;
    response: models.CRMEngagement;
  };
  /** POST /api/v1/crm/{entity}/{id}/events — Создать событие календаря по записи CRM */
  crmCreateEventLink: {
    params: { "entity": "lead" | "deal" | "customer"; "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMCreateEventLinkInput;
    response: models.CRMExternalLink;
  };
  /** POST /api/v1/crm/{entity}/{id}/hub-meetings — Связать запись CRM со встречей хаба проекта */
  crmCreateHubMeetingLink: {
    params: { "entity": "lead" | "deal" | "customer"; "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMCreateHubMeetingInput;
    response: models.CRMExternalLink;
  };
  /** POST /api/v1/crm/imports — Создать запуск импорта */
  crmCreateImport: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMImportRunInput;
    response: models.CRMImportRun;
  };
  /** POST /api/v1/crm/imports/{id}/pipelines — Создать воронки как в источнике */
  crmCreateImportPipelines: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMImportOptions;
  };
  /** POST /api/v1/crm/imports/{id}/upload-sessions — Открыть сессию загрузки файла импорта */
  crmCreateImportUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMImportUploadRequest;
    response: models.TransferSession;
  };
  /** POST /api/v1/crm/inbox/connections — Подключить канал */
  crmCreateInboxConnection: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMInboxConnectionInput;
    response: models.CRMInboxConnection;
  };
  /** POST /api/v1/crm/inbox/lines — Создать линию обращений */
  crmCreateInboxLine: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMInboxLineInput;
    response: models.CRMInboxLine;
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
  /** POST /api/v1/crm/lead-sources — Добавить источник обращения */
  crmCreateLeadSource: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMLeadSourceInput;
    response: models.CRMLeadSource;
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
  /** POST /api/v1/crm/views — Сохранить представление списка CRM */
  crmCreateSavedView: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMSavedViewInput;
    response: models.CRMSavedView;
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
  /** POST /api/v1/crm/web-forms — Создать форму заявок для сайта */
  crmCreateWebForm: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMWebFormInput;
    response: models.CRMWebForm;
  };
  /** POST /api/v1/crm/web-forms/{id}/consent-file/upload-sessions — Открыть загрузку документа согласия формы */
  crmCreateWebFormConsentUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.TransferUploadRequest;
    response: models.TransferSession;
  };
  /** PUT /api/v1/crm/imports/{id}/records/{recordId}/decision — Решить, что делать с записью импорта */
  crmDecideImportRecord: {
    params: { "id": models.UUID; "recordId": models.UUID };
    query: Record<string, never>;
    body: models.CRMImportDecisionInput;
    response: models.CRMImportRecord;
  };
  /** DELETE /api/v1/crm/{entity}/{id}/files/{fileId} — Удалить файл карточки */
  crmDeleteCardFile: {
    params: { "entity": "lead" | "deal" | "customer"; "fileId": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/crm/customers/{id} — Удалить клиента CRM */
  crmDeleteCustomer: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/crm/deals/{id} — Удалить сделку */
  crmDeleteDeal: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/crm/inbox/lines/{id} — Удалить линию обращений */
  crmDeleteInboxLine: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/crm/pipelines/{id} — Удалить воронку */
  crmDeletePipeline: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/crm/views/{id} — Удалить представление списка CRM */
  crmDeleteSavedView: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/crm/web-forms/{id} — Удалить форму заявок для сайта */
  crmDeleteWebForm: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/crm/web-forms/{id}/consent-file — Открепить документ согласия формы */
  crmDeleteWebFormConsentFile: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMWebForm;
  };
  /** POST /api/v1/crm/inbox/connections/{id}/disable — Выключить канал */
  crmDisableInboxConnection: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMInboxConnection;
  };
  /** POST /api/v1/crm/inbox/connections/{id}/enable — Включить канал */
  crmEnableInboxConnection: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMInboxConnection;
  };
  /** POST /api/v1/crm/imports/{id}/extract — Собрать пакет из листов файла */
  crmExtractImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMImportExtractInput;
    response: models.CRMImportExtractResult;
  };
  /** GET /api/v1/crm/customers/duplicates — Найти похожие карточки клиента */
  crmFindCustomerDuplicates: {
    params: Record<string, never>;
    query: { "email"?: string; "inn"?: string; "kpp"?: string; "name"?: string; "phone"?: string };
    body: never;
    response: Array<models.CRMCustomerDuplicate>;
  };
  /** POST /api/v1/crm/card-upload-sessions/{id}/finish — Завершить загрузку файла в карточку */
  crmFinishCardFileUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMCardFile;
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
  /** POST /api/v1/crm/web-form-upload-sessions/{id}/finish — Завершить загрузку документа согласия */
  crmFinishWebFormUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMWebForm;
  };
  /** GET /api/v1/crm/analytics — Получить аналитику продаж */
  crmGetAnalytics: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CRMAnalytics;
  };
  /** GET /api/v1/crm/analytics/report — Отчёт продаж за период */
  crmGetAnalyticsReport: {
    params: Record<string, never>;
    query: { "channel"?: "manual" | "webchat" | "phone" | "email" | "telegram" | "whatsapp" | "vk" | "max" | "instagram" | "avito" | "other"; "compare"?: boolean; "department_id"?: models.UUID; "from"?: string; "owner_id"?: number; "pipeline_id"?: models.UUID; "source"?: string; "to"?: string; "tz"?: string };
    body: never;
    response: models.CRMAnalyticsReport;
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
  /** GET /api/v1/crm/card-upload-sessions/{id} — Состояние сессии загрузки файла карточки */
  crmGetCardFileUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.TransferSession;
  };
  /** GET /api/v1/crm/counters — Получить счётчики CRM для верхней панели */
  crmGetCounters: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CRMCounters;
  };
  /** GET /api/v1/crm/customers/{id} — Получить клиента CRM */
  crmGetCustomer: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMCustomer;
  };
  /** GET /api/v1/crm/customers/{id}/relations — Получить компании человека и контакты компании */
  crmGetCustomerRelations: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMCustomerRelations;
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
  /** GET /api/v1/crm/imports/{id} — Получить запуск импорта */
  crmGetImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMImportRun;
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
    query: { "before"?: string; "before_id"?: models.UUID; "kinds"?: string; "limit"?: number };
    body: never;
    response: Array<models.CRMTimelineEntry>;
  };
  /** GET /api/v1/crm/web-forms/{id} — Получить форму заявок для сайта */
  crmGetWebForm: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMWebForm;
  };
  /** GET /api/v1/crm/web-form-upload-sessions/{id} — Состояние загрузки документа согласия */
  crmGetWebFormUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.TransferSession;
  };
  /** GET /api/v1/crm/import-fields — Поля листов универсального файла импорта */
  crmImportFields: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CRMImportFields;
  };
  /** GET /api/v1/crm/imports/{id}/options — Справочники для сопоставления импорта */
  crmImportOptions: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMImportOptions;
  };
  /** GET /api/v1/crm/inbox/attachments/{id}/download-session — Временный адрес вложения диалога */
  crmInboxAttachmentDownloadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.TransferDownloadLink;
  };
  /** POST /api/v1/crm/imports/{id}/inspect — Показать колонки листа */
  crmInspectImportSheet: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMImportInspectInput;
    response: models.CRMImportSheetInfo;
  };
  /** POST /api/v1/crm/deals/{id}/invoice — Выставить счёт по заказу сделки */
  crmIssueDealInvoice: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMDealInvoiceInput;
    response: models.CRMDealInvoice;
  };
  /** GET /api/v1/crm/leads/{id}/duplicates — Похожие обращения */
  crmLeadDuplicates: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMLeadDuplicate>;
  };
  /** POST /api/v1/crm/{entity}/{id}/mail/links — Привязать письмо к карточке */
  crmLinkCardMail: {
    params: { "entity": "lead" | "deal" | "customer"; "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMCardMailLinkRequest;
    response: models.CRMMailLink;
  };
  /** PUT /api/v1/crm/customers/{id}/companies/{companyId} — Связать человека с компанией */
  crmLinkCustomerCompany: {
    params: { "companyId": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMCustomerLinkInput;
    response: models.CRMCustomerRelations;
  };
  /** POST /api/v1/crm/inbox/entities/{entity}/{id}/conversations — Привязать диалог к записи CRM */
  crmLinkEntityConversation: {
    params: { "entity": "lead" | "deal" | "customer"; "id": models.UUID };
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
  /** GET /api/v1/crm/{entity}/{id}/files — Файлы карточки лида, сделки или клиента */
  crmListCardFiles: {
    params: { "entity": "lead" | "deal" | "customer"; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMCardFileList;
  };
  /** GET /api/v1/crm/{entity}/{id}/mail — Письма карточки лида, сделки или клиента */
  crmListCardMail: {
    params: { "entity": "lead" | "deal" | "customer"; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMCardMailList;
  };
  /** GET /api/v1/crm/{entity}/{id}/mail/candidates — Письма клиента, которые можно привязать к карточке */
  crmListCardMailCandidates: {
    params: { "entity": "lead" | "deal" | "customer"; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMMailMessageList;
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
  /** GET /api/v1/crm/deals/{id}/contacts — Получить контакты сделки */
  crmListDealContacts: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMDealContact>;
  };
  /** GET /api/v1/crm/deals/{id}/items — Получить состав сделки */
  crmListDealItems: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMDealItem>;
  };
  /** GET /api/v1/crm/deals — Получить карточки сделок кабинета */
  crmListDeals: {
    params: Record<string, never>;
    query: { "archived"?: boolean; "customer"?: models.UUID; "limit"?: number; "offset"?: number; "owner"?: number; "pipeline"?: models.UUID; "q"?: string; "sort"?: string; "stage"?: models.UUID };
    body: never;
    response: Array<models.CRMDealCard>;
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
    params: { "entity": "lead" | "deal" | "customer"; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMInboxLinkedConversation>;
  };
  /** GET /api/v1/crm/inbox/entities/{entity}/{id}/messages — Получить переписку записи CRM */
  crmListEntityMessages: {
    params: { "entity": "lead" | "deal" | "customer"; "id": models.UUID };
    query: { "limit"?: number };
    body: never;
    response: Array<models.CRMInboxEntityMessage>;
  };
  /** GET /api/v1/crm/{entity}/{id}/links — Получить связи записи с задачами, событиями и встречами */
  crmListExternalLinks: {
    params: { "entity": "lead" | "deal" | "customer"; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMExternalLink>;
  };
  /** GET /api/v1/crm/imports/{id}/records — Записи пакета импорта */
  crmListImportRecords: {
    params: { "id": models.UUID };
    query: { "kind"?: "customer" | "lead" | "deal" | "customer_company" | "engagement" | "task" | "activity" | "note"; "limit"?: number; "offset"?: number; "status"?: "pending" | "skipped" | "conflict" | "applied" | "failed" };
    body: never;
    response: Array<models.CRMImportRecord>;
  };
  /** GET /api/v1/crm/imports — Список запусков импорта */
  crmListImports: {
    params: Record<string, never>;
    query: { "limit"?: number };
    body: never;
    response: Array<models.CRMImportRun>;
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
  /** GET /api/v1/crm/inbox/lines — Получить линии обращений */
  crmListInboxLines: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMInboxLine>;
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
  /** GET /api/v1/crm/lead-sources — Получить справочник источников обращения */
  crmListLeadSources: {
    params: Record<string, never>;
    query: { "active"?: boolean };
    body: never;
    response: Array<models.CRMLeadSource>;
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
  /** GET /api/v1/crm/mail/accounts — Почтовые ящики для письма из карточки */
  crmListMailAccounts: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CRMMailAccountList;
  };
  /** GET /api/v1/crm/members — Получить сотрудников для назначения ответственным */
  crmListMembers: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMUserRef>;
  };
  /** GET /api/v1/crm/engagements — Получить мои дела за период */
  crmListMyEngagements: {
    params: Record<string, never>;
    query: { "from"?: string; "limit"?: number; "no_due"?: boolean; "overdue"?: boolean; "owner"?: string; "status"?: "open" | "done" | "all"; "to"?: string };
    body: never;
    response: Array<models.CRMEngagement>;
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
  /** GET /api/v1/crm/views — Получить сохранённые представления списка CRM */
  crmListSavedViews: {
    params: Record<string, never>;
    query: { "list": models.CRMSavedViewListKind };
    body: never;
    response: models.CRMSavedViewList;
  };
  /** GET /api/v1/crm/web-forms/{id}/submissions — Получить журнал заявок формы */
  crmListWebFormSubmissions: {
    params: { "id": models.UUID };
    query: { "limit"?: number };
    body: never;
    response: models.CRMWebFormSubmissionList;
  };
  /** GET /api/v1/crm/web-forms — Получить формы заявок для сайта */
  crmListWebForms: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CRMWebFormList;
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
  /** POST /api/v1/crm/imports/{id}/preview — Проверить импорт перед переносом */
  crmPreviewImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMImportRevisionInput;
    response: models.CRMImportPreview;
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
  /** PUT /api/v1/crm/deals/{id}/items — Заменить состав сделки */
  crmReplaceDealItems: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMDealItemsInput | Array<models.CRMDealItemInput>;
    response: Array<models.CRMDealItem>;
  };
  /** POST /api/v1/crm/automation/runs/{id}/retry — Повторить неуспешный запуск */
  crmRetryAutomationRun: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMAutomationRun;
  };
  /** POST /api/v1/crm/imports/{id}/rollback — Отменить загрузку импорта */
  crmRollbackImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMImportRollback;
  };
  /** GET /api/v1/crm/sales-plans — Планы продаж на месяц */
  crmSalesPlans: {
    params: Record<string, never>;
    query: { "period"?: string };
    body: never;
    response: Array<models.CRMSalesPlan>;
  };
  /** PUT /api/v1/crm/ad-costs — Переписать расходы на рекламу за месяц */
  crmSaveAdCosts: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMAdCostsInput;
    response: models.CRMAdCosts;
  };
  /** PUT /api/v1/crm/imports/{id}/mapping — Сохранить сопоставление импорта */
  crmSaveImportMapping: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMImportMappingInput;
    response: models.CRMImportRun;
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
  /** GET /api/v1/crm/catalog — Найти товар или услугу для состава сделки */
  crmSearchCatalog: {
    params: Record<string, never>;
    query: { "limit"?: number; "offset"?: number; "q"?: string };
    body: never;
    response: models.CRMCatalogPage;
  };
  /** POST /api/v1/crm/{entity}/{id}/mail — Отправить письмо из карточки */
  crmSendCardMail: {
    params: { "entity": "lead" | "deal" | "customer"; "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMCardMailSendRequest;
    response: models.CRMMailLink;
  };
  /** POST /api/v1/crm/inbox/conversations/{id}/messages — Отправить сообщение в диалог */
  crmSendInboxMessage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMInboxSendInput;
    response: models.CRMInboxMessage;
  };
  /** DELETE /api/v1/crm/{entity}/{id}/mail/links/{linkId} — Отвязать переписку от карточки */
  crmUnlinkCardMail: {
    params: { "entity": "lead" | "deal" | "customer"; "id": models.UUID; "linkId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/crm/customers/{id}/companies/{companyId} — Снять связь человека с компанией */
  crmUnlinkCustomerCompany: {
    params: { "companyId": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMCustomerRelations;
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
  /** PATCH /api/v1/crm/inbox/connections/{id} — Изменить подключение канала */
  crmUpdateInboxConnection: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMInboxConnectionPatch;
    response: models.CRMInboxConnection;
  };
  /** PATCH /api/v1/crm/inbox/lines/{id} — Изменить линию обращений */
  crmUpdateInboxLine: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMInboxLineInput;
    response: models.CRMInboxLine;
  };
  /** PATCH /api/v1/crm/leads/{id} — Изменить лид */
  crmUpdateLead: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMLeadPatch;
    response: models.CRMLead;
  };
  /** PATCH /api/v1/crm/lead-sources/{id} — Изменить источник обращения */
  crmUpdateLeadSource: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMLeadSourcePatch;
    response: models.CRMLeadSource;
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
  /** PATCH /api/v1/crm/views/{id} — Изменить представление списка CRM */
  crmUpdateSavedView: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMSavedViewPatch;
    response: models.CRMSavedView;
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
  /** PUT /api/v1/crm/web-forms/{id} — Изменить форму заявок для сайта */
  crmUpdateWebForm: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMWebFormInput;
    response: models.CRMWebForm;
  };
  /** GET /api/v1/dashboard/metrics/{id}/explain — Объяснить число показателя */
  dashboardExplainMetric: {
    params: { "id": string };
    query: { "company"?: models.UUID; "from": string; "project"?: models.UUID; "to": string };
    body: never;
    response: models.DashboardMetricExplanation;
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
  /** POST /api/v1/docflow/messages/{id}/intake — Принять входящий документ к учёту */
  docflowAcceptIntake: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowIntakeInput;
    response: models.DocflowIntakeResult;
  };
  /** POST /api/v1/docflow/approvals/{id}/acknowledge — Отметить «ознакомлен» */
  docflowAcknowledgeApproval: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowApproval;
  };
  /** POST /api/v1/docflow/comments — Написать комментарий к документу */
  docflowAddDocumentComment: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocflowDocumentCommentInput;
    response: models.DocflowDocumentComment;
  };
  /** GET /api/v1/docflow/flow/advance-invoices — Получить счёт-фактуру на аванс */
  docflowAdvanceInvoice: {
    params: Record<string, never>;
    query: { "advance_id": models.UUID };
    body: never;
    response: models.DocflowFlowDocument;
  };
  /** POST /api/v1/docflow/mail-messages/{id}/papers — Завести карточки бумаг входящего письма */
  docflowApplyMailPapers: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowMailPapersInput;
    response: models.DocflowMailPapers;
  };
  /** POST /api/v1/docflow/messages/{id}/papers — Завести карточки бумаг входящего пакета */
  docflowApplyPackagePapers: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowPackagePapersInput;
    response: models.DocflowPackagePapers;
  };
  /** GET /api/v1/docflow/approvals/{id} — Получить согласование целиком */
  docflowApproval: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowApproval;
  };
  /** GET /api/v1/docflow/approval-routes/{id} — Получить маршрут согласования */
  docflowApprovalRoute: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowApprovalRoute;
  };
  /** GET /api/v1/docflow/approval-routes — Получить маршруты согласования */
  docflowApprovalRoutes: {
    params: Record<string, never>;
    query: { "kind"?: "flow_document" | "payment_request" | "edo_message" | "stock_purchase_request" | "stock_writeoff" | "any"; "module"?: "docflow" | "finance" | "stock" };
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
    query: { "id": models.UUID; "kind": "flow_document" | "payment_request" | "edo_message" | "stock_purchase_request" | "stock_writeoff"; "module": "docflow" | "finance" | "stock" };
    body: never;
    response: models.DocflowApprovalSubjectState;
  };
  /** GET /api/v1/docflow/approval-substitutions — Получить замещения согласующих */
  docflowApprovalSubstitutions: {
    params: Record<string, never>;
    query: { "principal"?: number; "substitute"?: number };
    body: never;
    response: models.DocflowApprovalSubstitutionList;
  };
  /** GET /api/v1/docflow/approvals — Получить очередь согласований */
  docflowApprovals: {
    params: Record<string, never>;
    query: { "kind"?: "flow_document" | "payment_request" | "edo_message" | "stock_purchase_request" | "stock_writeoff"; "limit"?: number; "mine"?: "true" | "false"; "module"?: "docflow" | "finance" | "stock"; "offset"?: number; "overdue"?: "true" | "false"; "search"?: string; "state"?: "pending" | "approved" | "rejected" | "returned" | "cancelled" };
    body: never;
    response: models.DocflowApprovalInboxPage;
  };
  /** POST /api/v1/docflow/approvals/batch-approve — Согласовать несколько проходов одним вызовом */
  docflowApproveApprovalsBatch: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocflowApprovalBatchInput;
    response: models.DocflowApprovalBatchResult;
  };
  /** POST /api/v1/docflow/messages/{id}/cancellation/approve — Согласиться на аннулирование */
  docflowApproveCancellation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowCancellationInput;
    response: models.DocflowActionResult;
  };
  /** POST /api/v1/docflow/messages/{id}/actions/approve — Подтвердить документ */
  docflowApproveMessage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowMessageActionInput;
    response: models.DocflowActionResult;
  };
  /** POST /api/v1/docflow/flow/documents/{id}/assignments — Поручить работу по документу */
  docflowAssignFlowDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowFlowAssignmentInput;
    response: models.DocflowFlowAssignment;
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
  /** POST /api/v1/docflow/payment-requests/{id}/cancel — Отозвать заявку на оплату */
  docflowCancelPaymentRequest: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowPaymentRequestVersion;
    response: models.DocflowPaymentRequest;
  };
  /** GET /api/v1/docflow/approval-routes/check — Проверить, по какому маршруту пойдёт предмет */
  docflowCheckApprovalRoute: {
    params: Record<string, never>;
    query: { "amount"?: string; "business_id"?: models.UUID; "company_id"?: models.UUID; "contact_folder_id"?: models.UUID; "contact_id"?: models.UUID; "currency"?: string; "department_id"?: models.UUID; "document_kind"?: string; "item_id"?: models.UUID; "kind": "flow_document" | "payment_request" | "edo_message" | "stock_purchase_request" | "stock_writeoff"; "module"?: "docflow" | "stock" };
    body: never;
    response: models.DocflowApprovalChainPreview;
  };
  /** POST /api/v1/docflow/connections/{id}/check — Проверить связь с оператором */
  docflowCheckConnection: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowConnection;
  };
  /** GET /api/v1/docflow/contacts/{id}/paper-settings — Получить настройку артикула в документах покупателя */
  docflowContactPaperSettings: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowContactPaperSettings;
  };
  /** POST /api/v1/docflow/approval-routes — Завести маршрут согласования */
  docflowCreateApprovalRoute: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocflowApprovalRouteInput;
    response: models.DocflowApprovalRoute;
  };
  /** POST /api/v1/docflow/connections — Завести подключение к оператору ЭДО */
  docflowCreateConnection: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocflowConnectionInput;
    response: models.DocflowConnection;
  };
  /** POST /api/v1/docflow/flow/documents/{id}/upload-sessions — Открыть сессию загрузки файла в документ */
  docflowCreateFlowUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowFlowUploadRequest;
    response: models.TransferSession;
  };
  /** POST /api/v1/docflow/payment-requests — Завести заявку на оплату */
  docflowCreatePaymentRequest: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocflowPaymentRequestInput;
    response: models.DocflowPaymentRequest;
  };
  /** POST /api/v1/docflow/payment-request-schedules — Завести регулярную заявку на оплату */
  docflowCreatePaymentRequestSchedule: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocflowPaymentRequestScheduleInput;
    response: models.DocflowPaymentRequestSchedule;
  };
  /** POST /api/v1/docflow/approvals/{id}/decisions — Принять решение согласующего */
  docflowDecideApproval: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowApprovalDecisionInput;
    response: models.DocflowApproval;
  };
  /** DELETE /api/v1/docflow/approval-substitutions/{id} — Удалить замещение согласующего */
  docflowDeleteApprovalSubstitution: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/docflow/connections/{id} — Удалить подключение */
  docflowDeleteConnection: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/docflow/comments/{id} — Удалить свой комментарий к документу */
  docflowDeleteDocumentComment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowDocumentComment;
  };
  /** DELETE /api/v1/docflow/flow/documents/{id}/edo/{link} — Удалить неотправленный черновик карточки у оператора */
  docflowDeleteFlowEDODraft: {
    params: { "id": models.UUID; "link": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/docflow/messages/{id}/draft — Удалить неотправленный черновик у оператора */
  docflowDeleteMessageDraft: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/docflow/messages/{id}/intake/accounting — Разнести входящий документ */
  docflowDistributeIncoming: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowIncomingAccountingInput;
    response: models.DocflowIncomingAccountingResult;
  };
  /** GET /api/v1/docflow/comments/mention-candidates — Подобрать сотрудника для упоминания в обсуждении */
  docflowDocumentCommentMentionCandidates: {
    params: Record<string, never>;
    query: { "q"?: string; "subject_id": models.UUID; "subject_kind": "flow_document" | "payment_request" };
    body: never;
    response: models.DocflowDocumentCommentCandidateList;
  };
  /** GET /api/v1/docflow/comments — Получить обсуждение документа */
  docflowDocumentComments: {
    params: Record<string, never>;
    query: { "subject_id": models.UUID; "subject_kind": "flow_document" | "payment_request" };
    body: never;
    response: models.DocflowDocumentCommentList;
  };
  /** PUT /api/v1/docflow/comments/{id} — Исправить свой комментарий к документу */
  docflowEditDocumentComment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowDocumentCommentEdit;
    response: models.DocflowDocumentComment;
  };
  /** POST /api/v1/docflow/flow/upload-sessions/{id}/finish — Завершить загрузку и приложить файл к документу */
  docflowFinishFlowUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowFlowUploadResult | models.DocflowFlowOriginal;
  };
  /** GET /api/v1/docflow/flow/documents/{id}/accounting-candidates — Получить учётные документы, которые можно связать с бумагой */
  docflowFlowAccountingCandidates: {
    params: { "id": models.UUID };
    query: { "offset"?: number; "owner": "finance" | "stock"; "search"?: string };
    body: never;
    response: models.DocflowFlowAccountingPage;
  };
  /** GET /api/v1/docflow/flow/documents/{id}/accounting-links/{link} — Прочитать учётный документ связи */
  docflowFlowAccountingLink: {
    params: { "id": models.UUID; "link": models.UUID };
    query: { "version"?: number };
    body: never;
    response: models.DocflowFlowAccountingDocument;
  };
  /** GET /api/v1/docflow/flow/accounting-documents/{owner}/{document}/originals — Получить бумаги, стоящие за учётным документом */
  docflowFlowAccountingOriginals: {
    params: { "document": models.UUID; "owner": "finance" | "stock" };
    query: { "offset"?: number };
    body: never;
    response: models.DocflowFlowAccountingBacklinkPage;
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
  /** POST /api/v1/docflow/flow/accounting-documents/{owner}/{document}/originals — Завести бумагу по учётному документу */
  docflowFlowCreateAccountingOriginal: {
    params: { "document": models.UUID; "owner": "finance" | "stock" };
    query: Record<string, never>;
    body: models.DocflowFlowAccountingOriginalInput;
    response: models.DocflowFlowDocument;
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
  /** GET /api/v1/docflow/flow/documents/{id}/articles — Получить артикулы строк документа для покупателя */
  docflowFlowDocumentArticles: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowFlowArticles;
  };
  /** GET /api/v1/docflow/flow/documents/{id}/assignments — Получить поручения по документу */
  docflowFlowDocumentAssignments: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowFlowAssignmentList;
  };
  /** GET /api/v1/docflow/flow/documents/{id}/marks — Получить коды маркировки строк УПД или накладной */
  docflowFlowDocumentMarks: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowFlowMarks;
  };
  /** GET /api/v1/docflow/flow/documents/{id}/reconciliation — Сравнить стороны акта сверки */
  docflowFlowDocumentReconciliation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowFlowReconciliationView;
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
    query: { "awaiting_my_approval"?: "true" | "false"; "company_id"?: models.UUID; "contact_id"?: models.UUID; "contact_ids"?: string; "deal"?: "yes" | "no"; "direction"?: "incoming" | "outgoing" | "internal"; "journal"?: "true" | "false"; "kind"?: models.DocflowFlowKind; "kinds"?: string; "limit"?: number; "offset"?: number; "paper_original"?: "expected" | "received" | "sent" | "not_needed"; "paper_waiting_days"?: number; "regular"?: "true" | "false"; "related_to"?: models.UUID; "search"?: string; "status"?: "draft" | "registered" | "archived"; "validity"?: "active" | "expiring" | "expired"; "with"?: string };
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
  /** POST /api/v1/docflow/flow/invoice-duplicates — Проверить счёт поставщика на дубль */
  docflowFlowInvoiceDuplicates: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocflowFlowInvoiceDuplicatesInput;
    response: models.DocflowFlowInvoiceDuplicates;
  };
  /** GET /api/v1/docflow/flow/documents/{id}/payee — Получить получателя платежа по карточке счёта */
  docflowFlowInvoicePayee: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowFlowInvoicePayee;
  };
  /** POST /api/v1/docflow/flow/documents/{id}/accounting-links — Связать бумагу с учётным документом */
  docflowFlowLinkAccountingDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowFlowAccountingLinkInput;
    response: models.DocflowFlowDocument;
  };
  /** POST /api/v1/docflow/flow/originals/paper — Отметить бумажные оригиналы нескольких документов */
  docflowFlowMarkPaperOriginals: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocflowFlowPaperOriginalBulkInput;
    response: models.DocflowFlowPaperOriginalBulkResult;
  };
  /** GET /api/v1/docflow/flow/documents/{id}/original — Оригинал документа — сканы и бумажный экземпляр */
  docflowFlowOriginal: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowFlowOriginal;
  };
  /** POST /api/v1/docflow/flow/schedule-preview — Раскрыть правило графика оплат в строки */
  docflowFlowPreviewPaymentSchedule: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocflowFlowCommercial;
    response: models.DocflowFlowCommercial;
  };
  /** GET /api/v1/docflow/flow/references — Получить справочники внутреннего контура */
  docflowFlowReferences: {
    params: Record<string, never>;
    query: { "kind": "company" | "contact" | "product" | "sale_item" | "purchase_item" | "contact_folder"; "offset"?: number; "search"?: string };
    body: never;
    response: models.DocflowFlowReferencePage;
  };
  /** GET /api/v1/docflow/flow/registration-journals — Получить журналы регистрации документов */
  docflowFlowRegistrationJournals: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.DocflowFlowRegistrationJournalsResponse;
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
  /** PUT /api/v1/docflow/flow/documents/{id}/original/paper — Отметить, где бумажный оригинал документа */
  docflowFlowSetPaperOriginal: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowFlowPaperOriginalInput;
    response: models.DocflowFlowOriginal;
  };
  /** PUT /api/v1/docflow/flow/registration-journals/{journal} — Задать шаблон номера журнала регистрации */
  docflowFlowSetRegistrationJournal: {
    params: { "journal": "incoming" | "outgoing" | "internal" };
    query: Record<string, never>;
    body: models.DocflowFlowRegistrationJournalInput;
    response: models.DocflowFlowRegistrationJournal;
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
  /** POST /api/v1/docflow/flow/documents/{id}/supplier-act — Провести акт поставщика по карточке в закупке */
  docflowFlowSupplierAct: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowFlowSupplierActInput;
    response: models.DocflowFlowSupplierActResult;
  };
  /** POST /api/v1/docflow/flow/documents/{id}/accounting-links/remove — Снять связь бумаги с учётным документом */
  docflowFlowUnlinkAccountingDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowFlowAccountingUnlinkInput;
    response: models.DocflowFlowDocument;
  };
  /** GET /api/v1/docflow/connections/{id} — Получить карточку подключения */
  docflowGetConnection: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowConnection;
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
  /** GET /api/v1/docflow/gov/documents/{id} — Карточка документа госоргана */
  docflowGovDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowGovDocument;
  };
  /** GET /api/v1/docflow/gov/documents — Документы госорганов */
  docflowGovDocuments: {
    params: Record<string, never>;
    query: { "company"?: models.UUID; "limit"?: number; "offset"?: number; "open"?: "1"; "part"?: "claims" | "letters" | "reports" };
    body: never;
    response: models.DocflowGovList;
  };
  /** GET /api/v1/docflow/gov/summary — Сводка раздела «Налоговая» */
  docflowGovSummary: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.DocflowGovSummary;
  };
  /** GET /api/v1/docflow/messages/{id}/intake/accounting — План разнесения входящего документа */
  docflowIncomingAccountingPlan: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowIncomingAccountingPlan;
  };
  /** GET /api/v1/docflow/messages/{id}/intake — Посмотреть, что предлагается принять к учёту */
  docflowIntakePreview: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowIntakePreview;
  };
  /** POST /api/v1/docflow/connections/{id}/invitations — Пригласить контрагента к обмену */
  docflowInviteCounterparty: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowInvitationInput;
    response: void;
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
  /** POST /api/v1/docflow/flow/upd/shipment — Сформировать УПД по отгрузке */
  docflowIssueShipmentUPD: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocflowShipmentUPDInput;
    response: models.DocflowFlowDocument;
  };
  /** POST /api/v1/docflow/sale-templates/{id}/past-acts — Выпустить акты за прошедшие периоды шаблона */
  docflowIssueTemplatePastActs: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowTemplatePastActs;
  };
  /** POST /api/v1/docflow/flow/ukd — Выпустить УКД по возврату покупателя */
  docflowIssueUKD: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocflowUKDInput;
    response: models.DocflowFlowDocument;
  };
  /** PUT /api/v1/docflow/messages/{id}/intake/counterparty — Запомнить, с каким контрагентом справочника сведён пакет */
  docflowLinkIntakeCounterparty: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowLinkIntakeCounterpartyRequest;
    response: models.DocflowIntakePreview;
  };
  /** GET /api/v1/docflow/connections — Получить подключения к операторам ЭДО */
  docflowListConnections: {
    params: Record<string, never>;
    query: { "all"?: "1"; "company"?: models.UUID; "provider"?: "saby" | "diadoc" };
    body: never;
    response: models.DocflowConnectionList;
  };
  /** GET /api/v1/docflow/invitations — Получить состояния заявок на обмен */
  docflowListInvitations: {
    params: Record<string, never>;
    query: { "connection"?: models.UUID; "limit"?: number; "offset"?: number };
    body: never;
    response: models.DocflowInvitationPage;
  };
  /** GET /api/v1/docflow/messages — Получить пакеты документов оператора */
  docflowListMessages: {
    params: Record<string, never>;
    query: { "actions_due"?: "1"; "company"?: models.UUID; "connection"?: models.UUID; "contact"?: models.UUID; "counterparty_inn"?: string; "date_from"?: string; "date_to"?: string; "direction"?: "incoming" | "outgoing"; "limit"?: number; "offset"?: number; "state_category"?: models.DocflowStateCategory; "state_code"?: string };
    body: never;
    response: models.DocflowMessageList;
  };
  /** GET /api/v1/docflow/outgoing — Получить собранные титулы */
  docflowListTitles: {
    params: Record<string, never>;
    query: { "document"?: models.UUID; "kind"?: "seller" | "buyer"; "message"?: models.UUID };
    body: never;
    response: models.DocflowTitleList;
  };
  /** POST /api/v1/docflow/connections/{id}/participants/lookup — Найти ящик контрагента у оператора */
  docflowLookupParticipant: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowLookupParticipantRequest;
    response: models.DocflowLookupParticipantResponse;
  };
  /** GET /api/v1/docflow/mail-messages/{id}/papers — Разобрать входящее письмо по бумагам */
  docflowMailPapers: {
    params: { "id": models.UUID };
    query: { "company_id"?: models.UUID; "contact_id"?: models.UUID };
    body: never;
    response: models.DocflowMailPapers;
  };
  /** POST /api/v1/docflow/gov/documents/{id}/answered — Отметить «ответ дан» */
  docflowMarkGovAnswered: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowGovDocument;
  };
  /** POST /api/v1/docflow/messages/{id}/viewed — Отметить, что сотрудник открыл пакет */
  docflowMarkMessageViewed: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/docflow/flow/assignments — Получить мои поручения по документам */
  docflowMyFlowAssignments: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.DocflowFlowMyAssignments;
  };
  /** GET /api/v1/docflow/messages/{id}/papers — Разобрать входящий пакет по файлам */
  docflowPackagePapers: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowPackagePapers;
  };
  /** GET /api/v1/docflow/payment-requests/basis-balances — Узнать остаток бумаг к заявке на оплату */
  docflowPaymentBasisBalances: {
    params: Record<string, never>;
    query: { "basis": Array<string>; "company_id"?: models.UUID; "contact_id"?: models.UUID; "currency"?: string; "except"?: models.UUID };
    body: never;
    response: models.DocflowPaymentBasisBalanceList;
  };
  /** GET /api/v1/docflow/payment-requests/budget-limits — Получить отчёт по лимитам бюджета */
  docflowPaymentBudgetLimits: {
    params: Record<string, never>;
    query: { "company_id": models.UUID; "month": string };
    body: never;
    response: models.DocflowPaymentBudgetLimits;
  };
  /** GET /api/v1/docflow/messages/{id}/payment-details — Прочитать платёжные реквизиты входящего счёта */
  docflowPaymentDetails: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowPaymentDetails;
  };
  /** GET /api/v1/docflow/payment-requests/{id} — Получить заявку на оплату */
  docflowPaymentRequest: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowPaymentRequest;
  };
  /** GET /api/v1/docflow/payment-requests/route-preview — Предварительно определить путь заявки на оплату */
  docflowPaymentRequestRoutePreview: {
    params: Record<string, never>;
    query: { "amount"?: string; "company_id"?: models.UUID; "contact_id"?: models.UUID; "currency"?: string; "department_id"?: models.UUID; "item_id"?: models.UUID };
    body: never;
    response: models.DocflowPaymentRequestRoutePreview;
  };
  /** GET /api/v1/docflow/payment-request-schedules/{id} — Получить регулярную заявку на оплату */
  docflowPaymentRequestSchedule: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowPaymentRequestSchedule;
  };
  /** GET /api/v1/docflow/payment-request-schedules — Получить регулярные заявки на оплату */
  docflowPaymentRequestSchedules: {
    params: Record<string, never>;
    query: { "scope"?: "mine" | "all" };
    body: never;
    response: models.DocflowPaymentRequestScheduleList;
  };
  /** GET /api/v1/docflow/payment-requests/suggest — Подсказать статью и разрезы заявки на оплату по основанию */
  docflowPaymentRequestSuggest: {
    params: Record<string, never>;
    query: { "basis_contract_id"?: models.UUID; "basis_id"?: models.UUID; "basis_kind"?: "edo_message" | "flow_document" | "manual" | "order" | "document"; "basis_module"?: "docflow" | "core"; "company_id"?: models.UUID; "contact_id"?: models.UUID; "payee_inn"?: string; "payee_name"?: string };
    body: never;
    response: models.DocflowPaymentRequestSuggestion;
  };
  /** GET /api/v1/docflow/payment-requests — Получить заявки на оплату */
  docflowPaymentRequests: {
    params: Record<string, never>;
    query: { "contact_id"?: models.UUID; "scope"?: "mine" | "all"; "status"?: models.DocflowPaymentRequestStatus };
    body: never;
    response: models.DocflowPaymentRequestList;
  };
  /** POST /api/v1/docflow/messages/{id}/buyer-title/preflight — Проверить ответный титул покупателя */
  docflowPreflightBuyerTitle: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowBuyerTitleInput;
    response: models.DocflowPreflight;
  };
  /** POST /api/v1/docflow/flow/documents/{id}/fns/preflight — Проверить XML бумаги в формате ФНС до отправки */
  docflowPreflightFlowFNS: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowFlowFNSInput;
    response: models.DocflowPreflight;
  };
  /** POST /api/v1/docflow/outgoing/preflight — Проверить учётный документ до отправки */
  docflowPreflightOutgoing: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocflowOutgoingInput;
    response: models.DocflowPreflight;
  };
  /** POST /api/v1/docflow/messages/{id}/actions/preview — Последствие действия этапа */
  docflowPreviewMessageAction: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowMessageActionInput;
    response: models.DocflowPreviewMessageActionResponse;
  };
  /** GET /api/v1/docflow/payment-requests/{id}/payee-refresh — Показать, что поменяет обновление получателя из контрагента */
  docflowPreviewPaymentRequestPayeeRefresh: {
    params: { "id": models.UUID };
    query: { "account_id"?: models.UUID };
    body: never;
    response: models.DocflowPaymentRequestPayeeRefresh;
  };
  /** GET /api/v1/docflow/approvals/purchase-queue — Получить согласованные заявки, ждущие закупки */
  docflowPurchaseRequestQueue: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.DocflowApprovalInboxPage;
  };
  /** POST /api/v1/docflow/payment-requests/{id}/recall — Вернуть заявку на оплату в черновик */
  docflowRecallPaymentRequest: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowPaymentRequestVersion;
    response: models.DocflowPaymentRequest;
  };
  /** POST /api/v1/docflow/payment-requests/recognize — Распознать счёт для заявки на оплату */
  docflowRecognizePaymentInvoice: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocflowPaymentInvoiceDocument;
    response: models.DocflowPaymentDetails;
  };
  /** POST /api/v1/docflow/messages/{id}/refresh — Перечитать карточку пакета у оператора */
  docflowRefreshMessage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowRefreshMessageResponse;
  };
  /** POST /api/v1/docflow/payment-requests/{id}/payee-refresh — Обновить получателя заявки на оплату из контрагента */
  docflowRefreshPaymentRequestPayee: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowPaymentRequestPayeeRefreshInput;
    response: models.DocflowPaymentRequest;
  };
  /** POST /api/v1/docflow/messages/{id}/cancellation/reject — Отказать в аннулировании */
  docflowRejectCancellation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowCancellationInput;
    response: models.DocflowActionResult;
  };
  /** POST /api/v1/docflow/messages/{id}/actions/reject — Отклонить документ */
  docflowRejectMessage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowMessageActionInput;
    response: models.DocflowActionResult;
  };
  /** POST /api/v1/docflow/messages/{id}/cancellation — Предложить аннулирование */
  docflowRequestCancellation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowCancellationInput;
    response: models.DocflowActionResult;
  };
  /** DELETE /api/v1/docflow/contacts/{id}/paper-settings — Сбросить настройку артикула покупателя к настройке канала */
  docflowResetContactPaperSettings: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowContactPaperSettings;
  };
  /** POST /api/v1/docflow/messages/{id}/restore — Вернуть пакет из корзины */
  docflowRestoreMessage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/docflow/approvals/{id}/resubmit — Отправить предмет повторно после доработки */
  docflowResubmitApproval: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowApprovalResubmitInput;
    response: models.DocflowApproval;
  };
  /** GET /api/v1/docflow/flow/ukd — Получить УКД по возврату покупателя */
  docflowReturnUKD: {
    params: Record<string, never>;
    query: { "return_id": models.UUID };
    body: never;
    response: models.DocflowUKDState;
  };
  /** POST /api/v1/docflow/payment-requests/{id}/rework — Вернуть согласованную заявку на оплату на доработку */
  docflowReworkPaymentRequest: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowPaymentRequestReworkInput;
    response: models.DocflowPaymentRequest;
  };
  /** GET /api/v1/docflow/sales/{id}/set — Получить комплект документов продажи */
  docflowSaleDocumentSet: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowOrderDocumentSet;
  };
  /** POST /api/v1/docflow/flow/documents/{id}/sales-act-relink — Вернуть реализацию продажи на прежний акт */
  docflowSalesActRelink: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowSalesActRelinkInput;
    response: models.DocflowFlowDocument;
  };
  /** PUT /api/v1/docflow/approval-policies — Объявить согласование обязательным для вида предмета */
  docflowSaveApprovalPolicy: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocflowApprovalPolicyInput;
    response: void;
  };
  /** PUT /api/v1/docflow/approval-routes/{id} — Сохранить маршрут согласования */
  docflowSaveApprovalRoute: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowApprovalRouteInput;
    response: models.DocflowApprovalRoute;
  };
  /** POST /api/v1/docflow/approval-substitutions — Завести или изменить замещение согласующего */
  docflowSaveApprovalSubstitution: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocflowApprovalSubstitutionInput;
    response: models.DocflowApprovalSubstitution;
  };
  /** PUT /api/v1/docflow/contacts/{id}/paper-settings — Изменить настройку артикула в документах покупателя */
  docflowSaveContactPaperSettings: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowContactPaperSettingInput;
    response: models.DocflowContactPaperSettings;
  };
  /** POST /api/v1/docflow/messages/{id}/buyer-title — Собрать ответный титул покупателя для подписи */
  docflowSendBuyerTitle: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowBuyerTitleInput;
    response: models.DocflowTitle;
  };
  /** POST /api/v1/docflow/flow/documents/{id}/fns/send — Отправить бумагу по ЭДО в формате ФНС */
  docflowSendFlowFNS: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowFlowFNSInput;
    response: models.DocflowFlowFNSSent;
  };
  /** POST /api/v1/docflow/outgoing — Собрать титул продавца и записать его оператору */
  docflowSendOutgoing: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocflowOutgoingInput;
    response: models.DocflowTitle;
  };
  /** POST /api/v1/docflow/approval-routes/{id}/active — Включить или выключить маршрут согласования */
  docflowSetApprovalRouteActive: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowApprovalRouteActiveInput;
    response: void;
  };
  /** PUT /api/v1/docflow/connections/{id}/mode — Выбрать режим подключения — только чтение, черновики в ЭДО или запись */
  docflowSetConnectionMode: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowConnectionModeInput;
    response: models.DocflowConnection;
  };
  /** POST /api/v1/docflow/payment-request-schedules/{id}/status — Приостановить, возобновить или остановить регулярную заявку */
  docflowSetPaymentRequestScheduleStatus: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowPaymentRequestScheduleStatusInput;
    response: models.DocflowPaymentRequestSchedule;
  };
  /** POST /api/v1/docflow/approvals — Отправить предмет на согласование */
  docflowSubmitApproval: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DocflowApprovalSubmitInput;
    response: models.DocflowApproval;
  };
  /** POST /api/v1/docflow/payment-requests/{id}/submit — Отправить заявку на оплату на согласование */
  docflowSubmitPaymentRequest: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowPaymentRequestVersion;
    response: models.DocflowPaymentRequest;
  };
  /** POST /api/v1/docflow/payment-requests/{id}/submit-over-budget — Отправить заявку на оплату сверх лимита бюджета */
  docflowSubmitPaymentRequestOverBudget: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowPaymentRequestVersion;
    response: models.DocflowPaymentRequest;
  };
  /** POST /api/v1/docflow/connections/{id}/sync — Перечитать ленту оператора по требованию */
  docflowSyncConnection: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowSyncOutcome;
  };
  /** GET /api/v1/docflow/sale-templates/{id}/past-acts — Акты за прошедшие периоды шаблона — предпросмотр */
  docflowTemplatePastActs: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowTemplatePastActs;
  };
  /** POST /api/v1/docflow/messages/{id}/trash — Убрать пакет в корзину */
  docflowTrashMessage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/docflow/gov/documents/{id}/answered — Снять отметку «ответ дан» */
  docflowUnmarkGovAnswered: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DocflowGovDocument;
  };
  /** PATCH /api/v1/docflow/connections/{id} — Изменить подключение */
  docflowUpdateConnection: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowConnectionPatch;
    response: models.DocflowConnection;
  };
  /** PUT /api/v1/docflow/payment-requests/{id} — Изменить заявку на оплату */
  docflowUpdatePaymentRequest: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowPaymentRequestUpdate;
    response: models.DocflowPaymentRequest;
  };
  /** PUT /api/v1/docflow/payment-request-schedules/{id} — Изменить регулярную заявку на оплату */
  docflowUpdatePaymentRequestSchedule: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.DocflowPaymentRequestScheduleUpdate;
    response: models.DocflowPaymentRequestSchedule;
  };
  /** GET /api/v1/docflow/yandex-kit/handover — Заказы Яндекс KIT к передаче курьеру */
  docflowYandexKitHandover: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.DocflowYandexKitHandover;
  };
  /** POST /api/v1/docflow/yandex-kit/handover/{service}/shipped — Отгружено курьеру службы доставки Яндекс KIT */
  docflowYandexKitMarkShipped: {
    params: { "service": string };
    query: Record<string, never>;
    body: never;
    response: models.DocflowYandexKitShippedResult;
  };
  /** GET /api/v1/docflow/yandex-kit/orders — Заказы сайта Яндекс KIT */
  docflowYandexKitOrders: {
    params: Record<string, never>;
    query: { "attention"?: "1"; "limit"?: number; "order_id"?: models.UUID };
    body: never;
    response: models.DocflowYandexKitOrderList;
  };
  /** GET /api/v1/docflow/yandex-kit/state — Итог последнего опроса Яндекс KIT */
  docflowYandexKitState: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.DocflowYandexKitStateEnvelope;
  };
  /** POST /api/v1/docflow/yandex-kit/sync — Опросить Яндекс KIT сейчас */
  docflowYandexKitSync: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.DocflowYandexKitStateEnvelope;
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
  /** POST /api/v1/files/roots — Создать хранилище */
  filesCreateRoot: {
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
  /** GET /api/v1/files/items/{id}/content — Скачать файл */
  filesDownloadFile: {
    params: { "id": models.UUID };
    query: { "inline"?: boolean };
    body: never;
    response: void;
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
  /** GET /api/v1/files/shares — Получить внешние ссылки цели */
  filesListShares: {
    params: Record<string, never>;
    query: { "file_id"?: models.UUID; "folder_id"?: models.UUID };
    body: never;
    response: models.FilesListSharesResponse;
  };
  /** GET /api/v1/files/items/{id}/versions — История версий файла */
  filesListVersions: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FilesListVersionsResponse;
  };
  /** PUT /api/v1/files/folders/{id}/access — Переписать состав участников папки */
  filesReplaceFolderAccess: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FilesAccessInput;
    response: models.FilesAccessPolicy;
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
  /** POST /api/v1/finance/fixed-assets/{id}/acceptance — Принять основное средство к учёту со счёта 08 */
  financeAcceptFixedAsset: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceFixedAssetAcceptanceInput;
    response: models.CoreDocument;
  };
  /** POST /api/v1/finance/statement-mailboxes/{id}/mails/{mailId}/accept — Принять письмо выписки из карантина */
  financeAcceptStatementMail: {
    params: { "id": models.UUID; "mailId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceStatementMail;
  };
  /** GET /api/v1/finance/accountable/balances — Получить остатки подотчётных лиц */
  financeAccountableBalances: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "on"?: string };
    body: never;
    response: models.FinanceAccountableBalances;
  };
  /** POST /api/v1/finance/budgets/submissions — Сдать, принять или вернуть бюджет подразделения */
  financeActBudgetSubmission: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceBudgetSubmissionInput;
    response: models.FinanceBudgetSubmissions;
  };
  /** POST /api/v1/finance/settlements/allocation-rules — Добавить версию правила авторазнесения */
  financeAddAllocationRule: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceAllocationRuleInput;
    response: models.FinanceAllocationRule;
  };
  /** POST /api/v1/finance/payment-registries/{id}/lines — Добавить заявку в реестр платежей */
  financeAddPaymentRegistryLine: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinancePaymentRegistryLineInput;
    response: models.FinancePaymentRegistryView;
  };
  /** POST /api/v1/finance/taxes/settings/recipients — Взять получателя ЕНС образцом с платежа */
  financeAddTaxRecipientFromPayment: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceTaxRecipientFromPaymentInput;
    response: models.FinanceTaxSettings;
  };
  /** POST /api/v1/finance/connectors/accounts/{accountId}/adopt — Создать счёт Akeda из внешнего банковского счёта */
  financeAdoptConnectorAccount: {
    params: { "accountId": models.UUID };
    query: Record<string, never>;
    body: models.FinanceConnectorAccountAdopt;
    response: models.FinanceConnectorAccount;
  };
  /** POST /api/v1/finance/settlements/unapplied/apply-rules — Разнести очередь по правилу авторазнесения */
  financeApplyAllocationRules: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceAllocationRuleRunInput;
    response: models.FinanceAllocationRuleRun;
  };
  /** POST /api/v1/finance/budgets/drivers/apply — Рассчитать бюджет по драйверам */
  financeApplyBudgetDrivers: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceBudgetDriversApplyInput;
    response: models.FinanceBudgetDriversApplied;
  };
  /** POST /api/v1/finance/budgets/payroll-model — Рассчитать ФОТ по штатному расписанию */
  financeApplyBudgetPayrollModel: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceBudgetPayrollModelInput;
    response: models.FinanceBudgetDriversApplied;
  };
  /** POST /api/v1/finance/cashflow-layouts/template — Собрать макет отчёта о движении денег по шаблону */
  financeApplyCashflowTemplate: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.FinancePnlLayout;
  };
  /** POST /api/v1/finance/exchange/items/{id}/apply — Связать элемент обмена с каноническим документом Akeda */
  financeApplyExchangeItem: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceExchangeApply;
    response: models.FinanceExchangeItem;
  };
  /** POST /api/v1/finance/imports/{id}/apply — Применить проверенный импорт */
  financeApplyImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceImportApply;
    response: models.FinanceImportRun;
  };
  /** POST /api/v1/finance/settlements/refunds — Свести приход с возвратами */
  financeApplyRefundSettlement: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceRefundSettlementInput;
    response: models.FinanceRefundSettlementResult;
  };
  /** POST /api/v1/finance/budgets/versions/{id}/approve — Утвердить версию бюджета */
  financeApproveBudgetVersion: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceBudget;
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
  /** POST /api/v1/finance/payment-registries/{id}/approve — Утвердить реестр платежей */
  financeApprovePaymentRegistry: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinancePaymentRegistryVersion;
    response: models.FinancePaymentRegistryView;
  };
  /** POST /api/v1/finance/payroll/payout-months/legacy — Назначить месяцы старым выплатам зарплаты */
  financeAssignLegacyPayrollMonths: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinancePayrollLegacyMonthsRequest;
    response: models.FinancePayrollLegacyMonthsResult;
  };
  /** POST /api/v1/finance/payment-requests/{id}/fact — Привязать платежи к заявке на оплату */
  financeAttachPaymentRequestFacts: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinancePaymentRequestAttachInput;
    response: models.FinancePaymentRequest;
  };
  /** POST /api/v1/finance/payment-requests/{id}/receipt-cost — Отнести заявку на оплату на приёмку */
  financeAttachPaymentRequestToReceipts: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockReceiptCostCreate;
    response: models.FinanceReceiptCostAttachResult;
  };
  /** POST /api/v1/finance/settlements/payments/{id}/receipt-cost — Отнести платёж на приёмку */
  financeAttachPaymentToReceipts: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockReceiptCostCreate;
    response: models.FinanceReceiptCostAttachResult;
  };
  /** POST /api/v1/finance/registers/cashflow-base-backfill — Догнать сумму в валюте учёта в регистре ДДС перепроведением */
  financeBackfillCashflowBase: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceCashflowBaseBackfillRequest;
    response: models.FinanceCashflowBaseBackfillResult;
  };
  /** POST /api/v1/finance/registers/sales-backfill — Догнать регистр продаж перепроведением */
  financeBackfillSalesRegister: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceSalesBackfillRequest;
    response: models.FinanceSalesBackfillResult;
  };
  /** GET /api/v1/finance/staffing/bonus-report-lines — Получить строки отчёта для базы премии */
  financeBonusReportLines: {
    params: Record<string, never>;
    query: { "layout"?: models.UUID; "report": "pnl" | "cashflow" };
    body: never;
    response: models.FinanceBonusReportLineList;
  };
  /** GET /api/v1/finance/staffing/bonus-schemes — Получить правила премирования */
  financeBonusSchemes: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.FinanceBonusSchemeList;
  };
  /** GET /api/v1/finance/budgets — Получить бюджет месяца */
  financeBudget: {
    params: Record<string, never>;
    query: { "company_id": models.UUID; "kind"?: "cashflow" | "pnl"; "month": string };
    body: never;
    response: models.FinanceBudget;
  };
  /** GET /api/v1/finance/budgets/balance — Получить прогнозный баланс */
  financeBudgetBalance: {
    params: Record<string, never>;
    query: { "company_id": models.UUID; "month": string };
    body: never;
    response: models.FinanceBudgetBalance;
  };
  /** GET /api/v1/finance/budgets/bridge — Получить связку БДР и БДДС */
  financeBudgetBridge: {
    params: Record<string, never>;
    query: { "company_id": models.UUID; "month": string };
    body: never;
    response: models.FinanceBudgetBridge;
  };
  /** POST /api/v1/finance/budgets/cashflow-from-pnl — Построить БДДС из БДР */
  financeBudgetCashflowFromPnl: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceBudgetCashflowFromPnlInput;
    response: models.FinanceBudgetCashflowFromPnl;
  };
  /** GET /api/v1/finance/budgets/drivers — Получить драйверы бюджета */
  financeBudgetDrivers: {
    params: Record<string, never>;
    query: { "company_id": models.UUID };
    body: never;
    response: models.FinanceBudgetDrivers;
  };
  /** GET /api/v1/finance/budgets/forecast — Получить скользящий прогноз денег */
  financeBudgetForecast: {
    params: Record<string, never>;
    query: { "company_id": models.UUID; "from": string; "horizon"?: number; "payments_pct"?: string; "receipts_delay"?: number; "receipts_pct"?: string };
    body: never;
    response: models.FinanceBudgetForecast;
  };
  /** GET /api/v1/finance/budgets/group — Получить консолидированный бюджет группы */
  financeBudgetGroup: {
    params: Record<string, never>;
    query: { "kind"?: "cashflow" | "pnl"; "month": string };
    body: never;
    response: models.FinanceBudgetGroup;
  };
  /** GET /api/v1/finance/budgets/history — Получить прогноз по истории факта и аномалии */
  financeBudgetHistory: {
    params: Record<string, never>;
    query: { "company_id": models.UUID; "kind"?: "cashflow" | "pnl"; "month": string };
    body: never;
    response: models.FinanceBudgetHistory;
  };
  /** GET /api/v1/finance/budgets/payment-terms — Получить сроки оплаты статей */
  financeBudgetPaymentTerms: {
    params: Record<string, never>;
    query: { "company_id": models.UUID };
    body: never;
    response: models.FinanceBudgetPaymentTerms;
  };
  /** GET /api/v1/finance/budgets/plan-fact — Получить план-факт бюджета */
  financeBudgetPlanFact: {
    params: Record<string, never>;
    query: { "company_id": models.UUID; "kind"?: "cashflow" | "pnl"; "month": string };
    body: never;
    response: models.FinanceBudgetPlanFact;
  };
  /** GET /api/v1/finance/budgets/reservations — Получить резервы лимита */
  financeBudgetReservations: {
    params: Record<string, never>;
    query: { "company_id": models.UUID; "month": string };
    body: never;
    response: models.FinanceBudgetReservations;
  };
  /** GET /api/v1/finance/budgets/settings — Получить настройки бюджета */
  financeBudgetSetting: {
    params: Record<string, never>;
    query: { "company_id": models.UUID };
    body: never;
    response: models.FinanceBudgetSetting;
  };
  /** GET /api/v1/finance/budgets/submissions — Получить бюджетный процесс по подразделениям */
  financeBudgetSubmissions: {
    params: Record<string, never>;
    query: { "company_id": models.UUID; "kind"?: "cashflow" | "pnl"; "month": string };
    body: never;
    response: models.FinanceBudgetSubmissions;
  };
  /** GET /api/v1/finance/budgets/versions/{id} — Получить версию бюджета */
  financeBudgetVersion: {
    params: { "id": models.UUID };
    query: { "month"?: string };
    body: never;
    response: models.FinanceBudget;
  };
  /** GET /api/v1/finance/budgets/versions — Получить версии бюджета */
  financeBudgetVersions: {
    params: Record<string, never>;
    query: { "company_id": models.UUID; "kind"?: "cashflow" | "pnl"; "month": string };
    body: never;
    response: models.FinanceBudgetVersions;
  };
  /** POST /api/v1/finance/cash-operations/{id}/cancel — Отменить кассовую операцию */
  financeCancelCashOperation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: { [key: string]: unknown };
  };
  /** POST /api/v1/finance/accountable/reports/{id}/cancel — Отменить проведение авансового отчёта */
  financeCancelExpenseReport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** POST /api/v1/finance/fixed-assets/depreciation/cancel — Отменить начисление амортизации за месяц */
  financeCancelFixedAssetDepreciation: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceFixedAssetMonthInput;
    response: models.CoreDocument;
  };
  /** POST /api/v1/finance/operations/{id}/cancel — Отменить текущий документ операции */
  financeCancelOperation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceOperationAction;
    response: models.FinanceOperation;
  };
  /** POST /api/v1/finance/payment-calendar/plans/{id}/cancel — Отменить ручную плановую строку */
  financeCancelPaymentPlan: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinancePaymentPlan;
  };
  /** POST /api/v1/finance/payment-registries/{id}/cancel — Отменить реестр платежей */
  financeCancelPaymentRegistry: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinancePaymentRegistryVersion;
    response: models.FinancePaymentRegistry;
  };
  /** POST /api/v1/finance/payroll/documents/{id}/cancel — Отменить проведение зарплатного документа */
  financeCancelPayrollDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** POST /api/v1/finance/payroll/month-close/{id}/cancel — Снять отметку о завершении расчёта зарплаты */
  financeCancelPayrollMonthClose: {
    params: { "id": string };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
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
  /** POST /api/v1/finance/vat-quarters/{id}/cancel — Отменить проведение «НДС за квартал» */
  financeCancelVATQuarter: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceVATQuarter;
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
  /** POST /api/v1/finance/trade/acts/{id}/pnl-item — Сменить статью доходов и расходов у проведённого акта */
  financeChangeActPnlItem: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceChangeActPnlItemRequest;
    response: { [key: string]: unknown };
  };
  /** POST /api/v1/finance/connectors/{id}/accounts/{accountId}/check-statement — Проверить доступность выписки без записи в ERP */
  financeCheckConnectorStatement: {
    params: { "accountId": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceConnectorStatementCheck;
  };
  /** POST /api/v1/finance/exchange/onec/connections/{id}/check — Проверить доступ к базе 1С */
  financeCheckOneCConnection: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceOneCConnection;
  };
  /** GET /api/v1/finance/classification-suggestions — Прочитать рекомендации расширений */
  financeClassificationSuggestions: {
    params: Record<string, never>;
    query: { "limit"?: number; "offset"?: number; "status"?: "pending" | "accepted" | "rejected"; "transaction"?: models.UUID };
    body: never;
    response: Array<models.FinanceClassificationSuggestion>;
  };
  /** POST /api/v1/finance/settlements/closing-awaited/close-expense-batch — Закрыть авансы поставщикам расходом */
  financeCloseAdvancesToExpense: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceCloseAdvancesToExpenseInput;
    response: models.FinanceCloseAdvancesToExpenseResult;
  };
  /** POST /api/v1/finance/payment-requests/{id}/close-short — Закрыть заявку на оплату без остатка */
  financeClosePaymentRequestShort: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinancePaymentRequestReasonInput;
    response: models.FinancePaymentRequest;
  };
  /** GET /api/v1/finance/budgets/versions/compare — Сравнить версии бюджета */
  financeCompareBudgetVersions: {
    params: Record<string, never>;
    query: { "base": models.UUID; "target": models.UUID };
    body: never;
    response: models.FinanceBudgetCompare;
  };
  /** POST /api/v1/finance/payment-requests/{id}/confirm-payee — Подтвердить новые реквизиты получателя заявки */
  financeConfirmPaymentRequestPayee: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceConfirmPaymentRequestPayeeRequest;
    response: models.FinancePaymentRequest;
  };
  /** POST /api/v1/finance/vat-quarters/{id}/correct — Исправить проведённый «НДС за квартал» по цифрам 1С */
  financeCorrectVATQuarter: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceVATQuarterCorrectionInput;
    response: models.FinanceVATQuarterCorrectionResult;
  };
  /** POST /api/v1/finance/accounts — Создать банковский счёт */
  financeCreateAccount: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceAccountCreate;
    response: models.FinanceAccount;
  };
  /** POST /api/v1/finance/staffing/bonus-schemes — Завести правило премирования */
  financeCreateBonusScheme: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceBonusSchemeInput;
    response: models.FinanceBonusScheme;
  };
  /** POST /api/v1/finance/budgets/reservations — Зарезервировать лимит */
  financeCreateBudgetReservation: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceBudgetReservationInput;
    response: models.FinanceBudgetReservation;
  };
  /** POST /api/v1/finance/cash-operations — Записать трату или приход в кассе */
  financeCreateCashOperation: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceCashOperationCreate;
    response: models.FinanceCashOperation;
  };
  /** POST /api/v1/finance/connectors — Создать подключение к банку */
  financeCreateConnector: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceConnectorCreate;
    response: models.FinanceConnector;
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
  /** POST /api/v1/finance/fixed-assets — Создать карточку основного средства */
  financeCreateFixedAsset: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceFixedAssetInput;
    response: models.FinanceFixedAsset;
  };
  /** POST /api/v1/finance/exchange/onec/connections — Подключить базу 1С юрлица */
  financeCreateOneCConnection: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceOneCConnectionInput;
    response: models.FinanceOneCConnection;
  };
  /** POST /api/v1/finance/opening-debts/{id}/advance-vat — Дописать НДС к авансу начальных остатков */
  financeCreateOpeningAdvanceVAT: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceOpeningAdvanceVATRequest;
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
  /** POST /api/v1/finance/payroll/documents — Создать зарплатный документ */
  financeCreatePayrollDocument: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinancePayrollDocumentCreate;
    response: models.CoreDocument;
  };
  /** POST /api/v1/finance/pnl-layouts — Создать пустой макет ОПиУ */
  financeCreatePnlLayout: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinancePnlLayoutCreate;
    response: models.FinancePnlLayout;
  };
  /** POST /api/v1/finance/settlements/documents — Создать типизированный документ взаиморасчётов */
  financeCreateSettlementDocument: {
    params: Record<string, never>;
    query: { "business"?: models.UUID };
    body: models.FinanceSettlementDocumentCreate;
    response: models.CoreDocument;
  };
  /** POST /api/v1/finance/staffing/positions — Завести штатную позицию */
  financeCreateStaffPosition: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceStaffPositionInput;
    response: models.FinanceStaffPosition;
  };
  /** POST /api/v1/finance/staffing/orders — Провести приказ расстановки штата */
  financeCreateStaffingOrder: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceStaffingOrderCreate;
    response: models.FinanceStaffingOrderResult;
  };
  /** POST /api/v1/finance/statements — Создать заголовок выписки вручную */
  financeCreateStatement: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceStatementCreate;
    response: models.FinanceStatement;
  };
  /** POST /api/v1/finance/statement-mailboxes — Подключить выписку банка по почте */
  financeCreateStatementMailbox: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceStatementMailboxCreate;
    response: models.FinanceStatementMailbox;
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
  /** POST /api/v1/finance/vat-quarters — Сохранить черновик «НДС за квартал» */
  financeCreateVATQuarter: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceVATQuarterInput;
    response: models.FinanceVATQuarter;
  };
  /** GET /api/v1/finance/settlements/obligations/{id}/write-off — Остаток долга и статьи для списания */
  financeDebtWriteOffOptions: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceDebtWriteOffOptions;
  };
  /** DELETE /api/v1/finance/accounts/{id} — Удалить банковский счёт без операций */
  financeDeleteAccount: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/finance/accounts/{id}/statements/{statementId} — Удалить выписку счёта */
  financeDeleteAccountStatement: {
    params: { "id": models.UUID; "statementId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/finance/acquirers/{id} — Снять выбор эквайера */
  financeDeleteAcquirer: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/finance/connectors/{id} — Удалить ошибочное подключение к банку */
  financeDeleteConnector: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/finance/exchange/onec/connections/{id} — Отключить базу 1С */
  financeDeleteOneCConnection: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/finance/pnl-layouts/{id} — Удалить макет ОПиУ */
  financeDeletePnlLayout: {
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
  /** POST /api/v1/finance/staffing/dismissals — Уволить сотрудника приказом по штатной позиции */
  financeDismissEmployee: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceStaffingDismissalCreate;
    response: models.FinanceStaffingDismissalResult;
  };
  /** POST /api/v1/finance/fixed-assets/{id}/disposal — Провести выбытие основного средства */
  financeDisposeFixedAsset: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceFixedAssetDisposalInput;
    response: models.CoreDocument;
  };
  /** POST /api/v1/finance/payment-calendar/plans/{id}/execute — Связать план с фактической денежной операцией */
  financeExecutePaymentPlan: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinancePaymentPlanExecute;
    response: models.FinancePaymentPlan;
  };
  /** GET /api/v1/finance/accountable/reports — Получить авансовые отчёты */
  financeExpenseReports: {
    params: Record<string, never>;
    query: { "limit"?: number; "offset"?: number };
    body: never;
    response: models.FinanceExpenseReportPage;
  };
  /** GET /api/v1/finance/fixed-assets — Получить основные средства */
  financeFixedAssets: {
    params: Record<string, never>;
    query: { "company"?: models.UUID; "include_archived"?: boolean };
    body: never;
    response: models.FinanceFixedAssetList;
  };
  /** GET /api/v1/finance/accounts/{id} — Получить карточку банковского счёта */
  financeGetAccount: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceAccount;
  };
  /** GET /api/v1/finance/accounts/{id}/reconciliation — Разобрать расхождение остатка счёта с банком */
  financeGetAccountReconciliation: {
    params: { "id": models.UUID };
    query: { "to"?: string };
    body: never;
    response: models.FinanceReconciliationAccount;
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
  /** GET /api/v1/finance/cash-operations/{id}/cancel-consequences — Получить последствия отмены кассовой операции */
  financeGetCashOperationCancelConsequences: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: { [key: string]: unknown };
  };
  /** GET /api/v1/finance/reports/cashflow — Построить отчёт движения денежных средств */
  financeGetCashflowReport: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "columns"?: string; "company"?: string; "currency"?: string; "from"?: string; "layout"?: models.UUID; "parent"?: string; "project"?: string; "source"?: models.UUID; "step"?: "month" | "quarter" | "total"; "to"?: string; "view"?: "full" | "summary" };
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
  /** GET /api/v1/finance/connectors/sync-settings — Получить расписание синхронизации банков */
  financeGetConnectorSyncSettings: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.FinanceConnectorSyncSettings;
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
  /** GET /api/v1/finance/fixed-assets/{id} — Получить карточку основного средства */
  financeGetFixedAsset: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceFixedAsset;
  };
  /** GET /api/v1/finance/imports/{id} — Получить состояние запуска импорта */
  financeGetImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceImportRun;
  };
  /** GET /api/v1/finance/exchange/onec/connections/{id} — Получить подключение базы 1С */
  financeGetOneCConnection: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceOneCConnection;
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
    query: { "business"?: models.UUID; "company"?: string; "currency"?: string; "from"?: string; "project"?: string; "step"?: "day" | "month" | "quarter"; "to"?: string; "view"?: "full" | "summary" };
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
  /** GET /api/v1/finance/reports/payroll — Построить журнал заработной платы за период */
  financeGetPayrollJournal: {
    params: Record<string, never>;
    query: { "cfo"?: models.UUID; "company"?: models.UUID; "department"?: models.UUID; "employee"?: models.UUID; "from"?: string; "project"?: models.UUID; "to"?: string };
    body: never;
    response: models.FinancePayrollJournal;
  };
  /** GET /api/v1/finance/reports/payroll/payments — Расшифровать выплаты сотруднику за период */
  financeGetPayrollPayments: {
    params: Record<string, never>;
    query: { "company"?: models.UUID; "employee": models.UUID; "from"?: string; "to"?: string };
    body: never;
    response: models.FinancePayrollPayments;
  };
  /** GET /api/v1/finance/period-checks — Получить проверки перед закрытием периода */
  financeGetPeriodCloseChecks: {
    params: Record<string, never>;
    query: { "on"?: string };
    body: never;
    response: models.FinancePeriodCheckPage;
  };
  /** GET /api/v1/finance/pnl-layouts/{id} — Получить один макет ОПиУ */
  financeGetPnlLayout: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinancePnlLayout;
  };
  /** GET /api/v1/finance/reports/pnl — Построить отчёт о прибылях и убытках */
  financeGetPnlReport: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "columns"?: string; "company"?: string; "from"?: string; "layout"?: models.UUID; "parent"?: string; "project"?: string; "step"?: "month" | "quarter" | "total"; "to"?: string; "view"?: "full" | "summary" };
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
  /** GET /api/v1/finance/statement-mailboxes/{id} — Получить подключение выписки по почте */
  financeGetStatementMailbox: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceStatementMailbox;
  };
  /** GET /api/v1/finance/taxes/calc — Получить предварительный расчёт налога юрлица по месяцам */
  financeGetTaxCalc: {
    params: Record<string, never>;
    query: { "company_id": models.UUID; "month"?: number; "year": number };
    body: never;
    response: models.FinanceTaxCalcPage;
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
  /** GET /api/v1/finance/trade-journal/advance — Получить свободные авансы контрагента */
  financeGetTradeAdvance: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "company_id"?: models.UUID; "contact_id": models.UUID; "currency": string; "direction": "sales" | "purchases" };
    body: never;
    response: models.FinanceTradeAdvance;
  };
  /** GET /api/v1/finance/trade-journal — Получить журнал продаж или закупок */
  financeGetTradeJournal: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "company_id"?: string; "currency"?: string; "date_from"?: string; "date_to"?: string; "direction": "sales" | "purchases"; "expand"?: boolean; "group"?: "orders" | "without_order" | "executions"; "limit"?: number; "mine"?: boolean; "offset"?: number; "q"?: string; "record_id"?: string; "responsible_id"?: string; "settlement_state"?: "all" | "unaccrued" | "open" | "overdue" | "advance"; "status"?: "draft" | "posted" | "cancelled"; "view"?: "all" | "control" | "due" };
    body: never;
    response: models.FinanceTradeJournalPage;
  };
  /** GET /api/v1/finance/transactions/{id} — Получить банковскую операцию с подсказками сверки */
  financeGetTransaction: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceTransaction;
  };
  /** GET /api/v1/finance/transactions/unallocated — Получить счётчик неразнесённых денег */
  financeGetUnallocatedMoney: {
    params: Record<string, never>;
    query: { "business"?: models.UUID };
    body: never;
    response: models.FinanceUnallocatedSummary;
  };
  /** GET /api/v1/finance/vat-quarters/{id} — Получить документ «НДС за квартал» */
  financeGetVATQuarter: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceVATQuarter;
  };
  /** POST /api/v1/finance/acquiring/registries — Загрузить реестр платежей провайдера */
  financeImportAcquiringRegistry: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceAcquiringRegistryInput;
    response: models.FinanceAcquiringRegistryImport;
  };
  /** POST /api/v1/finance/fixed-assets/import — Загрузить ведомость основных средств */
  financeImportFixedAssets: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceFixedAssetImportInput;
    response: models.FinanceFixedAssetImportResult;
  };
  /** POST /api/v1/finance/imports/{id}/inspect — Прочитать лист и колонки файла импорта */
  financeInspectImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceImportInspect;
    response: models.FinanceImportRun;
  };
  /** POST /api/v1/finance/settlements/payments/{id}/link-order — Посадить оплату на закупку или продажу по оплате */
  financeLinkPaymentToNewOrder: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceLinkPaymentToNewOrderRequest;
    response: { [key: string]: unknown };
  };
  /** POST /api/v1/finance/statements/{id}/transactions — Привязать существующие операции к выписке */
  financeLinkStatementTransactions: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceStatementLinkInput;
    response: models.FinanceStatementLinkResult;
  };
  /** POST /api/v1/finance/transactions/{id}/payment-requests — Привязать строку выписки к заявке на оплату */
  financeLinkTransactionPaymentRequest: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceTransactionPaymentRequestLinkInput;
    response: models.FinancePaymentRequest;
  };
  /** GET /api/v1/finance/accounts/{id}/statements — Получить историю выписок одного счёта */
  financeListAccountStatements: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceStatementPage;
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
  /** GET /api/v1/finance/cash-operations — Прочитать журнал кассы */
  financeListCashOperations: {
    params: Record<string, never>;
    query: { "allocated"?: boolean; "allocation"?: "unallocated"; "business"?: models.UUID; "contact"?: models.UUID; "direction"?: models.FinanceDirection; "employee"?: models.UUID; "from"?: string; "item"?: models.UUID; "limit"?: number; "offset"?: number; "q"?: string; "to"?: string; "wallet"?: models.UUID };
    body: never;
    response: models.FinanceCashOperationPage;
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
    query: { "adapter"?: string; "business"?: models.UUID; "direction"?: "import" | "export"; "external_id"?: string; "limit"?: number; "offset"?: number; "status"?: models.FinanceExchangeStatus };
    body: never;
    response: models.FinanceExchangePage;
  };
  /** GET /api/v1/finance/exchange/onec/connections — Получить подключения баз 1С */
  financeListOneCConnections: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.FinanceOneCConnectionPage;
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
  /** GET /api/v1/finance/pnl-layouts/items — Получить дерево статей ОПиУ для конструктора макета */
  financeListPnlLayoutItems: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.FinancePnlItemPage;
  };
  /** GET /api/v1/finance/pnl-layouts — Получить макеты ОПиУ кабинета */
  financeListPnlLayouts: {
    params: Record<string, never>;
    query: { "report"?: "pnl" | "cashflow" };
    body: never;
    response: models.FinancePnlLayoutPage;
  };
  /** GET /api/v1/finance/settlements/balances — Получить остатки обязательств, доступных пользователю */
  financeListSettlementBalances: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "currency"?: string; "limit"?: number; "offset"?: number };
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
  /** GET /api/v1/finance/statement-mailboxes — Получить подключения выписок по почте */
  financeListStatementMailboxes: {
    params: Record<string, never>;
    query: { "all"?: "1" };
    body: never;
    response: models.FinanceStatementMailboxPage;
  };
  /** GET /api/v1/finance/statement-mailboxes/{id}/mails — Получить журнал писем подключения выписки по почте */
  financeListStatementMails: {
    params: { "id": models.UUID };
    query: { "limit"?: number };
    body: never;
    response: models.FinanceStatementMailPage;
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
  /** GET /api/v1/finance/taxes/payments — Получить платежи по статьям налогов */
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
  /** GET /api/v1/finance/vat-quarters — Получить документы «НДС за квартал» */
  financeListVATQuarters: {
    params: Record<string, never>;
    query: { "company_id"?: models.UUID; "limit"?: number; "offset"?: number };
    body: never;
    response: models.FinanceVATQuarterPage;
  };
  /** GET /api/v1/finance/lookup/company — Сопоставить владельца счёта с юрлицом по ИНН */
  financeLookupCompany: {
    params: Record<string, never>;
    query: { "inn": string };
    body: never;
    response: models.FinanceCompanyMatch;
  };
  /** GET /api/v1/finance/lookup/requisites — Проверить ИНН, БИК и номер счёта */
  financeLookupRequisites: {
    params: Record<string, never>;
    query: { "bic"?: string; "inn"?: string; "number"?: string };
    body: never;
    response: models.FinanceRequisitesLookup;
  };
  /** PATCH /api/v1/finance/imports/{id}/mapping — Сохранить сопоставление колонок файла с полями Akeda */
  financeMapImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceImportMapping;
    response: models.FinanceImportRun;
  };
  /** PATCH /api/v1/finance/imports/{id}/item-mapping — Сохранить соответствие статей файла статьям справочника */
  financeMapImportItems: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceImportItemMappingRequest;
    response: models.FinanceImportRun;
  };
  /** POST /api/v1/finance/payroll/month-close — Отметить расчёт зарплаты за месяц завершённым */
  financeMarkPayrollMonthClosed: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinancePayrollMonthCloseCreate;
    response: models.CoreDocument;
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
  /** POST /api/v1/finance/payroll/parts/netting — Свернуть старые остатки по частям зарплаты */
  financeNetPayrollParts: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinancePayrollPartNettingRequest;
    response: models.FinancePayrollPartNettingList;
  };
  /** POST /api/v1/finance/trade/{id}/advance-offset — Зачесть свободные авансы в долг продажи или закупки */
  financeOffsetTradeAdvances: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceOffsetTradeAdvancesRequest;
    response: { [key: string]: unknown };
  };
  /** GET /api/v1/finance/exchange/onec/connections/{id}/bank-reconciliation — Сверить банк с базой 1С */
  financeOneCBankReconciliation: {
    params: { "id": models.UUID };
    query: { "date_from": string; "date_to": string; "matched"?: boolean };
    body: never;
    response: models.FinanceOneCBankReconciliation;
  };
  /** GET /api/v1/finance/exchange/onec/connections/{id}/mappings — Получить сопоставления подключения 1С */
  financeOneCMappings: {
    params: { "id": models.UUID };
    query: { "kind"?: "nomenclature" | "cashflow" };
    body: never;
    response: models.FinanceOneCMappingsResponse;
  };
  /** GET /api/v1/finance/exchange/onec/payroll-registry — Получить состав зарплатного реестра из 1С */
  financeOneCPayrollRegistry: {
    params: Record<string, never>;
    query: { "amount"?: string; "company_id": models.UUID; "date"?: string; "ref"?: string; "registry_number"?: string; "window"?: number };
    body: never;
    response: models.FinanceOneCPayrollRegistry;
  };
  /** GET /api/v1/finance/exchange/onec/connections/{id}/purchase-reconciliation — Сверить закупки с базой 1С */
  financeOneCPurchaseReconciliation: {
    params: { "id": models.UUID };
    query: { "date_from": string; "date_to": string; "matched"?: boolean };
    body: never;
    response: models.FinanceOneCPurchaseReconciliation;
  };
  /** POST /api/v1/finance/payment-requests/{id}/pay-remainder — Поставить остаток заявки к оплате новой платёжкой */
  financePayPaymentRequestRemainder: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinancePaymentRequestVersionInput;
    response: models.FinancePaymentRequest;
  };
  /** GET /api/v1/finance/payment-registries — Список реестров платежей */
  financePaymentRegistries: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "company"?: models.UUID; "status"?: "draft" | "approved" | "sent" | "cancelled" | "all" };
    body: never;
    response: models.FinancePaymentRegistryList;
  };
  /** GET /api/v1/finance/payment-registries/{id} — Реестр платежей со строками */
  financePaymentRegistry: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinancePaymentRegistryView;
  };
  /** GET /api/v1/finance/payment-requests/{id}/availability — Доступный остаток счёта под заявку на оплату */
  financePaymentRequestAvailability: {
    params: { "id": models.UUID };
    query: { "account"?: models.UUID; "date"?: string };
    body: never;
    response: models.FinancePaymentRequestAvailability;
  };
  /** GET /api/v1/finance/payment-requests/{id}/fact-candidates — Платежи, которыми можно оплатить заявку */
  financePaymentRequestFactCandidates: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinancePaymentRequestFactCandidatesResponse;
  };
  /** GET /api/v1/finance/settlements/payments/{id}/retro — Прочитать платёж для документа задним числом */
  financePaymentRetroPrefill: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinancePaymentRetroPrefill;
  };
  /** GET /api/v1/finance/payroll/registers — Получить журнал реестров на выплату */
  financePayoutRegisters: {
    params: Record<string, never>;
    query: { "company"?: models.UUID; "limit"?: number };
    body: never;
    response: models.FinancePayoutRegisterPage;
  };
  /** GET /api/v1/finance/payroll/documents — Получить журнал зарплатных документов */
  financePayrollDocuments: {
    params: Record<string, never>;
    query: { "limit"?: number };
    body: never;
    response: models.CoreDocumentPage;
  };
  /** GET /api/v1/finance/payroll/month-status — Получить состояние месяца зарплаты по юрлицам */
  financePayrollMonthStatus: {
    params: Record<string, never>;
    query: { "month": string };
    body: never;
    response: models.FinancePayrollMonthStatus;
  };
  /** GET /api/v1/finance/payroll/parts — Получить долг перед сотрудниками по частям зарплаты */
  financePayrollParts: {
    params: Record<string, never>;
    query: { "business_id"?: string; "company_id"?: string; "contact"?: string; "date"?: string; "employee"?: string; "netting"?: boolean };
    body: never;
    response: models.FinancePayrollPartsList;
  };
  /** GET /api/v1/finance/payroll/payout-months — Получить месяцы назначения выплаты зарплаты */
  financePayrollPayoutMonths: {
    params: Record<string, never>;
    query: { "amount"?: string; "contact"?: string; "date"?: string; "document"?: string; "employee"?: string; "item"?: string; "month"?: string };
    body: never;
    response: models.FinancePayrollPayoutMonths;
  };
  /** GET /api/v1/finance/payroll/payouts-awaiting — Получить выплаты, ждущие состава реестра из 1С */
  financePayrollPayoutsAwaiting: {
    params: Record<string, never>;
    query: { "company_id"?: string; "legacy"?: boolean };
    body: never;
    response: models.FinancePayrollAwaitList;
  };
  /** GET /api/v1/finance/reports/pnl/entries — Получить расшифровку ячейки отчёта о прибылях и убытках */
  financePnlEntries: {
    params: Record<string, never>;
    query: { "company"?: models.UUID; "from"?: string; "item"?: string; "project"?: models.UUID; "to"?: string };
    body: never;
    response: models.FinancePnlEntryPage;
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
  /** POST /api/v1/finance/fixed-assets/depreciation — Начислить амортизацию за месяц */
  financePostFixedAssetDepreciation: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceFixedAssetMonthInput;
    response: models.CoreDocument;
  };
  /** POST /api/v1/finance/payroll/documents/{id}/post — Провести зарплатный документ */
  financePostPayrollDocument: {
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
  /** POST /api/v1/finance/vat-quarters/{id}/post — Провести «НДС за квартал» */
  financePostVATQuarter: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceVATQuarter;
  };
  /** POST /api/v1/finance/z-reports — Провести Z-отчёт смены розницы услуг */
  financePostZReport: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceZReportInput;
    response: models.FinanceZReportResult;
  };
  /** POST /api/v1/finance/staffing/bonus-schemes/preview — Посчитать пример премии по правилу без сохранения */
  financePreviewBonusScheme: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceBonusSchemePreviewInput;
    response: models.FinanceBonusReportLineResult;
  };
  /** GET /api/v1/finance/dividends/decisions/preview — Рассчитать доступную прибыль и заполнить распределение собственникам */
  financePreviewDividendDecision: {
    params: Record<string, never>;
    query: { "business_id"?: models.UUID; "company_id"?: models.UUID; "period_from": string; "period_to": string; "policy_id"?: models.UUID };
    body: never;
    response: { [key: string]: unknown };
  };
  /** POST /api/v1/finance/factoring/registry-preview — Сопоставить реестр фактора с продажами покупателя */
  financePreviewFactoringRegistry: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceFactoringRegistryInput;
    response: models.FinanceFactoringRegistryPreview;
  };
  /** GET /api/v1/finance/fixed-assets/depreciation — Получить предпросмотр начисления амортизации за месяц */
  financePreviewFixedAssetDepreciation: {
    params: Record<string, never>;
    query: { "company": models.UUID; "month": string };
    body: never;
    response: models.FinanceFixedAssetDepreciationPreview;
  };
  /** POST /api/v1/finance/fixed-assets/import/preview — Получить предпросмотр загрузки ведомости основных средств */
  financePreviewFixedAssetImport: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceFixedAssetImportInput;
    response: models.FinanceFixedAssetImportPreview;
  };
  /** POST /api/v1/finance/imports/{id}/preview — Проверить импорт и показать изменения без записи */
  financePreviewImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceImportRun;
  };
  /** POST /api/v1/finance/items/{id}/merge/preview — Предпросмотр объединения статьи с другой */
  financePreviewItemMerge: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceItemMergeRequest;
    response: models.FinanceItemMergeResult;
  };
  /** POST /api/v1/finance/settlements/refunds/preview — Показать сведение прихода с возвратами */
  financePreviewRefundSettlement: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceRefundSettlementInput;
    response: models.FinanceRefundSettlementPreview;
  };
  /** POST /api/v1/finance/sale-lines/preview — Посчитать строки продажи до сохранения */
  financePreviewSaleLines: {
    params: Record<string, never>;
    query: { "business"?: models.UUID };
    body: models.FinanceSaleLinesPreviewRequest;
    response: models.FinanceSaleLinesPreview;
  };
  /** POST /api/v1/finance/vat-quarters/preview — Посчитать «НДС за квартал» без сохранения */
  financePreviewVATQuarter: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceVATQuarterInput;
    response: models.FinanceVATQuarterPayload;
  };
  /** POST /api/v1/finance/payment-registries/propose — Собрать предложение к оплате */
  financeProposePaymentRegistry: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinancePaymentRegistryInput;
    response: models.FinancePaymentRegistryProposal;
  };
  /** POST /api/v1/finance/payroll/payouts-awaiting/{tx}/pull — Подтянуть состав реестра выплаты из 1С */
  financePullPayrollAwaitingPayout: {
    params: { "tx": string };
    query: Record<string, never>;
    body: models.FinancePayrollAwaitPull;
    response: models.FinancePayrollAwait;
  };
  /** POST /api/v1/finance/exchange/items/{id}/quarantine — Поместить элемент обмена в карантин */
  financeQuarantineExchangeItem: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceExchangeQuarantine;
    response: models.FinanceExchangeItem;
  };
  /** GET /api/v1/finance/settlements/receipt-cost-queue — Платежи, ждущие привязки к приёмке */
  financeReceiptCostQueue: {
    params: Record<string, never>;
    query: { "business"?: models.UUID };
    body: never;
    response: models.FinanceReceiptCostQueue;
  };
  /** POST /api/v1/finance/exchange/onec/connections/{id}/receive — Получить из базы 1С */
  financeReceiveOneC: {
    params: { "id": models.UUID };
    query: { "preview"?: boolean };
    body: never;
    response: models.FinanceOneCReceiveReport;
  };
  /** GET /api/v1/finance/registers/reconcile — Сверить регистры с операциями и главной книгой */
  financeReconcileRegisters: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.FinanceRegisterReconciliation;
  };
  /** GET /api/v1/finance/vat-quarters/books — Сверить квартал с загруженными книгами покупок и продаж 1С */
  financeReconcileVATBooks: {
    params: Record<string, never>;
    query: { "company_id": models.UUID; "quarter": number; "year": number };
    body: never;
    response: models.FinanceVATBookReconciliation;
  };
  /** POST /api/v1/finance/exchange/items — Зарегистрировать внешний объект в журнале обмена */
  financeRecordExchangeItem: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceExchangeCreate;
    response: models.FinanceExchangeItem;
  };
  /** POST /api/v1/finance/connectors/{id}/accounts/refresh — Перечитать счета из банка */
  financeRefreshConnectorAccounts: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceConnectorAccountPage;
  };
  /** POST /api/v1/finance/exchange/onec/connections/{id}/register — Зарегистрировать Акеду в базе 1С */
  financeRegisterOneCNode: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceOneCConnection;
  };
  /** POST /api/v1/finance/classification-suggestions/{id}/reject — Отклонить рекомендацию расширения */
  financeRejectClassificationSuggestion: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/finance/budgets/reservations/{id}/release — Снять резерв лимита */
  financeReleaseBudgetReservation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceBudgetReservation;
  };
  /** POST /api/v1/finance/settlements/order-openings/release-cancelled — Исправить ввод расчётов по заказам после отмены источника */
  financeReleaseCancelledOrderOpenings: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceOrderOpeningReleaseInput;
    response: models.FinanceOrderOpeningReleaseReport;
  };
  /** POST /api/v1/finance/settlements/payments/{id}/relink — Перенести оплату на другую продажу или закупку */
  financeRelinkPayment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceRelinkPaymentRequest;
    response: { [key: string]: unknown };
  };
  /** DELETE /api/v1/finance/payment-registries/{id}/lines/{request} — Снять заявку с реестра платежей */
  financeRemovePaymentRegistryLine: {
    params: { "id": models.UUID; "request": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinancePaymentRegistryView;
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
  /** POST /api/v1/finance/exchange/items/{id}/onec-resolve — Решить, чья версия документа остаётся в 1С */
  financeResolveOneCConflict: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceOneCResolve;
    response: models.FinanceExchangeItem;
  };
  /** POST /api/v1/finance/payment-calendar/plans/{id}/restore — Вернуть отменённую плановую строку */
  financeRestorePaymentPlan: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinancePaymentPlan;
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
    body: models.FinanceRegistersResyncRequest;
    response: models.FinanceRegistersResyncResult;
  };
  /** POST /api/v1/finance/payment-requests/{id}/return-to-rework — Вернуть заявку на оплату автору на доработку */
  financeReturnPaymentRequestToRework: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinancePaymentRequestReworkInput;
    response: models.FinancePaymentRequest;
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
  /** GET /api/v1/finance/sale-vat-terms — Получить налоговые условия продажи до сохранения */
  financeSaleVATTerms: {
    params: Record<string, never>;
    query: { "company_id": models.UUID; "date": string; "item_id"?: models.UUID };
    body: never;
    response: models.FinanceSaleVATTerms;
  };
  /** PUT /api/v1/finance/acquirers — Выбрать эквайера юрлица */
  financeSaveAcquirer: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceAcquirerInput;
    response: models.FinanceAcquirer;
  };
  /** POST /api/v1/finance/budgets — Сохранить бюджет месяца */
  financeSaveBudget: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceBudgetInput;
    response: models.FinanceBudget;
  };
  /** PUT /api/v1/finance/budgets/drivers — Сохранить драйверы бюджета */
  financeSaveBudgetDrivers: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceBudgetDrivers;
    response: models.FinanceBudgetDrivers;
  };
  /** PUT /api/v1/finance/budgets/payment-terms — Сохранить сроки оплаты статей */
  financeSaveBudgetPaymentTerms: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceBudgetPaymentTermsInput;
    response: models.FinanceBudgetPaymentTerms;
  };
  /** PUT /api/v1/finance/budgets/settings — Сохранить настройки бюджета */
  financeSaveBudgetSetting: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceBudgetSetting;
    response: models.FinanceBudgetSetting;
  };
  /** POST /api/v1/finance/budgets/variance-notes — Пояснить отклонение план-факта */
  financeSaveBudgetVarianceNote: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceBudgetVarianceNoteInput;
    response: void;
  };
  /** PUT /api/v1/finance/payroll/automation — Сохранить настройку автоначисления зарплаты */
  financeSavePayrollAutomation: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinancePayrollAutomationSettings;
    response: models.FinancePayrollAutomationSettings;
  };
  /** PUT /api/v1/finance/pnl-layouts/{id} — Заменить макет ОПиУ целиком */
  financeSavePnlLayout: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinancePnlLayoutSave;
    response: models.FinancePnlLayout;
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
  /** POST /api/v1/finance/payment-registries/{id}/send — Отправить реестр платежей в банк */
  financeSendPaymentRegistry: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinancePaymentRegistrySendResult;
  };
  /** POST /api/v1/finance/accounts/{id}/opening-balance — Завести входящий остаток счёта документом */
  financeSetAccountOpeningBalance: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceOpeningBalanceRequest;
    response: models.FinanceAccount;
  };
  /** PUT /api/v1/finance/connectors/sync-settings — Изменить расписание синхронизации банков */
  financeSetConnectorSyncSettings: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceConnectorSyncSettingsInput;
    response: models.FinanceConnectorSyncSettings;
  };
  /** PATCH /api/v1/finance/settlements/obligations/{id}/due-date — Назначить срок оплаты обязательства */
  financeSetObligationDueDate: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceObligationDueDateInput;
    response: models.CoreDocument;
  };
  /** PUT /api/v1/finance/exchange/onec/connections/{id}/mappings — Сопоставить объект 1С со статьёй */
  financeSetOneCMapping: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceOneCMappingInput;
    response: models.FinanceOneCMappingResult;
  };
  /** PUT /api/v1/finance/payroll/payout-months/{document} — Назначить месяц выплаты зарплаты */
  financeSetPayrollPayoutMonth: {
    params: { "document": string };
    query: Record<string, never>;
    body: models.FinancePayrollPayoutMonthSet;
    response: models.FinancePayrollPayoutMonths;
  };
  /** PUT /api/v1/finance/purchases/{id}/sale-order — Отнести закупку-заказ на продажу */
  financeSetPurchaseSaleOrder: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinancePurchaseSaleOrderInput;
    response: models.CoreOrder;
  };
  /** PATCH /api/v1/finance/settlements/documents/{id}/supplier-document — Указать документ поставщика у закупки */
  financeSetPurchaseSupplierDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.SupplierDocument;
    response: models.CoreDocument;
  };
  /** POST /api/v1/finance/wallets/{id}/opening-balance — Завести входящий остаток кассы документом */
  financeSetWalletOpeningBalance: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceOpeningBalanceRequest;
    response: void;
  };
  /** GET /api/v1/finance/settlements/aging — Старение долга по срокам */
  financeSettlementAging: {
    params: Record<string, never>;
    query: { "as_of"?: string; "business"?: models.UUID; "company"?: string; "contact_id"?: string; "currency"?: string; "q"?: string };
    body: never;
    response: models.FinanceSettlementAgingPage;
  };
  /** GET /api/v1/finance/settlements/reconciliation-turnover — Акт сверки с контрагентом за период */
  financeSettlementReconciliationTurnover: {
    params: Record<string, never>;
    query: { "company": models.UUID; "contact_id": models.UUID; "contract_id"?: models.UUID; "currency"?: string; "from"?: string; "to": string };
    body: never;
    response: models.FinanceReconciliationTurnover;
  };
  /** GET /api/v1/finance/staffing/headcount — Получить численность занятых позиций по ЦФО на дату */
  financeStaffHeadcount: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "company"?: string; "on"?: string };
    body: never;
    response: models.FinanceStaffHeadcount;
  };
  /** GET /api/v1/finance/staffing/positions — Получить справочник штатных позиций */
  financeStaffPositions: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "company"?: string };
    body: never;
    response: models.FinanceStaffPositionList;
  };
  /** GET /api/v1/finance/staffing/bonus-bases — Получить перечисления конструктора правила премии */
  financeStaffingBonusOptions: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.FinanceBonusOptions;
  };
  /** GET /api/v1/finance/staffing/sheet — Получить штатное расписание на дату */
  financeStaffingSheet: {
    params: Record<string, never>;
    query: { "accrual_month"?: string; "business"?: models.UUID; "company"?: string; "on"?: string };
    body: never;
    response: models.FinanceStaffingSheet;
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
  /** GET /api/v1/finance/transactions/{id}/payment-requests — Заявки на оплату строки выписки */
  financeTransactionPaymentRequests: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceTransactionPaymentRequests;
  };
  /** GET /api/v1/finance/transactions/{id}/payout-registers — Подобрать реестры на выплату под банковскую операцию */
  financeTransactionPayoutRegisters: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinancePayoutRegisterPage;
  };
  /** POST /api/v1/finance/payroll/part-transfers — Перенести сумму между частями зарплаты сотрудника */
  financeTransferPayrollPart: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinancePayrollPartTransferCreate;
    response: models.CoreDocument;
  };
  /** POST /api/v1/finance/payment-requests/{id}/unlink-payment — Отвязать платёж от заявки на оплату */
  financeUnlinkPaymentRequestPayment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinancePaymentRequestUnlinkInput;
    response: models.FinancePaymentRequest;
  };
  /** PATCH /api/v1/finance/accounts/{id} — Частично изменить банковский счёт */
  financeUpdateAccount: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceAccountPatch;
    response: models.FinanceAccount;
  };
  /** PATCH /api/v1/finance/staffing/bonus-schemes/{id} — Изменить правило премирования */
  financeUpdateBonusScheme: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceBonusSchemeInput;
    response: models.FinanceBonusScheme;
  };
  /** PATCH /api/v1/finance/cash-operations/{id}/responsible — Изменить инициатора кассовой операции */
  financeUpdateCashOperationResponsible: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceResponsiblePatch;
    response: void;
  };
  /** PATCH /api/v1/finance/connectors/{id} — Изменить подключение или его состояние */
  financeUpdateConnector: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceConnectorPatch;
    response: models.FinanceConnector;
  };
  /** PATCH /api/v1/finance/connectors/accounts/{accountId} — Привязать внешний счёт к счёту Akeda или изменить импорт */
  financeUpdateConnectorAccount: {
    params: { "accountId": models.UUID };
    query: Record<string, never>;
    body: models.FinanceConnectorAccountPatch;
    response: models.FinanceConnectorAccount;
  };
  /** PUT /api/v1/finance/accountable/reports/{id} — Изменить авансовый отчёт */
  financeUpdateExpenseReport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceExpenseReportCreate;
    response: models.CoreDocument;
  };
  /** PUT /api/v1/finance/fixed-assets/{id} — Изменить карточку основного средства */
  financeUpdateFixedAsset: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceFixedAssetInput;
    response: models.FinanceFixedAsset;
  };
  /** PATCH /api/v1/finance/exchange/onec/connections/{id} — Изменить подключение базы 1С */
  financeUpdateOneCConnection: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceOneCConnectionInput;
    response: models.FinanceOneCConnection;
  };
  /** PATCH /api/v1/finance/payment-calendar/plans/{id} — Заменить данные ручной плановой строки */
  financeUpdatePaymentPlan: {
    params: { "id": models.UUID };
    query: { "business"?: models.UUID };
    body: models.FinancePaymentPlanInput;
    response: models.FinancePaymentPlan;
  };
  /** PATCH /api/v1/finance/payment-registries/{id} — Изменить черновик реестра платежей */
  financeUpdatePaymentRegistry: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinancePaymentRegistryPatch;
    response: models.FinancePaymentRegistryView;
  };
  /** PATCH /api/v1/finance/staffing/positions/{id} — Изменить штатную позицию */
  financeUpdateStaffPosition: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceStaffPositionInput;
    response: models.FinanceStaffPosition;
  };
  /** PATCH /api/v1/finance/statement-mailboxes/{id} — Изменить подключение выписки по почте */
  financeUpdateStatementMailbox: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceStatementMailboxPatch;
    response: models.FinanceStatementMailbox;
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
  /** PUT /api/v1/finance/vat-quarters/{id} — Пересохранить черновик «НДС за квартал» */
  financeUpdateVATQuarter: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceVATQuarterInput;
    response: models.FinanceVATQuarter;
  };
  /** POST /api/v1/finance/settlements/obligations/{id}/write-off — Списать остаток долга */
  financeWriteOffDebt: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceDebtWriteOffInput;
    response: { [key: string]: unknown };
  };
  /** POST /api/v1/invitations — Пригласить человека по почте */
  invitationsCreate: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.InvitationCreateInput;
    response: models.Invitation;
  };
  /** POST /api/v1/invitations/batch — Пригласить пачку людей */
  invitationsCreateBatch: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.InvitationBatchInput;
    response: models.InvitationBatchResult;
  };
  /** POST /api/v1/invitations/shared-links — Создать общую ссылку на роль */
  invitationsCreateSharedLink: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.InvitationSharedLinkInput;
    response: models.InvitationSharedLink;
  };
  /** DELETE /api/v1/invitations/{id} — Удалить приглашение из истории */
  invitationsDelete: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.InvitationStatusResult;
  };
  /** POST /api/v1/invitations/{id}/link — Выпустить ссылку приглашения без письма */
  invitationsIssueLink: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.Invitation;
  };
  /** GET /api/v1/invitations — Получить приглашения кабинета */
  invitationsList: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.InvitationPage;
  };
  /** POST /api/v1/invitations/{id}/resend — Отправить приглашение повторно */
  invitationsResend: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.Invitation;
  };
  /** POST /api/v1/invitations/{id}/revoke — Отозвать приглашение */
  invitationsRevoke: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.InvitationStatusResult;
  };
  /** POST /api/v1/invitations/shared-links/{id}/revoke — Отозвать общую ссылку */
  invitationsRevokeSharedLink: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.InvitationSharedLink;
  };
  /** GET /api/v1/invitations/shared-links — Получить общие ссылки на роль */
  invitationsSharedLinks: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.InvitationSharedLinkPage;
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
  /** POST /api/v1/knowledge/tags — Создать метку базы знаний */
  knowledgeCreateTag: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.KnowledgeTagInput;
    response: models.KnowledgeTag;
  };
  /** DELETE /api/v1/knowledge/assets/{id} — Удалить файл базы знаний */
  knowledgeDeleteAsset: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/knowledge/spaces/{id} — Удалить пространство базы знаний */
  knowledgeDeleteSpace: {
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
  /** GET /api/v1/knowledge/quality — Получить сводку качества ответов базы знаний */
  knowledgeGetAnswerQuality: {
    params: Record<string, never>;
    query: { "days"?: number };
    body: never;
    response: models.KnowledgeAnswerQuality;
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
  /** GET /api/v1/knowledge/nodes/{id}/history — Получить историю редакций страницы */
  knowledgeGetPageHistory: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.KnowledgeRevision>;
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
  /** GET /api/v1/knowledge/tags — Получить метки базы знаний */
  knowledgeListTags: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: Array<models.KnowledgeTag>;
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
  /** POST /api/v1/knowledge/assets/{id}/reindex — Повторить разбор файла базы знаний */
  knowledgeReindexAsset: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/knowledge/nodes/{id}/reject — Отклонить редакцию на согласовании */
  knowledgeRejectPage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.KnowledgeReviewInput;
    response: models.KnowledgeNode;
  };
  /** PUT /api/v1/knowledge/nodes/{id}/access — Заменить состав участников страницы */
  knowledgeReplacePageAccess: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.KnowledgeNodeAccessInput;
    response: models.KnowledgeNodeAccessPolicy;
  };
  /** PUT /api/v1/knowledge/nodes/{id}/tags — Заменить набор меток страницы */
  knowledgeReplacePageTags: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.KnowledgeTagSetInput;
    response: Array<models.KnowledgeTag>;
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
  /** POST /api/v1/knowledge/nodes/{id}/history/restore — Восстановить редакцию страницы из истории */
  knowledgeRestorePageRevision: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.KnowledgeRevisionRestoreInput;
    response: models.KnowledgeNode;
  };
  /** POST /api/v1/knowledge/answers/{id}/feedback — Оценить ответ базы знаний */
  knowledgeSaveAnswerFeedback: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.KnowledgeAnswerFeedbackInput;
    response: void;
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
  /** PUT /api/v1/knowledge/spaces/{id} — Изменить пространство базы знаний */
  knowledgeUpdateSpace: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.KnowledgeSpaceInput;
    response: models.KnowledgeSpace;
  };
  /** POST /api/v1/knowledge/nodes/{id}/assets — Прикрепить файл к странице базы знаний */
  knowledgeUploadPageAsset: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.KnowledgeAsset;
  };
  /** POST /api/v1/knowledge/nodes/{id}/verify — Подтвердить актуальность страницы */
  knowledgeVerifyPage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.KnowledgeVersionInput;
    response: models.KnowledgeNode;
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
  /** POST /api/v1/mail/messages/{id}/cancel-send — Отменить отправку и вернуть письмо в черновики */
  mailCancelScheduledSend: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MailMessage;
  };
  /** POST /api/v1/mail/accounts/{id}/check — Проверить подключение ящика */
  mailCheckAccount: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MailAccount;
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
  /** POST /api/v1/mail/accounts — Подключить почтовый ящик */
  mailCreateAccount: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MailAccountInput;
    response: models.MailAccount;
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
  /** DELETE /api/v1/mail/accounts/{id} — Отключить почтовый ящик */
  mailDeleteAccount: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/mail/address-book/entries/{id} — Убрать адресата из адресной книги */
  mailDeleteAddressBookEntry: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
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
    query: { "permanent"?: boolean };
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
  /** GET /api/v1/mail/discover — Определить настройки сервера по адресу почты */
  mailDiscoverSettings: {
    params: Record<string, never>;
    query: { "email": string };
    body: never;
    response: models.MailDiscoveredSettings;
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
  /** PUT /api/v1/mail/address-book/entries/{id}/contact — Привязать адресата к контрагенту */
  mailLinkAddressBookEntry: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MailLinkAddressBookEntryRequest;
    response: models.MailAddressBookRecord;
  };
  /** GET /api/v1/mail/accounts/journal — Получить журнал почтовых ящиков */
  mailListAccountJournal: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.MailListAccountJournalResponse;
  };
  /** GET /api/v1/mail/accounts — Получить почтовые ящики сотрудника */
  mailListAccounts: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.MailListAccountsResponse;
  };
  /** GET /api/v1/mail/address-book/entries — Получить адресную книгу почты */
  mailListAddressBookEntries: {
    params: Record<string, never>;
    query: { "limit"?: number; "offset"?: number; "q"?: string };
    body: never;
    response: models.MailAddressBookPage;
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
    query: { "account_id"?: models.UUID; "all_mail"?: boolean; "folder_id"?: models.UUID; "folder_role"?: models.MailFolderRole; "from"?: string; "has_files"?: boolean; "is_flagged"?: boolean; "is_read"?: boolean; "limit"?: number; "offset"?: number; "q"?: string; "sent_after"?: string; "sent_before"?: string; "spam_verdict"?: models.MailSpamVerdict; "thread_id"?: models.UUID };
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
    query: { "account_id"?: models.UUID; "all_mail"?: boolean; "all_matching"?: boolean; "folder_id"?: models.UUID; "folder_name"?: string; "folder_role"?: string; "is_read"?: boolean; "is_vip"?: boolean; "q"?: string; "sent_after"?: string; "sent_before"?: string };
    body: models.MailReadBatchRequest;
    response: models.MailReadBatchResponse;
  };
  /** PATCH /api/v1/mail/address-book/entries/{id} — Поправить имя адресата */
  mailRenameAddressBookEntry: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MailRenameAddressBookEntryRequest;
    response: models.MailAddressBookRecord;
  };
  /** PATCH /api/v1/mail/folders/{id} — Переименовать папку ящика */
  mailRenameFolder: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MailFolderInput;
    response: models.MailFolder;
  };
  /** POST /api/v1/mail/messages/{id}/resend-draft — Скопировать письмо в черновики, чтобы исправить и отправить снова */
  mailResendAsDraft: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MailMessage;
  };
  /** POST /api/v1/mail/address-book/entries — Сохранить адресата в адресную книгу почты */
  mailSaveAddressBookEntry: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MailSaveAddressBookEntryRequest;
    response: models.MailSavedAddress;
  };
  /** POST /api/v1/mail/attachments/{id}/save-to-files — Сохранить вложение письма в «Файлы» */
  mailSaveAttachmentToFiles: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MailSaveToFilesInput;
    response: models.FilesFile;
  };
  /** POST /api/v1/mail/messages/{id}/send-now — Отправить отложенное письмо сейчас */
  mailSendMessageNow: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
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
  /** PATCH /api/v1/mail/accounts/{id} — Изменить настройки почтового ящика */
  mailUpdateAccount: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MailAccountInput;
    response: models.MailAccount;
  };
  /** PATCH /api/v1/mail/rules/{id} — Изменить правило разбора почты */
  mailUpdateRule: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MailRuleInput;
    response: models.MailRule;
  };
  /** POST /api/v1/marketplace/ozon/product-groups/{id}/items — Добавить товары в срез Ozon */
  marketplaceAddOzonProductGroupItems: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MarketplaceProductGroupItemsInput;
    response: models.MarketplaceProductGroupItemsAdded;
  };
  /** POST /api/v1/marketplace/wb/product-groups/{id}/items — Добавить товары в срез Wildberries */
  marketplaceAddWbProductGroupItems: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MarketplaceProductGroupItemsInput;
    response: models.MarketplaceProductGroupItemsAdded;
  };
  /** POST /api/v1/marketplace/{platform}/opening-stock/apply — Ввести начальный остаток склада площадки */
  marketplaceApplyPlatformOpening: {
    params: { "platform": "ozon" | "wildberries" };
    query: Record<string, never>;
    body: models.MarketplaceOpeningApplyRequest;
    response: models.MarketplaceOpeningApplyResult;
  };
  /** POST /api/v1/marketplace/{platform}/stores/{id}/finance/weeks/{weekStart}/apply — Передать завершённую неделю в учёт */
  marketplaceApplyWeeklyFinanceRun: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "wildberries"; "weekStart": string };
    query: Record<string, never>;
    body: never;
    response: models.MarketplaceWeeklyFinanceOutcome;
  };
  /** POST /api/v1/marketplace/{platform}/stores/{id}/collector-binding — Привязать магазин к магазину сборщика по номеру */
  marketplaceBindStoreToCollector: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "yandex" };
    query: Record<string, never>;
    body: models.MarketplaceStoreBindingInput;
    response: models.MarketplaceStoreBindingResult;
  };
  /** GET /api/v1/marketplace/{platform}/stores/{id}/collector-binding — Сверить магазин с магазином сборщика по номеру */
  marketplaceCheckStoreBinding: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "yandex" };
    query: { "external_id": number };
    body: never;
    response: models.MarketplaceStoreBindingCheck;
  };
  /** POST /api/v1/marketplace/{platform}/stores/{id}/catalog/matches/create — Создать товары номенклатуры из карточек площадки */
  marketplaceCreateCatalogMatchProducts: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "wildberries" | "yandex" };
    query: Record<string, never>;
    body: models.MarketplaceCatalogMatchCreateRequest;
    response: models.MarketplaceCatalogMatchResult;
  };
  /** POST /api/v1/marketplace/lamoda/stores — Завести магазин Ламоды */
  marketplaceCreateLamodaStore: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarketplaceStoreInput;
    response: models.MarketplaceStore;
  };
  /** POST /api/v1/marketplace/ozon/product-groups — Создать срез товаров Ozon */
  marketplaceCreateOzonProductGroup: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarketplaceProductGroupInput;
    response: models.MarketplaceProductGroup;
  };
  /** POST /api/v1/marketplace/ozon/stores — Завести магазин Ozon */
  marketplaceCreateOzonStore: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarketplaceStoreInput;
    response: models.MarketplaceStore;
  };
  /** POST /api/v1/marketplace/wb/product-groups — Создать срез товаров Wildberries */
  marketplaceCreateWbProductGroup: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarketplaceProductGroupInput;
    response: models.MarketplaceProductGroup;
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
  /** DELETE /api/v1/marketplace/ozon/product-groups/{id} — Удалить срез товаров Ozon */
  marketplaceDeleteOzonProductGroup: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.OK;
  };
  /** DELETE /api/v1/marketplace/ozon/stores/{id} — Удалить магазин Ozon */
  marketplaceDeleteOzonStore: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/marketplace/wb/product-groups/{id} — Удалить срез товаров Wildberries */
  marketplaceDeleteWbProductGroup: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.OK;
  };
  /** DELETE /api/v1/marketplace/wb/stores/{id} — Удалить магазин Wildberries */
  marketplaceDeleteWbStore: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/marketplace/yandex/stores/{id} — Удалить магазин Яндекс Маркета */
  marketplaceDeleteYandexStore: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/marketplace/econ/quote — Рассчитать юнит-экономику по строкам прайса */
  marketplaceEconQuote: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarketplaceEconQuoteRequest;
    response: models.MarketplaceEconQuoteResponse;
  };
  /** POST /api/v1/marketplace/{platform}/fbs-carriages — Создать и подтвердить отгрузку Ozon */
  marketplaceFbsCarriagesCreate: {
    params: { "platform": "ozon" };
    query: Record<string, never>;
    body: models.MarketplaceFbsPostingsInput;
    response: models.MarketplaceFbsCarriageResult;
  };
  /** GET /api/v1/marketplace/{platform}/fbs-queue — Получить очередь сборки FBS */
  marketplaceFbsQueue: {
    params: { "platform": "ozon" | "wildberries" };
    query: { "store_id"?: models.UUID };
    body: never;
    response: models.MarketplaceFbsQueueView;
  };
  /** GET /api/v1/marketplace/{platform}/fbs-supplies — Получить поставки FBS площадки */
  marketplaceFbsSupplies: {
    params: { "platform": "ozon" | "wildberries" };
    query: { "store_id"?: models.UUID; "sync"?: "0" | "1" };
    body: never;
    response: models.MarketplaceFbsSuppliesView;
  };
  /** POST /api/v1/marketplace/{platform}/fbs-supplies/{id}/orders — Добавить задания в поставку FBS */
  marketplaceFbsSupplyAddOrders: {
    params: { "id": models.UUID; "platform": "wildberries" };
    query: Record<string, never>;
    body: models.MarketplaceFbsSupplyOrdersInput;
    response: models.MarketplaceFbsSupplyEnvelope;
  };
  /** POST /api/v1/marketplace/{platform}/fbs-supplies — Создать поставку FBS у площадки */
  marketplaceFbsSupplyCreate: {
    params: { "platform": "wildberries" };
    query: Record<string, never>;
    body: models.MarketplaceFbsSupplyCreateInput;
    response: models.MarketplaceFbsSupplyEnvelope;
  };
  /** POST /api/v1/marketplace/{platform}/fbs-supplies/{id}/deliver — Передать поставку FBS в доставку */
  marketplaceFbsSupplyDeliver: {
    params: { "id": models.UUID; "platform": "wildberries" };
    query: Record<string, never>;
    body: never;
    response: models.MarketplaceFbsSupplyEnvelope;
  };
  /** GET /api/v1/marketplace/{platform}/fbs-waves/{id} — Получить волну FBS с листом подбора */
  marketplaceFbsWave: {
    params: { "id": models.UUID; "platform": "ozon" | "wildberries" };
    query: Record<string, never>;
    body: never;
    response: models.MarketplaceFbsWaveEnvelope;
  };
  /** POST /api/v1/marketplace/{platform}/fbs-waves/{id}/cancel — Отменить волну FBS */
  marketplaceFbsWaveCancel: {
    params: { "id": models.UUID; "platform": "ozon" | "wildberries" };
    query: Record<string, never>;
    body: never;
    response: models.MarketplaceFbsWaveEnvelope;
  };
  /** POST /api/v1/marketplace/{platform}/fbs-waves — Собрать волну FBS из заданий очереди */
  marketplaceFbsWaveCreate: {
    params: { "platform": "ozon" | "wildberries" };
    query: Record<string, never>;
    body: models.MarketplaceFbsWaveCreateInput;
    response: models.MarketplaceFbsWaveCreateResult;
  };
  /** PUT /api/v1/marketplace/{platform}/fbs-waves/{id}/picks/{pick} — Отметить строку листа подбора волны FBS */
  marketplaceFbsWavePick: {
    params: { "id": models.UUID; "pick": models.UUID; "platform": "ozon" | "wildberries" };
    query: Record<string, never>;
    body: models.MarketplaceFbsWavePickInput;
    response: models.MarketplaceFbsWavePickResult;
  };
  /** GET /api/v1/marketplace/{platform}/fbs-waves — Получить волны сборки FBS */
  marketplaceFbsWaves: {
    params: { "platform": "ozon" | "wildberries" };
    query: Record<string, never>;
    body: never;
    response: models.MarketplaceFbsWaveList;
  };
  /** GET /api/v1/marketplace/{platform}/stores/{id}/catalog/status — Получить состояние первоначальной загрузки каталога */
  marketplaceGetCatalogImportStatus: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "wildberries" | "yandex" };
    query: Record<string, never>;
    body: never;
    response: models.MarketplaceCatalogJob;
  };
  /** GET /api/v1/marketplace/{platform}/stores/{id}/accounting — Получить настройки учёта магазина */
  marketplaceGetStoreAccounting: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "wildberries" | "yandex" };
    query: Record<string, never>;
    body: never;
    response: models.MarketplaceStoreAccounting;
  };
  /** GET /api/v1/marketplace/{platform}/stores/{id}/initial-load — Получить состояние первичной загрузки магазина */
  marketplaceGetStoreInitialLoad: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "wildberries" | "yandex" };
    query: Record<string, never>;
    body: never;
    response: models.MarketplaceStoreInitialLoad;
  };
  /** POST /api/v1/marketplace/{platform}/stores/{id}/catalog/import — Завести каталог магазина в номенклатуру кабинета */
  marketplaceImportCatalog: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "wildberries" | "yandex" };
    query: Record<string, never>;
    body: never;
    response: models.MarketplaceCatalogImportResult;
  };
  /** GET /api/v1/marketplace/lamoda/stores — Получить магазины Ламоды */
  marketplaceLamodaStores: {
    params: Record<string, never>;
    query: { "all"?: "1" };
    body: never;
    response: models.MarketplaceStorePage;
  };
  /** GET /api/v1/marketplace/letoile/stores — Получить магазины Летуаль */
  marketplaceLetoileStores: {
    params: Record<string, never>;
    query: { "all"?: "1" };
    body: never;
    response: models.MarketplaceStorePage;
  };
  /** POST /api/v1/marketplace/{platform}/stores/{id}/catalog/matches/link — Привязать карточки площадки к товарам кабинета */
  marketplaceLinkCatalogMatches: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "wildberries" | "yandex" };
    query: Record<string, never>;
    body: models.MarketplaceCatalogMatchLinkRequest;
    response: models.MarketplaceCatalogMatchResult;
  };
  /** POST /api/v1/marketplace/{platform}/stores/{id}/catalog/links — Привязать карточку площадки к товару кабинета */
  marketplaceLinkCatalogProduct: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "wildberries" | "yandex" };
    query: Record<string, never>;
    body: models.MarketplaceCatalogLinkRequest;
    response: models.MarketplaceCatalogLinkDecision;
  };
  /** GET /api/v1/marketplace/{platform}/stores/{id}/catalog/candidates — Получить товары кабинета для привязки спорной карточки */
  marketplaceListCatalogCandidates: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "wildberries" | "yandex" };
    query: { "brand"?: string; "limit"?: number; "link"?: "any" | "linked" | "unlinked"; "linked_platform"?: "ozon" | "wildberries"; "offset"?: number; "q"?: string };
    body: never;
    response: models.MarketplaceCatalogCandidatePage;
  };
  /** GET /api/v1/marketplace/{platform}/stores/{id}/catalog/matches — Получить сопоставление карточек магазина с номенклатурой */
  marketplaceListCatalogMatches: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "wildberries" | "yandex" };
    query: { "activity"?: "active" | "idle"; "limit"?: number; "offset"?: number; "q"?: string; "sort"?: "orders_desc" | "orders_asc" | "stock_desc" | "stock_asc"; "tab"?: "linked" | "review" | "new" | "skipped"; "warned"?: "1" };
    body: never;
    response: models.MarketplaceCatalogMatchPage;
  };
  /** GET /api/v1/marketplace/catalog/products/{product_id}/cards — Получить карточки площадок товара */
  marketplaceListProductCatalogCards: {
    params: { "product_id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarketplaceProductCatalogCardList;
  };
  /** GET /api/v1/marketplace/{platform}/stores/{id}/finance/weeks — Получить готовность недельных финансовых отчётов */
  marketplaceListWeeklyFinanceRuns: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "wildberries" };
    query: Record<string, never>;
    body: never;
    response: models.MarketplaceWeeklyFinanceRuns;
  };
  /** POST /api/v1/marketplace/ozon/ads-absence — Подтвердить, что рекламы не было */
  marketplaceOzonConfirmAdsAbsence: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarketplaceAdsAbsenceRequest;
    response: models.MarketplaceAdsAbsence;
  };
  /** GET /api/v1/marketplace/ozon/decomposition — Получить декомпозицию юнит-экономики Ozon */
  marketplaceOzonDecomposition: {
    params: Record<string, never>;
    query: { "brand"?: string; "from"?: string; "group"?: string; "month"?: string; "store"?: string; "subject"?: string; "to"?: string };
    body: never;
    response: models.MarketplaceOzonDecomposition;
  };
  /** GET /api/v1/marketplace/ozon/decomposition-other — Расшифровать прочие расходы Ozon */
  marketplaceOzonDecompositionOther: {
    params: Record<string, never>;
    query: { "from": string; "group"?: string; "store"?: string; "to": string };
    body: never;
    response: models.MarketplaceOzonDecompositionOtherPage;
  };
  /** GET /api/v1/marketplace/ozon/fbs — Получить отгрузку FBS Ozon */
  marketplaceOzonFbs: {
    params: Record<string, never>;
    query: { "group"?: string; "store"?: string };
    body: never;
    response: models.MarketplaceOzonFbs;
  };
  /** GET /api/v1/marketplace/ozon/funnel — Получить воронку продаж Ozon */
  marketplaceOzonFunnel: {
    params: Record<string, never>;
    query: { "group"?: string; "store"?: string };
    body: never;
    response: models.MarketplaceOzonFunnel;
  };
  /** GET /api/v1/marketplace/ozon/funnel-daily — Получить дневную воронку одного артикула Ozon */
  marketplaceOzonFunnelDaily: {
    params: Record<string, never>;
    query: { "days"?: number; "fresh"?: "1"; "from"?: string; "group"?: string; "groupBy"?: "subject" | "model" | "brand" | "article"; "groupMetrics"?: string; "pulseLimit"?: number; "pulseOffset"?: number; "pulseQuery"?: string; "pulseSort"?: "orders" | "alerts"; "scope"?: string; "sku"?: string; "slice"?: "article" | "store" | "list" | "model" | "brand" | "subject"; "sliceValue"?: string; "store"?: string; "summary"?: "1"; "to"?: string; "view"?: "pulse" };
    body: never;
    response: models.MarketplaceOzonFunnelDaily;
  };
  /** GET /api/v1/marketplace/ozon/orders/overview — Получить сводку заказов Ozon */
  marketplaceOzonOrdersOverview: {
    params: Record<string, never>;
    query: { "fresh"?: "1"; "from"?: string; "group"?: string; "scheme"?: "all" | "fbo" | "fbs"; "store"?: string; "summary"?: "1"; "to"?: string };
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
  /** GET /api/v1/marketplace/ozon/pricing — Получить прайс-лист Ozon с юнит-экономикой */
  marketplaceOzonPricing: {
    params: Record<string, never>;
    query: { "group"?: string; "n"?: number; "store"?: string };
    body: never;
    response: models.MarketplaceOzonPricing;
  };
  /** GET /api/v1/marketplace/ozon/product-facets — Получить значения фильтров товаров Ozon */
  marketplaceOzonProductFacets: {
    params: Record<string, never>;
    query: { "group"?: string; "store"?: string };
    body: never;
    response: models.MarketplaceOzonProductFacets;
  };
  /** GET /api/v1/marketplace/ozon/product-groups/{id}/items — Получить состав среза товаров Ozon */
  marketplaceOzonProductGroupItems: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarketplaceProductGroupItemPage;
  };
  /** GET /api/v1/marketplace/ozon/product-groups — Получить срезы товаров Ozon */
  marketplaceOzonProductGroups: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.MarketplaceProductGroupPage;
  };
  /** GET /api/v1/marketplace/ozon/products — Получить товары Ozon */
  marketplaceOzonProducts: {
    params: Record<string, never>;
    query: { "activity"?: "active" | "idle"; "group"?: string; "page"?: number; "page_size"?: number; "q"?: string; "search"?: string; "sort"?: "orders_desc" | "orders_asc" | "stock_desc" | "stock_asc"; "status"?: string; "store"?: string; "subject"?: string };
    body: never;
    response: models.MarketplaceOzonProductPage;
  };
  /** GET /api/v1/marketplace/ozon/promotions — Получить акции Ozon */
  marketplaceOzonPromotions: {
    params: Record<string, never>;
    query: { "group"?: string; "store"?: string };
    body: never;
    response: models.MarketplaceOzonPromotions;
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
    query: { "all"?: "1"; "key_info"?: "1"; "reports"?: "1" };
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
  /** POST /api/v1/marketplace/{platform}/stores/{id}/catalog/preview — Показать разбор каталога магазина без записи */
  marketplacePreviewCatalogImport: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "wildberries" | "yandex" };
    query: Record<string, never>;
    body: never;
    response: models.MarketplaceCatalogImportResult;
  };
  /** POST /api/v1/marketplace/{platform}/opening-stock/preview — Оценить начальный остаток склада площадки */
  marketplacePreviewPlatformOpening: {
    params: { "platform": "ozon" | "wildberries" };
    query: Record<string, never>;
    body: models.MarketplaceOpeningRequest;
    response: models.MarketplaceOpeningView;
  };
  /** DELETE /api/v1/marketplace/ozon/product-groups/{id}/items — Убрать товар из среза Ozon */
  marketplaceRemoveOzonProductGroupItem: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MarketplaceProductGroupItem;
    response: models.OK;
  };
  /** DELETE /api/v1/marketplace/wb/product-groups/{id}/items — Убрать товар из среза Wildberries */
  marketplaceRemoveWbProductGroupItem: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MarketplaceProductGroupItem;
    response: models.OK;
  };
  /** POST /api/v1/marketplace/{platform}/stores/{id}/catalog/matches/reopen — Вернуть карточки площадки в разбор */
  marketplaceReopenCatalogMatches: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "wildberries" | "yandex" };
    query: Record<string, never>;
    body: models.MarketplaceCatalogMatchSelection;
    response: models.MarketplaceCatalogMatchResult;
  };
  /** POST /api/v1/marketplace/{platform}/stores/{id}/finance/weeks/{weekStart}/repost — Перепровести неделю */
  marketplaceRepostWeeklyFinanceRun: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "wildberries"; "weekStart": string };
    query: Record<string, never>;
    body: never;
    response: models.MarketplaceWeeklyFinanceOutcome;
  };
  /** POST /api/v1/marketplace/{platform}/stores/{id}/catalog/retry — Повторить первоначальную загрузку каталога */
  marketplaceRetryCatalogImport: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "wildberries" | "yandex" };
    query: Record<string, never>;
    body: never;
    response: models.MarketplaceCatalogJob;
  };
  /** PUT /api/v1/marketplace/{platform}/stores/{id}/accounting — Сохранить настройки учёта магазина */
  marketplaceSaveStoreAccounting: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "wildberries" | "yandex" };
    query: Record<string, never>;
    body: models.MarketplaceStoreAccountingInput;
    response: models.MarketplaceStoreAccounting;
  };
  /** GET /api/v1/marketplace/usage — Получить время в разделах маркетплейсов */
  marketplaceSectionUsage: {
    params: Record<string, never>;
    query: { "days"?: number };
    body: never;
    response: models.MarketplaceSectionUsageList;
  };
  /** POST /api/v1/marketplace/yandex/cost — Задать себестоимость товара Яндекс Маркета */
  marketplaceSetYandexCost: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarketplaceYandexCostInput;
    response: models.MarketplaceYandexCost;
  };
  /** POST /api/v1/marketplace/{platform}/stores/{id}/catalog/matches/skip — Пропустить карточки площадки */
  marketplaceSkipCatalogMatches: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "wildberries" | "yandex" };
    query: Record<string, never>;
    body: models.MarketplaceCatalogMatchSelection;
    response: models.MarketplaceCatalogMatchResult;
  };
  /** POST /api/v1/marketplace/{platform}/stores/{id}/summary/recompute — Пересчитать данные площадки магазина */
  marketplaceStartStoreSummaryRecompute: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "wildberries" };
    query: Record<string, never>;
    body: models.MarketplaceSummaryRecomputeRequest;
    response: models.MarketplaceSummaryRun;
  };
  /** GET /api/v1/marketplace/{platform}/stores/{id}/summary/status — Получить состояние пересчёта данных площадки магазина */
  marketplaceStoreSummaryStatus: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "wildberries" };
    query: Record<string, never>;
    body: never;
    response: models.MarketplaceSummaryRun;
  };
  /** GET /api/v1/marketplace/{platform}/supply-receipts — Получить поставки площадки */
  marketplaceSupplyReceiptList: {
    params: { "platform": "ozon" | "wildberries" };
    query: { "company_id"?: models.UUID; "q"?: string; "store_id"?: models.UUID };
    body: never;
    response: models.MarketplaceSupplyReceiptView;
  };
  /** POST /api/v1/marketplace/{platform}/supply-shipments — Завести отгрузку на маркетплейс по поставке */
  marketplaceSupplyShipmentCreate: {
    params: { "platform": "ozon" | "wildberries" };
    query: Record<string, never>;
    body: models.MarketplaceSupplyShipmentCreateInput;
    response: models.MarketplaceSupplyShipmentDraft;
  };
  /** POST /api/v1/marketplace/{platform}/stores/{id}/catalog/matches/unlink — Отвязать карточки площадки от товаров */
  marketplaceUnlinkCatalogMatches: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "wildberries" | "yandex" };
    query: Record<string, never>;
    body: models.MarketplaceCatalogMatchSelection;
    response: models.MarketplaceCatalogMatchResult;
  };
  /** PATCH /api/v1/marketplace/ozon/product-groups/{id} — Переименовать или перекрасить срез товаров Ozon */
  marketplaceUpdateOzonProductGroup: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MarketplaceProductGroupPatch;
    response: models.MarketplaceProductGroup;
  };
  /** PATCH /api/v1/marketplace/ozon/stores/{id} — Изменить магазин Ozon */
  marketplaceUpdateOzonStore: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MarketplaceStorePatch;
    response: models.MarketplaceStore;
  };
  /** PATCH /api/v1/marketplace/wb/product-groups/{id} — Переименовать или перекрасить срез товаров Wildberries */
  marketplaceUpdateWbProductGroup: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MarketplaceProductGroupPatch;
    response: models.MarketplaceProductGroup;
  };
  /** PATCH /api/v1/marketplace/wb/stores/{id} — Изменить магазин Wildberries */
  marketplaceUpdateWbStore: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MarketplaceStorePatch;
    response: models.MarketplaceStore;
  };
  /** PATCH /api/v1/marketplace/yandex/stores/{id} — Изменить магазин Яндекс Маркета */
  marketplaceUpdateYandexStore: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MarketplaceStorePatch;
    response: models.MarketplaceStore;
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
  /** POST /api/v1/marketplace/wb/ads-absence — Подтвердить, что рекламы не было */
  marketplaceWbConfirmAdsAbsence: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarketplaceAdsAbsenceRequest;
    response: models.MarketplaceAdsAbsence;
  };
  /** GET /api/v1/marketplace/wb/decomposition — Получить декомпозицию прибыли Wildberries */
  marketplaceWbDecomposition: {
    params: Record<string, never>;
    query: { "brand"?: string; "from"?: string; "group"?: string; "month"?: string; "store"?: string; "subject"?: string; "to"?: string };
    body: never;
    response: models.MarketplaceWbDecomposition;
  };
  /** GET /api/v1/marketplace/wb/decomposition-other — Расшифровать строку «Прочее» Wildberries */
  marketplaceWbDecompositionOther: {
    params: Record<string, never>;
    query: { "from": string; "store"?: string; "to": string };
    body: never;
    response: models.MarketplaceWbDecompOther;
  };
  /** GET /api/v1/marketplace/wb/fbs — Получить отгрузку FBS Wildberries */
  marketplaceWbFbs: {
    params: Record<string, never>;
    query: { "group"?: string; "store"?: string };
    body: never;
    response: models.MarketplaceWbFbs;
  };
  /** GET /api/v1/marketplace/wb/funnel — Получить воронку продаж Wildberries */
  marketplaceWbFunnel: {
    params: Record<string, never>;
    query: { "ext"?: number; "store"?: models.UUID };
    body: never;
    response: models.MarketplaceWbFunnel;
  };
  /** GET /api/v1/marketplace/wb/funnel-daily — Получить дневную экономику артикула Wildberries */
  marketplaceWbFunnelDaily: {
    params: Record<string, never>;
    query: { "days"?: number; "fresh"?: "1"; "from"?: string; "groupBy"?: "subject" | "model" | "brand" | "article"; "groupMetrics"?: string; "pulseLimit"?: number; "pulseOffset"?: number; "pulseQuery"?: string; "pulseSort"?: "orders" | "alerts"; "sku"?: string; "slice"?: "article" | "store" | "list" | "model" | "brand" | "subject"; "sliceValue"?: string; "store"?: string; "summary"?: "1"; "to"?: string; "view"?: "pulse" };
    body: never;
    response: models.MarketplaceWbFunnelDaily;
  };
  /** GET /api/v1/marketplace/wb/orders/overview — Получить сводку заказов и продаж Wildberries */
  marketplaceWbOrdersOverview: {
    params: Record<string, never>;
    query: { "fresh"?: "1"; "from"?: string; "store"?: string; "summary"?: "1"; "to"?: string };
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
  /** GET /api/v1/marketplace/wb/pricing — Получить ценообразование Wildberries */
  marketplaceWbPricing: {
    params: Record<string, never>;
    query: { "store"?: string };
    body: never;
    response: models.MarketplaceWbPricing;
  };
  /** GET /api/v1/marketplace/wb/product-facets — Получить значения фильтров товаров Wildberries */
  marketplaceWbProductFacets: {
    params: Record<string, never>;
    query: { "store"?: string };
    body: never;
    response: models.MarketplaceWbFacets;
  };
  /** GET /api/v1/marketplace/wb/product-groups/{id}/items — Получить состав среза товаров Wildberries */
  marketplaceWbProductGroupItems: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarketplaceProductGroupItemPage;
  };
  /** GET /api/v1/marketplace/wb/product-groups — Получить срезы товаров Wildberries */
  marketplaceWbProductGroups: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.MarketplaceProductGroupPage;
  };
  /** GET /api/v1/marketplace/wb/products — Получить товары Wildberries */
  marketplaceWbProducts: {
    params: Record<string, never>;
    query: { "activity"?: "active" | "idle"; "brand"?: string; "group"?: string; "page"?: number; "page_size"?: number; "q"?: string; "search"?: string; "sort"?: "orders_desc" | "orders_asc" | "stock_desc" | "stock_asc"; "store"?: string; "subject"?: string };
    body: never;
    response: models.MarketplaceWbProductPage;
  };
  /** GET /api/v1/marketplace/wb/promotions — Получить акции Wildberries */
  marketplaceWbPromotions: {
    params: Record<string, never>;
    query: { "store"?: string };
    body: never;
    response: models.MarketplaceWbPromotions;
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
    query: { "all"?: "1"; "key_info"?: "1"; "reports"?: "1" };
    body: never;
    response: models.MarketplaceStorePage;
  };
  /** GET /api/v1/marketplace/{platform}/stores/{id}/finance/weeks/history — Получить историю недель магазина в учёте */
  marketplaceWeeklyFinanceHistory: {
    params: { "id": models.UUID; "platform": "ozon" | "wb" | "wildberries" };
    query: Record<string, never>;
    body: never;
    response: models.MarketplaceWeekHistory;
  };
  /** GET /api/v1/marketplace/yandex/funnel-daily — Получить показатели Яндекс Маркета по дням */
  marketplaceYandexFunnelDaily: {
    params: Record<string, never>;
    query: { "days"?: number; "fresh"?: "1"; "from"?: string; "groupBy"?: "subject" | "model" | "brand" | "article"; "groupMetrics"?: string; "pulseLimit"?: number; "pulseOffset"?: number; "pulseQuery"?: string; "pulseSort"?: "orders" | "alerts"; "scope"?: "all"; "sku"?: string; "slice"?: "article" | "store" | "model" | "brand" | "subject"; "sliceValue"?: string; "store"?: string; "summary"?: "1"; "to"?: string; "view"?: "pulse" };
    body: never;
    response: models.MarketplaceWbFunnelDaily;
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
  /** GET /api/v1/marketplace/yandex/stocks — Получить остатки Яндекс Маркета по складам */
  marketplaceYandexStocks: {
    params: Record<string, never>;
    query: { "group"?: string; "q"?: string; "search"?: string; "store"?: string };
    body: never;
    response: models.MarketplaceOzonStocksPage;
  };
  /** GET /api/v1/marketplace/yandex/stores — Получить магазины Яндекс Маркета */
  marketplaceYandexStores: {
    params: Record<string, never>;
    query: { "all"?: "1"; "key_info"?: "1"; "reports"?: "1" };
    body: never;
    response: models.MarketplaceStorePage;
  };
  /** POST /api/v1/marking/documents/{type}/{id}/codes/accept-expected — Принять коды маркировки по входящему УПД */
  markingAcceptExpectedCodes: {
    params: { "id": models.UUID; "type": "stock_receipt" | "stock_shipment" | "stock_transfer" | "stock_writeoff" | "stock_capitalization" | "stock_supplier_return" | "stock_customer_return" | "stock_opening_balance" | "stock_marketplace_return" | "stock_assembly" | "stock_disassembly" | "stock_condition_change" | "stock_regrade" };
    query: Record<string, never>;
    body: never;
    response: models.MarkingAcceptExpectedResult;
  };
  /** POST /api/v1/marking/documents/{type}/{id}/codes/list — Добавить марки списком в складской документ */
  markingAddDocumentCodesList: {
    params: { "id": models.UUID; "type": "stock_receipt" | "stock_shipment" | "stock_transfer" | "stock_writeoff" | "stock_capitalization" | "stock_supplier_return" | "stock_customer_return" | "stock_opening_balance" | "stock_marketplace_return" | "stock_assembly" | "stock_disassembly" | "stock_condition_change" | "stock_regrade" };
    query: Record<string, never>;
    body: models.MarkingCodesListInput;
    response: models.MarkingCodesListResult;
  };
  /** POST /api/v1/marking/remarks/{id}/items — Добавить в перемаркировку */
  markingAddRemarkItems: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MarkingRemarkItemsInput;
    response: models.MarkingRemark;
  };
  /** DELETE /api/v1/marking/label-templates/{id} — Убрать шаблон этикетки в архив */
  markingArchiveLabelTemplate: {
    params: { "id": string };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/marking/remarks/{id}/cancel — Отменить перемаркировку */
  markingCancelRemark: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingRemark;
  };
  /** POST /api/v1/marking/cises/info — Проверить коды в ГИС МТ */
  markingCheckCodes: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarkingCisesInfoInput;
    response: models.MarkingCisInfoList;
  };
  /** POST /api/v1/marking/boxes/{id}/close — Закрыть короб */
  markingCloseBox: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingBoxCard;
  };
  /** POST /api/v1/marking/orders/{id}/close — Закрыть заказ кодов в СУЗ */
  markingCloseOrder: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MarkingCloseOrderRequest;
    response: models.MarkingCodeOrderEnvelope;
  };
  /** GET /api/v1/marking/codes/sync — Получить ход загрузки кодов из ЧЗ */
  markingCodeSyncState: {
    params: Record<string, never>;
    query: { "company": models.UUID };
    body: never;
    response: models.MarkingCodeSyncState;
  };
  /** POST /api/v1/marking/boxes — Завести короб */
  markingCreateBox: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarkingBoxCreateInput;
    response: models.MarkingBoxCard;
  };
  /** POST /api/v1/marking/gismt/document-drafts — Подготовить черновик документа ГИС МТ */
  markingCreateDocumentDraft: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarkingDocumentDraftInput;
    response: models.MarkingDocumentDraftEnvelope;
  };
  /** POST /api/v1/marking/label-templates — Создать шаблон этикетки */
  markingCreateLabelTemplate: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarkingLabelTemplateInput;
    response: models.MarkingLabelTemplateRecord;
  };
  /** POST /api/v1/marking/orders — Заказать коды маркировки в СУЗ */
  markingCreateOrder: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarkingOrderInput;
    response: models.MarkingCodeOrderEnvelope;
  };
  /** POST /api/v1/marking/remarks — Начать перемаркировку */
  markingCreateRemark: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarkingRemarkInput;
    response: models.MarkingRemark;
  };
  /** POST /api/v1/marking/remarks/{id}/document — Собрать документ ЧЗ перемаркировки */
  markingCreateRemarkDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MarkingRemarkDocumentInput;
    response: models.MarkingDocumentDraftEnvelope;
  };
  /** DELETE /api/v1/marking/applications/{id} — Удалить неотправленный отчёт о нанесении */
  markingDeleteApplication: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/marking/company-groups/{company}/{group} — Убрать товарную группу у юрлица */
  markingDeleteCompanyGroup: {
    params: { "company": models.UUID; "group": string };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/marking/gismt/document-drafts/{id} — Удалить неотправленный черновик документа ГИС МТ */
  markingDeleteDocumentDraft: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/marking/products/{id}/profile — Сбросить реквизиты маркировки товара */
  markingDeleteProductProfile: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/marking/boxes/{id}/disband — Расформировать короб */
  markingDisbandBox: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingBoxDraftResult;
  };
  /** GET /api/v1/marking/gismt/distance-queue — Получить очередь вывода из оборота по продажам FBS */
  markingDistanceQueue: {
    params: Record<string, never>;
    query: { "company"?: models.UUID };
    body: never;
    response: models.MarkingDistanceQueue;
  };
  /** GET /api/v1/marking/document-summaries — Получить сводку марок складских документов */
  markingDocumentSummaries: {
    params: Record<string, never>;
    query: { "ids": string };
    body: never;
    response: models.MarkingDocumentSummaryList;
  };
  /** POST /api/v1/marking/codes/find — Найти код реестра по скану без криптохвоста */
  markingFindCode: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarkingFindCodeInput;
    response: models.MarkingFoundCode;
  };
  /** GET /api/v1/marking/labels/assembly — Узнать, что напечатает «Печать для сборки» */
  markingGetAssemblyLabelPlan: {
    params: Record<string, never>;
    query: { "channel"?: string; "document_id": models.UUID; "document_type": string };
    body: never;
    response: models.MarkingAssemblyLabelPlan;
  };
  /** GET /api/v1/marking/boxes/{id} — Получить карточку короба */
  markingGetBox: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingBoxCard;
  };
  /** GET /api/v1/marking/boxes/{id}/contents — Получить коды единиц короба */
  markingGetBoxContents: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingBoxContent;
  };
  /** GET /api/v1/marking/company-settings/{company_id} — Получить настройки маркировки юрлица */
  markingGetCompanySettings: {
    params: { "company_id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingCompanySettingsView;
  };
  /** GET /api/v1/marking/documents/{type}/{id}/codes — Получить коды маркировки складского документа */
  markingGetDocumentCodes: {
    params: { "id": models.UUID; "type": "stock_receipt" | "stock_shipment" | "stock_transfer" | "stock_writeoff" | "stock_capitalization" | "stock_supplier_return" | "stock_customer_return" | "stock_opening_balance" | "stock_marketplace_return" | "stock_assembly" | "stock_disassembly" | "stock_condition_change" | "stock_regrade" };
    query: Record<string, never>;
    body: never;
    response: models.MarkingDocumentCodes;
  };
  /** GET /api/v1/marking/gismt/documents/{id} — Получить карточку документа ГИС МТ */
  markingGetGISMTDocument: {
    params: { "id": string };
    query: { "company": models.UUID; "group"?: string };
    body: never;
    response: models.MarkingGISMTDocumentView;
  };
  /** GET /api/v1/marking/inventories/{id}/codes — Получить пересчёт марок инвентаризации */
  markingGetInventoryCodes: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingInventoryCodes;
  };
  /** GET /api/v1/marking/label-prints/{file} — Скачать файл этикеток */
  markingGetLabelPrintFile: {
    params: { "file": string };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/marking/label-templates/{id} — Получить шаблон этикетки */
  markingGetLabelTemplate: {
    params: { "id": string };
    query: Record<string, never>;
    body: never;
    response: models.MarkingLabelTemplateRecord;
  };
  /** GET /api/v1/marking/label-templates/{id}/usage — Где используется шаблон этикетки */
  markingGetLabelTemplateUsage: {
    params: { "id": string };
    query: Record<string, never>;
    body: never;
    response: models.MarkingLabelTemplateUsage;
  };
  /** GET /api/v1/marking/label-prints/{company}/{file} — Скачать файл этикеток марок */
  markingGetMarkingLabelPrintFile: {
    params: { "company": models.UUID; "file": string };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/marking/orders/{id} — Получить заказ кодов */
  markingGetOrder: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingCodeOrderEnvelope;
  };
  /** GET /api/v1/marking/orders/{id}/codes — Получить коды заказа с номерами и состоянием */
  markingGetOrderCodes: {
    params: { "id": models.UUID };
    query: { "from"?: number; "gtin"?: string; "limit"?: number; "offset"?: number; "state"?: models.MarkingCodeState; "to"?: number };
    body: never;
    response: models.MarkingOrderCodes;
  };
  /** GET /api/v1/marking/products/{id}/profile — Получить профиль маркировки товара */
  markingGetProductProfile: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingProductProfileEnvelope;
  };
  /** GET /api/v1/marking/remarks/{id} — Получить перемаркировку */
  markingGetRemark: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingRemark;
  };
  /** POST /api/v1/marking/codes/import/stored-file — Загрузить файл кодов из «Файлов» кабинета */
  markingImportStoredCodesFile: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarkingStoredFileImportInput;
    response: models.MarkingImport;
  };
  /** PUT /api/v1/marking/remarks/{id}/order — Привязать заказ новых кодов */
  markingLinkRemarkOrder: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MarkingRemarkOrderInput;
    response: models.MarkingRemark;
  };
  /** GET /api/v1/marking/connections/{company_id}/balance — Получить баланс лицевых счетов «Честного знака» */
  markingListBalances: {
    params: { "company_id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingBalanceList;
  };
  /** GET /api/v1/marking/boxes — Получить короба */
  markingListBoxes: {
    params: Record<string, never>;
    query: { "company"?: models.UUID; "limit"?: number; "offset"?: number; "q"?: string; "status"?: "assembling" | "closed" | "signing" | "sent" | "accepted" | "rejected" | "disbanding" | "disbanded" | "received" | "all" };
    body: never;
    response: models.MarkingBoxList;
  };
  /** GET /api/v1/marking/codes/imports — Получить журнал загрузок кодов */
  markingListCodeImports: {
    params: Record<string, never>;
    query: { "id"?: models.UUID; "limit"?: number; "offset"?: number };
    body: never;
    response: models.MarkingImportPage;
  };
  /** GET /api/v1/marking/codes — Получить реестр кодов маркировки */
  markingListCodes: {
    params: Record<string, never>;
    query: { "after"?: string; "company"?: models.UUID; "full_code"?: boolean; "group"?: string; "id"?: models.UUID; "import"?: models.UUID; "limit"?: number; "locations"?: boolean; "offset"?: number; "order"?: models.UUID; "printed"?: boolean; "product"?: models.UUID; "q"?: string; "skip_total"?: boolean; "status"?: string };
    body: never;
    response: models.MarkingCodePage;
  };
  /** GET /api/v1/marking/companies — Получить юрлица кабинета для маркировки */
  markingListCompanies: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.MarkingCompanyList;
  };
  /** GET /api/v1/marking/company-groups — Получить товарные группы юрлиц */
  markingListCompanyGroups: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.MarkingCompanyGroupList;
  };
  /** GET /api/v1/marking/connections — Получить подключения юрлиц к ГИС МТ и СУЗ */
  markingListConnections: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.MarkingConnectionList;
  };
  /** GET /api/v1/marking/gismt/documents — Получить документы юрлица в ГИС МТ */
  markingListGISMTDocuments: {
    params: Record<string, never>;
    query: { "company": models.UUID; "group"?: string; "limit"?: number };
    body: never;
    response: models.MarkingGISMTDocumentList;
  };
  /** GET /api/v1/marking/groups — Получить товарные группы ГИС МТ */
  markingListGroups: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.MarkingGroupList;
  };
  /** GET /api/v1/marking/labels/barcodes — Получить штрихкоды товаров для печати этикеток */
  markingListLabelBarcodes: {
    params: Record<string, never>;
    query: { "product_ids": string };
    body: never;
    response: models.MarkingLabelBarcodes;
  };
  /** GET /api/v1/marking/label-defaults — Получить шаблоны этикеток по умолчанию */
  markingListLabelDefaults: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.MarkingLabelDefaults;
  };
  /** GET /api/v1/marking/label-templates — Получить шаблоны этикеток */
  markingListLabelTemplateRecords: {
    params: Record<string, never>;
    query: { "inactive"?: boolean; "kind"?: "" | "marking" | "product" };
    body: never;
    response: models.MarkingLabelTemplateList;
  };
  /** GET /api/v1/marking/labels/templates — Получить шаблоны этикеток и пределы печати */
  markingListLabelTemplates: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.MarkingLabelTemplates;
  };
  /** GET /api/v1/marking/connections/{company_id}/mods — Получить места осуществления деятельности юрлица */
  markingListMods: {
    params: { "company_id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingModList;
  };
  /** GET /api/v1/marking/orders — Получить заказы кодов в СУЗ */
  markingListOrders: {
    params: Record<string, never>;
    query: { "company"?: models.UUID; "limit"?: number; "offset"?: number };
    body: never;
    response: models.MarkingCodeOrderPage;
  };
  /** GET /api/v1/marking/gismt/outbox — Получить исходящие документы ГИС МТ */
  markingListOutbox: {
    params: Record<string, never>;
    query: { "basis"?: models.UUID; "company"?: models.UUID; "limit"?: number; "offset"?: number };
    body: never;
    response: models.MarkingOutboxPage;
  };
  /** GET /api/v1/marking/remarks — Получить перемаркировки юрлица */
  markingListRemarks: {
    params: Record<string, never>;
    query: { "company": models.UUID; "limit"?: number; "offset"?: number; "open"?: boolean };
    body: never;
    response: models.MarkingRemarkList;
  };
  /** POST /api/v1/marking/remarks/{id}/pair — Связать новую марку с парой */
  markingPairRemarkCode: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MarkingRemarkPairInput;
    response: models.MarkingRemark;
  };
  /** POST /api/v1/marking/codes/parse — Разобрать код маркировки без записи */
  markingParseCode: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarkingParseCodeInput;
    response: models.MarkingParsedCode;
  };
  /** POST /api/v1/marking/connections/{company_id}/oms/ping — Проверить связь с СУЗ */
  markingPingOMS: {
    params: { "company_id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingConnectionEnvelope;
  };
  /** POST /api/v1/marking/labels/assembly/file — Напечатать этикетки для сборки файлом по адресу */
  markingPrintAssemblyLabelsFile: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarkingAssemblyLabelRequest;
    response: models.MarkingLabelFile;
  };
  /** POST /api/v1/marking/labels/file — Напечатать этикетки марок файлом по адресу */
  markingPrintLabelsFile: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarkingLabelRequest;
    response: models.MarkingLabelFile;
  };
  /** POST /api/v1/marking/labels/products/file — Напечатать этикетки товаров файлом по адресу */
  markingPrintProductLabelsFile: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarkingProductLabelRequest;
    response: models.MarkingLabelFile;
  };
  /** POST /api/v1/marking/orders/{id}/receive — Получить готовые коды заказа в реестр */
  markingReceiveOrderCodes: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingOrderReceiveResult;
  };
  /** GET /api/v1/marking/reconcile/{id}/items — Получить расхождения сверки с ЧЗ */
  markingReconcileItems: {
    params: { "id": models.UUID };
    query: { "kind"?: "stock_only" | "gismt_only" | "status_mismatch"; "limit"?: number; "offset"?: number; "reason"?: models.MarkingReconcileReason; "resolved"?: boolean };
    body: never;
    response: models.MarkingReconcileItemPage;
  };
  /** GET /api/v1/marking/reconcile — Получить ход сверки с ЧЗ */
  markingReconcileState: {
    params: Record<string, never>;
    query: { "company": models.UUID };
    body: never;
    response: models.MarkingReconcileState;
  };
  /** POST /api/v1/marking/applications/{id}/refresh — Обновить статус отчёта о нанесении из СУЗ */
  markingRefreshApplication: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingApplicationEnvelope;
  };
  /** POST /api/v1/marking/gismt/outbox/{id}/refresh — Обновить статус исходящего документа из ГИС МТ */
  markingRefreshOutboxDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingOutboxDocumentEnvelope;
  };
  /** DELETE /api/v1/marking/boxes/{id}/items/{code_id} — Вынуть код из короба */
  markingRemoveBoxItem: {
    params: { "code_id": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingBoxCard;
  };
  /** DELETE /api/v1/marking/documents/{type}/{id}/codes/{code_id} — Убрать код из складского документа */
  markingRemoveDocumentCode: {
    params: { "code_id": models.UUID; "id": models.UUID; "type": "stock_receipt" | "stock_shipment" | "stock_transfer" | "stock_writeoff" | "stock_capitalization" | "stock_supplier_return" | "stock_customer_return" | "stock_opening_balance" | "stock_marketplace_return" | "stock_assembly" | "stock_disassembly" | "stock_condition_change" | "stock_regrade" };
    query: Record<string, never>;
    body: never;
    response: models.MarkingDocumentCodes;
  };
  /** DELETE /api/v1/marking/inventories/{id}/codes/{code_id} — Убрать отсканированную марку из инвентаризации */
  markingRemoveInventoryCode: {
    params: { "code_id": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingInventoryRemoveResult;
  };
  /** DELETE /api/v1/marking/remarks/{id}/items/{item_id} — Убрать строку перемаркировки */
  markingRemoveRemarkItem: {
    params: { "id": models.UUID; "item_id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingRemark;
  };
  /** POST /api/v1/marking/boxes/{id}/reopen — Открыть короб снова */
  markingReopenBox: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingBoxCard;
  };
  /** POST /api/v1/marking/orders/{id}/rejects/reparse — Разобрать заново неразобранные коды заказа */
  markingReparseOrderRejects: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingOrderReparseResult;
  };
  /** PUT /api/v1/marking/documents/{type}/{id}/codes — Заменить коды складского документа целиком */
  markingReplaceDocumentCodes: {
    params: { "id": models.UUID; "type": "stock_receipt" | "stock_shipment" | "stock_transfer" | "stock_writeoff" | "stock_capitalization" | "stock_supplier_return" | "stock_customer_return" | "stock_opening_balance" | "stock_marketplace_return" | "stock_assembly" | "stock_disassembly" | "stock_condition_change" | "stock_regrade" };
    query: Record<string, never>;
    body: models.MarkingReplaceCodesInput;
    response: models.MarkingDocumentCodes;
  };
  /** POST /api/v1/marking/boxes/{id}/report — Подготовить отчёт о формировании упаковки */
  markingReportBox: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingBoxDraftResult;
  };
  /** POST /api/v1/marking/boxes/resolve — Получить состав короба по скану SSCC */
  markingResolveBox: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarkingBoxResolveInput;
    response: models.MarkingBoxContent;
  };
  /** POST /api/v1/marking/gismt/distance-queue/unmarked/resolve — Закрыть заказы FBS, отгруженные без марок */
  markingResolveFbsUnmarked: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarkingUnmarkedResolveInput;
    response: models.MarkingUnmarkedResolveResult;
  };
  /** PUT /api/v1/marking/reconcile/items/{id}/resolution — Отметить расхождение сверки разобранным */
  markingResolveReconcileItem: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MarkingReconcileResolveInput;
    response: models.MarkingReconcileItem;
  };
  /** POST /api/v1/marking/label-templates/{id}/restore — Вернуть шаблон этикетки из архива */
  markingRestoreLabelTemplate: {
    params: { "id": string };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/marking/gismt/return-queue — Получить очередь возврата в оборот по невыкупам FBS */
  markingReturnQueue: {
    params: Record<string, never>;
    query: { "company"?: models.UUID };
    body: never;
    response: models.MarkingReturnQueue;
  };
  /** PUT /api/v1/marking/company-groups — Включить товарную группу юрлицу */
  markingSaveCompanyGroup: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarkingCompanyGroupInput;
    response: models.MarkingCompanyGroup;
  };
  /** PUT /api/v1/marking/company-settings/{company_id} — Сохранить настройки маркировки юрлица */
  markingSaveCompanySettings: {
    params: { "company_id": models.UUID };
    query: Record<string, never>;
    body: models.MarkingCompanySettings;
    response: models.MarkingCompanySettingsEnvelope;
  };
  /** PUT /api/v1/marking/products/{id}/profile — Задать реквизиты маркировки товара */
  markingSaveProductProfile: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MarkingProductProfileInput;
    response: models.MarkingProductProfileEnvelope;
  };
  /** POST /api/v1/marking/documents/{type}/{id}/codes/scan-box — Отсканировать короб в складской документ */
  markingScanBoxIntoDocument: {
    params: { "id": models.UUID; "type": "stock_receipt" | "stock_shipment" | "stock_transfer" | "stock_writeoff" | "stock_capitalization" | "stock_supplier_return" | "stock_customer_return" | "stock_opening_balance" | "stock_marketplace_return" | "stock_assembly" | "stock_disassembly" | "stock_condition_change" | "stock_regrade" };
    query: Record<string, never>;
    body: models.MarkingBoxScanInput;
    response: models.MarkingBoxDocumentScanResult;
  };
  /** POST /api/v1/marking/inventories/{id}/codes/scan-box — Отсканировать короб в инвентаризацию */
  markingScanBoxIntoInventory: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MarkingBoxScanInput;
    response: models.MarkingBoxInventoryScanResult;
  };
  /** POST /api/v1/marking/documents/{type}/{id}/codes/scan — Отсканировать код в складской документ */
  markingScanDocumentCode: {
    params: { "id": models.UUID; "type": "stock_receipt" | "stock_shipment" | "stock_transfer" | "stock_writeoff" | "stock_capitalization" | "stock_supplier_return" | "stock_customer_return" | "stock_opening_balance" | "stock_marketplace_return" | "stock_assembly" | "stock_disassembly" | "stock_condition_change" | "stock_regrade" };
    query: Record<string, never>;
    body: models.MarkingScanDocumentInput;
    response: models.MarkingScanDocumentResult;
  };
  /** POST /api/v1/marking/boxes/{id}/scan — Отсканировать марку в короб */
  markingScanIntoBox: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MarkingBoxScanInput;
    response: models.MarkingBoxScanResult;
  };
  /** POST /api/v1/marking/inventories/{id}/codes/scan — Отсканировать марку в инвентаризацию */
  markingScanInventoryCode: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MarkingInventoryScanInput;
    response: models.MarkingInventoryScanResult;
  };
  /** POST /api/v1/marking/gismt/codes — Найти коды юрлица в ГИС МТ */
  markingSearchGISMTCodes: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarkingGISMTCodesInput;
    response: models.MarkingGISMTCodePage;
  };
  /** PUT /api/v1/marking/label-defaults — Задать шаблон этикетки по умолчанию */
  markingSetLabelDefault: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarkingLabelDefaultInput;
    response: models.MarkingLabelDefaults;
  };
  /** PUT /api/v1/marking/label-templates/{id}/usage — Задать, где используется шаблон этикетки */
  markingSetLabelTemplateUsage: {
    params: { "id": string };
    query: Record<string, never>;
    body: models.MarkingLabelTemplateUsage;
    response: models.MarkingLabelTemplateUsage;
  };
  /** GET /api/v1/marking/document-summaries/short — Посчитать документы без всех марок */
  markingShortDocumentCounts: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.MarkingShortDocumentCounts;
  };
  /** GET /api/v1/marking/gismt/sign-duties — Получить мои дела подписи в «Честном знаке» */
  markingSignDuties: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.MarkingSignDuties;
  };
  /** POST /api/v1/marking/orders/{id}/codes/spoil — Отметить коды заказа испорченными */
  markingSpoilOrderCodes: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MarkingSpoilInput;
    response: models.MarkingSpoilOrderCodesResponse;
  };
  /** POST /api/v1/marking/codes/sync — Обновить коды юрлица из ЧЗ */
  markingStartCodeSync: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarkingCodeSyncInput;
    response: models.MarkingCodeSyncStarted;
  };
  /** POST /api/v1/marking/reconcile — Сверить коды склада юрлица с ЧЗ */
  markingStartReconcile: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarkingReconcileInput;
    response: models.MarkingReconcileStarted;
  };
  /** GET /api/v1/marking/stock-codes — Получить марки в остатке товара на складе */
  markingStockCodes: {
    params: Record<string, never>;
    query: { "limit"?: number; "offset"?: number; "product": models.UUID; "warehouse": models.UUID };
    body: never;
    response: models.MarkingStockCodes;
  };
  /** POST /api/v1/marking/remarks/{id}/swap — Заменить марку на складе */
  markingSwapRemark: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingRemark;
  };
  /** POST /api/v1/marking/orders/sync — Сверить заказы юрлица с СУЗ */
  markingSyncOrders: {
    params: Record<string, never>;
    query: { "company": models.UUID };
    body: never;
    response: models.MarkingOrderSyncResult;
  };
  /** GET /api/v1/marking/codes/trace — Найти марку и её историю */
  markingTraceCode: {
    params: Record<string, never>;
    query: { "code": string };
    body: never;
    response: models.MarkingCodeTrace;
  };
  /** POST /api/v1/marking/inventories/{id}/codes/transfer — Перенести марки инвентаризации в акты */
  markingTransferInventoryCodes: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingInventoryTransferResult;
  };
  /** DELETE /api/v1/marking/remarks/{id}/items/{item_id}/pair — Снять новую марку с пары */
  markingUnpairRemarkCode: {
    params: { "id": models.UUID; "item_id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingRemark;
  };
  /** PUT /api/v1/marking/label-templates/{id} — Изменить шаблон этикетки */
  markingUpdateLabelTemplate: {
    params: { "id": string };
    query: Record<string, never>;
    body: models.MarkingLabelTemplateUpdate;
    response: models.MarkingLabelTemplateRecord;
  };
  /** POST /api/v1/marking/gismt/document-drafts/{id}/verify — Проверить коды черновика в ГИС МТ перед подписью */
  markingVerifyDocumentDraft: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.MarkingVerifiedDraft;
  };
  /** GET /api/v1/print/forms/{kind}/{id}/download-session — Временный адрес печатной формы документа */
  printFormDownloadSession: {
    params: { "id": models.UUID; "kind": string };
    query: { "facsimile"?: boolean; "template"?: string };
    body: never;
    response: models.TransferDownloadLink;
  };
  /** POST /api/v1/settings/companies/{id}/activate — Вернуть юрлицо в работу */
  settingsActivateCompany: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/settings/role-assignments — Назначить роли участникам пачкой */
  settingsAssignMemberRoles: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.SettingsRoleAssignmentBatchInput;
    response: models.SettingsRoleAssignmentBatchResult;
  };
  /** POST /api/v1/settings/integration-connections/{provider}/check — Проверить подключение снова */
  settingsCheckIntegrationConnection: {
    params: { "provider": "yandex_kit" | "ozon_retail" | "cdek" };
    query: Record<string, never>;
    body: never;
    response: models.SettingsIntegrationConnectionEnvelope;
  };
  /** POST /api/v1/settings/field-definitions — Завести определение дополнительного поля */
  settingsCreateFieldDefinition: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.SettingsFieldDefinitionInput;
    response: models.SettingsFieldDefinition;
  };
  /** POST /api/v1/settings/members — Завести участника кабинета */
  settingsCreateMember: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.SettingsMemberCreateInput;
    response: models.SettingsMember;
  };
  /** DELETE /api/v1/settings/companies/{id} — Удалить юрлицо без операций */
  settingsDeleteCompany: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/settings/field-definitions/{id} — Удалить определение дополнительного поля */
  settingsDeleteFieldDefinition: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/settings/ai-usage — Получить расход ИИ своего кабинета */
  settingsGetAIUsage: {
    params: Record<string, never>;
    query: { "from"?: string; "to"?: string; "tz"?: string };
    body: never;
    response: models.SettingsAIUsage;
  };
  /** GET /api/v1/settings/companies/{id}/usage — Проверить, чем занято юрлицо */
  settingsGetCompanyUsage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreObjectUsage;
  };
  /** GET /api/v1/settings/field-schema — Получить действующую схему дополнительных полей */
  settingsGetFieldSchema: {
    params: Record<string, never>;
    query: { "entity_type"?: string };
    body: never;
    response: models.SettingsFieldSchema;
  };
  /** GET /api/v1/settings/roles/{id} — Получить роль кабинета */
  settingsGetRole: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.SettingsRole;
  };
  /** GET /api/v1/settings/usage — Получить потребление своего кабинета */
  settingsGetUsage: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.SettingsUsage;
  };
  /** GET /api/v1/settings/companies — Получить юрлица кабинета */
  settingsListCompanies: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.SettingsCompanyPage;
  };
  /** GET /api/v1/settings/field-definitions — Получить определения дополнительных полей */
  settingsListFieldDefinitions: {
    params: Record<string, never>;
    query: { "entity_type"?: string };
    body: never;
    response: models.SettingsFieldDefinitionPage;
  };
  /** GET /api/v1/settings/integration-connections — Подключения к платформам не-маркетплейсам */
  settingsListIntegrationConnections: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.SettingsIntegrationConnectionList;
  };
  /** GET /api/v1/settings/members — Получить участников кабинета */
  settingsListMembers: {
    params: Record<string, never>;
    query: { "status"?: "active" | "disabled" | "all" };
    body: never;
    response: models.SettingsMemberPage;
  };
  /** GET /api/v1/settings/roles/{id}/members — Получить носителей роли */
  settingsListRoleMembers: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.SettingsMemberPage;
  };
  /** GET /api/v1/settings/role-templates — Получить шаблоны ролей по функциям */
  settingsListRoleTemplates: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.SettingsRoleTemplatePage;
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
  /** GET /api/v1/settings/permission-catalog — Получить каталог прав кабинета */
  settingsPermissionCatalog: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.SettingsPermissionCatalog;
  };
  /** GET /api/v1/settings/readiness — Получить паспорт кабинета */
  settingsReadiness: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.SettingsReadinessPassport;
  };
  /** PUT /api/v1/settings/members/{id}/access — Заменить бизнесы сотрудника */
  settingsReplaceMemberAccess: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.SettingsMemberAccessInput;
    response: models.SettingsMember;
  };
  /** PUT /api/v1/settings/integration-connections/{provider} — Подключить платформу или изменить подключение */
  settingsSaveIntegrationConnection: {
    params: { "provider": "yandex_kit" | "ozon_retail" | "cdek" };
    query: Record<string, never>;
    body: models.SettingsIntegrationConnectionInput;
    response: models.SettingsIntegrationConnectionEnvelope;
  };
  /** POST /api/v1/settings/members/{id}/activation — Закрыть или вернуть доступ участника */
  settingsSetMemberActive: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.SettingsSetMemberActiveRequest;
    response: models.SettingsMember;
  };
  /** PUT /api/v1/settings/members/{id}/role — Сменить роль участника */
  settingsSetMemberRole: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.SettingsSetMemberRoleRequest;
    response: models.SettingsMember;
  };
  /** PATCH /api/v1/settings/field-definitions/{id} — Изменить определение дополнительного поля */
  settingsUpdateFieldDefinition: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.SettingsFieldDefinitionInput;
    response: models.SettingsFieldDefinition;
  };
  /** DELETE /api/v1/stock/upload-sessions/{id} — Отменить сессию загрузки склада */
  stockAbortUploadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/stock/shipments/{id}/acceptance — Провести приёмку покупателем */
  stockAcceptShipment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockShipmentAcceptanceInput;
    response: models.CoreDocument;
  };
  /** GET /api/v1/stock/account-transfers/proposal — Показать остаток запасов, который надо перенести на счёт по новому правилу */
  stockAccountTransferProposal: {
    params: Record<string, never>;
    query: { "business_id"?: models.UUID; "date": string };
    body: never;
    response: models.StockAccountTransferProposal;
  };
  /** GET /api/v1/stock/accounting/queue — Получить документы склада на подтверждение */
  stockAccountingQueue: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.StockAccountingQueue;
  };
  /** POST /api/v1/stock/warehouses/{id}/activate — Вернуть склад в работу */
  stockActivateWarehouse: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockWarehouse;
  };
  /** POST /api/v1/stock/warehouses/{id}/bins/{binId}/activate — Вернуть ячейку в работу */
  stockActivateWarehouseBin: {
    params: { "binId": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockBin;
  };
  /** POST /api/v1/stock/warehouses/{id}/staff — Закрепить людей за складом */
  stockAddWarehouseStaff: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockWarehouseStaffInput;
    response: models.StockWarehouseStaffPage;
  };
  /** POST /api/v1/stock/imports/{id}/apply — Атомарно применить подтверждённый preview */
  stockApplyImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockImportApplyRequest;
    response: models.StockImportRun;
  };
  /** POST /api/v1/stock/regrade/offer — Перенести остаток площадки на новый товар */
  stockApplyRegradeOffer: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockRegradeOfferApply;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/warehouses/{id}/zones/allocation — Разнести остаток склада по зонам */
  stockApplyWarehouseZoneAllocation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockZoneAllocationInput;
    response: models.StockZoneAllocationResult;
  };
  /** POST /api/v1/stock/documents/{id}/kit-assembly — Собрать наборы под отгрузку или перемещение */
  stockAssembleDocumentKits: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockKitAssemblyInput;
    response: models.StockKitAssemblyResult;
  };
  /** POST /api/v1/stock/condition-changes/assign — Присвоить состояние товару одним шагом */
  stockAssignCondition: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockConditionAssign;
    response: models.CoreDocument;
  };
  /** GET /api/v1/stock/batch-stock/summary — Получить сводку сроков годности */
  stockBatchStockSummary: {
    params: Record<string, never>;
    query: { "as_of"?: string; "business_id"?: models.UUID; "company_id"?: models.UUID; "product_id"?: models.UUID; "shelf_as_of"?: string; "unavailable_only"?: boolean; "warehouse_id"?: models.UUID; "warehouse_ids"?: string; "without_company"?: boolean };
    body: never;
    response: models.StockBatchStockSummary;
  };
  /** POST /api/v1/stock/carrier-shipments/{id}/cancel — Отменить отправление СДЭК */
  stockCancelCarrierShipment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockCarrierShipment;
  };
  /** POST /api/v1/stock/documents/{id}/cancel — Отменить проведение складского документа */
  stockCancelDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/imports/{id}/cancel — Отменить загрузку начальных остатков целиком */
  stockCancelImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockImportRun;
  };
  /** GET /api/v1/stock/carrier/cities — Найти город СДЭК */
  stockCarrierCities: {
    params: Record<string, never>;
    query: { "q": string };
    body: never;
    response: models.StockCarrierCityList;
  };
  /** GET /api/v1/stock/carrier/points — Получить пункты выдачи СДЭК города */
  stockCarrierPoints: {
    params: Record<string, never>;
    query: { "city_code": number; "reception"?: boolean };
    body: never;
    response: models.StockCarrierPointList;
  };
  /** GET /api/v1/stock/carrier/recipient/{id} — Получить получателя посылки по умолчанию */
  stockCarrierRecipient: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockCarrierRecipient;
  };
  /** GET /api/v1/stock/carrier/status — Узнать, подключён ли СДЭК для доставки */
  stockCarrierStatus: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.StockCarrierStatus;
  };
  /** POST /api/v1/stock/batches/series-cleanup — Разобрать серии заведённых партий */
  stockCleanupSeries: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockCleanupSeriesRequest;
    response: models.StockSeriesCleanupReport;
  };
  /** POST /api/v1/stock/shipments/{id}/discrepancy — Закрыть расхождение приёмки покупателем */
  stockCloseShipmentDiscrepancy: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockShipmentDiscrepancyInput;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/documents/{id}/close — Закрыть недовезённую закупку */
  stockCloseSupplierOrder: {
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
  /** POST /api/v1/stock/conditions — Создать состояние товара */
  stockCreateCondition: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockConditionInput;
    response: models.StockCondition;
  };
  /** POST /api/v1/stock/documents — Создать черновик складского документа */
  stockCreateDocument: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockDocumentCreate;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/expired-stock/writeoff-drafts — Создать черновики списания просроченного */
  stockCreateExpiredWriteoffDrafts: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockExpiredWriteoffDraftsInput;
    response: models.StockExpiredWriteoffDrafts;
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
  /** POST /api/v1/stock/opening-corrections — Создать черновик корректировки цены начального остатка */
  stockCreateOpeningCorrection: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockOpeningCorrectionCreate;
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
  /** POST /api/v1/stock/receipt-costs — Отнести расход на приёмки — доп. расходы на поступление */
  stockCreateReceiptCost: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockReceiptCostCreate;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/transit-shipments/{id}/receipts — Принять товар по отправке */
  stockCreateTransitReceipt: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockTransitReceiptInput;
    response: models.StockTransitDocumentResult;
  };
  /** POST /api/v1/stock/warehouses — Создать склад */
  stockCreateWarehouse: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockWarehouseInput;
    response: models.StockWarehouse;
  };
  /** POST /api/v1/stock/warehouses/{id}/bins — Завести ячейку */
  stockCreateWarehouseBin: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockBinInput;
    response: models.StockBin;
  };
  /** POST /api/v1/stock/warehouses/{id}/zones — Завести зону склада */
  stockCreateWarehouseZone: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockWarehouseZoneInput;
    response: models.StockWarehouse;
  };
  /** GET /api/v1/stock/customer-acceptances — Отгрузки, ждущие приёмки покупателем */
  stockCustomerAcceptances: {
    params: Record<string, never>;
    query: { "shipment_id"?: models.UUID; "state"?: "awaiting" | "failed" };
    body: never;
    response: models.StockCustomerAcceptanceList;
  };
  /** POST /api/v1/stock/warehouses/{id}/deactivate — Вывести склад из работы */
  stockDeactivateWarehouse: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockWarehouse;
  };
  /** POST /api/v1/stock/warehouses/{id}/bins/{binId}/deactivate — Выключить ячейку */
  stockDeactivateWarehouseBin: {
    params: { "binId": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockBin;
  };
  /** DELETE /api/v1/stock/assembly-specs/{id} — Удалить черновик версии */
  stockDeleteAssemblySpec: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/stock/conditions/{id} — Удалить состояние товара */
  stockDeleteCondition: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/stock/contact-policies/{contactId} — Удалить складские настройки контрагента */
  stockDeleteContactPolicy: {
    params: { "contactId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/stock/documents/{id} — Удалить черновик складского документа */
  stockDeleteDraftDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/stock/warehouses/{id} — Удалить неиспользованный склад */
  stockDeleteWarehouse: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/stock/documents/{id}/derive — Создать акты списания и оприходования по инвентаризации */
  stockDeriveInventoryActs: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockInventoryDeriveInput;
    response: models.StockInventoryDeriveResult;
  };
  /** POST /api/v1/stock/warehouses/{id}/transfer-receipt/disable — Выключить приход перемещением с приёмкой */
  stockDisableWarehouseTransferReceipt: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockWarehouse;
  };
  /** POST /api/v1/stock/warehouses/{id}/zones/disable — Выключить зоны склада одним действием */
  stockDisableWarehouseZones: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockZoneAllocationInput;
    response: models.StockZoneAllocationResult;
  };
  /** GET /api/v1/stock/discrepancies/summary — Получить сводку очереди расхождений */
  stockDiscrepancySummary: {
    params: Record<string, never>;
    query: { "contact_id"?: models.UUID; "date_from"?: string; "date_to"?: string; "document_id"?: models.UUID; "source"?: "receipt" | "transfer"; "warehouse_id"?: models.UUID };
    body: never;
    response: models.StockDiscrepancySummary;
  };
  /** DELETE /api/v1/stock/warehouses/{id}/zones/allocation/draft — Удалить черновик разнесения */
  stockDropWarehouseZoneAllocationDraft: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/stock/warehouses/{id}/transfer-receipt/enable — Включить приход перемещением с приёмкой */
  stockEnableWarehouseTransferReceipt: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockWarehouse;
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
  /** POST /api/v1/stock/warehouses/{id}/bins/generate — Завести ячейки пачкой по шаблону */
  stockGenerateWarehouseBins: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockBinTemplate;
    response: models.StockBinGenerateResult;
  };
  /** GET /api/v1/stock/assembly-specs/{id} — Получить версию спецификации */
  stockGetAssemblySpec: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockAssemblySpec;
  };
  /** GET /api/v1/stock/availability — Узнать свободный остаток товаров на складе */
  stockGetAvailability: {
    params: Record<string, never>;
    query: { "business_id": models.UUID; "company_id"?: models.UUID; "condition_id"?: models.UUID; "product_ids": string; "purpose"?: "assembly" | "condition_change"; "warehouse_id": models.UUID; "with_kits"?: boolean };
    body: never;
    response: models.StockAvailabilityList;
  };
  /** GET /api/v1/stock/batches/{id} — Получить партию */
  stockGetBatch: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockBatch;
  };
  /** GET /api/v1/stock/carrier-shipments/{id} — Получить отправление СДЭК */
  stockGetCarrierShipment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockCarrierShipment;
  };
  /** GET /api/v1/stock/company-policies/{companyId} — Получить складскую политику юрлица */
  stockGetCompanyPolicy: {
    params: { "companyId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockCompanyPolicy;
  };
  /** GET /api/v1/stock/conditions/{id}/usage — Узнать, что держит состояние товара */
  stockGetConditionUsage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockConditionUsage;
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
  /** GET /api/v1/stock/documents/{id}/moves — Получить перемещения товара и проводки складского документа */
  stockGetDocumentMoves: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockDocumentMoves;
  };
  /** GET /api/v1/stock/documents/{id}/shelf-life — Узнать порог остаточного срока годности документа */
  stockGetDocumentShelfLife: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockDocumentShelfLifeView;
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
    query: { "document_type"?: string; "short"?: boolean };
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
  /** GET /api/v1/stock/documents/{id}/regrade-plan — Предложить пары пересортицы по инвентаризации */
  stockGetInventoryRegradePlan: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockInventoryRegradePlan;
  };
  /** GET /api/v1/stock/report/purchases/overdue — Получить просроченные закупки */
  stockGetOverduePurchases: {
    params: Record<string, never>;
    query: { "as_of"?: string; "company_id"?: models.UUID; "limit"?: number; "warehouse_id"?: models.UUID };
    body: never;
    response: models.StockReportOverdueSupplierOrderPage;
  };
  /** GET /api/v1/stock/report/reservations/overdue — Получить просроченные резервы */
  stockGetOverdueReservations: {
    params: Record<string, never>;
    query: { "as_of"?: string; "company_id"?: models.UUID; "limit"?: number; "warehouse_id"?: models.UUID };
    body: never;
    response: models.StockReportOverduePage;
  };
  /** GET /api/v1/stock/products/{productId}/bins — Получить, в каких ячейках лежит товар */
  stockGetProductBins: {
    params: { "productId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockProductBins;
  };
  /** GET /api/v1/stock/report/purchasing — Получить отчёт потребности в закупке */
  stockGetPurchasingReport: {
    params: Record<string, never>;
    query: { "blocked_from"?: string; "blocked_to"?: string; "business_id"?: models.UUID; "company_id"?: models.UUID; "demand_from"?: string; "demand_to"?: string; "expected_from"?: string; "expected_to"?: string; "include_empty"?: boolean; "limit"?: number; "min_from"?: string; "min_to"?: string; "offset"?: number; "on_hand_from"?: string; "on_hand_to"?: string; "only_needed"?: boolean; "projected_from"?: string; "projected_to"?: string; "q"?: string; "reserved_from"?: string; "reserved_to"?: string; "suggested_from"?: string; "suggested_to"?: string; "warehouse_id"?: models.UUID };
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
  /** GET /api/v1/stock/regrade/offer — Узнать остаток прежнего товара после перепривязки карточки */
  stockGetRegradeOffer: {
    params: Record<string, never>;
    query: { "company_id"?: models.UUID; "from_product_id": models.UUID; "to_product_id": models.UUID };
    body: never;
    response: models.StockRegradeOffer;
  };
  /** GET /api/v1/stock/reorder-rules/{id} — Получить правило пополнения */
  stockGetReorderRule: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockReorderRule;
  };
  /** GET /api/v1/stock/report/reservations — Получить сводку по резервам */
  stockGetReservationSummaries: {
    params: Record<string, never>;
    query: { "as_of"?: string; "company_id"?: models.UUID; "limit"?: number; "unbacked"?: boolean; "warehouse_id"?: models.UUID };
    body: never;
    response: models.StockReportReservationPage;
  };
  /** GET /api/v1/stock/sales/{id}/pick-plan — Получить лист подбора по продаже */
  stockGetSalePickPlan: {
    params: { "id": models.UUID };
    query: { "warehouse_id"?: models.UUID };
    body: never;
    response: models.StockOrderPickPlan;
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
  /** GET /api/v1/stock/settings/overview — Получить сводку функций склада кабинета */
  stockGetSettingsOverview: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.StockSettingsOverview;
  };
  /** GET /api/v1/stock/report/stocks/{productId} — Раскрыть остаток номенклатуры до движений регистра */
  stockGetStockDrilldown: {
    params: { "productId": models.UUID };
    query: { "as_of"?: string; "below_minimum"?: boolean; "business_id"?: models.UUID; "company_id"?: models.UUID; "condition_id"?: models.UUID; "direction"?: "asc" | "desc"; "group_by"?: "condition"; "include_bins"?: boolean; "limit"?: number; "mode"?: "products" | "warehouses" | "companies" | "matrix"; "offset"?: number; "rollup_zones"?: boolean; "sort"?: "name" | "on_hand" | "physical_on_hand" | "blocked" | "unavailable" | "in_transit" | "reserved" | "available" | "expected" | "forecast" | "minimum" | "suggested" | "unit_cost" | "amount"; "warehouse_id"?: models.UUID; "warehouse_ids"?: string; "with_reserve"?: boolean; "without_company"?: boolean };
    body: never;
    response: models.StockReportDrilldown;
  };
  /** GET /api/v1/stock/report/stocks — Получить отчёт по остаткам */
  stockGetStocksReport: {
    params: Record<string, never>;
    query: { "amount_from"?: string; "amount_to"?: string; "as_of"?: string; "available_from"?: string; "available_to"?: string; "below_minimum"?: boolean; "blocked_from"?: string; "blocked_to"?: string; "business_id"?: models.UUID; "column_axis"?: "metrics" | "warehouse" | "company"; "column_limit"?: number; "column_offset"?: number; "company_id"?: models.UUID; "condition_id"?: models.UUID; "direction"?: "asc" | "desc"; "expected_from"?: string; "expected_to"?: string; "forecast_from"?: string; "forecast_to"?: string; "group_by"?: "condition"; "in_transit_from"?: string; "in_transit_to"?: string; "include_empty"?: boolean; "limit"?: number; "minimum_from"?: string; "minimum_to"?: string; "mode"?: "products" | "warehouses" | "companies" | "matrix"; "offset"?: number; "on_hand_from"?: string; "on_hand_to"?: string; "physical_on_hand_from"?: string; "physical_on_hand_to"?: string; "product_id"?: models.UUID; "product_ids"?: string; "q"?: string; "reserved_from"?: string; "reserved_to"?: string; "rollup_zones"?: boolean; "row_axis"?: "product" | "warehouse" | "company" | "warehouse_company"; "sort"?: "name" | "on_hand" | "physical_on_hand" | "blocked" | "unavailable" | "in_transit" | "reserved" | "available" | "expected" | "forecast" | "minimum" | "suggested" | "unit_cost" | "amount"; "suggested_from"?: string; "suggested_to"?: string; "unavailable_from"?: string; "unavailable_to"?: string; "unit_cost_from"?: string; "unit_cost_to"?: string; "warehouse_id"?: models.UUID; "warehouse_ids"?: string; "with_reserve"?: boolean; "without_company"?: boolean };
    body: never;
    response: models.StockReportPage;
  };
  /** GET /api/v1/stock/transit-awaiting — Получить сводку «ждут приёмки» */
  stockGetTransitAwaiting: {
    params: Record<string, never>;
    query: { "company_id"?: models.UUID; "warehouse_id"?: models.UUID };
    body: never;
    response: models.StockTransitAwaiting;
  };
  /** GET /api/v1/stock/transit-shipments/{id} — Получить отправку на склад с приёмкой */
  stockGetTransitShipment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockTransitShipment;
  };
  /** GET /api/v1/stock/transit-stock — Получить товар в пути */
  stockGetTransitStock: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.StockTransitStockList;
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
  /** GET /api/v1/stock/warehouses/{id}/bins/contents — Получить содержимое ячеек склада или зоны */
  stockGetWarehouseBinContents: {
    params: { "id": models.UUID };
    query: { "bin_id"?: models.UUID; "limit"?: number; "offset"?: number; "only_unplaced"?: boolean; "product_id"?: models.UUID; "q"?: string; "unplaced_offset"?: number };
    body: never;
    response: models.StockBinContents;
  };
  /** GET /api/v1/stock/warehouses/{id}/blockers — Проверить, можно ли вывести склад из работы */
  stockGetWarehouseBlockers: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockWarehouseBlockerCheck;
  };
  /** GET /api/v1/stock/warehouses/{id}/zones/allocation — Получить матрицу разнесения остатка по зонам */
  stockGetWarehouseZoneAllocation: {
    params: { "id": models.UUID };
    query: { "direction"?: "to_zones" | "to_warehouse" };
    body: never;
    response: models.StockZoneAllocation;
  };
  /** GET /api/v1/stock/writeoffs/{id}/request — Получить состояние заявки на списание */
  stockGetWriteoffRequest: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockWriteoffRequestState;
  };
  /** POST /api/v1/stock/documents/{id}/accounting-handoff — Передать документ склада в учёт */
  stockHandOffToAccounting: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
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
    query: { "document_type"?: string; "short"?: boolean };
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
  /** POST /api/v1/stock/writeoffs/{id}/issue — Выдать по заявке на списание */
  stockIssueWriteoff: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockDocumentPatch;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/warehouses/{id}/launch — Запустить склад */
  stockLaunchWarehouse: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockLaunchWarehouseRequest;
    response: models.StockWarehouse;
  };
  /** GET /api/v1/stock/assembly-specs — Получить версии спецификаций изделий */
  stockListAssemblySpecs: {
    params: Record<string, never>;
    query: { "component_id"?: models.UUID; "limit"?: number; "offset"?: number; "product_id"?: models.UUID; "q"?: string; "spec_id"?: models.UUID; "status"?: "draft" | "active" | "archived" };
    body: never;
    response: models.StockAssemblySpecPage;
  };
  /** GET /api/v1/stock/batches/{id}/changes — Получить историю правки партии */
  stockListBatchChanges: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockBatchChangePage;
  };
  /** GET /api/v1/stock/batch-stock — Получить остатки по партиям со сроками */
  stockListBatchStock: {
    params: Record<string, never>;
    query: { "as_of"?: string; "business_id"?: models.UUID; "company_id"?: models.UUID; "condition_id"?: string; "direction"?: "asc" | "desc"; "expires_within_days"?: number; "group"?: "series"; "limit"?: number; "min_remaining_days"?: number; "min_remaining_pct"?: string; "min_remaining_scale"?: string; "offset"?: number; "osg_below"?: number; "product_id"?: models.UUID; "search"?: string; "series"?: string; "shelf"?: string; "shelf_as_of"?: string; "sort"?: "fefo" | "expires_at" | "osg" | "product" | "warehouse" | "qty" | "amount" | "received_at" | "batch_code"; "unavailable_only"?: boolean; "warehouse_id"?: models.UUID; "warehouse_ids"?: string; "without_company"?: boolean };
    body: never;
    response: models.StockBatchStockPage;
  };
  /** GET /api/v1/stock/batches — Получить список партий */
  stockListBatches: {
    params: Record<string, never>;
    query: { "amount_from"?: string; "amount_to"?: string; "batch"?: string; "company_id"?: models.UUID; "direction"?: "asc" | "desc"; "expiry"?: "expired" | "soon" | "all"; "group"?: "series"; "in_stock"?: boolean; "limit"?: number; "offset"?: number; "produced_from"?: string; "produced_to"?: string; "product"?: string; "product_id"?: models.UUID; "q"?: string; "quantity_from"?: string; "quantity_to"?: string; "received_from"?: string; "received_to"?: string; "series"?: string; "sort"?: "received_at" | "expires_at" | "product" | "company" | "quantity" | "amount"; "warehouse_id"?: models.UUID; "warehouse_scope"?: "own" | "platform" | "all" };
    body: never;
    response: models.StockBatchPage;
  };
  /** GET /api/v1/stock/bins/placement — Получить размещение товаров по ячейкам */
  stockListBinPlacements: {
    params: Record<string, never>;
    query: { "product_ids": string; "warehouse_ids"?: string };
    body: never;
    response: models.StockBinPlacementList;
  };
  /** GET /api/v1/stock/businesses — Получить учётные единицы кабинета */
  stockListBusinesses: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.StockBusinessRefPage;
  };
  /** GET /api/v1/stock/carrier-shipments — Получить отправления СДЭК */
  stockListCarrierShipments: {
    params: Record<string, never>;
    query: { "document_id"?: models.UUID; "limit"?: number; "offset"?: number; "order_id"?: models.UUID; "q"?: string; "state"?: string };
    body: never;
    response: models.StockCarrierShipmentPage;
  };
  /** GET /api/v1/stock/companies — Получить юрлица кабинета, доступные сотруднику */
  stockListCompanies: {
    params: Record<string, never>;
    query: { "include_archived"?: boolean };
    body: never;
    response: models.StockCompanyRefPage;
  };
  /** GET /api/v1/stock/company-policies — Получить складские политики юрлиц */
  stockListCompanyPolicies: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.StockCompanyPolicyPage;
  };
  /** GET /api/v1/stock/conditions — Получить состояния товара */
  stockListConditions: {
    params: Record<string, never>;
    query: { "include_inactive"?: boolean };
    body: never;
    response: models.StockConditionPage;
  };
  /** GET /api/v1/stock/contact-policies — Получить складские настройки контрагентов */
  stockListContactPolicies: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.StockContactPolicyPage;
  };
  /** GET /api/v1/stock/discrepancies — Получить очередь расхождений */
  stockListDiscrepancies: {
    params: Record<string, never>;
    query: { "contact_id"?: models.UUID; "date_from"?: string; "date_to"?: string; "document_id"?: models.UUID; "limit"?: number; "offset"?: number; "source"?: "receipt" | "transfer"; "status"?: "open" | "waiting" | "resolved" | "all"; "warehouse_id"?: models.UUID };
    body: never;
    response: models.StockDiscrepancyPage;
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
    query: { "comment"?: string; "company_id"?: models.UUID; "contact_id"?: models.UUID; "created_by"?: string; "date_from"?: string; "date_to"?: string; "department_id"?: models.UUID; "direction"?: "asc" | "desc"; "limit"?: number; "lines_from"?: number; "lines_to"?: number; "marketplace_shipment"?: "true"; "marketplace_store_id"?: models.UUID; "marks"?: "short"; "number"?: string; "offset"?: number; "pnl_item_id"?: models.UUID; "q"?: string; "qty_from"?: string; "qty_to"?: string; "reason_id"?: models.UUID; "receiver"?: string; "receiver_stores"?: string; "sale"?: string; "shelf_life_warning"?: boolean; "sort"?: "date" | "number" | "status" | "company" | "warehouse" | "contact" | "updated_at"; "status"?: models.CoreDocumentStatus; "supply"?: string; "transfer_kind"?: string; "type"?: models.StockDocumentTypeKey; "updated_from"?: string; "updated_to"?: string; "warehouse_from_ids"?: string; "warehouse_id"?: models.UUID; "warehouse_ids"?: string; "warehouse_to_ids"?: string; "writeoff_request"?: "pending" | "ready" };
    body: never;
    response: models.StockDocumentPage;
  };
  /** GET /api/v1/stock/expired-stock — Получить просроченный остаток */
  stockListExpiredStock: {
    params: Record<string, never>;
    query: { "business_id"?: models.UUID; "company_id"?: models.UUID; "limit"?: number; "offset"?: number; "product_id"?: models.UUID; "warehouse_id"?: models.UUID };
    body: never;
    response: models.StockExpiredStockPage;
  };
  /** GET /api/v1/stock/handling-units — Получить список физических складских единиц */
  stockListHandlingUnits: {
    params: Record<string, never>;
    query: { "balance_from"?: string; "balance_to"?: string; "batch_id"?: models.UUID; "code"?: string; "company_id"?: models.UUID; "cost_from"?: string; "cost_to"?: string; "exclude_status"?: Array<models.StockHandlingUnitState>; "initial_from"?: string; "initial_to"?: string; "limit"?: number; "offset"?: number; "product"?: string; "product_id"?: models.UUID; "q"?: string; "status"?: Array<models.StockHandlingUnitState>; "warehouse_id"?: models.UUID };
    body: never;
    response: models.StockHandlingUnitPage;
  };
  /** GET /api/v1/stock/imports — Показать последние складские загрузки */
  stockListImports: {
    params: Record<string, never>;
    query: { "kind"?: models.StockImportKind; "limit"?: number; "status"?: string };
    body: never;
    response: models.StockImportPage;
  };
  /** GET /api/v1/stock/documents/{id}/inventory-changes — Получить движения склада после снимка инвентаризации */
  stockListInventoryChanges: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockInventoryChangePage;
  };
  /** GET /api/v1/stock/marketplace-settings — Получить складские настройки магазинов площадок */
  stockListMarketplaceSettings: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.StockMarketplaceSettingsList;
  };
  /** GET /api/v1/stock/negative-balances — Получить материалы в минусе */
  stockListNegativeBalances: {
    params: Record<string, never>;
    query: { "business_id"?: models.UUID; "company_id"?: models.UUID; "product_ids"?: string; "warehouse_id"?: models.UUID };
    body: never;
    response: models.StockNegativeBalancePage;
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
  /** GET /api/v1/stock/sales/{id}/reservation/holders — Кто держит товар, которого не хватило продаже */
  stockListSaleReservationHolders: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockOrderReservationHolders;
  };
  /** GET /api/v1/stock/suppliers — Получить активных контрагентов для выбора поставщика */
  stockListSuppliers: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.StockSupplierPage;
  };
  /** GET /api/v1/stock/transit-discrepancies — Получить расхождения приёмки по отправкам */
  stockListTransitDiscrepancies: {
    params: Record<string, never>;
    query: { "company_id"?: models.UUID; "date_from"?: string; "date_to"?: string; "status"?: "open" | "resolved" | "all"; "warehouse_id"?: models.UUID };
    body: never;
    response: models.StockTransitDiscrepancyPage;
  };
  /** GET /api/v1/stock/transit-series-mismatches — Получить отчёт «Серии ожидали → приняли» */
  stockListTransitSeriesMismatches: {
    params: Record<string, never>;
    query: { "company_id"?: models.UUID; "date_from"?: string; "date_to"?: string; "product_id"?: models.UUID; "warehouse_id"?: models.UUID };
    body: never;
    response: models.StockTransitSeriesMismatchPage;
  };
  /** GET /api/v1/stock/transit-shipments — Получить отправки на склады с приёмкой */
  stockListTransitShipments: {
    params: Record<string, never>;
    query: { "company_id"?: models.UUID; "date_from"?: string; "date_to"?: string; "limit"?: number; "number"?: string; "offset"?: number; "state"?: "open" | "awaiting" | "done" | "in_transit" | "partial" | "discrepancy" | "all"; "states"?: string; "warehouse_from_ids"?: string; "warehouse_id"?: models.UUID };
    body: never;
    response: models.StockTransitShipmentPage;
  };
  /** GET /api/v1/stock/users/{userId}/warehouses — Получить склады человека */
  stockListUserWarehouses: {
    params: { "userId": number };
    query: Record<string, never>;
    body: never;
    response: models.StockUserWarehousePage;
  };
  /** GET /api/v1/stock/warehouses/bins-summary — Получить счётчики ячеек складов и зон */
  stockListWarehouseBinSummaries: {
    params: Record<string, never>;
    query: { "ids"?: string };
    body: never;
    response: models.StockBinPlaceSummaryList;
  };
  /** GET /api/v1/stock/warehouses/{id}/bins — Получить ячейки склада или зоны */
  stockListWarehouseBins: {
    params: { "id": models.UUID };
    query: { "active"?: boolean; "limit"?: number; "offset"?: number; "q"?: string };
    body: never;
    response: models.StockBinList;
  };
  /** GET /api/v1/stock/warehouses/{id}/staff — Получить список «Работают на складе» */
  stockListWarehouseStaff: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockWarehouseStaffPage;
  };
  /** GET /api/v1/stock/warehouses — Получить список складов кабинета */
  stockListWarehouses: {
    params: Record<string, never>;
    query: { "purpose"?: "destination" };
    body: never;
    response: models.StockWarehousePage;
  };
  /** POST /api/v1/stock/documents/{id}/picked — Отметить черновик сборки отгрузки собранным */
  stockMarkDocumentPicked: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/shipments/{id}/refusal — Отметить отказ покупателя от отгрузки */
  stockMarkShipmentRefused: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockShipmentRefusalInput;
    response: void;
  };
  /** PUT /api/v1/stock/carrier-shipments/plan — Выбрать доставку СДЭК у продажи или заявки */
  stockPlanCarrierShipment: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockCarrierPlanInput;
    response: models.StockCarrierShipment;
  };
  /** POST /api/v1/stock/documents/{id}/post — Провести или перепровести складской документ */
  stockPostDocument: {
    params: { "id": models.UUID };
    query: { "receive_from_transit"?: boolean };
    body: never;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/accounting/{id}/post — Подтвердить и провести документ склада */
  stockPostInAccounting: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockAccountingDimensionsPatch;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/documents/post-rebuild — Провести задним числом с перестройкой цепочки */
  stockPostWithRebuild: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockPostRebuildInput;
    response: models.StockPostRebuildResult;
  };
  /** POST /api/v1/stock/warehouses/{id}/launch/prepare — Перевести склад в подготовку к запуску */
  stockPrepareWarehouseLaunch: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockWarehouse;
  };
  /** POST /api/v1/stock/imports/{id}/preview — Рассчитать изменения и ошибки без записи данных */
  stockPreviewImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockImportRun;
  };
  /** POST /api/v1/stock/receipt-costs/preview — Показать, на что ляжет доп. расход */
  stockPreviewReceiptCost: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockReceiptCostCreate;
    response: models.StockReceiptCostPreview;
  };
  /** POST /api/v1/stock/valuation/preview — Рассчитать переоценку по документу накладных расходов без записи */
  stockPreviewValuation: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockValuationPreviewRequest;
    response: models.StockValuationResult;
  };
  /** GET /api/v1/stock/price-suggestions — Подобрать цену по умолчанию для прихода без цены поставщика */
  stockPriceSuggestions: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "company"?: models.UUID; "date"?: string; "products": string; "warehouse"?: models.UUID };
    body: never;
    response: models.StockPriceSuggestions;
  };
  /** GET /api/v1/stock/products/{id}/cost-composition — Показать, из чего сложилась себестоимость товара на остатке */
  stockProductCostComposition: {
    params: { "id": models.UUID };
    query: { "business"?: models.UUID };
    body: never;
    response: models.StockProductCostComposition;
  };
  /** POST /api/v1/stock/carrier-shipments/{id}/quote — Рассчитать цену доставки СДЭК */
  stockQuoteCarrierShipment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockCarrierWeight;
    response: models.StockCarrierQuote;
  };
  /** POST /api/v1/stock/valuation/rebuild — Запустить пересчёт стоимости по документу накладных расходов */
  stockRebuildValuation: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockValuationRebuildRequest;
    response: models.StockValuationRun;
  };
  /** POST /api/v1/stock/receipt-vat-terms — Получить налоговые условия приёмки до сохранения */
  stockReceiptVATTerms: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockReceiptVATTermsInput;
    response: models.StockReceiptVATTerms;
  };
  /** POST /api/v1/stock/carrier-shipments/refresh — Обновить статусы отправлений у СДЭК */
  stockRefreshCarrierShipments: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockCarrierIDs;
    response: models.StockCarrierRefreshResult;
  };
  /** POST /api/v1/stock/documents/{id}/inventory-refresh — Пересобрать снимок остатков инвентаризации */
  stockRefreshInventorySnapshot: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockInventoryRefreshInput;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/warehouses/{id}/relaunch — Перезапустить склад */
  stockRelaunchWarehouse: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockRelaunchWarehouseRequest;
    response: models.StockWarehouse;
  };
  /** POST /api/v1/stock/documents/{id}/release — Снять неисполненный остаток резерва */
  stockReleaseReservation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/sales/{id}/reservation/release — Снять резерв продажи */
  stockReleaseSaleReservation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/stock/carrier-shipments/{id} — Убрать доставку СДЭК */
  stockRemoveCarrierShipmentPlan: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/stock/warehouses/{id}/staff/{userId} — Убрать человека из списка «Работают на складе» */
  stockRemoveWarehouseStaff: {
    params: { "id": models.UUID; "userId": number };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/stock/sales/{id}/reservation — Зарезервировать товар под продажу */
  stockReserveSale: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockOrderReserveInput;
    response: models.StockOrderReserveResult;
  };
  /** POST /api/v1/stock/discrepancies/resolve — Решить расхождение */
  stockResolveDiscrepancy: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockDiscrepancyResolveInput;
    response: models.StockDiscrepancyResolveResult;
  };
  /** POST /api/v1/stock/transit-shipments/{id}/resolve — Решить расхождение отправки */
  stockResolveTransitShipment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockTransitResolveInput;
    response: models.StockTransitDocumentResult;
  };
  /** POST /api/v1/stock/accounting/{id}/return — Вернуть документ из учёта на склад */
  stockReturnFromAccounting: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/documents/{id}/revise-rebuild — Исправить проведённый складской документ с перестройкой цепочки */
  stockReviseWithRebuild: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockReviseRebuildInput;
    response: models.StockPostRebuildResult;
  };
  /** PUT /api/v1/stock/contact-policies — Сохранить складские настройки контрагента */
  stockSaveContactPolicy: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockContactPolicyInput;
    response: models.StockContactPolicy;
  };
  /** PATCH /api/v1/stock/documents/{id}/inventory-counts — Записать фактические количества пересчёта */
  stockSaveInventoryCounts: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockInventoryCountsInput;
    response: models.CoreDocument;
  };
  /** PUT /api/v1/stock/marketplace-settings — Сохранить складские настройки магазина площадки */
  stockSaveMarketplaceSettings: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockMarketplaceSettingsInput;
    response: models.StockMarketplaceSettings;
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
  /** GET /api/v1/stock/documents/scan — Найти складской документ по коду с его листа */
  stockScanDocument: {
    params: Record<string, never>;
    query: { "code": string };
    body: never;
    response: models.StockDocumentScanResult;
  };
  /** GET /api/v1/stock/products/scan — Определить товар и единицу ввода по штрихкоду */
  stockScanProduct: {
    params: Record<string, never>;
    query: { "code": string };
    body: never;
    response: models.StockScanResult;
  };
  /** POST /api/v1/stock/carrier-shipments/{id}/send — Отправить посылку в СДЭК */
  stockSendCarrierShipment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockCarrierSendInput;
    response: models.StockCarrierShipment;
  };
  /** POST /api/v1/stock/assembly-specs/{id}/status — Сделать версию действующей или архивной */
  stockSetAssemblySpecStatus: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockAssemblySpecStatus;
    response: models.StockAssemblySpec;
  };
  /** POST /api/v1/stock/warehouses/{id}/bins-mode — Переключить режим ячеек склада или зоны */
  stockSetWarehouseBinsMode: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockWarehouseBinsModeInput;
    response: models.StockWarehouse;
  };
  /** POST /api/v1/stock/warehouses/{id}/shipping-mode — Переключить режим отгрузки склада */
  stockSetWarehouseShippingMode: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockWarehouseShippingModeInput;
    response: models.StockWarehouse;
  };
  /** POST /api/v1/stock/negative-balances/settle — Погасить минус по материалам */
  stockSettleNegativeBalances: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockNegativeSettleInput;
    response: models.StockNegativeSettleResult;
  };
  /** POST /api/v1/stock/sales/{id}/shipment — Отгрузить по продаже */
  stockShipSale: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockOrderShipInput;
    response: models.StockOrderShipment;
  };
  /** POST /api/v1/stock/writeoffs/{id}/request — Отправить заявку на списание */
  stockSubmitWriteoffRequest: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockWriteoffRequestState;
  };
  /** GET /api/v1/stock/handling-units/suggestions — Подобрать физические единицы под требуемое количество */
  stockSuggestHandlingUnits: {
    params: Record<string, never>;
    query: { "business_id"?: models.UUID; "company_id"?: models.UUID; "product_id": models.UUID; "qty": string; "warehouse_id": models.UUID };
    body: never;
    response: models.StockHandlingUnitSuggestionResult;
  };
  /** GET /api/v1/stock/warehouses/{id}/bins/suggest — Подсказать ячейки для прихода или расхода товара */
  stockSuggestWarehouseBins: {
    params: { "id": models.UUID };
    query: { "batch_id"?: models.UUID; "condition_id"?: models.UUID; "direction": "in" | "out"; "product_id": models.UUID; "qty"?: string };
    body: never;
    response: models.StockBinSuggestions;
  };
  /** POST /api/v1/stock/sales/{id}/reservation/take — Забрать бронь у другой продажи */
  stockTakeSaleReservation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockOrderReservationTakeInput;
    response: models.StockOrderShipping;
  };
  /** POST /api/v1/stock/sales/{id}/shipping-task/take — Взять задание складу в работу */
  stockTakeSaleShippingTask: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockShippingTask;
  };
  /** PUT /api/v1/stock/assembly-specs/{id} — Изменить черновик версии спецификации */
  stockUpdateAssemblySpec: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockAssemblySpecUpdate;
    response: models.StockAssemblySpec;
  };
  /** PATCH /api/v1/stock/batches/{id} — Изменить серию и даты партии */
  stockUpdateBatchRequisites: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockBatchRequisitesPatch;
    response: models.StockBatch;
  };
  /** PATCH /api/v1/stock/company-policies/{companyId} — Частично изменить складскую политику юрлица */
  stockUpdateCompanyPolicy: {
    params: { "companyId": models.UUID };
    query: Record<string, never>;
    body: models.StockCompanyPolicyPatch;
    response: models.StockCompanyPolicy;
  };
  /** PATCH /api/v1/stock/conditions/{id} — Изменить состояние товара */
  stockUpdateCondition: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockConditionInput;
    response: models.StockCondition;
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
    body: models.StockImportMapping;
    response: models.StockImportRun;
  };
  /** PATCH /api/v1/stock/reorder-rules/{id} — Частично изменить существующее правило пополнения */
  stockUpdateReorderRule: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockReorderRulePatch;
    response: models.StockReorderRule;
  };
  /** PUT /api/v1/stock/sales/{id}/shipping-task — Изменить задание складу по продаже */
  stockUpdateSaleShippingTask: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockShippingTaskInput;
    response: models.StockShippingTask;
  };
  /** PATCH /api/v1/stock/batches/{id}/series — Изменить серию целиком */
  stockUpdateSeriesRequisites: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockBatchRequisitesPatch;
    response: models.StockSeriesUpdateResult;
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
  /** PATCH /api/v1/stock/warehouses/{id}/bins/{binId} — Изменить ячейку */
  stockUpdateWarehouseBin: {
    params: { "binId": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: models.StockBinPatch;
    response: models.StockBin;
  };
  /** GET /api/v1/stock/warehouses/{id}/relaunch — Что отменит перезапуск склада */
  stockWarehouseRelaunchPlan: {
    params: { "id": models.UUID };
    query: { "with_opening"?: boolean };
    body: never;
    response: models.StockWarehouseRelaunchPlanResponse;
  };
  /** POST /api/v1/stock/writeoffs/{id}/request/withdraw — Отозвать заявку на списание */
  stockWithdrawWriteoffRequest: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockWriteoffRequestState;
  };
  /** POST /api/v1/tasks/projects/{id}/members — Добавить участника в группу проектов задач */
  tasksAddProjectMember: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MemberAssignment;
    response: models.SectionMember;
  };
  /** POST /api/v1/tasks/tasks/{id}/results — Отметить результат задачи */
  tasksAddResult: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.TaskResultCreate;
    response: models.TaskResult;
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
  /** DELETE /api/v1/tasks/todo/lists/{id} — Удалить личный список */
  tasksArchiveTodoList: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.TasksArchiveTodoListResponse;
  };
  /** POST /api/v1/tasks/tasks/{id}/tags — Прикрепить к задаче существующую или новую метку */
  tasksAttachTaskTag: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.TagAttach;
    response: models.Tag;
  };
  /** POST /api/v1/tasks/scrum/{project}/sprints/{id}/complete — Завершить спринт */
  tasksCompleteSprint: {
    params: { "id": models.UUID; "project": models.UUID };
    query: Record<string, never>;
    body: models.SprintComplete;
    response: models.SprintCompletion;
  };
  /** POST /api/v1/tasks/tasks/{id}/agent-journal — Записать результат работы агента */
  tasksCreateAgentJournalEntry: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CommentCreate;
    response: models.Comment;
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
  /** POST /api/v1/tasks/projects/{id}/file-folders — Создать папку файлов проекта */
  tasksCreateProjectFileFolder: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.ProjectFileFolderCreate;
    response: models.ProjectFileFolder;
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
  /** POST /api/v1/tasks/scrum/{project}/sprints/{id}/tasks — Создать задачу в бэклоге спринта */
  tasksCreateScrumTask: {
    params: { "id": models.UUID; "project": models.UUID };
    query: Record<string, never>;
    body: models.ScrumTaskCreate;
    response: models.Task;
  };
  /** POST /api/v1/tasks/sections — Создать раздел задач */
  tasksCreateSection: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.SectionCreate;
    response: models.Section;
  };
  /** POST /api/v1/tasks/scrum/{project}/sprints — Запланировать спринт */
  tasksCreateSprint: {
    params: { "project": models.UUID };
    query: Record<string, never>;
    body: models.SprintCreate;
    response: models.Sprint;
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
  /** POST /api/v1/tasks/todo/lists — Завести личный список */
  tasksCreateTodoList: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.TodoListInput;
    response: models.TodoList;
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
  /** DELETE /api/v1/tasks/projects/{id}/file-folders/{folderID} — Удалить пустую папку файлов проекта */
  tasksDeleteProjectFileFolder: {
    params: { "folderID": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/tasks/projects/{id}/members/{userID} — Удалить участника из группы проектов задач */
  tasksDeleteProjectMember: {
    params: { "id": models.UUID; "userID": number };
    query: Record<string, never>;
    body: never;
    response: void;
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
  /** DELETE /api/v1/tasks/tasks/{id}/results/{resultID} — Снять отметку результата задачи */
  tasksDeleteResult: {
    params: { "id": models.UUID; "resultID": models.UUID };
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
  /** DELETE /api/v1/tasks/scrum/{project}/sprints/{id} — Удалить пустой запланированный спринт */
  tasksDeleteSprint: {
    params: { "id": models.UUID; "project": models.UUID };
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
  /** POST /api/v1/tasks/scrum/{project}/poker/{id}/finish — Зафиксировать итог оценки */
  tasksFinishScrumPoker: {
    params: { "id": models.UUID; "project": models.UUID };
    query: Record<string, never>;
    body: models.PokerFinish;
    response: models.PokerSession;
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
  /** GET /api/v1/tasks/scrum/{project} — Открыть скрам проекта задач */
  tasksGetProjectScrum: {
    params: { "project": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.Scrum;
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
  /** GET /api/v1/tasks/scrum/{project}/poker/{id} — Получить сессию оценки командой */
  tasksGetScrumPoker: {
    params: { "id": models.UUID; "project": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.PokerSession;
  };
  /** GET /api/v1/tasks/scrum/{project}/reports — Получить командные отчёты скрама */
  tasksGetScrumReports: {
    params: { "project": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ScrumReports;
  };
  /** GET /api/v1/tasks/scrum/metrics/{cycle} — Получить командные метрики спринта */
  tasksGetSprintMetrics: {
    params: { "cycle": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.SprintMetrics;
  };
  /** GET /api/v1/tasks/scrum/{project}/sprints/{id}/report — Получить отчёт спринта */
  tasksGetSprintReport: {
    params: { "id": models.UUID; "project": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.SprintReport;
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
  /** GET /api/v1/tasks/tasks/{id}/agent-journal — Получить журнал работы агентов по задаче */
  tasksListAgentJournal: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CommentList;
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
    query: { "client"?: boolean; "crm_entity_id"?: models.UUID; "crm_entity_type"?: "lead" | "deal" | "customer"; "from"?: string; "kind"?: models.MeetingKind; "project"?: string; "q"?: string; "status"?: models.MeetingStatus; "to"?: string };
    body: never;
    response: models.MeetingPage;
  };
  /** GET /api/v1/tasks/members — Получить активных участников кабинета */
  tasksListMembers: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: Array<models.Member>;
  };
  /** GET /api/v1/tasks/milestones — Получить вехи проектов задач */
  tasksListMilestones: {
    params: Record<string, never>;
    query: { "include_archived"?: boolean; "project"?: string; "section"?: string };
    body: never;
    response: models.MilestonePage;
  };
  /** GET /api/v1/tasks/projects/{id}/file-folders — Получить дерево папок файлов проекта */
  tasksListProjectFileFolders: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ProjectFileFolderPage;
  };
  /** GET /api/v1/tasks/projects/{id}/members — Получить участников группы проектов задач */
  tasksListProjectMembers: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.SectionMember>;
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
  /** GET /api/v1/tasks/tasks/{id}/results — Получить результаты задачи */
  tasksListResults: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.TaskResultList;
  };
  /** GET /api/v1/tasks/scrum/{project}/poker — Открытые сессии оценки командой */
  tasksListScrumPoker: {
    params: { "project": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.PokerSessionPage;
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
  /** GET /api/v1/tasks/scrum/{project}/sprints/{id}/tasks — Получить задачи спринта для доски */
  tasksListSprintTasks: {
    params: { "id": models.UUID; "project": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.TaskPage;
  };
  /** GET /api/v1/tasks/scrum/{project}/sprints — Получить спринты проекта */
  tasksListSprints: {
    params: { "project": models.UUID };
    query: { "include_completed"?: boolean };
    body: never;
    response: models.SprintPage;
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
  /** GET /api/v1/tasks/tasks/{id}/tags — Получить метки задачи */
  tasksListTaskTags: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.TagPage;
  };
  /** GET /api/v1/tasks/tasks — Получить видимые пользователю задачи */
  tasksListTasks: {
    params: Record<string, never>;
    query: { "compact"?: boolean; "from"?: string; "limit"?: number; "list"?: models.UUID; "milestone"?: string; "mine_roles"?: string; "offset"?: number; "priority"?: models.TaskPriority; "project"?: string; "q"?: string; "scope"?: "mine"; "search_rank"?: boolean; "section"?: string; "status"?: string; "todo"?: "today" | "upcoming" | "inbox" | "list" | "done"; "until"?: string };
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
  /** GET /api/v1/tasks/todo/lists — Личные списки «Туду» */
  tasksListTodoLists: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.TodoListPage;
  };
  /** GET /api/v1/tasks/views — Получить сохранённые виды задач */
  tasksListViews: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.TaskViewPage;
  };
  /** GET /api/v1/tasks/hub/meetings/{id}/revisions — Получить предыдущие редакции встречи */
  tasksMeetingRevisions: {
    params: { "id": models.UUID };
    query: { "revision"?: number };
    body: never;
    response: models.TasksMeetingRevisionsResponse;
  };
  /** PATCH /api/v1/tasks/projects/{id}/attachments/{attachmentID} — Переместить файл в папку проекта или в корень */
  tasksMoveProjectAttachment: {
    params: { "attachmentID": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: models.AttachmentMove;
    response: void;
  };
  /** POST /api/v1/tasks/scrum/{project}/tasks/{task}/sprint — Перенести задачу скрама в бэклог другого спринта */
  tasksMoveScrumTask: {
    params: { "project": models.UUID; "task": models.UUID };
    query: Record<string, never>;
    body: models.ScrumTaskSprint;
    response: models.Task;
  };
  /** POST /api/v1/tasks/tasks/{id}/move — Переместить задачу в другой workflow-статус */
  tasksMoveTask: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.TaskMove;
    response: models.Task;
  };
  /** POST /api/v1/tasks/scrum/{project}/poker/{id}/round — Начать новый раунд */
  tasksNewScrumPokerRound: {
    params: { "id": models.UUID; "project": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.PokerSession;
  };
  /** PATCH /api/v1/tasks/projects/{id}/file-folders/{folderID} — Переименовать папку файлов проекта */
  tasksRenameProjectFileFolder: {
    params: { "folderID": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: models.ProjectFileFolderRename;
    response: models.ProjectFileFolder;
  };
  /** PATCH /api/v1/tasks/todo/lists/{id} — Переименовать личный список */
  tasksRenameTodoList: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.TodoListInput;
    response: models.TodoList;
  };
  /** PATCH /api/v1/tasks/statuses/reorder — Изменить порядок workflow-статусов */
  tasksReorderStatuses: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StatusReorder;
    response: models.OK;
  };
  /** POST /api/v1/tasks/scrum/{project}/poker/{id}/reveal — Открыть карты раунда */
  tasksRevealScrumPoker: {
    params: { "id": models.UUID; "project": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.PokerSession;
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
  /** PUT /api/v1/tasks/scrum/{project}/board — Выбрать колонки канбана спринта */
  tasksSetScrumBoard: {
    params: { "project": models.UUID };
    query: Record<string, never>;
    body: models.ScrumBoardInput;
    response: models.Scrum;
  };
  /** PUT /api/v1/tasks/scrum/{project}/reference — Выбрать эталонную задачу проекта */
  tasksSetScrumReference: {
    params: { "project": models.UUID };
    query: Record<string, never>;
    body: models.ScrumReferenceInput;
    response: models.Scrum;
  };
  /** PUT /api/v1/tasks/scrum/{project}/tasks/{task}/points — Оценить задачу скрама в баллах */
  tasksSetScrumStoryPoints: {
    params: { "project": models.UUID; "task": models.UUID };
    query: Record<string, never>;
    body: models.StoryPointsInput;
    response: models.Task;
  };
  /** POST /api/v1/tasks/scrum/{project}/tasks/{task}/poker — Оценить задачу командой (planning poker) */
  tasksStartScrumPoker: {
    params: { "project": models.UUID; "task": models.UUID };
    query: Record<string, never>;
    body: models.PokerStart;
    response: models.PokerSession;
  };
  /** POST /api/v1/tasks/scrum/{project}/sprints/{id}/start — Начать спринт */
  tasksStartSprint: {
    params: { "id": models.UUID; "project": models.UUID };
    query: Record<string, never>;
    body: models.SprintStart;
    response: models.Sprint;
  };
  /** GET /api/v1/tasks/todo/count — Число дел «Туду» на сегодня */
  tasksTodoCount: {
    params: Record<string, never>;
    query: { "until": string };
    body: never;
    response: models.TodoCount;
  };
  /** PATCH /api/v1/tasks/comments/{id} — Изменить комментарий */
  tasksUpdateComment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CommentUpdate;
    response: models.Comment;
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
  /** PATCH /api/v1/tasks/projects/{id} — Изменить группу проектов задач */
  tasksUpdateProject: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.ProjectUpdate;
    response: models.Project;
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
  /** PATCH /api/v1/tasks/scrum/{project}/sprints/{id} — Изменить имя, цель, даты или настройки спринта */
  tasksUpdateSprint: {
    params: { "id": models.UUID; "project": models.UUID };
    query: Record<string, never>;
    body: models.SprintUpdate;
    response: models.Sprint;
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
  /** PUT /api/v1/tasks/scrum/{project}/poker/{id}/vote — Выбрать карту в раунде */
  tasksVoteScrumPoker: {
    params: { "id": models.UUID; "project": models.UUID };
    query: Record<string, never>;
    body: models.PokerVoteInput;
    response: models.PokerSession;
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
  automationConnections: { method: "GET", path: "/api/v1/automation/connections", module: "automation", stage: "preview", permission: "settings.config:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  automationCreateRule: { method: "POST", path: "/api/v1/automation/rules", module: "automation", stage: "preview", permission: "settings.config:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  automationDeleteRule: { method: "DELETE", path: "/api/v1/automation/rules/{id}", module: "automation", stage: "preview", permission: "settings.config:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  automationGetRule: { method: "GET", path: "/api/v1/automation/rules/{id}", module: "automation", stage: "preview", permission: "settings.config:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  automationManifest: { method: "GET", path: "/api/v1/automation/manifest", module: "platform", stage: "preview", permission: "settings.config:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  automationRuleSimulate: { method: "POST", path: "/api/v1/automation/rules/simulate", module: "automation", stage: "preview", permission: "settings.config:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  automationRuleTest: { method: "POST", path: "/api/v1/automation/rules/test", module: "automation", stage: "preview", permission: "settings.config:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  automationRuleValidate: { method: "POST", path: "/api/v1/automation/rules/validate", module: "automation", stage: "preview", permission: "settings.config:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  automationRuleVersions: { method: "GET", path: "/api/v1/automation/rules/{id}/versions", module: "automation", stage: "preview", permission: "settings.config:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  automationRules: { method: "GET", path: "/api/v1/automation/rules", module: "automation", stage: "preview", permission: "settings.config:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  automationRunActions: { method: "GET", path: "/api/v1/automation/runs/{id}/actions", module: "automation", stage: "preview", permission: "settings.config:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  automationRuns: { method: "GET", path: "/api/v1/automation/runs", module: "automation", stage: "preview", permission: "settings.config:read", idempotent: false, installation: false, pagination: "limit", pageSizeMax: 200, pageSizeDefault: null },
  automationSetRuleEnabled: { method: "POST", path: "/api/v1/automation/rules/{id}/enabled", module: "automation", stage: "preview", permission: "settings.config:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  automationUpdateRule: { method: "PUT", path: "/api/v1/automation/rules/{id}", module: "automation", stage: "preview", permission: "settings.config:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankBonusReportLines: { method: "GET", path: "/api/v1/bank/staffing/bonus-report-lines", module: "finance", stage: "preview", permission: "finance.staffing:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankBonusSchemes: { method: "GET", path: "/api/v1/bank/staffing/bonus-schemes", module: "finance", stage: "preview", permission: "finance.staffing:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankCancelCashOperation: { method: "POST", path: "/api/v1/bank/cash-operations/{id}/cancel", module: "finance", stage: "preview", permission: "finance.cash_operations:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankCreateBonusScheme: { method: "POST", path: "/api/v1/bank/staffing/bonus-schemes", module: "finance", stage: "preview", permission: "finance.staffing:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankCreateStaffPosition: { method: "POST", path: "/api/v1/bank/staffing/positions", module: "finance", stage: "preview", permission: "finance.staffing:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankCreateStaffingOrder: { method: "POST", path: "/api/v1/bank/staffing/orders", module: "finance", stage: "preview", permission: "finance.staffing:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankDismissEmployee: { method: "POST", path: "/api/v1/bank/staffing/dismissals", module: "finance", stage: "preview", permission: "finance.staffing:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankGetCashOperationCancelConsequences: { method: "GET", path: "/api/v1/bank/cash-operations/{id}/cancel-consequences", module: "finance", stage: "preview", permission: "finance.cash_operations:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankMarkTransactionDeleted: { method: "POST", path: "/api/v1/bank/transactions/{id}/mark-deleted", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankPreviewBonusScheme: { method: "POST", path: "/api/v1/bank/staffing/bonus-schemes/preview", module: "finance", stage: "preview", permission: "finance.staffing:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankRepostTransaction: { method: "POST", path: "/api/v1/bank/transactions/{id}/repost", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankRepostTransactions: { method: "POST", path: "/api/v1/bank/transactions/repost", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankResolveOneCConflict: { method: "POST", path: "/api/v1/bank/exchange/items/{id}/onec-resolve", module: "finance", stage: "preview", permission: "finance.exchange:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankRestoreTransaction: { method: "POST", path: "/api/v1/bank/transactions/{id}/restore", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankStaffHeadcount: { method: "GET", path: "/api/v1/bank/staffing/headcount", module: "finance", stage: "preview", permission: "finance.staffing:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankStaffPositions: { method: "GET", path: "/api/v1/bank/staffing/positions", module: "finance", stage: "preview", permission: "finance.staffing:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankStaffingBonusOptions: { method: "GET", path: "/api/v1/bank/staffing/bonus-bases", module: "finance", stage: "preview", permission: "finance.staffing:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankStaffingSheet: { method: "GET", path: "/api/v1/bank/staffing/sheet", module: "finance", stage: "preview", permission: "finance.staffing:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankUpdateBonusScheme: { method: "PATCH", path: "/api/v1/bank/staffing/bonus-schemes/{id}", module: "finance", stage: "preview", permission: "finance.staffing:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  bankUpdateStaffPosition: { method: "PATCH", path: "/api/v1/bank/staffing/positions/{id}", module: "finance", stage: "preview", permission: "finance.staffing:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarCreateAvailability: { method: "POST", path: "/api/v1/calendar/availability", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarCreateBookingLink: { method: "POST", path: "/api/v1/calendar/booking-links", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarCreateConnector: { method: "POST", path: "/api/v1/calendar/connectors", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarCreateEvent: { method: "POST", path: "/api/v1/calendar/events", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
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
  calendarRecorderStatus: { method: "GET", path: "/api/v1/calendar/events/{id}/recorder", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarRespondToEvent: { method: "POST", path: "/api/v1/calendar/events/{id}/response", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarStartRecorder: { method: "POST", path: "/api/v1/calendar/events/{id}/recorder", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarStopRecorder: { method: "POST", path: "/api/v1/calendar/events/{id}/recorder/stop", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarSyncConnector: { method: "POST", path: "/api/v1/calendar/connectors/{id}/sync", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarUpdateAvailability: { method: "PATCH", path: "/api/v1/calendar/availability/{id}", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarUpdateBookingLink: { method: "PATCH", path: "/api/v1/calendar/booking-links/{id}", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarUpdateConnector: { method: "PATCH", path: "/api/v1/calendar/connectors/{id}", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarUpdateEvent: { method: "PATCH", path: "/api/v1/calendar/events/{id}", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatAbortAttachmentUploadSession: { method: "DELETE", path: "/api/v1/chat/upload-sessions/{sessionId}", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatAddGroupMember: { method: "POST", path: "/api/v1/chat/conversations/{id}/members", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatChangeNotificationMode: { method: "PATCH", path: "/api/v1/chat/conversations/{id}/notification-mode", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatClearManualUnread: { method: "DELETE", path: "/api/v1/chat/conversations/{id}/manual-unread", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatCreateAttachmentDownloadSession: { method: "GET", path: "/api/v1/chat/attachments/{attachmentId}/download-session", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatCreateAttachmentUploadSession: { method: "POST", path: "/api/v1/chat/conversations/{id}/upload-sessions", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatCreateFolder: { method: "POST", path: "/api/v1/chat/folders", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatCreateGroup: { method: "POST", path: "/api/v1/chat/conversations", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatDeleteFolder: { method: "DELETE", path: "/api/v1/chat/folders/{id}", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatDeleteMessage: { method: "DELETE", path: "/api/v1/chat/conversations/{id}/messages/{messageId}", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatEditMessage: { method: "PATCH", path: "/api/v1/chat/conversations/{id}/messages/{messageId}", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatEnsureDirect: { method: "POST", path: "/api/v1/chat/conversations/direct", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatEnsureEntityConversation: { method: "POST", path: "/api/v1/chat/entities/{module}/{entity}/{entityId}/conversation", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatFindEntityConversation: { method: "GET", path: "/api/v1/chat/entities/{module}/{entity}/{entityId}/conversation", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatFinishAttachmentUploadSession: { method: "POST", path: "/api/v1/chat/upload-sessions/{sessionId}/finish", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatForwardMessage: { method: "POST", path: "/api/v1/chat/conversations/{id}/messages/{messageId}/forward", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatGetAttachment: { method: "GET", path: "/api/v1/chat/conversations/{id}/attachments/{attachmentId}", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatGetAttachmentUploadSession: { method: "GET", path: "/api/v1/chat/upload-sessions/{sessionId}", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatGetConversation: { method: "GET", path: "/api/v1/chat/conversations/{id}", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatListAttachments: { method: "GET", path: "/api/v1/chat/conversations/{id}/attachments", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "cursor", pageSizeMax: 100, pageSizeDefault: 50 },
  chatListConversationMembers: { method: "GET", path: "/api/v1/chat/conversations/{id}/members", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatListConversations: { method: "GET", path: "/api/v1/chat/conversations", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "cursor", pageSizeMax: 100, pageSizeDefault: 50 },
  chatListFolders: { method: "GET", path: "/api/v1/chat/folders", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatListMentionCandidates: { method: "GET", path: "/api/v1/chat/conversations/{id}/mentions/candidates", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatListMessageReaders: { method: "GET", path: "/api/v1/chat/conversations/{id}/messages/{messageId}/readers", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatListMessages: { method: "GET", path: "/api/v1/chat/conversations/{id}/messages", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "limit", pageSizeMax: 100, pageSizeDefault: 50 },
  chatListPeople: { method: "GET", path: "/api/v1/chat/people", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatListPins: { method: "GET", path: "/api/v1/chat/conversations/{id}/pins", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatListPresence: { method: "GET", path: "/api/v1/chat/conversations/{id}/presence", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatListUnreadMentions: { method: "GET", path: "/api/v1/chat/conversations/{id}/mentions/unread", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatMarkAllConversationsRead: { method: "POST", path: "/api/v1/chat/conversations/read-all", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatMarkManualUnread: { method: "POST", path: "/api/v1/chat/conversations/{id}/manual-unread", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatMarkMentionRead: { method: "POST", path: "/api/v1/chat/conversations/{id}/mentions/{messageId}/read", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatMarkRead: { method: "POST", path: "/api/v1/chat/conversations/{id}/read", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatPinMessage: { method: "PUT", path: "/api/v1/chat/conversations/{id}/messages/{messageId}/pin", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatRemoveGroupMember: { method: "DELETE", path: "/api/v1/chat/conversations/{id}/members/{userId}", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatRemoveReaction: { method: "DELETE", path: "/api/v1/chat/conversations/{id}/messages/{messageId}/reaction", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatRenameGroup: { method: "PATCH", path: "/api/v1/chat/conversations/{id}", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatSendMessage: { method: "POST", path: "/api/v1/chat/conversations/{id}/messages", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatSendVideoMeeting: { method: "POST", path: "/api/v1/chat/conversations/{id}/video-meeting", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatSetReaction: { method: "PUT", path: "/api/v1/chat/conversations/{id}/messages/{messageId}/reaction", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatUnpinMessage: { method: "DELETE", path: "/api/v1/chat/conversations/{id}/messages/{messageId}/pin", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatUnreadSummary: { method: "GET", path: "/api/v1/chat/conversations/unread", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatUpdateFolder: { method: "PATCH", path: "/api/v1/chat/folders/{id}", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreAbortUploadSession: { method: "DELETE", path: "/api/v1/core/upload-sessions/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreAddPolicyAccountableDays: { method: "POST", path: "/api/v1/core/accounting-policy/businesses/{id}/accountable-days", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreAddPolicyPayrollOfficial: { method: "POST", path: "/api/v1/core/accounting-policy/companies/{id}/payroll-official", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreAddPolicyTaxMode: { method: "POST", path: "/api/v1/core/accounting-policy/companies/{id}/tax-mode", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreAddPolicyTaxRegime: { method: "POST", path: "/api/v1/core/accounting-policy/companies/{id}/tax-regime", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreAddPolicyVATPending: { method: "POST", path: "/api/v1/core/accounting-policy/businesses/{id}/vat-pending", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreAddPolicyVATPresentation: { method: "POST", path: "/api/v1/core/accounting-policy/businesses/{id}/vat-presentation", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreAddPolicyVATRates: { method: "POST", path: "/api/v1/core/accounting-policy/companies/{id}/vat-rates", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreApplyProductImport: { method: "POST", path: "/api/v1/core/product-imports/{id}/apply", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreArchiveContact: { method: "POST", path: "/api/v1/core/contacts/{id}/archive", module: "core", stage: "preview", permission: "core.contacts:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreArchiveEmployee: { method: "DELETE", path: "/api/v1/core/employees/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreArchiveProduct: { method: "POST", path: "/api/v1/core/products/{id}/archive", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreBulkExecutedPurchaseServices: { method: "POST", path: "/api/v1/core/purchases/executed-services", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreBulkExecutedSaleServices: { method: "POST", path: "/api/v1/core/sales/executed-services", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreBulkUpdateContacts: { method: "POST", path: "/api/v1/core/contacts/bulk", module: "core", stage: "preview", permission: "core.contacts:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreBulkUpdateProducts: { method: "POST", path: "/api/v1/core/products/bulk", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCancelDocument: { method: "POST", path: "/api/v1/core/documents/{id}/cancel", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCancelPriceSet: { method: "POST", path: "/api/v1/core/price-sets/{id}/cancel", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCancelPurchase: { method: "POST", path: "/api/v1/core/purchases/{id}/cancel", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCancelSale: { method: "POST", path: "/api/v1/core/sales/{id}/cancel", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCloseAccountingPeriod: { method: "POST", path: "/api/v1/core/accounting-periods/close", module: "core", stage: "preview", permission: "core:period_close", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreClosePurchase: { method: "POST", path: "/api/v1/core/purchases/{id}/close", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCloseSale: { method: "POST", path: "/api/v1/core/sales/{id}/close", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCompletePurchaseStep: { method: "POST", path: "/api/v1/core/purchases/{id}/steps/{key}/done", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCompleteSaleStep: { method: "POST", path: "/api/v1/core/sales/{id}/steps/{key}/done", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreConfirmPurchase: { method: "POST", path: "/api/v1/core/purchases/{id}/confirm", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreConfirmSale: { method: "POST", path: "/api/v1/core/sales/{id}/confirm", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateBusiness: { method: "POST", path: "/api/v1/core/businesses", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateBusinessOwnership: { method: "POST", path: "/api/v1/core/businesses/{id}/ownership", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateChannelPriceType: { method: "POST", path: "/api/v1/core/price-types/for-channel", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateContact: { method: "POST", path: "/api/v1/core/contacts", module: "core", stage: "preview", permission: "core.contacts:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateContactBankAccount: { method: "POST", path: "/api/v1/core/contacts/{id}/bank-accounts", module: "core", stage: "preview", permission: "core.contacts:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateContactsBatch: { method: "POST", path: "/api/v1/core/contacts/batch", module: "core", stage: "preview", permission: "core.contacts:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateCurrencyRate: { method: "POST", path: "/api/v1/core/currency-rates", module: "core", stage: "preview", permission: "core.constants:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateDictionary: { method: "POST", path: "/api/v1/core/dictionaries", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateDictionaryItem: { method: "POST", path: "/api/v1/core/dictionaries/{id}/items", module: "core", stage: "preview", permission: "core:write|core.accounting:write|core.money:write|core.constants:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateDocument: { method: "POST", path: "/api/v1/core/documents", module: "core", stage: "preview", permission: "core:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateDocumentType: { method: "POST", path: "/api/v1/core/document-types", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateEmployee: { method: "POST", path: "/api/v1/core/employees", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateEmployeeEquipment: { method: "POST", path: "/api/v1/core/employee-equipment", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateEmployeeLifecycleTemplate: { method: "POST", path: "/api/v1/core/employee-lifecycle-templates", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateEmployeesBatch: { method: "POST", path: "/api/v1/core/employees/batch", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateFolder: { method: "POST", path: "/api/v1/core/folders", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateGLAccount: { method: "POST", path: "/api/v1/core/gl-accounts", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateGLMapping: { method: "POST", path: "/api/v1/core/gl-mappings", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateItem: { method: "POST", path: "/api/v1/core/items", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateMarkingGroup: { method: "POST", path: "/api/v1/core/marking-groups", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateOrgDepartment: { method: "POST", path: "/api/v1/core/org-structure/departments", module: "core", stage: "preview", permission: "core.org_structure:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreatePriceSet: { method: "POST", path: "/api/v1/core/price-sets", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreatePriceType: { method: "POST", path: "/api/v1/core/price-types", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateProduct: { method: "POST", path: "/api/v1/core/products", module: "core", stage: "preview", permission: "core:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateProductExport: { method: "POST", path: "/api/v1/core/product-exports", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateProductIdentifier: { method: "POST", path: "/api/v1/core/products/{id}/identifiers", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateProductImport: { method: "POST", path: "/api/v1/core/product-imports", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateProductImportUploadSession: { method: "POST", path: "/api/v1/core/product-import-upload-sessions", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateProductUploadSession: { method: "POST", path: "/api/v1/core/products/{id}/upload-sessions", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreatePurchase: { method: "POST", path: "/api/v1/core/purchases", module: "core", stage: "preview", permission: "core.trade:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateRegister: { method: "POST", path: "/api/v1/core/registers", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateSale: { method: "POST", path: "/api/v1/core/sales", module: "core", stage: "preview", permission: "core.trade:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateSalesChannel: { method: "POST", path: "/api/v1/core/sales-channels", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateSupplierPriceSet: { method: "POST", path: "/api/v1/core/supplier-price-sets", module: "core", stage: "preview", permission: "core:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateTradeFunnel: { method: "POST", path: "/api/v1/core/trade/funnels", module: "core", stage: "preview", permission: "settings.config:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateTradeStatus: { method: "POST", path: "/api/v1/core/trade/statuses", module: "core", stage: "preview", permission: "settings.config:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateTradeTemplate: { method: "POST", path: "/api/v1/core/trade/templates", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeactivateProductIdentifier: { method: "POST", path: "/api/v1/core/products/{id}/identifiers/{identifierId}/deactivate", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteDictionary: { method: "DELETE", path: "/api/v1/core/dictionaries/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteDictionaryItem: { method: "DELETE", path: "/api/v1/core/dictionaries/{id}/items/{itemId}", module: "core", stage: "preview", permission: "core:write|core.accounting:write|core.money:write|core.constants:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteDocumentType: { method: "DELETE", path: "/api/v1/core/document-types/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteFolder: { method: "DELETE", path: "/api/v1/core/folders/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteGLAccount: { method: "DELETE", path: "/api/v1/core/gl-accounts/{id}", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteGLMapping: { method: "DELETE", path: "/api/v1/core/gl-mappings/{id}", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteItem: { method: "DELETE", path: "/api/v1/core/items/{id}", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteMarkingGroup: { method: "DELETE", path: "/api/v1/core/marking-groups/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteOrgDepartment: { method: "DELETE", path: "/api/v1/core/org-structure/departments/{id}", module: "core", stage: "preview", permission: "core.org_structure:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteProductFile: { method: "DELETE", path: "/api/v1/core/products/{id}/files/{fileId}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteProductIdentifier: { method: "DELETE", path: "/api/v1/core/products/{id}/identifiers/{identifierId}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteRegister: { method: "DELETE", path: "/api/v1/core/registers/{key}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteSalesChannel: { method: "DELETE", path: "/api/v1/core/sales-channels/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreEditPolicyAccountableDays: { method: "PUT", path: "/api/v1/core/accounting-policy/businesses/{id}/accountable-days/open", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreEditPolicyPayrollOfficial: { method: "PUT", path: "/api/v1/core/accounting-policy/companies/{id}/payroll-official/open", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreEditPolicyTaxMode: { method: "PUT", path: "/api/v1/core/accounting-policy/companies/{id}/tax-mode/open", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreEditPolicyTaxRegime: { method: "PUT", path: "/api/v1/core/accounting-policy/companies/{id}/tax-regime/open", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreEditPolicyVATPending: { method: "PUT", path: "/api/v1/core/accounting-policy/businesses/{id}/vat-pending/open", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreEditPolicyVATPresentation: { method: "PUT", path: "/api/v1/core/accounting-policy/businesses/{id}/vat-presentation/open", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreEditPolicyVATRates: { method: "PUT", path: "/api/v1/core/accounting-policy/companies/{id}/vat-rates/open", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreExecutePurchaseNow: { method: "POST", path: "/api/v1/core/purchases/execute-now", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreExecuteSaleNow: { method: "POST", path: "/api/v1/core/sales/execute-now", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreFinishUploadSession: { method: "POST", path: "/api/v1/core/upload-sessions/{id}/finish", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGenerateProductBarcode: { method: "POST", path: "/api/v1/core/product-identifiers/generate", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGenerateProductVariants: { method: "POST", path: "/api/v1/core/products/{id}/variants/generate", module: "core", stage: "preview", permission: "core:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetAccountingPeriodState: { method: "GET", path: "/api/v1/core/accounting-periods", module: "core", stage: "preview", permission: "core.period_state:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetAccountingPolicy: { method: "GET", path: "/api/v1/core/accounting-policy", module: "core", stage: "preview", permission: "core.accounting:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetAccountingSettings: { method: "GET", path: "/api/v1/core/accounting-settings", module: "core", stage: "preview", permission: "core.accounting:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetAccountingStart: { method: "GET", path: "/api/v1/core/accounting-start", module: "core", stage: "preview", permission: "core.accounting:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetBusiness: { method: "GET", path: "/api/v1/core/businesses/{id}", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetBusinessLedgerRun: { method: "GET", path: "/api/v1/core/businesses/{id}/ledger-start/run", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetCabinetPreferences: { method: "GET", path: "/api/v1/core/cabinet-preferences", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetContact: { method: "GET", path: "/api/v1/core/contacts/{id}", module: "core", stage: "public", permission: "core.contacts:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetContactUsage: { method: "GET", path: "/api/v1/core/contacts/{id}/usage", module: "core", stage: "public", permission: "core.contacts:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetContractTerms: { method: "GET", path: "/api/v1/core/contracts/{id}", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetDictionary: { method: "GET", path: "/api/v1/core/dictionaries/{id}", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetDictionaryItemUsage: { method: "GET", path: "/api/v1/core/dictionaries/{id}/items/{itemId}/usage", module: "core", stage: "public", permission: "core:read|core.accounting:read|core.money:read|core.constants:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetDocument: { method: "GET", path: "/api/v1/core/documents/{id}", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetDocumentBlockers: { method: "GET", path: "/api/v1/core/documents/{id}/blockers", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetDocumentHistory: { method: "GET", path: "/api/v1/core/documents/{id}/history", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 200 },
  coreGetDocumentLinks: { method: "GET", path: "/api/v1/core/documents/{id}/links", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetDocumentType: { method: "GET", path: "/api/v1/core/document-types/{id}", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetEmployee: { method: "GET", path: "/api/v1/core/employees/{id}", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetEmployeeRequisites: { method: "GET", path: "/api/v1/core/employees/{id}/requisites", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetEmployeeUsage: { method: "GET", path: "/api/v1/core/employees/{id}/usage", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetExternalRef: { method: "GET", path: "/api/v1/core/external-refs/{id}", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetGLOpeningImport: { method: "GET", path: "/api/v1/core/gl-opening-imports/{id}", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetOrgStructure: { method: "GET", path: "/api/v1/core/org-structure", module: "core", stage: "preview", permission: "core.org_structure:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetPriceList: { method: "GET", path: "/api/v1/core/price-list", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 100 },
  coreGetPriceSet: { method: "GET", path: "/api/v1/core/price-sets/{id}", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProduct: { method: "GET", path: "/api/v1/core/products/{id}", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductCustomFieldSchema: { method: "GET", path: "/api/v1/core/products/custom-fields/schema", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductExport: { method: "GET", path: "/api/v1/core/product-exports/{id}", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductExportContent: { method: "GET", path: "/api/v1/core/product-exports/{id}/content", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductFileContent: { method: "GET", path: "/api/v1/core/products/{id}/files/{fileId}/content", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductImport: { method: "GET", path: "/api/v1/core/product-imports/{id}", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductImportErrors: { method: "GET", path: "/api/v1/core/product-imports/{id}/errors", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductImportSource: { method: "GET", path: "/api/v1/core/product-imports/{id}/source", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductImportTemplate: { method: "GET", path: "/api/v1/core/product-import-templates/{kind}", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductUsage: { method: "GET", path: "/api/v1/core/products/{id}/usage", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
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
  coreGetSalesChannel: { method: "GET", path: "/api/v1/core/sales-channels/{id}", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetSupplierPriceSet: { method: "GET", path: "/api/v1/core/supplier-price-sets/{id}", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetTradeTemplate: { method: "GET", path: "/api/v1/core/trade/templates/{id}", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetTrialBalance: { method: "GET", path: "/api/v1/core/ledger/trial-balance", module: "core", stage: "preview", permission: "core.trial_balance:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetUploadSession: { method: "GET", path: "/api/v1/core/upload-sessions/{id}", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreImportDictionaryItems: { method: "POST", path: "/api/v1/core/dictionaries/{id}/items/import", module: "core", stage: "preview", permission: "core:write|core.accounting:write|core.money:write|core.constants:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreImportOrgStructure: { method: "POST", path: "/api/v1/core/org-structure/import", module: "core", stage: "preview", permission: "core.org_structure:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreImportPurchase: { method: "POST", path: "/api/v1/core/purchases/import", module: "core", stage: "preview", permission: "core.trade:import", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreImportSale: { method: "POST", path: "/api/v1/core/sales/import", module: "core", stage: "preview", permission: "core.trade:import", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreInspectProductImport: { method: "POST", path: "/api/v1/core/product-imports/{id}/inspect", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreLinkExternalRef: { method: "POST", path: "/api/v1/core/external-refs/{id}/link", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListAccountingDimensions: { method: "GET", path: "/api/v1/core/accounting-dimensions", module: "core", stage: "preview", permission: "core.accounting:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListActionJournal: { method: "GET", path: "/api/v1/core/action-journal", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 200 },
  coreListBusinessOwnership: { method: "GET", path: "/api/v1/core/businesses/{id}/ownership", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListBusinesses: { method: "GET", path: "/api/v1/core/businesses", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListCashflowItems: { method: "GET", path: "/api/v1/core/cashflow-items", module: "core", stage: "preview", permission: "core.accounting:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListChannelProductPrices: { method: "GET", path: "/api/v1/core/prices/channels", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListContactBankAccounts: { method: "GET", path: "/api/v1/core/contacts/{id}/bank-accounts", module: "core", stage: "preview", permission: "core.contacts:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListContacts: { method: "GET", path: "/api/v1/core/contacts", module: "core", stage: "public", permission: "core.contacts:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 100 },
  coreListCurrencyRateSources: { method: "GET", path: "/api/v1/core/currency-rate-sources", module: "core", stage: "preview", permission: "core.constants:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListCurrencyRates: { method: "GET", path: "/api/v1/core/currency-rates", module: "core", stage: "preview", permission: "core.constants:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListDictionaries: { method: "GET", path: "/api/v1/core/dictionaries", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: 100 },
  coreListDictionaryItems: { method: "GET", path: "/api/v1/core/dictionaries/{id}/items", module: "core", stage: "public", permission: "core:read|core.accounting:read|core.money:read|core.constants:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 500 },
  coreListDirectories: { method: "GET", path: "/api/v1/core/directories", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListDocumentEntries: { method: "GET", path: "/api/v1/core/documents/{id}/entries", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 200 },
  coreListDocumentNumbering: { method: "GET", path: "/api/v1/core/document-numbering", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListDocumentTypes: { method: "GET", path: "/api/v1/core/document-types", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListDocuments: { method: "GET", path: "/api/v1/core/documents", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 200 },
  coreListEmployeeEquipment: { method: "GET", path: "/api/v1/core/employee-equipment", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListEmployeeLifecycleTemplates: { method: "GET", path: "/api/v1/core/employee-lifecycle-templates", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListEmployees: { method: "GET", path: "/api/v1/core/employees", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 200 },
  coreListExternalRefs: { method: "GET", path: "/api/v1/core/external-refs", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 50 },
  coreListFolders: { method: "GET", path: "/api/v1/core/folders", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListGLAccounts: { method: "GET", path: "/api/v1/core/gl-accounts", module: "core", stage: "preview", permission: "core.accounting:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListGLMappings: { method: "GET", path: "/api/v1/core/gl-mappings", module: "core", stage: "preview", permission: "core.accounting:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: null },
  coreListGLOpeningImports: { method: "GET", path: "/api/v1/core/gl-opening-imports", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 100, pageSizeDefault: 20 },
  coreListItems: { method: "GET", path: "/api/v1/core/items", module: "core", stage: "preview", permission: "core.accounting:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListMarkingGroups: { method: "GET", path: "/api/v1/core/marking-groups", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListOrderContracts: { method: "GET", path: "/api/v1/core/contracts", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListOrgPlacements: { method: "GET", path: "/api/v1/core/org-structure/placements", module: "core", stage: "preview", permission: "core.org_structure:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListPnlItems: { method: "GET", path: "/api/v1/core/pnl-items", module: "core", stage: "preview", permission: "core.accounting:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListPriceAssignments: { method: "GET", path: "/api/v1/core/price-assignments", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListPriceHistory: { method: "GET", path: "/api/v1/core/prices/history", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListPriceSales: { method: "GET", path: "/api/v1/core/prices/sales", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 200, pageSizeDefault: 50 },
  coreListPriceSets: { method: "GET", path: "/api/v1/core/price-sets", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 100 },
  coreListPriceTypes: { method: "GET", path: "/api/v1/core/price-types", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListPricesAt: { method: "GET", path: "/api/v1/core/prices/at", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListProductCategoryMarking: { method: "GET", path: "/api/v1/core/product-categories/marking-groups", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListProductFiles: { method: "GET", path: "/api/v1/core/products/{id}/files", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListProductGTINReview: { method: "GET", path: "/api/v1/core/product-identifiers/gtin-review", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListProductIdentifierHistory: { method: "GET", path: "/api/v1/core/products/{id}/identifier-history", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 200 },
  coreListProductIdentifiers: { method: "GET", path: "/api/v1/core/products/{id}/identifiers", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListProductVariants: { method: "GET", path: "/api/v1/core/products/{id}/variants", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListProducts: { method: "GET", path: "/api/v1/core/products", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 100 },
  coreListPurchases: { method: "GET", path: "/api/v1/core/purchases", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 25 },
  coreListRegisterEntries: { method: "GET", path: "/api/v1/core/registers/{key}/entries", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 200 },
  coreListRegisters: { method: "GET", path: "/api/v1/core/registers", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 200 },
  coreListSales: { method: "GET", path: "/api/v1/core/sales", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 25 },
  coreListSalesChannels: { method: "GET", path: "/api/v1/core/sales-channels", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListSellerCompanies: { method: "GET", path: "/api/v1/core/seller-companies", module: "core", stage: "preview", permission: "core:read|core.trade:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListSupplierPrices: { method: "GET", path: "/api/v1/core/supplier-prices", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 100 },
  coreListTradeFunnelTemplates: { method: "GET", path: "/api/v1/core/trade/funnels/templates", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListTradeFunnelVersions: { method: "GET", path: "/api/v1/core/trade/funnels/{id}/versions", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListTradeFunnels: { method: "GET", path: "/api/v1/core/trade/funnels", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListTradeImports: { method: "GET", path: "/api/v1/core/trade/imports", module: "core", stage: "preview", permission: "core.trade:import", idempotent: false, installation: false, pagination: "limit", pageSizeMax: 200, pageSizeDefault: 25 },
  coreListTradeStatuses: { method: "GET", path: "/api/v1/core/trade/statuses", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListTradeTemplateDocuments: { method: "GET", path: "/api/v1/core/trade/templates/{id}/documents", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 200, pageSizeDefault: null },
  coreListTradeTemplates: { method: "GET", path: "/api/v1/core/trade/templates", module: "core", stage: "preview", permission: "core.trade:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: null },
  coreLookupBank: { method: "GET", path: "/api/v1/core/lookup/bank", module: "finance", stage: "preview", permission: "core:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreLookupProductIdentifier: { method: "GET", path: "/api/v1/core/product-identifiers/lookup", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreMarkDocumentDeleted: { method: "POST", path: "/api/v1/core/documents/{id}/mark-deleted", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreMarkGLOpeningImportApplied: { method: "POST", path: "/api/v1/core/gl-opening-imports/{id}/applied", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreMatchExternalContacts: { method: "POST", path: "/api/v1/core/external-refs/contacts/match", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreMergeContacts: { method: "POST", path: "/api/v1/core/contacts/{id}/merge", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreMoveItem: { method: "POST", path: "/api/v1/core/items/{id}/move", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  corePlaceOrgEmployee: { method: "POST", path: "/api/v1/core/org-structure/placements", module: "core", stage: "preview", permission: "core.org_structure:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  corePostDocument: { method: "POST", path: "/api/v1/core/documents/{id}/post", module: "core", stage: "preview", permission: "core:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  corePostOrgPlacement: { method: "POST", path: "/api/v1/core/org-placements", module: "core", stage: "preview", permission: "core.org_structure:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  corePostPriceSet: { method: "POST", path: "/api/v1/core/price-sets/{id}/post", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  corePreviewContactMerge: { method: "POST", path: "/api/v1/core/contacts/{id}/merge/preview", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  corePreviewProductImport: { method: "POST", path: "/api/v1/core/product-imports/{id}/preview", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreProductExportDownloadSession: { method: "GET", path: "/api/v1/core/product-exports/{id}/download-session", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreProductFileDownloadSession: { method: "GET", path: "/api/v1/core/products/{id}/files/{fileId}/download-session", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreProductImportErrorsDownloadSession: { method: "GET", path: "/api/v1/core/product-imports/{id}/errors/download-session", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreProductImportSourceDownloadSession: { method: "GET", path: "/api/v1/core/product-imports/{id}/source/download-session", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreProductImportTemplateDownloadSession: { method: "GET", path: "/api/v1/core/product-import-templates/{kind}/download-session", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReactivateProductIdentifier: { method: "POST", path: "/api/v1/core/products/{id}/identifiers/{identifierId}/reactivate", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReferenceCatalog: { method: "GET", path: "/api/v1/reference/catalog", module: "core", stage: "public", permission: "core:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReferenceChanges: { method: "GET", path: "/api/v1/reference/changes", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: false, pagination: "cursor", pageSizeMax: 1000, pageSizeDefault: 100 },
  coreReferenceItems: { method: "GET", path: "/api/v1/reference/{key}/items", module: "core", stage: "public", permission: "core:read|core.accounting:read|core.money:read|core.constants:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReferenceResolve: { method: "POST", path: "/api/v1/reference/resolve", module: "core", stage: "public", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreRefreshCurrencyRates: { method: "POST", path: "/api/v1/core/currency-rates/refresh", module: "core", stage: "preview", permission: "core.constants:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReleaseExecutionOpenings: { method: "POST", path: "/api/v1/core/trade/execution-openings/release", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreRememberExternalRefs: { method: "POST", path: "/api/v1/core/external-refs", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReopenAccountingPeriod: { method: "POST", path: "/api/v1/core/accounting-periods/reopen", module: "core", stage: "preview", permission: "core:period_reopen", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReopenPurchase: { method: "POST", path: "/api/v1/core/purchases/{id}/reopen", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReopenSale: { method: "POST", path: "/api/v1/core/sales/{id}/reopen", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReorderProductFiles: { method: "POST", path: "/api/v1/core/products/{id}/files/reorder", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreResolveExternalRefs: { method: "POST", path: "/api/v1/core/external-refs/resolve", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreResolvePrices: { method: "POST", path: "/api/v1/core/prices/resolve", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreRestoreContact: { method: "POST", path: "/api/v1/core/contacts/{id}/restore", module: "core", stage: "preview", permission: "core.contacts:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreRestoreProduct: { method: "POST", path: "/api/v1/core/products/{id}/restore", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreRevaluePrices: { method: "POST", path: "/api/v1/core/price-sets/revaluation", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReviseExecutedPurchase: { method: "POST", path: "/api/v1/core/purchases/{id}/executed-revision", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReviseExecutedSale: { method: "POST", path: "/api/v1/core/sales/{id}/executed-revision", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreRevisePurchase: { method: "PUT", path: "/api/v1/core/purchases/{id}", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReviseSale: { method: "PUT", path: "/api/v1/core/sales/{id}", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSaveAccountingDimensionVersion: { method: "POST", path: "/api/v1/core/accounting-dimensions/{key}/versions", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSaveOrderRevenueItems: { method: "PUT", path: "/api/v1/core/accounting-policy/businesses/{id}/revenue-items", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSellerBank: { method: "GET", path: "/api/v1/core/companies/{id}/seller-bank", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetBusinessAccountingMethod: { method: "POST", path: "/api/v1/core/businesses/{id}/accounting-method", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetBusinessActive: { method: "POST", path: "/api/v1/core/businesses/{id}/activation", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetBusinessLedgerStart: { method: "POST", path: "/api/v1/core/businesses/{id}/ledger-start", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetChannelProductPrice: { method: "POST", path: "/api/v1/core/prices/channels", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetContactEmployee: { method: "PUT", path: "/api/v1/core/contacts/{id}/employee", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetContractSettlementDetail: { method: "PUT", path: "/api/v1/core/contracts/{id}/settlement-detail", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetDocumentCustom: { method: "PUT", path: "/api/v1/core/documents/{id}/custom", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetPriceAssignment: { method: "PUT", path: "/api/v1/core/price-assignments", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetPrimaryProductIdentifier: { method: "POST", path: "/api/v1/core/products/{id}/identifiers/{identifierId}/primary", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetProductCategoryMarking: { method: "PUT", path: "/api/v1/core/product-categories/{id}/marking-group", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetPurchaseCabinetStatus: { method: "PUT", path: "/api/v1/core/purchases/{id}/cabinet-status", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetPurchaseContract: { method: "PUT", path: "/api/v1/core/purchases/{id}/contract", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetPurchaseCostFor: { method: "PUT", path: "/api/v1/core/purchases/{id}/cost-for", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetPurchaseFunnel: { method: "PUT", path: "/api/v1/core/purchases/{id}/funnel", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetPurchaseResponsibles: { method: "PUT", path: "/api/v1/core/purchases/{id}/responsibles", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetPurchaseStepDue: { method: "PUT", path: "/api/v1/core/purchases/{id}/steps/{key}/due", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetSaleCabinetStatus: { method: "PUT", path: "/api/v1/core/sales/{id}/cabinet-status", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetSaleContract: { method: "PUT", path: "/api/v1/core/sales/{id}/contract", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetSaleFunnel: { method: "PUT", path: "/api/v1/core/sales/{id}/funnel", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetSaleResponsibles: { method: "PUT", path: "/api/v1/core/sales/{id}/responsibles", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetSaleStepDue: { method: "PUT", path: "/api/v1/core/sales/{id}/steps/{key}/due", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetTradeTemplateState: { method: "POST", path: "/api/v1/core/trade/templates/{id}/state", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSuggestBanks: { method: "GET", path: "/api/v1/core/lookup/banks", module: "finance", stage: "preview", permission: "core:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSuggestRequisitesParties: { method: "GET", path: "/api/v1/core/lookup/parties", module: "finance", stage: "preview", permission: "core:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSupplierCancelPriceSet: { method: "POST", path: "/api/v1/core/supplier-price-sets/{id}/cancel", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSupplierPostPriceSet: { method: "POST", path: "/api/v1/core/supplier-price-sets/{id}/post", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSyncProductVariantArticles: { method: "POST", path: "/api/v1/core/products/{id}/variant-articles/sync", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUnlinkExternalRef: { method: "POST", path: "/api/v1/core/external-refs/{id}/unlink", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateAccountingDimension: { method: "PATCH", path: "/api/v1/core/accounting-dimensions/{key}", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateAccountingSettings: { method: "PATCH", path: "/api/v1/core/accounting-settings", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateBusiness: { method: "PATCH", path: "/api/v1/core/businesses/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateCabinetPreferences: { method: "PATCH", path: "/api/v1/core/cabinet-preferences", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateContact: { method: "PATCH", path: "/api/v1/core/contacts/{id}", module: "core", stage: "preview", permission: "core.contacts:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateContactBankAccount: { method: "PATCH", path: "/api/v1/core/contacts/{id}/bank-accounts/{accountId}", module: "core", stage: "preview", permission: "core.contacts:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateDictionary: { method: "PATCH", path: "/api/v1/core/dictionaries/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateDictionaryItem: { method: "PATCH", path: "/api/v1/core/dictionaries/{id}/items/{itemId}", module: "core", stage: "preview", permission: "core:write|core.accounting:write|core.money:write|core.constants:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateDocument: { method: "PATCH", path: "/api/v1/core/documents/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateDocumentNumbering: { method: "PUT", path: "/api/v1/core/document-numbering/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateDocumentType: { method: "PATCH", path: "/api/v1/core/document-types/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateEmployee: { method: "PATCH", path: "/api/v1/core/employees/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateEmployeeEquipment: { method: "PATCH", path: "/api/v1/core/employee-equipment/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateEmployeeLifecycleTemplate: { method: "PATCH", path: "/api/v1/core/employee-lifecycle-templates/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateEmployeeRequisites: { method: "PUT", path: "/api/v1/core/employees/{id}/requisites", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateFolder: { method: "PATCH", path: "/api/v1/core/folders/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateGLAccount: { method: "PATCH", path: "/api/v1/core/gl-accounts/{id}", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateItem: { method: "PATCH", path: "/api/v1/core/items/{id}", module: "core", stage: "preview", permission: "core.accounting:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateMarkingGroup: { method: "PATCH", path: "/api/v1/core/marking-groups/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateOrgDepartment: { method: "PATCH", path: "/api/v1/core/org-structure/departments/{id}", module: "core", stage: "preview", permission: "core.org_structure:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdatePriceSet: { method: "PUT", path: "/api/v1/core/price-sets/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdatePriceType: { method: "PATCH", path: "/api/v1/core/price-types/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateProduct: { method: "PATCH", path: "/api/v1/core/products/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateProductCustom: { method: "PATCH", path: "/api/v1/core/products/{id}/custom", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateProductFile: { method: "PATCH", path: "/api/v1/core/products/{id}/files/{fileId}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateProductIdentifier: { method: "PATCH", path: "/api/v1/core/products/{id}/identifiers/{identifierId}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateProductImportMapping: { method: "PATCH", path: "/api/v1/core/product-imports/{id}/mapping", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateRegister: { method: "PATCH", path: "/api/v1/core/registers/{key}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateSalesChannel: { method: "PATCH", path: "/api/v1/core/sales-channels/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateTradeFunnel: { method: "PUT", path: "/api/v1/core/trade/funnels/{id}", module: "core", stage: "preview", permission: "settings.config:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateTradeStatus: { method: "PATCH", path: "/api/v1/core/trade/statuses/{id}", module: "core", stage: "preview", permission: "settings.config:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateTradeTemplate: { method: "PUT", path: "/api/v1/core/trade/templates/{id}", module: "core", stage: "preview", permission: "core.trade:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUserEmployeesWithoutStaffing: { method: "POST", path: "/api/v1/core/employees/without-staffing", module: "core", stage: "preview", permission: "core:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmAbortCardFileUploadSession: { method: "DELETE", path: "/api/v1/crm/card-upload-sessions/{id}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmAbortImportUploadSession: { method: "DELETE", path: "/api/v1/crm/import-upload-sessions/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmAbortInboxUploadSession: { method: "DELETE", path: "/api/v1/crm/inbox/upload-sessions/{id}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmAbortWebFormUploadSession: { method: "DELETE", path: "/api/v1/crm/web-form-upload-sessions/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmAdCosts: { method: "GET", path: "/api/v1/crm/ad-costs", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmAddNote: { method: "POST", path: "/api/v1/crm/{entity}/{id}/notes", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmAdoptDirectoryContact: { method: "POST", path: "/api/v1/crm/contacts/{id}/adopt", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmApplyImport: { method: "POST", path: "/api/v1/crm/imports/{id}/apply", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmAssignInboxConversation: { method: "PATCH", path: "/api/v1/crm/inbox/conversations/{id}/assign", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmBulkCustomers: { method: "POST", path: "/api/v1/crm/customers/bulk", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmBulkDeals: { method: "POST", path: "/api/v1/crm/deals/bulk", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmBulkLeads: { method: "POST", path: "/api/v1/crm/leads/bulk", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCancelImport: { method: "POST", path: "/api/v1/crm/imports/{id}/cancel", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCardFileDownloadSession: { method: "GET", path: "/api/v1/crm/{entity}/{id}/files/{fileId}/download-session", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCheckInboxConnection: { method: "POST", path: "/api/v1/crm/inbox/connections/{id}/check", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCloseInboxConversation: { method: "POST", path: "/api/v1/crm/inbox/conversations/{id}/close", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmConnectImport: { method: "POST", path: "/api/v1/crm/imports/{id}/connect", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmConvertLead: { method: "POST", path: "/api/v1/crm/leads/{id}/convert", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateAutomationRule: { method: "POST", path: "/api/v1/crm/automation/rules", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateCardFileUploadSession: { method: "POST", path: "/api/v1/crm/{entity}/{id}/files/upload-sessions", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateCustomer: { method: "POST", path: "/api/v1/crm/customers", module: "crm", stage: "preview", permission: "crm:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateDeal: { method: "POST", path: "/api/v1/crm/deals", module: "crm", stage: "preview", permission: "crm:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateDealFromConversation: { method: "POST", path: "/api/v1/crm/inbox/conversations/{id}/deals", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateDealOrder: { method: "POST", path: "/api/v1/crm/deals/{id}/order", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateEngagement: { method: "POST", path: "/api/v1/crm/{entity}/{id}/engagements", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateEngagementTask: { method: "POST", path: "/api/v1/crm/engagements/{id}/task", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateEventLink: { method: "POST", path: "/api/v1/crm/{entity}/{id}/events", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateHubMeetingLink: { method: "POST", path: "/api/v1/crm/{entity}/{id}/hub-meetings", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateImport: { method: "POST", path: "/api/v1/crm/imports", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateImportPipelines: { method: "POST", path: "/api/v1/crm/imports/{id}/pipelines", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateImportUploadSession: { method: "POST", path: "/api/v1/crm/imports/{id}/upload-sessions", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateInboxConnection: { method: "POST", path: "/api/v1/crm/inbox/connections", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateInboxLine: { method: "POST", path: "/api/v1/crm/inbox/lines", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateInboxUploadSession: { method: "POST", path: "/api/v1/crm/inbox/conversations/{id}/upload-sessions", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateLead: { method: "POST", path: "/api/v1/crm/leads", module: "crm", stage: "preview", permission: "crm:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateLeadFromConversation: { method: "POST", path: "/api/v1/crm/inbox/conversations/{id}/leads", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateLeadSource: { method: "POST", path: "/api/v1/crm/lead-sources", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateLeadStage: { method: "POST", path: "/api/v1/crm/lead-stages", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateLossReason: { method: "POST", path: "/api/v1/crm/loss-reasons", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreatePipeline: { method: "POST", path: "/api/v1/crm/pipelines", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateSavedView: { method: "POST", path: "/api/v1/crm/views", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateStage: { method: "POST", path: "/api/v1/crm/pipelines/{id}/stages", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateTaskLink: { method: "POST", path: "/api/v1/crm/{entity}/{id}/tasks", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateWebForm: { method: "POST", path: "/api/v1/crm/web-forms", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateWebFormConsentUploadSession: { method: "POST", path: "/api/v1/crm/web-forms/{id}/consent-file/upload-sessions", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmDecideImportRecord: { method: "PUT", path: "/api/v1/crm/imports/{id}/records/{recordId}/decision", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmDeleteCardFile: { method: "DELETE", path: "/api/v1/crm/{entity}/{id}/files/{fileId}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmDeleteCustomer: { method: "DELETE", path: "/api/v1/crm/customers/{id}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmDeleteDeal: { method: "DELETE", path: "/api/v1/crm/deals/{id}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmDeleteInboxLine: { method: "DELETE", path: "/api/v1/crm/inbox/lines/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmDeletePipeline: { method: "DELETE", path: "/api/v1/crm/pipelines/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmDeleteSavedView: { method: "DELETE", path: "/api/v1/crm/views/{id}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmDeleteWebForm: { method: "DELETE", path: "/api/v1/crm/web-forms/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmDeleteWebFormConsentFile: { method: "DELETE", path: "/api/v1/crm/web-forms/{id}/consent-file", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmDisableInboxConnection: { method: "POST", path: "/api/v1/crm/inbox/connections/{id}/disable", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmEnableInboxConnection: { method: "POST", path: "/api/v1/crm/inbox/connections/{id}/enable", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmExtractImport: { method: "POST", path: "/api/v1/crm/imports/{id}/extract", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmFindCustomerDuplicates: { method: "GET", path: "/api/v1/crm/customers/duplicates", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmFinishCardFileUploadSession: { method: "POST", path: "/api/v1/crm/card-upload-sessions/{id}/finish", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmFinishImportUploadSession: { method: "POST", path: "/api/v1/crm/import-upload-sessions/{id}/finish", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmFinishInboxUploadSession: { method: "POST", path: "/api/v1/crm/inbox/upload-sessions/{id}/finish", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmFinishWebFormUploadSession: { method: "POST", path: "/api/v1/crm/web-form-upload-sessions/{id}/finish", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetAnalytics: { method: "GET", path: "/api/v1/crm/analytics", module: "crm", stage: "preview", permission: "crm:team_read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetAnalyticsReport: { method: "GET", path: "/api/v1/crm/analytics/report", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetAutomationRule: { method: "GET", path: "/api/v1/crm/automation/rules/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetAutomationRunActions: { method: "GET", path: "/api/v1/crm/automation/runs/{id}/actions", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetCardFileUploadSession: { method: "GET", path: "/api/v1/crm/card-upload-sessions/{id}", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetCounters: { method: "GET", path: "/api/v1/crm/counters", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetCustomer: { method: "GET", path: "/api/v1/crm/customers/{id}", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetCustomerRelations: { method: "GET", path: "/api/v1/crm/customers/{id}/relations", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetDeal: { method: "GET", path: "/api/v1/crm/deals/{id}", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetDealBoard: { method: "GET", path: "/api/v1/crm/deals/board", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "limit", pageSizeMax: 100, pageSizeDefault: 50 },
  crmGetDealStageHistory: { method: "GET", path: "/api/v1/crm/deals/{id}/stage-history", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetDirectoryContact: { method: "GET", path: "/api/v1/crm/contacts/{id}", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetImport: { method: "GET", path: "/api/v1/crm/imports/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
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
  crmGetWebForm: { method: "GET", path: "/api/v1/crm/web-forms/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetWebFormUploadSession: { method: "GET", path: "/api/v1/crm/web-form-upload-sessions/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmImportFields: { method: "GET", path: "/api/v1/crm/import-fields", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmImportOptions: { method: "GET", path: "/api/v1/crm/imports/{id}/options", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmInboxAttachmentDownloadSession: { method: "GET", path: "/api/v1/crm/inbox/attachments/{id}/download-session", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmInspectImportSheet: { method: "POST", path: "/api/v1/crm/imports/{id}/inspect", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmIssueDealInvoice: { method: "POST", path: "/api/v1/crm/deals/{id}/invoice", module: "crm", stage: "preview", permission: "crm:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmLeadDuplicates: { method: "GET", path: "/api/v1/crm/leads/{id}/duplicates", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmLinkCardMail: { method: "POST", path: "/api/v1/crm/{entity}/{id}/mail/links", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmLinkCustomerCompany: { method: "PUT", path: "/api/v1/crm/customers/{id}/companies/{companyId}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmLinkEntityConversation: { method: "POST", path: "/api/v1/crm/inbox/entities/{entity}/{id}/conversations", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListAutomationRules: { method: "GET", path: "/api/v1/crm/automation/rules", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListAutomationRuns: { method: "GET", path: "/api/v1/crm/automation/runs", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListCardFiles: { method: "GET", path: "/api/v1/crm/{entity}/{id}/files", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListCardMail: { method: "GET", path: "/api/v1/crm/{entity}/{id}/mail", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListCardMailCandidates: { method: "GET", path: "/api/v1/crm/{entity}/{id}/mail/candidates", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListCustomerDuplicateGroups: { method: "GET", path: "/api/v1/crm/customers/duplicate-groups", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "limit", pageSizeMax: 200, pageSizeDefault: 50 },
  crmListCustomers: { method: "GET", path: "/api/v1/crm/customers", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 50 },
  crmListDealActivities: { method: "GET", path: "/api/v1/crm/deals/{id}/activities", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListDealContacts: { method: "GET", path: "/api/v1/crm/deals/{id}/contacts", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListDealItems: { method: "GET", path: "/api/v1/crm/deals/{id}/items", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListDeals: { method: "GET", path: "/api/v1/crm/deals", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 50 },
  crmListDirectoryContacts: { method: "GET", path: "/api/v1/crm/contacts", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListEngagementKinds: { method: "GET", path: "/api/v1/crm/engagement-kinds", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListEngagements: { method: "GET", path: "/api/v1/crm/{entity}/{id}/engagements", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListEntityConversations: { method: "GET", path: "/api/v1/crm/inbox/entities/{entity}/{id}/conversations", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListEntityMessages: { method: "GET", path: "/api/v1/crm/inbox/entities/{entity}/{id}/messages", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "limit", pageSizeMax: 200, pageSizeDefault: 100 },
  crmListExternalLinks: { method: "GET", path: "/api/v1/crm/{entity}/{id}/links", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListImportRecords: { method: "GET", path: "/api/v1/crm/imports/{id}/records", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 100 },
  crmListImports: { method: "GET", path: "/api/v1/crm/imports", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "limit", pageSizeMax: 100, pageSizeDefault: 20 },
  crmListInboxConnections: { method: "GET", path: "/api/v1/crm/inbox/connections", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListInboxConversationLinks: { method: "GET", path: "/api/v1/crm/inbox/conversations/{id}/links", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListInboxConversations: { method: "GET", path: "/api/v1/crm/inbox/conversations", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 50 },
  crmListInboxLines: { method: "GET", path: "/api/v1/crm/inbox/lines", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListInboxMessageAttachments: { method: "GET", path: "/api/v1/crm/inbox/messages/{id}/attachments", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListInboxMessages: { method: "GET", path: "/api/v1/crm/inbox/conversations/{id}/messages", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 50 },
  crmListInboxProviders: { method: "GET", path: "/api/v1/crm/inbox/providers", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListInboxTemplates: { method: "GET", path: "/api/v1/crm/inbox/templates", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListLeadActivities: { method: "GET", path: "/api/v1/crm/leads/{id}/activities", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListLeadSources: { method: "GET", path: "/api/v1/crm/lead-sources", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListLeadStages: { method: "GET", path: "/api/v1/crm/lead-stages", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListLeads: { method: "GET", path: "/api/v1/crm/leads", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 50 },
  crmListLossReasons: { method: "GET", path: "/api/v1/crm/loss-reasons", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListMailAccounts: { method: "GET", path: "/api/v1/crm/mail/accounts", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListMembers: { method: "GET", path: "/api/v1/crm/members", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListMyEngagements: { method: "GET", path: "/api/v1/crm/engagements", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "limit", pageSizeMax: 1000, pageSizeDefault: null },
  crmListPipelineDeals: { method: "GET", path: "/api/v1/crm/pipelines/{id}/deals", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 50 },
  crmListPipelines: { method: "GET", path: "/api/v1/crm/pipelines", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListSavedViews: { method: "GET", path: "/api/v1/crm/views", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListWebFormSubmissions: { method: "GET", path: "/api/v1/crm/web-forms/{id}/submissions", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "limit", pageSizeMax: 200, pageSizeDefault: 50 },
  crmListWebForms: { method: "GET", path: "/api/v1/crm/web-forms", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmMarkInboxConversationRead: { method: "POST", path: "/api/v1/crm/inbox/conversations/{id}/read", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmMergeCustomers: { method: "POST", path: "/api/v1/crm/customers/{id}/merge", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmMergeLeads: { method: "POST", path: "/api/v1/crm/leads/{id}/merge", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmMoveDeal: { method: "POST", path: "/api/v1/crm/deals/{id}/move", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmPreviewImport: { method: "POST", path: "/api/v1/crm/imports/{id}/preview", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmPromoteCustomer: { method: "POST", path: "/api/v1/crm/customers/{id}/promote", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmQualifyLead: { method: "POST", path: "/api/v1/crm/leads/{id}/qualify", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmReopenDeal: { method: "POST", path: "/api/v1/crm/deals/{id}/reopen", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmReorderLeadStages: { method: "PATCH", path: "/api/v1/crm/lead-stages/reorder", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmReorderPipelines: { method: "PATCH", path: "/api/v1/crm/pipelines/reorder", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmReorderStages: { method: "PATCH", path: "/api/v1/crm/pipelines/{id}/stages/reorder", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmReplaceDealItems: { method: "PUT", path: "/api/v1/crm/deals/{id}/items", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmRetryAutomationRun: { method: "POST", path: "/api/v1/crm/automation/runs/{id}/retry", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmRollbackImport: { method: "POST", path: "/api/v1/crm/imports/{id}/rollback", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmSalesPlans: { method: "GET", path: "/api/v1/crm/sales-plans", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmSaveAdCosts: { method: "PUT", path: "/api/v1/crm/ad-costs", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmSaveImportMapping: { method: "PUT", path: "/api/v1/crm/imports/{id}/mapping", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmSaveInboxTemplate: { method: "POST", path: "/api/v1/crm/inbox/templates", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmSaveSalesPlans: { method: "PUT", path: "/api/v1/crm/sales-plans", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmSearchCatalog: { method: "GET", path: "/api/v1/crm/catalog", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 50, pageSizeDefault: 50 },
  crmSendCardMail: { method: "POST", path: "/api/v1/crm/{entity}/{id}/mail", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmSendInboxMessage: { method: "POST", path: "/api/v1/crm/inbox/conversations/{id}/messages", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUnlinkCardMail: { method: "DELETE", path: "/api/v1/crm/{entity}/{id}/mail/links/{linkId}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUnlinkCustomerCompany: { method: "DELETE", path: "/api/v1/crm/customers/{id}/companies/{companyId}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateAutomationRule: { method: "PUT", path: "/api/v1/crm/automation/rules/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateCustomer: { method: "PATCH", path: "/api/v1/crm/customers/{id}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateDeal: { method: "PATCH", path: "/api/v1/crm/deals/{id}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateEngagement: { method: "PATCH", path: "/api/v1/crm/engagements/{id}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateInboxConnection: { method: "PATCH", path: "/api/v1/crm/inbox/connections/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateInboxLine: { method: "PATCH", path: "/api/v1/crm/inbox/lines/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateLead: { method: "PATCH", path: "/api/v1/crm/leads/{id}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateLeadSource: { method: "PATCH", path: "/api/v1/crm/lead-sources/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateLeadStage: { method: "PATCH", path: "/api/v1/crm/lead-stages/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdatePipeline: { method: "PATCH", path: "/api/v1/crm/pipelines/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateSavedView: { method: "PATCH", path: "/api/v1/crm/views/{id}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateSettings: { method: "PATCH", path: "/api/v1/crm/settings", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateStage: { method: "PATCH", path: "/api/v1/crm/stages/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateWebForm: { method: "PUT", path: "/api/v1/crm/web-forms/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  dashboardExplainMetric: { method: "GET", path: "/api/v1/dashboard/metrics/{id}/explain", module: "dashboard", stage: "preview", permission: "dashboard:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
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
  docflowAcceptIntake: { method: "POST", path: "/api/v1/docflow/messages/{id}/intake", module: "docflow", stage: "preview", permission: "docflow.edo:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowAcknowledgeApproval: { method: "POST", path: "/api/v1/docflow/approvals/{id}/acknowledge", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowAddDocumentComment: { method: "POST", path: "/api/v1/docflow/comments", module: "docflow", stage: "preview", permission: "docflow.flow:read|docflow.flow:approve|docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowAdvanceInvoice: { method: "GET", path: "/api/v1/docflow/flow/advance-invoices", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowApplyMailPapers: { method: "POST", path: "/api/v1/docflow/mail-messages/{id}/papers", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowApplyPackagePapers: { method: "POST", path: "/api/v1/docflow/messages/{id}/papers", module: "docflow", stage: "preview", permission: "docflow.edo:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowApproval: { method: "GET", path: "/api/v1/docflow/approvals/{id}", module: "docflow", stage: "preview", permission: "docflow.flow:read|docflow.flow:approve|docflow.flow:request|docflow.edo:read|stock:read|stock.request:read|stock.receipt:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowApprovalRoute: { method: "GET", path: "/api/v1/docflow/approval-routes/{id}", module: "docflow", stage: "preview", permission: "docflow.flow:configure_payments", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowApprovalRoutes: { method: "GET", path: "/api/v1/docflow/approval-routes", module: "docflow", stage: "preview", permission: "docflow.flow:configure_payments", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowApprovalSettings: { method: "GET", path: "/api/v1/docflow/approval-settings", module: "docflow", stage: "preview", permission: "docflow.flow:configure_payments", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowApprovalSheetDocument: { method: "GET", path: "/api/v1/docflow/approvals/{id}/sheet", module: "docflow", stage: "preview", permission: "docflow.flow:read|docflow.flow:approve|docflow.flow:request|docflow.edo:read|stock:read|stock.request:read|stock.receipt:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowApprovalSheetDownloadSession: { method: "GET", path: "/api/v1/docflow/approvals/{id}/sheet/download-session", module: "docflow", stage: "preview", permission: "docflow.flow:read|docflow.flow:approve|docflow.flow:request|docflow.edo:read|stock:read|stock.request:read|stock.receipt:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowApprovalState: { method: "GET", path: "/api/v1/docflow/approvals/state", module: "docflow", stage: "preview", permission: "docflow.flow:read|docflow.flow:approve|docflow.flow:request|docflow.edo:read|stock:read|stock.request:read|stock.receipt:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowApprovalSubstitutions: { method: "GET", path: "/api/v1/docflow/approval-substitutions", module: "docflow", stage: "preview", permission: "docflow.flow:configure", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowApprovals: { method: "GET", path: "/api/v1/docflow/approvals", module: "docflow", stage: "preview", permission: "docflow.flow:read|docflow.flow:approve|docflow.flow:request|docflow.edo:read|stock:read|stock.request:read|stock.receipt:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 50 },
  docflowApproveApprovalsBatch: { method: "POST", path: "/api/v1/docflow/approvals/batch-approve", module: "docflow", stage: "preview", permission: "docflow.flow:approve", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowApproveCancellation: { method: "POST", path: "/api/v1/docflow/messages/{id}/cancellation/approve", module: "docflow", stage: "preview", permission: "docflow.edo:send", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowApproveMessage: { method: "POST", path: "/api/v1/docflow/messages/{id}/actions/approve", module: "docflow", stage: "preview", permission: "docflow.edo:send", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowAssignFlowDocument: { method: "POST", path: "/api/v1/docflow/flow/documents/{id}/assignments", module: "docflow", stage: "preview", permission: "docflow.flow:read|docflow.flow:approve", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowCancelApproval: { method: "POST", path: "/api/v1/docflow/approvals/{id}/cancel", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowCancelIntake: { method: "POST", path: "/api/v1/docflow/messages/{id}/intake/cancel", module: "docflow", stage: "preview", permission: "docflow.edo:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowCancelPaymentRequest: { method: "POST", path: "/api/v1/docflow/payment-requests/{id}/cancel", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowCheckApprovalRoute: { method: "GET", path: "/api/v1/docflow/approval-routes/check", module: "docflow", stage: "preview", permission: "docflow.flow:configure_payments", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowCheckConnection: { method: "POST", path: "/api/v1/docflow/connections/{id}/check", module: "docflow", stage: "preview", permission: "docflow.edo:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowContactPaperSettings: { method: "GET", path: "/api/v1/docflow/contacts/{id}/paper-settings", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowCreateApprovalRoute: { method: "POST", path: "/api/v1/docflow/approval-routes", module: "docflow", stage: "preview", permission: "docflow.flow:configure_payments", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowCreateConnection: { method: "POST", path: "/api/v1/docflow/connections", module: "docflow", stage: "preview", permission: "docflow.edo:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowCreateFlowUploadSession: { method: "POST", path: "/api/v1/docflow/flow/documents/{id}/upload-sessions", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowCreatePaymentRequest: { method: "POST", path: "/api/v1/docflow/payment-requests", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowCreatePaymentRequestSchedule: { method: "POST", path: "/api/v1/docflow/payment-request-schedules", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowDecideApproval: { method: "POST", path: "/api/v1/docflow/approvals/{id}/decisions", module: "docflow", stage: "preview", permission: "docflow.flow:approve", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowDeleteApprovalSubstitution: { method: "DELETE", path: "/api/v1/docflow/approval-substitutions/{id}", module: "docflow", stage: "preview", permission: "docflow.flow:configure", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowDeleteConnection: { method: "DELETE", path: "/api/v1/docflow/connections/{id}", module: "docflow", stage: "preview", permission: "docflow.edo:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowDeleteDocumentComment: { method: "DELETE", path: "/api/v1/docflow/comments/{id}", module: "docflow", stage: "preview", permission: "docflow.flow:read|docflow.flow:approve|docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowDeleteFlowEDODraft: { method: "DELETE", path: "/api/v1/docflow/flow/documents/{id}/edo/{link}", module: "docflow", stage: "preview", permission: "docflow.edo:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowDeleteMessageDraft: { method: "DELETE", path: "/api/v1/docflow/messages/{id}/draft", module: "docflow", stage: "preview", permission: "docflow.edo:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowDistributeIncoming: { method: "POST", path: "/api/v1/docflow/messages/{id}/intake/accounting", module: "docflow", stage: "preview", permission: "docflow.edo:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowDocumentCommentMentionCandidates: { method: "GET", path: "/api/v1/docflow/comments/mention-candidates", module: "docflow", stage: "preview", permission: "docflow.flow:read|docflow.flow:approve|docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowDocumentComments: { method: "GET", path: "/api/v1/docflow/comments", module: "docflow", stage: "preview", permission: "docflow.flow:read|docflow.flow:approve|docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowEditDocumentComment: { method: "PUT", path: "/api/v1/docflow/comments/{id}", module: "docflow", stage: "preview", permission: "docflow.flow:read|docflow.flow:approve|docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFinishFlowUploadSession: { method: "POST", path: "/api/v1/docflow/flow/upload-sessions/{id}/finish", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowAccountingCandidates: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/accounting-candidates", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowAccountingLink: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/accounting-links/{link}", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowAccountingOriginals: { method: "GET", path: "/api/v1/docflow/flow/accounting-documents/{owner}/{document}/originals", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowChangeDocument: { method: "POST", path: "/api/v1/docflow/flow/documents/{id}/commands", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowContactStats: { method: "GET", path: "/api/v1/docflow/flow/contacts", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowCreateAccountingOriginal: { method: "POST", path: "/api/v1/docflow/flow/accounting-documents/{owner}/{document}/originals", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowCreateDocument: { method: "POST", path: "/api/v1/docflow/flow/documents", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowDocument: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowDocumentArticles: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/articles", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowDocumentAssignments: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/assignments", module: "docflow", stage: "preview", permission: "docflow.flow:read|docflow.flow:approve", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowDocumentMarks: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/marks", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowDocumentReconciliation: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/reconciliation", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowDocumentRevision: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/revisions/{version}", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowDocumentRevisions: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/revisions", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowDocuments: { method: "GET", path: "/api/v1/docflow/flow/documents", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 50 },
  docflowFlowFileContent: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/files/{fileId}/content", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowFileDownloadSession: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/files/{fileId}/download-session", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowInvoiceDuplicates: { method: "POST", path: "/api/v1/docflow/flow/invoice-duplicates", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowInvoicePayee: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/payee", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowLinkAccountingDocument: { method: "POST", path: "/api/v1/docflow/flow/documents/{id}/accounting-links", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowMarkPaperOriginals: { method: "POST", path: "/api/v1/docflow/flow/originals/paper", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowOriginal: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/original", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowPreviewPaymentSchedule: { method: "POST", path: "/api/v1/docflow/flow/schedule-preview", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowReferences: { method: "GET", path: "/api/v1/docflow/flow/references", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowRegistrationJournals: { method: "GET", path: "/api/v1/docflow/flow/registration-journals", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowRevisionFileContent: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/revisions/{version}/files/{fileId}/content", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowRevisionFileDownloadSession: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/revisions/{version}/files/{fileId}/download-session", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowSetPaperOriginal: { method: "PUT", path: "/api/v1/docflow/flow/documents/{id}/original/paper", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowSetRegistrationJournal: { method: "PUT", path: "/api/v1/docflow/flow/registration-journals/{journal}", module: "docflow", stage: "preview", permission: "docflow.flow:configure", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowSignatureSheet: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/signatures/sheet", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowSignatureSheetDownloadSession: { method: "GET", path: "/api/v1/docflow/flow/documents/{id}/signatures/sheet/download-session", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowSupplierAct: { method: "POST", path: "/api/v1/docflow/flow/documents/{id}/supplier-act", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowFlowUnlinkAccountingDocument: { method: "POST", path: "/api/v1/docflow/flow/documents/{id}/accounting-links/remove", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowGetConnection: { method: "GET", path: "/api/v1/docflow/connections/{id}", module: "docflow", stage: "preview", permission: "docflow.edo:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowGetFlowUploadSession: { method: "GET", path: "/api/v1/docflow/flow/upload-sessions/{id}", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowGetMessage: { method: "GET", path: "/api/v1/docflow/messages/{id}", module: "docflow", stage: "preview", permission: "docflow.edo:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowGovDocument: { method: "GET", path: "/api/v1/docflow/gov/documents/{id}", module: "docflow", stage: "preview", permission: "docflow.edo:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowGovDocuments: { method: "GET", path: "/api/v1/docflow/gov/documents", module: "docflow", stage: "preview", permission: "docflow.edo:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: null },
  docflowGovSummary: { method: "GET", path: "/api/v1/docflow/gov/summary", module: "docflow", stage: "preview", permission: "docflow.edo:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowIncomingAccountingPlan: { method: "GET", path: "/api/v1/docflow/messages/{id}/intake/accounting", module: "docflow", stage: "preview", permission: "docflow.edo:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowIntakePreview: { method: "GET", path: "/api/v1/docflow/messages/{id}/intake", module: "docflow", stage: "preview", permission: "docflow.edo:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowInviteCounterparty: { method: "POST", path: "/api/v1/docflow/connections/{id}/invitations", module: "docflow", stage: "preview", permission: "docflow.edo:send", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowIssueAdvanceInvoice: { method: "POST", path: "/api/v1/docflow/flow/advance-invoices", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowIssueSaleAct: { method: "POST", path: "/api/v1/docflow/sales/{id}/act", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowIssueSaleInvoice: { method: "POST", path: "/api/v1/docflow/sales/{id}/invoice", module: "docflow", stage: "preview", permission: "core.trade:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowIssueSaleUPD: { method: "POST", path: "/api/v1/docflow/sales/{id}/upd", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowIssueShipmentUPD: { method: "POST", path: "/api/v1/docflow/flow/upd/shipment", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowIssueTemplatePastActs: { method: "POST", path: "/api/v1/docflow/sale-templates/{id}/past-acts", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowIssueUKD: { method: "POST", path: "/api/v1/docflow/flow/ukd", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowLinkIntakeCounterparty: { method: "PUT", path: "/api/v1/docflow/messages/{id}/intake/counterparty", module: "docflow", stage: "preview", permission: "docflow.edo:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowListConnections: { method: "GET", path: "/api/v1/docflow/connections", module: "docflow", stage: "preview", permission: "docflow.edo:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowListInvitations: { method: "GET", path: "/api/v1/docflow/invitations", module: "docflow", stage: "preview", permission: "docflow.edo:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 200 },
  docflowListMessages: { method: "GET", path: "/api/v1/docflow/messages", module: "docflow", stage: "preview", permission: "docflow.edo:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 50 },
  docflowListTitles: { method: "GET", path: "/api/v1/docflow/outgoing", module: "docflow", stage: "preview", permission: "docflow.edo:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowLookupParticipant: { method: "POST", path: "/api/v1/docflow/connections/{id}/participants/lookup", module: "docflow", stage: "preview", permission: "docflow.edo:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowMailPapers: { method: "GET", path: "/api/v1/docflow/mail-messages/{id}/papers", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowMarkGovAnswered: { method: "POST", path: "/api/v1/docflow/gov/documents/{id}/answered", module: "docflow", stage: "preview", permission: "docflow.edo:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowMarkMessageViewed: { method: "POST", path: "/api/v1/docflow/messages/{id}/viewed", module: "docflow", stage: "preview", permission: "docflow.edo:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowMyFlowAssignments: { method: "GET", path: "/api/v1/docflow/flow/assignments", module: "docflow", stage: "preview", permission: "docflow.flow:read|docflow.flow:approve|docflow.flow:request|docflow.edo:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowPackagePapers: { method: "GET", path: "/api/v1/docflow/messages/{id}/papers", module: "docflow", stage: "preview", permission: "docflow.edo:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowPaymentBasisBalances: { method: "GET", path: "/api/v1/docflow/payment-requests/basis-balances", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowPaymentBudgetLimits: { method: "GET", path: "/api/v1/docflow/payment-requests/budget-limits", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowPaymentDetails: { method: "GET", path: "/api/v1/docflow/messages/{id}/payment-details", module: "docflow", stage: "preview", permission: "docflow.edo:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowPaymentRequest: { method: "GET", path: "/api/v1/docflow/payment-requests/{id}", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowPaymentRequestRoutePreview: { method: "GET", path: "/api/v1/docflow/payment-requests/route-preview", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowPaymentRequestSchedule: { method: "GET", path: "/api/v1/docflow/payment-request-schedules/{id}", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowPaymentRequestSchedules: { method: "GET", path: "/api/v1/docflow/payment-request-schedules", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowPaymentRequestSuggest: { method: "GET", path: "/api/v1/docflow/payment-requests/suggest", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowPaymentRequests: { method: "GET", path: "/api/v1/docflow/payment-requests", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowPreflightBuyerTitle: { method: "POST", path: "/api/v1/docflow/messages/{id}/buyer-title/preflight", module: "docflow", stage: "preview", permission: "docflow.edo:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowPreflightFlowFNS: { method: "POST", path: "/api/v1/docflow/flow/documents/{id}/fns/preflight", module: "docflow", stage: "preview", permission: "docflow.edo:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowPreflightOutgoing: { method: "POST", path: "/api/v1/docflow/outgoing/preflight", module: "docflow", stage: "preview", permission: "docflow.edo:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowPreviewMessageAction: { method: "POST", path: "/api/v1/docflow/messages/{id}/actions/preview", module: "docflow", stage: "preview", permission: "docflow.edo:send", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowPreviewPaymentRequestPayeeRefresh: { method: "GET", path: "/api/v1/docflow/payment-requests/{id}/payee-refresh", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowPurchaseRequestQueue: { method: "GET", path: "/api/v1/docflow/approvals/purchase-queue", module: "docflow", stage: "preview", permission: "docflow.flow:read|core.trade:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowRecallPaymentRequest: { method: "POST", path: "/api/v1/docflow/payment-requests/{id}/recall", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowRecognizePaymentInvoice: { method: "POST", path: "/api/v1/docflow/payment-requests/recognize", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowRefreshMessage: { method: "POST", path: "/api/v1/docflow/messages/{id}/refresh", module: "docflow", stage: "preview", permission: "docflow.edo:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowRefreshPaymentRequestPayee: { method: "POST", path: "/api/v1/docflow/payment-requests/{id}/payee-refresh", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowRejectCancellation: { method: "POST", path: "/api/v1/docflow/messages/{id}/cancellation/reject", module: "docflow", stage: "preview", permission: "docflow.edo:send", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowRejectMessage: { method: "POST", path: "/api/v1/docflow/messages/{id}/actions/reject", module: "docflow", stage: "preview", permission: "docflow.edo:send", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowRequestCancellation: { method: "POST", path: "/api/v1/docflow/messages/{id}/cancellation", module: "docflow", stage: "preview", permission: "docflow.edo:send", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowResetContactPaperSettings: { method: "DELETE", path: "/api/v1/docflow/contacts/{id}/paper-settings", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowRestoreMessage: { method: "POST", path: "/api/v1/docflow/messages/{id}/restore", module: "docflow", stage: "preview", permission: "docflow.edo:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowResubmitApproval: { method: "POST", path: "/api/v1/docflow/approvals/{id}/resubmit", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowReturnUKD: { method: "GET", path: "/api/v1/docflow/flow/ukd", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowReworkPaymentRequest: { method: "POST", path: "/api/v1/docflow/payment-requests/{id}/rework", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowSaleDocumentSet: { method: "GET", path: "/api/v1/docflow/sales/{id}/set", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowSalesActRelink: { method: "POST", path: "/api/v1/docflow/flow/documents/{id}/sales-act-relink", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowSaveApprovalPolicy: { method: "PUT", path: "/api/v1/docflow/approval-policies", module: "docflow", stage: "preview", permission: "docflow.flow:configure_payments", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowSaveApprovalRoute: { method: "PUT", path: "/api/v1/docflow/approval-routes/{id}", module: "docflow", stage: "preview", permission: "docflow.flow:configure_payments", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowSaveApprovalSubstitution: { method: "POST", path: "/api/v1/docflow/approval-substitutions", module: "docflow", stage: "preview", permission: "docflow.flow:configure", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowSaveContactPaperSettings: { method: "PUT", path: "/api/v1/docflow/contacts/{id}/paper-settings", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowSendBuyerTitle: { method: "POST", path: "/api/v1/docflow/messages/{id}/buyer-title", module: "docflow", stage: "preview", permission: "docflow.edo:send", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowSendFlowFNS: { method: "POST", path: "/api/v1/docflow/flow/documents/{id}/fns/send", module: "docflow", stage: "preview", permission: "docflow.edo:send", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowSendOutgoing: { method: "POST", path: "/api/v1/docflow/outgoing", module: "docflow", stage: "preview", permission: "docflow.edo:send", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowSetApprovalRouteActive: { method: "POST", path: "/api/v1/docflow/approval-routes/{id}/active", module: "docflow", stage: "preview", permission: "docflow.flow:configure_payments", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowSetConnectionMode: { method: "PUT", path: "/api/v1/docflow/connections/{id}/mode", module: "docflow", stage: "preview", permission: "docflow.edo:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowSetPaymentRequestScheduleStatus: { method: "POST", path: "/api/v1/docflow/payment-request-schedules/{id}/status", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowSubmitApproval: { method: "POST", path: "/api/v1/docflow/approvals", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowSubmitPaymentRequest: { method: "POST", path: "/api/v1/docflow/payment-requests/{id}/submit", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowSubmitPaymentRequestOverBudget: { method: "POST", path: "/api/v1/docflow/payment-requests/{id}/submit-over-budget", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowSyncConnection: { method: "POST", path: "/api/v1/docflow/connections/{id}/sync", module: "docflow", stage: "preview", permission: "docflow.edo:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowTemplatePastActs: { method: "GET", path: "/api/v1/docflow/sale-templates/{id}/past-acts", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowTrashMessage: { method: "POST", path: "/api/v1/docflow/messages/{id}/trash", module: "docflow", stage: "preview", permission: "docflow.edo:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowUnmarkGovAnswered: { method: "DELETE", path: "/api/v1/docflow/gov/documents/{id}/answered", module: "docflow", stage: "preview", permission: "docflow.edo:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowUpdateConnection: { method: "PATCH", path: "/api/v1/docflow/connections/{id}", module: "docflow", stage: "preview", permission: "docflow.edo:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowUpdatePaymentRequest: { method: "PUT", path: "/api/v1/docflow/payment-requests/{id}", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowUpdatePaymentRequestSchedule: { method: "PUT", path: "/api/v1/docflow/payment-request-schedules/{id}", module: "docflow", stage: "preview", permission: "docflow.flow:request", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowYandexKitHandover: { method: "GET", path: "/api/v1/docflow/yandex-kit/handover", module: "docflow", stage: "preview", permission: "stock:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowYandexKitMarkShipped: { method: "POST", path: "/api/v1/docflow/yandex-kit/handover/{service}/shipped", module: "docflow", stage: "preview", permission: "stock.shipment:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowYandexKitOrders: { method: "GET", path: "/api/v1/docflow/yandex-kit/orders", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "limit", pageSizeMax: 200, pageSizeDefault: null },
  docflowYandexKitState: { method: "GET", path: "/api/v1/docflow/yandex-kit/state", module: "docflow", stage: "preview", permission: "docflow.flow:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  docflowYandexKitSync: { method: "POST", path: "/api/v1/docflow/yandex-kit/sync", module: "docflow", stage: "preview", permission: "docflow.flow:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesAbortUpload: { method: "DELETE", path: "/api/v1/files/uploads/{id}", module: "files", stage: "preview", permission: "files:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesCompleteUpload: { method: "POST", path: "/api/v1/files/uploads/{id}/complete", module: "files", stage: "preview", permission: "files:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesContentLink: { method: "GET", path: "/api/v1/files/items/{id}/content-url", module: "files", stage: "preview", permission: "files:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesCreateFolder: { method: "POST", path: "/api/v1/files/folders", module: "files", stage: "preview", permission: "files:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesCreateRoot: { method: "POST", path: "/api/v1/files/roots", module: "files", stage: "preview", permission: "files:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesCreateShare: { method: "POST", path: "/api/v1/files/shares", module: "files", stage: "preview", permission: "files:share", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesCreateShortcut: { method: "POST", path: "/api/v1/files/shortcuts", module: "files", stage: "preview", permission: "files:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesDownloadFile: { method: "GET", path: "/api/v1/files/items/{id}/content", module: "files", stage: "preview", permission: "files:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesFolderAccess: { method: "GET", path: "/api/v1/files/folders/{id}/access", module: "files", stage: "preview", permission: "files:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesGetFile: { method: "GET", path: "/api/v1/files/items/{id}", module: "files", stage: "preview", permission: "files:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesListEntries: { method: "GET", path: "/api/v1/files/folders/{id}/entries", module: "files", stage: "preview", permission: "files:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 200 },
  filesListRoots: { method: "GET", path: "/api/v1/files/roots", module: "files", stage: "preview", permission: "files:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesListShares: { method: "GET", path: "/api/v1/files/shares", module: "files", stage: "preview", permission: "files:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesListVersions: { method: "GET", path: "/api/v1/files/items/{id}/versions", module: "files", stage: "preview", permission: "files:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesReplaceFolderAccess: { method: "PUT", path: "/api/v1/files/folders/{id}/access", module: "files", stage: "preview", permission: "files:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesRevokeShare: { method: "DELETE", path: "/api/v1/files/shares/{id}", module: "files", stage: "preview", permission: "files:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesSearch: { method: "GET", path: "/api/v1/files/search", module: "files", stage: "preview", permission: "files:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 25 },
  filesStartUpload: { method: "POST", path: "/api/v1/files/uploads", module: "files", stage: "preview", permission: "files:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesUploadStatus: { method: "GET", path: "/api/v1/files/uploads/{id}", module: "files", stage: "preview", permission: "files:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  filesVersionContentLink: { method: "GET", path: "/api/v1/files/versions/{id}/content-url", module: "files", stage: "preview", permission: "files:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeAcceptFixedAsset: { method: "POST", path: "/api/v1/finance/fixed-assets/{id}/acceptance", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeAcceptStatementMail: { method: "POST", path: "/api/v1/finance/statement-mailboxes/{id}/mails/{mailId}/accept", module: "finance", stage: "preview", permission: "finance.connectors:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeAccountableBalances: { method: "GET", path: "/api/v1/finance/accountable/balances", module: "finance", stage: "preview", permission: "finance.accountable:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeActBudgetSubmission: { method: "POST", path: "/api/v1/finance/budgets/submissions", module: "finance", stage: "preview", permission: "finance.budgets:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeAddAllocationRule: { method: "POST", path: "/api/v1/finance/settlements/allocation-rules", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeAddPaymentRegistryLine: { method: "POST", path: "/api/v1/finance/payment-registries/{id}/lines", module: "finance", stage: "preview", permission: "finance.payment-requests:plan", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeAddTaxRecipientFromPayment: { method: "POST", path: "/api/v1/finance/taxes/settings/recipients", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeAdoptConnectorAccount: { method: "POST", path: "/api/v1/finance/connectors/accounts/{accountId}/adopt", module: "finance", stage: "preview", permission: "finance.connectors:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeApplyAllocationRules: { method: "POST", path: "/api/v1/finance/settlements/unapplied/apply-rules", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeApplyBudgetDrivers: { method: "POST", path: "/api/v1/finance/budgets/drivers/apply", module: "finance", stage: "preview", permission: "finance.budgets:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeApplyBudgetPayrollModel: { method: "POST", path: "/api/v1/finance/budgets/payroll-model", module: "finance", stage: "preview", permission: "finance.budgets:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeApplyCashflowTemplate: { method: "POST", path: "/api/v1/finance/cashflow-layouts/template", module: "finance", stage: "preview", permission: "finance.pnl_layouts:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeApplyExchangeItem: { method: "POST", path: "/api/v1/finance/exchange/items/{id}/apply", module: "finance", stage: "preview", permission: "finance.exchange:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeApplyImport: { method: "POST", path: "/api/v1/finance/imports/{id}/apply", module: "finance", stage: "preview", permission: "finance.imports:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeApplyRefundSettlement: { method: "POST", path: "/api/v1/finance/settlements/refunds", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeApproveBudgetVersion: { method: "POST", path: "/api/v1/finance/budgets/versions/{id}/approve", module: "finance", stage: "preview", permission: "finance.budgets:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeApproveDividendDecision: { method: "POST", path: "/api/v1/finance/dividends/decisions/{id}/approve", module: "finance", stage: "preview", permission: "finance.dividends:approve", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeApproveDividendPolicy: { method: "POST", path: "/api/v1/finance/dividends/policies/{id}/approve", module: "finance", stage: "preview", permission: "finance.dividends:approve", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeApprovePaymentRegistry: { method: "POST", path: "/api/v1/finance/payment-registries/{id}/approve", module: "finance", stage: "preview", permission: "finance.payment-requests:send", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeAssignLegacyPayrollMonths: { method: "POST", path: "/api/v1/finance/payroll/payout-months/legacy", module: "finance", stage: "preview", permission: "finance.payroll:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeAttachPaymentRequestFacts: { method: "POST", path: "/api/v1/finance/payment-requests/{id}/fact", module: "finance", stage: "preview", permission: "finance.payment-requests:plan", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeAttachPaymentRequestToReceipts: { method: "POST", path: "/api/v1/finance/payment-requests/{id}/receipt-cost", module: "finance", stage: "preview", permission: "finance.payment-requests:plan", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeAttachPaymentToReceipts: { method: "POST", path: "/api/v1/finance/settlements/payments/{id}/receipt-cost", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeBackfillCashflowBase: { method: "POST", path: "/api/v1/finance/registers/cashflow-base-backfill", module: "finance", stage: "preview", permission: "finance.registers:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeBackfillSalesRegister: { method: "POST", path: "/api/v1/finance/registers/sales-backfill", module: "finance", stage: "preview", permission: "finance.registers:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeBonusReportLines: { method: "GET", path: "/api/v1/finance/staffing/bonus-report-lines", module: "finance", stage: "preview", permission: "finance.staffing:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeBonusSchemes: { method: "GET", path: "/api/v1/finance/staffing/bonus-schemes", module: "finance", stage: "preview", permission: "finance.staffing:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeBudget: { method: "GET", path: "/api/v1/finance/budgets", module: "finance", stage: "preview", permission: "finance.budgets:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeBudgetBalance: { method: "GET", path: "/api/v1/finance/budgets/balance", module: "finance", stage: "preview", permission: "finance.budgets:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeBudgetBridge: { method: "GET", path: "/api/v1/finance/budgets/bridge", module: "finance", stage: "preview", permission: "finance.budgets:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeBudgetCashflowFromPnl: { method: "POST", path: "/api/v1/finance/budgets/cashflow-from-pnl", module: "finance", stage: "preview", permission: "finance.budgets:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeBudgetDrivers: { method: "GET", path: "/api/v1/finance/budgets/drivers", module: "finance", stage: "preview", permission: "finance.budgets:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeBudgetForecast: { method: "GET", path: "/api/v1/finance/budgets/forecast", module: "finance", stage: "preview", permission: "finance.budgets:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeBudgetGroup: { method: "GET", path: "/api/v1/finance/budgets/group", module: "finance", stage: "preview", permission: "finance.budgets:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeBudgetHistory: { method: "GET", path: "/api/v1/finance/budgets/history", module: "finance", stage: "preview", permission: "finance.budgets:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeBudgetPaymentTerms: { method: "GET", path: "/api/v1/finance/budgets/payment-terms", module: "finance", stage: "preview", permission: "finance.budgets:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeBudgetPlanFact: { method: "GET", path: "/api/v1/finance/budgets/plan-fact", module: "finance", stage: "preview", permission: "finance.budgets:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeBudgetReservations: { method: "GET", path: "/api/v1/finance/budgets/reservations", module: "finance", stage: "preview", permission: "finance.budgets:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeBudgetSetting: { method: "GET", path: "/api/v1/finance/budgets/settings", module: "finance", stage: "preview", permission: "finance.budgets:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeBudgetSubmissions: { method: "GET", path: "/api/v1/finance/budgets/submissions", module: "finance", stage: "preview", permission: "finance.budgets:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeBudgetVersion: { method: "GET", path: "/api/v1/finance/budgets/versions/{id}", module: "finance", stage: "preview", permission: "finance.budgets:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeBudgetVersions: { method: "GET", path: "/api/v1/finance/budgets/versions", module: "finance", stage: "preview", permission: "finance.budgets:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCancelCashOperation: { method: "POST", path: "/api/v1/finance/cash-operations/{id}/cancel", module: "finance", stage: "preview", permission: "finance.cash_operations:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCancelExpenseReport: { method: "POST", path: "/api/v1/finance/accountable/reports/{id}/cancel", module: "finance", stage: "preview", permission: "finance.accountable:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCancelFixedAssetDepreciation: { method: "POST", path: "/api/v1/finance/fixed-assets/depreciation/cancel", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCancelOperation: { method: "POST", path: "/api/v1/finance/operations/{id}/cancel", module: "finance", stage: "preview", permission: "finance.operations:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCancelPaymentPlan: { method: "POST", path: "/api/v1/finance/payment-calendar/plans/{id}/cancel", module: "finance", stage: "preview", permission: "finance.payment_calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCancelPaymentRegistry: { method: "POST", path: "/api/v1/finance/payment-registries/{id}/cancel", module: "finance", stage: "preview", permission: "finance.payment-requests:plan", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCancelPayrollDocument: { method: "POST", path: "/api/v1/finance/payroll/documents/{id}/cancel", module: "finance", stage: "preview", permission: "finance.payroll:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCancelPayrollMonthClose: { method: "POST", path: "/api/v1/finance/payroll/month-close/{id}/cancel", module: "finance", stage: "preview", permission: "finance.payroll:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCancelSettlementDocument: { method: "POST", path: "/api/v1/finance/settlements/documents/{id}/cancel", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCancelTaxMonth: { method: "POST", path: "/api/v1/finance/taxes/months/{id}/cancel", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCancelVATQuarter: { method: "POST", path: "/api/v1/finance/vat-quarters/{id}/cancel", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCashflowEntries: { method: "GET", path: "/api/v1/finance/reports/cashflow/entries", module: "finance", stage: "preview", permission: "finance.reports.cashflow:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCategorizeCashOperation: { method: "POST", path: "/api/v1/finance/cash-operations/{id}/categorize", module: "finance", stage: "preview", permission: "finance.cash_operations:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCategorizeTransaction: { method: "POST", path: "/api/v1/finance/transactions/{id}/categorize", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeChangeActPnlItem: { method: "POST", path: "/api/v1/finance/trade/acts/{id}/pnl-item", module: "finance", stage: "preview", permission: "finance.operations:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCheckConnectorStatement: { method: "POST", path: "/api/v1/finance/connectors/{id}/accounts/{accountId}/check-statement", module: "finance", stage: "preview", permission: "finance.connectors:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCheckOneCConnection: { method: "POST", path: "/api/v1/finance/exchange/onec/connections/{id}/check", module: "finance", stage: "preview", permission: "finance.exchange:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeClassificationSuggestions: { method: "GET", path: "/api/v1/finance/classification-suggestions", module: "finance", stage: "preview", permission: "finance.transactions:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 50 },
  financeCloseAdvancesToExpense: { method: "POST", path: "/api/v1/finance/settlements/closing-awaited/close-expense-batch", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeClosePaymentRequestShort: { method: "POST", path: "/api/v1/finance/payment-requests/{id}/close-short", module: "finance", stage: "preview", permission: "finance.payment-requests:plan", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCompareBudgetVersions: { method: "GET", path: "/api/v1/finance/budgets/versions/compare", module: "finance", stage: "preview", permission: "finance.budgets:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeConfirmPaymentRequestPayee: { method: "POST", path: "/api/v1/finance/payment-requests/{id}/confirm-payee", module: "finance", stage: "preview", permission: "finance.payment-requests:send", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCorrectVATQuarter: { method: "POST", path: "/api/v1/finance/vat-quarters/{id}/correct", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateAccount: { method: "POST", path: "/api/v1/finance/accounts", module: "finance", stage: "preview", permission: "finance.accounts:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateBonusScheme: { method: "POST", path: "/api/v1/finance/staffing/bonus-schemes", module: "finance", stage: "preview", permission: "finance.staffing:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateBudgetReservation: { method: "POST", path: "/api/v1/finance/budgets/reservations", module: "finance", stage: "preview", permission: "finance.budgets:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateCashOperation: { method: "POST", path: "/api/v1/finance/cash-operations", module: "finance", stage: "preview", permission: "finance.cash_operations:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateConnector: { method: "POST", path: "/api/v1/finance/connectors", module: "finance", stage: "preview", permission: "finance.connectors:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateCounterpartyTerms: { method: "POST", path: "/api/v1/finance/counterparties/{contactId}/terms", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateDividendDecision: { method: "POST", path: "/api/v1/finance/dividends/decisions", module: "finance", stage: "preview", permission: "finance.dividends:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateDividendPolicy: { method: "POST", path: "/api/v1/finance/dividends/policies", module: "finance", stage: "preview", permission: "finance.dividends:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateExpenseReport: { method: "POST", path: "/api/v1/finance/accountable/reports", module: "finance", stage: "preview", permission: "finance.accountable:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateFixedAsset: { method: "POST", path: "/api/v1/finance/fixed-assets", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateOneCConnection: { method: "POST", path: "/api/v1/finance/exchange/onec/connections", module: "finance", stage: "preview", permission: "finance.exchange:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateOpeningAdvanceVAT: { method: "POST", path: "/api/v1/finance/opening-debts/{id}/advance-vat", module: "finance", stage: "preview", permission: "finance.accounts:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateOpeningDebt: { method: "POST", path: "/api/v1/finance/opening-debts", module: "finance", stage: "preview", permission: "finance.accounts:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateOperation: { method: "POST", path: "/api/v1/finance/operations", module: "finance", stage: "preview", permission: "finance.operations:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateOperationAccrual: { method: "POST", path: "/api/v1/finance/operations/{id}/accruals", module: "finance", stage: "preview", permission: "finance.operations:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreatePaymentPlan: { method: "POST", path: "/api/v1/finance/payment-calendar/plans", module: "finance", stage: "preview", permission: "finance.payment_calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreatePayrollDocument: { method: "POST", path: "/api/v1/finance/payroll/documents", module: "finance", stage: "preview", permission: "finance.payroll:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreatePnlLayout: { method: "POST", path: "/api/v1/finance/pnl-layouts", module: "finance", stage: "preview", permission: "finance.pnl_layouts:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateSettlementDocument: { method: "POST", path: "/api/v1/finance/settlements/documents", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateStaffPosition: { method: "POST", path: "/api/v1/finance/staffing/positions", module: "finance", stage: "preview", permission: "finance.staffing:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateStaffingOrder: { method: "POST", path: "/api/v1/finance/staffing/orders", module: "finance", stage: "preview", permission: "finance.staffing:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateStatement: { method: "POST", path: "/api/v1/finance/statements", module: "finance", stage: "preview", permission: "finance.statements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateStatementMailbox: { method: "POST", path: "/api/v1/finance/statement-mailboxes", module: "finance", stage: "preview", permission: "finance.connectors:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateTaxMonth: { method: "POST", path: "/api/v1/finance/taxes/months", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateTradeAct: { method: "POST", path: "/api/v1/finance/trade/{id}/acts", module: "finance", stage: "preview", permission: "finance.operations:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateTransaction: { method: "POST", path: "/api/v1/finance/transactions", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateVATQuarter: { method: "POST", path: "/api/v1/finance/vat-quarters", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeDebtWriteOffOptions: { method: "GET", path: "/api/v1/finance/settlements/obligations/{id}/write-off", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeDeleteAccount: { method: "DELETE", path: "/api/v1/finance/accounts/{id}", module: "finance", stage: "preview", permission: "finance.accounts:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeDeleteAccountStatement: { method: "DELETE", path: "/api/v1/finance/accounts/{id}/statements/{statementId}", module: "finance", stage: "preview", permission: "finance.statements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeDeleteAcquirer: { method: "DELETE", path: "/api/v1/finance/acquirers/{id}", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeDeleteConnector: { method: "DELETE", path: "/api/v1/finance/connectors/{id}", module: "finance", stage: "preview", permission: "finance.connectors:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeDeleteOneCConnection: { method: "DELETE", path: "/api/v1/finance/exchange/onec/connections/{id}", module: "finance", stage: "preview", permission: "finance.exchange:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeDeletePnlLayout: { method: "DELETE", path: "/api/v1/finance/pnl-layouts/{id}", module: "finance", stage: "preview", permission: "finance.pnl_layouts:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeDeleteSettlementDocument: { method: "DELETE", path: "/api/v1/finance/settlements/documents/{id}", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeDismissEmployee: { method: "POST", path: "/api/v1/finance/staffing/dismissals", module: "finance", stage: "preview", permission: "finance.staffing:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeDisposeFixedAsset: { method: "POST", path: "/api/v1/finance/fixed-assets/{id}/disposal", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeExecutePaymentPlan: { method: "POST", path: "/api/v1/finance/payment-calendar/plans/{id}/execute", module: "finance", stage: "preview", permission: "finance.payment_calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeExpenseReports: { method: "GET", path: "/api/v1/finance/accountable/reports", module: "finance", stage: "preview", permission: "finance.accountable:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 200 },
  financeFixedAssets: { method: "GET", path: "/api/v1/finance/fixed-assets", module: "finance", stage: "preview", permission: "finance.period:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetAccount: { method: "GET", path: "/api/v1/finance/accounts/{id}", module: "finance", stage: "preview", permission: "finance.accounts:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetAccountReconciliation: { method: "GET", path: "/api/v1/finance/accounts/{id}/reconciliation", module: "finance", stage: "preview", permission: "finance.accounts:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetAcquiringOverview: { method: "GET", path: "/api/v1/finance/acquiring/overview", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetAcquiringRegistry: { method: "GET", path: "/api/v1/finance/acquiring/registries/{id}", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetBalanceReport: { method: "GET", path: "/api/v1/finance/reports/balance", module: "finance", stage: "preview", permission: "finance.reports.balance:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetCashOperationCancelConsequences: { method: "GET", path: "/api/v1/finance/cash-operations/{id}/cancel-consequences", module: "finance", stage: "preview", permission: "finance.cash_operations:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetCashflowReport: { method: "GET", path: "/api/v1/finance/reports/cashflow", module: "finance", stage: "preview", permission: "finance.reports.cashflow:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetConnector: { method: "GET", path: "/api/v1/finance/connectors/{id}", module: "finance", stage: "preview", permission: "finance.connectors:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetConnectorSyncSettings: { method: "GET", path: "/api/v1/finance/connectors/sync-settings", module: "finance", stage: "preview", permission: "finance.connectors:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetCounterpartyTerms: { method: "GET", path: "/api/v1/finance/counterparties/{contactId}/terms", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetDividendSummary: { method: "GET", path: "/api/v1/finance/dividends/summary", module: "finance", stage: "preview", permission: "finance.dividends:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetFixedAsset: { method: "GET", path: "/api/v1/finance/fixed-assets/{id}", module: "finance", stage: "preview", permission: "finance.period:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetImport: { method: "GET", path: "/api/v1/finance/imports/{id}", module: "finance", stage: "preview", permission: "finance.imports:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetOneCConnection: { method: "GET", path: "/api/v1/finance/exchange/onec/connections/{id}", module: "finance", stage: "preview", permission: "finance.exchange:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetOperation: { method: "GET", path: "/api/v1/finance/operations/{id}", module: "finance", stage: "preview", permission: "finance.operations:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetOperationDocumentLinks: { method: "GET", path: "/api/v1/finance/operations/{id}/documents/{documentId}/links", module: "finance", stage: "preview", permission: "finance.operations:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetPaymentCalendar: { method: "GET", path: "/api/v1/finance/payment-calendar", module: "finance", stage: "preview", permission: "finance.payment_calendar:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetPayrollAutomation: { method: "GET", path: "/api/v1/finance/payroll/automation", module: "finance", stage: "preview", permission: "finance.payroll:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetPayrollJournal: { method: "GET", path: "/api/v1/finance/reports/payroll", module: "finance", stage: "preview", permission: "finance.reports.payroll:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetPayrollPayments: { method: "GET", path: "/api/v1/finance/reports/payroll/payments", module: "finance", stage: "preview", permission: "finance.reports.payroll:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetPeriodCloseChecks: { method: "GET", path: "/api/v1/finance/period-checks", module: "finance", stage: "preview", permission: "finance.period:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetPnlLayout: { method: "GET", path: "/api/v1/finance/pnl-layouts/{id}", module: "finance", stage: "preview", permission: "finance.pnl_layouts:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetPnlReport: { method: "GET", path: "/api/v1/finance/reports/pnl", module: "finance", stage: "preview", permission: "finance.reports.pnl:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetProjectBudgetHistory: { method: "GET", path: "/api/v1/finance/project-budgets", module: "finance", stage: "preview", permission: "finance.project_budgets:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetProjectEconomics: { method: "GET", path: "/api/v1/finance/reports/projects", module: "finance", stage: "preview", permission: "finance.reports.projects:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetReconciliation: { method: "GET", path: "/api/v1/finance/transactions/reconciliation", module: "finance", stage: "preview", permission: "finance.transactions:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetSettlementDocument: { method: "GET", path: "/api/v1/finance/settlements/documents/{id}", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetSettlementPosition: { method: "GET", path: "/api/v1/finance/settlements/position", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetStatementMailbox: { method: "GET", path: "/api/v1/finance/statement-mailboxes/{id}", module: "finance", stage: "preview", permission: "finance.connectors:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetTaxCalc: { method: "GET", path: "/api/v1/finance/taxes/calc", module: "finance", stage: "preview", permission: "finance.period:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetTaxMonth: { method: "GET", path: "/api/v1/finance/taxes/months/{id}", module: "finance", stage: "preview", permission: "finance.period:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetTaxSettings: { method: "GET", path: "/api/v1/finance/taxes/settings", module: "finance", stage: "preview", permission: "finance.period:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetTaxSummary: { method: "GET", path: "/api/v1/finance/taxes/summary", module: "finance", stage: "preview", permission: "finance.period:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetTradeAdvance: { method: "GET", path: "/api/v1/finance/trade-journal/advance", module: "finance", stage: "preview", permission: "finance.reports.trade:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetTradeJournal: { method: "GET", path: "/api/v1/finance/trade-journal", module: "finance", stage: "preview", permission: "finance.reports.trade:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 500 },
  financeGetTransaction: { method: "GET", path: "/api/v1/finance/transactions/{id}", module: "finance", stage: "preview", permission: "finance.transactions:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetUnallocatedMoney: { method: "GET", path: "/api/v1/finance/transactions/unallocated", module: "finance", stage: "preview", permission: "finance.transactions:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetVATQuarter: { method: "GET", path: "/api/v1/finance/vat-quarters/{id}", module: "finance", stage: "preview", permission: "finance.period:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeImportAcquiringRegistry: { method: "POST", path: "/api/v1/finance/acquiring/registries", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeImportFixedAssets: { method: "POST", path: "/api/v1/finance/fixed-assets/import", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeInspectImport: { method: "POST", path: "/api/v1/finance/imports/{id}/inspect", module: "finance", stage: "preview", permission: "finance.imports:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeLinkPaymentToNewOrder: { method: "POST", path: "/api/v1/finance/settlements/payments/{id}/link-order", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeLinkStatementTransactions: { method: "POST", path: "/api/v1/finance/statements/{id}/transactions", module: "finance", stage: "preview", permission: "finance.statements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeLinkTransactionPaymentRequest: { method: "POST", path: "/api/v1/finance/transactions/{id}/payment-requests", module: "finance", stage: "preview", permission: "finance.payment-requests:plan", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListAccountStatements: { method: "GET", path: "/api/v1/finance/accounts/{id}/statements", module: "finance", stage: "preview", permission: "finance.statements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListAccounts: { method: "GET", path: "/api/v1/finance/accounts", module: "finance", stage: "preview", permission: "finance.accounts:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListAcquirers: { method: "GET", path: "/api/v1/finance/acquirers", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListAllocationRules: { method: "GET", path: "/api/v1/finance/settlements/allocation-rules", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListCashOperations: { method: "GET", path: "/api/v1/finance/cash-operations", module: "finance", stage: "preview", permission: "finance.cash_operations:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 50 },
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
  financeListOneCConnections: { method: "GET", path: "/api/v1/finance/exchange/onec/connections", module: "finance", stage: "preview", permission: "finance.exchange:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListPaymentFacts: { method: "GET", path: "/api/v1/finance/payment-calendar/operations", module: "finance", stage: "preview", permission: "finance.payment_calendar:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 200 },
  financeListPayrollAutomationRuns: { method: "GET", path: "/api/v1/finance/payroll/automation/runs", module: "finance", stage: "preview", permission: "finance.payroll:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 100 },
  financeListPnlLayoutItems: { method: "GET", path: "/api/v1/finance/pnl-layouts/items", module: "finance", stage: "preview", permission: "finance.pnl_layouts:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListPnlLayouts: { method: "GET", path: "/api/v1/finance/pnl-layouts", module: "finance", stage: "preview", permission: "finance.pnl_layouts:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListSettlementBalances: { method: "GET", path: "/api/v1/finance/settlements/balances", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: null },
  financeListSettlementDocuments: { method: "GET", path: "/api/v1/finance/settlements/documents", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 200 },
  financeListSettlementPayments: { method: "GET", path: "/api/v1/finance/settlements/payments", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListSettlementSources: { method: "GET", path: "/api/v1/finance/settlements/sources", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListStatementMailboxes: { method: "GET", path: "/api/v1/finance/statement-mailboxes", module: "finance", stage: "preview", permission: "finance.connectors:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListStatementMails: { method: "GET", path: "/api/v1/finance/statement-mailboxes/{id}/mails", module: "finance", stage: "preview", permission: "finance.connectors:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 200, pageSizeDefault: 200 },
  financeListStatements: { method: "GET", path: "/api/v1/finance/statements", module: "finance", stage: "preview", permission: "finance.statements:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 100 },
  financeListTaxKinds: { method: "GET", path: "/api/v1/finance/taxes/kinds", module: "finance", stage: "preview", permission: "finance.period:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListTaxMonths: { method: "GET", path: "/api/v1/finance/taxes/months", module: "finance", stage: "preview", permission: "finance.period:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: null },
  financeListTaxPayments: { method: "GET", path: "/api/v1/finance/taxes/payments", module: "finance", stage: "preview", permission: "finance.period:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListTransactions: { method: "GET", path: "/api/v1/finance/transactions", module: "finance", stage: "preview", permission: "finance.transactions:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 500 },
  financeListVATQuarters: { method: "GET", path: "/api/v1/finance/vat-quarters", module: "finance", stage: "preview", permission: "finance.period:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: null },
  financeLookupCompany: { method: "GET", path: "/api/v1/finance/lookup/company", module: "finance", stage: "preview", permission: "finance.lookup:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeLookupRequisites: { method: "GET", path: "/api/v1/finance/lookup/requisites", module: "finance", stage: "preview", permission: "finance.lookup:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeMapImport: { method: "PATCH", path: "/api/v1/finance/imports/{id}/mapping", module: "finance", stage: "preview", permission: "finance.imports:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeMapImportItems: { method: "PATCH", path: "/api/v1/finance/imports/{id}/item-mapping", module: "finance", stage: "preview", permission: "finance.imports:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeMarkPayrollMonthClosed: { method: "POST", path: "/api/v1/finance/payroll/month-close", module: "finance", stage: "preview", permission: "finance.payroll:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeMarkTransactionDeleted: { method: "POST", path: "/api/v1/finance/transactions/{id}/mark-deleted", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeMergeItem: { method: "POST", path: "/api/v1/finance/items/{id}/merge", module: "finance", stage: "preview", permission: "finance.statements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeNetPayrollParts: { method: "POST", path: "/api/v1/finance/payroll/parts/netting", module: "finance", stage: "preview", permission: "finance.payroll:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeOffsetTradeAdvances: { method: "POST", path: "/api/v1/finance/trade/{id}/advance-offset", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeOneCBankReconciliation: { method: "GET", path: "/api/v1/finance/exchange/onec/connections/{id}/bank-reconciliation", module: "finance", stage: "preview", permission: "finance.exchange:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeOneCMappings: { method: "GET", path: "/api/v1/finance/exchange/onec/connections/{id}/mappings", module: "finance", stage: "preview", permission: "finance.exchange:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeOneCPayrollRegistry: { method: "GET", path: "/api/v1/finance/exchange/onec/payroll-registry", module: "finance", stage: "preview", permission: "finance.exchange:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeOneCPurchaseReconciliation: { method: "GET", path: "/api/v1/finance/exchange/onec/connections/{id}/purchase-reconciliation", module: "finance", stage: "preview", permission: "finance.exchange:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePayPaymentRequestRemainder: { method: "POST", path: "/api/v1/finance/payment-requests/{id}/pay-remainder", module: "finance", stage: "preview", permission: "finance.payment-requests:send", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePaymentRegistries: { method: "GET", path: "/api/v1/finance/payment-registries", module: "finance", stage: "preview", permission: "finance.payment-requests:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePaymentRegistry: { method: "GET", path: "/api/v1/finance/payment-registries/{id}", module: "finance", stage: "preview", permission: "finance.payment-requests:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePaymentRequestAvailability: { method: "GET", path: "/api/v1/finance/payment-requests/{id}/availability", module: "finance", stage: "preview", permission: "finance.payment-requests:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePaymentRequestFactCandidates: { method: "GET", path: "/api/v1/finance/payment-requests/{id}/fact-candidates", module: "finance", stage: "preview", permission: "finance.payment-requests:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePaymentRetroPrefill: { method: "GET", path: "/api/v1/finance/settlements/payments/{id}/retro", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePayoutRegisters: { method: "GET", path: "/api/v1/finance/payroll/registers", module: "finance", stage: "preview", permission: "finance.payroll:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 100 },
  financePayrollDocuments: { method: "GET", path: "/api/v1/finance/payroll/documents", module: "finance", stage: "preview", permission: "finance.payroll:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 200 },
  financePayrollMonthStatus: { method: "GET", path: "/api/v1/finance/payroll/month-status", module: "finance", stage: "preview", permission: "finance.payroll:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePayrollParts: { method: "GET", path: "/api/v1/finance/payroll/parts", module: "finance", stage: "preview", permission: "finance.payroll:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePayrollPayoutMonths: { method: "GET", path: "/api/v1/finance/payroll/payout-months", module: "finance", stage: "preview", permission: "finance.payroll:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePayrollPayoutsAwaiting: { method: "GET", path: "/api/v1/finance/payroll/payouts-awaiting", module: "finance", stage: "preview", permission: "finance.payroll:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePnlEntries: { method: "GET", path: "/api/v1/finance/reports/pnl/entries", module: "finance", stage: "preview", permission: "finance.reports.pnl:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePostDividendDecision: { method: "POST", path: "/api/v1/finance/dividends/decisions/{id}/post", module: "finance", stage: "preview", permission: "finance.dividends:approve", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePostExpenseReport: { method: "POST", path: "/api/v1/finance/accountable/reports/{id}/post", module: "finance", stage: "preview", permission: "finance.accountable:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePostFixedAssetDepreciation: { method: "POST", path: "/api/v1/finance/fixed-assets/depreciation", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePostPayrollDocument: { method: "POST", path: "/api/v1/finance/payroll/documents/{id}/post", module: "finance", stage: "preview", permission: "finance.payroll:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePostSettlementDocument: { method: "POST", path: "/api/v1/finance/settlements/documents/{id}/post", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePostTaxMonth: { method: "POST", path: "/api/v1/finance/taxes/months/{id}/post", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePostVATQuarter: { method: "POST", path: "/api/v1/finance/vat-quarters/{id}/post", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePostZReport: { method: "POST", path: "/api/v1/finance/z-reports", module: "finance", stage: "preview", permission: "finance.operations:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePreviewBonusScheme: { method: "POST", path: "/api/v1/finance/staffing/bonus-schemes/preview", module: "finance", stage: "preview", permission: "finance.staffing:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePreviewDividendDecision: { method: "GET", path: "/api/v1/finance/dividends/decisions/preview", module: "finance", stage: "preview", permission: "finance.dividends:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePreviewFactoringRegistry: { method: "POST", path: "/api/v1/finance/factoring/registry-preview", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePreviewFixedAssetDepreciation: { method: "GET", path: "/api/v1/finance/fixed-assets/depreciation", module: "finance", stage: "preview", permission: "finance.period:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePreviewFixedAssetImport: { method: "POST", path: "/api/v1/finance/fixed-assets/import/preview", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePreviewImport: { method: "POST", path: "/api/v1/finance/imports/{id}/preview", module: "finance", stage: "preview", permission: "finance.imports:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePreviewItemMerge: { method: "POST", path: "/api/v1/finance/items/{id}/merge/preview", module: "finance", stage: "preview", permission: "finance.statements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePreviewRefundSettlement: { method: "POST", path: "/api/v1/finance/settlements/refunds/preview", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePreviewSaleLines: { method: "POST", path: "/api/v1/finance/sale-lines/preview", module: "finance", stage: "preview", permission: "finance.operations:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePreviewVATQuarter: { method: "POST", path: "/api/v1/finance/vat-quarters/preview", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeProposePaymentRegistry: { method: "POST", path: "/api/v1/finance/payment-registries/propose", module: "finance", stage: "preview", permission: "finance.payment-requests:plan", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePullPayrollAwaitingPayout: { method: "POST", path: "/api/v1/finance/payroll/payouts-awaiting/{tx}/pull", module: "finance", stage: "preview", permission: "finance.payroll:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeQuarantineExchangeItem: { method: "POST", path: "/api/v1/finance/exchange/items/{id}/quarantine", module: "finance", stage: "preview", permission: "finance.exchange:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeReceiptCostQueue: { method: "GET", path: "/api/v1/finance/settlements/receipt-cost-queue", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeReceiveOneC: { method: "POST", path: "/api/v1/finance/exchange/onec/connections/{id}/receive", module: "finance", stage: "preview", permission: "finance.exchange:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeReconcileRegisters: { method: "GET", path: "/api/v1/finance/registers/reconcile", module: "finance", stage: "preview", permission: "finance.registers:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeReconcileVATBooks: { method: "GET", path: "/api/v1/finance/vat-quarters/books", module: "finance", stage: "preview", permission: "finance.period:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRecordExchangeItem: { method: "POST", path: "/api/v1/finance/exchange/items", module: "finance", stage: "preview", permission: "finance.exchange:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRefreshConnectorAccounts: { method: "POST", path: "/api/v1/finance/connectors/{id}/accounts/refresh", module: "finance", stage: "preview", permission: "finance.connectors:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRegisterOneCNode: { method: "POST", path: "/api/v1/finance/exchange/onec/connections/{id}/register", module: "finance", stage: "preview", permission: "finance.exchange:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRejectClassificationSuggestion: { method: "POST", path: "/api/v1/finance/classification-suggestions/{id}/reject", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeReleaseBudgetReservation: { method: "POST", path: "/api/v1/finance/budgets/reservations/{id}/release", module: "finance", stage: "preview", permission: "finance.budgets:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeReleaseCancelledOrderOpenings: { method: "POST", path: "/api/v1/finance/settlements/order-openings/release-cancelled", module: "finance", stage: "preview", permission: "finance.registers:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRelinkPayment: { method: "POST", path: "/api/v1/finance/settlements/payments/{id}/relink", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRemovePaymentRegistryLine: { method: "DELETE", path: "/api/v1/finance/payment-registries/{id}/lines/{request}", module: "finance", stage: "preview", permission: "finance.payment-requests:plan", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRepairRegisters: { method: "POST", path: "/api/v1/finance/registers/repair", module: "finance", stage: "preview", permission: "finance.registers:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRepostTransaction: { method: "POST", path: "/api/v1/finance/transactions/{id}/repost", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRepostTransactions: { method: "POST", path: "/api/v1/finance/transactions/repost", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeResolveOneCConflict: { method: "POST", path: "/api/v1/finance/exchange/items/{id}/onec-resolve", module: "finance", stage: "preview", permission: "finance.exchange:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRestorePaymentPlan: { method: "POST", path: "/api/v1/finance/payment-calendar/plans/{id}/restore", module: "finance", stage: "preview", permission: "finance.payment_calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRestoreTransaction: { method: "POST", path: "/api/v1/finance/transactions/{id}/restore", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeResyncRegisters: { method: "POST", path: "/api/v1/finance/registers/resync", module: "finance", stage: "preview", permission: "finance.registers:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeReturnPaymentRequestToRework: { method: "POST", path: "/api/v1/finance/payment-requests/{id}/return-to-rework", module: "finance", stage: "preview", permission: "finance.payment-requests:plan", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRunDividendAutomation: { method: "POST", path: "/api/v1/finance/dividends/automation/run", module: "finance", stage: "preview", permission: "finance.dividends:auto", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRunPayrollAutomation: { method: "POST", path: "/api/v1/finance/payroll/automation/run", module: "finance", stage: "preview", permission: "finance.payroll:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSaleVATTerms: { method: "GET", path: "/api/v1/finance/sale-vat-terms", module: "finance", stage: "preview", permission: "finance.operations:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSaveAcquirer: { method: "PUT", path: "/api/v1/finance/acquirers", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSaveBudget: { method: "POST", path: "/api/v1/finance/budgets", module: "finance", stage: "preview", permission: "finance.budgets:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSaveBudgetDrivers: { method: "PUT", path: "/api/v1/finance/budgets/drivers", module: "finance", stage: "preview", permission: "finance.budgets:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSaveBudgetPaymentTerms: { method: "PUT", path: "/api/v1/finance/budgets/payment-terms", module: "finance", stage: "preview", permission: "finance.budgets:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSaveBudgetSetting: { method: "PUT", path: "/api/v1/finance/budgets/settings", module: "finance", stage: "preview", permission: "finance.budgets:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSaveBudgetVarianceNote: { method: "POST", path: "/api/v1/finance/budgets/variance-notes", module: "finance", stage: "preview", permission: "finance.budgets:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSavePayrollAutomation: { method: "PUT", path: "/api/v1/finance/payroll/automation", module: "finance", stage: "preview", permission: "finance.payroll:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSavePnlLayout: { method: "PUT", path: "/api/v1/finance/pnl-layouts/{id}", module: "finance", stage: "preview", permission: "finance.pnl_layouts:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSaveProjectBudget: { method: "POST", path: "/api/v1/finance/project-budgets", module: "finance", stage: "preview", permission: "finance.project_budgets:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSaveTaxSettings: { method: "PUT", path: "/api/v1/finance/taxes/settings", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSendPaymentRegistry: { method: "POST", path: "/api/v1/finance/payment-registries/{id}/send", module: "finance", stage: "preview", permission: "finance.payment-requests:send", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSetAccountOpeningBalance: { method: "POST", path: "/api/v1/finance/accounts/{id}/opening-balance", module: "finance", stage: "preview", permission: "finance.accounts:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSetConnectorSyncSettings: { method: "PUT", path: "/api/v1/finance/connectors/sync-settings", module: "finance", stage: "preview", permission: "finance.connectors:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSetObligationDueDate: { method: "PATCH", path: "/api/v1/finance/settlements/obligations/{id}/due-date", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSetOneCMapping: { method: "PUT", path: "/api/v1/finance/exchange/onec/connections/{id}/mappings", module: "finance", stage: "preview", permission: "finance.exchange:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSetPayrollPayoutMonth: { method: "PUT", path: "/api/v1/finance/payroll/payout-months/{document}", module: "finance", stage: "preview", permission: "finance.payroll:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSetPurchaseSaleOrder: { method: "PUT", path: "/api/v1/finance/purchases/{id}/sale-order", module: "finance", stage: "preview", permission: "finance.operations:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSetPurchaseSupplierDocument: { method: "PATCH", path: "/api/v1/finance/settlements/documents/{id}/supplier-document", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSetWalletOpeningBalance: { method: "POST", path: "/api/v1/finance/wallets/{id}/opening-balance", module: "finance", stage: "preview", permission: "finance.accounts:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSettlementAging: { method: "GET", path: "/api/v1/finance/settlements/aging", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSettlementReconciliationTurnover: { method: "GET", path: "/api/v1/finance/settlements/reconciliation-turnover", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeStaffHeadcount: { method: "GET", path: "/api/v1/finance/staffing/headcount", module: "finance", stage: "preview", permission: "finance.staffing:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeStaffPositions: { method: "GET", path: "/api/v1/finance/staffing/positions", module: "finance", stage: "preview", permission: "finance.staffing:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeStaffingBonusOptions: { method: "GET", path: "/api/v1/finance/staffing/bonus-bases", module: "finance", stage: "preview", permission: "finance.staffing:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeStaffingSheet: { method: "GET", path: "/api/v1/finance/staffing/sheet", module: "finance", stage: "preview", permission: "finance.staffing:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSyncConnector: { method: "POST", path: "/api/v1/finance/connectors/{id}/sync", module: "finance", stage: "preview", permission: "finance.connectors:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeTradeAdvanceOffer: { method: "GET", path: "/api/v1/finance/trade/{id}/advance-offer", module: "finance", stage: "preview", permission: "finance.settlements:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeTransactionPaymentRequests: { method: "GET", path: "/api/v1/finance/transactions/{id}/payment-requests", module: "finance", stage: "preview", permission: "finance.payment-requests:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeTransactionPayoutRegisters: { method: "GET", path: "/api/v1/finance/transactions/{id}/payout-registers", module: "finance", stage: "preview", permission: "finance.payroll:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeTransferPayrollPart: { method: "POST", path: "/api/v1/finance/payroll/part-transfers", module: "finance", stage: "preview", permission: "finance.payroll:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUnlinkPaymentRequestPayment: { method: "POST", path: "/api/v1/finance/payment-requests/{id}/unlink-payment", module: "finance", stage: "preview", permission: "finance.payment-requests:plan", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateAccount: { method: "PATCH", path: "/api/v1/finance/accounts/{id}", module: "finance", stage: "preview", permission: "finance.accounts:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateBonusScheme: { method: "PATCH", path: "/api/v1/finance/staffing/bonus-schemes/{id}", module: "finance", stage: "preview", permission: "finance.staffing:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateCashOperationResponsible: { method: "PATCH", path: "/api/v1/finance/cash-operations/{id}/responsible", module: "finance", stage: "preview", permission: "finance.cash_operations:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateConnector: { method: "PATCH", path: "/api/v1/finance/connectors/{id}", module: "finance", stage: "preview", permission: "finance.connectors:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateConnectorAccount: { method: "PATCH", path: "/api/v1/finance/connectors/accounts/{accountId}", module: "finance", stage: "preview", permission: "finance.connectors:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateExpenseReport: { method: "PUT", path: "/api/v1/finance/accountable/reports/{id}", module: "finance", stage: "preview", permission: "finance.accountable:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateFixedAsset: { method: "PUT", path: "/api/v1/finance/fixed-assets/{id}", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateOneCConnection: { method: "PATCH", path: "/api/v1/finance/exchange/onec/connections/{id}", module: "finance", stage: "preview", permission: "finance.exchange:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdatePaymentPlan: { method: "PATCH", path: "/api/v1/finance/payment-calendar/plans/{id}", module: "finance", stage: "preview", permission: "finance.payment_calendar:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdatePaymentRegistry: { method: "PATCH", path: "/api/v1/finance/payment-registries/{id}", module: "finance", stage: "preview", permission: "finance.payment-requests:plan", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateStaffPosition: { method: "PATCH", path: "/api/v1/finance/staffing/positions/{id}", module: "finance", stage: "preview", permission: "finance.staffing:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateStatementMailbox: { method: "PATCH", path: "/api/v1/finance/statement-mailboxes/{id}", module: "finance", stage: "preview", permission: "finance.connectors:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateTaxMonth: { method: "PUT", path: "/api/v1/finance/taxes/months/{id}", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateTransactionResponsible: { method: "PATCH", path: "/api/v1/finance/transactions/{id}/responsible", module: "finance", stage: "preview", permission: "finance.transactions:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateVATQuarter: { method: "PUT", path: "/api/v1/finance/vat-quarters/{id}", module: "finance", stage: "preview", permission: "finance.period:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeWriteOffDebt: { method: "POST", path: "/api/v1/finance/settlements/obligations/{id}/write-off", module: "finance", stage: "preview", permission: "finance.settlements:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  invitationsCreate: { method: "POST", path: "/api/v1/invitations", module: "invitations", stage: "preview", permission: "settings.invite:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  invitationsCreateBatch: { method: "POST", path: "/api/v1/invitations/batch", module: "invitations", stage: "preview", permission: "settings.invite:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  invitationsCreateSharedLink: { method: "POST", path: "/api/v1/invitations/shared-links", module: "invitations", stage: "preview", permission: "settings.invite:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  invitationsDelete: { method: "DELETE", path: "/api/v1/invitations/{id}", module: "invitations", stage: "preview", permission: "settings.invite:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  invitationsIssueLink: { method: "POST", path: "/api/v1/invitations/{id}/link", module: "invitations", stage: "preview", permission: "settings.invite:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  invitationsList: { method: "GET", path: "/api/v1/invitations", module: "invitations", stage: "preview", permission: "settings.invite:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  invitationsResend: { method: "POST", path: "/api/v1/invitations/{id}/resend", module: "invitations", stage: "preview", permission: "settings.invite:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  invitationsRevoke: { method: "POST", path: "/api/v1/invitations/{id}/revoke", module: "invitations", stage: "preview", permission: "settings.invite:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  invitationsRevokeSharedLink: { method: "POST", path: "/api/v1/invitations/shared-links/{id}/revoke", module: "invitations", stage: "preview", permission: "settings.invite:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  invitationsSharedLinks: { method: "GET", path: "/api/v1/invitations/shared-links", module: "invitations", stage: "preview", permission: "settings.invite:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeAbortAssetUploadSession: { method: "DELETE", path: "/api/v1/knowledge/upload-sessions/{sessionId}", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeAnswer: { method: "POST", path: "/api/v1/knowledge/answer", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeCreateAssetDownloadSession: { method: "POST", path: "/api/v1/knowledge/assets/{id}/download-session", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeCreateAssetUploadSession: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/upload-sessions", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeCreatePage: { method: "POST", path: "/api/v1/knowledge/nodes", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeCreateSpace: { method: "POST", path: "/api/v1/knowledge/spaces", module: "knowledge", stage: "preview", permission: "knowledge:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeCreateTag: { method: "POST", path: "/api/v1/knowledge/tags", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeDeleteAsset: { method: "DELETE", path: "/api/v1/knowledge/assets/{id}", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeDeleteSpace: { method: "DELETE", path: "/api/v1/knowledge/spaces/{id}", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeFinishAssetUploadSession: { method: "POST", path: "/api/v1/knowledge/upload-sessions/{sessionId}/finish", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetAnswerQuality: { method: "GET", path: "/api/v1/knowledge/quality", module: "knowledge", stage: "preview", permission: "knowledge:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetAssetContent: { method: "GET", path: "/api/v1/knowledge/assets/{id}/content", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetAssetUploadSession: { method: "GET", path: "/api/v1/knowledge/upload-sessions/{sessionId}", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetPage: { method: "GET", path: "/api/v1/knowledge/nodes/{id}", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetPageAccess: { method: "GET", path: "/api/v1/knowledge/nodes/{id}/access", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetPageHistory: { method: "GET", path: "/api/v1/knowledge/nodes/{id}/history", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetSpaceAccess: { method: "GET", path: "/api/v1/knowledge/spaces/{id}/access", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetSpaceTree: { method: "GET", path: "/api/v1/knowledge/spaces/{id}/tree", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeListAccessOptions: { method: "GET", path: "/api/v1/knowledge/access-options", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeListPageAssets: { method: "GET", path: "/api/v1/knowledge/nodes/{id}/assets", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeListSpaces: { method: "GET", path: "/api/v1/knowledge/spaces", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeListTags: { method: "GET", path: "/api/v1/knowledge/tags", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeListTrashedPages: { method: "GET", path: "/api/v1/knowledge/archive", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeMovePage: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/move", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgePublishPage: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/publish", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeReindexAsset: { method: "POST", path: "/api/v1/knowledge/assets/{id}/reindex", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeRejectPage: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/reject", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeReplacePageAccess: { method: "PUT", path: "/api/v1/knowledge/nodes/{id}/access", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeReplacePageTags: { method: "PUT", path: "/api/v1/knowledge/nodes/{id}/tags", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeReplaceSpaceAccess: { method: "PUT", path: "/api/v1/knowledge/spaces/{id}/access", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeRestorePage: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/restore", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeRestorePageRevision: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/history/restore", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeSaveAnswerFeedback: { method: "POST", path: "/api/v1/knowledge/answers/{id}/feedback", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeSavePageRevision: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/revisions", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeSearch: { method: "GET", path: "/api/v1/knowledge/search", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, installation: false, pagination: "limit", pageSizeMax: 100, pageSizeDefault: 20 },
  knowledgeSubmitPage: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/submit", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeTrashPage: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/archive", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeUpdateSpace: { method: "PUT", path: "/api/v1/knowledge/spaces/{id}", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeUploadPageAsset: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/assets", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeVerifyPage: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/verify", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailAbortUploadSession: { method: "DELETE", path: "/api/v1/mail/upload-sessions/{id}", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailApplyRules: { method: "POST", path: "/api/v1/mail/accounts/{id}/rules/apply", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailAttachStoredFile: { method: "POST", path: "/api/v1/mail/accounts/{id}/uploads/from-file", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailAttachmentDownloadSession: { method: "GET", path: "/api/v1/mail/attachments/{id}/download-session", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailCancelScheduledSend: { method: "POST", path: "/api/v1/mail/messages/{id}/cancel-send", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailCheckAccount: { method: "POST", path: "/api/v1/mail/accounts/{id}/check", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailComposeMessage: { method: "POST", path: "/api/v1/mail/accounts/{id}/messages", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailCountVIPUnread: { method: "GET", path: "/api/v1/mail/vip-senders/unread", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailCreateAccount: { method: "POST", path: "/api/v1/mail/accounts", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailCreateFolder: { method: "POST", path: "/api/v1/mail/accounts/{id}/folders", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailCreateRule: { method: "POST", path: "/api/v1/mail/accounts/{id}/rules", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailCreateUploadSession: { method: "POST", path: "/api/v1/mail/accounts/{id}/upload-sessions", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailDeleteAccount: { method: "DELETE", path: "/api/v1/mail/accounts/{id}", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailDeleteAddressBookEntry: { method: "DELETE", path: "/api/v1/mail/address-book/entries/{id}", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailDeleteFolder: { method: "DELETE", path: "/api/v1/mail/folders/{id}", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailDeleteMessage: { method: "DELETE", path: "/api/v1/mail/messages/{id}", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailDeleteRule: { method: "DELETE", path: "/api/v1/mail/rules/{id}", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailDiscoverSettings: { method: "GET", path: "/api/v1/mail/discover", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailFinishUploadSession: { method: "POST", path: "/api/v1/mail/upload-sessions/{id}/finish", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailFlagMessage: { method: "POST", path: "/api/v1/mail/messages/{id}/flag", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailGetAccount: { method: "GET", path: "/api/v1/mail/accounts/{id}", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailGetAttachmentContent: { method: "GET", path: "/api/v1/mail/attachments/{id}/content", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailGetMessage: { method: "GET", path: "/api/v1/mail/messages/{id}", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailGetThread: { method: "GET", path: "/api/v1/mail/threads/{id}", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailGetUploadSession: { method: "GET", path: "/api/v1/mail/upload-sessions/{id}", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailLinkAddressBookEntry: { method: "PUT", path: "/api/v1/mail/address-book/entries/{id}/contact", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailListAccountJournal: { method: "GET", path: "/api/v1/mail/accounts/journal", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailListAccounts: { method: "GET", path: "/api/v1/mail/accounts", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailListAddressBookEntries: { method: "GET", path: "/api/v1/mail/address-book/entries", module: "mail", stage: "preview", permission: "mail:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 50 },
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
  mailRenameAddressBookEntry: { method: "PATCH", path: "/api/v1/mail/address-book/entries/{id}", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailRenameFolder: { method: "PATCH", path: "/api/v1/mail/folders/{id}", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailResendAsDraft: { method: "POST", path: "/api/v1/mail/messages/{id}/resend-draft", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailSaveAddressBookEntry: { method: "POST", path: "/api/v1/mail/address-book/entries", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailSaveAttachmentToFiles: { method: "POST", path: "/api/v1/mail/attachments/{id}/save-to-files", module: "mail", stage: "preview", permission: "files:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailSendMessageNow: { method: "POST", path: "/api/v1/mail/messages/{id}/send-now", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailSetVIPSender: { method: "POST", path: "/api/v1/mail/vip-senders", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailSyncAccount: { method: "POST", path: "/api/v1/mail/accounts/{id}/sync", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailUpdateAccount: { method: "PATCH", path: "/api/v1/mail/accounts/{id}", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  mailUpdateRule: { method: "PATCH", path: "/api/v1/mail/rules/{id}", module: "mail", stage: "preview", permission: "mail:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceAddOzonProductGroupItems: { method: "POST", path: "/api/v1/marketplace/ozon/product-groups/{id}/items", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceAddWbProductGroupItems: { method: "POST", path: "/api/v1/marketplace/wb/product-groups/{id}/items", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceApplyPlatformOpening: { method: "POST", path: "/api/v1/marketplace/{platform}/opening-stock/apply", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceApplyWeeklyFinanceRun: { method: "POST", path: "/api/v1/marketplace/{platform}/stores/{id}/finance/weeks/{weekStart}/apply", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceBindStoreToCollector: { method: "POST", path: "/api/v1/marketplace/{platform}/stores/{id}/collector-binding", module: "marketplace", stage: "preview", permission: "marketplace:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceCheckStoreBinding: { method: "GET", path: "/api/v1/marketplace/{platform}/stores/{id}/collector-binding", module: "marketplace", stage: "preview", permission: "marketplace:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceCreateCatalogMatchProducts: { method: "POST", path: "/api/v1/marketplace/{platform}/stores/{id}/catalog/matches/create", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceCreateLamodaStore: { method: "POST", path: "/api/v1/marketplace/lamoda/stores", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceCreateOzonProductGroup: { method: "POST", path: "/api/v1/marketplace/ozon/product-groups", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceCreateOzonStore: { method: "POST", path: "/api/v1/marketplace/ozon/stores", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceCreateWbProductGroup: { method: "POST", path: "/api/v1/marketplace/wb/product-groups", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceCreateWbStore: { method: "POST", path: "/api/v1/marketplace/wb/stores", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceCreateYandexStore: { method: "POST", path: "/api/v1/marketplace/yandex/stores", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceDeleteOzonProductGroup: { method: "DELETE", path: "/api/v1/marketplace/ozon/product-groups/{id}", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceDeleteOzonStore: { method: "DELETE", path: "/api/v1/marketplace/ozon/stores/{id}", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceDeleteWbProductGroup: { method: "DELETE", path: "/api/v1/marketplace/wb/product-groups/{id}", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceDeleteWbStore: { method: "DELETE", path: "/api/v1/marketplace/wb/stores/{id}", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceDeleteYandexStore: { method: "DELETE", path: "/api/v1/marketplace/yandex/stores/{id}", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceEconQuote: { method: "POST", path: "/api/v1/marketplace/econ/quote", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceFbsCarriagesCreate: { method: "POST", path: "/api/v1/marketplace/{platform}/fbs-carriages", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceFbsQueue: { method: "GET", path: "/api/v1/marketplace/{platform}/fbs-queue", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceFbsSupplies: { method: "GET", path: "/api/v1/marketplace/{platform}/fbs-supplies", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceFbsSupplyAddOrders: { method: "POST", path: "/api/v1/marketplace/{platform}/fbs-supplies/{id}/orders", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceFbsSupplyCreate: { method: "POST", path: "/api/v1/marketplace/{platform}/fbs-supplies", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceFbsSupplyDeliver: { method: "POST", path: "/api/v1/marketplace/{platform}/fbs-supplies/{id}/deliver", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceFbsWave: { method: "GET", path: "/api/v1/marketplace/{platform}/fbs-waves/{id}", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceFbsWaveCancel: { method: "POST", path: "/api/v1/marketplace/{platform}/fbs-waves/{id}/cancel", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceFbsWaveCreate: { method: "POST", path: "/api/v1/marketplace/{platform}/fbs-waves", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceFbsWavePick: { method: "PUT", path: "/api/v1/marketplace/{platform}/fbs-waves/{id}/picks/{pick}", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceFbsWaves: { method: "GET", path: "/api/v1/marketplace/{platform}/fbs-waves", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceGetCatalogImportStatus: { method: "GET", path: "/api/v1/marketplace/{platform}/stores/{id}/catalog/status", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceGetStoreAccounting: { method: "GET", path: "/api/v1/marketplace/{platform}/stores/{id}/accounting", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceGetStoreInitialLoad: { method: "GET", path: "/api/v1/marketplace/{platform}/stores/{id}/initial-load", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceImportCatalog: { method: "POST", path: "/api/v1/marketplace/{platform}/stores/{id}/catalog/import", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceLamodaStores: { method: "GET", path: "/api/v1/marketplace/lamoda/stores", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceLetoileStores: { method: "GET", path: "/api/v1/marketplace/letoile/stores", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceLinkCatalogMatches: { method: "POST", path: "/api/v1/marketplace/{platform}/stores/{id}/catalog/matches/link", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceLinkCatalogProduct: { method: "POST", path: "/api/v1/marketplace/{platform}/stores/{id}/catalog/links", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceListCatalogCandidates: { method: "GET", path: "/api/v1/marketplace/{platform}/stores/{id}/catalog/candidates", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 50 },
  marketplaceListCatalogMatches: { method: "GET", path: "/api/v1/marketplace/{platform}/stores/{id}/catalog/matches", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 50 },
  marketplaceListProductCatalogCards: { method: "GET", path: "/api/v1/marketplace/catalog/products/{product_id}/cards", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceListWeeklyFinanceRuns: { method: "GET", path: "/api/v1/marketplace/{platform}/stores/{id}/finance/weeks", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonConfirmAdsAbsence: { method: "POST", path: "/api/v1/marketplace/ozon/ads-absence", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonDecomposition: { method: "GET", path: "/api/v1/marketplace/ozon/decomposition", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonDecompositionOther: { method: "GET", path: "/api/v1/marketplace/ozon/decomposition-other", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonFbs: { method: "GET", path: "/api/v1/marketplace/ozon/fbs", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonFunnel: { method: "GET", path: "/api/v1/marketplace/ozon/funnel", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonFunnelDaily: { method: "GET", path: "/api/v1/marketplace/ozon/funnel-daily", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonOrdersOverview: { method: "GET", path: "/api/v1/marketplace/ozon/orders/overview", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonPnl: { method: "GET", path: "/api/v1/marketplace/ozon/pnl", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonPricing: { method: "GET", path: "/api/v1/marketplace/ozon/pricing", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonProductFacets: { method: "GET", path: "/api/v1/marketplace/ozon/product-facets", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonProductGroupItems: { method: "GET", path: "/api/v1/marketplace/ozon/product-groups/{id}/items", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonProductGroups: { method: "GET", path: "/api/v1/marketplace/ozon/product-groups", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonProducts: { method: "GET", path: "/api/v1/marketplace/ozon/products", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "page", pageSizeMax: 10000, pageSizeDefault: 50 },
  marketplaceOzonPromotions: { method: "GET", path: "/api/v1/marketplace/ozon/promotions", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonSetCost: { method: "POST", path: "/api/v1/marketplace/ozon/cost", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonStocks: { method: "GET", path: "/api/v1/marketplace/ozon/stocks", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonStores: { method: "GET", path: "/api/v1/marketplace/ozon/stores", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonSyncJobs: { method: "GET", path: "/api/v1/marketplace/ozon/sync-jobs", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplacePreviewCatalogImport: { method: "POST", path: "/api/v1/marketplace/{platform}/stores/{id}/catalog/preview", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplacePreviewPlatformOpening: { method: "POST", path: "/api/v1/marketplace/{platform}/opening-stock/preview", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceRemoveOzonProductGroupItem: { method: "DELETE", path: "/api/v1/marketplace/ozon/product-groups/{id}/items", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceRemoveWbProductGroupItem: { method: "DELETE", path: "/api/v1/marketplace/wb/product-groups/{id}/items", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceReopenCatalogMatches: { method: "POST", path: "/api/v1/marketplace/{platform}/stores/{id}/catalog/matches/reopen", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceRepostWeeklyFinanceRun: { method: "POST", path: "/api/v1/marketplace/{platform}/stores/{id}/finance/weeks/{weekStart}/repost", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceRetryCatalogImport: { method: "POST", path: "/api/v1/marketplace/{platform}/stores/{id}/catalog/retry", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceSaveStoreAccounting: { method: "PUT", path: "/api/v1/marketplace/{platform}/stores/{id}/accounting", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceSectionUsage: { method: "GET", path: "/api/v1/marketplace/usage", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceSetYandexCost: { method: "POST", path: "/api/v1/marketplace/yandex/cost", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceSkipCatalogMatches: { method: "POST", path: "/api/v1/marketplace/{platform}/stores/{id}/catalog/matches/skip", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceStartStoreSummaryRecompute: { method: "POST", path: "/api/v1/marketplace/{platform}/stores/{id}/summary/recompute", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceStoreSummaryStatus: { method: "GET", path: "/api/v1/marketplace/{platform}/stores/{id}/summary/status", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceSupplyReceiptList: { method: "GET", path: "/api/v1/marketplace/{platform}/supply-receipts", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceSupplyShipmentCreate: { method: "POST", path: "/api/v1/marketplace/{platform}/supply-shipments", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceUnlinkCatalogMatches: { method: "POST", path: "/api/v1/marketplace/{platform}/stores/{id}/catalog/matches/unlink", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceUpdateOzonProductGroup: { method: "PATCH", path: "/api/v1/marketplace/ozon/product-groups/{id}", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceUpdateOzonStore: { method: "PATCH", path: "/api/v1/marketplace/ozon/stores/{id}", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceUpdateWbProductGroup: { method: "PATCH", path: "/api/v1/marketplace/wb/product-groups/{id}", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceUpdateWbStore: { method: "PATCH", path: "/api/v1/marketplace/wb/stores/{id}", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceUpdateYandexStore: { method: "PATCH", path: "/api/v1/marketplace/yandex/stores/{id}", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbCardBoard: { method: "GET", path: "/api/v1/marketplace/wb/card/board", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbCardOptions: { method: "GET", path: "/api/v1/marketplace/wb/card/options", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbConfirmAdsAbsence: { method: "POST", path: "/api/v1/marketplace/wb/ads-absence", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbDecomposition: { method: "GET", path: "/api/v1/marketplace/wb/decomposition", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbDecompositionOther: { method: "GET", path: "/api/v1/marketplace/wb/decomposition-other", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbFbs: { method: "GET", path: "/api/v1/marketplace/wb/fbs", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbFunnel: { method: "GET", path: "/api/v1/marketplace/wb/funnel", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbFunnelDaily: { method: "GET", path: "/api/v1/marketplace/wb/funnel-daily", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbOrdersOverview: { method: "GET", path: "/api/v1/marketplace/wb/orders/overview", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbPnl: { method: "GET", path: "/api/v1/marketplace/wb/pnl", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbPricing: { method: "GET", path: "/api/v1/marketplace/wb/pricing", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbProductFacets: { method: "GET", path: "/api/v1/marketplace/wb/product-facets", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbProductGroupItems: { method: "GET", path: "/api/v1/marketplace/wb/product-groups/{id}/items", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbProductGroups: { method: "GET", path: "/api/v1/marketplace/wb/product-groups", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbProducts: { method: "GET", path: "/api/v1/marketplace/wb/products", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "page", pageSizeMax: 10000, pageSizeDefault: 50 },
  marketplaceWbPromotions: { method: "GET", path: "/api/v1/marketplace/wb/promotions", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbSetCost: { method: "POST", path: "/api/v1/marketplace/wb/cost", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbStocks: { method: "GET", path: "/api/v1/marketplace/wb/stocks", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbStores: { method: "GET", path: "/api/v1/marketplace/wb/stores", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWeeklyFinanceHistory: { method: "GET", path: "/api/v1/marketplace/{platform}/stores/{id}/finance/weeks/history", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceYandexFunnelDaily: { method: "GET", path: "/api/v1/marketplace/yandex/funnel-daily", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceYandexOrdersOverview: { method: "GET", path: "/api/v1/marketplace/yandex/orders/overview", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceYandexPnl: { method: "GET", path: "/api/v1/marketplace/yandex/pnl", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceYandexProducts: { method: "GET", path: "/api/v1/marketplace/yandex/products", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "page", pageSizeMax: 10000, pageSizeDefault: 50 },
  marketplaceYandexStocks: { method: "GET", path: "/api/v1/marketplace/yandex/stocks", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceYandexStores: { method: "GET", path: "/api/v1/marketplace/yandex/stores", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingAcceptExpectedCodes: { method: "POST", path: "/api/v1/marking/documents/{type}/{id}/codes/accept-expected", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingAddDocumentCodesList: { method: "POST", path: "/api/v1/marking/documents/{type}/{id}/codes/list", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingAddRemarkItems: { method: "POST", path: "/api/v1/marking/remarks/{id}/items", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingArchiveLabelTemplate: { method: "DELETE", path: "/api/v1/marking/label-templates/{id}", module: "marking", stage: "preview", permission: "marking:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingCancelRemark: { method: "POST", path: "/api/v1/marking/remarks/{id}/cancel", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingCheckCodes: { method: "POST", path: "/api/v1/marking/cises/info", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingCloseBox: { method: "POST", path: "/api/v1/marking/boxes/{id}/close", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingCloseOrder: { method: "POST", path: "/api/v1/marking/orders/{id}/close", module: "marking", stage: "preview", permission: "marking.gismt:send", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingCodeSyncState: { method: "GET", path: "/api/v1/marking/codes/sync", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingCreateBox: { method: "POST", path: "/api/v1/marking/boxes", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingCreateDocumentDraft: { method: "POST", path: "/api/v1/marking/gismt/document-drafts", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingCreateLabelTemplate: { method: "POST", path: "/api/v1/marking/label-templates", module: "marking", stage: "preview", permission: "marking:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingCreateOrder: { method: "POST", path: "/api/v1/marking/orders", module: "marking", stage: "preview", permission: "marking.gismt:send", idempotent: true, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingCreateRemark: { method: "POST", path: "/api/v1/marking/remarks", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingCreateRemarkDocument: { method: "POST", path: "/api/v1/marking/remarks/{id}/document", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingDeleteApplication: { method: "DELETE", path: "/api/v1/marking/applications/{id}", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingDeleteCompanyGroup: { method: "DELETE", path: "/api/v1/marking/company-groups/{company}/{group}", module: "marking", stage: "preview", permission: "marking:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingDeleteDocumentDraft: { method: "DELETE", path: "/api/v1/marking/gismt/document-drafts/{id}", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingDeleteProductProfile: { method: "DELETE", path: "/api/v1/marking/products/{id}/profile", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingDisbandBox: { method: "POST", path: "/api/v1/marking/boxes/{id}/disband", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingDistanceQueue: { method: "GET", path: "/api/v1/marking/gismt/distance-queue", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingDocumentSummaries: { method: "GET", path: "/api/v1/marking/document-summaries", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingFindCode: { method: "POST", path: "/api/v1/marking/codes/find", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingGetAssemblyLabelPlan: { method: "GET", path: "/api/v1/marking/labels/assembly", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingGetBox: { method: "GET", path: "/api/v1/marking/boxes/{id}", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingGetBoxContents: { method: "GET", path: "/api/v1/marking/boxes/{id}/contents", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingGetCompanySettings: { method: "GET", path: "/api/v1/marking/company-settings/{company_id}", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingGetDocumentCodes: { method: "GET", path: "/api/v1/marking/documents/{type}/{id}/codes", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingGetGISMTDocument: { method: "GET", path: "/api/v1/marking/gismt/documents/{id}", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingGetInventoryCodes: { method: "GET", path: "/api/v1/marking/inventories/{id}/codes", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingGetLabelPrintFile: { method: "GET", path: "/api/v1/marking/label-prints/{file}", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingGetLabelTemplate: { method: "GET", path: "/api/v1/marking/label-templates/{id}", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingGetLabelTemplateUsage: { method: "GET", path: "/api/v1/marking/label-templates/{id}/usage", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingGetMarkingLabelPrintFile: { method: "GET", path: "/api/v1/marking/label-prints/{company}/{file}", module: "marking", stage: "preview", permission: "marking.codes:print", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingGetOrder: { method: "GET", path: "/api/v1/marking/orders/{id}", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingGetOrderCodes: { method: "GET", path: "/api/v1/marking/orders/{id}/codes", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: null },
  markingGetProductProfile: { method: "GET", path: "/api/v1/marking/products/{id}/profile", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingGetRemark: { method: "GET", path: "/api/v1/marking/remarks/{id}", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingImportStoredCodesFile: { method: "POST", path: "/api/v1/marking/codes/import/stored-file", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingLinkRemarkOrder: { method: "PUT", path: "/api/v1/marking/remarks/{id}/order", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingListBalances: { method: "GET", path: "/api/v1/marking/connections/{company_id}/balance", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingListBoxes: { method: "GET", path: "/api/v1/marking/boxes", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 50 },
  markingListCodeImports: { method: "GET", path: "/api/v1/marking/codes/imports", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 20 },
  markingListCodes: { method: "GET", path: "/api/v1/marking/codes", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 50 },
  markingListCompanies: { method: "GET", path: "/api/v1/marking/companies", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingListCompanyGroups: { method: "GET", path: "/api/v1/marking/company-groups", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingListConnections: { method: "GET", path: "/api/v1/marking/connections", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingListGISMTDocuments: { method: "GET", path: "/api/v1/marking/gismt/documents", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "limit", pageSizeMax: 100, pageSizeDefault: 50 },
  markingListGroups: { method: "GET", path: "/api/v1/marking/groups", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingListLabelBarcodes: { method: "GET", path: "/api/v1/marking/labels/barcodes", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingListLabelDefaults: { method: "GET", path: "/api/v1/marking/label-defaults", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingListLabelTemplateRecords: { method: "GET", path: "/api/v1/marking/label-templates", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingListLabelTemplates: { method: "GET", path: "/api/v1/marking/labels/templates", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingListMods: { method: "GET", path: "/api/v1/marking/connections/{company_id}/mods", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingListOrders: { method: "GET", path: "/api/v1/marking/orders", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 50 },
  markingListOutbox: { method: "GET", path: "/api/v1/marking/gismt/outbox", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 50 },
  markingListRemarks: { method: "GET", path: "/api/v1/marking/remarks", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 50 },
  markingPairRemarkCode: { method: "POST", path: "/api/v1/marking/remarks/{id}/pair", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingParseCode: { method: "POST", path: "/api/v1/marking/codes/parse", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingPingOMS: { method: "POST", path: "/api/v1/marking/connections/{company_id}/oms/ping", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingPrintAssemblyLabelsFile: { method: "POST", path: "/api/v1/marking/labels/assembly/file", module: "marking", stage: "preview", permission: "marking.codes:print", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingPrintLabelsFile: { method: "POST", path: "/api/v1/marking/labels/file", module: "marking", stage: "preview", permission: "marking.codes:print", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingPrintProductLabelsFile: { method: "POST", path: "/api/v1/marking/labels/products/file", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingReceiveOrderCodes: { method: "POST", path: "/api/v1/marking/orders/{id}/receive", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingReconcileItems: { method: "GET", path: "/api/v1/marking/reconcile/{id}/items", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 100 },
  markingReconcileState: { method: "GET", path: "/api/v1/marking/reconcile", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingRefreshApplication: { method: "POST", path: "/api/v1/marking/applications/{id}/refresh", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingRefreshOutboxDocument: { method: "POST", path: "/api/v1/marking/gismt/outbox/{id}/refresh", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingRemoveBoxItem: { method: "DELETE", path: "/api/v1/marking/boxes/{id}/items/{code_id}", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingRemoveDocumentCode: { method: "DELETE", path: "/api/v1/marking/documents/{type}/{id}/codes/{code_id}", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingRemoveInventoryCode: { method: "DELETE", path: "/api/v1/marking/inventories/{id}/codes/{code_id}", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingRemoveRemarkItem: { method: "DELETE", path: "/api/v1/marking/remarks/{id}/items/{item_id}", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingReopenBox: { method: "POST", path: "/api/v1/marking/boxes/{id}/reopen", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingReparseOrderRejects: { method: "POST", path: "/api/v1/marking/orders/{id}/rejects/reparse", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingReplaceDocumentCodes: { method: "PUT", path: "/api/v1/marking/documents/{type}/{id}/codes", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingReportBox: { method: "POST", path: "/api/v1/marking/boxes/{id}/report", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingResolveBox: { method: "POST", path: "/api/v1/marking/boxes/resolve", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingResolveFbsUnmarked: { method: "POST", path: "/api/v1/marking/gismt/distance-queue/unmarked/resolve", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingResolveReconcileItem: { method: "PUT", path: "/api/v1/marking/reconcile/items/{id}/resolution", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingRestoreLabelTemplate: { method: "POST", path: "/api/v1/marking/label-templates/{id}/restore", module: "marking", stage: "preview", permission: "marking:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingReturnQueue: { method: "GET", path: "/api/v1/marking/gismt/return-queue", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingSaveCompanyGroup: { method: "PUT", path: "/api/v1/marking/company-groups", module: "marking", stage: "preview", permission: "marking:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingSaveCompanySettings: { method: "PUT", path: "/api/v1/marking/company-settings/{company_id}", module: "marking", stage: "preview", permission: "marking:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingSaveProductProfile: { method: "PUT", path: "/api/v1/marking/products/{id}/profile", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingScanBoxIntoDocument: { method: "POST", path: "/api/v1/marking/documents/{type}/{id}/codes/scan-box", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingScanBoxIntoInventory: { method: "POST", path: "/api/v1/marking/inventories/{id}/codes/scan-box", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingScanDocumentCode: { method: "POST", path: "/api/v1/marking/documents/{type}/{id}/codes/scan", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingScanIntoBox: { method: "POST", path: "/api/v1/marking/boxes/{id}/scan", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingScanInventoryCode: { method: "POST", path: "/api/v1/marking/inventories/{id}/codes/scan", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingSearchGISMTCodes: { method: "POST", path: "/api/v1/marking/gismt/codes", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingSetLabelDefault: { method: "PUT", path: "/api/v1/marking/label-defaults", module: "marking", stage: "preview", permission: "marking:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingSetLabelTemplateUsage: { method: "PUT", path: "/api/v1/marking/label-templates/{id}/usage", module: "marking", stage: "preview", permission: "marking:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingShortDocumentCounts: { method: "GET", path: "/api/v1/marking/document-summaries/short", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingSignDuties: { method: "GET", path: "/api/v1/marking/gismt/sign-duties", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingSpoilOrderCodes: { method: "POST", path: "/api/v1/marking/orders/{id}/codes/spoil", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingStartCodeSync: { method: "POST", path: "/api/v1/marking/codes/sync", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingStartReconcile: { method: "POST", path: "/api/v1/marking/reconcile", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingStockCodes: { method: "GET", path: "/api/v1/marking/stock-codes", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 200 },
  markingSwapRemark: { method: "POST", path: "/api/v1/marking/remarks/{id}/swap", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingSyncOrders: { method: "POST", path: "/api/v1/marking/orders/sync", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingTraceCode: { method: "GET", path: "/api/v1/marking/codes/trace", module: "marking", stage: "preview", permission: "marking:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingTransferInventoryCodes: { method: "POST", path: "/api/v1/marking/inventories/{id}/codes/transfer", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingUnpairRemarkCode: { method: "DELETE", path: "/api/v1/marking/remarks/{id}/items/{item_id}/pair", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingUpdateLabelTemplate: { method: "PUT", path: "/api/v1/marking/label-templates/{id}", module: "marking", stage: "preview", permission: "marking:admin", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  markingVerifyDocumentDraft: { method: "POST", path: "/api/v1/marking/gismt/document-drafts/{id}/verify", module: "marking", stage: "preview", permission: "marking:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  printFormDownloadSession: { method: "GET", path: "/api/v1/print/forms/{kind}/{id}/download-session", module: "core", stage: "preview", permission: "core:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsActivateCompany: { method: "POST", path: "/api/v1/settings/companies/{id}/activate", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsAssignMemberRoles: { method: "POST", path: "/api/v1/settings/role-assignments", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsCheckIntegrationConnection: { method: "POST", path: "/api/v1/settings/integration-connections/{provider}/check", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsCreateFieldDefinition: { method: "POST", path: "/api/v1/settings/field-definitions", module: "settings", stage: "preview", permission: "settings.config:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsCreateMember: { method: "POST", path: "/api/v1/settings/members", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsDeleteCompany: { method: "DELETE", path: "/api/v1/settings/companies/{id}", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsDeleteFieldDefinition: { method: "DELETE", path: "/api/v1/settings/field-definitions/{id}", module: "settings", stage: "preview", permission: "settings.config:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsGetAIUsage: { method: "GET", path: "/api/v1/settings/ai-usage", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsGetCompanyUsage: { method: "GET", path: "/api/v1/settings/companies/{id}/usage", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsGetFieldSchema: { method: "GET", path: "/api/v1/settings/field-schema", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsGetRole: { method: "GET", path: "/api/v1/settings/roles/{id}", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsGetUsage: { method: "GET", path: "/api/v1/settings/usage", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListCompanies: { method: "GET", path: "/api/v1/settings/companies", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListFieldDefinitions: { method: "GET", path: "/api/v1/settings/field-definitions", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListIntegrationConnections: { method: "GET", path: "/api/v1/settings/integration-connections", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListMembers: { method: "GET", path: "/api/v1/settings/members", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListRoleMembers: { method: "GET", path: "/api/v1/settings/roles/{id}/members", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListRoleTemplates: { method: "GET", path: "/api/v1/settings/role-templates", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListRoles: { method: "GET", path: "/api/v1/settings/roles", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListSelectableCompanies: { method: "GET", path: "/api/v1/settings/companies/selectable", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListVatRates: { method: "GET", path: "/api/v1/settings/vat-rates", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsPermissionCatalog: { method: "GET", path: "/api/v1/settings/permission-catalog", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsReadiness: { method: "GET", path: "/api/v1/settings/readiness", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsReplaceMemberAccess: { method: "PUT", path: "/api/v1/settings/members/{id}/access", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsSaveIntegrationConnection: { method: "PUT", path: "/api/v1/settings/integration-connections/{provider}", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsSetMemberActive: { method: "POST", path: "/api/v1/settings/members/{id}/activation", module: "settings", stage: "preview", permission: "settings.team:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsSetMemberRole: { method: "PUT", path: "/api/v1/settings/members/{id}/role", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsUpdateFieldDefinition: { method: "PATCH", path: "/api/v1/settings/field-definitions/{id}", module: "settings", stage: "preview", permission: "settings.config:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockAbortUploadSession: { method: "DELETE", path: "/api/v1/stock/upload-sessions/{id}", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockAcceptShipment: { method: "POST", path: "/api/v1/stock/shipments/{id}/acceptance", module: "stock", stage: "preview", permission: "stock.customer_acceptance:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockAccountTransferProposal: { method: "GET", path: "/api/v1/stock/account-transfers/proposal", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockAccountingQueue: { method: "GET", path: "/api/v1/stock/accounting/queue", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockActivateWarehouse: { method: "POST", path: "/api/v1/stock/warehouses/{id}/activate", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockActivateWarehouseBin: { method: "POST", path: "/api/v1/stock/warehouses/{id}/bins/{binId}/activate", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockAddWarehouseStaff: { method: "POST", path: "/api/v1/stock/warehouses/{id}/staff", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockApplyImport: { method: "POST", path: "/api/v1/stock/imports/{id}/apply", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockApplyRegradeOffer: { method: "POST", path: "/api/v1/stock/regrade/offer", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockApplyWarehouseZoneAllocation: { method: "POST", path: "/api/v1/stock/warehouses/{id}/zones/allocation", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockAssembleDocumentKits: { method: "POST", path: "/api/v1/stock/documents/{id}/kit-assembly", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockAssignCondition: { method: "POST", path: "/api/v1/stock/condition-changes/assign", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockBatchStockSummary: { method: "GET", path: "/api/v1/stock/batch-stock/summary", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCancelCarrierShipment: { method: "POST", path: "/api/v1/stock/carrier-shipments/{id}/cancel", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCancelDocument: { method: "POST", path: "/api/v1/stock/documents/{id}/cancel", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCancelImport: { method: "POST", path: "/api/v1/stock/imports/{id}/cancel", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCarrierCities: { method: "GET", path: "/api/v1/stock/carrier/cities", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCarrierPoints: { method: "GET", path: "/api/v1/stock/carrier/points", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCarrierRecipient: { method: "GET", path: "/api/v1/stock/carrier/recipient/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCarrierStatus: { method: "GET", path: "/api/v1/stock/carrier/status", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCleanupSeries: { method: "POST", path: "/api/v1/stock/batches/series-cleanup", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCloseShipmentDiscrepancy: { method: "POST", path: "/api/v1/stock/shipments/{id}/discrepancy", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCloseSupplierOrder: { method: "POST", path: "/api/v1/stock/documents/{id}/close", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateAccountTransfer: { method: "POST", path: "/api/v1/stock/account-transfers", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateAssemblySpec: { method: "POST", path: "/api/v1/stock/assembly-specs", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateClaimWriteoff: { method: "POST", path: "/api/v1/stock/claim-writeoffs", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateCondition: { method: "POST", path: "/api/v1/stock/conditions", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateDocument: { method: "POST", path: "/api/v1/stock/documents", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateExpiredWriteoffDrafts: { method: "POST", path: "/api/v1/stock/expired-stock/writeoff-drafts", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateExport: { method: "POST", path: "/api/v1/stock/exports", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateImportUploadSession: { method: "POST", path: "/api/v1/stock/imports/upload-sessions", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateOpeningBalance: { method: "POST", path: "/api/v1/stock/opening-balances", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateOpeningCorrection: { method: "POST", path: "/api/v1/stock/opening-corrections", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreatePurchase: { method: "POST", path: "/api/v1/stock/purchasing/purchases", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateReceiptCorrection: { method: "POST", path: "/api/v1/stock/receipt-corrections", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateReceiptCost: { method: "POST", path: "/api/v1/stock/receipt-costs", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateTransitReceipt: { method: "POST", path: "/api/v1/stock/transit-shipments/{id}/receipts", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateWarehouse: { method: "POST", path: "/api/v1/stock/warehouses", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateWarehouseBin: { method: "POST", path: "/api/v1/stock/warehouses/{id}/bins", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateWarehouseZone: { method: "POST", path: "/api/v1/stock/warehouses/{id}/zones", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCustomerAcceptances: { method: "GET", path: "/api/v1/stock/customer-acceptances", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockDeactivateWarehouse: { method: "POST", path: "/api/v1/stock/warehouses/{id}/deactivate", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockDeactivateWarehouseBin: { method: "POST", path: "/api/v1/stock/warehouses/{id}/bins/{binId}/deactivate", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockDeleteAssemblySpec: { method: "DELETE", path: "/api/v1/stock/assembly-specs/{id}", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockDeleteCondition: { method: "DELETE", path: "/api/v1/stock/conditions/{id}", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockDeleteContactPolicy: { method: "DELETE", path: "/api/v1/stock/contact-policies/{contactId}", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockDeleteDraftDocument: { method: "DELETE", path: "/api/v1/stock/documents/{id}", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockDeleteWarehouse: { method: "DELETE", path: "/api/v1/stock/warehouses/{id}", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockDeriveInventoryActs: { method: "POST", path: "/api/v1/stock/documents/{id}/derive", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockDisableWarehouseTransferReceipt: { method: "POST", path: "/api/v1/stock/warehouses/{id}/transfer-receipt/disable", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockDisableWarehouseZones: { method: "POST", path: "/api/v1/stock/warehouses/{id}/zones/disable", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockDiscrepancySummary: { method: "GET", path: "/api/v1/stock/discrepancies/summary", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockDropWarehouseZoneAllocationDraft: { method: "DELETE", path: "/api/v1/stock/warehouses/{id}/zones/allocation/draft", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockEnableWarehouseTransferReceipt: { method: "POST", path: "/api/v1/stock/warehouses/{id}/transfer-receipt/enable", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockEnableWarehouseZones: { method: "POST", path: "/api/v1/stock/warehouses/{id}/zones/enable", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockExportDownloadSession: { method: "GET", path: "/api/v1/stock/exports/{id}/download-session", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockFinishInventoryCount: { method: "POST", path: "/api/v1/stock/documents/{id}/inventory-finish", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockFinishUploadSession: { method: "POST", path: "/api/v1/stock/upload-sessions/{id}/finish", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGenerateWarehouseBins: { method: "POST", path: "/api/v1/stock/warehouses/{id}/bins/generate", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetAssemblySpec: { method: "GET", path: "/api/v1/stock/assembly-specs/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetAvailability: { method: "GET", path: "/api/v1/stock/availability", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetBatch: { method: "GET", path: "/api/v1/stock/batches/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetCarrierShipment: { method: "GET", path: "/api/v1/stock/carrier-shipments/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetCompanyPolicy: { method: "GET", path: "/api/v1/stock/company-policies/{companyId}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetConditionUsage: { method: "GET", path: "/api/v1/stock/conditions/{id}/usage", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetDocument: { method: "GET", path: "/api/v1/stock/documents/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetDocumentBlockers: { method: "GET", path: "/api/v1/stock/documents/{id}/blockers", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetDocumentFulfillment: { method: "GET", path: "/api/v1/stock/documents/{id}/fulfillment", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetDocumentLinks: { method: "GET", path: "/api/v1/stock/documents/{id}/links", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetDocumentMoves: { method: "GET", path: "/api/v1/stock/documents/{id}/moves", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetDocumentShelfLife: { method: "GET", path: "/api/v1/stock/documents/{id}/shelf-life", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetExport: { method: "GET", path: "/api/v1/stock/exports/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetExportContent: { method: "GET", path: "/api/v1/stock/exports/{id}/content", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetHandlingUnit: { method: "GET", path: "/api/v1/stock/handling-units/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 1000, pageSizeDefault: 200 },
  stockGetImport: { method: "GET", path: "/api/v1/stock/imports/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetImportErrors: { method: "GET", path: "/api/v1/stock/imports/{id}/errors", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetImportSource: { method: "GET", path: "/api/v1/stock/imports/{id}/source", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetImportTemplate: { method: "GET", path: "/api/v1/stock/import-templates/{kind}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetInventoryCountSheet: { method: "GET", path: "/api/v1/stock/documents/{id}/count-sheet", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetInventoryRegradePlan: { method: "GET", path: "/api/v1/stock/documents/{id}/regrade-plan", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetOverduePurchases: { method: "GET", path: "/api/v1/stock/report/purchases/overdue", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 1000, pageSizeDefault: 200 },
  stockGetOverdueReservations: { method: "GET", path: "/api/v1/stock/report/reservations/overdue", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 1000, pageSizeDefault: 200 },
  stockGetProductBins: { method: "GET", path: "/api/v1/stock/products/{productId}/bins", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetPurchasingReport: { method: "GET", path: "/api/v1/stock/report/purchasing", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 200 },
  stockGetReceiptClaimBalance: { method: "GET", path: "/api/v1/stock/documents/{id}/claim", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetRegradeOffer: { method: "GET", path: "/api/v1/stock/regrade/offer", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetReorderRule: { method: "GET", path: "/api/v1/stock/reorder-rules/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetReservationSummaries: { method: "GET", path: "/api/v1/stock/report/reservations", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 1000, pageSizeDefault: 500 },
  stockGetSalePickPlan: { method: "GET", path: "/api/v1/stock/sales/{id}/pick-plan", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetSaleShipping: { method: "GET", path: "/api/v1/stock/sales/{id}/shipping", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetSalesToShip: { method: "GET", path: "/api/v1/stock/sales/to-ship", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetSettings: { method: "GET", path: "/api/v1/stock/settings", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetSettingsOverview: { method: "GET", path: "/api/v1/stock/settings/overview", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetStockDrilldown: { method: "GET", path: "/api/v1/stock/report/stocks/{productId}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: 200 },
  stockGetStocksReport: { method: "GET", path: "/api/v1/stock/report/stocks", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: 200 },
  stockGetTransitAwaiting: { method: "GET", path: "/api/v1/stock/transit-awaiting", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetTransitShipment: { method: "GET", path: "/api/v1/stock/transit-shipments/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetTransitStock: { method: "GET", path: "/api/v1/stock/transit-stock", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetUploadSession: { method: "GET", path: "/api/v1/stock/upload-sessions/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetValuationRun: { method: "GET", path: "/api/v1/stock/valuation/rebuild/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetWarehouse: { method: "GET", path: "/api/v1/stock/warehouses/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetWarehouseBinContents: { method: "GET", path: "/api/v1/stock/warehouses/{id}/bins/contents", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 200 },
  stockGetWarehouseBlockers: { method: "GET", path: "/api/v1/stock/warehouses/{id}/blockers", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetWarehouseZoneAllocation: { method: "GET", path: "/api/v1/stock/warehouses/{id}/zones/allocation", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetWriteoffRequest: { method: "GET", path: "/api/v1/stock/writeoffs/{id}/request", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockHandOffToAccounting: { method: "POST", path: "/api/v1/stock/documents/{id}/accounting-handoff", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockImportErrorsDownloadSession: { method: "GET", path: "/api/v1/stock/imports/{id}/errors/download-session", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockImportSourceDownloadSession: { method: "GET", path: "/api/v1/stock/imports/{id}/source/download-session", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockImportTemplateDownloadSession: { method: "GET", path: "/api/v1/stock/import-templates/{kind}/download-session", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockInspectImport: { method: "POST", path: "/api/v1/stock/imports/{id}/inspect", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockIssueWriteoff: { method: "POST", path: "/api/v1/stock/writeoffs/{id}/issue", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockLaunchWarehouse: { method: "POST", path: "/api/v1/stock/warehouses/{id}/launch", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListAssemblySpecs: { method: "GET", path: "/api/v1/stock/assembly-specs", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 50 },
  stockListBatchChanges: { method: "GET", path: "/api/v1/stock/batches/{id}/changes", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListBatchStock: { method: "GET", path: "/api/v1/stock/batch-stock", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 100 },
  stockListBatches: { method: "GET", path: "/api/v1/stock/batches", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 100 },
  stockListBinPlacements: { method: "GET", path: "/api/v1/stock/bins/placement", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListBusinesses: { method: "GET", path: "/api/v1/stock/businesses", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListCarrierShipments: { method: "GET", path: "/api/v1/stock/carrier-shipments", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 100 },
  stockListCompanies: { method: "GET", path: "/api/v1/stock/companies", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListCompanyPolicies: { method: "GET", path: "/api/v1/stock/company-policies", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListConditions: { method: "GET", path: "/api/v1/stock/conditions", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListContactPolicies: { method: "GET", path: "/api/v1/stock/contact-policies", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListDiscrepancies: { method: "GET", path: "/api/v1/stock/discrepancies", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 200 },
  stockListDocumentAuthors: { method: "GET", path: "/api/v1/stock/documents/authors", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListDocumentFulfillments: { method: "GET", path: "/api/v1/stock/documents/fulfillments", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListDocuments: { method: "GET", path: "/api/v1/stock/documents", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 200 },
  stockListExpiredStock: { method: "GET", path: "/api/v1/stock/expired-stock", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 200 },
  stockListHandlingUnits: { method: "GET", path: "/api/v1/stock/handling-units", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: 200 },
  stockListImports: { method: "GET", path: "/api/v1/stock/imports", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit", pageSizeMax: 20, pageSizeDefault: 20 },
  stockListInventoryChanges: { method: "GET", path: "/api/v1/stock/documents/{id}/inventory-changes", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListMarketplaceSettings: { method: "GET", path: "/api/v1/stock/marketplace-settings", module: "stock", stage: "preview", permission: "marketplace:read", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListNegativeBalances: { method: "GET", path: "/api/v1/stock/negative-balances", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListProductUOMs: { method: "GET", path: "/api/v1/stock/products/{productId}/uoms", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListReorderRules: { method: "GET", path: "/api/v1/stock/reorder-rules", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 50 },
  stockListSaleReservationHolders: { method: "GET", path: "/api/v1/stock/sales/{id}/reservation/holders", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListSuppliers: { method: "GET", path: "/api/v1/stock/suppliers", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListTransitDiscrepancies: { method: "GET", path: "/api/v1/stock/transit-discrepancies", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListTransitSeriesMismatches: { method: "GET", path: "/api/v1/stock/transit-series-mismatches", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListTransitShipments: { method: "GET", path: "/api/v1/stock/transit-shipments", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 200 },
  stockListUserWarehouses: { method: "GET", path: "/api/v1/stock/users/{userId}/warehouses", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListWarehouseBinSummaries: { method: "GET", path: "/api/v1/stock/warehouses/bins-summary", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListWarehouseBins: { method: "GET", path: "/api/v1/stock/warehouses/{id}/bins", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: 200 },
  stockListWarehouseStaff: { method: "GET", path: "/api/v1/stock/warehouses/{id}/staff", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListWarehouses: { method: "GET", path: "/api/v1/stock/warehouses", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockMarkDocumentPicked: { method: "POST", path: "/api/v1/stock/documents/{id}/picked", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockMarkShipmentRefused: { method: "POST", path: "/api/v1/stock/shipments/{id}/refusal", module: "stock", stage: "preview", permission: "stock.customer_acceptance:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockPlanCarrierShipment: { method: "PUT", path: "/api/v1/stock/carrier-shipments/plan", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockPostDocument: { method: "POST", path: "/api/v1/stock/documents/{id}/post", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockPostInAccounting: { method: "POST", path: "/api/v1/stock/accounting/{id}/post", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockPostWithRebuild: { method: "POST", path: "/api/v1/stock/documents/post-rebuild", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockPrepareWarehouseLaunch: { method: "POST", path: "/api/v1/stock/warehouses/{id}/launch/prepare", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockPreviewImport: { method: "POST", path: "/api/v1/stock/imports/{id}/preview", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockPreviewReceiptCost: { method: "POST", path: "/api/v1/stock/receipt-costs/preview", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockPreviewValuation: { method: "POST", path: "/api/v1/stock/valuation/preview", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockPriceSuggestions: { method: "GET", path: "/api/v1/stock/price-suggestions", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockProductCostComposition: { method: "GET", path: "/api/v1/stock/products/{id}/cost-composition", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockQuoteCarrierShipment: { method: "POST", path: "/api/v1/stock/carrier-shipments/{id}/quote", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockRebuildValuation: { method: "POST", path: "/api/v1/stock/valuation/rebuild", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockReceiptVATTerms: { method: "POST", path: "/api/v1/stock/receipt-vat-terms", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockRefreshCarrierShipments: { method: "POST", path: "/api/v1/stock/carrier-shipments/refresh", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockRefreshInventorySnapshot: { method: "POST", path: "/api/v1/stock/documents/{id}/inventory-refresh", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockRelaunchWarehouse: { method: "POST", path: "/api/v1/stock/warehouses/{id}/relaunch", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockReleaseReservation: { method: "POST", path: "/api/v1/stock/documents/{id}/release", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockReleaseSaleReservation: { method: "POST", path: "/api/v1/stock/sales/{id}/reservation/release", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockRemoveCarrierShipmentPlan: { method: "DELETE", path: "/api/v1/stock/carrier-shipments/{id}", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockRemoveWarehouseStaff: { method: "DELETE", path: "/api/v1/stock/warehouses/{id}/staff/{userId}", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockReserveSale: { method: "POST", path: "/api/v1/stock/sales/{id}/reservation", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockResolveDiscrepancy: { method: "POST", path: "/api/v1/stock/discrepancies/resolve", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockResolveTransitShipment: { method: "POST", path: "/api/v1/stock/transit-shipments/{id}/resolve", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockReturnFromAccounting: { method: "POST", path: "/api/v1/stock/accounting/{id}/return", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockReviseWithRebuild: { method: "POST", path: "/api/v1/stock/documents/{id}/revise-rebuild", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSaveContactPolicy: { method: "PUT", path: "/api/v1/stock/contact-policies", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSaveInventoryCounts: { method: "PATCH", path: "/api/v1/stock/documents/{id}/inventory-counts", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSaveMarketplaceSettings: { method: "PUT", path: "/api/v1/stock/marketplace-settings", module: "stock", stage: "preview", permission: "marketplace:write", idempotent: false, installation: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSaveProductUOM: { method: "PUT", path: "/api/v1/stock/product-uoms", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSaveReorderRule: { method: "PUT", path: "/api/v1/stock/reorder-rules", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSaveWarehouseZoneAllocationDraft: { method: "PUT", path: "/api/v1/stock/warehouses/{id}/zones/allocation/draft", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockScanDocument: { method: "GET", path: "/api/v1/stock/documents/scan", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockScanProduct: { method: "GET", path: "/api/v1/stock/products/scan", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSendCarrierShipment: { method: "POST", path: "/api/v1/stock/carrier-shipments/{id}/send", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSetAssemblySpecStatus: { method: "POST", path: "/api/v1/stock/assembly-specs/{id}/status", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSetWarehouseBinsMode: { method: "POST", path: "/api/v1/stock/warehouses/{id}/bins-mode", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSetWarehouseShippingMode: { method: "POST", path: "/api/v1/stock/warehouses/{id}/shipping-mode", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSettleNegativeBalances: { method: "POST", path: "/api/v1/stock/negative-balances/settle", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockShipSale: { method: "POST", path: "/api/v1/stock/sales/{id}/shipment", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSubmitWriteoffRequest: { method: "POST", path: "/api/v1/stock/writeoffs/{id}/request", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSuggestHandlingUnits: { method: "GET", path: "/api/v1/stock/handling-units/suggestions", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSuggestWarehouseBins: { method: "GET", path: "/api/v1/stock/warehouses/{id}/bins/suggest", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockTakeSaleReservation: { method: "POST", path: "/api/v1/stock/sales/{id}/reservation/take", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockTakeSaleShippingTask: { method: "POST", path: "/api/v1/stock/sales/{id}/shipping-task/take", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateAssemblySpec: { method: "PUT", path: "/api/v1/stock/assembly-specs/{id}", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateBatchRequisites: { method: "PATCH", path: "/api/v1/stock/batches/{id}", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateCompanyPolicy: { method: "PATCH", path: "/api/v1/stock/company-policies/{companyId}", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateCondition: { method: "PATCH", path: "/api/v1/stock/conditions/{id}", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateDocument: { method: "PATCH", path: "/api/v1/stock/documents/{id}", module: "stock", stage: "preview", permission: "stock:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateHandlingUnitStatus: { method: "PATCH", path: "/api/v1/stock/handling-units/{id}/status", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateImportMapping: { method: "PATCH", path: "/api/v1/stock/imports/{id}/mapping", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateReorderRule: { method: "PATCH", path: "/api/v1/stock/reorder-rules/{id}", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateSaleShippingTask: { method: "PUT", path: "/api/v1/stock/sales/{id}/shipping-task", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateSeriesRequisites: { method: "PATCH", path: "/api/v1/stock/batches/{id}/series", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateSettings: { method: "PATCH", path: "/api/v1/stock/settings", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateWarehouse: { method: "PATCH", path: "/api/v1/stock/warehouses/{id}", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateWarehouseBin: { method: "PATCH", path: "/api/v1/stock/warehouses/{id}/bins/{binId}", module: "stock", stage: "preview", permission: "stock.settings:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockWarehouseRelaunchPlan: { method: "GET", path: "/api/v1/stock/warehouses/{id}/relaunch", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockWithdrawWriteoffRequest: { method: "POST", path: "/api/v1/stock/writeoffs/{id}/request/withdraw", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksAddProjectMember: { method: "POST", path: "/api/v1/tasks/projects/{id}/members", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksAddResult: { method: "POST", path: "/api/v1/tasks/tasks/{id}/results", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksAddSectionMember: { method: "POST", path: "/api/v1/tasks/sections/{id}/members", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksArchiveProject: { method: "DELETE", path: "/api/v1/tasks/projects/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksArchiveSection: { method: "DELETE", path: "/api/v1/tasks/sections/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksArchiveTask: { method: "DELETE", path: "/api/v1/tasks/tasks/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksArchiveTemplate: { method: "DELETE", path: "/api/v1/tasks/templates/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksArchiveTodoList: { method: "DELETE", path: "/api/v1/tasks/todo/lists/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksAttachTaskTag: { method: "POST", path: "/api/v1/tasks/tasks/{id}/tags", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCompleteSprint: { method: "POST", path: "/api/v1/tasks/scrum/{project}/sprints/{id}/complete", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateAgentJournalEntry: { method: "POST", path: "/api/v1/tasks/tasks/{id}/agent-journal", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateAttachmentReplacementSession: { method: "POST", path: "/api/v1/tasks/attachments/{id}/replace-sessions", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateAttachmentUploadSession: { method: "POST", path: "/api/v1/tasks/attachments/upload-sessions", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateComment: { method: "POST", path: "/api/v1/tasks/tasks/{id}/comments", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateCustomer: { method: "POST", path: "/api/v1/tasks/customers", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateCustomerNeed: { method: "POST", path: "/api/v1/tasks/customer-needs", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateCycle: { method: "POST", path: "/api/v1/tasks/cycles", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateDocument: { method: "POST", path: "/api/v1/tasks/documents", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateLink: { method: "POST", path: "/api/v1/tasks/tasks/{id}/links", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateMeeting: { method: "POST", path: "/api/v1/tasks/hub/meetings", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateMilestone: { method: "POST", path: "/api/v1/tasks/milestones", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateProject: { method: "POST", path: "/api/v1/tasks/projects", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateProjectFileFolder: { method: "POST", path: "/api/v1/tasks/projects/{id}/file-folders", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreatePullRequest: { method: "POST", path: "/api/v1/tasks/pull-requests", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateRelation: { method: "POST", path: "/api/v1/tasks/tasks/{id}/relations", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateScrumTask: { method: "POST", path: "/api/v1/tasks/scrum/{project}/sprints/{id}/tasks", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateSection: { method: "POST", path: "/api/v1/tasks/sections", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateSprint: { method: "POST", path: "/api/v1/tasks/scrum/{project}/sprints", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateStatus: { method: "POST", path: "/api/v1/tasks/statuses", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateStatusUpdate: { method: "POST", path: "/api/v1/tasks/status-updates", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateTag: { method: "POST", path: "/api/v1/tasks/tags", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateTask: { method: "POST", path: "/api/v1/tasks/tasks", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: true, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateTemplate: { method: "POST", path: "/api/v1/tasks/templates", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateTodoList: { method: "POST", path: "/api/v1/tasks/todo/lists", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateView: { method: "POST", path: "/api/v1/tasks/views", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteAttachment: { method: "DELETE", path: "/api/v1/tasks/attachments/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteComment: { method: "DELETE", path: "/api/v1/tasks/comments/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteCustomer: { method: "DELETE", path: "/api/v1/tasks/customers/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteCustomerNeed: { method: "DELETE", path: "/api/v1/tasks/customer-needs/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteCycle: { method: "DELETE", path: "/api/v1/tasks/cycles/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteDocument: { method: "DELETE", path: "/api/v1/tasks/documents/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteLink: { method: "DELETE", path: "/api/v1/tasks/links/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteMeeting: { method: "DELETE", path: "/api/v1/tasks/hub/meetings/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteMilestone: { method: "DELETE", path: "/api/v1/tasks/milestones/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteProjectFileFolder: { method: "DELETE", path: "/api/v1/tasks/projects/{id}/file-folders/{folderID}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteProjectMember: { method: "DELETE", path: "/api/v1/tasks/projects/{id}/members/{userID}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeletePullRequest: { method: "DELETE", path: "/api/v1/tasks/pull-requests/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteRelation: { method: "DELETE", path: "/api/v1/tasks/relations/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteResult: { method: "DELETE", path: "/api/v1/tasks/tasks/{id}/results/{resultID}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteSectionMember: { method: "DELETE", path: "/api/v1/tasks/section-members/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteSprint: { method: "DELETE", path: "/api/v1/tasks/scrum/{project}/sprints/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteStatus: { method: "DELETE", path: "/api/v1/tasks/statuses/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteStatusUpdate: { method: "DELETE", path: "/api/v1/tasks/status-updates/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteTag: { method: "DELETE", path: "/api/v1/tasks/tags/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteView: { method: "DELETE", path: "/api/v1/tasks/views/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksFinishAttachmentUploadSession: { method: "POST", path: "/api/v1/tasks/attachments/upload-sessions/{id}/finish", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksFinishScrumPoker: { method: "POST", path: "/api/v1/tasks/scrum/{project}/poker/{id}/finish", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetAttachmentContent: { method: "GET", path: "/api/v1/tasks/attachments/{id}/content", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetCustomer: { method: "GET", path: "/api/v1/tasks/customers/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetCustomerNeed: { method: "GET", path: "/api/v1/tasks/customer-needs/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetCycle: { method: "GET", path: "/api/v1/tasks/cycles/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetDocument: { method: "GET", path: "/api/v1/tasks/documents/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetHubOverview: { method: "GET", path: "/api/v1/tasks/hub/overview", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetMeeting: { method: "GET", path: "/api/v1/tasks/hub/meetings/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetMilestone: { method: "GET", path: "/api/v1/tasks/milestones/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetProjectScrum: { method: "GET", path: "/api/v1/tasks/scrum/{project}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetProjectTeamMetrics: { method: "GET", path: "/api/v1/tasks/projects/{id}/team-metrics", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetPullRequest: { method: "GET", path: "/api/v1/tasks/pull-requests/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetScrumPoker: { method: "GET", path: "/api/v1/tasks/scrum/{project}/poker/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetScrumReports: { method: "GET", path: "/api/v1/tasks/scrum/{project}/reports", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetSprintMetrics: { method: "GET", path: "/api/v1/tasks/scrum/metrics/{cycle}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetSprintReport: { method: "GET", path: "/api/v1/tasks/scrum/{project}/sprints/{id}/report", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetStatusMetrics: { method: "GET", path: "/api/v1/tasks/tasks/{id}/status-metrics", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetStatusUpdate: { method: "GET", path: "/api/v1/tasks/status-updates/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetTask: { method: "GET", path: "/api/v1/tasks/tasks/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListActivity: { method: "GET", path: "/api/v1/tasks/tasks/{id}/activity", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListAgentJournal: { method: "GET", path: "/api/v1/tasks/tasks/{id}/agent-journal", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListComments: { method: "GET", path: "/api/v1/tasks/tasks/{id}/comments", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListCustomerNeeds: { method: "GET", path: "/api/v1/tasks/customer-needs", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListCustomers: { method: "GET", path: "/api/v1/tasks/customers", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListCycles: { method: "GET", path: "/api/v1/tasks/cycles", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListDocuments: { method: "GET", path: "/api/v1/tasks/documents", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListHubSections: { method: "GET", path: "/api/v1/tasks/hub/sections", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListLinks: { method: "GET", path: "/api/v1/tasks/tasks/{id}/links", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListMeetings: { method: "GET", path: "/api/v1/tasks/hub/meetings", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListMembers: { method: "GET", path: "/api/v1/tasks/members", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListMilestones: { method: "GET", path: "/api/v1/tasks/milestones", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListProjectFileFolders: { method: "GET", path: "/api/v1/tasks/projects/{id}/file-folders", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListProjectMembers: { method: "GET", path: "/api/v1/tasks/projects/{id}/members", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListProjects: { method: "GET", path: "/api/v1/tasks/projects", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListPullRequests: { method: "GET", path: "/api/v1/tasks/pull-requests", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListRelations: { method: "GET", path: "/api/v1/tasks/tasks/{id}/relations", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListResults: { method: "GET", path: "/api/v1/tasks/tasks/{id}/results", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListScrumPoker: { method: "GET", path: "/api/v1/tasks/scrum/{project}/poker", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListSectionMembers: { method: "GET", path: "/api/v1/tasks/sections/{id}/members", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListSections: { method: "GET", path: "/api/v1/tasks/sections", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListSprintTasks: { method: "GET", path: "/api/v1/tasks/scrum/{project}/sprints/{id}/tasks", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListSprints: { method: "GET", path: "/api/v1/tasks/scrum/{project}/sprints", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListStatusUpdates: { method: "GET", path: "/api/v1/tasks/status-updates", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListStatuses: { method: "GET", path: "/api/v1/tasks/statuses", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListTagCatalog: { method: "GET", path: "/api/v1/tasks/tags", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListTaskAttachments: { method: "GET", path: "/api/v1/tasks/tasks/{id}/attachments", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListTaskTags: { method: "GET", path: "/api/v1/tasks/tasks/{id}/tags", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListTasks: { method: "GET", path: "/api/v1/tasks/tasks", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: null },
  tasksListTemplates: { method: "GET", path: "/api/v1/tasks/templates", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListTodoLists: { method: "GET", path: "/api/v1/tasks/todo/lists", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListViews: { method: "GET", path: "/api/v1/tasks/views", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksMeetingRevisions: { method: "GET", path: "/api/v1/tasks/hub/meetings/{id}/revisions", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksMoveProjectAttachment: { method: "PATCH", path: "/api/v1/tasks/projects/{id}/attachments/{attachmentID}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksMoveScrumTask: { method: "POST", path: "/api/v1/tasks/scrum/{project}/tasks/{task}/sprint", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksMoveTask: { method: "POST", path: "/api/v1/tasks/tasks/{id}/move", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksNewScrumPokerRound: { method: "POST", path: "/api/v1/tasks/scrum/{project}/poker/{id}/round", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksRenameProjectFileFolder: { method: "PATCH", path: "/api/v1/tasks/projects/{id}/file-folders/{folderID}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksRenameTodoList: { method: "PATCH", path: "/api/v1/tasks/todo/lists/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksReorderStatuses: { method: "PATCH", path: "/api/v1/tasks/statuses/reorder", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksRevealScrumPoker: { method: "POST", path: "/api/v1/tasks/scrum/{project}/poker/{id}/reveal", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksRunDueTemplates: { method: "POST", path: "/api/v1/tasks/templates/run-due", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksRunTemplate: { method: "POST", path: "/api/v1/tasks/templates/{id}/run", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksSetScrumBoard: { method: "PUT", path: "/api/v1/tasks/scrum/{project}/board", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksSetScrumReference: { method: "PUT", path: "/api/v1/tasks/scrum/{project}/reference", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksSetScrumStoryPoints: { method: "PUT", path: "/api/v1/tasks/scrum/{project}/tasks/{task}/points", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksStartScrumPoker: { method: "POST", path: "/api/v1/tasks/scrum/{project}/tasks/{task}/poker", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksStartSprint: { method: "POST", path: "/api/v1/tasks/scrum/{project}/sprints/{id}/start", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksTodoCount: { method: "GET", path: "/api/v1/tasks/todo/count", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateComment: { method: "PATCH", path: "/api/v1/tasks/comments/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateCustomer: { method: "PATCH", path: "/api/v1/tasks/customers/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateCustomerNeed: { method: "PATCH", path: "/api/v1/tasks/customer-needs/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateCycle: { method: "PATCH", path: "/api/v1/tasks/cycles/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateDocument: { method: "PATCH", path: "/api/v1/tasks/documents/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateHubSection: { method: "PATCH", path: "/api/v1/tasks/hub/sections/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateMeeting: { method: "PATCH", path: "/api/v1/tasks/hub/meetings/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateMilestone: { method: "PATCH", path: "/api/v1/tasks/milestones/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateProject: { method: "PATCH", path: "/api/v1/tasks/projects/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdatePullRequest: { method: "PATCH", path: "/api/v1/tasks/pull-requests/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateSection: { method: "PATCH", path: "/api/v1/tasks/sections/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateSprint: { method: "PATCH", path: "/api/v1/tasks/scrum/{project}/sprints/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateStatus: { method: "PATCH", path: "/api/v1/tasks/statuses/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateStatusUpdate: { method: "PATCH", path: "/api/v1/tasks/status-updates/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateTag: { method: "PATCH", path: "/api/v1/tasks/tags/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateTask: { method: "PATCH", path: "/api/v1/tasks/tasks/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUploadTaskAttachment: { method: "POST", path: "/api/v1/tasks/tasks/{id}/attachments", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksVoteScrumPoker: { method: "PUT", path: "/api/v1/tasks/scrum/{project}/poker/{id}/vote", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, installation: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
};
