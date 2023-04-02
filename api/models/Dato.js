const mongoose = require('mongoose')

const datoSchema = new mongoose.Schema({
    venta: Number,
    compra: Number,
})

module.exports = mongoose.model('Dato', datoSchema)
