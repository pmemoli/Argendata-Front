export default function Donar() {
  return (
    <div className="flex justify-center break-words p-3 relative z-[1]">
      <div className="sm:w-3/5 sm:text-xl">
        <p className="mb-9">
          ¡Si aprecias el trabajo podés contribuir para que el proyecto continúe!
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
            <li>Más estadísticas del BCRA</li>
            <li>Salarios por sector</li>
            <li>Pobreza por edades</li>
            <li>Datos de deuda y su peso en el gasto público</li>
            <li>Datos de planes sociales</li>
            <li>Composición del trabajo</li>
            <li>Mapa con incendios actuales y/o riesgo de incendio</li>
            <li>Más mapas en general</li>
          </div>
        </ul>

        <h3 className="flex justify-center text-2xl mb-5 mt-5">Funcionalidad</h3>
        <ul className="list-disc ml-5">
          <div>
            <li>Agregar en la búsqueda resultados del worldbank</li>
            <li>Acelerar la carga de los datos</li>
          </div>
        </ul>

      </div>
    </div>
  )
}
