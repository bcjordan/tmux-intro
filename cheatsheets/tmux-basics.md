# Tmux Basic Commands Cheatsheet

## Session Management

| Command | Description |
|---------|-------------|
| `tmux` | Start a new unnamed session |
| `tmux new -s name` | Start a new named session |
| `tmux ls` | List all sessions |
| `tmux attach -t name` | Attach to a named session |
| `tmux a -t name` | Shorthand for attach |
| `tmux kill-session -t name` | Kill a named session |
| `tmux kill-server` | Kill the tmux server and all sessions |
| `tmux switch -t name` | Switch to a different session |
| `tmux rename-session -t old new` | Rename a session |

## Key Bindings (Prefix: Ctrl+b)

### Windows

| Key Binding | Description |
|-------------|-------------|
| `Prefix c` | Create a new window |
| `Prefix ,` | Rename current window |
| `Prefix &` | Kill current window |
| `Prefix p` | Previous window |
| `Prefix n` | Next window |
| `Prefix 0-9` | Switch to window number |
| `Prefix f` | Find window by name |
| `Prefix w` | List all windows |
| `Prefix .` | Move window to a different index |

### Panes

| Key Binding | Description |
|-------------|-------------|
| `Prefix %` | Split pane vertically |
| `Prefix "` | Split pane horizontally |
| `Prefix arrow` | Navigate between panes |
| `Prefix q` | Show pane numbers (press number to select) |
| `Prefix x` | Kill current pane |
| `Prefix z` | Toggle pane zoom (full-screen) |
| `Prefix {` | Move current pane left |
| `Prefix }` | Move current pane right |
| `Prefix Ctrl+arrow` | Resize pane |
| `Prefix !` | Convert pane to window |

### Copy Mode (Vi-like)

| Key Binding | Description |
|-------------|-------------|
| `Prefix [` | Enter copy mode |
| `Space` | Start selection |
| `Enter` | Copy selection |
| `Prefix ]` | Paste selection |
| `q` | Quit copy mode |
| `/` | Search forward |
| `?` | Search backward |
| `n` | Next search match |
| `N` | Previous search match |

## Command Mode

| Key Binding | Description |
|-------------|-------------|
| `Prefix :` | Enter command mode |

## Miscellaneous

| Key Binding | Description |
|-------------|-------------|
| `Prefix d` | Detach from session |
| `Prefix t` | Show clock |
| `Prefix ?` | List all key bindings |
| `Prefix :setw synchronize-panes on` | Synchronize input to all panes |
| `Prefix :setw synchronize-panes off` | Disable synchronized panes |