# Tmux Platform-Specific Guide
*Author: Y5489P*

This guide covers platform-specific considerations, optimizations, and troubleshooting for Tmux across different operating systems.

## macOS

### Installation

```bash
# Using Homebrew (recommended)
brew install tmux

# Using MacPorts
sudo port install tmux
```

### Platform-Specific Considerations

#### Terminal Emulators
- **iTerm2** (recommended): Has excellent Tmux integration, including native tabs
  - Enable "Applications in terminal may access clipboard" in iTerm2 preferences for better clipboard support
  - Consider using iTerm2's "tmux integration mode" which provides native GUI tabs for Tmux
- **Terminal.app**: Works with Tmux but lacks some color support
  - May need extra color settings in `.tmux.conf`
- **Alacritty**: Fast, GPU-accelerated terminal that works well with Tmux

#### Clipboard Integration

To enable system clipboard integration:

1. Install `reattach-to-user-namespace`:
   ```bash
   brew install reattach-to-user-namespace
   ```

2. Add to your `.tmux.conf`:
   ```
   # Enable macOS clipboard support
   set -g default-command "reattach-to-user-namespace -l $SHELL"
   
   # Setup 'v' to begin selection as in Vim
   bind -T copy-mode-vi v send -X begin-selection
   bind -T copy-mode-vi y send -X copy-pipe "reattach-to-user-namespace pbcopy"
   
   # Update default binding of Enter to also use copy-pipe
   unbind -T copy-mode-vi Enter
   bind -T copy-mode-vi Enter send -X copy-pipe "reattach-to-user-namespace pbcopy"
   ```

3. For newer Tmux versions (2.6+) with newer versions of macOS, this may work without `reattach-to-user-namespace`:
   ```
   set -g default-command $SHELL
   bind -T copy-mode-vi y send -X copy-pipe-and-cancel "pbcopy"
   ```

#### Keyboard Shortcuts

Some macOS shortcuts to be aware of when customizing Tmux:
- `Cmd+K` clears terminal buffer (bypasses Tmux scrollback)
- `Cmd+T` creates new tab in terminal (not Tmux window)
- Consider rebinding Tmux prefix to avoid conflict with macOS keyboard shortcuts

### macOS-Specific Optimizations

```
# Optimize for faster key repetition
set -sg escape-time 10

# Enable focus events forwarding for better vim integration
set -g focus-events on

# Use Cmd+K to clear both terminal and tmux scrollback
bind -n C-k send-keys -R \; clear-history
```

## Linux

### Installation

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install tmux

# Fedora
sudo dnf install tmux

# Arch Linux
sudo pacman -S tmux

# From source
sudo apt install libevent-dev ncurses-dev build-essential
wget https://github.com/tmux/tmux/releases/download/3.3a/tmux-3.3a.tar.gz
tar -zxf tmux-3.3a.tar.gz
cd tmux-3.3a
./configure && make
sudo make install
```

### Platform-Specific Considerations

#### Terminal Emulators
- **GNOME Terminal**: Good default option, supports 256 colors
- **Konsole**: KDE's terminal with good Tmux support
- **Terminator**: Has split window features, which can be redundant with Tmux
- **Alacritty**: Fast, GPU-accelerated terminal that works well with Tmux
- **Kitty**: Another GPU-accelerated terminal with good Tmux support

#### Clipboard Integration

For X11-based systems:
```
# Install xclip or xsel
sudo apt install xclip   # or xsel

# Add to .tmux.conf
bind -T copy-mode-vi y send -X copy-pipe "xclip -sel clip -i"
bind -T copy-mode-vi MouseDragEnd1Pane send-keys -X copy-pipe "xclip -sel clip -i"
```

For Wayland:
```
# Install wl-clipboard
sudo apt install wl-clipboard

# Add to .tmux.conf
bind -T copy-mode-vi y send -X copy-pipe "wl-copy"
bind -T copy-mode-vi MouseDragEnd1Pane send-keys -X copy-pipe "wl-copy"
```

#### File Paths and Configuration

Linux uses a standard file path for Tmux configuration:
```bash
# User configuration
~/.tmux.conf

# System-wide configuration (rarely used)
/etc/tmux.conf
```

### Linux-Specific Optimizations

For better performance on resource-constrained Linux systems:
```
# Reduce status bar update frequency
set -g status-interval 5

# Limit scrollback buffer
set -g history-limit 5000

# Simplify status bar if needed
set -g status-right "%H:%M"
```

## Windows (WSL)

### Installation

Tmux works best in Windows through Windows Subsystem for Linux (WSL):

1. Install WSL:
   ```powershell
   # In PowerShell (as administrator)
   wsl --install
   ```

2. Install Tmux in your WSL distribution:
   ```bash
   # Ubuntu WSL
   sudo apt update
   sudo apt install tmux
   ```

### Platform-Specific Considerations

#### Terminal Emulators
- **Windows Terminal** (recommended): Best integration with WSL and supports Tmux well
  - Update Windows Terminal to the latest version for improved performance and feature support
- **VSCode with Remote WSL extension**: Good for developers
- **ConEmu/Cmder**: Alternative options with WSL support

#### Clipboard Integration

To enable clipboard integration between WSL and Windows:

```
# Add to .tmux.conf
bind -T copy-mode-vi y send -X copy-pipe-and-cancel "clip.exe"
bind -T copy-mode-vi MouseDragEnd1Pane send-keys -X copy-pipe-and-cancel "clip.exe"
```

#### File System Performance

WSL file system interactions can be slower, especially across the Windows/Linux boundary:
- Keep your Tmux configuration and project files within the Linux file system for better performance
- Access Windows files via `/mnt/c/` only when necessary
- Consider using WSL2 over WSL1 for better file system performance

### WSL-Specific Optimizations

```
# Optimize for Windows Terminal
set -g default-terminal "xterm-256color"

# Fix potential rendering issues
set -ga terminal-overrides ",*256col*:Tc"

# Fix for slow escape key in Windows Terminal + WSL
set -sg escape-time 10

# For VSCode-compatible mouse support
set -g mouse on
```

#### Handling Display Quirks

If you experience display issues with Windows Terminal:
```
# Add to .tmux.conf to fix potential issues
set -g default-terminal "tmux-256color"
set -ga terminal-overrides ",*256col*:RGB"

# If you see rendering artifacts
set -g default-terminal "screen-256color"
```

#### Path Handling in WSL

When starting Tmux in Windows paths through WSL:
```bash
# Use native WSL paths instead of Windows paths
cd ~ && tmux    # Good
cd /mnt/c/Users/username && tmux    # May cause issues
```

## Remote Servers and SSH

### SSH with Tmux

For seamless Tmux usage over SSH:

```bash
# Start a new session or attach if one exists
ssh user@server -t "tmux new -A -s mysession"

# Force 256 color support
ssh -t user@server "TERM=xterm-256color tmux new -A -s mysession"
```

### Preventing Nested Tmux Sessions

When using SSH within Tmux to connect to another Tmux session:

1. Add visual cues to differentiate sessions:
   ```
   # On local .tmux.conf
   set -g status-style bg=green
   
   # On remote .tmux.conf
   set -g status-style bg=red
   ```

2. Use different prefix keys for local and remote:
   ```
   # On remote .tmux.conf
   unbind C-b
   set -g prefix C-a
   bind C-a send-prefix
   ```

### SSH Connection Handling

For better handling of SSH connections within Tmux:

```
# Keep SSH connections alive
set -g update-environment "SSH_ASKPASS SSH_AUTH_SOCK SSH_AGENT_PID SSH_CONNECTION"

# Longer SSH keepalive
set -g set-clipboard on
```

## Containerized Environments

### Docker and Kubernetes

When using Tmux inside containers:

1. Install minimal Tmux in Dockerfile:
   ```dockerfile
   FROM ubuntu:20.04
   RUN apt-get update && apt-get install -y tmux
   ```

2. Use lightweight configuration for containers:
   ```
   # Minimal .tmux.conf for containers
   set -g default-terminal "screen"
   set -g history-limit 1000
   set -g status-right "#{host}"
   set -g mouse off
   ```

3. For Kubernetes pods:
   ```bash
   kubectl exec -it pod-name -- tmux new -A -s debug
   ```

### Minimal Environments

For very resource-constrained environments:
```
# Ultra-minimal config
set -g status off
set -g history-limit 100
set -sg escape-time 0
```

## Cross-Platform Configuration

### Creating a Universal Configuration

To create a `.tmux.conf` that works across all platforms:

```
# Detect OS and set platform-specific settings
run-shell 'tmux setenv -g TMUX_OS $(uname -s)'

# macOS specific settings
if-shell 'test "$(uname -s)" = Darwin' {
    set -g default-command "reattach-to-user-namespace -l $SHELL"
    bind -T copy-mode-vi y send -X copy-pipe-and-cancel "pbcopy"
}

# Linux specific settings
if-shell 'test "$(uname -s)" = Linux' {
    if-shell 'command -v xclip > /dev/null' {
        bind -T copy-mode-vi y send -X copy-pipe-and-cancel "xclip -sel clip -i"
    }
    if-shell 'command -v wl-copy > /dev/null' {
        bind -T copy-mode-vi y send -X copy-pipe-and-cancel "wl-copy"
    }
}

# WSL specific settings
if-shell 'grep -q Microsoft /proc/version' {
    bind -T copy-mode-vi y send -X copy-pipe-and-cancel "clip.exe"
}
```

### Managing Multiple Configurations

For complex multi-environment setups:

1. Create a common base configuration:
   ```
   # ~/.tmux.conf.common
   # Common settings here
   ```

2. Create platform-specific configurations:
   ```
   # ~/.tmux.conf.mac
   # ~/.tmux.conf.linux
   # ~/.tmux.conf.wsl
   ```

3. In main `.tmux.conf`, include the appropriate files:
   ```
   source-file ~/.tmux.conf.common
   if-shell 'test "$(uname -s)" = Darwin' 'source-file ~/.tmux.conf.mac'
   if-shell 'test "$(uname -s)" = Linux' 'source-file ~/.tmux.conf.linux'
   if-shell 'grep -q Microsoft /proc/version' 'source-file ~/.tmux.conf.wsl'
   ```

## Experimental Environments

### Chrome OS (Crostini)

For Chrome OS with Linux support:
```bash
# Install in Linux container
sudo apt update
sudo apt install tmux
```

Configuration notes:
```
# For Chrome OS terminal
set -g default-terminal "screen-256color"
```

### iOS (iSH)

For iSH app on iOS:
```bash
# Install in iSH
apk add tmux
```

Minimal configuration for touch devices:
```
# For touch-friendly interface
set -g mouse on
set -g status-right ""
set -g status-left ""
set -g window-status-current-format " #I "
set -g window-status-format " #I "
```

## Resources and References

- [Official Tmux GitHub Repository](https://github.com/tmux/tmux)
- [Tmux Wiki](https://github.com/tmux/tmux/wiki)
- [Windows Terminal Documentation](https://docs.microsoft.com/en-us/windows/terminal/)
- [iTerm2 Tmux Integration](https://iterm2.com/documentation-tmux-integration.html)
- [WSL Documentation](https://docs.microsoft.com/en-us/windows/wsl/)