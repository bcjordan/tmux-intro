# Tmux Troubleshooting Guide
*Author: Y5489P*

This guide helps you solve common issues and problems encountered when using Tmux.

## Installation Issues

### "Command not found" after installation

**Problem:** You installed Tmux but get "command not found" when trying to run it.

**Solutions:**
1. Verify installation path is in your PATH:
   ```bash
   which tmux
   echo $PATH
   ```

2. If using a custom installation location, add it to your PATH:
   ```bash
   export PATH=$PATH:/path/to/tmux/bin
   ```

3. Try closing and reopening your terminal, or starting a new shell session.

### Outdated version after installation

**Problem:** You installed Tmux but an older version runs.

**Solutions:**
1. Check if multiple versions are installed:
   ```bash
   which -a tmux
   ```

2. Ensure the newest version appears first in your PATH.

3. If using a package manager, ensure repositories are up to date:
   ```bash
   # Homebrew
   brew update && brew upgrade tmux
   
   # Apt
   sudo apt update && sudo apt upgrade
   ```

## Visual Issues

### Colors don't display correctly

**Problem:** Colors in Tmux look different than in regular terminal.

**Solutions:**
1. Add to your `.tmux.conf`:
   ```
   set -g default-terminal "screen-256color"
   # For newer Tmux versions with true color support
   set -ga terminal-overrides ",xterm-256color:Tc"
   ```

2. Add to your shell profile (`.bashrc`, `.zshrc`, etc.):
   ```bash
   export TERM=xterm-256color
   ```

3. Start Tmux with:
   ```bash
   tmux -2
   ```

### Text rendering issues or garbled characters

**Problem:** Strange characters or formatting issues in Tmux.

**Solutions:**
1. Ensure your terminal font supports the characters.

2. Check your locale settings:
   ```bash
   echo $LANG
   # Should be something like en_US.UTF-8
   
   # Fix if necessary
   export LANG=en_US.UTF-8
   ```

3. Add to `.tmux.conf`:
   ```
   set -g status-utf8 on
   setw -g utf8 on
   ```

## Mouse Support Issues

### Mouse scrolling doesn't work

**Problem:** Mouse scrolling enters copy mode or doesn't work as expected.

**Solutions:**
1. For Tmux 2.1 and newer:
   ```
   set -g mouse on
   ```

2. For older Tmux versions:
   ```
   set -g mode-mouse on
   set -g mouse-resize-pane on
   set -g mouse-select-pane on
   set -g mouse-select-window on
   ```

3. For applications that handle their own mouse events (e.g., Vim, less):
   - Hold the Shift key while scrolling to bypass Tmux handling

### Mouse selection copies wrong text

**Problem:** When selecting text with the mouse, Tmux copies unexpected content.

**Solutions:**
1. Enable Tmux copy mode first (`<prefix> [`) then make selections.

2. Try a different terminal emulator that handles mouse selections better.

3. Use keyboard-based text selection in copy mode for more precision.

## Copy/Paste Problems

### Can't copy text to system clipboard

**Problem:** Text copied in Tmux isn't available in system clipboard.

**Solutions:**
1. For macOS:
   ```
   # In .tmux.conf
   set -g default-command "reattach-to-user-namespace -l $SHELL"
   bind -T copy-mode-vi y send -X copy-pipe "reattach-to-user-namespace pbcopy"
   ```

2. For Linux with X11:
   ```
   # In .tmux.conf
   bind -T copy-mode-vi y send -X copy-pipe "xclip -sel clip -i"
   ```

3. For WSL (Windows Subsystem for Linux):
   ```
   # In .tmux.conf
   bind -T copy-mode-vi y send -X copy-pipe "clip.exe"
   ```

### Can't paste into Tmux

**Problem:** System clipboard content can't be pasted into Tmux.

**Solutions:**
1. Try terminal emulator's paste (usually Shift+Insert or right-click).

2. For nested Tmux sessions, press prefix twice to send to inner session.

3. For macOS with troublesome applications:
   ```
   brew install reattach-to-user-namespace
   # In .tmux.conf
   set -g default-command "reattach-to-user-namespace -l $SHELL"
   ```

## Performance Issues

### Tmux feels slow or laggy

**Problem:** Tmux operations have noticeable delay.

**Solutions:**
1. Reduce escape-time for faster key recognition:
   ```
   set -sg escape-time 10
   ```

2. Check if your status line has complex commands:
   ```
   # Use simpler status line
   set -g status-interval 5
   set -g status-right "#H %H:%M"
   ```

3. Limit history to improve memory usage:
   ```
   set -g history-limit 5000
   ```

### High CPU usage

**Problem:** Tmux causes high CPU utilization.

**Solutions:**
1. Check for processes running within Tmux panes.

2. Disable status line updates:
   ```
   set -g status off
   ```

3. Update to the latest Tmux version.

## Session Management Issues

### Lost all sessions after reboot

**Problem:** All Tmux sessions disappeared after system restart.

**Solutions:**
1. Install and use tmux-resurrect plugin to save and restore sessions.

2. Use terminal multiplexer persistence tools:
   ```bash
   # Using tmuxinator
   gem install tmuxinator
   # Create project files for quick session setup
   ```

3. Create shell scripts to automatically set up your preferred Tmux layout.

### Can't attach to session

**Problem:** "no sessions" or "session not found" error when trying to attach.

**Solutions:**
1. Check if session exists:
   ```bash
   tmux ls
   ```

2. Check if Tmux server is running:
   ```bash
   ps aux | grep tmux
   ```

3. If server crashed, try to kill lingering processes:
   ```bash
   pkill -f tmux
   rm -rf /tmp/tmux-*
   ```

## Configuration Issues

### Config changes not taking effect

**Problem:** Changes to `.tmux.conf` don't seem to work.

**Solutions:**
1. Source your config file:
   ```bash
   tmux source-file ~/.tmux.conf
   ```

2. Check for syntax errors in your config:
   ```bash
   tmux -f ~/.tmux.conf new -d && echo "Config OK" || echo "Config Error"
   ```

3. Ensure you're editing the correct config file.

### Conflicting key bindings

**Problem:** Some key bindings don't work or conflict with other applications.

**Solutions:**
1. Check for conflicting bindings:
   ```bash
   tmux list-keys | grep "<your-key>"
   ```

2. Unbind keys before rebinding:
   ```
   unbind C-a
   set -g prefix C-a
   ```

3. Try different key combinations to avoid conflicts with terminal or applications.

## Nested Tmux Sessions

### Prefix key doesn't reach inner session

**Problem:** When running Tmux inside Tmux, commands only affect outer session.

**Solutions:**
1. Use different prefix keys for inner and outer sessions:
   ```
   # Outer session: Ctrl+b
   # Inner session: Ctrl+a
   ```

2. Press prefix twice to send it to the inner session:
   ```
   # If outer prefix is Ctrl+b, press Ctrl+b twice
   ```

3. Configure a special key to send commands to inner session:
   ```
   # In outer session .tmux.conf
   bind -n M-F11 set -qg status-style bg=colour25
   bind -n M-F12 set -qg status-style bg=colour40
   bind -n S-up \
      send-keys M-F12 \; \
      set -qg status-style bg=colour25 \; \
      unbind -n S-left \; \
      unbind -n S-right \; \
      unbind -n S-down \; \
      unbind -n S-up \; \
      set -qg prefix C-b
   ```

## Terminal-Specific Issues

### Issues with specific terminal emulators

**Problem:** Tmux behaves differently in different terminal emulators.

**Solutions:**
1. iTerm2 (macOS):
   - Enable "Applications in terminal may access clipboard" in Preferences

2. Windows Terminal:
   - Add `"useAtlasEngine": false` to your settings.json if experiencing rendering issues

3. For various terminals, try adding:
   ```
   set -g default-terminal "tmux-256color"
   ```

## Advanced Troubleshooting

### Debugging Tmux issues

1. Start Tmux with verbose logging:
   ```bash
   tmux -v
   ```

2. Check for messages:
   ```bash
   # Within Tmux
   <prefix> ~
   ```

3. Kill the Tmux server if erratic behavior occurs:
   ```bash
   tmux kill-server
   ```

## Common Error Messages

### "invalid shell"

**Problem:** `invalid shell '/bin/...'` when starting Tmux.

**Solution:** Ensure your default shell exists and is correctly set:
```bash
# Check current shell
echo $SHELL

# Update shell if needed
chsh -s /bin/bash
```

### "failed to connect to server"

**Problem:** `failed to connect to server: Connection refused` when using Tmux.

**Solutions:**
1. Kill lingering Tmux processes:
   ```bash
   pkill tmux
   ```

2. Remove Tmux socket files:
   ```bash
   rm -rf /tmp/tmux-*
   ```

3. Check if another Tmux server is running with a different socket:
   ```bash
   ps aux | grep tmux
   ```

### "need UTF-8 locale"

**Problem:** `need UTF-8 locale` error message.

**Solution:** Set a UTF-8 locale:
```bash
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
```

## Getting Help

If you're still experiencing issues:

1. Check Tmux man pages:
   ```bash
   man tmux
   ```

2. Get command help within Tmux:
   ```bash
   # Inside Tmux
   <prefix> ?
   ```

3. View the official Tmux documentation at https://github.com/tmux/tmux/wiki

4. Join the Tmux community on GitHub for support: https://github.com/tmux/tmux