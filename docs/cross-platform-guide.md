# Tmux Cross-Platform Compatibility Guide

This guide addresses platform-specific considerations when using tmux across different operating systems and terminal environments.

## Table of Contents

- [macOS](#macos)
- [Linux](#linux)
- [Windows](#windows)
- [WSL (Windows Subsystem for Linux)](#wsl-windows-subsystem-for-linux)
- [Remote/SSH Connections](#remotessh-connections)
- [iOS/Android](#iosandroid)
- [Terminal Emulator Specific Notes](#terminal-emulator-specific-notes)

## macOS

### Installation and Setup

```bash
# Using Homebrew (recommended)
brew install tmux

# Using MacPorts
sudo port install tmux
```

### macOS Specific Configurations

#### Clipboard Integration

macOS requires special handling for clipboard integration:

```bash
# Install required utility
brew install reattach-to-user-namespace

# Add to tmux.conf
set -g default-command "reattach-to-user-namespace -l $SHELL"
bind-key -T copy-mode-vi 'y' send -X copy-pipe-and-cancel 'reattach-to-user-namespace pbcopy'
bind-key -T copy-mode-vi Enter send -X copy-pipe-and-cancel 'reattach-to-user-namespace pbcopy'
```

For newer versions of tmux and macOS (Catalina+), you might be able to use:

```bash
# Simplified clipboard handling in newer versions
set -g default-command "${SHELL}"
bind-key -T copy-mode-vi 'y' send -X copy-pipe-and-cancel 'pbcopy'
bind-key -T copy-mode-vi Enter send -X copy-pipe-and-cancel 'pbcopy'
```

#### Terminal Integration

If using iTerm2, consider these settings:

```bash
# For better iTerm2 integration
set -g default-terminal "xterm-256color"
set -ga terminal-overrides ",xterm-256color:Tc"
```

### Known Issues on macOS

1. **Function keys**: Function keys may be intercepted by macOS. You can:
   - Use System Preferences > Keyboard to change behavior
   - Use "fn" key with function keys
   - Reassign tmux bindings to avoid function keys

2. **Mouse scroll behavior**: Scrolling with mouse requires additional config:
   ```bash
   set -g mouse on
   bind -n WheelUpPane if-shell -F -t = "#{mouse_any_flag}" "send-keys -M" "if -Ft= '#{pane_in_mode}' 'send-keys -M' 'copy-mode -e'"
   ```

## Linux

### Installation

```bash
# Debian/Ubuntu
sudo apt update
sudo apt install tmux

# Fedora
sudo dnf install tmux

# Arch Linux
sudo pacman -S tmux

# CentOS/RHEL
sudo yum install tmux
```

### Linux Specific Configurations

#### Clipboard Integration

For X11-based Linux systems:

```bash
# Install xclip or xsel
sudo apt install xclip   # or xsel

# Configure tmux for X clipboard
bind-key -T copy-mode-vi 'y' send -X copy-pipe-and-cancel 'xclip -in -selection clipboard'
bind-key -T copy-mode-vi Enter send -X copy-pipe-and-cancel 'xclip -in -selection clipboard'
```

For Wayland:

```bash
# Using wl-clipboard
sudo apt install wl-clipboard

# Configure tmux for Wayland clipboard
bind-key -T copy-mode-vi 'y' send -X copy-pipe-and-cancel 'wl-copy'
bind-key -T copy-mode-vi Enter send -X copy-pipe-and-cancel 'wl-copy'
```

#### Terminal Compatibility

For server environments, use more compatible terminal settings:

```bash
# For maximum compatibility
set -g default-terminal "screen"

# For color support on most systems
set -g default-terminal "screen-256color"
```

### Known Issues on Linux

1. **Distro differences**: Some Linux distributions may have older tmux versions - check compatibility
2. **Desktop environment integration**: Different desktop environments handle terminal integration differently
3. **Wayland vs X11**: Different clipboard handling required (see above)

## Windows

Native Windows doesn't run tmux directly. You have several options:

### WSL (Windows Subsystem for Linux)

See the [WSL section](#wsl-windows-subsystem-for-linux) below for details.

### Cygwin

```bash
# Install via Cygwin installer
# Select tmux package during installation
```

Configure with:
```bash
# Cygwin clipboard integration
bind-key -T copy-mode-vi 'y' send -X copy-pipe-and-cancel '/dev/clipboard'
bind-key -T copy-mode-vi Enter send -X copy-pipe-and-cancel '/dev/clipboard'
```

### MSYS2/MinGW

```bash
# Install via MSYS2
pacman -S tmux
```

### Windows Terminal considerations

For Windows Terminal users, consider:
1. Setting Windows Terminal as default shell in WSL
2. Using specific color schemes compatible with tmux

## WSL (Windows Subsystem for Linux)

### Installation in WSL

```bash
# In your WSL distribution (Ubuntu example)
sudo apt update
sudo apt install tmux
```

### WSL Specific Configurations

For clipboard integration between Windows and WSL:

```bash
# Install clip.exe wrapper
sudo apt install wslu

# Configure tmux.conf
bind-key -T copy-mode-vi 'y' send -X copy-pipe-and-cancel 'clip.exe'
bind-key -T copy-mode-vi Enter send -X copy-pipe-and-cancel 'clip.exe'
```

For Windows Terminal integration:

```bash
# Improve rendering in Windows Terminal
set -g default-terminal "xterm-256color"
set -ga terminal-overrides ",xterm-256color:Tc"
```

### Known WSL Issues

1. **Performance**: WSL1 may have slower performance; consider WSL2
2. **File system access**: Best to keep files within WSL file system for performance
3. **Clipboard**: Sometimes requires additional configuration (see above)
4. **Path issues**: Be aware of Windows vs WSL paths when using scripted tmux sessions

## Remote/SSH Connections

When using tmux over SSH:

### Configuration for Remote Use

```bash
# Optimize for remote/high-latency connections
set -g status-interval 60  # Update status bar less frequently
set -g history-limit 5000  # Limit history to reduce memory usage

# Reduce visual effects
set -g visual-activity off
set -g visual-bell off
set -g visual-silence off
setw -g monitor-activity off
set -g bell-action none
```

### Nested Tmux Sessions

When running tmux locally and on a remote server:

```bash
# In local .tmux.conf
bind-key -n C-f send-prefix  # Send prefix to nested session

# Then in remote tmux, use C-b as normal, 
# and use C-f C-b for remote tmux commands
```

Or use different prefix keys:

```bash
# Local tmux
set -g prefix C-a

# Remote tmux
set -g prefix C-b
```

### Persistent Remote Sessions

Set up automatic session recovery for remote use:

```bash
# Install tmux plugin manager and plugins
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-resurrect'
set -g @plugin 'tmux-plugins/tmux-continuum'

# Configure auto-restore
set -g @continuum-restore 'on'
```

## iOS/Android

### Mobile Terminal Options

For iOS:
- Blink Shell (supports tmux and mosh)
- iSH (limited tmux support)

For Android:
- Termux (full tmux support)
- JuiceSSH (for SSH to tmux sessions)

### Mobile-Specific Configuration

Optimize for small screens:

```bash
# Minimal status bar
set -g status-left ""
set -g status-right ""

# Larger pane borders for touch
set -g pane-border-lines heavy

# Simplified bindings for touch keyboards
bind -n M-1 select-window -t 1
bind -n M-2 select-window -t 2
# etc. for quick window switching
```

### Touch Considerations

On touch devices:
1. Consider scripts that create pre-defined layouts
2. Use minimal configurations to maximize screen space
3. Enable mouse mode for touch interaction

## Terminal Emulator Specific Notes

### iTerm2 (macOS)

iTerm2 has native integration options:

```bash
# For best iTerm2 experience
set -g default-terminal "xterm-256color"
set -ga terminal-overrides ",xterm-256color:Tc"

# If using italics
set -as terminal-overrides ',xterm*:sitm=\E[3m'
```

Consider using iTerm2's "tmux integration mode" for locally-run tmux sessions.

### Alacritty

For the Alacritty terminal:

```bash
# Alacritty settings
set -g default-terminal "tmux-256color"
set -ga terminal-overrides ",alacritty:RGB"
```

### Kitty

For Kitty terminal:

```bash
# Kitty settings
set -g default-terminal "xterm-kitty"
set -ga terminal-overrides ",xterm-kitty:RGB"
```

### Terminator

Terminator has its own split functionality, but when using tmux:

```bash
# Terminator compatibility
set -g default-terminal "screen-256color"
```

## Configuration Detection

You can automate platform detection in your tmux.conf:

```bash
# Platform detection
if-shell "uname | grep -q Darwin" {
  # macOS specific settings
  set -g default-command "reattach-to-user-namespace -l $SHELL"
  bind-key -T copy-mode-vi 'y' send -X copy-pipe-and-cancel 'pbcopy'
}

if-shell "uname | grep -q Linux" {
  # Linux specific settings
  bind-key -T copy-mode-vi 'y' send -X copy-pipe-and-cancel 'xclip -in -selection clipboard'
}

if-shell "uname -r | grep -q Microsoft" {
  # WSL specific settings
  bind-key -T copy-mode-vi 'y' send -X copy-pipe-and-cancel 'clip.exe'
}
```

## Cross-Platform Development Workflow

For consistent development across platforms:

1. Keep a core tmux.conf with platform-neutral settings
2. Use conditionals for platform-specific settings
3. Use a version control system to sync configurations
4. Consider using tmuxinator or similar for reproducible environments
5. Document platform-specific quirks in your configuration

## Troubleshooting Common Cross-Platform Issues

| Issue | Solution |
|-------|----------|
| Colors look different | Use consistent `default-terminal` and check terminal support |
| Clipboard doesn't work | Install appropriate clipboard utility for your OS |
| Key bindings conflict | Use OS-specific remappings or find non-conflicting keys |
| Mouse behavior differs | Check terminal's mouse reporting capabilities |
| Font rendering issues | Ensure consistent fonts across environments |
| Environment variables | Set consistent `TERM` variable across systems |

---

For more detailed platform-specific help, please refer to the respective OS documentation or open an issue in the repository.