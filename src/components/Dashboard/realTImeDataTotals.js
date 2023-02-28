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
            recordsTotal = 0;
            recordsTotalMonth = 0;
            let recordsTotalWeek = 0;
            var date = new Date();
            date.setDate(date.getDate() - 30); 
            var dateString = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2)  ;


            snapshot.forEach(childSnapshot => {
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({"date": keyName, "data":data})             
            });

            
            for (let i=0; i<records.length; i++){
                recordsTotal = recordsTotal + Number(records[i].data.Amount);
                let date1 = records[i].data.date.slice(0,-8).slice(0,-1);
                let date2 = dateString;
                let date1Day = date1.slice(0,2);
                let date1Month = date1.slice(3,5);
                let date1Year = date1.slice(6,10);
                date1 = date1Year + "-" + date1Month + "-" + date1Day;
                console.log(date1, date2);

                //console.log(date1Day, date2);
                

                if (date1 > date2){
                    recordsTotalMonth = recordsTotalMonth + Number(records[i].data.Amount);
                    console.log("greater");
                }
                //console.log (records[i].data.date.slice(0,-8));
                //console.log(dateString);
            }
            
            let dataArr = ["Amount: ", [recordsTotal, recordsTotalMonth]];
            records = [];

            records.push({date: 'n/a', data: {Amount: recordsTotal, Transaction: 'All time', date: 'N/A'}});
            records.push({date: 'n/a', data: {Amount: recordsTotalMonth, Transaction: 'This Month', date: 'N/A'}});


            //recordsL = ["All time", "This month"];
            //records = records.reverse();

            this.setState({tableData: records});
            
            console.log("records iss", ((records)));
            console.log("recordsTotal iss", (recordsTotal));
            console.log("recordsTotalMonth iss", (recordsTotalMonth));



        });
    }

    render(){
        return(
            <div className="wrapper">
                <h4>Your recent carbon balance</h4>
                <Table className= "transactions">
                    <thead>
                    <tr>
                        {/*<th>#</th>*/}
                        <th>Transaction</th>
                        <th>Quantity</th>
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
            </div>

        )
    }


}