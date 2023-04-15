import {useState, useEffect} from 'react';
import DatosGeograficos from './components/DatosGeograficos';
import {getGeoData} from './utilidades/getGeoData';

const info: string = 
`Mapa con los cortes de luz en el AMBA.
Fuente ENRE.
https://www.argentina.gob.ar/enre/estado-de-la-red-electrica-en-el-area-metropolitana-de-buenos-aires`;

export default function BarriosPopulares({modo, cacheData, setCacheData}): JSX.Element {
  const [data, setData] = useState<any>();
  const [ultimaActualizacion, setUltimaActualizacion] = useState<string>();

  useEffect(() => {getGeoData('cortes', setData, setCacheData, cacheData, setUltimaActualizacion)}, []);

  function onEachFeature(feature, layer) {
    if (feature.properties) {
      layer.bindPopup(feature.properties.popupData);
    }
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
      createdAt={ultimaActualizacion}
      />
    </div>
  )
}
 