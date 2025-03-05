# Tmux Troubleshooting Guide

This cheatsheet provides solutions to common Tmux issues and advanced debugging techniques.

## Common Issues

### Terminal and Display Problems

| Issue | Solution |
|-------|----------|
| Colors look wrong | `set -g default-terminal "screen-256color"` or `tmux-256color"` |
| Text rendering issues | `set -ga terminal-overrides ",*256col*:Tc"` |
| Unicode characters broken | `set -q -g status-utf8 on` and `setw -q -g utf8 on` |
| Terminal scrolling doesn't work | Enable mouse mode: `set -g mouse on` |
| Terminal title not updating | `set -g set-titles on` and `set -g set-titles-string "#S:#I:#W - #T"` |

### Key Binding Issues

| Issue | Solution |
|-------|----------|
| Prefix key conflict | Change prefix: `unbind C-b` and `set -g prefix C-a` |
| Function keys not working | `set -g xterm-keys on` |
| Alt/Meta keys not working | Check your terminal settings, try `set -g xterm-keys on` |
| Vim navigation conflict | Use smart pane switching (see below) |

Smart pane switching that works with Vim:
```bash
is_vim="ps -o state= -o comm= -t '#{pane_tty}' | grep -iqE '^[^TXZ ]+ +(\\S+\\/)?g?(view|n?vim?x?)(diff)?$'"
bind -n 'C-h' if-shell "$is_vim" 'send-keys C-h'  'select-pane -L'
bind -n 'C-j' if-shell "$is_vim" 'send-keys C-j'  'select-pane -D'
bind -n 'C-k' if-shell "$is_vim" 'send-keys C-k'  'select-pane -U'
bind -n 'C-l' if-shell "$is_vim" 'send-keys C-l'  'select-pane -R'
```

### Copy/Paste Issues

| Issue | Solution |
|-------|----------|
| Copy/paste not working (macOS) | `set -g default-command "reattach-to-user-namespace -l $SHELL"` |
| Copy mode doesn't use vi keys | `setw -g mode-keys vi` |
| System clipboard integration | Configure as shown below |

System clipboard integration:
```bash
# For macOS
if-shell "uname | grep -q Darwin" {
  bind-key -T copy-mode-vi 'y' send -X copy-pipe-and-cancel 'pbcopy'
  bind-key -T copy-mode-vi Enter send -X copy-pipe-and-cancel 'pbcopy'
}

# For Linux with X11
if-shell "uname | grep -q Linux" {
  bind-key -T copy-mode-vi 'y' send -X copy-pipe-and-cancel 'xclip -in -selection clipboard'
  bind-key -T copy-mode-vi Enter send -X copy-pipe-and-cancel 'xclip -in -selection clipboard'
}

# For WSL (Windows Subsystem for Linux)
if-shell "uname -r | grep -q Microsoft" {
  bind-key -T copy-mode-vi 'y' send -X copy-pipe-and-cancel 'clip.exe'
  bind-key -T copy-mode-vi Enter send -X copy-pipe-and-cancel 'clip.exe'
}
```

### Performance Issues

| Issue | Solution |
|-------|----------|
| Slow response time | Reduce escape time: `set -sg escape-time 0` |
| Status bar slowing things down | Reduce refresh: `set -g status-interval 5` or simplify status bar |
| High CPU usage | Disable activity monitoring: `setw -g monitor-activity off` |
| Lag in remote sessions | Minimize visual effects and status bar complexity |
| Slow scrolling in copy mode | Increase scrolling speed: `bind -T copy-mode-vi WheelUpPane send -N5 -X scroll-up` |

### Session Management Problems

| Issue | Solution |
|-------|----------|
| Can't restore sessions after reboot | Use tmux-resurrect and tmux-continuum plugins |
| Session name conflicts | Use unique naming scheme or check before creating: `tmux has-session -t name` |
| Accidentally killed session | Remember you can use `tmux list-clients -t session` to see attached clients |
| Dealing with many sessions | Use a session manager script (see advanced scripts section) |

## Debugging Techniques

### Command Line Options

| Command | Purpose |
|---------|---------|
| `tmux -v` | Run with verbose logging |
| `tmux -vv` | Run with very verbose logging |
| `tmux -L logfile` | Specify a different socket path |
| `tmux -f configfile` | Use a specific config file |
| `TMUX_TMPDIR=/alt/path tmux` | Set alternate path for sockets |

### Inspecting Current Settings

| Command | Purpose |
|---------|---------|
| `tmux list-keys` or `tmux lsk` | List all key bindings |
| `tmux list-commands` or `tmux lscm` | List all tmux commands |
| `tmux info` | Show all session information |
| `tmux show-options -g` | Show global options |
| `tmux show-window-options -g` | Show global window options |
| `tmux show-options -s` | Show server options |

### Testing Configurations

Use a separate configuration file for testing:
```bash
tmux -f /tmp/test.conf
```

Run tmux with no configuration to see if issues persist:
```bash
tmux -f /dev/null
```

### Identifying Key Binding Conflicts

1. Run `tmux list-keys` to see all bindings
2. Look for duplicate bindings or conflicts
3. Use `bind -rn` to remove a binding before reassigning it

## Advanced Troubleshooting

### Diagnosing Plugin Issues

1. Disable all plugins and see if the problem persists
2. Re-enable plugins one by one to identify the problematic one
3. Check if plugin has a GitHub issue for your problem

### Socket Permission Issues

If you see "server not found" or connection issues:
```bash
# Check socket permissions
ls -la /tmp/tmux-*

# Set correct ownership if needed
sudo chown -R yourusername:yourusername /tmp/tmux-*

# Try different socket path if permissions can't be fixed
TMUX_TMPDIR=~/tmux-sockets tmux
```

### Resolving Terminal Capability Issues

If you have rendering issues, check your terminal capabilities:
```bash
# Check what your $TERM is set to
echo $TERM

# See terminal capabilities
infocmp $TERM
```

### Tracking Down High CPU Usage

1. Identify the session using high CPU with `top` or `htop`
2. Simplify your status line complexity
3. Reduce update frequency with `set -g status-interval 5`
4. Disable activity monitoring with `setw -g monitor-activity off`

### Debugging Slow Startup

If tmux is slow to start:
1. Launch with `tmux -vv` to see verbose output
2. Check for slow-loading plugins
3. Check for complex shell commands in status line
4. Look for network calls in your configuration

## Configurations For Specific Environments

### Remote/SSH Sessions

```bash
# Optimize for high-latency connections
set -g status-interval 60  # Reduce status updates
set -g status-left-length 20  # Shorter status
set -g status-right-length 40
set -g status-left "#S"
set -g status-right "%H:%M"

# Disable visual bells and activity
set -g visual-activity off
set -g visual-bell off
set -g visual-silence off
setw -g monitor-activity off
set -g bell-action none
```

### WSL (Windows Subsystem for Linux)

```bash
# Fix clipboard
set -g set-clipboard off
bind-key -T copy-mode-vi y send-keys -X copy-pipe-and-cancel "clip.exe"
bind-key -T copy-mode-vi Enter send-keys -X copy-pipe-and-cancel "clip.exe"

# Fix terminal compatibility
set -g default-terminal "xterm-256color"
```

### macOS Specific

```bash
# Fix clipboard
set -g default-command "reattach-to-user-namespace -l $SHELL"
bind-key -T copy-mode-vi y send-keys -X copy-pipe-and-cancel "pbcopy"

# Fix keyboard behavior
set -g default-terminal "screen-256color"
set -sa terminal-overrides ',XXX:RGB'  # Where XXX is your $TERM value
```

## Recovery Tools and Techniques

### Recovering From a Broken Configuration

1. Start tmux with an empty config:
   ```bash
   tmux -f /dev/null
   ```

2. Manually apply minimal settings to get back to a usable state

3. From there, create a new minimal configuration file and test

### Recovering Detached Sessions

1. List all sessions:
   ```bash
   tmux ls
   ```

2. Attach to a specific session:
   ```bash
   tmux attach -t session_name
   ```

3. If unable to attach, try detaching other clients first:
   ```bash
   tmux detach-client -s session_name
   ```

### Recovering After a Terminal Crash

Sessions persist after SSH disconnection or terminal crashes:
```bash
# List and reattach
tmux ls
tmux attach -t session_name
```

If you need to recover content from a pane, try:
```bash
# Capture pane content to a buffer
tmux capture-pane -t session_name:window.pane -S -1000
# Save buffer to a file
tmux save-buffer buffer.txt
```