import {useState, useEffect} from 'react';
import axios, {AxiosInstance} from 'axios';
import DatosAnaliticos from './components/DatosAnaliticos';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

interface datosInflacionInterface {
  fechas: string[],
  datosHistoricos: {
    mensual: number[],
    interanual: number[],
  },
  datosActuales: {},
};

const hoy: Date = new Date();
const fechaComienzoDatos: Date = new Date('2018/01/01');  

const info: string = 
`Variacion mensual y anual de IPC Nucleo.
Fuente datos.gob.ar.
https://www.datos.gob.ar/series/api/series/?ids=173.1_INUCLEOLEO_DIC-_0_10`

export default function Inflacion({modo}): JSX.Element {
  const [datosInflacion, setDatosInflacion] = useState<datosInflacionInterface>();

  useEffect(() => {getDatos()}, [])

  async function getDatos() {
    try {
      const res = await api.get('/datos/inflacion');
      const data: any = res.data.datosInflacion;
      delete data['nombre'];
      delete data['__v'];

      setDatosInflacion(data);
    }

    catch(e) {console.log(e)}
  }
  
  function renderContent(): JSX.Element {
    if (datosInflacion === undefined) return (
      <div className='sm:text-xl'>
        Cargando...
      </div>
    )

    else return (
    <div>
      <DatosAnaliticos 
      nombre='Inflacion'
      modo={modo}
      datos={datosInflacion}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad='%'
      mostrarValores={true}
      manejoEstados={{}}
      round={1}
      textoInfo={info}
      />
    </div>
    )
  }

  return (
  <div className='z-[1]'>
    {renderContent()}
  </div>
  )
};
