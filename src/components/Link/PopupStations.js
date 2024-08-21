import { useEffect } from "react";
import "../App/App.css";
import Fade from "react-reveal/Fade";

export function PopupStations({
  calling,
  Popup,
  platformNumber,
  popOpen,
  stringCalling,
}) {
  useEffect(() => {});

  return (
    <>
      <Popup
        trigger={
          <td>
            {popOpen ? (
              <>
                <button id="useTrains" type="button">
                  Service status & times
                </button>
              </>
            ) : (
              <>
                {calling[0] && (
                  <>
                    {!calling[0][0].includes("null") ? (
                      <>{calling[0][0]}</>
                    ) : (
                      <>N/A</>
                    )}
                    {!calling[0][1].includes("null") ? (
                      <>{calling[0][1]}</>
                    ) : (
                      <>N/A</>
                    )}
                    {!calling[0][2].includes("null") ? (
                      <>{calling[0][2]}</>
                    ) : (
                      <>N/A</>
                    )}
                    {!calling[0][3].includes("null") ? (
                      <>{calling[0][3]}</>
                    ) : (
                      <>N/A</>
                    )}
                    {calling[0][4] ? <>{calling[0][4]}</> : <></>}
                  </>
                )}
              </>
            )}
          </td>
        }
        modal
        nested
      >
        {(close) => (
          <Fade top duration={500} distance={"100px"}>
            <>
              <div
                onClick={() => {
                  console.log(calling);
                }}
              >
                {calling[0] && (
                  <>
                    <p style={{ margin: "5px" }}>Service status & timings</p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      {" "}
                      <p
                        style={{
                          background: "#b1d1de",
                          borderRadius: "15px",
                          padding: "10px",
                          width: "50%",
                        }}
                      >
                        {calling[0][0]}
                      </p>
                    </div>
                  </>
                )}

                {calling.length > 1 ? (
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
                        <text style={{ color: "white" }}>{platformNumber}</text>
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
                        {calling[3] ? <>{calling[3]}</> : <>N/A</>}
                      </p>
                      <p
                        style={{
                          background: "#f0f0f0",
                          borderRadius: "15px",
                          padding: "10px",
                          width: "50%",
                        }}
                      >
                        {calling[0][3].includes(":") ||
                        calling[0][3].includes("On time") ? (
                          <>Estimated departure: </>
                        ) : (
                          <>Departure status: </>
                        )}
                        <br /> {calling[0][3] ? <>{calling[0][3]}</> : <>N/A</>}
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
                        <br /> {calling[5] ? <>{calling[5]}</> : <>N/A</>}
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
                        <br /> {calling[6] ? <>{calling[6]}</> : <>N/A</>}
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
                        {calling[1] ? <>{calling[1]}</> : <>N/A</>}
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
                        {calling[2] ? (
                          <>
                            {!calling[2].includes("null") ? (
                              <>{calling[2]}</>
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
                ) : (
                  <>
                    {" "}
                    {calling[0] && (
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
                            {calling[0][3].includes(":") ||
                            calling[0][3].includes("On time") ? (
                              <>Estimated departure: </>
                            ) : (
                              <>Departure status: </>
                            )}
                            <br />{" "}
                            {calling[0][3] ? <>{calling[0][3]}</> : <>N/A</>}
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
                            <br />{" "}
                            {calling[0][1] ? <>{calling[0][1]}</> : <>N/A</>}
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
                            {calling[0][2] ? (
                              <>
                                {!calling[0][2].includes("null") ? (
                                  <>{calling[0][2]}</>
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
                  </>
                )}
              </div>

              <button
                id="useTrains"
                style={{ margin: "0px" }}
                onClick={() => close()}
              >
                Close
              </button>
            </>
          </Fade>
        )}
      </Popup>
    </>
  );
}
