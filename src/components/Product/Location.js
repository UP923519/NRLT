import React, { Component } from "react";
import GoogleMap from "google-map-react";
import {Marker} from "google-map-react";

import "../App/App.css"

var lng = -0.118092;
var lat = 51.509865;
var lngM;
var latM;

const PositionMarker = ({ text }) => <div>{text}</div>;
const GOOGLE_API_KEY = "AIzaSyCtaTMVWfuUgPQSa2qsFmJyC8F__eKcqKA";


export class MapUpdate extends React.Component {
  constructor(props) {
    super(props);

    navigator.geolocation.getCurrentPosition(function(position) {
    //console.log("Latitude is :", position.coords.latitude);
    //console.log("Longitude is :", position.coords.longitude);

    lng = position.coords.longitude;
    lat = position.coords.latitude;
    lngM = position.coords.longitude;
    latM = position.coords.latitude;
    })

    this.state = {
      center: {
        lat: lat,
        lng: lng
      },
      form: {
        lat: lat,
        lng: lng
      },
      zoom: 1
    };
    

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    
  
  }

  handleChange() {
    this.setState({
      form: {
        lat: Number(lat),
        lng: Number(lng)
      },
    });
  }

  handleClick() {
    this.setState({
      center: this.state.form
    });
  }

  getCurrentLocation() {
    this.setState({
      center: this.state.form,
      form: {
        lat: Number(lat),
        lng: Number(lng)
      },
      zoom: 15
    });
    resetVals();
    
  }
  

  render() {
    var center = this.state.center;
    var zoom = this.state.zoom;
    return (
      <div style = {{ width: "100%", height: "100%" }}>
        <div>
        <input className = "topRow2" readOnly={true} onMouseDown={this.getCurrentLocation} onClick={this.getCurrentLocation} type="button" value="𖡡 Show Location" id="locationAddress"/>
        </div>
        <div style={{ width: "100%", height: "100%" }}>
          <GoogleMap center={center} zoom={zoom} bootstrapURLKeys={{ key: [GOOGLE_API_KEY] }}>
          <PositionMarker 
          lat={latM}
          lng={lngM}
          text="𖡡 Current Location"
          />
          </GoogleMap>
        </div>
        
      </div>
    );
  }
}



  <div style={{ width: "100%", height: "500px" }}>
    <MapUpdate />
  </div>
  

function resetVals() {
  lat = 0;
  lng = 0;

  navigator.geolocation.getCurrentPosition(function(position) {
    //console.log("Latitude is :", position.coords.latitude);
    //console.log("Longitude is :", position.coords.longitude);

    lng = position.coords.longitude;
    lat = position.coords.latitude;
    })
  }