
/* 整份包在 IIFE 里：这些资产会同页共存（目录页同时加载 report.js 与 trend.js），
   顶层重名（如 esc）会让后一个脚本整个中止（踩过两次）。 */
(() => {
"use strict";
/* 周报渲染器：只吃数据（<script id="report-data"> 里的 JSON），不写死任何一期内容。
 * 放在归档根，所有周报共用；改排版/样式只改这一个文件 + report.css，历史周报一起生效。 */

const esc = (value) =>
  String(value ?? "").replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));

const badge = (b) => (b ? ` <span class="badge" title="${esc(b.title)}">${esc(b.text)}</span>` : "");
const dot = (tone) => (tone ? `<i class="dot" style="background:${esc(tone)}"></i> ` : "");
const chips = (items) =>
  (items || [])
    .map((c) => `<span class="chip">${dot(c.tone)}${esc(c.text ?? c.name)}${badge(c.badge)}</span>`)
    .join("");

function kpis(cards) {
  return (
    '<div class="kpis">' +
    cards
      .map((c) => {
        const delta = c.delta ? `<span class="d ${esc(c.delta.cls)}">${esc(c.delta.text)}</span>` : "";
        return (
          `<div class="kpi"><div class="lab">${esc(c.label)}</div><div class="val">${esc(c.value)}</div>` +
          `<div class="cux">${esc(c.prefix || "")}${delta}${esc(c.suffix || "")}</div></div>`
        );
      })
      .join("") +
    "</div>"
  );
}

function formula(block) {
  const axes = block.axes
    .map(
      (a) =>
        `<span class="axis${a.low ? " low" : ""}"><b>${esc(a.name)}</b><i>${esc(a.share)}</i>` +
        `<em>${esc(a.desc)}</em></span>`,
    )
    .join("");
  return (
    `<section class="formula"><h3>${esc(block.title)}</h3><div class="axes">${axes}</div>` +
    `<p class="fnote">${esc(block.note)}</p></section>`
  );
}

/** 条形的画布规格：上期 1 段（半透明）、本期 1~2 段（覆盖面板拆独有/共同）、可选说错 1 段。
 *  数值文字列仍是 DOM（对齐靠 CSS 网格），这里只把条交给 canvas。 */
function barSpec(row) {
  const tracks = [{ parts: [{ value: row.was_pct, color: row.tone, opacity: 0.32 }] }];
  if (row.unique_pct === undefined) {
    tracks.push({ parts: [{ value: row.now_pct, color: row.tone }] });
  } else {
    tracks.push({ parts: [
      { value: row.unique_pct, color: row.tone },
      { value: Math.max(0, row.now_pct - row.unique_pct), color: row.tone, opacity: 0.42 },
    ] });
  }
  if (row.bad_pct !== undefined) {
    tracks.push({ parts: [{ value: row.bad_pct, color: window.__falseTone || "#d7c3b8" }] });
  }
  return { tracks };
}

function barRows(panel) {
  const wide = panel.wide ? " wide" : "";
  const rows = panel.rows
    .map((r) => {
      // 最后两格分列：本周值固定占一格、环比（或「说错」这类附带值）占另一格。
      // 以前把值＋环比拼在一个单元格里，数字宽度不一就左右参差；分列后各行严格对齐。
      const secondary = r.bad_text !== undefined
        ? `<span class="d down">${esc(r.bad_text)}</span>`
        : r.delta ? `<span class="d ${esc(r.delta.cls)}">${esc(r.delta.text)}</span>` : "";
      const ratio = r.unique_ratio_text === undefined
        ? ""
        : `<span class="val3">${esc(r.unique_ratio_text)}</span>`;
      const chart = `<span class="tracks" data-vast-bars="${esc(JSON.stringify(barSpec(r)))}"></span>`;
      return (
        `<div class="bar${ratio ? " three" : ""}"><span class="lab">${esc(r.label)}${badge(r.badge)}</span>` +
        chart +
        `<span class="val">${esc(r.value)}</span>${ratio}<span class="val2">${secondary}</span></div>`
      );
    })
    .join("");
  const legend = panel.legend ? `<div class="sev-legend">${chips(panel.legend)}</div>` : "";
  return `<div class="panel${wide}"><h3>${esc(panel.title)}</h3>${rows}${legend}</div>`;
}

function severity(panel) {
  const spec = {
    height: 9, gap: 0,
    tracks: [{ parts: panel.segments.map((s) => ({ value: s.pct, color: s.tone })) }],
  };
  return `<div class="panel wide"><h3>${esc(panel.title)}</h3>` +
    `<div class="sev" data-vast-bars="${esc(JSON.stringify(spec))}"></div>` +
    `<div class="sev-legend">${chips(panel.legend)}</div></div>`;
}

function panelBlock(panel) {
  return panel.segments ? severity(panel) : barRows(panel);
}

/** 面板展示顺序：把「覆盖」提到**第二排第二列**（第 4 格，紧跟 产出/精准/独立）。
 *  覆盖是选型主看的轴，排在第三排太靠后。只调展示，data.json 里的原序不动；
 *  同一规则对全部期次与两个活动类型一致生效（切图外壳共用这个渲染器）。 */
function orderedPanels(rows) {
  const flat = rows.flat();
  const at = flat.findIndex((panel) => String(panel.title).startsWith("覆盖"));
  if (at < 0 || at === 3) return rows;
  const moved = flat.slice();
  const [panel] = moved.splice(at, 1);
  moved.splice(3, 0, panel);
  const out = [];
  for (let i = 0; i < moved.length; i += 2) out.push(moved.slice(i, i + 2));
  return out;
}

function panels(rows) {
  return orderedPanels(rows).map((row) => `<div class="panels">${row.map(panelBlock).join("")}</div>`).join("");
}

function modelTable(table) {
  const head = table.head
    .map((h) => `<th${h.left ? ' style="text-align:left"' : ""}>${esc(h.text)}</th>`)
    .join("");
  const body = table.rows
    .map((row) => {
      const cells = row.cells
        .map((cell) => {
          const delta = cell.delta ? `<span class="d ${esc(cell.delta.cls)}">${esc(cell.delta.text)}</span>` : "";
          const cls = cell.cls ? ` class="${esc(cell.cls)}"` : "";
          return `<td${cls}>${esc(cell.text)}${delta}</td>`;
        })
        .join("");
      return (
        `<tr><td class="rank">${esc(row.rank)}</td>` +
        `<td class="name">${dot(row.dot)}${esc(row.name)}${badge(row.badge)}</td>${cells}</tr>`
      );
    })
    .join("");
  const note = table.note ? `<p class="note">${esc(table.note)}</p>` : "";
  // 表格套一层可横滑的壳：窄屏下靠它横滑，不把整页撑破（桌面下宽度够，不出现滚动条）
  return `<div class="scroll"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>${note}`;
}

function comments(block, options) {
  if (!block) return "";
  const scoped = Boolean(options && options.kind);
  // 按类型看时不重复排名与综合分（那是页面上方「榜单」的事），只留模型/长处/短处
  const rows = block.rows
    .map((r) => {
      const name = scoped ? String(r.rank).replace(/^#\d+\s*/, "") : r.rank;
      return `<div class="comment${scoped ? " no-score" : ""}"><span class="chead">${esc(name)}${badge(r.badge)}</span>` +
        (scoped ? "" : `<span class="cscore">${esc(r.score)}</span>`) +
        `<span class="cpro">${esc(r.pros)}</span><span class="ccon">${esc(r.cons)}</span></div>`;
    })
    .join("");
  const head = (scoped ? ["模型（按上方榜单顺序）"].concat(block.head.slice(2)) : block.head)
    .map((h, i) => `<span class="${(scoped ? ["chead", "cpro", "ccon"] : ["chead", "cscore", "cpro", "ccon"])[i]}">${esc(h)}</span>`)
    .join("");
  return `<div class="comments"><div class="comment chead-row${scoped ? " no-score" : ""}">${head}</div>${rows}</div>`;
}

/** 筛选用的实体名：面板行与评审行的首格是「#N 名称」，去掉序号再拼服务商即实体名
 *  （与榜单表「名称 服务商」同口径，靠它把顶部模型多选接到报告里每一行）。 */
function modelKeyOf(text, badge) {
  const name = String(text ?? "").replace(/^#\d+\s*/, "").trim();
  // 报告里的徽标是对象（{text: 短名, title: 全名}），榜单表里是字符串——统一按全名拼
  const provider = badge && typeof badge === "object" ? badge.title ?? badge.text ?? "" : badge;
  return provider ? `${name} ${provider}` : name;
}

/** 一个活动类型的小节。目录页按类型看时（options.kind）不再重复放模型榜单表——
 *  页面上方「榜单」表就是同一份数据且可切指标/搜索/看变更，这里只留图表与优缺点评审。
 *  options.models 非空时只留这些模型的表格行、面板行与评审行（筛空的面板整块去掉）。
 *  切图外壳走全量模式（无 options），表格照旧，版块序号不会错位。 */
function kindBlock(kind, options) {
  const scoped = Boolean(options && options.kind);
  const models = options && Array.isArray(options.models) && options.models.length
    ? new Set(options.models)
    : null;
  const keep = (text, badge) => !models || models.has(modelKeyOf(text, badge));
  const table = models
    ? { ...kind.table, rows: (kind.table?.rows ?? []).filter((row) => keep(row.name, row.badge)) }
    : kind.table;
  const groups = kind.panels
    .map((group) => group
      .map((panel) => (panel.rows ? { ...panel, rows: panel.rows.filter((row) => keep(row.label, row.badge)) } : panel))
      .filter((panel) => !panel.rows || panel.rows.length > 0))
    .filter((group) => group.length > 0);
  const commentsBlock = models && kind.comments
    ? { ...kind.comments, rows: (kind.comments.rows ?? []).filter((row) => keep(row.rank, row.badge)) }
    : kind.comments;
  const skip = scoped
    ? '<p class="note">模型榜单见页面上方「榜单」表（可切指标、搜索模型、看对上期变更）；本节只保留图表与优缺点评审。</p>'
    : "";
  return (
    `<h2>${esc(kind.title)}<span>${esc(kind.meta)}</span></h2>` +
    skip +
    (scoped ? "" : modelTable(table)) +
    panels(groups) +
    comments(commentsBlock, options)
  );
}

function debtBlock(debt) {
  const head = debt.head.map((h) => `<th>${esc(h)}</th>`).join("");
  const rows = debt.rows
    .map((row) => `<tr><td class="name">${esc(row[0])}</td>${row.slice(1).map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`)
    .join("");
  const body = debt.rows.length
    ? `<div class="scroll"><table class="debt"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`
    : "<p>（无）</p>";
  const note = debt.note ? `<p class="note">${esc(debt.note)}</p>` : "";
  return `<h2>${esc(debt.title)}<span>${esc(debt.meta)}</span></h2>${note}${body}`;
}

/** 把一期数据拼成报告 HTML（不含外壳）。目录页也用它渲染「详情」，渲染器只此一份。
 *  options.kind 只渲染该活动类型的小节（目录页顶部选了哪个就显示哪个）；缺省渲染全部
 *  （切图外壳走缺省，必须保留全部类型）。类型名对不上时退回全部：宁可多显示，不留空白。 */
function reportHtml(view, options) {
  window.__falseTone = view.false_pos_tone || "#d7c3b8";
  const head = view.head;
  const wanted = options && options.kind;
  const picked = (wanted ? view.kinds.filter((block) => block.title === wanted) : view.kinds) || [];
  const kinds = picked.length ? picked : view.kinds;
  // 注意：`return` 后面必须紧跟表达式；换行会被 ASI 补分号，函数就返回 undefined（踩过）
  return (
    '<main>' +
    `<header><div><a class="back" href="${esc(head.back.href)}">${esc(head.back.text)}</a>` +
    `<p class="kicker">${esc(head.kicker)}</p><h1>${esc(head.h1)}</h1></div>` +
    `<p class="meta">${head.meta.map(esc).join("<br>")}</p></header>` +
    kpis(view.kpis) +
    // 目录页按类型看时不再重复列一遍模型（顶部「模型」多选就是这份名单，且带配色点）；
    // 切图外壳走全量模式，图例照旧——它是独立图片的配色说明，去掉还会打乱版块序号。
    (options && options.kind ? "" : `<div class="legend">${chips(view.legend)}</div>`) +
    formula(view.formula) +
    kinds.map((block) => kindBlock(block, options)).join("") +
    debtBlock(view.debt) +
    `<footer>${view.notes.map((n) => `<p>${esc(n)}</p>`).join("")}</footer>` +
    "</main>");
}

function render(view) {
  const app = document.getElementById("app");
  if (!app) return;
  app.innerHTML = reportHtml(view);
  if (window.VastCharts) window.VastCharts.draw(app);
  // 切图外壳等这个标记：所有条形都在 draw() 里同步画完（animation:false）后才置位，图不会是空白。
  document.documentElement.dataset.reportReady = "1";
}

/** 目录页用：把某期数据渲染进指定容器（同一个渲染器，不再为每期生成 HTML）。 */
window.renderReportInto = (target, view, options) => {
  if (!target || !view) return null;
  target.innerHTML = reportHtml(view, options);
  if (window.VastCharts) window.VastCharts.draw(target);
  return target;
};

function boot() {
  const node = document.getElementById("report-data");
  if (!node) return;
  render(JSON.parse(node.textContent));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
})();
