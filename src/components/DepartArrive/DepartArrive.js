import React, { useState, useEffect } from "react";
import "../App/App.css";
import { Table } from "react-bootstrap";
import Select from "react-select";
import image from "../../assets/nre-logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { test1 } from "../Link/servicePage.js";
import { currentAzure, serviceCode } from "../Settings/Settings";
import TrainBus from "./trainBus.js";
import LinearProgress from "@mui/material-next/LinearProgress";
import Fade from "react-reveal/Fade";
import { Box, Button, Menu, MenuItem, Tooltip, tooltip } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import zIndex from "@mui/material/styles/zIndex.js";
import StationHistoryChip from "./stationHistoryChip.js";
import axios from "axios";
import SelectDate from "./selectDate.js";

let liveDeparture = "";
let busDeparture = "";
let saveLD = "";
let saveBD = "";
let staffData = "";
let staffDataBus = "";
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
let textInfo = "loading...";
let nrccMessages;
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
let serverName = "trainwebappv2";
let rememberFirstStation;
let rememberSecondStation;
let rememberTimeOffset;
let busDisplayMode = "train";
let showBuses = false;
let rememberDateTime = [];

const _ = require("lodash");
const headersListDepart = {
  // "User-Agent": "",
  "x-apikey": "ee4CjRuGqLDyGq1R9bwq9EdhheNIslgdUNi5ZVOwqZMiojLZ",
};

const headersListArrive = {
  // "User-Agent": "",
  "x-apikey": "aNxkm3kLx1Yp0S6udbhbD8kteo8Z7k8tcS7HNUOf7uLe9OTG",
};

export default function DepartArrive(departArrive) {
  // const [departArrive, setDepartArrive] = useState();
  const { state } = useLocation();
  const location = useLocation();
  const [stringDepartures, setDepartures] = useState([]);
  const [formVal, setFormVal] = useState("");
  const [rememberStation, setRememberStation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(true);
  const [processingState, setProcessingState] = useState(false);
  const [activeBus, setActiveBus] = useState("white");
  const [activeTrain, setActiveTrain] = useState("white");
  const [activeBusT, setActiveBusT] = useState("white");
  const [activeTrainT, setActiveTrainT] = useState("white");
  const [busDisabled, setBusDisabled] = useState(false);
  const [trainDisabled, setTrainDisabled] = useState(false);
  const [timeButton, setTimeButton] = useState("");
  const [listOfStations, setListOfStations] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const [tTSMOpen, setTTSMOpen] = useState(false);

  const open = Boolean(anchorEl);

  const today = new Date();
  const todayModified = new Date();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const year = today.getFullYear();
  const day = ("0" + today.getDate()).slice(-2);
  const hours = ("0" + today.getHours()).slice(-2);
  const minutes = ("0" + today.getMinutes()).slice(-2);
  const seconds = ("0" + today.getSeconds()).slice(-2);

  const earlier = todayModified.getHours() - 2;
  const earlier2 = todayModified.getHours() - 1;
  const later = todayModified.getHours() + 1;
  const later2 = todayModified.getHours() + 2;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTooltipClose = () => {
    setTTSMOpen(false);
  };

  const handleTooltipOpen = () => {
    setTTSMOpen(true);
  };

  useEffect(() => {
    if (currentAzure == "External") {
      serverName = "huxley2";
    } else if (currentAzure == "Local") {
      serverName = "trainwebappv2";
    }

    if (serviceCode == "Show") {
    }

    if (saveLD != null && saveBD != null) {
      if (busDisplayMode == "bus") {
        setActiveBus("#0080ff");
        setActiveBusT("white");
        setActiveTrain("white");
        setActiveTrainT("black");
        setBusDisabled(false);
        setTrainDisabled(false);
      } else {
        setTrainDisabled(false);
        setBusDisabled(false);

        setActiveTrain("#0080ff");
        setActiveTrainT("white");
        setActiveBus("white");
        setActiveBusT("black");
      }
    }

    if (saveLD == null && saveBD != null) {
      setTrainDisabled(true);
      setBusDisabled(false);
      setActiveTrain("#f5f5f5");
      setActiveTrainT("#d1d1d1");
      if (busDisplayMode == "train") {
        alert(
          "No train services available at this time. Bus services are available."
        );
      }
      busDisplayMode = "bus";
      setActiveBus("#0080ff");
      setActiveBusT("white");
    }

    if (saveLD != null && saveBD == null) {
      setBusDisabled(true);
      setTrainDisabled(false);
      setActiveBus("#f5f5f5");
      setActiveBusT("#d1d1d1");
      setActiveTrain("#0080ff");
      setActiveTrainT("white");
    }

    if (saveLD == null && saveBD == null) {
      setBusDisabled(true);
      setActiveBus("#f5f5f5");
      setActiveBusT("#d1d1d1");
      setTrainDisabled(true);
      setActiveTrain("#f5f5f5");
      setActiveTrainT("#d1d1d1");
    }

    setDepartures(myArray);
    getStation();

    if (myArray == "" || failedAlert == true) {
      setIsOpen(false);
      setProcessingState(false);
    } else {
      setIsOpen(true);

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

    if (state && state.crs) {
      handleDepartureClick(current, state.crs, 0, state.locationName);
      navigate(location.pathname, {}); //clears state
    }

    if (textInfo === "cleared") {
      setIsOpen(false);
    }
  }, [state]);

  function clearValue() {
    getStation();
  }

  function clearAll(e) {
    setDepartures([]);
    textInfo = "cleared";
    newsLink = [];
    remStatus = "";
    trainSearch = "";
    clearValue();
    setIsOpen(false);
    setProcessingState(false);
    setIsOpenForm(true);
    rememberFirstStation = "";
    rememberSecondStation = "";
    setSelectedTime(hours + ":" + minutes);
    setSelectedDay(year + "-" + month + "-" + day);
  }

  function handleDepartureClick(timeOffset, code, status, stationFullName) {
    //validation on submit of boxes
    if (!stationFullName && !rememberFirstStation) {
      alert(
        "The " +
          departArrive.slice(0, -1) +
          " station is blank. Please select from the drop down menu."
      );
      return;
    }
    if (status == 1) {
      if (stationFullName === rememberFirstStation) {
        alert(
          "The second station cannot be the same as the " +
            departArrive.slice(0, -1) +
            " station."
        );
        return;
      }
    }
    //validation end
    setProcessingState(true);
    setIsOpen(false);
    setTimeButton(timeOffset);
    setDepartures(["Loading..."]);
    textInfo = "loading...";
    trainSearch = "loading...";
    rememberTimeOffset = timeOffset;

    //Save History
    if (stationFullName) {
      let currentHistory = localStorage.getItem("stationHistory");
      let historyArray;
      if (currentHistory) {
        historyArray = currentHistory.split(",").slice(0, 9);
        if (!historyArray.includes(stationFullName)) {
        } else {
          let existingPosition = historyArray.findIndex(
            (element) => element == stationFullName
          );
          historyArray.splice(existingPosition, 1);
        }
        if (historyArray.length > 0)
          localStorage.setItem("stationHistory", [
            stationFullName,
            historyArray,
          ]);
      } else {
        localStorage.setItem("stationHistory", [stationFullName]);
      }
    }
    //EndSaveHistory

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
      showBuses = true;
      if (textInfo.includes("no messages for this station")) {
        textInfo =
          "Rail replacement bus services may be in use at this station. Select 'Show Bus Services' in the menu above to view bus services.";
      } else {
        textInfo +=
          "\n\nRail replacement bus services may be in use at this station. Select 'Show Bus Services' in the menu above to view bus services.";
      }
    } else {
      showBuses = false;
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
    navigator.vibrate(1);
    if (remStatus == 1) {
      clearValue();
    }
    setIsOpen(true);
    setProcessingState(false);
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
    let staffResponseBus;

    let offsetHours;
    let offsetMinutes;

    let offsetDays;
    let offsetMonths;
    let offsetYears;

    offsetHours = timeOffset;

    if (selectedTime !== null) {
      offsetHours = selectedTime.split(":")[0];
      offsetMinutes = selectedTime.split(":")[1];
    } else {
      if (rememberDateTime[0]) {
        offsetHours = rememberDateTime[0].split(":")[0];
        offsetMinutes = rememberDateTime[0].split(":")[1];
      } else {
        offsetHours = hours;
        offsetMinutes = minutes;
      }
    }

    if (selectedDay !== null) {
      offsetDays = selectedDay.split("-")[2];
      offsetMonths = selectedDay.split("-")[1];
      offsetYears = selectedDay.split("-")[0];
    } else {
      if (rememberDateTime[1]) {
        offsetDays = rememberDateTime[1].split("-")[2];
        offsetMonths = rememberDateTime[1].split("-")[1];
        offsetYears = rememberDateTime[1].split("-")[0];
      } else {
        offsetDays = day;
        offsetMonths = month;
        offsetYears = year;
      }
    }

    let deparrurl1;
    let deparrurl2;
    let deparrurl3;

    if (departArrive == "departures") {
      deparrurl1 = "departure";
      deparrurl2 = "Dep";
      deparrurl3 = "";
    } else {
      deparrurl1 = "arrival";
      deparrurl2 = "Arr";
      deparrurl3 = "filterType=from";
    }

    let saveError;
    if (remStatus == 1) {
      // REQUEST FOR 2 STATIONS
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
            "/10" +
            timeOffset
        );
        // staffResponse = await fetch(
        //   "https://" +
        //     serverName +
        //     ".azurewebsites.net/" +
        //     "staff" +
        //     departArrive +
        //     "/" +
        //     fromCode +
        //     "/" +
        //     contextURL +
        //     "/" +
        //     stationName +
        //     "/10" +
        //     timeOffset
        // );

        const runSearchFetch = async (bus) => {
          let response;
          if (bus == "bus") {
            response = await axios
              .request(reqOptionsBus)
              .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  saveError = error.response.data["Message"];
                }
              });
          } else {
            response = await axios.request(reqOptions).catch(function (error) {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                saveError = error.response.data["Message"];
              }
            });
          }
          return response.data;
        };

        let reqOptions = {
          url:
            "https://api1.raildata.org.uk/1010-live-" +
            deparrurl1 +
            "-board---staff-version1_0/LDBSVWS/api/20220120/Get" +
            deparrurl2 +
            "BoardWithDetails/" +
            fromCode +
            "/" +
            offsetYears +
            offsetMonths +
            offsetDays +
            "T" +
            offsetHours +
            offsetMinutes +
            "00" +
            "?" +
            "timeWindow=" +
            "120" +
            "&" +
            "filterCRS=" +
            stationName +
            "&" +
            deparrurl3,
          method: "GET",
          headers:
            (departArrive == "departures" && headersListDepart) ||
            headersListArrive,
        };

        let reqOptionsBus = {
          url:
            "https://api1.raildata.org.uk/1010-live-" +
            deparrurl1 +
            "-board---staff-version1_0/LDBSVWS/api/20220120/Get" +
            deparrurl2 +
            "BoardWithDetails/" +
            fromCode +
            "/" +
            offsetYears +
            offsetMonths +
            offsetDays +
            "T" +
            offsetHours +
            offsetMinutes +
            "00" +
            "?" +
            "timeWindow=" +
            "120" +
            "&" +
            "filterCRS=" +
            stationName +
            "&" +
            deparrurl3 +
            "&" +
            "services=B",
          method: "GET",
          headers:
            (departArrive == "departures" && headersListDepart) ||
            headersListArrive,
        };

        let staffResponse1 = await runSearchFetch();
        let staffResponse1Bus = await runSearchFetch("bus");
        staffResponse = staffResponse1;
        staffResponseBus = staffResponse1Bus;
      } catch {
        alert(
          "Failed to fetch. Please check internet connection / search criteria. Server returned the following error: " +
            saveError
        );
        failedAlert = true;
      }
      trainSearch =
        "Services departing from " + displayStation + " for " + stationFullName;
      if (departArrive == "arrivals") {
        trainSearch =
          "Services arriving at " + displayStation + " from " + stationFullName;
      }
      rememberFirstStation = displayStation;
      rememberSecondStation = stationFullName;
      secondStation = stationName;
      stationTwoD = stationFullName;
      if (testFetch == 1) {
        alert("Network timed out, results may be incorrect.");
      }
    } else if (remStatus == 0) {
      // REQUEST FOR 1 STATION

      try {
        response = await fetch(
          "https://" +
            serverName +
            ".azurewebsites.net/" +
            departArrive +
            "/" +
            stationName +
            "/10" +
            timeOffset
        );
        // staffResponse = await fetch(
        //   "https://" +
        //     serverName +
        //     ".azurewebsites.net/" +
        //     "staff" +
        //     departArrive +
        //     "/" +
        //     stationName +
        //     "/10" +
        //     timeOffset
        // );

        ////////////////////////////////////
        const runSearchFetch = async (bus) => {
          let response;
          if (bus == "bus") {
            response = await axios
              .request(reqOptionsBus)
              .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  saveError = error.response.data["Message"];
                }
              });
          } else {
            response = await axios.request(reqOptions).catch(function (error) {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                saveError = error.response.data["Message"];
              }
            });
          }
          return response.data;
        };

        let reqOptions = {
          url:
            "https://api1.raildata.org.uk/1010-live-" +
            deparrurl1 +
            "-board---staff-version1_0/LDBSVWS/api/20220120/Get" +
            deparrurl2 +
            "BoardWithDetails/" +
            stationName +
            "/" +
            offsetYears +
            offsetMonths +
            offsetDays +
            "T" +
            offsetHours +
            offsetMinutes +
            "00" +
            "?" +
            "timeWindow=" +
            "120",
          method: "GET",
          headers:
            (departArrive == "departures" && headersListDepart) ||
            headersListArrive,
        };

        let reqOptionsBus = {
          url:
            "https://api1.raildata.org.uk/1010-live-" +
            deparrurl1 +
            "-board---staff-version1_0/LDBSVWS/api/20220120/Get" +
            deparrurl2 +
            "BoardWithDetails/" +
            stationName +
            "/" +
            offsetYears +
            offsetMonths +
            offsetDays +
            "T" +
            offsetHours +
            offsetMinutes +
            "00" +
            "?" +
            "timeWindow=" +
            "120" +
            "&" +
            "services=B",
          method: "GET",
          headers:
            (departArrive == "departures" && headersListDepart) ||
            headersListArrive,
        };

        let staffResponse1 = await runSearchFetch();
        let staffResponse1Bus = await runSearchFetch("bus");

        staffResponse = staffResponse1;
        staffResponseBus = staffResponse1Bus;

        /////////////////////////////////////
      } catch {
        alert(
          "Failed to fetch. Please check internet connection / search criteria. Server returned the following error: " +
            saveError
        );
        failedAlert = true;
      }
      // trainSearch = "Services from " + stationName;
      trainSearch = "Services departing from " + stationFullName;
      if (departArrive == "arrivals") {
        trainSearch = trainSearch = "Services arriving at " + stationFullName;
      }
      rememberFirstStation = stationFullName;
      rememberSecondStation = "";
      if (testFetch == 1) {
        alert("Network timed out, results may be incorrect.");
      }
    }
    let data;
    try {
      data = await response.json();
      // staffData = await staffResponse.json();
      staffData = staffResponse;
      staffDataBus = staffResponseBus;
      nrccMessages = staffData.nrccMessages;
      liveDeparture = staffData.trainServices;
      busDeparture = staffDataBus.busServices;
      saveLD = staffData.trainServices;
      saveBD = staffDataBus.busServices;
      currentCRSCode = staffData.crs;
      stationOneD = staffData.locationName + " (" + staffData.crs + ")";
      if (staffData.trainServices == null) {
      } else {
      }
      if (staffData.trainServices != null && staffDataBus.busServices != null) {
        if (busDisplayMode == "bus") {
          liveDeparture = busDeparture;
          setActiveBus("#0080ff");
          setActiveBusT("white");
          setActiveTrain("white");
          setActiveTrainT("black");
          setBusDisabled(false);
          setTrainDisabled(false);
        } else {
          setTrainDisabled(false);
          setBusDisabled(false);
          setActiveTrain("#0080ff");
          setActiveTrainT("white");
          setActiveBus("white");
          setActiveBusT("black");
        }
      }
      if (staffData.trainServices == null && staffDataBus.busServices != null) {
        setTrainDisabled(true);
        setBusDisabled(false);
        setActiveTrain("#f5f5f5");
        setActiveTrainT("#d1d1d1");
        liveDeparture = staffDataBus.busServices;
        if (busDisplayMode == "train") {
          alert(
            "No train services available at this time. Bus services are available."
          );
        }
        busDisplayMode = "bus";
        setActiveBus("#0080ff");
        setActiveBusT("white");
      }
      if (staffData.trainServices != null && staffDataBus.busServices == null) {
        setBusDisabled(true);
        setTrainDisabled(false);
        setActiveBus("#f5f5f5");
        setActiveBusT("#d1d1d1");
        setActiveTrain("#0080ff");
        setActiveTrainT("white");
        liveDeparture = staffData.trainServices;
      }
      if (staffData.trainServices == null && staffDataBus.busServices == null) {
        liveDeparture = [];
        setBusDisabled(true);
        setActiveBus("#f5f5f5");
        setActiveBusT("#d1d1d1");
        setTrainDisabled(true);
        setActiveTrain("#f5f5f5");
        setActiveTrainT("#d1d1d1");
      }
      displayServiceMessage = "";
      serviceMessage = staffData.nrccMessages;
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
    const response = await fetch(
      "https://" + serverName + ".azurewebsites.net/crs"
    );
    const data = await response.json();
    listStation = data;
    let t = getStationList();
  }

  function getStationList() {
    let listOfStations = [];
    for (let i = 0; i < listStation.length; i++) {
      listOfStations.push(
        listStation[i].stationName + " (" + listStation[i].crsCode + ")"
      );
    }

    const display = listOfStations.map((opt) => ({ label: opt, value: opt }));
    setListOfStations(display);
  }

  let navigate = useNavigate();
  const routeChange = (row, index) => {
    let staffUID;
    let staffSDD;
    let staffRID;
    try {
      staffUID = staffData.trainServices[index].uid;
      staffSDD = staffData.trainServices[index].sdd;
      staffRID = staffData.trainServices[index].rid;
    } catch {
      try {
        staffUID = staffDataBus.busServices[index].uid;
        staffSDD = staffDataBus.busServices[index].sdd;
        staffRID = staffDataBus.busServices[index].rid;
      } catch {}
    }

    if (showBuses == true) {
      if (busDisplayMode == "bus") {
        staffUID = staffDataBus.busServices[index].uid;
        staffSDD = staffDataBus.busServices[index].sdd;
        staffRID = staffDataBus.busServices[index].rid;
      }
    }
    let trainInfo = row;
    row = row.split(" ");
    row = row.pop();
    let path = "/linkPage";
    navigate(path);
    test1(
      sIdArray[index],
      trainInfo,
      staffUID,
      staffSDD,
      staffRID,
      rememberFirstStation,
      liveDeparture[index]
    );
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
          "<b>" +
            liveDeparture[i].sta.slice(11, 16) +
            "</b>" +
            " " +
            (liveDeparture[i].eta
              ? "<text style=background:white;color:" +
                (liveDeparture[i].eta.slice(11, 16) ==
                liveDeparture[i].sta.slice(11, 16)
                  ? "#008200"
                  : "#e36c54") +
                ";padding-left:5px;padding-right:5px;border-radius:20px;>" +
                liveDeparture[i].eta.slice(11, 16) +
                "&nbsp;⏱" +
                "</text>"
              : liveDeparture[i].ata
              ? liveDeparture[i].ata.slice(11, 16) ==
                liveDeparture[i].sta.slice(11, 16)
                ? "<text style=background:green;color:white;padding-left:5px;padding-right:5px;border-radius:20px;>" +
                  liveDeparture[i].ata.slice(11, 16) +
                  "</text>"
                : "<text style=background:#969696;color:white;padding-left:5px;padding-right:5px;border-radius:20px;>" +
                  liveDeparture[i].ata.slice(11, 16) +
                  "</text>"
              : liveDeparture[i].isCancelled
              ? "<text style=background:#000000;color:white;padding-left:5px;padding-right:5px;border-radius:20px;>" +
                "Cancelled" +
                "&nbsp;❌" +
                "</text>"
              : liveDeparture[i].departureType == "NoLog"
              ? "<text style=background:white;padding-left:5px;padding-right:5px;border-radius:20px;>" +
                "Not Recorded" +
                "</text>"
              : "<text style=background:red;color:white;padding-left:5px;padding-right:5px;border-radius:20px;>" +
                "Delayed" +
                "</text>") +
            "&nbsp;<text style=font-size:small;color:#696969>" +
            liveDeparture[i].operator +
            "</text>" +
            "<br/>" +
            "<text class=tabletitle >" +
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
            "</text>" +
            "<br/>" +
            "<text style=position:relative;>" +
            "  Platform " +
            "<text style=background:" +
            (!isNaN(liveDeparture[i].platform) ? "green" : "#e88c79") +
            ";color:white;padding-left:5px;padding-right:5px;border-radius:20px;>" +
            (liveDeparture[i].platform ? liveDeparture[i].platform : "N/A") +
            "</text>" +
            "</text>" +
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
          "<b>" +
            liveDeparture[i].std.slice(11, 16) +
            "</b>" +
            " " +
            (liveDeparture[i].etd
              ? "<text style=background:white;color:" +
                (liveDeparture[i].etd.slice(11, 16) ==
                liveDeparture[i].std.slice(11, 16)
                  ? "#008200"
                  : "#e36c54") +
                ";padding-left:5px;padding-right:5px;border-radius:20px;>" +
                liveDeparture[i].etd.slice(11, 16) +
                "&nbsp;⏱" +
                "</text>"
              : liveDeparture[i].atd
              ? liveDeparture[i].atd.slice(11, 16) ==
                liveDeparture[i].std.slice(11, 16)
                ? "<text style=background:green;color:white;padding-left:5px;padding-right:5px;border-radius:20px;>" +
                  liveDeparture[i].atd.slice(11, 16) +
                  "</text>"
                : "<text style=background:#969696;color:white;padding-left:5px;padding-right:5px;border-radius:20px;>" +
                  liveDeparture[i].atd.slice(11, 16) +
                  "</text>"
              : liveDeparture[i].isCancelled
              ? "<text style=background:#000000;color:white;padding-left:5px;padding-right:5px;border-radius:20px;>" +
                "Cancelled" +
                "&nbsp;❌" +
                "</text>"
              : liveDeparture[i].departureType == "NoLog"
              ? "<text style=background:white;padding-left:5px;padding-right:5px;border-radius:20px;>" +
                "Not Recorded" +
                "</text>"
              : "<text style=background:red;color:white;padding-left:5px;padding-right:5px;border-radius:20px;>" +
                "Delayed" +
                "</text>") +
            "&nbsp;<text style=font-size:small;color:#696969>" +
            liveDeparture[i].operator +
            "</text>" +
            "<br/>" +
            "<text class=tabletitle >" +
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
            "</text>" +
            "<br/>" +
            "<text style=position:relative;>" +
            "  Platform: " +
            "<text style=background:" +
            (!isNaN(liveDeparture[i].platform) ? "green" : "#e88c79") +
            ";color:white;padding-left:5px;padding-right:5px;border-radius:20px;>" +
            (liveDeparture[i].platform ? liveDeparture[i].platform : "N/A") +
            "</text>" +
            "</text>" +
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
    // setIsOpen(true);
    setIsOpenForm(false);
  }

  function toggleForm() {
    setIsOpenForm((isOpenForm) => !isOpenForm);
  }

  return (
    <Fade top distance={"10px"} duration={1500}>
      <div className="Wrapper2">
        <h3 style={{ textAlign: "center" }}>{departArrive}</h3>
        <Fade top distance={"25px"} duration={1500}>
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
                  <p
                    style={{
                      textAlign: "left",
                      fontWeight: "bold",
                      color: "grey",
                    }}
                  >
                    Date & Time:
                  </p>
                  {/* //////Date picker */}
                  <SelectDate
                    setSelectedTime={setSelectedTime}
                    selectedTime={selectedTime}
                    setSelectedDay={setSelectedDay}
                    selectedDay={selectedDay}
                    minutes={minutes}
                    hours={hours}
                    day={day}
                    month={month}
                    year={year}
                    rememberDateTime={rememberDateTime}
                  />
                  {departArrive == "Departures" ? (
                    <p
                      style={{
                        textAlign: "left",
                        fontWeight: "bold",
                        color: "grey",
                      }}
                    >
                      Departure:
                    </p>
                  ) : (
                    <p
                      style={{
                        textAlign: "left",
                        fontWeight: "bold",
                        color: "grey",
                      }}
                    >
                      Arrival:
                    </p>
                  )}
                  <text style={{ textAlign: "left" }}>
                    <Select
                      defaultValue={[
                        {
                          value: rememberFirstStation,
                          label: rememberFirstStation,
                        },
                      ]}
                      value={
                        rememberFirstStation
                          ? [
                              {
                                value: rememberFirstStation,
                                label: rememberFirstStation,
                              },
                            ]
                          : [
                              {
                                value: "Select...",
                                label: "Select...",
                              },
                            ]
                      }
                      options={listOfStations ? listOfStations : []}
                      isLoading={listOfStations ? false : true}
                      className="selectBox"
                      onChange={(opt) =>
                        handleDepartureClick(
                          current,
                          opt.value.slice(opt.value.length - 4, -1),
                          0,
                          opt.value
                        )
                      }
                    />
                  </text>
                  <StationHistoryChip
                    position={0}
                    handleDepartureClick={handleDepartureClick}
                    current={current}
                  />
                  {departArrive == "Departures" ? (
                    <p
                      style={{
                        textAlign: "left",
                        fontWeight: "bold",
                        color: "grey",
                      }}
                    >
                      Destination (optional):
                    </p>
                  ) : (
                    <p
                      style={{
                        textAlign: "left",
                        fontWeight: "bold",
                        color: "grey",
                      }}
                    >
                      Origin (optional):
                    </p>
                  )}
                  <text style={{ textAlign: "left" }}>
                    <Select
                      isDisabled={
                        rememberFirstStation == "" || !rememberFirstStation
                          ? true
                          : false
                      }
                      defaultValue={[
                        {
                          value: rememberSecondStation,
                          label: rememberSecondStation,
                        },
                      ]}
                      value={
                        rememberSecondStation
                          ? [
                              {
                                value: rememberSecondStation,
                                label: rememberSecondStation,
                              },
                            ]
                          : rememberFirstStation
                          ? [
                              {
                                value: "Select...",
                                label: "Select...",
                              },
                            ]
                          : [
                              {
                                value: "Select above first",
                                label: "Select above first",
                              },
                            ]
                      }
                      options={listOfStations ? listOfStations : []}
                      isLoading={listOfStations ? false : true}
                      className="selectBox"
                      onChange={(opt) =>
                        handleDepartureClick(
                          current,
                          opt.value.slice(opt.value.length - 4, -1),
                          1,
                          opt.value
                        ) + { stationTwoD: opt.value }
                      }
                    />
                  </text>
                  <StationHistoryChip
                    position={1}
                    handleDepartureClick={handleDepartureClick}
                    current={current}
                    isDisabled={
                      rememberFirstStation == "" || !rememberFirstStation
                        ? true
                        : false
                    }
                  />
                  <br />
                  <div>
                    <Button
                      type="button"
                      id="useTrains"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      endIcon={<KeyboardArrowDownIcon />}
                      sx={{
                        textTransform: "none",
                        paddingTop: "0.5px !important",
                        paddingBottom: "0.5px !important",
                      }}
                    >
                      ⚙️ Options
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem
                        type="button"
                        disabled={
                          rememberSecondStation == "" || !rememberSecondStation
                            ? true
                            : false
                        }
                        onClick={() =>
                          handleClose() +
                          handleDepartureClick(contextTime, "SWITCH-st")
                        }
                      >
                        🔀 Switch stations
                      </MenuItem>
                      <MenuItem
                        type="button"
                        disabled={
                          rememberSecondStation == "" || !rememberSecondStation
                            ? true
                            : false
                        }
                        onClick={() =>
                          handleClose() +
                          handleDepartureClick(
                            contextTime,
                            currentCRSCode,
                            0,
                            rememberFirstStation
                          )
                        }
                      >
                        🗑️ Remove second station
                      </MenuItem>
                      <MenuItem
                        type="reset"
                        onClick={() => handleClose() + clearAll()}
                      >
                        ❌ Reset
                      </MenuItem>
                    </Menu>
                  </div>
                </text>
              )}
              <button
                id="useTrains"
                type="button"
                onClick={() => handleDepartureClick(contextTime)}
              >
                {isOpenForm && "🔎 Search"} {!isOpenForm && "🔄 Refresh"}
              </button>
            </form>
          </div>
        </Fade>

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

        <Fade duration={1999} when={!processingState}>
          <>
            {isOpen && (
              <>
                <div style={{ marginBottom: "10px" }}>
                  {trainSearch} &nbsp;
                  <Tooltip
                    arrow
                    componentsProps={{
                      tooltip: {
                        sx: {
                          maxWidth: "none",
                          background: "white",
                          borderRadius: "10px",
                          border: 1,
                          borderColor: "#c9c9c9",
                          "& .MuiTooltip-arrow": {
                            color: "#0080ff",
                          },
                        },
                      },
                    }}
                    leaveTouchDelay={5000}
                    title={
                      <div style={{ color: "black" }}>
                        {staffData.locationName} Managed By: <br />
                        <text style={{ color: "green" }}>
                          {staffData.stationManager} (
                          {staffData.stationManagerCode})
                        </text>
                      </div>
                    }
                    onClose={handleTooltipClose}
                    open={tTSMOpen}
                    slotProps={{
                      popper: {
                        disablePortal: false,
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -15],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <text
                      onClick={handleTooltipOpen}
                      style={{ marginBottom: 2, color: "#0080ff" }}
                    >
                      ⓘ
                    </text>
                  </Tooltip>
                </div>

                <Box sx={{ marginBottom: 2 }}>
                  <button
                    id="useTrains"
                    type="button"
                    disabled={trainDisabled}
                    style={{ color: activeTrainT, background: activeTrain }}
                    onClick={() => (
                      (busDisplayMode = "train"),
                      handleDepartureClick(contextTime)
                    )}
                  >
                    Show Train Services
                  </button>
                  <button
                    id="useTrains"
                    type="button"
                    disabled={busDisabled}
                    style={{ color: activeBusT, background: activeBus }}
                    onClick={() => (
                      (busDisplayMode = "bus"),
                      handleDepartureClick(contextTime)
                    )}
                  >
                    Show Bus Services
                  </button>
                </Box>
                <TrainBus
                  isOpen={isOpen}
                  trainSearch={trainSearch}
                  textInfo={textInfo}
                  nrccMessages={nrccMessages}
                  handleDepartureClick={handleDepartureClick}
                  earlier={earlier}
                  earlier2={earlier2}
                  Table={Table}
                  stringDepartures={stringDepartures}
                  routeChange={routeChange}
                  later={later}
                  later2={later2}
                  current={current}
                  timeButton={timeButton}
                  rememberTimeOffset={rememberTimeOffset}
                  displayStation={stationOneD}
                />
              </>
            )}
            <div className="NRLogo">
              <img
                src={image}
                alt="powered by National Rail Enquiries"
                width="256"
              />
            </div>
          </>
        </Fade>
      </div>
    </Fade>
  );
}
