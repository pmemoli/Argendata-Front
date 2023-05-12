import {useState, useEffect} from 'react';
import DatosAnaliticos from './components/DatosAnaliticos';
import {getDataAnalitica} from './utilidades/getDataAnalitica';

const hoy = new Date();
const fechaComienzoDatos = new Date();
fechaComienzoDatos.setMonth(fechaComienzoDatos.getMonth() - 1);

const info: string =
`Porcentaje los ingresos totales acumulados por decil. El
decil i-esimo es el 10% de personas que tienen mas ingresos que el 
10 * (i - 1) % de la poblacion, y menos que el 10 * (i + 1) %, con excepcion
del decil 1 (el 10% que menos tiene) y el decil 10 (el 10% que mas tiene).

Fuente Indec.

https://www.indec.gob.ar/indec/web/Nivel4-Tema-4-31-60`

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
        estado: '4to trimestre 2022',
        slider: true,
      }}
      round={3}
      textoInfo={info}
      ultimaActualizacion={ultimaActualizacion}
      path='distribucion'
      histogram={true}
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
