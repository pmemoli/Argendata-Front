import {useState, useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import Footer from './layout/Footer'
import Header from './layout/header/Header'
import Home from './pages/Home'
import Donar from './pages/Donar'
import DatoAnalitico from './datos/DatoAnalitico'
import DatoGeografico from './datos/DatoGeografico'

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
      <Header/>
    
      <div className='flex-grow mt-3'>
        <Routes>
          <Route path='/' element={<Home cacheData={cacheData} setCacheData={setCacheData}/>}></Route>
          
          <Route path='/dolar' element={
            <DatoAnalitico key='dolar' modo='pagina' nombre='dolar' cacheData={cacheData} setCacheData={setCacheData}/>
          }></Route>
          
          <Route path='/inflacion' element={
            <DatoAnalitico key='inflacion' modo='pagina' nombre='inflacion' cacheData={cacheData} setCacheData={setCacheData}/>
          }></Route>

          <Route path='/basemonetaria' element={
            <DatoAnalitico key='basemonetaria' modo='pagina' nombre='basemonetaria' cacheData={cacheData} setCacheData={setCacheData}/>
          }></Route>

          <Route path='/crimen' element={
            <DatoAnalitico key='crimen' modo='pagina' nombre='crimen' cacheData={cacheData} setCacheData={setCacheData}/>
          }></Route>

          <Route path='/trabajo' element={
            <DatoAnalitico key='trabajo' modo='pagina' nombre='trabajo' cacheData={cacheData} setCacheData={setCacheData}/>
          }></Route>
          
          <Route path='/pobreza' element={
            <DatoAnalitico key='pobreza' modo='pagina' nombre='pobreza' cacheData={cacheData} setCacheData={setCacheData}/>
          }></Route>

          <Route path='/producto' element={
            <DatoAnalitico key='producto' modo='pagina' nombre='producto' cacheData={cacheData} setCacheData={setCacheData}/>
          }></Route>
          
          <Route path='/merval' element={
            <DatoAnalitico key='merval' modo='pagina' nombre='merval' cacheData={cacheData} setCacheData={setCacheData}/>
          }></Route>
          
          <Route path='/riesgo' element={
            <DatoAnalitico key='riesgo' modo='pagina' nombre='riesgo' cacheData={cacheData} setCacheData={setCacheData}/>
          }></Route>

          <Route path='/gasto' element={
            <DatoAnalitico key='gasto' modo='pagina' nombre='gasto' cacheData={cacheData} setCacheData={setCacheData}/>
          }></Route>

          <Route path='/ingresos' element={
            <DatoAnalitico key='ingresos' modo='pagina' nombre='ingresos' cacheData={cacheData} setCacheData={setCacheData}/>
          }></Route>

          <Route path='/distribucion' element={
            <DatoAnalitico key='distribucion' modo='pagina' nombre='distribucion' cacheData={cacheData} setCacheData={setCacheData}/>
          }></Route>

          <Route path='/barrios' element={
            <DatoGeografico key='barrios' nombre='barrios' modo='pagina' />
          }></Route>
          
          <Route path='/cortes' element={
            <DatoGeografico key='cortes' nombre='cortes' modo='pagina' />
          }></Route>

          <Route path='/donar' element={<Donar/>}></Route>
        </Routes>
      </div>

      <Footer/>
    </div>
  )
}

export default App
