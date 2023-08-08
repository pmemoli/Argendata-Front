import React from 'react'
import {Link} from 'react-router-dom'
import DropdownData from './DropdownData'
import Instrucciones from './Instrucciones'

function setZ(toggled) {
  if (toggled) return 'z-0'
  else return 'z-50'
}

const options = {
  'Dolar y Finanzas': [
    {nombre: 'Dolar', path: 'dolar'},
    {nombre: 'Merval', path: 'merval'},
    {nombre: 'Riesgo Pais', path: 'riesgo'},
  ],

  'Macro': [
    {nombre: 'PBI', path: 'producto'},
    {nombre: 'Inflacion', path: 'inflacion'},
    {nombre: 'Trabajo', path: 'trabajo'},
    {nombre: 'Ingresos', path: 'ingresos'},
    {nombre: 'Distribucion Ingresos', path:'distribucion'},
    {nombre: 'Gasto Publico', path: 'gasto'},
  ],

  'Sociedad': [
    {nombre: 'Pobreza', path: 'pobreza'},
    {nombre: 'Crimen', path: 'crimen'},
  ],

  'BCRA': [
    {nombre: 'Base Monetaria', path: 'basemonetaria'},
  ],

  'Mapas': [
    {nombre: 'Cortes de Luz AMBA', path: 'cortes'},
    {nombre: 'Barrios Populares', path: 'barrios'}
  ]
}

// Sociedad: Pobreza, Crimen, 
export default function NavigationBar({toggled}) {
  return (
    <div id='slider' className={
      `flex text-lg gap-4 ml-1 sm:text-xl sm:justify-around sm:ml-0 sm:gap-0
      overflow-x-scroll whitespace-nowrap scroll-smooth no-scrollbar
      ${setZ(toggled)}`
    }>

      <Instrucciones/>
      <DropdownData nombre='Dolar y Finanzas' options={options['Dolar y Finanzas']}/>
      <DropdownData nombre='Macro' options={options['Macro']}/>
      <DropdownData nombre='Sociedad' options={options['Sociedad']}/>
      <DropdownData nombre='BCRA' options={options['BCRA']}/>
      <DropdownData nombre='Mapas' options={options['Mapas']}/>
      <Link to='/donar'>Donar</Link>
      
    </div>
  )
}


// Dolar y finanzas: Dolar, merval, riesgo pais
// Macro: Producto, Inflacion, Trabajo, Ingresos, Gasto Publico
// Mapas: Cortes de Luz, Barrios populares