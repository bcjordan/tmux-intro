# tmux Cheatsheet

This is a quick reference guide for tmux commands. The default prefix key is `Ctrl+b`.

## Sessions

| Command | Description |
|---------|-------------|
| `tmux new -s <name>` | Create a new session with name |
| `tmux ls` | List all sessions |
| `tmux attach -t <name>` | Attach to a session |
| `tmux kill-session -t <name>` | Kill a session |
| `Prefix d` | Detach from current session |
| `Prefix $` | Rename current session |
| `Prefix s` | List sessions and select one |

## Windows

| Command | Description |
|---------|-------------|
| `Prefix c` | Create a new window |
| `Prefix ,` | Rename current window |
| `Prefix n` | Move to next window |
| `Prefix p` | Move to previous window |
| `Prefix [0-9]` | Switch to window [0-9] |
| `Prefix w` | List windows and select one |
| `Prefix &` | Kill current window |
| `Prefix f` | Find window by name |

## Panes

| Command | Description |
|---------|-------------|
| `Prefix %` | Split pane horizontally |
| `Prefix "` | Split pane vertically |
| `Prefix arrow` | Move to pane in direction of arrow |
| `Prefix o` | Cycle through panes |
| `Prefix q` | Show pane numbers |
| `Prefix z` | Toggle pane zoom |
| `Prefix {` | Move current pane left |
| `Prefix }` | Move current pane right |
| `Prefix Ctrl+arrow` | Resize pane in direction of arrow |
| `Prefix x` | Kill current pane |
| `Prefix !` | Convert pane to window |
| `Prefix space` | Cycle through pane layouts |

## Copy Mode (Prefix [)

| Command | Description |
|---------|-------------|
| `Space` | Start selection |
| `Enter` | Copy selection |
| `Esc` | Clear selection |
| `q` | Exit copy mode |
| `g` | Go to top |
| `G` | Go to bottom |
| `/` | Search forward |
| `?` | Search backward |
| `n` | Next search match |
| `N` | Previous search match |

## Miscellaneous

| Command | Description |
|---------|-------------|
| `Prefix :` | Enter command mode |
| `Prefix ?` | Show key bindings |
| `Prefix t` | Show time |
| `Prefix ~` | Show messages |
| `Prefix r` | Reload tmux configuration |