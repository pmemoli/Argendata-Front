import {MapContainer, TileLayer, GeoJSON, Marker} from 'react-leaflet'
import Informacion from './components/comunicacion/Informacion'
import L from 'leaflet'

export default function DatoGeograficoGui({nombre, center, geoData, createdAt, textoInfo, onEachFeature}) {
  if (geoData === undefined) return (
    <div className='sm:text-xl'>
      Cargando...
    </div>
  )

  // Zoom en base a la comunidad (modular)
  let zoom = 10
  if (nombre === 'Comunidades Indigenas') zoom = 6

  return (
    <div className='sm:flex sm:justify-center'>
      <div className='border-2 border-zinc-600	text-zinc-300 font-light rounded-md mb-3 ml-2 mr-2 p-1 pl-2 relative h-[30rem] sm:w-1/2 sm:h-[33rem]'>
        <Informacion texto={textoInfo} createdAt={createdAt}/>

        <h1 className='flex justify-center text-2xl mb-2'>{nombre}</h1>

        <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>

          <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          <GeoJSON data={geoData} onEachFeature={onEachFeature} 
            pointToLayer={(feature, latlng) => {
              return new L.CircleMarker(latlng, {
                  radius: 5,  // sets the size of the dots
                  fillColor: "#3498db", // shade of blue
                  color: "#000",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.8
              })}}
          />

        </MapContainer>
      </div>
    </div>
  )
}
