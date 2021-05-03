'use strict';

const fs = require('fs');
const path = require('path');
const sleep = require('../lib/helpers').sleep;
const Etsy = require('../index');

const classes = [
    'listings',
    'draftListings',
    'inactiveListings',
    'expiredListings'
];

let etsy = new Etsy();

const fetch = function fetch(methodIndex) {
    let rows = [];
    let options = {
        'includes': 'Images',
        'fields': [
            'listing_id',
            'state',
            'title',
            'description',
            'price',
            'quantity',
            'category_path',
            'non_taxable'
        ],
        'limit': 100,
        'offset': 0
    };

    let className = classes[methodIndex];
    let recursive = () => {
        return etsy[className].get(options).then((response) => {
            if (method == 'listings') {
                return response.json();
            }

            return response;
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

const fetchAll = function fetchAll() {
    let allRows = [];
    let currentIndex = 0;

    let recursive = () => {
        return fetch(currentIndex).then((data) => {
            allRows = allRows.concat(data);

            if (currentIndex + 1 < methods.length) {
                currentIndex++;
                return recursive();
            } else {
                return new Promise((resolve, reject) => {
                    resolve(allRows);
                });
            }
        })
    };

    return recursive();
};

fetchAll().then((data) => {
    let pattern = new RegExp('<[^>]*>', 'g');

    let rows = [];
    rows[0] = Object.keys(data[0]).join(',');

    for (let i = 1; i < data.length; i++) {
        let imgs = [];
        let imgRow = {};

        let row = data[i];
        for (let property in row) {
            if (row.hasOwnProperty(property)) {
                imgRow[property] = '';

                let value = row[property] + '';
                if (property == 'description') {
                    // strip html from descriptions
                    value = value.replace(pattern, '');
                } else if (property == 'Images') {
                    // the first image is the main image
                    imgs = imgs.concat(row[property].slice(1));
                    value = row[property][0].url_fullxfull;
                }

                // wrap values in quotes
                value = '"' + value + '"';
                row[property] = value;
            }
        }

        imgRow.listing_id = row.listing_id;
        rows.push(Object.values(row).join(','));

        for (let j = 0; j < imgs.length; j++) {
            let obj = Object.assign({}, imgRow);
            obj.Images = '"' + imgs[j].url_fullxfull + '"';
            rows.push(Object.values(obj).join(','));
        }
    }

    // write the csv file
    let fileName = 'output' + path.sep + 'all-listings.csv';
    fs.writeFileSync(fileName, rows.join('\n'), 'utf-8');
    console.log('Saved listings to "' + fileName + '"');
}).catch((err) => {
    console.log(err);
});
