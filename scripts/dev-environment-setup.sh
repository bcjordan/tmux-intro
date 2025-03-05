#!/bin/bash
# Script to create a development environment with tmux
# For the Tmux Tutorial Series

# Function to check if tmux is installed
check_tmux() {
  if ! command -v tmux &> /dev/null; then
    echo "Error: tmux is not installed. Please install tmux first."
    echo "macOS: brew install tmux"
    echo "Ubuntu/Debian: sudo apt install tmux"
    echo "Fedora/RHEL: sudo dnf install tmux"
    exit 1
  fi
}

# Function to create a new session if it doesn't exist
create_session() {
  session_name="dev"
  
  # Check if session already exists
  tmux has-session -t $session_name 2>/dev/null
  
  if [ $? != 0 ]; then
    echo "Creating new tmux session: $session_name"
    
    # Start a new session with the first window named 'editor'
    tmux new-session -d -s $session_name -n "editor"
    
    # Split the editor window into two panes
    tmux split-window -h -t "$session_name:editor"
    
    # Create a 'server' window
    tmux new-window -t "$session_name:1" -n "server"
    
    # Create a 'logs' window
    tmux new-window -t "$session_name:2" -n "logs"
    
    # Setup the editor window with vim/nano in left pane
    tmux send-keys -t "$session_name:editor.0" "echo 'Left editor pane - could run vim/nano here'" C-m
    
    # Setup the right pane with git status
    tmux send-keys -t "$session_name:editor.1" "echo 'Right editor pane - could show git status here'; git status 2>/dev/null || echo 'Not a git repository'" C-m
    
    # Setup the server window with a simple Python HTTP server (if available)
    tmux send-keys -t "$session_name:server" "echo 'Server window - starting a simple server'; python -m http.server 8000 2>/dev/null || python -m SimpleHTTPServer 8000 2>/dev/null || echo 'Python not available for HTTP server'" C-m
    
    # Setup the logs window to show some system logs or tail a log file
    tmux send-keys -t "$session_name:logs" "echo 'Logs window - showing system logs'; tail -f /var/log/system.log 2>/dev/null || tail -f /var/log/syslog 2>/dev/null || echo 'No standard system logs found to display'" C-m
    
    # Select the editor window to start
    tmux select-window -t "$session_name:editor"
    
    echo "Development environment created!"
  else
    echo "Session $session_name already exists, attaching..."
  fi
  
  # Attach to the session
  tmux attach-session -t $session_name
}

# Main function
main() {
  check_tmux
  create_session
}

# Run the script
main

# Usage instructions
# 1. Make this script executable: chmod +x dev-environment-setup.sh
# 2. Run it: ./dev-environment-setup.sh
# 3. To detach from the session: Ctrl+b, d
# 4. To reattach later: tmux attach -t dev