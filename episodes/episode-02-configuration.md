# Tmux Tutorial Series - Episode 2: Configuration & Customization
*Script by M91232*

## Introduction (2 minutes)
- Welcome back to the Tmux tutorial series
- Brief recap of Episode 1 (basic commands and concepts)
- Overview of what will be covered in this episode:
  - Tmux configuration file
  - Key remapping
  - Visual customization
  - Status bar configuration

## The Tmux Configuration File (3 minutes)
- Location: `~/.tmux.conf`
- How configuration works
- Reloading configuration: `tmux source-file ~/.tmux.conf`
- Creating an easy reload binding:
  ```
  bind r source-file ~/.tmux.conf \; display "Config reloaded!"
  ```

## Essential Configuration Options (5 minutes)
- Changing the prefix key:
  ```
  unbind C-b
  set -g prefix C-a
  bind C-a send-prefix
  ```
- Starting window/pane index at 1:
  ```
  set -g base-index 1
  setw -g pane-base-index 1
  ```
- Increase history limit:
  ```
  set -g history-limit 10000
  ```
- Enable mouse support:
  ```
  set -g mouse on
  ```
- Set terminal colors:
  ```
  set -g default-terminal "screen-256color"
  ```

## Better Key Bindings (5 minutes)
- Intuitive window splitting:
  ```
  bind | split-window -h
  bind - split-window -v
  unbind '"'
  unbind %
  ```
- Vim-style pane navigation:
  ```
  bind h select-pane -L
  bind j select-pane -D
  bind k select-pane -U
  bind l select-pane -R
  ```
- Quick window movement:
  ```
  bind -n M-Left previous-window
  bind -n M-Right next-window
  ```
- Better session management:
  ```
  bind S command-prompt -p "New Session:" "new-session -A -s '%%'"
  bind K confirm kill-session
  ```

## Status Bar Customization (5 minutes)
- Basic status bar options:
  ```
  set -g status-position top
  set -g status-style bg=black,fg=white
  set -g status-left-length 40
  set -g status-right-length 60
  ```
- Custom status left format:
  ```
  set -g status-left "#[fg=green]Session: #S #[fg=yellow]Window: #I #[fg=cyan]Pane: #P"
  ```
- Custom status right format:
  ```
  set -g status-right "#[fg=cyan]%d %b %Y #[fg=yellow]%H:%M"
  ```
- Window status formatting:
  ```
  setw -g window-status-current-style fg=black,bg=white,bold
  setw -g window-status-current-format ' #I:#W#F '
  ```

## Activity Monitoring (3 minutes)
- Setting up activity alerts:
  ```
  setw -g monitor-activity on
  set -g visual-activity on
  ```
- Window highlighting on activity
- Configuring alerts and bells

## Advanced Configuration Techniques (5 minutes)
- Conditional configuration based on Tmux version:
  ```
  if-shell "tmux -V | grep -q 'tmux [0-1]\\|tmux 2\\.[0-4]'" "set -g status-fg white; set -g status-bg black" "set -g status-style fg=white,bg=black"
  ```
- Running shell commands in config:
  ```
  run-shell "if command -v reattach-to-user-namespace > /dev/null; then echo 'reattach exists'; else echo 'reattach missing'; fi"
  ```
- Platform-specific configurations
- Local configuration overrides

## Configuring Vi Mode for Copy/Paste (4 minutes)
- Enabling Vi mode:
  ```
  setw -g mode-keys vi
  ```
- Vi-style copy mode bindings:
  ```
  bind -T copy-mode-vi v send -X begin-selection
  bind -T copy-mode-vi y send -X copy-selection-and-cancel
  ```
- System clipboard integration:
  - macOS
  - Linux
  - Windows (WSL)

## Demo: Creating a Complete Configuration File (5 minutes)
- Creating a full .tmux.conf step by step
- Testing each section as we build it
- Making improvements based on actual usage

## Useful Resources and Examples (3 minutes)
- GitHub repositories with example configurations
- Notable Tmux users' configurations to study
- Documentation and reference material

## Preview of Episode 3: Advanced Features (2 minutes)
- Preview of plugin management
- Scripting and automation
- Session management
- Copy-paste and more advanced features

## Conclusion (1 minute)
- Recap of key customization points
- Encourage experimentation with personal configuration
- Reference to the exercises and sample configuration files in the repo