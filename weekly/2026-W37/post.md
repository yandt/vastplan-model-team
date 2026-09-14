<!-- 生成：K3（k3-pi）· 2026-09-15 00:28:54 · 耗时 45s · $0.0691（估价） · 窗口 2026-09-08 → 2026-09-15 -->
<!-- 配图：images/1-ranking.png, images/2-audit-quality.png, images/3-audit-cost.png, images/4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

这是 VastPlan 项目 2026 年第 37 周（09-08 至 09-15）的多模型团队周报。VastPlan 是自研的 Node/TypeScript 插件运行时与 Portal 内核，下面这些数字全部来自这个真实工程的开发过程，不是题库，也不是合成任务。

我们每周让多个模型在两类真实活动里干活，然后按同一套账本计分：

① 事后审计：功能代码写完后，多个模型并行找 BUG、提优化点，每条发现逐条对照代码判定成立或不成立，成立的按 1~5 记严重度。
② 设计分叉：遇到有 2~4 条都说得通的路时，各模型各自给设计方案，等项目真实做完选择之后，再回头算方向契合度。

本周规模：
事后审计 48 场（上周 18 场），已评 351 行，判定成立 541 条（上周 129 条），其中独有 225 条、假阳性 143 条；严重度 5/4/3/2/1 分别为 78/151/166/127/19。已评行花费 $169.45（上周 $29.56），平均每次 7.2 分钟，token 722.5M，缓存命中 92%。
设计分叉 29 场（上周 7 场），已评 202 行，判定成立 438 条（上周 23 条），独有 137 条、假阳性 27 条；严重度 5/4/3/2/1 分别为 203/143/84/8/0。已评行花费 $13.31，平均每次 1.8 分钟，token 15.3M，缓存命中 68%。

综合分是 6 项指标（效果 35%、覆盖 30%、独立 10%、时间 10%、花费 5%、token 10%）在同活动类型内 min-max 归一到 0~100 后加权，是相对排名，不是绝对能力分。

事后审计综合排名：
1. Muse Spark 1.3 Contributor 89.1
2. DeepSeek V4.1 Flash 75.1
3. Grok 4.6 Extra High 72.3
4. K3 72.1
5. Gemini 3.8 Flash 64.7
6. GLM-5.3 57.8
7. GLM-5.3-Flash 57.2
8. DeepSeek V4 Flash 45.3
9. MiMo V2.5 Pro 23.3
主力（≥20 场）第一是 Muse Spark 1.3 Contributor。

设计分叉综合排名：
1. Fable 5.1 93.6※
2. K3 81.2
3. Gemini 3.8 Flash 49.6
4. Grok 4.6 Extra High 47.8
5. GLM-5.3 47.1
6. DeepSeek V4 Flash 40.1
7. GLM-5.3-Flash 36.8
8. DeepSeek V4.1 Flash 36.2※
9. Muse Spark 1.3 Contributor 28.7※
10. MiMo V2.5 Pro 20.4
主力（≥20 场）第一是 K3 81.2，方向契合分也是 K3 最高（4.58），最低是 MiMo V2.5 Pro（2.95）。

比总分更有信息量的是分项第一，因为它们口径各自独立：

事后审计：
平均质量分第一 DeepSeek V4.1 Flash 7.6（末位 MiMo V2.5 Pro 1.0）
覆盖率第一 Gemini 3.8 Flash 17%
准确率第一 GLM-5.3-Flash 90%（末位 MiMo V2.5 Pro 55%）
独有占比第一 Muse Spark 1.3 Contributor 53%
效率分第一 Muse Spark 1.3 Contributor 2.82
速度第一 Muse Spark 1.3 Contributor 平均 2.1 分钟
每条成立 token 最省 Muse Spark 1.3 Contributor 252.6 千枚（最费 Gemini 3.8 Flash 3,080.7 千枚）
缓存命中第一 DeepSeek V4.1 Flash 98%
成立密度第一 DeepSeek V4.1 Flash 每次 2.28 条
每次最省 Muse Spark 1.3 Contributor $0.01；最贵 Grok 4.6 Extra High $1.20，本周合计 $52.60，折合每条成立缺陷 $0.71（成立 74 条）。

设计分叉：
平均质量分第一 Fable 5.1 29.0
覆盖率第一 Fable 5.1 23%
准确率第一 Fable 5.1 100%
独有占比第一 Fable 5.1 59%
效率分第一 Fable 5.1 10.72
速度第一 DeepSeek V4.1 Flash 平均 0.7 分钟
每条成立 token 最省 K3 6.8 千枚（最费 Grok 4.6 Extra High 117.9 千枚）
缓存命中第一 Fable 5.1 100%（末位 Muse Spark 1.3 Contributor 1%）
成立密度第一 Fable 5.1 每次 3.67 条
每次最省 Muse Spark 1.3 Contributor $0.00；最贵 Grok 4.6 Extra High $0.33，本周合计 $7.81，折合每条成立 $0.12（成立 67 条）。

口径与坦白：失败与未经判定的场次不进对照，但花费照计——本周有 22 行失败、16 行未评（涉及 2 个场次，补评后才算完成）。订阅制模型金额未采集，不记 0，该轴按中位 50 记。总分只是同活动类型内归一后的相对排名，换一批参赛者名次就会变。`※` 表示样本不足 20 场，结论打折——Fable 5.1 在设计分叉的领先就带这个标记，样本还小，不下定论。

一句话总结：事后审计里 Muse Spark 1.3 Contributor 靠便宜、快、独有多拿下综合第一；设计分叉里 K3 是样本充足下的主力第一，Fable 5.1 分项全优但样本尚小。

你们团队在多模型协作上踩过什么坑？欢迎聊聊。#LLM #MultiModel #Benchmark #AI
