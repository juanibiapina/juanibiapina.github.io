---
title: "Single Responsibility Principle"
description: "A quick reminder of what is the SRP and writing good code"
pubDate: 2013-11-01
---

A quick [google search for single responsibility principle](https://www.google.com/search?q=single+responsibility+principle&oq=single+resposibility) for me returns these top 5 results, all of which contain this saying in one way or another:

> In this context, a responsibility is considered to be one reason to change.

On the other hand, you'll see people mostly talking about responsibilities as "things to do". As an example, check out [this answer on StackOverflow](http://stackoverflow.com/questions/1068558/oo-design-in-rails-where-to-put-stuff/1071510#1071510) which is great! but says:

> A good way to think about it is the "single responsibility principle," which says that a class should be responsible for a single (or small number) of things.

I find this way of thinking misleading.

In the context of SRP, the word responsibility can not be used interchangeably with "do a thing". One responsibility is not doing one thing. The reason for this is the definition of thing, which overall, is not agreed upon.

A "thing" can vary from processor instructions to major business logic. If every person in the project has a different view on how much is one thing (which is very likely), there will never be an agreement on the sizes of classes, henceforth, on their responsibilities. It is simply not viable to have a discussion on how many things a method or class does.

Reasons to change, on the other hand, is much more practical. If there is more than one reason a class should change, break it in two. This is easy to apply to rails models, views and controllers, but we hardly do. It's common to write tested rails code that works and goes to production on the same day. It much more sensible, and rather difficult, realize that you're falling on a trap and need to refactor your code.

Here is a final note: For a second, forget your framework. Think about how you would do this with another framework. Think about how you would do this in a functional programming language. Consider this, get back and refactor so it reads better and is more easily maintainable.
