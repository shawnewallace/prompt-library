/**
 * Main CLI setup with Commander.js
 */

const { Command } = require('commander');
const chalk = require('chalk');
const packageJson = require('../package.json');

// Command imports (will be implemented in later tasks)
const initCommand = require('./commands/init.js');
const listCommand = require('./commands/list.js');
const addCommand = require('./commands/add.js');
// Future commands
// const checkCommand = require('./commands/check.js');
// const updateCommand = require('./commands/update.js');

const program = new Command();

/**
 * Main CLI entry point
 */
function run() {
  program
    .name('prompt-library')
    .description('CLI tool to install AI assistant agents and prompts from prompt-library')
    .version(packageJson.version);

  // init command - Interactive initialization wizard
  program
    .command('init')
    .description('Initialize prompt-library in your project')
    .option('--dry-run', 'Preview what would be installed without actually installing')
    .action(async (options) => {
      try {
        await initCommand(options);
      } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
      }
    });

  // list command - Display available items
  program
    .command('list')
    .description('List available agents, prompts, and scenarios')
    .option('--agents', 'Show only agents')
    .option('--prompts', 'Show only prompts')
    .option('--scenarios', 'Show only scenarios')
    .option('--installed', 'Show only installed items')
    .action(async (options) => {
      try {
        await listCommand(options);
      } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
      }
    });

  // add command - Add individual agent or prompt
  program
    .command('add <name>')
    .description('Add a specific agent, prompt, or scenario')
    .option('--dry-run', 'Preview what would be installed without actually installing')
    .action(async (name, options) => {
      try {
        await addCommand(name, options);
      } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
      }
    });

  // Future commands (commented out for now)
  /*
  // check command - Check for updates
  program
    .command('check')
    .description('Check for updates to installed items')
    .action(async () => {
      try {
        await checkCommand();
      } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
      }
    });

  // update command - Update installed items
  program
    .command('update [name]')
    .description('Update a specific item or all items')
    .option('--all', 'Update all items')
    .option('--show-diff', 'Show diff before updating')
    .option('--force', 'Force update without confirmation')
    .action(async (name, options) => {
      try {
        await updateCommand(name, options);
      } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
      }
    });
  */

  // Parse arguments
  program.parse(process.argv);

  // Show help if no command provided
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

module.exports = { run };
