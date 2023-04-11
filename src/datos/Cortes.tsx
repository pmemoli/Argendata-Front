import {useState, useEffect} from 'react';
import DatosGeograficos from './components/DatosGeograficos';
import axios, {AxiosInstance} from 'axios';
import pako from 'pako';
import L from 'leaflet';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/datos/cortes'
})

const info: string = 
`Mapa con los cortes de luz en el AMBA.
Fuente ENRE.
https://www.argentina.gob.ar/enre/estado-de-la-red-electrica-en-el-area-metropolitana-de-buenos-aires`;

const hoy: Date = new Date();

const msEnHora = 3600000;
const deltaActualizacion = 0;  // hora

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
        (-cacheData.cortes.ultimaActualizacion.getTime() + hoy.getTime()) / msEnHora < deltaActualizacion) {

          const decompressedData = pako.ungzip(new Uint8Array(cacheData.cortes.datos), { to: 'string' });
          setData(JSON.parse(decompressedData));

          return;
      }

      else {
        const res: any = await api.get('');
        const datosApi = res.data.datosCortes.geoData;

        const decompressedData = pako.ungzip(new Uint8Array(datosApi.data), { to: 'string' });

        setData(JSON.parse(decompressedData));

        setCacheData(prevCache => ({
          ...prevCache,
          cortes: {
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
      nombre={"Cortes de Luz en el AMBA"}
      center={[-34.5764557475325, -58.44779337734082]}
      geoData={data}
      info={info}
      onEachFeature={onEachFeature}
      pointToLayer={pointToLayer}
      />
    </div>
  )
}
 