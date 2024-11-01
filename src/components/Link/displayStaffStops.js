import React, { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import Box from "@mui/material/Box";
import { Button, Modal, Tooltip, Typography } from "@mui/material";

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
  maxHeight: "50vh",
  top: "50%",
  position: " absolute",
};

export default function DisplayStaffStops({
  allStaffServiceData,
  serverName,
  setUpdateServicePageButton,
}) {
  const [station, setStation] = useState();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [newRid, setNewRid] = useState();
  const [rid, setRid] = useState();
  const [loadedState, setLoadedState] = useState(false);

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

  async function NewStaffId() {
    try {
      const responseStaffRID = await fetch(
        "https://" + serverName + ".azurewebsites.net/service/" + newRid
      );
      const dataStaffService = await responseStaffRID.json();
      if (dataStaffService) {
        setRid(dataStaffService);
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

  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth" });

  function handleOpen(station, indicator) {
    setOpen(true);
    setStation(station);
  }

  return (
    <>
      <div ref={myRef}></div>
      {loadedState && (
        <Table
          className="transactions"
          style={{
            backgroundColor: "#f0f0f0",
            marginBottom: "10px",
          }}
        >
          <tr>
            <th
              style={{ fontSize: 15, paddingBottom: "15px", paddingTop: "5px" }}
            >
              {rid?.locations[0].locationName && rid.locations[0].std.slice(11)}{" "}
              {rid?.locations[0].locationName && rid.locations[0].locationName}
              {" —> "}
              {rid?.locations[0].locationName &&
                rid.locations[rid?.locations.length - 1].locationName}
            </th>
          </tr>
          <tr>
            <th style={{ fontSize: 15, paddingBottom: "7px" }}>
              All waypoints
            </th>
          </tr>
          <tr>
            <th style={{ fontSize: 13 }}>Waypoint | Scheduled | Act/Est</th>
          </tr>
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
                  <p
                    style={{
                      maxWidth: "35vw",
                      overflow: "hidden",
                      whiteSpace: "noWrap",
                      textOverflow: "ellipsis",
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
                        paddingRight: coloursDeparted && "5px",
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
                            paddingRight: coloursEstimated && "5px",
                            borderRadius: coloursEstimated && "20px",
                            marginLeft: coloursEstimated && "6px",
                          }}
                        >
                          {waypoint.etdSpecified == false &&
                          waypoint.etaSpecified == false ? (
                            "No info"
                          ) : (
                            <>
                              {waypoint.etdSpecified
                                ? waypoint.etd.slice(11, -3) + " ⏱"
                                : waypoint.eta.slice(11, -3) + " ⏱"}
                            </>
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
                      onClick={(e) => e.stopPropagation()} //Due to shift in line upwards, wrong waypoint popup appears on click without this
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
                      onClick={(e) => e.stopPropagation()} //Due to shift in line upwards, wrong waypoint popup appears on click without this
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
      )}
      {!loadedState && <div style={{ marginBottom: "9999px" }}></div>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {station && (
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Service status & times
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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
                      background: "#b1d1de",
                      borderRadius: "15px",
                      padding: "10px",
                      width: "50%",
                    }}
                  >
                    {station.locationName}
                  </p>
                </div>
                {
                  <>
                    <div className="trainInfo">
                      <p className={"platformBox"}>
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
                    </div>
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
                          background: "#f0f0f0",
                          borderRadius: "15px",
                          padding: "10px",
                          width: "100%",
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
                    </div>
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
                              ? "orange"
                              : station.lateness &&
                                station.lateness.includes("-")
                              ? "green"
                              : "#f0f0f0",
                          color:
                            station.lateness > 60
                              ? "white"
                              : station.lateness &&
                                station.lateness.includes("-")
                              ? "white"
                              : "black",
                          borderRadius: "15px",
                          padding: "10px",
                          width: "50%",
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
                          background: station.isCancelled ? "red" : "#f0f0f0",
                          color: station.isCancelled ? "white" : "black",
                          borderRadius: "15px",
                          padding: "10px",
                          width: "50%",
                        }}
                      >
                        Is cancelled?: <br />
                        {station.isCancelled ? <>True</> : <>N/A</>}
                      </p>
                    </div>
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
                          background: "#f0f0f0",
                          borderRadius: "15px",
                          padding: "10px",
                          width: "50%",
                        }}
                      >
                        Estimated arrival:
                        <br />
                        {station.eta ? <>{station.eta.slice(11)}</> : <>N/A</>}
                      </p>
                      <p
                        style={{
                          background: "#f0f0f0",
                          borderRadius: "15px",
                          padding: "10px",
                          width: "50%",
                        }}
                      >
                        Estimated departure:
                        <br />{" "}
                        {station.etd ? <>{station.etd.slice(11)}</> : <>N/A</>}
                      </p>
                    </div>
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
                          background: "#f0f0f0",
                          borderRadius: "15px",
                          padding: "10px",
                          width: "50%",
                        }}
                      >
                        Scheduled arrival:
                        <br />{" "}
                        {station.sta ? <>{station.sta.slice(11)}</> : <>N/A</>}
                      </p>
                      <p
                        style={{
                          background: "#f0f0f0",
                          borderRadius: "15px",
                          padding: "10px",
                          width: "50%",
                        }}
                      >
                        Scheduled departure:
                        <br />{" "}
                        {station.std ? <>{station.std.slice(11)}</> : <>N/A</>}
                      </p>
                    </div>
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
                          background: "#f0f0f0",
                          borderRadius: "15px",
                          padding: "10px",
                          width: "50%",
                        }}
                      >
                        Actual arrival: <br />
                        {station.ata ? <>{station.ata.slice(11)}</> : <>N/A</>}
                      </p>
                      <p
                        style={{
                          background: "#f0f0f0",
                          borderRadius: "15px",
                          padding: "10px",
                          width: "50%",
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
                    <div style={{ marginBottom: "20px" }}>
                      <p
                        style={{
                          background: station.associations?.length
                            ? "orange"
                            : "#f0f0f0",
                          borderRadius: "15px",
                          padding: "10px",
                          marginBottom: "-15px",
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
                                  background: "#f0f0f0",
                                  borderRadius: "15px",
                                  padding: "10px",
                                }}
                              >
                                Association {index + 1 + " "}
                                <br />
                                Origin: {association.origin}
                                <br />
                                Destination: {association.destination}
                                <br />
                                RID:
                                <Button
                                  variant="outlined"
                                  sx={{ marginLeft: "5px" }}
                                  onClick={() =>
                                    setNewRid(association.rid) +
                                    setUpdateServicePageButton(true)
                                  }
                                >
                                  {!loadedState ? (
                                    <Typography>
                                      Loading!.. Please wait...
                                    </Typography>
                                  ) : (
                                    association.rid
                                  )}
                                </Button>
                                <br />
                              </p>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </>
                }
              </Typography>
            </Box>
          )}
        </>
      </Modal>
    </>
  );
}
