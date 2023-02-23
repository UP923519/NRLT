import React, { Component,useEffect, useRef, useState } from "react";
import { first_function, async_function, trD, trO, trC, trcDropDown, distanceMiles, stationB, DistanceBetweenPoints } from "./Location 2";
import { getShowDistance } from "./Location 2";
//import CallingPoints from "./callingPoints";
import Select from 'react-select';
import { stCoord } from "./LocationCalcDIstance";


export let originStation;

export class GetMiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
    this.setState({value: distanceMiles});
  }



  render() {
    return (
      <div>
          {distanceMiles}
      </div>
      
    );
  }
}