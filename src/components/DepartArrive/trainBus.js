import { Box, Button, ButtonGroup } from "@mui/material";
import "./trainBus.css";

export default function TrainBus({
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
  rememberTimeOffset,
}) {
  return (
    <div style={{ marginTop: -5 }}>
      <div style={{ marginBottom: "20px" }}>
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
        </p>
        <br />
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
            -100 min
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
            +100 min
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
      </div>
    </div>
  );
}
