#!/usr/bin/env node
/**
 * Dev Server for Tmux Tutorial Series
 * 
 * This script starts a development server that serves the tutorial content
 * with live reloading.
 */

const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const markdownIt = require('markdown-it');
const { execSync } = require('child_process');

const app = express();
const port = process.env.PORT || 3000;
const md = new markdownIt({
  html: true,
  linkify: true,
  typographer: true
});

// Setup directories
const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const staticDir = path.join(publicDir, 'static');

// Ensure public directory exists
fs.ensureDirSync(publicDir);
fs.ensureDirSync(staticDir);

// Create CSS file for styling
const cssContent = `
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1, h2, h3, h4 {
  color: #2c3e50;
}

pre {
  background-color: #f6f8fa;
  border-radius: 3px;
  padding: 16px;
  overflow: auto;
}

code {
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
  background-color: #f6f8fa;
  padding: 0.2em 0.4em;
  border-radius: 3px;
}

pre code {
  background-color: transparent;
  padding: 0;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

blockquote {
  border-left: 4px solid #ddd;
  padding-left: 16px;
  margin-left: 0;
  color: #666;
}

.nav {
  background-color: #f8f9fa;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

.nav li {
  margin-right: 20px;
}

.nav a {
  text-decoration: none;
  color: #0366d6;
}

.nav a:hover {
  text-decoration: underline;
}

.tutorial-nav {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.tutorial-nav a {
  text-decoration: none;
  color: #0366d6;
  padding: 8px 16px;
  background-color: #f1f8ff;
  border-radius: 5px;
}

.tutorial-nav a:hover {
  background-color: #dbeeff;
}

.tutorial-nav .prev:before {
  content: "← ";
}

.tutorial-nav .next:after {
  content: " →";
}
`;
fs.writeFileSync(path.join(staticDir, 'style.css'), cssContent);

// Create a header navigation partial
function generateHeader(activeSection) {
  const sections = [
    { id: 'tutorials', title: 'Tutorials' },
    { id: 'episodes', title: 'Episodes' },
    { id: 'examples', title: 'Examples' },
    { id: 'exercises', title: 'Exercises' },
    { id: 'cheatsheets', title: 'Cheatsheets' }
  ];
  
  let nav = '<div class="nav"><ul>';
  
  sections.forEach(section => {
    const isActive = section.id === activeSection;
    nav += `<li><a href="/${section.id}"${isActive ? ' style="font-weight: bold;"' : ''}>${section.title}</a></li>`;
  });
  
  nav += '</ul></div>';
  return nav;
}

// Render markdown content as HTML
function renderMarkdown(content, title, activeSection) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title} - Tmux Tutorial Series</title>
      <link rel="stylesheet" href="/static/style.css">
      <script>
        // Simple live reload
        const eventSource = new EventSource('/sse');
        eventSource.onmessage = function(event) {
          if (event.data === 'reload') {
            window.location.reload();
          }
        };
      </script>
    </head>
    <body>
      ${generateHeader(activeSection)}
      ${md.render(content)}
    </body>
    </html>
  `;
}

// Create a directory listing
function generateDirectoryListing(dirPath, relativePath, sectionTitle) {
  try {
    const files = fs.readdirSync(dirPath)
      .filter(file => file.endsWith('.md'))
      .sort();
    
    let content = `# ${sectionTitle}\n\n`;
    
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isFile()) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const titleMatch = fileContent.match(/^#\s+(.*)/);
        const title = titleMatch ? titleMatch[1] : file.replace('.md', '');
        
        content += `- [${title}](/${relativePath}/${file})\n`;
      }
    });
    
    return content;
  } catch (error) {
    return `# ${sectionTitle}\n\nNo content available.`;
  }
}

// Setup routes for content sections
const contentSections = [
  { path: 'tutorials', title: 'Tutorials' },
  { path: 'episodes', title: 'Episodes' },
  { path: 'examples', title: 'Examples' },
  { path: 'exercises', title: 'Exercises' },
  { path: 'cheatsheets', title: 'Cheatsheets' }
];

contentSections.forEach(section => {
  app.get(`/${section.path}`, (req, res) => {
    const dirPath = path.join(rootDir, section.path);
    const content = generateDirectoryListing(dirPath, section.path, section.title);
    res.send(renderMarkdown(content, section.title, section.path));
  });
  
  app.get(`/${section.path}/:file`, (req, res) => {
    const filePath = path.join(rootDir, section.path, req.params.file);
    
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const titleMatch = content.match(/^#\s+(.*)/);
        const title = titleMatch ? titleMatch[1] : req.params.file.replace('.md', '');
        res.send(renderMarkdown(content, title, section.path));
      } else {
        res.status(404).send(renderMarkdown('# 404: File Not Found', '404 Not Found', section.path));
      }
    } catch (error) {
      res.status(500).send(renderMarkdown(`# Error\n\n${error.message}`, 'Error', section.path));
    }
  });
});

// Serve static files
app.use('/static', express.static(staticDir));

// Server-sent events for live reload
const clients = [];
app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  clients.push(res);
  
  req.on('close', () => {
    const index = clients.indexOf(res);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

// Watch for file changes and notify clients
function watchFiles() {
  const dirsToWatch = [
    'tutorials',
    'episodes',
    'examples',
    'exercises',
    'cheatsheets',
    'assets'
  ];
  
  dirsToWatch.forEach(dir => {
    const dirPath = path.join(rootDir, dir);
    if (fs.existsSync(dirPath)) {
      fs.watch(dirPath, { recursive: true }, (eventType, filename) => {
        if (filename && filename.endsWith('.md')) {
          console.log(chalk.yellow(`File changed: ${path.join(dir, filename)}`));
          notifyClients();
        }
      });
    }
  });
}

// Notify all clients to reload
function notifyClients() {
  clients.forEach(client => {
    client.write('data: reload\n\n');
  });
}

// Home page route
app.get('/', (req, res) => {
  try {
    const readmePath = path.join(rootDir, 'README.md');
    let content = '';
    
    if (fs.existsSync(readmePath)) {
      content = fs.readFileSync(readmePath, 'utf8');
    } else {
      content = `# Tmux Tutorial Series\n\nWelcome to the Tmux Tutorial Series! Choose a section from the navigation above.`;
    }
    
    res.send(renderMarkdown(content, 'Home', 'home'));
  } catch (error) {
    res.status(500).send(renderMarkdown(`# Error\n\n${error.message}`, 'Error', 'home'));
  }
});

// Start the server
app.listen(port, () => {
  console.log(chalk.blue(`=== Tmux Tutorial Series - Dev Server ===`));
  console.log(chalk.green(`Server running at http://localhost:${port}`));
  console.log(chalk.gray(`Press Ctrl+C to stop the server`));
  
  // Start watching files for changes
  watchFiles();
});