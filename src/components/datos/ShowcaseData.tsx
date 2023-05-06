import React from 'react'

interface TiposDatos {
  cronologia: string,
  nombreDatos: string,
}

export default function ShowcaseData({mostrarValores, setTipo, datos, unidades, unidad, round, tipo, tipos}) {
  function currentValue(val): number {
    // Chequea que no este ya actualizado al dia en datosActuales
    for (let i = 0; i < tipos.length; i++) {
      if (tipos[i].nombreDatos === val.nombreDatos && tipos[i].cronologia === 'datosActuales') {
        return datos['datosActuales'][val.nombreDatos];
      }
    }
    
    let ultDato: number = datos[val.cronologia][val.nombreDatos][datos[val.cronologia][val.nombreDatos].length - 1];
    if (ultDato === 0 || ultDato === null) {
      ultDato = datos[val.cronologia][val.nombreDatos][datos[val.cronologia][val.nombreDatos].length - 2];
    }
  
    return ultDato;
  }

  function nombreDato(val: TiposDatos): string {
    return (val.nombreDatos.charAt(0).toUpperCase() + val.nombreDatos.slice(1)).replace('GDP', 'PBI')
  }

  function setUnidades(val: TiposDatos, numeroDato: number): string {
    const unidadDato: string = unidades !== undefined ? unidades[val.nombreDatos] : unidad
    const simboloPlata: string = unidadDato.includes('$') ? '$' : ''

    return `${simboloPlata}${numeroDato}${unidadDato.replace('$', '')}`
  }

  if (datos === undefined) return <></>

  function renderDatoActual(val: TiposDatos): JSX.Element {
    for (let i = 0; i < tipos.length; i++) {
      if (tipos[i].nombreDatos === val.nombreDatos && tipos[i].cronologia === 'datosHistoricos') {
        return <></>
      }
    }
    
    return (
      <h3 className='p-1 z-[1] sm:text-xl'>
        {nombreDato(val)}: {setUnidades(val, parseFloat(datos[val.cronologia][val.nombreDatos].toFixed(round)))}
      </h3>                
    )
  }

  function renderDatoHistorico(val: TiposDatos): JSX.Element {
    return (
      <button onClick={() => setTipo(val.nombreDatos)} className={`${val.nombreDatos === tipo ? 'bg-gray-800': ''} p-1 rounded-sm z-[1]`}>
        <h3 className='sm:text-xl'>
          {nombreDato(val)}: {setUnidades(val, parseFloat(currentValue(val).toFixed(round)))}
        </h3>
      </button>
    )
  }

  return (
    <div className='mb-3 overflow-x-scroll whitespace-nowrap scroll-smooth no-scrollbar'>
      <div className="flex justify-around">
        {tipos.map((val: TiposDatos): JSX.Element => {
          if (!mostrarValores) return <></>

          if (val.cronologia === 'datosHistoricos') {
            return renderDatoHistorico(val);
          }

          else {
            return renderDatoActual(val);
          }
        })}
      </div>
    </div>
  )
}
