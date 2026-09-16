/* VastCharts：归档站唯一的图表组件（Chart.js v4 UMD，无构建、无依赖注入）。
 * 只暴露 window.VastCharts.bars / .lines / .draw；四个图族都经这里出图。
 * bars 自绘（几何要精确到 1px），lines 仍走 Chart.js。
 *
 * 约定：
 * - bars(host, spec)：把一条/多条细横条画进 host。spec.tracks 自上而下，
 *   每条 track.parts 自左向右堆叠；未占满的余量用灰底补齐。
 * - lines(host, spec)：折线图。labels + series，xFormat/yFormat 控制刻度文案。
 * - scatter(host, spec)：散点图。points:[{x,y,label,color}]，x/y 都是数值轴，附平均参考虚线。
 * - draw(root)：扫描 root 内 [data-vast-bars] 占位（JSON spec）并出图，供报告/榜单批量调用。
 *
 * 画布尺寸按 host 实测（写死宽度会撑破窄屏）；窗口变化时统一重测重画。
 * 整份包在 IIFE 里：归档页同屏加载 report.js / trend.js / index.js，顶层重名会让后一个脚本整个中止。 */
(() => {
"use strict";

const Chart = window.Chart;
if (!Chart) return;

Chart.defaults.font.family =
  '"PingFang SC","Hiragino Sans GB","Noto Sans SC",-apple-system,system-ui,sans-serif';
Chart.defaults.font.size = 11;
Chart.defaults.color = "#8c857c";

const TRACK_BG = "#e9e5df";
const GRID = "#efebe5";
const AXIS = "#e6e1da";
const MUTED = "#8c857c";

/** 活动中的图表记录：窗口 resize 时统一重测重画。 */
const live = new Set();
/** 容器 → 它这一轮画出的图表记录：重复渲染同一容器前先销毁旧的，别让 Chart 实例越积越多。 */
const owned = new WeakMap();

const dpr = () => Math.min(window.devicePixelRatio || 1, 3);
const clamp = (value) => Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));

/** 颜色加透明度：支持 #rgb / #rrggbb / rgb()/rgba()；透明 1 原样返回。 */
function rgba(color, opacity) {
  const value = String(color || "#8a857c");
  if (opacity === undefined || opacity === null || opacity >= 1) return value;
  const alpha = Math.max(0, Math.min(1, opacity));
  let match = /^#([0-9a-f]{3})$/i.exec(value);
  if (match) {
    const hex = match[1];
    return `rgba(${parseInt(hex[0] + hex[0], 16)},${parseInt(hex[1] + hex[1], 16)},${parseInt(hex[2] + hex[2], 16)},${alpha})`;
  }
  match = /^#([0-9a-f]{6})$/i.exec(value);
  if (match) {
    const hex = match[1];
    return `rgba(${parseInt(hex.slice(0, 2), 16)},${parseInt(hex.slice(2, 4), 16)},${parseInt(hex.slice(4, 6), 16)},${alpha})`;
  }
  match = /^rgba?\(([^)]+)\)$/i.exec(value);
  if (match) {
    const parts = match[1].split(",").map((part) => part.trim());
    if (parts.length >= 3) return `rgba(${parts[0]},${parts[1]},${parts[2]},${alpha})`;
  }
  return value;
}

function measure(host, min) {
  const width = Math.round(host.getBoundingClientRect().width) || host.clientWidth || 0;
  return Math.max(min || 1, width);
}

/** 把画布临时缩到 1px 再重测：否则旧画布的 min-content 会把 grid 单元撑住，窗口变窄也缩不回来。 */
function remeasure(host, canvas, min) {
  canvas.style.width = "1px";
  return measure(host, min);
}

function unregister(host) {
  const record = host && host.__vastRecord;
  if (!record) return;
  live.delete(record);
}

function destroyHost(host) {
  if (!host) return;
  unregister(host);
  const chart = host.__vastChart;
  host.__vastChart = null;
  host.__vastRecord = null;
  if (chart) {
    try { chart.destroy(); } catch (_error) { /* 已经销毁过就忽略 */ }
  }
}

function mount(host, height, minWidth) {
  destroyHost(host);
  const width = measure(host, minWidth);
  host.replaceChildren();
  const canvas = document.createElement("canvas");
  canvas.style.display = "block";
  canvas.width = Math.max(1, width);
  canvas.height = Math.max(1, height);
  canvas.style.width = `${Math.max(1, width)}px`;
  canvas.style.height = `${Math.max(1, height)}px`;
  host.appendChild(canvas);
  return { canvas, width, height };
}

function register(host, chart, resize) {
  const record = { host, chart, resize };
  host.__vastChart = chart;
  host.__vastRecord = record;
  live.add(record);
  return chart;
}

/** 一段圆角横条：只给指定端点倒角，栈内相邻两段拼成连续条、交界处不留缺口。
 *  roundRect 的 radii 顺序 [左上,右上,右下,左下]；横条左端＝左上+左下，右端＝右上+右下。 */
function fillSegment(ctx, x, y, width, height, radius, color, roundLeft, roundRight) {
  const limit = Math.max(0, Math.min(radius, width / 2, height / 2));
  const near = roundLeft ? limit : 0;
  const far = roundRight ? limit : 0;
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(x, y, width, height, [near, far, far, near]);
  } else {
    ctx.rect(x, y, width, height);
  }
  ctx.fillStyle = color;
  ctx.fill();
}

/** 细横条：spec = { height?, gap?, bg?, minWidth?, tracks:[{parts:[{value,color,opacity?}]}] }。
 *  自绘几何：第 i 条占 [i*(height+gap), i*(height+gap)+height]，缝恒为 gap；画布高
 *  = count*height + (count-1)*gap。不能用 Chart.js 类目轴：它把条按等分带居中，
 *  带高 = 画布高/条数，与这个画布高公式差半格，条会被挤成 6px、缝涨到 11px。 */
function bars(host, spec) {
  if (!host) return null;
  const options = spec || {};
  const tracks = (options.tracks || []).filter(Boolean);
  const count = Math.max(1, tracks.length);
  const barHeight = Number(options.height) || 11;
  const gap = options.gap === undefined ? 1 : Number(options.gap);
  const height = count * barHeight + (count - 1) * gap;
  const minWidth = options.minWidth || 1;
  const bg = options.bg || TRACK_BG;

  destroyHost(host);
  host.replaceChildren();
  const width = measure(host, minWidth);
  const canvas = document.createElement("canvas");
  canvas.style.display = "block";
  host.appendChild(canvas);

  const paint = (cssWidth) => {
    const ratio = dpr();
    canvas.width = Math.max(1, Math.round(cssWidth * ratio));
    canvas.height = Math.max(1, Math.round(height * ratio));
    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, cssWidth, height);
    tracks.forEach((track, index) => {
      const segments = (track.parts || [])
        .filter((part) => part && clamp(part.value) > 0)
        .map((part) => ({ width: (clamp(part.value) / 100) * cssWidth, color: rgba(part.color, part.opacity) }));
      const used = (track.parts || []).reduce((sum, part) => sum + clamp(part && part.value), 0);
      const rest = clamp(100 - used);
      if (rest > 0) segments.push({ width: (rest / 100) * cssWidth, color: bg });
      if (!segments.length) return;
      const y = index * (barHeight + gap);
      let x = 0;
      segments.forEach((segment, position) => {
        const room = cssWidth - x;
        if (room <= 0) return;
        fillSegment(ctx, x, y, Math.min(room, segment.width), barHeight, 2, segment.color,
          position === 0, position === segments.length - 1);
        x += segment.width;
      });
    });
  };
  paint(width);

  const renderer = {
    destroy() {
      canvas.width = 1;
      canvas.height = 1;
    },
    resize() {
      paint(remeasure(host, canvas, minWidth));
    },
  };
  return register(host, renderer, () => renderer.resize());
}

/** 折线：spec = { height?, minWidth?, labels, series:[{label,color,data}], yMin?, yMax?,
 *  yFormat?, xFormat?, onHover? }。 */
function lines(host, spec) {
  if (!host) return null;
  const options = spec || {};
  const height = Number(options.height) || 180;
  const minWidth = options.minWidth || 240;
  const { canvas } = mount(host, height, minWidth);

  const datasets = (options.series || []).map((series) => ({
    label: series.label,
    data: series.data || [],
    borderColor: series.color,
    backgroundColor: series.color,
    borderWidth: 2,
    pointRadius: 3.5,
    pointHoverRadius: 5,
    pointBackgroundColor: "#fff",
    pointBorderColor: series.color,
    pointBorderWidth: 2,
    spanGaps: true,
    tension: 0,
  }));

  const yScale = {
    grid: { color: GRID, drawTicks: false },
    border: { display: false },
    ticks: { color: MUTED, font: { size: 11 }, maxTicksLimit: 6, padding: 4 },
  };
  if (Number.isFinite(options.yMin)) yScale.min = options.yMin;
  if (Number.isFinite(options.yMax)) yScale.max = options.yMax;
  if (options.yFormat) yScale.ticks.callback = (value) => options.yFormat(value);

  const xScale = {
    offset: true,
    grid: { display: false },
    border: { color: AXIS },
    ticks: {
      color: MUTED, font: { size: 11 }, maxRotation: 0,
      autoSkip: true, maxTicksLimit: options.xTicksMax || 6, padding: 4,
    },
  };
  if (options.xFormat) xScale.ticks.callback = (value) => options.xFormat(value);

  const chart = new Chart(canvas, {
    type: "line",
    data: { labels: options.labels || [], datasets },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      animation: false,
      devicePixelRatio: dpr(),
      layout: { padding: { top: 8, right: 8, bottom: 0, left: 0 } },
      scales: { x: xScale, y: yScale },
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      interaction: { mode: "index", intersect: false },
      onHover: (_event, elements) => {
        if (options.onHover) options.onHover(elements && elements.length ? elements[0].index : null);
      },
    },
  });
  if (options.onHover) options.onHover(null);
  return register(host, chart, () => {
    chart.resize(remeasure(host, canvas, minWidth), height);
  });
}

/** 散点：spec = { height?, minWidth?, points:[{x,y,label,color}], xLabel?, yLabel?,
 *  xFormat?, yFormat?, avgX?, avgY? }。x 轴＝每次花费（$），y 轴＝综合得分；
 *  平均线（有数据才画）用虚线参考，点色＝模型 tone。 */
function scatter(host, spec) {
  if (!host) return null;
  const options = spec || {};
  const height = Number(options.height) || 220;
  const minWidth = options.minWidth || 240;
  const { canvas } = mount(host, height, minWidth);
  const points = (options.points || [])
    .filter((point) => point && Number.isFinite(point.x) && Number.isFinite(point.y));

  const datasets = [{
    label: options.label || "模型",
    data: points.map((point) => ({ x: point.x, y: point.y, label: point.label })),
    backgroundColor: points.map((point) => point.color || "#8a857c"),
    borderColor: "#fff",
    borderWidth: 1.5,
    pointRadius: 5,
    pointHoverRadius: 7,
  }];
  const mean = (values) => (values.length
    ? values.reduce((sum, value) => sum + value, 0) / values.length : undefined);
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const avgX = Number.isFinite(options.avgX) ? options.avgX : mean(xs);
  const avgY = Number.isFinite(options.avgY) ? options.avgY : mean(ys);
  const reference = (data) => ({
    label: "", isRef: true, data,
    borderColor: rgba(MUTED, 0.5), borderWidth: 1, borderDash: [4, 4],
    pointRadius: 0, pointHoverRadius: 0, showLine: true,
  });
  if (points.length > 1 && Number.isFinite(avgX)) {
    datasets.push(reference([{ x: avgX, y: Math.min(...ys) }, { x: avgX, y: Math.max(...ys) }]));
  }
  if (points.length > 1 && Number.isFinite(avgY)) {
    datasets.push(reference([{ x: Math.min(...xs), y: avgY }, { x: Math.max(...xs), y: avgY }]));
  }

  const axis = (title, format) => {
    const scale = {
      type: "linear",
      grid: { color: GRID, drawTicks: false },
      border: { color: AXIS },
      ticks: { color: MUTED, font: { size: 11 }, padding: 4, maxTicksLimit: 6 },
      title: { display: true, text: title, color: MUTED, font: { size: 11 }, padding: { top: 2, bottom: 2 } },
    };
    if (format) scale.ticks.callback = (value) => format(value);
    return scale;
  };

  const chart = new Chart(canvas, {
    type: "scatter",
    data: { datasets },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      animation: false,
      devicePixelRatio: dpr(),
      layout: { padding: { top: 8, right: 12, bottom: 0, left: 0 } },
      scales: {
        x: axis(options.xLabel || "每次花费（$）", options.xFormat),
        y: axis(options.yLabel || "综合得分", options.yFormat),
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          displayColors: false,
          filter: (item) => !item.dataset.isRef,
          callbacks: {
            label: (item) => {
              const raw = item.raw || {};
              return `${raw.label || ""} · 每次花费 $${Number(raw.x).toFixed(2)} · 综合 ${raw.y}`;
            },
          },
        },
      },
    },
  });
  return register(host, chart, () => {
    chart.resize(remeasure(host, canvas, minWidth), height);
  });
}

/** 批量出图：root 内所有带 data-vast-bars 的占位（JSON spec）。 */
function draw(root) {
  if (!root) return [];
  const previous = owned.get(root);
  if (previous) previous.forEach((host) => destroyHost(host));
  const hosts = [];
  root.querySelectorAll("[data-vast-bars]").forEach((host) => {
    let spec;
    try {
      spec = JSON.parse(host.dataset.vastBars || "{}");
    } catch (_error) {
      spec = null;
    }
    if (!spec) return;
    bars(host, spec);
    if (host.__vastChart) hosts.push(host);
  });
  owned.set(root, hosts);
  return hosts.map((host) => host.__vastChart);
}

let frame = 0;
window.addEventListener("resize", () => {
  if (frame) cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    frame = 0;
    for (const record of [...live]) {
      if (!record.host.isConnected) {
        unregister(record.host);
        continue;
      }
      try {
        record.resize();
      } catch (_error) { /* 单张图重画失败不该拖垮整页 */ }
    }
  });
});

window.VastCharts = { bars, lines, scatter, draw };
})();
