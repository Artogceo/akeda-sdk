// Страница настройки установки.
//
// ── ПОЧЕМУ ЗДЕСЬ НЕТ ПОЛЕЙ ВВОДА ────────────────────────────────────────────
//
// Настройку установки вводит КАБИНЕТ в Akeda. Внешний контур приложения умеет
// её только читать, и записи в нём нет вовсе — иначе приложение могло бы
// переставить порог, по которому кабинет думает, что оно считает.
//
// Поэтому страница отвечает на другие вопросы, и они не менее нужные: что
// сейчас применено, что из введённого не разобралось и почему, какие склады
// нашлись по кодам, какое окно получилось и что вышло на этих порогах. Форма
// ввода, которая при нажатии «Сохранить» ничего не сохранила бы, была бы хуже
// её отсутствия.

const state = document.getElementById("state");
const root = document.getElementById("root");

setLocale((navigator.language || "ru").toLowerCase().startsWith("en") ? "en" : "ru");
state.textContent = t("loading");

AkedaSlot.start(
  "settings",
  async () => {
    state.textContent = t("loading");
    const data = await AkedaSlot.api("/api/settings");
    state.hidden = true;
    root.hidden = false;
    draw(data);
  },
  (payload) => {
    root.hidden = true;
    showFail(state, payload);
  },
).catch((error) => {
  root.hidden = true;
  showFail(state, (error && error.payload) || { code: "network" });
});

function draw(data) {
  root.textContent = "";
  root.appendChild(intro());
  const notes = issues(data);
  if (notes) root.appendChild(notes);
  root.appendChild(thresholds(data));
  root.appendChild(windowCard(data));
  root.appendChild(warehouses(data));
  root.appendChild(matrix(data));
}

function intro() {
  const card = el("div", "card");
  card.appendChild(el("h1", null, t("settings_title")));
  card.appendChild(el("p", "sub", t("settings_read_only")));
  return card;
}

function issues(data) {
  const list = el("ul", "notes");
  let count = 0;

  if (data.missing && data.missing.length) {
    list.appendChild(el("li", null, t("missing_config", { keys: data.missing.join(", ") })));
    count++;
  }
  for (const issue of data.issues || []) {
    // Замечание собирается из ключа поля и кода причины: текст живёт в
    // словаре страницы, а не приезжает с сервера, потому что язык человека
    // известен здесь, а не там.
    const label = t("field_" + issue.key);
    const reason = t("issue_" + issue.code, { raw: issue.raw });
    const line = el("li");
    line.appendChild(el("strong", null, label + ": "));
    line.appendChild(document.createTextNode(reason));
    list.appendChild(line);
    count++;
  }
  if (count === 0) return null;

  const card = el("div", "card");
  card.appendChild(el("h2", null, t("sec_issues")));
  card.appendChild(list);
  return card;
}

function thresholds(data) {
  const settings = data.settings;
  const values = data.thresholds;
  const rows = [
    ["period_months", String(settings.period_months), "6"],
    [
      "metric",
      t(settings.metric === "qty" ? "metric_value_qty" : "metric_value_amount"),
      t("metric_value_amount"),
    ],
    ["abc_a_percent", number(values.abc_a_percent, 2) + " %", "80 %"],
    ["abc_b_percent", number(values.abc_b_percent, 2) + " %", "15 %"],
    ["xyz_x_max_percent", number(values.xyz_x_max_percent, 2) + " %", "10 %"],
    ["xyz_y_max_percent", number(values.xyz_y_max_percent, 2) + " %", "25 %"],
    ["min_periods", String(values.min_periods), "3"],
    ["dead_days", String(settings.dead_days), "90"],
    [
      "warehouse_codes",
      (settings.warehouse_codes || []).length ? settings.warehouse_codes.join(", ") : "—",
      "—",
    ],
  ];

  const card = el("div", "card");
  card.appendChild(el("h2", null, t("sec_thresholds")));
  const table = el("table");
  const head = el("tr");
  head.appendChild(el("th", null, t("col_setting")));
  head.appendChild(el("th", "num", t("col_value")));
  head.appendChild(el("th", "num", t("col_default")));
  table.appendChild(el("thead")).appendChild(head);

  const body = el("tbody");
  for (const [key, value, fallback] of rows) {
    const line = el("tr");
    line.appendChild(el("td", "key", t("field_" + key)));
    line.appendChild(el("td", "num", value));
    line.appendChild(el("td", "num sub", fallback));
    body.appendChild(line);
  }
  table.appendChild(body);
  card.appendChild(table);
  return card;
}

function windowCard(data) {
  const card = el("div", "card");
  card.appendChild(el("h2", null, t("sec_window")));
  card.appendChild(
    el(
      "p",
      null,
      t("window_line", {
        from: data.window.from,
        to: data.window.to,
        n: data.window.periods.length,
      }),
    ),
  );
  card.appendChild(el("p", "sub", data.window.periods.join(" · ")));
  card.appendChild(el("p", "sub", t("window_explain")));
  return card;
}

function warehouses(data) {
  const card = el("div", "card");
  card.appendChild(el("h2", null, t("sec_warehouses")));

  const selected = new Set((data.warehouses.selected || []).map((item) => item.id));
  if (selected.size === 0) {
    card.appendChild(el("p", "sub", t("warehouses_all_note")));
  }
  if ((data.warehouses.unknown || []).length) {
    const alarm = el("ul", "notes");
    alarm.appendChild(el("li", null, t("warehouses_unknown", { codes: data.warehouses.unknown.join(", ") })));
    card.appendChild(alarm);
  }

  const table = el("table");
  const head = el("tr");
  head.appendChild(el("th", null, t("col_code")));
  head.appendChild(el("th", null, t("col_name")));
  head.appendChild(el("th", "num", t("col_state")));
  table.appendChild(el("thead")).appendChild(head);

  const body = el("tbody");
  for (const warehouse of data.warehouses.all || []) {
    const line = el("tr");
    line.appendChild(el("td", "code", warehouse.code));
    const name = el("td", null, warehouse.name);
    if (selected.size > 0 && selected.has(warehouse.id)) {
      name.appendChild(document.createTextNode(" "));
      name.appendChild(el("span", "badge", "✓"));
    }
    line.appendChild(name);
    line.appendChild(el("td", "num sub", warehouse.is_active ? t("wh_active") : t("wh_inactive")));
    body.appendChild(line);
  }
  table.appendChild(body);
  card.appendChild(table);
  return card;
}

// matrix — та самая таблица, ради которой анализ и делают: сколько товаров в
// каждой клетке ABC × XYZ.
function matrix(data) {
  const card = el("div", "card");
  card.appendChild(el("h2", null, t("sec_matrix")));

  const distribution = data.distribution || { cells: {}, total: 0 };
  if (!distribution.total) {
    card.appendChild(el("p", "sub", t("matrix_empty")));
    return card;
  }

  const columns = ["X", "Y", "Z", ""];
  const table = el("table", "matrix");
  const head = el("tr");
  head.appendChild(el("th", "corner", ""));
  for (const column of columns) {
    head.appendChild(el("th", "num", column || t("matrix_none")));
  }
  head.appendChild(el("th", "num", "Σ"));
  table.appendChild(el("thead")).appendChild(head);

  const body = el("tbody");
  for (const row of ["A", "B", "C"]) {
    const line = el("tr");
    line.appendChild(el("th", null, row));
    for (const column of columns) {
      const count = distribution.cells[row + column] || 0;
      line.appendChild(el("td", count ? "cell" : "cell zero", count));
    }
    line.appendChild(el("td", "num", distribution.by_abc[row] || 0));
    body.appendChild(line);
  }
  table.appendChild(body);
  card.appendChild(table);
  card.appendChild(el("p", "foot", t("matrix_total", { n: number(distribution.total, 0) })));
  card.appendChild(el("p", "foot", t("built_at", { time: moment(data.built_at) })));
  return card;
}
