import {Link} from 'react-router-dom'
import {useState} from 'react'
import TopMenu from './components/TopMenu'
import MobileSidebar from './components/MobileSidebar'

export default function Header() {
  const [toggled, setHeaderToggle] = useState(false)

  return (
    <div className='pb-3'>
        <TopMenu toggled={toggled}/>

        <div className='flex justify-center border-b border-gray-500 pb-6' >
          <MobileSidebar setHeaderToggle={setHeaderToggle}/>
          
          <Link to='/'>
            <h2 className='text-5xl mt-3 relative z-[1] font-raleway'>Argendata</h2>
          </Link>
        </div>
    </div>
  )
}
