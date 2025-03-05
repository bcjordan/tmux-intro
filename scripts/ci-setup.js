#!/usr/bin/env node
/**
 * CI/CD Setup for Tmux Tutorial Series
 * 
 * This script helps set up continuous integration and deployment
 * for the tmux tutorial series project.
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');

// Check for prerequisites
function checkPrerequisites() {
  console.log(chalk.blue('Checking prerequisites...'));
  
  try {
    const nodeVersion = execSync('node --version').toString().trim();
    console.log(chalk.green(`✓ Node.js installed (${nodeVersion})`));
  } catch (error) {
    console.log(chalk.red('✗ Node.js not found. Please install Node.js.'));
    process.exit(1);
  }
  
  try {
    const npmVersion = execSync('npm --version').toString().trim();
    console.log(chalk.green(`✓ npm installed (${npmVersion})`));
  } catch (error) {
    console.log(chalk.red('✗ npm not found. Please install npm.'));
    process.exit(1);
  }
  
  try {
    const tmuxVersion = execSync('tmux -V').toString().trim();
    console.log(chalk.green(`✓ tmux installed (${tmuxVersion})`));
  } catch (error) {
    console.log(chalk.yellow('⚠ tmux not found. Some validation features may not work.'));
  }
}

// Install dependencies
function installDependencies() {
  console.log(chalk.blue('\nInstalling dependencies...'));
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log(chalk.green('✓ Dependencies installed successfully'));
  } catch (error) {
    console.log(chalk.red('✗ Failed to install dependencies'));
    process.exit(1);
  }
}

// Setup pre-commit hooks
function setupPreCommitHooks() {
  console.log(chalk.blue('\nSetting up pre-commit hooks...'));
  
  const hooksDir = path.join(__dirname, '..', '.git', 'hooks');
  
  // Check if .git directory exists
  if (!fs.existsSync(path.join(__dirname, '..', '.git'))) {
    console.log(chalk.yellow('⚠ .git directory not found. Initializing git repository...'));
    try {
      execSync('git init', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
      console.log(chalk.green('✓ Git repository initialized'));
    } catch (error) {
      console.log(chalk.red('✗ Failed to initialize git repository'));
      console.log(chalk.yellow('⚠ Skipping pre-commit hook setup'));
      return;
    }
  }
  
  // Create hooks directory if it doesn't exist
  fs.ensureDirSync(hooksDir);
  
  // Create pre-commit hook
  const preCommitScript = `#!/bin/sh
# Pre-commit hook for tmux tutorial series
# Run validation scripts before commit

echo "Running pre-commit validation..."

# Run markdown validation
npm run validate

if [ $? -ne 0 ]; then
  echo "❌ Validation failed. Please fix the issues before committing."
  exit 1
fi

# Validate tmux configs
for config in configs/*.conf; do
  if [ -f "$config" ]; then
    echo "Validating $config"
    tmux -f "$config" new-session -d "echo 'Config test'" || exit 1
    tmux kill-server
  fi
done

echo "✅ All checks passed!"
exit 0
`;

  fs.writeFileSync(path.join(hooksDir, 'pre-commit'), preCommitScript);
  fs.chmodSync(path.join(hooksDir, 'pre-commit'), '755');
  
  console.log(chalk.green('✓ Pre-commit hook installed'));
}

// Generate configuration files
function generateConfigFiles() {
  console.log(chalk.blue('\nGenerating configuration files...'));
  
  try {
    // Run config generator script
    require('./tmux-config-generator').generateAllProfiles();
    console.log(chalk.green('✓ Tmux configuration files generated'));
    
    // Run diagram generator script
    require('./generate-diagrams').generateDiagramFiles();
    console.log(chalk.green('✓ Diagram files generated'));
  } catch (error) {
    console.log(chalk.red('✗ Failed to generate configuration files'), error);
  }
}

// Run validation
function runValidation() {
  console.log(chalk.blue('\nRunning validation...'));
  
  try {
    // Run validation script
    require('./validate-markdown');
    console.log(chalk.green('✓ Validation completed successfully'));
  } catch (error) {
    console.log(chalk.red('✗ Validation failed'), error);
    process.exit(1);
  }
}

// Setup CI workflow
function setupCIWorkflow() {
  console.log(chalk.blue('\nSetting up CI workflow...'));
  
  const githubDir = path.join(__dirname, '..', '.github');
  const workflowsDir = path.join(githubDir, 'workflows');
  
  // Create GitHub workflows directory if it doesn't exist
  fs.ensureDirSync(workflowsDir);
  
  // Copy the CI workflow file if it exists, otherwise create it
  const workflowFile = path.join(workflowsDir, 'build.yml');
  
  if (!fs.existsSync(workflowFile)) {
    const workflowContent = `name: Build and Validate

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          
      - name: Install dependencies
        run: npm install
        
      - name: Validate markdown files
        run: npm run validate
        
      - name: Check tmux configs
        run: |
          sudo apt-get update
          sudo apt-get install -y tmux
          for config in configs/*.conf; do
            echo "Validating $config"
            tmux -f "$config" new-session -d "echo 'Config test'" || exit 1
            tmux kill-server
          done
`;
    
    fs.writeFileSync(workflowFile, workflowContent);
    console.log(chalk.green('✓ GitHub Actions workflow created'));
  } else {
    console.log(chalk.green('✓ GitHub Actions workflow already exists'));
  }
}

// Create package.json if it doesn't exist
function setupPackageJson() {
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.log(chalk.blue('\nCreating package.json...'));
    
    const packageJson = {
      name: 'tmux-tutorial-series',
      version: '1.0.0',
      description: 'Tutorial series on tmux - the terminal multiplexer',
      main: 'index.js',
      scripts: {
        validate: 'node scripts/validate-markdown.js',
        build: 'node scripts/build-site.js',
        dev: 'node scripts/dev-server.js',
        'generate-cheatsheet': 'node scripts/generate-cheatsheet.js',
        'generate-configs': 'node scripts/tmux-config-generator.js',
        'generate-diagrams': 'node scripts/generate-diagrams.js',
        setup: 'node scripts/ci-setup.js'
      },
      keywords: ['tmux', 'terminal', 'tutorial', 'multiplexer'],
      author: 'Tmux Tutorial Team',
      license: 'MIT',
      dependencies: {
        'markdown-it': '^13.0.1',
        'fs-extra': '^11.1.0',
        glob: '^8.1.0',
        chalk: '^4.1.2'
      },
      devDependencies: {
        express: '^4.18.2',
        'live-server': '^1.2.2'
      }
    };
    
    fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
    console.log(chalk.green('✓ package.json created'));
  }
}

// Main function
function main() {
  console.log(chalk.bold.blue('=== Tmux Tutorial Series - CI/CD Setup ===\n'));
  
  // Setup package.json
  setupPackageJson();
  
  // Check prerequisites
  checkPrerequisites();
  
  // Install dependencies
  installDependencies();
  
  // Setup pre-commit hooks
  setupPreCommitHooks();
  
  // Generate config files
  generateConfigFiles();
  
  // Setup CI workflow
  setupCIWorkflow();
  
  // Run validation
  runValidation();
  
  console.log(chalk.bold.green('\n=== Setup Complete! ==='));
  console.log(chalk.blue('\nAvailable npm scripts:'));
  console.log(chalk.gray('  npm run validate         - Validate markdown files'));
  console.log(chalk.gray('  npm run build            - Build the tutorial site'));
  console.log(chalk.gray('  npm run dev              - Start the development server'));
  console.log(chalk.gray('  npm run generate-configs - Generate tmux configuration files'));
  console.log(chalk.gray('  npm run generate-diagrams - Generate tmux diagrams'));
}

// Run the main function if this script is executed directly
if (require.main === module) {
  main();
}

module.exports = {
  checkPrerequisites,
  installDependencies,
  setupPreCommitHooks,
  generateConfigFiles,
  runValidation,
  setupCIWorkflow,
  main
};