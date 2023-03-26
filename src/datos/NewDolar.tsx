import {useState, useEffect} from 'react';
import axios, {AxiosInstance} from 'axios';
import DatosAnaliticos from './components/DatosAnaliticos';

const api: AxiosInstance = axios.create({
  baseURL: 'http://apis.datos.gob.ar/series/api/series/?ids=173.1_INUCLEOLEO_DIC-_0_10&format=json',
});

interface datosDolarInterface {
  fechas: string[],
  datosHistoricos: {
    mensual: number[],
    interanual: number[],
  },
  datosActuales: {},
};

const hoy: Date = new Date();
const fechaComienzoDatos: Date = new Date('2018/01/01');  

export default function Dolar({modo}): JSX.Element {
  const [datosDolar, setDatosDolar] = useState<datosDolarInterface>();
  const [transaccion, setTransaccion] = useState<string>();

  useEffect(() => {getDolar()}, [])

  async function getDolar() {
    try {
      const res = await api.get('/datos/dolar')
      setDatosDolar(res.data.datosDolar)
    }

    catch(e) {console.log(e)}
  }

  function renderContent(): JSX.Element {
    if (datosDolar === undefined) return (
      <div>
        Cargando...
      </div>
    )
    else return (
    <div>
      <DatosAnaliticos 
      nombre='Dolar'
      modo={modo}
      datos={datosDolar}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad='%'
      mostrarValores={true}
      manejoEstados={{}}/>
    </div>
    )
  }

  return (
  <div className='z-[1]'>
    {renderContent()}
  </div>
  )
};
