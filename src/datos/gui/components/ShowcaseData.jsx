export default function ShowcaseData({setTipo, datos, unidades, unidad, round, tipo, tipos}) {
  function currentValue(val) {
    // Chequea que no este ya actualizado al dia en datosActuales
    for (let i = 0; i < tipos.length; i++) {
      if (tipos[i].nombreDatos === val.nombreDatos && tipos[i].cronologia === 'datosActuales') {
        return datos['datosActuales'][val.nombreDatos];
      }
    }
    
    let ultDato = datos[val.cronologia][val.nombreDatos][datos[val.cronologia][val.nombreDatos].length - 1];
    if (ultDato === 0 || ultDato === null) {
      ultDato = datos[val.cronologia][val.nombreDatos][datos[val.cronologia][val.nombreDatos].length - 2];
    }
  
    return ultDato;
  }

  function nombreDato(val) {
    return (val.nombreDatos.charAt(0).toUpperCase() + val.nombreDatos.slice(1)).replace('GDP', 'PBI')
  }

  function setUnidades(val, numeroDato) {
    return `${unidad[val.nombreDatos]}${numeroDato}${unidades[val.nombreDatos]}`
  }

  if (datos === undefined) return <></>

  function renderDatoActual(val) {
    for (let i = 0; i < tipos.length; i++) {
      if (tipos[i].nombreDatos === val.nombreDatos && tipos[i].cronologia === 'datosHistoricos') {
        return <></>
      }
    }
    
    return (
      <h3 className='p-1 sm:text-xl'>
        {nombreDato(val)}: {setUnidades(val, parseFloat(datos[val.cronologia][val.nombreDatos].toFixed(round)))}
      </h3>                
    )
  }

  function renderDatoHistorico(val) {
    return (
      <button onClick={() => setTipo(val.nombreDatos)} className={`${val.nombreDatos === tipo ? 'bg-gray-800': ''} p-1 rounded-sm`}>
        <h3 className='sm:text-xl'>
          {nombreDato(val)}: {setUnidades(val, parseFloat(currentValue(val).toFixed(round)))}
        </h3>
      </button>
    )
  }

  return (
    <div className='mb-3 overflow-x-scroll whitespace-nowrap scroll-smooth no-scrollbar'>
      <div className="flex justify-around">
        {tipos.map((val) => {
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
