/**
 * add command - Add individual agent, prompt, or scenario
 * TODO: Implement full add logic
 */

const chalk = require('chalk');

async function add(name) {
  console.log(chalk.blue(`\n➕ Adding: ${name}\n`));
  console.log(chalk.yellow('🚧 add command - Coming soon!\n'));
  console.log('This command will:');
  console.log(`  1. Search for "${name}" in the registry`);
  console.log('  2. Show description and confirm installation');
  console.log('  3. Fetch from GitHub');
  console.log('  4. Copy to the correct directory');
  console.log('  5. Update .prompt-library.json\n');
}

module.exports = add;
