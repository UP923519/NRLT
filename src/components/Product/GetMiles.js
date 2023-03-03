import React, { Component,useEffect, useRef, useState } from "react";
import {distanceMiles} from "./Location 2";
import { getShowDistance } from "./Location 2";
//import CallingPoints from "./callingPoints";
import Select from 'react-select';
import { stCoord } from "./LocationCalcDIstance";

export class GetMiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', distanceMiles: distanceMiles};
   
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({value: event.target.value, distanceMiles: distanceMiles});
    console.log("distance");

  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({distanceMiles: distanceMiles});
    this.setState({distanceMiles: distanceMiles});

    alert('Journey distace: ' + distanceMiles + " miles");
  }


  render() {
    return (
      <form style = {{}} onSubmit={this.handleSubmit}>
        <label>
        </label>
        <input style = {{border: "0"}} id = "journeySubmitButton" type="submit" value="⪼ Show calculated distance" />
      </form>
      
    );
  }
}  
