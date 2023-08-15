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

/*
Que queda: 
  - Mas datos
    (Deuda, Estadisticas BCRA, salarios por sector, composicion del trabajo, Datos de planes sociales)
  
  - Mapas como cartas

  - Retocar todo lo que haga falta
*/

// En la semana posterior mechar los datos que hagan falta.
// Para la semana que viene dejar todo bien con los datos, los mapas como cartas y el estilo cute.

const savedState = localStorage.getItem('cacheArgendata')
const savedHomeOrg = localStorage.getItem('homeOrg')

function App() {
  const [cacheData, setCacheData] = useState(JSON.parse(savedState))
  const [organizacionHome, setOrganizacionHome] = useState([
    {id: 'dolar', name: 'Dólar'}, {id: 'inflacion', name: 'Inflación'},
    {id: 'crimen', name: 'Crimen'}, {id: 'pobreza', name: 'Pobreza'},
    {id: 'producto', name: 'Producto'}, {id: 'trabajo', name: 'Trabajo'}, 
    {id: 'riesgo', name: 'Riesgo'}, {id: 'ingresos', name: 'Ingresos'}, 
    {id: 'merval', name: 'Merval'}, {id: 'gasto', name: 'Gasto'}
  ])

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

  useEffect(() => {
    const savedHomeParsed = JSON.parse(savedHomeOrg)
    if (savedHomeParsed !== null) {
      setOrganizacionHome(savedHomeParsed)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('homeOrg', JSON.stringify(organizacionHome))
  }, [organizacionHome])

  return (
    <div className='flex flex-col justify-between min-h-screen bg-[hsl(215,21%,11%)]
     text-gray-200 font-fira font-thin w-full'>
      <Header datosDisponibles={datosDisponibles} setOrganizacionHome={setOrganizacionHome} organizacionHome={organizacionHome}/>
    
      <div className='flex-grow mt-3'>
        <Routes>
          <Route path='/' element={<Home organizacionHome={organizacionHome} cacheData={cacheData} setCacheData={setCacheData}/>}></Route>
          
          {pathesAnaliticos.map(path => (
            <Route path={`/${path}`} element={
              <DatoAnalitico key={path} modo='pagina' nombre={path} cacheData={cacheData} setCacheData={setCacheData}/>}>
            </Route>
          ))}

          {pathesGeograficos.map(path => (
            <Route path={`/${path}`} element={
              <DatoGeografico key={path} nombre={path}/>
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
