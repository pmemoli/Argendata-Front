import {datosOffline} from './datosOffline'
import React from 'react'

function normalizeString(str) {
  const map = {
      'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
      'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u',
      'ã': 'a', 'õ': 'o', 'ñ': 'n',
      'ä': 'a', 'ë': 'e', 'ï': 'i', 'ö': 'o', 'ü': 'u'
  };

  return str.toLowerCase().replace(/[áàãäéèëíìïóòõöúùüñ]/g, match => map[match]);
}

function wordIsIn(word, str) {
  const regex = new RegExp(`\\b${normalizeString(word)}\\b`, 'i')
  return regex.test(normalizeString(str))
}

function truncate(text) {
  const smBreakpoint = 640
  const bigLength = 160
  const smallLength = 60

  if (window.innerWidth >= smBreakpoint && text.length > bigLength) {
      return text.substring(0, bigLength) + "...";
  }
  else if (window.innerWidth < smBreakpoint && text.length > smallLength) {
    return text.substring(0, smallLength) + "...";
  }

  return text;
}

export default function Resultados({busqueda}) {
  const datosBuscados = datosOffline.filter(dato => (
    wordIsIn(busqueda, dato.nombre) || 
    wordIsIn(busqueda, dato.fuente) || 
    wordIsIn(busqueda, dato.descripcion)
  ))

  if (datosBuscados.length == 0) {
    return (
      <div>
        No se encontraron datos.
      </div>
    )
  }

  return (
    <ul className='w-full flex flex-col gap-3'>
      {datosBuscados.map(dato => (
        <li>
          <a className='font-normal' href={dato.path} rel='noopener' target={dato.fuente === 'Argendata' ? '_self' : '_blank'}>
            {dato.fuente} - {dato.nombre}
          </a>
          <p>{truncate(dato.descripcion)}</p>
        </li>
      ))}
    </ul>
  )
}
