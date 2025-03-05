# Exercise: Developer Workflow with Tmux

This exercise will help you become proficient with tmux for software development tasks. We'll focus on creating an efficient development environment and workflow.

## Prerequisites

- Basic understanding of tmux (completed Exercises 01 and 02)
- Development tools installed (git, a code editor, etc.)
- Developer workflow configuration: copy `configs/developer-workflow.tmux.conf` to `~/.tmux.conf`

## Exercise 1: Setup a Development Session

Let's start by creating a structured development session with multiple windows.

1. Start a new tmux session named "dev":
   ```
   tmux new-session -s dev
   ```

2. In the first window, rename it to "code":
   ```
   <prefix> ,
   ```
   Type "code" and press Enter.

3. Create a second window named "server":
   ```
   <prefix> c
   <prefix> ,
   ```
   Type "server" and press Enter.

4. Create a third window named "logs":
   ```
   <prefix> c
   <prefix> ,
   ```
   Type "logs" and press Enter.

5. Create a fourth window named "git":
   ```
   <prefix> c
   <prefix> ,
   ```
   Type "git" and press Enter.

6. Navigate between windows using:
   ```
   <prefix> n  (next window)
   <prefix> p  (previous window)
   <prefix> 1  (window #1)
   <prefix> 2  (window #2)
   ...
   ```

## Exercise 2: Code Editor Setup

Let's configure the "code" window with a useful split layout.

1. Go to the "code" window:
   ```
   <prefix> 1
   ```

2. Split the window horizontally:
   ```
   <prefix> \
   ```

3. In the right pane, split it vertically:
   ```
   <prefix> -
   ```

4. You now have three panes:
   - Left pane: Main code editor
   - Top-right: For documentation or reference
   - Bottom-right: For running tests or commands

5. Practice navigating between panes:
   ```
   <prefix> h  (left pane)
   <prefix> j  (down pane)
   <prefix> k  (up pane)
   <prefix> l  (right pane)
   ```

6. Resize panes:
   ```
   <prefix> Left/Right/Up/Down  (with arrow keys)
   ```

## Exercise 3: Real-time Development Workflow

Let's practice a typical development workflow using our setup.

1. In the "code" window, left pane:
   - Open a source code file:
     ```
     vim app.js  (or your preferred editor)
     ```

2. In the top-right pane:
   - Open documentation or API reference:
     ```
     man node  (or any relevant documentation)
     ```

3. In the "server" window:
   - Start your development server:
     ```
     python -m http.server  (or your project's server)
     ```

4. In the "logs" window:
   - Watch logs:
     ```
     tail -f logs/development.log  (or relevant log file)
     ```

5. In the "git" window:
   - Check git status and prepare a commit:
     ```
     git status
     git diff
     ```

6. Practice switching between windows while maintaining your workflow.

## Exercise 4: Session Management

1. Detach from your session:
   ```
   <prefix> d
   ```

2. List available sessions:
   ```
   tmux ls
   ```

3. Reattach to your session:
   ```
   tmux attach-session -t dev
   ```

4. Create a second session without detaching (in another terminal):
   ```
   tmux new-session -s config
   ```

5. Switch between sessions:
   ```
   <prefix> (  (previous session)
   <prefix> )  (next session)
   <prefix> s  (select from list)
   ```

## Exercise 5: Custom Development Layouts

Our developer configuration includes a predefined layout. Let's use it:

1. Detach from any existing sessions.

2. Press:
   ```
   <prefix> C-d
   ```

3. This creates a "dev" session with:
   - A "code" window with a splits for editing and console
   - A "server" window for running your server
   - A "database" window for database operations

4. Customize this layout by editing your tmux.conf and adding your own shortcut.

## Challenge Tasks

1. **Project Switcher**: Create a bash script that sets up different tmux sessions for different projects.

2. **Auto-restore**: Modify your tmux configuration to automatically restore your last development session.

3. **Custom Navigation**: Add custom key bindings to your configuration for faster window/pane navigation.

4. **Integration**: If you use Vim, integrate it with tmux for seamless navigation between Vim splits and tmux panes.

## Conclusion

You now have a powerful development environment setup with tmux. This workflow allows you to:

- Organize your project components in separate windows
- View code, documentation, and terminals simultaneously
- Quickly navigate between different aspects of your project
- Maintain your work context even if you disconnect

For additional efficiency, consider exploring tmux plugins like tmux-resurrect for session persistence and vim-tmux-navigator for seamless navigation.