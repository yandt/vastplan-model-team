/* 由 src/scoring.ts 编译生成（writeAssets）；浏览器与 Node 共用同一份引擎，不要手改。 */
(function () {
/** min-max 归一：跨度为零时给中位 50（与 Python `_scale` 一致）。 */
function scale(value, lo, hi) {
    return hi <= lo ? 50 : ((value - lo) / (hi - lo)) * 100;
}
/** 按样本门槛切分：达标进排名，不足进观察区。 */
function splitByThreshold(models, minSessions) {
    const eligible = [];
    const benched = [];
    for (const model of models)
        (model.sessions >= minSessions ? eligible : benched).push(model);
    return { eligible, benched };
}
/** 综合分：各轴在**参评集合内** min-max 归一后按权重加权；缺轴按中性分记。 */
function compositeScores(models, config) {
    const spans = {};
    for (const axis of config.axes) {
        const values = models
            .map((model) => model.values[axis.key])
            .filter((value) => value !== null && value !== undefined);
        spans[axis.key] = values.length ? [Math.min(...values), Math.max(...values)] : [0, 0];
    }
    const scored = models.map((model) => {
        const parts = {};
        for (const axis of config.axes) {
            const value = model.values[axis.key];
            if (value === null || value === undefined) {
                parts[axis.key] = config.neutral_part;
                continue;
            }
            const [lo, hi] = spans[axis.key];
            const scaled = scale(value, lo, hi);
            parts[axis.key] = axis.invert ? 100 - scaled : scaled;
        }
        const score = config.axes.reduce((sum, axis) => sum + parts[axis.key] * axis.weight, 0);
        return { key: model.key, score, parts };
    });
    scored.sort((left, right) => (right.score - left.score) || (left.key < right.key ? -1 : left.key > right.key ? 1 : 0));
    return scored;
}

window.VastScoring = { scale: scale, splitByThreshold: splitByThreshold, compositeScores: compositeScores };
})();
