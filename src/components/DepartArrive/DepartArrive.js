import React, { useState, useEffect } from "react";
import "../App/App.css";
import { Table } from "react-bootstrap";
import Select from "react-select";
import image from "../../assets/nre-logo.png";
import Dashboard1 from "../Link/LinkPage";
import { useNavigate } from "react-router-dom";
import { test1 } from "../Link/LinkPage";
import { currentAzure, serviceCode } from "../Settings/Settings";
import LinearProgress from "@mui/material-next/LinearProgress";
import CircularProgress from "@mui/material-next/CircularProgress";

let liveDeparture = "";
let busDeparture = "";
let staffData = "";

let serviceMessage = "";
let listStation = "";

let currentCRSCode;

let displayServiceMessage = "";
let current = "";
let earlier = "?timeOffset=-120&timeWindow=120";
let earlier2 = "?timeOffset=-65&timeWindow=120";
let later = "?timeOffset=82&timeWindow=120";
let later2 = "?timeOffset=119&timeWindow=120";

let remStatus = "";
let secondStation;
let stationOneD = "";
let stationTwoD = "";

let testFetch;

var htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

let departuresList = "test";
let stationsList = "";

let textInfo = "loading...";
let trainSearch = "";
let newsLinkEx = new RegExp(
  "(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))",
  "g"
);
let newsLink = [];

let myArray = [];

let sIdArray = [];
let failedAlert;

let contextURL = "";
let contextTime;

let serverName = "trainwebapp";
let showServiceCode = false;

let rememberFirstStation;
let rememberSecondStation;

const _ = require("lodash");

export default function DepartArrive(departArrive) {
  // const [departArrive, setDepartArrive] = useState();
  const [stringDepartures, setDepartures] = useState([]);
  const [formVal, setFormVal] = useState("");
  const [rememberStation, setRememberStation] = useState("");
  const [dropVal, setDropVal] = useState("");
  const [trcDropDown, setTRC] = useState("");
  const [trcDropDownD, setTRCD] = useState("");
  const [trcDropDownSP, setTRCSP] = useState("");
  const [stationOne, setStationOne] = useState();
  const [stationTwo, setStationTwo] = useState();
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenForm, setIsOpenForm] = useState(true);
  const [displayFirstStation, setDisplayFirstStation] = useState("");
  const [displaySecondStation, setDisplaySecondStation] = useState("");
  const [processingState, setProcessingState] = useState(false);

  useEffect(() => {
    if (currentAzure == "External") {
      serverName = "huxley2";
    } else if (currentAzure == "Local") {
      serverName = "trainwebapp";
    }

    if (serviceCode == "Show") {
      showServiceCode = true;
    }

    setDisplayFirstStation(rememberFirstStation);
    setDisplaySecondStation(rememberSecondStation);

    setDepartures(myArray);
    getStation();

    if (myArray == "" || failedAlert == true) {
      setIsOpen(false);
      setProcessingState(false);
      setDisplayFirstStation("");
      setDisplaySecondStation("");
    } else {
      if (
        trainSearch.includes("departing") &&
        departArrive.includes("Arrival")
      ) {
        handleDepartureClick(contextTime);
      } else if (
        trainSearch.includes("arriving") &&
        departArrive.includes("Departure")
      ) {
        handleDepartureClick(contextTime);
      }
    }
  }, []);

  function clearValue() {
    setTRCSP(null);
    setTRC(null);
    setTRCD(null);
    getStation();
  }

  function clearAll(e) {
    setDepartures([]);
    textInfo = "loading...";
    newsLink = [];
    remStatus = "";
    trainSearch = "";
    clearValue();
    setIsOpen(false);
    setProcessingState(false);
    setIsOpenForm(true);
    setDisplayFirstStation("");
    setDisplaySecondStation("");
    rememberFirstStation = "";
    rememberSecondStation = "";
  }

  const displayAction = false;

  function handleDepartureClick(timeOffset, code, status, stationFullName) {
    setProcessingState(true);
    setDepartures(["Loading..."]);
    textInfo = "loading...";
    trainSearch = "loading...";

    let switchFlag = false;
    if (code == "SWITCH-st") {
      code = undefined;
      switchFlag = true;
    }

    if (departArrive == "Arrivals") {
      departArrive = "arrivals";
      contextURL = "from";
    }
    if (departArrive == "Departures") {
      departArrive = "departures";
      contextURL = "to";
    }
    failedAlert = false;
    toggle();

    if (remStatus == "" || remStatus == undefined) {
      remStatus = status;
      if (status == undefined && remStatus == undefined) {
        remStatus = 0;
      }
    }

    try {
      if (code != undefined) {
        JSON.stringify(
          logJSONData(
            code,
            timeOffset,
            status,
            stationFullName,
            departArrive,
            contextURL
          )
        );
        setFormVal(code);
        setRememberStation(stationFullName);
      } else {
        JSON.stringify(
          logJSONData(
            formVal,
            timeOffset,
            remStatus,
            rememberStation,
            departArrive,
            contextURL,
            switchFlag
          )
        );
      }
    } catch {
      JSON.stringify(
        logJSONData(
          formVal,
          timeOffset,
          remStatus,
          rememberStation,
          departArrive,
          contextURL
        )
      );
    }
  }

  function runLast(timeOffset) {
    departuresList = departuresList.replaceAll("p.null", "p.N/A");
    myArray = departuresList.split('"');

    myArray = myArray.filter((value, index) => !((index + 1) % 2));
    myArray.shift();

    if (myArray[myArray.length - 1] != "") {
      newsLink = [myArray[myArray.length - 1].match(newsLinkEx)];
      textInfo = myArray[myArray.length - 1];
    } else {
      textInfo =
        "There are no messages for this station (" + currentCRSCode + ").";
      newsLink = [];
    }

    if (busDeparture != null) {
      if (textInfo.includes("no messages for this station")) {
        textInfo =
          "Rail replacement bus services may be in use at this station. If there is a combination of bus and rail services, bus services are shown below rail services in the list.";
      } else {
        textInfo +=
          "\n\nRail replacement bus services may be in use at this station. If there is a combination of bus and rail services, bus services will be shown below rail services in the list.";
      }
    }

    textInfo = textInfo.replace(htmlRegexG, " ");
    textInfo = textInfo.replaceAll("News ", "News. ");
    textInfo = textInfo.replaceAll(
      "in  Latest Travel News.",
      "in the link below.\n\n"
    );
    textInfo = textInfo.replaceAll(".", ". ");
    textInfo = textInfo.replaceAll(" .", " ");
    textInfo = textInfo.replaceAll("amp;", " ");
    textInfo = textInfo.trim();

    let brokentextInfo = textInfo.split(" ");
    let found = 0;
    let showLinks = false;

    try {
      for (let i = 0; i < newsLink[0].length; i++) {
        newsLink[0][i] = newsLink[0][i].substring(1);
      }
    } catch {}

    try {
      for (let i = 0; i < brokentextInfo.length; i++) {
        brokentextInfo[i] = brokentextInfo[i] + " ";
        if (
          brokentextInfo[i].includes("below.") &&
          brokentextInfo[i - 1].includes("link")
        ) {
          brokentextInfo[i] = (
            <text>
              following:
              <br />
              <br />
              <a href={newsLink[0][found]}>{newsLink[0][found]}</a>
            </text>
          );
          found += 1;
        }
        if (
          i == brokentextInfo.length - 1 &&
          newsLink.length > 0 &&
          found != newsLink[0].length
        ) {
          showLinks = true;
        }
      }

      if (showLinks) {
        brokentextInfo.push("\n\n");

        for (let i = 0; i < newsLink[0].length; i++) {
          brokentextInfo.push(<a href={newsLink[0][i]}>{newsLink[0][i]}</a>);
        }

        brokentextInfo.push("\n\n");
      }
    } catch {}

    textInfo = brokentextInfo;

    myArray = myArray.slice(0, -2);

    if (myArray == "") {
      alert("No results found");
      failedAlert = true;
      if (currentCRSCode == undefined) {
        clearAll();
      }
    }

    setDepartures(myArray);
    testFetch = 1;
    contextTime = timeOffset;
    setProcessingState(false);

    if (remStatus == 1) {
      clearValue();
    }
  }

  async function logJSONData(
    stationName,
    timeOffset,
    status,
    stationFullName,
    departArrive,
    contextURL,
    switchVal
  ) {
    let fromCode = currentCRSCode;

    let displayStation = stationOneD;

    if (status == 0) {
      remStatus = 0;
    }

    if (switchVal == true) {
      let tempVar = fromCode;
      fromCode = secondStation;
      stationName = tempVar;

      tempVar = stationFullName;
      stationFullName = displayStation;
      displayStation = stationTwoD;
    }

    if (displayStation == stationFullName && remStatus == 1) {
      stationFullName = stationTwoD;
      stationName = secondStation;
      // displayStation = stationTwoD;
    }

    if (stationName == "" && remStatus == 1) {
      stationName = secondStation;
      stationFullName = stationTwoD;
    }

    if (stationName == "") {
      stationName = currentCRSCode;
      stationFullName = stationOneD;
    }

    testFetch = 0;

    let response;
    let staffResponse;

    if (remStatus == 1) {
      try {
        response = await fetch(
          "https://" +
            serverName +
            ".azurewebsites.net/" +
            departArrive +
            "/" +
            fromCode +
            "/" +
            contextURL +
            "/" +
            stationName +
            "/150" +
            timeOffset
        );
        staffResponse = await fetch(
          "https://huxley2.azurewebsites.net/" +
            "staff" +
            departArrive +
            "/" +
            fromCode +
            "/" +
            contextURL +
            "/" +
            stationName +
            "/150" +
            timeOffset
        );
      } catch {
        alert(
          "Failed to fetch. Please check internet connection / search criteria."
        );
        failedAlert = true;
      }

      // trainSearch = "Services from " + fromCode + " to " + stationName;
      trainSearch =
        "Services departing from " + displayStation + " for " + stationFullName;
      if (departArrive == "arrivals") {
        trainSearch =
          "Services arriving at " + displayStation + " from " + stationFullName;
      }

      setDisplayFirstStation(displayStation);
      rememberFirstStation = displayStation;
      setDisplaySecondStation(stationFullName);
      rememberSecondStation = stationFullName;

      secondStation = stationName;
      stationTwoD = stationFullName;
      if (testFetch == 1) {
        alert("Network timed out, results may be incorrect.");
      }
    } else if (remStatus == 0) {
      try {
        response = await fetch(
          "https://" +
            serverName +
            ".azurewebsites.net/" +
            departArrive +
            "/" +
            stationName +
            "/150" +
            timeOffset
        );
        staffResponse = await fetch(
          "https://" +
            "huxley2.azurewebsites.net/" +
            "staff" +
            departArrive +
            "/" +
            stationName +
            "/150" +
            timeOffset
        );
      } catch {
        alert(
          "Failed to fetch. Please check internet connection / search criteria."
        );
        failedAlert = true;
      }
      // trainSearch = "Services from " + stationName;
      trainSearch = "Services departing from " + stationFullName;
      if (departArrive == "arrivals") {
        trainSearch = trainSearch = "Services arriving at " + stationFullName;
      }
      setDisplayFirstStation(stationFullName);
      setDisplaySecondStation("");
      rememberFirstStation = stationFullName;
      rememberSecondStation = "";

      setStationTwo("");
      if (testFetch == 1) {
        alert("Network timed out, results may be incorrect.");
      }
    }

    let data;

    try {
      data = await response.json();
      staffData = await staffResponse.json();
      console.log("data is", data);

      liveDeparture = data.trainServices;

      busDeparture = data.busServices;

      currentCRSCode = data.crs;
      stationOneD = data.locationName + " (" + data.crs + ")";

      if (liveDeparture != null && busDeparture != null) {
        var newDeparture = [];
        newDeparture = liveDeparture.concat(busDeparture);
        liveDeparture = newDeparture;
      }

      if (liveDeparture == null && busDeparture != null) {
        liveDeparture = data.busServices;
      }

      if (liveDeparture == null && busDeparture == null) {
        liveDeparture = [];
      }

      console.log("LD", JSON.stringify(liveDeparture[0]));

      displayServiceMessage = "";
      serviceMessage = data.nrccMessages;
      let t = getTrainDepartures();
      departuresList = JSON.stringify(t);

      runLast(timeOffset);
    } catch {
      setIsOpen(false);
      setProcessingState(false);
      if (!failedAlert) {
        failedAlert = true;
        if (serviceMessage != "") {
          alert(serviceMessage[0].value);
        } else {
          alert(
            "Unable to retrieve new results. Previous results may be shown."
          );
        }
      }
      clearAll();
    }
  }

  async function getStation() {
    setTRCSP("Loading...");
    setTRC(
      <CircularProgress
        color="tertiary"
        fourColor
        variant="indeterminate"
        style={{ width: "34px", height: "34px" }}
      />
    );
    setTRCD(
      <CircularProgress
        color="tertiary"
        fourColor
        variant="indeterminate"
        style={{ width: "34px", height: "34px" }}
      />
    );
    const response = await fetch(
      "https://" + serverName + ".azurewebsites.net/crs"
    );
    const data = await response.json();
    listStation = data;
    let t = getStationList();
    stationsList = JSON.stringify(t);
  }

  function getStationList() {
    let listOfStations = [];
    for (let i = 0; i < listStation.length; i++) {
      listOfStations.push(
        listStation[i].stationName + " (" + listStation[i].crsCode + ")"
      );
    }

    const display = listOfStations.map((opt) => ({ label: opt, value: opt }));

    setTRC(
      <Select
        options={display}
        className="selectBox"
        onChange={(opt) =>
          setDropVal(
            opt.value.slice(opt.value.length - 4, -1) +
              handleDepartureClick(
                current,
                opt.value.slice(opt.value.length - 4, -1),
                0,
                opt.value
              )
          ) + setStationOne(opt.value)
        }
      />
    );

    setTRCD(
      <Select
        options={display}
        className="selectBox"
        onChange={(opt) =>
          setDropVal(
            opt.value.slice(opt.value.length - 4, -1) +
              handleDepartureClick(
                current,
                opt.value.slice(opt.value.length - 4, -1),
                1,
                opt.value
              )
          ) +
          setStationTwo(opt.value) +
          { stationTwoD: opt.value }
        }
      />
    );
    setTRCSP(null);
  }

  let navigate = useNavigate();
  const routeChange = (row, index) => {
    var staffUID;
    var staffSDD;
    try {
      staffUID = staffData.trainServices[index].uid;
      staffSDD = staffData.trainServices[index].sdd;
    } catch {
      try {
        staffUID = staffData.busServices[index].uid;
        staffSDD = staffData.busServices[index].sdd;
      } catch {}
    }

    let trainInfo = row;

    row = row.split(" ");
    row = row.pop();

    let path = "/linkPage";
    navigate(path);

    test1(sIdArray[index], trainInfo, staffUID, staffSDD);
  };

  function getTrainDepartures() {
    let stringDepartures = [];
    let sCode = "";
    sIdArray = [];
    let destination2Depart;
    let destination2Via;
    let destination2Origin;

    if (departArrive == "arrivals") {
      for (let i = 0; i < liveDeparture.length; i++) {
        destination2Depart = "";
        destination2Via = "";
        destination2Origin = "";

        sIdArray.push(liveDeparture[i].serviceID);
        if (liveDeparture[i].destination[0].via == null)
          liveDeparture[i].destination[0].via = "";
        if (liveDeparture[i].origin[0].via == null)
          liveDeparture[i].origin[0].via = "";
        if (liveDeparture[i].destination.length > 1) {
          destination2Depart =
            " and " + liveDeparture[i].destination[1].locationName;
          if (liveDeparture[i].destination[1].via != null)
            destination2Via = liveDeparture[i].destination[1].via;
        }
        if (liveDeparture[i].origin.length > 1) {
          destination2Origin =
            " and " + liveDeparture[i].origin[1].locationName;
        }
        if (serviceCode == "Show") {
          sCode = "|" + liveDeparture[i].serviceID;
        } else {
          sCode = "";
        }
        stringDepartures.push(
          liveDeparture[i].sta +
            " " +
            liveDeparture[i].destination[0].locationName +
            " " +
            liveDeparture[i].destination[0].via +
            destination2Depart +
            " " +
            destination2Via +
            " (from " +
            liveDeparture[i].origin[0].locationName +
            liveDeparture[i].origin[0].via +
            destination2Origin +
            ")  " +
            liveDeparture[i].eta +
            "  p." +
            liveDeparture[i].platform +
            sCode
        );
      }
    }
    if (departArrive == "departures") {
      for (let i = 0; i < liveDeparture.length; i++) {
        destination2Depart = "";
        destination2Via = "";
        destination2Origin = "";

        sIdArray.push(liveDeparture[i].serviceID);
        if (liveDeparture[i].destination[0].via == null)
          liveDeparture[i].destination[0].via = "";
        if (liveDeparture[i].origin[0].via == null)
          liveDeparture[i].origin[0].via = "";
        if (liveDeparture[i].destination.length > 1) {
          destination2Depart =
            " and " + liveDeparture[i].destination[1].locationName;
          if (liveDeparture[i].destination[1].via != null)
            destination2Via = liveDeparture[i].destination[1].via;
        }
        if (liveDeparture[i].origin.length > 1) {
          destination2Origin =
            " and " + liveDeparture[i].origin[1].locationName;
        }
        if (serviceCode == "Show") {
          sCode = "|" + liveDeparture[i].serviceID;
        } else {
          sCode = "";
        }
        stringDepartures.push(
          liveDeparture[i].std +
            " " +
            liveDeparture[i].destination[0].locationName +
            " " +
            liveDeparture[i].destination[0].via +
            destination2Depart +
            " " +
            destination2Via +
            " (from " +
            liveDeparture[i].origin[0].locationName +
            liveDeparture[i].origin[0].via +
            destination2Origin +
            ")  " +
            liveDeparture[i].etd +
            "  p." +
            liveDeparture[i].platform +
            sCode
        );
      }
    }

    try {
      for (let i = 0; i < serviceMessage.length; i++) {
        displayServiceMessage += serviceMessage[i].value;
      }

      displayServiceMessage = displayServiceMessage.replaceAll('"', " ");
      displayServiceMessage = displayServiceMessage.replaceAll("\n", " ");
    } catch {}
    return { stringDepartures, displayServiceMessage };
  }

  function toggle() {
    setIsOpen(true);
    setIsOpenForm(false);
  }

  function toggleForm() {
    setIsOpenForm((isOpenForm) => !isOpenForm);
  }

  return (
    <div className="Wrapper2">
      {/* <br/> */}
      <h3 style={{ textAlign: "center" }}>{departArrive}</h3>

      <div className="manualInput">
        <form
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            handleDepartureClick(current);
          }}
        >
          <button
            type="button"
            style={{
              textAlign: "center",
              width: "30px",
              margin: "10px",
              paddingBottom: "3px",
            }}
            onClick={toggleForm}
          >
            {"↨"}
          </button>
          <br />
          {isOpenForm && (
            <text>
              {departArrive == "Departures" ? (
                <p style={{ textAlign: "left" }}>
                  Departure station: {displayFirstStation}
                </p>
              ) : (
                <p style={{ textAlign: "left" }}>
                  Arrival station: {displayFirstStation}
                </p>
              )}
              <text style={{ textAlign: "left" }}>{trcDropDown}</text>
              {departArrive == "Departures" ? (
                <p style={{ textAlign: "left" }}>
                  Destination station (optional): {displaySecondStation}
                </p>
              ) : (
                <p style={{ textAlign: "left" }}>
                  Origin station (optional): {displaySecondStation}
                </p>
              )}
              <text style={{ textAlign: "left" }}>{trcDropDownD}</text>
              <br />
              {trcDropDownSP == "Loading..." && <br />}
              <button
                type="button"
                id="useTrains"
                style={{ fontSize: "small" }}
                onClick={() => handleDepartureClick(contextTime, "SWITCH-st")}
              >
                🔄 Switch stations
              </button>
              <button
                type="button"
                id="useTrains"
                style={{ fontSize: "small" }}
                onClick={() =>
                  handleDepartureClick(
                    contextTime,
                    currentCRSCode,
                    0,
                    rememberFirstStation
                  )
                }
              >
                🗑️ Remove second station
              </button>
              <br />
            </text>
          )}

          <button id="useTrains" type="reset" onClick={clearAll}>
            ❌ Reset
          </button>
          <button
            id="useTrains"
            type="button"
            onClick={() => handleDepartureClick(current)}
          >
            🔎 View/Refresh results
          </button>
        </form>
      </div>
      {processingState ? (
        <>
          <div style={{ height: "6.75px" }} />
          <LinearProgress color="secondary" fourColor />
          <div style={{ height: "6.75px" }} />
        </>
      ) : (
        <>
          <hr />
        </>
      )}

      <div>
        {isOpen && (
          <div>
            {trainSearch}
            <br />
            <p className="highlights">
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  fontFamily: "unset",
                  marginBottom: "-20px",
                  marginTop: "-1px",
                }}
              >
                <text style={{ wordBreak: "break-word", hyphens: "auto" }}>
                  {textInfo}
                </text>
              </pre>
              <br />

              {/* <div>
                {newsLink[0]?.map((row) => (
                  <a href={row}>
                    <br />
                    <text style={{ wordBreak: "break-word", hyphens: "auto" }}>
                      {row}
                    </text>
                  </a>
                ))}
              </div> */}
            </p>
            <br />
            <button
              className="changeTime"
              style={{ marginBottom: "10px" }}
              onClick={() => handleDepartureClick(earlier)}
            >
              120 - 100 minutes ago
            </button>
            <br />
            <button
              className="changeTime"
              style={{ marginBottom: "10px" }}
              onClick={() => handleDepartureClick(earlier2)}
            >
              100 minutes ago - present
            </button>
            <br />
            <br />
            <Table
              className="transactions"
              style={{ backgroundColor: "#f0f0f0" }}
            >
              {stringDepartures.map((departures, index) => (
                <tr
                  data-index={index}
                  className="tableTR"
                  onClick={() => routeChange(departures, index)}
                >
                  <td>{departures}</td>
                  <br />
                  <br />
                  <br />
                </tr>
              ))}
            </Table>
            <br />
            <button
              className="changeTime"
              style={{ marginTop: "40px" }}
              onClick={() => handleDepartureClick(later)}
            >
              100 minutes later
            </button>
            <br />
            <button
              className="changeTime"
              style={{ marginTop: "10px" }}
              onClick={() => handleDepartureClick(later2)}
            >
              100 - 120 minutes later
            </button>
            <br />
            <br />
          </div>
        )}
      </div>

      <div className="NRLogo">
        <img src={image} alt="powered by National Rail Enquiries" width="256" />
      </div>
    </div>
  );
}
