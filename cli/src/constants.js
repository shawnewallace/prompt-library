/**
 * Constants and configuration for prompt-library CLI
 */

const GITHUB_REPO = 'shawnewallace/prompt-library';
const GITHUB_BRANCH = 'main';
const GITHUB_RAW_BASE_URL = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}`;

const TOOL_TYPES = {
  CLAUDE_CODE: 'claude-code',
  GITHUB_COPILOT: 'github-copilot',
};

const PATH_MAPPINGS = {
  [TOOL_TYPES.CLAUDE_CODE]: {
    agents: '.claude/agents',
    prompts: '.claude/prompts',
  },
  [TOOL_TYPES.GITHUB_COPILOT]: {
    agents: '.github/chatmodes',
    prompts: '.github/prompts',
    instructions: '.github/instructions',
    main: '.github/copilot-instructions.md',
  },
};

const TRACKING_FILE = '.prompt-library.json';

const LOGO = `
  ____                       _
 |  _ \\ _ __ ___  _ __ ___ | |_
 | |_) | '__/ _ \\| '_ \` _ \\| __|
 |  __/| | | (_) | | | | | | |_
 |_|   |_|  \\___/|_| |_| |_|\\__|
    Library CLI
`;

module.exports = {
  GITHUB_REPO,
  GITHUB_BRANCH,
  GITHUB_RAW_BASE_URL,
  TOOL_TYPES,
  PATH_MAPPINGS,
  TRACKING_FILE,
  LOGO,
};
