import {api} from '../../api';
import {tiemposCache} from './tiemposCache';

const hoy: Date = new Date();

export async function getDataAnalitica(nombre, cacheData, setCacheData, setData, setUltimaActualizacion, muchosDatos=false) {
  try {
    const cacheSuitable: boolean = cacheData !== null && cacheData[nombre] !== null && cacheData[nombre] !== undefined && 
    ((hoy.getTime() - new Date(cacheData[nombre].ultimaActualizacionCache).getTime()) < tiemposCache[nombre])

    if (cacheSuitable) {
      setData(cacheData[nombre].datos);
      setUltimaActualizacion(cacheData[nombre].ultimaActualizacionApi);
    }

    else {
      const res: any = await api.get(`/datos/${nombre}`);

      let datosApi : any = res.data.datos;

      console.log(datosApi);

      delete datosApi['nombre'];
      delete datosApi['__v'];

      const ultimaFecha: string = new Date(res.data.datos.updatedAt).toLocaleString();

      setUltimaActualizacion(ultimaFecha);

      if (muchosDatos) {
        datosApi= res.data.datos.data;
      }

      setCacheData(prevCache => ({
        ...prevCache,
        [nombre]: {
          datos: datosApi,
          ultimaActualizacionCache: new Date(),
          ultimaActualizacionApi: ultimaFecha,
        }
      }));
      
      setData(datosApi);
    }
  }

  catch(e) {console.log(e)}
}