const Dato = require('../models/Dato')
const Datos = require('../models/Datos')
const GeoDato = require('../models/GeoDato')

async function getDolar(req, res) {
  try {
    const datosActuales = await Datos.findOne({nombre: 'dolar'})
    res.status(200).json({datosDolar: datosActuales})
  }

  catch(e) {
    console.log(e)
    res.status(500)
  }
}

async function getInflacion(req, res) {
  try {
    const datosActuales = await Dato.findOne({nombre: 'inflacion'})
    res.status(200).json({datosInflacion: datosActuales})
  }

  catch(e) {
    console.log(e)
    res.status(500)
  }
}

async function getCrimen(req, res) {
  try {
    const datosActuales = await Datos.findOne({nombre: 'crimen'})
    res.status(200).json({datosCrimen: datosActuales})
  }

  catch(e) {
    console.log(e)
    res.status(500)
  }
}

async function getPobreza(req, res) {
  try {
    const datosActuales = await Datos.findOne({nombre: 'pobreza'})
    res.status(200).json({datosPobreza: datosActuales})
  }

  catch(e) {
    console.log(e)
    res.status(500)
  }
}

async function getEmpleo(req, res) {
  try {
    const datosActuales = await Dato.findOne({nombre: 'empleo'})
    res.status(200).json({datosEmpleo: datosActuales})
  }

  catch(e) {
    console.log(e)
    res.status(500)
  }
}

async function getProducto(req, res) {
  try {
    const datosActuales = await Dato.findOne({nombre: 'producto'})
    res.status(200).json({datosProducto: datosActuales})
  }

  catch(e) {
    console.log(e)
    res.status(500)
  }
}

async function getEmision(req, res) {
  try {
    const datosActuales = await Dato.findOne({nombre: 'emision'})
    res.status(200).json({datosEmision: datosActuales})
  }

  catch(e) {
    console.log(e)
    res.status(500)
  }
}

async function getBarrios(req, res) {
  try {
    const datosActuales = await GeoDato.findOne({nombre: 'barrios'})
    res.status(200).json({datosBarrios: datosActuales})
  }

  catch(e) {
    console.log(e)
    res.status(500)
  }
}

async function getMerval(req, res) {
  try {
    const datosActuales = await Dato.findOne({nombre: 'merval'})
    res.status(200).json({datosMerval: datosActuales})
  }

  catch(e) {
    console.log(e)
    res.status(500)
  }
}

module.exports = {getDolar, getInflacion, getCrimen, getPobreza, getEmpleo,
                  getProducto, getEmision, getBarrios, getMerval}
