/**
 * Tmux Config Generator
 * 
 * This script generates customized tmux configuration files based on user preferences.
 * It can be used to create different configuration setups for the tutorial series.
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

// Base configuration options
const baseConfig = {
  prefix: 'C-b', // Default prefix key
  mouse: true,
  status: true,
  vi_mode: false,
  colors: 'default', // default, dark, light
  plugins: [],
};

// Available plugins
const availablePlugins = {
  'tmux-plugins/tpm': 'Plugin manager',
  'tmux-plugins/tmux-sensible': 'Sensible defaults',
  'tmux-plugins/tmux-resurrect': 'Session saving & restoration',
  'tmux-plugins/tmux-continuum': 'Continuous session saving',
  'tmux-plugins/tmux-yank': 'Copy to system clipboard',
  'tmux-plugins/tmux-pain-control': 'Pane management',
  'christoomey/vim-tmux-navigator': 'Vim integration',
};

// Color schemes
const colorSchemes = {
  default: {
    status_bg: 'black',
    status_fg: 'white',
    active_bg: 'blue',
    active_fg: 'white',
  },
  dark: {
    status_bg: '#303030',
    status_fg: '#c0c0c0',
    active_bg: '#505050',
    active_fg: '#ffffff',
  },
  light: {
    status_bg: '#d0d0d0',
    status_fg: '#303030',
    active_bg: '#a0a0a0',
    active_fg: '#000000',
  },
};

// Generate config file content
function generateConfig(options) {
  const config = { ...baseConfig, ...options };
  const colors = colorSchemes[config.colors];
  
  let content = `# Tmux configuration generated for tutorial series
# Generated on: ${new Date().toISOString()}

# Set prefix key
unbind C-b
set-option -g prefix ${config.prefix}
bind-key ${config.prefix} send-prefix

# Basic settings
set -g default-terminal "screen-256color"
set -g history-limit 10000
set -g base-index 1
setw -g pane-base-index 1
set -sg escape-time 0

# Mouse support
set -g mouse ${config.mouse ? 'on' : 'off'}

# Status bar
set -g status ${config.status ? 'on' : 'off'}
`;

  // Add color settings if status bar is enabled
  if (config.status) {
    content += `
# Status bar appearance
set -g status-style bg=${colors.status_bg},fg=${colors.status_fg}
set -g window-status-current-style bg=${colors.active_bg},fg=${colors.active_fg}
set -g status-interval 60
set -g status-left-length 30
set -g status-left '#[fg=green](#S) #(whoami) '
set -g status-right '#[fg=yellow]#(cut -d " " -f 1-3 /proc/loadavg)#[default] #[fg=white]%H:%M#[default]'
`;
  }

  // Add vi mode if enabled
  if (config.vi_mode) {
    content += `
# Vi mode
setw -g mode-keys vi
bind-key -T copy-mode-vi v send-keys -X begin-selection
bind-key -T copy-mode-vi y send-keys -X copy-selection-and-cancel
`;
  }

  // Add key bindings
  content += `
# Key bindings
bind-key v split-window -h
bind-key s split-window -v
bind-key h select-pane -L
bind-key j select-pane -D
bind-key k select-pane -U
bind-key l select-pane -R
bind-key r source-file ~/.tmux.conf \\; display "Config reloaded!"
`;

  // Add plugins if any
  if (config.plugins.length > 0) {
    content += `
# Plugins
set -g @plugin 'tmux-plugins/tpm'
`;

    config.plugins.forEach(plugin => {
      content += `set -g @plugin '${plugin}'\n`;
    });

    content += `
# Initialize TMUX plugin manager (keep this line at the very bottom of tmux.conf)
run '~/.tmux/plugins/tpm/tpm'
`;
  }

  return content;
}

// Create a config file based on predefined profiles
function createConfigProfile(profile, outputPath) {
  let config = {};

  switch (profile) {
    case 'minimal':
      config = {
        mouse: false,
        status: false,
      };
      break;
    case 'basic':
      config = {
        mouse: true,
        status: true,
      };
      break;
    case 'developer':
      config = {
        prefix: 'C-a',
        mouse: true,
        status: true,
        vi_mode: true,
        colors: 'dark',
        plugins: [
          'tmux-plugins/tmux-sensible',
          'tmux-plugins/tmux-pain-control',
          'tmux-plugins/tmux-yank',
        ],
      };
      break;
    case 'power-user':
      config = {
        prefix: 'C-a',
        mouse: true,
        status: true,
        vi_mode: true,
        colors: 'dark',
        plugins: [
          'tmux-plugins/tmux-sensible',
          'tmux-plugins/tmux-resurrect',
          'tmux-plugins/tmux-continuum',
          'tmux-plugins/tmux-yank',
          'tmux-plugins/tmux-pain-control',
          'christoomey/vim-tmux-navigator',
        ],
      };
      break;
    default:
      config = baseConfig;
  }

  const content = generateConfig(config);
  fs.writeFileSync(outputPath, content);
  console.log(chalk.green(`Generated ${profile} config at ${outputPath}`));
}

// Main function to generate all profiles
function generateAllProfiles() {
  const configDir = path.join(__dirname, '..', 'configs');
  
  // Ensure the config directory exists
  fs.ensureDirSync(configDir);
  
  // Generate different profile configs
  createConfigProfile('minimal', path.join(configDir, 'minimal.tmux.conf'));
  createConfigProfile('basic', path.join(configDir, 'basic.tmux.conf'));
  createConfigProfile('developer', path.join(configDir, 'developer.tmux.conf'));
  createConfigProfile('power-user', path.join(configDir, 'power-user.tmux.conf'));
  
  console.log(chalk.blue('\nAll tmux configuration profiles have been generated!'));
  console.log(chalk.gray('Use these in the tutorial series to demonstrate different setups.'));
}

// If script is run directly, generate all profiles
if (require.main === module) {
  generateAllProfiles();
}

module.exports = {
  generateConfig,
  createConfigProfile,
  generateAllProfiles,
};