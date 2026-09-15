/* 跨周趋势：uPlot 画线。数据来自归档根的 trend.json（同时内嵌在 index.html 里）。
 * 只有一周数据时不画线（uPlot 至少要两个点），改为一句说明。 */

const TREND_METRICS = {
  "每类场次": { unit: " 场", digits: 0 },
  "成立密度（条/次）": { unit: "", digits: 2 },
  "每次花费（$）": { unit: "", digits: 3 },
  "假阳率": { unit: "", digits: 7, percent: true },
};

function trendSeries(trend) {
  const kinds = Object.keys(trend.kinds || {});
  return kinds.map((kind, index) => ({
    label: kind,
    stroke: trend.tones?.[kind] || (index ? "#4f8a8b" : "#6b5b95"),
    width: 2,
    points: { show: true, size: 7 },
  }));
}

// uPlot 要列式数据：[x 数组, 系列1 数组, 系列2 数组, ...]（行式会让它读 undefined.length 崩掉）
function trendRows(trend, metric) {
  const kinds = Object.keys(trend.kinds || {});
  const x = trend.weeks.map((_week, wi) => wi);
  return [x, ...kinds.map((kind) => trend.weeks.map((_week, wi) => trend.kinds[kind]?.[metric]?.[wi] ?? null))];
}

function draw() {
  const node = document.getElementById("trend-data");
  const target = document.getElementById("trend");
  if (!node || !target) return;
  const trend = JSON.parse(node.textContent);
  const weeks = trend.weeks || [];
  if (weeks.length < 2) {
    target.innerHTML = `<p class="trend-note">目前只有 ${weeks.length} 周归档（${weeks.join("、") || "无"}）。` +
      "趋势至少要有两周才画得出——下周生成后这里会自动出现折线。</p>";
    document.documentElement.dataset.trendReady = "1";
    return;
  }
  const labels = trend.labels || weeks;
  const kinds = Object.keys(trend.kinds || {});
  for (const [metric, spec] of Object.entries(TREND_METRICS)) {
    const box = document.createElement("figure");
    box.className = "trend-chart";
    box.innerHTML = `<figcaption>${metric}</figcaption>`;
    const host = document.createElement("div");
    box.appendChild(host);
    target.appendChild(box);
    const values = trendRows(trend, metric).map((row) => row.slice(1)).flat().filter((v) => v !== null);
    const max = Math.max(...values, 0);
    const min = Math.min(...values, 0);
    const pad = (max - min) * 0.15 || 1;
    new uPlot({
      width: 880, height: 190, padding: [10, 12, 0, 0],
      scales: { x: { time: false }, y: { range: [Math.max(0, min - pad), max + pad] } },
      axes: [
        { values: (_u, splits) => splits.map((i) => labels[i] ?? ""), stroke: "#8c857c", grid: { show: false }, font: "11px sans-serif" },
        { stroke: "#8c857c", size: 64, font: "11px sans-serif",
          values: (_u, splits) => splits.map((v) => spec.percent ? `${(v * 100).toFixed(1)}%` : v.toFixed(spec.digits) + spec.unit) },
      ],
      legend: { show: kinds.length > 1 },
      series: [{ label: "周" }, ...trendSeries(trend)],
    }, trendRows(trend, metric), host);
  }
  document.documentElement.dataset.trendReady = "1";
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", draw);
} else {
  draw();
}
