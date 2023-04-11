// Imports
const express = require('express')
const datosController = require('../controllers/datosController')
const router = express.Router()

// Routes
router.get('/dolar', datosController.getDolar)
router.get('/inflacion', datosController.getInflacion)
router.get('/crimen', datosController.getCrimen)
router.get('/pobreza', datosController.getPobreza)
router.get('/empleo', datosController.getEmpleo)
router.get('/producto', datosController.getProducto)
router.get('/emision', datosController.getEmision)
router.get('/barrios', datosController.getBarrios)
router.get('/merval', datosController.getMerval)
router.get('/cortes', datosController.getCortes)
router.get('/riesgo', datosController.getRiesgo)
router.get('/gasto', datosController.getGasto)

module.exports = router
