import {api} from '../../api';
import {tiemposCache} from './tiemposCache';

const hoy: Date = new Date();

export async function getDataAnalitica(nombre, cacheData, setCacheData, setData, setUltimaActualizacion, muchosDatos=false, setEstados=undefined) {
  function actualizarEstadoMuchosDatos(objeto: any, estado: string): void {
    const keys: string[] = Object.keys(objeto);

    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== 'estado') objeto[keys[i]]['estado'] = estado;
    }
  }

  try {
    const hayCache: boolean = cacheData !== null && cacheData[nombre] !== null && cacheData[nombre] !== undefined;
    
    const cacheSuitable: boolean = hayCache &&
    (hoy.getTime() - new Date(cacheData[nombre].ultimaActualizacionCache).getTime()) < tiemposCache[nombre]; // LocalStorage desactualizado

    const actualizarCrimen: boolean = hayCache && nombre === 'crimen' &&
    (new Date(cacheData['crimen'].ultimaActualizacionCache).getTime() < new Date(2023, 2, 22, 23, 14).getTime());

    const actualizarIngresos: boolean = hayCache && nombre === 'ingresos' &&
    (new Date(cacheData['ingresos'].ultimaActualizacionCache).getTime() < new Date(2023, 4, 11, 21, 39).getTime());

    const actualizarInflacion: boolean = hayCache && nombre === 'inflacion' &&
    (new Date(cacheData['inflacion'].ultimaActualizacionCache).getTime() < new Date(2023, 4, 16, 16, 0).getTime());

    const actualizarProducto: boolean = hayCache && nombre === 'producto' &&
    (new Date(cacheData['producto'].ultimaActualizacionCache).getTime() < new Date(2023, 4, 20, 12, 30).getTime());

    const actualizacionesDesfasadas = !actualizarCrimen && !actualizarInflacion && !actualizarInflacion && !actualizarProducto

    if (cacheSuitable && !actualizarCrimen && !actualizarIngresos && actualizacionesDesfasadas) {
      if (muchosDatos) actualizarEstadoMuchosDatos(cacheData[nombre].datos, 'cache');
      else cacheData[nombre].datos['estado'] = 'cache';

      if (setEstados !== undefined) {
        const estadosPosibles = Object.keys(cacheData[nombre].datos);
        estadosPosibles.pop();

        setEstados(estadosPosibles.reverse());
      }

      setData(cacheData[nombre].datos);
      setUltimaActualizacion(cacheData[nombre].ultimaActualizacionApi);
    }

    else {
      if (hayCache && actualizacionesDesfasadas) {
        if (muchosDatos) actualizarEstadoMuchosDatos(cacheData[nombre].datos, 'actualizando');
        else cacheData[nombre].datos['estado'] = 'actualizando';
        
        if (setEstados !== undefined) {
          const estadosPosibles = Object.keys(cacheData[nombre].datos);
          estadosPosibles.pop();

          setEstados(estadosPosibles.reverse());
        }

        setData(cacheData[nombre].datos);
        setUltimaActualizacion(cacheData[nombre].ultimaActualizacionApi);
      }

      const res: any = await api.get(`/datos/${nombre}`);

      let datosApi: any = res.data.datos;

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

      if (setEstados !== undefined) {
        const estadosPosibles = Object.keys(datosApi)
        estadosPosibles.pop()

        setEstados(estadosPosibles.reverse())
      }

      setData(datosApi);
    }
  }

  catch(e) {console.log(e)}
}
