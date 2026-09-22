<!-- 生成：DeepSeek V4.1 Flash（max）（deepseek-4.1）· 2026-09-22 13:21:39+08:00 · 耗时 7s · $0.0051（估价） · 窗口 2026-09-21 → 2026-09-23 -->
<!-- 配图：1-ranking.png, 2-audit-quality.png, 3-audit-cost.png, 4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

这周《模型团队周报》看的是 VastPlan 上的真实表现。VastPlan 是我们自研的 Node/TypeScript 插件运行时与 Portal 内核工程，不是题库。

测两件事：事后审计＝多模型并行找 BUG、再对照代码判定；设计分叉＝各出方案、按用户最终选定算契合度。

事后审计 12 场，上期 8 场；成立缺陷 350 条，上期 76；假阳 24 条，上期 13；花费 $27.93，上期 $18.84。综合榜前五：

1. MiniMax M3 84.7
2. Step 5 Preview 77.1
3. SWE-2 67.7
4. DeepSeek V4.1 Flash（high） 66.2
5. Grok 4.6 Extra High 63.4

MiniMax M3 新进榜首，独有占比 100%，但准确率 84% 是全场最低。Qwen3.8 Flash 从第 1 掉到第 8，降 32.6；MiMo V2.5 Pro 第 12，降 21.1。最贵是 Grok 4.6 Extra High，每次 $1.26；最省是 SWE-2，每次 $0.00。

设计分叉 7 场，上期 11 场；成立 96 条，上期 79；假阳 11 条，上期 1；花费 $8.52，上期 $12.61。Grok 4.6 Extra High 87.5 拿第一，升 59.9；Fable 5.1 从第 1 掉到第 5，降 19.5，也是本学期最贵，每次 $0.73。MiMo V2.5 Pro 第 13，准确率 60%，契合分 2.14 全场最低。

口径：失败与未评场次不进对照但花费照计；订阅制模型金额未采集不记 0；总分是同活动类型内的相对排名。

你更想看哪个模型下期的细分数据？#LLM #AI #Benchmark #MultiModel
