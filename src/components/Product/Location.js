import React, { Component } from "react";
import { render } from "react-dom";
import GoogleMap from "google-map-react";


class GMapReact extends React.Component {
  render() {
    const { center, zoom } = this.props;
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <GoogleMap
          center={center}
          zoom={zoom}
        />
      </div>
    );
  }
}

export class MapUpdate extends React.Component {
  constructor(props) {
    super(props);
  

    navigator.geolocation.watchPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      sessionStorage.setItem("Lat", parseFloat(position.coords.latitude));
      sessionStorage.setItem("Lng", parseFloat(position.coords.longitude));
      })

    this.state = {
      center: {
        lat: 0,
        lng: 0
      },
      form: {
        lat: sessionStorage.getItem("Lat"),
        lng: sessionStorage.getItem("Lng")
      }
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);

  
  }

  handleChange() {
    this.setState({
      form: {
        lat: Number(sessionStorage.getItem("Lat")),
        lng: Number(sessionStorage.getItem("Lng"))
      }
    });
  }

  handleClick() {
    this.setState({
      center: this.state.form
    });
  }

  getCurrentLocation() {
    //console.log(this.state.form.lat);
    console.log(this.state.center);
    this.setState({
      center: this.state.form,
      form: {
        lat: Number(sessionStorage.getItem("Lat")),
        lng: Number(sessionStorage.getItem("Lng"))
      }
    });
  }
  

  render() {
    const center = this.state.center;

    return (
      <div style={{ width: "100%", height: "100%" }}>

        <div>
          <input
            ref="lat"
            type="text"
            //value={sessionStorage.getItem("Lat")}
            onChange={this.handleChange}
          />
          <input
            ref="lng"
            type="text"
            //value={sessionStorage.getItem("Lng")}
            onChange={this.handleClick}
          />
          <input onMouseDown={this.getCurrentLocation} onClick={this.getCurrentLocation} type="button" value="Current Location" />
        </div>
        <div style={{ width: "100%", height: "100%" }}>
          <GMapReact center={center} zoom={15} />
        </div>
      </div>
    );
  }
}


render(
  <div style={{ width: "100%", height: "500px" }}>
    <MapUpdate />
  </div>,
  document.getElementById("root")
);
