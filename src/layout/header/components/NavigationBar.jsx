import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import DropdownData from './DropdownData'
import Instrucciones from '../modals/Instrucciones'
import Organizador from '../modals/organizador/Organizador'
import ScrollButton from './ScrollButton'

function setZ(toggled) {
  if (toggled) return 'z-0'
  else return 'z-50'
}

// Sociedad: Pobreza, Crimen, 
export default function NavigationBar({toggled, datosDisponibles, setOrganizacionHome, organizacionHome}) {
  return (
    <div id='slider' className={
      `flex text-lg gap-5 sm:gap-9 pl-2 pr-4 sm:text-xl xl:justify-around lg:ml-0 xl:gap-0
      overflow-x-scroll whitespace-nowrap scroll-smooth no-scrollbar w-full
      xl:ml-0
      ${setZ(toggled)}`
    }>
      <ScrollButton type='left'/>

      <Organizador setOrganizacionHome={setOrganizacionHome} organizacionHome={organizacionHome}/>

      <Instrucciones/>

      {Object.keys(datosDisponibles).map(key => (
        <DropdownData nombre={key} datosDisponibles={datosDisponibles[key]}/>        
      ))}

      <Link to='/donar'><span className='hover:text-stroke'>Donar</span></Link>
      
      <ScrollButton type='right'/>
    </div>
  )
}
