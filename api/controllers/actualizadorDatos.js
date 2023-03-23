const Dolar = require('../models/Dolar')
const axios = require('axios')

const dolarHistoricoApi = axios.create({
  baseURL: 'https://api.bluelytics.com.ar/v2/evolution.json',
});

const dolarActualApi = axios.create({
  baseURL: 'https://www.dolarsi.com/api/api.php?type=valoresprincipales',
})

const wholePartRegex = /\d+/

async function actualizarDolar() {
  try {
    const resHistorico = await dolarHistoricoApi.get('');
    const datosHistoricosApi = resHistorico.data;

    const resActual = await dolarActualApi.get('');
    const datosActualesApi = resActual.data;

    const fechas = [];
    const valoresBlue = []; 
    const valoresOficial = [];

    const valorCcl = {
      'venta': parseInt(wholePartRegex.exec(datosActualesApi[3].casa.venta)[0]),
      'compra': parseInt(wholePartRegex.exec(datosActualesApi[3].casa.compra)[0]),
    };
    
    const valorTurista = {
      'venta': parseInt(wholePartRegex.exec(datosActualesApi[6].casa.venta)[0]),
    };

    for (let i = 0; i < datosHistoricosApi.length; i++) {
      if (datosHistoricosApi[i].source === 'Blue') {
        valoresBlue.push({
          'venta': datosHistoricosApi[i].value_sell,
          'compra': datosHistoricosApi[i].value_buy,  
        });
      
        fechas.push(datosHistoricosApi[i].date.substring(2));
      }

      if (datosHistoricosApi[i].source === 'Oficial') {
        valoresOficial.push({
          'venta': datosHistoricosApi[i].value_sell,
          'compra': datosHistoricosApi[i].value_buy,  
        });
      }
    }
    
    const datosDolar = {
      'fechas': fechas.reverse(),
      'blue': valoresBlue.reverse(),
      'oficial': valoresOficial.reverse(),
      'ccl': valorCcl,
      'turista': valorTurista,
      'cronologia': 'ultimo'
    }

    const dolares = await Dolar.find()
    if (dolares.length === 0) {
      await Dolar.create(datosDolar)
    }
    else {
      await Dolar.findOneAndReplace({}, datosDolar)
    }

    return 'updated'
  } 
  
  catch(e) {
    console.log(e)
    
    return 'failed'
  }
}

module.exports = {actualizarDolar}