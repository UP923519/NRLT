import React, { useState, useEffect } from "react";
import "../App/App.css";
import { Chip, Paper, styled } from "@mui/material";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function SearchHistoryChip({
  handleDepartureClick,
  current,
  isDisabled,
  position,
  rememberFirstStation,
  setHistoryCRS,
  historyCRS,
  clearAll,
}) {
  const historyString = localStorage.getItem("stationHistoryFull");
  let historyArray;
  let historyObject;
  let historyObjectArray;

  if (historyString) {
    historyArray = historyString.split(",");

    historyObject = Object.assign({}, historyArray);

    historyObjectArray = Object.values(historyObject);
  }

  const [chipData, setChipData] = useState(historyObjectArray || []);

  function handleClick(data) {
    clearAll();

    if (data.includes(" -> ")) {
      rememberFirstStation = data.split(" -> ")[0];
      setHistoryCRS(
        data.split(" -> ")[0].slice(data.split(" -> ")[0].length - 4, -1)
      );
      handleDepartureClick(
        current,
        data.split(" -> ")[1].slice(data.split(" -> ")[1].length - 4, -1),
        1,
        data.split(" -> ")[1],
        data.split(" -> ")[0].slice(data.split(" -> ")[0].length - 4, -1),
        data.split(" -> ")[0]
      );
    } else {
      handleDepartureClick(current, data.slice(data.length - 4, -1), 0, data);
    }
  }

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
                ? "#513d6dff"
                : "#eaeaeaff",
            color: localStorage.getItem("darkMode") !== "#ffffff" && "#ffffff",
          }}
          component="ul"
        >
          {chipData.map((data) => {
            let icon;
            if (position == 0) {
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
                    label={data}
                    onClick={() => handleClick(data, position)}
                  />
                </ListItem>
              );
            }
          })}
        </Paper>
      </div>
    );
  }
}
