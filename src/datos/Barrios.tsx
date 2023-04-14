import {useState, useEffect} from 'react';
import DatosGeograficos from './components/DatosGeograficos';
import axios, {AxiosInstance} from 'axios';
import pako from 'pako';
import {api} from '../api';
import {Buffer} from 'buffer';
import {tiemposCache} from './utilidades/tiemposCache';

const info: string = 
`Mapa con informacion de los barrios populares del pais.
Fuente Registro Nacional de Barrios Populares (RENABAP).
https://www.argentina.gob.ar/desarrollosocial/renabap`;

const hoy: Date = new Date();

const msEnHora = 3600000;
const msEnMes = msEnHora * 24 * 30;

export default function BarriosPopulares({modo, cacheData, setCacheData}): JSX.Element {
  const [data, setData] = useState<any>();

  useEffect(() => {getData()}, []);

  function onEachFeature(feature, layer) {
    if (feature.properties) {
      layer.bindPopup(feature.properties.nombre_barrio);
    }
  }

  async function getData() {
    try {
      if (cacheData !== null && cacheData.barrios !== null && cacheData.barrios !== undefined) {
          const decompressedData = pako.ungzip(new Uint8Array(cacheData.barrios.datos), { to: 'string' });
          setData(JSON.parse(decompressedData));
          return;
      }

      else {
        const res: any = await api.get('/datos/barrios');
        const datosApi = Buffer.from(res.data.datos.geoData, 'hex');

        const decompressedData = pako.ungzip(datosApi, { to: 'string' });

        setData(JSON.parse(decompressedData));

        setCacheData(prevCache => ({
          ...prevCache,
          barrios: {
            datos: datosApi,
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
      nombre={"Barrios Populares"}
      center={[-34.5764557475325, -58.44779337734082]}
      geoData={data}
      info={info}
      onEachFeature={onEachFeature}
      pointToLayer={null}
      createdAt={''}
      />
    </div>
  )
}
 