import {useState, useEffect} from 'react';
import DatosAnaliticos from './components/DatosAnaliticos';
import {getDataAnalitica} from './utilidades/getDataAnalitica';

interface datosInflacionInterface {
  fechas: string[],
  datosHistoricos: {
    mensual: number[],
    interanual: number[],
  },
  datosActuales: {},
};

const hoy: Date = new Date();
const fechaComienzoDatos: Date = new Date('2018/01/01');  

const info: string = 
`Variacion mensual y anual de IPC Nucleo.
Fuente datos.gob.ar.
https://www.datos.gob.ar/series/api/series/?ids=173.1_INUCLEOLEO_DIC-_0_10`

export default function Inflacion({modo, cacheData, setCacheData}): JSX.Element {
  const [datosInflacion, setDatosInflacion] = useState<datosInflacionInterface>();
  const [ultimaActualizacion, setUltimaActualizacion] = useState<string>();

  useEffect(() => {getDataAnalitica('inflacion', cacheData, setCacheData, setDatosInflacion, setUltimaActualizacion)}, []);

  function renderContent(): JSX.Element {
    if (datosInflacion === undefined) return (
      <div className='sm:text-xl'>
        Cargando...
      </div>
    )

    else return (
    <div>
      <DatosAnaliticos 
      nombre='Inflacion'
      modo={modo}
      datos={datosInflacion}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad='%'
      mostrarValores={true}
      manejoEstados={{}}
      round={1}
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
