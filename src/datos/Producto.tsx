import axios, { AxiosInstance } from 'axios';
import {useState, useEffect} from 'react';
import DatosAnaliticos from './components/DatosAnaliticos';

const apiTotal: AxiosInstance = axios.create({
  baseURL: 'http://api.worldbank.org/v2/country/ar/indicator/NY.GDP.MKTP.PP.KD?format=json'
})

const apiPerCapita: AxiosInstance = axios.create({
  baseURL: 'http://api.worldbank.org/v2/country/ar/indicator/NY.GDP.PCAP.PP.KD?format=json'
})

interface datosProductoInterface {
  fechas: string[],
  datosHistoricos: {
    'GDP Per Capita': number[],
    'GDP': number[],
  },
  datosActuales: {},
};

const hoy: Date = new Date();
const fechaComienzoDatos: Date = new Date('2000/01/01');

export default function Producto({modo}): JSX.Element {
  const [datosProducto, setDatosProducto] = useState<datosProductoInterface>();

  useEffect(() => {getDatosProducto()}, []);

  async function getDatosProducto() {
    try {
      const resPerCapita: any = await apiPerCapita.get('');
      const resTotal: any = await apiTotal.get('');

      const dataPerCapita: any = resPerCapita.data[1];
      const dataTotal: any = resTotal.data[1];
      
      setDatosProducto({
        fechas: dataPerCapita.map(data => data.date).reverse(),
        datosHistoricos: {
          'GDP': dataTotal.map(data => data.value / 1000000000).reverse(),
          'GDP Per Capita': dataPerCapita.map(data => data.value / 1000).reverse(),
        },
        datosActuales: {},
      })
    }

    catch(e) {console.log(e);}
  }

  function renderContent(): JSX.Element {
    if (datosProducto === undefined) return (
      <div>
        Cargando...
      </div>
    )
    else return (
    <div>
      <DatosAnaliticos 
      nombre='Producto'
      modo={modo}
      datos={datosProducto}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad=''
      unidades={{'GDP': ' bill.', 'GDP Per Capita': ' mil'}}
      mostrarValores={true}
      manejoEstados={{}}
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
