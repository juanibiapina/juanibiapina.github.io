---
layout: single
title: "Migrating to GitLab Cloud"
description: "Why we moved from GitHub to GitLab Cloud"
category: articles
tags: [github, gitlab, cloud, hosting, github alternative, free git hosting, redmine]
---

In my current project we have recently reached the 10 private repositories limit on GitHub. What now?

One possible solution is to upgrade our business account to Silver, which gives us 20 repositories, but it costs $50 a month.

So we started looking for alternatives and found [GitLab Cloud](http://www.gitlab.com/cloud/).

GitLab Cloud provides you with unlimited private repos for free. Yes it does. Here is why:

> We offer GitLab Cloud for free to widen the audience for GitLab. Many organizations that end up running GitLab on-premise started with GitLab Cloud. But many organizations never switch and keep using GitLab Cloud because it is a great service and this is fine with us. The income we generate with subscriptions for on-premise installations is sufficient to cover the costs of GitLab Cloud and our work on the GitLab Community Edition. In the future we might expand our Cloud offerings based on customer demand. We will likely add paid extra's for costly services such as phone support. But we plan to continue to offer the core service for free.

We are still using GitHub for our most important repos, but we've moved all others to GitLab. The migration was painless and the interface seems very neat.

This migration makes sense to us because we mostly only need the hosting service. We host our own instance of [Redmine](http://www.redmine.org/) (with our private fork), so we don't need GitHub issues. We also don't use pull requests and hardly any of the other more advanced features.

We'll still need to use GitLab a little longer to see if there is anything we miss from GitHub. But until that happens, we're happy.
