import React, { Component } from "react";
import { render } from "react-dom";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function SimpleMap(){

  var defaultProps = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 11
  };

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude); 
      defaultProps = {center: {lat: position.coords.latitude, lng: position.coords.longitude }, zoom: 11};
      });
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <h4>Current Location detected</h4>

      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}


