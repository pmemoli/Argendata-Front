import {MapContainer, TileLayer, GeoJSON} from 'react-leaflet';
import Informacion from '../../components/datos/Informacion';

export default function DatosGeograficos({modo, center, geoData, info, contribuidor}): JSX.Element {
  function onEachFeature(feature, layer) {
    if (feature.properties) {
      layer.bindPopup(feature.properties.nombre_barrio);
    }
  }

  if (geoData === undefined) return (
    <div className='sm:text-xl'>
      Cargando...
    </div>
  )

  return (
    <div className='sm:flex sm:justify-center'>
      <div className='border-2 rounded-md mb-3 ml-2 mr-2 p-1 pl-2 z-[1] relative h-[30rem] sm:w-1/2 sm:h-[33rem]'>
        <Informacion texto={info}/>

        <h1 className='flex justify-center text-2xl mb-2'>Barrios Populares</h1>

        <MapContainer center={center} zoom={10} scrollWheelZoom={true}>
          <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"/>
          <GeoJSON data={geoData} onEachFeature={onEachFeature}/>
        </MapContainer>
      </div>
    </div>
  )
}
