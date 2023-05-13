import {useState, useEffect} from 'react';
import DatosAnaliticos from './components/DatosAnaliticos';
import {getDataAnalitica} from './utilidades/getDataAnalitica';

const hoy: Date = new Date();
const fechaComienzoDatos: Date = new Date('2018/01/01');  

const info: string = 
`Variacion mensual y anual de IPC.
Fuente indec.

https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31`

export default function Inflacion({modo, cacheData, setCacheData}): JSX.Element {
  const [datosInflacion, setDatosInflacion] = useState<any>();
  const [ultimaActualizacion, setUltimaActualizacion] = useState<string>();
  const [estado, setEstado] = useState<string>('Nivel general');
  const [estadosPosibles, setEstadosPosibles] = useState<string[]>();

  useEffect(() => {getDataAnalitica('inflacion', cacheData, setCacheData, setDatosInflacion, setUltimaActualizacion, true, setEstadosPosibles)}, []);

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
      datos={datosInflacion[estado]}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad='%'
      mostrarValores={true}
      manejoEstados={{
        setEstado: setEstado,
        estadosPosibles: estadosPosibles,
        estado: 'Nivel general',
        slider: true,
      }}
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
