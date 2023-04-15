import pako from 'pako'
import {api} from '../../api';
import {tiemposCache} from './tiemposCache';
import {Buffer} from 'buffer';

const hoy: Date = new Date();

export async function getGeoData(nombre, setData, setCacheData, cacheData, setUltimaActualizacion) {
  try {
    const cacheSuitable: boolean = cacheData !== null && cacheData[nombre] !== null && cacheData[nombre] !== undefined &&
    (nombre !== 'barrios' || (-cacheData[nombre].ultimaActualizacionCache.getTime() + hoy.getTime()) < tiemposCache[nombre]);

    if (cacheSuitable) {
      const decompressedData = pako.ungzip(new Uint8Array(cacheData[nombre].datos.data), { to: 'string' });

      setUltimaActualizacion(cacheData[nombre].ultimaActualizacionApi)

      setData(JSON.parse(decompressedData));
      return;
    }

    else {
      const res: any = await api.get(`/datos/${nombre}`);
      const datosApi = Buffer.from(res.data.datos.geoData, 'hex');

      const ultimaActualizacion: string = new Date(res.data.datos.createdAt).toLocaleString()
      setUltimaActualizacion(ultimaActualizacion)

      const decompressedData = pako.ungzip(datosApi, { to: 'string' });

      setData(JSON.parse(decompressedData));

      setCacheData(prevCache => ({
        ...prevCache,
        [nombre]: {
          datos: datosApi,
          ultimaActualizacionCache: new Date(),
          ultimaActualizacionApi: ultimaActualizacion, 
        }
      }));
    }
  }

  catch(e) {console.log(e);}
}
