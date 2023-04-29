import {api} from '../../api';
import {tiemposCache} from './tiemposCache';

const hoy: Date = new Date();

export async function getDataAnalitica(nombre, cacheData, setCacheData, setData, setUltimaActualizacion, muchosDatos=false) {
  function actualizarEstadoMuchosDatos(objeto: any, estado: string): void {
    const keys: string[] = Object.keys(objeto);

    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== 'estado') objeto[keys[i]]['estado'] = estado;
    }
  }

  try {
    const hayCache: boolean = cacheData !== null && cacheData[nombre] !== null && cacheData[nombre] !== undefined;
    
    const cacheSuitable: boolean = hayCache &&
    (hoy.getTime() - new Date(cacheData[nombre].ultimaActualizacionCache).getTime()) < tiemposCache[nombre]; // Cache desactualizado

    const actualizarCrimen: boolean = hayCache && nombre === 'crimen' &&
    (new Date(cacheData['crimen'].ultimaActualizacionCache).getTime() < new Date(2023, 3, 22, 23, 14).getTime());

    if (cacheSuitable && !actualizarCrimen) {
      if (muchosDatos) actualizarEstadoMuchosDatos(cacheData[nombre].datos, 'cache');
      else cacheData[nombre].datos['estado'] = 'cache';

      setData(cacheData[nombre].datos);
      setUltimaActualizacion(cacheData[nombre].ultimaActualizacionApi);
    }

    else {
      if (hayCache) {
        console.log(cacheData[nombre].datos);

        if (muchosDatos) actualizarEstadoMuchosDatos(cacheData[nombre].datos, 'actualizando');
        else cacheData[nombre].datos['estado'] = 'actualizando' 

        console.log(cacheData[nombre].datos);

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
        actualizarEstadoMuchosDatos(datosApi, 'cache');
      }
      else datosApi['estado'] = 'cache' 


      setCacheData(prevCache => ({
        ...prevCache,
        [nombre]: {
          datos: datosApi,
          ultimaActualizacionCache: new Date(),
          ultimaActualizacionApi: ultimaFecha,
        }
      }));
      
      datosApi['estado'] = 'cache';

      setData(datosApi);
    }
  }

  catch(e) {console.log(e)}
}
