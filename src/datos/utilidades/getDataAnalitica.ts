import {api} from '../../api';
import {tiemposCache} from './tiemposCache';

const hoy: Date = new Date();

export async function getDataAnalitica(nombre, cacheData, setCacheData, setData, setUltimaActualizacion, muchosDatos=false) {
  try {
    const hayCache: boolean = cacheData !== null && cacheData[nombre] !== null && cacheData[nombre] !== undefined;
    
    const cacheSuitable: boolean = hayCache &&
    (hoy.getTime() - new Date(cacheData[nombre].ultimaActualizacionCache).getTime()) < tiemposCache[nombre]; // Cache desactualizado

    const actualizarCrimen: boolean = hayCache &&
    (new Date(cacheData[nombre].ultimaActualizacionCache).getTime() < new Date(2023, 3, 22, 23, 14).getTime());

    if (cacheSuitable && !actualizarCrimen) {
      setData(cacheData[nombre].datos);
      setUltimaActualizacion(cacheData[nombre].ultimaActualizacionApi);
    }

    else {
      if (hayCache) {
        setData(cacheData[nombre].datos);
        setUltimaActualizacion(cacheData[nombre].ultimaActualizacionApi);
      }

      const res: any = await api.get(`/datos/${nombre}`);

      let datosApi : any = res.data.datos;

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
