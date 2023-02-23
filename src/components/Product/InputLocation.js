import React, { Component,useEffect, useRef, useState } from "react";
import { first_function, async_function, trD, trO, trC, trcDropDown, distanceMiles, stationB, DistanceBetweenPoints } from "./Location 2";
import { getShowDistance } from "./Location 2";
//import CallingPoints from "./callingPoints";
import Select from 'react-select';
import { stCoord } from "./LocationCalcDIstance";


export let originStation;

export class InputLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  handleChange(event) {
    this.setState({value: event.target.value});
    setTimeout(
      function() {
        this.setState({value: event.target.value});
        
      }
      .bind(this),
      6000
  );
    setTimeout(
      function() {
        this.setState({value: event.target.value});
        
      }
      .bind(this),
      10000
  );
  }

  handleSubmit(event) {
    originStation = this.state.value;
    //alert('origin: ' + originStation);
    first_function(originStation);
    async_function();
    event.preventDefault();

    //autoFocus="autofocus"

  }
  

  

  render() {
    return (
        <div>
          <h3>National Rail Carbon Input</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Where do you want to travel from?{" "}  
            <input type="text" value={this.state.value} onInput={this.handleChange} onFocus={this.handleChange}/>
          </label><br/>
          <input className = "topRow2" type="submit" value="☑ Submit" />
          <p style={{fontWeight: "bold"}}>
          {/*Original Starting Stations:</p><br /> {trO} <br /><br />
          <p style={{fontWeight: "bold"}}>*/}
          Destinations to/from here:</p><br /> {trD} <br /><br />
          <p style={{fontWeight: "bold"}}>
          All stations from here:</p><br /> {/*{trC}*/} 
        </form>
        {trcDropDown}
        <br /><br />

      </div>
      



    );
  }
}