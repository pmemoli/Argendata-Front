import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Informacion from '../../components/datos/Informacion';
import BotonEstado from '../../components/datos/BotonEstado';
import ShowcaseOptions from '../../components/datos/ShowcaseOptions';
import ShowcaseData from '../../components/datos/ShowcaseData';
import ShowcaseGraph from '../../components/datos/ShowcaseGraph';
import EstadoActualizacion from '../../components/datos/EstadoActualizacion';

interface DataAnalitica {
  fechas: string[],
  datosHistoricos: {
    [datos: string]: number[]
  },
  datosActuales: {
    [datos: string]: number,
  }
};

interface ParametrosAceptados {
  nombre: string,
  modo: 'carta' | 'pagina',
  datos: DataAnalitica,
  rangoInicial: Date[],
  unidad: string,
  unidades?: {[nombreDato: string]: string},
  manejoEstados: {
    estadosPosibles?: string[],
    setEstado?: React.Dispatch<React.SetStateAction<string>>,
    slider?: boolean,
    estado?: string,
  },
  round: number,
  textoInfo: string,
  path?: string,
  ultimaActualizacion?: string,
  bar?: boolean,
};

interface TiposDatos {
  cronologia: string,
  nombreDatos: string,
}

function getTipos(datos: DataAnalitica): TiposDatos[] {
  const tipos: TiposDatos[] = [];
  Object.keys(datos).map((tipoTiempo: string): void => {
    if (tipoTiempo !== 'fechas' && tipoTiempo !== '_id' && tipoTiempo !== 'updatedAt' && tipoTiempo !== 'createdAt' && tipoTiempo !== 'estado') {
      Object.keys(datos[tipoTiempo]).map((tipoDato: string): void => {
        tipos.push({'cronologia': tipoTiempo, 'nombreDatos': tipoDato});
      })
    };
  });

  return tipos;
}

export default function DatosAnaliticos({nombre, modo, datos, rangoInicial, unidad,
  manejoEstados, round, unidades, textoInfo, path, ultimaActualizacion,
  bar}: ParametrosAceptados): JSX.Element {

  const tipos: TiposDatos[] = getTipos(datos);

  const [indiceEstado, setIndiceEstado] = useState<number>(0);
  const [tipo, setTipo] = useState<string>(tipos[0].nombreDatos);  
  const [rangoHistorico, setRangoHistorico] = useState<Date[]>(rangoInicial);

  useEffect(() => {setTipo(tipos[0].nombreDatos)}, [datos])

  if (datos === undefined) return (
    <div className='sm:text-xl'>
      Cargando...
    </div>
  )
    
  else return (
    <div className={`${modo === 'pagina' ? 'sm:flex sm:justify-center' : ''}`}>
      <div className={`border-2 border-zinc-600	text-zinc-300 font-extralight sm:font-thin sm:text-zinc-100
      rounded-md mb-3 ml-2 mr-2 p-1 pl-2 z-[1] relative ${modo === 'pagina' ? 'sm:w-2/3' : ''}`}>

      <BotonEstado manejoEstados={manejoEstados} setIndiceEstado={setIndiceEstado} indiceEstado={indiceEstado}/>

      <Informacion texto={textoInfo} createdAt={ultimaActualizacion}/>

      <Link to={path ? `/${path}` : `/${nombre.toLowerCase()}`}>
        <h2 className="text-xl flex justify-center mt-1 mb-2 z-[1] sm:text-3xl sm:mb-3">{nombre}</h2>    
      </Link>

      <ShowcaseData setTipo={setTipo} datos={datos} unidades={unidades}
      unidad={unidad} round={round} tipo={tipo} tipos={tipos}/>

      <ShowcaseGraph modo={modo} rangoHistorico={rangoHistorico} datos={datos} nombre={nombre} rangoInicial={rangoInicial} tipo={tipo}
      bar={bar}/>

      <ShowcaseOptions modo={modo} datos={datos} rangoHistorico={rangoHistorico} setRangoHistorico={setRangoHistorico}/>

      <EstadoActualizacion datos={datos}/>
      </div>
    </div>
  )
}
