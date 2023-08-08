import {Link} from 'react-router-dom'
import {useState} from 'react'
import MobileSidebar from './components/MobileSidebar'
import NavigationBar from './components/NavigationBar'

export default function Header() {
  const [toggled, setHeaderToggle] = useState(false)

  return (
    <div className='pb-3'>
        <div className='flex justify-center'>
          <MobileSidebar setHeaderToggle={setHeaderToggle}/>

          <Link to='/'>
            <h2 className='text-5xl mt-3 relative z-[1] font-raleway'>Argendata</h2>
          </Link>
        </div>

        <div className='border-b border-gray-500 pb-3 pt-4 relative'>
          <NavigationBar toggled={toggled}/>
        </div>

    </div>
  )
}

{/* <MobileSidebar setHeaderToggle={setHeaderToggle}/> */}
{/* <TopMenu toggled={toggled}/> */}
