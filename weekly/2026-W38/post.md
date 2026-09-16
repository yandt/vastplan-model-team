<!-- 生成：K3（k3-pi）· 2026-09-16 17:56:05+08:00 · 耗时 90s · $0.0578（估价） · 窗口 2026-09-14 → 2026-09-21 -->
<!-- 配图：1-ranking.png, 2-audit-quality.png, 3-audit-cost.png, 4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

我们的模型团队周报，2026 年第 38 周（进行中），窗口 2026-09-14 至 2026-09-21，环比上一周。

先交代这是什么测试。不是题库，也不是合成任务。工程是 VastPlan——我们自研的 Node/TypeScript 插件运行时与 Portal 内核的真实工程，所有测试都发生在真实的代码交付流程里。分两路：

① 事后审计：功能代码完成后，多模型并行找 BUG、提优化点，再由执行模型逐条对照代码判定成立还是不成立，并按 1~5 计重要性。
② 设计分叉：各模型各自给设计方案，等项目真实选完方向，再回头算各家的方向契合度。

本周事后审计 27 场，已评 213 行，判定成立 351 条，其中独有 113 条，假阳 132 条；重要性 5/4/3/2/1 分布为 39/92/145/63/12。花费（已评口径）$90.31，平均每次 7.7 分钟，token 411.9M，缓存命中 93%。

设计分叉 19 场，已评 139 行，成立 288 条，独有 102 条，假阳 33 条；重要性分布 131/96/58/3/0。花费 $9.16，平均每次 2.1 分钟，token 9.1M，缓存命中 65%。

综合能力评分（同活动类型内归一后加权，是相对排名：35% 效果 + 30% 覆盖 + 10% 独立 + 10% 时间 + 5% 花费 + 10% token）。

事后审计：
1. DeepSeek V4.1 Flash（max） 84.6
2. DeepSeek V4.1 Flash（high） 82.5
3. Muse Spark 1.3 Contributor 79.9
4. GLM-5.3 68.1
5. K3 方舟 Agent Plan 66.5
6. GLM-5.3-Flash 63.4
7. Grok 4.6 Extra High 60.8
8. DeepSeek V4 Flash 59.5
9. MiMo V2.5 Pro 29.0
10. Gemini 3.8 Flash※ 18.3

设计分叉：
1. K3 方舟 Agent Plan 91.5
2. Gemini 3.8 Flash※ 73.9
3. Grok 4.6 Extra High 70.2
4. Muse Spark 1.3 Contributor 65.4
5. DeepSeek V4.1 Flash（max） 61.8
6. GLM-5.3 58.4
7. GLM-5.3-Flash 52.6
8. DeepSeek V4 Flash 51.9
9. MiMo V2.5 Pro 42.5
10. DeepSeek V4.1 Flash（high）※ 24.9

主力口径（≥5 场）：事后审计第一 DeepSeek V4.1 Flash（max）84.6；设计分叉第一 K3 方舟 Agent Plan 91.5。设计分叉契合分最高是 Gemini 3.8 Flash 4.67，最低是 DeepSeek V4.1 Flash（high）3.00。

比总分更有信息量的是分项第一。事后审计侧：
平均质量分第一：DeepSeek V4.1 Flash（max）7.5；末位 MiMo V2.5 Pro -0.5。
重要性加权覆盖第一：DeepSeek V4.1 Flash（max）35%。
独有占比第一：DeepSeek V4.1 Flash（high）50%。
最快：Muse Spark 1.3 Contributor，平均 2.6 分钟/次。
最省：Muse Spark 1.3 Contributor，每次 $0.01，折合每条成立缺陷也是 $0.01。
准确率第一：GLM-5.3-Flash 85%；末位 MiMo V2.5 Pro 39%。
生成速度第一：Gemini 3.8 Flash，每秒 99.0 token。
每条成立缺陷最贵：Gemini 3.8 Flash $1.87。
每次最贵：Grok 4.6 Extra High $1.36（本期合计 $33.89，折合每条成立 $0.89，成立 38 条）。

设计分叉侧：
平均质量分第一：Grok 4.6 Extra High 23.8，K3 方舟 Agent Plan 23.7 紧随。
覆盖第一：Gemini 3.8 Flash 47%。
独有占比第一：K3 方舟 Agent Plan 56%。
最快：DeepSeek V4.1 Flash（high）0.5 分钟/次，生成速度每秒 145.2 token。
准确率第一：Gemini 3.8 Flash 100%。
token 最省：K3 方舟 Agent Plan，每条成立 5.4 千枚；末位 Grok 4.6 Extra High 105.9 千枚。
每次最贵：Grok 4.6 Extra High $0.35（本期合计 $5.55，折合每条成立 $0.11，成立 49 条）。

口径与坦白：
失败与未经判定的场次不进对照，但花费照计。本期未评 16 行（2 个场次，补评后才算完成），失败 5 行。
订阅制模型金额未采集，不记 0，费用一律按已评行合计。
总分是同活动类型内归一后的相对排名，不是绝对能力分。
※ 表示样本不足 5 场，结论打折。

一句话总结：事后审计看 DeepSeek V4.1 Flash（max），设计分叉看 K3 方舟 Agent Plan，省钱看 Muse Spark 1.3 Contributor。本周还在进行中，排名下周可能变。

你在多模型协作里最看重质量分还是性价比？欢迎聊聊。#LLM #AI #Benchmark #MultiModel
