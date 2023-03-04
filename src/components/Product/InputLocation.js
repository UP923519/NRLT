import React, { Component,useEffect, useRef, useState } from "react";
import { async_function, trD, trO, trC, trcDropDown} from "./Location 2";
import { getShowDistance } from "./Location 2";
//import CallingPoints from "./callingPoints";
import Select from 'react-select';
import { stCoord } from "./LocationCalcDIstance";
import { GetMiles } from "./GetMiles";
import LoadingIcons from 'react-loading-icons'



export let originStation;
const currDateTime =  new Date().toLocaleDateString('en-ca')+'T'+new Date().toLocaleTimeString();

export class InputLocation extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {value: '', trD: trD, date: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleChangeDate = this.handleChangeDate.bind(this);

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

  handleChangeDate(event) {
    this.setState({trD, date: event.target.value});

  }

  handleSubmit(event) {
    event.preventDefault();
    originStation = this.state.value;
    let date = this.state.date;
    let date1Year = date.slice(0,4);
    let date1Month = date.slice(5,7);
    let date1Day = date.slice(8,10);
    let date1Time = date.slice(11,date.length);
    date = date1Day + "/" + date1Month + "/" + date1Year + " " + date1Time + ":00";
    //alert(date);

    const targetDiv = document.getElementById("showHide");
    if (targetDiv.style.display == "flex") {
      targetDiv.style.display = "none";
    } else {
      targetDiv.style.display = "flex";
    }

    async_function(date);

    //autoFocus="autofocus"
  }

  render() {
    return (
        <div className = "divRailInput">
            <div className = "divRailInputInner">
            <h3 style={{textAlign: "center"}}>National Rail Input</h3>
          <form onSubmit={this.handleSubmit}>
            <label>
            &nbsp;Date of travel{" "}<br/>
            &nbsp;<input style = {{backgroundColor: "#ebebeb", border: "0", borderRadius: "2px"}} type="datetime-local" value={this.state.date} max={currDateTime} onChange={this.handleChangeDate} />
            <br/><br/>
            &nbsp;Origin station{" "}<br/>
            &nbsp;<input style = {{backgroundColor: "#ebebeb", border: "0", borderRadius: "2px"}} type="text" value={this.state.value} onInput={this.handleChange} onFocus={this.handleChange}/>
            </label><br/>
            <br/>
            <input style = {{border: "0", marginLeft: "4px"}} id = "journeySubmitButton" type="submit" value="☑ Submit" />
            <p style={{fontWeight: "bold"}}>
            {/*Original Starting Stations:</p><br /> {trO} <br /><br />
            <p style={{fontWeight: "bold"}}>*/}
            &nbsp;Destinations on this route:</p> <p style={{maxWidth: "400px", paddingLeft: "4px"}}>{/*trD*/}{this.state.trD}</p>
            <p style={{fontWeight: "bold"}}>
            &nbsp;Select your journey:</p>{/*{trC}*/} 
            {trcDropDown}
            <br/>
          </form>
          
        </div>

      </div>
      



    );
  }
}