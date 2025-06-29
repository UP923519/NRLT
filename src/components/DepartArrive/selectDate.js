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
  rememberDateTime,
}) {
  const [sync, setSync] = useState(false);

  const handleTimeChange = (value, event) => {
    setSelectedTime(value);
    rememberDateTime[0] = value;
  };
  const handleDateChange = (value, event) => {
    setSelectedDay(value);
    rememberDateTime[1] = value;
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
          defaultValue={
            rememberDateTime[1]
              ? rememberDateTime[1]
              : year + "-" + month + "-" + day
          }
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
          defaultValue={
            rememberDateTime[0] ? rememberDateTime[0] : hours + ":" + minutes
          }
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
            setSelectedDay(year + "-" + month + "-" + day) +
            (rememberDateTime[0] = hours + ":" + minutes) +
            (rememberDateTime[1] = year + "-" + month + "-" + day)
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
        <button
          //   id="useTrains"
          type="button"
          onClick={() =>
            setSelectedTime(null) +
            setSelectedDay(null) +
            (rememberDateTime[0] = null) +
            (rememberDateTime[1] = null) +
            setSync(true)
          }
          style={{
            borderColor: "#cccccc",
            borderStyle: "solid",
            borderWidth: "thin",
            marginLeft: "5px",
            borderRadius: "5px",
            padding: "7px",
            background:
              (selectedDay == null &&
                selectedTime == null &&
                rememberDateTime[0] == null &&
                rememberDateTime[1] == null) ||
              sync
                ? "#0080ff"
                : "white",
            color:
              (selectedDay == null &&
                selectedTime == null &&
                rememberDateTime[0] == null &&
                rememberDateTime[1] == null) ||
              sync
                ? "white"
                : "black",
            height: "38px",
            width: "125px",
          }}
        >
          Sync
        </button>
      </form>
    </>
  );
}
