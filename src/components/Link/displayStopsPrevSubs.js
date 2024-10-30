import React, { useState } from "react";
import { Table } from "react-bootstrap";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Tooltip } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

export default function DisplayStopsPrevSubs({
  calling,
  position,
  handleOpen,
  prevOrSub,
  length,
  setLS,
}) {
  setTimeout(
    setTimeout(() => {
      setLS(true);
    }, 3000)
  );
  return (
    <>
      <Table
        className="transactions"
        style={{
          backgroundColor: "#f0f0f0",
          marginBottom: "10px",
        }}
      >
        <tr>
          <th style={{ fontSize: 15, paddingBottom: "7px" }}>
            {prevOrSub == 0 &&
              "Previous stations " +
                "(" +
                Number(position + 1) +
                "/" +
                length +
                ")"}
            {prevOrSub == 1 &&
              "Subsequent stations " +
                "(" +
                Number(position + 1) +
                "/" +
                length +
                ")"}
          </th>
        </tr>
        <tr>
          <th style={{ fontSize: 13 }}>Station | Scheduled | Act/Est</th>
        </tr>
        {calling.callingPoint.map((station, index) => {
          let coloursDeparted;
          let coloursEstimated;
          if (
            station.at !== null &&
            (station.et || station.at) !== "Cancelled"
          ) {
            coloursDeparted = "#0083a3";
          } else {
            coloursEstimated = "white";
          }
          return (
            <>
              <tr
                onClick={() => handleOpen(station, 1)}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    maxWidth: "165px",
                    overflow: "hidden",
                    whiteSpace: "noWrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {station.locationName}
                </p>
                &nbsp;{station.st + " "}
                {station.at !== null && (
                  <x
                    style={{
                      background: coloursDeparted,
                      color: coloursDeparted && "white",
                      paddingLeft: coloursDeparted && "5px",
                      paddingRight: coloursDeparted && "5px",
                      borderRadius: coloursDeparted && "20px",
                      marginLeft: coloursDeparted && "6px",
                    }}
                  >
                    <Tooltip title="Train departed">
                      {station.at !== null &&
                        ((station.et || station.at) !== "Cancelled"
                          ? station.at + " "
                          : station.et)}
                    </Tooltip>
                  </x>
                )}
                <Tooltip title="Train no longer departs from here">
                  {(station.et || station.at) == "Cancelled" && (
                    <x
                      style={{
                        background: "#000000",
                        color: "white",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                        borderRadius: "20px",
                        marginLeft: "6px",
                      }}
                    >
                      Cancelled ❌
                    </x>
                  )}
                </Tooltip>
                {/* <Tooltip title="🟢On time 🟠Warning">
                  {(station.et || station.at) == "Cancelled" &&
                    (station.at == null ? <p>&nbsp;🟠</p> : "")}
                </Tooltip> */}
                <Tooltip title="🟢On time 🟠Warning">
                  {station.at !== null &&
                    station.at !== "Cancelled" &&
                    (station.at !== "On time" ? (
                      <p>&nbsp;🟠</p>
                    ) : (
                      <p>&nbsp;🟢</p>
                    ))}
                </Tooltip>
                {station.at == null && station.et !== "Cancelled" && (
                  <Tooltip title="Train not yet departed">
                    <x
                      style={{
                        background: coloursEstimated,
                        paddingLeft: coloursEstimated && "5px",
                        paddingRight: coloursEstimated && "5px",
                        borderRadius: coloursEstimated && "20px",
                        marginLeft: coloursEstimated && "6px",
                      }}
                    >
                      {station.at == null && station.et !== "Cancelled" ? (
                        station.et + " ⏱"
                      ) : (
                        <></>
                      )}
                    </x>
                  </Tooltip>
                )}
                {/* <br />
                <br /> */}
                <Box
                  style={{
                    height: "50px",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Box
                    id="mapPositionLine"
                    sx={{
                      width: "10px",
                      background: "black",
                      height: "92px",
                      marginBottom: "42px",
                      position: "absolute",
                      right: "20px",
                    }}
                  ></Box>
                  <Box
                    id="mapPositionCircle"
                    sx={{
                      width: "30px",
                      background: coloursEstimated || coloursDeparted,
                      height: "30px",
                      position: "absolute",
                      right: "10px",
                      borderRadius: "100%",
                      color: "white",
                      lineHeight: "32px",
                      fontSize: "15px",
                      zIndex: 99,
                      border: "1px dashed grey",
                    }}
                  >
                    ✔
                  </Box>
                </Box>
              </tr>
            </>
          );
        })}
      </Table>
    </>
  );
}
