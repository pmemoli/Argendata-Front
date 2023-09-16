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
import OtrasFuentes from './pages/OtrasFuentes'

const savedHomeOrg = localStorage.getItem('homeOrg')

function App() {
  const [organizacionHome, setOrganizacionHome] = useState([
    {id: 'dolar', name: 'Dólar'}, {id: 'inflacion', name: 'Inflación'},
    {id: 'pobreza', name: 'Pobreza'}, {id: 'ingresos', name: 'Ingresos'},
    {id: 'basemonetaria', name: 'Base Monetaria'}, {id: 'reservas', name: 'Reservas del BCRA'},  
    {id: 'deuda', name: 'Deuda'}, {id: 'producto', name: 'Producto'},
    {id: 'merval', name: 'Merval'}, {id: 'riesgo', name: 'Riesgo'},  
  ])

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
     text-gray-200 font-fira font-thin w-full relative'>
      <Header datosDisponibles={datosDisponibles} setOrganizacionHome={setOrganizacionHome} organizacionHome={organizacionHome}/>
    
      <div className='flex-grow mt-3'>
        <Routes>
          <Route path='/' element={<Home organizacionHome={organizacionHome}/>}></Route>
          
          {pathesAnaliticos.map(path => (
            <Route path={`/${path}`} element={
              <DatoAnalitico key={path} modo='pagina' nombre={path}/>}>
            </Route>
          ))}

          {pathesGeograficos.map(path => (
            <Route path={`/${path}`} element={
              <DatoGeografico key={path} nombre={path}/>
            }></Route>
          ))}

          <Route path='/donar' element={<Donar/>}></Route>

          <Route path='/otrasfuentes' element={<OtrasFuentes/>}></Route>

          <Route path='/busqueda/:busquedaInicial' element={<Busqueda/>}></Route>
        </Routes>
      </div>

      <Footer/>
    </div>
  )
}

export default App
