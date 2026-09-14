<!-- 生成：K3（k3-pi）· 2026-09-14 23:22:02 · 耗时 30s · $0.0667（估价） · 窗口 2026-09-07 → 2026-09-14 -->
<!-- 配图：images/1-ranking.png, images/2-audit-quality.png, images/3-audit-cost.png, images/4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

《模型团队周报》第 37 周（2026-09-07 → 09-14）。我在 VastPlan（自研的 Node/TypeScript 插件运行时与 Portal 内核，真实工程，不是题库或合成任务）里持续用多模型团队干活，本周数据如下。

先说两类测试分别是什么。一是事后审计：功能代码完成后，多个模型并行找 BUG、提优化点，我逐条对照代码判定成立/不成立，并按 1~5 记严重度。二是设计分叉：各模型各自给设计方案，等项目真实选定方向后，再回头算契合度。

本周事后审计 46 场（上周 14），已评行 319，成立 519 条（上周 70），其中独有 242、假阳 140；严重度 5/4/3/2/1 分别为 87/129/154/128/21。花费已评 $151.35（上周 $16.48），平均每次 7.2 分钟，token 630.8M（缓存命中 92%）。

设计分叉 25 场（上周 7），已评行 167，成立 367 条（上周 23），独有 121、假阳 18；严重度 5/4/3/2/1 为 166/122/72/7/0。花费已评 $10.58（上周 $3.02），平均每次 1.8 分钟，token 11.6M（缓存命中 65%）。

综合能力是相对排名：6 项按权重（35% 效果、25% 精准、10% 独立、10% 时间、10% 花费、10% token）在同活动类型内归一到 0~100 后加权。某项没采集到（如订阅制模型没有金额）按中位 50 记。

事后审计综合排名：
1. DeepSeek V4.1 Flash 75.8※
2. Muse Spark 1.3 Contributor 74.9※
3. Grok 4.6 Extra High 68.8
4. GLM-5.3-Flash 67.2
5. K3 63.1
6. GLM-5.3 53.1
7. DeepSeek V4 Flash 50.3
8. Gemini 3.8 Flash 45.4
9. MiMo V2.5 Pro 25.5
样本 ≥20 场的主力第一是 Grok 4.6 Extra High 68.8。

设计分叉综合排名：
1. Fable 5.1 91.1※
2. K3 82.7
3. DeepSeek V4.1 Flash 64.8※
4. GLM-5.3 62.5
5. Gemini 3.8 Flash 62.2
6. DeepSeek V4 Flash 59.4
7. Muse Spark 1.3 Contributor 57.2※
8. GLM-5.3-Flash 56.6
9. Grok 4.6 Extra High 53.1
10. MiMo V2.5 Pro 25.2※
主力第一是 K3 82.7；契合分最高也是 K3 4.55，最低 MiMo V2.5 Pro 2.81。

比总分更有信息量的是分项第一。事后审计：
平均质量分第一是 DeepSeek V4.1 Flash 8.2（末位 MiMo V2.5 Pro 0.8）；
准确率第一是 GLM-5.3-Flash 94%，Grok 4.6 Extra High 89% 第二（末位 MiMo 53%）；
独有占比第一是 Muse Spark 68%；
效率分第一 Muse Spark 2.47；
最快 Muse Spark 每次 1.9 分钟（末位 GLM-5.3-Flash 9.4）；
每条成立 token 最省 Muse Spark 251.6 千枚（末位 Gemini 2,637.4）；
缓存命中第一 DeepSeek V4.1 Flash 98%；
成立密度第一 DeepSeek V4.1 Flash 每次 2.42 条；
每次花费最省 Muse Spark $0.01。最贵的是 Grok 4.6 Extra High，每次 $1.17，本周合计 $48.96，折合每条成立缺陷 $0.62（成立 79 条）。

设计分叉：
平均质量分第一 Fable 5.1 29.0，K3 24.4 第二（末位 MiMo 9.1）；
准确率并列 100% 的有 Fable 5.1、DeepSeek V4.1 Flash、Muse Spark（末位 MiMo 73%）；
独有占比第一 Fable 5.1 59%，K3 54% 第二（末位 MiMo 8%）；
效率分第一 Fable 5.1 10.72，Gemini 10.26、K3 9.38 紧随其后；
最快 DeepSeek V4.1 Flash 和 Muse Spark 各 0.8 分钟；
每条成立 token 最省 K3 7.2 千枚（末位 Grok 102.5）；
每次花费最省 Muse Spark $0.00。最贵还是 Grok，每次 $0.30，本周合计 $5.97，折合每条 $0.11（成立 56 条）。

口径与坦白：失败 23 行与 2 个未评场次（16 行）不进对照，但花费照计；订阅制模型金额未采集、不记 0；总分是同活动类型内归一后的相对排名，不代表绝对水平；※ 表示样本 < 20 场，结论打折。本周审计量从 14 涨到 46 场，部分模型的样本才刚起步，排名波动会很大，别当终局结论。

一句话总结：审计主力选 Grok 4.6 Extra High，烧钱但稳；省钱选 Muse Spark；设计分叉押 K3。你们现在生产上用几家模型做交叉审查？#LLM #AI #Benchmark #MultiModel
