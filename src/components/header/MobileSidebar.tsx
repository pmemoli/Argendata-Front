import {useEffect, useState} from 'react'
import Sidebar from "react-sidebar";

function setVisible(toggled: boolean): string {
  if (toggled) return 'visible';
  else return 'invisible';
}

export default function MobileSidebar({setHeaderToggle}) {
  const [toggled, setToggle] = useState(false);
  const datosPosibles: string[] = [
    'Dolar', 'IPC', 'Clima', 'Emision', 'Cortes de Luz',
    'PBI', 'Pobreza', 'Crimen', 'Barrios populares', 'Incendios'
  ];

  useEffect(() => {setHeaderToggle(toggled)}, [toggled])

  return (
    <div>
      <Sidebar
        sidebar={
        <div className={`p-3 min-h-full bg-slate-800 w-full ${setVisible(toggled)}`}>
          <button className='mb-3 text-2xl' onClick={() => setToggle(false)}>Cerrar</button>

          <ul className='text-xl mr-5'>
            {datosPosibles.map((dato: string) => <li>{dato}</li>)}
          </ul>

          <div className='text-xl mt-2'>
            Sobre
          </div>
        </div>
        }
        
        open={toggled}>
          
        <button onClick={() => {setToggle(true)}} className='relative mt-11 ml-1'>
          <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px"><path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"/></svg>
        </button>
      </Sidebar>


    </div>
  )
}
