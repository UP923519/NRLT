import React, { useState } from 'react';
import "../App/App.css"
import TableData from '../table/form';
import 'realtime-trains-scraper';
import { originStation } from './InputLocation';

export let trO;
export let trD;


const realtimeTrains = require('realtime-trains-scraper');

export var first_function = function() {
  console.log("Entered first function");
  let t = realtimeTrains.getTrains(originStation);
  return new Promise(resolve => {
      setTimeout(function() {
      resolve(t);
      console.log("Returned first promise");
      }, 2000);
  });
  };

export var async_function = async function() {
  console.log('async function called');

  const first_promise= await first_function();
  console.log("After awaiting for 2 seconds," +
  "the promise returned from first function is:");
  //console.log(JSON.stringify(first_promise));
  console.log(first_promise);
  trO = first_promise[0].origin["name"];
  trD = first_promise[0].destination["name"];
  console.log(trO);
  console.log(trD);
}

async_function();

