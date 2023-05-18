import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import Sidebar from "react-sidebar";
import { datosPosibles } from './datosPosibles';

function setVisible(toggled: boolean): string {
  if (toggled) return 'visible';
  else return 'invisible';
}

export default function MobileSidebar({setHeaderToggle}) {
  const [toggled, setToggle] = useState<boolean>(false);
  useEffect(() => {setHeaderToggle(toggled)}, [toggled])

  return (
    <div className=''>
      <Sidebar
        sidebar={
        <div className={`p-3 min-h-full bg-[#161b22] text-white w-full ${setVisible(toggled)}`}>
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
          
        <button onClick={() => {setToggle(true)}} className={`relative mt-12 ml-2 z-[2] sm:mt-13 sm:ml-4 ${setVisible(!toggled)}`}>
          <img className='w-6 sm:w-7' src={require('../../assets/hamburger (1).png')}></img>
        </button>
      </Sidebar>
    </div>
  )
}
