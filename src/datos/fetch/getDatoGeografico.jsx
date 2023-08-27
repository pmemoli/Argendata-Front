import pako from 'pako'
import {api} from './api'
import {Buffer} from 'buffer'

export async function getDatoGeografico(nombre, setDatos, setUltimaActualizacion, setMetadata) {
  try {
    const res = await api.get(`/datos/${nombre}`)

    let datosApi = res.data.datos
    
    // Datos puros
    const datosBufferString = Buffer.from(datosApi.geoData, 'hex')
    const decompressedData = pako.ungzip(datosBufferString, { to: 'string' })

    console.log(JSON.parse(decompressedData))

    setDatos(JSON.parse(decompressedData))

    // Metadata
    const metadata = datosApi.metadata
    setMetadata(metadata)

    // Ultima actualizacion
    const ultimaFecha = new Date(res.data.datos.updatedAt).toLocaleString()
    setUltimaActualizacion(ultimaFecha)
  }

  catch(e) {console.log(e)}
}