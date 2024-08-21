import { Box, Button, ButtonGroup } from "@mui/material";
import "./trainBus.css";

export default function TrainBus({
  isOpen,
  trainSearch,
  textInfo,
  handleDepartureClick,
  earlier,
  earlier2,
  Table,
  stringDepartures,
  routeChange,
  later,
  later2,
  current,
  timeButton,
}) {
  return (
    <div style={{ marginTop: -5 }}>
      <div>
        <p className="highlights">
          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontFamily: "unset",
              marginBottom: "-20px",
              marginTop: "-1px",
            }}
          >
            <text style={{ wordBreak: "break-word", hyphens: "auto" }}>
              {textInfo}
            </text>
          </pre>
          <br />

          {/* <div>
                {newsLink[0]?.map((row) => (
                  <a href={row}>
                    <br />
                    <text style={{ wordBreak: "break-word", hyphens: "auto" }}>
                      {row}
                    </text>
                  </a>
                ))}
              </div> */}
        </p>
        <br />
        {/* <Box>
          <button
            className="changeTime"
            style={{ marginBottom: "10px" }}
            onClick={() => handleDepartureClick(earlier)}
          >
            120 - 100 minutes ago
          </button>
          <br />
          <button
            className="changeTime"
            style={{ marginBottom: "10px" }}
            onClick={() => handleDepartureClick(earlier2)}
          >
            100 minutes ago - present
          </button>
          <br />
          <button
            className="changeTime"
            style={{ marginTop: "10px" }}
            onClick={() => handleDepartureClick(later)}
          >
            100 minutes later
          </button>
          <br />
          <button
            className="changeTime"
            style={{ marginTop: "10px" }}
            onClick={() => handleDepartureClick(later2)}
          >
            100 - 120 minutes later
          </button>
          <br />
        </Box> */}
        <ButtonGroup
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
              backgroundColor: timeButton == earlier && "#0080ff",
              color: timeButton == earlier && "white",
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
              backgroundColor: timeButton == earlier2 && "#0080ff",
              color: timeButton == earlier2 && "white",
              border: "1px solid lightGrey",
              fontSize: "smaller",
            }}
          >
            -100 min
          </Button>
          <Button
            className="changeTime"
            // style={{ marginTop: "10px" }}
            onClick={() => handleDepartureClick(current)}
            style={{
              backgroundColor: timeButton == "" && "#0080ff",
              color: timeButton == "" && "white",
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
              backgroundColor: timeButton == later && "#0080ff",
              color: timeButton == later && "white",
              border: "1px solid lightGrey",
              fontSize: "smaller",
            }}
          >
            +100 min
          </Button>
          <Button
            className="changeTime"
            // style={{ marginTop: "10px" }}
            onClick={() => handleDepartureClick(later2)}
            style={{
              backgroundColor: timeButton == later2 && "#0080ff",
              color: timeButton == later2 && "white",
              border: "1px solid lightGrey",
              fontSize: "smaller",
            }}
          >
            +120 min
          </Button>
        </ButtonGroup>
        <br />
        <br />
        <Table className="transactions" style={{ backgroundColor: "#f0f0f0" }}>
          {stringDepartures.map((departures, index) => (
            <tr
              data-index={index}
              className="tableTR"
              onClick={() => routeChange(departures, index)}
            >
              <td>{departures}</td>
              <br />
              <br />
              <br />
            </tr>
          ))}
        </Table>
        <br />

        <br />
      </div>
    </div>
  );
}
