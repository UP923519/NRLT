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

let departuresList = "test";

let textInfo = "";

let myArray;

let first_promise;

let stringDepartures2;


export default function Dashboard() {
  const [stringDepartures, setDepartures] = useState([]);
  const [formVal, setFormVal] = useState('');

  
  useEffect(() => {

    setDepartures(["Enter a depature station to view services"]);
    textInfo = "";
  }, []);

  function clearAll(e) {
    setDepartures([]);
      textInfo = "";
  }

  const displayAction = false;



  function handleDepartureClick(e) {
    e.preventDefault();

    setDepartures(["Loading..."]);
    
    //const form = e.target;
    //const formData = new FormData(form);
    //const formJson = (Object.fromEntries(formData.entries())).formVal;
    console.log("form says", formVal);

    JSON.stringify(logJSONData(formVal));

    setTimeout(() => {
      //departuresList = stringDepartures2;
    
      console.log("Returned first promise");
      console.log("returned promise is", departuresList)
  
      myArray = departuresList.split("\"");
  
      myArray = myArray.filter((value, index) => !((index+1)%2));
      myArray.shift();
      
  
      textInfo = myArray[myArray.length-1];
      //console.log (myArray);
  
      myArray = myArray.slice(0,-2);
  
      setDepartures(myArray);  
        }, "1000");
  }


  async function logJSONData(stationName) {
    const response = await fetch('https://huxley2.azurewebsites.net/departures/'+stationName+'/150');
    const data = await response.json();
    liveDeparture = data.trainServices;
    displayServiceMessage = "";
    serviceMessage = data.nrccMessages;
    let t = getTrainDepartures();
    console.log("t is", t);
    departuresList = JSON.stringify(t);
  }


  return (
    <div className='Wrapper2'>
      <h3>Departing </h3>

      <div className = "manualInput">
      <h3 style={{textAlign:"center"}}>Departure</h3>

        <form method="post" onSubmit={handleDepartureClick}>
          <label>
            Departure station&nbsp; <input style = {{backgroundColor: "#cfcfcf", border: "0", borderRadius: "2px"}}
            name="formVal" defaultValue=""
            onChange={(event) => setFormVal(event.target.value)}/>
          </label>
          <br/><br/>
          <button id = "useTrains"type="reset" onClick={clearAll}>Reset</button>
          <button id = "useTrains">View/Update live departures</button>
        </form>      
        <br/>
      </div>
      <hr />

      <p className = "highlights">{textInfo}</p>
      <Table className= "transactions" style = {{backgroundColor: "#f0f0f0"}}>
      

            <tr>
                <th style={{fontSize:13}}>Departure Time|Destination|Origin|Scheduled|Platform|Code<br/><br/></th>
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

  //let data = logJSONData(stationName);


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

  console.log("Data sent back says", stringDepartures, displayServiceMessage);  
  return({stringDepartures, displayServiceMessage})

} 

/*async function logJSONData(stationName) {
  fetch('https://huxley2.azurewebsites.net/departures/'+stationName+'/150').then(function (response) {
    // The API call was successful!
    return response.json();
  }).then(function (data) {
    //This is the JSON from our response
    liveDeparture = data.trainServices;
    displayServiceMessage = "";
    serviceMessage = data.nrccMessages;
    let t = getTrainDepartures();
    console.log("t is", t);
    return t;
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  })
  console.log("t being returned is", t);
}*/




