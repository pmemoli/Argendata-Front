import {useState, useEffect} from 'react';
import axios, {AxiosInstance} from 'axios';
import DatosAnaliticos from './components/DatosAnaliticos';

const api: AxiosInstance = axios.create({
  baseURL: 'http://apis.datos.gob.ar/series/api/series/?ids=173.1_INUCLEOLEO_DIC-_0_10&format=json',
});

interface datosInflacionInterface {
  fechas: string[],
  datosHistoricos: {
    mensual: number[],
    interanual: number[],
  },
  datosActuales: {},
};

function calculadoraInteranual(serieInflacion: number[]): number[] {
  const ipcInteranual: number[] = []
  for (let i: number = 0; i < serieInflacion.length; i++) {
    if (i < 12) {ipcInteranual.push(0);}
    else {
      let valorInteranual: number = 1;
      for (let j = 0; j < 12; j++) {
        valorInteranual *= 1 + serieInflacion[i - j];
      }
      valorInteranual -= 1;

      ipcInteranual.push(valorInteranual);
    }
  }

  return ipcInteranual;
}

const hoy: Date = new Date();
const fechaComienzoDatos: Date = new Date('2018/01/01');  

const info: string = 
`Variacion mensual y anual de IPC Nucleo.
Fuente datos.gob.ar.
https://www.datos.gob.ar/series/api/series/?ids=173.1_INUCLEOLEO_DIC-_0_10
`

export default function Inflacion({modo}): JSX.Element {
  const [datosInflacion, setDatosInflacion] = useState<datosInflacionInterface>();

  useEffect(() => {getDatos()}, [])

  async function getDatos() {
    try {
      const res = await api.get('')
      const datosApi = res.data.data

      const fechas: string[] = datosApi.map(dato => dato[0])
      const ipcMensual: number[] = datosApi.map(dato => dato[1])
      const ipcInteranual: number[] = calculadoraInteranual(ipcMensual)

      setDatosInflacion({
        'fechas': fechas,
        'datosHistoricos': {
          'mensual': ipcMensual.map(val => val * 100),
          'interanual': ipcInteranual.map(val => val * 100),
        },
        'datosActuales': {}
      })
    }

    catch(e) {console.log(e)}
  }
  function renderContent(): JSX.Element {
    if (datosInflacion === undefined) return (
      <div>
        Cargando...
      </div>
    )
    else return (
    <div>
      <DatosAnaliticos 
      nombre='Inflacion'
      modo={modo}
      datos={datosInflacion}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad='%'
      mostrarValores={true}
      manejoEstados={{}}
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
