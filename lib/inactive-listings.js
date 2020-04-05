'use strict';

const request = require('./helpers').oAuthRequest;

module.exports = class InactiveListings {
    /**
     * Initilize this with some options.
     *
     * @param {Object} options - Request settings object.
     * @param {string} options.baseUrl - The base url to use for requests.
     * @param {string} [options.uri] - The uri to use for requests.
     * @param {string} options.apiKey - api_key to use for requests.
     * @param {string} options.shopId - shop_id to use for requests.
     */
    constructor(options) {
        this.options = Object.assign({}, options);
        this.options.uri = 'shops/' + options.shopId
            + '/listings/inactive.json';
    }

    /**
     * Get a Listings response.
     *
     * @param {Object} [searchParams] - k-v pairs for search params.
     * @param {integer} [searchParams.limit] - How many records to respond
     *  with.
     * @param {integer} [searchParams.offset] - How many records to skip over.
     * @returns {Promise} Resolves on status ok with response, else we reject.
     */
    get(searchParams) {
        return request(this.options, searchParams);
    }
}
