import React, { Component } from "react";
import Geocode from "react-geocode";


export let address;
Geocode.setApiKey("AIzaSyCtaTMVWfuUgPQSa2qsFmJyC8F__eKcqKA");
// set response language. Defaults to english.
Geocode.setLanguage("en");
// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");
// Enable or disable logs. Its optional.
Geocode.enableDebug();

let lng;
let lat;


export class LocationCalc extends React.Component {
  constructor(props) {
    super(props);

    navigator.geolocation.getCurrentPosition(function(position) {
    //console.log("Latitude is :", position.coords.latitude);
    //console.log("Longitude is :", position.coords.longitude);

    lng = position.coords.longitude;
    lat = position.coords.latitude;
    })

    this.state = {
      address: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.convertLocation2 = this.convertLocation2.bind(this);


  }

  handleChange() {
    this.setState({
        address: "address"
    });
  }

  convertLocation2() {

    navigator.geolocation.getCurrentPosition(function(position) {
      //console.log("Latitude is :", position.coords.latitude);
      //console.log("Longitude is :", position.coords.longitude);
      Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
        (response) => {
          address = response.results[0].formatted_address;
          let city, state, country;
          for (let i = 0; i < response.results[0].address_components.length; i++) {
            for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
              switch (response.results[0].address_components[i].types[j]) {
                case "locality":
                  city = response.results[0].address_components[i].long_name;
                  break;
                case "administrative_area_level_1":
                  state = response.results[0].address_components[i].long_name;
                  break;
                case "country":
                  country = response.results[0].address_components[i].long_name;
                  break;
              }
            }
          }
          console.log(city, state, country);
          console.log("address is" + address);
          //document.getElementById("demo").innerHTML = address;
        },
        (error) => {
          console.error(error);
        }
      );
    })
    this.setState({
      address: address
    });
    
  }

  render(){
    var Location = this.state.address;
    console.log("thisstateaddress is", this.state.address)

    return(
      <div>
        <input className = "topRow2" readOnly={true} onMouseDown={this.convertLocation2} onClick={this.convertLocation2} type="button" value="✉ Show Address" />
        <h3 id = "textLocation">{Location}</h3>
      </div>
    )
  }

}

