import React, { useState ,  useEffect } from 'react';
import "../App/App.css"
import { Table } from "react-bootstrap";


let liveDeparture = "";
let serviceMessage = "";
let displayServiceMessage = "";
let liveService = "";
let liveService2 = "";
let liveServiceTime = "";
let location = "";

let textInfo = "";




export default function Dashboard() {
  const [stringDepartures, setDepartures] = useState([]);
  const [stringCalling, setCalling] = useState([]);

  useEffect(() => {

    setDepartures([""]);
    setCalling([""]);
    textInfo = "";
  }, []);

  function clearAll(e) {
    setDepartures([""]);
      setCalling([""]);
      textInfo = "";
  }

  const displayAction = false;

  function handleDepartureClick(e) {
    e.preventDefault();
    setDepartures(["Loading..."]);
    
    const form = e.target;
    const formData = new FormData(form);
    const formJson = (Object.fromEntries(formData.entries())).myInput;

    let departuresList = JSON.stringify(getTrainDepartures(formJson));

    let myArray = departuresList.split("\"");

    myArray = myArray.filter((value, index) => !((index+1)%2));
    myArray.shift();
    

    textInfo = myArray[myArray.length-1];
    console.log (textInfo);

    myArray = myArray.slice(0,-2);

    setDepartures(myArray);
    
  }


  return (
    <div className='Wrapper2'>
      <h3>Departing </h3>

      <div className = "manualInput">
      <h3 style={{textAlign:"center"}}>Departure</h3>

        <form method="post" onSubmit={handleDepartureClick}>
          <label>
            Departure station&nbsp; <input style = {{backgroundColor: "#cfcfcf", border: "0", borderRadius: "2px"}}
            name="myInput" defaultValue="" />
          </label>
          <br/><br/>
          <button type="reset" onClick={clearAll}>Reset</button>
          <button>Departures</button>
        </form>      
        <br/>
      </div>
      <hr />

      <p className = "highlights">{textInfo}</p>
      <Table className= "transactions" style = {{backgroundColor: "#e3f2ff"}}>
            <tr>
                <th>Departure Time|Destination|Origin|Scheduled|Platform|Code</th>
            </tr>
            {stringDepartures.map((departures, index) => (
              <tr data-index={index} style={{textAlign:"center"}}>
                <td>{departures}</td>
              </tr>
            ))}
      </Table>
      <br/><br/>



    </div>
    
    
  );
}



function getTrainDepartures(stationName){
  fetch('https://huxley2.azurewebsites.net/departures/'+stationName+'/150').then(function (response) {
    // The API call was successful!
    return response.json();
  }).then(function (data) {
    //This is the JSON from our response
    
    liveDeparture = data.trainServices;
    displayServiceMessage = "";
    serviceMessage = data.nrccMessages;
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  })


  let sIdArray = [];
  let stringDepartures = [];
  for (let i = 0; i < (liveDeparture.length); i++) {
    sIdArray.push(liveDeparture[i].serviceID);
    stringDepartures.push(liveDeparture[i].std +" "+ liveDeparture[i].destination[0].locationName + " (from " + liveDeparture[i].origin[0].locationName +") - "+ liveDeparture[i].etd +" - p."+ liveDeparture[i].platform +
    " - "+ liveDeparture[i].serviceID);
  }

  

  try{
    for (let i = 0; i < (serviceMessage.length); i++){
      displayServiceMessage += (serviceMessage[i].value);
    };

    displayServiceMessage=displayServiceMessage.replaceAll("\""," ");
    }
  catch{

  }
  
  return({stringDepartures, displayServiceMessage})

} 



