import { Box, Button, ButtonGroup } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import Fade from "react-reveal/Fade";
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
  processingState,
  isOpen,
  liveDeparture,
  setSelectedDay,
  setSelectedTime,
  rememberDateTime,
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

  function handleLaterButton(date, time) {
    setSelectedDay(date);
    rememberDateTime[1] = date;

    setSelectedTime(time);
    rememberDateTime[0] = time;

    handleDepartureClick("", "", 0, "");
  }

  return (
    <div style={{ marginTop: -15 }}>
      {/* marginTop is -5 with the time selector component */}
      <ref ref={myRef}></ref>
      <div style={{ marginBottom: "20px" }}>
        {displayStation && (
          <p
            className="highlights"
            style={{
              paddingBottom: nrccMessages && "0px",
              marginTop: "20px",
              background: !nrccMessages
                ? "#4a6e40"
                : localStorage.getItem("darkMode") !== "#ffffff"
                ? "#ff8454"
                : "#ffaeae",

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
                    {nrccMessages?.map((message, index) => {
                      return (
                        <>
                          <Fade
                            top
                            distance={(index + 1) * 15 + "px"}
                            duration={1500}
                          >
                            <div
                              style={{
                                boxShadow:
                                  "0 6px 20px 0 rgba(0, 0, 0, 0.19), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                borderRadius: "20px",
                                padding: "5px",
                                marginLeft: "-9px",
                                marginRight: "-9px",
                                background:
                                  localStorage.getItem("darkMode") !== "#ffffff"
                                    ? "#fafafa88"
                                    : "#fafafadd",
                                paddingBottom: "25px",
                                border:
                                  (message["severity"] == "Major" &&
                                    "2px solid red") ||
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
                          </Fade>
                        </>
                      );
                    })}
                  </>
                )}
              </text>
            </pre>
            <br />
          </p>
        )}
        <br />
        <Table
          className="transactions"
          style={{
            backgroundColor: "#f0f0f044",
          }}
        >
          {stringDepartures.map((departures, index) => (
            <Fade top distance={(index + 1) * 15 + "px"} duration={1500}>
              <tr
                data-index={index}
                className="tableTR"
                style={{
                  background:
                    localStorage.getItem("darkMode") == "#000000"
                      ? "#bfbfbf"
                      : localStorage.getItem("darkMode") == "#8297b5"
                      ? "#cbd0f2"
                      : "#f0f0f0",
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
            </Fade>
          ))}
        </Table>

        {liveDeparture.length == 0 && (
          <p style={{ marginBottom: "50px", fontWeight: 500 }}>
            No services at this date and time
          </p>
        )}

        {liveDeparture.length > 0 && (
          <Button
            className="changeTime"
            onClick={() =>
              handleLaterButton(
                liveDeparture[liveDeparture.length - 1].stdSpecified
                  ? liveDeparture[liveDeparture.length - 1].std.slice(0, 10)
                  : liveDeparture[liveDeparture.length - 1].sta.slice(0, 10),
                liveDeparture[liveDeparture.length - 1].stdSpecified
                  ? liveDeparture[liveDeparture.length - 1].std.slice(11, 16)
                  : liveDeparture[liveDeparture.length - 1].sta.slice(11, 16)
              )
            }
            style={{
              background:
                liveDeparture.length > 1
                  ? localStorage.getItem("darkMode") !== "#ffffff"
                    ? "#7788a3"
                    : "white"
                  : localStorage.getItem("darkMode") !== "#ffffff"
                  ? "#616161"
                  : "#f5f5f5",
              color:
                liveDeparture.length > 1
                  ? localStorage.getItem("darkMode") !== "#ffffff"
                    ? "#ffffff"
                    : "#000000"
                  : localStorage.getItem("darkMode") !== "#ffffff"
                  ? "#888888"
                  : "#d1d1d1",
              border: "1px solid lightGrey",
            }}
            disabled={liveDeparture.length <= 1}
          >
            Search Later:{" "}
            {liveDeparture[liveDeparture.length - 1]?.stdSpecified
              ? liveDeparture[liveDeparture.length - 1].std?.slice(11, 16)
              : liveDeparture[liveDeparture.length - 1].sta?.slice(11, 16)}
          </Button>
        )}
      </div>
    </div>
  );
}
