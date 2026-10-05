<!-- 生成：DeepSeek V4.1 Flash（max）（deepseek-4.1-qoder）· 2026-10-05 14:34:35+08:00 · 耗时 105s · 未采集 · 窗口 2026-09-28 → 2026-10-05 -->
<!-- 配图：1-ranking.png, 2-audit-quality.png, 3-audit-cost.png, 4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

这周继续跑 VastPlan——我们自研的 Node/TypeScript 插件运行时与 Portal 内核，真实工程，不是题库。事后审计：多家模型并行找 BUG、对照代码判定是否成立；设计分叉：各家出方案，按用户最终选定的算契合度。

口径先交代：失败与未评场次不进对照、花费照计；订阅制模型金额未采集不记 0；总分是同活动类型内的相对排名。

事后审计 21 场（上期 24），已评 218 行，成立 297 条，假阳从 61 降到 28，花费 $100.88，token 431.4M（缓存命中 87%），平均每次 8.1 分钟。前五：

1. SWE-2 88.6
2. DeepSeek V4.1 Flash（max） Cline 85.8
3. Space Bunny Free 81.0
4. Grok 4.7 Extra High 80.7
5. Grok 4.6 Extra High xAI 71.5

榜首换人：SWE-2 从上期第 8（56.0）升到第 1，+32.6，均质量 10.9、成立 33 条。DeepSeek V4.1 Flash（max） Cline 新进榜直接第 2，每次花费 $0.00 全场最低、均质量 12.8 全场最高。涨幅更大的是 Grok 两家：4.7 从第 12 到第 4，+43.4；4.6 Extra High xAI 从第 16 到第 5，+45.8。

上期第 1 的 Space Bunny Free 退到第 3（84.1→81.0）。观察区的 Muse Spark 1.3 Contributor Cline 打了 4 场、均质量 13.3，差一场样本没进排名。

另一头 DeepSeek V4.1 Flash（max） OpenCode Go 从第 4 归零，成立 0 条；上期第 2 的 Grok 4.6 Extra High Cursor 本期掉榜。费用端最贵是 Grok 4.7 Extra High：每次 $4.07，每条成立缺陷合 $2.18，两项都属事后审计之最。

设计分叉 6 场（上期 11），成立 91 条，假阳 12 降到 2，花费 $20.61，平均每次 2.8 分钟。前三：

1. Opus 5.5（max） Cursor 87.5
2. Grok 4.7 Extra High 64.2
3. Kimi K3 56.8

Opus 5.5（max） Cursor 新进榜即第 1，均质量 20.8、契合分 4.33 都是全场最高，代价是每次 $2.52，也是设计分叉里最贵的一家。上期头名 Grok 4.6 Extra High Cursor 本期掉榜；末位 MiniMax M3 只剩 12.5（降 10.9），均质量 3.8、成立密度 0.33。

专责推理 5 场，花费 $12.56，各家样本都不足 5 场，只进观察区不排名。

另有 77 行未评、18 行失败，按口径不计入对照。

想看哪家细账，评论区点单。#LLM #AI #Benchmark #MultiModel
