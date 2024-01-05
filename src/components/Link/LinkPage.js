import React, { useState, useEffect } from "react";
import "../App/App.css";
import { Table } from "react-bootstrap";
import image from "../../assets/nre-logo.png";
import {
  calculatePosition,
  calculatePositionCentral,
} from "./calculatePosition";
import { currentAzure, enableWindow } from "../Settings/Settings";

let liveDeparture = "";
let serviceMessage = "";
let displayServiceMessage = "";
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
let textInfo = "";

let divides = "";
let divideLocation;

let formJson = "";
let infoTrain = "";
let staffUIDVal = "";
let staffSDDVal = "";

let sCode = "";

let failedAlert;

let serverName = "trainwebapp";

export default function Dashboard() {
  const [excuseReason, setExcuseReason] = useState();
  const [operatorName, setOperator] = useState();
  const [platformNumber, setPlatformNumber] = useState();
  const [formationCar, setFormatiion] = useState();
  const [stringCalling, setCalling] = useState([[], []]);
  const [formVal, setFormVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [infoTrainDisplay, setInfoTrain] = useState("");
  // const currentDate = new Date();
  // const useDate = currentDate.toISOString().split("T")[0];
  // const [staffSCode, setStaffSCode] = useState("");
  const [trainDetailUrl, setTrainDetailUrl] = useState("");

  const staffDay = staffSDDVal.substring(8, 10);
  const staffMonth = staffSDDVal.substring(5, 7);
  const staffYear = staffSDDVal.substring(0, 4);

  useEffect(() => {
    if (currentAzure == "External") {
      serverName = "huxley2";
    } else if (currentAzure == "Local") {
      serverName = "trainwebapp";
    }

    setCalling([["Enter a service code above"], []]);
    textInfo = "";
    myArray = [];
    locationList = [];

    if (formJson != "") {
      handleServiceClick();
    }
  }, []);

  function clearAll(e) {
    setCalling([""]);
    textInfo = "";
    setIsOpen(false);
  }

  const displayAction = false;

  function handleServiceClick(e) {
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

    // console.log("Origin Station is", liveServiceTime.locationName);

    // console.log(
    //   "Destination station is",
    //   liveServiceTime.subsequentCallingPoints[0].callingPoint[
    //     liveServiceTime.subsequentCallingPoints[0].callingPoint.length - 1
    //   ].locationName
    // );

    setInfoTrain(infoTrainSet);

    infoTrainSet = 0;

    try {
      myArray = locationList.split("*");
    } catch {
      setCalling([["Error, please try another service."], []]);
    }
    myArray.shift();

    myArray[myArray.length - 1] = myArray[myArray.length - 1].replace('"}', "");

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
  }

  async function logJSONData(serviceID) {
    let response;
    try {
      response = await fetch(
        "https://" + serverName + ".azurewebsites.net/service/" + serviceID
      );
    } catch {
      alert(
        "Failed to fetch. Please check internet connection / service details."
      );
      failedAlert = true;

      setIsOpen(false);
    }
    try {
      const data = await response.json();
      console.log("DATA is", data);
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
        console.log("padd", liveServicePrevAdd);

        for (let i = liveServicePrevAdd.length - 1; i > -1; i--) {
          console.log("nono");
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
        setFormatiion(formation);
      } else {
        setFormatiion("Info may be available below");
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

      let t = beforeStations + middleStation + afterStations;

      t = t.replaceAll("*undefined", "");
      t = t.replaceAll("undefined", "");

      setPlatformNumber(liveServiceTime.platform);

      locationList = t;

      runLast();
    } catch {
      if (!failedAlert)
        alert("Unable to retrieve new results. Previous results may be shown.");
      setIsOpen(false);
    }
  }

  function toggle() {
    setIsOpen(true);
  }

  function toggleForm() {
    setIsOpenForm((isOpenForm) => !isOpenForm);
  }

  return (
    <div className="Wrapper2">
      <h3 style={{ textAlign: "center" }}>Service Details</h3>
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
              National Rail status page: <br />
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
            </label>
          )}
          <button id="useTrains" type="reset" onClick={clearAll}>
            Reset
          </button>
          <button
            id="useTrains"
            type="button"
            onClick={() => handleServiceClick()}
          >
            View/Refresh train service
          </button>
        </form>
      </div>
      <hr />

      <div className="App">
        {isOpen && (
          <div>
            <p className="infoTrain" style={{ margin: "0px" }}>
              {infoTrainDisplay}
            </p>
            <p className="highlights">{excuseReason}</p>
            <br />
            <div className="trainInfo">
              <p className={"platformBox"}>
                <text style={{ fontWeight: "500", color: "white" }}>
                  Platform:&nbsp;{" "}
                </text>
                <text style={{ color: "white" }}>{platformNumber}</text>
              </p>
            </div>
            <div className="trainInfo">
              <p className={"trainInfoBox"}>
                <text style={{ fontWeight: "500" }}>Service operator:</text>
                <br />
                <br />
                {operatorName}
              </p>
              <p className={"trainInfoBox"}>
                <text style={{ fontWeight: "500" }}>Train formation:</text>
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
                  <text style={{ fontWeight: "500" }}>Train divides at:</text>
                  <br />
                  <br />
                  {divideLocation}
                </p>
              </div>
            )}

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
              {stringCalling.map((calling, index) => (
                <tr data-index={index}>
                  <td>{calling}</td>
                  <br />
                  <br />
                  <br />
                </tr>
              ))}
            </Table>
            <br />
            <br />
            {(enableWindow == "Show" || enableWindow == undefined) && (
              <div>
                <iframe
                  className="transactions"
                  style={{
                    height: "265px",
                    border: "0",
                  }}
                  id="iFrameExample"
                  title="iFrame Example"
                  src={trainDetailUrl}
                ></iframe>
              </div>
            )}
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

export function test1(number, trainInfo, staffUID, staffSDD) {
  formJson = number;

  trainInfo = trainInfo.replaceAll(" ", " + ");
  trainInfo = trainInfo.replaceAll("On", " ");

  infoTrain = trainInfo;
  staffUIDVal = staffUID;
  staffSDDVal = staffSDD;
}
