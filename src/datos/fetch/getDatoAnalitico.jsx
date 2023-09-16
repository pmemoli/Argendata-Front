import {api} from './api'

export async function getDatoAnalitico(
    nombre, setDatos, setUltimaActualizacion, setMetadata, setEstado) {
    try {
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
    }

    catch(e) {console.log(e)}
}