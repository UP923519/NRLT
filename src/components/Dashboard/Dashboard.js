import React, { useState, useEffect } from "react";
import "../App/App.css";
import { Table } from "react-bootstrap";
import Select from "react-select";
import image from "../../assets/nre-logo.png";
import Dashboard1 from "../Link/LinkPage";
import { useNavigate } from "react-router-dom";
import { test1 } from "../Link/LinkPage";

let liveDeparture = "";
let busDeparture = "";

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

let textInfo = "There are no messages";
let trainSearch = "";
let newsLinkEx = new RegExp(
  "(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))",
  "g"
);
let newsLink = [];

let myArray = [];

let sIdArray = [];

export default function Dashboard() {
  const [stringDepartures, setDepartures] = useState([]);
  const [formVal, setFormVal] = useState("");
  const [rememberStation, setRememberStation] = useState("");
  const [dropVal, setDropVal] = useState("");
  const [trcDropDown, setTRC] = useState("");
  const [trcDropDownD, setTRCD] = useState("");
  const [stationOne, setStationOne] = useState();
  const [stationTwo, setStationTwo] = useState();
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenForm, setIsOpenForm] = useState(true);

  useEffect(() => {
    setDepartures(myArray);
    getStation();

    if (myArray == "") {
      setIsOpen(false);
    }
  }, []);

  function clearValue() {
    setTRC(null);
    setTRCD(null);
    getStation();
  }

  function clearAll(e) {
    setDepartures([]);
    textInfo = "There are no messages";
    newsLink = [];
    remStatus = "";
    clearValue();
    setIsOpen(false);
    setIsOpenForm(true);
  }

  const displayAction = false;

  function handleDepartureClick(timeOffset, code, status, stationFullName) {
    setDepartures(["Loading..."]);

    toggle();

    if (remStatus == "" || remStatus == undefined) {
      remStatus = status;
      if (status == undefined && remStatus == undefined) {
        remStatus = 0;
      }
    }

    try {
      if (code != undefined) {
        JSON.stringify(logJSONData(code, timeOffset, status, stationFullName));
        setFormVal(code);
        setRememberStation(stationFullName);
      } else {
        JSON.stringify(
          logJSONData(formVal, timeOffset, remStatus, rememberStation)
        );
      }
    } catch {
      JSON.stringify(
        logJSONData(formVal, timeOffset, remStatus, rememberStation)
      );
    }
  }

  function runLast() {
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

    myArray = myArray.slice(0, -2);

    if (myArray == "") {
      alert("No results found");
    }

    setDepartures(myArray);
    testFetch = 1;

    if (remStatus == 1) {
      clearValue();
    }
  }

  async function logJSONData(stationName, timeOffset, status, stationFullName) {
    let fromCode = currentCRSCode;
    let displayStation = stationOneD;

    if (stationName == "" && remStatus == 1) {
      stationName = secondStation;
      stationFullName = stationTwoD;
    }

    if (stationName == "") {
      stationName = currentCRSCode;
      stationFullName = stationOneD;
    }

    if (status == 0) {
      remStatus = 0;
    }

    testFetch = 0;

    let response;
    let failedAlert;

    if (remStatus == 1) {
      try {
        response = await fetch(
          "https://huxley2.azurewebsites.net/departures/" +
            fromCode +
            "/to/" +
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
      trainSearch = "Services from " + fromCode + " to " + stationName;
      trainSearch =
        "Services from " + displayStation + " to " + stationFullName;

      secondStation = stationName;
      stationTwoD = stationFullName;
      if (testFetch == 1) {
        alert("Network timed out, results may be incorrect.");
      }
    } else if (remStatus == 0) {
      try {
        response = await fetch(
          "https://huxley2.azurewebsites.net/departures/" +
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
      trainSearch = "Services from " + stationName;
      trainSearch = "Services from " + stationFullName;

      setStationTwo("");
      if (testFetch == 1) {
        alert("Network timed out, results may be incorrect.");
      }
    }

    let data;

    try {
      data = await response.json();

      console.log("data is", data);
      liveDeparture = data.trainServices;
      busDeparture = data.busServices;

      currentCRSCode = data.crs;
      stationOneD = data.locationName + " (" + data.crs + ")";

      if (liveDeparture == null && busDeparture != null) {
        liveDeparture = data.busServices;
      }

      if (liveDeparture == null && busDeparture == null) {
        liveDeparture = [];
      }

      displayServiceMessage = "";
      serviceMessage = data.nrccMessages;
      let t = getTrainDepartures();
      departuresList = JSON.stringify(t);

      runLast();
    } catch {
      if (!failedAlert)
        alert("Unable to retrieve new results. Previous results may be shown.");
      setIsOpen(false);
    }
  }

  async function getStation() {
    const response = await fetch("https://huxley2.azurewebsites.net/crs");
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
  }

  let navigate = useNavigate();
  const routeChange = (row, index) => {
    let trainInfo = row;
    console.log("CRS is", liveDeparture[index].serviceID);

    row = row.split(" ");
    row = row.pop();

    let path = "/linkPage";
    navigate(path);

    test1(sIdArray[index], trainInfo);
  };

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
      <h3 style={{ textAlign: "center" }}>Departures</h3>

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
              <p style={{ textAlign: "left" }}>Departure station: </p>
              <text style={{ textAlign: "left" }}>{trcDropDown}</text>
              <p style={{ textAlign: "left" }}>
                Destination station (optional):{" "}
              </p>
              <text style={{ textAlign: "left" }}>{trcDropDownD}</text>

              {/* <p>Or type station name manually: </p> */}
              {/* <label>
            Enter manually: &nbsp; <input style = {{backgroundColor: "#cfcfcf", border: "0", borderRadius: "2px"}}
            name="formVal" defaultValue=""
            onChange={(event) => setFormVal(event.target.value)}/>
          </label> */}
              <br />
            </text>
          )}
          <button id="useTrains" type="reset" onClick={clearAll}>
            Reset
          </button>
          <button
            id="useTrains"
            type="button"
            onClick={() => handleDepartureClick(current)}
          >
            View/Refresh live departures
          </button>
        </form>
      </div>
      <hr />

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
                {textInfo}
              </pre>
              <br />

              <div>
                {newsLink[0]?.map((row) => (
                  <a href={row}>
                    <br />
                    <text style={{ wordBreak: "break-word", hyphens: "auto" }}>
                      {row}
                    </text>
                  </a>
                ))}
              </div>
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

function getTrainDepartures(stationName) {
  let stringDepartures = [];
  sIdArray = [];
  for (let i = 0; i < liveDeparture.length; i++) {
    sIdArray.push(liveDeparture[i].serviceID);
    if (liveDeparture[i].destination[0].via == null)
      liveDeparture[i].destination[0].via = "";
    if (liveDeparture[i].origin[0].via == null)
      liveDeparture[i].origin[0].via = "";
    stringDepartures.push(
      liveDeparture[i].std +
        " " +
        liveDeparture[i].destination[0].locationName +
        " " +
        liveDeparture[i].destination[0].via +
        " (from " +
        liveDeparture[i].origin[0].locationName +
        liveDeparture[i].origin[0].via +
        ")  " +
        liveDeparture[i].etd +
        "  p." +
        liveDeparture[i].platform
    );
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
