# Tmux Security Best Practices

This document outlines security considerations and best practices when using Tmux, especially in multi-user or server environments.

## Socket Security

Tmux creates socket files (typically in `/tmp`) that can pose security risks if not properly managed.

### Socket Permissions

By default, Tmux creates sockets in `/tmp/tmux-$UID/` with permissions that allow only the owner to access them. When creating shared sessions, be careful with permissions:

```bash
# Create a socket with standard permissions (only you can access)
tmux -S /tmp/tmux-session

# Create a socket for group sharing
tmux -S /path/to/shared/socket
chmod 660 /path/to/shared/socket  # Owner and group can access

# Create a socket for wider sharing (use with caution)
tmux -S /path/to/shared/socket
chmod 666 /path/to/shared/socket  # Anyone can access
```

### Securing Socket Location

Consider using a more secure location than `/tmp`:

```bash
# Create a directory with restrictive permissions
mkdir -p ~/.tmux/sockets
chmod 700 ~/.tmux/sockets

# Use this location for Tmux sockets
TMUX_TMPDIR=~/.tmux/sockets tmux new -s secure-session
```

You can add to your shell configuration:

```bash
export TMUX_TMPDIR=~/.tmux/sockets
```

## Multi-User Security

When using Tmux for pair programming or shared access, consider these security implications:

### Restricting Commands

Be aware that any user who can attach to your Tmux session can run commands as your user. Consider:

1. Using a dedicated user account for pair programming
2. Limiting what that account can do (via sudo restrictions)
3. Avoiding shared sessions for sensitive work

### Logging and Monitoring

Add visible indicators when others are attached to your session:

```bash
# Add to your .tmux.conf
set -g status-right "#{?client_prefix,#[fg=red]PREFIX#[default],} | #[fg=blue]#(who | cut -d \" \" -f1 | sort | uniq | wc -l) users#[default] | %H:%M"
```

Monitor attached clients:

```bash
# List all clients attached to a session
tmux list-clients -t session-name
```

### Read-only Access

For Tmux 2.6+, you can create read-only views of a session:

```bash
# Make a client read-only
tmux attach -t session-name -r
```

## Clipboard Security

The clipboard can be a vector for data exfiltration:

### Controlling Clipboard Access

```bash
# Disable automatic copying to system clipboard
set -g set-clipboard off

# Manually control when to copy to system clipboard
bind-key -T copy-mode-vi 'y' send-keys -X copy-selection
bind-key -T copy-mode-vi 'Y' send-keys -X copy-pipe-and-cancel 'xclip -in -selection clipboard'
```

### Clearing Buffers

Regularly clear Tmux paste buffers that might contain sensitive data:

```bash
# Clear all paste buffers
tmux list-buffers | awk '{print $1}' | xargs -I{} tmux delete-buffer -b {}

# Add a key binding to clear buffers
bind-key C run-shell "tmux list-buffers | awk '{print $1}' | xargs -I{} tmux delete-buffer -b {}"
```

## Logging and Data Retention

### Controlling Pane Logging

Be cautious with pane logging, which could capture sensitive data:

```bash
# Add explicit key bindings for logging to maintain awareness
bind-key L pipe-pane -o "cat >>~/logs/tmux-#S-#W-#P.log" \; display-message "Logging started"
bind-key l pipe-pane \; display-message "Logging ended"
```

### Disabling Activity Logging

Reduce what Tmux records about your session:

```bash
set -g visual-activity off
set -g visual-bell off
set -g visual-silence off
setw -g monitor-activity off
set -g bell-action none
```

## Command Execution Security

### Avoiding Shell Escapes in Status Line

Status line commands run in a shell - avoid potential injection vulnerabilities:

```bash
# BAD: Direct command substitution
set -g status-right "#(cat /path/to/file)"

# BETTER: Use a dedicated script with proper validation
set -g status-right "#(~/.tmux/scripts/status-info.sh)"
```

### Secure Configuration File Handling

Protect your Tmux configuration file:

```bash
# Set restrictive permissions
chmod 600 ~/.tmux.conf
```

Check that configuration files can't be modified by others:

```bash
# Check file permissions
ls -la ~/.tmux.conf
```

## Network Security

### SSH Forwarding Considerations

When using Tmux over SSH, be mindful of agent forwarding:

```bash
# Start tmux with SSH agent forwarding disabled
SSH_AUTH_SOCK="" tmux new -s secure-session
```

Consider using a dedicated status indicator when SSH forwarding is active:

```bash
set -g status-right "#{?SSH_AUTH_SOCK,#[fg=red]SSH-AGENT#[default] |,} %H:%M"
```

### Remote Session Security

When using Tmux on remote servers:

1. Prefer SSH key authentication over passwords
2. Always detach from sessions when done
3. Consider setting session timeouts:

```bash
# Set a 1-hour idle timeout for detaching
set -g lock-after-time 3600
set -g lock-command "tmux detach"
```

## Secure Scripting Practices

### Handling Secrets in Scripts

When using Tmux in automation scripts:

```bash
# AVOID: Sending sensitive data directly
tmux send-keys -t session:window.pane "mysql -u user -ppassword" Enter

# BETTER: Use environment variables or secure methods
tmux send-keys -t session:window.pane 'mysql -u "$DB_USER" -p"$DB_PASS"' Enter
```

### Script Permission Checking

When writing Tmux automation scripts, include security checks:

```bash
#!/bin/bash
# Check that the script has safe permissions
script_perms=$(stat -c "%a" "$0")
if [[ "$script_perms" != "700" && "$script_perms" != "750" && "$script_perms" != "755" ]]; then
    echo "Warning: This script has loose permissions: $script_perms"
    echo "Consider restricting with: chmod 750 $0"
    sleep 2
fi

# Check socket permissions before using
if [[ -e "$socket_path" ]]; then
    socket_perms=$(stat -c "%a" "$socket_path")
    if [[ "$socket_perms" == "666" || "$socket_perms" == "777" ]]; then
        echo "Warning: Tmux socket has world-readable permissions!"
    fi
fi
```

## Audit and Monitoring

### Session Recording

For sensitive environments, consider logging all session activity:

```bash
# Start a new session with logging
tmux new-session \; pipe-pane -o "cat >>~/tmux-logs/$(date +%Y%m%d).log"
```

### Terminal History Security

Remember that Tmux preserves terminal history that could contain sensitive information:

```bash
# Limit terminal history (in .tmux.conf)
set -g history-limit 5000

# Clear history with a key binding
bind-key C-k clear-history
```

## Summary of Best Practices

1. **Socket Security**:
   - Use secure socket locations with appropriate permissions
   - Consider custom `TMUX_TMPDIR` locations

2. **Multi-User Sessions**:
   - Be aware of the security implications of shared sessions
   - Use read-only mode when appropriate
   - Monitor who is connected to your sessions

3. **Clipboard Security**:
   - Control clipboard integration
   - Regularly clear paste buffers

4. **Logging Practices**:
   - Be explicit about when logging occurs
   - Restrict access to log files

5. **Command Execution**:
   - Sanitize any user input used in commands
   - Avoid shell command injection vulnerabilities

6. **Network Considerations**:
   - Be mindful of SSH agent forwarding
   - Use session timeouts for remote work

7. **Scripting Security**:
   - Don't embed credentials in scripts
   - Check file permissions

8. **Audit and Monitoring**:
   - Consider session recording for compliance environments
   - Regularly clear terminal history