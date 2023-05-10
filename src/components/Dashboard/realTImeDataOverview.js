import React from "react";
import StartFirebase from "../DataFeed/firebase";
import {ref, onValue, query, limitToLast, orderByChild, orderByPriority, orderByValue } from "firebase/database";
import { where, orderBy } from "firebase/firestore";

import { Table } from "react-bootstrap";
import { typeOf } from "tls";

const db = StartFirebase();

export class RealTimeDataOverview extends React.Component{
    constructor(){
        super();
        this.state = {
            tableData: []

        }
    }

    componentDidMount(){
        const user2 = localStorage.getItem('username');
        //const dbref = ref(db, user2);
        const dbref = query(ref(db, user2), orderByChild("Amount"), limitToLast(9));

        onValue(dbref, (snapshot)=>{
            let records = [];
            let recordsSort = [];
            let recordsTotal = 0;

            snapshot.forEach(childSnapshot => {
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({"date": keyName, "data":data})             
            });

            for (let i=0; i<records.length; i++){
                recordsSort.push(records[i].data.Amount);
                recordsTotal = recordsTotal + Number(records[i].data.Amount);
            }

            records = records.reverse();
            this.setState({tableData: records});
            //console.log("recordsSort is", (recordsSort));
            console.log("recordsTotal iss", (recordsTotal));


        });
    }

    render(){
        return(
            <div className="wrapper">
                <h4>Greatest anomalous readings</h4>
                <Table className= "transactions" style = {{backgroundColor: "#e3f2ff"}}>
                    <thead>
                    <tr>
                        {/*<th>#</th>*/}
                        <th>Sensor</th>
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
            </div>

        )
    }


}