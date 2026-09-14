<!-- 生成：K3（k3-pi）· 2026-09-14 23:37:03 · 耗时 52s · $0.0265（估价） · 窗口 2026-09-07 → 2026-09-14 -->
<!-- 配图：images/1-ranking.png, images/2-audit-quality.png, images/3-audit-cost.png, images/4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

第 37 周模型团队周报（2026-09-07 → 09-14）。在 VastPlan（自研的 Node/TypeScript 插件运行时与 Portal 内核，真实工程，不是题库或合成任务）上，我们继续用多模型团队做两类测试，这是本周的数字。

先说两类测试是什么。
① 事后审计：功能代码完成后，多模型并行找 BUG、提优化点，逐条对照真实代码判定成立/不成立，并按 1~5 计严重度。
② 设计分叉：各模型各自给设计方案，等项目真实选完方向之后，再回头算方向契合度。

本周规模比上周大不少。事后审计 46 场（上周 14 场），已评行 319，成立缺陷 519 条（上周 70），其中独有 242 条、假阳性 140 条，严重度 5/4/3/2/1 分别为 87/129/154/128/21。已评花费 $151.35（上周 $16.48），平均每次 7.2 分钟，token 630.8M，缓存命中 92%。设计分叉 25 场（上周 7 场），成立 367 条，已评花费 $10.58，平均每次 1.8 分钟。

综合能力评分（同活动类型内归一后的相对排名，0～100，权重：效果 40% + 精准 25% + 独立 10% + 时间 10% + token 10% + 花费 5%）：

事后审计：
1. DeepSeek V4.1 Flash 77.3※
2. Grok 4.6 Extra High 73.4
3. Muse Spark 1.3 Contributor 72.9※
4. GLM-5.3-Flash 65.6
5. K3 64.8
6. GLM-5.3 52.9
7. DeepSeek V4 Flash 48.5
8. Gemini 3.8 Flash 48.1
9. MiMo V2.5 Pro 20.6

DeepSeek V4.1 Flash 排第一，但样本不足 20 场，结论要打折。主力（≥20 场）第一是 Grok 4.6 Extra High，73.4 分。

设计分叉：
1. Fable 5.1 93.6※
2. K3 83.1
3. DeepSeek V4.1 Flash 61.0※
4. Gemini 3.8 Flash 60.2
5. GLM-5.3 60.0
6. Grok 4.6 Extra High 56.3
7. DeepSeek V4 Flash 56.1
8. GLM-5.3-Flash 53.1
9. Muse Spark 1.3 Contributor 52.4※
10. MiMo V2.5 Pro 20.3※

Fable 5.1 同样样本不足。主力第一是 K3，83.1 分；方向契合分也是它最高，4.55，最低是 MiMo V2.5 Pro 的 2.81。设计分叉这件事上 K3 的优势比较稳定。

比总分更有信息量的是分项第一。

事后审计各分项：
产出质量分第一 DeepSeek V4.1 Flash 8.2（Grok 4.6 Extra High 7.7 第二）
准确率第一 GLM-5.3-Flash 94%（Grok 4.6 Extra High 89%、DeepSeek V4.1 Flash 88% 分列二三）
独有占比第一 Muse Spark 1.3 Contributor 68%
效率分第一 Muse Spark 1.3 Contributor 2.47
速度第一 Muse Spark 1.3 Contributor，平均每次 1.9 分钟
每条成立 token 最省 Muse Spark 1.3 Contributor，251.6 千枚
每次花费最省 Muse Spark 1.3 Contributor $0.01
成立密度第一 DeepSeek V4.1 Flash，每次 2.42 条
每次最贵 Grok 4.6 Extra High $1.17，本周合计 $48.96，折合每条成立缺陷 $0.62（成立 79 条）

设计分叉各分项：
产出质量分第一 Fable 5.1 29.0
准确率并列第一 Fable 5.1 / DeepSeek V4.1 Flash / Muse Spark 1.3 Contributor，都是 100%
独有占比第一 Fable 5.1 59%
效率分第一 Fable 5.1 10.72
速度第一 DeepSeek V4.1 Flash 与 Muse Spark 1.3 Contributor，都是每次 0.8 分钟
每条成立 token 最省 K3，7.2 千枚
每次花费最省 Muse Spark 1.3 Contributor $0.00
每次最贵仍是 Grok 4.6 Extra High $0.30，本周合计 $5.97，折合每条成立 $0.11（成立 56 条）

口径与坦白：
- 失败与未经判定的场次不进对照，但花费照计。本周失败 23 行；另有未评 16 行（2 个场次），补评后才算完成。
- 订阅制模型金额未采集，不记 0；没采集到的轴按中位 50 记。
- 总分是同活动类型内 min-max 归一后的相对排名，不是绝对能力分，跨周不可直接比。
- ※ 表示样本 < 20 场，结论打折。
- 效率分只作参考，不进综合分。

本周印象最深的一点：事后审计里没有一个模型独占所有第一。Grok 4.6 Extra High 主力总分第一，但每次最贵；Muse Spark 1.3 Contributor 在速度、token、花费三个省钱维度全第一，独有占比也第一，但缓存命中率 84% 垫底；GLM-5.3-Flash 准确率 94% 最高，却是速度末位（每次 9.4 分钟）。选型取决于你要什么。

你在多模型编排上最看重哪一项？欢迎交流。#LLM #AI #Benchmark #MultiModel
