import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar.js";
import Login from "../Login/Login";
import useToken from "../App/useToken";
import byebye from "../App/App.js";
import Fade from "react-reveal/Fade";

export let currentFontSize;
export let currentTheme;
export let currentAzure;
export let serviceCode;
export let enableWindow;
export let verticalMenu;

if (localStorage.getItem("fontSize") == null) {
  currentFontSize = "Standard font size";
}

if (localStorage.getItem("fontSize") == 16) {
  currentFontSize = "Standard font size";
}
if (localStorage.getItem("fontSize") == 18) {
  currentFontSize = "Large font size";
}
if (localStorage.getItem("fontSize") == 11) {
  currentFontSize = "Small font size";
}

if (localStorage.getItem("darkMode") == null) {
  localStorage.setItem("darkMode", "#ffffff");
  currentTheme = "Light";
}
if (localStorage.getItem("darkMode") == "#ffffff") {
  currentTheme = "Light";
}
if (localStorage.getItem("darkMode") == "#000000") {
  currentTheme = "Dark";
}
if (localStorage.getItem("darkMode") == "#c7dcff") {
  currentTheme = "Colourful";
  localStorage.setItem("darkMode", "#8297b5");
}
if (localStorage.getItem("darkMode") == "#8297b5") {
  currentTheme = "Colourful";
}

export default function Settings() {
  const [fontSize, setFontSize] = useState(16);
  const { token, setToken, removeToken, getToken } = useToken();
  const [currentAzureDisplay, setCurrentAzureDisplay] = useState();
  const [serviceCodeDisplay, setServiceCodeDisplay] = useState();
  const [enableWindowDisplay, setEnableWindowDisplay] = useState();
  const [enableVerticalMenu, setEnableVerticalMenu] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    if (currentAzureDisplay == undefined) {
      if (currentAzure == undefined) {
        currentAzure = "Local";
        setCurrentAzureDisplay("Local");
      } else {
        setCurrentAzureDisplay(currentAzure);
      }
    }

    if (serviceCodeDisplay == undefined) {
      if (serviceCode == undefined) {
        serviceCode = "Hide";
        setServiceCodeDisplay("Hide");
      } else {
        setServiceCodeDisplay(serviceCode);
      }
    }

    if (enableWindowDisplay == undefined) {
      if (enableWindow == undefined) {
        enableWindow = "Show";
        setEnableWindowDisplay("Show");
      } else {
        setEnableWindowDisplay(enableWindow);
      }
    }

    if (enableVerticalMenu == undefined) {
      if (verticalMenu == undefined) {
        verticalMenu = "Off";
        setEnableVerticalMenu("Off");
      } else {
        setEnableVerticalMenu(verticalMenu);
      }
    }
  }, []);

  function fontSizeIncrease() {
    setFontSize(fontSize + 2);
    localStorage.setItem("fontSize", 18);
  }

  function fontSizeDecrease() {
    setFontSize(fontSize - 2);
    localStorage.setItem("fontSize", 11);
  }

  function fontSizeReset() {
    setFontSize(fontSize - 2);
    localStorage.setItem("fontSize", 16);
  }

  function darkMode() {
    localStorage.setItem("darkMode", "#000000");
    window.location.reload();
  }

  function lightMode() {
    localStorage.setItem("darkMode", "#ffffff");
    window.location.reload();
  }

  function ColourfulMode() {
    localStorage.setItem("darkMode", "#8297b5");
    window.location.reload();
  }

  function logOut() {
    removeToken();
    window.location.reload();
  }

  function applyFont() {
    window.location.reload();
  }

  function changeAzure() {
    if (currentAzure == "External") {
      currentAzure = "Local";
      setCurrentAzureDisplay("Local");
    } else if (currentAzure == "Local") {
      currentAzure = "External";
      setCurrentAzureDisplay("External");
    }

    if (currentAzure == undefined) {
      currentAzure = "Local";
      setCurrentAzureDisplay("Local");
    }
  }

  function showServiceCode() {
    if (serviceCode == "Show") {
      serviceCode = "Hide";
      setServiceCodeDisplay("Hide");
    } else if (serviceCode == "Hide") {
      serviceCode = "Show";
      setServiceCodeDisplay("Show");
    }
    if (serviceCode == undefined) {
      serviceCode = "Hide";
      setServiceCodeDisplay("Hide");
    }
  }

  function showWindow() {
    if (enableWindow == "Show") {
      enableWindow = "Hide";
      setEnableWindowDisplay("Hide");
    } else if (enableWindow == "Hide") {
      enableWindow = "Show";
      setEnableWindowDisplay("Show");
    }
    if (enableWindow == undefined) {
      enableWindow = "Hide";
      setEnableWindowDisplay("Hide");
    }
  }

  function showVerticalMenu() {
    if (localStorage.getItem("menuStyle") == "On") {
      verticalMenu = "Off";
      setEnableVerticalMenu("Off");
      localStorage.setItem("menuStyle", "Off");
    } else if (localStorage.getItem("menuStyle") == "Off") {
      verticalMenu = "On";
      setEnableVerticalMenu("On");
      localStorage.setItem("menuStyle", "On");
    }
    if (localStorage.getItem("menuStyle") == undefined) {
      verticalMenu = "On";
      setEnableVerticalMenu("On");
      localStorage.setItem("menuStyle", "On");
    }
    window.location.reload();
  }

  function handleHideMenu() {
    if (localStorage.getItem("menuHide") == "TRUE") {
      localStorage.setItem("menuHide", "FALSE");
    } else {
      localStorage.setItem("menuHide", "TRUE");
    }

    window.location.reload();
  }

  function handleMenuBorder() {
    if (localStorage.getItem("menuBorder") == "TRUE") {
      localStorage.setItem("menuBorder", "FALSE");
    } else {
      localStorage.setItem("menuBorder", "TRUE");
    }

    window.location.reload();
  }

  function getRandomColor() {
    var letters = "7DCBA98789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <Fade top distance={"10px"} duration={1500}>
      <div style={{ width: "98vw", height: "100vh" }}>
        <h3 style={{ textAlign: "center", marginTop: "1.5em" }}>Settings</h3>
        <br />
        <Fade top distance={"10px"} duration={1500}>
          <div
            className="optionInput"
            style={{
              background: "#f0f0f0",
            }}
          >
            <h3>System</h3>
            <div className="topBanner1" style={{ paddingBottom: 1 }}>
              <h4>
                <a href="/NRLT">
                  <button
                    id="showHide"
                    style={{
                      fontSize: "medium",
                      padding: "15px",
                      margin: "0px",
                    }}
                    className="logOut"
                    onClick={logOut}
                  >
                    ￩ Exit To Home Page
                  </button>
                </a>
              </h4>
              <h4>
                <a href="/NRLT">
                  <button
                    id="showHide"
                    style={{
                      fontSize: "medium",
                      padding: "15px",
                      margin: "0px",
                    }}
                    className="logOut"
                    onClick={() => window.location.reload()}
                  >
                    ↺ Reload App
                  </button>
                </a>
              </h4>
            </div>
          </div>
        </Fade>
        <br />
        <br />
        <Fade top distance={"30px"} duration={1500}>
          <div className="optionInput" style={{ background: "#b9ebe5" }}>
            <h3>Data</h3>
            <text style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  background: "#ffffff77",
                  borderRadius: "20px",
                  width: "80%",
                  padding: "10px",
                }}
              >
                {" "}
                Azure Server: {currentAzureDisplay} Owner
                <br /> <br />
                <button id="useCurrentLocation" onClick={changeAzure}>
                  {currentAzureDisplay == "External" && "Change To Local"}
                  {currentAzureDisplay == "Local" && "Change To External"}
                </button>
                <br />
                <a href="https://trainwebappv2.azurewebsites.net/">
                  <button id="useCurrentLocation">Visit Local Server</button>
                </a>
              </div>
            </text>
            <br />
            <text style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  background: "#ffffff77",
                  borderRadius: "20px",
                  width: "80%",
                  padding: "10px",
                }}
              >
                Search History:{" "}
                {localStorage.getItem("stationHistory")?.length
                  ? "Saved"
                  : "Cleared"}
                <br /> <br />
                <button
                  id="useCurrentLocation"
                  onClick={() =>
                    alert(
                      "Previous Searches:\n\n" +
                        localStorage
                          .getItem("stationHistoryFull")
                          .replaceAll(",", ", ") +
                        "\n\nStations:\n\n" +
                        localStorage
                          .getItem("stationHistory")
                          .replaceAll(",", ", ") +
                        "\n\nDate & Time:\n\n" +
                        localStorage
                          .getItem("dateTimeHistory")
                          .replaceAll(",", ", ")
                    )
                  }
                  disabled={!localStorage.getItem("stationHistory")?.length}
                  style={{
                    background:
                      !localStorage.getItem("stationHistory")?.length &&
                      "#cccccc",
                  }}
                >
                  Show History
                </button>
                <br />
                <button
                  id="useCurrentLocation"
                  onClick={() =>
                    localStorage.removeItem("stationHistory") +
                    localStorage.removeItem("dateTimeHistory") +
                    localStorage.removeItem("stationHistoryFull") +
                    window.location.reload()
                  }
                >
                  Clear
                </button>
              </div>
            </text>
            <br />
          </div>
        </Fade>
        <br />
        <br />
        <Fade top distance={"50px"} duration={1500}>
          <div className="optionInput">
            <h3>Display</h3>
            <text style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  background: "#ffffff77",
                  borderRadius: "20px",
                  width: "80%",
                  padding: "10px",
                }}
              >
                {" "}
                Vertical Menu:{" "}
                {(localStorage.getItem("menuStyle") &&
                  localStorage.getItem("menuStyle")) ||
                  "Off"}
                <br /> <br />
                <button id="useCurrentLocation" onClick={showVerticalMenu}>
                  {(localStorage.getItem("menuStyle") &&
                    localStorage.getItem("menuStyle") == "Off" &&
                    "Turn On") ||
                    "Turn Off"}
                </button>
              </div>
            </text>
            <br />
            <text style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  background: "#ffffff77",
                  borderRadius: "20px",
                  width: "80%",
                  padding: "10px",
                }}
              >
                Hide Menu On Scroll:{" "}
                {localStorage.getItem("menuHide") !== "TRUE" && "Off"}
                {localStorage.getItem("menuHide") == "TRUE" && "On"}
                <br /> <br />
                <button
                  id="useCurrentLocation"
                  onClick={() => handleHideMenu()}
                >
                  {localStorage.getItem("menuHide") !== "TRUE" && "Turn On"}
                  {localStorage.getItem("menuHide") == "TRUE" && "Turn Off"}
                </button>
              </div>
            </text>
            <br />
            <text style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  background: "#ffffff77",
                  borderRadius: "20px",
                  width: "80%",
                  padding: "10px",
                }}
              >
                Show Menu Background:{" "}
                {localStorage.getItem("menuBorder") !== "TRUE" && "Off"}
                {localStorage.getItem("menuBorder") == "TRUE" && "On"}
                <br /> <br />
                <button
                  id="useCurrentLocation"
                  onClick={() => handleMenuBorder()}
                >
                  {localStorage.getItem("menuBorder") !== "TRUE" && "Turn On"}
                  {localStorage.getItem("menuBorder") == "TRUE" && "Turn Off"}
                </button>
              </div>
            </text>
            <br />
            <text style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  background: "#ffffff77",
                  borderRadius: "20px",
                  width: "80%",
                  padding: "10px",
                }}
              >
                {" "}
                Theme: {currentTheme}{" "}
                {!currentTheme && localStorage.getItem("darkMode") == "BONUS"
                  ? "Hybrid"
                  : !currentTheme &&
                    "Random (" + localStorage.getItem("darkMode") + ")"}
                <br /> <br />
                <button
                  id="useCurrentLocation"
                  onClick={darkMode}
                  disabled={currentTheme == "Dark"}
                  style={{ background: currentTheme == "Dark" && "#cccccc" }}
                >
                  Dark Mode
                </button>
                <button
                  id="useCurrentLocation"
                  onClick={lightMode}
                  disabled={currentTheme == "Light"}
                  style={{ background: currentTheme == "Light" && "#cccccc" }}
                >
                  Light Mode
                </button>
                <br />
                <button
                  id="useCurrentLocation"
                  onClick={ColourfulMode}
                  disabled={currentTheme == "Colourful"}
                  style={{
                    background: currentTheme == "Colourful" && "#cccccc",
                  }}
                >
                  Colourful Mode
                </button>
                <button
                  id="useCurrentLocation"
                  onClick={() =>
                    localStorage.setItem("darkMode", "BONUS") +
                    window.location.reload()
                  }
                  disabled={localStorage.getItem("darkMode") == "BONUS"}
                  style={{
                    background:
                      localStorage.getItem("darkMode") == "BONUS" && "#cccccc",
                  }}
                >
                  Hybrid Mode
                </button>
                <br />
                <br />
                <button
                  id="useCurrentLocation"
                  onClick={() =>
                    localStorage.setItem("darkMode", getRandomColor()) +
                    window.location.reload()
                  }
                  disabled={localStorage.getItem("darkMode") == "RANDOM"}
                  style={{
                    background:
                      localStorage.getItem("darkMode") == "RANDOM" &&
                      getRandomColor(),
                  }}
                >
                  Generate Random
                </button>
              </div>
            </text>
            <br />
            <text style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  background: "#ffffff77",
                  borderRadius: "20px",
                  width: "80%",
                  padding: "10px",
                }}
              >
                <div>
                  {" "}
                  Font Size:
                  {currentFontSize.slice(0, 2) == "La" && " Large"}
                  {currentFontSize.slice(0, 2) == "Sm" && " Small"}
                  {currentFontSize.slice(0, 2) == "St" && " Medium"}
                  <br /> <br />
                  <button
                    id="useCurrentLocation"
                    onClick={fontSizeIncrease}
                    style={{
                      background: "white",
                      color: "black",
                      border: "1px solid grey",
                    }}
                  >
                    ︽ Large
                  </button>
                  <button
                    id="useCurrentLocation"
                    onClick={fontSizeDecrease}
                    style={{
                      background: "white",
                      color: "black",
                      border: "1px solid grey",
                    }}
                  >
                    ︾ Small
                  </button>
                  <br />
                  <button
                    id="useCurrentLocation"
                    onClick={fontSizeReset}
                    style={{
                      background: "white",
                      color: "black",
                      border: "1px solid grey",
                    }}
                  >
                    ━ Medium
                  </button>
                  <br />
                </div>
                <text style={{ display: "flex", justifyContent: "center" }}>
                  <p
                    style={{
                      fontSize: Number(localStorage.getItem("fontSize")),
                      background: "white",
                      borderRadius: "15px",
                      width: "50%",
                      padding: "10px",
                      minHeight: "55px",
                      margin: "16px",
                      marginBottom: "35px",
                    }}
                  >
                    Example text to test font size
                  </p>
                </text>
                <button id="useCurrentLocation" onClick={applyFont}>
                  ☑ Apply Font Size
                </button>
              </div>
            </text>
            <br />
          </div>
        </Fade>
        <br />
        <br />
      </div>
    </Fade>
  );
}
