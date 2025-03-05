# tmux Pane Layouts

tmux provides several built-in layouts that can be cycled through using `Prefix + Space`. Below are ASCII representations of these layouts.

## Even Horizontal
Panes are arranged side by side, all with equal width.

```
┌────────┬────────┬────────┐
│        │        │        │
│        │        │        │
│        │        │        │
│        │        │        │
│        │        │        │
│        │        │        │
└────────┴────────┴────────┘
```

## Even Vertical
Panes are stacked on top of each other, all with equal height.

```
┌─────────────────────────┐
│                         │
│                         │
├─────────────────────────┤
│                         │
│                         │
├─────────────────────────┤
│                         │
│                         │
└─────────────────────────┘
```

## Main Horizontal
One large pane at the top, with smaller panes of equal size below.

```
┌─────────────────────────┐
│                         │
│                         │
│                         │
├────────┬────────┬───────┤
│        │        │       │
│        │        │       │
└────────┴────────┴───────┘
```

## Main Vertical
One large pane on the left, with smaller panes of equal size to the right.

```
┌────────┬─────────────────┐
│        │                 │
│        │                 │
│        ├─────────────────┤
│        │                 │
│        │                 │
│        ├─────────────────┤
│        │                 │
└────────┴─────────────────┘
```

## Tiled
All panes are arranged to have the same size.

```
┌────────┬────────┐
│        │        │
│        │        │
├────────┼────────┤
│        │        │
│        │        │
└────────┴────────┘
```

To cycle through these layouts, press `Prefix + Space`.