import React, {useState} from 'react'
import {Link} from 'react-router-dom';

export default function SidebarItem({nombre, datosDisponibles, setHeaderToggle}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='text-xl sm:text-2xl mb-2'>
      <div className='flex items-center mb-1'>
        <button onClick={toggleDropdown}>{nombre}</button>
        <img className='w-2 h-[0.3rem] mt-[0.1rem] sm:mt-0 ml-1 mr-2 sm:ml-2 sm:mr-0' src={require('../../../assets/dropdownIcon.png')} />
      </div>

      {isOpen && (
        <ul className='ml-2 text-xl'>
          {datosDisponibles.map(dato => (
            <li onClick={() => {setIsOpen(false); setHeaderToggle(false)}}>
              <Link to={`/${dato.path}`}>{dato.nombre}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
