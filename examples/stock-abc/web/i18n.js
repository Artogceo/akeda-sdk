// Тексты страниц на двух языках.
//
// Язык приезжает контекстом запуска (ru|en) и не угадывается по браузеру:
// человек выбрал язык интерфейса в Akeda, и панель, показывающая своё на
// другом, читается как непереведённая часть системы, а не как чужое
// приложение.
//
// Оба языка обязательны и лежат рядом: словарь, в котором половина ключей
// только на одном языке, не падает — он показывает ключ вместо слова, и
// замечает это пользователь.

const I18N = {
  ru: {
    loading: "Считаю…",
    retry_hint: "Закройте панель и откройте её заново — токен запуска одноразовый.",

    err_no_session: "Сеанс страницы истёк.",
    err_launch_rejected: "Запуск отвергнут: панель открыта не там, где объявлена.",
    err_bad_launch: "Оболочка прислала запуск в неожиданном виде.",
    err_timeout: "Akeda не прислала контекст запуска.",
    err_network: "Сервер расширения недоступен.",
    err_upstream: "Akeda ответила отказом.",
    err_boot: "Не удалось прочитать настройку страницы.",
    case_id: "Идентификатор случая: {id}",

    panel_hint: "ABC — по величине расхода, XYZ — по ровности расхода",
    no_movement: "За окно расхода не было",
    no_movement_hint: "Класс ABC-XYZ считается по расходу; товар без движения относится к C.",
    unknown_class: "мало периодов",

    stat_share: "Доля расхода",
    stat_rank: "Место в списке",
    stat_qty: "Расход за окно",
    stat_per_period: "В среднем за месяц",
    stat_on_hand: "Остаток",
    stat_cover: "Хватит на",
    stat_cv: "Коэффициент вариации",
    stat_cover_forever: "нет расхода",
    unit_days: "дн.",
    of_total: "из {n}",

    dormant: "Неподвижен {days} дн.",
    moving: "Последний расход {date}",

    metric_amount: "мера ABC — себестоимость расхода",
    metric_qty: "мера ABC — количество расхода",
    metric_value_amount: "себестоимость расхода",
    metric_value_qty: "количество расхода",
    window_line: "Окно: {from} — {to}, {n} мес.",
    warehouses_all: "Склады: все",
    warehouses_line: "Склады: {list}",
    built_at: "Посчитано {time}",

    settings_title: "ABC-XYZ анализ запасов",
    settings_read_only:
      "Значения задаются в Akeda: Настройки → Приложения → это приложение. Расширение их только читает: записи настройки установки внешний контур не имеет вовсе.",
    sec_thresholds: "Как считаем",
    sec_window: "Окно анализа",
    sec_warehouses: "Склады",
    sec_matrix: "Что получилось",
    sec_issues: "Замечания к настройке",
    col_setting: "Настройка",
    col_value: "Значение",
    col_default: "Умолчание",
    window_explain:
      "Окно — целые календарные месяцы, заканчивая прошлым. Незакрытый месяц короче остальных и завысил бы разброс: товар с ровными продажами получал бы Z каждое первое число.",
    warehouses_all_note: "Коды не заданы — считаются все склады кабинета.",
    warehouses_unknown: "Кодов нет в справочнике складов: {codes}",
    col_code: "Код",
    col_name: "Склад",
    col_state: "Состояние",
    wh_active: "работает",
    wh_inactive: "выключен",
    matrix_total: "Товаров с расходом за окно: {n}",
    matrix_empty: "За окно движений не было — считать нечего.",
    matrix_none: "нет класса",
    missing_config: "Не заполнены обязательные поля настройки: {keys}",

    field_period_months: "Период анализа, месяцев",
    field_metric: "Мера ABC",
    field_abc_a_percent: "Порог A, % расхода",
    field_abc_b_percent: "Порог B, % расхода",
    field_xyz_x_max_percent: "Порог X, % вариации",
    field_xyz_y_max_percent: "Порог Y, % вариации",
    field_min_periods: "Минимум периодов для XYZ",
    field_dead_days: "Неподвижен после, дней",
    field_warehouse_codes: "Коды складов",

    issue_not_number: "«{raw}» — не число, взято умолчание.",
    issue_out_of_range: "«{raw}» вне допустимых границ, взято умолчание.",
    issue_unknown_value: "«{raw}» — неизвестное значение, взято умолчание.",
    issue_abc_sum_over_100: "A и B в сумме дают больше ста ({raw}); B урезан до остатка.",
    issue_xyz_bounds_swapped: "Порог X шире порога Y ({raw}); пороги переставлены местами.",
    issue_not_declared: "Значение осталось от прошлой версии приложения и не применяется.",
  },

  en: {
    loading: "Working…",
    retry_hint: "Close the panel and open it again — the launch token is one-time.",

    err_no_session: "The page session has expired.",
    err_launch_rejected: "Launch rejected: the panel was opened somewhere it was not declared.",
    err_bad_launch: "The shell sent a launch in an unexpected shape.",
    err_timeout: "Akeda did not deliver the launch context.",
    err_network: "The extension server is unreachable.",
    err_upstream: "Akeda refused the request.",
    err_boot: "Could not read the page configuration.",
    case_id: "Case id: {id}",

    panel_hint: "ABC ranks by volume of issues, XYZ by how steady they are",
    no_movement: "No issues in the window",
    no_movement_hint: "The class is computed from issues; an item without movement belongs to C.",
    unknown_class: "too few periods",

    stat_share: "Share of issues",
    stat_rank: "Rank",
    stat_qty: "Issued in window",
    stat_per_period: "Average per month",
    stat_on_hand: "On hand",
    stat_cover: "Cover",
    stat_cv: "Coefficient of variation",
    stat_cover_forever: "no issues",
    unit_days: "days",
    of_total: "of {n}",

    dormant: "Dormant for {days} days",
    moving: "Last issued {date}",

    metric_amount: "ABC measured by cost of issues",
    metric_qty: "ABC measured by quantity issued",
    metric_value_amount: "cost of issues",
    metric_value_qty: "quantity issued",
    window_line: "Window: {from} — {to}, {n} months",
    warehouses_all: "Warehouses: all",
    warehouses_line: "Warehouses: {list}",
    built_at: "Computed {time}",

    settings_title: "Stock ABC-XYZ analysis",
    settings_read_only:
      "Values are entered in Akeda: Settings → Applications → this application. The extension only reads them: the external contour has no way to write installation configuration at all.",
    sec_thresholds: "How it is computed",
    sec_window: "Analysis window",
    sec_warehouses: "Warehouses",
    sec_matrix: "Result",
    sec_issues: "Notes on the configuration",
    col_setting: "Setting",
    col_value: "Value",
    col_default: "Default",
    window_explain:
      "The window covers whole calendar months and ends with the previous one. A running month is shorter than the rest and would inflate the variation: a steadily selling item would get Z on the first of every month.",
    warehouses_all_note: "No codes given — every warehouse of the workspace is counted.",
    warehouses_unknown: "Codes absent from the warehouse directory: {codes}",
    col_code: "Code",
    col_name: "Warehouse",
    col_state: "State",
    wh_active: "active",
    wh_inactive: "disabled",
    matrix_total: "Items with issues in the window: {n}",
    matrix_empty: "No movement in the window — nothing to classify.",
    matrix_none: "no class",
    missing_config: "Required configuration fields are empty: {keys}",

    field_period_months: "Analysis period, months",
    field_metric: "ABC measure",
    field_abc_a_percent: "A threshold, % of issues",
    field_abc_b_percent: "B threshold, % of issues",
    field_xyz_x_max_percent: "X threshold, % variation",
    field_xyz_y_max_percent: "Y threshold, % variation",
    field_min_periods: "Minimum periods for XYZ",
    field_dead_days: "Dormant after, days",
    field_warehouse_codes: "Warehouse codes",

    issue_not_number: "“{raw}” is not a number; the default is used.",
    issue_out_of_range: "“{raw}” is out of range; the default is used.",
    issue_unknown_value: "“{raw}” is an unknown value; the default is used.",
    issue_abc_sum_over_100: "A and B add up to more than a hundred ({raw}); B was trimmed to the remainder.",
    issue_xyz_bounds_swapped: "The X threshold is wider than Y ({raw}); the thresholds were swapped.",
    issue_not_declared: "The value is left over from a previous version and is not applied.",
  },
};

// Текущий язык. До запуска — русский: контур русскоязычный, и первое, что
// увидит человек за долю секунды до контекста, лучше пусть будет на нём.
let LOCALE = "ru";

function setLocale(locale) {
  LOCALE = I18N[locale] ? locale : "ru";
  document.documentElement.lang = LOCALE;
}

// t — перевод с подстановкой. Отсутствующий ключ отдаёт сам ключ: пустая
// строка на экране выглядит как поломка вёрстки, а видимый ключ — как дыра в
// переводе, каковой и является.
function t(key, params) {
  const dictionary = I18N[LOCALE] || I18N.ru;
  let text = dictionary[key];
  if (text === undefined) return key;
  if (params) {
    for (const name of Object.keys(params)) {
      text = text.split("{" + name + "}").join(String(params[name]));
    }
  }
  return text;
}
