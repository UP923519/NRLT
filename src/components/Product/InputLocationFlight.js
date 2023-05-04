import React from "react";
import { render } from "react-dom";
import { getLatBetween } from "./Location 2"; 
import { address,LocationCalc } from "./locationCalculator2";


export let pointA;
export let pointB;
const currDateTime =  new Date().toLocaleDateString('en-ca')+'T'+new Date().toLocaleTimeString();


export class InputLocationFlight extends React.Component{
  constructor(props){
    super(props)
    this.state = { email:'',name:'', age:null, address:'',phoneNo:'', date: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showCurrent = this.showCurrent.bind(this)

    this.handleChangeDate = this.handleChangeDate.bind(this);


  }

  state = {
    email: ''
  }
  
  // Form submitting logic, prevent default page refresh 
  handleSubmit(event){
    const { email, name, age, address, phoneNo } = this.state
    event.preventDefault()
    /*alert(`
      ____Your Details____\n
      Email : ${email}
      Name : ${name}
      Age : ${age}
      Address : ${address}
      Phone No : ${phoneNo}
    `)*/

    let date = this.state.date;
    let date1Year = date.slice(0,4);
    let date1Month = date.slice(5,7);
    let date1Day = date.slice(8,10);
    let date1Time = date.slice(11,date.length);
    date = date1Day + "/" + date1Month + "/" + date1Year + " " + date1Time + ":00";

    getLatBetween(email, name, "flight", date);

  }

  showCurrent(event){
    event.preventDefault()
    let addressS = address.slice(address.length-12)
    this.setState({
      email: addressS
    })


  }
  
  // Method causes to store all the values of the 
  // input field in react state single method handle 
  // input changes of all the input field using ES6 
  // javascript feature computed property names
  handleChange(event){
    this.setState({
      // Computed property names
      // keys of the objects are computed dynamically
      [event.target.name] : event.target.value
    })
  }

  handleChangeDate(event) {
    this.setState({date: event.target.value});

  }
  
  // Return a controlled form i.e. values of the 
  // input field not stored in DOM values are exist 
  // in react component itself as state
  render(){
    return(
      <div className = "divFlightInput">
        <h3 style={{textAlign: "center"}}>Flight Input</h3>
        &nbsp;Date of travel {" "}<br/>
        &nbsp;<input style = {{backgroundColor: "#cfcfcf", border: "0", borderRadius: "2px"}} type="datetime-local" value={this.state.date} max={currDateTime} onChange={this.handleChangeDate} />
        <br/><br/>
        <label htmlFor='email'>&nbsp;Origin</label>
        <form onSubmit={this.handleSubmit}>
        &nbsp;<input
              style = {{backgroundColor: "#cfcfcf", border: "0", borderRadius: "2px"}}
              type="text" 
              name='email'
              placeholder='Origin Location' 
              value = {this.state.email}
              onChange={this.handleChange}
            /><button id = "useCurrentLocation" type="button" onClick={this.showCurrent}>𖡡</button>
            <br/>
            <label htmlFor='name'>&nbsp;Destination</label>
            <br/>
            &nbsp;<input
              style = {{backgroundColor: "#cfcfcf", border: "0", borderRadius: "2px"}}
              name='name' 
              placeholder='Destination Location'
              value={this.state.name}
              onChange={this.handleChange}
            />
            <br/>
            <button style = {{border: "0", marginLeft: "4px",marginTop: "23px"}} id = "journeySubmitButton" type="submit">☑ Submit</button>
            <br/><br/>
            
        </form>

      </div>
    )
  }
}