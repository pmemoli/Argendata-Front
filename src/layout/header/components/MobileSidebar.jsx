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
    <div>
      <Sidebar
        sidebar={
        <div className={`p-3 min-h-full bg-[#161b22] sm:text-2xl text-white sm:w-56 ${setVisible(toggled)}`}>
          <button className='mb-3 text-2xl sm:text-2xl sm:mb-6' onClick={() => setHeaderToggle(false)}>Cerrar</button>

          {Object.keys(datosDisponibles).map(key => (
            <SidebarItem nombre={key} datosDisponibles={datosDisponibles[key]} setHeaderToggle={setHeaderToggle}/>        
          ))}

          <div className='text-xl mt-4 sm:mt-6' onClick={() => {setHeaderToggle(false)}}>
            <Link to='/donar'>Contribuir / Donar</Link>
          </div>

          <div className='text-xl mt-2 sm:mt-2' onClick={() => {setHeaderToggle(false)}}>
            <Link to='/otrasfuentes'>Otras Fuentes</Link>
          </div>
        </div>
        }
        
        open={toggled}>
      </Sidebar>
    </div>
  )
}
