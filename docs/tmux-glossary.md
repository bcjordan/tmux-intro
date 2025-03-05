# Tmux Glossary

A comprehensive guide to tmux terminology and concepts. Understanding these terms will help you better navigate the tmux documentation and tutorials.

## Core Concepts

### Terminal Multiplexer
A program that enables multiple terminal sessions within a single window, allowing users to access and control several terminal processes simultaneously.

### Client
A connection to a tmux server. When you run `tmux` or `tmux attach`, you're creating a client that connects to a tmux server.

### Server
The background process that manages tmux sessions. A single tmux server can handle multiple sessions and clients.

### Session
A collection of one or more windows. Sessions are persistent, meaning they continue to run even when you're not attached to them. Each session has a name (or a number if not explicitly named).

### Window
Similar to a tab in a browser. Each window takes up the entire visible area of tmux and can be divided into multiple panes. Windows have names and numbers within a session.

### Pane
A rectangular section of a window running a single command (typically a shell). Windows can be split into multiple panes, each running its own process.

### Prefix Key
The key combination pressed before a tmux command (default: Ctrl+b). This signals to tmux that the next keystroke is a tmux command, not input for the current pane.

## Command Terms

### Command Mode
Activated by pressing `prefix + :`. Allows you to type tmux commands directly, similar to Vim's command mode.

### Control Mode
A special mode where tmux can be controlled programmatically through a client connection.

### Copy Mode
A special mode (activated with `prefix + [`) that allows you to navigate through the terminal buffer, search for text, and copy selections.

### Detach
To disconnect a client from a session without terminating the session. The session continues to run in the background.

### Attach
To connect a client to an existing session.

## Layout and Display Terms

### Status Line/Status Bar
The information bar typically displayed at the bottom of the tmux interface, showing session, window, and pane information.

### Layout
The arrangement of panes within a window. Tmux offers several built-in layouts (even-horizontal, even-vertical, main-horizontal, main-vertical, tiled).

### Active Window/Pane
The window or pane that is currently receiving keyboard input.

### Buffer
A storage area for copied text. Tmux maintains a stack of text buffers.

### Respawn
To replace the command running in a pane with a new command.

## Configuration Terms

### .tmux.conf
The configuration file for tmux, usually located in the user's home directory (`~/.tmux.conf`).

### Bind/Unbind
To associate/disassociate a key combination with a tmux command.

### Option
A setting that controls tmux behavior. Options can be set at the server, session, window, or pane level.

### Format
A string containing variables that tmux replaces with their values. Used for customizing the status line and other displays.

### Hook
A command that runs automatically when certain events occur in tmux.

## Plugin-Related Terms

### Tmux Plugin Manager (TPM)
A framework for installing and managing tmux plugins.

### Plugin
An extension that adds functionality to tmux.

### Continuum
A plugin for continuous saving of tmux environment.

### Resurrect
A plugin that enables saving and restoring tmux sessions.

## Advanced Concepts

### Synchronized Panes
A mode where input sent to one pane is sent to all panes in a window.

### Link Window
A window that appears in multiple sessions.

### Monitor Activity/Silence
Features that notify you when there's output activity or silence in a window.

### Nested Sessions
Running tmux within a tmux session, creating a hierarchy of sessions.

### Socket
The communication endpoint used by tmux clients to connect to the server.

### Target (-t flag)
A specification for session, window, or pane (e.g., `session:window.pane`).

## Keyboard and Mouse Terms

### Mouse Mode
A feature that allows using the mouse to select windows, panes, and copy text.

### Key Table
A set of key bindings active in a particular mode (e.g., the "copy-mode" key table).

### Repeat Timeout
The time window in which repeated commands can be executed without pressing the prefix again.

### Chain Binding
A sequence of tmux commands executed one after another from a single key binding.

## Display and Format Terms

### Client Size
The dimensions of the terminal in which tmux is running.

### Window Size
The dimensions allocated to a specific window, which may be constrained by client size.

### Pane Size
The dimensions of an individual pane, constrained by its containing window.

### Status-left/Status-right
The customizable sections on the left and right sides of the tmux status bar.

### Format Variables
Special variables that can be used in formats, like `#S` for session name, `#W` for window name, etc.

## Scripting Terms

### Send-keys
A command to send keyboard input to a pane, used for automation.

### Run-shell
A command to execute shell commands from within tmux.

### Wait-for
A command that blocks until a specific condition is met.

### Environment Variables
Variables defined in the shell environment that can affect tmux behavior.

### Shell-command
A command that runs in a shell outside of tmux but is initiated from within tmux.

## Practical Examples

To illustrate these terms in practical use:

```
tmux new-session -s development -n editor
```

This creates a new "session" named "development" with a "window" named "editor".

```
tmux split-window -h -t development:editor
```

This splits the "window" named "editor" in the "development" session horizontally, creating two "panes".

```
tmux attach -t development
```

This creates a new "client" and attaches it to the existing "development" session.

```
prefix + d
```

This detaches the current client from its session.

## Related Tools

### Tmuxinator
A tool for creating and managing complex tmux sessions through YAML configuration files.

### TMUX Powerline
A status bar enhancement for tmux with advanced features and improved aesthetics.

### Byobu
A text-based window manager built on top of tmux (or GNU Screen).

### iTerm2 Integration
A feature of iTerm2 that provides native integration with tmux sessions.

---

This glossary will be updated as new terms are added to the tmux ecosystem or as existing terms evolve in meaning.