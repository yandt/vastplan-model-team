<!-- 生成：K3（k3-pi）· 2026-09-14 21:10:12 · 耗时 79s · $0.0524（估价） · 窗口 2026-09-07 → 2026-09-14 -->
<!-- 配图：images/1-ranking.png, images/2-audit-quality.png, images/3-audit-cost.png, images/4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

这是《模型团队周报》，窗口 2026-09-07 → 2026-09-14。我在自己的工程 VastPlan 上持续跑多模型协作：VastPlan 是自研的 Node/TypeScript 插件运行时与 Portal 内核，所有评测都发生在这个真实工程里，不是题库，也不是合成任务。

本周两类测试，先说明各自是什么：

一、事后审计：功能代码完成后，多个模型并行找 BUG、提优化点，我再逐条对照代码判定成立或不成立，成立的按 1~5 记严重度。本期 46 场（上周 14），判定成立 519 条（上周 70），其中独有 242 条、假阳 140 条；严重度 5/4/3/2/1 = 87/129/154/128/21。

二、设计分叉：各模型各自给设计方案，等项目真实选定方向之后，再回头算每个模型的方向契合度。本期 25 场（上周 7），成立 367 条（上周 23），独有 121 条、假阳 18 条。

综合排名（0~100 = 产出 30% + 精准 25% + 独立 20% + 性价比 25%，同活动类型内各项 min-max 归一再加权，是相对排名）：

事后审计：
1. Muse Spark 1.3 Contributor 77.0※
2. DeepSeek V4.1 Flash 76.9※
3. Grok 4.6 Extra High 63.9
4. K3 52.6
5. GLM-5.3-Flash 48.2
6. Gemini 3.8 Flash 47.0
7. DeepSeek V4 Flash 36.8
8. GLM-5.3 36.7
9. MiMo V2.5 Pro 5.8

样本 ≥20 场的主力里，第一是 Grok 4.6 Extra High 63.9。

设计分叉：
1. Fable 5.1 100.0※
2. K3 84.5
3. Gemini 3.8 Flash 65.8
4. Grok 4.6 Extra High 59.8
5. DeepSeek V4.1 Flash 55.3※
6. GLM-5.3 47.9
7. DeepSeek V4 Flash 38.4
8. GLM-5.3-Flash 37.9
9. Muse Spark 1.3 Contributor 33.1※
10. MiMo V2.5 Pro 6.7※

主力第一是 K3 84.5；契合分最高也是 K3（4.55），最低 MiMo V2.5 Pro（2.81）。

比总分更有信息量的是分项第一。

事后审计各分项：
产出 · 平均质量分第一：DeepSeek V4.1 Flash 8.2（末位 MiMo V2.5 Pro 0.8）
精准 · 准确率第一：GLM-5.3-Flash 94%（末位 MiMo V2.5 Pro 53%）
独立 · 独有占比第一：Muse Spark 68%（末位 GLM-5.3 35%）
性价比 · 效率分第一：Muse Spark 2.47（末位 MiMo V2.5 Pro 0.49）
速度第一：Muse Spark，平均每次 1.9 分钟（末位 GLM-5.3-Flash 9.4）
Token 最省：Muse Spark，每条成立 251.6 千枚（末位 Gemini 3.8 Flash 2,637.4）
缓存命中第一：DeepSeek V4.1 Flash 98%（末位 Muse Spark 84%）
成立条数第一：Gemini 3.8 Flash 86 条（末位 MiMo V2.5 Pro 20）
花费最省：Muse Spark $0.12；最贵 Grok 4.6 Extra High $48.96，折合每条成立缺陷 $0.62（成立 79 条）。

设计分叉各分项：
产出 · 平均质量分第一：Fable 5.1 29.0（末位 MiMo V2.5 Pro 9.1）
精准 · 准确率第一：Fable 5.1、DeepSeek V4.1 Flash、Muse Spark 三家并列 100%（末位 MiMo V2.5 Pro 73%）
独立 · 独有占比第一：Fable 5.1 59%（末位 MiMo V2.5 Pro 8%）
性价比 · 效率分第一：Fable 5.1 10.72（末位 Muse Spark 2.61）
速度第一：DeepSeek V4.1 Flash 0.8 分钟（末位 Grok 4.6 Extra High 3.4）
Token 最省：K3，每条成立 7.2 千枚（末位 Grok 4.6 Extra High 102.5）
缓存命中第一：Fable 5.1 100%（末位 Muse Spark 1%）
成立条数第一：K3 74 条（末位 Muse Spark 4）
花费最省：Muse Spark $0.02；最贵 Grok 4.6 Extra High $5.97，折合每条成立缺陷 $0.11（成立 56 条）。

性价比一句话：两类测试里花费最省的都是 Muse Spark（审计 $0.12、设计 $0.02）；每条成立缺陷最贵的都是 Grok 4.6 Extra High（审计 $0.62、设计 $0.11）。但要注意它审计侧成立 79 条、设计侧成立 56 条，都排在前列，贵和能打在同一个模型上。

口径与坦白：失败 23 行与未评 16 行（2 个场次，补评后才算完成）不进对照，但花费照计；订阅制模型金额未采集（审计 11 行、设计 10 行），不记 0；总分是同活动类型内归一后的相对排名，不能跨类型比；※ 表示样本 < 20 场，结论打折，Fable 5.1 的 100.0 和 Muse Spark 的 77.0 都在此列。本期已评花费：审计 $151.35（上周 $16.48）、设计 $10.58（上周 $3.02）；token 审计 630.8M（缓存命中 92%）、设计 11.6M（65%）；平均每次审计 7.2 分钟、设计 1.8 分钟。

你在多模型分工上有什么实测经验？欢迎交流。#LLM #AI #Benchmark #MultiModel
