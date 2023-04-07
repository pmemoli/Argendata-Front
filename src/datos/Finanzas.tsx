import {useEffect, useState} from 'react'
import axios, {AxiosInstance} from 'axios';
import DatosAnaliticos from './components/DatosAnaliticos';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001'
});

interface datosMervalInterface {
  fechas: string[],
  datosHistoricos: {
    merval: number[],
  },
  datosActuales: {
    'riesgo pais': number,
  },
};

const hoy = new Date();
const fechaComienzoDatos = new Date();
fechaComienzoDatos.setDate(fechaComienzoDatos.getDate() - 90);

const info: string = 
`Indice Merval S&P en dolares CCL y riesgo pais.
Fuente Ambito y estadisticasbcra.com.
https://estadisticasbcra.com/indice_merval`

export default function Merval({modo}) {
  const [data, setData] = useState<datosMervalInterface>();

  useEffect(() => {getDatos()}, []);

  async function getDatos() {
    try {
      const res: any = await api.get('/datos/merval');
      const datosApi: any = res.data.datosMerval;
    
      delete datosApi['nombre'];
      delete datosApi['__v'];

      setData(datosApi);
    }

    catch(e) {console.log(e);}
  }

  if (data === undefined) return (
    <div className='sm:text-xl'>
      Cargando...
    </div>
  )

  return (
    <div>
      <DatosAnaliticos 
      nombre='Finanzas'
      modo={modo}
      datos={data}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad=''
      unidades={{'merval': '$ USD', 'riesgo pais': ''}}
      mostrarValores={true}
      manejoEstados={{}}
      round={1}
      textoInfo={info}
      />
    </div>
  )
}
