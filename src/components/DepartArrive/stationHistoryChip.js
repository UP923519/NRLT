import React, { useState, useEffect } from "react";
import "../App/App.css";
import { Chip, Paper, styled } from "@mui/material";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function StationHistoryChip({
  position,
  handleDepartureClick,
  current,
  isDisabled,
}) {
  const historyString = localStorage.getItem("stationHistory");
  let historyArray;
  let historyObject;
  let historyObjectArray;

  if (historyString) {
    historyArray = historyString.split(",");

    historyObject = Object.assign({}, historyArray);

    historyObjectArray = Object.values(historyObject);
  }

  const [chipData, setChipData] = useState(historyObjectArray || []);

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
          }}
          component="ul"
        >
          {chipData.map((data) => {
            let icon;
            if (position == 0) {
              return (
                <ListItem key={data.key}>
                  <Chip
                    icon={icon}
                    label={data}
                    onClick={() =>
                      handleDepartureClick(
                        current,
                        data.slice(data.length - 4, -1),
                        0,
                        data
                      )
                    }
                  />
                </ListItem>
              );
            }
            if (position == 1) {
              return (
                <ListItem key={data.key}>
                  <Chip
                    disabled={isDisabled}
                    icon={icon}
                    label={data}
                    onClick={() =>
                      handleDepartureClick(
                        current,
                        data.slice(data.length - 4, -1),
                        1,
                        data
                      ) + { stationTwoD: data }
                    }
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
