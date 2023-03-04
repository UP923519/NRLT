import XYPlot from 'reactochart/XYPlot';
import XAxis from 'reactochart/XAxis';
import YAxis from 'reactochart/YAxis';
import LineChart from 'reactochart/LineChart';
import BarChart from 'reactochart/BarChart';
import 'reactochart/styles.css';
import { graphArray } from './realTImeDataTotals';

const funnelData = [
  {time: 1, value: 100},
  {time: 2, value: 85},
  {time: 3, value: 42},
  {time: 4, value: 37},
  {time: 5, value: 12}
];

export const TrendBarChart = props => (
  <div>
    <h4>Trend over time </h4>

    <XYPlot width={375} height={250} responsive={true}>
      <XAxis title="Time period" />
      <YAxis title="Carbon (CO2e)" />
      <BarChart
          data={graphArray}
          x={d => d.Transaction}
          y={d => d.Amount}
    />
    </XYPlot>
    <br/> <br/>
      <a href="/FYP">
        <button id = "useCurrentLocation" className = "topRow1">
          Refresh 
        </button> 
      </a>
  </div>
);

