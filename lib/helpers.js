'use strict';

const httpClient = require('node-fetch');

/**
 * Sleep for a bit.
 *
 * @param {integer} ms - The time to sleep in milliseconds.
 * @returns {Promise} Resloves in ms miliseconds.
 */
exports.sleep = function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

/**
 * Wrap the http client and make a request.
 *
 * @param {Object} options - Options for requests.
 * @param {string} [options.headers] - Headers.
 * @param {string} options.baseUrl - The base url.
 * @param {string} [options.uri] - The resource uri.
 * @param {string} options.apiKey - api_key.
 * @param {string} options.shopId - shop_id.
 * @param {Object} [searchParams] - Key value pairs used to build a
 *  querystring.
 * @returns {Promise} Resolves on status ok with response, else we reject.
 */
exports.request = function request(options, searchParams) {
    if (typeof searchParams !== 'undefined') {
        searchParams = new URLSearchParams(searchParams);
    } else {
        searchParams = new URLSearchParams();
    }

    if (typeof options.apiKey !== 'undefined') {
        searchParams.append('api_key', options.apiKey);
    }

    let url = new URL(options.uri, options.baseUrl);
    url.search = searchParams;

    let clientOptions = {};
    if (typeof options.headers !== 'undefined') {
        clientOptions.headers = options.headers;
    }

    return httpClient(url.href, clientOptions).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response;
    });
}
