import {useState, useEffect} from 'react';
import axios, {AxiosInstance} from 'axios';
import DatosAnaliticos from './components/DatosAnaliticos';

const ids: any = {
  desempleo: '45.1_ECTDT_0_A_33',
  empleo: '44.2_ECTET_0_T_30',
  actividad: '43.2_ECTAT_0_T_33',
};

const api: AxiosInstance = axios.create({
  baseURL: `http://localhost:3001`,
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
https://www.datos.gob.ar/series/api/series/?ids=${ids.actividad}`

const msEnHora: number = 3600000;
const msEnMes: number = msEnHora * 24 * 30;
const deltaActualizacion: number = 2;  // mes

export default function Empleo({modo, cacheData, setCacheData}): JSX.Element {
  const [datosEmpleo, setDatosEmpleo] = useState<datosEmpleoInterface>();

  useEffect(() => {getDatos()}, [])

  async function getDatos() {
    try {
      if (cacheData !== null && cacheData.empleo !== null && cacheData.empleo !== undefined && 
        (-cacheData.empleo.ultimaActualizacion.getTime() + hoy.getTime()) / msEnMes < deltaActualizacion) {
          setDatosEmpleo(cacheData.empleo.datos);
          return;
      }

      else {
        const res: any = await api.get('/datos/empleo');
        const datosApi: any = res.data.datosEmpleo;
        delete datosApi['nombre'];
        delete datosApi['__v'];
  
        setDatosEmpleo(datosApi);

        setCacheData(prevCache => ({
          ...prevCache,
          empleo: {
            datos: datosApi,
            ultimaActualizacion: new Date(),
          }
        }));
      }
    }

    catch(e) {console.log(e)}
  }

  function renderContent(): JSX.Element {
    if (datosEmpleo === undefined) return (
      <div className='sm:text-xl'>
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
