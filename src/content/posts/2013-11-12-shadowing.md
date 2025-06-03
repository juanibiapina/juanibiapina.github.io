---
title: "Shadowing"
description: "Shadowing in Ruby and obscure language features"
pubDate: 2013-11-12
---

In Ruby you can do this:

```ruby
puts = 1
puts(puts)
```

What will it output? Let's follow simple evaluation rules:

Line 1 assigns `1` to the variable `puts`. Since `puts` is already defined, is is now shadowed in this scope.

Line 2 reads `puts` from the environment yielding `1`, and tries to call it as a method. You would expect ruby to complain that 1 is not a method.

But what really happens?

It runs fine and it works. `puts` used as a variable will look up the variable and find `1`. When it is used as a method it will look up the method and ignore the variable.

There are probably reasons for this, a logical reasoning that is a consequence of the evaluation rules for Ruby. Overall, I don't care.

When reading the line `puts(puts)` I have to do syntactic analysis to find the word `puts` two times. Then I have to do semantic analysis to find out that the first `puts` is a method and the second is a variable. Then I have to follow the lookup rules for these two different concepts up the chain of environments. It's even funnier if you write it like this: `puts puts`.

I am not a compiler. I'll say again what is one of the worst things you can force the readers of your code to do: Mental Mapping. I don't want to compile code and jump through several hoops in my head while trying to understand business logic.

Of course you should never be doing anything even close to this. You should be avoiding shadowing in general (except for very simple cases), you should not be exploiting any potentially obscure features of the language. Trying to go as far away from complications as you can.

And this is a silly example, right? You would never find code like this in production.

Sure.

```ruby
def clear_some_cache(id, clear_other_cache = false)
  do_something
  clear_other_cache(id) if clear_other_cache
end

def clear_other_cache(id)
  do_the_other_thing
end
```

Ignoring the other major problems with this code for now, this is from production code. This code was written with shadowing and exploiting this semantics on purpose, not by accident.