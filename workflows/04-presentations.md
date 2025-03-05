# Using tmux for Presentations and Demonstrations

tmux is a powerful tool for giving technical presentations, demonstrations, and conducting training sessions. This guide provides strategies and configurations for using tmux effectively in presentation contexts.

## Why Use tmux for Presentations?

- **Terminal-based demos**: Ideal for command-line tool demonstrations
- **Multi-view capability**: Show multiple aspects of your application simultaneously
- **Consistent environment**: Ensure your demo works the same every time
- **Fail-safe presentations**: Recover quickly if something goes wrong
- **Scripted demonstrations**: Pre-configure complex setups with automation
- **Low resource requirements**: Works well even with limited bandwidth or projector resolution

## Basic Presentation Setup

### Configuring tmux for Visibility

Create a presentation-specific tmux configuration:

```bash
# ~/.tmux.presentation.conf

# Large, readable font-friendly settings
set -g status-style "fg=white,bg=blue"
set -g window-status-current-style "fg=blue,bg=white"

# Simplified status bar
set -g status-left " #S "
set -g status-right " %H:%M "
set -g status-justify centre

# Clear visual noise
set -g pane-border-style "fg=white"
set -g pane-active-border-style "fg=green"

# Increase history for demos
set -g history-limit 5000

# Ensure mouse works for audience interaction
set -g mouse on
```

Launch tmux with this special config:

```bash
tmux -f ~/.tmux.presentation.conf new -s presentation
```

### Font Size and Terminal Setup

Before presenting:

1. Increase your terminal font size significantly (Cmd/Ctrl + to zoom in most terminals)
2. Use a high-contrast color scheme
3. Hide unnecessary UI elements in your terminal emulator
4. Consider a solid, dark background color

## Structured Demonstration Workflows

### Live Coding Demonstration

Set up a session for demonstrating coding:

```bash
#!/bin/bash
# live-coding-demo.sh

SESSION="live-demo"

# Start new session
tmux -f ~/.tmux.presentation.conf new-session -d -s $SESSION

# Set up editor window
tmux rename-window -t $SESSION:0 'code'
tmux send-keys -t $SESSION:0 "cd ~/demo-project" C-m
tmux send-keys -t $SESSION:0 "clear" C-m
tmux send-keys -t $SESSION:0 "echo '# Live Coding Demo'" C-m
tmux send-keys -t $SESSION:0 "echo '1. We will implement feature X'" C-m
tmux send-keys -t $SESSION:0 "echo '2. Then we will test it'" C-m
tmux send-keys -t $SESSION:0 "echo '3. Finally we will deploy it'" C-m
tmux send-keys -t $SESSION:0 "echo ''" C-m
tmux send-keys -t $SESSION:0 "echo 'Press Enter to begin...'" C-m

# Set up test window
tmux new-window -t $SESSION:1 -n 'tests'
tmux send-keys -t $SESSION:1 "cd ~/demo-project" C-m
tmux send-keys -t $SESSION:1 "clear" C-m
tmux send-keys -t $SESSION:1 "echo 'Test runner ready.'" C-m

# Set up application window
tmux new-window -t $SESSION:2 -n 'app'
tmux send-keys -t $SESSION:2 "cd ~/demo-project" C-m
tmux send-keys -t $SESSION:2 "clear" C-m
tmux send-keys -t $SESSION:2 "echo 'Application ready to start.'" C-m

# Return to code window
tmux select-window -t $SESSION:0

# Attach to session
tmux attach-session -t $SESSION
```

### Product Demonstration

Create a script for product demonstrations:

```bash
#!/bin/bash
# product-demo.sh

SESSION="product-demo"

# Start new session
tmux -f ~/.tmux.presentation.conf new-session -d -s $SESSION

# Set up main demo window
tmux rename-window -t $SESSION:0 'main'
tmux send-keys -t $SESSION:0 "cd ~/demo-product" C-m
tmux send-keys -t $SESSION:0 "clear" C-m
tmux send-keys -t $SESSION:0 "figlet 'Product Demo'" C-m
tmux send-keys -t $SESSION:0 "echo ''" C-m
tmux send-keys -t $SESSION:0 "echo 'Welcome to our product demonstration!'" C-m
tmux send-keys -t $SESSION:0 "echo ''" C-m
tmux send-keys -t $SESSION:0 "echo 'Press Enter to begin...'" C-m

# Feature 1 window
tmux new-window -t $SESSION:1 -n 'feature1'
tmux send-keys -t $SESSION:1 "cd ~/demo-product" C-m
tmux send-keys -t $SESSION:1 "clear" C-m
tmux send-keys -t $SESSION:1 "echo 'Feature 1: Data Processing'" C-m
tmux send-keys -t $SESSION:1 "echo '---------------------'" C-m

# Feature 2 window
tmux new-window -t $SESSION:2 -n 'feature2'
tmux send-keys -t $SESSION:2 "cd ~/demo-product" C-m
tmux send-keys -t $SESSION:2 "clear" C-m
tmux send-keys -t $SESSION:2 "echo 'Feature 2: Reporting'" C-m
tmux send-keys -t $SESSION:2 "echo '------------------'" C-m

# Feature 3 window
tmux new-window -t $SESSION:3 -n 'feature3'
tmux send-keys -t $SESSION:3 "cd ~/demo-product" C-m
tmux send-keys -t $SESSION:3 "clear" C-m
tmux send-keys -t $SESSION:3 "echo 'Feature 3: Integrations'" C-m
tmux send-keys -t $SESSION:3 "echo '---------------------'" C-m

# Q&A window
tmux new-window -t $SESSION:4 -n 'qa'
tmux send-keys -t $SESSION:4 "cd ~/demo-product" C-m
tmux send-keys -t $SESSION:4 "clear" C-m
tmux send-keys -t $SESSION:4 "figlet 'Q & A'" C-m
tmux send-keys -t $SESSION:4 "echo ''" C-m
tmux send-keys -t $SESSION:4 "echo 'Thank you for watching!'" C-m

# Return to main window
tmux select-window -t $SESSION:0

# Attach to session
tmux attach-session -t $SESSION
```

## Advanced Presentation Techniques

### Pre-Recorded Demo with Live Narration

Create a "fake typing" script for consistent demos:

```bash
#!/bin/bash
# demo-typer.sh

# Usage: demo-typer.sh "command to type" [typing_speed]
# Example: demo-typer.sh "echo Hello, world!" 0.1

command="$1"
speed="${2:-0.1}"

for (( i=0; i<${#command}; i++ )); do
  echo -n "${command:$i:1}"
  sleep $speed
done

echo ""
```

Use this in your presentation script:

```bash
#!/bin/bash
# automated-demo.sh

SESSION="auto-demo"
TYPING_SCRIPT="./demo-typer.sh"

# Start new session
tmux -f ~/.tmux.presentation.conf new-session -d -s $SESSION

# Configure main window
tmux rename-window -t $SESSION:0 'demo'
tmux send-keys -t $SESSION:0 "cd ~/demo-project" C-m
tmux send-keys -t $SESSION:0 "clear" C-m

# Prepare window for automated demo with pauses for narration
tmux send-keys -t $SESSION:0 "$TYPING_SCRIPT 'ls -la' 0.1" C-m
tmux send-keys -t $SESSION:0 "sleep 2" C-m  # Pause for narration
tmux send-keys -t $SESSION:0 "$TYPING_SCRIPT 'cat README.md' 0.1" C-m
tmux send-keys -t $SESSION:0 "sleep 3" C-m  # Pause for narration
tmux send-keys -t $SESSION:0 "$TYPING_SCRIPT './configure && make' 0.1" C-m
tmux send-keys -t $SESSION:0 "sleep 2" C-m  # Pause for narration

# Attach to session
tmux attach-session -t $SESSION
```

### Multi-View Product Demos

Create a script showing multiple application components:

```bash
#!/bin/bash
# multi-view-demo.sh

SESSION="multi-demo"

# Start new session
tmux -f ~/.tmux.presentation.conf new-session -d -s $SESSION

# Main window with application
tmux rename-window -t $SESSION:0 'app'
tmux send-keys -t $SESSION:0 "cd ~/demo-app && npm start" C-m

# Split for logs
tmux split-window -v -t $SESSION:0
tmux select-pane -t 1
tmux send-keys -t $SESSION:0.1 "cd ~/demo-app && tail -f logs/app.log" C-m
tmux resize-pane -t 1 -y 15

# Split for monitoring
tmux split-window -h -t $SESSION:0.1
tmux send-keys -t $SESSION:0.2 "cd ~/demo-app && ./monitor.sh" C-m

# Return to application pane
tmux select-pane -t 0

# Add windows for other components
tmux new-window -t $SESSION:1 -n 'database'
tmux send-keys -t $SESSION:1 "cd ~/demo-app && docker-compose up database" C-m

tmux new-window -t $SESSION:2 -n 'api'
tmux send-keys -t $SESSION:2 "cd ~/demo-app && npm run api" C-m

# Return to first window
tmux select-window -t $SESSION:0

# Attach to session
tmux attach-session -t $SESSION
```

## Interactive Training Sessions

### Workshop Environment

Script to set up training environments for multiple participants:

```bash
#!/bin/bash
# workshop-setup.sh

# Create base session that will be template for all participants
tmux -f ~/.tmux.presentation.conf new-session -d -s workshop-template

# Configure template
tmux rename-window -t workshop-template:0 'exercises'
tmux send-keys -t workshop-template:0 "cd ~/workshop" C-m
tmux send-keys -t workshop-template:0 "clear" C-m
tmux send-keys -t workshop-template:0 "echo 'Welcome to the workshop!'" C-m
tmux send-keys -t workshop-template:0 "echo '1. Exercise One: cd exercise-1/'" C-m
tmux send-keys -t workshop-template:0 "echo '2. Exercise Two: cd exercise-2/'" C-m
tmux send-keys -t workshop-template:0 "echo '3. Exercise Three: cd exercise-3/'" C-m

# Create reference window
tmux new-window -t workshop-template:1 -n 'reference'
tmux send-keys -t workshop-template:1 "cd ~/workshop/reference" C-m
tmux send-keys -t workshop-template:1 "clear" C-m
tmux send-keys -t workshop-template:1 "echo 'Reference materials:'" C-m
tmux send-keys -t workshop-template:1 "echo 'Use cat commands to view files'" C-m

# Create help window
tmux new-window -t workshop-template:2 -n 'help'
tmux send-keys -t workshop-template:2 "cd ~/workshop" C-m
tmux send-keys -t workshop-template:2 "clear" C-m
tmux send-keys -t workshop-template:2 "echo 'Need help? Call the instructor over or type your question here.'" C-m

# Return to first window
tmux select-window -t workshop-template:0

# Now create sessions for each participant by copying the template
for i in {1..10}; do
  participant="participant$i"
  tmux new-session -d -s $participant -t workshop-template
  echo "Created session for $participant"
done

echo "Workshop environments ready. Participants can attach with:"
echo "tmux attach-session -t participant<N>"
```

### Instructor View

Create an instructor dashboard for monitoring all workshop participants:

```bash
#!/bin/bash
# instructor-dashboard.sh

SESSION="instructor"

# Start new instructor session
tmux -f ~/.tmux.presentation.conf new-session -d -s $SESSION

# Main instructions window
tmux rename-window -t $SESSION:0 'lecture'
tmux send-keys -t $SESSION:0 "cd ~/workshop/slides" C-m
tmux send-keys -t $SESSION:0 "clear" C-m
tmux send-keys -t $SESSION:0 "./show-slides.sh" C-m

# Create a monitor window to check on participants
tmux new-window -t $SESSION:1 -n 'monitor'
tmux send-keys -t $SESSION:1 "watch -n 5 'tmux list-sessions'" C-m

# Create a window to peek at participants' progress
tmux new-window -t $SESSION:2 -n 'peek'
tmux send-keys -t $SESSION:2 "echo 'Use: tmux attach-session -t participant<N> -r to peek read-only'" C-m

# Go back to lecture window
tmux select-window -t $SESSION:0

# Attach to session
tmux attach-session -t $SESSION
```

## Presentation Best Practices

1. **Rehearse thoroughly**: Practice your tmux presentation flow before the live demo
2. **Prepare fallback scenarios**: Know how to recover if something fails
3. **Cheat sheets**: Keep a hidden cheat sheet window (Prefix + ?) for commands
4. **Simplified config**: Use a minimal tmux configuration for clear visuals
5. **Pre-arrange windows**: Set up your windows and panes before starting
6. **Signposting**: Use clear window names to guide your audience
7. **Audience visibility**: Ensure font size and contrast work for the room
8. **Provide reference materials**: Share your tmux configurations and scripts

## Dealing with Unexpected Issues

### Quick Recovery Script

Create a recovery script for when demos go wrong:

```bash
#!/bin/bash
# demo-recovery.sh

SESSION="presentation"

# Kill existing session if it exists
tmux kill-session -t $SESSION 2>/dev/null

# Restart with clean environment
tmux -f ~/.tmux.presentation.conf new-session -d -s $SESSION

# Set up basic demo environment
tmux rename-window -t $SESSION:0 'demo'
tmux send-keys -t $SESSION:0 "cd ~/demo-backup" C-m
tmux send-keys -t $SESSION:0 "clear" C-m
tmux send-keys -t $SESSION:0 "echo 'Demo Recovery - Starting from checkpoint...'" C-m
tmux send-keys -t $SESSION:0 "sleep 2" C-m
tmux send-keys -t $SESSION:0 "clear" C-m

# Attach to session
tmux attach-session -t $SESSION
```

Run this with a keyboard shortcut or from another terminal when things go wrong.

## Sample Files to Include with Your Presentations

### Quick Reference Card

Create a `presentation-reference.md` file:

```markdown
# tmux Presentation Reference

## Navigation Shortcuts
- Next window: Prefix + n
- Previous window: Prefix + p
- Specific window: Prefix + [number]
- List windows: Prefix + w

## Demo Controls
- Start main demo: ./start-demo.sh
- Reset demo: ./reset-demo.sh
- Emergency backup: ./backup-demo.sh

## Presentation Sections
1. Introduction (Window 0)
2. Feature Demo (Window 1)
3. Architecture (Window 2)
4. Live Coding (Window 3)
5. Q&A (Window 4)

## Recovery Commands
- If application crashes: ./restart-app.sh
- If database fails: ./reset-db.sh
```

## Next Steps

- Explore [Remote Pair Programming](01-pair-programming.md)
- Learn about [CI/CD Integration](02-ci-cd-integration.md)
- Set up [Cross-Platform Synchronization](03-cross-platform-sync.md)