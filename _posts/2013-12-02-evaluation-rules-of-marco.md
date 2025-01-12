---
layout: single
title: "Evaluation Rules of Marco"
description: "Complete description of evaluation rules in Marco"
category: articles
tags: [programming languages, functions, semantics, marco, evaluation rules]
---

Marco's evaluation rules are a simplified form of Racket's. I'll summarize them here.

## Value expressions

Values expressions evaluate to themselves:

{% highlight racket %}
42
"string value"
true
nil
{% endhighlight %}

## Symbols

The evaluation of a symbol consist of looking up that binding in the current environment. This applies to `def`, `var` and parameter bindings.

{% highlight racket %}
x // looks up the value of x in the current environment and returns it
{% endhighlight %}

## Lists

Lists evaluate to an application. First, the head of the list is evaluated. If it is not callable, it's an error. If it is callable, it is either a function or a macro.

### Function evaluation

For functions, each element in the tail of the list is evaluated. Then, the function closure environment is extended with each evaluated element bound to the corresponding formal parameter. Then the function body is evaluated.

Example:

{% highlight racket %}
(def do-something (function (n a) body))
(def age 30)
(do-something "name" age)
{% endhighlight %}

The last line will first evaluate `do-something` to a function, then evaluate the string "name" to itself, then evaluate the symbol `age` to the number 30. Then `n` and `a` will be bound to "name" and 30. Then `body` will be evaluated.

### Macro evaluation

Macros evaluate exactly like functions, except the tail arguments are not evaluated until explicitly requested:

{% highlight racket %}
(def unless (macro (e1 e2 e3) (if (eval e1) (eval e3) (eval e2))))

(unless true (+ 1 2) (+ 3 4))
{% endhighlight %}

In the last line, `unless` will evaluate to the macro above. The arguments to `unless`, which are lists, will not evaluate (so the summing won't happen), until it is explicitly requested in the `eval` calls above.

One extra thing to consider is the scope of argument evaluation. Any calls to `eval e` in the body of the macro, where `e` is an argument will actually evaluate the expression `e` in the environment where the macro is called, not where it is defined. This is the same behavior as function arguments, except for the need to be explicit.

## Conclusion

That's it. Marco doesn't have special forms or any exceptions to these rules. I'd like to keep it that way.

## But also... Mutation

On the other hand, consider an expresison like this one (proposed by Duck):

{% highlight racket %}
(var t 3)
(def f (function (x) (set! x 1)))
(f t)
{% endhighlight %}

`f` is a function that takes an argument and mutates it. Duck's intuition (based on the previous post) was that, since the passed variable is mutable, the parameter mutation would be possible, and the final result stored in `t` would be 1.

That is not actually possible. It should be clear now based on the evaluation rules: The symbol `t` as an argument is evaluated to a value before being passed to the function, so inside the function body, any information about the mutability of `t` is lost. The value that was in `t` is now bound to the parameter `x` in an immutable way.

But why?

First, it simplifies the evaluation rules, so it simplifies the semantics of the language.

Second, you can think of it this way: You don't need to check the caller of a function to determine if a parameter is mutable or not. So that's a way to keep functions somewhat self contained semantically.

Consider this other situation, instead:

{% highlight racket %}
(def setx (function (value) (set! x value))
{% endhighlight %}

Just by looking at the function, one cannot know at that point if `x` is mutable or not. Whenever `x` is defined, it will either be mutable or not, but won't be able to change mutability based on context.

Duck proposed that function bodies should only access variables that are defined before the definition of the function. While I agree that this is more semantically consistent, it is rather less dynamic. It will require a lot a careful thinking and it is something I would like lots of opinions about.
