---
title: "A Package Manager For Shell Scripts"
description: "Introducing basher."
pubDate: 2014-08-20
---

In this post I'll introduce [basher](https://github.com/basherpm/basher), a package manager for shell scripts.

## Motivation

I do some development using bash. Not a [web server](https://github.com/avleen/bashttpd), or a [json parser](https://github.com/dominictarr/JSON.sh), because that's not the point of bash (although fun!), but there are many tasks that are actually faster to do in bash.

When you write a bash script, it is usually a single file. All you have to do is put it somewhere in your PATH and you're done. You can just keep using it and forget about it. Unless you have multiple machines.

For me, the main problem with this approach is the lack of version control. I tend to get lost easily during development if I don't have the checkpoints a VCS provides. I need to be able to go back and forth in time and experiment. With the script in a version controlled directory, I only need to link the bin somewhere in the PATH. I can also publish to github.

It is very difficult to write bash scripts and get it right the first time. You might forget a space before a `]`, or you might put an extra space after an `=`. Or you might forget some quotes. The solution I found to this problem is TDD, of course. There is a testing framework for bash called [bats](https://github.com/sstephenson/bats), and it makes testing bash scripts as easy as it gets.

On the other hand, now you have to install a third party bash script (bats itself is written in bash). It's not just a single file you can copy, but the creators of bats are cool enough to provide a simple, reliable and well made install.sh script that copies the binaries to the right place. Still, you have to clone the project and find out how to install it. Remember you might need sudo.

Bats is also on brew, so that's simpler if you're on osx. There is probably something packaged for linux too, but which distros? Older install instructions for bats told you to clone the repo to `~/.bats` and add its `bin` directory to your path. That's how I had to do for a while. In the end, that was the most reliable approach that I could reproduce among all my machines.

I want to publish a couple of bash scripts myself, but I don't really want to maintain installation instructions for osx and a bunch of linux distros. I want to think of a bash script as a package for bash, just like ruby has gems.

I also want to go to github, find a script I like, install it with one line and use it. If one of my machines doesn't have that script, all I need to do is run that one line and get it. No messing with my PATH either.

## Basher

So I wrote [basher](https://github.com/basherpm/basher). With it installed, you can do this:

```sh
$ basher install basherpm/bats
```

There, `bats` is in your PATH ready to be used. Whatever OS.

The install command looks for a repository on github, clones it to a known location and links the binaries to a place in your PATH.

I can also list installed packages easily:

```sh
$ basher list
```

And uninstall (with completion support):

```sh
$ basher uninstall basherpm/bats
```

Or check for outdated packages:

```sh
$ basher outdated
```

Check the `commands` command for a full list. Try also `basher help <command>`.

## Shell support

Basher needs to be available in your PATH, of course, but it also needs to add one entry to the PATH, where all binaries will be linked. It does this by hooking into the shell, similarly to what [rbenv](https://github.com/sstephenson/rbenv) does. The biggest difference is that [rbenv](https://github.com/sstephenson/rbenv) modifies the PATH on the fly, according to what ruby version should be used. Basher is simpler, because it needs only one location added to the PATH.

If you try running `basher init -`, you'll see what gets added to the shell. This code is generated on the fly, according to what shell you use. It supports bash, zsh (might support any POSIX compliant) and even fish (thanks to [João Vortmann](https://github.com/jvortmann)).

## Packages

Basher packages are simply github repos that have a `package.sh` file. This file defines what binaries need to be linked when installing and any package dependencies.

There is also experimental support for package runtimes. It allows you to `require juanibiapina/gg` (given this package is installed) in order to make some functions available to your shell. This might change in the future, but I find it very promissing.

## Why not bpkg ?

I was using basher for a while, but did not plan on releasing it, when [bpkg](http://www.bpkg.io/) came out. At that point basher was very simple, and bpkg seemed to offer much more. I tried using it, but decided to go back and release basher instead.

Bpkg uses a `package.json` file to define packages. I assumed it was the same format as npm packages, so I got really confused when I checked the documentation for `package.json` and found out bpkg implements it incorrectly. It turns out, it is a different format, just with the same name. There is some unfinished discussion going on on [this issue](https://github.com/bpkg/bpkg/issues/17). Overall, I find the choice of name and format confusing.

Bpkg also doesn't keep the package repos on your local machine. Instead, it clones the repo, installs the binaries then removes the repo. I wanted to have local copies of each repo.

Bpkg uses whatever install script is provided by the package. This allows a package to install itself however it wants, including man pages or whatever is needed. On the other hand, it makes it difficult for me to track what has been installed and where. I don't like installs without the corresponding uninstall, so basher does not provide support for custom install scripts. It would be interesting to add mechanisms for installing man pages, completions etc. That way, any package with a properly defined package.sh would be automatically installable and uninstallable.

Instead, basher keeps everything under `~/.basher`. You can remove this directory and get rid of everything easily.

Bpkg has support for github releases. You can choose to install a specific version. It also has support for local or global installs, like npm. Basher lacks these features, but they can be added if the need comes. Pull requests are welcome.

Basher is [thoroughly tested](https://travis-ci.org/basherpm/basher). I failed to make a pull request to bpkg because I lacked confidence.

## Conclusion

This has solved many of my shell scripting problems. I can have version controlled scripts automatically linked to the PATH without any changes, I can install scripts from github. It works the same way on my osx, ubuntu and debian (might work anywhere, just need to test). I have one central location where I install scripts. I can easily check for new versions of scripts without checking one by one. I can see the changelog for each script (since I have the full repo cloned locally).

It also helps me develop scripts. Check `basher new` or `basher new-command`.

There is still much that can be done. Pull requests and feedback are very welcome.