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

export default function ServicePageForm(handleServiceClick, clearAll) {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const myRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function toggleForm() {
    setIsOpenForm((isOpenForm) => !isOpenForm);
  }

  return (
    <>
      <div className="manualInput" style={{ marginTop: "50px" }}>
        <form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            handleServiceClick();
          }}
        >
          <>
            <button
              type="button"
              style={{
                textAlign: "center",
                width: "30px",
                margin: "10px",
                paddingBottom: "3px",
              }}
              onClick={toggleForm}
            >
              {"↨"}
            </button>
            <br />
          </>

          {isOpenForm && (
            <label>
              <a href="https://www.nationalrail.co.uk/status-and-disruptions/">
                <button
                  type="button"
                  id="showHide"
                  style={{
                    fontSize: "medium",
                    marginTop: "5px",
                    padding: "9px",
                    background: "#243a5eAA",
                    color: "white",
                    marginBottom: "15px",
                  }}
                  className="logOut"
                >
                  🔗 Status and disruptions
                </button>
              </a>
              <div>
                <Button
                  type="button"
                  id="useTrains"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    textTransform: "none",
                    paddingTop: "0.5px !important",
                    paddingBottom: "0.5px !important",
                  }}
                >
                  ⚙️ Options
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    type="reset"
                    onClick={() => handleClose() + clearAll()}
                  >
                    ❌ Reset
                  </MenuItem>
                </Menu>
              </div>
            </label>
          )}
        </form>
      </div>
    </>
  );
}
