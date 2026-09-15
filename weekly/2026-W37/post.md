<!-- 生成：K3（k3-pi）· 2026-09-15 13:04:51+08:00 · 耗时 38s · $0.0336（估价） · 窗口 2026-09-07 → 2026-09-14 -->
<!-- 配图：1-ranking.png, 2-audit-quality.png, 3-audit-cost.png, 4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

《模型团队周报》2026 年第 37 周（2026-09-07 → 2026-09-14）

背景交代一下：我们在真实工程 VastPlan（自研的 Node/TypeScript 插件运行时与 Portal 内核，不是题库也不是合成任务）上持续跑多模型协作，每周把账本数据公开。本周统计两类活动：

① 事后审计：功能代码完成后，多模型并行找 BUG、提优化点，每条意见逐条对照代码判定成立/不成立，并按 1~5 计重要性。
② 设计分叉：各模型各自给设计方案，等项目真实选完方向之后，再回算每个模型方案的契合度。

本周规模：事后审计 46 场、已评 319 行、成立 519 条（其中独有 242 条、假阳 140 条），重要性 5/4/3/2/1 分布为 87/129/154/128/21；已评部分花费 $151.35，平均每次 7.2 分钟，token 630.8M（缓存命中 92%）。设计分叉 25 场、已评 167 行、成立 367 条（独有 121、假阳 18），重要性 5/4/3/2/1 = 166/122/72/7/0；花费 $14.21，平均每次 1.8 分钟，token 11.6M（缓存命中 65%）。

综合能力评分（同活动类型内归一后的相对排名，权重：35% 效果 + 30% 覆盖 + 10% 独立 + 10% 时间 + 5% 花费 + 10% token）：

事后审计：
1. K3@Cursor 74.4
2. DeepSeek V4.1 Flash 74.3
3. Grok 4.6 Extra High 71.6
4. Muse Spark 1.3 Contributor 71.6
5. Gemini 3.8 Flash 64.3
6. K3@方舟 Agent Plan 61.9
7. GLM-5.3 58.7
8. GLM-5.3-Flash 54.4
9. DeepSeek V4 Flash 44.2
10. MiMo V2.5 Pro 20.6
主力（≥5 场）第一：K3@Cursor 74.4

设计分叉：
1. K3@Cursor 87.5
2. Fable 5.1 78.5
3. K3@方舟 Agent Plan 68.1
4. Gemini 3.8 Flash 46.7
5. GLM-5.3 43.8
6. Grok 4.6 Extra High 43.6
7. DeepSeek V4 Flash 39.2
8. GLM-5.3-Flash 35.9
9. DeepSeek V4.1 Flash 35.2
10. Muse Spark 1.3 Contributor 25.9
11. MiMo V2.5 Pro 22.8
主力（≥5 场）第一：K3@Cursor 87.5
契合分最高：K3@方舟 Agent Plan 4.69；最低：MiMo V2.5 Pro 2.81

比总分更有信息量的是分项第一。

事后审计侧：平均质量分第一是 DeepSeek V4.1 Flash（8.2，末位 MiMo V2.5 Pro 仅 0.8）；覆盖率第一是 Gemini 3.8 Flash（19%）；独有占比第一是 Muse Spark 1.3 Contributor（68%，它发现的缺陷三分之二以上是别家没提的）；准确率第一是 GLM-5.3-Flash（94%）；成立密度第一是 DeepSeek V4.1 Flash（每次 2.42 条）。

性价比差距很大：每次花费最省的是 Muse Spark 1.3 Contributor（$0.01），每条成立缺陷同样只要 $0.01；最贵的是 Grok 4.6 Extra High，每次 $1.17、本期合计 $48.96，折合每条成立缺陷 $0.62（成立 79 条）。Token 效率上 Muse Spark 每条成立仅 251.6 千枚，而 Gemini 3.8 Flash 要 2,637.4 千枚。生成速度第一是 DeepSeek V4.1 Flash（90.6 token/s），最慢是 K3@方舟 Agent Plan（26.3）。

设计分叉侧：平均质量分第一是 Fable 5.1（29.0），成立密度也是它第一（每次 3.67 条），准确率与 DeepSeek V4.1 Flash、Muse Spark 并列 100%；但覆盖（31%）和独有占比（84%）的第一都是 K3@Cursor。K3@方舟 Agent Plan 的 token 效率突出（每条成立 4.9 千枚），缓存命中率却是 0%。每次花费最省的三家都在 $0.01 以下，最贵的 Fable 5.1 每次 $0.60、本期合计 $3.63，折合每条成立 $0.16（成立 22 条）。

口径与坦白：失败与未经判定的场次不进对照，但花费照计（本期未评 16 行、失败 23 行）；订阅制模型金额未采集、不记 0，所以省钱结论只看按量计费部分；总分是同活动类型内归一后的相对排名，不能跨周直接比；※ 表示样本 < 20 场、结论打折，Fable 5.1、Muse Spark 等样本量小的名次请谨慎解读。

一句话总结：总分第一是 K3@Cursor，但真正该按场景选模型——找别人找不到的缺陷用 Muse Spark，要质量密度用 DeepSeek V4.1 Flash 和 Fable 5.1，控制成本就别让 Grok 4.6 Extra High 跑全量。

你觉得哪项分项对真实工程最有价值？欢迎讨论。#LLM #AI #Benchmark #MultiModel
