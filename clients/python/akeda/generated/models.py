# Сгенерировано scripts/generate.py. Руками не править.
# Источник: snapshot/openapi/akeda-v1.json (контракт 0.21.0-core-public, sha256 1f6544b5195c473e6b33c6cd19419caf1980480f349c983ff40de7cce6ff2145).
# Рантайм клиента написан руками и живёт рядом; здесь только типы.

from __future__ import annotations

from typing import Any, Dict, List, Literal, Optional, TypedDict, Union

__all__ = [
    "AccountingBasis",
    "Activity",
    "ActivityDetail",
    "ActivityList",
    "AppFinanceClassificationSuggestionAccepted",
    "AppFinanceClassificationSuggestionInput",
    "AppFinanceClassificationSuggestionInputCashflowItem",
    "AppFinanceClassificationSuggestionInputExplanation",
    "AppFinanceDirectoryRef",
    "AppReferenceItem",
    "AppReferenceItemPage",
    "AppReferenceUpsertInput",
    "AppReferenceUpsertItem",
    "AppReferenceUpsertResult",
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
    "AssistantDigest",
    "AssistantDigestInput",
    "Attachment",
    "AttachmentOwnerType",
    "AttachmentPage",
    "AttachmentReplacementSessionCreate",
    "AttachmentUploadSession",
    "AttachmentUploadSessionCreate",
    "AutomationManifest",
    "AutomationManifestConditions",
    "AutomationManifestConditionsOperatorsItem",
    "AutomationManifestReferencesItem",
    "AutomationManifestPlaceholdersItem",
    "AutomationManifestLimits",
    "AutomationManifestAction",
    "AutomationManifestActionInputsItem",
    "AutomationManifestEvent",
    "AutomationManifestEventFieldsItem",
    "AutomationManifestOption",
    "AutomationRuleDocument",
    "AutomationRuleDocumentConditionsItem",
    "AutomationRuleDocumentActionsItem",
    "AutomationRuleProblem",
    "AutomationRuleSimulateRequest",
    "AutomationRuleSimulateRequestRule",
    "AutomationRuleSimulation",
    "AutomationRuleSimulationRecordsItem",
    "AutomationRuleSimulationActionsItem",
    "AutomationRuleSimulationBefore",
    "AutomationRuleTestRequest",
    "AutomationRuleTestRequestRule",
    "AutomationRuleTestRequestRuleConditionsItem",
    "AutomationRuleTestRequestRuleActionsItem",
    "AutomationRuleTestResult",
    "AutomationRuleTestResultSample",
    "AutomationRuleTestResultWhen",
    "AutomationRuleTestResultWhenValuesItem",
    "AutomationRuleTestResultCondition",
    "AutomationRuleTestResultConditionClausesItem",
    "AutomationRuleTestResultActionsItem",
    "AutomationRuleTestResultActionsItemInputsItem",
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
    "CRMCreateTaskLinkInput",
    "CRMCustomer",
    "CRMCustomerChannel",
    "CRMCustomerChannelInput",
    "CRMCustomerDuplicate",
    "CRMCustomerDuplicateGroup",
    "CRMCustomerDuplicateRefusal",
    "CRMCustomerInput",
    "CRMCustomerPatch",
    "CRMDeal",
    "CRMDealBoard",
    "CRMDealBoardStage",
    "CRMDealCard",
    "CRMDealContact",
    "CRMDealInput",
    "CRMDealItem",
    "CRMDealPatch",
    "CRMDealStageHistory",
    "CRMEngagement",
    "CRMEngagementInput",
    "CRMEngagementKind",
    "CRMEngagementKindItem",
    "CRMEngagementPatch",
    "CRMEngagementRepeat",
    "CRMEngagementTaskInput",
    "CRMExternalLink",
    "CRMImportFileInfo",
    "CRMImportSheetInfo",
    "CRMInboxAssignInput",
    "CRMInboxAttachment",
    "CRMInboxConnection",
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
    "CRMInboxScanStatus",
    "CRMInboxSendInput",
    "CRMInboxTemplate",
    "CRMInboxTemplateInput",
    "CRMLabelKey",
    "CRMLead",
    "CRMLeadBoard",
    "CRMLeadBoardStage",
    "CRMLeadCard",
    "CRMLeadDecision",
    "CRMLeadDuplicate",
    "CRMLeadInput",
    "CRMLeadLockMode",
    "CRMLeadPatch",
    "CRMLeadStage",
    "CRMLeadStageInput",
    "CRMLeadStageMeaning",
    "CRMLeadStagePatch",
    "CRMLeadStatus",
    "CRMLeadSummary",
    "CRMLossReason",
    "CRMLossReasonInput",
    "CRMLossReasonMetric",
    "CRMManagerWorkload",
    "CRMMergeCustomersInput",
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
    "CRMSettings",
    "CRMSettingsPatch",
    "CRMSourceMetric",
    "CRMStage",
    "CRMStageCategory",
    "CRMStageInput",
    "CRMStageMetric",
    "CRMStageOverview",
    "CRMStagePatch",
    "CRMStageShowOnBoard",
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
    "CalendarCabinet",
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
    "CalendarParticipant",
    "CalendarParticipantInput",
    "CalendarSettingsEnvelope",
    "CalendarSlot",
    "CalendarSlotPage",
    "CalendarSyncResult",
    "ChatAttachment",
    "ChatAttachmentDownloadSession",
    "ChatAttachmentPage",
    "ChatConversation",
    "ChatConversationCapabilities",
    "ChatConversationPage",
    "ChatCreateGroup",
    "ChatCreateGroupResult",
    "ChatEnsureDirect",
    "ChatEnsureDirectResult",
    "ChatEntityConversation",
    "ChatForwardedAttachment",
    "ChatMember",
    "ChatMemberPage",
    "ChatMentionCandidate",
    "ChatMentionCandidatePage",
    "ChatMentionReadResult",
    "ChatMessage",
    "ChatMessageMention",
    "ChatMessagePage",
    "ChatNotificationModeInput",
    "ChatNotificationModeResult",
    "ChatPeoplePage",
    "ChatPerson",
    "ChatPresencePage",
    "ChatPresencePageItemsItem",
    "ChatReceiptInput",
    "ChatReceiptState",
    "ChatSendMessage",
    "ChatSendMessageResult",
    "ChatSendVideoMeeting",
    "ChatUnreadMention",
    "ChatUnreadMentionPage",
    "ChatUploadInstructions",
    "ChatUploadSession",
    "ChatUploadSessionCreate",
    "Comment",
    "CommentCreate",
    "CommentList",
    "CommentOrigin",
    "CoreAccountingDimension",
    "CoreAccountingDimensionPage",
    "CoreAccountingDimensionPageReadiness",
    "CoreAccountingDimensionPatch",
    "CoreAccountingDimensionVersion",
    "CoreAccountingDimensionVersionInput",
    "CoreAccountingPolicy",
    "CoreAccountingSettings",
    "CoreAccountingSettingsInput",
    "CoreBalanceShortage",
    "CoreBusiness",
    "CoreBusinessAccountingMethodInput",
    "CoreBusinessInput",
    "CoreBusinessOwner",
    "CoreBusinessOwnerInput",
    "CoreBusinessPolicy",
    "CoreChange",
    "CoreChangeFeedPage",
    "CoreChangeOp",
    "CoreCompanyPolicy",
    "CoreConflictingRegistrar",
    "CoreContact",
    "CoreContactPostalAddress",
    "CoreContactAddress",
    "CoreContactCreate",
    "CoreContactCreatePostalAddress",
    "CoreContactEntityType",
    "CoreContactKind",
    "CoreContactPage",
    "CoreContactPatch",
    "CoreContactPatchPostalAddress",
    "CoreCurrencyRate",
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
    "CoreDownloadLink",
    "CoreEmployee",
    "CoreEmployeeCreateVariant1",
    "CoreEmployeeCreateVariant2",
    "CoreEmployeeCreateVariant3",
    "CoreEmployeeCreateVariant4",
    "CoreEmployeeCreate",
    "CoreEmployeePage",
    "CoreGLAccount",
    "CoreGLAccountCreate",
    "CoreGLAccountPage",
    "CoreGLAccountType",
    "CoreGLMapping",
    "CoreGLMappingCreate",
    "CoreGLMappingPage",
    "CoreImportResult",
    "CoreItem",
    "CoreItemInput",
    "CoreItemMove",
    "CoreItemPage",
    "CoreLetterhead",
    "CoreLetterheadImages",
    "CoreNumberReset",
    "CoreNumberSource",
    "CoreOrder",
    "CoreOrderAllowedAction",
    "CoreOrderBuyer",
    "CoreOrderCabinetStatusInput",
    "CoreOrderCloseInput",
    "CoreOrderCounterparty",
    "CoreOrderEvent",
    "CoreOrderFunnel",
    "CoreOrderFunnelChoice",
    "CoreOrderFunnelInput",
    "CoreOrderFunnelList",
    "CoreOrderFunnelStage",
    "CoreOrderFunnelStep",
    "CoreOrderFunnelStepDue",
    "CoreOrderFunnelTemplate",
    "CoreOrderFunnelTemplateList",
    "CoreOrderFunnelVersion",
    "CoreOrderFunnelVersionList",
    "CoreOrderFunnelView",
    "CoreOrderHistory",
    "CoreOrderHistoryDocument",
    "CoreOrderImportEntry",
    "CoreOrderImportInput",
    "CoreOrderImportList",
    "CoreOrderInput",
    "CoreOrderLine",
    "CoreOrderLineInput",
    "CoreOrderLineKind",
    "CoreOrderNowAct",
    "CoreOrderNowExecution",
    "CoreOrderNowInput",
    "CoreOrderNowResult",
    "CoreOrderObligation",
    "CoreOrderPage",
    "CoreOrderPaymentTerm",
    "CoreOrderProgress",
    "CoreOrderResponsible",
    "CoreOrderResponsiblesInput",
    "CoreOrderRevenueItemRule",
    "CoreOrderRevision",
    "CoreOrderSide",
    "CoreOrderSourceKind",
    "CoreOrderStage",
    "CoreOrderState",
    "CoreOrderStatus",
    "CoreOrderStatusList",
    "CoreOrderStepDueInput",
    "CoreOrderStepState",
    "CoreOrderTemplate",
    "CoreOrderTemplateActions",
    "CoreOrderTemplateInput",
    "CoreOrderTemplateList",
    "CoreOrderTemplateRun",
    "CoreOrderTemplateSchedule",
    "CoreOrderTemplateStateInput",
    "CoreOrderTotals",
    "CoreOrderVATWarning",
    "CoreOwnershipVersion",
    "CoreOwnershipVersionInput",
    "CorePhotoResult",
    "CorePolicyAccountableDaysVersion",
    "CorePolicyPayrollOfficialInput",
    "CorePolicyPayrollOfficialVersion",
    "CorePolicyPeriod",
    "CorePolicyTaxModeVersion",
    "CorePolicyTaxRegimeInput",
    "CorePolicyTaxRegimeVersion",
    "CorePolicyVATPendingVersion",
    "CorePolicyVATPresentationVersion",
    "CorePolicyVATRatesVersion",
    "CoreProduct",
    "CoreProductAxis",
    "CoreProductAxisValue",
    "CoreProductCreate",
    "CoreProductCustomInput",
    "CoreProductExport",
    "CoreProductExportRequest",
    "CoreProductFieldDefinition",
    "CoreProductFieldSchema",
    "CoreProductFile",
    "CoreProductFilePage",
    "CoreProductFilePatch",
    "CoreProductFileUploadRequest",
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
    "CoreRegisterResource",
    "CoreRegisterTurnoverPage",
    "CoreRegisterTurnoverRow",
    "CoreSellerBank",
    "CoreSellerCompany",
    "CoreSellerCompanyList",
    "CoreTrialBalance",
    "CoreTrialBalanceUnassignedCompany",
    "CoreTrialBalanceRow",
    "CoreTrialBalanceTotals",
    "CoreUploadFinishResult",
    "CredentialRequestGap",
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
    "DashboardMetricDefinition",
    "DashboardMetricSnapshot",
    "DashboardMetricSnapshotPointsItem",
    "DashboardMetricSnapshotRowsItem",
    "DashboardMetricSnapshotTilesItem",
    "DashboardMetricSnapshotBarsItem",
    "DashboardMetricSnapshotColumnsItem",
    "DashboardMetricSnapshotTableItem",
    "DashboardMetricSnapshotTableItemCellsItem",
    "DeveloperAPICall",
    "DeveloperAPICallPage",
    "DeveloperAccepted",
    "DeveloperAccount",
    "DeveloperAccountStatus",
    "DeveloperAppBlockList",
    "DeveloperAppInput",
    "DeveloperAppKey",
    "DeveloperAppKeyInput",
    "DeveloperAppKeyPage",
    "DeveloperAppKeyRevocationInput",
    "DeveloperAppKeyRotationInput",
    "DeveloperAppPage",
    "DeveloperAppResult",
    "DeveloperAppVersionInput",
    "DeveloperAppVersionPage",
    "DeveloperAppVersionResult",
    "DeveloperApplication",
    "DeveloperApplicationInput",
    "DeveloperApplicationResult",
    "DeveloperApplicationStatus",
    "DeveloperDelivery",
    "DeveloperDeliveryPage",
    "DeveloperFunctionArtifactRow",
    "DeveloperFunctionArtifacts",
    "DeveloperFunctionArtifactsResult",
    "DeveloperFunctionUpload",
    "DeveloperFunctionUploadResult",
    "DeveloperGateCheck",
    "DeveloperInstallation",
    "DeveloperInstallationPage",
    "DeveloperIssuedAppKey",
    "DeveloperManifestBlock",
    "DeveloperProfile",
    "DeveloperPublicationReport",
    "DeveloperPublicationResult",
    "DeveloperRegistrationInput",
    "DeveloperSession",
    "DeveloperSessionInput",
    "DeveloperSignInLinkInput",
    "DiscussionComment",
    "DiscussionCommentCreate",
    "DiscussionCommentPage",
    "DiscussionCommentUpdate",
    "DiscussionOwnerType",
    "DocflowAcceptedDocument",
    "DocflowAdvanceInvoiceInput",
    "DocflowAppSalesOrderCounterparty",
    "DocflowAppSalesOrderInput",
    "DocflowAppSalesOrderItem",
    "DocflowAppSalesOrderPayment",
    "DocflowApproval",
    "DocflowApprovalActionCheck",
    "DocflowApprovalBlockReason",
    "DocflowApprovalBlockers",
    "DocflowApprovalCancelInput",
    "DocflowApprovalChainPreview",
    "DocflowApprovalChainStage",
    "DocflowApprovalDecisionInput",
    "DocflowApprovalDepartment",
    "DocflowApprovalDirectories",
    "DocflowApprovalEvent",
    "DocflowApprovalInboxItem",
    "DocflowApprovalInboxPage",
    "DocflowApprovalPerson",
    "DocflowApprovalPolicy",
    "DocflowApprovalResubmitInput",
    "DocflowApprovalReview",
    "DocflowApprovalRoleRef",
    "DocflowApprovalRoute",
    "DocflowApprovalRouteList",
    "DocflowApprovalRouteStage",
    "DocflowApprovalStage",
    "DocflowApprovalSubject",
    "DocflowApprovalSubjectFacts",
    "DocflowApprovalSubjectState",
    "DocflowAttachment",
    "DocflowCancellation",
    "DocflowCertificate",
    "DocflowConnection",
    "DocflowConnectionList",
    "DocflowCounterparty",
    "DocflowEvent",
    "DocflowFlowAccountingLink",
    "DocflowFlowChangeInput",
    "DocflowFlowCommercial",
    "DocflowFlowCommercialLine",
    "DocflowFlowCommercialTaxLine",
    "DocflowFlowContent",
    "DocflowFlowContractTerms",
    "DocflowFlowCreateInput",
    "DocflowFlowDocument",
    "DocflowFlowEDOAttachment",
    "DocflowFlowEDOLink",
    "DocflowFlowEDOState",
    "DocflowFlowFile",
    "DocflowFlowKind",
    "DocflowFlowOriginal",
    "DocflowFlowOriginalScan",
    "DocflowFlowPage",
    "DocflowFlowPageStateCounts",
    "DocflowFlowPaymentRule",
    "DocflowFlowPaymentRuleOrders",
    "DocflowFlowRecognized",
    "DocflowFlowRelation",
    "DocflowFlowRelationInput",
    "DocflowFlowResponsible",
    "DocflowFlowScheduleStage",
    "DocflowFlowUploadRequest",
    "DocflowFlowUploadResult",
    "DocflowIntakeCounterparty",
    "DocflowIntakeCounterpartyOption",
    "DocflowIntakeLine",
    "DocflowIntakeParty",
    "DocflowIntakePreview",
    "DocflowIntakeProductOption",
    "DocflowIntakePurchase",
    "DocflowIntakeSource",
    "DocflowIntakeTotals",
    "DocflowIssue",
    "DocflowMessage",
    "DocflowMessageFlowLink",
    "DocflowMessageList",
    "DocflowMessagePayment",
    "DocflowMessagePrintForm",
    "DocflowOrderActInput",
    "DocflowOrderDocumentSet",
    "DocflowOrderImport",
    "DocflowOrderImportPage",
    "DocflowOrderInvoiceInput",
    "DocflowOrderSetMember",
    "DocflowOrderSetOrder",
    "DocflowOrderUPDInput",
    "DocflowPaymentRequestRoutePreview",
    "DocflowRecognized",
    "DocflowSalesOrder",
    "DocflowSalesOrderBuyer",
    "DocflowSalesOrderItem",
    "DocflowSalesOrderStatusInput",
    "DocflowSignature",
    "DocflowStage",
    "DocflowStageAction",
    "DocflowStateCategory",
    "DocflowTemplatePastAct",
    "DocflowTemplatePastActs",
    "DocumentCreate",
    "DocumentOwnerType",
    "DocumentPage",
    "DocumentUpdate",
    "DurationMetric",
    "EmptyObject",
    "Error",
    "FileUpload",
    "FilesAccessPolicy",
    "FilesBreadcrumb",
    "FilesEntry",
    "FilesFile",
    "FilesFolder",
    "FilesFolderInput",
    "FilesGrant",
    "FilesListing",
    "FilesSearchHit",
    "FilesShare",
    "FilesShareInput",
    "FilesUpload",
    "FilesUploadInput",
    "FilesUploadedPart",
    "FilesVersion",
    "FinanceAccount",
    "FinanceAccountCreate",
    "FinanceAccountPage",
    "FinanceAccountPatch",
    "FinanceAccountableBalance",
    "FinanceAccountableBalances",
    "FinanceAcquirer",
    "FinanceAcquirerInput",
    "FinanceAcquirerList",
    "FinanceAcquiringCaptureInput",
    "FinanceAcquiringCaptureResult",
    "FinanceAcquiringInTransit",
    "FinanceAcquiringOverview",
    "FinanceAcquiringPayout",
    "FinanceAcquiringRegistry",
    "FinanceAcquiringRegistryImport",
    "FinanceAcquiringRegistryInput",
    "FinanceAcquiringRegistryRow",
    "FinanceAllocationRule",
    "FinanceAllocationRuleInput",
    "FinanceAllocationRuleRun",
    "FinanceAllocationRuleRunInput",
    "FinanceBalanceItem",
    "FinanceBalanceReport",
    "FinanceBalanceSection",
    "FinanceBankLookup",
    "FinanceBankSuggestions",
    "FinanceCashflowEntry",
    "FinanceCashflowEntryCategorize",
    "FinanceCashflowEntryKind",
    "FinanceCashflowEntryPage",
    "FinanceCashflowItem",
    "FinanceCashflowReport",
    "FinanceCashflowReportUnassignedCompany",
    "FinanceCashflowSection",
    "FinanceCommercialPosition",
    "FinanceConnector",
    "FinanceConnectorAccount",
    "FinanceConnectorAccountPage",
    "FinanceConnectorAccountPatch",
    "FinanceConnectorAuthKind",
    "FinanceConnectorMTLSStatus",
    "FinanceConnectorPage",
    "FinanceConnectorProvider",
    "FinanceConnectorProviderKey",
    "FinanceConnectorProviderPage",
    "FinanceConnectorStatus",
    "FinanceConnectorSyncResult",
    "FinanceConnectorSyncRun",
    "FinanceConnectorSyncRunPage",
    "FinanceCounterpartyTerms",
    "FinanceCounterpartyTermsCreate",
    "FinanceDirection",
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
    "FinanceExpenseReportCreate",
    "FinanceExpenseReportCreatePayload",
    "FinanceExpenseReportRow",
    "FinanceItemMergeRequest",
    "FinanceItemMergeResult",
    "FinanceOpeningDebtRequest",
    "FinanceOperation",
    "FinanceOperationAccrualAllocation",
    "FinanceOperationAccrualCreate",
    "FinanceOperationAccrualResult",
    "FinanceOperationAction",
    "FinanceOperationCreate",
    "FinanceOperationFact",
    "FinanceOperationReferenceInput",
    "FinanceOperationSource",
    "FinanceOperationStage",
    "FinanceOperationStageInput",
    "FinanceOperationVersion",
    "FinanceOrderActInput",
    "FinancePaymentCalendar",
    "FinancePaymentCalendarRnpMetrics",
    "FinancePaymentCalendarUndated",
    "FinancePaymentCalendarCell",
    "FinancePaymentCalendarCompany",
    "FinancePaymentCalendarDay",
    "FinancePaymentCalendarPeriod",
    "FinancePaymentCalendarRow",
    "FinancePaymentCalendarSource",
    "FinancePaymentFact",
    "FinancePaymentFactPage",
    "FinancePaymentPlan",
    "FinancePaymentPlanInput",
    "FinancePaymentSourceKind",
    "FinancePayrollAutomationSettings",
    "FinancePayrollRun",
    "FinancePayrollRunList",
    "FinancePnlCoverage",
    "FinancePnlCoverageItem",
    "FinancePnlLine",
    "FinancePnlReport",
    "FinancePnlReportUnassignedCompany",
    "FinancePnlReportLayout",
    "FinancePnlReportRow",
    "FinanceProject",
    "FinanceProjectBudget",
    "FinanceProjectBudgetInput",
    "FinanceProjectBudgetLine",
    "FinanceProjectLine",
    "FinanceProjectReport",
    "FinanceReconciliation",
    "FinanceReconciliationSummary",
    "FinanceRegisterAccountCheck",
    "FinanceRegisterReconciliation",
    "FinanceRegisterReconciliationInputVatUnexplainedItem",
    "FinanceRegisterReconciliationStockItem",
    "FinanceRegisterReconciliationStockTransferPendingItem",
    "FinanceRegisterRepairFailure",
    "FinanceRegisterRepairRequest",
    "FinanceRegisterRepairResult",
    "FinanceRegistersResyncResult",
    "FinanceReportColumn",
    "FinanceReportCompany",
    "FinanceRequisitesBank",
    "FinanceResponsiblePatch",
    "FinanceSaleLineInput",
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
    "FinanceTaxKind",
    "FinanceTaxKindAmount",
    "FinanceTaxKindPage",
    "FinanceTaxMonth",
    "FinanceTaxMonthInput",
    "FinanceTaxMonthLine",
    "FinanceTaxMonthPage",
    "FinanceTaxMonthPayload",
    "FinanceTaxMonthPayment",
    "FinanceTaxMonthUpdateInput",
    "FinanceTaxPayment",
    "FinanceTaxPaymentPage",
    "FinanceTaxRecipient",
    "FinanceTaxRecipientFromPaymentInput",
    "FinanceTaxSettings",
    "FinanceTaxSettingsInput",
    "FinanceTaxSummary",
    "FinanceTransaction",
    "FinanceTransactionCategorize",
    "FinanceTransactionCreate",
    "FinanceTransactionPage",
    "FinanceTransactionRestoreResult",
    "FinanceTransactionRestoreResultFailedItem",
    "FinanceTransactionTotals",
    "FinanceZReportInput",
    "FinanceZReportLine",
    "FinanceZReportResult",
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
    "KnowledgeAnswerInput",
    "KnowledgeAnswerTurn",
    "KnowledgeAsset",
    "KnowledgeAssetLink",
    "KnowledgeCitation",
    "KnowledgeDocument",
    "KnowledgeMoveInput",
    "KnowledgeNode",
    "KnowledgeNodeAccessInput",
    "KnowledgeNodeAccessPolicy",
    "KnowledgeNodeInput",
    "KnowledgeReviewInput",
    "KnowledgeRevision",
    "KnowledgeRevisionInput",
    "KnowledgeSearchResult",
    "KnowledgeSpace",
    "KnowledgeSpaceAccessInput",
    "KnowledgeSpaceAccessPolicy",
    "KnowledgeSpaceInput",
    "KnowledgeTag",
    "KnowledgeVersionInput",
    "Link",
    "LinkCreate",
    "LinkList",
    "MailAccount",
    "MailAccountStatus",
    "MailAttachment",
    "MailAttachmentLink",
    "MailComposeInput",
    "MailEncryption",
    "MailFolder",
    "MailFolderInput",
    "MailFolderRole",
    "MailMessage",
    "MailMessageAddress",
    "MailMessagePage",
    "MailOutbound",
    "MailOutboundPage",
    "MailOutboundUpload",
    "MailPerson",
    "MailProvider",
    "MailRule",
    "MailRuleAction",
    "MailRuleCondition",
    "MailRuleInput",
    "MailRuleOutcome",
    "MailScanStatus",
    "MailSpamVerdict",
    "MailSyncReport",
    "MailSyncStatus",
    "MailThread",
    "ManagedChecklistItem",
    "ManagedChecklistPatch",
    "MarketplaceBuyoutCohort",
    "MarketplaceComponentDataThrough",
    "MarketplaceComponentFreshness",
    "MarketplaceOzonCost",
    "MarketplaceOzonCostRequest",
    "MarketplaceOzonDecomposition",
    "MarketplaceOzonDecompositionArticle",
    "MarketplaceOzonDecompositionCell",
    "MarketplaceOzonDecompositionMonth",
    "MarketplaceOzonDecompositionOtherBlock",
    "MarketplaceOzonDecompositionOtherItem",
    "MarketplaceOzonDecompositionPeriod",
    "MarketplaceOzonOrdersDailyRow",
    "MarketplaceOzonOrdersKpi",
    "MarketplaceOzonOrdersOverview",
    "MarketplaceOzonOrdersProductRow",
    "MarketplaceOzonPnl",
    "MarketplaceOzonPnlPeriod",
    "MarketplaceOzonPnlRange",
    "MarketplaceOzonPnlRow",
    "MarketplaceOzonProduct",
    "MarketplaceOzonProductPage",
    "MarketplaceOzonStockProduct",
    "MarketplaceOzonStockWarehouse",
    "MarketplaceOzonStocksPage",
    "MarketplaceOzonSyncJob",
    "MarketplaceOzonSyncJobList",
    "MarketplaceStore",
    "MarketplaceStoreInput",
    "MarketplaceStorePage",
    "MarketplaceWbCardAdDay",
    "MarketplaceWbCardBoard",
    "MarketplaceWbCardFunnelDay",
    "MarketplaceWbCardMeta",
    "MarketplaceWbCardOption",
    "MarketplaceWbCardOptions",
    "MarketplaceWbCost",
    "MarketplaceWbCostRequest",
    "MarketplaceWbDecompOtherItem",
    "MarketplaceWbDecomposition",
    "MarketplaceWbDecompositionArticle",
    "MarketplaceWbDecompositionMonth",
    "MarketplaceWbDecompositionOther",
    "MarketplaceWbDecompositionPeriod",
    "MarketplaceWbMetricCell",
    "MarketplaceWbOrdersDay",
    "MarketplaceWbOrdersKpi",
    "MarketplaceWbOrdersOverview",
    "MarketplaceWbOrdersOverviewKpi",
    "MarketplaceWbOrdersProduct",
    "MarketplaceWbPnl",
    "MarketplaceWbPnlPeriod",
    "MarketplaceWbPnlRow",
    "MarketplaceWbProduct",
    "MarketplaceWbProductPage",
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
    "Milestone",
    "MilestoneCreate",
    "MilestonePage",
    "MilestoneUpdate",
    "OK",
    "PlatformApp",
    "PlatformAppInstallationStatus",
    "PlatformAppPublisher",
    "PlatformAppPublisherStatus",
    "PlatformAppStatus",
    "PlatformAppVersion",
    "PlatformAppVersionStatus",
    "Project",
    "ProjectCreate",
    "ProjectPage",
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
    "Section",
    "SectionCreate",
    "SectionMember",
    "SectionMemberAssignment",
    "SectionMemberPreview",
    "SectionPage",
    "SectionRole",
    "SectionUpdate",
    "SettingsCompany",
    "SettingsCompanyAddress",
    "SettingsCompanyHead",
    "SettingsCompanyPage",
    "SettingsCompanyPerson",
    "SettingsMember",
    "SettingsMemberAccessInput",
    "SettingsMemberBusinessScope",
    "SettingsMemberPage",
    "SettingsRole",
    "SettingsRolePage",
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
    "StockAccountTransferCreate",
    "StockAccountTransferLine",
    "StockAccountTransferProposal",
    "StockAssemblySpec",
    "StockAssemblySpecArchivedVersion",
    "StockAssemblySpecCreate",
    "StockAssemblySpecCreateLinesItem",
    "StockAssemblySpecLine",
    "StockAssemblySpecPage",
    "StockAssemblySpecRef",
    "StockAssemblySpecStatus",
    "StockAssemblySpecUpdate",
    "StockAssemblySpecUpdateLinesItem",
    "StockBatch",
    "StockBatchPage",
    "StockClaimWriteoffCreate",
    "StockCompanyPolicy",
    "StockCompanyPolicyPage",
    "StockCompanyPolicyPatch",
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
    "StockDownloadLink",
    "StockExport",
    "StockExportKind",
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
    "StockImportUploadSessionRequest",
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
    "StockOpeningBalanceCreate",
    "StockOrderShipInput",
    "StockOrderShipInputLinesItem",
    "StockOrderShipment",
    "StockOrderShipmentLine",
    "StockOrderShipping",
    "StockOrderShippingReservationsItem",
    "StockOrderShippingShipWarehouse",
    "StockOrderShippingLine",
    "StockOrderShippingPage",
    "StockProductUOM",
    "StockProductUOMInput",
    "StockProductUOMPage",
    "StockProductUOMUsage",
    "StockPurchaseOrderCreate",
    "StockPurchaseOrderLineInput",
    "StockReceiptClaimBalance",
    "StockReceiptCorrectionCreate",
    "StockReceiptCorrectionCreateSupplierDocument",
    "StockReorderRule",
    "StockReorderRuleInput",
    "StockReorderRulePage",
    "StockReorderRulePatch",
    "StockReportExportRequest",
    "StockReportOverduePage",
    "StockReportOverdueReservation",
    "StockReportPage",
    "StockReportPurchasingPage",
    "StockReportPurchasingRow",
    "StockReportPurchasingSource",
    "StockReportReservationLine",
    "StockReportReservationLineSpec",
    "StockReportReservationPage",
    "StockReportReservationSummary",
    "StockReportRow",
    "StockReportTotals",
    "StockReportWarehouseTotal",
    "StockScanResult",
    "StockSettings",
    "StockSettingsPatch",
    "StockSupplier",
    "StockSupplierPage",
    "StockUploadFinishResult",
    "StockValuationPreviewRequest",
    "StockValuationRebuildRequest",
    "StockValuationResult",
    "StockValuationRun",
    "StockValuationStep",
    "StockWarehouse",
    "StockWarehouseInput",
    "StockWarehousePage",
    "StockWarehousePatch",
    "StockWarehouseZoneInput",
    "StockZoneAllocation",
    "StockZoneAllocationInput",
    "StockZoneAllocationLine",
    "StockZoneAllocationResult",
    "StockZoneStockRow",
    "Subtask",
    "SupplierDocument",
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
    "TaskUpdate",
    "TaskView",
    "TaskViewCreate",
    "TaskViewPage",
    "TaskWatcher",
    "TeamFlowTotals",
    "TeamMemberMetrics",
    "TeamMetrics",
    "TeamMetricsUnassigned",
    "TeamMetricsBucket",
    "TemplateRecurrence",
    "TemplateRunPage",
    "TemplateRunResult",
    "TransferDownloadLink",
    "TransferInstructions",
    "TransferSession",
    "TransferUploadRequest",
    "UUID",
    "WorkflowStatusUpdate",
    "AppDocflowRecordSalePaymentRequest",
    "AssistantListDigestsResponse",
    "AssistantReplaceDigestRequest",
    "AutomationRulesResponse",
    "AutomationRuleSimulateResponse",
    "AutomationRuleTestResponse",
    "BankRepostTransactionsRequest",
    "BankRepostTransactionRequest",
    "CoreListBusinessesResponse",
    "CoreSetBusinessActiveRequest",
    "CoreListBusinessOwnershipResponse",
    "DashboardListMetricsResponse",
    "DocflowFlowContactStatsResponse",
    "DocflowFlowContactStatsResponseItemsItem",
    "DocflowFlowDocumentRevisionsResponse",
    "DocflowFlowDocumentRevisionsResponseItemsItem",
    "FilesContentLinkResponse",
    "FilesListVersionsResponse",
    "FilesListRootsResponse",
    "FilesSearchResponse",
    "FilesCreateShortcutRequest",
    "FilesVersionContentLinkResponse",
    "FinanceListDividendAccessUsersResponse",
    "FinanceListDividendAccessUsersResponseResultsItem",
    "FinanceListDividendAutomationRunsResponse",
    "FinanceListDividendDecisionsResponse",
    "FinanceListDividendOwnersResponse",
    "FinanceListDividendOwnersResponseResultsItem",
    "FinanceListDividendPoliciesResponse",
    "FinanceGetProjectBudgetHistoryResponse",
    "FinanceListAllocationRulesResponse",
    "FinanceRepostTransactionsRequest",
    "FinanceMarkTransactionDeletedRequest",
    "FinanceRepostTransactionRequest",
    "MailListAccountsResponse",
    "MailListFoldersResponse",
    "MailComposeMessageResponse",
    "MailListRulesResponse",
    "MailApplyRulesRequest",
    "MailApplyRulesResponse",
    "MailAttachStoredFileRequest",
    "MailReadBatchRequest",
    "MailReadBatchResponse",
    "MailListMessageAttachmentsResponse",
    "MailFlagMessageRequest",
    "MailMoveMessageRequest",
    "MailListPeopleResponse",
    "MailListProvidersResponse",
    "MailListVIPSendersResponse",
    "MailListVIPSendersResponseItemsItem",
    "MailSetVIPSenderRequest",
    "MailCountVIPUnreadResponse",
    "StockListDocumentAuthorsResponse",
    "StockListDocumentAuthorsResponseResultsItem",
]

AccountingBasis = Literal['cash', 'accrual', 'mixed']

class _ActivityRequired(TypedDict):
    id: "UUID"
    #: Готовый русский текст записи.
    action: str
    actor_name: Optional[str]
    created_at: str

class Activity(_ActivityRequired, total=False):
    #: Вид записи об этапе задачи — `status_set`, `status_changed` или `status_deleted` (этап удалён, задача перенесена в `detail.to` или осталась без этапа). У остальных записей поле отсутствует; клиент, не знающий вида, показывает `action`.
    kind: str
    #: Названия этапов записи об этапе; у удалённого этапа — сохранённое название.
    detail: "ActivityDetail"

ActivityDetail = TypedDict("ActivityDetail", {"from": Optional[str], "to": Optional[str]}, total=False)

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

class _AppReferenceItemRequired(TypedDict):
    id: "UUID"
    #: Ссылка на запись в смысле SDK: её присылает и по ней адресуется приложение
    code: str
    label: str
    sort_order: int
    #: Погашенная запись остаётся разрешимой по ссылке и не предлагается в новых
    is_active: bool

class AppReferenceItem(_AppReferenceItemRequired, total=False):
    parent_id: "UUID"
    #: Дополнительные поля записи в том виде, в каком их прислало приложение
    attrs: Dict[str, Any]

class AppReferenceItemPage(TypedDict):
    count: int
    results: List["AppReferenceItem"]

class AppReferenceUpsertInput(TypedDict):
    items: List["AppReferenceUpsertItem"]

class _AppReferenceUpsertItemRequired(TypedDict):
    #: Ключ идемпотентности: тот же код обновляет ту же запись
    code: str

class AppReferenceUpsertItem(_AppReferenceUpsertItemRequired, total=False):
    #: Подпись для человека кабинета. Пустая заменяется кодом: строка без подписи в отчёте нечитаема
    label: str
    parent_id: "UUID"
    attrs: Dict[str, Any]
    sort_order: int
    #: Пропущенное поле значит «запись жива»: молча гасить присланное было бы ловушкой
    is_active: bool

class AppReferenceUpsertResult(TypedDict):
    #: Сколько записей заведено впервые
    created: int
    #: Сколько существующих кодов обновлено
    updated: int

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

class _AppRuntimeSlotActorRequired(TypedDict):
    #: Псевдоним, свой у каждой пары «установка + человек». Устойчив внутри установки, поэтому панель помнит выбор сотрудника; в другой установке того же приложения у того же человека он ДРУГОЙ; умирает вместе с установкой
    subject: "UUID"
    #: Язык интерфейса человека: слот обязан показывать текст на русском и английском, и без языка он показал бы не тот
    locale: Literal['ru', 'en']
    #: Тема кабинета. Слот, объявивший themeAware, без неё исполнить объявленное не может
    theme: Literal['light', 'dark']

class AppRuntimeSlotActor(_AppRuntimeSlotActorRequired, total=False):
    """Человек, открывший панель, в том объёме, в каком приложению позволено его знать. Имени, почты, ролей и числового идентификатора здесь нет и не появится: имя и почта — это штат клиента, роли — его оргструктура, а числовой идентификатор общий на всю платформу и связал бы два кабинета между собой. Карточка сотрудника (employee_id) — единственное поле, называющее человека настоящей записью кабинета, и приезжает она не всем: только слоту, который назвал actor_employee_id объявлением, и только в той версии, чей лист согласия кабинет читал. Общего на всю платформу в ней ничего нет — она живёт в базе кабинета, и тот же человек у двух клиентов это две разные строки, поэтому довод про связывание кабинетов к ней не относится."""

    #: Карточка сотрудника кабинета (core_employee.id) — та же, на которой висит его работа. Приезжает только слоту, попросившему actor_employee_id. Пусто означает «не просили либо человек не сотрудник»: различать эти случаи приложению незачем, оба означают, что сотрудника нет. Нужна тому, кто ведёт работу людей: без неё приложение заводит второй список сотрудников у себя, а псевдоним для этого не годится — он умирает вместе с установкой, а часы и назначения обязаны её пережить
    employee_id: "UUID"

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

class _AssistantDigestRequired(TypedDict):
    name: str
    metric_ids: List[str]
    period: Literal['this_month', 'previous_month', 'last_30_days']
    schedule_hour: int
    schedule_minute: int
    timezone: str
    weekdays_only: bool
    locale: Literal['ru-RU', 'en-US']
    enabled: bool
    id: "UUID"
    version: int
    next_run_at: str

class AssistantDigest(_AssistantDigestRequired, total=False):
    company: "UUID"
    project: "UUID"
    last_run_at: str
    last_error: Literal['', 'access_removed', 'source_unavailable']
    last_conversation_id: "UUID"

class _AssistantDigestInputRequired(TypedDict):
    name: str
    metric_ids: List[str]
    period: Literal['this_month', 'previous_month', 'last_30_days']
    schedule_hour: int
    schedule_minute: int
    timezone: str
    weekdays_only: bool
    locale: Literal['ru-RU', 'en-US']
    enabled: bool

class AssistantDigestInput(_AssistantDigestInputRequired, total=False):
    company: "UUID"
    project: "UUID"

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
    #: Папка файлов проекта, куда ляжет файл
    folder_id: str
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
    #: Папка файлов проекта, куда сразу ляжет файл; только при owner_type=project
    folder_id: str
    mime_type: str
    sha256: str

class _AutomationManifestRequired(TypedDict):
    format: Literal['akeda.automation.manifest']
    version: int
    #: Отпечаток содержимого sha256:…
    revision: str
    locale: Literal['ru', 'en']
    detail: Literal['full', 'brief']
    events: List["AutomationManifestEvent"]
    conditions: "AutomationManifestConditions"
    actions: List["AutomationManifestAction"]
    references: List["AutomationManifestReferencesItem"]
    placeholders: List["AutomationManifestPlaceholdersItem"]
    limits: "AutomationManifestLimits"

class AutomationManifest(_AutomationManifestRequired, total=False):
    """Документ akeda.automation.manifest версии 1 (AUTOMATION.md § 10.1)."""

    $schema: str

class AutomationManifestConditions(TypedDict):
    combinator: Literal['all']
    operators: List["AutomationManifestConditionsOperatorsItem"]
    max_clauses: int
    max_value_length: int

class AutomationManifestConditionsOperatorsItem(TypedDict):
    op: str
    label: str
    field_types: List[str]
    needs_value: bool
    case_insensitive: bool

class AutomationManifestReferencesItem(TypedDict):
    kind: str
    module: str
    label: str
    #: MCP-инструмент поиска значения по имени
    lookup_tool: str
    parameter_kind: bool
    status: Literal['live', 'unavailable']

class AutomationManifestPlaceholdersItem(TypedDict):
    syntax: str
    meaning: str
    status: str

class AutomationManifestLimits(TypedDict):
    max_actions: int
    max_conditions: int
    max_condition_length: int
    chain_depth: int
    runs_per_tenant_per_minute: int
    max_attempts: int

class _AutomationManifestActionRequired(TypedDict):
    command: str
    module: str
    label_key: str
    label: str
    description: str
    when_to_use: str
    status: Literal['live', 'declared', 'unavailable']
    permission: str
    reversible: bool
    danger: Literal['none', 'external', 'irreversible']
    idempotency: str
    target: Literal['new', 'event_entity']

class AutomationManifestAction(_AutomationManifestActionRequired, total=False):
    unavailable_reason: str
    event_entities: List[str]
    mcp_twin: str
    inputs: List["AutomationManifestActionInputsItem"]
    example_inputs: Dict[str, str]

class _AutomationManifestActionInputsItemRequired(TypedDict):
    key: str
    type: Literal['string', 'number', 'bool', 'reference', 'datetime', 'choice']
    required: bool
    label: str
    accepts_placeholders: bool

class AutomationManifestActionInputsItem(_AutomationManifestActionInputsItemRequired, total=False):
    options: List["AutomationManifestOption"]
    ref: str

class _AutomationManifestEventRequired(TypedDict):
    topic: str
    module: str
    entity: str
    fact: str
    label_key: str
    label: str
    description: str
    when_to_use: str
    status: Literal['live', 'unavailable']
    #: Правило сработает, только если исполнитель видит источник
    source_visibility: bool

class AutomationManifestEvent(_AutomationManifestEventRequired, total=False):
    unavailable_reason: str
    fields: List["AutomationManifestEventFieldsItem"]
    example_payload: Dict[str, Any]

class _AutomationManifestEventFieldsItemRequired(TypedDict):
    key: str
    type: Literal['string', 'number', 'bool', 'timestamp']
    label: str
    operators: List[str]

class AutomationManifestEventFieldsItem(_AutomationManifestEventFieldsItemRequired, total=False):
    options: List["AutomationManifestOption"]
    ref: str

class AutomationManifestOption(TypedDict):
    value: str
    label: str

class _AutomationRuleDocumentRequired(TypedDict):
    id: str
    name: str
    event_type: str
    #: Выражение вычислителя; у правила из конструктора собрано из conditions
    condition: str
    conditions: List["AutomationRuleDocumentConditionsItem"]
    actions: List["AutomationRuleDocumentActionsItem"]
    executor_user_id: int
    is_enabled: bool
    origin: Literal['manual', 'configuration']
    version: int

class AutomationRuleDocument(_AutomationRuleDocumentRequired, total=False):
    created_by: int
    created_at: str
    updated_at: str

class _AutomationRuleDocumentConditionsItemRequired(TypedDict):
    field: str
    op: str

class AutomationRuleDocumentConditionsItem(_AutomationRuleDocumentConditionsItemRequired, total=False):
    value: str
    value_to: str
    of: str
    group: int

class _AutomationRuleDocumentActionsItemRequired(TypedDict):
    command: str

class AutomationRuleDocumentActionsItem(_AutomationRuleDocumentActionsItemRequired, total=False):
    inputs: Dict[str, str]

class _AutomationRuleProblemRequired(TypedDict):
    #: Путь в документе правила: event_type, conditions[1].op, actions[0].inputs.title
    field: str
    code: str
    message: str

class AutomationRuleProblem(_AutomationRuleProblemRequired, total=False):
    hint: str
    params: Dict[str, str]
    allowed: List[str]

class _AutomationRuleSimulateRequestRequired(TypedDict):
    #: Документ правила в той же форме, что у проверки правила (event_type, conditions, actions); название и исполнитель не нужны.
    rule: "AutomationRuleSimulateRequestRule"

class AutomationRuleSimulateRequest(_AutomationRuleSimulateRequestRequired, total=False):
    #: Сохранённое правило: его версия на тех же фактах — «было»
    rule_id: str
    #: Период прогона в днях; по умолчанию 30
    days: int

class AutomationRuleSimulateRequestRule(TypedDict):
    """Документ правила в той же форме, что у проверки правила (event_type, conditions, actions); название и исполнитель не нужны."""

    event_type: str

class _AutomationRuleSimulationRequired(TypedDict):
    days: int
    since: str
    #: Фактов события за период, видимых вызывающему
    events: int
    #: Сколько раз правило сработало бы
    fired: int
    #: Учтены только последние 2000 фактов периода
    truncated: bool
    #: Больше всего срабатываний за один день
    max_per_day: int
    records: List["AutomationRuleSimulationRecordsItem"]
    actions: List["AutomationRuleSimulationActionsItem"]
    #: Всегда false: прогон ничего не исполняет
    executed: bool

class AutomationRuleSimulation(_AutomationRuleSimulationRequired, total=False):
    before: "AutomationRuleSimulationBefore"

class _AutomationRuleSimulationRecordsItemRequired(TypedDict):
    key: str
    entity_id: str
    occurred_at: str

class AutomationRuleSimulationRecordsItem(_AutomationRuleSimulationRecordsItemRequired, total=False):
    #: Номер, идентификатор или тема записи
    title: str

class _AutomationRuleSimulationActionsItemRequired(TypedDict):
    index: int
    command: str
    label: str
    permission: str
    allowed: bool
    connected: bool
    #: Сколько раз действие выполнилось бы; 0 — его заблокировали права или нет исполнителя
    count: int

class AutomationRuleSimulationActionsItem(_AutomationRuleSimulationActionsItemRequired, total=False):
    code: str
    message: str

class AutomationRuleSimulationBefore(TypedDict):
    enabled: bool
    version: int
    #: Сколько раз сработала бы сохранённая версия; выключенное правило — 0
    fired: int

class _AutomationRuleTestRequestRequired(TypedDict):
    #: Документ правила в той же форме, что у записи правила; название и исполнитель не нужны.
    rule: "AutomationRuleTestRequestRule"

class AutomationRuleTestRequest(_AutomationRuleTestRequestRequired, total=False):
    #: Ключ факта из выборки последних фактов события; пусто — последний факт
    sample_key: str
    #: Тело события для проверки «что если» вместо настоящего факта
    payload: Dict[str, str]

class _AutomationRuleTestRequestRuleRequired(TypedDict):
    event_type: str

class AutomationRuleTestRequestRule(_AutomationRuleTestRequestRuleRequired, total=False):
    """Документ правила в той же форме, что у записи правила; название и исполнитель не нужны."""

    name: str
    condition: str
    conditions: List["AutomationRuleTestRequestRuleConditionsItem"]
    actions: List["AutomationRuleTestRequestRuleActionsItem"]

class _AutomationRuleTestRequestRuleConditionsItemRequired(TypedDict):
    field: str
    #: equals, not_equals, contains, starts_with, ends_with, is_true, is_false; числа — gt, gte, lt, lte, between; даты — before, on_or_before, after, on_or_after, between
    op: str

class AutomationRuleTestRequestRuleConditionsItem(_AutomationRuleTestRequestRuleConditionsItemRequired, total=False):
    value: str
    #: Верхняя граница «между», включительно
    value_to: str
    #: Числовое поле-основа: value и value_to — проценты от него
    of: str
    #: Группа «или»: сравнения группы — «и», группы между собой — «или»
    group: int

class _AutomationRuleTestRequestRuleActionsItemRequired(TypedDict):
    command: str

class AutomationRuleTestRequestRuleActionsItem(_AutomationRuleTestRequestRuleActionsItemRequired, total=False):
    inputs: Dict[str, str]

class _AutomationRuleTestResultRequired(TypedDict):
    executor_user_id: int
    when: "AutomationRuleTestResultWhen"
    condition: "AutomationRuleTestResultCondition"
    matched: bool
    actions: List["AutomationRuleTestResultActionsItem"]
    #: Всегда false: проверка ничего не делает
    executed: bool

class AutomationRuleTestResult(_AutomationRuleTestResultRequired, total=False):
    sample: Optional["AutomationRuleTestResultSample"]
    problem: "AutomationRuleProblem"

class _AutomationRuleTestResultSampleRequired(TypedDict):
    key: str
    event_type: str
    entity: str
    entity_id: str
    occurred_at: str
    payload: Dict[str, str]
    source: Literal['outbox', 'direct', 'payload']

class AutomationRuleTestResultSample(_AutomationRuleTestResultSampleRequired, total=False):
    #: Номер, идентификатор или тема записи
    title: str

class _AutomationRuleTestResultWhenRequired(TypedDict):
    ok: bool
    event_label: str
    values: List["AutomationRuleTestResultWhenValuesItem"]

class AutomationRuleTestResultWhen(_AutomationRuleTestResultWhenRequired, total=False):
    #: no_sample — фактов события за 30 дней нет
    code: str
    message: str

class AutomationRuleTestResultWhenValuesItem(TypedDict):
    key: str
    label: str
    value: str

class _AutomationRuleTestResultConditionRequired(TypedDict):
    ok: bool
    empty: bool
    expression: bool
    clauses: List["AutomationRuleTestResultConditionClausesItem"]

class AutomationRuleTestResultCondition(_AutomationRuleTestResultConditionRequired, total=False):
    code: str
    message: str

class _AutomationRuleTestResultConditionClausesItemRequired(TypedDict):
    index: int
    field: str
    field_label: str
    op: str
    op_label: str
    actual: str
    present: bool
    ok: bool

class AutomationRuleTestResultConditionClausesItem(_AutomationRuleTestResultConditionClausesItemRequired, total=False):
    expected: str
    expected_to: str
    of: str
    of_label: str
    of_actual: str
    group: int

class _AutomationRuleTestResultActionsItemRequired(TypedDict):
    index: int
    command: str
    label: str
    permission: str
    allowed: bool
    connected: bool
    status: Literal['would_run', 'not_reached', 'blocked']
    inputs: List["AutomationRuleTestResultActionsItemInputsItem"]

class AutomationRuleTestResultActionsItem(_AutomationRuleTestResultActionsItemRequired, total=False):
    code: str
    message: str

class _AutomationRuleTestResultActionsItemInputsItemRequired(TypedDict):
    key: str
    label: str
    template: str
    value: str

class AutomationRuleTestResultActionsItemInputsItem(_AutomationRuleTestResultActionsItemInputsItemRequired, total=False):
    missing: List[str]

class _CRMActivityRequired(TypedDict):
    id: "UUID"
    entity_type: Literal['lead', 'deal', 'customer']
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
    #: Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
    weighted_forecast: str
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

class _CRMAutomationRuleRequired(TypedDict):
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

class CRMAutomationRule(_CRMAutomationRuleRequired, total=False):
    #: Правило перенесено на общий движок: события после этого момента исполняет правило adopted_rule_id; здесь оно не правится (409)
    adopted_at: str
    adopted_rule_id: "UUID"

class _CRMAutomationRuleInputRequired(TypedDict):
    name: str
    event_type: "CRMAutomationEventType"
    actions: List["CRMAutomationAction"]

class CRMAutomationRuleInput(_CRMAutomationRuleInputRequired, total=False):
    conditions: Optional[Dict[str, str]]
    is_enabled: bool

class _CRMAutomationRunRequired(TypedDict):
    id: "UUID"
    rule_id: "UUID"
    event_id: "UUID"
    status: Literal['queued', 'running', 'success', 'failed', 'skipped']
    attempts: int
    action_errors: Optional[List[str]]
    created_at: str
    updated_at: str

class CRMAutomationRun(_CRMAutomationRunRequired, total=False):
    #: Имя правила — журнал отвечает, что сработало
    rule_name: str
    #: Событие, вызвавшее запуск
    event_type: str
    #: lead или deal — по какой записи был запуск
    entity_type: str
    entity_id: "UUID"

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
    inn: str
    kpp: str

class CRMConversionMetric(TypedDict):
    qualified_leads: int
    converted_leads: int
    rate: float

class _CRMConvertLeadInputRequired(TypedDict):
    pipeline_id: "UUID"
    stage_id: "UUID"
    title: str

class CRMConvertLeadInput(_CRMConvertLeadInputRequired, total=False):
    #: Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
    amount: str
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

class _CRMCreateTaskLinkInputRequired(TypedDict):
    section_id: "UUID"
    title: str

class CRMCreateTaskLinkInput(_CRMCreateTaskLinkInputRequired, total=False):
    description: str
    due_at: Optional[str]
    #: Исполнитель; по умолчанию — тот, кто создаёт задачу
    executor_id: Optional[int]

class _CRMCustomerRequired(TypedDict):
    id: "UUID"
    kind: Literal['person', 'company', 'sole_prop']
    name: str
    legal_name: str
    #: ИНН без пробелов; пустая строка - не указан
    inn: str
    #: КПП в верхнем регистре; бывает только при ИНН из 10 цифр
    kpp: str
    #: Основной телефон — значение основного канала phone
    phone: str
    #: Основная почта — значение основного канала email
    email: str
    #: Ник или номер клиента по мессенджерам
    messengers: Optional[Dict[str, str]]
    #: Все телефоны, почты и мессенджеры клиента
    channels: List["CRMCustomerChannel"]
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
    #: Карточка слита с этой и лежит в архиве
    merged_into_customer_id: "UUID"
    #: Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
    custom: Optional[Dict[str, Any]]

class _CRMCustomerChannelRequired(TypedDict):
    kind: Literal['phone', 'email', 'messenger']
    #: Значение, как его ввели
    value: str
    #: Вид для сравнения: телефон цифрами с кодом страны, почта и ник в нижнем регистре
    normalized: str
    #: Основной канал своего вида; он уходит в справочник контрагентов ERP
    primary: bool

class CRMCustomerChannel(_CRMCustomerChannelRequired, total=False):
    #: Сеть мессенджера: telegram, whatsapp, max, vk и т. п.; у телефона и почты не передаётся
    network: str

class _CRMCustomerChannelInputRequired(TypedDict):
    kind: Literal['phone', 'email', 'messenger']
    #: Телефон в любом формате, адрес почты или ник
    value: str

class CRMCustomerChannelInput(_CRMCustomerChannelInputRequired, total=False):
    #: Сеть мессенджера; обязательна для messenger
    network: str
    #: Основной канал своего вида; без отметки основным становится первый
    primary: bool

class _CRMCustomerDuplicateRequired(TypedDict):
    id: "UUID"
    kind: Literal['person', 'company', 'sole_prop']
    name: str
    legal_name: str
    #: ИНН без пробелов; пустая строка - не указан
    inn: str
    #: КПП в верхнем регистре; бывает только при ИНН из 10 цифр
    kpp: str
    #: Основной телефон — значение основного канала phone
    phone: str
    #: Основная почта — значение основного канала email
    email: str
    #: Ник или номер клиента по мессенджерам
    messengers: Optional[Dict[str, str]]
    #: Все телефоны, почты и мессенджеры клиента
    channels: List["CRMCustomerChannel"]
    tags: Optional[List[str]]
    source: str
    note: str
    open_deals: int
    created_at: str
    updated_at: str
    matched_by: Literal['inn', 'phone', 'email', 'name']

class CRMCustomerDuplicate(_CRMCustomerDuplicateRequired, total=False):
    owner_id: int
    owner_name: str
    core_contact_id: "UUID"
    #: Момент переноса в справочник контрагентов ERP
    promoted_at: str
    archived_at: str
    #: Карточка слита с этой и лежит в архиве
    merged_into_customer_id: "UUID"
    #: Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
    custom: Optional[Dict[str, Any]]

class CRMCustomerDuplicateGroup(TypedDict):
    matched_by: Literal['inn', 'phone', 'email', 'name']
    #: Общее значение признака: ИНН/КПП, последние десять цифр телефона, почта или имя
    value: str
    customers: List["CRMCustomer"]

class CRMCustomerDuplicateRefusal(TypedDict):
    code: Literal['crm.customer_inn_taken', 'crm.customer_possible_duplicate']
    detail: str
    #: Похожие карточки; чужая карточка без права видеть чужих клиентов — только имя, вид и ответственный
    matches: List["CRMCustomerDuplicate"]

class _CRMCustomerInputRequired(TypedDict):
    name: str

class CRMCustomerInput(_CRMCustomerInputRequired, total=False):
    kind: Literal['person', 'company', 'sole_prop']
    legal_name: str
    #: ИНН: 10 цифр у организации, 12 у предпринимателя, с верной контрольной цифрой
    inn: str
    #: КПП: девять знаков, только вместе с ИНН из 10 цифр
    kpp: str
    #: Телефон; несколько номеров можно перечислить через запятую. Не читается, если передан channels
    phone: str
    #: Почта; не читается, если передан channels
    email: str
    #: Мессенджеры объектом «сеть → ник»; не читаются, если передан channels
    messengers: Optional[Dict[str, str]]
    #: Полный список каналов связи; главнее полей phone, email и messengers
    channels: Optional[List["CRMCustomerChannelInput"]]
    tags: Optional[List[str]]
    source: str
    owner_id: Optional[int]
    note: str
    #: Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
    custom: Optional[Dict[str, Any]]
    #: Это правда новый клиент: создать, хотя телефон или почта совпали с живой карточкой. Совпадение ИНН и КПП так не обходится
    confirm_duplicate: bool

class CRMCustomerPatch(TypedDict, total=False):
    kind: Literal['person', 'company', 'sole_prop']
    name: str
    legal_name: str
    #: Пустая строка стирает ИНН
    inn: str
    #: Пустая строка стирает КПП
    kpp: str
    #: Заменяет основной телефон, остальные номера остаются; пустая строка снимает основной
    phone: str
    #: Заменяет основную почту, остальные адреса остаются; пустая строка снимает основную
    email: str
    #: Заменяет все мессенджеры клиента
    messengers: Optional[Dict[str, str]]
    #: Заменяет список каналов целиком; поля phone, email и messengers при этом не читаются
    channels: Optional[List["CRMCustomerChannelInput"]]
    tags: Optional[List[str]]
    source: str
    owner_id: Optional[int]
    note: str
    archived: bool
    #: Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
    custom: Optional[Dict[str, Any]]

class _CRMDealRequired(TypedDict):
    id: "UUID"
    pipeline_id: "UUID"
    stage_id: "UUID"
    title: str
    #: Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
    amount: str
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
    crm_customer_id: "UUID"
    next_action_at: str
    archived_at: str
    closed_at: str
    loss_reason_id: "UUID"
    description: str
    first_message: str
    utm_source: str
    utm_medium: str
    utm_campaign: str
    utm_term: str
    utm_content: str
    landing_page: str
    referrer: str
    #: Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
    custom: Optional[Dict[str, Any]]

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
    #: Суммы по валютам сделок колонки, десятичными строками
    original_totals: Optional[Dict[str, str]]
    cards: Optional[List["CRMDealCard"]]
    has_more: bool

class CRMDealBoardStage(_CRMDealBoardStageRequired, total=False):
    #: Сумма в валюте учёта десятичной строкой; отсутствует при неполном покрытии курсами
    amount_in_accounting: str
    weighted_in_accounting: str

class _CRMDealCardRequired(TypedDict):
    id: "UUID"
    pipeline_id: "UUID"
    stage_id: "UUID"
    title: str
    #: Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
    amount: str
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
    crm_customer_id: "UUID"
    next_action_at: str
    archived_at: str
    closed_at: str
    loss_reason_id: "UUID"
    description: str
    first_message: str
    utm_source: str
    utm_medium: str
    utm_campaign: str
    utm_term: str
    utm_content: str
    landing_page: str
    referrer: str
    #: Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
    custom: Optional[Dict[str, Any]]
    customer_name: str
    owner_name: str
    #: Когда сделка встала на текущий этап; от этого момента считается норматив этапа
    stage_since: str

class CRMDealContact(TypedDict):
    id: "UUID"
    deal_id: "UUID"
    contact_id: "UUID"
    is_primary: bool
    created_at: str

class _CRMDealInputRequired(TypedDict):
    pipeline_id: "UUID"
    stage_id: "UUID"
    title: str

class CRMDealInput(_CRMDealInputRequired, total=False):
    #: Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
    amount: str
    #: Обязателен при ненулевой сумме
    currency: str
    source: str
    description: str
    probability: int
    expected_close_at: Optional[str]
    owner_id: Optional[int]
    #: Прежний вход: контрагент справочника ERP. Сервер находит или заводит по нему клиента CRM и записывает crm_customer_id; в ответе поля нет.
    customer_id: Optional[str]
    crm_customer_id: Optional[str]
    next_action: str
    next_action_at: Optional[str]
    #: Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
    custom: Optional[Dict[str, Any]]

class _CRMDealItemRequired(TypedDict):
    id: "UUID"
    deal_id: "UUID"
    position: int
    name: str
    quantity: float
    unit: str
    #: Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
    price: str
    discount_percent: float
    #: Сумма строки со скидкой; считает сервер, чтобы клиенты не разошлись на округлении
    total: int
    created_at: str
    updated_at: str

class CRMDealItem(_CRMDealItemRequired, total=False):
    #: Ссылка на номенклатуру необязательна - на этапе расчёта половина строк ещё не заведена в каталоге
    product_id: "UUID"

class CRMDealPatch(TypedDict, total=False):
    title: str
    #: Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
    amount: str
    currency: str
    source: str
    description: str
    probability: int
    expected_close_at: Optional[str]
    owner_id: Optional[int]
    #: Прежний вход: контрагент справочника ERP. Сервер находит или заводит по нему клиента CRM и записывает crm_customer_id; в ответе поля нет.
    customer_id: Optional[str]
    crm_customer_id: Optional[str]
    next_action: str
    next_action_at: Optional[str]
    #: Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
    custom: Optional[Dict[str, Any]]
    archived: bool

class _CRMDealStageHistoryRequired(TypedDict):
    id: "UUID"
    deal_id: "UUID"
    to_stage_id: "UUID"
    changed_by: int
    #: Вид записи: created - сделка заведена, move - перенос по этапам, pipeline_change - перенос в другую воронку, reopen - повторное открытие закрытой сделки
    kind: Literal['created', 'move', 'pipeline_change', 'reopen']
    created_at: str

class CRMDealStageHistory(_CRMDealStageHistoryRequired, total=False):
    from_stage_id: "UUID"
    #: Причина; заполнена у повторного открытия
    reason: str

class _CRMEngagementRequired(TypedDict):
    id: "UUID"
    entity_type: Literal['lead', 'deal', 'customer']
    entity_id: "UUID"
    kind: "CRMEngagementKind"
    title: str
    #: Подробности дела: что обсудить, адрес встречи
    description: str
    repeat: "CRMEngagementRepeat"
    created_by: int
    created_at: str
    updated_at: str

class CRMEngagement(_CRMEngagementRequired, total=False):
    due_at: str
    #: Пусто, пока дело не выполнено
    done_at: str
    #: Когда напомнить ответственному
    remind_at: str
    #: Когда напоминание ушло в центр уведомлений
    reminded_at: str
    #: Событие календаря, заведённое из дела
    calendar_event_id: "UUID"
    #: Задача модуля «Задачи», заведённая из дела
    task_id: "UUID"
    owner_id: int
    owner_name: str
    #: Название карточки дела (в списке «Мои дела»)
    entity_title: str
    #: Дело сохранено, но событие календаря не заведено или не обновлено
    warnings: List[Literal['calendar_unavailable', 'calendar_failed']]

class _CRMEngagementInputRequired(TypedDict):
    title: str

class CRMEngagementInput(_CRMEngagementInputRequired, total=False):
    kind: "CRMEngagementKind"
    #: Подробности дела
    description: str
    due_at: Optional[str]
    #: Когда напомнить ответственному; не позже срока
    remind_at: Optional[str]
    repeat: "CRMEngagementRepeat"
    #: По умолчанию - вызывающий сотрудник
    owner_id: Optional[int]
    #: Поставить дело событием в календарь ответственного; нужен срок
    in_calendar: bool

CRMEngagementKind = str

class CRMEngagementKindItem(TypedDict):
    #: Код вида: то, что ложится в kind дела; после заведения не меняется
    code: str
    #: Подпись вида - право кабинета
    label: str
    sort_order: int
    #: Выключенный вид не предлагается для новых дел, но подписывает старые
    is_active: bool

class CRMEngagementPatch(TypedDict, total=False):
    kind: "CRMEngagementKind"
    title: str
    #: Подробности дела
    description: str
    #: null снимает срок
    due_at: Optional[str]
    #: null снимает напоминание; новое время снова ставит его в очередь
    remind_at: Optional[str]
    repeat: "CRMEngagementRepeat"
    owner_id: Optional[int]
    #: true закрывает дело, false возвращает в работу; закрытие повторяющегося дела заводит следующее
    done: bool
    #: true ставит в календарь дело, у которого события ещё нет
    in_calendar: bool

CRMEngagementRepeat = Literal['none', 'daily', 'weekly', 'monthly']

class _CRMEngagementTaskInputRequired(TypedDict):
    section_id: "UUID"

class CRMEngagementTaskInput(_CRMEngagementTaskInputRequired, total=False):
    #: Название задачи; по умолчанию - название дела
    title: str
    #: Описание задачи; по умолчанию - подробности дела
    description: str
    #: Срок задачи; по умолчанию - срок дела
    due_at: Optional[str]
    #: Исполнитель; по умолчанию - ответственный за дело
    executor_id: Optional[int]

class CRMExternalLink(TypedDict):
    """Указатель CRM на запись другого модуля; владельцем записи остаётся тот модуль"""

    id: "UUID"
    entity_type: Literal['lead', 'deal']
    entity_id: "UUID"
    link_type: Literal['task', 'calendar_event', 'hub_meeting']
    external_id: "UUID"
    created_at: str

class CRMImportFileInfo(TypedDict):
    filename: str
    format: str
    sheets: List["CRMImportSheetInfo"]
    #: Сколько ячеек с формулами прочитано по сохранённому значению
    warnings: int

class _CRMImportSheetInfoRequired(TypedDict):
    name: str
    rows: int
    header_row: int
    headers: List[str]
    sample: List[List[str]]

class CRMImportSheetInfo(_CRMImportSheetInfoRequired, total=False):
    #: Заголовок -> предложенное поле
    suggested: Dict[str, str]

class CRMInboxAssignInput(TypedDict, total=False):
    #: null снимает назначение
    assigned_to: Optional[int]

class CRMInboxAttachment(TypedDict):
    id: "UUID"
    message_id: "UUID"
    filename: str
    content_type: str
    size_bytes: int
    scan_status: "CRMInboxScanStatus"
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
    #: Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
    amount: str
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
    #: Сколько файлов у сообщения; список — GET /api/v1/crm/inbox/messages/{id}/attachments
    attachment_count: int

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
    #: Сколько файлов у сообщения; список — GET /api/v1/crm/inbox/messages/{id}/attachments
    attachment_count: int

class _CRMInboxOutboundUploadRequired(TypedDict):
    id: "UUID"
    conversation_id: "UUID"
    filename: str
    content_type: str
    size_bytes: int
    scan_status: "CRMInboxScanStatus"
    expires_at: str

class CRMInboxOutboundUpload(_CRMInboxOutboundUploadRequired, total=False):
    #: Контрольная сумма, посчитанная на завершении сессии; у загрузки формой её нет
    sha256: str

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

CRMInboxScanStatus = Literal['pending', 'clean', 'infected', 'skipped']

class CRMInboxSendInput(TypedDict, total=False):
    body: str
    #: Идентификаторы заранее загруженных файлов: id из crmFinishInboxUploadSession (сессия загрузки) или из crmUploadInboxOutboundFile (форма)
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

CRMLabelKey = str

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
    stage_id: "UUID"
    crm_customer_id: "UUID"
    next_action_at: str
    archived_at: str
    qualification_reason: str
    reject_reason_id: "UUID"
    converted_deal_id: "UUID"
    #: Во что вошло это обращение при слиянии дублей; заполнено только у архивной записи-источника
    merged_into_lead_id: "UUID"
    utm_source: str
    utm_medium: str
    utm_campaign: str
    utm_term: str
    utm_content: str
    landing_page: str
    referrer: str
    #: Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
    custom: Optional[Dict[str, Any]]

class CRMLeadBoard(TypedDict):
    stages: List["CRMLeadBoardStage"]

class CRMLeadBoardStage(TypedDict):
    stage: "CRMLeadStage"
    #: Сколько лидов отбора стоит на этапе
    total_count: int
    cards: List["CRMLeadCard"]
    #: На этапе больше лидов, чем карточек в ответе
    has_more: bool

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
    stage_id: "UUID"
    crm_customer_id: "UUID"
    next_action_at: str
    archived_at: str
    qualification_reason: str
    reject_reason_id: "UUID"
    converted_deal_id: "UUID"
    #: Во что вошло это обращение при слиянии дублей; заполнено только у архивной записи-источника
    merged_into_lead_id: "UUID"
    utm_source: str
    utm_medium: str
    utm_campaign: str
    utm_term: str
    utm_content: str
    landing_page: str
    referrer: str
    #: Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
    custom: Optional[Dict[str, Any]]
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
    stage_id: "UUID"
    crm_customer_id: "UUID"
    next_action_at: str
    archived_at: str
    qualification_reason: str
    reject_reason_id: "UUID"
    converted_deal_id: "UUID"
    #: Во что вошло это обращение при слиянии дублей; заполнено только у архивной записи-источника
    merged_into_lead_id: "UUID"
    utm_source: str
    utm_medium: str
    utm_campaign: str
    utm_term: str
    utm_content: str
    landing_page: str
    referrer: str
    #: Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
    custom: Optional[Dict[str, Any]]
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
    #: Прежний вход: контрагент справочника ERP. Сервер находит или заводит по нему клиента CRM и записывает crm_customer_id; в ответе поля нет.
    customer_id: Optional[str]
    crm_customer_id: Optional[str]
    next_action: str
    next_action_at: Optional[str]
    #: Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
    custom: Optional[Dict[str, Any]]
    utm_source: str
    utm_medium: str
    utm_campaign: str
    utm_term: str
    utm_content: str
    landing_page: str
    referrer: str

CRMLeadLockMode = Literal['owner_only', 'after_qualification']

class CRMLeadPatch(TypedDict, total=False):
    title: str
    source: str
    description: str
    first_message: str
    contact_handle: str
    reference_id: Optional[str]
    owner_id: Optional[int]
    #: Прежний вход: контрагент справочника ERP. Сервер находит или заводит по нему клиента CRM и записывает crm_customer_id; в ответе поля нет.
    customer_id: Optional[str]
    crm_customer_id: Optional[str]
    next_action: str
    next_action_at: Optional[str]
    archived: bool
    #: Дополнительные поля кабинета: состав задаёт «Настройки → Поля»
    custom: Optional[Dict[str, Any]]

class _CRMLeadStageRequired(TypedDict):
    id: "UUID"
    #: Имя этапа задаёт кабинет; код на конкретные имена не ссылается
    name: str
    sort_order: int
    #: Ненужный этап выключают, а не удаляют
    is_active: bool
    meaning: "CRMLeadStageMeaning"
    created_at: str
    updated_at: str

class CRMLeadStage(_CRMLeadStageRequired, total=False):
    label_key: "CRMLabelKey"
    #: Цвет этапа #RRGGBB; пусто - цвет по умолчанию
    color: str

class _CRMLeadStageInputRequired(TypedDict):
    name: str

class CRMLeadStageInput(_CRMLeadStageInputRequired, total=False):
    meaning: "CRMLeadStageMeaning"
    #: Цвет этапа #RRGGBB; пусто - цвет по умолчанию
    color: str

CRMLeadStageMeaning = Literal['open', 'qualified', 'converted', 'rejected']

class CRMLeadStagePatch(TypedDict, total=False):
    name: str
    is_active: bool
    meaning: "CRMLeadStageMeaning"
    #: Цвет этапа #RRGGBB; пусто - цвет по умолчанию
    color: str

CRMLeadStatus = Literal['new', 'qualified', 'disqualified', 'converted']

class CRMLeadSummary(TypedDict):
    #: Лиды в очереди разбора: статус new вне архива, видимые читающему
    unsorted: int

class CRMLossReason(TypedDict):
    id: "UUID"
    name: str
    #: Из какого справочника запись: deal - crm_loss_reason (почему проиграна сделка), lead - crm_lead_reject_reason (почему лид оказался не наш)
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
    #: Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
    amount: str

class CRMLossReasonMetric(_CRMLossReasonMetricRequired, total=False):
    id: str

class _CRMManagerWorkloadRequired(TypedDict):
    owner_id: int
    open_leads: int
    open_deals: int
    open_conversations: int
    won_deals: int
    #: Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
    won_amount: str
    lost_deals: int

class CRMManagerWorkload(_CRMManagerWorkloadRequired, total=False):
    owner_name: str
    #: Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
    plan_amount: str
    #: Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
    won_amount_month: str

class CRMMergeCustomersInput(TypedDict):
    #: Карточки, которые сливаются в эту
    sources: List["UUID"]

class CRMMergeLeadsInput(TypedDict):
    """Какие обращения свести в это"""

    #: Источники: уходят в архив со ссылкой на цель, их переписка и дела переезжают
    source_ids: List["UUID"]

class _CRMMoveDealInputRequired(TypedDict):
    stage_id: "UUID"

class CRMMoveDealInput(_CRMMoveDealInputRequired, total=False):
    #: Целевая воронка. Пусто или текущая - перенос по этапам своей воронки; другая - сделка переезжает в неё, а stage_id должен быть этапом целевой воронки. Закрытую сделку не переносят
    pipeline_id: Optional[str]
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
    #: Бизнес воронки: её сделки, лиды, ставшие такими сделками, и привязанные диалоги видят участники, чья область доступа касается бизнеса, и ответственные. null — воронка всего кабинета
    business_id: Optional["UUID"]
    created_at: str
    updated_at: str

class CRMPipeline(_CRMPipelineRequired, total=False):
    label_key: "CRMLabelKey"
    stages: Optional[List["CRMStage"]]

class _CRMPipelineInputRequired(TypedDict):
    name: str

class CRMPipelineInput(_CRMPipelineInputRequired, total=False):
    is_default: bool
    #: Бизнес воронки. Пусто — единственный бизнес области доступа или весь кабинет (его заводит только доступ ко всем бизнесам). Бизнес вне области доступа — 403 crm.pipeline_business_forbidden
    business_id: Optional["UUID"]

class _CRMPipelineOverviewRequired(TypedDict):
    pipeline_id: "UUID"
    pipeline_name: str
    open_count: int
    #: Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
    open_amount: str

class CRMPipelineOverview(_CRMPipelineOverviewRequired, total=False):
    pipeline_label_key: "CRMLabelKey"
    stages: Optional[List["CRMStageOverview"]]

class CRMPipelinePatch(TypedDict, total=False):
    name: str
    is_default: bool
    is_active: bool
    #: Бизнес воронки; поле не передано — не менять, null — весь кабинет. Бизнес вне области доступа — 403 crm.pipeline_business_forbidden
    business_id: Optional["UUID"]

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

CRMRequiredField = str

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
    #: Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
    amount: str
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
    #: Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
    amount: str

class CRMSalesPlansInputItemsItem(_CRMSalesPlansInputItemsItemRequired, total=False):
    #: Пусто - план на весь отдел
    owner_id: Optional[int]
    currency: str

class _CRMSettingsRequired(TypedDict):
    lead_lock_mode: "CRMLeadLockMode"

class CRMSettings(_CRMSettingsRequired, total=False):
    #: Нет, пока кабинет не менял настройки
    updated_at: str

class CRMSettingsPatch(TypedDict, total=False):
    lead_lock_mode: "CRMLeadLockMode"

class CRMSourceMetric(TypedDict):
    """Откуда приходят лиды и какой источник доходит до сделки"""

    source: str
    leads: int
    converted: int
    rate: float

class _CRMStageRequired(TypedDict):
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

class CRMStage(_CRMStageRequired, total=False):
    label_key: "CRMLabelKey"
    show_on_board: "CRMStageShowOnBoard"

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
    show_on_board: "CRMStageShowOnBoard"

class _CRMStageMetricRequired(TypedDict):
    pipeline_id: str
    pipeline_name: str
    stage_id: str
    stage_name: str
    category: "CRMStageCategory"
    count: int
    #: Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
    amount: str

class CRMStageMetric(_CRMStageMetricRequired, total=False):
    pipeline_label_key: "CRMLabelKey"
    stage_label_key: "CRMLabelKey"

class _CRMStageOverviewRequired(TypedDict):
    stage_id: "UUID"
    stage_name: str
    category: "CRMStageCategory"
    deal_count: int
    #: Сумма десятичной строкой: «19990.50». Разрядность берёт валюта (MONEY-ROUNDING.md)
    deal_amount: str
    updated_at: str

class CRMStageOverview(_CRMStageOverviewRequired, total=False):
    stage_label_key: "CRMLabelKey"

class CRMStagePatch(TypedDict, total=False):
    name: str
    category: "CRMStageCategory"
    color: str
    probability: int
    sla_hours: int
    required_fields: List["CRMRequiredField"]
    is_active: bool
    show_on_board: "CRMStageShowOnBoard"

CRMStageShowOnBoard = bool

class _CRMTimelineEntryRequired(TypedDict):
    id: "UUID"
    #: note - заметка сотрудника, system - системный факт или правка полей, stage - смена этапа, decision - решение по лиду, message - сообщение канала, link - связь с задачей, событием или встречей, engagement - дело: звонок, встреча, задача
    kind: Literal['note', 'system', 'stage', 'decision', 'message', 'link', 'engagement']
    at: str
    #: Заголовок записи: действие, название этапа, решение или направление сообщения
    title: str

class CRMTimelineEntry(_CRMTimelineEntryRequired, total=False):
    """Одна запись ленты; вид говорит, из какого источника она пришла"""

    actor_id: int
    actor_name: str
    body: str
    meta: Optional[Dict[str, Any]]
    #: Откуда пришла запись: ui - менеджер в интерфейсе, api - внешний API, automation - робот, import - импорт, merge - слияние дублей, system - система. Пусто у переписки и у старых записей
    source: Literal['ui', 'api', 'automation', 'import', 'merge', 'system']
    #: Запись, которой принадлежит событие. В ленте клиента это его сделка или лид, а не он сам
    record_type: Literal['lead', 'deal', 'customer']
    record_id: "UUID"
    #: Название записи; заполняется только в ленте клиента
    record_title: str

class _CRMUserRefRequired(TypedDict):
    id: int
    display_name: str

class CRMUserRef(_CRMUserRefRequired, total=False):
    username: str
    #: Рабочая почта; по ней импорт узнаёт сотрудника чужой CRM
    email: str

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

class CalendarCabinet(TypedDict):
    id: str
    slug: str
    name: str
    #: Идентификатор источника в шторке: cabinet:<slug>.
    source: str

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
    last_error_code: Literal['', 'calendar.connector.internal', 'calendar.connector.credentials_rejected', 'calendar.connector.provider_declined', 'calendar.connector.disconnected']
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
    #: Ссылка на видеовстречу (https). Поля нет, если видеовстречи нет.
    conference_url: str
    #: Откуда ссылка: telemost — комната Яндекс Телемоста, personal — постоянная ссылка человека, link — вставлена вручную.
    conference_provider: Literal['telemost', 'personal', 'link']
    #: Идентификатор конференции Яндекс Телемоста; только при conference_provider=telemost.
    conference_id: str

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
    #: Ссылка на видеовстречу: пусто либо абсолютный https:// без пробелов. Если поля видеовстречи не переданы, сервер применяет личную настройку «Для новых встреч»: новая комната Яндекс Телемоста или постоянная ссылка.
    conference_url: str
    #: Источник ссылки. telemost без ссылки — сервер заводит комнату Яндекс Телемоста от имени человека; Телемост должен быть подключён в настройках календаря. Пусто при непустой ссылке означает link.
    conference_provider: Literal['', 'telemost', 'personal', 'link']
    #: Идентификатор конференции Телемоста; для других источников сбрасывается.
    conference_id: str

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
    #: Пустая строка убирает видеовстречу. Новая ссылка без conference_provider считается вставленной вручную (link).
    conference_url: Optional[str]
    conference_provider: Optional[Literal['', 'telemost', 'personal', 'link', None]]
    conference_id: Optional[str]

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
    department_id: str
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

class _CalendarSettingsEnvelopeRequired(TypedDict):
    settings: Dict[str, Any]

class CalendarSettingsEnvelope(_CalendarSettingsEnvelopeRequired, total=False):
    #: Другие кабинеты человека; их занятость учитывается по профилю, видимость и учёт переключаются в шторке «Календари». Только в ответе GET.
    cabinets: List["CalendarCabinet"]

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

class ChatAttachment(TypedDict):
    id: "UUID"
    original_name: str
    content_type: Literal['audio/mp4', 'audio/webm', 'audio/ogg', 'video/mp4', 'video/quicktime']
    size_bytes: int
    sha256_hex: str
    media_kind: Literal['voice', 'video_circle']
    duration_ms: int
    content_url: str

class ChatAttachmentDownloadSession(TypedDict):
    #: Подписанный абсолютный URL при direct=true; иначе авторизованный относительный путь API.
    url: str
    #: true — адрес хранилища открывается без Authorization.
    direct: bool
    expires_at: str
    scan_status: Literal['clean']

class _ChatAttachmentPageRequired(TypedDict):
    items: List["ChatForwardedAttachment"]
    #: Следующая страница доказана прочитанной строкой за границей текущей, а не тем, что страница оказалась полной.
    has_more: bool

class ChatAttachmentPage(_ChatAttachmentPageRequired, total=False):
    #: Курсор следующей страницы; присутствует только вместе с has_more=true.
    next_cursor: str

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
    first_unread_seq: Optional[int]
    manual_unread_seq: Optional[int]
    notification_mode: str
    mention_count: int

class ChatConversation(_ChatConversationRequired, total=False):
    preview: "ChatMessage"
    capabilities: "ChatConversationCapabilities"
    origin: str
    origin_ref: Optional["UUID"]
    last_read_seq: int
    others_read_seq: int
    has_avatar: bool
    avatar_url: str
    peer_user_id: Optional[int]
    peer_avatar_url: str

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

class ChatEnsureDirect(TypedDict):
    peer_user_id: int

class ChatEnsureDirectResult(TypedDict):
    conversation_id: "UUID"
    created: bool

class ChatEntityConversation(TypedDict):
    conversation_id: "UUID"
    title: str
    deep_link: str

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

class ChatMember(TypedDict):
    user_id: int
    display_name: str
    avatar_url: str
    role: Literal['owner', 'moderator', 'member', 'readonly']
    #: Человека больше нет в справочнике кабинета: членство или учётная запись выключены. Он остаётся в составе беседы, потому что его сообщения в ней остались и подпись под ними обязана кем-то называться. Пустое display_name означает, что о нём не осталось даже имени — подписывать такую строку клиент решает сам.
    is_former: bool

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

class _ChatMessageRequired(TypedDict):
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

class ChatMessage(_ChatMessageRequired, total=False):
    reply_to_message_id: Optional[str]
    #: Цитата части исходного сообщения; поля нет, когда ответ на сообщение целиком, исходное удалено или недоступно
    reply_quote: str

class ChatMessageMention(TypedDict):
    user_id: int
    display_name: str

class _ChatMessagePageRequired(TypedDict):
    items: List["ChatMessage"]

class ChatMessagePage(_ChatMessagePageRequired, total=False):
    first_seq: int
    last_seq: int

class ChatNotificationModeInput(TypedDict):
    mode: Literal['all', 'mentions', 'muted']

class ChatNotificationModeResult(TypedDict):
    mode: Literal['all', 'mentions', 'muted']
    changed: bool

class _ChatPeoplePageRequired(TypedDict):
    items: List["ChatPerson"]
    has_more: bool

class ChatPeoplePage(_ChatPeoplePageRequired, total=False):
    #: Присутствует только когда есть следующая страница коллег
    next_offset: int

class ChatPerson(TypedDict):
    user_id: int
    display_name: str
    avatar_url: str
    is_self: bool

class ChatPresencePage(TypedDict):
    items: List["ChatPresencePageItemsItem"]

class ChatPresencePageItemsItem(TypedDict):
    user_id: int
    typing: bool

class ChatReceiptInput(TypedDict):
    seq: int

class ChatReceiptState(TypedDict):
    last_delivered_seq: int
    last_read_seq: int
    manual_unread_seq: Optional[int]
    changed: bool

class _ChatSendMessageRequired(TypedDict):
    #: Ключ идемпотентности отправки. Уникален в пределах беседы и отправителя: повтор с тем же ключом не заводит второе сообщение, а возвращает уже отправленное. Заголовок Idempotency-Key эта операция не читает
    client_message_id: Dict[str, Any]

class ChatSendMessage(_ChatSendMessageRequired, total=False):
    #: Текст сообщения; без attachment_ids обязателен, с ними — подпись к вложениям и может быть пустым. Предел считается в кодовых точках, а не в байтах: сервер режет по 10 000 кодовых точек
    body: str
    #: Сообщение этой беседы, на которое отвечает новое
    reply_to_message_id: Dict[str, Any]
    mention_user_ids: List[int]
    #: Готовые вложения этой беседы — id из завершения сессии загрузки или из списка вложений. Не сочетаются с mention_user_ids в одном сообщении
    attachment_ids: List["UUID"]
    #: Цитата части исходного сообщения, как в Телеграме: дословный кусок его текста, не длиннее 1024 кодовых точек. Только вместе с reply_to_message_id; фрагмента нет в исходном — 404. Пустая строка — ответ на сообщение целиком
    reply_quote: str
    #: Сообщение формы «Сообщить об ошибке». В чате поддержки открывает новое обращение и новую заявку, даже если в беседе уже есть открытое; обычное сообщение продолжает открытое. В любой другой беседе — 400
    support_report: bool

class ChatSendMessageResult(TypedDict):
    message: "ChatMessage"
    created: bool

class ChatSendVideoMeeting(TypedDict):
    #: Ключ идемпотентности отправки. Уникален в пределах беседы и отправителя: повтор с тем же ключом не заводит вторую комнату и второе сообщение, а возвращает уже отправленное
    client_message_id: Dict[str, Any]

class ChatUnreadMention(TypedDict):
    message_id: "UUID"
    seq: int

class ChatUnreadMentionPage(TypedDict):
    items: List["ChatUnreadMention"]

class _ChatUploadInstructionsRequired(TypedDict):
    mode: Literal['post', 'parts', 'api']
    max_bytes: int
    expires_at: str

class ChatUploadInstructions(_ChatUploadInstructionsRequired, total=False):
    url: str
    method: str
    fields: Dict[str, str]
    file_field: str
    part_bytes: int
    part_count: int
    direct_urls: Dict[str, str]
    requires_authorization: bool

class _ChatUploadSessionRequired(TypedDict):
    id: "UUID"
    owner_type: Literal['conversation']
    name: str
    mime_type: str
    size_bytes: int
    status: Literal['pending', 'processing', 'attached', 'failed', 'expired']
    expires_at: str
    created_at: str

class ChatUploadSession(_ChatUploadSessionRequired, total=False):
    owner_id: "UUID"
    sha256: str
    failure: str
    failure_detail: str
    scan_status: Literal['clean', 'infected', 'skipped']
    scan_verdict: str
    published_ref: "UUID"
    completed_at: str
    upload: "ChatUploadInstructions"

class _ChatUploadSessionCreateRequired(TypedDict):
    name: str
    size_bytes: int

class ChatUploadSessionCreate(_ChatUploadSessionCreateRequired, total=False):
    mime_type: str
    #: Необязательная lowercase SHA-256 сумма файла.
    sha256: str

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
    #: Дата, на которую показаны enabled и required
    on: str
    versions: List["CoreAccountingDimensionVersion"]

class CoreAccountingDimensionPage(TypedDict):
    count: int
    results: List["CoreAccountingDimension"]
    readiness: "CoreAccountingDimensionPageReadiness"

class CoreAccountingDimensionPageReadiness(TypedDict):
    posted_entries: int

class CoreAccountingDimensionPatch(TypedDict, total=False):
    enabled: bool
    required: bool

class _CoreAccountingDimensionVersionRequired(TypedDict):
    id: str
    #: 0001-01-01 — с начала учёта
    valid_from: str
    enabled: bool
    required: bool

class CoreAccountingDimensionVersion(_CoreAccountingDimensionVersionRequired, total=False):
    #: Пусто — запись действует
    valid_to: str

class _CoreAccountingDimensionVersionInputRequired(TypedDict):
    valid_from: str
    enabled: bool
    required: bool

class CoreAccountingDimensionVersionInput(_CoreAccountingDimensionVersionInputRequired, total=False):
    #: Поправить действующую запись истории вместо новой
    edit_open: bool

class CoreAccountingPolicy(TypedDict):
    businesses: List["CoreBusinessPolicy"]
    companies: List["CoreCompanyPolicy"]

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

class _CoreBusinessRequired(TypedDict):
    id: "UUID"
    name: str
    is_active: bool
    #: Что считать выручкой — cash это деньги, accrual это сделка
    accounting_method: Literal['cash', 'accrual']

class CoreBusiness(_CoreBusinessRequired, total=False):
    #: Дата перехода на начисление; отсутствует у кассового бизнеса
    accrual_from: str
    #: Очищаются ли суммы отчётов от косвенного налога сегодня; gross это полные суммы. Меняется в учётной политике с датой
    vat_presentation: Literal['gross', 'net']
    #: Дата начала действующей сегодня версии очистки сумм; отсутствует, если версия действует с начала учёта
    vat_since: str

class _CoreBusinessAccountingMethodInputRequired(TypedDict):
    #: Значение приводится к нижнему регистру
    method: Literal['cash', 'accrual']

class CoreBusinessAccountingMethodInput(_CoreBusinessAccountingMethodInputRequired, total=False):
    #: Дата перехода на начисление; обязательна при accrual и не используется при cash
    accrual_from: str

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

class _CoreBusinessPolicyRequired(TypedDict):
    id: "UUID"
    name: str
    is_active: bool
    accounting_method: Literal['cash', 'accrual']
    vat_presentation: List["CorePolicyVATPresentationVersion"]
    vat_pending: List["CorePolicyVATPendingVersion"]

class CoreBusinessPolicy(_CoreBusinessPolicyRequired, total=False):
    accrual_from: str
    #: Срок авансового отчёта, дней (ERP-1176); пусто — умолчание 30
    accountable_days: List["CorePolicyAccountableDaysVersion"]
    #: Статьи выручки исполнений продажи или закупки по виду строки (этап 4 ERP-1427)
    revenue_items: List["CoreOrderRevenueItemRule"]

class CoreChange(TypedDict):
    #: Имя сущности из реестра ленты (core.contact)
    entity: str
    #: Идентификатор объекта в его собственном API
    id: str
    op: "CoreChangeOp"
    #: Момент изменения. Для человека и для журнала; порядок ленты задаёт не он, а фиксация транзакции, поэтому фильтровать по нему на своей стороне нельзя
    changed_at: str

class CoreChangeFeedPage(TypedDict):
    #: Сущности, которые эта лента обслуживает предъявителю
    entities: List[str]
    #: Число строк, а не прогонов
    count: int
    limit: int
    #: «В этом прогоне есть ещё». Ложь закрывает прогон, а не кабинет: следующий запрос увидит случившееся после
    has_more: bool
    #: Непрозрачная строка. Возвращается как есть; разбирать и собирать её нельзя
    cursor: str
    changes: List["CoreChange"]

CoreChangeOp = Literal['upsert', 'delete']

class _CoreCompanyPolicyRequired(TypedDict):
    id: "UUID"
    name: str
    is_active: bool
    business_id: "UUID"
    tax_mode: List["CorePolicyTaxModeVersion"]
    vat_rates: List["CorePolicyVATRatesVersion"]

class CoreCompanyPolicy(_CoreCompanyPolicyRequired, total=False):
    #: Система налогообложения с историей (ERP-1579)
    tax_regime: List["CorePolicyTaxRegimeVersion"]
    #: Юрлицо — ИП (вид организации в карточке): доступны ПСН, НПД и патент
    sole_proprietor: bool
    #: Вся ли зарплата в бухгалтерии и источник официальной части, с историей (ERP-1700); пусто — вся официальная
    payroll_official: List["CorePolicyPayrollOfficialVersion"]

class CoreConflictingRegistrar(TypedDict):
    id: "UUID"
    number: str
    type_key: str
    type_name: str
    date: str
    status: "CoreDocumentStatus"
    sign: int

class _CoreContactRequired(TypedDict):
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
    legal_address: "CoreContactAddress"
    #: Почтовый адрес для писем и печатных форм (ERP-1782). Из реестра ФНС не приходит: автозаполнение по ИНН его не меняет
    postal_address: "CoreContactPostalAddress"
    bank_name: str
    bank_bic: str
    bank_account: str
    external_id: str
    custom: Dict[str, Any]
    is_active: bool
    created_at: str
    updated_at: str

class CoreContact(_CoreContactRequired, total=False):
    #: Нерезидент: страна регистрации кодом ISO 3166 (две буквы). Пусто — Россия.
    country: str
    #: Нерезидент: налоговый номер страны регистрации вместо ИНН.
    tax_number: str
    #: Код системного контрагента (fns, sfr, bank:<БИК>). Только чтение.
    system_key: str
    #: Что подсветить в реквизитах по правилу ИНН. Пусто — всё в порядке.
    requisites_issue: Literal['', 'inn_missing', 'inn_invalid', 'kpp_invalid', 'foreign_tax_missing', 'country_invalid']

class CoreContactPostalAddress(TypedDict):
    """Почтовый адрес для писем и печатных форм (ERP-1782). Из реестра ФНС не приходит: автозаполнение по ИНН его не меняет"""

    postal_code: str
    #: Код субъекта РФ для формализованного документа
    region_code: str
    region_name: str
    district: str
    city: str
    settlement: str
    street: str
    building: str
    block: str
    #: Офис или помещение
    flat: str
    info: str

class CoreContactAddress(TypedDict):
    postal_code: str
    #: Код субъекта РФ для формализованного документа
    region_code: str
    region_name: str
    district: str
    city: str
    settlement: str
    street: str
    building: str
    block: str
    #: Офис или помещение
    flat: str
    info: str

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
    legal_address: "CoreContactAddress"
    #: Почтовый адрес для писем и печатных форм (ERP-1782). Из реестра ФНС не приходит: автозаполнение по ИНН его не меняет
    postal_address: "CoreContactCreatePostalAddress"
    bank_name: str
    bank_bic: str
    bank_account: str
    external_id: str
    #: Нерезидент: страна регистрации кодом ISO 3166 (две буквы).
    country: str
    #: Нерезидент: налоговый номер страны регистрации вместо ИНН.
    tax_number: str
    custom: Dict[str, Any]

class CoreContactCreatePostalAddress(TypedDict):
    """Почтовый адрес для писем и печатных форм (ERP-1782). Из реестра ФНС не приходит: автозаполнение по ИНН его не меняет"""

    postal_code: str
    #: Код субъекта РФ для формализованного документа
    region_code: str
    region_name: str
    district: str
    city: str
    settlement: str
    street: str
    building: str
    block: str
    #: Офис или помещение
    flat: str
    info: str

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
    legal_address: "CoreContactAddress"
    #: Почтовый адрес для писем и печатных форм (ERP-1782). Из реестра ФНС не приходит: автозаполнение по ИНН его не меняет
    postal_address: "CoreContactPatchPostalAddress"
    bank_name: str
    bank_bic: str
    bank_account: str
    external_id: str
    country: str
    tax_number: str
    custom: Dict[str, Any]
    is_customer: bool
    is_supplier: bool
    folder_id: Optional["UUID"]

class CoreContactPatchPostalAddress(TypedDict):
    """Почтовый адрес для писем и печатных форм (ERP-1782). Из реестра ФНС не приходит: автозаполнение по ИНН его не меняет"""

    postal_code: str
    #: Код субъекта РФ для формализованного документа
    region_code: str
    region_name: str
    district: str
    city: str
    settlement: str
    street: str
    building: str
    block: str
    #: Офис или помещение
    flat: str
    info: str

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

class _CoreDocumentRequired(TypedDict):
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

class CoreDocument(_CoreDocumentRequired, total=False):
    #: Значения своих полей кабинета (графы вида core.document.<ключ вида>). Отдаёт карточка документа; списки поле не несут
    custom: Dict[str, Any]

class CoreDocumentActionCheck(TypedDict):
    allowed: bool
    reasons: List["CoreDocumentBlockReason"]

class _CoreDocumentBlockReasonRequired(TypedDict):
    code: Literal['no_poster', 'marked_deleted', 'posted', 'not_posted', 'payload_invalid', 'movement_invalid', 'balance_negative', 'ledger_incomplete', 'period_closed']
    message: str

class CoreDocumentBlockReason(_CoreDocumentBlockReasonRequired, total=False):
    detail: str
    shortages: List["CoreBalanceShortage"]
    #: Код отказа проводчика внутри причины (например stock_backdated_conflict); detail для него собран на языке запроса.
    detail_code: str
    #: Параметры отказа с кодом detail_code: из них собрана фраза detail.
    detail_params: Dict[str, str]

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

class _CoreDownloadLinkRequired(TypedDict):
    url: str
    method: Literal['GET']
    #: true — подписанный адрес хранилища, без заголовка авторизации; false — адрес этого API, с авторизацией
    direct: bool
    #: true — адрес требует токен API, агенту по MCP он недоступен
    requires_authorization: bool
    name: str
    mime_type: str
    size_bytes: int

class CoreDownloadLink(_CoreDownloadLinkRequired, total=False):
    """Временный адрес файла core: подписанный адрес хранилища или адрес этого API."""

    #: Срок подписанного адреса; у адреса API его нет
    expires_at: str
    #: Контрольная сумма SHA-256, если известна
    sha256: str
    #: Вердикт антивируса у файла от человека; skipped — файл антивирус не проверял
    scan_status: Literal['clean', 'skipped']

class _CoreEmployeeRequired(TypedDict):
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
    #: Пусто у чужой карточки без права core.employee_requisites:read
    phone: str
    #: Пусто у чужой карточки без права core.employee_requisites:read
    email: str
    user_id: Optional[int]
    username: str
    role_name: str
    #: Date or empty string
    employed_at: str
    is_active: bool
    #: Пусто у чужой карточки без права core.employee_requisites:read
    notes: str
    has_photo: bool
    created_at: str
    updated_at: str

class CoreEmployee(_CoreEmployeeRequired, total=False):
    #: ИНН для выплаты; пусто у чужой карточки без права core.employee_requisites:read
    inn: str
    #: БИК банка выплаты; пусто у чужой карточки без права core.employee_requisites:read
    bank_bic: str
    #: Счёт или карта выплаты; пусто у чужой карточки без права core.employee_requisites:read
    bank_account: str

class CoreEmployeeCreateVariant1(TypedDict):
    full_name: str

class CoreEmployeeCreateVariant2(TypedDict):
    first_name: str

class CoreEmployeeCreateVariant3(TypedDict):
    last_name: str

class CoreEmployeeCreateVariant4(TypedDict):
    middle_name: str

CoreEmployeeCreate = Union["CoreEmployeeCreateVariant1", "CoreEmployeeCreateVariant2", "CoreEmployeeCreateVariant3", "CoreEmployeeCreateVariant4"]

class CoreEmployeePage(TypedDict):
    count: int
    #: Применённый размер страницы — после зажима до потолка
    limit: int
    #: Применённое смещение
    offset: int
    results: List["CoreEmployee"]

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
    #: Статья внутреннего оборота между ЦФО; обороты исключаются из сводного ОПиУ (ERP-1493)
    internal_turnover: bool
    pnl_sign: int
    pnl_parent_id: "UUID"
    #: Вид ставки НДС сделки без товара по статье дохода; пусто — общая
    vat_kind: Literal['', 'general', 'reduced', 'zero', 'exempt']

class _CoreItemInputRequired(TypedDict):
    name: str

class CoreItemInput(_CoreItemInputRequired, total=False):
    code: str
    use_cashflow: bool
    cashflow_section: Literal['operating', 'investing', 'financing', 'transfer']
    cashflow_parent_id: "UUID"
    cashflow_sort_order: int
    use_pnl: bool
    #: Статья внутреннего оборота между ЦФО; обороты исключаются из сводного ОПиУ (ERP-1493)
    internal_turnover: bool
    pnl_sign: int
    pnl_parent_id: "UUID"
    pnl_sort_order: int
    #: Вид ставки НДС статьи дохода; не передан — не меняется; у статьи не дохода — 400
    vat_kind: Literal['', 'general', 'reduced', 'zero', 'exempt']

class _CoreItemMoveRequired(TypedDict):
    application: Literal['cashflow', 'pnl']
    position: int

class CoreItemMove(_CoreItemMoveRequired, total=False):
    parent_id: "UUID"
    cashflow_section: Literal['operating', 'investing', 'financing', 'transfer']

class CoreItemPage(TypedDict):
    count: int
    results: List["CoreItem"]

class _CoreLetterheadRequired(TypedDict):
    company_id: "UUID"
    version: int
    images: "CoreLetterheadImages"

class CoreLetterhead(_CoreLetterheadRequired, total=False):
    """Бланк юрлица. Ключи файлов наружу не отдаются: images говорит только, есть ли картинка на месте."""

    director_name: str
    director_title: str
    accountant_name: str
    accountant_title: str
    bank_account_id: Optional["UUID"]
    print_facsimile: bool

class CoreLetterheadImages(TypedDict):
    logo: bool
    stamp: bool
    director_signature: bool
    accountant_signature: bool

CoreNumberReset = Literal['year', 'never']

CoreNumberSource = Literal['sequence', 'sequence_or_given', 'external']

class _CoreOrderRequired(TypedDict):
    id: "UUID"
    side: "CoreOrderSide"
    type_key: Literal['customer_order', 'supplier_order']
    number: str
    date: str
    document_status: "CoreDocumentStatus"
    state: "CoreOrderState"
    business_id: "UUID"
    contact_id: "UUID"
    title: str
    currency: str
    prices_include_vat: bool
    #: Скидка на продажу или закупку целиком, как её ввели; в суммах строк уже учтена
    discount: str
    scenario: str
    source_kind: "CoreOrderSourceKind"
    version: int
    lines: List["CoreOrderLine"]
    responsibles: List["CoreOrderResponsible"]
    totals: "CoreOrderTotals"
    created_at: str
    updated_at: str

class CoreOrder(_CoreOrderRequired, total=False):
    """Продажа или закупка — документ ядра. В журнале строка без obligation и allowed_actions; карточка и ответы команд несут обе."""

    company_id: "UUID"
    business_name: str
    company_name: str
    contact_name: str
    contract_id: "UUID"
    #: Номер договора продажи или закупки — для экрана
    contract_number: str
    #: Дата договора продажи или закупки — для экрана
    contract_date: str
    progress: "CoreOrderProgress"
    project_id: "UUID"
    #: Подразделение продажи или закупки — элемент справочника «Подразделения»; наследуют исполнения и себестоимость (КЦ § 4.4)
    department_id: Dict[str, Any]
    #: ЦФО продажи или закупки — элемент справочника «ЦФО»; наследуют исполнения и себестоимость (КЦ § 4.4)
    cfo_id: Dict[str, Any]
    #: Статья исполнений продажи или закупки (выручка у продажи, расход у закупки); пусто — правило учётной политики по виду строки, иначе системная статья
    pnl_item_id: Dict[str, Any]
    #: Бизнес продажи или закупки прошёл отсечку этапа 4: исполнение закрывает вклад регистра «Продажи и закупки» и признаёт выручку; «Сделать акт» в документообороте выпускает бумагу и проводит исполнение одной командой
    execution_cutover: bool
    warehouse_id: "UUID"
    basis_id: "UUID"
    delivery_date: str
    due_date: str
    manager_note: str
    comment: str
    buyer: "CoreOrderBuyer"
    source_system: str
    external_id: str
    cabinet_status_id: "UUID"
    cabinet_status_name: str
    funnel_id: "UUID"
    closed_at: str
    closed_reason: str
    close_document_id: "UUID"
    migrated_from: str
    #: Этапы работ продажи или закупки (этап 4 ERP-1427)
    stages: List["CoreOrderStage"]
    #: График оплат продажи или закупки; id строки — разрез stage регистра расчётов
    payment_terms: List["CoreOrderPaymentTerm"]
    created_by: int
    posted_at: str
    cancelled_at: str
    obligation: "CoreOrderObligation"
    #: Только в карточке и ответах команд
    allowed_actions: List["CoreOrderAllowedAction"]
    #: Только в карточке: строки со ставкой, названной человеком, равной прежней общей ставке юрлица, когда на сегодня общая ставка уже другая — «проверьте ставку», не отказ
    vat_warnings: List["CoreOrderVATWarning"]

class _CoreOrderAllowedActionRequired(TypedDict):
    action: Literal['edit', 'confirm', 'cancel', 'close', 'reopen', 'cabinet_status', 'responsibles', 'contract']
    allowed: bool

class CoreOrderAllowedAction(_CoreOrderAllowedActionRequired, total=False):
    #: Код отказа: core.trade.has_executions, core.trade.has_dependents (оплаты, авансы, черновики исполнений), core.trade.closed, core.trade.forbidden
    reason_code: str
    #: Причина словами на языке запроса
    reason: str

class CoreOrderBuyer(TypedDict, total=False):
    """Покупатель-физлицо: розничный продажа или закупка стоит на общей карточке покупателя, и различает покупателей только это."""

    name: str
    phone: str
    email: str

class CoreOrderCabinetStatusInput(TypedDict):
    status_id: "UUID"

class CoreOrderCloseInput(TypedDict, total=False):
    #: Почему остаток больше не нужен
    reason: str

class CoreOrderCounterparty(TypedDict, total=False):
    """Покупатель загрузки без id: юрлицо узнаётся по ИНН и КПП, физлицо — по телефону или заводится."""

    name: str
    inn: str
    kpp: str
    phone: str
    email: str

class _CoreOrderEventRequired(TypedDict):
    id: "UUID"
    order_id: "UUID"
    #: created, revised, confirmed, cancelled, closed, reopened, status, responsibles, import, migrated, executing, executed, execution_reverted (состояние исполнения сменилось само после акта, отгрузки, приёмки, их отмены или возврата: payload state, previous_state, baseline — true у строки досева продажи или закупки, исполненного до появления этих событий, без вебхука; автор — система; execution_reverted — продажа или закупка снова confirmed), step (срок шага воронки: payload step_key, step_title, due_date, previous_due_date, shifted), automation (сработало правило: payload rule_id, rule_name, funnel_name, event_type, commands, failed)
    kind: str
    created_at: str

class CoreOrderEvent(_CoreOrderEventRequired, total=False):
    detail: str
    effective_date: str
    status_id: "UUID"
    actor_id: int
    actor_kind: Literal['user', 'app', 'system']
    actor_name: str
    status_name: str
    #: Разница версий: у revised — версия и что изменилось
    payload: Dict[str, Any]

class CoreOrderFunnel(TypedDict):
    id: "UUID"
    side: Literal['sale', 'purchase']
    name: str
    source: str
    is_default: bool
    is_archived: bool
    version: int
    steps: List["CoreOrderFunnelStep"]
    stages: List["CoreOrderFunnelStage"]
    updated_at: str

class CoreOrderFunnelChoice(TypedDict):
    #: null — продажа или закупка без воронки
    funnel_id: Optional["UUID"]

class _CoreOrderFunnelInputRequired(TypedDict):
    side: Literal['sale', 'purchase']
    name: str

class CoreOrderFunnelInput(_CoreOrderFunnelInputRequired, total=False):
    #: Источник заказа: общий вид или точное приложение app.издатель.ключ; точное приложение имеет приоритет. Пусто — по источнику не выбирать
    source: str
    #: Воронка стороны по умолчанию — одна на сторону
    is_default: bool
    is_archived: bool
    steps: List["CoreOrderFunnelStep"]
    stages: List["CoreOrderFunnelStage"]

class CoreOrderFunnelList(TypedDict):
    funnels: List["CoreOrderFunnel"]

class _CoreOrderFunnelStageRequired(TypedDict):
    name: str
    category: "CoreOrderState"

class CoreOrderFunnelStage(_CoreOrderFunnelStageRequired, total=False):
    id: "UUID"
    color: str
    position: int

class _CoreOrderFunnelStepRequired(TypedDict):
    kind: Literal['contract', 'approval', 'prepayment_invoice', 'payment', 'shipment', 'act', 'upd', 'closing', 'custom']
    title: str

class CoreOrderFunnelStep(_CoreOrderFunnelStepRequired, total=False):
    #: Пусто — вид и номер шага
    key: str
    #: Участвует ли шаг в воронке: ненужный шаг продаже или закупке не строится
    required: bool
    due: "CoreOrderFunnelStepDue"
    #: Что закрывает шаг: manual — человек отметит (пусто так же); state:<состояние> — продажа или закупка дошёл до состояния; paid:<N> — оплачено не меньше N % суммы продажи или закупки (финансы); paper:act_signed, paper:upd_signed — контрагент подписал акт или УПД в ЭДО (документооборот)
    done_when: str
    #: За сколько дней до срока прийти событию «срок подходит»
    remind_days: int

class CoreOrderFunnelStepDue(TypedDict, total=False):
    #: От чего считается срок; пусто — без срока
    after: Literal['', 'created', 'confirmed', 'delivery_date']
    days: int

class CoreOrderFunnelTemplate(TypedDict):
    key: str
    name: str
    description: str
    funnel: "CoreOrderFunnelInput"

class CoreOrderFunnelTemplateList(TypedDict):
    templates: List["CoreOrderFunnelTemplate"]

class _CoreOrderFunnelVersionRequired(TypedDict):
    version: int
    document: "CoreOrderFunnelInput"
    created_at: str

class CoreOrderFunnelVersion(_CoreOrderFunnelVersionRequired, total=False):
    author_user_id: int

class CoreOrderFunnelVersionList(TypedDict):
    versions: List["CoreOrderFunnelVersion"]

class _CoreOrderFunnelViewRequired(TypedDict):
    steps: List["CoreOrderStepState"]

class CoreOrderFunnelView(_CoreOrderFunnelViewRequired, total=False):
    funnel_id: "UUID"
    funnel_name: str

class CoreOrderHistory(TypedDict):
    events: List["CoreOrderEvent"]
    documents: List["CoreOrderHistoryDocument"]

class _CoreOrderHistoryDocumentRequired(TypedDict):
    source: str
    module: str
    section: str
    id: "UUID"
    kind: str
    number: str
    date: str
    status: str
    created_at: str

class CoreOrderHistoryDocument(_CoreOrderHistoryDocumentRequired, total=False):
    """Документ модуля, выросший из продажи или закупки: акт, отгрузка, счёт."""

    kind_name: str
    due_date: str
    amount: str
    currency: str
    direction: str
    #: Эквайер подтверждённой оплаты картой; только у документа оплаты. Внешний номер платежа не раскрывается.
    provider: str
    status_name: str
    title: str

class _CoreOrderImportEntryRequired(TypedDict):
    id: "UUID"
    side: "CoreOrderSide"
    external_id: str
    source: str
    outcome: Literal['accepted', 'updated', 'rejected']
    created_at: str

class CoreOrderImportEntry(_CoreOrderImportEntryRequired, total=False):
    reason: str
    detail: str
    order_id: "UUID"

class _CoreOrderImportInputRequired(TypedDict):
    side: "CoreOrderSide"
    date: str
    currency: str
    lines: List["CoreOrderLineInput"]
    #: Номер продажи или закупки у источника; по стороне и нему узнаётся повтор
    external_id: str

class CoreOrderImportInput(_CoreOrderImportInputRequired, total=False):
    #: Свой номер; пусто — номер выдаёт счётчик вида
    number: str
    business_id: "UUID"
    company_id: "UUID"
    #: Контрагент; у загрузки вместо него можно прислать counterparty
    contact_id: "UUID"
    counterparty: "CoreOrderCounterparty"
    contract_id: "UUID"
    project_id: "UUID"
    #: Подразделение продажи или закупки — элемент справочника «Подразделения»; наследуют исполнения и себестоимость (КЦ § 4.4)
    department_id: Dict[str, Any]
    #: ЦФО продажи или закупки — элемент справочника «ЦФО»; наследуют исполнения и себестоимость (КЦ § 4.4)
    cfo_id: Dict[str, Any]
    warehouse_id: "UUID"
    #: Основание — например, заявка на закупку
    basis_id: "UUID"
    title: str
    #: Цены с НДС («в том числе»); по умолчанию true
    prices_include_vat: bool
    #: Скидка на продажу или закупку целиком; раскладывается по строкам пропорционально их суммам до НДС
    discount: str
    delivery_date: str
    due_date: str
    scenario: Literal['one_off_sale', 'contract_sale', 'self_service']
    manager_note: str
    comment: str
    buyer: "CoreOrderBuyer"
    responsibles: List["CoreOrderResponsible"]
    cabinet_status_id: "UUID"
    #: Подтвердить продажу или закупку, если он ещё черновик
    confirm: bool
    #: Имя источника для журнала загрузок: сайт, CRM
    source_system: str
    #: Необязательная действующая воронка этой стороны в данном кабинете. Выбирается атомарно с созданием продажи или закупки; повтор с другим funnel_id возвращает 409, неверная или архивная воронка — 422. Без поля действует воронка договора, источника или умолчание.
    funnel_id: "UUID"

class CoreOrderImportList(TypedDict):
    items: List["CoreOrderImportEntry"]

class _CoreOrderInputRequired(TypedDict):
    side: "CoreOrderSide"
    date: str
    currency: str
    lines: List["CoreOrderLineInput"]

class CoreOrderInput(_CoreOrderInputRequired, total=False):
    """Продажа или закупка из запроса: поля одни для формы, загрузки и фасадов модулей."""

    #: Свой номер; пусто — номер выдаёт счётчик вида
    number: str
    business_id: "UUID"
    company_id: "UUID"
    #: Контрагент; у загрузки вместо него можно прислать counterparty
    contact_id: "UUID"
    counterparty: "CoreOrderCounterparty"
    contract_id: "UUID"
    project_id: "UUID"
    #: Подразделение продажи или закупки — элемент справочника «Подразделения»; наследуют исполнения и себестоимость (КЦ § 4.4)
    department_id: Dict[str, Any]
    #: ЦФО продажи или закупки — элемент справочника «ЦФО»; наследуют исполнения и себестоимость (КЦ § 4.4)
    cfo_id: Dict[str, Any]
    #: Статья исполнений продажи или закупки; не названа при правке — сохраняется прежняя
    pnl_item_id: Dict[str, Any]
    warehouse_id: "UUID"
    #: Основание — например, заявка на закупку
    basis_id: "UUID"
    title: str
    #: Цены с НДС («в том числе»); по умолчанию true
    prices_include_vat: bool
    #: Скидка на продажу или закупку целиком; раскладывается по строкам пропорционально их суммам до НДС
    discount: str
    delivery_date: str
    due_date: str
    scenario: Literal['one_off_sale', 'contract_sale', 'self_service']
    manager_note: str
    comment: str
    buyer: "CoreOrderBuyer"
    responsibles: List["CoreOrderResponsible"]
    #: Этапы работ целиком, правка по id; не названы — не меняются
    stages: List["CoreOrderStage"]
    #: График оплат целиком, правка по id; не назван — не меняется
    payment_terms: List["CoreOrderPaymentTerm"]
    cabinet_status_id: "UUID"
    #: Сразу подтвердить созданный продажу или закупку
    confirm: bool

class _CoreOrderLineRequired(TypedDict):
    id: "UUID"
    position: int
    kind: "CoreOrderLineKind"
    title: str
    #: Десятичное число строкой
    quantity: str
    #: Десятичное число строкой
    price: str
    #: Скидка самой строки
    discount: str
    #: Доля скидки продажи или закупки на этой строке; суммы строки посчитаны после обеих скидок
    discount_amount: str
    #: Сумма строкой в разрядности валюты продажи или закупки
    amount_net: str
    #: Сумма строкой в разрядности валюты продажи или закупки
    vat_amount: str
    #: Сумма строкой в разрядности валюты продажи или закупки
    amount_gross: str

class CoreOrderLine(_CoreOrderLineRequired, total=False):
    product_id: "UUID"
    unit: str
    unit_id: "UUID"
    #: Ставка, как её ввели; пусто — по учётной политике
    vat_rate: str
    #: Ставка, по которой строка посчитана; пусто — налог не выделен
    vat_rate_applied: str
    #: Количество в базовой единице склада
    base_qty: str
    basis_document_id: "UUID"
    basis_line_id: "UUID"

class _CoreOrderLineInputRequired(TypedDict):
    title: str
    #: Десятичное число строкой
    quantity: str
    #: Десятичное число строкой
    price: str

class CoreOrderLineInput(_CoreOrderLineInputRequired, total=False):
    #: Id существующей строки — её правка; без id — новая строка
    id: "UUID"
    kind: "CoreOrderLineKind"
    product_id: "UUID"
    #: Артикул — позиция узнаётся по нему, если id не назван
    article: str
    unit: str
    unit_id: "UUID"
    #: Десятичное число строкой
    discount: str
    #: Ставка НДС строки; пусто — по учётной политике юрлица на дату продажи или закупки
    vat_rate: str
    #: Десятичное число строкой
    base_qty: str
    basis_document_id: "UUID"
    basis_line_id: "UUID"

CoreOrderLineKind = Literal['goods', 'service', 'material', 'semi_product']

class CoreOrderNowAct(TypedDict, total=False):
    """Реквизиты акта; пусто — дата продажи или закупки, номер по счётчику, название по продаже или закупке"""

    date: str
    number: str
    title: str

class _CoreOrderNowExecutionRequired(TypedDict):
    owner: Literal['docflow', 'finance']

class CoreOrderNowExecution(_CoreOrderNowExecutionRequired, total=False):
    """Что выпустил владелец исполнения. docflow — бумага документооборота (paper_*), при финансах после отсечки — с учётным документом исполнения (execution_*); finance — акт финансов без бумаги."""

    paper_id: "UUID"
    paper_number: str
    #: registered — бумага с проведённым исполнением; draft — бумага без книги (финансы выключены)
    paper_status: str
    execution_id: "UUID"
    execution_number: str

class _CoreOrderNowInputRequired(TypedDict):
    side: "CoreOrderSide"
    date: str
    currency: str
    lines: List["CoreOrderLineInput"]
    #: Номер продажи или закупки у источника; по стороне и нему узнаётся повтор
    external_id: str

class CoreOrderNowInput(_CoreOrderNowInputRequired, total=False):
    """Продажа или закупка целиком, его внешний номер и акт. Поля продажи или закупки — те же, что у загрузки; подтверждение подразумевается."""

    #: Свой номер; пусто — номер выдаёт счётчик вида
    number: str
    business_id: "UUID"
    company_id: "UUID"
    #: Контрагент; вместо него можно прислать counterparty
    contact_id: "UUID"
    counterparty: "CoreOrderCounterparty"
    contract_id: "UUID"
    project_id: "UUID"
    #: Подразделение продажи или закупки — элемент справочника «Подразделения»; наследуют исполнения и себестоимость (КЦ § 4.4)
    department_id: Dict[str, Any]
    #: ЦФО продажи или закупки — элемент справочника «ЦФО»; наследуют исполнения и себестоимость (КЦ § 4.4)
    cfo_id: Dict[str, Any]
    #: Статья выручки (у закупки — расхода) исполнения; пусто — по учётной политике бизнеса
    pnl_item_id: Dict[str, Any]
    warehouse_id: "UUID"
    basis_id: "UUID"
    title: str
    #: Цены с НДС («в том числе»); по умолчанию true
    prices_include_vat: bool
    discount: str
    delivery_date: str
    due_date: str
    scenario: Literal['one_off_sale', 'contract_sale', 'self_service']
    manager_note: str
    comment: str
    buyer: "CoreOrderBuyer"
    responsibles: List["CoreOrderResponsible"]
    stages: List["CoreOrderStage"]
    payment_terms: List["CoreOrderPaymentTerm"]
    cabinet_status_id: "UUID"
    #: Имя источника: сайт, CRM, маркетплейс
    source_system: str
    act: "CoreOrderNowAct"

class CoreOrderNowResult(TypedDict):
    order: "CoreOrder"
    execution: "CoreOrderNowExecution"
    #: true — продажа или закупка уже был исполнен этой командой; ничего не записано
    replayed: bool

class CoreOrderObligation(TypedDict):
    #: Действующий приход подтверждения в регистре «Продажи и закупки»
    ordered: str
    #: Остаток портфеля продажи или закупки в регистре «Продажи и закупки»: заказано минус снятое закрытием. Это не денежный долг: долг контрагента и зачёт аванса живут в расчётах (settlement), и при «Долг 0,00» этот остаток остаётся полным. До этапа 4 исполнение его не уменьшает, поэтому это и не «осталось исполнить»
    remaining: str
    #: Исполнено: сумма проведённых исполнений продажи или закупки (акт, продажа, закупка, приёмка) за вычетом возвратов, в валюте продажи или закупки. То же число, что в журнале продаж и закупок финансов (core_order_executed)
    executed: str
    #: Осталось исполнить: заказано минус исполнено, не меньше нуля
    remaining_to_execute: str

class _CoreOrderPageRequired(TypedDict):
    items: List["CoreOrder"]
    #: Сколько продаж или закупок под отбором всего
    total: int
    limit: int
    offset: int
    has_more: bool

class CoreOrderPage(_CoreOrderPageRequired, total=False):
    #: Только с with=counts: число продаж или закупок по состояниям при том же отборе без отбора состояний
    state_counts: Dict[str, int]

class CoreOrderPaymentTerm(TypedDict, total=False):
    """Строка графика оплат продажи или закупки — когда и сколько платят (ERP-1427, этап 4)."""

    id: "UUID"
    position: int
    title: str
    amount: str
    due_date: str
    #: '' — срок датой; after_stage — через delay_days после исполнения этапа stage_id
    due_trigger: Literal['', 'after_stage']
    stage_id: "UUID"
    delay_days: int

class _CoreOrderProgressRequired(TypedDict):
    executed: str

class CoreOrderProgress(_CoreOrderProgressRequired, total=False):
    """Ход продажи или закупки для строки списка (with=progress). executed — исполнено в валюте продажи или закупки; paid — оплачено, нет поля — финансы выключены; papers — счёт, акт и УПД: done — есть, wait — ждём подписи, нет ключа — нет; нет поля — документооборот выключен."""

    paid: str
    papers: Dict[str, Literal['done', 'wait']]

class _CoreOrderResponsibleRequired(TypedDict):
    employee_id: "UUID"
    #: Доля в процентах: больше нуля, не больше ста
    share: str

class CoreOrderResponsible(_CoreOrderResponsibleRequired, total=False):
    employee_name: str

class CoreOrderResponsiblesInput(TypedDict):
    responsibles: List["CoreOrderResponsible"]

class CoreOrderRevenueItemRule(TypedDict, total=False):
    kind: Literal['goods', 'service']
    item_id: "UUID"
    item_name: str
    valid_from: str

class _CoreOrderRevisionRequired(TypedDict):
    side: "CoreOrderSide"
    date: str
    currency: str
    lines: List["CoreOrderLineInput"]

class CoreOrderRevision(_CoreOrderRevisionRequired, total=False):
    #: Свой номер; пусто — номер выдаёт счётчик вида
    number: str
    business_id: "UUID"
    company_id: "UUID"
    #: Контрагент; у загрузки вместо него можно прислать counterparty
    contact_id: "UUID"
    counterparty: "CoreOrderCounterparty"
    contract_id: "UUID"
    project_id: "UUID"
    #: Подразделение продажи или закупки — элемент справочника «Подразделения»; наследуют исполнения и себестоимость (КЦ § 4.4)
    department_id: Dict[str, Any]
    #: ЦФО продажи или закупки — элемент справочника «ЦФО»; наследуют исполнения и себестоимость (КЦ § 4.4)
    cfo_id: Dict[str, Any]
    warehouse_id: "UUID"
    #: Основание — например, заявка на закупку
    basis_id: "UUID"
    title: str
    #: Цены с НДС («в том числе»); по умолчанию true
    prices_include_vat: bool
    #: Скидка на продажу или закупку целиком; раскладывается по строкам пропорционально их суммам до НДС
    discount: str
    delivery_date: str
    due_date: str
    scenario: Literal['one_off_sale', 'contract_sale', 'self_service']
    manager_note: str
    comment: str
    buyer: "CoreOrderBuyer"
    responsibles: List["CoreOrderResponsible"]
    #: Этапы работ целиком, правка по id; не названы — не меняются
    stages: List["CoreOrderStage"]
    #: График оплат целиком, правка по id; не назван — не меняется
    payment_terms: List["CoreOrderPaymentTerm"]
    cabinet_status_id: "UUID"
    #: Версия, которую видел правящий; 0 — без сверки
    expected_version: int

CoreOrderSide = Literal['sale', 'purchase']

CoreOrderSourceKind = Literal['manual', 'app', 'import', 'marketplace', 'crm', 'migration', 'contract']

class CoreOrderStage(TypedDict, total=False):
    """Этап работ продажи или закупки — что и когда сдаём (ERP-1427, этап 4)."""

    id: "UUID"
    position: int
    title: str
    planned_date: str
    #: Сумма этапа в валюте продажи или закупки с налогом
    amount: str
    #: Строки продажи или закупки, которые закрывает этап; пусто — строки-услуги по порядку
    line_ids: List["UUID"]

CoreOrderState = Literal['draft', 'confirmed', 'executing', 'executed', 'closed', 'cancelled']

class _CoreOrderStatusRequired(TypedDict):
    id: "UUID"
    name: str
    category: "CoreOrderState"
    position: int
    is_active: bool
    is_system: bool

class CoreOrderStatus(_CoreOrderStatusRequired, total=False):
    #: Есть только у системной строки
    key: str
    #: Пусто — статус годится обеим сторонам
    side: Literal['', 'sale', 'purchase']
    color: str
    funnel_id: "UUID"

class CoreOrderStatusList(TypedDict):
    items: List["CoreOrderStatus"]

class _CoreOrderStepDueInputRequired(TypedDict):
    due_date: str

class CoreOrderStepDueInput(_CoreOrderStepDueInputRequired, total=False):
    #: Сдвинуть следующие невыполненные шаги с датой на ту же разницу
    shift_next: bool

class _CoreOrderStepStateRequired(TypedDict):
    key: str
    kind: str
    title: str
    position: int
    status: Literal['done', 'overdue', 'waiting']

class CoreOrderStepState(_CoreOrderStepStateRequired, total=False):
    due_date: str
    done_at: str
    #: Что закрывает шаг; manual — отмечает человек
    done_when: str

class _CoreOrderTemplateRequired(TypedDict):
    id: "UUID"
    side: Literal['sale', 'purchase']
    state: Literal['active', 'paused', 'archived']
    order: "CoreOrderInput"
    schedule: "CoreOrderTemplateSchedule"
    actions: "CoreOrderTemplateActions"
    version: int
    #: Сумма строк шаблона — подсказка списка.
    amount: str

class CoreOrderTemplate(_CoreOrderTemplateRequired, total=False):
    resumed_from: str
    created_by: int
    updated_by: int
    created_at: str
    updated_at: str
    contact_name: str
    contract_number: str
    contract_date: str
    department_name: str
    upcoming: List["CoreOrderTemplateRun"]
    last_run: str
    last_error: str
    #: Причина отказа последнего срабатывания словами.
    last_error_text: str

class CoreOrderTemplateActions(TypedDict, total=False):
    #: Провести продажу или закупку сразу; false — черновик.
    confirm: bool
    invoice: Literal['', 'issue', 'draft']
    invoice_days: int
    closing: Literal['', 'upd', 'act']
    closing_when: Literal['', 'on_order', 'after_days', 'period_end']
    closing_days: int

class _CoreOrderTemplateInputRequired(TypedDict):
    order: "CoreOrderInput"
    schedule: "CoreOrderTemplateSchedule"

class CoreOrderTemplateInput(_CoreOrderTemplateInputRequired, total=False):
    actions: "CoreOrderTemplateActions"
    #: Только при правке.
    expected_version: int

class CoreOrderTemplateList(TypedDict):
    results: List["CoreOrderTemplate"]
    total: int

class _CoreOrderTemplateRunRequired(TypedDict):
    key: str
    date: str

class CoreOrderTemplateRun(_CoreOrderTemplateRunRequired, total=False):
    invoice_date: str
    closing_date: str

CoreOrderTemplateSchedule = TypedDict("CoreOrderTemplateSchedule", {"period": Literal['month', 'quarter', 'week'], "day": int, "from": str, "until": str}, total=False)

class CoreOrderTemplateStateInput(TypedDict):
    state: Literal['active', 'paused', 'archived']
    expected_version: int

class CoreOrderTotals(TypedDict):
    """Итоги — сумма строк: скидка продажи или закупки уже разложена по строкам и второй раз не вычитается."""

    #: Сумма строкой в разрядности валюты продажи или закупки
    net: str
    #: Сумма строкой в разрядности валюты продажи или закупки
    vat: str
    #: Сумма строкой в разрядности валюты продажи или закупки
    gross: str
    #: Сумма строкой в разрядности валюты продажи или закупки
    goods_gross: str
    #: Сумма строкой в разрядности валюты продажи или закупки
    services_gross: str
    currency: str

class CoreOrderVATWarning(TypedDict):
    line_id: "UUID"
    title: str
    #: Ставка строки, названная человеком
    rate: str
    #: Общая ставка юрлица на дату
    general: str
    date: str

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

class _CorePolicyAccountableDaysVersionRequired(TypedDict):
    id: "UUID"
    #: Начало версии; 0001-01-01 означает «с начала учёта»
    valid_from: str
    days: int

class CorePolicyAccountableDaysVersion(_CorePolicyAccountableDaysVersionRequired, total=False):
    #: Последний день версии; отсутствует у открытой версии
    valid_to: str

class _CorePolicyPayrollOfficialInputRequired(TypedDict):
    #: 0001-01-01 — с начала учёта
    valid_from: str
    #: Вся начисленная зарплата отражается в бухгалтерии
    all_official: bool

class CorePolicyPayrollOfficialInput(_CorePolicyPayrollOfficialInputRequired, total=False):
    #: Источник официальной части; обязателен при all_official = false
    payroll_source: Literal['manual', 'onec_bp', 'onec_zup']

class _CorePolicyPayrollOfficialVersionRequired(TypedDict):
    id: "UUID"
    #: Начало версии; 0001-01-01 означает «с начала учёта»
    valid_from: str
    #: Вся начисленная зарплата отражается в бухгалтерии
    all_official: bool

class CorePolicyPayrollOfficialVersion(_CorePolicyPayrollOfficialVersionRequired, total=False):
    #: Последний день версии; отсутствует у открытой версии
    valid_to: str
    #: Источник официальной части; нет при all_official
    source: Literal['manual', 'onec_bp', 'onec_zup']

class _CorePolicyPeriodRequired(TypedDict):
    id: "UUID"
    #: Начало версии; 0001-01-01 означает «с начала учёта»
    valid_from: str

class CorePolicyPeriod(_CorePolicyPeriodRequired, total=False):
    #: Последний день версии; отсутствует у открытой версии
    valid_to: str

class _CorePolicyTaxModeVersionRequired(TypedDict):
    id: "UUID"
    #: Начало версии; 0001-01-01 означает «с начала учёта»
    valid_from: str
    mode: Literal['deductible', 'non_deductible', 'none']
    #: Налоговая валюта юрлица: в ней ведутся суммы налога регистров НДС и документа «НДС за квартал». По умолчанию RUB.
    tax_currency: str

class CorePolicyTaxModeVersion(_CorePolicyTaxModeVersionRequired, total=False):
    #: Последний день версии; отсутствует у открытой версии
    valid_to: str

class _CorePolicyTaxRegimeInputRequired(TypedDict):
    #: 0001-01-01 — с начала учёта
    valid_from: str
    regime: Literal['osno', 'usn_income', 'usn_income_expense', 'ausn_income', 'ausn_income_expense', 'eshn', 'psn', 'npd']

class CorePolicyTaxRegimeInput(_CorePolicyTaxRegimeInputRequired, total=False):
    #: Ставка режима, от 0 до 100; обязательна, кроме ПСН и НПД
    regime_rate: str
    #: ИП совмещает основной режим с патентом; только ОСНО, УСН или ЕСХН
    patent: bool

class _CorePolicyTaxRegimeVersionRequired(TypedDict):
    id: "UUID"
    #: Начало версии; 0001-01-01 означает «с начала учёта»
    valid_from: str
    regime: Literal['osno', 'usn_income', 'usn_income_expense', 'ausn_income', 'ausn_income_expense', 'eshn', 'psn', 'npd']
    #: Вместе с основным режимом ИП применяет патент
    patent: bool

class CorePolicyTaxRegimeVersion(_CorePolicyTaxRegimeVersionRequired, total=False):
    #: Последний день версии; отсутствует у открытой версии
    valid_to: str
    #: Ставка основного режима в процентах с двумя знаками; нет — не задана (у ПСН и НПД необязательна)
    rate: str

class _CorePolicyVATPendingVersionRequired(TypedDict):
    id: "UUID"
    #: Начало версии; 0001-01-01 означает «с начала учёта»
    valid_from: str
    months: int

class CorePolicyVATPendingVersion(_CorePolicyVATPendingVersionRequired, total=False):
    #: Последний день версии; отсутствует у открытой версии
    valid_to: str

class _CorePolicyVATPresentationVersionRequired(TypedDict):
    id: "UUID"
    #: Начало версии; 0001-01-01 означает «с начала учёта»
    valid_from: str
    presentation: Literal['gross', 'net']

class CorePolicyVATPresentationVersion(_CorePolicyVATPresentationVersionRequired, total=False):
    #: Последний день версии; отсутствует у открытой версии
    valid_to: str

class _CorePolicyVATRatesVersionRequired(TypedDict):
    id: "UUID"
    #: Начало версии; 0001-01-01 означает «с начала учёта»
    valid_from: str
    #: Процент общей ставки с двумя знаками; пусто — вид не заведён
    general: str
    #: Процент льготной ставки с двумя знаками; пусто — вид не заведён
    reduced: str

class CorePolicyVATRatesVersion(_CorePolicyVATRatesVersionRequired, total=False):
    #: Последний день версии; отсутствует у открытой версии
    valid_to: str

class _CoreProductRequired(TypedDict):
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
    #: Закупочная цена десятичной строкой; подставляется в строку приёмки
    purchase_price: str
    #: Устарело (ERP-484): снимается, ставка определяется видом товара (vat_kind) и налоговой политикой юрлица на дату документа. Всегда пустая строка
    vat_rate: str
    #: Вес одной базовой единицы, кг; пусто — не задан
    weight_kg: str
    #: Объём одной базовой единицы, м³; пусто — не задан
    volume_m3: str
    #: Длина, мм; пусто — не задана
    length_mm: str
    #: Ширина, мм; пусто — не задана
    width_mm: str
    #: Высота, мм; пусто — не задана
    height_mm: str
    #: Страна происхождения — запись справочника countries (код ОКСМ в code)
    country_item_id: Optional["UUID"]
    #: Код ТН ВЭД, до десяти цифр
    customs_code: str
    #: Название страны происхождения; пусто без страны
    country_label: str
    #: Оси характеристик семейства; у остальных записей пусто
    option_schema: List["CoreProductAxis"]
    #: Значения варианта по осям семейства: ось → код; у остальных записей пусто
    variant_values: Dict[str, str]

class CoreProduct(_CoreProductRequired, total=False):
    #: Вид ставки НДС товара: общая, льготная, нулевая, без НДС; пусто — общая. Процент берётся у юрлица на дату документа (учётная политика)
    vat_kind: Literal['', 'general', 'reduced', 'zero', 'exempt']

class CoreProductAxis(TypedDict):
    #: Ключ оси: латиница, цифры, _ и -
    key: str
    label: str
    values: List["CoreProductAxisValue"]

class CoreProductAxisValue(TypedDict):
    #: Машинный код значения: латиница, цифры, _ и -
    code: str
    #: Подпись значения; пусто — код
    label: str

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
    #: Хранится на складе. У услуги (kind=service) всегда false: сочетание service + true отклоняется 400. Позицию со складскими движениями нельзя перевести в услугу или снять с неё признак — 409 (ERP-1547)
    is_stockable: bool
    is_purchasable: bool
    is_producible: bool
    category_id: Optional["UUID"]
    record_kind: "CoreProductRecordKind"
    parent_product_id: Optional["UUID"]
    custom: Dict[str, Any]
    #: Штрихкод и артикулы с формы создания; ложатся в той же транзакции, что и карточка. Занятый код отклоняет создание целиком (409).
    identifiers: List["CoreProductIdentifierInput"]
    #: Закупочная цена десятичной строкой; подставляется в строку приёмки
    purchase_price: str
    #: Вид ставки НДС товара: общая, льготная, нулевая, без НДС; пусто — общая. Процент берётся у юрлица на дату документа (учётная политика)
    vat_kind: Literal['', 'general', 'reduced', 'zero', 'exempt']
    #: Вес одной базовой единицы, кг; пусто — не задан
    weight_kg: str
    #: Объём одной базовой единицы, м³; пусто — не задан
    volume_m3: str
    #: Длина, мм; пусто — не задана
    length_mm: str
    #: Ширина, мм; пусто — не задана
    width_mm: str
    #: Высота, мм; пусто — не задана
    height_mm: str
    #: Страна происхождения — запись справочника countries (код ОКСМ в code)
    country_item_id: Optional["UUID"]
    #: Код ТН ВЭД, до десяти цифр
    customs_code: str
    #: Оси характеристик семейства; у остальных записей пусто
    option_schema: List["CoreProductAxis"]
    #: Значения варианта по осям семейства: ось → код; у остальных записей пусто
    variant_values: Dict[str, str]

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
    #: Панель карточки, в которой показывается поле; пусто — общая панель дополнительных реквизитов
    group: str
    #: Закреплённая характеристика: под названием в шапке карточки и столбцом каталога
    pinned: bool
    #: Поле участвует в отборе каталога
    filterable: bool
    #: Категории (элементы справочника product_categories), у товаров которых и их потомков поле показывается; пусто — у всех
    category_ids: List["UUID"]
    #: Суффикс единицы после значения: кг, мм, мл
    unit_suffix: str

class CoreProductFieldSchema(TypedDict):
    fields: List["CoreProductFieldDefinition"]

class CoreProductFile(TypedDict):
    id: "UUID"
    product_id: "UUID"
    kind_item_id: Optional["UUID"]
    #: Код элемента справочника product_file_kinds; пусто без типа
    kind_code: str
    kind_label: str
    name: str
    mime_type: str
    size_bytes: int
    is_image: bool
    #: Основное фото товара; бывает только у изображения
    is_primary: bool
    sort_order: int
    uploaded_by_name: str
    created_at: str
    #: Вердикт антивируса; skipped — файл не проверялся (загружен формой). Ссылку на скачивание получают clean и skipped
    scan_status: Literal['pending', 'clean', 'infected', 'skipped']

class CoreProductFilePage(TypedDict):
    count: int
    results: List["CoreProductFile"]

class CoreProductFilePatch(TypedDict, total=False):
    #: Код типа из product_file_kinds; пустая строка снимает тип
    kind: str
    name: str
    #: true делает изображение основным фото
    is_primary: bool

class _CoreProductFileUploadRequestRequired(TypedDict):
    #: Имя файла с расширением
    name: str
    #: Точный размер файла в байтах
    size_bytes: int

class CoreProductFileUploadRequest(_CoreProductFileUploadRequestRequired, total=False):
    """Заявка на сессию загрузки файла или фото товара."""

    #: Тип содержимого; изображения — image/*
    mime_type: str
    #: Необязательная контрольная сумма SHA-256 строчными шестнадцатеричными знаками
    sha256: str
    #: Код типа файла из справочника product_file_kinds; изображению без кода достаётся photo
    kind: str

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
    #: Пространство имён: у артикулов обязателен (производитель, поставщик, код канала из справочника sales_channels); у штрихкода — код активного канала продаж этого кабинета либо global (по умолчанию), иное значение — 400. Значение штрихкода уникально по кабинету независимо от канала
    source_ref: str
    is_primary: bool
    #: У штрихкода: type ∈ ean13|ean8|upc_a|gtin14|code128 и product_uom_id упаковки. Названный type проверяется строго, включая контрольную цифру EAN/UPC/GTIN (400 с текстом ошибки). Без type символика угадывается по форме значения, и несошедшаяся контрольная цифра не отказ, а code128: догадка не вправе отвергать существующий код
    attrs: Dict[str, Any]

CoreProductIdentifierKind = Literal['manufacturer_article', 'supplier_article', 'channel_article', 'barcode']

class CoreProductIdentifierPage(TypedDict):
    count: int
    results: List["CoreProductIdentifier"]

class CoreProductIdentifierPatch(TypedDict, total=False):
    kind: "CoreProductIdentifierKind"
    #: Пространство имён: у артикулов обязателен; у штрихкода — код активного канала продаж этого кабинета либо global, иное значение — 400
    source_ref: str
    value: str
    is_primary: bool
    #: У штрихкода: type ∈ ean13|ean8|upc_a|gtin14|code128 и product_uom_id упаковки. Названный type проверяется строго, включая контрольную цифру EAN/UPC/GTIN (400 с текстом ошибки). Без type символика угадывается по форме значения, и несошедшаяся контрольная цифра не отказ, а code128. Поле заменяет объект целиком, а не сливается с прежним
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

class _CoreProductImportUploadSessionRequestRequired(TypedDict):
    kind: "CoreProductTransferKind"
    mode: "CoreProductImportMode"

class CoreProductImportUploadSessionRequest(_CoreProductImportUploadSessionRequestRequired, total=False):
    """Заявка на сессию загрузки файла импорта. filename и size — прежние имена name и size_bytes."""

    #: Имя файла с расширением xlsx, xls, ods, csv или tsv
    name: str
    #: Тип содержимого; по умолчанию — по расширению файла
    mime_type: str
    #: Точный размер файла в байтах
    size_bytes: int
    #: Необязательная контрольная сумма SHA-256 строчными шестнадцатеричными знаками
    sha256: str
    #: Прежнее имя поля name
    filename: str
    #: Прежнее имя поля size_bytes
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
    #: Хранится на складе. У услуги (kind=service) всегда false: сочетание service + true отклоняется 400. Позицию со складскими движениями нельзя перевести в услугу или снять с неё признак — 409 (ERP-1547)
    is_stockable: bool
    is_purchasable: bool
    is_producible: bool
    category_id: Optional["UUID"]
    folder_id: Optional["UUID"]
    #: Закупочная цена десятичной строкой; подставляется в строку приёмки
    purchase_price: str
    #: Вид ставки НДС товара: общая, льготная, нулевая, без НДС; пусто — общая. Процент берётся у юрлица на дату документа (учётная политика)
    vat_kind: Literal['', 'general', 'reduced', 'zero', 'exempt']
    #: Вес одной базовой единицы, кг; пусто — не задан
    weight_kg: str
    #: Объём одной базовой единицы, м³; пусто — не задан
    volume_m3: str
    #: Длина, мм; пусто — не задана
    length_mm: str
    #: Ширина, мм; пусто — не задана
    width_mm: str
    #: Высота, мм; пусто — не задана
    height_mm: str
    #: Страна происхождения — запись справочника countries (код ОКСМ в code)
    country_item_id: Optional["UUID"]
    #: Код ТН ВЭД, до десяти цифр
    customs_code: str
    #: Оси характеристик семейства; у остальных записей пусто
    option_schema: List["CoreProductAxis"]
    #: Значения варианта по осям семейства: ось → код; у остальных записей пусто
    variant_values: Dict[str, str]

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

class CoreSellerBank(TypedDict):
    #: Расчётный счёт получателя
    account: str
    #: Наименование банка
    bank: str
    #: БИК банка
    bik: str
    #: Корреспондентский счёт банка
    corr_account: str

class CoreSellerCompany(TypedDict):
    id: "UUID"
    #: Имя юрлица в кабинете
    name: str
    #: Полное наименование для счёта
    legal_name: str
    #: ИНН продавца
    inn: str
    #: КПП продавца, если есть
    kpp: str

class CoreSellerCompanyList(TypedDict):
    companies: List["CoreSellerCompany"]

class _CoreTrialBalanceRequired(TypedDict):
    date_from: str
    date_to: str
    currency: str
    rows: List["CoreTrialBalanceRow"]
    totals: "CoreTrialBalanceTotals"

class CoreTrialBalance(_CoreTrialBalanceRequired, total=False):
    accounting_basis: "AccountingBasis"
    #: При отборе по юрлицу — итоги проводок без юрлица за тот же период; только при доступе ко всей книге
    unassigned_company: "CoreTrialBalanceUnassignedCompany"

class CoreTrialBalanceUnassignedCompany(TypedDict):
    """При отборе по юрлицу — итоги проводок без юрлица за тот же период; только при доступе ко всей книге"""

    opening_debit: str
    opening_credit: str
    turnover_debit: str
    turnover_credit: str
    closing_debit: str
    closing_credit: str
    balanced: bool

class _CoreTrialBalanceRowRequired(TypedDict):
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

class CoreTrialBalanceRow(_CoreTrialBalanceRowRequired, total=False):
    contact_id: "UUID"
    employee_id: "UUID"

class CoreTrialBalanceTotals(TypedDict):
    opening_debit: str
    opening_credit: str
    turnover_debit: str
    turnover_credit: str
    closing_debit: str
    closing_credit: str
    balanced: bool

class _CoreUploadFinishResultRequired(TypedDict):
    session: "TransferSession"

class CoreUploadFinishResult(_CoreUploadFinishResultRequired, total=False):
    """Итог завершения сессии core: заведённый файл товара, запуск импорта, фото сотрудника или бланк юрлица."""

    product_file: "CoreProductFile"
    product_import: "CoreProductImportRun"
    employee_photo: "CorePhotoResult"
    letterhead: "CoreLetterhead"

class CredentialRequestGap(TypedDict):
    """Окно, в котором обращения были, а записей о них нет: очередь писателя переполнилась либо база кабинета не приняла пачку. Признание в НАШЕЙ аварии, и печатается оно обеим сторонам — страница без него читалась бы как полная история. Кабинета в окне нет ни у одной из дверей."""

    started_at: str
    ended_at: str
    #: Сколько обращений потеряно в этом окне
    dropped: int

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

class DashboardMetricDefinition(TypedDict):
    id: str
    module: str
    template: Literal['amount', 'trend', 'rows', 'tiles', 'bars', 'table']
    title: str
    description: str
    deeplink: str

class DashboardMetricSnapshot(TypedDict):
    id: str
    template: Literal['amount', 'trend', 'rows', 'tiles', 'bars', 'table']
    title: str
    value: str
    currency: str
    caption: str
    as_of: str
    deeplink: str
    points: List["DashboardMetricSnapshotPointsItem"]
    rows: List["DashboardMetricSnapshotRowsItem"]
    tiles: List["DashboardMetricSnapshotTilesItem"]
    bars: List["DashboardMetricSnapshotBarsItem"]
    columns: List["DashboardMetricSnapshotColumnsItem"]
    table: List["DashboardMetricSnapshotTableItem"]

class DashboardMetricSnapshotPointsItem(TypedDict):
    label: str
    value: str

class DashboardMetricSnapshotRowsItem(TypedDict):
    title: str
    value: str
    detail: str

class DashboardMetricSnapshotTilesItem(TypedDict):
    label: str
    value: str
    note: str
    tone: Literal['', 'positive', 'negative']

class DashboardMetricSnapshotBarsItem(TypedDict):
    title: str
    value: str
    note: str
    fill: float
    tone: Literal['', 'positive', 'negative']

class DashboardMetricSnapshotColumnsItem(TypedDict):
    title: str

class DashboardMetricSnapshotTableItem(TypedDict):
    title: str
    cells: List["DashboardMetricSnapshotTableItemCellsItem"]

class DashboardMetricSnapshotTableItemCellsItem(TypedDict):
    value: str
    tone: Literal['', 'positive', 'negative']

class _DeveloperAPICallRequired(TypedDict):
    installation_id: "UUID"
    method: str
    #: Шаблон маршрута, который издатель же и звал
    route: str
    entity: str
    shape: Literal['collection', 'record']
    bytes: int
    status: int
    #: Машинный код исхода, тот же, что уехал в теле отказа: одно событие не называется в двух местах разными словами
    outcome: str
    #: Сколько отвечали МЫ. Своё время издатель видит с сетью, наше — без
    duration_ms: int
    occurred_at: str

class DeveloperAPICall(_DeveloperAPICallRequired, total=False):
    """То же обращение глазами издателя. Правило отбора одно: издателю видно только то, что его собственный сервер уже держал в руках — он сам сформировал этот запрос и сам получил этот ответ. Чего нет: кабинета ни одним полем, идентификатора строки журнала, идентификатора выданного токена (нить в журнал установки, который принадлежит кабинету) и обращений кабинетными ключами."""

    rows: int

class DeveloperAPICallPage(TypedDict):
    calls: List["DeveloperAPICall"]
    gaps: List["CredentialRequestGap"]
    limit: int
    offset: int
    has_more: bool

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

class DeveloperAppBlockList(TypedDict):
    blocks: List["DeveloperManifestBlock"]

class _DeveloperAppInputRequired(TypedDict):
    #: Ключ приложения: строчные латинские буквы, цифры и дефисы. Издатель приезжает из владельца пространства имён и в теле не называется
    key: str

class DeveloperAppInput(_DeveloperAppInputRequired, total=False):
    #: Название, которое увидит администратор кабинета на экране согласия
    title: str

class _DeveloperAppKeyRequired(TypedDict):
    id: "UUID"
    app_id: "UUID"
    #: Человеческое имя ключа: вежливость, а не учётные данные
    name: str
    #: Последние знаки значения. Не секрет: по ним ключ не восстанавливается, а без них список не отвечает на вопрос «какой из них отзывать»
    hint: str
    issued_at: str
    revoke_reason: str

class DeveloperAppKey(_DeveloperAppKeyRequired, total=False):
    issued_by: "UUID"
    rotated_from_id: "UUID"
    rotated_at: str
    #: Конец перекрытия. Пусто у текущего ключа: он живёт до собственной ротации или отзыва
    expires_at: str
    revoked_at: str
    #: Когда этим ключом ходили в последний раз: единственный ответ на вопрос «можно ли уже отозвать вон тот»
    last_used_at: str

class DeveloperAppKeyInput(TypedDict, total=False):
    #: Человеческое имя ключа для списка
    name: str

class DeveloperAppKeyPage(TypedDict):
    keys: List["DeveloperAppKey"]

class DeveloperAppKeyRevocationInput(TypedDict, total=False):
    #: Почему ключ погашен
    reason: str

class DeveloperAppKeyRotationInput(TypedDict, total=False):
    #: Сколько часов доживает вытесненный ключ. Ноль — умолчание в сутки, а не «без перекрытия»
    overlap_hours: int

class DeveloperAppPage(TypedDict):
    apps: List["PlatformApp"]

class DeveloperAppResult(TypedDict):
    app: "PlatformApp"

class _DeveloperAppVersionInputRequired(TypedDict):
    #: Номер версии
    version: str
    #: Манифест версии целиком
    manifest: Dict[str, Any]

class DeveloperAppVersionInput(_DeveloperAppVersionInputRequired, total=False):
    #: Digest пакета: без него подмену артефакта не с чем сравнить
    manifest_digest: str
    #: Что версия просит; одобряет кабинет при установке
    requested_scopes: List[str]
    #: Отправить версию на ревью вместо черновика. Опубликовать этим полем нельзя: публикация идёт через ворота
    review: bool

class DeveloperAppVersionPage(TypedDict):
    app: "PlatformApp"
    versions: List["PlatformAppVersion"]

class DeveloperAppVersionResult(TypedDict):
    version: "PlatformAppVersion"

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

class _DeveloperDeliveryRequired(TypedDict):
    id: "UUID"
    event_id: "UUID"
    installation_id: "UUID"
    #: Тема подписки, объявленная манифестом самого издателя
    topic: str
    schema_version: int
    #: Когда произошёл факт, а не когда его отправили
    occurred_at: str
    status: Literal['pending', 'delivered', 'failed', 'dead']
    attempts: int
    next_attempt_at: str
    #: Адрес установки. Его называет издатель, а не кабинет, поэтому данных кабинета в нём нет по определению
    endpoint_url: str
    #: Каким ключом подписано. Не секрет: по нему приёмник выбирает, чем проверять, во время перекрытия
    signature_key_id: str

class DeveloperDelivery(_DeveloperDeliveryRequired, total=False):
    delivered_at: str
    dead_at: str
    #: Код ответа приёмника. Пусто означает, что ответа не было вовсе
    last_status_code: int
    replay_of_id: "UUID"

class DeveloperDeliveryPage(TypedDict):
    deliveries: List["DeveloperDelivery"]
    #: Глубина, которая реально применилась
    limit: int
    offset: int
    #: Признак, а не общее число: счёт по журналу — полный проход по истории кабинета ради числа, которое никому не нужно точным
    has_more: bool

class _DeveloperFunctionArtifactRowRequired(TypedDict):
    #: Отпечаток модуля: он и есть имя, под которым байты опознают
    digest: str
    #: Виды документа, на которых функция зовётся. ПУСТОЙ СПИСОК ОЗНАЧАЕТ «на всех», и это то же умолчание, что на экране согласия кабинета.
    document_types: List[str]
    #: Байты с этим отпечатком лежат у этой версии
    uploaded: bool

class DeveloperFunctionArtifactRow(_DeveloperFunctionArtifactRowRequired, total=False):
    #: Имя функции внутри приложения. У лишнего модуля его нет: манифест этих байтов не называет
    key: str
    #: Ключ точки расширения, на которой стоит функция
    point: str
    #: Размер модуля в байтах. Есть только у загруженного
    size: int
    #: Когда байты положили. Есть только у загруженного
    uploaded_at: str

class DeveloperFunctionArtifacts(TypedDict):
    version: str
    #: Состояние версии. Им объясняется, почему выпущенная версия байтов больше не принимает
    status: str
    #: Версия ещё принимает байты. Отдельным полем: выводить это из состояния — ошибиться в пользу разрешения
    editable: bool
    functions: List["DeveloperFunctionArtifactRow"]
    #: Отпечатки, которые лежат у версии, но манифестом не названы. Байты приняты и вреда не делают, но исполнены не будут никогда: диспетчер ходит от манифеста, а не от хранилища. Чаще всего это пересобранный модуль, под который забыли поправить отпечаток в манифесте.
    undeclared: List["DeveloperFunctionArtifactRow"]

class DeveloperFunctionArtifactsResult(TypedDict):
    functions: "DeveloperFunctionArtifacts"

class _DeveloperFunctionUploadRequired(TypedDict):
    #: Отпечаток, ПОСЧИТАННЫЙ по байтам. Присланный полем digest к этому моменту уже сверен
    digest: str
    size: int
    created_at: str
    #: Манифест версии называет этот отпечаток. Загрузка НЕ ОТКАЗЫВАЕТ модулю, которого манифест не называет: байты целы, а виноват может быть и файл, и манифест — какой из двух, решает издатель. Но узнать об этом он обязан сразу, а не от ворот публикации через день.
    declared: bool
    #: Модуль годен к исполнению: импорты по белому списку, оба экспорта ABI, память в пределах. При выключенной песочнице всегда true — рантайма нет, судить нечем.
    verified: bool

class DeveloperFunctionUpload(_DeveloperFunctionUploadRequired, total=False):
    #: Машинный код негодности: forbidden_import, abi_missing, module_invalid, verify_failed. Слова на двух языках собирает портал
    verify_reason: str
    #: То единственное, чего кодом не сказать: какой именно импорт запрещён, какого экспорта не хватает
    verify_detail: str

class DeveloperFunctionUploadResult(TypedDict):
    upload: "DeveloperFunctionUpload"

class _DeveloperGateCheckRequired(TypedDict):
    #: Какое ворот
    gate: Literal['publisher', 'scopes', 'sensitivity', 'endpoints', 'egress', 'manifest', 'scope_review', 'blocklist', 'functions']
    #: `awaiting_review` — ход за персоналом платформы: результат внешнего ворота либо не приносили вовсе, либо приносили для другого документа. Своё состояние, а не `failed`: чинить издателю там нечего, и общий ответ отправил бы его править исправный манифест.
    status: Literal['passed', 'failed', 'awaiting_review']
    #: Результат приносит не сервер — по нему видно, чинится ли отказ правкой манифеста
    external: bool

class DeveloperGateCheck(_DeveloperGateCheckRequired, total=False):
    #: Машинный код отказа: текст на двух языках собирает портал
    reason: str
    #: Что именно не подошло: имена прав, адреса, режим, отпечаток. Всё это издатель подал сам
    values: List[str]
    #: Когда внешнее ворот смотрели в последний раз; у несмотренного его нет
    checked_at: str

class _DeveloperInstallationRequired(TypedDict):
    id: "UUID"
    #: Версия, на которой стоит установка
    version: str
    status: "PlatformAppInstallationStatus"
    #: Приёмник признан мёртвым, и данные кабинета встали. Самое важное поле для издателя
    parked: bool
    installed_at: str
    updated_at: str

class DeveloperInstallation(_DeveloperInstallationRequired, total=False):
    parked_at: str

class DeveloperInstallationPage(TypedDict):
    installations: List["DeveloperInstallation"]

class DeveloperIssuedAppKey(TypedDict):
    key: "DeveloperAppKey"
    #: Значение ключа. Показывается ОДИН РАЗ и больше никогда: в хранилище лежит хеш, и второго способа его узнать не существует
    secret: str

class _DeveloperManifestBlockRequired(TypedDict):
    #: sha256 компактной формы документа — тот же отпечаток, который печатает отчёт готовности версии
    manifest_fingerprint: str
    #: Где документ впервые увидели. Улика, а не предмет запрета: тот же отпечаток у другого приложения закрыт этим же запретом
    publisher: str
    app_key: str
    reason_code: Literal['malicious', 'vulnerable', 'data_exfiltration', 'supply_chain', 'publisher_request']
    #: Объяснение словами. Наш текст, а не эхо чьих-то слов: его же читает кабинет в карточке уведомления
    summary: str
    blocked_at: str

class DeveloperManifestBlock(_DeveloperManifestBlockRequired, total=False):
    """Тот же запрет, что видит оператор, без одного поля: идентификатора сотрудника платформы, принявшего решение. Внешний контур — не место для наших внутренних идентификаторов, а имя решавшего превращает решение платформы в решение конкретного лица, с которым можно «договориться»."""

    #: Внешний https-адрес разбора: CVE, бюллетень, тикет
    advisory: str

class _DeveloperProfileRequired(TypedDict):
    account: "DeveloperAccount"
    #: Издатели, которыми распоряжается аккаунт
    publishers: List["PlatformAppPublisher"]

class DeveloperProfile(_DeveloperProfileRequired, total=False):
    application: "DeveloperApplication"

class DeveloperPublicationReport(TypedDict):
    version: str
    #: Состояние версии: черновик, на ревью, опубликована
    status: str
    #: Канал, объявленный манифестом этой версии
    channel: str
    #: Состояние СВОЕГО издателя: оно объясняет ворот publisher
    publisher_status: str
    #: Отпечаток текущего манифеста: им запрет называет предмет, и по нему видно, что документ поменялся после проверки
    manifest_fingerprint: str
    #: Все обязательные ворота пройдены. Отдельным полем: выводить готовность из списка — ошибиться в пользу разрешения
    ready: bool
    checks: List["DeveloperGateCheck"]

class DeveloperPublicationResult(TypedDict):
    publication: "DeveloperPublicationReport"

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

class DocflowAcceptedDocument(TypedDict):
    """Учётный документ кабинета, заведённый приёмкой."""

    id: "UUID"
    #: Наш номер из нумератора кабинета. Номер продавца лежит в содержимом документа: занять им наш сквозной счётчик значит однажды получить два своих документа с одним номером от двух разных поставщиков
    number: str
    #: Дата документа ГГГГ-ММ-ДД. По умолчанию это дата документа поставщика: операция произошла тогда, когда её совершил он, и датировать её днём приёмки значит поставить факт не в тот период
    date: str
    #: Ключ вида документа; у приёмки docflow_incoming
    type_key: str
    #: Имя вида в кабинете. Право клиента: вид можно переименовать, и код держит его за ключ, а не за название
    type_name: str
    #: Состояние учётного документа. Приёмка заводит ЧЕРНОВИК: проведение принадлежит модулям — владельцам регистров
    status: str
    #: Документ помечен на удаление. Такой пакет принимается заново: пометка и есть способ сказать «этот документ ошибочный»
    marked_deleted: bool
    #: Момент приёмки; пусто, если он не записан
    accepted_at: str

class _DocflowAdvanceInvoiceInputRequired(TypedDict):
    advance_id: "UUID"

class DocflowAdvanceInvoiceInput(_DocflowAdvanceInvoiceInputRequired, total=False):
    #: Дата счёта-фактуры; пусто — дата получения аванса
    date: str

class DocflowAppSalesOrderCounterparty(TypedDict, total=False):
    """Покупатель человеческими ключами. ИНН узнаётся строго; телефон — признак физлица. Имя, телефон и почта остаются в продаже или закупке как реквизиты плательщика"""

    name: str
    inn: str
    kpp: str
    phone: str
    email: str

class _DocflowAppSalesOrderInputRequired(TypedDict):
    company_id: "UUID"
    #: Номер продажи или закупки у магазина — ключ идемпотентности загрузки
    external_id: str
    #: Код валюты сделки, например RUB
    currency: str
    order_date: str
    items: List["DocflowAppSalesOrderItem"]

class DocflowAppSalesOrderInput(_DocflowAppSalesOrderInputRequired, total=False):
    contact_id: "UUID"
    contract_document_id: "UUID"
    counterparty: "DocflowAppSalesOrderCounterparty"
    #: Необязательная действующая воронка продаж этого кабинета; повтор с другой воронкой отвечает 409
    funnel_id: "UUID"
    #: Пусто — кабинет выдаст следующий номер
    number: str
    title: str
    manager: str
    comment: str
    ship_date: str
    due_date: str
    discount: str
    #: Цены включают налог; пусто — умолчание кабинета
    prices_include_vat: bool
    #: Путь сделки; продажа или закупка с оплатой на сайте — self_service
    scenario: Literal['self_service', 'one_off_sale', 'contract_sale']
    payment: "DocflowAppSalesOrderPayment"
    #: Не используется контуром приложения: источник журнала — пространство приложения из токена
    source: str
    warehouse_id: "UUID"

class _DocflowAppSalesOrderItemRequired(TypedDict):
    quantity: str
    price: str

class DocflowAppSalesOrderItem(_DocflowAppSalesOrderItemRequired, total=False):
    #: Артикул или штрихкод позиции у магазина; узнаётся справочником номенклатуры точным совпадением
    article: str
    product_id: "UUID"
    #: Пусто — название берётся из номенклатуры
    title: str
    #: Пусто — вид номенклатуры
    kind: Literal['goods', 'service', 'material', 'semi_product']
    unit: str
    discount: str
    #: Ставка строки: 22%, 10%, без НДС; пусто — учётная политика юрлица на дату продажи или закупки
    vat_rate: str

class _DocflowAppSalesOrderPaymentRequired(TypedDict):
    #: Кто подтвердил списание: yookassa, tochka, имя платёжного кабинета сайта
    provider: str
    #: Номер платежа у провайдера
    external_id: str
    #: Сумма больше нуля; возврат присылается видом refund, а не минусом
    amount: str

class DocflowAppSalesOrderPayment(_DocflowAppSalesOrderPaymentRequired, total=False):
    """Сообщение эквайринга о продаже или закупке. Идемпотентно по паре provider + external_id"""

    #: Пусто — списание (payment)
    kind: Literal['payment', 'refund']
    currency: str
    #: Когда провайдер списал; пусто — момент сообщения
    paid_at: str

class _DocflowApprovalRequired(TypedDict):
    id: "UUID"
    subject: "DocflowApprovalSubject"
    rework_mode: Literal['restart', 'returner_only']
    #: Редакция предмета, по которой решают
    content_version: int
    state: Literal['pending', 'approved', 'rejected', 'returned', 'cancelled']
    #: Номер текущего этапа
    active_stage: int
    requested_by: int
    requested_at: str
    updated_at: str
    stages: List["DocflowApprovalStage"]

class DocflowApproval(_DocflowApprovalRequired, total=False):
    """Один проход предмета по маршруту. Согласование ничего не проводит и ни строки регистра не пишет: оно отвечает на один вопрос — можно ли уже выполнить действие, выпускающее бумагу или деньги наружу. Возврат на доработку проход не закрывает: предмет правят и продолжают тот же проход, сохраняя чужие визы."""

    subject_title: str
    subject_number: str
    company_id: "UUID"
    contact_id: "UUID"
    item_id: "UUID"
    route_id: "UUID"
    route_name: str
    #: Пусто законно: у рамочного договора суммы нет
    amount: str
    currency: str
    requested_name: str
    finished_at: str
    reminded_at: str
    escalated_at: str
    events: List["DocflowApprovalEvent"]

class DocflowApprovalActionCheck(TypedDict):
    """Вердикт по одному действию вместе с причинами отказа."""

    allowed: bool
    reasons: List["DocflowApprovalBlockReason"]

class _DocflowApprovalBlockReasonRequired(TypedDict):
    code: str
    message: str

class DocflowApprovalBlockReason(_DocflowApprovalBlockReasonRequired, total=False):
    """Почему действие запрещено, словами, а не кодом состояния."""

    approval_id: "UUID"
    stage_title: str

class _DocflowApprovalBlockersRequired(TypedDict):
    subject: "DocflowApprovalSubject"
    #: Объявлен ли вид предмета требующим согласования
    required: bool
    send_to_counterparty: "DocflowApprovalActionCheck"
    send_to_bank: "DocflowApprovalActionCheck"
    can_submit: bool
    can_decide: bool
    can_cancel: bool
    can_resubmit: bool
    #: Всегда истинно: редактирование карточки согласование не глушит
    editing_stays_unlocked: bool

class DocflowApprovalBlockers(_DocflowApprovalBlockersRequired, total=False):
    """Что можно сделать с предметом прямо сейчас и почему нельзя остальное. Согласование блокирует РОВНО ДВА действия — отправку контрагенту и отправку заявки в банк; editing_stays_unlocked говорит прямо, что редактирование карточки не глушится никогда. Это СНИМОК: между чтением и нажатием кнопки мир может измениться, и настоящую защиту держит транзакция самого действия."""

    approval_id: "UUID"
    state: Literal['pending', 'approved', 'rejected', 'returned', 'cancelled']
    #: У человека есть неотмеченное «ознакомиться» в этом проходе — своё или делегированное
    can_acknowledge: bool
    matched_route_id: "UUID"
    matched_route_name: str

class DocflowApprovalCancelInput(TypedDict):
    #: Причина отзыва остаётся в истории прохода
    comment: str

class _DocflowApprovalChainPreviewRequired(TypedDict):
    #: auto — маршрут подошёл, но все его этапы согласования отсечены порогами по сумме: предмет согласуется автоматически, без виз
    outcome: Literal['route', 'direct', 'blocked', 'auto']
    #: Согласование вида объявлено обязательным
    required: bool
    stages: List["DocflowApprovalChainStage"]

class DocflowApprovalChainPreview(_DocflowApprovalChainPreviewRequired, total=False):
    """Кто согласует предмет по его фактам: маршрут, этапы, пропуски по сумме и люди."""

    route_id: "UUID"
    route_name: str
    #: Подобран стандартный маршрут: ни один маршрут кабинета не подошёл
    route_standard: bool
    payment_destination: Literal['calendar', 'treasury']

class _DocflowApprovalChainStageRequired(TypedDict):
    position: int
    mode: Literal['all', 'any']
    assignee_kind: Literal['user', 'department', 'role', 'manager', 'department_head']
    #: Этап выполнится при этих фактах
    applies: bool
    people: List["DocflowApprovalPerson"]

class DocflowApprovalChainStage(_DocflowApprovalChainStageRequired, total=False):
    """Этап маршрута глазами «кто согласует» до отправки."""

    title: str
    #: Что делает этап: approve — согласует и держит маршрут; acknowledge — «ознакомиться»: извещает участников (нужно право docflow.flow:read), маршрут не держит, отказа не знает (ERP-1566). Пусто — approve
    stage_kind: Literal['approve', 'acknowledge']
    assignee_label: str
    #: Лимит этапа: выполняется при сумме от этого значения
    min_amount: str
    due_hours: int
    #: Почему этап не выполнится
    skip_reason: Literal['amount_below']
    #: Этап выполнится, но спросить некого
    problem: Literal['no_reviewers']

class _DocflowApprovalDecisionInputRequired(TypedDict):
    decision: Literal['approve', 'return', 'reject']

class DocflowApprovalDecisionInput(_DocflowApprovalDecisionInputRequired, total=False):
    """Одно решение. Комментарий обязателен у return и reject и не требуется у approve: отказ без слов отправляет автора чинить неизвестно что."""

    #: Заполняется из адреса; значение в теле роли не играет
    approval_id: "UUID"
    #: ЧЬЯ виза закрывается. Не обязательно тот, кто нажимает: замещающий закрывает визу отсутствующего, оставаясь собой в истории
    reviewer_id: int
    comment: str

class DocflowApprovalDepartment(TypedDict):
    """Подразделение справочника ядра глазами согласования."""

    id: "UUID"
    code: str
    label: str

class DocflowApprovalDirectories(TypedDict):
    """Справочники конструктора маршрутов ОДНИМ ответом: три отдельных запроса ради одной формы означают три повода ей мигнуть и три места, где список окажется из разных моментов времени."""

    departments: List["DocflowApprovalDepartment"]
    roles: List["DocflowApprovalRoleRef"]
    people: List["DocflowApprovalPerson"]
    #: Виды предметов, которые сегодня умеют согласовываться, вместе с их обязательностью
    subjects: List["DocflowApprovalPolicy"]

class _DocflowApprovalEventRequired(TypedDict):
    id: "UUID"
    #: auto_approved — согласовано автоматически: сумма меньше порогов маршрута. operator_* — ответ оператору по входящему пакету ЭДО после прохода (настройка подключения reply_after_approval); comment несёт слова оператора или машинный код отказа docflow.edo.*
    action: Literal['submitted', 'approved', 'returned', 'rejected', 'cancelled', 'resubmitted', 'reset_significant_change', 'delegated', 'escalated', 'reminded', 'operator_replied', 'operator_refused', 'operator_signature_required', 'operator_skipped', 'acknowledged', 'auto_approved']
    created_at: str

class DocflowApprovalEvent(_DocflowApprovalEventRequired, total=False):
    """Строка истории прохода. Не переписывается."""

    stage_position: int
    user_id: int
    user_name: str
    comment: str

class _DocflowApprovalInboxItemRequired(TypedDict):
    approval_id: "UUID"
    subject: "DocflowApprovalSubject"
    subject_title: str
    stage_position: int
    #: Сколько этапов в маршруте всего
    stage_count: int
    stage_mode: Literal['all', 'any']
    requested_at: str
    overdue: bool
    #: Истинно у собственной отправки, которую вернули на доработку
    returned_to_me: bool

class DocflowApprovalInboxItem(_DocflowApprovalInboxItemRequired, total=False):
    """Строка очереди. Это НЕ урезанный предмет: ни файлов, ни строк, ни связей здесь нет — очередь открывают, чтобы решить, что открывать дальше."""

    subject_number: str
    route_name: str
    stage_title: str
    amount: str
    currency: str
    company_name: str
    contact_name: str
    requested_name: str
    due_at: str
    #: Чью визу вы ставите, если это не ваша собственная
    on_behalf_of: str
    on_behalf_via: Literal['self', 'substitute', 'delegate', 'administrator']
    #: Строка этапа «ознакомиться»: решения не ждут, нужна отметка POST /approvals/{id}/acknowledge
    informational: bool

class DocflowApprovalInboxPage(TypedDict):
    items: List["DocflowApprovalInboxItem"]
    has_more: bool

class DocflowApprovalPerson(TypedDict):
    """Человек в списках согласования. Логин, роли и права наружу не отдаются."""

    id: int
    name: str

class DocflowApprovalPolicy(TypedDict):
    """Обязательность согласования у ОДНОГО вида предмета, а не глобальный выключатель кабинета: у заявки на оплату согласование может быть обязательным, а у письма контрагенту — нет."""

    subject_module: Literal['docflow', 'finance']
    subject_kind: Literal['flow_document', 'payment_request', 'edo_message']
    required: bool

class DocflowApprovalResubmitInput(TypedDict, total=False):
    """Повторная отправка после доработки. Что произойдёт с визами, решает настройка маршрута: restart гасит все, returner_only сохраняет визы всех, кроме вернувшего."""

    #: Заполняется из адреса; значение в теле роли не играет
    approval_id: "UUID"
    #: Кого инициатор решил переспросить дополнительно. Вернувший этап переспрашивается всегда и в списке не нужен
    ask_again: List["UUID"]
    comment: str

class _DocflowApprovalReviewRequired(TypedDict):
    id: "UUID"
    actor_id: int

class DocflowApprovalReview(_DocflowApprovalReviewRequired, total=False):
    """Персональная виза. actor_id — чья она, decided_by — чья рука её поставила, если это не сам согласующий, а decided_via — на каком основании: замещение, поручение или вмешательство администратора."""

    actor_name: str
    decided_by: int
    decided_by_name: str
    decided_via: Literal['self', 'substitute', 'delegate', 'administrator']
    delegated_to: int
    #: Пусто, пока человек не решил; acknowledge — отметка «ознакомлен» на этапе ознакомления
    decision: Literal['approve', 'return', 'reject', 'acknowledge']
    #: Обязателен у return и reject: без слов автор не узнает, что исправлять
    comment: str
    decided_at: str

class DocflowApprovalRoleRef(TypedDict):
    """Роль кабинета глазами согласования: идентификатор и имя, без состава прав."""

    id: "UUID"
    name: str

class _DocflowApprovalRouteRequired(TypedDict):
    id: "UUID"
    name: str
    subject_module: Literal['docflow', 'finance']
    #: any — любой вид предмета своего модуля
    subject_kind: Literal['flow_document', 'payment_request', 'edo_message', 'any']
    #: Что будет после возврата на доработку: весь путь заново либо продолжает вернувший, визы остальных сохраняются
    rework_mode: Literal['restart', 'returner_only']
    #: Выключенный маршрут не подбирается новым проходам, но остаётся на месте
    is_active: bool
    stages: List["DocflowApprovalRouteStage"]
    created_at: str
    updated_at: str

class DocflowApprovalRoute(_DocflowApprovalRouteRequired, total=False):
    """Именованный ШАБЛОН маршрута, а не разовый список людей. Подошло несколько — берётся самый конкретный; нижняя граница суммы включается, верхняя нет, поэтому смежные диапазоны стыкуются без щели и без нахлёста. Названия юрлица, контрагента, папки и статьи подставляются на чтении: в шаблоне хранятся только ссылки."""

    #: Вид бумаги у владельца предмета
    document_kind: str
    company_id: "UUID"
    company_name: str
    contact_id: "UUID"
    contact_name: str
    contact_folder_id: "UUID"
    contact_folder: str
    item_id: "UUID"
    item_name: str
    #: Условие «бизнес предмета»; без юрлица у предмета бизнес берётся из формы проверки
    business_id: "UUID"
    business_name: str
    #: Условие «подразделение автора»: срабатывает и на подотделы
    department_id: "UUID"
    department_name: str
    #: Нижняя граница суммы ВКЛЮЧАЕТСЯ
    amount_from: str
    #: Верхняя граница суммы НЕ включается
    amount_to: str
    #: Для заявки на оплату (docflow / payment_request): куда идёт согласованная — сразу в платёжный календарь (дата оплаты = срок) или казначею, который ставит дату платежа (ERP-1427, этап 6)
    payment_destination: Literal['calendar', 'treasury']
    #: Код стандартного маршрута кабинета. Его заводит система выключенным; включённый, он подбирается последним — когда ни один другой маршрут не подошёл. Пусто — маршрут заведён кабинетом
    system_key: Literal['payment_request', 'invoice', 'contract']

class DocflowApprovalRouteList(TypedDict):
    items: List["DocflowApprovalRoute"]

class _DocflowApprovalRouteStageRequired(TypedDict):
    #: Порядок этапа в маршруте
    position: int
    assignee_kind: Literal['user', 'department', 'role', 'manager', 'department_head']
    #: Решают все или достаточно одного. Кворума с процентом нет
    mode: Literal['all', 'any']

class DocflowApprovalRouteStage(_DocflowApprovalRouteStageRequired, total=False):
    """Этап ШАБЛОНА маршрута. Согласующий назван одним из пяти способов, и каждый отвечает своему вопросу: user — «решает именно он», department — «согласует склад», role — «согласует любой бухгалтер», manager — «спросить начальника автора, кем бы автор ни оказался», department_head — «спросить руководителя отдела» по оргструктуре: отдела автора или названного, а нет руководителя или автор руководит сам — выше по дереву. Согласующий может быть не выбран (способ назван, ссылки нет) только у выключенного маршрута: так сеется этап «Финансы» стандартного маршрута заявок."""

    id: "UUID"
    title: str
    assignee_user_id: int
    assignee_department_id: "UUID"
    assignee_role_id: "UUID"
    #: Только для department: спросить и сотрудников подотделов
    include_subdepartments: bool
    #: Как назначение читается человеком. Подставляется на чтении; в шаблоне не хранится
    assignee_label: str
    #: Что делает этап: approve — согласует и держит маршрут; acknowledge — «ознакомиться»: извещает участников (нужно право docflow.flow:read), маршрут не держит, отказа не знает (ERP-1566). Пусто — approve
    stage_kind: Literal['approve', 'acknowledge']
    #: Срок ЭТАПА в часах. Просрочка даёт напоминание и эскалацию на одно звено; автоотклонения по сроку нет
    due_hours: int
    #: Лимит по сумме УСЛОВИЕМ НА ЭТАП: выполнять только при сумме от N. Этап, чей лимит не достигнут, остаётся в проходе строкой skipped
    min_amount: str

class _DocflowApprovalStageRequired(TypedDict):
    id: "UUID"
    position: int
    mode: Literal['all', 'any']
    assignee_kind: Literal['user', 'department', 'role', 'manager', 'department_head']
    #: notified — этап ознакомления известил участников и пропустил проход дальше; acknowledged — все отметились
    state: Literal['waiting', 'active', 'approved', 'rejected', 'returned', 'skipped', 'notified', 'acknowledged']
    reviews: List["DocflowApprovalReview"]

class DocflowApprovalStage(_DocflowApprovalStageRequired, total=False):
    """Этап ПРОХОДА: кого спросили на самом деле. Состояние skipped означает «этап не выполняется, его лимит по сумме не достигнут»; строка всё равно есть, чтобы человек видел, ПОЧЕМУ финансового директора не спросили."""

    title: str
    #: Что делает этап: approve — согласует и держит маршрут; acknowledge — «ознакомиться»: извещает участников (нужно право docflow.flow:read), маршрут не держит, отказа не знает (ERP-1566). Пусто — approve
    stage_kind: Literal['approve', 'acknowledge']
    assignee_label: str
    min_amount: str
    due_hours: int
    due_at: str
    started_at: str
    decided_at: str

class DocflowApprovalSubject(TypedDict):
    """Предмет согласования НЕЙТРАЛЬНОЙ ТРОЙКОЙ «модуль — вид — идентификатор». Внешнего ключа на предмет нет вовсе: без этого приёма к заявке на оплату, живущей в модуле finance (счета, выписки и расчёты), лист было бы не прицепить."""

    #: Модуль-владелец предмета
    module: Literal['docflow', 'finance']
    #: Вид предмета: карточка документооборота, заявка на оплату или входящий документ ЭДО
    kind: Literal['flow_document', 'payment_request', 'edo_message']
    #: Идентификатор предмета у его владельца
    id: "UUID"

class _DocflowApprovalSubjectFactsRequired(TypedDict):
    subject: "DocflowApprovalSubject"
    title: str
    #: Редакция предмета у владельца — основание значимой правки
    content_version: int
    #: Кто завёл предмет; нужен этапу «руководитель автора»
    author_id: int

class DocflowApprovalSubjectFacts(_DocflowApprovalSubjectFactsRequired, total=False):
    """Что владелец предмета рассказывает о нём согласованию своим портом. Пустая сумма законна — у рамочного договора её нет, и ноль вместо неё назвал бы сумму, которой не называли."""

    number: str
    #: Вид бумаги у владельца: договор, счёт, акт
    document_kind: str
    company_id: "UUID"
    contact_id: "UUID"
    contact_folder_id: "UUID"
    #: Статья расхода предмета
    item_id: "UUID"
    #: Сумма десятичным текстом; пусто там, где суммы нет
    amount: str
    currency: str

class _DocflowApprovalSubjectStateRequired(TypedDict):
    blockers: "DocflowApprovalBlockers"
    facts: "DocflowApprovalSubjectFacts"

class DocflowApprovalSubjectState(_DocflowApprovalSubjectStateRequired, total=False):
    """Согласование одного предмета глазами его карточки."""

    #: Отсутствует, пока предмет ни разу не отправляли
    approval: "DocflowApproval"
    #: Кто согласует, если отправить сейчас; есть, только когда открытого или согласованного прохода нет
    preview: "DocflowApprovalChainPreview"

class _DocflowAttachmentRequired(TypedDict):
    id: "UUID"
    message: "UUID"
    #: Идентификатор вложения у оператора
    external_id: str
    #: Имя файла словами оператора
    name: str
    #: Наш словарь, а не оператора: документ, ответный титул, служебное извещение. Пусто означает, что вид неизвестен, и это законно
    kind: Literal['', 'document', 'title', 'notice']
    content_type: str
    size_bytes: int
    sha256: str
    #: Байты скачаны и лежат у НАС. Ссылка оператора хранилищем не считается: она живёт около месяца, а накладную спрашивают через три года
    stored: bool
    created_at: str

class DocflowAttachment(_DocflowAttachmentRequired, total=False):
    """Файл внутри пакета. Внутреннего пути в хранилище здесь нет: снаружи файл получают отдельной операцией, а путь не часть контракта и не подсказка для перебора."""

    downloaded_at: str

class DocflowCancellation(TypedDict):
    """Соглашение сторон об аннулировании документа. Запускает его любая сторона, а решает вторая: согласие даёт состояние 22 «Документ аннулирован», отказ — состояние 40 «Аннулирование отклонено», при котором состояние самого документа НЕ меняется. Шаг цепочки выводится из ленты СОБЫТИЙ пакета, а не из кода состояния: состояние 27 «Ожидает аннулирования» оператор отдаёт только отдельным методом выборки по событиям."""

    #: Шаг цепочки: none — её нет; requested — ждём решения; agreed — аннулирован по соглашению; refused — в аннулировании отказано, и документ остался действующим
    state: Literal['none', 'requested', 'agreed', 'refused']
    #: Слова ОПЕРАТОРА о состоянии, когда оно относится к аннулированию. Своего перевода состояний у нас нет и быть не должно
    state_name: str
    #: Кто запустил цепочку. Пусто означает «неизвестно», а не «мы»
    initiator: Literal['', 'us', 'counterparty']
    #: Причина словами того, кто её написал. Не переводится
    reason: str
    requested_at: Optional[str]
    decided_at: Optional[str]
    #: Вид документа вообще допускает аннулирование. У электронной транспортной накладной его нет: там отказ 409 с кодом docflow.edo.cancellation_unavailable
    available: bool
    #: Ход за нами и цепочку можно начать
    can_request: bool
    #: Соглашение прислали нам и на него можно согласиться
    can_approve: bool
    #: Соглашение прислали нам и в нём можно отказать
    can_reject: bool

class _DocflowCertificateRequired(TypedDict):
    thumbprint: str
    subject: str

class DocflowCertificate(_DocflowCertificateRequired, total=False):
    """Сертификат, которым подпись доказывают спустя годы: имя подписанта меняется, отпечаток нет."""

    valid_from: str
    valid_to: str

class _DocflowConnectionRequired(TypedDict):
    id: "UUID"
    #: Оператор ЭДО. Диадок объявлен, адаптера к нему пока нет
    provider: Literal['saby', 'diadoc']
    #: Имя оператора для интерфейса; торговая марка, не переводится
    provider_name: str
    display_name: str
    company_name: str
    company_inn: str
    company_kpp: str
    #: reauth_required отделён от error намеренно: сеть починится сама, а отозванный доступ требует человека
    status: Literal['connected', 'paused', 'error', 'reauth_required', 'disconnected']
    status_name: str
    #: Тройка ключей оператора задана. Самих значений наружу не отдают никогда
    has_credentials: bool
    #: Действующее ограничение: отправка, подписание и изменение состояний в ЭДО отключены
    read_only: bool
    #: «После нашего согласования — ответить у оператора». Когда проход внутреннего маршрута по входящему пакету закончен, документооборот выполняет у оператора действие текущего этапа: «согласован» — «Утвердить», «отклонён» — «Отклонить» с причиной из визы. Этап с подписью не закрывается: пакет ждёт человека в «Ждут меня → Подписать». Итог — строкой журнала прохода (operator_*). По умолчанию выключено.
    reply_after_approval: bool
    #: Идентификатор нашей организации у оператора; выясняется сопоставлением по ИНН и КПП, руками не вводится
    external_org_id: str
    granted_by_name: str
    #: Итог последнего прохода синхронизации
    last_sync_status: Literal['', 'ok', 'failed', 'skipped']
    #: СЛОВА ОПЕРАТОРА и только они: по ним человек чинит доступ в кабинете оператора
    last_error: str
    #: Машинный код последней неудачи (docflow.edo.*); его переводит интерфейс
    last_error_code: str
    messages_total: int
    #: Сколько пакетов ждут нашего действия
    actions_due: int
    created_at: str
    updated_at: str

class DocflowConnection(_DocflowConnectionRequired, total=False):
    """Подключение юрлица к оператору ЭДО. Учётных данных здесь нет ни одним полем: снаружи виден только признак has_credentials."""

    company: "UUID"
    #: Режим «Черновики в ЭДО» (ERP-1551): при read_only=true оператору уходят черновики; подпись, отправка и ответы остаются закрытыми
    draft_write: bool
    #: Кто из ERP выдал доступ; имя человека на стороне оператора нам неизвестно
    granted_by_user_id: int
    granted_at: str
    last_sync_at: str

class DocflowConnectionList(TypedDict):
    count: int
    results: List["DocflowConnection"]

class _DocflowCounterpartyRequired(TypedDict):
    name: str
    inn: str
    kpp: str
    #: Идентификатор участника обмена у оператора: надёжнее ИНН, потому что у одного ИНН бывает несколько ящиков
    external_id: str
    #: Наш контрагент, если сопоставление состоялось. Это наша догадка по ИНН либо выбор человека, а не факт от оператора
    contact_name: str

class DocflowCounterparty(_DocflowCounterpartyRequired, total=False):
    """Вторая сторона обмена. Реквизиты хранятся текстом всегда, даже когда сопоставление с нашим контрагентом состоялось: карточку могут удалить или переименовать, а пакет обязан остаться читаемым спустя годы."""

    contact: "UUID"

class _DocflowEventRequired(TypedDict):
    id: "UUID"
    message: "UUID"
    external_id: str
    name: str
    comment: str
    created_at: str

class DocflowEvent(_DocflowEventRequired, total=False):
    """Событие ленты пакета. Лента — то, по чему человек восстанавливает ход спора с контрагентом, поэтому название и комментарий хранятся словами оператора и не переводятся."""

    occurred_at: str

class _DocflowFlowAccountingLinkRequired(TypedDict):
    id: "UUID"
    owner: Literal['finance', 'stock']
    document_id: "UUID"

class DocflowFlowAccountingLink(_DocflowFlowAccountingLinkRequired, total=False):
    """Ссылка на учётный документ чужого модуля по личности. Состояние, остаток и содержимое чужого документа сюда не копируются: правда о нём живёт у его владельца."""

    #: Команда, породившая связь: create_plan, accept_act и подобные
    source_action: str
    #: Редакция бумаги, закреплённая командой
    source_version: int
    #: Редакция учётного документа, из которой сделана бумага
    target_version: int

class _DocflowFlowChangeInputRequired(TypedDict):
    #: Версия, которую видел клиент. Разошлась — 409 docflow.flow.version_conflict
    expected_version: int
    action: Literal['save', 'link', 'unlink', 'remove_file', 'register', 'revise', 'archive', 'restore', 'delete', 'custom']

class DocflowFlowChangeInput(_DocflowFlowChangeInputRequired, total=False):
    """Одна команда правки. Поля, не относящиеся к названному действию, отвергаются, а не игнорируются: запрос, просящий две разные вещи сразу, сам не знает, чего хочет."""

    content: "DocflowFlowContent"
    #: Для action=custom: значения своих полей целиком. Правятся у черновика и зарегистрированной карточки; значение, не подходящее к типу графы, — 422 с названиями граф
    custom: Dict[str, Any]
    company_id: "UUID"
    contact_id: "UUID"
    kind: "DocflowFlowKind"
    direction: Literal['incoming', 'outgoing', 'internal']
    file_id: "UUID"
    relation: "DocflowFlowRelationInput"
    relation_id: "UUID"

class _DocflowFlowCommercialRequired(TypedDict):
    currency: str
    #: Десятичным текстом; пусто — итога нет или его выводит правило графика
    amount: str

class DocflowFlowCommercial(_DocflowFlowCommercialRequired, total=False):
    """Коммерческая часть бумаги — сумма, валюта, строки и графики. Пустая amount законна только вместе с payment_rule, у которого названа сумма платежа: у бессрочного договора итога нет и быть не может, а строк оригинала и этапов работ у такой сделки не бывает — их суммы обязаны сойтись с итогом."""

    payment_terms: str
    due_date: str
    lines: List["DocflowFlowCommercialLine"]
    #: Этапы работ
    milestones: List["DocflowFlowScheduleStage"]
    #: График платежей; при payment_rule — его раскрытие
    payments: List["DocflowFlowScheduleStage"]
    payment_rule: "DocflowFlowPaymentRule"

class _DocflowFlowCommercialLineRequired(TypedDict):
    id: "UUID"
    name: str
    amount: str

class DocflowFlowCommercialLine(_DocflowFlowCommercialLineRequired, total=False):
    """Строка переписанного оригинала, а не расчёт. Сумма строки приходит явно: скидка поставщика, налог и округление не заменяются местным произведением количества на цену."""

    product_id: "UUID"
    product_name: str
    unit: str
    quantity: str
    price: str
    #: null означает, что налог не переписывали, а не что строка без налога
    vat_amount: Optional[str]

class _DocflowFlowCommercialTaxLineRequired(TypedDict):
    line_id: "UUID"

class DocflowFlowCommercialTaxLine(_DocflowFlowCommercialTaxLineRequired, total=False):
    """Вычисленная строка НДС для чтения карточки: тот же результат, что в печатной форме, но не часть сохранённого оригинала"""

    #: Ставка для показа; пусто, если политика не дала ставку
    rate: str
    #: НДС десятичным текстом; пусто, если налог не определён
    amount: str

class _DocflowFlowContentRequired(TypedDict):
    title: str
    date: str

class DocflowFlowContent(_DocflowFlowContentRequired, total=False):
    """Реквизиты бумаги — то, что переписано с документа."""

    number: str
    contract: "DocflowFlowContractTerms"
    commercial: "DocflowFlowCommercial"
    recognized: "DocflowFlowRecognized"
    #: Значения своих полей кабинета (графы вида docflow.document.<вид>). В save не прислано — не меняются; правятся действием custom
    custom: Dict[str, Any]

class _DocflowFlowContractTermsRequired(TypedDict):
    mode: Literal['framework', 'fixed']
    subject: str
    valid_from: str

class DocflowFlowContractTerms(_DocflowFlowContractTermsRequired, total=False):
    """Условия договора в старой форме. Остаётся читаемой и принимается, но новую коммерческую часть описывает commercial. У договора без лимита (mode=framework) суммы и валюты в условиях нет вовсе — искусственного нуля здесь не бывает. Коммерческая часть рядом с ним законна только с payment_rule, у которого названа сумма платежа: это бессрочный договор с регулярным платежом. Без неё это рамочный договор, суммы которого ведутся спецификациями, и commercial с ним не сохраняется."""

    valid_until: str
    #: Только у mode=fixed
    amount: str
    currency: str
    payment_terms: str
    renewal_terms: str
    #: Воронка продаж или закупок договора: продажи или закупки по договору идут в неё (пометка кабинета, не текст бумаги)
    order_funnel_id: str
    #: Ответственные по договору с долями: продажи и закупки периодов получают их по умолчанию; сумма долей — ровно 100
    responsibles: List["DocflowFlowResponsible"]

class DocflowFlowCreateInput(TypedDict):
    company_id: "UUID"
    contact_id: "UUID"
    kind: "DocflowFlowKind"
    direction: Literal['incoming', 'outgoing', 'internal']
    content: "DocflowFlowContent"

class _DocflowFlowDocumentRequired(TypedDict):
    id: "UUID"
    company_id: "UUID"
    company_name: str
    contact_id: "UUID"
    contact_name: str
    kind: "DocflowFlowKind"
    direction: Literal['incoming', 'outgoing', 'internal']
    status: Literal['draft', 'registered', 'archived']
    version: int
    #: Ложь означает: стороны и вид уже закреплены редакцией или связью и не меняются
    identity_editable: bool
    content: "DocflowFlowContent"
    created_at: str
    updated_at: str
    updated_by: int

class DocflowFlowDocument(_DocflowFlowDocumentRequired, total=False):
    """Карточка документа внутреннего контура в одной редакции. Каждая принятая команда рождает новую неизменяемую редакцию, а прежняя остаётся читаемой по своему адресу."""

    #: Бизнес юрлица бумаги прошёл отсечку этапа 4: мастер «Принять акт» и «Создать продажу / закупку» у бумаги сняты
    execution_cutover: bool
    #: Из какого состояния бумага ушла в архив
    archived_from: Literal['draft', 'registered']
    files: List["DocflowFlowFile"]
    relations: List["DocflowFlowRelation"]
    accounting_links: List["DocflowFlowAccountingLink"]
    #: Только в ответе чтения карточки: вычисленные суммы НДС строк из источника печати. В редакцию документа не записываются
    commercial_tax: List["DocflowFlowCommercialTaxLine"]
    edo: "DocflowFlowEDOState"
    #: Конверты, которыми карточка уходила и приходила. Заполняется только при чтении карточки и в редакцию не пишется: связь живёт своей строкой, её правит синхронизация, а редакция неизменяема
    edo_links: List["DocflowFlowEDOLink"]
    #: Чего карточке не хватает до полноты: содержательного файла, подтверждённой суммы, срока действия (последний — только у договора и дополнительного соглашения). Считается при чтении одной карточки и в редакцию не пишется. Пустой список у карточки из ЭДО означает, что приёмка зарегистрировала её сразу; непустой — что карточка осталась черновиком и ждёт подтверждения человека.
    gaps: List[Literal['file', 'amount', 'validity']]

class DocflowFlowEDOAttachment(TypedDict):
    """Файл конверта глазами карточки: чем оператор его назвал, чем он является, сколько весит и есть ли он у нас. Скачивается адресом вложения пакета."""

    id: "UUID"
    message: "UUID"
    name: str
    #: document, title либо пусто
    kind: str
    content_type: str
    size_bytes: int
    #: Байты скачаны в наше хранилище; ложь — файл пока живёт только у оператора
    stored: bool

class _DocflowFlowEDOLinkRequired(TypedDict):
    id: "UUID"
    connection: "UUID"
    #: Чем карточка приходится конверту: основной документ, приложение или основание
    role: Literal['primary', 'attachment', 'basis']
    #: Идентификатор документа у оператора
    external_doc_id: str
    #: Черновик, который ещё можно удалить у оператора
    draft: bool
    #: Слова оператора о самом пакете, собранные при чтении карточки
    direction: str
    number: str
    date: str
    state_code: str
    state_name: str
    created_at: str

class DocflowFlowEDOLink(_DocflowFlowEDOLinkRequired, total=False):
    """Конверт, которым карточка уехала или пришла. Пакет — канал доставки, и здесь видно, чем карточка ему приходится и каким файлом она в нём поехала. Содержания конверта тут нет: за ним идут в сам пакет."""

    #: Пакет у оператора; пусто при непустом external_doc_id означает черновик у оператора, наружу не ушедший
    message: Optional["UUID"]
    #: Какой файл карточки уехал вложением
    file: Optional["UUID"]
    #: Идентификатор вложения у оператора: им адресуется замена файла при повторной отправке
    external_attachment_id: str
    #: Содержательные файлы конверта, показанные в карточке ссылкой, а не копией: байты лежат в хранилище кабинета один раз. Извещений здесь нет. Заполняется только при чтении одной карточки
    attachments: List["DocflowFlowEDOAttachment"]
    created_by: Optional[int]

class _DocflowFlowEDOStateRequired(TypedDict):
    message: "UUID"
    #: Подписал, отказал (отклонение либо уведомление об уточнении) или аннулирован по соглашению сторон
    outcome: Literal['signed', 'refused', 'cancelled']
    #: Когда это случилось у оператора
    occurred_at: str

class DocflowFlowEDOState(_DocflowFlowEDOStateRequired, total=False):
    """Ответ контрагента по документу, как его понимает карточка: подписал, отказал или аннулировали по соглашению сторон. Пересказа состояний оператора здесь нет — регламентов у него десятки, и свой словарь на них отстал бы от первой же правки закона. Живёт в редакции карточки и поэтому попадает в её историю сам."""

    #: Состояние словами оператора: показывается как есть, человек сверяет его с кабинетом оператора
    state_name: str

class _DocflowFlowFileRequired(TypedDict):
    id: "UUID"
    name: str
    #: Байт; не больше 26214400
    size: int
    sha256: str
    content_type: str
    uploaded_by: int
    uploaded_at: str

class DocflowFlowFile(_DocflowFlowFileRequired, total=False):
    """Приложенный файл. Всё это описание делает владелец при загрузке, и командой правки оно не принимается."""

    #: Вердикт антивируса у файла, пришедшего сессией загрузки; у файла формы поля нет
    scan_status: Literal['clean', 'skipped']

DocflowFlowKind = Literal['contract', 'specification', 'amendment', 'invoice', 'act', 'upd', 'goods_waybill', 'transport_waybill', 'consignment_note', 'transport_order', 'tax_invoice', 'correction', 'return', 'discrepancy_act', 'reconciliation_act', 'power_of_attorney', 'other']

class DocflowFlowOriginal(TypedDict):
    """Сканы подписанного оригинала документа."""

    document_id: "UUID"
    scans: List["DocflowFlowOriginalScan"]

class DocflowFlowOriginalScan(TypedDict):
    """Скан подписанного оригинала; номер скана из сессии загрузки — номер сессии."""

    id: "UUID"
    document_id: "UUID"
    name: str
    size: int
    sha256: str
    content_type: str
    uploaded_by: int
    uploaded_at: str

class _DocflowFlowPageRequired(TypedDict):
    items: List["DocflowFlowDocument"]
    has_more: bool

class DocflowFlowPage(_DocflowFlowPageRequired, total=False):
    """Страница карточек. Набор строк называется items — как у остальных страниц этого крыла; крыло обмена с контрагентами в том же модуле исторически называет его results."""

    #: Только по запросу with=counts. Сколько карточек в каждой пилюле списка договоров при прочих отборах: expiring входит в active, а удалённые не считаются нигде.
    state_counts: "DocflowFlowPageStateCounts"

class DocflowFlowPageStateCounts(TypedDict):
    """Только по запросу with=counts. Сколько карточек в каждой пилюле списка договоров при прочих отборах: expiring входит в active, а удалённые не считаются нигде."""

    draft: int
    active: int
    expiring: int
    expired: int
    archived: int

class _DocflowFlowPaymentRuleRequired(TypedDict):
    period: Literal['month', 'week', 'quarter']
    #: День месяца (month, quarter; короткий месяц прижимает к своему концу) или день недели ISO 1..7 (week)
    day: int
    #: Первый платёж — ближайшая дата не раньше этой
    start: str

class DocflowFlowPaymentRule(_DocflowFlowPaymentRuleRequired, total=False):
    """Регулярный график оплат одним правилом: сумма платежа, период, день, начало и ровно одно из трёх окончаний — число платежей, последняя дата или open («пока действует договор»). Сервер раскрывает правило в строки payments сам; план финансов и расчёты видят только строки, как при ручном графике. При названной сумме платежа сумма документа (commercial.amount) может быть пустой: с count или until она вычисляется как N × платёж, с open её нет вовсе. Бессрочное правило раскрывается на горизонт в 12 ближайших платежей — это план, а не весь договор."""

    #: Сумма одного платежа десятичным текстом; пусто — сумма документа делится поровну. Обязательна, когда суммы документа нет
    amount: str
    #: Число платежей; задаётся вместо until
    count: int
    #: Последняя допустимая дата включительно; задаётся вместо count
    until: str
    #: Пока действует договор: окончания нет, итога нет, раскрываются ближайшие 12 платежей
    open: bool
    orders: "DocflowFlowPaymentRuleOrders"

DocflowFlowPaymentRuleOrders = TypedDict("DocflowFlowPaymentRuleOrders", {"from": str, "product_id": "UUID", "product_name": str}, total=False)

class DocflowFlowRecognized(TypedDict, total=False):
    """Прочитанное машиной из файла карточки — НА ПРОВЕРКУ. Живёт отдельно от условий договора: в условия сумма и срок попадают только рукой человека. Пустое поле означает «не прочиталось», а не ноль. Приёмка входящего договора в PDF заполняет его текстом бумаги."""

    #: Имя вложения словами оператора: по нему человек откроет ту же бумагу и сверит
    source: str
    #: Десятичная строка
    amount: str
    currency: str
    valid_from: str
    valid_until: str

class DocflowFlowRelation(TypedDict):
    """Связь между бумагами кабинета — основание, приложение, изменение или замена. Учётной инструкцией она не является."""

    id: "UUID"
    kind: Literal['basis', 'attachment', 'amends', 'replaces']
    target_id: "UUID"
    #: Закреплённая редакция другой бумаги
    target_version: int

class DocflowFlowRelationInput(TypedDict):
    kind: Literal['basis', 'attachment', 'amends', 'replaces']
    target_id: "UUID"
    target_version: int

class DocflowFlowResponsible(TypedDict):
    """Ответственный сотрудник договора и его доля в процентах."""

    employee_id: str
    #: Доля в процентах десятичным текстом
    share: str

class _DocflowFlowScheduleStageRequired(TypedDict):
    id: "UUID"
    #: Десятичным текстом, не числом с плавающей точкой
    amount: str

class DocflowFlowScheduleStage(_DocflowFlowScheduleStageRequired, total=False):
    """Плановая сумма этапа работ или платежа. Ни выполнения, ни оплаты она не утверждает — это то, о чём договорились."""

    label: str
    date: str
    #: Чем открывается срок платежа: датой или закрытием этапа
    due_trigger: str
    after_stage_id: "UUID"
    #: Дней после события срока
    delay_days: int

class _DocflowFlowUploadRequestRequired(TypedDict):
    #: Ожидаемая версия документа
    expected_version: int
    #: Имя файла с расширением, без пути
    name: str
    #: Точный размер файла в байтах
    size_bytes: int

class DocflowFlowUploadRequest(_DocflowFlowUploadRequestRequired, total=False):
    """Заявка на сессию загрузки файла в документ."""

    replace_id: "UUID"
    mime_type: str
    #: Необязательная контрольная сумма SHA-256 строчными шестнадцатеричными знаками
    sha256: str

class DocflowFlowUploadResult(TypedDict):
    """Документ после приложения файла и номер этого файла."""

    document: "DocflowFlowDocument"
    file_id: "UUID"

class _DocflowIntakeCounterpartyRequired(TypedDict):
    #: Карточка контрагента кабинета; null — свести не с кем, и приёмка отвечает проверкой docflow.edo.contact_required
    contact: Optional["UUID"]
    #: Имя этой карточки в кабинете
    contact_name: str
    #: Имя стороны словами оператора либо файла продавца
    name: str
    inn: str
    kpp: str
    #: Откуда взялся контрагент: manual — решение человека, auto — записанное сопоставление, guess — наша догадка по реквизитам прямо сейчас, нигде не записанная, none — не свели ни с кем
    match: Literal['manual', 'auto', 'guess', 'none']

class DocflowIntakeCounterparty(_DocflowIntakeCounterpartyRequired, total=False):
    """Вторая сторона и то, с кем мы её свели. Порядок узнавания жёсткий, и каждая ступень сильнее следующей: решение человека этим же запросом, сопоставление зеркала пакета, ЗАПИСАННОЕ решение по этому участнику обмена и, наконец, поиск в справочнике по ИНН и КПП. Последняя ступень — догадка, и она называет себя догадкой (match: guess), а не выдаёт себя за чьё-то решение. Разбор у неё общий с автоматчем выгрузок: второй механизм узнавания рядом с существующим разошёлся бы с ним на первой же правке — молча и в пользу дубля. Неоднозначность не разрешается никогда: ИНН, совпавший у двух юрлиц, которых не развёл КПП, уходит человеку списком options."""

    #: Наши контрагенты с тем же ИНН, когда выбрать между ними обязан человек. Непустой список означает «такие у нас уже есть, выбери» — и потому же означает, что заводить нового НЕ НАДО: там, где контрагент с такими реквизитами уже заведён, место кнопке «связать с существующим», а не «завести».
    options: List["DocflowIntakeCounterpartyOption"]

class DocflowIntakeCounterpartyOption(TypedDict):
    """Один наш контрагент на выбор человеку. КПП здесь не для полноты: он единственное, чем два юрлица с одним ИНН различаются."""

    id: "UUID"
    name: str
    kpp: str

class _DocflowIntakeLineRequired(TypedDict):
    #: Номер строки в файле поставщика. По нему человек соотносит экран с бумагой, и по нему же приходит его решение
    number: int
    #: Наименование товара словами поставщика
    name: str
    #: Артикул поставщика
    article: str
    #: Код товара у поставщика
    code: str
    #: Код ОКЕИ единицы измерения
    unit_code: str
    unit_name: str
    quantity: str
    #: Цена единицы словами поставщика
    price: str
    amount_without_vat: str
    #: Ставка налога словами файла
    vat_rate: str
    #: Сумма налога. Пуста при отметке «без НДС»: нуля там нет, и подставить его значит превратить необлагаемую поставку в облагаемую с нулевым налогом
    vat_amount: str
    #: Отметка «без НДС» у строки
    vat_without: bool
    amount_with_vat: str
    #: Ключ соответствия: то, по чему эта строка узнаётся в СЛЕДУЮЩЕМ документе того же поставщика. Собирается с приставкой вида `арт:`, `код:` или `наим:` — артикул «100» и наименование «100» разные вещи, и без приставки они стали бы одной строкой соответствий. Показывается затем, чтобы человек понимал, что именно он сопоставляет: не эту накладную, а артикул поставщика на все будущие поставки.
    key: str
    #: Номенклатура кабинета; null — не выбрана
    product: Optional["UUID"]
    #: Имя выбранной карточки. Подсказка, а не реквизит: карточку могли заархивировать
    product_name: str
    #: Откуда взялась номенклатура строки. `manual` — сопоставил человек, `auto` — сопоставила машина и решение записано, `rejected` — человек уже посмотрел и сказал «не это» (догадку по такой строке мы больше не показываем), `guess` — наша догадка ПРЯМО СЕЙЧАС, нигде не записанная, `none` — сопоставить не с чем. Записанное соответствие приносит свой способ из справочника внешних ссылок, поэтому здесь встречаются и его значения (`pending`, `import`). Различать обязательно: на экране «это решил человек» и «это мы угадали» выглядят одинаково — одна строка с названием товара, — а значат противоположное.
    match: str

class DocflowIntakeLine(_DocflowIntakeLineRequired, total=False):
    """Строка товарной таблицы чужого документа вместе с тем, что мы про неё предлагаем. Числа остаются СТРОКАМИ ровно так, как их написал поставщик: сумма в чужом документе такая, какую он подписал, и наша задача её донести, а не поправить. Расхождения покажет сверка, а не молчаливое округление."""

    #: С чем ещё эта строка могла совпасть. Непусто только у неоднозначной догадки: выбрать за человека из двух одинаково подходящих товаров значит угадать монеткой и записать это как факт
    options: List["DocflowIntakeProductOption"]

class DocflowIntakeParty(TypedDict):
    """Сторона сделки, прочитанная из чужого файла. Показывается ТЕКСТОМ, даже когда контрагент сопоставлен: карточку могут переименовать, а документ обязан остаться читаемым таким, каким его прислали."""

    #: Вид участника словами файла: юридическое лицо, предприниматель, иностранное лицо, физическое лицо
    kind: str
    name: str
    inn: str
    kpp: str
    #: Адрес одной строкой, собранный из частей формата
    address: str

class _DocflowIntakePreviewRequired(TypedDict):
    message: "UUID"
    #: Нашёлся ли во вложениях титул продавца. Ложь означает, что принимать нечего: пакет либо неформализованный, либо файлы ещё не скачаны — чинится это синхронизацией, а не заполнением формы
    formalized: bool
    #: Принимается ли пакет прямо сейчас, без правок
    ready: bool
    #: Вид карточки документооборота, которую заведёт приёмка; пусто — карточки по этому пакету не будет. Читается вместе с formalized: непустой вид при formalized = false означает «учётного документа не будет, карточка будет», и приёмка по такому пакету осмысленна. Договор формализованным титулом не бывает по определению — его присылают подписанным PDF, — поэтому кнопку приёмки на нём гасить нельзя, её следует назвать «Завести карточку».
    flow_card_kind: Literal['', 'contract', 'amendment', 'specification', 'act']
    #: Учётный документ, если пакет уже принят; иначе null. Показывается вместо повторной приёмки: второй документ по тому же пакету — это задвоенный приход и задвоенный долг перед поставщиком.
    accepted: Optional["DocflowAcceptedDocument"]
    source: "DocflowIntakeSource"
    counterparty: "DocflowIntakeCounterparty"
    #: Товарная таблица чужого документа вместе с тем, что мы про неё предлагаем. Всегда массив, даже пустой
    lines: List["DocflowIntakeLine"]
    totals: "DocflowIntakeTotals"
    #: Что мешает принять. Тот же тип и тот же порядок, что у предполётной проверки исходящего документа: интерфейс переводит их одним словарём
    issues: List["DocflowIssue"]

class DocflowIntakePreview(_DocflowIntakePreviewRequired, total=False):
    """Что мы предлагаем принять к учёту. Ничего не меняет и никуда не ходит: предложение обязано быть безопасным, иначе «посмотреть, что там» становится действием с последствиями, и человек побоится его открыть раньше, чем решит принимать."""

    #: Бумага закрывающая (УПД, акт, накладная поставщика): приёмка с закупкой проводит её исполнение — акт поставщика по заказу, без ВХ и без разнесения (ERP-1810). Строки без номенклатуры этот путь не держат: акт исполняет строки заказа
    executes_order: bool
    #: Подбор закупки для «Куда в учёт» (ERP-1810): закупка, в которой бумага уже лежит (linked), открытые закупки того же поставщика и юрлица с остатком, равным сумме бумаги (amount), затем прочие, куда она помещается (open). Пусто у счёта и договора и когда закупок нет
    purchases: List["DocflowIntakePurchase"]

class DocflowIntakeProductOption(TypedDict):
    """Вариант номенклатуры, предложенный неоднозначной строке."""

    id: "UUID"
    name: str
    sku: str

class _DocflowIntakePurchaseRequired(TypedDict):
    order_id: "UUID"
    #: Номер закупки
    number: str
    #: Заказано
    amount: str
    #: Осталось исполнить: заказано минус проведённые исполнения
    remaining: str
    #: Почему предложена: linked — бумага уже лежит в ней; amount — остаток равен сумме бумаги; open — бумага помещается в остаток
    reason: Literal['linked', 'amount', 'open']

class DocflowIntakePurchase(_DocflowIntakePurchaseRequired, total=False):
    """Закупка, исполнением которой можно принять закрывающую бумагу поставщика (ERP-1810)."""

    title: str
    #: Дата закупки ГГГГ-ММ-ДД
    date: str
    currency: str
    #: Договор закупки
    contract_number: str

class DocflowIntakeSource(TypedDict):
    """Реквизиты чужого файла обмена, из которого всё прочитано. Разбор частичный и ничего не проверяет: файл уже подписан и юридически значим, и отказать в его чтении из-за реквизита, который нам не нужен, значит потерять поставку из-за чужой ошибки в необязательном поле."""

    attachment: "UUID"
    #: Как это вложение назвал ОПЕРАТОР. Стоит рядом с file_name намеренно: имя оператора («Счёт-фактура № 12») человек видит в списке вложений, а file_name — имя файла обмена, и это разные строки
    attachment_name: str
    #: ИдФайл: имя файла обмена без расширения, как его записал продавец
    file_name: str
    #: ВерсФорм: редакция формата словами самого файла
    format_version: str
    #: Код документа по классификатору; у титула продавца 1115131
    knd: str
    #: Функция документа словами продавца: СЧФ, ДОП, СЧФДОП
    function: str
    #: Наименование документа, данное ему составителем
    document_kind_name: str
    #: Номер документа продавца
    number: str
    #: Дата документа в форме ГГГГ-ММ-ДД. Пусто — дата не разобралась
    date: str
    #: Она же в форме поставщика ДД.ММ.ГГГГ. Показывается, когда разбор не удался: чужую опечатку человек поймёт быстрее, чем пустое поле
    date_raw: str
    #: Валюта документа наименованием и кодом, словами файла
    currency: str
    #: Содержание операции словами продавца
    operation: str
    seller: "DocflowIntakeParty"
    buyer: "DocflowIntakeParty"

class DocflowIntakeTotals(TypedDict):
    """Итоги таблицы словами поставщика. Мы их не пересчитываем: итог в чужом документе такой, какой он подписал."""

    without_vat: str
    #: Пусто при отметке «без НДС» у документа
    vat_amount: str
    with_vat: str
    #: Отметка «без НДС» у документа целиком
    vat_without: bool

class _DocflowIssueRequired(TypedDict):
    #: Машинный код проверки. Стабилен: по нему интерфейс ищет перевод. Проверки формата приходят кодами docflow.formats.* (required, too_long, too_short, pattern, not_allowed, not_a_number, negative, too_many_decimals, too_many_digits, not_encodable, conflict, no_lines, unsupported), а перевод учётного документа в титул добавляет свои — docflow.edo.counterparty_required (в документе не указан контрагент) и docflow.edo.seller_title_missing (во входящем пакете нет формализованного документа продавца: отвечать титулом покупателя не на что, а принимать к учёту нечего). Приёмка к учёту добавляет свои пять: docflow.edo.contact_required (не выбран контрагент), docflow.edo.date_unreadable (дата документа продавца не разобралась), docflow.edo.no_lines (в титуле продавца нет ни одной товарной строки), docflow.edo.product_required (строке документа не сопоставлена номенклатура) и docflow.edo.sign_first (документ ещё не подписан: в учёт его принимают после подписи)
    code: str
    #: Путь до реквизита ИМЕНАМИ ФНС — именами приказа, а не нашими: этими же словами человек будет искать требование в письме налоговой. Например `Документ/СвСчФакт/СвПрод/Адрес`.
    path: str

class DocflowIssue(_DocflowIssueRequired, total=False):
    """Одна невыполненная проверка. Форма одна на сборку файла формата ФНС и на приёмку входящего документа к учёту: интерфейс переводит их одним словарём, и вторая форма списка означала бы второй словарь. Ни одной надписи для человека здесь нет: код, путь реквизита и подробности значениями — фразу собирает интерфейс, и собирает её на языке читателя."""

    #: Номер товарной строки с единицы. Отсутствует, когда реквизит не про строку
    line: int
    #: Подробности значениями: предел длины, перечень допустимых значений, пришедшее значение. Отсутствует, когда проверке нечего добавить.
    params: Dict[str, str]

class _DocflowMessageRequired(TypedDict):
    id: "UUID"
    connection: "UUID"
    #: Идентификатор пакета у оператора
    external_id: str
    #: Редакция пакета: оператор меняет содержимое конверта, не меняя его идентификатор
    external_revision: str
    direction: Literal['incoming', 'outgoing']
    #: Слова оператора, а не наша классификация
    doc_type: str
    doc_subtype: str
    doc_regulation: str
    number: str
    #: Календарная дата документа ГГГГ-ММ-ДД; пусто означает, что даты нет вовсе
    date: str
    #: Сумма строкой ровно так, как её прислал оператор; пусто означает «суммы нет», а не ноль
    amount: str
    currency: str
    counterparty: "DocflowCounterparty"
    #: Код состояния документооборота у оператора
    state_code: str
    #: Состояние словами оператора: своего перевода состояний у нас нет и быть не должно
    state_name: str
    our_org_external_id: str
    created_at: str
    updated_at: str
    connection_name: str
    connection_provider: str
    company_name: str
    attachments_total: int
    signatures_total: int
    #: Сколько незакрытых этапов у пакета. Ноль означает «ход не за нами»
    actions_due: int
    #: Название ближайшего незакрытого этапа словами оператора
    stage_name: str
    #: У пакета открыт этап, который закрывается нашей подписью под самим документом. Отдельно от actions_due и stage_name: счётчик говорит «ход за нами», а название этапа — слова оператора, и отличить по ним подпись от согласования нельзя. Пока признак поднят, приёмка к учёту отказывает кодом docflow.edo.sign_first
    sign_required: bool
    #: Открытый подписной этап служебный: извещение о получении, подтверждение даты, квитанция. Отдельным признаком, потому что человеку это другое дело — «Подписать извещение» подтверждает технологию обмена, а не содержание документа. Приёмку к учёту служебный этап НЕ держит
    notice_sign_required: bool
    #: Пакет записан оператору и наружу ещё не ушёл. Выводится из состава пакета при чтении: исходящий, без единого события обмена и без единой подписи
    draft: bool
    #: Возвращают из корзины только trashed: у draft_removed документа у оператора больше нет
    deleted_reason: Literal['', 'trashed', 'draft_removed']
    #: Открывал ли карточку пакета текущий сотрудник — личная отметка, а не состояние у оператора. Считается в ленте одним запросом на страницу; карточка отдаёт false, потому что её открытие само ставит отметку дверью viewed.
    viewed: bool
    state_category: "DocflowStateCategory"
    #: Карточка документа в кабинете нашей организации у оператора («СсылкаДляНашаОрганизация»); пусто, пока карточку не перечитали
    operator_link: str
    #: Печатный вид пакета (GET .../print); null — показать нечего
    print_form: Optional["DocflowMessagePrintForm"]

class DocflowMessage(_DocflowMessageRequired, total=False):
    """Пакет документов у оператора — конверт, а не учётный документ Акеды."""

    received_at: str
    company: "UUID"
    #: Состав пакета. Наполняется ТОЛЬКО в карточке одного пакета; в списке остаётся null. null означает «не спрашивали», пустой массив — «спросили, и там пусто»
    attachments: Optional[List["DocflowAttachment"]]
    signatures: Optional[List["DocflowSignature"]]
    stages: Optional[List["DocflowStage"]]
    events: Optional[List["DocflowEvent"]]
    #: Карточки документооборота, которые вёз этот конверт. Как и весь состав, наполняется ТОЛЬКО в карточке одного пакета; в списке остаётся null
    flow_documents: Optional[List["DocflowMessageFlowLink"]]
    #: Соглашение сторон об аннулировании. Наполняется ТОЛЬКО в карточке одного пакета; в списке остаётся null — null означает «не спрашивали»
    cancellation: Optional["DocflowCancellation"]
    #: Учётный документ, которым пакет принят к учёту. Пусто означает «не принимали» и делает пакет принимаемым; обнулиться поле может и после приёмки, когда учётный документ удалили
    accounting_document: Optional["UUID"]
    #: Когда пакет приняли к учёту. Переживает удаление учётного документа: приёмка была
    accepted_at: Optional[str]
    #: Кто принял пакет к учёту
    accepted_by: Optional[int]
    #: Номер учётного документа приёмки для строки «В учёте: … № …»; пусто — не принят или документ не прочитан
    accounting_number: str
    #: Вид учётного документа приёмки (ключ вида документа ядра), например finance_purchase
    accounting_type: str
    #: Корзина НАШЕГО зеркала: контрагент её не видит, и пакет у оператора остаётся прежним
    deleted_at: Optional[str]
    deleted_by: Optional[int]
    recognized: "DocflowRecognized"
    #: Что стало с оплатой этого счёта. Приходит И В СПИСКЕ, в отличие от состава пакета: состояние оплаты — ровно то, что человек читает глазами в каждой строке. Считает его модуль finance (счета, выписки и расчёты) одним запросом на всю страницу. null означает «этот счёт никто не оплачивает»: ни заведённой заявки, ни платежа, — именно там и остаётся кнопка «Отправить в оплату».
    payment: Optional["DocflowMessagePayment"]

class DocflowMessageFlowLink(TypedDict):
    """Карточка документооборота в пакете — обратная сторона связи edo_links карточки. Пакет доказывает отправку и подпись, а содержание живёт в карточке; здесь видно, чьё содержание он вёз и чем карточка ему приходится."""

    id: "UUID"
    document: "UUID"
    #: Чем карточка приходится конверту: основной документ, приложение или основание
    role: Literal['primary', 'attachment', 'basis']
    #: Текущая редакция карточки: открывать человеку следует её
    version: int
    kind: "DocflowFlowKind"
    status: Literal['draft', 'registered', 'archived']
    title: str
    number: str
    date: str
    created_at: str

class DocflowMessageList(TypedDict):
    count: int
    results: List["DocflowMessage"]

class _DocflowMessagePaymentRequired(TypedDict):
    #: requested — заявка заведена, денег ещё нет; paid — платёж подтверждён выпиской
    state: Literal['requested', 'paid']
    request: "UUID"

class DocflowMessagePayment(_DocflowMessagePaymentRequired, total=False):
    """Состояние оплаты входящего счёта. Два состояния, а не шесть: путь заявки внутри финансов подробнее (план, отправлена, ждёт подписи, исполнена, отклонена, отменена), но ленте нужен ответ на один вопрос — деньги уже ушли или ещё нет. Оплаченным платёж делает ВЫПИСКА, а не наша кнопка и не слово банка: «отправлено в банк» означает лишь, что платёжка легла в интернет-банк на подпись."""

    #: Номер заявки на оплату словами для человека
    number: str
    #: Дата оплаты из выписки в форме ГГГГ-ММ-ДД. Заполнена только у state=paid
    paid_on: str
    #: Шаг заявки словарём хода заявки «Документов»: до согласования — состояние документа заявки, после — строка очереди финансов
    step: Literal['draft', 'on_approval', 'rework', 'approved', 'scheduled', 'sent', 'paid', 'payment_cancelled']
    #: Заявка «Документов» по этому счёту, если она есть
    docflow_request: Dict[str, Any]
    #: Счёт оплачен своей закупкой: заявки нет (request нулевой), оплата закупки покрывает сумму счёта
    order: Dict[str, Any]

class DocflowMessagePrintForm(TypedDict):
    """Печатный вид пакета. operator — PDF оператора с впечатанными подписями, лежащий у нас; ours — наша форма счёта или УПД по формализованному XML, когда оператор своего вида не отдал (штампа подписи оператора на ней нет)."""

    source: Literal['operator', 'ours']
    size: int
    #: Редакция пакета, с которой снят PDF оператора
    revision: str
    fetched_at: str

class DocflowOrderActInput(TypedDict, total=False):
    #: Дата акта; пусто — дата продажи или закупки
    date: str
    #: Пусто — следующий номер счётчика актов
    number: str
    title: str
    #: Пусто — все услуги продажи или закупки; меньше — частичный акт суммой
    amount: str

class _DocflowOrderDocumentSetRequired(TypedDict):
    members: List["DocflowOrderSetMember"]
    missing: List[str]
    basis: str

class DocflowOrderDocumentSet(_DocflowOrderDocumentSetRequired, total=False):
    order: "DocflowOrderSetOrder"

class _DocflowOrderImportRequired(TypedDict):
    id: "UUID"
    outcome: Literal['accepted', 'updated', 'rejected']
    created_at: str

class DocflowOrderImport(_DocflowOrderImportRequired, total=False):
    external_id: str
    #: Пространство приложения, которое загружало
    source: str
    #: Машинный код отказа, например docflow.sale.contact_unknown
    reason: str
    #: Причина отказа словами
    detail: str
    order_id: "UUID"
    #: Тело загрузки, как его прислали, — для повтора
    payload: str

class DocflowOrderImportPage(TypedDict):
    results: List["DocflowOrderImport"]

class _DocflowOrderInvoiceInputRequired(TypedDict):
    #: Оплатить до
    due_date: str

class DocflowOrderInvoiceInput(_DocflowOrderInvoiceInputRequired, total=False):
    expected_until: str
    payment_purpose: str
    #: Собрать назначение платежа умолчанием
    payment_purpose_auto: bool
    #: Пусто — на весь продажу или закупку; меньше — частичный счёт
    amount: str
    #: Дата счёта; пусто — дата продажи или закупки
    date: str
    #: Пусто — следующий номер счётчика счетов
    number: str
    title: str
    #: Строка графика оплат продажи, по которой выставлен счёт: запоминается в счёте; чужая строка — 409 docflow.sale.payment_term_unknown
    payment_term_id: "UUID"
    #: Сохранить черновиком вместо «Выставить»
    draft: bool

class _DocflowOrderSetMemberRequired(TypedDict):
    id: "UUID"
    kind: str
    title: str
    status: str
    direction: str

class DocflowOrderSetMember(_DocflowOrderSetMemberRequired, total=False):
    number: str
    date: str
    settlement: str
    amount: str
    currency: str
    due_date: str
    #: Назначение платежа, записанное на выданном счёте; только для invoice
    payment_purpose: str
    #: Строка графика оплат продажи, по которой выставлен счёт; только для invoice
    payment_term_id: "UUID"
    self: bool
    #: Входящий счёт оплачен своей закупкой: оплата закупки комплекта покрывает его сумму
    paid_by_order: bool

class _DocflowOrderSetOrderRequired(TypedDict):
    id: "UUID"
    title: str
    status: str

class DocflowOrderSetOrder(_DocflowOrderSetOrderRequired, total=False):
    number: str
    date: str
    amount: str
    currency: str
    side: str
    self: bool

class DocflowOrderUPDInput(TypedDict, total=False):
    #: Дата УПД; пусто — дата продажи или закупки
    date: str
    #: Пусто — все услуги продажи или закупки; меньше — частичный УПД суммой
    amount: str
    stage_id: "UUID"
    #: Пусто — СЧФДОП
    function: Literal['СЧФДОП', 'ДОП']

class _DocflowPaymentRequestRoutePreviewRequired(TypedDict):
    approval: bool
    required: bool
    direct: bool
    destination: Literal['calendar', 'treasury']

class DocflowPaymentRequestRoutePreview(_DocflowPaymentRequestRoutePreviewRequired, total=False):
    route_id: "UUID"
    route_name: str

class _DocflowRecognizedRequired(TypedDict):
    #: Чем прочитано, и заодно насколько верить. title — подписанный файл обмена ФНС, проверять нечего; text — вытащено якорными правилами из чужой раскладки, и рядом со значением интерфейс ставит «проверьте»; none — читали и брать было нечего; пустая строка — разбора не было
    source: Literal['', 'title', 'text', 'none']
    #: Имя вложения СЛОВАМИ ОПЕРАТОРА: по нему человек откроет ту же бумагу и сверит показанную цифру
    document: str
    #: Итог к оплате строкой, как и amount: через число с плавающей точкой здесь теряются копейки. Пустая строка — итог в бумаге не нашёлся
    amount: str
    #: Валюта счёта, если бумага её назвала. Пусто означает «не сказано»: подставлять рубль молча нельзя
    currency: str
    number: str
    #: Дата документа в форме ГГГГ-ММ-ДД; пустая строка означает, что даты нет
    date: str

class DocflowRecognized(_DocflowRecognizedRequired, total=False):
    """Сумма и реквизиты, прочитанные ИЗ ФАЙЛА пакета, а не присланные оператором. Оператор присылает сумму отдельным реквизитом только у формализованных документов — УПД и счёта-фактуры; у счёта на оплату и договора она живёт внутри PDF. Поле стоит РЯДОМ с amount, а не вместо него: amount — слова оператора, по ним сверяют переписку спустя годы, и подменять их нашим чтением чужой бумаги нельзя. Разбор локальный и детерминированный: текстовый слой PDF, у скана — распознавание изображения; ни одной нейросети и ни одного обращения к платному справочнику. Строк товарной таблицы здесь нет: со скана они не восстанавливаются и фактом не выдаются."""

    #: Когда разбирали. Пусто — попытки ещё не было; это не то же самое, что source=none («читали и брать оказалось нечего»)
    at: Optional[str]

class _DocflowSalesOrderRequired(TypedDict):
    id: "UUID"
    company_id: "UUID"
    contact_id: "UUID"
    title: str
    status: Literal['draft', 'confirmed', 'done', 'cancelled']
    scenario: Literal['self_service', 'one_off_sale', 'contract_sale']
    steps: List[str]
    currency: str
    prices_include_vat: bool
    items: List["DocflowSalesOrderItem"]
    amount: str
    goods_amount: str
    service_amount: str
    #: Сколько денег пришло на счёт по продаже или закупке
    paid_amount: str
    shipped_amount: str
    invoiced_amount: str
    closed_amount: str
    payment_status: Literal['unpaid', 'partial', 'paid']
    shipment_status: Literal['not_shipped', 'partial', 'shipped']
    created_at: str
    updated_at: str

class DocflowSalesOrder(_DocflowSalesOrderRequired, total=False):
    contract_document_id: "UUID"
    number: str
    status_id: "UUID"
    #: Имя статуса, которое придумал кабинет
    status_name: str
    funnel_id: "UUID"
    manager: str
    comment: str
    external_id: str
    buyer: "DocflowSalesOrderBuyer"
    #: Сколько подтвердил эквайринг — списания минус возвраты
    acquiring_amount: str
    order_date: str
    ship_date: str
    due_date: str
    discount: str
    company_name: str
    contact_name: str
    contract_title: str
    company_archived: bool
    contact_archived: bool

class DocflowSalesOrderBuyer(TypedDict, total=False):
    """Как покупатель представился в продаже или закупке"""

    name: str
    phone: str
    email: str

class _DocflowSalesOrderItemRequired(TypedDict):
    id: "UUID"
    title: str
    kind: str
    quantity: str
    price: str
    position: int

class DocflowSalesOrderItem(_DocflowSalesOrderItemRequired, total=False):
    product_id: "UUID"
    unit: str
    discount: str
    vat_rate: str
    amount: str

class DocflowSalesOrderStatusInput(TypedDict):
    status: Literal['draft', 'confirmed', 'done', 'cancelled']

class _DocflowSignatureRequired(TypedDict):
    id: "UUID"
    message: "UUID"
    side: Literal['ours', 'counterparty']
    signer_name: str
    signer_position: str
    certificate: "DocflowCertificate"
    #: Номер машиночитаемой доверенности. С 2023 года подпись сотрудника без неё недействительна
    poa_number: str
    #: Контейнер подписи скачан к нам и открывается отдельной операцией
    stored: bool
    created_at: str

class DocflowSignature(_DocflowSignatureRequired, total=False):
    """Подпись под вложением или под пакетом целиком. Подписей под одним файлом несколько — наша и контрагента, — и каждая приходит своим файлом со своим сертификатом."""

    attachment: "UUID"
    signed_at: str

class DocflowStage(TypedDict):
    """Этап документооборота: что с пакетом можно сделать сейчас. Список действий приходит от ОПЕРАТОРА и не выводится из нашего состояния."""

    id: "UUID"
    message: "UUID"
    #: Идентификатор этапа у оператора; он же адресует действие
    external_id: str
    name: str
    actions: List["DocflowStageAction"]
    #: Этап закрывается подписью. Признак оператора, а не наш вывод из названия
    requires_signature: bool
    #: Ход не за нами. Закрытые этапы не показываются и не считаются
    closed: bool
    #: Служебный этап оператора — извещение о получении, подтверждение, квитанция. Технология обмена, а не решение по документу: клиент обрабатывает все служебные этапы пакета одним действием, а не по кнопке на каждый
    service: bool
    #: С какого момента этап ждёт человека: дата этапа у оператора, без неё — когда зеркало увидело его открытым; открытый снова этап считается заново
    started_at: str
    created_at: str
    updated_at: str

class _DocflowStageActionRequired(TypedDict):
    code: str
    name: str

class DocflowStageAction(_DocflowStageActionRequired, total=False):
    """Действие, которое оператор разрешает на этапе. Код отправляют оператору, надпись показывают человеку."""

    #: Действие закрывается подписью («ТребуетПодписания» оператора). Точнее признака этапа: на этапе «Утверждение» подписи требует «Утвердить», а «Переназначить» — нет. У этапов, записанных до появления признака, false у всех действий — тогда судят по requires_signature этапа
    requires_signature: bool

DocflowStateCategory = Literal['in_work', 'awaiting_signature', 'cancellation_requested', 'cancellation_refused', 'draft', 'error', 'signer_invalid', 'approved', 'rejected', 'cancelled', 'interrupted']

class _DocflowTemplatePastActRequired(TypedDict):
    order_id: "UUID"
    number: str
    date: str
    #: Дата закрывающей бумаги по правилу шаблона
    closing_date: str
    amount: str
    currency: str
    #: Бумага выпущена этим нажатием
    issued: bool

class DocflowTemplatePastAct(_DocflowTemplatePastActRequired, total=False):
    #: Почему бумага не выпущена
    error: Literal['period_closed', 'act_needs_no_vat', 'failed']

class DocflowTemplatePastActs(TypedDict):
    items: List["DocflowTemplatePastAct"]
    issued: int
    failed: int

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

class FilesAccessPolicy(TypedDict):
    folder_id: "UUID"
    root_id: "UUID"
    is_root: bool
    restricted: bool
    break_inheritance: bool
    grants: List["FilesGrant"]
    #: Права, действующие сверху по дереву
    inherited: List["FilesGrant"]

class FilesBreadcrumb(TypedDict):
    id: "UUID"
    name: str

class _FilesEntryRequired(TypedDict):
    kind: Literal['folder', 'file']

class FilesEntry(_FilesEntryRequired, total=False):
    folder: "FilesFolder"
    file: "FilesFile"

class _FilesFileRequired(TypedDict):
    id: "UUID"
    folder_id: "UUID"
    root_id: "UUID"
    name: str
    extension: str
    mime_type: str
    size_bytes: int
    version_no: int
    owner_id: int
    created_by: int
    created_at: str
    updated_at: str
    #: skipped — содержимое крупнее порога проверки: оно выдаётся, но честно помечено непроверенным
    scan_status: Literal['pending', 'scanning', 'clean', 'infected', 'skipped', 'error']
    preview_status: Literal['pending', 'processing', 'ready', 'unsupported', 'error']
    has_thumbnail: bool
    is_favorite: bool

class FilesFile(_FilesFileRequired, total=False):
    #: HTTP(S)-адрес внешнего ярлыка; отсутствует у обычных файлов
    external_url: str
    version_id: "UUID"
    updated_by: int
    trashed_at: str
    scan_verdict: str
    folder_name: str
    path: List["FilesBreadcrumb"]

class _FilesFolderRequired(TypedDict):
    id: "UUID"
    root_id: "UUID"
    depth: int
    name: str
    #: Личное хранилище принадлежит своему владельцу целиком
    kind: Literal['shared', 'personal']
    icon: str
    color: str
    description: str
    #: Закрытое хранилище видно только участникам его списка
    is_restricted: bool
    #: Права хранилища на эту папку не действуют
    break_inheritance: bool
    #: Бизнес хранилища; у вложенной папки — бизнес её хранилища. Хранилище бизнеса видят участники, чья область доступа касается бизнеса, и поимённо выданные; null — хранилище всего кабинета или личное
    business_id: Optional["UUID"]
    owner_id: int
    created_by: int
    created_at: str
    updated_at: str
    can_read: bool
    can_write: bool
    #: Право выпускать внешние ссылки; из открытости хранилища не следует
    can_share: bool
    can_manage: bool
    is_favorite: bool
    folder_count: int
    file_count: int
    size_bytes: int

class FilesFolder(_FilesFolderRequired, total=False):
    parent_id: "UUID"
    trashed_at: str

class _FilesFolderInputRequired(TypedDict):
    name: str

class FilesFolderInput(_FilesFolderInputRequired, total=False):
    parent_id: "UUID"
    icon: str
    color: str
    description: str
    kind: Literal['shared']
    is_restricted: bool
    #: Бизнес общего хранилища (только у верхнего уровня). Поле не передано — не менять (у нового — единственный бизнес области доступа или весь кабинет); null — хранилище всего кабинета. Бизнес вне области доступа — 403 files.business_forbidden
    business_id: Optional["UUID"]

class _FilesGrantRequired(TypedDict):
    principal_type: Literal['everyone', 'user', 'role', 'department']
    principal_key: str
    can_read: bool
    can_write: bool
    can_share: bool
    can_manage: bool

class FilesGrant(_FilesGrantRequired, total=False):
    id: "UUID"

class FilesListing(TypedDict):
    folder: "FilesFolder"
    path: List["FilesBreadcrumb"]
    entries: List["FilesEntry"]
    total: int

class _FilesSearchHitRequired(TypedDict):
    file: "FilesFile"
    matched: Literal['name', 'content']

class FilesSearchHit(_FilesSearchHitRequired, total=False):
    snippet: str

class _FilesShareRequired(TypedDict):
    id: "UUID"
    root_id: "UUID"
    #: upload — приёмник файлов: получатель кладёт своё и не видит чужого
    mode: Literal['view', 'download', 'upload']
    title: str
    has_password: bool
    download_count: int
    created_by: int
    created_at: str

class FilesShare(_FilesShareRequired, total=False):
    folder_id: "UUID"
    file_id: "UUID"
    expires_at: str
    max_downloads: int
    last_access_at: str
    revoked_at: str
    target_name: str
    #: Показывается один раз при создании; в базе лежит только его хэш
    token: str
    url: str

class _FilesShareInputRequired(TypedDict):
    mode: Literal['view', 'download', 'upload']

class FilesShareInput(_FilesShareInputRequired, total=False):
    folder_id: "UUID"
    file_id: "UUID"
    title: str
    password: str
    #: Момент, после которого ссылка перестаёт открываться
    expires_at: Optional[str]
    max_downloads: Optional[int]

class _FilesUploadRequired(TypedDict):
    id: "UUID"
    folder_id: "UUID"
    root_id: "UUID"
    name: str
    mime_type: str
    size_bytes: int
    part_bytes: int
    part_count: int
    status: Literal['pending', 'uploading', 'completed', 'failed', 'aborted']
    expires_at: str
    created_at: str

class FilesUpload(_FilesUploadRequired, total=False):
    file_id: "UUID"
    error_code: str
    #: Уже принятые части; на них держится докачка
    uploaded: List["FilesUploadedPart"]
    #: Подписанные адреса частей для прямой записи в объектное хранилище
    direct_urls: Dict[str, str]

class _FilesUploadInputRequired(TypedDict):
    folder_id: "UUID"
    name: str
    size_bytes: int

class FilesUploadInput(_FilesUploadInputRequired, total=False):
    #: Задан при загрузке новой версии существующего файла
    file_id: "UUID"
    #: Путь файла внутри загружаемой папки; недостающие папки создаются по нему
    relative_path: str
    mime_type: str
    comment: str

class FilesUploadedPart(TypedDict):
    number: int
    etag: str
    size: int

class _FilesVersionRequired(TypedDict):
    id: "UUID"
    file_id: "UUID"
    version_no: int
    size_bytes: int
    mime_type: str
    #: Версия со статусом pending, scanning или infected не отдаётся
    scan_status: Literal['pending', 'scanning', 'clean', 'infected', 'skipped', 'error']
    preview_status: Literal['pending', 'processing', 'ready', 'unsupported', 'error']
    text_status: Literal['pending', 'processing', 'ready', 'unsupported', 'error']
    created_by: int
    created_at: str

class FilesVersion(_FilesVersionRequired, total=False):
    content_sha256: str
    scan_verdict: str
    comment: str

class _FinanceAccountRequired(TypedDict):
    id: "UUID"
    #: Где лежат деньги. `bank` — расчётный счёт, `cash` — касса из справочника «Кассы». Список общий намеренно: вопрос «сколько у меня денег» задаётся один раз. У кассы банковские поля (`bic`, `number`, `bank_name`, `connector`) пусты по построению, а не «ещё не заполнены», и карточка счёта по её идентификатору не открывается.
    kind: Literal['bank', 'cash']
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

class FinanceAccount(_FinanceAccountRequired, total=False):
    #: Бизнес, которому принадлежат деньги — у счёта из юрлица, у кассы из её карточки. null только у старого счёта без юрлица в кабинете с несколькими бизнесами.
    business: Optional[str]
    #: Остаток по данным банка на момент `bank_balance_at`, decimal string. null — банк остатка не называл (счёт не подключён или остаток ещё не приходил): это не ноль, и сверять с ним нечего.
    bank_balance: Optional[str]
    #: Когда банк назвал остаток `bank_balance`.
    bank_balance_at: Optional[str]
    #: Когда счёт закрыт банком. null — счёт действующий.
    bank_closed_at: Optional[str]
    #: «Используется с»: с какой даты счёт принадлежит бизнесу. Операции раньше неё коннектор не запрашивает, загрузка файла пропускает, ручной ввод отклоняет. Поля нет — ограничения нет.
    in_use_since: str
    #: Часовой пояс банковских суток счёта (IANA), например Asia/Novosibirsk. По нему банк режет сутки выписки, и по нему считаются окно синхронизации, «Загрузить период» и остаток на дату. Умолчание — по БИК подразделения банка. null у кассы.
    bank_timezone: Optional[str]
    #: Откуда пояс: `bic` — определён по БИК, `default` — определить не удалось, стоит умолчание (проверьте пояс), `manual` — задан человеком; подключение банка ручной пояс не трогает.
    bank_timezone_source: Optional[Literal['bic', 'default', 'manual', None]]
    #: Вид счёта. `settlement` — расчётный (счёт книги 51), `deposit` — вклад. Деньги вклада учитываются статьёй «Депозиты и вклады»: отправка и возврат идут ею, а остаток депозитного счёта в итог денег не входит.
    account_type: Literal['settlement', 'deposit']
    #: Откуда вид: `number` — выведен из номера счёта (421…–422… и 423…, 426… — вклад), `bank` — назван банком, `manual` — выбран человеком. Ручной выбор номер и банк не перебивают.
    account_type_source: Literal['number', 'bank', 'manual']

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
    is_active: bool
    #: «Используется с», ГГГГ-ММ-ДД; пусто — без ограничения.
    in_use_since: str

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
    #: «Используется с», ГГГГ-ММ-ДД; null или пустая строка снимают ограничение.
    in_use_since: Optional[str]
    #: Часовой пояс банковских суток (IANA). Источник пояса становится manual.
    bank_timezone: str

class _FinanceAccountableBalanceRequired(TypedDict):
    #: Сотрудник; пусто — проводки 71 без сотрудника
    employee: str
    employee_name: str
    #: Выдано под отчёт
    issued: str
    #: Отчитано авансовыми отчётами
    reported: str
    #: Возвращено деньгами
    returned: str
    #: На руках; минус — перерасход
    balance: str
    days_open: int
    #: Срок авансового отчёта бизнеса, дней
    deadline: int
    overdue: bool

class FinanceAccountableBalance(_FinanceAccountableBalanceRequired, total=False):
    business: str
    #: Старейшая непокрытая выдача
    oldest_open: str

class FinanceAccountableBalances(TypedDict):
    on: str
    rows: List["FinanceAccountableBalance"]

class _FinanceAcquirerRequired(TypedDict):
    #: Настройка эквайринга
    id: "UUID"
    #: Юрлицо-продавец
    company_id: "UUID"
    #: Ключ провайдера, как в подтверждении оплаты картой (yookassa)
    provider: str
    #: Контрагент-эквайер
    contact_id: "UUID"
    #: Ставка НДС, которую эквайер начисляет на комиссию, в процентах; null — без НДС
    fee_vat_rate: Optional[str]
    #: Когда признаётся расход по комиссии: payment — по данным платежа; closing_document — по закрывающему документу эквайера (УПД или акт за период)
    fee_recognition: Literal['payment', 'closing_document']

class FinanceAcquirer(_FinanceAcquirerRequired, total=False):
    #: Название контрагента-эквайера
    contact_name: str

class _FinanceAcquirerInputRequired(TypedDict):
    #: Юрлицо-продавец
    company_id: "UUID"
    #: Ключ провайдера, как в подтверждении оплаты картой (yookassa)
    provider: str
    #: Действующий контрагент кабинета — эквайер
    contact_id: "UUID"

class FinanceAcquirerInput(_FinanceAcquirerInputRequired, total=False):
    #: Ставка НДС эквайера на комиссию в процентах, от 0 до 100; пусто или null — без НДС
    fee_vat_rate: Optional[str]
    #: Когда признаётся расход по комиссии: payment — по данным платежа; closing_document — по закрывающему документу эквайера
    fee_recognition: Literal['payment', 'closing_document']

class FinanceAcquirerList(TypedDict):
    #: Эквайеры доступных юрлиц
    acquirers: List["FinanceAcquirer"]

class _FinanceAcquiringCaptureInputRequired(TypedDict):
    #: Ключ проверенного провайдера платежа
    provider: str
    #: Уникальный номер списания у провайдера; повтор использует тот же номер
    external_id: str
    #: Положительная сумма списания в валюте продажи, десятичная строка
    amount: str
    #: Валюта продажи, ISO 4217
    currency: str
    #: Дата подтверждённого списания у провайдера
    paid_at: str

class FinanceAcquiringCaptureInput(_FinanceAcquiringCaptureInputRequired, total=False):
    #: Продажа, заведённая этой установкой приложения. Без неё обязателен company_id: оплата розницы ложится на покупателя и разносится алгоритмом — в продажу дня, если она есть (ERP-1727)
    order_id: "UUID"
    #: Юрлицо-продавец оплаты без продажи; при order_id не нужно
    company_id: "UUID"
    #: Покупатель оплаты без продажи; не передан — системный «Розничный покупатель»
    contact_id: "UUID"
    #: Сколько провайдер удержал из этого платежа, всего с налогом, десятичная строка; меньше суммы списания. Не передаётся, если провайдер удержание по платежу не называет. Создаёт документ «Комиссия эквайринга» (Дт 44 / Кт 57.03); в отпечаток повтора не входит, поэтому может прийти позже повтором того же платежа
    fee: str
    #: В том числе налог с комиссии, десятичная строка, если провайдер его называет; передаётся только вместе с fee. Не передан — финансы считают налог по ставке эквайера из настройки «Эквайринг». К вычету (Дт 19) идёт, если юрлицо на дату выделяет входной налог; иначе остаётся в расходе
    fee_vat: str

class FinanceAcquiringCaptureResult(TypedDict):
    #: Финансовый документ оплаты картой
    document_id: "UUID"
    #: Оплата проведена в учёте
    status: Literal['posted']
    #: Продажа, на которую указано списание
    order_id: "UUID"
    #: true при повторе уже записанного списания
    replayed: bool

class _FinanceAcquiringInTransitRequired(TypedDict):
    #: Документ «Оплата картой»
    receipt_document_id: "UUID"
    #: Номер документа оплаты
    number: str
    #: Дата оплаты
    date: str
    #: Юрлицо
    company_id: "UUID"
    #: Ключ провайдера
    provider: str
    #: Идентификатор платежа у провайдера
    external_id: str
    #: Сумма оплаты в валюте учёта
    amount: str
    #: Удержание провайдера в валюте учёта; 0 — ещё неизвестно
    fee: str
    #: Ожидаемая сумма к зачислению
    net_amount: str
    #: Удержание уже заведено «Комиссией эквайринга»
    fee_known: bool

class FinanceAcquiringInTransit(_FinanceAcquiringInTransitRequired, total=False):
    #: Продажа
    order_id: "UUID"
    #: Покупатель
    contact_id: "UUID"
    #: Название покупателя
    contact_name: str

class FinanceAcquiringOverview(TypedDict):
    #: Оплаты, которые эквайер ещё не перечислил
    in_transit: List["FinanceAcquiringInTransit"]
    #: Ожидаемая сумма к зачислению по ним
    in_transit_total: str
    #: Выплаты эквайера, новые сверху
    payouts: List["FinanceAcquiringPayout"]
    #: Последние реестры провайдера
    registries: List["FinanceAcquiringRegistry"]
    #: Эквайеры юрлиц
    acquirers: List["FinanceAcquirer"]

class _FinanceAcquiringPayoutRequired(TypedDict):
    #: Банковская операция выплаты
    document_id: "UUID"
    #: Номер банковской операции
    number: str
    #: Дата зачисления
    date: str
    #: Юрлицо
    company_id: "UUID"
    #: Сумма зачисления
    amount: str
    #: Сколько оплат сверено с выплатой
    cleared_count: int
    #: Сумма к зачислению сверенных оплат
    cleared_net: str
    #: Сверенные оплаты дают ровно сумму выплаты
    reconciled: bool

class FinanceAcquiringPayout(_FinanceAcquiringPayoutRequired, total=False):
    #: Плательщик выплаты
    contact_name: str
    #: auto — по сумме к зачислению; registry — по реестру провайдера
    clearing_source: str

class _FinanceAcquiringRegistryRequired(TypedDict):
    #: Реестр
    id: "UUID"
    #: Юрлицо
    company_id: "UUID"
    #: Ключ провайдера
    provider: str
    #: Имя загруженного файла
    file_name: str
    #: Валюта платежей, ISO 4217
    currency: str
    #: Число платежей в реестре
    rows_count: int
    #: Сумма платежей
    amount: str
    #: Сумма к зачислению — ею реестр находит выплату
    net_amount: str
    #: Удержано всего
    fee_amount: str
    #: awaiting_payout — выплаты на сумму реестра ещё нет; matched — сверен; discrepancy — сверен, но есть строки для человека
    status: Literal['matched', 'awaiting_payout', 'discrepancy']
    #: Когда загружен
    uploaded_at: str

class FinanceAcquiringRegistry(_FinanceAcquiringRegistryRequired, total=False):
    #: Выплата эквайера, с которой реестр сверен
    payout_document_id: "UUID"
    #: Строки реестра
    rows: List["FinanceAcquiringRegistryRow"]

class FinanceAcquiringRegistryImport(TypedDict):
    registry: "FinanceAcquiringRegistry"
    #: true — этот файл уже был загружен
    replayed: bool

class _FinanceAcquiringRegistryInputRequired(TypedDict):
    #: Юрлицо, чьи платежи в реестре
    company_id: "UUID"
    #: Ключ провайдера (yookassa)
    provider: str
    #: Содержимое CSV реестра текстом в UTF-8, до 4 МБ
    content: str

class FinanceAcquiringRegistryInput(_FinanceAcquiringRegistryInputRequired, total=False):
    #: Имя файла для истории загрузок
    file_name: str

class _FinanceAcquiringRegistryRowRequired(TypedDict):
    #: Номер строки в файле
    line: int
    #: Идентификатор платежа у провайдера
    external_id: str
    #: Сумма платежа, десятичная строка
    amount: str
    #: Сумма к зачислению, десятичная строка
    net_amount: str
    #: Удержано провайдером, всего с налогом
    fee: str
    #: matched — оплата найдена и удержание сходится; unknown_payment — оплаты с таким номером в учёте нет; fee_mismatch — в учёте другое удержание
    status: Literal['matched', 'unknown_payment', 'fee_mismatch']

class FinanceAcquiringRegistryRow(_FinanceAcquiringRegistryRowRequired, total=False):
    #: В том числе налог с комиссии
    fee_vat: str
    #: Время платежа из реестра
    paid_at: str
    #: Найденная оплата картой
    receipt_document_id: "UUID"

class FinanceAllocationRule(TypedDict, total=False):
    """Версия правила авторазнесения. Пустые уровни — правило не сужено."""

    id: "UUID"
    business_id: "UUID"
    company_id: "UUID"
    account_id: "UUID"
    contact_id: "UUID"
    contract_id: "UUID"
    #: Поступления или выплаты
    side: Literal['receipt', 'payout']
    #: Правило; inherit — как у уровня выше
    rule: Literal['ask', 'fifo', 'due_date', 'exact_amount', 'inherit']
    #: Дата начала действия версии
    valid_from: str
    created_by: int
    created_at: str

class _FinanceAllocationRuleInputRequired(TypedDict):
    business_id: "UUID"
    side: Literal['receipt', 'payout']
    rule: Literal['ask', 'fifo', 'due_date', 'exact_amount', 'inherit']
    valid_from: str

class FinanceAllocationRuleInput(_FinanceAllocationRuleInputRequired, total=False):
    """Новая версия правила авторазнесения."""

    company_id: "UUID"
    account_id: "UUID"
    contact_id: "UUID"
    contract_id: "UUID"

class FinanceAllocationRuleRun(TypedDict, total=False):
    """Оплаты, которые разнесёт правило, и сколько разнесено. Отказ одной оплаты прогон не обрывает: её строка несёт failure (period_closed, posting_refused или failed)."""

    dry_run: bool
    #: Сколько оплат разнесено; в предпросмотре 0
    applied: int
    items: List[Dict[str, Any]]

class FinanceAllocationRuleRunInput(TypedDict, total=False):
    """Разнесение очереди по правилу; dry_run — предпросмотр."""

    business_id: "UUID"
    #: Предпросмотр без записи
    dry_run: bool

class FinanceBalanceItem(TypedDict):
    code: str
    name: str
    amount: str

class _FinanceBalanceReportRequired(TypedDict):
    on: str
    currency: str
    sections: List["FinanceBalanceSection"]
    assets_total: str
    passive_total: str
    retained_earnings: str
    difference: str

class FinanceBalanceReport(_FinanceBalanceReportRequired, total=False):
    accounting_basis: "AccountingBasis"

class FinanceBalanceSection(TypedDict):
    key: Literal['asset', 'liability', 'equity']
    label: str
    total: str
    items: List["FinanceBalanceItem"]

class FinanceBankLookup(TypedDict):
    directory_configured: bool
    bank: Optional["FinanceRequisitesBank"]

class FinanceBankSuggestions(TypedDict):
    directory_configured: bool
    banks: List["FinanceRequisitesBank"]

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
    #: Прежнее учётное физлицо зарплаты; пустая строка снимает его. Новое разнесение указывает человека в for_contact
    employee: str
    #: Идентификатор контрагента; пустая строка снимает контрагента
    contact: str
    #: «За кого»: контрагент сотрудника или собственника, чей расчёт гасит выдача. Пусто — как контрагент; не присланное поле остаётся как было
    for_contact: Optional[str]
    #: Продажа или закупка, который оплачивают наличные (приход — продажа, расход — закупка того же контрагента). Пустая строка снимает продажу или закупку; не присланное поле остаётся как было
    order: Optional[str]

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

FinanceCashflowReport = TypedDict("FinanceCashflowReport", {"unassigned_company": "FinanceCashflowReportUnassignedCompany", "currency": str, "from": str, "to": str, "inflow": str, "outflow": str, "uncategorized_net": str, "net_cash_flow": str, "transfer_in": str, "transfer_out": str, "sections": List["FinanceCashflowSection"], "columns": List["FinanceReportColumn"]}, total=False)

class FinanceCashflowReportUnassignedCompany(TypedDict, total=False):
    """При отборе по юрлицу — чистый поток движений без юрлица и всего бизнеса"""

    net_cash_flow: str
    business_net_cash_flow: str

class FinanceCashflowSection(TypedDict):
    key: Literal['operating', 'investing', 'financing']
    label: str
    net: str
    items: List["FinanceCashflowItem"]

class FinanceCommercialPosition(TypedDict):
    terms: "FinanceCounterpartyTerms"
    exposure: "FinanceSettlementExposure"

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
    #: The provider's technical reply, verbatim — material for an investigation, not a message for the cabinet screen: it may carry machine keys such as "invalid_client". The portal operator reads it in full on the bank connectors page, while the cabinet card renders last_error_code instead. Empty when the failure was ours: an internal cause never reaches this field, it is logged and named by last_error_code instead.
    last_error: str
    #: Machine code of the last failure, translated by the client. Present because the text is stored: it is written in whatever locale the background sync happened to run in, and only a finite code can be rendered in the reader's language.
    last_error_code: Literal['', 'finance.connector.internal', 'finance.connector.provider_unauthorized', 'finance.connector.provider_rate_limited', 'finance.connector.provider_declined', 'finance.connector.consent_required']
    accounts_total: int
    accounts_linked: int
    #: True only for an abandoned connection attempt: no accounts returned by the bank and no sync run at all. Everything else is the origin trail of the imported operations and is never deleted — both links cascade — so such a connection is disconnected instead.
    can_delete: bool
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

class _FinanceConnectorMTLSStatusRequired(TypedDict):
    configured: bool

class FinanceConnectorMTLSStatus(_FinanceConnectorMTLSStatusRequired, total=False):
    expires_at: Optional[str]
    warning: str

class FinanceConnectorPage(TypedDict):
    count: int
    results: List["FinanceConnector"]

class _FinanceConnectorProviderRequired(TypedDict):
    key: "FinanceConnectorProviderKey"
    name: str
    auth_kind: "FinanceConnectorAuthKind"
    supports_webhook: bool
    credential_hint: str
    #: Банк принимает запросы только с адресов, объявленных в его кабинете.
    requires_egress_allowlist: bool
    #: Банк не отдаёт списка счетов организации — номер счёта называет человек.
    requires_account_number: bool
    #: Пояс банковских суток (IANA), например Europe/Moscow. По нему считаются окно выписки и «сегодня» банка; даты операций банка не пересчитываются.
    timezone: str

class FinanceConnectorProvider(_FinanceConnectorProviderRequired, total=False):
    redirect_path: str
    #: Исходящие адреса контура для белого списка банка. Пусто — адрес контура не настроен.
    egress_ips: List[str]

FinanceConnectorProviderKey = Literal['modulbank', 'tbank', 'tochka', 'alfa', 'sber']

class FinanceConnectorProviderPage(TypedDict):
    count: int
    results: List["FinanceConnectorProvider"]

FinanceConnectorStatus = Literal['connected', 'paused', 'error', 'reauth_required', 'awaiting_consent', 'disconnected']

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
    #: База: ledger_profit — прибыль по книге (general_ledger_profit ОПиУ); cashflow_total — весь ДДС, чистый поток без внутренних переводов; operating_cashflow — операционный раздел ДДС; pnl_layout_row — строка макета ОПиУ (нужны base_layout_id и base_layout_row); pnl — устаревшее имя ledger_profit
    base_kind: Literal['ledger_profit', 'cashflow_total', 'operating_cashflow', 'pnl_layout_row', 'pnl']
    #: Макет ОПиУ для base_kind=pnl_layout_row
    base_layout_id: "UUID"
    #: Идентификатор строки макета ОПиУ для base_kind=pnl_layout_row
    base_layout_row: str
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

class _FinanceExpenseReportCreateRequired(TypedDict):
    #: business или company обязателен; item — статья вида «подотчёт»; for_contact — сотрудник (контрагент из папки «Сотрудники»)
    refs: Dict[str, str]

class FinanceExpenseReportCreate(_FinanceExpenseReportCreateRequired, total=False):
    date: str
    comment: str
    payload: "FinanceExpenseReportCreatePayload"
    #: Провести сразу
    post: bool

class FinanceExpenseReportCreatePayload(TypedDict, total=False):
    #: Валюта учёта; другая отклоняется
    currency: str
    rows: List["FinanceExpenseReportRow"]

class _FinanceExpenseReportRowRequired(TypedDict):
    #: Статья траты — любая
    item: "UUID"
    #: Сумма в валюте учёта, больше нуля
    amount: str

class FinanceExpenseReportRow(_FinanceExpenseReportRowRequired, total=False):
    #: Продавец, кому заплатил сотрудник
    contact: "UUID"
    #: «За кого» у статей, которым нужен человек
    for_contact: "UUID"
    receipt_date: str
    receipt_number: str
    project: "UUID"
    deal: "UUID"
    comment: str
    #: «Закрывает» — долг поставщику (закупка, счёт), который гасит строка по статье расчётов с поставщиками (ERP-1249); пусто — долг подберёт правило
    closes: "UUID"

class FinanceItemMergeRequest(TypedDict):
    target_id: "UUID"

class FinanceItemMergeResult(TypedDict, total=False):
    preview: bool
    source_id: "UUID"
    source_name: str
    target_id: "UUID"
    target_name: str
    documents: List[Dict[str, Any]]
    months: List[Dict[str, Any]]
    settings: List[Dict[str, Any]]
    references: List[Dict[str, Any]]
    totals: List[Dict[str, Any]]
    deleted: bool

class _FinanceOpeningDebtRequestRequired(TypedDict):
    #: Дата остатков — дата старта учёта
    date: str
    business_id: "UUID"
    contact_id: "UUID"
    #: Счёт долга: 60.01 — наш долг поставщику, 62.01 — долг покупателя
    account_code: Literal['60.01', '62.01']
    #: Сторона ноги книги. Кредит на 62.01 — отрицательная дебиторка, не аванс
    direction: Literal['debit', 'credit']
    #: Сумма в валюте долга, больше нуля
    amount: str

class FinanceOpeningDebtRequest(_FinanceOpeningDebtRequestRequired, total=False):
    #: Юрлицо; пусто — долг без юрлица
    company_id: Optional["UUID"]
    #: Валюта долга (ISO 4217); пусто — валюта учёта кабинета
    currency: str
    #: Срок оплаты; пусто — «без срока»
    due_date: str
    #: Общий признак одного ввода остатков (entity_refs.opening_batch)
    batch: str
    #: Откуда строка: введена вручную или загружена из 1С
    source: Literal['manual', 'onec']

class _FinanceOperationRequired(TypedDict):
    recognition_mode: Literal['document', 'plan']
    #: Фактически оплачено по проведённым распределениям
    cash_paid: str
    #: Оплата сверх признанного начисления
    advance: str
    cash_payments: List["FinanceOperationFact"]
    #: Применения к долгу, не привязанные к строке графика (ERP-1417)
    unattributed_facts: List["FinanceOperationFact"]
    id: "UUID"
    kind: Literal['sale', 'purchase']
    company_id: "UUID"
    contact_id: "UUID"
    currency: str
    #: Decimal string
    amount: str
    source_system: str
    source_ref: str
    external_id: str
    schema_version: int
    status: "CoreDocumentStatus"
    current: "FinanceOperationVersion"
    versions: List["FinanceOperationVersion"]

class FinanceOperation(_FinanceOperationRequired, total=False):
    due_date: str
    purpose: str
    pnl_item_id: str
    project_id: str
    contract_id: str

class FinanceOperationAccrualAllocation(TypedDict):
    accrual_id: "UUID"
    #: Положительная decimal string
    amount: str

class _FinanceOperationAccrualCreateRequired(TypedDict):
    source: "FinanceOperationSource"
    expected_version: int
    date: str
    #: Сумма документа; должна совпасть с суммой allocations
    amount: str

class FinanceOperationAccrualCreate(_FinanceOperationAccrualCreateRequired, total=False):
    """Указывает ровно одну цель распределения: accrual_id для одной части плана либо allocations для нескольких частей. Совместимость этого ограничения проверяет сервер; плоская форма сохранена, чтобы сгенерированные TypeScript- и Swift-клиенты не теряли общие поля."""

    accrual_id: "UUID"
    allocations: List["FinanceOperationAccrualAllocation"]
    #: Обычно вычисляется из графика; переданное значение не может ему противоречить
    due_date: str
    reason: str
    #: Только закупка без «в т.ч. НДС» на плане (ERP-484, подшаг 5.3в): «в т.ч. НДС» акта поставщика. Обязательна, если на дату начисления бизнес очищает суммы и юрлицо принимает налог к вычету; 0 — налог не выделен. У плана с налогом начисление берёт долю нарастающим итогом, и непустое значение — 400
    vat_amount: str
    supplier_document: "SupplierDocument"

class _FinanceOperationAccrualResultRequired(TypedDict):
    operation_id: "UUID"
    version_id: "UUID"
    allocations: List["FinanceOperationAccrualAllocation"]
    document: "CoreDocument"
    operation: "FinanceOperation"

class FinanceOperationAccrualResult(_FinanceOperationAccrualResultRequired, total=False):
    accrual_id: str
    #: Акт по продаже или закупке: строки со ставкой человека, равной прежней общей ставке юрлица, а на дату акта общая ставка другая
    vat_warnings: List["CoreOrderVATWarning"]

class _FinanceOperationActionRequired(TypedDict):
    source: "FinanceOperationSource"
    expected_version: int

class FinanceOperationAction(_FinanceOperationActionRequired, total=False):
    reason: str

class _FinanceOperationCreateRequired(TypedDict):
    source: "FinanceOperationSource"
    kind: Literal['sale', 'purchase']
    company_id: "UUID"
    contact_id: "UUID"
    date: str
    currency: str
    #: Положительная decimal string
    amount: str
    pnl_item_id: "UUID"

class FinanceOperationCreate(_FinanceOperationCreateRequired, total=False):
    #: document — один документ начисления; plan — план, который сам не создаёт долг
    recognition_mode: Literal['document', 'plan']
    due_date: str
    purpose: str
    project_id: str
    contract_id: str
    accruals: List["FinanceOperationStageInput"]
    payments: List["FinanceOperationStageInput"]
    references: List["FinanceOperationReferenceInput"]
    #: Только закупка: «в т.ч. НДС» документа поставщика (ERP-484, подшаги 5.3 и 5.3в). У закупки по документу обязательна, если на дату бизнес очищает суммы и юрлицо принимает налог к вычету; 0 — налог не выделен. У плана по периодам необязательна: указана — начисления берут долю нарастающим итогом, нет — налог приносит каждое начисление. Вне периода непустое значение — 400
    vat_amount: str
    supplier_document: "SupplierDocument"

class FinanceOperationFact(TypedDict):
    document_id: "UUID"
    type_key: str
    type_name: str
    number: str
    date: str
    status: "CoreDocumentStatus"
    #: Decimal string из движений проведённого регистратора
    amount: str
    currency: str

class FinanceOperationReferenceInput(TypedDict):
    relation: str
    target_module: str
    target_type: str
    target_id: str

class FinanceOperationSource(TypedDict):
    schema_version: int
    source_system: str
    source_ref: str
    external_id: str
    idempotency_key: str

class _FinanceOperationStageRequired(TypedDict):
    id: "UUID"
    sequence: int
    date: str
    #: Плановая decimal string
    amount: str
    currency: str
    #: Decimal string из проведённых документов
    actual_amount: str
    facts: List["FinanceOperationFact"]

class FinanceOperationStage(_FinanceOperationStageRequired, total=False):
    label: str
    due_trigger: Literal['after_accrual']
    after_accrual_id: str
    delay_days: int
    payment_attribution_pending: bool

class _FinanceOperationStageInputRequired(TypedDict):
    sequence: int
    #: Положительная decimal string
    amount: str

class FinanceOperationStageInput(_FinanceOperationStageInputRequired, total=False):
    label: str
    #: Необязательная календарная дата; пусто означает без срока
    date: str
    #: По умолчанию валюта операции; другая валюта не принимается
    currency: str
    #: Только для графика оплаты: считать срок от проведённого начисления
    due_trigger: Literal['after_accrual']
    #: Номер части начисления; отсутствие означает от любого начисления
    after_accrual_sequence: int
    delay_days: int

class _FinanceOperationVersionRequired(TypedDict):
    id: "UUID"
    version: int
    change_kind: Literal['initial', 'correction', 'reversal']
    document_id: "UUID"
    document_status: "CoreDocumentStatus"
    is_marked_deleted: bool
    company_id: "UUID"
    contact_id: "UUID"
    currency: str
    effective_date: str
    accruals: List["FinanceOperationStage"]
    payments: List["FinanceOperationStage"]

class FinanceOperationVersion(_FinanceOperationVersionRequired, total=False):
    previous_version_id: str
    reason: str

class _FinanceOrderActInputRequired(TypedDict):
    source: "FinanceOperationSource"
    date: str
    #: Сумма акта с НДС в валюте продажи или закупки, decimal string
    amount: str

class FinanceOrderActInput(_FinanceOrderActInputRequired, total=False):
    #: Срок оплаты; пусто — по строке графика продажи или закупки или условиям контрагента
    due_date: str
    reason: str
    #: Статья выручки (расхода); пусто — статья продажи или закупки, политика бизнеса или системная
    pnl_item_id: Dict[str, Any]
    #: Этап работ продажи или закупки, который закрывает акт
    stage_id: Dict[str, Any]
    vat_amount: str
    prices_include_vat: bool

FinancePaymentCalendar = TypedDict("FinancePaymentCalendar", {"rnp_metrics": "FinancePaymentCalendarRnpMetrics", "valuation_date": str, "project": str, "balance_available": bool, "from": str, "to": str, "currency": str, "derived_available": bool, "derived_note": str, "opening": str, "inflow": str, "outflow": str, "closing": str, "overdue_in": str, "overdue_out": str, "done_in": str, "done_out": str, "committed_in": str, "expected_in": str, "undated": "FinancePaymentCalendarUndated", "companies": List["FinancePaymentCalendarCompany"], "step": Literal['day', 'month', 'quarter'], "periods": List["FinancePaymentCalendarPeriod"], "totals": List["FinancePaymentCalendarCell"], "days": List["FinancePaymentCalendarDay"], "rows": List["FinancePaymentCalendarRow"], "overdue": List["FinancePaymentCalendarRow"]}, total=False)

class FinancePaymentCalendarRnpMetrics(TypedDict, total=False):
    minimum_balance: str
    minimum_on: str
    first_gap_on: str

class FinancePaymentCalendarUndated(TypedDict):
    count_in: int
    count_out: int
    amount_in: str
    amount_out: str
    rows: List["FinancePaymentCalendarRow"]

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
    origin: Literal['manual', 'receivable', 'payable', 'payment_request', 'contract_stage', 'invoice', 'contract_rule']
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
    operation_id: "UUID"
    operation_kind: Literal['sale', 'purchase']
    operation_version: int
    contract_id: "UUID"
    #: Карточка выставленного счёта у происхождения invoice; учётным документом счёт не является
    invoice_id: "UUID"
    #: Строка ожидания, а не долга: счёт и этап договора обещают деньги, но требовать по ним нельзя
    expectation: bool
    #: Обязательство без срока оплаты: рядом со шкалой, а не на ней
    undated: bool
    #: Сумма удерживается контрагентом из будущей выплаты нам, а не уходит переводом: строка стоит во входящих с отрицательной суммой (неделя маркетплейса с перевесом возвратов)
    withheld_from_payout: bool
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
    #: Разнесена ли операция: есть ли у неё статья ДДС. Тот же признак отдаёт журнал кассы, и ответ на этот вопрос у обоих один.
    allocated: bool

class FinancePaymentFact(_FinancePaymentFactRequired, total=False):
    used_by_plan_id: "UUID"
    item: "UUID"
    #: Название статьи ДДС; пусто у неразнесённой операции
    item_name: str

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

class FinancePayrollAutomationSettings(TypedDict):
    #: Ежемесячно заводить черновики начисления по штату
    auto_accrual: bool

class _FinancePayrollRunRequired(TypedDict):
    id: "UUID"
    scope_key: str
    scope_name: str
    #: Месяц в формате YYYY-MM
    month: str
    status: Literal['running', 'draft', 'empty', 'blocked', 'failed']
    created_at: str
    updated_at: str

class FinancePayrollRun(_FinancePayrollRunRequired, total=False):
    company_id: "UUID"
    business_id: "UUID"
    document_id: "UUID"
    number: str
    #: Причина блокировки или ошибки
    error: str

class FinancePayrollRunList(TypedDict):
    results: List["FinancePayrollRun"]

class _FinancePnlCoverageRequired(TypedDict):
    missing: List["FinancePnlCoverageItem"]
    duplicated: List["FinancePnlCoverageItem"]

class FinancePnlCoverage(_FinancePnlCoverageRequired, total=False):
    #: Налоги раздела «Налоги» за период без строки-источника «Налоги» в макете; итог и прибыль их включают
    taxes: str

class _FinancePnlCoverageItemRequired(TypedDict):
    id: "UUID"
    name: str
    path: str

class FinancePnlCoverageItem(_FinancePnlCoverageItemRequired, total=False):
    times: int

class FinancePnlLine(TypedDict):
    id: str
    name: str
    sign: int
    amount: str

FinancePnlReport = TypedDict("FinancePnlReport", {"unassigned_company": "FinancePnlReportUnassignedCompany", "rnp_metrics": Dict[str, str], "currency": str, "from": str, "to": str, "revenue": str, "expense": str, "profit": str, "unclassified_in": str, "unclassified_out": str, "lines": List["FinancePnlLine"], "taxes": List["FinanceTaxKindAmount"], "taxes_total": str, "taxes_not_allocated": bool, "layout_rows": List["FinancePnlReportRow"], "layout": "FinancePnlReportLayout", "columns": List["FinanceReportColumn"], "companies": List["FinanceReportCompany"], "accounting_basis": "AccountingBasis"}, total=False)

class FinancePnlReportUnassignedCompany(TypedDict, total=False):
    """При отборе по юрлицу — результат движений без юрлица и всего бизнеса"""

    profit: str
    business_profit: str

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

class FinanceReconciliationSummary(TypedDict):
    total_count: int
    needs_attention_count: int
    unmatched_count: int
    #: Входящие платежи без продажи или закупки и без проекта; имя поля сохранено для совместимости
    missing_order_count: int
    missing_cashflow_count: int
    #: Сумма входящих платежей без продажи или закупки и без проекта; decimal string
    incoming_unlinked_amount: str

class FinanceRegisterAccountCheck(TypedDict):
    account: str
    name: str
    register: str
    transactions: str
    adjustments: str
    match: bool

class _FinanceRegisterReconciliationRequired(TypedDict):
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

class FinanceRegisterReconciliation(_FinanceRegisterReconciliationRequired, total=False):
    #: Нет минуса входного НДС по источнику без возврата поставщику после вычета.
    input_vat_match: bool
    #: Источники с отрицательным остатком входного НДС, который не объяснён возвратом поставщику после вычета.
    input_vat_unexplained: List["FinanceRegisterReconciliationInputVatUnexplainedItem"]
    #: Сверка стоимости склада с книгой по счетам запасов.
    stock: Optional[List["FinanceRegisterReconciliationStockItem"]]
    #: Остаток запасов, который после смены правила счёта лежит в книге на старом счёте и ещё не перенесён документом «Перенос остатка» (ERP-1146). Разрез — пара счетов.
    stock_transfer_pending: List["FinanceRegisterReconciliationStockTransferPendingItem"]
    #: Пояснение к неперенесённому остатку для человека; пусто, если переносить нечего.
    stock_transfer_hint: str

class FinanceRegisterReconciliationInputVatUnexplainedItem(TypedDict):
    source: str
    source_number: str
    source_date: str
    company: str
    amount: str

class FinanceRegisterReconciliationStockItem(TypedDict, total=False):
    #: Неперенесённый остаток, который уйдёт с этого счёта документом «Перенос остатка» (ERP-1146); нет поля — переносить нечего.
    transfer_pending_out: str
    #: Неперенесённый остаток, который придёт на этот счёт документом «Перенос остатка» (ERP-1146); нет поля — переносить нечего.
    transfer_pending_in: str

class FinanceRegisterReconciliationStockTransferPendingItem(TypedDict):
    from_code: str
    to_code: str
    amount: str
    warehouses: int

class FinanceRegisterRepairFailure(TypedDict):
    id: "UUID"
    #: Machine-readable reason (not_found, nothing_to_restore, wrong_document_type, period_closed, document_changed, payload_invalid, ledger_setup_missing, balance_shortage, ledger_imbalance, unexpected).
    code: str
    #: Human-readable reason in the request language; an internal failure carries the case code instead of the raw error.
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
    #: ИНН банка; пусто — справочник не назвал
    inn: str
    #: КПП банка; пусто — справочник не назвал
    kpp: str

class FinanceResponsiblePatch(TypedDict):
    responsible: Optional[str]

class _FinanceSaleLineInputRequired(TypedDict):
    #: Положительная decimal string
    quantity: str
    #: Цена единицы в режиме prices_include_vat документа
    price: str

class FinanceSaleLineInput(_FinanceSaleLineInputRequired, total=False):
    #: Товар строки; без него строка обязана назвать name
    product_id: str
    #: Единица измерения строки
    unit_id: str
    #: Единица словами, когда справочной нет
    unit: str
    #: Наименование строки; у строки с товаром необязательно — его даёт карточка товара
    name: str
    #: Скидка строки суммой, в том же режиме цены
    discount: str
    #: ПрТовРаб формата ФНС: 1 товар, 3 услуга; пусто — товар, если назван товар, иначе услуга
    kind: Literal['1', '3']

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
    #: Обязательно для зачёта аванса, распределения оплаты и возврата по продаже (продажа-основание)
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
    #: Только возврат по продаже: складской возврат от покупателя по этой продаже; без amount сумма — доля продажи по количеству
    stock_return_id: str
    comment: str
    #: Ключ идемпотентности сделки (только продажа и закупка): система-источник — учётная система клиента или ключ стороннего приложения
    source_system: str
    #: Какая именно база/кабинет клиента внутри source_system; пусто — единственный источник
    source_ref: str
    #: Идентификатор сделки в source_system; повтор того же (source_system, source_ref, external_id) возвращает уже созданный документ вместо второго
    external_id: str
    #: Только закупка: «в т.ч. НДС» документа поставщика (ERP-484, подшаг 5.3). Обязательна, если на дату бизнес очищает суммы и юрлицо принимает налог к вычету; 0 — налог не выделен. Вне периода непустое значение — 400
    vat_amount: str
    supplier_document: "SupplierDocument"
    #: Только продажа (ERP-1265): строки товаров и услуг. Сумма продажи — сумма строк; переданная рядом amount обязана с ней совпасть. Налог считается по строке — по виду товара строки и режиму юрлица на дату
    lines: List["FinanceSaleLineInput"]
    #: Только вместе со строками: цены строк включают налог (умолчание) либо налог начисляется сверху
    prices_include_vat: bool

FinanceSettlementDocumentType = Literal['finance_settlement_baseline', 'finance_receivable_opening', 'finance_receivable', 'finance_payable_opening', 'finance_payable', 'finance_advance', 'finance_advance_offset', 'finance_sale', 'finance_purchase', 'finance_payment_allocation', 'finance_sale_return']

class FinanceSettlementExposure(TypedDict):
    available: bool
    as_of: str
    contact_id: "UUID"
    company_id: "UUID"
    currency: str
    #: Decimal string. What the counterparty owes us (side receivable); equals the receivable column of settlement positions for the same scope.
    receivable: str
    #: Decimal string. Part of receivable whose due date has passed.
    overdue: str
    #: Decimal string. Part of receivable without a due date; it is never overdue, so zero overdue does not mean everything is on time.
    undated: str
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

class FinanceTaxKind(TypedDict):
    """Вид налога кабинета."""

    #: Код вида из перечня закона
    code: Literal['usn', 'ausn', 'profit', 'eshn', 'patent', 'ip_insurance', 'property', 'transport', 'land', 'trade_fee', 'penalties', 'ndfl', 'insurance', 'vat']
    #: Название вида в кабинете
    name: str
    #: Налог-расход — начисление идёт в строку ОПиУ «Налоги»
    pnl_expense: bool
    #: Порядок показа
    sort: int

class FinanceTaxKindAmount(TypedDict):
    #: Код вида налога
    kind: str
    #: Сумма
    amount: str

class FinanceTaxKindPage(TypedDict):
    items: List["FinanceTaxKind"]

class FinanceTaxMonth(TypedDict):
    """Документ «Налоги за месяц»."""

    id: "UUID"
    number: str
    #: Последний день месяца
    date: str
    #: Статус документа
    status: str
    #: Юрлицо
    company_id: str
    comment: str
    updated_at: str
    payload: "FinanceTaxMonthPayload"

class FinanceTaxMonthInput(TypedDict, total=False):
    """Новый черновик «Налоги за месяц»."""

    company_id: "UUID"
    year: int
    month: int
    lines: List["FinanceTaxMonthLine"]
    #: Сальдо ЕНС на начало учёта — только в первом документе юрлица; плюс — долг, минус — переплата
    opening: Optional[str]
    comment: Optional[str]

class _FinanceTaxMonthLineRequired(TypedDict):
    #: Код вида налога
    kind: str
    #: Сумма со знаком; минус — уменьшение по декларации
    amount: str

class FinanceTaxMonthLine(_FinanceTaxMonthLineRequired, total=False):
    """Строка начисления."""

    #: Комментарий строки
    comment: str
    #: Строку заполнил сервер — из начислений зарплаты или «НДС за квартал»; во входе такие строки игнорируются
    source: Literal['payroll', 'vat_quarter']

class FinanceTaxMonthPage(TypedDict):
    items: List["FinanceTaxMonth"]

class _FinanceTaxMonthPayloadRequired(TypedDict):
    version: int
    year: int
    month: int
    lines: List["FinanceTaxMonthLine"]

class FinanceTaxMonthPayload(_FinanceTaxMonthPayloadRequired, total=False):
    payments: List["FinanceTaxMonthPayment"]
    #: Сальдо ЕНС на начало учёта; плюс — долг перед бюджетом, минус — переплата
    opening: str

class FinanceTaxMonthPayment(TypedDict):
    """Пополнение ЕНС за месяц, собранное сервером."""

    #: Документ банковской операции
    document: str
    date: str
    #: Сумма платежа
    amount: str

class FinanceTaxMonthUpdateInput(TypedDict, total=False):
    """Пересохранение черновика «Налоги за месяц» — строки и комментарий."""

    lines: List["FinanceTaxMonthLine"]
    #: Сальдо ЕНС на начало учёта — только в первом документе юрлица; плюс — долг, минус — переплата
    opening: Optional[str]
    comment: Optional[str]

class FinanceTaxPayment(TypedDict):
    """Платёж по статье налогов."""

    company: "UUID"
    transaction: "UUID"
    document: "UUID"
    date: str
    #: Сумма платежа
    amount: str
    #: Получатель
    counterparty_name: str
    #: ИНН получателя
    counterparty_inn: str
    #: Счёт получателя
    counterparty_account: str
    #: Пополнение единого налогового счёта по правилу раздела
    ens: bool

class FinanceTaxPaymentPage(TypedDict):
    items: List["FinanceTaxPayment"]

class _FinanceTaxRecipientRequired(TypedDict):
    #: ИНН получателя — 10 или 12 цифр
    inn: str

class FinanceTaxRecipient(_FinanceTaxRecipientRequired, total=False):
    """Получатель единого налогового счёта."""

    #: Счёт получателя; пусто — любой счёт этого ИНН
    account: str
    #: Название получателя для экрана
    name: str

class FinanceTaxRecipientFromPaymentInput(TypedDict):
    transaction_id: "UUID"

class FinanceTaxSettings(TypedDict):
    """Настройка раздела «Налоги»."""

    #: Статьи ДДС платежей налогов в порядке выбора; пусто — не настроены
    payment_item_ids: List[str]
    #: Получатели единого налогового счёта
    ens_recipients: List["FinanceTaxRecipient"]

class FinanceTaxSettingsInput(TypedDict, total=False):
    """Настройка раздела «Налоги» целиком."""

    #: Статьи ДДС вида «Налоги»; пустой список — снять все
    payment_item_ids: List[str]
    #: Получатели единого налогового счёта
    ens_recipients: List["FinanceTaxRecipient"]

class FinanceTaxSummary(TypedDict):
    """Сальдо ЕНС юрлица и обороты отрезка из регистра раздела. Плюс — долг перед бюджетом, минус — переплата."""

    company: "UUID"
    date_from: str
    date_to: str
    #: Сальдо ЕНС на начало отрезка
    opening: str
    #: Начислено по видам налогов
    accrued: List["FinanceTaxKindAmount"]
    #: Начислено всего
    accrued_total: str
    #: Пополнено ЕНС
    paid: str
    #: Сальдо ЕНС на конец отрезка
    closing: str

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
    #: «За кого»: контрагент из папки «Сотрудники» или «Собственники», чей расчёт гасит платёж. Пусто — как контрагент: платили самому человеку
    for_contact: Optional[str]
    for_contact_name: Optional[str]
    #: Сотрудник, связанный с контрагентом. У зарплаты пустое «За кого» при нём означает самого получателя
    contact_employee: Optional[str]
    #: Инициатор: кто завёл или согласовал платёж. В проводки не идёт; чей расчёт гасится, задаёт for_contact
    responsible: Optional[str]
    responsible_name: Optional[str]

class FinanceTransactionCategorize(TypedDict, total=False):
    cashflow_item: Optional[str]
    contact: Optional[str]
    #: «За кого»: чей расчёт гасит платёж. У зарплаты — контрагент из папки «Сотрудники», у расчётов с собственником — контрагент из состава владельцев на дату платежа. Пусто — как контрагент. Не присланное поле остаётся как было.
    for_contact: Optional[str]
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

class FinanceTransactionRestoreResult(TypedDict):
    """Какие операции вернулись в учёт и какие нет."""

    #: Возвращённые операции.
    restored: List["UUID"]
    #: Операции, которые вернуть не удалось, с причиной.
    failed: List["FinanceTransactionRestoreResultFailedItem"]

class FinanceTransactionRestoreResultFailedItem(TypedDict):
    id: "UUID"
    #: Причина отказа для человека.
    reason: str

class FinanceTransactionTotals(TypedDict):
    """Итоги по всему отбору, а не по странице. Суммы в валюте учёта по историческому курсу"""

    #: Приход; null, когда итог не посчитан
    inflow: Optional[str]
    #: Расход; null, когда итог не посчитан
    outflow: Optional[str]
    currency: str
    #: Сколько операций осталось без пересчёта в валюту учёта: неполный пересчёт не должен выглядеть верным итогом
    unconverted_count: int

class _FinanceZReportInputRequired(TypedDict):
    company_id: "UUID"
    date: str
    lines: List["FinanceZReportLine"]

class FinanceZReportInput(_FinanceZReportInputRequired, total=False):
    #: Номер смены ККТ; пусто — один отчёт на юрлицо и день
    shift_number: str
    #: Статья выручки; пусто — статья продажи дня или умолчание
    pnl_item_id: Dict[str, Any]
    #: Наличные смены, decimal string
    cash: str
    #: Касса для наличных; обязательна, если наличные больше нуля
    cash_wallet_id: Dict[str, Any]
    #: Статья движения денег для прихода наличных
    cash_item_id: Dict[str, Any]
    #: Оплаты картой и СБП для сверки, decimal string
    card: str

class _FinanceZReportLineRequired(TypedDict):
    #: Количество больше нуля, decimal string
    quantity: str
    #: Сумма строки с НДС больше нуля, decimal string
    amount: str

class FinanceZReportLine(_FinanceZReportLineRequired, total=False):
    #: Услуга из каталога; без неё нужно название
    product_id: Dict[str, Any]
    #: Название услуги, если каталога нет
    title: str

class _FinanceZReportResultRequired(TypedDict):
    #: Ключ отчёта: юрлицо, день и смена
    key: str
    replayed: bool
    order_id: str
    order_number: str
    act_document_id: str
    #: Сумма услуг
    revenue: str
    #: Наличные и карта
    paid: str
    #: Услуги минус оплаты: долг или аванс дня
    difference: str
    card: str

class FinanceZReportResult(_FinanceZReportResultRequired, total=False):
    cash_document_id: str

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
    #: Бизнес проекта (заменил информационное юрлицо); null — проект всего кабинета
    business_id: Optional["UUID"]
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
    #: Ключ принципала: id пользователя, UUID роли, UUID подразделения из справочника departments или * для всех
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

class _KnowledgeAnswerInputRequired(TypedDict):
    question: str

class KnowledgeAnswerInput(_KnowledgeAnswerInputRequired, total=False):
    #: Сколько фрагментов-опор искать; по умолчанию 6
    limit: int
    #: Предыдущие ходы диалога; доступ они не расширяют
    history: List["KnowledgeAnswerTurn"]
    #: Где искать: company — материалы компании, guides — встроенные руководства продукта, all — оба корпуса
    scope: Literal['all', 'company', 'guides']
    #: Не сочинять ответ моделью, вернуть только найденные фрагменты и извлечённую сводку. Для того, кто говорит своим голосом и сам собирает ответ из цитат: без генерации ответ приходит за время поиска
    citations_only: bool

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
    #: Вердикт антивируса. В поисковый разбор идёт только clean; skipped — файл антивирус не проверял
    scan_status: Literal['pending', 'clean', 'infected', 'skipped']
    uploaded_by: int
    created_at: str
    updated_at: str

class KnowledgeAsset(_KnowledgeAssetRequired, total=False):
    parser_name: str
    parser_version: str
    processing_error: str
    processed_at: str

class _KnowledgeAssetLinkRequired(TypedDict):
    #: Подписанный адрес хранилища при direct=true; иначе относительный адрес этого API с авторизацией
    url: str
    #: true — подписанный адрес хранилища, без заголовка авторизации; false — адрес этого API, с авторизацией
    direct: bool
    method: Literal['GET']
    name: str
    mime_type: str
    size_bytes: int
    sha256: str
    #: skipped — файл антивирус не проверял
    scan_status: Literal['clean', 'skipped']

class KnowledgeAssetLink(_KnowledgeAssetLinkRequired, total=False):
    """Временный адрес файла страницы базы знаний."""

    #: Срок подписанного адреса; у адреса API его нет
    expires_at: str

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

class KnowledgeDocument(TypedDict):
    """Канонический блочный документ страницы; редактор читает только эту схему."""

    schema: Literal['akeda.knowledge.document']
    #: Актуальная версия схемы — 2
    schema_version: int
    type: Literal['doc']
    #: Блоки страницы
    content: List[Dict[str, Any]]

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
    #: Бизнес пространства: его видят, ищут и цитируют в ответах помощника участники, чья область доступа касается бизнеса, и поимённо выданные. null — пространство всего кабинета
    business_id: Optional["UUID"]
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
    #: Бизнес пространства. Поле не передано — не менять (у нового — единственный бизнес области доступа или весь кабинет); null — пространство всего кабинета. Бизнес вне области доступа — 403 knowledge.business_forbidden
    business_id: Optional["UUID"]

class KnowledgeTag(TypedDict):
    id: "UUID"
    name: str
    color: str
    created_by: int
    created_at: str

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

class MailAccount(TypedDict):
    """Почтовый ящик кабинета. Пароль подключения не сериализуется никогда: наружу уходит только признак has_credentials."""

    id: "UUID"
    #: Сотрудник, которому принадлежит ящик
    owner_user_id: int
    #: Общий ящик отдела виден всем, у кого есть право на модуль; личный — владельцу и тому, кто видит все записи
    shared: bool
    #: Бизнес общего ящика: ящик видят участники, чья область доступа касается этого бизнеса, а также владелец и поимённо названные сотрудники. null — ящик всего кабинета или личный
    business_id: Optional["UUID"]
    email: str
    display_name: str
    #: Уведомления владельца ящика о новой почте: все письма, только важные отправители или выключено
    notification_mode: Literal['all', 'important', 'off']
    imap_host: str
    imap_port: int
    imap_encryption: "MailEncryption"
    smtp_host: str
    smtp_port: int
    smtp_encryption: "MailEncryption"
    #: Логин подключения; по умолчанию равен адресу
    username: str
    #: Пароль приложения сохранён. Самого пароля не отдаёт ни одна операция
    has_credentials: bool
    status: "MailAccountStatus"
    sync_status: "MailSyncStatus"
    #: Глубина первичного импорта в днях; ноль означает весь ящик
    sync_since_days: int
    #: Подпись, подставляемая в исходящие письма
    signature: str
    last_sync_at: Optional[str]
    #: Последняя ошибка подключения для человека
    last_error: str
    #: Машинный код последней ошибки подключения, например mail.account.credentials_rejected; пусто, когда ошибки нет
    last_error_code: str
    unread_count: int
    created_at: str
    updated_at: str

MailAccountStatus = Literal['active', 'disabled', 'error']

class _MailAttachmentRequired(TypedDict):
    id: "UUID"
    message_id: "UUID"
    filename: str
    content_type: str
    size_bytes: int
    #: Встроенная в тело картинка, а не документ
    is_inline: bool
    scan_status: "MailScanStatus"
    created_at: str

class MailAttachment(_MailAttachmentRequired, total=False):
    """Вложение письма. Ключ объектного хранилища наружу не отдаётся: знание ключа — половина пути к чужому файлу."""

    #: Заполняется у картинок, вставленных в тело письма через cid:
    content_id: str

class _MailAttachmentLinkRequired(TypedDict):
    url: str
    #: true — подписанный адрес хранилища, без заголовка авторизации; false — адрес этого API, с авторизацией
    direct: bool
    name: str
    mime_type: str
    size_bytes: int
    scan_status: "MailScanStatus"

class MailAttachmentLink(_MailAttachmentLinkRequired, total=False):
    """Временный адрес вложения письма."""

    #: Срок подписанного адреса; у адреса API его нет
    expires_at: str

class MailComposeInput(TypedDict, total=False):
    """Отправка письма или сохранение черновика. Поле in_reply_to_id указывает на письмо в нашей базе, а не на Message-ID: заголовки ответа собираем мы."""

    subject: str
    #: Одна строка может содержать несколько адресов через запятую
    to: List[str]
    cc: List[str]
    bcc: List[str]
    body_text: str
    body_html: str
    #: Письмо, на которое отвечаем
    in_reply_to_id: Optional["UUID"]
    #: Письмо, которое пересылаем
    forward_of_id: Optional["UUID"]
    #: Идентификаторы заранее загруженных файлов
    upload_ids: List["UUID"]
    #: Значение true СОХРАНЯЕТ письмо в «Черновиках» и не отправляет его; без признака письмо уходит получателю и отозвать его нельзя
    save_as_draft: bool

MailEncryption = Literal['tls', 'starttls']

class MailFolder(TypedDict):
    """Папка ящика. Координаты синхронизации IMAP (UIDVALIDITY, UIDNEXT, последний прочитанный UID) наружу не отдаются."""

    id: "UUID"
    account_id: "UUID"
    #: Имя папки на почтовом сервере
    external_id: str
    name: str
    role: "MailFolderRole"
    parent_id: Optional["UUID"]
    #: Разделитель иерархии, который назвал сервер
    delimiter: str
    total_count: int
    unread_count: int
    #: Вес папки в привычном порядке системных папок
    sort_order: int
    subscribed: bool
    #: Вид на ту же почту (Gmail «Вся почта», «Важное», «Помеченные»): письма в нём — копии писем из настоящих папок, в сводные выборки они не попадают
    mirror: bool
    created_at: str
    updated_at: str

class _MailFolderInputRequired(TypedDict):
    #: Косые черты запрещены: разделитель иерархии задаёт сервер
    name: str

class MailFolderInput(_MailFolderInputRequired, total=False):
    """Создание и переименование пользовательской папки"""

    #: Родительская папка
    parent_id: Optional["UUID"]

MailFolderRole = Literal['inbox', 'sent', 'drafts', 'trash', 'spam', 'archive', 'custom']

class _MailMessageRequired(TypedDict):
    id: "UUID"
    account_id: "UUID"
    folder_id: "UUID"
    thread_id: "UUID"
    #: Message-ID без угловых скобок; письму без него присваивается наш
    message_ref: str
    subject: str
    from_address: str
    from_name: str
    #: Короткий пересказ письма для списка
    snippet: str
    size_bytes: int
    direction: Literal['inbound', 'outbound']
    is_read: bool
    is_flagged: bool
    is_answered: bool
    is_draft: bool
    has_attachments: bool
    spam_verdict: "MailSpamVerdict"
    sent_at: Optional[str]
    received_at: str
    created_at: str
    updated_at: str

class MailMessage(_MailMessageRequired, total=False):
    """Письмо в копии кабинета. Внутренние координаты IMAP (UID и UIDVALIDITY) наружу не отдаются. Тело в HTML хранится таким, каким его прислал отправитель: обезвреживание живёт на отдаче, а не в хранимой копии."""

    #: Заголовок In-Reply-To
    in_reply_to: str
    #: Заголовок References целиком
    references: str
    #: Конверт письма целиком
    addresses: List["MailMessageAddress"]
    body_text: str
    body_html: str
    #: Кто вынес вердикт. Решение человека сильнее флага сервера и правил
    spam_source: Literal['provider', 'rule', 'user', 'agent']
    spam_reason: str
    attachments: List["MailAttachment"]

class MailMessageAddress(TypedDict):
    """Один адрес в конверте письма"""

    #: Вид адреса: from, to, cc, bcc, reply_to. Значение list_id несёт идентификатор рассылки, а не адрес человека
    kind: str
    address: str
    #: Имя отправителя или получателя, если оно было в конверте
    name: str
    #: Порядок адреса в своей группе
    position: int

class MailMessagePage(TypedDict):
    """Страница писем. Общее число нужно, чтобы решить, стоит ли листать дальше."""

    items: List["MailMessage"]
    total: int
    limit: int
    offset: int
    has_more: bool

class MailOutbound(TypedDict):
    """Исходящее письмо в очереди отправки. Постоянный отказ SMTP (код 5xx) не повторяется: повторять отклонённое навсегда письмо вредно для репутации отправителя."""

    id: "UUID"
    account_id: "UUID"
    message_id: "UUID"
    status: Literal['queued', 'sending', 'sent', 'failed', 'cancelled']
    attempts: int
    max_attempts: int
    next_attempt_at: Optional[str]
    last_error: str
    last_error_code: str
    sent_at: Optional[str]
    #: Сотрудник, отправивший письмо
    created_by: int
    created_at: str

class MailOutboundPage(TypedDict):
    """Страница очереди отправки"""

    items: List["MailOutbound"]
    total: int
    limit: int
    offset: int
    has_more: bool

class MailOutboundUpload(TypedDict):
    """Файл, загруженный до отправки письма. Ключ объектного хранилища наружу не отдаётся."""

    id: "UUID"
    account_id: "UUID"
    filename: str
    content_type: str
    size_bytes: int
    scan_status: "MailScanStatus"
    status: Literal['ready', 'consumed', 'expired']
    expires_at: str
    created_at: str

class MailPerson(TypedDict):
    user_id: int
    name: str

class MailProvider(TypedDict):
    """Подсказка настроек для формы подключения ящика"""

    #: Машинный ключ провайдера
    key: str
    #: Название провайдера для человека
    label: str
    #: Домены адресов, по которым подсказка подбирается
    domains: List[str]
    imap_host: str
    imap_port: int
    imap_encryption: "MailEncryption"
    smtp_host: str
    smtp_port: int
    smtp_encryption: "MailEncryption"
    #: Какой именно пароль нужен: у перечисленных провайдеров обычный пароль от аккаунта не подходит
    password_hint: str
    #: Ссылка на справку провайдера; у части провайдеров пуста
    help_url: str

class MailRule(TypedDict):
    """Правило разбора входящей почты"""

    id: "UUID"
    account_id: "UUID"
    name: str
    enabled: bool
    #: Порядок применения правил ящика
    sort_order: int
    #: Правило применяется при всех условиях или при любом из них
    match: Literal['all', 'any']
    conditions: List["MailRuleCondition"]
    actions: List["MailRuleAction"]
    #: Прекратить разбор письма после этого правила
    stop_processing: bool
    #: Сколько писем правило разобрало: единственный способ увидеть, что правило молчит из-за опечатки
    applied_count: int
    last_applied_at: Optional[str]
    created_at: str
    updated_at: str

class _MailRuleActionRequired(TypedDict):
    type: Literal['move_to_folder', 'mark_read', 'mark_unread', 'flag', 'mark_spam', 'mark_not_spam']

class MailRuleAction(_MailRuleActionRequired, total=False):
    """Одно действие правила"""

    #: Заполняется только для переноса в папку; остальные действия папку не принимают
    folder_id: Optional["UUID"]

class _MailRuleConditionRequired(TypedDict):
    field: Literal['from', 'to', 'cc', 'subject', 'body', 'list_id', 'has_attachment', 'spam_verdict']
    #: Сравнение по домену доступно только адресным полям; поле has_attachment проверяется как is_true или is_false.
    op: Literal['contains', 'equals', 'starts_with', 'ends_with', 'domain_is', 'is_true', 'is_false']

class MailRuleCondition(_MailRuleConditionRequired, total=False):
    """Одно условие правила. Набор полей и операторов закрытый: правило исполняется на сервере над чужой почтой."""

    #: Обязательно для всех полей, кроме has_attachment
    value: str

class _MailRuleInputRequired(TypedDict):
    name: str
    conditions: List["MailRuleCondition"]
    actions: List["MailRuleAction"]

class MailRuleInput(_MailRuleInputRequired, total=False):
    """Создание и изменение правила; условия и действия передаются целиком"""

    enabled: Optional[bool]
    sort_order: Optional[int]
    #: Без значения — all
    match: Literal['all', 'any']
    stop_processing: Optional[bool]

class _MailRuleOutcomeRequired(TypedDict):
    rule_id: "UUID"
    rule_name: str
    message_id: "UUID"
    subject: str

class MailRuleOutcome(_MailRuleOutcomeRequired, total=False):
    """Что правило сделало с письмом"""

    moved_to_folder: Optional["UUID"]
    marked_read: Optional[bool]
    flagged: bool
    spam_verdict: str

MailScanStatus = Literal['pending', 'clean', 'infected', 'skipped']

MailSpamVerdict = Literal['unknown', 'spam', 'ham']

class _MailSyncReportRequired(TypedDict):
    account_id: "UUID"
    #: Сколько папок прочитано
    folders: int
    new_messages: int
    #: Сколько писем разобрали правила
    rules_applied: int
    finished_at: str

class MailSyncReport(_MailSyncReportRequired, total=False):
    """Итог одного прохода по ящику: «ничего не изменилось» — тоже ответ"""

    #: Папки, перечитанные целиком после смены UIDVALIDITY на сервере
    full_reloaded: List[str]
    #: Папки, которые в этот проход прочитать не удалось; остальные разобраны
    failed_folders: List[str]
    #: Письма, у которых проход перенёс с сервера прочтение, отметку или удаление из другого клиента
    updated: int
    #: Только у проверки по требованию: done — проверено, running — ящик проверяется фоном и письма появятся сами
    state: Literal['done', 'running']
    #: Проверка по требованию успела не все свои папки; остальное доделает фон
    partial: bool

MailSyncStatus = Literal['never', 'ok', 'running', 'failed']

class _MailThreadRequired(TypedDict):
    id: "UUID"
    account_id: "UUID"
    subject: str
    #: Корневой Message-ID ветки
    root_ref: str
    message_count: int
    unread_count: int
    has_attachments: bool
    participants: List["MailMessageAddress"]
    last_message_at: str

class MailThread(_MailThreadRequired, total=False):
    """Переписка: письма, связанные ответами. Склейка идёт по корню цепочки References, а не по теме."""

    messages: List["MailMessage"]

class ManagedChecklistItem(TypedDict):
    text: str
    done: bool

class ManagedChecklistPatch(TypedDict):
    #: Стабильный UUID группы, которой владеет интеграция.
    id: "UUID"
    title: str
    #: Пустой массив удаляет только группу с переданным id.
    items: List["ManagedChecklistItem"]

MarketplaceBuyoutCohort = TypedDict("MarketplaceBuyoutCohort", {"from": str, "to": str, "bought": float, "base": float, "pct": Optional[float]}, total=False)

class MarketplaceComponentDataThrough(TypedDict, total=False):
    """Последняя дата операций площадки, уже включённых в каждый компонент отчёта; отсутствующее или null-значение означает, что дата покрытия пока неизвестна."""

    #: Финансовые операции площадки
    finance: Optional[str]
    #: Реклама Wildberries
    ads: Optional[str]
    #: Клики рекламы Ozon
    ads_clicks: Optional[str]
    #: Заказы из рекламы Ozon
    ads_orders: Optional[str]
    #: Карточки товаров по дате последней синхронизации
    products: Optional[str]

class MarketplaceComponentFreshness(TypedDict, total=False):
    """Время последней успешной загрузки каждого компонента отчёта; отсутствующее или null-значение означает, что компонент ещё не загружался успешно."""

    #: Финансовые операции площадки
    finance: Optional[str]
    #: Реклама Wildberries
    ads: Optional[str]
    #: Клики рекламы Ozon
    ads_clicks: Optional[str]
    #: Заказы из рекламы Ozon
    ads_orders: Optional[str]
    #: Карточки товаров
    products: Optional[str]

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

class _MarketplaceOzonDecompositionRequired(TypedDict):
    #: Момент последней синхронизации аналитики
    updated: Optional[str]
    #: Последняя дата с данными
    anchor: str
    months: List["MarketplaceOzonDecompositionMonth"]
    month: Optional["MarketplaceOzonDecompositionMonth"]
    periods: List["MarketplaceOzonDecompositionPeriod"]
    articles: List["MarketplaceOzonDecompositionArticle"]
    other: Optional["MarketplaceOzonDecompositionOtherBlock"]

class MarketplaceOzonDecomposition(_MarketplaceOzonDecompositionRequired, total=False):
    freshness: "MarketplaceComponentFreshness"
    data_through: "MarketplaceComponentDataThrough"
    #: Хотя бы один обязательный компонент не загружался успешно, последняя загрузка завершилась ошибкой или давно не запускалась
    incomplete: bool

class _MarketplaceOzonDecompositionArticleRequired(TypedDict):
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

class MarketplaceOzonDecompositionArticle(_MarketplaceOzonDecompositionArticleRequired, total=False):
    #: Себестоимость артикула не заведена: прибыль завышена (ERP-1169)
    cost_missing: bool
    #: Площадка прислала выручку, но не количество проданных штук: себестоимость посчитана нулём (ERP-1217)
    units_missing: bool

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

MarketplaceOzonOrdersOverview = TypedDict("MarketplaceOzonOrdersOverview", {"day": str, "from": str, "to": str, "chart_from": str, "updated": Optional[str], "scheme": Literal['all', 'fbo', 'fbs'], "kpi": Dict[str, "MarketplaceOzonOrdersKpi"], "daily": List["MarketplaceOzonOrdersDailyRow"], "products": List["MarketplaceOzonOrdersProductRow"], "summary_total": Dict[str, int], "buyout": "MarketplaceBuyoutCohort"}, total=False)

class _MarketplaceOzonOrdersProductRowRequired(TypedDict):
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

class MarketplaceOzonOrdersProductRow(_MarketplaceOzonOrdersProductRowRequired, total=False):
    #: Заказано штук по дням периода: день ГГГГ-ММ-ДД → шт
    by_day: Dict[str, int]
    #: Недели и месяцы (?summary=1): окно (w3, w2, w1, prev_month, month) → заказано штук
    summary: Dict[str, int]

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
    #: Сколько штук продано в периоде без действующей ставки себестоимости: они посчитаны с нулевой закупкой, маржа периода завышена. Ключ — начало периода
    cost_missing: Dict[str, float]
    #: Выручка периода, по которой площадка не прислала количество проданных штук (ERP-1217): себестоимость посчитана нулём, маржа завышена. Ключ — начало периода. Заполняется только для Ozon
    units_missing: Dict[str, float]
    freshness: "MarketplaceComponentFreshness"
    data_through: "MarketplaceComponentDataThrough"
    #: Хотя бы один обязательный компонент не загружался успешно, последняя загрузка завершилась ошибкой или давно не запускалась
    incomplete: bool

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
    #: Номенклатура кабинета, к которой привязан артикул канала (core_product_identifier вида channel_article); null — не привязан
    linked_product_id: Optional["UUID"]
    #: SKU привязанной номенклатуры; пусто без связи
    linked_product_sku: str
    #: Название привязанной номенклатуры; пусто без связи
    linked_product_name: str

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

class _MarketplaceOzonStockProductRequired(TypedDict):
    store: "UUID"
    store_name: str
    offer_id: str
    name: str
    image: str
    total: int
    warehouses: List["MarketplaceOzonStockWarehouse"]

class MarketplaceOzonStockProduct(_MarketplaceOzonStockProductRequired, total=False):
    #: Товар в пути к покупателю, шт
    to_client: int
    #: Выкуп, % — когорта созревших заказов, как у воронки; нет — поля нет
    buyout_pct: float
    #: Остаток с возвратом невыкупленного из того, что в пути: остаток + в пути × (1 − выкуп)
    effective: float

class _MarketplaceOzonStockWarehouseRequired(TypedDict):
    warehouse: str
    qty: int

class MarketplaceOzonStockWarehouse(_MarketplaceOzonStockWarehouseRequired, total=False):
    cluster: str

class _MarketplaceOzonStocksPageRequired(TypedDict):
    count: int
    #: Склады встреченные в выборке
    warehouses: List[str]
    results: List["MarketplaceOzonStockProduct"]

class MarketplaceOzonStocksPage(_MarketplaceOzonStocksPageRequired, total=False):
    #: Строк «товар × склад» больше предела 8000: хвост артикулов не пришёл, отсутствие товара не значит «остатка нет»
    truncated: bool

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

class _MarketplaceStoreRequired(TypedDict):
    id: "UUID"
    #: Платформа задаётся маршрутом, а не телом запроса
    platform: Literal['ozon', 'wildberries', 'yandex']
    name: str
    #: Ставка налога в процентах; decimal строкой
    tax_percent: str
    is_active: bool
    #: Для подключения включена загрузка схемы FBS
    has_fbs: bool
    #: Для подключения Wildberries включена аналитика «Джем»
    has_jam: bool
    #: Есть хотя бы один сохранённый API-реквизит
    credentials_configured: bool
    ozon_client_id_set: bool
    ozon_api_key_set: bool
    ozon_pf_client_id_set: bool
    ozon_pf_client_secret_set: bool
    wb_token_set: bool
    ym_business_id_set: bool
    ym_api_key_set: bool
    proxy_set: bool
    #: Состояние передачи настройки в MPTrack
    config_sync_status: Literal['not_configured', 'synced', 'error']
    #: Безопасное состояние подключения в ERP: not_checked — проверка ещё не запускалась, pending — MPTrack проверяет реквизиты или запускает первую загрузку, disabled — загрузки отключены, ok — подключение работает, warning — требуется внимание, error — подключение не работает. Сырые статусы и тексты MPTrack не публикуются
    connection_status: Literal['not_checked', 'pending', 'disabled', 'ok', 'warning', 'error']

class MarketplaceStore(_MarketplaceStoreRequired, total=False):
    """Магазин маркетплейса в кабинете. Форма одна для Ozon, Wildberries и Яндекс Маркета — их различает только поле platform. Ключи, токены и proxy в ответ не попадают; вместо них возвращаются безопасные признаки настройки."""

    #: Внутренний идентификатор MPTrack; назначается после передачи настройки и не вводится пользователем
    external_id: int
    config_synced_at: str
    #: Безопасная классификация токена Wildberries без раскрытия токена: basic — ограниченный базовый, personal — персональный, test — тестовый, service — сервисный, unknown — тип не определён
    token_class: Literal['basic', 'personal', 'test', 'service', 'unknown']
    #: Безопасный стабильный код состояния подключения; сырой текст ошибки не публикуется
    connection_error_code: str
    #: Момент последней успешной загрузки этого подключения
    last_etl_at: str
    #: Разделитель базы и размера в артикуле продавца, объявленный владельцем магазина. Пустая строка — правило не объявлено, и размер берётся только из полей площадки. Применяется на Ozon, где каждый размер продаётся своим артикулом
    article_size_separator: Literal['', '-', '/', '_']
    #: Бизнес магазина — бизнес юрлица из учётных настроек; по нему магазин и его отчёты сужаются областью доступа участника. null — юрлицо ещё не выбрано в кабинете с несколькими бизнесами: такой магазин видит только доступ ко всем бизнесам
    business_id: Optional["UUID"]

class _MarketplaceStoreInputRequired(TypedDict):
    name: str

class MarketplaceStoreInput(_MarketplaceStoreInputRequired, total=False):
    """Тело создания управляемого подключения. Платформу задаёт маршрут, а external_id назначает MPTrack. Для Ozon нужны ozon_client_id и ozon_api_key, для Wildberries — wb_token, для Яндекс Маркета — ym_business_id и ym_api_key."""

    #: Ставка налога в процентах; пустая строка сохраняется как ноль
    tax_percent: str
    is_active: bool
    has_fbs: bool
    #: Используется для Wildberries
    has_jam: bool
    #: Правило именования артикула Ozon: «БАЗА<разделитель>РАЗМЕР». Список закрыт; пустая строка означает «правила нет». Официальные поля размера площадки всегда старше этого правила
    article_size_separator: Literal['', '-', '/', '_']
    ozon_client_id: str
    ozon_api_key: str
    ozon_pf_client_id: str
    ozon_pf_client_secret: str
    #: Рекомендуется персональный токен класса personal; значение не возвращается
    wb_token: str
    #: Business ID вводится строкой; ERP проверяет числовой идентификатор и преобразует его для MPTrack
    ym_business_id: str
    ym_api_key: str
    #: Необязательный адрес proxy; значение не возвращается
    proxy: str
    #: Бизнес магазина. В кабинете с одним бизнесом подставляется сам; при нескольких обязателен — без него ответ 400 marketplace.store_business_required. Бизнес должен входить в область права участника целиком, иначе 403 marketplace.store_business_forbidden; юрлицо учёта магазина потом выбирается только этого бизнеса
    business_id: "UUID"

class MarketplaceStorePage(TypedDict):
    count: int
    results: List["MarketplaceStore"]

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
    #: Из «Джема», а без него из продаж или закупок
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
    freshness: "MarketplaceComponentFreshness"
    data_through: "MarketplaceComponentDataThrough"
    #: Хотя бы один обязательный компонент не загружался успешно, последняя загрузка завершилась ошибкой или давно не запускалась
    incomplete: bool

class _MarketplaceWbDecompositionArticleRequired(TypedDict):
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

class MarketplaceWbDecompositionArticle(_MarketplaceWbDecompositionArticleRequired, total=False):
    #: Себестоимость артикула не заведена: прибыль завышена (ERP-1169)
    cost_missing: bool
    #: Площадка прислала выручку, но не количество проданных штук: себестоимость посчитана нулём (ERP-1217)
    units_missing: bool

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

MarketplaceWbOrdersOverview = TypedDict("MarketplaceWbOrdersOverview", {"day": str, "from": str, "to": str, "chart_from": str, "updated": Optional[str], "kpi": "MarketplaceWbOrdersOverviewKpi", "daily": List["MarketplaceWbOrdersDay"], "products": List["MarketplaceWbOrdersProduct"], "summary_total": Dict[str, int], "demo": bool, "buyout": "MarketplaceBuyoutCohort"}, total=False)

class MarketplaceWbOrdersOverviewKpi(TypedDict):
    orders: "MarketplaceWbOrdersKpi"
    sales: "MarketplaceWbOrdersKpi"

class _MarketplaceWbOrdersProductRequired(TypedDict):
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

class MarketplaceWbOrdersProduct(_MarketplaceWbOrdersProductRequired, total=False):
    #: Заказано штук по дням периода: день ГГГГ-ММ-ДД → шт
    by_day: Dict[str, int]
    #: Недели и месяцы (?summary=1): окно (w3, w2, w1, prev_month, month) → заказано штук
    summary: Dict[str, int]

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
    #: Сколько штук продано в периоде без действующей ставки себестоимости: они посчитаны с нулевой закупкой, маржа периода завышена. Ключ — начало периода
    cost_missing: Dict[str, float]
    #: Выручка периода, по которой площадка не прислала количество проданных штук (ERP-1217): себестоимость посчитана нулём, маржа завышена. Ключ — начало периода. Заполняется только для Ozon
    units_missing: Dict[str, float]
    freshness: "MarketplaceComponentFreshness"
    data_through: "MarketplaceComponentDataThrough"
    #: Хотя бы один обязательный компонент не загружался успешно, последняя загрузка завершилась ошибкой или давно не запускалась
    incomplete: bool

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
    #: Последняя цена покупателя из продаж или закупок или продаж
    buyer_price: str
    stock: int
    in_way_to_client: int
    in_way_from_client: int
    #: Себестоимость из кабинета
    cost: Optional[str]
    #: Номенклатура кабинета, к которой привязан артикул канала (core_product_identifier вида channel_article); null — не привязан
    linked_product_id: Optional["UUID"]
    #: SKU привязанной номенклатуры; пусто без связи
    linked_product_sku: str
    #: Название привязанной номенклатуры; пусто без связи
    linked_product_name: str

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

class _MarketplaceWbStockPageRequired(TypedDict):
    #: Число товаров, а не строк «товар × склад»
    count: int
    #: Склады в порядке первого появления
    warehouses: List[str]
    results: List["MarketplaceWbStockProduct"]

class MarketplaceWbStockPage(_MarketplaceWbStockPageRequired, total=False):
    #: Строк «товар × склад» больше предела 8000: хвост артикулов не пришёл, отсутствие товара не значит «остатка нет»
    truncated: bool

class _MarketplaceWbStockProductRequired(TypedDict):
    store: "UUID"
    store_name: str
    #: Артикул поставщика
    offer_id: str
    name: str
    image: str
    total: int
    warehouses: List["MarketplaceWbStockWarehouse"]

class MarketplaceWbStockProduct(_MarketplaceWbStockProductRequired, total=False):
    #: Товар в пути к покупателю, шт
    to_client: int
    #: Выкуп, % — когорта созревших заказов, как у воронки; нет — поля нет
    buyout_pct: float
    #: Остаток с возвратом невыкупленного из того, что в пути: остаток + в пути × (1 − выкуп)
    effective: float

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
    #: Сумма продаж или закупок кроме отменённых; decimal строкой
    orders_sum: str
    orders_qty: int
    #: Сумма доставленных продаж или закупок; decimal строкой
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

MarketplaceYandexOrdersOverview = TypedDict("MarketplaceYandexOrdersOverview", {"day": str, "from": str, "to": str, "chart_from": str, "updated": Optional[str], "kpi": "MarketplaceYandexOrdersOverviewKpi", "daily": List["MarketplaceYandexOrdersDay"], "products": List["MarketplaceYandexOrdersProduct"], "summary_total": Dict[str, int], "demo": bool}, total=False)

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
    #: Заказано штук по дням периода: день ГГГГ-ММ-ДД → шт
    by_day: Dict[str, int]
    #: Недели и месяцы (?summary=1): окно (w3, w2, w1, prev_month, month) → заказано штук
    summary: Dict[str, int]

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
    #: Сколько штук продано в периоде без действующей ставки себестоимости: они посчитаны с нулевой закупкой, маржа периода завышена. Ключ — начало периода
    cost_missing: Dict[str, float]
    #: Выручка периода, по которой площадка не прислала количество проданных штук (ERP-1217): себестоимость посчитана нулём, маржа завышена. Ключ — начало периода. Заполняется только для Ozon
    units_missing: Dict[str, float]
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
    #: Номенклатура кабинета, к которой привязан артикул канала (core_product_identifier вида channel_article); null — не привязан
    linked_product_id: Optional["UUID"]
    #: SKU привязанной номенклатуры; пусто без связи
    linked_product_sku: str
    #: Название привязанной номенклатуры; пусто без связи
    linked_product_name: str

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
    #: Живые задачи вехи, без архивных
    task_count: int
    #: Из них в финальном статусе
    tasks_done: int
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
    #: Наше приложение: его установка получает долгий потолок срока жизни токена. Ставится персоналом платформы, из манифеста не выводится
    internal: bool
    #: Сотрудник платформы, заведший приложение
    created_by: int

PlatformAppInstallationStatus = Literal['pending', 'active', 'suspended', 'revoked']

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

PlatformAppStatus = Literal['draft', 'published', 'suspended', 'retired']

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
    #: Бизнес проекта: правило «все задачи» при области доступа не на все бизнесы видит только проекты её бизнесов и кабинета; участники проекта видят его всегда. null — проект всего кабинета
    business_id: Optional["UUID"]

class _ProjectCreateRequired(TypedDict):
    name: str

class ProjectCreate(_ProjectCreateRequired, total=False):
    key: str
    description: str
    color: str
    #: Бизнес проекта. Пусто — единственный бизнес области доступа или весь кабинет (его заводит только доступ ко всем бизнесам). Бизнес вне области доступа — 403 tasks.project_business_forbidden
    business_id: Optional["UUID"]

class ProjectPage(TypedDict):
    count: int
    results: List["Project"]

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

class _SettingsCompanyRequired(TypedDict):
    id: "UUID"
    business_id: "UUID"
    name: str
    legal_name: str
    #: Юридическое лицо или индивидуальный предприниматель
    entity_type: Literal['legal', 'sole_prop']
    #: Пустой только у юрлица внутреннего учёта
    inn: str
    kpp: str
    #: ОГРН у юрлица или ОГРНИП у предпринимателя
    ogrn: str
    #: ОКПО; необязательный реквизит формализованного документа
    okpo: str
    #: Код филиала у оператора ЭДО; не КПП
    branch_code: str
    #: Режим налога, действующий сегодня (версия учётной политики): deductible — в вычет, non_deductible — в стоимость, none — налога нет, пусто — не выбран
    vat_accounting_mode: Literal['', 'deductible', 'non_deductible', 'none']
    #: Кто поставил значение: manual — человек, import — внешняя система; импорт не перезаписывает manual
    vat_accounting_mode_source: Literal['manual', 'import']
    legal_address: "SettingsCompanyAddress"
    entrepreneur: "SettingsCompanyPerson"
    is_active: bool
    #: Значения своих полей кабинета: графа («Настройки → Поля», вид core.company) → значение
    custom: Dict[str, Any]

class SettingsCompany(_SettingsCompanyRequired, total=False):
    head: "SettingsCompanyHead"
    #: Контроль закрывающих документов по выданным авансам: вкладка «Ждём закрывающие» ведёт авансы этого юрлица. Для режима «доходы минус расходы» обязателен, на «доходах» не нужен
    closing_control: bool

class SettingsCompanyAddress(TypedDict):
    postal_code: str
    #: Код субъекта РФ для формализованного документа
    region_code: str
    region_name: str
    district: str
    city: str
    settlement: str
    street: str
    building: str
    block: str
    #: Офис или помещение
    flat: str
    #: Дополнение, которое не раскладывается по остальным частям адреса
    info: str

class SettingsCompanyHead(TypedDict, total=False):
    """Руководитель юрлица полным ФИО и должностью — подписант документов без доверенности; ФИО как в сертификате подписи"""

    surname: str
    name: str
    patronymic: str
    position: str

class SettingsCompanyPage(TypedDict):
    #: Число отданных строк, страниц у справочника нет
    count: int
    results: List["SettingsCompany"]

class _SettingsCompanyPersonRequired(TypedDict):
    surname: str
    name: str
    patronymic: str

class SettingsCompanyPerson(_SettingsCompanyPersonRequired, total=False):
    #: Дата присвоения ОГРНИП; с 01.04.2026 печатается в счёте-фактуре под подписью ИП вместе с ОГРНИП
    ogrnip_date: str

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
    #: Роль действует во всех бизнесах кабинета, включая заведённые позже. У администратора всегда true
    all_businesses: bool
    #: Бизнесы сотрудника; пуст при all_businesses
    businesses: List["SettingsMemberBusinessScope"]

class SettingsMemberAccessInput(TypedDict, total=False):
    #: Все бизнесы кабинета; тогда businesses не передаётся
    all_businesses: bool
    #: Бизнесы сотрудника целиком; повторы и юрлица бизнеса, выданного целиком, сворачиваются
    businesses: List["SettingsMemberBusinessScope"]

class _SettingsMemberBusinessScopeRequired(TypedDict):
    business: "UUID"

class SettingsMemberBusinessScope(_SettingsMemberBusinessScopeRequired, total=False):
    #: Сужает доступ до юрлица этого бизнеса; без поля — бизнес целиком
    company: "UUID"

class SettingsMemberPage(TypedDict):
    #: Число строк в results, а не общее число участников кабинета
    count: int
    results: List["SettingsMember"]

class SettingsRole(TypedDict):
    id: "UUID"
    name: str
    #: У административной роли permissions всегда равны ["*:*"]
    is_admin: bool
    is_active: bool
    #: Право записывается как «модуль:действие», например settings:read
    permissions: List[str]
    #: Ключ — ресурс модуля: tasks.task, crm.lead, crm.deal, crm.customer, crm.conversation, core.order, docflow.payment_request и ресурсы клиентских модулей. Значение — own (свои), projects (свои и проекты участия, у задач), team (свои и подчинённых), department (своего подразделения), department_tree (подразделения с подотделами) или all (все записи области). Пустая карта означает видимость только своих записей
    record_rules: Dict[str, Literal['own', 'projects', 'team', 'department', 'department_tree', 'all']]

class SettingsRolePage(TypedDict):
    #: Число строк в results, а не общее число ролей кабинета
    count: int
    results: List["SettingsRole"]

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

class _StockAccountTransferCreateRequired(TypedDict):
    business_id: "UUID"

class StockAccountTransferCreate(_StockAccountTransferCreateRequired, total=False):
    """Тело черновика переноса остатка; строки подбирает сервер."""

    #: Пусто или отсутствует означает рабочую дату кабинета
    date: str
    comment: str

class _StockAccountTransferLineRequired(TypedDict):
    business_id: "UUID"
    warehouse_id: "UUID"
    warehouse_name: str
    product_id: "UUID"
    product_name: str
    from_account: "UUID"
    #: Код старого счёта, например 41
    from_code: str
    to_account: "UUID"
    #: Код счёта по действующему правилу, например 10
    to_code: str
    #: Сумма переноса, десятичная строка
    amount: str

class StockAccountTransferLine(_StockAccountTransferLineRequired, total=False):
    """Строка переноса остатка — стоимость склада и товара, которая лежит в книге на счёте `from_*`, хотя по правилу на дату принадлежит счёту `to_*`."""

    company_id: "UUID"

class StockAccountTransferProposal(TypedDict):
    count: int
    results: List["StockAccountTransferLine"]

class StockAssemblySpec(TypedDict, total=False):
    """Одна версия спецификации изделия. Состав опубликованной версии неизменяем — новая редакция заводится новой версией."""

    id: "UUID"
    spec_id: "UUID"
    version: int
    name: str
    status: Literal['draft', 'active', 'archived']
    #: Вид состава: assembly — «Сборка», production — «Производство», kit — «Комплект» (заложен, пока не заводится). Хранится у версии: следующая редакция может сменить вид
    kind: Literal['assembly', 'production', 'kit']
    product_id: "UUID"
    product_sku: str
    product_name: str
    unit: str
    output_qty: str
    comment: str
    created_at: str
    updated_at: str
    activated_at: str
    archived_at: str
    lines: List["StockAssemblySpecLine"]
    #: Версии, которые это действие убрало в архив: активация архивирует прежнюю действующую версию того же товара — своей или другой спецификации. Поле есть только в ответе смены состояния; отсутствует, если в архив ничего не ушло
    archived_versions: List["StockAssemblySpecArchivedVersion"]

class StockAssemblySpecArchivedVersion(TypedDict):
    id: "UUID"
    spec_id: "UUID"
    name: str
    version: int

class _StockAssemblySpecCreateRequired(TypedDict):
    name: str
    product_id: "UUID"
    #: Сколько выходного товара даёт этот состав
    output_qty: str
    lines: List["StockAssemblySpecCreateLinesItem"]

class StockAssemblySpecCreate(_StockAssemblySpecCreateRequired, total=False):
    """Новая версия состава. Пустой `spec_id` заводит новую спецификацию, названный — следующую редакцию существующей. Версия рождается черновиком."""

    #: Спецификация, к которой заводится следующая редакция. Должна существовать в кабинете, а product_id — совпадать с её выходным товаром; состояние прежних версий не важно — редакцию заводят и от архивной. Пусто — новая спецификация
    spec_id: "UUID"
    #: Вид состава: assembly — «Сборка» (по умолчанию), production — «Производство». Вид kit («Комплект») пока не принимается — ответ 400
    kind: Literal['assembly', 'production']
    comment: str

class _StockAssemblySpecCreateLinesItemRequired(TypedDict):
    product_id: "UUID"
    qty: str

class StockAssemblySpecCreateLinesItem(_StockAssemblySpecCreateLinesItemRequired, total=False):
    share: str

class _StockAssemblySpecLineRequired(TypedDict):
    product_id: "UUID"
    #: Положительная decimal string в единице товара или в базовой единице карточки
    qty: str

class StockAssemblySpecLine(_StockAssemblySpecLineRequired, total=False):
    id: "UUID"
    product_sku: str
    product_name: str
    unit: str
    #: Единица товара, в которой задано qty (рулон, грамм); пусто — базовая единица карточки
    product_uom_id: "UUID"
    #: Название единицы товара
    uom_name: str
    #: То же количество в базовой единице на момент заведения версии; считает сервер. Смысл состава — это число: коэффициент упаковки может измениться позже
    base_qty: str
    #: Доля стоимости при разукомплектации; задаётся сразу для всего состава или не задаётся вовсе
    share: str
    position: int

class StockAssemblySpecPage(TypedDict):
    count: int
    limit: int
    offset: int
    results: List["StockAssemblySpec"]

class _StockAssemblySpecRefRequired(TypedDict):
    spec_id: "UUID"
    version_id: "UUID"
    version: int

class StockAssemblySpecRef(_StockAssemblySpecRefRequired, total=False):
    """Снимок версии спецификации, по которой заполнен документ. Ссылка на версию, а не на справочник: состав уже скопирован в строки, и правка спецификации завтра не меняет смысл проведённого вчера. Версию сервер читает, только когда ссылка появляется — при создании документа и при правке, называющей другую версию: такая версия обязана быть действующей, черновая и архивная отклоняются. Правка черновика с прежним version_id версию не читает, и документ остаётся правимым, даже если версия ушла в архив или удалена; ссылку можно снять."""

    name: str
    #: Вид версии состава на момент заполнения документа; ставит сервер
    kind: Literal['assembly', 'production']

class StockAssemblySpecStatus(TypedDict):
    status: Literal['active', 'archived']

class _StockAssemblySpecUpdateRequired(TypedDict):
    name: str
    #: Выходной товар. Сменить его можно только у единственной версии спецификации: другой товар при нескольких версиях — это другая спецификация
    product_id: "UUID"
    #: Сколько выходного товара даёт этот состав
    output_qty: str
    lines: List["StockAssemblySpecUpdateLinesItem"]

class StockAssemblySpecUpdate(_StockAssemblySpecUpdateRequired, total=False):
    """Полная замена реквизитов и состава черновика. Номер версии и спецификация, к которой она относится, не меняются. Проверки те же, что при заведении версии."""

    #: Вид состава: assembly — «Сборка» (по умолчанию), production — «Производство». Вид kit («Комплект») пока не принимается — ответ 400
    kind: Literal['assembly', 'production']
    comment: str

class _StockAssemblySpecUpdateLinesItemRequired(TypedDict):
    product_id: "UUID"
    qty: str

class StockAssemblySpecUpdateLinesItem(_StockAssemblySpecUpdateLinesItemRequired, total=False):
    #: Единица товара, в которой задано qty; пусто — базовая единица карточки
    product_uom_id: "UUID"
    share: str

class StockBatch(TypedDict):
    id: "UUID"
    #: Бизнес партии — учётная единица, которой принадлежит товар
    business_id: Dict[str, Any]
    business_name: str
    #: Юрлицо партии — разрез официального контура. У неофициального прихода его нет, и тогда поле пустое (ERP-704).
    company_id: Optional["UUID"]
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

class _StockClaimWriteoffCreateRequired(TypedDict):
    basis_id: "UUID"
    item_id: "UUID"

class StockClaimWriteoffCreate(_StockClaimWriteoffCreateRequired, total=False):
    """Тело черновика списания претензии поставщику по недостаче приёмки."""

    #: Пусто или отсутствует означает рабочую дату кабинета
    date: str
    #: Сумма в валюте приёмки; пусто — весь остаток претензии
    amount: str
    comment: str

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

class _StockDocumentCreateRequired(TypedDict):
    type_key: "StockDocumentCreateTypeKey"
    entity_refs: "StockDocumentRefs"
    #: Для инвентаризации — фильтр снимка, для остальных видов — содержимое документа
    payload: Union["StockDocumentPayload", "StockInventoryCreatePayload"]

class StockDocumentCreate(_StockDocumentCreateRequired, total=False):
    #: Пусто или отсутствует означает рабочую дату кабинета
    date: str
    #: Документ-основание. У разукомплектации (stock_disassembly) основанием может быть проведённая комплектация (stock_assembly) того же бизнеса и юрлица, родившая разбираемый товар, датой не позже разбора. Тогда части — только товары, которые комплектация списывала (вернуть можно не все), доли стоимости не присылают, комплектация вида production обратно не разбирается, а проведёнными разборами по одной комплектации нельзя разобрать больше, чем она родила. Основание-резерв у разукомплектации этих правил не включает
    basis_id: Optional["UUID"]
    comment: str

StockDocumentCreateTypeKey = Literal['stock_receipt', 'stock_shipment', 'stock_transfer', 'stock_writeoff', 'stock_capitalization', 'stock_supplier_return', 'stock_customer_return', 'stock_purchase_request', 'stock_supplier_order', 'stock_inventory', 'stock_reservation', 'stock_landed_cost', 'stock_assembly', 'stock_disassembly']

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
    #: Количество по документу поставщика, если пришло меньше (ERP-1230): сумма строки — по документу, склад и налог к вычету — по qty, разница — претензия поставщику (сторона claim, 76.02). Только у stock_receipt; меньше qty — 400
    document_qty: str
    #: Физическая единица справочника
    unit_id: Optional["UUID"]
    #: Товарная единица представления
    product_uom_id: Optional["UUID"]
    #: Количество в базовой единице номенклатуры; присланное значение обязано совпасть с серверным пересчётом. У прихода в единице с переменной мерой — сумма фактических мер handling_units
    base_qty: str
    #: Ставит сервер: строка введена в единице с переменной мерой. qty — число конкретных единиц, base_qty — сумма их фактических мер, price — цена за базовую единицу
    variable_measure: bool
    #: Decimal string; за единицу строки, а у единицы с переменной мерой — за базовую единицу
    price: str
    #: Decimal string
    amount: str
    #: Сумма строки без налога. Считает сервер из paper_vat_amount и перезаписывает присланное
    amount_without_vat: str
    #: Доля налога документа в строке: пропорционально сумме строки, копеечный остаток — на самую крупную. Считает сервер и перезаписывает присланное; по её наличию судят о разбивке при перепроведении
    vat_amount: str
    basis_line_id: Optional["UUID"]
    #: Построчное происхождение, когда одна закупка сводит несколько заявок
    basis_document_id: Optional["UUID"]
    batch_code: str
    produced_at: str
    expires_at: str
    handling_units: List["StockDocumentLineHandlingUnit"]
    handling_unit_allocations: List["StockDocumentLineHandlingAllocation"]
    #: Доля стоимости рождённой строки; только у разукомплектации без комплектации-основания на несколько частей. У разукомплектации на основании комплектации доли не присылают: присланная доля отклоняется, веса частей сервер берёт из проведения основания
    share: str

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
    """Содержимое складского документа. Разбор строгий — незнакомое поле отклоняется. У документа-факта, заявки, продажи или закупки и резерва `items` обязателен и не длиннее 1000 строк."""

    reason: str
    #: Причина списания из справочника stock.stock_writeoff_reasons. Есть только у списания. Текст reason при этом остаётся: ссылка даёт единое значение причины, текст несёт подробности. Не прислан — сервер сам пробует узнать текст в справочнике; прислан явно, в том числе null, — решение вызывающего не переигрывается; неизвестная ссылка отклоняется
    reason_id: Optional["UUID"]
    desired_at: str
    delivery_at: str
    #: Срок резерва; не раньше даты документа
    expires_at: str
    items: List["StockDocumentLine"]
    #: Строки, которые документ РОЖДАЕТ на складе. Только у комплектации и разукомплектации: их `items` — сторона расхода. Цена и сумма здесь не задаются, стоимость выхода равна списанной.
    produced: List["StockDocumentLine"]
    spec: "StockAssemblySpecRef"
    #: Вид комплектации (только stock_assembly): assembly — «Сборка», production — «Производство». Документ, заполненный по составу (`spec`), получает вид версии состава — присланное значение, которое с ней расходится, отклоняется; без состава вид выбирает человек, пусто — assembly. Снимок: новая версия состава с другим видом документ не меняет. Документ без поля читается как assembly. У разукомплектации вида нет
    kind: Literal['assembly', 'production']
    #: Итого по документу поставщика. Только проверка суммы строк: расхождение показывает экран, сохранение не останавливается
    paper_amount: str
    #: В т.ч. НДС документа поставщика, одна сумма (ERP-484, подшаг 5.3). Обязательна, если на дату документа бизнес очищает суммы и юрлицо принимает налог к вычету; 0 — налог не выделен. Вне этого периода непустое значение — 400. Сервер раскладывает сумму по строкам
    paper_vat_amount: str
    supplier_document: "SupplierDocument"
    #: Налоговая валюта юрлица на дату приёмки (ERP-484, Р21). Пишет сервер вместе с разбивкой налога; присланное значение перезаписывается
    tax_currency: str
    #: Налог строк взят из документа поставщика как есть (ERP-1230): сервер не раскладывает paper_vat_amount, а проверяет vat_amount строк и пишет их сумму в paper_vat_amount
    vat_from_lines: bool
    #: Валюта приёмки (ERP-1230): ISO-код валюты документа поставщика; пусто или валюта учёта — документ в валюте учёта. Только у stock_receipt
    currency: str
    #: Курс валюты документа: единиц валюты учёта за 1 единицу валюты документа. Без rate_manual сервер берёт его из справочника курсов на дату документа; нет курса — черновик без курса, проведение — 400
    rate: str
    #: Курс введён вручную: справочник его не перезаписывает
    rate_manual: bool
    #: Decimal string; сумма накладных расходов
    amount: str
    allocation_method: Literal['quantity', 'cost', 'manual']
    targets: List["StockDocumentLandedCostTarget"]
    #: Разложение проведения по строкам и партиям, которое пишет сам движок. У разукомплектации на основании комплектации есть блок `disassembly_basis`: `document_id` и `number` основания, `amount` — фактически списанная сумма, `basis_amount` — сумма того же количества по основанию (рождённая сумма основания ÷ рождённое количество × разбираемое количество), `difference` — amount минус basis_amount, `weights` — веса частей по строкам (`line_id`, `weight`), по которым списанное разделено между частями. Веса и `basis_amount` — снимок первого проведения: пересчёт себестоимости цепочки их сохраняет и пересчитывает только `amount` и `difference`; отмена и повторное проведение считают всё заново
    posting: Dict[str, Any]

class _StockDocumentRefsRequired(TypedDict):
    company: "UUID"

class StockDocumentRefs(_StockDocumentRefsRequired, total=False):
    """Ссылки шапки складского документа. Набор допустимых полей зависит от вида — перемещению нужны склад-отправитель и склад-получатель, инвентаризации только юрлицо и склад."""

    warehouse: "UUID"
    warehouse_from: "UUID"
    #: Склад-получатель перемещения; у комплектации и разукомплектации — необязательный склад выпуска, без него выпуск появляется на складе списания
    warehouse_to: Dict[str, Any]
    contact: "UUID"

StockDocumentTypeKey = Literal['stock_receipt', 'stock_shipment', 'stock_transfer', 'stock_writeoff', 'stock_capitalization', 'stock_supplier_return', 'stock_customer_return', 'stock_purchase_request', 'stock_supplier_order', 'stock_inventory', 'stock_reservation', 'stock_landed_cost', 'stock_assembly', 'stock_disassembly', 'stock_reservation_release', 'stock_supplier_order_close', 'stock_opening_balance', 'stock_marketplace_return', 'stock_account_transfer', 'supplier_order']

class _StockDownloadLinkRequired(TypedDict):
    url: str
    method: Literal['GET']
    #: true — подписанный адрес хранилища, без заголовка авторизации; false — адрес этого API, с авторизацией
    direct: bool
    #: true — адрес требует токен API, агенту по MCP он недоступен
    requires_authorization: bool
    name: str
    mime_type: str
    size_bytes: int

class StockDownloadLink(_StockDownloadLinkRequired, total=False):
    """Временный адрес файла склада: подписанный адрес хранилища или адрес этого API."""

    #: Срок подписанного адреса; у адреса API его нет
    expires_at: str
    #: Контрольная сумма SHA-256, если известна
    sha256: str

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

StockExportKind = Literal['initial_stock', 'inventory_count', 'document_items', 'reorder_rules', 'stock_report']

class _StockExportRequestRequired(TypedDict):
    kind: "StockExportKind"

class StockExportRequest(_StockExportRequestRequired, total=False):
    format: "CoreProductTransferFormat"
    #: Обязателен для всех видов, кроме reorder_rules и stock_report
    target_document_id: "UUID"
    #: Обязателен для stock_report и запрещён остальным видам: без отбора запрос означал бы «выгрузите весь кабинет»
    report: "StockReportExportRequest"

class _StockHandlingUnitRequired(TypedDict):
    id: "UUID"
    batch_id: "UUID"
    #: Нулевой UUID — единица без юрлица
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
    #: Остаток меньше порога обрезка у единицы товара: вычисляется по остатку, а не хранится
    is_remnant: bool
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
    business_id: "UUID"
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

class _StockImportUploadSessionRequestRequired(TypedDict):
    kind: "StockImportKind"
    mode: "CoreProductImportMode"

class StockImportUploadSessionRequest(_StockImportUploadSessionRequestRequired, total=False):
    """Заявка на сессию загрузки файла складского импорта. filename и size — синонимы name и size_bytes."""

    #: Имя файла с расширением xlsx, xls, ods, csv или tsv
    name: str
    #: Тип содержимого; по умолчанию — по расширению файла
    mime_type: str
    #: Точный размер файла в байтах
    size_bytes: int
    #: Необязательная контрольная сумма SHA-256 строчными шестнадцатеричными знаками
    sha256: str
    #: Складской документ, к которому привязан прогон; строки без document_id получают его
    target_document_id: "UUID"
    #: Синоним поля name
    filename: str
    #: Синоним поля size_bytes
    size: int

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

class _StockOpeningBalanceCreateRequired(TypedDict):
    entity_refs: "StockDocumentRefs"
    payload: "StockDocumentPayload"

class StockOpeningBalanceCreate(_StockOpeningBalanceCreateRequired, total=False):
    """Тело черновика ввода начальных остатков товара; вид задаёт ручка."""

    #: Пусто или отсутствует означает рабочую дату кабинета
    date: str
    comment: str

class _StockOrderShipInputRequired(TypedDict):
    lines: List["StockOrderShipInputLinesItem"]

class StockOrderShipInput(_StockOrderShipInputRequired, total=False):
    """warehouse_id необязателен — без него склад выбирает сервер тем же правилом, что ship_warehouse"""

    warehouse_id: "UUID"
    #: Дата отгрузки; пусто — текущая бизнес-дата
    date: str
    comment: str

class StockOrderShipInputLinesItem(TypedDict):
    item_id: "UUID"
    quantity: str

class _StockOrderShipmentRequired(TypedDict):
    id: "UUID"
    order_id: "UUID"
    number: str
    date: str
    status: str
    lines: List["StockOrderShipmentLine"]

class StockOrderShipment(_StockOrderShipmentRequired, total=False):
    warehouse_id: "UUID"
    deal: "UUID"

class StockOrderShipmentLine(TypedDict):
    product_id: "UUID"
    qty: str

class _StockOrderShippingRequired(TypedDict):
    order_id: "UUID"
    number: str
    date: str
    state: str
    contact_id: "UUID"
    lines: List["StockOrderShippingLine"]
    shipments: List["StockOrderShipment"]
    reserved: bool
    can_ship: bool

class StockOrderShipping(_StockOrderShippingRequired, total=False):
    contact_name: str
    company_id: "UUID"
    warehouse_id: "UUID"
    #: Остаток резерва самой продажи по складам (товар → количество). Свободный остаток склада его уже вычел, а отгрузка по продаже гасит свой резерв
    reservations: List["StockOrderShippingReservationsItem"]
    ship_blocked: str
    #: Склад отгрузки по умолчанию; нет поля — сервер склад не подобрал, его выбирает человек
    ship_warehouse: "StockOrderShippingShipWarehouse"

class StockOrderShippingReservationsItem(TypedDict):
    warehouse_id: "UUID"
    products: Dict[str, str]

class StockOrderShippingShipWarehouse(TypedDict):
    """Склад отгрузки по умолчанию; нет поля — сервер склад не подобрал, его выбирает человек"""

    id: "UUID"
    name: str
    source: Literal['order', 'reservation', 'policy', 'stock']

class _StockOrderShippingLineRequired(TypedDict):
    line_id: "UUID"
    product_id: "UUID"
    title: str
    ordered_qty: str
    shipped_qty: str
    remaining_qty: str

class StockOrderShippingLine(_StockOrderShippingLineRequired, total=False):
    unit: str

class StockOrderShippingPage(TypedDict):
    results: List["StockOrderShipping"]
    count: int

class _StockProductUOMRequired(TypedDict):
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

class StockProductUOM(_StockProductUOMRequired, total=False):
    #: Коэффициент — номинал: фактическая мера у каждой конкретной единицы своя (рулон ~50 м)
    variable_measure: bool
    #: Шаг количества в этой единице: «режем по 10 см». Пусто — без ограничения
    qty_step: str
    #: Порог обрезка: остаток конкретной единицы меньше порога считается обрезком. Только для единиц с учётом конкретных единиц
    remnant_threshold: str

class _StockProductUOMInputRequired(TypedDict):
    product_id: "UUID"
    code: str
    name: str
    input_unit_id: "UUID"
    #: Положительное число; десятичный разделитель — точка или запятая, хранится запись с точкой
    factor_to_base: str

class StockProductUOMInput(_StockProductUOMInputRequired, total=False):
    #: Без идентификатора заводится новая товарная единица
    id: Optional["UUID"]
    usage: "StockProductUOMUsage"
    #: Требует единицы измерения с целой точностью
    creates_handling_units: bool
    #: Переменная мера: приход складывает количество из фактических мер конкретных единиц, цена за базовую единицу; расход в такой единице невозможен. Требует creates_handling_units
    variable_measure: bool
    #: Положительное число (точка или запятая) или пусто: количество строки в этой единице обязано быть кратно шагу
    qty_step: str
    #: Положительное число (точка или запятая) или пусто. Требует creates_handling_units
    remnant_threshold: str
    is_default_receipt: bool
    #: По умолчанию единица активна
    is_active: Optional[bool]

class StockProductUOMPage(TypedDict):
    count: int
    results: List["StockProductUOM"]

StockProductUOMUsage = Literal['purchase', 'receipt', 'packaging', 'consumption', 'sale']

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

class _StockReceiptClaimBalanceRequired(TypedDict):
    document_id: "UUID"
    #: Незакрытый остаток претензии в расчётах.
    open_amount: str

class StockReceiptClaimBalance(_StockReceiptClaimBalanceRequired, total=False):
    #: Валюта претензии; пусто — валюта учёта.
    currency: str
    #: Претензия с налогом — движение расчётов самой приёмки; есть только у проведённой.
    claimed_amount: str

class _StockReceiptCorrectionCreateRequired(TypedDict):
    basis_id: "UUID"
    supplier_document: "StockReceiptCorrectionCreateSupplierDocument"
    #: Изменение с налогом в валюте приёмки, без знака
    amount: str

class StockReceiptCorrectionCreate(_StockReceiptCorrectionCreateRequired, total=False):
    """Тело черновика корректировки приёмки по УКД поставщика на уменьшение или увеличение."""

    #: Уменьшение (по умолчанию) или увеличение стоимости
    direction: Literal['decrease', 'increase']
    #: Пусто или отсутствует означает рабочую дату кабинета
    date: str
    #: Налог изменения в валюте приёмки
    vat: str
    comment: str

class StockReceiptCorrectionCreateSupplierDocument(TypedDict):
    #: Номер УКД поставщика
    number: str
    #: Дата УКД поставщика
    date: str

class StockReorderRule(TypedDict):
    id: "UUID"
    business_id: "UUID"
    business_name: str
    #: null означает правило бизнеса без юрлица
    company_id: Optional["UUID"]
    #: Пустая строка у правила без юрлица
    company_name: str
    product_id: "UUID"
    product_sku: str
    product_name: str
    #: null означает правило на все склады
    warehouse_id: Optional["UUID"]
    warehouse_name: str
    #: Decimal string неснижаемого остатка
    min_qty: str
    #: Decimal string целевого остатка; null — потолок не задан
    max_qty: Optional[str]
    #: Decimal string кратности продажи или закупки; null — кратность не задана
    order_multiple: Optional[str]
    lead_time_days: int
    preferred_supplier_id: Optional["UUID"]
    preferred_supplier_name: str
    is_active: bool
    updated_at: str

class _StockReorderRuleInputRequired(TypedDict):
    #: Складская номенклатура — отдельный товар или вариант; семейство вариантов и услуга не принимаются
    product_id: "UUID"
    #: Decimal string неотрицательного неснижаемого остатка
    min_qty: str

class StockReorderRuleInput(_StockReorderRuleInputRequired, total=False):
    #: Бизнес правила; обязателен без company_id, с company_id выводится от юрлица и обязан с ним совпасть
    business_id: Optional["UUID"]
    #: Пропуск или null заводит правило бизнеса без юрлица
    company_id: Optional["UUID"]
    #: Пропуск или null заводит правило на все склады; правилу без юрлица годится только склад, не закреплённый за юрлицами
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
    business_id: "UUID"
    #: null переносит правило в бизнес без юрлица
    company_id: Optional["UUID"]
    product_id: "UUID"
    warehouse_id: Optional["UUID"]
    #: Decimal string
    min_qty: str
    max_qty: Optional[str]
    order_multiple: Optional[str]
    lead_time_days: int
    preferred_supplier_id: Optional["UUID"]
    is_active: bool

class StockReportExportRequest(TypedDict, total=False):
    """Отбор экрана остатков и его видимые колонки. Имена полей повторяют параметры GET /api/v1/stock/report/stocks: файл обязан содержать то же, что видел человек, и одно имя на два входа защищает от расхождения. Отличается только перенос: список складов идёт массивом, а не строкой через запятую, и дополнительные поля — объектом вместо параметров cf.*. Колонки берутся из перечня; неизвестная колонка — 400, а не молча пропущенная. Опознавательные колонки (бизнес, юрлицо, склад и зона с кодами, товар, SKU, единица) пишутся всегда, и порядок колонок в файле повторяет экран. Выборка обходится постранично целиком; слишком широкая отклоняется как 400 — книга собирается в памяти, и потолок общий с загрузкой."""

    mode: Literal['products', 'warehouses', 'companies']
    q: str
    as_of: str
    business_id: "UUID"
    company_id: "UUID"
    warehouse_id: "UUID"
    warehouse_ids: List["UUID"]
    product_id: "UUID"
    custom_fields: Dict[str, str]
    without_company: bool
    rollup_zones: bool
    below_minimum: bool
    with_reserve: bool
    include_empty: bool
    sort: Literal['name', 'on_hand', 'reserved', 'available', 'expected', 'forecast', 'minimum', 'suggested', 'unit_cost', 'amount']
    direction: Literal['asc', 'desc']
    columns: List[Literal['on_hand', 'reserved', 'available', 'expected', 'forecast', 'minimum', 'suggested', 'unit_cost', 'amount']]

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
    totals: "StockReportTotals"
    #: Суммы по складам всей выборки, без постраничного окна
    warehouse_totals: List["StockReportWarehouseTotal"]
    formula: Literal['available = on_hand - reserved; forecast = available + expected']

class StockReportPurchasingPage(TypedDict):
    #: Общее число строк отбора, а не длина страницы: усечение по limit на нём видно.
    count: int
    limit: int
    offset: int
    results: List["StockReportPurchasingRow"]
    formula: Literal['projected = on_hand - reserved + expected; suggested = max(demand, rule_shortage)']

class StockReportPurchasingRow(TypedDict):
    #: Бизнес строки — учётная единица закупки
    business_id: Dict[str, Any]
    business_name: str
    #: Юрлицо строки — разрез официального контура. У неофициальной потребности его нет, и тогда поле пустое; правило пополнения такой строке не подбирается, потому что ключуется юрлицом (ERP-704).
    company_id: Optional["UUID"]
    company_name: str
    warehouse_id: Optional["UUID"]
    warehouse_code: str
    warehouse_name: str
    #: Склад над зоной (дочерним складом); у склада верхнего уровня пусто. Витрина пишет «склад · зона» (ERP-1522).
    warehouse_parent_name: str
    product_id: "UUID"
    product_sku: str
    product_name: str
    unit: str
    #: Decimal string. Закупочная цена карточки — умолчание цены строки закупки из витрины (ERP-1522); ноль — цены в карточке нет.
    purchase_price: str
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
    #: Decimal string. Максимум из незаказанной потребности и дефицита по правилу пополнения; дефицит считается тем же ядром, что и suggested в /stock/report/stocks.
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
    #: Decimal string в базовой единице товара. Часть остатка строки, не покрытая остатком склада: обещание ждёт поступления. Сумма по строкам равна unbacked_qty резерва; без товара остаются самые новые обещания
    unbacked_qty: str
    #: Действующий состав товара строки; null, если действующего состава у товара нет. Сам резерв состав не использует
    active_spec: Optional["StockReportReservationLineSpec"]

class StockReportReservationLineSpec(TypedDict):
    """Действующая версия состава изделия у товара строки резерва."""

    version_id: "UUID"
    spec_id: "UUID"
    version: int
    name: str
    kind: Literal['assembly', 'production']
    #: Decimal string. Сколько изделия даёт один состав, в базовой единице товара
    output_qty: str

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
    #: Часть остатка резерва, не покрытая остатком склада: списание товар забрало, обещание ждёт поступления. Без товара остаются самые новые обещания
    unbacked_qty: str
    state: Literal['active', 'partially_shipped', 'fulfilled', 'released']
    is_overdue: bool
    lines: List["StockReportReservationLine"]

class StockReportRow(TypedDict):
    #: Измерения, которыми строка опознаётся. Режим сворачивает часть из них, и тогда пустое поле значит «много значений», а не «значения нет»: в «по товарам» юрлица у строки нет потому, что она накрывает их все, а в «по складам» — потому, что остаток неофициальный. По значению эти случаи неразличимы, поэтому разбор строки собирается по этому полю, а не по её пустотам.
    scope: List[Literal['business', 'company', 'warehouse']]
    #: Бизнес остатка — учётная единица строки
    business_id: Dict[str, Any]
    business_name: str
    #: Юрлицо остатка — разрез официального контура. У неофициального товара его нет, и тогда поле пустое (ERP-704).
    company_id: Optional["UUID"]
    company_name: str
    #: Склад строки. Пусто в режимах, где он свёрнут: «по товарам» и «по юрлицам» его в разрезе нет вовсе, и нулевой идентификатор соврал бы — это значение конкретного склада.
    warehouse_id: Optional["UUID"]
    warehouse_code: str
    warehouse_name: str
    product_id: "UUID"
    product_sku: str
    product_name: str
    #: Категория товара — заголовок группы строк, а не измерение разреза: в scope её нет, по ней ничего не сворачивается и не суммируется. Пусто, если категория у карточки не задана.
    category_id: Optional["UUID"]
    category_name: str
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
    #: Decimal string. В свёрнутых режимах — сумма минимумов разрезов «юрлицо × склад», из которых сложена строка.
    minimum: str
    #: Decimal string. Только правило пополнения: ноль, пока прогноз не ниже минимума или правила нет, иначе добор до максимума с округлением вверх по кратности. Нехватка считается в разрезе «юрлицо × склад» (со свёрткой зон) против прогноза того же разреза; свёрнутая строка products, companies и matrix складывает нехватки своих разрезов, и остаток без правила, остаток без юрлица и излишек другого разреза её не гасят — итог одинаков во всех режимах. Незаказанная потребность сюда не входит — она есть только в /stock/report/purchasing.
    suggested: str
    #: Decimal string
    amount: str
    #: Decimal string. Пусто в режимах matrix и products без company_id и without_company: строка складывает партии разных владельцев, и среднее по ним не лежит ни на одном складе. Сортировка по unit_cost там идёт по имени.
    unit_cost: str
    entry_count: int

class StockReportTotals(TypedDict):
    """Итог по всей выборке отчёта, а не по странице. Количества, включая минимум, имеют смысл только при одной единице измерения на всю выборку — её называет поле unit. Себестоимости единицы здесь нет вовсе: сумма средних цен не значит ничего ни при какой однородности."""

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
    #: Decimal string. Деньги аддитивны всегда и от единицы измерения не зависят
    amount: str
    #: Единица измерения итога, если она одна на всю выборку. Пусто, когда единицы разные: складывать штуки с килограммами нельзя, и потребитель обязан показать прочерк вместо суммы.
    unit: str

class StockReportWarehouseTotal(TypedDict):
    """Сумма по складу под тем же отбором, что и страница отчёта. Дерево складов показывает эти числа рядом с именами узлов; считать их отдельным запросом нельзя — он не знал бы про отборы экрана и расходился бы с таблицей."""

    warehouse_id: "UUID"
    #: Decimal string
    on_hand: str
    #: Decimal string
    amount: str

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
    #: Перемещение зарезервированного: везти резерв на склад-получатель вместо отказа
    transfer_carries_reservation: bool
    #: Кабинет работает с заявками на закупку (ERP-1523). Выключено — новая заявка не заводится, открытые учитываются до закрытия. Пока владелец не выбирал, следует факту: включено, если заявки в кабинете уже заводили
    purchase_requests_enabled: bool
    default_reservation_days: int
    updated_at: str

class StockSettingsPatch(TypedDict, total=False):
    block_shipment_over_free: bool
    block_reservation_over_available: bool
    auto_cancel_expired_reservations: bool
    transfer_carries_reservation: bool
    purchase_requests_enabled: bool
    default_reservation_days: int

class StockSupplier(TypedDict):
    id: "UUID"
    name: str
    kind: "CoreContactKind"
    is_active: bool

class StockSupplierPage(TypedDict):
    count: int
    results: List["StockSupplier"]

StockUploadFinishResult = TypedDict("StockUploadFinishResult", {"session": "TransferSession", "import": "StockImportRun"}, total=False)

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
    #: Внутри склада работают зоны — приход разрешён только в подчинённую зону
    zones_enabled: bool
    #: На самом зональном складе ещё лежит остаток, оставшийся с момента включения зон
    needs_allocation: bool
    #: documents — приход обычными складскими документами; external_receipt — склад внешней стороны: приход даёт только её приёмка, поступление и входящее перемещение запрещены
    inbound_mode: Literal['documents', 'external_receipt']
    #: Бизнес склада: по нему склад и его данные сужаются областью доступа участника. null — общий склад: юрлица из нескольких бизнесов либо склад всего кабинета (например, склад площадки)
    business_id: Optional["UUID"]
    #: Пустой список означает доступность склада всем активным юрлицам кабинета
    company_ids: List["UUID"]
    created_at: str
    updated_at: str

class _StockWarehouseInputRequired(TypedDict):
    #: Приводится к верхнему регистру
    code: str
    name: str

class StockWarehouseInput(_StockWarehouseInputRequired, total=False):
    parent_id: Optional["UUID"]
    address: Dict[str, Any]
    responsible_employee_id: Optional["UUID"]
    sort_order: int
    #: Бизнес склада. Пусто — выводится: у зоны от родителя, у склада с юрлицами одного бизнеса — их бизнес, в кабинете с одним бизнесом — он; юрлица нескольких бизнесов дают общий склад. Юрлица склада обязаны принадлежать названному бизнесу
    business_id: Optional["UUID"]
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
    #: Бизнес склада; null — вывести заново из родителя и юрлиц. Править склад можно только в бизнесе, доступном целиком; общий склад — только при доступе ко всем бизнесам
    business_id: Optional["UUID"]
    company_ids: List["UUID"]

class StockWarehouseZoneInput(TypedDict):
    #: Название зоны; код зоны присваивает сервер
    name: str

class _StockZoneAllocationRequired(TypedDict):
    warehouse_id: "UUID"
    zones_enabled: bool
    direction: Literal['to_zones', 'to_warehouse']
    zones: List["StockWarehouse"]
    rows: List["StockZoneStockRow"]

class StockZoneAllocation(_StockZoneAllocationRequired, total=False):
    #: Незавершённая матрица разнесения; у обратного переноса всегда null, потому что выключение атомарно
    draft: Optional["StockZoneAllocationInput"]

class _StockZoneAllocationInputRequired(TypedDict):
    lines: List["StockZoneAllocationLine"]

class StockZoneAllocationInput(_StockZoneAllocationInputRequired, total=False):
    #: Пусто — бизнес-дата кабинета
    date: str

class _StockZoneAllocationLineRequired(TypedDict):
    product_id: "UUID"
    zone_id: "UUID"
    quantity: str

class StockZoneAllocationLine(_StockZoneAllocationLineRequired, total=False):
    """Клетка матрицы. Для остатка без юрлица business_id обязателен; для остатка юрлица сервер выводит бизнес из юрлица, если он не передан."""

    business_id: "UUID"
    #: Пусто или null — остаток без юрлица
    company_id: Optional["UUID"]

class StockZoneAllocationResult(TypedDict):
    warehouse: "StockWarehouse"
    #: Проведённые перемещения — по одному на сочетание «бизнес, юрлицо или его отсутствие, зона»
    documents: List["CoreDocument"]
    #: Остаток, который после разнесения всё ещё ждёт на складе
    remaining: List["StockZoneStockRow"]

class StockZoneStockRow(TypedDict):
    """Строка остатка склада или зоны. Ключ строки — бизнес и необязательное юрлицо; остаток без юрлица приходит отдельной строкой на каждый бизнес."""

    warehouse_id: "UUID"
    business_id: "UUID"
    #: null — остаток без юрлица
    company_id: Optional["UUID"]
    product_id: "UUID"
    #: Точное decimal-количество строкой
    quantity: str

class Subtask(TypedDict):
    id: "UUID"
    identifier: str
    title: str
    status_category: Optional[str]
    executor: Optional[int]
    executor_name: Optional[str]
    due_at: Optional[str]

class SupplierDocument(TypedDict, total=False):
    """Номер и дата документа поставщика (ERP-484, подшаг 5.3): по ним входящий НДС сверяется с книгой покупок. Оба поля необязательны"""

    number: str
    date: str

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
    milestone: Optional["UUID"]
    milestone_name: Optional[str]
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
    #: Пунктов во всех чек-листах задачи (ERP-1488); есть и в компактной строке списка.
    checklist_total: int
    #: Отмеченных пунктов во всех чек-листах задачи.
    checklist_done: int
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
    #: Веха: UUID или имя этапа своего проекта задач
    milestone: str
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
    #: Веха: UUID или имя этапа; пустая строка снимает задачу с вехи
    milestone: str
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

class TeamFlowTotals(TypedDict):
    taken: int
    handed: int
    closed: int

class TeamMemberMetrics(TypedDict):
    user: int
    name: str
    taken: int
    handed: int
    closed: int
    done_of_taken: int
    handed_with_due: int
    handed_on_time: int
    efficiency: Optional[int]
    in_work: int
    review: int
    review_oldest_seconds: int
    overdue: int
    overdue_in_review: int
    backlog: int
    cycle_median_seconds: int
    rework_percent: float
    buckets: List["TeamMetricsBucket"]

class TeamMetrics(TypedDict):
    project: "UUID"
    period: Literal['week', 'month', 'quarter', 'all']
    window_from: str
    window_to: str
    bucket_days: int
    taken: int
    handed: int
    closed: int
    previous: Optional["TeamFlowTotals"]
    review: int
    review_median_seconds: int
    review_stale: int
    overdue: int
    backlog: int
    in_work: int
    cycle_median_seconds: int
    buckets: List["TeamMetricsBucket"]
    members: List["TeamMemberMetrics"]
    unassigned: "TeamMetricsUnassigned"

class TeamMetricsUnassigned(TypedDict):
    open: int
    overdue: int

class TeamMetricsBucket(TypedDict):
    start: str
    taken: int
    handed: int
    handed_late: int
    closed: int

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

class _TransferDownloadLinkRequired(TypedDict):
    url: str
    method: Literal['GET']
    #: true — подписанный адрес хранилища, без заголовка авторизации; false — адрес этого API, с авторизацией
    direct: bool
    #: true — адрес требует токен API, агенту по MCP он недоступен
    requires_authorization: bool
    name: str
    mime_type: str
    size_bytes: int

class TransferDownloadLink(_TransferDownloadLinkRequired, total=False):
    """Временный адрес файла: подписанный адрес хранилища или адрес этого API."""

    #: Срок подписанного адреса; у адреса API его нет
    expires_at: str
    #: Вердикт антивируса; skipped — файл антивирус не проверял
    scan_status: Literal['clean', 'skipped']
    #: Что стало с просьбой о факсимиле у печатной формы
    facsimile: Literal['applied', 'not_allowed']

class _TransferInstructionsRequired(TypedDict):
    #: post — один multipart POST; parts — PUT каждой части; api — PUT через этот API с авторизацией
    mode: Literal['post', 'parts', 'api']
    #: true — адрес требует токен API, агенту по MCP этот путь недоступен
    requires_authorization: bool
    max_bytes: int
    expires_at: str

class TransferInstructions(_TransferInstructionsRequired, total=False):
    """Как передать байты. Выдаётся один раз, при открытии сессии."""

    url: str
    method: str
    #: Поля формы для POST; файл идёт после них последним полем
    fields: Dict[str, str]
    #: Имя поля формы для файла
    file_field: str
    headers: Dict[str, str]
    part_bytes: int
    part_count: int
    #: Подписанный адрес каждой части по её номеру, начиная с 1
    direct_urls: Dict[str, str]

class _TransferSessionRequired(TypedDict):
    id: "UUID"
    owner_type: str
    name: str
    mime_type: str
    size_bytes: int
    status: Literal['pending', 'processing', 'attached', 'failed', 'expired']
    expires_at: str
    created_at: str

class TransferSession(_TransferSessionRequired, total=False):
    """Сессия загрузки файла по подписанному адресу хранилища. Ключи хранилища наружу не отдаются."""

    owner_id: str
    sha256: str
    attributes: Dict[str, str]
    failure: Literal['infected', 'size', 'checksum', 'storage', 'owner', 'aborted', 'expired']
    failure_detail: str
    scan_status: Literal['pending', 'clean', 'infected', 'skipped']
    scan_verdict: str
    #: Номер строки, заведённой по файлу; у почты — id загрузки для upload_ids
    published_ref: str
    completed_at: str
    upload: "TransferInstructions"

class _TransferUploadRequestRequired(TypedDict):
    #: Имя файла с расширением
    name: str
    #: Точный размер файла в байтах
    size_bytes: int

class TransferUploadRequest(_TransferUploadRequestRequired, total=False):
    """Заявка на сессию загрузки файла по подписанному адресу."""

    #: Тип содержимого; по умолчанию application/octet-stream
    mime_type: str
    #: Необязательная контрольная сумма SHA-256 строчными шестнадцатеричными знаками
    sha256: str

UUID = str

class WorkflowStatusUpdate(TypedDict, total=False):
    name: str
    category: "StatusCategory"
    color: str
    order: int
    is_default: bool
    is_final: bool

class _AppDocflowRecordSalePaymentRequestRequired(TypedDict):
    provider: str
    external_id: str
    amount: str

class AppDocflowRecordSalePaymentRequest(_AppDocflowRecordSalePaymentRequestRequired, total=False):
    kind: Literal['payment', 'refund']
    currency: str
    paid_at: str

class AssistantListDigestsResponse(TypedDict):
    items: List["AssistantDigest"]

class _AssistantReplaceDigestRequestRequired(TypedDict):
    name: str
    metric_ids: List[str]
    period: Literal['this_month', 'previous_month', 'last_30_days']
    schedule_hour: int
    schedule_minute: int
    timezone: str
    weekdays_only: bool
    locale: Literal['ru-RU', 'en-US']
    enabled: bool
    version: int

class AssistantReplaceDigestRequest(_AssistantReplaceDigestRequestRequired, total=False):
    company: "UUID"
    project: "UUID"

class AutomationRulesResponse(TypedDict):
    rules: List["AutomationRuleDocument"]

class _AutomationRuleSimulateResponseRequired(TypedDict):
    result: "AutomationRuleSimulation"

class AutomationRuleSimulateResponse(_AutomationRuleSimulateResponseRequired, total=False):
    problem: "AutomationRuleProblem"

class _AutomationRuleTestResponseRequired(TypedDict):
    result: "AutomationRuleTestResult"

class AutomationRuleTestResponse(_AutomationRuleTestResponseRequired, total=False):
    problem: "AutomationRuleProblem"

class _BankRepostTransactionsRequestRequired(TypedDict):
    ids: List["UUID"]

class BankRepostTransactionsRequest(_BankRepostTransactionsRequestRequired, total=False):
    confirm_release: bool

class BankRepostTransactionRequest(TypedDict, total=False):
    confirm_release: bool

class CoreListBusinessesResponse(TypedDict):
    results: List["CoreBusiness"]

class CoreSetBusinessActiveRequest(TypedDict):
    active: bool

class CoreListBusinessOwnershipResponse(TypedDict):
    results: List["CoreOwnershipVersion"]

class DashboardListMetricsResponse(TypedDict):
    count: int
    results: List["DashboardMetricDefinition"]

class DocflowFlowContactStatsResponse(TypedDict):
    items: List["DocflowFlowContactStatsResponseItemsItem"]

class DocflowFlowContactStatsResponseItemsItem(TypedDict):
    contact_id: "UUID"
    documents: int
    #: Дата последнего документа, YYYY-MM-DD; пусто — без даты
    last_date: str

class DocflowFlowDocumentRevisionsResponse(TypedDict):
    items: List["DocflowFlowDocumentRevisionsResponseItemsItem"]

class _DocflowFlowDocumentRevisionsResponseItemsItemRequired(TypedDict):
    version: int
    created_at: str
    author_id: int
    status: Literal['draft', 'registered', 'archived']
    files: int
    has_approval: bool

class DocflowFlowDocumentRevisionsResponseItemsItem(_DocflowFlowDocumentRevisionsResponseItemsItemRequired, total=False):
    author_name: str
    #: Причина системной ревизии: schedule:<вид бумаги>:<registered|cancelled>:<номер>:<дата> — график договора пересчитан по допсоглашению или спецификации
    reason: str
    #: Ревизию записала система, а не человек правкой карточки
    system: bool

class _FilesContentLinkResponseRequired(TypedDict):
    url: str
    #: true — адрес ведёт прямо в хранилище; false — на этот API, с заголовком авторизации
    direct: bool
    name: str
    mime_type: str

class FilesContentLinkResponse(_FilesContentLinkResponseRequired, total=False):
    expires_at: str
    size_bytes: int
    version_id: "UUID"
    #: Номер версии, содержимое которой адресуется
    version_no: int

class FilesListVersionsResponse(TypedDict):
    versions: List["FilesVersion"]

class FilesListRootsResponse(TypedDict):
    roots: List["FilesFolder"]

class FilesSearchResponse(TypedDict):
    results: List["FilesSearchHit"]

class FilesCreateShortcutRequest(TypedDict):
    folder_id: "UUID"
    name: str
    url: str

class _FilesVersionContentLinkResponseRequired(TypedDict):
    url: str
    #: true — адрес ведёт прямо в хранилище; false — на этот API, с заголовком авторизации
    direct: bool
    name: str
    mime_type: str
    version_id: "UUID"
    version_no: int

class FilesVersionContentLinkResponse(_FilesVersionContentLinkResponseRequired, total=False):
    expires_at: str
    size_bytes: int

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

class FinanceListAllocationRulesResponse(TypedDict, total=False):
    results: List["FinanceAllocationRule"]

class _FinanceRepostTransactionsRequestRequired(TypedDict):
    ids: List["UUID"]

class FinanceRepostTransactionsRequest(_FinanceRepostTransactionsRequestRequired, total=False):
    confirm_release: bool

class FinanceMarkTransactionDeletedRequest(TypedDict, total=False):
    #: Согласие снять аванс и зачёты операции
    confirm_release: bool

class FinanceRepostTransactionRequest(TypedDict, total=False):
    confirm_release: bool

class MailListAccountsResponse(TypedDict):
    items: List["MailAccount"]

class MailListFoldersResponse(TypedDict):
    items: List["MailFolder"]

class MailComposeMessageResponse(TypedDict):
    message: "MailMessage"
    outbound: "MailOutbound"

class MailListRulesResponse(TypedDict):
    items: List["MailRule"]

class MailApplyRulesRequest(TypedDict, total=False):
    #: Папка разбора; без неё разбираются «Входящие»
    folder_id: Optional["UUID"]
    #: Сколько писем взять в разбор; ноль и меньше означает умолчание
    limit: int

class MailApplyRulesResponse(TypedDict):
    items: List["MailRuleOutcome"]
    #: Сколько писем правила разобрали
    applied: int

class MailAttachStoredFileRequest(TypedDict):
    #: Файл в хранилище кабинета
    file_id: str

class MailReadBatchRequest(TypedDict, total=False):
    ids: List["UUID"]
    folder_id: "UUID"
    read: bool

class MailReadBatchResponse(TypedDict):
    updated: int

class MailListMessageAttachmentsResponse(TypedDict):
    items: List["MailAttachment"]

class MailFlagMessageRequest(TypedDict, total=False):
    #: Значение false снимает отметку важности
    flagged: bool

class MailMoveMessageRequest(TypedDict):
    folder_id: "UUID"

class MailListPeopleResponse(TypedDict):
    items: List["MailPerson"]

class _MailListProvidersResponseRequired(TypedDict):
    items: List["MailProvider"]

class MailListProvidersResponse(_MailListProvidersResponseRequired, total=False):
    suggestion: "MailProvider"

class MailListVIPSendersResponse(TypedDict):
    items: List["MailListVIPSendersResponseItemsItem"]

class MailListVIPSendersResponseItemsItem(TypedDict):
    address: str

class _MailSetVIPSenderRequestRequired(TypedDict):
    address: str

class MailSetVIPSenderRequest(_MailSetVIPSenderRequestRequired, total=False):
    important: bool

class MailCountVIPUnreadResponse(TypedDict):
    unread: int

class StockListDocumentAuthorsResponse(TypedDict):
    count: int
    results: List["StockListDocumentAuthorsResponseResultsItem"]

class StockListDocumentAuthorsResponseResultsItem(TypedDict):
    id: int
    name: str
