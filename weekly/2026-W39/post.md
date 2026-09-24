<!-- 生成：DeepSeek V4.1 Flash（max）（deepseek-4.1）· 2026-09-24 10:50:16+08:00 · 耗时 12s · $0.0067（估价） · 窗口 2026-09-21 → 2026-09-25 -->
<!-- 配图：1-ranking.png, 2-audit-quality.png, 3-audit-cost.png, 4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

本期是 VastPlan 模型团队周报 2026 年第 39 周（进行中），窗口 2026-09-21 到 09-25。VastPlan 是我们自研的 Node/TypeScript 插件运行时与 Portal 内核，是真实工程，不是题库。

测试分两种：事后审计是多模型并行找 BUG、再对照代码判定；设计分叉是各出方案、按用户最终选定的方案算契合度。口径上，失败与未评场次不进对照但花费照计，订阅制模型未采集到的金额不记 0，总分是同活动类型内的相对排名。

本周事后审计 20 场，成立 538 条、独有 449 条、假阳 53 条，花费 $81.70；环比场次 27→20，成立 286→538，假阳 87→53。设计分叉 10 场，成立 156 条，花费 $19.38，假阳 10→12，场次 21→10。专责推理本周 0 场。

事后审计榜前八：

1. Grok 4.6 Extra High Cursor 78.9
2. MiniMax M3 72.9
3. Step 5 Preview 72.5
4. DeepSeek V4.1 Flash（high） 70.8
5. DeepSeek V4.1 Flash（max） 68.3
6. Muse Spark 1.3 Contributor 67.7
7. Kimi K3 方舟 Agent Plan 60.8
8. SWE-2 56.6

Grok 4.6 Extra High Cursor 从上期第 3 升到第 1，均质量 5.9→12.5、假阳 4→1，是本期主力里分数最高的一个。Qwen3.8 Flash 成立 13→40、均质量 7.6→10.2 都在涨，排名却从上期第 1 的 83.3 掉到第 11 的 48.3。MiMo V2.5 Pro 垫底 7.1，比上期再降 17.9。

设计分叉榜前五：

1. Grok 4.6 Extra High Cursor 100.0
2. SWE-2 72.5
3. Qwen3.8 Flash 72.3
4. GLM-5.3 65.5
5. Fable 5.1 64.7

Grok 4.6 Extra High Cursor 环比 69.2 升 30.8；Fable 5.1 从上期第 1 的 80.5 降到第 5 的 64.7。

性价比上，事后审计每次花费最低是 SWE-2 $0.00、Muse Spark 1.3 Contributor $0.01、MiMo V2.6 Flash $0.02；最贵是 Grok 4.7 Extra High，每次 $4.88，折合每条成立缺陷 $4.27。设计分叉最贵是 Fable 5.1，每次 $0.73。

样本不足的观察区里，事后审计 Space Bunny Free 3 场均质量 11.0；设计分叉 Opus 5.5（max）3 场均质量 17.0，契合分 5.00 为全场最高。数字都在这里，欢迎一起聊口径。#LLM #AI #Benchmark #MultiModel
