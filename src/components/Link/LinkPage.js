import React, { useState, useEffect } from "react";
import "../App/App.css";
import { Table } from "react-bootstrap";
import image from "../../assets/nre-logo.png";
import {
  calculatePosition,
  calculatePositionCentral,
} from "./calculatePosition";

let liveDeparture = "";
let serviceMessage = "";
let displayServiceMessage = "";
let liveService = "";
let liveService2 = "";
let liveService3 = "";
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

let sCode = "";

let failedAlert;

export default function Dashboard() {
  const [excuseReason, setExcuseReason] = useState();
  const [operatorName, setOperator] = useState();
  const [formationCar, setFormatiion] = useState();
  const [stringCalling, setCalling] = useState([[], []]);
  const [formVal, setFormVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);

  const [infoTrainDisplay, setInfoTrain] = useState("");

  useEffect(() => {
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
    toggle();

    if (formJson == "") {
      formJson = formVal;
    }

    if (formVal != "") {
      formJson = formVal;
      infoTrain = "";
    }

    JSON.stringify(logJSONData(formJson));
  }

  function runLast() {
    let infoTrainSet = infoTrain;

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
  }

  async function logJSONData(serviceID) {
    let response;
    try {
      response = await fetch(
        "https://huxley2.azurewebsites.net/service/" + serviceID
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
        divides = "";
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
        setFormatiion("Information not provided");
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
        {isOpen && liveServiceTime && (
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
                <text style={{ color: "white" }}>
                  {liveServiceTime.platform}
                </text>
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
          </div>
        )}
      </div>

      <div className="NRLogo">
        <img src={image} alt="powered by National Rail Enquiries" width="256" />
      </div>
    </div>
  );
}

export function test1(number, trainInfo) {
  formJson = number;

  trainInfo = trainInfo.replaceAll(" ", " + ");
  trainInfo = trainInfo.replaceAll("On", " ");

  infoTrain = trainInfo;
}
