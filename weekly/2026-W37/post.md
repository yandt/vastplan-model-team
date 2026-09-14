<!-- 生成：K3（k3-pi）· 2026-09-15 00:40:27 · 耗时 89s · $0.1055（估价） · 窗口 2026-09-07 → 2026-09-14 -->
<!-- 配图：images/1-ranking.png, images/2-audit-quality.png, images/3-audit-cost.png, images/4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

模型团队周报 2026-W37（09-07 → 09-14）。

先交代背景：VastPlan 是我自研的 Node/TypeScript 插件运行时与 Portal 内核，所有测试都跑在这个真实工程上，不是题库，也不是合成任务。每周我让整个模型团队干两件事：

① 事后审计：功能代码完成后，多个模型并行找 BUG、提优化点，我再逐条对照代码判定成立/不成立，并按 1~5 记重要性。
② 设计分叉：同一件事让各模型各自给设计方案，等项目真实选完方向，再回头算谁的方案与最终选择最契合。

本周体量环比放大不少。事后审计 46 场（上周 14），成立 519 条（上周 70），其中独有 242 条、假阳 140 条；重要性 5/4/3/2/1 = 87/129/154/128/21。已评部分花费 $151.35，平均每次 7.2 分钟，token 630.8M（缓存命中 92%）。设计分叉 25 场（上周 7），成立 367 条，其中 5 级重要性占 166 条；花费 $10.58，平均每次 1.8 分钟，token 11.6M（缓存命中 65%）。

综合评分（同活动类型内 min-max 归一到 0~100 后的相对排名，权重：35% 效果 + 30% 覆盖 + 10% 独立 + 10% 时间 + 5% 花费 + 10% token）：

事后审计：
1. DeepSeek V4.1 Flash 74.3※
2. Grok 4.6 Extra High 71.6
3. Muse Spark 1.3 Contributor 71.6※
4. K3 66.0
5. Gemini 3.8 Flash 64.3
6. GLM-5.3 58.7
7. GLM-5.3-Flash 54.4
8. DeepSeek V4 Flash 44.2
9. MiMo V2.5 Pro 20.6
只看样本 ≥20 场的主力，第一是 Grok 4.6 Extra High 71.6。

设计分叉：
1. Fable 5.1 93.6※
2. K3 81.7
3. Gemini 3.8 Flash 52.1
4. Grok 4.6 Extra High 49.2
5. GLM-5.3 48.0
6. DeepSeek V4 Flash 43.5
7. GLM-5.3-Flash 39.9
8. DeepSeek V4.1 Flash 38.6※
9. Muse Spark 1.3 Contributor 27.2※
10. MiMo V2.5 Pro 24.1※
主力第一是 K3 81.7。契合分（与最终选定方向的贴合度）最高也是 K3，4.55；最低 MiMo V2.5 Pro 2.81。

比总分更有信息量的是分项第一。事后审计这边：

平均质量分：DeepSeek V4.1 Flash 8.2
覆盖（重要性加权占比）：Gemini 3.8 Flash 19%
准确率：GLM-5.3-Flash 94%
独有占比：Muse Spark 1.3 Contributor 68%
效率分：Muse Spark 1.3 Contributor 2.47
每次耗时：Muse Spark 1.3 Contributor 1.9 分钟
每条成立 token：Muse Spark 1.3 Contributor 251.6 千枚
缓存命中率：DeepSeek V4.1 Flash 98%
成立密度：DeepSeek V4.1 Flash 2.42 条/次
每次花费：Muse Spark 1.3 Contributor $0.01

设计分叉这边：

平均质量分：Fable 5.1 29.0
覆盖：Fable 5.1 23%
准确率：Fable 5.1 / DeepSeek V4.1 Flash / Muse Spark 1.3 Contributor 并列 100%
独有占比：Fable 5.1 59%
效率分：Fable 5.1 10.72
每次耗时：DeepSeek V4.1 Flash 0.8 分钟
每条成立 token：K3 7.2 千枚
成立密度：Fable 5.1 3.67 条/次
每次花费：Muse Spark 1.3 Contributor $0.00

性价比单独说。最省的是 Muse Spark 1.3 Contributor：审计每次 $0.01、分叉每次 $0.00，效率分和耗时同时第一，但质量分不在头部，适合当便宜的补充视角。最贵的是 Grok 4.6 Extra High：审计每次 $1.17（本周合计 $48.96），折合每条成立缺陷 $0.62（成立 79 条）；分叉每次 $0.30（合计 $5.97），每条 $0.11。它最贵，但审计主力综合第一也是它——贵和值要分开看。

口径与坦白：
失败 23 行、未评 16 行（2 个场次）不进对照，但花费照计；未评场次补评后才算完成。
订阅制模型金额未采集，不记 0；该轴按中位 50 记，会拉平它的相对分。
总分是同活动类型内归一后的相对排名，不是绝对能力分，换一批对手分数会变。
※ 表示样本 < 20 场，结论打折。Fable 5.1 的 93.6、DeepSeek V4.1 Flash 的 74.3 都在此列。

我的读法：主力配置短期不变——审计靠 Grok 4.6 Extra High，分叉靠 K3；下周看 DeepSeek V4.1 Flash 样本量上来后能否守住第一。

你们团队在用多模型交叉审计吗？欢迎交流。#LLM #AI #Benchmark #MultiModel
