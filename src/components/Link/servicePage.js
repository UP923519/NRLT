import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App/App.css";
import { Table } from "react-bootstrap";
import image from "../../assets/nre-logo.png";
import imageDark from "../../assets/nre-logo-dark.png";
import {
  calculatePosition,
  calculatePositionCentral,
} from "./calculatePosition";
import { currentAzure, enableWindow } from "../Settings/Settings";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import LinearProgress from "@mui/material-next/LinearProgress";
import { PopupStations } from "./PopupStations";
import Fade from "react-reveal/Fade";
import {
  Button,
  ButtonBase,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DisplayStops, { test2 } from "./displayStops";
import { BorderStyle } from "@mui/icons-material";
import { delayReason } from "./delayReasons";
import { cancelReason } from "./cancelReasons";
import ServicePageAssociation from "./servicePageAssociation";
import ScrollButton from "../DepartArrive/scrollButton";

let liveService = "";
let liveService2 = "";
let liveService3 = "";
let liveServicePrevAdd = "";
let liveServiceTime = "";
let location = "";
let operator = "";
let formation = "";
let locationList = "test";
let myArray;
let divides = "";
let divideLocation;
let divideMerge;
let formJson = "";
let staffRIDVal;
let infoTrain = "";
let staffUIDVal = "";
let staffSDDVal = "";
let failedAlert;
let serverName = "trainwebappv2";
let rememberFirstStationSave = "---";
let rememberStaffRID;
let rememberStaffData;
let diffSeconds;
let diffMinutes;
let diffHours;

export default function ServicePage() {
  const [excuseReason, setExcuseReason] = useState();
  const [operatorName, setOperator] = useState();
  const [platformNumber, setPlatformNumber] = useState();
  const [formationCar, setFormation] = useState();
  const [stringCalling, setCalling] = useState([[], []]);
  const [formVal, setFormVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [infoTrainDisplay, setInfoTrain] = useState("");
  const [trainDetailUrl, setTrainDetailUrl] = useState("");
  const [loadedState, setLoadedState] = useState(false);
  const [processingState, setProcessingState] = useState(false);
  const staffDay = staffSDDVal.substring(8, 10);
  const staffMonth = staffSDDVal.substring(5, 7);
  const staffYear = staffSDDVal.substring(0, 4);
  const [allServiceData, setAllServiceData] = useState();
  const [allStaffServiceData, setAllStaffServiceData] = useState();
  const [showStaffData, setShowStaffData] = useState(false);
  const [updateServicePageButton, setUpdateServicePageButton] = useState(false);
  const [ySindex, setYsIndex] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [station, setStation] = useState();
  const [indicator, setIndicator] = useState();
  const [associations, setAssociations] = useState([]);
  const [sPAssociation, setSPAssociation] = useState(false);
  const [ttopen, setTtOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [switchScreen, setSwitchScreen] = useState(false);

  const { state } = useLocation();
  const locations = useLocation();

  const myRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const executeScroll = (state) => {
    switchScreen && myRef.current.scrollIntoView({ behavior: "smooth" });
    !switchScreen &&
      window.scrollTo({
        top: 340,
        left: 0,
        behavior: "smooth",
      });

    if (state) {
      console.log("TROO");
      setTimeout(() => {
        window.scrollTo({
          top: 340,
          left: 0,
          behavior: "smooth",
        });
      }, 500);
    }
  };

  const navigate = useNavigate();

  function handleOpen(station, indicator) {
    setOpenModal(true);
    setStation(station);
    setIndicator(indicator);
  }

  let associationList = [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (currentAzure == "External") {
      serverName = "huxley2";
    } else if (currentAzure == "Local") {
      serverName = "trainwebappv2";
    }
    setCalling([["Enter a service code above"], []]);
    myArray = [];
    locationList = [];
    if (formJson != "") {
      handleServiceClick();
    }

    setTimeout(() => {
      setShowScrollButton(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if (state) {
      setSPAssociation(state);
      logJSONData("", state.rid);
      setSwitchScreen(false);
      executeScroll(true);
    }
  }, [state]);

  useEffect(() => {
    if (!switchScreen) {
      window.scrollTo({
        top: 340,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [switchScreen, setSwitchScreen]);

  function clearAll(e) {
    setCalling([""]);
    setIsOpen(false);
    setProcessingState(false);
  }

  function handleServiceClick(e) {
    setLoadedState(false);
    setProcessingState(true);

    setCalling([["Loading..."], []]);
    if (infoTrainDisplay == "") {
      setInfoTrain("Loading...");
    }
    if (excuseReason == null) {
      setExcuseReason("Loading...");
    }
    toggle();

    if (formJson == "") {
      formJson = formVal;
    }

    if (formVal != "") {
      formJson = formVal;
      infoTrain = "";
    }

    divides = "";

    if (!staffRIDVal) {
      JSON.stringify(logJSONData(formJson));
    }

    if (staffRIDVal) {
      JSON.stringify(logJSONData(formJson, staffRIDVal));
    }
  }

  function runLast() {
    let infoTrainSet = infoTrain;

    if (infoTrainSet) {
      infoTrainSet = infoTrainSet.replace(
        " ",
        " at " + rememberFirstStationSave.slice(0, -6) + ": "
      );
      infoTrainSet = infoTrainSet.split("+");
      infoTrainSet.pop();
      infoTrainSet.pop();
      infoTrainSet.pop();
      infoTrainSet.pop();
      infoTrainSet.pop();
    }

    setInfoTrain(infoTrainSet);

    infoTrainSet = 0;

    myArray = locationList;

    setCalling(myArray);

    setTrainDetailUrl(
      "https://www.realtimetrains.co.uk/service/gb-nr:" +
        staffUIDVal +
        "/" +
        staffYear +
        "-" +
        staffMonth +
        "-" +
        staffDay +
        "/detailed"
    );

    executeScroll();
    setLoadedState(true);
    navigator.vibrate(1);
    setProcessingState(false);
  }

  async function logJSONData(serviceID, staffRIDVal) {
    setProcessingState(true);
    let response;
    let responseStaffRID;

    try {
      response = await fetch(
        "https://" + serverName + ".azurewebsites.net/service/" + staffRIDVal
      );
    } catch {
      alert("Failed. Please check internet connection / service details.");
      failedAlert = true;

      setIsOpen(false);
      setProcessingState(false);
    }

    if (staffRIDVal) {
      try {
        responseStaffRID = await fetch(
          "https://" + serverName + ".azurewebsites.net/service/" + staffRIDVal
        );
      } catch {
        alert("Failed. Please check internet connection / service details.");
        failedAlert = true;

        setIsOpen(false);
        setProcessingState(false);
      }
    }

    // try {
    const data = await response.json();
    const dataA = structuredClone(data); //todo Data is being manipulated so that all stations appear in one array. Don't want this anymore. Deep clone to temporarily get around this.
    const dataStaffService = await responseStaffRID.json(); //todo Data is being manipulated so that all stations appear in one array. Don't want this anymore. Deep clone to temporarily get around this.

    staffUIDVal = dataStaffService.uid;

    if (data) {
      setAllServiceData(dataA);
      if (dataStaffService) {
        setAllStaffServiceData(dataStaffService);
      }
    }
    //Remove SP Association if the displayed service is the same and at the same station name

    if (state)
      if (
        rememberStaffData.rid == state.rid &&
        rememberFirstStationSave.slice(0, -6) ==
          dataStaffService.locations[0].locationName
      ) {
        setSPAssociation(null);
        navigate(locations.pathname, {}); //clears state
      }

    //Work out time difference
    // Convert to Date objects
    const dateStart = new Date(dataStaffService.locations[0].std);
    const dateEnd = new Date(
      dataStaffService.locations[dataStaffService.locations.length - 1].sta
    );

    // Difference in milliseconds
    const diffMs = Math.abs(dateEnd - dateStart);

    // Convert to minutes, hours, etc.
    diffSeconds = Math.floor((diffMs % 60000) / 1000);
    diffMinutes = Math.floor((diffMs % 3600000) / 60000);
    diffHours = Math.floor(diffMs / 3600000);

    //Work out Divide Location
    dataStaffService?.locations?.forEach((element, index) => {
      element?.associations?.forEach((association) => {
        if (
          association.category == 1 ||
          association.category == 0 ||
          association.category == "divides" ||
          association.category == "merges"
        ) {
          associationList.push([
            association.destination,
            association.origin,
            element.locationName,
            association.category,
            association.rid,
          ]);
        }
      });
    });

    setAssociations(associationList);

    try {
      liveService = data.previousCallingPoints[0].callingPoint;
    } catch {
      liveService = "";
    }

    try {
      liveService2 = data.subsequentCallingPoints[0].callingPoint;
    } catch {
      liveService2 = "";
    }

    try {
      liveService3 = data.subsequentCallingPoints[1].callingPoint;
      divideLocation = liveService3[0].locationName;

      divides =
        "This train divides at " +
        divideLocation +
        ". Please check that you are located in the correct part of the train. ";
      divideMerge = "divides";
      for (let i = 0; i < liveService3.length; i++) {
        liveService2.push(liveService3[i]);
      }
    } catch {
      liveService3 = "";
    }

    try {
      liveServicePrevAdd = data.previousCallingPoints[1].callingPoint;
      divideLocation =
        liveServicePrevAdd[liveServicePrevAdd.length - 1].locationName;

      divides = "This train merges at " + divideLocation + ".";
      divideMerge = "merges";

      for (let i = liveServicePrevAdd.length - 1; i > -1; i--) {
        liveService.unshift(liveServicePrevAdd[i]);
      }
    } catch {
      liveServicePrevAdd = "";
    }

    liveServiceTime = data;
    location = data.locationName;
    operator = data.operator + "";
    if (data.length != 0) {
      formation =
        data.locations[0].length > 0
          ? data.locations[0].length + " coaches"
          : "Info may be available in train details";
    } else {
      formation = "";
    }

    // liveServiceTime.cancelReason += ".";
    // liveServiceTime.delayReason += ".";

    let exr =
      divides +
      liveServiceTime.cancelReason +
      " " +
      liveServiceTime.delayReason +
      " ";
    exr = exr.replace("null.", "");
    exr = exr.replace("null.", "");

    if (exr != "  ") {
      setExcuseReason(exr);
    } else {
      setExcuseReason("There are no messages for this service.");
    }
    if (formation != "") {
      setFormation(formation);
    } else {
      setFormation("Info may be available in train details");
      if (staffUIDVal == "") {
        setFormation("Information not provided");
      }
    }

    setOperator(operator);

    let beforeStations = calculatePosition(liveService);
    let middleStation = calculatePositionCentral(
      liveService,
      liveServiceTime,
      liveService2,
      location
    );
    let afterStations = calculatePosition(liveService2, liveServiceTime);
    let t = beforeStations[0] + middleStation[0] + afterStations[0];
    let u = [];
    u = [...beforeStations[1], ...middleStation[1], ...afterStations[1]];
    t = t.replaceAll("*undefined", "");
    t = t.replaceAll("undefined", "");
    setPlatformNumber(liveServiceTime.platform);
    locationList = u;
    runLast();
    // } catch {
    //   if (!failedAlert)
    //     alert("Unable to retrieve new results. Previous results may be shown.");
    //   setIsOpen(false);
    //   setProcessingState(false);
    // }
  }

  function toggle() {
    setIsOpen(true);
  }

  function toggleForm() {
    setIsOpenForm((isOpenForm) => !isOpenForm);
  }

  return (
    // <Fade top distance={"10px"} duration={1500}>
    <>
      {!showStaffData && (
        <ScrollButton
          executeScroll={executeScroll}
          showScrollButton={showScrollButton}
        />
      )}
      <div className="Wrapper2">
        <h3 style={{ textAlign: "center" }}>
          {!showStaffData ? (
            "Service Details"
          ) : (
            <>Full Timetable (Staff Data)</>
          )}
        </h3>
        {/* <Fade top distance={"25px"} duration={1500}> */}
        <div
          className="manualInput"
          style={{
            background: showStaffData
              ? localStorage.getItem("darkMode") == "#000000"
                ? "#000000"
                : localStorage.getItem("darkMode") == "#8297b5"
                ? "#8297b5"
                : "#ffffff"
              : localStorage.getItem("darkMode") == "#000000"
              ? "#000e2b"
              : localStorage.getItem("darkMode") == "#8297b5"
              ? "#4f2609"
              : "#fafafa",
          }}
        >
          <form
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              handleServiceClick();
            }}
          >
            {showStaffData ? (
              <></>
            ) : (
              <>
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
              </>
            )}

            {isOpenForm && (
              <label>
                <a href="https://www.nationalrail.co.uk/status-and-disruptions/">
                  <button
                    type="button"
                    id="showHide"
                    style={{
                      fontSize: "medium",
                      marginTop: "5px",
                      padding: "9px",
                      background: "#243a5eAA",
                      color: "white",
                    }}
                    className="logOut"
                  >
                    🔗 Status and Disruptions
                  </button>
                </a>
                <p></p>
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
                    style={{
                      background:
                        localStorage.getItem("darkMode") !== "#ffffff"
                          ? "#7788a3"
                          : "white",
                      color:
                        localStorage.getItem("darkMode") !== "#ffffff" &&
                        "#ffffff",
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
                    sx={{
                      mt: "1px",
                      "& .MuiMenu-paper": {
                        backgroundColor: "#ffffff88",
                        backdropFilter: "blur(10px)",
                      },
                    }}
                  >
                    <MenuItem
                      type="reset"
                      onClick={() => handleClose() + clearAll()}
                    >
                      ❌ Reset
                    </MenuItem>
                  </Menu>
                </div>
              </label>
            )}
            {showStaffData && !updateServicePageButton ? (
              <></>
            ) : (
              <>
                {showStaffData && updateServicePageButton && (
                  <p style={{ marginTop: "-5px", color: "#b08a00" }}>
                    Showing Associated Service
                  </p>
                )}
                <Fade
                  top
                  distance={
                    showStaffData && updateServicePageButton ? "10px" : "30px"
                  }
                  duration={1500}
                >
                  <>
                    <text style={{ display: "flex", justifyContent: "center" }}>
                      {/* Don't show if there's a merge/divide, AND viewing the full timetable */}
                      {/* As this will reset to the service before the divide/merge has been selected */}
                      {/* The next button below this returns back to the divide/merge service*/}

                      {sPAssociation && showStaffData ? (
                        <></>
                      ) : (
                        <button
                          id="useTrains"
                          type="button"
                          onClick={() =>
                            handleServiceClick() +
                            setUpdateServicePageButton(false) +
                            setSPAssociation(false)
                          }
                          style={{
                            position:
                              showStaffData &&
                              updateServicePageButton &&
                              "relative",
                            top:
                              showStaffData &&
                              updateServicePageButton &&
                              "50px",
                            background:
                              localStorage.getItem("darkMode") !== "#ffffff"
                                ? "#7788a3"
                                : "white",
                            color:
                              localStorage.getItem("darkMode") !== "#ffffff" &&
                              "#ffffff",
                          }}
                        >
                          {showStaffData
                            ? updateServicePageButton
                              ? "↺ Back To Your Service"
                              : "🔄 Refresh"
                            : sPAssociation
                            ? "↺ Back To Your Service"
                            : "🔄 Refresh"}
                        </button>
                      )}

                      {sPAssociation && (
                        <>
                          <button
                            id="useTrains"
                            type="button"
                            onClick={() =>
                              logJSONData("", state.rid) +
                              setUpdateServicePageButton(false) +
                              setProcessingState(true)
                            }
                            style={{
                              position:
                                showStaffData &&
                                updateServicePageButton &&
                                "relative",
                              top:
                                showStaffData &&
                                updateServicePageButton &&
                                "50px",
                              background:
                                localStorage.getItem("darkMode") !== "#ffffff"
                                  ? "#7788a3"
                                  : "white",
                              color:
                                localStorage.getItem("darkMode") !==
                                  "#ffffff" && "#ffffff",
                            }}
                          >
                            {!showStaffData
                              ? "🔄 Refresh"
                              : "↺ Back to your service"}
                          </button>
                        </>
                      )}
                    </text>
                  </>
                </Fade>
              </>
            )}
          </form>
        </div>

        {/* </Fade> */}
        {processingState ? (
          <>
            <div style={{ height: "6.75px" }} />
            <LinearProgress color="secondary" fourColor />
            <div style={{ height: "6.75px" }} />
          </>
        ) : (
          <>{showStaffData ? <></> : <hr />}</>
        )}
        <ref ref={myRef}>
          <>
            <div ref={myRef} className="App">
              {isOpen && !showStaffData && !processingState && (
                <div>
                  {!sPAssociation ? (
                    <>
                      {rememberStaffData &&
                        (rememberStaffData.std || rememberStaffData.sta) && (
                          <p className="infoTrain" style={{ margin: "0px" }}>
                            {rememberStaffData.std
                              ? rememberStaffData.std.slice(11, 16)
                              : rememberStaffData.sta.slice(11, 16)}{" "}
                            at {rememberFirstStationSave.slice(0, -6)}:
                            {rememberStaffData.destination.map(
                              (dest, index) => {
                                return (
                                  <>
                                    {index > 0 && " and"}
                                    {" " + dest.locationName}
                                    {dest.via &&
                                      dest.via != "" &&
                                      " " + dest.via}
                                  </>
                                );
                              }
                            )}{" "}
                            from
                            {rememberStaffData.origin.map((orig, index) => {
                              return (
                                <>
                                  {index > 0 && " and"}
                                  {" " + orig.locationName}
                                  {orig.via && orig.via != "" && " " + orig.via}
                                </>
                              );
                            })}
                          </p>
                        )}
                    </>
                  ) : (
                    <ServicePageAssociation
                      allStaffServiceData={allStaffServiceData}
                    />
                  )}
                </div>
              )}
            </div>
          </>

          {isOpen &&
          !showStaffData &&
          !stringCalling[0][0].includes("Loading") &&
          !processingState ? (
            <>
              <div className="App">
                {isOpen && (
                  <>
                    <text
                      style={{
                        color:
                          localStorage.getItem("darkMode") == "#8297b5"
                            ? "#e6e6e6"
                            : "#818181",
                      }}
                    >
                      {diffHours == 1 && diffHours + " Hour "}
                      {diffHours > 1 && diffHours + " Hours "}
                      {diffMinutes == 1 && diffMinutes + " Minute "}
                      {diffMinutes > 1 && diffMinutes + " Minutes "}
                    </text>
                    <Tooltip
                      disableFocusListener
                      arrow
                      open={ttopen}
                      leaveTouchDelay={5000}
                      onClose={() => setTtOpen(false)}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            maxWidth: "none",
                            backgroundColor: "#ffffffCC",
                            backdropFilter: "blur(12px)",
                            borderRadius: "10px",
                            border: 1,
                            borderColor: "#c9c9c9",
                            "& .MuiTooltip-arrow": {
                              color: "#0080ff",
                            },
                          },
                        },
                      }}
                      title={
                        <div style={{ color: "black" }}>
                          {"Duration of full journey between " +
                            allStaffServiceData.locations[0].locationName +
                            " and " +
                            allStaffServiceData.locations[
                              allStaffServiceData.locations.length - 1
                            ].locationName}
                        </div>
                      }
                      slotProps={{
                        popper: {
                          disablePortal: false,
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -10],
                              },
                            },
                          ],
                        },
                      }}
                    >
                      {" "}
                      <text
                        style={{ marginBottom: 2, color: "#0080ff" }}
                        onClick={() => setTtOpen(true)}
                      >
                        ⓘ
                      </text>
                    </Tooltip>
                    <div style={{ marginBottom: "10px" }}>
                      {/* {!stringCalling[0][0].includes("Loading") ? (
                  <> */}
                      <Fade top distance={"10px"} duration={1500}>
                        <p
                          className="highlights"
                          style={{
                            background:
                              !liveServiceTime.cancelReason &&
                              !liveServiceTime.delayReason &&
                              "#4a6e40",
                            color:
                              !liveServiceTime.cancelReason &&
                              !liveServiceTime.delayReason &&
                              "white",
                          }}
                        >
                          {liveServiceTime &&
                            (liveServiceTime.cancelReason
                              ? cancelReason[
                                  cancelReason.findIndex((element) =>
                                    element.includes(
                                      liveServiceTime.cancelReason.value
                                    )
                                  )
                                ].slice(4) + "."
                              : liveServiceTime.delayReason
                              ? delayReason[
                                  delayReason.findIndex((element) =>
                                    element.includes(
                                      liveServiceTime.delayReason.value
                                    )
                                  )
                                ].slice(4) + "."
                              : "No messages for this service")}
                        </p>
                      </Fade>
                      <br />
                      <Fade top distance={"20px"} duration={1500}>
                        <div className="trainInfo">
                          <p
                            className={"platformBox"}
                            style={{
                              background: ySindex ? "revert-layer" : "#e88c79",
                            }}
                          >
                            <text style={{ fontWeight: "500", color: "white" }}>
                              Platform:&nbsp;{" "}
                            </text>
                            <text style={{ color: "white" }}>
                              {ySindex ? ySindex : "N/A"}
                            </text>
                          </p>
                        </div>
                      </Fade>
                      <Fade top distance={"30px"} duration={1500}>
                        <div className="trainInfo">
                          <p className={"trainInfoBox"}>
                            <text style={{ fontWeight: "500" }}>
                              Service operator:
                            </text>
                            <br />
                            <br />
                            {operatorName}
                          </p>
                          <p className={"trainInfoBox"}>
                            <text style={{ fontWeight: "500" }}>
                              Train formation:
                            </text>
                            <br />
                            <br />
                            {formationCar}
                          </p>
                        </div>
                      </Fade>
                      <Fade top distance={"35px"} duration={1500}>
                        {associations != "" && (
                          <div className="trainInfo">
                            <p
                              className={"trainInfoBox"}
                              style={{
                                background: "#ffc663",
                                width: "100%",
                                maxWidth: "300px",
                              }}
                            >
                              <text style={{ fontWeight: "500" }}>
                                Train divisions/mergers:
                              </text>
                              <br />
                              {associations.map((assoc) => {
                                ///ASSOC 0 is the Destination
                                ///ASSOC 1 is the Origin
                                ///ASSOC 2 is the station with the association
                                ///ASSOC 3 is the type
                                ///ASSOC 3 is the assoc. rid

                                if (
                                  assoc[3] == 1 ||
                                  assoc[3] == 0 ||
                                  assoc[3] == "divides" ||
                                  assoc[3] == "merges"
                                ) {
                                  return (
                                    <>
                                      <br />
                                      <text
                                        style={{
                                          textDecoration: "underline",
                                        }}
                                      >
                                        {(assoc[3] == 1 ||
                                          assoc[3] == "divides") &&
                                          "Divides at " + assoc[2]}

                                        {(assoc[3] == 0 ||
                                          assoc[3] == "merges") &&
                                          "Merges at " + assoc[2]}
                                      </text>
                                      <br />
                                      Destination: {assoc[0]} <br />
                                      Origin: {assoc[1]} <br />
                                      <Button
                                        variant="contained"
                                        sx={{
                                          background: "wheat !important",
                                          color: "black",
                                          marginTop: "5px",
                                          boxShadow: 10,
                                        }}
                                        onClick={() =>
                                          setShowStaffData(false) +
                                          setUpdateServicePageButton(false) +
                                          navigate("/linkPage", {
                                            state: {
                                              rid: assoc[4],
                                            },
                                          })
                                        }
                                      >
                                        {!loadedState ? (
                                          <Typography>
                                            ⏳Loading, please wait...
                                          </Typography>
                                        ) : (
                                          "View Service"
                                        )}
                                      </Button>
                                      <br />
                                    </>
                                  );
                                }
                              })}
                            </p>
                          </div>
                        )}
                      </Fade>
                      <Fade top distance={"40px"} duration={1500}>
                        <div>
                          <>
                            {(enableWindow == "Show" ||
                              enableWindow == undefined) &&
                              staffUIDVal != "" && (
                                <text>
                                  <br />

                                  {!stringCalling[0][0].includes("Loading") ? (
                                    <>
                                      <Popup
                                        trigger={
                                          <button
                                            id="useTrains"
                                            type="button"
                                            style={{
                                              background:
                                                localStorage.getItem(
                                                  "darkMode"
                                                ) !== "#ffffff"
                                                  ? "#7788a3"
                                                  : "white",
                                              color:
                                                localStorage.getItem(
                                                  "darkMode"
                                                ) !== "#ffffff" && "#ffffff",
                                            }}
                                          >
                                            More Train Details
                                          </button>
                                        }
                                        modal
                                        nested
                                      >
                                        {(close) => (
                                          <Fade
                                            top
                                            duration={500}
                                            distance={"100px"}
                                          >
                                            <div>
                                              <div>
                                                <div>
                                                  <p style={{ margin: "5px" }}>
                                                    Additional train details
                                                  </p>
                                                  <iframe
                                                    className="transactions"
                                                    style={{
                                                      height: "270px",
                                                      border: "0",
                                                      marginTop: "3px",
                                                      width: "99%",
                                                      overflow: "scroll",
                                                      maxHeight: "65vh",
                                                      background: "#467083",
                                                    }}
                                                    id="iFrameExample"
                                                    src={trainDetailUrl}
                                                  ></iframe>
                                                </div>
                                              </div>
                                              <div>
                                                <button
                                                  id="useTrains"
                                                  style={{
                                                    margin: "0px",
                                                    marginTop: "5px",
                                                    background: "#f0f0f000",
                                                  }}
                                                  onClick={() => close()}
                                                >
                                                  Close
                                                </button>
                                              </div>
                                            </div>
                                          </Fade>
                                        )}
                                      </Popup>
                                      <button
                                        id="useTrains"
                                        type="button"
                                        onClick={() =>
                                          test2(1) + handleOpen("KNG", 1)
                                        }
                                        style={{
                                          background:
                                            localStorage.getItem("darkMode") !==
                                            "#ffffff"
                                              ? "#7788a3"
                                              : "white",
                                          color:
                                            localStorage.getItem("darkMode") !==
                                              "#ffffff" && "#ffffff",
                                        }}
                                      >
                                        Service Status & Times
                                      </button>
                                    </>
                                  ) : (
                                    <div>
                                      <br />
                                      <br />
                                    </div>
                                  )}
                                </text>
                              )}
                          </>
                        </div>
                        {loadedState && (
                          //Fade on to top existing
                          <Fade top distance={"20px"} duration={2000}>
                            <button
                              id="useTrains"
                              type="button"
                              style={{
                                boxShadow:
                                  "0 4px 8px 0 rgba(96, 96, 96, 0.19), 0 6px 20px 0 rgba(96, 96, 96, 0.19)",
                                marginTop: "5px",
                                position:
                                  showStaffData &&
                                  updateServicePageButton &&
                                  "relative",
                                top:
                                  showStaffData &&
                                  updateServicePageButton &&
                                  "-45px",
                                // background: showStaffData && "#f0f0f0",
                                border: !showStaffData
                                  ? "3px solid orange"
                                  : "1px solid orange",
                                background: !showStaffData
                                  ? "orange"
                                  : localStorage.getItem("darkMode") !==
                                      "#ffffff" && "#7788a3",
                                color: !showStaffData && "white",
                              }}
                              onClick={() =>
                                showStaffData
                                  ? setShowStaffData(false) +
                                    setSwitchScreen(false)
                                  : setShowStaffData(true) +
                                    setSwitchScreen(true)
                              }
                            >
                              {showStaffData
                                ? "↩ Exit To Service Details Page"
                                : "View Full Timetable"}
                            </button>
                            <br />
                            <br />
                          </Fade>
                        )}
                      </Fade>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <></>
          )}
        </ref>
        {loadedState && showStaffData && (
          <Fade top distance={"10px"} duration={1500}>
            <button
              id="useTrains"
              type="button"
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(96, 96, 96, 0.19), 0 6px 20px 0 rgba(96, 96, 96, 0.19)",
                marginTop: "5px",
                position:
                  showStaffData && updateServicePageButton && "relative",
                top: showStaffData && updateServicePageButton && "-45px",
                // background: showStaffData && "#f0f0f0",
                border: !showStaffData
                  ? "3px solid orange"
                  : "1px solid orange",
                background: !showStaffData
                  ? "orange"
                  : localStorage.getItem("darkMode") !== "#ffffff" && "#7788a3",
                color:
                  showStaffData &&
                  localStorage.getItem("darkMode") !== "#ffffff" &&
                  "white",
              }}
              onClick={() =>
                showStaffData
                  ? setShowStaffData(false) +
                    setUpdateServicePageButton(false) +
                    setSwitchScreen(false)
                  : setShowStaffData(true) + setSwitchScreen(true)
              }
            >
              {showStaffData
                ? "↩ Exit To Service Details Page"
                : "View Full Timetable"}
            </button>
            <br />
            <br />
          </Fade>
        )}

        {allServiceData &&
          serverName &&
          loadedState &&
          infoTrainDisplay &&
          !processingState &&
          isOpen && (
            <DisplayStops
              data={allServiceData}
              allStaffServiceData={allStaffServiceData}
              serverName={serverName}
              showStaffData={showStaffData}
              setUpdateServicePageButton={setUpdateServicePageButton}
              rememberFirstStation={rememberFirstStationSave}
              infoTrainDisplay={infoTrainDisplay}
              setYsIndex={setYsIndex}
              rememberStaffRID={rememberStaffRID}
              setOpen={setOpenModal}
              open={openModal}
              handleOpen={handleOpen}
              station={station}
              setAssociations={setAssociations}
              associations={associations}
              rememberStaffData={rememberStaffData}
              diffHours={diffHours}
              diffMinutes={diffMinutes}
              setShowStaffData={setShowStaffData}
              setSwitchScreen={setSwitchScreen}
            />
          )}
        {loadedState == false ? (
          <>{processingState && <p style={{ marginBottom: "100vh" }}></p>}</>
        ) : (
          <>
            {" "}
            {!processingState ? (
              <>
                <div
                  className="NRLogo"
                  style={{
                    background:
                      localStorage.getItem("darkMode") !== "#ffffff" &&
                      "#00383c77",
                  }}
                >
                  {!showStaffData && (
                    <img
                      src={
                        localStorage.getItem("darkMode") == "#ffffff"
                          ? image
                          : imageDark
                      }
                      alt="powered by National Rail Enquiries"
                      width="256"
                      style={{ position: "absolute" }}
                    />
                  )}
                  <Fade duration={5000} when={showStaffData}>
                    <img
                      src={
                        localStorage.getItem("darkMode") == "#ffffff"
                          ? image
                          : imageDark
                      }
                      alt="powered by National Rail Enquiries"
                      width="256"
                    />
                  </Fade>
                </div>
                {stringCalling.length < 6 && (
                  <>
                    {" "}
                    {/* {switchScreen && <p style={{ marginBottom: "100vh" }}></p>} */}
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </>
        )}

        {switchScreen &&
          allServiceData &&
          allServiceData.locations.length > 10 && (
            <p style={{ marginBottom: "0vh" }}></p>
          )}
        {switchScreen &&
          allServiceData &&
          allServiceData.locations.length <= 10 && (
            <p style={{ marginBottom: "50vh" }}></p>
          )}

        {!switchScreen && <p style={{ marginBottom: "18vh" }}></p>}
        {processingState && <p style={{ marginBottom: "100vh" }}></p>}
      </div>
    </>

    // </Fade>
  );
}
export function test1(
  number,
  trainInfo,
  staffUID,
  staffSDD,
  staffRID,
  rememberFirstStation,
  staffData
) {
  formJson = number;
  staffRIDVal = staffRID;
  rememberStaffRID = staffRID;

  if (trainInfo) {
    trainInfo = trainInfo.replaceAll(" ", " + ");
    trainInfo = trainInfo.replaceAll("On", " ");

    infoTrain = trainInfo;
  } else infoTrain = null;

  staffUIDVal = staffUID;
  staffSDDVal = staffSDD;
  if (!staffSDDVal || !staffSDDVal) {
    staffUIDVal = "";
    staffSDDVal = "";
  }

  rememberFirstStationSave = rememberFirstStation;
  rememberStaffData = staffData;
}
