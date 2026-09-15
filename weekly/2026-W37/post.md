<!-- 生成：K3（k3-pi）· 2026-09-15 08:25:13 · 耗时 99s · $0.1099（估价） · 窗口 2026-09-13 → 2026-09-14 -->
<!-- 配图：images/1-ranking.png, images/2-audit-quality.png, images/3-audit-cost.png, images/4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

模型团队周报 2026-W37（9月13日→9月14日）

我们的 VastPlan 项目——一个自研的 Node/TypeScript 插件运行时与 Portal 内核的真实工程，不是题库也不是合成任务——继续用多模型团队协作开发，每周把账本摊开一次。本周跑了两类测试：

① 事后审计：功能代码完成后，多个模型并行找 BUG、提优化点，每条发现都逐条对照真实代码判定成立/不成立，并按 1~5 记重要性。本周 8 场（上周 4 场），已评 72 行，成立 63 条（上周 80），其中独有发现 38 条，假阳性 16 条。重要性分布：5 级 10 条、4 级 16 条、3 级 24 条、2 级 10 条、1 级 3 条。已评行花费 $25.42（上周 $16.34，另有 8 行金额未采集），平均每次 4.6 分钟，token 79.3M，缓存命中 90%。

② 设计分叉：同一件事让各模型各自给设计方案，等项目真实选完方向之后，再回头算每个模型的方向契合度。本周 3 场（上周 4 场），已评 27 行，成立 23 条（上周 52），独有 23 条，假阳性 0。重要性 5 级 10 条、4 级 6 条、3 级 7 条。已评行花费 $1.81（上周 $2.50，3 行未采集），平均每次 1.4 分钟，token 1.5M，缓存命中 60%。

综合分按 6 项加权：效果 35% + 覆盖 30% + 独立 10% + 时间 10% + 花费 5% + token 10%，在同活动类型内 min-max 归一到 0~100 后加权。

事后审计综合排名：
1. DeepSeek V4.1 Flash 78.9
2. K3@Cursor 66.6
3. Muse Spark 1.3 Contributor 59.4
4. GLM-5.3-Flash 53.1
5. Gemini 3.8 Flash 52.3
6. MiMo V2.5 Pro 49.6
7. GLM-5.3 46.5
8. Grok 4.6 Extra High 37.3
9. DeepSeek V4 Flash 22.5
主力口径（≥5 场）第一也是 DeepSeek V4.1 Flash。

设计分叉综合排名：
1. K3@Cursor 93.9※
2. Gemini 3.8 Flash 58.0※
3. Grok 4.6 Extra High 46.7※
4. Muse Spark 1.3 Contributor 44.7※
5. DeepSeek V4.1 Flash 31.8※
6. MiMo V2.5 Pro 28.1※
7. GLM-5.3 26.9※
8. GLM-5.3-Flash 22.5※
9. DeepSeek V4 Flash 22.5※
方向契合分最高 K3@Cursor 4.33，最低 MiMo V2.5 Pro 2.33。

比总分更有信息量的是分项第一。事后审计里：平均质量分第一 DeepSeek V4.1 Flash 6.8；覆盖第一也是它，21%；准确率第一是 GLM-5.3-Flash 100%，DeepSeek V4.1 Flash 93% 紧随其后；独有占比 Grok 4.6 Extra High 与 Muse Spark 1.3 Contributor 并列 100%；效率分第一 Muse Spark 1.3 Contributor 1.73；执行最快是 DeepSeek V4 Flash，每次 0.3 分钟；输出速度第一 Gemini 3.8 Flash，每秒 94.1 token；每条成立缺陷 token 最省是 Muse Spark 1.3 Contributor，340.2 千枚；缓存命中第一 DeepSeek V4.1 Flash 97%；成立密度第一也是它，每次 1.62 条。

性价比值得单独说。事后审计每次最省：Muse Spark 1.3 Contributor 和 GLM-5.3-Flash 都是 $0.01，MiMo V2.5 Pro $0.03。最贵的是 Grok 4.6 Extra High：每次 $0.90、本周合计 $7.16，只成立 4 条，折合每条成立缺陷 $1.79——它找的问题确实独到（独有占比 100%），但单位产出的价格明显偏高。设计分叉里它同样最贵：每次 $0.38、本周合计 $1.15，折合每条 $0.19（成立 6 条）。设计分叉每次最省的是 MiMo V2.5 Pro、Muse Spark 1.3 Contributor、GLM-5.3-Flash，都是 $0.00。

设计分叉的分项也提一下：质量分、覆盖、准确率、独有占比、效率分、成立密度、每条成立 token 这七项第一全是 K3@Cursor（质量分 32.7、覆盖 51%、效率分 9.48、每次成立 4.00 条、每条仅 7.8 千 token）；执行最快是 DeepSeek V4 Flash 与 V4.1 Flash 并列每次 0.3 分钟；输出速度第一 DeepSeek V4.1 Flash，每秒 139.4 token。

口径与坦白：失败和未经判定的场次不进对照，但花费照计；本周未评 0 行、失败 0 行。订阅制模型的金额未采集，不记 0——没采集到的轴在综合分里按中位 50 记。总分是同活动类型内归一后的相对排名，不是绝对能力分，跨活动类型不可比。※ 表示样本 < 5 场、结论打折，本周设计分叉整体样本都偏小。效率分（成立重要性÷耗时）只作参考列，不进综合分。

你们在多模型协作里是怎么分工的？欢迎交流。#LLM #AI #Benchmark #MultiModel
