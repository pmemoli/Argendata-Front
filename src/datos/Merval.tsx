import {useEffect, useState} from 'react'
import axios, {AxiosInstance} from 'axios';
import DatosAnaliticos from './components/DatosAnaliticos';
import {api} from '../api';
import { tiemposCache } from './utilidades/tiemposCache';

interface datosMervalInterface {
  fechas: string[],
  datosHistoricos: {
    merval: number[],
  },
  datosActuales: {},
};

const hoy = new Date();
const fechaComienzoDatos = new Date();
fechaComienzoDatos.setDate(fechaComienzoDatos.getDate() - 90);

const info: string = 
`Indice Merval S&P en dolares CCL con su variacion diaria porcentual.
Fuente Ambito Financiero.
https://www.ambito.com/contenidos/merval.html
https://www.ambito.com/contenidos/dolar-cl.html`

const msEnHora: number = 3600000;
const msEnDia: number = msEnHora * 24;
const deltaActualizacion: number = 0;  // hora

export default function Merval({modo, cacheData, setCacheData}) {
  const [data, setData] = useState<datosMervalInterface>();

  useEffect(() => {getDatos()}, []);

  async function getDatos() {
    try {
      if (cacheData !== null && cacheData.merval !== null && cacheData.merval !== undefined && 
        (-cacheData.merval.ultimaActualizacion.getTime() + hoy.getTime()) < tiemposCache.merval) {
          setData(cacheData.merval.datos);
          return;
      }

      else {
        const res: any = await api.get('/datos/merval');
        const datosApi: any = res.data.datos;
      
        console.log(datosApi);

        delete datosApi['nombre'];
        delete datosApi['__v'];
  
        setData(datosApi);

        setCacheData(prevCache => ({
          ...prevCache,
          merval: {
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
      nombre='Merval'
      modo={modo}
      datos={data}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad=''
      unidades={{'merval': '$ USD', 'variacion': '%'}}
      mostrarValores={true}
      manejoEstados={{}}
      round={1}
      textoInfo={info}
      />
    </div>
  )
}
