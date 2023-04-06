import {useState, useEffect} from 'react';
import axios, {AxiosInstance} from 'axios';
import DatosAnaliticos from './components/DatosAnaliticos';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

interface datosEmisionInterface {
  fechas: string[],
  datosHistoricos: {emision: number[]},
  datosActuales: {},
};

const hoy: Date = new Date();
const fechaComienzoDatos: Date = new Date('2015/01/01');

const info: string =
`Apertura pasivo base monetaria.
Fuente datos.gob.ar.
https://www.datos.gob.ar/series/api/series/?ids=300.1_AP_PAS_BASRIA_0_M_21`

export default function Emision({modo}): JSX.Element {
  const [datosEmision, setDatosEmision] = useState<datosEmisionInterface>();

  useEffect(() => {getDatosEmision()}, []);

  async function getDatosEmision() {
    try {
      const res: any = await api.get('/datos/emision');
      const datosApi: any = res.data.datosEmision;
    
      delete datosApi['nombre'];
      delete datosApi['__v'];

      setDatosEmision(datosApi);
    }

    catch(e) {console.log(e);}
  }

  function renderContent(): JSX.Element {
    if (datosEmision === undefined) return (
      <div className='sm:text-xl'>
        Cargando...
      </div>
    )
    else return (
    <div>
      <DatosAnaliticos 
      nombre='Emision'
      modo={modo}
      datos={datosEmision}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad=''
      mostrarValores={false}
      manejoEstados={{}}
      round={0}
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
