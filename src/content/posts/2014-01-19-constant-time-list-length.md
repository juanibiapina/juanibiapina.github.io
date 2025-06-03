---
title: "Constant Time List Length"
description: "Optimizing the list length function in Marco."
pubDate: 2014-01-19
---

## The current length

After I decided to implement Tail Call Optimization in Marco, I realized there were many other possible optimizations there were much simpler, and could possible make a huge difference.

A simple one is list length. Here is the previous non-optimized version:

```racket
(def length (function (l)
              (if (nil? l)
                0
                (+ 1 (length (tail l))))))
```

The cool thing about it, is that it is implemented in Marco itself. That was very rewarding for me. On the other hand, it performs horribly. It has to go through the whole list every time. How can we solve this?

## Dynamic dispatch and cached length

List are immutable in Marco, so the size of a list will never change. That means we can cache its length. Combine that with dynamic dispatch, and we get this solution:

```java
public class MarcoNil implements MarcoList {
    public int length() {
        return 0;
    }
}

public class MarcoPair implements MarcoList {
    private MarcoObject first;
    private MarcoObject second;
    private boolean isList;
    private int length;

    public MarcoPair(MarcoObject first, MarcoObject second) {
        this.first = first;
        this.second = second;
        this.isList = second.isList();
        if (isList()) {
            this.length = 1 + Cast.toList(second).length();
        }
    }

    @Override
    public int length() {
        return length;
    }
}
```

Nil is a list with length zero. A pair is a list (if its second element is a list) whose size is always one plus the length of the tail list. The logic here is the same as before, but this is implemented in constant time (one addition when consing to a list).

How big is the difference?

## Results

If we take the code [from this previous post with trampolines](/2013-12-16-trampolining-in-marco/) and replace the `my-length` function with our new optimized length (and also optimized closures), we get these new results:

Previous results with optimized closures:

    100  : 0.81s user 0.05s system 151% cpu 0.570 total
    500  : 1.64s user 0.12s system 142% cpu 1.229 total
    1000 : 2.95s user 0.20s system 117% cpu 2.691 total
    5000 : 38.57s user 0.40s system 102% cpu 38.204 total
    10000: 149.57s user 1.09s system 101% cpu 2:29.08 total

New results:

    100 0.70s user 0.05s system 148% cpu 0.505 total
    500 1.29s user 0.07s system 165% cpu 0.823 total
    1000 1.53s user 0.11s system 150% cpu 1.085 total
    5000 3.66s user 0.18s system 119% cpu 3.225 total
    10000 6.56s user 0.19s system 112% cpu 5.997 total
    100000 65.42s user 0.56s system 102% cpu 1:04.30 total

That's very remarkable. We got to a hundred thousand. Only nine hundred thousand to go.