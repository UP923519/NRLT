import React, { useState } from 'react';
import "../App/App.css"
import TableData from '../table/form';
import 'realtime-trains-scraper';
import { originStation } from './InputLocation';
import { fitBounds } from 'google-map-react';
import Select from 'react-select';
import Geocode from "react-geocode";
import { stCoord, second_async_function, testf, testf2 } from './LocationCalcDIstance';
import {getDatabase, ref, set, get, update, remove, child, onValue } from "firebase/database";
import StartFirebase from "../Preferences/firebase";
import { GetMiles } from './GetMiles';


Geocode.setApiKey("AIzaSyCtaTMVWfuUgPQSa2qsFmJyC8F__eKcqKA");
Geocode.setLanguage("en");
Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

let distanceConversion;


export let trO;
export let trD;
export let trC;
export let trcDropDown;
export let trSCoord;
export let distanceMiles;

let destStation;

const db = StartFirebase();



const realtimeTrains = require('realtime-trains-scraper');


export var first_function = function() {
  console.log("Entered first function");
  let t = realtimeTrains.getTrains(originStation,15);
  return new Promise(resolve => {
      setTimeout(function() {
      resolve(t);
      console.log("Returned first promise");
      }, 1);
  });
  };

export var async_function = async function() {
  console.log('async function called');

  const first_promise= await first_function();
  console.log("After awaiting for 2 seconds," +
  "the promise returned from first function is:");
  //console.log(JSON.stringify(first_promise));
  console.log(first_promise.length);
  //console.log(" ----- ");
  //console.log(first_promise[0].callingPoints)
  //console.log(first_promise[0].callingPoints.length)

  if (first_promise == ""){
    alert('Results not found, please try another station.');
  }

  trO = "";
  trD = "";
  trC= "";

  
  for (let i = 0; i < 15; i++){
    if (first_promise[i] != "" && first_promise[i] != undefined){
      if (trD.includes(first_promise[i].origin["name"] + ",   ") != true){
        trD += first_promise[i].origin["name"] + ",   "
      } 
      if (trD.includes(first_promise[i].destination["name"] + ",   ") != true){
        trD += first_promise[i].destination["name"] + ",   "
      }
    }
  }


  for (let i = 0; i < first_promise.length; i++){
    for (let j = 0; j < first_promise[i].callingPoints.length; j++){
      if (first_promise[i].callingPoints[j]["name"] != undefined){
        if (trC.includes(first_promise[i].callingPoints[j].name + ",   ") != true){
            trC += first_promise[i].callingPoints[j].name + ",   "
        }
        if (trC.includes(first_promise[i].origin["name"] + ",   ") != true){
          trC += first_promise[i].origin["name"] + ",   "
        } 
      }    
    }
  }


/*

  for (let i = 0; i < 60; i++){
    if (first_promise[i] != " " && first_promise[i] != undefined){
      if (trO.includes(first_promise[i].origin["name"] + ",   ") != true){
        trO += first_promise[i].origin["name"] + ",   "
      } 
      if (trD.includes(first_promise[i].destination["name"] + ",   ") != true){
        trD += first_promise[i].destination["name"] + ",   "
      }
    }
  }
*/
  

  //trO = first_promise[0].origin["name"] +", "+ first_promise[1].origin["name"] +", "+ first_promise[2].origin["name"]+", "+ first_promise[3].origin["name"]+", "+ first_promise[4].origin["name"]+", "+ first_promise[5].origin["name"];
  //trD = first_promise[0].destination["name"]+", "+ first_promise[1].destination["name"] +", "+ first_promise[2].destination["name"]+", "+ first_promise[3].destination["name"]+", "+ first_promise[4].destination["name"]+", "+ first_promise[5].destination["name"];

  //console.log(trO);

  trO = trO.split('  ');
  trD = trD.split('  ');
  trC = trC.split('  ');
  trC = trC.sort();
  //alert(trO[1]);
  console.log("TRC is ", trC);

  //alert('Results Loaded');
  const aquaticCreatures = trC.map(opt => ({ label: opt, value: opt }));
  trcDropDown = <Select 
  options={aquaticCreatures}
  onChange={opt => console.log("Selected",opt.value)+getLatBetween(originStation + " station", opt.value + " station", "train")}
  />;
  
}

//async_function();

export function getLatBetween(pointA, pointB, mode){
  //testf2 (station);
  //second_function (station);
  destStation = pointB;
  second_async_function(pointA);
  second_async_function(pointB);

  DistanceBetweenPoints(mode, pointA);

  //second_function = findCoord (originStation);

  
}

export function findCoord (station){
  let stationLat = Geocode.fromAddress(station).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      //console.log(lat, lng);
      let stationLat = [lat,lng];
      return stationLat;
    },
    (error) => {
      console.error(error);
    }
  );
  return stationLat;
  
}



export function DistanceBetweenPoints (mode, pointA){

  setTimeout(
    function() {
      trSCoord = [stCoord];
      console.log(trSCoord[0]);
      let trSCoordArray = trSCoord[0].split(",");
      console.log(trSCoordArray);

      let coord1 = trSCoordArray[trSCoordArray.length-5];
      console.log(coord1);
      let coord2 = trSCoordArray[trSCoordArray.length-4];
      console.log(coord2);
      let coord3 = trSCoordArray[trSCoordArray.length-3];
      console.log(coord3);
      let coord4 = trSCoordArray[trSCoordArray.length-2];
      console.log(coord4);

      var getDistanceBetweenPoints = require('get-distance-between-points');
      var distanceInMeters = getDistanceBetweenPoints.getDistanceBetweenPoints(
        coord1, coord2, // Lat, Long of point A
        coord3, coord4// Lat, Long of point B
      );
      // Outputs: Distance in Meters:  1813.5586276614192
      console.log("Distance in Miles: ", distanceInMeters / 1609 );
      distanceMiles = distanceInMeters / 1609;


    
      const db = getDatabase();
      const currDate = new Date().toLocaleDateString();
      const currTime = new Date().toLocaleTimeString();
      var timee = (currDate+currTime).replaceAll('/','');
      const user2 = localStorage.getItem('username');

      
      if (mode == "train"){
        distanceConversion = (0.0715*distanceMiles).toFixed(2);
        set(ref(db, user2+"/"+timee+"/"),
        {
            Transaction: ("🚂"+originStation+" ->"+destStation),
            Amount: (distanceConversion),
            date: currDate+ " "+ currTime
        });
      }

      if (mode == "car"){
        distanceConversion = (0.359*distanceMiles).toFixed(2);
        set(ref(db, user2+"/"+timee+"/"),
        {
            Transaction: ("🚗"+pointA+" -> "+destStation),
            Amount: (distanceConversion),
            date: currDate+ " "+ currTime
        });
      }


      alert("Trip added successfully");
    }
    .bind(this),
    1000
  );

}

export function getShowDistance(){
  setTimeout(
    function(){
      console.log("no")
    }
    .bind(this),
    1000
  );
}