import React from "react";
import StartFirebase from "../Preferences/firebase";
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
        const dbref = query(ref(db, user2), orderByChild("Amount"), limitToLast(3));

        onValue(dbref, (snapshot)=>{
            let records = [];
            snapshot.forEach(childSnapshot => {
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({"date": keyName, "data":data})
                
            });
            this.setState({tableData: records});
        });
    }

    render(){
        return(
            <div className="wrapper">
                <h4>Your largest transactions so far</h4>
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