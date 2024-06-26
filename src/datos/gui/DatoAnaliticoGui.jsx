import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Informacion from './components/comunicacion/Informacion'
import BotonEstado from './components/estado/BotonEstado'
import ShowcaseOptions from './components/opciones/ShowcaseOptions'
import ShowcaseData from './components/ShowcaseData'
import ShowcaseGraph from './components/grafico/ShowcaseGraph'
import Espera from './components/comunicacion/Espera'
import UltimaActualizacion from './components/UltimaActualizacion'

function getTipos(datos) {
  const tipos = []
  Object.keys(datos).map((tipoTiempo) => {
    if (tipoTiempo !== 'fechas' && tipoTiempo !== '_id' && tipoTiempo !== 'updatedAt' && tipoTiempo !== 'createdAt' && tipoTiempo !== 'estado') {
      Object.keys(datos[tipoTiempo]).map((tipoDato) => {
        tipos.push({'cronologia': tipoTiempo, 'nombreDatos': tipoDato})

      })
    }
  })

  return tipos
}

export default function DatoAnaliticoGui({nombre, modo, datos, rangoInicial, unidad, estado,
  manejoEstados, round, unidades, textoInfo, path, ultimaActualizacion, bar, datosCompletos,
  labels}) {

  const tipos = getTipos(datos)
  
  const [indiceEstado, setIndiceEstado] = useState(0)
  const [tipo, setTipo] = useState(tipos[0].nombreDatos)  
  const [rangoHistorico, setRangoHistorico] = useState(rangoInicial)
  const [comparar, setComparar] = useState([null, null])

  useEffect(() => {setTipo(tipos[0].nombreDatos)}, [datos])

  if (datos === undefined) return (
    <div className='sm:text-xl'>
      Cargando {nombre}...
    </div>
  )
    
  else return (
    <div className={`${modo === 'pagina' ? 'sm:flex sm:justify-center' : ''}`}>
      <div className={`border-2 border-zinc-600	text-zinc-300 font-extralight sm:font-thin sm:text-zinc-100
      rounded-md mb-3 ml-2 mr-2 p-1 pl-2 relative ${modo === 'pagina' ? 'sm:w-2/3' : ''}`}>

      <BotonEstado manejoEstados={manejoEstados} setIndiceEstado={setIndiceEstado} indiceEstado={indiceEstado}/>

      <Informacion texto={textoInfo} createdAt={ultimaActualizacion}/>

      <Link to={path ? `/${path}` : `/${nombre.toLowerCase()}`}>
        <h2 className={`text-xl ${modo === 'carta' ? 'hover:text-stroke': ''} flex justify-center mt-1 mb-2 z-[1] sm:text-3xl sm:mb-3`}>
          {nombre}
        </h2>    
      </Link>

      <ShowcaseData setTipo={setTipo} datos={datos} unidades={unidades}
      unidad={unidad} round={round} tipo={tipo} tipos={tipos}/>

      <ShowcaseGraph modo={modo} rangoHistorico={rangoHistorico} datos={datos} nombre={nombre} rangoInicial={rangoInicial} tipo={tipo}
      bar={bar} comparar={comparar} estado={estado} labels={labels}/>
      
      <UltimaActualizacion datos={datos}/>

      <ShowcaseOptions modo={modo} setComparar={setComparar} datos={datosCompletos} 
      rangoHistorico={rangoHistorico} setRangoHistorico={setRangoHistorico} bar={bar}/>

      <Espera datos={datos}/>
      </div>

    </div>
  )
}