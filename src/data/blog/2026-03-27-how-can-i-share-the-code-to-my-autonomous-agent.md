---
title: "How can I share the code to my autonomous agent?"
description: "It's all just prompts."
pubDatetime: 2026-03-27T00:00:00Z
tags:
  - ai
  - agents
---

How can I share the code for my autonomous agent if I cannot recommend people to use it? In fact, I say do not use [OpenClaw](https://github.com/openclaw/openclaw), do not use [ZeroClaw](https://zeroclaw.net/), do not use any agent framework. And to be clear, I'm talking to my audience, which is often software developers with access to coding agents.

The reason is that almost every product that has come out in the last few months is [just prompting](https://medium.com/@alexanderhuseby/most-ai-startups-are-just-prompt-wrappers-5ce52eaf26ef). In fact, most products for the last few years have just been [different ways to prompt](https://dev.to/dev_tips/the-graveyard-of-ai-startups-startups-that-forgot-to-build-real-value-5ad9). A few haven't, but most of them have. So for example, if you hear about OpenClaw and you learn that it memorizes things about you and it learns as you go, all you need to do is [prompt your agent with that](https://medium.com/@NMitchem/ai-agents-dont-need-your-developer-tools-7f6adebb479c). You tell it, you should from now on memorize facts about me and learn as you go. There you go, you've [replicated the entire framework](https://dev.to/taskconcierge/stop-building-ai-agents-build-ai-tools-instead-51aj).

This is a problem for me because on one hand, I'm a publisher of software. I want to publish software. Worst case, I want to publish prompts, but [there's nothing to publish](https://dennisstanoev.com/building-an-ai-agent-from-scratch-without-frameworks/). For my audience specifically, I don't want to say, hey, here's my agent framework. It's one more framework among a hundred.

The code for my agent has hard-coded stuff. It's very specific to how I do things. Its memory is not just a general store that it reads and writes to. It's actually [connected to my notes](https://medium.com/@danbork/my-ais-memory-lives-in-obsidian-and-i-can-see-every-bit-of-it-cdcad1113887) in a way that it [understands how I think](https://daveswift.com/openclaw-obsidian-memory/). I continue to edit these notes manually, which is part of the workflow.

A big part of this is that [software is now customizable per person](https://medium.com/@eren.m.nevin/personalized-software-when-ai-turns-users-into-co-developers-d76cc60d6a04). The reason there are so many different agent frameworks is that everybody can build their own and they're slightly different. It's [easier to build your own](https://www.reddit.com/r/AI_Agents/comments/1msm2mw/id_rather_build_my_own_ai_tools_than_pay_for/) than to customize someone else's. It's easier to build your own from scratch than to take a [generic framework](https://rmeerasahib.substack.com/p/personalized-software-is-coming-the) and use it.

That said, the [pi coding agent](https://pi.dev) is amazing. Pi is the vim of coding agents.
