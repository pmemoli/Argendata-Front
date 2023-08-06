import {useState, useEffect} from "react"
import {getDatoGeografico} from "./fetch/getDatoGeografico"
import DatoGeograficoGui from "./gui/DatoGeograficoGui"

export default function DatoGeografico({nombre, modo}) {
  const [datos, setData] = useState('')
  const [ultimaActualizacion, setUltimaActualizacion] = useState()
  const [metadata, setMetadata] = useState({})

  useEffect(() => {
    getDatoGeografico(nombre, setData, setUltimaActualizacion, setMetadata)
  }, [])

  function onEachFeature(feature, layer) {
    if (feature.properties) {
      layer.bindPopup(feature.properties.nombre_barrio)
    }
  }
  
  function renderContent() {
    // No cargaron los datos
    if (Object.keys(datos).length === 0) return (
      <div className='sm:text-xl'>
        Cargando...
      </div>
    )

    else {
      return (
        <DatoGeograficoGui 
          modo={modo}
          nombre={metadata['nombre']}
          geoData={datos}
          center={metadata['center']}
          textoInfo={metadata['textoInfo']}
          createdAt={ultimaActualizacion}
          onEachFeature={onEachFeature}
        />
    )}
  }

  return (
      <div>
          {renderContent()}
      </div>
  )
}
