import React, { useState } from 'react';
import "../App/App.css"
import TableData from '../table/form';
import { ViewAllData } from "../table/ViewAllData";
import { RealTimeData } from '../table/realTImeData';
//import 'bootstrap/dist/css/bootstrap.min.css';

const displayEmojiName = event => alert("Refreshing data...");
const emojis = [{emoji: "Refresh",name: "Refreshing data..."}];
const customer = require('../table/data.json');

const cities = [
  {name:"Trip by Bus ", temperature: " +150kg CO2"},
  {name:"Planting Trees ", temperature: " -2kg CO2"},
  {name:"Trip by Train ", temperature: "+200kg CO2"},
  {name:"Solar Panel Return ", temperature: "-25kg CO2"},
]

const Row = (props) => {
  const {name, temperature} = props
  return(<tr>
    <td>{name}</td>
    <td>{temperature}</td>
  </tr>)
}

function onChange(){
    let obj = Object.assign(cities, {name:"Solar Panel Return 2 ", temperature: "-25kg CO2 3 "});
    console.log("yes",obj,"yes");

}

export default function DataFeed() {
  
  const greeting = "greeting";
  const displayAction = false;
  const [rows, setRows] = useState(cities)

  return (    
    <div style={{width:"98vw", height:"150vh"}} className="wrapper">
      {/*<Table data = {rows} >
      </Table>*/}
      <h3>Data Feed</h3>
      <div className='TableRow'>
      
      </div>
      <ViewAllData/>
      <TableData/>
      <br/>
      
    </div>
    
      )
}

