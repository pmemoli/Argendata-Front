import {useRef} from 'react';
import {Line} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function LineChart({chartData}): JSX.Element {
  const windowSize: any = useRef([window.innerWidth, window.innerHeight]);

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
  
  return <Line data={chartData} options={options}/>
}
