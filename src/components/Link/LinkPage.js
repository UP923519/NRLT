import React, { useState ,  useEffect } from 'react';
import "../App/App.css"
import { Table } from "react-bootstrap";
import image from '../../assets/nre-logo.png';



let liveDeparture = "";
let serviceMessage = "";
let displayServiceMessage = "";
let liveService = "";
let liveService2 = "";
let liveService3 = "";
let liveServiceTime = "";
let location = "";
let operator = "";
let formation = "";


let locationList = "test";

let myArray;
let textInfo = "";

let divides = "";

let formJson = "";
let infoTrain = "";

let sCode = "";




export default function Dashboard() {
  const [stringDepartures, setDepartures] = useState([]);
  const [excuseReason, setExcuseReason] = useState();
  const [operatorName, setOperator] = useState();
  const [formationCar, setFormatiion] = useState();
  const [stringCalling, setCalling] = useState([[],[]]);
  const [formVal, setFormVal] = useState('');
  const [isOpen, setIsOpen] = useState(false);



  useEffect(() => {

    setDepartures([""]);
    setCalling([["Enter a service code above"],[]]);
    textInfo = "";
    myArray = [];
    locationList = [];

    if (formJson != ""){
      handleServiceClick();
    }
  }, []);

  function clearAll(e) {
    setDepartures([""]);
    setCalling([""]);
    textInfo = "";
    setIsOpen(false);
  }



  const displayAction = false;

  function handleServiceClick(e) {

    setCalling([["Loading..."],[]]);
    toggle();

    //const form = e.target;
    //const formData = new FormData(form);


    console.log("fval",formVal);

    if (formJson == ""){
      formJson = formVal;
    }

    if (formVal != ""){
      formJson = formVal;
      infoTrain = "";

    }

    console.log("fjs is",formJson);


    JSON.stringify(logJSONData(formJson));
  }

    function runLast(){

    //setTimeout(() => {

    try{
      myArray = locationList.split("*");
    }catch{
      setCalling([["Error, please try another service."],[]]);
    }
      myArray.shift();

      let removeValue = (myArray.indexOf('","locationList2":"undefined'));
      myArray.splice(removeValue, 1)
      myArray[myArray.length-1] = myArray[myArray.length-1].replace('"}',"");

      setCalling(myArray);
    //}, "1000");
  }

  async function logJSONData(serviceID) {
    let response;
    try{
      response = await fetch('https://huxley2.azurewebsites.net/service/'+serviceID);
    }catch{
      alert("Failed to fetch. Please check internet connection / service details.")
      setIsOpen(false);
    }
    const data = await response.json();
       
    try{
        liveService = data.previousCallingPoints[0].callingPoint;
    }catch{
      console.log("CAUGHT ERROR");
      liveService = "";
    }

    try{
      liveService2 = data.subsequentCallingPoints[0].callingPoint;
    }catch{
      console.log("CAUGHT ERROR");
      liveService2 = "";
    }

    try{
      liveService3 = data.subsequentCallingPoints[1].callingPoint;
      console.log("train divides");
      divides = ("This train divides into two portions. Please check that you are located in the correct part of the train. ");
      //console.log  ({...liveService3, ...liveService2});
      //liveService3.push({locationName: 'Bognor Regis'});
      for (let i=0; i<liveService3.length;i++){
        liveService2.push(liveService3[i])
        //console.log("ls2 is", liveService3[i]);

      }

      //console.log  (liveService2);

    }catch{
      liveService3 = "";
      divides = ("");
    }
    
    //liveService2 = (data.subsequentCallingPoints[0].callingPoint);
    liveServiceTime = data;
    location = (data.locationName);
    operator = (data.operator) + "";
    if (data.length != 0){
      formation = (data.length) + " coaches";
    } else {
      formation = "";
    }
    console.log(data);

    console.log(liveServiceTime.cancelReason)
    console.log(liveServiceTime.delayReason)


    liveServiceTime.cancelReason += "."; 
    liveServiceTime.delayReason += "."; 
    
    let exr = (divides + liveServiceTime.cancelReason +" "+ liveServiceTime.delayReason +" ");
    exr = (exr.replace("null.",""));
    exr = (exr.replace("null.",""));
    /*exr = (exr.replace(". . ",". "));
    exr = (exr.replace(". . ",". "));
    exr = (exr.replace(". This train is formed","This train is formed"));
    exr = (exr.replace(".  S","S"));*/

    console.log(exr);
    if (exr != "  "){
      setExcuseReason(exr);
    } else {
      setExcuseReason("There are no messages for this service.");
    }
    if (formation != ""){
      setFormatiion(formation);
    } else{
      setFormatiion("Information not provided");
    }


    
    setOperator(operator);

    



    let t = getTrainArrivals();
    //console.log("t is", t);
    locationList = JSON.stringify(t);

    runLast();
  }

  function toggle() {
    setIsOpen(true);
  }


  return (
    <div className='Wrapper2'>
      {/* <br/> */}
      <h3 style={{textAlign:"center"}}>Service Details</h3>
      <div className = "manualInput">
        <form method="post" onSubmit={e => {e.preventDefault() ; handleServiceClick()}}>
          <label>
            <p>Service code:&nbsp; <input style = {{backgroundColor: "#cfcfcf", border: "0", borderRadius: "2px"}}
            name="myInput" defaultValue="" 
            onChange={(event) => setFormVal(event.target.value)}/></p>
          </label>
          <button id = "useTrains" type="reset" onClick={clearAll}>Reset</button>
          <button id = "useTrains" type="button" onClick={() => handleServiceClick()}>View/Refresh train service</button>

        </form>
      </div>
      <hr />

      <div className="App">
      {isOpen && (
      <div>
        <p style={{margin:"0px"}}>{infoTrain}</p>
        <p className = "highlights" >{excuseReason}</p><br/>
        <div id = "trainInfo">
          <p className={"trainInfoBox"}><text style={{fontWeight:"500"}}>Service operator:</text><br/><br/>{operatorName}</p>
          <p className={"trainInfoBox"}><text style={{fontWeight:"500"}}>Train formation:</text><br/><br/>{formationCar}</p>
        </div>
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
      )}
      </div>

      <div className = "NRLogo">
        
          <img src={image} alt="powered by National Rail Enquiries" width="256" />
        
      </div>

    </div>
    
    
  );
}


function getTrainArrivals(serviceID){
  //serviceID = serviceID[0];


  let locationList;
  for (let i = 0; i < (liveService.length); i++) {
    let trainLocation;
    let trainActual;
    if (liveService[i].et == null){
      if (liveService[i].at == "On time" || liveService[i].at == "No report"){
        trainLocation = "✔️";
      } else{
        trainLocation = "❌";
        if (liveService[i].at <= liveService[i].st){
          trainLocation = "✔️";
        }
      }
    } else {
      trainLocation = liveService[i].et;
      try{
        if (liveService[i-1].et == null){
          console.log("tlc is", trainLocation);
          trainLocation = (liveService[i].et+"🚂🚃🚃");
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
  if (liveServiceTime.etd == null && liveServiceTime.eta == null){
    if (liveServiceTime.atd == "On time" || liveServiceTime.atd == "No report"){
      trainLocation = "✔️";
    } else{
      trainLocation = "❌";
    }
  } else {
    trainLocation = liveServiceTime.etd;
    if (trainLocation == null){
      trainLocation = liveServiceTime.eta;
    }
    try{
      if (liveService[liveService.length-1].et == null && liveService2[0].et !=null){
        trainLocation = liveServiceTime.etd + "🚂🚃🚃";
      }
    } catch{
        trainLocation = liveServiceTime.eta + "🚂🚃🚃";
        if (trainLocation.includes("null")){
          trainLocation = trainLocation.replace('null', liveServiceTime.etd);
        }
      
    }
  }
  if (liveServiceTime.atd == null){
    if (liveServiceTime.ata != null){
      liveServiceTime.atd = liveServiceTime.ata
    } else {
      liveServiceTime.atd = "N/A"
    }
  }

  if (liveServiceTime.std == null){
    if (liveServiceTime.sta != null){
      liveServiceTime.std = liveServiceTime.sta
    } else {
      liveServiceTime.std = "N/A"
    }
  }

  if (trainLocation.includes("null")){
    trainLocation = trainLocation.replace('null', 'N/A');
  }

  if (liveServiceTime.platform == null){
    liveServiceTime.platform = " N/A";
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
        if (liveService2[i].at <= liveService2[i].st){
          trainLocation = "✔️";
        }
      }
    } else {
      trainLocation = liveService2[i].et;
      try{
        if (liveService2[i-1].et == null){
          trainLocation = (liveService2[i].et+"🚂🚃🚃");
        }
      } catch{
        if (liveServiceTime.etd != null ){
         
        } else {
          trainLocation = (liveService2[i].et+"🚂🚃🚃");
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


export function test1(number, trainInfo){
  console.log("RUNNING NOW number is", number);
  formJson = number;
  trainInfo = trainInfo.split(")");

  //infoTrain = trainInfo[0]+")";

  infoTrain = <p className='infoTrain'>{trainInfo[0]+")"}</p>

}





