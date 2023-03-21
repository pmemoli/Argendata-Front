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
mongoose.connect('mongodb://localhost/argendata')
 
// Basic response
app.get('/', (req, res) => {
    res.json({message: 'Working!'}).status(200)
})

// Routing
const datosRoute = require('./routes/datos')
app.use('/datos', datosRoute)

app.listen(3001)

// Actualizar datos cuando corresponda
cron.schedule('0 */2 * * *', async () => {
  try {
    const res = await actualizadores.actualizarDolar()
    console.log(res)
  }

  catch(e) {console.log(e)}
})