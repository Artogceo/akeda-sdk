// Мост со страницей Akeda.
//
// ── ПОРЯДОК, КОТОРЫЙ НЕЛЬЗЯ ПЕРЕСТАВИТЬ ─────────────────────────────────────
//
//  1. Читаем свои настройки (/api/boot): какие источники считать оболочкой.
//     Без этого шага нам некуда слать сообщение и не с чем сверять входящее, а
//     postMessage в "*" отправил бы значение туда, куда рамку успели увести.
//  2. Ставим слушателя. ДО отправки ready: оболочка отвечает сразу, и ответ,
//     пришедший раньше слушателя, теряется молча.
//  3. Придумываем nonce и шлём akeda.slot.ready.
//  4. Ждём akeda.slot.launch с тем же nonce и одноразовым токеном.
//  5. Отдаём пару своему серверу. Он гасит токен у Akeda и заводит сеанс.
//
// Nonce придумывает СТРАНИЦА. Его работа — отличить ответ на свой запрос от
// чужого сообщения, посланного извне: проверка источника доказывает, КТО
// прислал, но не то, что прислано в ответ.
//
// Токена в адресе рамки нет: адрес попадает в журналы сервера, в историю
// браузера и в Referer, а сообщение моста не попадает никуда.

const MESSAGE = {
  ready: "akeda.slot.ready",
  resize: "akeda.slot.resize",
  close: "akeda.slot.close",
  launch: "akeda.slot.launch",
  theme: "akeda.slot.theme",
};

// LAUNCH_TIMEOUT_MS — сколько ждём контекст, прежде чем сказать человеку, что
// его нет. Оболочка ждёт ready пятнадцать секунд; ждать дольше означает
// показывать «считаю…» там, где считать нечего.
const LAUNCH_TIMEOUT_MS = 20000;

function makeNonce() {
  // Форма из контракта: [A-Za-z0-9_-]{16,128}. Двадцать четыре случайных байта
  // дают тридцать два знака base64url — с запасом внутри границ.
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme === "dark" ? "dark" : "light";
}

// AkedaSlot — то, чем пользуются страницы.
const AkedaSlot = {
  origins: [],
  session: "",

  // start проводит страницу через запуск и зовёт render с данными.
  async start(page, render, onFail) {
    try {
      const boot = await fetch("/api/boot", { headers: { Accept: "application/json" } });
      if (!boot.ok) throw new Error("boot");
      this.origins = (await boot.json()).origins || [];
    } catch (error) {
      onFail({ code: "boot" });
      return;
    }
    if (this.origins.length === 0) {
      onFail({ code: "boot" });
      return;
    }

    const nonce = makeNonce();
    const context = await this.handshake(page, nonce, onFail);
    if (!context) return;

    setLocale(context.locale);
    applyTheme(context.theme);
    this.session = context.session;
    this.watchTheme();
    await render(context);
    this.reportHeight();
    this.watchHeight();
  },

  // handshake ждёт launch и меняет его на сеанс.
  handshake(page, nonce, onFail) {
    return new Promise((resolve) => {
      let done = false;

      const finish = (value) => {
        if (done) return;
        done = true;
        window.removeEventListener("message", onMessage);
        clearTimeout(timer);
        resolve(value);
      };

      const onMessage = async (event) => {
        // Порядок проверок не переставляется: сначала ОКНО, потом источник.
        // Оболочка Akeda — это window.parent; сообщение из любого другого окна
        // (соседняя вкладка того же приложения, расширение браузера, виджет)
        // прошло бы проверку источника и заговорило бы за неё.
        if (event.source !== window.parent) return;
        if (!AkedaSlot.origins.includes(event.origin)) return;
        const body = event.data;
        if (!body || typeof body !== "object") return;
        if (body.type === MESSAGE.theme) {
          applyTheme(body.theme);
          return;
        }
        if (body.type !== MESSAGE.launch) return;
        // Nonce отвечает на вопрос «это ответ на МОЙ запрос»: без него страницу,
        // открытую в другом контексте, можно накормить чужим токеном запуска.
        if (body.nonce !== nonce) return;

        try {
          const response = await fetch("/api/session/" + encodeURIComponent(page), {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ token: body.token, nonce: nonce }),
          });
          const payload = await response.json().catch(() => ({}));
          if (!response.ok) {
            finish(null);
            onFail(payload);
            return;
          }
          finish(payload);
        } catch (error) {
          finish(null);
          onFail({ code: "network" });
        }
      };

      const timer = setTimeout(() => {
        finish(null);
        onFail({ code: "timeout" });
      }, LAUNCH_TIMEOUT_MS);

      window.addEventListener("message", onMessage);
      this.post({ type: MESSAGE.ready, nonce: nonce });
    });
  },

  // post шлёт сообщение оболочке — каждому объявленному источнику поимённо.
  //
  // Списком, а не "*": звёздочка отправила бы значение туда, куда рамка успела
  // уйти сама. Источников обычно один; несколько бывает у контуров.
  post(message) {
    for (const origin of this.origins) {
      try {
        window.parent.postMessage(message, origin);
      } catch (error) {
        // Чужому источнику браузер сообщение просто не доставит. Молчим: это
        // не отказ, а обычная работа списка.
      }
    }
  },

  // watchTheme слушает смену темы кабинета уже после запуска.
  watchTheme() {
    window.addEventListener("message", (event) => {
      if (event.source !== window.parent) return;
      if (!this.origins.includes(event.origin)) return;
      const body = event.data;
      if (body && body.type === MESSAGE.theme) applyTheme(body.theme);
    });
  },

  // reportHeight сообщает оболочке высоту содержимого: сколько его — знает
  // только страница, и без этого сообщения рамка либо обрезана, либо пуста
  // наполовину.
  reportHeight() {
    const height = Math.ceil(document.documentElement.scrollHeight);
    if (height > 0 && height !== this.lastHeight) {
      this.lastHeight = height;
      this.post({ type: MESSAGE.resize, height: height });
    }
  },

  watchHeight() {
    if (typeof ResizeObserver !== "function") return;
    const observer = new ResizeObserver(() => this.reportHeight());
    observer.observe(document.body);
  },

  // api — запрос к своему серверу от имени сеанса.
  async api(path) {
    const response = await fetch(path, {
      headers: { Accept: "application/json", "X-Akeda-Session": this.session },
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(payload.code || "upstream");
      error.payload = payload;
      throw error;
    }
    return payload;
  },
};

// showFail рисует отказ словами человека, а не кодом.
function showFail(node, payload) {
  const codes = {
    no_session: "err_no_session",
    launch_rejected: "err_launch_rejected",
    bad_launch: "err_bad_launch",
    wrong_page: "err_launch_rejected",
    timeout: "err_timeout",
    network: "err_network",
    boot: "err_boot",
    upstream: "err_upstream",
  };
  const key = codes[payload && payload.code] || "err_upstream";
  node.textContent = "";
  node.hidden = false;
  node.className = "state fail";

  const headline = document.createElement("strong");
  headline.textContent = t(key);
  node.appendChild(headline);

  const why = document.createElement("span");
  why.className = "why";
  const parts = [];
  // detail приходит от Akeda и уже написан на языке запроса; идентификатор
  // случая — единственное, что имеет смысл нести в поддержку: причины отказа в
  // теле нет и не будет.
  if (payload && payload.detail) parts.push(payload.detail);
  if (payload && payload.request_id) parts.push(t("case_id", { id: payload.request_id }));
  if (parts.length === 0) parts.push(t("retry_hint"));
  why.textContent = parts.join(" ");
  node.appendChild(why);

  AkedaSlot.reportHeight();
}

// Мелкие помощники разметки. DOM собирается узлами, а не строкой HTML:
// innerHTML с именем товара из чужого кабинета — это ровно тот случай, ради
// которого страница расширения и живёт в отдельной рамке.
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = String(text);
  return node;
}

function number(value, digits) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat(LOCALE === "en" ? "en-US" : "ru-RU", {
    maximumFractionDigits: digits === undefined ? 2 : digits,
  }).format(value);
}

function moment(iso) {
  if (!iso) return "—";
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleString(LOCALE === "en" ? "en-US" : "ru-RU", {
    dateStyle: "short",
    timeStyle: "short",
  });
}
