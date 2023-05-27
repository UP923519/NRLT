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

let locationList = "test";

let myArray;
let textInfo = "";




export default function Dashboard() {
  const [stringDepartures, setDepartures] = useState([]);
  const [stringCalling, setCalling] = useState([]);

  useEffect(() => {

    setDepartures([""]);
    setCalling(["Enter a service code above"]);
    textInfo = "";
    myArray = [];
    locationList = [];
  }, []);

  function clearAll(e) {
    setDepartures([""]);
      setCalling([""]);
      textInfo = "";
  }

  const displayAction = false;

  function handleServiceClick(e) {
    e.preventDefault();

    setCalling(["Loading..."]);

    const form = e.target;
    const formData = new FormData(form);
    const formJson = (Object.fromEntries(formData.entries())).myInput;

    JSON.stringify(logJSONData(formJson));
    setTimeout(() => {

    try{
      myArray = locationList.split("*");
    }catch{
      setCalling(["Error, please try another service."]);
    }
      myArray.shift();

      let removeValue = (myArray.indexOf('","locationList2":"undefined'));
      myArray.splice(removeValue, 1)
      myArray[myArray.length-1] = myArray[myArray.length-1].replace('"}',"");

      setCalling(myArray);
    }, "1000");
  }

  async function logJSONData(serviceID) {
    const response = await fetch('https://huxley2.azurewebsites.net/service/'+serviceID);
    const data = await response.json();

       
    try{
        liveService = data.previousCallingPoints[0].callingPoint;
    }catch{
      console.log("CAUGHT ERROR");
      liveService = "";
    }
    
    liveService2 = (data.subsequentCallingPoints[0].callingPoint);
    liveServiceTime = data;
    location = (data.locationName);
    //console.log(data);

    let t = getTrainArrivals();
    //console.log("t is", t);
    locationList = JSON.stringify(t);
  }



  return (
    <div className='Wrapper2'>
      <h3>Service </h3>

      <div className = "manualInput">
      <h3 style={{textAlign:"center"}}>Service Details</h3>
        <form method="post" onSubmit={handleServiceClick}>
          <label>
            Service code&nbsp; <input style = {{backgroundColor: "#cfcfcf", border: "0", borderRadius: "2px"}}
            name="myInput" defaultValue="" />
          </label>
          <br/><br/>
          <button id = "useTrains" type="reset" onClick={clearAll}>Reset</button>
          <button id = "useTrains">View/Update train service</button>
        </form>
        <br/>
      </div>
      <hr />

      <br/>
      <Table className= "transactions" style = {{backgroundColor: "#f0f0f0"}}>
            <tr>
                <th style={{fontSize:13}}>Station|Scheduled|Actual|Estimated<br/><br/></th>
            </tr>
            {stringCalling.map((calling, index) => (
              <tr data-index={index}>
                <td>{calling}</td>
                <br/><br/><br/>
              </tr>
            ))}
      </Table>
      <br/><br/>

    </div>
    
    
  );
}


function getTrainArrivals(serviceID){
  //serviceID = serviceID[0];


  let locationList;
  for (let i = 0; i < (liveService.length); i++) {
    //console.log(liveService[i].locationName);
    let trainLocation;
    let trainActual;
    if (liveService[i].et == null){
      if (liveService[i].at == "On time" || liveService[i].at == "No report"){
        trainLocation = "✔️";
      } else{
        trainLocation = "❌";
      }
    } else {
      trainLocation = liveService[i].et;
      try{
        if (liveService[i-1].et == null){
          console.log("tlc is", trainLocation);
          trainLocation = (liveService[i].et+"🚂");
          console.log("tlc is", trainLocation);
        }
      } catch{
      }
    }
    if (liveService[i].at == null){
      liveService[i].at = "N/A"
    }

    locationList+= "*"+liveService[i].locationName + " " + liveService[i].st + " " + liveService[i].at + " " + trainLocation;
  }

  //console.log(liveService[liveService.length-1].et)
  /////
  let trainLocation;
  if (liveServiceTime.etd == null){
    if (liveServiceTime.atd == "On time" || liveServiceTime.atd == "No report"){
      trainLocation = "✔️";
    } else{
      trainLocation = "❌";
    }
  } else {
    trainLocation = liveServiceTime.etd;
    try{
      if (liveService[liveService.length-1].et == null && liveService2[0].et !=null){
        trainLocation = liveServiceTime.etd + "🚂";
      }
    } catch{
    }
  }
  if (liveServiceTime.atd == null){
    liveServiceTime.atd = "N/A"
  }

  locationList+= "*"+location+" "+liveServiceTime.std+" "+liveServiceTime.atd+" "+trainLocation+ " (p." + liveServiceTime.platform+ ")*";

  let locationList2;
  for (let i = 0; i < (liveService2.length); i++) {
    let trainLocation;
    if (liveService2[i].et == null){
      if (liveService2[i].at == "On time" || liveService2[i].at == "No report"){
        trainLocation = "✔️";
      } else{
        trainLocation = "❌";
      }
    } else {
      trainLocation = liveService2[i].et;
      try{
        if (liveService2[i-1].et == null){
          trainLocation = (liveService2[i].et+"🚂");
        }
      } catch{
        if (liveServiceTime.etd != null ){
         
        } else {
          trainLocation = (liveService2[i].et+"🚂");
        }

      }
    }
    if (liveService2[i].at == null){
      liveService2[i].at = "N/A"
    }
    locationList2+= "*"+liveService2[i].locationName + " " + liveService2[i].st + " " + liveService2[i].at + " " + trainLocation ;
  }
  
  

  return({locationList, locationList2})
} 





