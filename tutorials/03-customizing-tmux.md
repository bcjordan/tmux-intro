# Customizing tmux

tmux is highly customizable through its configuration file. This tutorial will show you how to customize your tmux environment.

## Configuration File

tmux looks for a configuration file at `~/.tmux.conf`. If the file doesn't exist, create it:

```bash
touch ~/.tmux.conf
```

Any changes made to this file can be applied to a running tmux session with:

```bash
# From within tmux
Prefix + : source-file ~/.tmux.conf

# Or add a binding to make reloading easier
bind r source-file ~/.tmux.conf \; display "Configuration Reloaded!"
```

## Common Customizations

### Changing the Prefix Key

The default prefix key is `Ctrl+b`, but many users prefer `Ctrl+a` (similar to GNU Screen):

```bash
# Change prefix from 'Ctrl+b' to 'Ctrl+a'
unbind C-b
set -g prefix C-a
bind C-a send-prefix
```

### Mouse Mode

Enable mouse support for selecting panes, resizing panes, and scrolling:

```bash
set -g mouse on
```

### Customizing the Status Bar

The status bar can be customized with different colors and information:

```bash
# Set status bar colors
set -g status-style bg=black,fg=white

# Highlight the current window
set -g window-status-current-style bg=blue,fg=white,bold

# Set status bar content
set -g status-left '#[fg=green][#S] '
set -g status-left-length 20
set -g status-right '#[fg=yellow]#(date "+%H:%M")'
```

### Pane and Window Navigation

Create easier bindings for navigating between panes and windows:

```bash
# Use Alt+arrow keys to switch panes without prefix
bind -n M-Left select-pane -L
bind -n M-Right select-pane -R
bind -n M-Up select-pane -U
bind -n M-Down select-pane -D

# Shift+arrow to switch windows without prefix
bind -n S-Left previous-window
bind -n S-Right next-window
```

### Changing Split Pane Shortcuts

Make split pane shortcuts more intuitive:

```bash
# Split panes using | and -
bind | split-window -h
bind - split-window -v
unbind '"'
unbind %
```

### Enabling Vi Mode

Enable vi-style navigation in copy mode:

```bash
# Enable vi mode
setw -g mode-keys vi

# vi-style copy and paste
bind-key -T copy-mode-vi v send-keys -X begin-selection
bind-key -T copy-mode-vi y send-keys -X copy-selection-and-cancel
```

## Plugin System

tmux has a plugin system that allows for even more customization. A popular plugin manager is [TPM (Tmux Plugin Manager)](https://github.com/tmux-plugins/tpm).

### Installing TPM

```bash
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

Add this to your `~/.tmux.conf`:

```bash
# List of plugins
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'

# Initialize TMUX plugin manager (keep this line at the very bottom of tmux.conf)
run '~/.tmux/plugins/tpm/tpm'
```

### Popular Plugins

- **tmux-resurrect**: Save and restore tmux sessions
  ```bash
  set -g @plugin 'tmux-plugins/tmux-resurrect'
  ```

- **tmux-continuum**: Continuous saving and automatic restoration
  ```bash
  set -g @plugin 'tmux-plugins/tmux-continuum'
  ```

- **tmux-yank**: Copy to system clipboard
  ```bash
  set -g @plugin 'tmux-plugins/tmux-yank'
  ```

## Example Configuration

Check out the [example configuration file](../examples/tmux.conf) in this repository for a complete setup.

## Next Steps

- Explore more advanced customization options in the [tmux manual](https://man.openbsd.org/tmux)
- Check out the [tmux wiki](https://github.com/tmux/tmux/wiki) for more tips and tricks
- Browse through [r/tmux](https://www.reddit.com/r/tmux/) for community configurations