import {api} from './api'
import {tiemposCache} from './tiemposCache'

const hoy = new Date()

const lastRebootDate = new Date(2023, 7, 5, 17, 26, 0)

export async function getDatoAnalitico(nombre, cacheData,
    setCacheData, setDatos, setUltimaActualizacion, setMetadata, setEstado) {
        
    try {
        const dataEnCache = 
        (cacheData !== null && cacheData[nombre] !== null && cacheData[nombre] !== undefined) && // Cache con datos
        (new Date(cacheData[nombre].ultimaActualizacion).getTime() > lastRebootDate.getTime()) && // Posterior a un reboot
        (hoy.getTime() - new Date(cacheData[nombre].ultimaActualizacion).getTime()) < tiemposCache[nombre] // Actualizado

        // Se esta en condiciones de extraer del cache en localstorage
        if (dataEnCache) {
            setDatos(cacheData[nombre]['datos'])
            setMetadata(cacheData[nombre]['metadata'])
            setUltimaActualizacion(cacheData[nombre].ultimaActualizacion)
            setEstado(cacheData[nombre]['metadata'].estadoManagement.estadoDefault)
        }

        // Se extraen los datos del back
        else {
            const res = await api.get(`/datos/${nombre}`)

            let datosApi = res.data.datos

            // Datos puros
            const datos = datosApi.data
            setDatos(datos)
            
            // Metadata
            const metadata = datosApi.metadata
            setMetadata(metadata)

            // Estado Default
            setEstado(metadata.estadoManagement.estadoDefault)

            // Ultima actualizacion
            const ultimaFecha = new Date(res.data.datos.updatedAt).toLocaleString()
            setUltimaActualizacion(ultimaFecha)
      
            // Actualizacion Cache en localstorage
            setCacheData(prevCache => ({
                ...prevCache,
                [nombre]: {
                    datos: datos,
                    metadata: metadata,
                    ultimaActualizacion: ultimaFecha,
                }
            }))
        }
    }

    catch(e) {console.log(e)}
}