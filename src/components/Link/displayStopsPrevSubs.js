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
}) {
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
          <th style={{ fontSize: 13 }}>Station|Scheduled|Act/Est</th>
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
              <tr onClick={() => handleOpen(station, 1)}>
                <br />
                {station.locationName + " " + station.st + " "}
                {station.at !== null && (
                  <x
                    style={{
                      background: coloursDeparted,
                      color: coloursDeparted && "white",
                      paddingLeft: coloursDeparted && "5px",
                      paddingRight: coloursDeparted && "5px",
                      borderRadius: coloursDeparted && "20px",
                    }}
                  >
                    <Tooltip title="Train departed">
                      {station.at !== null &&
                        ((station.et || station.at) !== "Cancelled"
                          ? station.at + " ⤿"
                          : station.et)}
                    </Tooltip>
                  </x>
                )}
                {(station.et || station.at) == "Cancelled" &&
                  "Cancelled" + " ❌" + (station.at == null ? " ⚠️" : "")}
                {station.at !== null &&
                  (station.at !== "On time" ? " ⚠️" : " ✔️")}
                {station.at == null && station.et !== "Cancelled" && (
                  <Tooltip title="Train not yet departed">
                    <x
                      style={{
                        background: coloursEstimated,
                        paddingLeft: coloursEstimated && "5px",
                        paddingRight: coloursEstimated && "5px",
                        borderRadius: coloursEstimated && "20px",
                      }}
                    >
                      {station.at == null && station.et !== "Cancelled" ? (
                        station.et + " ⏱︎"
                      ) : (
                        <></>
                      )}
                    </x>
                  </Tooltip>
                )}
                <br />
                <br />
              </tr>
            </>
          );
        })}
      </Table>
    </>
  );
}
