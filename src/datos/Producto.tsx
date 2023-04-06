import axios, { AxiosInstance } from 'axios';
import {useState, useEffect} from 'react';
import DatosAnaliticos from './components/DatosAnaliticos';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001'
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

const info: string =
`PBI y PBI per capita PPP en dolares constantes de 2017.
Se reporta el PPP para moderar el efecto de sobreestimamiento del producto debido a los cepos cambiarios.
Fuente worldbank.
https://data.worldbank.org/indicator/NY.GDP.MKTP.PP.KD?locations=AR
https://data.worldbank.org/indicator/NY.GDP.PCAP.PP.KD?locations=AR`

export default function Producto({modo}): JSX.Element {
  const [datosProducto, setDatosProducto] = useState<datosProductoInterface>();

  useEffect(() => {getDatosProducto()}, []);

  async function getDatosProducto() {
    try {
      const res: any = await api.get('/datos/producto');
      const datosApi: any = res.data.datosProducto;
    
      delete datosApi['nombre'];
      delete datosApi['__v'];

      setDatosProducto(datosApi);
    }

    catch(e) {console.log(e);}
  }

  function renderContent(): JSX.Element {
    if (datosProducto === undefined) return (
      <div className='sm:text-xl'>
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
