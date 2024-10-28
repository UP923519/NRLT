import React, { useState } from "react";
import { Table } from "react-bootstrap";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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
}) {
  return (
    <>
      <Table
        className="transactions"
        style={{ backgroundColor: "#f0f0f0", marginBottom: "10px" }}
      >
        <tr>
          <th style={{ fontSize: 15 }}>
            {prevOrSub == 0 && "Previous stations"}
            {prevOrSub == 1 && "Subsequent stations"}

            <br />
            <br />
          </th>
        </tr>
        <tr>
          <th style={{ fontSize: 13 }}>
            Station|Scheduled|Act/Est
            <br />
            <br />
          </th>
        </tr>
        {calling.callingPoint.map((station, index) => {
          return (
            <>
              <tr data-index={position} onClick={() => handleOpen(station, 1)}>
                {station.locationName + " " + station.st + " "}
                {station.at !== null ? station.at + " ✔️" : station.et}
                {station.at !== null &&
                  (station.at !== "On time" ? " ⚠️" : <></>)}
                {(station.et || station.at) == "Cancelled" && " ❌"}
                {station.at == null && station.et !== "Cancelled" ? (
                  " 🕰️🚂🚃🚃"
                ) : (
                  <></>
                )}
                <br />
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
