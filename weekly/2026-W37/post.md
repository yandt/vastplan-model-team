<!-- 生成：K3（k3-pi）· 2026-09-15 02:09:47 · 耗时 48s · $0.0664（估价） · 窗口 2026-09-07 → 2026-09-14 -->
<!-- 配图：images/1-ranking.png, images/2-audit-quality.png, images/3-audit-cost.png, images/4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

《模型团队周报》2026 年第 37 周（09-07 至 09-14）

这周我们把十几款模型继续放进 VastPlan 的真实工程里跑。VastPlan 是我自研的一套 Node/TypeScript 插件运行时与 Portal 内核，模型在这里做的不是题库、不是合成任务，而是真实代码库上的两类工作。

第一类叫事后审计：功能代码写完，多个模型并行审，找 BUG、提优化点。每条结论由人逐条对照代码判定成立还是不成立，成立的按 1~5 计重要性。第二类叫设计分叉：各模型各自给出设计方案，等项目真实选完方向之后，再回头算各家方案与最终选择的契合度。也就是说，两类测试的判分都基于真实工程裁决，不是模型互评。

本周规模：事后审计 46 场（上周 14 场），判定 319 行、成立 519 条；设计分叉 25 场（上周 7 场），判定 167 行、成立 367 条。审计侧已评花费 $151.35，token 630.8M（缓存命中 92%），平均每次 7.2 分钟；设计侧 $14.21，token 11.6M，平均每次 1.8 分钟。

综合评分是把效果、覆盖、独立、时间、花费、token 六项按 35/30/10/10/5/10 的权重，在同活动类型内归一后的相对排名，不是绝对分。

事后审计综合前十：
1. K3@Cursor 74.4
2. DeepSeek V4.1 Flash 74.3
3. Grok 4.6 Extra High 71.6
4. Muse Spark 1.3 Contributor 71.6
5. Gemini 3.8 Flash 64.3
6. K3@方舟 Agent Plan 61.9
7. GLM-5.3 58.7
8. GLM-5.3-Flash 54.4
9. DeepSeek V4 Flash 44.2
10. MiMo V2.5 Pro 20.6
主力（≥5 场）第一是 K3@Cursor。

设计分叉综合前十一：
1. K3@Cursor 87.5
2. Fable 5.1 78.5
3. K3@方舟 Agent Plan 68.1
4. Gemini 3.8 Flash 46.7
5. GLM-5.3 43.8
6. Grok 4.6 Extra High 43.6
7. DeepSeek V4 Flash 39.2
8. GLM-5.3-Flash 35.9
9. DeepSeek V4.1 Flash 35.2
10. Muse Spark 1.3 Contributor 25.9
11. MiMo V2.5 Pro 22.8
主力第一同样是 K3@Cursor 87.5。契合分最高的是 K3@方舟 Agent Plan 4.69，最低 MiMo V2.5 Pro 2.81。

比总分更有信息量的是分项第一。事后审计侧：平均质量分第一是 DeepSeek V4.1 Flash 8.2，高于 K3@Cursor 的 6.9；覆盖率第一是 Gemini 3.8 Flash 19%；准确率第一是 GLM-5.3-Flash 94%；独有发现占比第一是 Muse Spark 1.3 Contributor 68%——它抓的 BUG 里近七成别人没找到；效率分第一也是它，2.47；平均每次耗时最短也是它，1.9 分钟；每条成立花费最低还是它，$0.01。输出速度第一是 DeepSeek V4.1 Flash，90.6 token/秒。每条成立 token 最省的是 Muse Spark 251.6 千枚，最费的是 Gemini 3.8 Flash 2,637.4 千枚。每次最贵的是 Grok 4.6 Extra High $1.17，本周合计 $48.96，折合每条成立缺陷 $0.62（成立 79 条）。

设计分叉侧：质量分第一 Fable 5.1 29.0；覆盖第一 K3@Cursor 31%；准确率并列 100% 的有 Fable 5.1、DeepSeek V4.1 Flash 和 Muse Spark（※ 样本少）；独有占比第一 K3@Cursor 84%；效率分第一 Fable 5.1 10.72；成立密度第一 Fable 5.1，每次 3.67 条。每次最省的是 Muse Spark 和 GLM-5.3-Flash，接近零；最贵 Fable 5.1 每次 $0.60，折合每条成立 $0.17。每条成立 token 最省是 K3@方舟 Agent Plan 4.9 千枚，最费是 Grok 4.6 Extra High 102.5 千枚。

口径与坦白：失败与未经判定的场次不进对照，但花费照计（本周失败 23 行、未评 16 行）；订阅制模型金额未采集，不记 0，对应轴按中位 50 计；总分是类型内归一后的相对排名，跨周不直接可比；※ 表示样本不足、结论打折。两个场景里 Muse Spark 的部分分项样本都偏小，参考价值有限。

一句话总结：综合看 K3@Cursor 两边都领先，但按单条成本、速度和独有发现算，Muse Spark 是最省的审计员；设计题上 Fable 5.1 的质量和契合度很突出。你最看重哪个分项？#LLM #AI #Benchmark #MultiModel
