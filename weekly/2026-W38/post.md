<!-- 生成：DeepSeek V4.1 Flash（max）（deepseek-4.1）· 2026-09-24 10:49:42+08:00 · 耗时 70s · $0.0259（估价） · 窗口 2026-09-14 → 2026-09-21 -->
<!-- 配图：1-ranking.png, 2-audit-quality.png, 3-audit-cost.png, 4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

本周（2026-W38，9/14–9/21）继续用多模型跑 VastPlan 的真实工程：自研的 Node/TypeScript 插件运行时与 Portal 内核，不是题库。事后审计＝多模型并行找 BUG、对照代码判定；设计分叉＝各出方案、按用户最终选定算契合度。失败与未评场次不进对照但花费照计，订阅制金额未采集不记 0，总分是同活动类型内的相对排名。

规模继续涨：事后审计 56 场（上期 46）、成立 649（上期 481）、假阳 226（上期 127）、花费 $158.66（上期 $141.34）；设计分叉 40 场（上期 25）、成立 593（上期 367）、假阳 43（上期 18）、花费 $30.20（上期 $14.21）。

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

好的这头：Qwen3.8 Flash 新进登顶，均质量 7.6、准确率 93%。差的那头：Kimi K3 Cursor 从上期第 1（84.1）掉到第 6（61.1），降 23.0；MiMo V2.5 Pro 升到 17.9 仍垫底，准确率 39%、假阳从 17 涨到 35。Gemini 3.8 Flash 掉榜。最省是 Muse Spark 1.3 Contributor 每次 $0.01，最贵是 Grok 4.6 Extra High 每次 $1.35。

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

Kimi K3 方舟 Agent Plan 从第 3（69.0）升到第 1（83.5），均质量 20.2、覆盖 36%；上期第 1 的 Fable 5.1 降到第 3（63.0），降 28.8，每次 $0.65 最贵。契合分最高 Step 5 Preview 5.00、最低 MiMo V2.5 Pro 3.39。

你用哪个模型跑审计？欢迎留言。#LLM #AI #Benchmark #MultiModel
