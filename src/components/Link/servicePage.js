import React, { useState, useEffect, useRef } from "react";
import "../App/App.css";
import { Table } from "react-bootstrap";
import image from "../../assets/nre-logo.png";
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
import { Button, ButtonBase, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
let infoTrain = "";
let staffUIDVal = "";
let staffSDDVal = "";
let failedAlert;
let serverName = "trainwebappv2";

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
  const [popOpen] = useState(false);
  const staffDay = staffSDDVal.substring(8, 10);
  const staffMonth = staffSDDVal.substring(5, 7);
  const staffYear = staffSDDVal.substring(0, 4);
  const myRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth" });
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
  }, []);

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

    JSON.stringify(logJSONData(formJson));
  }

  function runLast() {
    let infoTrainSet = infoTrain;

    // infoTrainSet = infoTrainSet.replace("Cancelled","");
    // infoTrainSet = infoTrainSet.replace("Delayed","");

    infoTrainSet = infoTrainSet.replace(
      " ",
      " at " + liveServiceTime.locationName + ": "
    );
    infoTrainSet = infoTrainSet.split("+");
    infoTrainSet.pop();
    infoTrainSet.pop();
    infoTrainSet.pop();

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

  async function logJSONData(serviceID) {
    let response;
    try {
      response = await fetch(
        "https://" + serverName + ".azurewebsites.net/service/" + serviceID
      );
    } catch {
      alert("Failed. Please check internet connection / service details.");
      failedAlert = true;

      setIsOpen(false);
      setProcessingState(false);
    }
    try {
      const data = await response.json();
      if (data) {
      }
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
          "This train divides into two portions at " +
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

        divides =
          "This train merges from two portions at " + divideLocation + ".";
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
        formation = data.length + " coaches";
      } else {
        formation = "";
      }

      liveServiceTime.cancelReason += ".";
      liveServiceTime.delayReason += ".";

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
    } catch {
      if (!failedAlert)
        alert("Unable to retrieve new results. Previous results may be shown.");
      setIsOpen(false);
      setProcessingState(false);
    }
  }

  function toggle() {
    setIsOpen(true);
  }

  function toggleForm() {
    setIsOpenForm((isOpenForm) => !isOpenForm);
  }

  return (
    <Fade top distance={"10px"} duration={1500}>
      <div className="Wrapper2">
        <h3 style={{ textAlign: "center" }}>Service Details</h3>
        <Fade top distance={"25px"} duration={1500}>
          <div className="manualInput">
            <form
              method="post"
              onSubmit={(e) => {
                e.preventDefault();
                handleServiceClick();
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
                      🔗 Status and disruptions
                    </button>
                  </a>
                  <p>
                    Service code:&nbsp;{" "}
                    <input
                      style={{
                        backgroundColor: "#cfcfcf",
                        border: "0",
                        borderRadius: "2px",
                      }}
                      name="myInput"
                      defaultValue=""
                      onChange={(event) => setFormVal(event.target.value)}
                    />
                  </p>
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
                        type="reset"
                        // style={{ fontSize: "small" }}
                        onClick={() => handleClose() + clearAll()}
                      >
                        ❌ Reset
                      </MenuItem>
                    </Menu>
                  </div>
                </label>
              )}

              <button
                id="useTrains"
                type="button"
                onClick={() => handleServiceClick()}
              >
                🔄 Refresh
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
        <ref ref={myRef}>
          <div ref={myRef} className="App">
            {isOpen && (
              <div>
                <p className="infoTrain" style={{ margin: "0px" }}>
                  {infoTrainDisplay}
                </p>
              </div>
            )}
          </div>
          <Fade bottom duration={1500} when={loadedState}>
            {isOpen && !stringCalling[0][0].includes("Loading") ? (
              <>
                <div className="App">
                  {isOpen && (
                    <div>
                      {/* {!stringCalling[0][0].includes("Loading") ? (
                  <> */}
                      <p className="highlights">{excuseReason}</p>
                      <br />
                      <div className="trainInfo">
                        <p className={"platformBox"}>
                          <text style={{ fontWeight: "500", color: "white" }}>
                            Platform:&nbsp;{" "}
                          </text>
                          <text style={{ color: "white" }}>
                            {platformNumber}
                          </text>
                        </p>
                      </div>
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
                      {divides != "" && (
                        <div className="trainInfo">
                          <p
                            className={"trainInfoBox"}
                            style={{
                              background: "orange",
                            }}
                          >
                            <text style={{ fontWeight: "500" }}>
                              Train {divideMerge} at:
                            </text>
                            <br />
                            <br />
                            {divideLocation}
                          </p>
                        </div>
                      )}
                      <div>
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
                                        // onClick={() =>
                                        //   window.scrollTo({ top: 99999, behavior: "smooth" })
                                        // }
                                      >
                                        More train details
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
                                                }}
                                                id="iFrameExample"
                                                // title="iFrame Example"
                                                src={trainDetailUrl}
                                              ></iframe>
                                            </div>
                                          </div>
                                          <div>
                                            <button
                                              id="useTrains"
                                              style={{ margin: "0px" }}
                                              onClick={() => close()}
                                            >
                                              Close
                                            </button>
                                          </div>
                                        </div>
                                      </Fade>
                                    )}
                                  </Popup>
                                  <PopupStations
                                    calling={
                                      stringCalling[
                                        stringCalling.findIndex((element) =>
                                          JSON.stringify(element).includes(
                                            location
                                          )
                                        )
                                      ]
                                    }
                                    Popup={Popup}
                                    platformNumber={platformNumber}
                                    popOpen={true}
                                    stringCalling={stringCalling}
                                  ></PopupStations>
                                </>
                              ) : (
                                <div>
                                  <br />
                                  <br />
                                </div>
                              )}

                              {/* {!stringCalling[0][0].includes("Loading") && } */}
                            </text>
                          )}
                      </div>
                      <br />
                      <Table
                        className="transactions"
                        style={{ backgroundColor: "#f0f0f0" }}
                      >
                        <tr>
                          <th style={{ fontSize: 13 }}>
                            Station|Scheduled|Actual|Estimated
                            <br />
                            <br />
                          </th>
                        </tr>
                        {stringCalling.map((calling, position) => {
                          return (
                            <tr data-index={position}>
                              <PopupStations
                                calling={calling}
                                Popup={Popup}
                                platformNumber={platformNumber}
                                popOpen={popOpen}
                              />
                              <br />
                              <br />
                              <br />
                            </tr>
                          );
                        })}
                      </Table>
                      <br />
                      <br />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </Fade>
        </ref>
        {loadedState == false ? (
          <>
            <p style={{ marginBottom: "3000px" }}></p>
          </>
        ) : (
          <>
            <div className="NRLogo">
              {console.log("stl", stringCalling.length)}
              <img
                src={image}
                alt="powered by National Rail Enquiries"
                width="256"
              />
            </div>
            {stringCalling.length < 6 && (
              <div style={{ marginBottom: "35vh" }}></div>
            )}
          </>
        )}
      </div>
    </Fade>
  );
}
export function test1(number, trainInfo, staffUID, staffSDD) {
  formJson = number;

  trainInfo = trainInfo.replaceAll(" ", " + ");
  trainInfo = trainInfo.replaceAll("On", " ");

  infoTrain = trainInfo;
  staffUIDVal = staffUID;
  staffSDDVal = staffSDD;
  if (!staffSDDVal || !staffSDDVal) {
    staffUIDVal = "";
    staffSDDVal = "";
  }
}
