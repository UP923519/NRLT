const realtimeTrains = require("./index");

(async () => {
    let trainData = await realtimeTrains.getTrains("KGX", 10);
    console.log(trainData);
    console.log(`Returned ${trainData.length}/10 Results Requested from Target Station! (London King's Cross) ${trainData.length < 10 ? "(The Timetable for the Current Hour was Smaller than the Requested Result Count)" : ""}`);
})();