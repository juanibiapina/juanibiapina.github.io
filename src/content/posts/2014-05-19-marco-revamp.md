---
title: "Marco Revamp"
description: "Eliminating Semantic Ambiguities in Marco."
pubDate: 2014-05-19
---

Ever since Marco's fourth rewrite (when things finally started to get serious), it has been heavily inspired by Lisp. One of my initial goals was to have a macro system similar to Clojure's.

Now that the language has evolved, I have started making decisions based on some principles, instead of just playing aroung with language development concepts.

This is the result so far:

```racket
(def :collatz (function [:n] {
  (if (= n 1)
    { (cons 1 nil) }
    { (cons n
        (if (even? n)
          { (recurse (/ n 2)) }
          { (recurse (+ (* 3 n) 1)) })) }) }))

(def :max-n 100)

(print (list-max (map length (map collatz (range 1 (+ max-n 1))))))
```

But I'll explain.

# Semantic Ambiguities

I have changed most of the language syntactic and semantics to adopt a new principle: No semantic ambiguities.

Let me give an example:

```ruby
class Ball
  def roll(roll=5)
    puts "Rolling at speed #{roll}"
    roll
  end
end

Ball.new.roll
```

Is `roll` a method or a variable?

This is a simple ruby program that rolls a ball at a certain speed and returns that speed. Of course the parameter name should be `speed`, not `roll`. Under the right circunstances, code like that might happen in production (I have seen it).

Just ignore the bad name for a second. Why is code like that even allowed in Ruby?

There are perfectly valid explanations to why that is allowed (which I'll not explain here), but probably no strong enough reason why you should ever do this on purpose.

That's what I call a "semantic ambiguity". This one is specific to Ruby, but similar things happen in most programming languages. These are small things that add to the subconscious burden you have to go through when reading code. It is very small, but why do I dislike it?

Consider this situation: Suppose you are reading legacy code, following a complicated flow of calls in order to understand some logic that was written four years ago, in a completely different context. You already jumped through several files. As you encounter something like the previous ambiguity, what do you do?

1. Stop what you're doing.
2. Identify the origin of the `roll`. In this case you need to go to the method signature and figure out that there is a method and a variable with the same name.
3. Possible WTF moment when you google for this crazy stuff.
4. Return to the `roll` you were analyzing and identify it as a method or a variable based on the context. Remember to do this to any `roll`s you find along the way.
5. Return to following the original flow.

Now imagine the code is not as easy as my example. The variable and method definitions could be in completely different methods, modules or files. You could maybe see the method first, miss the variable and later get really confused.

This requires a lot of branching and stacking which computers do very well, but people mostly don't. And we shoudn't need to.

# The Path of No Ambiguity

I tried to remove any semantic ambiguities from Marco. In order to achieve that, I made everything in the language mean one thing, and one thing only.

Of course there were compromises I had to make. Marco is no longer what I would consider a Lisp dialect. It is no longer homoiconic and has no support for macros (and probably cannot have).

Let's compare the `if` function:

Before:

```racket
(if (= n 1) (cons 1 2) (error))
```

`if` used to be a macro that took three parameters: a condition, a then clause and an else clause. It would evaluate the condition in lexical scope and then evaluate either the then or else clause accordingly. Where is the semantic ambiguity?

Why isn't `(error)` evaluated to a function call the causes an error? Because of the inherent semantics of the `if` macro. If `if` was a user defined function, this evaluation would be different. For instance:

```racket
(do-stuff (= n 1) (cons 1 2) (error))
```

This would evaluate all the arguments normally if `do-stuff` were a function. If this was Racket or Common List, `do-stuff` might even be a macro. Now you need to read that macro to understand what is evaluated and when.

After:

```racket
(if (= n 1) { (cons 1 2) } { (error) })
```

In the new version, `if` is a function. It takes three arguments: a boolean, a then block and an else block. If the boolean is true, it invokes the then block. Otherwise it invokes the else block.

This is evaluated exacly like any other function. Note how the expression `(= n 1)` is not actually passed to the `if` function. It is evaluated before the function call, like any other argument evaluation, and only `true` or `false` is passed in. Blocks evaluate to themselves, so they are passed in, ready to be invoked if needed.

Notice how you can spot the delayed evaluation by the syntactic construct (brackets). Notice how you can safely evaluate any part of this code in your head without looking at any other parts.

This is what I hope to acomplish. There are also many other cases that are normally ambiguious and I have removed, for instance: function definitions, variable bindings and recursion among others. I won't go into further details about each, but I would love to hear any thoughts about this whole approach.