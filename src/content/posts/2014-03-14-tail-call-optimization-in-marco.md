---
title: "Tail Call Optimization in Marco"
description: "Tail calls in Marco and code readability."
pubDate: 2014-03-14
---

One of the main goals of the Marco language is that the interpreter code should be very easy to understand. It should be possible for almost any programmer without experience developing programming languages to read the code and understand what's going on at a high level.

Even though the current state of the code requires lots of refactoring (since I tend to experiment a lot with it), I'm proud to say that I'm still walking towards that goal.

I have recently added TCO to Marco, in a similar way to the previous [trampoline post](/2013-12-16-trampolining-in-marco/). Let me show you the two main consequences to code quality:

## Interpreter Changes

Here is part of the code for the `if` special form:

```java
@Override
public MarcoObject performInvoke(Environment environment, MarcoList arguments) {
    MarcoObject condition = arguments.get(0);
    MarcoObject thenClause = arguments.get(1);
    MarcoObject elseClause = arguments.get(2);

    MarcoObject v1 = condition.eval(environment);

    if (Cast.toBoolean(v1) == MarcoBoolean.TRUE) {
        return new MarcoContinuation(thenClause, environment);
    } else {
        return new MarcoContinuation(elseClause, environment);
    }
}
```

It should not be difficult to read:

1. `condition`, `thenClause` and `elseClause` are positional arguments.
2. `condition` is always evaluated.
3. If the result of the condition is `true`, return a continuation for the `thenClause`, otherwise return a continuation for the `elseClause`.

Compare this to the Racket documentation for `if`:

> Evaluates test-expr. If it produces any value other than #f, then then-expr is evaluated, and its results are the result for the if form. Otherwise, else-expr is evaluated, and its results are the result for the if form. The then-expr and else-expr are in tail position with respect to the if form.

I like to see these concepts (and some more) directly mapped to the interpreter code.

Catch: You need to know that continuations are being used to implement tail calls. I could just make a class MarcoTailCall that inherits from MarcoContinuation, but I have doubts if that actually makes it clearer.

## The New Collatz Implementation

This is the new Marco code for finding the max collatz sequence up to some number `n`:

```racket
(def collatz-size (function (n)
                    (let (helper (function (n size)
                                   (if (= n 1)
                                       (+ 1 size)
                                       (helper (if (even? n)
                                                   (/ n 2)
                                                   (+ (* 3 n) 1))
                                                (+ size 1)))))
                      (helper n 0))))

(def collatz-max (function (n)
                   (let (helper (function (n current-max)
                                  (if (= n 1)
                                      (max 1 current-max)
                                      (helper (- n 1) (max current-max (collatz-size n))))))
                     (helper n 0))))

(print (collatz-max 100000))
```

It doesn't require any hacks or trampolines since TCO is now part of Marco. Much more readable than [before](http://juanibiapina.com/articles/2013-12-16-trampolining-in-marco/).

# Performance Comparison

These are the previous values:

    100000: 58.31s user 0.48s system 102% cpu 57.191 total
    500000: 336.71s user 1.01s system 104% cpu 5:24.38 total

This is now using TCO:

    100000: 28.90s user 0.26s system 102% cpu 28.554 total
    500000: 158.40s user 0.91s system 100% cpu 2:38.02 total

Its about twice as fast, slightly more as the number increases. Better performance with better code.