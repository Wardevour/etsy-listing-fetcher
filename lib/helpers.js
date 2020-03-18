'use strict';

const httpClient = require('node-fetch');

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

/**
 * Wrap the http client
 *
 * @param {Object} requestOptions - Options for requests.
 * @param {string} [requestOptions.headers] - Headers.
 * @param {string} [requestOptions.baseUrl] - The base url.
 * @param {string} [requestOptions.uri] - The resource uri.
 * @param {string} [requestOptions.apiKey] - api_key.
 * @param {string} [requestOptions.shopId] - shop_id.
 * @param {Object} searchParams - Seach params to build a querystring.
 * @returns {Promise}
 */
exports.fetch = function fetch(requestOptions, searchParams) {
    if (typeof searchParams !== 'undefined') {
        searchParams = new URLSearchParams(searchParams);
    } else {
        searchParams = new URLSearchParams();
    }

    if (typeof requestOptions.apiKey !== 'undefined') {
        searchParams.append('api_key', requestOptions.apiKey);
    }

    let url = new URL(requestOptions.uri, requestOptions.baseUrl);
    url.search = searchParams;

    let clientOptions = {};
    if (typeof requestOptions.headers !== 'undefined') {
        clientOptions.headers = requestOptions.headers;
    }

    return httpClient(url.href, clientOptions).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response;
    });
}
