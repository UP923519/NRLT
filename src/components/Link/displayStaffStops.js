import React, { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import Box from "@mui/material/Box";
import {
  Button,
  LinearProgress,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import ModalRTT from "./modalRTT";
import DepartArrive from "../DepartArrive/DepartArrive";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Fade from "react-reveal/Fade";
import { test1 } from "./servicePage";
import ScrollButton from "../DepartArrive/scrollButton";

const style = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "96vw",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  padding: 1,
  maxWidth: 400,
  overflow: "scroll",
  maxHeight: "70vh",
  top: "50%",
  position: " absolute",
  // backdropFilter: "blur(0px)",
  background:
    localStorage.getItem("darkMode") !== "#ffffff" ? "#00000099" : "#ffffff99",
  color: localStorage.getItem("darkMode") !== "#ffffff" && "white",
};

let nextId = 0;

export default function DisplayStaffStops({
  allStaffServiceData,
  serverName,
  setUpdateServicePageButton,
  associations,
  setAssociations,
  diffHours,
  diffMinutes,
  setShowStaffData,
  setSwitchScreen,
}) {
  const [station, setStation] = useState();
  const [open, setOpen] = useState(false);
  const [openRTT, setOpenRTT] = useState(false);
  const handleClose = () => setOpen(false);
  const [newRid, setNewRid] = useState();
  const [rid, setRid] = useState();
  const [loadedState, setLoadedState] = useState(false);
  const [shiftScroll, setShiftScroll] = useState(false);
  const [timeDiff, setTimeDiff] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(true);

  const navigate = useNavigate();

  const myRef = useRef(null);

  useEffect(() => {
    setLoadedState(false);
    if (newRid && newRid !== allStaffServiceData) {
      NewStaffId();
    } else {
      setRid(allStaffServiceData);
      setLoadedState(true);
      executeScroll();
    }
  }, [newRid]);

  async function NewStaffId(refreshPress) {
    let useRID;
    if (refreshPress) {
      useRID = refreshPress;
    } else {
      useRID = newRid;
    }

    try {
      const responseStaffRID = await fetch(
        "https://" + serverName + ".azurewebsites.net/service/" + useRID
      );
      const dataStaffService = await responseStaffRID.json();
      if (dataStaffService) {
        setRid(dataStaffService);
        //Work out time difference
        // Convert to Date objects

        const dateStart = new Date(dataStaffService.locations[0].std);
        const dateEnd = new Date(
          dataStaffService.locations[dataStaffService.locations.length - 1].sta
        );

        // Difference in milliseconds
        const diffMs = Math.abs(dateEnd - dateStart);

        // Convert to minutes, hours, etc.
        const diffSeconds = Math.floor((diffMs % 60000) / 1000);
        const diffMinutes = Math.floor((diffMs % 3600000) / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        setTimeDiff([diffHours, diffMinutes, diffSeconds]);
      }
      setLoadedState(true);
      handleClose();
      executeScroll();
    } catch {
      alert(
        "Failed to fetch associated service. Please check connection or try another service."
      );
      setLoadedState(true);
    }
  }

  const executeScroll = () => {
    window.scrollTo({
      top: 400,
      left: 0,
      behavior: "instant",
    });

    setTimeout(() => {
      window.scrollTo({
        top: 120,
        left: 0,
        behavior: "smooth",
      });
    }, 250);

    // myRef.current.scrollIntoView({ behavior: "smooth" });
  };

  function handleOpen(station, indicator) {
    setOpen(true);
    setStation(station);
  }

  function handleOpenRTT() {
    setOpenRTT(true);
  }

  return (
    <>
      <ScrollButton
        executeScroll={executeScroll}
        showScrollButton={showScrollButton}
      />
      <div
        style={{
          position: "relative",
          top: shiftScroll ? "-197px" : "-116px",
        }}
        ref={myRef}
      ></div>
      {!loadedState && (
        <>
          <div style={{ height: "6.75px" }} />
          <LinearProgress color="secondary" fourColor />
          <div style={{ height: "6.75px" }} />
        </>
      )}
      {loadedState && (
        <>
          {" "}
          <Fade duration={3000}>
            <text
              style={{
                position: "relative",
                top: "-23px",
              }}
            >
              <hr></hr>
            </text>
          </Fade>
          <Fade top distance={"20px"} duration={1500}>
            <button
              id="useTrains"
              type="button"
              style={{
                position: "relative",
                top: "-15px",
                background:
                  localStorage.getItem("darkMode") !== "#ffffff"
                    ? "#7788a3"
                    : "white",
                color:
                  localStorage.getItem("darkMode") !== "#ffffff" && "#ffffff",
              }}
              onClick={() => NewStaffId(rid.rid) + setLoadedState(false)}
            >
              {" "}
              🔄 Refresh
            </button>
          </Fade>
          <br />
          <Fade top distance={"30px"} duration={1500}>
            <button
              id="useTrains"
              style={{
                position: "relative",
                top: "-11px",
                background:
                  localStorage.getItem("darkMode") !== "#ffffff"
                    ? "#7788a3"
                    : "white",
                color:
                  localStorage.getItem("darkMode") !== "#ffffff" && "#ffffff",
              }}
              type="button"
              onClick={() => handleOpenRTT()}
            >
              More Train Details
            </button>
          </Fade>
          <br />
          <Table
            className="transactions"
            style={{
              background:
                localStorage.getItem("darkMode") == "#000000"
                  ? "#a3a3a3"
                  : localStorage.getItem("darkMode") == "#8297b5"
                  ? "#cbe0f2"
                  : "#f0f0f0",
              marginBottom: "20px",
              boxShadow:
                "0 5px 20px 0 rgba(0, 0, 0, 0.19), 0 5px 10px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Fade top distance={"35px"} duration={1500}>
              <tr>
                <th
                  style={{
                    fontSize: 15,
                    paddingBottom: "5px",
                    paddingTop: "5px",
                  }}
                >
                  {rid?.locations[0].locationName &&
                    rid.locations[0].std.slice(11)}{" "}
                  {rid?.locations[0].locationName &&
                    rid.locations[0].locationName}
                  {" —> "}
                  {rid?.locations[0].locationName &&
                    rid.locations[rid?.locations.length - 1].locationName}
                </th>
              </tr>
              <tr>
                <th
                  style={{
                    fontSize: 14,
                    paddingBottom: "5px",
                    paddingTop: "0px",
                  }}
                >
                  <text
                    style={{
                      color: "#696969",
                    }}
                  >
                    {timeDiff && timeDiff.length > 0 ? (
                      <>
                        {timeDiff[0] == 1 && timeDiff[0] + " Hour "}
                        {timeDiff[0] > 1 && timeDiff[0] + " Hours "}
                        {timeDiff[1] == 1 && timeDiff[1] + "Minute "}
                        {timeDiff[1] > 1 && timeDiff[1] + " Minutes "}
                      </>
                    ) : (
                      <>
                        {diffHours == 1 && diffHours + " Hour "}
                        {diffHours > 1 && diffHours + " Hours "}
                        {diffMinutes == 1 && diffMinutes + "Minute "}
                        {diffMinutes > 1 && diffMinutes + " Minutes "}
                      </>
                    )}
                    <hr style={{ width: "25%", marginTop: "13px" }}></hr>
                  </text>
                </th>
              </tr>
            </Fade>
            <Fade top distance={"40px"} duration={1500}>
              <tr>
                <th style={{ fontSize: 15, paddingBottom: "7px" }}>
                  All waypoints
                </th>
              </tr>
              <tr>
                <th style={{ fontSize: 13 }}>Waypoint | Scheduled | Act/Est</th>
              </tr>
            </Fade>
            {rid?.locations?.map((waypoint, index) => {
              let coloursDeparted;
              let coloursEstimated;
              if (
                waypoint.atdSpecified !== false ||
                waypoint.ataSpecified !== false
              ) {
                coloursDeparted = "#0083a3";
              } else {
                coloursEstimated = "white";
              }

              // //Change delayed question mark colour to red
              // if (waypoint.etaSpecified == false) {
              //   if (
              //     waypoint.departureType == "3" ||
              //     waypoint.arrivalType == "3"
              //   )
              //     coloursEstimated = "#000000";
              // }

              return (
                <>
                  <tr
                    onClick={() => handleOpen(waypoint, 1)}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Fade top distance={index * 2 + 50 + "px"} duration={1500}>
                      <text style={{ display: "flex", alignItems: "center" }}>
                        <p
                          style={{
                            maxWidth: "35vw",
                            overflow: "hidden",
                            whiteSpace: "noWrap",
                            textOverflow: "ellipsis",
                            color:
                              waypoint.isPass &&
                              localStorage.getItem("darkMode") == "#000000"
                                ? "#825656"
                                : waypoint.isPass &&
                                  localStorage.getItem("darkMode") !==
                                    "#000000" &&
                                  "#888888",
                            textShadow: "5px",
                          }}
                        >
                          {waypoint.locationName}
                        </p>
                        {/* Display associations */}
                        {waypoint.associations?.map((association, index) => {
                          return (
                            <x
                              style={{
                                background: "orange",
                                paddingLeft: "5px",
                                paddingRight: "5px",
                                paddingTop: "1px",
                                paddingBottom: "1px",
                                borderRadius: "20px",
                                marginLeft: "6px",
                              }}
                            >
                              A
                            </x>
                          );
                        })}
                        {/* Display scheduled or actual time */}
                        &nbsp;
                        {waypoint.stdSpecified !== false
                          ? waypoint.std.slice(11, -3) + " "
                          : waypoint.sta.slice(11, -3) + " "}
                        {/* Display cancelled message */}
                        <Tooltip title="Cancelled">
                          {waypoint.isCancelled && (
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
                              ❌
                            </x>
                          )}
                        </Tooltip>
                        {(waypoint.atdSpecified !== false ||
                          waypoint.ataSpecified !== false) && (
                          <x
                            style={{
                              background: coloursDeparted,
                              color: coloursDeparted && "white",
                              paddingLeft: coloursDeparted && "5px",
                              paddingRight: "6px",
                              borderRadius: coloursDeparted && "20px",
                              marginLeft: coloursDeparted && "6px",
                            }}
                          >
                            <Tooltip title="Train has completed this waypoint">
                              {waypoint.atdSpecified
                                ? waypoint.atd.slice(11, -3)
                                : waypoint.ataSpecified
                                ? waypoint.ata.slice(11, -3)
                                : "No info"}
                            </Tooltip>
                          </x>
                        )}
                        <Tooltip title="🟢On time 🟠Warning">
                          {(waypoint.atdSpecified !== false ||
                            waypoint.ataSpecified !== false) &&
                            (Number(waypoint.lateness) > 60 ? (
                              <p>&nbsp;🟠</p>
                            ) : (
                              <p>&nbsp;🟢</p>
                            ))}
                        </Tooltip>
                        {waypoint.atdSpecified == false &&
                          waypoint.ataSpecified == false && (
                            <Tooltip title="Train has not completed this waypoint">
                              <x
                                style={{
                                  background: coloursEstimated,
                                  paddingLeft: coloursEstimated && "5px",
                                  paddingRight: "6px",
                                  borderRadius: coloursEstimated && "20px",
                                  marginLeft: coloursEstimated && "6px",
                                }}
                              >
                                {waypoint.etdSpecified == false &&
                                waypoint.etaSpecified == false ? (
                                  waypoint.departureType == "3" ||
                                  waypoint.arrivalType == "3" ? (
                                    <x
                                      style={{
                                        background: "red",
                                        color: "white",
                                        paddingLeft: "5px",
                                        paddingRight: "5px",
                                        borderRadius: "20px",
                                        marginLeft: "-5px",
                                        marginRight: "-6px",
                                      }}
                                    >
                                      Delayed
                                    </x>
                                  ) : (
                                    "No info"
                                  )
                                ) : (
                                  <>
                                    {waypoint.etdSpecified
                                      ? waypoint.etd.slice(11, -3)
                                      : waypoint.eta.slice(11, -3)}
                                  </>
                                )}
                              </x>
                            </Tooltip>
                          )}
                      </text>
                    </Fade>
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
                        onClick={(e) => e.stopPropagation()} //Due to shift in line upwards, wrong waypoint popup appears on click without this
                        sx={{
                          width: "16px",
                          // background: "black",
                          background:
                            "repeating-linear-gradient(0deg,  rgba(0,0,0,0) 5px,  rgba(0,0,0,0) 12px,  black 0px,  black 15px)",
                          height: "110px", //Lined up on mobile - slightly off on desktop
                          marginBottom: "59px", //Lined up on mobile - slightly off on desktop
                          position: "absolute",
                          right: "18px",
                          // borderLeft: "solid grey",
                          // borderRight: "solid grey",
                        }}
                      ></Box>
                      <Box
                        id="mapPositionLineRail"
                        onClick={(e) => e.stopPropagation()} //Due to shift in line upwards, wrong waypoint popup appears on click without this
                        sx={{
                          width: "7px",
                          // background: "black",
                          height: "106px", //Lined up on mobile - slightly off on desktop
                          marginBottom: "56.5px", //Lined up on mobile - slightly off on desktop
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
                              "Train has not completed the waypoint " +
                                waypoint.locationName +
                                " yet"
                            )) +
                          (coloursDeparted &&
                            alert(
                              "Train has completed waypoint " +
                                waypoint.locationName
                            ))
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
                        {waypoint.etdSpecified == false &&
                        waypoint.etaSpecified == false &&
                        waypoint.atdSpecified == false &&
                        waypoint.ataSpecified == false ? (
                          <text style={{ color: "black" }}>❓</text>
                        ) : (
                          "✔"
                        )}
                      </Box>
                    </Box>
                  </tr>
                </>
              );
            })}
          </Table>
        </>
      )}
      {!loadedState && <div style={{ marginBottom: "9999px" }}></div>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: {
            sx: {
              //Your style here....
              backgroundColor: "#ffffff55",
              backdropFilter: "blur(12px)",
            },
          },
        }}
      >
        <>
          {station && (
            <Box sx={style}>
              <Fade top distance={"100px"} duration={500}>
                <button
                  onClick={handleClose}
                  style={{
                    border: "none",
                    background: "none",
                    // backdropFilter: "blur(12px)",
                    paddingBottom: "3px",
                    position: "sticky",
                    top: "0px",
                    left: "92%",
                    fontSize: "larger",
                    color:
                      localStorage.getItem("darkMode") == "#000000"
                        ? "grey"
                        : "#8f8f8f",
                    borderRadius: "100%",
                    zIndex: "1",
                  }}
                >
                  (x)
                </button>
                <Fade top distance={"100px"} duration={500}>
                  <Typography
                    style={{ marginTop: "-15px" }}
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Service status & times
                  </Typography>
                </Fade>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <Fade top distance={"10px"} duration={2000}>
                    <>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          gap: "10px",
                        }}
                      >
                        <p
                          style={{
                            background: "#b1d1de99",
                            borderRadius: "15px",
                            padding: "10px",
                            width: "50%",
                            // backdropFilter: "blur(12px)",
                          }}
                        >
                          {station.locationName}
                        </p>
                      </div>
                      {station.crs && (
                        <Button
                          sx={{
                            marginTop: "-20px",
                            color:
                              localStorage.getItem("darkMode") !== "#ffffff" &&
                              "#2ea1ff",
                          }}
                          type="button"
                          onClick={() =>
                            navigate("/dashboard", {
                              state: {
                                crs: station.crs,
                                locationName:
                                  station.locationName +
                                  " (" +
                                  station.crs +
                                  ")",
                                locationDate: station.stdSpecified
                                  ? station.std.slice(0, 10)
                                  : station.sta.slice(0, 10),
                                locationTime: station.stdSpecified
                                  ? station.std.slice(11, 16)
                                  : station.sta.slice(11, 16),
                              },
                            })
                          }
                        >
                          {station.crs && (
                            <u>
                              Search departures at{" "}
                              {station.stdSpecified
                                ? station.std.slice(11, 16)
                                : station.sta.slice(11, 16)}
                            </u>
                          )}
                        </Button>
                      )}
                    </>
                  </Fade>
                  {
                    <>
                      <div className="trainInfo">
                        <Fade top distance={"20px"} duration={2000}>
                          <p
                            className={"platformBox"}
                            style={{
                              // backdropFilter: "blur(12px)",
                              background: station.platform
                                ? "#7aa379cc"
                                : "#e88c79cc",
                            }}
                          >
                            <text
                              style={{
                                fontWeight: "500",
                                color: "white",
                              }}
                            >
                              Platform:&nbsp;{" "}
                            </text>
                            <text style={{ color: "white" }}>
                              {station.platform ? station.platform : "N/A"}
                            </text>
                          </p>
                        </Fade>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          gap: "10px",
                        }}
                      >
                        {" "}
                        <Fade top distance={"30px"} duration={2000}>
                          <p
                            style={{
                              background: "#f0f0f044",
                              borderRadius: "15px",
                              padding: "10px",
                              width: "100%",
                              // backdropFilter: "blur(12px)",
                              border: "1px solid #d9d9d9",
                            }}
                          >
                            {station.isPass ? (
                              <p>
                                This train is <b>not scheduled</b> to stop here
                              </p>
                            ) : (
                              <p>
                                This train <b>is scheduled</b> to stop here
                              </p>
                            )}
                          </p>
                        </Fade>
                      </div>
                      <Fade top distance={"40px"} duration={2000}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: "10px",
                          }}
                        >
                          <p
                            style={{
                              background:
                                station.lateness > 60
                                  ? "#FFA50044"
                                  : station.lateness &&
                                    station.lateness.includes("-")
                                  ? "#00ff0044"
                                  : "#f0f0f044",
                              color:
                                localStorage.getItem("darkMode") == "#000000" &&
                                "white",
                              borderRadius: "15px",
                              padding: "10px",
                              width: "50%",
                              // backdropFilter: "blur(12px)",
                              border: "1px solid #d9d9d9",
                            }}
                          >
                            Delay amount: <br />
                            {station.lateness ? (
                              <>{station.lateness + " seconds"}</>
                            ) : (
                              <>N/A</>
                            )}
                          </p>
                          <p
                            style={{
                              background: station.isCancelled
                                ? "#FF000044"
                                : "#f0f0f044",
                              color:
                                localStorage.getItem("darkMode") == "#000000" &&
                                "white",
                              borderRadius: "15px",
                              padding: "10px",
                              width: "50%",
                              // backdropFilter: "blur(12px)",
                              border: "1px solid #d9d9d9",
                            }}
                          >
                            Is cancelled?: <br />
                            {station.isCancelled ? <>True</> : <>N/A</>}
                          </p>
                        </div>
                      </Fade>
                      <Fade top distance={"50px"} duration={2000}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: "10px",
                          }}
                        >
                          <p
                            style={{
                              background: "#f0f0f044",
                              borderRadius: "15px",
                              padding: "10px",
                              width: "50%",
                              // backdropFilter: "blur(12px)",
                              border: "1px solid #d9d9d9",
                            }}
                          >
                            Estimated arrival:
                            <br />
                            {station.eta ? (
                              <>{station.eta.slice(11)}</>
                            ) : (
                              <>N/A</>
                            )}
                          </p>
                          <p
                            style={{
                              background: "#f0f0f044",
                              borderRadius: "15px",
                              padding: "10px",
                              width: "50%",
                              // backdropFilter: "blur(12px)",
                              border: "1px solid #d9d9d9",
                            }}
                          >
                            Estimated departure:
                            <br />{" "}
                            {station.etd ? (
                              <>{station.etd.slice(11)}</>
                            ) : (
                              <>N/A</>
                            )}
                          </p>
                        </div>
                      </Fade>
                      <Fade top distance={"60px"} duration={2000}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: "10px",
                          }}
                        >
                          <p
                            style={{
                              background: "#f0f0f044",
                              borderRadius: "15px",
                              padding: "10px",
                              width: "50%",
                              // backdropFilter: "blur(12px)",
                              border: "1px solid #d9d9d9",
                            }}
                          >
                            Scheduled arrival:
                            <br />{" "}
                            {station.sta ? (
                              <>{station.sta.slice(11)}</>
                            ) : (
                              <>N/A</>
                            )}
                          </p>
                          <p
                            style={{
                              background: "#f0f0f044",
                              borderRadius: "15px",
                              padding: "10px",
                              width: "50%",
                              // backdropFilter: "blur(12px)",
                              border: "1px solid #d9d9d9",
                            }}
                          >
                            Scheduled departure:
                            <br />{" "}
                            {station.std ? (
                              <>{station.std.slice(11)}</>
                            ) : (
                              <>N/A</>
                            )}
                          </p>
                        </div>
                      </Fade>
                      <Fade top distance={"70px"} duration={2000}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: "10px",
                          }}
                        >
                          <p
                            style={{
                              background: "#f0f0f044",
                              borderRadius: "15px",
                              padding: "10px",
                              width: "50%",
                              // backdropFilter: "blur(12px)",
                              border: "1px solid #d9d9d9",
                            }}
                          >
                            Actual arrival: <br />
                            {station.ata ? (
                              <>{station.ata.slice(11)}</>
                            ) : (
                              <>N/A</>
                            )}
                          </p>
                          <p
                            style={{
                              background: "#f0f0f044",
                              borderRadius: "15px",
                              padding: "10px",
                              width: "50%",
                              // backdropFilter: "blur(12px)",
                              border: "1px solid #d9d9d9",
                            }}
                          >
                            Actual departure:
                            <br />{" "}
                            {station.atd ? (
                              <>
                                {!station.atd.includes("null") ? (
                                  <>{station.atd.slice(11)}</>
                                ) : (
                                  <>N/A</>
                                )}
                              </>
                            ) : (
                              <>N/A</>
                            )}
                          </p>
                        </div>
                      </Fade>
                      <Fade top distance={"80px"} duration={2000}>
                        <div style={{ marginBottom: "20px" }}>
                          <p
                            style={{
                              background: station.associations?.length
                                ? "#FFA50099"
                                : "#f0f0f044",
                              borderRadius: "15px",
                              padding: "10px",
                              marginBottom: "-15px",
                              // backdropFilter: "blur(12px)",
                              border: "1px solid #d9d9d9",
                            }}
                          >
                            {"Associated Services: " +
                              (station.associations?.length || "None")}
                          </p>
                          {station.associations?.map((association, index) => {
                            return (
                              <>
                                <div>
                                  <p
                                    style={{
                                      background: "#f0f0f044",
                                      borderRadius: "15px",
                                      padding: "10px",
                                      // backdropFilter: "blur(12px)",
                                      border: "1px solid #d9d9d9",
                                    }}
                                  >
                                    Association {index + 1 + " "}
                                    <br />
                                    Origin: {association.origin}
                                    <br />
                                    Destination: {association.destination}
                                    <br />
                                    {/* RID: */}
                                    <text
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "5px",
                                        marginBottom: "-15px",
                                      }}
                                    >
                                      <Button
                                        variant="outlined"
                                        sx={{
                                          marginRight: "2.5px",
                                          boxShadow: 5,
                                          borderRadius: "10px",
                                          // backdropFilter: "blur(12px)",
                                          background:
                                            localStorage.getItem("darkMode") !==
                                            "#ffffff"
                                              ? "#ffffff99"
                                              : "#ffffff00",
                                        }}
                                        onClick={() =>
                                          setNewRid(association.rid) +
                                          (association.rid ==
                                          allStaffServiceData.rid
                                            ? setUpdateServicePageButton(false)
                                            : setUpdateServicePageButton(true) +
                                              setShiftScroll(true))
                                        }
                                      >
                                        {!loadedState ? (
                                          <Typography>
                                            ⏳Loading, please wait...
                                          </Typography>
                                        ) : (
                                          "View Timetable"
                                        )}
                                      </Button>
                                      <Button
                                        disabled={!loadedState}
                                        variant="contained"
                                        sx={{
                                          marginLeft: "2.5px",
                                          boxShadow: 5,
                                          borderRadius: "10px",
                                          // backdropFilter: "blur(12px)",
                                          background: "#1976d2cc",
                                        }}
                                        onClick={() =>
                                          setNewRid(association.rid) +
                                          setShowStaffData(false) +
                                          setUpdateServicePageButton(false) +
                                          setSwitchScreen(false) +
                                          navigate("/linkPage", {
                                            state: {
                                              rid: association.rid,
                                            },
                                          })
                                        }
                                      >
                                        {!loadedState ? (
                                          <Typography>
                                            ⏳Loading, please wait...
                                          </Typography>
                                        ) : (
                                          "View Service Details"
                                        )}
                                      </Button>
                                    </text>
                                    <br />
                                  </p>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </Fade>
                    </>
                  }
                </Typography>
              </Fade>
            </Box>
          )}
        </>
      </Modal>
      <ModalRTT
        openRTT={openRTT}
        url={null}
        setOpenRTT={setOpenRTT}
        style={style}
        data={rid}
      />
    </>
  );
}
