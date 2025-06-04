---
title: "Mac ABC Extended layout on NixOS"
description: "So I can type many languages without switching layouts and both NixOS and macOS"
pubDate: 2025-06-04
---

I previously discovered [I can now type `ţ` on macOS](/posts/2025-05-25-i-can-now-type-z̧.md), but
now I want to have my Linux layout match macOS ABC Extended so I can type with the same dead keys on both systems.

I already use the `xkb_variant mac`. It matches some of the dead keys like `e`, `i`, `n` and `u` which are great for Portuguese (é, â) and German (ü, ß):

```
input "type:keyboard" {
  xkb_model pc104
  xkb_layout us
  xkb_variant mac
  # lv3:lalt_switch makes the left Alt key a third-level chooser key (keyd remaps Start to be Alt)
  xkb_options "lv3:lalt_switch"
  repeat_delay 250
  repeat_rate 40
}
```

But as it turns out, `option+c` in this variant outputs `ç`, not a dead `,`.

Let's fix it because who can live without `ţ`? ţac-pac!!

First we need a new layout that inherits from my current one `us(mac)` and simply overrides the one key we need, `c` (`AB03`).

```
default partial default alphanumeric_keys
xkb_symbols "extended-sequoia" {
  include "us(mac)"

  name[Group1]= "layout matching ABC extended on macos Sequoia";

  key <AB03> { [ c, C,  dead_cedilla, dead_cedilla ] };
};
```

Then we install it in NixOS with a configuration option:

```nix
services.xserver = {
  enable = true;

  xkb = {
    model = "pc104";
    layout = "abc";
    variant = "extended-sequoia";
    options = "terminate:ctrl_alt_bksp,lv3:lwin_switch";
    extraLayouts = {
      "abc" = {
        description = "ABC layout similar to macOS";
        languages = [ "eng" ];
        symbolsFile = ./symbols/abc.xkb;
      };
    };
  };
};
```

And in Sway config:
```
input "type:keyboard" {
  xkb_model pc104
  xkb_layout abc
  xkb_variant extended-sequoia
  # lv3:lalt_switch makes the left Alt key a third-level chooser key (keyd remaps Start to be Alt)
  xkb_options "lv3:lalt_switch"
  repeat_delay 250
  repeat_rate 40
}
```

There we go! Şåa-ţi c∫a m∫a f∫acåur∫am! **OH NO**. Some more fixes for `macron` and `breve` in Romanian:

```
default partial default alphanumeric_keys
xkb_symbols "extended-sequoia" {
  include "us(mac)"

  name[Group1]= "layout matching ABC extended on macos Sequoia";

  key <AC01> { [ a, A,  dead_macron , dead_macron  ] };

  key <AB03> { [ c, C,  dead_cedilla, dead_cedilla ] };
  key <AB05> { [ b, B,  dead_breve  , dead_breve   ] };
};
```

And now I have a place where I can fix any differences between keys on macOS and NixOS.

The final (and eventually probably updated) version can be found in [my dotfiles](https://github.com/juanibiapina/dotfiles/blob/800babce29116fae7d80b6f4186c769c0a435c91/nix/hosts/desktop/symbols/abc.xkb)

# References

- How to define new xkb layouts: https://www.x.org/releases/current/doc/xorg-docs/input/XKB-Enhancing.html#Defining_New_Layouts
- Source code for `us(mac)` xkb_variant: https://gitlab.freedesktop.org/xkeyboard-config/xkeyboard-config/-/blob/master/symbols/us#L730
- extra_layout options in NixOS: https://search.nixos.org/options?channel=unstable&show=services.xserver.xkb.extraLayouts
