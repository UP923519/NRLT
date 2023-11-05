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

let remStatus = "";
let secondStation;

let testFetch;


var htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;


let departuresList = "test";
let stationsList = "";


let textInfo = "There are no messages";
let trainSearch = "";
let newsLinkEx = new RegExp(
  "(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))"
 ,"g"
);
let newsLink = [];


let myArray = [];


export default function Dashboard() {
  const [stringDepartures, setDepartures] = useState([]);
  const [formVal, setFormVal] = useState('');
  const [dropVal, setDropVal] = useState('');
  const [trcDropDown, setTRC] = useState('');
  const [trcDropDownD, setTRCD] = useState('');

  const [isOpen, setIsOpen] = useState(true);


  useEffect(() => {

    //setDepartures(["Enter a depature station to view services"]);
    //textInfo = "";
    setDepartures(myArray);
    getStation();
    
    if (myArray == ""){
      setIsOpen(false);
    }

    
  }, []);

  function clearValue () {
    setTRC(null);
    setTRCD(null);
    getStation();
    
    
  };

  function clearAll(e) {
    setDepartures([]);
      textInfo = "There are no messages";
      newsLink = [];
      remStatus = "";
      clearValue();
      setIsOpen(false);

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
 
    console.log("code is", code);

    if (remStatus == "" || remStatus == undefined){
      remStatus = status;
      if (status == undefined && remStatus == undefined){
        remStatus = 0;
      }
    }

    console.log("remstatus is", remStatus)
    console.log("status is", status)

    try{
      if (code != undefined){
        JSON.stringify(logJSONData(code,timeOffset,status));
        setFormVal(code);

      } else {
        JSON.stringify(logJSONData(formVal,timeOffset,remStatus));

      }
    } catch{
      JSON.stringify(logJSONData(formVal,timeOffset,remStatus));
    }

    //departuresList = stringDepartures2;
  
    //console.log("Returned first promise");
    //console.log("returned promise is", departuresList)

    //RUN THIS AS SEPARATE FUNCTION - CALL AFTER FETCH IS COMPLETE.//
  }
    
    function runLast(){

    //setTimeout(() => {


    myArray = departuresList.split("\"");

    myArray = myArray.filter((value, index) => !((index+1)%2));
    myArray.shift();
    
    if (myArray[myArray.length-1] != ""){
      newsLink = [myArray[myArray.length-1].match(newsLinkEx)]; 

      textInfo = myArray[myArray.length-1];
    } else {
      textInfo = "There are no messages for this station ("+ currentCRSCode + ").";
      newsLink = [];
    }

    textInfo = textInfo.replace(htmlRegexG, ' ');
    textInfo = textInfo.replaceAll('News ', 'News. ');
    textInfo = textInfo.replaceAll('in  Latest Travel News.', 'in  the link below.');



    myArray = myArray.slice(0,-2);

    console.log (myArray);

    if (myArray == ""){
      console.log ("myArray", myArray)
      alert("No results found");
    }

    setDepartures(myArray);
    testFetch = 1;

    if (remStatus == 1){
      clearValue();
    }

  //}, 1000);

  
}

  


  async function logJSONData(stationName, timeOffset, status) {

    console.log(stationName, "is stationName");
    console.log(currentCRSCode, "is fromCode");
    console.log(secondStation, " is secondStation");
    
    let fromCode = currentCRSCode;

    if (stationName == "" && remStatus == 1){
      stationName = secondStation;
    }

    if (stationName == ""){
      stationName = currentCRSCode;
    }

    if (status == 0) {
      remStatus = 0;
    }

    testFetch = 0;

    let response;

    if (remStatus == 1){
        try{
          response = await fetch('https://huxley2.azurewebsites.net/departures/'+fromCode+'/to/'+stationName+'/150'+timeOffset)
        } catch {
          alert("Failed to fetch. Please check internet connection / search criteria.")
        }
        trainSearch = "Services from " + fromCode + " to " + stationName;
        secondStation = stationName;
        if (testFetch == 1){
          alert("Network timed out, results may be incorrect.");
        }
    } else if (remStatus == 0) {
      console.log("boo")
      try{
      response = await fetch('https://huxley2.azurewebsites.net/departures/'+stationName+'/150'+timeOffset);
      } catch {
        alert("Failed to fetch. Please check internet connection / search criteria.")
      }
      trainSearch = "Services from " + stationName;
      if (testFetch == 1){
        alert("Network timed out, results may be incorrect.");
      }
    }

    let data;

    try{
      data = await response.json()

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

      console.log("testingTimeout");

      runLast();
      

    }
    catch{
      alert("Unable to retrieve new results. Previous results may be shown.")
      //setDepartures([""]);
      setIsOpen(false);
    }
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
    className="selectBox"
    onChange={opt => setDropVal(opt.value.slice(opt.value.length-4,-1)+console.log(opt.value.slice(opt.value.length-4,-1))+handleDepartureClick(current,opt.value.slice(opt.value.length-4,-1),0))}
    />);

    setTRCD(<Select 
      options={display}
      className="selectBox"
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
       
        <form style={{paddingLeft:"10px",paddingRight:"10px"}} method="post" onSubmit={e => {e.preventDefault() ; handleDepartureClick(current)}}>
          <p style={{textAlign:"left"}}>Departure station: </p>
          <text style={{textAlign:"left"}}>{trcDropDown}</text>
          <p style={{textAlign:"left"}}>Destination station (optional): </p>
          <text style={{textAlign:"left"}}>{trcDropDownD}</text>
          
          {/* <p>Or type station name manually: </p> */}
          {/* <label>
            Enter manually: &nbsp; <input style = {{backgroundColor: "#cfcfcf", border: "0", borderRadius: "2px"}}
            name="formVal" defaultValue=""
            onChange={(event) => setFormVal(event.target.value)}/>
          </label> */}
          <br/>
          <button id = "useTrains"type="reset" onClick={clearAll}>Reset</button>
          <button id = "useTrains" type="button" onClick={() => handleDepartureClick(current)}>View/Refresh live departures</button>
          </form>

          
        
      </div>
      <hr />

      <div>
      {isOpen && (
      <div>
        {trainSearch}<br/>
        <p className = "highlights">{textInfo}<br/>{newsLink}</p><br/>
        <button style = {{marginBottom: "10px", backgroundColor:"#e8e2c1"}} onClick={() => handleDepartureClick(earlier)}>120 - 100 minutes ago</button><br/>
        <button style = {{marginBottom: "10px", backgroundColor:"#e8e2c1"}} onClick={() => handleDepartureClick(earlier2)}>100 minutes ago - present</button><br/>
        <br/>
        <Table className= "transactions" style = {{backgroundColor: "#f0f0f0"}}>
              {stringDepartures.map((departures, index) => (
                <tr data-index={index} className="tableTR"  onClick={() => routeChange(departures)}>
                  <td>{departures}</td>
                  <br/><br/><br/>
                </tr>
              ))}
        </Table><br/>
        <button style = {{marginTop: "40px", backgroundColor:"#e8e2c1"}}onClick={() => handleDepartureClick(later)}>100 minutes later</button><br/>
        <button style = {{marginTop: "10px", backgroundColor:"#e8e2c1"}}onClick={() => handleDepartureClick(later2)}>100 - 120 minutes later</button>

        <br/><br/>

      </div>
      )}
      </div>
      
      <div className = "NRLogo">
        
          <img src={image} alt="powered by National Rail Enquiries" width="256" />
        
      </div>


      


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



