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
  {nombre: 'Bolsa', path: 'bolsa'}, {nombre: 'Empleo', path: 'empleo'}
];

export default function MobileSidebar({setHeaderToggle}) {
  const [toggled, setToggle] = useState<boolean>(false);
  useEffect(() => {setHeaderToggle(toggled)}, [toggled])

  return (
    <div className=''>
      <Sidebar
        sidebar={
        <div className={`p-3 min-h-full bg-slate-800 w-full ${setVisible(toggled)}`}>
          <button className='mb-3 text-2xl' onClick={() => setToggle(false)}>Cerrar</button>

          <ul className='text-xl mr-5'>
            {datosPosibles.map(dato => <li onClick={() => {setToggle(false)}}><Link to={'/' + dato.path}>{dato.nombre}</Link></li>)}
          </ul>

          <div className='text-xl mt-2'>
            Sobre
          </div>
        </div>
        }
        
        open={toggled}>
          
        <button onClick={() => {setToggle(true)}} className={`relative mt-11 ml-1 z-[2] ${setVisible(!toggled)}`}>
          <img className='w-8' src={require('../../assets/next.png')}></img>
        </button>
      </Sidebar>
    </div>
  )
}
