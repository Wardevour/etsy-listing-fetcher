'use strict';

if (process.env.NODE_ENV != 'production') {
    // allow setting environment variables with a .env file when developing
    require('dotenv').config();
}

const ETSY_API_KEY = process.env.ETSY_API_KEY;
const ETSY_SHOP_ID = process.env.ETSY_SHOP_ID;
const ETSY_API_SECRET = process.env.ETSY_API_SECRET;
const ETSY_ACCESS_TOKEN = process.env.ETSY_ACCESS_TOKEN;
const ETSY_ACCESS_TOKEN_SECRET = process.env.ETSY_ACCESS_TOKEN_SECRET;
const ETSY_BASE_URL = 'https://openapi.etsy.com/v2/';
const Listings = require('./lib/listings');
const InactiveListings = require('./lib/inactive-listings');
const ExpiredListings = require('./lib/expired-listings');
const DraftListings = require('./lib/draft-listings');

module.exports = class Etsy {
    /**
     * Initilize listing fetcher.
     */
    constructor() {
        this.options = {
            baseUrl: ETSY_BASE_URL,
            uri: '',
            apiKey: ETSY_API_KEY,
            shopId: ETSY_SHOP_ID,
            apiSecret: ETSY_API_SECRET,
            accessToken: ETSY_ACCESS_TOKEN,
            accessTokenSecret: ETSY_ACCESS_TOKEN_SECRET
        };

        this.listings = new Listings(this.options);
        this.inactiveListings = new InactiveListings(this.options);
        this.expiredListings = new ExpiredListings(this.options);
        this.draftListings = new DraftListings(this.options);
    }
}
