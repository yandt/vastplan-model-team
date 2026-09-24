[← 回到归档目录](../../index.html)

# 模型团队周报 · 2026 年第 39 周（进行中）（2026-W39）

- 本窗：**2026-09-21 → 2026-09-25**；环比上一期：**2026-09-17 → 2026-09-21**
- 综合能力评分（表格「综合」列）：效果 41% ｜ 覆盖 34% ｜ 独立 25% ｜ 时间 0%↓ ｜ 花费 0%↓ ｜ token 0%↓
- 评分口径：按权重（41% 效果 + 34% 覆盖 + 25% 独立）在同活动类型内 min-max 归一到 0～100 后加权：效果（均质量）、覆盖（同名问题去重后的重要性加权成立数 ÷ 所参与轮次全场去重合计，再按贝叶斯收缩往全场均值靠：分母越小收缩越强）、独立（独有（重要性加权）/ 成立（重要性加权））；时间（每次分钟）、花费（每次花费）、token（每条成立 token）三项资源轴与效率分、契合分、样本量一样只作参考列，不进综合分；某项没采集到时（如订阅制模型没有金额）按中位 50 记，并在评论里标注。

## 简报

本期是 VastPlan 模型团队周报 2026 年第 39 周（进行中），窗口 2026-09-21 到 09-25。VastPlan 是我们自研的 Node/TypeScript 插件运行时与 Portal 内核，是真实工程，不是题库。

测试分两种：事后审计是多模型并行找 BUG、再对照代码判定；设计分叉是各出方案、按用户最终选定的方案算契合度。口径上，失败与未评场次不进对照但花费照计，订阅制模型未采集到的金额不记 0，总分是同活动类型内的相对排名。

本周事后审计 20 场，成立 538 条、独有 449 条、假阳 53 条，花费 $81.70；环比场次 27→20，成立 286→538，假阳 87→53。设计分叉 10 场，成立 156 条，花费 $19.38，假阳 10→12，场次 21→10。专责推理本周 0 场。

事后审计榜前八：

1. Grok 4.6 Extra High Cursor 78.9
2. MiniMax M3 72.9
3. Step 5 Preview 72.5
4. DeepSeek V4.1 Flash（high） 70.8
5. DeepSeek V4.1 Flash（max） 68.3
6. Muse Spark 1.3 Contributor 67.7
7. Kimi K3 方舟 Agent Plan 60.8
8. SWE-2 56.6

Grok 4.6 Extra High Cursor 从上期第 3 升到第 1，均质量 5.9→12.5、假阳 4→1，是本期主力里分数最高的一个。Qwen3.8 Flash 成立 13→40、均质量 7.6→10.2 都在涨，排名却从上期第 1 的 83.3 掉到第 11 的 48.3。MiMo V2.5 Pro 垫底 7.1，比上期再降 17.9。

设计分叉榜前五：

1. Grok 4.6 Extra High Cursor 100.0
2. SWE-2 72.5
3. Qwen3.8 Flash 72.3
4. GLM-5.3 65.5
5. Fable 5.1 64.7

Grok 4.6 Extra High Cursor 环比 69.2 升 30.8；Fable 5.1 从上期第 1 的 80.5 降到第 5 的 64.7。

性价比上，事后审计每次花费最低是 SWE-2 $0.00、Muse Spark 1.3 Contributor $0.01、MiMo V2.6 Flash $0.02；最贵是 Grok 4.7 Extra High，每次 $4.88，折合每条成立缺陷 $4.27。设计分叉最贵是 Fable 5.1，每次 $0.73。

样本不足的观察区里，事后审计 Space Bunny Free 3 场均质量 11.0；设计分叉 Opus 5.5（max）3 场均质量 17.0，契合分 5.00 为全场最高。数字都在这里，欢迎一起聊口径。#LLM #AI #Benchmark #MultiModel

## 事后审计

| 指标 | 本期 | 上期 | 环比 |
|---|---:|---:|---:|
| 重要性5/4/3/2/1 | 36/130/192/156/24 | 28/102/95/57/4 | — |
| 场次 | 20 | 27 | -7 |
| 已评成功行 | 231 | 219 | +12 |
| 成立/方向 | 538 | 286 | +252 |
| 独有成立 | 449 | 162 | +287 |
| 假阳性 | 53 | 87 | -34 |
| 已评花费 $ | 81.70 | 65.64 | +16.06 |
| 未采集金额行 | 36 | 12 | +24 |
| 全部花费（含未评/失败）$ | 93.74 | 68.68 | +25.06 |
| 输入 token | 25,473,677 | 20,056,714 | +5416963 |
| 输出 token | 5,310,471 | 4,680,422 | +630049 |
| 缓存读 token | 448,372,378 | 488,023,609 | -39651231 |
| 缓存写 token | 0 | 0 | +0 |
| token 合计 | 479,156,526 | 512,760,745 | -33604219 |
| 平均每次耗时 分钟 | 8.3 | 7.5 | +0.8 |
| 缓存命中率 % | 94.6 | 96.1 | -1.4 |

| # | 模型 | 思考 | 综合 | 场 本/上 | 均质量 本/上/Δ | 成立 本/上 | 独有 | 假阳 | 准确率 | 花费 本/上 | 效率 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | Grok 4.6 Extra High Cursor | xhigh | 78.9 | 11/26 | 12.5/5.9/+6.5 | 28/35 | 24 | 1 | 97% | 13.83/34.92 | 1.40 |
| 2 | MiniMax M3 | max | 72.9 | 16/0 | 10.4/0.0/+10.4 | 42/0 | 42 | 12 | 78% | 4.25/0.00 | 1.36 |
| 3 | Step 5 Preview | max | 72.5 | 18/2 | 12.8/18.5/-5.7 | 51/8 | 42 | 0 | 100% | —/— | 0.79 |
| 4 | DeepSeek V4.1 Flash（high） | high | 70.8 | 18/26 | 11.8/7.0/+4.8 | 45/49 | 37 | 2 | 96% | 1.85/3.14 | 1.56 |
| 5 | DeepSeek V4.1 Flash（max） | max | 68.3 | 18/26 | 11.4/5.8/+5.6 | 46/42 | 36 | 3 | 94% | 1.97/3.13 | 1.39 |
| 6 | Muse Spark 1.3 Contributor | xhigh | 67.7 | 18/26 | 11.7/5.0/+6.6 | 55/44 | 44 | 9 | 86% | 0.20/0.30 | 2.89 |
| 7 | Kimi K3 方舟 Agent Plan | max | 60.8 | 18/19 | 10.6/3.9/+6.7 | 44/18 | 36 | 2 | 96% | 9.53/7.10 | 0.95 |
| 8 | SWE-2 | max | 56.6 | 18/1 | 10.6/11.0/-0.4 | 44/3 | 35 | 5 | 90% | 0.00/0.00 | 0.75 |
| 9 | MiMo V2.6 Pro | max | 53.8 | 7/0 | 10.3/0.0/+10.3 | 16/0 | 13 | 2 | 89% | 0.40/0.00 | 0.63 |
| 10 | MiMo V2.6 Flash | max | 50.6 | 7/0 | 9.4/0.0/+9.4 | 15/0 | 13 | 1 | 94% | 0.15/0.00 | 0.67 |
| 11 | Qwen3.8 Flash | max | 48.3 | 18/8 | 10.2/7.6/+2.6 | 40/13 | 32 | 3 | 93% | —/— | 1.23 |
| 12 | GLM-5.3 | max | 41.7 | 18/26 | 8.4/2.5/+5.9 | 35/26 | 30 | 5 | 88% | 7.04/9.51 | 1.16 |
| 13 | GLM-5.3-Flash | max | 34.7 | 18/26 | 8.6/4.2/+4.4 | 36/28 | 28 | 2 | 95% | 0.48/0.82 | 0.58 |
| 14 | Grok 4.7 Extra High | xhigh | 31.9 | 7/0 | 6.0/0.0/+6.0 | 8/0 | 8 | 1 | 89% | 34.19/0.00 | 0.30 |
| 15 | Grok 4.6 Extra High xAI | xhigh | 22.3 | 7/0 | 6.1/0.0/+6.1 | 9/0 | 8 | 1 | 90% | 7.49/0.00 | 0.59 |
| 16 | MiMo V2.5 Pro | max | 7.1 | 11/26 | 5.6/0.1/+5.6 | 17/8 | 14 | 2 | 89% | 0.32/0.82 | 1.42 |

样本 < 5 场未进排名，见下方观察区（Space Bunny Free）；主力（≥5 场）第一：Grok 4.6 Extra High Cursor（综合 78.9）

**观察区（样本不足未进排名，只列数字）**

- Space Bunny Free（3 场）：均质量 11.0、成立 7 条、覆盖 9%

**分项排名（各自口径，从优到差；产出/精准/性价比见上表）**

- **覆盖 · 重要性加权占参与轮次**：1. Grok 4.6 Extra High Cursor（11%）、2. DeepSeek V4.1 Flash（max）（10%）、3. Muse Spark 1.3 Contributor（10%）、4. Step 5 Preview（10%）、5. SWE-2（10%）、6. DeepSeek V4.1 Flash（high）（10%）、7. Kimi K3 方舟 Agent Plan（9%）、8. MiMo V2.6 Pro（9%）、9. Qwen3.8 Flash（9%）、10. MiniMax M3（8%）、11. GLM-5.3（8%）、12. MiMo V2.6 Flash（8%）、13. GLM-5.3-Flash（7%）、14. Grok 4.6 Extra High xAI（7%）、15. Grok 4.7 Extra High（6%）、16. MiMo V2.5 Pro（5%）
- **独立 · 独有占比（重要性加权）**：1. MiniMax M3（100%）、2. Grok 4.7 Extra High（97%）、3. MiMo V2.6 Flash（89%）、4. Grok 4.6 Extra High xAI（86%）、5. DeepSeek V4.1 Flash（high）（86%）、6. GLM-5.3（86%）、7. MiMo V2.5 Pro（85%）、8. Kimi K3 方舟 Agent Plan（85%）、9. Grok 4.6 Extra High Cursor（84%）、10. DeepSeek V4.1 Flash（max）（83%）、11. Muse Spark 1.3 Contributor（83%）、12. MiMo V2.6 Pro（83%）、13. Step 5 Preview（82%）、14. GLM-5.3-Flash（81%）、15. SWE-2（80%）、16. Qwen3.8 Flash（80%）
- **执行时间 · 平均每次分钟**：1. Muse Spark 1.3 Contributor（3.9）、2. MiMo V2.5 Pro（3.9）、3. GLM-5.3（5.6）、4. Grok 4.6 Extra High Cursor（6.3）、5. DeepSeek V4.1 Flash（high）（6.3）、6. DeepSeek V4.1 Flash（max）（6.5）、7. MiniMax M3（7.0）、8. Qwen3.8 Flash（7.5）、9. Grok 4.6 Extra High xAI（7.9）、10. Kimi K3 方舟 Agent Plan（8.1）、11. GLM-5.3-Flash（10.8）、12. MiMo V2.6 Flash（11.5）、13. MiMo V2.6 Pro（12.2）、14. SWE-2（12.2）、15. Step 5 Preview（12.3）、16. Grok 4.7 Extra High（18.1）
- **Token · 每条成立千枚**：1. SWE-2（98.8）、2. Muse Spark 1.3 Contributor（188.9）、3. MiMo V2.5 Pro（261.3）、4. Kimi K3 方舟 Agent Plan（286.2）、5. MiMo V2.6 Pro（350.7）、6. MiMo V2.6 Flash（442.8）、7. GLM-5.3（512.9）、8. GLM-5.3-Flash（598.8）、9. Grok 4.6 Extra High Cursor（609.4）、10. Grok 4.6 Extra High xAI（1,050.7）、11. MiniMax M3（1,269.1）、12. Step 5 Preview（1,414.8）、13. DeepSeek V4.1 Flash（high）（1,845.8）、14. DeepSeek V4.1 Flash（max）（1,849.9）、15. Grok 4.7 Extra High（6,197.7）
- **缓存命中率**：1. DeepSeek V4.1 Flash（high）（98%）、2. DeepSeek V4.1 Flash（max）（98%）、3. Step 5 Preview（97%）、4. MiniMax M3（96%）、5. GLM-5.3-Flash（94%）、6. GLM-5.3（94%）、7. Kimi K3 方舟 Agent Plan（93%）、8. MiMo V2.6 Flash（91%）、9. MiMo V2.6 Pro（91%）、10. Grok 4.7 Extra High（90%）、11. MiMo V2.5 Pro（88%）、12. Grok 4.6 Extra High xAI（87%）、13. Muse Spark 1.3 Contributor（86%）、14. Grok 4.6 Extra High Cursor（84%）、15. SWE-2（49%）、16. Qwen3.8 Flash（0%）
- **成立密度 · 每次（越多越好）**：1. Muse Spark 1.3 Contributor（3.06）、2. Step 5 Preview（2.83）、3. MiniMax M3（2.63）、4. DeepSeek V4.1 Flash（max）（2.56）、5. Grok 4.6 Extra High Cursor（2.55）、6. DeepSeek V4.1 Flash（high）（2.50）、7. SWE-2（2.44）、8. Kimi K3 方舟 Agent Plan（2.44）、9. MiMo V2.6 Pro（2.29）、10. Qwen3.8 Flash（2.22）、11. MiMo V2.6 Flash（2.14）、12. GLM-5.3-Flash（2.00）、13. GLM-5.3（1.94）、14. MiMo V2.5 Pro（1.55）、15. Grok 4.6 Extra High xAI（1.29）、16. Grok 4.7 Extra High（1.14）
- **生成速度 · 每秒 token（输出）**：1. DeepSeek V4.1 Flash（max）（108.2）、2. DeepSeek V4.1 Flash（high）（105.7）、3. MiniMax M3（68.8）、4. Grok 4.6 Extra High Cursor（58.3）、5. Step 5 Preview（55.7）、6. Grok 4.6 Extra High xAI（53.9）、7. Muse Spark 1.3 Contributor（53.3）、8. Grok 4.7 Extra High（52.9）、9. GLM-5.3（47.0）、10. MiMo V2.6 Flash（40.3）、11. MiMo V2.6 Pro（38.1）、12. MiMo V2.5 Pro（36.4）、13. GLM-5.3-Flash（29.6）、14. Kimi K3 方舟 Agent Plan（25.6）、15. SWE-2（6.1）
- **每条成立花费（越低越省）**：1. SWE-2（$0.00）、2. Muse Spark 1.3 Contributor（$0.00）、3. MiMo V2.6 Flash（$0.01）、4. GLM-5.3-Flash（$0.01）、5. MiMo V2.5 Pro（$0.02）、6. MiMo V2.6 Pro（$0.03）、7. DeepSeek V4.1 Flash（high）（$0.04）、8. DeepSeek V4.1 Flash（max）（$0.04）、9. MiniMax M3（$0.10）、10. GLM-5.3（$0.20）、11. Kimi K3 方舟 Agent Plan（$0.22）、12. Grok 4.6 Extra High Cursor（$0.49）、13. Grok 4.6 Extra High xAI（$0.83）、14. Grok 4.7 Extra High（$4.27）
- **每次花费（越低越省）**：1. SWE-2（$0.00）、2. Muse Spark 1.3 Contributor（$0.01）、3. MiMo V2.6 Flash（$0.02）、4. GLM-5.3-Flash（$0.03）、5. MiMo V2.5 Pro（$0.03）、6. MiMo V2.6 Pro（$0.06）、7. DeepSeek V4.1 Flash（high）（$0.10）、8. DeepSeek V4.1 Flash（max）（$0.11）、9. MiniMax M3（$0.27）、10. GLM-5.3（$0.39）、11. Kimi K3 方舟 Agent Plan（$0.53）、12. Grok 4.6 Extra High xAI（$1.07）、13. Grok 4.6 Extra High Cursor（$1.26）、14. Grok 4.7 Extra High（$4.88）

**模型评论（按综合分）**

1. **Grok 4.6 Extra High Cursor**（综合 78.9）— 长处：抓得最全（重要性加权占参与轮次 11%）；短处：独立相对最弱（独有占比 84%）
2. **MiniMax M3**（综合 72.9）— 长处：独立相对最好（独有占比 100%）；短处：假阳最多（每次 0.75 条，准确率 78%）
3. **Step 5 Preview**（综合 72.5）— 长处：产出最高（均质量 12.8）、最准（100%）；短处：花费未采集（该轴按中位记）
4. **DeepSeek V4.1 Flash（high）**（综合 70.8）— 长处：缓存命中最高（98%）；短处：无突出短板
5. **DeepSeek V4.1 Flash（max）**（综合 68.3）— 长处：花费相对最好（每次 $0.11）；短处：独立相对最弱（独有占比 83%）
6. **Muse Spark 1.3 Contributor**（综合 67.7）— 长处：效率分最高（成立重要性÷耗时 2.89）、最快（每次 3.9 分钟，档位 xhigh）；短处：独立相对最弱（独有占比 83%）
7. **Kimi K3 方舟 Agent Plan**（综合 60.8）— 长处：token 相对最好（每条成立 286 千）；短处：无突出短板
8. **SWE-2**（综合 56.6）— 长处：每条成立最便宜（$0.00）、每条成立最省 token（99 千）；短处：独立相对最弱（独有占比 80%）
9. **MiMo V2.6 Pro**（综合 53.8）— 长处：花费相对最好（每次 $0.06）；短处：独立相对最弱（独有占比 83%）
10. **MiMo V2.6 Flash**（综合 50.6）— 长处：花费相对最好（每次 $0.02）；短处：无突出短板
11. **Qwen3.8 Flash**（综合 48.3）— 长处：token 相对最好（每条成立 0 千）；短处：花费未采集（该轴按中位记）
12. **GLM-5.3**（综合 41.7）— 长处：—；短处：无突出短板
13. **GLM-5.3-Flash**（综合 34.7）— 长处：花费相对最好（每次 $0.03）；短处：独立相对最弱（独有占比 81%）
14. **Grok 4.7 Extra High**（综合 31.9）— 长处：独立相对最好（独有占比 97%）；短处：每条成立最贵（$4.27）、最慢（每次 18.1 分钟，档位 xhigh）、每条成立最耗 token（6,198 千）
15. **Grok 4.6 Extra High xAI**（综合 22.3）— 长处：—；短处：效果相对最弱（均质量 6.1）
16. **MiMo V2.5 Pro**（综合 7.1）— 长处：花费相对最好（每次 $0.03）；短处：均质量垫底（5.6）

## 设计分叉

| 指标 | 本期 | 上期 | 环比 |
|---|---:|---:|---:|
| 重要性5/4/3/2/1 | 10/75/64/7/0 | 114/90/82/19/0 | — |
| 场次 | 10 | 21 | -11 |
| 已评成功行 | 140 | 198 | -58 |
| 成立/方向 | 156 | 305 | -149 |
| 独有成立 | 129 | 122 | +7 |
| 假阳性 | 12 | 10 | +2 |
| 已评花费 $ | 19.38 | 21.03 | -1.66 |
| 未采集金额行 | 20 | 14 | +6 |
| 全部花费（含未评/失败）$ | 19.38 | 21.03 | -1.66 |
| 输入 token | 2,361,683 | 3,679,500 | -1317817 |
| 输出 token | 925,314 | 1,021,364 | -96050 |
| 缓存读 token | 11,628,323 | 11,108,363 | +519960 |
| 缓存写 token | 815,326 | 626,833 | +188493 |
| token 合计 | 15,730,646 | 16,436,060 | -705414 |
| 平均每次耗时 分钟 | 2.1 | 1.8 | +0.4 |
| 缓存命中率 % | 83.1 | 75.1 | +8.0 |

| # | 模型 | 思考 | 综合 | 场 本/上 | 均质量 本/上/Δ | 成立 本/上 | 独有 | 假阳 | 准确率 | 花费 本/上 | 契合 本/上 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | Grok 4.6 Extra High Cursor | xhigh | 100.0 | 7/21 | 16.3/16.6/-0.3 | 8/40 | 8 | 0 | 100% | 2.17/6.80 | 4.43/4.17 |
| 2 | SWE-2 | max | 72.5 | 10/1 | 14.0/6.0/+8.0 | 13/1 | 10 | 0 | 100% | 0.00/0.00 | 4.00/0.00 |
| 3 | Qwen3.8 Flash | max | 72.3 | 10/11 | 13.3/10.2/+3.1 | 12/8 | 11 | 0 | 100% | —/— | 3.78/4.38 |
| 4 | GLM-5.3 | max | 65.5 | 10/21 | 13.0/15.4/-2.4 | 12/37 | 10 | 1 | 92% | 0.47/0.97 | 3.89/4.11 |
| 5 | Fable 5.1 | medium | 64.7 | 10/16 | 13.2/17.7/-4.5 | 11/31 | 9 | 0 | 100% | 7.34/10.38 | 4.00/4.77 |
| 6 | DeepSeek V4.1 Flash（high） | high | 64.3 | 10/21 | 12.7/12.5/+0.2 | 12/31 | 10 | 0 | 100% | 0.11/0.30 | 3.56/3.59 |
| 7 | GLM-5.3-Flash | max | 61.9 | 10/21 | 12.6/11.2/+1.4 | 11/25 | 10 | 0 | 100% | 0.03/0.06 | 3.78/3.81 |
| 8 | Kimi K3 方舟 Agent Plan | max | 58.1 | 10/18 | 11.6/16.7/-5.1 | 11/37 | 9 | 2 | 85% | 0.80/1.74 | 3.44/4.13 |
| 9 | DeepSeek V4.1 Flash（max） | max | 53.5 | 10/21 | 11.7/13.0/-1.3 | 10/31 | 9 | 0 | 100% | 0.11/0.28 | 3.56/3.83 |
| 10 | Step 5 Preview | max | 53.5 | 10/2 | 11.3/10.5/+0.8 | 10/2 | 9 | 1 | 91% | —/— | 3.44/5.00 |
| 11 | Muse Spark 1.3 Contributor | xhigh | 45.9 | 10/21 | 11.5/13.0/-1.5 | 11/29 | 9 | 0 | 100% | 0.02/0.04 | 3.44/4.11 |
| 12 | MiniMax M3 | max | 27.2 | 10/0 | 10.1/0.0/+10.1 | 10/0 | 7 | 3 | 77% | 0.11/0.00 | 3.56/0.00 |
| 13 | MiMo V2.5 Pro | max | 25.0 | 7/21 | 6.3/10.2/-4.0 | 6/24 | 6 | 4 | 60% | 0.05/0.10 | 2.14/3.22 |

样本 < 5 场未进排名，见下方观察区（Grok 4.6 Extra High xAI、Grok 4.7 Extra High、MiMo V2.6 Flash、MiMo V2.6 Pro、Opus 5.5（max）、Space Bunny Free）；主力（≥5 场）第一：Grok 4.6 Extra High Cursor（综合 100.0）

**观察区（样本不足未进排名，只列数字）**

- Grok 4.6 Extra High xAI（3 场）：均质量 6.7、成立 2 条、覆盖 7%
- Grok 4.7 Extra High（3 场）：均质量 9.3、成立 4 条、覆盖 10%
- MiMo V2.6 Flash（3 场）：均质量 9.0、成立 4 条、覆盖 9%
- MiMo V2.6 Pro（3 场）：均质量 6.0、成立 2 条、覆盖 7%
- Opus 5.5（max）（3 场）：均质量 17.0、成立 6 条、覆盖 14%
- Space Bunny Free（1 场）：均质量 16.0、成立 1 条、覆盖 8%

**分项排名（各自口径，从优到差；产出/精准/性价比见上表）**

- **覆盖 · 重要性加权占参与轮次**：1. Grok 4.6 Extra High Cursor（10%）、2. SWE-2（10%）、3. GLM-5.3（9%）、4. DeepSeek V4.1 Flash（high）（9%）、5. Qwen3.8 Flash（9%）、6. Kimi K3 方舟 Agent Plan（9%）、7. Fable 5.1（9%）、8. GLM-5.3-Flash（8%）、9. Step 5 Preview（8%）、10. DeepSeek V4.1 Flash（max）（8%）、11. Muse Spark 1.3 Contributor（8%）、12. MiniMax M3（7%）、13. MiMo V2.5 Pro（6%）
- **独立 · 独有占比（重要性加权）**：1. Grok 4.6 Extra High Cursor（100%）、2. MiMo V2.5 Pro（100%）、3. Qwen3.8 Flash（91%）、4. GLM-5.3-Flash（89%）、5. Step 5 Preview（89%）、6. DeepSeek V4.1 Flash（max）（89%）、7. GLM-5.3（84%）、8. DeepSeek V4.1 Flash（high）（84%）、9. Kimi K3 方舟 Agent Plan（83%）、10. Fable 5.1（83%）、11. Muse Spark 1.3 Contributor（80%）、12. SWE-2（79%）、13. MiniMax M3（69%）
- **执行时间 · 平均每次分钟**：1. DeepSeek V4.1 Flash（high）（0.6）、2. DeepSeek V4.1 Flash（max）（0.6）、3. MiniMax M3（1.1）、4. Muse Spark 1.3 Contributor（1.2）、5. Fable 5.1（1.3）、6. MiMo V2.5 Pro（1.4）、7. Kimi K3 方舟 Agent Plan（1.5）、8. Qwen3.8 Flash（1.8）、9. GLM-5.3（1.9）、10. SWE-2（2.9）、11. Step 5 Preview（3.0）、12. GLM-5.3-Flash（3.4）、13. Grok 4.6 Extra High Cursor（3.4）
- **Token · 每条成立千枚**：1. Kimi K3 方舟 Agent Plan（15.4）、2. Muse Spark 1.3 Contributor（17.7）、3. GLM-5.3（18.5）、4. MiniMax M3（20.3）、5. GLM-5.3-Flash（23.1）、6. Step 5 Preview（23.1）、7. SWE-2（35.0）、8. DeepSeek V4.1 Flash（high）（42.5）、9. DeepSeek V4.1 Flash（max）（44.6）、10. Fable 5.1（50.5）、11. MiMo V2.5 Pro（166.8）、12. Grok 4.6 Extra High Cursor（239.3）
- **缓存命中率**：1. Fable 5.1（100%）、2. MiMo V2.5 Pro（93%）、3. Step 5 Preview（73%）、4. Grok 4.6 Extra High Cursor（70%）、5. DeepSeek V4.1 Flash（high）（62%）、6. DeepSeek V4.1 Flash（max）（57%）、7. SWE-2（32%）、8. GLM-5.3（29%）、9. GLM-5.3-Flash（17%）、10. MiniMax M3（10%）、11. Muse Spark 1.3 Contributor（1%）、12. Kimi K3 方舟 Agent Plan（0%）、13. Qwen3.8 Flash（0%）
- **成立密度 · 每次（越多越好）**：1. SWE-2（1.30）、2. GLM-5.3（1.20）、3. DeepSeek V4.1 Flash（high）（1.20）、4. Qwen3.8 Flash（1.20）、5. Grok 4.6 Extra High Cursor（1.14）、6. Kimi K3 方舟 Agent Plan（1.10）、7. GLM-5.3-Flash（1.10）、8. Muse Spark 1.3 Contributor（1.10）、9. Fable 5.1（1.10）、10. DeepSeek V4.1 Flash（max）（1.00）、11. Step 5 Preview（1.00）、12. MiniMax M3（1.00）、13. MiMo V2.5 Pro（0.86）
- **生成速度 · 每秒 token（输出）**：1. DeepSeek V4.1 Flash（max）（137.8）、2. DeepSeek V4.1 Flash（high）（134.4）、3. MiniMax M3（88.3）、4. GLM-5.3（59.7）、5. Muse Spark 1.3 Contributor（58.5）、6. Step 5 Preview（58.4）、7. Grok 4.6 Extra High Cursor（46.6）、8. Fable 5.1（43.2）、9. MiMo V2.5 Pro（41.7）、10. GLM-5.3-Flash（33.7）、11. SWE-2（31.1）、12. Kimi K3 方舟 Agent Plan（27.4）
- **每条成立花费（越低越省）**：1. SWE-2（$0.00）、2. Muse Spark 1.3 Contributor（$0.00）、3. GLM-5.3-Flash（$0.00）、4. MiMo V2.5 Pro（$0.01）、5. DeepSeek V4.1 Flash（high）（$0.01）、6. MiniMax M3（$0.01）、7. DeepSeek V4.1 Flash（max）（$0.01）、8. GLM-5.3（$0.04）、9. Kimi K3 方舟 Agent Plan（$0.07）、10. Grok 4.6 Extra High Cursor（$0.27）、11. Fable 5.1（$0.67）
- **每次花费（越低越省）**：1. SWE-2（$0.00）、2. Muse Spark 1.3 Contributor（$0.00）、3. GLM-5.3-Flash（$0.00）、4. MiMo V2.5 Pro（$0.01）、5. MiniMax M3（$0.01）、6. DeepSeek V4.1 Flash（high）（$0.01）、7. DeepSeek V4.1 Flash（max）（$0.01）、8. GLM-5.3（$0.05）、9. Kimi K3 方舟 Agent Plan（$0.08）、10. Grok 4.6 Extra High Cursor（$0.31）、11. Fable 5.1（$0.73）

**模型评论（按综合分）**

1. **Grok 4.6 Extra High Cursor**（综合 100.0）— 长处：产出最高（均质量 16.3）、最准（100%）、抓得最全（重要性加权占参与轮次 10%）、方向契合最高（4.43）；短处：最慢（每次 3.4 分钟，档位 xhigh）、每条成立最耗 token（239 千）
2. **SWE-2**（综合 72.5）— 长处：每条成立最便宜（$0.00）；短处：时间相对最弱（每次 2.9 分钟）
3. **Qwen3.8 Flash**（综合 72.3）— 长处：token 相对最好（每条成立 0 千）；短处：花费未采集（该轴按中位记）
4. **GLM-5.3**（综合 65.5）— 长处：各项居中（均质量 13.0、准确率 92%）；短处：无突出短板
5. **Fable 5.1**（综合 64.7）— 长处：缓存命中最高（100%）；短处：每条成立最贵（$0.67）
6. **DeepSeek V4.1 Flash（high）**（综合 64.3）— 长处：效率分最高（成立重要性÷耗时 8.41）、最快（每次 0.6 分钟，档位 high）；短处：无突出短板
7. **GLM-5.3-Flash**（综合 61.9）— 长处：花费相对最好（每次 $0.00）；短处：时间相对最弱（每次 3.4 分钟）
8. **Kimi K3 方舟 Agent Plan**（综合 58.1）— 长处：每条成立最省 token（15 千）；短处：独立相对最弱（独有占比 83%）
9. **DeepSeek V4.1 Flash（max）**（综合 53.5）— 长处：时间相对最好（每次 0.6 分钟）；短处：覆盖相对最弱（占参与轮次 8%）
10. **Step 5 Preview**（综合 53.5）— 长处：—；短处：花费未采集（该轴按中位记）
11. **Muse Spark 1.3 Contributor**（综合 45.9）— 长处：花费相对最好（每次 $0.00）；短处：独立相对最弱（独有占比 80%）
12. **MiniMax M3**（综合 27.2）— 长处：花费相对最好（每次 $0.01）；短处：独立相对最弱（独有占比 69%）
13. **MiMo V2.5 Pro**（综合 25.0）— 长处：独立相对最好（独有占比 100%）；短处：假阳最多（每次 0.57 条，准确率 60%）、均质量垫底（6.3）、契合最低（2.14）

## 未评 / 失败（本期）

未评行必须补评（`record-findings`）才算完成；失败行不计入对照。

| 场次 | 未评行 | 未评金额$ | 失败行 | 失败金额$ |
|---|---:|---:|---:|---:|
| 2026-09-21-1358 | 12 | 4.47 | 0 | 0.00 |
| 2026-09-23-1705 | 14 | 7.57 | 0 | 0.00 |

---

**说明**

- 综合能力评分与排名：只有达标样本（≥ 5 场）的模型进排名表，表格与评论按综合分从优到差；样本不足的进下方观察区（只列数字、不排名）；时间/花费/token 与效率分只作参考列，不进综合分；契合分与样本量只进评论，不进评分。
- 质量分 = 成立重要性合计 + 2×独有 − 3×说错；设计分叉再加契合。
- 图表逐项排名：每张图只按它自己那个口径排（产出/精准/独立/性价比/覆盖/执行时间/每条成立 token/缓存命中率/成立密度/每次花费/每条成立花费），图内 `#n` 是该图名次；执行时间、每条成立 token、花费越低越好，成立重要性是整场堆叠条、不做模型排名。
- 计数类口径：成立数、花费、假阳这类会随样本量涨的指标，一律折成「每次已评运行」再比（成立密度、每次花费、每次说错），否则跑得多的家天然占优；模型表里的成立/独有/假阳仍是本期合计，看总数时请对照「场」列。
- 花费三看：每次花费（跑一次多少钱）、每条成立花费（每个真问题多少钱）、token（每条成立 token）；按通道拆开后某批调用缺金额或缺 token 数据时，该家不进对应榜单（不按 0 记，也不当最优）。
- 时间与 token 口径：执行时间＝该模型已评行耗时合计 ÷ 已评运行次数（分钟，未评与失败行没有耗时数据）；token＝输入+输出+缓存读+缓存写；每条成立 token＝token 合计 ÷ 成立数（千枚，成立数为 0 或缺 token 不排）；缓存命中率＝缓存读 ÷（输入+缓存读）。
- 生成速度口径：每秒 token＝输出 token ÷ 耗时秒（按已评行汇总后相除），只算模型自己吐出来的输出；输入与缓存读是喂进去的、不算生成，推理 token 也不另加（各家输出是否已含思维输出不一致，加了会重复计）。
- 服务商口径：**按服务商（不是按工具）拆**——同一模型走过多个服务商时分行，名字本体不变，网页里名字只留本体、服务商是旁边的独立徽标（写短名，悬停看全名）；Markdown、图表与数据包写全名「名称 厂商」（空格分隔）。缩写对照：Curso...＝Cursor、xAI＝xAI、方舟 Ag...＝方舟 Agent Plan、方舟 Co...＝方舟 Coding Plan、Z.ai＝Z.ai、OpenCod...＝OpenCode Go、小米 To...＝小米 Token Plan、pi＝pi、Qoder＝Qoder CN、StepF...＝StepFun、Devin＝Devin。服务商取自 models.json 的 providers 表（改一处全站生效）：pi 调用看登记的服务商，agent 工具一律 Cursor，zcode/opencode 分别归 Z.ai / OpenCode Go；同一家的不同写法（zai 与 zai-coding-cn）算一家。拆不拆看本期与上期的并集，保证跨周可比；单服务商的家不拆。
- 口径：失败（退出码≠0/超时）与未评行不计入对照、花费照计；模型名按别名表归一化（k3→Kimi K3、glm-5→GLM-5.3、grok-4→Grok 4.6 Extra High、gemini-3→Gemini 3.8 Flash、mimo-v2→MiMo V2.5 Pro、deepseek-v4-flash→DeepSeek V4 Flash、`(zcode)` 并主名）；含通道后缀的行按通道各自归集。
- 本目录是一次生成的同批产物（report.md / data.json / summary.json / images；贴文 post.md 可选，重生成默认保留原有贴文），按 ISO 周归档（目录名即周号）；同一周再次生成会覆盖本目录，旧版在归档仓的 git 历史里。默认报上一个完整周，`--week current` 可出进行中的本周。

