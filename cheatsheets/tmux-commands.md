# Tmux Command Cheatsheet
*Compiled by M91232*

## General Commands

| Command | Description |
|---------|-------------|
| `tmux` | Start a new tmux session |
| `tmux new -s mysession` | Start a new session with name |
| `tmux ls` | List all tmux sessions |
| `tmux attach` or `tmux a` | Attach to the last session |
| `tmux attach -t mysession` | Attach to a specific session |
| `tmux kill-session -t mysession` | Kill a specific session |
| `tmux kill-server` | Kill the tmux server and all sessions |

## Prefix Key
By default, the prefix key is `Ctrl+b`. In many configurations, it's changed to `Ctrl+a`.

## Window Management

| Command | Description |
|---------|-------------|
| `<prefix> c` | Create a new window |
| `<prefix> ,` | Rename current window |
| `<prefix> &` | Kill current window |
| `<prefix> n` | Move to next window |
| `<prefix> p` | Move to previous window |
| `<prefix> 0-9` | Switch to window 0-9 |
| `<prefix> f` | Find window by name |
| `<prefix> w` | List all windows |

## Pane Management

| Command | Description |
|---------|-------------|
| `<prefix> %` | Split pane vertically |
| `<prefix> "` | Split pane horizontally |
| `<prefix> o` | Cycle through panes |
| `<prefix> q` | Show pane numbers (press number to select) |
| `<prefix> x` | Kill current pane |
| `<prefix> z` | Toggle pane zoom |
| `<prefix> {` | Move current pane left |
| `<prefix> }` | Move current pane right |
| `<prefix> ⍽` (Space) | Cycle through layouts |

## Navigation

| Command | Description |
|---------|-------------|
| `<prefix> ↑` | Move to pane above |
| `<prefix> ↓` | Move to pane below |
| `<prefix> ←` | Move to pane left |
| `<prefix> →` | Move to pane right |

## Session Management

| Command | Description |
|---------|-------------|
| `<prefix> d` | Detach from session |
| `<prefix> $` | Rename current session |
| `<prefix> s` | List sessions |
| `<prefix> (` | Move to previous session |
| `<prefix> )` | Move to next session |

## Copy Mode (Vi mode)

| Command | Description |
|---------|-------------|
| `<prefix> [` | Enter copy mode |
| `q` | Quit copy mode |
| `v` | Start selection |
| `y` | Copy selection |
| `<prefix> ]` | Paste buffer |

## Customization

| Command | Description |
|---------|-------------|
| `<prefix> :` | Enter command mode |
| `tmux source-file ~/.tmux.conf` | Reload config file |
| `<prefix> r` | Reload config (if configured) |