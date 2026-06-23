---
title: "A Beautiful Machine to Watch"
description: "Building Deltoids with an AI agent: vibe-slop, edge cases, legacy code, and the algorithm I had to feel my way toward. The tools changed; the feeling didn't."
pubDatetime: 2026-06-23T00:00:00Z
ogImage: "../../assets/blog/developing-deltoids/hero.jpg"
tags:
  - ai
  - blog
---

When developing [deltoids](https://deltoids.dev), I started with a problem I needed to solve. I wanted to see more context when reviewing code, and I wanted that context to be smart. Code is structured, but diffs only show a couple of lines before and after the change. I asked my AI agent to implement it, and the initial version was not well designed. You could call it vibe-slop, in the sense that I didn't properly review it.

As I used it, edge cases started to appear, and some were bad. Parts of the diff went missing. Some diffs got duplicated. Some showed up in the wrong order. All of these break the diff algorithm, and that's the last thing you want from a diff tool.

But here's a different way to look at it: Could I have sat down and developed an algorithm that solves this well? I don't think I could have. Before AI, I would have tried anyway. I would have spent a long time and probably written a basic version, maybe just as bad as the AI's, maybe a little better, who knows. But it would have taken a long, long time.

As the edge cases appeared, I wrote tests and fixed individual cases. The agent never redesigned a solution. Code quality goes down. The more this happens, the more other things break, until it gets really hard to add anything at all. This is not specific to agents. This is just how coding works.

Now this code is a legacy system, and I love legacy systems. They hold all the knowledge you need to build something great. You only have to read the code and figure out what algorithm would actually cover all the cases. You have to generalize it. And in the process of covering those edge cases, asking the agent to fix them, and reviewing the code, I developed a feeling for that algorithm. That's important to me: even working through an agent, I still get the feeling for the algorithm I am after.

Now I have tests, feedback, experience, and real usage data to check that the feeling is pointing in the right direction. I can feed all of that into an agent and design the algorithm together with it.

Is it going to be good enough? Probably good enough for all the cases we already have, and maybe better for future ones, since a generalization should hold up better for what's coming. Maybe new cases show up that it doesn't handle well. That is just how software works.

From my point of view, here's what happened: I imagined a diff tool that would give me better context and let me review code better. Then I built it with the tools I have. The tools I have now are better and faster than before. That's it.

What I love about programming is that I can take my imagination and make it tangible. Make it work. Make it move. Make it a machine that does things on its own. That's what software is to me, a machine that does things on its own, and it's beautiful to watch. I could always do that with code. Now I can do it a hundred times faster, and it's the same feeling.
