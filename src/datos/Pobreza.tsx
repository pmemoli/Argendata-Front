import {useState, useEffect} from 'react';
import DatosAnaliticos from './components/DatosAnaliticos';
import {api} from '../api';
import {tiemposCache} from './utilidades/tiemposCache';
import {getDataAnalitica} from './utilidades/getDataAnalitica';

interface datosPobrezaInterface {
  fechas: string[],
  datosHistoricos: {
    pobreza: number[],
    indigencia: number[],
  },
  datosActuales: {},
};
                          
const hoy: Date = new Date();
const fechaComienzoDatos: Date = new Date('2000/01/01');  

const info: string = 
`Porcentaje de la poblacion bajo la linea de pobreza e indigencia.
Fuente Indec.
https://www.indec.gob.ar/indec/web/Nivel4-Tema-4-46-152`

export default function Pobreza({modo, cacheData, setCacheData}): JSX.Element {  
  const [datosPobreza, setDatosPobreza] = useState<datosPobrezaInterface>();
  const [ultimaActualizacion, setUltimaActualizacion] = useState<string>();

  useEffect(() => {getDataAnalitica('pobreza', cacheData, setCacheData, setDatosPobreza, setUltimaActualizacion)}, []);

  function renderContent(): JSX.Element {
    if (datosPobreza === undefined) return (
      <div className='sm:text-xl'>
        Cargando...
      </div>
    )
   
    else return (
    <div>
      <DatosAnaliticos 
      nombre='Pobreza'
      modo={modo}
      datos={datosPobreza}
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
}
