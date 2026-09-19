<!-- 生成：K3（k3-pi-coding-plan）· 2026-09-19 09:46:02+08:00 · 耗时 31s · $0.0760（估价） · 窗口 2026-09-14 → 2026-09-21 -->
<!-- 配图：1-ranking.png, 2-audit-quality.png, 3-audit-cost.png, 4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

模型团队周报 2026 年第 38 周（进行中，窗口 2026-09-14 → 2026-09-21）。

先说背景：测试场是我们自研的 VastPlan，一个 Node/TypeScript 插件运行时与 Portal 内核的真实工程。不是题库，不是合成任务，是每周真实在写、在改、在上线的代码。所有模型都在同一套真实工程流程里跑，数字全部来自我们自己的记账账本。

本周模型做两类测试：

① 事后审计：功能代码完成后，多个模型并行找 BUG、提优化点，每条发现逐条对照代码人工判定成立/不成立，成立的按 1~5 记重要性。本周 48 场、已评 371 行，判定成立 573 条，其中独有发现 212 条、假阳性 213 条。重要性 5/4/3/2/1 分别为 63/180/211/104/15。已评花费 $139.82，平均每次 7.8 分钟，token 793.8M（缓存命中 95%）。

② 设计分叉：同一个设计问题，各模型各自给方案，等项目真实选定之后，再回头算每个模型的方向契合度。本周 29 场、已评 224 行，成立 514 条，独有 145 条，假阳 42 条。重要性 5/4/3/2/1 为 234/142/120/18/0。已评花费 $17.59，平均每次 1.9 分钟，token 17.4M（缓存命中 71%）。

另有专责推理 1 场，样本太小，只报数不下结论：成立 18 条，独有 14 条，花费 $1.29。

综合能力评分（41% 效果 + 34% 覆盖 + 25% 独立，时间/花费/token 权重为 0，同活动类型内归一，是相对排名不是绝对分）：

事后审计：
1. DeepSeek V4.1 Flash（max） 96.6
2. DeepSeek V4.1 Flash（high） 92.9
3. Grok 4.6 Extra High 80.2
4. Muse Spark 1.3 Contributor 77.4
5. K3 Cursor 75.6
6. K3 方舟 Agent Plan 69.2
7. GLM-5.3-Flash 67.0
8. DeepSeek V4 Flash 65.7
9. GLM-5.3 63.0
10. MiMo V2.5 Pro 25.0
11. Gemini 3.8 Flash※ 22.6
主力口径（≥5 场）第一同样是 DeepSeek V4.1 Flash（max）。

设计分叉：
1. K3 方舟 Agent Plan 91.5
2. Grok 4.6 Extra High 88.5
3. K3 Cursor※ 76.0
4. Gemini 3.8 Flash※ 54.7
5. GLM-5.3 50.8
6. Fable 5.1 41.3
7. DeepSeek V4.1 Flash（high） 38.5
8. Muse Spark 1.3 Contributor 36.5
9. DeepSeek V4.1 Flash（max） 35.8
10. DeepSeek V4 Flash 25.4
11. GLM-5.3-Flash 22.8
12. MiMo V2.5 Pro 7.7
主力第一 K3 方舟 Agent Plan。契合分最高 Gemini 3.8 Flash 4.67，最低 DeepSeek V4.1 Flash（high） 3.33。注意一个反差：事后审计的前两名在设计分叉里排第 9 和第 7，找 BUG 强不等于设计方向强。

比总分更有信息量的是分项第一（各自口径）：

事后审计——
质量分第一 DeepSeek V4.1 Flash（max）7.1；覆盖第一 DeepSeek V4.1 Flash（max）32%；独有占比第一 MiMo V2.5 Pro 48%（但它准确率只有 35%，总分垫底，独有全靠广撒网）；准确率第一 GLM-5.3-Flash 84%；速度第一 Muse Spark 1.3 Contributor 平均 2.5 分钟；成立密度第一 DeepSeek V4.1 Flash（high）每次 2.10 条。

设计分叉——
质量分第一 Grok 4.6 Extra High 24.1；覆盖并列第一 Gemini 3.8 Flash 与 K3 方舟 Agent Plan 各 47%；独有占比第一 K3 Cursor 53%；准确率并列第一 Gemini 3.8 Flash、K3 Cursor 各 100%；成立密度第一 K3 方舟 Agent Plan 每次 3.20 条。

性价比也值得单独说。事后审计里，每条成立缺陷最便宜的是 Muse Spark 1.3 Contributor $0.01，其次 GLM-5.3-Flash $0.02、DeepSeek V4.1 Flash（high）$0.05；最贵的是 Gemini 3.8 Flash 每条 $1.87。单次最贵是 Grok 4.6 Extra High，每次 $1.36，本周合计 $58.66，折合每条成立缺陷 $0.86（成立 68 条）——贵，但质量分和准确率都在前三。设计分叉里每条成立缺陷最贵的是 Fable 5.1 $0.28，最便宜的三家都是 $0.00。

口径与坦白：
- 失败与未经判定的场次不进对照，但花费照计。本周未评 24 行（3 个场次，补评后才算完成），失败 7 行。
- 订阅制模型金额未采集，不记 0，也不参与花费类排名。
- 总分是同活动类型内归一后的相对排名，跨类型不可比。
- ※ 表示样本 < 20 场，结论打折。
- 本周是进行中数据，窗口还没关。

一个本周的直观感受：没有全能模型。审计选 DeepSeek V4.1 Flash，设计选 K3 方舟 Agent Plan，省钱选 Muse Spark，这是目前我们多模型分工的真实依据。

你们团队做多模型分工吗，按什么指标切？#LLM #AI #Benchmark #MultiModel
