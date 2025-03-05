#!/bin/bash
# Script to create a development tmux session with a predefined layout

SESSION_NAME="dev"

# If the session already exists, attach to it
tmux has-session -t $SESSION_NAME 2>/dev/null
if [ $? -eq 0 ]; then
    echo "Session $SESSION_NAME already exists. Attaching..."
    tmux attach-session -t $SESSION_NAME
    exit 0
fi

# Create a new session with a code window
tmux new-session -d -s $SESSION_NAME -n "code"

# Split the window into panes
tmux split-window -h -t $SESSION_NAME:0  # Split horizontally
tmux split-window -v -t $SESSION_NAME:0.1  # Split the right pane vertically

# Create a window for running tests
tmux new-window -t $SESSION_NAME:1 -n "tests"

# Create a window for git operations
tmux new-window -t $SESSION_NAME:2 -n "git"
tmux send-keys -t $SESSION_NAME:2 "git status" C-m

# Create a window for logs
tmux new-window -t $SESSION_NAME:3 -n "logs"
tmux send-keys -t $SESSION_NAME:3 "tail -f logs/development.log" C-m

# Return to the first window
tmux select-window -t $SESSION_NAME:0

# Attach to the session
tmux attach-session -t $SESSION_NAME