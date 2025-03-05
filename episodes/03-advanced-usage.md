# Episode 3: Advanced Tmux Usage

## Overview
In this episode, we explore advanced Tmux features including session management, command mode, layouts, synchronizing panes, and scripting Tmux for automation.

## Script

### Command Mode
Tmux has a powerful command mode accessible with `prefix + :` that allows direct execution of tmux commands.

Common commands:
```
# Create new window
:new-window -n name

# Kill current window
:kill-window

# Split current pane
:split-window -h
:split-window -v

# Select layout
:select-layout even-horizontal
:select-layout even-vertical
:select-layout main-horizontal
:select-layout main-vertical
:select-layout tiled
```

### Layouts
Tmux provides several built-in layouts that you can cycle through:

- `prefix + space`: Cycle through layouts
- `prefix + Alt-1`: Even horizontal layout
- `prefix + Alt-2`: Even vertical layout
- `prefix + Alt-3`: Main horizontal layout
- `prefix + Alt-4`: Main vertical layout
- `prefix + Alt-5`: Tiled layout

### Synchronized Panes
You can send the same commands to multiple panes simultaneously:

```
# Enable synchronized panes
:setw synchronize-panes on

# Disable synchronized panes
:setw synchronize-panes off
```

This is extremely useful for managing multiple servers or running the same commands across different environments.

### Advanced Copy Mode
Using copy mode with vim keybindings for efficient text selection:

1. Enter copy mode: `prefix + [`
2. Navigate to text using vim movement keys (hjkl, w, b, etc.)
3. Start selection: `v` (if using vim mode)
4. Yank text: `y`
5. Paste text: `prefix + ]`

### Window and Session Management

#### Session Management
```
# Create a new session
:new-session -s name

# Switch to another session
:switch-client -t name

# Detach other clients
:detach-client -a

# List all sessions
:list-sessions
```

#### Window Management
```
# Move window to a different position
:move-window -t 3

# Swap windows
:swap-window -s 2 -t 3

# Link window from another session
:link-window -s othersession:2 -t 5
```

### Pane Synchronization for Multi-Server Management
Demo: Using synchronized panes to manage multiple servers simultaneously
1. Creating multiple panes
2. Connecting to different servers
3. Enabling synchronization
4. Running commands across all servers
5. Disabling synchronization

### Scripting Tmux
You can automate Tmux setup using shell scripts:

```bash
#!/bin/bash
# Create a new session
tmux new-session -d -s dev -n editor

# Create windows
tmux new-window -t dev:1 -n console
tmux new-window -t dev:2 -n logs

# Split the editor window
tmux split-window -h -t dev:0
tmux split-window -v -t dev:0.1

# Run commands in panes
tmux send-keys -t dev:0.0 'vim' C-m
tmux send-keys -t dev:0.1 'ls -la' C-m
tmux send-keys -t dev:0.2 'git status' C-m

# Attach to the session
tmux attach-session -t dev
```

### Shared Sessions
Multiple users can connect to the same Tmux session:

User 1:
```bash
tmux -S /tmp/shared-session new -s shared
chmod 777 /tmp/shared-session
```

User 2:
```bash
tmux -S /tmp/shared-session attach -t shared
```

This is great for pair programming or collaborative troubleshooting.

### Using Named Pipes with Tmux
You can send commands to a running Tmux session using named pipes:

```bash
# Create a named pipe
mkfifo /tmp/tmux-pipe

# Start watching the pipe in a Tmux session
tmux new-session "cat /tmp/tmux-pipe | bash"

# Send commands
echo "ls -la" > /tmp/tmux-pipe
```

## Demo
The video will include a live demo showing:
1. Using command mode for various operations
2. Working with different layouts
3. Setting up synchronized panes and managing multiple servers
4. Creating and running a Tmux automation script
5. Setting up a shared session
6. Using named pipes with Tmux

## Exercises
1. Create a custom layout with multiple panes
2. Write a script to set up a development environment with Tmux
3. Practice managing multiple servers with synchronized panes
4. Set up a shared session for pair programming
5. Create a script that uses named pipes to control a Tmux session

## Resources
- [Sample Tmux Scripting Examples](/scripts/dev-environment-setup.sh)
- [Advanced Tmux Commands Cheatsheet](/cheatsheets/tmux-advanced.md)