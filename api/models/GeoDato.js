const mongoose = require('mongoose')

const datoSchema = new mongoose.Schema({
    nombre: String,
    geoData: {
        type: Buffer,
    }
})

module.exports = mongoose.model('GeoDato', datoSchema)
