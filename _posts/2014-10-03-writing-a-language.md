---
layout: single
title: "Writing a Language"
description: "Tutorial of how to get started writing a language using Racket"
category: articles
tags: [programming languages, racket, ygor, development]
---

In this tutorial I'm gonna show you how to write a very simple programming language called Ygor. The language itself is just a placeholder for what I really want to show, which is how to get started with language development in Racket.

## The Ygor language definition

Ygor has only one type: integers. There is only one function `sum`. The language won't have any syntax. You will input the abstract syntax tree directly.

Here is what Ygor will look like:

{% highlight racket %}
#lang ygor

(sum (const 5) (const 6))
{% endhighlight %}

## Racket introduction

To develop Ygor, we're gonna use [racket](http://racket-lang.org/). Racket has a very interesting framework for developing custom languages that extends on the power of lisp macros.

Download racket and add the `bin` folder to your `PATH`. That should give you access `racket`, `drracket`, `raco` and other useful stuff.

Even though you can use any editor, I seriously recommend DrRacket, which comes with the racket distribution.

In DrRacket you'll see an editor on top, and the REPL on the bottom. Let's try a simple program:

{% highlight racket %}
#lang racket

(define (square x) (* x x))

(define value 4)

(square value)
{% endhighlight %}

Racket is a lisp dialect based on scheme. There, end of introduction. The racket website has loads of very good documentation. Have fun.

## Creating the initial project

We'll start by creating a directory for the language:

{% highlight sh %}
$ cd ~/development
$ mkdir ygor
$ raco link ygor
{% endhighlight %}

The last command will link the `ygor` directory to the racket collections, making it perfect for development. To test it, let's try requiring a sample file from that module. Create a file `ygor/hello.rkt` with the following content:

{% highlight racket %}
#lang racket
"Polka will never die."
{% endhighlight %}

And test it like this (in DrRacket):

{% highlight racket %}
(require ygor/hello)
{% endhighlight %}

We're ready to start.

## The hard way

This tutorial will be mostly backwards, comparing to other racket language tutorials you'll find. Instead of beginning by defining the lexer and parser (or even grammar), we'll start with how to tell racket to treat ygor as a language. I find this approach much more pratical. Later you can choose to focus on any of the steps with the appropiate depth. There is a great tutorial on [how to implement brainf*ck with racket](http://www.hashcollision.org/brainfudge/).

In DrRacket, try the following code:

{% highlight racket %}
#lang ygor
{% endhighlight %}

And hit run. You should get something like this:

    Module Language: invalid module text
    standard-module-name-resolver: collection not found
      collection: "ygor/lang"
      in collection directories:
       /Users/juanibiapina/Library/Racket/5.3.6/collects
       /Applications/Racket v5.3.6/collects
       sub-collection: "lang"
      in parent directories:
       /Volumes/development/ygor

That means racket is looking for a lang collection inside ygor. Let's make one:

{% highlight sh %}
$ mkdir lang
{% endhighlight %}

And running again:

    Module Language: invalid module text
    . . ../../Applications/Racket v5.3.6/collects/mred/private/snipfile.rkt:324:2: open-input-file: cannot open input file
      path: /Volumes/development/ygor/lang/reader.rkt
      system error: No such file or directory; errno=2

So racket is looking for a reader.rkt file. Go ahead and create one. We'll use an [module reader](http://docs.racket-lang.org/syntax/reader-helpers.html#%28mod-path._syntax%2Fmodule-reader%29), so add the following lines to `reader.rkt`:

{% highlight racket %}
#lang s-exp syntax/module-reader
ygor
{% endhighlight %}

The second line there tells racket to look for a file `main.rkt` inside the ygor collection. This file contains a module that provides all the top level bindings that will build the language. Let's provide some initial content in main.rkt:

{% highlight racket %}
#lang racket
{% endhighlight %}

Let's go back to our example and try to run a fake ygor program:

{% highlight racket %}
#lang ygor

(hello?)
{% endhighlight %}

You should get something like this:

    module: no #%module-begin binding in the module's language

Let's just provide #%module-begin for now, we'll get back to it later (in main.rkt):

{% highlight racket %}
(provide #%module-begin)
{% endhighlight %}

Trying again:

    hello?: unbound identifier;
     also, no #%app syntax transformer is bound in: hello?

    Interactions disabled: ygor does not support a REPL (no #%top-interaction)

It tells you `hello?` is not defined. Let's ignore the other errors for now.

In order to define what `hello?` is, we need to provide this definition. Add these two lines (in main.rkt):

{% highlight racket %}
(provide hello?)

(define-syntax-rule (hello?)
  (print "hello to you too!"))
{% endhighlight %}

And try running again. It should print "hello to you too!" to standard output. This is your first working version of a language that says hello. No kidding.

## The REPL

The previous error message said something about ygor not supporting a REPL. A simple way to get it going is to just provide `#%top-interaction` straight from racket. Add this line to `main.rkt`:

{% highlight racket %}
(provide #%top-interaction)
{% endhighlight %}

Now if you run an ygor program from DrRacket, you get a REPL. From now on you can test all the examples directly there.

## const

The next step is to allow the user to write ygor programs in the form of an abstract syntax tree. That means there won't be any program "text" to parse. The user diretly inputs the syntax tree that will be evaluated. So let's write a simple program:

{% highlight racket %}
#lang ygor

(const 5)
{% endhighlight %}

If you run this, you'll get "const: unbound identifier;". Let's define `const`. We'll create syntactic forms as structs in racket: (in main.rkt)

{% highlight racket %}
(provide const)
(struct const (v) #:transparent)
{% endhighlight %}

Constants will be represented as structs that hold a value `v`. We also export this struct with the provide clause. Running again:

    const1: function application is not allowed;
     no #%app syntax transformer is bound in: (const1 5)

For racket to understand function applications (in this case `const` is a function that takes one argument and returns a struct), the `#%app` function must be defined. Let's bring it from racket (in main.rkt):

{% highlight racket %}
(provide #%app)
{% endhighlight %}

Running again:

    ?: literal data is not allowed;
     no #%datum syntax transformer is bound in: 5

Same deal for literal data. Racket needs the `#%datum` function in order to understand literal data. Let's provide it (in main.rkt):

{% highlight racket %}
(provide #%datum)
{% endhighlight %}

And running again, you can see it returns itself.

## sum

Let's add a `sum` function. First let's sketch the syntax tree for a sum:

{% highlight racket %}
#lang ygor

(sum (const 42) (const 1))
{% endhighlight %}

We'll need to define what `sum` is (in main.rkt):

{% highlight racket %}
(provide sum)
(struct sum (e1 e2) #:transparent)
{% endhighlight %}

`sum` is a struct that hold two other expressions. Run again (or try in the REPL):

{% highlight racket %}
(sum (const 1) (const 2))
{% endhighlight %}

Which returns itself, of course.

So at this point, we can type the AST of a Ygor program, and it will evaluate to itself. How can we make Ygor programs runnable?

## eval

Let's define a function to evaluate an Ygor program. We'll call it `ygor-eval` (in main.rkt):

{% highlight racket %}
(provide ygor-eval)
(define (ygor-eval e)
  (match e
    [(const x) (const x)]
    [(sum e1 e2) (const (+ (const-v (ygor-eval e1)) (const-v (ygor-eval e2))))]))
{% endhighlight %}

In order to evaluate an expression `e`, we match this expression against the two possible cases in Ygor:

1. `e` is a `const` with value `x`: returns itself
2. `e` is a `sum` of two other expressions: return the sum (racket `+`) of the result of recursively evaluating both expressions (assuming they evaluate to `const`).

Try running this code now:

{% highlight racket %}
#lang ygor

(ygor-eval (sum (const 42) (const 1)))
{% endhighlight %}

And you should get `(const 43)`.

## Hooking up eval

We wouldn't like to write every line in Ygor prefixed with `ygor-eval`. Let's add a hook to automatically wrap every expression with `ygor-eval`. To do that, we'll overwrite `#%module-begin`, which is a function that is automatically added by racket wrapping the body of a module, which is very convenient (in main.rkt):

{% highlight racket %}
(define-syntax (ygor-module-begin stx)
  (datum->syntax
     stx
     (cons (quote-syntax #%module-begin)
           (map (lambda (e)
                  (list (quote-syntax ygor-eval)
                        e))
                (cdr (syntax-e stx))))
     stx
     stx))
{% endhighlight %}

Remember how before we just provided `#%module-begin` from racket? Let's replace the provided `#%module-begin` with our own overwritten version, defined above (in main.rkt):

{% highlight racket %}
(provide (rename-out [ygor-module-begin #%module-begin]))
{% endhighlight %}

The workings of `ygor-module-begin` are not very interesting to our purposes right now, but the idea is basically this: wrap every statement in the module body with `ygor-eval`. You can test now that any Ygor programs you run will automatically eval (unless you type it in the REPL, in which case it will still just print the AST, because we haven't changed how the REPL works).

## Becoming useful

There are a few things I've done in this tutorial you wouldn't have actually done when writing your own language. On the other hand, this setup is the simplest possible one I could find that easily integrates into MUPL, the language you write for the [Programming Languages course on coursera](https://www.coursera.org/course/proglang), which I seriously recommend every programmer to complete.

From this setup, you can replace the struct definitions I have given with the ones from the course and replace `ygor-eval` with `eval-exp`, from one of the course exercises.

The full code can be found [on github](https://github.com/juanibiapina/ygor). Have fun.
