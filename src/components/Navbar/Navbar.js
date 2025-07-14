import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  Navigate,
  NavLink,
  HashRouter,
} from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import App from "../App/App.css";
import LinkPage from "../Link/servicePage.js";
import Dashboard from "../Dashboard/Dashboard";
import DataFeed from "../DataFeed/DataFeed";
import Departures from "../Departures/Departures.js";
import DepartArrive from "../DepartArrive/DepartArrive";
import { verticalMenu } from "../Settings/Settings";
import Fade from "react-reveal/Fade";

import Settings from "../Settings/Settings.js";

export default function Navbar() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let previousScrollPosition = 0;
    let currentScrollPosition = 0;

    if (localStorage.getItem("menuHide") == "TRUE") {
      window.addEventListener("scroll", function (e) {
        // Get the new Value
        currentScrollPosition = window.pageYOffset;

        if (localStorage.getItem("menuStyle") !== "On")
          if (currentScrollPosition < 150) {
            setShow(true);
          } else if (
            previousScrollPosition - currentScrollPosition > 10 ||
            previousScrollPosition - currentScrollPosition < -10
          ) {
            //Subtract the two and conclude
            if (previousScrollPosition - currentScrollPosition < -10) {
              setShow(false);
            } else if (previousScrollPosition - currentScrollPosition > 20) {
              setShow(true);
            }
          }

        // Update the previous value
        previousScrollPosition = currentScrollPosition;
      });
    }
  }, []);

  return (
    <HashRouter>
      <>
        <Fade top distance={"50px"} duration={1500} when={show}>
          {show && (
            <navbar
              className="NavBar1"
              style={
                localStorage.getItem("menuStyle") == "On"
                  ? {
                      display: "flex",
                      marginTop: "-40px",
                      marginBottom: "-30px",
                      flexDirection: "column",
                      zIndex: 999,
                      position: "relative",
                      background:
                        localStorage.getItem("darkMode") == "BONUS" &&
                        "#7788a344",
                    }
                  : {
                      zIndex: 999,
                      marginTop: "-40px",
                      marginBottom: "-40px",
                      border: localStorage.getItem("darkMode")
                        ? localStorage.getItem("darkMode") == "BONUS"
                          ? "2px solid white"
                          : "1px solid " + localStorage.getItem("darkMode")
                        : "1px solid white",
                      background:
                        localStorage.getItem("darkMode") == "BONUS" &&
                        "#7788a344",
                    }
              }
            >
              <NavLink
                exact
                className="topRow2"
                activeClassName="topRow2Active"
                to="/dashboard"
                style={{
                  background:
                    localStorage.getItem("darkMode") !== "#ffffff" && "#4f4f4f",
                  color:
                    localStorage.getItem("darkMode") !== "#ffffff" && "white",
                }}
              >
                Departing
              </NavLink>
              <NavLink
                className="topRow2"
                activeClassName="topRow2Active"
                to="/dataFeed"
                style={{
                  background:
                    localStorage.getItem("darkMode") !== "#ffffff" && "#4f4f4f",
                  color:
                    localStorage.getItem("darkMode") !== "#ffffff" && "white",
                }}
              >
                Arriving
              </NavLink>
              <NavLink
                className="topRow2"
                activeClassName="topRow2Active"
                to="/linkPage"
                style={{
                  background:
                    localStorage.getItem("darkMode") !== "#ffffff" && "#4f4f4f",
                  color:
                    localStorage.getItem("darkMode") !== "#ffffff" && "white",
                }}
              >
                Service
              </NavLink>
              <NavLink
                className="topRow2"
                activeClassName="topRow2Active"
                to="/settings"
                style={{
                  background:
                    localStorage.getItem("darkMode") !== "#ffffff" && "#4f4f4f",
                  color:
                    localStorage.getItem("darkMode") !== "#ffffff" && "white",
                }}
              >
                Settings
              </NavLink>
              {/* <NavLink
                className="topRow2"
                activeClassName="topRow2Active"
                to="/departures"
              >
                New!
              </NavLink> */}
            </navbar>
          )}
        </Fade>
        <br />
      </>

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dataFeed" element={<DataFeed />} />
        <Route path="/linkPage" element={<LinkPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/Departures" element={<Departures />} />

        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route
          path="*"
          element={
            <div>
              <h2>404 - Page not found</h2>
              <h3>Sorry, this page doesn't exist here</h3>
              <NavLink
                exact
                className="backHome"
                activeClassName="topRow2Active"
                to="/dashboard"
              >
                Back to Home
              </NavLink>
            </div>
          }
        />
      </Routes>
    </HashRouter>
  );
}
