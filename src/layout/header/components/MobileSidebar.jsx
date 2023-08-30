import { Link } from 'react-router-dom'
import Sidebar from "react-sidebar"
import SidebarItem from './SidebarItem'

function setVisible(toggled) {
  if (toggled) return 'visible'
  else return 'invisible'
}

export default function MobileSidebar({toggled, setHeaderToggle, datosDisponibles}) {
  const datosSpreadeados = []
  for (let key of Object.keys(datosDisponibles)) {
    for (let valor of datosDisponibles[key]) {
      datosSpreadeados.push(valor)
    }
  }

  return (
    <div className=''>
      <Sidebar
        sidebar={
        <div className={`p-3 min-h-full bg-[#161b22] text-white w-full ${setVisible(toggled)}`}>
          <button className='mb-3 text-2xl sm:text-2xl sm:mb-6' onClick={() => setHeaderToggle(false)}>Cerrar</button>

          {Object.keys(datosDisponibles).map(key => (
            <SidebarItem nombre={key} datosDisponibles={datosDisponibles[key]} setHeaderToggle={setHeaderToggle}/>        
          ))}

          <div className='text-2xl mt-4 sm:text-2xl sm:mt-6' onClick={() => {setHeaderToggle(false)}}>
            <Link to='/donar'>Donar</Link>
          </div>
        </div>
        }
        
        open={toggled}>
      </Sidebar>
    </div>
  )
}
