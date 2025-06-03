---
title: "The Collatz Conjecture"
description: "Using Marco to solve programming challenges."
pubDate: 2013-12-13
---

In this post I'll try to solve the Collatz challenge using Marco.

### The Hailstone Sequence and The Collatz Conjecture

From [wikipedia](http://en.wikipedia.org/wiki/Collatz_conjecture):

> Take any natural number n. If n is even, divide it by 2 to get n / 2. If n is odd, multiply it by 3 and add 1 to obtain 3n + 1. Repeat the process indefinitely. The Collatz conjecture is that no matter what number you start with, you shall always eventually reach 1.

For example, for n = 6:

    6, 3, 10, 5, 16, 8, 4, 2, 1

### The Challenge

Find the longest hailstone sequence for `n` between 1 and 1000000 (1 million).

## Simple solution

A hailstone sequence can be easily computer with a recursive function:

```racket
(def collatz (function (n)
               (if (= n 1)
                   (cons 1 nil)
                   (cons n
                         (if (even? n)
                             (collatz (/ n 2))
                             (collatz (+ (* 3 n) 1)))))))

(print (collatz 6))
```

    '(6 3 10 5 16 8 4 2 1)

Here we define `collatz` to be a function that takes a number `n` and generates the sequence for `n`. It's a fairly standard recursive function that constructs a list.

Let's set the max value of 100 for now (1 million comes much later):

```racket
(def max-n 100)
```

We can now generate all numbers from 1 to max:

```racket
(def ns (range 1 (+ 1 max-n)))
```

And generate the sequence for each number:

```racket
(def sequences (map collatz ns))
```

Then we can calculate the size of each sequence:

```racket
(def sizes (map length sequences))
```

And print the max:

```racket
(def result (list-max sizes))
(print result)
```

There! Solved! Let's go home! Or actually...

## Not Just Yet

What if we increase the value of max-n ?

It works up until 900. 901 causes a stack overflow error. We are still very far from 1 million.

The reason for this is that most of these functions are recursive. They will keep stacking frames until it blows up. How do we solve this problem? I'd love to see some comments on this.

## Extra: New Features

This sample code uses the following new features of Marco:

- `map`: takes a function `f` and a list `l` and returns a new list where each element is `f` applied to the corresponding element of `l`.
- `print`: prints to standard out
- `length`: gets the length of a list
- `list-max`: finds the maximum element in a number list
- `cons`: takes two arguments `v1` and `v2` and creates a new pair.

Lists in Marco are built on top of pairs and nil: A list is either nil (empty list), or a pair where the second element is a list.

So, `(cons 1 2)` returns a pair, but `(cons 1 nil)` is a one element list. To make a bigger list, you can use `(cons 1 (cons 2 (cons 3 nil)))`, which is what is used in the recursive call in `collatz`.