const mongoose = require('mongoose')

const datoSchema = new mongoose.Schema({
    nombre: String,
    fechas: [String],
    datosHistoricos: {
        type: Map,
        of: [mongoose.Schema.Types.Mixed]
    },
    datosActuales: {
        type: Map,
        of: Number
    },
})

module.exports = mongoose.model('Dato', datoSchema)
