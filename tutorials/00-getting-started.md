# Getting Started with tmux

## Installation

### macOS
```bash
# Using Homebrew
brew install tmux

# Using MacPorts
sudo port install tmux
```

## Linux
```bash
# Debian/Ubuntu
sudo apt install tmux

# Fedora
sudo dnf install tmux

# Arch Linux
sudo pacman -S tmux
```

## Windows
On Windows, you can use tmux through WSL (Windows Subsystem for Linux):
1. Install WSL following [Microsoft's guide](https://docs.microsoft.com/en-us/windows/wsl/install)
2. Install tmux in your WSL distribution using the Linux instructions above

## Basic Commands

### Starting a New Session
```bash
# Start a new session
tmux

# Start a new session with a name
tmux new -s session-name
```

## Session Management
```bash
# Detach from current session
Ctrl+b d

# List all sessions
tmux ls

# Attach to a session
tmux attach -t session-name
```

## Window Management
```bash
# Create a new window
Ctrl+b c

# Switch to next window
Ctrl+b n

# Switch to previous window
Ctrl+b p

# Switch to window by number
Ctrl+b [0-9]
```

## Pane Management
```bash
# Split pane horizontally
Ctrl+b %

# Split pane vertically
Ctrl+b "

# Move between panes
Ctrl+b arrow-key

# Toggle between panes
Ctrl+b o

# Resize pane
Ctrl+b Ctrl+arrow-key
```

## Next Steps

Once you're comfortable with these basics, check out the following tutorials:
- [Window Management](01-window-management.md)
- [Pane Layouts](02-pane-layouts.md)
- [Customizing tmux](03-customizing-tmux.md)