import React from 'react'

export default function EstadoActualizacion({datos}): JSX.Element {
  function renderContent() {
    if (datos.estado === 'actualizando') {
      return <div>Actualizando...</div>
    }
    else {
        return <></>
    }
  }

  return (
    <div>
      {renderContent()}
    </div>
  )
}
