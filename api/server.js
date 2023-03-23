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
const datosRouter = require('./routes/datos')
app.use('/datos', datosRouter)

async function forceDolarUpdate() {
  try {
    const res = await actualizadores.actualizarDolar()
    console.log(res)
  }

  catch(e) {console.log(e)}
} 

//forceDolarUpdate()

// Actualiza datos cuando corresponda
cron.schedule('10 12,17,20 * * *', async () => {
  try {
    const res = await actualizadores.actualizarDolar()
    console.log(res)
  }

  catch(e) {console.log(e)}
})


app.listen(3001)
