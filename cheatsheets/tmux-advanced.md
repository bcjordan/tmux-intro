# Advanced Tmux Commands Cheatsheet

## Command Mode

Enter command mode with `prefix + :`

| Command | Description |
|---------|-------------|
| `:new-window -n name` | Create a new window with name |
| `:kill-window` | Kill the current window |
| `:kill-window -t name` | Kill window by name |
| `:split-window -h` | Split pane horizontally |
| `:split-window -v` | Split pane vertically |
| `:select-layout even-horizontal` | Set layout to even horizontal |
| `:select-layout even-vertical` | Set layout to even vertical |
| `:select-layout main-horizontal` | Set layout to main horizontal |
| `:select-layout main-vertical` | Set layout to main vertical |
| `:select-layout tiled` | Set layout to tiled |
| `:set-option -g status-position top` | Move status bar to top |
| `:set-option -g status-position bottom` | Move status bar to bottom |
| `:setw synchronize-panes on` | Enable synchronized panes |
| `:setw synchronize-panes off` | Disable synchronized panes |
| `:command-prompt` | Open command prompt |
| `:refresh-client` | Refresh client |
| `:display-message "message"` | Display a message |

## Session Management

| Command | Description |
|---------|-------------|
| `:new-session -s name` | Create a new session |
| `:kill-session -t name` | Kill a session |
| `:switch-client -t name` | Switch to another session |
| `:rename-session -t old new` | Rename a session |
| `:detach-client` | Detach current client |
| `:detach-client -a` | Detach all other clients |
| `:list-sessions` | List all sessions |
| `:source-file path` | Source a config file |

## Window Management

| Command | Description |
|---------|-------------|
| `:move-window -t n` | Move current window to position n |
| `:swap-window -s src -t dst` | Swap windows |
| `:link-window -s src:win -t dst:pos` | Link window from another session |
| `:unlink-window -t target` | Unlink a window |
| `:rename-window name` | Rename current window |
| `:find-window pattern` | Find a window matching pattern |
| `:next-layout` | Change to next layout |
| `:previous-layout` | Change to previous layout |

## Pane Management

| Command | Description |
|---------|-------------|
| `:join-pane -s src:win.pane -t dst:win.pane` | Join a pane from one window to another |
| `:break-pane` | Break pane into its own window |
| `:resize-pane -U n` | Resize pane up by n cells |
| `:resize-pane -D n` | Resize pane down by n cells |
| `:resize-pane -L n` | Resize pane left by n cells |
| `:resize-pane -R n` | Resize pane right by n cells |
| `:resize-pane -Z` | Toggle pane zoom |
| `:select-pane -L/R/U/D` | Select pane left/right/up/down |
| `:select-pane -t :.+` | Select next pane |
| `:select-pane -t :.-` | Select previous pane |
| `:send-keys -t target "command"` | Send command to pane |
| `:capture-pane -b name` | Capture pane content to buffer |

## Buffer and Copy Mode

| Command | Description |
|---------|-------------|
| `:copy-mode` | Enter copy mode |
| `:list-buffers` | List all paste buffers |
| `:choose-buffer` | Choose which buffer to paste from |
| `:paste-buffer -b name` | Paste a specific buffer |
| `:save-buffer -b name path` | Save buffer to file |
| `:delete-buffer -b name` | Delete a specific buffer |

## Scripting Tmux

Useful commands for tmux scripting:

```bash
# Create a new session in detached mode
tmux new-session -d -s mysession

# Create and name windows
tmux new-window -t mysession:1 -n "window-name"

# Split windows
tmux split-window -h -t mysession:1.0
tmux split-window -v -t mysession:1.1

# Send commands to specific panes
tmux send-keys -t mysession:1.0 "command" C-m

# Set working directory for a pane
tmux send-keys -t mysession:1.0 "cd /path/to/dir" C-m

# Resize panes
tmux resize-pane -t mysession:1.0 -D 10

# Select a specific pane
tmux select-pane -t mysession:1.0

# Set window layout
tmux select-layout -t mysession:1 main-vertical

# Attach to session
tmux attach-session -t mysession
```

## Advanced Layouts

```bash
# Main pane on left, others on right
:select-layout main-vertical

# Main pane on top, others on bottom
:select-layout main-horizontal

# Equal columns
:select-layout even-horizontal

# Equal rows
:select-layout even-vertical

# Tiled layout
:select-layout tiled
```

## Shared Sessions

```bash
# Create a shared session (User 1)
tmux -S /tmp/shared-session new -s shared
chmod 777 /tmp/shared-session

# Join the shared session (User 2)
tmux -S /tmp/shared-session attach -t shared

# List clients connected to a session
tmux list-clients -t shared
```

## Named Pipes

```bash
# Create a named pipe
mkfifo /tmp/tmux-pipe

# Start watching the pipe in a tmux session
tmux new-session "cat /tmp/tmux-pipe | bash"

# Send commands to the pipe
echo "ls -la" > /tmp/tmux-pipe
```

## Format Strings

Useful for scripting and status line customization:

```bash
#{session_name}     - Current session name
#{window_index}     - Current window index
#{window_name}      - Current window name
#{pane_index}       - Current pane index
#{host}             - Hostname
#{pane_current_path} - Current path in active pane
#{pane_width}       - Width of active pane
#{pane_height}      - Height of active pane
```

## Advanced Configurations

```bash
# Mouse wheel scrolling
set -g mouse on
bind -n WheelUpPane if-shell -F -t = "#{mouse_any_flag}" "send-keys -M" "if -Ft= '#{pane_in_mode}' 'send-keys -M' 'copy-mode -e'"

# Focus events enabled for terminals that support them
set -g focus-events on

# Super useful when using "grouped sessions" and multi-monitor setup
setw -g aggressive-resize on

# Activity monitoring
setw -g monitor-activity on
set -g visual-activity on

# Automatically set window title
set-window-option -g automatic-rename on
set-option -g set-titles on
```