<!-- 生成：Kimi K3（k3-pi-coding-plan）· 2026-09-21 23:11:54+08:00 · 耗时 115s · $0.1048（估价） · 窗口 2026-09-14 → 2026-09-21 -->
<!-- 配图：1-ranking.png, 2-audit-quality.png, 3-audit-cost.png, 4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

这是我们自研工程 VastPlan 的多模型协作周报，2026 年第 38 周（9-14 → 9-21）。VastPlan 是一个真实在开发中的 Node/TypeScript 插件运行时与 Portal 内核，所有模型评测都跑在这个工程的真实任务上，不是题库，也不是合成任务。

我们让多家模型在两条流水线上干活：

一、事后审计：功能代码完成后，多模型并行找 BUG、提优化点，再逐条对照代码判定成立或不成立，成立的按 1~5 记重要性。本周 56 场，已评 446 行，成立 649 条（其中独有 276 条），假阳性 226 条。重要性 5/4/3/2/1 分别是 72/199/242/120/16。已评行花费 $158.66，平均每次 7.6 分钟，token 951.2M（缓存命中 95%）。

二、设计分叉：各模型各自给设计方案，等项目真实选完方向，再回头算每家的方向契合度。本周 40 场，已评 337 行，成立 593 条（独有 224），假阳 43。花费 $30.20，平均每次 1.9 分钟，token 25.5M（缓存命中 72%）。

另有专责推理 1 场，样本太少，只在文末观察区列数字。

综合能力评分（41% 效果 + 34% 覆盖 + 25% 独立，同活动类型内归一后的相对排名）：

事后审计：
1. Qwen3.8 Flash 89.0
2. DeepSeek V4.1 Flash（high） 81.5
3. DeepSeek V4.1 Flash（max） 80.4
4. Muse Spark 1.3 Contributor 66.9
5. Grok 4.6 Extra High 66.5
6. Kimi K3 Cursor 61.1
7. Kimi K3 方舟 Agent Plan 56.6
8. DeepSeek V4 Flash 54.6
9. GLM-5.3-Flash 51.4
10. GLM-5.3 47.2
11. MiMo V2.5 Pro 17.9

设计分叉：
1. Kimi K3 方舟 Agent Plan 83.5
2. Grok 4.6 Extra High 75.3
3. Fable 5.1 63.0
4. GLM-5.3 46.8
5. DeepSeek V4 Flash 37.9
6. Muse Spark 1.3 Contributor 34.3
7. DeepSeek V4.1 Flash（max） 33.7
8. Qwen3.8 Flash 25.0
9. GLM-5.3-Flash 24.9
10. DeepSeek V4.1 Flash（high） 22.6
11. MiMo V2.5 Pro 9.0

比总分更有信息量的是分项第一。事后审计里：平均质量分第一是 Qwen3.8 Flash 7.6，准确率第一也是它（93%），独有占比第一还是它（71%）——总分第一是靠质量、精准、独立三个分项一起撑起来的。覆盖率第一是 DeepSeek V4.1 Flash（max）27%，成立密度第一是 DeepSeek V4.1 Flash（high）每次 1.97 条。生成速度和耗时第一是 Muse Spark 1.3 Contributor（82.3 token/秒，平均 2.5 分钟）。末位也值得记：MiMo V2.5 Pro 准确率只有 39%，平均质量分 -0.3。

设计分叉里：质量、覆盖、成立密度三个第一都是 Kimi K3 方舟 Agent Plan（20.2 分、36%、每次 2.56 条），token 效率也是它第一（每条成立 9.6 千枚）。独立占比和准确率第一都是 Qwen3.8 Flash（100%、100%）。方向契合分最高是 Step 5 Preview 5.00，最低是 MiMo V2.5 Pro 3.39。

性价比：最省的是 Muse Spark 1.3 Contributor，事后审计每次 $0.01、每条成立 $0.01，设计分叉每次 $0.00。每条成立缺陷最贵的是 Grok 4.6 Extra High：事后审计每次 $1.35（本期合计 $68.81），折合每条成立 $0.94（成立 73 条）。设计分叉最贵是 Fable 5.1，每次 $0.65（合计 $10.38），每条成立 $0.33（成立 31 条）。

口径与坦白：
- 失败和未经判定的场次不进对照，但花费照计。本周未评 24 行（3 个场次，补评后才算完成），失败 7 行。
- 订阅制模型金额未采集，不记 0，所以花费合计并不完整。
- 总分是同活动类型内归一后的相对排名，只能在同类型内部比。
- 样本不足 5 场的只进观察区，只列数字、不排名、不算综合分。本期观察区：事后审计有 Gemini 3.8 Flash（3 场，均质量 1.7，成立 2 条，覆盖 18%）、Step 5 Preview（2 场，均质量 18.5，成立 8 条，覆盖 18%）、SWE-2（1 场，均质量 11.0）；设计分叉有 Gemini 3.8 Flash（3 场，覆盖 32%）、Kimi K3 Cursor（3 场，均质量 23.3）、Step 5 Preview（2 场）、SWE-2（1 场）；专责推理 9 家各 1 场，均质量最高 Kimi K3 方舟 Agent Plan 36.0，最低 DeepSeek V4.1 Flash（high）1.0。

这套审计加分叉的多模型机制我们已持续跑了多周，数据逐周累积。对这个口径或 VastPlan 本身感兴趣的，欢迎交流。#LLM #AI #Benchmark #MultiModel
