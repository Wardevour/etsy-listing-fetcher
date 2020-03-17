'use strict';

const fetch = require('node-fetch');
const defaultOptions = {};

/**
 * Initilize this with some options
 *
 * @param {Object} options - Request settings object.
 * @param {string} [options.baseUrl] - The base url to use for this' requests.
 * @param {string} [options.apiKey] - api_key to use for this' requests.
 * @param {string} [options.shopId] - shop_id to use for this' requests.
 */
exports.init = function init(options) {
    if (typeof options.baseUrl !== 'undefined') {
        defaultOptions.baseUrl = options.baseUrl;
    }

    if (typeof options.apiKey !== 'undefined') {
        defaultOptions.apiKey = options.apiKey;
    }

    if (typeof options.shopId !== 'undefined') {
        defaultOptions.uri =
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
    let searchParams = null;
    if (typeof params !== 'undefined') {
        searchParams = new URLSearchParams(params);
    } else {
        searchParams = new URLSearchParams();
    }

    let requestOptions = Object.assign(defaultOptions);
    searchParams.append('api_key', requestOptions.apiKey);

    let url = new URL(requestOptions.uri, requestOptions.baseUrl);
    url.search = searchParams;

    return fetch(url.href).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response;
    });
}
