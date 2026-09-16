<!-- 生成：K3（k3-pi）· 2026-09-16 10:22:58+08:00 · 耗时 65s · $0.0751（估价） · 窗口 2026-09-14 → 2026-09-17 -->
<!-- 配图：1-ranking.png, 2-audit-quality.png, 3-audit-cost.png, 4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

《模型团队周报》2026 年第 38 周（进行中，窗口 09-14 → 09-17）。

先说背景：VastPlan 是我自研的 Node/TypeScript 插件运行时与 Portal 内核，这不是题库也不是合成任务，所有数据都来自这个真实工程的日常开发。我把多家模型编成一支团队，跑两类活动，逐条记账。

两类测试分别是什么：

① 事后审计：功能代码完成后，多模型并行找 BUG、提优化点。我逐条对照真实代码判定成立或不成立，并按 1～5 记重要性。它考的是代码评审的真实产出。

② 设计分叉：遇到有多个合理方向的设计题，各模型各自给方案，等项目里真实选完方向之后，再回算每个模型方向的契合度。它考的是判断力，不是手速。

本期规模：事后审计 22 场，已评 172 行，判定成立 314 条（其中独有 80 条、假阳性 84 条），已评行花费 $77.24，平均每次 7.6 分钟，token 共 320.0M、缓存命中 92%。设计分叉 17 场，已评 131 行，成立 280 条（独有 94、假阳 33），花费 $8.89，平均每次 2.2 分钟，token 8.8M、缓存命中 66%。

综合能力是相对排名：同活动类型内归一后，按 35% 效果 + 30% 覆盖 + 10% 独立 + 10% 时间 + 5% 花费 + 10% token 加权。

事后审计综合排名：
1. Muse Spark 1.3 Contributor 87.7
2. DeepSeek V4.1 Flash（high）※ 85.3
3. DeepSeek V4.1 Flash（max） 83.0
4. GLM-5.3 71.5
5. K3 方舟 Agent Plan 68.9
6. GLM-5.3-Flash 64.7
7. Grok 4.6 Extra High 60.9
8. DeepSeek V4 Flash 58.6
9. MiMo V2.5 Pro 31.5
10. Gemini 3.8 Flash※ 17.0
主力口径（≥5 场）第一同样是 Muse Spark 1.3 Contributor。

设计分叉综合排名：
1. K3 方舟 Agent Plan 90.3
2. Grok 4.6 Extra High 75.2
3. Muse Spark 1.3 Contributor 70.4
4. DeepSeek V4.1 Flash（max） 66.3
5. GLM-5.3 63.2
6. Gemini 3.8 Flash※ 60.2
7. GLM-5.3-Flash 56.9
8. DeepSeek V4 Flash 55.0
9. MiMo V2.5 Pro 44.6
10. DeepSeek V4.1 Flash（high）※ 24.9
主力第一：K3 方舟 Agent Plan。契合分最高是 Gemini 3.8 Flash 4.67，最低 DeepSeek V4.1 Flash（high） 3.00。

但比总分更有信息量的是分项第一。事后审计侧：平均质量分第一是 DeepSeek V4.1 Flash（max） 8.8；重要性加权覆盖第一是 DeepSeek V4.1 Flash（high） 17%；独有占比第一 Muse Spark 1.3 Contributor 33%；准确率第一 Grok 4.6 Extra High 88%；成立密度第一 DeepSeek V4.1 Flash（high）每次 2.75 条；速度第一 Gemini 3.8 Flash 每秒 99.0 token；最快出结果 Muse Spark 1.3 Contributor 平均 2.6 分钟。也就是说，总分第一的 Muse 并不是靠单项碾压，而是没有短板外加独有发现最多；DeepSeek 两档在质量和覆盖上更锋利，Grok 则是说得少但说得准。

设计分叉侧的分项：质量分第一 Grok 4.6 Extra High 23.8，覆盖第一 Grok 18%，独有占比第一 Grok 51%，成立密度也是 Grok 每次 3.06——高分、高覆盖、高独到，难怪它排第二；K3 赢在均衡和每条成立只用 5.6K token 的极低消耗。准确率第一 Gemini 3.8 Flash 100%（样本小，注意 ※）。速度第一 DeepSeek V4.1 Flash（max） 每秒 142.7 token，执行时间第一 DeepSeek V4.1 Flash（high） 0.5 分钟。

性价比值得单独说。事后审计每条成立缺陷的花费：Muse Spark 1.3 Contributor 约 $0.00 排第一，GLM-5.3-Flash $0.02 次之；最贵的是 Gemini 3.8 Flash $1.87。单次最贵是 Grok 4.6 Extra High $1.37，本期合计 $28.80，折合每条成立 $0.82（成立 35 条）——准是真准，贵也是真贵。设计分叉侧每次花费 Muse、GLM-5.3-Flash、MiMo 都约 $0.00，最贵 Grok $0.35，折合每条成立 $0.11（成立 49 条）。

口径与坦白：失败 3 行与未评 16 行（2 个场次，补评后才算完成）不进对照，但花费照计；订阅制模型金额未采集，不记 0；综合分是同活动类型内归一后的相对排名，不是绝对能力分；※ 表示样本 < 5 场，结论打折。

一句话总结：审计要省钱省心选 Muse，要挖得深选 DeepSeek，要判断方向选 K3 和 Grok。你团队里多模型是怎么分工的？欢迎交流。

#LLM #AI #Benchmark #MultiModel
