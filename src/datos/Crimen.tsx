import {useState, useEffect} from 'react';
import axios, {AxiosInstance} from 'axios';
import DatosAnaliticos from './components/DatosAnaliticos';


// snic_hdt_arg
// https://estadisticascriminales.minseg.gob.ar/datos/snic-homicidios-dolosos-pais-series.csv
// https://estadisticascriminales.minseg.gob.ar/datos/snic-homicidios-dolosos-provincias-series.csv

const metadata: any = [
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

const codigosHomicidios: string = metadata.map(data => data.homicidios).join(',');
const apiHomicidios: AxiosInstance = axios.create({
  baseURL: `http://apis.datos.gob.ar/series/api/series/?ids=${codigosHomicidios}`,
});

const codigosRobos: string = metadata.map(data => data.robos).join(',');
const apiRobos: AxiosInstance = axios.create({
  baseURL: `http://apis.datos.gob.ar/series/api/series/?ids=${codigosRobos}`,
});

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

const hoy: Date = new Date();
const fechaComienzoDatos: Date = new Date('2000/01/01');  

const info: string =
`Tasa de homicidios y robos cada 100 mil personas en un año.
Fuente datos.gob.ar.
`

export default function Crimen({modo}): JSX.Element {
  const [datosTotales, setDatosTotales] = useState<datosTotalesInterface>();
  const [datosCrimen, setDatosCrimen] = useState<datosCrimenInterface>();
  const [provincia, setProvincia] = useState<string>('Pais');

  useEffect(() => {getDatos()}, [])

  async function getDatos() {
    try {
      const resHomicidios: any = await apiHomicidios.get('');
      const datosHomicidios: any = resHomicidios.data.data;

      const resRobos: any = await apiRobos.get('');
      const datosRobos: any = resRobos.data.data;

      const fechas: string[] = datosHomicidios.map(dato => dato[0]);

      const dataTotal: any = {};

      for (let i = 0; i < metadata.length; i++) {
        const nombre: string = metadata[i].nombre;
        const tasaPaisHomicidios: number[] = datosHomicidios.map(dato => dato[i + 1]);
        const tasaPaisRobos: number[] = datosRobos.map(dato => dato[i + 1]);

        const datosProvincia: datosCrimenInterface = {
          fechas: fechas,
          datosActuales: {},
          datosHistoricos: {
            homicidios: tasaPaisHomicidios,
            robos: tasaPaisRobos,
          }
        }

        dataTotal[nombre] = datosProvincia;
      }

      setDatosTotales(dataTotal);
    }

    catch(e) {console.log(e)}
  }

  function renderContent(): JSX.Element {
    if (datosTotales === undefined) return (
      <div>
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
