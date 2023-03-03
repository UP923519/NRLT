import React, { Component,useEffect, useRef, useState } from "react";
import { first_function, async_function, trD, trO, trC, trcDropDown, distanceMiles, stationB, DistanceBetweenPoints } from "./Location 2";
import { getShowDistance } from "./Location 2";
//import CallingPoints from "./callingPoints";
import Select from 'react-select';
import { stCoord } from "./LocationCalcDIstance";
import { GetMiles } from "./GetMiles";


export let originStation;

export class InputLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', trD: trD};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  handleChange(event) {
    this.setState({value: event.target.value});
    setTimeout(
      function() {
        this.setState({value: event.target.value, trD: trD});
      }
      .bind(this),
      6000
  );
    setTimeout(
      function() {
        this.setState({value: event.target.value, trD: trD});
      }
      .bind(this),
      10000
  );
  setTimeout(
    function() {
      this.setState({value: event.target.value, trD: trD});
    }
    .bind(this),
    20000
  );
  }

  handleSubmit(event) {
    originStation = this.state.value;

    async_function();
    event.preventDefault();

    //autoFocus="autofocus"

  }
  
  render() {
    return (
        <div className = "divLeft">
          <h3>National Rail Input</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Where do you want to travel from?{" "}  
            <input style = {{backgroundColor: "#ebebeb", border: "0", borderRadius: "2px"}} type="text" value={this.state.value} onInput={this.handleChange} onFocus={this.handleChange}/>
          </label><br/>
          <input style = {{border: "0"}} id = "journeySubmitButton" type="submit" value="☑ Submit" />
          <p style={{fontWeight: "bold"}}>
          {/*Original Starting Stations:</p><br /> {trO} <br /><br />
          <p style={{fontWeight: "bold"}}>*/}
          Destinations to/from here:</p> <p style={{maxWidth: "400px"}}>{/*trD*/}{this.state.trD}</p>
          <p style={{fontWeight: "bold"}}>
          All stations from here:</p>{/*{trC}*/} 
        </form>
        {trcDropDown}

      </div>
      



    );
  }
}