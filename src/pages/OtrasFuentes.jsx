import React from 'react'

export default function OtrasFuentes() {
  return (
    <div className="flex justify-center break-words p-3 relative">
      <div className="sm:text-lg">
        <h2 className='text-2xl mb-2 flex justify-center'>Otras Fuentes</h2>

        <p className='mb-4 flex justify-center sm:text-lg'>Hace click en la fuente para ir a la página</p>

        <ul className='flex flex-col gap-2 border p-3 rounded-md border-gray-500'>
            <li><a className='hover:text-stroke' href='https://www.indec.gob.ar/' target='_blank' rel='noopener'>Indec</a></li>
            <li><a className='hover:text-stroke'  href='https://datos.gob.ar/' target='_blank' rel='noopener'>Datos.gob.ar</a></li>
            <li><a className='hover:text-stroke' href='https://argentina.gob.ar/' target='_blank' rel='noopener'>Argentina.gob.ar</a></li>
            <li><a className='hover:text-stroke' href='https://cancilleria.gob.ar/es/cei/estadisticas' target='_blank' rel='noopener'>Cancilleria</a></li>
            <li><a className='hover:text-stroke' href='https://www.bcra.gob.ar/PublicacionesEstadisticas/series_estadisticas_txt.asp' target='_blank' rel='noopener'>Bcra estadísticas oficial</a></li>
            <li><a className='hover:text-stroke' href='https://estadisticasbcra.com/' target='_blank' rel='noopener'>Bcra estadísticas no oficial</a></li>
            <li><a className='hover:text-stroke' href='https://www.argentina.gob.ar/enre' target='_blank' rel='noopener'>Ente Nacional Regulador de Electricidad</a></li>
            <li><a className='hover:text-stroke' href='https://data.worldbank.org/country/argentina' target='_blank' rel='noopener'>World Bank</a></li>
            <li><a className='hover:text-stroke' href='https://www.imf.org/en/Data' target='_blank' rel='noopener'>Fondo Monetario Internacional</a></li>
            <li><a className='hover:text-stroke' href='https://www.dolarito.ar/' target='_blank' rel='noopener'>Dolarito</a></li>
        </ul>
      </div>
    </div>
  )
}
