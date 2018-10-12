---
layout: single
title: "Testing SML"
description: "Tips on how to test SML code for beginners"
category: articles
tags: [sml-testing, smlunit, sml, coursera, tdd, test, testing, programming languages]
---

I'm currently taking a course on Programming Languages, by Dan Grossman, which you can find for free [here](https://class.coursera.org/proglang-002/class).

The assignments use [Standard ML of New Jersey](http://www.smlnj.org/), which I had no previous experience with. The first thing in my mind was how to test the code, so I would feel confortable trying different things while solving the problems.

Some people in the course are using [SMLUnit](https://github.com/dellsystem/smlunit) (which requires python), but there is information on how to set it up without python [in this blog post by Jeanne Boyarsky](http://www.selikoff.net/2013/10/05/smlunit-without-python/), a course student.

I chose to use [sml-testing](https://github.com/kvalle/sml-testing) instead. So here is my setup:

First create and change into a working folder:

{% highlight sh %}
$ cd ~/development
$ mkdir -p coursera
$ cd coursera
{% endhighlight %}

Clone the sml-testing repo and cd into it:

{% highlight sh %}
$ git clone git@github.com:kvalle/sml-testing.git sml
$ cd sml
{% endhighlight %}

I chose to put my homework inside this same folder, since I still don't know how to organize code in ML. So I created a test file like this:

{% highlight sml %}
use "testing.sml";
open SmlTests;

use "hw1.sml";

test("is_older: true if first year is older",
  assert_true(is_older((2000, 0, 0), (2010, 0, 0))));

run();
{% endhighlight %}

And of course a file hw1.sml with my solutions.

Also, I wrote this shell script (run-tests.sh), which gives a green message for passing tests, a red list of failing tests or the whole output if there is a different error (like compilation):

{% highlight sh %}
#!/usr/bin/env bash

file="$1"

bldred=${txtbld}$(tput setaf 1) #  red
bldgre=${txtbld}$(tput setaf 2) #  green
txtrst=$(tput sgr0)             # Reset

output=$(sml < "$file")

if [[ "$output" == *"TESTS PASSED"* ]]; then
  echo $bldgre
  echo "ALL TESTS PASSED"
else
  if [[ "$output" == *"FAILED:"* ]]; then
    echo $bldred
    echo "$output" | sed -n '/FAILED:/,$p'
  else
    echo "$output"
  fi
fi
echo $txtrst
{% endhighlight %}

Which you can run like this (after `chmod +x run-tests.sh`):

{% highlight sh %}
./run-tests.sh hw1-test.sml
{% endhighlight %}

Of with fswatch on osx (`brew install fswatch`):

{% highlight sh %}
fswatch . "./run-tests.sh hw1-test.sml"
{% endhighlight %}

Which will run all tests for you whenever you make changes to a file in the current folder.

And that's it. Happy functional programming!
