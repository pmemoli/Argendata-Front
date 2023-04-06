import {useState, useEffect} from 'react';
import axios, {AxiosInstance} from 'axios';
import DatosAnaliticos from './components/DatosAnaliticos';

const api = axios.create({
  baseURL: 'http://localhost:3001'
})

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

export default function Crimen({modo}): JSX.Element {
  const [datosTotales, setDatosTotales] = useState<datosTotalesInterface>();
  const [datosCrimen, setDatosCrimen] = useState<datosCrimenInterface>();
  const [provincia, setProvincia] = useState<string>('Pais');

  useEffect(() => {getDatos()}, [])

  async function getDatos() {
    try {
      const res: any = await api.get('/datos/crimen');    
      setDatosTotales(res.data.datosCrimen.data);
    }

    catch(e) {console.log(e)}
  }

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
