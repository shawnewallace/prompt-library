/**
 * Logger utility - Colored console output with formatting
 */

const chalk = require('chalk');
const ora = require('ora');

/**
 * Log an info message
 * @param {string} message - Message to log
 */
function info(message) {
  console.log(chalk.blue('ℹ'), message);
}

/**
 * Log a success message
 * @param {string} message - Message to log
 */
function success(message) {
  console.log(chalk.green('✓'), message);
}

/**
 * Log an error message
 * @param {string} message - Message to log
 */
function error(message) {
  console.log(chalk.red('✗'), message);
}

/**
 * Log a warning message
 * @param {string} message - Message to log
 */
function warning(message) {
  console.log(chalk.yellow('⚠'), message);
}

/**
 * Log a plain message (no color)
 * @param {string} message - Message to log
 */
function log(message) {
  console.log(message);
}

/**
 * Log a dimmed/secondary message
 * @param {string} message - Message to log
 */
function dim(message) {
  console.log(chalk.dim(message));
}

/**
 * Log a header/title
 * @param {string} message - Message to log
 */
function header(message) {
  console.log(chalk.bold.blue(`\n${message}`));
}

/**
 * Log a section divider
 */
function divider() {
  console.log(chalk.dim('─'.repeat(60)));
}

/**
 * Create a spinner with ora
 * @param {string} text - Spinner text
 * @returns {object} Ora spinner instance
 */
function spinner(text) {
  return ora(text);
}

/**
 * Log a list item
 * @param {string} message - Message to log
 * @param {string} bullet - Bullet character (default: '•')
 */
function listItem(message, bullet = '•') {
  console.log(`  ${chalk.dim(bullet)} ${message}`);
}

/**
 * Log an empty line
 */
function newline() {
  console.log();
}

/**
 * Format a file path
 * @param {string} filePath - File path to format
 * @returns {string} Formatted path
 */
function formatPath(filePath) {
  return chalk.cyan(filePath);
}

/**
 * Format a command
 * @param {string} command - Command to format
 * @returns {string} Formatted command
 */
function formatCommand(command) {
  return chalk.yellow(command);
}

/**
 * Format an item name (agent, prompt, etc.)
 * @param {string} name - Name to format
 * @returns {string} Formatted name
 */
function formatName(name) {
  return chalk.bold(name);
}

/**
 * Log installation summary
 * @param {number} successCount - Number of successful installations
 * @param {number} totalCount - Total number of items attempted
 */
function installSummary(successCount, totalCount) {
  newline();
  if (successCount === totalCount) {
    success(`Successfully installed ${successCount} of ${totalCount} items`);
  } else {
    warning(`Installed ${successCount} of ${totalCount} items (${totalCount - successCount} failed)`);
  }
}

/**
 * Log next steps after installation
 * @param {string[]} steps - Array of next steps
 */
function nextSteps(steps) {
  newline();
  header('Next Steps:');
  steps.forEach((step, index) => {
    console.log(`  ${chalk.bold(`${index + 1}.`)} ${step}`);
  });
  newline();
}

/**
 * Log a box with a message
 * @param {string} message - Message to display
 * @param {string} title - Optional title
 */
function box(message, title = null) {
  const lines = message.split('\n');
  const maxLength = Math.max(...lines.map((l) => l.length), title ? title.length : 0);
  const width = Math.min(maxLength + 4, 80);

  console.log();
  console.log(chalk.blue('┌' + '─'.repeat(width - 2) + '┐'));

  if (title) {
    const titlePadding = Math.floor((width - title.length - 4) / 2);
    console.log(
      chalk.blue('│') +
        ' '.repeat(titlePadding) +
        chalk.bold(title) +
        ' '.repeat(width - titlePadding - title.length - 2) +
        chalk.blue('│')
    );
    console.log(chalk.blue('├' + '─'.repeat(width - 2) + '┤'));
  }

  lines.forEach((line) => {
    const padding = width - line.length - 4;
    console.log(chalk.blue('│') + '  ' + line + ' '.repeat(padding) + chalk.blue('│'));
  });

  console.log(chalk.blue('└' + '─'.repeat(width - 2) + '┘'));
  console.log();
}

module.exports = {
  info,
  success,
  error,
  warning,
  log,
  dim,
  header,
  divider,
  spinner,
  listItem,
  newline,
  formatPath,
  formatCommand,
  formatName,
  installSummary,
  nextSteps,
  box,
};
