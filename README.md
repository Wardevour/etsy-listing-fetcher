# Etsy Listing Fetcher for NodeJS

A simple NodeJS package to make calls to the
  [Etsy API](https://www.etsy.com/developers/documentation)

### Prerequisites

* [NodeJS](https://nodejs.org), which will come with
  npm.
* [Git](https://git-scm.com)
* An ETSY_API_KEY.
  [Register you app with Etsy](https://www.etsy.com/developers/register) and
  your ETSY_API_KEY is your app's KEYSTRING.
* An ETSY_SHOP_ID. A shop id is the referring_id in an Etsy shop's contact URL

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
  You can do this with dotenv using a `.env` file containing your ETSY_API_KEY
  and ETSY_SHOP_ID.

The following is an example creating the `.env` file:

```bash
touch .env
echo "ETSY_API_KEY=XXXXXXXXXXX" >> .env
echo "ETSY_SHOP_ID=XXXXXXXXXXX" >> .env
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
* dotenv
* mocha
* chai
