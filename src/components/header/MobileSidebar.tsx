import {useEffect, useState} from 'react'
import Sidebar from "react-sidebar";

function setVisible(toggled: boolean): string {
  if (toggled) return 'visible';
  else return 'invisible';
}

export default function MobileSidebar({setHeaderToggle}) {
  const [toggled, setToggle] = useState<boolean>(false);
  const datosPosibles: string[] = [
    'Dolar', 'IPC', 'Clima', 'Emision', 'Cortes de Luz',
    'PBI', 'Pobreza', 'Crimen', 'Barrios populares', 'Incendios'
  ];

  useEffect(() => {setHeaderToggle(toggled)}, [toggled])

  return (
    <div className=''>
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
          
        <button onClick={() => {setToggle(true)}} className={`relative mt-11 ml-1 z-[2] ${setVisible(!toggled)}`}>
          <img className='w-8' src={require('../../assets/next.png')}></img>
        </button>
      </Sidebar>
    </div>
  )
}
