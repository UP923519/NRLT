import { Box, Button, ButtonGroup } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

import "./trainBus.css";
import ScrollButton from "./scrollButton";

export default function TrainBus({
  textInfo,
  nrccMessages,
  handleDepartureClick,
  earlier,
  earlier2,
  Table,
  stringDepartures,
  routeChange,
  later,
  later2,
  current,
  rememberTimeOffset,
  displayStation,
  showScrollButton,
}) {
  const [showAlerts, setShowAlerts] = useState(true);

  const myRef = useRef(null);

  const executeScroll = () => {
    myRef.current.scrollIntoView({ behavior: "smooth" });
    window.scrollTo({
      top: 340,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ marginTop: -15 }}>
      <ScrollButton
        executeScroll={executeScroll}
        showScrollButton={showScrollButton}
      />
      {/* marginTop is -5 with the time selector component */}
      <ref ref={myRef}></ref>
      <div style={{ marginBottom: "20px" }}>
        {displayStation && (
          <p
            className="highlights"
            style={{
              paddingBottom: nrccMessages && "0px",
              marginTop: "20px",
              background: !nrccMessages && "#4a6e40",
              color: !nrccMessages && "white",
              boxShadow:
                "0 6px 20px 0 rgba(0, 0, 0, 0.19), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <pre
              style={{
                whiteSpace: "pre-wrap",
                fontFamily: "unset",
                marginBottom: "-20px",
                marginTop: "-1px",
              }}
            >
              <text style={{ wordBreak: "break-word", hyphens: "auto" }}>
                {/* {textInfo} */}
                <text style={{ fontSize: "medium" }}>
                  {nrccMessages &&
                    nrccMessages.length +
                      (nrccMessages.length > 1
                        ? " alerts for "
                        : " alert for ") +
                      displayStation +
                      "\n"}

                  {nrccMessages && (
                    <button
                      type="button"
                      style={{
                        textAlign: "center",
                        width: "30px",
                        margin: "10px",
                        paddingBottom: "3px",
                        background: "#e3e3e3",
                        marginBottom: "0px",
                      }}
                      onClick={() =>
                        showAlerts ? setShowAlerts(false) : setShowAlerts(true)
                      }
                    >
                      {"↨"}
                    </button>
                  )}

                  {nrccMessages && showAlerts && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginLeft: "22px",
                          marginRight: "22px",
                          fontSize: "small",
                          marginBottom: "-15px",
                          marginTop: "-13px",
                          color: "#454545",
                        }}
                      >
                        <text>Type</text>
                        <text>Severity</text>
                      </div>
                    </>
                  )}
                  {!showAlerts && (
                    <>
                      <div style={{ marginBottom: "10px" }}></div>
                    </>
                  )}
                  {nrccMessages && showAlerts && (
                    <hr style={{ border: "0px dashed black", width: "15%" }} />
                  )}
                </text>
                {!nrccMessages &&
                  displayStation &&
                  "No alerts for " + displayStation}
                {showAlerts && (
                  <>
                    {nrccMessages?.map((message) => (
                      <>
                        <div
                          style={{
                            boxShadow:
                              "0 6px 20px 0 rgba(0, 0, 0, 0.19), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                            borderRadius: "20px",
                            padding: "5px",
                            marginLeft: "-9px",
                            marginRight: "-9px",
                            background: "#fafafadd",
                            paddingBottom: "25px",
                            border:
                              (message["severity"] == "Major" &&
                                "1px solid red") ||
                              (message["severity"] == "Minor" &&
                                "2px solid orange") ||
                              (message["severity"] == "Normal" &&
                                "2px solid rgb(196, 228, 255)"),
                          }}
                          dangerouslySetInnerHTML={{
                            __html:
                              "<div style=display:flex;justify-content:space-between;margin-left:25px;margin-right:25px;margin-bottom:15px;>" +
                              "<text style=font-size:small;color:#808080;>" +
                              message["category"] +
                              "</text>" +
                              "<text style=font-size:small;color:#808080;>" +
                              message["severity"] +
                              "</text>" +
                              "</div>" +
                              message["xhtmlMessage"],
                          }}
                        />
                        <hr
                          style={{
                            border: "0px dashed black",
                            width: "15%",
                            marginBottom: "0px",
                          }}
                        />
                      </>
                    ))}
                  </>
                )}
              </text>
            </pre>
            <br />
          </p>
        )}
        <br />
        {/* <ButtonGroup
          sx={{ marginBottom: 0 }}
          disableElevation
          variant="contained"
          aria-label="Basic button group"
        >
          <Button
            className="changeTime"
            // style={{ marginBottom: "10px" }}
            onClick={() => handleDepartureClick(earlier)}
            style={{
              backgroundColor: rememberTimeOffset == earlier && "#0080ff",
              color: rememberTimeOffset == earlier && "white",
              border: "1px solid lightGrey",
              fontSize: "smaller",
            }}
          >
            -120 min
          </Button>
          <Button
            className="changeTime"
            // style={{ marginBottom: "10px" }}
            onClick={() => handleDepartureClick(earlier2)}
            style={{
              backgroundColor: rememberTimeOffset == earlier2 && "#0080ff",
              color: rememberTimeOffset == earlier2 && "white",
              border: "1px solid lightGrey",
              fontSize: "smaller",
            }}
          >
            -60 min
          </Button>
          <Button
            className="changeTime"
            // style={{ marginTop: "10px" }}
            onClick={() => handleDepartureClick(current)}
            style={{
              backgroundColor: rememberTimeOffset == "" && "#0080ff",
              color: rememberTimeOffset == "" && "white",
              border: "1px solid lightGrey",
              fontSize: "smaller",
            }}
          >
            Now
          </Button>
          <Button
            className="changeTime"
            // style={{ marginTop: "10px" }}
            onClick={() => handleDepartureClick(later)}
            style={{
              backgroundColor: rememberTimeOffset == later && "#0080ff",
              color: rememberTimeOffset == later && "white",
              border: "1px solid lightGrey",
              fontSize: "smaller",
            }}
          >
            +60 min
          </Button>
          <Button
            className="changeTime"
            // style={{ marginTop: "10px" }}
            onClick={() => handleDepartureClick(later2)}
            style={{
              backgroundColor: rememberTimeOffset == later2 && "#0080ff",
              color: rememberTimeOffset == later2 && "white",
              border: "1px solid lightGrey",
              fontSize: "smaller",
            }}
          >
            +120 min
          </Button>
        </ButtonGroup>
        <br />
        <br /> */}

        <Table
          className="transactions"
          style={{
            backgroundColor: "#f0f0f044",
          }}
        >
          {stringDepartures.map((departures, index) => (
            <tr
              data-index={index}
              className="tableTR"
              style={{
                background: "#f0f0f0",
                // borderStyle: "solid",
                borderRadius: "20px",
                // borderColor: "#f0f0f0",
                marginBottom: "7.5px",
                marginTop: "7.5px",
                boxShadow:
                  "0 1px 2px 0 rgba(0, 0, 0, 0.19), 0 5px 5px 0 rgba(0, 0, 0, 0.19)",
              }}
              onClick={() => routeChange(departures, index)}
            >
              {/* <td>{departures}</td> */}
              <td
                dangerouslySetInnerHTML={{
                  __html: departures,
                }}
              />

              <br />
              <br />
              <br />
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}
