'use strict';

const fs = require('fs');
const path = require('path');
const getAccessToken = require('../lib/helpers').getAccessToken;
const getRequestToken = require('../lib/helpers').getRequestToken;
const Etsy = require('../index');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let etsy = new Etsy();
let requestToken = null;
let requestTokenSecret = null;

getRequestToken(etsy.options).then((data) => {
    console.log('Login URL:  "' + data.loginUrl + '"');

    requestToken = data.requestToken;
    requestTokenSecret = data.requestTokenSecret;

    return new Promise((resolve, reject) => {
        rl.question('Enter validator code: ', resolve);
    });
}).then((validator) => {
    return getAccessToken(
        requestToken,
        requestTokenSecret,
        validator,
        etsy.options
    );
}).then((data) => {
    let fileName = 'output' + path.sep + 'access_token.txt';

    let txt = '';
    txt += 'ETSY_ACCESS_TOKEN=' + data.accessToken + '\n';
    txt += 'ETSY_ACCESS_TOKEN_SECRET=' + data.accessTokenSecret + '\n';

    fs.writeFileSync(fileName, txt, 'utf-8');
    console.log('Saved OAuth credentials to "' + fileName + '"');
    rl.close();
}).catch((err) => {
    console.log(err);
    rl.close();
});
