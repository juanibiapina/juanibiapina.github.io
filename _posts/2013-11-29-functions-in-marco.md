---
layout: single
title: "Functions in Marco"
description: "Basic semantics of functions in Marco"
category: articles
tags: [programming languages, functions, semantics, marco]
---

In this post I'll describe the basics of functions in Marco. They behave mostly like Racket functions, except without any syntactic sugar or variadic functions for now.

## Definition and Application

In Marco, there is only one way to define functions: using the macro `function`. This macro takes two parameters, the list of formal arguments and the function body:

{% highlight racket %}
(def inc (function (x) (+ x 1)))
{% endhighlight %}

This binds the defined function to the symbol `inc`. Note how the function is anonymous. I could change its "name" by binding it to another symbol:

{% highlight racket %}
(def add1 inc)
{% endhighlight %}

Calling functions, also called "application" consists of evaluating a list which has the function in its head and the arguments in its tail (like common lisp):

{% highlight racket %}
(inc 1) // returns 2
{% endhighlight %}


## Scope

Functions have lexical scope, which means that they have access to the environment where they are defined, even during the application.

{% highlight racket %}
(def x 10)
(def addx (function (y) (+ y x)))

(addx 5) // returns 15
{% endhighlight %}

What about later bindings? What should happen in this case?

{% highlight racket %}
(def getx (function () x))
(var x 3)
(set! x 9)

(getx)
{% endhighlight %}

It returns 9. Access to to the environment is not restricted by order (much like [letrec](http://docs.racket-lang.org/reference/let.html?q=letrec#%28form._%28%28lib._racket%2Fprivate%2Fletstx-scheme..rkt%29._letrec%29%29) in Racket). This is one of the mechanisms that allow recursion.

## Higher order functions

Functions are first class values. Referencing a symbol just returns the function, which can be passed to other functions:

{% highlight racket %}
(def perform (function (f x) (f x)))
(perform inc 4)
{% endhighlight %}

Perform takes a function `f` and a value `x` and calls `f` with `x`.

Or they can returned from functions:

{% highlight racket %}
(def g (function (x) (function (y) (+ x y))))
((g 1) 2) // returns 3
{% endhighlight %}

Which looks a lot like how one could implement currying.

## Mutability

Functions parameters are immutable, so this is an error (unlike in Racket):

{% highlight racket %}
(def f (function (x) (set! x 1)))
(f 1)
{% endhighlight %}

    Cannot mutate symbol: x

Let me know what you think so far!
