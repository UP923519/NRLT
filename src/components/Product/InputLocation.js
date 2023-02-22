import React, { Component } from "react";
import { first_function, async_function, trD, trO, trC } from "./Location 2";
import CallingPoints from "./callingPoints";

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
    //CallingPoints();
    event.preventDefault();

    //autoFocus="autofocus"

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Where do you want to travel from?{" "}  
          <input type="text" value={this.state.value} onInput={this.handleChange} onFocus={this.handleChange}/>
        </label><br/>
        <input className = "topRow2" type="submit" value="☑ Submit" />
        <p style={{fontWeight: "bold"}}>
        {/*Original Starting Stations:</p><br /> {trO} <br /><br />
        <p style={{fontWeight: "bold"}}>*/}
        Final destinations from here:</p><br /> {trD} <br /><br />
        <p style={{fontWeight: "bold"}}>
        All stations from here:</p><br /> {trC} <br /><br />

        {}

        
        
        
        
      </form>
    );
  }
}









