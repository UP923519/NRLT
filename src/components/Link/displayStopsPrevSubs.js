import React from "react";
import { Table } from "react-bootstrap";
import Box from "@mui/material/Box";
import { Tooltip } from "@mui/material";

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
                    maxWidth: "35vw",
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
                    <Tooltip title="Train has called at this station">
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
                  <Tooltip title="Train has not called here yet">
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
                    onClick={(e) => e.stopPropagation()} //Due to shift in line upwards, wrong station popup appears on click without this
                    sx={{
                      width: "16px",
                      // background: "black",
                      background:
                        "repeating-linear-gradient(0deg,  rgba(0,0,0,0) 5px,  rgba(0,0,0,0) 12px,  black 0px,  black 15px)",
                      height: "97px", //Lined up on mobile - slightly off on desktop
                      marginBottom: "47px", //Lined up on mobile - slightly off on desktop
                      position: "absolute",
                      right: "18px",
                      // borderLeft: "solid grey",
                      // borderRight: "solid grey",
                    }}
                  ></Box>
                  <Box
                    id="mapPositionLineRail"
                    onClick={(e) => e.stopPropagation()} //Due to shift in line upwards, wrong station popup appears on click without this
                    sx={{
                      width: "7px",
                      // background: "black",
                      height: "97px", //Lined up on mobile - slightly off on desktop
                      marginBottom: "47px", //Lined up on mobile - slightly off on desktop
                      position: "absolute",
                      right: "21.3px",
                      borderLeft: "solid grey",
                      borderRight: "solid grey",
                    }}
                  ></Box>
                  <Box
                    id="mapPositionCircle"
                    onClick={(e) =>
                      e.stopPropagation() +
                      (coloursEstimated &&
                        alert(
                          "Train has not called at " +
                            station.locationName +
                            " yet"
                        )) +
                      (coloursDeparted &&
                        alert("Train has called at " + station.locationName))
                    }
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
                      userSelect: "none",
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
