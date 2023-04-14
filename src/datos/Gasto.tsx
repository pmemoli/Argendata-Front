import {useState, useEffect} from 'react';
import axios, {AxiosInstance} from 'axios';
import DatosAnaliticos from './components/DatosAnaliticos';
import {api} from '../api';
import { tiemposCache } from './utilidades/tiemposCache';

interface datosGastoInterface {
  fechas: string[],
  datosHistoricos: {'gasto': number[]},
  datosActuales: {},
};

const hoy: Date = new Date();
const fechaComienzoDatos: Date = new Date('2000/01/01');

const info: string =
`Gasto publico consolidado en % del PBI.
Fuente datos.gob.ar.
https://www.datos.gob.ar/dataset/sspm-gasto-publico-consolidado`

const msEnHora: number = 3600000;
const msEnMes: number = msEnHora * 24 * 30;
const deltaActualizacion: number = 1;  // mes

export default function Gasto({modo, cacheData, setCacheData}): JSX.Element {
  const [datosGasto, setDatosGasto] = useState<datosGastoInterface>();

  useEffect(() => {getDatosGasto()}, []);

  async function getDatosGasto() {
    try {
      if (cacheData !== null && cacheData.gasto !== null && cacheData.gasto !== undefined && 
        (-cacheData.gasto.ultimaActualizacion.getTime() + hoy.getTime()) / msEnMes < tiemposCache.gasto) {
          setDatosGasto(cacheData.gasto.datos);
          return;
      }

      else {
        const res: any = await api.get('/datos/gasto');
        const datosApi: any = res.data.datos;
  
        delete datosApi['nombre'];
        delete datosApi['__v'];
  
        setDatosGasto(datosApi);

        setCacheData(prevCache => ({
          ...prevCache,
          gasto: {
            datos: datosApi,
            ultimaActualizacion: new Date(),
          }
        }));
      }
    }

    catch(e) {console.log(e);}
  }

  function renderContent(): JSX.Element {
    if (datosGasto === undefined) return (
      <div className='sm:text-xl'>
        Cargando...
      </div>
    )
    else return (
    <div>
      <DatosAnaliticos 
      nombre='Gasto Publico'
      modo={modo}
      datos={datosGasto}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad='% del PBI'
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
