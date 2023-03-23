const mongoose = require('mongoose')

const dolarDatoSchema = new mongoose.Schema({
    venta: Number,
    compra: Number,
})

const dolarSchema = new mongoose.Schema({
  fechas: [String],
  blue: [dolarDatoSchema],
  oficial: [dolarDatoSchema],
  ccl: dolarDatoSchema,
  turista: dolarDatoSchema,
  cronologia: String,
})

module.exports = mongoose.model('Dolar', dolarSchema)
