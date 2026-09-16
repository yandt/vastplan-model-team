<!-- 生成：K3（k3-pi）· 2026-09-16 20:44:58+08:00 · 耗时 126s · $0.1112（估价） · 窗口 2026-09-14 → 2026-09-21 -->
<!-- 配图：1-ranking.png, 2-audit-quality.png, 3-audit-cost.png, 4-design.png -->
<!-- 直接发布下面正文；改口吻改 scripts/post_prompt.md -->

这是第 38 周的模型团队周报（窗口 2026-09-14 → 09-21，本周仍在进行中）。背景：我在维护一个叫 VastPlan 的项目，一套自研的 Node/TypeScript 插件运行时与 Portal 内核，是真实工程，不是题库，也不是合成任务。项目里有两类常态化的多模型协作，每场都记账，这周把账摊开。

两类测试分别是什么：

① 事后审计：功能代码完成后，多个模型并行审同一份改动，找 BUG、提优化点。每条意见我逐条对照代码判定成立还是不成立，成立的按 1~5 记重要性。
② 设计分叉：遇到有分叉的设计题，各模型各自给方案，等项目里真实选定方向之后，再回算每个方案与最终选择的契合度。

本周样本：事后审计 27 场，已评 213 行，成立 351 条，其中独有 113 条、假阳性 132 条，重要性 5/4/3/2/1 = 39/92/145/63/12；已评花费 $90.31，平均每次 7.7 分钟，token 411.9M，缓存命中 93%。设计分叉 19 场，已评 139 行，成立 288 条，重要性 5/4/3/2/1 = 131/96/58/3/0；花费 $9.16，平均每次 2.1 分钟，token 9.1M，缓存命中 65%。

综合评分权重是效果 35% + 覆盖 30% + 独立 10% + 时间 10% + 花费 5% + token 10%，同活动类型内归一后的相对排名，不是绝对分。

事后审计总分：
1. DeepSeek V4.1 Flash（max） 83.7
2. DeepSeek V4.1 Flash（high） 82.5
3. Muse Spark 1.3 Contributor 79.2
4. GLM-5.3 68.1
5. K3 方舟 Agent Plan 66.4
6. GLM-5.3-Flash 63.1
7. Grok 4.6 Extra High 61.6
8. DeepSeek V4 Flash 59.9
9. MiMo V2.5 Pro 29.7
10. Gemini 3.8 Flash※ 18.3

设计分叉总分：
1. K3 方舟 Agent Plan 91.5
2. Gemini 3.8 Flash※ 73.9
3. Grok 4.6 Extra High 69.8
4. Muse Spark 1.3 Contributor 65.2
5. DeepSeek V4.1 Flash（max） 61.5
6. GLM-5.3 58.3
7. GLM-5.3-Flash 52.4
8. DeepSeek V4 Flash 51.7
9. MiMo V2.5 Pro 43.4
10. DeepSeek V4.1 Flash（high）※ 24.9

比总分更有信息量的是分项第一。事后审计：平均质量分第一 DeepSeek V4.1 Flash（max）7.5，末位 MiMo V2.5 Pro -0.5；重要性加权覆盖第一也是它，35%；独有占比第一 DeepSeek V4.1 Flash（high）51%；准确率第一 GLM-5.3-Flash 85%，末位 MiMo 39%；成立密度第一 DeepSeek V4.1 Flash（high），每次 2.22 条；生成速度第一 Gemini 3.8 Flash，每秒 99.0 token，末位 K3 24.1。

设计分叉：平均质量分第一 Grok 4.6 Extra High 23.8，K3 以 23.7 紧随其后；覆盖第一 Gemini 3.8 Flash 47%；独有占比第一 K3 56%；准确率第一 Gemini 100%；成立密度 Grok 与 K3 并列第一，每次 3.06 条。契合分最高 Gemini 4.67，最低 DeepSeek V4.1 Flash（high）3.00——它的准确率和成立密度都是 0，但只跑了不到 5 场，不能定性。Gemini 的两个第一同样样本不足，先记着。

性价比值得单独说。事后审计最省的是 Muse Spark 1.3 Contributor：每次 $0.01，折合每条成立缺陷也是 $0.01；每条成立花费末位是 Gemini 3.8 Flash，$1.87，每条成立 token 也最高，11,881.5 千枚。每次最贵是 Grok 4.6 Extra High，$1.36，本期合计 $33.89，折合每条成立 $0.89（成立 38 条）。设计分叉每条成立花费第一梯队 Muse Spark、GLM-5.3-Flash、MiMo V2.5 Pro 都是 $0.00，最贵是 Grok，每次 $0.35、每条 $0.11。

口径与坦白：失败 5 行和未评 16 行（2 个场次，补评后才算完成）不进对照，但花费照计；订阅制模型的金额未采集，不记 0，所以便宜不等于免费；总分是同活动类型内归一后的相对排名，跨活动不可比；※ 表示样本不足 5 场，结论打折。

一句话总结：审计找茬 DeepSeek V4.1 Flash 两档领跑，设计方案 K3 最契合最终选择，省钱找 Muse Spark。周级样本，参考即可。你在工程里怎么做多模型互审？欢迎交流。#LLM #AI #Benchmark #MultiModel
