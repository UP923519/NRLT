import React, { useState ,  useEffect } from 'react';
import "../App/App.css"
import { Table } from "react-bootstrap";


let liveArrival = "";
let serviceMessage = "";
let displayServiceMessage = "";
let current = ""
let earlier = "?timeOffset=-120&timeWindow=30";
let earlier2 = "?timeOffset=-98&timeWindow=120";
let later = "?timeOffset=98&timeWindow=30";
let later2 = "?timeOffset=119&timeWindow=120";


var htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;


let arrivalsList = "test";

let textInfo = "There are no messages";

let myArray = ["Enter an arrival station to view services"];



export default function DataFeed() {
  const [stringArrivals, setArrivals] = useState([]);
  const [formVal, setFormVal] = useState('');

  
  useEffect(() => {

    //setArrivals(["Enter a depature station to view services"]);
    setArrivals(myArray);
    //textInfo = myArray[myArray.length-1];

    //textInfo = "";
  }, []);

  function clearAll(e) {
    setArrivals([]);
    textInfo = "There are no messages";
  }

  const displayAction = false;



  function handleArrivalClick(timeOffset) {

    setArrivals(["Loading..."]);
    
    //const form = e.target;
    //const formData = new FormData(form);
    //const formJson = (Object.fromEntries(formData.entries())).formVal;
    console.log("form says", formVal);

    JSON.stringify(logJSONData(formVal,timeOffset));

    setTimeout(() => {
      //arrivalsList = stringArrivals2;
    
      console.log("Returned first promise");
      console.log("returned promise is", arrivalsList)
  
      myArray = arrivalsList.split("\"");
  
      myArray = myArray.filter((value, index) => !((index+1)%2));
      myArray.shift();
      
  
      if (myArray[myArray.length-1] != ""){
      textInfo = myArray[myArray.length-1];
      } else {
        textInfo = "There are no messages at this station";
      }

      textInfo = textInfo.replace(htmlRegexG, '');

  
      myArray = myArray.slice(0,-2);
  
      setArrivals(myArray);  
        }, "1000");
  }


  async function logJSONData(stationName, timeOffset) {
    const response = await fetch('https://huxley2.azurewebsites.net/arrivals/'+stationName+'/150'+timeOffset);
    const data = await response.json();
    liveArrival = data.trainServices;
    displayServiceMessage = "";
    serviceMessage = data.nrccMessages;
    let t = getTrainArrivals();
    console.log("t is", t);
    arrivalsList = JSON.stringify(t);
  }


  return (
    <div className='Wrapper2'>
      <h3>Arriving </h3>

      <div className = "manualInput">
      <h3 style={{textAlign:"center"}}>Arrivals</h3>

      <form method="post" onSubmit={e => {e.preventDefault() ; handleArrivalClick(current)}}>
          <label>
            Arrival station&nbsp; <input style = {{backgroundColor: "#cfcfcf", border: "0", borderRadius: "2px"}}
            name="formVal" defaultValue=""
            onChange={(event) => setFormVal(event.target.value)}/>
          </label>
          <br/><br/>
          <button id = "useTrains"type="reset" onClick={clearAll}>Reset</button>
          <button id = "useTrains" type="button" onClick={() => handleArrivalClick(current)}>View/Update live arrivals</button>
        </form>      
        <br/>
      </div>
      <hr />

      <p className = "highlights">{textInfo}</p>
      <button style = {{marginBottom: "10px", backgroundColor:"#e8e2c1"}} onClick={() => handleArrivalClick(earlier)}>120 - 100 minutes ago</button><br/>
      <button style = {{marginBottom: "10px", backgroundColor:"#e8e2c1"}} onClick={() => handleArrivalClick(earlier2)}>100 minutes ago - present</button>
      <Table className= "transactions" style = {{backgroundColor: "#f0f0f0"}}>
      

            <tr>
                <th style={{fontSize:13}}>Arrival Time|Destination|Origin|Scheduled|Platform|Code<br/><br/></th>
            </tr>
            {stringArrivals.map((arrivals, index) => (
              <tr data-index={index} style={{textAlign:"center"}}>
                <td>{arrivals}</td>
                <br/><br/><br/>
              </tr>
            ))}
      </Table>
      <button style = {{marginTop: "10px", backgroundColor:"#e8e2c1"}}onClick={() => handleArrivalClick(later)}>100 minutes later</button><br/>
      <button style = {{marginTop: "10px", backgroundColor:"#e8e2c1"}}onClick={() => handleArrivalClick(later2)}>100 - 120 minutes later</button>
      <br/><br/>



    </div>
    
    
  );
}



function getTrainArrivals(stationName){

  //let data = logJSONData(stationName);


  let sIdArray = [];
  let stringArrivals = [];
  for (let i = 0; i < (liveArrival.length); i++) {
    sIdArray.push(liveArrival[i].serviceID);
    stringArrivals.push(liveArrival[i].sta +" "+ liveArrival[i].destination[0].locationName + " (from " + liveArrival[i].origin[0].locationName +") - "+ liveArrival[i].eta +" - p."+ liveArrival[i].platform +
    " - "+ liveArrival[i].serviceID);
  }

  try{
    for (let i = 0; i < (serviceMessage.length); i++){
      displayServiceMessage += (serviceMessage[i].value);
    };

    displayServiceMessage=displayServiceMessage.replaceAll("\""," ");
    displayServiceMessage=displayServiceMessage.replaceAll("\n"," ");
    }
  catch{

  }

  console.log("Data sent back says", stringArrivals, displayServiceMessage);  
  return({stringArrivals, displayServiceMessage})

} 

/*async function logJSONData(stationName) {
  fetch('https://huxley2.azurewebsites.net/arrivals/'+stationName+'/150').then(function (response) {
    // The API call was successful!
    return response.json();
  }).then(function (data) {
    //This is the JSON from our response
    liveArrival = data.trainServices;
    displayServiceMessage = "";
    serviceMessage = data.nrccMessages;
    let t = getTrainArrivals();
    console.log("t is", t);
    return t;
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  })
  console.log("t being returned is", t);
}*/




