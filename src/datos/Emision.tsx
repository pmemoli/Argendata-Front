import {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import LineChart from '../components/LineChart'

const api = axios.create({
  baseURL: 'http://apis.datos.gob.ar/series/api/series/?ids=300.1_AP_PAS_BASRIA_0_M_21&format=json&start_date=2015-01',
});

const datosEmisionInterface = {
  fechas: [],
  emision: [],
}

const hoy = new Date()
const fechaComienzoDatos = new Date('2015/01/01')

export default function Emision({modo}) {
  const [datosEmision, setDatosEmision] = useState(datosEmisionInterface)
  const [rangoHistorico, setRangoHistorico] = useState([hoy, fechaComienzoDatos]);

  useEffect(() => {getDatosEmision()}, [])

  async function getDatosEmision() {
    try {
      const res = await api.get('')
      const datosApi = res.data.data     
    
      const fechas = datosApi.map(dato => dato[0])
      const baseMonetaria = datosApi.map(dato => dato[1])

      console.log(fechas)

      setDatosEmision({
        'fechas': fechas,
        'emision': baseMonetaria
      })
    }

    catch(e) {console.log(e)}
  }

  const chartData = {
    labels: datosEmision.fechas,
    datasets: [{
      label: 'Emision',
      data: datosEmision.emision.map(val => val / 1000000),
    }]
  }

  return (
    <div className='border-2 rounded-md mb-3 ml-2 mr-2 p-1 pl-2 z-[1]'>

    <Link to='/emision'>
      <h2 className="text-xl flex justify-center mt-1 mb-2">Emision</h2>    
    </Link>

    <div className='mb-2'>
      <LineChart chartData={chartData}/>
    </div>

    </div>
  )
}
