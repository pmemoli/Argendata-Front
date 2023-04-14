import {useState, useEffect} from 'react';
import axios, {AxiosInstance} from 'axios';
import DatosAnaliticos from './components/DatosAnaliticos';
import {api} from '../api';
import { tiemposCache } from './utilidades/tiemposCache';

interface datosEmisionInterface {
  fechas: string[],
  datosHistoricos: {'base monetaria': number[]},
  datosActuales: {},
};

const hoy: Date = new Date();
const fechaComienzoDatos: Date = new Date('2015/01/01');

const info: string =
`Apertura pasivo base monetaria en miles de pesos.
Fuente datos.gob.ar.
https://www.datos.gob.ar/series/api/series/?ids=300.1_AP_PAS_BASRIA_0_M_21`

const msEnHora: number = 3600000;
const msEnMes: number = msEnHora * 24 * 30;

export default function Emision({modo, cacheData, setCacheData}): JSX.Element {
  const [datosEmision, setDatosEmision] = useState<datosEmisionInterface>();

  useEffect(() => {getDatosEmision()}, []);

  async function getDatosEmision() {
    try {
      if (cacheData !== null && cacheData.emision !== null && cacheData.emision !== undefined && 
        (-cacheData.emision.ultimaActualizacion.getTime() + hoy.getTime()) / msEnMes < tiemposCache.emision) {
          setDatosEmision(cacheData.emision.datos);
          return;
      }

      else {
        const res: any = await api.get('/datos/emision');
        const datosApi: any = res.data.datos;

        console.log(res);
        
        datosApi['datosHistoricos']['base monetaria'] = datosApi['datosHistoricos']['emision'];
        delete datosApi['datosHistoricos']['emision'];
  
        delete datosApi['nombre'];
        delete datosApi['__v'];
  
        setDatosEmision(datosApi);

        setCacheData(prevCache => ({
          ...prevCache,
          emision: {
            datos: datosApi,
            ultimaActualizacion: new Date(),
          }
        }));
      }
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
      unidad='$ miles'
      mostrarValores={true}
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
