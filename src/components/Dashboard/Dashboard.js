import React, { useState ,  useEffect } from 'react';
import "../App/App.css"
import { Table } from "react-bootstrap";
import Select from 'react-select';
import image from '../../assets/nre-logo.png';
import Dashboard1 from '../Link/LinkPage';
import { useNavigate } from "react-router-dom";
import { test1 } from '../Link/LinkPage';


let liveDeparture = "";
let busDeparture = "";

let serviceMessage = "";
let listStation = "";

let currentCRSCode;

let displayServiceMessage = "";
let current = ""
let earlier = "?timeOffset=-120&timeWindow=120";
let earlier2 = "?timeOffset=-82&timeWindow=120";
let later = "?timeOffset=82&timeWindow=120";
let later2 = "?timeOffset=119&timeWindow=120";


var htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;


let departuresList = "test";
let stationsList = "";


let textInfo = "There are no messages";

let myArray = [];


export default function Dashboard() {
  const [stringDepartures, setDepartures] = useState([]);
  const [formVal, setFormVal] = useState('');
  const [dropVal, setDropVal] = useState('');
  const [trcDropDown, setTRC] = useState('');
  const [trcDropDownD, setTRCD] = useState('');

  const [isOpen, setIsOpen] = useState(false);


  
  useEffect(() => {

    //setDepartures(["Enter a depature station to view services"]);
    //textInfo = "";
    setDepartures(myArray);
    getStation();

    
  }, []);

  function clearAll(e) {
    setDepartures([]);
      textInfo = "There are no messages";
  }

  const displayAction = false;



  function handleDepartureClick(timeOffset, code, status) {
    //timeOffset = "";
    //e.preventDefault();

    setDepartures(["Loading..."]);
    toggle();
    //const form = e.target;
    //const formData = new FormData(form);
    //const formJson = (Object.fromEntries(formData.entries())).formVal;
    //console.log("form says", formVal);
    console.log("status is", status)

    try{
      if (code != undefined){
        JSON.stringify(logJSONData(code,timeOffset,status));
        setFormVal(code);

      } else {
        JSON.stringify(logJSONData(formVal,timeOffset,0));

      }
    } catch{
      JSON.stringify(logJSONData(formVal,timeOffset,0));
    }


    setTimeout(() => {
      //departuresList = stringDepartures2;
    
      //console.log("Returned first promise");
      //console.log("returned promise is", departuresList)
  
      myArray = departuresList.split("\"");
  
      myArray = myArray.filter((value, index) => !((index+1)%2));
      myArray.shift();
      
      if (myArray[myArray.length-1] != ""){
      textInfo = myArray[myArray.length-1];
      } else {
        textInfo = "There are no messages at this station";
      }

      textInfo = textInfo.replace(htmlRegexG, ' ');
  
      myArray = myArray.slice(0,-2);

      console.log (myArray);

      if (myArray == ""){
        console.log ("myArray", myArray)
        alert("No results found");
      }

      setDepartures(myArray);  

        }, "1000");
  }


  async function logJSONData(stationName, timeOffset, status) {

    console.log(stationName, "is stNAME");
    console.log(currentCRSCode, "is ccrs");

    if (stationName == ""){
      stationName = currentCRSCode;
    }

    let response;

    if (status == 1){
        response = await fetch('https://huxley2.azurewebsites.net/departures/'+currentCRSCode+'/to/'+stationName+'/150'+timeOffset);
    } else if (status == 0) {
      response = await fetch('https://huxley2.azurewebsites.net/departures/'+stationName+'/150'+timeOffset);
    }

    const data = await response.json();
  
    liveDeparture = data.trainServices;
    busDeparture = data.busServices;

    currentCRSCode = data.crs;

    if (liveDeparture == null && busDeparture != null){
      liveDeparture = data.busServices;
    }

    if (liveDeparture == null && busDeparture == null){
      liveDeparture = [];
    }


    displayServiceMessage = "";
    serviceMessage = data.nrccMessages;
    let t = getTrainDepartures();
    departuresList = JSON.stringify(t);
  }

  async function getStation() {
    const response = await fetch('https://huxley2.azurewebsites.net/crs');
    const data = await response.json();
    listStation = data;
    let t = getStationList();
    //console.log("t is", t);
    stationsList = JSON.stringify(t);
  }

  
  function getStationList(){
    //console.log(listStation);
    let listOfStations = []
    for (let i=0;i<listStation.length;i++){
      listOfStations.push(listStation[i].stationName + " ("+ listStation[i].crsCode + ")");
    }

    const display = listOfStations.map(opt => ({ label: opt, value: opt }));

    
    setTRC(<Select 
    options={display}
    onChange={opt => setDropVal(opt.value.slice(opt.value.length-4,-1)+console.log(opt.value.slice(opt.value.length-4,-1))+handleDepartureClick(current,opt.value.slice(opt.value.length-4,-1),0))}
    />);

    setTRCD(<Select 
      options={display}
      onChange={opt => setDropVal(opt.value.slice(opt.value.length-4,-1)+console.log(opt.value.slice(opt.value.length-4,-1))+handleDepartureClick(current,opt.value.slice(opt.value.length-4,-1),1))}
      />);

    //console.log(listOfStations);
  } 

  let navigate = useNavigate(); 
  const routeChange = (number) =>{ 

    let trainInfo = number;

    //number = number.slice(number.length-1,number.length);
    number = number.split(" ");
    number = number.pop();


    //Dashboard1();
    let path = "/linkPage"; 
    navigate(path);
    test1(number, trainInfo);

  }

  function toggle() {
    setIsOpen(true);
  }


  return (

    <div className='Wrapper2'>
      <br/>

      <div className = "manualInput">
      <h3 style={{textAlign:"center"}}>Departures</h3>

        <form method="post" onSubmit={e => {e.preventDefault() ; handleDepartureClick(current)}}>
          <p>Departure station: </p>
          {trcDropDown}
          <p>Arrival station (optional): </p>
          {trcDropDownD}
          <br/>
          <p>Or type station name manually: <br/></p>
          <label>
            Departure station&nbsp; <input style = {{backgroundColor: "#cfcfcf", border: "0", borderRadius: "2px"}}
            name="formVal" defaultValue=""
            onChange={(event) => setFormVal(event.target.value)}/>
          </label>
          <br/><br/>
          <button id = "useTrains"type="reset" onClick={clearAll}>Reset</button>
          <button id = "useTrains" type="button" onClick={() => handleDepartureClick(current)}>View/Refresh live departures</button>
        </form>

        
      </div>
      <hr />

      <div className="App">
      {isOpen && (
      <div>

        <p className = "highlights">{textInfo}</p><br/>
        <button style = {{marginBottom: "10px", backgroundColor:"#e8e2c1"}} onClick={() => handleDepartureClick(earlier)}>120 - 100 minutes ago</button><br/>
        <button style = {{marginBottom: "10px", backgroundColor:"#e8e2c1"}} onClick={() => handleDepartureClick(earlier2)}>100 minutes ago - present</button><br/>
        <br/>
        <Table className= "transactions" style = {{backgroundColor: "#f0f0f0"}}>
              <tr>
                  <th style={{fontSize:13}}>Departure Time|Destination|Origin|Scheduled|Platform|Code<br/><br/></th>
              </tr>
              {stringDepartures.map((departures, index) => (
                <tr data-index={index} style={{textAlign:"justify", textAlignLast:"right"}} onClick={() => routeChange(departures)}>
                  <td>{departures}</td>
                  <br/><br/><br/>
                </tr>
              ))}
        </Table><br/>
        <button style = {{marginTop: "10px", backgroundColor:"#e8e2c1"}}onClick={() => handleDepartureClick(later)}>100 minutes later</button><br/>
        <button style = {{marginTop: "10px", backgroundColor:"#e8e2c1"}}onClick={() => handleDepartureClick(later2)}>100 - 120 minutes later</button>

        <br/><br/>

      </div>
      )}
      </div>

      <p>
        <img src={image} alt="powered by National Rail Enquiries" width="256" />
      </p>



      


    </div>
    
    
  );
}



function getTrainDepartures(stationName){

  //let data = logJSONData(stationName);


  let sIdArray = [];
  let stringDepartures = [];
  for (let i = 0; i < (liveDeparture.length); i++) {
    sIdArray.push(liveDeparture[i].serviceID);
    stringDepartures.push(liveDeparture[i].std +" "+ liveDeparture[i].destination[0].locationName + " (from " + liveDeparture[i].origin[0].locationName +")  "+ liveDeparture[i].etd +"  p."+ liveDeparture[i].platform +
    "  "+ liveDeparture[i].serviceID);
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
  //console.log("stringDepartures says", stringDepartures);  
  return({stringDepartures, displayServiceMessage})
} 



