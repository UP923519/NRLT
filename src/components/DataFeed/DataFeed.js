import React, { useState ,  useEffect } from 'react';
import "../App/App.css"
import { Table } from "react-bootstrap";
import Select from 'react-select';
import image from '../../assets/nre-logo.png';
import { useNavigate } from "react-router-dom";
import { test1 } from '../Link/LinkPage';




let liveArrival = "";

let busDeparture = "";
let listStation = "";

let currentCRSCode;


let serviceMessage = "";
let displayServiceMessage = "";
let current = ""
let earlier = "?timeOffset=-120&timeWindow=120";
let earlier2 = "?timeOffset=-82&timeWindow=120";
let later = "?timeOffset=82&timeWindow=120";
let later2 = "?timeOffset=119&timeWindow=120";


var htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;


let arrivalsList = "test";
let stationsList = "";


let textInfo = "There are no messages";
let newsLinkEx = new RegExp(
  "(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))"
 ,"g"
);
let newsLink = [];

let myArray = [];



export default function DataFeed() {
  const [stringArrivals, setArrivals] = useState([]);
  const [formVal, setFormVal] = useState('');
  const [dropVal, setDropVal] = useState('');
  const [trcDropDown, setTRC] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  
  useEffect(() => {

    //setArrivals(["Enter a depature station to view services"]);
    setArrivals(myArray);
    getStation();

    if (myArray == ""){
      setIsOpen(false);
    }

    //textInfo = "";
  }, []);

  function clearAll(e) {
    setArrivals([]);
    textInfo = "There are no messages";
    newsLink = [];
    setIsOpen(false);
  }

  const displayAction = false;



  function handleArrivalClick(timeOffset, code) {

    setArrivals(["Loading..."]);
    toggle();
    //const form = e.target;
    //const formData = new FormData(form);
    //const formJson = (Object.fromEntries(formData.entries())).formVal;
    //console.log("form says", formVal);

    try{
      if (code != undefined){
        JSON.stringify(logJSONData(code,timeOffset));
        setFormVal(code);
      } else {
        JSON.stringify(logJSONData(formVal,timeOffset));
      }
    } catch{
      JSON.stringify(logJSONData(formVal,timeOffset));
    }
  }


    //setTimeout(() => {
    function runLast(){
      //arrivalsList = stringArrivals2;
    
      //console.log("Returned first promise");
      //console.log("returned promise is", arrivalsList)
  
      myArray = arrivalsList.split("\"");
  
      myArray = myArray.filter((value, index) => !((index+1)%2));
      myArray.shift();
      
  
      if (myArray[myArray.length-1] != ""){
        newsLink = [myArray[myArray.length-1].match(newsLinkEx)]; 
        textInfo = myArray[myArray.length-1];
      } else {
        textInfo = "There are no messages at this station";
        newsLink = [];
      }

      textInfo = textInfo.replace(htmlRegexG, '');
      textInfo = textInfo.replaceAll('News', 'News. ');
      textInfo = textInfo.replaceAll('in Latest Travel News.', 'in  the link below.');

  
      myArray = myArray.slice(0,-2);
  
      setArrivals(myArray);  
    //  }, "1000");
      
  }


  async function logJSONData(stationName, timeOffset) {
    
    if (stationName == ""){
      stationName = currentCRSCode;
    }

    let response;

    try{
      response = await fetch('https://huxley2.azurewebsites.net/arrivals/'+stationName+'/150'+timeOffset);
    } catch{
      alert("Failed to fetch. Please check internet connection / search criteria.")
      setIsOpen(false);
    }
    const data = await response.json();

    liveArrival = data.trainServices;
    busDeparture = data.busServices;

    currentCRSCode = data.crs;



    if (liveArrival == null && busDeparture != null){
      liveArrival = data.busServices;
    }

    if (liveArrival == null && busDeparture == null){
      liveArrival = [];
    }

    displayServiceMessage = "";
    serviceMessage = data.nrccMessages;
    let t = getTrainArrivals();
    arrivalsList = JSON.stringify(t);

    runLast();
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
    onChange={opt => setDropVal(opt.value.slice(opt.value.length-4,-1)+console.log(opt.value.slice(opt.value.length-4,-1))+handleArrivalClick(current,opt.value.slice(opt.value.length-4,-1)))}
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
      <h3 style={{textAlign:"center"}}>Arrivals</h3>

      <form style={{paddingLeft:"10px",paddingRight:"10px"}} method="post" onSubmit={e => {e.preventDefault() ; handleArrivalClick(current)}}>
          <p style={{textAlign:"left"}}>Arrival station: </p>
          <text style={{textAlign:"left"}}>{trcDropDown}</text>
          {/* <p>Or select from the menu below:<br/></p>
          <label>
            Arrival station&nbsp; <input style = {{backgroundColor: "#cfcfcf", border: "0", borderRadius: "2px"}}
            name="formVal" defaultValue=""
            onChange={(event) => setFormVal(event.target.value)}/>
          </label> */}
          <br/>
          <button id = "useTrains"type="reset" onClick={clearAll}>Reset</button>
          <button id = "useTrains" type="button" onClick={() => handleArrivalClick(current)}>View/Refresh live arrivals</button>
        </form>      
      </div>
      <hr />
      
      <div className="App">
      {isOpen && (
      <div>

      <p className = "highlights">{textInfo}<br/>{newsLink}</p><br/>
      <button style = {{marginBottom: "10px", backgroundColor:"#e8e2c1"}} onClick={() => handleArrivalClick(earlier)}>120 - 100 minutes ago</button><br/>
      <button style = {{marginBottom: "10px", backgroundColor:"#e8e2c1"}} onClick={() => handleArrivalClick(earlier2)}>100 minutes ago - present</button><br/>
      <br/>
      <Table className= "transactions" style = {{backgroundColor: "#f0f0f0"}}>
            {stringArrivals.map((arrivals, index) => (
              <tr data-index={index} style={{textAlign:"justify", textAlignLast:"right"}} onClick={() => routeChange(arrivals)}>
                <td>{arrivals}</td>
                <br/><br/><br/>
              </tr>
            ))}
      </Table><br/>
      <button style = {{marginTop: "40px", backgroundColor:"#e8e2c1"}}onClick={() => handleArrivalClick(later)}>100 minutes later</button><br/>
      <button style = {{marginTop: "10px", backgroundColor:"#e8e2c1"}}onClick={() => handleArrivalClick(later2)}>100 - 120 minutes later</button>
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



function getTrainArrivals(stationName){

  //let data = logJSONData(stationName);


  let sIdArray = [];
  let stringArrivals = [];
  for (let i = 0; i < (liveArrival.length); i++) {
    sIdArray.push(liveArrival[i].serviceID);
    stringArrivals.push(liveArrival[i].sta +" "+ liveArrival[i].destination[0].locationName + " (from " + liveArrival[i].origin[0].locationName +")  "+ liveArrival[i].eta +"  p."+ liveArrival[i].platform +
    "  "+ liveArrival[i].serviceID);
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




