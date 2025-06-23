import React, { useState, useEffect } from "react";
import "../App/App.css";
import dayjs from "dayjs";
import { Padding } from "@mui/icons-material";

let timeVal;

export default function SelectDate({
  setSelectedDate,
  selectedDate,
  minutes,
  hours,
}) {
  const handleDateChange = (value, event) => {
    setSelectedDate(value);
  };

  return (
    <>
      <form action="/action_page.php" style={{ textAlign: "left" }}>
        <input
          style={{
            padding: "5px",
            borderRadius: "5px",
            borderColor: "#c1c1c1",
            borderStyle: "solid",
            borderWidth: "thin",
          }}
          value={selectedDate}
          type="time"
          id="appt"
          name="appt"
          onChange={(e) => handleDateChange(e.target.value)}
        />
        <button
          //   id="useTrains"
          type="button"
          onClick={() => setSelectedDate(hours + ":" + minutes)}
          style={{
            borderColor: "#c1c1c1",
            borderStyle: "solid",
            borderWidth: "thin",
            marginLeft: "5px",
            borderRadius: "5px",
            padding: "7px",
            background: "white",
            height: "31px",
          }}
        >
          Now
        </button>
      </form>
    </>
  );
}
