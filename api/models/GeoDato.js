const mongoose = require('mongoose')

const datoSchema = new mongoose.Schema({
    nombre: String,
    geoData: {
        type: mongoose.Schema.Types.Mixed,
    }
})

module.exports = mongoose.model('GeoDato', datoSchema)
