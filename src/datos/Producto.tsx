import {useState, useEffect} from 'react';
import DatosAnaliticos from './components/DatosAnaliticos';
import {getDataAnalitica} from './utilidades/getDataAnalitica';

interface datosProductoInterface {
  fechas: string[],
  datosHistoricos: {
    'GDP Per Capita': number[],
    'GDP': number[],
  },
  datosActuales: {},
};

const hoy: Date = new Date();
const fechaComienzoDatos: Date = new Date('2000/01/01');

const info: string =
`PBI y PBI per capita PPP en dolares constantes de 2017.
https://data.worldbank.org/indicator/NY.GDP.MKTP.PP.KD?locations=AR
https://data.worldbank.org/indicator/NY.GDP.PCAP.PP.KD?locations=AR`

export default function Producto({modo, cacheData, setCacheData}): JSX.Element {
  const [datosProducto, setDatosProducto] = useState<datosProductoInterface>();
  const [ultimaActualizacion, setUltimaActualizacion] = useState<string>();

  useEffect(() => {getDataAnalitica('producto', cacheData, setCacheData, setDatosProducto, setUltimaActualizacion)}, []);

  function renderContent(): JSX.Element {
    if (datosProducto === undefined) return (
      <div className='sm:text-xl'>
        Cargando...
      </div>
    )
    else return (
    <div>
      <DatosAnaliticos 
      nombre='Producto Bruto Interno (PPP)'
      modo={modo}
      datos={datosProducto}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad=''
      unidades={{'GDP': '$ bill.', 'GDP Per Capita': '$ mil.'}}
      mostrarValores={true}
      manejoEstados={{}}
      round={3}
      textoInfo={info}
      ultimaActualizacion={ultimaActualizacion}
      path='producto'
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
