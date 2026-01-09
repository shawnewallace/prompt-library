/**
 * Installer utility - Install agents, prompts, and scenarios
 */

const path = require('path');
const { fetchFile } = require('./fetcher.js');
const { writeFile, writeJson, readJson, fileExists, computeHash } = require('./file-system.js');
const { PATH_MAPPINGS, TRACKING_FILE } = require('../constants.js');

/**
 * Get target path for an item based on tool and type
 * @param {string} tool - Tool type (claude-code or github-copilot)
 * @param {string} itemType - Item type (agent or prompt)
 * @param {string} filename - Target filename
 * @returns {string} Full target path
 */
function getTargetPath(tool, itemType, filename) {
  const mapping = PATH_MAPPINGS[tool];

  if (itemType === 'agent') {
    return path.join(process.cwd(), mapping.agents, filename);
  } else if (itemType === 'prompt') {
    return path.join(process.cwd(), mapping.prompts, filename);
  }

  throw new Error(`Unknown item type: ${itemType}`);
}

/**
 * Transform filename from source to target format
 * @param {object} item - Item from registry
 * @returns {string} Target filename
 */
function getTargetFilename(item) {
  // Use item ID as filename for consistency
  return `${item.id}.md`;
}

/**
 * Install a single item (agent or prompt)
 * @param {object} item - Item from registry
 * @param {string} tool - Tool type
 * @param {object} options - Installation options
 * @param {boolean} options.dryRun - If true, don't actually write files
 * @returns {Promise<object>} Installation result
 */
async function installItem(item, tool, options = {}) {
  const { dryRun = false } = options;

  try {
    // Fetch content from GitHub
    const content = await fetchFile(item.sourcePath);

    // Determine target path
    const filename = getTargetFilename(item);
    const targetPath = getTargetPath(tool, item.type, filename);

    // Write file (skip if dry run)
    if (!dryRun) {
      await writeFile(targetPath, content);
    }

    // Compute hash for tracking
    const sha = computeHash(content);

    return {
      success: true,
      item,
      targetPath,
      sha,
      dryRun,
    };
  } catch (error) {
    return {
      success: false,
      item,
      error: error.message,
      dryRun,
    };
  }
}

/**
 * Install multiple items
 * @param {Array<object>} items - Array of items from registry
 * @param {string} tool - Tool type
 * @param {object} options - Installation options
 * @param {boolean} options.dryRun - If true, don't actually write files
 * @returns {Promise<object>} Installation results
 */
async function installItems(items, tool, options = {}) {
  const results = {
    successful: [],
    failed: [],
  };

  for (const item of items) {
    const result = await installItem(item, tool, options);

    if (result.success) {
      results.successful.push(result);
    } else {
      results.failed.push(result);
    }
  }

  return results;
}

/**
 * Create or update tracking file
 * @param {string} tool - Tool type
 * @param {Array<object>} installResults - Array of successful install results
 * @returns {Promise<void>}
 */
async function updateTrackingFile(tool, installResults) {
  const trackingPath = path.join(process.cwd(), TRACKING_FILE);

  // Load existing tracking data or create new
  let trackingData = {
    version: '1.0.0',
    tool,
    installedAt: new Date().toISOString(),
    items: {
      agents: {},
      prompts: {},
    },
  };

  if (await fileExists(trackingPath)) {
    trackingData = await readJson(trackingPath);
  }

  // Add installed items to tracking
  for (const result of installResults) {
    const { item, targetPath, sha } = result;
    const itemType = item.type === 'agent' ? 'agents' : 'prompts';

    trackingData.items[itemType][item.id] = {
      name: item.name,
      version: '1.0.0',
      installedAt: new Date().toISOString(),
      sourcePath: item.sourcePath,
      targetPath,
      sha,
    };
  }

  // Write tracking file
  await writeJson(trackingPath, trackingData);
}

/**
 * Get installation summary
 * @returns {Promise<object|null>} Tracking data or null if not installed
 */
async function getInstallationSummary() {
  const trackingPath = path.join(process.cwd(), TRACKING_FILE);

  if (!(await fileExists(trackingPath))) {
    return null;
  }

  return readJson(trackingPath);
}

/**
 * Check if an item is already installed
 * @param {string} itemId - Item ID
 * @returns {Promise<boolean>}
 */
async function isInstalled(itemId) {
  const summary = await getInstallationSummary();

  if (!summary) {
    return false;
  }

  return !!(
    summary.items.agents[itemId] ||
    summary.items.prompts[itemId]
  );
}

module.exports = {
  installItem,
  installItems,
  updateTrackingFile,
  getInstallationSummary,
  isInstalled,
  getTargetPath,
  getTargetFilename,
};
