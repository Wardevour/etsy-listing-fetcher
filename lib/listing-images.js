'use strict';

const request = require('./helpers').request;

module.exports = class ListingImages {
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
        this.options.uri = 'listings/{{ listing_id }}/images.json';
    }

    /**
     * Get a listing images response.
     *
     * @param {Object} searchParams - k-v pairs for search params.
     * @param {string} searchParams.listingId - The listing_id to find images
     *  for
     * @param {integer} [searchParams.limit] - How many records to respond
     *  with.
     * @param {integer} [searchParams.offset] - How many records to skip over.
     * @returns {Promise} Resolves on status ok with response, else we reject.
     */
    get(searchParams) {
        let opts = Object.assign({}, this.options);
        opts.uri = opts.uri.replace(
            '{{ listing_id }}',
            searchParams.listingId
        );

        delete searchParams.listingId;
        return request(opts, searchParams);
    }
}
