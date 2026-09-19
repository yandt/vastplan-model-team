<!-- 生成：K3（k3-pi-coding-plan）· 2026-09-19 12:14:31+08:00 · 耗时 41s · $0.0801（估价） · 窗口 2026-09-14 → 2026-09-21 -->
<!-- 配图：1-ranking.png, 2-audit-quality.png, 3-audit-cost.png, 4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

《模型团队周报》2026 年第 38 周（进行中，窗口 09-14 → 09-21）。

先交代背景：VastPlan 是我们自研的 Node/TypeScript 插件运行时与 Portal 内核，所有测试都发生在这个真实工程的开发流水线上，不是题库，也不是合成任务。每场都是真实的代码改动、真实的设计决策。

本周多模型协作分两部分测试：

① 事后审计：功能代码完成后，多家模型并行找 BUG、提优化点，我再逐条对照真实代码判定成立/不成立，并按 1~5 记重要性。本周 49 场，已评 380 行，成立缺陷 573 条（其中独有 212 条，假阳性 213 条），重要性 5/4/3/2/1 = 63/180/211/104/15。已评部分花费 $142.04，平均每次 7.7 分钟，token 813.7M（缓存命中 95%）。

② 设计分叉：遇到有 2~4 条都说得通的路时，各模型各自给设计方案，等项目真实选定方向之后，再回头算各家方案与最终选择的契合度。本周 29 场，成立 514 条，假阳 42 条，花费 $17.59，平均每次仅 1.9 分钟。

综合评分（41% 效果 + 34% 覆盖 + 25% 独立，同活动类型内归一后的相对排名）：

事后审计：
1. DeepSeek V4.1 Flash（max） 96.6
2. DeepSeek V4.1 Flash（high） 93.2
3. Grok 4.6 Extra High 81.6
4. Muse Spark 1.3 Contributor 78.7
5. K3 Cursor 77.1
6. K3 方舟 Agent Plan 71.3
7. GLM-5.3-Flash 69.3
8. DeepSeek V4 Flash 68.0
9. GLM-5.3 65.4
10. MiMo V2.5 Pro 30.9
11. Gemini 3.8 Flash※ 27.1
12. Qwen3.8 Flash※ 3.7

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

专责推理本周只有 1 场，全员 ※，不展开：K3 方舟 Agent Plan 89.1 领先。

比总分更有信息量的，是分项第一。

事后审计里：平均质量分第一是 DeepSeek V4.1 Flash（max）6.9；但它不是全包——独立发现（独有占比、重要性加权）第一是 MiMo V2.5 Pro 48%，准确率第一是 GLM-5.3-Flash 84%，生成速度第一是 Gemini 3.8 Flash 每秒 99.0 token。覆盖口径前两名咬得很紧：DeepSeek（max）31%、K3 Cursor 30%。

设计分叉里：平均质量分第一是 Grok 4.6 Extra High 24.1；覆盖率第一 Gemini 3.8 Flash 与 K3 方舟 Agent Plan 并列 47%；独有占比第一 K3 Cursor 53%；准确率第一 Gemini 3.8 Flash 与 K3 Cursor 并列 100%。另外设计分叉契合分最高是 Gemini 3.8 Flash 4.67，最低 DeepSeek V4.1 Flash（high）3.33——总分和契合分并不总是一致。

性价比这块值得单独说。事后审计每条成立缺陷最省的是 Muse Spark 1.3 Contributor，$0.01；最贵的是 Gemini 3.8 Flash，$1.87。每次会话最贵的是 Grok 4.6 Extra High，$1.36，本期合计 $59.72，折合每条成立缺陷 $0.88（成立 68 条）。设计分叉每次最贵是 Fable 5.1，$0.66，每条成立 $0.28。Token 效率差距很大：事后审计每条成立缺陷，Muse Spark 用 349.0 千枚，Gemini 3.8 Flash 用 11,881.5 千枚。

口径与坦白：

- 失败 7 行、未评 24 行（3 个场次）不进对照，但失败场次的花费照计。
- 订阅制模型金额未采集，不记 0。所以表里若干 $0.00、$0.01 的低价项要看这一点，不等于真实免费。
- 总分是同活动类型内归一后的相对排名，不是绝对能力分。
- ※ 表示样本不足（本期口径 < 5 场），结论打折。专责推理全员 ※。
- 百分数照抄原始账本，未做换算。

本周一个直观感受：找 BUG 最强和设计最强不是同一家，DeepSeek V4.1 Flash 在审计上断层领先，K3 方舟 Agent Plan 在设计上拿第一，便宜模型在单项上经常爆冷。多模型互补目前是成立的。

你们团队里审计和设计是同一个模型在做吗？欢迎聊聊。#LLM #AI #Benchmark #MultiModel
