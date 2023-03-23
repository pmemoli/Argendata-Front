// @ts-nocheck

import { Link } from 'react-router-dom';
import {useEffect, useState, useRef} from 'react'
import LineChart from '../components/LineChart'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const datosInterface = {
  'fechas': [],
    
  'blue': [{
    'venta': 0,
    'compra': 0,
  }],
  
  'oficial': [{
    'venta': 0,
    'compra': 0,
  }],

  'turista': {
    'venta': 0,
  },
  
  'ccl': {
    'venta': 0,
    'compra': 0,
  },
}

function colorBoton(dolarBoton: string, dolar): string {
  if (dolarBoton === dolar) return 'bg-slate-700';
  else return '';
}

const hoy = new Date();

const haceUnMes = new Date();
haceUnMes.setDate(haceUnMes.getDate() - 30);

export default function Dolar({modo}) {
  const [dolar, setDolar] = useState('oficial');
  const [datosDolar, setDatosDolar] = useState(datosInterface);
  const [rangoHistorico, setRangoHistorico] = useState([haceUnMes, hoy]);
  const [tipoTransaccion, setTipoTransaccion] = useState('venta');

  useEffect(() => {getDolar()}, []);

  async function getDolar() {
    try {
      const res = await api.get('/datos/dolar')
      setDatosDolar(res.data.datosDolar)
    }

    catch(e) {console.log(e)}
  }

  function setIndices(fechaDesde, fechaHasta, tipo='blue') {
    const fechas = datosDolar.fechas;
    let indiceDesde = 0;
    let indiceHasta = fechas.length - 1;

    if (fechaDesde >= fechaHasta) return rangoHistorico;

    for (let i = 0; i < fechas.length - 1; i++) {
      const fechaDate1 = new Date('20' + fechas[i]);
      const fechaDate2 = new Date('20' + fechas[i + 1]);

      if (fechaDate1 < fechaDesde && fechaDesde <= fechaDate2) {
        indiceDesde = i + 1;
      }
      
      if (fechaDate1 < fechaHasta && fechaHasta <= fechaDate2) {
        indiceHasta = i + 1;
      }
    }

    if (tipo === 'oficial') indiceDesde -= 1;

    if (fechaHasta === hoy) return [indiceDesde];
    else return [indiceDesde, indiceHasta + 1];
  }

  function downloadData() {
    const datosIndexados = {
      'fechas': datosDolar.fechas.slice(...setIndices(rangoHistorico[0], rangoHistorico[1])),
      'blue': datosDolar.blue.slice(...setIndices(rangoHistorico[0], rangoHistorico[1], 'blue')),
      'oficial': datosDolar.oficial.slice(...setIndices(rangoHistorico[0], rangoHistorico[1], 'oficial')),
      'ccl': datosDolar.ccl,
      'turista': datosDolar.turista,
      }

    const st = JSON.stringify(datosIndexados);
    const blob = new Blob([st], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "datosDolar.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const chartData = {
    labels: datosDolar.fechas.slice(...setIndices(rangoHistorico[0], rangoHistorico[1])),
    datasets: [{
      label: dolar,
      data: datosDolar[dolar].map(dato => dato[tipoTransaccion]).slice(...setIndices(rangoHistorico[0], rangoHistorico[1], dolar)),
    }]
  }
  
  function renderPagina() {
    if (modo === 'pagina') return (
      <div className='mt-5 p-1 flex justify-between mb-1 z-[1]'>
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

        <button onClick={() => downloadData()} className='mr-2 text-black bg-gray-400 p-1 rounded-md z-[1]'>Descargar datos</button>
      </div>
    )
  }

  return (
    <div className='border-2 rounded-md mb-3 ml-2 mr-2 p-1 pl-2 z-[1]'>
      <button onClick={() => {setTipoTransaccion(tipoTransaccion === 'venta' ? 'compra' : 'venta')}}
      className={`absolute mt-1 ml-2 text-md ${modo === 'pagina' ? 'visible' : 'invisible'}`}>
        {tipoTransaccion[0].toUpperCase() + tipoTransaccion.slice(1).toLowerCase()}
      </button>
      
      <Link to='/dolar'>
        <h2 className="text-xl flex justify-center mt-1 mb-2">Dolar</h2>    
      </Link>
      
      <div className='mb-3 overflow-x-scroll whitespace-nowrap scroll-smooth no-scrollbar'>
        <div className="flex justify-between">
          <button onClick={() => setDolar('blue')} className={`${colorBoton('blue', dolar)} p-1 rounded-sm z-[1]`}>
            <h3>Blue: {datosDolar.blue[datosDolar.blue.length - 1][tipoTransaccion]}$</h3>
          </button>

          <button onClick={() => setDolar('oficial')} className={`${colorBoton('oficial', dolar)} p-1 rounded-sm z-[1]`}>
            <h3>Oficial: {datosDolar.oficial[datosDolar.oficial.length - 1][tipoTransaccion]}$</h3>
          </button>

          <h3 className='p-1 z-[1]'>CCL: {datosDolar.ccl[tipoTransaccion]}$</h3>

          <h3 className='p-1 z-[1]'>Tarjeta: {datosDolar.turista['venta']}$</h3>
        </div>
      </div>

      <div className='mb-2'>
        <LineChart chartData={chartData}/>
      </div>

      {renderPagina()}
    </div>
  )
}
