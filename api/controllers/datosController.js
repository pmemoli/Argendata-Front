const mongoose = require('mongoose')
const Dolar = require('../models/Dolar')

async function getDolar(req, res) {
  try {
    let datosActuales = await Dolar.findOne()
    res.status(200).json({datosDolar: datosActuales})
  }

  catch(e) {
    console.log(e)
    res.status(500)
  }
}

module.exports = {getDolar}