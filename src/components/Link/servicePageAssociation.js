import React, { useState, useEffect, useRef } from "react";
import "../App/App.css";
import image from "../../assets/nre-logo.png";
import { currentAzure, enableWindow } from "../Settings/Settings";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import LinearProgress from "@mui/material-next/LinearProgress";
import Fade from "react-reveal/Fade";
import { Button, ButtonBase, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DisplayStops, { test2 } from "./displayStops";
import { delayReason } from "./delayReasons";
import { cancelReason } from "./cancelReasons";
import ServicePageForm from "./servicePageForm";

export default function ServicePageAssociation({ allStaffServiceData }) {
  let rememberStaffData = allStaffServiceData;
  return (
    <>
      {true && (
        <div>
          {rememberStaffData && rememberStaffData.locations && (
            <p className="infoTrain" style={{ margin: "0px" }}>
              {rememberStaffData.locations
                ? rememberStaffData.locations[0].std.slice(11, 16)
                : rememberStaffData.locations[0].sta.slice(11, 16)}{" "}
              at {rememberStaffData.locations[0].locationName}:{" "}
              {
                rememberStaffData.locations[
                  rememberStaffData.locations.length - 1
                ].locationName
              }{" "}
              from {rememberStaffData.locations[0].locationName}
            </p>
          )}
        </div>
      )}
    </>
  );
}
