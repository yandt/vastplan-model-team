[← 回到归档目录](../../index.html)

# 模型团队周报 · 2026 年第 38 周（进行中）（2026-W38）

- 本窗：**2026-09-14 → 2026-09-21**；环比上一期：**2026-09-07 → 2026-09-14**
- 综合能力评分（表格「综合」列）：效果 30% ｜ 覆盖 25% ｜ 独立 20% ｜ 时间 10%↓ ｜ 花费 5%↓ ｜ token 10%↓
- 评分口径：6 项按权重（30% 效果 + 25% 覆盖 + 20% 独立 + 10% 时间 + 5% 花费 + 10% token）在同活动类型内 min-max 归一到 0～100 后加权：效果（均质量）、覆盖（同名问题去重后的重要性加权成立数 ÷ 所参与轮次全场去重合计）、独立（独有（重要性加权）/ 成立（重要性加权））、时间（每次分钟，越快越好）、花费（每次花费，越省越好）、token（每条成立 token，越省越好）；某项没采集到时（如订阅制模型没有金额）该轴按中位 50 记，并在评论里标注。效率分（成立重要性÷耗时）只作参考列，不进综合分。
- 口径：失败（退出码≠0/超时）与未评行不计入对照、花费照计；模型名按别名表归一。

## 事后审计

| 指标 | 本期 | 上期 | 环比 |
|---|---:|---:|---:|
| 重要性5/4/3/2/1 | 44/97/147/63/12 | 84/125/141/110/21 | — |
| 场次 | 29 | 46 | -17 |
| 已评成功行 | 227 | 307 | -80 |
| 成立缺陷/方向 | 363 | 481 | -118 |
| 独有成立 | 114 | 215 | -101 |
| 假阳性 | 139 | 127 | +12 |
| 已评花费 $ | 93.01 | 141.34 | -48.33 |
| 未采集金额行 | 0 | 1 | -1 |
| 全部花费 $ | 96.34 | 151.98 | -55.64 |
| 输入 token | 28,811,833 | 45,392,097 | -16580264 |
| 输出 token | 5,432,401 | 7,129,138 | -1696737 |
| 缓存读 token | 404,182,592 | 535,299,260 | -131116668 |
| 缓存写 token | 0 | 0 | +0 |
| token 合计 | 438,426,826 | 587,820,495 | -149393669 |
| 平均每次耗时 分钟 | 7.7 | 7.1 | +0.6 |
| 缓存命中率 % | 93.3 | 92.2 | +1.2 |

| # | 模型 | 思考 | 综合 | 场(本/上) | 均质量(本/上/Δ) | 成立(本/上) | 独有 | 假阳 | 准确率 | 花费$(本/上) | 效率 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | DeepSeek V4.1 Flash（high） | high | 88.9 | 11/0 | 6.5/0.0/+6.5 | 24/0 | 10 | 8 | 75% | 1.07/0.00 | 1.17 |
| 2 | DeepSeek V4.1 Flash（max） | max | 84.2 | 25/19 | 7.4/8.2/-0.8 | 53/46 | 21 | 15 | 78% | 17.38/6.61 | 1.05 |
| 3 | Muse Spark 1.3 Contributor | xhigh | 81.1 | 28/14 | 4.8/5.2/-0.5 | 58/22 | 21 | 31 | 65% | 0.33/0.12 | 3.05 |
| 4 | GLM-5.3 | max | 67.8 | 28/43 | 4.5/5.3/-0.8 | 43/73 | 13 | 14 | 75% | 12.16/17.91 | 0.84 |
| 5 | K3 方舟 Agent Plan | max | 66.9 | 28/29 | 4.9/5.9/-1.0 | 49/49 | 15 | 15 | 77% | 16.51/16.31 | 0.72 |
| 6 | Grok 4.6 Extra High | xhigh | 63.2 | 25/40 | 4.8/7.2/-2.4 | 38/70 | 9 | 11 | 78% | 33.89/45.96 | 0.72 |
| 7 | GLM-5.3-Flash | max | 62.6 | 28/40 | 4.9/5.7/-0.8 | 45/59 | 12 | 9 | 83% | 0.91/1.05 | 0.50 |
| 8 | DeepSeek V4 Flash | max | 60.7 | 23/35 | 4.5/3.8/+0.7 | 37/41 | 8 | 11 | 77% | 6.08/6.53 | 0.60 |
| 9 | MiMo V2.5 Pro | max | 41.3 | 28/35 | -0.7/0.7/-1.4 | 14/18 | 5 | 24 | 37% | 0.93/1.11 | 0.66 |
| 10※ | Gemini 3.8 Flash | high | 16.6 | 3/38 | 1.7/6.0/-4.3 | 2/77 | 0 | 1 | 67% | 3.74/32.67 | 0.32 |

※ 本期样本 < 5 场，结论打折；主力（≥5 场）第一：DeepSeek V4.1 Flash（high）（综合 88.9）

**分项排名（各自口径，从优到差）**

- **产出 · 平均质量分**：1. DeepSeek V4.1 Flash（max）（7.4）、2. DeepSeek V4.1 Flash（high）（6.5）、3. K3 方舟 Agent Plan（4.9）、4. GLM-5.3-Flash（4.9）、5. Grok 4.6 Extra High（4.8）、6. Muse Spark 1.3 Contributor（4.8）、7. GLM-5.3（4.5）、8. DeepSeek V4 Flash（4.5）、9. Gemini 3.8 Flash（1.7）、10. MiMo V2.5 Pro（-0.7）
- **精准 · 准确率**：1. GLM-5.3-Flash（83%）、2. DeepSeek V4.1 Flash（max）（78%）、3. Grok 4.6 Extra High（78%）、4. DeepSeek V4 Flash（77%）、5. K3 方舟 Agent Plan（77%）、6. GLM-5.3（75%）、7. DeepSeek V4.1 Flash（high）（75%）、8. Gemini 3.8 Flash（67%）、9. Muse Spark 1.3 Contributor（65%）、10. MiMo V2.5 Pro（37%）
- **覆盖 · 重要性加权占参与轮次**：1. DeepSeek V4.1 Flash（max）（36%）、2. DeepSeek V4.1 Flash（high）（35%）、3. Muse Spark 1.3 Contributor（30%）、4. K3 方舟 Agent Plan（27%）、5. Grok 4.6 Extra High（26%）、6. DeepSeek V4 Flash（26%）、7. GLM-5.3（25%）、8. GLM-5.3-Flash（25%）、9. Gemini 3.8 Flash（13%）、10. MiMo V2.5 Pro（8%）
- **独立 · 独有占比（重要性加权）**：1. DeepSeek V4.1 Flash（high）（40%）、2. MiMo V2.5 Pro（40%）、3. DeepSeek V4.1 Flash（max）（36%）、4. Muse Spark 1.3 Contributor（33%）、5. GLM-5.3（31%）、6. K3 方舟 Agent Plan（30%）、7. Grok 4.6 Extra High（28%）、8. GLM-5.3-Flash（25%）、9. DeepSeek V4 Flash（24%）、10. Gemini 3.8 Flash（0%）
- **性价比 · 效率分**：1. Muse Spark 1.3 Contributor（3.05）、2. DeepSeek V4.1 Flash（high）（1.17）、3. DeepSeek V4.1 Flash（max）（1.05）、4. GLM-5.3（0.84）、5. K3 方舟 Agent Plan（0.72）、6. Grok 4.6 Extra High（0.72）、7. MiMo V2.5 Pro（0.66）、8. DeepSeek V4 Flash（0.60）、9. GLM-5.3-Flash（0.50）、10. Gemini 3.8 Flash（0.32）
- **执行时间 · 平均每次分钟**：1. Muse Spark 1.3 Contributor（2.5）、2. MiMo V2.5 Pro（5.0）、3. DeepSeek V4.1 Flash（high）（6.6）、4. GLM-5.3（6.9）、5. Grok 4.6 Extra High（7.9）、6. Gemini 3.8 Flash（8.9）、7. K3 方舟 Agent Plan（9.4）、8. DeepSeek V4 Flash（9.9）、9. DeepSeek V4.1 Flash（max）（10.2）、10. GLM-5.3-Flash（11.0）
- **Token · 每条成立千枚**：1. Muse Spark 1.3 Contributor（305.9）、2. K3 方舟 Agent Plan（463.5）、3. GLM-5.3（741.3）、4. MiMo V2.5 Pro（743.4）、5. GLM-5.3-Flash（973.1）、6. Grok 4.6 Extra High（1,147.8）、7. DeepSeek V4 Flash（1,815.0）、8. DeepSeek V4.1 Flash（high）（1,968.4）、9. DeepSeek V4.1 Flash（max）（2,455.2）、10. Gemini 3.8 Flash（11,881.5）
- **缓存命中率**：1. DeepSeek V4.1 Flash（max）（98%）、2. DeepSeek V4.1 Flash（high）（98%）、3. GLM-5.3-Flash（95%）、4. GLM-5.3（95%）、5. K3 方舟 Agent Plan（93%）、6. Gemini 3.8 Flash（91%）、7. MiMo V2.5 Pro（90%）、8. Muse Spark 1.3 Contributor（87%）、9. Grok 4.6 Extra High（87%）、10. DeepSeek V4 Flash（86%）
- **成立密度 · 每次（越多越好）**：1. DeepSeek V4.1 Flash（high）（2.18）、2. DeepSeek V4.1 Flash（max）（2.12）、3. Muse Spark 1.3 Contributor（2.07）、4. K3 方舟 Agent Plan（1.75）、5. DeepSeek V4 Flash（1.61）、6. GLM-5.3-Flash（1.61）、7. GLM-5.3（1.54）、8. Grok 4.6 Extra High（1.52）、9. Gemini 3.8 Flash（0.67）、10. MiMo V2.5 Pro（0.50）
- **生成速度 · 每秒 token（输出）**：1. Gemini 3.8 Flash（99.0）、2. DeepSeek V4.1 Flash（high）（94.9）、3. Muse Spark 1.3 Contributor（85.2）、4. DeepSeek V4.1 Flash（max）（66.4）、5. DeepSeek V4 Flash（62.9）、6. MiMo V2.5 Pro（62.6）、7. Grok 4.6 Extra High（54.8）、8. GLM-5.3（43.0）、9. GLM-5.3-Flash（31.0）、10. K3 方舟 Agent Plan（24.3）
- **每条成立花费（越低越省）**：1. Muse Spark 1.3 Contributor（$0.01）、2. GLM-5.3-Flash（$0.02）、3. DeepSeek V4.1 Flash（high）（$0.04）、4. MiMo V2.5 Pro（$0.07）、5. DeepSeek V4 Flash（$0.16）、6. GLM-5.3（$0.28）、7. DeepSeek V4.1 Flash（max）（$0.33）、8. K3 方舟 Agent Plan（$0.34）、9. Grok 4.6 Extra High（$0.89）、10. Gemini 3.8 Flash（$1.87）
- **每次花费（越低越省）**：1. Muse Spark 1.3 Contributor（$0.01）、2. GLM-5.3-Flash（$0.03）、3. MiMo V2.5 Pro（$0.03）、4. DeepSeek V4.1 Flash（high）（$0.10）、5. DeepSeek V4 Flash（$0.26）、6. GLM-5.3（$0.43）、7. K3 方舟 Agent Plan（$0.59）、8. DeepSeek V4.1 Flash（max）（$0.70）、9. Gemini 3.8 Flash（$1.25）、10. Grok 4.6 Extra High（$1.36）

**模型评论（按综合分）**

1. **DeepSeek V4.1 Flash（high）**（综合 88.9）— 长处：独立相对最好（独有占比 40%）；短处：无突出短板
2. **DeepSeek V4.1 Flash（max）**（综合 84.2）— 长处：产出最高（均质量 7.4）、抓得最全（重要性加权占参与轮次 36%）、缓存命中最高（98%）；短处：时间相对最弱（每次 10.2 分钟）
3. **Muse Spark 1.3 Contributor**（综合 81.1）— 长处：效率分最高（成立重要性÷耗时 3.05）、每条成立最便宜（$0.01）、最快（每次 2.5 分钟，档位 xhigh）、每条成立最省 token（306 千）；短处：效果相对最弱（均质量 4.8）
4. **GLM-5.3**（综合 67.8）— 长处：token相对最好（每条成立 741 千）；短处：无突出短板
5. **K3 方舟 Agent Plan**（综合 66.9）— 长处：token相对最好（每条成立 464 千）；短处：时间相对最弱（每次 9.4 分钟）
6. **Grok 4.6 Extra High**（综合 63.2）— 长处：各项居中（均质量 4.8、准确率 78%）；短处：花费相对最弱（每次 $1.36）
7. **GLM-5.3-Flash**（综合 62.6）— 长处：最准（83%）；短处：最慢（每次 11.0 分钟，档位 max）
8. **DeepSeek V4 Flash**（综合 60.7）— 长处：各项居中（均质量 4.5、准确率 77%）；短处：时间相对最弱（每次 9.9 分钟）
9. **MiMo V2.5 Pro**（综合 41.3）— 长处：花费相对最好（每次 $0.03）；短处：假阳最多（每次 0.86 条，准确率 37%）、均质量垫底（-0.7）
10. **Gemini 3.8 Flash**（综合 16.6）— 长处：各项居中（均质量 1.7、准确率 67%）；短处：每条成立最贵（$1.87）、每条成立最耗 token（11,881 千）、样本少（3 场，结论打折）

## 设计分叉

| 指标 | 本期 | 上期 | 环比 |
|---|---:|---:|---:|
| 重要性5/4/3/2/1 | 131/96/58/3/0 | 166/122/72/7/0 | — |
| 场次 | 19 | 25 | -6 |
| 已评成功行 | 139 | 167 | -28 |
| 成立缺陷/方向 | 288 | 367 | -79 |
| 独有成立 | 102 | 121 | -19 |
| 假阳性 | 33 | 18 | +15 |
| 已评花费 $ | 9.16 | 14.21 | -5.05 |
| 未采集金额行 | 0 | 0 | +0 |
| 全部花费 $ | 9.83 | 14.21 | -4.38 |
| 输入 token | 2,835,467 | 3,679,950 | -844483 |
| 输出 token | 875,470 | 821,713 | +53757 |
| 缓存读 token | 5,358,774 | 6,901,888 | -1543114 |
| 缓存写 token | 0 | 210,405 | -210405 |
| token 合计 | 9,069,711 | 11,613,956 | -2544245 |
| 平均每次耗时 分钟 | 2.1 | 1.8 | +0.3 |
| 缓存命中率 % | 65.4 | 65.2 | +0.2 |

| # | 模型 | 思考 | 综合 | 场(本/上) | 均质量(本/上/Δ) | 成立(本/上) | 独有 | 假阳 | 准确率 | 花费$(本/上) | 契合(本/上) |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | K3 方舟 Agent Plan | max | 91.9 | 18/18 | 23.7/23.9/-0.3 | 55/55 | 31 | 7 | 89% | 1.53/1.29 | 4.53/4.69 |
| 2 | Grok 4.6 Extra High | xhigh | 69.1 | 16/20 | 23.8/22.1/+1.7 | 49/56 | 25 | 4 | 92% | 5.55/5.97 | 4.47/4.33 |
| 3※ | Gemini 3.8 Flash | high | 65.5 | 3/20 | 18.0/17.8/+0.2 | 6/45 | 0 | 0 | 100% | 0.09/0.93 | 4.67/4.00 |
| 4 | Muse Spark 1.3 Contributor | xhigh | 65.3 | 17/7 | 16.4/10.1/+6.3 | 31/4 | 10 | 1 | 97% | 0.04/0.02 | 4.33/3.71 |
| 5 | DeepSeek V4.1 Flash（max） | max | 60.2 | 17/9 | 16.1/12.2/+3.9 | 32/11 | 8 | 2 | 94% | 0.65/0.24 | 4.40/3.33 |
| 6 | GLM-5.3 | max | 57.5 | 17/21 | 17.1/16.6/+0.5 | 34/46 | 10 | 4 | 89% | 0.88/0.86 | 4.38/3.79 |
| 7 | GLM-5.3-Flash | max | 50.8 | 17/21 | 15.5/15.2/+0.3 | 31/42 | 7 | 3 | 91% | 0.05/0.05 | 4.20/3.88 |
| 8 | DeepSeek V4 Flash | max | 50.4 | 16/21 | 14.9/15.2/-0.3 | 30/43 | 7 | 2 | 94% | 0.27/0.26 | 3.92/4.07 |
| 9 | MiMo V2.5 Pro | max | 44.5 | 16/18 | 10.7/9.1/+1.6 | 20/24 | 4 | 10 | 67% | 0.08/0.10 | 3.60/2.81 |
| 10※ | DeepSeek V4.1 Flash（high） | high | 24.9 | 2/0 | 6.0/0.0/+6.0 | 0/0 | 0 | 0 | 0% | 0.02/0.00 | 3.00/0.00 |

※ 本期样本 < 5 场，结论打折；主力（≥5 场）第一：K3 方舟 Agent Plan（综合 91.9）

**分项排名（各自口径，从优到差）**

- **产出 · 平均质量分**：1. Grok 4.6 Extra High（23.8）、2. K3 方舟 Agent Plan（23.7）、3. Gemini 3.8 Flash（18.0）、4. GLM-5.3（17.1）、5. Muse Spark 1.3 Contributor（16.4）、6. DeepSeek V4.1 Flash（max）（16.1）、7. GLM-5.3-Flash（15.5）、8. DeepSeek V4 Flash（14.9）、9. MiMo V2.5 Pro（10.7）、10. DeepSeek V4.1 Flash（high）（6.0）
- **精准 · 准确率**：1. Gemini 3.8 Flash（100%）、2. Muse Spark 1.3 Contributor（97%）、3. DeepSeek V4.1 Flash（max）（94%）、4. DeepSeek V4 Flash（94%）、5. Grok 4.6 Extra High（92%）、6. GLM-5.3-Flash（91%）、7. GLM-5.3（89%）、8. K3 方舟 Agent Plan（89%）、9. MiMo V2.5 Pro（67%）、10. DeepSeek V4.1 Flash（high）（0%）
- **覆盖 · 重要性加权占参与轮次**：1. Gemini 3.8 Flash（47%）、2. K3 方舟 Agent Plan（43%）、3. Grok 4.6 Extra High（41%）、4. GLM-5.3（27%）、5. DeepSeek V4.1 Flash（max）（25%）、6. GLM-5.3-Flash（25%）、7. DeepSeek V4 Flash（25%）、8. Muse Spark 1.3 Contributor（25%）、9. MiMo V2.5 Pro（19%）、10. DeepSeek V4.1 Flash（high）（0%）
- **独立 · 独有占比（重要性加权）**：1. K3 方舟 Agent Plan（56%）、2. Grok 4.6 Extra High（48%）、3. Muse Spark 1.3 Contributor（31%）、4. GLM-5.3（28%）、5. MiMo V2.5 Pro（24%）、6. DeepSeek V4.1 Flash（max）（23%）、7. DeepSeek V4 Flash（22%）、8. GLM-5.3-Flash（21%）、9. Gemini 3.8 Flash（0%）、10. DeepSeek V4.1 Flash（high）（0%）
- **性价比 · 效率分**：1. DeepSeek V4.1 Flash（max）（15.50）、2. Muse Spark 1.3 Contributor（11.56）、3. K3 方舟 Agent Plan（9.00）、4. Gemini 3.8 Flash（8.33）、5. MiMo V2.5 Pro（6.17）、6. DeepSeek V4 Flash（4.46）、7. Grok 4.6 Extra High（4.26）、8. GLM-5.3（2.93）、9. GLM-5.3-Flash（2.92）、10. DeepSeek V4.1 Flash（high）（0.00）
- **执行时间 · 平均每次分钟**：1. DeepSeek V4.1 Flash（high）（0.5）、2. DeepSeek V4.1 Flash（max）（0.6）、3. Muse Spark 1.3 Contributor（0.7）、4. Gemini 3.8 Flash（1.0）、5. MiMo V2.5 Pro（1.2）、6. K3 方舟 Agent Plan（1.7）、7. GLM-5.3（3.2）、8. DeepSeek V4 Flash（3.2）、9. Grok 4.6 Extra High（3.4）、10. GLM-5.3-Flash（3.4）
- **Token · 每条成立千枚**：1. K3 方舟 Agent Plan（5.4）、2. Muse Spark 1.3 Contributor（10.0）、3. GLM-5.3（11.3）、4. GLM-5.3-Flash（11.9）、5. DeepSeek V4 Flash（13.5）、6. Gemini 3.8 Flash（25.6）、7. DeepSeek V4.1 Flash（max）（27.6）、8. MiMo V2.5 Pro（49.3）、9. Grok 4.6 Extra High（105.9）
- **缓存命中率**：1. MiMo V2.5 Pro（91%）、2. Grok 4.6 Extra High（73%）、3. DeepSeek V4 Flash（65%）、4. DeepSeek V4.1 Flash（max）（64%）、5. DeepSeek V4.1 Flash（high）（60%）、6. Gemini 3.8 Flash（37%）、7. GLM-5.3（34%）、8. Muse Spark 1.3 Contributor（1%）、9. K3 方舟 Agent Plan（0%）、10. GLM-5.3-Flash（0%）
- **成立密度 · 每次（越多越好）**：1. Grok 4.6 Extra High（3.06）、2. K3 方舟 Agent Plan（3.06）、3. Gemini 3.8 Flash（2.00）、4. GLM-5.3（2.00）、5. DeepSeek V4.1 Flash（max）（1.88）、6. DeepSeek V4 Flash（1.88）、7. GLM-5.3-Flash（1.82）、8. Muse Spark 1.3 Contributor（1.82）、9. MiMo V2.5 Pro（1.25）、10. DeepSeek V4.1 Flash（high）（0.00）
- **生成速度 · 每秒 token（输出）**：1. DeepSeek V4.1 Flash（high）（145.2）、2. DeepSeek V4.1 Flash（max）（139.6）、3. Muse Spark 1.3 Contributor（94.4）、4. DeepSeek V4 Flash（56.0）、5. Grok 4.6 Extra High（49.4）、6. GLM-5.3（45.3）、7. GLM-5.3-Flash（36.8）、8. MiMo V2.5 Pro（36.2）、9. Gemini 3.8 Flash（30.7）、10. K3 方舟 Agent Plan（29.5）
- **每条成立花费（越低越省）**：1. Muse Spark 1.3 Contributor（$0.00）、2. GLM-5.3-Flash（$0.00）、3. MiMo V2.5 Pro（$0.00）、4. DeepSeek V4 Flash（$0.01）、5. Gemini 3.8 Flash（$0.02）、6. DeepSeek V4.1 Flash（max）（$0.02）、7. GLM-5.3（$0.03）、8. K3 方舟 Agent Plan（$0.03）、9. Grok 4.6 Extra High（$0.11）
- **每次花费（越低越省）**：1. Muse Spark 1.3 Contributor（$0.00）、2. GLM-5.3-Flash（$0.00）、3. MiMo V2.5 Pro（$0.00）、4. DeepSeek V4.1 Flash（high）（$0.01）、5. DeepSeek V4 Flash（$0.02）、6. Gemini 3.8 Flash（$0.03）、7. DeepSeek V4.1 Flash（max）（$0.04）、8. GLM-5.3（$0.05）、9. K3 方舟 Agent Plan（$0.09）、10. Grok 4.6 Extra High（$0.35）

**模型评论（按综合分）**

1. **K3 方舟 Agent Plan**（综合 91.9）— 长处：每条成立最省 token（5 千）；短处：时间相对最弱（每次 1.7 分钟）
2. **Grok 4.6 Extra High**（综合 69.1）— 长处：产出最高（均质量 23.8）；短处：每条成立最贵（$0.11）、每条成立最耗 token（106 千）
3. **Gemini 3.8 Flash**（综合 65.5）— 长处：最准（100%）、抓得最全（重要性加权占参与轮次 47%）、方向契合最高（4.67）；短处：独立相对最弱（独有占比 0%）、样本少（3 场，结论打折）
4. **Muse Spark 1.3 Contributor**（综合 65.3）— 长处：每条成立最便宜（$0.00）；短处：覆盖相对最弱（占参与轮次 25%）
5. **DeepSeek V4.1 Flash（max）**（综合 60.2）— 长处：效率分最高（成立重要性÷耗时 15.50）；短处：独立相对最弱（独有占比 23%）
6. **GLM-5.3**（综合 57.5）— 长处：token相对最好（每条成立 11 千）；短处：时间相对最弱（每次 3.2 分钟）
7. **GLM-5.3-Flash**（综合 50.8）— 长处：花费相对最好（每次 $0.00）；短处：最慢（每次 3.4 分钟，档位 max）
8. **DeepSeek V4 Flash**（综合 50.4）— 长处：花费相对最好（每次 $0.02）；短处：时间相对最弱（每次 3.2 分钟）
9. **MiMo V2.5 Pro**（综合 44.5）— 长处：缓存命中最高（91%）；短处：效果相对最弱（均质量 10.7）
10. **DeepSeek V4.1 Flash（high）**（综合 24.9）— 长处：最快（每次 0.5 分钟，档位 high）；短处：假阳最多（每次 0.00 条，准确率 0%）、均质量垫底（6.0）、契合最低（3.00）、样本少（2 场，结论打折）

## 未评 / 失败（本期）

未评行必须补评（`record-findings`）才算完成；失败行不计入对照。

| 场次 | 未评行 | 未评金额$ | 失败行 | 失败金额$ |
|---|---:|---:|---:|---:|
| 2026-09-15-0225 | 0 | 0.00 | 1 | 0.10 |
| 2026-09-15-0254 | 0 | 0.00 | 1 | 0.00 |
| 2026-09-15-1239 | 8 | 0.67 | 0 | 0.00 |
| 2026-09-15-1642 | 8 | 3.15 | 0 | 0.00 |
| 2026-09-15-1649 | 0 | 0.00 | 1 | 0.08 |
| 2026-09-16-1534 | 0 | 0.00 | 1 | 0.00 |
| 2026-09-16-1714 | 0 | 0.00 | 1 | 0.00 |
| 2026-09-16-2035 | 0 | 0.00 | 1 | 0.00 |
| 2026-09-16-2230 | 0 | 0.00 | 1 | 0.00 |

---

**说明**

- 综合能力评分（排名用）：6 项按权重（30% 效果 + 25% 覆盖 + 20% 独立 + 10% 时间 + 5% 花费 + 10% token）在同活动类型内 min-max 归一到 0～100 后加权：效果（均质量）、覆盖（同名问题去重后的重要性加权成立数 ÷ 所参与轮次全场去重合计）、独立（独有（重要性加权）/ 成立（重要性加权））、时间（每次分钟，越快越好）、花费（每次花费，越省越好）、token（每条成立 token，越省越好）；某项没采集到时（如订阅制模型没有金额）该轴按中位 50 记，并在评论里标注。效率分（成立重要性÷耗时）只作参考列，不进综合分。 表格按它从优到差排名。契合分与样本量只进评论，不进评分。
- 图表逐项排名：每张图只按它自己那个口径排（产出/精准/独立/性价比/覆盖/执行时间/每条成立 token/缓存命中率/成立密度/每次花费/每条成立花费），图内 `#n` 是该图名次；执行时间、每条成立 token、花费越低越好，成立重要性是整场堆叠条、不做模型排名。
- 服务商口径：**按服务商（不是按工具）拆**——同一模型走过多个服务商时分行，名字本体不变，网页里名字只留本体、服务商是旁边的独立徽标（写短名，悬停看全名）；Markdown、图表与数据包写全名「名称 厂商」（空格分隔）。缩写对照：Curso...＝Cursor、方舟 Ag...＝方舟 Agent Plan、Z.ai＝Z.ai、OpenCod...＝OpenCode Go、小米 To...＝小米 Token Plan、pi＝pi。服务商取自 models.json 的 providers 表（改一处全站生效）：pi 调用看登记的服务商，agent 工具一律 Cursor，zcode/opencode 分别归 Z.ai / OpenCode Go；同一家的不同写法（zai 与 zai-coding-cn）算一家。拆不拆看本期与上期的并集，保证跨周可比；单服务商的家不拆。
- 计数类口径：成立数、花费、假阳这类会随样本量涨的指标，一律折成「每次已评运行」再比（成立密度、每次花费、每次说错），否则跑得多的家天然占优；模型表里的成立/独有/假阳仍是本期合计，看总数时请对照「场」列。
- 花费三看：每次花费（跑一次多少钱）、每条成立花费（每个真问题多少钱）、token（每条成立 token）；按通道拆开后某批调用缺金额或缺 token 数据时，该家不进对应榜单（不按 0 记，也不当最优）。
- 生成速度口径：每秒 token＝输出 token ÷ 耗时秒（按已评行汇总后相除），只算模型自己吐出来的输出；输入与缓存读是喂进去的、不算生成，推理 token 也不另加（各家输出是否已含思维输出不一致，加了会重复计）。
- 时间与 token 口径：执行时间＝该模型已评行耗时合计 ÷ 已评运行次数（分钟，未评与失败行没有耗时数据）；token＝输入+输出+缓存读+缓存写；每条成立 token＝token 合计 ÷ 成立数（千枚，成立数为 0 或缺 token 不排）；缓存命中率＝缓存读 ÷（输入+缓存读）。
- 口径：失败（退出码≠0/超时）与未评行不计入对照、花费照计；模型名按别名表归一化（k3→K3、glm-5→GLM-5.3、grok-4→Grok 4.6 Extra High、gemini-3→Gemini 3.8 Flash、mimo-v2→MiMo V2.5 Pro、deepseek-v4-flash→DeepSeek V4 Flash、`(zcode)` 并主名）；含通道后缀的行按通道各自归集。
- 质量分 = 成立重要性合计 + 2×独有 − 3×说错；设计分叉再加契合。样本 < 5 场标 `※`。
- 本目录是一次生成的同批产物（report.html / report.md / images / post.md），按 ISO 周归档（目录名即周号）；同一周再次生成会覆盖本目录，旧版在归档仓的 git 历史里。默认报上一个完整周，`--week current` 可出进行中的本周。

