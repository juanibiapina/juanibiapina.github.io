---
layout: single
title: "Automating Vagrant 1.2.3 with Rake"
description: "How to automate small repetitive vagrant tasks."
category: articles
tags: [automation, automate, vagrant, rake, rbenv]
---

For my current project, I need to run a script after creating a VM. Of course I could package the new VM with the modifications already done, but by running the scripts every time I make sure I'm constantly testing them.

To do that, I'm using rake. Vagrant used to [integrate with rake pretty easily](http://docs-v1.vagrantup.com/v1/docs/rake.html), but that doesn't work with newer versions of vagrant since it is not distributed as gem anymore. What now?

In my opinion it gets simpler. All you need to do is run vagrant commands using `sh`, like this:

{% highlight ruby %}
desc "Bootstraps a VM"
task :bootstrap do
  sh "vagrant destroy -f"
  sh "vagrant up --no-provision"
  sh "vagrant ssh -c 'echo something-cool'"
  sh "vagrant provision"
end
{% endhighlight %}

As you can see, I destroy the VM, bring it up again without provisioning, run my scripts and only then run the provisioner.

A catch: don't use backticks in this case, because you'll need other tricks to get the command output on the fly (thanks [Fábio Rehm](http://fabiorehm.com/) for the tip).

Another catch: If you are running rbenv and happen to have vagrant installed as a gem for the current ruby, rake won't see the proper vagrant executable. To test it, try this:

{% highlight ruby %}
task :which_vagrant do
  puts `which vagrant`
end
{% endhighlight %}

It should print "/usr/bin/vagrant", meaning the system wide vagrant. If there is a conflict, it will print the shim version of vagrant.
