'use strict';

const httpClient = require('node-fetch');
const OAuth = require('oauth').OAuth;

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

    console.log([url.href, clientOptions]);
    return httpClient(url.href, clientOptions).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response;
    });
}

/**
 * Wrap the OAuth client and make a signed request.
 *
 * @param {Object} options - Options for requests.
 * @param {string} options.accessToken - The OAuth access_token.
 * @param {string} options.accessTokenSecret - The OAuth access_token's secret.
 * @param {string} [options.headers] - Headers.
 * @param {string} options.baseUrl - The base url.
 * @param {string} [options.uri] - The resource uri.
 * @param {string} options.apiKey - api_key.
 * @param {string} options.shopId - shop_id.
 * @param {string} options.apiSecret - api_secret.
 * @param {Object} [searchParams] - Key value pairs used to build a
 *  querystring.
 * @returns {Promise} Resolves on successful OAuth response and JSON parsing,
 *  else we reject.
 */
exports.oAuthRequest = function oAuthRequest(options, searchParams) {
    if (typeof searchParams !== 'undefined') {
        searchParams = new URLSearchParams(searchParams);
    } else {
        searchParams = new URLSearchParams();
    }

    let url = new URL(options.uri, options.baseUrl);
    url.search = searchParams;

    return new Promise((resolve, reject) => {
        let oAuth = new OAuth(
            options.baseUrl + 'oauth/request_token?scope=listings_r',
            options.baseUrl + 'oauth/access_token',
            options.apiKey,
            options.apiSecret,
            '1.0',
            'oob',
            'HMAC-SHA1',
            undefined,
            options.headers
        );

        let cb = (err, data, response) => {
            if (err) {
                reject(err);
            }

            data = JSON.parse(data);
            resolve(data);
        };

        oAuth.get(
            url.href,
            options.accessToken,
            options.accessTokenSecret,
            cb
        );
    });
}

/**
 * Get an OAuth request_token.
 *
 * @param {Object} options - Options for requests.
 * @param {string} [options.headers] - Headers.
 * @param {string} options.baseUrl - The base url.
 * @param {string} [options.uri] - The resource uri.
 * @param {string} options.apiKey - api_key.
 * @param {string} options.apiSecret - api_secret.
 * @returns {Promise} Resolves on successful OAuth response and JSON parsing,
 *  else we reject. Resolves with loginUrl, requestToken, and
 *  requestTokenSecret
 */
exports.getRequestToken = function getRequestToken(options) {
    return new Promise((resolve, reject) => {
        let oAuth = new OAuth(
            options.baseUrl + 'oauth/request_token?scope=listings_r',
            options.baseUrl + 'oauth/access_token',
            options.apiKey,
            options.apiSecret,
            '1.0',
            'oob',
            'HMAC-SHA1',
            undefined,
            options.headers
        );

        let cb = (err, requestToken, requestTokenSecret, response) => {
            if (err) {
                reject(err);
            }

            resolve({
                loginUrl: response.login_url,
                requestToken: requestToken,
                requestTokenSecret: requestTokenSecret
            });
        };

        oAuth.getOAuthRequestToken(cb);
    });
}

/**
 * Get an OAuth access_token.
 *
 * @param {string} requestToken - The OAuth request_token.
 * @param {string} requestTokenSecret - The OAuth request_token's secret.
 * @param {string} verifier - The code provided to the user from the login_url.
 * @param {Object} options - Options for requests.
 * @param {string} [options.headers] - Headers.
 * @param {string} options.baseUrl - The base url.
 * @param {string} [options.uri] - The resource uri.
 * @param {string} options.apiKey - api_key.
 * @param {string} options.apiSecret - api_secret.
 * @returns {Promise} Resolves on successful OAuth response and JSON parsing,
 *  else we reject. Resolves with accessToken and accessTokenSecret
 */
exports.getAccessToken = function getAccessToken(
    requestToken,
    requestTokenSecret,
    verifier,
    options
) {
    return new Promise((resolve, reject) => {
        let oAuth = new OAuth(
            options.baseUrl + 'oauth/request_token?scope=listings_r',
            options.baseUrl + 'oauth/access_token',
            options.apiKey,
            options.apiSecret,
            '1.0',
            'oob',
            'HMAC-SHA1',
            undefined,
            options.headers
        );

        let cb = (err, accessToken, accessTokenSecret, response) => {
            if (err) {
                reject(err);
            }

            resolve({
                accessToken: accessToken,
                accessTokenSecret: accessTokenSecret
            });
        };

        oAuth.getOAuthAccessToken(
            requestToken,
            requestTokenSecret,
            verifier,
            cb
        );
    });
}
