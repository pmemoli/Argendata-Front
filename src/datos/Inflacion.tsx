// @ts-nocheck

import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import LineChart from '../components/LineChart'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://apis.datos.gob.ar/series/api/series/?ids=173.1_INUCLEOLEO_DIC-_0_10&format=json',
});

const datosInflacionInterface = {
  fechas: [],
  ipcMensual: [],
  ipcInteranual: [],
}

function colorBoton(tipoBoton: string, tipo): string {
  if (tipoBoton === tipo) return 'bg-slate-700';
  else return '';
}

function calculadoraInteranual(serieInflacion) {
  const ipcInteranual = []
  for (let i = 0; i < serieInflacion.length; i++) {
    if (i < 12) {ipcInteranual.push(0)}
    else {
      let valorInteranual = 1;
      for (let j = 0; j < 12; j++) {
        valorInteranual *= 1 + serieInflacion[i - j]
      }
      valorInteranual -= 1

      ipcInteranual.push(valorInteranual)
    }
  }

  return ipcInteranual
}

const hoy = new Date();
const fechaPrimerDato = new Date('2018/01/01');

export default function ({modo}) {
  const [tipo, setTipo] = useState('ipcInteranual')
  const [datosInflacion, setDatosInflacion] = useState(datosInflacionInterface)
  const [rangoHistorico, setRangoHistorico] = useState([fechaPrimerDato, hoy]);

  useEffect(() => {getDatos()}, [])

  async function getDatos() {
    try {
      const res = await api.get('')
      const datosApi = res.data.data

      const fechas = datosApi.map(dato => dato[0])
      const ipcMensual = datosApi.map(dato => dato[1])
      const ipcInteranual = calculadoraInteranual(ipcMensual)

      setDatosInflacion({
        'fechas': fechas,
        'ipcMensual': ipcMensual,
        'ipcInteranual': ipcInteranual,
      })
    }

    catch(e) {console.log(e)}
  }

  function setIndices(fechaDesde=rangoHistorico[0], fechaHasta=rangoHistorico[1]) {
    const fechas = datosInflacion.fechas;
    let indiceDesde = 0;
    let indiceHasta = fechas.length - 1;

    if (fechaDesde >= fechaHasta) return rangoHistorico;

    for (let i = 0; i < fechas.length - 1; i++) {
      const fechaDate1 = new Date(fechas[i]);
      const fechaDate2 = new Date(fechas[i + 1]);

      if (fechaDate1 < fechaDesde && fechaDesde <= fechaDate2) {
        indiceDesde = i + 1;
      }
      
      if (fechaDate1 < fechaHasta && fechaHasta <= fechaDate2) {
        indiceHasta = i + 1;
      }
    }

    if (fechaHasta === hoy) return [indiceDesde];
    else return [indiceDesde, indiceHasta + 1];
  }


  function downloadData() {
    const datosIndexados = {
      'fechas': datosInflacion.fechas.slice(...setIndices()),
      'inflacionInteranual': datosInflacion.ipcInteranual.slice(...setIndices()),
      'inflacionMensual': datosInflacion.ipcMensual.slice(...setIndices()),
    }

    const st = JSON.stringify(datosIndexados);
    const blob = new Blob([st], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "datosInflacion.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const chartData = {
    labels: datosInflacion.fechas.slice(...setIndices()),
    datasets: [{
      label: tipo,
      data: datosInflacion[tipo].map(val => val * 100).slice(...setIndices()),
    }]
  }

  function renderPage() {
    if (modo === 'pagina') return (
      <div className={`mt-5 p-1 flex justify-between mb-1 z-[1]`}>
        <div>
          <div className='mb-2'>
            <label>Desde:</label>
            <input onChange={e => {
              setRangoHistorico([new Date(e.target.value), rangoHistorico[1]])
            }} className='text-black ml-1 pl-1 bg-gray-400 z-[1] relative' type='date'/>
          </div>

          <div>
            <label>Hasta:</label>
            <input onChange={e => {
              setRangoHistorico([rangoHistorico[0], new Date(e.target.value)])
            }} className='text-black ml-2 pl-1 bg-gray-400 z-[1] relative' type='date'></input>
          </div>
        </div>

        <button onClick={() => {downloadData()}} className='mr-2 text-black bg-gray-400 p-1 rounded-md z-[1]'>Descargar datos</button>
      </div>
    )
  }

  return (
    <div className='border-2 rounded-md mb-3 ml-2 mr-2 p-1 pl-2 z-[1]'>

    <Link to='/inflacion'>
      <h2 className="text-xl flex justify-center mt-1 mb-2">Inflacion</h2>    
    </Link>

    <div className='flex justify-around mb-3'>
      <button className={`${colorBoton('ipcMensual', tipo)} p-1 pb-0 rounded-sm z-[1]`} onClick={() => setTipo('ipcMensual')}>
        <h3>Mensual: {(datosInflacion.ipcMensual[datosInflacion.ipcMensual.length - 1] * 100).toFixed(1)}%</h3>
      </button>

      <button className={`${colorBoton('ipcInteranual', tipo)} p-1 rounded-sm z-[1]`} onClick={() => setTipo('ipcInteranual')}>
        <h3>Interanual: {(datosInflacion.ipcInteranual[datosInflacion.ipcInteranual.length - 1] * 100).toFixed(1)}%</h3>
      </button>
    </div>

    <div className='mb-2'>
      <LineChart chartData={chartData}/>
    </div>

    {renderPage()}
    </div>
  )
}
