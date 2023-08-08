import {useState, useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import Footer from './layout/Footer'
import Header from './layout/header/Header'
import Home from './pages/Home'
import Donar from './pages/Donar'
import DatoAnalitico from './datos/DatoAnalitico'
import DatoGeografico from './datos/DatoGeografico'
import {datosDisponibles, pathesAnaliticos, pathesGeograficos} from './datos/fetch/getDatosDisponibles'

// Martes Arreglo los acentos y modulo la lectura de datos disponibles
// Miercoles empiezo el sistema de busqueda (argendata y datos fijos)
// Viernes termino el sist de busqueda (argendata y datos fijos)
// Sabado empiezo agregando datos de datos.gob.ar (primeras busquedas)
// Domingo terminar buscador!
// En la semana posterior agregar datos tranqui y el sabado compartirlo en reddit.

// Estaria bueno un sistema que parsee texto a worldbank

const savedState = localStorage.getItem('cacheArgendata')

const test = JSON.parse(savedState, (key, value) => {
  if (key === 'ultimaActualizacion') {
    return new Date(value)
  } else {
    return value
  }
})

function App() {
  const [cacheData, setCacheData] = useState(JSON.parse(savedState))
  
  useEffect(() => {
    if (cacheData !== null) {
      let cacheCopy = {...cacheData}
      if (cacheData.barrios !== undefined) delete cacheCopy['barrios']
      
      try {
        localStorage.setItem('cacheArgendata', JSON.stringify(cacheCopy))
      }

      catch(e) {console.log(e)}
    }
  }, [cacheData])

  return (
    <div className='flex flex-col justify-between min-h-screen bg-[hsl(215,21%,11%)] text-gray-200 font-fira font-thin'>
      <Header datosDisponibles={datosDisponibles}/>
    
      <div className='flex-grow mt-3'>
        <Routes>
          <Route path='/' element={<Home cacheData={cacheData} setCacheData={setCacheData}/>}></Route>
          
          {pathesAnaliticos.map(path => (
            <Route path={`/${path}`} element={
              <DatoAnalitico key={path} modo='pagina' nombre={path} cacheData={cacheData} setCacheData={setCacheData}/>}>
            </Route>
          ))}

          {pathesGeograficos.map(path => (
            <Route path={`/${path}`} element={
              <DatoGeografico key={path} nombre={path} modo='pagina' />
            }></Route>
          ))}

          <Route path='/donar' element={<Donar/>}></Route>
        </Routes>
      </div>

      <Footer/>
    </div>
  )
}

export default App
