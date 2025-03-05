# Episode 2: Customizing Tmux

## Overview
In this episode, we explore how to customize Tmux to improve your workflow, including configuring the status bar, changing key bindings, and setting up a personalized configuration file.

## Script

### Introduction to Tmux Configuration
- Configuration file: `~/.tmux.conf`
- Reload config: `tmux source-file ~/.tmux.conf`
- Command syntax in config files

### Basic Customizations

#### Changing the Prefix Key
Many users prefer to use `Ctrl+a` instead of the default `Ctrl+b`:

```bash
# Change prefix from Ctrl+b to Ctrl+a
unbind C-b
set -g prefix C-a
bind C-a send-prefix
```

#### Improving Colors
```bash
# Improve colors
set -g default-terminal "screen-256color"
```

#### Setting the Status Bar
```bash
# Basic status bar colors
set -g status-fg white
set -g status-bg black

# Left side of status bar
set -g status-left-length 40
set -g status-left "#[fg=green]Session: #S #[fg=yellow]#I #[fg=cyan]#P"

# Right side of status bar
set -g status-right "#[fg=cyan]%d %b %R"

# Update status bar every 60 seconds
set -g status-interval 60

# Center the window list
set -g status-justify centre

# Window status
setw -g window-status-format " #I:#W "
setw -g window-status-current-format " #I:#W "
setw -g window-status-current-style fg=black,bg=green
```

#### Better Window Splitting
```bash
# More intuitive window splitting keys
bind | split-window -h
bind - split-window -v
```

#### Vim-style Navigation
For Vim users, these bindings make pane navigation more intuitive:

```bash
# Use vim-like keys for navigating between panes
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# Use vim-like keys for resizing panes
bind -r H resize-pane -L 5
bind -r J resize-pane -D 5
bind -r K resize-pane -U 5
bind -r L resize-pane -R 5
```

#### Mouse Support
```bash
# Enable mouse mode
set -g mouse on
```

#### Window/Pane Numbering
```bash
# Start numbering windows and panes at 1, not 0
set -g base-index 1
setw -g pane-base-index 1

# Renumber windows when a window is closed
set -g renumber-windows on
```

### Advanced Customizations

#### Vi Mode for Copy/Paste
```bash
# Use vi keys in copy mode
setw -g mode-keys vi

# Setup vi-like copy mode
bind-key -T copy-mode-vi v send-keys -X begin-selection
bind-key -T copy-mode-vi y send-keys -X copy-selection
```

#### Session Management
```bash
# Quick session switching
bind-key S choose-session
```

#### Window Activity Monitoring
```bash
# Activity monitoring
setw -g monitor-activity on
set -g visual-activity on
```

### Using Plugins with Tmux Plugin Manager (TPM)

1. Installing TPM:
```bash
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

2. Adding to ~/.tmux.conf:
```bash
# List of plugins
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'
set -g @plugin 'tmux-plugins/tmux-resurrect'

# Initialize TMUX plugin manager (keep this line at the very bottom of tmux.conf)
run '~/.tmux/plugins/tpm/tpm'
```

3. Installing plugins: `prefix + I`

## Demo
The video will include a live demo showing:
1. Creating and editing a ~/.tmux.conf file
2. Reloading the configuration
3. Testing various customizations
4. Installing and using TPM plugins

## Exercises
1. Create your own tmux.conf file with at least 5 customizations
2. Change the status bar to show system information
3. Set up Vim-like key bindings for navigation
4. Configure mouse support
5. Install at least one TMux plugin

## Resources
- [Sample Tmux Configuration](/configs/tmux.conf)
- [Tmux Plugin Manager](https://github.com/tmux-plugins/tpm)
- [Popular Tmux Plugins](/cheatsheets/tmux-plugins.md)