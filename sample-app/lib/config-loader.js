/**
 * Config loader — reads JSON config from disk.
 *
 * Demonstrates the __dirname problem: in SEA mode, config files
 * must be alongside the binary, not bundled inside it.
 * Uses paths.resolve() to find the config regardless of mode.
 */

const fs = require('fs');
const paths = require('./paths');
const logger = require('./logger');

function load(name) {
    const filepath = paths.resolve('config/' + name + '.json');
    logger.info('Loading config from: ' + filepath);

    try {
        const raw = fs.readFileSync(filepath, 'utf-8');
        return JSON.parse(raw);
    } catch (err) {
        logger.error('Failed to load config: ' + err.message);
        return null;
    }
}

module.exports = { load };
