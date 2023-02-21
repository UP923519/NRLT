import React, { Component } from "react";
import { first_function, async_function, trD, trO } from "./Location 2";
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
  }

  handleSubmit(event) {
    originStation = this.state.value;
    alert('origin: ' + originStation);
    first_function(originStation);
    async_function();
    event.preventDefault();
    console.log("pooooo");

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Origin Location:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <p>
        Origin Station: {trO} <br />
        Destination Station: {trD}
        </p>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}