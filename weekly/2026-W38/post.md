<!-- 生成：Kimi K3（k3-pi-coding-plan）· 2026-09-21 07:50:30+08:00 · 耗时 112s · $0.1055（估价） · 窗口 2026-09-14 → 2026-09-21 -->
<!-- 配图：1-ranking.png, 2-audit-quality.png, 3-audit-cost.png, 4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

模型团队周报 2026-W38（窗口 09-14 → 09-21）。

先交代背景：这套评测跑在 VastPlan 上，是我们自研的 Node/TypeScript 插件运行时与 Portal 内核的真实工程，不是题库、不是合成任务。所有题目都来自这周真实开发里产生的功能代码和设计决策。

本周两部分测试。

一是事后审计：功能代码完成后，多家模型并行找 BUG、提优化点，我再逐条对照代码判定成立还是不成立，并按 1~5 记重要性。本期 56 场、已评 446 行：成立 649 条，其中独有 276 条、假阳 226 条；重要性 5/4/3/2/1 分别为 72/199/242/120/16。已评花费 $158.66（另有 12 行金额未采集），平均每次 7.6 分钟，token 951.2M，缓存命中 95%。

二是设计分叉：同一道设计题，各模型各自给方案，等项目真实选完方向后再回头算方向契合度。本期 40 场、已评 337 行：成立 593 条、独有 224、假阳 43；重要性 245/186/140/22/0。花费 $30.20（14 行未采集），平均每次 1.9 分钟，token 25.5M，缓存命中 72%。

另有专责推理 1 场，成立 18 条、独有 14，样本太少，只进观察区。

综合分口径：41% 效果 + 34% 覆盖 + 25% 独立加权，同活动类型内归一，是相对排名，不是绝对分。

事后审计综合排名：
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

比总分更有信息量的是分项第一。事后审计里：平均质量分第一 Qwen3.8 Flash 7.6（末位 MiMo V2.5 Pro -0.3）；覆盖第一 DeepSeek V4.1 Flash（max） 27%；独有占比第一 Qwen3.8 Flash 71%；准确率第一也是它，93%（末位 MiMo 39%）；成立密度第一 DeepSeek V4.1 Flash（high），每次 1.97 条；生成速度第一 Muse Spark 82.3 token/s；执行最快也是 Muse Spark，平均 2.5 分钟。

性价比：每次最省 Muse Spark $0.01，折合每条成立缺陷也是 $0.01；GLM-5.3-Flash 每条 $0.02 紧随其后。最贵的是 Grok 4.6 Extra High：每次 $1.35，本期合计 $68.81，成立 73 条，折合每条 $0.94。花费最高，综合分排第 5。

设计分叉综合排名：
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

设计分叉分项第一：平均质量分、覆盖、成立密度三项都被 Kimi K3 方舟 Agent Plan 拿下（20.2、36%、每次 2.56 条）；独有占比第一反而是总分第 8 的 Qwen3.8 Flash，100%，准确率它也是 100%——说得少，但说的都成立；每条成立 token 最省 Kimi K3 方舟 9.6 千枚（末位 Grok 132.5）；最费钱 Fable 5.1，每次 $0.65、每条 $0.33，本期合计 $10.38。契合分最高 Step 5 Preview 5.00，最低 MiMo V2.5 Pro 3.39。

观察区（样本不足 5 场，只列数字、不排名、不算综合分）：事后审计 Gemini 3.8 Flash 3 场、覆盖 18%，Step 5 Preview 2 场、覆盖 18%，SWE-2 1 场；设计分叉 Gemini 3.8 Flash 3 场、覆盖 32%，Kimi K3 Cursor 3 场、覆盖 28%。专责推理每一家都只跑了 1 场：Kimi K3 方舟均质量 36.0、覆盖 21%，Grok 29.0，GLM-5.3 26.0，但单场说明不了什么。

口径与坦白：失败 7 行和未评 24 行（3 个场次，补评后才算完成）不进对照，但花费照计；订阅制模型金额未采集，留空不记 0；综合分是同活动类型内归一后的相对排名，不能跨类型横比；样本不足的一律只进观察区。另外缓存命中率受调用方式影响很大（Qwen3.8 Flash 为 0%，DeepSeek V4.1 Flash 两家 98%），看绝对值时请留意这一点。

你在多模型协作里踩过什么坑，欢迎聊。#LLM #AI #Benchmark #MultiModel
