import React, { useState } from 'react';
import "../App/App.css"
import TableData from '../table/form';
import { RealTimeDataOverview } from './realTImeDataOverview';
import { RealTimeDataTotals } from './realTImeDataTotals';
import { MyFirstLineChart } from './realTImeDataGraphs';
//import './bootstrap/dist/css/bootstrap.min.css';
import { tmode, tmodeTip } from './realTImeDataTotals';


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
      <h3>Information Overview </h3>
      <RealTimeDataOverview/>
      <RealTimeDataTotals/>
      <br/>
    </div>
  );
}
