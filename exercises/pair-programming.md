# Remote Pair Programming with Tmux

This guide will help you set up and effectively use Tmux for remote pair programming sessions.

## Prerequisites

- Both participants should have:
  - SSH access to a shared server, or
  - Local user accounts on the same machine
- Tmux installed on the shared environment
- Basic Tmux knowledge (see our [basics tutorial](/episodes/01-introduction.md))

## Setting Up a Shared Session

## Method 1: Using a Socket File (Same Machine)

### Host (User 1)
```bash
# Create a new session with a shared socket
tmux -S /tmp/pair-session new -s pair

# Make the socket accessible to other users
chmod 777 /tmp/pair-session
```

### Guest (User 2)
```bash
# Attach to the shared session
tmux -S /tmp/pair-session attach -t pair
```

## Method 2: Using SSH (Remote Machines)

### Host (User 1)
```bash
# On the server, create a new tmux session
tmux new -s pair
```

### Guest (User 2)
```bash
# SSH to the server and attach to the session
ssh user@server
tmux attach -t pair
```

## Best Practices for Pair Programming

## Communication

1. **Establish clear roles**:
   - **Driver**: Person actively typing code
   - **Navigator**: Person reviewing, suggesting, and thinking ahead

2. **Switch roles regularly**:
   - Set a timer (e.g., 15-30 minutes)
   - Use `tmux clock-mode` (Prefix + t) to keep track

3. **Use a text-based chat within Tmux**:
   ```bash
   # In a separate pane, use a simple chat program
   nc -l 8888  # On one side
   nc localhost 8888  # On the other side
   ```

## Visual Indicators

1. **Customize the status bar to show who's active**:
   ```bash
   # In tmux.conf or command mode
   set -g status-right "#{?client_prefix,#[bg=red]TYPING#[bg=default],}"
   ```

2. **Use different cursor colors or pane borders**:
   ```bash
   # For User 1
   tmux select-pane -t:.1 -P 'bg=black,fg=green'
   
   # For User 2
   tmux select-pane -t:.2 -P 'bg=black,fg=blue'
   ```

## Workflow Tips

1. **Create a dedicated "communication" pane**:
   ```bash
   # Split a pane for notes/communication
   tmux split-window -v -p 20
   ```

2. **Use a shared scratchpad**:
   ```bash
   # In a pane, create a temporary file for notes
   vim /tmp/pair-notes.txt
   ```

3. **Synchronize panes when needed**:
   ```bash
   # Enable synchronized input to all panes
   tmux set-window-option synchronize-panes on
   
   # Disable when done
   tmux set-window-option synchronize-panes off
   ```

4. **Create a "command" window**:
   - Dedicated window for running commands
   - Keeps the main coding window clean

5. **Establish visual cues for turn-taking**:
   ```bash
   # When it's your turn to type
   tmux display-message "Driver: [Your Name]"
   ```

## Advanced Configuration

Create a pair programming configuration file:

```bash
# ~/.tmux-pair.conf

# Visual indicator for active user
set -g status-left-length 50
set -g status-left "#[fg=green][#S] #[fg=yellow]#(whoami)"
set -g status-right "#{?client_prefix,#[bg=red]TYPING#[bg=default],} #[fg=cyan]%H:%M"

# Highlight active pane more obviously
set -g pane-active-border-style fg=red,bg=default

# Longer history
set -g history-limit 50000

# Faster key repetition for smoother experience
set -g repeat-time 500

# Activity monitoring
setw -g monitor-activity on
set -g visual-activity on

# No delay for escape key
set -sg escape-time 0
```

To use this config:
```bash
tmux -f ~/.tmux-pair.conf new -s pair
```

## Exercise: Practice Session

1. **Setup Phase**:
   - Create a shared Tmux session
   - Configure distinct visual indicators for each participant
   - Set up a dedicated communication pane

2. **Coding Task**:
   - Choose a simple programming task
   - Take turns as driver/navigator (15 minutes each)
   - Use your shared scratchpad to track ideas and tasks

3. **Reflection**:
   - What worked well?
   - What would you improve for next time?
   - How did Tmux help or hinder the collaboration?

## Common Issues and Solutions

## Problem: Input lag
**Solution**: Adjust the Tmux escape-time setting
```bash
set -sg escape-time 0
```

## Problem: Screen size differences
**Solution**: Use Tmux's aggressive-resize option
```bash
setw -g aggressive-resize on
```

## Problem: Unclear who's typing
**Solution**: Add more obvious visual indicators to the status bar

## Problem: Confusion with prefixes
**Solution**: Agree on a shared Tmux prefix (Ctrl+a is often easier to type than the default Ctrl+b)

## Conclusion

Effective pair programming with Tmux combines technical setup with good communication practices. As you become more comfortable with the tool, you'll develop your own preferences and workflows that enhance collaboration.