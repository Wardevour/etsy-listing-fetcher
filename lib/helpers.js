'use strict';

/**
 * Sleep for a bit
 *
 * @param {integer} ms - The time to sleep in milliseconds
 * @returns {Promise}
 */
exports.sleep = function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
