import React from "react";
import StartFirebase from "../Preferences/firebase";
import {ref, onValue, query, limitToLast, orderByChild, orderByPriority, orderByValue } from "firebase/database";
import { where, orderBy } from "firebase/firestore";

import { Table } from "react-bootstrap";
import { typeOf } from "tls";
import TableData from "../table/form";

const db = StartFirebase();

let recordsTotal = 0;
let recordsTotalMonth = 0;
let recordsL = [];
export let graphArray = [];

export let tmode = "";
export let tmodeTip = "";


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

            
            for (let i=0; i<records.length; i++){
                recordsTotal = recordsTotal + Number(records[i].data.Amount);
                let date1 = records[i].data.date.slice(0,-8).slice(0,-1);
                let date2 = dateString;
                let date1Day = date1.slice(0,2);
                let date1Month = date1.slice(3,5);
                let date1Year = date1.slice(6,10);
                date1 = date1Year + "-" + date1Month + "-" + date1Day;
                //console.log(date1, date2);
                //console.log(records[i].data.Transaction.slice(0,2));
                let transportMode = records[i].data.Transaction.slice(0,2);
                
                if (transportMode == "🚂"){
                    tmodeT += 1; 
                }
                if (transportMode == "🚗"){
                    tmodeC += 1; 
                }
                               
                if (date1 > date2){
                    recordsTotalMonth = recordsTotalMonth + Number(records[i].data.Amount);
                    //console.log("newer than last month");
                }

                if (date1 > dateStringW){
                    console.log("The following date", date1, "should be bigger than", dateStringW, "Last week");
                    recordsTotalWeek = recordsTotalWeek + Number(records[i].data.Amount);
                    //console.log("newer than last week");
                }

                if (date1 > dateStringY){
                    recordsTotalYear = recordsTotalYear + Number(records[i].data.Amount);
                    //console.log("newer than last year");
                }

                if (date1 > dateStringL2W && date1 < dateStringW){
                    console.log("The following date", date1, "should be less than", dateStringW, "and bigger than", dateStringL2W, "last 2 week");
                    recordsTotalL2W = recordsTotalL2W + Number(records[i].data.Amount);
                }

                if (date1 > dateStringL3W && date1 < dateStringL2W){
                    console.log("The following date", date1, "should be less than", dateStringL2W, "and bigger than", dateStringL3W, "last 3 week");
                    recordsTotalL3W = recordsTotalL3W + Number(records[i].data.Amount);
                }

                if (date1 > date2 && date1 < dateStringL3W){
                    console.log("The following date", date1, "should be less than", dateStringL3W, "and bigger than", date2, "last 4 week");
                    recordsTotalL4W = recordsTotalL4W + Number(records[i].data.Amount);
                }
                //console.log (records[i].data.date.slice(0,-8));
                //console.log(dateString);
            }
            
            let dataArr = ["Amount: ", [recordsTotal, recordsTotalMonth, recordsTotalWeek, recordsTotalWeek]];
            records = [];

            records.push({date: 'n/a', data: {Amount: recordsTotalWeek, Transaction: 'This Week', date: 'N/A'}});
            graphArray.push({Amount: recordsTotalWeek, Transaction: 'Last week'});
            graphArray.push({Amount: recordsTotalL2W, Transaction: '2 weeks ago'});
            graphArray.push({Amount: recordsTotalL3W, Transaction: '3 Weeks ago'});
            graphArray.push({Amount: recordsTotalL4W, Transaction: 'A month ago'});

            records.push({date: 'n/a', data: {Amount: recordsTotalMonth, Transaction: 'This Month', date: 'N/A'}});
            records.push({date: 'n/a', data: {Amount: recordsTotalYear, Transaction: 'Past Year', date: 'N/A'}});
            records.push({date: 'n/a', data: {Amount: recordsTotal, Transaction: 'All time', date: 'N/A'}});

            //recordsL = ["All time", "This month"];
            graphArray = graphArray.reverse();

            this.setState({tableData: records});

            //console.log("records iss", records);

            if (tmodeT > tmodeC){
                tmode = "Train travel is your preferred method to get around"
                tmodeTip = "Try switching to cycling or walking where possible"
            } else if (tmodeT < tmodeC){
                tmode = "Car travel is your preferred method to get around"
                tmodeTip = "Try taking the train more often to reduce your carbon emissions"
            } else if (tmodeT == tmodeC){
                tmode = "You take the same amount of car journeys as train journeys"
                tmodeTip = "Try to reduce your car journeys and take the train more often instead"
            } if (tmodeT == 0 && tmodeC == 0){
                tmode = "Start adding journeys to recieve highlights"
                tmodeTip = "Recommendations will appear once you have added a journey"
            }



            console.log("records iss", ((records)));
            console.log("graphArray iss", ((graphArray)));

            //console.log("recordsTotal iss", (recordsTotal));
            //console.log("recordsTotalMonth iss", (recordsTotalMonth));

        });
    }

    render(){
        return(
            <div className="wrapper">
                <h4>Your recent carbon balance</h4>
                <Table className= "transactions" style = {{backgroundColor: "#b4eced"}}>
                    <thead>
                    <tr>
                        {/*<th>#</th>*/}
                        <th>Time period</th>
                        <th>Carbon (CO2e)</th>
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
                <div className='Wrapper2'>
                    

                    {/*<Table data = {rows}></Table>*/}
                    <h4>Your highlights </h4>
                    <ul className = "highlights2">
                        <li className = "highlights">{tmode}</li>
                        <li className = "highlights">{tmodeTip}</li>
                        {/*<li className = "highlights">Your carbon usage has reduced 12% since the previous month</li>*/}

                    </ul>

                </div>

            </div>

        )
    }


}