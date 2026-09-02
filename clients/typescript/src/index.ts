/**
 * Akeda SDK для TypeScript.
 *
 * Что здесь написано руками, а что сгенерировано:
 *   — `generated/` собирает scripts/generate.py из снимка контракта, править
 *     эти файлы нельзя;
 *   — всё остальное написано руками: там, где нужно принять решение, генератор
 *     решать не умеет.
 */

export { AkedaClient, ENVIRONMENTS } from "./client.js";
export type { CallOptions, CallResult, ClientOptions } from "./client.js";
export { apiKey, developerSession, installationToken } from "./credentials.js";
export type { Credentials, CredentialKind } from "./credentials.js";
export { AkedaError, AkedaTransportError, AkedaUsageError } from "./errors.js";
export type { RateLimitState } from "./errors.js";
export { collect, paginate } from "./pagination.js";
export type { PaginateOptions } from "./pagination.js";
export {
  DEFAULT_WINDOW_MS,
  HEADERS,
  SIGNATURE_VERSION,
  WebhookVerificationError,
  headerReaderFrom,
  parseSignature,
  sign,
  signingBase,
  verifyWebhook,
} from "./webhook.js";
export type { Envelope, ParsedSignature, SignatureFailure, SigningKey, VerifyOptions } from "./webhook.js";
export { operationSpecs } from "./generated/operations.js";
export type { OperationId, OperationSpec, OperationTypes } from "./generated/operations.js";
export type * as models from "./generated/models.js";
