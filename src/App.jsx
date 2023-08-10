import {useState, useEffect} from 'react'
import {Route, Routes, useSearchParams} from 'react-router-dom'
import {datosDisponibles, pathesAnaliticos, pathesGeograficos} from './datos/fetch/getDatosDisponibles'
import Footer from './layout/Footer'
import Header from './layout/header/Header'
import Home from './pages/Home'
import Donar from './pages/Donar'
import DatoAnalitico from './datos/DatoAnalitico'
import DatoGeografico from './datos/DatoGeografico'
import Busqueda from './pages/busqueda/Busqueda'

// Jueves lleno datos offline. Tmb agrego el aviso de muchas fuentes y el limite de caracteres

// Viernes ver si es factible y si lo es empiezo el sistema de agregado de datos de datos.gob.ar

// ...

// Domingo terminar buscador y dejar todo bien lindo!

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

          <Route path='/busqueda/:busquedaInicial' element={<Busqueda/>}></Route>
        </Routes>
      </div>

      <Footer/>
    </div>
  )
}

export default App
