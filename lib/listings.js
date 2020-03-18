'use strict';

const fetch = require('./helpers').fetch;

/**
 * Initilize this with some options
 *
 * @param {Object} options - Request settings object.
 * @param {string} [options.baseUrl] - The base url to use for this' requests.
 * @param {string} [options.apiKey] - api_key to use for this' requests.
 * @param {string} [options.shopId] - shop_id to use for this' requests.
 */
exports.init = function init(options) {
    this.options = {};

    if (typeof options.baseUrl !== 'undefined') {
        this.options.baseUrl = options.baseUrl;
    }

    if (typeof options.apiKey !== 'undefined') {
        this.options.apiKey = options.apiKey;
    }

    if (typeof options.shopId !== 'undefined') {
        this.options.uri =
            'shops/' + options.shopId + '/listings/active.json';
    }
};

/**
 * Get a Listings response
 *
 * @param {Object} params - Object containing k-v pairs for search params.
 * @param {integer} [params.limit] - How many records to respond with.
 * @param {integer} [params.offset] - How many records to skip over.
 * @returns {Promise}
 */
exports.get = function get(params) {
    return fetch(this.options, params);
}
