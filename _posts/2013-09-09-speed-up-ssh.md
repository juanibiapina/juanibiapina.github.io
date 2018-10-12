---
layout: single
title: "Speed up SSH"
description: "Simple trick to improve ssh connection time"
category: articles
tags: [speed, ssh, connection time, speed up, trick]
---

According to the [ssh_config(5)](http://manpages.ubuntu.com/manpages/precise/en/man5/ssh_config.5.html) man page, ssh can have the following options: ControlMaster, ControlPath and ControlPersist

So, to speed up the connection time, you can use something like this on your ~/.ssh/config

~~~
ControlMaster auto
ControlPath /tmp/%r@%h:%p
ControlPersist yes
~~~

According to [this page](http://interrobeng.com/2013/08/25/speed-up-git-5x-to-50x/), it is specially useful to speed up git.
