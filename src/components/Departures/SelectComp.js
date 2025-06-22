import Select from "react-select";
import { useEffect, useState } from "react";
import StationHistoryChip from "../DepartArrive/stationHistoryChip.js";

export default function SelectComp() {
  const [listOfStations, setListOfStations] = useState(null);

  useEffect(() => {
    getStation();
  }, []);

  async function getStation() {
    const response = await fetch(
      "https://" + "trainwebappv2" + ".azurewebsites.net/crs"
    );
    const data = await response.json();
    let listStation = data;
    let t = getStationList(listStation);
  }

  function getStationList(listStation) {
    let listOfStations = [];
    for (let i = 0; i < listStation.length; i++) {
      listOfStations.push(
        listStation[i].stationName + " (" + listStation[i].crsCode + ")"
      );
    }

    const display = listOfStations.map((opt) => ({ label: opt, value: opt }));
    setListOfStations(display);
  }

  return (
    <>
      <div className="manualInput" style={{ marginTop: "30px" }}>
        <text style={{ textAlign: "left" }}>
          <Select
            defaultValue={[
              {
                value: null,
                label: null,
              },
            ]}
            value={
              null
                ? [
                    {
                      value: null,
                      label: null,
                    },
                  ]
                : [
                    {
                      value: "Select...",
                      label: "Select...",
                    },
                  ]
            }
            options={listOfStations ? listOfStations : []}
            isLoading={listOfStations ? false : true}
            className="selectBox"
            onChange={(opt) =>
              null(
                null,
                opt.value.slice(opt.value.length - 4, -1),
                0,
                opt.value
              )
            }
          />
        </text>
        <StationHistoryChip
          position={0}
          handleDepartureClick={null}
          current={null}
        />
      </div>
    </>
  );
}
