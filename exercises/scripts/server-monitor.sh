#!/bin/bash
# Server Monitoring Script with Tmux
# Author: M91232
#
# This script creates a monitoring dashboard for multiple servers using tmux.
# It sets up a structured layout to monitor system resources, logs, and status.

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default session name
SESSION_NAME="monitor"

# Default server list (comma-separated)
SERVERS=""

# Log files to monitor
SYSLOG="/var/log/syslog"
AUTHLOG="/var/log/auth.log"
WEBLOG="/var/log/nginx/error.log"

# Function to print usage information
function print_usage() {
    echo -e "${BLUE}Tmux Server Monitoring Dashboard${NC}"
    echo
    echo "Usage: $0 [options]"
    echo
    echo "Options:"
    echo "  -s, --servers LIST   Comma-separated list of servers to monitor"
    echo "  -n, --name NAME      Session name (defaults to 'monitor')"
    echo "  -l, --logs LIST      Comma-separated list of log files to monitor"
    echo "  -k, --kill           Kill existing session if it exists"
    echo "  -h, --help           Show this help message"
    echo
    echo "Examples:"
    echo "  $0 --servers 'web1.example.com,web2.example.com,db1.example.com'"
    echo "  $0 --name production-monitor --servers 'prod-web1,prod-db1'"
    echo
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        -s|--servers)
            SERVERS="$2"
            shift
            shift
            ;;
        -n|--name)
            SESSION_NAME="$2"
            shift
            shift
            ;;
        -l|--logs)
            IFS=',' read -ra LOG_ARRAY <<< "$2"
            if [[ ${#LOG_ARRAY[@]} -ge 1 ]]; then SYSLOG="${LOG_ARRAY[0]}"; fi
            if [[ ${#LOG_ARRAY[@]} -ge 2 ]]; then AUTHLOG="${LOG_ARRAY[1]}"; fi
            if [[ ${#LOG_ARRAY[@]} -ge 3 ]]; then WEBLOG="${LOG_ARRAY[2]}"; fi
            shift
            shift
            ;;
        -k|--kill)
            KILL_EXISTING=1
            shift
            ;;
        -h|--help)
            print_usage
            exit 0
            ;;
        *)
            echo -e "${YELLOW}Unknown option: $1${NC}"
            print_usage
            exit 1
            ;;
    esac
done

# Check if tmux is installed
if ! command -v tmux &> /dev/null; then
    echo -e "${RED}Error: tmux is not installed. Please install tmux first.${NC}"
    exit 1
fi

# Check if session already exists
tmux has-session -t "$SESSION_NAME" 2>/dev/null
if [[ $? -eq 0 ]]; then
    if [[ $KILL_EXISTING -eq 1 ]]; then
        echo -e "${YELLOW}Killing existing session: $SESSION_NAME${NC}"
        tmux kill-session -t "$SESSION_NAME"
    else
        echo -e "${GREEN}Session '$SESSION_NAME' already exists. Attaching...${NC}"
        tmux attach-session -t "$SESSION_NAME"
        exit 0
    fi
fi

echo -e "${BLUE}Creating monitoring dashboard session: $SESSION_NAME${NC}"

# Function to create a monitoring layout for a single server
function create_single_server_monitor() {
    local server="localhost"
    
    # Create a new session
    tmux new-session -d -s "$SESSION_NAME" -n "system"
    
    # System monitoring window
    tmux send-keys -t "$SESSION_NAME:0" "top" C-m
    tmux split-window -h -t "$SESSION_NAME:0"
    tmux send-keys -t "$SESSION_NAME:0.1" "htop || top" C-m
    tmux split-window -v -t "$SESSION_NAME:0.1"
    tmux send-keys -t "$SESSION_NAME:0.2" "watch df -h" C-m
    tmux select-pane -t "$SESSION_NAME:0.0"
    tmux split-window -v -t "$SESSION_NAME:0.0"
    tmux send-keys -t "$SESSION_NAME:0.3" "vmstat 5" C-m
    
    # Log monitoring window
    tmux new-window -t "$SESSION_NAME:1" -n "logs"
    tmux send-keys -t "$SESSION_NAME:1" "tail -f $SYSLOG 2>/dev/null || echo 'No system log available'" C-m
    tmux split-window -h -t "$SESSION_NAME:1"
    tmux send-keys -t "$SESSION_NAME:1.1" "tail -f $AUTHLOG 2>/dev/null || echo 'No auth log available'" C-m
    tmux split-window -v -t "$SESSION_NAME:1.1"
    tmux send-keys -t "$SESSION_NAME:1.2" "tail -f $WEBLOG 2>/dev/null || echo 'No web server log available'" C-m
    
    # Network monitoring window
    tmux new-window -t "$SESSION_NAME:2" -n "network"
    tmux send-keys -t "$SESSION_NAME:2" "netstat -tulanp | grep LISTEN" C-m
    tmux split-window -v -t "$SESSION_NAME:2"
    tmux send-keys -t "$SESSION_NAME:2.1" "iftop || nethogs || iptraf-ng || echo 'No network monitoring tool available'" C-m
    
    # Process monitoring window
    tmux new-window -t "$SESSION_NAME:3" -n "processes"
    tmux send-keys -t "$SESSION_NAME:3" "ps aux --sort=-%cpu | head -20" C-m
    tmux split-window -v -t "$SESSION_NAME:3"
    tmux send-keys -t "$SESSION_NAME:3.1" "watch -n 5 'ps aux --sort=-%mem | head -20'" C-m
    
    # Return to the system window
    tmux select-window -t "$SESSION_NAME:0"
}

# Function to create a multi-server monitoring dashboard
function create_multi_server_monitor() {
    local server_array=("$@")
    local server_count=${#server_array[@]}
    
    # Create a new session
    tmux new-session -d -s "$SESSION_NAME" -n "overview"
    
    # Overview window - grid layout with uptime for all servers
    for (( i=0; i<server_count; i++ )); do
        if [[ $i -gt 0 ]]; then
            if [[ $(($i % 2)) -eq 0 ]]; then
                tmux split-window -v -t "$SESSION_NAME:0"
            else
                tmux split-window -h -t "$SESSION_NAME:0"
            fi
        fi
        
        tmux send-keys -t "$SESSION_NAME:0.$i" "ssh ${server_array[$i]} 'echo \"=== ${server_array[$i]} ===\" && uptime && free -h && df -h | grep -v tmp | grep -v dev'" C-m
    done
    
    # Select tiled layout for overview window
    tmux select-layout -t "$SESSION_NAME:0" tiled
    
    # Create individual windows for each server
    for (( i=0; i<server_count; i++ )); do
        local server="${server_array[$i]}"
        local window_num=$((i+1))
        
        # Create window for this server
        tmux new-window -t "$SESSION_NAME:$window_num" -n "$server"
        
        # Top-left pane: CPU & memory
        tmux send-keys -t "$SESSION_NAME:$window_num" "ssh $server 'top -b -d 5 | head -20'" C-m
        
        # Top-right pane: Load, uptime, memory
        tmux split-window -h -t "$SESSION_NAME:$window_num"
        tmux send-keys -t "$SESSION_NAME:$window_num.1" "ssh $server 'watch -n 5 \"uptime; echo; free -h; echo; df -h | grep -v tmp | grep -v dev\"'" C-m
        
        # Bottom-right pane: Active connections
        tmux split-window -v -t "$SESSION_NAME:$window_num.1"
        tmux send-keys -t "$SESSION_NAME:$window_num.2" "ssh $server 'watch -n 5 \"netstat -an | grep ESTABLISHED | wc -l; echo; netstat -tulanp | grep LISTEN\"'" C-m
        
        # Bottom-left pane: Logs
        tmux select-pane -t "$SESSION_NAME:$window_num.0"
        tmux split-window -v -t "$SESSION_NAME:$window_num.0"
        tmux send-keys -t "$SESSION_NAME:$window_num.3" "ssh $server 'tail -f $SYSLOG $AUTHLOG 2>/dev/null || echo \"No logs available\"'" C-m
    done
    
    # Create a synchronized command window
    local sync_window=$((server_count+1))
    tmux new-window -t "$SESSION_NAME:$sync_window" -n "sync-cmd"
    
    # Split into panes for each server
    for (( i=0; i<server_count; i++ )); do
        if [[ $i -gt 0 ]]; then
            tmux split-window -v -t "$SESSION_NAME:$sync_window"
        fi
        
        tmux send-keys -t "$SESSION_NAME:$sync_window.$i" "echo \"=== ${server_array[$i]} ===\" && ssh ${server_array[$i]}" C-m
    done
    
    # Enable synchronized input on the command window
    tmux set-window-option -t "$SESSION_NAME:$sync_window" synchronize-panes on
    
    # Return to the overview window
    tmux select-window -t "$SESSION_NAME:0"
}

# Main logic to set up the monitoring dashboard
if [[ -z "$SERVERS" ]]; then
    echo -e "${YELLOW}No servers specified, monitoring local system only.${NC}"
    create_single_server_monitor
else
    echo -e "${GREEN}Setting up monitoring for multiple servers.${NC}"
    # Convert comma-separated list to array
    IFS=',' read -ra SERVER_ARRAY <<< "$SERVERS"
    create_multi_server_monitor "${SERVER_ARRAY[@]}"
fi

echo -e "${GREEN}Monitoring dashboard created successfully!${NC}"
echo -e "${BLUE}Attaching to tmux session: $SESSION_NAME${NC}"

# Attach to the session
tmux attach-session -t "$SESSION_NAME"