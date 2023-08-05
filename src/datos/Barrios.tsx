import {useState, useEffect} from 'react';
import DatosGeograficos from './components/DatosGeograficos';
import { getGeoData } from './utilidades/getGeoData';

const info: string = 
`Mapa con informacion de los barrios populares del pais.
Fuente Registro Nacional de Barrios Populares (RENABAP).
https://www.argentina.gob.ar/desarrollosocial/renabap`;

export default function BarriosPopulares({modo, cacheData, setCacheData}): JSX.Element {
  const [data, setData] = useState<any>();
  const [ultimaActualizacion, setUltimaActualizacion] = useState<string>();

  useEffect(() => {getGeoData('barrios', setData, setCacheData, cacheData, setUltimaActualizacion)}, []);

  function onEachFeature(feature, layer) {
    if (feature.properties) {
      layer.bindPopup(feature.properties.nombre_barrio);
    }
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
      createdAt={ultimaActualizacion}
      />
    </div>
  )
}
