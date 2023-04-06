import {useState, useEffect} from 'react';
import DatosGeograficos from './components/DatosGeograficos';
import axios, {AxiosInstance} from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/datos/barrios'
})

const info: string = 
`Mapa con informacion de los barrios populares del pais.
Fuente Registro Nacional de Barrios Populares (RENABAP).
https://www.argentina.gob.ar/desarrollosocial/renabap`;

export default function BarriosPopulares({modo}): JSX.Element {
  const [data, setData] = useState<any>();

  useEffect(() => {getData()}, []);

  async function getData() {
    try {
      const res = await api.get('');
      const datosApi = res.data.datosBarrios.geoData;

      setData(datosApi);
    }

    catch(e) {console.log(e);}
  }
  
  return (
    <div>
      <DatosGeograficos 
      modo={modo}
      center={[-34.5764557475325, -58.44779337734082]}
      geoData={data}
      info={info}
      contribuidor={{link: 'https://www.ign.gob.ar/AreaServicios/Argenmap/Introduccion', nombre: 'Instituto Geografico Nacional'}}
      />
    </div>
  )
}
 