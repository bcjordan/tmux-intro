#!/bin/bash
# Tmux Development Environment Setup Script
# Author: M91232

# Exit if any command fails
set -e

# Configuration variables
SESSION_NAME="dev"
EDITOR=${EDITOR:-vim}
SERVER_START_CMD="echo 'Server would start here'"
DB_START_CMD="echo 'Database would start here'"
LOG_FILE="/tmp/dev-log.txt"

# Create log file if it doesn't exist
touch "$LOG_FILE"

# Function to check if tmux is installed
check_tmux() {
    if ! command -v tmux &> /dev/null; then
        echo "Error: tmux is not installed. Please install tmux first."
        exit 1
    fi
}

# Function to check if session already exists
session_exists() {
    tmux has-session -t "$SESSION_NAME" 2>/dev/null
}

# Function to create a new development session
create_session() {
    echo "Creating new development session: $SESSION_NAME"
    
    # Start a new detached session
    tmux new-session -d -s "$SESSION_NAME" -n "editor"
    
    # Configure the editor window
    tmux send-keys -t "$SESSION_NAME":editor "$EDITOR" C-m
    tmux split-window -h -t "$SESSION_NAME":editor
    tmux resize-pane -t "$SESSION_NAME":editor.1 -x 40
    tmux send-keys -t "$SESSION_NAME":editor.1 "ls -la" C-m
    
    # Create and configure the server window
    tmux new-window -t "$SESSION_NAME":1 -n "server"
    tmux send-keys -t "$SESSION_NAME":server "$SERVER_START_CMD" C-m
    
    # Create and configure the database window
    tmux new-window -t "$SESSION_NAME":2 -n "database"
    tmux send-keys -t "$SESSION_NAME":database "$DB_START_CMD" C-m
    
    # Create and configure the logs window
    tmux new-window -t "$SESSION_NAME":3 -n "logs"
    tmux send-keys -t "$SESSION_NAME":logs "tail -f $LOG_FILE" C-m
    
    # Return to the editor window
    tmux select-window -t "$SESSION_NAME":editor
    
    echo "Development environment has been configured"
}

# Function to attach to the session
attach_session() {
    echo "Attaching to session: $SESSION_NAME"
    tmux attach-session -t "$SESSION_NAME"
}

# Function to kill the session
kill_session() {
    if session_exists; then
        echo "Killing session: $SESSION_NAME"
        tmux kill-session -t "$SESSION_NAME"
    fi
}

# Function to display help
show_help() {
    cat << EOF
Usage: $0 [option]

Options:
  -h, --help     Show this help message
  -c, --create   Create the development session
  -a, --attach   Attach to the development session
  -k, --kill     Kill the development session
  -r, --recreate Recreate the session (kill if exists, then create)

If no option is provided, the script will create the session if it doesn't exist
and then attach to it.
EOF
}

# Main script execution
check_tmux

# Process command line arguments
case "$1" in
    -h|--help)
        show_help
        exit 0
        ;;
    -c|--create)
        if ! session_exists; then
            create_session
        else
            echo "Session $SESSION_NAME already exists"
        fi
        ;;
    -a|--attach)
        if session_exists; then
            attach_session
        else
            echo "Session $SESSION_NAME does not exist"
            exit 1
        fi
        ;;
    -k|--kill)
        kill_session
        ;;
    -r|--recreate)
        kill_session
        create_session
        attach_session
        ;;
    *)
        # Default behavior
        if ! session_exists; then
            create_session
        fi
        attach_session
        ;;
esac

exit 0