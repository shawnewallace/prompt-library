/**
 * add command - Add individual agent, prompt, or scenario
 */

const inquirer = require('inquirer').default || require('inquirer');
const registry = require('../core/registry.js');
const { installItem, installItems, updateTrackingFile, getInstallationSummary, isInstalled } = require('../core/installer.js');
const logger = require('../utils/logger.js');

/**
 * Main add command
 * @param {string} name - Name or ID to search for
 * @param {object} options - Command options
 * @param {boolean} options.dryRun - Preview mode without installing
 */
async function add(name, options = {}) {
  const { dryRun = false } = options;

  logger.newline();

  if (dryRun) {
    logger.warning('DRY RUN MODE - No files will be written\n');
  }

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
    const spinnerText = dryRun ? 'Previewing scenario items...' : 'Installing scenario items...';
    const spinner = logger.spinner(spinnerText);
    spinner.start();

    const results = await installItems(itemsToInstall, tool, { dryRun });

    spinner.stop();

    // Update tracking (skip if dry run)
    if (results.successful.length > 0 && !dryRun) {
      await updateTrackingFile(tool, results.successful);
    }

    // Show results
    logger.newline();
    if (dryRun) {
      logger.header('Dry Run Results:');
      logger.warning('The following items WOULD BE installed:\n');
    } else {
      logger.header('Installation Results:');
      logger.newline();
    }

    results.successful.forEach((result) => {
      const prefix = dryRun ? 'Would install:' : '';
      logger.success(`${prefix}${prefix ? ' ' : ''}${result.item.name} → ${logger.formatPath(result.targetPath)}`);
    });

    if (results.failed.length > 0) {
      results.failed.forEach((result) => {
        logger.error(`${result.item.name} - ${result.error}`);
      });
    }

    logger.newline();
    logger.installSummary(results.successful.length, itemsToInstall.length);

    if (dryRun) {
      logger.newline();
      logger.info('This was a dry run. To actually install, run:');
      logger.dim(`  ${logger.formatCommand(`prompt-library add ${name}`)}`);
    }

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
    const spinnerText = dryRun ? `Previewing ${item.name}...` : `Installing ${item.name}...`;
    const spinner = logger.spinner(spinnerText);
    spinner.start();

    const result = await installItem(item, tool, { dryRun });

    spinner.stop();

    logger.newline();

    if (result.success) {
      // Update tracking (skip if dry run)
      if (!dryRun) {
        await updateTrackingFile(tool, [result]);
      }

      const successMsg = dryRun
        ? `${item.name} would be installed successfully!`
        : `${item.name} installed successfully!`;
      logger.success(successMsg);

      const locationPrefix = dryRun ? 'Would be at:' : 'Location:';
      logger.dim(`${locationPrefix} ${result.targetPath}`);
      logger.newline();

      // Next steps
      if (dryRun) {
        logger.info('This was a dry run. To actually install, run:');
        logger.dim(`  ${logger.formatCommand(`prompt-library add ${name}`)}`);
      } else {
        if (tool === 'claude-code') {
          logger.info('Restart Claude Code to load the new agent/prompt');
        } else {
          logger.info('Restart VS Code to load the new agent/prompt');
        }
      }
      logger.newline();
    } else {
      logger.error(`Failed to ${dryRun ? 'preview' : 'install'} ${item.name}`);
      logger.error(result.error);
      logger.newline();
    }
  }
}

module.exports = add;
