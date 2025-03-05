# Episode 5: Troubleshooting and Advanced Topics

## Overview
In this episode, we explore common Tmux issues, their solutions, and dive into advanced topics like security considerations, performance optimization, and extending Tmux with scripting and integration with other tools.

## Script

## Common Issues and Solutions

## Key Binding Conflicts
Problem: Some key bindings don't work or conflict with other applications.

Solutions:
```bash
# Change prefix key if it conflicts with other applications
unbind C-b
set -g prefix C-a

# Fix terminal key issues
set -g xterm-keys on

# Fix issues with function keys
set -g default-terminal "screen-256color"
```

## Copy-Paste Problems
Problem: Copy and paste don't work as expected across different systems.

Solutions:
```bash
# For macOS
if-shell "uname | grep -q Darwin" {
  set -g default-command "reattach-to-user-namespace -l $SHELL"
  bind-key -T copy-mode-vi 'y' send -X copy-pipe-and-cancel 'reattach-to-user-namespace pbcopy'
}

# For Linux with X11
if-shell "uname | grep -q Linux" {
  bind-key -T copy-mode-vi 'y' send -X copy-pipe-and-cancel 'xclip -in -selection clipboard'
}
```

## Pane and Window Navigation Issues
Problem: Difficulty navigating between many panes or windows.

Solutions:
```bash
# Use window/pane indices starting from 1 (easier to reach on keyboard)
set -g base-index 1
setw -g pane-base-index 1

# Smart pane switching with awareness of Vim splits
bind -n C-h run "(tmux display-message -p '#{pane_current_command}' | grep -iq vim && tmux send-keys C-h) || tmux select-pane -L"
bind -n C-j run "(tmux display-message -p '#{pane_current_command}' | grep -iq vim && tmux send-keys C-j) || tmux select-pane -D"
bind -n C-k run "(tmux display-message -p '#{pane_current_command}' | grep -iq vim && tmux send-keys C-k) || tmux select-pane -U"
bind -n C-l run "(tmux display-message -p '#{pane_current_command}' | grep -iq vim && tmux send-keys C-l) || tmux select-pane -R"
```

## Color and Display Issues
Problem: Colors don't display correctly or theme looks wrong.

Solutions:
```bash
# Fix colors
set -g default-terminal "tmux-256color"
set -ga terminal-overrides ",*256col*:Tc"

# Fix display of special characters
set -q -g status-utf8 on
setw -q -g utf8 on
```

## Performance Optimization

## Reducing Latency
```bash
# Reduce escape-time delay
set -sg escape-time 0

# Increase repeat time for repeated commands
set -g repeat-time 300

# Boost history limit
set -g history-limit 50000
```

## Managing Status Bar Updates
```bash
# Reduce status bar update frequency (saves CPU)
set -g status-interval 5

# Simplify status bar for performance
set -g status-left "#[fg=green]#S"
set -g status-right "#[fg=yellow]%H:%M"
```

## Optimizing for Remote Connections
```bash
# Reduce visual bells and activity notifications
set -g visual-activity off
set -g visual-bell off
set -g visual-silence off
setw -g monitor-activity off
set -g bell-action none
```

## Security Considerations

## Socket Permissions
When creating shared sessions, be careful with socket permissions:

```bash
# Create a shared socket with restrictive permissions
tmux -S /path/to/socket new -s shared
chmod 700 /path/to/socket  # Only owner can access
```

For group sharing:
```bash
tmux -S /path/to/socket new -s shared
chmod 770 /path/to/socket  # Owner and group members can access
```

## Managing Logging and Output Capture
Be careful with logging sensitive information:

```bash
# Avoid logging sensitive panes
bind-key L pipe-pane -o "cat >>~/tmux-#S-#W-#P.log" \; display-message "Logging started"
bind-key l pipe-pane \; display-message "Logging ended"
```

## Securing Clipboard Operations
```bash
# Disable auto-clipboard operations if security is a concern
set -g set-clipboard off
```

## Extending Tmux

## Creating Custom Menus
```bash
# Create a custom menu
bind-key m display-menu -T "#[align=centre]Menu" \
  "New Window" n "new-window" \
  "Split Horizontal" h "split-window -h" \
  "Split Vertical" v "split-window -v" \
  "Kill Pane" x "kill-pane" \
  "Kill Window" X "kill-window" \
  "" \
  "Layout Horizontal" h "select-layout even-horizontal" \
  "Layout Vertical" v "select-layout even-vertical" \
  "Layout Main-Horizontal" H "select-layout main-horizontal" \
  "Layout Main-Vertical" V "select-layout main-vertical" \
  "Layout Tiled" t "select-layout tiled" \
  "" \
  "Rename Window" r "command-prompt -I \"#W\" \"rename-window -- '%%'\"" \
  "Rename Session" R "command-prompt -I \"#S\" \"rename-session -- '%%'\""
```

## Writing Custom Scripts
Example of a script to create a development environment:

```bash
#!/bin/bash
# Create a specific layout for development

# Start new session
tmux new-session -d -s dev

# Create windows for different tasks
tmux rename-window -t dev:0 'editor'
tmux new-window -t dev:1 -n 'server'
tmux new-window -t dev:2 -n 'tests'

# Split the editor window
tmux select-window -t dev:0
tmux split-window -h
tmux split-window -v

# Configure each pane
tmux send-keys -t dev:0.0 'cd ~/projects/current && vim' C-m
tmux send-keys -t dev:0.1 'cd ~/projects/current && git status' C-m
tmux send-keys -t dev:0.2 'cd ~/projects/current && ls -la' C-m

# Attach to the session
tmux attach-session -t dev
```

## Integration with Other Tools

## Integrating with Vim
Using [Vim-Tmux-Navigator](https://github.com/christoomey/vim-tmux-navigator) for seamless navigation:

```bash
# In tmux.conf
is_vim="ps -o state= -o comm= -t '#{pane_tty}' \
    | grep -iqE '^[^TXZ ]+ +(\\S+\\/)?g?(view|n?vim?x?)(diff)?$'"
bind-key -n 'C-h' if-shell "$is_vim" 'send-keys C-h'  'select-pane -L'
bind-key -n 'C-j' if-shell "$is_vim" 'send-keys C-j'  'select-pane -D'
bind-key -n 'C-k' if-shell "$is_vim" 'send-keys C-k'  'select-pane -U'
bind-key -n 'C-l' if-shell "$is_vim" 'send-keys C-l'  'select-pane -R'
```

## Integrating with FZF
Using fzf for fuzzy finding:

```bash
# In tmux.conf
bind-key -n M-f run-shell "tmux neww ~/.scripts/tmux-sessionizer"
```

With a script like:
```bash
#!/bin/bash
# ~/.scripts/tmux-sessionizer

selected=$(find ~/projects -mindepth 1 -maxdepth 1 -type d | fzf)

if [[ -z $selected ]]; then
    exit 0
fi

selected_name=$(basename "$selected" | tr . _)
tmux_running=$(pgrep tmux)

if [[ -z $TMUX ]] && [[ -z $tmux_running ]]; then
    tmux new-session -s $selected_name -c $selected
    exit 0
fi

if ! tmux has-session -t=$selected_name 2> /dev/null; then
    tmux new-session -ds $selected_name -c $selected
fi

tmux switch-client -t $selected_name
```

## Debugging Tmux

## Verbose Logging
Enable detailed logging to diagnose issues:

```bash
tmux -v
# or even more verbose
tmux -vv
```

## Checking the Running Configuration
Dump the current configuration for inspection:

```bash
tmux show-options -g       # Show global options
tmux show-window-options -g # Show window options
```

## Inspecting Key Bindings
List all key bindings to find conflicts:

```bash
tmux list-keys
# or shorter
tmux lsk
```

## Demo
The video will include live demos showing:
1. Troubleshooting common Tmux issues
2. Performance optimization techniques
3. Creating custom scripts and menus
4. Integrating Tmux with Vim and FZF
5. Debugging techniques

## Exercises
1. Identify and fix a key binding conflict in your Tmux configuration
2. Create a custom menu for your most used Tmux commands
3. Write a script to automate a common workflow
4. Integrate Tmux with your preferred text editor
5. Optimize your Tmux configuration for performance

## Resources
- [Advanced Troubleshooting Guide](../cheatsheets/tmux-troubleshooting.md)
- [Security Best Practices](../docs/tmux-security.md)