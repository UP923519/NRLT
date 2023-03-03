import StartFirebase from "../Preferences/firebase";
import React from "react";
import {getDatabase, ref, set, get, update, remove, child, onValue } from "firebase/database";
import { Table } from "react-bootstrap";

const db = StartFirebase();

export class RealTimeData extends React.Component{
    constructor(){
        super();
        this.state = {
            tableData: []

        }
    }

    componentDidMount(){
        const user2 = localStorage.getItem('username');
        const dbref = ref(db, user2);
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
                <Table className= "transactions" style = {{borderRadius: "9px", backgroundColor: "#caddeb"}}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Transaction Type</th>
                        <th>Carbon (CO2e)</th>
                        <th>Date & Time</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.tableData.map((row,index)=>{
                            return(
                            <tr>
                                <td>{index}</td>
                                {/*<td>{row.date}</td>*/}
                                <td>{row.data.Transaction}</td>
                                <td>{row.data.Amount}</td>
                                <td>{row.data.date}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>

        )
    }


}