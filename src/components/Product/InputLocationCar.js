import React from "react";
import { render } from "react-dom";
import { getLatBetween } from "./Location 2"; 
import { address,LocationCalc } from "./locationCalculator2";


export let pointA;
export let pointB;


export class InputLocationCar extends React.Component{
  constructor(props){
    super(props)
    this.state = { email:'',name:'', age:null, address:'',phoneNo:''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showCurrent = this.showCurrent.bind(this)

  }

  state = {
    email: ''
  }
  
  // Form submitting logic, prevent default page refresh 
  handleSubmit(event){
    const { email, name, age, address, phoneNo } = this.state
    event.preventDefault()
    alert(`
      ____Your Details____\n
      Email : ${email}
      Name : ${name}
      Age : ${age}
      Address : ${address}
      Phone No : ${phoneNo}
    `)
    getLatBetween(email, name, "car");

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
  
  // Return a controlled form i.e. values of the 
  // input field not stored in DOM values are exist 
  // in react component itself as state
  render(){
    return(
      <div>
        <h3>Car Journey Input</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='email'>Origin</label>
            <input 
              name='email'
              placeholder='Email' 
              value = {this.state.email}
              onChange={this.handleChange}
            />
            <button type="button" onClick={this.showCurrent}>Use Current Location</button>
          </div>
          <div>
            <label htmlFor='name'>Destination</label>
            <input
              name='name' 
              placeholder='Name'
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>

      </div>
    )
  }
}