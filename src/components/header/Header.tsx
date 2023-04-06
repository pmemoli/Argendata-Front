import {Link} from 'react-router-dom';
import {useState} from 'react';
import TopMenu from './TopMenu';
import MobileSidebar from './MobileSidebar';

export default function Header(): JSX.Element {
  const [toggled, setHeaderToggle] = useState<boolean>(false);

  return (
    <div className=''>
        <TopMenu toggled={toggled}/>

        <div className='flex justify-center'>
            <MobileSidebar setHeaderToggle={setHeaderToggle}/>
            
            <Link to='/'>
              <h2 className='text-5xl mt-3 relative z-[1] sm:text-5xl'>Argendata</h2>
            </Link>
        </div>
    </div>
  )
}
