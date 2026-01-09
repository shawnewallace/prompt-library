/**
 * Registry utility - Load and query available agents, prompts, and scenarios
 */

const registryData = require('../../.prompt-library/registry.json');

/**
 * Get all available agents
 * @returns {Array} Array of agent objects
 */
function getAgents() {
  return registryData.agents;
}

/**
 * Get all available prompts
 * @returns {Array} Array of prompt objects
 */
function getPrompts() {
  return registryData.prompts;
}

/**
 * Get all available scenarios
 * @returns {Array} Array of scenario objects
 */
function getScenarios() {
  return registryData.scenarios;
}

/**
 * Get all items (agents, prompts, scenarios combined)
 * @returns {Array} Array of all items with type field
 */
function getAllItems() {
  return [
    ...registryData.agents.map((item) => ({ ...item, type: 'agent' })),
    ...registryData.prompts.map((item) => ({ ...item, type: 'prompt' })),
    ...registryData.scenarios.map((item) => ({ ...item, type: 'scenario' })),
  ];
}

/**
 * Find an item by ID (searches agents, prompts, and scenarios)
 * @param {string} id - Item ID
 * @returns {object|null} Item object with type field, or null if not found
 */
function findById(id) {
  const idLower = id.toLowerCase();

  // Search agents
  const agent = registryData.agents.find((a) => a.id === idLower);
  if (agent) return { ...agent, type: 'agent' };

  // Search prompts
  const prompt = registryData.prompts.find((p) => p.id === idLower);
  if (prompt) return { ...prompt, type: 'prompt' };

  // Search scenarios
  const scenario = registryData.scenarios.find((s) => s.id === idLower);
  if (scenario) return { ...scenario, type: 'scenario' };

  return null;
}

/**
 * Find an item by name (case-insensitive, fuzzy match)
 * @param {string} name - Item name
 * @returns {object|null} Item object with type field, or null if not found
 */
function findByName(name) {
  const nameLower = name.toLowerCase();
  const allItems = getAllItems();

  // Exact match first
  let match = allItems.find((item) => item.name.toLowerCase() === nameLower);
  if (match) return match;

  // Fuzzy match: check if item name includes search term
  match = allItems.find((item) => item.name.toLowerCase().includes(nameLower));
  if (match) return match;

  // Fuzzy match: check if item ID includes search term
  match = allItems.find((item) => item.id.includes(nameLower));
  if (match) return match;

  return null;
}

/**
 * Search items by tag
 * @param {string} tag - Tag to search for
 * @returns {Array} Array of matching items with type field
 */
function findByTag(tag) {
  const tagLower = tag.toLowerCase();
  const allItems = getAllItems();

  return allItems.filter((item) => item.tags.some((t) => t.toLowerCase().includes(tagLower)));
}

/**
 * Search items by tool compatibility
 * @param {string} tool - Tool name (e.g., 'claude-code', 'github-copilot')
 * @returns {Array} Array of matching items with type field
 */
function findByTool(tool) {
  const toolLower = tool.toLowerCase();
  const allItems = getAllItems();

  return allItems.filter((item) => item.tools.some((t) => t.toLowerCase() === toolLower));
}

/**
 * Get registry metadata
 * @returns {object} Registry version and last updated info
 */
function getMetadata() {
  return {
    version: registryData.version,
    lastUpdated: registryData.lastUpdated,
  };
}

module.exports = {
  getAgents,
  getPrompts,
  getScenarios,
  getAllItems,
  findById,
  findByName,
  findByTag,
  findByTool,
  getMetadata,
};
