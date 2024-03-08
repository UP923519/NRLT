import React, { useState } from "react";
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  remove,
  child,
  onValue,
} from "firebase/database";
import ReactDOM from "react-dom";
import Datetime from "react-datetime";
import { theUser } from "../App/App.js";

//const currentUser = theUser;

function TransactionForm(props) {
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  let [date, setDate] = useState("");

  const name = "Flash";
  const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();
  const currDateTime =
    new Date().toLocaleDateString("en-ca") +
    "T" +
    new Date().toLocaleTimeString();

  const changeType = (event) => {
    setType(event.target.value);
  };

  const changeAmount = (event) => {
    setAmount(event.target.value);
  };

  const changeDate = (event) => {
    setDate(event.target.value);
  };

  const transferValue = (event) => {
    event.preventDefault();

    let date1Year = date.slice(0, 4);
    let date1Month = date.slice(5, 7);
    let date1Day = date.slice(8, 10);
    let date1Time = date.slice(11, date.length);
    date =
      date1Day + "/" + date1Month + "/" + date1Year + " " + date1Time + ":00";

    const val = {
      type,
      amount,
      date,
    };

    props.func(val);
    clearState();
    const db = getDatabase();
    var timee = (currDate + currTime).replaceAll("/", "");
    const user2 = localStorage.getItem("username");

    set(ref(db, user2 + "/" + timee + "/"), {
      Transaction: type,
      Amount: Number(amount),
      date: date,
    });
  };

  const clearState = () => {
    setType("");
    setAmount("");
    setDate("");
  };

  return (
    <div className="manualInput">
      <h3 style={{ textAlign: "center" }}> &nbsp;Manual Sensor Data Input</h3>
      <label>&nbsp;Sensor Device</label>
      <input
        style={{ backgroundColor: "#cfcfcf", border: "0", borderRadius: "2px" }}
        type="text"
        id="inputData"
        value={type}
        onChange={changeType}
      />
      <br />
      <br />
      <label>&nbsp;Value</label>
      <input
        style={{ backgroundColor: "#cfcfcf", border: "0", borderRadius: "2px" }}
        type="text"
        id="inputData"
        value={amount}
        onChange={changeAmount}
      />
      <br />
      <br />
      <label>&nbsp;Date of recording</label>
      <input
        style={{ backgroundColor: "#cfcfcf", border: "0", borderRadius: "2px" }}
        type="datetime-local"
        id="inputData"
        value={date}
        max={currDateTime}
        onChange={changeDate}
      />
      <br />
      <button id="manualSubmitButton" onClick={transferValue}>
        ☑ Submit
      </button>
      <br />
    </div>
  );
}

export default TransactionForm;
