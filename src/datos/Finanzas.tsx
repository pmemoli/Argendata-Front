import {useEffect, useState} from 'react'
import axios, {AxiosInstance} from 'axios';
import DatosAnaliticos from './components/DatosAnaliticos';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001'
});

interface datosMervalInterface {
  fechas: string[],
  datosHistoricos: {
    merval: number[],
  },
  datosActuales: {
    'riesgo pais': number,
  },
};

const hoy = new Date();
const fechaComienzoDatos = new Date();
fechaComienzoDatos.setDate(fechaComienzoDatos.getDate() - 90);

const info: string = 
`Indice Merval S&P en dolares CCL y riesgo pais.
Fuente Ambito y estadisticasbcra.com.
https://estadisticasbcra.com/indice_merval`

const msEnHora: number = 3600000;
const msEnMes: number = msEnHora * 24 * 30;
const deltaActualizacion: number = 0.5;  // mes

export default function Merval({modo, cacheData, setCacheData}) {
  const [data, setData] = useState<datosMervalInterface>();

  useEffect(() => {getDatos()}, []);

  async function getDatos() {
    try {
      if (cacheData !== null && cacheData.finanzas !== null && cacheData.finanzas !== undefined && 
        (-cacheData.finanzas.ultimaActualizacion.getTime() + hoy.getTime()) / msEnMes < deltaActualizacion) {
          setData(cacheData.finanzas.datos);
          return;
      }

      else {
        const res: any = await api.get('/datos/merval');
        const datosApi: any = res.data.datosMerval;
      
        delete datosApi['nombre'];
        delete datosApi['__v'];
  
        setData(datosApi);

        setCacheData(prevCache => ({
          ...prevCache,
          finanzas: {
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
      nombre='Finanzas'
      modo={modo}
      datos={data}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad=''
      unidades={{'merval': '$ USD', 'riesgo pais': ''}}
      mostrarValores={true}
      manejoEstados={{}}
      round={1}
      textoInfo={info}
      />
    </div>
  )
}
