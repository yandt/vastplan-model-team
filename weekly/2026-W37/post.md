<!-- 生成：DeepSeek V4.1 Flash（max）（deepseek-4.1）· 2026-09-22 13:20:24+08:00 · 耗时 18s · $0.0078（估价） · 窗口 2026-09-07 → 2026-09-14 -->
<!-- 配图：1-ranking.png, 2-audit-quality.png, 3-audit-cost.png, 4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

本周（2026-W37，9/7–9/14）我继续用多模型跑 VastPlan 的真实工程审计与设计任务。VastPlan 是我们自研的 Node/TypeScript 插件运行时与 Portal 内核，不是题库。事后审计让多模型并行找 BUG、再对照代码判定；设计分叉让各模型出方案、按用户最终选定算契合度。失败与未评场次不进对照但花费照计，订阅制模型金额未采集不记 0，总分是同活动类型内的相对排名。

规模上来了：事后审计 46 场（上期 14），成立 481 条（上期 70），假阳 127（上期 14），花费 $141.34（上期 $16.48）。设计分叉 25 场（上期 7），成立 367，假阳 18，花费 $14.21（上期 $5.30）。

事后审计综合排名：

1. Kimi K3 Cursor 84.1
2. DeepSeek V4.1 Flash（max） 78.7
3. Grok 4.6 Extra High 76.9
4. Gemini 3.8 Flash 68.7
5. Muse Spark 1.3 Contributor 67.8
6. Kimi K3 方舟 Agent Plan 61.5
7. GLM-5.3 52.9
8. GLM-5.3-Flash 49.5
9. DeepSeek V4 Flash 30.9
10. MiMo V2.5 Pro 2.4

设计分叉综合排名：

1. Fable 5.1 91.8
2. Kimi K3 Cursor 83.5
3. Kimi K3 方舟 Agent Plan 69.0
4. Grok 4.6 Extra High 60.2
5. Gemini 3.8 Flash 42.4
6. GLM-5.3 32.4
7. DeepSeek V4 Flash 29.2
8. GLM-5.3-Flash 26.8
9. DeepSeek V4.1 Flash（max） 18.1
10. Muse Spark 1.3 Contributor 9.6
11. MiMo V2.5 Pro 5.6

好的那家：Grok 4.6 Extra High 事后审计成立数从 2 条跳到 70 条，均质量 5.0→7.2，但每条成立花费 $0.66、每次 $1.15 是本期最贵。差的那家：MiMo V2.5 Pro 事后审计准确率只有 51%、均质量 0.7，两榜都垫底；Gemini 3.8 Flash 假阳从 6 条涨到 36 条，值得盯。

性价比最高是 Muse Spark 1.3 Contributor，事后审计每次花费 $0.01、每条成立 $0.01，设计分叉也在 $0.00 档。

你怎么看这期结果？欢迎留言。#LLM #AI #Benchmark #MultiModel
