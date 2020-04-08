'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('chai').assert;
const sleep = require('../lib/helpers').sleep;
const Etsy = require('../index');

let etsy = null;

describe('etsy.inactiveListings', function() {
    before(function() {
        etsy = new Etsy();
    });

    describe('#get()', function() {
        context('when using default options', function() {
            it('should create output/inactive-listings.json', function(done) {
                this.timeout(5000);

                etsy.inactiveListings.get().then((data) => {
                  let fileName = 'output' + path.sep + 'inactive-listings.json';

                  fs.writeFileSync(fileName, JSON.stringify(data), 'utf-8');
                  done();
                }).catch(done);
            });

            it('should create output/inactive-listings.csv', function(done) {
                this.timeout(5000);

                etsy.inactiveListings.get().then((data) => {
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

                    let fileName = 'output' + path.sep
                        + 'inactive-listings.csv';

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
                    'limit': 1,
                    'offset': 0
                };

                etsy.inactiveListings.get(options).then((data) => {
                    rows = rows.concat(data.results);

                    // 5 per second 5000 per day
                    return sleep(200);
                }).then(() => {
                    options.offset += options.limit;
                    return etsy.inactiveListings.get(options);
                }).then((data) => {
                    rows = rows.concat(data.results);

                    assert.isAbove(rows.length, 1);
                    assert.notEqual(rows[0].listing_id, rows[1].listing_id);
                    done();
                }).catch(done);
            });
        });
    });
});
