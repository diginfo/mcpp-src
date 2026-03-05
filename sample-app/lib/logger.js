/**
 * Simple logger module — demonstrates local require().
 */

const PREFIX = '[sample-app]';

function info(msg) {
    console.log(PREFIX, msg);
}

function error(msg) {
    console.error(PREFIX, 'ERROR:', msg);
}

module.exports = { info, error };
