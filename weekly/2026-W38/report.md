[← 回到归档目录](../../index.html)

# 模型团队周报 · 2026 年第 38 周（进行中）（2026-W38）

- 本窗：**2026-09-14 → 2026-09-21**；环比上一期：**2026-09-07 → 2026-09-14**
- 综合能力评分（表格「综合」列）：效果 41% ｜ 覆盖 34% ｜ 独立 25% ｜ 时间 0%↓ ｜ 花费 0%↓ ｜ token 0%↓
- 评分口径：按权重（41% 效果 + 34% 覆盖 + 25% 独立）在同活动类型内 min-max 归一到 0～100 后加权：效果（均质量）、覆盖（同名问题去重后的重要性加权成立数 ÷ 所参与轮次全场去重合计）、独立（独有（重要性加权）/ 成立（重要性加权））；时间（每次分钟）、花费（每次花费）、token（每条成立 token）三项资源轴与效率分、契合分、样本量一样只作参考列，不进综合分；某项没采集到时（如订阅制模型没有金额）按中位 50 记，并在评论里标注。

## 事后审计

| 指标 | 本期 | 上期 | 环比 |
|---|---:|---:|---:|
| 重要性5/4/3/2/1 | 46/98/149/63/12 | 84/125/141/110/21 | — |
| 场次 | 30 | 46 | -16 |
| 已评成功行 | 235 | 307 | -72 |
| 成立缺陷/方向 | 368 | 481 | -113 |
| 独有成立 | 119 | 215 | -96 |
| 假阳性 | 142 | 127 | +15 |
| 已评花费 $ | 96.64 | 141.34 | -44.70 |
| 未采集金额行 | 0 | 1 | -1 |
| 全部花费 $ | 99.96 | 151.98 | -52.02 |
| 输入 token | 29,705,966 | 45,392,097 | -15686131 |
| 输出 token | 5,615,126 | 7,129,138 | -1514012 |
| 缓存读 token | 425,211,758 | 535,299,260 | -110087502 |
| 缓存写 token | 0 | 0 | +0 |
| token 合计 | 460,532,850 | 587,820,495 | -127287645 |
| 平均每次耗时 分钟 | 7.7 | 7.1 | +0.6 |
| 缓存命中率 % | 93.5 | 92.2 | +1.3 |

| # | 模型 | 思考 | 综合 | 场(本/上) | 均质量(本/上/Δ) | 成立(本/上) | 独有 | 假阳 | 准确率 | 花费$(本/上) | 效率 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | DeepSeek V4.1 Flash（max） | max | 95.4 | 26/19 | 7.2/8.2/-1.1 | 53/46 | 21 | 15 | 78% | 17.49/6.61 | 1.01 |
| 2 | DeepSeek V4.1 Flash（high） | high | 94.4 | 12/0 | 6.3/0.0/+6.3 | 25/0 | 11 | 9 | 74% | 1.20/0.00 | 1.11 |
| 3 | Muse Spark 1.3 Contributor | xhigh | 75.5 | 29/14 | 4.7/5.2/-0.5 | 59/22 | 22 | 32 | 65% | 0.34/0.12 | 3.01 |
| 4 | Grok 4.6 Extra High | xhigh | 74.3 | 26/40 | 5.3/7.2/-1.9 | 41/70 | 12 | 11 | 79% | 36.11/45.96 | 0.74 |
| 5 | K3 方舟 Agent Plan | max | 68.5 | 29/29 | 4.7/5.9/-1.1 | 49/49 | 15 | 15 | 77% | 16.85/16.31 | 0.70 |
| 6 | GLM-5.3 | max | 65.2 | 29/43 | 4.3/5.3/-1.0 | 43/73 | 13 | 14 | 75% | 12.89/17.91 | 0.81 |
| 7 | GLM-5.3-Flash | max | 63.5 | 29/40 | 4.7/5.7/-1.0 | 45/59 | 12 | 9 | 83% | 0.97/1.05 | 0.49 |
| 8 | DeepSeek V4 Flash | max | 63.3 | 23/35 | 4.5/3.8/+0.7 | 37/41 | 8 | 11 | 77% | 6.08/6.53 | 0.60 |
| 9 | MiMo V2.5 Pro | max | 22.6 | 29/35 | -0.8/0.7/-1.5 | 14/18 | 5 | 25 | 36% | 0.96/1.11 | 0.64 |
| 10※ | Gemini 3.8 Flash | high | 19.9 | 3/38 | 1.7/6.0/-4.3 | 2/77 | 0 | 1 | 67% | 3.74/32.67 | 0.32 |

※ 本期样本 < 5 场，结论打折；主力（≥5 场）第一：DeepSeek V4.1 Flash（max）（综合 95.4）

**分项排名（各自口径，从优到差）**

- **产出 · 平均质量分**：1. DeepSeek V4.1 Flash（max）（7.2）、2. DeepSeek V4.1 Flash（high）（6.3）、3. Grok 4.6 Extra High（5.3）、4. K3 方舟 Agent Plan（4.7）、5. GLM-5.3-Flash（4.7）、6. Muse Spark 1.3 Contributor（4.7）、7. DeepSeek V4 Flash（4.5）、8. GLM-5.3（4.3）、9. Gemini 3.8 Flash（1.7）、10. MiMo V2.5 Pro（-0.8）
- **精准 · 准确率**：1. GLM-5.3-Flash（83%）、2. Grok 4.6 Extra High（79%）、3. DeepSeek V4.1 Flash（max）（78%）、4. DeepSeek V4 Flash（77%）、5. K3 方舟 Agent Plan（77%）、6. GLM-5.3（75%）、7. DeepSeek V4.1 Flash（high）（74%）、8. Gemini 3.8 Flash（67%）、9. Muse Spark 1.3 Contributor（65%）、10. MiMo V2.5 Pro（36%）
- **覆盖 · 重要性加权占参与轮次**：1. DeepSeek V4.1 Flash（max）（35%）、2. DeepSeek V4.1 Flash（high）（34%）、3. Muse Spark 1.3 Contributor（30%）、4. Grok 4.6 Extra High（27%）、5. K3 方舟 Agent Plan（26%）、6. DeepSeek V4 Flash（26%）、7. GLM-5.3（25%）、8. GLM-5.3-Flash（24%）、9. Gemini 3.8 Flash（13%）、10. MiMo V2.5 Pro（8%）
- **独立 · 独有占比（重要性加权）**：1. DeepSeek V4.1 Flash（high）（44%）、2. MiMo V2.5 Pro（40%）、3. DeepSeek V4.1 Flash（max）（36%）、4. Muse Spark 1.3 Contributor（35%）、5. Grok 4.6 Extra High（33%）、6. GLM-5.3（31%）、7. K3 方舟 Agent Plan（30%）、8. GLM-5.3-Flash（25%）、9. DeepSeek V4 Flash（24%）、10. Gemini 3.8 Flash（0%）
- **性价比 · 效率分**：1. Muse Spark 1.3 Contributor（3.01）、2. DeepSeek V4.1 Flash（high）（1.11）、3. DeepSeek V4.1 Flash（max）（1.01）、4. GLM-5.3（0.81）、5. Grok 4.6 Extra High（0.74）、6. K3 方舟 Agent Plan（0.70）、7. MiMo V2.5 Pro（0.64）、8. DeepSeek V4 Flash（0.60）、9. GLM-5.3-Flash（0.49）、10. Gemini 3.8 Flash（0.32）
- **执行时间 · 平均每次分钟**：1. Muse Spark 1.3 Contributor（2.5）、2. MiMo V2.5 Pro（4.9）、3. DeepSeek V4.1 Flash（high）（6.8）、4. GLM-5.3（7.2）、5. Grok 4.6 Extra High（7.9）、6. Gemini 3.8 Flash（8.9）、7. K3 方舟 Agent Plan（9.2）、8. DeepSeek V4 Flash（9.9）、9. DeepSeek V4.1 Flash（max）（10.0）、10. GLM-5.3-Flash（11.1）
- **Token · 每条成立千枚**：1. Muse Spark 1.3 Contributor（313.3）、2. K3 方舟 Agent Plan（469.9）、3. MiMo V2.5 Pro（762.6）、4. GLM-5.3（789.9）、5. GLM-5.3-Flash（1,045.8）、6. Grok 4.6 Extra High（1,138.1）、7. DeepSeek V4 Flash（1,815.0）、8. DeepSeek V4.1 Flash（high）（2,177.3）、9. DeepSeek V4.1 Flash（max）（2,552.9）、10. Gemini 3.8 Flash（11,881.5）
- **缓存命中率**：1. DeepSeek V4.1 Flash（max）（98%）、2. DeepSeek V4.1 Flash（high）（98%）、3. GLM-5.3-Flash（95%）、4. GLM-5.3（95%）、5. K3 方舟 Agent Plan（93%）、6. Gemini 3.8 Flash（91%）、7. MiMo V2.5 Pro（89%）、8. Muse Spark 1.3 Contributor（87%）、9. Grok 4.6 Extra High（87%）、10. DeepSeek V4 Flash（86%）
- **成立密度 · 每次（越多越好）**：1. DeepSeek V4.1 Flash（high）（2.08）、2. DeepSeek V4.1 Flash（max）（2.04）、3. Muse Spark 1.3 Contributor（2.03）、4. K3 方舟 Agent Plan（1.69）、5. DeepSeek V4 Flash（1.61）、6. Grok 4.6 Extra High（1.58）、7. GLM-5.3-Flash（1.55）、8. GLM-5.3（1.48）、9. Gemini 3.8 Flash（0.67）、10. MiMo V2.5 Pro（0.48）
- **生成速度 · 每秒 token（输出）**：1. Gemini 3.8 Flash（99.0）、2. DeepSeek V4.1 Flash（high）（93.6）、3. Muse Spark 1.3 Contributor（85.5）、4. DeepSeek V4.1 Flash（max）（67.1）、5. DeepSeek V4 Flash（62.9）、6. MiMo V2.5 Pro（61.5）、7. Grok 4.6 Extra High（54.7）、8. GLM-5.3（41.1）、9. GLM-5.3-Flash（30.8）、10. K3 方舟 Agent Plan（24.3）
- **每条成立花费（越低越省）**：1. Muse Spark 1.3 Contributor（$0.01）、2. GLM-5.3-Flash（$0.02）、3. DeepSeek V4.1 Flash（high）（$0.05）、4. MiMo V2.5 Pro（$0.07）、5. DeepSeek V4 Flash（$0.16）、6. GLM-5.3（$0.30）、7. DeepSeek V4.1 Flash（max）（$0.33）、8. K3 方舟 Agent Plan（$0.34）、9. Grok 4.6 Extra High（$0.88）、10. Gemini 3.8 Flash（$1.87）
- **每次花费（越低越省）**：1. Muse Spark 1.3 Contributor（$0.01）、2. MiMo V2.5 Pro（$0.03）、3. GLM-5.3-Flash（$0.03）、4. DeepSeek V4.1 Flash（high）（$0.10）、5. DeepSeek V4 Flash（$0.26）、6. GLM-5.3（$0.44）、7. K3 方舟 Agent Plan（$0.58）、8. DeepSeek V4.1 Flash（max）（$0.67）、9. Gemini 3.8 Flash（$1.25）、10. Grok 4.6 Extra High（$1.39）

**模型评论（按综合分）**

1. **DeepSeek V4.1 Flash（max）**（综合 95.4）— 长处：产出最高（均质量 7.2）、抓得最全（重要性加权占参与轮次 35%）、缓存命中最高（98%）；短处：时间相对最弱（每次 10.0 分钟）
2. **DeepSeek V4.1 Flash（high）**（综合 94.4）— 长处：独立相对最好（独有占比 44%）；短处：无突出短板
3. **Muse Spark 1.3 Contributor**（综合 75.5）— 长处：效率分最高（成立重要性÷耗时 3.01）、每条成立最便宜（$0.01）、最快（每次 2.5 分钟，档位 xhigh）、每条成立最省 token（313 千）；短处：效果相对最弱（均质量 4.7）
4. **Grok 4.6 Extra High**（综合 74.3）— 长处：各项居中（均质量 5.3、准确率 79%）；短处：花费相对最弱（每次 $1.39）
5. **K3 方舟 Agent Plan**（综合 68.5）— 长处：token 相对最好（每条成立 470 千）；短处：时间相对最弱（每次 9.2 分钟）
6. **GLM-5.3**（综合 65.2）— 长处：token 相对最好（每条成立 790 千）；短处：无突出短板
7. **GLM-5.3-Flash**（综合 63.5）— 长处：最准（83%）；短处：最慢（每次 11.1 分钟，档位 max）
8. **DeepSeek V4 Flash**（综合 63.3）— 长处：—；短处：时间相对最弱（每次 9.9 分钟）
9. **MiMo V2.5 Pro**（综合 22.6）— 长处：花费相对最好（每次 $0.03）；短处：假阳最多（每次 0.86 条，准确率 36%）、均质量垫底（-0.8）
10. **Gemini 3.8 Flash**（综合 19.9）— 长处：—；短处：每条成立最贵（$1.87）、每条成立最耗 token（11,881 千）、样本少（3 场，结论打折）

## 设计分叉

| 指标 | 本期 | 上期 | 环比 |
|---|---:|---:|---:|
| 重要性5/4/3/2/1 | 140/101/59/3/0 | 166/122/72/7/0 | — |
| 场次 | 20 | 25 | -5 |
| 已评成功行 | 147 | 167 | -20 |
| 成立缺陷/方向 | 303 | 367 | -64 |
| 独有成立 | 102 | 121 | -19 |
| 假阳性 | 37 | 18 | +19 |
| 已评花费 $ | 9.79 | 14.21 | -4.42 |
| 未采集金额行 | 0 | 0 | +0 |
| 全部花费 $ | 10.45 | 14.21 | -3.76 |
| 输入 token | 2,994,838 | 3,679,950 | -685112 |
| 输出 token | 920,735 | 821,713 | +99022 |
| 缓存读 token | 5,770,727 | 6,901,888 | -1131161 |
| 缓存写 token | 0 | 210,405 | -210405 |
| token 合计 | 9,686,300 | 11,613,956 | -1927656 |
| 平均每次耗时 分钟 | 2.1 | 1.8 | +0.3 |
| 缓存命中率 % | 65.8 | 65.2 | +0.6 |

| # | 模型 | 思考 | 综合 | 场(本/上) | 均质量(本/上/Δ) | 成立(本/上) | 独有 | 假阳 | 准确率 | 花费$(本/上) | 契合(本/上) |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | K3 方舟 Agent Plan | max | 97.9 | 19/18 | 23.7/23.9/-0.3 | 59/55 | 31 | 7 | 89% | 1.70/1.29 | 4.44/4.69 |
| 2 | Grok 4.6 Extra High | xhigh | 92.8 | 17/20 | 23.8/22.1/+1.7 | 53/56 | 25 | 4 | 93% | 5.94/5.97 | 4.38/4.33 |
| 3※ | Gemini 3.8 Flash | high | 62.1 | 3/20 | 18.0/17.8/+0.2 | 6/45 | 0 | 0 | 100% | 0.09/0.93 | 4.67/4.00 |
| 4 | GLM-5.3 | max | 57.7 | 18/21 | 17.4/16.6/+0.8 | 38/46 | 10 | 4 | 90% | 0.93/0.86 | 4.29/3.79 |
| 5 | Muse Spark 1.3 Contributor | xhigh | 52.3 | 18/7 | 15.7/10.1/+5.6 | 32/4 | 10 | 2 | 94% | 0.04/0.02 | 4.13/3.71 |
| 6 | DeepSeek V4.1 Flash（max） | max | 47.3 | 18/9 | 15.2/12.2/+2.9 | 32/11 | 8 | 3 | 91% | 0.66/0.24 | 4.19/3.33 |
| 7 | DeepSeek V4 Flash | max | 46.6 | 16/21 | 14.9/15.2/-0.3 | 30/43 | 7 | 2 | 94% | 0.27/0.26 | 3.92/4.07 |
| 8 | GLM-5.3-Flash | max | 46.6 | 18/21 | 15.2/15.2/-0.0 | 32/42 | 7 | 3 | 91% | 0.05/0.05 | 4.06/3.88 |
| 9 | MiMo V2.5 Pro | max | 30.8 | 17/18 | 10.0/9.1/+0.9 | 20/24 | 4 | 11 | 65% | 0.09/0.10 | 3.44/2.81 |
| 10※ | DeepSeek V4.1 Flash（high） | high | 0.0 | 3/0 | 5.3/0.0/+5.3 | 1/0 | 0 | 1 | 50% | 0.03/0.00 | 2.33/0.00 |

※ 本期样本 < 5 场，结论打折；主力（≥5 场）第一：K3 方舟 Agent Plan（综合 97.9）

**分项排名（各自口径，从优到差）**

- **产出 · 平均质量分**：1. Grok 4.6 Extra High（23.8）、2. K3 方舟 Agent Plan（23.7）、3. Gemini 3.8 Flash（18.0）、4. GLM-5.3（17.4）、5. Muse Spark 1.3 Contributor（15.7）、6. GLM-5.3-Flash（15.2）、7. DeepSeek V4.1 Flash（max）（15.2）、8. DeepSeek V4 Flash（14.9）、9. MiMo V2.5 Pro（10.0）、10. DeepSeek V4.1 Flash（high）（5.3）
- **精准 · 准确率**：1. Gemini 3.8 Flash（100%）、2. Muse Spark 1.3 Contributor（94%）、3. DeepSeek V4 Flash（94%）、4. Grok 4.6 Extra High（93%）、5. GLM-5.3-Flash（91%）、6. DeepSeek V4.1 Flash（max）（91%）、7. GLM-5.3（90%）、8. K3 方舟 Agent Plan（89%）、9. MiMo V2.5 Pro（65%）、10. DeepSeek V4.1 Flash（high）（50%）
- **覆盖 · 重要性加权占参与轮次**：1. Gemini 3.8 Flash（47%）、2. K3 方舟 Agent Plan（45%）、3. Grok 4.6 Extra High（43%）、4. GLM-5.3（29%）、5. GLM-5.3-Flash（25%）、6. DeepSeek V4 Flash（25%）、7. Muse Spark 1.3 Contributor（25%）、8. DeepSeek V4.1 Flash（max）（25%）、9. MiMo V2.5 Pro（18%）、10. DeepSeek V4.1 Flash（high）（8%）
- **独立 · 独有占比（重要性加权）**：1. K3 方舟 Agent Plan（52%）、2. Grok 4.6 Extra High（44%）、3. Muse Spark 1.3 Contributor（30%）、4. GLM-5.3（25%）、5. MiMo V2.5 Pro（24%）、6. DeepSeek V4.1 Flash（max）（23%）、7. DeepSeek V4 Flash（22%）、8. GLM-5.3-Flash（20%）、9. Gemini 3.8 Flash（0%）、10. DeepSeek V4.1 Flash（high）（0%）
- **性价比 · 效率分**：1. DeepSeek V4.1 Flash（max）（14.64）、2. Muse Spark 1.3 Contributor（11.46）、3. K3 方舟 Agent Plan（8.71）、4. Gemini 3.8 Flash（8.33）、5. DeepSeek V4.1 Flash（high）（6.25）、6. MiMo V2.5 Pro（5.81）、7. DeepSeek V4 Flash（4.46）、8. Grok 4.6 Extra High（4.32）、9. GLM-5.3（3.21）、10. GLM-5.3-Flash（2.82）
- **执行时间 · 平均每次分钟**：1. DeepSeek V4.1 Flash（high）（0.4）、2. DeepSeek V4.1 Flash（max）（0.6）、3. Muse Spark 1.3 Contributor（0.7）、4. Gemini 3.8 Flash（1.0）、5. MiMo V2.5 Pro（1.1）、6. K3 方舟 Agent Plan（1.9）、7. GLM-5.3（3.1）、8. DeepSeek V4 Flash（3.2）、9. Grok 4.6 Extra High（3.4）、10. GLM-5.3-Flash（3.5）
- **Token · 每条成立千枚**：1. K3 方舟 Agent Plan（5.4）、2. Muse Spark 1.3 Contributor（10.2）、3. GLM-5.3（10.7）、4. GLM-5.3-Flash（12.3）、5. DeepSeek V4 Flash（13.5）、6. Gemini 3.8 Flash（25.6）、7. DeepSeek V4.1 Flash（max）（28.2）、8. MiMo V2.5 Pro（50.2）、9. Grok 4.6 Extra High（106.9）、10. DeepSeek V4.1 Flash（high）（110.9）
- **缓存命中率**：1. MiMo V2.5 Pro（89%）、2. Grok 4.6 Extra High（74%）、3. DeepSeek V4 Flash（65%）、4. DeepSeek V4.1 Flash（max）（63%）、5. DeepSeek V4.1 Flash（high）（52%）、6. Gemini 3.8 Flash（37%）、7. GLM-5.3（33%）、8. Muse Spark 1.3 Contributor（1%）、9. K3 方舟 Agent Plan（0%）、10. GLM-5.3-Flash（0%）
- **成立密度 · 每次（越多越好）**：1. Grok 4.6 Extra High（3.12）、2. K3 方舟 Agent Plan（3.11）、3. GLM-5.3（2.11）、4. Gemini 3.8 Flash（2.00）、5. DeepSeek V4 Flash（1.88）、6. GLM-5.3-Flash（1.78）、7. DeepSeek V4.1 Flash（max）（1.78）、8. Muse Spark 1.3 Contributor（1.78）、9. MiMo V2.5 Pro（1.18）、10. DeepSeek V4.1 Flash（high）（0.33）
- **生成速度 · 每秒 token（输出）**：1. DeepSeek V4.1 Flash（high）（139.6）、2. DeepSeek V4.1 Flash（max）（139.6）、3. Muse Spark 1.3 Contributor（95.3）、4. DeepSeek V4 Flash（56.0）、5. Grok 4.6 Extra High（49.5）、6. GLM-5.3（45.4）、7. MiMo V2.5 Pro（37.2）、8. GLM-5.3-Flash（36.9）、9. Gemini 3.8 Flash（30.7）、10. K3 方舟 Agent Plan（29.2）
- **每条成立花费（越低越省）**：1. Muse Spark 1.3 Contributor（$0.00）、2. GLM-5.3-Flash（$0.00）、3. MiMo V2.5 Pro（$0.00）、4. DeepSeek V4 Flash（$0.01）、5. Gemini 3.8 Flash（$0.02）、6. DeepSeek V4.1 Flash（max）（$0.02）、7. GLM-5.3（$0.02）、8. DeepSeek V4.1 Flash（high）（$0.03）、9. K3 方舟 Agent Plan（$0.03）、10. Grok 4.6 Extra High（$0.11）
- **每次花费（越低越省）**：1. Muse Spark 1.3 Contributor（$0.00）、2. GLM-5.3-Flash（$0.00）、3. MiMo V2.5 Pro（$0.01）、4. DeepSeek V4.1 Flash（high）（$0.01）、5. DeepSeek V4 Flash（$0.02）、6. Gemini 3.8 Flash（$0.03）、7. DeepSeek V4.1 Flash（max）（$0.04）、8. GLM-5.3（$0.05）、9. K3 方舟 Agent Plan（$0.09）、10. Grok 4.6 Extra High（$0.35）

**模型评论（按综合分）**

1. **K3 方舟 Agent Plan**（综合 97.9）— 长处：每条成立最省 token（5 千）；短处：时间相对最弱（每次 1.9 分钟）
2. **Grok 4.6 Extra High**（综合 92.8）— 长处：产出最高（均质量 23.8）；短处：每条成立最贵（$0.11）
3. **Gemini 3.8 Flash**（综合 62.1）— 长处：最准（100%）、抓得最全（重要性加权占参与轮次 47%）、方向契合最高（4.67）；短处：独立相对最弱（独有占比 0%）、样本少（3 场，结论打折）
4. **GLM-5.3**（综合 57.7）— 长处：token 相对最好（每条成立 11 千）；短处：时间相对最弱（每次 3.1 分钟）
5. **Muse Spark 1.3 Contributor**（综合 52.3）— 长处：每条成立最便宜（$0.00）；短处：覆盖相对最弱（占参与轮次 25%）
6. **DeepSeek V4.1 Flash（max）**（综合 47.3）— 长处：效率分最高（成立重要性÷耗时 14.64）；短处：覆盖相对最弱（占参与轮次 25%）
7. **DeepSeek V4 Flash**（综合 46.6）— 长处：花费相对最好（每次 $0.02）；短处：时间相对最弱（每次 3.2 分钟）
8. **GLM-5.3-Flash**（综合 46.6）— 长处：花费相对最好（每次 $0.00）；短处：最慢（每次 3.5 分钟，档位 max）
9. **MiMo V2.5 Pro**（综合 30.8）— 长处：缓存命中最高（89%）；短处：效果相对最弱（均质量 10.0）
10. **DeepSeek V4.1 Flash（high）**（综合 0.0）— 长处：最快（每次 0.4 分钟，档位 high）；短处：假阳最多（每次 0.33 条，准确率 50%）、均质量垫底（5.3）、契合最低（2.33）、每条成立最耗 token（111 千）、样本少（3 场，结论打折）

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

- 综合能力评分与排名：表格与评论按综合分从优到差；时间/花费/token 与效率分只作参考列，不进综合分；契合分与样本量只进评论，不进评分。
- 质量分 = 成立重要性合计 + 2×独有 − 3×说错；设计分叉再加契合。样本 < 5 场标 `※`。
- 图表逐项排名：每张图只按它自己那个口径排（产出/精准/独立/性价比/覆盖/执行时间/每条成立 token/缓存命中率/成立密度/每次花费/每条成立花费），图内 `#n` 是该图名次；执行时间、每条成立 token、花费越低越好，成立重要性是整场堆叠条、不做模型排名。
- 计数类口径：成立数、花费、假阳这类会随样本量涨的指标，一律折成「每次已评运行」再比（成立密度、每次花费、每次说错），否则跑得多的家天然占优；模型表里的成立/独有/假阳仍是本期合计，看总数时请对照「场」列。
- 花费三看：每次花费（跑一次多少钱）、每条成立花费（每个真问题多少钱）、token（每条成立 token）；按通道拆开后某批调用缺金额或缺 token 数据时，该家不进对应榜单（不按 0 记，也不当最优）。
- 时间与 token 口径：执行时间＝该模型已评行耗时合计 ÷ 已评运行次数（分钟，未评与失败行没有耗时数据）；token＝输入+输出+缓存读+缓存写；每条成立 token＝token 合计 ÷ 成立数（千枚，成立数为 0 或缺 token 不排）；缓存命中率＝缓存读 ÷（输入+缓存读）。
- 生成速度口径：每秒 token＝输出 token ÷ 耗时秒（按已评行汇总后相除），只算模型自己吐出来的输出；输入与缓存读是喂进去的、不算生成，推理 token 也不另加（各家输出是否已含思维输出不一致，加了会重复计）。
- 服务商口径：**按服务商（不是按工具）拆**——同一模型走过多个服务商时分行，名字本体不变，网页里名字只留本体、服务商是旁边的独立徽标（写短名，悬停看全名）；Markdown、图表与数据包写全名「名称 厂商」（空格分隔）。缩写对照：Curso...＝Cursor、方舟 Ag...＝方舟 Agent Plan、Z.ai＝Z.ai、OpenCod...＝OpenCode Go、小米 To...＝小米 Token Plan、pi＝pi。服务商取自 models.json 的 providers 表（改一处全站生效）：pi 调用看登记的服务商，agent 工具一律 Cursor，zcode/opencode 分别归 Z.ai / OpenCode Go；同一家的不同写法（zai 与 zai-coding-cn）算一家。拆不拆看本期与上期的并集，保证跨周可比；单服务商的家不拆。
- 口径：失败（退出码≠0/超时）与未评行不计入对照、花费照计；模型名按别名表归一化（k3→K3、glm-5→GLM-5.3、grok-4→Grok 4.6 Extra High、gemini-3→Gemini 3.8 Flash、mimo-v2→MiMo V2.5 Pro、deepseek-v4-flash→DeepSeek V4 Flash、`(zcode)` 并主名）；含通道后缀的行按通道各自归集。
- 本目录是一次生成的同批产物（report.md / data.json / summary.json / images；贴文 post.md 可选，重生成默认保留原有贴文），按 ISO 周归档（目录名即周号）；同一周再次生成会覆盖本目录，旧版在归档仓的 git 历史里。默认报上一个完整周，`--week current` 可出进行中的本周。

