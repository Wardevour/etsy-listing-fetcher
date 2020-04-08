'use strict';

const fs = require('fs');
const path = require('path');
const sleep = require('../lib/helpers').sleep;
const Etsy = require('../index');

let etsy = new Etsy();

const fetch = function fetch() {
    let rows = [];
    let options = {
        'limit': 100,
        'offset': 0
    };

    let recursive = () => {
        return etsy.listings.get(options).then((response) => {
            return response.json();
        }).then((data) => {
            rows = rows.concat(data.results);
            if (rows.length < data.count) {
                options.offset += options.limit;
                // 5 per second 5000 per day
                return sleep(200).then(recursive);
            } else {
                return new Promise((resolve, reject) => {
                    resolve(rows);
                });
            }
        });
    };

    return recursive();
};

fetch().then((data) => {
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
    let fileName = 'output' + path.sep + 'all-listings.csv';
    fs.writeFileSync(fileName, rows.join('\n'), 'utf-8');
    console.log('Saved listings to "' + fileName + '"');
}).catch((err) => {
    console.log(err);
});
