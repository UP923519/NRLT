import React from "react";
import StartFirebase from "../DataFeed/firebase";
import {ref, onValue, query, limitToLast, orderByChild, orderByPriority, orderByValue } from "firebase/database";

import { Table } from "react-bootstrap";
import { TrendBarChart } from "./realTImeDataGraphs";
import { GraphEXP } from "./realTImeDataGraphsExp";


const db = StartFirebase();

let recordsTotal = 0;
let recordsTotalMonth = 0;
let recordsL = [];
export let graphArray = [];

export let tmode = "";
export let tmodeTip = "";

export let tmodeL = "";
export let tmodeTipL = "";
export let tmodeS = "";
export let tmodeTipS = "";
export let tmodeP = "";
export let tmodeTipP = "";

let saveCurrentAmount = 0

const soundThreshold = 150;
const proxThreshold = 5;
const lightThreshold = 400;

let avgCounter = 0
let avgCounterW = 0;
let avgCounterM = 0;
let avgCounterY = 0;
let avgCounterL2W = 0
let avgCounterL3W = 0
let avgCounterL4W = 0;

export class RealTimeDataTotals extends React.Component{
    constructor(){
        super();
        this.state = {
            tableData: []

        }
    }

    componentDidMount(){
        const user2 = localStorage.getItem('username');
        //const dbref = ref(db, user2);
        const dbref = query(ref(db, user2), orderByChild("Amount"));

        onValue(dbref, (snapshot)=>{
            let records = [];
            graphArray = [];
            recordsTotal = 0;
            recordsTotalMonth = 0;
            let recordsTotalWeek = 0;
            let recordsTotalYear = 0;
            let recordsTotalL2W = 0;
            let recordsTotalL3W = 0;
            let recordsTotalL4W = 0;


            //DatePreviousMonth
            var date = new Date();
            date.setDate(date.getDate() - 30); 
            var dateString = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
            //DatePreviousWeek
            var dateW = new Date();
            dateW.setDate(dateW.getDate() - 7); 
            var dateStringW = dateW.getFullYear() + '-' + ("0" + (dateW.getMonth() + 1)).slice(-2) + '-' + ("0" + dateW.getDate()).slice(-2);
            //DatePreviousYear
            var dateY = new Date();
            dateY.setDate(dateY.getDate() - 365); 
            var dateStringY = dateY.getFullYear() + '-' + ("0" + (dateY.getMonth() + 1)).slice(-2) + '-' + ("0" + dateY.getDate()).slice(-2);
            //DateWeeBeforeLast
            var dateL2W = new Date();
            dateL2W.setDate(dateL2W.getDate() - 14); 
            var dateStringL2W = dateL2W.getFullYear() + '-' + ("0" + (dateL2W.getMonth() + 1)).slice(-2) + '-' + ("0" + dateL2W.getDate()).slice(-2);
            //Date3WeeksAgo
            var dateL3W = new Date();
            dateL3W.setDate(dateL3W.getDate() - 21); 
            var dateStringL3W = dateL3W.getFullYear() + '-' + ("0" + (dateL3W.getMonth() + 1)).slice(-2) + '-' + ("0" + dateL3W.getDate()).slice(-2);
            

            snapshot.forEach(childSnapshot => {
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({"date": keyName, "data":data})             
            });

            let tmodeT = 0;
            let tmodeC = 0;
            let tmodeB = 0;

            //console.log("records.is.", records);
            
            
            for (let i=0; i<records.length; i++){
                let currentAmount = Number(records[i].data.Amount);
                
                
                let date1 = records[i].data.date.slice(0,-8).slice(0,-1);
                let date2 = dateString;
                let date1Day = date1.slice(0,2);
                let date1Month = date1.slice(3,5);
                let date1Year = date1.slice(6,10);
                date1 = date1Year + "-" + date1Month + "-" + date1Day;
                //console.log(date1, date2);
                //console.log(records[i].data.Transaction.slice(0,2));
                let transportMode = records[i].data.Transaction;

                //console.log(currentAmount);

                

                if (transportMode == "SoundSensor"){
                    //console.log("Detecting");

                    if (currentAmount > soundThreshold){
                        tmodeT = 1;
                        //console.log("tmode is", tmodeT);
                        saveCurrentAmount = currentAmount;
                    }

                }
                if (transportMode == "LightSensor"){
                    recordsTotal = recordsTotal + Number(records[i].data.Amount);
                    avgCounter += 1;
                    if (date1 > date2){
                        recordsTotalMonth = recordsTotalMonth + Number(records[i].data.Amount);
                        //console.log("newer than last month");
                        avgCounterM += 1;
                    }
                    if (date1 > dateStringW){
                        //console.log("The following date", date1, "should be bigger than", dateStringW, "Last week");
                        recordsTotalWeek = recordsTotalWeek + Number(records[i].data.Amount);
                        //console.log("newer than last week");
                        avgCounterW += 1;
                    }
                    if (date1 > dateStringY){
                        recordsTotalYear = recordsTotalYear + Number(records[i].data.Amount);
                        //console.log("newer than last year");
                        avgCounterY += 1;
                    }
                    if (date1 >= dateStringL2W && date1 < dateStringW){
                        //console.log("The following date", date1, "should be less than", dateStringW, "and bigger than", dateStringL2W, "last 2 week");
                        recordsTotalL2W = recordsTotalL2W + Number(records[i].data.Amount);
                        avgCounterL2W += 1;
                    }
                    if (date1 >= dateStringL3W && date1 < dateStringL2W){
                        //console.log("The following date", date1, "should be less than", dateStringL2W, "and bigger than", dateStringL3W, "last 3 week");
                        recordsTotalL3W = recordsTotalL3W + Number(records[i].data.Amount);
                        avgCounterL3W += 1;
                    }
                    if (date1 >= date2 && date1 < dateStringL3W){
                        //console.log("The following date", date1, "should be less than", dateStringL3W, "and bigger than", date2, "last 4 week");
                        recordsTotalL4W = recordsTotalL4W + Number(records[i].data.Amount);
                        avgCounterL4W += 1;
                    }
                        if (currentAmount > lightThreshold){
                            tmodeC = 1;
                            saveCurrentAmount = currentAmount;
                        }
                    }
                if (transportMode == "ProximitySensor"){
                    if (currentAmount > proxThreshold){
                        tmodeB = 1;
                        saveCurrentAmount = currentAmount;
                    }
                }
                               

                //console.log (records[i].data.date.slice(0,-8));
                //console.log(dateString);
            }
            
            let dataArr = ["Amount: ", [recordsTotal, recordsTotalMonth, recordsTotalWeek, recordsTotalWeek]];
            records = [];

            records.push({date: 'n/a', data: {Amount: recordsTotalWeek/avgCounterW, Transaction: 'This Week', date: 'N/A'}});
            graphArray.push({Amount: recordsTotalWeek/avgCounterW, Transaction: 'Last week'});
            graphArray.push({Amount: recordsTotalL2W/avgCounterL2W, Transaction: '2 weeks'});
            graphArray.push({Amount: recordsTotalL3W/avgCounterL3W, Transaction: '3 Weeks'});
            graphArray.push({Amount: recordsTotalL4W/avgCounterL4W, Transaction: '1 month'});

            records.push({date: 'n/a', data: {Amount: recordsTotalMonth/avgCounterM, Transaction: 'This Month', date: 'N/A'}});
            records.push({date: 'n/a', data: {Amount: recordsTotalYear/avgCounterY, Transaction: 'Past Year', date: 'N/A'}});
            records.push({date: 'n/a', data: {Amount: recordsTotal/avgCounter, Transaction: 'All time', date: 'N/A'}});

            //recordsL = ["All time", "This month"];
            graphArray = graphArray.reverse();

            this.setState({tableData: records});

            //console.log("avgcounter is", avgCounter);

            if (tmodeT >= 1){
                tmode = "⚠️ Sound Sensor";
                tmodeTip = "Sound sensor value is " + saveCurrentAmount + ", Limit: " + soundThreshold + ". ";
            } if (tmodeC >= 1){
                tmode += "⚠️ Light Sensor"
                tmodeTip += "Light sensor value is " + saveCurrentAmount + ", Limit: " + lightThreshold + ". ";
            } if (tmodeB >= 1){
                tmode += "⚠️ Proximity Sensor"
                tmodeTip = "Proximity sensor value is " + saveCurrentAmount + ", Limit: " + proxThreshold + ". ";
            } else if (tmodeT == 0 && tmodeC == 0 && tmodeB == 0) {
                tmode = "IOT sensors are functioning normally"
                tmodeTip = "No problems detected"
            }

            //console.log("records iss", ((records)));
            //console.log("graphArray iss", ((graphArray)));

            //console.log("recordsTotal iss", (recordsTotal));
            //console.log("recordsTotalMonth iss", (recordsTotalMonth));
        });
    }

    render(){
        return(
            <div className="wrapper">
                <h4>Light sensor data report</h4>
                <Table className= "transactions" style = {{backgroundColor: "#e3f2ff"}}>
                    <thead>
                    <tr>
                        {/*<th>#</th>*/}
                        <th>Time period</th>
                        <th>Value</th>
                        {/*<th>Date Time</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.tableData.map((row,index)=>{
                            return(
                            <tr>
                                {/*<td>{index}</td>*/}
                                {/*<td>{row.date}</td>*/}
                                <td>{row.data.Transaction}</td>
                                <td>{row.data.Amount}</td>
                                {/*<td>{row.data.date}</td>*/}
                            </tr>
                            )
                        })}
                    </tbody>
                </Table>
                
                <TrendBarChart/>

                <GraphEXP/>
                <div className='Wrapper2'>
                    {/*<Table data = {rows}></Table>*/}
                    <h4>Message Log </h4>
                    <ul className = "highlights2">
                        <li className = "highlights">{tmode}</li>
                        <li className = "highlights">{tmodeTip}</li>

                        {/*<li className = "highlights">Your carbon usage has reduced 12% since the previous month</li>*/}
                    </ul>
                    <p>Voltage - consistent with expected range</p>
                    <p>Sound sensor - consistent with expected range</p>
                    <p>Failure detection - ❗ IOT Device fault</p>
                    <p>Service status - ❗ replace at next maintenance cycle</p>
                </div>
                <a href="/IOTSystem">
                    <button style={{marginLeft:"0"}} id = "useCurrentLocation">
                        ↻ Refresh 
                    </button> 
                </a>
               
            </div>

        )
    }


}