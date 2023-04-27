import pako from 'pako'
import {api} from '../../api';
import {tiemposCache} from './tiemposCache';
import {Buffer} from 'buffer';

const hoy: Date = new Date();

export async function getGeoData(nombre, setData, setCacheData, cacheData, setUltimaActualizacion) {
  try {
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

  catch(e) {console.log(e);}
}
