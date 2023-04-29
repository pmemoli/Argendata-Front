export default function Contribucion() {
  return (
    <div className="flex justify-center break-words p-3 relative z-[1]">
      <div className="sm:w-3/5 sm:text-xl">
        <p>
        ¿Te gusta la página y querés contribuir a su desarrollo? Todavía queda mucho por hacer.
        Si aprecias el trabajo, podés aportar con lo que te parezca razonable:
        <br/><br/>
        <a className="z-[1] text-xl" href="https://ayudar.ar/argendata" target="_blank" rel="noreferrer">¡Aportá acá!</a>
        <br/><br/>

        </p>
        <h3 className="flex justify-center text-2xl mb-6">Planes inmediatos</h3>
        <ul className="list-disc ml-5">
          <li>Ingresos en distintas monedas y como se distribuyen</li>
          <li>Mapa con incendios actuales y/o riesgo de incendio</li>
          <li>Pobreza infantil y mapa con pobreza por provincia</li>
          <li>Inflación total, no solo variación de IPC</li>
          <li>Datos de deuda y su peso en el gasto público</li>
          <li>Datos de planes sociales</li>
        </ul>
        <h3 className="flex justify-center text-2xl mb-6 mt-6">Ambiciones a largo plazo</h3>
        <p className="mb-10">
          El estado y los medios de comunicacion ofrecen una cantidad inmensa de datos, pero no es siempre sencillo conseguirlos.
          La mejor página hasta el momento -datos.gob.ar- sigue siendo muy limitada.
          Un objetivo a largo plazo es que Argendata tenga un buscador que permita descargar datos en .csv o .json
          de casi todas las fuentes que estén. De esa forma, cualquier persona
          que quiera ver las estadísticas del país pueda hacerlo sin perder tiempo explorando una infinidad de fuentes.
        </p>
      </div>
    </div>
  )
}
