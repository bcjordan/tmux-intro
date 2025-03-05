# Exercise 2: Advanced Tmux Usage
*Created by M91232*

This exercise will help you practice advanced Tmux techniques and customization covered in the tutorial series.

## Prerequisites
- Completion of Exercise 1: Tmux Basics
- Tmux version 2.9 or higher
- Basic understanding of terminal environments

## Exercises

### 1. Custom Configuration

1. Create a custom `.tmux.conf` file in your home directory with the following settings:
   - Change the prefix key to Ctrl+a
   - Enable mouse support
   - Set the base index for windows and panes to 1
   - Add a status line customization
   - Configure intuitive pane splitting (| for vertical, - for horizontal)

2. Test your configuration by loading it with:
   ```
   tmux source-file ~/.tmux.conf
   ```

3. Add a binding to reload the config file using the 'r' key:
   ```
   bind r source-file ~/.tmux.conf \; display "Config reloaded!"
   ```

### 2. Session Management Scripts

1. Create a shell script called `dev-environment.sh` that:
   - Creates a new session named "development"
   - Sets up windows for: "editor", "server", "database", "logs"
   - Arranges appropriate panes in each window
   - Starts necessary services in each window/pane

2. Example structure:
   ```bash
   #!/bin/bash
   
   # Start a new tmux session
   tmux new-session -d -s development
   
   # Rename the first window
   tmux rename-window -t development:0 "editor"
   
   # Create additional windows
   tmux new-window -t development:1 -n "server"
   tmux new-window -t development:2 -n "database"
   tmux new-window -t development:3 -n "logs"
   
   # Setup the editor window
   tmux select-window -t development:0
   tmux split-window -h
   
   # Setup the server window
   tmux select-window -t development:1
   # Add your server startup commands
   
   # Setup the database window
   tmux select-window -t development:2
   # Add your database commands
   
   # Setup the logs window
   tmux select-window -t development:3
   # Add your log viewing commands
   
   # Attach to the session
   tmux select-window -t development:0
   tmux attach-session -t development
   ```

3. Make your script executable and test it:
   ```
   chmod +x dev-environment.sh
   ./dev-environment.sh
   ```

### 3. Advanced Copy Mode

1. Configure vi-mode for copy operations in your `.tmux.conf`:
   ```
   setw -g mode-keys vi
   ```

2. Practice the following copy operations:
   - Enter copy mode (prefix + [)
   - Move to start position using vi navigation keys
   - Start selection with 'v'
   - Move to end position
   - Yank (copy) with 'y'
   - Paste with prefix + ]

3. Copy content across different windows and panes

4. Configure copying to system clipboard (platform-specific)

### 4. Pane Synchronization

1. Create a session with multiple panes (at least 4)

2. Enable synchronization so that typing in one pane inputs to all panes:
   ```
   :setw synchronize-panes on
   ```

3. Try running commands that will display differently in each pane

4. Turn synchronization off:
   ```
   :setw synchronize-panes off
   ```

### 5. Custom Layouts

1. Create a complex layout with multiple panes

2. Save your layout using:
   ```
   prefix + : select-layout
   prefix + : rename-layout custom1
   ```

3. Change to a different layout then restore your custom layout

4. Practice switching between built-in layouts:
   - Even-horizontal
   - Even-vertical
   - Main-horizontal
   - Main-vertical
   - Tiled

## Review Questions

1. How do you change the prefix key in Tmux?
2. What's the difference between a session, window, and pane?
3. How do you synchronize input to all panes?
4. What are the benefits of creating custom Tmux scripts?
5. How would you share a Tmux session with another user?

## Challenge

Create a complex development environment script that:
1. Creates a session for each of your projects
2. Configures project-specific layouts and commands
3. Includes conditional logic to only start services if they're not already running
4. Has error handling for when commands fail
5. Includes a function to gracefully shut down all services when done