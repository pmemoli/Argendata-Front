import {useRef} from 'react';
import {Line, Bar} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function LineChart({chartData, histogram}): JSX.Element {
  const windowSize: any = useRef([window.innerWidth, window.innerHeight]);

  if (histogram !== undefined) chartData.datasets[0].label = 'Porcentaje'

  const options: any = {
    plugins: {
      legend: {
        display: false,
      },
    },
  
    maintainAspectRatio : false,
  
    scales: {
      x: {
        ticks: {
          maxTicksLimit: windowSize.current[0] > 500 ? 5 : 4,
          align: 'center',
          font: {
            size: windowSize.current[0] > 500 ? 13 : 10,
          }
        }
      },
  
      y: {
        ticks: {
          font: {
            size: windowSize.current[0] > 500 ? 13 : 10,
          }
        }
      }
    }
  };
  
  if (histogram === undefined) return <Line data={chartData} options={options}/>
  else return <Bar data={chartData} options={options}/>
}
