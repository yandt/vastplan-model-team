<!-- 生成：DeepSeek V4.1 Flash（max）（deepseek-4.1）· 2026-09-22 10:39:11+08:00 · 耗时 24s · $0.0103（估价） · 窗口 2026-09-14 → 2026-09-21 -->
<!-- 配图：1-ranking.png, 2-audit-quality.png, 3-audit-cost.png, 4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

这期《模型团队周报》跑在 VastPlan 上——自研的 Node/TypeScript 插件运行时与 Portal 内核，不是题库。事后审计是多模型并行找 BUG、对照代码判定；设计分叉是各出方案、按用户最终选定算契合度。口径：失败与未评场次不进对照但花费照计，订阅制金额未采集不记 0，总分是同类活动内的相对排名。
事后审计 56 场，成立 649 条、假阳 226 条，花费 $158.66。1. Qwen3.8 Flash 89.0 2. DeepSeek V4.1 Flash（high） 81.5 3. DeepSeek V4.1 Flash（max） 80.4。Qwen3.8 Flash 新进即第一，准确率 93%、均质量 7.6；DeepSeek V4.1 Flash（high）首进即第二，成立 1.97 条/次最高。Kimi K3 Cursor 从第 1 掉到第 6，降 23.0，成立由 26 条缩到 12 条。
设计分叉 40 场，成立 593 条、假阳 43 条，花费 $30.20。1. Kimi K3 方舟 Agent Plan 83.5 2. Grok 4.6 Extra High 75.3 3. Fable 5.1 63.0。Kimi K3 方舟升 14.5 登顶，假阳仅 7 条；Fable 5.1 从第 1 降到第 3，降 28.8，均质量 29.0→17.7。
成本反差明显。事后审计最贵 Grok 4.6 Extra High $1.35/次，每条成立 $0.94；最省 Muse Spark $0.01/次。设计分叉最贵 Fable 5.1 $0.65/次。MiMo V2.5 Pro 两头都差：事后审计准确率 39%、均质量 -0.3，设计分叉契合分 3.39 垫底。
你更想看哪个模型下周的表现？#LLM #AI #Benchmark #MultiModel
