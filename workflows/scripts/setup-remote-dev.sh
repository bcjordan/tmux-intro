#!/bin/bash
# File: setup-remote-dev.sh
# Description: Script to set up a remote development environment with tmux

SERVER="user@remote-server"
SESSION="dev"

# Check if session exists
ssh $SERVER "tmux has-session -t $SESSION 2>/dev/null"

if [ $? -eq 1 ]; then
  echo "Creating new development session..."
  
  # Create session with initial window
  ssh $SERVER "tmux new-session -d -s $SESSION -n 'editor'"
  
  # Set up editor
  ssh $SERVER "tmux send-keys -t $SESSION:editor 'cd ~/project' C-m"
  ssh $SERVER "tmux send-keys -t $SESSION:editor 'vim .' C-m"
  
  # Create terminal window
  ssh $SERVER "tmux new-window -t $SESSION:1 -n 'terminal'"
  ssh $SERVER "tmux send-keys -t $SESSION:terminal 'cd ~/project' C-m"
  
  # Create server window
  ssh $SERVER "tmux new-window -t $SESSION:2 -n 'server'"
  ssh $SERVER "tmux send-keys -t $SESSION:server 'cd ~/project' C-m"
  ssh $SERVER "tmux send-keys -t $SESSION:server 'npm start' C-m"
  
  # Return to editor window
  ssh $SERVER "tmux select-window -t $SESSION:editor"
else
  echo "Session $SESSION already exists."
fi

# Connect to session
ssh -t $SERVER "tmux attach -t $SESSION"