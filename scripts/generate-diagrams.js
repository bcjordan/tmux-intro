/**
 * Generates ASCII and SVG diagrams for tmux tutorial series
 * This tool creates visual aids to help explain tmux concepts
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

// Basic ASCII layout of tmux window
function generateTmuxLayout() {
  return `
+-------------------------------------- tmux session ------------------------------------+
|                                                                                       |
| +---------------------------------- tmux window -----------------------------------+  |
| |                                                                                  |  |
| | +------------------------+                    +-----------------------------+    |  |
| | |                        |                    |                             |    |  |
| | |                        |                    |                             |    |  |
| | |                        |                    |                             |    |  |
| | |       Pane 0           |                    |           Pane 1            |    |  |
| | |    (Active Pane)       |                    |                             |    |  |
| | |                        |                    |                             |    |  |
| | |                        |                    |                             |    |  |
| | |                        |                    |                             |    |  |
| | +------------------------+                    +-----------------------------+    |  |
| |                                                                                  |  |
| | +-----------------------------------------------------------------------+       |  |
| | |                                                                       |       |  |
| | |                                                                       |       |  |
| | |                           Pane 2                                      |       |  |
| | |                                                                       |       |  |
| | |                                                                       |       |  |
| | +-----------------------------------------------------------------------+       |  |
| |                                                                                  |  |
| +---------------------------------------------------------------------------------+  |
|                                                                                       |
| [0] bash*  [1] vim  [2] logs                                Window List               |
|                                                                                       |
| [Session: dev]                                                 %H:%M %d-%b            |
+--------------------------------------------------------------------------------------+
`;
}

// Generate detailed explanation of tmux components
function generateTmuxComponents() {
  return `
# Tmux Components Explained

## Sessions
A tmux session is a collection of windows that can be detached (kept alive in the background) and reattached. Sessions are persistent, surviving accidental disconnection or terminal closure.

**Key commands:**
- Create new session: \`tmux new-session -s session-name\` or \`tmux new -s session-name\`
- Detach current session: \`PREFIX d\`
- List sessions: \`tmux list-sessions\` or \`tmux ls\`
- Attach to a session: \`tmux attach-session -t session-name\` or \`tmux a -t session-name\`
- Kill/delete a session: \`tmux kill-session -t session-name\`

## Windows (Tabs)
Windows are like tabs within a session. Each window can be full-screen within the tmux client.

**Key commands:**
- Create new window: \`PREFIX c\`
- Next window: \`PREFIX n\`
- Previous window: \`PREFIX p\`
- List windows: \`PREFIX w\`
- Rename window: \`PREFIX ,\`
- Close window: \`PREFIX &\`

## Panes
Panes are divisions within a window. A window can be split into multiple panes, each running its own process.

**Key commands:**
- Split pane horizontally: \`PREFIX %\`
- Split pane vertically: \`PREFIX "\`
- Switch to pane: \`PREFIX arrow-key\` (up, down, left, right)
- Toggle between panes: \`PREFIX o\`
- Show pane numbers: \`PREFIX q\`
- Kill pane: \`PREFIX x\`
- Resize pane: \`PREFIX Alt-arrow\` or \`PREFIX Ctrl-arrow\`
- Zoom pane (toggle): \`PREFIX z\`

## Status Bar
The status bar at the bottom shows session info, window list, and system info.

**Sections:**
- Left: Session information
- Center: Window list
- Right: System information (date, time, etc.)

## Prefix Key
The default prefix key is \`Ctrl+b\` (often written as \`C-b\` or \`^b\`). 
This key must be pressed before any tmux command.
`;
}

// Generate a markdown file with shortcuts
function generateShortcutsCheatsheet() {
  return `
# Tmux Keyboard Shortcuts Cheatsheet

> Note: The default prefix key is \`Ctrl+b\` (shown as \`PREFIX\`)

## Session Management

| Command | Action |
|---------|--------|
| \`tmux new -s name\` | Create a new session with name |
| \`tmux ls\` | List all sessions |
| \`tmux a -t name\` | Attach to a session |
| \`PREFIX d\` | Detach from current session |
| \`PREFIX $\` | Rename session |
| \`PREFIX (\` | Switch to previous session |
| \`PREFIX )\` | Switch to next session |
| \`PREFIX s\` | Show session list |

## Window Management

| Command | Action |
|---------|--------|
| \`PREFIX c\` | Create a new window |
| \`PREFIX ,\` | Rename current window |
| \`PREFIX n\` | Move to next window |
| \`PREFIX p\` | Move to previous window |
| \`PREFIX w\` | List windows |
| \`PREFIX &\` | Kill current window |
| \`PREFIX 0-9\` | Switch to window number |
| \`PREFIX f\` | Find window by name |

## Pane Management

| Command | Action |
|---------|--------|
| \`PREFIX %\` | Split pane horizontally |
| \`PREFIX "\` | Split pane vertically |
| \`PREFIX Arrow\` | Navigate panes |
| \`PREFIX o\` | Go to next pane |
| \`PREFIX q\` | Show pane numbers |
| \`PREFIX x\` | Kill current pane |
| \`PREFIX z\` | Toggle pane zoom |
| \`PREFIX {\` | Move pane left |
| \`PREFIX }\` | Move pane right |
| \`PREFIX Ctrl+Arrow\` | Resize pane |

## Copy Mode (Vi-style)

| Command | Action |
|---------|--------|
| \`PREFIX [\` | Enter copy mode |
| \`PREFIX ]\` | Paste from buffer |
| \`v\` | Start selection (after entering copy mode) |
| \`y\` | Copy selection (after marking with v) |
| \`q\` | Quit copy mode |
| \`g\` | Go to top of buffer |
| \`G\` | Go to bottom of buffer |
| \`/\` | Search forward |
| \`?\` | Search backward |
| \`n\` | Next search match |
| \`N\` | Previous search match |

## Miscellaneous

| Command | Action |
|---------|--------|
| \`PREFIX :\` | Enter command mode |
| \`PREFIX t\` | Show time |
| \`PREFIX ?\` | Show all key bindings |
| \`PREFIX r\` | Reload tmux config |
`;
}

// Generate diagram file in assets directory
function generateDiagramFiles() {
  const assetsDir = path.join(__dirname, '..', 'assets');
  fs.ensureDirSync(assetsDir);
  
  // Create the tmux layout diagram
  fs.writeFileSync(
    path.join(assetsDir, 'tmux-layout-diagram.md'),
    `# Tmux Layout Diagram\n\nThe following ASCII diagram illustrates the basic layout and components of tmux:\n\n\`\`\`\n${generateTmuxLayout()}\n\`\`\`\n\n${generateTmuxComponents()}`
  );
  console.log(chalk.green('Generated tmux layout diagram in assets/tmux-layout-diagram.md'));
  
  // Create the shortcuts cheatsheet
  fs.writeFileSync(
    path.join(__dirname, '..', 'cheatsheets', 'tmux-cheatsheet.md'),
    `# Tmux Cheatsheet\n\n${generateShortcutsCheatsheet()}`
  );
  console.log(chalk.green('Generated tmux shortcuts cheatsheet in cheatsheets/tmux-cheatsheet.md'));
}

// If script is run directly, generate all diagram files
if (require.main === module) {
  generateDiagramFiles();
}

module.exports = {
  generateTmuxLayout,
  generateTmuxComponents,
  generateShortcutsCheatsheet,
  generateDiagramFiles,
};