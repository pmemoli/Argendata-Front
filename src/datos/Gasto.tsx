import {useState, useEffect} from 'react';
import DatosAnaliticos from './components/DatosAnaliticos';
import {api} from '../api';
import {tiemposCache} from './utilidades/tiemposCache';
import {getDataAnalitica} from './utilidades/getDataAnalitica';

interface datosGastoInterface {
  fechas: string[],
  datosHistoricos: {'gasto': number[]},
  datosActuales: {},
};

const hoy: Date = new Date();
const fechaComienzoDatos: Date = new Date('2000/01/01');

const info: string =
`Gasto publico consolidado en % del PBI.
Fuente datos.gob.ar.
https://www.datos.gob.ar/dataset/sspm-gasto-publico-consolidado`

export default function Gasto({modo, cacheData, setCacheData}): JSX.Element {
  const [datosGasto, setDatosGasto] = useState<datosGastoInterface>();
  const [ultimaActualizacion, setUltimaActualizacion] = useState<string>();

  useEffect(() => {getDataAnalitica('gasto', cacheData, setCacheData, setDatosGasto, setUltimaActualizacion)}, []);

  function renderContent(): JSX.Element {
    if (datosGasto === undefined) return (
      <div className='sm:text-xl'>
        Cargando...
      </div>
    )
    else return (
    <div>
      <DatosAnaliticos 
      nombre='Gasto Publico'
      modo={modo}
      datos={datosGasto}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad='% del PBI'
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
