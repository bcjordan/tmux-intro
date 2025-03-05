#!/bin/bash
# Initialize git repository for tmux-vids

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit for tmux-vids tutorial series

This initial commit includes:
- Basic repository structure
- Episode outlines
- Cheatsheets and references
- Configuration examples
- Scripts for development environments
- Exercise files"

# Create main branches
git branch develop
git branch documentation

# Show status
echo "Repository initialized with the following branches:"
git branch

echo "Next steps:"
echo "1. Create a remote repository on GitHub/GitLab/etc."
echo "2. Add the remote:"
echo "   git remote add origin https://github.com/bcjordan/tmux-vids.git"
echo "3. Push all branches:"
echo "   git push -u origin main develop documentation"

# Make the script executable
chmod +x scripts/init-repo.sh