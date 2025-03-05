# Episode 1: Introduction to Tmux

## Overview
In this first episode, we introduce Tmux, explain its benefits, and guide you through installation and basic usage.

## Script

## What is Tmux?
- Terminal multiplexer
- Allows multiple virtual terminals within a single window
- Sessions persist even when you disconnect
- Share sessions between multiple users

## Why Use Tmux?
- Enhanced productivity with multiple terminal panes
- Session persistence across disconnections
- Easy window management
- Scriptable and customizable
- Perfect for remote work and SSH connections

## Installation
```bash
# macOS
brew install tmux

# Ubuntu/Debian
sudo apt install tmux

# Fedora/RHEL
sudo dnf install tmux
```

## Basic Commands
- `tmux` - Start a new session
- `tmux new -s mysession` - Start a named session
- `tmux ls` - List sessions
- `tmux attach -t mysession` - Attach to a session
- `tmux kill-session -t mysession` - Kill a session

## Key Bindings
All commands in tmux are triggered by a prefix key (default: Ctrl+b) followed by a command key.

- `Ctrl+b c` - Create a new window
- `Ctrl+b p` - Previous window
- `Ctrl+b n` - Next window
- `Ctrl+b %` - Split pane vertically
- `Ctrl+b "` - Split pane horizontally
- `Ctrl+b arrow key` - Navigate between panes
- `Ctrl+b d` - Detach from session

## Demo
The video will include a live demo showing:
1. Creating a new tmux session
2. Creating and navigating between windows
3. Splitting panes
4. Detaching and reattaching to a session

## Exercises
1. Install tmux
2. Create a named session
3. Create multiple windows
4. Split a window into panes
5. Navigate between panes
6. Detach and reattach to your session

## Resources
- [Tmux GitHub Repository](https://github.com/tmux/tmux)
- [Tmux Cheat Sheet](../cheatsheets/tmux-basics.md)
- [Sample Tmux Configuration](../configs/tmux.conf)