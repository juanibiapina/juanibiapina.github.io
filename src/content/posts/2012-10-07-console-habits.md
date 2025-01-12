---
title: "Console Habits"
description: "How to check your console habits and discover how to be more efficient on the command line."
pubDate: 2012-10-07
---

Some time ago, my friend Duck wrote a very small shell script to check our console habits. Here is my current version, after some modifications. It uses `history` from zsh, so you might need to change it if you're using bash (with contributions from Bruno Maioli and Serge Gebhardt):

```bash
alias habits='\history -500 -1 | sed "s/^[[:space:]]*[0-9]*[[:space:]]*//" | sort | uniq -c | sort -n -r | head -n 10'
```

This allows me to check what sorts of commands I usually type. I use this idea to find ways to make my programming environment more efficient. This is my current habits output:

```
     174 g s
      37 g a .
      21 g push
      21 g c
      14 guard
      14 g push heroku master
      11 r s
      11 g d
       9 vim
       6 g a -u .
```

`g` is just an alias for git, and most git commands I use are also aliased on my global config. `r s` (rails server), `guard` and `vim` are called automatically by tmuxinator when I want to switch projects.

Every time I check this output I learn something new about my habits. This time, I'm observing how much git is an integral part of my workflow, and how much time I spend checking statuses and diffs. It hints me to the need of some sort of visual representation of my working tree, but I still don't know what to do about that.

What I may want to do for the next alias version is to filter out git commands. They will be there anyway, so I might as well consider them 'pretty optimised' and move on to the next set. I suspect a bunch of rake related stuff will come up.
