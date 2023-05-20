import {useState, useEffect} from 'react';
import DatosAnaliticos from './components/DatosAnaliticos';
import {getDataAnalitica} from './utilidades/getDataAnalitica';

const hoy: Date = new Date();
const fechaComienzoDatos: Date = new Date('2000/01/01');

const info: string =
`PBI y PBI per capita PPP en dolares constantes de 2017.
PBI y PBI per capita Nominal en dolares.
https://data.worldbank.org/indicator/NY.GDP.MKTP.PP.KD?locations=AR
https://data.worldbank.org/indicator/NY.GDP.PCAP.PP.KD?locations=AR
https://api.worldbank.org/v2/country/ARG/indicator/NY.GDP.PCAP.CD?format=json
https://api.worldbank.org/v2/country/ARG/indicator/NY.GDP.MKTP.CD?format=json`

export default function Producto({modo, cacheData, setCacheData}): JSX.Element {
  const [datosProducto, setDatosProducto] = useState<any>();
  const [ultimaActualizacion, setUltimaActualizacion] = useState<string>();
  const [estado, setEstado] = useState<string>('PPP');
  const [estadosPosibles, setEstadosPosibles] = useState<string[]>();

  useEffect(() => {getDataAnalitica('producto', cacheData, setCacheData, setDatosProducto, setUltimaActualizacion, true, setEstadosPosibles)}, []);

  function renderContent(): JSX.Element {
    if (datosProducto === undefined) return (
      <div className='sm:text-xl'>
        Cargando...
      </div>
    )
    else return (
    <div>
      <DatosAnaliticos 
      nombre='Producto Bruto Interno'
      modo={modo}
      datos={datosProducto[estado]}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad=''
      unidades={{'GDP': '$ bill.', 'GDP Per Capita': '$ mil.'}}
      mostrarValores={true}
      manejoEstados={{
        setEstado: setEstado,
        estadosPosibles: estadosPosibles,
        estado: estado,
        slider: true,
      }}
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
