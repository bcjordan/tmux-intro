# Tmux Command Reference
*Author: Y5489P*

This comprehensive reference documents all Tmux commands, organized by category and with detailed explanations of their usage.

## Command Syntax Notation

- Square brackets `[ ]` indicate optional arguments
- Angle brackets `< >` indicate required arguments
- Vertical bar `|` indicates alternatives

## Session Management

### Creating Sessions

| Command | Description | Example |
|---------|-------------|---------|
| `tmux` | Start a new unnamed session | `tmux` |
| `tmux new-session` | Same as above (can be shortened to `new`) | `tmux new` |
| `tmux new-session -s <name>` | Create a new named session | `tmux new-session -s dev` |
| `tmux new-session -d` | Create a detached session | `tmux new-session -d -s background` |
| `tmux new-session -c <directory>` | Create session with specified working directory | `tmux new-session -c ~/projects` |
| `tmux new-session -A -s <name>` | Attach to session if it exists, otherwise create it | `tmux new-session -A -s dev` |

### Managing Sessions

| Command | Description | Example |
|---------|-------------|---------|
| `tmux attach-session` | Attach to the most recently used session (can be shortened to `attach` or `a`) | `tmux attach` |
| `tmux attach-session -t <target>` | Attach to a specific session | `tmux attach-session -t dev` |
| `tmux detach-client` | Detach from current session | `tmux detach-client` |
| `tmux kill-session` | Kill current session | `tmux kill-session` |
| `tmux kill-session -t <target>` | Kill a specific session | `tmux kill-session -t old-session` |
| `tmux kill-server` | Kill the tmux server, and with it all sessions | `tmux kill-server` |
| `tmux list-sessions` | List all sessions (can be shortened to `ls`) | `tmux list-sessions` |
| `tmux rename-session <new-name>` | Rename current session (can be shortened to `rename`) | `tmux rename-session production` |
| `tmux rename-session -t <old-name> <new-name>` | Rename a specific session | `tmux rename-session -t 0 dev` |
| `tmux source-file <file>` | Load settings from a configuration file | `tmux source-file ~/.tmux.conf` |
| `tmux switch-client -t <target>` | Switch from one session to another | `tmux switch-client -t other-session` |

## Window Management

### Creating Windows

| Command | Description | Example |
|---------|-------------|---------|
| `tmux new-window` | Create a new window (can be shortened to `neww`) | `tmux new-window` |
| `tmux new-window -n <name>` | Create a named window | `tmux new-window -n editor` |
| `tmux new-window -c <directory>` | Create a window with specified working directory | `tmux new-window -c ~/projects` |
| `tmux new-window "<command>"` | Create a window running the specified command | `tmux new-window "top"` |

### Managing Windows

| Command | Description | Example |
|---------|-------------|---------|
| `tmux kill-window` | Kill the current window | `tmux kill-window` |
| `tmux kill-window -t <target>` | Kill a specific window | `tmux kill-window -t 1` |
| `tmux list-windows` | List all windows in the current session | `tmux list-windows` |
| `tmux rename-window <new-name>` | Rename current window | `tmux rename-window logs` |
| `tmux select-window -t <target>` | Select a specific window | `tmux select-window -t 2` |
| `tmux move-window -t <target>` | Move a window to a new index | `tmux move-window -t 0` |
| `tmux swap-window -s <src> -t <dst>` | Swap two windows | `tmux swap-window -s 3 -t 1` |
| `tmux next-window` | Switch to the next window | `tmux next-window` |
| `tmux previous-window` | Switch to the previous window | `tmux previous-window` |

## Pane Management

### Creating Panes

| Command | Description | Example |
|---------|-------------|---------|
| `tmux split-window` | Split current pane vertically | `tmux split-window` |
| `tmux split-window -h` | Split current pane horizontally | `tmux split-window -h` |
| `tmux split-window -c <directory>` | Split with specified working directory | `tmux split-window -c ~/logs` |
| `tmux split-window "<command>"` | Split and run specified command | `tmux split-window "tail -f log.txt"` |
| `tmux split-window -p <percentage>` | Split and set size by percentage | `tmux split-window -p 25` |
| `tmux split-window -l <lines>` | Split and set size by lines | `tmux split-window -l 10` |

### Managing Panes

| Command | Description | Example |
|---------|-------------|---------|
| `tmux kill-pane` | Kill the current pane | `tmux kill-pane` |
| `tmux kill-pane -t <target>` | Kill a specific pane | `tmux kill-pane -t 1` |
| `tmux select-pane -t <target>` | Select a specific pane | `tmux select-pane -t 0` |
| `tmux select-pane -L\|-D\|-U\|-R` | Select pane to the left/down/up/right | `tmux select-pane -R` |
| `tmux resize-pane -D\|-U\|-L\|-R <n>` | Resize pane in specified direction | `tmux resize-pane -D 10` |
| `tmux swap-pane -s <src> -t <dst>` | Swap two panes | `tmux swap-pane -s 3 -t 1` |
| `tmux break-pane` | Break pane into a new window | `tmux break-pane` |
| `tmux join-pane -s <src> -t <dst>` | Join a pane from one window to another | `tmux join-pane -s 3.1 -t 1` |
| `tmux display-panes` | Display pane numbers | `tmux display-panes` |
| `tmux select-layout <layout>` | Select a built-in layout | `tmux select-layout even-horizontal` |

### Pane Layouts

| Layout | Description |
|--------|-------------|
| `even-horizontal` | Panes are spread evenly from left to right |
| `even-vertical` | Panes are spread evenly from top to bottom |
| `main-horizontal` | A large pane at the top, smaller ones at the bottom |
| `main-vertical` | A large pane at the left, smaller ones at the right |
| `tiled` | Panes are tiled as evenly as possible |

## Copy Mode and Scrollback

| Command | Description | Example |
|---------|-------------|---------|
| `tmux copy-mode` | Enter copy mode | `tmux copy-mode` |
| `tmux copy-mode -u` | Enter copy mode and scroll one page up | `tmux copy-mode -u` |
| `tmux scroll-up` | Scroll up through terminal history | `tmux scroll-up` |
| `tmux scroll-down` | Scroll down through terminal history | `tmux scroll-down` |
| `tmux page-up` | Scroll up one page | `tmux page-up` |
| `tmux page-down` | Scroll down one page | `tmux page-down` |

## Status Line and Display

| Command | Description | Example |
|---------|-------------|---------|
| `tmux set-option -g status on\|off` | Turn status line on or off | `tmux set-option -g status off` |
| `tmux set-option -g status-left <string>` | Set left status line content | `tmux set-option -g status-left "[#S]"` |
| `tmux set-option -g status-right <string>` | Set right status line content | `tmux set-option -g status-right "%H:%M"` |
| `tmux set-option -g status-style <style>` | Set status line style | `tmux set-option -g status-style bg=black,fg=white` |
| `tmux display-message <message>` | Display a message in the status line | `tmux display-message "Hello"` |
| `tmux clock-mode` | Display a clock | `tmux clock-mode` |

## Buffers and Clipboard

| Command | Description | Example |
|---------|-------------|---------|
| `tmux list-buffers` | List all paste buffers | `tmux list-buffers` |
| `tmux show-buffer` | Show the content of the most recent buffer | `tmux show-buffer` |
| `tmux show-buffer -b <buffer-name>` | Show the content of a specific buffer | `tmux show-buffer -b 0` |
| `tmux save-buffer <file>` | Save buffer contents to a file | `tmux save-buffer /tmp/tmux-buffer` |
| `tmux save-buffer -b <buffer-name> <file>` | Save a specific buffer to a file | `tmux save-buffer -b 0 /tmp/buffer-0` |
| `tmux load-buffer <file>` | Load contents of a file into a buffer | `tmux load-buffer /tmp/new-buffer` |
| `tmux paste-buffer` | Paste the most recent buffer | `tmux paste-buffer` |
| `tmux paste-buffer -b <buffer-name>` | Paste a specific buffer | `tmux paste-buffer -b 0` |
| `tmux delete-buffer` | Delete the most recent buffer | `tmux delete-buffer` |
| `tmux delete-buffer -b <buffer-name>` | Delete a specific buffer | `tmux delete-buffer -b 0` |

## Advanced Commands

| Command | Description | Example |
|---------|-------------|---------|
| `tmux set-environment -g <name> <value>` | Set a global environment variable | `tmux set-environment -g EDITOR vim` |
| `tmux set-hook <hook> <command>` | Set a hook to run on a specific event | `tmux set-hook session-created 'display-message "Session created"'` |
| `tmux lock-session` | Lock the current session | `tmux lock-session` |
| `tmux wait-for <event>` | Wait for a specific event to occur | `tmux wait-for silence-10` |
| `tmux wait-for -S <event>` | Signal an event for wait-for | `tmux wait-for -S ready` |
| `tmux if-shell <condition> <command>` | Run a command if a shell condition is true | `tmux if-shell "test -f ~/.tmux.local" "source ~/.tmux.local"` |

## Target Syntax

Tmux targets identify specific sessions, windows, and panes:

- Session: `<session-name>`
- Window: `<session-name>:<window-index>`
- Pane: `<session-name>:<window-index>.<pane-index>`

Examples:
- `dev` - Session named "dev"
- `dev:1` - Window 1 in session "dev"
- `dev:1.2` - Pane 2 in window 1 in session "dev"
- `1` - Window 1 in current session
- `1.2` - Pane 2 in window 1 in current session

## Format Strings

Format strings are used in various Tmux commands for formatting output:

| Variable | Description |
|----------|-------------|
| `#S` | Session name |
| `#W` | Window name |
| `#F` | Window flags |
| `#I` | Window index |
| `#P` | Pane index |
| `#T` | Pane title |
| `#H` | Hostname |
| `#D` | Pane ID |
| `#{pane_current_path}` | Current path in pane |
| `#{pane_width}` | Width of pane |
| `#{pane_height}` | Height of pane |
| `#{host}` | Host name |
| `#{pid}` | Server process ID |
| `#{user}` | Username |

## Interactive Commands (Prefix Key)

These commands are used after pressing the prefix key (default: `Ctrl+b`):

| Key | Action |
|-----|--------|
| `d` | Detach from session |
| `c` | Create new window |
| `&` | Kill current window |
| `0-9` | Select window by number |
| `n` | Next window |
| `p` | Previous window |
| `,` | Rename window |
| `.` | Move window |
| `w` | List windows |
| `f` | Find window |
| `i` | Display window info |
| `%` | Split window horizontally |
| `"` | Split window vertically |
| `o` | Go to next pane |
| `;` | Go to last active pane |
| `q` | Show pane numbers |
| `x` | Kill pane |
| `z` | Toggle pane zoom |
| `{` | Swap pane with previous |
| `}` | Swap pane with next |
| `Arrow keys` | Navigate between panes |
| `Space` | Cycle through pane layouts |
| `[` | Enter copy mode |
| `]` | Paste from buffer |
| `#` | List all paste buffers |
| `=` | Choose which buffer to paste |
| `:` | Enter command mode |
| `?` | List all key bindings |
| `t` | Show time |
| `~` | Show messages |
| `s` | List and select sessions |
| `$` | Rename session |
| `(` | Switch to previous session |
| `)` | Switch to next session |

## References

- [Tmux Official Manual](http://man.openbsd.org/OpenBSD-current/man1/tmux.1)
- [Tmux GitHub Repository](https://github.com/tmux/tmux)