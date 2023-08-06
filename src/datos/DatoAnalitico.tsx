import {useState, useEffect} from 'react'
import {getDatoAnalitico} from './fetch/getDatoAnalitico'
import DatoAnaliticoGui from './gui/DatoAnaliticoGui'

function nDaysBefore(n) {
  const date = new Date()
  date.setDate(date.getDate() - n)
  return date
}

const hoy = new Date()

export default function DatoAnalitico({nombre, modo, cacheData, setCacheData}) {
  const [datos, setDatos] = useState({})
  const [ultimaActualizacion, setUltimaActualizacion] = useState('')
  const [estado, setEstado] = useState('')
  const [metadata, setMetadata] = useState({})

  useEffect(() => {
      getDatoAnalitico(nombre, cacheData,
      setCacheData, setDatos, setUltimaActualizacion, setMetadata, setEstado)
  }, [])

  function setManejoEstados() {
    if (Object.keys(datos).length === 1) {
      return {}
    }

    else {
      return {
        setEstado: setEstado,
        estadosPosibles: Object.keys(datos),
        estado: metadata['estadoManagement']['estadoDefault'],
        slider: metadata['estadoManagement']['slider'],
      }
    }
  }

  function setFechaComienzo() {
    return nDaysBefore(-metadata['comienzoDatos'])
  }

  function renderContent() {
    // No cargaron los datos
    if (Object.keys(datos).length === 0) return (
      <div className='sm:text-xl'>
        Cargando...
      </div>
    )

    // Cargaron los datos
    else {
      return (
        <DatoAnaliticoGui 
          nombre={metadata['nombre']}
          path={nombre}
          modo={modo}
          datos={datos[estado]}
          rangoInicial={[setFechaComienzo(), hoy]}
          unidad={metadata['prefijos']}
          unidades={metadata['sufijos']}
          manejoEstados={setManejoEstados()}
          round={metadata['round']}
          textoInfo={metadata['textoInfo']}
          ultimaActualizacion={ultimaActualizacion}
          bar={metadata['bar']}
        />
    )}
  }

  return (
      <div>
          {renderContent()}
      </div>
  )
}
