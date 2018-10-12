---
layout: single
title: "Trampolining in Marco"
description: "Trying out some advanced programming concepts in Marco."
category: articles
tags: [programming languages, development, marco, collatz, hailstone, sequences, continuations, thunks]
---

In this post I'll show how to "better" solve the collatz challenge from the [previous post](http://juanibiapina.com/articles/2013-12-13-the-collatz-conjecture/) by escaping the limitations of the Java stack.

This is in fact, not at all better, it's just much more complicated and helped me learn and think about some concepts I had never worked with.

## Accumulators

The first learning we get from the previous problem is that we don't actually need to generate and store the sequence of numbers. All we need is their sizes. We can then write a new function:

{% highlight racket %}
(def collatz-size (function (n size)
                     (if (= n 1)
                         size
                         (collatz-size (if (even? n)
                                           (/ n 2)
                                           (+ (* 3 n) 1))
                                       (+ 1 size)))))
{% endhighlight %}

The function now takes an `accumulator` called `size`. The accumulator will have an initial value of 1 and will be incremented for each recursive call. That way, the final call only needs to return the accumulator value, and the list is never stored.

This still does not solve the stack problem, but allows us to use much less memory.

## Continuation Passing Style

The previous function still relies heavily on the stack. One way to avoid this is to use a technique called [Continuation Passing Style](http://en.wikipedia.org/wiki/Continuation-passing_style). I'll make a few simplifications, but the concept is still valid.

A [continuation](http://en.wikipedia.org/wiki/Continuation) is a representation of control state. In our case, a continuation will be just a function. This function will take no arguments, and its sole objective is to be called in order to continue the execution of the program.

In Continuation Passing Style (CPS), we'll have functions return the next piece of code that should execute. That means: Instead of calling itself recursively, the function will return a continuation.

Let's rewrite `collatz-size` using our simplified CPS:

{% highlight racket %}
(def collatz-size (function (n size)
                         (if (= n 1)
                             size
                             (function () (collatz-size (if (even? n)
                                                            (/ n 2)
                                                            (+ (* 3 n) 1))
                                                        (+ 1 size))))))
{% endhighlight %}

This new version returns the `size` when it finishes the calculation (the first part of the `if`). But when it knows it has to recurse, it instead creates a `continuation` (a function that takes no arguments) and returns it. That means this function will return a function that returns a function and eventually might return the result. How do we run this?

## Trampolines

A `trampoline` is a function that we can use to get the result of the previous `collatz-size`. It will take a function, run it and check the results. It will keep doing this until the result is not a function:

{% highlight racket %}
(def trampoline (function (f)
                   (do (
                     (var result f)
                     (while (function? result) (set! result (result)))
                     result
                   ))))
{% endhighlight %}

So we can invoke like this:

{% highlight racket %}
(print (trampoline (function () (collatz-size 6 1))))
{% endhighlight %}

Note this is imperative style, which I don't fully support, but it translates the stack usage into a while loop. I find this incredibly creative.

## Changing Everything

Given that we have a `trampoline` function available, we can rewrite all of our recursive functions in terms of it. Here is the complete solution:

{% highlight racket %}
(def trampoline (function (f)
                 (do (
                   (var result f)
                   (while (function? result) (set! result (result)))
                   result
                 ))))

(def collatz-size (function (n)
                    (let (helper (function (n size)
                                   (if (= n 1)
                                       size
                                       (function () (helper (if (even? n)
                                                                (/ n 2)
                                                                (+ (* 3 n) 1))
                                                            (+ size 1))))))
                      (trampoline (function () (helper n 1))))))

(def my-range (function (v1 v2)
                (let (helper (function (v1 v2 l)
                               (if (< v2 v1)
                                   l
                                   (function () (helper v1 (- v2 1) (cons v2 l))))))
                  (trampoline (function () (helper v1 v2 nil))))))

(def my-length (function (l)
                 (let (helper (function (l size)
                                (if (nil? l)
                                    size
                                    (function () (helper (tail l) (+ size 1))))))
                   (trampoline (function () (helper l 0))))))

(def my-list-max (function (xs)
                   (let (helper (function (xs m)
                                  (if (= (my-length xs) 1)
                                      (max (head xs) m)
                                      (function () (helper (tail xs) (max (head xs) m))))))
                     (trampoline (function () (helper (tail xs) (head xs)))))))

(def my-reverse (function (xs)
                  (let (helper (function (xs acc)
                                 (if (nil? xs)
                                     acc
                                     (function () (helper (tail xs) (cons (head xs) acc))))))
                    (trampoline (function () (helper xs nil))))))

(def my-map (function (f l)
              (let (helper (function (list acc)
                             (if (nil? list)
                                 acc
                                 (function () (helper (tail list) (cons (f (head list)) acc))))))
                (my-reverse (trampoline (function () (helper l nil)))))))

(def max-n 5000)

(print (my-list-max (my-map collatz-size (my-range 1 max-n))))
{% endhighlight %}

Note how even map and reverse need to be rewritten in this style.

## Results

This version works "well" up to 5000 thousand. I did not wait for it to finish for 10000, although it probably would eventually. Here are the timings:

    100  : 0.72s user 0.06s system 139% cpu 0.562 total
    500  : 2.35s user 0.22s system 117% cpu 2.196 total
    1000 : 5.77s user 0.25s system 107% cpu 5.618 total
    5000 : 111.44s user 0.82s system 101% cpu 1:51.07 total

## Future

Tail call optimization is a much better solution to this problem. In the future I would like to implement TCO in the Marco interpreter. I might even use some sort of internal trampolining, transparent to the language.

The interpreter also needs several internal optimizations, specially regarding memory use when defining function closures. That's a lot a future work there.
