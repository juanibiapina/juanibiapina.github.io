---
title: "Diffs for reviewing agentic code"
description: "How do I keep track of so much code?"
pubDatetime: 2026-04-21T00:00:00Z
tags:
  - ai
  - tooling
  - tree-sitter
ogImage: "../../assets/blog/scope-expanded-diffs/hero.jpg"
---

I review a lot of AI generated code.

Here's what it looks like:

```rust
    line: &str,
    width: usize,
    scopes: &[HunkScopes],
    scope_expanded: bool, // [!code ++]
) -> Vec<Line<'static>> {
    if let Some(content) = line.strip_prefix('+').filter(|_| !line.starts_with("+++")) {
        return vec![syntax_diff_line(content, DIFF_ADDED_BG, &entry.path, width)];
    // ...
                .find(|s| s.hunk_new_start == new_start)
                .map(|s| s.ancestors.as_slice())
        });
        return render_hunk_separator(line, &entry.path, width, ancestors); // [!code --]
        return render_hunk_separator(line, &entry.path, width, ancestors, scope_expanded); // [!code ++]
    }

    vec![Line::from(Span::raw(fit_line(line, width)))]
```

What is even going on?

Try this version instead:

```rust
fn render_diff_line(
    entry: &HistoryEntry,
    line: &str,
    width: usize,
    scopes: &[HunkScopes],
    scope_expanded: bool, // [!code ++]
) -> Vec<Line<'static>> {
    if let Some(content) = line.strip_prefix('+').filter(|_| !line.starts_with("+++")) {
        return vec![syntax_diff_line(content, DIFF_ADDED_BG, &entry.path, width)];
    }
    if let Some(content) = line.strip_prefix('-').filter(|_| !line.starts_with("---")) {
        return vec![syntax_diff_line(
            content,
            DIFF_DELETED_BG,
            &entry.path,
            width,
        )];
    }
    if let Some(content) = line.strip_prefix(' ') {
        return vec![syntax_diff_line(content, Color::Reset, &entry.path, width)];
    }
    if line.starts_with("@@") {
        let ancestors = parse_hunk_new_start(line).and_then(|new_start| {
            scopes
                .iter()
                .find(|s| s.hunk_new_start == new_start)
                .map(|s| s.ancestors.as_slice())
        });
        return render_hunk_separator(line, &entry.path, width, ancestors); // [!code --]
        return render_hunk_separator(line, &entry.path, width, ancestors, scope_expanded); // [!code ++]
    }

    vec![Line::from(Span::raw(fit_line(line, width)))]
}
```

This shows the entire function, and it's easy to see what changed: a new `scope_expanded` argument is added to the signature and passed through to `render_hunk_separator`. Easy to see in this diff. It also shows the entire function, which allows me to keep learning about the codebase since I don't literally type the code anymore.

Here is another example:

```rust
    entry_indices: Vec<usize>,
    diff_scroll: usize,
    diff_cache: Option<DiffCache>,
    show_expanded: bool, // [!code ++]
}

    // ...
            entry_indices: vec![0; trace_count],
            diff_scroll: 0,
            diff_cache: None,
            show_expanded: true, // [!code ++]
        }
    }
```

You can see a field is added and initialized, but it doesn't even show to what. Here's what I want to see:

```rust
struct AppState {
    focus: Focus,
    trace_index: usize,
    entry_indices: Vec<usize>,
    diff_scroll: usize,
    diff_cache: Option<DiffCache>,
    show_expanded: bool, // [!code ++]
}
```

```rust
    fn new(trace_count: usize) -> Self {
        Self {
            focus: Focus::Entries,
            trace_index: 0,
            entry_indices: vec![0; trace_count],
            diff_scroll: 0,
            diff_cache: None,
            show_expanded: true, // [!code ++]
        }
    }
```

This is possible using `git diff -W`, which can then be easily piped into [delta](https://github.com/dandavison/delta). There's also [difftastic](https://github.com/Wilfred/difftastic) which uses tree-sitter for diffing but it's limited to controlling diff context by number of lines.

What if we build something?
