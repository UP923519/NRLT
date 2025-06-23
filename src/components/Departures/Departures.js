import { useEffect, useState } from "react";
import axios from "axios";
import NreLogo from "../NRELogo/NreLogo";
import SelectComp from "./SelectComp";
import Results from "./Results";

export default function Departures() {
  const [response, setResponse] = useState("");

  const runSearchFetch = async () => {
    let response = await axios.request(reqOptions);
    setResponse(response.data);
  };

  let headersList = {
    // "User-Agent": "",
    "x-apikey": "ee4CjRuGqLDyGq1R9bwq9EdhheNIslgdUNi5ZVOwqZMiojLZ",
  };

  let reqOptions = {
    url: "https://api1.raildata.org.uk/1010-live-departure-board---staff-version1_0/LDBSVWS/api/20220120/GetDepBoardWithDetails/CLJ/20250621T130000?",
    method: "GET",
    headers: headersList,
  };

  runSearchFetch();

  return (
    <>
      <SelectComp />
      <br />
      <NreLogo />
      <Results response={response}></Results>
    </>
  );
}
