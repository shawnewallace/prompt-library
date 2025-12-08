/**
 * init command - Interactive initialization wizard
 */

const inquirer = require('inquirer');
const { LOGO, TOOL_TYPES } = require('../constants.js');
const registry = require('../core/registry.js');
const { installItems, updateTrackingFile } = require('../core/installer.js');
const logger = require('../utils/logger.js');

/**
 * Main init command
 */
async function init() {
  // Welcome screen
  console.log(logger.formatCommand(LOGO));
  logger.header('Welcome to prompt-library!');
  logger.log('Let\'s set up AI agents and prompts for your project.\n');

  try {
    // Step 1: Select AI tool
    const { tool } = await inquirer.prompt([
      {
        type: 'list',
        name: 'tool',
        message: 'Which AI tool are you using?',
        choices: [
          { name: 'Claude Code', value: TOOL_TYPES.CLAUDE_CODE },
          { name: 'GitHub Copilot', value: TOOL_TYPES.GITHUB_COPILOT },
          { name: 'Both', value: 'both' },
        ],
      },
    ]);

    // Step 2: Select scenario (optional)
    const scenarios = registry.getScenarios();
    const scenarioChoices = [
      { name: 'None - I\'ll select individual items', value: null },
      new inquirer.Separator(),
      ...scenarios.map((s) => ({
        name: `${s.name} - ${s.description}`,
        value: s.id,
      })),
    ];

    const { scenarioId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'scenarioId',
        message: 'Start with a scenario template?',
        choices: scenarioChoices,
      },
    ]);

    let selectedItems = [];

    if (scenarioId) {
      // Install scenario bundle
      const scenario = registry.findById(scenarioId);
      logger.info(`Installing ${scenario.name} scenario...\n`);

      // Get all items included in the scenario
      if (scenario.includes.agents) {
        selectedItems.push(
          ...scenario.includes.agents.map((id) => registry.findById(id)).filter(Boolean)
        );
      }
      if (scenario.includes.prompts) {
        selectedItems.push(
          ...scenario.includes.prompts.map((id) => registry.findById(id)).filter(Boolean)
        );
      }
    } else {
      // Step 3: Select agents
      const agents = registry.getAgents();
      const { selectedAgents } = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'selectedAgents',
          message: 'Select agents to install:',
          choices: agents.map((agent) => ({
            name: `${agent.name} - ${agent.description}`,
            value: agent.id,
            checked: false,
          })),
        },
      ]);

      // Step 4: Select prompts
      const prompts = registry.getPrompts();
      const { selectedPrompts } = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'selectedPrompts',
          message: 'Select prompts to install:',
          choices: prompts.map((prompt) => ({
            name: `${prompt.name} - ${prompt.description}`,
            value: prompt.id,
            checked: false,
          })),
        },
      ]);

      // Combine selections
      selectedItems = [
        ...selectedAgents.map((id) => ({ ...registry.findById(id), type: 'agent' })),
        ...selectedPrompts.map((id) => ({ ...registry.findById(id), type: 'prompt' })),
      ];
    }

    if (selectedItems.length === 0) {
      logger.warning('No items selected. Exiting.');
      return;
    }

    // Confirm installation
    logger.newline();
    logger.header('Selected Items:');
    selectedItems.forEach((item) => {
      logger.listItem(`${item.name} (${item.type})`);
    });
    logger.newline();

    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Install these items?',
        default: true,
      },
    ]);

    if (!confirm) {
      logger.info('Installation cancelled.');
      return;
    }

    // Install items with progress
    logger.newline();
    const spinner = logger.spinner('Installing items...');
    spinner.start();

    const results = await installItems(selectedItems, tool);

    spinner.stop();

    // Update tracking file
    if (results.successful.length > 0) {
      await updateTrackingFile(tool, results.successful);
    }

    // Show results
    logger.newline();
    if (results.failed.length > 0) {
      logger.header('Installation Results:');
      logger.newline();

      results.successful.forEach((result) => {
        logger.success(`${result.item.name} → ${logger.formatPath(result.targetPath)}`);
      });

      results.failed.forEach((result) => {
        logger.error(`${result.item.name} - ${result.error}`);
      });

      logger.newline();
      logger.installSummary(results.successful.length, selectedItems.length);
    } else {
      logger.success('All items installed successfully!\n');

      results.successful.forEach((result) => {
        logger.listItem(`${result.item.name} → ${logger.formatPath(result.targetPath)}`);
      });

      logger.installSummary(results.successful.length, selectedItems.length);
    }

    // Next steps
    const nextStepsText = [];

    if (tool === TOOL_TYPES.CLAUDE_CODE || tool === 'both') {
      nextStepsText.push('Restart Claude Code to load new agents');
      nextStepsText.push('Try: "Use Hemingway to review this text"');
    }

    if (tool === TOOL_TYPES.GITHUB_COPILOT || tool === 'both') {
      nextStepsText.push('Restart VS Code to load new agents');
      nextStepsText.push('Open GitHub Copilot chat and try your new agents');
    }

    nextStepsText.push(`Run ${logger.formatCommand('prompt-library list')} to see all available items`);
    nextStepsText.push(`Run ${logger.formatCommand('prompt-library add <name>')} to add more items later`);

    logger.nextSteps(nextStepsText);
  } catch (error) {
    if (error.isTtyError) {
      logger.error('Prompt couldn\'t be rendered in the current environment');
    } else {
      throw error;
    }
  }
}

module.exports = init;
