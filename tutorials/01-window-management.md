# Window Management in tmux

Windows in tmux are similar to tabs in a browser. Each window occupies the entire screen and can be divided into panes. This tutorial covers window management in tmux.

## Creating Windows

To create a new window:
```bash
Prefix + c
```

## Navigating Between Windows

To navigate between windows:
```bash
Prefix + n    # Next window
Prefix + p    # Previous window
Prefix + [0-9] # Window by number
```

You can also list all windows and select one:
```bash
Prefix + w
```

## Renaming Windows

By default, windows are named with the command running in them. To rename a window:
```bash
Prefix + ,
```

## Reordering Windows

To move the current window to a different position:
```bash
Prefix + .
```
When prompted, enter the window position number.

## Closing Windows

To close the current window:
```bash
Prefix + &
```
You will be asked to confirm before closing.

## Finding Windows

To find a window by name:
```bash
Prefix + f
```
Enter a search string, and tmux will select the window that matches.

## Window Status in Status Bar

The status bar at the bottom of tmux shows your windows with their numbers and names:

```bash
[0] bash  [1] vim* [2] htop
```

The `*` indicates the current window.

## Window Options

You can set options for specific windows. For example, to monitor a window for activity:

```bash
# Inside tmux
Prefix + :
setw -g monitor-activity on
```

## Using Multiple Windows Effectively

### For Development
- Window 1: Code editor
- Window 2: Build/compile process
- Window 3: Testing
- Window 4: Version control
- Window 5: Logs

### For Server Management
- Window 1: System monitoring
- Window 2: Log files
- Window 3: Service control
- Window 4: Database console

## Hands-on Exercise

1. Start tmux with `tmux`
2. Create three windows using `Prefix + c`
3. Rename each window (`Prefix + ,`) to "edit", "build", and "test"
4. Navigate through windows using `Prefix + n` and `Prefix + p`
5. Jump directly to the "build" window using `Prefix + 2` (assuming it's window 1)
6. Practice finding a window with `Prefix + f` and typing part of a window name
7. Close the "test" window with `Prefix + &`

## Advanced: Scripting Window Creation

You can automate window creation with scripts. Here's a simple example:

```bash
# Create a new session with a window named "code"
tmux new-session -d -s dev -n code

# Create additional windows
tmux new-window -t dev:1 -n build
tmux new-window -t dev:2 -n test
tmux new-window -t dev:3 -n git

# Attach to the session
tmux attach-session -t dev
```

For a complete example, see [dev-session.sh](../examples/scripts/dev-session.sh) in this repository.

## Next Steps

Now that you understand window management, proceed to the next tutorial on [Pane Layouts](02-pane-layouts.md) to learn how to divide windows into panes.