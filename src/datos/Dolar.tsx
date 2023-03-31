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

export default function Dolar({modo}): JSX.Element {
  const [datosDolar, setDatosDolar] = useState<datosTotalesInterface>();
  const [transaccion, setTransaccion] = useState<string>('venta');

  useEffect(() => {getDolar()}, []);

  async function getDolar() {
    try {
      const res: any = await api.get('/datos/dolar');
      const datos: any = res.data.datosDolar;

      const ventaData: datosDolarInterface = {
        fechas: datos.fechas,
        datosHistoricos: {
          blue: datos.blue.map(dato => dato.venta),
          oficial: datos.oficial.map(dato => dato.venta),
        },
        datosActuales: {
          ccl: datos.ccl.venta,
          turista: datos.turista.venta,
        },
      }

      const compraData: datosDolarInterface = {
        fechas: datos.fechas,
        datosHistoricos: {
          blue: datos.blue.map(dato => dato.compra),
          oficial: datos.oficial.map(dato => dato.compra),
        },
        datosActuales: {
          ccl: datos.ccl.compra,
          turista: datos.turista.venta,
        },
      }

      setDatosDolar({
        venta: ventaData,
        compra: compraData,
      });

      console.log({
        venta: ventaData,
        compra: compraData,
      })
    }

    catch(e) {console.log(e)}
  }

  function renderContent(): JSX.Element {
    if (datosDolar === undefined) return (
      <div>
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
      round={0}/>
    </div>
    )
  }

  return (
  <div className='z-[1]'>
    {renderContent()}
  </div>
  )
};
