import {datosDisponibles} from "../../../../datos/fetch/getDatosDisponibles"

// Lodeo de datos de argendata
export const datosArgendata = []

for (let key of Object.keys(datosDisponibles)) {
    for (let value of datosDisponibles[key]) {
        datosArgendata.push({
            nombre: value.nombre,
            fuente: 'Argendata',
            descripcion: value.descripcion,
            path: `https://www.argendata.net/${value.path}`
        })
    }
}