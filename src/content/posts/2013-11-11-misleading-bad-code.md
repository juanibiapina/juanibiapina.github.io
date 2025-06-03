---
title: "Misleading Bad Code"
description: "The subconscious burden of bad code."
pubDate: 2013-11-11
---

Bad code gives me anxiety. Sometimes I even get physically sick. Subtle bad code is even worse.

The subconscious mind sees and processes lots of things we don't realize. It communicates it to us in weird ways. Feelings, anxiety, lack of patience are some examples that happen to me, but it's probably different for each person.

Let's look at very simple, unharming code. I have obfuscated the variables, but this is production code.

```javascript
var numberOfUsers = 1, userIsUgly, someController, redefineEverything, t = true, r = someParameter
```

On the premise that less code is better, someone has compiled all variable definitions in one line. Why is this bad?

Let's apply the [Single Responsibility Principle](TODO). That means: How many reasons to change does this line have?

This one line has at least six different reasons to change. When you need to spend a long time (seconds are a long time for the subconscious) reading one line with several responsibilities that might not even interest you at that moment, this process makes your subconscious go crazy. That alone might make me stand up from your computer and get a coffee.

Later one person refactored that code into this:

```javascript
var numberOfUsers = 1, userIsUgly, someController,
    redefineEverything, t = true, r = someParameter
```

The line break. Since we're in 1986, the line break in the bad code was inserted to make the line easier to read. There is no other way to make it easier to read, right? So why not break the one conceptual line into two, and have the reader of the code make the effort to figure out these are in fact the same line?

Two lines that are in fact the same line. The one thing that points out that they are the same line is the comma in the end of line one. Also, this feature of arbitrarily breaking lines at random points varies by language and by symbol. Some things sometimes allow line breaks, other things sometimes don't. Imagine a powerful processor (again your subconscious) going through this idea every time you happen to glimpse over this line while trying to read code. Metaphorical subconscious suicide.

Also, not everyone has screens of the same size, or even the same editors, or even the same window sizes.

So why not this version?

```javascript
var numberOfUsers = 1,
    userIsUgly,
    someController,
    redefineEverything,
    t = true,
    r = someParameter
```

All line breaks are now meaningful.

You're saving 3 chars on each line. At what cost? Mental Mapping.

You're making the reader of the code who is interested on the definition of `someController` look at line 3, then at line one (for the 'var' keyword), to see that this is a variable definition. When looking at line one there is the extra burden of removing the other var definition (`numberOfUsers`) from the current context (remember I'm talking about subconscious burdens).

Also in practice you can't search for `var someController`.

What about this?

```javascript
var numberOfUsers = 1
var userIsUgly
var someController
var redefineEverything
var t = true
var r = someParameter
```

To the subconscious mind, this version might be the most scary. After writing this, it's easy to see you should do something about it, and might eventually fall back to one of the above. But so far, it highlights the problem the best, and it's the easier to refactor.

![It's a tarp](https://i.chzbgr.com/maxW500/997281536/hC8F8D378/)

This version has six different lines that do different things. They define variables that are used in different places. If you're looking for one, you'll find it in one line. You can safely ignore the other lines. No unnecessary line breaks.

Arguebly better than all others, but scary anyway. This version points you to several bigger issues. This method is probably doing too many things and it should be refactored. These variable definitions should probably be moved closer to their usages (and you didn't do it because the method is such a mess that you can't easily find them, true story). To the experienced programmer, this code is all probably going to be gone after refactoring. There is a lot of work to come.

Now imagine that on your subconscious mind on a Monday morning. Or a Friday night. Whatever scares you most.

Point: It's very hard for your subconscious mind to deal with legacy code where code complexity and major design issues are hidden behind poorly compacted lines and bad refactoring. Undoing one mess reveals a bigger mess and that is frustrating and makes it hard to find the right direction to go.

Try one of those Chinese puzzles where you have to undo everything before you can solve it.
