import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DisplayStopsPrevSubs from "./displayStopsPrevSubs";
import { Button, Tooltip } from "@mui/material";
import DisplayStaffStops from "./displayStaffStops";
import { useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";

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

let openModalNow = false;

export default function DisplayStops({
  data,
  allStaffServiceData,
  serverName,
  showStaffData,
  setUpdateServicePageButton,
  rememberFirstStation,
  infoTrainDisplay,
  setYsIndex,
  open,
  setOpen,
  handleOpen,
  station,
  setAssociations,
  associations,
  rememberStaffData,
  diffHours,
  diffMinutes,
  setShowStaffData,
  setSwitchScreen,
}) {
  const handleClose = () => setOpen(false);
  const [whiteBlue, setWhiteBlue] = useState(false);
  const [ls, setLS] = useState(false);
  const navigate = useNavigate();

  let dataPreviousCallingPointsReverse;

  if (data.previousCallingPoints) {
    dataPreviousCallingPointsReverse = [
      ...data.previousCallingPoints,
    ].reverse();
  }

  let yourStationIndex = data.locations.findIndex(
    (location) =>
      (location.std.includes(infoTrainDisplay[0].slice(3, 8)) ||
        location.sta.includes(infoTrainDisplay[0].slice(3, 8))) &&
      location.locationName.includes(rememberFirstStation.slice(1, -7))
  );

  if (yourStationIndex == -1) {
    yourStationIndex = 0;
  }

  useEffect(() => {
    if ((data.atd || data.ata) !== null) {
      setWhiteBlue("#0083a3");
    }
    if (
      data.atd == null &&
      data.ata == null &&
      (data.eta || data.etd) !== "Cancelled"
    ) {
      setWhiteBlue("white");
    }

    if (openModalNow == true) {
      handleOpen(data?.locations[yourStationIndex], 1);
      openModalNow = false;
    }
  });

  setYsIndex(data.locations[yourStationIndex].platform);

  let coloursDeparted;
  let coloursEstimated;

  if (
    data?.locations[yourStationIndex].atdSpecified !== false ||
    data?.locations[yourStationIndex].ataSpecified !== false
  ) {
    coloursDeparted = "#0083a3";
  } else {
    coloursEstimated = "white";
  }

  // //Change delayed question mark colour to red
  // if (data?.locations[yourStationIndex].etaSpecified == false) {
  //   if (
  //     data?.locations[yourStationIndex].departureType == "3" ||
  //     data?.locations[yourStationIndex].arrivalType == "3"
  //   )
  //     coloursEstimated = "#000000";
  // }

  return (
    <>
      {!showStaffData && (
        <>
          {data.previousCallingPoints && (
            <div>
              {dataPreviousCallingPointsReverse.map((calling, position) => {
                return (
                  <DisplayStopsPrevSubs
                    calling={calling}
                    position={position}
                    handleOpen={handleOpen}
                    prevOrSub={0}
                    length={data.previousCallingPoints?.length}
                    setLS={setLS}
                    ls={ls}
                  />
                );
              })}
            </div>
          )}
          <div style={{ marginBottom: "10px" }}>
            <Table
              className="transactions"
              style={{
                background:
                  localStorage.getItem("darkMode") == "#000000"
                    ? "#a3a3a3"
                    : localStorage.getItem("darkMode") == "#8297b5"
                    ? "#cbe0f2"
                    : "#f0f0f0",
                marginBottom: "10px",
                boxShadow:
                  "0 5px 20px 0 rgba(0, 0, 0, 0.19), 0 5px 10px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <tr>
                <th
                  style={{
                    fontSize: 15,
                    paddingBottom: "15px",
                    paddingTop: "5px",
                  }}
                >
                  {data?.locations[0].locationName &&
                    data.locations[0].std.slice(11, -3)}{" "}
                  {data?.locations[0].locationName &&
                    data.locations[0].locationName}
                  {" —> "}
                  {data?.locations[0].locationName &&
                    data.locations[data?.locations.length - 1].locationName}
                </th>
              </tr>
              <tr>
                <th style={{ fontSize: 15, paddingBottom: "15px" }}>
                  Your Station: {data?.locations[yourStationIndex].locationName}
                </th>
              </tr>
              <tr>
                <th style={{ fontSize: 13 }}>Waypoint | Scheduled | Act/Est</th>
              </tr>
              <>
                <tr
                  onClick={() =>
                    handleOpen(data?.locations[yourStationIndex], 1)
                  }
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
                      color:
                        data?.locations[yourStationIndex].isPass && "#888888",
                      textShadow: "5px",
                    }}
                  >
                    {data?.locations[yourStationIndex].locationName}
                  </p>
                  {/* Display scheduled or actual time */}
                  &nbsp;
                  {data?.locations[yourStationIndex].stdSpecified !== false
                    ? data?.locations[yourStationIndex].std.slice(11, -3) + " "
                    : data?.locations[yourStationIndex].sta.slice(11, -3) + " "}
                  {/* Display cancelled message */}
                  <Tooltip title="Cancelled">
                    {data?.locations[yourStationIndex].isCancelled && (
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
                  {(data?.locations[yourStationIndex].atdSpecified !== false ||
                    data?.locations[yourStationIndex].ataSpecified !==
                      false) && (
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
                        {data?.locations[yourStationIndex].atdSpecified
                          ? data?.locations[yourStationIndex].atd.slice(11, -3)
                          : data?.locations[yourStationIndex].ataSpecified
                          ? data?.locations[yourStationIndex].ata.slice(11, -3)
                          : "No info"}
                      </Tooltip>
                    </x>
                  )}
                  <Tooltip title="🟢On time 🟠Warning">
                    {(data?.locations[yourStationIndex].atdSpecified !==
                      false ||
                      data?.locations[yourStationIndex].ataSpecified !==
                        false) &&
                      (Number(data?.locations[yourStationIndex].lateness) >
                      60 ? (
                        <p>&nbsp;🟠</p>
                      ) : (
                        <p>&nbsp;🟢</p>
                      ))}
                  </Tooltip>
                  {!data?.locations[yourStationIndex].isCancelled && (
                    <>
                      {data?.locations[yourStationIndex].atdSpecified ==
                        false &&
                        data?.locations[yourStationIndex].ataSpecified ==
                          false && (
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
                              {data?.locations[yourStationIndex].etdSpecified ==
                                false &&
                              data?.locations[yourStationIndex].etaSpecified ==
                                false ? (
                                data?.locations[yourStationIndex]
                                  .departureType == "3" ||
                                data?.locations[yourStationIndex].arrivalType ==
                                  "3" ? (
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
                                  {data?.locations[yourStationIndex]
                                    .etdSpecified
                                    ? data?.locations[
                                        yourStationIndex
                                      ].etd.slice(11, -3)
                                    : data?.locations[
                                        yourStationIndex
                                      ].eta.slice(11, -3)}
                                </>
                              )}
                            </x>
                          </Tooltip>
                        )}
                    </>
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
                      onClick={(e) => e.stopPropagation()} //Due to shift in line upwards, wrong waypoint popup appears on click without this
                      sx={{
                        width: "16px",
                        // background: "black",

                        background:
                          "repeating-linear-gradient(0deg,  rgba(0,0,0,0) 5px,  rgba(0,0,0,0) 12px,  black 0px,  black 15px)",
                        height: "116px", //Lined up on mobile - slightly off on desktop
                        marginBottom: "63px", //Lined up on mobile - slightly off on desktop
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
                        height: "116px", //Lined up on mobile - slightly off on desktop
                        marginBottom: "64px", //Lined up on mobile - slightly off on desktop
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
                              data?.locations[yourStationIndex].locationName +
                              " yet"
                          )) +
                        (coloursDeparted &&
                          alert(
                            "Train has completed waypoint " +
                              data?.locations[yourStationIndex].locationName
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
                      {data?.locations[yourStationIndex].etdSpecified ==
                        false &&
                      data?.locations[yourStationIndex].etaSpecified == false &&
                      data?.locations[yourStationIndex].atdSpecified == false &&
                      data?.locations[yourStationIndex].ataSpecified ==
                        false ? (
                        <text style={{ color: "black" }}>❓</text>
                      ) : (
                        "✔"
                      )}
                    </Box>
                  </Box>
                </tr>
              </>
            </Table>
          </div>
          {data.locations && (
            <div>
              {/* {data.locations?.map((calling, position) => { */}
              {/* return ( */}
              {/* <DisplayStopsPrevSubs
                calling={data.locations}
                // position={position}
                handleOpen={handleOpen}
                prevOrSub={1}
                length={data.locations?.length}
                setLS={setLS}
                ls={ls}
              /> */}
              {/* ); */}
              {/* })} */}
            </div>
          )}
        </>
      )}
      {allStaffServiceData && showStaffData && (
        <DisplayStaffStops
          allStaffServiceData={allStaffServiceData}
          serverName={serverName}
          setUpdateServicePageButton={setUpdateServicePageButton}
          setAssociations={setAssociations}
          associations={associations}
          diffHours={diffHours}
          diffMinutes={diffMinutes}
          setShowStaffData={setShowStaffData}
          setSwitchScreen={setSwitchScreen}
        />
      )}
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
                    </>
                  }
                </Typography>
              </Fade>
            </Box>
          )}
        </>
      </Modal>{" "}
    </>
  );
}

export function test2(open) {
  if (open == 1 && openModalNow == 0) {
    openModalNow = 1;
  }
}
