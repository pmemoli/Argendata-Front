
import {useState, useEffect} from 'react';
import axios, {AxiosInstance} from 'axios';
import DatosAnaliticos from './components/DatosAnaliticos';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

interface datosDolarInterface {
  fechas: string[],
  datosHistoricos: {
    blue: number[],
    oficial: number[],
  },
  datosActuales: {
    ccl: number,
    turista: number,
  },
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

const msEnHora = 3600000;
const deltaActualizacion = 4;  // hora

export default function Dolar({modo, cacheData, setCacheData}): JSX.Element {
  const [datosDolar, setDatosDolar] = useState<datosTotalesInterface>();
  const [transaccion, setTransaccion] = useState<string>('venta');

  useEffect(() => {getDolar()}, []);

  async function getDolar() {
    try {
      if (cacheData !== null && cacheData.dolar !== null && cacheData.dolar !== undefined && 
      (-cacheData.dolar.ultimaActualizacion.getTime() + hoy.getTime()) / msEnHora < deltaActualizacion) {
        setDatosDolar(cacheData.dolar.datos);
        return;
      }

      else {
        const res: any = await api.get('/datos/dolar');
        const datosTotales: datosTotalesInterface = res.data.datosDolar.data;
        
        setCacheData(prevCache => ({
          ...prevCache,
          dolar: {
            datos: datosTotales,
            ultimaActualizacion: new Date(),
          }
        }));
        
        setDatosDolar(datosTotales);
      }
    }

    catch(e) {console.log(e)}
  }

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
