import React from 'react'

export default function UltimaActualizacion({datos}) {
    var fechas = datos.fechas
    
    if (!Array.isArray(fechas)) {
        fechas = fechas[Object.keys(fechas)[0]]
    }

    const ultimaFecha = fechas[fechas.length - 1]

    if (ultimaFecha == '10') return (<></>)

    return (
        <div className='text-neutral-400 text-xs sm:text-sm sm:p-1'>
            Último dato: {ultimaFecha}
        </div>
    )
}
