[← 回到归档目录](../../index.html)

# 模型团队周报 · 2026 年第 38 周（进行中）（2026-W38）

- 本窗：**2026-09-14 → 2026-09-17**；环比上一期：**2026-09-11 → 2026-09-14**
- 综合能力评分（表格「综合」列）：效果 35% ｜ 覆盖 30% ｜ 独立 10% ｜ 时间 10%↓ ｜ 花费 5%↓ ｜ token 10%↓
- 评分口径：6 项按权重（35% 效果 + 30% 覆盖 + 10% 独立 + 10% 时间 + 5% 花费 + 10% token）在同活动类型内 min-max 归一到 0～100 后加权：效果（均质量）、覆盖（重要性加权成立数 ÷ 所参与轮次同口径合计）、独立（独有/成立）、时间（每次分钟，越快越好）、花费（每次花费，越省越好）、token（每条成立 token，越省越好）；某项没采集到时（如订阅制模型没有金额）该轴按中位 50 记，并在评论里标注。效率分（成立重要性÷耗时）只作参考列，不进综合分。
- 口径：失败（退出码≠0/超时）与未评行不计入对照、花费照计；模型名按别名表归一。

## 事后审计

| 指标 | 本期 | 上期 | 环比 |
|---|---:|---:|---:|
| 重要性5/4/3/2/1 | 39/86/121/58/10 | 37/49/61/59/16 | — |
| 场次 | 22 | 22 | +0 |
| 已评成功行 | 172 | 174 | -2 |
| 成立缺陷/方向 | 314 | 222 | +92 |
| 独有成立 | 80 | 97 | -17 |
| 假阳性 | 84 | 53 | +31 |
| 已评花费 $ | 77.24 | 73.55 | +3.69 |
| 未采集金额行 | 0 | 0 | +0 |
| 全部花费 $ | 80.57 | 78.35 | +2.22 |
| 输入 token | 23,845,128 | 24,086,676 | -241548 |
| 输出 token | 3,995,928 | 4,018,675 | -22747 |
| 缓存读 token | 292,177,741 | 293,159,789 | -982048 |
| 缓存写 token | 0 | 0 | +0 |
| token 合计 | 320,018,797 | 321,265,140 | -1246343 |
| 平均每次耗时 分钟 | 7.6 | 6.4 | +1.2 |
| 缓存命中率 % | 92.5 | 92.4 | +0.0 |

| # | 模型 | 思考 | 综合 | 场(本/上) | 均质量(本/上/Δ) | 成立(本/上) | 独有 | 假阳 | 准确率 | 花费$(本/上) | 效率 |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | Muse Spark 1.3 Contributor | xhigh | 87.7 | 21/14 | 6.3/5.2/+1.1 | 51/22 | 17 | 21 | 71% | 0.25/0.12 | 3.57 |
| 2※ | DeepSeek V4.1 Flash（high） | high | 85.3 | 4/0 | 7.5/0.0/+7.5 | 11/0 | 2 | 2 | 85% | 0.35/0.00 | 1.45 |
| 3 | DeepSeek V4.1 Flash（max） | max | 83.0 | 18/17 | 8.8/7.8/+1.0 | 43/38 | 13 | 7 | 86% | 16.62/6.43 | 1.23 |
| 4 | GLM-5.3 | max | 71.5 | 21/21 | 6.1/3.3/+2.8 | 39/27 | 11 | 8 | 83% | 8.60/8.40 | 1.04 |
| 5 | K3 方舟 Agent Plan | max | 68.9 | 21/9 | 6.1/4.7/+1.4 | 44/13 | 11 | 10 | 81% | 12.06/5.00 | 0.88 |
| 6 | GLM-5.3-Flash | max | 64.7 | 21/20 | 6.0/3.7/+2.3 | 40/20 | 9 | 6 | 87% | 0.67/0.44 | 0.62 |
| 7 | Grok 4.6 Extra High | xhigh | 60.9 | 21/20 | 5.9/4.8/+1.1 | 35/24 | 6 | 5 | 88% | 28.80/22.29 | 0.80 |
| 8 | DeepSeek V4 Flash | max | 58.6 | 21/21 | 5.2/2.0/+3.3 | 36/13 | 7 | 7 | 84% | 5.46/3.32 | 0.65 |
| 9 | MiMo V2.5 Pro | max | 31.5 | 21/21 | -0.1/1.4/-1.6 | 13/12 | 4 | 17 | 43% | 0.69/0.75 | 0.87 |
| 10※ | Gemini 3.8 Flash | high | 17.0 | 3/19 | 1.7/5.4/-3.8 | 2/33 | 0 | 1 | 67% | 3.74/15.93 | 0.32 |

※ 本期样本 < 5 场，结论打折；主力（≥5 场）第一：Muse Spark 1.3 Contributor（综合 87.7）

**分项排名（各自口径，从优到差）**

- **产出 · 平均质量分**：1. DeepSeek V4.1 Flash（max）（8.8）、2. DeepSeek V4.1 Flash（high）（7.5）、3. Muse Spark 1.3 Contributor（6.3）、4. K3 方舟 Agent Plan（6.1）、5. GLM-5.3（6.1）、6. GLM-5.3-Flash（6.0）、7. Grok 4.6 Extra High（5.9）、8. DeepSeek V4 Flash（5.2）、9. Gemini 3.8 Flash（1.7）、10. MiMo V2.5 Pro（-0.1）
- **精准 · 准确率**：1. Grok 4.6 Extra High（88%）、2. GLM-5.3-Flash（87%）、3. DeepSeek V4.1 Flash（max）（86%）、4. DeepSeek V4.1 Flash（high）（85%）、5. DeepSeek V4 Flash（84%）、6. GLM-5.3（83%）、7. K3 方舟 Agent Plan（81%）、8. Muse Spark 1.3 Contributor（71%）、9. Gemini 3.8 Flash（67%）、10. MiMo V2.5 Pro（43%）
- **覆盖 · 重要性加权占参与轮次**：1. DeepSeek V4.1 Flash（high）（17%）、2. DeepSeek V4.1 Flash（max）（16%）、3. Muse Spark 1.3 Contributor（16%）、4. K3 方舟 Agent Plan（13%）、5. GLM-5.3（13%）、6. Grok 4.6 Extra High（12%）、7. GLM-5.3-Flash（12%）、8. DeepSeek V4 Flash（11%）、9. Gemini 3.8 Flash（7%）、10. MiMo V2.5 Pro（4%）
- **独立 · 独有占比**：1. Muse Spark 1.3 Contributor（33%）、2. MiMo V2.5 Pro（31%）、3. DeepSeek V4.1 Flash（max）（30%）、4. GLM-5.3（28%）、5. K3 方舟 Agent Plan（25%）、6. GLM-5.3-Flash（23%）、7. DeepSeek V4 Flash（19%）、8. DeepSeek V4.1 Flash（high）（18%）、9. Grok 4.6 Extra High（17%）、10. Gemini 3.8 Flash（0%）
- **性价比 · 效率分**：1. Muse Spark 1.3 Contributor（3.57）、2. DeepSeek V4.1 Flash（high）（1.45）、3. DeepSeek V4.1 Flash（max）（1.23）、4. GLM-5.3（1.04）、5. K3 方舟 Agent Plan（0.88）、6. MiMo V2.5 Pro（0.87）、7. Grok 4.6 Extra High（0.80）、8. DeepSeek V4 Flash（0.65）、9. GLM-5.3-Flash（0.62）、10. Gemini 3.8 Flash（0.32）
- **执行时间 · 平均每次分钟**：1. Muse Spark 1.3 Contributor（2.6）、2. MiMo V2.5 Pro（4.4）、3. DeepSeek V4.1 Flash（high）（5.8）、4. GLM-5.3（6.7）、5. Grok 4.6 Extra High（8.0）、6. K3 方舟 Agent Plan（8.8）、7. Gemini 3.8 Flash（8.9）、8. DeepSeek V4 Flash（9.7）、9. GLM-5.3-Flash（10.5）、10. DeepSeek V4.1 Flash（max）（10.7）
- **Token · 每条成立千枚**：1. Muse Spark 1.3 Contributor（250.5）、2. K3 方舟 Agent Plan（379.3）、3. GLM-5.3（566.5）、4. MiMo V2.5 Pro（657.8）、5. GLM-5.3-Flash（786.6）、6. Grok 4.6 Extra High（1,056.6）、7. DeepSeek V4.1 Flash（high）（1,316.8）、8. DeepSeek V4 Flash（1,638.9）、9. DeepSeek V4.1 Flash（max）（2,191.0）、10. Gemini 3.8 Flash（11,881.5）
- **缓存命中率**：1. DeepSeek V4.1 Flash（max）（98%）、2. DeepSeek V4.1 Flash（high）（97%）、3. GLM-5.3-Flash（95%）、4. GLM-5.3（95%）、5. K3 方舟 Agent Plan（93%）、6. Gemini 3.8 Flash（91%）、7. MiMo V2.5 Pro（90%）、8. Grok 4.6 Extra High（87%）、9. Muse Spark 1.3 Contributor（86%）、10. DeepSeek V4 Flash（85%）
- **成立密度 · 每次（越多越好）**：1. DeepSeek V4.1 Flash（high）（2.75）、2. Muse Spark 1.3 Contributor（2.43）、3. DeepSeek V4.1 Flash（max）（2.39）、4. K3 方舟 Agent Plan（2.10）、5. GLM-5.3-Flash（1.90）、6. GLM-5.3（1.86）、7. DeepSeek V4 Flash（1.71）、8. Grok 4.6 Extra High（1.67）、9. Gemini 3.8 Flash（0.67）、10. MiMo V2.5 Pro（0.62）
- **生成速度 · 每秒 token（输出）**：1. Gemini 3.8 Flash（99.0）、2. DeepSeek V4.1 Flash（high）（88.8）、3. Muse Spark 1.3 Contributor（82.7）、4. DeepSeek V4 Flash（63.6）、5. MiMo V2.5 Pro（63.1）、6. DeepSeek V4.1 Flash（max）（61.3）、7. Grok 4.6 Extra High（55.1）、8. GLM-5.3（42.6）、9. GLM-5.3-Flash（31.8）、10. K3 方舟 Agent Plan（24.2）
- **每条成立花费（越低越省）**：1. Muse Spark 1.3 Contributor（$0.00）、2. GLM-5.3-Flash（$0.02）、3. DeepSeek V4.1 Flash（high）（$0.03）、4. MiMo V2.5 Pro（$0.05）、5. DeepSeek V4 Flash（$0.15）、6. GLM-5.3（$0.22）、7. K3 方舟 Agent Plan（$0.27）、8. DeepSeek V4.1 Flash（max）（$0.39）、9. Grok 4.6 Extra High（$0.82）、10. Gemini 3.8 Flash（$1.87）
- **每次花费（越低越省）**：1. Muse Spark 1.3 Contributor（$0.01）、2. GLM-5.3-Flash（$0.03）、3. MiMo V2.5 Pro（$0.03）、4. DeepSeek V4.1 Flash（high）（$0.09）、5. DeepSeek V4 Flash（$0.26）、6. GLM-5.3（$0.41）、7. K3 方舟 Agent Plan（$0.57）、8. DeepSeek V4.1 Flash（max）（$0.92）、9. Gemini 3.8 Flash（$1.25）、10. Grok 4.6 Extra High（$1.37）

**模型评论（按综合分）**

1. **Muse Spark 1.3 Contributor**（综合 87.7）— 长处：效率分最高（成立重要性÷耗时 3.57）、每条成立最便宜（$0.00）、最快（每次 2.6 分钟，档位 xhigh）、每条成立最省 token（250 千）；短处：无突出短板
2. **DeepSeek V4.1 Flash（high）**（综合 85.3）— 长处：抓得最全（重要性加权占参与轮次 17%）；短处：独立相对最弱（独有占比 18%）、样本少（4 场，结论打折）
3. **DeepSeek V4.1 Flash（max）**（综合 83.0）— 长处：产出最高（均质量 8.8）、缓存命中最高（98%）；短处：最慢（每次 10.7 分钟，档位 max）
4. **GLM-5.3**（综合 71.5）— 长处：token相对最好（每条成立 566 千）；短处：无突出短板
5. **K3 方舟 Agent Plan**（综合 68.9）— 长处：token相对最好（每条成立 379 千）；短处：时间相对最弱（每次 8.8 分钟）
6. **GLM-5.3-Flash**（综合 64.7）— 长处：花费相对最好（每次 $0.03）；短处：时间相对最弱（每次 10.5 分钟）
7. **Grok 4.6 Extra High**（综合 60.9）— 长处：最准（88%）；短处：花费相对最弱（每次 $1.37）
8. **DeepSeek V4 Flash**（综合 58.6）— 长处：各项居中（均质量 5.2、准确率 84%）；短处：时间相对最弱（每次 9.7 分钟）
9. **MiMo V2.5 Pro**（综合 31.5）— 长处：花费相对最好（每次 $0.03）；短处：假阳最多（每次 0.81 条，准确率 43%）、均质量垫底（-0.1）
10. **Gemini 3.8 Flash**（综合 17.0）— 长处：各项居中（均质量 1.7、准确率 67%）；短处：每条成立最贵（$1.87）、每条成立最耗 token（11,881 千）、样本少（3 场，结论打折）

## 设计分叉

| 指标 | 本期 | 上期 | 环比 |
|---|---:|---:|---:|
| 重要性5/4/3/2/1 | 129/92/57/2/0 | 42/44/40/3/0 | — |
| 场次 | 17 | 9 | +8 |
| 已评成功行 | 131 | 78 | +53 |
| 成立缺陷/方向 | 280 | 129 | +151 |
| 独有成立 | 94 | 51 | +43 |
| 假阳性 | 33 | 7 | +26 |
| 已评花费 $ | 8.89 | 5.27 | +3.63 |
| 未采集金额行 | 0 | 0 | +0 |
| 全部花费 $ | 9.56 | 5.27 | +4.29 |
| 输入 token | 2,728,660 | 1,697,354 | +1031306 |
| 输出 token | 835,692 | 404,343 | +431349 |
| 缓存读 token | 5,246,021 | 2,622,115 | +2623906 |
| 缓存写 token | 0 | 0 | +0 |
| token 合计 | 8,810,373 | 4,723,812 | +4086561 |
| 平均每次耗时 分钟 | 2.2 | 1.7 | +0.4 |
| 缓存命中率 % | 65.8 | 60.7 | +5.1 |

| # | 模型 | 思考 | 综合 | 场(本/上) | 均质量(本/上/Δ) | 成立(本/上) | 独有 | 假阳 | 准确率 | 花费$(本/上) | 契合(本/上) |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | K3 方舟 Agent Plan | max | 90.3 | 16/3 | 22.7/26.7/-4.0 | 47/11 | 23 | 7 | 87% | 1.36/0.23 | 4.60/4.67 |
| 2 | Grok 4.6 Extra High | xhigh | 75.2 | 16/9 | 23.8/24.0/-0.2 | 49/26 | 25 | 4 | 92% | 5.55/3.10 | 4.47/4.56 |
| 3 | Muse Spark 1.3 Contributor | xhigh | 70.4 | 16/7 | 17.1/10.1/+6.9 | 31/4 | 10 | 1 | 97% | 0.04/0.02 | 4.43/3.71 |
| 4 | DeepSeek V4.1 Flash（max） | max | 66.3 | 16/8 | 16.5/10.5/+6.0 | 32/8 | 8 | 2 | 94% | 0.63/0.22 | 4.36/3.25 |
| 5 | GLM-5.3 | max | 63.2 | 16/9 | 17.5/14.3/+3.2 | 34/15 | 10 | 4 | 89% | 0.82/0.39 | 4.33/3.67 |
| 6※ | Gemini 3.8 Flash | high | 60.2 | 3/9 | 18.0/17.8/+0.2 | 6/18 | 0 | 0 | 100% | 0.09/0.29 | 4.67/3.78 |
| 7 | GLM-5.3-Flash | max | 56.9 | 16/9 | 15.9/10.2/+5.7 | 31/10 | 7 | 3 | 91% | 0.05/0.03 | 4.14/3.38 |
| 8 | DeepSeek V4 Flash | max | 55.0 | 16/9 | 14.9/9.0/+5.9 | 30/10 | 7 | 2 | 94% | 0.27/0.08 | 3.92/3.67 |
| 9 | MiMo V2.5 Pro | max | 44.6 | 15/9 | 10.7/7.6/+3.2 | 20/8 | 4 | 10 | 67% | 0.07/0.03 | 3.50/2.56 |
| 10※ | DeepSeek V4.1 Flash（high） | high | 24.9 | 1/0 | 6.0/0.0/+6.0 | 0/0 | 0 | 0 | 0% | 0.01/0.00 | 3.00/0.00 |

※ 本期样本 < 5 场，结论打折；主力（≥5 场）第一：K3 方舟 Agent Plan（综合 90.3）

**分项排名（各自口径，从优到差）**

- **产出 · 平均质量分**：1. Grok 4.6 Extra High（23.8）、2. K3 方舟 Agent Plan（22.7）、3. Gemini 3.8 Flash（18.0）、4. GLM-5.3（17.5）、5. Muse Spark 1.3 Contributor（17.1）、6. DeepSeek V4.1 Flash（max）（16.5）、7. GLM-5.3-Flash（15.9）、8. DeepSeek V4 Flash（14.9）、9. MiMo V2.5 Pro（10.7）、10. DeepSeek V4.1 Flash（high）（6.0）
- **精准 · 准确率**：1. Gemini 3.8 Flash（100%）、2. Muse Spark 1.3 Contributor（97%）、3. DeepSeek V4.1 Flash（max）（94%）、4. DeepSeek V4 Flash（94%）、5. Grok 4.6 Extra High（92%）、6. GLM-5.3-Flash（91%）、7. GLM-5.3（89%）、8. K3 方舟 Agent Plan（87%）、9. MiMo V2.5 Pro（67%）、10. DeepSeek V4.1 Flash（high）（0%）
- **覆盖 · 重要性加权占参与轮次**：1. Grok 4.6 Extra High（18%）、2. K3 方舟 Agent Plan（17%）、3. GLM-5.3（12%）、4. GLM-5.3-Flash（11%）、5. DeepSeek V4.1 Flash（max）（11%）、6. Muse Spark 1.3 Contributor（11%）、7. DeepSeek V4 Flash（11%）、8. Gemini 3.8 Flash（10%）、9. MiMo V2.5 Pro（8%）、10. DeepSeek V4.1 Flash（high）（0%）
- **独立 · 独有占比**：1. Grok 4.6 Extra High（51%）、2. K3 方舟 Agent Plan（49%）、3. Muse Spark 1.3 Contributor（32%）、4. GLM-5.3（29%）、5. DeepSeek V4.1 Flash（max）（25%）、6. DeepSeek V4 Flash（23%）、7. GLM-5.3-Flash（23%）、8. MiMo V2.5 Pro（20%）、9. Gemini 3.8 Flash（0%）、10. DeepSeek V4.1 Flash（high）（0%）
- **性价比 · 效率分**：1. DeepSeek V4.1 Flash（max）（16.47）、2. Muse Spark 1.3 Contributor（12.29）、3. K3 方舟 Agent Plan（8.82）、4. Gemini 3.8 Flash（8.33）、5. MiMo V2.5 Pro（6.58）、6. DeepSeek V4 Flash（4.46）、7. Grok 4.6 Extra High（4.26）、8. GLM-5.3（3.11）、9. GLM-5.3-Flash（3.10）、10. DeepSeek V4.1 Flash（high）（0.00）
- **执行时间 · 平均每次分钟**：1. DeepSeek V4.1 Flash（high）（0.5）、2. DeepSeek V4.1 Flash（max）（0.6）、3. Muse Spark 1.3 Contributor（0.7）、4. Gemini 3.8 Flash（1.0）、5. MiMo V2.5 Pro（1.2）、6. K3 方舟 Agent Plan（1.7）、7. GLM-5.3（3.1）、8. DeepSeek V4 Flash（3.2）、9. Grok 4.6 Extra High（3.4）、10. GLM-5.3-Flash（3.5）
- **Token · 每条成立千枚**：1. K3 方舟 Agent Plan（5.6）、2. Muse Spark 1.3 Contributor（9.4）、3. GLM-5.3（10.6）、4. GLM-5.3-Flash（11.2）、5. DeepSeek V4 Flash（13.5）、6. DeepSeek V4.1 Flash（max）（23.7）、7. Gemini 3.8 Flash（25.6）、8. MiMo V2.5 Pro（48.4）、9. Grok 4.6 Extra High（105.9）
- **缓存命中率**：1. MiMo V2.5 Pro（91%）、2. Grok 4.6 Extra High（73%）、3. DeepSeek V4.1 Flash（high）（73%）、4. DeepSeek V4 Flash（65%）、5. DeepSeek V4.1 Flash（max）（61%）、6. Gemini 3.8 Flash（37%）、7. GLM-5.3（37%）、8. Muse Spark 1.3 Contributor（1%）、9. K3 方舟 Agent Plan（0%）、10. GLM-5.3-Flash（0%）
- **成立密度 · 每次（越多越好）**：1. Grok 4.6 Extra High（3.06）、2. K3 方舟 Agent Plan（2.94）、3. GLM-5.3（2.13）、4. Gemini 3.8 Flash（2.00）、5. DeepSeek V4.1 Flash（max）（2.00）、6. GLM-5.3-Flash（1.94）、7. Muse Spark 1.3 Contributor（1.94）、8. DeepSeek V4 Flash（1.88）、9. MiMo V2.5 Pro（1.33）、10. DeepSeek V4.1 Flash（high）（0.00）
- **生成速度 · 每秒 token（输出）**：1. DeepSeek V4.1 Flash（max）（142.7）、2. DeepSeek V4.1 Flash（high）（140.9）、3. Muse Spark 1.3 Contributor（93.6）、4. DeepSeek V4 Flash（56.0）、5. Grok 4.6 Extra High（49.4）、6. GLM-5.3（44.9）、7. GLM-5.3-Flash（36.7）、8. MiMo V2.5 Pro（35.9）、9. Gemini 3.8 Flash（30.7）、10. K3 方舟 Agent Plan（29.2）
- **每条成立花费（越低越省）**：1. Muse Spark 1.3 Contributor（$0.00）、2. GLM-5.3-Flash（$0.00）、3. MiMo V2.5 Pro（$0.00）、4. DeepSeek V4 Flash（$0.01）、5. Gemini 3.8 Flash（$0.02）、6. DeepSeek V4.1 Flash（max）（$0.02）、7. GLM-5.3（$0.02）、8. K3 方舟 Agent Plan（$0.03）、9. Grok 4.6 Extra High（$0.11）
- **每次花费（越低越省）**：1. Muse Spark 1.3 Contributor（$0.00）、2. GLM-5.3-Flash（$0.00）、3. MiMo V2.5 Pro（$0.00）、4. DeepSeek V4.1 Flash（high）（$0.01）、5. DeepSeek V4 Flash（$0.02）、6. Gemini 3.8 Flash（$0.03）、7. DeepSeek V4.1 Flash（max）（$0.04）、8. GLM-5.3（$0.05）、9. K3 方舟 Agent Plan（$0.09）、10. Grok 4.6 Extra High（$0.35）

**模型评论（按综合分）**

1. **K3 方舟 Agent Plan**（综合 90.3）— 长处：每条成立最省 token（6 千）；短处：时间相对最弱（每次 1.7 分钟）
2. **Grok 4.6 Extra High**（综合 75.2）— 长处：产出最高（均质量 23.8）、抓得最全（重要性加权占参与轮次 18%）；短处：每条成立最贵（$0.11）、每条成立最耗 token（106 千）
3. **Muse Spark 1.3 Contributor**（综合 70.4）— 长处：每条成立最便宜（$0.00）；短处：无突出短板
4. **DeepSeek V4.1 Flash（max）**（综合 66.3）— 长处：效率分最高（成立重要性÷耗时 16.47）；短处：无突出短板
5. **GLM-5.3**（综合 63.2）— 长处：token相对最好（每条成立 11 千）；短处：时间相对最弱（每次 3.1 分钟）
6. **Gemini 3.8 Flash**（综合 60.2）— 长处：最准（100%）、方向契合最高（4.67）；短处：独立相对最弱（独有占比 0%）、样本少（3 场，结论打折）
7. **GLM-5.3-Flash**（综合 56.9）— 长处：花费相对最好（每次 $0.00）；短处：最慢（每次 3.5 分钟，档位 max）
8. **DeepSeek V4 Flash**（综合 55.0）— 长处：花费相对最好（每次 $0.02）；短处：时间相对最弱（每次 3.2 分钟）
9. **MiMo V2.5 Pro**（综合 44.6）— 长处：缓存命中最高（91%）；短处：效果相对最弱（均质量 10.7）
10. **DeepSeek V4.1 Flash（high）**（综合 24.9）— 长处：最快（每次 0.5 分钟，档位 high）；短处：假阳最多（每次 0.00 条，准确率 0%）、均质量垫底（6.0）、契合最低（3.00）、样本少（1 场，结论打折）

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

