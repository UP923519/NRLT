import React, { useState, useEffect } from "react";
import "../App/App.css";
import dayjs from "dayjs";
import { Padding } from "@mui/icons-material";

let timeVal;

export default function SelectDate({
  setSelectedTime,
  selectedTime,
  setSelectedDay,
  selectedDay,
  minutes,
  hours,
  day,
  month,
  year,
}) {
  const handleTimeChange = (value, event) => {
    setSelectedTime(value);
  };
  const handleDateChange = (value, event) => {
    setSelectedDay(value);
  };

  return (
    <>
      <form
        action="/action_page.php"
        style={{
          textAlign: "left",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <input
          style={{
            padding: "5px",
            borderRadius: "5px",
            borderColor: "#cccccc",
            borderStyle: "solid",
            borderWidth: "thin",
            height: "26.86px",
            width: "100%",
            marginRight: "5px",
            background: "white",
          }}
          value={selectedDay}
          defaultValue={year + "-" + month + "-" + day}
          type="date"
          id="appt"
          name="appt"
          onChange={(e) => handleDateChange(e.target.value)}
        />
        <input
          style={{
            padding: "5px",
            borderRadius: "5px",
            borderColor: "#cccccc",
            borderStyle: "solid",
            borderWidth: "thin",
            height: "26.86px",
            width: "100%",
            background: "white",
          }}
          value={selectedTime}
          defaultValue={hours + ":" + minutes}
          type="time"
          id="appt"
          name="appt"
          onChange={(e) => handleTimeChange(e.target.value)}
        />
        <button
          //   id="useTrains"
          type="button"
          onClick={() =>
            setSelectedTime(hours + ":" + minutes) +
            setSelectedDay(year + "-" + month + "-" + day)
          }
          style={{
            borderColor: "#cccccc",
            borderStyle: "solid",
            borderWidth: "thin",
            marginLeft: "5px",
            borderRadius: "5px",
            padding: "7px",
            background: "white",
            height: "38px",
            width: "125px",
          }}
        >
          Now
        </button>
      </form>
    </>
  );
}
