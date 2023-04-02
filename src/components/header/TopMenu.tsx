import {Link} from "react-router-dom";

function setZ(toggled: boolean): string {
  if (toggled) return 'z-0';
  else return 'z-50';
}

interface datoItem {
  nombre: string,
  path: string,
}

const datosPosibles: datoItem[] = [
  {nombre: 'Dolar', path: 'dolar'}, {nombre: 'IPC', path: 'inflacion'}, {nombre: 'Emision', path: 'emision'},
  {nombre: 'Crimen', path: 'crimen'}, {nombre: 'Pobreza', path: 'pobreza'}, {nombre: 'Produccion', path: 'producto'},
  {nombre: 'Empleo', path: 'empleo'}
];

export default function TopMenu({toggled}) {
  return (
    <div className='text-md bg-slate-800 flex items-center ml-1'>
      <div id='slider' className={`w-full overflow-x-scroll whitespace-nowrap scroll-smooth no-scrollbar ${setZ(toggled)}`}>
        {datosPosibles.map(dato => (
          <Link to={'/' + dato.path}><span className="mr-3">{dato.nombre}</span></Link>
        ))}
       </div>
    </div>
  )
}
