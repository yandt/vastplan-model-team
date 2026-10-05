[← 回到归档目录](../../index.html)

# 模型团队周报 · 2026 年第 40 周（2026-W40）

- 本窗：**2026-09-28 → 2026-10-05**；环比上一期：**2026-09-21 → 2026-09-28**
- 综合能力评分（表格「综合」列）：效果 41% ｜ 覆盖 34% ｜ 独立 25% ｜ 时间 0%↓ ｜ 花费 0%↓ ｜ token 0%↓
- 评分口径：按权重（41% 效果 + 34% 覆盖 + 25% 独立）在同活动类型内 min-max 归一到 0～100 后加权：效果（均质量）、覆盖（同名问题去重后的重要性加权成立数 ÷ 所参与轮次全场去重合计，再按贝叶斯收缩往全场均值靠：分母越小收缩越强）、独立（独有（重要性加权）/ 成立（重要性加权））；时间（每次分钟）、花费（每次花费）、token（每条成立 token）三项资源轴与效率分、契合分、样本量一样只作参考列，不进综合分；某项没采集到时（如订阅制模型没有金额）按中位 50 记，并在评论里标注。

## 简报

这周继续跑 VastPlan——我们自研的 Node/TypeScript 插件运行时与 Portal 内核，真实工程，不是题库。事后审计：多家模型并行找 BUG、对照代码判定是否成立；设计分叉：各家出方案，按用户最终选定的算契合度。

口径先交代：失败与未评场次不进对照、花费照计；订阅制模型金额未采集不记 0；总分是同活动类型内的相对排名。

事后审计 21 场（上期 24），已评 218 行，成立 297 条，假阳从 61 降到 28，花费 $100.88，token 431.4M（缓存命中 87%），平均每次 8.1 分钟。前五：

1. SWE-2 88.6
2. DeepSeek V4.1 Flash（max） Cline 85.8
3. Space Bunny Free 81.0
4. Grok 4.7 Extra High 80.7
5. Grok 4.6 Extra High xAI 71.5

榜首换人：SWE-2 从上期第 8（56.0）升到第 1，+32.6，均质量 10.9、成立 33 条。DeepSeek V4.1 Flash（max） Cline 新进榜直接第 2，每次花费 $0.00 全场最低、均质量 12.8 全场最高。涨幅更大的是 Grok 两家：4.7 从第 12 到第 4，+43.4；4.6 Extra High xAI 从第 16 到第 5，+45.8。

上期第 1 的 Space Bunny Free 退到第 3（84.1→81.0）。观察区的 Muse Spark 1.3 Contributor Cline 打了 4 场、均质量 13.3，差一场样本没进排名。

另一头 DeepSeek V4.1 Flash（max） OpenCode Go 从第 4 归零，成立 0 条；上期第 2 的 Grok 4.6 Extra High Cursor 本期掉榜。费用端最贵是 Grok 4.7 Extra High：每次 $4.07，每条成立缺陷合 $2.18，两项都属事后审计之最。

设计分叉 6 场（上期 11），成立 91 条，假阳 12 降到 2，花费 $20.61，平均每次 2.8 分钟。前三：

1. Opus 5.5（max） Cursor 87.5
2. Grok 4.7 Extra High 64.2
3. Kimi K3 56.8

Opus 5.5（max） Cursor 新进榜即第 1，均质量 20.8、契合分 4.33 都是全场最高，代价是每次 $2.52，也是设计分叉里最贵的一家。上期头名 Grok 4.6 Extra High Cursor 本期掉榜；末位 MiniMax M3 只剩 12.5（降 10.9），均质量 3.8、成立密度 0.33。

专责推理 5 场，花费 $12.56，各家样本都不足 5 场，只进观察区不排名。

另有 77 行未评、18 行失败，按口径不计入对照。

想看哪家细账，评论区点单。#LLM #AI #Benchmark #MultiModel

## 事后审计

| 指标 | 本期 | 上期 | 环比 |
|---|---:|---:|---:|
| 重要性5/4/3/2/1 | 45/124/95/24/9 | 36/150/227/176/26 | — |
| 场次 | 21 | 24 | -3 |
| 已评成功行 | 218 | 291 | -73 |
| 成立/方向 | 297 | 615 | -318 |
| 独有成立 | 232 | 515 | -283 |
| 假阳性 | 28 | 61 | -33 |
| 已评花费 $ | 100.88 | 108.92 | -8.04 |
| 未采集金额行 | 58 | 0 | +58 |
| 全部花费（含未评/失败）$ | 116.59 | 120.96 | -4.37 |
| 输入 token | 57,210,762 | 31,902,934 | +25307828 |
| 输出 token | 4,356,192 | 6,994,989 | -2638797 |
| 缓存读 token | 369,842,754 | 592,762,066 | -222919312 |
| 缓存写 token | 0 | 0 | +0 |
| token 合计 | 431,409,708 | 631,659,989 | -200250281 |
| 平均每次耗时 分钟 | 8.1 | 8.5 | -0.4 |
| 缓存命中率 % | 86.6 | 94.9 | -8.3 |

| # | 模型 | 思考 | 综合 | 场 本/上 | 均质量 本/上/Δ | 成立 本/上 | 独有 | 假阳 | 准确率 | 花费 本/上 | 效率 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | SWE-2 | max | 88.6 | 15/22 | 10.9/9.7/+1.1 | 33/50 | 25 | 2 | 94% | 0.00/0.00 | 0.66 |
| 2 | DeepSeek V4.1 Flash（max） Cline | max | 85.8 | 5/0 | 12.8/0.0/+12.8 | 13/0 | 10 | 1 | 93% | 0.00/0.00 | 1.58 |
| 3 | Space Bunny Free | max | 81.0 | 15/7 | 9.9/10.9/-0.9 | 32/16 | 26 | 3 | 91% | 0.00/0.00 | 1.10 |
| 4 | Grok 4.7 Extra High | xhigh | 80.7 | 15/11 | 9.9/6.1/+3.8 | 28/13 | 23 | 1 | 97% | 61.01/46.86 | 0.50 |
| 5 | Grok 4.6 Extra High xAI | xhigh | 71.5 | 15/11 | 8.7/5.6/+3.0 | 25/13 | 21 | 0 | 100% | 16.49/13.17 | 0.88 |
| 6 | Qwen3.8 Flash | max | 71.2 | 14/22 | 8.1/8.8/-0.7 | 27/44 | 19 | 6 | 82% | 0.00/0.00 | 0.73 |
| 7 | GLM-5.3 | max | 63.8 | 15/22 | 7.1/7.4/-0.2 | 22/37 | 15 | 1 | 96% | 8.13/8.79 | 0.82 |
| 8 | Kimi K3 | max | 63.3 | 15/22 | 6.3/9.0/-2.6 | 19/46 | 16 | 1 | 95% | 10.25/13.46 | 0.55 |
| 9 | GLM-5.3-Flash | max | 59.0 | 15/22 | 6.3/7.9/-1.6 | 20/41 | 13 | 3 | 87% | 0.55/0.57 | 0.45 |
| 10 | DeepSeek V4.1 Flash（high） Cline | high | 58.8 | 5/0 | 6.8/0.0/+6.8 | 9/0 | 6 | 3 | 75% | 0.00/0.00 | 1.15 |
| 11 | Step 5 Preview | max | 51.1 | 15/22 | 4.9/12.0/-7.1 | 16/57 | 11 | 1 | 94% | 0.00/0.00 | 0.33 |
| 12 | MiniMax M3 | max | 48.9 | 15/20 | 4.3/9.3/-5.0 | 12/47 | 12 | 0 | 100% | 3.48/5.29 | 0.41 |
| 13 | Muse Spark 1.3 Contributor OpenCode Go | xhigh | 46.5 | 9/22 | 3.2/10.8/-7.6 | 6/61 | 6 | 2 | 75% | 0.06/0.24 | 0.59 |
| 14 | MiMo V2.6 Flash | max | 45.9 | 15/11 | 4.1/8.0/-3.9 | 10/20 | 9 | 0 | 100% | 0.18/0.25 | 0.17 |
| 15 | MiMo V2.6 Pro | max | 43.1 | 15/11 | 4.0/8.5/-4.5 | 13/22 | 10 | 2 | 87% | 0.52/0.72 | 0.18 |
| 16 | DeepSeek V4.1 Flash（high） OpenCode Go | high | 28.5 | 8/22 | 0.6/10.6/-10.0 | 1/50 | 1 | 0 | 100% | 0.11/2.20 | 0.04 |
| 17 | DeepSeek V4.1 Flash（max） OpenCode Go | max | 0.0 | 8/22 | 0.0/10.9/-10.9 | 0/53 | 0 | 0 | 0% | 0.11/2.34 | 0.00 |

样本 < 5 场未进排名，见下方观察区（Muse Spark 1.3 Contributor Cline）；主力（≥5 场）第一：SWE-2（综合 88.6）

**观察区（样本不足未进排名，只列数字）**

- Muse Spark 1.3 Contributor Cline（4 场）：均质量 13.3、成立 11 条、覆盖 10%

**分项排名（各自口径，从优到差；产出/精准/性价比见上表）**

- **覆盖 · 重要性加权占参与轮次**：1. SWE-2（13%）、2. Space Bunny Free（11%）、3. Grok 4.7 Extra High（11%）、4. Qwen3.8 Flash（10%）、5. DeepSeek V4.1 Flash（max） Cline（10%）、6. Grok 4.6 Extra High xAI（9%）、7. GLM-5.3（9%）、8. Kimi K3（8%）、9. GLM-5.3-Flash（8%）、10. DeepSeek V4.1 Flash（high） Cline（8%）、11. Step 5 Preview（7%）、12. Muse Spark 1.3 Contributor OpenCode Go（5%）、13. MiMo V2.6 Pro（5%）、14. MiMo V2.6 Flash（5%）、15. MiniMax M3（5%）、16. DeepSeek V4.1 Flash（high） OpenCode Go（2%）、17. DeepSeek V4.1 Flash（max） OpenCode Go（1%）
- **独立 · 独有占比（重要性加权）**：1. Muse Spark 1.3 Contributor OpenCode Go（100%）、2. MiniMax M3（100%）、3. DeepSeek V4.1 Flash（high） OpenCode Go（100%）、4. MiMo V2.6 Flash（90%）、5. Kimi K3（89%）、6. Grok 4.7 Extra High（85%）、7. Space Bunny Free（84%）、8. Grok 4.6 Extra High xAI（83%）、9. DeepSeek V4.1 Flash（max） Cline（80%）、10. Step 5 Preview（79%）、11. MiMo V2.6 Pro（79%）、12. SWE-2（79%）、13. GLM-5.3（75%）、14. DeepSeek V4.1 Flash（high） Cline（73%）、15. Qwen3.8 Flash（72%）、16. GLM-5.3-Flash（72%）、17. DeepSeek V4.1 Flash（max） OpenCode Go（0%）
- **执行时间 · 平均每次分钟**：1. DeepSeek V4.1 Flash（high） OpenCode Go（1.1）、2. DeepSeek V4.1 Flash（max） OpenCode Go（1.2）、3. Muse Spark 1.3 Contributor OpenCode Go（2.0）、4. MiniMax M3（3.0）、5. DeepSeek V4.1 Flash（high） Cline（5.7）、6. MiMo V2.6 Flash（6.2）、7. DeepSeek V4.1 Flash（max） Cline（6.3）、8. GLM-5.3（6.7）、9. Grok 4.6 Extra High xAI（7.3）、10. MiMo V2.6 Pro（7.5）、11. Space Bunny Free（7.9）、12. Kimi K3（9.3）、13. Qwen3.8 Flash（9.4）、14. GLM-5.3-Flash（11.6）、15. Step 5 Preview（11.7）、16. SWE-2（14.5）、17. Grok 4.7 Extra High（15.5）
- **Token · 每条成立千枚**：1. SWE-2（132.9）、2. Muse Spark 1.3 Contributor OpenCode Go（401.4）、3. Kimi K3（767.9）、4. MiMo V2.6 Pro（856.2）、5. Grok 4.6 Extra High xAI（900.6）、6. GLM-5.3（1,012.9）、7. GLM-5.3-Flash（1,333.2）、8. MiMo V2.6 Flash（1,389.6）、9. Space Bunny Free（1,435.2）、10. DeepSeek V4.1 Flash（max） Cline（2,447.2）、11. Step 5 Preview（2,760.1）、12. Grok 4.7 Extra High（3,345.8）、13. DeepSeek V4.1 Flash（high） OpenCode Go（4,024.4）、14. MiniMax M3（4,196.1）、15. DeepSeek V4.1 Flash（high） Cline（4,200.4）
- **缓存命中率**：1. MiniMax M3（98%）、2. Space Bunny Free（97%）、3. DeepSeek V4.1 Flash（max） OpenCode Go（97%）、4. DeepSeek V4.1 Flash（high） OpenCode Go（97%）、5. MiMo V2.6 Flash（96%）、6. Step 5 Preview（96%）、7. GLM-5.3-Flash（95%）、8. GLM-5.3（95%）、9. MiMo V2.6 Pro（94%）、10. Kimi K3（93%）、11. Grok 4.7 Extra High（93%）、12. Grok 4.6 Extra High xAI（91%）、13. Muse Spark 1.3 Contributor OpenCode Go（82%）、14. SWE-2（51%）、15. DeepSeek V4.1 Flash（high） Cline（49%）、16. DeepSeek V4.1 Flash（max） Cline（49%）、17. Qwen3.8 Flash（0%）
- **成立密度 · 每次（越多越好）**：1. DeepSeek V4.1 Flash（max） Cline（2.60）、2. SWE-2（2.20）、3. Space Bunny Free（2.13）、4. Qwen3.8 Flash（1.93）、5. Grok 4.7 Extra High（1.87）、6. DeepSeek V4.1 Flash（high） Cline（1.80）、7. Grok 4.6 Extra High xAI（1.67）、8. GLM-5.3（1.47）、9. GLM-5.3-Flash（1.33）、10. Kimi K3（1.27）、11. Step 5 Preview（1.07）、12. MiMo V2.6 Pro（0.87）、13. MiniMax M3（0.80）、14. MiMo V2.6 Flash（0.67）、15. Muse Spark 1.3 Contributor OpenCode Go（0.67）、16. DeepSeek V4.1 Flash（high） OpenCode Go（0.13）、17. DeepSeek V4.1 Flash（max） OpenCode Go（0.00）
- **生成速度 · 每秒 token（输出）**：1. DeepSeek V4.1 Flash（max） Cline（97.6）、2. DeepSeek V4.1 Flash（high） Cline（96.4）、3. DeepSeek V4.1 Flash（high） OpenCode Go（77.8）、4. DeepSeek V4.1 Flash（max） OpenCode Go（76.7）、5. MiniMax M3（69.1）、6. Grok 4.6 Extra High xAI（64.4）、7. Space Bunny Free（61.9）、8. Step 5 Preview（61.6）、9. Grok 4.7 Extra High（59.2）、10. Muse Spark 1.3 Contributor OpenCode Go（47.3）、11. GLM-5.3（43.8）、12. MiMo V2.6 Flash（34.9）、13. MiMo V2.6 Pro（33.5）、14. GLM-5.3-Flash（32.1）、15. Kimi K3（26.1）、16. SWE-2（7.4）
- **每条成立花费（越低越省）**：1. DeepSeek V4.1 Flash（max） Cline（$0.00）、2. DeepSeek V4.1 Flash（high） Cline（$0.00）、3. Step 5 Preview（$0.00）、4. SWE-2（$0.00）、5. Space Bunny Free（$0.00）、6. Qwen3.8 Flash（$0.00）、7. Muse Spark 1.3 Contributor OpenCode Go（$0.01）、8. MiMo V2.6 Flash（$0.02）、9. GLM-5.3-Flash（$0.03）、10. MiMo V2.6 Pro（$0.04）、11. DeepSeek V4.1 Flash（high） OpenCode Go（$0.11）、12. MiniMax M3（$0.29）、13. GLM-5.3（$0.37）、14. Kimi K3（$0.54）、15. Grok 4.6 Extra High xAI（$0.66）、16. Grok 4.7 Extra High（$2.18）
- **每次花费（越低越省）**：1. DeepSeek V4.1 Flash（max） Cline（$0.00）、2. DeepSeek V4.1 Flash（high） Cline（$0.00）、3. Step 5 Preview（$0.00）、4. SWE-2（$0.00）、5. Space Bunny Free（$0.00）、6. Qwen3.8 Flash（$0.00）、7. Muse Spark 1.3 Contributor OpenCode Go（$0.01）、8. MiMo V2.6 Flash（$0.01）、9. DeepSeek V4.1 Flash（max） OpenCode Go（$0.01）、10. DeepSeek V4.1 Flash（high） OpenCode Go（$0.01）、11. MiMo V2.6 Pro（$0.03）、12. GLM-5.3-Flash（$0.04）、13. MiniMax M3（$0.23）、14. GLM-5.3（$0.54）、15. Kimi K3（$0.68）、16. Grok 4.6 Extra High xAI（$1.10）、17. Grok 4.7 Extra High（$4.07）

**模型评论（按综合分）**

1. **SWE-2**（综合 88.6）— 长处：综合最高（88.6）、成立与独有最多（33/25 条）、覆盖率第一（13%）；短处：每次 14.5 分钟，全程偏慢、缓存命中 51%，偏低
2. **DeepSeek V4.1 Flash（max） Cline**（综合 85.8）— 长处：综合第二（85.8）、均质量最高（12.8）、效率 1.58，居前；短处：每条成立 token 2447 千，偏高、缓存命中 49%，偏低、样本仅 5 场，结论留余地
3. **Space Bunny Free**（综合 81.0）— 长处：独有最多（26 条）、成立 32 条，居第二、免费（$0.00）、缓存命中 97%；短处：假阳 3 个、准确率 91%，不突出
4. **Grok 4.7 Extra High**（综合 80.7）— 长处：准确率 97%，居前列、独有 23 条，居前、重要性 5 级成立 5 条，并列最多；短处：每条成立最贵（$2.18），每次 $4.07、每次最慢（15.5 分钟）、效率 0.50，偏低
5. **Grok 4.6 Extra High xAI**（综合 71.5）— 长处：准确率 100%，零假阳、独有 21 条，居前；短处：综合 71.5，居中、均质量 8.7，不突出
6. **Qwen3.8 Flash**（综合 71.2）— 长处：成立 27 条，居前列；短处：假阳最多（6 个）、准确率 82%，偏低
7. **GLM-5.3**（综合 63.8）— 长处：准确率 96%，居前、缓存命中 95%，较高；短处：均质量 7.1，偏低、成立 22 条，不算多
8. **Kimi K3**（综合 63.3）— 长处：准确率 95%、每条成立 token 768 千，量偏低；短处：均质量 6.3，偏低、成立仅 19 条、效率 0.55，不突出
9. **GLM-5.3-Flash**（综合 59.0）— 长处：每条成立成本极低（$0.03）、缓存命中 95%，较高；短处：准确率 87%，偏低、假阳 3 个、效率 0.45、每次 11.6 分钟，偏慢
10. **DeepSeek V4.1 Flash（high） Cline**（综合 58.8）— 长处：效率 1.15，居前；每次 5.7 分钟（档位低）；短处：准确率 75%，并列垫底、每条成立 token 4200 千，全场最高、样本仅 5 场，结论留余地
11. **Step 5 Preview**（综合 51.1）— 长处：准确率 94%；短处：均质量 4.9，偏低、效率 0.33，偏低、成立仅 16 条
12. **MiniMax M3**（综合 48.9）— 长处：每次 3.0 分钟，耗时较低、准确率 100%，零假阳、缓存命中最高（98%）；短处：成立仅 12 条、覆盖 5%、每条成立 token 4196 千，偏高
13. **Muse Spark 1.3 Contributor OpenCode Go**（综合 46.5）— 长处：每次 2.0 分钟，速度快、成本极低（每次 $0.01）；短处：均质量 3.2，居末段、准确率 75%，并列垫底、样本 9 场，结论留余地
14. **MiMo V2.6 Flash**（综合 45.9）— 长处：准确率 100%，零假阳、重要性 5 级成立 5 条，并列最多；短处：效率 0.17，明显偏低、成立仅 10 条
15. **MiMo V2.6 Pro**（综合 43.1）— 长处：成本低（每次 $0.03）；短处：效率 0.18，明显偏低、综合 43.1，居后段
16. **DeepSeek V4.1 Flash（high） OpenCode Go**（综合 28.5）— 长处：准确率 100%（仅 1 条成立）、每次 1.1 分钟，全场最快（档位低）；短处：仅成立 1 条，均质量 0.6、综合 28.5，居末段
17. **DeepSeek V4.1 Flash（max） OpenCode Go**（综合 0.0）— 长处：每次 1.2 分钟，速度居前；短处：零成立，综合 0.0 垫底、覆盖仅 1%

## 设计分叉

| 指标 | 本期 | 上期 | 环比 |
|---|---:|---:|---:|
| 重要性5/4/3/2/1 | 19/45/27/0/0 | 10/75/64/7/0 | — |
| 场次 | 6 | 11 | -5 |
| 已评成功行 | 96 | 157 | -61 |
| 成立/方向 | 91 | 156 | -65 |
| 独有成立 | 91 | 129 | -38 |
| 假阳性 | 2 | 12 | -10 |
| 已评花费 $ | 20.61 | 22.66 | -2.05 |
| 未采集金额行 | 7 | 0 | +7 |
| 全部花费（含未评/失败）$ | 20.61 | 22.66 | -2.05 |
| 输入 token | 2,811,558 | 2,651,979 | +159579 |
| 输出 token | 922,810 | 1,059,919 | -137109 |
| 缓存读 token | 21,679,201 | 13,965,816 | +7713385 |
| 缓存写 token | 855,235 | 972,304 | -117069 |
| token 合计 | 26,268,804 | 18,650,018 | +7618786 |
| 平均每次耗时 分钟 | 2.8 | 2.1 | +0.6 |
| 缓存命中率 % | 88.5 | 84.0 | +4.5 |

| # | 模型 | 思考 | 综合 | 场 本/上 | 均质量 本/上/Δ | 成立 本/上 | 独有 | 假阳 | 准确率 | 花费 本/上 | 契合 本/上 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | Opus 5.5（max） Cursor | max | 87.5 | 6/4 | 20.8/12.8/+8.1 | 11/6 | 11 | 0 | 100% | 15.10/8.27 | 4.33/5.00 |
| 2 | Grok 4.7 Extra High | xhigh | 64.2 | 6/4 | 15.0/7.0/+8.0 | 8/4 | 8 | 1 | 89% | 3.53/1.76 | 3.50/2.50 |
| 3 | Kimi K3 | max | 56.8 | 6/11 | 15.2/10.5/+4.6 | 7/11 | 7 | 0 | 100% | 0.57/0.89 | 4.00/3.44 |
| 4 | Space Bunny Free | max | 56.8 | 6/2 | 15.2/8.0/+7.2 | 7/1 | 7 | 0 | 100% | 0.00/0.00 | 4.00/5.00 |
| 5 | DeepSeek V4.1 Flash（max） Cline | max | 48.3 | 5/0 | 13.6/0.0/+13.6 | 5/0 | 5 | 0 | 100% | 0.00/0.00 | 3.80/0.00 |
| 6 | GLM-5.3 | max | 47.7 | 6/11 | 13.0/11.8/+1.2 | 6/12 | 6 | 0 | 100% | 0.33/0.50 | 3.50/3.89 |
| 7 | DeepSeek V4.1 Flash（high） Cline | high | 43.5 | 5/0 | 11.6/0.0/+11.6 | 6/0 | 6 | 0 | 100% | 0.00/0.00 | 2.60/0.00 |
| 8 | GLM-5.3-Flash | max | 43.4 | 6/11 | 12.2/11.5/+0.7 | 6/11 | 6 | 0 | 100% | 0.02/0.03 | 3.33/3.78 |
| 9 | Grok 4.6 Extra High xAI | xhigh | 42.6 | 6/4 | 11.8/5.0/+6.8 | 5/2 | 5 | 0 | 100% | 0.97/0.46 | 3.33/2.50 |
| 10 | Qwen3.8 Flash | max | 40.3 | 6/11 | 11.5/12.1/-0.6 | 6/12 | 6 | 0 | 100% | 0.00/0.00 | 3.17/3.78 |
| 11 | MiMo V2.6 Pro | max | 39.8 | 6/4 | 11.0/4.5/+6.5 | 5/2 | 5 | 0 | 100% | 0.04/0.02 | 3.60/2.50 |
| 12 | MiMo V2.6 Flash | max | 37.5 | 6/4 | 10.7/6.8/+3.9 | 5/4 | 5 | 0 | 100% | 0.02/0.01 | 3.60/2.50 |
| 13 | SWE-2 | max | 35.6 | 6/11 | 10.8/12.7/-1.9 | 4/13 | 4 | 0 | 100% | 0.00/0.00 | 3.50/4.00 |
| 14 | Step 5 Preview | max | 34.7 | 6/11 | 9.5/10.3/-0.8 | 5/10 | 5 | 1 | 83% | 0.00/0.00 | 2.67/3.44 |
| 15 | Muse Spark 1.3 Contributor OpenCode Go | xhigh | 13.2 | 5/11 | 4.0/10.5/-6.5 | 2/11 | 2 | 0 | 100% | 0.00/0.03 | 1.67/3.44 |
| 16 | MiniMax M3 | max | 12.5 | 6/11 | 3.8/9.2/-5.3 | 2/10 | 2 | 0 | 100% | 0.03/0.12 | 2.00/3.56 |

样本 < 5 场未进排名，见下方观察区（DeepSeek V4.1 Flash（high） OpenCode Go、DeepSeek V4.1 Flash（max） OpenCode Go、Muse Spark 1.3 Contributor Cline）；主力（≥5 场）第一：Opus 5.5（max） Cursor（综合 87.5）

**观察区（样本不足未进排名，只列数字）**

- DeepSeek V4.1 Flash（high） OpenCode Go（1 场）：均质量 0.0、成立 0 条、覆盖 4%
- DeepSeek V4.1 Flash（max） OpenCode Go（1 场）：均质量 0.0、成立 0 条、覆盖 4%
- Muse Spark 1.3 Contributor Cline（1 场）：均质量 11.0、成立 1 条、覆盖 6%

**分项排名（各自口径，从优到差；产出/精准/性价比见上表）**

- **覆盖 · 重要性加权占参与轮次**：1. Opus 5.5（max） Cursor（12%）、2. Grok 4.7 Extra High（10%）、3. Kimi K3（8%）、4. Space Bunny Free（8%）、5. GLM-5.3（7%）、6. DeepSeek V4.1 Flash（max） Cline（6%）、7. DeepSeek V4.1 Flash（high） Cline（6%）、8. Grok 4.6 Extra High xAI（6%）、9. GLM-5.3-Flash（6%）、10. MiMo V2.6 Pro（6%）、11. Qwen3.8 Flash（5%）、12. MiMo V2.6 Flash（5%）、13. Step 5 Preview（5%）、14. SWE-2（5%）、15. Muse Spark 1.3 Contributor OpenCode Go（3%）、16. MiniMax M3（3%）
- **独立 · 独有占比（重要性加权）**：1. Kimi K3（100%）、2. Grok 4.6 Extra High xAI（100%）、3. Grok 4.7 Extra High（100%）、4. GLM-5.3（100%）、5. GLM-5.3-Flash（100%）、6. DeepSeek V4.1 Flash（max） Cline（100%）、7. DeepSeek V4.1 Flash（high） Cline（100%）、8. MiMo V2.6 Pro（100%）、9. MiMo V2.6 Flash（100%）、10. Muse Spark 1.3 Contributor OpenCode Go（100%）、11. Opus 5.5（max） Cursor（100%）、12. Qwen3.8 Flash（100%）、13. Step 5 Preview（100%）、14. SWE-2（100%）、15. MiniMax M3（100%）、16. Space Bunny Free（100%）
- **执行时间 · 平均每次分钟**：1. MiniMax M3（0.5）、2. Muse Spark 1.3 Contributor OpenCode Go（0.5）、3. DeepSeek V4.1 Flash（high） Cline（0.8）、4. Qwen3.8 Flash（1.2）、5. DeepSeek V4.1 Flash（max） Cline（1.6）、6. MiMo V2.6 Flash（1.8）、7. Kimi K3（1.8）、8. Space Bunny Free（1.9）、9. Step 5 Preview（2.2）、10. MiMo V2.6 Pro（2.2）、11. Grok 4.6 Extra High xAI（2.3）、12. GLM-5.3（2.4）、13. GLM-5.3-Flash（3.7）、14. SWE-2（3.8）、15. Grok 4.7 Extra High（4.9）、16. Opus 5.5（max） Cursor（12.9）
- **Token · 每条成立千枚**：1. Step 5 Preview（11.9）、2. Kimi K3（16.7）、3. Muse Spark 1.3 Contributor OpenCode Go（21.0）、4. MiMo V2.6 Flash（22.9）、5. MiniMax M3（24.1）、6. GLM-5.3（24.9）、7. GLM-5.3-Flash（25.5）、8. MiMo V2.6 Pro（31.4）、9. SWE-2（66.2）、10. Space Bunny Free（97.7）、11. DeepSeek V4.1 Flash（high） Cline（117.6）、12. Grok 4.6 Extra High xAI（146.2）、13. DeepSeek V4.1 Flash（max） Cline（227.4）、14. Grok 4.7 Extra High（438.6）、15. Opus 5.5（max） Cursor（1,670.8）
- **缓存命中率**：1. Opus 5.5（max） Cursor（100%）、2. Grok 4.7 Extra High（77%）、3. Space Bunny Free（76%）、4. Grok 4.6 Extra High xAI（68%）、5. MiMo V2.6 Pro（67%）、6. Step 5 Preview（51%）、7. DeepSeek V4.1 Flash（max） Cline（45%）、8. DeepSeek V4.1 Flash（high） Cline（42%）、9. SWE-2（19%）、10. MiMo V2.6 Flash（18%）、11. GLM-5.3（16%）、12. MiniMax M3（1%）、13. Muse Spark 1.3 Contributor OpenCode Go（1%）、14. Kimi K3（0%）、15. GLM-5.3-Flash（0%）、16. Qwen3.8 Flash（0%）
- **成立密度 · 每次（越多越好）**：1. Opus 5.5（max） Cursor（1.83）、2. Grok 4.7 Extra High（1.33）、3. DeepSeek V4.1 Flash（high） Cline（1.20）、4. Kimi K3（1.17）、5. Space Bunny Free（1.17）、6. GLM-5.3（1.00）、7. GLM-5.3-Flash（1.00）、8. DeepSeek V4.1 Flash（max） Cline（1.00）、9. Qwen3.8 Flash（1.00）、10. Grok 4.6 Extra High xAI（0.83）、11. MiMo V2.6 Pro（0.83）、12. MiMo V2.6 Flash（0.83）、13. Step 5 Preview（0.83）、14. SWE-2（0.67）、15. Muse Spark 1.3 Contributor OpenCode Go（0.40）、16. MiniMax M3（0.33）
- **生成速度 · 每秒 token（输出）**：1. DeepSeek V4.1 Flash（high） Cline（100.0）、2. MiniMax M3（94.2）、3. DeepSeek V4.1 Flash（max） Cline（86.9）、4. Opus 5.5（max） Cursor（79.9）、5. Grok 4.7 Extra High（65.0）、6. Step 5 Preview（60.8）、7. Space Bunny Free（59.1）、8. Grok 4.6 Extra High xAI（59.0）、9. GLM-5.3（52.9）、10. Muse Spark 1.3 Contributor OpenCode Go（48.5）、11. MiMo V2.6 Flash（39.9）、12. GLM-5.3-Flash（37.0）、13. MiMo V2.6 Pro（33.3）、14. SWE-2（32.8）、15. Kimi K3（27.8）
- **每条成立花费（越低越省）**：1. DeepSeek V4.1 Flash（max） Cline（$0.00）、2. DeepSeek V4.1 Flash（high） Cline（$0.00）、3. Qwen3.8 Flash（$0.00）、4. Step 5 Preview（$0.00）、5. SWE-2（$0.00）、6. Space Bunny Free（$0.00）、7. Muse Spark 1.3 Contributor OpenCode Go（$0.00）、8. GLM-5.3-Flash（$0.00）、9. MiMo V2.6 Flash（$0.00）、10. MiMo V2.6 Pro（$0.01）、11. MiniMax M3（$0.01）、12. GLM-5.3（$0.05）、13. Kimi K3（$0.08）、14. Grok 4.6 Extra High xAI（$0.19）、15. Grok 4.7 Extra High（$0.44）、16. Opus 5.5（max） Cursor（$1.37）
- **每次花费（越低越省）**：1. DeepSeek V4.1 Flash（max） Cline（$0.00）、2. DeepSeek V4.1 Flash（high） Cline（$0.00）、3. Qwen3.8 Flash（$0.00）、4. Step 5 Preview（$0.00）、5. SWE-2（$0.00）、6. Space Bunny Free（$0.00）、7. Muse Spark 1.3 Contributor OpenCode Go（$0.00）、8. MiMo V2.6 Flash（$0.00）、9. GLM-5.3-Flash（$0.00）、10. MiniMax M3（$0.00）、11. MiMo V2.6 Pro（$0.01）、12. GLM-5.3（$0.05）、13. Kimi K3（$0.10）、14. Grok 4.6 Extra High xAI（$0.16）、15. Grok 4.7 Extra High（$0.59）、16. Opus 5.5（max） Cursor（$2.52）

**模型评论（按综合分）**

1. **Opus 5.5（max） Cursor**（综合 87.5）— 长处：综合最高（87.5）、均质量最高（20.8）、契合最高（4.33），零假阳；短处：每条最贵（$1.37）、每次 $2.52、每次最慢（12.9 分钟）
2. **Grok 4.7 Extra High**（综合 64.2）— 长处：成立 8 条，居第二、均质量 15.0，居前列；短处：准确率 89%，有 1 个假阳、契合 3.50，居中
3. **Kimi K3**（综合 56.8）— 长处：每条成立 token 仅 17 千、每次 1.8 分钟，较快、契合 4.00；短处：成立 7 条，量偏少、缓存命中 0%
4. **Space Bunny Free**（综合 56.8）— 长处：效率 3.23，居前列、免费（$0.00）、准确率 100%、契合 4.00；短处：成立 7 条，量偏少
5. **DeepSeek V4.1 Flash（max） Cline**（综合 48.3）— 长处：每次 1.6 分钟，速度居前、效率 2.74，免费（$0.00）；短处：样本仅 5 场，结论留余地、成立 5 条，量偏少、缓存命中 45%，偏低
6. **GLM-5.3**（综合 47.7）— 长处：准确率 100%、每条 token 25 千，量小；短处：成立 6 条，量偏少、缓存命中 16%，偏低
7. **DeepSeek V4.1 Flash（high） Cline**（综合 43.5）— 长处：效率最高（5.17）、每次 0.8 分钟（档位低）；短处：契合 2.60，居后、样本仅 5 场，结论留余地
8. **GLM-5.3-Flash**（综合 43.4）— 长处：准确率 100%、每条 token 26 千，量小；短处：缓存命中 0%、成立 6 条，量偏少
9. **Grok 4.6 Extra High xAI**（综合 42.6）— 长处：准确率 100%，零假阳；短处：成立 5 条，量偏少、综合 42.6，居后段
10. **Qwen3.8 Flash**（综合 40.3）— 长处：每次仅 1.2 分钟，较快、效率 2.93，居前；短处：契合 3.17，偏低、缓存命中 0%
11. **MiMo V2.6 Pro**（综合 39.8）— 长处：契合 3.60，居中偏上、成本低（每次 $0.01）；短处：成立 5 条，量偏少
12. **MiMo V2.6 Flash**（综合 37.5）— 长处：契合 3.60，居中偏上、每次 1.8 分钟，较快；短处：缓存命中 18%，偏低、成立 5 条，量偏少
13. **SWE-2**（综合 35.6）— 长处：准确率 100%，零假阳；短处：成立 4 条，量偏少、综合 35.6，居后段
14. **Step 5 Preview**（综合 34.7）— 长处：每条 token 12 千，量小；短处：准确率 83%，垫底、契合 2.67，偏低
15. **Muse Spark 1.3 Contributor OpenCode Go**（综合 13.2）— 长处：每次 0.5 分钟，并列最快；短处：契合垫底（1.67）、成立仅 2 条、均质量 4.0，居末段
16. **MiniMax M3**（综合 12.5）— 长处：准确率 100%、每次 0.5 分钟，并列最快；短处：成立仅 2 条，均质量 3.8 垫底、契合 2.00，偏低

## 未评 / 失败（本期）

未评行必须补评（`record-findings`）才算完成；失败行不计入对照。

| 场次 | 未评行 | 未评金额$ | 失败行 | 失败金额$ |
|---|---:|---:|---:|---:|
| 2026-09-28-1926 | 0 | 0.00 | 1 | 0.00 |
| 2026-09-30-2141 | 0 | 0.00 | 1 | 0.00 |
| 2026-09-30-2146 | 1 | 0.06 | 1 | 0.00 |
| 2026-09-30-2206 | 0 | 0.00 | 1 | 0.12 |
| 2026-09-30-2218 | 0 | 0.00 | 3 | 0.00 |
| 2026-09-30-2329 | 0 | 0.00 | 3 | 0.00 |
| 2026-10-01-0029 | 1 | 0.00 | 3 | 0.00 |
| 2026-10-01-0030 | 14 | 8.41 | 1 | 0.00 |
| 2026-10-01-010606-861143 | 13 | 0.48 | 2 | 0.52 |
| 2026-10-01-012232-fe414c | 14 | 0.41 | 2 | 0.32 |
| 2026-10-01-012839-c40dcf | 1 | 1.73 | 0 | 0.00 |
| 2026-10-01-032542-a949e6 | 15 | 3.84 | 0 | 0.00 |
| 2026-10-02-001506-f587ca | 1 | 0.00 | 0 | 0.00 |
| 2026-10-02-002034-c5b849 | 17 | 0.19 | 0 | 0.00 |

---

**说明**

- 综合能力评分与排名：只有达标样本（≥ 5 场）的模型进排名表，表格与评论按综合分从优到差；样本不足的进下方观察区（只列数字、不排名）；时间/花费/token 与效率分只作参考列，不进综合分；契合分与样本量只进评论，不进评分。
- 质量分 = 成立重要性合计 + 2×独有 − 3×说错；设计分叉再加契合。
- 图表逐项排名：每张图只按它自己那个口径排（产出/精准/独立/性价比/覆盖/执行时间/每条成立 token/缓存命中率/成立密度/每次花费/每条成立花费），图内 `#n` 是该图名次；执行时间、每条成立 token、花费越低越好，成立重要性是整场堆叠条、不做模型排名。
- 计数类口径：成立数、花费、假阳这类会随样本量涨的指标，一律折成「每次已评运行」再比（成立密度、每次花费、每次说错），否则跑得多的家天然占优；模型表里的成立/独有/假阳仍是本期合计，看总数时请对照「场」列。
- 花费三看：每次花费（跑一次多少钱）、每条成立花费（每个真问题多少钱）、token（每条成立 token）；按通道拆开后某批调用缺金额或缺 token 数据时，该家不进对应榜单（不按 0 记，也不当最优）。
- 时间与 token 口径：执行时间＝该模型已评行耗时合计 ÷ 已评运行次数（分钟，未评与失败行没有耗时数据）；token＝输入+输出+缓存读+缓存写；每条成立 token＝token 合计 ÷ 成立数（千枚，成立数为 0 或缺 token 不排）；缓存命中率＝缓存读 ÷（输入+缓存读）。
- 生成速度口径：每秒 token＝输出 token ÷ 耗时秒（按已评行汇总后相除），只算模型自己吐出来的输出；输入与缓存读是喂进去的、不算生成，推理 token 也不另加（各家输出是否已含思维输出不一致，加了会重复计）。
- 服务商口径：**按服务商（不是按工具）拆**——同一模型走过多个服务商时分行，名字本体不变，网页里名字只留本体、服务商是旁边的独立徽标（写短名，悬停看全名）；Markdown、图表与数据包写全名「名称 厂商」（空格分隔）。缩写对照：Curso...＝Cursor、xAI＝xAI、方舟 Ag...＝方舟 Agent Plan、方舟 Co...＝方舟 Coding Plan、Z.ai＝Z.ai、OpenCod...＝OpenCode Go、小米 To...＝小米 Token Plan、pi＝pi、Qoder＝Qoder CN、StepF...＝StepFun、Devin＝Devin、Cline＝Cline。服务商取自 models.json 的 providers 表（改一处全站生效）：pi 调用看登记的服务商，agent 工具一律 Cursor，zcode/opencode 分别归 Z.ai / OpenCode Go，cline 归 Cline（cline-free / cline-pass 算一家）；同一家的不同写法（zai 与 zai-coding-cn）算一家。拆不拆看本期与上期的并集，保证跨周可比；单服务商的家不拆。
- 口径：失败（退出码≠0/超时）与未评行不计入对照、花费照计；模型名按别名表归一化（k3→Kimi K3、glm-5→GLM-5.3、grok-4→Grok 4.6 Extra High、gemini-3→Gemini 3.8 Flash、mimo-v2→MiMo V2.5 Pro、deepseek-v4-flash→DeepSeek V4 Flash、`(zcode)` 并主名）；含通道后缀的行按通道各自归集。
- 本目录是一次生成的同批产物（report.md / data.json / summary.json / images；贴文 post.md 可选，重生成默认保留原有贴文），按 ISO 周归档（目录名即周号）；同一周再次生成会覆盖本目录，旧版在归档仓的 git 历史里。默认报上一个完整周，`--week current` 可出进行中的本周。

