import XYPlot from 'reactochart/XYPlot';
import XAxis from 'reactochart/XAxis';
import XAxisTitle from 'reactochart/XAxisTitle';
import YAxis from 'reactochart/YAxis';
import YAxisTitle from 'reactochart/YAxisTitle';

import LineChart from 'reactochart/LineChart';
import BarChart from 'reactochart/BarChart';
import 'reactochart/styles.css';
import { graphArray } from './realTImeDataTotals';

const funnelData = [
  {time: "13:00", value: 600},
  {time: "13:02", value: 589},
  {time: "13:04", value: 600},
  {time: "13:06", value: 600},
  {time: "13:08", value: 589},
  {time: "13:10", value: 589},
  {time: "13:12", value: 200},
  {time: "13:14", value: 232},
  {time: "13:16", value: 256},
  {time: "13:18", value: 235}
];

const funnelData2 = [
  {time: "13:00", value: 600},
  {time: "13:02", value: 589},
  {time: "13:04", value: 600},
  {time: "13:06", value: 600},
  {time: "13:08", value: 589},
  {time: "13:10", value: 585},
  {time: "13:12", value: 582},
  {time: "13:14", value: 580},
  {time: "13:16", value: 575},
  {time: "13:18", value: 569}
];

const funnelData3 = [
  {time: "13:00", value: 400},
  {time: "13:02", value: 430},
  {time: "13:04", value: 100},
  {time: "13:06", value: 430},
  {time: "13:08", value: 430},
  {time: "13:10", value: 430},
  {time: "13:12", value: 430},
  {time: "13:14", value: 150},
  {time: "13:16", value: 175},
  {time: "13:18", value: 430}
];

const funnelData4 = [
  {time: "13:00", value: 400},
  {time: "13:02", value: 400},
  {time: "13:04", value: 460},
  {time: "13:06", value: 150},
  {time: "13:08", value: 430},
  {time: "13:10", value: 430},
  {time: "13:12", value: 430},
  {time: "13:14", value: 430},
  {time: "13:16", value: 145},
  {time: "13:18", value: 250}
];

export const GraphEXP = props => (
  <div>
    <h4>Comparison of all sensors</h4>
    <p>Failure detected</p>

    <XYPlot xyPlotStyle={{fill:"#e3f2ff"}} width={350} height={275}>
      <XAxis/>
      <YAxis/>
      <LineChart
          lineStyle={{stroke: "#fa052a",strokeWidth: 3}}
          data={funnelData}
          x={d => d.time}
          y={d => d.value}
          barThickness={40}
      />
        <LineChart
          lineStyle={{stroke: "#d49f0f",strokeWidth: 3}}
          data={funnelData2}
          x={d => d.time}
          y={d => d.value}
          barThickness={40}
      />
        <LineChart
          lineStyle={{stroke: "#006bd6",strokeWidth: 3}}
          data={funnelData3}
          x={d => d.time}
          y={d => d.value}
          barThickness={40}
      />
        <LineChart
          lineStyle={{stroke: "#6eb8c2",strokeWidth: 3}}
          data={funnelData4}
          x={d => d.time}
          y={d => d.value}
          barThickness={40}
      />
          <XAxisTitle  title="Time period (15/04/2023) " style={{fontSize:"14px"}} distance={25}/>
          <YAxisTitle  title="LDR Value (CO2e)" style={{fontSize:"14px"}} distance={35} />

      
    </XYPlot>



    <br/> 

  </div>
);

