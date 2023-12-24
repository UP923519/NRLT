import React, { useState, useEffect } from "react";
import "../App/App.css";
import { Table } from "react-bootstrap";
import Select from "react-select";
import image from "../../assets/nre-logo.png";
import { useNavigate } from "react-router-dom";
import { test1 } from "../Link/LinkPage";
import DepartArrive from "../DepartArrive/DepartArrive";

let liveArrival = "";

let busDeparture = "";
let listStation = "";

let currentCRSCode;

let serviceMessage = "";
let displayServiceMessage = "";
let current = "";
let earlier = "?timeOffset=-120&timeWindow=120";
let earlier2 = "?timeOffset=-82&timeWindow=120";
let later = "?timeOffset=82&timeWindow=120";
let later2 = "?timeOffset=119&timeWindow=120";

var htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

let arrivalsList = "test";
let stationsList = "";

let textInfo = "There are no messages";
let newsLinkEx = new RegExp(
  "(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))",
  "g"
);
let newsLink = [];

let myArray = [];
let sIdArray = [];
let failedAlert;

let stationFullName;

export default function DataFeed() {
  return DepartArrive("Arrivals");
}
