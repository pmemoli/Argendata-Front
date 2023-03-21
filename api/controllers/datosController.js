const mongoose = require('mongoose')
const Dolar = require('../models/Dolar')
const axios = require('axios')

async function getDolar(req, res) {
  try {
    let datosActuales = await Dolar.findOne()
    req.status(200).json(datosActuales)
  }

  catch(e) {
    console.log(e)
    res.status(500)
  }
}

module.exports = {getDolar}