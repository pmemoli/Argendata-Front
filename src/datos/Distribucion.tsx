import {useState, useEffect} from 'react';
import DatosAnaliticos from './components/DatosAnaliticos';
import {getDataAnalitica} from './utilidades/getDataAnalitica';

const hoy = new Date();
const fechaComienzoDatos = new Date();
fechaComienzoDatos.setMonth(fechaComienzoDatos.getMonth() - 1);

const info: string =
`Venta y compra de las principales cotizaciones de dolar.
Fuente Ambito Financiero.`

export default function Distribucion({modo, cacheData, setCacheData}): JSX.Element {
  const [datosDistribucion, setDatosDistribucion] = useState<any>();
  const [ultimaActualizacion, setUltimaActualizacion] = useState<string>();
  const [estado, setEstado] = useState<string>('1er trimestre 2017');
  const [estadosPosibles, setEstadosPosibles] = useState<string[]>();

  useEffect(() => {
    getDataAnalitica('distribucion', cacheData, setCacheData, setDatosDistribucion, setUltimaActualizacion, true, setEstadosPosibles)
  }, []);

  function renderContent(): JSX.Element {
    console.log(datosDistribucion)

    if (datosDistribucion === undefined) return (
      <div className='sm:text-xl'>
        Cargando...
      </div>
    )

    else return (
    <div>
      <DatosAnaliticos 
      nombre='Distribucion Ingreso'
      modo={modo}
      datos={datosDistribucion[estado]}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad=''
      mostrarValores={true}
      manejoEstados={{
        setEstado: setEstado,
        estadosPosibles: estadosPosibles,
        slider: true,
      }}
      round={3}
      textoInfo={info}
      ultimaActualizacion={ultimaActualizacion}
      path='distribucion'
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
