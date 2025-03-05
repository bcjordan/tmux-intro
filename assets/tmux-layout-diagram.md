```
┌────────────────────────────────────────┐
│                                        │
│             Tmux Session               │
│                                        │
├─────────────────┬──────────────────────┤
│                 │                      │
│                 │                      │
│                 │                      │
│   Window 1      │      Window 2        │
│                 │                      │
│                 │                      │
│                 │                      │
├─────────────────┼──────────┬───────────┤
│                 │          │           │
│                 │  Pane 1  │  Pane 2   │
│                 │          │           │
│   Window 3      ├──────────┴───────────┤
│                 │                      │
│                 │       Pane 3         │
│                 │                      │
└─────────────────┴──────────────────────┘
```

This ASCII diagram illustrates the basic organization structure of tmux:

1. A **Session** contains one or more windows
2. Each **Window** occupies the entire screen and can be divided into panes
3. **Panes** are subdivisions of a window that can each run separate commands

The hierarchy is:
- Session (the outermost container)
  - Window (like tabs in a browser)
    - Pane (splits within a window)

When using tmux, you typically:
1. Create or attach to a session
2. Create multiple windows for different tasks
3. Split windows into panes as needed for related tasks