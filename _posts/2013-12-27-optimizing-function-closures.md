---
layout: single
title: "Optimizing Function Closures"
description: "Optimizing closure environments to contain only what is really needed."
category: articles
tags: [programming languages, development, marco, closure, functions, optimization]
---

In this post I want to talk about optimizations for function closures.

## Evaluating Function Closures

One of the biggest revelations for me when writing Marco was that functions are not actually first class citizens. Closures are.

When you define a function, you're actually creating a object which has three pieces of data: An executable body, an environment, and a list of parameters.

This closure object is what can be passed around and eventually called. It will take care of evaluating the function body (which it holds) in the environment where the function was originally defined (which it also holds) extended with the parameters (which it also also holds) bound to the actual arguments.

This is the definition of evaluating a closure (hence, a function with lexical scope). The cool thing about this definition is that it maps exactly to the code.

## The Insight

Consider the evaluation of the following code:

{% highlight racket %}
(def y 1)
(def f (function (x) (+ x y)))
(def z 42)
{% endhighlight %}

`f` is bound to a closure object that holds the following data:

- The body: `'(+ x y)`
- The parameters: `'x`
- The environment in the moment that `f` is defined

So what is currently on that environment?

Obviously, `+` and `y` have to be, because they are used in the body. With a bit of cleverness that I might eventually talk about, `f` also is (to allow recursion with anonymous functions). What about `z`?

I wrote in [this other post](http://juanibiapina.com/articles/2013-11-29-functions-in-marco/) that `z` would be available. I have changed this now, and things declared after the declaration of the function are not available, by definition. With that I might have killed mutual recursion for now. I'll figure that out later.

The interesting question here is: What about `-`? What about `*`, `def`, `set!` etc?

None of these bindings are used in the function body, so one could argue that they should not be there. This is an known optimization for closure environments and I have added this to Marco.

## The Trick

But how do you know what needs to be available in the closure environment? I won't make this post long and just say that there are formal ways to do it.

What I do is: During the function definition, I copy to the closure environment all symbols referenced in the body that are available at that point. The symbols I cannot find, I just assume they will be available later.

What happens later?

Currently there are three situations where symbols can be referenced in a function body and not be available at the time of the function definition:

1. Parameters: They are available only when the function is about to be called. So I just ignore them because I know they will be bound during the call.

2. Special forms: Symbols that are used inside special forms and won't actually be used to lookup values. More on this later.

3. Actual errors. Symbols that are not defined anywhere.

The way it is currently done, if you defined a function that uses a variable that is not defined, it will only cause an error when you call that function, even though the function definition itself is invalid, by definition. In a way I'm apologizing instead of asking for permission, but there is a reason for that.

## Back to Number 2

Consider the following code:

{% highlight racket %}
(def f (function (x) (let (a x) a)))
{% endhighlight %}

`f` is a function that takes one argument and returns it. When evaluating this function definition, I have no way to know at that point that the first `a` is not actually a symbol lookup (it is actually defining `a` to be `x`). It has special meaning because of the evaluation semantics of `let`.

That is the whole reason for the delayed check.

In the current implementation, I will assume that `a` is not available in the environment for a reason. When later the function is called, `a` will never be really used for a lookup, so there won't be an error. I believe this works for any special forms.

The "better" approach would be to peek into the body of the function, find the `let` and recognize it as a special form. Then each special form would have well defined semantics for free variables. Marco doesn't have special forms yet, but I'm considering adding them.

## Results

Running the same tests as the [previous post](http://juanibiapina.com/articles/2013-12-16-trampolining-in-marco/):

Previous:

    100  : 0.72s user 0.06s system 139% cpu 0.562 total
    500  : 2.35s user 0.22s system 117% cpu 2.196 total
    1000 : 5.77s user 0.25s system 107% cpu 5.618 total
    5000 : 111.44s user 0.82s system 101% cpu 1:51.07 total
    10000: too long to wait

Now with the optimization:

    100  : 0.81s user 0.05s system 151% cpu 0.570 total
    500  : 1.64s user 0.12s system 142% cpu 1.229 total
    1000 : 2.95s user 0.20s system 117% cpu 2.691 total
    5000 : 38.57s user 0.40s system 102% cpu 38.204 total
    10000: 149.57s user 1.09s system 101% cpu 2:29.08 total

And remember this is a very simple test with a small environment. Imagine the gains when you have a big language.

If you are ever designing your own language, I suggest you do this as soon as you can. Do not focus on this in the very beginning, but if you ever feel you can do it, get to it. I had to do major changes to the implementation and even some semantics in order to get this working properly.
