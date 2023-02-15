import React, { useState } from 'react';
import "../App/App.css"
import TableData from '../table/form';
import { Handle } from "./handlesubmit";
import { RealTimeData } from '../table/realTImeData';
//import 'bootstrap/dist/css/bootstrap.min.css';

const displayEmojiName = event => alert(event.target.id);
const emojis = [{emoji: "Refresh",name: "grinning face"},{emoji: "Filters",name: "List of Filters"},{emoji: "Apply",name: "Filters Applied"}];
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

export default function Preferences() {
  
  const greeting = "greeting";
  const displayAction = false;
  const [rows, setRows] = useState(cities)

  return (    
    <div className="wrapper">
      <h2>Balance Sheet</h2>
      {/*<Table data = {rows} >
      </Table>*/}
      <h3>Carbon Transactions</h3>
      <div className='TableRow'>
      {
        emojis.map(emoji => (
          <li key={emoji.name}>
            <button className = "topRow1" onClick={displayEmojiName}>
              <span role="img" aria-label={emoji.name} id={emoji.name}>{emoji.emoji} </span>
            </button>
          </li>
        ))
      }
      </div>
      <RealTimeData/>
      <TableData/>
      {/*<Handle/>*/}
      
    </div>
    
      )
}

