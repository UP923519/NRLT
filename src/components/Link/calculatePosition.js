import "../App/App.css";

export function calculatePosition(liveService, liveServiceTime) {
  let locationList;
  let stationsArray = [];
  for (let i = 0; i < liveService.length; i++) {
    let trainLocation;
    let trainActual;
    if (liveService[i].et == null) {
      if (liveService[i].at == "On time" || liveService[i].at == "No report") {
        trainLocation = "✔️";
      } else {
        trainLocation = "❌";
        if (liveService[i].at <= liveService[i].st) {
          trainLocation = "✔️";
        }
      }
    } else {
      trainLocation = liveService[i].et;
      try {
        if (liveService[i - 1].et == null) {
          trainLocation = liveService[i].et + "🚂🚃🚃";
        }
      } catch {
        try {
          if (liveServiceTime.etd != null) {
          } else {
            trainLocation = liveService[i].et + "🚂🚃🚃";
          }
        } catch {}
      }
      try {
        if (liveService[i].et == "Cancelled") trainLocation = "Cancelled ❌";
      } catch {}
      try {
        if (
          liveService[i - 1].et == "Cancelled" &&
          liveService[i].et != "Cancelled" &&
          !trainLocation.includes("🚂🚃🚃")
        ) {
          trainLocation = liveService[i].et + "🚂🚃🚃";
        }
      } catch {}
    }
    if (liveService[i].at == null) {
      // liveService[i].at = "N/A";
    }

    locationList +=
      "*" +
      liveService[i].locationName +
      " " +
      liveService[i].st +
      " " +
      liveService[i].at +
      " " +
      trainLocation;

    stationsArray.push([
      [
        " " + liveService[i].locationName + " ",

        " " + liveService[i].st + " ",

        " " + liveService[i].at + " ",

        " " + trainLocation,
      ],
    ]);
  }

  return [locationList, stationsArray];
}

export function calculatePositionCentral(
  liveService,
  liveServiceTime,
  liveService2,
  location
) {
  let trainLocation;
  let locationList;
  let stationsArray = [];

  if (liveServiceTime.etd == null && liveServiceTime.eta == null) {
    if (
      liveServiceTime.atd == "On time" ||
      liveServiceTime.atd == "No report"
    ) {
      trainLocation = "✔️";
    } else {
      trainLocation = "❌";
    }
  } else {
    trainLocation = liveServiceTime.etd;
    if (trainLocation == null) {
      // trainLocation = liveServiceTime.eta;
    }
    try {
      if (
        liveService[liveService.length - 1].et == null &&
        liveService2[0].et != null
      ) {
        trainLocation = liveServiceTime.etd + "🚂🚃🚃";
      }
    } catch {
      trainLocation = liveServiceTime.eta + "🚂🚃🚃";
      if (trainLocation.includes("null")) {
        trainLocation = trainLocation.replace("null", liveServiceTime.etd);
      }
    }

    try {
      if (liveService[liveService.length + 1].et != null)
        trainLocation = "No report ❌";
    } catch {}
  }
  try {
    if (liveServiceTime.etd == "Cancelled") {
      trainLocation = "Cancelled ❌";
    }
  } catch {}
  if (liveServiceTime.atd == null) {
    if (liveServiceTime.ata != null) {
      // liveServiceTime.atd = liveServiceTime.ata;
    } else {
      try {
        if (liveService2[0].at != null) {
          trainLocation = liveServiceTime.etd + " ❌";
        }
      } catch {}

      // liveServiceTime.atd = "N/A";
    }
  }

  if (liveServiceTime.std == null) {
    if (liveServiceTime.sta != null) {
      // liveServiceTime.std = liveServiceTime.sta;
    } else {
      // liveServiceTime.std = "N/A";
    }
  }

  if (trainLocation) {
    if (trainLocation.includes("null")) {
      trainLocation = trainLocation.replaceAll("null", "N/A");
    }
  } else {
    trainLocation = "N/A";
  }

  if (liveServiceTime.platform == null) {
    liveServiceTime.platform = " N/A";
  }

  if (liveServiceTime.subsequentCallingPoints == null) {
    // If this is the last station, show the status as on time/positive
    // if train arrives on or before expected
    if (trainLocation == "N/A") {
      trainLocation = liveServiceTime.eta;
    }
    if (trainLocation.includes("Cancelled")) {
      trainLocation = "Cancelled ❌";
    }

    if (
      liveServiceTime.ata <= liveServiceTime.sta ||
      liveServiceTime.ata == "On time"
    ) {
      trainLocation = "✔️";
    }
  }

  // TODO Location list not used - needs to be confirmed
  locationList +=
    "*" +
    location +
    " " +
    liveServiceTime.std +
    " " +
    liveServiceTime.atd +
    " " +
    trainLocation +
    " (p." +
    liveServiceTime.platform +
    ")*";

  if (liveServiceTime.subsequentCallingPoints == null) {
    //If this is the last station, show arrival times instead of departure
    stationsArray.push([
      [
        " " + location + " ",
        " " + liveServiceTime.sta + " ",
        " " + liveServiceTime.ata + " ",
        " " + trainLocation + " ",
        " (p." + liveServiceTime.platform + ")",
      ],
      liveServiceTime.ata,
      liveServiceTime.atd,
      liveServiceTime.eta,
      liveServiceTime.etd,
      liveServiceTime.sta,
      liveServiceTime.std,
    ]);
  } else {
    //If this is not the last station, show only departure times
    stationsArray.push([
      [
        " " + location + " ",
        " " + liveServiceTime.std + " ",
        " " + liveServiceTime.atd + " ",
        " " + trainLocation + " ",
        " (p." + liveServiceTime.platform + ")",
      ],
      liveServiceTime.ata,
      liveServiceTime.atd,
      liveServiceTime.eta,
      liveServiceTime.etd,
      liveServiceTime.sta,
      liveServiceTime.std,
    ]);
  }
  return [locationList, stationsArray];
}
