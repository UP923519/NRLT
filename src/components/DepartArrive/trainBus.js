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
}) {
  return (
    <div>
      <div>
        {trainSearch}
        <br />
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
        <button
          className="changeTime"
          style={{ marginTop: "40px" }}
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
        <br />
      </div>
    </div>
  );
}
