import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import Sidebar from "react-sidebar";

function setVisible(toggled: boolean): string {
  if (toggled) return 'visible';
  else return 'invisible';
}

interface datoItem {
  nombre: string,
  path: string,
}

const datosPosibles: datoItem[] = [
  {nombre: 'Dolar', path: 'dolar'}, {nombre: 'IPC', path: 'inflacion'}, {nombre: 'Emision', path: 'emision'},
  {nombre: 'Crimen', path: 'crimen'}, {nombre: 'Pobreza', path: 'pobreza'}, {nombre: 'Produccion', path: 'producto'},
  {nombre: 'Empleo', path: 'empleo'}, {nombre: 'Finanzas', path: 'finanzas'}, {nombre: 'Barrios Populares', path: 'barrios'}
];

export default function MobileSidebar({setHeaderToggle}) {
  const [toggled, setToggle] = useState<boolean>(false);
  useEffect(() => {setHeaderToggle(toggled)}, [toggled])

  return (
    <div className=''>
      <Sidebar
        sidebar={
        <div className={`p-3 min-h-full bg-slate-800 w-full ${setVisible(toggled)}`}>
          <button className='mb-3 text-2xl sm:text-2xl sm:mb-6' onClick={() => setToggle(false)}>Cerrar</button>

          <ul className='text-xl mr-5 sm:text-2xl'>
            {datosPosibles.map(dato => <li className='sm:mb-1' onClick={() => {setToggle(false)}}><Link to={'/' + dato.path}>{dato.nombre}</Link></li>)}
          </ul>

          <div className='text-xl mt-4 sm:text-2xl sm:mt-6' onClick={() => {setToggle(false)}}>
            <Link to='/contribucion'>Contribuir</Link>
          </div>
        </div>
        }
        
        open={toggled}>
          
        <button onClick={() => {setToggle(true)}} className={`relative mt-11 ml-1 z-[2] sm:mt-11 ${setVisible(!toggled)}`}>
          <img className='w-8 sm:w-10' src={require('../../assets/next.png')}></img>
        </button>
      </Sidebar>
    </div>
  )
}
