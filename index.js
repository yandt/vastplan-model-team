/* 归档入口页：筛选驱动的榜单。数据来自内嵌的 #board-data（模板/数据/渲染三层分离，
 * 与 report.js / trend.js 同源共享；改渲染不用重生成历史周报）。
 *
 * 综合分不预置：页面加载 `scoring.json` 与 `scoring.js`（与 Node 侧同一份引擎），
 * 按所选「评分门槛」对全量行实时算分与切分；少于门槛的只进观察区、不排名。
 * 筛选状态放 URL hash（#kind=…&week=…&metric=…&s=…&m=…），可分享、可回退。
 * 整份包在 IIFE 里：这些资产同处一个全局作用域，顶层重名（如 esc）会让后一个脚本整个中止（踩过）。 */
(() => {
"use strict";
const boardNode = document.getElementById("board-data");
const tabs = document.getElementById("board-tabs");
const weekSelect = document.getElementById("board-week");
const metricSelect = document.getElementById("board-metric");
const minSessionsSelect = document.getElementById("board-min-sessions");
const metaLine = document.getElementById("board-meta");
const tableBox = document.getElementById("board-table");
const noteLine = document.getElementById("board-note");
const chartTitle = document.getElementById("board-chart-title");
const chartBox = document.getElementById("board-chart");
const modelsBox = document.getElementById("board-models");
const modelsNote = document.getElementById("board-models-note");

const board = boardNode ? JSON.parse(boardNode.textContent) : null;

/** 打分规则：内嵌一份（生成时快照），再拉归档根 scoring.json——配置改了不必重生成周报。 */
let SCORING = board?.scoring ?? null;
if (board) {
  fetch("scoring.json", { cache: "no-cache" })
    .then((response) => (response.ok ? response.json() : null))
    .then((config) => { if (config && Array.isArray(config.axes)) { SCORING = config; render(); } })
    .catch(() => { /* 离线打开时用内嵌那份 */ });
}

function escHtml(value) {
  return String(value).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
}

/** 实体身份：同名不同厂商是两条（与报告里 `名称 厂商` 同一套）。 */
function entityKey(row) {
  return row.badge ? `${row.name} ${row.badge}` : row.name;
}

/** 统计口径（hash 的 g）：空 / s＝按服务商拆（默认，主榜单）；m＝同名模型合并（board.alt，缺省时退回主榜单）。 */
function groupingOf(current) {
  return current && current.g === "m" && board?.alt?.kinds ? "m" : "s";
}

function kindsOf(current) {
  return groupingOf(current) === "m" ? board.alt.kinds : board?.kinds ?? {};
}

function kindOf(current) {
  return kindsOf(current)[current.kind] ?? {};
}

/** 模型选择：hash 的 m（`|` 连接实体名，与「模型长期走势」同一状态）。
 *  空 = 全部模型（不过滤）；有值 = 只留这些。顶部多选与走势图下的 chips 是同一个开关。 */
function selectedModels(current) {
  return current.m ? new Set(current.m.split("|")) : null;
}

/** 取一格数值：`14/4`、`6.9/20.8/-13.9` 取「本期」那一段；`—` 当负无穷排到最后。 */
function cellValue(text) {
  const head = String(text ?? "").split("/")[0].trim();
  if (!head || head === "—" || head === "-") return Number.NEGATIVE_INFINITY;
  const number = Number(head.replace(/[$,%]/g, ""));
  return Number.isFinite(number) ? number : Number.NEGATIVE_INFINITY;
}

/** 花费值：`13.07/6.38` 取「本期」（斜杠前）那一段；`—`/未采集/空 视为不可比（NaN，不进散点）。 */
function costValue(text) {
  const head = String(text ?? "").split("/")[0].trim();
  if (!head || head === "—" || head === "-") return Number.NaN;
  const number = Number(head.replace(/[$,%]/g, ""));
  return Number.isFinite(number) ? number : Number.NaN;
}

/** 越低越好的指标（与报告 DIMENSIONS 的 ascending 同义）；用于变更列的涨跌配色。 */
const LOWER_IS_BETTER = ["花费", "假阳", "耗时", "时间", "token", "成本"];
function metricDirection(metric) {
  return LOWER_IS_BETTER.some((key) => String(metric).includes(key)) ? -1 : 1;
}

/** 上期期次（按 board 里的顺序取前一个）。 */
function previousWeek(stamp) {
  const weeks = (board?.weeks ?? []).map((week) => week.stamp);
  const index = weeks.indexOf(stamp);
  return index > 0 ? weeks[index - 1] : "";
}

/** 评分门槛（hash 的 s）：默认取配置（scoring.json 的 min_sessions），可调 1～20。 */
function minSessionsOf(current) {
  const value = Number(current && current.s);
  if (Number.isInteger(value) && value >= 1 && value <= 20) return value;
  return Number(SCORING && SCORING.min_sessions) || 5;
}

/** 一期的全量行按门槛实时算分：达标行算综合分，未达标行进观察区。
 *  没有 sessions/raw 的老期次退回生成时分数（原样返回，不重算）。 */
function scoreWeek(current, stamp) {
  const rows = kindOf(current)?.weeks?.[stamp]?.rows ?? [];
  const minSessions = minSessionsOf(current);
  const scores = new Map();
  const engine = window.VastScoring;
  const scorable = rows.filter((row) => Number.isFinite(row.sessions) && row.raw && row.raw.quality !== undefined);
  if (!SCORING || !engine || !scorable.length) return { rows, eligible: rows, benched: [], scores };
  const split = engine.splitByThreshold(scorable, minSessions);
  for (const item of engine.compositeScores(split.eligible.map((row) => ({ key: entityKey(row), values: row.raw })), SCORING)) {
    scores.set(item.key, item.score);
  }
  const eligible = [];
  const benched = [];
  for (const row of rows) {
    if (Number.isFinite(row.sessions) && row.raw) (row.sessions >= minSessions ? eligible : benched).push(row);
    else eligible.push(row);
  }
  return { rows, eligible, benched, scores };
}

const weekScoreCache = new Map();
function scoresForWeek(current, stamp) {
  const key = `${stamp}|${minSessionsOf(current)}|${current.kind}|${groupingOf(current)}`;
  if (!weekScoreCache.has(key)) weekScoreCache.set(key, scoreWeek(current, stamp));
  return weekScoreCache.get(key);
}

/** 把实时算出的综合分写回「综合」列（行是只读的，浅拷 cells）。 */
function applyScores(rows, scores, metrics) {
  const at = metrics.indexOf("综合");
  if (at < 0 || !scores.size) return rows;
  return rows.map((row) => {
    const score = scores.get(entityKey(row));
    if (!Number.isFinite(score)) return row;
    const cells = row.cells.slice();
    cells[at] = score.toFixed(1);
    return { ...row, cells };
  });
}

/** 同模型同指标的取值：综合列走实时算分，其余走生成时的单元格。 */
function metricValue(current, row, index, stamp) {
  if (current.metric === "综合" && SCORING && window.VastScoring) {
    const value = scoresForWeek(current, stamp).scores.get(entityKey(row));
    return Number.isFinite(value) ? value : Number.NEGATIVE_INFINITY;
  }
  const rows = kindOf(current)?.weeks?.[stamp]?.rows ?? [];
  const match = stamp === current.week ? row : rows.find((item) => entityKey(item) === entityKey(row));
  return match ? cellValue(match.cells[index]) : Number.NEGATIVE_INFINITY;
}

/** 变更列：同模型、同指标对上期的百分比变化。没有上期数据就是 —。 */
function deltaCell(current, row, index) {
  const previous = previousWeek(current.week);
  if (!previous) return `<td class="num delta">—</td>`;
  const before = metricValue(current, row, index, previous);
  const now = metricValue(current, row, index, current.week);
  if (!Number.isFinite(before) || !Number.isFinite(now) || before === 0) return `<td class="num delta">—</td>`;
  const change = ((now - before) / Math.abs(before)) * 100;
  const better = change * metricDirection(current.metric) > 0;
  const cls = Math.abs(change) < 0.05 ? "flat" : better ? "up" : "down";
  const sign = change > 0 ? "+" : "";
  return `<td class="num delta ${cls}">${sign}${change.toFixed(1)}%</td>`;
}

function state() {
  const raw = new URLSearchParams(location.hash.replace(/^#/, ""));
  const kinds = Object.keys(board?.kinds ?? {});
  const kind = kinds.includes(raw.get("kind")) ? raw.get("kind") : kinds[0] ?? "";
  const weeks = (board?.weeks ?? []).map((week) => week.stamp);
  const week = weeks.includes(raw.get("week")) ? raw.get("week") : weeks[weeks.length - 1] ?? "";
  const g = raw.get("g") === "m" && board?.alt?.kinds ? "m" : "";
  const metrics = (g === "m" ? board.alt.kinds : board?.kinds)?.[kind]?.metrics ?? [];
  const metric = metrics.includes(raw.get("metric")) ? raw.get("metric") : "综合";
  return {
    kind, week, g, metric: metrics.includes(metric) ? metric : metrics[0] ?? "",
    s: raw.get("s") ?? "", m: raw.get("m") ?? "",
  };
}

function writeState(next, replace) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(next)) if (value) params.set(key, value);
  const url = `${location.pathname}${location.search}#${params.toString()}`;
  if (replace) history.replaceState(null, "", url);
  else history.pushState(null, "", url);
}

function weekLabel(stamp) {
  const found = (board?.weeks ?? []).find((week) => week.stamp === stamp);
  return found ? found.label : stamp;
}

function rowsFor(current) {
  const metrics = kindOf(current)?.metrics ?? [];
  const week = scoresForWeek(current, current.week);
  const minSessions = minSessionsOf(current);
  const scored = applyScores(week.eligible, week.scores, metrics);
  const chosen = selectedModels(current);
  const picked = chosen ? scored.filter((row) => chosen.has(entityKey(row))) : scored;
  const index = metrics.indexOf(current.metric);
  const sorted = [...picked].sort((left, right) => {
    const diff = cellValue(right.cells[index]) - cellValue(left.cells[index]);
    return diff !== 0 ? diff : String(left.name).localeCompare(String(right.name));
  });
  const benched = chosen ? week.benched.filter((row) => chosen.has(entityKey(row))) : week.benched;
  const fallbackNote = kindOf(current)?.weeks?.[current.week]?.note ?? "";
  return {
    rows: sorted, index, all: week.rows.length, benched, minSessions,
    note: week.scores.size ? noteOf(week, benched, minSessions) : fallbackNote,
  };
}

/** 榜单注记（与生成侧同口径，按当前门槛实时拼）：观察区名单 + 主力第一。 */
function noteOf(week, benched, minSessions) {
  const bits = [];
  if (benched.length) bits.push(`样本 < ${minSessions} 场未进排名，见下方观察区（${benched.map(entityKey).join("、")}）`);
  const ranked = week.eligible.filter((row) => Number.isFinite(week.scores.get(entityKey(row))));
  if (ranked.length) {
    const top = ranked.reduce((best, row) =>
      (week.scores.get(entityKey(row)) > week.scores.get(entityKey(best)) ? row : best));
    bits.push(`主力（≥${minSessions} 场）第一：${entityKey(top)}（综合 ${week.scores.get(entityKey(top)).toFixed(1)}）`);
  }
  return bits.join("；");
}

function renderTabs(current) {
  tabs.replaceChildren();
  for (const kind of Object.keys(board?.kinds ?? {})) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `tab${kind === current.kind ? " on" : ""}`;
    button.textContent = kind;
    const tone = board?.tones?.[kind];
    if (tone) button.style.setProperty("--tone", tone);
    button.addEventListener("click", () => {
      const metrics = kindsOf(current)[kind]?.metrics ?? [];
      writeState({ ...current, kind, metric: metrics.includes(current.metric) ? current.metric : metrics[0] ?? "" }, false);
      render();
    });
    tabs.appendChild(button);
  }
}

function renderSelect(node, values, selected, onPick, labelOf) {
  node.replaceChildren();
  for (const value of values) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = labelOf ? labelOf(value) : value;
    if (value === selected) option.selected = true;
    node.appendChild(option);
  }
  node.onchange = () => onPick(node.value);
}

/** 统计口径开关「按厂商 / 按模型」（与报告详情同一命名）：board.alt 存在才画；
 *  换口径会清掉模型选择——两套分组的实体名不同（K3 vs K3 方舟 Agent Plan），留着会筛成空表。 */
function renderGroup(current) {
  const box = document.getElementById("board-group");
  if (!box) return;
  box.replaceChildren();
  if (!board?.alt?.kinds) return;
  const active = groupingOf(current);
  for (const [key, text] of [["s", "按厂商"], ["m", "按模型"]]) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = key === active ? "on" : "";
    button.textContent = text;
    button.addEventListener("click", () => {
      if (key === active) return;
      writeState({ ...current, g: key === "m" ? "m" : "", m: "" }, false);
      render();
    });
    box.appendChild(button);
  }
}

function renderTable(current, data) {
  const metrics = kindOf(current)?.metrics ?? [];
  const head = metrics.map((name, index) =>
    `<th class="num${index === data.index ? " on" : ""}">${escHtml(name)}</th>`).join("");
  const peak = Math.max(...data.rows.map((row) => cellValue(row.cells[data.index])).filter(Number.isFinite), 0) || 1;
  // `#` 按当前指标的名次（与报告「本项排名」同义）；原始综合名次见报告
  const body = data.rows.map((row, position) => {
    const cells = metrics.map((_name, index) => {
      const text = row.cells[index] ?? "";
      if (index !== data.index) return `<td class="num">${escHtml(text)}</td>`;
      const value = cellValue(text);
      const width = Number.isFinite(value) ? Math.max(0, Math.min(100, (value / peak) * 100)) : 0;
      return `<td class="num on"><span class="cellbar" style="width:${width}%;background:${escHtml(row.dot || "#8a857c")}"></span>${escHtml(text)}</td>`;
    }).join("");
    return `<tr><td class="rank">${position + 1}</td>` +
      `<td class="name"><i class="dot" style="background:${escHtml(row.dot || "#8a857c")}"></i>${escHtml(row.name)}` +
      (row.badge ? `<span class="badge" title="${escHtml(row.badge)}">${escHtml(row.badge)}</span>` : "") + `</td>` +
      deltaCell(current, row, data.index) + cells + "</tr>";
  }).join("");
  const observed = (data.benched ?? []).map((row) => {
    const info = row.observed ?? {};
    const quality = Number.isFinite(Number(info.quality)) ? Number(info.quality).toFixed(1) : "—";
    const confirmed = Number.isFinite(Number(info.confirmed)) ? String(Math.round(Number(info.confirmed))) : "—";
    const coverage = Number.isFinite(Number(info.coverage)) ? `${Math.round(Number(info.coverage) * 100)}%` : "—";
    const badge = row.badge ? `<span class="badge" title="${escHtml(row.badge)}">${escHtml(row.badge)}</span>` : "";
    return `<span>${escHtml(row.name)}${badge}（${row.sessions} 场，均质量 ${quality}，成立 ${confirmed} 条，覆盖 ${coverage}）</span>`;
  }).join("");
  const observedHtml = observed
    ? `<div class="observed"><b>观察区（样本不足未排名）</b>${observed}</div>`
    : "";
  tableBox.innerHTML = (data.rows.length
    ? `<table><thead><tr><th class="rank" title="按当前指标的名次">#</th><th class="name">模型</th>` +
      `<th class="num" title="同模型同指标对上期的变化">变更</th>${head}</tr></thead><tbody>${body}</tbody></table>`
    : '<p class="none">没有达标模型（低于评分门槛的都进了观察区）。</p>') + observedHtml;
  noteLine.textContent = data.note;
}

/** 当前散点图实例：换指标/换期次/改筛选前先销毁，别让 Chart 实例越积越多。 */
let scatterChart = null;

/** 名称里的思考档括注：「DeepSeek V4.1 Flash（max）」→「DeepSeek V4.1 Flash」（全/半角都收）。 */
function baseModelName(name) {
  return String(name ?? "").replace(/[（(][^（）()]*[)）]\s*$/, "").trim();
}

/** 散点连线的分组键：同基名且同厂商才算同一模型（K3 Cursor 与 K3 方舟是两条，不连）。 */
function scatterGroupKey(row) {
  return `${baseModelName(row.name)}\u0000${row.badge ?? ""}`;
}

/** 综合指标改成散点：x＝每次花费（看板「花费」列已折成每次，优先用面板精确值 cost_run 防二次舍入）、
 *  y＝综合得分，一屏看性价比分布；点旁标模型名，
 *  同基名同厂商且思考档不同（如 max/high）的点用同色实线连起来；其余指标仍是横条。 */
function renderScatterChart(current, data, costAt) {
  const metrics = kindOf(current)?.metrics ?? [];
  const thinkAt = metrics.findIndex((name) => String(name).includes("思考"));
  const points = [];
  const groups = new Map();
  for (const row of data.rows) {
    const cost = Number.isFinite(row.cost_run) ? row.cost_run : costValue(row.cells[costAt]);
    const score = cellValue(row.cells[data.index]);
    if (!Number.isFinite(cost) || !Number.isFinite(score)) continue;
    const point = { x: cost, y: score, label: entityKey(row), color: row.dot || "#8a857c" };
    points.push(point);
    const thinking = thinkAt >= 0 ? String(row.cells[thinkAt] ?? "").trim() : "";
    if (!thinking) continue;
    const key = scatterGroupKey(row);
    const list = groups.get(key) ?? [];
    list.push({ ...point, thinking });
    groups.set(key, list);
  }
  const links = [];
  for (const list of groups.values()) {
    if (list.length < 2 || new Set(list.map((item) => item.thinking)).size < 2) continue;
    const sorted = [...list].sort((left, right) => left.x - right.x);
    links.push({ color: sorted[0].color, points: sorted.map(({ x, y }) => ({ x, y })) });
  }
  chartTitle.textContent = "对比 · 性价比（横轴 每次花费 $，纵轴 综合）";
  if (!points.length) {
    chartBox.innerHTML = '<p class="none">没有可对比的数据。</p>';
    return;
  }
  chartBox.innerHTML = '<div class="scatter-host"></div>';
  if (window.VastCharts) {
    scatterChart = window.VastCharts.scatter(chartBox.firstChild, { height: 240, minWidth: 240, points, links });
  }
}

function renderChart(current, data) {
  if (scatterChart) {
    try { scatterChart.destroy(); } catch (_error) { /* 已经销毁过就忽略 */ }
    scatterChart = null;
  }
  const metrics = kindOf(current)?.metrics ?? [];
  const costAt = metrics.findIndex((name) => String(name).includes("花费"));
  if (current.metric === "综合" && costAt >= 0) {
    renderScatterChart(current, data, costAt);
    return;
  }
  chartTitle.textContent = `本项对比 · ${current.metric}`;
  const peak = Math.max(...data.rows.map((row) => cellValue(row.cells[data.index])).filter(Number.isFinite), 0) || 1;
  chartBox.innerHTML = data.rows.map((row) => {
    const text = row.cells[data.index] ?? "";
    const value = cellValue(text);
    const width = Number.isFinite(value) ? Math.max(0, Math.min(100, (value / peak) * 100)) : 0;
    const spec = { height: 11, gap: 3, tracks: [{ parts: [{ value: width, color: row.dot || "#8a857c" }] }] };
    // 顶部图表的值是「本/上」一对，只有三格；自带 pair 类，免得跟详情面板的四列规则串味
    return `<div class="bar pair"><span class="lab">${escHtml(row.name)}</span>` +
      `<span class="tracks" data-vast-bars="${escHtml(JSON.stringify(spec))}"></span>` +
      `<span class="vals">${escHtml(text)}</span></div>`;
  }).join("") || '<p class="none">没有可对比的数据。</p>';
  if (window.VastCharts) window.VastCharts.draw(chartBox);
}

/** 该类型下最新的模型清单（按最近一期综合分从高到低）。 */
function modelsOfKind(kind) {
  const weeks = (board?.weeks ?? []).map((week) => week.stamp);
  const metrics = board?.kinds?.[kind]?.metrics ?? [];
  const scoreAt = metrics.indexOf("综合");
  const latest = board?.kinds?.[kind]?.weeks?.[weeks[weeks.length - 1] ?? ""]?.rows ?? [];
  return latest
    .map((row) => ({ name: entityKey(row), tone: row.dot || "#8a857c", score: cellValue(row.cells[scoreAt]) }))
    .sort((left, right) => right.score - left.score);
}

/** 模型长期走势：选中类型下，各模型「综合」分随期次变化；画哪些由 chips 决定（状态在 hash 的 m）。 */
function renderModelTrend(current) {
  const weeks = (board?.weeks ?? []).map((week) => week.stamp);
  const metrics = kindOf(current)?.metrics ?? [];
  const scoreAt = metrics.indexOf("综合");
  const series = new Map();
  for (const [weekIndex, stamp] of weeks.entries()) {
    const week = scoresForWeek(current, stamp);
    for (const row of week.eligible) {
      const live = week.scores.get(entityKey(row));
      const value = Number.isFinite(live) ? live : cellValue(row.cells[scoreAt]);
      if (!Number.isFinite(value)) continue;
      const key = entityKey(row);
      const entry = series.get(key) ?? { name: key, tone: row.dot || "#8a857c", points: new Map() };
      entry.points.set(weekIndex, value);
      series.set(key, entry);
    }
  }
  if (series.size === 0) {
    modelsBox.replaceChildren();
    modelsNote.textContent = "还没有可画的模型分数。";
    return;
  }
  const lastIndex = weeks.length - 1;
  const ranked = [...series.values()]
    .sort((left, right) => (right.points.get(lastIndex) ?? -Infinity) - (left.points.get(lastIndex) ?? -Infinity));
  // 画哪几家由顶部「模型」多选决定（同一状态 m）：不再有"默认只画前 N 家"的隐规则，
  // 图与榜单严格同源——选了几家就画几家。
  const chosen = current.m
    ? new Set(current.m.split("|").filter((name) => series.has(name)))
    : new Set(ranked.map((entry) => entry.name));
  const picked = ranked.filter((entry) => chosen.has(entry.name));
  const labels = weeks.map((stamp) => weekLabel(stamp).split("（")[0]);
  window.VastCharts.lines(modelsBox, {
    height: 200, minWidth: 260, labels,
    xTicksMax: 8,
    xFormat: (label) => String(label ?? "").slice(-6),
    series: picked.map((entry) => ({
      label: entry.name, color: entry.tone,
      data: weeks.map((_stamp, index) => entry.points.get(index) ?? null),
    })),
  });
  modelsNote.textContent = picked.length
    ? `每期综合分；已画 ${picked.length}/${series.size} 家，改上面的「模型」选择可增删。`
    : "一个都没选：在顶部「模型」里点一下把它加回来。";
}

/** 顶部模型多选：整行平铺，与「模型长期走势」下的 chips 同一交互、同一状态（hash 的 m）。
 *  默认（m 空）＝全部模型；点一下增减，榜单表／本项对比／走势图／本期详情都只留所选模型。 */
function renderTopModels(current) {
  const box = document.getElementById("board-models-top");
  if (!box) return;
  // 用「选中期」的行建 chips：跨周换过服务商的模型（如 K3 Cursor / K3 方舟 Agent Plan）
  // 实体名会变，若按最新一期建，过滤时会误删选中期里对不上的行。
  const week = scoresForWeek(current, current.week);
  const scoreAt = (kindOf(current)?.metrics ?? []).indexOf("综合");
  const rowScore = (row) => {
    const live = week.scores.get(entityKey(row));
    return Number.isFinite(live) ? live : cellValue(row.cells[scoreAt]);
  };
  const available = [...week.rows]
    .sort((left, right) => rowScore(right) - rowScore(left))
    .map((row) => ({ name: entityKey(row), tone: row.dot || "#8a857c" }));
  const chosen = selectedModels(current);
  box.replaceChildren();
  for (const model of available) {
    const on = !chosen || chosen.has(model.name);
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `chip${on ? " on" : ""}`;
    chip.style.setProperty("--tone", model.tone);
    chip.textContent = model.name;
    chip.title = `${on ? "点击隐藏" : "点击显示"} ${model.name}（下方表格、图表与详情一起跟随）`;
    chip.addEventListener("click", () => {
      const next = chosen ? new Set(chosen) : new Set(available.map((item) => item.name));
      if (next.has(model.name)) next.delete(model.name);
      else next.add(model.name);
      writeState({ ...current, m: [...next].join("|") }, false);
      render();
    });
    box.appendChild(chip);
  }
  const hint = document.createElement("span");
  hint.className = "chip-hint";
  const on = available.filter((item) => !chosen || chosen.has(item.name)).length;
  hint.textContent = chosen ? `已选 ${on}/${available.length} 家` : `全部 ${available.length} 家`;
  box.appendChild(hint);
}

/** 选中期次的详情：读该期 data.json，用同一个报告渲染器画进 #detail（不再为每期生成 HTML）。 */
const detailCache = new Map();
async function renderDetail(current) {
  const head = document.getElementById("detail-head");
  const info = document.getElementById("detail-meta");
  const links = document.getElementById("detail-links");
  const box = document.getElementById("detail");
  const meta = (board?.weeks ?? []).find((week) => week.stamp === current.week);
  const chosen = selectedModels(current) ? [...selectedModels(current)] : null;
  const grouping = groupingOf(current) === "m" ? "merged" : "split";
  if (!meta || !box) return;
  head.textContent = `本期详情 · ${current.kind} · ${current.week}`;
  links.replaceChildren();
  for (const [file, label] of [["report.md", "报告（Markdown）"], ["post.md", "发帖稿"],
                               ["data.json", "数据（JSON）"], ["summary.json", "摘要"]] ) {
    if (!(meta.files ?? []).includes(file)) continue;
    const a = document.createElement("a");
    a.href = `${meta.dir}/${file}`;
    a.textContent = label;
    links.appendChild(a);
    if (!file.endsWith(".md")) continue;
    // Markdown 可在线阅读：按钮展开预览，链接仍是原始文件
    const button = document.createElement("button");
    button.type = "button";
    button.className = "ghost";
    button.textContent = `预览 ${label.replace("（Markdown）", "")}`;
    button.addEventListener("click", () => void openMarkdown(`${meta.dir}/${file}`, label));
    links.appendChild(button);
  }
  for (const image of (meta.images ?? []).filter((item) => imageBelongsTo(item, current.kind)).slice(0, 4)) {
    const a = document.createElement("a");
    a.href = image;
    a.textContent = `配图 ${image.split("/").pop()}`;
    links.appendChild(a);
  }
  if (detailCache.has(current.week)) {
    const view = detailCache.get(current.week);
    info.textContent = describe(view, meta, current.kind);
    window.renderReportInto(box, view, { kind: current.kind, models: chosen, grouping });
    return;
  }
  info.textContent = "载入中…";
  box.replaceChildren();
  try {
    // 用相对路径取本期数据（线上走 https；本地需用 http 打开，file:// 会被浏览器拦）
    const response = await fetch(`${meta.dir}/data.json`, { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const view = await response.json();
    detailCache.set(current.week, view);
    info.textContent = describe(view, meta, current.kind);
    window.renderReportInto(box, view, { kind: current.kind, models: chosen, grouping });
  } catch (error) {
    info.textContent = `读不到本期数据（${error && error.message ? error.message : error}）。` +
      "本地直接双击打开时浏览器会拦 fetch，用 http 打开或在线上看。";
  }
}

/** Markdown 在线预览：取原文 → 渲染进面板。模型写的贴文也算不可信输入，
 *  所以先转义原生 HTML 再交给 marked（不引入消毒库，也不放行裸标签）。 */
async function openMarkdown(path, title) {
  const box = document.getElementById("md-preview");
  if (!box) return;
  box.dataset.source = path;
  box.innerHTML = `<div class="md-head"><b>${escHtml(title)}</b>` +
    `<span class="md-actions"><a href="${escHtml(path)}" target="_blank" rel="noopener">原始文件</a>` +
    `<button type="button" class="ghost" id="md-close">关闭</button></span></div>` +
    `<div class="md-body loading">载入中…</div>`;
  document.getElementById("md-close")?.addEventListener("click", () => box.close());
  // 点遮罩关闭（Esc 是 dialog 自带的）
  if (!box.dataset.bound) {
    box.dataset.bound = "1";
    box.addEventListener("click", (event) => { if (event.target === box) box.close(); });
  }
  if (typeof box.showModal === "function" && !box.open) box.showModal();
  else box.setAttribute("open", "");
  const body = box.querySelector(".md-body");
  try {
    const response = await fetch(path, { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    const renderer = window.marked;
    body.classList.remove("loading");
    // 开头的 <!-- … --> 是生成信息（模型/耗时/金额）：提出来当一行淡色元信息，不混进正文
    const head = text.match(/^(?:\s*<!--[\s\S]*?-->\s*)+/);
    const meta = head ? head[0].replace(/<!--|-->/g, " ").replace(/\s+/g, " ").trim() : "";
    const restText = head ? text.slice(head[0].length) : text;
    const metaHtml = meta ? `<p class="md-meta">${escHtml(meta)}</p>` : "";
    body.innerHTML = metaHtml + (renderer && typeof renderer.parse === "function"
      ? renderer.parse(restText.replace(/</g, "&lt;"))
      : `<pre>${escHtml(restText)}</pre>`);
    body.classList.add("md-in");   // 内容到达时淡入上浮，接住开窗动效
  } catch (error) {
    body.classList.remove("loading");
    body.textContent = `读不到这份 Markdown（${error && error.message ? error.message : error}）。` +
      "本地直接双击打开时浏览器会拦 fetch，用 http 打开或在线上看。";
  }
}

/** 配图与活动类型的对应：取图名里的关键词（与 cli 的切图配置同名）。
 *  audit → 事后审计、design → 设计分叉，其余（1-ranking 总览）两类都显示。 */
function imageBelongsTo(image, kind) {
  const name = String(image).toLowerCase();
  if (name.includes("audit")) return kind === "事后审计";
  if (name.includes("design")) return kind === "设计分叉";
  return true;
}

/** 详情区信息行：跟着顶部所选类型走（下方报告与配图也只画该类型）。 */
function describe(view, meta, kind) {
  const window = (view?.week?.window ?? []).join(" → ");
  const partial = meta.partial ? "（进行中）" : "";
  const total = view?.kinds?.length ?? 0;
  const scope = kind ? `当前显示「${kind}」· 本期共 ${total} 个活动类型` : `${total} 个活动类型`;
  return `${window}${partial} · 生成 ${view?.week?.generated_at ?? "—"} · ${scope}`;
}

function render() {
  if (!board || !board.kinds) return;
  const current = state();
  writeState(current, true);
  renderTabs(current);
  renderGroup(current);
  renderSelect(weekSelect, (board.weeks ?? []).map((week) => week.stamp), current.week,
    (value) => { writeState({ ...current, week: value }, false); render(); }, weekLabel);
  renderSelect(metricSelect, kindOf(current)?.metrics ?? [], current.metric,
    (value) => { writeState({ ...current, metric: value }, false); render(); });
  renderSelect(minSessionsSelect, ["1", "2", "3", "4", "5", "6", "8", "10", "15", "20"], String(minSessionsOf(current)),
    (value) => {
      const fallback = String(Number(SCORING && SCORING.min_sessions) || 5);
      writeState({ ...current, s: value === fallback ? "" : value }, false);
      render();
    });
  const data = rowsFor(current);
  const bench = (data.benched ?? []).length;
  metaLine.textContent = `${current.kind} · ${weekLabel(current.week)} · ${data.all} 家` +
    (bench ? `（达标 ${data.rows.length} · 观察 ${bench}）` : "");
  renderTable(current, data);
  renderChart(current, data);
  renderTopModels(current);
  renderModelTrend(current);
  void renderDetail(current);
}

// 归档说明（README）也用同一个预览器
document.getElementById("readme-preview")?.addEventListener("click", () => void openMarkdown("README.md", "归档说明（README）"));

if (board) {
  window.addEventListener("hashchange", render);
  window.addEventListener("resize", () => renderModelTrend(state()));
  render();
}
})();
