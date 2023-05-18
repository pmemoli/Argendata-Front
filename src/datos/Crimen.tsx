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

const codigosPais = [
  {nombre: 'Pais', codigo: 'arg'}, {nombre: 'Buenos Aires', codigo: '06'}, {nombre: 'Santa Fe', codigo: '82'}, 
  {nombre: 'Caba', codigo: '02'}, {nombre: 'Cordoba', codigo: '14'}, {nombre: 'Entre Rios', codigo: '30'},
  {nombre: 'Mendoza', codigo: '50'}, {nombre: 'Salta', codigo: '66'}, {nombre: 'Neuquen', codigo: '58'},   
]

const metadata = codigosPais.map(provincia => { return {
  homicidios: `snic_hdt_${provincia.codigo}`,
  robos: `snic_rt_${provincia.codigo}`,
  nombre: provincia.nombre
}})

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
