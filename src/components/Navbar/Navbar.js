import React from "react";
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
import DepartArrive from "../DepartArrive/DepartArrive";
import { verticalMenu } from "../Settings/Settings";

import Settings from "../Settings/Settings.js";

const Navbar = () => {
  return (
    <HashRouter>
      <navbar
        className="NavBar1"
        style={
          localStorage.getItem("menuStyle") == "On"
            ? {
                display: "flex",
                marginTop: "-50px",
                marginBottom: "-20px",
                flexDirection: "column",
              }
            : {}
        }
      >
        <NavLink
          exact
          className="topRow2"
          activeClassName="topRow2Active"
          to="/dashboard"
        >
          Departing
        </NavLink>
        <NavLink
          className="topRow2"
          activeClassName="topRow2Active"
          to="/dataFeed"
        >
          Arriving
        </NavLink>
        <NavLink
          className="topRow2"
          activeClassName="topRow2Active"
          to="/linkPage"
        >
          Service
        </NavLink>
        <NavLink
          className="topRow2"
          activeClassName="topRow2Active"
          to="/settings"
        >
          Settings
        </NavLink>
      </navbar>

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dataFeed" element={<DataFeed />} />
        <Route path="/linkPage" element={<LinkPage />} />
        <Route path="/settings" element={<Settings />} />
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
};

export default Navbar;
