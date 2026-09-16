/* 归档入口页：筛选驱动的榜单。数据来自内嵌的 #board-data（模板/数据/渲染三层分离，
 * 与 report.js / trend.js 同源共享；改渲染不用重生成历史周报）。
 *
 * 筛选状态放 URL hash（#kind=…&week=…&metric=…&q=…），可分享、可回退。
 * 整份包在 IIFE 里：这些资产同处一个全局作用域，顶层重名（如 esc）会让后一个脚本整个中止（踩过）。 */
(() => {
"use strict";
const boardNode = document.getElementById("board-data");
const tabs = document.getElementById("board-tabs");
const weekSelect = document.getElementById("board-week");
const metricSelect = document.getElementById("board-metric");
const searchInput = document.getElementById("board-search");
const metaLine = document.getElementById("board-meta");
const tableBox = document.getElementById("board-table");
const noteLine = document.getElementById("board-note");
const chartTitle = document.getElementById("board-chart-title");
const chartBox = document.getElementById("board-chart");
const modelsBox = document.getElementById("board-models");
const modelsNote = document.getElementById("board-models-note");

const board = boardNode ? JSON.parse(boardNode.textContent) : null;
const WEEK_LIMIT = 6;

function escHtml(value) {
  return String(value).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
}

/** 实体身份：同名不同厂商是两条（与报告里 `名称 厂商` 同一套）。 */
function entityKey(row) {
  return row.badge ? `${row.name} ${row.badge}` : row.name;
}

/** 取一格数值：`14/4`、`6.9/20.8/-13.9` 取「本期」那一段；`—` 当负无穷排到最后。 */
function cellValue(text) {
  const head = String(text ?? "").split("/")[0].trim();
  if (!head || head === "—" || head === "-") return Number.NEGATIVE_INFINITY;
  const number = Number(head.replace(/[$,%]/g, ""));
  return Number.isFinite(number) ? number : Number.NEGATIVE_INFINITY;
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

/** 变更列：同模型、同指标对上期的百分比变化。没有上期数据就是 —。 */
function deltaCell(current, row, index) {
  const previous = previousWeek(current.week);
  if (!previous) return `<td class="num delta">—</td>`;
  const rows = board?.kinds?.[current.kind]?.weeks?.[previous]?.rows ?? [];
  const match = rows.find((item) => entityKey(item) === entityKey(row));
  const before = match ? cellValue(match.cells[index]) : Number.NEGATIVE_INFINITY;
  const now = cellValue(row.cells[index]);
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
  const metrics = board?.kinds?.[kind]?.metrics ?? [];
  const metric = metrics.includes(raw.get("metric")) ? raw.get("metric") : "综合";
  return {
    kind, week, metric: metrics.includes(metric) ? metric : metrics[0] ?? "",
    q: raw.get("q") ?? "", m: raw.get("m") ?? "",
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
  const slice = board?.kinds?.[current.kind]?.weeks?.[current.week];
  const rows = slice?.rows ?? [];
  const needle = current.q.trim().toLowerCase();
  const filtered = needle
    ? rows.filter((row) => `${row.name} ${row.badge}`.toLowerCase().includes(needle))
    : rows;
  const index = (board?.kinds?.[current.kind]?.metrics ?? []).indexOf(current.metric);
  const sorted = [...filtered].sort((left, right) => {
    const diff = cellValue(right.cells[index]) - cellValue(left.cells[index]);
    return diff !== 0 ? diff : String(left.name).localeCompare(String(right.name));
  });
  return { rows: sorted, index, all: rows.length, note: slice?.note ?? "" };
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
      const metrics = board.kinds[kind]?.metrics ?? [];
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

function renderTable(current, data) {
  const metrics = board?.kinds?.[current.kind]?.metrics ?? [];
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
  tableBox.innerHTML = data.rows.length
    ? `<table><thead><tr><th class="rank" title="按当前指标的名次">#</th><th class="name">模型</th>` +
      `<th class="num" title="同模型同指标对上期的变化">变更</th>${head}</tr></thead><tbody>${body}</tbody></table>`
    : '<p class="none">没有匹配的模型（换个搜索词或期次）。</p>';
  noteLine.textContent = data.note;
}

function renderChart(current, data) {
  chartTitle.textContent = `本项对比 · ${current.metric}`;
  const peak = Math.max(...data.rows.map((row) => cellValue(row.cells[data.index])).filter(Number.isFinite), 0) || 1;
  chartBox.innerHTML = data.rows.map((row) => {
    const text = row.cells[data.index] ?? "";
    const value = cellValue(text);
    const width = Number.isFinite(value) ? Math.max(0, Math.min(100, (value / peak) * 100)) : 0;
    return `<div class="bar"><span class="lab">${escHtml(row.name)}</span>` +
      `<span class="track"><i style="width:${width}%;background:${escHtml(row.dot || "#8a857c")}"></i></span>` +
      `<span class="vals">${escHtml(text)}</span></div>`;
  }).join("") || '<p class="none">没有可对比的数据。</p>';
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
  const metrics = board?.kinds?.[current.kind]?.metrics ?? [];
  const scoreAt = metrics.indexOf("综合");
  const series = new Map();
  for (const [weekIndex, stamp] of weeks.entries()) {
    for (const row of board?.kinds?.[current.kind]?.weeks?.[stamp]?.rows ?? []) {
      const value = cellValue(row.cells[scoreAt]);
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
  const available = modelsOfKind(current.kind);
  const chosen = current.m
    ? new Set(current.m.split("|").filter((name) => series.has(name)))
    : new Set(ranked.slice(0, WEEK_LIMIT).map((entry) => entry.name));
  const picked = ranked.filter((entry) => chosen.has(entry.name));
  renderChips(current, available, chosen);
  const labels = weeks.map((stamp) => weekLabel(stamp).split("（")[0]);
  const x = weeks.map((_stamp, index) => index);
  const data = [x, ...picked.map((entry) => x.map((index) => entry.points.get(index) ?? null))];
  modelsBox.replaceChildren();
  new uPlot({
    width: Math.max(260, modelsBox.clientWidth || 320), height: 200, padding: [10, 12, 0, 4],
    scales: { x: { time: false, range: (_u, min, max) => [min - 0.35, max + 0.35] } },
    axes: [
      {
        stroke: "#8c857c", size: 26, font: "11px sans-serif", grid: { show: false },
        splits: () => x, values: (_u, splits) => splits.map((index) => String(labels[index] ?? "").slice(-6)),
      },
      { stroke: "#8c857c", size: 46, font: "11px sans-serif" },
    ],
    legend: { show: false },
    cursor: { focus: { prox: 24 } },
    series: [{ label: "期次" }, ...picked.map((entry) => ({
      label: entry.name, stroke: entry.tone, width: 2,
      points: { show: true, size: 6, stroke: entry.tone, fill: "#fff" },
    }))],
  }, data, modelsBox);
  modelsNote.textContent = picked.length
    ? `每期综合分；已画 ${picked.length} 家（共 ${series.size} 家），点上面的名字增删。`
    : "一个都没选：点上面的模型名把它加回来。";
}

/** 模型开关：点一下增减，状态写进 hash 的 m（用 | 连接，可分享）。 */
function renderChips(current, available, chosen) {
  const box = document.getElementById("board-models-chips") ?? (() => {
    const node = document.createElement("div");
    node.id = "board-models-chips";
    node.className = "chips";
    modelsBox.parentElement.insertBefore(node, modelsBox);
    return node;
  })();
  box.replaceChildren();
  for (const model of available) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `chip${chosen.has(model.name) ? " on" : ""}`;
    chip.style.setProperty("--tone", model.tone);
    chip.textContent = model.name;
    chip.title = `${model.name}（综合 ${Number.isFinite(model.score) ? model.score.toFixed(1) : "—"}）`;
    chip.addEventListener("click", () => {
      const next = new Set(chosen);
      if (next.has(model.name)) next.delete(model.name);
      else next.add(model.name);
      writeState({ ...current, m: [...next].join("|") }, false);
      render();
    });
    box.appendChild(chip);
  }
}

/** 选中期次的详情：读该期 data.json，用同一个报告渲染器画进 #detail（不再为每期生成 HTML）。 */
const detailCache = new Map();
async function renderDetail(current) {
  const head = document.getElementById("detail-head");
  const info = document.getElementById("detail-meta");
  const links = document.getElementById("detail-links");
  const box = document.getElementById("detail");
  const meta = (board?.weeks ?? []).find((week) => week.stamp === current.week);
  if (!meta || !box) return;
  head.textContent = `本期详情 · ${current.week}`;
  links.replaceChildren();
  for (const [file, label] of [["report.md", "报告（Markdown）"], ["post.md", "发帖稿"],
                               ["data.json", "数据（JSON）"], ["summary.json", "摘要"]] ) {
    if (!(meta.files ?? []).includes(file)) continue;
    const a = document.createElement("a");
    a.href = `${meta.dir}/${file}`;
    a.textContent = label;
    links.appendChild(a);
  }
  for (const image of (meta.images ?? []).slice(0, 4)) {
    const a = document.createElement("a");
    a.href = image;
    a.textContent = `配图 ${image.split("/").pop()}`;
    links.appendChild(a);
  }
  if (detailCache.has(current.week)) {
    const view = detailCache.get(current.week);
    info.textContent = describe(view, meta);
    window.renderReportInto(box, view);
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
    info.textContent = describe(view, meta);
    window.renderReportInto(box, view);
  } catch (error) {
    info.textContent = `读不到本期数据（${error && error.message ? error.message : error}）。` +
      "本地直接双击打开时浏览器会拦 fetch，用 http 打开或在线上看。";
  }
}

function describe(view, meta) {
  const window = (view?.week?.window ?? []).join(" → ");
  const partial = meta.partial ? "（进行中）" : "";
  return `${window}${partial} · 生成 ${view?.week?.generated_at ?? "—"} · ${view?.kinds?.length ?? 0} 个活动类型`;
}

function render() {
  if (!board || !board.kinds) return;
  const current = state();
  writeState(current, true);
  renderTabs(current);
  renderSelect(weekSelect, (board.weeks ?? []).map((week) => week.stamp), current.week,
    (value) => { writeState({ ...current, week: value }, false); render(); }, weekLabel);
  renderSelect(metricSelect, board.kinds[current.kind]?.metrics ?? [], current.metric,
    (value) => { writeState({ ...current, metric: value }, false); render(); });
  searchInput.value = current.q;
  const data = rowsFor(current);
  const partial = (board.weeks ?? []).find((week) => week.stamp === current.week)?.partial ? "（进行中）" : "";
  metaLine.textContent = `${current.kind} · ${weekLabel(current.week)}${partial} · ${data.all} 家` +
    (data.rows.length !== data.all ? `（筛出 ${data.rows.length}）` : "");
  renderTable(current, data);
  renderChart(current, data);
  renderModelTrend(current);
  void renderDetail(current);
}

if (board) {
  searchInput.addEventListener("input", () => {
    const next = { ...state(), q: searchInput.value };
    writeState(next, true);
    const data = rowsFor(next);
    metaLine.textContent = `${next.kind} · ${weekLabel(next.week)} · ${data.all} 家` +
      (data.rows.length !== data.all ? `（筛出 ${data.rows.length}）` : "");
    renderTable(next, data);
    renderChart(next, data);
  });
  window.addEventListener("hashchange", render);
  window.addEventListener("resize", () => renderModelTrend(state()));
  render();
}
})();
