import React, { useState } from 'react';
import "../App/App.css"
import TableData from '../table/form';
import { RealTimeDataOverview } from './realTImeDataOverview';
import { RealTimeDataTotals } from './realTImeDataTotals';
//import './bootstrap/dist/css/bootstrap.min.css';


const displayEmojiName = event => alert(event.target.id);
const emojis = [{emoji: "😀",name: "grinning face"},{emoji: "Filters",name: "List of Filters"},{emoji: "Apply",name: "Filters Applied"}];
const customer = require('../table/data.json');


const cities = [
  {name:"This Week ", temperature: " +150kg CO2"},
  {name:"This Month ", temperature: " -2kg CO2"},
  {name:"This Year ", temperature: "+200kg CO2"},
  {name:"All Time ", temperature: "-25kg CO2"},
]

const Row = (props) => {
  const {name, temperature} = props
  return(<tr>
    <td>{name}</td>
    <td>{temperature}</td>
  </tr>)
}

const Table = (props) => {
  const {data} = props
  //console.log(data)
  return(
  <div className="wrapper">
  <table className='transactions'>
    <tbody>
      {data.map(row => {
        return (
        <Row name = {row.name}
        temperature = {row.temperature} /> );
      }
      )
      }
    </tbody>
  </table>
  </div>
  )
}

function onChange(){
    let obj = Object.assign(cities, {name:"Solar Panel Return 2 ", temperature: "-25kg CO2 3 "});
    console.log("yes",obj,"yes");

}


export default function Dashboard() {
  //const greeting = "greeting";
  const displayAction = false;
  const [rows, setRows] = useState(cities)

  return (
    <div className='Wrapper2'>
      <h2>Dashboard</h2>
      <h3>Your information overview </h3>
      <RealTimeDataOverview/>
      <RealTimeDataTotals/>
      <br/>

      <Table data = {rows}></Table>
      <h3>Your highlights </h3>
      <ul className = "highlights2">
        <li className = "highlights">Train travel is your preferred method to get around</li>
        <li className = "highlights">Your carbon usage has reduced 12% since the previous month</li>
      </ul>
      <button className = "topRow1" onClick={onChange}>
            Refresh
      </button>
    </div>
  );
}
