import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import Informacion from './Informacion';

export default function DatosGeograficos({modo, center, geoData, info, contribuidor}): JSX.Element {
  if (geoData === undefined) return (
    <div className='sm:text-xl'>
      Cargando...
    </div>
  )

  return (
    <div className='sm:flex sm:justify-center'>
      <div className='border-2 rounded-md mb-3 ml-2 mr-2 p-1 pl-2 z-[1] relative h-[30rem] sm:w-2/3 sm:h-[33rem]'>
        <Informacion texto={info}/>

        <h1 className='flex justify-center text-2xl mb-2'>Barrios Populares</h1>

        <MapContainer center={center} zoom={9} scrollWheelZoom={true}>
          <TileLayer
              attribution={"Contribuidores: "
              + `<a href=\"${contribuidor.link}"  target=\"_blank\">`
              + `${contribuidor.nombre}</a>, `
              + "<a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">"
              + "OpenStreetMap</a>"}
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <GeoJSON data={geoData}/>
        </MapContainer>
      </div>
    </div>
  )
}
