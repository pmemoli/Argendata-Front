export default function Donar() {
  return (
    <div className="flex justify-center break-words p-3 relative">
      <div className="sm:w-3/5 sm:text-xl">
        <p className="mb-9">
          ¡Si aprecias el trabajo podés contribuir para que el proyecto continúe! No hay plan de tener publicidades.
        </p>
      
        <div className="flex justify-center">

        <a href='https://cafecito.app/argendata' rel='noopener' target='_blank'>
          <img srcset='https://cdn.cafecito.app/imgs/buttons/button_5.png 1x, https://cdn.cafecito.app/imgs/buttons/button_5_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_5_3.75x.png 3.75x' src='https://cdn.cafecito.app/imgs/buttons/button_5.png' alt='Invitame un café en cafecito.app' />
        </a>
      </div>
        
      <h2 className="text-3xl mb-4 mt-9">To do:</h2>

      <h3 className="flex justify-center text-2xl mb-5">Datos</h3>

      <ul className="list-disc ml-5">
        <div>
          <li>Más datos de otras fuentes en el buscador</li>
          <li>Mapa con incendios actuales y/o riesgo de incendio</li>
          <li>Una categoría de datos ambientales</li>
          <li>Agregar datos historicos (pre 1990)</li>
          <li>Datos de planes sociales</li>
          <li>Datos de educación</li>
        </div>
      </ul>

      <h3 className="flex justify-center text-2xl mb-5 mt-5">Funcionalidad</h3>

      <ul className="list-disc ml-5">
        <div>
          <li>Agregar la posibilidad de comparar datos en un mismo grafico</li>
          <li>Acelerar la carga de los datos</li>
        </div>
      </ul>

      </div>
    </div>
  )
}
