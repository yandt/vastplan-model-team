<!-- 生成：K3（k3-pi-coding-plan）· 2026-09-19 14:27:17+08:00 · 耗时 93s · $0.1159（估价） · 窗口 2026-09-14 → 2026-09-21 -->
<!-- 配图：1-ranking.png, 2-audit-quality.png, 3-audit-cost.png, 4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

第 38 周（9/14–9/21，进行中）模型团队周报。

先交代背景：VastPlan 是我自研的 Node/TypeScript 插件运行时与 Portal 内核的真实工程，测试素材全部来自这个项目的日常开发，不是题库，不是合成任务。每周把多家模型放进同一条工作流里跑，按周出一次相对排名。

工作流分两部分。一是事后审计：功能代码完成后，多模型并行找 BUG、提优化点，我逐条对照代码判定成立/不成立，并按 1～5 计重要性。二是设计分叉：动手前各模型各自给设计方案，等项目真实选完方向，再回头算方向契合度。本周另有 1 场专责推理，样本太少，只报数不下结论。

本周的量：审计 50 场、成立 585 条（重要性 5 的有 63 条，假阳 216）；设计分叉 31 场、成立 518 条（假阳只有 43，分歧题确实更少翻车）。审计 token 829.8M、缓存命中 95%，平均每次 7.7 分钟；分叉 19.0M、命中 71%，平均 1.9 分钟。

综合能力评分（41% 效果 + 34% 覆盖 + 25% 独立，同活动类型内归一后的相对排名）：

事后审计：
1. Qwen3.8 Flash※ 88.3
2. DeepSeek V4.1 Flash（high）76.6
3. DeepSeek V4.1 Flash（max）73.4
4. Grok 4.6 Extra High 62.0
5. Muse Spark 1.3 Contributor 59.2
6. K3 Cursor 56.9
7. K3 方舟 Agent Plan 54.3
8. GLM-5.3-Flash 52.1
9. DeepSeek V4 Flash 49.9
10. GLM-5.3 48.8
11. MiMo V2.5 Pro 25.0
12. Gemini 3.8 Flash※ 16.3
样本 ≥5 场的主力第一：DeepSeek V4.1 Flash（high）。

设计分叉：
1. K3 方舟 Agent Plan 89.7
2. K3 Cursor※ 88.3
3. Grok 4.6 Extra High 87.6
4. Fable 5.1 68.4
5. GLM-5.3 63.7
6. Gemini 3.8 Flash※ 63.1
7. Muse Spark 1.3 Contributor 55.4
8. DeepSeek V4.1 Flash（max）53.8
9. DeepSeek V4.1 Flash（high）52.7
10. DeepSeek V4 Flash 50.6
11. GLM-5.3-Flash 45.3
12. MiMo V2.5 Pro 36.5
13. Qwen3.8 Flash※ 0.0
主力第一：K3 方舟 Agent Plan。方向契合分最高 Qwen3.8 Flash 5.00，最低 MiMo V2.5 Pro 3.35。

比总分更有信息量的是分项第一，同一批模型在不同维度换位很明显：
- 审计平均质量分：Qwen3.8 Flash 8.0
- 审计覆盖（重要性加权）：Qwen3.8 Flash 56%
- 审计准确率：Qwen3.8 Flash 100%
- 审计独有占比：MiMo V2.5 Pro 50%——一半的收获是它独家挖到的
- 审计成立密度：DeepSeek V4.1 Flash（high）每次 2.13 条
- 分叉平均质量：K3 Cursor 23.3
- 分叉覆盖：Gemini 3.8 Flash 47%
- 分叉独有占比：K3 Cursor 53%
- 分叉成立密度：K3 Cursor 每次 3.00 条

性价比：
- 审计最省：Muse Spark 1.3 Contributor，每次 $0.01，每条成立 $0.01
- 审计每次最贵：Grok 4.6 Extra High $1.35，本期合计 $60.81，折合每条成立 $0.89
- 审计每条成立最贵：Gemini 3.8 Flash $1.87（样本不足，打折看）
- 分叉最贵：Fable 5.1 每次 $0.64、每条 $0.28；Muse、GLM-5.3-Flash、MiMo 的分叉账单是 $0.00

口径与坦白：
- 失败 7 行与未评 24 行（3 个场次）不进对照，但花费照计。
- 订阅制模型金额未采集，不记 0；费用只按已评行合计。
- 总分是同活动类型内归一后的相对排名，不是绝对能力分。
- ※ 表示样本 < 5 场，结论打折。专责推理本周仅 1 场（K3 方舟 89.1 第一），不构成趋势。
- 本周还在进行中，环比窗口是 9/7–9/14，数字还会动。

你们在多模型分工里更看重准确率还是覆盖？欢迎聊。#LLM #AI #Benchmark #MultiModel
