import {useState, useEffect} from 'react';
import DatosAnaliticos from './components/DatosAnaliticos';
import {getDataAnalitica} from './utilidades/getDataAnalitica';

interface datosEmisionInterface {
  fechas: string[],
  datosHistoricos: {'base monetaria': number[]},
  datosActuales: {},
};

const hoy: Date = new Date();
const fechaComienzoDatos: Date = new Date('2015/01/01');

const info: string =
`Apertura pasivo base monetaria en miles de pesos.
Fuente datos.gob.ar.
https://www.datos.gob.ar/series/api/series/?ids=300.1_AP_PAS_BASRIA_0_M_21`

export default function Emision({modo, cacheData, setCacheData}): JSX.Element {
  const [datosEmision, setDatosEmision] = useState<datosEmisionInterface>();
  const [ultimaActualizacion, setUltimaActualizacion] = useState<string>();

  useEffect(() => {getDataAnalitica('emision', cacheData, setCacheData, setDatosEmision, setUltimaActualizacion)}, []);

  function renderContent(): JSX.Element {
    if (datosEmision === undefined) return (
      <div className='sm:text-xl'>
        Cargando...
      </div>
    )
    else return (
    <div>
      <DatosAnaliticos 
      nombre='Emision'
      modo={modo}
      datos={datosEmision}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad='$ miles'
      mostrarValores={true}
      manejoEstados={{}}
      round={0}
      textoInfo={info}
      ultimaActualizacion={ultimaActualizacion}
      />
    </div>
    )
  }

  return (
  <div className='z-[1]'>
    {renderContent()}
  </div>
  )
};
