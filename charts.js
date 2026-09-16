/* VastCharts：归档站唯一的图表组件（Chart.js v4 UMD，无构建、无依赖注入）。
 * 只暴露 window.VastCharts.bars / .lines / .draw；四个图族都经这里出图。
 *
 * 约定：
 * - bars(host, spec)：把一条/多条细横条画进 host。spec.tracks 自上而下，
 *   每条 track.parts 自左向右堆叠；未占满的余量用灰底补齐。
 * - lines(host, spec)：折线图。labels + series，xFormat/yFormat 控制刻度文案。
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

/** 细横条：spec = { height?, gap?, bg?, minWidth?, tracks:[{parts:[{value,color,opacity?}]}] }。 */
function bars(host, spec) {
  if (!host) return null;
  const options = spec || {};
  const tracks = (options.tracks || []).filter(Boolean);
  const count = Math.max(1, tracks.length);
  const barHeight = Number(options.height) || 9;
  const gap = options.gap === undefined ? 3 : Number(options.gap);
  const height = count * barHeight + (count - 1) * gap;
  const minWidth = options.minWidth || 1;
  const { canvas } = mount(host, height, minWidth);

  const maxParts = tracks.reduce((most, track) => Math.max(most, (track.parts || []).length), 0);
  const datasets = [];
  for (let index = 0; index < maxParts; index += 1) {
    datasets.push({
      data: tracks.map((track) => {
        const part = (track.parts || [])[index];
        return part ? clamp(part.value) : null;
      }),
      backgroundColor: tracks.map((track) => {
        const part = (track.parts || [])[index];
        return part ? rgba(part.color, part.opacity) : "transparent";
      }),
      stack: "vast",
      barThickness: barHeight,
      borderRadius: 2,
      borderSkipped: false,
    });
  }
  datasets.push({
    data: tracks.map((track) => {
      const used = (track.parts || []).reduce((sum, part) => sum + clamp(part.value), 0);
      return clamp(100 - used);
    }),
    backgroundColor: options.bg || TRACK_BG,
    stack: "vast",
    barThickness: barHeight,
    borderRadius: 2,
    borderSkipped: false,
  });

  const chart = new Chart(canvas, {
    type: "bar",
    data: { labels: tracks.map((_track, index) => String(index)), datasets },
    options: {
      indexAxis: "y",
      responsive: false,
      maintainAspectRatio: false,
      animation: false,
      devicePixelRatio: dpr(),
      events: [],
      layout: { padding: 0 },
      datasets: { bar: { categoryPercentage: barHeight / (barHeight + gap), barPercentage: 1 } },
      scales: {
        x: { display: false, stacked: true, min: 0, max: 100 },
        y: { display: false, stacked: true, offset: false },
      },
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
    },
  });
  return register(host, chart, () => {
    chart.resize(remeasure(host, canvas, minWidth), height);
  });
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

window.VastCharts = { bars, lines, draw };
})();
