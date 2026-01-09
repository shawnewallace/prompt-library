/**
 * Fetcher utility - Fetch files from GitHub repository
 */

const axios = require('axios');
const { GITHUB_RAW_BASE_URL } = require('../constants.js');

/**
 * Sleep utility for retry delays
 * @param {number} ms - Milliseconds to sleep
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch a file from GitHub raw content
 * @param {string} path - Path to file in repository (e.g., 'shared/agents/clarity-editor.agent.md')
 * @param {object} options - Fetch options
 * @param {number} options.maxRetries - Maximum number of retries (default: 3)
 * @param {number} options.timeout - Request timeout in ms (default: 30000)
 * @returns {Promise<string>} File content as string
 * @throws {Error} If fetch fails after all retries
 */
async function fetchFile(path, options = {}) {
  const { maxRetries = 3, timeout = 30000 } = options;
  const url = `${GITHUB_RAW_BASE_URL}/${path}`;

  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await axios.get(url, {
        timeout,
        validateStatus: (status) => status === 200,
      });

      return response.data;
    } catch (error) {
      lastError = error;

      // Don't retry on 404 - file doesn't exist
      if (error.response && error.response.status === 404) {
        throw new Error(`File not found: ${path}`);
      }

      // If this isn't the last attempt, wait and retry
      if (attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff: 1s, 2s, 4s
        await sleep(delay);
      }
    }
  }

  // All retries failed
  const errorMessage = lastError.response
    ? `HTTP ${lastError.response.status}: ${lastError.response.statusText}`
    : lastError.code === 'ECONNABORTED'
    ? 'Request timeout'
    : lastError.message;

  throw new Error(`Failed to fetch ${path} after ${maxRetries} attempts: ${errorMessage}`);
}

/**
 * Fetch multiple files in parallel
 * @param {string[]} paths - Array of file paths to fetch
 * @param {object} options - Fetch options (passed to fetchFile)
 * @returns {Promise<Array<{path: string, content: string, error?: Error}>>}
 */
async function fetchMultipleFiles(paths, options = {}) {
  const promises = paths.map(async (path) => {
    try {
      const content = await fetchFile(path, options);
      return { path, content };
    } catch (error) {
      return { path, content: null, error };
    }
  });

  return Promise.all(promises);
}

/**
 * Check if a file exists in the repository
 * @param {string} path - Path to file in repository
 * @returns {Promise<boolean>} True if file exists
 */
async function fileExists(path) {
  try {
    await fetchFile(path, { maxRetries: 1 });
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  fetchFile,
  fetchMultipleFiles,
  fileExists,
};
