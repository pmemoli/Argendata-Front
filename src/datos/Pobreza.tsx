import {useState, useEffect} from 'react';
import DatosAnaliticos from './components/DatosAnaliticos';
import axios, {AxiosInstance} from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

const pobreza: number[] = [30.3, 28.6, 25.7, 27.3, 32.0, 35.4, 35.5, 40.9, 42.0, 40.6, 37.3, 36.5, 39.2];
const indigencia: number[] = [6.1, 6.2, 4.8, 4.9, 6.7, 7.7, 8.0, 10.5, 10.5, 10.7, 8.2, 8.8, 8.1];
const fechas: string[] = ['2017-01-01', '2017-06-01', '2018-01-01','2018-06-01', '2019-01-01', '2019-06-01', '2020-01-01',
                          '2020-06-01', '2021-01-01','2021-06-01', '2022-01-01', '2022-06-01', '2023-01-01'];

interface datosPobrezaInterface {
  fechas: string[],
  datosHistoricos: {
    pobreza: number[],
    indigencia: number[],
  },
  datosActuales: {},
};
                          
const hoy: Date = new Date();
const fechaComienzoDatos: Date = new Date('2000/01/01');  

const info: string = 
`Porcentaje de la poblacion bajo la linea de pobreza e indigencia.
Fuente Indec.
https://www.indec.gob.ar/indec/web/Nivel4-Tema-4-46-152`

const msEnHora: number = 3600000;
const msEnMes: number = msEnHora * 24 * 30;
const deltaActualizacion: number = 1;  // mes

export default function Pobreza({modo, cacheData, setCacheData}): JSX.Element {  
  const [datosPobreza, setDatosPobreza] = useState<datosPobrezaInterface>();

  useEffect(() => {getDatos()}, []);

  async function getDatos() {
    try {
      if (cacheData !== null && cacheData.pobreza !== null && cacheData.pobreza !== undefined && 
        (-cacheData.pobreza.ultimaActualizacion.getTime() + hoy.getTime()) / msEnMes < deltaActualizacion) {
          setDatosPobreza(cacheData.pobreza.datos);
          return;
      }

      else {
        const res: any = await api.get('/datos/pobreza');
        const data: any = res.data.datosPobreza;
        delete data['nombre'];
        delete data['__v'];
  
        setDatosPobreza(data);

        setCacheData(prevCache => ({
          ...prevCache,
          pobreza: {
            datos: data,
            ultimaActualizacion: new Date(),
          }
        }));
      }
    }

    catch(e) {console.log(e);}
  }


  function renderContent(): JSX.Element {
    if (datosPobreza === undefined) return (
      <div className='sm:text-xl'>
        Cargando...
      </div>
    )
   
    else return (
    <div>
      <DatosAnaliticos 
      nombre='Pobreza'
      modo={modo}
      datos={datosPobreza}
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
}
