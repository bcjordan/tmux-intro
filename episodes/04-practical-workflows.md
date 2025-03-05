# Episode 4: Practical Tmux Workflows

## Overview
In this episode, we explore practical workflows and real-world use cases for Tmux. We'll cover development environments, remote server management, pair programming, and integrating Tmux with other tools.

## Script

### Developer Workflow

#### Local Development Environment
Setting up the perfect development environment:

1. Create a session for each project
```bash
tmux new -s project-name
```

2. Window layout for a typical web project:
   - Window 1: Code editor (vim/nano/emacs)
   - Window 2: Server (running local development server)
   - Window 3: Git (for version control operations)
   - Window 4: Tests (for running test suites)
   - Window 5: Logs (for monitoring log output)

3. Use a scripted setup (see our sample scripts)

#### Version Control Workflow
Using Tmux for effective git workflows:

```bash
# Window 1: Editor for writing code
# Window 2: Git status and operations
# Window 3: Test runner
# Window 4: Build/compile window
```

Split the git window to show:
- Status and staging
- Commit history
- Branch visualization

#### Database Development
Working with databases efficiently:

```bash
# Window 1: SQL editor
# Window 2: Database CLI
# Window 3: Application connecting to DB
# Window 4: Documentation
```

### DevOps Workflows

#### Server Management
Managing multiple servers simultaneously:

1. Create a window with multiple panes
2. Connect to different servers in each pane
3. Use synchronized panes for common operations
4. Disable sync for server-specific tasks

#### Monitoring and Logging
Set up a monitoring dashboard:

```bash
# Window 1: Multiple panes with htop/top on different servers
# Window 2: Multiple panes with tail -f on different log files
# Window 3: Network monitoring tools
# Window 4: Custom monitoring scripts
```

#### Deployment Pipeline
Streamline your deployment process:

```bash
# Window 1: Local git repository
# Window 2: CI/CD status
# Window 3: Staging server SSH
# Window 4: Production server SSH
# Window 5: Monitoring
```

### Remote Work Scenarios

#### SSH Session Management
Using Tmux on remote servers to maintain persistent sessions:

1. SSH to server
2. Start or attach to Tmux session
3. Work freely without fear of disconnection
4. Detach when done, keeping processes running

#### Remote Pair Programming
Collaborative coding with colleagues:

```bash
# User 1 (Host)
tmux -S /tmp/pair-session new -s pair
chmod 777 /tmp/pair-session

# User 2
tmux -S /tmp/pair-session attach -t pair
```

Tips for effective pair programming with Tmux:
- Use different pane colors for each person
- Define clear roles (driver/navigator)
- Use a shared status indicator to show who's typing

### Specialized Workflows

#### Data Science Workflow
Organize your data analysis environment:

```bash
# Window 1: Jupyter notebook or Python REPL
# Window 2: Data visualization
# Window 3: Documentation and notes
# Window 4: Dataset exploration with command-line tools
```

#### System Administration
Efficiently manage system administration tasks:

```bash
# Window 1: System monitoring (htop, iostat, etc.)
# Window 2: Log files (tail -f /var/log/*)
# Window 3: Service management (systemctl)
# Window 4: Shell for ad-hoc commands
```

### Integrating with Other Tools

#### Vim Integration
For Vim users, enhance the integration with:

```vim
" In .vimrc
" Navigate between Vim and Tmux panes seamlessly
if exists('$TMUX')
  function! TmuxOrSplitSwitch(wincmd, tmuxdir)
    let previous_winnr = winnr()
    silent! execute "wincmd " . a:wincmd
    if previous_winnr == winnr()
      call system("tmux select-pane -" . a:tmuxdir)
    endif
  endfunction

  let previous_title = substitute(system("tmux display-message -p '#{pane_title}'"), '\n', '', '')
  let &t_ti = "\<Esc>]2;vim\<Esc>\\" . &t_ti
  let &t_te = "\<Esc>]2;" . previous_title . "\<Esc>\\" . &t_te

  nnoremap <silent> <C-h> :call TmuxOrSplitSwitch('h', 'L')<cr>
  nnoremap <silent> <C-j> :call TmuxOrSplitSwitch('j', 'D')<cr>
  nnoremap <silent> <C-k> :call TmuxOrSplitSwitch('k', 'U')<cr>
  nnoremap <silent> <C-l> :call TmuxOrSplitSwitch('l', 'R')<cr>
endif
```

#### IDE-like Experience
Create a full IDE-like experience with:
- File explorer (using tools like ranger, nnn, or vifm)
- Code navigation (using ctags, fzf)
- Integrated debugging
- Git integration

### Scripting and Automating Workflows

Creating project-specific Tmux startup scripts:

```bash
#!/bin/bash
# projectname-tmux.sh

# Start a new detached session
tmux new-session -d -s projectname

# Set up windows and layouts
tmux rename-window -t projectname:0 'editor'
tmux split-window -h -t projectname:0
tmux send-keys -t projectname:0.0 'vim' C-m
tmux send-keys -t projectname:0.1 'git status' C-m

# Create additional windows
tmux new-window -t projectname:1 -n 'server'
tmux send-keys -t projectname:1 'npm start' C-m

tmux new-window -t projectname:2 -n 'tests'
tmux send-keys -t projectname:2 'npm test' C-m

# Attach to the session
tmux select-window -t projectname:0
tmux attach-session -t projectname
```

## Demo
The video will include live demos of:
1. Setting up a web development environment
2. Managing multiple remote servers
3. Remote pair programming session
4. Creating and using a custom Tmux startup script

## Exercises
1. Create a custom startup script for your most common project
2. Set up a multi-server monitoring dashboard
3. Practice remote pair programming with a colleague
4. Integrate Tmux with your favorite editor

## Resources
- [Sample Developer Environment Script](/scripts/dev-environment-setup.sh)
- [Remote Pair Programming Guide](/exercises/pair-programming.md)