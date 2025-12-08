/**
 * list command - Display available agents, prompts, and scenarios
 * TODO: Implement full list logic
 */

const chalk = require('chalk');

async function list(options) {
  console.log(chalk.blue('\n📋 Available Items\n'));
  console.log(chalk.yellow('🚧 list command - Coming soon!\n'));
  console.log('This command will:');
  console.log('  • Show all available agents');
  console.log('  • Show all available prompts');
  console.log('  • Show all available scenarios');
  console.log('  • Indicate which items are installed');
  console.log('  • Support filtering with --agents, --prompts, --scenarios\n');

  if (options.agents) {
    console.log(chalk.dim('Filtering: agents only'));
  }
  if (options.prompts) {
    console.log(chalk.dim('Filtering: prompts only'));
  }
  if (options.scenarios) {
    console.log(chalk.dim('Filtering: scenarios only'));
  }
  if (options.installed) {
    console.log(chalk.dim('Filtering: installed items only'));
  }
}

module.exports = list;
