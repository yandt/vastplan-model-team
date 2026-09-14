<!-- 生成：K3（k3-pi）· 2026-09-15 01:03:17 · 耗时 54s · $0.0833（估价） · 窗口 2026-09-07 → 2026-09-14 -->
<!-- 配图：images/1-ranking.png, images/2-audit-quality.png, images/3-audit-cost.png, images/4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

模型团队周报｜2026 年第 37 周（09-07 → 09-14）

我在 VastPlan 上跑多模型协作已经持续一段时间了。VastPlan 是我们自研的 Node/TypeScript 插件运行时与 Portal 内核，这些是真实工程代码，不是题库，也不是合成任务。每周我把各模型的实际表现记成账，发一次数据。

先说本周在测什么，两个活动类型：

① 事后审计：功能代码完成后，多个模型并行审同一批改动，找 BUG、提优化点。每条发现由我对照真实代码逐条判定成立/不成立，并按 1~5 记重要性。
② 设计分叉：遇到有分歧的设计题，各模型各自给方案，等项目里真实选定方向之后，再回头算每个模型的方向契合度。

本周规模：审计 46 场（上周 14），成立缺陷 519 条（上周 70），其中独有 242 条、假阳性 140 条；重要性 5/4/3/2/1 分布为 87/129/154/128/21。已评部分花费 $151.35，平均每次 7.2 分钟，token 共 630.8M（缓存命中 92%）。设计分叉 25 场（上周 7），成立 367 条，花费 $14.21，平均每次 1.8 分钟。

综合评分是同活动类型内 6 项指标（效果 35%、覆盖 30%、独立 10%、时间 10%、花费 5%、token 10%）min-max 归一后的加权相对排名，不是绝对分。

事后审计综合排名：
1. DeepSeek V4.1 Flash（opencode）72.6※
2. K3（agent）69.1※
3. DeepSeek V4.1 Flash（pi）68.0※
4. Grok 4.6 Extra High 66.3
5. Muse Spark 1.3 Contributor 65.7※
6. Gemini 3.8 Flash 62.5
7. K3（pi）61.2
8. GLM-5.3（pi）60.5
9. GLM-5.3-Flash（pi）56.4
10. DeepSeek V4 Flash 47.0
11. MiMo V2.5 Pro 29.3
12. GLM-5.3-Flash（zcode）14.4※

注意前三名都带 ※（样本 < 20 场）。样本够 20 场的主力里，第一是 Grok 4.6 Extra High 66.3。

比总分更有信息量的是分项第一（事后审计）：
产出质量第一 DeepSeek V4.1 Flash（opencode），平均质量分 12.0，领先第二名不少。
覆盖率第一 Gemini 3.8 Flash，参与轮次里占 19% 的重要性加权成立数。
准确率第一 GLM-5.3-Flash（pi）95%；同一个模型换 zcode 接入只有 50%，接入方式的影响比换模型还大。
独有发现占比第一 DeepSeek V4.1 Flash（opencode）75%，别人没找到的它找到了。
效率分第一 DeepSeek V4.1 Flash（opencode）5.24。
速度第一 Muse Spark 1.3 Contributor，每次 1.9 分钟。

性价比这块值得单独说。审计每次最省的是 Muse Spark 1.3 Contributor，$0.01；最贵是 Grok 4.6 Extra High，每次 $1.17（本周合计 $48.96），折合每条成立缺陷 $0.62。它质量确实稳，但每条成立缺陷的单价也是全场最高。GLM-5.3-Flash（zcode）每条成立 token 和耗时都垫底，12.8 分钟一次。

设计分叉综合排名：
1. K3（agent）85.4※
2. Fable 5.1 76.9※
3. K3（pi）66.8※
4. DeepSeek V4.1 Flash（opencode）64.1※
5. Gemini 3.8 Flash 45.5
6. GLM-5.3（pi）43.2
7. Grok 4.6 Extra High 42.8
8. DeepSeek V4 Flash 38.6
9. GLM-5.3-Flash（pi）35.6
10. DeepSeek V4.1 Flash（pi）27.6※
11. Muse Spark 1.3 Contributor 24.9※
12. MiMo V2.5 Pro 22.2※

前四名全部带 ※。主力（≥20 场）第一是 Gemini 3.8 Flash 45.5。契合分最高 K3（pi）4.69，最低 MiMo V2.5 Pro 2.81——也就是说 K3 给的方案方向最常和我们最终选定的一致。

设计分叉分项第一：质量 Fable 5.1（29.0），覆盖 K3（agent）31%，准确率 Fable 5.1 与 DeepSeek V4.1 Flash 两种接法并列 100%，效率分 Fable 5.1 10.72，速度 DeepSeek V4.1 Flash（pi）0.6 分钟。每次花费最低 Muse Spark $0.00，最贵 Fable 5.1 $0.60，但折每条成立只要 $0.17，比审计侧便宜一个量级。

口径与坦白：
- 失败与未经判定的场次不进对照，但花费照计。本周失败 23 行，另有 16 行未评（2 个场次，补评后才算完成）。
- 订阅制模型金额未采集，不记 0；缺失的轴按中位 50 计入综合分，已在排名里吃亏或占便宜都标不出来，只能请注意。
- 总分是同活动类型内归一后的相对排名，跨类型、跨周不可直接比。
- ※ 表示样本 < 20 场，结论打折，尤其是本周设计分叉的前四名。

你们团队里多种模型混用时，是怎么分工的？欢迎交流。#LLM #AI #Benchmark #MultiModel
