<!-- 生成：Kimi K3（k3-pi-coding-plan）· 2026-09-21 01:40:52+08:00 · 耗时 39s · $0.0656（估价） · 窗口 2026-09-14 → 2026-09-21 -->
<!-- 配图：1-ranking.png, 2-audit-quality.png, 3-audit-cost.png, 4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

《模型团队周报》2026 年第 38 周。这是我在 VastPlan 上跑多模型协作的第八周数据。VastPlan 是我自研的 Node/TypeScript 插件运行时与 Portal 内核，模型们审的都是它的真实工程代码，不是题库，不是合成任务。

先说测试是怎么跑的，两部分：

① 事后审计：功能代码写完后，多模型并行审同一批改动，找 BUG、提优化点。每条结论由我对照真实代码逐条判定成立/不成立，成立的按 1~5 标重要性。本周 56 场、446 条已评行，成立 649 条，其中独有发现 276 条，假阳性 226 条。

② 设计分叉：编码前各模型各自出设计方案，等项目真实做完选型，再回头算各模型方向与最终选择的契合度。本周 40 场、337 条已评行，成立 593 条，独有 224 条，假阳只有 43 条——出方案比挑错靠谱得多。

综合评分是 41% 效果 + 34% 覆盖 + 25% 独立，同活动类型内归一后的相对排名：

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

比总分更有信息量的是分项第一。事后审计里：平均质量分第一是 Qwen3.8 Flash（7.6），精准率第一也是它（93%），独有占比第一还是它（71%）——它赢在三项，总分第一是实打实的。但覆盖面第一是 DeepSeek V4.1 Flash（max）27%，成立密度第一是 DeepSeek V4.1 Flash（high）每次 1.97 条。设计分叉里 Kimi K3 方舟 Agent Plan 拿了质量分（20.2）、覆盖（36%）、成立密度（2.56）三个第一，Grok 4.6 Extra High 紧随其后。

性价比是另一条线。事后审计每次花费最省的是 Muse Spark 1.3 Contributor，$0.01；每条成立缺陷最便宜的也是它，$0.01。最贵的是 Grok 4.6 Extra High：每次 $1.35，本期合计 $68.81，折合每条成立缺陷 $0.94（成立 73 条）。设计分叉每次最贵的是 Fable 5.1，$0.65，折合每条成立 $0.33。有意思的是 Qwen3.8 Flash 缓存命中率是 0%，DeepSeek V4.1 Flash 两档都到 98%——同样的钱花出去，缓存策略影响很大。

本周花了多少：事后审计已评行合计 $158.66（另有 12 行费用未采集），平均每次 7.6 分钟，token 951.2M，缓存命中 95%。设计分叉 $30.20（14 行未采集），平均 1.9 分钟，25.5M token。专责推理只跑了 1 场，$1.29。

口径与坦白：失败 7 行和未评 24 行（3 个场次）不进对照，但花费照计。订阅制模型金额未采集，不记 0，所以便宜的不一定真便宜。总分是相对排名，换一批模型分数就会动。样本不足 5 场的只进观察区、不排名：事后审计观察区有 Gemini 3.8 Flash（3 场，均质量 1.7）、Step 5 Preview（2 场，18.5）、SWE-2（1 场，11.0）；设计分叉观察区有 Kimi K3 Cursor（3 场，23.3）、Gemini 3.8 Flash（3 场，18.0）等。专责推理 9 个模型各 1 场，全部在观察区，数字里 Grok 4.6 Extra High 均质量 29.0、Kimi K3 方舟 Agent Plan 36.0 领先，但 1 场说明不了什么。设计分叉契合分最高的是 Step 5 Preview 5.00，不过它只有 2 场，先不下结论。

下周打算把专责推理的场次补起来，观察区那几位值得给够样本。

你们团队在用多模型互相审计吗，还是单模型一把梭？#LLM #AI #Benchmark #MultiModel
