import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function Results(response) {
  const [listOfStations, setListOfStations] = useState(null);

  useEffect(() => {}, []);

  return (
    <>
      <Table className="transactions" style={{ backgroundColor: "#f0f0f0" }}>
        {response.map((result, index) => (
          <tr
            data-index={index}
            className="tableTR"
            // onClick={() => routeChange(result, index)}
          >
            <td>{result}</td>
            <br />

            <br />
            <br />
          </tr>
        ))}
      </Table>
    </>
  );
}
