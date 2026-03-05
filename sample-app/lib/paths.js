/**
 * Path resolution that works in both normal Node.js and SEA mode.
 *
 * In normal mode: __dirname points to the source directory.
 * In SEA mode: __dirname is undefined or points to the binary location.
 * We use process.execPath to find files relative to the binary.
 */

const path = require('path');

function isSea() {
    try {
        // Node 22+: require('node:sea').isSea()
        return require('node:sea').isSea();
    } catch {
        // Node 20: check if we're injected
        return !!(process.env.__NODE_SEA_APP || process.pkg);
    }
}

function appDir() {
    if (isSea()) {
        // In SEA mode, files are relative to the binary location
        return path.dirname(process.execPath);
    }
    // Normal mode: relative to the project root (one level up from lib/)
    return path.resolve(__dirname, '..');
}

function resolve(relativePath) {
    return path.join(appDir(), relativePath);
}

module.exports = { isSea, appDir, resolve };
