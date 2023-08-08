import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import Sidebar from "react-sidebar";

function setVisible(toggled) {
  if (toggled) return 'visible';
  else return 'invisible';
}

export default function MobileSidebar({setHeaderToggle, datosDisponibles}) {
  const [toggled, setToggle] = useState(false);
  useEffect(() => {setHeaderToggle(toggled)}, [toggled])

  const datosSpreadeados = []
  for (let key of Object.keys(datosDisponibles)) {
    for (let valor of datosDisponibles[key]) {
      datosSpreadeados.push(valor)
    }
  }

  console.log(datosSpreadeados)
  console.log(datosDisponibles)

  return (
    <div className=''>
      <Sidebar
        sidebar={
        <div className={`p-3 min-h-full bg-[#161b22] text-white w-full ${setVisible(toggled)}`}>
          <button className='mb-3 text-2xl sm:text-2xl sm:mb-6' onClick={() => setToggle(false)}>Cerrar</button>

          <ul className='text-xl mr-5 sm:text-2xl'>
            {datosSpreadeados.map(dato => <li className='sm:mb-1' onClick={() => {setToggle(false)}}><Link to={'/' + dato.path}>{dato.nombre}</Link></li>)}
          </ul>

          <div className='text-xl mt-4 sm:text-2xl sm:mt-6' onClick={() => {setToggle(false)}}>
            <Link to='/donar'>Donar</Link>
          </div>
        </div>
        }
        
        open={toggled}>
          
        <button onClick={() => {setToggle(true)}} className={`relative mt-5 ml-2 z-[2] sm:mt-13 sm:ml-4 ${setVisible(!toggled)}`}>
          <img className='w-6 sm:w-7' src={require('../../../assets/hamburger.png')}></img>
        </button>
      </Sidebar>
    </div>
  )
}
