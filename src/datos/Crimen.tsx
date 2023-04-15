import {useState, useEffect} from 'react';
import DatosAnaliticos from './components/DatosAnaliticos';
import {getDataAnalitica} from './utilidades/getDataAnalitica';

interface datosCrimenInterface {
  fechas: string[],
  datosHistoricos: {
    homicidios: number[],
    robos: number[],
  },
  datosActuales: {},
};

interface datosTotalesInterface {
  [provincia: string]: datosCrimenInterface,
}

const metadata = [
  {
    homicidios: 'snic_hdt_arg',
    robos: 'snic_rt_arg',
    nombre: 'Pais',
  },
  {
    homicidios: 'snic_hdt_06',
    robos: 'snic_rt_06',
    nombre: 'Buenos Aires',
  },
  {
    homicidios: 'snic_hdt_82',
    robos: 'snic_rt_82',
    nombre: 'Santa Fe',
  },
  {
    homicidios: 'snic_hdt_02',
    robos: 'snic_rt_02',
    nombre: 'Caba',    
  },
  {
    homicidios: 'snic_hdt_58',
    robos: 'snic_rt_58',
    nombre: 'Neuquen',    
  },
  {
    homicidios: 'snic_hdt_14',
    robos: 'snic_rt_14',
    nombre: 'Cordoba',    
  },
  {
    homicidios: 'snic_hdt_34',
    robos: 'snic_rt_34',
    nombre: 'Formosa',    
  },
];

const hoy: Date = new Date();
const fechaComienzoDatos: Date = new Date('2000/01/01');  

const info: string =
`Tasa de homicidios y robos cada 100 mil personas en un año.
Fuente datos.gob.ar.`

const msEnHora = 3600000;
const msEnMes = msEnHora * 24 * 30;

export default function Crimen({modo, cacheData, setCacheData}): JSX.Element {
  const [datosTotales, setDatosTotales] = useState<datosTotalesInterface>();
  const [provincia, setProvincia] = useState<string>('Pais');
  const [ultimaActualizacion, setUltimaActualizacion] = useState<string>();

  useEffect(() => {getDataAnalitica('crimen', cacheData, setCacheData, setDatosTotales, setUltimaActualizacion, true)}, []);

  function renderContent(): JSX.Element {
    if (datosTotales === undefined) return (
      <div className='sm:text-xl'>
        Cargando...
      </div>
    )

    else return (
    <div>
      <DatosAnaliticos 
      nombre='Crimen'
      modo={modo}
      datos={datosTotales[provincia]}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad='/100K'
      mostrarValores={true}
      manejoEstados={{
        estadosPosibles: metadata.map(data => data.nombre),
        setEstado: setProvincia,
        slider: true,
        estado: provincia,
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
