
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

function barRows(panel) {
  const wide = panel.wide ? " wide" : "";
  const rows = panel.rows
    .map((r) => {
      const bad = r.bad_pct === undefined ? "" :
        `<span class="track"><i style="width:${r.bad_pct}%;background:${esc(window.__falseTone || "#d7c3b8")}"></i></span>`;
      const badText = r.bad_text === undefined ? "" : ` <span class="d down">${esc(r.bad_text)}</span>`;
      const delta = r.delta ? ` <span class="d ${esc(r.delta.cls)}">${esc(r.delta.text)}</span>` : "";
      return (
        `<div class="bar"><span class="lab">${esc(r.label)}${badge(r.badge)}</span><span class="tracks">` +
        `<span class="track was"><i style="width:${r.was_pct}%;background:${esc(r.tone)}"></i></span>` +
        `<span class="track"><i style="width:${r.now_pct}%;background:${esc(r.tone)}"></i></span>${bad}</span>` +
        `<span class="vals">${esc(r.value)}${badText}${delta}</span></div>`
      );
    })
    .join("");
  const legend = panel.legend ? `<div class="sev-legend">${chips(panel.legend)}</div>` : "";
  return `<div class="panel${wide}"><h3>${esc(panel.title)}</h3>${rows}${legend}</div>`;
}

function severity(panel) {
  const bar = panel.segments
    .map((s) => `<i style="width:${s.pct}%;background:${esc(s.tone)}"></i>`)
    .join("");
  return `<div class="panel wide"><h3>${esc(panel.title)}</h3><div class="sev">${bar}</div>` +
    `<div class="sev-legend">${chips(panel.legend)}</div></div>`;
}

function panelBlock(panel) {
  return panel.segments ? severity(panel) : barRows(panel);
}

function panels(rows) {
  return rows.map((row) => `<div class="panels">${row.map(panelBlock).join("")}</div>`).join("");
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

function comments(block) {
  if (!block) return "";
  const rows = block.rows
    .map(
      (r) =>
        `<div class="comment"><span class="chead">${esc(r.rank)}${badge(r.badge)}</span>` +
        `<span class="cscore">${esc(r.score)}</span><span class="cpro">${esc(r.pros)}</span>` +
        `<span class="ccon">${esc(r.cons)}</span></div>`,
    )
    .join("");
  const head = block.head
    .map((h, i) => `<span class="${["chead", "cscore", "cpro", "ccon"][i]}">${esc(h)}</span>`)
    .join("");
  return `<div class="comments"><div class="comment chead-row">${head}</div>${rows}</div>`;
}

function kindBlock(kind) {
  return (
    `<h2>${esc(kind.title)}<span>${esc(kind.meta)}</span></h2>` +
    modelTable(kind.table) +
    panels(kind.panels) +
    comments(kind.comments)
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

/** 把一期数据拼成报告 HTML（不含外壳）。目录页也用它渲染「详情」，渲染器只此一份。 */
function reportHtml(view) {
  window.__falseTone = view.false_pos_tone || "#d7c3b8";
  const head = view.head;
  // 注意：`return` 后面必须紧跟表达式；换行会被 ASI 补分号，函数就返回 undefined（踩过）
  return (
    '<main>' +
    `<header><div><a class="back" href="${esc(head.back.href)}">${esc(head.back.text)}</a>` +
    `<p class="kicker">${esc(head.kicker)}</p><h1>${esc(head.h1)}</h1></div>` +
    `<p class="meta">${head.meta.map(esc).join("<br>")}</p></header>` +
    kpis(view.kpis) +
    `<div class="legend">${chips(view.legend)}</div>` +
    formula(view.formula) +
    view.kinds.map(kindBlock).join("") +
    debtBlock(view.debt) +
    `<footer>${view.notes.map((n) => `<p>${esc(n)}</p>`).join("")}</footer>` +
    "</main>");
}

function render(view) {
  const app = document.getElementById("app");
  if (!app) return;
  app.innerHTML = reportHtml(view);
  document.documentElement.dataset.reportReady = "1";
}

/** 目录页用：把某期数据渲染进指定容器（同一个渲染器，不再为每期生成 HTML）。 */
window.renderReportInto = (target, view) => {
  if (!target || !view) return null;
  target.innerHTML = reportHtml(view);
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
