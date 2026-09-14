<!-- 生成：K3（k3-pi）· 2026-09-15 00:13:34 · 耗时 53s · $0.0709（估价） · 窗口 2026-09-07 → 2026-09-14 -->
<!-- 配图：images/1-ranking.png, images/2-audit-quality.png, images/3-audit-cost.png, images/4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

《模型团队周报》2026 年第 37 周（9-07 → 9-14）。

先说背景：我们维护一个叫 VastPlan 的项目，是自研的 Node/TypeScript 插件运行时与 Portal 内核的真实工程，不是题库、不是合成任务。每周所有功能切片做完后，由多支模型团队并行做两类测试，真实花费、真实 token、真实结果都在账本里。这周把 46+25 场的数字摊开说。

两类测试是什么：

① 事后审计：功能代码完成后，多模型并行找 BUG、提优化点。每条意见由执行模型逐条对照代码判定成立/不成立，成立的按 1~5 计严重度。这周 46 场（上周 14 场），判定行 319，成立 519 条（上周 70），其中独有 242 条，假阳性 140 条。严重度 5/4/3/2/1 = 87/129/154/128/21。已评行花费 $151.35（上周 $16.48），平均每次 7.2 分钟，token 630.8M（缓存命中 92%）。

② 设计分叉：同一件事有 2~4 条都说得通的路时，各模型各自给设计方案，等项目真实选完之后再算方向契合度，不是当场拍板。这周 25 场（上周 7），成立 367 条（上周 23），独有 121，假阳 18。花费 $10.58，平均每次 1.8 分钟，token 11.6M（缓存命中 65%）。

综合能力评分（同活动类型内归一后的相对排名，权重：效果 35% + 覆盖 30% + 独立 10% + 时间 10% + 花费 5% + token 10%）：

事后审计：
1. DeepSeek V4.1 Flash 78.9※
2. Muse Spark 1.3 Contributor 74.1※
3. Grok 4.6 Extra High 71.5
4. K3 66.8
5. Gemini 3.8 Flash 64.3
6. GLM-5.3 60.2
7. GLM-5.3-Flash 55.1
8. DeepSeek V4 Flash 45.7
9. MiMo V2.5 Pro 20.6

※ 样本 < 20 场，结论打折。主力（≥20 场）第一是 Grok 4.6 Extra High 71.5。

设计分叉：
1. Fable 5.1 93.6※
2. K3 81.6
3. Gemini 3.8 Flash 52.1
4. Grok 4.6 Extra High 48.6
5. GLM-5.3 48.4
6. DeepSeek V4 Flash 43.5
7. DeepSeek V4.1 Flash 40.1※
8. GLM-5.3-Flash 40.1
9. Muse Spark 1.3 Contributor 27.2※
10. MiMo V2.5 Pro 25.0※

设计分叉主力第一：K3 81.6。方向契合分最高也是 K3 4.55；最低 MiMo V2.5 Pro 2.81。

比总分更有信息量的是分项第一（各自口径）：

事后审计——
平均质量分第一：DeepSeek V4.1 Flash 8.2（末位 MiMo V2.5 Pro 0.8）
覆盖率第一：Gemini 3.8 Flash 18%
准确率第一：GLM-5.3-Flash 94%
独有占比第一：Muse Spark 1.3 Contributor 68%
效率分第一：Muse Spark 1.3 Contributor 2.47
最快：Muse Spark 1.3 Contributor 每次 1.9 分钟（最慢 GLM-5.3-Flash 9.4）
每条成立 token 最省：Muse Spark 1.3 Contributor 251.6 千枚（末位 Gemini 3.8 Flash 2,637.4）
成立密度第一：DeepSeek V4.1 Flash 每次 2.42 条
每次最省：Muse Spark 1.3 Contributor $0.01；最贵 Grok 4.6 Extra High $1.17，本周合计 $48.96，折合每条成立缺陷 $0.62（成立 79 条）

设计分叉——
平均质量分第一：Fable 5.1 29.0
覆盖率第一：Fable 5.1 23%
准确率第一：Fable 5.1 / DeepSeek V4.1 Flash / Muse Spark 1.3 Contributor 并列 100%（末位 MiMo V2.5 Pro 73%）
独有占比第一：Fable 5.1 59%（末位 MiMo V2.5 Pro 8%）
效率分第一：Fable 5.1 10.72
最快：DeepSeek V4.1 Flash 与 Muse Spark 1.3 Contributor 并列每次 0.8 分钟
每条成立 token 最省：K3 7.2 千枚（末位 Grok 4.6 Extra High 102.5）
成立密度第一：Fable 5.1 每次 3.67 条
每次最省：Muse Spark 1.3 Contributor $0.00；最贵 Grok 4.6 Extra High $0.30，折合每条成立 $0.11

口径与坦白：
- 失败 23 行不计入对照，但花费照计；未评 16 行（2 个场次）补评后才算完成。
- 订阅制模型金额未采集，不记 0；该轴按中位 50 记，已在评论标注。
- 总分是同活动类型内 min-max 归一后的相对排名，跨类型不可比。
- ※ 表示样本 < 20 场，结论打折——DeepSeek V4.1 Flash、Muse Spark、Fable 5.1 的第一都带这个星号。
- 效率分（成立重要性÷耗时）只作参考列，不进综合分。

一句话总结：总分第一看样本，分项第一看活。便宜能打的和又贵又强的，在账本里都藏不住。

你们团队在让模型互相审计吗？欢迎交流做法。#LLM #AI #Benchmark #MultiModel
