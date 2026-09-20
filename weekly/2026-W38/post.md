<!-- 生成：K3（k3-pi-coding-plan）· 2026-09-21 00:15:20+08:00 · 耗时 39s · $0.0716（估价） · 窗口 2026-09-14 → 2026-09-21 -->
<!-- 配图：1-ranking.png, 2-audit-quality.png, 3-audit-cost.png, 4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

《模型团队周报》2026 年第 38 周（进行中）。

测试场是 VastPlan——我自研的一个 Node/TypeScript 插件运行时与 Portal 内核的真实工程，不是题库，也不是合成任务。每周让多家模型在这个工程上真实干活，记真实花费、真实缺陷、真实表现。

本周数据分两部分（外加一个刚起步的专责推理）：

① 事后审计：功能代码完成后，多家模型并行找 BUG、提优化点。每条发现我都逐条对照代码判定成立或不成立，并按 1~5 计重要性。本期 56 场、已评 446 行，成立 649 条，其中独有 276 条、假阳性 226 条。重要性 5 到 1 分布为 72/199/242/120/16。已评花费 $158.66，平均每次 7.6 分钟，token 951.2M（缓存命中 95%）。

② 设计分叉：各模型各自给设计方案，等项目真实选完之后，再算各方案与最终选定方向的契合度。本期 40 场、已评 337 行，成立 593 条，独有 224 条，假阳仅 43 条。重要性 5/4 级合计 431 条。已评花费 $30.20，平均每次 1.9 分钟，token 25.5M。

综合分是同活动类型内归一后的相对排名（41% 效果 + 34% 覆盖 + 25% 独立，时间/花费/token 本期权重为 0）：

事后审计：
1. Qwen3.8 Flash 89.0
2. DeepSeek V4.1 Flash（high） 81.5
3. DeepSeek V4.1 Flash（max） 80.4
4. Muse Spark 1.3 Contributor 66.9
5. Grok 4.6 Extra High 66.5
6. K3 Cursor 61.1
7. K3 方舟 Agent Plan 56.6
8. DeepSeek V4 Flash 54.6
9. GLM-5.3-Flash 51.4
10. GLM-5.3 47.2
11. MiMo V2.5 Pro 17.9

设计分叉：
1. K3 方舟 Agent Plan 83.5
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

比总分更有信息量的，是分项第一。同一家模型不可能在所有维度都强：

事后审计分项第一：
- 平均质量分：Qwen3.8 Flash 7.6
- 覆盖率：DeepSeek V4.1 Flash（max） 27%
- 独有占比：Qwen3.8 Flash 71%
- 准确率：Qwen3.8 Flash 93%
- 最快：Muse Spark 1.3 Contributor 2.5 分钟/次
- 最省：Muse Spark 1.3 Contributor $0.01/次，折合每条成立缺陷 $0.01
- 每条成立最贵：Grok 4.6 Extra High，$0.94（本期合计 $68.81，成立 73 条）

设计分叉分项第一：
- 平均质量分：K3 方舟 Agent Plan 20.2
- 覆盖：K3 方舟 Agent Plan 36%
- 成立密度：K3 方舟 Agent Plan 2.56 条/次
- 独有占比与准确率：Qwen3.8 Flash 双双 100%
- 每条成立 token 最省：K3 方舟 Agent Plan 9.6 千枚
- 最快：DeepSeek V4.1 Flash（max） 0.8 分钟/次
- 最贵：Fable 5.1 $0.65/次，每条成立 $0.33

一个值得注意的对照：Qwen3.8 Flash 在事后审计拿了总分第一，但在设计分叉只有 25.0 分（覆盖 12%），虽然它给的方向独有占比和准确率都是 100%。找 BUG 和出方向，看起来是两种不同的能力。反过来，K3 方舟 Agent Plan 设计分叉第一，事后审计只排第 7。

口径与坦白：
- 失败与未经判定的场次不进对照，但花费照计。本期未评 24 行（3 个场次，补评后才算完成）、失败 7 行。
- 订阅制模型金额未采集，不记 0，费用只按已评且已采集的行合计。
- 总分是同活动类型内归一后的相对排名，不是绝对能力分。
- 样本不足 5 场的只进观察区，不排名、不算综合分。比如事后审计的 Gemini 3.8 Flash（3 场，均质量 1.7）、Step 5 Preview（2 场，均质量 18.5）；设计分叉契合分最高其实是观察区的 Step 5 Preview 5.00，最低是 MiMo V2.5 Pro 3.39。
- 专责推理本期只有 1 场，全员观察区，不展开。

本期观察：便宜模型找 BUG 的性价比正在拉开——Muse Spark 每条成立缺陷 $0.01，是 Grok 4.6 Extra High 的 1/94；但设计分叉的质量分前两名仍是 K3 方舟 Agent Plan 和 Grok 4.6 Extra High。钱花在哪儿，取决于你要它干什么。

你更关心哪种口径——每条成立缺陷的花费，还是单位时间的产出？#LLM #AI #Benchmark #MultiModel
