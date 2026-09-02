/*
 * Сгенерировано scripts/generate.py. Руками не править.
 * Источник: snapshot/openapi/akeda-v1.json (контракт 0.21.0-core-public, sha256 3b4e5818e72cb98786a0f06776813205755d9e95e5752df061d59d58c0db6522).
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
  /** Схема листания: limit_offset | limit | page | cursor | none. */
  readonly pagination: string;
  /** Объявленный контрактом потолок размера страницы. */
  readonly pageSizeMax: number | null;
  /** Объявленное контрактом умолчание размера страницы. */
  readonly pageSizeDefault: number | null;
}

/** Типы запроса и ответа каждой операции. Ключ — operationId контракта. */
export interface OperationTypes {
  /** POST /api/v1/app/finance/transactions/{id}/classification-suggestions — Предложить классификацию финансовой операции */
  appFinanceSuggestTransactionClassification: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.AppFinanceClassificationSuggestionInput;
    response: models.AppFinanceClassificationSuggestionAccepted;
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
  /** POST /api/v1/calendar/public/{slug}/book — Забронировать свободный слот */
  calendarBookPublicSlot: {
    params: { "slug": string };
    query: Record<string, never>;
    body: models.CalendarPublicBookInput;
    response: models.CalendarPublicBookResult;
  };
  /** POST /api/v1/calendar/connectors/google/oauth/complete — Завершить подключение Google Calendar */
  calendarCompleteGoogleOAuth: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CalendarOAuthCompleteInput;
    response: models.CalendarConnector;
  };
  /** POST /api/v1/calendar/connectors/office365/oauth/complete — Завершить подключение Microsoft 365 Calendar */
  calendarCompleteOffice365OAuth: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CalendarOAuthCompleteInput;
    response: models.CalendarConnector;
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
    query: { "end": string; "start": string; "users"?: string };
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
  /** GET /api/v1/calendar/public/{slug} — Получить безопасную карточку публичной ссылки */
  calendarGetPublicBookingLink: {
    params: { "slug": string };
    query: Record<string, never>;
    body: never;
    response: models.CalendarPublicBookingLink;
  };
  /** GET /api/v1/calendar/public/{slug}/slots — Получить свободные слоты публичной ссылки */
  calendarGetPublicBookingSlots: {
    params: { "slug": string };
    query: Record<string, never>;
    body: never;
    response: models.CalendarSlotPage;
  };
  /** GET /api/v1/calendar/push/config — Получить публичный ключ Web Push */
  calendarGetPushConfig: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CalendarWebPushConfig;
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
  /** GET /api/v1/calendar/connectors/google/oauth/start — Начать подключение Google Calendar */
  calendarStartGoogleOAuth: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CalendarOAuthStart;
  };
  /** GET /api/v1/calendar/connectors/office365/oauth/start — Начать подключение Microsoft 365 Calendar */
  calendarStartOffice365OAuth: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CalendarOAuthStart;
  };
  /** POST /api/v1/calendar/push/subscriptions — Зарегистрировать Web Push-подписку устройства */
  calendarSubscribePush: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CalendarWebPushSubscription;
    response: models.OK;
  };
  /** POST /api/v1/calendar/connectors/{id}/sync — Запустить ручную синхронизацию коннектора */
  calendarSyncConnector: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CalendarConnectorSyncInput;
    response: models.CalendarSyncResult;
  };
  /** DELETE /api/v1/calendar/push/subscriptions — Отозвать Web Push-подписку устройства */
  calendarUnsubscribePush: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CalendarWebPushUnsubscribe;
    response: models.OK;
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
  /** DELETE /api/v1/chat/conversations/{id}/messages/{messageId} — Удалить своё сообщение */
  chatDeleteMessage: {
    params: { "id": models.UUID; "messageId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatForwardedMessage;
  };
  /** DELETE /api/v1/chat/mobile/devices/{deviceId} — Отключить текущее устройство от чатовых push-уведомлений */
  chatDisableMobileDevice: {
    params: { "deviceId": string };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/chat/conversations/{id}/attachments/{attachmentId}/content — Скачать содержимое вложения */
  chatDownloadAttachment: {
    params: { "attachmentId": models.UUID; "id": models.UUID };
    query: { "w"?: number };
    body: never;
    response: void;
  };
  /** GET /api/v1/chat/conversations/{id}/avatar/content — Скачать фотографию чата */
  chatDownloadConversationAvatar: {
    params: { "id": models.UUID };
    query: { "w"?: number };
    body: never;
    response: void;
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
    query: { "limit"?: number; "media_kind"?: "file" | "image" | "video" | "voice" | "video_circle" };
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
  /** GET /api/v1/chat/conversations/{id}/messages — Получить окно сообщений */
  chatListMessages: {
    params: { "id": models.UUID };
    query: { "after_seq"?: number; "around_seq"?: number; "before_seq"?: number; "limit"?: number };
    body: never;
    response: models.ChatMessagePage;
  };
  /** GET /api/v1/chat/people — Получить безопасный picker людей кабинета */
  chatListPeople: {
    params: Record<string, never>;
    query: Record<string, never>;
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
  /** POST /api/v1/chat/conversations/{id}/delivered — Продвинуть server-owned delivery watermark */
  chatMarkDelivered: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.ChatReceiptInput;
    response: models.ChatReceiptState;
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
  /** GET /api/v1/chat/attachments/{attachmentId}/content — Открыть содержимое доступного медиавложения */
  chatOpenMedia: {
    params: { "attachmentId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** PUT /api/v1/chat/conversations/{id}/messages/{messageId}/pin — Закрепить сообщение в чате */
  chatPinMessage: {
    params: { "id": models.UUID; "messageId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatChangePinResult;
  };
  /** POST /api/v1/chat/mobile/devices — Подключить iPhone к чатовым push-уведомлениям */
  chatRegisterMobileDevice: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.ChatMobileDeviceRegistration;
    response: models.ChatMobileDeviceRegistrationState;
  };
  /** DELETE /api/v1/chat/conversations/{id}/messages/{messageId}/reaction — Снять свою реакцию с сообщения */
  chatRemoveReaction: {
    params: { "id": models.UUID; "messageId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatReactionResult;
  };
  /** POST /api/v1/chat/conversations/{id}/media — Идемпотентно отправить голосовое или видеосообщение */
  chatSendMedia: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatSendMessageResult;
  };
  /** POST /api/v1/chat/conversations/{id}/messages — Идемпотентно отправить текстовое сообщение */
  chatSendMessage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.ChatSendMessage;
    response: models.ChatSendMessageResult;
  };
  /** POST /api/v1/chat/mobile/devices/test — Отправить тестовое чатовое push-уведомление */
  chatSendMobilePushTest: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.ChatMobilePushTestResult;
  };
  /** PUT /api/v1/chat/conversations/{id}/messages/{messageId}/reaction — Поставить свою реакцию на сообщение */
  chatSetReaction: {
    params: { "id": models.UUID; "messageId": models.UUID };
    query: Record<string, never>;
    body: models.ChatSetReaction;
    response: models.ChatReactionResult;
  };
  /** GET /api/v1/chat/realtime/stream — Подписаться на actor-private поток изменений чатов */
  chatStreamRealtime: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/chat/conversations/{id}/messages/{messageId}/pin — Снять закрепление сообщения */
  chatUnpinMessage: {
    params: { "id": models.UUID; "messageId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatChangePinResult;
  };
  /** PATCH /api/v1/chat/folders/{id} — Переписать личную папку списка бесед */
  chatUpdateFolder: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.ChatSaveFolder;
    response: models.ChatFolder;
  };
  /** POST /api/v1/chat/conversations/{id}/attachments — Загрузить вложение в доступный чат */
  chatUploadAttachment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatForwardedAttachment;
  };
  /** POST /api/v1/chat/conversations/{id}/avatar — Загрузить фотографию чата */
  chatUploadConversationAvatar: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ChatConversation;
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
  /** DELETE /api/v1/core/employees/{id} — Архивировать карточку сотрудника */
  coreArchiveEmployee: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/core/products/{id}/archive — Архивировать позицию без удаления истории */
  coreArchiveProduct: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreProduct;
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
  /** POST /api/v1/core/accounting-periods/close — Закрыть учёт по дату включительно */
  coreCloseAccountingPeriod: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreAccountingPeriodClose;
    response: models.CoreAccountingPeriodEvent;
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
  /** POST /api/v1/core/gl-opening-imports — Загрузить и разобрать ОСВ 1С */
  coreCreateGLOpeningImport: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreGLOpeningImport;
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
  /** POST /api/v1/core/product-import-upload-sessions — Создать сессию большой загрузки импорта */
  coreCreateProductImportUploadSession: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreProductImportUploadSessionRequest;
    response: models.CoreProductImportUploadSession;
  };
  /** POST /api/v1/core/registers — Создать определение регистра */
  coreCreateRegister: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreRegisterCreate;
    response: models.CoreRegister;
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
  /** DELETE /api/v1/core/employees/{id}/photo — Удалить корпоративное фото сотрудника */
  coreDeleteEmployeePhoto: {
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
  /** DELETE /api/v1/core/registers/{key} — Удалить пустой пользовательский регистр */
  coreDeleteRegister: {
    params: { "key": string };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/core/self/photo — Удалить корпоративное фото текущего сотрудника */
  coreDeleteSelfEmployeePhoto: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/core/accounting-periods — Получить закрытую дату и последние 50 решений */
  coreGetAccountingPeriodState: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreAccountingPeriodState;
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
  /** GET /api/v1/core/employees/{id}/photo/content — Скачать корпоративное фото сотрудника */
  coreGetEmployeePhotoContent: {
    params: { "id": models.UUID };
    query: { "w"?: number };
    body: never;
    response: void;
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
  /** GET /api/v1/core/gl-opening-imports/{id}/source — Скачать исходный файл ОСВ */
  coreGetGLOpeningImportSource: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
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
  /** GET /api/v1/core/self/photo — Скачать корпоративное фото текущего сотрудника */
  coreGetSelfEmployeePhoto: {
    params: Record<string, never>;
    query: { "w"?: number };
    body: never;
    response: void;
  };
  /** GET /api/v1/core/self/preferences — Получить настройки кабинета как default для вошедшего пользователя */
  coreGetSelfPreferences: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreCabinetPreferences;
  };
  /** GET /api/v1/core/ledger/trial-balance — Получить оборотно-сальдовую ведомость и проверку баланса */
  coreGetTrialBalance: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "company"?: models.UUID; "date_from"?: string; "date_to"?: string; "include_empty"?: boolean };
    body: never;
    response: models.CoreTrialBalance;
  };
  /** GET /api/v1/core/ui-state — Получить сохранённые настройки экранов текущего пользователя */
  coreGetUIState: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreUIState;
  };
  /** POST /api/v1/core/dictionaries/{id}/items/import — Дополнить справочник пачкой до 1000 записей */
  coreImportDictionaryItems: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreDictionaryItemImport;
    response: models.CoreImportResult;
  };
  /** POST /api/v1/core/external-refs/contacts/import — Импортировать выгрузку контрагентов из 1С и выполнить автоматч */
  coreImportExternalContacts: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreExternalContactMatchReport;
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
    query: Record<string, never>;
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
    query: { "limit"?: number; "offset"?: number; "q"?: string };
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
    query: { "include_closed"?: boolean; "subject_type"?: string };
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
  /** GET /api/v1/core/pnl-items — Получить статьи, применимые в ОПиУ */
  coreListPnlItems: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreItemPage;
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
    query: { "folder"?: string; "is_stockable"?: boolean; "limit"?: number; "offset"?: number; "operational_only"?: boolean; "parent_product_id"?: models.UUID; "q"?: string; "record_kind"?: models.CoreProductRecordKind; "status"?: "active" | "archived" | "all" };
    body: never;
    response: models.CoreProductPage;
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
  /** GET /api/v1/reference/catalog — Получить каталог справочников, доступных в кабинете */
  coreReferenceCatalog: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CoreDirectoryPage;
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
  /** POST /api/v1/core/external-refs/resolve — Разрешить внешние идентификаторы в UUID Akeda */
  coreResolveExternalRefs: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CoreExternalRefResolveRequest;
    response: models.CoreExternalRefResolveResult;
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
  /** PUT /api/v1/core/ui-state/{screen} — Заменить сохранённое состояние одного экрана */
  coreSaveUIState: {
    params: { "screen": string };
    query: Record<string, never>;
    body: unknown;
    response: void;
  };
  /** POST /api/v1/core/businesses/{id}/activation — Включить или отключить управленческий бизнес */
  coreSetBusinessActive: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CoreSetBusinessActiveRequest;
    response: models.CoreBusiness;
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
    body: models.CoreBusinessInput;
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
  /** POST /api/v1/core/employees/{id}/photo — Загрузить корпоративное фото сотрудника */
  coreUploadEmployeePhoto: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CorePhotoResult;
  };
  /** PUT /api/v1/core/product-import-upload-sessions/{id}/content — Загрузить бинарное содержимое сессии импорта */
  coreUploadProductImportContent: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CoreProductImportRun;
  };
  /** POST /api/v1/core/self/photo — Загрузить корпоративное фото текущего сотрудника */
  coreUploadSelfEmployeePhoto: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.CorePhotoResult;
  };
  /** POST /api/v1/crm/{entity}/{id}/notes — Добавить заметку в ленту записи */
  crmAddNote: {
    params: { "entity": "lead" | "deal"; "id": models.UUID };
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
  /** POST /api/v1/crm/inbox/connections/{id}/check — Проверить подключение канала */
  crmCheckInboxConnection: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMInboxConnectionCheck;
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
  /** POST /api/v1/crm/{entity}/{id}/engagements — Запланировать дело по лиду или сделке */
  crmCreateEngagement: {
    params: { "entity": "lead" | "deal"; "id": models.UUID };
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
  /** POST /api/v1/crm/{entity}/{id}/hub-meetings — Связать запись CRM со встречей хаба проекта */
  crmCreateHubMeetingLink: {
    params: { "entity": "lead" | "deal"; "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMCreateHubMeetingInput;
    response: models.CRMExternalLink;
  };
  /** POST /api/v1/crm/inbox/connections — Подключить канал */
  crmCreateInboxConnection: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.CRMInboxConnectionInput;
    response: models.CRMInboxConnection;
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
  /** GET /api/v1/crm/customers/duplicates — Найти похожие карточки клиента */
  crmFindCustomerDuplicates: {
    params: Record<string, never>;
    query: { "name"?: string; "phone"?: string };
    body: never;
    response: Array<models.CRMCustomerDuplicate>;
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
  /** GET /api/v1/crm/inbox/attachments/{id}/content — Скачать вложение диалога */
  crmGetInboxAttachmentContent: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/crm/inbox/conversations/{id} — Получить диалог */
  crmGetInboxConversation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMInboxConversation;
  };
  /** GET /api/v1/crm/leads/{id} — Получить лид */
  crmGetLead: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMLeadCard;
  };
  /** GET /api/v1/crm/leads/{id}/history — Получить решения по лиду */
  crmGetLeadHistory: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMLeadDecision>;
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
  /** GET /api/v1/crm/{entity}/{id}/timeline — Получить единую хронологию лида или сделки */
  crmGetTimeline: {
    params: { "entity": "lead" | "deal"; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: Array<models.CRMTimelineEntry>;
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
  /** GET /api/v1/crm/{entity}/{id}/engagements — Получить дела по лиду или сделке */
  crmListEngagements: {
    params: { "entity": "lead" | "deal"; "id": models.UUID };
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
  /** GET /api/v1/crm/leads — Получить лиды */
  crmListLeads: {
    params: Record<string, never>;
    query: { "archived"?: boolean; "customer"?: models.UUID; "limit"?: number; "offset"?: number; "owner"?: number; "q"?: string; "sort"?: string; "status"?: models.CRMLeadStatus };
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
  /** PUT /api/v1/crm/deals/{id}/contacts — Заменить состав контрагентов сделки */
  crmReplaceDealContacts: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: Array<models.CRMDealContactInput>;
    response: Array<models.CRMDealContact>;
  };
  /** PUT /api/v1/crm/deals/{id}/items — Заменить смету сделки */
  crmReplaceDealItems: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: Array<models.CRMDealItemInput>;
    response: Array<models.CRMDealItem>;
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
  /** PATCH /api/v1/crm/inbox/connections/{id} — Изменить подключение канала */
  crmUpdateInboxConnection: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMInboxConnectionPatch;
    response: models.CRMInboxConnection;
  };
  /** PATCH /api/v1/crm/leads/{id} — Изменить лид */
  crmUpdateLead: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMLeadPatch;
    response: models.CRMLead;
  };
  /** PATCH /api/v1/crm/pipelines/{id} — Изменить воронку */
  crmUpdatePipeline: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMPipelinePatch;
    response: models.CRMPipeline;
  };
  /** PATCH /api/v1/crm/stages/{id} — Изменить стадию */
  crmUpdateStage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CRMStagePatch;
    response: models.CRMStage;
  };
  /** POST /api/v1/crm/inbox/messages/{id}/attachments — Добавить вложение к сообщению */
  crmUploadInboxMessageAttachment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMInboxAttachment;
  };
  /** POST /api/v1/crm/inbox/conversations/{id}/uploads — Загрузить файл для исходящего сообщения */
  crmUploadInboxOutboundFile: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CRMInboxOutboundUpload;
  };
  /** GET /api/v1/developer/app-blocks — Прочитать запреты своих документов */
  developerAppBlocks: {
    params: Record<string, never>;
    query: { "limit"?: number };
    body: never;
    response: models.PlatformAppBlockList;
  };
  /** DELETE /api/v1/developer/sessions/current — Выйти из контура разработчика */
  developerCloseSession: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: void;
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
  /** POST /api/v1/developer/publisher-application — Подать заявку на имя издателя */
  developerSubmitPublisherApplication: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.DeveloperApplicationInput;
    response: models.DeveloperApplicationResult;
  };
  /** POST /api/v1/finance/connectors/accounts/{accountId}/adopt — Создать счёт Akeda из внешнего банковского счёта */
  financeAdoptConnectorAccount: {
    params: { "accountId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceConnectorAccount;
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
  /** POST /api/v1/finance/payment-calendar/plans/{id}/cancel — Отменить ручную плановую строку */
  financeCancelPaymentPlan: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinancePaymentPlan;
  };
  /** POST /api/v1/finance/payroll/documents/{id}/cancel — Отменить проведение зарплатного документа */
  financeCancelPayrollDocument: {
    params: { "id": models.UUID };
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
  /** POST /api/v1/finance/transactions/{id}/categorize — Привязать операцию к статье ДДС, контрагенту или заказу */
  financeCategorizeTransaction: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceTransactionCategorize;
    response: models.FinanceTransaction;
  };
  /** POST /api/v1/finance/connectors/{id}/accounts/{accountId}/check-statement — Проверить доступность выписки без записи в ERP */
  financeCheckConnectorStatement: {
    params: { "accountId": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceConnectorStatementCheck;
  };
  /** GET /api/v1/finance/classification-suggestions — Прочитать рекомендации расширений */
  financeClassificationSuggestions: {
    params: Record<string, never>;
    query: { "limit"?: number; "offset"?: number; "status"?: "pending" | "accepted" | "rejected"; "transaction"?: models.UUID };
    body: never;
    response: Array<models.FinanceClassificationSuggestion>;
  };
  /** PUT /api/v1/finance/connectors/{id}/mtls — Сохранить клиентский сертификат для банковского OAuth */
  financeConfigureConnectorMTLS: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceConnectorMTLSInput;
    response: models.FinanceConnector;
  };
  /** POST /api/v1/finance/accounts — Создать банковский счёт */
  financeCreateAccount: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceAccountCreate;
    response: models.FinanceAccount;
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
  /** POST /api/v1/finance/statements — Создать заголовок выписки вручную */
  financeCreateStatement: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceStatementCreate;
    response: models.FinanceStatement;
  };
  /** POST /api/v1/finance/transactions — Создать банковскую операцию */
  financeCreateTransaction: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceTransactionCreate;
    response: models.FinanceTransaction;
  };
  /** DELETE /api/v1/finance/accounts/{id}/statements/{statementId} — Удалить последнюю загруженную выписку счёта */
  financeDeleteAccountStatement: {
    params: { "id": models.UUID; "statementId": models.UUID };
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
  /** POST /api/v1/finance/payment-calendar/plans/{id}/execute — Связать план с фактической денежной операцией */
  financeExecutePaymentPlan: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinancePaymentPlanExecute;
    response: models.FinancePaymentPlan;
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
    query: { "business"?: models.UUID; "company"?: models.UUID; "currency"?: string; "from"?: string; "project"?: models.UUID; "source"?: models.UUID; "step"?: "month" | "quarter" | "total"; "to"?: string };
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
  /** GET /api/v1/finance/imports/{id} — Получить состояние запуска импорта */
  financeGetImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceImportRun;
  };
  /** GET /api/v1/finance/payment-calendar — Получить платёжный календарь и прогноз остатка */
  financeGetPaymentCalendar: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "company"?: string; "currency"?: string; "from"?: string; "project"?: string; "step"?: "day" | "month" | "quarter"; "to"?: string };
    body: never;
    response: models.FinancePaymentCalendar;
  };
  /** GET /api/v1/finance/reports/payroll — Построить журнал заработной платы за период */
  financeGetPayrollJournal: {
    params: Record<string, never>;
    query: { "cfo"?: models.UUID; "company"?: models.UUID; "department"?: models.UUID; "employee"?: models.UUID; "from"?: string; "project"?: models.UUID; "to"?: string };
    body: never;
    response: models.FinancePayrollJournal;
  };
  /** GET /api/v1/finance/period-checks — Получить проверки перед закрытием периода */
  financeGetPeriodCloseChecks: {
    params: Record<string, never>;
    query: Record<string, never>;
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
    query: { "business"?: models.UUID; "company"?: models.UUID; "from"?: string; "layout"?: models.UUID; "project"?: models.UUID; "to"?: string };
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
  /** GET /api/v1/finance/trade-journal/advance — Получить свободные авансы контрагента */
  financeGetTradeAdvance: {
    params: Record<string, never>;
    query: { "company_id": models.UUID; "contact_id": models.UUID; "currency": string; "direction": "sales" | "purchases" };
    body: never;
    response: models.FinanceTradeAdvance;
  };
  /** GET /api/v1/finance/trade-journal — Получить журнал продаж или закупок */
  financeGetTradeJournal: {
    params: Record<string, never>;
    query: { "business"?: models.UUID; "direction": "sales" | "purchases"; "limit"?: number };
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
  /** POST /api/v1/finance/imports/{id}/inspect — Прочитать лист и колонки файла импорта */
  financeInspectImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceImportInspect;
    response: models.FinanceImportRun;
  };
  /** POST /api/v1/finance/statements/{id}/transactions — Привязать существующие операции к выписке */
  financeLinkStatementTransactions: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceStatementLinkInput;
    response: models.FinanceStatementLinkResult;
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
    query: { "business"?: models.UUID; "currency"?: string; "direction"?: models.FinanceDirection; "from"?: string; "q"?: string; "to"?: string };
    body: never;
    response: models.FinancePaymentFactPage;
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
    query: Record<string, never>;
    body: never;
    response: models.FinancePnlLayoutPage;
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
    query: { "company_id": models.UUID; "currency"?: string; "offset"?: number; "q"?: string };
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
  /** GET /api/v1/finance/transactions — Получить банковские операции */
  financeListTransactions: {
    params: Record<string, never>;
    query: { "account"?: models.UUID; "business"?: models.UUID; "direction"?: models.FinanceDirection; "limit"?: number; "match_state"?: string; "offset"?: number };
    body: never;
    response: models.FinanceTransactionPage;
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
  /** POST /api/v1/finance/payroll/import/inspect — Разобрать файл реестра начислений */
  financePayrollImportInspect: {
    params: Record<string, never>;
    query: { "header"?: number };
    body: never;
    response: models.FinancePayrollImportInspection;
  };
  /** POST /api/v1/finance/payroll/import/preview — Получить предпросмотр начисления по соответствию колонок */
  financePayrollImportPreview: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.FinancePayrollImportPreview;
  };
  /** POST /api/v1/finance/payroll/payout-sheet — Выгрузить список на оплату и завести реестр выплаты */
  financePayrollPayoutSheet: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinancePayoutSheetRequest;
    response: void;
  };
  /** GET /api/v1/finance/reports/pnl/entries — Получить расшифровку ячейки отчёта о прибылях и убытках */
  financePnlEntries: {
    params: Record<string, never>;
    query: { "company"?: models.UUID; "from"?: string; "item"?: models.UUID; "project"?: models.UUID; "to"?: string };
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
  /** GET /api/v1/finance/dividends/decisions/preview — Рассчитать доступную прибыль и заполнить распределение собственникам */
  financePreviewDividendDecision: {
    params: Record<string, never>;
    query: { "business_id"?: models.UUID; "company_id"?: models.UUID; "period_from": string; "period_to": string; "policy_id"?: models.UUID };
    body: never;
    response: { [key: string]: unknown };
  };
  /** POST /api/v1/finance/imports/{id}/preview — Проверить импорт и показать изменения без записи */
  financePreviewImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceImportRun;
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
  /** POST /api/v1/finance/connectors/{id}/accounts/refresh — Перечитать счета из банка */
  financeRefreshConnectorAccounts: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceConnectorAccountPage;
  };
  /** POST /api/v1/finance/classification-suggestions/{id}/reject — Отклонить рекомендацию расширения */
  financeRejectClassificationSuggestion: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/finance/registers/repair — Атомарно восстановить проводки указанных операций */
  financeRepairRegisters: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceRegisterRepairRequest;
    response: models.FinanceRegisterRepairResult;
  };
  /** POST /api/v1/finance/payment-calendar/plans/{id}/restore — Вернуть отменённую плановую строку */
  financeRestorePaymentPlan: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinancePaymentPlan;
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
  /** POST /api/v1/finance/wallets/{id}/opening-balance — Завести входящий остаток кассы документом */
  financeSetWalletOpeningBalance: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceOpeningBalanceRequest;
    response: void;
  };
  /** POST /api/v1/finance/connectors/{id}/consent — Начать подтверждение доступа в интернет-банке */
  financeStartConnectorConsent: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceConnectorConsent;
  };
  /** POST /api/v1/finance/connectors/{id}/sync — Запустить синхронизацию подключения вручную */
  financeSyncConnector: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinanceConnectorSyncResult;
  };
  /** POST /api/v1/finance/connectors/test — Проверить связь с банком до сохранения */
  financeTestConnectorCredentials: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.FinanceConnectorCredentialTestInput;
    response: models.FinanceConnectorCredentialTestResult;
  };
  /** GET /api/v1/finance/transactions/{id}/payout-registers — Подобрать реестры на выплату под банковскую операцию */
  financeTransactionPayoutRegisters: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.FinancePayoutRegisterPage;
  };
  /** PATCH /api/v1/finance/accounts/{id} — Частично изменить банковский счёт */
  financeUpdateAccount: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceAccountPatch;
    response: models.FinanceAccount;
  };
  /** PATCH /api/v1/finance/cash-operations/{id}/responsible — Изменить ответственного кассовой операции без перепроведения */
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
  /** PATCH /api/v1/finance/payment-calendar/plans/{id} — Заменить данные ручной плановой строки */
  financeUpdatePaymentPlan: {
    params: { "id": models.UUID };
    query: { "business"?: models.UUID };
    body: models.FinancePaymentPlanInput;
    response: models.FinancePaymentPlan;
  };
  /** PATCH /api/v1/finance/transactions/{id}/responsible — Изменить операционного ответственного без перепроведения */
  financeUpdateTransactionResponsible: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.FinanceResponsiblePatch;
    response: models.FinanceTransaction;
  };
  /** POST /api/v1/finance/imports — Загрузить файл банковских или кассовых операций */
  financeUploadImport: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.FinanceImportRun;
  };
  /** POST /api/v1/knowledge/answer — Ответить по материалам базы знаний */
  knowledgeAnswer: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.KnowledgeAnswerInput;
    response: models.KnowledgeAnswer;
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
  /** DELETE /api/v1/knowledge/spaces/{id}/cover — Удалить обложку пространства */
  knowledgeDeleteSpaceCover: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
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
  /** GET /api/v1/knowledge/spaces/{id}/cover — Скачать обложку пространства */
  knowledgeGetSpaceCover: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
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
  /** POST /api/v1/knowledge/spaces/{id}/cover — Загрузить обложку пространства */
  knowledgeUploadSpaceCover: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** POST /api/v1/knowledge/nodes/{id}/verify — Подтвердить актуальность страницы */
  knowledgeVerifyPage: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.KnowledgeVersionInput;
    response: models.KnowledgeNode;
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
  /** DELETE /api/v1/marketplace/wb/product-groups/{id} — Удалить срез товаров Wildberries */
  marketplaceDeleteWbProductGroup: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.OK;
  };
  /** POST /api/v1/marketplace/econ/quote — Рассчитать юнит-экономику по строкам прайса */
  marketplaceEconQuote: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarketplaceEconQuoteRequest;
    response: models.MarketplaceEconQuoteResponse;
  };
  /** GET /api/v1/marketplace/ozon/decomposition — Получить декомпозицию юнит-экономики Ozon */
  marketplaceOzonDecomposition: {
    params: Record<string, never>;
    query: { "group"?: string; "month"?: string; "store"?: string };
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
    query: { "group"?: string; "scope"?: string; "sku"?: string; "store"?: string };
    body: never;
    response: models.MarketplaceOzonFunnelDaily;
  };
  /** GET /api/v1/marketplace/ozon/orders/overview — Получить сводку заказов Ozon */
  marketplaceOzonOrdersOverview: {
    params: Record<string, never>;
    query: { "group"?: string; "scheme"?: "all" | "fbo" | "fbs"; "store"?: string };
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
    query: { "group"?: string; "page"?: number; "page_size"?: number; "q"?: string; "search"?: string; "status"?: string; "store"?: string; "subject"?: string };
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
    query: { "all"?: "1" };
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
  /** POST /api/v1/marketplace/yandex/cost — Задать себестоимость товара Яндекс Маркета */
  marketplaceSetYandexCost: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.MarketplaceYandexCostInput;
    response: models.MarketplaceYandexCost;
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
  /** GET /api/v1/marketplace/wb/decomposition — Получить декомпозицию прибыли Wildberries */
  marketplaceWbDecomposition: {
    params: Record<string, never>;
    query: { "month"?: string; "store"?: string };
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
    query: { "sku"?: string; "store"?: string };
    body: never;
    response: models.MarketplaceWbFunnelDaily;
  };
  /** GET /api/v1/marketplace/wb/orders/overview — Получить сводку заказов и продаж Wildberries */
  marketplaceWbOrdersOverview: {
    params: Record<string, never>;
    query: { "store"?: string };
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
    query: { "brand"?: string; "group"?: string; "page"?: number; "page_size"?: number; "q"?: string; "search"?: string; "store"?: string; "subject"?: string };
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
    query: { "all"?: "1" };
    body: never;
    response: models.MarketplaceStorePage;
  };
  /** GET /api/v1/marketplace/yandex/orders/overview — Получить сводку заказов Яндекс Маркета */
  marketplaceYandexOrdersOverview: {
    params: Record<string, never>;
    query: { "group"?: string; "store"?: string };
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
    query: { "all"?: "1" };
    body: never;
    response: models.MarketplaceStorePage;
  };
  /** POST /api/v1/settings/companies/{id}/activate — Вернуть юрлицо в работу */
  settingsActivateCompany: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** GET /api/v1/settings/app-incidents — Узнать, что заблокировали у себя и что оно видело */
  settingsAppIncidents: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.SettingsAppIncidentList;
  };
  /** GET /api/v1/settings/app-installations/{id}/events — Получить журнал своей установки */
  settingsAppInstallationEvents: {
    params: { "id": models.UUID };
    query: { "limit"?: number };
    body: never;
    response: models.PlatformAppInstallationEventPage;
  };
  /** POST /api/v1/settings/api-keys — Выпустить API-ключ */
  settingsCreateApiKey: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.SettingsApiKeyInput;
    response: models.SettingsApiKeyCreated;
  };
  /** POST /api/v1/settings/companies — Завести юрлицо */
  settingsCreateCompany: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.SettingsCompanyInput;
    response: models.SettingsCompany;
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
  /** POST /api/v1/settings/roles — Создать роль кабинета */
  settingsCreateRole: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.SettingsRoleInput;
    response: models.SettingsRole;
  };
  /** DELETE /api/v1/settings/api-keys/{id} — Удалить свой API-ключ */
  settingsDeleteApiKey: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: void;
  };
  /** DELETE /api/v1/settings/companies/{id} — Вывести юрлицо из работы */
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
  /** POST /api/v1/settings/app-installations/{id}/disable — Выключить приложение в своём кабинете */
  settingsDisableAppInstallation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.PlatformAppReasonInput;
    response: models.PlatformAppSwitchResult;
  };
  /** POST /api/v1/settings/app-installations/{id}/enable — Включить приложение в своём кабинете */
  settingsEnableAppInstallation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.PlatformAppReasonInput;
    response: models.PlatformAppSwitchResult;
  };
  /** GET /api/v1/settings/field-schema — Получить действующую схему дополнительных полей */
  settingsGetFieldSchema: {
    params: Record<string, never>;
    query: { "entity_type"?: string };
    body: never;
    response: models.SettingsFieldSchema;
  };
  /** POST /api/v1/settings/apps/{publisher}/{key}/installation — Установить приложение в свой кабинет */
  settingsInstallApp: {
    params: { "key": string; "publisher": string };
    query: Record<string, never>;
    body: models.SettingsAppInstallInput;
    response: models.PlatformAppInstallResult;
  };
  /** GET /api/v1/settings/api-keys/{id}/access — Получить журнал доступа к API-ключу */
  settingsListApiKeyAccess: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.SettingsApiKeyAccessPage;
  };
  /** GET /api/v1/settings/api-keys — Получить свои API-ключи */
  settingsListApiKeys: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.SettingsApiKeyPage;
  };
  /** GET /api/v1/settings/app-installations — Получить установки кабинета */
  settingsListAppInstallations: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.SettingsAppInstallationPage;
  };
  /** GET /api/v1/settings/apps — Получить приложения, открытые кабинету */
  settingsListApps: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.SettingsAppCatalog;
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
  /** GET /api/v1/settings/apps/{publisher}/{key}/consent — Открыть экран согласия по версии */
  settingsPreviewAppConsent: {
    params: { "key": string; "publisher": string };
    query: { "version": string };
    body: never;
    response: models.SettingsAppConsentResult;
  };
  /** POST /api/v1/settings/api-keys/{id}/restore — Вернуть отозванный API-ключ в работу */
  settingsRestoreApiKey: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.SettingsApiKeyActivationResult;
  };
  /** POST /api/v1/settings/api-keys/{id}/revoke — Отозвать свой API-ключ */
  settingsRevokeApiKey: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.SettingsApiKeyActivationResult;
  };
  /** POST /api/v1/settings/app-installations/{id}/rollback — Вернуть свою установку на прежнюю версию */
  settingsRollbackAppInstallation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.PlatformAppReasonInput;
    response: models.PlatformAppRollbackResult;
  };
  /** POST /api/v1/settings/companies/{id}/accounting-method — Переключить метод учёта юрлица */
  settingsSetCompanyAccountingMethod: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.SettingsCompanyAccountingMethodInput;
    response: void;
  };
  /** POST /api/v1/settings/roles/{id}/activation — Включить или отключить роль */
  settingsSetRoleActive: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.SettingsRoleActivationInput;
    response: models.SettingsRoleActivationResult;
  };
  /** POST /api/v1/settings/roles/{id}/transfer — Перенести носителей роли на другую роль */
  settingsTransferRoleMembers: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.SettingsRoleTransferInput;
    response: models.SettingsRoleTransferResult;
  };
  /** POST /api/v1/settings/app-installations/{id}/uninstall — Удалить приложение из своего кабинета */
  settingsUninstallAppInstallation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.PlatformAppReasonInput;
    response: models.PlatformAppSwitchResult;
  };
  /** POST /api/v1/settings/app-installations/{id}/unpark — Вернуть доставку событий своей установке */
  settingsUnparkAppInstallation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.PlatformAppReasonInput;
    response: models.PlatformAppUnparkResult;
  };
  /** POST /api/v1/settings/app-installations/{id}/update — Перевести свою установку на другую версию */
  settingsUpdateAppInstallation: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.PlatformAppUpdateInput;
    response: models.PlatformAppUpdateResult;
  };
  /** PATCH /api/v1/settings/companies/{id} — Изменить реквизиты юрлица */
  settingsUpdateCompany: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.SettingsCompanyInput;
    response: models.SettingsCompany;
  };
  /** PATCH /api/v1/settings/field-definitions/{id} — Изменить определение дополнительного поля */
  settingsUpdateFieldDefinition: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.SettingsFieldDefinitionInput;
    response: models.SettingsFieldDefinition;
  };
  /** PATCH /api/v1/settings/members/{id} — Изменить участника кабинета */
  settingsUpdateMember: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.SettingsMemberPatch;
    response: models.SettingsMember;
  };
  /** PATCH /api/v1/settings/roles/{id} — Изменить роль кабинета */
  settingsUpdateRole: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.SettingsRoleInput;
    response: models.SettingsRole;
  };
  /** POST /api/v1/stock/warehouses/{id}/activate — Вернуть склад в работу */
  stockActivateWarehouse: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockWarehouse;
  };
  /** POST /api/v1/stock/imports/{id}/apply — Атомарно применить подтверждённый preview */
  stockApplyImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockImportApplyRequest;
    response: models.StockImportRun;
  };
  /** POST /api/v1/stock/documents/{id}/cancel — Отменить проведение складского документа */
  stockCancelDocument: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
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
  /** POST /api/v1/stock/imports — Загрузить файл складского импорта */
  stockCreateImport: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.StockImportRun;
  };
  /** POST /api/v1/stock/purchasing/orders — Создать заказ поставщику по рассчитанной потребности */
  stockCreatePurchaseOrder: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockPurchaseOrderCreate;
    response: models.CoreDocument;
  };
  /** POST /api/v1/stock/warehouses — Создать склад */
  stockCreateWarehouse: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StockWarehouseInput;
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
  /** POST /api/v1/stock/documents/{id}/inventory-finish — Завершить пересчёт инвентаризации */
  stockFinishInventoryCount: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockInventoryFinishInput;
    response: models.CoreDocument;
  };
  /** GET /api/v1/stock/batches/{id} — Получить партию */
  stockGetBatch: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockBatch;
  };
  /** GET /api/v1/stock/company-policies/{companyId} — Получить складскую политику юрлица */
  stockGetCompanyPolicy: {
    params: { "companyId": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockCompanyPolicy;
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
  /** GET /api/v1/stock/documents/{id}/fulfillment — Получить остаток исполнения заявки или заказа */
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
    query: { "company_id"?: models.UUID; "limit"?: number; "q"?: string; "warehouse_id"?: models.UUID };
    body: never;
    response: models.StockReportPurchasingPage;
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
    query: { "as_of"?: string; "company_id"?: models.UUID; "limit"?: number; "warehouse_id"?: models.UUID };
    body: never;
    response: models.StockReportReservationPage;
  };
  /** GET /api/v1/stock/settings — Получить настройки склада кабинета */
  stockGetSettings: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.StockSettings;
  };
  /** GET /api/v1/stock/report/stocks/{productId} — Раскрыть остаток номенклатуры до движений регистра */
  stockGetStockDrilldown: {
    params: { "productId": models.UUID };
    query: { "as_of"?: string; "below_minimum"?: boolean; "company_id"?: models.UUID; "direction"?: "asc" | "desc"; "limit"?: number; "mode"?: "products" | "warehouses" | "companies"; "offset"?: number; "sort"?: "name" | "on_hand" | "reserved" | "available" | "expected" | "forecast" | "minimum" | "suggested" | "unit_cost" | "amount"; "warehouse_id"?: models.UUID; "with_reserve"?: boolean };
    body: never;
    response: models.StockReportDrilldown;
  };
  /** GET /api/v1/stock/report/stocks — Получить отчёт по остаткам */
  stockGetStocksReport: {
    params: Record<string, never>;
    query: { "as_of"?: string; "below_minimum"?: boolean; "company_id"?: models.UUID; "direction"?: "asc" | "desc"; "limit"?: number; "mode"?: "products" | "warehouses" | "companies"; "offset"?: number; "product_id"?: models.UUID; "q"?: string; "sort"?: "name" | "on_hand" | "reserved" | "available" | "expected" | "forecast" | "minimum" | "suggested" | "unit_cost" | "amount"; "warehouse_id"?: models.UUID; "with_reserve"?: boolean };
    body: never;
    response: models.StockReportPage;
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
  /** GET /api/v1/stock/warehouses/{id}/blockers — Проверить, можно ли вывести склад из работы */
  stockGetWarehouseBlockers: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.StockWarehouseBlockerCheck;
  };
  /** POST /api/v1/stock/imports/{id}/inspect — Осмотреть лист и строку заголовков без сохранения */
  stockInspectImport: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.StockImportInspectRequest;
    response: models.StockImportRun;
  };
  /** GET /api/v1/stock/batches — Получить список партий */
  stockListBatches: {
    params: Record<string, never>;
    query: { "company_id"?: models.UUID; "direction"?: "asc" | "desc"; "expiry"?: "expired" | "soon" | "all"; "limit"?: number; "offset"?: number; "product_id"?: models.UUID; "q"?: string; "sort"?: "received_at" | "expires_at" | "product" | "company" | "quantity" | "amount" };
    body: never;
    response: models.StockBatchPage;
  };
  /** GET /api/v1/stock/companies — Получить юрлица кабинета, доступные сотруднику */
  stockListCompanies: {
    params: Record<string, never>;
    query: Record<string, never>;
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
  /** GET /api/v1/stock/documents/fulfillments — Получить остатки исполнения по пакету заявок и заказов */
  stockListDocumentFulfillments: {
    params: Record<string, never>;
    query: { "ids": string };
    body: never;
    response: models.StockDocumentFulfillmentPage;
  };
  /** GET /api/v1/stock/documents — Получить журнал складских документов */
  stockListDocuments: {
    params: Record<string, never>;
    query: { "company_id"?: models.UUID; "contact_id"?: models.UUID; "date_from"?: string; "date_to"?: string; "direction"?: "asc" | "desc"; "limit"?: number; "offset"?: number; "q"?: string; "sort"?: "date" | "number" | "status" | "company" | "warehouse" | "contact" | "updated_at"; "status"?: models.CoreDocumentStatus; "type"?: models.StockDocumentTypeKey; "warehouse_id"?: models.UUID };
    body: never;
    response: models.StockDocumentPage;
  };
  /** GET /api/v1/stock/handling-units — Получить список физических складских единиц */
  stockListHandlingUnits: {
    params: Record<string, never>;
    query: { "batch_id"?: models.UUID; "company_id"?: models.UUID; "limit"?: number; "offset"?: number; "product_id"?: models.UUID; "q"?: string; "status"?: models.StockHandlingUnitState; "warehouse_id"?: models.UUID };
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
    query: { "company_id"?: models.UUID; "direction"?: "asc" | "desc"; "limit"?: number; "offset"?: number; "product_id"?: models.UUID; "q"?: string; "sort"?: "company" | "product" | "warehouse" | "min_qty" | "updated_at"; "status"?: "active" | "inactive"; "warehouse_id"?: models.UUID };
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
  /** GET /api/v1/stock/products/scan — Определить товар и единицу ввода по штрихкоду */
  stockScanProduct: {
    params: Record<string, never>;
    query: { "code": string };
    body: never;
    response: models.StockScanResult;
  };
  /** GET /api/v1/stock/handling-units/suggestions — Подобрать физические единицы под требуемое количество */
  stockSuggestHandlingUnits: {
    params: Record<string, never>;
    query: { "company_id": models.UUID; "product_id": models.UUID; "qty": string; "warehouse_id": models.UUID };
    body: never;
    response: models.StockHandlingUnitSuggestionResult;
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
  /** POST /api/v1/tasks/projects/{id}/members — Добавить участника в группу проектов задач */
  tasksAddProjectMember: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.MemberAssignment;
    response: models.SectionMember;
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
  /** POST /api/v1/tasks/tasks/{id}/tags — Прикрепить к задаче существующую или новую метку */
  tasksAttachTaskTag: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.TagAttach;
    response: models.Tag;
  };
  /** POST /api/v1/tasks/tasks/{id}/agent-journal — Записать результат работы агента */
  tasksCreateAgentJournalEntry: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.CommentCreate;
    response: models.Comment;
  };
  /** GET /api/v1/tasks/attachments/{id}/download-session — Получить короткоживущую ссылку скачивания */
  tasksCreateAttachmentDownloadSession: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.AttachmentDownloadSession;
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
  /** POST /api/v1/tasks/sections — Создать проект задач */
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
  /** GET /api/v1/tasks/discussion-comments/{id} — Получить комментарий обсуждения */
  tasksGetDiscussionComment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.DiscussionComment;
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
  /** GET /api/v1/tasks/pull-requests/{id} — Получить связь с pull request */
  tasksGetPullRequest: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.PullRequest;
  };
  /** GET /api/v1/tasks/scrum/settings/{project} — Получить Scrum-настройки группы проектов задач */
  tasksGetScrumSettings: {
    params: { "project": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.ScrumSettings;
  };
  /** GET /api/v1/tasks/snapshot — Получить стартовый снимок задачника */
  tasksGetSnapshot: {
    params: Record<string, never>;
    query: { "limit"?: number; "project"?: string; "q"?: string; "section"?: string; "status"?: string };
    body: never;
    response: models.TasksSnapshot;
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
  /** GET /api/v1/tasks/tasks/{id}/agent-journal — Получить журнал работы агентов по задаче */
  tasksListAgentJournal: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.CommentList;
  };
  /** GET /api/v1/tasks/comments/{id}/attachments — Получить вложения комментария */
  tasksListCommentAttachments: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.AttachmentPage;
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
  /** GET /api/v1/tasks/documents/{id}/attachments — Получить файлы документа */
  tasksListDocumentAttachments: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.AttachmentPage;
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
  /** GET /api/v1/tasks/hub/meetings/{id}/attachments — Получить файлы встречи */
  tasksListMeetingAttachments: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.AttachmentPage;
  };
  /** GET /api/v1/tasks/hub/meetings — Получить встречи Project Hub */
  tasksListMeetings: {
    params: Record<string, never>;
    query: { "client"?: boolean; "from"?: string; "kind"?: models.MeetingKind; "project": string; "q"?: string; "status"?: models.MeetingStatus; "to"?: string };
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
  /** GET /api/v1/tasks/projects/{id}/attachments — Получить файлы группы проектов задач */
  tasksListProjectAttachments: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.AttachmentPage;
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
    query: Record<string, never>;
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
  /** GET /api/v1/tasks/scrum/settings — Получить настройки Scrum всех групп проектов задач */
  tasksListScrumSettings: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: never;
    response: models.ScrumSettingsPage;
  };
  /** GET /api/v1/tasks/sections/{id}/attachments — Получить вложения проекта задач */
  tasksListSectionAttachments: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.AttachmentPage;
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
    query: Record<string, never>;
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
    query: { "compact"?: boolean; "limit"?: number; "offset"?: number; "priority"?: models.TaskPriority; "project"?: string; "q"?: string; "scope"?: "mine"; "section"?: string; "status"?: string };
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
  /** PATCH /api/v1/tasks/projects/{id}/attachments/{attachmentID} — Переместить файл в папку проекта или в корень */
  tasksMoveProjectAttachment: {
    params: { "attachmentID": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: models.AttachmentMove;
    response: void;
  };
  /** POST /api/v1/tasks/tasks/{id}/move — Переместить задачу в другой workflow-статус */
  tasksMoveTask: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.TaskMove;
    response: models.Task;
  };
  /** PATCH /api/v1/tasks/projects/{id}/file-folders/{folderID} — Переименовать папку файлов проекта */
  tasksRenameProjectFileFolder: {
    params: { "folderID": models.UUID; "id": models.UUID };
    query: Record<string, never>;
    body: models.ProjectFileFolderRename;
    response: models.ProjectFileFolder;
  };
  /** PATCH /api/v1/tasks/statuses/reorder — Изменить порядок workflow-статусов */
  tasksReorderStatuses: {
    params: Record<string, never>;
    query: Record<string, never>;
    body: models.StatusReorder;
    response: models.OK;
  };
  /** POST /api/v1/tasks/attachments/{id}/replace — Заменить файл через сервер до 25 МБ */
  tasksReplaceAttachment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.Attachment;
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
  /** PATCH /api/v1/tasks/scrum/settings/{project} — Изменить Scrum-ритм, разделы и команду */
  tasksUpdateScrumSettings: {
    params: { "project": models.UUID };
    query: Record<string, never>;
    body: models.ScrumSettingsUpdate;
    response: models.ScrumSettings;
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
  /** PATCH /api/v1/tasks/templates/{id} — Изменить шаблон регулярной задачи */
  tasksUpdateTemplate: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: models.TaskTemplateUpdate;
    response: models.TaskTemplate;
  };
  /** POST /api/v1/tasks/comments/{id}/attachments — Загрузить вложение комментария до 25 МБ */
  tasksUploadCommentAttachment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.Attachment;
  };
  /** POST /api/v1/tasks/documents/{id}/attachments — Загрузить файл документа до 25 МБ */
  tasksUploadDocumentAttachment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.Attachment;
  };
  /** POST /api/v1/tasks/hub/meetings/{id}/attachments — Загрузить файл встречи до 25 МБ */
  tasksUploadMeetingAttachment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.Attachment;
  };
  /** POST /api/v1/tasks/projects/{id}/attachments — Загрузить файл группы проектов до 25 МБ */
  tasksUploadProjectAttachment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.Attachment;
  };
  /** POST /api/v1/tasks/sections/{id}/attachments — Загрузить вложение проекта задач до 25 МБ */
  tasksUploadSectionAttachment: {
    params: { "id": models.UUID };
    query: Record<string, never>;
    body: never;
    response: models.Attachment;
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
  appFinanceSuggestTransactionClassification: { method: "POST", path: "/api/v1/app/finance/transactions/{id}/classification-suggestions", module: "finance", stage: "preview", permission: "finance:suggest", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appRuntimeConfig: { method: "GET", path: "/api/v1/app/config", module: "platform", stage: "preview", permission: "app:self", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appRuntimeInstallation: { method: "GET", path: "/api/v1/app/installation", module: "platform", stage: "preview", permission: "app:self", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appRuntimeLeaseSecret: { method: "POST", path: "/api/v1/app/config/{key}/lease", module: "platform", stage: "preview", permission: "app:secrets", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  appRuntimeRedeemSlotLaunch: { method: "POST", path: "/api/v1/app/slot-launch", module: "platform", stage: "preview", permission: "app:launch", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarBookPublicSlot: { method: "POST", path: "/api/v1/calendar/public/{slug}/book", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarCompleteGoogleOAuth: { method: "POST", path: "/api/v1/calendar/connectors/google/oauth/complete", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarCompleteOffice365OAuth: { method: "POST", path: "/api/v1/calendar/connectors/office365/oauth/complete", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarCreateAvailability: { method: "POST", path: "/api/v1/calendar/availability", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarCreateBookingLink: { method: "POST", path: "/api/v1/calendar/booking-links", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarCreateConnector: { method: "POST", path: "/api/v1/calendar/connectors", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarCreateEvent: { method: "POST", path: "/api/v1/calendar/events", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarDeleteAvailability: { method: "DELETE", path: "/api/v1/calendar/availability/{id}", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarDeleteBookingLink: { method: "DELETE", path: "/api/v1/calendar/booking-links/{id}", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarDeleteConnector: { method: "DELETE", path: "/api/v1/calendar/connectors/{id}", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarDeleteEvent: { method: "DELETE", path: "/api/v1/calendar/events/{id}", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarGetBookingLinkSlots: { method: "GET", path: "/api/v1/calendar/booking-links/{id}/slots", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarGetBusy: { method: "GET", path: "/api/v1/calendar/busy", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarGetEvent: { method: "GET", path: "/api/v1/calendar/events/{id}", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarGetPublicBookingLink: { method: "GET", path: "/api/v1/calendar/public/{slug}", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarGetPublicBookingSlots: { method: "GET", path: "/api/v1/calendar/public/{slug}/slots", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarGetPushConfig: { method: "GET", path: "/api/v1/calendar/push/config", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarGetSettings: { method: "GET", path: "/api/v1/calendar/settings", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarListAvailability: { method: "GET", path: "/api/v1/calendar/availability", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarListBookingLinks: { method: "GET", path: "/api/v1/calendar/booking-links", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarListConnectors: { method: "GET", path: "/api/v1/calendar/connectors", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarListEvents: { method: "GET", path: "/api/v1/calendar/events", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarListInvitations: { method: "GET", path: "/api/v1/calendar/invitations", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarListMembers: { method: "GET", path: "/api/v1/calendar/members", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 200 },
  calendarPutSettings: { method: "PUT", path: "/api/v1/calendar/settings", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarRespondToEvent: { method: "POST", path: "/api/v1/calendar/events/{id}/response", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarStartGoogleOAuth: { method: "GET", path: "/api/v1/calendar/connectors/google/oauth/start", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarStartOffice365OAuth: { method: "GET", path: "/api/v1/calendar/connectors/office365/oauth/start", module: "calendar", stage: "preview", permission: "calendar:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarSubscribePush: { method: "POST", path: "/api/v1/calendar/push/subscriptions", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarSyncConnector: { method: "POST", path: "/api/v1/calendar/connectors/{id}/sync", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarUnsubscribePush: { method: "DELETE", path: "/api/v1/calendar/push/subscriptions", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarUpdateAvailability: { method: "PATCH", path: "/api/v1/calendar/availability/{id}", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarUpdateBookingLink: { method: "PATCH", path: "/api/v1/calendar/booking-links/{id}", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarUpdateConnector: { method: "PATCH", path: "/api/v1/calendar/connectors/{id}", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  calendarUpdateEvent: { method: "PATCH", path: "/api/v1/calendar/events/{id}", module: "calendar", stage: "preview", permission: "calendar:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatChangeNotificationMode: { method: "PATCH", path: "/api/v1/chat/conversations/{id}/notification-mode", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatClearManualUnread: { method: "DELETE", path: "/api/v1/chat/conversations/{id}/manual-unread", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatCreateFolder: { method: "POST", path: "/api/v1/chat/folders", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatCreateGroup: { method: "POST", path: "/api/v1/chat/conversations", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatDeleteFolder: { method: "DELETE", path: "/api/v1/chat/folders/{id}", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatDeleteMessage: { method: "DELETE", path: "/api/v1/chat/conversations/{id}/messages/{messageId}", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatDisableMobileDevice: { method: "DELETE", path: "/api/v1/chat/mobile/devices/{deviceId}", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatDownloadAttachment: { method: "GET", path: "/api/v1/chat/conversations/{id}/attachments/{attachmentId}/content", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatDownloadConversationAvatar: { method: "GET", path: "/api/v1/chat/conversations/{id}/avatar/content", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatEditMessage: { method: "PATCH", path: "/api/v1/chat/conversations/{id}/messages/{messageId}", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatEnsureDirect: { method: "POST", path: "/api/v1/chat/conversations/direct", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatForwardMessage: { method: "POST", path: "/api/v1/chat/conversations/{id}/messages/{messageId}/forward", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatGetAttachment: { method: "GET", path: "/api/v1/chat/conversations/{id}/attachments/{attachmentId}", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatGetConversation: { method: "GET", path: "/api/v1/chat/conversations/{id}", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatListAttachments: { method: "GET", path: "/api/v1/chat/conversations/{id}/attachments", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, pagination: "limit", pageSizeMax: 100, pageSizeDefault: 50 },
  chatListConversationMembers: { method: "GET", path: "/api/v1/chat/conversations/{id}/members", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatListConversations: { method: "GET", path: "/api/v1/chat/conversations", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, pagination: "cursor", pageSizeMax: 100, pageSizeDefault: 50 },
  chatListFolders: { method: "GET", path: "/api/v1/chat/folders", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatListMentionCandidates: { method: "GET", path: "/api/v1/chat/conversations/{id}/mentions/candidates", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatListMessages: { method: "GET", path: "/api/v1/chat/conversations/{id}/messages", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, pagination: "limit", pageSizeMax: 100, pageSizeDefault: 50 },
  chatListPeople: { method: "GET", path: "/api/v1/chat/people", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatListPins: { method: "GET", path: "/api/v1/chat/conversations/{id}/pins", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatListUnreadMentions: { method: "GET", path: "/api/v1/chat/conversations/{id}/mentions/unread", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatMarkAllConversationsRead: { method: "POST", path: "/api/v1/chat/conversations/read-all", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatMarkDelivered: { method: "POST", path: "/api/v1/chat/conversations/{id}/delivered", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatMarkManualUnread: { method: "POST", path: "/api/v1/chat/conversations/{id}/manual-unread", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatMarkMentionRead: { method: "POST", path: "/api/v1/chat/conversations/{id}/mentions/{messageId}/read", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatMarkRead: { method: "POST", path: "/api/v1/chat/conversations/{id}/read", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatOpenMedia: { method: "GET", path: "/api/v1/chat/attachments/{attachmentId}/content", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatPinMessage: { method: "PUT", path: "/api/v1/chat/conversations/{id}/messages/{messageId}/pin", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatRegisterMobileDevice: { method: "POST", path: "/api/v1/chat/mobile/devices", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatRemoveReaction: { method: "DELETE", path: "/api/v1/chat/conversations/{id}/messages/{messageId}/reaction", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatSendMedia: { method: "POST", path: "/api/v1/chat/conversations/{id}/media", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatSendMessage: { method: "POST", path: "/api/v1/chat/conversations/{id}/messages", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatSendMobilePushTest: { method: "POST", path: "/api/v1/chat/mobile/devices/test", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatSetReaction: { method: "PUT", path: "/api/v1/chat/conversations/{id}/messages/{messageId}/reaction", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatStreamRealtime: { method: "GET", path: "/api/v1/chat/realtime/stream", module: "chat", stage: "preview", permission: "chat:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatUnpinMessage: { method: "DELETE", path: "/api/v1/chat/conversations/{id}/messages/{messageId}/pin", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatUpdateFolder: { method: "PATCH", path: "/api/v1/chat/folders/{id}", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatUploadAttachment: { method: "POST", path: "/api/v1/chat/conversations/{id}/attachments", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  chatUploadConversationAvatar: { method: "POST", path: "/api/v1/chat/conversations/{id}/avatar", module: "chat", stage: "preview", permission: "chat:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreApplyProductImport: { method: "POST", path: "/api/v1/core/product-imports/{id}/apply", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreArchiveContact: { method: "POST", path: "/api/v1/core/contacts/{id}/archive", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreArchiveEmployee: { method: "DELETE", path: "/api/v1/core/employees/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreArchiveProduct: { method: "POST", path: "/api/v1/core/products/{id}/archive", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreBulkUpdateContacts: { method: "POST", path: "/api/v1/core/contacts/bulk", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreBulkUpdateProducts: { method: "POST", path: "/api/v1/core/products/bulk", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCancelDocument: { method: "POST", path: "/api/v1/core/documents/{id}/cancel", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCloseAccountingPeriod: { method: "POST", path: "/api/v1/core/accounting-periods/close", module: "core", stage: "preview", permission: "core:period_close", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateBusiness: { method: "POST", path: "/api/v1/core/businesses", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateBusinessOwnership: { method: "POST", path: "/api/v1/core/businesses/{id}/ownership", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateContact: { method: "POST", path: "/api/v1/core/contacts", module: "core", stage: "preview", permission: "core:write", idempotent: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateCurrencyRate: { method: "POST", path: "/api/v1/core/currency-rates", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateDictionary: { method: "POST", path: "/api/v1/core/dictionaries", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateDictionaryItem: { method: "POST", path: "/api/v1/core/dictionaries/{id}/items", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateDocument: { method: "POST", path: "/api/v1/core/documents", module: "core", stage: "preview", permission: "core:write", idempotent: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateDocumentType: { method: "POST", path: "/api/v1/core/document-types", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateEmployee: { method: "POST", path: "/api/v1/core/employees", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateEmployeeEquipment: { method: "POST", path: "/api/v1/core/employee-equipment", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateEmployeeLifecycleTemplate: { method: "POST", path: "/api/v1/core/employee-lifecycle-templates", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateFolder: { method: "POST", path: "/api/v1/core/folders", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateGLAccount: { method: "POST", path: "/api/v1/core/gl-accounts", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateGLMapping: { method: "POST", path: "/api/v1/core/gl-mappings", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateGLOpeningImport: { method: "POST", path: "/api/v1/core/gl-opening-imports", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateItem: { method: "POST", path: "/api/v1/core/items", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateProduct: { method: "POST", path: "/api/v1/core/products", module: "core", stage: "preview", permission: "core:write", idempotent: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateProductExport: { method: "POST", path: "/api/v1/core/product-exports", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateProductIdentifier: { method: "POST", path: "/api/v1/core/products/{id}/identifiers", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateProductImport: { method: "POST", path: "/api/v1/core/product-imports", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateProductImportUploadSession: { method: "POST", path: "/api/v1/core/product-import-upload-sessions", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreCreateRegister: { method: "POST", path: "/api/v1/core/registers", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeactivateProductIdentifier: { method: "POST", path: "/api/v1/core/products/{id}/identifiers/{identifierId}/deactivate", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteDictionary: { method: "DELETE", path: "/api/v1/core/dictionaries/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteDictionaryItem: { method: "DELETE", path: "/api/v1/core/dictionaries/{id}/items/{itemId}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteDocumentType: { method: "DELETE", path: "/api/v1/core/document-types/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteEmployeePhoto: { method: "DELETE", path: "/api/v1/core/employees/{id}/photo", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteFolder: { method: "DELETE", path: "/api/v1/core/folders/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteGLAccount: { method: "DELETE", path: "/api/v1/core/gl-accounts/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteGLMapping: { method: "DELETE", path: "/api/v1/core/gl-mappings/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteItem: { method: "DELETE", path: "/api/v1/core/items/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteRegister: { method: "DELETE", path: "/api/v1/core/registers/{key}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreDeleteSelfEmployeePhoto: { method: "DELETE", path: "/api/v1/core/self/photo", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetAccountingPeriodState: { method: "GET", path: "/api/v1/core/accounting-periods", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetAccountingSettings: { method: "GET", path: "/api/v1/core/accounting-settings", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetBusiness: { method: "GET", path: "/api/v1/core/businesses/{id}", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetCabinetPreferences: { method: "GET", path: "/api/v1/core/cabinet-preferences", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetContact: { method: "GET", path: "/api/v1/core/contacts/{id}", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetContactUsage: { method: "GET", path: "/api/v1/core/contacts/{id}/usage", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetDictionary: { method: "GET", path: "/api/v1/core/dictionaries/{id}", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetDictionaryItemUsage: { method: "GET", path: "/api/v1/core/dictionaries/{id}/items/{itemId}/usage", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetDocument: { method: "GET", path: "/api/v1/core/documents/{id}", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetDocumentBlockers: { method: "GET", path: "/api/v1/core/documents/{id}/blockers", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetDocumentLinks: { method: "GET", path: "/api/v1/core/documents/{id}/links", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetDocumentType: { method: "GET", path: "/api/v1/core/document-types/{id}", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetEmployee: { method: "GET", path: "/api/v1/core/employees/{id}", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetEmployeePhotoContent: { method: "GET", path: "/api/v1/core/employees/{id}/photo/content", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetEmployeeUsage: { method: "GET", path: "/api/v1/core/employees/{id}/usage", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetExternalRef: { method: "GET", path: "/api/v1/core/external-refs/{id}", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetGLOpeningImport: { method: "GET", path: "/api/v1/core/gl-opening-imports/{id}", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetGLOpeningImportSource: { method: "GET", path: "/api/v1/core/gl-opening-imports/{id}/source", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProduct: { method: "GET", path: "/api/v1/core/products/{id}", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductCustomFieldSchema: { method: "GET", path: "/api/v1/core/products/custom-fields/schema", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductExport: { method: "GET", path: "/api/v1/core/product-exports/{id}", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductExportContent: { method: "GET", path: "/api/v1/core/product-exports/{id}/content", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductImport: { method: "GET", path: "/api/v1/core/product-imports/{id}", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductImportErrors: { method: "GET", path: "/api/v1/core/product-imports/{id}/errors", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductImportSource: { method: "GET", path: "/api/v1/core/product-imports/{id}/source", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductImportTemplate: { method: "GET", path: "/api/v1/core/product-import-templates/{kind}", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetProductUsage: { method: "GET", path: "/api/v1/core/products/{id}/usage", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetRegister: { method: "GET", path: "/api/v1/core/registers/{key}", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetRegisterBalance: { method: "GET", path: "/api/v1/core/registers/{key}/balance", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: 200 },
  coreGetRegisterTurnovers: { method: "GET", path: "/api/v1/core/registers/{key}/turnovers", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: 200 },
  coreGetSelfEmployeePhoto: { method: "GET", path: "/api/v1/core/self/photo", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetSelfPreferences: { method: "GET", path: "/api/v1/core/self/preferences", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetTrialBalance: { method: "GET", path: "/api/v1/core/ledger/trial-balance", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreGetUIState: { method: "GET", path: "/api/v1/core/ui-state", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreImportDictionaryItems: { method: "POST", path: "/api/v1/core/dictionaries/{id}/items/import", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreImportExternalContacts: { method: "POST", path: "/api/v1/core/external-refs/contacts/import", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreInspectProductImport: { method: "POST", path: "/api/v1/core/product-imports/{id}/inspect", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreLinkExternalRef: { method: "POST", path: "/api/v1/core/external-refs/{id}/link", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListAccountingDimensions: { method: "GET", path: "/api/v1/core/accounting-dimensions", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListBusinessOwnership: { method: "GET", path: "/api/v1/core/businesses/{id}/ownership", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListBusinesses: { method: "GET", path: "/api/v1/core/businesses", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListCashflowItems: { method: "GET", path: "/api/v1/core/cashflow-items", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListContacts: { method: "GET", path: "/api/v1/core/contacts", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 100 },
  coreListCurrencyRateSources: { method: "GET", path: "/api/v1/core/currency-rate-sources", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListCurrencyRates: { method: "GET", path: "/api/v1/core/currency-rates", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListDictionaries: { method: "GET", path: "/api/v1/core/dictionaries", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: 100 },
  coreListDictionaryItems: { method: "GET", path: "/api/v1/core/dictionaries/{id}/items", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 500 },
  coreListDirectories: { method: "GET", path: "/api/v1/core/directories", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListDocumentEntries: { method: "GET", path: "/api/v1/core/documents/{id}/entries", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 200 },
  coreListDocumentTypes: { method: "GET", path: "/api/v1/core/document-types", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListDocuments: { method: "GET", path: "/api/v1/core/documents", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 200 },
  coreListEmployeeEquipment: { method: "GET", path: "/api/v1/core/employee-equipment", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListEmployeeLifecycleTemplates: { method: "GET", path: "/api/v1/core/employee-lifecycle-templates", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListEmployees: { method: "GET", path: "/api/v1/core/employees", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 200 },
  coreListExternalRefs: { method: "GET", path: "/api/v1/core/external-refs", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 50 },
  coreListFolders: { method: "GET", path: "/api/v1/core/folders", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListGLAccounts: { method: "GET", path: "/api/v1/core/gl-accounts", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListGLMappings: { method: "GET", path: "/api/v1/core/gl-mappings", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListGLOpeningImports: { method: "GET", path: "/api/v1/core/gl-opening-imports", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "limit", pageSizeMax: 100, pageSizeDefault: 20 },
  coreListItems: { method: "GET", path: "/api/v1/core/items", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListPnlItems: { method: "GET", path: "/api/v1/core/pnl-items", module: "core", stage: "preview", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListProductIdentifiers: { method: "GET", path: "/api/v1/core/products/{id}/identifiers", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListProductVariants: { method: "GET", path: "/api/v1/core/products/{id}/variants", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreListProducts: { method: "GET", path: "/api/v1/core/products", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 100 },
  coreListRegisterEntries: { method: "GET", path: "/api/v1/core/registers/{key}/entries", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 200 },
  coreListRegisters: { method: "GET", path: "/api/v1/core/registers", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 200 },
  coreMarkDocumentDeleted: { method: "POST", path: "/api/v1/core/documents/{id}/mark-deleted", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreMarkGLOpeningImportApplied: { method: "POST", path: "/api/v1/core/gl-opening-imports/{id}/applied", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreMatchExternalContacts: { method: "POST", path: "/api/v1/core/external-refs/contacts/match", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreMoveItem: { method: "POST", path: "/api/v1/core/items/{id}/move", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  corePostDocument: { method: "POST", path: "/api/v1/core/documents/{id}/post", module: "core", stage: "preview", permission: "core:write", idempotent: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  corePreviewProductImport: { method: "POST", path: "/api/v1/core/product-imports/{id}/preview", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReferenceCatalog: { method: "GET", path: "/api/v1/reference/catalog", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReferenceItems: { method: "GET", path: "/api/v1/reference/{key}/items", module: "core", stage: "public", permission: "core:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReferenceResolve: { method: "POST", path: "/api/v1/reference/resolve", module: "core", stage: "public", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreRefreshCurrencyRates: { method: "POST", path: "/api/v1/core/currency-rates/refresh", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreRememberExternalRefs: { method: "POST", path: "/api/v1/core/external-refs", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreReopenAccountingPeriod: { method: "POST", path: "/api/v1/core/accounting-periods/reopen", module: "core", stage: "preview", permission: "core:period_reopen", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreResolveExternalRefs: { method: "POST", path: "/api/v1/core/external-refs/resolve", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreRestoreContact: { method: "POST", path: "/api/v1/core/contacts/{id}/restore", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreRestoreProduct: { method: "POST", path: "/api/v1/core/products/{id}/restore", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSaveUIState: { method: "PUT", path: "/api/v1/core/ui-state/{screen}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreSetBusinessActive: { method: "POST", path: "/api/v1/core/businesses/{id}/activation", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUnlinkExternalRef: { method: "POST", path: "/api/v1/core/external-refs/{id}/unlink", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateAccountingDimension: { method: "PATCH", path: "/api/v1/core/accounting-dimensions/{key}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateAccountingSettings: { method: "PATCH", path: "/api/v1/core/accounting-settings", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateBusiness: { method: "PATCH", path: "/api/v1/core/businesses/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateCabinetPreferences: { method: "PATCH", path: "/api/v1/core/cabinet-preferences", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateContact: { method: "PATCH", path: "/api/v1/core/contacts/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateDictionary: { method: "PATCH", path: "/api/v1/core/dictionaries/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateDictionaryItem: { method: "PATCH", path: "/api/v1/core/dictionaries/{id}/items/{itemId}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateDocument: { method: "PATCH", path: "/api/v1/core/documents/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateDocumentType: { method: "PATCH", path: "/api/v1/core/document-types/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateEmployee: { method: "PATCH", path: "/api/v1/core/employees/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateEmployeeEquipment: { method: "PATCH", path: "/api/v1/core/employee-equipment/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateEmployeeLifecycleTemplate: { method: "PATCH", path: "/api/v1/core/employee-lifecycle-templates/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateFolder: { method: "PATCH", path: "/api/v1/core/folders/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateGLAccount: { method: "PATCH", path: "/api/v1/core/gl-accounts/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateItem: { method: "PATCH", path: "/api/v1/core/items/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateProduct: { method: "PATCH", path: "/api/v1/core/products/{id}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateProductCustom: { method: "PATCH", path: "/api/v1/core/products/{id}/custom", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateProductIdentifier: { method: "PATCH", path: "/api/v1/core/products/{id}/identifiers/{identifierId}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateProductImportMapping: { method: "PATCH", path: "/api/v1/core/product-imports/{id}/mapping", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUpdateRegister: { method: "PATCH", path: "/api/v1/core/registers/{key}", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUploadEmployeePhoto: { method: "POST", path: "/api/v1/core/employees/{id}/photo", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUploadProductImportContent: { method: "PUT", path: "/api/v1/core/product-import-upload-sessions/{id}/content", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  coreUploadSelfEmployeePhoto: { method: "POST", path: "/api/v1/core/self/photo", module: "core", stage: "preview", permission: "core:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmAddNote: { method: "POST", path: "/api/v1/crm/{entity}/{id}/notes", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmArchivePipeline: { method: "POST", path: "/api/v1/crm/pipelines/{id}/archive", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmAssignInboxConversation: { method: "PATCH", path: "/api/v1/crm/inbox/conversations/{id}/assign", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCheckInboxConnection: { method: "POST", path: "/api/v1/crm/inbox/connections/{id}/check", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmConvertLead: { method: "POST", path: "/api/v1/crm/leads/{id}/convert", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateAutomationRule: { method: "POST", path: "/api/v1/crm/automation/rules", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateCustomer: { method: "POST", path: "/api/v1/crm/customers", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateDeal: { method: "POST", path: "/api/v1/crm/deals", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateDealFromConversation: { method: "POST", path: "/api/v1/crm/inbox/conversations/{id}/deals", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateEngagement: { method: "POST", path: "/api/v1/crm/{entity}/{id}/engagements", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateEventLink: { method: "POST", path: "/api/v1/crm/{entity}/{id}/events", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateHubMeetingLink: { method: "POST", path: "/api/v1/crm/{entity}/{id}/hub-meetings", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateInboxConnection: { method: "POST", path: "/api/v1/crm/inbox/connections", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateLead: { method: "POST", path: "/api/v1/crm/leads", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateLeadFromConversation: { method: "POST", path: "/api/v1/crm/inbox/conversations/{id}/leads", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateLossReason: { method: "POST", path: "/api/v1/crm/loss-reasons", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreatePipeline: { method: "POST", path: "/api/v1/crm/pipelines", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateStage: { method: "POST", path: "/api/v1/crm/pipelines/{id}/stages", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmCreateTaskLink: { method: "POST", path: "/api/v1/crm/{entity}/{id}/tasks", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmDisableInboxConnection: { method: "POST", path: "/api/v1/crm/inbox/connections/{id}/disable", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmEnableInboxConnection: { method: "POST", path: "/api/v1/crm/inbox/connections/{id}/enable", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmFindCustomerDuplicates: { method: "GET", path: "/api/v1/crm/customers/duplicates", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetAnalytics: { method: "GET", path: "/api/v1/crm/analytics", module: "crm", stage: "preview", permission: "crm:team_read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetAutomationRule: { method: "GET", path: "/api/v1/crm/automation/rules/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetAutomationRunActions: { method: "GET", path: "/api/v1/crm/automation/runs/{id}/actions", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetCustomer: { method: "GET", path: "/api/v1/crm/customers/{id}", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetDeal: { method: "GET", path: "/api/v1/crm/deals/{id}", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetDealBoard: { method: "GET", path: "/api/v1/crm/deals/board", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "limit", pageSizeMax: 100, pageSizeDefault: 50 },
  crmGetDealStageHistory: { method: "GET", path: "/api/v1/crm/deals/{id}/stage-history", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetDirectoryContact: { method: "GET", path: "/api/v1/crm/contacts/{id}", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetInboxAttachmentContent: { method: "GET", path: "/api/v1/crm/inbox/attachments/{id}/content", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetInboxConversation: { method: "GET", path: "/api/v1/crm/inbox/conversations/{id}", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetLead: { method: "GET", path: "/api/v1/crm/leads/{id}", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetLeadHistory: { method: "GET", path: "/api/v1/crm/leads/{id}/history", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetOverview: { method: "GET", path: "/api/v1/crm/overview", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetPipeline: { method: "GET", path: "/api/v1/crm/pipelines/{id}", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmGetTimeline: { method: "GET", path: "/api/v1/crm/{entity}/{id}/timeline", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmLeadDuplicates: { method: "GET", path: "/api/v1/crm/leads/{id}/duplicates", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmLinkEntityConversation: { method: "POST", path: "/api/v1/crm/inbox/entities/{entity}/{id}/conversations", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListAutomationRules: { method: "GET", path: "/api/v1/crm/automation/rules", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListAutomationRuns: { method: "GET", path: "/api/v1/crm/automation/runs", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListCustomers: { method: "GET", path: "/api/v1/crm/customers", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 50 },
  crmListDealActivities: { method: "GET", path: "/api/v1/crm/deals/{id}/activities", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListDealContacts: { method: "GET", path: "/api/v1/crm/deals/{id}/contacts", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListDealItems: { method: "GET", path: "/api/v1/crm/deals/{id}/items", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListDeals: { method: "GET", path: "/api/v1/crm/deals", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 50 },
  crmListDirectoryContacts: { method: "GET", path: "/api/v1/crm/contacts", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListEngagements: { method: "GET", path: "/api/v1/crm/{entity}/{id}/engagements", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListEntityConversations: { method: "GET", path: "/api/v1/crm/inbox/entities/{entity}/{id}/conversations", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListEntityMessages: { method: "GET", path: "/api/v1/crm/inbox/entities/{entity}/{id}/messages", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "limit", pageSizeMax: 200, pageSizeDefault: 100 },
  crmListExternalLinks: { method: "GET", path: "/api/v1/crm/{entity}/{id}/links", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListInboxConnections: { method: "GET", path: "/api/v1/crm/inbox/connections", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListInboxConversationLinks: { method: "GET", path: "/api/v1/crm/inbox/conversations/{id}/links", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListInboxConversations: { method: "GET", path: "/api/v1/crm/inbox/conversations", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 50 },
  crmListInboxMessageAttachments: { method: "GET", path: "/api/v1/crm/inbox/messages/{id}/attachments", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListInboxMessages: { method: "GET", path: "/api/v1/crm/inbox/conversations/{id}/messages", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 50 },
  crmListInboxProviders: { method: "GET", path: "/api/v1/crm/inbox/providers", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListInboxTemplates: { method: "GET", path: "/api/v1/crm/inbox/templates", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListLeadActivities: { method: "GET", path: "/api/v1/crm/leads/{id}/activities", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListLeads: { method: "GET", path: "/api/v1/crm/leads", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 50 },
  crmListLossReasons: { method: "GET", path: "/api/v1/crm/loss-reasons", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListMembers: { method: "GET", path: "/api/v1/crm/members", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmListPipelineDeals: { method: "GET", path: "/api/v1/crm/pipelines/{id}/deals", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 50 },
  crmListPipelines: { method: "GET", path: "/api/v1/crm/pipelines", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmMarkInboxConversationRead: { method: "POST", path: "/api/v1/crm/inbox/conversations/{id}/read", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmMergeLeads: { method: "POST", path: "/api/v1/crm/leads/{id}/merge", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmMoveDeal: { method: "POST", path: "/api/v1/crm/deals/{id}/move", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmPromoteCustomer: { method: "POST", path: "/api/v1/crm/customers/{id}/promote", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmQualifyLead: { method: "POST", path: "/api/v1/crm/leads/{id}/qualify", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmReopenDeal: { method: "POST", path: "/api/v1/crm/deals/{id}/reopen", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmReorderPipelines: { method: "PATCH", path: "/api/v1/crm/pipelines/reorder", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmReorderStages: { method: "PATCH", path: "/api/v1/crm/pipelines/{id}/stages/reorder", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmReplaceDealContacts: { method: "PUT", path: "/api/v1/crm/deals/{id}/contacts", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmReplaceDealItems: { method: "PUT", path: "/api/v1/crm/deals/{id}/items", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmRetryAutomationRun: { method: "POST", path: "/api/v1/crm/automation/runs/{id}/retry", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmSalesPlans: { method: "GET", path: "/api/v1/crm/sales-plans", module: "crm", stage: "preview", permission: "crm:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmSaveInboxTemplate: { method: "POST", path: "/api/v1/crm/inbox/templates", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmSaveSalesPlans: { method: "PUT", path: "/api/v1/crm/sales-plans", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmSendInboxMessage: { method: "POST", path: "/api/v1/crm/inbox/conversations/{id}/messages", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateAutomationRule: { method: "PUT", path: "/api/v1/crm/automation/rules/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateCustomer: { method: "PATCH", path: "/api/v1/crm/customers/{id}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateDeal: { method: "PATCH", path: "/api/v1/crm/deals/{id}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateEngagement: { method: "PATCH", path: "/api/v1/crm/engagements/{id}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateInboxConnection: { method: "PATCH", path: "/api/v1/crm/inbox/connections/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateLead: { method: "PATCH", path: "/api/v1/crm/leads/{id}", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdatePipeline: { method: "PATCH", path: "/api/v1/crm/pipelines/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUpdateStage: { method: "PATCH", path: "/api/v1/crm/stages/{id}", module: "crm", stage: "preview", permission: "crm:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUploadInboxMessageAttachment: { method: "POST", path: "/api/v1/crm/inbox/messages/{id}/attachments", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  crmUploadInboxOutboundFile: { method: "POST", path: "/api/v1/crm/inbox/conversations/{id}/uploads", module: "crm", stage: "preview", permission: "crm:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerAppBlocks: { method: "GET", path: "/api/v1/developer/app-blocks", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, pagination: "limit", pageSizeMax: 500, pageSizeDefault: null },
  developerCloseSession: { method: "DELETE", path: "/api/v1/developer/sessions/current", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerOpenSession: { method: "POST", path: "/api/v1/developer/sessions", module: "developer", stage: "preview", permission: "developer:anonymous", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerProfile: { method: "GET", path: "/api/v1/developer/profile", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerPublisherApplication: { method: "GET", path: "/api/v1/developer/publisher-application", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerRegister: { method: "POST", path: "/api/v1/developer/registrations", module: "developer", stage: "preview", permission: "developer:anonymous", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerRequestSignInLink: { method: "POST", path: "/api/v1/developer/sign-in-links", module: "developer", stage: "preview", permission: "developer:anonymous", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  developerSubmitPublisherApplication: { method: "POST", path: "/api/v1/developer/publisher-application", module: "developer", stage: "preview", permission: "developer:self", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeAdoptConnectorAccount: { method: "POST", path: "/api/v1/finance/connectors/accounts/{accountId}/adopt", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeApplyExchangeItem: { method: "POST", path: "/api/v1/finance/exchange/items/{id}/apply", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeApplyImport: { method: "POST", path: "/api/v1/finance/imports/{id}/apply", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeApproveDividendDecision: { method: "POST", path: "/api/v1/finance/dividends/decisions/{id}/approve", module: "finance", stage: "preview", permission: "finance.dividends:approve", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeApproveDividendPolicy: { method: "POST", path: "/api/v1/finance/dividends/policies/{id}/approve", module: "finance", stage: "preview", permission: "finance.dividends:approve", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCancelPaymentPlan: { method: "POST", path: "/api/v1/finance/payment-calendar/plans/{id}/cancel", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCancelPayrollDocument: { method: "POST", path: "/api/v1/finance/payroll/documents/{id}/cancel", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCancelSettlementDocument: { method: "POST", path: "/api/v1/finance/settlements/documents/{id}/cancel", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCashflowEntries: { method: "GET", path: "/api/v1/finance/reports/cashflow/entries", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCategorizeCashOperation: { method: "POST", path: "/api/v1/finance/cash-operations/{id}/categorize", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCategorizeTransaction: { method: "POST", path: "/api/v1/finance/transactions/{id}/categorize", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCheckConnectorStatement: { method: "POST", path: "/api/v1/finance/connectors/{id}/accounts/{accountId}/check-statement", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeClassificationSuggestions: { method: "GET", path: "/api/v1/finance/classification-suggestions", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: 50 },
  financeConfigureConnectorMTLS: { method: "PUT", path: "/api/v1/finance/connectors/{id}/mtls", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateAccount: { method: "POST", path: "/api/v1/finance/accounts", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateConnector: { method: "POST", path: "/api/v1/finance/connectors", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateCounterpartyTerms: { method: "POST", path: "/api/v1/finance/counterparties/{contactId}/terms", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateDividendDecision: { method: "POST", path: "/api/v1/finance/dividends/decisions", module: "finance", stage: "preview", permission: "finance.dividends:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateDividendPolicy: { method: "POST", path: "/api/v1/finance/dividends/policies", module: "finance", stage: "preview", permission: "finance.dividends:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreatePaymentPlan: { method: "POST", path: "/api/v1/finance/payment-calendar/plans", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreatePayrollDocument: { method: "POST", path: "/api/v1/finance/payroll/documents", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreatePnlLayout: { method: "POST", path: "/api/v1/finance/pnl-layouts", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateSettlementDocument: { method: "POST", path: "/api/v1/finance/settlements/documents", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateStatement: { method: "POST", path: "/api/v1/finance/statements", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeCreateTransaction: { method: "POST", path: "/api/v1/finance/transactions", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeDeleteAccountStatement: { method: "DELETE", path: "/api/v1/finance/accounts/{id}/statements/{statementId}", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeDeletePnlLayout: { method: "DELETE", path: "/api/v1/finance/pnl-layouts/{id}", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeDeleteSettlementDocument: { method: "DELETE", path: "/api/v1/finance/settlements/documents/{id}", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeExecutePaymentPlan: { method: "POST", path: "/api/v1/finance/payment-calendar/plans/{id}/execute", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetAccount: { method: "GET", path: "/api/v1/finance/accounts/{id}", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetAccountReconciliation: { method: "GET", path: "/api/v1/finance/accounts/{id}/reconciliation", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetBalanceReport: { method: "GET", path: "/api/v1/finance/reports/balance", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetCashflowReport: { method: "GET", path: "/api/v1/finance/reports/cashflow", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetConnector: { method: "GET", path: "/api/v1/finance/connectors/{id}", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetConnectorSyncSettings: { method: "GET", path: "/api/v1/finance/connectors/sync-settings", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetCounterpartyTerms: { method: "GET", path: "/api/v1/finance/counterparties/{contactId}/terms", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetDividendSummary: { method: "GET", path: "/api/v1/finance/dividends/summary", module: "finance", stage: "preview", permission: "finance.dividends:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetImport: { method: "GET", path: "/api/v1/finance/imports/{id}", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetPaymentCalendar: { method: "GET", path: "/api/v1/finance/payment-calendar", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetPayrollJournal: { method: "GET", path: "/api/v1/finance/reports/payroll", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetPeriodCloseChecks: { method: "GET", path: "/api/v1/finance/period-checks", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetPnlLayout: { method: "GET", path: "/api/v1/finance/pnl-layouts/{id}", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetPnlReport: { method: "GET", path: "/api/v1/finance/reports/pnl", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetProjectBudgetHistory: { method: "GET", path: "/api/v1/finance/project-budgets", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetProjectEconomics: { method: "GET", path: "/api/v1/finance/reports/projects", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetReconciliation: { method: "GET", path: "/api/v1/finance/transactions/reconciliation", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetSettlementDocument: { method: "GET", path: "/api/v1/finance/settlements/documents/{id}", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetSettlementPosition: { method: "GET", path: "/api/v1/finance/settlements/position", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetTradeAdvance: { method: "GET", path: "/api/v1/finance/trade-journal/advance", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeGetTradeJournal: { method: "GET", path: "/api/v1/finance/trade-journal", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 500 },
  financeGetTransaction: { method: "GET", path: "/api/v1/finance/transactions/{id}", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeInspectImport: { method: "POST", path: "/api/v1/finance/imports/{id}/inspect", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeLinkStatementTransactions: { method: "POST", path: "/api/v1/finance/statements/{id}/transactions", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListAccountStatements: { method: "GET", path: "/api/v1/finance/accounts/{id}/statements", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListAccounts: { method: "GET", path: "/api/v1/finance/accounts", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListConnectorAccounts: { method: "GET", path: "/api/v1/finance/connectors/{id}/accounts", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListConnectorProviders: { method: "GET", path: "/api/v1/finance/connectors/providers", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListConnectorRuns: { method: "GET", path: "/api/v1/finance/connectors/{id}/runs", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "limit", pageSizeMax: 100, pageSizeDefault: 20 },
  financeListConnectors: { method: "GET", path: "/api/v1/finance/connectors", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListDividendAccessUsers: { method: "GET", path: "/api/v1/finance/dividends/access-users", module: "finance", stage: "preview", permission: "finance.dividends:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListDividendAutomationRuns: { method: "GET", path: "/api/v1/finance/dividends/automation/runs", module: "finance", stage: "preview", permission: "finance.dividends:read", idempotent: false, pagination: "limit", pageSizeMax: 200, pageSizeDefault: 100 },
  financeListDividendDecisions: { method: "GET", path: "/api/v1/finance/dividends/decisions", module: "finance", stage: "preview", permission: "finance.dividends:write", idempotent: false, pagination: "limit", pageSizeMax: 200, pageSizeDefault: 100 },
  financeListDividendOwners: { method: "GET", path: "/api/v1/finance/dividends/owners", module: "finance", stage: "preview", permission: "finance.dividends:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListDividendPolicies: { method: "GET", path: "/api/v1/finance/dividends/policies", module: "finance", stage: "preview", permission: "finance.dividends:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListExchangeJournal: { method: "GET", path: "/api/v1/finance/exchange/journal", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 200 },
  financeListPaymentFacts: { method: "GET", path: "/api/v1/finance/payment-calendar/operations", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListPnlLayoutItems: { method: "GET", path: "/api/v1/finance/pnl-layouts/items", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListPnlLayouts: { method: "GET", path: "/api/v1/finance/pnl-layouts", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListSettlementBalances: { method: "GET", path: "/api/v1/finance/settlements/balances", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListSettlementDocuments: { method: "GET", path: "/api/v1/finance/settlements/documents", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 200 },
  financeListSettlementPayments: { method: "GET", path: "/api/v1/finance/settlements/payments", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListSettlementSources: { method: "GET", path: "/api/v1/finance/settlements/sources", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeListStatements: { method: "GET", path: "/api/v1/finance/statements", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 100, pageSizeDefault: 100 },
  financeListTransactions: { method: "GET", path: "/api/v1/finance/transactions", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 500 },
  financeLookupCompany: { method: "GET", path: "/api/v1/finance/lookup/company", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeLookupRequisites: { method: "GET", path: "/api/v1/finance/lookup/requisites", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeMapImport: { method: "PATCH", path: "/api/v1/finance/imports/{id}/mapping", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeMapImportItems: { method: "PATCH", path: "/api/v1/finance/imports/{id}/item-mapping", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePayoutRegisters: { method: "GET", path: "/api/v1/finance/payroll/registers", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 100 },
  financePayrollDocuments: { method: "GET", path: "/api/v1/finance/payroll/documents", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 200 },
  financePayrollImportInspect: { method: "POST", path: "/api/v1/finance/payroll/import/inspect", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePayrollImportPreview: { method: "POST", path: "/api/v1/finance/payroll/import/preview", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePayrollPayoutSheet: { method: "POST", path: "/api/v1/finance/payroll/payout-sheet", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePnlEntries: { method: "GET", path: "/api/v1/finance/reports/pnl/entries", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePostDividendDecision: { method: "POST", path: "/api/v1/finance/dividends/decisions/{id}/post", module: "finance", stage: "preview", permission: "finance.dividends:approve", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePostPayrollDocument: { method: "POST", path: "/api/v1/finance/payroll/documents/{id}/post", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePostSettlementDocument: { method: "POST", path: "/api/v1/finance/settlements/documents/{id}/post", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePreviewDividendDecision: { method: "GET", path: "/api/v1/finance/dividends/decisions/preview", module: "finance", stage: "preview", permission: "finance.dividends:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financePreviewImport: { method: "POST", path: "/api/v1/finance/imports/{id}/preview", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeQuarantineExchangeItem: { method: "POST", path: "/api/v1/finance/exchange/items/{id}/quarantine", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeReconcileRegisters: { method: "GET", path: "/api/v1/finance/registers/reconcile", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRecordExchangeItem: { method: "POST", path: "/api/v1/finance/exchange/items", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRefreshConnectorAccounts: { method: "POST", path: "/api/v1/finance/connectors/{id}/accounts/refresh", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRejectClassificationSuggestion: { method: "POST", path: "/api/v1/finance/classification-suggestions/{id}/reject", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRepairRegisters: { method: "POST", path: "/api/v1/finance/registers/repair", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRestorePaymentPlan: { method: "POST", path: "/api/v1/finance/payment-calendar/plans/{id}/restore", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeResyncRegisters: { method: "POST", path: "/api/v1/finance/registers/resync", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeRunDividendAutomation: { method: "POST", path: "/api/v1/finance/dividends/automation/run", module: "finance", stage: "preview", permission: "finance.dividends:auto", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSavePnlLayout: { method: "PUT", path: "/api/v1/finance/pnl-layouts/{id}", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSaveProjectBudget: { method: "POST", path: "/api/v1/finance/project-budgets", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSetAccountOpeningBalance: { method: "POST", path: "/api/v1/finance/accounts/{id}/opening-balance", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSetConnectorSyncSettings: { method: "PUT", path: "/api/v1/finance/connectors/sync-settings", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSetWalletOpeningBalance: { method: "POST", path: "/api/v1/finance/wallets/{id}/opening-balance", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeStartConnectorConsent: { method: "POST", path: "/api/v1/finance/connectors/{id}/consent", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeSyncConnector: { method: "POST", path: "/api/v1/finance/connectors/{id}/sync", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeTestConnectorCredentials: { method: "POST", path: "/api/v1/finance/connectors/test", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeTransactionPayoutRegisters: { method: "GET", path: "/api/v1/finance/transactions/{id}/payout-registers", module: "finance", stage: "preview", permission: "finance:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateAccount: { method: "PATCH", path: "/api/v1/finance/accounts/{id}", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateCashOperationResponsible: { method: "PATCH", path: "/api/v1/finance/cash-operations/{id}/responsible", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateConnector: { method: "PATCH", path: "/api/v1/finance/connectors/{id}", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateConnectorAccount: { method: "PATCH", path: "/api/v1/finance/connectors/accounts/{accountId}", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdatePaymentPlan: { method: "PATCH", path: "/api/v1/finance/payment-calendar/plans/{id}", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUpdateTransactionResponsible: { method: "PATCH", path: "/api/v1/finance/transactions/{id}/responsible", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  financeUploadImport: { method: "POST", path: "/api/v1/finance/imports", module: "finance", stage: "preview", permission: "finance:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeAnswer: { method: "POST", path: "/api/v1/knowledge/answer", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeCreatePage: { method: "POST", path: "/api/v1/knowledge/nodes", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeCreateSpace: { method: "POST", path: "/api/v1/knowledge/spaces", module: "knowledge", stage: "preview", permission: "knowledge:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeCreateTag: { method: "POST", path: "/api/v1/knowledge/tags", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeDeleteAsset: { method: "DELETE", path: "/api/v1/knowledge/assets/{id}", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeDeleteSpace: { method: "DELETE", path: "/api/v1/knowledge/spaces/{id}", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeDeleteSpaceCover: { method: "DELETE", path: "/api/v1/knowledge/spaces/{id}/cover", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetAnswerQuality: { method: "GET", path: "/api/v1/knowledge/quality", module: "knowledge", stage: "preview", permission: "knowledge:admin", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetAssetContent: { method: "GET", path: "/api/v1/knowledge/assets/{id}/content", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetPage: { method: "GET", path: "/api/v1/knowledge/nodes/{id}", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetPageAccess: { method: "GET", path: "/api/v1/knowledge/nodes/{id}/access", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetPageHistory: { method: "GET", path: "/api/v1/knowledge/nodes/{id}/history", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetSpaceAccess: { method: "GET", path: "/api/v1/knowledge/spaces/{id}/access", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetSpaceCover: { method: "GET", path: "/api/v1/knowledge/spaces/{id}/cover", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeGetSpaceTree: { method: "GET", path: "/api/v1/knowledge/spaces/{id}/tree", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeListAccessOptions: { method: "GET", path: "/api/v1/knowledge/access-options", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeListPageAssets: { method: "GET", path: "/api/v1/knowledge/nodes/{id}/assets", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeListSpaces: { method: "GET", path: "/api/v1/knowledge/spaces", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeListTags: { method: "GET", path: "/api/v1/knowledge/tags", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeListTrashedPages: { method: "GET", path: "/api/v1/knowledge/archive", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeMovePage: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/move", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgePublishPage: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/publish", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeReindexAsset: { method: "POST", path: "/api/v1/knowledge/assets/{id}/reindex", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeRejectPage: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/reject", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeReplacePageAccess: { method: "PUT", path: "/api/v1/knowledge/nodes/{id}/access", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeReplacePageTags: { method: "PUT", path: "/api/v1/knowledge/nodes/{id}/tags", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeReplaceSpaceAccess: { method: "PUT", path: "/api/v1/knowledge/spaces/{id}/access", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeRestorePage: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/restore", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeRestorePageRevision: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/history/restore", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeSaveAnswerFeedback: { method: "POST", path: "/api/v1/knowledge/answers/{id}/feedback", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeSavePageRevision: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/revisions", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeSearch: { method: "GET", path: "/api/v1/knowledge/search", module: "knowledge", stage: "preview", permission: "knowledge:read", idempotent: false, pagination: "limit", pageSizeMax: 100, pageSizeDefault: 20 },
  knowledgeSubmitPage: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/submit", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeTrashPage: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/archive", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeUpdateSpace: { method: "PUT", path: "/api/v1/knowledge/spaces/{id}", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeUploadPageAsset: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/assets", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeUploadSpaceCover: { method: "POST", path: "/api/v1/knowledge/spaces/{id}/cover", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  knowledgeVerifyPage: { method: "POST", path: "/api/v1/knowledge/nodes/{id}/verify", module: "knowledge", stage: "preview", permission: "knowledge:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceAddOzonProductGroupItems: { method: "POST", path: "/api/v1/marketplace/ozon/product-groups/{id}/items", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceAddWbProductGroupItems: { method: "POST", path: "/api/v1/marketplace/wb/product-groups/{id}/items", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceCreateOzonProductGroup: { method: "POST", path: "/api/v1/marketplace/ozon/product-groups", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceCreateOzonStore: { method: "POST", path: "/api/v1/marketplace/ozon/stores", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceCreateWbProductGroup: { method: "POST", path: "/api/v1/marketplace/wb/product-groups", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceCreateWbStore: { method: "POST", path: "/api/v1/marketplace/wb/stores", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceCreateYandexStore: { method: "POST", path: "/api/v1/marketplace/yandex/stores", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceDeleteOzonProductGroup: { method: "DELETE", path: "/api/v1/marketplace/ozon/product-groups/{id}", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceDeleteWbProductGroup: { method: "DELETE", path: "/api/v1/marketplace/wb/product-groups/{id}", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceEconQuote: { method: "POST", path: "/api/v1/marketplace/econ/quote", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonDecomposition: { method: "GET", path: "/api/v1/marketplace/ozon/decomposition", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonDecompositionOther: { method: "GET", path: "/api/v1/marketplace/ozon/decomposition-other", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonFbs: { method: "GET", path: "/api/v1/marketplace/ozon/fbs", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonFunnel: { method: "GET", path: "/api/v1/marketplace/ozon/funnel", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonFunnelDaily: { method: "GET", path: "/api/v1/marketplace/ozon/funnel-daily", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonOrdersOverview: { method: "GET", path: "/api/v1/marketplace/ozon/orders/overview", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonPnl: { method: "GET", path: "/api/v1/marketplace/ozon/pnl", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonPricing: { method: "GET", path: "/api/v1/marketplace/ozon/pricing", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonProductFacets: { method: "GET", path: "/api/v1/marketplace/ozon/product-facets", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonProductGroupItems: { method: "GET", path: "/api/v1/marketplace/ozon/product-groups/{id}/items", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonProductGroups: { method: "GET", path: "/api/v1/marketplace/ozon/product-groups", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonProducts: { method: "GET", path: "/api/v1/marketplace/ozon/products", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "page", pageSizeMax: 10000, pageSizeDefault: 50 },
  marketplaceOzonPromotions: { method: "GET", path: "/api/v1/marketplace/ozon/promotions", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonSetCost: { method: "POST", path: "/api/v1/marketplace/ozon/cost", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonStocks: { method: "GET", path: "/api/v1/marketplace/ozon/stocks", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonStores: { method: "GET", path: "/api/v1/marketplace/ozon/stores", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceOzonSyncJobs: { method: "GET", path: "/api/v1/marketplace/ozon/sync-jobs", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceRemoveOzonProductGroupItem: { method: "DELETE", path: "/api/v1/marketplace/ozon/product-groups/{id}/items", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceRemoveWbProductGroupItem: { method: "DELETE", path: "/api/v1/marketplace/wb/product-groups/{id}/items", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceSetYandexCost: { method: "POST", path: "/api/v1/marketplace/yandex/cost", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceUpdateOzonProductGroup: { method: "PATCH", path: "/api/v1/marketplace/ozon/product-groups/{id}", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceUpdateOzonStore: { method: "PATCH", path: "/api/v1/marketplace/ozon/stores/{id}", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceUpdateWbProductGroup: { method: "PATCH", path: "/api/v1/marketplace/wb/product-groups/{id}", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceUpdateWbStore: { method: "PATCH", path: "/api/v1/marketplace/wb/stores/{id}", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceUpdateYandexStore: { method: "PATCH", path: "/api/v1/marketplace/yandex/stores/{id}", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbCardBoard: { method: "GET", path: "/api/v1/marketplace/wb/card/board", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbCardOptions: { method: "GET", path: "/api/v1/marketplace/wb/card/options", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbDecomposition: { method: "GET", path: "/api/v1/marketplace/wb/decomposition", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbDecompositionOther: { method: "GET", path: "/api/v1/marketplace/wb/decomposition-other", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbFunnel: { method: "GET", path: "/api/v1/marketplace/wb/funnel", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbFunnelDaily: { method: "GET", path: "/api/v1/marketplace/wb/funnel-daily", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbOrdersOverview: { method: "GET", path: "/api/v1/marketplace/wb/orders/overview", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbPnl: { method: "GET", path: "/api/v1/marketplace/wb/pnl", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbPricing: { method: "GET", path: "/api/v1/marketplace/wb/pricing", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbProductFacets: { method: "GET", path: "/api/v1/marketplace/wb/product-facets", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbProductGroupItems: { method: "GET", path: "/api/v1/marketplace/wb/product-groups/{id}/items", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbProductGroups: { method: "GET", path: "/api/v1/marketplace/wb/product-groups", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbProducts: { method: "GET", path: "/api/v1/marketplace/wb/products", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "page", pageSizeMax: 10000, pageSizeDefault: 50 },
  marketplaceWbPromotions: { method: "GET", path: "/api/v1/marketplace/wb/promotions", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbSetCost: { method: "POST", path: "/api/v1/marketplace/wb/cost", module: "marketplace", stage: "preview", permission: "marketplace:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbStocks: { method: "GET", path: "/api/v1/marketplace/wb/stocks", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceWbStores: { method: "GET", path: "/api/v1/marketplace/wb/stores", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceYandexOrdersOverview: { method: "GET", path: "/api/v1/marketplace/yandex/orders/overview", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceYandexPnl: { method: "GET", path: "/api/v1/marketplace/yandex/pnl", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  marketplaceYandexProducts: { method: "GET", path: "/api/v1/marketplace/yandex/products", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "page", pageSizeMax: 10000, pageSizeDefault: 50 },
  marketplaceYandexStores: { method: "GET", path: "/api/v1/marketplace/yandex/stores", module: "marketplace", stage: "preview", permission: "marketplace:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsActivateCompany: { method: "POST", path: "/api/v1/settings/companies/{id}/activate", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsAppIncidents: { method: "GET", path: "/api/v1/settings/app-incidents", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsAppInstallationEvents: { method: "GET", path: "/api/v1/settings/app-installations/{id}/events", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 100 },
  settingsCreateApiKey: { method: "POST", path: "/api/v1/settings/api-keys", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsCreateCompany: { method: "POST", path: "/api/v1/settings/companies", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsCreateFieldDefinition: { method: "POST", path: "/api/v1/settings/field-definitions", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsCreateMember: { method: "POST", path: "/api/v1/settings/members", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsCreateRole: { method: "POST", path: "/api/v1/settings/roles", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsDeleteApiKey: { method: "DELETE", path: "/api/v1/settings/api-keys/{id}", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsDeleteCompany: { method: "DELETE", path: "/api/v1/settings/companies/{id}", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsDeleteFieldDefinition: { method: "DELETE", path: "/api/v1/settings/field-definitions/{id}", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsDisableAppInstallation: { method: "POST", path: "/api/v1/settings/app-installations/{id}/disable", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsEnableAppInstallation: { method: "POST", path: "/api/v1/settings/app-installations/{id}/enable", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsGetFieldSchema: { method: "GET", path: "/api/v1/settings/field-schema", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsInstallApp: { method: "POST", path: "/api/v1/settings/apps/{publisher}/{key}/installation", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListApiKeyAccess: { method: "GET", path: "/api/v1/settings/api-keys/{id}/access", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListApiKeys: { method: "GET", path: "/api/v1/settings/api-keys", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListAppInstallations: { method: "GET", path: "/api/v1/settings/app-installations", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListApps: { method: "GET", path: "/api/v1/settings/apps", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListCompanies: { method: "GET", path: "/api/v1/settings/companies", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListFieldDefinitions: { method: "GET", path: "/api/v1/settings/field-definitions", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListMembers: { method: "GET", path: "/api/v1/settings/members", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListRoleMembers: { method: "GET", path: "/api/v1/settings/roles/{id}/members", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListRoles: { method: "GET", path: "/api/v1/settings/roles", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListSelectableCompanies: { method: "GET", path: "/api/v1/settings/companies/selectable", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsListVatRates: { method: "GET", path: "/api/v1/settings/vat-rates", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsPreviewAppConsent: { method: "GET", path: "/api/v1/settings/apps/{publisher}/{key}/consent", module: "settings", stage: "preview", permission: "settings:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsRestoreApiKey: { method: "POST", path: "/api/v1/settings/api-keys/{id}/restore", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsRevokeApiKey: { method: "POST", path: "/api/v1/settings/api-keys/{id}/revoke", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsRollbackAppInstallation: { method: "POST", path: "/api/v1/settings/app-installations/{id}/rollback", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsSetCompanyAccountingMethod: { method: "POST", path: "/api/v1/settings/companies/{id}/accounting-method", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsSetRoleActive: { method: "POST", path: "/api/v1/settings/roles/{id}/activation", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsTransferRoleMembers: { method: "POST", path: "/api/v1/settings/roles/{id}/transfer", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsUninstallAppInstallation: { method: "POST", path: "/api/v1/settings/app-installations/{id}/uninstall", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsUnparkAppInstallation: { method: "POST", path: "/api/v1/settings/app-installations/{id}/unpark", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsUpdateAppInstallation: { method: "POST", path: "/api/v1/settings/app-installations/{id}/update", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsUpdateCompany: { method: "PATCH", path: "/api/v1/settings/companies/{id}", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsUpdateFieldDefinition: { method: "PATCH", path: "/api/v1/settings/field-definitions/{id}", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsUpdateMember: { method: "PATCH", path: "/api/v1/settings/members/{id}", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  settingsUpdateRole: { method: "PATCH", path: "/api/v1/settings/roles/{id}", module: "settings", stage: "preview", permission: "settings:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockActivateWarehouse: { method: "POST", path: "/api/v1/stock/warehouses/{id}/activate", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockApplyImport: { method: "POST", path: "/api/v1/stock/imports/{id}/apply", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCancelDocument: { method: "POST", path: "/api/v1/stock/documents/{id}/cancel", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateDocument: { method: "POST", path: "/api/v1/stock/documents", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateExport: { method: "POST", path: "/api/v1/stock/exports", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateImport: { method: "POST", path: "/api/v1/stock/imports", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreatePurchaseOrder: { method: "POST", path: "/api/v1/stock/purchasing/orders", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockCreateWarehouse: { method: "POST", path: "/api/v1/stock/warehouses", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockDeactivateWarehouse: { method: "POST", path: "/api/v1/stock/warehouses/{id}/deactivate", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockDeriveInventoryActs: { method: "POST", path: "/api/v1/stock/documents/{id}/derive", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockFinishInventoryCount: { method: "POST", path: "/api/v1/stock/documents/{id}/inventory-finish", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetBatch: { method: "GET", path: "/api/v1/stock/batches/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetCompanyPolicy: { method: "GET", path: "/api/v1/stock/company-policies/{companyId}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetDocument: { method: "GET", path: "/api/v1/stock/documents/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetDocumentBlockers: { method: "GET", path: "/api/v1/stock/documents/{id}/blockers", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetDocumentFulfillment: { method: "GET", path: "/api/v1/stock/documents/{id}/fulfillment", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetDocumentLinks: { method: "GET", path: "/api/v1/stock/documents/{id}/links", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetExport: { method: "GET", path: "/api/v1/stock/exports/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetExportContent: { method: "GET", path: "/api/v1/stock/exports/{id}/content", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetHandlingUnit: { method: "GET", path: "/api/v1/stock/handling-units/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "limit", pageSizeMax: 1000, pageSizeDefault: 200 },
  stockGetImport: { method: "GET", path: "/api/v1/stock/imports/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetImportErrors: { method: "GET", path: "/api/v1/stock/imports/{id}/errors", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetImportSource: { method: "GET", path: "/api/v1/stock/imports/{id}/source", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetImportTemplate: { method: "GET", path: "/api/v1/stock/import-templates/{kind}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetInventoryCountSheet: { method: "GET", path: "/api/v1/stock/documents/{id}/count-sheet", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetOverdueReservations: { method: "GET", path: "/api/v1/stock/report/reservations/overdue", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "limit", pageSizeMax: 1000, pageSizeDefault: 200 },
  stockGetPurchasingReport: { method: "GET", path: "/api/v1/stock/report/purchasing", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "limit", pageSizeMax: 500, pageSizeDefault: 200 },
  stockGetReorderRule: { method: "GET", path: "/api/v1/stock/reorder-rules/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetReservationSummaries: { method: "GET", path: "/api/v1/stock/report/reservations", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "limit", pageSizeMax: 1000, pageSizeDefault: 500 },
  stockGetSettings: { method: "GET", path: "/api/v1/stock/settings", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetStockDrilldown: { method: "GET", path: "/api/v1/stock/report/stocks/{productId}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: 200 },
  stockGetStocksReport: { method: "GET", path: "/api/v1/stock/report/stocks", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: 200 },
  stockGetValuationRun: { method: "GET", path: "/api/v1/stock/valuation/rebuild/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetWarehouse: { method: "GET", path: "/api/v1/stock/warehouses/{id}", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockGetWarehouseBlockers: { method: "GET", path: "/api/v1/stock/warehouses/{id}/blockers", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockInspectImport: { method: "POST", path: "/api/v1/stock/imports/{id}/inspect", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListBatches: { method: "GET", path: "/api/v1/stock/batches", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 100 },
  stockListCompanies: { method: "GET", path: "/api/v1/stock/companies", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListCompanyPolicies: { method: "GET", path: "/api/v1/stock/company-policies", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListDocumentFulfillments: { method: "GET", path: "/api/v1/stock/documents/fulfillments", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListDocuments: { method: "GET", path: "/api/v1/stock/documents", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 200 },
  stockListHandlingUnits: { method: "GET", path: "/api/v1/stock/handling-units", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 1000, pageSizeDefault: 200 },
  stockListInventoryChanges: { method: "GET", path: "/api/v1/stock/documents/{id}/inventory-changes", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListProductUOMs: { method: "GET", path: "/api/v1/stock/products/{productId}/uoms", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListReorderRules: { method: "GET", path: "/api/v1/stock/reorder-rules", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 500, pageSizeDefault: 50 },
  stockListSuppliers: { method: "GET", path: "/api/v1/stock/suppliers", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockListWarehouses: { method: "GET", path: "/api/v1/stock/warehouses", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockPostDocument: { method: "POST", path: "/api/v1/stock/documents/{id}/post", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockPreviewImport: { method: "POST", path: "/api/v1/stock/imports/{id}/preview", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockPreviewValuation: { method: "POST", path: "/api/v1/stock/valuation/preview", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockRebuildValuation: { method: "POST", path: "/api/v1/stock/valuation/rebuild", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockRefreshInventorySnapshot: { method: "POST", path: "/api/v1/stock/documents/{id}/inventory-refresh", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockReleaseReservation: { method: "POST", path: "/api/v1/stock/documents/{id}/release", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSaveInventoryCounts: { method: "PATCH", path: "/api/v1/stock/documents/{id}/inventory-counts", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSaveProductUOM: { method: "PUT", path: "/api/v1/stock/product-uoms", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSaveReorderRule: { method: "PUT", path: "/api/v1/stock/reorder-rules", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockScanProduct: { method: "GET", path: "/api/v1/stock/products/scan", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockSuggestHandlingUnits: { method: "GET", path: "/api/v1/stock/handling-units/suggestions", module: "stock", stage: "preview", permission: "stock:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateCompanyPolicy: { method: "PATCH", path: "/api/v1/stock/company-policies/{companyId}", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateDocument: { method: "PATCH", path: "/api/v1/stock/documents/{id}", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateHandlingUnitStatus: { method: "PATCH", path: "/api/v1/stock/handling-units/{id}/status", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateImportMapping: { method: "PATCH", path: "/api/v1/stock/imports/{id}/mapping", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateReorderRule: { method: "PATCH", path: "/api/v1/stock/reorder-rules/{id}", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateSettings: { method: "PATCH", path: "/api/v1/stock/settings", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  stockUpdateWarehouse: { method: "PATCH", path: "/api/v1/stock/warehouses/{id}", module: "stock", stage: "preview", permission: "stock:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksAddProjectMember: { method: "POST", path: "/api/v1/tasks/projects/{id}/members", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksAddSectionMember: { method: "POST", path: "/api/v1/tasks/sections/{id}/members", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksArchiveProject: { method: "DELETE", path: "/api/v1/tasks/projects/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksArchiveSection: { method: "DELETE", path: "/api/v1/tasks/sections/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksArchiveTask: { method: "DELETE", path: "/api/v1/tasks/tasks/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksArchiveTemplate: { method: "DELETE", path: "/api/v1/tasks/templates/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksAttachTaskTag: { method: "POST", path: "/api/v1/tasks/tasks/{id}/tags", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateAgentJournalEntry: { method: "POST", path: "/api/v1/tasks/tasks/{id}/agent-journal", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateAttachmentDownloadSession: { method: "GET", path: "/api/v1/tasks/attachments/{id}/download-session", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateAttachmentReplacementSession: { method: "POST", path: "/api/v1/tasks/attachments/{id}/replace-sessions", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateAttachmentUploadSession: { method: "POST", path: "/api/v1/tasks/attachments/upload-sessions", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateComment: { method: "POST", path: "/api/v1/tasks/tasks/{id}/comments", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateCustomer: { method: "POST", path: "/api/v1/tasks/customers", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateCustomerNeed: { method: "POST", path: "/api/v1/tasks/customer-needs", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateCycle: { method: "POST", path: "/api/v1/tasks/cycles", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateDiscussionComment: { method: "POST", path: "/api/v1/tasks/discussion-comments", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateDocument: { method: "POST", path: "/api/v1/tasks/documents", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateLink: { method: "POST", path: "/api/v1/tasks/tasks/{id}/links", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateMeeting: { method: "POST", path: "/api/v1/tasks/hub/meetings", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateMilestone: { method: "POST", path: "/api/v1/tasks/milestones", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateProject: { method: "POST", path: "/api/v1/tasks/projects", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateProjectFileFolder: { method: "POST", path: "/api/v1/tasks/projects/{id}/file-folders", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreatePullRequest: { method: "POST", path: "/api/v1/tasks/pull-requests", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateRelation: { method: "POST", path: "/api/v1/tasks/tasks/{id}/relations", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateSection: { method: "POST", path: "/api/v1/tasks/sections", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateStatus: { method: "POST", path: "/api/v1/tasks/statuses", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateStatusUpdate: { method: "POST", path: "/api/v1/tasks/status-updates", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateTag: { method: "POST", path: "/api/v1/tasks/tags", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateTask: { method: "POST", path: "/api/v1/tasks/tasks", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: true, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateTemplate: { method: "POST", path: "/api/v1/tasks/templates", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksCreateView: { method: "POST", path: "/api/v1/tasks/views", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteAttachment: { method: "DELETE", path: "/api/v1/tasks/attachments/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteComment: { method: "DELETE", path: "/api/v1/tasks/comments/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteCustomer: { method: "DELETE", path: "/api/v1/tasks/customers/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteCustomerNeed: { method: "DELETE", path: "/api/v1/tasks/customer-needs/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteCycle: { method: "DELETE", path: "/api/v1/tasks/cycles/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteDiscussionComment: { method: "DELETE", path: "/api/v1/tasks/discussion-comments/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteDocument: { method: "DELETE", path: "/api/v1/tasks/documents/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteLink: { method: "DELETE", path: "/api/v1/tasks/links/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteMeeting: { method: "DELETE", path: "/api/v1/tasks/hub/meetings/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteMilestone: { method: "DELETE", path: "/api/v1/tasks/milestones/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteProjectFileFolder: { method: "DELETE", path: "/api/v1/tasks/projects/{id}/file-folders/{folderID}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteProjectMember: { method: "DELETE", path: "/api/v1/tasks/projects/{id}/members/{userID}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeletePullRequest: { method: "DELETE", path: "/api/v1/tasks/pull-requests/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteRelation: { method: "DELETE", path: "/api/v1/tasks/relations/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteSectionMember: { method: "DELETE", path: "/api/v1/tasks/section-members/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteStatus: { method: "DELETE", path: "/api/v1/tasks/statuses/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteStatusUpdate: { method: "DELETE", path: "/api/v1/tasks/status-updates/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteTag: { method: "DELETE", path: "/api/v1/tasks/tags/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksDeleteView: { method: "DELETE", path: "/api/v1/tasks/views/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksFinishAttachmentUploadSession: { method: "POST", path: "/api/v1/tasks/attachments/upload-sessions/{id}/finish", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetAttachmentContent: { method: "GET", path: "/api/v1/tasks/attachments/{id}/content", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetCustomer: { method: "GET", path: "/api/v1/tasks/customers/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetCustomerNeed: { method: "GET", path: "/api/v1/tasks/customer-needs/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetCycle: { method: "GET", path: "/api/v1/tasks/cycles/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetDiscussionComment: { method: "GET", path: "/api/v1/tasks/discussion-comments/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetDocument: { method: "GET", path: "/api/v1/tasks/documents/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetHubOverview: { method: "GET", path: "/api/v1/tasks/hub/overview", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetMeeting: { method: "GET", path: "/api/v1/tasks/hub/meetings/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetMilestone: { method: "GET", path: "/api/v1/tasks/milestones/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetPullRequest: { method: "GET", path: "/api/v1/tasks/pull-requests/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetScrumSettings: { method: "GET", path: "/api/v1/tasks/scrum/settings/{project}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetSnapshot: { method: "GET", path: "/api/v1/tasks/snapshot", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "limit", pageSizeMax: 200, pageSizeDefault: 200 },
  tasksGetSprintMetrics: { method: "GET", path: "/api/v1/tasks/scrum/metrics/{cycle}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetStatusMetrics: { method: "GET", path: "/api/v1/tasks/tasks/{id}/status-metrics", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetStatusUpdate: { method: "GET", path: "/api/v1/tasks/status-updates/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksGetTask: { method: "GET", path: "/api/v1/tasks/tasks/{id}", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListActivity: { method: "GET", path: "/api/v1/tasks/tasks/{id}/activity", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListAgentJournal: { method: "GET", path: "/api/v1/tasks/tasks/{id}/agent-journal", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListCommentAttachments: { method: "GET", path: "/api/v1/tasks/comments/{id}/attachments", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListComments: { method: "GET", path: "/api/v1/tasks/tasks/{id}/comments", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListCustomerNeeds: { method: "GET", path: "/api/v1/tasks/customer-needs", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListCustomers: { method: "GET", path: "/api/v1/tasks/customers", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListCycles: { method: "GET", path: "/api/v1/tasks/cycles", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListDiscussionComments: { method: "GET", path: "/api/v1/tasks/discussion-comments", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListDocumentAttachments: { method: "GET", path: "/api/v1/tasks/documents/{id}/attachments", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListDocuments: { method: "GET", path: "/api/v1/tasks/documents", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListHubSections: { method: "GET", path: "/api/v1/tasks/hub/sections", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListLinks: { method: "GET", path: "/api/v1/tasks/tasks/{id}/links", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListMeetingAttachments: { method: "GET", path: "/api/v1/tasks/hub/meetings/{id}/attachments", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListMeetings: { method: "GET", path: "/api/v1/tasks/hub/meetings", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListMembers: { method: "GET", path: "/api/v1/tasks/members", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListMilestones: { method: "GET", path: "/api/v1/tasks/milestones", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListProjectAttachments: { method: "GET", path: "/api/v1/tasks/projects/{id}/attachments", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListProjectFileFolders: { method: "GET", path: "/api/v1/tasks/projects/{id}/file-folders", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListProjectMembers: { method: "GET", path: "/api/v1/tasks/projects/{id}/members", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListProjects: { method: "GET", path: "/api/v1/tasks/projects", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListPullRequests: { method: "GET", path: "/api/v1/tasks/pull-requests", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListRelations: { method: "GET", path: "/api/v1/tasks/tasks/{id}/relations", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListScrumSettings: { method: "GET", path: "/api/v1/tasks/scrum/settings", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListSectionAttachments: { method: "GET", path: "/api/v1/tasks/sections/{id}/attachments", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListSectionMembers: { method: "GET", path: "/api/v1/tasks/sections/{id}/members", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListSections: { method: "GET", path: "/api/v1/tasks/sections", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListStatusUpdates: { method: "GET", path: "/api/v1/tasks/status-updates", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListStatuses: { method: "GET", path: "/api/v1/tasks/statuses", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListTagCatalog: { method: "GET", path: "/api/v1/tasks/tags", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListTaskAttachments: { method: "GET", path: "/api/v1/tasks/tasks/{id}/attachments", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListTaskTags: { method: "GET", path: "/api/v1/tasks/tasks/{id}/tags", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListTasks: { method: "GET", path: "/api/v1/tasks/tasks", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "limit_offset", pageSizeMax: 200, pageSizeDefault: null },
  tasksListTemplates: { method: "GET", path: "/api/v1/tasks/templates", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksListViews: { method: "GET", path: "/api/v1/tasks/views", module: "tasks", stage: "preview", permission: "tasks:read", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksMoveProjectAttachment: { method: "PATCH", path: "/api/v1/tasks/projects/{id}/attachments/{attachmentID}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksMoveTask: { method: "POST", path: "/api/v1/tasks/tasks/{id}/move", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksRenameProjectFileFolder: { method: "PATCH", path: "/api/v1/tasks/projects/{id}/file-folders/{folderID}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksReorderStatuses: { method: "PATCH", path: "/api/v1/tasks/statuses/reorder", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksReplaceAttachment: { method: "POST", path: "/api/v1/tasks/attachments/{id}/replace", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksRunDueTemplates: { method: "POST", path: "/api/v1/tasks/templates/run-due", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksRunTemplate: { method: "POST", path: "/api/v1/tasks/templates/{id}/run", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateCustomer: { method: "PATCH", path: "/api/v1/tasks/customers/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateCustomerNeed: { method: "PATCH", path: "/api/v1/tasks/customer-needs/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateCycle: { method: "PATCH", path: "/api/v1/tasks/cycles/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateDiscussionComment: { method: "PATCH", path: "/api/v1/tasks/discussion-comments/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateDocument: { method: "PATCH", path: "/api/v1/tasks/documents/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateHubSection: { method: "PATCH", path: "/api/v1/tasks/hub/sections/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateMeeting: { method: "PATCH", path: "/api/v1/tasks/hub/meetings/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateMilestone: { method: "PATCH", path: "/api/v1/tasks/milestones/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateProject: { method: "PATCH", path: "/api/v1/tasks/projects/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdatePullRequest: { method: "PATCH", path: "/api/v1/tasks/pull-requests/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateScrumSettings: { method: "PATCH", path: "/api/v1/tasks/scrum/settings/{project}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateSection: { method: "PATCH", path: "/api/v1/tasks/sections/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateStatus: { method: "PATCH", path: "/api/v1/tasks/statuses/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateStatusUpdate: { method: "PATCH", path: "/api/v1/tasks/status-updates/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateTag: { method: "PATCH", path: "/api/v1/tasks/tags/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateTask: { method: "PATCH", path: "/api/v1/tasks/tasks/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUpdateTemplate: { method: "PATCH", path: "/api/v1/tasks/templates/{id}", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUploadCommentAttachment: { method: "POST", path: "/api/v1/tasks/comments/{id}/attachments", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUploadDocumentAttachment: { method: "POST", path: "/api/v1/tasks/documents/{id}/attachments", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUploadMeetingAttachment: { method: "POST", path: "/api/v1/tasks/hub/meetings/{id}/attachments", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUploadProjectAttachment: { method: "POST", path: "/api/v1/tasks/projects/{id}/attachments", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUploadSectionAttachment: { method: "POST", path: "/api/v1/tasks/sections/{id}/attachments", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
  tasksUploadTaskAttachment: { method: "POST", path: "/api/v1/tasks/tasks/{id}/attachments", module: "tasks", stage: "preview", permission: "tasks:write", idempotent: false, pagination: "none", pageSizeMax: null, pageSizeDefault: null },
};
