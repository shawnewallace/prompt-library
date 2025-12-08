/**
 * add command - Add individual agent, prompt, or scenario
 */

const inquirer = require('inquirer');
const registry = require('../core/registry.js');
const { installItem, installItems, updateTrackingFile, getInstallationSummary, isInstalled } = require('../core/installer.js');
const logger = require('../utils/logger.js');

/**
 * Main add command
 * @param {string} name - Name or ID to search for
 */
async function add(name) {
  logger.newline();

  // Search for item by name (fuzzy matching)
  const item = registry.findByName(name);

  if (!item) {
    logger.error(`Item "${name}" not found.`);
    logger.info(`Run ${logger.formatCommand('prompt-library list')} to see all available items.`);
    logger.newline();
    return;
  }

  // Display item info
  logger.header(`Found: ${item.name}`);
  logger.log(`Type: ${item.type}`);
  logger.log(`Description: ${item.description}`);
  logger.newline();

  // Check if already installed
  const alreadyInstalled = await isInstalled(item.id);

  if (alreadyInstalled) {
    logger.warning(`${item.name} is already installed.`);

    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          { name: 'Reinstall (overwrite)', value: 'reinstall' },
          { name: 'Cancel', value: 'cancel' },
        ],
      },
    ]);

    if (action === 'cancel') {
      logger.info('Cancelled.');
      logger.newline();
      return;
    }
  }

  // Get tool type from existing installation or prompt user
  const installSummary = await getInstallationSummary();
  let tool = installSummary ? installSummary.tool : null;

  if (!tool) {
    const { selectedTool } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedTool',
        message: 'Which AI tool are you using?',
        choices: [
          { name: 'Claude Code', value: 'claude-code' },
          { name: 'GitHub Copilot', value: 'github-copilot' },
        ],
      },
    ]);
    tool = selectedTool;
  }

  // Handle scenarios (install bundle)
  if (item.type === 'scenario') {
    logger.info(`Installing ${item.name} scenario bundle...\n`);

    const itemsToInstall = [];

    // Get all items included in scenario
    if (item.includes.agents) {
      itemsToInstall.push(
        ...item.includes.agents.map((id) => registry.findById(id)).filter(Boolean)
      );
    }
    if (item.includes.prompts) {
      itemsToInstall.push(
        ...item.includes.prompts.map((id) => registry.findById(id)).filter(Boolean)
      );
    }

    if (itemsToInstall.length === 0) {
      logger.warning('No items found in scenario bundle.');
      logger.newline();
      return;
    }

    // Show what will be installed
    logger.header('Scenario includes:');
    itemsToInstall.forEach((i) => {
      logger.listItem(`${i.name} (${i.type})`);
    });
    logger.newline();

    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Install all items from this scenario?',
        default: true,
      },
    ]);

    if (!confirm) {
      logger.info('Cancelled.');
      logger.newline();
      return;
    }

    // Install all items
    const spinner = logger.spinner('Installing scenario items...');
    spinner.start();

    const results = await installItems(itemsToInstall, tool);

    spinner.stop();

    // Update tracking
    if (results.successful.length > 0) {
      await updateTrackingFile(tool, results.successful);
    }

    // Show results
    logger.newline();
    logger.header('Installation Results:');
    logger.newline();

    results.successful.forEach((result) => {
      logger.success(`${result.item.name} → ${logger.formatPath(result.targetPath)}`);
    });

    if (results.failed.length > 0) {
      results.failed.forEach((result) => {
        logger.error(`${result.item.name} - ${result.error}`);
      });
    }

    logger.newline();
    logger.installSummary(results.successful.length, itemsToInstall.length);
    logger.newline();

  } else {
    // Install single item (agent or prompt)
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Install ${item.name}?`,
        default: true,
      },
    ]);

    if (!confirm) {
      logger.info('Cancelled.');
      logger.newline();
      return;
    }

    // Install with spinner
    const spinner = logger.spinner(`Installing ${item.name}...`);
    spinner.start();

    const result = await installItem(item, tool);

    spinner.stop();

    logger.newline();

    if (result.success) {
      // Update tracking
      await updateTrackingFile(tool, [result]);

      logger.success(`${item.name} installed successfully!`);
      logger.dim(`Location: ${result.targetPath}`);
      logger.newline();

      // Next steps
      if (tool === 'claude-code') {
        logger.info('Restart Claude Code to load the new agent/prompt');
      } else {
        logger.info('Restart VS Code to load the new agent/prompt');
      }
      logger.newline();
    } else {
      logger.error(`Failed to install ${item.name}`);
      logger.error(result.error);
      logger.newline();
    }
  }
}

module.exports = add;
