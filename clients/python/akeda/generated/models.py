# Сгенерировано scripts/generate.py. Руками не править.
# Источник: snapshot/openapi/akeda-v1.json (контракт 0.21.0-core-public, sha256 3b4e5818e72cb98786a0f06776813205755d9e95e5752df061d59d58c0db6522).
# Рантайм клиента написан руками и живёт рядом; здесь только типы.

from __future__ import annotations

from typing import Any, Dict, List, Literal, Optional, TypedDict, Union

__all__ = [
    "Activity",
    "ActivityList",
    "AppFinanceClassificationSuggestionAccepted",
    "AppFinanceClassificationSuggestionInput",
    "AppFinanceClassificationSuggestionInputCashflowItem",
    "AppFinanceClassificationSuggestionInputExplanation",
    "AppFinanceDirectoryRef",
    "AppRuntimeConfig",
    "AppRuntimeConfigValue",
    "AppRuntimeInstallation",
    "AppRuntimeLease",
    "AppRuntimeLeaseInput",
    "AppRuntimeSlotActor",
    "AppRuntimeSlotAnchor",
    "AppRuntimeSlotLaunch",
    "AppRuntimeSlotLaunchInput",
    "AppRuntimeTenant",
    "ArchiveTransfer",
    "Attachment",
    "AttachmentDownloadSession",
    "AttachmentMove",
    "AttachmentOwnerType",
    "AttachmentPage",
    "AttachmentReplacementSessionCreate",
    "AttachmentUploadSession",
    "AttachmentUploadSessionCreate",
    "CRMActivity",
    "CRMAnalytics",
    "CRMAutomationAction",
    "CRMAutomationActionJournal",
    "CRMAutomationEventType",
    "CRMAutomationRule",
    "CRMAutomationRuleInput",
    "CRMAutomationRun",
    "CRMContactRef",
    "CRMConversionMetric",
    "CRMConvertLeadInput",
    "CRMCreateEventLinkInput",
    "CRMCreateHubMeetingInput",
    "CRMCreateTaskLinkInput",
    "CRMCustomer",
    "CRMCustomerDuplicate",
    "CRMCustomerInput",
    "CRMCustomerPatch",
    "CRMDeal",
    "CRMDealBoard",
    "CRMDealBoardStage",
    "CRMDealCard",
    "CRMDealContact",
    "CRMDealContactInput",
    "CRMDealInput",
    "CRMDealItem",
    "CRMDealItemInput",
    "CRMDealPatch",
    "CRMDealStageHistory",
    "CRMEngagement",
    "CRMEngagementInput",
    "CRMEngagementKind",
    "CRMEngagementPatch",
    "CRMExternalLink",
    "CRMInboxAssignInput",
    "CRMInboxAttachment",
    "CRMInboxConnection",
    "CRMInboxConnectionCheck",
    "CRMInboxConnectionInput",
    "CRMInboxConnectionPatch",
    "CRMInboxConversation",
    "CRMInboxConversationLink",
    "CRMInboxConversationStatus",
    "CRMInboxDealInput",
    "CRMInboxEntityMessage",
    "CRMInboxLinkConversationInput",
    "CRMInboxLinkedConversation",
    "CRMInboxMessage",
    "CRMInboxOutboundUpload",
    "CRMInboxProvider",
    "CRMInboxProviderCapabilities",
    "CRMInboxProviderField",
    "CRMInboxSendInput",
    "CRMInboxTemplate",
    "CRMInboxTemplateInput",
    "CRMLead",
    "CRMLeadCard",
    "CRMLeadDecision",
    "CRMLeadDuplicate",
    "CRMLeadInput",
    "CRMLeadPatch",
    "CRMLeadStatus",
    "CRMLossReason",
    "CRMLossReasonInput",
    "CRMLossReasonMetric",
    "CRMManagerWorkload",
    "CRMMergeLeadsInput",
    "CRMMoveDealInput",
    "CRMNoteInput",
    "CRMOverview",
    "CRMPipeline",
    "CRMPipelineInput",
    "CRMPipelineOverview",
    "CRMPipelinePatch",
    "CRMQualifyLeadInput",
    "CRMReopenDealInput",
    "CRMReorderInput",
    "CRMRequiredField",
    "CRMSLAMetric",
    "CRMSalesPlan",
    "CRMSalesPlansInput",
    "CRMSalesPlansInputItemsItem",
    "CRMSourceMetric",
    "CRMStage",
    "CRMStageCategory",
    "CRMStageInput",
    "CRMStageMetric",
    "CRMStageOverview",
    "CRMStagePatch",
    "CRMTimelineEntry",
    "CRMUserRef",
    "CalendarAvailability",
    "CalendarAvailabilityCreate",
    "CalendarAvailabilityEnvelope",
    "CalendarAvailabilityPage",
    "CalendarAvailabilityPatch",
    "CalendarBookingLink",
    "CalendarBookingLinkCreate",
    "CalendarBookingLinkEnvelope",
    "CalendarBookingLinkPage",
    "CalendarBookingLinkPatch",
    "CalendarBookingParticipant",
    "CalendarBusy",
    "CalendarBusyPage",
    "CalendarConnector",
    "CalendarConnectorCreate",
    "CalendarConnectorEnvelope",
    "CalendarConnectorPage",
    "CalendarConnectorPatch",
    "CalendarConnectorProvider",
    "CalendarConnectorSyncInput",
    "CalendarEvent",
    "CalendarEventCreate",
    "CalendarEventEnvelope",
    "CalendarEventPage",
    "CalendarEventPatch",
    "CalendarEventResponseInput",
    "CalendarExternalCalendar",
    "CalendarInvitation",
    "CalendarInvitationPage",
    "CalendarMember",
    "CalendarMemberBundle",
    "CalendarMemberDirectory",
    "CalendarOAuthCompleteInput",
    "CalendarOAuthStart",
    "CalendarParticipant",
    "CalendarParticipantInput",
    "CalendarPublicBookInput",
    "CalendarPublicBookResult",
    "CalendarPublicBookingLink",
    "CalendarSettingsEnvelope",
    "CalendarSlot",
    "CalendarSlotPage",
    "CalendarSyncResult",
    "CalendarWebPushConfig",
    "CalendarWebPushSubscription",
    "CalendarWebPushUnsubscribe",
    "ChatAttachment",
    "ChatAttachmentPage",
    "ChatAttachmentUpload",
    "ChatChangePinResult",
    "ChatConversation",
    "ChatConversationAvatarUpload",
    "ChatConversationCapabilities",
    "ChatConversationPage",
    "ChatCreateGroup",
    "ChatCreateGroupResult",
    "ChatEditMessage",
    "ChatEnsureDirect",
    "ChatEnsureDirectResult",
    "ChatFolder",
    "ChatFolderPage",
    "ChatForwardMessage",
    "ChatForwardMessageResult",
    "ChatForwardedAttachment",
    "ChatForwardedMessage",
    "ChatMarkAllRead",
    "ChatMarkAllReadResult",
    "ChatMediaUpload",
    "ChatMember",
    "ChatMemberPage",
    "ChatMentionCandidate",
    "ChatMentionCandidatePage",
    "ChatMentionReadResult",
    "ChatMessage",
    "ChatMessageMention",
    "ChatMessagePage",
    "ChatMessagePin",
    "ChatMessagePinPage",
    "ChatMessageReaction",
    "ChatMobileDeviceRegistration",
    "ChatMobileDeviceRegistrationState",
    "ChatMobilePushTestResult",
    "ChatNotificationModeInput",
    "ChatNotificationModeResult",
    "ChatPeoplePage",
    "ChatPerson",
    "ChatReactionResult",
    "ChatReceiptInput",
    "ChatReceiptState",
    "ChatSaveFolder",
    "ChatSendMessage",
    "ChatSendMessageResult",
    "ChatSetReaction",
    "ChatUnreadMention",
    "ChatUnreadMentionPage",
    "Comment",
    "CommentCreate",
    "CommentList",
    "CommentOrigin",
    "CoreAccountingDimension",
    "CoreAccountingDimensionPage",
    "CoreAccountingDimensionPageReadiness",
    "CoreAccountingDimensionPatch",
    "CoreAccountingPeriodClose",
    "CoreAccountingPeriodEvent",
    "CoreAccountingPeriodReopen",
    "CoreAccountingPeriodState",
    "CoreAccountingSettings",
    "CoreAccountingSettingsInput",
    "CoreBalanceShortage",
    "CoreBulkResult",
    "CoreBusiness",
    "CoreBusinessInput",
    "CoreBusinessOwner",
    "CoreBusinessOwnerInput",
    "CoreCabinetPreferences",
    "CoreConflictingRegistrar",
    "CoreContact",
    "CoreContactBulkPatch",
    "CoreContactCreate",
    "CoreContactEntityType",
    "CoreContactKind",
    "CoreContactPage",
    "CoreContactPatch",
    "CoreCurrencyRate",
    "CoreCurrencyRateInput",
    "CoreCurrencyRatePage",
    "CoreCurrencyRateRefreshResult",
    "CoreCurrencyRateSource",
    "CoreCurrencyRateSourceKey",
    "CoreCurrencyRateSourcePage",
    "CoreDictionary",
    "CoreDictionaryCreate",
    "CoreDictionaryItem",
    "CoreDictionaryItemCreate",
    "CoreDictionaryItemImport",
    "CoreDictionaryItemPage",
    "CoreDictionaryItemUpdate",
    "CoreDictionaryPage",
    "CoreDictionaryUpdate",
    "CoreDirectory",
    "CoreDirectoryContract",
    "CoreDirectoryMount",
    "CoreDirectoryPage",
    "CoreDocument",
    "CoreDocumentActionCheck",
    "CoreDocumentBlockReason",
    "CoreDocumentBlockers",
    "CoreDocumentCreate",
    "CoreDocumentLinkNode",
    "CoreDocumentLinks",
    "CoreDocumentMarkDeleted",
    "CoreDocumentMovementSummary",
    "CoreDocumentPage",
    "CoreDocumentPatch",
    "CoreDocumentStatus",
    "CoreDocumentType",
    "CoreDocumentTypeCreate",
    "CoreDocumentTypePage",
    "CoreDocumentTypePatch",
    "CoreEmployee",
    "CoreEmployeeCreateVariant1",
    "CoreEmployeeCreateVariant2",
    "CoreEmployeeCreateVariant3",
    "CoreEmployeeCreateVariant4",
    "CoreEmployeeCreate",
    "CoreEmployeeEquipment",
    "CoreEmployeeEquipmentInput",
    "CoreEmployeeEquipmentPage",
    "CoreEmployeeLifecycleKind",
    "CoreEmployeeLifecycleTemplate",
    "CoreEmployeeLifecycleTemplateInput",
    "CoreEmployeeLifecycleTemplatePage",
    "CoreEmployeePage",
    "CoreEmployeePatch",
    "CoreExternalContactCandidate",
    "CoreExternalContactMatchOption",
    "CoreExternalContactMatchOutcome",
    "CoreExternalContactMatchReport",
    "CoreExternalContactMatchRequest",
    "CoreExternalContactMatchResult",
    "CoreExternalContactMatchSummary",
    "CoreExternalRef",
    "CoreExternalRefEntityType",
    "CoreExternalRefInput",
    "CoreExternalRefLinkRequest",
    "CoreExternalRefMatchSource",
    "CoreExternalRefPage",
    "CoreExternalRefRememberRequest",
    "CoreExternalRefResolveRequest",
    "CoreExternalRefResolveResult",
    "CoreFolder",
    "CoreFolderInput",
    "CoreFolderPage",
    "CoreFolderScope",
    "CoreGLAccount",
    "CoreGLAccountCreate",
    "CoreGLAccountPage",
    "CoreGLAccountPatch",
    "CoreGLAccountType",
    "CoreGLMapping",
    "CoreGLMappingCreate",
    "CoreGLMappingPage",
    "CoreGLOpeningImport",
    "CoreGLOpeningImportAppliedRequest",
    "CoreGLOpeningImportPage",
    "CoreGLOpeningImportRow",
    "CoreGLOpeningImportStatus",
    "CoreGLOpeningMatch",
    "CoreGLOpeningNote",
    "CoreGLOpeningWarning",
    "CoreImportResult",
    "CoreItem",
    "CoreItemInput",
    "CoreItemMove",
    "CoreItemPage",
    "CoreNumberReset",
    "CoreNumberSource",
    "CoreObjectUsage",
    "CoreObjectUsageRow",
    "CoreOwnershipVersion",
    "CoreOwnershipVersionInput",
    "CorePhotoResult",
    "CoreProduct",
    "CoreProductBulkPatch",
    "CoreProductCreate",
    "CoreProductCustomInput",
    "CoreProductExport",
    "CoreProductExportRequest",
    "CoreProductFieldDefinition",
    "CoreProductFieldSchema",
    "CoreProductIdentifier",
    "CoreProductIdentifierInput",
    "CoreProductIdentifierKind",
    "CoreProductIdentifierPage",
    "CoreProductIdentifierPatch",
    "CoreProductImportApplyRequest",
    "CoreProductImportDiff",
    "CoreProductImportField",
    "CoreProductImportFinishRequest",
    "CoreProductImportInspectRequest",
    "CoreProductImportIssue",
    "CoreProductImportIssuePage",
    "CoreProductImportMapping",
    "CoreProductImportMappingState",
    "CoreProductImportMode",
    "CoreProductImportRun",
    "CoreProductImportSheet",
    "CoreProductImportStatus",
    "CoreProductImportUploadSession",
    "CoreProductImportUploadSessionRequest",
    "CoreProductKind",
    "CoreProductPage",
    "CoreProductPatch",
    "CoreProductRecordKind",
    "CoreProductTransferFormat",
    "CoreProductTransferKind",
    "CoreReferenceItem",
    "CoreReferenceItemPage",
    "CoreReferenceRef",
    "CoreReferenceResolveRequest",
    "CoreReferenceResolveResult",
    "CoreReferenceVerdict",
    "CoreRegister",
    "CoreRegisterBalancePage",
    "CoreRegisterBalanceRow",
    "CoreRegisterCreate",
    "CoreRegisterDimension",
    "CoreRegisterEntry",
    "CoreRegisterEntryPage",
    "CoreRegisterKind",
    "CoreRegisterPage",
    "CoreRegisterPatch",
    "CoreRegisterResource",
    "CoreRegisterTurnoverPage",
    "CoreRegisterTurnoverRow",
    "CoreTrialBalance",
    "CoreTrialBalanceRow",
    "CoreTrialBalanceTotals",
    "CoreUIState",
    "Customer",
    "CustomerCreate",
    "CustomerNeed",
    "CustomerNeedCreate",
    "CustomerNeedPage",
    "CustomerNeedUpdate",
    "CustomerPage",
    "CustomerUpdate",
    "Cycle",
    "CycleCreate",
    "CycleOwnerType",
    "CyclePage",
    "CycleStatus",
    "CycleUpdate",
    "DeveloperAccepted",
    "DeveloperAccount",
    "DeveloperAccountStatus",
    "DeveloperApplication",
    "DeveloperApplicationInput",
    "DeveloperApplicationResult",
    "DeveloperApplicationStatus",
    "DeveloperProfile",
    "DeveloperRegistrationInput",
    "DeveloperSession",
    "DeveloperSessionInput",
    "DeveloperSignInLinkInput",
    "DiscussionComment",
    "DiscussionCommentCreate",
    "DiscussionCommentPage",
    "DiscussionCommentUpdate",
    "DiscussionOwnerType",
    "DocumentCreate",
    "DocumentOwnerType",
    "DocumentPage",
    "DocumentUpdate",
    "DurationMetric",
    "EmptyObject",
    "Error",
    "FileUpload",
    "FinanceAccount",
    "FinanceAccountCreate",
    "FinanceAccountPage",
    "FinanceAccountPatch",
    "FinanceBalanceItem",
    "FinanceBalanceReport",
    "FinanceBalanceSection",
    "FinanceCashflowEntry",
    "FinanceCashflowEntryCategorize",
    "FinanceCashflowEntryKind",
    "FinanceCashflowEntryPage",
    "FinanceCashflowItem",
    "FinanceCashflowReport",
    "FinanceCashflowSection",
    "FinanceClassificationSuggestion",
    "FinanceCommercialPosition",
    "FinanceCompanyMatch",
    "FinanceCompanyMatchError",
    "FinanceCompanySuggestion",
    "FinanceConnector",
    "FinanceConnectorAccount",
    "FinanceConnectorAccountPage",
    "FinanceConnectorAccountPatch",
    "FinanceConnectorAuthKind",
    "FinanceConnectorConsent",
    "FinanceConnectorCreate",
    "FinanceConnectorCredentialTestInput",
    "FinanceConnectorCredentialTestResult",
    "FinanceConnectorMTLSInput",
    "FinanceConnectorMTLSStatus",
    "FinanceConnectorPage",
    "FinanceConnectorPatch",
    "FinanceConnectorProvider",
    "FinanceConnectorProviderKey",
    "FinanceConnectorProviderPage",
    "FinanceConnectorStatementCheck",
    "FinanceConnectorStatus",
    "FinanceConnectorSyncIntervalOption",
    "FinanceConnectorSyncResult",
    "FinanceConnectorSyncRun",
    "FinanceConnectorSyncRunPage",
    "FinanceConnectorSyncSettings",
    "FinanceConnectorSyncSettingsInput",
    "FinanceCounterpartyTerms",
    "FinanceCounterpartyTermsCreate",
    "FinanceDirection",
    "FinanceDirectoryCompany",
    "FinanceDividendDecisionInput",
    "FinanceDividendDecisionInputRowsItem",
    "FinanceDividendPolicyInput",
    "FinanceDividendPolicyInputParticipantsItem",
    "FinanceExchangeApply",
    "FinanceExchangeCreate",
    "FinanceExchangeItem",
    "FinanceExchangePage",
    "FinanceExchangeQuarantine",
    "FinanceExchangeStatus",
    "FinanceImportApply",
    "FinanceImportDiff",
    "FinanceImportField",
    "FinanceImportInspect",
    "FinanceImportIssue",
    "FinanceImportItemMappingRequest",
    "FinanceImportKind",
    "FinanceImportMapping",
    "FinanceImportRun",
    "FinanceImportSheet",
    "FinanceImportStatus",
    "FinanceImportUpload",
    "FinanceOpenAdvance",
    "FinanceOpeningBalanceRequest",
    "FinancePaymentCalendar",
    "FinancePaymentCalendarCell",
    "FinancePaymentCalendarCompany",
    "FinancePaymentCalendarDay",
    "FinancePaymentCalendarPeriod",
    "FinancePaymentCalendarRow",
    "FinancePaymentCalendarSource",
    "FinancePaymentFact",
    "FinancePaymentFactPage",
    "FinancePaymentPlan",
    "FinancePaymentPlanExecute",
    "FinancePaymentPlanInput",
    "FinancePaymentSourceKind",
    "FinancePayoutRegister",
    "FinancePayoutRegisterPage",
    "FinancePayoutRegisterStatus",
    "FinancePayoutSheetRequest",
    "FinancePayoutSheetRow",
    "FinancePayrollAccrualPayload",
    "FinancePayrollAccrualRow",
    "FinancePayrollDocumentCreate",
    "FinancePayrollDocumentRefs",
    "FinancePayrollDocumentTypeKey",
    "FinancePayrollImportInspection",
    "FinancePayrollImportPreview",
    "FinancePayrollImportRow",
    "FinancePayrollImportSheet",
    "FinancePayrollJournal",
    "FinancePayrollJournalRow",
    "FinancePayrollJournalTotals",
    "FinancePayrollPaymentPayload",
    "FinancePayrollPaymentRow",
    "FinancePeriodCheck",
    "FinancePeriodCheckPage",
    "FinancePnlCoverage",
    "FinancePnlCoverageItem",
    "FinancePnlEntry",
    "FinancePnlEntryPage",
    "FinancePnlFormulaToken",
    "FinancePnlItem",
    "FinancePnlItemPage",
    "FinancePnlLayout",
    "FinancePnlLayoutCreate",
    "FinancePnlLayoutPage",
    "FinancePnlLayoutRow",
    "FinancePnlLayoutSave",
    "FinancePnlLine",
    "FinancePnlReport",
    "FinancePnlReportLayout",
    "FinancePnlReportRow",
    "FinanceProject",
    "FinanceProjectBudget",
    "FinanceProjectBudgetInput",
    "FinanceProjectBudgetLine",
    "FinanceProjectLine",
    "FinanceProjectReport",
    "FinanceReconciliation",
    "FinanceReconciliationAccount",
    "FinanceReconciliationDay",
    "FinanceReconciliationDayReason",
    "FinanceReconciliationSource",
    "FinanceReconciliationStatementGap",
    "FinanceReconciliationSummary",
    "FinanceRegisterAccountCheck",
    "FinanceRegisterReconciliation",
    "FinanceRegisterRepairFailure",
    "FinanceRegisterRepairRequest",
    "FinanceRegisterRepairResult",
    "FinanceRegistersResyncResult",
    "FinanceReportColumn",
    "FinanceReportCompany",
    "FinanceRequisitesBank",
    "FinanceRequisitesLookup",
    "FinanceRequisitesParty",
    "FinanceResponsiblePatch",
    "FinanceSettlementBalance",
    "FinanceSettlementBalancePage",
    "FinanceSettlementDocumentCreate",
    "FinanceSettlementDocumentType",
    "FinanceSettlementExposure",
    "FinanceSettlementPayment",
    "FinanceSettlementPaymentPage",
    "FinanceSettlementSource",
    "FinanceSettlementSourceAllocationInput",
    "FinanceSettlementSourcePage",
    "FinanceStatement",
    "FinanceStatementCreate",
    "FinanceStatementLinkInput",
    "FinanceStatementLinkInputTransactionsItem",
    "FinanceStatementLinkResult",
    "FinanceStatementPage",
    "FinanceTradeAdvance",
    "FinanceTradeJournalPage",
    "FinanceTradeJournalRow",
    "FinanceTransaction",
    "FinanceTransactionCategorize",
    "FinanceTransactionCreate",
    "FinanceTransactionPage",
    "FinanceTransactionTotals",
    "HubCounters",
    "HubOverview",
    "HubProject",
    "HubSection",
    "HubSectionPage",
    "HubSectionUpdate",
    "HubVisibility",
    "KnowledgeACLGrant",
    "KnowledgeAccessOption",
    "KnowledgeAccessOptions",
    "KnowledgeAnswer",
    "KnowledgeAnswerFeedbackInput",
    "KnowledgeAnswerInput",
    "KnowledgeAnswerQuality",
    "KnowledgeAnswerTurn",
    "KnowledgeAsset",
    "KnowledgeCitation",
    "KnowledgeContentGap",
    "KnowledgeDocument",
    "KnowledgeIndexHealth",
    "KnowledgeMoveInput",
    "KnowledgeNode",
    "KnowledgeNodeAccessInput",
    "KnowledgeNodeAccessPolicy",
    "KnowledgeNodeInput",
    "KnowledgeReviewInput",
    "KnowledgeRevision",
    "KnowledgeRevisionInput",
    "KnowledgeRevisionRestoreInput",
    "KnowledgeSearchResult",
    "KnowledgeSpace",
    "KnowledgeSpaceAccessInput",
    "KnowledgeSpaceAccessPolicy",
    "KnowledgeSpaceInput",
    "KnowledgeTag",
    "KnowledgeTagInput",
    "KnowledgeTagSetInput",
    "KnowledgeVersionInput",
    "Link",
    "LinkCreate",
    "LinkList",
    "ManagedChecklistItem",
    "ManagedChecklistPatch",
    "MarketplaceEconBaseRow",
    "MarketplaceEconOverrides",
    "MarketplaceEconOzonInput",
    "MarketplaceEconQuoteItem",
    "MarketplaceEconQuoteRequest",
    "MarketplaceEconQuoteResponse",
    "MarketplaceEconQuoteRow",
    "MarketplaceEconResult",
    "MarketplaceEconWbInput",
    "MarketplaceOzonCost",
    "MarketplaceOzonCostRequest",
    "MarketplaceOzonDecomposition",
    "MarketplaceOzonDecompositionArticle",
    "MarketplaceOzonDecompositionCell",
    "MarketplaceOzonDecompositionMonth",
    "MarketplaceOzonDecompositionOtherBlock",
    "MarketplaceOzonDecompositionOtherItem",
    "MarketplaceOzonDecompositionOtherPage",
    "MarketplaceOzonDecompositionPeriod",
    "MarketplaceOzonFbs",
    "MarketplaceOzonFbsFunnelStage",
    "MarketplaceOzonFbsPosting",
    "MarketplaceOzonFbsSpeedBucket",
    "MarketplaceOzonFbsTiles",
    "MarketplaceOzonFbsTotals",
    "MarketplaceOzonFbsWarehouse",
    "MarketplaceOzonFunnel",
    "MarketplaceOzonFunnelDaily",
    "MarketplaceOzonFunnelDailyArticle",
    "MarketplaceOzonFunnelDailyCard",
    "MarketplaceOzonFunnelDailySeries",
    "MarketplaceOzonFunnelDailyTotals",
    "MarketplaceOzonFunnelRow",
    "MarketplaceOzonFunnelTotals",
    "MarketplaceOzonOrdersDailyRow",
    "MarketplaceOzonOrdersKpi",
    "MarketplaceOzonOrdersOverview",
    "MarketplaceOzonOrdersProductRow",
    "MarketplaceOzonPnl",
    "MarketplaceOzonPnlPeriod",
    "MarketplaceOzonPnlRange",
    "MarketplaceOzonPnlRow",
    "MarketplaceOzonPricing",
    "MarketplaceOzonPricingRow",
    "MarketplaceOzonProduct",
    "MarketplaceOzonProductFacets",
    "MarketplaceOzonProductPage",
    "MarketplaceOzonPromotion",
    "MarketplaceOzonPromotions",
    "MarketplaceOzonStockProduct",
    "MarketplaceOzonStockWarehouse",
    "MarketplaceOzonStocksPage",
    "MarketplaceOzonSyncJob",
    "MarketplaceOzonSyncJobList",
    "MarketplaceProductGroup",
    "MarketplaceProductGroupInput",
    "MarketplaceProductGroupItem",
    "MarketplaceProductGroupItemPage",
    "MarketplaceProductGroupItemsAdded",
    "MarketplaceProductGroupItemsInput",
    "MarketplaceProductGroupPage",
    "MarketplaceProductGroupPatch",
    "MarketplaceProductGroupPlatform",
    "MarketplaceStore",
    "MarketplaceStoreInput",
    "MarketplaceStorePage",
    "MarketplaceStorePatch",
    "MarketplaceWbCardAdDay",
    "MarketplaceWbCardBoard",
    "MarketplaceWbCardFunnelDay",
    "MarketplaceWbCardMeta",
    "MarketplaceWbCardOption",
    "MarketplaceWbCardOptions",
    "MarketplaceWbCost",
    "MarketplaceWbCostRequest",
    "MarketplaceWbDecompOther",
    "MarketplaceWbDecompOtherItem",
    "MarketplaceWbDecomposition",
    "MarketplaceWbDecompositionArticle",
    "MarketplaceWbDecompositionMonth",
    "MarketplaceWbDecompositionOther",
    "MarketplaceWbDecompositionPeriod",
    "MarketplaceWbFacets",
    "MarketplaceWbFunnel",
    "MarketplaceWbFunnelDaily",
    "MarketplaceWbFunnelDailyArticle",
    "MarketplaceWbFunnelDailyCard",
    "MarketplaceWbFunnelRow",
    "MarketplaceWbFunnelTotals",
    "MarketplaceWbMetricCell",
    "MarketplaceWbOrdersDay",
    "MarketplaceWbOrdersKpi",
    "MarketplaceWbOrdersOverview",
    "MarketplaceWbOrdersOverviewKpi",
    "MarketplaceWbOrdersProduct",
    "MarketplaceWbPnl",
    "MarketplaceWbPnlPeriod",
    "MarketplaceWbPnlRow",
    "MarketplaceWbPricing",
    "MarketplaceWbPricingRow",
    "MarketplaceWbProduct",
    "MarketplaceWbProductPage",
    "MarketplaceWbPromotion",
    "MarketplaceWbPromotions",
    "MarketplaceWbStockPage",
    "MarketplaceWbStockProduct",
    "MarketplaceWbStockWarehouse",
    "MarketplaceYandexCost",
    "MarketplaceYandexCostInput",
    "MarketplaceYandexOrdersDay",
    "MarketplaceYandexOrdersKpi",
    "MarketplaceYandexOrdersOverview",
    "MarketplaceYandexOrdersOverviewKpi",
    "MarketplaceYandexOrdersProduct",
    "MarketplaceYandexPnl",
    "MarketplaceYandexPnlRange",
    "MarketplaceYandexPnlPeriod",
    "MarketplaceYandexPnlRow",
    "MarketplaceYandexProduct",
    "MarketplaceYandexProductPage",
    "Meeting",
    "MeetingCreate",
    "MeetingItem",
    "MeetingItemInput",
    "MeetingItemKind",
    "MeetingKind",
    "MeetingPage",
    "MeetingParticipant",
    "MeetingParticipantInput",
    "MeetingStatus",
    "MeetingUpdate",
    "Member",
    "MemberAssignment",
    "Milestone",
    "MilestoneCreate",
    "MilestonePage",
    "MilestoneUpdate",
    "OK",
    "PlatformApp",
    "PlatformAppBlockList",
    "PlatformAppConsentDiff",
    "PlatformAppConsentRequired",
    "PlatformAppDataPolicy",
    "PlatformAppDeliveryHealth",
    "PlatformAppHealthCheck",
    "PlatformAppInstallResult",
    "PlatformAppInstallation",
    "PlatformAppInstallationEvent",
    "PlatformAppInstallationEventPage",
    "PlatformAppInstallationStatus",
    "PlatformAppManifestBlock",
    "PlatformAppManifestPermissions",
    "PlatformAppPublisher",
    "PlatformAppPublisherStatus",
    "PlatformAppReasonInput",
    "PlatformAppRollbackResult",
    "PlatformAppStatus",
    "PlatformAppSwitchResult",
    "PlatformAppUninstallNotice",
    "PlatformAppUnparkResult",
    "PlatformAppUpdateInput",
    "PlatformAppUpdateResult",
    "PlatformAppVersion",
    "PlatformAppVersionStatus",
    "Project",
    "ProjectCreate",
    "ProjectFileFolder",
    "ProjectFileFolderCreate",
    "ProjectFileFolderPage",
    "ProjectFileFolderRename",
    "ProjectFileUpload",
    "ProjectPage",
    "ProjectUpdate",
    "PullRequest",
    "PullRequestCreate",
    "PullRequestOwnerType",
    "PullRequestPage",
    "PullRequestUpdate",
    "Relation",
    "RelationCreate",
    "RelationDirection",
    "RelationKind",
    "RelationList",
    "ScrumSection",
    "ScrumSettings",
    "ScrumSettingsPage",
    "ScrumSettingsUpdate",
    "ScrumTeamMember",
    "Section",
    "SectionCreate",
    "SectionMember",
    "SectionMemberAssignment",
    "SectionMemberPreview",
    "SectionPage",
    "SectionRole",
    "SectionUpdate",
    "SettingsApiKey",
    "SettingsApiKeyAccessEntry",
    "SettingsApiKeyAccessPage",
    "SettingsApiKeyActivationResult",
    "SettingsApiKeyCreated",
    "SettingsApiKeyInput",
    "SettingsApiKeyPage",
    "SettingsAppCatalog",
    "SettingsAppCatalogEntry",
    "SettingsAppConsentPermission",
    "SettingsAppConsentPreview",
    "SettingsAppConsentResult",
    "SettingsAppConsentSheet",
    "SettingsAppConsentSlot",
    "SettingsAppConsentSubscription",
    "SettingsAppConsentSupport",
    "SettingsAppDeclaredSlot",
    "SettingsAppExposureReport",
    "SettingsAppIncident",
    "SettingsAppIncidentList",
    "SettingsAppInstallInput",
    "SettingsAppInstallation",
    "SettingsAppInstallationPage",
    "SettingsAppLocalizedText",
    "SettingsAppPublisherCard",
    "SettingsAppVersion",
    "SettingsCompany",
    "SettingsCompanyAccountingMethodInput",
    "SettingsCompanyInput",
    "SettingsCompanyPage",
    "SettingsFieldDefinition",
    "SettingsFieldDefinitionInput",
    "SettingsFieldDefinitionPage",
    "SettingsFieldSchema",
    "SettingsMember",
    "SettingsMemberCreateInput",
    "SettingsMemberPage",
    "SettingsMemberPatch",
    "SettingsRole",
    "SettingsRoleActivationInput",
    "SettingsRoleActivationResult",
    "SettingsRoleInput",
    "SettingsRolePage",
    "SettingsRoleTransferInput",
    "SettingsRoleTransferResult",
    "SettingsVatRates",
    "SprintAgingTask",
    "SprintMetrics",
    "SprintOutcomeMetrics",
    "SprintSizing",
    "SprintThroughputPoint",
    "Status",
    "StatusCategory",
    "StatusCreate",
    "StatusDelete",
    "StatusDuration",
    "StatusHealth",
    "StatusMetrics",
    "StatusPage",
    "StatusReorder",
    "StatusReorderItem",
    "StatusTransition",
    "StatusUpdate",
    "StatusUpdateCreate",
    "StatusUpdatePage",
    "StatusUpdatePatch",
    "StockBatch",
    "StockBatchPage",
    "StockCompanyPolicy",
    "StockCompanyPolicyPage",
    "StockCompanyPolicyPatch",
    "StockCompanyRef",
    "StockCompanyRefPage",
    "StockDocumentCreate",
    "StockDocumentCreateTypeKey",
    "StockDocumentFulfillment",
    "StockDocumentFulfillmentLine",
    "StockDocumentFulfillmentPage",
    "StockDocumentLandedCostTarget",
    "StockDocumentLine",
    "StockDocumentLineHandlingAllocation",
    "StockDocumentLineHandlingUnit",
    "StockDocumentPage",
    "StockDocumentPatch",
    "StockDocumentPayload",
    "StockDocumentRefs",
    "StockDocumentTypeKey",
    "StockExport",
    "StockExportRequest",
    "StockHandlingUnit",
    "StockHandlingUnitCard",
    "StockHandlingUnitPage",
    "StockHandlingUnitState",
    "StockHandlingUnitStatus",
    "StockHandlingUnitStatusPatch",
    "StockHandlingUnitSuggestion",
    "StockHandlingUnitSuggestionResult",
    "StockImportApplyRequest",
    "StockImportDiff",
    "StockImportInspectRequest",
    "StockImportKind",
    "StockImportRun",
    "StockImportStatus",
    "StockInventoryChange",
    "StockInventoryChangePage",
    "StockInventoryCount",
    "StockInventoryCountSheet",
    "StockInventoryCountSheetItem",
    "StockInventoryCountsInput",
    "StockInventoryCreatePayload",
    "StockInventoryDeriveResult",
    "StockInventoryFilter",
    "StockInventoryFinishInput",
    "StockInventoryRefreshInput",
    "StockInventoryWorkflow",
    "StockProductUOM",
    "StockProductUOMInput",
    "StockProductUOMPage",
    "StockProductUOMUsage",
    "StockPurchaseOrderCreate",
    "StockPurchaseOrderLineInput",
    "StockReorderRule",
    "StockReorderRuleInput",
    "StockReorderRulePage",
    "StockReorderRulePatch",
    "StockReportDrilldown",
    "StockReportDrilldownEntry",
    "StockReportOverduePage",
    "StockReportOverdueReservation",
    "StockReportPage",
    "StockReportPurchasingPage",
    "StockReportPurchasingRow",
    "StockReportPurchasingSource",
    "StockReportReservationLine",
    "StockReportReservationPage",
    "StockReportReservationSummary",
    "StockReportRow",
    "StockScanResult",
    "StockSettings",
    "StockSettingsPatch",
    "StockSupplier",
    "StockSupplierPage",
    "StockValuationPreviewRequest",
    "StockValuationRebuildRequest",
    "StockValuationResult",
    "StockValuationRun",
    "StockValuationStep",
    "StockWarehouse",
    "StockWarehouseBlocker",
    "StockWarehouseBlockerCheck",
    "StockWarehouseInput",
    "StockWarehousePage",
    "StockWarehousePatch",
    "Subtask",
    "Tag",
    "TagAttach",
    "TagPage",
    "Task",
    "TaskCreate",
    "TaskDocument",
    "TaskMove",
    "TaskPage",
    "TaskPriority",
    "TaskTag",
    "TaskTagCatalogItem",
    "TaskTagCreate",
    "TaskTagPage",
    "TaskTagUpdate",
    "TaskTemplate",
    "TaskTemplateCreate",
    "TaskTemplatePage",
    "TaskTemplateUpdate",
    "TaskUpdate",
    "TaskView",
    "TaskViewCreate",
    "TaskViewPage",
    "TaskWatcher",
    "TasksSnapshot",
    "TemplateRecurrence",
    "TemplateRunPage",
    "TemplateRunResult",
    "UUID",
    "WorkflowStatusUpdate",
    "CoreListBusinessesResponse",
    "CoreSetBusinessActiveRequest",
    "CoreListBusinessOwnershipResponse",
    "FinanceListDividendAccessUsersResponse",
    "FinanceListDividendAccessUsersResponseResultsItem",
    "FinanceListDividendAutomationRunsResponse",
    "FinanceListDividendDecisionsResponse",
    "FinanceListDividendOwnersResponse",
    "FinanceListDividendOwnersResponseResultsItem",
    "FinanceListDividendPoliciesResponse",
    "FinanceGetProjectBudgetHistoryResponse",
]

class Activity(TypedDict):
    id: "UUID"
    action: str
    actor_name: Optional[str]
    created_at: str

ActivityList = List["Activity"]

class AppFinanceClassificationSuggestionAccepted(TypedDict):
    """Ответ расширению. Ровно то, что оно прислало само, плюс идентификатор строки и её состояние: ни назначения платежа, ни суммы, ни имени статьи здесь нет — иначе право писать рекомендации стало бы правом читать операции."""

    suggestion_id: "UUID"
    transaction: "UUID"
    #: pending, пока человек не решил. Повторный ответ той же установки на ту же операцию обновляет строку, а не заводит вторую
    status: Literal['pending', 'accepted', 'rejected']
    updated_at: str

class _AppFinanceClassificationSuggestionInputRequired(TypedDict):
    #: Статья ДДС ссылкой. Ключ справочника — core.items; статья, не участвующая в ДДС, отклоняется кодом directory_entry_unknown
    cashflow_item: "AppFinanceClassificationSuggestionInputCashflowItem"
    #: Доля единицы, не проценты. Значение вне диапазона отклоняется кодом confidence_out_of_range: приславший 87 имел в виду проценты, и принять это молча значит показать человеку уверенность 8700 %.
    confidence: float
    #: Обе половины обязательны — кабинет с английским интерфейсом не должен читать объяснение по-русски
    explanation: "AppFinanceClassificationSuggestionInputExplanation"

class AppFinanceClassificationSuggestionInput(_AppFinanceClassificationSuggestionInputRequired, total=False):
    """Ответ расширения на точку finance.classification_provider.v1. Автора в теле нет: установка, приложение и версия берутся из токена — иначе первое же расширение подписало бы рекомендацию соседним."""

    #: Контрагент ссылкой, ключ справочника core.contacts. Необязателен: у половины операций он уже проставлен банком
    contact: Optional["AppFinanceDirectoryRef"]

class AppFinanceClassificationSuggestionInputCashflowItem(TypedDict):
    """Статья ДДС ссылкой. Ключ справочника — core.items; статья, не участвующая в ДДС, отклоняется кодом directory_entry_unknown"""

    #: Полное имя справочника: core.items или core.contacts
    directory_key: str
    id: "UUID"

class AppFinanceClassificationSuggestionInputExplanation(TypedDict):
    """Обе половины обязательны — кабинет с английским интерфейсом не должен читать объяснение по-русски"""

    ru: str
    en: str

class AppFinanceDirectoryRef(TypedDict):
    """Ссылка на запись справочника: ключ и идентификатор. Голый UUID здесь не принимается — он доказывает, что строка есть, и ничего не говорит о том, из какого она справочника и чья. Ключ не тот — отказ directory_mismatch, записи нет в этом кабинете — directory_entry_unknown."""

    #: Полное имя справочника: core.items или core.contacts
    directory_key: str
    id: "UUID"

class AppRuntimeConfig(TypedDict):
    values: List["AppRuntimeConfigValue"]
    #: Обязательные поля манифеста без значения. Непустой список означает «не настроено», а не «сломано»
    missing: List[str]

class _AppRuntimeConfigValueRequired(TypedDict):
    key: str
    #: Как значение ХРАНИТСЯ. Истина означает, что value пуст и остаётся пустым: за значением идут краткосрочной выдачей
    secret: bool
    #: Просит ли эту настройку версия, которая стоит сейчас; ложь означает значение от прошлой версии
    declared: bool
    #: Значение задано
    set: bool

class AppRuntimeConfigValue(_AppRuntimeConfigValueRequired, total=False):
    #: Значение ОБЫЧНОЙ настройки. У секрета отсутствует всегда
    value: str
    updated_at: str

class AppRuntimeInstallation(TypedDict):
    tenant: "AppRuntimeTenant"
    installation_id: "UUID"
    status: Literal['pending', 'active', 'suspended', 'revoked']
    #: Пространство имён приложения app.<издатель>.<ключ> — единственное, в котором оно вправе объявлять свои справочники
    namespace: str
    publisher: str
    key: str
    #: Версия, которая стоит у кабинета сейчас; её манифест и режет права
    version: str
    #: Действующий набор: пересечение одобренного кабинетом, объявленного версией и записанного в токен
    scopes: List[str]
    #: Куда Akeda везёт события этой установки. Только чтение: сменить адрес через внешний контур нельзя, это делает персонал платформы по заявке издателя
    delivery_endpoint_url: str
    token_id: "UUID"
    #: Когда предъявленный токен перестанет работать
    token_expires_at: str

class AppRuntimeLease(TypedDict):
    key: str
    #: Значение секрета. Уходит вызывающему один раз и не возвращается больше никаким ответом
    value: str
    issued_at: str
    #: Контракт «после этого забирай заново». Срок платформа на чужой стороне не исполняет: работают журнал обращений и отзыв установки
    expires_at: str
    audit_id: "UUID"

class AppRuntimeLeaseInput(TypedDict, total=False):
    #: Запрошенный срок выдачи. Ноль или отсутствие поля означают умолчание сервера (пять минут), значение сверх потолка — отказ
    ttl_seconds: int

class AppRuntimeSlotActor(TypedDict):
    """Человек, открывший панель, в том объёме, в каком приложению позволено его знать. Полей ровно три, и четвёртого не появится: имя и почта — это штат клиента, роли — его оргструктура, а числовой идентификатор общий на всю платформу и связал бы два кабинета между собой."""

    #: Псевдоним, свой у каждой пары «установка + человек». Устойчив внутри установки, поэтому панель помнит выбор сотрудника; в другой установке того же приложения у того же человека он ДРУГОЙ; умирает вместе с установкой
    subject: "UUID"
    #: Язык интерфейса человека: слот обязан показывать текст на русском и английском, и без языка он показал бы не тот
    locale: Literal['ru', 'en']
    #: Тема кабинета. Слот, объявивший themeAware, без неё исполнить объявленное не может
    theme: Literal['light', 'dark']

class _AppRuntimeSlotAnchorRequired(TypedDict):
    #: Модуль экрана, с которого открыли панель
    module: str

class AppRuntimeSlotAnchor(_AppRuntimeSlotAnchorRequired, total=False):
    """Экран и запись, рядом с которыми стоит слот. Модуль назван всегда — по нему считается право ЧЕЛОВЕКА на запуск; вид и запись есть только у слота, стоящего на карточке. Само содержимое записи здесь не приезжает: читать её приложение идёт в public API своими одобренными scopes."""

    #: Вид записи. Отсутствует у слота без карточки
    entity: str
    #: Идентификатор записи: uuid, код или номер документа
    entity_id: str

class AppRuntimeSlotLaunch(TypedDict):
    tenant: "AppRuntimeTenant"
    installation_id: "UUID"
    #: Ключ слота с версией: место на экране, откуда открыли панель
    slot: str
    #: Тот же nonce, что прислала страница: по нему сервер расширения связывает погашенный запуск с конкретной рамкой, не веря на слово ей самой
    nonce: str
    actor: "AppRuntimeSlotActor"
    anchor: "AppRuntimeSlotAnchor"
    #: Источник, из которого оболочка загрузила рамку. Пусто, если кабинет успел обновить приложение на версию без этого слота: запуск был разрешён по прежнему объявлению и обрывать его незачем
    origin: str
    issued_at: str
    redeemed_at: str
    #: Строка журнала установки об этом погашении
    audit_id: "UUID"

class AppRuntimeSlotLaunchInput(TypedDict):
    #: Одноразовый токен запуска (`al_…`), который оболочка передала странице сообщением akeda.slot.launch. Учётными данными не является: без токена установки он не открывает ничего
    token: str
    #: Значение, которое страница расширения придумала сама и прислала оболочке сообщением akeda.slot.ready. Секретом не является — оно доказывает, что запуск отвечает именно на этот запрос страницы
    nonce: str

class AppRuntimeTenant(TypedDict):
    id: "UUID"
    #: Канонический slug кабинета из справочника, а не строка заголовка; его же ставят в X-Tenant следующего запроса
    slug: str

class ArchiveTransfer(TypedDict, total=False):
    target_section: "UUID"

class Attachment(TypedDict):
    id: "UUID"
    owner_type: str
    owner_id: "UUID"
    folder_id: Optional["UUID"]
    name: str
    mime_type: str
    size_bytes: int
    kind: str
    url: str
    content_path: str
    public_url: str
    markdown: str
    uploaded_by: Optional[int]
    uploader: str
    created_at: str

class _AttachmentDownloadSessionRequired(TypedDict):
    attachment: "Attachment"
    url: str
    method: str
    expires_at: str

class AttachmentDownloadSession(_AttachmentDownloadSessionRequired, total=False):
    headers: Dict[str, str]

class AttachmentMove(TypedDict):
    folder_id: Optional[str]

AttachmentOwnerType = Literal['task', 'section', 'project', 'comment', 'meeting', 'document']

class AttachmentPage(TypedDict):
    count: int
    results: List["Attachment"]

class _AttachmentReplacementSessionCreateRequired(TypedDict):
    filename: str
    size_bytes: int

class AttachmentReplacementSessionCreate(_AttachmentReplacementSessionCreateRequired, total=False):
    mime_type: str
    sha256: str

class _AttachmentUploadSessionRequired(TypedDict):
    id: "UUID"
    attachment_id: "UUID"
    owner_type: "AttachmentOwnerType"
    owner_id: "UUID"
    uploaded_by: int
    name: str
    mime_type: str
    size_bytes: int
    status: str
    expires_at: str
    created_at: str

class AttachmentUploadSession(_AttachmentUploadSessionRequired, total=False):
    replace_attachment_id: "UUID"
    sha256: str
    completed_at: str
    upload_url: str
    method: str
    headers: Dict[str, str]
    fields: Dict[str, str]
    file_field: str
    max_bytes: int

class _AttachmentUploadSessionCreateRequired(TypedDict):
    owner_type: "AttachmentOwnerType"
    owner_id: "UUID"
    filename: str
    size_bytes: int

class AttachmentUploadSessionCreate(_AttachmentUploadSessionCreateRequired, total=False):
    mime_type: str
    sha256: str

class _CRMActivityRequired(TypedDict):
    id: "UUID"
    entity_type: Literal['lead', 'deal']
    entity_id: "UUID"
    #: Ключ факта; note - заметка сотрудника
    action: str
    details: Optional[Dict[str, Any]]
    actor_id: int
    created_at: str

class CRMActivity(_CRMActivityRequired, total=False):
    """Лента только дописывается"""

    actor_name: str

class CRMAnalytics(TypedDict):
    """Живая витрина по всему кабинету; суммы в валюте сделки"""

    stages: Optional[List["CRMStageMetric"]]
    conversion: "CRMConversionMetric"
    #: Сумма открытых сделок, взвешенная вероятностью
    weighted_forecast: int
    loss_reasons: Optional[List["CRMLossReasonMetric"]]
    sla: "CRMSLAMetric"
    manager_workload: Optional[List["CRMManagerWorkload"]]
    lead_sources: Optional[List["CRMSourceMetric"]]

class _CRMAutomationActionRequired(TypedDict):
    type: Literal['assign_owner', 'create_task', 'create_event', 'internal_notification']

class CRMAutomationAction(_CRMAutomationActionRequired, total=False):
    #: Обязателен для assign_owner
    owner_id: int
    #: Обязателен для create_task и create_event
    title: str
    description: str
    section_id: "UUID"
    starts_at: str
    ends_at: str
    timezone: str

class CRMAutomationActionJournal(TypedDict):
    action_index: int
    status: Literal['success', 'failed', 'skipped']
    detail: str
    created_at: str
    updated_at: str

CRMAutomationEventType = Literal['lead.created', 'lead.qualified', 'deal.created', 'deal.stage_changed', 'inbox.message_received']

class CRMAutomationRule(TypedDict):
    id: "UUID"
    name: str
    event_type: "CRMAutomationEventType"
    #: Допустимые ключи - status, stage_id, owner_id
    conditions: Optional[Dict[str, str]]
    actions: Optional[List["CRMAutomationAction"]]
    is_enabled: bool
    created_by: int
    created_at: str
    updated_at: str

class _CRMAutomationRuleInputRequired(TypedDict):
    name: str
    event_type: "CRMAutomationEventType"
    actions: List["CRMAutomationAction"]

class CRMAutomationRuleInput(_CRMAutomationRuleInputRequired, total=False):
    conditions: Optional[Dict[str, str]]
    is_enabled: bool

class CRMAutomationRun(TypedDict):
    id: "UUID"
    rule_id: "UUID"
    event_id: "UUID"
    status: Literal['queued', 'running', 'success', 'failed', 'skipped']
    attempts: int
    action_errors: Optional[List[str]]
    created_at: str
    updated_at: str

class _CRMContactRefRequired(TypedDict):
    id: "UUID"
    name: str
    entity_type: str
    is_active: bool
    #: false, когда карточка недоступна текущему пользователю
    available: bool

class CRMContactRef(_CRMContactRefRequired, total=False):
    """Узкая проекция карточки справочника ERP; CRM её не редактирует"""

    legal_name: str

class CRMConversionMetric(TypedDict):
    qualified_leads: int
    converted_leads: int
    rate: float

class _CRMConvertLeadInputRequired(TypedDict):
    pipeline_id: "UUID"
    stage_id: "UUID"
    title: str

class CRMConvertLeadInput(_CRMConvertLeadInputRequired, total=False):
    amount: int
    currency: str
    probability: int
    expected_close_at: Optional[str]

class _CRMCreateEventLinkInputRequired(TypedDict):
    title: str
    starts_at: str
    ends_at: str

class CRMCreateEventLinkInput(_CRMCreateEventLinkInputRequired, total=False):
    description: str
    #: IANA-зона события
    timezone: str

class _CRMCreateHubMeetingInputRequired(TypedDict):
    project_id: str
    calendar_event_id: "UUID"

class CRMCreateHubMeetingInput(_CRMCreateHubMeetingInputRequired, total=False):
    title: str
    starts_at: str

class _CRMCreateTaskLinkInputRequired(TypedDict):
    section_id: "UUID"
    title: str

class CRMCreateTaskLinkInput(_CRMCreateTaskLinkInputRequired, total=False):
    description: str
    due_at: Optional[str]

class _CRMCustomerRequired(TypedDict):
    id: "UUID"
    kind: Literal['person', 'company']
    name: str
    legal_name: str
    phone: str
    email: str
    #: Ник или номер клиента по мессенджерам
    messengers: Optional[Dict[str, str]]
    tags: Optional[List[str]]
    source: str
    note: str
    open_deals: int
    created_at: str
    updated_at: str

class CRMCustomer(_CRMCustomerRequired, total=False):
    owner_id: int
    owner_name: str
    core_contact_id: "UUID"
    #: Момент переноса в справочник контрагентов ERP
    promoted_at: str
    archived_at: str

class _CRMCustomerDuplicateRequired(TypedDict):
    id: "UUID"
    kind: Literal['person', 'company']
    name: str
    legal_name: str
    phone: str
    email: str
    #: Ник или номер клиента по мессенджерам
    messengers: Optional[Dict[str, str]]
    tags: Optional[List[str]]
    source: str
    note: str
    open_deals: int
    created_at: str
    updated_at: str
    matched_by: Literal['name', 'phone']

class CRMCustomerDuplicate(_CRMCustomerDuplicateRequired, total=False):
    owner_id: int
    owner_name: str
    core_contact_id: "UUID"
    #: Момент переноса в справочник контрагентов ERP
    promoted_at: str
    archived_at: str

class _CRMCustomerInputRequired(TypedDict):
    name: str

class CRMCustomerInput(_CRMCustomerInputRequired, total=False):
    kind: Literal['person', 'company']
    legal_name: str
    phone: str
    email: str
    messengers: Optional[Dict[str, str]]
    tags: Optional[List[str]]
    source: str
    owner_id: Optional[int]
    note: str

class CRMCustomerPatch(TypedDict, total=False):
    kind: Literal['person', 'company']
    name: str
    legal_name: str
    phone: str
    email: str
    messengers: Optional[Dict[str, str]]
    tags: Optional[List[str]]
    source: str
    owner_id: Optional[int]
    note: str
    archived: bool

class _CRMDealRequired(TypedDict):
    id: "UUID"
    pipeline_id: "UUID"
    stage_id: "UUID"
    title: str
    amount: int
    #: Код валюты из справочника ERP
    currency: str
    #: Канал обращения; manual для ручного заведения
    source: str
    probability: int
    next_action: str
    created_at: str
    updated_at: str

class CRMDeal(_CRMDealRequired, total=False):
    expected_close_at: str
    owner_id: int
    customer_id: "UUID"
    crm_customer_id: "UUID"
    next_action_at: str
    archived_at: str
    closed_at: str
    loss_reason_id: "UUID"

class _CRMDealBoardRequired(TypedDict):
    pipeline_id: "UUID"
    #: false означает, что итоги в валюте учёта неполные
    totals_available: bool
    missing_rates: Optional[List[str]]
    stages: Optional[List["CRMDealBoardStage"]]

class CRMDealBoard(_CRMDealBoardRequired, total=False):
    accounting_currency: str

class _CRMDealBoardStageRequired(TypedDict):
    stage: "CRMStage"
    total_count: int
    #: Суммы по валютам сделок колонки
    original_totals: Optional[Dict[str, int]]
    cards: Optional[List["CRMDealCard"]]
    has_more: bool

class CRMDealBoardStage(_CRMDealBoardStageRequired, total=False):
    #: Сумма в валюте учёта; отсутствует при неполном покрытии курсами
    amount_in_accounting: float
    weighted_in_accounting: float

class _CRMDealCardRequired(TypedDict):
    id: "UUID"
    pipeline_id: "UUID"
    stage_id: "UUID"
    title: str
    amount: int
    #: Код валюты из справочника ERP
    currency: str
    #: Канал обращения; manual для ручного заведения
    source: str
    probability: int
    next_action: str
    created_at: str
    updated_at: str

class CRMDealCard(_CRMDealCardRequired, total=False):
    expected_close_at: str
    owner_id: int
    customer_id: "UUID"
    crm_customer_id: "UUID"
    next_action_at: str
    archived_at: str
    closed_at: str
    loss_reason_id: "UUID"
    customer_name: str
    owner_name: str

class CRMDealContact(TypedDict):
    id: "UUID"
    deal_id: "UUID"
    contact_id: "UUID"
    is_primary: bool
    created_at: str

class _CRMDealContactInputRequired(TypedDict):
    contact_id: "UUID"

class CRMDealContactInput(_CRMDealContactInputRequired, total=False):
    is_primary: bool

class _CRMDealInputRequired(TypedDict):
    pipeline_id: "UUID"
    stage_id: "UUID"
    title: str

class CRMDealInput(_CRMDealInputRequired, total=False):
    amount: int
    #: Обязателен при ненулевой сумме
    currency: str
    source: str
    probability: int
    expected_close_at: Optional[str]
    owner_id: Optional[int]
    customer_id: Optional[str]
    crm_customer_id: Optional[str]
    next_action: str
    next_action_at: Optional[str]

class _CRMDealItemRequired(TypedDict):
    id: "UUID"
    deal_id: "UUID"
    position: int
    name: str
    quantity: float
    unit: str
    #: В тех же единицах, что и сумма сделки
    price: int
    discount_percent: float
    #: Сумма строки со скидкой; считает сервер, чтобы клиенты не разошлись на округлении
    total: int
    created_at: str
    updated_at: str

class CRMDealItem(_CRMDealItemRequired, total=False):
    #: Ссылка на номенклатуру необязательна - на этапе расчёта половина строк ещё не заведена в каталоге
    product_id: "UUID"

class _CRMDealItemInputRequired(TypedDict):
    name: str
    quantity: float

class CRMDealItemInput(_CRMDealItemInputRequired, total=False):
    product_id: Optional[str]
    unit: str
    price: int
    discount_percent: float

class CRMDealPatch(TypedDict, total=False):
    title: str
    amount: int
    currency: str
    source: str
    probability: int
    expected_close_at: Optional[str]
    owner_id: Optional[int]
    customer_id: Optional[str]
    crm_customer_id: Optional[str]
    next_action: str
    next_action_at: Optional[str]
    archived: bool

class _CRMDealStageHistoryRequired(TypedDict):
    id: "UUID"
    deal_id: "UUID"
    to_stage_id: "UUID"
    changed_by: int
    created_at: str

class CRMDealStageHistory(_CRMDealStageHistoryRequired, total=False):
    from_stage_id: "UUID"

class _CRMEngagementRequired(TypedDict):
    id: "UUID"
    entity_type: Literal['lead', 'deal']
    entity_id: "UUID"
    kind: "CRMEngagementKind"
    title: str
    created_by: int
    created_at: str
    updated_at: str

class CRMEngagement(_CRMEngagementRequired, total=False):
    due_at: str
    #: Пусто, пока дело не выполнено
    done_at: str
    owner_id: int
    owner_name: str

class _CRMEngagementInputRequired(TypedDict):
    title: str

class CRMEngagementInput(_CRMEngagementInputRequired, total=False):
    kind: "CRMEngagementKind"
    due_at: Optional[str]
    #: По умолчанию - вызывающий сотрудник
    owner_id: Optional[int]

CRMEngagementKind = Literal['call', 'meeting', 'measurement', 'email', 'task']

class CRMEngagementPatch(TypedDict, total=False):
    kind: "CRMEngagementKind"
    title: str
    due_at: Optional[str]
    owner_id: Optional[int]
    #: true закрывает дело, false возвращает в работу
    done: bool

class CRMExternalLink(TypedDict):
    """Указатель CRM на запись другого модуля; владельцем записи остаётся тот модуль"""

    id: "UUID"
    entity_type: Literal['lead', 'deal']
    entity_id: "UUID"
    link_type: Literal['task', 'calendar_event', 'hub_meeting']
    external_id: "UUID"
    created_at: str

class CRMInboxAssignInput(TypedDict, total=False):
    #: null снимает назначение
    assigned_to: Optional[int]

class CRMInboxAttachment(TypedDict):
    id: "UUID"
    message_id: "UUID"
    filename: str
    content_type: str
    size_bytes: int
    created_at: str

class _CRMInboxConnectionRequired(TypedDict):
    id: "UUID"
    #: Публичный идентификатор для адреса вебхука провайдера
    public_id: "UUID"
    provider: Literal['telegram', 'vk', 'max', 'avito', 'email', 'telephony']
    name: str
    status: Literal['active', 'disabled', 'error']
    settings: Optional[Dict[str, Any]]
    #: Сами учётные данные не возвращаются никогда
    credentials_configured: bool
    created_at: str
    updated_at: str

class CRMInboxConnection(_CRMInboxConnectionRequired, total=False):
    checked_at: str
    last_error_code: str

class _CRMInboxConnectionCheckRequired(TypedDict):
    ok: bool
    status: Literal['active', 'disabled', 'error']

class CRMInboxConnectionCheck(_CRMInboxConnectionCheckRequired, total=False):
    error_code: str

class _CRMInboxConnectionInputRequired(TypedDict):
    name: str
    provider: Literal['telegram', 'vk', 'max', 'avito', 'email', 'telephony']

class CRMInboxConnectionInput(_CRMInboxConnectionInputRequired, total=False):
    #: Поля из каталога провайдера; хранятся зашифрованными
    credentials: Optional[Dict[str, str]]
    settings: Optional[Dict[str, Any]]
    #: Историческое поле Telegram; равнозначно credentials.bot_token
    bot_token: str
    webhook_secret: str

class CRMInboxConnectionPatch(TypedDict, total=False):
    name: str
    #: Пустое значение сохраняет уже записанный секрет
    credentials: Optional[Dict[str, str]]
    settings: Optional[Dict[str, Any]]

class _CRMInboxConversationRequired(TypedDict):
    id: "UUID"
    connection_id: "UUID"
    external_identity_id: "UUID"
    external_chat_id: str
    subject: str
    unread_count: int
    status: "CRMInboxConversationStatus"
    created_at: str
    updated_at: str

class CRMInboxConversation(_CRMInboxConversationRequired, total=False):
    assigned_to: int
    sla_due_at: str
    last_message_at: str

class CRMInboxConversationLink(TypedDict):
    id: "UUID"
    conversation_id: "UUID"
    entity_type: Literal['lead', 'deal']
    entity_id: "UUID"
    created_at: str

CRMInboxConversationStatus = Literal['open', 'closed']

class _CRMInboxDealInputRequired(TypedDict):
    title: str
    pipeline_id: "UUID"
    stage_id: "UUID"

class CRMInboxDealInput(_CRMInboxDealInputRequired, total=False):
    amount: int
    currency: str

class _CRMInboxEntityMessageRequired(TypedDict):
    id: "UUID"
    conversation_id: "UUID"
    direction: Literal['inbound', 'outbound', 'system']
    body: str
    status: Literal['queued', 'received', 'sent', 'delivered', 'failed']
    created_at: str
    provider: str
    connection_name: str

class CRMInboxEntityMessage(_CRMInboxEntityMessageRequired, total=False):
    provider_message_id: str
    sent_by: int

class CRMInboxLinkConversationInput(TypedDict):
    conversation_id: "UUID"

class _CRMInboxLinkedConversationRequired(TypedDict):
    id: "UUID"
    connection_id: "UUID"
    external_identity_id: "UUID"
    external_chat_id: str
    subject: str
    unread_count: int
    status: "CRMInboxConversationStatus"
    created_at: str
    updated_at: str
    provider: str
    connection_name: str

class CRMInboxLinkedConversation(_CRMInboxLinkedConversationRequired, total=False):
    assigned_to: int
    sla_due_at: str
    last_message_at: str

class _CRMInboxMessageRequired(TypedDict):
    id: "UUID"
    conversation_id: "UUID"
    direction: Literal['inbound', 'outbound', 'system']
    body: str
    status: Literal['queued', 'received', 'sent', 'delivered', 'failed']
    created_at: str

class CRMInboxMessage(_CRMInboxMessageRequired, total=False):
    provider_message_id: str
    sent_by: int

class CRMInboxOutboundUpload(TypedDict):
    id: "UUID"
    conversation_id: "UUID"
    filename: str
    content_type: str
    size_bytes: int
    expires_at: str

class _CRMInboxProviderRequired(TypedDict):
    key: Literal['telegram', 'vk', 'max', 'avito', 'email', 'telephony']
    label: str
    connectable: bool
    fields: Optional[List["CRMInboxProviderField"]]
    capabilities: "CRMInboxProviderCapabilities"

class CRMInboxProvider(_CRMInboxProviderRequired, total=False):
    notice: str

class CRMInboxProviderCapabilities(TypedDict):
    inbound: bool
    send: bool
    files: bool
    reply: bool
    edit: bool
    delete: bool
    reactions: bool
    delivered: bool
    read: bool
    sync: bool

class _CRMInboxProviderFieldRequired(TypedDict):
    key: str
    label: str
    type: str
    required: bool
    #: true - значение хранится зашифрованным и не возвращается
    secret: bool

class CRMInboxProviderField(_CRMInboxProviderFieldRequired, total=False):
    help: str

class CRMInboxSendInput(TypedDict, total=False):
    body: str
    #: Идентификаторы заранее загруженных файлов
    upload_ids: List["UUID"]

class CRMInboxTemplate(TypedDict):
    id: "UUID"
    name: str
    body: str
    created_at: str
    updated_at: str

class CRMInboxTemplateInput(TypedDict):
    name: str
    body: str

class _CRMLeadRequired(TypedDict):
    id: "UUID"
    title: str
    #: Канал обращения; по нему собирается аналитика источников
    source: str
    #: Заметка менеджера о заявке
    description: str
    #: Что написал или сказал клиент - слова самого обращения, а не пересказ
    first_message: str
    #: Ник, номер или адрес в канале, пока карточка клиента не заведена
    contact_handle: str
    next_action: str
    status: "CRMLeadStatus"
    created_at: str
    updated_at: str

class CRMLead(_CRMLeadRequired, total=False):
    reference_id: "UUID"
    owner_id: int
    customer_id: "UUID"
    crm_customer_id: "UUID"
    next_action_at: str
    archived_at: str
    qualification_reason: str
    reject_reason_id: "UUID"
    converted_deal_id: "UUID"
    #: Во что вошло это обращение при слиянии дублей; заполнено только у архивной записи-источника
    merged_into_lead_id: "UUID"

class _CRMLeadCardRequired(TypedDict):
    id: "UUID"
    title: str
    #: Канал обращения; по нему собирается аналитика источников
    source: str
    #: Заметка менеджера о заявке
    description: str
    #: Что написал или сказал клиент - слова самого обращения, а не пересказ
    first_message: str
    #: Ник, номер или адрес в канале, пока карточка клиента не заведена
    contact_handle: str
    next_action: str
    status: "CRMLeadStatus"
    created_at: str
    updated_at: str

class CRMLeadCard(_CRMLeadCardRequired, total=False):
    """Лид для экрана: тот же лид плюс человек за обращением и ответственный читаемыми именами"""

    reference_id: "UUID"
    owner_id: int
    customer_id: "UUID"
    crm_customer_id: "UUID"
    next_action_at: str
    archived_at: str
    qualification_reason: str
    reject_reason_id: "UUID"
    converted_deal_id: "UUID"
    #: Во что вошло это обращение при слиянии дублей; заполнено только у архивной записи-источника
    merged_into_lead_id: "UUID"
    customer_name: str
    customer_phone: str
    customer_messengers: Optional[Dict[str, str]]
    owner_name: str
    reject_reason: str

class _CRMLeadDecisionRequired(TypedDict):
    id: "UUID"
    lead_id: "UUID"
    decision: Literal['created', 'qualified', 'disqualified', 'converted']
    changed_by: int
    created_at: str

class CRMLeadDecision(_CRMLeadDecisionRequired, total=False):
    reason: str
    deal_id: "UUID"

class _CRMLeadDuplicateRequired(TypedDict):
    id: "UUID"
    title: str
    #: Канал обращения; по нему собирается аналитика источников
    source: str
    #: Заметка менеджера о заявке
    description: str
    #: Что написал или сказал клиент - слова самого обращения, а не пересказ
    first_message: str
    #: Ник, номер или адрес в канале, пока карточка клиента не заведена
    contact_handle: str
    next_action: str
    status: "CRMLeadStatus"
    created_at: str
    updated_at: str

class CRMLeadDuplicate(_CRMLeadDuplicateRequired, total=False):
    """Обращение, похожее на заданное, и признак, по которому похоже"""

    reference_id: "UUID"
    owner_id: int
    customer_id: "UUID"
    crm_customer_id: "UUID"
    next_action_at: str
    archived_at: str
    qualification_reason: str
    reject_reason_id: "UUID"
    converted_deal_id: "UUID"
    #: Во что вошло это обращение при слиянии дублей; заполнено только у архивной записи-источника
    merged_into_lead_id: "UUID"
    customer_name: str
    customer_phone: str
    customer_messengers: Optional[Dict[str, str]]
    owner_name: str
    reject_reason: str

class _CRMLeadInputRequired(TypedDict):
    title: str

class CRMLeadInput(_CRMLeadInputRequired, total=False):
    source: str
    description: str
    first_message: str
    contact_handle: str
    reference_id: Optional[str]
    owner_id: Optional[int]
    customer_id: Optional[str]
    crm_customer_id: Optional[str]
    next_action: str
    next_action_at: Optional[str]

class CRMLeadPatch(TypedDict, total=False):
    title: str
    source: str
    description: str
    first_message: str
    contact_handle: str
    reference_id: Optional[str]
    owner_id: Optional[int]
    customer_id: Optional[str]
    crm_customer_id: Optional[str]
    next_action: str
    next_action_at: Optional[str]
    archived: bool

CRMLeadStatus = Literal['new', 'qualified', 'disqualified', 'converted']

class CRMLossReason(TypedDict):
    id: "UUID"
    name: str
    #: deal - почему проиграна сделка, lead - почему лид оказался не наш
    kind: Literal['deal', 'lead']
    is_active: bool
    created_at: str

class _CRMLossReasonInputRequired(TypedDict):
    name: str

class CRMLossReasonInput(_CRMLossReasonInputRequired, total=False):
    kind: Literal['deal', 'lead']

class _CRMLossReasonMetricRequired(TypedDict):
    name: str
    count: int
    amount: int

class CRMLossReasonMetric(_CRMLossReasonMetricRequired, total=False):
    id: str

class _CRMManagerWorkloadRequired(TypedDict):
    owner_id: int
    open_leads: int
    open_deals: int
    open_conversations: int
    won_deals: int
    #: Выиграно за всё время
    won_amount: int
    lost_deals: int

class CRMManagerWorkload(_CRMManagerWorkloadRequired, total=False):
    owner_name: str
    #: План на текущий месяц; 0 - план не задан
    plan_amount: int
    #: Закрыто в текущем месяце - с этим и сравнивают план
    won_amount_month: int

class CRMMergeLeadsInput(TypedDict):
    """Какие обращения свести в это"""

    #: Источники: уходят в архив со ссылкой на цель, их переписка и дела переезжают
    source_ids: List["UUID"]

class _CRMMoveDealInputRequired(TypedDict):
    stage_id: "UUID"

class CRMMoveDealInput(_CRMMoveDealInputRequired, total=False):
    #: Обязательна для стадии категории lost
    loss_reason_id: Optional[str]

class CRMNoteInput(TypedDict):
    text: str

class CRMOverview(TypedDict):
    """Сводка менеджера; «мои» - записи с owner_id текущего пользователя"""

    open_leads: Optional[List["CRMLead"]]
    open_deals: Optional[List["CRMDeal"]]
    pipeline_stats: Optional[List["CRMPipelineOverview"]]

class _CRMPipelineRequired(TypedDict):
    id: "UUID"
    name: str
    sort_order: int
    is_default: bool
    is_active: bool
    created_at: str
    updated_at: str

class CRMPipeline(_CRMPipelineRequired, total=False):
    stages: Optional[List["CRMStage"]]

class _CRMPipelineInputRequired(TypedDict):
    name: str

class CRMPipelineInput(_CRMPipelineInputRequired, total=False):
    is_default: bool

class _CRMPipelineOverviewRequired(TypedDict):
    pipeline_id: "UUID"
    pipeline_name: str
    open_count: int
    open_amount: int

class CRMPipelineOverview(_CRMPipelineOverviewRequired, total=False):
    stages: Optional[List["CRMStageOverview"]]

class CRMPipelinePatch(TypedDict, total=False):
    name: str
    is_default: bool
    is_active: bool

class _CRMQualifyLeadInputRequired(TypedDict):
    status: Literal['qualified', 'disqualified']
    #: Подробности решения свободным текстом
    reason: str

class CRMQualifyLeadInput(_CRMQualifyLeadInputRequired, total=False):
    #: Причина из справочника вида lead - по ней строится аналитика отказов
    reason_id: Optional[str]

class CRMReopenDealInput(TypedDict):
    stage_id: "UUID"
    reason: str

class CRMReorderInput(TypedDict):
    """Полный порядок без повторов; частичный список отклоняется"""

    ids: List["UUID"]

CRMRequiredField = Literal['title', 'amount', 'currency', 'probability', 'expected_close_at']

class CRMSLAMetric(TypedDict):
    open_deals: int
    overdue_deals: int
    open_conversations: int
    overdue_conversations: int
    calculated_at: str

class _CRMSalesPlanRequired(TypedDict):
    id: "UUID"
    #: Первое число месяца
    period: str
    amount: int
    currency: str

class CRMSalesPlan(_CRMSalesPlanRequired, total=False):
    """План продаж на месяц. Пустой owner_id - план на весь отдел"""

    owner_id: int
    owner_name: str

class _CRMSalesPlansInputRequired(TypedDict):
    items: List["CRMSalesPlansInputItemsItem"]

class CRMSalesPlansInput(_CRMSalesPlansInputRequired, total=False):
    """Планы месяца целиком: сохранение переписывает месяц, план с нулём убирается совсем"""

    #: YYYY-MM или YYYY-MM-DD; пусто - текущий месяц
    period: str

class _CRMSalesPlansInputItemsItemRequired(TypedDict):
    amount: int

class CRMSalesPlansInputItemsItem(_CRMSalesPlansInputItemsItemRequired, total=False):
    #: Пусто - план на весь отдел
    owner_id: Optional[int]
    currency: str

class CRMSourceMetric(TypedDict):
    """Откуда приходят лиды и какой источник доходит до сделки"""

    source: str
    leads: int
    converted: int
    rate: float

class CRMStage(TypedDict):
    id: "UUID"
    pipeline_id: "UUID"
    name: str
    sort_order: int
    category: "CRMStageCategory"
    color: str
    probability: int
    #: Норматив пребывания на стадии в часах; 0 - без норматива
    sla_hours: int
    required_fields: Optional[List["CRMRequiredField"]]
    is_active: bool
    created_at: str
    updated_at: str

CRMStageCategory = Literal['open', 'won', 'lost']

class _CRMStageInputRequired(TypedDict):
    name: str

class CRMStageInput(_CRMStageInputRequired, total=False):
    category: "CRMStageCategory"
    #: Пустое значение подставляет цвет категории
    color: str
    probability: int
    sla_hours: int
    required_fields: List["CRMRequiredField"]

class CRMStageMetric(TypedDict):
    pipeline_id: str
    pipeline_name: str
    stage_id: str
    stage_name: str
    category: "CRMStageCategory"
    count: int
    amount: int

class CRMStageOverview(TypedDict):
    stage_id: "UUID"
    stage_name: str
    category: "CRMStageCategory"
    deal_count: int
    deal_amount: int
    updated_at: str

class CRMStagePatch(TypedDict, total=False):
    name: str
    category: "CRMStageCategory"
    color: str
    probability: int
    sla_hours: int
    required_fields: List["CRMRequiredField"]
    is_active: bool

class _CRMTimelineEntryRequired(TypedDict):
    id: "UUID"
    #: note - заметка сотрудника, system - системный факт, stage - смена этапа, decision - решение по лиду, message - сообщение канала, link - связь с задачей, событием или встречей
    kind: Literal['note', 'system', 'stage', 'decision', 'message', 'link']
    at: str
    #: Заголовок записи: действие, название этапа, решение или направление сообщения
    title: str

class CRMTimelineEntry(_CRMTimelineEntryRequired, total=False):
    """Одна запись ленты; вид говорит, из какого источника она пришла"""

    actor_id: int
    actor_name: str
    body: str
    meta: Optional[Dict[str, Any]]

class _CRMUserRefRequired(TypedDict):
    id: int
    display_name: str

class CRMUserRef(_CRMUserRefRequired, total=False):
    username: str

class CalendarAvailability(TypedDict):
    id: "UUID"
    owner: int
    owner_name: str
    name: str
    timezone: str
    weekdays: List[int]
    start_time: str
    end_time: str
    slot_duration_min: int
    buffer_min: int
    is_active: bool

class CalendarAvailabilityCreate(TypedDict, total=False):
    owner: int
    name: str
    timezone: str
    weekdays: List[int]
    start_time: str
    end_time: str
    slot_duration_min: int
    buffer_min: int
    is_active: bool

class CalendarAvailabilityEnvelope(TypedDict):
    ok: Literal[True]
    item: "CalendarAvailability"
    id: "UUID"

class CalendarAvailabilityPage(TypedDict):
    count: int
    results: List["CalendarAvailability"]
    items: List["CalendarAvailability"]

class CalendarAvailabilityPatch(TypedDict, total=False):
    name: str
    timezone: str
    weekdays: List[int]
    start_time: str
    end_time: str
    slot_duration_min: int
    buffer_min: int
    is_active: bool

class _CalendarBookingLinkRequired(TypedDict):
    id: "UUID"
    owner: int
    owner_name: str
    availability: Optional["UUID"]
    slug: str
    title: str
    description: str
    calendar_source: Literal['booking']
    export_target: str
    timezone: str
    duration_min: int
    buffer_min: int
    min_notice_min: int
    max_days_ahead: int
    status: Literal['active', 'paused', 'archived']
    public_url: str
    members: List["CalendarMember"]
    participants: List["CalendarBookingParticipant"]
    participant_count: int

class CalendarBookingLink(_CalendarBookingLinkRequired, total=False):
    owner_avatar_url: str
    date_range_start: Optional[str]
    date_range_end: Optional[str]

class CalendarBookingLinkCreate(TypedDict, total=False):
    owner: int
    availability: "UUID"
    availability_id: "UUID"
    slug: str
    title: str
    description: str
    #: Нормализуется сервером в booking
    calendar_source: str
    export_target: str
    timezone: str
    duration_min: int
    buffer_min: int
    min_notice_min: int
    max_days_ahead: int
    date_range_start: str
    date_range_end: str
    status: Literal['active', 'paused', 'archived']
    member_ids: List[int]
    member_user_ids: List[int]

class CalendarBookingLinkEnvelope(TypedDict):
    ok: Literal[True]
    item: "CalendarBookingLink"
    id: "UUID"

class CalendarBookingLinkPage(TypedDict):
    count: int
    results: List["CalendarBookingLink"]
    items: List["CalendarBookingLink"]

class CalendarBookingLinkPatch(TypedDict, total=False):
    availability: "UUID"
    availability_id: "UUID"
    title: str
    description: str
    #: Нормализуется сервером в booking
    calendar_source: str
    export_target: str
    timezone: str
    duration_min: int
    buffer_min: int
    min_notice_min: int
    max_days_ahead: int
    date_range_start: str
    date_range_end: str
    status: Literal['active', 'paused', 'archived']
    member_ids: List[int]
    member_user_ids: List[int]

class CalendarBookingParticipant(TypedDict):
    user_id: str
    display_name: str
    avatar_url: str
    role: str

class CalendarBusy(TypedDict):
    user: int
    user_name: str
    starts_at: str
    ends_at: str
    source: str
    all_day: bool

class CalendarBusyPage(TypedDict):
    count: int
    results: List["CalendarBusy"]
    items: List["CalendarBusy"]

class _CalendarConnectorRequired(TypedDict):
    id: "UUID"
    owner: int
    owner_name: str
    provider: Literal['caldav', 'icloud', 'yandex', 'google', 'office365']
    display_name: str
    account_email: str
    direction: Literal['both', 'import', 'export']
    status: Literal['connected', 'paused', 'disconnected', 'error']
    calendar_url: str
    username: str
    has_credentials: bool
    selected_calendars: List["CalendarExternalCalendar"]
    last_sync_status: str
    #: The provider's own words and nothing else. Empty when the failure was ours; last_error_code names it and the log carries the cause.
    last_error: str
    last_error_code: Literal['', 'calendar.connector.internal', 'calendar.connector.provider_declined', 'calendar.connector.disconnected']
    supports_import: bool
    supports_export: bool
    created_at: str
    updated_at: str

class CalendarConnector(_CalendarConnectorRequired, total=False):
    last_sync_at: Optional[str]

class _CalendarConnectorCreateRequired(TypedDict):
    provider: Literal['caldav', 'icloud', 'yandex']

class CalendarConnectorCreate(_CalendarConnectorCreateRequired, total=False):
    display_name: str
    account_email: str
    direction: Literal['both', 'import', 'export']
    status: Literal['connected', 'paused', 'disconnected', 'error']
    calendar_url: str
    username: str
    credential: str
    #: KEIS-совместимый alias credential
    password: str
    selected_calendars: List["CalendarExternalCalendar"]

class CalendarConnectorEnvelope(TypedDict):
    ok: Literal[True]
    item: "CalendarConnector"
    id: "UUID"

class CalendarConnectorPage(TypedDict):
    count: int
    results: List["CalendarConnector"]
    items: List["CalendarConnector"]
    providers: Dict[str, "CalendarConnectorProvider"]

class CalendarConnectorPatch(TypedDict, total=False):
    provider: Literal['caldav', 'icloud', 'yandex', 'google', 'office365']
    display_name: str
    account_email: str
    direction: Literal['both', 'import', 'export']
    status: Literal['connected', 'paused', 'disconnected', 'error']
    calendar_url: str
    username: str
    credential: str
    password: str
    selected_calendars: List["CalendarExternalCalendar"]

class CalendarConnectorProvider(TypedDict, total=False):
    configured: bool
    supports_import: bool
    supports_export: bool

class CalendarConnectorSyncInput(TypedDict, total=False):
    provider: str

class _CalendarEventRequired(TypedDict):
    id: "UUID"
    owner: Optional[int]
    owner_name: str
    title: str
    description: str
    location: str
    starts_at: str
    ends_at: str
    timezone: str
    all_day: bool
    important: bool
    visibility: Literal['private', 'public']
    busy_status: Literal['busy', 'free']
    recurrence_freq: Literal['none', 'daily', 'weekly', 'monthly', 'yearly']
    recurrence_interval: int
    recurrence_days: List[int]
    status: Literal['confirmed', 'cancelled', 'tentative']
    source: str
    export_target: str
    participants: List["CalendarParticipant"]
    is_occurrence: bool
    created_at: str
    updated_at: str

class CalendarEvent(_CalendarEventRequired, total=False):
    owner_user_id: Optional[int]
    recurrence_month_day: Optional[int]
    recurrence_until: Optional[str]
    recurrence_count: Optional[int]
    payload: Dict[str, Any]
    booking: Optional["UUID"]
    booking_id: Optional["UUID"]
    occurrence_id: str
    master_event: Optional["UUID"]

class _CalendarEventCreateRequired(TypedDict):
    title: str
    starts_at: str
    ends_at: str

class CalendarEventCreate(_CalendarEventCreateRequired, total=False):
    owner: int
    description: str
    location: str
    timezone: str
    all_day: bool
    important: bool
    visibility: Literal['private', 'public']
    busy_status: Literal['busy', 'free']
    recurrence_freq: Literal['none', 'daily', 'weekly', 'monthly', 'yearly']
    recurrence_interval: int
    recurrence_days: List[int]
    recurrence_month_day: int
    recurrence_until: str
    recurrence_count: int
    status: Literal['confirmed', 'cancelled', 'tentative']
    participants: List["CalendarParticipantInput"]
    payload: Dict[str, Any]
    #: local либо `<connector UUID>/<external calendar id>`
    export_target: str
    calendar_source: str

class CalendarEventEnvelope(TypedDict):
    ok: Literal[True]
    item: "CalendarEvent"
    id: "UUID"
    title: str
    starts_at: str
    ends_at: str

class CalendarEventPage(TypedDict):
    count: int
    results: List["CalendarEvent"]
    items: List["CalendarEvent"]
    current_user_id: int

class CalendarEventPatch(TypedDict, total=False):
    """Отсутствующий ключ и null означают «не менять»; participants при наличии заменяет список целиком."""

    owner: Optional[int]
    title: Optional[str]
    description: Optional[str]
    location: Optional[str]
    starts_at: Optional[str]
    ends_at: Optional[str]
    timezone: Optional[str]
    all_day: Optional[bool]
    important: Optional[bool]
    visibility: Optional[Literal['private', 'public', None]]
    busy_status: Optional[Literal['busy', 'free', None]]
    recurrence_freq: Optional[Literal['none', 'daily', 'weekly', 'monthly', 'yearly', None]]
    recurrence_interval: Optional[int]
    recurrence_days: Optional[List[int]]
    recurrence_month_day: Optional[int]
    recurrence_until: Optional[str]
    recurrence_count: Optional[int]
    status: Optional[Literal['confirmed', 'cancelled', 'tentative', None]]
    participants: Optional[List["CalendarParticipantInput"]]
    payload: Optional[Dict[str, Any]]
    export_target: Optional[str]
    calendar_source: Optional[str]

class CalendarEventResponseInput(TypedDict):
    response_status: Literal['needs_action', 'accepted', 'declined', 'tentative']

class _CalendarExternalCalendarRequired(TypedDict):
    id: str
    name: str
    enabled: bool

class CalendarExternalCalendar(_CalendarExternalCalendarRequired, total=False):
    url: str
    color: str
    read_only: bool
    writable: bool
    export: bool

class CalendarInvitation(TypedDict):
    event_id: "UUID"
    title: str
    starts_at: str
    ends_at: str
    all_day: bool
    timezone: str
    owner_name: str
    participant_id: "UUID"

class CalendarInvitationPage(TypedDict):
    items: List["CalendarInvitation"]

class _CalendarMemberRequired(TypedDict):
    user: int
    user_name: str

class CalendarMember(_CalendarMemberRequired, total=False):
    email: str
    department: str
    position: str
    company: str
    avatar_url: str

class CalendarMemberBundle(TypedDict):
    id: str
    name: str
    member_ids: List[int]

class CalendarMemberDirectory(TypedDict):
    departments: List["CalendarMemberBundle"]
    items: List["CalendarMember"]

class CalendarOAuthCompleteInput(TypedDict):
    code: str
    state: str

class _CalendarOAuthStartRequired(TypedDict):
    provider: Literal['google', 'office365']
    auth_url: str
    configured: bool

class CalendarOAuthStart(_CalendarOAuthStartRequired, total=False):
    redirect_uri: str

class CalendarParticipant(TypedDict):
    id: "UUID"
    user: Optional[int]
    user_name: str
    external_name: str
    external_email: str
    role: Literal['required', 'optional', 'organizer']
    response_status: Literal['needs_action', 'accepted', 'declined', 'tentative']

class CalendarParticipantInput(TypedDict, total=False):
    user: int
    external_name: str
    external_email: str
    role: Literal['required', 'optional', 'organizer']
    response_status: Literal['needs_action', 'accepted', 'declined', 'tentative']

class _CalendarPublicBookInputRequired(TypedDict):
    #: ISO instant либо local datetime в timezone ссылки
    starts_at: str

class CalendarPublicBookInput(_CalendarPublicBookInputRequired, total=False):
    guest_name: str
    guest_email: str
    guest_note: str

class CalendarPublicBookResult(TypedDict):
    ok: bool
    starts_at: str
    ends_at: str
    title: str

class CalendarPublicBookingLink(TypedDict):
    slug: str
    title: str
    description: str
    duration_min: int
    timezone: str
    owner_name: str
    participants: List["CalendarBookingParticipant"]
    participant_count: int
    company: str

class CalendarSettingsEnvelope(TypedDict):
    settings: Dict[str, Any]

class CalendarSlot(TypedDict):
    starts_at: str
    ends_at: str

class CalendarSlotPage(TypedDict):
    items: List["CalendarSlot"]

class CalendarSyncResult(TypedDict):
    connector: "CalendarConnector"
    imported: int
    exported: int
    skipped: int
    message: str

class CalendarWebPushConfig(TypedDict):
    public_key: str
    configured: bool

class _CalendarWebPushSubscriptionRequired(TypedDict):
    endpoint: str
    p256dh: str
    auth: str

class CalendarWebPushSubscription(_CalendarWebPushSubscriptionRequired, total=False):
    device: Literal['desktop', 'mobile']

class CalendarWebPushUnsubscribe(TypedDict):
    endpoint: str

class ChatAttachment(TypedDict):
    id: "UUID"
    original_name: str
    content_type: Literal['audio/mp4', 'audio/webm', 'audio/ogg', 'video/mp4', 'video/quicktime']
    size_bytes: int
    sha256_hex: str
    media_kind: Literal['voice', 'video_circle']
    duration_ms: int
    content_url: str

class ChatAttachmentPage(TypedDict):
    items: List["ChatForwardedAttachment"]

class ChatAttachmentUpload(TypedDict):
    """Один файл на запрос. Ссылка на уже загруженный объект не принимается."""

    #: Непустой файл до 100 MiB. Содержимое, распознанное как голос, дополнительно ограничено 20 MiB.
    file: str

class _ChatChangePinResultRequired(TypedDict):
    changed: bool

class ChatChangePinResult(_ChatChangePinResultRequired, total=False):
    pin: "ChatMessagePin"

class _ChatConversationRequired(TypedDict):
    id: "UUID"
    type: Literal['direct', 'group', 'system']
    status: Literal['active', 'archived']
    title: str
    description: str
    last_seq: int
    last_message_id: Optional["UUID"]
    last_message_at: Optional[str]
    created_at: str
    updated_at: str
    unread_count: int
    manual_unread_seq: Optional[int]
    notification_mode: str
    mention_count: int

class ChatConversation(_ChatConversationRequired, total=False):
    capabilities: "ChatConversationCapabilities"

class ChatConversationAvatarUpload(TypedDict):
    """Одно изображение на запрос. Ссылка на уже загруженный объект не принимается."""

    #: Непустое изображение до 5 MiB. Распознаются jpeg, png, webp и gif; прочие форматы отвергаются.
    file: str

class ChatConversationCapabilities(TypedDict):
    canRead: bool
    canWrite: bool
    canManageMembers: bool
    canUpload: bool
    canReact: bool
    canPin: bool
    canMarkRead: bool
    canMarkUnread: bool
    canMention: bool
    canSetNotificationMode: bool

class _ChatConversationPageRequired(TypedDict):
    items: List["ChatConversation"]

class ChatConversationPage(_ChatConversationPageRequired, total=False):
    next_cursor: str

class _ChatCreateGroupRequired(TypedDict):
    title: str
    member_user_ids: List[int]

class ChatCreateGroup(_ChatCreateGroupRequired, total=False):
    description: str

class ChatCreateGroupResult(TypedDict):
    conversation: "ChatConversation"
    created: Literal[True]

class ChatEditMessage(TypedDict):
    #: Лимит считается по кодовым точкам Unicode после нормализации переводов строк и обрезки пробелов по краям.
    body: str

class ChatEnsureDirect(TypedDict):
    peer_user_id: int

class ChatEnsureDirectResult(TypedDict):
    conversation_id: "UUID"
    created: bool

class ChatFolder(TypedDict):
    id: "UUID"
    name: str
    position: int
    #: Разделы всегда возвращаются в порядке direct, group, task независимо от порядка в запросе.
    scopes: List[Literal['direct', 'group', 'task']]
    include_conversation_ids: List["UUID"]
    exclude_conversation_ids: List["UUID"]
    created_at: str
    updated_at: str

class ChatFolderPage(TypedDict):
    items: List["ChatFolder"]

class ChatForwardMessage(TypedDict):
    target_conversation_id: "UUID"
    client_message_id: "UUID"

class ChatForwardMessageResult(TypedDict):
    message: "ChatForwardedMessage"
    created: bool

class _ChatForwardedAttachmentRequired(TypedDict):
    id: "UUID"
    conversation_id: "UUID"
    message_id: Optional[str]
    original_name: str
    content_type: str
    size_bytes: int
    sha256_hex: str
    media_kind: Literal['voice', 'video_circle', 'image', 'video', 'file']
    duration_ms: Optional[int]
    waveform: List[int]
    status: Literal['quarantined', 'ready', 'failed', 'deleted']
    scan_status: Literal['pending', 'clean', 'infected', 'unavailable']
    created_at: str
    content_url: str

class ChatForwardedAttachment(_ChatForwardedAttachmentRequired, total=False):
    scan_error_code: str

class ChatForwardedMessage(TypedDict):
    id: "UUID"
    conversation_id: "UUID"
    seq: int
    sender_user_id: Optional[int]
    kind: Literal['text', 'system', 'application', 'file']
    body: str
    reply_to_message_id: Optional[str]
    forwarded_from_message_id: Optional[str]
    mentions: List["ChatMessageMention"]
    reactions: List["ChatMessageReaction"]
    client_message_id: Optional[str]
    created_at: str
    edited_at: Optional[str]
    deleted_at: Optional[str]
    attachments: List["ChatForwardedAttachment"]

class ChatMarkAllRead(TypedDict):
    #: Раздел списка бесед: user — переписка людей без чатов задач.
    scope: Literal['all', 'direct', 'group', 'task', 'user']

class ChatMarkAllReadResult(TypedDict):
    scope: Literal['all', 'direct', 'group', 'task', 'user']
    conversations_read: int
    mentions_read: int
    notifications_read: int

class ChatMediaUpload(TypedDict):
    client_message_id: "UUID"
    media_kind: Literal['voice', 'video_circle']
    #: Для video_circle дополнительно действует runtime-лимит 60000 ms.
    duration_ms: int
    #: audio/mp4, audio/webm или audio/ogg до 12 MiB либо video/mp4/video/quicktime до 40 MiB
    file: str

class ChatMember(TypedDict):
    user_id: int
    display_name: str
    avatar_url: str
    role: Literal['owner', 'moderator', 'member', 'readonly']

class ChatMemberPage(TypedDict):
    items: List["ChatMember"]

class ChatMentionCandidate(TypedDict):
    user_id: int

class ChatMentionCandidatePage(TypedDict):
    items: List["ChatMentionCandidate"]

class ChatMentionReadResult(TypedDict):
    message_id: "UUID"
    read_at: Optional[str]
    changed: bool

class ChatMessage(TypedDict):
    id: "UUID"
    conversation_id: "UUID"
    seq: int
    sender_user_id: Optional[int]
    kind: Literal['text', 'system', 'application', 'file']
    body: str
    mentions: List["ChatMessageMention"]
    client_message_id: Optional["UUID"]
    created_at: str
    attachments: List["ChatAttachment"]

class ChatMessageMention(TypedDict):
    user_id: int
    display_name: str

class _ChatMessagePageRequired(TypedDict):
    items: List["ChatMessage"]

class ChatMessagePage(_ChatMessagePageRequired, total=False):
    first_seq: int
    last_seq: int

class ChatMessagePin(TypedDict):
    message: "ChatForwardedMessage"
    pinned_by: int
    pinned_at: str

class ChatMessagePinPage(TypedDict):
    items: List["ChatMessagePin"]

class ChatMessageReaction(TypedDict):
    emoji: str
    count: int
    is_own: bool

class _ChatMobileDeviceRegistrationRequired(TypedDict):
    device_id: str
    push_token: str
    bundle_id: str
    environment: Literal['sandbox', 'production']

class ChatMobileDeviceRegistration(_ChatMobileDeviceRegistrationRequired, total=False):
    #: Платформа APNs-клиента. Если поле не передано, используется ios для обратной совместимости.
    platform: Literal['ios', 'macos']
    locale: str
    timezone: str
    device_name: str
    app_version: str
    system_version: str
    #: Показывать текст сообщения в уведомлении. Поле отсутствует — уведомление полное.
    preview: bool
    #: Звук уведомления. Поле отсутствует — со звуком.
    sound: bool

class ChatMobileDeviceRegistrationState(TypedDict):
    enabled: bool

class ChatMobilePushTestResult(TypedDict):
    delivered: int

class ChatNotificationModeInput(TypedDict):
    mode: Literal['all', 'mentions', 'muted']

class ChatNotificationModeResult(TypedDict):
    mode: Literal['all', 'mentions', 'muted']
    changed: bool

class ChatPeoplePage(TypedDict):
    items: List["ChatPerson"]

class ChatPerson(TypedDict):
    user_id: int
    display_name: str
    avatar_url: str
    is_self: bool

class ChatReactionResult(TypedDict):
    message_id: "UUID"
    #: Сводка по сообщению целиком, по одной строке на эмодзи.
    reactions: List["ChatMessageReaction"]
    changed: bool

class ChatReceiptInput(TypedDict):
    seq: int

class ChatReceiptState(TypedDict):
    last_delivered_seq: int
    last_read_seq: int
    manual_unread_seq: Optional[int]
    changed: bool

class _ChatSaveFolderRequired(TypedDict):
    name: str

class ChatSaveFolder(_ChatSaveFolderRequired, total=False):
    """Нужен непустой name и хотя бы один scope или один include_conversation_ids, иначе 400."""

    position: int
    #: Повтор раздела отвергается.
    scopes: List[Literal['direct', 'group', 'task']]
    include_conversation_ids: List["UUID"]
    exclude_conversation_ids: List["UUID"]

class _ChatSendMessageRequired(TypedDict):
    #: Ключ идемпотентности отправки. Уникален в пределах беседы и отправителя: повтор с тем же ключом не заводит второе сообщение, а возвращает уже отправленное. Заголовок Idempotency-Key эта операция не читает
    client_message_id: Dict[str, Any]
    #: Предел считается в кодовых точках, а не в байтах: сервер режет по 10 000 кодовых точек
    body: str

class ChatSendMessage(_ChatSendMessageRequired, total=False):
    mention_user_ids: List[int]

class ChatSendMessageResult(TypedDict):
    message: "ChatMessage"
    created: bool

class ChatSetReaction(TypedDict):
    #: Закрытый список допустимых реакций.
    emoji: Literal['👍', '👎', '❤️', '🔥', '🎉', '😄', '😢', '😡', '✍️']

class ChatUnreadMention(TypedDict):
    message_id: "UUID"
    seq: int

class ChatUnreadMentionPage(TypedDict):
    items: List["ChatUnreadMention"]

class Comment(TypedDict):
    id: "UUID"
    task_id: "UUID"
    author_id: Optional[int]
    author_name: Optional[str]
    body: str
    attachments: List["Attachment"]
    origin: "CommentOrigin"
    created_at: str

class CommentCreate(TypedDict, total=False):
    """Передайте непустой `body` либо `allow_empty: true` для комментария только с вложением."""

    body: str
    author: int
    allow_empty: bool
    mentioned_user_ids: List[int]

CommentList = List["Comment"]

CommentOrigin = Literal['web', 'mcp', 'agent']

class _CoreAccountingDimensionRequired(TypedDict):
    key: Literal['company', 'project', 'department', 'cfo']
    label: str
    description: str
    tree: bool
    always_on: bool
    enabled: bool
    required: bool

class CoreAccountingDimension(_CoreAccountingDimensionRequired, total=False):
    dictionary_key: str
    enabled_at: str

class CoreAccountingDimensionPage(TypedDict):
    count: int
    results: List["CoreAccountingDimension"]
    readiness: "CoreAccountingDimensionPageReadiness"

class CoreAccountingDimensionPageReadiness(TypedDict):
    posted_entries: int

class CoreAccountingDimensionPatch(TypedDict, total=False):
    enabled: bool
    required: bool

class _CoreAccountingPeriodCloseRequired(TypedDict):
    closed_through: str

class CoreAccountingPeriodClose(_CoreAccountingPeriodCloseRequired, total=False):
    reason: str
    forced: bool
    warnings: List[str]

class CoreAccountingPeriodEvent(TypedDict):
    id: "UUID"
    action: Literal['close', 'reopen']
    #: Empty means fully reopened
    closed_through: str
    actor_user_id: int
    actor_name: str
    happened_at: str
    reason: str
    forced: bool
    warnings: List[str]

class CoreAccountingPeriodReopen(TypedDict):
    #: Earlier date or empty to reopen fully
    closed_through: str
    reason: str

class CoreAccountingPeriodState(TypedDict):
    #: Empty means accounting is open
    closed_through: str
    history: List["CoreAccountingPeriodEvent"]

class _CoreAccountingSettingsRequired(TypedDict):
    currency: str
    locked: bool
    ledger_entries: int

class CoreAccountingSettings(_CoreAccountingSettingsRequired, total=False):
    valid_from: str

class _CoreAccountingSettingsInputRequired(TypedDict):
    currency: str

class CoreAccountingSettingsInput(_CoreAccountingSettingsInputRequired, total=False):
    reason: str

class CoreBalanceShortage(TypedDict):
    register_key: str
    register_name: str
    dims: Dict[str, Any]
    resource: str
    balance: str
    shortage: str
    conflicts: List["CoreConflictingRegistrar"]

class CoreBulkResult(TypedDict):
    updated: int

class CoreBusiness(TypedDict):
    id: "UUID"
    name: str
    is_active: bool

class CoreBusinessInput(TypedDict):
    name: str

class _CoreBusinessOwnerRequired(TypedDict):
    id: "UUID"
    account_id: "UUID"
    kind: Literal['employee', 'company', 'contact']
    name: str
    share: str

class CoreBusinessOwner(_CoreBusinessOwnerRequired, total=False):
    employee_id: "UUID"
    company_id: "UUID"
    contact_id: "UUID"

class _CoreBusinessOwnerInputRequired(TypedDict):
    kind: Literal['employee', 'company', 'contact']
    share: str

class CoreBusinessOwnerInput(_CoreBusinessOwnerInputRequired, total=False):
    employee_id: "UUID"
    company_id: "UUID"
    contact_id: "UUID"

class CoreCabinetPreferences(TypedDict):
    locale: Literal['ru-RU', 'en-US']
    timezone: str
    date_format: str
    number_format: str

class CoreConflictingRegistrar(TypedDict):
    id: "UUID"
    number: str
    type_key: str
    type_name: str
    date: str
    status: "CoreDocumentStatus"
    sign: int

class CoreContact(TypedDict):
    id: "UUID"
    name: str
    kind: "CoreContactKind"
    is_customer: bool
    is_supplier: bool
    folder_id: Optional["UUID"]
    entity_type: "CoreContactEntityType"
    legal_name: str
    phone: str
    email: str
    position: str
    tags: List[Any]
    messengers: Dict[str, Any]
    source: str
    inn: str
    kpp: str
    ogrn: str
    address: str
    bank_name: str
    bank_bic: str
    bank_account: str
    external_id: str
    custom: Dict[str, Any]
    is_active: bool
    created_at: str
    updated_at: str

class _CoreContactBulkPatchRequired(TypedDict):
    ids: List["UUID"]

class CoreContactBulkPatch(_CoreContactBulkPatchRequired, total=False):
    folder_id: Optional["UUID"]
    is_customer: bool
    is_supplier: bool

class _CoreContactCreateRequired(TypedDict):
    name: str

class CoreContactCreate(_CoreContactCreateRequired, total=False):
    kind: "CoreContactKind"
    entity_type: "CoreContactEntityType"
    legal_name: str
    phone: str
    email: str
    position: str
    tags: List[Any]
    messengers: Dict[str, Any]
    source: str
    inn: str
    kpp: str
    ogrn: str
    address: str
    bank_name: str
    bank_bic: str
    bank_account: str
    external_id: str
    custom: Dict[str, Any]

CoreContactEntityType = Literal['legal', 'individual', 'sole_prop']

CoreContactKind = Literal['client', 'supplier', 'both']

class CoreContactPage(TypedDict):
    count: int
    results: List["CoreContact"]

class CoreContactPatch(TypedDict, total=False):
    name: str
    kind: "CoreContactKind"
    entity_type: "CoreContactEntityType"
    legal_name: str
    phone: str
    email: str
    position: str
    tags: List[Any]
    messengers: Dict[str, Any]
    source: str
    inn: str
    kpp: str
    ogrn: str
    address: str
    bank_name: str
    bank_bic: str
    bank_account: str
    external_id: str
    custom: Dict[str, Any]
    is_customer: bool
    is_supplier: bool
    folder_id: Optional["UUID"]

class _CoreCurrencyRateRequired(TypedDict):
    id: "UUID"
    currency_code: str
    base_code: str
    rate: str
    nominal: int
    valid_from: str
    source: "CoreCurrencyRateSourceKey"
    reason: str
    created_at: str

class CoreCurrencyRate(_CoreCurrencyRateRequired, total=False):
    valid_to: str

class _CoreCurrencyRateInputRequired(TypedDict):
    currency_code: str
    base_code: str
    #: Positive decimal string; comma or dot accepted
    rate: str
    valid_from: str

class CoreCurrencyRateInput(_CoreCurrencyRateInputRequired, total=False):
    nominal: int
    source: "CoreCurrencyRateSourceKey"
    reason: str

class CoreCurrencyRatePage(TypedDict):
    count: int
    results: List["CoreCurrencyRate"]

class CoreCurrencyRateRefreshResult(TypedDict):
    added: int

class _CoreCurrencyRateSourceRequired(TypedDict):
    key: "CoreCurrencyRateSourceKey"
    title: str
    auto: bool
    serves: bool

class CoreCurrencyRateSource(_CoreCurrencyRateSourceRequired, total=False):
    note: str
    bridge: str
    unavailable: bool

CoreCurrencyRateSourceKey = Literal['manual', 'cbr', 'ecb', 'coingecko', 'erapi', 'moex', 'fixed']

class CoreCurrencyRateSourcePage(TypedDict):
    items: List["CoreCurrencyRateSource"]

class CoreDictionary(TypedDict):
    id: "UUID"
    key: str
    name: str
    description: str
    is_system: bool
    allow_tree: bool
    folder_id: Optional["UUID"]
    item_count: int
    created_at: str
    updated_at: str

class _CoreDictionaryCreateRequired(TypedDict):
    key: str
    name: str

class CoreDictionaryCreate(_CoreDictionaryCreateRequired, total=False):
    description: str
    allow_tree: bool
    folder_id: Optional["UUID"]

class CoreDictionaryItem(TypedDict):
    id: "UUID"
    dictionary_id: "UUID"
    code: str
    label: str
    parent_id: Optional["UUID"]
    attrs: Dict[str, Any]
    sort_order: int
    is_active: bool
    created_at: str
    updated_at: str

class _CoreDictionaryItemCreateRequired(TypedDict):
    label: str

class CoreDictionaryItemCreate(_CoreDictionaryItemCreateRequired, total=False):
    code: str
    parent_id: Optional["UUID"]
    attrs: Dict[str, Any]
    sort_order: int
    is_active: bool

class CoreDictionaryItemImport(TypedDict):
    items: List["CoreDictionaryItemUpdate"]

class CoreDictionaryItemPage(TypedDict):
    count: int
    #: Применённый размер страницы — после зажима до потолка
    limit: int
    #: Применённое смещение
    offset: int
    results: List["CoreDictionaryItem"]

class _CoreDictionaryItemUpdateRequired(TypedDict):
    code: str
    label: str

class CoreDictionaryItemUpdate(_CoreDictionaryItemUpdateRequired, total=False):
    parent_id: Optional["UUID"]
    attrs: Dict[str, Any]
    sort_order: int
    is_active: bool

class CoreDictionaryPage(TypedDict):
    count: int
    #: Применённый размер страницы — после зажима до потолка
    limit: int
    #: Применённое смещение
    offset: int
    results: List["CoreDictionary"]

class _CoreDictionaryUpdateRequired(TypedDict):
    name: str

class CoreDictionaryUpdate(_CoreDictionaryUpdateRequired, total=False):
    description: str
    allow_tree: bool
    folder_id: Optional["UUID"]

class _CoreDirectoryRequired(TypedDict):
    #: Ключ кабинета: одинаков во всех кабинетах, без пространства имён. У справочника приложения совпадает с полным именем
    key: str
    label: str
    description: str
    #: Модуль, чей код пишет и проверяет записи: у объявленного справочника — владелец, у списка кабинета и справочника приложения — core как хозяин конструктора
    module: str
    #: Природа справочника: сущность, список кодов, таксономия, стандарт или зеркало внешнего источника
    kind: str
    #: Где лежат записи: своя типизированная таблица или универсальный конструктор
    storage: str
    #: Откуда записи: штатный посев (system), ввод клиента (tenant), интеграция (integration) или установленное приложение (app)
    origin: str
    #: Кому виден справочник: только своему модулю, всему продукту или наружу
    visibility: str
    deeplink: str
    #: Полное имя для внешнего кода: пространство имён владельца плюс ключ — core.units, marketplace.mp_expense_item, app.acme.crm.regions. Его называет manifest приложения, его же принимают операции /api/v1/reference наравне с ключом
    reference: str
    contract: "CoreDirectoryContract"
    is_system: bool

class CoreDirectory(_CoreDirectoryRequired, total=False):
    #: Ключ словаря для перевода названия
    label_key: str
    #: Группа раздела в меню и каталоге
    group: str
    #: Значок из общего набора
    icon: str
    #: Порядок в чек-листе первичного заполнения кабинета
    setup_step: int
    #: Дополнительные входы. Владение не переносят: справочник остаётся у своего модуля
    mounts: List["CoreDirectoryMount"]
    item_count: Optional[int]
    dictionary_id: str

class CoreDirectoryContract(TypedDict):
    """Дескриптор справочника для внешнего кода (Reference Data SDK). У штатного справочника приходит из объявления модуля-владельца, у списка кабинета выводится из его природы, у справочника приложения снимается с манифеста при установке. Форма дескриптора — preview: набор полей может расшириться"""

    #: Пространство имён: ключ модуля-владельца или app.<издатель>.<ключ> у приложения. Выводится из владельца, объявить иначе нельзя
    namespace: str
    #: Полное имя: namespace плюс ключ. То же, что reference у строки
    reference: str
    #: Идентификатор формы записи с версией: core.contact.v1 у типизированного, core.dictionary_item.v1 у любого справочника конструктора, <полное имя>.v<N> у справочника приложения
    item_schema: str
    #: Версия формы записи из суффикса item_schema. Ломающее изменение формы — новая версия рядом со старой, а не тихая подмена
    schema_version: int
    #: Чьё слово последнее по записям: кабинет, сеятель Akeda, внешний источник или установленное приложение
    authority: Literal['tenant', 'platform', 'provider', 'app']
    #: Что кабинет вправе делать с записями: править любые, только читать (записи держит владелец) или заводить свои рядом с записями владельца
    mutability: Literal['tenant_managed', 'owner_managed', 'shared']
    #: Этап жизни: форма держится; форма меняется; выдавать перестали, существующие не трогают; владелец удалён, справочник остался ради ссылок
    lifecycle: Literal['stable', 'beta', 'deprecated', 'retired']
    #: Объём обещания про форму записи: те же стадии, что у операции public API
    compatibility: Literal['preview', 'public']
    #: Право, открывающее справочник: <модуль>:read. Им же витрина отбирает строки
    permission: str

class CoreDirectoryMount(TypedDict):
    #: Модуль, из раздела которого открывается этот справочник
    module: str
    #: Экран второго входа
    path: str

class CoreDirectoryPage(TypedDict):
    count: int
    #: Потолок каталога — сколько справочников конструктора он читает за раз. Параметра запроса у него нет: каталог отдаётся целиком, и число названо здесь, чтобы предел был виден, а не подразумевался
    limit: int
    #: Справочников в кабинете больше потолка, и часть в каталог не попала. Считается по кабинету точно, а не по длине ответа: после чтения набор ещё раз сужают права, и короткий ответ ничего об усечении не говорит. true означает ошибку моделирования на стороне кабинета, а не нормальный режим
    truncated: bool
    results: List["CoreDirectory"]

class CoreDocument(TypedDict):
    id: "UUID"
    type_id: "UUID"
    type_key: str
    type_name: str
    number: str
    date: str
    status: "CoreDocumentStatus"
    basis_type: Optional["UUID"]
    basis_id: Optional["UUID"]
    basis_number: str
    entity_refs: Dict[str, Any]
    payload: Dict[str, Any]
    comment: str
    is_marked_deleted: bool
    created_by: Optional[int]
    created_by_name: str
    created_at: str
    updated_at: str
    posted_at: str
    cancelled_at: str

class CoreDocumentActionCheck(TypedDict):
    allowed: bool
    reasons: List["CoreDocumentBlockReason"]

class _CoreDocumentBlockReasonRequired(TypedDict):
    code: Literal['no_poster', 'marked_deleted', 'posted', 'not_posted', 'payload_invalid', 'movement_invalid', 'balance_negative', 'ledger_incomplete', 'period_closed']
    message: str

class CoreDocumentBlockReason(_CoreDocumentBlockReasonRequired, total=False):
    detail: str
    shortages: List["CoreBalanceShortage"]

class CoreDocumentBlockers(TypedDict):
    document_id: "UUID"
    status: "CoreDocumentStatus"
    post: "CoreDocumentActionCheck"
    cancel: "CoreDocumentActionCheck"
    mark_deleted: "CoreDocumentActionCheck"

class _CoreDocumentCreateRequired(TypedDict):
    type_id: "UUID"

class CoreDocumentCreate(_CoreDocumentCreateRequired, total=False):
    #: Required for external numbering and forbidden for sequence numbering
    number: str
    #: Empty or omitted means today
    date: str
    basis_id: Optional["UUID"]
    entity_refs: Dict[str, Any]
    payload: Dict[str, Any]
    comment: str

class CoreDocumentLinkNode(TypedDict):
    direction: Literal['self', 'basis', 'dependent']
    depth: int
    id: "UUID"
    type_id: "UUID"
    type_key: str
    type_name: str
    number: str
    date: str
    status: "CoreDocumentStatus"
    is_marked_deleted: bool
    basis_id: Optional["UUID"]

class CoreDocumentLinks(TypedDict):
    document: "CoreDocumentLinkNode"
    basis: List["CoreDocumentLinkNode"]
    dependents: List["CoreDocumentLinkNode"]
    movements: List["CoreDocumentMovementSummary"]
    truncated: bool

class CoreDocumentMarkDeleted(TypedDict, total=False):
    marked: bool

class CoreDocumentMovementSummary(TypedDict):
    register_id: "UUID"
    register_key: str
    register_name: str
    register_kind: "CoreRegisterKind"
    dims: Dict[str, Any]
    sign: int
    values: Dict[str, Any]
    entry_count: int

class CoreDocumentPage(TypedDict):
    count: int
    results: List["CoreDocument"]

class CoreDocumentPatch(TypedDict, total=False):
    date: str
    basis_id: Optional["UUID"]
    entity_refs: Dict[str, Any]
    payload: Dict[str, Any]
    comment: str

CoreDocumentStatus = Literal['draft', 'posted', 'cancelled']

class CoreDocumentType(TypedDict):
    id: "UUID"
    key: str
    name: str
    module: str
    is_system: bool
    number_template: str
    number_reset: "CoreNumberReset"
    number_source: "CoreNumberSource"
    settings: Dict[str, Any]
    document_count: int
    created_at: str
    updated_at: str

class _CoreDocumentTypeCreateRequired(TypedDict):
    key: str
    name: str

class CoreDocumentTypeCreate(_CoreDocumentTypeCreateRequired, total=False):
    module: str
    number_template: str
    number_reset: "CoreNumberReset"
    number_source: "CoreNumberSource"
    settings: Dict[str, Any]

class CoreDocumentTypePage(TypedDict):
    count: int
    results: List["CoreDocumentType"]

class CoreDocumentTypePatch(TypedDict, total=False):
    name: str
    number_template: str
    number_reset: "CoreNumberReset"
    settings: Dict[str, Any]

class CoreEmployee(TypedDict):
    id: "UUID"
    full_name: str
    first_name: str
    last_name: str
    middle_name: str
    position: str
    position_id: Optional[str]
    position_label: str
    company_id: Optional[str]
    company_name: str
    department: str
    location: str
    manager_employee_id: Optional[str]
    manager_name: str
    phone: str
    email: str
    user_id: Optional[int]
    username: str
    role_name: str
    #: Date or empty string
    employed_at: str
    is_active: bool
    notes: str
    has_photo: bool
    created_at: str
    updated_at: str

class CoreEmployeeCreateVariant1(TypedDict):
    full_name: str

class CoreEmployeeCreateVariant2(TypedDict):
    first_name: str

class CoreEmployeeCreateVariant3(TypedDict):
    last_name: str

class CoreEmployeeCreateVariant4(TypedDict):
    middle_name: str

CoreEmployeeCreate = Union["CoreEmployeeCreateVariant1", "CoreEmployeeCreateVariant2", "CoreEmployeeCreateVariant3", "CoreEmployeeCreateVariant4"]

class CoreEmployeeEquipment(TypedDict):
    id: "UUID"
    employee_id: "UUID"
    employee_name: str
    name: str
    inventory_no: str
    status: Literal['assigned', 'returned']
    #: Date or empty string
    assigned_at: str
    #: Date or empty string
    returned_at: str
    notes: str
    created_at: str
    updated_at: str

class _CoreEmployeeEquipmentInputRequired(TypedDict):
    employee_id: "UUID"
    name: str
    status: Literal['assigned', 'returned']

class CoreEmployeeEquipmentInput(_CoreEmployeeEquipmentInputRequired, total=False):
    inventory_no: str
    assigned_at: str
    returned_at: str
    notes: str

class CoreEmployeeEquipmentPage(TypedDict):
    count: int
    results: List["CoreEmployeeEquipment"]

CoreEmployeeLifecycleKind = Literal['onboarding', 'offboarding']

class CoreEmployeeLifecycleTemplate(TypedDict):
    id: "UUID"
    kind: "CoreEmployeeLifecycleKind"
    name: str
    checklist: List[str]
    is_active: bool
    created_at: str
    updated_at: str

class _CoreEmployeeLifecycleTemplateInputRequired(TypedDict):
    kind: "CoreEmployeeLifecycleKind"
    name: str
    checklist: List[str]

class CoreEmployeeLifecycleTemplateInput(_CoreEmployeeLifecycleTemplateInputRequired, total=False):
    is_active: bool

class CoreEmployeeLifecycleTemplatePage(TypedDict):
    count: int
    results: List["CoreEmployeeLifecycleTemplate"]

class CoreEmployeePage(TypedDict):
    count: int
    #: Применённый размер страницы — после зажима до потолка
    limit: int
    #: Применённое смещение
    offset: int
    results: List["CoreEmployee"]

class CoreEmployeePatch(TypedDict, total=False):
    full_name: str
    first_name: str
    last_name: str
    middle_name: str
    position: Optional[str]
    position_id: Optional[str]
    company_id: Optional[str]
    department: str
    location: str
    phone: str
    email: str
    user_id: Optional[int]
    manager_employee_id: Optional[str]
    employed_at: Optional[str]
    is_active: bool
    notes: str

class CoreExternalContactCandidate(TypedDict):
    external_id: str
    external_name: str
    inn: str
    kpp: str

class CoreExternalContactMatchOption(TypedDict):
    id: "UUID"
    name: str
    kpp: str

CoreExternalContactMatchOutcome = Literal['matched', 'ambiguous', 'not_found', 'no_inn', 'invalid_inn', 'rejected', 'already_linked', 'no_external_id']

class CoreExternalContactMatchReport(TypedDict):
    summary: "CoreExternalContactMatchSummary"
    results: List["CoreExternalContactMatchResult"]

class _CoreExternalContactMatchRequestRequired(TypedDict):
    source_system: str
    external_kind: str
    candidates: List["CoreExternalContactCandidate"]

class CoreExternalContactMatchRequest(_CoreExternalContactMatchRequestRequired, total=False):
    source_ref: str

class CoreExternalContactMatchResult(TypedDict):
    candidate: "CoreExternalContactCandidate"
    outcome: "CoreExternalContactMatchOutcome"
    contact_id: Optional[str]
    notes: List[Literal['kpp_resolved', 'name_differs']]
    options: List["CoreExternalContactMatchOption"]

class CoreExternalContactMatchSummary(TypedDict):
    total: int
    matched: int
    ambiguous: int
    not_found: int
    no_inn: int
    invalid_inn: int
    rejected: int
    already_linked: int
    no_external_id: int

class _CoreExternalRefRequired(TypedDict):
    id: "UUID"
    source_system: str
    source_ref: str
    external_kind: str
    external_id: str
    external_name: str
    entity_type: "CoreExternalRefEntityType"
    entity_id: Optional[str]
    match_source: "CoreExternalRefMatchSource"
    created_at: str
    updated_at: str

class CoreExternalRef(_CoreExternalRefRequired, total=False):
    decided_at: str

CoreExternalRefEntityType = Literal['contact', 'product', 'item', 'gl_account', 'employee']

class _CoreExternalRefInputRequired(TypedDict):
    #: Known value onec or another stable integration key
    source_system: str
    external_kind: str
    external_id: str
    entity_type: "CoreExternalRefEntityType"

class CoreExternalRefInput(_CoreExternalRefInputRequired, total=False):
    #: Concrete connection or export namespace
    source_ref: str
    external_name: str
    entity_id: str
    match_source: "CoreExternalRefMatchSource"

class CoreExternalRefLinkRequest(TypedDict):
    entity_id: "UUID"

CoreExternalRefMatchSource = Literal['pending', 'rejected', 'auto', 'manual', 'import']

class CoreExternalRefPage(TypedDict):
    count: int
    results: List["CoreExternalRef"]

CoreExternalRefRememberRequest = Union[Any, Any]

class _CoreExternalRefResolveRequestRequired(TypedDict):
    source_system: str
    external_kind: str
    external_ids: List[str]

class CoreExternalRefResolveRequest(_CoreExternalRefResolveRequestRequired, total=False):
    source_ref: str

class CoreExternalRefResolveResult(TypedDict):
    count: int
    matches: Dict[str, str]

class CoreFolder(TypedDict):
    id: "UUID"
    scope: "CoreFolderScope"
    parent_id: Optional["UUID"]
    name: str
    defaults: Dict[str, Any]
    sort_order: int
    item_count: int

class _CoreFolderInputRequired(TypedDict):
    scope: "CoreFolderScope"
    name: str

class CoreFolderInput(_CoreFolderInputRequired, total=False):
    parent_id: Optional["UUID"]
    defaults: Dict[str, Any]
    sort_order: int

class CoreFolderPage(TypedDict):
    count: int
    results: List["CoreFolder"]

CoreFolderScope = Literal['dictionary', 'product', 'contact']

class _CoreGLAccountRequired(TypedDict):
    id: "UUID"
    code: str
    name: str
    type: "CoreGLAccountType"
    is_active: bool
    is_system: bool
    affects_pnl: bool
    opening_input: Literal['free', 'contact', 'employee', 'stock', 'money']
    affects_cashflow: bool
    created_at: str
    updated_at: str

class CoreGLAccount(_CoreGLAccountRequired, total=False):
    parent_id: "UUID"

class _CoreGLAccountCreateRequired(TypedDict):
    code: str
    name: str
    type: "CoreGLAccountType"

class CoreGLAccountCreate(_CoreGLAccountCreateRequired, total=False):
    parent_id: "UUID"
    #: Ignored; server derives it from type
    affects_pnl: bool
    affects_cashflow: bool

class CoreGLAccountPage(TypedDict):
    count: int
    results: List["CoreGLAccount"]

class CoreGLAccountPatch(TypedDict, total=False):
    name: str
    parent_id: "UUID"
    is_active: bool
    affects_cashflow: bool

CoreGLAccountType = Literal['asset', 'liability', 'equity', 'income', 'expense']

class _CoreGLMappingRequired(TypedDict):
    id: "UUID"
    subject_type: Literal['item', 'money_account', 'contact']
    account_id: "UUID"
    account_code: str
    account_name: str
    valid_from: str
    is_system: bool
    comment: str

class CoreGLMapping(_CoreGLMappingRequired, total=False):
    subject_id: "UUID"
    valid_to: str

class _CoreGLMappingCreateRequired(TypedDict):
    subject_type: Literal['item', 'money_account', 'contact']
    account_id: "UUID"

class CoreGLMappingCreate(_CoreGLMappingCreateRequired, total=False):
    subject_id: "UUID"
    #: Omitted means today
    valid_from: str
    comment: str

class CoreGLMappingPage(TypedDict):
    count: int
    results: List["CoreGLMapping"]

class _CoreGLOpeningImportRequired(TypedDict):
    id: "UUID"
    status: "CoreGLOpeningImportStatus"
    format: "CoreProductTransferFormat"
    source_name: str
    source_size: int
    report_title: str
    has_opening: bool
    has_closing: bool
    document_id: Optional[str]
    created_at: str
    rows: Optional[List["CoreGLOpeningImportRow"]]
    warnings: List["CoreGLOpeningWarning"]

class CoreGLOpeningImport(_CoreGLOpeningImportRequired, total=False):
    applied_at: str

class CoreGLOpeningImportAppliedRequest(TypedDict):
    document_id: "UUID"

class CoreGLOpeningImportPage(TypedDict):
    count: int
    results: List["CoreGLOpeningImport"]

class _CoreGLOpeningImportRowRequired(TypedDict):
    line: int
    code: str
    name: str
    #: Decimal string without float conversion
    opening_debit: str
    #: Decimal string without float conversion
    opening_credit: str
    #: Decimal string without float conversion
    closing_debit: str
    #: Decimal string without float conversion
    closing_credit: str
    account_id: Optional[str]
    account_code: str
    account_name: str
    opening_input: Literal['', 'free', 'contact', 'employee', 'stock', 'money']
    match: "CoreGLOpeningMatch"
    notes: List["CoreGLOpeningNote"]

class CoreGLOpeningImportRow(_CoreGLOpeningImportRowRequired, total=False):
    subconto: str
    contact_id: str
    contact_name: str
    employee_id: str
    employee_name: str

CoreGLOpeningImportStatus = Literal['draft', 'applied']

CoreGLOpeningMatch = Literal['exact', 'rollup', 'side', 'none', 'skipped']

CoreGLOpeningNote = Literal['rollup', 'side_guess', 'no_account', 'has_detail', 'needs_party', 'needs_staff', 'party_found', 'staff_found', 'owned_stock', 'owned_money', 'no_balance']

CoreGLOpeningWarning = Literal['no_columns', 'no_rows', 'unbalanced', 'no_opening', 'no_closing']

class CoreImportResult(TypedDict):
    created: int
    updated: int

class _CoreItemRequired(TypedDict):
    id: "UUID"
    code: str
    name: str
    use_cashflow: bool
    cashflow_section: Literal['operating', 'investing', 'financing', 'transfer', '']
    cashflow_sort_order: int
    use_pnl: bool
    is_system: bool
    pnl_sort_order: int
    usage_count: int

class CoreItem(_CoreItemRequired, total=False):
    cashflow_section_name: str
    cashflow_parent_id: "UUID"
    pnl_sign: int
    pnl_parent_id: "UUID"

class _CoreItemInputRequired(TypedDict):
    name: str

class CoreItemInput(_CoreItemInputRequired, total=False):
    code: str
    use_cashflow: bool
    cashflow_section: Literal['operating', 'investing', 'financing', 'transfer']
    cashflow_parent_id: "UUID"
    cashflow_sort_order: int
    use_pnl: bool
    pnl_sign: int
    pnl_parent_id: "UUID"
    pnl_sort_order: int

class _CoreItemMoveRequired(TypedDict):
    application: Literal['cashflow', 'pnl']
    position: int

class CoreItemMove(_CoreItemMoveRequired, total=False):
    parent_id: "UUID"
    cashflow_section: Literal['operating', 'investing', 'financing', 'transfer']

class CoreItemPage(TypedDict):
    count: int
    results: List["CoreItem"]

CoreNumberReset = Literal['year', 'never']

CoreNumberSource = Literal['sequence', 'external']

class CoreObjectUsage(TypedDict):
    blocked: bool
    rows: List["CoreObjectUsageRow"]
    message: str

class CoreObjectUsageRow(TypedDict):
    source: Literal['register', 'document']
    key: str
    name: str
    count: int

class _CoreOwnershipVersionRequired(TypedDict):
    id: "UUID"
    business_id: "UUID"
    valid_from: str
    owners: List["CoreBusinessOwner"]

class CoreOwnershipVersion(_CoreOwnershipVersionRequired, total=False):
    valid_to: str

class CoreOwnershipVersionInput(TypedDict):
    valid_from: str
    owners: List["CoreBusinessOwnerInput"]

class CorePhotoResult(TypedDict):
    photo_url: str

class CoreProduct(TypedDict):
    id: "UUID"
    sku: str
    name: str
    unit: str
    unit_id: Optional["UUID"]
    #: Decimal monetary value
    price: str
    external_id: str
    kind: "CoreProductKind"
    is_sellable: bool
    is_stockable: bool
    is_purchasable: bool
    is_producible: bool
    folder_id: Optional["UUID"]
    category_id: Optional["UUID"]
    category_label: str
    record_kind: "CoreProductRecordKind"
    parent_product_id: Optional["UUID"]
    parent_product_name: str
    custom: Dict[str, Any]
    is_active: bool
    archived_at: Optional[str]
    created_at: str
    updated_at: str

class _CoreProductBulkPatchRequired(TypedDict):
    ids: List["UUID"]

class CoreProductBulkPatch(_CoreProductBulkPatchRequired, total=False):
    folder_id: Optional["UUID"]
    is_sellable: bool
    is_stockable: bool
    is_purchasable: bool
    is_producible: bool

class _CoreProductCreateRequired(TypedDict):
    name: str

class CoreProductCreate(_CoreProductCreateRequired, total=False):
    sku: str
    unit: str
    unit_id: Optional["UUID"]
    price: str
    external_id: str
    kind: "CoreProductKind"
    is_sellable: bool
    is_stockable: bool
    is_purchasable: bool
    is_producible: bool
    category_id: Optional["UUID"]
    record_kind: "CoreProductRecordKind"
    parent_product_id: Optional["UUID"]
    custom: Dict[str, Any]

class CoreProductCustomInput(TypedDict):
    custom: Dict[str, Any]

class _CoreProductExportRequired(TypedDict):
    id: "UUID"
    kind: "CoreProductTransferKind"
    format: "CoreProductTransferFormat"
    status: Literal['ready']
    file_name: str
    size: int
    row_count: int
    created_at: str

class CoreProductExport(_CoreProductExportRequired, total=False):
    created_by: int

class _CoreProductExportRequestRequired(TypedDict):
    kind: "CoreProductTransferKind"

class CoreProductExportRequest(_CoreProductExportRequestRequired, total=False):
    format: "CoreProductTransferFormat"

class CoreProductFieldDefinition(TypedDict):
    id: "UUID"
    entity_type: str
    key: str
    label: str
    type: str
    required: bool
    dictionary: Optional["UUID"]
    order: int
    help: str

class CoreProductFieldSchema(TypedDict):
    fields: List["CoreProductFieldDefinition"]

class CoreProductIdentifier(TypedDict):
    id: "UUID"
    product_id: "UUID"
    kind: "CoreProductIdentifierKind"
    source_ref: str
    value: str
    normalized_value: str
    is_primary: bool
    is_active: bool
    attrs: Dict[str, Any]
    created_at: str
    updated_at: str

class _CoreProductIdentifierInputRequired(TypedDict):
    kind: "CoreProductIdentifierKind"
    value: str

class CoreProductIdentifierInput(_CoreProductIdentifierInputRequired, total=False):
    #: Required for article kinds; optional for barcode
    source_ref: str
    is_primary: bool
    attrs: Dict[str, Any]

CoreProductIdentifierKind = Literal['manufacturer_article', 'supplier_article', 'channel_article', 'barcode']

class CoreProductIdentifierPage(TypedDict):
    count: int
    results: List["CoreProductIdentifier"]

class CoreProductIdentifierPatch(TypedDict, total=False):
    kind: "CoreProductIdentifierKind"
    source_ref: str
    value: str
    is_primary: bool
    attrs: Dict[str, Any]

class _CoreProductImportApplyRequestRequired(TypedDict):
    preview_token: str

class CoreProductImportApplyRequest(_CoreProductImportApplyRequestRequired, total=False):
    confirm_warnings: bool

class _CoreProductImportDiffRequired(TypedDict):
    row: int
    action: Literal['create', 'update', 'unchanged']

class CoreProductImportDiff(_CoreProductImportDiffRequired, total=False):
    target_id: str
    sku: str
    name: str
    changes: Dict[str, str]

class CoreProductImportField(TypedDict):
    key: str
    label: str
    required: bool
    type: str

class CoreProductImportFinishRequest(TypedDict):
    file_id: "UUID"

class CoreProductImportInspectRequest(TypedDict):
    sheet_name: str
    header_row: int

class _CoreProductImportIssueRequired(TypedDict):
    sheet: str
    row: int
    column: str
    code: str
    severity: Literal['warning', 'error']
    message: str

class CoreProductImportIssue(_CoreProductImportIssueRequired, total=False):
    value: str
    hint: str

class CoreProductImportIssuePage(TypedDict):
    count: int
    results: List["CoreProductImportIssue"]

CoreProductImportMapping = Union[Any, Any]

class _CoreProductImportMappingStateRequired(TypedDict):
    sheet_name: str
    header_row: int
    columns: Dict[str, str]

class CoreProductImportMappingState(_CoreProductImportMappingStateRequired, total=False):
    expected_revision: int

CoreProductImportMode = Literal['create_only', 'upsert']

class _CoreProductImportRunRequired(TypedDict):
    id: "UUID"
    kind: "CoreProductTransferKind"
    format: "CoreProductTransferFormat"
    status: "CoreProductImportStatus"
    mode: "CoreProductImportMode"
    source_name: str
    source_sha256: str
    source_size: int
    mapping: "CoreProductImportMappingState"
    schema_version: Literal['core-products-v1']
    revision: int
    created_count: int
    updated_count: int
    unchanged_count: int
    warning_count: int
    error_count: int
    created_at: str

class CoreProductImportRun(_CoreProductImportRunRequired, total=False):
    schema_revision: str
    reference_revision: str
    preview_token: str
    diff: List["CoreProductImportDiff"]
    issues: List["CoreProductImportIssue"]
    created_by: int
    previewed_at: str
    applied_at: str
    source_columns: List[str]
    source_sheets: List["CoreProductImportSheet"]
    target_fields: List["CoreProductImportField"]

class CoreProductImportSheet(TypedDict):
    name: str

CoreProductImportStatus = Literal['awaiting_upload', 'uploading', 'uploaded', 'mapped', 'previewed', 'failed', 'applied']

class CoreProductImportUploadSession(TypedDict):
    file_id: "UUID"
    #: Относительный защищённый API URL
    upload_url: str
    method: Literal['PUT']
    headers: Dict[str, str]
    max_bytes: Literal[26214400]
    expires_at: str
    requires_authorization: Literal['Bearer token or API key']

class CoreProductImportUploadSessionRequest(TypedDict):
    kind: "CoreProductTransferKind"
    mode: "CoreProductImportMode"
    #: Имя с расширением xlsx, xls, ods, csv или tsv
    filename: str
    size: int

CoreProductKind = Literal['goods', 'service', 'material', 'semi_product']

class CoreProductPage(TypedDict):
    count: int
    results: List["CoreProduct"]

class CoreProductPatch(TypedDict, total=False):
    sku: str
    name: str
    unit: str
    unit_id: Optional["UUID"]
    price: str
    external_id: str
    kind: "CoreProductKind"
    is_sellable: bool
    is_stockable: bool
    is_purchasable: bool
    is_producible: bool
    category_id: Optional["UUID"]
    folder_id: Optional["UUID"]

CoreProductRecordKind = Literal['standalone', 'family', 'variant']

CoreProductTransferFormat = Literal['xlsx', 'xls', 'ods', 'csv', 'tsv']

CoreProductTransferKind = Literal['product_families', 'products', 'product_identifiers']

class CoreReferenceItem(TypedDict):
    id: "UUID"
    #: Стабильная ссылка на значение: код переживает перенос данных, идентификатор — нет
    code: str
    label: str
    is_active: bool

class _CoreReferenceItemPageRequired(TypedDict):
    count: int
    results: List["CoreReferenceItem"]

class CoreReferenceItemPage(_CoreReferenceItemPageRequired, total=False):
    #: Адрес собственного API типизированного справочника. Приходит вместе с пустым списком: общий список значений такой справочник не заменяет
    api: str
    #: Пояснение к пустому ответу типизированного справочника
    detail: str

class _CoreReferenceRefRequired(TypedDict):
    #: Ключ справочника из каталога (units) либо его полное имя (core.units, app.acme.crm.regions). Полное имя отличает справочник приложения от штатного с тем же последним сегментом
    directory_key: str

class CoreReferenceRef(_CoreReferenceRefRequired, total=False):
    #: Код значения. Указывается код или идентификатор; без обоих ссылка не разрешается
    code: str
    id: "UUID"

class CoreReferenceResolveRequest(TypedDict):
    refs: List["CoreReferenceRef"]

class CoreReferenceResolveResult(TypedDict):
    count: int
    results: List["CoreReferenceVerdict"]

class _CoreReferenceVerdictRequired(TypedDict):
    directory_key: str
    resolved: bool

class CoreReferenceVerdict(_CoreReferenceVerdictRequired, total=False):
    code: str
    id: "UUID"
    label: str
    is_active: bool
    #: Причина отказа словом. «Справочник не найден или недоступен» и «Значение не найдено в этом справочнике» — разные ошибки
    reason: str

class CoreRegister(TypedDict):
    id: "UUID"
    key: str
    name: str
    kind: "CoreRegisterKind"
    module: str
    is_system: bool
    dimensions: List["CoreRegisterDimension"]
    resources: List["CoreRegisterResource"]
    has_entries: bool
    entry_count: int
    last_entry_at: str
    created_at: str
    updated_at: str

class CoreRegisterBalancePage(TypedDict):
    count: int
    #: Применённый размер страницы — то число, на котором читающая функция реально режет выдачу
    limit: int
    #: Применённое смещение
    offset: int
    results: List["CoreRegisterBalanceRow"]

class CoreRegisterBalanceRow(TypedDict):
    dims: Dict[str, Any]
    totals: Dict[str, Any]
    entry_count: int

class _CoreRegisterCreateRequired(TypedDict):
    key: str
    name: str

class CoreRegisterCreate(_CoreRegisterCreateRequired, total=False):
    kind: "CoreRegisterKind"
    module: str
    dimensions: List["CoreRegisterDimension"]
    resources: List["CoreRegisterResource"]

class _CoreRegisterDimensionRequired(TypedDict):
    key: str
    ref: str

class CoreRegisterDimension(_CoreRegisterDimensionRequired, total=False):
    name: str
    required: bool

class CoreRegisterEntry(TypedDict):
    id: "UUID"
    register_id: "UUID"
    register_key: str
    register_name: str
    registrar_type: "UUID"
    registrar_type_key: str
    registrar_type_name: str
    registrar_id: "UUID"
    registrar_number: str
    registrar_date: str
    registrar_status: "CoreDocumentStatus"
    date: str
    sign: int
    dims: Dict[str, Any]
    values: Dict[str, Any]
    created_at: str

class CoreRegisterEntryPage(TypedDict):
    count: int
    results: List["CoreRegisterEntry"]

CoreRegisterKind = Literal['balance', 'turnover', 'info']

class CoreRegisterPage(TypedDict):
    count: int
    #: Применённый размер страницы — после зажима до потолка
    limit: int
    #: Применённое смещение
    offset: int
    results: List["CoreRegister"]

class CoreRegisterPatch(TypedDict, total=False):
    name: str
    dimensions: List["CoreRegisterDimension"]
    resources: List["CoreRegisterResource"]

class _CoreRegisterResourceRequired(TypedDict):
    key: str
    type: Literal['numeric', 'money']

class CoreRegisterResource(_CoreRegisterResourceRequired, total=False):
    unit: str
    name: str
    #: Optional translation key for a system resource label.
    label_key: str
    balanced: bool
    posts_to_ledger: bool
    ledger_account_dim: str
    ledger_counter_dim: str
    ledger_account_by_value: Dict[str, str]
    ledger_liability_values: List[str]

class CoreRegisterTurnoverPage(TypedDict):
    count: int
    #: Применённый размер страницы — то число, на котором читающая функция реально режет выдачу
    limit: int
    #: Применённое смещение
    offset: int
    results: List["CoreRegisterTurnoverRow"]

class _CoreRegisterTurnoverRowRequired(TypedDict):
    dims: Dict[str, Any]
    incoming: Dict[str, Any]
    outgoing: Dict[str, Any]
    net: Dict[str, Any]
    entry_count: int

class CoreRegisterTurnoverRow(_CoreRegisterTurnoverRowRequired, total=False):
    period: str

class CoreTrialBalance(TypedDict):
    date_from: str
    date_to: str
    currency: str
    rows: List["CoreTrialBalanceRow"]
    totals: "CoreTrialBalanceTotals"

class CoreTrialBalanceRow(TypedDict):
    account_id: "UUID"
    code: str
    name: str
    type: "CoreGLAccountType"
    opening_debit: str
    opening_credit: str
    turnover_debit: str
    turnover_credit: str
    closing_debit: str
    closing_credit: str
    entry_count: int

class CoreTrialBalanceTotals(TypedDict):
    opening_debit: str
    opening_credit: str
    turnover_debit: str
    turnover_credit: str
    closing_debit: str
    closing_credit: str
    balanced: bool

class CoreUIState(TypedDict):
    screens: Dict[str, Any]

class Customer(TypedDict):
    id: "UUID"
    name: str
    owner_id: Optional[int]
    owner_name: str
    status: str
    tier: str
    revenue: Optional[str]
    size: Optional[int]
    domains: List[str]
    external_ids: List[str]
    needs_count: int
    is_archived: bool
    created_at: str
    updated_at: str

class _CustomerCreateRequired(TypedDict):
    name: str

class CustomerCreate(_CustomerCreateRequired, total=False):
    #: ID, username или полное имя пользователя
    owner: str
    status: str
    tier: str
    revenue: str
    size: int
    domains: List[str]
    external_ids: List[str]

class CustomerNeed(TypedDict):
    id: "UUID"
    customer: Optional["UUID"]
    customer_name: str
    section: Optional["UUID"]
    section_key: str
    section_name: str
    task: Optional["UUID"]
    task_identifier: str
    task_title: str
    body: str
    priority: int
    is_archived: bool
    created_at: str
    updated_at: str

class _CustomerNeedCreateRequired(TypedDict):
    body: str

class CustomerNeedCreate(_CustomerNeedCreateRequired, total=False):
    customer: str
    section: str
    task: str
    priority: int

class CustomerNeedPage(TypedDict):
    count: int
    results: List["CustomerNeed"]

class CustomerNeedUpdate(TypedDict, total=False):
    customer: str
    section: str
    task: str
    body: str
    priority: int
    is_archived: bool

class CustomerPage(TypedDict):
    count: int
    results: List["Customer"]

class CustomerUpdate(TypedDict, total=False):
    name: str
    owner: str
    status: str
    tier: str
    revenue: str
    size: int
    domains: List[str]
    external_ids: List[str]
    is_archived: bool

class Cycle(TypedDict):
    id: "UUID"
    owner_type: "CycleOwnerType"
    owner_id: "UUID"
    owner_key: str
    owner_name: str
    name: str
    description: str
    starts_at: Optional[str]
    ends_at: Optional[str]
    status: "CycleStatus"
    order: int
    is_archived: bool
    task_count: int
    tasks_done: int
    created_at: str
    updated_at: str

class _CycleCreateRequired(TypedDict):
    name: str

class CycleCreate(_CycleCreateRequired, total=False):
    """Владелец задаётся `section`, `project` или парой `owner_type`/`owner_id`."""

    owner_type: "CycleOwnerType"
    owner_id: str
    section: str
    project: str
    description: str
    starts_at: str
    ends_at: str
    status: "CycleStatus"
    order: int

CycleOwnerType = Literal['section', 'project']

class CyclePage(TypedDict):
    count: int
    results: List["Cycle"]

CycleStatus = Literal['planned', 'active', 'completed', 'cancelled']

class CycleUpdate(TypedDict, total=False):
    owner_type: "CycleOwnerType"
    owner_id: str
    section: str
    project: str
    name: str
    description: str
    starts_at: str
    ends_at: str
    status: "CycleStatus"
    order: int
    is_archived: bool

class DeveloperAccepted(TypedDict):
    #: Единственное значение: исход не различается снаружи ни телом, ни кодом
    status: Literal['accepted']
    #: Условная формулировка «если этот адрес может быть зарегистрирован — мы отправили письмо»: она правдива при любом исходе
    detail: str

class _DeveloperAccountRequired(TypedDict):
    id: "UUID"
    #: Единственный идентификатор человека в этом контуре; кабинета и роли у аккаунта нет вовсе
    email: str
    #: Имя, которым разработчик подписывается; повторная регистрация его не переписывает
    display_name: str
    status: "DeveloperAccountStatus"
    suspend_reason: str
    revoke_reason: str
    created_at: str
    updated_at: str

class DeveloperAccount(_DeveloperAccountRequired, total=False):
    email_confirmed_at: str
    last_sign_in_at: str
    suspended_at: str
    revoked_at: str

DeveloperAccountStatus = Literal['pending', 'active', 'suspended', 'revoked']

class _DeveloperApplicationRequired(TypedDict):
    id: "UUID"
    account_id: "UUID"
    #: Запрошенное имя издателя; из него собирается пространство app.<издатель>.<ключ>
    requested_slug: str
    legal_name: str
    #: Код страны из двух букв
    country: str
    #: Внешний адрес https
    homepage: str
    contact_email: str
    incident_email: str
    status: "DeveloperApplicationStatus"
    #: Причина отказа; заявитель видит её у себя
    decision_reason: str
    #: Заведённый издатель; пусто, пока решения нет
    publisher_slug: str
    created_at: str
    updated_at: str

class DeveloperApplication(_DeveloperApplicationRequired, total=False):
    reviewed_at: str
    #: Сотрудник платформы, принявший решение
    reviewed_by: int

class _DeveloperApplicationInputRequired(TypedDict):
    #: Запрошенное имя издателя: строчные латинские буквы, цифры и дефисы; служебные имена платформы и имена модулей продукта не выдаются
    slug: str
    legal_name: str
    contact_email: str

class DeveloperApplicationInput(_DeveloperApplicationInputRequired, total=False):
    #: Код страны из двух букв
    country: str
    #: Внешний адрес https
    homepage: str
    incident_email: str

class DeveloperApplicationResult(TypedDict):
    application: "DeveloperApplication"

DeveloperApplicationStatus = Literal['submitted', 'approved', 'rejected', 'withdrawn']

class _DeveloperProfileRequired(TypedDict):
    account: "DeveloperAccount"
    #: Издатели, которыми распоряжается аккаунт
    publishers: List["PlatformAppPublisher"]

class DeveloperProfile(_DeveloperProfileRequired, total=False):
    application: "DeveloperApplication"

class _DeveloperRegistrationInputRequired(TypedDict):
    email: str

class DeveloperRegistrationInput(_DeveloperRegistrationInputRequired, total=False):
    #: Как подписывать письма; необязательно и учётными данными не является
    name: str

class DeveloperSession(TypedDict):
    #: Значение сессии; показывается ровно один раз, в хранилище лежит только хеш
    token: str
    #: Секунды до истечения сессии
    expires_in: int
    account: "DeveloperAccount"

class DeveloperSessionInput(TypedDict):
    #: Одноразовый секрет из письма; действует минуты и предъявляется один раз
    code: str

class DeveloperSignInLinkInput(TypedDict):
    email: str

class DiscussionComment(TypedDict):
    id: "UUID"
    owner_type: "DiscussionOwnerType"
    owner_id: "UUID"
    parent_id: Optional["UUID"]
    author_id: Optional[int]
    author_name: str
    body: str
    is_archived: bool
    created_at: str
    updated_at: str

class _DiscussionCommentCreateRequired(TypedDict):
    body: str

class DiscussionCommentCreate(_DiscussionCommentCreateRequired, total=False):
    """Для ответа достаточно `parent_id`; владелец наследуется от родительского комментария."""

    owner_type: "DiscussionOwnerType"
    owner_id: str
    task: str
    section: str
    project: str
    document: str
    milestone: str
    customer_need: str
    pull_request: str
    parent_id: str
    author: int

class DiscussionCommentPage(TypedDict):
    count: int
    results: List["DiscussionComment"]

class DiscussionCommentUpdate(TypedDict, total=False):
    body: str
    is_archived: bool

DiscussionOwnerType = Literal['task', 'section', 'project', 'document', 'milestone', 'customer_need', 'pull_request']

class _DocumentCreateRequired(TypedDict):
    title: str

class DocumentCreate(_DocumentCreateRequired, total=False):
    """Владелец задаётся одной ссылкой `task`, `section`, `project`, `milestone` либо парой `owner_type`/`owner_id`."""

    owner_type: "DocumentOwnerType"
    owner_id: str
    task: str
    section: str
    project: str
    milestone: str
    content: str
    icon: str
    color: str
    author: int

DocumentOwnerType = Literal['task', 'section', 'project', 'milestone']

class DocumentPage(TypedDict):
    count: int
    results: List["TaskDocument"]

class DocumentUpdate(TypedDict, total=False):
    owner_type: "DocumentOwnerType"
    owner_id: str
    task: str
    section: str
    project: str
    milestone: str
    title: str
    content: str
    icon: str
    color: str
    is_archived: bool

class DurationMetric(TypedDict):
    samples: int
    median_seconds: int
    percentile_85_seconds: int

EmptyObject = Dict[str, Any]

class _ErrorRequired(TypedDict):
    #: One human sentence in the request language (Accept-Language, echoed as Content-Language)
    detail: str

class Error(_ErrorRequired, total=False):
    #: Stable module error code when the endpoint defines one
    code: str
    #: Case id. Always present on 5xx and on any error produced by the server itself; the same value is returned in the X-Request-ID header and recorded in the access log and the incident. Quote it to support instead of the cause, which the response never carries.
    request_id: str

class FileUpload(TypedDict):
    file: str

class FinanceAccount(TypedDict):
    id: "UUID"
    company: Optional[str]
    bank: Optional[str]
    company_name: str
    company_directory_name: str
    company_inn: str
    company_is_active: bool
    name: str
    bank_name: str
    bic: str
    number: str
    currency: str
    gl_account: Optional[str]
    is_active: bool
    #: Decimal string
    opening_balance: str
    #: Decimal string
    balance: str
    txn_count: int
    connector: Optional[str]
    connector_name: str
    connector_status: str
    sync_enabled: bool
    synced_at: Optional[str]
    created_at: str
    updated_at: str

class _FinanceAccountCreateRequired(TypedDict):
    name: str
    bic: str
    number: str

class FinanceAccountCreate(_FinanceAccountCreateRequired, total=False):
    company: str
    inn: str
    company_name: str
    bank_name: str
    currency: str
    gl_account: str
    #: Decimal string
    opening_balance: str

class FinanceAccountPage(TypedDict):
    count: int
    results: List["FinanceAccount"]

class FinanceAccountPatch(TypedDict, total=False):
    company: Optional[str]
    company_name: str
    name: str
    bank_name: str
    bic: str
    number: str
    currency: str
    gl_account: Optional[str]
    is_active: bool

class FinanceBalanceItem(TypedDict):
    code: str
    name: str
    amount: str

class FinanceBalanceReport(TypedDict):
    on: str
    currency: str
    sections: List["FinanceBalanceSection"]
    assets_total: str
    passive_total: str
    retained_earnings: str
    difference: str

class FinanceBalanceSection(TypedDict):
    key: Literal['asset', 'liability', 'equity']
    label: str
    total: str
    items: List["FinanceBalanceItem"]

class _FinanceCashflowEntryRequired(TypedDict):
    id: "UUID"
    date: str
    #: Decimal string СО ЗНАКОМ: приход и расход идут одним списком, и знак — единственное, что их различает
    amount: str
    #: Код валюты; нужен и в отчёте по одной валюте, потому что расшифровка открывается и без фильтра
    currency: str
    counterparty: str
    #: Назначение платежа
    purpose: str
    #: Счёт или касса — откуда ушли или куда пришли деньги
    source: str
    document_number: str

class FinanceCashflowEntry(_FinanceCashflowEntryRequired, total=False):
    document_id: "UUID"
    kind: "FinanceCashflowEntryKind"
    transaction_id: "UUID"

class FinanceCashflowEntryCategorize(TypedDict, total=False):
    """Классификация кассовой операции. Пустая строка в любом поле снимает привязку: операция без статьи, без ответственного и без собственника — законное состояние."""

    #: Идентификатор статьи ДДС; пустая строка снимает статью
    cashflow_item: str
    #: Идентификатор ответственного; пустая строка снимает ответственного
    employee: str
    #: Идентификатор собственника; пустая строка снимает собственника
    contact: str

FinanceCashflowEntryKind = Literal['bank', 'cash']

class FinanceCashflowEntryPage(TypedDict):
    #: Сколько операций в ячейке ВСЕГО — считается отдельно, а не по длине выборки
    count: int
    #: Сколько операций поместилось в потолок 200
    shown: int
    results: List["FinanceCashflowEntry"]

class FinanceCashflowItem(TypedDict):
    id: str
    name: str
    net: str
    level: str

FinanceCashflowReport = TypedDict("FinanceCashflowReport", {"from": str, "to": str, "inflow": str, "outflow": str, "uncategorized_net": str, "net_cash_flow": str, "transfer_in": str, "transfer_out": str, "sections": List["FinanceCashflowSection"], "columns": List["FinanceReportColumn"]}, total=False)

class FinanceCashflowSection(TypedDict):
    key: Literal['operating', 'investing', 'financing']
    label: str
    net: str
    items: List["FinanceCashflowItem"]

class FinanceClassificationSuggestion(TypedDict):
    """Мнение внешнего расширения о том, какой статьёй разнести операцию. Классификацией не является: пока человек не принял её штатной командой, в отчётах операции нет."""

    id: "UUID"
    transaction: "UUID"
    #: Установка-автор. Человек обязан видеть, чьё это мнение — иначе совет выглядит выводом самой Akeda
    installation: Dict[str, Any]
    #: Пространство имён приложения: app.<издатель>.<ключ>
    app: str
    app_version: str
    cashflow_item: "UUID"
    cashflow_item_name: Optional[str]
    contact: Optional[str]
    contact_name: Optional[str]
    #: Уверенность долей единицы, decimal string; проценты не принимаются
    confidence: str
    explanation_ru: str
    #: Объяснение локализует сам разработчик расширения; обе половины обязательны
    explanation_en: str
    status: Literal['pending', 'accepted', 'rejected']
    decided_at: Optional[str]
    created_at: str
    updated_at: str

class FinanceCommercialPosition(TypedDict):
    terms: "FinanceCounterpartyTerms"
    exposure: "FinanceSettlementExposure"

class FinanceCompanyMatch(TypedDict):
    status: Literal['linked', 'not_found', 'no_inn']
    inn: str
    company: Optional["FinanceDirectoryCompany"]
    owner_name: str
    suggestion: Optional["FinanceCompanySuggestion"]
    message: str

class FinanceCompanyMatchError(TypedDict):
    detail: str
    company_match: "FinanceCompanyMatch"

class FinanceCompanySuggestion(TypedDict):
    name: str
    legal_name: str
    inn: str
    kpp: str
    address: str

class FinanceConnector(TypedDict):
    id: "UUID"
    provider: "FinanceConnectorProviderKey"
    provider_name: str
    display_name: str
    company_name: str
    company: Optional[str]
    company_directory_name: str
    company_inn: str
    status: "FinanceConnectorStatus"
    status_name: str
    auth_kind: "FinanceConnectorAuthKind"
    #: Только признак; сохранённый секрет никогда не возвращается
    has_credentials: bool
    mtls_certificate: "FinanceConnectorMTLSStatus"
    external_customer_id: str
    granted_by_user_id: Optional[int]
    granted_by_name: str
    granted_at: Optional[str]
    import_depth_days: int
    overlap_days: int
    last_sync_at: Optional[str]
    last_sync_status: str
    #: The provider's own words and nothing else — what the cabinet user can act on ("consent expired", "certificate revoked"). Empty when the failure was ours: an internal cause never reaches this field, it is logged and named by last_error_code instead.
    last_error: str
    #: Machine code of the last failure, translated by the client. Present because the text is stored: it is written in whatever locale the background sync happened to run in, and only a finite code can be rendered in the reader's language.
    last_error_code: Literal['', 'finance.connector.internal', 'finance.connector.provider_unauthorized', 'finance.connector.provider_rate_limited', 'finance.connector.provider_declined', 'finance.connector.consent_required']
    accounts_total: int
    accounts_linked: int
    created_at: str
    updated_at: str

class FinanceConnectorAccount(TypedDict):
    id: "UUID"
    connector: "UUID"
    external_account_id: str
    number: str
    bic: str
    bank_name: str
    title: str
    currency: str
    external_customer_id: str
    owner_inn: str
    owner_name: str
    company: Optional[str]
    company_name: str
    account: Optional[str]
    account_name: str
    company_is_active: bool
    is_enabled: bool
    last_synced_at: Optional[str]

class FinanceConnectorAccountPage(TypedDict):
    count: int
    results: List["FinanceConnectorAccount"]

class FinanceConnectorAccountPatch(TypedDict, total=False):
    account: Optional[str]
    is_enabled: bool

FinanceConnectorAuthKind = Literal['token', 'client_credentials', 'oauth', 'oauth_mtls']

class FinanceConnectorConsent(TypedDict):
    auth_url: str

class _FinanceConnectorCreateRequired(TypedDict):
    provider: "FinanceConnectorProviderKey"

class FinanceConnectorCreate(_FinanceConnectorCreateRequired, total=False):
    display_name: str
    company_name: str
    company: str
    #: Банковский токен либо JSON с client_id/client_secret; никогда не передаётся через MCP
    credential: str
    import_depth_days: int
    overlap_days: int

class FinanceConnectorCredentialTestInput(TypedDict):
    provider: "FinanceConnectorProviderKey"
    credential: str

class _FinanceConnectorCredentialTestResultRequired(TypedDict):
    ok: bool
    message: str
    accounts: int

class FinanceConnectorCredentialTestResult(_FinanceConnectorCredentialTestResultRequired, total=False):
    company_match: "FinanceCompanyMatch"

class FinanceConnectorMTLSInput(TypedDict):
    #: PEM-сертификат клиента
    certificate: str
    #: PEM-закрытый ключ; в ответах и журналах отсутствует
    private_key: str

class _FinanceConnectorMTLSStatusRequired(TypedDict):
    configured: bool

class FinanceConnectorMTLSStatus(_FinanceConnectorMTLSStatusRequired, total=False):
    expires_at: Optional[str]
    warning: str

class FinanceConnectorPage(TypedDict):
    count: int
    results: List["FinanceConnector"]

class FinanceConnectorPatch(TypedDict, total=False):
    display_name: str
    company_name: str
    company: Optional[str]
    #: Непустой новый секрет; пустая строка сохраняет прежний
    credential: str
    import_depth_days: int
    overlap_days: int
    status: Literal['connected', 'paused', 'disconnected']

class _FinanceConnectorProviderRequired(TypedDict):
    key: "FinanceConnectorProviderKey"
    name: str
    auth_kind: "FinanceConnectorAuthKind"
    supports_webhook: bool
    credential_hint: str

class FinanceConnectorProvider(_FinanceConnectorProviderRequired, total=False):
    redirect_path: str

FinanceConnectorProviderKey = Literal['modulbank', 'tbank', 'tochka', 'alfa', 'sber']

class FinanceConnectorProviderPage(TypedDict):
    count: int
    results: List["FinanceConnectorProvider"]

class FinanceConnectorStatementCheck(TypedDict):
    ok: Literal[True]
    transactions: int
    message: str

FinanceConnectorStatus = Literal['connected', 'paused', 'error', 'reauth_required', 'awaiting_consent', 'disconnected']

class FinanceConnectorSyncIntervalOption(TypedDict):
    minutes: int
    label: str

class FinanceConnectorSyncResult(TypedDict):
    connector: "FinanceConnector"
    imported: int
    skipped: int
    message: str

class FinanceConnectorSyncRun(TypedDict):
    id: "UUID"
    connector: "UUID"
    trigger: Literal['manual', 'schedule', 'webhook']
    status: Literal['running', 'success', 'partial', 'failed']
    started_at: str
    finished_at: Optional[str]
    date_from: Optional[str]
    date_to: Optional[str]
    imported_count: int
    skipped_count: int
    error: str

class FinanceConnectorSyncRunPage(TypedDict):
    count: int
    results: List["FinanceConnectorSyncRun"]

class FinanceConnectorSyncSettings(TypedDict):
    schedule_interval_minutes: int
    mode: str
    modulbank_webhook_url: str
    interval_options: List["FinanceConnectorSyncIntervalOption"]

class FinanceConnectorSyncSettingsInput(TypedDict):
    schedule_interval_minutes: int

class _FinanceCounterpartyTermsRequired(TypedDict):
    id: "UUID"
    contact_id: "UUID"
    currency: str
    payment_delay_days: int
    #: Decimal string от 0 до 100
    prepayment_percent: str
    valid_from: str
    reason: str
    created_at: str
    configured: bool

class FinanceCounterpartyTerms(_FinanceCounterpartyTermsRequired, total=False):
    company_id: str
    #: Decimal string; отсутствие означает, что лимит не задан
    credit_limit: str
    valid_to: str
    created_by: int

class _FinanceCounterpartyTermsCreateRequired(TypedDict):
    currency: str
    payment_delay_days: int
    #: Decimal string от 0 до 100
    prepayment_percent: str
    valid_from: str

class FinanceCounterpartyTermsCreate(_FinanceCounterpartyTermsCreateRequired, total=False):
    company_id: str
    #: Неотрицательная decimal string
    credit_limit: str
    valid_to: str
    reason: str

FinanceDirection = Literal['in', 'out']

class FinanceDirectoryCompany(TypedDict):
    id: "UUID"
    name: str
    legal_name: str
    inn: str
    kpp: str
    is_active: bool

class _FinanceDividendDecisionInputRequired(TypedDict):
    period_from: str
    period_to: str

class FinanceDividendDecisionInput(_FinanceDividendDecisionInputRequired, total=False):
    policy_id: "UUID"
    business_id: "UUID"
    #: Совместимый алиас: сервер использует бизнес указанного юрлица
    company_id: "UUID"
    #: Пусто = процент политики от сальдо счёта 84
    amount: str
    comment: str
    rows: List["FinanceDividendDecisionInputRowsItem"]

class _FinanceDividendDecisionInputRowsItemRequired(TypedDict):
    amount: str

class FinanceDividendDecisionInputRowsItem(_FinanceDividendDecisionInputRowsItemRequired, total=False):
    owner_id: "UUID"
    #: Совместимый алиас владельца-контакта
    contact_id: "UUID"

class _FinanceDividendPolicyInputRequired(TypedDict):
    name: str
    valid_from: str
    #: Доля результата, 0 < x <= 100
    distribution_percent: str
    cadence: Literal['monthly', 'quarterly', 'yearly', 'interval']
    #: Конец первого периода
    starts_on: str
    execution_mode: Literal['manual', 'auto_draft', 'auto_post']

class FinanceDividendPolicyInput(_FinanceDividendPolicyInputRequired, total=False):
    business_id: "UUID"
    #: Совместимый алиас: сервер использует бизнес указанного юрлица
    company_id: "UUID"
    base_kind: Literal['pnl', 'operating_cashflow']
    #: through распределяет прибыль и убыток между владельцами в одинаковых долях
    loss_mode: Literal['positive_only', 'through']
    #: Устаревшее поле; политика всегда использует процент результата
    distribution_rule: Literal['percent', 'after_reserve']
    #: Устаревшее поле; резерв больше не участвует в политике
    reserve_amount: str
    interval_months: int
    #: Устаревшее поле; владельцы и доли берутся из отдельной структуры владения бизнесом
    participants: List["FinanceDividendPolicyInputParticipantsItem"]

class _FinanceDividendPolicyInputParticipantsItemRequired(TypedDict):
    contact_id: "UUID"
    share_percent: str

class FinanceDividendPolicyInputParticipantsItem(_FinanceDividendPolicyInputParticipantsItemRequired, total=False):
    user_id: int

class FinanceExchangeApply(TypedDict):
    document_id: "UUID"

class _FinanceExchangeCreateRequired(TypedDict):
    company_id: "UUID"
    adapter_key: str
    direction: Literal['import', 'export']
    object_type: Literal['invoice', 'upd', 'closing_document', 'payment']
    external_id: str
    payload_hash: str

class FinanceExchangeCreate(_FinanceExchangeCreateRequired, total=False):
    metadata: Dict[str, Any]

class _FinanceExchangeItemRequired(TypedDict):
    id: "UUID"
    company_id: "UUID"
    adapter_key: str
    direction: Literal['import', 'export']
    object_type: Literal['invoice', 'upd', 'closing_document', 'payment']
    external_id: str
    payload_hash: str
    last_payload_hash: str
    status: "FinanceExchangeStatus"
    attempt_count: int
    first_seen_at: str
    last_seen_at: str
    last_error: str
    metadata: Dict[str, Any]

class FinanceExchangeItem(_FinanceExchangeItemRequired, total=False):
    canonical_document_id: str
    applied_at: str
    last_actor_id: int
    duplicate: bool
    conflict: bool

class FinanceExchangePage(TypedDict):
    count: int
    results: List["FinanceExchangeItem"]

class FinanceExchangeQuarantine(TypedDict):
    reason: str

FinanceExchangeStatus = Literal['received', 'applied', 'quarantined']

class FinanceImportApply(TypedDict, total=False):
    confirm_warnings: bool

class _FinanceImportDiffRequired(TypedDict):
    row: int
    label: str
    values: Dict[str, str]

class FinanceImportDiff(_FinanceImportDiffRequired, total=False):
    skipped: bool

class FinanceImportField(TypedDict):
    key: str
    label: str
    required: bool

class FinanceImportInspect(TypedDict, total=False):
    sheet_name: str
    header_row: int

class _FinanceImportIssueRequired(TypedDict):
    row: int
    severity: Literal['warning', 'error']
    message: str

class FinanceImportIssue(_FinanceImportIssueRequired, total=False):
    column: str

class FinanceImportItemMappingRequest(TypedDict):
    #: Карта целиком: «название статьи в файле» → идентификатор статьи справочника ДДС. Заменяет прежнюю карту, поэтому присылать надо всё накопленное, а не одну новую пару. Пустое значение означает «оставить без статьи» и не сохраняется; непустое, но не UUID, отклоняется.
    items: Dict[str, str]

FinanceImportKind = Literal['bank_transactions', 'cash_operations']

class _FinanceImportMappingRequired(TypedDict):
    #: Сопоставление «целевое поле Akeda → имя колонки файла».
    columns: Dict[str, str]

class FinanceImportMapping(_FinanceImportMappingRequired, total=False):
    sheet_name: str
    header_row: int
    #: Decimal string из заголовка или введённое вручную значение
    opening_balance: str
    #: Decimal string из заголовка или введённое вручную значение
    closing_balance: str

class _FinanceImportRunRequired(TypedDict):
    id: "UUID"
    kind: "FinanceImportKind"
    format: str
    status: "FinanceImportStatus"
    source_name: str
    source_sha256: str
    source_size: int
    sheet_name: str
    header_row: int
    mapping: Dict[str, str]
    opening_balance: str
    closing_balance: str
    computed_closing_balance: str
    created_count: int
    warning_count: int
    error_count: int
    created_at: str

class FinanceImportRun(_FinanceImportRunRequired, total=False):
    account_id: "UUID"
    wallet_id: "UUID"
    #: Соответствие «название статьи в файле» и идентификатора статьи справочника. Уточняется отдельным маршрутом, потому что набор статей известен только после предпросмотра
    item_mapping: Dict[str, str]
    #: Названия статей из файла, которых нет ни в справочнике, ни в карте соответствий
    unknown_items: List[str]
    diff: List["FinanceImportDiff"]
    issues: List["FinanceImportIssue"]
    created_by: int
    previewed_at: str
    applied_at: str
    source_columns: List[str]
    source_sheets: List["FinanceImportSheet"]
    target_fields: List["FinanceImportField"]

class FinanceImportSheet(TypedDict):
    name: str

FinanceImportStatus = Literal['uploaded', 'mapped', 'previewed', 'applied']

class _FinanceImportUploadRequired(TypedDict):
    file: str
    kind: "FinanceImportKind"

class FinanceImportUpload(_FinanceImportUploadRequired, total=False):
    account_id: "UUID"
    wallet_id: "UUID"

class FinanceOpenAdvance(TypedDict):
    id: "UUID"
    number: str
    date: str
    #: Decimal string
    amount: str
    currency: str
    #: Незачтённая decimal string
    outstanding: str

class _FinanceOpeningBalanceRequestRequired(TypedDict):
    #: Decimal string
    amount: str
    date: str

class FinanceOpeningBalanceRequest(_FinanceOpeningBalanceRequestRequired, total=False):
    #: Обязателен при исправлении сторно-документом
    comment: str

FinancePaymentCalendar = TypedDict("FinancePaymentCalendar", {"valuation_date": str, "project": str, "balance_available": bool, "from": str, "to": str, "currency": str, "derived_available": bool, "derived_note": str, "opening": str, "inflow": str, "outflow": str, "closing": str, "overdue_in": str, "overdue_out": str, "done_in": str, "done_out": str, "companies": List["FinancePaymentCalendarCompany"], "step": Literal['day', 'month', 'quarter'], "periods": List["FinancePaymentCalendarPeriod"], "totals": List["FinancePaymentCalendarCell"], "days": List["FinancePaymentCalendarDay"], "rows": List["FinancePaymentCalendarRow"], "overdue": List["FinancePaymentCalendarRow"]}, total=False)

class FinancePaymentCalendarCell(TypedDict):
    inflow: str
    outflow: str
    delta: str
    balance: str
    negative: bool

class _FinancePaymentCalendarCompanyRequired(TypedDict):
    name: str
    opening: str
    inflow: str
    outflow: str
    closing: str
    sources: List["FinancePaymentCalendarSource"]
    cells: List["FinancePaymentCalendarCell"]

class FinancePaymentCalendarCompany(_FinancePaymentCalendarCompanyRequired, total=False):
    id: "UUID"

class FinancePaymentCalendarDay(TypedDict):
    date: str
    inflow: str
    outflow: str
    balance: str
    negative: bool

FinancePaymentCalendarPeriod = TypedDict("FinancePaymentCalendarPeriod", {"key": str, "from": str, "to": str, "partial": bool}, total=False)

class _FinancePaymentCalendarRowRequired(TypedDict):
    id: "UUID"
    origin: Literal['manual', 'receivable', 'payable']
    date: str
    direction: "FinanceDirection"
    amount: str
    currency: str
    source_kind: "FinancePaymentSourceKind"
    source_name: str
    title: str
    note: str
    contact_name: str
    item_name: str
    company_name: str
    status: str
    overdue: bool

class FinancePaymentCalendarRow(_FinancePaymentCalendarRowRequired, total=False):
    original_amount: str
    original_currency: str
    project_id: "UUID"
    source_id: "UUID"
    contact_id: "UUID"
    item_id: "UUID"
    company_id: "UUID"
    executed_on: str
    document_id: "UUID"
    fact: "FinancePaymentFact"

class FinancePaymentCalendarSource(TypedDict):
    id: "UUID"
    kind: "FinancePaymentSourceKind"
    name: str
    currency: str
    opening: str
    inflow: str
    outflow: str
    closing: str
    cells: List["FinancePaymentCalendarCell"]

class _FinancePaymentFactRequired(TypedDict):
    document_id: "UUID"
    kind: Literal['bank', 'cash']
    number: str
    date: str
    direction: "FinanceDirection"
    amount: str
    currency: str
    source_name: str
    counterparty: str
    purpose: str

class FinancePaymentFact(_FinancePaymentFactRequired, total=False):
    used_by_plan_id: "UUID"

class FinancePaymentFactPage(TypedDict):
    results: List["FinancePaymentFact"]

class _FinancePaymentPlanRequired(TypedDict):
    id: "UUID"
    direction: "FinanceDirection"
    plan_date: str
    amount: str
    currency: str
    source_kind: "FinancePaymentSourceKind"
    title: str
    note: str
    status: Literal['planned', 'done', 'cancelled']
    created_at: str
    updated_at: str

class FinancePaymentPlan(_FinancePaymentPlanRequired, total=False):
    project_id: "UUID"
    company_id: "UUID"
    account_id: "UUID"
    wallet_id: "UUID"
    contact_id: "UUID"
    item_id: "UUID"
    executed_on: str
    executed_document_id: "UUID"

class _FinancePaymentPlanExecuteRequired(TypedDict):
    document_id: "UUID"

class FinancePaymentPlanExecute(_FinancePaymentPlanExecuteRequired, total=False):
    #: Пустое значение означает дату фактической операции
    executed_on: str

class _FinancePaymentPlanInputRequired(TypedDict):
    company_id: "UUID"
    direction: "FinanceDirection"
    plan_date: str
    #: Positive decimal string
    amount: str
    currency: str
    source_kind: "FinancePaymentSourceKind"
    title: str

class FinancePaymentPlanInput(_FinancePaymentPlanInputRequired, total=False):
    project_id: "UUID"
    account_id: "UUID"
    wallet_id: "UUID"
    contact_id: "UUID"
    item_id: "UUID"
    note: str

FinancePaymentSourceKind = Literal['bank', 'cash', 'unset']

class FinancePayoutRegister(TypedDict):
    id: "UUID"
    #: Номер документа реестра
    number: str
    date: str
    #: Decimal string; итог официальных и неофициальных частей строк
    amount: str
    #: Сколько человек в реестре
    people: int
    #: Ключ банковской операции, закрывшей реестр; пусто — реестр ждёт оплаты
    paid_by: str
    status: "FinancePayoutRegisterStatus"

class FinancePayoutRegisterPage(TypedDict):
    count: int
    results: List["FinancePayoutRegister"]

FinancePayoutRegisterStatus = Literal['waiting', 'paid']

class _FinancePayoutSheetRequestRequired(TypedDict):
    account: "UUID"
    rows: List["FinancePayoutSheetRow"]

class FinancePayoutSheetRequest(_FinancePayoutSheetRequestRequired, total=False):
    #: Юрлицо реестра; пусто — берётся из карточки счёта, и без него реестр не завести
    company: str
    #: Дата файла и реестра; неразобранная означает сегодня
    date: str
    #: Назначение платежа; пусто — «Заработная плата»
    purpose: str

class FinancePayoutSheetRow(TypedDict):
    employee: "UUID"
    #: Decimal string; положительная сумма к выплате
    amount: str

class _FinancePayrollAccrualPayloadRequired(TypedDict):
    rows: List["FinancePayrollAccrualRow"]

class FinancePayrollAccrualPayload(_FinancePayrollAccrualPayloadRequired, total=False):
    """Содержимое документа начисления. Начисленный итог и неофициальная часть не хранятся: они выводятся из оклада, премий и официальной части, а второе место с той же истиной разошлось бы с первым."""

    #: Месяц начисления в формате YYYY-MM; дата документа отвечает, когда начисление отражено в учёте
    period: str

class _FinancePayrollAccrualRowRequired(TypedDict):
    employee: "UUID"

class FinancePayrollAccrualRow(_FinancePayrollAccrualRowRequired, total=False):
    """Одна строка начисления — человек за месяц"""

    #: Decimal string; оклад, постоянная часть
    salary: str
    #: Decimal string; первая премия
    bonus1: str
    #: Decimal string; вторая премия
    bonus2: str
    #: Decimal string; официальная часть начисления, не больше суммы оклада и премий
    official: str
    #: Decimal string; НДФЛ, удержанный из официальной части
    tax: str
    #: Decimal string; страховые взносы сверх начисления, а не удержание из него
    insurance: str
    #: Разрез проекта; пустой в регистр не идёт
    project: str
    #: Разрез подразделения; пустой в регистр не идёт
    department: str
    #: Разрез центра финансовой ответственности; пустой в регистр не идёт
    cfo: str

class _FinancePayrollDocumentCreateRequired(TypedDict):
    type: "FinancePayrollDocumentTypeKey"
    refs: "FinancePayrollDocumentRefs"

class FinancePayrollDocumentCreate(_FinancePayrollDocumentCreateRequired, total=False):
    date: str
    comment: str
    #: Строки начисления или реестра; разбор нестрогий — незнакомое поле не отклоняется
    payload: Union["FinancePayrollAccrualPayload", "FinancePayrollPaymentPayload"]
    #: Провести сразу; для реестра выплаты флаг игнорируется
    post: bool

class _FinancePayrollDocumentRefsRequired(TypedDict):
    company: "UUID"

class FinancePayrollDocumentRefs(_FinancePayrollDocumentRefsRequired, total=False):
    """Ссылки зарплатного документа. Юрлицо обязательно уже при заведении: главная книга отвечает на вопрос, чьи это деньги. Статьи нужны проведению начисления, а не заведению черновика."""

    #: Статья затрат на оплату труда; нужна проведению начисления и выдаче наличными
    item: str
    #: Статья НДФЛ; нужна проведению начисления с удержанием
    tax_item: str
    #: Статья страховых взносов; нужна проведению начисления со взносами
    insurance_item: str
    #: Счёт списания реестра; его проставляет выгрузка списка на оплату
    account: str
    #: Касса выдачи; заполненная означает расходный кассовый ордер по реестру
    wallet: str

FinancePayrollDocumentTypeKey = Literal['finance_payroll_accrual', 'finance_payroll_payment']

class FinancePayrollImportInspection(TypedDict):
    sheets: List["FinancePayrollImportSheet"]
    #: Целевые поля разбора; обязателен только сотрудник
    fields: List["FinanceImportField"]

class FinancePayrollImportPreview(TypedDict):
    rows: List["FinancePayrollImportRow"]
    #: Строк, годных к начислению
    ready: int
    #: Строк с проблемой
    broken: int
    #: Decimal string; итог начисленного по годным строкам
    accrued: str

class FinancePayrollImportRow(TypedDict):
    #: Номер строки в файле, а не в ответе: человек правит исходник
    line: int
    #: Как человек назван в файле
    source: str
    #: Найденный сотрудник справочника; пусто — строка не сопоставлена
    employee: str
    #: ФИО найденного сотрудника
    name: str
    #: Decimal string; оклад
    salary: str
    #: Decimal string; первая премия
    bonus1: str
    #: Decimal string; вторая премия
    bonus2: str
    #: Decimal string; официальная часть, равная начисленному при отсутствии своей колонки
    official: str
    #: Decimal string; НДФЛ
    tax: str
    #: Decimal string; страховые взносы
    insurance: str
    #: Decimal string; оклад плюс обе премии
    accrued: str
    #: Decimal string; начисленное за вычетом официальной части
    unofficial: str
    #: Почему строку нельзя начислить; пусто — можно
    problem: str

class FinancePayrollImportSheet(TypedDict):
    name: str
    #: Заголовки строки, выбранной как шапка
    header: Optional[List[str]]
    #: Первые пять строк данных
    sample: Optional[List[List[str]]]
    #: Строк данных на листе, без шапки
    rows: int
    #: Предложенное соответствие «целевое поле → заголовок колонки»
    guessed: Dict[str, str]

FinancePayrollJournal = TypedDict("FinancePayrollJournal", {"from": str, "to": str, "rows": List["FinancePayrollJournalRow"], "totals": "FinancePayrollJournalTotals"}, total=False)

class FinancePayrollJournalRow(TypedDict):
    """Строка журнала — человек за месяц. Все суммы строками: отчёт о деньгах, округлённый по дороге, перестаёт сходиться с книгой ровно там, где на него смотрят."""

    #: Идентификатор сотрудника
    employee: str
    employee_name: str
    job_title: str
    department: str
    #: Месяц строки в формате YYYY-MM
    period: str
    #: Decimal string
    salary: str
    #: Decimal string
    bonus1: str
    #: Decimal string
    bonus2: str
    #: Decimal string — начислено всего
    accrued: str
    #: Decimal string — официальная часть начисления
    official: str
    #: Decimal string — неофициальная часть начисления
    unofficial: str
    #: Decimal string — НДФЛ
    tax: str
    #: Decimal string — взносы
    insurance: str
    #: Decimal string — на руки официально: официальная часть за вычетом НДФЛ
    net_official: str
    #: Decimal string — на руки неофициально: неофициальная часть целиком, с неё не удерживают
    net_unofficial: str
    #: Decimal string
    paid_official: str
    #: Decimal string
    paid_unofficial: str
    #: Decimal string — сколько человеку должны на конец месяца строки. Долг один: сальдо счетов 70.01 и 70.02 вместе, а не вычитание колонок.
    debt: str

class FinancePayrollJournalTotals(TypedDict):
    #: Decimal string
    accrued: str
    #: Decimal string
    official: str
    #: Decimal string
    unofficial: str
    #: Decimal string
    tax: str
    #: Decimal string
    insurance: str
    #: Decimal string
    paid_official: str
    #: Decimal string
    paid_unofficial: str
    #: Decimal string — берётся только с последней строки каждого сотрудника: сальдо накопительное
    debt: str

class _FinancePayrollPaymentPayloadRequired(TypedDict):
    rows: List["FinancePayrollPaymentRow"]

class FinancePayrollPaymentPayload(_FinancePayrollPaymentPayloadRequired, total=False):
    """Содержимое реестра выплаты. Строка без человека и строка с двумя нулями не годятся, и узнаётся это при заведении, а не в момент оплаты."""

    #: Месяц выплаты в формате YYYY-MM
    period: str
    #: Назначение платежа; так его записывает выгрузка списка на оплату
    purpose: str

class _FinancePayrollPaymentRowRequired(TypedDict):
    employee: "UUID"

class FinancePayrollPaymentRow(_FinancePayrollPaymentRowRequired, total=False):
    """Одна строка реестра выплаты"""

    #: Decimal string; официальная часть выплаты
    official: str
    #: Decimal string; неофициальная часть выплаты
    unofficial: str

class FinancePeriodCheck(TypedDict):
    key: str
    title: str
    detail: str
    passed: bool

class FinancePeriodCheckPage(TypedDict):
    checks: List["FinancePeriodCheck"]

class FinancePnlCoverage(TypedDict):
    missing: List["FinancePnlCoverageItem"]
    duplicated: List["FinancePnlCoverageItem"]

class _FinancePnlCoverageItemRequired(TypedDict):
    id: "UUID"
    name: str
    path: str

class FinancePnlCoverageItem(_FinancePnlCoverageItemRequired, total=False):
    times: int

class _FinancePnlEntryRequired(TypedDict):
    id: "UUID"
    date: str
    #: Decimal string со знаком ОТЧЁТА, а не со знаком книги: расшифровка обязана складываться в ту строку, которую раскрывают
    amount: str
    document_number: str
    #: Вид документа словами: продажа, закупка, банковская операция
    document_type: str
    #: Вид документа машинным ключом — по нему документ открывается ТАМ, где он живёт: модульные документы общий журнал не отдаёт
    document_type_key: str
    counterparty: str
    #: Счёт результата: одна статья может лечь на разные счета, если правило проводки менялось
    account_code: str
    account_name: str
    comment: str

class FinancePnlEntry(_FinancePnlEntryRequired, total=False):
    document_id: "UUID"

class FinancePnlEntryPage(TypedDict):
    #: Длина `results`, а не число проводок ячейки: список уже обрезан потолком 200
    count: int
    results: List["FinancePnlEntry"]

class _FinancePnlFormulaTokenRequired(TypedDict):
    kind: Literal['row', 'number', 'op', 'open', 'close']

class FinancePnlFormulaToken(_FinancePnlFormulaTokenRequired, total=False):
    row_id: "UUID"
    op: Literal['+', '-', '*', '/']
    value: str

class FinancePnlItem(TypedDict):
    id: "UUID"
    name: str
    #: Пустая строка у корневой статьи
    parent_id: str

class FinancePnlItemPage(TypedDict):
    count: int
    results: List["FinancePnlItem"]

class FinancePnlLayout(TypedDict):
    id: "UUID"
    name: str
    is_default: bool
    rows: List["FinancePnlLayoutRow"]

class _FinancePnlLayoutCreateRequired(TypedDict):
    name: str

class FinancePnlLayoutCreate(_FinancePnlLayoutCreateRequired, total=False):
    is_default: bool

class FinancePnlLayoutPage(TypedDict):
    count: int
    results: List["FinancePnlLayout"]

class _FinancePnlLayoutRowRequired(TypedDict):
    id: "UUID"
    kind: Literal['item', 'section', 'formula', 'header', 'source']
    title: str
    formula: List["FinancePnlFormulaToken"]
    format: Literal['amount', 'percent']
    collapsed: bool

class FinancePnlLayoutRow(_FinancePnlLayoutRowRequired, total=False):
    parent_id: "UUID"
    item_id: "UUID"
    system_row: str

class FinancePnlLayoutSave(TypedDict):
    name: str
    is_default: bool
    rows: List["FinancePnlLayoutRow"]

class FinancePnlLine(TypedDict):
    id: str
    name: str
    sign: int
    amount: str

FinancePnlReport = TypedDict("FinancePnlReport", {"from": str, "to": str, "revenue": str, "expense": str, "profit": str, "unclassified_in": str, "unclassified_out": str, "lines": List["FinancePnlLine"], "layout_rows": List["FinancePnlReportRow"], "layout": "FinancePnlReportLayout", "columns": List["FinanceReportColumn"], "companies": List["FinanceReportCompany"]}, total=False)

class FinancePnlReportLayout(TypedDict):
    id: "UUID"
    name: str
    is_default: bool
    coverage: "FinancePnlCoverage"
    system_rows: Dict[str, str]

class _FinancePnlReportRowRequired(TypedDict):
    id: str
    kind: str
    name: str
    level: int
    collapsed: bool
    has_children: bool
    format: str

class FinancePnlReportRow(_FinancePnlReportRowRequired, total=False):
    amount: str
    system_row: str
    problem: str

class FinanceProject(TypedDict):
    id: "UUID"
    name: str
    attrs: Dict[str, Any]
    is_active: bool
    first_fact_date: Optional[str]
    revenue: str
    expense: str
    profit: str
    received: str
    paid: str
    receivable: str
    payable: str
    customer_advances: str
    supplier_advances: str
    margin: Optional[str]
    plan_revenue: Optional[str]
    plan_expense: Optional[str]
    plan_profit: Optional[str]
    lines: List["FinanceProjectLine"]
    budgets: List["FinanceProjectBudget"]

class FinanceProjectBudget(TypedDict):
    id: "UUID"
    project_id: "UUID"
    company_id: "UUID"
    date: str
    currency: str
    revision: int
    note: str
    lines: List["FinanceProjectBudgetLine"]
    created_at: str

FinanceProjectBudgetInput = Union[Any, Any]

class FinanceProjectBudgetLine(TypedDict):
    item_id: "UUID"
    #: Положительная сумма или ноль; знак определяется статьёй
    amount: str

class FinanceProjectLine(TypedDict):
    item_id: str
    name: str
    sign: int
    actual: str
    plan: Optional[str]
    variance: Optional[str]

class FinanceProjectReport(TypedDict):
    on: str
    currency: str
    company: str
    projects: List["FinanceProject"]

class FinanceReconciliation(TypedDict):
    summary: "FinanceReconciliationSummary"
    results: List["FinanceTransaction"]

class _FinanceReconciliationAccountRequired(TypedDict):
    account_id: "UUID"
    account: str
    currency: str
    #: Дата, на которую сделан расчёт
    on: str
    #: Decimal string — наш расчёт: входящий остаток плюс движения по дату
    ours: str
    #: Decimal string — слагаемое расчёта
    opening_balance: str
    #: Decimal string — приход за период
    turnover_in: str
    #: Decimal string — расход за период
    turnover_out: str
    days: List["FinanceReconciliationDay"]
    statement_gaps: List["FinanceReconciliationStatementGap"]

class FinanceReconciliationAccount(_FinanceReconciliationAccountRequired, total=False):
    #: Decimal string — слово банка на дату `as_of`. Отсутствует, когда сверять не с чем; это не «сошлось».
    theirs: str
    #: Дата, на которую банк назвал остаток
    as_of: str
    source: "FinanceReconciliationSource"
    #: Decimal string — наш расчёт минус банк. Отсутствует вместе с `theirs`: разница с тем, чего не сказали, не равна нулю.
    difference: str

class FinanceReconciliationDay(TypedDict):
    date: str
    reason: "FinanceReconciliationDayReason"
    #: Сколько операций этого дня попало под причину
    count: int
    #: Decimal string — сумма операций дня по этой причине, со знаком движения
    amount: str

FinanceReconciliationDayReason = Literal['unposted', 'duplicate', 'outside_statement']

FinanceReconciliationSource = Literal['statement', 'bank']

FinanceReconciliationStatementGap = TypedDict("FinanceReconciliationStatementGap", {"from": str, "to": str}, total=False)

class FinanceReconciliationSummary(TypedDict):
    total_count: int
    needs_attention_count: int
    unmatched_count: int
    #: Входящие платежи без заказа и без проекта; имя поля сохранено для совместимости
    missing_order_count: int
    missing_cashflow_count: int
    #: Сумма входящих платежей без заказа и без проекта; decimal string
    incoming_unlinked_amount: str

class FinanceRegisterAccountCheck(TypedDict):
    account: str
    name: str
    register: str
    transactions: str
    adjustments: str
    match: bool

class FinanceRegisterReconciliation(TypedDict):
    accounts: List["FinanceRegisterAccountCheck"]
    accounts_match: bool
    unprojected_count: int
    unposted_count: int
    ledger: List[Dict[str, Any]]
    ledger_match: bool
    unallocated: str
    settlements: List[Dict[str, Any]]
    settlements_match: bool
    transit: List[Dict[str, Any]]
    transit_total: str
    transit_match: bool

class FinanceRegisterRepairFailure(TypedDict):
    id: "UUID"
    error: str

class FinanceRegisterRepairRequest(TypedDict, total=False):
    transaction_ids: List["UUID"]
    cash_document_ids: List["UUID"]

class FinanceRegisterRepairResult(TypedDict):
    transactions_repaired: int
    cash_documents_repaired: int
    failures: List["FinanceRegisterRepairFailure"]

class FinanceRegistersResyncResult(TypedDict):
    projected: int
    healed: int
    bank_reposted: int
    cash_reposted: int
    settlements_reposted: int
    failed: int

FinanceReportColumn = TypedDict("FinanceReportColumn", {"key": str, "label": str, "from": str, "to": str, "total": bool, "payload": Dict[str, Any]}, total=False)

class FinanceReportCompany(TypedDict):
    id: str
    name: str

class FinanceRequisitesBank(TypedDict):
    name: str
    bic: str
    correspondent_account: str
    city: str

class FinanceRequisitesLookup(TypedDict):
    organization: Optional["FinanceRequisitesParty"]
    bank: Optional["FinanceRequisitesBank"]
    number_valid: Optional[bool]
    warnings: Optional[List[str]]
    directory_configured: bool

class FinanceRequisitesParty(TypedDict):
    name: str
    full_name: str
    inn: str
    kpp: str
    ogrn: str
    address: str
    status: str

class FinanceResponsiblePatch(TypedDict):
    responsible: Optional[str]

class FinanceSettlementBalance(TypedDict):
    obligation_id: "UUID"
    #: Decimal string
    remaining: str

class FinanceSettlementBalancePage(TypedDict):
    count: int
    results: List["FinanceSettlementBalance"]

class _FinanceSettlementDocumentCreateRequired(TypedDict):
    type_key: "FinanceSettlementDocumentType"
    company_id: "UUID"
    contact_id: "UUID"
    currency: str

class FinanceSettlementDocumentCreate(_FinanceSettlementDocumentCreateRequired, total=False):
    number: str
    date: str
    #: Положительная decimal string для долгов, авансов, сделок, зачёта и распределения
    amount: str
    #: Обязательна для долга, продажи и закупки
    due_date: str
    #: Обязательно для зачёта аванса и распределения оплаты
    obligation_id: str
    #: Оплата-источник аванса либо обязательная оплата для распределения
    payment_id: str
    sources: List["FinanceSettlementSourceAllocationInput"]
    #: Обязателен для зачёта аванса
    advance_id: str
    #: Обязательна для продажи и закупки
    pnl_item_id: str
    #: Путешествие или проект продажи и закупки
    project_id: str
    #: Обязательна только для аванса
    side: Literal['receivable_advance', 'payable_advance']
    comment: str
    #: Ключ идемпотентности сделки (только продажа и закупка): система-источник — учётная система клиента или ключ стороннего приложения
    source_system: str
    #: Какая именно база/кабинет клиента внутри source_system; пусто — единственный источник
    source_ref: str
    #: Идентификатор сделки в source_system; повтор того же (source_system, source_ref, external_id) возвращает уже созданный документ вместо второго
    external_id: str

FinanceSettlementDocumentType = Literal['finance_settlement_baseline', 'finance_receivable_opening', 'finance_receivable', 'finance_payable_opening', 'finance_payable', 'finance_advance', 'finance_advance_offset', 'finance_sale', 'finance_purchase', 'finance_payment_allocation']

class FinanceSettlementExposure(TypedDict):
    available: bool
    as_of: str
    contact_id: "UUID"
    company_id: "UUID"
    currency: str
    #: Decimal string
    receivable: str
    #: Decimal string
    overdue: str
    open_obligations: int
    source: str

class FinanceSettlementPayment(TypedDict):
    document: "CoreDocument"
    #: Decimal string
    remaining: str

class FinanceSettlementPaymentPage(TypedDict):
    count: int
    results: List["FinanceSettlementPayment"]

class FinanceSettlementSource(TypedDict):
    id: "UUID"
    type_key: str
    type_name: str
    number: str
    date: str
    status: str
    #: Decimal string
    available_amount: str

class FinanceSettlementSourceAllocationInput(TypedDict):
    document_id: "UUID"
    #: Положительная decimal string; сумма строк должна совпасть с amount документа
    amount: str

class FinanceSettlementSourcePage(TypedDict):
    count: int
    results: List["FinanceSettlementSource"]

class FinanceStatement(TypedDict):
    id: "UUID"
    account: "UUID"
    account_name: str
    date_from: str
    date_to: str
    #: Decimal string
    opening_balance: str
    #: Decimal string
    closing_balance: str
    provider: str
    imported_at: str

class _FinanceStatementCreateRequired(TypedDict):
    account: "UUID"
    date_from: str
    date_to: str

class FinanceStatementCreate(_FinanceStatementCreateRequired, total=False):
    #: Decimal string
    opening_balance: str
    #: Decimal string
    closing_balance: str
    provider: str

class FinanceStatementLinkInput(TypedDict):
    transactions: List["FinanceStatementLinkInputTransactionsItem"]

class FinanceStatementLinkInputTransactionsItem(TypedDict):
    transaction_id: "UUID"
    previous_statement_id: Optional[str]

class FinanceStatementLinkResult(TypedDict):
    statement_id: "UUID"
    linked: int
    unchanged: int

class FinanceStatementPage(TypedDict):
    count: int
    #: Применённый размер страницы — после зажима до потолка
    limit: int
    #: Применённое смещение
    offset: int
    results: List["FinanceStatement"]

class FinanceTradeAdvance(TypedDict):
    #: Общая свободная decimal string
    amount: str
    advances: List["FinanceOpenAdvance"]

class FinanceTradeJournalPage(TypedDict):
    count: int
    results: List["FinanceTradeJournalRow"]

class FinanceTradeJournalRow(TypedDict):
    id: "UUID"
    number: str
    date: str
    status: str
    contact_id: Optional[str]
    contact_name: str
    company_id: Optional[str]
    company_name: str
    project_id: Optional[str]
    project_name: str
    item_name: str
    #: Decimal string
    amount: str
    currency: str
    due_date: str
    #: Decimal string из регистра расчётов
    outstanding: str

class _FinanceTransactionRequired(TypedDict):
    id: "UUID"
    date: str
    direction: "FinanceDirection"
    #: Positive decimal string
    amount: str
    currency: str
    counterparty_name: str
    counterparty_inn: str
    counterparty_account: str
    purpose: str
    bank_txn_id: str
    account: "UUID"
    account_name: str
    statement: Optional[str]
    cashflow_item: Optional[str]
    cashflow_item_name: Optional[str]
    cashflow_section: Optional[str]
    pnl_item: Optional[str]
    pnl_item_name: Optional[str]
    contact: Optional[str]
    contact_name: Optional[str]
    order: Optional[str]
    order_number: Optional[str]
    project: Optional[str]
    project_name: Optional[str]
    order_total: Optional[str]
    order_paid_percent: int
    match_state: str
    reconciliation_state: str
    reconciliation_needs: List[str]
    classification_explanation: str
    suggested_order: Optional[Dict[str, Any]]
    suggested_cashflow_item: Optional[Dict[str, Any]]
    suggested_pnl_item: Optional[Dict[str, Any]]
    created_at: str
    updated_at: str

class FinanceTransaction(_FinanceTransactionRequired, total=False):
    #: Операционный ответственный, не участвующий в проводках
    responsible: Optional[str]
    responsible_name: Optional[str]

class FinanceTransactionCategorize(TypedDict, total=False):
    cashflow_item: Optional[str]
    contact: Optional[str]
    order: Optional[str]
    project: Optional[str]
    #: Рекомендация внешнего расширения, которую человек принимает этим вызовом. Не второй способ назвать статью: статья берётся из самой рекомендации, а поле отвечает на другой вопрос — чей совет сработал. Названная в теле другая статья — отказ, а не тихая победа одного из двух значений. Рекомендация с чужой операции и уже решённая отвечают так же, как несуществующая.
    suggestion: Optional[str]

class _FinanceTransactionCreateRequired(TypedDict):
    account: "UUID"
    date: str
    direction: "FinanceDirection"
    amount: str

class FinanceTransactionCreate(_FinanceTransactionCreateRequired, total=False):
    statement: str
    currency: str
    counterparty_name: str
    counterparty_inn: str
    counterparty_account: str
    purpose: str
    #: Если пуст, сервер строит детерминированный ключ из операции
    bank_txn_id: str
    cashflow_item: str
    contact: str
    order: str
    project: str

class FinanceTransactionPage(TypedDict):
    #: Строк на этой странице
    count: int
    #: Сколько операций отвечает отбору целиком; сравнение с count говорит, есть ли ещё страницы
    total: int
    results: List["FinanceTransaction"]
    totals: "FinanceTransactionTotals"

class FinanceTransactionTotals(TypedDict):
    """Итоги по всему отбору, а не по странице. Суммы в валюте учёта по историческому курсу"""

    #: Приход; null, когда итог не посчитан
    inflow: Optional[str]
    #: Расход; null, когда итог не посчитан
    outflow: Optional[str]
    currency: str
    #: Сколько операций осталось без пересчёта в валюту учёта: неполный пересчёт не должен выглядеть верным итогом
    unconverted_count: int

class HubCounters(TypedDict):
    files: int
    meetings: int
    secrets: int
    tasks_total: int
    tasks_done: int

class HubOverview(TypedDict):
    project: "HubProject"
    sections: List["HubSection"]
    last_status: Optional["StatusUpdate"]
    meetings_upcoming: List["Meeting"]
    meetings_recent: List["Meeting"]

class HubProject(TypedDict):
    id: "UUID"
    key: str
    name: str
    description: str
    color: str
    contact_id: Optional["UUID"]
    contact_name: str
    company_id: Optional["UUID"]
    start_date: str
    target_date: str
    lead_user_id: Optional[int]
    lead_name: str
    counters: "HubCounters"

class HubSection(TypedDict):
    id: "UUID"
    project_id: "UUID"
    kind: Literal['overview', 'journal', 'roadmap', 'meetings', 'files', 'secrets']
    title: str
    icon: str
    sort_order: int
    is_enabled: bool
    visibility: "HubVisibility"
    created_at: str
    updated_at: str

class HubSectionPage(TypedDict):
    count: int
    results: List["HubSection"]

class HubSectionUpdate(TypedDict, total=False):
    title: str
    icon: str
    sort_order: int
    is_enabled: bool
    visibility: "HubVisibility"

HubVisibility = Literal['team', 'client']

class _KnowledgeACLGrantRequired(TypedDict):
    principal_type: Literal['everyone', 'user', 'role', 'department']
    #: Ключ принципала: id пользователя, UUID роли, название подразделения или * для всех
    principal_key: str
    #: Уровень «Просмотр»
    can_read: bool

class KnowledgeACLGrant(_KnowledgeACLGrantRequired, total=False):
    id: "UUID"
    #: Уровень «Редактирование»; включает просмотр
    can_write: bool
    #: Уровень «Публикация»; включает редактирование
    can_publish: bool
    #: Уровень «Владелец»; живёт только на пространстве и только у пользователя
    can_manage: bool

class KnowledgeAccessOption(TypedDict):
    key: str
    label: str

class KnowledgeAccessOptions(TypedDict):
    users: List["KnowledgeAccessOption"]
    roles: List["KnowledgeAccessOption"]
    departments: List["KnowledgeAccessOption"]

class KnowledgeAnswer(TypedDict):
    id: "UUID"
    answer: str
    citations: List["KnowledgeCitation"]
    #: Опоры в материалах не нашлось, и ответ не выдуман
    abstained: bool
    generated: bool
    retrieval_mode: str

class _KnowledgeAnswerFeedbackInputRequired(TypedDict):
    #: Ответ помог; при true причина и комментарий очищаются
    helpful: bool

class KnowledgeAnswerFeedbackInput(_KnowledgeAnswerFeedbackInputRequired, total=False):
    #: Что было не так с ответом; обязательно при helpful=false
    issue: Literal['missing', 'incorrect', 'outdated', 'unclear', 'other']
    #: Пояснение к отрицательной оценке; при helpful=true отбрасывается
    comment: str

class _KnowledgeAnswerInputRequired(TypedDict):
    question: str

class KnowledgeAnswerInput(_KnowledgeAnswerInputRequired, total=False):
    #: Сколько фрагментов-опор искать; по умолчанию 6
    limit: int
    #: Предыдущие ходы диалога; доступ они не расширяют
    history: List["KnowledgeAnswerTurn"]
    #: Где искать: company — материалы компании, guides — встроенные руководства продукта, all — оба корпуса
    scope: Literal['all', 'company', 'guides']

class KnowledgeAnswerQuality(TypedDict):
    #: Длина периода в днях; по умолчанию 30
    period_days: int
    #: Прогонов ответа за период
    total: int
    #: Ответов без опоры в материалах
    abstained: int
    #: Ответов собранных генеративной моделью
    generated: int
    #: Положительных оценок
    helpful: int
    #: Отрицательных оценок
    unhelpful: int
    #: Средняя длительность ответа в миллисекундах
    average_latency_ms: float
    #: Частые вопросы без ответа или с отрицательной оценкой; сюда смотрят когда решают что дописать
    content_gaps: List["KnowledgeContentGap"]
    index: "KnowledgeIndexHealth"

class KnowledgeAnswerTurn(TypedDict):
    question: str
    answer: str

class _KnowledgeAssetRequired(TypedDict):
    id: "UUID"
    space_id: "UUID"
    node_id: "UUID"
    name: str
    mime_type: str
    size_bytes: int
    content_sha256: str
    #: Разбор файла для индекса: pending, processing, ready, failed или unsupported
    processing_status: str
    uploaded_by: int
    created_at: str
    updated_at: str

class KnowledgeAsset(_KnowledgeAssetRequired, total=False):
    parser_name: str
    parser_version: str
    processing_error: str
    processed_at: str

class _KnowledgeCitationRequired(TypedDict):
    chunk_id: "UUID"
    #: Откуда фрагмент: страница, файл страницы или встроенное руководство
    source_kind: str
    node_id: "UUID"
    space_id: "UUID"
    revision_id: "UUID"
    title: str
    slug: str
    breadcrumb: str
    quote: str
    #: Адрес фрагмента внутри источника
    locator: Dict[str, Any]
    is_stale: bool

class KnowledgeCitation(_KnowledgeCitationRequired, total=False):
    asset_id: "UUID"
    section_heading: str

class KnowledgeContentGap(TypedDict):
    #: Вопрос без ответа или с отрицательной оценкой
    question: str
    #: Сколько раз вопрос задали за период; вопросы группируются без учёта регистра
    count: int
    last_asked_at: str

class KnowledgeDocument(TypedDict):
    """Канонический блочный документ страницы; редактор читает только эту схему."""

    schema: Literal['akeda.knowledge.document']
    #: Актуальная версия схемы — 2
    schema_version: int
    type: Literal['doc']
    #: Блоки страницы
    content: List[Dict[str, Any]]

class _KnowledgeIndexHealthRequired(TypedDict):
    #: Поколений индекса в работе
    active_generations: int
    #: Поколений индекса в сборке
    building_generations: int
    #: Поколений индекса со сбоем
    failed_generations: int
    #: Фрагментов в индексе; страницы и файлы вместе
    chunks: int
    #: Файлов в очереди разбора
    pending_assets: int
    #: Файлов в разборе
    processing_assets: int
    #: Файлов в индексе
    ready_assets: int
    #: Файлов со сбоем разбора
    failed_assets: int
    #: Файлов с неподдерживаемым форматом
    unsupported_assets: int

class KnowledgeIndexHealth(_KnowledgeIndexHealthRequired, total=False):
    #: Когда индекс переключался на новое поколение
    last_activated_at: str

class _KnowledgeMoveInputRequired(TypedDict):
    expected_version: int

class KnowledgeMoveInput(_KnowledgeMoveInputRequired, total=False):
    parent_id: "UUID"
    #: Место среди соседей, 0 — первое
    position: int

class _KnowledgeNodeRequired(TypedDict):
    id: "UUID"
    space_id: "UUID"
    title: str
    slug: str
    icon: str
    sort_order: int
    #: Состояние страницы: draft, review, published или archived
    status: str
    owner_id: int
    #: Версия страницы для optimistic locking следующего изменения
    version: int
    created_by: int
    created_at: str
    updated_at: str
    is_favorite: bool
    #: Срок подтверждения актуальности истёк
    is_stale: bool

class KnowledgeNode(_KnowledgeNodeRequired, total=False):
    parent_id: "UUID"
    current_draft_revision_id: "UUID"
    published_revision_id: "UUID"
    verify_at: str
    submitted_revision_id: "UUID"
    reviewer_id: int
    submitted_by: int
    submitted_at: str
    reviewed_by: int
    reviewed_at: str
    review_note: str
    tags: List["KnowledgeTag"]
    draft: "KnowledgeRevision"
    published: "KnowledgeRevision"

class KnowledgeNodeAccessInput(TypedDict):
    break_inheritance: bool
    grants: List["KnowledgeACLGrant"]

class KnowledgeNodeAccessPolicy(TypedDict):
    space_id: "UUID"
    node_id: "UUID"
    break_inheritance: bool
    grants: List["KnowledgeACLGrant"]

class _KnowledgeNodeInputRequired(TypedDict):
    space_id: "UUID"
    title: str

class KnowledgeNodeInput(_KnowledgeNodeInputRequired, total=False):
    parent_id: "UUID"
    slug: str
    #: Имя иконки Lucide; по умолчанию file-text
    icon: str
    #: Ответственный за страницу; по умолчанию автор вызова
    owner_id: int

class _KnowledgeReviewInputRequired(TypedDict):
    expected_version: int

class KnowledgeReviewInput(_KnowledgeReviewInputRequired, total=False):
    #: Сотрудник, которого просят согласовать редакцию
    reviewer_id: int
    note: str

class _KnowledgeRevisionRequired(TypedDict):
    id: "UUID"
    node_id: "UUID"
    revision_no: int
    title: str
    schema_version: int
    content: "KnowledgeDocument"
    #: Производное текстовое представление для поиска и ответов
    plain_text: str
    author_id: int
    created_at: str

class KnowledgeRevision(_KnowledgeRevisionRequired, total=False):
    published_at: str

class _KnowledgeRevisionInputRequired(TypedDict):
    #: Версия страницы из её карточки; чужая правка отдаётся конфликтом
    expected_version: int
    title: str
    content: "KnowledgeDocument"

class KnowledgeRevisionInput(_KnowledgeRevisionInputRequired, total=False):
    plain_text: str

class KnowledgeRevisionRestoreInput(TypedDict):
    #: Версия страницы из её карточки
    expected_version: int
    revision_id: "UUID"

class KnowledgeSearchResult(TypedDict):
    node_id: "UUID"
    space_id: "UUID"
    title: str
    slug: str
    snippet: str
    updated_at: str
    rank: float

class KnowledgeSpace(TypedDict):
    id: "UUID"
    name: str
    slug: str
    description: str
    icon: str
    sort_order: int
    is_archived: bool
    #: Закрытое пространство видно только участникам его списка
    is_restricted: bool
    #: Смотрящий вправе вести пространство; считается сервером по владельцу
    can_manage: bool
    has_cover: bool
    page_count: int
    created_by: int
    created_at: str
    updated_at: str
    is_pinned: bool

class KnowledgeSpaceAccessInput(TypedDict):
    restricted: bool
    #: Полный список; сохранённый состав заменяется им целиком
    grants: List["KnowledgeACLGrant"]

class KnowledgeSpaceAccessPolicy(TypedDict):
    space_id: "UUID"
    restricted: bool
    grants: List["KnowledgeACLGrant"]

class _KnowledgeSpaceInputRequired(TypedDict):
    name: str

class KnowledgeSpaceInput(_KnowledgeSpaceInputRequired, total=False):
    #: Адрес; выводится из названия, когда не задан
    slug: str
    description: str
    #: Имя иконки Lucide; по умолчанию book-open
    icon: str

class KnowledgeTag(TypedDict):
    id: "UUID"
    name: str
    color: str
    created_by: int
    created_at: str

class _KnowledgeTagInputRequired(TypedDict):
    #: Имя метки уникально в кабинете без учёта регистра
    name: str

class KnowledgeTagInput(_KnowledgeTagInputRequired, total=False):
    #: Ключ цвета метки; по умолчанию neutral
    color: str

class KnowledgeTagSetInput(TypedDict):
    #: Полный набор меток страницы; пустой массив снимает все метки
    tag_ids: List["UUID"]

class KnowledgeVersionInput(TypedDict):
    expected_version: int

class Link(TypedDict):
    id: "UUID"
    task: "UUID"
    entity_type: str
    entity_id: str
    label: str

class _LinkCreateRequired(TypedDict):
    entity_type: str
    entity_id: str

class LinkCreate(_LinkCreateRequired, total=False):
    label: str

LinkList = List["Link"]

class ManagedChecklistItem(TypedDict):
    text: str
    done: bool

class ManagedChecklistPatch(TypedDict):
    #: Стабильный UUID группы, которой владеет интеграция.
    id: "UUID"
    title: str
    #: Пустой массив удаляет только группу с переданным id.
    items: List["ManagedChecklistItem"]

class MarketplaceEconBaseRow(TypedDict, total=False):
    """Сырьё строки прайса в том виде в каком его отдаёт витрина ценообразования"""

    #: Установочная цена, до скидки площадки
    price: float
    #: Доля скидки площадки, 0..1
    spp: float
    cost: float
    #: Комиссия в процентах
    comm: float
    #: Налог в процентах
    tax: float
    #: Эквайринг в процентах
    acquiring: Optional[float]
    #: Логистика итого; запасное значение для доставки
    log: Optional[float]
    logDirect: Optional[float]
    logReturn: Optional[float]
    #: Хранение на единицу
    storageUnit: Optional[float]
    #: Приёмка на единицу
    acceptUnit: Optional[float]
    #: Штрафы на единицу
    penaltyUnit: Optional[float]

class MarketplaceEconOverrides(TypedDict, total=False):
    """Ручные правки; отсутствие поля означает значение площадки"""

    price: Optional[float]
    #: Репрайсер держит эту цену клиента
    hold: Optional[float]
    #: Скидка площадки в процентах, а не долей
    spp: Optional[float]
    costBuy: Optional[float]
    cost: Optional[float]
    pack: Optional[float]
    logToWh: Optional[float]
    comm: Optional[float]
    handling: Optional[float]
    storage: Optional[float]
    accept: Optional[float]
    logDir: Optional[float]
    logRet: Optional[float]
    acq: Optional[float]
    adIn: Optional[float]
    adEx: Optional[float]
    tax: Optional[float]

class MarketplaceEconOzonInput(TypedDict):
    """Разрешённый вход расчёта Ozon после правок и сценария акции"""

    price: float
    spp: float
    costBuy: float
    pack: float
    logToWh: float
    comm: float
    handling: float
    storage: float
    logDir: float
    logRet: float
    acq: float
    adIn: float
    adEx: float
    #: Внешняя реклама задана рублями за единицу
    adExR: bool
    tax: float

class MarketplaceEconQuoteItem(TypedDict, total=False):
    base: "MarketplaceEconBaseRow"
    ov: "MarketplaceEconOverrides"
    #: Доля рекламных расходов по умолчанию
    drr: float
    #: Внешняя реклама по умолчанию
    adExAll: float
    #: Значение rub трактует внешнюю рекламу как рубли за единицу
    adExUnit: Literal['pct', 'rub']
    #: Скидка акции в процентах; задана — считается сценарий акции
    promo: Optional[float]

class _MarketplaceEconQuoteRequestRequired(TypedDict):
    #: Иное значение даёт 400 даже при пустом батче
    platform: Literal['ozon', 'wb', 'wildberries']

class MarketplaceEconQuoteRequest(_MarketplaceEconQuoteRequestRequired, total=False):
    items: List["MarketplaceEconQuoteItem"]

class MarketplaceEconQuoteResponse(TypedDict):
    rows: List["MarketplaceEconQuoteRow"]

class _MarketplaceEconQuoteRowRequired(TypedDict):
    out: "MarketplaceEconResult"

class MarketplaceEconQuoteRow(_MarketplaceEconQuoteRowRequired, total=False):
    ozon: "MarketplaceEconOzonInput"
    wb: "MarketplaceEconWbInput"

class MarketplaceEconResult(TypedDict):
    """Неприменимые к площадке поля остаются нулями, а не пропадают"""

    #: Ozon: цена клиента
    buyer: float
    #: Wildberries: цена клиента
    client: float
    #: Ozon: выручка продавца
    rev: float
    #: Wildberries: выплата продавцу
    ppvz: float
    #: Комиссия на единицу
    comm: float
    acq: float
    adIn: float
    adEx: float
    tax: float
    #: Себестоимость до продажи на единицу
    costBefore: float
    #: Сумма затрат во время продажи
    during: float
    #: Маржа на единицу
    margin: float
    #: Маржинальность долей; null при нулевой базе
    mpct: Optional[float]
    roi: Optional[float]

class MarketplaceEconWbInput(TypedDict):
    """Разрешённый вход расчёта Wildberries после правок и сценария акции"""

    price: float
    spp: float
    cost: float
    comm: float
    logDir: float
    storage: float
    accept: float
    penalty: float
    acq: float
    adIn: float
    adEx: float
    tax: float

class MarketplaceOzonCost(TypedDict):
    store: "UUID"
    offer_id: str
    #: Decimal string
    cost: str

class _MarketplaceOzonCostRequestRequired(TypedDict):
    store: "UUID"
    offer_id: str

class MarketplaceOzonCostRequest(_MarketplaceOzonCostRequestRequired, total=False):
    #: Decimal string; пусто сохраняется как 0
    cost: str
    #: Комментарий; сохраняется, но в ответ не возвращается
    note: str

class MarketplaceOzonDecomposition(TypedDict):
    #: Момент последней синхронизации аналитики
    updated: Optional[str]
    #: Последняя дата с данными
    anchor: str
    months: List["MarketplaceOzonDecompositionMonth"]
    month: Optional["MarketplaceOzonDecompositionMonth"]
    periods: List["MarketplaceOzonDecompositionPeriod"]
    articles: List["MarketplaceOzonDecompositionArticle"]
    other: Optional["MarketplaceOzonDecompositionOtherBlock"]

class MarketplaceOzonDecompositionArticle(TypedDict):
    #: Внешний числовой идентификатор магазина
    store_id: Optional[int]
    store_name: str
    offer_id: str
    sku: Optional[int]
    #: Всегда null: поле Wildberries сохранено ради общей формы
    nm_id: None
    name: str
    category: str
    image: str
    url: str
    #: Ключ — идентификатор периода
    by_period: Dict[str, "MarketplaceOzonDecompositionCell"]

class _MarketplaceOzonDecompositionCellRequired(TypedDict):
    revenue: int
    units: int
    return_units: int
    returns: int
    returns_pct: Optional[float]
    commission: int
    commission_pct: Optional[float]
    logistics: int
    logistics_per_unit: Optional[float]
    acquiring: int
    internal_ad: int
    external_ad: int
    drr: Optional[float]
    cogs: int
    other_premium: int
    tax: int
    expenses: int
    profit: int
    margin_pct: Optional[float]
    #: Выручка спроецированная на весь период
    rr_revenue: int
    #: Прибыль спроецированная на период; разовое не проецируется
    rr_profit: int

class MarketplaceOzonDecompositionCell(_MarketplaceOzonDecompositionCellRequired, total=False):
    #: Идентификатор периода; появляется только в totals
    id: str

class MarketplaceOzonDecompositionMonth(TypedDict):
    key: str
    #: Название месяца по-русски
    label: str
    #: Год
    sub: str
    start: str
    end: str

class MarketplaceOzonDecompositionOtherBlock(TypedDict):
    by_period: Dict[str, "MarketplaceOzonDecompositionCell"]
    breakdown: Dict[str, List["MarketplaceOzonDecompositionOtherItem"]]

class MarketplaceOzonDecompositionOtherItem(TypedDict):
    #: Наименование операции площадки
    name: str
    #: Сумма в рублях; расход отрицателен
    amount: int

class MarketplaceOzonDecompositionOtherPage(TypedDict):
    items: List["MarketplaceOzonDecompositionOtherItem"]
    total: int

class MarketplaceOzonDecompositionPeriod(TypedDict):
    #: month для накопительной колонки, иначе s и номер спринта
    id: str
    kind: Literal['month', 'sprint']
    #: Номер спринта; null у накопительной колонки
    n: Optional[int]
    label: str
    #: Границы периода в виде дня и месяца
    sub: str
    start: str
    end: str
    #: Коэффициент проекции незакрытого периода
    run_rate_factor: float
    totals: "MarketplaceOzonDecompositionCell"

MarketplaceOzonFbs = TypedDict("MarketplaceOzonFbs", {"platform": Literal['ozon'], "source": Literal['ozon_fbs_live'], "from": str, "to": str, "totals": "MarketplaceOzonFbsTotals", "funnel": List["MarketplaceOzonFbsFunnelStage"], "tiles": "MarketplaceOzonFbsTiles", "histogram": List["MarketplaceOzonFbsSpeedBucket"], "warehouses": List["MarketplaceOzonFbsWarehouse"], "rows": List["MarketplaceOzonFbsPosting"], "note": str, "analytics": bool}, total=False)

class MarketplaceOzonFbsFunnelStage(TypedDict):
    key: Literal['new', 'work', 'way', 'pvz', 'delivered', 'cancelled', 'problem']
    label: str
    count: int
    sum: int

class MarketplaceOzonFbsPosting(TypedDict):
    #: Номер отправления
    posting: str
    order_no: str
    #: Название первой позиции отправления
    name: str
    #: Артикул первой позиции
    offer: str
    sku: int
    warehouse: str
    #: Этап воронки
    status: str
    #: Исходный статус площадки
    status_raw: str
    qty: int
    amount: int
    created_at: Optional[str]
    #: Часы в обработке; null пока не отгружено
    process_hrs: Optional[float]
    deadline_at: Optional[str]
    #: Надбавка положительна, льгота отрицательна
    tariff: int

class MarketplaceOzonFbsSpeedBucket(TypedDict):
    index: int
    label: str
    count: int
    pct: Optional[float]
    #: Сетка Wildberries переиспользована как единая шкала скорости; к комиссии Ozon не применяется
    wb_comm_delta_pp: float
    per_hour: bool

class MarketplaceOzonFbsTiles(TypedDict):
    on_time_pct: Optional[float]
    #: Штрафы минус льготы в рублях; льгота отрицательна
    tariff_net: int
    avg_price: Optional[int]
    buyout_pct: Optional[float]
    #: Часы от заказа до передачи в доставку
    avg_process_hrs: Optional[float]

class MarketplaceOzonFbsTotals(TypedDict):
    count: int
    sum: int

class MarketplaceOzonFbsWarehouse(TypedDict):
    warehouse: str
    count: int
    process_hrs: Optional[float]
    on_time_pct: Optional[float]
    tariff: int

MarketplaceOzonFunnel = TypedDict("MarketplaceOzonFunnel", {"platform": Literal['ozon'], "source": Literal['ozon_analytics'], "from": str, "to": str, "totals": "MarketplaceOzonFunnelTotals", "rows": List["MarketplaceOzonFunnelRow"], "note": str, "analytics": bool}, total=False)

MarketplaceOzonFunnelDaily = TypedDict("MarketplaceOzonFunnelDaily", {"platform": Literal['ozon'], "source": Literal['ozon_analytics'], "sku": str, "from": str, "to": str, "days": List[str], "series": "MarketplaceOzonFunnelDailySeries", "totals": "MarketplaceOzonFunnelDailyTotals", "card": "MarketplaceOzonFunnelDailyCard", "articles": List["MarketplaceOzonFunnelDailyArticle"], "note": str, "analytics": bool}, total=False)

class MarketplaceOzonFunnelDailyArticle(TypedDict):
    sku: str
    name: str
    photo: str

class _MarketplaceOzonFunnelDailyCardRequired(TypedDict):
    #: Артикул продавца
    sku: str
    name: str
    photo: str

class MarketplaceOzonFunnelDailyCard(_MarketplaceOzonFunnelDailyCardRequired, total=False):
    #: Доступный остаток
    stock: float
    cost: float
    #: Последняя ставка комиссии в процентах
    commission: float

class MarketplaceOzonFunnelDailySeries(TypedDict):
    """Каждый ряд — значение на каждый день окна в том же порядке что days. Ряды без источника заполнены null целиком."""

    traffic: List[Optional[float]]
    views: List[Optional[float]]
    cv2: List[Optional[float]]
    cart: List[Optional[float]]
    cv3: List[Optional[float]]
    orders: List[Optional[float]]
    #: Источника пока нет
    adShare: List[None]
    ordersSum: List[Optional[float]]
    buyouts: List[Optional[float]]
    buyoutsSum: List[Optional[float]]
    avgBuyer: List[Optional[float]]
    spp: List[Optional[float]]
    #: Источника пока нет
    position: List[None]
    adSpend: List[Optional[float]]
    drrOrders: List[Optional[float]]
    drrSales: List[Optional[float]]
    margin: List[Optional[float]]
    marginSheet: List[Optional[float]]
    #: Источника пока нет
    umd: List[None]
    roi: List[Optional[float]]
    marginTot: List[Optional[float]]
    marginSheetTot: List[Optional[float]]

class _MarketplaceOzonFunnelDailyTotalsRequired(TypedDict):
    traffic: List[Optional[float]]
    views: List[Optional[float]]
    cart: List[Optional[float]]
    orders: List[Optional[float]]
    ordersSum: List[Optional[float]]
    buyouts: List[Optional[float]]
    marginTot: List[Optional[float]]
    marginSheetTot: List[Optional[float]]
    adSpend: List[Optional[float]]
    cv2: List[Optional[float]]
    cv3: List[Optional[float]]

class MarketplaceOzonFunnelDailyTotals(_MarketplaceOzonFunnelDailyTotalsRequired, total=False):
    """Каждый итог — массив из одного значения, чтобы колонка ИТОГО рисовалась тем же кодом что и дни"""

    #: Появляется только когда есть по чему считать
    avgBuyer: List[Optional[float]]

class MarketplaceOzonFunnelRow(TypedDict):
    #: Артикул продавца строкой: имя поля досталось от Wildberries
    nm_id: str
    vendor: str
    name: str
    photo: str
    open: int
    cart: int
    orders: int
    buyouts: None
    orders_sum: int
    buyouts_sum: None
    cv_cart: Optional[float]
    cv_order: Optional[float]
    buyout_pct: None

class MarketplaceOzonFunnelTotals(TypedDict):
    #: Показы; 0 без подписки Premium Plus
    open: int
    cart: int
    orders: int
    #: Всегда null: выкупов у Ozon нет
    buyouts: None
    orders_sum: int
    buyouts_sum: None
    #: Конверсия в корзину в процентах
    cv_cart: Optional[float]
    cv_order: Optional[float]
    buyout_pct: None

class MarketplaceOzonOrdersDailyRow(TypedDict):
    date: str
    #: Decimal string
    orders_sum: str
    orders_qty: int
    #: Decimal string
    sales_sum: str
    sales_qty: int

class MarketplaceOzonOrdersKpi(TypedDict):
    #: Decimal string
    sum: str
    qty: int
    #: Изменение к тому же времени накануне в процентах
    delta_sum: Optional[float]
    delta_qty: Optional[float]

class MarketplaceOzonOrdersOverview(TypedDict):
    #: Самый свежий день в аналитике, а не сегодняшний
    day: str
    updated: Optional[str]
    scheme: Literal['all', 'fbo', 'fbs']
    #: Ключи orders и sales
    kpi: Dict[str, "MarketplaceOzonOrdersKpi"]
    #: Ровно 14 дней подряд
    daily: List["MarketplaceOzonOrdersDailyRow"]
    products: List["MarketplaceOzonOrdersProductRow"]

class MarketplaceOzonOrdersProductRow(TypedDict):
    #: Внешний числовой идентификатор магазина
    store_id: int
    offer_id: str
    sku: Optional[int]
    product_name: str
    units: int
    #: Decimal string
    avg_price: str
    #: Decimal string
    total: str
    primary_image: str
    url: str
    store_name: str
    status_name: str

class _MarketplaceOzonPnlRequired(TypedDict):
    period_kind: Literal['week', 'month']
    scheme: Literal['all', 'fbo', 'fbs']
    updated: Optional[str]
    year: int
    #: Годы доступные в аналитике
    years: List[int]
    range: "MarketplaceOzonPnlRange"
    periods: List["MarketplaceOzonPnlPeriod"]
    rows: List["MarketplaceOzonPnlRow"]

class MarketplaceOzonPnl(_MarketplaceOzonPnlRequired, total=False):
    note: str
    #: Аналитика не подключена — цифры синтетические
    demo: bool
    #: Расшифровка прочего по периодам
    breakdown: Dict[str, List["MarketplaceOzonDecompositionOtherItem"]]

class MarketplaceOzonPnlPeriod(TypedDict):
    key: str
    label: str
    sub: str
    start: str
    end: str

MarketplaceOzonPnlRange = TypedDict("MarketplaceOzonPnlRange", {"from": str, "to": str}, total=False)

class MarketplaceOzonPnlRow(TypedDict):
    key: str
    label: str
    #: Роль строки в отчёте
    kind: str
    #: По одному значению на период в том же порядке
    values: List[Optional[float]]

MarketplaceOzonPricing = TypedDict("MarketplaceOzonPricing", {"platform": Literal['ozon'], "from": str, "to": str, "total": int, "shown": int, "rows": List["MarketplaceOzonPricingRow"], "analytics": bool}, total=False)

class MarketplaceOzonPricingRow(TypedDict):
    #: Артикул продавца, а не числовой SKU площадки
    sku: str
    #: Внешний числовой идентификатор магазина в аналитике
    store_id: int
    name: str
    photo: str
    #: Название магазина
    store: str
    #: Установочная цена карточки, до скидки площадки
    price: float
    #: То же значение что price
    setPrice: float
    #: Фактическая цена покупателя за единицу
    factBuyer: float
    oldPrice: float
    minPrice: float
    #: Себестоимость из базы кабинета; 0 — не заведена
    cost: float
    #: Последняя фактическая ставка комиссии по артикулу, проценты
    comm: float
    #: Логистика доставки и возврата суммарно на единицу
    log: float
    logDirect: float
    logReturn: float
    #: Эквайринг в процентах от выручки
    acquiring: float
    #: Ставка налога магазина в процентах
    tax: float
    #: Доля скидки площадки, 0..1
    spp: float
    #: Доставленных единиц за окно
    units: int

class MarketplaceOzonProduct(TypedDict):
    #: Синтетический ключ магазин и артикул через двоеточие
    id: str
    store: "UUID"
    store_name: str
    offer_id: str
    sku: Optional[int]
    product_name: str
    barcode: str
    #: Decimal string
    price: str
    #: Decimal string
    old_price: str
    #: Decimal string
    min_price: str
    #: Decimal string
    vat: str
    #: Decimal string
    volume_weight: str
    fbo_present: int
    fbs_present: int
    fbo_reserved: int
    fbs_reserved: int
    #: Decimal string
    commission_fbo_percent: str
    #: Decimal string
    commission_fbs_percent: str
    status_name: str
    primary_image: str
    url: str
    category: str
    #: Себестоимость из базы кабинета; null — не заведена
    cost: Optional[str]

class MarketplaceOzonProductFacets(TypedDict):
    #: Категории карточек Ozon
    subjects: List[str]
    #: Всегда пустой: бренда у Ozon в аналитике нет
    brands: List[str]

class _MarketplaceOzonProductPageRequired(TypedDict):
    count: int
    #: Всегда null; постранично ходят page и page_size
    next: None
    #: Всегда null
    previous: None
    results: List["MarketplaceOzonProduct"]

class MarketplaceOzonProductPage(_MarketplaceOzonProductPageRequired, total=False):
    #: Аналитика не подключена — цифры синтетические
    demo: bool

class MarketplaceOzonPromotion(TypedDict):
    id: int
    name: str
    #: Тип акции площадки
    type: str
    start: str
    end: str
    #: Дней до конца; null когда дата не разобралась
    days_left: Optional[int]
    #: Скидка акции в процентах; 0 когда задаётся продавцом
    disc: float
    #: Пояснение по типу акции
    desc: str

class _MarketplaceOzonPromotionsRequired(TypedDict):
    promos: List["MarketplaceOzonPromotion"]

class MarketplaceOzonPromotions(_MarketplaceOzonPromotionsRequired, total=False):
    #: Почему список пуст
    note: str

class MarketplaceOzonStockProduct(TypedDict):
    store: "UUID"
    store_name: str
    offer_id: str
    name: str
    image: str
    total: int
    warehouses: List["MarketplaceOzonStockWarehouse"]

class _MarketplaceOzonStockWarehouseRequired(TypedDict):
    warehouse: str
    qty: int

class MarketplaceOzonStockWarehouse(_MarketplaceOzonStockWarehouseRequired, total=False):
    cluster: str

class MarketplaceOzonStocksPage(TypedDict):
    count: int
    #: Склады встреченные в выборке
    warehouses: List[str]
    results: List["MarketplaceOzonStockProduct"]

class MarketplaceOzonSyncJob(TypedDict):
    id: "UUID"
    platform: Literal['ozon']
    #: Что именно синхронизируется
    kind: str
    status: str
    #: Идентификатор задания в очереди
    river_job_id: Optional[int]
    period: str
    store_ids: List["UUID"]
    message: str
    #: Сырой JSON итогов задания; форма зависит от вида
    stats: Any
    started_at: Optional[str]
    finished_at: Optional[str]
    created_at: str
    updated_at: str

class MarketplaceOzonSyncJobList(TypedDict):
    #: Число строк в ответе, не всего заданий
    count: int
    results: List["MarketplaceOzonSyncJob"]

class MarketplaceProductGroup(TypedDict):
    """Срез (группа) товаров маркетплейса внутри кабинета и одной площадки. Один товар может входить в несколько срезов."""

    id: "UUID"
    platform: "MarketplaceProductGroupPlatform"
    name: str
    #: HEX-цвет метки среза, например #6366f1
    color: str
    #: Число товаров в срезе. При создании среза всегда приходит нулевым
    item_count: int
    created_at: str

class _MarketplaceProductGroupInputRequired(TypedDict):
    #: Обрезается по краям. Пустое название даёт 400
    name: str

class MarketplaceProductGroupInput(_MarketplaceProductGroupInputRequired, total=False):
    #: HEX-цвет метки. Пустое значение даёт цвет по умолчанию #6366f1
    color: str

class MarketplaceProductGroupItem(TypedDict):
    """Товар маркетплейса в составе среза. Пара store_id и offer_id и есть его адрес — собственного идентификатора у строки состава нет."""

    store_id: "UUID"
    #: Артикул продавца на площадке
    offer_id: str

class MarketplaceProductGroupItemPage(TypedDict):
    count: int
    results: List["MarketplaceProductGroupItem"]

class MarketplaceProductGroupItemsAdded(TypedDict):
    #: Сколько строк реально легло в срез. Повторы и товары чужих магазинов сюда не попадают
    added: int

class MarketplaceProductGroupItemsInput(TypedDict):
    #: Строки без store_id или offer_id отбрасываются молча
    items: List["MarketplaceProductGroupItem"]

class MarketplaceProductGroupPage(TypedDict):
    count: int
    results: List["MarketplaceProductGroup"]

class MarketplaceProductGroupPatch(TypedDict, total=False):
    """Отсутствующее или пустое поле сохраняет текущее значение."""

    name: str
    color: str

MarketplaceProductGroupPlatform = Literal['ozon', 'wildberries']

class MarketplaceStore(TypedDict):
    """Магазин маркетплейса в кабинете. Форма одна для Ozon, Wildberries и Яндекс Маркета — их различает только поле platform. Ключи и токены доступа к площадке в ответ не попадают."""

    id: "UUID"
    #: Платформа задаётся маршрутом, а не телом запроса
    platform: Literal['ozon', 'wildberries', 'yandex']
    name: str
    #: Идентификатор магазина на стороне площадки
    external_id: int
    #: Ставка налога в процентах; decimal строкой
    tax_percent: str
    is_active: bool

class _MarketplaceStoreInputRequired(TypedDict):
    name: str
    #: Должен помещаться в int32 — по нему магазин сопоставляется с аналитической базой
    external_id: int

class MarketplaceStoreInput(_MarketplaceStoreInputRequired, total=False):
    """Тело заведения магазина. Одинаково для трёх площадок — платформу задаёт маршрут."""

    #: Ставка налога в процентах; пустая строка сохраняется как ноль
    tax_percent: str
    is_active: bool

class MarketplaceStorePage(TypedDict):
    count: int
    results: List["MarketplaceStore"]

class MarketplaceStorePatch(TypedDict, total=False):
    """Отсутствующее или пустое поле сохраняет текущее значение. Название и external_id этим маршрутом не меняются."""

    #: Пустая строка оставляет сохранённую ставку
    tax_percent: str
    is_active: bool

class MarketplaceWbCardAdDay(TypedDict):
    date: str
    spend: int
    views: int
    clicks: int
    ctr: Optional[float]
    cpc: Optional[float]
    #: Добавления в корзину из рекламы
    atbs: int
    orders: int
    cr: Optional[float]

class _MarketplaceWbCardBoardRequired(TypedDict):
    #: Последний день данных «Джема»
    anchor: str
    #: Ровно 14 дней по опорный включительно
    days: List[str]
    meta: "MarketplaceWbCardMeta"
    #: Ряд той же длины, что days
    funnel: List["MarketplaceWbCardFunnelDay"]
    #: Ряд той же длины, что days
    ads: List["MarketplaceWbCardAdDay"]

class MarketplaceWbCardBoard(_MarketplaceWbCardBoardRequired, total=False):
    #: Аналитическая база не подключена и цифры синтетические
    demo: bool

class MarketplaceWbCardFunnelDay(TypedDict):
    date: str
    #: Пусто, когда данных «Джема» за окно нет
    open_card: Optional[int]
    to_cart: Optional[int]
    cv_cart: Optional[float]
    cv_order: Optional[float]
    #: Из «Джема», а без него из заказов
    orders_qty: int
    orders_sum: int
    avg_check: Optional[int]
    #: Средняя цена покупателя за день
    client_price: Optional[float]
    spp: Optional[float]
    #: Из «Джема», а без него из продаж
    buyout_qty: int
    buyout_sum: int
    buyout_pct: Optional[float]

class _MarketplaceWbCardMetaRequired(TypedDict):
    #: Идентификатор карточки WB; в демо-ответе приходит строкой из параметра nm
    nm_id: int
    name: str
    store_name: str

class MarketplaceWbCardMeta(_MarketplaceWbCardMetaRequired, total=False):
    """Паспорт карточки. В демо-ответе заполнены только nm_id, name и store_name."""

    #: Артикул поставщика
    vendor_code: str
    #: Предмет WB
    subject: str
    brand: str
    photo: str
    #: Цена со скидкой продавца
    price: Optional[str]
    #: Цена до скидки продавца
    old_price: Optional[str]
    #: Последняя цена покупателя
    buyer_price: Optional[str]
    discount_percent: Optional[float]
    stock: Optional[int]
    in_way_to_client: Optional[int]
    in_way_from_client: Optional[int]
    volume_l: Optional[str]
    #: Себестоимость из кабинета
    cost: Optional[str]
    #: Средняя логистика за две недели
    logistics: Optional[float]
    #: Средний процент комиссии за две недели
    commission: Optional[float]
    #: Среднее хранение за две недели
    storage: Optional[float]
    #: Ставка налога магазина
    tax_percent: float
    #: Процент выкупа за окно buyout_window
    buyout_rate: Optional[float]
    #: Границы окна выкупа через многоточие
    buyout_window: str

class MarketplaceWbCardOption(TypedDict):
    nm_id: int
    #: Артикул поставщика
    vendor_code: str
    #: Предмет WB
    subject: str
    name: str
    photo: str
    orders: int

class _MarketplaceWbCardOptionsRequired(TypedDict):
    #: Последний день данных «Джема»; пусто, когда данных нет
    anchor: Optional[str]
    results: List["MarketplaceWbCardOption"]

class MarketplaceWbCardOptions(_MarketplaceWbCardOptionsRequired, total=False):
    #: Аналитическая база не подключена и цифры синтетические
    demo: bool

class MarketplaceWbCost(TypedDict):
    store: str
    offer_id: str
    cost: str

class _MarketplaceWbCostRequestRequired(TypedDict):
    store: "UUID"
    #: Артикул поставщика
    offer_id: str

class MarketplaceWbCostRequest(_MarketplaceWbCostRequestRequired, total=False):
    #: Себестоимость строкой; пустое значение сохраняется как ноль
    cost: str
    note: str

class MarketplaceWbDecompOther(TypedDict):
    #: Отсортированы по сумме по возрастанию
    items: List["MarketplaceWbDecompOtherItem"]
    total: int

class MarketplaceWbDecompOtherItem(TypedDict):
    #: Наименование операции финансового отчёта
    name: str
    amount: int

class _MarketplaceWbDecompositionRequired(TypedDict):
    #: Время последней синхронизации финансового отчёта
    updated: Optional[str]
    #: Последний день данных
    anchor: str
    months: List["MarketplaceWbDecompositionMonth"]
    month: Optional["MarketplaceWbDecompositionMonth"]
    #: Первый блок — накопительно за месяц, далее спринты
    periods: List["MarketplaceWbDecompositionPeriod"]
    articles: List["MarketplaceWbDecompositionArticle"]
    other: Optional["MarketplaceWbDecompositionOther"]

class MarketplaceWbDecomposition(_MarketplaceWbDecompositionRequired, total=False):
    #: Аналитическая база не подключена и цифры синтетические
    demo: bool

class MarketplaceWbDecompositionArticle(TypedDict):
    #: Внешний идентификатор магазина в аналитике
    store_id: int
    store_name: str
    #: Артикул поставщика
    offer_id: str
    #: У Wildberries не заполняется — идентификатор карточки лежит в nm_id
    sku: None
    nm_id: Optional[int]
    name: str
    #: Предмет WB
    category: str
    image: str
    #: У Wildberries не заполняется и приходит пустой строкой
    url: str
    #: Ключ — идентификатор блока периода
    by_period: Dict[str, "MarketplaceWbMetricCell"]

class MarketplaceWbDecompositionMonth(TypedDict):
    key: str
    #: Название месяца по-русски
    label: str
    #: Год
    sub: str
    start: str
    end: str

class MarketplaceWbDecompositionOther(TypedDict):
    #: Суммы без привязки к артикулу по блокам периодов
    by_period: Dict[str, "MarketplaceWbMetricCell"]
    #: Разбор строки «Прочее» по наименованиям операций
    breakdown: Dict[str, List["MarketplaceWbDecompOtherItem"]]

class MarketplaceWbDecompositionPeriod(TypedDict):
    #: Идентификатор блока: month либо s с номером спринта
    id: str
    kind: Literal['month', 'sprint']
    #: Номер спринта внутри месяца
    n: Optional[int]
    label: str
    #: Границы блока в формате дня и месяца
    sub: str
    start: str
    end: str
    #: Множитель прогноза на полный период
    run_rate_factor: float
    totals: "MarketplaceWbMetricCell"

class MarketplaceWbFacets(TypedDict):
    subjects: List[str]
    brands: List[str]

MarketplaceWbFunnel = TypedDict("MarketplaceWbFunnel", {"platform": Literal['wildberries'], "store": str, "source": Literal['jam', 'v3', 'v3_pending'], "from": str, "to": str, "totals": "MarketplaceWbFunnelTotals", "rows": List["MarketplaceWbFunnelRow"], "note": str, "analytics": bool}, total=False)

MarketplaceWbFunnelDaily = TypedDict("MarketplaceWbFunnelDaily", {"platform": Literal['wb'], "source": Literal['wb_finance'], "sku": str, "from": str, "to": str, "days": List[str], "series": Dict[str, List[Optional[float]]], "totals": Dict[str, List[Optional[float]]], "card": "MarketplaceWbFunnelDailyCard", "articles": List["MarketplaceWbFunnelDailyArticle"], "note": str, "analytics": bool}, total=False)

class MarketplaceWbFunnelDailyArticle(TypedDict):
    #: Артикул поставщика
    sku: str
    name: str
    #: В этом списке не заполняется и приходит пустой строкой
    photo: str

class _MarketplaceWbFunnelDailyCardRequired(TypedDict):
    #: Артикул поставщика
    sku: str
    name: str
    photo: str

class MarketplaceWbFunnelDailyCard(_MarketplaceWbFunnelDailyCardRequired, total=False):
    #: Себестоимость из кабинета
    cost: int

class MarketplaceWbFunnelRow(TypedDict):
    nm_id: int
    #: Артикул поставщика
    vendor: str
    name: str
    photo: str
    #: Открытия карточки
    open: int
    cart: int
    orders: int
    buyouts: int
    orders_sum: int
    buyouts_sum: int
    #: Конверсия из открытия в корзину в процентах
    cv_cart: Optional[float]
    #: Конверсия из корзины в заказ в процентах
    cv_order: Optional[float]
    buyout_pct: Optional[float]

class MarketplaceWbFunnelTotals(TypedDict):
    open: int
    cart: int
    orders: int
    buyouts: int
    orders_sum: int
    buyouts_sum: int
    cv_cart: Optional[float]
    cv_order: Optional[float]
    buyout_pct: Optional[float]

class _MarketplaceWbMetricCellRequired(TypedDict):
    revenue: int
    units: int
    return_units: int
    returns: int
    returns_pct: Optional[float]
    #: Вознаграждение WB как разница выплаты и дохода
    commission: int
    commission_pct: Optional[float]
    logistics: int
    logistics_per_unit: Optional[int]
    storage: int
    acceptance: int
    penalty: int
    deduction: int
    acquiring: int
    #: Компенсации и прочие операции
    other: int
    #: Внутренняя реклама WB
    internal_ad: int
    #: Доля рекламных расходов в выручке
    drr: Optional[float]
    cogs: int
    tax: int
    expenses: int
    profit: int
    margin_pct: Optional[float]
    #: Выручка в прогнозе run-rate
    rr_revenue: int
    #: Прибыль в прогнозе run-rate; штрафы, удержания и прочее не проецируются
    rr_profit: int

class MarketplaceWbMetricCell(_MarketplaceWbMetricCellRequired, total=False):
    """Ячейка декомпозиции. Расходы приходят отрицательными числами."""

    #: Идентификатор блока; присутствует только в итогах периода
    id: str

class MarketplaceWbOrdersDay(TypedDict):
    date: str
    orders_sum: str
    orders_qty: int
    sales_sum: str
    sales_qty: int

class MarketplaceWbOrdersKpi(TypedDict):
    sum: str
    qty: int
    #: Изменение к предыдущему дню в процентах
    delta_sum: Optional[float]
    #: Изменение к предыдущему дню в процентах
    delta_qty: Optional[float]

class _MarketplaceWbOrdersOverviewRequired(TypedDict):
    #: Опорный день выборки
    day: str
    updated: Optional[str]
    kpi: "MarketplaceWbOrdersOverviewKpi"
    #: Ровно 14 дней по опорный включительно
    daily: List["MarketplaceWbOrdersDay"]
    #: Не более 200 товаров опорного дня
    products: List["MarketplaceWbOrdersProduct"]

class MarketplaceWbOrdersOverview(_MarketplaceWbOrdersOverviewRequired, total=False):
    #: Аналитическая база не подключена и цифры синтетические
    demo: bool

class MarketplaceWbOrdersOverviewKpi(TypedDict):
    orders: "MarketplaceWbOrdersKpi"
    sales: "MarketplaceWbOrdersKpi"

class MarketplaceWbOrdersProduct(TypedDict):
    #: Внешний идентификатор магазина в аналитике
    store_id: int
    #: Артикул поставщика
    offer_id: str
    nm_id: Optional[int]
    #: Наименование карточки; при его отсутствии подставляется предмет
    product_name: str
    units: int
    avg_price: str
    total: str
    primary_image: str
    store_name: str
    brand: str

class _MarketplaceWbPnlRequired(TypedDict):
    period_kind: Literal['week', 'month']
    #: У Wildberries не заполняется и приходит пустой строкой
    scheme: str
    updated: Optional[str]
    year: int
    years: List[int]
    #: Границы года ключами from и to
    range: Dict[str, str]
    periods: List["MarketplaceWbPnlPeriod"]
    rows: List["MarketplaceWbPnlRow"]

class MarketplaceWbPnl(_MarketplaceWbPnlRequired, total=False):
    note: str
    #: Аналитическая база не подключена и цифры синтетические
    demo: bool
    #: Разбор строки «Прочее» по периодам
    breakdown: Dict[str, List["MarketplaceWbDecompOtherItem"]]

class MarketplaceWbPnlPeriod(TypedDict):
    key: str
    label: str
    sub: str
    start: str
    end: str

class MarketplaceWbPnlRow(TypedDict):
    key: str
    label: str
    kind: Literal['total', 'subtotal', 'normal', 'percent']
    #: Значения по периодам в порядке periods
    values: List[Optional[float]]

MarketplaceWbPricing = TypedDict("MarketplaceWbPricing", {"platform": Literal['wb'], "from": str, "to": str, "total": int, "shown": int, "rows": List["MarketplaceWbPricingRow"], "analytics": bool}, total=False)

class MarketplaceWbPricingRow(TypedDict):
    #: Артикул поставщика
    sku: str
    #: Внешний идентификатор магазина в аналитике
    store_id: int
    nm_id: int
    name: str
    photo: str
    #: Название магазина
    store: str
    #: Установочная цена до СПП
    price: int
    #: Установочная цена до СПП
    setPrice: int
    #: Фактическая цена клиента
    factClient: int
    cost: int
    #: Комиссия в процентах от установочной цены
    comm: float
    #: Выплата продавцу на единицу
    forPay: int
    #: Логистика на единицу
    logDirect: int
    #: Хранение на единицу
    storageUnit: int
    #: Платная приёмка на единицу
    acceptUnit: int
    #: Штрафы на единицу
    penaltyUnit: int
    #: Эквайринг в процентах от установочной цены
    acquiring: float
    #: Ставка налога магазина в процентах
    tax: float
    #: Скидка постоянного покупателя долей единицы
    spp: float
    #: Продано единиц за окно
    units: int

class MarketplaceWbProduct(TypedDict):
    #: Составной ключ строки: идентификатор магазина и артикул поставщика через двоеточие
    id: str
    store: "UUID"
    store_name: str
    #: Идентификатор карточки WB
    nm_id: Optional[int]
    #: Артикул поставщика
    vendor_code: str
    #: Баркод карточки
    sku: str
    product_name: str
    brand: str
    #: Предмет WB
    subject_name: str
    photo_url: str
    vat: str
    volume_l: str
    #: Цена со скидкой продавца
    price: str
    #: Цена до скидки продавца
    old_price: str
    discount_percent: int
    #: Последняя цена покупателя из заказов или продаж
    buyer_price: str
    stock: int
    in_way_to_client: int
    in_way_from_client: int
    #: Себестоимость из кабинета
    cost: Optional[str]

class _MarketplaceWbProductPageRequired(TypedDict):
    count: int
    #: Задел под курсорную страницу; сейчас всегда пусто
    next: None
    #: Задел под курсорную страницу; сейчас всегда пусто
    previous: None
    results: List["MarketplaceWbProduct"]

class MarketplaceWbProductPage(_MarketplaceWbProductPageRequired, total=False):
    #: Аналитическая база не подключена и цифры синтетические
    demo: bool

class MarketplaceWbPromotion(TypedDict):
    id: int
    name: str
    #: Тип акции WB, например auto или regular
    type: str
    #: Начало акции по стандарту RFC 3339
    start: str
    #: Конец акции по стандарту RFC 3339
    end: str
    days_left: Optional[int]
    #: Всегда ноль: скидку по товару задаёт оператор
    disc: float
    #: Пояснение к типу акции
    desc: str

class _MarketplaceWbPromotionsRequired(TypedDict):
    #: Отсортированы по дате окончания по возрастанию
    promos: List["MarketplaceWbPromotion"]

class MarketplaceWbPromotions(_MarketplaceWbPromotionsRequired, total=False):
    #: Причина пустого списка: нет токена WB либо площадка недоступна
    note: str

class MarketplaceWbStockPage(TypedDict):
    #: Число товаров, а не строк «товар × склад»
    count: int
    #: Склады в порядке первого появления
    warehouses: List[str]
    results: List["MarketplaceWbStockProduct"]

class MarketplaceWbStockProduct(TypedDict):
    store: "UUID"
    store_name: str
    #: Артикул поставщика
    offer_id: str
    name: str
    image: str
    total: int
    warehouses: List["MarketplaceWbStockWarehouse"]

class _MarketplaceWbStockWarehouseRequired(TypedDict):
    warehouse: str
    qty: int

class MarketplaceWbStockWarehouse(_MarketplaceWbStockWarehouseRequired, total=False):
    #: Кластер склада; у Wildberries не заполняется и в ответ не попадает
    cluster: str

class MarketplaceYandexCost(TypedDict):
    store: "UUID"
    offer_id: str
    #: Себестоимость decimal строкой
    cost: str

class _MarketplaceYandexCostInputRequired(TypedDict):
    store: "UUID"
    #: Артикул продавца
    offer_id: str

class MarketplaceYandexCostInput(_MarketplaceYandexCostInputRequired, total=False):
    #: Себестоимость decimal строкой; пустая строка сохраняется как ноль
    cost: str
    #: Комментарий; сохраняется, но в ответ не возвращается
    note: str

class MarketplaceYandexOrdersDay(TypedDict):
    date: str
    #: Сумма заказов кроме отменённых; decimal строкой
    orders_sum: str
    orders_qty: int
    #: Сумма доставленных заказов; decimal строкой
    sales_sum: str
    sales_qty: int

class MarketplaceYandexOrdersKpi(TypedDict):
    #: Сумма decimal строкой
    sum: str
    qty: int
    #: Изменение суммы ко вчерашнему дню в процентах; null когда вчера было пусто
    delta_sum: Optional[float]
    #: Изменение количества ко вчерашнему дню в процентах; null когда вчера было пусто
    delta_qty: Optional[float]

class _MarketplaceYandexOrdersOverviewRequired(TypedDict):
    #: Последний день с заказами; к нему привязаны показатели и товары
    day: str
    #: Момент последней синхронизации источника
    updated: Optional[str]
    kpi: "MarketplaceYandexOrdersOverviewKpi"
    #: Четырнадцать дней подряд по возрастанию даты; дни без заказов заполнены нулями
    daily: List["MarketplaceYandexOrdersDay"]
    #: Товары дня по убыванию суммы
    products: List["MarketplaceYandexOrdersProduct"]

class MarketplaceYandexOrdersOverview(_MarketplaceYandexOrdersOverviewRequired, total=False):
    #: Присутствует и равно true только в офлайн-ответе без аналитической базы; цифры синтетические
    demo: bool

class MarketplaceYandexOrdersOverviewKpi(TypedDict):
    orders: "MarketplaceYandexOrdersKpi"
    sales: "MarketplaceYandexOrdersKpi"

class _MarketplaceYandexOrdersProductRequired(TypedDict):
    #: external_id магазина, а не его UUID
    store_id: int
    store_name: str
    #: Артикул продавца
    offer_id: str
    product_name: str
    units: int
    #: Средняя цена decimal строкой
    avg_price: str
    #: Сумма decimal строкой
    total: str
    primary_image: str
    url: str

class MarketplaceYandexOrdersProduct(_MarketplaceYandexOrdersProductRequired, total=False):
    """Строка товара за день. Поле market_sku приходит из аналитической базы, поле sku — из офлайн-ответа без неё."""

    #: Строкой, в отличие от целого market_sku витрины товаров; отсутствует в офлайн-ответе
    market_sku: Optional[str]
    #: Только в офлайн-ответе без аналитической базы
    sku: int

class _MarketplaceYandexPnlRequired(TypedDict):
    period_kind: Literal['week', 'month']
    #: В боевом ответе пустая строка; заполняется только в демо-ответе
    scheme: str
    #: Момент последней синхронизации источника
    updated: Optional[str]
    year: int
    #: Годы, за которые есть данные
    years: List[int]
    range: "MarketplaceYandexPnlRange"
    periods: List["MarketplaceYandexPnlPeriod"]
    rows: List["MarketplaceYandexPnlRow"]

class MarketplaceYandexPnl(_MarketplaceYandexPnlRequired, total=False):
    #: Пояснение к неполноте источника
    note: str
    #: Присутствует и равно true только в офлайн-ответе без аналитической базы; цифры синтетические
    demo: bool

MarketplaceYandexPnlRange = TypedDict("MarketplaceYandexPnlRange", {"from": str, "to": str}, total=False)

class MarketplaceYandexPnlPeriod(TypedDict):
    #: Первый день периода
    key: str
    #: Номер недели ISO или название месяца
    label: str
    #: Диапазон дат недели или год месяца
    sub: str
    start: str
    end: str

class MarketplaceYandexPnlRow(TypedDict):
    key: Literal['revenue', 'cancelled', 'income', 'payout', 'commission', 'logistics', 'cogs', 'taxes', 'variable', 'margin', 'pct_commission', 'pct_logistics', 'pct_cogs', 'margin_pct']
    label: str
    kind: Literal['total', 'subtotal', 'normal', 'percent']
    #: По одному значению на период в том же порядке; null означает, что показатель не считается
    values: List[Optional[float]]

class MarketplaceYandexProduct(TypedDict):
    #: Составной ключ вида «UUID магазина двоеточие артикул»
    id: str
    store: "UUID"
    store_name: str
    #: Артикул продавца
    offer_id: str
    market_sku: Optional[int]
    product_name: str
    category: str
    vendor: str
    barcode: str
    #: Базовая цена decimal строкой; пустая строка когда цены нет
    price: str
    #: Цена до скидки decimal строкой; пустая строка когда её нет
    old_price: str
    stock: int
    status_name: str
    primary_image: str
    #: Первая ссылка витрины; пустая строка когда её нет
    url: str
    #: Себестоимость decimal строкой; null когда она не заведена
    cost: Optional[str]

class _MarketplaceYandexProductPageRequired(TypedDict):
    count: int
    #: Всегда null — страницы листаются параметрами page и page_size
    next: None
    #: Всегда null — страницы листаются параметрами page и page_size
    previous: None
    results: List["MarketplaceYandexProduct"]

class MarketplaceYandexProductPage(_MarketplaceYandexProductPageRequired, total=False):
    #: Присутствует и равно true только в офлайн-ответе без аналитической базы; цифры синтетические
    demo: bool

class Meeting(TypedDict):
    id: "UUID"
    project_id: "UUID"
    project_key: str
    project_name: str
    title: str
    kind: "MeetingKind"
    status: "MeetingStatus"
    starts_at: str
    duration_minutes: int
    location: str
    meeting_url: str
    recording_url: str
    summary: str
    transcript: str
    has_transcript: bool
    calendar_event_id: Optional["UUID"]
    visibility: "HubVisibility"
    created_by: Optional[int]
    created_at: str
    updated_at: str
    participants: List["MeetingParticipant"]
    items: List["MeetingItem"]

class _MeetingCreateRequired(TypedDict):
    project: str
    title: str
    starts_at: str

class MeetingCreate(_MeetingCreateRequired, total=False):
    id: str
    kind: "MeetingKind"
    status: "MeetingStatus"
    duration_minutes: int
    location: str
    meeting_url: str
    recording_url: str
    summary: str
    transcript: str
    calendar_event: str
    visibility: "HubVisibility"
    created_by: int
    participants: List["MeetingParticipantInput"]
    items: List["MeetingItemInput"]
    replace_content: bool

class MeetingItem(TypedDict):
    id: "UUID"
    kind: "MeetingItemKind"
    title: str
    body: str
    task_id: Optional["UUID"]
    task_key: str
    task_title: str
    owner_user_id: Optional[int]
    owner_name: str
    due_date: str
    sort_order: int

class _MeetingItemInputRequired(TypedDict):
    kind: "MeetingItemKind"
    title: str

class MeetingItemInput(_MeetingItemInputRequired, total=False):
    body: str
    task: str
    owner_user: int
    owner_name: str
    due_date: str

MeetingItemKind = Literal['agenda', 'decision', 'action', 'question', 'note']

MeetingKind = Literal['client', 'internal', 'demo', 'planning', 'retro', 'other']

class MeetingPage(TypedDict):
    count: int
    results: List["Meeting"]

class MeetingParticipant(TypedDict):
    id: "UUID"
    user_id: Optional[int]
    user_name: str
    external_name: str
    external_email: str
    role: str
    attended: bool

class MeetingParticipantInput(TypedDict, total=False):
    user: int
    external_name: str
    external_email: str
    role: str
    attended: bool

MeetingStatus = Literal['planned', 'held', 'cancelled']

class MeetingUpdate(TypedDict, total=False):
    """URL-путь задаёт `id`; переданные непустые поля обновляются частично."""

    project: str
    title: str
    kind: "MeetingKind"
    status: "MeetingStatus"
    starts_at: str
    duration_minutes: int
    location: str
    meeting_url: str
    recording_url: str
    summary: str
    transcript: str
    calendar_event: str
    visibility: "HubVisibility"
    created_by: int
    participants: List["MeetingParticipantInput"]
    items: List["MeetingItemInput"]
    replace_content: bool

class Member(TypedDict):
    id: int
    username: str
    name: str

class MemberAssignment(TypedDict, total=False):
    """Требуется `user_id`; `user` поддерживается только для совместимости старых клиентов."""

    user_id: int
    user: int
    role: "SectionRole"

class Milestone(TypedDict):
    id: "UUID"
    section: "UUID"
    section_key: str
    section_name: str
    name: str
    description: str
    target_date: Optional[str]
    order: int
    is_archived: bool
    created_at: str
    updated_at: str

class _MilestoneCreateRequired(TypedDict):
    #: UUID, ключ или имя проекта задач
    section: str
    name: str

class MilestoneCreate(_MilestoneCreateRequired, total=False):
    description: str
    target_date: str
    order: int

class MilestonePage(TypedDict):
    count: int
    results: List["Milestone"]

class MilestoneUpdate(TypedDict, total=False):
    section: str
    name: str
    description: str
    target_date: str
    order: int
    is_archived: bool

class OK(TypedDict):
    ok: Literal[True]

class _PlatformAppRequired(TypedDict):
    id: "UUID"
    #: Издатель: строчные латинские буквы, цифры и дефисы
    publisher: str
    #: Ключ приложения; вместе с издателем образует пространство имён app.<издатель>.<ключ>
    key: str
    title: str
    status: "PlatformAppStatus"
    created_at: str
    updated_at: str

class PlatformApp(_PlatformAppRequired, total=False):
    #: Сотрудник платформы, заведший приложение
    created_by: int

class PlatformAppBlockList(TypedDict):
    blocks: List["PlatformAppManifestBlock"]

class PlatformAppConsentDiff(TypedDict):
    #: Что просит целевая версия
    requested: List[str]
    #: Что кабинет одобрил сейчас
    granted: List[str]
    #: Чего не просила установленная версия; это разница манифеста, а не разница доступа
    new: List[str]
    #: Просит, но кабинет не одобрял
    missing: List[str]
    #: Обязательная часть missing — только она останавливает обновление
    missing_required: List[str]
    missing_optional: List[str]
    #: Одобрено, но целевая версия не просит
    dropped: List[str]
    #: Набор установки, если нового согласия не дают
    kept: List[str]

class _PlatformAppConsentRequiredRequired(TypedDict):
    detail: str

class PlatformAppConsentRequired(_PlatformAppConsentRequiredRequired, total=False):
    #: platform.app_consent_required, когда обновление остановлено новым обязательным правом
    code: str
    #: Версия, которая просит
    version: str
    #: Права, которых кабинет не одобрял; только они, чтобы решающее не утонуло в списке
    scopes: List[str]

class _PlatformAppDataPolicyRequired(TypedDict):
    #: false означает, что версия ничего не обещала о данных при удалении
    declared: bool
    retention_days: int

class PlatformAppDataPolicy(_PlatformAppDataPolicyRequired, total=False):
    categories: List[str]
    regions: List[str]
    uninstall: Literal['purge', 'export_then_purge', 'archive']

class _PlatformAppDeliveryHealthRequired(TypedDict):
    installation_id: "UUID"
    #: Мёртвые письма подряд. Любая удачная доставка обнуляет счётчик; по нему принимается решение о парковке
    consecutive_dead: int
    #: Сколько мёртвых писем накопилось всего. Ровно столько фактов не доехало и ждёт повтора; число монотонно — повтор заводит новый наряд, а не оживляет мёртвый
    dead_letters: int
    #: Начало окна доли отказов. Окно фиксированное; отдаётся вместе со счётчиками, чтобы «0 из 0» читалось как «за окно не отправляли», а не как «отказов нет»
    window_started_at: str
    #: Попыток за окно. Ноль означает, что доли нет вовсе
    window_attempts: int
    #: Из них неудачных (отложенных и мёртвых). Доля считается читателем: процент без знаменателя врёт на обоих концах
    window_failures: int

class PlatformAppDeliveryHealth(_PlatformAppDeliveryHealthRequired, total=False):
    """Сводка доставки событий установке. Только числа, которые считает Akeda: ни тела события, ни ответа приёмника здесь нет и быть не может — текст приёмника недоверен, а сводку читает кабинетный экран."""

    #: Когда установке в последний раз пытались дозвониться. Отсутствует, если ей ещё ничего не отправляли
    last_attempt_at: str
    #: Последняя удачная доставка. Отсутствие при заполненном last_attempt_at означает «отправляли, и ни разу не доехало» — это не то же самое, что «ещё не отправляли»
    last_delivered_at: str
    #: Проекция парковки в базе кабинета: очередь проходит мимо этой установки. Правда о парковке — parked_at самой установки
    paused_at: str

class _PlatformAppHealthCheckRequired(TypedDict):
    #: skipped — спрашивать некого: у декларативного расширения нет своего приёмника
    status: Literal['ok', 'skipped', 'failed']
    checked_at: str

class PlatformAppHealthCheck(_PlatformAppHealthCheckRequired, total=False):
    #: Адрес, который спрашивали; живёт в манифесте версии, а версию потом снимут с публикации
    url: str
    #: Ноль означает «не ответил вовсе», и это не то же самое, что «ответил пятисоткой»
    http_status: int
    latency_ms: int
    #: Класс отказа для разбора; человеку показывают не его
    reason: str

class PlatformAppInstallResult(TypedDict):
    installation: "PlatformAppInstallation"
    app: "PlatformApp"
    version: "PlatformAppVersion"
    diff: "PlatformAppConsentDiff"
    data_policy: "PlatformAppDataPolicy"
    health: "PlatformAppHealthCheck"

class _PlatformAppInstallationRequired(TypedDict):
    id: "UUID"
    tenant_id: "UUID"
    app_id: "UUID"
    version_id: "UUID"
    #: На что согласился кабинет; итоговый доступ ещё уже — он пересекается с политикой публикации, включённостью модуля, RBAC и RLS
    granted_scopes: List[str]
    status: "PlatformAppInstallationStatus"
    disable_reason: str
    #: Куда уезжают подписанные события этой установки. Снят с манифеста версии при установке; переход версии его не меняет. Пусто у декларативного расширения
    delivery_endpoint_url: str
    created_at: str
    updated_at: str

class PlatformAppInstallation(_PlatformAppInstallationRequired, total=False):
    #: След администратора для аудита; прав поставившего установка не наследует
    installed_by: int
    consent_at: str
    suspended_at: str
    revoked_at: str
    #: Момент последней смены адреса — ограда повтора: доставки, заведённые до него, переигрывает только персонал платформы. Отсутствует, пока адрес не менялся
    delivery_endpoint_changed_at: str
    #: Приёмник признан мёртвым, и доставка приостановлена: наряды копятся, ничего не теряется. Не отзыв — статус установки, её токены и секрет подписи не меняются. Отсутствует, пока установка не запаркована
    parked_at: str
    #: Машинный код причины. Список закрыт: слова недоверенного приёмника в это поле не попадают ни при каких условиях
    park_reason: Literal['', 'consecutive_dead_letters']
    #: Сколько мёртвых писем подряд насчиталось на момент парковки. Порог мог с тех пор поменяться, и без числа причина непроверяема
    parked_dead_letters: int

class _PlatformAppInstallationEventRequired(TypedDict):
    id: "UUID"
    #: Номер записи в журнале установки
    sequence: int
    installation_id: "UUID"
    tenant_id: "UUID"
    kind: Literal['install', 'consent_update', 'version_update', 'token_issue', 'token_rotate', 'token_revoke', 'suspend', 'resume', 'uninstall']
    scopes: List[str]
    reason: str
    created_at: str

class PlatformAppInstallationEvent(_PlatformAppInstallationEventRequired, total=False):
    token_id: "UUID"
    actor_user_id: int
    #: Прежнее и новое значение перехода; форма зависит от вида записи
    details: Dict[str, Any]

class PlatformAppInstallationEventPage(TypedDict):
    events: List["PlatformAppInstallationEvent"]
    #: Применённая глубина выборки, а не запрошенная
    limit: int

PlatformAppInstallationStatus = Literal['pending', 'active', 'suspended', 'revoked']

class _PlatformAppManifestBlockRequired(TypedDict):
    #: sha256 компактной формы документа — тот же отпечаток, которым ворота публикации связывают результат внешнего линтера с проверенным манифестом
    manifest_fingerprint: str
    #: Где документ впервые увидели. Улика, а не предмет запрета: тот же отпечаток у другого издателя закрыт этим же запретом
    publisher: str
    app_key: str
    reason_code: Literal['malicious', 'vulnerable', 'data_exfiltration', 'supply_chain', 'publisher_request']
    #: Объяснение словами; уезжает кабинету в карточку уведомления, поэтому это наш текст, а не эхо приёмника
    summary: str
    blocked_at: str

class PlatformAppManifestBlock(_PlatformAppManifestBlockRequired, total=False):
    #: Внешний https-адрес разбора: CVE, бюллетень, тикет
    advisory: str
    blocked_by: int

class PlatformAppManifestPermissions(TypedDict):
    #: Без этих прав приложение не работает; их появление останавливает обновление до согласия
    required: List[str]
    #: Появление такого права обновление не останавливает — оно просто не активируется
    optional: List[str]

class _PlatformAppPublisherRequired(TypedDict):
    id: "UUID"
    #: Сегмент пространства имён app.<издатель>.<ключ>; неизменен
    slug: str
    #: Что видит администратор кабинета на экране согласия; правка снимает проверку
    legal_name: str
    #: Код страны из двух букв
    country: str
    #: Внешний адрес https; правка снимает проверку
    homepage: str
    contact_email: str
    #: Отдельный адрес на аварию, чтобы она не стояла в общей очереди поддержки
    incident_email: str
    status: "PlatformAppPublisherStatus"
    #: Чем подтверждали; пусто у непроверенного
    verification_method: Literal['', 'document', 'contract', 'internal']
    #: Основание проверки текстом: через полгода вопрос будет не «проверен ли», а «на основании чего»
    verification_evidence: str
    #: Почему проверку сняли; отличает «ещё не проверяли» от «проверенное имя поменяли»
    verification_dropped_reason: str
    suspend_reason: str
    created_at: str
    updated_at: str

class PlatformAppPublisher(_PlatformAppPublisherRequired, total=False):
    verified_at: str
    verified_by: int
    verification_dropped_at: str
    suspended_at: str
    created_by: int

PlatformAppPublisherStatus = Literal['unverified', 'verified', 'suspended']

class PlatformAppReasonInput(TypedDict, total=False):
    #: Причина перехода; уезжает в журнал установки и в причину отзыва токенов
    reason: str

PlatformAppRollbackResult = TypedDict("PlatformAppRollbackResult", {"installation": "PlatformAppInstallation", "from": "PlatformAppVersion", "to": "PlatformAppVersion", "diff": "PlatformAppConsentDiff"}, total=False)

PlatformAppStatus = Literal['draft', 'published', 'suspended', 'retired']

class _PlatformAppSwitchResultRequired(TypedDict):
    installation: "PlatformAppInstallation"
    #: Сколько живых токенов погасила операция; ноль означает, что доступ и так не был выдан
    revoked_tokens: int

class PlatformAppSwitchResult(_PlatformAppSwitchResultRequired, total=False):
    #: Сколько секретов подписи погасило удаление: токен закрывает вызовы приложения к нам, секрет подписи — наши доставки к нему
    revoked_signing_keys: int
    #: Сколько сохранённых настроек и секретов уничтожено; по самой таблице этого уже не увидеть
    purged_config_values: int
    data_policy: "PlatformAppDataPolicy"
    notice: "PlatformAppUninstallNotice"

class _PlatformAppUninstallNoticeRequired(TypedDict):
    #: unavailable — не смогла отправить сама платформа: чинить это ей, а не издателю
    status: Literal['delivered', 'failed', 'skipped', 'unavailable']
    sent_at: str

class PlatformAppUninstallNotice(_PlatformAppUninstallNoticeRequired, total=False):
    url: str
    #: Идентификатор ключа подписи; секретом не является и нужен приёмнику, чтобы доказать, чем проверял
    key_id: str
    http_status: int
    reason: str

class PlatformAppUnparkResult(TypedDict):
    installation: "PlatformAppInstallation"
    health: "PlatformAppHealthCheck"
    #: Сколько установка простояла запаркованной. Числом, а не строкой: собранная сервером фраза не переводится на второй язык
    parked_for_seconds: int

class PlatformAppUpdateInput(TypedDict, total=False):
    #: Пусто означает «остаться на текущей»: тогда обновляется только согласие
    version: str
    #: Отсутствие поля означает «согласия не давали»; пустой список — «ни на что», и это разные ответы
    approved: List[str]
    reason: str

PlatformAppUpdateResult = TypedDict("PlatformAppUpdateResult", {"installation": "PlatformAppInstallation", "from": "PlatformAppVersion", "to": "PlatformAppVersion", "diff": "PlatformAppConsentDiff", "consented": bool, "health": "PlatformAppHealthCheck"}, total=False)

class _PlatformAppVersionRequired(TypedDict):
    id: "UUID"
    app_id: "UUID"
    version: str
    #: Манифест версии целиком; источник правды о правах и политике данных
    manifest: Dict[str, Any]
    #: Digest пакета: без него подмену артефакта не с чем сравнить
    manifest_digest: str
    #: Что версия просит; одобренное живёт у установки
    requested_scopes: List[str]
    status: "PlatformAppVersionStatus"
    created_at: str
    updated_at: str

class PlatformAppVersion(_PlatformAppVersionRequired, total=False):
    released_at: str

PlatformAppVersionStatus = Literal['draft', 'review', 'published', 'deprecated', 'blocked']

class Project(TypedDict):
    id: "UUID"
    key: str
    name: str
    description: str
    color: str
    order: float
    sections: int
    tasks_total: int
    tasks_active: int
    tasks_done: int
    scrum_enabled: bool

class _ProjectCreateRequired(TypedDict):
    name: str

class ProjectCreate(_ProjectCreateRequired, total=False):
    key: str
    description: str
    color: str

class ProjectFileFolder(TypedDict):
    id: "UUID"
    project_id: "UUID"
    parent_id: Optional[str]
    name: str
    sort_order: int
    created_by: Optional[int]
    created_at: str
    updated_at: str

class _ProjectFileFolderCreateRequired(TypedDict):
    name: str

class ProjectFileFolderCreate(_ProjectFileFolderCreateRequired, total=False):
    parent_id: "UUID"

class ProjectFileFolderPage(TypedDict):
    count: int
    results: List["ProjectFileFolder"]

class ProjectFileFolderRename(TypedDict):
    name: str

class _ProjectFileUploadRequired(TypedDict):
    file: str

class ProjectFileUpload(_ProjectFileUploadRequired, total=False):
    folder: "UUID"

class ProjectPage(TypedDict):
    count: int
    results: List["Project"]

class ProjectUpdate(TypedDict, total=False):
    name: str
    key: str
    description: str
    color: str

class PullRequest(TypedDict):
    id: "UUID"
    owner_type: "PullRequestOwnerType"
    owner_id: "UUID"
    owner_key: str
    owner_name: str
    provider: str
    repository: str
    number: str
    title: str
    url: str
    status: str
    branch: str
    commit_sha: str
    is_archived: bool
    created_at: str
    updated_at: str

class _PullRequestCreateRequired(TypedDict):
    url: str

class PullRequestCreate(_PullRequestCreateRequired, total=False):
    """Владелец задаётся `task`, `section` или парой `owner_type`/`owner_id`."""

    owner_type: "PullRequestOwnerType"
    owner_id: str
    task: str
    section: str
    provider: str
    repository: str
    number: str
    title: str
    status: str
    branch: str
    commit_sha: str

PullRequestOwnerType = Literal['task', 'section']

class PullRequestPage(TypedDict):
    count: int
    results: List["PullRequest"]

class PullRequestUpdate(TypedDict, total=False):
    provider: str
    repository: str
    number: str
    title: str
    url: str
    status: str
    branch: str
    commit_sha: str
    is_archived: bool

class Relation(TypedDict):
    id: "UUID"
    source: "UUID"
    target: "UUID"
    target_identifier: str
    target_title: str
    kind: "RelationKind"
    direction: "RelationDirection"
    counterpart: "UUID"
    counterpart_identifier: str
    counterpart_title: str
    counterpart_status: Optional[str]
    counterpart_status_category: Optional[str]

class _RelationCreateRequired(TypedDict):
    target: "UUID"

class RelationCreate(_RelationCreateRequired, total=False):
    kind: "RelationKind"

RelationDirection = Literal['outgoing', 'incoming', 'all']

RelationKind = Literal['relates', 'blocks', 'blocked_by', 'duplicate']

RelationList = List["Relation"]

class ScrumSection(TypedDict):
    section: "UUID"
    name: str
    key: str
    is_enabled: bool
    tasks: int

class ScrumSettings(TypedDict):
    project: "UUID"
    project_key: str
    project_name: str
    is_enabled: bool
    sprint_length_weeks: int
    close_weekday: int
    close_time: str
    daily_weekdays: List[int]
    timezone: str
    updated_at: str
    sections: List["ScrumSection"]
    team: List["ScrumTeamMember"]

class ScrumSettingsPage(TypedDict):
    count: int
    results: List["ScrumSettings"]

class ScrumSettingsUpdate(TypedDict, total=False):
    is_enabled: bool
    sprint_length_weeks: int
    close_weekday: int
    close_time: str
    daily_weekdays: List[int]
    timezone: str
    excluded_sections: List["UUID"]
    team_user_ids: List[int]

class ScrumTeamMember(TypedDict):
    user: int
    name: str
    in_team: bool
    sections: int

class Section(TypedDict):
    id: "UUID"
    project: Optional["UUID"]
    project_key: Optional[str]
    project_name: Optional[str]
    key: str
    name: str
    description: str
    color: str
    icon: str
    status: str
    lead: Optional[int]
    lead_name: Optional[str]
    target_date: Optional[str]
    tasks_total: int
    tasks_active: int
    tasks_done: int
    tasks_overdue: int
    members_count: int
    members: List["SectionMemberPreview"]

class _SectionCreateRequired(TypedDict):
    project: "UUID"
    name: str

class SectionCreate(_SectionCreateRequired, total=False):
    key: str
    description: str
    color: str
    icon: str
    status: str
    lead: int
    target_date: str

class SectionMember(TypedDict):
    id: "UUID"
    user: int
    username: str
    user_name: str
    role: "SectionRole"
    created_at: str

class SectionMemberAssignment(TypedDict, total=False):
    """Если пользователь не передан, сервер добавляет текущего пользователя."""

    user_id: int
    user: int
    role: "SectionRole"

class SectionMemberPreview(TypedDict):
    id: "UUID"
    user: int
    user_name: Optional[str]
    role: "SectionRole"

class SectionPage(TypedDict):
    count: int
    results: List["Section"]

SectionRole = Literal['owner', 'co_owner', 'member', 'viewer']

class SectionUpdate(TypedDict, total=False):
    project: "UUID"
    key: str
    name: str
    description: str
    color: str
    icon: str
    status: str
    lead: int
    target_date: str

class SettingsApiKey(TypedDict):
    id: "UUID"
    name: str
    #: Первые 12 знаков значения; открытая часть ключа
    prefix: str
    scopes: List[str]
    is_active: bool
    #: Отметка времени в текстовом виде из базы
    expires_at: Optional[str]
    rate_limit_per_min: int
    #: Отметка времени в текстовом виде из базы
    last_used_at: Optional[str]
    #: Отметка времени в текстовом виде из базы
    created_at: str
    #: Маска значения вида ••••abcd; пусто у ключей, выпущенных до хранилища
    hint: str
    #: Значение ключа сохранено в кабинете; false означает «сохранён только хеш», а не отсутствие прав
    can_reveal: bool
    #: Отметка времени в текстовом виде из базы
    revoked_at: Optional[str]
    #: Отметка времени в текстовом виде из базы
    last_revealed_at: Optional[str]
    #: Ключ выдан человеку, а не кабинету, и работает в каждом кабинете владельца с правами этого кабинета
    personal: bool

class SettingsApiKeyAccessEntry(TypedDict):
    id: "UUID"
    api_key_id: "UUID"
    user_id: Optional[int]
    #: Полное имя автора события или его логин
    user_name: str
    action: Literal['create', 'reveal', 'revoke', 'restore', 'delete']
    #: Отметка времени в текстовом виде из базы
    created_at: str

class SettingsApiKeyAccessPage(TypedDict):
    #: Число строк в results, а не общее число событий
    count: int
    results: List["SettingsApiKeyAccessEntry"]

class SettingsApiKeyActivationResult(TypedDict):
    id: "UUID"
    #: false после отзыва, true после возврата в работу
    is_active: bool

class SettingsApiKeyCreated(TypedDict):
    id: "UUID"
    name: str
    #: Первые 12 знаков значения
    prefix: str
    scopes: List[str]
    is_active: bool
    #: Отметка времени в текстовом виде из базы
    expires_at: Optional[str]
    rate_limit_per_min: int
    #: Отметка времени в текстовом виде из базы
    last_used_at: Optional[str]
    #: Отметка времени в текстовом виде из базы
    created_at: str
    #: Полное значение ключа. Показывается единственный раз — в этом ответе; список ключей его не возвращает
    key: str
    personal: bool

class SettingsApiKeyInput(TypedDict, total=False):
    #: Пустое имя заменяется на «Ключ»
    name: str
    #: Пустой список заменяется на ["tasks:read"]; каждое право обязано быть у создателя
    scopes: List[str]
    #: Ноль и отрицательное значение заменяются на 600
    rate_limit_per_min: int
    #: true выдаёт ключ человеку, а не кабинету
    personal: bool

class SettingsApiKeyPage(TypedDict):
    #: Число строк в results, а не общее число ключей кабинета
    count: int
    results: List["SettingsApiKey"]

class SettingsAppCatalog(TypedDict):
    apps: List["SettingsAppCatalogEntry"]

class _SettingsAppCatalogEntryRequired(TypedDict):
    app: "PlatformApp"
    publisher: "SettingsAppPublisherCard"
    #: Версии, открытые кабинету, свежие первыми; пусто у стоящего приложения, если ставить и обновлять больше не на что
    versions: List["SettingsAppVersion"]

class SettingsAppCatalogEntry(_SettingsAppCatalogEntryRequired, total=False):
    installation: "PlatformAppInstallation"
    installed_version: "SettingsAppVersion"

class SettingsAppConsentPermission(TypedDict):
    scope: str
    #: Без этого права приложение не работает; необъяснённое манифестом право считается обязательным
    required: bool
    #: Пусто, если манифест право не объяснил: класс не выдумывается
    risk_class: Literal['low', 'medium', 'high', 'restricted', '']
    explanation: "SettingsAppLocalizedText"
    #: Манифест объяснил право; false означает, что администратор одобряет вслепую
    explained: bool
    #: Платформа объявляла такую область. False означает, что сказать о праве нечего, кроме имени, — и экран обязан сказать именно это
    declared: bool
    #: Ярус чувствительности из таксономии платформы. Пусто у необъявленной области: ярус не выдумывается, а «обычная» по умолчанию означала бы, что неизвестное безобиднее известного
    tier: Literal['ordinary', 'sensitive', '']
    #: Область устарела и снимется не раньше чем через полгода после пометки; она открывает заметно больше нужного и осталась работающей ради уже поставленных приложений
    deprecated: bool
    grants: "SettingsAppLocalizedText"
    purpose: "SettingsAppLocalizedText"
    #: Сколько приложение держит у себя полученное этим правом; ноль — «не храню»
    retention_days: int
    #: Срок назван. Отличает «не храню» (ноль) от «срок не назван» (поля в манифесте нет)
    retention_declared: bool

class _SettingsAppConsentPreviewRequired(TypedDict):
    app: "PlatformApp"
    version: "SettingsAppVersion"
    permissions: "PlatformAppManifestPermissions"
    #: true означает, что это предпросмотр обновления
    installed: bool
    diff: "PlatformAppConsentDiff"
    data_policy: "PlatformAppDataPolicy"
    publisher: "SettingsAppPublisherCard"
    sheet: "SettingsAppConsentSheet"

class SettingsAppConsentPreview(_SettingsAppConsentPreviewRequired, total=False):
    installation: "PlatformAppInstallation"
    current_version: "SettingsAppVersion"

class SettingsAppConsentResult(TypedDict):
    preview: "SettingsAppConsentPreview"
    #: Без нового согласия установка или обновление дальше не пойдут
    requires_consent: bool

class SettingsAppConsentSheet(TypedDict):
    """Лист согласия, снятый с манифеста сервером: единственное утверждение платформы о приложении, на которое кабинет соглашается"""

    name: "SettingsAppLocalizedText"
    description: "SettingsAppLocalizedText"
    homepage: str
    runtime: Literal['hosted', 'managed', 'declarative', '']
    channel: Literal['sandbox', 'private', 'public', '']
    permissions: List["SettingsAppConsentPermission"]
    subscriptions: List["SettingsAppConsentSubscription"]
    slots: List["SettingsAppConsentSlot"]
    #: Что приложение узнает о человеке, открывшем панель: пересечение запрошенного слотами с закрытым словарём платформы; больше ничего оно узнать не может
    person_facts: List[Literal['actor_subject', 'locale', 'theme']]
    data_policy: "PlatformAppDataPolicy"
    support: "SettingsAppConsentSupport"

class SettingsAppConsentSlot(TypedDict):
    slot: str
    type: str
    title: "SettingsAppLocalizedText"
    #: Поля контекста запуска, которые слот просит, по алфавиту
    context: List[str]

class SettingsAppConsentSubscription(TypedDict):
    topic: str
    #: Приложение сузило поток отбором
    filtered: bool

class SettingsAppConsentSupport(TypedDict):
    email: str
    url: str
    incident_email: str
    response_hours: int

class _SettingsAppDeclaredSlotRequired(TypedDict):
    #: Ключ слота из контракта платформы; объявление вне контракта в ответ не попадает
    slot: str
    type: Literal['action', 'iframe', 'panel', 'settings', 'declarative']
    #: Поля контекста запуска, которые слот просит. Человека словарь называет псевдонимом
    context: List[str]
    title: "SettingsAppLocalizedText"
    theme_aware: bool
    #: Что расширение вправе прислать оболочке; уже пересечено с закрытым списком платформы
    bridge_sends: List[str]
    #: Что оболочка вправе прислать расширению
    bridge_receives: List[str]

class SettingsAppDeclaredSlot(_SettingsAppDeclaredSlotRequired, total=False):
    #: Адрес рамки. Только у слота, показывающегося отдельным источником
    url: str
    #: Источник адреса — схема, хост и порт. Считает сервер: сравнение источников обязано быть одним и тем же на выдаче запуска и в оболочке
    origin: str
    min_width: int
    min_height: int

class _SettingsAppExposureReportRequired(TypedDict):
    installation_id: str
    #: Верхняя граница ущерба: на что кабинет соглашался и чем расширение имело право пользоваться
    scopes: List[str]
    #: Сколько раз расширение забирало секреты кабинета. Это НЕ граница, а факт: каждая выдача записана до того, как значение ушло
    secret_leases: int
    secret_lease_keys: List[str]
    #: Сколько раз человек кабинета открывал панель расширения
    slot_launches: int
    token_issues: int
    #: Сколько фактов кабинета не доехало и ждёт повтора
    dead_letters: int
    #: Чего отчёт назвать не может. api_calls — какие операции расширение вызывало своим токеном: есть момент предъявления, нет предмета. event_bodies — что лежало в телах уехавших событий: тела в журнале доставки нет намеренно. delivery_summary — сводку доставки не спросили или она не ответила; это пропуск, а не нули, потому что «мёртвых писем ноль» читается как «всё доезжало». Первые две позиции стоят в списке ВСЕГДА: непроговорённый пропуск читается как хорошая новость.
    unknown: List[Literal['api_calls', 'event_bodies', 'delivery_summary']]

class SettingsAppExposureReport(_SettingsAppExposureReportRequired, total=False):
    app: str
    version: str
    last_secret_lease: str
    #: МОМЕНТ последнего предъявления токена. Что именно расширение читало, у нас не записано нигде — см. unknown
    last_token_use: str
    #: Последняя удачная доставка. Число из СВОДКИ здоровья, а не из журнала: журнал наружу не открыт, потому что в его причине отказа живёт эхо недоверенного приёмника
    last_delivered_at: str
    delivery_window_started_at: str
    #: Окно отдаётся целиком, а не готовым процентом: «0 из 0» читается как «за окно не отправляли», а не как «отказов нет»
    delivery_window_attempts: int
    delivery_window_failures: int
    #: Куда уезжали события. Адрес называет издатель, данных кабинета в нём нет по определению
    delivery_endpoint_url: str

class SettingsAppIncident(TypedDict):
    installation: "PlatformAppInstallation"
    app: "PlatformApp"
    block: "PlatformAppManifestBlock"
    exposure: "SettingsAppExposureReport"

class SettingsAppIncidentList(TypedDict):
    incidents: List["SettingsAppIncident"]

class _SettingsAppInstallInputRequired(TypedDict):
    #: Конкретная версия; последняя открытая не подразумевается
    version: str
    #: Согласие целиком: одобрить можно только запрошенное версией, и все её обязательные права обязаны войти сюда
    approved: List[str]

class SettingsAppInstallInput(_SettingsAppInstallInputRequired, total=False):
    #: Уезжает в журнал установки
    reason: str

class _SettingsAppInstallationRequired(TypedDict):
    installation: "PlatformAppInstallation"
    app: "PlatformApp"
    publisher: "SettingsAppPublisherCard"
    version: "SettingsAppVersion"
    #: Издатель, приложение и версия не выключены платформой
    live: bool
    #: Версии, на которые кабинет вправе перейти сам, свежие первыми
    updates: List["SettingsAppVersion"]
    health: "PlatformAppDeliveryHealth"

class SettingsAppInstallation(_SettingsAppInstallationRequired, total=False):
    #: Места на экране, которые занимает текущая версия установки: адрес рамки, источник, размер и мост сообщений. Оболочка строит рамку до запроса токена запуска, поэтому объявление приезжает вместе со списком установок
    slots: List["SettingsAppDeclaredSlot"]

class SettingsAppInstallationPage(TypedDict):
    installations: List["SettingsAppInstallation"]

class SettingsAppLocalizedText(TypedDict):
    """Текст на двух языках, как он объявлен в манифесте; пустая половина означает, что издатель её не заполнил"""

    ru: str
    en: str

class SettingsAppPublisherCard(TypedDict):
    """Издатель глазами кабинета: без основания проверки, адреса на аварию и причин выключения"""

    slug: str
    legal_name: str
    country: str
    homepage: str
    contact_email: str
    #: Платформа подтвердила, что имя принадлежит названному юрлицу
    verified: bool
    #: Издатель не выключен платформой
    live: bool

class _SettingsAppVersionRequired(TypedDict):
    id: "UUID"
    version: str
    status: "PlatformAppVersionStatus"
    #: Канал, объявленный манифестом; пусто, если манифест канал не назвал
    channel: Literal['sandbox', 'private', 'public', '']
    name: "SettingsAppLocalizedText"
    description: "SettingsAppLocalizedText"
    permissions: "PlatformAppManifestPermissions"

class SettingsAppVersion(_SettingsAppVersionRequired, total=False):
    """Версия глазами кабинета: без манифеста целиком; лист согласия по версии отдаёт экран согласия"""

    released_at: str

class _SettingsCompanyRequired(TypedDict):
    id: "UUID"
    name: str
    legal_name: str
    #: Пустой только у юрлица внутреннего учёта
    inn: str
    kpp: str
    is_active: bool
    #: Псевдо-юрлицо «Внутренний учёт» — контур неофициальных касс, одно на кабинет
    is_internal: bool
    #: Метод учёта cash или accrual; на этой поверхности всегда приходит пустым, потому что накладка справочника его не переносит
    accounting_method: str

class SettingsCompany(_SettingsCompanyRequired, total=False):
    #: Дата перехода на accrual; на этой поверхности не приходит никогда
    accrual_from: str

class _SettingsCompanyAccountingMethodInputRequired(TypedDict):
    #: Значение приводится к нижнему регистру
    method: Literal['cash', 'accrual']

class SettingsCompanyAccountingMethodInput(_SettingsCompanyAccountingMethodInputRequired, total=False):
    #: Дата перехода на начисление; обязательна при accrual и не используется при cash
    accrual_from: str

class _SettingsCompanyInputRequired(TypedDict):
    #: Пробельное название отклоняется
    name: str
    #: Проверяется контрольной цифрой; пустой ИНН отклоняется
    inn: str

class SettingsCompanyInput(_SettingsCompanyInputRequired, total=False):
    legal_name: str
    kpp: str

class SettingsCompanyPage(TypedDict):
    #: Число отданных строк, страниц у справочника нет
    count: int
    results: List["SettingsCompany"]

class SettingsFieldDefinition(TypedDict):
    id: "UUID"
    entity_type: str
    key: str
    label: str
    type: str
    required: bool
    dictionary: Optional["UUID"]
    order: int
    is_active: bool
    help: str
    #: Отметка времени как её печатает Postgres, а не RFC 3339
    created_at: str
    #: Отметка времени как её печатает Postgres, а не RFC 3339
    updated_at: str

class _SettingsFieldDefinitionInputRequired(TypedDict):
    entity_type: str
    key: str
    label: str

class SettingsFieldDefinitionInput(_SettingsFieldDefinitionInputRequired, total=False):
    #: Пустое значение подставляется как text
    type: Literal['text', 'number', 'date', 'bool', 'select', 'money']
    required: bool
    #: Справочник значений для типа select
    dictionary: Optional["UUID"]
    order: int
    #: Читается только при изменении; на заведении определение всегда действующее
    is_active: bool
    help: str

class SettingsFieldDefinitionPage(TypedDict):
    #: Число отданных строк, а не всего в базе; выборка обрезана 200 строками
    count: int
    results: List["SettingsFieldDefinition"]

class SettingsFieldSchema(TypedDict):
    fields: List["SettingsFieldDefinition"]

class SettingsMember(TypedDict):
    #: Идентификатор членства в кабинете, а не человека
    id: "UUID"
    #: Идентификатор человека в общем реестре платформы
    user_id: int
    username: str
    full_name: str
    birth_date: Optional[str]
    avatar_url: str
    role: Optional["UUID"]
    role_name: Optional[str]
    company_scope: Literal['all', 'selected']
    #: Заполнен при company_scope selected
    companies: List["UUID"]
    is_active: bool

class _SettingsMemberCreateInputRequired(TypedDict):
    username: str
    #: Уходит во внешний сервис входа и в ответе не повторяется
    password: str

class SettingsMemberCreateInput(_SettingsMemberCreateInputRequired, total=False):
    #: Полное имя человека; в ответе это поле называется full_name
    first_name: str
    #: Строго ГГГГ-ММ-ДД; пустая строка означает «не указана»
    birth_date: str
    avatar_url: str
    role: Optional["UUID"]
    #: Умолчание — all
    company_scope: Literal['all', 'selected']
    companies: List["UUID"]

class SettingsMemberPage(TypedDict):
    #: Число строк в results, а не общее число участников кабинета
    count: int
    results: List["SettingsMember"]

class SettingsMemberPatch(TypedDict, total=False):
    #: Меняется и во внешнем сервисе входа
    username: str
    full_name: str
    #: Строго ГГГГ-ММ-ДД; пустая строка снимает дату
    birth_date: str
    avatar_url: str
    #: null или пустая строка снимают роль
    role: Optional["UUID"]
    #: Пустая строка игнорируется
    company_scope: Literal['all', 'selected']
    companies: List["UUID"]
    is_active: bool

class SettingsRole(TypedDict):
    id: "UUID"
    name: str
    #: У административной роли permissions всегда равны ["*:*"]
    is_admin: bool
    is_active: bool
    #: Право записывается как «модуль:действие», например settings:read
    permissions: List[str]
    #: Ключ — ресурс модуля; пустая карта означает видимость только своих записей
    record_rules: Dict[str, Literal['own', 'all']]

class SettingsRoleActivationInput(TypedDict):
    #: true включает роль, false отключает; это переключатель, а не одностороннее включение
    is_active: bool

class SettingsRoleActivationResult(TypedDict):
    id: "UUID"
    is_active: bool

class _SettingsRoleInputRequired(TypedDict):
    #: Пробелы по краям срезаются; пустое имя отклоняется
    name: str

class SettingsRoleInput(_SettingsRoleInputRequired, total=False):
    #: Через этот маршрут остаётся false: административную роль создать или назначить нельзя
    is_admin: bool
    #: Отсутствие поля равно пустому списку прав
    permissions: List[str]
    #: Отсутствие поля равно пустой карте
    record_rules: Dict[str, Literal['own', 'all']]

class SettingsRolePage(TypedDict):
    #: Число строк в results, а не общее число ролей кабинета
    count: int
    results: List["SettingsRole"]

class SettingsRoleTransferInput(TypedDict):
    #: Действующая роль-получатель; обязательна, нулевой UUID отклоняется
    target_role_id: "UUID"

class SettingsRoleTransferResult(TypedDict):
    #: Сколько участников переставлено на целевую роль
    count: int
    target_role_id: "UUID"

class SettingsVatRates(TypedDict):
    #: Фиксированный профиль 22, 20, 10 и 0 процентов
    rates: List[int]

class SprintAgingTask(TypedDict):
    id: "UUID"
    code: str
    title: str
    seconds: int

class SprintMetrics(TypedDict):
    cycle: "UUID"
    window_from: str
    window_to: str
    throughput: int
    throughput_history: List["SprintThroughputPoint"]
    lead_time: "DurationMetric"
    review_time: "DurationMetric"
    reviewed_tasks: int
    returned_to_work: int
    rework_percent: float
    aging_wip: List["SprintAgingTask"]
    sizing: "SprintSizing"
    outcomes: "SprintOutcomeMetrics"

class SprintOutcomeMetrics(TypedDict):
    available: bool

class SprintSizing(TypedDict):
    up_to_half_tact: int
    up_to_tact: int
    over_tact: int
    unestimated: int

class SprintThroughputPoint(TypedDict):
    cycle: "UUID"
    name: str
    completed: int
    starts_at: Optional[str]
    ends_at: Optional[str]

class Status(TypedDict):
    id: "UUID"
    section: Optional["UUID"]
    name: str
    category: "StatusCategory"
    order: int
    color: str
    is_default: bool
    is_final: bool

StatusCategory = Literal['backlog', 'todo', 'in_progress', 'review', 'done', 'cancelled']

class _StatusCreateRequired(TypedDict):
    name: str

class StatusCreate(_StatusCreateRequired, total=False):
    section: "UUID"
    category: "StatusCategory"
    color: str
    order: int
    is_default: bool
    is_final: bool

class StatusDelete(TypedDict, total=False):
    move_tasks_to: "UUID"

class StatusDuration(TypedDict):
    status: "UUID"
    status_name: str
    category: str
    seconds: int

StatusHealth = Literal['onTrack', 'atRisk', 'offTrack']

class StatusMetrics(TypedDict):
    transitions: List["StatusTransition"]
    durations: List["StatusDuration"]

class StatusPage(TypedDict):
    count: int
    results: List["Status"]

class StatusReorder(TypedDict):
    items: List["StatusReorderItem"]

class StatusReorderItem(TypedDict):
    id: "UUID"
    order: int

class StatusTransition(TypedDict):
    id: "UUID"
    task: "UUID"
    from_status: Optional["UUID"]
    from_status_name: Optional[str]
    to_status: "UUID"
    to_status_name: Optional[str]
    actor: Optional[int]
    actor_name: Optional[str]
    created_at: str

class StatusUpdate(TypedDict):
    id: "UUID"
    owner_type: "CycleOwnerType"
    owner_id: "UUID"
    owner_key: str
    owner_name: str
    author_id: Optional[int]
    author_name: str
    health: "StatusHealth"
    body: str
    is_archived: bool
    created_at: str
    updated_at: str

class _StatusUpdateCreateRequired(TypedDict):
    health: "StatusHealth"
    body: str

class StatusUpdateCreate(_StatusUpdateCreateRequired, total=False):
    """Владелец задаётся `section`, `project` или парой `owner_type`/`owner_id`."""

    owner_type: "CycleOwnerType"
    owner_id: str
    section: str
    project: str
    author: int

class StatusUpdatePage(TypedDict):
    count: int
    results: List["StatusUpdate"]

class StatusUpdatePatch(TypedDict, total=False):
    owner_type: "CycleOwnerType"
    owner_id: str
    section: str
    project: str
    health: "StatusHealth"
    body: str
    is_archived: bool

class StockBatch(TypedDict):
    id: "UUID"
    company_id: "UUID"
    company_name: str
    product_id: "UUID"
    product_sku: str
    product_name: str
    source_document_id: "UUID"
    source_document_type_key: str
    source_line_id: "UUID"
    received_at: str
    supplier_batch_code: str
    produced_at: Optional[str]
    expires_at: Optional[str]
    is_active: bool
    #: Считается из движений регистра stock
    quantity: str
    #: Считается из движений регистра stock
    amount: str

class StockBatchPage(TypedDict):
    count: int
    limit: int
    offset: int
    results: List["StockBatch"]

class StockCompanyPolicy(TypedDict):
    id: "UUID"
    company_id: "UUID"
    company_name: str
    costing_method: Literal['fifo', 'moving_average']
    default_warehouse_id: Optional["UUID"]
    #: Складской учёт закрыт по эту дату включительно; null — период не закрыт
    closed_through: Optional[str]
    updated_at: str

class StockCompanyPolicyPage(TypedDict):
    count: int
    results: List["StockCompanyPolicy"]

class StockCompanyPolicyPatch(TypedDict, total=False):
    #: Не меняется, пока у юрлица есть товарный остаток
    costing_method: Literal['fifo', 'moving_average']
    #: Склад должен быть доступен этому юрлицу
    default_warehouse_id: Optional["UUID"]
    #: Строка YYYY-MM-DD; null снимает закрытие периода
    closed_through: Optional[str]

class StockCompanyRef(TypedDict):
    id: "UUID"
    name: str

class StockCompanyRefPage(TypedDict):
    count: int
    results: List["StockCompanyRef"]

class _StockDocumentCreateRequired(TypedDict):
    type_key: "StockDocumentCreateTypeKey"
    entity_refs: "StockDocumentRefs"
    #: Для инвентаризации — фильтр снимка, для остальных видов — содержимое документа
    payload: Union["StockDocumentPayload", "StockInventoryCreatePayload"]

class StockDocumentCreate(_StockDocumentCreateRequired, total=False):
    #: Пусто или отсутствует означает рабочую дату кабинета
    date: str
    basis_id: Optional["UUID"]
    comment: str

StockDocumentCreateTypeKey = Literal['stock_receipt', 'stock_shipment', 'stock_transfer', 'stock_writeoff', 'stock_capitalization', 'stock_supplier_return', 'stock_customer_return', 'stock_purchase_request', 'stock_supplier_order', 'stock_inventory', 'stock_reservation', 'stock_landed_cost']

class StockDocumentFulfillment(TypedDict):
    document_id: "UUID"
    type_key: "StockDocumentTypeKey"
    type_name: str
    number: str
    status: "CoreDocumentStatus"
    lines: List["StockDocumentFulfillmentLine"]

class StockDocumentFulfillmentLine(TypedDict):
    line_id: "UUID"
    product_id: "UUID"
    #: Decimal string из строки документа
    ordered_qty: str
    #: Decimal string из регистра потребности или ожидаемого поступления
    remaining_qty: str

class StockDocumentFulfillmentPage(TypedDict):
    count: int
    results: List["StockDocumentFulfillment"]

class _StockDocumentLandedCostTargetRequired(TypedDict):
    batch_id: "UUID"
    product_id: "UUID"

class StockDocumentLandedCostTarget(_StockDocumentLandedCostTargetRequired, total=False):
    """Партия, на которую распределяются накладные расходы."""

    #: Decimal string; обязательна при ручном распределении
    share: str

class _StockDocumentLineRequired(TypedDict):
    line_id: "UUID"
    product_id: "UUID"
    #: Положительная decimal string в единице строки
    qty: str

class StockDocumentLine(_StockDocumentLineRequired, total=False):
    #: Физическая единица справочника
    unit_id: Optional["UUID"]
    #: Товарная единица представления
    product_uom_id: Optional["UUID"]
    #: Количество в базовой единице номенклатуры; присланное значение обязано совпасть с серверным пересчётом
    base_qty: str
    #: Decimal string
    price: str
    #: Decimal string
    amount: str
    basis_line_id: Optional["UUID"]
    #: Построчное происхождение, когда один заказ поставщику сводит несколько заявок
    basis_document_id: Optional["UUID"]
    batch_code: str
    produced_at: str
    expires_at: str
    handling_units: List["StockDocumentLineHandlingUnit"]
    handling_unit_allocations: List["StockDocumentLineHandlingAllocation"]

class StockDocumentLineHandlingAllocation(TypedDict):
    """Списание количества с конкретной физической единицы в расходной строке."""

    handling_unit_id: "UUID"
    #: Положительная decimal string
    qty: str

class StockDocumentLineHandlingUnit(TypedDict, total=False):
    """Физическая единица (экземпляр, паллета, бухта), создаваемая приходной строкой."""

    id: "UUID"
    #: Пустой код сервер выдаёт сам из идентификатора
    code: str
    #: Положительная decimal string в базовой единице; пусто — равная доля количества строки
    initial_base_qty: str
    custom: Dict[str, Any]

class StockDocumentPage(TypedDict):
    count: int
    limit: int
    offset: int
    results: List["CoreDocument"]

class StockDocumentPatch(TypedDict, total=False):
    date: str
    basis_id: Optional["UUID"]
    entity_refs: "StockDocumentRefs"
    payload: "StockDocumentPayload"
    comment: str

class _StockDocumentPayloadRequired(TypedDict):
    version: int

class StockDocumentPayload(_StockDocumentPayloadRequired, total=False):
    """Содержимое складского документа. Разбор строгий — незнакомое поле отклоняется. У документа-факта, заявки, заказа и резерва `items` обязателен и не длиннее 1000 строк."""

    reason: str
    desired_at: str
    delivery_at: str
    #: Срок резерва; не раньше даты документа
    expires_at: str
    items: List["StockDocumentLine"]
    #: Decimal string; сумма накладных расходов
    amount: str
    allocation_method: Literal['quantity', 'cost', 'manual']
    targets: List["StockDocumentLandedCostTarget"]
    #: Разложение проведения по строкам и партиям, которое пишет сам движок
    posting: Dict[str, Any]

class _StockDocumentRefsRequired(TypedDict):
    company: "UUID"

class StockDocumentRefs(_StockDocumentRefsRequired, total=False):
    """Ссылки шапки складского документа. Набор допустимых полей зависит от вида — перемещению нужны склад-отправитель и склад-получатель, инвентаризации только юрлицо и склад."""

    warehouse: "UUID"
    warehouse_from: "UUID"
    warehouse_to: "UUID"
    contact: "UUID"

StockDocumentTypeKey = Literal['stock_receipt', 'stock_shipment', 'stock_transfer', 'stock_writeoff', 'stock_capitalization', 'stock_supplier_return', 'stock_customer_return', 'stock_purchase_request', 'stock_supplier_order', 'stock_inventory', 'stock_reservation', 'stock_landed_cost', 'stock_reservation_release']

class _StockExportRequired(TypedDict):
    id: "UUID"
    kind: "StockImportKind"
    format: "CoreProductTransferFormat"
    file_name: str
    size: int
    row_count: int
    created_at: str

class StockExport(_StockExportRequired, total=False):
    target_document_id: "UUID"
    created_by: int

class _StockExportRequestRequired(TypedDict):
    kind: "StockImportKind"

class StockExportRequest(_StockExportRequestRequired, total=False):
    format: "CoreProductTransferFormat"
    #: Обязателен для всех видов, кроме reorder_rules
    target_document_id: "UUID"

class _StockHandlingUnitRequired(TypedDict):
    id: "UUID"
    batch_id: "UUID"
    company_id: "UUID"
    company_name: str
    product_id: "UUID"
    product_sku: str
    product_name: str
    base_unit: str
    source_document_id: "UUID"
    source_document_number: str
    source_document_status: "CoreDocumentStatus"
    source_line_id: "UUID"
    code: str
    initial_base_qty: str
    #: Считается из движений регистра stock
    remaining_base_qty: str
    #: Считается из движений регистра stock_reserved
    reserved_base_qty: str
    amount: str
    status: "StockHandlingUnitStatus"
    state: "StockHandlingUnitState"
    warehouse_name: str
    custom: Dict[str, Any]
    received_at: str
    created_at: str
    updated_at: str

class StockHandlingUnit(_StockHandlingUnitRequired, total=False):
    #: Отдаётся только когда положительный остаток лежит в одном месте хранения
    warehouse_id: Optional["UUID"]

class StockHandlingUnitCard(TypedDict):
    handling_unit: "StockHandlingUnit"
    #: Движения единицы по регистру stock
    entries: List["CoreRegisterEntry"]

class StockHandlingUnitPage(TypedDict):
    count: int
    limit: int
    offset: int
    results: List["StockHandlingUnit"]

StockHandlingUnitState = Literal['pending', 'sealed', 'opened', 'empty', 'cancelled', 'blocked', 'retired', 'location_conflict']

StockHandlingUnitStatus = Literal['active', 'blocked', 'retired']

class StockHandlingUnitStatusPatch(TypedDict):
    status: "StockHandlingUnitStatus"

class StockHandlingUnitSuggestion(TypedDict):
    handling_unit_id: "UUID"
    code: str
    batch_id: "UUID"
    qty: str
    available_before: str
    available_after: str
    state_before: "StockHandlingUnitState"

class StockHandlingUnitSuggestionResult(TypedDict):
    requested_qty: str
    allocated_qty: str
    #: false означает, что доступных единиц не хватило на всё количество
    complete: bool
    allocations: List["StockHandlingUnitSuggestion"]

class _StockImportApplyRequestRequired(TypedDict):
    preview_token: str

class StockImportApplyRequest(_StockImportApplyRequestRequired, total=False):
    confirm_warnings: bool

class _StockImportDiffRequired(TypedDict):
    row: int
    #: initial_stock всегда create, остальные виды — update
    action: Literal['create', 'update']

class StockImportDiff(_StockImportDiffRequired, total=False):
    target_id: "UUID"
    #: Идентификатор номенклатуры строки, а при его отсутствии — документа
    label: str
    changes: Dict[str, str]

class _StockImportInspectRequestRequired(TypedDict):
    header_row: int

class StockImportInspectRequest(_StockImportInspectRequestRequired, total=False):
    #: Пустое значение берёт первый лист книги
    sheet_name: str

StockImportKind = Literal['initial_stock', 'inventory_count', 'document_items', 'reorder_rules']

class _StockImportRunRequired(TypedDict):
    id: "UUID"
    kind: "StockImportKind"
    format: "CoreProductTransferFormat"
    status: "StockImportStatus"
    mode: "CoreProductImportMode"
    source_name: str
    source_sha256: str
    source_size: int
    mapping: "CoreProductImportMappingState"
    schema_version: Literal['stock-v1']
    revision: int
    created_count: int
    updated_count: int
    unchanged_count: int
    warning_count: int
    error_count: int
    created_at: str

class StockImportRun(_StockImportRunRequired, total=False):
    target_document_id: "UUID"
    preview_token: str
    diff: List["StockImportDiff"]
    issues: List["CoreProductImportIssue"]
    created_by: int
    previewed_at: str
    applied_at: str
    source_columns: List[str]
    source_sheets: List["CoreProductImportSheet"]
    target_fields: List["CoreProductImportField"]

StockImportStatus = Literal['uploaded', 'mapped', 'previewed', 'applied']

class StockInventoryChange(TypedDict):
    """Документ, тронувший товар снимка после момента снимка."""

    document_id: "UUID"
    number: str
    type_key: str
    status: "CoreDocumentStatus"
    occurred_at: str

class StockInventoryChangePage(TypedDict):
    count: int
    results: List["StockInventoryChange"]

class _StockInventoryCountRequired(TypedDict):
    product_id: "UUID"
    #: Неотрицательная decimal string
    actual_qty: str

class StockInventoryCount(_StockInventoryCountRequired, total=False):
    #: Неотрицательная decimal string; обязательна для излишка перед созданием актов
    surplus_price: str

class StockInventoryCountSheet(TypedDict):
    id: "UUID"
    number: str
    date: str
    workflow: "StockInventoryWorkflow"
    company_id: "UUID"
    warehouse_id: "UUID"
    count: int
    items: List["StockInventoryCountSheetItem"]

class _StockInventoryCountSheetItemRequired(TypedDict):
    line_id: "UUID"
    product_id: "UUID"
    product_sku: str
    product_name: str
    unit: str

class StockInventoryCountSheetItem(_StockInventoryCountSheetItemRequired, total=False):
    #: Decimal string
    actual_qty: str
    #: Decimal string
    surplus_price: str

class _StockInventoryCountsInputRequired(TypedDict):
    counts: List["StockInventoryCount"]

class StockInventoryCountsInput(_StockInventoryCountsInputRequired, total=False):
    #: updated_at документа, известный клиенту; несовпадение отклоняет запись
    expected_updated_at: str

class _StockInventoryCreatePayloadRequired(TypedDict):
    version: int

class StockInventoryCreatePayload(_StockInventoryCreatePayloadRequired, total=False):
    """Содержимое инвентаризации при создании. Снимок остатков сервер снимает сам, поэтому строки в теле не передаются."""

    filter: "StockInventoryFilter"

class StockInventoryDeriveResult(TypedDict):
    inventory: "CoreDocument"
    #: Черновики списания и оприходования; пустой список означает, что расхождений нет
    documents: List["CoreDocument"]

class StockInventoryFilter(TypedDict, total=False):
    """Отбор товаров в снимок. Пустой фильтр берёт весь склад."""

    category_id: Optional["UUID"]
    product_ids: List["UUID"]

class StockInventoryFinishInput(TypedDict, total=False):
    #: updated_at документа, известный клиенту; несовпадение отклоняет запись
    expected_updated_at: str

class StockInventoryRefreshInput(TypedDict, total=False):
    #: Переносить ли уже записанный факт на совпавшие товары нового снимка
    keep_counts: bool
    #: updated_at документа, известный клиенту; несовпадение отклоняет запись
    expected_updated_at: str

StockInventoryWorkflow = Literal['counting', 'counted', 'acts_created', 'closed']

class StockProductUOM(TypedDict):
    id: "UUID"
    product_id: "UUID"
    code: str
    name: str
    input_unit_id: "UUID"
    unit_code: str
    unit_label: str
    usage: "StockProductUOMUsage"
    #: Положительный decimal — сколько базовых единиц товара содержит одна единица ввода
    factor_to_base: str
    precision: int
    creates_handling_units: bool
    is_default_receipt: bool
    is_active: bool
    updated_at: str

class _StockProductUOMInputRequired(TypedDict):
    product_id: "UUID"
    code: str
    name: str
    input_unit_id: "UUID"
    factor_to_base: str

class StockProductUOMInput(_StockProductUOMInputRequired, total=False):
    #: Без идентификатора заводится новая товарная единица
    id: Optional["UUID"]
    usage: "StockProductUOMUsage"
    #: Требует единицы измерения с целой точностью
    creates_handling_units: bool
    is_default_receipt: bool
    #: По умолчанию единица активна
    is_active: Optional[bool]

class StockProductUOMPage(TypedDict):
    count: int
    results: List["StockProductUOM"]

StockProductUOMUsage = Literal['purchase', 'receipt', 'packaging']

class _StockPurchaseOrderCreateRequired(TypedDict):
    company_id: "UUID"
    warehouse_id: "UUID"
    #: Контрагент с ролью поставщика
    supplier_id: "UUID"
    items: List["StockPurchaseOrderLineInput"]

class StockPurchaseOrderCreate(_StockPurchaseOrderCreateRequired, total=False):
    #: Пустая или пропущенная означает текущую бизнес-дату кабинета
    date: str
    #: Ожидаемая дата поставки
    delivery_at: Optional[str]
    comment: str

class _StockPurchaseOrderLineInputRequired(TypedDict):
    product_id: "UUID"
    #: Decimal string заказываемого количества
    qty: str

class StockPurchaseOrderLineInput(_StockPurchaseOrderLineInputRequired, total=False):
    #: Decimal string цены поставщика; пропуск записывается нулём
    price: str
    #: Строка заявки на закупку; указывается только вместе с request_id
    basis_line_id: Optional["UUID"]
    #: Проведённая заявка на закупку того же юрлица и склада; указывается только вместе с basis_line_id
    request_id: Optional["UUID"]

class StockReorderRule(TypedDict):
    id: "UUID"
    company_id: "UUID"
    company_name: str
    product_id: "UUID"
    product_sku: str
    product_name: str
    #: null означает правило юрлица на все склады
    warehouse_id: Optional["UUID"]
    warehouse_name: str
    #: Decimal string неснижаемого остатка
    min_qty: str
    #: Decimal string целевого остатка; null — потолок не задан
    max_qty: Optional[str]
    #: Decimal string кратности заказа; null — кратность не задана
    order_multiple: Optional[str]
    lead_time_days: int
    preferred_supplier_id: Optional["UUID"]
    preferred_supplier_name: str
    is_active: bool
    updated_at: str

class _StockReorderRuleInputRequired(TypedDict):
    company_id: "UUID"
    #: Складская номенклатура — отдельный товар или вариант; семейство вариантов и услуга не принимаются
    product_id: "UUID"
    #: Decimal string неотрицательного неснижаемого остатка
    min_qty: str

class StockReorderRuleInput(_StockReorderRuleInputRequired, total=False):
    #: Пропуск или null заводит правило юрлица на все склады
    warehouse_id: Optional["UUID"]
    #: Decimal string; не меньше min_qty
    max_qty: Optional[str]
    #: Decimal string строго больше нуля
    order_multiple: Optional[str]
    lead_time_days: int
    preferred_supplier_id: Optional["UUID"]
    is_active: bool

class StockReorderRulePage(TypedDict):
    #: Общее число подходящих правил, а не размер страницы
    count: int
    limit: int
    offset: int
    results: List["StockReorderRule"]

class StockReorderRulePatch(TypedDict, total=False):
    company_id: "UUID"
    product_id: "UUID"
    warehouse_id: Optional["UUID"]
    #: Decimal string
    min_qty: str
    max_qty: Optional[str]
    order_multiple: Optional[str]
    lead_time_days: int
    preferred_supplier_id: Optional["UUID"]
    is_active: bool

class StockReportDrilldown(TypedDict):
    product_id: "UUID"
    #: Число движений регистра, а не строк отчёта
    count: int
    limit: int
    offset: int
    rows: List["StockReportRow"]
    entries: List["StockReportDrilldownEntry"]

class StockReportDrilldownEntry(TypedDict):
    id: "UUID"
    registrar_id: "UUID"
    registrar_number: str
    registrar_type_key: str
    registrar_type_name: str
    registrar_status: str
    date: str
    sign: int
    dims: Dict[str, Any]
    values: Dict[str, Any]
    unit: str

class StockReportOverduePage(TypedDict):
    count: int
    results: List["StockReportOverdueReservation"]

class StockReportOverdueReservation(TypedDict):
    document_id: "UUID"
    number: str
    date: str
    expires_at: str
    company_id: "UUID"
    company_name: str
    warehouse_id: "UUID"
    warehouse_name: str
    #: Decimal string
    remaining_qty: str
    product_count: int

class StockReportPage(TypedDict):
    count: int
    limit: int
    offset: int
    results: List["StockReportRow"]
    formula: Literal['available = on_hand - reserved; forecast = available + expected']

class StockReportPurchasingPage(TypedDict):
    count: int
    results: List["StockReportPurchasingRow"]
    formula: Literal['projected = on_hand - reserved + expected; suggested = max(demand, rule_shortage)']

class StockReportPurchasingRow(TypedDict):
    company_id: "UUID"
    company_name: str
    warehouse_id: Optional["UUID"]
    warehouse_code: str
    warehouse_name: str
    product_id: "UUID"
    product_sku: str
    product_name: str
    unit: str
    #: Decimal string
    on_hand: str
    #: Decimal string
    reserved: str
    #: Decimal string
    available: str
    #: Decimal string
    expected: str
    #: Decimal string
    demand: str
    #: Decimal string
    projected: str
    #: Decimal string
    min_qty: str
    #: Decimal string
    max_qty: Optional[str]
    #: Decimal string
    order_multiple: Optional[str]
    lead_time_days: int
    preferred_supplier_id: Optional["UUID"]
    preferred_supplier_name: str
    #: Decimal string
    suggested_qty: str
    rule_id: Optional["UUID"]
    #: Какое правило пополнения подобралось к строке
    rule_source: Literal['none', 'fallback', 'warehouse']
    sources: Optional[List["StockReportPurchasingSource"]]

class StockReportPurchasingSource(TypedDict):
    request_id: "UUID"
    request_number: str
    request_type: str
    request_type_name: str
    basis_line_id: "UUID"
    #: Decimal string
    remaining_qty: str

class StockReportReservationLine(TypedDict):
    basis_line_id: "UUID"
    product_id: "UUID"
    #: Decimal string
    original_qty: str
    #: Decimal string
    shipped_qty: str
    #: Decimal string
    released_qty: str
    #: Decimal string
    remaining_qty: str

class StockReportReservationPage(TypedDict):
    count: int
    results: List["StockReportReservationSummary"]

class StockReportReservationSummary(TypedDict):
    document_id: "UUID"
    #: Decimal string
    original_qty: str
    #: Decimal string
    shipped_qty: str
    #: Decimal string
    released_qty: str
    #: Decimal string
    remaining_qty: str
    state: Literal['active', 'partially_shipped', 'fulfilled', 'released']
    is_overdue: bool
    lines: List["StockReportReservationLine"]

class StockReportRow(TypedDict):
    company_id: "UUID"
    company_name: str
    warehouse_id: "UUID"
    warehouse_code: str
    warehouse_name: str
    product_id: "UUID"
    product_sku: str
    product_name: str
    unit: str
    #: Decimal string
    on_hand: str
    #: Decimal string
    reserved: str
    #: Decimal string
    available: str
    #: Decimal string
    expected: str
    #: Decimal string
    forecast: str
    #: Decimal string
    minimum: str
    #: Decimal string
    suggested: str
    #: Decimal string
    amount: str
    #: Decimal string
    unit_cost: str
    entry_count: int

class StockScanResult(TypedDict):
    identifier_id: "UUID"
    barcode: str
    product_id: "UUID"
    product_sku: str
    product_name: str
    base_unit: str
    product_uom_id: Optional["UUID"]
    product_uom_name: str
    input_unit_id: Optional["UUID"]
    input_unit_label: str
    factor_to_base: str

class StockSettings(TypedDict):
    #: Запрещать отгрузку сверх свободного остатка
    block_shipment_over_free: bool
    #: Запрещать резерв сверх доступного остатка
    block_reservation_over_available: bool
    #: Снимать просроченные резервы автоматически
    auto_cancel_expired_reservations: bool
    default_reservation_days: int
    updated_at: str

class StockSettingsPatch(TypedDict, total=False):
    block_shipment_over_free: bool
    block_reservation_over_available: bool
    auto_cancel_expired_reservations: bool
    default_reservation_days: int

class StockSupplier(TypedDict):
    id: "UUID"
    name: str
    kind: "CoreContactKind"
    is_active: bool

class StockSupplierPage(TypedDict):
    count: int
    results: List["StockSupplier"]

class StockValuationPreviewRequest(TypedDict):
    document_id: "UUID"

class _StockValuationRebuildRequestRequired(TypedDict):
    document_id: "UUID"

class StockValuationRebuildRequest(_StockValuationRebuildRequestRequired, total=False):
    #: Уникален в пределах кабинета; повтор с тем же ключом возвращает уже заведённый прогон. Пустой ключ заменяется идентификатором документа
    idempotency_key: str

class StockValuationResult(TypedDict):
    document_id: "UUID"
    #: preview — расчёт откачен, completed — пересчёт записан
    status: Literal['preview', 'completed']
    #: Decimal string суммы накладных расходов
    total_amount: str
    affected_documents: int
    steps: List["StockValuationStep"]

class _StockValuationRunRequired(TypedDict):
    id: "UUID"
    document_id: "UUID"
    idempotency_key: str
    status: Literal['pending', 'running', 'completed', 'failed']
    #: Сколько документов цепочки уже перепроведено
    progress: int
    #: Сколько документов цепочки предстоит перепровести
    total: int
    created_at: str

class StockValuationRun(_StockValuationRunRequired, total=False):
    result: "StockValuationResult"
    #: Заполняется при status=failed
    error: str
    started_at: str
    finished_at: str

class StockValuationStep(TypedDict):
    document_id: "UUID"
    type_key: str
    number: str
    date: str
    #: Число движений регистров, записанных этим документом
    movements: int

class StockWarehouse(TypedDict):
    id: "UUID"
    code: str
    name: str
    parent_id: Optional["UUID"]
    address: Dict[str, Any]
    responsible_employee_id: Optional["UUID"]
    is_active: bool
    sort_order: int
    #: Пустой список означает доступность склада всем активным юрлицам кабинета
    company_ids: List["UUID"]
    created_at: str
    updated_at: str

class StockWarehouseBlocker(TypedDict):
    register: Literal['stock', 'stock_reserved', 'stock_expected']
    company_id: "UUID"
    product_id: "UUID"
    #: Ненулевой остаток decimal
    quantity: str

class StockWarehouseBlockerCheck(TypedDict):
    allowed: bool
    blockers: List["StockWarehouseBlocker"]

class _StockWarehouseInputRequired(TypedDict):
    #: Приводится к верхнему регистру
    code: str
    name: str

class StockWarehouseInput(_StockWarehouseInputRequired, total=False):
    parent_id: Optional["UUID"]
    address: Dict[str, Any]
    responsible_employee_id: Optional["UUID"]
    sort_order: int
    company_ids: List["UUID"]

class StockWarehousePage(TypedDict):
    count: int
    results: List["StockWarehouse"]

class StockWarehousePatch(TypedDict, total=False):
    """Отсутствующее поле сохраняет текущее значение; переданное применяется, включая null для nullable-полей."""

    code: str
    name: str
    parent_id: Optional["UUID"]
    address: Dict[str, Any]
    responsible_employee_id: Optional["UUID"]
    sort_order: int
    company_ids: List["UUID"]

class Subtask(TypedDict):
    id: "UUID"
    identifier: str
    title: str
    status_category: Optional[str]
    executor_name: Optional[str]
    due_at: Optional[str]

class Tag(TypedDict):
    id: "UUID"
    project: Optional["UUID"]
    name: str
    color: str
    description: str
    is_archived: bool

class TagAttach(TypedDict, total=False):
    """Передайте `tag_id` существующей метки либо `name` для создания новой."""

    tag_id: "UUID"
    name: str
    color: str

class TagPage(TypedDict):
    count: int
    results: List["Tag"]

class _TaskRequired(TypedDict):
    id: "UUID"
    identifier: str
    section: Optional["UUID"]
    section_key: Optional[str]
    section_name: Optional[str]
    title: str
    description: str
    status: Optional["UUID"]
    status_name: Optional[str]
    status_category: Optional[str]
    priority: "TaskPriority"
    is_important: bool
    creator: Optional[int]
    creator_name: Optional[str]
    executor: Optional[int]
    executor_name: Optional[str]
    coexecutors: List["TaskWatcher"]
    cycle: Optional["UUID"]
    cycle_name: Optional[str]
    start_at: Optional[str]
    created_at: str
    due_at: Optional[str]
    estimate: Optional[float]
    sort_order: float
    is_archived: bool
    parent: Optional["UUID"]
    parent_identifier: Optional[str]
    parent_title: Optional[str]
    recurrence: str
    recurrence_interval: int
    recurrence_until: Optional[str]
    custom: Dict[str, Any]
    watchers: List["TaskWatcher"]
    subtasks: List["Subtask"]
    subtasks_total: int
    subtasks_done: int
    tags: List["TaskTag"]
    links: List[Dict[str, Any]]
    comments_count: int
    blocked_by_count: int

class Task(_TaskRequired, total=False):
    assignee: Optional[int]
    assignee_name: Optional[str]

class _TaskCreateRequired(TypedDict):
    section: "UUID"
    title: str

class TaskCreate(_TaskCreateRequired, total=False):
    description: str
    status: "UUID"
    priority: "TaskPriority"
    is_important: bool
    creator: int
    executor: int
    assignee: int
    coexecutor_ids: List[int]
    watcher_ids: List[int]
    tag_ids: List["UUID"]
    start_at: str
    due_at: str
    estimate: float
    parent: "UUID"
    recurrence: str
    recurrence_interval: int
    recurrence_until: str
    cycle: str
    custom: Dict[str, Any]

class TaskDocument(TypedDict):
    id: "UUID"
    owner_type: "DocumentOwnerType"
    owner_id: "UUID"
    owner_key: str
    owner_name: str
    author_id: Optional[int]
    author_name: str
    title: str
    content: str
    icon: str
    color: str
    is_archived: bool
    created_at: str
    updated_at: str

class TaskMove(TypedDict):
    status: "UUID"

class _TaskPageRequired(TypedDict):
    count: int
    results: List["Task"]

class TaskPage(_TaskPageRequired, total=False):
    limit: int
    offset: int
    has_more: bool

TaskPriority = Literal['none', 'low', 'medium', 'high', 'urgent']

class _TaskTagRequired(TypedDict):
    id: "UUID"
    name: str

class TaskTag(_TaskTagRequired, total=False):
    color: str

class TaskTagCatalogItem(TypedDict):
    id: "UUID"
    section: Optional["UUID"]
    name: str
    color: str
    description: str
    is_archived: bool

class _TaskTagCreateRequired(TypedDict):
    name: str

class TaskTagCreate(_TaskTagCreateRequired, total=False):
    section: "UUID"
    color: str
    description: str

class TaskTagPage(TypedDict):
    count: int
    results: List["TaskTagCatalogItem"]

class TaskTagUpdate(TypedDict, total=False):
    name: str
    color: str
    description: str

class _TaskTemplateRequired(TypedDict):
    id: "UUID"
    section: "UUID"
    section_key: Optional[str]
    section_name: Optional[str]
    status: Optional["UUID"]
    status_name: Optional[str]
    owner: Optional[int]
    name: str
    title: str
    description: str
    priority: "TaskPriority"
    executor: Optional[int]
    executor_name: Optional[str]
    estimate: Optional[float]
    start_offset_days: int
    due_offset_days: Optional[int]
    recurrence: "TemplateRecurrence"
    recurrence_interval: int
    recurrence_until: Optional[str]
    next_run_at: Optional[str]
    last_run_at: Optional[str]
    last_task: Optional["UUID"]
    last_task_identifier: Optional[str]
    is_active: bool
    custom: Dict[str, Any]
    created_at: str
    updated_at: str

class TaskTemplate(_TaskTemplateRequired, total=False):
    assignee: int

class _TaskTemplateCreateRequired(TypedDict):
    section: "UUID"
    name: str
    title: str

class TaskTemplateCreate(_TaskTemplateCreateRequired, total=False):
    status: "UUID"
    description: str
    priority: "TaskPriority"
    executor: int
    assignee: int
    estimate: float
    start_offset_days: int
    due_offset_days: int
    recurrence: "TemplateRecurrence"
    recurrence_interval: int
    recurrence_until: str
    next_run_at: str
    is_active: bool
    custom: Dict[str, Any]

class TaskTemplatePage(TypedDict):
    count: int
    results: List["TaskTemplate"]

class TaskTemplateUpdate(TypedDict, total=False):
    section: "UUID"
    status: "UUID"
    name: str
    title: str
    description: str
    priority: "TaskPriority"
    executor: int
    assignee: int
    estimate: float
    start_offset_days: int
    due_offset_days: int
    recurrence: "TemplateRecurrence"
    recurrence_interval: int
    recurrence_until: str
    next_run_at: str
    is_active: bool
    custom: Dict[str, Any]

class TaskUpdate(TypedDict, total=False):
    title: str
    description: str
    section: "UUID"
    status: "UUID"
    priority: "TaskPriority"
    is_important: bool
    executor: int
    assignee: int
    coexecutor_ids: List[int]
    watcher_ids: List[int]
    tag_ids: List["UUID"]
    start_at: str
    due_at: str
    estimate: float
    parent: "UUID"
    recurrence: str
    recurrence_interval: int
    recurrence_until: str
    cycle: str
    custom: Dict[str, Any]
    managed_checklist: "ManagedChecklistPatch"

class TaskView(TypedDict):
    id: "UUID"
    name: str
    owner: Optional[int]
    owner_name: Optional[str]
    section: Optional["UUID"]
    visibility: Literal['private', 'workspace']
    filters: Dict[str, Any]
    sort: str

class _TaskViewCreateRequired(TypedDict):
    name: str

class TaskViewCreate(_TaskViewCreateRequired, total=False):
    section: "UUID"
    visibility: Literal['private', 'workspace']
    filters: Dict[str, Any]
    sort: str

class TaskViewPage(TypedDict):
    count: int
    results: List["TaskView"]

class TaskWatcher(TypedDict):
    id: int
    user: int
    user_name: Optional[str]

class _TasksSnapshotRequired(TypedDict):
    fetched_at: str
    revision: str
    projects: List["Project"]
    sections: List["Section"]
    statuses: List["Status"]
    tags: List["TaskTagCatalogItem"]
    members: List["Member"]
    views: List["TaskView"]
    cycles: List["Cycle"]
    tasks: List["Task"]
    tasks_has_more: bool

class TasksSnapshot(_TasksSnapshotRequired, total=False):
    tasks_limit: int

TemplateRecurrence = Literal['daily', 'weekly', 'monthly', 'yearly']

class TemplateRunPage(TypedDict):
    count: int
    results: List["TemplateRunResult"]

class _TemplateRunResultRequired(TypedDict):
    template: "TaskTemplate"
    task: Optional["Task"]
    created: bool

class TemplateRunResult(_TemplateRunResultRequired, total=False):
    reason: str

UUID = str

class WorkflowStatusUpdate(TypedDict, total=False):
    name: str
    category: "StatusCategory"
    color: str
    order: int
    is_default: bool
    is_final: bool

class CoreListBusinessesResponse(TypedDict):
    results: List["CoreBusiness"]

class CoreSetBusinessActiveRequest(TypedDict):
    active: bool

class CoreListBusinessOwnershipResponse(TypedDict):
    results: List["CoreOwnershipVersion"]

class FinanceListDividendAccessUsersResponse(TypedDict, total=False):
    results: List["FinanceListDividendAccessUsersResponseResultsItem"]

class FinanceListDividendAccessUsersResponseResultsItem(TypedDict):
    user_id: int
    full_name: str
    username: str

class FinanceListDividendAutomationRunsResponse(TypedDict, total=False):
    results: List[Dict[str, Any]]

class FinanceListDividendDecisionsResponse(TypedDict, total=False):
    results: List[Dict[str, Any]]

class FinanceListDividendOwnersResponse(TypedDict):
    results: List["FinanceListDividendOwnersResponseResultsItem"]

class FinanceListDividendOwnersResponseResultsItem(TypedDict):
    id: "UUID"
    kind: Literal['employee', 'company', 'contact']
    name: str
    share_percent: str
    is_active: bool
    payable_balance: str

class FinanceListDividendPoliciesResponse(TypedDict, total=False):
    results: List[Dict[str, Any]]

class FinanceGetProjectBudgetHistoryResponse(TypedDict):
    count: int
    results: List["FinanceProjectBudget"]
