#!/bin/bash
# Multi-server monitoring script for tmux
# For the Tmux Tutorial Series

# Configuration - Replace with your server details
SERVERS=(
  "localhost"
  # Add more servers here, e.g.:
  # "user@server1.example.com"
  # "user@server2.example.com"
)

# Colors for different panes
COLORS=(
  "green"
  "yellow"
  "blue"
  "magenta"
  "cyan"
)

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

# Function to create a monitoring session
create_monitoring_session() {
  session_name="monitor"
  
  # Check if session already exists
  tmux has-session -t $session_name 2>/dev/null
  
  if [ $? != 0 ]; then
    echo "Creating new tmux monitoring session: $session_name"
    
    # Start a new detached session
    tmux new-session -d -s $session_name -n "system"
    
    # Set up initial layout for system monitoring
    setup_system_monitoring
    
    # Create a logs window
    tmux new-window -t "$session_name:1" -n "logs"
    setup_logs_monitoring
    
    # Create a network window
    tmux new-window -t "$session_name:2" -n "network"
    setup_network_monitoring
    
    # Create a processes window
    tmux new-window -t "$session_name:3" -n "processes"
    setup_process_monitoring
    
    # Select the first window
    tmux select-window -t "$session_name:0"
    
    echo "Monitoring environment created!"
  else
    echo "Session $session_name already exists, attaching..."
  fi
  
  # Attach to the session
  tmux attach-session -t $session_name
}

# Function to set up system monitoring panes
setup_system_monitoring() {
  # Create panes for each server's system stats
  local window="$session_name:0"
  local count=${#SERVERS[@]}
  local server_count=$count
  
  # Start with a clean window
  if [ $count -gt 0 ]; then
    # Configure first pane for first server
    tmux send-keys -t "$window.0" "ssh ${SERVERS[0]} 'top -b'" C-m
    tmux select-pane -t "$window.0" -P "fg=${COLORS[0]}"
    
    # Create panes for remaining servers
    for (( i=1; i<$count; i++ )); do
      # Split the window vertically if it's the first half, horizontally if it's the second half
      if [ $i -lt $(($count/2+$count%2)) ]; then
        tmux split-window -v -t "$window"
      else
        tmux split-window -h -t "$window.$(($i-$count/2-$count%2))"
      fi
      
      # Send top command to server
      tmux send-keys -t "$window.$i" "ssh ${SERVERS[$i]} 'top -b'" C-m
      tmux select-pane -t "$window.$i" -P "fg=${COLORS[$i % ${#COLORS[@]}]}"
    done
    
    # Set even layout
    tmux select-layout -t "$window" tiled
  fi
}

# Function to set up logs monitoring
setup_logs_monitoring() {
  local window="$session_name:1"
  local count=${#SERVERS[@]}
  
  if [ $count -gt 0 ]; then
    # Configure first pane for first server
    tmux send-keys -t "$window.0" "ssh ${SERVERS[0]} 'tail -f /var/log/syslog 2>/dev/null || tail -f /var/log/messages 2>/dev/null || tail -f /var/log/system.log 2>/dev/null || echo \"No standard logs found\"'" C-m
    tmux select-pane -t "$window.0" -P "fg=${COLORS[0]}"
    
    # Create panes for remaining servers
    for (( i=1; i<$count; i++ )); do
      # Split the window based on the number of servers
      if [ $i -lt $(($count/2+$count%2)) ]; then
        tmux split-window -v -t "$window"
      else
        tmux split-window -h -t "$window.$(($i-$count/2-$count%2))"
      fi
      
      # Send log command to server
      tmux send-keys -t "$window.$i" "ssh ${SERVERS[$i]} 'tail -f /var/log/syslog 2>/dev/null || tail -f /var/log/messages 2>/dev/null || tail -f /var/log/system.log 2>/dev/null || echo \"No standard logs found\"'" C-m
      tmux select-pane -t "$window.$i" -P "fg=${COLORS[$i % ${#COLORS[@]}]}"
    done
    
    # Set even layout
    tmux select-layout -t "$window" tiled
  fi
}

# Function to set up network monitoring
setup_network_monitoring() {
  local window="$session_name:2"
  local count=${#SERVERS[@]}
  
  if [ $count -gt 0 ]; then
    # Configure first pane for first server
    tmux send-keys -t "$window.0" "ssh ${SERVERS[0]} 'netstat -tun | grep ESTABLISHED'" C-m
    tmux select-pane -t "$window.0" -P "fg=${COLORS[0]}"
    
    # Create separate pane for ping tests
    tmux split-window -v -t "$window.0"
    tmux send-keys -t "$window.1" "ping -c 1 google.com" C-m
    tmux select-pane -t "$window.1" -P "fg=${COLORS[1 % ${#COLORS[@]}]}"
    
    # Create a pane for network bandwidth monitoring if vnstat is available
    tmux split-window -h -t "$window.0"
    tmux send-keys -t "$window.2" "ssh ${SERVERS[0]} 'vnstat -l 2>/dev/null || echo \"vnstat not installed\"'" C-m
    tmux select-pane -t "$window.2" -P "fg=${COLORS[2 % ${#COLORS[@]}]}"
    
    # Set layout
    tmux select-layout -t "$window" main-vertical
  fi
}

# Function to set up process monitoring
setup_process_monitoring() {
  local window="$session_name:3"
  local count=${#SERVERS[@]}
  
  if [ $count -gt 0 ]; then
    # Configure first pane for first server
    tmux send-keys -t "$window.0" "ssh ${SERVERS[0]} 'ps aux --sort=-%cpu | head -10'" C-m
    tmux select-pane -t "$window.0" -P "fg=${COLORS[0]}"
    
    # Create a pane for memory usage
    tmux split-window -v -t "$window.0"
    tmux send-keys -t "$window.1" "ssh ${SERVERS[0]} 'free -m'" C-m
    tmux select-pane -t "$window.1" -P "fg=${COLORS[1 % ${#COLORS[@]}]}"
    
    # Create a pane for disk usage
    tmux split-window -h -t "$window.0"
    tmux send-keys -t "$window.2" "ssh ${SERVERS[0]} 'df -h'" C-m
    tmux select-pane -t "$window.2" -P "fg=${COLORS[2 % ${#COLORS[@]}]}"
    
    # Create another pane for custom commands
    tmux split-window -h -t "$window.1"
    tmux send-keys -t "$window.3" "echo 'Ready for custom commands'" C-m
    tmux select-pane -t "$window.3" -P "fg=${COLORS[3 % ${#COLORS[@]}]}"
    
    # Set layout
    tmux select-layout -t "$window" tiled
  fi
}

# Main function
main() {
  check_tmux
  create_monitoring_session
}

# Run the script
main

# Usage instructions
# 1. Make this script executable: chmod +x multi-server-monitor.sh
# 2. Edit the SERVERS array to include your own servers
# 3. Run it: ./multi-server-monitor.sh
# 4. To detach from the session: Ctrl+b, d
# 5. To reattach later: tmux attach -t monitor