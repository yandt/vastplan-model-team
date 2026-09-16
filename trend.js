
/* 整份包在 IIFE 里：这些资产会同页共存（目录页同时加载 report.js 与 trend.js），
   顶层重名（如 esc）会让后一个脚本整个中止（踩过两次）。 */
(() => {
"use strict";
/* 跨周趋势：Chart.js 画线。数据来自归档根的 trend.json（同时内嵌在 index.html 里）。
 * 画布宽度按卡片实测（写死宽度会撑破版面）；只有一周数据时不画线，改为一句说明。 */

const TREND_METRICS = {
  "每类场次": { unit: " 场", digits: 0, count: true },
  "成立密度（条/次）": { unit: "", digits: 2 },
  "每次花费（$）": { unit: "", digits: 3 },
  "假阳率": { unit: "", digits: 7, percent: true },
};

const CHART_HEIGHT = 180;
const MIN_CHART_WIDTH = 240;
const X_TICKS_MAX = 6;
const READOUT_IDLE = "悬停看具体数值";
const LINE_COLORS = ["#6b5b95", "#4f8a8b", "#b08a3e", "#4a6fa5", "#b0674a", "#a05a76"];

function kindColor(trend, kind, index) {
  return trend.tones?.[kind] || LINE_COLORS[index % LINE_COLORS.length];
}

/** 轴上的短标签（`2026-W37` → `W37`）；完整窗口留给悬停读数。 */
function shortWeek(stamp) {
  const matched = String(stamp ?? "").split("（")[0].match(/(W\d+)$/);
  return matched ? matched[1] : String(stamp ?? "");
}

/** 计数类从 0 起、留顶部余量；比例/金额类贴着实际区间（硬拉 0 会把两条线压成一根）。 */
function yRange(values, spec) {
  const finite = values.filter((value) => value !== null && Number.isFinite(value));
  if (!finite.length) return [0, 1];
  const low = Math.min(...finite);
  const high = Math.max(...finite);
  if (spec.count) return [0, (high || 1) * 1.12];
  if (high === low) {
    const delta = Math.abs(high) * 0.15 || 1;
    return [Math.max(0, low - delta), high + delta];
  }
  const pad = (high - low) * 0.25;
  return [Math.max(0, low - pad), high + pad];
}

function formatValue(value, spec) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  return spec.percent ? `${(value * 100).toFixed(1)}%` : `${value.toFixed(spec.digits)}${spec.unit}`;
}

/** 图例只画一次（每张图下面重复一遍是噪音）。 */
function buildLegend(trend) {
  const legend = document.createElement("p");
  legend.className = "trend-legend";
  for (const [index, kind] of Object.keys(trend.kinds || {}).entries()) {
    const item = document.createElement("span");
    item.className = "lg";
    const chip = document.createElement("i");
    chip.style.background = kindColor(trend, kind, index);
    item.appendChild(chip);
    item.appendChild(document.createTextNode(kind));
    legend.appendChild(item);
  }
  return legend;
}

/** 一张折线卡片：标题 + 悬停读数（固定在卡片右上一行，不用浮层）+ 画布。 */
function buildChart(trend, target, metric, spec, weeks, labels) {
  const box = document.createElement("figure");
  box.className = "trend-chart";
  const caption = document.createElement("figcaption");
  const title = document.createElement("span");
  title.className = "trend-title";
  title.textContent = metric;
  const readout = document.createElement("span");
  readout.className = "trend-readout";
  readout.textContent = READOUT_IDLE;
  caption.appendChild(title);
  caption.appendChild(readout);
  const host = document.createElement("div");
  host.className = "trend-host";
  box.appendChild(caption);
  box.appendChild(host);
  target.appendChild(box);

  const series = Object.keys(trend.kinds || {}).map((kind, index) => ({
    label: kind,
    color: kindColor(trend, kind, index),
    data: weeks.map((_week, wi) => trend.kinds[kind]?.[metric]?.[wi] ?? null),
  }));
  const range = yRange(series.flatMap((entry) => entry.data), spec);
  window.VastCharts.lines(host, {
    height: CHART_HEIGHT, minWidth: MIN_CHART_WIDTH, labels,
    series, yMin: range[0], yMax: range[1], xTicksMax: X_TICKS_MAX,
    yFormat: (value) => formatValue(value, spec),
    xFormat: (label) => shortWeek(label),
    onHover: (index) => {
      if (index === null || index === undefined) {
        readout.textContent = READOUT_IDLE;
        return;
      }
      const parts = series.map((entry) => `${entry.label} ${formatValue(entry.data[index], spec)}`);
      readout.textContent = `${labels[index] ?? weeks[index] ?? ""}｜${parts.join(" · ")}`;
    },
  });
}

function draw() {
  const node = document.getElementById("trend-data");
  const target = document.getElementById("trend");
  if (!node || !target || !window.VastCharts) return;
  const trend = JSON.parse(node.textContent);
  const weeks = trend.weeks || [];
  // 每张图都往 #trend 里塞节点：先清掉外壳里的占位文案，不然它会占掉一个格子
  target.replaceChildren();
  if (weeks.length < 2) {
    target.innerHTML = `<p class="trend-note">目前只有 ${weeks.length} 周归档（${weeks.join("、") || "无"}）。` +
      "趋势至少要有两周才画得出——下周生成后这里会自动出现折线。</p>";
    document.documentElement.dataset.trendReady = "1";
    return;
  }
  const labels = trend.labels || weeks;
  target.appendChild(buildLegend(trend));
  for (const [metric, spec] of Object.entries(TREND_METRICS)) {
    buildChart(trend, target, metric, spec, weeks, labels);
  }
  document.documentElement.dataset.trendReady = "1";
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", draw);
} else {
  draw();
}
})();
