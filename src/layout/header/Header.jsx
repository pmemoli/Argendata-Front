import {Link} from 'react-router-dom'
import {useState} from 'react'
import MobileSidebar from './components/MobileSidebar'
import NavigationBar from './components/NavigationBar'
import Buscador from './modals/Buscador'

function setVisible(toggled) {
  if (toggled) return 'visible';
  else return 'invisible';
}

export default function Header({datosDisponibles, setOrganizacionHome, organizacionHome}) {
  const [toggled, setHeaderToggle] = useState(false)

  return (
    <div className='w-full'>
        <MobileSidebar toggled={toggled} setHeaderToggle={setHeaderToggle} datosDisponibles={datosDisponibles}/>

        <div className='flex items-center justify-between'>
          <button onClick={() => {setHeaderToggle(true)}} className={`relative mt-5 ml-2 z-[2] sm:mt-13 sm:ml-4 ${setVisible(!toggled)}`}>
            <img className='w-6 sm:w-7' src={require('../../assets/hamburger.png')}></img>
          </button>

          <Link to='/'>
            <h2 className='text-5xl mt-3 relative z-[1] font-raleway'>Argendata</h2>
          </Link>

          <Buscador/>
        </div>

        <div className='border-b border-gray-500 pb-3 pt-4 relative'>
          <NavigationBar toggled={toggled} datosDisponibles={datosDisponibles}
          setOrganizacionHome={setOrganizacionHome} organizacionHome={organizacionHome}/>
        </div>
    </div>
  )
}

{/* <MobileSidebar setHeaderToggle={setHeaderToggle}/> */}
{/* <TopMenu toggled={toggled}/> */}
