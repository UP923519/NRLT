<h1 align="center">
    🚆 Realtime Trains Scraper 🚆
</h1>

Get Unlimited and Fully Detailed UK Train Data from Realtime Trains without an API Key.

[![NPM](https://nodei.co/npm/realtime-trains-scraper.png)](https://npmjs.com/package/realtime-trains-scraper)

[![Downloads](https://img.shields.io/npm/dt/realtime-trains-scraper?logo=npm&style=flat-square)](https://npmjs.com/package/realtime-trains-scraper) [![Discord Server](https://img.shields.io/discord/667479986214666272?logo=discord&logoColor=white&style=flat-square)](https://discord.gg/P2g24jp)

## Features

- ⚡ <b>Lightning Fast</b> | Data from Realtime Trains is Fetched in a Matter of Seconds!

- 📑 <b>Detailed JSON Response</b> | To get the Detailed Data instead of the Simple Data, you would have to contact the Realtime Trains Team. By using this package, you don't have to do that!

- 🔓 <b>100% Free & Unlimited Access to Data</b> | By utilising [Node Fetch](https://npmjs.com/package/node-fetch) and [Cheerio](https://npmjs.com/package/cheerio), you can fetch data whenever and as many times as you want to, without any API Key!

## Install Package

To install the package, simply run the following command in your terminal:

`npm install realtime-trains-scraper`

## Example Code

```js
const realtimeTrains = require('realtime-trains-scraper');

// Fetching Data using the Station Code
realtimeTrains.getTrains("KGX");

// Fetching Data using the Station Name. However, this is not recommended as the Station Code is more reliable.
realtimeTrains.getTrains("London King's Cross");
```

You can also add a second parameter to specify how many results you want to get.

```js
realtimeTrains.getTrains("KGX", 10); // Defaults to 15 (Max).
```

## Example Result

```json
{
    "operator": {
      "name": "LNER",
      "code": "GR"
    },
    "stp": "WTT",
    "plannedArrival": "2055",      
    "actualArrival": "2056",       
    "plannedDeparture": null,
    "actualDeparture": null,
    "origin": {
      "name": "Edinburgh",
      "code": "EDB"
    },
    "destination": {
      "name": "London Kings Cross",
      "code": "KGX"
    },
    "callingPoints": [
      {
        "name": "Berwick-upon-Tweed",
        "code": "BWK",
        "platform": "1",
        "plannedArrival": "1711",
        "actualArrival": "1709",
        "plannedDeparture": "1712",
        "actualDeparture": "1712",
        "delay": null
      },
      {
        "name": "Newcastle",
        "code": "NCL",
        "platform": "3",
        "plannedArrival": "1756",
        "actualArrival": "1754",
        "plannedDeparture": "1759",
        "actualDeparture": "1759",
        "delay": null
      },
      {
        "name": "Darlington",
        "code": "DAR",
        "platform": "1",
        "plannedArrival": "1827",
        "actualArrival": "1825",
        "plannedDeparture": "1829",
        "actualDeparture": "1829",
        "delay": null
      },
      {
        "name": "York",
        "code": "YRK",
        "platform": "3",
        "plannedArrival": "1855",
        "actualArrival": "1855",
        "plannedDeparture": "1858",
        "actualDeparture": "1859",
        "delay": "+1"
      },
      {
        "name": "Stevenage",
        "code": "SVG",
        "platform": "2",
        "plannedArrival": "2028",
        "actualArrival": "2033",
        "plannedDeparture": "2030",
        "actualDeparture": "2035",
        "delay": "+5"
      },
      {
        "name": "London Kings Cross",
        "code": "KGX",
        "platform": "0",
        "plannedArrival": "2055",
        "actualArrival": "2054",
        "plannedDeparture": null,
        "actualDeparture": null,
        "delay": "-1"
      }
    ],
    "platform": "0",
    "uid": "C86178",
    "trainid": "1E23",
    "sourceURL": "https://www.realtimetrains.co.uk/service/gb-nr:C86178/2021-08-30/detailed",
    "isPassengerTrain": true,
    "isCalling": true,
    "isCancelled": false,
    "runsAsRequired": false
  }
```

If any of the Arrival or Departure Times are `null`, the field for that data on the timetable has been left blank.

A `'+'` symbol in the Delay indicates that the train is delayed by `'x'` minutes.

A `'-'` symbol in the Delay indicates that the train is early by `'x'` minutes.

If No Delay is present, the Delay field will be `null`.

## Contact Me

- 👋 Need Help? [Join Our Discord Server](https://discord.gg/P2g24jp)!

- 👾 Found a Bug, or Something Outdated? [Open an Issue](https://github.com/WillTDA/Realtime-Trains-Scraper/issues), or Fork and [Submit a Pull Request](https://github.com/WillTDA/Realtime-Trains-Scraper/pulls) on our [GitHub Repository](https://github.com/WillTDA/Realtime-Trains-Scraper)!
