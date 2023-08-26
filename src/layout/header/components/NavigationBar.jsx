import React from 'react'
import {Link} from 'react-router-dom'
import DropdownData from './DropdownData'
import Instrucciones from '../modals/Instrucciones'
import Organizador from '../modals/organizador/Organizador'

function setZ(toggled) {
  if (toggled) return 'z-0'
  else return 'z-50'
}

// Sociedad: Pobreza, Crimen, 
export default function NavigationBar({toggled, datosDisponibles, setOrganizacionHome, organizacionHome}) {
  return (
    <div id='slider' className={
      `flex text-lg gap-5 ml-1 mr-2 sm:text-xl sm:justify-around sm:ml-0 sm:gap-0
      overflow-x-scroll whitespace-nowrap scroll-smooth no-scrollbar w-full
      ${setZ(toggled)}`
    }>
      <Organizador setOrganizacionHome={setOrganizacionHome} organizacionHome={organizacionHome}/>

      <Instrucciones/>

      {Object.keys(datosDisponibles).map(key => (
        <DropdownData nombre={key} datosDisponibles={datosDisponibles[key]}/>        
      ))}

      <Link to='/donar'>Donar</Link>
      
    </div>
  )
}