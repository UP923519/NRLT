import StartFirebase from "../DataFeed/firebase";
import React from "react";
import {query, ref, set, get, limitToLast, remove, orderByChild, onValue } from "firebase/database";
import { Table } from "react-bootstrap";

const db = StartFirebase();
export let records;
export let recordsSD;
export let recordsSorted;


export class RealTimeDataAll extends React.Component{
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
        const dbref = query(ref(db, user2));
        onValue(dbref, (snapshot)=>{
            records = [];
            recordsSD = [];
            recordsSorted = [];

            snapshot.forEach(childSnapshot => {
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({"date": keyName, "data":data})
                recordsSD.push({"date": keyName, "data":data})

            });

            let recordsDateSort = [];

            for (let i=0; i<recordsSD.length; i++){
                //recordsDateSort.push(recordsSD[i].data.date);
                let date1 = records[i].data.date.slice(0,-8).slice(0,-1);
                let date1Day = date1.slice(0,2);
                let date1Month = date1.slice(3,5);
                let date1Year = date1.slice(6,10);
                date1 = date1Year + "-" + date1Month + "-" + date1Day;
                recordsDateSort.push(date1);
            }


            recordsDateSort = recordsDateSort.sort();
            //recordsDateSort = recordsDateSort.reverse();

            for (let i=0; i<recordsDateSort.length; i++){
                for (let j=0; j<records.length; j++){
                    let date1 = records[j].data.date.slice(0,-8).slice(0,-1);
                    let date1Day = date1.slice(0,2);
                    let date1Month = date1.slice(3,5);
                    let date1Year = date1.slice(6,10);
                    date1 = date1Year + "-" + date1Month + "-" + date1Day;
                    if (date1 == recordsDateSort[i]){
                        if (!recordsSorted.includes(records[j])){
                            recordsSorted.push(records[j]);
                        }
                    }
                }
            }

            //console.log(recordsSorted);
            records = recordsSorted;
            this.setState({tableData: records.reverse()});

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
                <div className="TableRow">
                    <a href="/NRLT">
                        <button id = "useCurrentLocation">
                            ↻ Refresh
                        </button>
                    </a>
                    &nbsp;Showing all
                </div>
                <Table className= "transactions" style = {{backgroundColor: "#e3f2ff"}}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Sensor Device</th>
                        <th>Value</th>
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
                <label style = {{paddingRight: "7px"}} >Delete row:</label> 
                <input style = {{backgroundColor: "#ebebeb", border: "0", borderRadius: "2px"}}
                type="text" 
                value={this.state.value}
                onChange={this.handleChange}
                />
                <input style = {{marginLeft: "7px", border: "0"}} id = "useCurrentLocation" type="submit" value="✖ Delete" />
                </form>
                
            </div>

        )
    }


}