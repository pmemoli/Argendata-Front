import {useRef, useState, useEffect} from 'react'
import {Line, Bar} from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default function LineChart({chartData, bar, nombre, tipo, labels}) {
  const windowSize = useRef([window.innerWidth, window.innerHeight])
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    
  function extractTextWithinBrackets(str) {
      const matches = str.match(/\(([^)]+)\)/g)

      if (!matches) return str

      let extractedText = matches[0].slice(1, -1)
      extractedText = extractedText.charAt(0).toUpperCase() + extractedText.slice(1)

      return extractedText
  }


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

  const yLabelValue = labels.ylabel[tipo]
  const textoYLabel = chartData.datasets.length > 1 ? extractTextWithinBrackets(yLabelValue) : yLabelValue 

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
          display: labels.xlabel === undefined || Object.keys(labels.xlabel).length === 0 ? false : true, 
          text: labels.xlabel[tipo],
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
          display: true,
          text: textoYLabel,
          font: {
            size: isMobile ? 12 : 15,
          },
        },
      }
    }
  }
  
  return (
  <div className={`${chartData.datasets.length === 3 ? 'h-72' : 
  chartData.datasets.length === 2 ? 'h-64' : 'h-52'} sm:h-full`}>
    {!bar && <Line data={chartData} options={options} />}
    {bar && <Bar data={chartData} options={options}/>}
  </div>
  )
}
