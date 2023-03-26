import {Line} from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const options: any = {
  plugins: {
    legend: {
      display: false,
    },
  },

  scales: {
    x: {
      ticks: {
        maxTicksLimit: 4,
        align: 'start',
      }
    },
  }
}


export default function LineChart({chartData}): JSX.Element {
  return <Line data={chartData} options={options}/>
}
