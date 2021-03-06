'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('chai').assert;
const sleep = require('../lib/helpers').sleep;
const Etsy = require('../index');

let etsy = null;

describe('Etsy.listingImages', function() {
    before(function() {
        etsy = new Etsy();
    });

    describe('#get()', function() {
        context('when using default options', function() {
            it('should create output/listing-images.json', function(done) {
                this.timeout(5000);

                // this is a random listing that may be deactivated
                let options = {
                    'listingId': 502402726,
                };

                etsy.listingImages.get(options).then((response) => {
                    return response.text();
                }).then((text) => {
                  // make a file system agnostic file name
                  let fileName = 'output' + path.sep + 'listing-images.json';

                  // this throws an error if the path doesn't exist
                  //   or the file couldn't be created
                  fs.writeFileSync(fileName, text, 'utf-8');

                  done();
                }).catch(done);
            });

            it('should create output/listing-images.csv', function(done) {
                this.timeout(5000);

                let options = {
                    'listingId': 502402726,
                };

                etsy.listingImages.get(options).then((response) => {
                    return response.json();
                }).then((data) => {
                    data = data.results;

                    let rows = [];
                    rows[0] = Object.keys(data[0]).join(',');

                    for (let i = 1; i < data.length; i++) {
                        let values = Object.values(data[i]);

                        // wrap values in single quotes
                        values = values.map((val) => {
                            return "'" + val + "'";
                        });

                        rows[i] = values.join(',');
                    }

                    // write the csv file
                    let fileName = 'output' + path.sep + 'listing-images.csv';
                    fs.writeFileSync(fileName, rows.join('\n'), 'utf-8');

                    done();
                }).catch(done);
            });
        });

        context('when using pagination options', function() {
            it('should get two pages and concat them', function(done) {
                this.timeout(5200);

                let rows = [];

                let options = {
                    'listingId': 502402726,
                    'limit': 1,
                    'offset': 0
                };

                etsy.listingImages.get(options).then((response) => {
                    return response.json();
                }).then((data) => {
                    rows = rows.concat(data.results);

                    // 5 per second 5000 per day
                    return sleep(200);
                }).then(() => {
                    options.offset += options.limit;
                    return etsy.listingImages.get(options);
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    rows = rows.concat(data.results);

                    assert.isAbove(rows.length, 1);
                    assert.notEqual(
                        rows[0].listing_image_id,
                        rows[1].listing_image_id
                    );
                    done();
                }).catch(done);
            });
        });
    });
});
