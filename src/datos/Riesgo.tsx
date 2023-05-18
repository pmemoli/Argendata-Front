import {useEffect, useState} from 'react'
import DatosAnaliticos from './components/DatosAnaliticos';
import {getDataAnalitica} from './utilidades/getDataAnalitica';

interface datosMervalInterface {
  fechas: string[],
  datosHistoricos: {
    riesgo: number[],
  },
  datosActuales: {},
};

const hoy = new Date();
const fechaComienzoDatos = new Date('2023/4/1');

const info: string = 
`Riesgo pais de la Argentina.
Fuente Ambito Financiero.
https://www.ambito.com/contenidos/riesgo-pais.html`

export default function Riesgo({modo, cacheData, setCacheData}) {
  const [data, setData] = useState<datosMervalInterface>();
  const [ultimaActualizacion, setUltimaActualizacion] = useState<string>();

  useEffect(() => {getDataAnalitica('riesgo', cacheData, setCacheData, setData, setUltimaActualizacion)}, []);

  if (data === undefined) return (
    <div className='sm:text-xl'>
      Cargando...
    </div>
  )

  return (
    <div>
      <DatosAnaliticos 
      nombre='Riesgo Pais'
      modo={modo}
      datos={data}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad=''
      mostrarValores={true}
      manejoEstados={{}}
      round={1}
      textoInfo={info}
      path='riesgo'
      ultimaActualizacion={ultimaActualizacion}
      />

    </div>
  )
}
