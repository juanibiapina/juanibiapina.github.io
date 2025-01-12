---
layout: single
title: "Practical Development of Programming Languages"
description: "A summary of the tools I use to develop Marco"
category: articles
tags: [programming languages, tools, development, marco]
---

In this post I'll comment about the tools I'm using for developing Marco.

# Java

The actual code is written in [Java](http://www.java.com/en/), using an Object Oriented approach. This is not actually quite common, since the mapping between the concepts in different paradigms is not at all obvious. Most languages do some sort or automatic byte code generation (like [Clojure](http://clojure.org/)) or use procedural Java (using mainly static methods, like [Ioke](https://ioke.org/)).

# IntelliJ

[IntelliJ](http://www.jetbrains.com/idea/) is, in my opinion, by far the most amazing IDE ever conceived. It greatly increases the speed I write code (I rarely ever write a whole line of code by myself). It also has great support for refactoring, and combined with Java static type system, it allows me to make major changes to the code in a safe way.

# Antlr

Parsing is one of the most basic tasks you need to take care of when writing a programming language. In my opinion, it is also one of the most annoying and meaningless. It's not particularly difficult, compared to some of the other problems you have to solve, but it's very tedious and error prone. It is not something I would like to focus on.

[Antlr](http://www.antlr.org/) allows me to tackle exactly that problem: I can write the grammar in a language that is easy to use and maintain, and Antlr will generate the parser for me (more or less, more on parsing later).

The downside is the runtime dependency on Antlr. I'd rather have no runtime dependencies.

# Groovy

I use [Groovy](http://groovy.codehaus.org/) for writing tests for Marco. Groovy is a great language for writing DSLs, and tests written using the [Spock Framework](https://code.google.com/p/spock/) are very easy to write and to read. So far it has been the best testing setup I have ever used.

# Gradle

[Gradle](http://www.gradle.org/) is the build system I use to replace Ant or Maven. It uses a Groovy DSL instead of XML. It's very easy to setup and use. It really gets out of your way. I have also tried [Buildr](http://buildr.apache.org/) and didn't feel like it worked well for me.

Gradle also integrates well with IntelliJ, by generating the project files for me. It also builds and runs the Groovy tests and generates the antlr grammars. All that with very little code.
