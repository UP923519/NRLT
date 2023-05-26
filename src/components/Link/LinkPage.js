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

  function handleServiceClick(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = (Object.fromEntries(formData.entries())).myInput;

    let locationList = JSON.stringify(getTrainArrivals(formJson));
    let myArray = locationList.split("*");
    myArray.shift();

    let removeValue = (myArray.indexOf('","locationList2":"undefined'));
    myArray.splice(removeValue, 1)
    myArray[myArray.length-1] = myArray[myArray.length-1].replace('"}',"");

    setCalling(myArray);
  }


  return (
    <div className='Wrapper2'>
      <h3>Service </h3>

      <div className = "manualInput">
      <h3 style={{textAlign:"center"}}>Service details</h3>
        <form method="post" onSubmit={handleServiceClick}>
          <label>
            Service code&nbsp; <input style = {{backgroundColor: "#cfcfcf", border: "0", borderRadius: "2px"}}
            name="myInput" defaultValue="" />
          </label>
          <br/><br/>
          <button type="reset" onClick={clearAll}>Reset</button>
          <button>Select service</button>
        </form>
        <br/>
      </div>
      <hr />

      <br/><br/>
      <Table className= "transactions" style = {{backgroundColor: "#e3f2ff"}}>
            <tr>
                <th>Staton|Scheduled|Actual|Estimated</th>
            </tr>
            {stringCalling.map((calling, index) => (
              <tr data-index={index}>
                <td>{calling}</td>
              </tr>
            ))}
      </Table>
      <br/><br/>

    </div>
    
    
  );
}


function getTrainArrivals(serviceID){
  //serviceID = serviceID[0];

  fetch('https://huxley2.azurewebsites.net/service/'+serviceID).then(function (response) {
    // The API call was successful!
    return response.json();
  }).then(function (data) {

    liveService = data.previousCallingPoints[0].callingPoint;
    liveService2 = (data.subsequentCallingPoints[0].callingPoint);
    liveServiceTime = data;
    location = (data.locationName);
    console.log(data);

  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  })

  let locationList;
  for (let i = 0; i < (liveService.length); i++) {
    //console.log(liveService[i].locationName);
    locationList+= "*"+liveService[i].locationName + " " + liveService[i].st + " " + liveService[i].at + " " + liveService[i].et ;
  }

  locationList+= "*"+location+" "+liveServiceTime.std+" "+liveServiceTime.atd+" "+liveServiceTime.etd+ " (plat." + liveServiceTime.platform+ ")*";

  let locationList2;
  for (let i = 0; i < (liveService2.length); i++) {
    locationList2+= "*"+liveService2[i].locationName + " " + liveService2[i].st + " " + liveService2[i].at + " " + liveService2[i].et ;
  }
  
  

  return({locationList, locationList2})
} 





