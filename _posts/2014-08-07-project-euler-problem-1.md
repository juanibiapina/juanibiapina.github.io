---
layout: single
title: "Project Euler - Problem 1"
description: "Solving the first problem in Project Euler using Marco"
category: articles
tags: [programming languages, development, marco, project euler, programming challenges]
---

In this post I'll show how to solve the first problem on Project Euler using Marco, while at the same time introducing some new features of the language.

Disclaimer: Although I'm about to provide one way to solve problem 1 (maybe problem 2 in the future), my intention is to demonstrate how to write a simple algorithm in Marco while at the same time trying to get you interested in programming challenges. If you think I'm about to spoil the first problem, try one of the following:

1. Solve it in your favorite language before reading this.
2. Read this solution, but try to solve it using infinite streams.
3. Try one of the other 475 problems.

## The problem

> If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
>
> Find the sum of all the multiples of 3 or 5 below 1000.

I'll try to break the code in terms of some features of Marco.

## Modules

Modules are the main blocks for code organization in Marco. Let's require the necessary modules for our solution:

{% highlight racket %}
(def :io (require "io"))
(def :integer (require "integer"))
{% endhighlight %}

The `io` module has some input and output functions. The `integer` module has functions for parsing and generating integers.

Notice how `require` doesn't actually do anything to the environment; It has no side effects. The result of calling it is an anonymous module that we store in a binding. Also notice how `require` is a regular function with no special properties; It can be used anywhere a function can be used.

## Member access

In order to access members of modules, we use the dot notation:

{% highlight racket %}
(def :n (integer.parse (io.read-line io.stdin)))
{% endhighlight %}

This will bind `n` to the result of parsing an integer from a line of input.

## Conditional and Recursion

Let's define a function to sum all numbers in a list:

{% highlight racket %}
(def :sum (function [:list] {
  (if (nil? list) { 0 }
    { (+ (head list) (recurse (tail list))) })
}))
{% endhighlight %}

`sum` is a function that takes a list. In case the list is nil (the empty list), we say the sum is zero. Otherwise, add the head of the list to the sum of its tail.

Notice the `recurse` binding being used. Since all functions are anonymous in Marco, there is currently no way to make a function call itself recursively by name (because it doesn't have one!). The recurse binding is one way to do it, although I dislike how non explicit that is (among other problems).

## Blocks and Lazy Evaluation

Let's define a function to check whether a number should be included in the final sum:

{% highlight racket %}
(def :include? (function [:n] {
  (or { (= (% n 3) 0) } { (= (% n 5) 0) })
}))
{% endhighlight %}

Notice the `or` function. It takes two arguments, both being blocks. It invokes the first one in a lexical scope; if it returns true, it short circuits and never really invokes the second.

Blocks are how you perform delayed evaluation in Marco. Any code that needs to be passed around or might not run at all must be in a block. You can be sure that any code that is not inside a block won't have any unexpected magic in it.

## Putting it all together

This is the final solution including generating the final result using `filter` and printing it:

{% highlight racket %}
(def :io (require "io"))
(def :integer (require "integer"))

(def :n (integer.parse (io.read-line io.stdin)))

(def :sum (function [:list] {
  (if (nil? list) { 0 }
    { (+ (head list) (recurse (tail list))) })
}))

(def :include? (function [:n] {
  (or { (= (% n 3) 0) } { (= (% n 5) 0) })
}))

(def :result (sum (filter (integer.range 1 n) include?)))

(print result)
{% endhighlight %}

Let me know of any thoughts on any of this. Feedback is always appreciated.
