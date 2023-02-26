import React, { useState } from 'react';
import "../App/App.css"
import 'realtime-trains-scraper';
import Geocode from "react-geocode";
import { findCoord } from './Location 2';

export let stCoord = "";


Geocode.setApiKey("AIzaSyCtaTMVWfuUgPQSa2qsFmJyC8F__eKcqKA");
Geocode.setLanguage("en");
Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

export function testf2 (station) {
  console.log("test station is ", station);  
  console.log("station is ", station);
  let t = findCoord (station);
  return new Promise(resolve => {
      setTimeout(function() {
      resolve(t);
      }, 1);
  });
};

export var second_async_function = async function(station) {
  console.log('async function called');

  const first_promise = await testf2(station);
  console.log("The coordinates for ", station, " is as follows: ");
  console.log("fp",first_promise);

  if (first_promise[0] != undefined) {
    stCoord += first_promise + ", "
  }

  
  console.log("stCoord",stCoord);



  if (first_promise == ""){
    alert('Results not found, please try another station.');
  } 
}

export function testf (station) {
  console.log("test station is ", station);
};

//async_function();