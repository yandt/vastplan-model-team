<!-- 生成：DeepSeek V4.1 Flash（max）（deepseek-4.1-cline）· 2026-09-27 11:27:46+08:00 · 耗时 163s · $0.1653（估价） · 窗口 2026-09-21 → 2026-09-28 -->
<!-- 配图：1-ranking.png, 2-audit-quality.png, 3-audit-cost.png, 4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

本期（2026-W39，9/21–9/28，进行中）我继续用多模型跑 VastPlan 的真实工程：自研的 Node/TypeScript 插件运行时与 Portal 内核，不是题库。事后审计＝多模型并行找 BUG、对照代码判定；设计分叉＝各出方案、按用户最终选定算契合度。失败与未评场次不进对照但花费照计，订阅制模型金额未采集不记 0，总分是同活动类型内的相对排名。

本期还在进行中，场次比上期少：事后审计 24 场（上期 56）、成立 615（上期 649）、假阳 61（上期 226）、花费 $108.49（上期 $158.66）；设计分叉 11 场（上期 40）、成立 156（上期 593）、假阳 12（上期 43）、花费 $22.66（上期 $30.20）。专责推理本期 0 场（上期 1 场），另有 26 行未评（2 个场次）待补评。

事后审计综合排名：

1. Space Bunny Free 84.1
2. Grok 4.6 Extra High Cursor 83.8
3. Step 5 Preview 75.5
4. DeepSeek V4.1 Flash（max） 72.0
5. DeepSeek V4.1 Flash（high） 67.1
6. Muse Spark 1.3 Contributor 65.8
7. MiniMax M3 65.4
8. SWE-2 56.0
9. Kimi K3 方舟 Agent Plan 52.0
10. Qwen3.8 Flash 42.5
11. MiMo V2.6 Pro 40.0
12. Grok 4.7 Extra High 37.4
13. GLM-5.3 36.3
14. MiMo V2.6 Flash 35.3
15. GLM-5.3-Flash 34.4
16. Grok 4.6 Extra High xAI 25.7
17. MiMo V2.5 Pro 9.9

好的这头：Space Bunny Free 新进就登顶 84.1，覆盖 11%、每次 $0.00；Grok 4.6 Extra High Cursor 从第 5（66.5）升到第 2（83.8），假阳从 15 降到 1、准确率 97%。差的那头：Qwen3.8 Flash 从上期第 1（89.0）掉到第 10（42.5），降 46.5；Grok 4.7 Extra High 每次 $4.26、折合每条成立 $3.60（成立 13 条），本期最贵。

最省是 SWE-2 与 Space Bunny Free 的每次 $0.00，Muse Spark 1.3 Contributor $0.01；最不准是 MiniMax M3，事后审计准确率 78%。掉榜的是 Kimi K3 Cursor（上期第 6 61.1）和 DeepSeek V4 Flash（上期第 8 54.6）。

设计分叉综合排名：

1. Grok 4.6 Extra High Cursor 100.0
2. Qwen3.8 Flash 67.3
3. SWE-2 67.3
4. GLM-5.3 60.6
5. Fable 5.1 59.8
6. DeepSeek V4.1 Flash（high） 59.5
7. GLM-5.3-Flash 57.2
8. Kimi K3 方舟 Agent Plan 53.8
9. Step 5 Preview 49.3
10. DeepSeek V4.1 Flash（max） 49.2
11. Muse Spark 1.3 Contributor 41.6
12. MiMo V2.5 Pro 25.0
13. MiniMax M3 23.4

设计分叉这头：Grok 4.6 Extra High Cursor 从第 2（75.3）升到第 1（100.0），升 24.7；Qwen3.8 Flash 从第 8（25.0）升到第 2（67.3），升 42.3；上期第 1 的 Kimi K3 方舟 Agent Plan 掉到第 8（53.8），降 29.7，DeepSeek V4 Flash 掉榜（上期第 5 37.9）。4 场的 Opus 5.5（max）样本还不够排名（均质量 12.8、覆盖 14%），先放观察区；契合分最高也是它 5.00，最低 MiMo V2.5 Pro 2.14。

你在用哪个模型跑代码审计？欢迎留言。#LLM #AI #Benchmark #MultiModel

`
