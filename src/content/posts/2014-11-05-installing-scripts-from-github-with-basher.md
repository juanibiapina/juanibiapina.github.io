---
title: "Installing shell scripts from Github with Basher"
description: "How to install bash packages by running a one liner."
pubDate: 2014-11-05
---

### The problem

On my [previous post about Basher](/posts/2014-08-20-basher-a-package-manager-for-shell-scripts/) I mentioned that one of its goals was to be able to install scripts directly from github with minimal manual intervention. During the last month, I had to make some changes to get closer to that goal.

The `package.sh` file contains package information like binaries, completions, dependencies etc. The problem with having a package descriptor is that I need to fork every repo I want to install and add the file (maybe pull request a change for the maintainer to add the file). There is nothing wrong with this apprach, and it is in fact what [bpkg](https://github.com/bpkg/bpkg) does. This is partly what allows them to have custom install scripts per package.

On the other hand, what I really wanted was to see a package on github, run a one liner and keep working.

Besides, sourcing the package.sh file was a silly security problem. In addition, I never felt really confortable with having two different formats for packages (basher and bpkg). The discussion evolved but not fast enough for me.

So I got rid of it.

### Conventions to the rescue

Now, basher looks for a `bin` folder and links any files in there. If there is no `bin` folder, it links all executable files in the package root.

With this change, I've been very happy installing packages with one liners.

### Working packages

1. **sstephenson/bats** Bash Automated Testing System
2. **pote/gpm** Go package manager
3. **pote/gvp** Go versioning packager
4. **treyhunner/tmuxstart** named tmux sessions
5. **zsh-users/antigen** plugin manager for zsh
6. **bripkens/dock** easy bootstrapper using docker

### Kind of working packages

1. **holman/spark** it also links an extra `test` executable
2. **hecticjeff/shoreman** binary ends with '.sh'

### Future work

I want to automatically remove the '.sh' from binaries. Also figure out how to install completions for packages.