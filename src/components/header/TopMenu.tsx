import {Link} from "react-router-dom";
import {datosPosibles} from "./datosPosibles";

function setZ(toggled: boolean): string {
  if (toggled) return 'z-0';
  else return 'z-50';
}

export default function TopMenu({toggled}) {
  return (
    <div className='text-md flex items-center ml-1 sm:text-lg sm:ml-3 text-white font-thin'>
      <div id='slider' className={`w-full overflow-x-scroll whitespace-nowrap scroll-smooth no-scrollbar ${setZ(toggled)}`}>
        {datosPosibles.map(dato => (
          <Link to={'/' + dato.path}><span className="mr-3 sm:mr-4">{dato.nombre}</span></Link>
        ))}
       </div>
    </div>
  )
}

/*
      <div>Como usar</div>
        <div>Organizar inicio</div>
        <div>Comparar estadisticas</div>
        <div>Otras fuentes</div>
        <div>Contacto y sugerencias</div>
        <div>Contribuir</div>
        <div>Planes futuros</div>
        <div>Calculadora inflacion anual</div>
        <div>Resultados electorales</div>

*/