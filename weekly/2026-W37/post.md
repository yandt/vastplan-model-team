<!-- 生成：K3（k3-pi）· 2026-09-15 01:06:57 · 耗时 34s · $0.0279（估价） · 窗口 2026-09-07 → 2026-09-14 -->
<!-- 配图：images/1-ranking.png, images/2-audit-quality.png, images/3-audit-cost.png, images/4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

《模型团队周报》2026 年第 37 周（09-07 → 09-14）。我们每周把一批模型拉进同一个真实工程干活，然后记一笔账。工程是 VastPlan：一个自研的 Node/TypeScript 插件运行时与 Portal 内核，不是题库，也不是合成任务。测两类活：

① 事后审计：功能代码完成后，多个模型并行找 BUG、提优化点，再逐条对照代码人工判定成立/不成立，按 1~5 记重要性。
② 设计分叉：同一件事，各模型各自给设计方案，等项目真实选完方向，再回头算契合度。

本周总量：事后审计 46 场（上周 14 场），已评 319 行、判定成立 519 条，已评部分花费 $151.35，平均每次 7.2 分钟，token 630.8M、缓存命中 92%。设计分叉 25 场（上周 7 场），已评 167 行、成立 367 条，花费 $14.21，平均每次 1.8 分钟，token 11.6M、缓存命中 65%。

综合分（同活动类型内六项归一加权，0~100，※=样本<20 场、结论打折）

事后审计：
1. DeepSeek V4.1 Flash（opencode） 72.6※
2. K3（agent） 69.1※
3. DeepSeek V4.1 Flash（pi） 68.0※
4. Grok 4.6 Extra High 66.3
5. Muse Spark 1.3 Contributor 65.7※
6. Gemini 3.8 Flash 62.5
7. K3（pi） 61.2
8. GLM-5.3（pi） 60.5
9. GLM-5.3-Flash（pi） 56.4
10. DeepSeek V4 Flash 47.0
11. MiMo V2.5 Pro 29.3
12. GLM-5.3-Flash（zcode） 14.4※
前三名全是小样本※。跑满 20 场以上的主力里，第一是 Grok 4.6 Extra High 66.3。

设计分叉：
1. K3（agent） 85.4※
2. Fable 5.1 76.9※
3. K3（pi） 66.8※
4. DeepSeek V4.1 Flash（opencode） 64.1※
5. Gemini 3.8 Flash 45.5
6. GLM-5.3（pi） 43.2
7. Grok 4.6 Extra High 42.8
8. DeepSeek V4 Flash 38.6
9. GLM-5.3-Flash（pi） 35.6
10. DeepSeek V4.1 Flash（pi） 27.6※
11. Muse Spark 1.3 Contributor 24.9※
12. MiMo V2.5 Pro 22.2※
同样，前四都带※；主力第一是 Gemini 3.8 Flash 45.5。方向契合分最高 K3（pi）4.69，最低 MiMo V2.5 Pro 2.81。

比总分更有信息量的，是分项第一。

事后审计分项：
平均质量分：DeepSeek V4.1 Flash（opencode）12.0，第一梯队里唯一上两位数的；末位 GLM-5.3-Flash（zcode）-1.0，质量分为负。
覆盖：Gemini 3.8 Flash 19% 第一。
准确率：GLM-5.3-Flash（pi）95% 第一，但同一个模型走 zcode 只有 50%，接法差异比模型差异还大。
独有占比：DeepSeek V4.1 Flash（opencode）75%，三分之四的成立缺陷只有它一家找到。
最快：Muse Spark 1.3 Contributor 平均 1.9 分钟。
每条成立最省 token：Muse Spark 251.6 千枚；最费的是 Gemini 3.8 Flash 2,637.4 千枚。
每次最省：Muse Spark $0.01；最贵 Grok 4.6 Extra High $1.17，本周合计 $48.96，折合每条成立缺陷 $0.62（成立 79 条）。贵，但它是主力场里综合第一，钱花在哪看得见。

设计分叉分项：
平均质量分：Fable 5.1 29.0 第一；准确率 100% 的有三家（Fable 5.1、DeepSeek V4.1 Flash 两种接法）。
覆盖：K3（agent）31% 第一。
效率分：Fable 5.1 10.72 第一。
最快：DeepSeek V4.1 Flash（pi）0.6 分钟。
每条成立最省 token：K3（pi）4.9 千枚；最费 Grok 4.6 Extra High 102.5 千枚。
每次最省：Muse Spark 和 GLM-5.3-Flash（pi）都约 $0.00；最贵 Fable 5.1 $0.60，折合每条成立 $0.17（成立 22 条）。

口径与坦白：
失败与未经判定的场次不进对照，但花费照计——本周失败 23 行、未评 16 行（2 个场次，补评后才算完成）。
订阅制模型金额未采集，不记 0，综合分里该轴按中位 50 记；所以带订阅模型的排名偏保守。
总分是同活动类型内 min-max 归一后的相对排名，只说明这周这拨模型里的相对位置，不能跨周比绝对值。
※ 表示样本 < 20 场，结论打折。本周设计分叉第一名 K3（agent）85.4 就是※，别当成定论。
所有百分数均为判定口径照抄，未做换算。

一句话总结：这周审计侧 DeepSeek V4.1 Flash（opencode）在小样本里质量和独有性都最突出，但真正的主力对照里 Grok 4.6 Extra High 用最贵的单次成本守住了综合第一；设计侧 K3 三种形态包揽契合分与覆盖，Fable 5.1 质量最高但样本同样不足。接法（pi/agent/opencode/zcode）对同一模型的影响，多次大于模型之间的差距。

你们团队在真实工程里跑多模型对照吗？哪一项指标最影响你的选型？#LLM #AI #Benchmark #MultiModel
