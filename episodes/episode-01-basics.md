# Tmux Tutorial Series - Episode 1: Basics
*Script by M91232*

## Introduction (2 minutes)
- Welcome viewers to the Tmux tutorial series
- Introduce yourself and explain what the series will cover
- Briefly explain what Tmux is and why it's useful

## What is Tmux? (3 minutes)
- Terminal multiplexer explanation
- Benefits of using Tmux:
  - Session persistence
  - Multiple windows and panes
  - Remote session access
  - Collaboration possibilities
- Show a quick demo of a complex Tmux setup to excite viewers

## Installation (2 minutes)
- How to install Tmux on different platforms:
  - macOS: `brew install tmux`
  - Ubuntu/Debian: `apt install tmux`
  - CentOS/RHEL: `yum install tmux`
- Verify installation with `tmux -V`

## Tmux Terminology (3 minutes)
- Session: A collection of windows (show diagram)
- Window: Like a tab in a terminal (show diagram)
- Pane: Splits within a window (show diagram)
- Prefix key: Default is Ctrl+b

## Basic Commands (5 minutes)
- Starting Tmux: `tmux`
- Creating a named session: `tmux new -s mysession`
- Detaching: `Prefix + d`
- Listing sessions: `tmux ls`
- Attaching to sessions: `tmux attach` or `tmux a -t mysession`
- Killing sessions: `tmux kill-session -t mysession`

## Window Management (5 minutes)
- Creating windows: `Prefix + c`
- Switching windows: `Prefix + 0-9`, `Prefix + n/p`
- Listing windows: `Prefix + w`
- Renaming windows: `Prefix + ,`
- Closing windows: `Prefix + &`

## Pane Management (5 minutes)
- Splitting horizontally: `Prefix + "`
- Splitting vertically: `Prefix + %`
- Navigating panes: `Prefix + arrow keys`
- Resizing panes: `Prefix + Ctrl + arrow keys`
- Zooming a pane: `Prefix + z`
- Closing a pane: `Prefix + x`
- Converting a pane to a window: `Prefix + !`

## Command Mode (3 minutes)
- Entering command mode: `Prefix + :`
- Useful commands:
  - `new-window -n name`
  - `split-window`
  - `resize-pane -D 10`
  - `set-option -g mouse on`

## Copy Mode (2 minutes)
- Entering copy mode: `Prefix + [`
- Navigation in copy mode
- Selection and copying
- Pasting: `Prefix + ]`

## Demo: Building a Development Environment (5 minutes)
- Create a session with multiple windows:
  - Editor window with split panes
  - Server window
  - Log monitoring window

## Next Steps and Preview (2 minutes)
- Brief mention of advanced topics to come:
  - Configuration
  - Customization
  - Scripting
  - Plugins
- Preview of Episode 2

## Conclusion (1 minute)
- Summary of what was covered
- Encourage practice with the included exercises
- Thank viewers and provide resources for more information