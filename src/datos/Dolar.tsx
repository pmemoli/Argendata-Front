import {useState, useEffect} from 'react';
import DatosAnaliticos from './components/DatosAnaliticos';
import {getDataAnalitica} from './utilidades/getDataAnalitica';

interface datosDolarInterface {
  fechas: string[],
  datosHistoricos: {
    blue: number[],
    oficial: number[],
  },
  datosActuales: {
    ccl: number,
  },
  estado: string,
};

interface datosTotalesInterface {
  venta: datosDolarInterface,
  compra: datosDolarInterface,
}

const hoy = new Date();
const fechaComienzoDatos = new Date();
fechaComienzoDatos.setDate(fechaComienzoDatos.getDate() - 30);

const info: string =
`Venta y compra de las principales cotizaciones de dolar.
Fuente Ambito Financiero.`

export default function Dolar({modo, cacheData, setCacheData}): JSX.Element {
  const [datosDolar, setDatosDolar] = useState<datosTotalesInterface>();
  const [ultimaActualizacion, setUltimaActualizacion] = useState<string>();
  const [transaccion, setTransaccion] = useState<string>('venta');

  useEffect(() => {getDataAnalitica('dolar', cacheData, setCacheData, setDatosDolar, setUltimaActualizacion, true)}, []);

  function renderContent(): JSX.Element {
    if (datosDolar === undefined) return (
      <div className='sm:text-xl'>
        Cargando...
      </div>
    )

    else return (
    <div>
      <DatosAnaliticos 
      nombre='Dolar'
      modo={modo}
      datos={datosDolar[transaccion]}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad='$'
      mostrarValores={true}
      manejoEstados={{
        setEstado: setTransaccion,
        estadosPosibles: ['venta', 'compra'],
        slider: false,
      }}
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
