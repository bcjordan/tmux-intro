# Exercise 1: Tmux Basics

This exercise will help you practice the fundamental Tmux commands and concepts covered in Episode 1.

## Prerequisites
- Tmux installed on your system
- Basic terminal knowledge

## Exercises

### 1. Session Management
1. Create a new session named "myproject"
   ```
   tmux new -s myproject
   ```

2. Inside the session, detach from it using the key binding
   ```
   (Press Ctrl+b, then d)
   ```

3. List all available sessions
   ```
   tmux ls
   ```

4. Reattach to your "myproject" session
   ```
   tmux attach -t myproject
   ```

5. Create a second session named "notes" and detach from it
   ```
   tmux new -s notes
   (Then press Ctrl+b, then d)
   ```

6. Practice switching between sessions using the command line
   ```
   tmux attach -t myproject
   (Then press Ctrl+b, then d)
   tmux attach -t notes
   ```

### 2. Window Management
1. Attach to your "myproject" session
   ```
   tmux attach -t myproject
   ```

2. Create three new windows
   ```
   (Press Ctrl+b, then c) [3 times]
   ```

3. Navigate between windows using the key bindings
   ```
   (Press Ctrl+b, then n) [to go to next window]
   (Press Ctrl+b, then p) [to go to previous window]
   (Press Ctrl+b, then 0-3) [to go to specific window by number]
   ```

4. Rename the current window to "main"
   ```
   (Press Ctrl+b, then ,)
   [Type "main" and press Enter]
   ```

5. Create a new window with a specific name
   ```
   (Press Ctrl+b, then :)
   [Type "new-window -n logs" and press Enter]
   ```

### 3. Pane Management
1. Split the current window horizontally 
   ```
   (Press Ctrl+b, then ")
   ```

2. Split the bottom pane vertically
   ```
   (Navigate to bottom pane with Ctrl+b, down arrow)
   (Press Ctrl+b, then %)
   ```

3. Navigate between all panes
   ```
   (Press Ctrl+b, then arrow keys)
   ```

4. Resize a pane
   ```
   (Press Ctrl+b, then Ctrl+arrow keys)
   ```

5. Zoom in on a pane and zoom out
   ```
   (Press Ctrl+b, then z) [to zoom]
   (Press Ctrl+b, then z again) [to unzoom]
   ```

6. Convert a pane to a window
   ```
   (Press Ctrl+b, then !)
   ```

### 4. Advanced Practice
1. Create a layout with 3 panes:
   - One pane running `top` or `htop`
   - One pane showing the date and time (using `watch -n 1 date`)
   - One pane at your command prompt

2. Practice copying text:
   - Enter copy mode (Ctrl+b, [)
   - Navigate to text you want to copy
   - Press Space to start selection
   - Move to select text
   - Press Enter to copy
   - Press Ctrl+b, ] to paste

## Review Questions
1. What is the default prefix key in Tmux?
2. How do you create a new named session?
3. What command do you use to list all sessions?
4. How do you detach from a session?
5. What key binding creates a new window?
6. How do you split a pane horizontally? Vertically?
7. What key binding do you use to navigate between panes?

## Challenge
Create a script that sets up a development environment with Tmux:
- A session named "dev"
- Three windows: "editor", "server", "logs"
- The "editor" window split into two panes
- The "server" window running a simple web server
- The "logs" window showing a log file with `tail -f`