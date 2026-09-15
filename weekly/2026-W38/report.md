[← 回到归档目录](../../index.html)

# 模型团队周报 · 2026 年第 38 周（进行中）（2026-W38）

- 本窗：**2026-09-14 → 2026-09-16**；环比上一期：**2026-09-12 → 2026-09-14**
- 综合能力评分（表格「综合」列）：效果 35% ｜ 覆盖 30% ｜ 独立 10% ｜ 时间 10%↓ ｜ 花费 5%↓ ｜ token 10%↓
- 评分口径：6 项按权重（35% 效果 + 30% 覆盖 + 10% 独立 + 10% 时间 + 5% 花费 + 10% token）在同活动类型内 min-max 归一到 0～100 后加权：效果（均质量）、覆盖（重要性加权成立数 ÷ 所参与轮次同口径合计）、独立（独有/成立）、时间（每次分钟，越快越好）、花费（每次花费，越省越好）、token（每条成立 token，越省越好）；某项没采集到时（如订阅制模型没有金额）该轴按中位 50 记，并在评论里标注。效率分（成立重要性÷耗时）只作参考列，不进综合分。
- 口径：失败（退出码≠0/超时）与未评行不计入对照、花费照计；模型名按别名表归一。

## 事后审计

| 指标 | 本期 | 上期 | 环比 |
|---|---:|---:|---:|
| 重要性5/4/3/2/1 | 39/82/102/55/9 | 18/39/43/30/13 | — |
| 场次 | 20 | 12 | +8 |
| 已评成功行 | 154 | 108 | +46 |
| 成立缺陷/方向 | 287 | 143 | +144 |
| 独有成立 | 68 | 66 | +2 |
| 假阳性 | 74 | 21 | +53 |
| 已评花费 $ | 73.56 | 41.76 | +31.81 |
| 未采集金额行 | 0 | 0 | +0 |
| 全部花费 $ | 76.89 | 41.76 | +35.14 |
| 输入 token | 22,066,317 | 12,698,298 | +9368019 |
| 输出 token | 3,628,212 | 2,298,013 | +1330199 |
| 缓存读 token | 272,873,631 | 148,910,931 | +123962700 |
| 缓存写 token | 0 | 0 | +0 |
| token 合计 | 298,568,160 | 163,907,242 | +134660918 |
| 平均每次耗时 分钟 | 7.9 | 5.6 | +2.3 |
| 缓存命中率 % | 92.5 | 92.1 | +0.4 |

| # | 模型 | 思考 | 综合 | 场(本/上) | 均质量(本/上/Δ) | 成立(本/上) | 独有 | 假阳 | 准确率 | 花费$(本/上) | 效率 |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|
| 1※ | DeepSeek V4.1 Flash（high） | high | 88.1 | 2/0 | 9.0/0.0/+9.0 | 7/0 | 1 | 1 | 88% | 0.20/0.00 | 1.46 |
| 2 | Muse Spark 1.3 Contributor | xhigh | 86.5 | 19/12 | 6.4/5.5/+0.9 | 47/18 | 15 | 19 | 71% | 0.24/0.10 | 3.53 |
| 3 | DeepSeek V4.1 Flash（max） | max | 81.1 | 16/12 | 8.9/8.7/+0.3 | 39/28 | 11 | 6 | 87% | 16.49/6.13 | 1.13 |
| 4 | GLM-5.3 | max | 69.2 | 19/12 | 6.0/4.1/+1.9 | 35/15 | 9 | 8 | 81% | 8.10/3.71 | 1.00 |
| 5 | K3 方舟 Agent Plan | max | 67.8 | 19/2 | 6.1/10.0/-3.9 | 41/5 | 9 | 10 | 80% | 11.28/1.21 | 0.92 |
| 6 | GLM-5.3-Flash | max | 67.1 | 19/12 | 6.4/4.3/+2.2 | 38/13 | 9 | 5 | 88% | 0.62/0.24 | 0.64 |
| 7 | Grok 4.6 Extra High | xhigh | 61.1 | 19/12 | 6.4/4.3/+2.1 | 32/12 | 4 | 2 | 94% | 27.27/11.70 | 0.83 |
| 8 | DeepSeek V4 Flash | max | 56.8 | 19/12 | 5.2/1.3/+3.9 | 33/4 | 6 | 7 | 83% | 4.97/0.50 | 0.65 |
| 9 | MiMo V2.5 Pro | max | 32.1 | 19/12 | 0.2/1.8/-1.7 | 13/8 | 4 | 15 | 46% | 0.66/0.48 | 0.96 |
| 10※ | Gemini 3.8 Flash | high | 16.1 | 3/12 | 1.7/5.6/-3.9 | 2/21 | 0 | 1 | 67% | 3.74/10.26 | 0.32 |

※ 本期样本 < 5 场，结论打折；主力（≥5 场）第一：Muse Spark 1.3 Contributor（综合 86.5）

**分项排名（各自口径，从优到差）**

- **产出 · 平均质量分**：1. DeepSeek V4.1 Flash（high）（9.0）、2. DeepSeek V4.1 Flash（max）（8.9）、3. GLM-5.3-Flash（6.4）、4. Muse Spark 1.3 Contributor（6.4）、5. Grok 4.6 Extra High（6.4）、6. K3 方舟 Agent Plan（6.1）、7. GLM-5.3（6.0）、8. DeepSeek V4 Flash（5.2）、9. Gemini 3.8 Flash（1.7）、10. MiMo V2.5 Pro（0.2）
- **精准 · 准确率**：1. Grok 4.6 Extra High（94%）、2. GLM-5.3-Flash（88%）、3. DeepSeek V4.1 Flash（high）（88%）、4. DeepSeek V4.1 Flash（max）（87%）、5. DeepSeek V4 Flash（83%）、6. GLM-5.3（81%）、7. K3 方舟 Agent Plan（80%）、8. Muse Spark 1.3 Contributor（71%）、9. Gemini 3.8 Flash（67%）、10. MiMo V2.5 Pro（46%）
- **覆盖 · 重要性加权占参与轮次**：1. DeepSeek V4.1 Flash（high）（17%）、2. DeepSeek V4.1 Flash（max）（16%）、3. Muse Spark 1.3 Contributor（16%）、4. K3 方舟 Agent Plan（14%）、5. GLM-5.3（13%）、6. Grok 4.6 Extra High（13%）、7. GLM-5.3-Flash（13%）、8. DeepSeek V4 Flash（11%）、9. Gemini 3.8 Flash（7%）、10. MiMo V2.5 Pro（4%）
- **独立 · 独有占比**：1. Muse Spark 1.3 Contributor（32%）、2. MiMo V2.5 Pro（31%）、3. DeepSeek V4.1 Flash（max）（28%）、4. GLM-5.3（26%）、5. GLM-5.3-Flash（24%）、6. K3 方舟 Agent Plan（22%）、7. DeepSeek V4 Flash（18%）、8. DeepSeek V4.1 Flash（high）（14%）、9. Grok 4.6 Extra High（13%）、10. Gemini 3.8 Flash（0%）
- **性价比 · 效率分**：1. Muse Spark 1.3 Contributor（3.53）、2. DeepSeek V4.1 Flash（high）（1.46）、3. DeepSeek V4.1 Flash（max）（1.13）、4. GLM-5.3（1.00）、5. MiMo V2.5 Pro（0.96）、6. K3 方舟 Agent Plan（0.92）、7. Grok 4.6 Extra High（0.83）、8. DeepSeek V4 Flash（0.65）、9. GLM-5.3-Flash（0.64）、10. Gemini 3.8 Flash（0.32）
- **执行时间 · 平均每次分钟**：1. Muse Spark 1.3 Contributor（2.7）、2. MiMo V2.5 Pro（4.6）、3. GLM-5.3（7.0）、4. DeepSeek V4.1 Flash（high）（7.3）、5. Grok 4.6 Extra High（8.1）、6. Gemini 3.8 Flash（8.9）、7. K3 方舟 Agent Plan（9.0）、8. DeepSeek V4 Flash（9.9）、9. GLM-5.3-Flash（10.7）、10. DeepSeek V4.1 Flash（max）（11.6）
- **Token · 每条成立千枚**：1. Muse Spark 1.3 Contributor（260.6）、2. K3 方舟 Agent Plan（384.9）、3. GLM-5.3（602.5）、4. MiMo V2.5 Pro（638.5）、5. GLM-5.3-Flash（780.9）、6. Grok 4.6 Extra High（1,105.9）、7. DeepSeek V4.1 Flash（high）（1,319.4）、8. DeepSeek V4 Flash（1,622.7）、9. DeepSeek V4.1 Flash（max）（2,295.9）、10. Gemini 3.8 Flash（11,881.5）
- **缓存命中率**：1. DeepSeek V4.1 Flash（max）（98%）、2. DeepSeek V4.1 Flash（high）（97%）、3. GLM-5.3-Flash（95%）、4. GLM-5.3（95%）、5. K3 方舟 Agent Plan（93%）、6. Gemini 3.8 Flash（91%）、7. MiMo V2.5 Pro（90%）、8. Grok 4.6 Extra High（87%）、9. Muse Spark 1.3 Contributor（86%）、10. DeepSeek V4 Flash（85%）
- **成立密度 · 每次（越多越好）**：1. DeepSeek V4.1 Flash（high）（3.50）、2. Muse Spark 1.3 Contributor（2.47）、3. DeepSeek V4.1 Flash（max）（2.44）、4. K3 方舟 Agent Plan（2.16）、5. GLM-5.3-Flash（2.00）、6. GLM-5.3（1.84）、7. DeepSeek V4 Flash（1.74）、8. Grok 4.6 Extra High（1.68）、9. MiMo V2.5 Pro（0.68）、10. Gemini 3.8 Flash（0.67）
- **生成速度 · 每秒 token（输出）**：1. Gemini 3.8 Flash（99.0）、2. Muse Spark 1.3 Contributor（81.4）、3. DeepSeek V4.1 Flash（high）（72.6）、4. MiMo V2.5 Pro（65.1）、5. DeepSeek V4 Flash（62.9）、6. DeepSeek V4.1 Flash（max）（59.1）、7. Grok 4.6 Extra High（53.0）、8. GLM-5.3（41.2）、9. GLM-5.3-Flash（31.3）、10. K3 方舟 Agent Plan（24.3）
- **每条成立花费（越低越省）**：1. Muse Spark 1.3 Contributor（$0.01）、2. GLM-5.3-Flash（$0.02）、3. DeepSeek V4.1 Flash（high）（$0.03）、4. MiMo V2.5 Pro（$0.05）、5. DeepSeek V4 Flash（$0.15）、6. GLM-5.3（$0.23）、7. K3 方舟 Agent Plan（$0.28）、8. DeepSeek V4.1 Flash（max）（$0.42）、9. Grok 4.6 Extra High（$0.85）、10. Gemini 3.8 Flash（$1.87）
- **每次花费（越低越省）**：1. Muse Spark 1.3 Contributor（$0.01）、2. GLM-5.3-Flash（$0.03）、3. MiMo V2.5 Pro（$0.03）、4. DeepSeek V4.1 Flash（high）（$0.10）、5. DeepSeek V4 Flash（$0.26）、6. GLM-5.3（$0.43）、7. K3 方舟 Agent Plan（$0.59）、8. DeepSeek V4.1 Flash（max）（$1.03）、9. Gemini 3.8 Flash（$1.25）、10. Grok 4.6 Extra High（$1.44）

**模型评论（按综合分）**

1. **DeepSeek V4.1 Flash（high）**（综合 88.1）— 长处：产出最高（均质量 9.0）、抓得最全（重要性加权占参与轮次 17%）；短处：独立相对最弱（独有占比 14%）、样本少（2 场，结论打折）
2. **Muse Spark 1.3 Contributor**（综合 86.5）— 长处：效率分最高（成立重要性÷耗时 3.53）、每条成立最便宜（$0.01）、最快（每次 2.7 分钟，档位 xhigh）、每条成立最省 token（261 千）；短处：无突出短板
3. **DeepSeek V4.1 Flash（max）**（综合 81.1）— 长处：缓存命中最高（98%）；短处：最慢（每次 11.6 分钟，档位 max）
4. **GLM-5.3**（综合 69.2）— 长处：token相对最好（每条成立 602 千）；短处：无突出短板
5. **K3 方舟 Agent Plan**（综合 67.8）— 长处：token相对最好（每条成立 385 千）；短处：时间相对最弱（每次 9.0 分钟）
6. **GLM-5.3-Flash**（综合 67.1）— 长处：花费相对最好（每次 $0.03）；短处：时间相对最弱（每次 10.7 分钟）
7. **Grok 4.6 Extra High**（综合 61.1）— 长处：最准（94%）；短处：花费相对最弱（每次 $1.44）
8. **DeepSeek V4 Flash**（综合 56.8）— 长处：各项居中（均质量 5.2、准确率 83%）；短处：时间相对最弱（每次 9.9 分钟）
9. **MiMo V2.5 Pro**（综合 32.1）— 长处：花费相对最好（每次 $0.03）；短处：假阳最多（每次 0.79 条，准确率 46%）、均质量垫底（0.2）
10. **Gemini 3.8 Flash**（综合 16.1）— 长处：各项居中（均质量 1.7、准确率 67%）；短处：每条成立最贵（$1.87）、每条成立最耗 token（11,881 千）、样本少（3 场，结论打折）

## 设计分叉

| 指标 | 本期 | 上期 | 环比 |
|---|---:|---:|---:|
| 重要性5/4/3/2/1 | 127/90/54/1/0 | 26/22/24/3/0 | — |
| 场次 | 16 | 7 | +9 |
| 已评成功行 | 122 | 63 | +59 |
| 成立缺陷/方向 | 272 | 75 | +197 |
| 独有成立 | 86 | 48 | +38 |
| 假阳性 | 33 | 4 | +29 |
| 已评花费 $ | 8.43 | 4.31 | +4.11 |
| 未采集金额行 | 0 | 0 | +0 |
| 全部花费 $ | 9.09 | 4.31 | +4.78 |
| 输入 token | 2,501,574 | 1,335,234 | +1166340 |
| 输出 token | 797,167 | 321,805 | +475362 |
| 缓存读 token | 5,134,036 | 2,102,263 | +3031773 |
| 缓存写 token | 0 | 0 | +0 |
| token 合计 | 8,432,777 | 3,759,302 | +4673475 |
| 平均每次耗时 分钟 | 2.2 | 1.7 | +0.6 |
| 缓存命中率 % | 67.2 | 61.2 | +6.1 |

| # | 模型 | 思考 | 综合 | 场(本/上) | 均质量(本/上/Δ) | 成立(本/上) | 独有 | 假阳 | 准确率 | 花费$(本/上) | 契合(本/上) |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | K3 方舟 Agent Plan | max | 87.0 | 15/1 | 22.1/33.0/-10.9 | 43/4 | 19 | 7 | 86% | 1.29/0.09 | 4.64/5.00 |
| 2 | Grok 4.6 Extra High | xhigh | 75.3 | 15/7 | 23.5/22.6/+0.9 | 45/17 | 21 | 4 | 92% | 5.23/2.54 | 4.50/4.43 |
| 3 | Muse Spark 1.3 Contributor | xhigh | 61.7 | 15/7 | 17.8/10.1/+7.7 | 31/4 | 10 | 1 | 97% | 0.03/0.02 | 4.54/3.71 |
| 4 | DeepSeek V4.1 Flash（max） | max | 56.7 | 15/7 | 17.2/8.3/+8.9 | 32/4 | 8 | 2 | 94% | 0.63/0.21 | 4.46/3.00 |
| 5 | GLM-5.3 | max | 55.4 | 15/7 | 18.1/11.7/+6.4 | 34/7 | 10 | 4 | 89% | 0.79/0.30 | 4.36/3.57 |
| 6※ | Gemini 3.8 Flash | high | 46.0 | 3/7 | 18.0/16.0/+2.0 | 6/11 | 0 | 0 | 100% | 0.09/0.18 | 4.67/3.57 |
| 7 | GLM-5.3-Flash | max | 46.0 | 15/7 | 16.4/8.1/+8.3 | 31/4 | 7 | 3 | 91% | 0.05/0.02 | 4.15/3.33 |
| 8 | DeepSeek V4 Flash | max | 42.8 | 15/7 | 15.5/5.0/+10.5 | 30/3 | 7 | 2 | 94% | 0.26/0.05 | 4.00/3.25 |
| 9 | MiMo V2.5 Pro | max | 23.4 | 14/7 | 11.1/5.1/+5.9 | 20/2 | 4 | 10 | 67% | 0.07/0.02 | 3.54/2.43 |

※ 本期样本 < 5 场，结论打折；主力（≥5 场）第一：K3 方舟 Agent Plan（综合 87.0）

**分项排名（各自口径，从优到差）**

- **产出 · 平均质量分**：1. Grok 4.6 Extra High（23.5）、2. K3 方舟 Agent Plan（22.1）、3. GLM-5.3（18.1）、4. Gemini 3.8 Flash（18.0）、5. Muse Spark 1.3 Contributor（17.8）、6. DeepSeek V4.1 Flash（max）（17.2）、7. GLM-5.3-Flash（16.4）、8. DeepSeek V4 Flash（15.5）、9. MiMo V2.5 Pro（11.1）
- **精准 · 准确率**：1. Gemini 3.8 Flash（100%）、2. Muse Spark 1.3 Contributor（97%）、3. DeepSeek V4.1 Flash（max）（94%）、4. DeepSeek V4 Flash（94%）、5. Grok 4.6 Extra High（92%）、6. GLM-5.3-Flash（91%）、7. GLM-5.3（89%）、8. K3 方舟 Agent Plan（86%）、9. MiMo V2.5 Pro（67%）
- **覆盖 · 重要性加权占参与轮次**：1. Grok 4.6 Extra High（17%）、2. K3 方舟 Agent Plan（16%）、3. GLM-5.3（12%）、4. GLM-5.3-Flash（11%）、5. DeepSeek V4.1 Flash（max）（11%）、6. Muse Spark 1.3 Contributor（11%）、7. DeepSeek V4 Flash（11%）、8. Gemini 3.8 Flash（10%）、9. MiMo V2.5 Pro（8%）
- **独立 · 独有占比**：1. Grok 4.6 Extra High（47%）、2. K3 方舟 Agent Plan（44%）、3. Muse Spark 1.3 Contributor（32%）、4. GLM-5.3（29%）、5. DeepSeek V4.1 Flash（max）（25%）、6. DeepSeek V4 Flash（23%）、7. GLM-5.3-Flash（23%）、8. MiMo V2.5 Pro（20%）、9. Gemini 3.8 Flash（0%）
- **性价比 · 效率分**：1. DeepSeek V4.1 Flash（max）（17.57）、2. Muse Spark 1.3 Contributor（13.11）、3. K3 方舟 Agent Plan（8.34）、4. Gemini 3.8 Flash（8.33）、5. MiMo V2.5 Pro（7.05）、6. DeepSeek V4 Flash（4.75）、7. Grok 4.6 Extra High（4.16）、8. GLM-5.3（3.32）、9. GLM-5.3-Flash（3.31）
- **执行时间 · 平均每次分钟**：1. DeepSeek V4.1 Flash（max）（0.6）、2. Muse Spark 1.3 Contributor（0.7）、3. Gemini 3.8 Flash（1.0）、4. MiMo V2.5 Pro（1.2）、5. K3 方舟 Agent Plan（1.8）、6. GLM-5.3（3.3）、7. DeepSeek V4 Flash（3.4）、8. Grok 4.6 Extra High（3.5）、9. GLM-5.3-Flash（3.6）
- **Token · 每条成立千枚**：1. K3 方舟 Agent Plan（5.7）、2. Muse Spark 1.3 Contributor（8.8）、3. GLM-5.3（10.0）、4. GLM-5.3-Flash（10.6）、5. DeepSeek V4 Flash（12.9）、6. DeepSeek V4.1 Flash（max）（23.2）、7. Gemini 3.8 Flash（25.6）、8. MiMo V2.5 Pro（47.6）、9. Grok 4.6 Extra High（111.4）
- **缓存命中率**：1. MiMo V2.5 Pro（92%）、2. Grok 4.6 Extra High（74%）、3. DeepSeek V4 Flash（64%）、4. DeepSeek V4.1 Flash（max）（62%）、5. Gemini 3.8 Flash（37%）、6. GLM-5.3（33%）、7. Muse Spark 1.3 Contributor（1%）、8. K3 方舟 Agent Plan（0%）、9. GLM-5.3-Flash（0%）
- **成立密度 · 每次（越多越好）**：1. Grok 4.6 Extra High（3.00）、2. K3 方舟 Agent Plan（2.87）、3. GLM-5.3（2.27）、4. DeepSeek V4.1 Flash（max）（2.13）、5. GLM-5.3-Flash（2.07）、6. Muse Spark 1.3 Contributor（2.07）、7. Gemini 3.8 Flash（2.00）、8. DeepSeek V4 Flash（2.00）、9. MiMo V2.5 Pro（1.43）
- **生成速度 · 每秒 token（输出）**：1. DeepSeek V4.1 Flash（max）（142.5）、2. Muse Spark 1.3 Contributor（92.6）、3. DeepSeek V4 Flash（55.0）、4. Grok 4.6 Extra High（49.4）、5. GLM-5.3（44.1）、6. MiMo V2.5 Pro（36.7）、7. GLM-5.3-Flash（36.5）、8. Gemini 3.8 Flash（30.7）、9. K3 方舟 Agent Plan（28.9）
- **每条成立花费（越低越省）**：1. Muse Spark 1.3 Contributor（$0.00）、2. GLM-5.3-Flash（$0.00）、3. MiMo V2.5 Pro（$0.00）、4. DeepSeek V4 Flash（$0.01）、5. Gemini 3.8 Flash（$0.02）、6. DeepSeek V4.1 Flash（max）（$0.02）、7. GLM-5.3（$0.02）、8. K3 方舟 Agent Plan（$0.03）、9. Grok 4.6 Extra High（$0.12）
- **每次花费（越低越省）**：1. Muse Spark 1.3 Contributor（$0.00）、2. GLM-5.3-Flash（$0.00）、3. MiMo V2.5 Pro（$0.00）、4. DeepSeek V4 Flash（$0.02）、5. Gemini 3.8 Flash（$0.03）、6. DeepSeek V4.1 Flash（max）（$0.04）、7. GLM-5.3（$0.05）、8. K3 方舟 Agent Plan（$0.09）、9. Grok 4.6 Extra High（$0.35）

**模型评论（按综合分）**

1. **K3 方舟 Agent Plan**（综合 87.0）— 长处：每条成立最省 token（6 千）；短处：无突出短板
2. **Grok 4.6 Extra High**（综合 75.3）— 长处：产出最高（均质量 23.5）、抓得最全（重要性加权占参与轮次 17%）；短处：每条成立最贵（$0.12）、每条成立最耗 token（111 千）
3. **Muse Spark 1.3 Contributor**（综合 61.7）— 长处：每条成立最便宜（$0.00）；短处：无突出短板
4. **DeepSeek V4.1 Flash（max）**（综合 56.7）— 长处：效率分最高（成立重要性÷耗时 17.57）、最快（每次 0.6 分钟，档位 max）；短处：无突出短板
5. **GLM-5.3**（综合 55.4）— 长处：token相对最好（每条成立 10 千）；短处：时间相对最弱（每次 3.3 分钟）
6. **Gemini 3.8 Flash**（综合 46.0）— 长处：最准（100%）、方向契合最高（4.67）；短处：独立相对最弱（独有占比 0%）、样本少（3 场，结论打折）
7. **GLM-5.3-Flash**（综合 46.0）— 长处：花费相对最好（每次 $0.00）；短处：最慢（每次 3.6 分钟，档位 max）
8. **DeepSeek V4 Flash**（综合 42.8）— 长处：花费相对最好（每次 $0.02）；短处：时间相对最弱（每次 3.4 分钟）
9. **MiMo V2.5 Pro**（综合 23.4）— 长处：缓存命中最高（92%）；短处：假阳最多（每次 0.71 条，准确率 67%）、均质量垫底（11.1）、契合最低（3.54）

## 未评 / 失败（本期）

未评行必须补评（`record-findings`）才算完成；失败行不计入对照。

| 场次 | 未评行 | 未评金额$ | 失败行 | 失败金额$ |
|---|---:|---:|---:|---:|
| 2026-09-15-0225 | 0 | 0.00 | 1 | 0.10 |
| 2026-09-15-0254 | 0 | 0.00 | 1 | 0.00 |
| 2026-09-15-1239 | 8 | 0.67 | 0 | 0.00 |
| 2026-09-15-1642 | 8 | 3.15 | 0 | 0.00 |
| 2026-09-15-1649 | 0 | 0.00 | 1 | 0.08 |

---

**说明**

- 综合能力评分（排名用）：6 项按权重（35% 效果 + 30% 覆盖 + 10% 独立 + 10% 时间 + 5% 花费 + 10% token）在同活动类型内 min-max 归一到 0～100 后加权：效果（均质量）、覆盖（重要性加权成立数 ÷ 所参与轮次同口径合计）、独立（独有/成立）、时间（每次分钟，越快越好）、花费（每次花费，越省越好）、token（每条成立 token，越省越好）；某项没采集到时（如订阅制模型没有金额）该轴按中位 50 记，并在评论里标注。效率分（成立重要性÷耗时）只作参考列，不进综合分。 表格按它从优到差排名。契合分与样本量只进评论，不进评分。
- 图表逐项排名：每张图只按它自己那个口径排（产出/精准/独立/性价比/覆盖/执行时间/每条成立 token/缓存命中率/成立密度/每次花费/每条成立花费），图内 `#n` 是该图名次；执行时间、每条成立 token、花费越低越好，成立重要性是整场堆叠条、不做模型排名。
- 服务商口径：**按服务商（不是按工具）拆**——同一模型走过多个服务商时分行，名字本体不变，网页里名字只留本体、服务商是旁边的独立徽标（写短名，悬停看全名）；Markdown、图表与数据包写全名「名称 厂商」（空格分隔）。缩写对照：Curso...＝Cursor、方舟 Ag...＝方舟 Agent Plan、Z.ai＝Z.ai、OpenCod...＝OpenCode Go、小米 To...＝小米 Token Plan、pi＝pi。服务商取自 models.json 的 providers 表（改一处全站生效）：pi 调用看登记的服务商，agent 工具一律 Cursor，zcode/opencode 分别归 Z.ai / OpenCode Go；同一家的不同写法（zai 与 zai-coding-cn）算一家。拆不拆看本期与上期的并集，保证跨周可比；单服务商的家不拆。
- 计数类口径：成立数、花费、假阳这类会随样本量涨的指标，一律折成「每次已评运行」再比（成立密度、每次花费、每次说错），否则跑得多的家天然占优；模型表里的成立/独有/假阳仍是本期合计，看总数时请对照「场」列。
- 花费三看：每次花费（跑一次多少钱）、每条成立花费（每个真问题多少钱）、token（每条成立 token）；按通道拆开后某批调用缺金额或缺 token 数据时，该家不进对应榜单（不按 0 记，也不当最优）。
- 生成速度口径：每秒 token＝输出 token ÷ 耗时秒（按已评行汇总后相除），只算模型自己吐出来的输出；输入与缓存读是喂进去的、不算生成，推理 token 也不另加（各家输出是否已含思维输出不一致，加了会重复计）。
- 时间与 token 口径：执行时间＝该模型已评行耗时合计 ÷ 已评运行次数（分钟，未评与失败行没有耗时数据）；token＝输入+输出+缓存读+缓存写；每条成立 token＝token 合计 ÷ 成立数（千枚，成立数为 0 或缺 token 不排）；缓存命中率＝缓存读 ÷（输入+缓存读）。
- 口径：失败（退出码≠0/超时）与未评行不计入对照、花费照计；模型名按别名表归一化（k3→K3、glm-5→GLM-5.3、grok-4→Grok 4.6 Extra High、gemini-3→Gemini 3.8 Flash、mimo-v2→MiMo V2.5 Pro、deepseek-v4-flash→DeepSeek V4 Flash、`(zcode)` 并主名）；含通道后缀的行按通道各自归集。
- 质量分 = 成立重要性合计 + 2×独有 − 3×说错；设计分叉再加契合。样本 < 5 场标 `※`。
- 本目录是一次生成的同批产物（report.html / report.md / images / post.md），按 ISO 周归档（目录名即周号）；同一周再次生成会覆盖本目录，旧版在归档仓的 git 历史里。默认报上一个完整周，`--week current` 可出进行中的本周。

