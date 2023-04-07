import React from 'react'

interface TiposDatos {
  cronologia: string,
  nombreDatos: string,
}

export default function ShowcaseData({mostrarValores, setTipo, datos, unidades, unidad, round, tipo, tipos}) {
  function currentValue(val): number {
    let ultDato: number = datos[val.cronologia][val.nombreDatos][datos[val.cronologia][val.nombreDatos].length - 1];
    if (ultDato === 0 || ultDato === null) {
      ultDato = datos[val.cronologia][val.nombreDatos][datos[val.cronologia][val.nombreDatos].length - 2];
    }
  
    return ultDato;
  }

  if (datos === undefined) return <></>

  return (
    <div className='mb-3 overflow-x-scroll whitespace-nowrap scroll-smooth no-scrollbar'>
      <div className="flex justify-around">
        {tipos.map((val: TiposDatos): JSX.Element => {
          if (!mostrarValores) return <></>

          if (val.cronologia === 'datosHistoricos') {
            return (
              <button onClick={() => setTipo(val.nombreDatos)} className={`${val.nombreDatos === tipo ? 'bg-slate-700': ''} p-1 rounded-sm z-[1]`}>
                <h3 className='sm:text-xl'>
                  {val.nombreDatos.charAt(0).toUpperCase() + val.nombreDatos.slice(1)}
                  : {currentValue(val).toFixed(round)}{unidad}{unidades !== undefined ? unidades[val.nombreDatos]: ''}
                  </h3>
              </button>
            )
          }

          else {
            return (
              <h3 className='p-1 z-[1] sm:text-xl'>
              {val.nombreDatos.charAt(0).toUpperCase() + val.nombreDatos.slice(1)}: {datos[val.cronologia][val.nombreDatos].toFixed(round)}
              {unidad}{unidades !== undefined ? unidades[val.nombreDatos]: ''}</h3>                
            )
          }
        })}
      </div>
    </div>
  )
}
