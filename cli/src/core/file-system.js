/**
 * File system utility - Safe file operations with directory creation
 */

const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

/**
 * Ensure a directory exists, create it recursively if needed
 * @param {string} dirPath - Path to directory
 * @returns {Promise<void>}
 */
async function ensureDirectory(dirPath) {
  await fs.ensureDir(dirPath);
}

/**
 * Write content to a file, creating directories as needed
 * @param {string} filePath - Path to file
 * @param {string} content - Content to write
 * @returns {Promise<void>}
 */
async function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  await ensureDirectory(dir);
  await fs.writeFile(filePath, content, 'utf-8');
}

/**
 * Read content from a file
 * @param {string} filePath - Path to file
 * @returns {Promise<string>} File content
 */
async function readFile(filePath) {
  return fs.readFile(filePath, 'utf-8');
}

/**
 * Check if a file exists
 * @param {string} filePath - Path to file
 * @returns {Promise<boolean>}
 */
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if a directory exists
 * @param {string} dirPath - Path to directory
 * @returns {Promise<boolean>}
 */
async function directoryExists(dirPath) {
  try {
    const stat = await fs.stat(dirPath);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

/**
 * Compute SHA-256 hash of content
 * @param {string} content - Content to hash
 * @returns {string} Hex-encoded SHA-256 hash
 */
function computeHash(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

/**
 * Compute SHA-256 hash of a file
 * @param {string} filePath - Path to file
 * @returns {Promise<string>} Hex-encoded SHA-256 hash
 */
async function computeFileHash(filePath) {
  const content = await readFile(filePath);
  return computeHash(content);
}

/**
 * Copy a file from source to destination
 * @param {string} sourcePath - Source file path
 * @param {string} destPath - Destination file path
 * @returns {Promise<void>}
 */
async function copyFile(sourcePath, destPath) {
  const dir = path.dirname(destPath);
  await ensureDirectory(dir);
  await fs.copy(sourcePath, destPath);
}

/**
 * Check if directory has write permissions
 * @param {string} dirPath - Path to directory
 * @returns {Promise<boolean>}
 */
async function hasWritePermission(dirPath) {
  try {
    // Try to write a test file
    const testFile = path.join(dirPath, '.write-test-' + Date.now());
    await fs.writeFile(testFile, 'test');
    await fs.unlink(testFile);
    return true;
  } catch {
    return false;
  }
}

/**
 * Read and parse JSON file
 * @param {string} filePath - Path to JSON file
 * @returns {Promise<object>} Parsed JSON object
 */
async function readJson(filePath) {
  return fs.readJson(filePath);
}

/**
 * Write object as JSON file
 * @param {string} filePath - Path to JSON file
 * @param {object} data - Data to write
 * @returns {Promise<void>}
 */
async function writeJson(filePath, data) {
  const dir = path.dirname(filePath);
  await ensureDirectory(dir);
  await fs.writeJson(filePath, data, { spaces: 2 });
}

/**
 * Delete a file if it exists
 * @param {string} filePath - Path to file
 * @returns {Promise<void>}
 */
async function deleteFile(filePath) {
  if (await fileExists(filePath)) {
    await fs.unlink(filePath);
  }
}

/**
 * Create a backup of a file
 * @param {string} filePath - Path to file
 * @param {string} backupDir - Directory for backups (default: .prompt-library/backups)
 * @returns {Promise<string>} Path to backup file
 */
async function backupFile(filePath, backupDir = '.prompt-library/backups') {
  if (!(await fileExists(filePath))) {
    throw new Error(`Cannot backup non-existent file: ${filePath}`);
  }

  const timestamp = Date.now();
  const filename = path.basename(filePath);
  const backupPath = path.join(backupDir, `${filename}.${timestamp}.bak`);

  await copyFile(filePath, backupPath);
  return backupPath;
}

module.exports = {
  ensureDirectory,
  writeFile,
  readFile,
  fileExists,
  directoryExists,
  computeHash,
  computeFileHash,
  copyFile,
  hasWritePermission,
  readJson,
  writeJson,
  deleteFile,
  backupFile,
};
