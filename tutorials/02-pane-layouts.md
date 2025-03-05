# Pane Layouts in tmux

Panes allow you to divide a tmux window into multiple sections, each running its own command. This tutorial covers creating, managing, and customizing pane layouts.

## Creating Panes

To split the current pane:

```
Prefix + %   # Split horizontally (left/right)
Prefix + "   # Split vertically (top/bottom)
```

## Navigating Between Panes

There are several ways to navigate between panes:

```
Prefix + arrow keys   # Move to pane in that direction
Prefix + o            # Cycle through panes
Prefix + q            # Show pane numbers, then press the number to select
```

## Resizing Panes

To resize the current pane:

```
Prefix + Ctrl + arrow keys  # Resize in that direction
Prefix + Alt + arrow keys   # Resize in 5-cell increments
```

You can also use specific resize commands:

```
# In command mode (Prefix + :)
resize-pane -D 10    # Resize down by 10 cells
resize-pane -U 10    # Resize up by 10 cells
resize-pane -L 10    # Resize left by 10 cells
resize-pane -R 10    # Resize right by 10 cells
```

## Built-in Layouts

tmux provides several built-in layouts that you can cycle through:

```
Prefix + space  # Cycle through layouts
```

The built-in layouts include:

- **Even Horizontal**: All panes are arranged side by side
- **Even Vertical**: All panes are stacked on top of each other
- **Main Horizontal**: One large pane on top, smaller panes on bottom
- **Main Vertical**: One large pane on left, smaller panes on right
- **Tiled**: All panes are arranged to have the same size

For visual examples, see [pane-layouts.md](../assets/pane-layouts.md).

## Zooming Panes

To temporarily expand a pane to full window size and back:

```
Prefix + z
```

## Moving Panes

To change the position of panes:

```
Prefix + {   # Move current pane left
Prefix + }   # Move current pane right
```

## Converting Between Windows and Panes

To convert a pane to a window:

```
Prefix + !
```

To join a window as a pane to the current window:

```
# In command mode (Prefix + :)
join-pane -s window_number
```

## Closing Panes

To close the current pane:

```
Prefix + x
```

## Synchronized Panes

To send the same commands to all panes in a window:

```
# In command mode (Prefix + :)
setw synchronize-panes on  # Enable
setw synchronize-panes off # Disable
```

## Practical Use Cases

### Development Environment
- Editor in the main pane
- Terminal for running commands in another pane
- Output/logs in a third pane

### Server Management
- System monitoring (htop) in one pane
- Logs in another pane
- Command line in a third pane

### Data Analysis
- Code editor in one pane
- Data visualization in another pane
- Terminal for commands in a third pane

## Hands-on Exercise

1. Start tmux with `tmux`
2. Split the window horizontally with `Prefix + %`
3. Split the right pane vertically with `Prefix + "` (while in the right pane)
4. Navigate between panes using `Prefix + arrow keys`
5. Try resizing panes with `Prefix + Ctrl + arrow keys`
6. Cycle through built-in layouts with `Prefix + space`
7. Zoom in on a pane with `Prefix + z` and zoom out with the same command
8. Practice moving panes around with `Prefix + {` and `Prefix + }`
9. Close a pane with `Prefix + x`

## Advanced: Creating Complex Layouts with Scripts

You can create complex pane layouts programmatically. Here's an example:

```bash
# Create a new session
tmux new-session -d -s dev

# Split the window into three panes
tmux split-window -h
tmux split-window -v

# Send commands to each pane
tmux select-pane -t 0
tmux send-keys "vim" C-m
tmux select-pane -t 1
tmux send-keys "ls -la" C-m
tmux select-pane -t 2
tmux send-keys "htop" C-m

# Attach to the session
tmux attach -t dev
```

For a full example, see [dev-session.sh](../examples/scripts/dev-session.sh) in this repository.

## Next Steps

Now that you understand pane layouts, proceed to the next tutorial on [Customizing tmux](03-customizing-tmux.md) to learn how to personalize your tmux configuration.