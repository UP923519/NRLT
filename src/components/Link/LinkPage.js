import React from 'react';
import StartFirebase from "../DataFeed/firebase";
import Select from 'react-select';
import {getDatabase, ref, set, query, onValue } from "firebase/database";
import {theUser} from "../App/App.js"


export default class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          isGoing: "Monthly",
          energyCost: 241.6,
          override: false,
          saved: localStorage.getItem("billCycle")
        };
 
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value,
        });

      }

      handleSubmit(event) {
        event.preventDefault();
        //console.log(this.state.isGoing);

        //06/03/2023 15:29:00
        const currDate = new Date().toLocaleDateString();
        const currTime = new Date().toLocaleTimeString();

        let currMonthYear = currDate.slice(3,10);
        let currYear = currDate.slice(6,10);

        let insertDate = currDate+ " "+ currTime;

        var dateQ = new Date();
        dateQ.setDate(dateQ.getDate() - 90); 
        var dateStringQ = dateQ.getFullYear() + '-' + ("0" + (dateQ.getMonth() + 1)).slice(-2) + '-' + ("0" + dateQ.getDate()).slice(-2);

        var dateTodayCompare = new Date();
        dateTodayCompare.setDate(dateTodayCompare.getDate()); 
        var dateStringTodayComp = dateTodayCompare.getFullYear() + '-' + ("0" + (dateTodayCompare.getMonth() + 1)).slice(-2) + '-' + ("0" + dateTodayCompare.getDate()).slice(-2);

        var exampleDate = "2022-10-27"

        //console.log ("1 Quarter ago is", dateStringQ)
        //console.log ("today is", dateStringTodayComp)

        if (exampleDate < dateStringTodayComp && exampleDate > dateStringQ){
            //console.log ("this date is valid", exampleDate)
        }


        const db = StartFirebase();

        const user2 = localStorage.getItem('username');
        const dbref = query(ref(db, user2));

        var timee = (currDate+currTime).replaceAll('/','');

        let recordsTotalM = 0;

        onValue(dbref, (snapshot)=>{
            let records = [];

            snapshot.forEach(childSnapshot => {
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({"date": keyName, "data":data})             
            });
           
            console.log(currYear);
            for (let i=0; i<records.length; i++){
                console.log("RECORD", records[i]);

                let date1 = records[i].data.date.slice(0,-8).slice(0,-1);
                let date1Day = date1.slice(0,2);
                let date1Month = date1.slice(3,5);
                let date1Year = date1.slice(6,10);
                date1 = date1Year + "-" + date1Month + "-" + date1Day;


                if(this.state.isGoing == "Monthly" && records[i].data.Transaction.includes("💡") && records[i].data.date.includes(currMonthYear)){
                    console.log("An entry with this month of the year exists, so do not add new");
                    recordsTotalM = 1;
                }

                else if(this.state.isGoing == "Quarterly" && records[i].data.Transaction.includes("💡") && date1 > dateStringQ && date1 <= dateStringTodayComp){
                    console.log("An entry with this quarter of the year exists, so do not add new");
                    recordsTotalM = 1;
                }

                else if(this.state.isGoing == "Yearly" && records[i].data.Transaction.includes("💡") && records[i].data.date.includes(currYear)){
                    console.log("An entry with this year exists, so do not add new");
                    recordsTotalM = 1;
                }

                if(this.state.override == true){
                    //console.log("overriding plan and adding anyway");
                    recordsTotalM = 0;
                }
                if(this.state.isGoing == "Manual"){
                    //console.log("overriding plan and adding anyway");
                    recordsTotalM = 0;
                }
            }
        });

        if (recordsTotalM > 0){
            if(this.state.isGoing == "Monthly"){
                alert("Your energy bill has already been entered for this "+this.state.isGoing+" period: "+currMonthYear+`\n`+"Check the override box to proceed anyway or switch to a manual cycle.");
            }
            if(this.state.isGoing == "Quarterly"){
                alert("Your energy bill has already been entered for this "+this.state.isGoing+" period: "+dateStringQ+" - "+dateStringTodayComp+`\n`+"Check the override box to proceed anyway or switch to a manual cycle.");
            }
            if(this.state.isGoing == "Yearly"){
                alert("Your energy bill has already been entered for this "+this.state.isGoing+" period: "+currYear+`\n`+"Check the override box to proceed anyway or switch to a manual cycle.");
            }
        } else if (recordsTotalM == 0) {
            alert('Energy balance is : ' + this.state.energyCost*0.233 +`\n`+ "Your energy balance has been added successfully");
            set(ref(db, user2+"/"+timee+"/"),
            {
                Transaction: "💡Energy Bill (" + this.state.isGoing + ")",
                Amount: Number(this.state.energyCost)*0.233,
                date: insertDate
            });  
            localStorage.setItem('billCycle', (this.state.isGoing));
        }

        this.setState({
            saved: localStorage.getItem("billCycle") 
          });
      }
      render() {
        return (
        <div style={{width:"98vw", height:"100vh"}}>
            <div>
                <h3 style={{textAlign:"center"}}>Energy Monitor</h3>
                <div className = "manualInput">
                <h3 style={{textAlign: "center"}}>&nbsp;Electricity Usage</h3>
                <p>&nbsp;Saved billing cycle: {this.state.saved} </p>
                <form onSubmit = {this.handleSubmit}>
                    <label>
                    <h3></h3>&nbsp;Electricity usage (kWh)
                    <input style = {{backgroundColor: "#cfcfcf", border: "0", borderRadius: "2px"}} 
                        id="inputData"
                        name="energyCost"
                        type="number"
                        value={this.state.energyCost}
                        onChange={this.handleInputChange} /> <br/>
                    </label>
                    <br />
                    <label>
                    &nbsp;Billing cycle
                    <select name="isGoing" value={this.state.isGoing} onChange={this.handleInputChange} style = {{backgroundColor: "#cfcfcf", border: "0", borderRadius: "2px"}} id="inputData">
                        <option value="Monthly">Monthly</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="Yearly">Yearly</option>
                        <option value="Manual">Manual (no cycle)</option>
                    </select>
                    </label>
                    <br/><br/>
                    <label>&nbsp;Override billing cycle
                        <input
                        name="override"
                        type="checkbox"
                        checked={this.state.override}
                        onChange={this.handleInputChange} />
                    <br/>
                    </label>
                    <input style = {{border: "0", marginLeft:"4px"}} id = "journeySubmitButton" value="☑ Submit" type="submit"/>
                </form>
                <a href="/IOTSystem">

                </a>
                </div>
            </div>
        </div>
        );
      }
    }
    
