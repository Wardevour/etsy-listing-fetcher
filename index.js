'use strict';

if (process.env.NODE_ENV != 'production') {
    // allow setting environment variables with a .env file when developing
    require('dotenv').config();
}

const ETSY_API_KEY = process.env.ETSY_API_KEY;
const ETSY_SHOP_ID = process.env.ETSY_SHOP_ID;
const baseUrl = 'https://openapi.etsy.com/v2/';
const Listings = require('./lib/listings');

module.exports = class Etsy {
    /**
     * Initilize listing fetcher.
     */
    constructor() {
        this.options = {
            baseUrl: baseUrl,
            uri: '',
            apiKey: ETSY_API_KEY,
            shopId: ETSY_SHOP_ID
        };

        this.listings = new Listings(this.options);
    }
}
