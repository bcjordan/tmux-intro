# CI/CD Integration with tmux

This guide explores how to integrate tmux into your Continuous Integration and Continuous Deployment (CI/CD) workflows for improved monitoring, debugging, and development efficiency.

## Why Integrate tmux with CI/CD?

- **Persistent monitoring**: Watch build processes without losing progress if you disconnect
- **Multi-view debugging**: Observe multiple logs and processes simultaneously
- **Automated environment setup**: Quickly recreate development environments
- **Efficient context switching**: Manage multiple build environments in one terminal
- **Remote collaboration**: Share build monitoring and debugging sessions with team members

## Basic CI/CD Monitoring Setup

### Monitoring Local Builds

Set up a dedicated tmux session for monitoring your local CI pipeline:

```bash
# Create a new session for CI monitoring
tmux new -s ci-monitor

# Split the window into multiple panes
tmux split-window -h
tmux split-window -v
tmux select-pane -t 0
tmux split-window -v

# Set up each pane for different monitoring tasks
tmux select-pane -t 0
tmux send-keys "watch -n 5 'git status'" C-m

tmux select-pane -t 1
tmux send-keys "tail -f build.log" C-m

tmux select-pane -t 2
tmux send-keys "npm run test:watch" C-m

tmux select-pane -t 3
tmux send-keys "docker stats" C-m
```

### Monitoring Remote CI/CD Systems

Connect to your CI server and monitor multiple builds:

```bash
# Connect to CI server
ssh user@ci-server

# Create monitoring session
tmux new -s builds

# Create windows for different projects
tmux new-window -n project1
tmux new-window -n project2
tmux new-window -n project3

# Set up monitoring in project1 window
tmux select-window -t project1
tmux send-keys "cd /path/to/project1 && tail -f logs/ci.log" C-m

# Set up monitoring in project2 window
tmux select-window -t project2
tmux send-keys "cd /path/to/project2 && tail -f logs/ci.log" C-m

# Return to main window
tmux select-window -t builds
```

## Integration with Popular CI/CD Tools

### Jenkins Integration

Monitor Jenkins builds with a tmux script:

```bash
#!/bin/bash
# jenkins-monitor.sh

SESSION="jenkins"
JENKINS_URL="https://jenkins.example.com"
API_TOKEN="your-api-token"

# Create new tmux session
tmux new-session -d -s $SESSION

# Create window for Jenkins dashboard
tmux rename-window -t $SESSION:0 'dashboard'
tmux send-keys -t $SESSION:0 "watch -n 30 'curl -s -u user:$API_TOKEN $JENKINS_URL/api/json?pretty=true | jq .jobs[].name'" C-m

# Create window for build logs
tmux new-window -t $SESSION:1 -n 'build-logs'
tmux send-keys -t $SESSION:1 "curl -s -u user:$API_TOKEN $JENKINS_URL/job/main-project/lastBuild/consoleText | less" C-m

# Create window for test results
tmux new-window -t $SESSION:2 -n 'tests'
tmux send-keys -t $SESSION:2 "curl -s -u user:$API_TOKEN $JENKINS_URL/job/main-project/lastBuild/testReport/api/json?pretty=true | jq" C-m

# Attach to session
tmux attach-session -t $SESSION
```

### GitHub Actions Integration

Monitor GitHub Actions workflows:

```bash
#!/bin/bash
# github-actions-monitor.sh

SESSION="github-actions"
REPO="username/repository"
TOKEN="your-github-token"

# Create new tmux session
tmux new-session -d -s $SESSION

# Window for workflow runs
tmux rename-window -t $SESSION:0 'workflows'
tmux send-keys -t $SESSION:0 "watch -n 60 'gh workflow list -R $REPO'" C-m

# Window for specific workflow details
tmux new-window -t $SESSION:1 -n 'details'
tmux send-keys -t $SESSION:1 "gh run list -R $REPO -L 10" C-m

# Window for logs
tmux new-window -t $SESSION:2 -n 'logs'
tmux send-keys -t $SESSION:2 "echo 'To view logs, enter: gh run view [run-id] -R $REPO --log'" C-m

# Attach to session
tmux attach-session -t $SESSION
```

### GitLab CI Integration

Monitor GitLab CI pipelines:

```bash
#!/bin/bash
# gitlab-ci-monitor.sh

SESSION="gitlab-ci"
PROJECT_ID="your-project-id"
API_TOKEN="your-gitlab-token"

# Create new tmux session
tmux new-session -d -s $SESSION

# Window for pipeline list
tmux rename-window -t $SESSION:0 'pipelines'
tmux send-keys -t $SESSION:0 "watch -n 30 'curl -s --header \"PRIVATE-TOKEN: $API_TOKEN\" \"https://gitlab.com/api/v4/projects/$PROJECT_ID/pipelines\" | jq'" C-m

# Window for specific pipeline jobs
tmux new-window -t $SESSION:1 -n 'jobs'
tmux send-keys -t $SESSION:1 "echo 'Enter pipeline ID to view jobs:'; read PIPELINE_ID; curl -s --header \"PRIVATE-TOKEN: $API_TOKEN\" \"https://gitlab.com/api/v4/projects/$PROJECT_ID/pipelines/\$PIPELINE_ID/jobs\" | jq" C-m

# Window for job logs
tmux new-window -t $SESSION:2 -n 'logs'
tmux send-keys -t $SESSION:2 "echo 'Enter job ID to view logs:'; read JOB_ID; curl -s --header \"PRIVATE-TOKEN: $API_TOKEN\" \"https://gitlab.com/api/v4/projects/$PROJECT_ID/jobs/\$JOB_ID/trace\"" C-m

# Attach to session
tmux attach-session -t $SESSION
```

## Debugging CI/CD Processes

### Parallel Execution Debugging

When a CI build fails, set up a debugging session:

```bash
#!/bin/bash
# debug-ci-failure.sh

SESSION="debug-ci"

# Create new tmux session
tmux new-session -d -s $SESSION

# Create window for build logs
tmux rename-window -t $SESSION:0 'build-logs'
tmux send-keys -t $SESSION:0 "cat failed-build.log | less" C-m

# Create window for running the failing step
tmux new-window -t $SESSION:1 -n 'failing-step'
tmux send-keys -t $SESSION:1 "# Run the failing step here" C-m

# Create window for examining environment
tmux new-window -t $SESSION:2 -n 'environment'
tmux send-keys -t $SESSION:2 "env | grep CI_" C-m
tmux split-window -v
tmux send-keys -t $SESSION:2 "cat .env.ci" C-m

# Attach to session
tmux attach-session -t $SESSION
```

### Remote Debugging Tool

Create a tool for quick debugging of remote CI servers:

```bash
#!/bin/bash
# remote-ci-debug.sh

if [ $# -lt 2 ]; then
  echo "Usage: $0 <server> <build-id>"
  exit 1
fi

SERVER=$1
BUILD_ID=$2
SESSION="ci-debug-$BUILD_ID"

# Connect to server and set up debugging session
ssh -t $SERVER "tmux new-session -d -s $SESSION \
  && tmux send-keys -t $SESSION:0 'cd /builds/$BUILD_ID' C-m \
  && tmux split-window -h -t $SESSION:0 \
  && tmux send-keys -t $SESSION:0.1 'cd /builds/$BUILD_ID && tail -f build.log' C-m \
  && tmux split-window -v -t $SESSION:0.0 \
  && tmux send-keys -t $SESSION:0.2 'cd /builds/$BUILD_ID && cat .env' C-m \
  && tmux new-window -t $SESSION:1 -n 'tests' \
  && tmux send-keys -t $SESSION:1 'cd /builds/$BUILD_ID && find . -name \"*test*\" | grep -v node_modules' C-m \
  && tmux attach-session -t $SESSION"
```

## Automated Environment Setup

### Developer Workflow Integration

Create a script to set up a development environment that mirrors your CI/CD pipeline:

```bash
#!/bin/bash
# dev-ci-mirror.sh

# Configuration
PROJECT_DIR="$HOME/projects/myapp"
SESSION="dev-ci"

# Create session
tmux new-session -d -s $SESSION -c $PROJECT_DIR

# Setup editor window
tmux rename-window -t $SESSION:0 'editor'
tmux send-keys -t $SESSION:0 "vim" C-m

# Setup testing window that mimics CI
tmux new-window -t $SESSION:1 -n 'testing' -c $PROJECT_DIR
tmux send-keys -t $SESSION:1 "npm run test:ci" C-m

# Setup build window that mimics CI
tmux new-window -t $SESSION:2 -n 'build' -c $PROJECT_DIR
tmux send-keys -t $SESSION:2 "npm run build:ci" C-m

# Setup deployment window
tmux new-window -t $SESSION:3 -n 'deploy' -c $PROJECT_DIR
tmux send-keys -t $SESSION:3 "echo 'Ready to deploy. Run: ./deploy.sh'" C-m

# Return to editor window
tmux select-window -t $SESSION:0

# Attach to session
tmux attach-session -t $SESSION
```

### Local Integration Testing

Script to simulate integration tests locally:

```bash
#!/bin/bash
# local-integration.sh

SESSION="integration"
PROJECT_DIR="$HOME/projects/myapp"

# Create session
tmux new-session -d -s $SESSION -c $PROJECT_DIR

# Setup main app
tmux rename-window -t $SESSION:0 'app'
tmux send-keys -t $SESSION:0 "npm run start:dev" C-m

# Setup database
tmux new-window -t $SESSION:1 -n 'database' -c $PROJECT_DIR
tmux send-keys -t $SESSION:1 "docker-compose up database" C-m

# Setup API tests
tmux new-window -t $SESSION:2 -n 'api-tests' -c $PROJECT_DIR
tmux send-keys -t $SESSION:2 "echo 'Run API tests with: npm run test:api'" C-m

# Setup monitoring
tmux new-window -t $SESSION:3 -n 'monitoring' -c $PROJECT_DIR
tmux split-window -h
tmux send-keys -t $SESSION:3.0 "docker stats" C-m
tmux send-keys -t $SESSION:3.1 "tail -f logs/dev.log" C-m

# Return to app window
tmux select-window -t $SESSION:0

# Attach to session
tmux attach-session -t $SESSION
```

## Cross-Platform CI Monitoring

### Unified Multi-Platform CI Dashboard

Create a unified dashboard for monitoring CI across different platforms:

```bash
#!/bin/bash
# multi-platform-ci.sh

SESSION="ci-dashboard"

# Create session
tmux new-session -d -s $SESSION

# GitHub Actions window
tmux rename-window -t $SESSION:0 'github'
tmux send-keys -t $SESSION:0 "watch -n 60 'gh run list -R username/repo -L 5'" C-m

# GitLab CI window
tmux new-window -t $SESSION:1 -n 'gitlab'
tmux send-keys -t $SESSION:1 "watch -n 60 'curl -s --header \"PRIVATE-TOKEN: $GITLAB_TOKEN\" \"https://gitlab.com/api/v4/projects/$PROJECT_ID/pipelines\" | jq -r \".[] | [.id, .status, .ref, .created_at] | @tsv\" | head -5'" C-m

# Jenkins window
tmux new-window -t $SESSION:2 -n 'jenkins'
tmux send-keys -t $SESSION:2 "watch -n 60 'curl -s -u user:$JENKINS_TOKEN $JENKINS_URL/api/json?pretty=true | jq \".jobs[] | {name: .name, color: .color}\" | head -10'" C-m

# Travis CI window
tmux new-window -t $SESSION:3 -n 'travis'
tmux send-keys -t $SESSION:3 "watch -n 60 'travis status -r username/repo'" C-m

# Summary window
tmux new-window -t $SESSION:4 -n 'summary'
tmux send-keys -t $SESSION:4 "./generate-ci-summary.sh" C-m

# Return to summary window
tmux select-window -t $SESSION:4

# Attach to session
tmux attach-session -t $SESSION
```

## Best Practices

1. **Create reusable scripts**: Build a library of tmux scripts for common CI/CD tasks
2. **Use consistent layouts**: Create standardized layouts for different types of monitoring
3. **Automated setup**: Create scripts that set up your entire development environment
4. **Session naming conventions**: Use a consistent naming scheme for different sessions
5. **Error notifications**: Set up visual bell or status bar changes when errors occur
6. **Documentation**: Include comments in your scripts explaining what each pane/window does

## Next Steps

- Explore [Cross-Platform Synchronization](03-cross-platform-sync.md)
- Learn about [Tmux Presentation Techniques](04-presentations.md)
- Set up [Remote Development](../integration-guides/01-remote-development.md)