/**
 * Validates markdown files in the repository
 * Checks for:
 * - Broken internal links
 * - Proper heading structure
 * - Code block syntax
 */

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

// Directories to scan
const dirsToScan = [
  'tutorials',
  'episodes',
  'exercises',
  'cheatsheets',
  'assets'
];

// Get all markdown files
const getMarkdownFiles = () => {
  let markdownFiles = [];
  
  dirsToScan.forEach(dir => {
    try {
      if (fs.existsSync(dir)) {
        const files = glob.sync(`${dir}/**/*.md`);
        markdownFiles = markdownFiles.concat(files);
      }
    } catch (err) {
      console.error(`Error reading directory ${dir}:`, err);
    }
  });
  
  return markdownFiles;
};

// Validate heading structure
const validateHeadings = (content, filePath) => {
  const headingLines = content.split('\n').filter(line => line.startsWith('#'));
  let errors = [];
  
  // Check if first heading is H1
  if (headingLines.length > 0 && !headingLines[0].startsWith('# ')) {
    errors.push(`File should start with an H1 heading (# )`);
  }
  
  // Check for proper heading hierarchy
  let currentLevel = 1;
  for (let i = 0; i < headingLines.length; i++) {
    const line = headingLines[i];
    const level = line.match(/^#+/)[0].length;
    
    if (level > currentLevel + 1) {
      errors.push(`Heading level jumps from ${currentLevel} to ${level}: "${line}"`);
    }
    
    currentLevel = level;
  }
  
  return errors;
};

// Validate code blocks
const validateCodeBlocks = (content, filePath) => {
  const codeBlockRegex = /```([a-z]*)\n([\s\S]*?)```/g;
  let errors = [];
  let match;
  
  while ((match = codeBlockRegex.exec(content)) !== null) {
    const language = match[1];
    const code = match[2];
    
    if (!language && code.trim().length > 0) {
      errors.push('Code block is missing language specification');
    }
  }
  
  return errors;
};

// Check for broken internal links
const validateInternalLinks = (content, filePath, allFiles) => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let errors = [];
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    const linkText = match[1];
    const linkTarget = match[2];
    
    // Only check internal links (not URLs or anchors)
    if (!linkTarget.startsWith('http') && !linkTarget.startsWith('#')) {
      const targetPath = path.resolve(path.dirname(filePath), linkTarget);
      
      if (!fs.existsSync(targetPath)) {
        errors.push(`Broken link: "${linkText}" points to nonexistent file "${linkTarget}"`);
      }
    }
  }
  
  return errors;
};

// Main validation function
const validateFiles = () => {
  console.log(chalk.blue('Starting markdown validation...'));
  
  const markdownFiles = getMarkdownFiles();
  console.log(chalk.gray(`Found ${markdownFiles.length} markdown files`));
  
  let hasErrors = false;
  
  markdownFiles.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      const headingErrors = validateHeadings(content, filePath);
      const codeBlockErrors = validateCodeBlocks(content, filePath);
      const linkErrors = validateInternalLinks(content, filePath, markdownFiles);
      
      const allErrors = [...headingErrors, ...codeBlockErrors, ...linkErrors];
      
      if (allErrors.length > 0) {
        console.log(chalk.red(`\nErrors in ${filePath}:`));
        allErrors.forEach(error => {
          console.log(chalk.yellow(`  - ${error}`));
        });
        hasErrors = true;
      } else {
        console.log(chalk.green(`✓ ${filePath}`));
      }
    } catch (err) {
      console.error(chalk.red(`Error processing ${filePath}:`), err);
      hasErrors = true;
    }
  });
  
  if (hasErrors) {
    console.log(chalk.red('\nValidation failed! Please fix the issues above.'));
    process.exit(1);
  } else {
    console.log(chalk.green('\nAll markdown files passed validation!'));
  }
};

validateFiles();