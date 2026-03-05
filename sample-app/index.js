/**
 * Sample Node.js app — demonstrates SEA-compatible structure.
 *
 * Shows:
 * - Local module requires (lib/)
 * - Config file loading from disk (config/)
 * - Data file reading (data/)
 * - __dirname handling that works in both normal and SEA mode
 */

const fs = require('fs');
const paths = require('./lib/paths');
const logger = require('./lib/logger');
const configLoader = require('./lib/config-loader');

function main() {
    logger.info('Starting...');
    logger.info('Mode: ' + (paths.isSea() ? 'SEA binary' : 'normal Node.js'));
    logger.info('App directory: ' + paths.appDir());

    // Load config from disk (not bundled)
    const config = configLoader.load('app');
    if (!config) {
        logger.error('Cannot start without config');
        process.exit(1);
    }
    logger.info('Config loaded: ' + config.name + ' v' + config.version);
    logger.info('Port: ' + config.port + ', Debug: ' + config.debug);

    // Load data file
    const messagesPath = paths.resolve('data/messages.json');
    try {
        const messages = JSON.parse(fs.readFileSync(messagesPath, 'utf-8'));
        logger.info(messages.welcome);
    } catch (err) {
        logger.error('Failed to load messages: ' + err.message);
    }

    // Show path resolution
    logger.info('--- Path resolution demo ---');
    logger.info('__dirname:        ' + __dirname);
    logger.info('process.execPath: ' + process.execPath);
    logger.info('paths.appDir():   ' + paths.appDir());
    logger.info('config/app.json:  ' + paths.resolve('config/app.json'));
    logger.info('data/messages:    ' + paths.resolve('data/messages.json'));

    logger.info('Done.');
}

main();
