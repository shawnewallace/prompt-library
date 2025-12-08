/**
 * list command - Display available agents, prompts, and scenarios
 */

const chalk = require('chalk');
const registry = require('../core/registry.js');
const { getInstallationSummary } = require('../core/installer.js');
const logger = require('../utils/logger.js');

/**
 * Check if an item is installed
 * @param {string} itemId - Item ID
 * @param {object} installSummary - Installation summary data
 * @returns {boolean}
 */
function isItemInstalled(itemId, installSummary) {
  if (!installSummary) return false;
  return !!(
    installSummary.items.agents[itemId] ||
    installSummary.items.prompts[itemId]
  );
}

/**
 * Display a list of items with installation status
 * @param {Array} items - Array of items
 * @param {object} installSummary - Installation summary data
 * @param {string} title - Section title
 */
function displayItems(items, installSummary, title) {
  if (items.length === 0) return;

  logger.header(title);

  items.forEach((item) => {
    const installed = isItemInstalled(item.id, installSummary);
    const status = installed ? chalk.green('✓') : ' ';
    const idPadded = item.id.padEnd(20);

    if (installed) {
      console.log(`  ${status} ${chalk.bold(idPadded)} ${chalk.dim(item.description)}`);
    } else {
      console.log(`  ${status} ${idPadded} ${chalk.dim(item.description)}`);
    }
  });

  logger.newline();
}

/**
 * Display scenarios
 * @param {Array} scenarios - Array of scenarios
 */
function displayScenarios(scenarios) {
  if (scenarios.length === 0) return;

  logger.header('Available Scenarios');

  scenarios.forEach((scenario) => {
    const idPadded = scenario.id.padEnd(30);
    console.log(`    ${chalk.bold(idPadded)} ${chalk.dim(scenario.description)}`);

    // Show what's included
    const included = [];
    if (scenario.includes.agents && scenario.includes.agents.length > 0) {
      included.push(`${scenario.includes.agents.length} agents`);
    }
    if (scenario.includes.prompts && scenario.includes.prompts.length > 0) {
      included.push(`${scenario.includes.prompts.length} prompts`);
    }
    if (included.length > 0) {
      console.log(`    ${' '.repeat(30)} ${chalk.dim(`Includes: ${included.join(', ')}`)}`);
    }
  });

  logger.newline();
}

/**
 * Main list command
 * @param {object} options - Command options
 */
async function list(options) {
  logger.newline();

  const installSummary = await getInstallationSummary();

  // Show installation info if items are installed
  if (installSummary) {
    const totalInstalled =
      Object.keys(installSummary.items.agents).length +
      Object.keys(installSummary.items.prompts).length;

    logger.info(`${totalInstalled} items installed for ${chalk.bold(installSummary.tool)}`);
    logger.dim(`Last updated: ${new Date(installSummary.installedAt).toLocaleString()}`);
    logger.newline();
  }

  // Get all items
  const agents = registry.getAgents();
  const prompts = registry.getPrompts();
  const scenarios = registry.getScenarios();

  // Filter based on options
  if (options.installed) {
    // Show only installed items
    const installedAgents = agents.filter((a) => isItemInstalled(a.id, installSummary));
    const installedPrompts = prompts.filter((p) => isItemInstalled(p.id, installSummary));

    if (installedAgents.length === 0 && installedPrompts.length === 0) {
      logger.warning('No items installed yet.');
      logger.info(`Run ${logger.formatCommand('prompt-library init')} to get started.`);
      logger.newline();
      return;
    }

    displayItems(installedAgents, installSummary, 'Installed Agents');
    displayItems(installedPrompts, installSummary, 'Installed Prompts');
  } else if (options.agents) {
    // Show only agents
    displayItems(agents, installSummary, 'Available Agents');
  } else if (options.prompts) {
    // Show only prompts
    displayItems(prompts, installSummary, 'Available Prompts');
  } else if (options.scenarios) {
    // Show only scenarios
    displayScenarios(scenarios);
  } else {
    // Show everything
    displayItems(agents, installSummary, 'Available Agents');
    displayItems(prompts, installSummary, 'Available Prompts');
    displayScenarios(scenarios);
  }

  // Footer
  if (!options.installed) {
    logger.divider();
    logger.dim(`✓ = installed    Total: ${agents.length} agents, ${prompts.length} prompts, ${scenarios.length} scenarios`);
    logger.newline();
    logger.info(`Run ${logger.formatCommand('prompt-library add <name>')} to install an item`);
    logger.info(`Run ${logger.formatCommand('prompt-library init')} to start fresh installation`);
    logger.newline();
  }
}

module.exports = list;
