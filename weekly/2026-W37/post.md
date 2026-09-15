<!-- 生成：K3（k3-pi）· 2026-09-15 22:01:21+08:00 · 耗时 115s · $0.1031（估价） · 窗口 2026-09-07 → 2026-09-14 -->
<!-- 配图：1-ranking.png, 2-audit-quality.png, 3-audit-cost.png, 4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

《模型团队周报》第 37 期（2026-W37，窗口 2026-09-07 → 2026-09-14）。背景先交代：VastPlan 是我们自研的 Node/TypeScript 插件运行时与 Portal 内核的真实工程，这些模型干的是这个仓库里的真实活，不是题库，也不是合成任务。

我们的模型团队跑两类活：
① 事后审计：一段功能代码完成后，多个模型并行找 BUG、提优化点，再逐条对照代码判定成立/不成立，成立的按 1~5 计重要性。本期 46 场，已评 307 行，成立 481 条（重要性 5/4/3/2/1 = 84/125/141/110/21），独有 215 条，假阳性 127 条。已评花费 $141.34，平均每次 7.1 分钟，token 587.8M，缓存命中 92%。
② 设计分叉：开工前各模型各自给设计方案，等项目真实选完方向后，再回头算方向契合度。本期 25 场，已评 167 行，成立 367 条，独有 121 条，假阳性 18 条。已评花费 $14.21，平均每次 1.8 分钟，token 11.6M，缓存命中 65%。

综合能力评分（35% 效果 + 30% 覆盖 + 10% 独立 + 10% 时间 + 5% 花费 + 10% token，同活动类型内归一，是相对排名）：

事后审计：
1. K3 Cursor 82.2
2. DeepSeek V4.1 Flash（max） 78.9
3. Muse Spark 1.3 Contributor 72.5
4. Grok 4.6 Extra High 68.5
5. K3 方舟 Agent Plan 61.8
6. Gemini 3.8 Flash 61.1
7. GLM-5.3 60.9
8. GLM-5.3-Flash 57.0
9. DeepSeek V4 Flash 38.9
10. MiMo V2.5 Pro 19.0
主力（≥5 场）第一同样是 K3 Cursor。

设计分叉：
1. K3 Cursor 87.5
2. Fable 5.1 78.5
3. K3 方舟 Agent Plan 68.1
4. Gemini 3.8 Flash 46.7
5. GLM-5.3 43.8
6. Grok 4.6 Extra High 43.6
7. DeepSeek V4 Flash 39.2
8. GLM-5.3-Flash 35.9
9. DeepSeek V4.1 Flash（max） 35.2
10. Muse Spark 1.3 Contributor 25.9
11. MiMo V2.5 Pro 22.8
设计分叉契合分最高是 K3 方舟 Agent Plan 4.69，最低是 MiMo V2.5 Pro 2.81。

比总分更有信息量的是分项第一。事后审计里：平均质量分第一是 DeepSeek V4.1 Flash（max）8.2，末位 MiMo V2.5 Pro 只有 0.7；成立密度第一也是它，每次 2.42 条。独有占比第一是 Muse Spark 1.3 Contributor 68%，末位 GLM-5.3 34%。准确率第一是 GLM-5.3-Flash 94%，末位 MiMo V2.5 Pro 51%。生成速度第一是 Gemini 3.8 Flash，90.9 token/s。覆盖第一 K3 Cursor 18%。

设计分叉里：Fable 5.1 拿下平均质量分 29.0、成立密度 3.67、准确率 100% 三项第一，但每次 $0.60 也是最贵。DeepSeek V4.1 Flash（max）平均 0.8 分钟最快，准确率同样 100%。K3 Cursor 覆盖 31%、独有占比 84% 双第一。Token 效率第一是 K3 方舟 Agent Plan，每条成立仅 4.9 千枚，末位 Grok 4.6 Extra High 102.5 千枚。

性价比是另一面。事后审计每次最省的是 Muse Spark 1.3 Contributor $0.01，折合每条成立缺陷也是 $0.01；最贵的是 Grok 4.6 Extra High，每次 $1.15（本期合计 $45.96），折合每条成立 $0.66（成立 70 条），是最省者的 66 倍。设计分叉每条成立最省的是 GLM-5.3-Flash、Muse Spark 1.3 Contributor、MiMo V2.5 Pro，均为 $0.00；Fable 5.1 每条 $0.16 最贵，但换来了质量分、密度、准确率三项第一。

口径与坦白：失败与未经判定的场次不进对照，但花费照计——本期未评 16 行（2 个场次，补评后才算完成）、失败 23 行。订阅制模型金额未采集、不记 0，所以涉及订阅模型的花费对比仅供参考。总分是同活动类型内归一后的相对排名，不是绝对能力分。※ 表示样本 < 20 场，结论打折。

一句话总结：审计兜底用 K3 Cursor 和 DeepSeek V4.1 Flash（max），省钱找 BUG 用 Muse Spark，方向契合看 K3 方舟 Agent Plan，设计质量付得起就用 Fable 5.1。

你们在多模型协作里是怎么分工的？欢迎交流。#LLM #AI #Benchmark #MultiModel
