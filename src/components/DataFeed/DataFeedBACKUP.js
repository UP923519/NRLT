import React, { useState, useEffect } from "react";
import "../App/App.css";
import { Table } from "react-bootstrap";
import Select from "react-select";
import image from "../../assets/nre-logo.png";
import { useNavigate } from "react-router-dom";
import { test1 } from "../Link/LinkPage";

let liveArrival = "";

let busDeparture = "";
let listStation = "";

let currentCRSCode;

let serviceMessage = "";
let displayServiceMessage = "";
let current = "";
let earlier = "?timeOffset=-120&timeWindow=120";
let earlier2 = "?timeOffset=-82&timeWindow=120";
let later = "?timeOffset=82&timeWindow=120";
let later2 = "?timeOffset=119&timeWindow=120";

var htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

let arrivalsList = "test";
let stationsList = "";

let textInfo = "There are no messages";
let newsLinkEx = new RegExp(
  "(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))",
  "g"
);
let newsLink = [];

let myArray = [];
let sIdArray = [];
let failedAlert;

let stationFullName;

export default function DataFeed() {
  const [stringArrivals, setArrivals] = useState([]);
  const [formVal, setFormVal] = useState("");
  const [dropVal, setDropVal] = useState("");
  const [trcDropDown, setTRC] = useState("");
  const [stationOne, setStationOne] = useState("");

  const [isOpen, setIsOpen] = useState(true);
  const [isOpenForm, setIsOpenForm] = useState(true);

  useEffect(() => {
    setArrivals(myArray);
    getStation();

    if (myArray == "") {
      setIsOpen(false);
    }
  }, []);

  function clearAll(e) {
    setArrivals([]);
    textInfo = "There are no messages";
    newsLink = [];
    setIsOpen(false);
    setIsOpenForm(true);
  }

  const displayAction = false;

  function handleArrivalClick(timeOffset, code) {
    setArrivals(["Loading..."]);
    toggle();

    try {
      if (code != undefined) {
        JSON.stringify(logJSONData(code, timeOffset));
        setFormVal(code);
      } else {
        JSON.stringify(logJSONData(formVal, timeOffset));
      }
    } catch {
      JSON.stringify(logJSONData(formVal, timeOffset));
    }
  }

  function runLast() {
    arrivalsList = arrivalsList.replaceAll("p.null", "p.N/A");

    myArray = arrivalsList.split('"');

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

    let brokentextInfo = textInfo.split(" ");
    let found = 0;
    let showLinks = false;

    try {
      for (let i = 0; i < newsLink[0].length; i++) {
        newsLink[0][i] = newsLink[0][i].substring(1);
      }
    } catch {}

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

    textInfo = brokentextInfo;

    myArray = myArray.slice(0, -2);

    if (myArray == "") {
      alert("No results found. Check earlier/later times.");
    }

    setArrivals(myArray);
  }

  async function logJSONData(stationName, timeOffset) {
    if (stationName == "") {
      stationName = currentCRSCode;
    }

    let response;

    try {
      response = await fetch(
        "https://huxley2.azurewebsites.net/arrivals/" +
          stationName +
          "/150" +
          timeOffset
      );
    } catch {
      alert(
        "Failed to fetch. Please check internet connection / search criteria."
      );
      failedAlert = true;
      setIsOpen(false);
    }

    try {
      const data = await response.json();

      liveArrival = data.trainServices;
      busDeparture = data.busServices;

      currentCRSCode = data.crs;

      if (liveArrival == null && busDeparture != null) {
        liveArrival = data.busServices;
      }

      if (liveArrival == null && busDeparture == null) {
        liveArrival = [];
      }

      displayServiceMessage = "";
      serviceMessage = data.nrccMessages;
      let t = getTrainArrivals();
      arrivalsList = JSON.stringify(t);

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
        onChange={(opt) =>
          setDropVal(
            opt.value.slice(opt.value.length - 4, -1) +
              handleArrivalClick(
                current,
                opt.value.slice(opt.value.length - 4, -1)
              )
          ) +
          setStationOne(opt.value) +
          rememberStation(opt.value)
        }
      />
    );
  }

  function rememberStation(stationName) {
    stationFullName = stationName;
  }

  let navigate = useNavigate();
  const routeChange = (number, index) => {
    let trainInfo = number;

    number = number.split(" ");
    number = number.pop();

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
      <h3 style={{ textAlign: "center" }}>Arrivals</h3>

      <div className="manualInput">
        <form
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            handleArrivalClick(current);
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
              <p style={{ textAlign: "left" }}>Arrival station: </p>
              <text style={{ textAlign: "left" }}>{trcDropDown}</text>
              {/* <p>Or select from the menu below:<br/></p>
          <label>
            Arrival station&nbsp; <input style = {{backgroundColor: "#cfcfcf", border: "0", borderRadius: "2px"}}
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
            onClick={() => handleArrivalClick(current)}
          >
            View/Refresh live arrivals
          </button>
        </form>
      </div>
      <hr />

      <div className="App">
        {isOpen && (
          <div>
            Services arriving at {stationFullName}
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
              onClick={() => handleArrivalClick(earlier)}
            >
              120 - 100 minutes ago
            </button>
            <br />
            <button
              className="changeTime"
              style={{ marginBottom: "10px" }}
              onClick={() => handleArrivalClick(earlier2)}
            >
              100 minutes ago - present
            </button>
            <br />
            <br />
            <Table
              className="transactions"
              style={{ backgroundColor: "#f0f0f0" }}
            >
              {stringArrivals.map((arrivals, index) => (
                <tr
                  data-index={index}
                  className="tableTR"
                  onClick={() => routeChange(arrivals, index)}
                >
                  <td>{arrivals}</td>
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
              onClick={() => handleArrivalClick(later)}
            >
              100 minutes later
            </button>
            <br />
            <button
              className="changeTime"
              style={{ marginTop: "10px" }}
              onClick={() => handleArrivalClick(later2)}
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

function getTrainArrivals(stationName) {
  let stringArrivals = [];
  sIdArray = [];
  for (let i = 0; i < liveArrival.length; i++) {
    sIdArray.push(liveArrival[i].serviceID);
    if (liveArrival[i].destination[0].via == null)
      liveArrival[i].destination[0].via = "";
    if (liveArrival[i].origin[0].via == null) liveArrival[i].origin[0].via = "";
    stringArrivals.push(
      liveArrival[i].sta +
        " " +
        liveArrival[i].destination[0].locationName +
        " " +
        liveArrival[i].destination[0].via +
        " (from " +
        liveArrival[i].origin[0].locationName +
        liveArrival[i].origin[0].via +
        ")  " +
        liveArrival[i].eta +
        "  p." +
        liveArrival[i].platform
    );
  }

  try {
    for (let i = 0; i < serviceMessage.length; i++) {
      displayServiceMessage += serviceMessage[i].value;
    }

    displayServiceMessage = displayServiceMessage.replaceAll('"', " ");
    displayServiceMessage = displayServiceMessage.replaceAll("\n", " ");
  } catch {}

  return { stringArrivals, displayServiceMessage };
}
