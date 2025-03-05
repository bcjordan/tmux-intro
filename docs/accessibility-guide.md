# Tmux Accessibility Guide

This guide provides tips, configurations, and workarounds to make tmux more accessible for users with diverse needs, including those with visual, motor, or cognitive impairments.

## Table of Contents

- [Visual Accessibility](#visual-accessibility)
- [Motor Control Accessibility](#motor-control-accessibility)
- [Cognitive Accessibility](#cognitive-accessibility)
- [Screen Reader Compatibility](#screen-reader-compatibility)
- [Accessibility Plugins](#accessibility-plugins)
- [Alternative Tools](#alternative-tools)

## Visual Accessibility

### High Contrast and Color Schemes

Add these to your `~/.tmux.conf` to create a high-contrast environment:

```bash
# High contrast theme
set -g status-style "bg=black,fg=white"
set -g window-status-current-style "bg=white,fg=black,bold"
set -g pane-border-style "fg=white"
set -g pane-active-border-style "fg=green,bg=black"
set -g message-style "bg=black,fg=brightwhite"
```

For color blindness considerations:

```bash
# Color blindness friendly (avoiding red/green distinctions)
set -g window-status-current-style "bg=blue,fg=white,bold"
set -g pane-active-border-style "fg=blue,bg=black"
```

### Font Size and Terminal Configuration

While tmux itself doesn't control font size, you can:

1. Configure your terminal emulator to use larger fonts
2. Use terminal zoom features (usually Ctrl++ or Cmd++)
3. Configure status bar elements to be more visible:

```bash
# Larger status indicators with symbols
set -g status-left-length 40
set -g status-left "▎Session: #S ▎"
set -g window-status-format "▎ #I #W ▎"
set -g window-status-current-format "▮ #I #W ▮"
```

### Clear Visual Indicators

Add distinctive visual indicators for state changes:

```bash
# Visual activity monitoring with clear notification
setw -g monitor-activity on
set -g visual-activity on
set -g status-style "bg=black,fg=white"
set -g window-status-activity-style "bg=white,fg=black,blink"

# Add clear status bar indicators
set -g status-right "#{?client_prefix,🔷 PREFIX,} #{?pane_synchronized,🔶 SYNC,}"
```

## Motor Control Accessibility

### Reducing Key Combinations

If complex key combinations are difficult, consider these adjustments:

```bash
# Easier prefix (single key if your terminal supports it)
unbind C-b
set -g prefix C-a  # or another key that's easier to reach

# Single key bindings for common actions after prefix
bind n next-window      # Just 'n' instead of 'n' or 'p'
bind p previous-window  # Just 'p'
bind x kill-pane        # Just 'x'
```

### Mouse Support

Enable comprehensive mouse support:

```bash
# Full mouse control
set -g mouse on
```

With mouse mode enabled you can:
- Click on a window name to select it
- Click on a pane to focus it
- Click and drag pane borders to resize
- Scroll with the mouse wheel
- Right-click for options (in some terminals)

### Command Mode Aliases

Create shorter command aliases for frequently used commands:

```bash
# In tmux command mode (prefix + :)
command-alias split="split-window"
command-alias vs="split-window -h"
command-alias hs="split-window -v"
command-alias kill="kill-pane"
command-alias clear="clear-history"
```

### External Control Tools

For users who find keyboard or mouse control difficult, consider:

- Using [`tmuxinator`](https://github.com/tmuxinator/tmuxinator) to create predefined workspaces 
- Scripting tmux environments that can be launched with a single command
- Voice control integration (see screen reader section)

## Cognitive Accessibility

### Simplified Status Information

Reduce cognitive load with clearer, minimal status displays:

```bash
# Minimal, clear status bar
set -g status-left "#S"
set -g status-right "#{window_index}:#{pane_index}"
set -g status-style "bg=black,fg=white"
set -g status-justify centre

# Make the active window and pane very obvious
set -g window-status-current-style "bg=blue,fg=white,bold"
set -g pane-active-border-style "fg=blue,bg=black"
```

### Session Organization

Use named sessions, windows, and panes with clear purposes:

```bash
# Create a focused work environment
new-session -s "focused-work" -n "main"
split-window -h -t "focused-work:main"
new-window -t "focused-work" -n "reference"
new-window -t "focused-work" -n "communication"
```

### Help Key Binding

Add a custom help menu:

```bash
# Create a help key binding
bind ? display-popup -E "cat ~/.tmux-help.txt"
```

With a `~/.tmux-help.txt` file containing your most used commands.

## Screen Reader Compatibility

Tmux generally works with screen readers, but requires some configuration:

### Basic Configuration for Screen Readers

```bash
# Improve screen reader compatibility
set -g status-interval 0  # Prevent status refreshes from interrupting screen reader
set -g default-terminal "screen-256color"  # More compatible terminal type
set -g history-limit 5000  # Reasonable scrollback for performance
```

### Audible Bells Instead of Visual

```bash
# Use audible bell instead of visual
set -g visual-bell off
set -g bell-action any
```

### Tips for Screen Reader Users

1. Use command mode (prefix + :) for operations to ensure commands are spoken
2. Create distinct sessions for different tasks to maintain context
3. Use window and pane titles that are descriptive and unique
4. Consider minimizing automatic updates that might interrupt screen reading

## Accessibility Plugins

### Recommended Plugins

Add these to your tmux configuration:

```bash
# List of accessibility-minded plugins
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-logging'        # Save pane content to file
set -g @plugin 'tmux-plugins/tmux-sessionist'     # Better session management
set -g @plugin 'jaclu/tmux-menus'                 # Accessible popup menus
```

### Custom Plugins for Accessibility

Consider creating or adapting plugins for specific needs:

1. Status notifiers that integrate with notification systems
2. Text-to-speech integration for alerts
3. Simplified menu systems with large targets

## Alternative Tools

If tmux doesn't meet your accessibility needs, consider these alternatives:

1. **GNU Screen**: Alternative terminal multiplexer with different key bindings
2. **Terminator**: GUI terminal with split-pane functionality
3. **iTerm2** (macOS): Includes native splitting and session management
4. **Windows Terminal** (Windows): Modern terminal with pane splitting

### Choosing Between tmux and Alternatives

Consider:
- Which tool provides the most accessible keybindings for your needs
- Terminal emulator built-in features vs. tmux
- Integration with assistive technologies
- Personal workflow preferences

## Community Resources

- [r/tmux](https://www.reddit.com/r/tmux/) - Reddit community for tmux users
- [GitHub Issues](https://github.com/tmux/tmux/issues) - Request accessibility features
- [Tmux Plugin Community](https://github.com/tmux-plugins) - Sources for plugins

## Contributing Accessibility Improvements

If you develop accessibility enhancements for tmux:

1. Share your configurations with the community
2. Consider contributing to the core tmux project
3. Document your approaches for others with similar needs

---

This guide is continually evolving. If you have suggestions for improving tmux accessibility, please submit a pull request or open an issue.