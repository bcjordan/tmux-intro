# Tmux Quick Start Guide
*Author: Y5489P*

This quick-start guide will help you get up and running with Tmux in minutes. It covers the essential commands and workflows to make you productive immediately.

## What is Tmux?

Tmux (Terminal Multiplexer) allows you to:
- Run multiple terminal sessions within a single window
- Keep programs running after you disconnect
- Split your terminal into multiple panes
- Switch between various programs quickly
- Create multiple windows (like tabs) within a session

## Installation

### macOS
```bash
brew install tmux
```

### Ubuntu/Debian
```bash
sudo apt update
sudo apt install tmux
```

### CentOS/RHEL
```bash
sudo yum install tmux
```

## Basic Concepts

Tmux has three main components:
1. **Sessions**: A collection of windows (like a project workspace)
2. **Windows**: Like tabs in a browser (each containing one or more panes)
3. **Panes**: Split views within a window

## Essential Commands

### Starting Tmux

```bash
# Start a new session
tmux

# Start a named session
tmux new -s myproject

# Attach to an existing session
tmux attach -t myproject

# List sessions
tmux ls
```

### The Prefix Key

All Tmux commands start with a prefix key, which by default is `Ctrl+b`. We'll denote this as `<prefix>` in this guide.

### Session Management

```bash
# Detach from session
<prefix> d

# List and switch sessions
<prefix> s

# Rename current session
<prefix> $
```

### Window Management

```bash
# Create a new window
<prefix> c

# Switch to next window
<prefix> n

# Switch to previous window
<prefix> p

# Switch to window by number
<prefix> 0-9

# List all windows
<prefix> w

# Rename current window
<prefix> ,

# Close current window
<prefix> &
```

### Pane Management

```bash
# Split pane horizontally
<prefix> "

# Split pane vertically
<prefix> %

# Move between panes
<prefix> arrow keys

# Toggle pane full-screen
<prefix> z

# Close current pane
<prefix> x

# Show pane numbers (then press number to select)
<prefix> q

# Resize panes
<prefix> Ctrl+arrow keys
```

## 5-Minute Starter Workflow

1. Start a new named session:
   ```bash
   tmux new -s dev
   ```

2. Create a split view:
   - Press `<prefix> %` for a vertical split
   - Press `<prefix> "` for a horizontal split

3. Move between panes using `<prefix>` + arrow keys

4. Create a new window with `<prefix> c`

5. Switch between windows with `<prefix> n` (next) and `<prefix> p` (previous)

6. Detach from the session with `<prefix> d`

7. Later, reattach to your session:
   ```bash
   tmux attach -t dev
   ```

## Common Tasks

### Copy/Paste in Tmux

1. Enter copy mode: `<prefix> [`
2. Navigate to start point
3. Press `Space` to start selection
4. Move to end point
5. Press `Enter` to copy
6. Paste with `<prefix> ]`

### Creating a Standard Development Layout

```bash
# Create a new session with a window for editing
tmux new -s dev -n editor

# Split the window for a terminal/REPL
<prefix> "

# Create a new window for running tests
<prefix> c
<prefix> ,    # Rename to "tests"

# Create a window for git operations
<prefix> c
<prefix> ,    # Rename to "git"
```

## Advanced Tips

### Customizing Tmux

Create a `~/.tmux.conf` file for customization:

```
# Use Ctrl+a as prefix (like screen)
unbind C-b
set -g prefix C-a
bind C-a send-prefix

# More intuitive split shortcuts
bind | split-window -h
bind - split-window -v

# Enable mouse mode
set -g mouse on

# Start window and pane numbering at 1
set -g base-index 1
setw -g pane-base-index 1
```

After editing, reload with: `<prefix> :source-file ~/.tmux.conf`

### Tmux Command Mode

Access Tmux's command mode with `<prefix> :`, then type commands like:
- `new-window -n name`
- `split-window -h`
- `resize-pane -D 10`

## Next Steps

Now that you have the basics, explore:
1. More advanced window and pane layouts
2. Custom key bindings
3. Status bar customization
4. Scripting Tmux sessions
5. Tmux plugins

For complete documentation, see the [full Tmux command reference](tmux-command-reference.md) in this repository.