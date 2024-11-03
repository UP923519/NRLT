import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DisplayStopsPrevSubs from "./displayStopsPrevSubs";
import { Tooltip } from "@mui/material";
import DisplayStaffStops from "./displayStaffStops";

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
};

export default function DisplayStops({
  data,
  allStaffServiceData,
  serverName,
  showStaffData,
  setUpdateServicePageButton,
}) {
  const [station, setStation] = useState();
  const [indicator, setIndicator] = useState();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [whiteBlue, setWhiteBlue] = useState(false);
  const [ls, setLS] = useState(false);

  let dataPreviousCallingPointsReverse;

  if (data.previousCallingPoints) {
    dataPreviousCallingPointsReverse = [
      ...data.previousCallingPoints,
    ].reverse();
  }

  function handleOpen(station, indicator) {
    setOpen(true);
    setStation(station);
    setIndicator(indicator);
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
  });

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
              style={{ backgroundColor: "#f0f0f0" }}
            >
              <tr>
                <th style={{ fontSize: 15, paddingBottom: "7px" }}>
                  Your station
                </th>
              </tr>
              <tr>
                <th style={{ fontSize: 13 }}>Station | Scheduled | Act/Est</th>
              </tr>
              <tr
                onClick={() => handleOpen(data, 0)}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <br />
                <p
                  style={{
                    maxWidth: "35vw",
                    overflow: "hidden",
                    whiteSpace: "noWrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {data.locationName}
                </p>
                &nbsp;{data.std !== null ? data.std : data.sta}
                <x
                  style={{
                    background: whiteBlue,
                    color: whiteBlue !== "white" && "white",
                    paddingLeft: whiteBlue && "5px",
                    paddingRight: whiteBlue && "5px",
                    borderRadius: whiteBlue && "20px",
                    marginLeft: whiteBlue && "6px",
                  }}
                >
                  <Tooltip
                    title={
                      whiteBlue !== "white"
                        ? "Train has called at this station"
                        : "Train has not called here yet"
                    }
                  >
                    {(data.atd || data.ata) !== null ? (
                      (data.atd || data.ata) + " "
                    ) : (
                      <></>
                    )}
                    {data.atd == null &&
                    data.ata == null &&
                    (data.eta !== null ? (
                      data.eta
                    ) : <></> || data.etd !== null ? (
                      data.etd
                    ) : (
                      <></>
                    )) !== "Cancelled" ? (
                      (data.etd || data.eta) + " ⏱️"
                    ) : (
                      <></>
                    )}
                  </Tooltip>
                </x>
                <Tooltip title="🟢On time 🟠Warning">
                  {(data.atd || data.ata) !== null &&
                    ((data.atd || data.ata) !== "On time" ? (
                      <p>&nbsp;🟠</p>
                    ) : (
                      <p>&nbsp;🟢</p>
                    ))}
                </Tooltip>
                <Tooltip title="Train no longer departs from here">
                  {(data.eta || data.etd) == "Cancelled" && (
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
              {(data.eta || data.etd) == "Cancelled" && <p>&nbsp;🟠</p>}
            </Tooltip> */}
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
                      (whiteBlue == "white" &&
                        alert(
                          "Train has not called at " +
                            data.locationName +
                            " yet"
                        )) +
                      (whiteBlue !== "white" &&
                        alert("Train has called at " + data.locationName))
                    }
                    sx={{
                      width: "30px",
                      background: whiteBlue || "white",
                      height: "30px",
                      position: "absolute",
                      right: "10px",
                      borderRadius: "100%",
                      color: "white",
                      lineHeight: "32px",
                      fontSize: "15px",
                      border: "1px dashed grey",
                      userSelect: "none",
                    }}
                  >
                    ✔
                  </Box>
                </Box>
              </tr>
            </Table>
          </div>
          {data.subsequentCallingPoints && (
            <div>
              {data.subsequentCallingPoints?.map((calling, position) => {
                return (
                  <DisplayStopsPrevSubs
                    calling={calling}
                    position={position}
                    handleOpen={handleOpen}
                    prevOrSub={1}
                    length={data.subsequentCallingPoints?.length}
                    setLS={setLS}
                    ls={ls}
                  />
                );
              })}
            </div>
          )}
        </>
      )}

      {allStaffServiceData && showStaffData && (
        <DisplayStaffStops
          allStaffServiceData={allStaffServiceData}
          serverName={serverName}
          setUpdateServicePageButton={setUpdateServicePageButton}
        />
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {station && (
            <>
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
                  {indicator == 0 && station && (
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
                            width: "50%",
                          }}
                        >
                          Estimated arrival:
                          <br />
                          {station.eta ? <>{station.eta}</> : <>N/A</>}
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
                          <br /> {station.etd ? <>{station.etd}</> : <>N/A</>}
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
                          <br /> {station.sta ? <>{station.sta}</> : <>N/A</>}
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
                          <br /> {station.std ? <>{station.std}</> : <>N/A</>}
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
                          {station.ata ? <>{station.ata}</> : <>N/A</>}
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
                                <>{station.atd}</>
                              ) : (
                                <>N/A</>
                              )}
                            </>
                          ) : (
                            <>N/A</>
                          )}
                        </p>
                      </div>
                    </>
                  )}
                  {indicator == 1 && station && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <p
                          style={{
                            background: "#f0f0f0",
                            borderRadius: "15px",
                            padding: "10px",
                            width: "50%",
                            marginBottom: "-5px",
                          }}
                        >
                          <>
                            Estimated departure:
                            <br /> {station.et ? <>{station.et}</> : <>N/A</>}
                          </>
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
                          Scheduled departure:
                          <br /> {station.st ? <>{station.st}</> : <>N/A</>}
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
                          {station.at ? (
                            <>
                              {!station.at.includes("null") ? (
                                <>{station.at}</>
                              ) : (
                                <>N/A</>
                              )}
                            </>
                          ) : (
                            <>N/A</>
                          )}
                        </p>
                      </div>{" "}
                    </>
                  )}
                </Typography>
              </Box>
            </>
          )}
        </>
      </Modal>
    </>
  );
}
