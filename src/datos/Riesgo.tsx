import {useEffect, useState} from 'react'
import axios, {AxiosInstance} from 'axios';
import DatosAnaliticos from './components/DatosAnaliticos';
import {api} from '../api';
import { tiemposCache } from './utilidades/tiemposCache';

interface datosMervalInterface {
  fechas: string[],
  datosHistoricos: {
    riesgo: number[],
  },
  datosActuales: {},
};

const hoy = new Date();
const fechaComienzoDatos = new Date();
fechaComienzoDatos.setDate(fechaComienzoDatos.getDate() - 90);

const info: string = 
`Riesgo pais de la Argentina.
Fuente Ambito Financiero.
https://www.ambito.com/contenidos/riesgo-pais.html`

const msEnHora: number = 3600000;
const msEnDia: number = msEnHora * 24;
const deltaActualizacion: number = 0;  // hora

export default function Riesgo({modo, cacheData, setCacheData}) {
  const [data, setData] = useState<datosMervalInterface>();

  useEffect(() => {getDatos()}, []);

  async function getDatos() {
    try {
      if (cacheData !== null && cacheData.riesgo !== null && cacheData.riesgo !== undefined && 
        (-cacheData.riesgo.ultimaActualizacion.getTime() + hoy.getTime()) / msEnDia < 0 * tiemposCache.riesgo) {
          setData(cacheData.riesgo.datos);
          return;
      }

      else {
        const res: any = await api.get('/datos/riesgo');
        const datosApi: any = res.data.datos;
      
        delete datosApi['nombre'];
        delete datosApi['__v'];
  
        setData(datosApi);

        setCacheData(prevCache => ({
          ...prevCache,
          riesgo: {
            datos: datosApi,
            ultimaActualizacion: new Date(),
          }
        }));
      }
    }

    catch(e) {console.log(e);}
  }

  if (data === undefined) return (
    <div className='sm:text-xl'>
      Cargando...
    </div>
  )

  return (
    <div>
      <DatosAnaliticos 
      nombre='Riesgo Pais'
      modo={modo}
      datos={data}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad=''
      mostrarValores={true}
      manejoEstados={{}}
      round={1}
      textoInfo={info}
      path='riesgo'
      />
    </div>
  )
}
