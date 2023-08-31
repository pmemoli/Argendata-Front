import {useRef} from 'react'
import {Line, Bar} from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default function LineChart({chartData, bar}) {
  const windowSize = useRef([window.innerWidth, window.innerHeight])

  // if (bar) chartData.datasets[0].label = 'Porcentaje'

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        color: 'white',
        display: chartData.datasets.length > 1,
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
  }
  
  if (!bar) return (
  <div className={`${chartData.datasets.length === 3 ? 'h-72' : 
  chartData.datasets.length === 2 ? 'h-64' : 'h-52'} sm:h-full`}>
    <Line data={chartData} options={options} />
  </div>
  )
  else return <Bar data={chartData} options={options}/>
}
