# Pair Programming with tmux

tmux provides a powerful way to collaborate in real-time with other developers. This workflow guide demonstrates how to set up and use tmux for effective pair programming sessions.

## Benefits of Pair Programming with tmux

- **Real-time collaboration**: Both developers see the same terminal and can take turns controlling it
- **Low bandwidth**: Requires significantly less bandwidth than screen sharing
- **Terminal native**: No additional GUI tools required
- **Flexible**: Works across different operating systems and network conditions
- **Session persistence**: The session stays alive even if one person disconnects

## Prerequisites

- A shared server or machine that both developers can SSH into
- tmux installed on the shared machine
- SSH access for both developers

## Basic Setup

### 1. Server Preparation

The host needs to configure the server to allow for shared sessions:

```bash
# Install tmux if not already installed
sudo apt update && sudo apt install -y tmux

# Create a shared user account (optional)
sudo adduser pairprogramming
```

### 2. Configure tmux for Multi-User Sessions

Edit the tmux configuration file (`~/.tmux.conf`) on the server:

```
# Allow multiple clients to attach to the same session
set -g mouse on
setw -g mode-keys vi
set -g history-limit 50000
```

### 3. Start the Shared Session

The first developer starts a named session:

```bash
tmux new -s pairing
```

### 4. Second Developer Joins

The second developer connects to the server and attaches to the existing session:

```bash
ssh user@shared-server
tmux attach -t pairing
```

Now both developers are viewing and can control the same terminal session!

## Setting Permissions

If you're using a shared user account, no additional permissions are needed. If using separate accounts, you'll need to adjust socket permissions:

```bash
# As the session creator
tmux -S /tmp/shared new -s pairing
chmod 777 /tmp/shared
```

The second developer can join with:

```bash
tmux -S /tmp/shared attach -t pairing
```

## Advanced Collaboration Techniques

### Divided Attention Mode

For times when you want to work independently but stay connected:

```bash
# First user creates a session
tmux new -s pairing

# Create multiple windows
Ctrl+b c    # Create window 1
Ctrl+b c    # Create window 2

# Second user attaches
# On another machine: tmux attach -t pairing

# Each user can work in different windows
# Navigate with Ctrl+b 0, Ctrl+b 1, Ctrl+b 2, etc.
```

### Shared View with Independent Control

This advanced setup allows both users to view the same content but control their own cursors:

```bash
# First user
tmux new -s pairing

# Second user
tmux new -s pairing2 -t pairing
```

### Using a Toggle for Driver/Navigator Pattern

Create a toggle script to switch between who has control:

```bash
#!/bin/bash
# save as toggle-control.sh

SOCKET="/tmp/shared"
SESSION="pairing"
READONLY_SESSION="${SESSION}-readonly"

if tmux -S $SOCKET has-session -t $READONLY_SESSION 2>/dev/null; then
    # Convert read-only to read-write
    tmux -S $SOCKET attach-session -t $READONLY_SESSION -r
else
    # Convert read-write to read-only
    tmux -S $SOCKET attach-session -t $SESSION -r
fi
```

## Practical Workflow Example

Here's a typical pair programming workflow using tmux:

### Step 1: Setup (Day 1)

```bash
# Host sets up the environment
ssh user@shared-server
tmux new -s project1

# Split the screen for coding and testing
Ctrl+b %     # Split vertically
Ctrl+b arrow # Move to right pane
vim test.js  # Open test file
Ctrl+b arrow # Move to left pane
vim app.js   # Open implementation file

# Partner joins
# On their machine:
ssh user@shared-server
tmux attach -t project1
```

### Step 2: Daily Work (Each Day)

```bash
# Host reconnects if needed
ssh user@shared-server
tmux attach -t project1

# If session doesn't exist
tmux new -s project1

# Partner connects
ssh user@shared-server
tmux attach -t project1
```

### Step 3: Communicating During the Session

Since you can't talk directly through tmux, set up a communication channel:

- Use a shared tmux window for chat: `Ctrl+b c` to create a new window
- Use a separate voice call
- Use a chat application in another window

## Cross-Platform Considerations

### macOS to Linux

When connecting from macOS to a Linux server:

- Ensure consistent terminal settings: `export TERM=screen-256color`
- Consider iTerm2's built-in tmux integration

### Windows to Linux

When connecting from Windows:

- Use Windows Terminal + WSL2 for the best experience
- For PuTTY, set the connection type to `xterm-256color`
- Consider using MobaXterm for enhanced terminal features

## Tools to Enhance the Experience

### tmux-powerline

Add a more informative status bar:

```bash
# Clone the repository
git clone https://github.com/erikw/tmux-powerline.git
```

Add to `.tmux.conf`:
```
set-option -g status on
set-option -g status-interval 2
set-option -g status-justify "centre"
set-option -g status-left-length 90
set-option -g status-right-length 90
set-option -g status-left "#(~/path/to/tmux-powerline/powerline.sh left)"
set-option -g status-right "#(~/path/to/tmux-powerline/powerline.sh right)"
```

### wemux

A multi-user tmux solution specifically designed for pair programming:

```bash
# Install wemux
git clone git://github.com/zolrath/wemux.git /usr/local/share/wemux
ln -s /usr/local/share/wemux/wemux /usr/local/bin/wemux
```

Start a pair programming session:
```bash
wemux start
```

Partner joins with:
```bash
wemux attach
```

## Best Practices

1. **Establish communication protocols**: Agree on how you'll signal when you want to take control
2. **Use a shared .tmux.conf**: Ensure consistent keybindings
3. **Create session restore scripts**: Make it easy to recreate your development environment
4. **Document your workflow**: Keep notes on your pairing process
5. **Take regular breaks**: Pairing is intense, schedule short breaks
6. **Use screen annotations**: Tools like `tmux-annotate` can help point things out

## Troubleshooting

### Session Permission Issues

If the second user can't connect:
```bash
# Check socket permissions
ls -la /tmp/tmux-*

# Fix permissions if needed
chmod 777 /tmp/tmux-*/default
```

### Connection Dropped

If a user gets disconnected:
```bash
# Simply reconnect
ssh user@shared-server
tmux attach -t pairing
```

The session continues running and no work is lost.

## Next Steps

- Learn about [CI/CD Integration with tmux](02-ci-cd-integration.md)
- Explore [Cross-Platform Synchronization](03-cross-platform-sync.md)
- Set up [tmux for Presentations](04-presentations.md)