const mongoose = require('mongoose')

const datoSchema = new mongoose.Schema({
    fechas: [String],
    datosHistoricos: {
        type: Map,
        of: [Number]
    },
    datosActuales: {
        type: Map,
        of: Number
    },
})

const datosSchema = new mongoose.Schema({
    nombre: String,
    data: {
        type: Map,
        of: datoSchema
    }
})

module.exports = mongoose.model('Datos', datosSchema)
