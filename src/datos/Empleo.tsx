import {useState, useEffect} from 'react';
import axios, {AxiosInstance} from 'axios';
import DatosAnaliticos from './components/DatosAnaliticos';

const ids: any = {
  desempleo: '45.1_ECTDT_0_A_33',
  empleo: '44.2_ECTET_0_T_30',
  actividad: '43.2_ECTAT_0_T_33',
};

const api: AxiosInstance = axios.create({
  baseURL: `http://apis.datos.gob.ar/series/api/series/?ids=${ids.desempleo},${ids.empleo},${ids.actividad}&format=json`,
});

interface datosEmpleoInterface {
  fechas: string[],
  datosHistoricos: {
    empleo: number[],
    desempleo: number[],
    actividad: number[],
  },
  datosActuales: {},
};

const hoy: Date = new Date();
const fechaComienzoDatos: Date = new Date('2000/01/01');

const info: string = 
`Desempleo: Porcentaje de desempleados en el conjunto de personas que trabajan o quieren trabajar.
Empleo: Porcentaje de empleados en el conjunto de personas mayores de edad y no jubilados.
Desempleo: Porcentaje de poblacion que trabaja o quiere trabajar en el conjunto de personas mayores de edad y no jubilados.

Fuente datos.gob.ar.

https://www.datos.gob.ar/series/api/series/?ids=${ids.desempleo}
https://www.datos.gob.ar/series/api/series/?ids=${ids.empleo}
https://www.datos.gob.ar/series/api/series/?ids=${ids.actividad}
`

export default function Empleo({modo}): JSX.Element {
  const [datosEmpleo, setDatosEmpleo] = useState<datosEmpleoInterface>();

  useEffect(() => {getDatos()}, [])

  async function getDatos() {
    try {
      const res: any = await api.get('');
      const datosApi: any = res.data.data;

      setDatosEmpleo({
        fechas: datosApi.map(dato => dato[0]),
        datosActuales: {},
        datosHistoricos: {
          desempleo: datosApi.map(dato => (dato[1]) * 100),
          empleo: datosApi.map(dato => dato[2] * 100),
          actividad: datosApi.map(dato => dato[3] * 100),
        }
      });
    }

    catch(e) {console.log(e)}
  }

  function renderContent(): JSX.Element {
    if (datosEmpleo === undefined) return (
      <div>
        Cargando...
      </div>
    )

    else return (
    <div>
      <DatosAnaliticos 
      nombre='Empleo'
      modo={modo}
      datos={datosEmpleo}
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
