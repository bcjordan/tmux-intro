# Exercise: Server Administration with Tmux

This exercise will teach you how to use tmux for effective server administration and monitoring. You'll learn how to manage multiple servers, monitor logs, and create efficient workflows for system administration tasks.

## Prerequisites

- Basic understanding of tmux (completed Exercises 01 and 02)
- Access to Linux/Unix servers (can be local virtual machines)
- Server admin configuration: copy `configs/server-admin.tmux.conf` to `~/.tmux.conf`

## Exercise 1: Setting Up a Server Monitoring Dashboard

Let's start by creating a monitoring dashboard for your servers.

1. Start a new tmux session specifically for monitoring:
   ```
   tmux new-session -s monitoring
   ```

2. Use the built-in monitoring layout:
   ```
   <prefix> M
   ```

3. This will create a layout with:
   - Top-left: top command (process monitoring)
   - Top-right: htop (interactive process viewer)
   - Bottom-left: df -h (disk usage monitor)
   - Bottom-right: network monitoring

4. Customize each pane if needed:
   - Navigate with <prefix> + arrow keys
   - Replace commands as needed

5. Practice making one pane full-screen temporarily:
   ```
   <prefix> z
   ```
   Press the same combination again to restore the layout.

## Exercise 2: Log Monitoring Setup

System administrators often need to watch multiple log files simultaneously.

1. Create a new window or session for log monitoring:
   ```
   <prefix> c
   ```
   or
   ```
   tmux new-session -s logs
   ```

2. Use the built-in log monitoring layout:
   ```
   <prefix> L
   ```

3. This creates a four-pane layout with common logs:
   - System logs
   - Authentication logs
   - Web server error logs
   - Web server access logs

4. Replace the default log paths with ones appropriate for your system.

5. Practice searching through log history:
   - Enter copy mode: `<prefix> [`
   - Search: `/search_term` (press n for next match)
   - Copy text: Press `v` to start selection, then `y` to copy

## Exercise 3: Managing Multiple Servers

Let's practice managing multiple servers simultaneously.

1. Create a new session for multi-server management:
   ```
   tmux new-session -s servers
   ```

2. Use the multi-server connection prompt:
   ```
   <prefix> H
   ```

3. When prompted, enter a comma-separated list of servers:
   ```
   server1,server2,server3
   ```

4. This will create a tiled layout with SSH connections to each server.

5. Toggle synchronized panes to run the same command on all servers:
   ```
   <prefix> S
   ```

6. Run some basic commands on all servers simultaneously:
   ```
   hostname
   uptime
   df -h
   free -m
   ```

7. Turn off synchronization when done:
   ```
   <prefix> S
   ```

## Exercise 4: Routine System Administration Tasks

Practice common administrative tasks with tmux:

1. Create a window with a suitable layout for package management:
   ```
   <prefix> c
   <prefix> |
   ```

2. In the left pane, check for updates:
   ```
   # Debian/Ubuntu
   apt update
   
   # CentOS/RHEL
   yum check-update
   ```

3. In the right pane, review package information:
   ```
   # Debian/Ubuntu
   apt list --upgradable
   
   # CentOS/RHEL
   yum list updates
   ```

4. Use session management to save this state:
   ```
   <prefix> C-b
   ```
   When prompted, save as "maintenance"

5. Detach from the session:
   ```
   <prefix> d
   ```

6. Later, restore the session:
   ```
   <prefix> C-r
   ```
   When prompted, enter "maintenance"

## Exercise 5: Emergency Response Simulation

Let's simulate responding to a server issue:

1. Create a new session:
   ```
   tmux new-session -s emergency
   ```

2. Set up a troubleshooting layout:
   ```
   # Split into four panes
   <prefix> |
   <prefix> -
   <prefix> -
   ```

3. In each pane, run one of these common diagnostic commands:
   - Pane 1: `top` (CPU and memory usage)
   - Pane 2: `iostat -x 1` (disk I/O stats)
   - Pane 3: `tail -f /var/log/syslog` (system logs)
   - Pane 4: `netstat -tuln` (network connections)

4. Practice quickly identifying issues from these information sources.

5. Use the synchronized panes feature to run the same troubleshooting commands across multiple servers.

## Exercise 6: Remote Work with SSH and Tmux

Practice a typical remote administration workflow:

1. SSH into a remote server
   ```
   ssh user@server
   ```

2. Start or attach to a tmux session:
   ```
   tmux a || tmux new-session -s remote
   ```

3. Work inside this session, safe from disconnections.

4. Simulate a network interruption by closing your terminal.

5. Reconnect and attach to your session:
   ```
   ssh user@server
   tmux attach-session
   ```

6. Notice how your work is preserved, including running processes.

## Challenge Tasks

1. **Server Group Script**: Create a script that launches tmux with predefined server groups (e.g., web servers, database servers).

2. **Monitoring Dashboard**: Design a custom monitoring dashboard that shows key metrics from multiple servers in one view.

3. **Auto-healing Session**: Create a tmux session that automatically runs diagnostics when a server metric crosses a threshold.

4. **Deployment Layout**: Design a tmux layout optimized for coordinating code deployments across multiple servers.

## Conclusion

Effective server administration with tmux allows you to:

- Monitor multiple systems simultaneously
- Run commands across server groups
- Maintain persistent sessions that survive network issues
- Organize information visually for better situational awareness
- Respond quickly to issues with predefined layouts

By combining these techniques with scripting, you can create powerful, customized workflows that make managing server infrastructure more efficient and less error-prone.