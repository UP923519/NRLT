const fetch = require("node-fetch");
const cheerio = require("cheerio");
const tocs = require("./mappings/operators.json");
const stations = require("./mappings/stations.json");
const Service = require("./structures/Service");
const CORS_ANYWHERE = ""//"https://proxy.cors.sh/"


async function getCallingPoints(url) {
    if (!url) throw new Error("URL is Required.");
    let callingPoints = [];
    let html = await fetch(CORS_ANYWHERE+url /*, {
        headers: {
        'x-cors-api-key': 'temp_f2b1d57dc4263bbdb583e9b8c8a4fe18',
        'access-control-allow-origin': '*'
        }
      }*/
      )
    html = await fetch(CORS_ANYWHERE+url, /*{
        headers: {
        'x-cors-api-key': 'temp_f2b1d57dc4263bbdb583e9b8c8a4fe18',
        'access-control-allow-origin': '*'
        }
      }*/
      )
        .then(response => response.text());

    const $ = cheerio.load(html);

    //getting the detailed timetable
    let locationList = $(".locationlist");
    //getting all elements with the class location call public
    locationList = locationList.find(".location.call.public");
    locationList.each(async (i, el) => {
        let currentElement = $(el).children();

        let values = currentElement.map((i, el) => {
            return $(el).text();
        });

        //building the object from the values
        let station = {};
        station.name = values[1].split(/^[A-Z]{3}/)[1] || null;
        station.code = stations.find(s => s.stationName === station.name)?.crsCode || null;
        station.platform = values[2] || null;
        station.plannedArrival = values[3] || null;
        station.actualArrival = values[5] || null;
        station.plannedDeparture = values[4] || null;
        station.actualDeparture = values[6] || null;
        station.delay = values[7] || null;

        callingPoints.push(station);
    });
    callingPoints.shift();
    if (callingPoints.every(station => station === null)) callingPoints = [];
    return callingPoints;
}

//module.exports = {

    /**
    * Get the list of services for a given station. The name of the station can be provided but using it's code is recommended.
    * @param {string} station The Name or Code of the Station to Scrape.
    * @param {number} resultCount (OPTIONAL): The Number of Results to Scrape. Defaults to 10, Max is 15.
    * @returns {Promise<Service[]>} A Promise that Resolves to an Array of Objects containing Services.
    */

export async function getTrains(station, resultCount) {
    console.log("indexJS getTrains running");

    if (!station) return console.log("Realtime Trains Scraper Error: Station is Required.\nNeed Help? Join our Discord Server: https://discord.gg/P2g24jp");
    station = station.toLowerCase();

    if (!resultCount) resultCount = 10;
    if (resultCount > 15) return console.log("Realtime Trains Scraper Error: You cannot Fetch more than 15 Results.\nNeed Help? Join our Discord Server: https://discord.gg/P2g24jp");
    if (resultCount < 1) return console.log("Realtime Trains Scraper Error: You must Fetch at least 1 Result.\nNeed Help? Join our Discord Server: https://discord.gg/P2g24jp");

    //retrieving the code for the station
    station = station.replace(/[^a-z0-9]/gi, "");
    const stationCode = stations.find(s =>
        s.stationName.replace(/[^a-z0-9]/gi, "").toLowerCase().includes(station) ||
        s.crsCode.toLowerCase() === station
    )?.crsCode || null;

    let data = []; //array of data to return

    //getting the html from Realtime Trains
    const html = await fetch(CORS_ANYWHERE+`https://www.realtimetrains.co.uk/search/detailed/gb-nr:${stationCode}`/*, {
        headers: {
        'x-cors-api-key': 'temp_d773b942f45ded620045518a7f461f6a',
        'access-control-allow-origin': '*'
        }
        }*/
        )
        .then(response => response.text());

    const $ = cheerio.load(html);

    //getting the detailed timetable
    let serviceList = $(".servicelist");
    serviceList = serviceList.find("a");
    let hrefs = [];
    let callingPointsList = [];

    serviceList.each((i, el) => {
        //formatting the href we'll use to get the list of calling points from
        let callingPointHref = $(el).attr("href").split("/");
        callingPointHref.pop();
        callingPointHref = callingPointHref.join("/");
        hrefs.push(callingPointHref);
    });

    //getting the calling points
    callingPointsList = await Promise.all(hrefs.map(href => getCallingPoints(`https://www.realtimetrains.co.uk${href}`)));

    serviceList.each(async (i, el) => {
        let currentElement = $(el).children();

        let callingPoints = callingPointsList[i] || [];

        let serviceUID = hrefs[i].split("/")[2].replace("gb-nr:", "");
        let sourceURL = `https://www.realtimetrains.co.uk${hrefs[i]}`;

        let values = currentElement.map((i, el) => {
            return $(el).text();
        });

        //parsing the values in each row of the table into an object, then pushing it to the array of data
        let service = {};
        service.operator = {}
        service.stp = values[0] || null;
        service.plannedArrival = values[1] || null;
        if (!service.plannedArrival) service.plannedArrival = null
        service.actualArrival = !values[2] ? null : values[2];
        service.plannedDeparture = values[8] || null;

        if (values[9].toLowerCase() === "(q)") service.actualDeparture = "Runs as Required"
        else if (values[9].toLowerCase() === "cancel") service.actualDeparture = "Cancelled"
        else if (values[9].toLowerCase() === "n/r") service.actualDeparture = "No Report"
        else service.actualDeparture = values[9] || null;

        service.origin = { name: null, code: null };
        service.origin.name = values[3] || null;
        service.origin.code = stations.find(s => s.stationName === service.origin.name)?.crsCode || null;
        
        if (service.origin.name.toLowerCase() === "starts here") {
            service.origin.name = stations.find(s => s.crsCode.toLowerCase() === stationCode.toLowerCase())?.stationName || null;
            service.origin.code = stationCode || null;
        }

        service.destination = { name: null, code: null };
        service.destination.name = values[7].replace("Approaching", "").replace("At platform", "") || null;
        service.destination.code = stations.find(s => s.stationName === service.destination.name)?.crsCode || null;

        if (service.destination.name.toLowerCase() === "terminates here") {
            service.destination.name = stations.find(s => s.crsCode.toLowerCase() === stationCode.toLowerCase())?.stationName || null;
            service.destination.code = stationCode || null;
        }

        service.callingPoints = callingPoints;
        service.platform = !values[4] ? null : values[4];

        if (service.platform === "-") service.platform = null;

        service.uid = serviceUID || null;
        service.trainid = values[5] || null;
        service.operator.name = tocs[values[6]] || null;
        service.operator.code = values[6] || null;
        service.sourceURL = sourceURL+"/detailed" || null;

        if (service.operator.code.toLowerCase() === "zz") service.isPassengerTrain = false;
        else service.isPassengerTrain = true;

        if (values[1] === "pass") service.isCalling = false;
        else service.isCalling = true;

        if (values[9].toLowerCase() === "cancel" || values[2].toLowerCase() === "cancel") service.isCancelled = true;
        else service.isCancelled = false;

        if (values[9].toLowerCase() === "(q)") service.runsAsRequired = true;
        else service.runsAsRequired = false;

        data.push(service);
    });

    data.length = resultCount;

    if (data.every(item => item === null)) data = [];
    return data.filter(item => item !== null);
}
//};