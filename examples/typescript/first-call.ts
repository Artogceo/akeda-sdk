/**
 * Первый вызов Akeda на TypeScript.
 *
 *   export AKEDA_API_KEY='ak_…'          # Настройки → API-ключи, scope core:read
 *   export AKEDA_TENANT='ваш-кабинет'    # slug КАБИНЕТА, а не юрлица
 *   cd clients/typescript && npm run build
 *   node clients/typescript/dist/../../..  # см. examples/README.md
 *
 * Адрес контура берётся из AKEDA_BASE_URL и по умолчанию боевой: вшитого адреса
 * в SDK нет, потому что контуров больше одного.
 */

import {
  AkedaClient,
  AkedaError,
  AkedaUsageError,
  apiKey,
  collect,
  ENVIRONMENTS,
} from "../../clients/typescript/src/index.js";

const baseUrl = process.env.AKEDA_BASE_URL ?? ENVIRONMENTS.production;

async function main(): Promise<number> {
  const key = process.env.AKEDA_API_KEY;
  if (!key) {
    console.error("нужен AKEDA_API_KEY (значение вида ak_…, приходит один раз при создании ключа)");
    return 2;
  }

  let client: AkedaClient;
  try {
    // Ключ без префикса ak_ Akeda считает НЕПРЕДЪЯВЛЕННЫМ и отвечает 401
    // no_credentials — то есть «заголовка не было». Отказ здесь честнее.
    client = new AkedaClient({
      baseUrl,
      credentials: apiKey(key),
      tenant: process.env.AKEDA_TENANT,
      userAgent: "akeda-quickstart-typescript",
    });
  } catch (error) {
    if (error instanceof AkedaUsageError) {
      console.error(error.message);
      return 2;
    }
    throw error;
  }

  console.log(`контур: ${baseUrl}\n`);

  try {
    // Каталог справочников — операция стадии public: её форма зафиксирована.
    // Листания у неё нет намеренно: это дерево навигации, и клиент, вынужденный
    // листать собственное меню, показать его не может.
    const { data } = await client.call("coreReferenceCatalog");
    console.log(`справочников доступно: ${data.count}`);
    if (data.truncated) {
      console.log("внимание: каталог усечён — справочников в кабинете стало слишком много");
    }
    for (const directory of data.results.slice(0, 10)) {
      console.log(`  ${directory.key.padEnd(28)} ${(directory.reference ?? "").padEnd(24)} модуль ${directory.module}`);
    }

    // Второй вызов: листание. Конец выборки — КОРОТКАЯ страница, а не сравнение
    // с count: count это длина страницы, а не общее число записей.
    console.log();
    const contacts = await collect<{ name?: string }>(client, "coreListContacts", { maxItems: 25 });
    for (const contact of contacts) {
      console.log(`  контрагент: ${contact.name}`);
    }
    console.log(`\nполучено контрагентов: ${contacts.length}`);
  } catch (error) {
    if (error instanceof AkedaError) {
      console.error(`отказ ${error.status} ${error.code ?? ""}: ${error.detail}`);
      if (error.requestId) {
        // Идентификатор случая — единственное, что имеет смысл нести в
        // поддержку: причины отказа в теле нет и не будет.
        console.error(`идентификатор случая: ${error.requestId}`);
      }
      return 1;
    }
    throw error;
  }
  return 0;
}

main().then((code) => process.exit(code));
