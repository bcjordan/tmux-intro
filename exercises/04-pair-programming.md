# Exercise: Pair Programming with Tmux

This exercise will teach you how to use tmux for effective pair programming sessions. You'll learn how to share terminals, switch roles, and collaborate efficiently with a partner.

## Prerequisites

- Basic understanding of tmux (completed Exercises 01 and 02)
- Access to a shared server, or SSH access to each other's machines
- Pair programming configuration: copy `configs/pair-programming.tmux.conf` to `~/.tmux.conf`

## Exercise 1: Setting Up a Shared Session

Let's start by creating a session that can be shared between two developers.

### Host Setup

1. On the host machine, start a new tmux session:
   ```bash
   tmux new-session -s pair
   ```

2. Allow session sharing by setting up socket permissions (optional if on same user account):
   ```bash
   chmod 777 /tmp/tmux-$(id -u)/default
   ```

3. Create a useful layout for your pair programming session:
   ```bash
   <prefix> P
   ```
   This will create the predefined pair programming layout from our configuration.

### Client Connection

4. On the client machine, connect to the host:
   ```bash
   ssh user@host
   ```

5. Attach to the existing session:
   ```bash
   tmux attach-session -t pair
   ```

6. Both host and client should now see the same tmux session and can interact with it simultaneously.

## Exercise 2: Paired Workflow Setup

Let's configure a workspace optimized for two developers working together.

1. Create a window layout with:
   - Equal split panes for coding (side by side)
   - A bottom pane for running commands/tests
   
   ```bash
   # First, create or go to a window
   <prefix> 1
   
   # Split horizontally for the two developers
   <prefix> |
   
   # Create bottom pane for running commands
   <prefix> -
   <prefix> -
   ```

2. Designate roles:
   - Left pane: Driver (writes code)
   - Right pane: Navigator (reviews code)
   - Bottom pane: Shared command area

3. Practice using shared indicators in the status bar:
   - Notice the "PAIR SESSION" indicator in the status bar
   - This helps remind both users they're in a shared session

## Exercise 3: Role Switching

Practice quickly switching between driver and navigator roles.

1. As the driver, start editing a file:
   ```bash
   vim example.js
   ```

2. To switch roles, both users navigate to the other's pane:
   ```bash
   <prefix> l  (to move right)
   <prefix> h  (to move left)
   ```

3. Practice passing control back and forth while working on a simple task like:
   - Driver: Write a function
   - Navigator: Review and suggest improvements
   - Switch roles and implement the suggestions

## Exercise 4: Synchronized Editing

Sometimes you want to type the same commands in multiple panes:

1. Toggle synchronized panes:
   ```bash
   <prefix> s
   ```

2. Type a command that should run in all selected panes:
   ```bash
   echo "This appears in all panes!"
   ```

3. Toggle synchronized panes off when done:
   ```bash
   <prefix> s
   ```

## Exercise 5: Collaborative Session Management

Practice session management techniques during pair programming:

1. Create a new window for research:
   ```bash
   <prefix> c
   ```

2. Rename the window appropriately:
   ```bash
   <prefix> ,
   ```
   Type "research" and press Enter.

3. Both users can switch between windows independently:
   ```bash
   <prefix> n  (next window)
   <prefix> p  (previous window)
   <prefix> window-number
   ```

4. Use the window list to sync up if separated:
   ```bash
   <prefix> w
   ```

5. To ensure both users see the same window:
   ```bash
   <prefix> :
   ```
   Then type: `select-window -t window-name`

## Exercise 6: Teaching Mode

If one developer is teaching or showing something to the other:

1. Switch to the teaching layout:
   ```bash
   <prefix> T
   ```

2. This creates:
   - Large main pane for demonstration
   - Small pane for explanatory notes
   - Small pane for command output

3. Practice a teaching workflow:
   - Teacher: Demonstrate in main pane
   - Student: Take notes or ask questions in chat pane
   - Both: See command outputs in bottom pane

## Exercise 7: Dealing with Conflicts

Practice resolving conflicts when both users try to type at once:

1. Establish a verbal or chat protocol for exchanging control:
   - "Taking control" / "You have control"
   - Like pilots handing off flight controls

2. Use visual indicators when someone needs attention:
   ```bash
   <prefix> C
   ```
   This clears the screen and history - useful as a visual signal.

## Challenge Tasks

1. **Remote Pairing Script**: Create a script that automates the setup of a pair programming session, including SSH access and session attachment.

2. **Custom Status Indicator**: Modify your tmux configuration to show which user last typed a command.

3. **Role Tokens**: Implement a "token passing" system using tmux to clearly indicate who should be typing.

4. **Session Recorder**: Set up tmux to record your pair programming session for later review.

## Conclusion

Effective pair programming with tmux allows you to:

- Collaborate in real-time regardless of location
- Maintain shared context about the code
- Switch roles smoothly without changing seats
- Work independently when needed, then sync up easily
- Share knowledge efficiently with appropriate layouts

Remember that successful pair programming relies on communication as much as technical setup. Use tmux as a tool to enhance your collaborative workflow, not as a substitute for clear communication between partners.