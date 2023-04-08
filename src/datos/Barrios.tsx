import {useState, useEffect} from 'react';
import DatosGeograficos from './components/DatosGeograficos';
import axios, {AxiosInstance} from 'axios';
import pako from 'pako';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/datos/barrios'
})

const info: string = 
`Mapa con informacion de los barrios populares del pais.
Fuente Registro Nacional de Barrios Populares (RENABAP).
https://www.argentina.gob.ar/desarrollosocial/renabap`;

const hoy: Date = new Date();

const msEnHora = 3600000;
const msEnMes = msEnHora * 24 * 30;
const deltaActualizacion = 8;  // mes

export default function BarriosPopulares({modo, cacheData, setCacheData}): JSX.Element {
  const [data, setData] = useState<any>();

  useEffect(() => {getData()}, []);

  async function getData() {
    try {
      if (cacheData !== null && cacheData.barrios !== null && cacheData.barrios !== undefined && 
        (-cacheData.barrios.ultimaActualizacion.getTime() + hoy.getTime()) / msEnMes < deltaActualizacion) {
          const decompressedData = pako.ungzip(new Uint8Array(cacheData.barrios.datos), { to: 'string' });
          setData(JSON.parse(decompressedData));
          return;
      }

      else {
        const res: any = await api.get('');
        const datosApi = res.data.datosBarrios.geoData;

        const decompressedData = pako.ungzip(new Uint8Array(datosApi.data), { to: 'string' });

        setData(JSON.parse(decompressedData));

        setCacheData(prevCache => ({
          ...prevCache,
          barrios: {
            datos: datosApi.data,
            ultimaActualizacion: new Date(),
          }
        }));
      }
    }

    catch(e) {console.log(e);}
  }
  
  return (
    <div>
      <DatosGeograficos 
      modo={modo}
      center={[-34.5764557475325, -58.44779337734082]}
      geoData={data}
      info={info}
      contribuidor={{link: 'https://www.ign.gob.ar/AreaServicios/Argenmap/Introduccion', nombre: 'Instituto Geografico Nacional'}}
      />
    </div>
  )
}
 