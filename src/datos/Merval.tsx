import {useEffect, useState} from 'react'
import DatosAnaliticos from './components/DatosAnaliticos';
import {api} from '../api';
import {tiemposCache} from './utilidades/tiemposCache';
import {getDataAnalitica} from './utilidades/getDataAnalitica';

interface datosMervalInterface {
  fechas: string[],
  datosHistoricos: {
    merval: number[],
  },
  datosActuales: {},
};

const hoy = new Date();
const fechaComienzoDatos = new Date('2023/4/1');

const info: string = 
`Indice Merval S&P en dolares CCL con su variacion diaria porcentual.
Fuente Ambito Financiero.
https://www.ambito.com/contenidos/merval.html
https://www.ambito.com/contenidos/dolar-cl.html`

export default function Merval({modo, cacheData, setCacheData}) {
  const [data, setData] = useState<datosMervalInterface>();
  const [ultimaActualizacion, setUltimaActualizacion] = useState<string>();

  useEffect(() => {getDataAnalitica('merval', cacheData, setCacheData, setData, setUltimaActualizacion)}, []);

  if (data === undefined) return (
    <div className='sm:text-xl'>
      Cargando...
    </div>
  )

  return (
    <div>
      <DatosAnaliticos 
      nombre='Merval'
      modo={modo}
      datos={data}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad=''
      unidades={{'merval': '$ USD', 'variacion': '%'}}
      mostrarValores={true}
      manejoEstados={{}}
      round={1}
      textoInfo={info}
      ultimaActualizacion={ultimaActualizacion}
      />
    </div>
  )
}
