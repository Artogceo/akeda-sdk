// Панель на карточке товара: один ответ и то, что его объясняет.
//
// Панель показывает КЛАСС и цифры, из которых он получился. Кнопок,
// меняющих что-либо, здесь нет: расширение только читает, и панель, у которой
// нечего нажать, — это не недоделка, а обещание, выполненное в коде.

const state = document.getElementById("state");
const root = document.getElementById("root");

// Догадка о языке до запуска: она влияет только на слово «Считаю…», которое
// человек видит доли секунды. Настоящий язык приезжает контекстом запуска.
setLocale((navigator.language || "ru").toLowerCase().startsWith("en") ? "en" : "ru");
state.textContent = t("loading");

AkedaSlot.start(
  "panel",
  async () => {
    state.textContent = t("loading");
    const data = await AkedaSlot.api("/api/panel");
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
  const card = el("div", "card");

  const head = el("div", "head");
  const title = el("div");
  title.appendChild(el("h1", null, data.product.name || data.product.sku || "—"));
  const identity = [data.product.sku, data.product.unit].filter(Boolean).join(" · ");
  title.appendChild(el("p", "sub", identity));
  head.appendChild(title);
  head.appendChild(verdict(data));
  card.appendChild(head);

  if (data.dormant) {
    // Неподвижность — отдельное утверждение, а не оттенок класса C: товар
    // класса A, не отгружавшийся квартал, — это событие, и в цифрах доли оно
    // не видно.
    const alarm = el("p");
    alarm.appendChild(el("span", "badge alarm", t("dormant", { days: data.dead_days })));
    card.appendChild(alarm);
  }

  if (data.known) {
    card.appendChild(stats(data));
    card.appendChild(shareBar(data));
  } else {
    card.appendChild(el("p", "sub", t("no_movement_hint")));
    card.appendChild(stats(data));
  }

  card.appendChild(footer(data));
  root.appendChild(card);
}

function verdict(data) {
  if (!data.known) {
    const box = el("div");
    box.appendChild(el("span", "badge", t("no_movement")));
    return box;
  }
  const box = el("div", "verdict");
  box.appendChild(el("span", "abc-" + data.abc, data.abc));
  // Класса XYZ может не быть: ряд короче объявленного минимума периодов, и
  // буква, поставленная по двум месяцам, означала бы суждение, которого нет.
  box.appendChild(el("span", "xyz", data.xyz || "·"));
  return box;
}

function stats(data) {
  const grid = el("dl", "stats");
  const unit = data.product.unit || "";

  if (data.known) {
    grid.appendChild(stat(t("stat_share"), number(data.share_percent, 2) + " %"));
    grid.appendChild(stat(t("stat_rank"), number(data.rank, 0), t("of_total", { n: number(data.total_products, 0) })));
    grid.appendChild(stat(t("stat_qty"), number(data.qty_total, 2), unit));
    grid.appendChild(stat(t("stat_per_period"), number(data.qty_per_period, 2), unit));
  }
  grid.appendChild(stat(t("stat_on_hand"), number(data.on_hand, 2), unit));
  grid.appendChild(
    data.days_of_cover === null || data.days_of_cover === undefined
      ? stat(t("stat_cover"), "—", t("stat_cover_forever"))
      : stat(t("stat_cover"), number(data.days_of_cover, 0), t("unit_days")),
  );
  if (data.known && data.xyz) {
    grid.appendChild(stat(t("stat_cv"), number(data.variation_percent, 1) + " %"));
  } else if (data.known) {
    grid.appendChild(stat(t("stat_cv"), "—", t("unknown_class")));
  }
  return grid;
}

function stat(label, value, note) {
  const box = el("div", "stat");
  box.appendChild(el("dt", null, label));
  const line = el("dd", null, value);
  if (note) {
    line.appendChild(document.createTextNode(" "));
    line.appendChild(el("small", null, note));
  }
  box.appendChild(line);
  return box;
}

// shareBar показывает, где товар стоит в накопленной доле: сама доля обычно
// мала, а положение в списке — то, что отличает A от C.
function shareBar(data) {
  const box = el("div", "share");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 6");
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("aria-hidden", "true");

  const track = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  track.setAttribute("class", "track");
  track.setAttribute("x", "0");
  track.setAttribute("y", "0");
  track.setAttribute("width", "100");
  track.setAttribute("height", "6");
  track.setAttribute("rx", "3");
  svg.appendChild(track);

  const filled = Math.max(0, Math.min(100, data.cumulative_percent || 0));
  const fill = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  fill.setAttribute("class", "fill abc-" + data.abc);
  fill.setAttribute("x", "0");
  fill.setAttribute("y", "0");
  fill.setAttribute("width", String(filled));
  fill.setAttribute("height", "6");
  fill.setAttribute("rx", "3");
  svg.appendChild(fill);

  box.appendChild(svg);
  box.appendChild(el("p", "sub", number(data.cumulative_percent, 1) + " % · " + t("panel_hint")));
  return box;
}

function footer(data) {
  const box = el("div", "foot");
  const period = data.window;
  box.appendChild(
    el("p", null, t("window_line", { from: period.from, to: period.to, n: period.periods.length })),
  );
  box.appendChild(
    el(
      "p",
      null,
      data.warehouses && data.warehouses.length
        ? t("warehouses_line", { list: data.warehouses.join(", ") })
        : t("warehouses_all"),
    ),
  );
  const tail = [
    t(data.metric === "qty" ? "metric_qty" : "metric_amount"),
    t("built_at", { time: moment(data.built_at) }),
  ];
  if (!data.dormant && data.last_issue) {
    tail.unshift(t("moving", { date: data.last_issue }));
  }
  box.appendChild(el("p", null, tail.join(" · ")));
  return box;
}
