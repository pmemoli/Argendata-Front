import {useState, useEffect} from 'react';
import DatosGeograficos from './components/DatosGeograficos';
import axios, {AxiosInstance} from 'axios';
import pako from 'pako';
import L from 'leaflet';
import {api} from '../api';
import {Buffer} from 'buffer';
import {tiemposCache} from './utilidades/tiemposCache';

const info: string = 
`Mapa con los cortes de luz en el AMBA.
Fuente ENRE.
https://www.argentina.gob.ar/enre/estado-de-la-red-electrica-en-el-area-metropolitana-de-buenos-aires`;

const hoy: Date = new Date();

export default function BarriosPopulares({modo, cacheData, setCacheData}): JSX.Element {
  const [data, setData] = useState<any>();

  useEffect(() => {getData()}, []);

  function onEachFeature(feature, layer) {
    if (feature.properties) {
      layer.bindPopup(feature.properties.popupData);
    }
  }

  function pointToLayer(feature, latlng) {
    return L.marker(latlng);
  }

  async function getData() {
    try {
      if (cacheData !== null && cacheData.cortes !== null && cacheData.cortes !== undefined && 
        (-cacheData.cortes.ultimaActualizacion.getTime() + hoy.getTime()) < tiemposCache.cortes) {

          const decompressedData = pako.ungzip(cacheData.cortes.datos.data, { to: 'string' });
          setData(JSON.parse(decompressedData));

          return;
      }

      else {
        const res: any = await api.get('/datos/cortes');

        const datosApi = Buffer.from(res.data.datos.geoData, 'hex');

        const decompressedData = pako.ungzip(datosApi, { to: 'string' });

        setData(JSON.parse(decompressedData));

        setCacheData(prevCache => ({
          ...prevCache,
          cortes: {
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
      nombre={"Cortes de Luz en el AMBA"}
      center={[-34.5764557475325, -58.44779337734082]}
      geoData={data}
      info={info}
      onEachFeature={onEachFeature}
      pointToLayer={pointToLayer}
      createdAt={''}
      />
    </div>
  )
}
 