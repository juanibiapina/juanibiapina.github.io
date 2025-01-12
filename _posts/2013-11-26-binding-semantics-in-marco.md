---
layout: single
title: "Binding Semantics in Marco"
description: "Motivation and description of Marco's binding semantics."
category: articles
tags: [ruby, python, javascript, racket, marco, programming languages, variables, bindings, java, scala]
---

In this post I will describe the binding semantics of Marco, the language I am developing which you can find [here](https://github.com/juanibiapina/marco).

## Undefined Variables

Undefined variables cause an error in almost any language (notably not in bash), and so it does in Marco:

{% highlight racket %}
a
{% endhighlight %}

    Undefined binding 'a'

## Expression values

Languages like Python, Ruby, Scala, Javascript or Racket allow values as expressions. Java does not:

{% highlight java %}
42;
{% endhighlight %}

    not a statement

So Marco allows that too:

{% highlight racket %}
42
"some string"
{% endhighlight %}

## Assignment side effect

In Ruby, Python or Javascript assignments have the side effect of returning the bound value. So an expression like this is valid:

{% highlight ruby %}
a = b = 1
{% endhighlight %}

On the other hand, in Javascript using the var keyword, Java or Scala, assignments are not expressions hence they do not return values. In Javascript:

{% highlight javascript %}
var a = 1 // returns undefined
{% endhighlight %}

In Racket define is a special form, which is not allowed in an expression context:

{% highlight racket %}
(define b (define t 7))
{% endhighlight %}

    stdin::34: define: not allowed in an expression context
      in: (define t 7)

In Marco, `def` expressions return `nil`. The reason behind this is: Since def already alters the state of the environment (by creating the binding), it should not return anything, otherwise it is probably doing too many things. This stops the programmer from using assignment side effects, but does not avoid an expression like this (which binds `t` to `7` and `x` to `nil`):

{% highlight racket %}
(def x (def t 7))
{% endhighlight %}

## Mutation

In Python, Ruby and Javascript variables spring into existence when assigned and are mutable. The syntax for mutation is the same used for creating bindings.

{% highlight javascript %}
a = 1 // creates a binding
a = 42 // mutates
a = "string" // mutates to a different type
{% endhighlight %}

That is something I would like to avoid.

In Scala, mutable and immutable values are created differently by using two different syntactic forms:

{% highlight scala %}
val a = 1
val a = 5 // fails on already defined value (no shadowing)
a = 6  // fails to assign to val

var r = 5
var r = 4 // error because you are trying to recreate instead of mutate
r = 7 // assigns to the var (if it typechecks)
{% endhighlight %}

In Racket, mutaton is explicit using a special form `set!`:

{% highlight racket %}
(define x 1)
(set! x 42)
{% endhighlight %}

Also like Java and Scala, you cannot mutate an undefined variable:

{% highlight racket %}
(set! z 42)
{% endhighlight %}

    set!: assignment disallowed;
     cannot set undefined
      variable: x

In Marco, I have compiled the semantics I like the most while trying to keep it consistent and friendly:

Like Scala, you have two syntactic forms (in this case, macros) to define bindings (one for mutable and another for immutable):

{% highlight racket %}
(def x 42) // immutable
(var y 3) // mutable
{% endhighlight %}

And like Racket, there is a special form (in this case again, a macro) for explicit mutation, which fails to mutate immutable bindings:

{% highlight racket %}
(var y 3) // mutable
(set! y 7) // works

(def x 42) // immutable
(set! x 5) // error!
{% endhighlight %}

Mutation also fails if the variable is not defined (like Java, Scala and Racket):

{% highlight racket %}
(set! x 5) // error on undefined x
{% endhighlight %}
