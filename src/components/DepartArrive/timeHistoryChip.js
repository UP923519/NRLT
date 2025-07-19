import React, { useState, useEffect } from "react";
import "../App/App.css";
import { Chip, Paper, styled } from "@mui/material";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function TimeHistoryChip({
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
  sync,
  setSync,
}) {
  const historyString = localStorage.getItem("dateTimeHistory");
  let historyArray;
  let historyObject;
  let historyObjectArray;

  if (historyString) {
    historyArray = historyString.split(",");

    historyObject = Object.assign({}, historyArray);

    historyObjectArray = Object.values(historyObject);
  }

  const [chipData, setChipData] = useState(historyObjectArray || []);

  const handleDateTimeChange = (value, event) => {
    setSelectedTime(value.slice(11, 19));
    rememberDateTime[0] = value.slice(11, 19);
    setSelectedDay(value.slice(0, 10));
    rememberDateTime[1] = value.slice(0, 10);
    setSync(false);
  };

  if (historyObjectArray && historyObjectArray.length > 0) {
    return (
      <div style={{ marginTop: "10px" }}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "row",
            listStyle: "none",
            p: 0.5,
            m: 0,
            overflow: "scroll",
            background:
              localStorage.getItem("darkMode") !== "#ffffff"
                ? "#475263"
                : "white",
            color: localStorage.getItem("darkMode") !== "#ffffff" && "#ffffff",
          }}
          component="ul"
        >
          {chipData.map((data) => {
            let icon;
            return (
              <ListItem key={data.key}>
                <Chip
                  style={{
                    background:
                      localStorage.getItem("darkMode") !== "#ffffff" &&
                      "#7788a3",
                    color:
                      localStorage.getItem("darkMode") !== "#ffffff" &&
                      "#ffffff",
                  }}
                  icon={icon}
                  label={data.replace("T", " │ ")}
                  onClick={() => handleDateTimeChange(data)}
                />
              </ListItem>
            );
          })}
        </Paper>
      </div>
    );
  }
}
