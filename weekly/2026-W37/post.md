<!-- 生成：K3（k3-pi）· 2026-09-14 22:41:08 · 耗时 35s · $0.0268（估价） · 窗口 2026-09-07 → 2026-09-14 -->
<!-- 配图：images/1-ranking.png, images/2-audit-quality.png, images/3-audit-cost.png, images/4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

《模型团队周报》2026 年第 37 周。我们在 VastPlan——一个自研的 Node/TypeScript 插件运行时与 Portal 内核的真实工程，不是题库、不是合成任务——上持续用多家模型做两类评测，这是本周的数据。

两类测试是什么：

① 事后审计：功能代码完成后，多家模型并行审查，找 BUG、提优化点，再逐条对照代码判定成立/不成立，成立的按 1～5 计严重度。本周 46 场（上周 14 场），已评 319 行，判定成立 519 条，其中独有 242 条、假阳性 140 条。严重度 5/4/3/2/1 分别为 87/129/154/128/21。已评部分花费 $151.35，平均每次 7.2 分钟，token 630.8M，缓存命中 92%。

② 设计分叉：有设计取舍时，各模型各自给设计方案，等项目真实选完方向后，再回头算每个模型的方向契合度。本周 25 场（上周 7 场），已评 167 行，成立 367 条，独有 121 条，假阳 18 条。花费 $10.58，平均每次 1.8 分钟，token 11.6M，缓存命中 65%。

综合能力评分（6 项等权，同活动类型内归一后的相对排名）：

事后审计：
1. Muse Spark 1.3 Contributor 86.0※
2. DeepSeek V4.1 Flash 62.8※
3. GLM-5.3-Flash 59.4
4. K3 56.4
5. Grok 4.6 Extra High 54.0
6. GLM-5.3 49.8
7. DeepSeek V4 Flash 47.5
8. MiMo V2.5 Pro 42.5
9. Gemini 3.8 Flash 33.6
主力（≥20 场）第一：GLM-5.3-Flash 59.4。

设计分叉：
1. Fable 5.1 85.2※
2. K3 83.3
3. DeepSeek V4.1 Flash 76.6※
4. Muse Spark 1.3 Contributor 68.2※
5. Gemini 3.8 Flash 66.2
6. GLM-5.3 65.5
7. DeepSeek V4 Flash 63.4
8. GLM-5.3-Flash 58.7
9. MiMo V2.5 Pro 42.0※
10. Grok 4.6 Extra High 37.8
主力第一：K3 83.3。契合分最高也是 K3（4.55），最低 MiMo V2.5 Pro（2.81）。

比总分更有信息量的，是分项第一。

事后审计分项：
· 平均质量分第一 DeepSeek V4.1 Flash 8.2（末位 MiMo V2.5 Pro 0.8）
· 准确率第一 GLM-5.3-Flash 94%（末位 MiMo 53%）
· 独有占比第一 Muse Spark 68%（末位 GLM-5.3 35%）
· 效率分第一 Muse Spark 2.47（末位 MiMo 0.49）
· 最快 Muse Spark 1.9 分钟/次（最慢 GLM-5.3-Flash 9.4）
· 每条成立最省 token：Muse Spark 251.6 千枚（最费 Gemini 2,637.4）
· 缓存命中第一 DeepSeek V4.1 Flash 98%（末位 Muse Spark 84%）
· 成立密度第一 DeepSeek V4.1 Flash 2.42 条/次（末位 MiMo 0.54）
· 每次最省 Muse Spark $0.01；最贵 Grok 4.6 Extra High $1.17（本周合计 $48.96，折合每条成立缺陷 $0.62，成立 79 条）

设计分叉分项：
· 平均质量分第一 Fable 5.1 29.0（末位 MiMo 9.1）
· 准确率 100%：Fable、DeepSeek V4.1 Flash、Muse Spark 三家并列（末位 MiMo 73%）
· 独有占比第一 Fable 59%（末位 MiMo 8%）
· 效率分第一 Fable 10.72（末位 Muse Spark 2.61）
· 最快 DeepSeek V4.1 Flash 与 Muse Spark 并列 0.8 分钟（最慢 Grok 3.4）
· 每条成立最省 token：K3 7.2 千枚（最费 Grok 102.5）
· 缓存命中第一 Fable 100%（末位 Muse Spark 1%）
· 成立密度第一 Fable 3.67 条/次（末位 Muse Spark 0.57）
· 每次最省 Muse Spark $0.00；最贵 Grok $0.30（本周合计 $5.97，每条成立 $0.11，成立 56 条）

性价比上两个极端值得单独说：Muse Spark 在审计侧每次 $0.01、最快、最省 token，但它是 ※ 样本；Grok 4.6 Extra High 每次 $1.17、每条成立缺陷 $0.62，是全场每条成立缺陷最贵的，综合分却在中游。

口径与坦白：失败 23 行和 2 个未评场次不进对照，但花费照计；订阅制模型金额未采集，不记 0，对应轴按中位 50 记；总分是同活动类型内 min-max 归一后的相对排名，不是绝对能力；※ 表示样本不足 20 场，结论打折。本周样本量上来了（审计 46 场、分叉 25 场），但多家模型仍未过 20 场线。

你更想看哪个维度？下周期盼各家样本都能过线。#LLM #AI #Benchmark #MultiModel
