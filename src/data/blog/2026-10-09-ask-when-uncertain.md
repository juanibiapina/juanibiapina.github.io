---
title: "Ask When Uncertain"
description: "Why I doubt \"ask when uncertain\" works in AI prompts."
pubDatetime: 2026-10-09T12:15:04Z
ogImage: "../../assets/blog/ask-when-uncertain/hero.jpg"
tags:
  - ai
  - blog
---

"Ask when uncertain". I've seen that in AI prompts.

I doubt that works. Of course one would have to measure to know if it works, but measure what? We could measure if it asked more questions. We could also use a set of benchmarks where we expect it to stop at an exact place.

But I wouldn't expect two different humans to act on uncertainty the same way, why would I expect two different models to act on uncertainty the same way? It just seems unreliable – too dependent on training.

How about instead we try to be precise in specifying outputs?

- Explore three different options and weigh pros and cons in terms of \<actual list of criteria\>

That way we control the output. I expect three options. I expect pros and cons for each item in the list of criteria.

## Interesting Articles

Su, J., & Cardie, C. (2026). *Knowing but not showing: LLMs recognize ambiguity but rarely ask clarifying questions* [Preprint]. arXiv. <https://doi.org/10.48550/arXiv.2605.25284>

> We find a clear gap between recognition and behavior: models often identify ambiguity when explicitly asked to judge it, yet in the QA setting they overwhelmingly default to direct answers.

Wang, W., Juluan, S., Ling, Z., Chan, Y.-K., Wang, C., Lee, C., Yuan, Y., Huang, J.-t., Jiao, W., & Lyu, M. R. (2025). Learning to ask: When LLM agents meet unclear instruction. In C. Christodoulopoulos, T. Chakraborty, C. Rose, & V. Peng (Eds.), *Proceedings of the 2025 Conference on Empirical Methods in Natural Language Processing* (pp. 21773–21784). Association for Computational Linguistics. <https://doi.org/10.18653/v1/2025.emnlp-main.1104>

> We find that due to the next-token prediction training objective, LLM agents tend to arbitrarily generate the missed argument, which may lead to hallucinations and risks.

Xiong, M., Hu, Z., Lu, X., Li, Y., Fu, J., He, J., & Hooi, B. (2024). Can LLMs express their uncertainty? An empirical evaluation of confidence elicitation in LLMs. In *The Twelfth International Conference on Learning Representations*. <https://proceedings.iclr.cc/paper_files/paper/2024/hash/6733cf15e10e2cd1d59af033c3bb8507-Abstract-Conference.html>

> LLMs, when verbalizing their confidence, tend to be overconfident, potentially imitating human patterns of expressing confidence.

Yang, D., Tsai, Y.-H. H., & Yamada, M. (2024). *On verbalized confidence scores for LLMs* [Preprint]. arXiv. <https://doi.org/10.48550/arXiv.2412.14737>

> Our results reveal that the reliability of these scores strongly depends on how the model is asked, but also that it is possible to extract well-calibrated confidence scores with certain prompt methods.

Zhang, M. J. Q., Knox, W. B., & Choi, E. (2025). Modeling future conversation turns to teach LLMs to ask clarifying questions. In *The Thirteenth International Conference on Learning Representations*. <https://proceedings.iclr.cc/paper_files/paper/2025/hash/97e2df4bb8b2f1913657344a693166a2-Abstract-Conference.html>

> Existing LLMs often respond by presupposing a single interpretation of such ambiguous requests, frustrating users who intended a different interpretation.
