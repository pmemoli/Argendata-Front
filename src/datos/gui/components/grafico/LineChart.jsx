import {useRef, useState, useEffect} from 'react'
import {Line, Bar} from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default function LineChart({chartData, bar}) {
  const windowSize = useRef([window.innerWidth, window.innerHeight])
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    }

    // Attach the event listener
    window.addEventListener('resize', handleResize)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const label = chartData.datasets[0].label
  const esIngresos = label.includes('Mediana') || label.includes('Media')
  const esDistribucion = label.includes('Distribución')

  console.log(esDistribucion)

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
        },
        title: {
          display: esDistribucion ? true : false, 
          text: esDistribucion ? 'Decil' : '',
          font: {
            size: isMobile ? 12 : 15,
          },
        },
      },
  
      y: {
        ticks: {
          font: {
            size: windowSize.current[0] > 500 ? 13 : 10,
          }
        },
        title: {
          display: esIngresos | esDistribucion ? true : false, 
          text: esIngresos ? 'Pesos de 2017' : esDistribucion ? '% de ingresos totales' : '',
          font: {
            size: isMobile ? 12 : 15,
          },
        },
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
