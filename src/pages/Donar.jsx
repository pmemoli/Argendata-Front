export default function Donar() {
  return (
    <div className="flex justify-center break-words p-3 relative">
      <div className="sm:w-3/5 sm:text-xl">
        <p className="mb-9">
          ¡Si aprecias el trabajo podés contribuir para que el proyecto continúe! No hay planes para tener publicidad.
        </p>
      
        <div className="flex justify-center">

        <a href='https://cafecito.app/argendata' rel='noopener' target='_blank'>
          <img srcset='https://cdn.cafecito.app/imgs/buttons/button_5.png 1x, https://cdn.cafecito.app/imgs/buttons/button_5_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_5_3.75x.png 3.75x' src='https://cdn.cafecito.app/imgs/buttons/button_5.png' alt='Invitame un café en cafecito.app' />
        </a>
      </div>
        
      <h2 className="text-3xl mb-4 mt-9">To do:</h2>

      <ul className="list-disc ml-5">
        <li>Más datos de otras fuentes en el buscador</li>
        <li>Mapa con incendios actuales y/o riesgo de incendio</li>
        <li>Una categoría de datos ambientales</li>
        <li>Agregar datos historicos (pre 1990)</li>
        <li>Datos de planes sociales</li>
        <li>Datos de educación (pruebas PISA y especialmente las Aprender)</li>
      </ul>
      
      <p className="mt-8">
        Otra forma de contribuir además de donar, es compartir al mail debajo de la pagina (icono de carta) 
        mapas o fuentes online de estadísticas en formato geojson/csv/xlsx que se actualicen periódicamente <b>solas</b>. 
        ¡Especialmente de datos en la lista de To Do!
      </p>
      </div>
    </div>
  )
}
