---
title: "Using GitButler to run custom open source software"
description: "Compiling a project yourself with several unmerged fixes applied at the same time."
pubDatetime: 2026-11-05T00:00:00Z
draft: false
tags:
  - blog
---

Use case for [GitButler](https://gitbutler.com): when you want to run a custom version of an open source project with several fixes. You may have open PRs for them, like I have with the [Herdr app](https://herdr.dev):

- [#67: feat: terminal line height is a setting](https://github.com/herdrdev/herdr-app/pull/67)
- [#596: feat: a setting turns off agent alert toasts](https://github.com/herdrdev/herdr-app/pull/596)

In the local workspace, both branches are **applied at the same time!**. GitButler calls these [parallel branches](https://docs.gitbutler.com/features/branch-management/virtual-branches). This is what [`but status`](https://docs.gitbutler.com/cli-overview) shows in my local checkout:

```ansi
$ but status
╭┄ [1;34m@[0m [[36muncommitted[0m] [2m(no changes)[0m
┊
┊╭┄ [1;34mal[0m [[32malert-toasts-setting[0m] CI: ✅ #[1m596[0m: feat: a setting turns off agent alert toasts 
┊[32m●[0m   [35mvxmw[0m[2m[0m feat: a setting turns off agent alert toasts
├╯
┊
┊╭┄ [1;34mte[0m [[32mterminal-line-height[0m] CI: ✅ #[1m67[0m: feat: terminal line height is a setting 
┊[32m◐[0m   [35mzktv[0m[2m[0m feat: terminal line height is a setting
├╯
┊
┊[32m●[0m [2m903dc81[0m (upstream: origin/master) 2 new commits [2m(checked 38 seconds ago)[0m
├╯ [2me77f112[0m (common base, master) [2m2026-11-04[0m fix: let worktree operations wait for large repositories

[2mHint: ◐ means rewritten locally vs upstream.[0m
[2mHint: commits are listed newest first. The first token on each line is the ID to use in commands.[0m
[2mHint: origin/master moved ahead; run `but pull` to update the workspace[0m
```

`alert-toasts-setting` and `terminal-line-height` are separate branches, applied at the same time. GitButler takes care of everything, including [rebasing all branches automatically](https://docs.gitbutler.com/features/branch-management/upstream-integration) when you advance the base branch. The diff for each branch is ready for a PR. When maintainers request fixes, they just go on the correct branch, no issues. [Agents love it](https://vcbench.dev/)! As a bonus you see PRs too.

With only Git, local `master` would end up with both fixes, and you'd rebase it every time `origin/master` moves. I can't even tell where my fixes are here:

```ansi
$ git log --graph --oneline --decorate -6 master origin/master
* [33mc092833[0m[33m ([0m[1;36mHEAD[0m[33m -> [0m[1;32mmaster[0m[33m)[0m feat: a setting turns off agent alert toasts
* [33m78bc337[0m feat: terminal line height is a setting
* [33m903dc81[0m[33m ([0m[1;31morigin/master[0m[33m)[0m fix: preserve xim input context across focus changes
* [33m4cf5b50[0m fix: read one xim message per property so fcitx4 replies are no longer lost on linux (#558)
* [33me77f112[0m fix: let worktree operations wait for large repositories
* [33m1926540[0m fix: centre sidebar rail items on one line (#453)
```

If you merge instead, you get a merge commit for each branch, which at least shows the branch name, plus another every time `origin/master` moves.

```ansi
$ git log --graph --oneline --decorate -9 master origin/master
*   [33m0c7bc59[0m[33m ([0m[1;36mHEAD[0m[33m -> [0m[1;32mmaster[0m[33m)[0m Merge remote-tracking branch 'origin/master'
[31m|[0m[32m\[0m  
[31m|[0m * [33m903dc81[0m[33m ([0m[1;31morigin/master[0m[33m)[0m fix: preserve xim input context across focus changes
[31m|[0m * [33m4cf5b50[0m fix: read one xim message per property so fcitx4 replies are no longer lost on linux (#558)
* [32m|[0m   [33m0837190[0m Merge branch 'alert-toasts-setting'
[33m|[0m[34m\[0m [32m\[0m  
[33m|[0m * [32m|[0m [33m312fe4a[0m[33m ([0m[1;32malert-toasts-setting[0m[33m)[0m feat: a setting turns off agent alert toasts
[33m|[0m [32m|[0m[32m/[0m  
* [32m/[0m [33m9cb1abf[0m[33m ([0m[1;32mterminal-line-height[0m[33m)[0m feat: terminal line height is a setting
[32m|[0m[32m/[0m  
* [33me77f112[0m fix: let worktree operations wait for large repositories
* [33m1926540[0m fix: centre sidebar rail items on one line (#453)
* [33me4906d2[0m fix: changes list fills the panel and scrolls through every changed file (#474)
```

With Git, you could also rebase your fixes with `origin/master`, then apply one by one. Or you could keep them in the same branch, but that makes it annoying to open PRs. There are options, but none of them are great.

I do the same with GitButler itself, since I work there (disclaimer). My local checkout of the [GitButler repository](https://github.com/gitbutlerapp/gitbutler) runs with all of these branches applied. You can also see some [stacks](https://docs.gitbutler.com/features/branch-management/stacked-branches)!.

```ansi
$ but status
╭┄ [1;34m@[0m [[36muncommitted[0m] [2m(no changes)[0m
┊
┊╭┄ [1;34mgp[0m [[32mgpui-folder-stops[0m]
┊●   [35msoqm[0m[2m[0m Let the GPUI file list's keys stop on folders
├╯
┊
┊╭┄ [1;34mpu[0m [[32mgpui-hide-adjacent-hunk-boxes[0m]
┊●   [35mmump[0m[2m[0m Hide the hunk box where no lines are left out above it
├╯
┊
┊╭┄ [1;34mui[0m [[32mgpui-file-tree-indent[0m]
┊●   [35mlrsr[0m[2m[0m Indent a file tree's files a step past their folder
├╯
┊
┊╭┄ [1;34mfi[0m [[32mfilters-headsup-edit-mode[0m]
┊●   [35myuzy[0m[2m[0m Say filters are skipped only while editing or resolving a commit
├╯
┊
┊╭┄ [1;34mje[0m [[32mgpui-jev-guidance[0m]
┊●   [35muuko[0m[2m[0m Show Jev's review guidance in the GPUI diff
├╯
┊
┊╭┄ [1;34mul[0m [[32mpull-keeps-merged-target-history[0m]
┊●   [35msukp[0m[2m[0m Keep a branch's published history when it merged the target
├╯
┊
┊╭┄ [1;34mch[0m [[32mcheckout-guard-concurrent-changes[0m]
┊●   [35muxtx[0m[2m[0m Guard against changes made while checkout checks the worktree
┊│
┊├┄ [1;34mhe[0m [[32mcheckout-undo-failures[0m]
┊●   [35mzvor[0m[2m[0m Undo a checkout that fails partway
┊│
┊├┄ [1;34mck[0m [[32mcheckout-filters-before-worktree[0m] CI: ✅ #[1m17004[0m: Run the worktree filters before touching the worktree 
┊[32m●[0m   [35mnztk[0m[2m[0m Run the worktree filters before touching the worktree
├╯
┊
┊╭┄ [1;34mgr:@[0m [[36muncommitted[0m] {[36mgpui-grow-context[0m} [2m(no changes)[0m
┊├┄ [1;34mgr[0m [[32mgpui-grow-context[0m]
┊●   [35mmrqu[0m[2m[0m feat(gpui): z grows a hunk's context one scope level, as in deltoids
├╯
┊
┊[32m●[0m [2m4724d2e8d6[0m (upstream: origin/master) 2 new commits [2m(checked 9 seconds ago)[0m
├╯ [2m812107d6d7[0m (common base, master) [2m2026-11-05[0m Merge pull request #17003 from gitbutlerapp/david/gb-2219-resolve-cutting

[2mHint: commits are listed newest first. The first token on each line is the ID to use in commands.[0m
[2mHint: origin/master moved ahead; run `but pull` to update the workspace[0m
[2mHint: gpui-grow-context is behind origin/master; run `but pull` to update it[0m
```
