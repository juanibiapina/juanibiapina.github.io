---
layout: single
title: "Postgres command line"
description: "A small collection of scripts I wrote because I dislike postgres CLI."
category: articles
tags: [bash, postgres, basher, cli, pg, createdb, database]
---

I find the postgres command line tools slightly annoying to use, so I wrote [pg](https://github.com/juanibiapina/pg).

With it, I can run commands in a more natural way. For instance:

{% highlight sh %}
$ pg list
{% endhighlight %}

List databases (same as psql -l), or with --short, prints only their names.

{% highlight sh %}
$ pg drop db_name
{% endhighlight %}

Drops a database. The only difference between this and `dropdb` is that it always uses `--if-exists`.

Or more interesting things:

{% highlight sh %}
$ pg mv origin target
{% endhighlight %}

Rename a database after killing all connections to `origin`.

{% highlight sh %}
$ pg copy origin target
{% endhighlight %}

Creates a "copy" of a database after killing all connections to `origin`. I use this to create fast snapshots that I can go back to later, much like version control.

These are very simple wrappers around `createdb`, `psql` etc, but since I was starting to repeat myself a lot, I decided it was worth it.

You can find the code on [github](https://github.com/juanibiapina/pg), along with tests, yes.
