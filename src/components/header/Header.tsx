import {Link} from 'react-router-dom';
import {useState} from 'react';
import TopMenu from './TopMenu';
import MobileSidebar from './MobileSidebar';

export default function Header(): JSX.Element {
  const [toggled, setHeaderToggle] = useState<boolean>(false);

  return (
    <div className='border-b border-gray-500 pb-5'>
        <TopMenu toggled={toggled}/>

        <div className='flex justify-center'>
          <MobileSidebar setHeaderToggle={setHeaderToggle}/>
          
          <Link to='/'>
            <h2 className='text-5xl mt-3 relative z-[1] font-raleway'>Argendata</h2>
          </Link>
        </div>
    </div>
  )
}
