// Imports
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cron = require('node-cron')
const actualizadores = require('./controllers/actualizadorDatos')
const app = express()

// Basic middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

// Connect to db
const password = 'D9feJRHkMT7Ip8nl'
const uri = `mongodb+srv://argendata:${password}@argendata.82uzhmt.mongodb.net/?retryWrites=true&w=majority`
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
    await actualizadores.actualizarDolar()

    console.log('Se actualizo todo')
  }

  catch(e) {console.log(e)}
} 

//forceUpdate()

// Actualiza datos cuando corresponda

// Dolar (3 veces por dia)
cron.schedule('10 12,17,20 * * *', async () => {
  try {
    const res = await actualizadores.actualizarDolar()
    console.log(res)
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
  }

  catch(e) {console.log(e)}
})

app.listen(3001)
