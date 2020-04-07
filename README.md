# Etsy Listing Fetcher for NodeJS

Use the [Etsy API](https://www.etsy.com/developers/documentation) with NodeJS
  to fetch listings

### Prerequisites

* [NodeJS](https://nodejs.org) - Comes with npm
* [Git](https://git-scm.com)
* ETSY_API_KEY - ETSY_API_KEY is the integration specific KEYSTRING
* ETSY_SHOP_ID - A shop id is the referring_id in an Etsy shop's contact URL
* [ETSY_API_SECRET] - This is the integration specific SHARED SECRET and is
  only required to get expired or inactive Listings
* [ETSY_ACCESS_TOKEN] - This is the integration specific access_token and is
  only required to get expired or inactive Listings
* [ETSY_ACCESS_TOKEN_SECRET] - This is the integration specific access_token's
  secret and is only required to get expired or inactive Listings

### Installing

First install [NodeJS](https://nodejs.org/en/download/) for your platform and
  make sure to add it to the PATH. The installer should offer to do this for
  you. The same goes for [git](https://git-scm.com/downloads).

Then, clone this repository with git. The following examples use a bash
  terminal in Ubuntu/Linux. However, it should be very similar across platforms
  and command line interfaces.

```bash
git clone git@github.com/Wardevour/etsy-listing-fetcher.git
```

Next, you'll want to install the required dependencies. Run the `npm install`
  command from within the repository, like so:

```bash
cd etsy-listing-fetcher
npm install
```

Finally, you'll need to set some environment variables.
  You can do this with dotenv using a `.env` file.

The following is an example creating the `.env` file:

```bash
touch .env
echo "ETSY_API_KEY=XXXXXXXXXXX" >> .env
echo "ETSY_SHOP_ID=XXXXXXXXXXX" >> .env
echo "ETSY_API_SECRET=XXXXXXXXXXX" >> .env
echo "ETSY_ACCESS_TOKEN=XXXXXXXXXXX" >> .env
echo "ETSY_ACCESS_TOKEN_SECRET=XXXXXXXXXXX" >> .env
```

### Running tests
```bash
npm test
```

## Authors

* **Kenneth Brockert** - *Initial work* -
  [Wardevour](https://github.com/Wardevour)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE)
  file for details

## Acknowledgments

* NodeJS
* node-fetch
* node-oauth
* dotenv
* mocha
* chai
* Etsy

>The term 'Etsy' is a trademark of Etsy, Inc. This application uses the
  Etsy API but is not endorsed or certified by Etsy, Inc.
