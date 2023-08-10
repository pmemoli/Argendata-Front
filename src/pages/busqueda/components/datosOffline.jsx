import {datosArgendata} from "./fuentesOffline/argendata"
import {datosIndec} from "./fuentesOffline/indec"
import {datosMisc} from "./fuentesOffline/misc"
import {datosBcra} from "./fuentesOffline/bcra"

export const datosOffline = [
    ...datosArgendata,
    ...datosIndec,
    ...datosMisc,
    ...datosBcra
]