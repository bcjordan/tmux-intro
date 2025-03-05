# Popular Tmux Plugins

This is a curated list of some of the most useful Tmux plugins to enhance your workflow.

## Installing Tmux Plugin Manager (TPM)

Before using any of these plugins, you need to install TPM:

```bash
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

Then add this to your `~/.tmux.conf`:

```bash
# List of plugins
set -g @plugin 'tmux-plugins/tpm'

# Initialize TMUX plugin manager (keep this line at the very bottom of tmux.conf)
run '~/.tmux/plugins/tpm/tpm'
```

## Essential Plugins

### tmux-sensible
Sensible default settings that should be acceptable to everyone.

```bash
set -g @plugin 'tmux-plugins/tmux-sensible'
```

### tmux-resurrect
Save and restore tmux sessions across system restarts.

```bash
set -g @plugin 'tmux-plugins/tmux-resurrect'
```

Key bindings:
- `prefix + Ctrl-s`: Save the session
- `prefix + Ctrl-r`: Restore the session

### tmux-continuum
Automatic saving and restoring of tmux sessions.

```bash
set -g @plugin 'tmux-plugins/tmux-continuum'
```

Config options:
```bash
# Enable automatic restore
set -g @continuum-restore 'on'
# Set autosave interval (minutes)
set -g @continuum-save-interval '15'
```

## Navigation and Productivity

### tmux-pain-control
Standard bindings for pane manipulation.

```bash
set -g @plugin 'tmux-plugins/tmux-pain-control'
```

Key bindings:
- `prefix + |`: Split vertically
- `prefix + -`: Split horizontally
- `prefix + h/j/k/l`: Navigate panes
- `prefix + H/J/K/L`: Resize panes

### tmux-fzf
Fuzzy find sessions, windows, panes, commands, etc.

```bash
set -g @plugin 'sainnhe/tmux-fzf'
```

Key binding:
- `prefix + F`: Open tmux-fzf

### tmux-sidebar
Show a sidebar with directory tree.

```bash
set -g @plugin 'tmux-plugins/tmux-sidebar'
```

Key binding:
- `prefix + Tab`: Toggle sidebar

## System Status and Information

### tmux-cpu
Display CPU information in status bar.

```bash
set -g @plugin 'tmux-plugins/tmux-cpu'
```

Status line usage:
```bash
set -g status-right '#{cpu_icon} #{cpu_percentage} | %a %h-%d %H:%M '
```

### tmux-battery
Show battery percentage in status bar.

```bash
set -g @plugin 'tmux-plugins/tmux-battery'
```

Status line usage:
```bash
set -g status-right '#{battery_status_bg} Batt: #{battery_icon} #{battery_percentage} #{battery_remain} | %a %h-%d %H:%M '
```

### tmux-online-status
Network connectivity information in status bar.

```bash
set -g @plugin 'tmux-plugins/tmux-online-status'
```

Status line usage:
```bash
set -g status-right '#{online_status} | %a %h-%d %H:%M '
```

## Copy and Paste

### tmux-yank
Improved copy-paste functionality.

```bash
set -g @plugin 'tmux-plugins/tmux-yank'
```

Key bindings:
- `prefix + y`: Copy selected text to system clipboard
- `prefix + Y`: Copy the current pane's working directory to system clipboard

## Theming

### tmux-themepack
Collection of themes for tmux.

```bash
set -g @plugin 'jimeh/tmux-themepack'
```

Config options:
```bash
set -g @themepack 'powerline/default/blue'
```

Options include:
- `basic`
- `powerline/block/blue`
- `powerline/default/gray`
- `powerline/double/magenta`
- And many more...

### catppuccin/tmux
A popular color scheme for tmux.

```bash
set -g @plugin 'catppuccin/tmux'
```

## Workflow Enhancement

### tmux-open
Open files, URLs, and directories from tmux copy mode.

```bash
set -g @plugin 'tmux-plugins/tmux-open'
```

Key bindings in copy mode:
- `o`: Open with default program
- `Ctrl-o`: Open with $EDITOR
- `Shift-s`: Search selected text with search engine

### tmux-logging
Log pane content to a file.

```bash
set -g @plugin 'tmux-plugins/tmux-logging'
```

Key bindings:
- `prefix + shift-p`: Toggle logging
- `prefix + alt-p`: Save complete pane history

## Installing and Managing Plugins

After adding plugins to your config:

1. Press `prefix + I` to install new plugins
2. Press `prefix + U` to update plugins
3. Press `prefix + alt-u` to remove/uninstall plugins

Remember to reload your tmux configuration if you've added new plugins:
```bash
tmux source-file ~/.tmux.conf
```