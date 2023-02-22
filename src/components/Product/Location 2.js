import React, { useState } from 'react';
import "../App/App.css"
import TableData from '../table/form';
import 'realtime-trains-scraper';
import { originStation } from './InputLocation';
import { fitBounds } from 'google-map-react';

export let trO;
export let trD;
export let trC;


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
  console.log(first_promise);
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
    if (first_promise[i] != " " && first_promise[i] != undefined){
      if (trO.includes(first_promise[i].origin["name"] + ",   ") != true){
        trO += first_promise[i].origin["name"] + ",   "
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


}

//async_function();

