import React, { Component } from "react";
import { render } from "react-dom";
import GoogleMapReact from 'google-map-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;



export class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React"
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    }
  }

  render() {
    return (
      <div>
        <h4>Current Location detected</h4>
      </div>
    );
  }
}

export function SimpleMap(){
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}

