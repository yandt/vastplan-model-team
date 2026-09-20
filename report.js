
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
  const tracks = [{ parts: [{ value: row.was_pct, color: row.tone, opacity: 0.5 }] }];
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
  // 表头：按本面板的列结构给各列一个说法（覆盖面板六列、成立密度带「说错」、其余四列）
  const first = panel.rows[0] ?? {};
  const four = Boolean(first.unique_delta && first.other_delta);
  const labels = four
    ? ["模型", "条（上＝上期，下＝本期）", "独有", "独有环比", "共有", "共有环比"]
    : first.bad_text !== undefined
      ? ["模型", "条（上＝上期，下＝本期）", "本期", "说错"]
      : ["模型", "条（上＝上期，下＝本期）", "本期", "环比"];
  const head = `<div class="bar head${four ? " four" : ""}">` +
    labels.map((text, i) => `<span class="${i === 0 ? "lab" : i === 1 ? "tracks" : "valh"}">${esc(text)}</span>`).join("") +
    "</div>";
  const rows = panel.rows
    .map((r) => {
      // 最后两格分列：本周值固定占一格、环比（或「说错」这类附带值）占另一格。
      // 以前把值＋环比拼在一个单元格里，数字宽度不一就左右参差；分列后各行严格对齐。
      // 覆盖行（有 unique_delta）四格自带两段环比，不再追加合计环比；其余面板照旧
      const secondary = r.unique_delta && r.other_delta
        ? ""
        : r.bad_text !== undefined
          ? `<span class="d down">${esc(r.bad_text)}</span>`
          : r.delta ? `<span class="d ${esc(r.delta.cls)}">${esc(r.delta.text)}</span>` : "";
      // 覆盖面板：独有 / 独有环比 / 其他 / 其他环比 四格（两段各自的环比）；其余面板仍是 值 + 环比
      const dcls = (d) => (d && d.cls ? ` ${d.cls}` : "");
      const cell = (d) => (d ? `<span class="val2 d${dcls(d)}">${esc(d.text)}</span>` : "");
      const ratio = r.unique_delta && r.other_delta
        ? `<span class="val3" title="独有覆盖率${r.unique_ratio_text ? `；独有占比 ${r.unique_ratio_text}` : ""}">${esc(r.unique_text)}</span>` +
          cell(r.unique_delta) +
          `<span class="val3">${esc(r.other_text)}</span>` + cell(r.other_delta)
        : r.unique_text === undefined
          ? ""
          : `<span class="val3" title="独有覆盖率${r.unique_ratio_text ? `；独有占比 ${r.unique_ratio_text}` : ""}">${esc(r.unique_text)}</span>`;
      const chart = `<span class="tracks" data-vast-bars="${esc(JSON.stringify(barSpec(r)))}"></span>`;
      return (
        `<div class="bar${ratio ? (r.unique_delta ? " four" : " three") : ""}"><span class="lab">${esc(r.label)}${badge(r.badge)}</span>` +
        chart +
        `${r.unique_delta && r.other_delta ? "" : `<span class="val">${esc(r.value)}</span>`}${ratio}${secondary ? `<span class="val2">${secondary}</span>` : ""}</div>`
      );
    })
    .join("");
  const legend = panel.legend ? `<div class="sev-legend">${chips(panel.legend)}</div>` : "";
  return `<div class="panel${wide}"><h3>${esc(panel.title)}</h3>${head}${rows}${legend}</div>`;
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

function modelTable(table, observed) {
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
  // 观察区塞在表格同一个滚动容器里：不新增 <main> 子节点，切图版块序号不受影响；老数据没有 observed 就是空串
  const watched = observedBlock(observed);
  // 表格套一层可横滑的壳：窄屏下靠它横滑，不把整页撑破（桌面下宽度够，不出现滚动条）
  return `<div class="scroll"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>${watched}</div>${note}`;
}

/** 观察区：样本不足未进排名，只列数字（有分无名次）。名字里带 @ 的是拆分口径遗留键，照样拆徽标显示。 */
function observedBlock(rows) {
  if (!rows || !rows.length) return "";
  const items = rows
    .map((row) => {
      const at = String(row.name).indexOf("@");
      const base = at < 0 ? row.name : row.name.slice(0, at);
      const provider = at < 0 ? "" : row.name.slice(at + 1);
      const tag = provider ? `<span class="badge" title="${esc(provider)}">${esc(provider.length > 5 ? provider.slice(0, 5) + "..." : provider)}</span>` : "";
      const cover = typeof row.coverage === "number" ? `${Math.round(row.coverage * 100)}%` : "—";
      return `<span>${esc(base)}${tag}（${row.sessions} 场，均质量 ${Number(row.quality).toFixed(1)}，` +
        `成立 ${row.confirmed} 条，覆盖 ${cover}）</span>`;
    })
    .join("");
  return `<div class="observed"><b>观察区（样本不足未排名）</b>${items}</div>`;
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

/** 实体保留规则（表格行 / 面板行 / 观察区共用一套）：
 *  name 是不带序号的本体名，provider 是服务商字符串（可空）。
 *  精确命中优先；合并口径的选择（K3）对整家有效；拆分口径的选择（K3 方舟 Agent Plan）落到合并行也认。 */
function keepEntity(name, provider, models, mode) {
  if (!models) return true;
  if (models.has(provider ? `${name} ${provider}` : name)) return true;
  if (models.has(name)) return true;
  if (!provider && mode === "merged") {
    for (const item of models) if (item.startsWith(`${name} `)) return true;
  }
  return false;
}

/** 当前渲染的那期的规则快照（优先于全站配置）：历史周次按自己的版本算，规则改了不追溯改写。 */
let viewScoring = null;

/** 打分配置：优先当前期的快照；否则入口页注入的 window.VastScoringConfig；切图外壳读内联的 #scoring-config。 */
function scoringConfig() {
  if (viewScoring) return viewScoring;
  if (window.VastScoringConfig) return window.VastScoringConfig;
  const node = document.getElementById("scoring-config");
  if (!node) return null;
  try {
    window.VastScoringConfig = JSON.parse(node.textContent);
  } catch {
    return null;
  }
  return window.VastScoringConfig;
}

/** 当前评分门槛：详情用入口页传进来的值；切图外壳按配置默认值。 */
function minSessionsOf(options) {
  const value = Number(options && options.minSessions);
  if (Number.isInteger(value) && value >= 1) return value;
  const config = scoringConfig();
  return Number(config && config.min_sessions) || 5;
}

/** 实体键（与生成侧一致）：名称@厂商。 */
function entityOfRow(row) {
  const badge = row && row.badge && typeof row.badge === "object"
    ? row.badge.title ?? row.badge.text ?? ""
    : row && row.badge;
  return badge ? `${row.name}@${badge}` : String((row && row.name) ?? "");
}

/** 评审行的实体键：rank 里只有本体名，厂商在徽标里（与生成侧的内部键 名称@厂商 对齐）。 */
function commentKey(row) {
  const base = String(row.rank).replace(/^#\d+\s*/, "").trim();
  const provider = row.badge && typeof row.badge === "object" ? row.badge.title ?? row.badge.text ?? "" : "";
  return provider ? `${base}@${provider}` : base;
}

/** 当前门槛下的达标实体集；没有原始行/引擎/配置时给 null（退回生成时资格）。 */
function eligibleSetOf(kind, minSessions) {
  const rows = Array.isArray(kind && kind.all_rows) ? kind.all_rows : null;
  const engine = window.VastScoring;
  const config = scoringConfig();
  if (!rows || !engine || !config) return null;
  const scorable = rows.filter((row) => Number.isFinite(row.sessions) && row.raw);
  return new Set(engine.splitByThreshold(scorable, minSessions).eligible.map(entityOfRow));
}

/** 按当前门槛重建一张面板：只留达标行，重排名次、重算条宽；空面板返回 null（整块去掉）。
 *  老数据（行里没有 model）原样返回，不重建。 */
function rebuildPanel(panel, eligibleSet) {
  if (!panel || !panel.rows || !panel.rows.length || !eligibleSet) return panel;
  if (!panel.rows.some((row) => row.model)) return panel;
  const rows = panel.rows.filter((row) => (row.model ? eligibleSet.has(row.model) : true));
  if (!rows.length) return null;
  const ascending = Boolean(panel.ascending);
  const sorted = [...rows].sort((left, right) => {
    const diff = Number(right.now ?? 0) - Number(left.now ?? 0);
    return (ascending ? -diff : diff) || String(left.model).localeCompare(String(right.model));
  });
  const peak = Math.max(...rows.flatMap((row) => [Number(row.now ?? 0), Number(row.was ?? 0)]), 1e-9) || 1;
  const pct = (value) => Math.max(0, Math.min(100, (Number(value ?? 0) / peak) * 100));
  return { ...panel, rows: sorted.map((row, index) => ({
    ...row,
    label: `#${index + 1} ${row.base ?? row.model}`,
    now_pct: pct(row.now),
    was_pct: pct(row.was),
    ...(row.unique_now !== undefined ? { unique_pct: pct(row.unique_now) } : {}),
    ...(row.bad_now !== undefined ? { bad_pct: pct(row.bad_now) } : {}),
  })) };
}

/** 当前门槛下的观察区行（数字与主表同源）；老数据退回生成时的 observed。 */
function observedRowsOf(kind, eligibleSet) {
  const rows = Array.isArray(kind && kind.all_rows) ? kind.all_rows : null;
  if (!rows || !eligibleSet) return (kind && kind.observed) || [];
  return rows
    .filter((row) => !eligibleSet.has(entityOfRow(row)))
    .map((row) => ({
      name: entityOfRow(row), sessions: row.sessions,
      quality: row.observed ? row.observed.quality : 0,
      confirmed: row.observed ? row.observed.confirmed : 0,
      coverage: row.observed ? row.observed.coverage : 0,
    }));
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
  const keep = (text, badge) => {
    const name = String(text ?? "").replace(/^#\d+\s*/, "").trim();
    // 报告里的徽标是对象（{text: 短名, title: 全名}），榜单表里是字符串——统一按全名拼
    const provider = badge && typeof badge === "object" ? badge.title ?? badge.text ?? "" : badge;
    return keepEntity(name, provider || "", models, options && options.mode);
  };
  const table = models
    ? { ...kind.table, rows: (kind.table?.rows ?? []).filter((row) => keep(row.name, row.badge)) }
    : kind.table;
  // 图表与评审按当前评分门槛重建：少于门槛的模型不进图表、不进评审；空面板整块去掉。
  const minSessions = minSessionsOf(options);
  const eligibleSet = eligibleSetOf(kind, minSessions);
  const groups = kind.panels
    .map((group) => group
      .map((panel) => {
        const rebuilt = rebuildPanel(panel, eligibleSet);
        if (!rebuilt) return null;
        if (!rebuilt.rows) return rebuilt;
        const rows = rebuilt.rows.filter((row) => keep(row.label, row.badge));
        return rows.length ? { ...rebuilt, rows } : null;
      })
      .filter(Boolean))
    .filter((group) => group.length > 0);
  const commentsBlock = kind.comments
    ? {
      ...kind.comments,
      rows: (kind.comments.rows ?? []).filter((row) => {
        const key = commentKey(row);
        if (eligibleSet && !eligibleSet.has(key)) return false;
        return models ? keep(row.rank, row.badge) : true;
      }),
    }
    : kind.comments;
  // 评审文案在生成时只给达标模型写：门槛调低后刚达标的模型没有评审，给一行说明（不静默缺）
  const commented = new Set((commentsBlock?.rows ?? []).map(commentKey));
  const missingComments = eligibleSet ? [...eligibleSet].filter((key) => !commented.has(key)) : [];
  const missingNote = missingComments.length ? missingCommentNote(kind, missingComments) : "";
  const skip = scoped
    ? '<p class="note">模型榜单见页面上方「榜单」表（可切指标、筛选模型、看对上期变更）；本节只保留图表与优缺点评审。</p>'
    : "";
  // 观察区按当前门槛实时取（与榜单同一套）：少于门槛的模型列数字、不排名；老数据退回生成时名单
  const observedRows = observedRowsOf(kind, eligibleSet);
  // scoped 详情不渲染主表（也没有观察区容器）：观察区在这里单独补一段，同样跟随模型筛选；
  // 非 scoped（独立页/切图）走主表容器里的那段，两边不会重复出现
  const scopedObserved = scoped
    ? observedBlock(observedRows.filter((row) => {
      const at = String(row.name).indexOf("@");
      return keepEntity(at < 0 ? row.name : row.name.slice(0, at), at < 0 ? "" : row.name.slice(at + 1),
        models, options.mode);
    }))
    : "";
  return (
    `<h2>${esc(kind.title)}<span>${esc(kind.meta)}</span></h2>` +
    skip +
    (scoped ? "" : modelTable(table, observedRows)) +
    panels(groups) +
    comments(commentsBlock, options) +
    missingNote +
    scopedObserved
  );
}

/** 刚达标但生成时没有评审文案的模型：列出名字（带厂商徽标），说明评审按生成门槛计算。 */
function missingCommentNote(kind, missing) {
  const rows = (kind.all_rows ?? []).filter((row) => missing.includes(entityOfRow(row)));
  const names = rows.map((row) => {
    const badgeHtml = row.badge
      ? `<span class="badge" title="${esc(row.badge.title ?? "")}">${esc(row.badge.text ?? "")}</span>`
      : "";
    return `${esc(row.name)}${badgeHtml}`;
  }).join("、");
  return `<p class="note">另有 ${missing.length} 家刚达标（${names}）：优缺点评审按生成门槛计算，暂未生成。</p>`;
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

/** 页面开关「按厂商 / 按模型」：只在有另一套分组（alt_kinds）时出现。
 *  目录详情（renderReportInto 带 options）显示；切图外壳走缺省（无 options）不显示，图片保持原样；
 *  老数据没有 alt_kinds 也不显示，历史周报 DOM 与原来一致。 */
function groupToggle(view, mode) {
  if (!view.alt_kinds || !view.alt_kinds.length) return "";
  const current = mode === "merged" ? "merged" : "split";
  const button = (key, text) =>
    `<button type="button" data-vast-group="${key}"${key === current ? ' class="on"' : ""}>${text}</button>`;
  return `<div class="gsplit" role="group" aria-label="统计口径">` +
    button("split", "按厂商") + button("merged", "按模型") + "</div>";
}

/** 把一期数据拼成报告 HTML（不含外壳）。目录页也用它渲染「详情」，渲染器只此一份。
 *  options.kind 只渲染该活动类型的小节（目录页顶部选了哪个就显示哪个）；缺省渲染全部
 *  （切图外壳走缺省，必须保留全部类型）。类型名对不上时退回全部：宁可多显示，不留空白。 */
function reportHtml(view, options, mode) {
  window.__falseTone = view.false_pos_tone || "#d7c3b8";
  viewScoring = view.scoring && Array.isArray(view.scoring.axes) ? view.scoring : null;
  const head = view.head;
  const wanted = options && options.kind;
  const picked = (wanted ? view.kinds.filter((block) => block.title === wanted) : view.kinds) || [];
  const kinds = picked.length ? picked : view.kinds;
  const showToggle = Boolean(options) && Boolean(view.alt_kinds && view.alt_kinds.length);
  // 注意：`return` 后面必须紧跟表达式；换行会被 ASI 补分号，函数就返回 undefined（踩过）
  return (
    '<main>' +
    `<header><div><a class="back" href="${esc(head.back.href)}">${esc(head.back.text)}</a>` +
    `<p class="kicker">${esc(head.kicker)}</p><h1>${esc(head.h1)}</h1>` +
    (showToggle ? groupToggle(view, mode) : "") + "</div>" +
    `<p class="meta">${head.meta.map(esc).join("<br>")}</p></header>` +
    kpis(view.kpis) +
    // 目录页按类型看时不再重复列一遍模型（顶部「模型」多选就是这份名单，且带配色点）；
    // 切图外壳走全量模式，图例照旧——它是独立图片的配色说明，去掉还会打乱版块序号。
    (options && options.kind ? "" : `<div class="legend">${chips(view.legend)}</div>`) +
    formula(view.formula) +
    kinds.map((block) => kindBlock(block, options ? { ...options, mode } : options)).join("") +
    debtBlock(view.debt) +
    `<footer>${view.notes.map((n) => `<p>${esc(n)}</p>`).join("")}</footer>` +
    "</main>");
}

/* 每个渲染容器存一份状态（同一页可能先后渲染不同期）：主分组由数据的 grouping 决定，
 *  点开关只在 kinds / alt_kinds 之间整块互换，重画进同一个容器。 */
const hostState = new WeakMap();

function activeKindsOf(state) {
  const alt = state.view.alt_kinds ?? [];
  if (!alt.length) return state.view.kinds;
  const primaryMerged = state.view.grouping === "merged";
  if (state.mode === "merged") return primaryMerged ? state.view.kinds : alt;
  return primaryMerged ? alt : state.view.kinds;
}

function paintHost(host) {
  const state = hostState.get(host);
  if (!state) return;
  host.innerHTML = reportHtml({ ...state.view, kinds: activeKindsOf(state) }, state.options, state.mode);
  if (window.VastCharts) window.VastCharts.draw(host);
}

function render(view) {
  // 独立页（切图外壳）走缺省：不显示开关，图片与版块序号保持原样
  const app = document.getElementById("app");
  if (!app) return;
  app.innerHTML = reportHtml(view);
  if (window.VastCharts) window.VastCharts.draw(app);
  // 切图外壳等这个标记：所有条形都在 draw() 里同步画完（animation:false）后才置位，图不会是空白。
  document.documentElement.dataset.reportReady = "1";
}

/** 目录页用：把某期数据渲染进指定容器（同一个渲染器，不再为每期生成 HTML）。
 *  options.grouping（"split" / "merged"）指定初始口径：入口页的「按厂商/按模型」开关经它同步到详情。 */
window.renderReportInto = (target, view, options) => {
  if (!target || !view) return null;
  const fallback = view.grouping === "merged" ? "merged" : "split";
  const mode = options && options.grouping === "merged" ? "merged"
    : options && options.grouping === "split" ? "split" : fallback;
  hostState.set(target, { view, options: options ?? null, mode });
  paintHost(target);
  return target;
};

function boot() {
  // 开关走事件委托（IIFE 里只注册一次）：目录页同页共存 trend.js，顶层重名会整段中止，所以 handler 不挂 window。
  document.addEventListener("click", (event) => {
    const button = event.target && event.target.closest ? event.target.closest("[data-vast-group]") : null;
    if (!button) return;
    const mode = button.getAttribute("data-vast-group");
    if (mode !== "split" && mode !== "merged") return;
    let host = button.parentElement;
    while (host && !hostState.has(host)) host = host.parentElement;
    const state = host ? hostState.get(host) : null;
    if (!state || state.mode === mode || !(state.view.alt_kinds ?? []).length) return;
    state.mode = mode;
    paintHost(host);
  });
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
