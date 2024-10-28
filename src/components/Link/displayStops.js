import React, { useState } from "react";
import { Table } from "react-bootstrap";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DisplayStopsPrevSubs from "./displayStopsPrevSubs";

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

export default function DisplayStops({ data }) {
  const [station, setStation] = useState();
  const [indicator, setIndicator] = useState();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  function handleOpen(station, indicator) {
    setOpen(true);
    setStation(station);
    setIndicator(indicator);
  }

  console.log("NEWdata", data);
  return (
    <>
      {data.previousCallingPoints && (
        <div>
          {data.previousCallingPoints?.reverse().map((calling, position) => {
            return (
              <DisplayStopsPrevSubs
                calling={calling}
                position={position}
                handleOpen={handleOpen}
                prevOrSub={0}
              />
            );
          })}
        </div>
      )}

      <div style={{ marginBottom: "10px" }}>
        <Table className="transactions" style={{ backgroundColor: "#f0f0f0" }}>
          <tr>
            <th style={{ fontSize: 15 }}>
              Selected station
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
          <tr onClick={() => handleOpen(data, 0)}>
            {data.locationName +
              " " +
              (data.std !== null ? data.std : data.sta) +
              " "}

            {data.atd !== null ? data.atd + " ✔️" : data.etd}
            {data.atd !== null && (data.atd !== "On time" ? " ⚠️" : <></>)}
            {(data.eta || data.etd) == "Cancelled" && " ❌"}
            {data.atd == null && (data.eta || data.etd) !== "Cancelled" ? (
              " 🕰️🚂🚃🚃"
            ) : (
              <></>
            )}
            <br />
            <br />
            <br />
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
              />
            );
          })}
        </div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {" "}
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
                          {station.platform}
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
                        // gap: "10px",
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
          )}
        </>
      </Modal>
    </>
  );
}
