# Tmux Installation Guide
*Compiled by M91232*

This guide provides instructions for installing Tmux on various operating systems.

## macOS

### Using Homebrew (recommended)
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Tmux
brew install tmux
```

### Using MacPorts
```bash
# Install MacPorts if you don't have it
# Then install Tmux
sudo port install tmux
```

## Linux

### Ubuntu/Debian
```bash
sudo apt update
sudo apt install tmux
```

### CentOS/RHEL/Fedora
```bash
# CentOS/RHEL
sudo yum install tmux

# Fedora
sudo dnf install tmux
```

### Arch Linux
```bash
sudo pacman -S tmux
```

## Windows

### Windows Subsystem for Linux (WSL)
1. Install WSL by following Microsoft's instructions
2. Open your WSL terminal
3. Install Tmux using the appropriate Linux commands above

### Cygwin
1. Download and install Cygwin from https://www.cygwin.com/
2. During installation, search for and select the tmux package
3. Complete the installation

### GitBash
Tmux is not natively supported in GitBash, but you can use WSL instead.

## FreeBSD
```bash
sudo pkg install tmux
```

## From Source
For the latest version or if Tmux is not available in your package manager:

```bash
# Install dependencies
# Debian/Ubuntu
sudo apt install libevent-dev ncurses-dev build-essential bison pkg-config

# Get the source (check for latest version)
wget https://github.com/tmux/tmux/releases/download/3.2a/tmux-3.2a.tar.gz
tar -zxf tmux-3.2a.tar.gz
cd tmux-3.2a

# Build and install
./configure
make
sudo make install
```

## Verifying Installation
After installation, verify that Tmux is correctly installed:

```bash
tmux -V
```

You should see the Tmux version printed, such as `tmux 3.2a`.

## Getting Started
Once Tmux is installed, you can start it by simply typing:

```bash
tmux
```

For more information on how to use Tmux, refer to the tutorial episodes and exercises in this repository.

## Troubleshooting

### Common Issues

#### "tmux: command not found"
- Ensure that the installation path is in your system's PATH variable
- Try restarting your terminal or shell

#### Terminal colors don't work correctly
Add this to your `.tmux.conf`:
```
set -g default-terminal "screen-256color"
```

#### Mouse support not working
For Tmux versions 2.1 and later:
```
set -g mouse on
```

For older versions:
```
set -g mode-mouse on
set -g mouse-resize-pane on
set -g mouse-select-pane on
set -g mouse-select-window on
```

#### Clipboard integration issues
This varies by platform. See the cheatsheet in this repository for platform-specific solutions.