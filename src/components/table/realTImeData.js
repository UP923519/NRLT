import StartFirebase from "../Preferences/firebase";
import React from "react";
import {getDatabase, ref, set, get, update, remove, child, onValue } from "firebase/database";
import { Table } from "react-bootstrap";

const db = StartFirebase();
let records;

export class RealTimeData extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tableData: [],
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        
    }

    componentDidMount(){
        const user2 = localStorage.getItem('username');
        const dbref = ref(db, user2);
        onValue(dbref, (snapshot)=>{
            records = [];
            snapshot.forEach(childSnapshot => {
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({"date": keyName, "data":data})
            });
            this.setState({tableData: records});
        });

    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const db = StartFirebase();
        const user2 = localStorage.getItem('username');
        let deletionCounter = false;
        //console.log(records.length, Number(this.state.value));
        for (let i=0; i<records.length; i++){
            if (i == Number(this.state.value)) {
                const tasksRef = ref(db, user2+"/"+records[i].date);
                remove(tasksRef).then(() => {
                  console.log("location removed");
                });
                alert("Row " + this.state.value + " has been deleted");
                deletionCounter = true;
            }
        }
        if (deletionCounter == false){
            alert("This row does not exist");
        }
    }
    render(){
        return(
            <div className="wrapper">
                <Table className= "transactions" style = {{backgroundColor: "#caddeb"}}>
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
                <form onSubmit={this.handleSubmit}>
                <label>Which row would you like to delete?
                <input 
                type="text" 
                value={this.state.value}
                onChange={this.handleChange}
                />
                </label>
                <input type="submit" value="Delete" />
                </form>
                
            </div>

        )
    }


}