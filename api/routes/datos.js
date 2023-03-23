// Imports
const express = require('express')
const datosController = require('../controllers/datosController')
const router = express.Router()

// Routes
router.get('/dolar', datosController.getDolar)

module.exports = router
