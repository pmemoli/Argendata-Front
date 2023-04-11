// Imports
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cron = require('node-cron')
const actualizadores = require('./controllers/actualizadorDatos')
const app = express()
const rateLimit = require('express-rate-limit')
require('dotenv').config()

// Security
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutos
    max: 200, // En 10 minutos puede hacer hasta 200 llamadas
    standardHeaders: true,
	legacyHeaders: false,
})

app.use(limiter)
app.use(cors());

// Basic middleware
app.use(express.json())
app.use(express.urlencoded())

// Connect to db
const uri = `mongodb+srv://argendata:${process.env.PASS_MONGO}@argendata.82uzhmt.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(uri)
 
// Basic response
app.get('/', (req, res) => {
    res.json({message: 'Working!'}).status(200)
})

// Routing
const datosRouter = require('./routes/datos')
app.use('/datos', datosRouter)

// Forzar actualizacion datos
async function forceUpdate() {
  try {
    await actualizadores.actualizarMerval()

    console.log('Se actualizo todo')
  }

  catch(e) {console.log(e)}
} 

forceUpdate() 

// Actualiza datos cuando corresponda

// Cortes luz (1 vez cada 2 horas)
cron.schedule('0 */1 * * *', async () => {
  try {
    await actualizadores.actualizarCortes()
  }

  catch(e) {console.log(e)}
})

// Dolar (3 veces por dia)
cron.schedule('10 12,17,20 * * *', async () => {
  try {
    const res = await actualizadores.actualizarDolar()
  }

  catch(e) {console.log(e)}
})

// Barrios (1 vez por an(i)o)
cron.schedule('0 0 * 1 *', async () => {
  try {
    await actualizadores.actualizarBarrios()
  }

  catch(e) {console.log(e)}
})

// Merval (1 vez por dia)
cron.schedule('0 15 * * *', async () => {
  try {
    await actualizadores.actualizarMerval()
    await actualizadores.actualizarRiesgo()
  }

  catch(e) {console.log(e)}
})

// El resto analitico (3 veces por mes)
cron.schedule('* * 10,20,25 * *', async () => {
  try {
    await actualizadores.actualizarCrimen()
    await actualizadores.actualizarEmision()
    await actualizadores.actualizarEmpleo()
    await actualizadores.actualizarInflacion()
    await actualizadores.actualizarPobreza()
    await actualizadores.actualizarProducto()
    await actualizadores.actualizarGasto()
  }

  catch(e) {console.log(e)}
})

app.listen(3001)

console.log('listening...')