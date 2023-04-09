const Datos = require('../models/Datos')
const Dato = require('../models/Dato')
const GeoDato = require('../models/GeoDato')
const axios = require('axios')
const pako = require('pako')

// Dolar
const dolarHistoricoApi = axios.create({
  baseURL: 'https://api.bluelytics.com.ar/v2/evolution.json',
})

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
    
    const datosVenta = {
      nombre: 'venta',
      fechas: fechas.reverse(),
      datosHistoricos: {
        blue: valoresBlue.reverse().map(dato => dato.venta),
        oficial: valoresOficial.reverse().map(dato => dato.venta),
      },
      datosActuales: {
        ccl: valorCcl.venta,
        turista: valorTurista.venta,  
      }
    }

    const datosCompra = {
      nombre: 'compra',
      fechas: fechas,
      datosHistoricos: {
        blue: valoresBlue.map(dato => dato.compra),
        oficial: valoresOficial.map(dato => dato.compra),
      },
      datosActuales: {
        ccl: valorCcl.compra,
        turista: valorTurista.venta,  
      }
    }

    const datosTotales = {
      nombre: 'dolar',
      data: {
        venta: datosVenta,
        compra: datosCompra  
      }
    }

    const coleccionDatos = await Datos.find({nombre: 'dolar'})
    if (coleccionDatos.length === 0) {await Datos.create(datosTotales)}
    else {await Datos.findOneAndReplace({nombre: 'dolar'}, datosTotales)}

    return 'updated'
  } 
  
  catch(e) {
    console.log(e)
    
    return 'failed'
  }
}

// Inflacion
const inflacionApi = axios.create({
  baseURL: 'http://apis.datos.gob.ar/series/api/series/?ids=173.1_INUCLEOLEO_DIC-_0_10&format=json',
});

function calculadoraInteranual(serieInflacion) {
  const ipcInteranual = []
  for (let i = 0; i < serieInflacion.length; i++) {
    if (i < 12) {ipcInteranual.push(0);}
    else {
      let valorInteranual = 1;
      for (let j = 0; j < 12; j++) {
        valorInteranual *= 1 + serieInflacion[i - j];
      }
      valorInteranual -= 1;

      ipcInteranual.push(valorInteranual);
    }
  }

  return ipcInteranual;
}

async function actualizarInflacion() {
  try {
    const res = await inflacionApi.get('')
    const datosApi = res.data.data

    const fechas = datosApi.map(dato => dato[0])
    const ipcMensual = datosApi.map(dato => dato[1])
    const ipcInteranual = calculadoraInteranual(ipcMensual)

    const datoInflacion = {
      'nombre': 'inflacion',
      'fechas': fechas,
      'datosHistoricos': {
        'mensual': ipcMensual.map(val => val * 100),
        'interanual': ipcInteranual.map(val => val * 100),
      },
      'datosActuales': {}
    }

    const coleccionDatos = await Dato.find({nombre: 'inflacion'})
    if (coleccionDatos.length === 0) {await Dato.create(datoInflacion)}
    else {await Dato.findOneAndReplace({nombre: 'inflacion'}, datoInflacion)}
  }

  catch(e) {console.log(e)}
}

// Crimen

const metadata = [
  {
    homicidios: 'snic_hdt_arg',
    robos: 'snic_rt_arg',
    nombre: 'Pais',
  },
  {
    homicidios: 'snic_hdt_06',
    robos: 'snic_rt_06',
    nombre: 'Buenos Aires',
  },
  {
    homicidios: 'snic_hdt_82',
    robos: 'snic_rt_82',
    nombre: 'Santa Fe',
  },
  {
    homicidios: 'snic_hdt_02',
    robos: 'snic_rt_02',
    nombre: 'Caba',    
  },
  {
    homicidios: 'snic_hdt_58',
    robos: 'snic_rt_58',
    nombre: 'Neuquen',    
  },
  {
    homicidios: 'snic_hdt_14',
    robos: 'snic_rt_14',
    nombre: 'Cordoba',    
  },
  {
    homicidios: 'snic_hdt_34',
    robos: 'snic_rt_34',
    nombre: 'Formosa',    
  },
];

const codigosHomicidios = metadata.map(data => data.homicidios).join(',');
const apiHomicidios = axios.create({
  baseURL: `http://apis.datos.gob.ar/series/api/series/?ids=${codigosHomicidios}`,
});

const codigosRobos = metadata.map(data => data.robos).join(',');
const apiRobos = axios.create({
  baseURL: `http://apis.datos.gob.ar/series/api/series/?ids=${codigosRobos}`,
});

async function actualizarCrimen() {
  try {

    const resHomicidios = await apiHomicidios.get('');
    const datosHomicidios = resHomicidios.data.data;
  
    const resRobos = await apiRobos.get('');
    const datosRobos = resRobos.data.data;
  
    const fechas = datosHomicidios.map(dato => dato[0]);
  
    const dataTotal = {};
  
    for (let i = 0; i < metadata.length; i++) {
      const nombre = metadata[i].nombre;
      const tasaPaisHomicidios = datosHomicidios.map(dato => dato[i + 1]);
      const tasaPaisRobos = datosRobos.map(dato => dato[i + 1]);
  
      const datosProvincia = {
        fechas: fechas,
        datosActuales: {},
        datosHistoricos: {
          homicidios: tasaPaisHomicidios,
          robos: tasaPaisRobos,
        }
      }
  
      dataTotal[nombre] = datosProvincia;
    }
  
    const datosFormateados = {
      nombre: 'crimen',
      data: dataTotal
    }

    const coleccionDatos = await Datos.find({nombre: 'crimen'})
    if (coleccionDatos.length === 0) {await Datos.create(datosFormateados)}
    else {await Datos.findOneAndReplace({nombre: 'crimen'}, datosFormateados)}

    return 'updated'
  }

  catch(e) {console.log(e)}
}

// Pobreza
const pobreza = [30.3, 28.6, 25.7, 27.3, 32.0, 35.4, 35.5, 40.9, 42.0, 40.6, 37.3, 36.5, 39.2]
const indigencia = [6.1, 6.2, 4.8, 4.9, 6.7, 7.7, 8.0, 10.5, 10.5, 10.7, 8.2, 8.8, 8.1]
const fechas = ['2017-01-01', '2017-06-01', '2018-01-01','2018-06-01', '2019-01-01', '2019-06-01', '2020-01-01',
                '2020-06-01', '2021-01-01','2021-06-01', '2022-01-01', '2022-06-01', '2023-01-01']
            
async function actualizarPobreza() {
  try {
    const datoPobreza = {
      nombre: 'pobreza',
      fechas: fechas,
      datosHistoricos: {
        pobreza: pobreza,
        indigencia: indigencia
      },
      datosActuales: {}
    }

    const coleccionDatos = await Dato.find({nombre: 'pobreza'})
    if (coleccionDatos.length === 0) {await Dato.create(datoPobreza)}
    else {await Dato.findOneAndReplace({nombre: 'pobreza'}, datoPobreza)}
  }

  catch(e) {console.log(e)}
}

// Empleo
const ids = {
  desempleo: '45.1_ECTDT_0_A_33',
  empleo: '44.2_ECTET_0_T_30',
  actividad: '43.2_ECTAT_0_T_33',
};

const empleoApi = axios.create({
  baseURL: `http://apis.datos.gob.ar/series/api/series/?ids=${ids.desempleo},${ids.empleo},${ids.actividad}&format=json`,
});

async function actualizarEmpleo() {
  try {
    const res = await empleoApi.get('')
    const datosApi = res.data.data

    const datoEmpleo = {
      nombre: 'empleo',
      fechas: datosApi.map(dato => dato[0]),
      datosActuales: {},
      datosHistoricos: {
        desempleo: datosApi.map(dato => (dato[1]) * 100),
        empleo: datosApi.map(dato => dato[2] * 100),
        actividad: datosApi.map(dato => dato[3] * 100),
      }
    }

    const coleccionDatos = await Dato.find({nombre: 'empleo'})
    if (coleccionDatos.length === 0) {await Dato.create(datoEmpleo)}
    else {await Dato.findOneAndReplace({nombre: 'empleo'}, datoEmpleo)}
  }

  catch(e) {console.log(e)}
}

// Producto
const apiTotal = axios.create({
  baseURL: 'http://api.worldbank.org/v2/country/ar/indicator/NY.GDP.MKTP.PP.KD?format=json'
})

const apiPerCapita = axios.create({
  baseURL: 'http://api.worldbank.org/v2/country/ar/indicator/NY.GDP.PCAP.PP.KD?format=json'
})

async function actualizarProducto() {
  try {
    const resPerCapita = await apiPerCapita.get('');
    const resTotal = await apiTotal.get('');

    const dataPerCapita = resPerCapita.data[1];
    const dataTotal = resTotal.data[1];
    
    const datoProducto = {
      nombre: 'producto',
      fechas: dataPerCapita.map(data => data.date).reverse(),
      datosHistoricos: {
        'GDP': dataTotal.map(data => data.value / 1000000000).reverse(),
        'GDP Per Capita': dataPerCapita.map(data => data.value / 1000).reverse(),
      },
      datosActuales: {},
    }

    const coleccionDatos = await Dato.find({nombre: 'producto'})
    if (coleccionDatos.length === 0) {await Dato.create(datoProducto)}
    else {await Dato.findOneAndReplace({nombre: 'producto'}, datoProducto)}
  }
  
  catch(e) {console.log(e)}
}

// Emision
const apiEmision = axios.create({
  baseURL: 'http://apis.datos.gob.ar/series/api/series/?ids=300.1_AP_PAS_BASRIA_0_M_21&format=json&start_date=2015-01',
})

async function actualizarEmision() {
  try {
    const res = await apiEmision.get('')
    const datosApi = res.data.data
  
    const fechas = datosApi.map(dato => dato[0])
    const baseMonetaria = datosApi.map(dato => dato[1] / 1000000)

    const datoEmision = {
      'nombre': 'emision',
      'fechas': fechas,
      'datosHistoricos': {'emision': baseMonetaria},
      'datosActuales': {}
    }

    const coleccionDatos = await Dato.find({nombre: 'emision'})
    if (coleccionDatos.length === 0) {await Dato.create(datoEmision)}
    else {await Dato.findOneAndReplace({nombre: 'emision'}, datoEmision)}
  }

  catch(e) {console.log(e)}
}

// Barrios populares
const barriosApi = axios.create({
  baseURL: 'https://datosabiertos.desarrollosocial.gob.ar/dataset/0d022767-9390-486a-bff4-ba53b85d730e/resource/97cc7d10-ad4c-46cb-9ee4-becb402adf9f/download/2022-07-13_info_publica.geojson'
})

async function actualizarBarrios() {
  try {
    const res = await barriosApi.get('')
    const datos = res.data
    
    const jsonStr = JSON.stringify(datos);
    const compressedData = pako.gzip(jsonStr, {level: 9});
    const buffer = Buffer.from(compressedData);

    const datoBarrios = {
      nombre: 'barrios',
      geoData: buffer
    }

    const coleccionDatos = await GeoDato.find({nombre: 'barrios'})
    if (coleccionDatos.length === 0) {await GeoDato.create(datoBarrios)}
    else {await GeoDato.findOneAndReplace({nombre: 'barrios'}, datoBarrios)}
  }

  catch(e) {console.log(e)}
}

// Merval
const hoy1 = new Date();
const hoyFormateado = hoy1.toLocaleDateString('en-GB').replace(/\//g, '-');

const apiMerval = axios.create({
  baseURL: `https://mercados.ambito.com//indice/.merv/historico-general/01-01-2022/${hoyFormateado}`,
});

const apiCcl = axios.create({
  baseURL: `https://mercados.ambito.com//dolarrava/cl/historico-general/01-01-2022/${hoyFormateado}`,
})

async function actualizarMerval() {
  try { 
    const resMerval = await apiMerval.get('')
    const resCcl = await apiCcl.get('')

    // Dividir el dato de merval por el correspondiente en ccl (se pueden desfasar los dias).
    const mervalPesos = resMerval.data.slice(1).map(valor => parseFloat(valor[2].replace('.', '').replace(',', '.')))
    const variacion = resMerval.data.slice(1).map(valor => parseFloat(valor[3].replace(',', '.')))
    const fechas = resMerval.data.slice(1).map(valor => valor[0])

    const valoresCcl = resCcl.data.slice(1).map(valor => parseFloat(valor[1].replace(',', '.')))
    const fechasCcl = resCcl.data.slice(1).map(valor => valor[0].replaceAll('/', '-'))

    const indicesCclMerval = fechas.map(fecha => fechasCcl.indexOf(fecha))  // los indices de fechasCcl que coinciden con fechas

    const mervalDolares = []
    for (let i = 0; i < mervalPesos.length; i++) {
      mervalDolares.push(mervalPesos[i] / valoresCcl[indicesCclMerval[i]])
    }

    for (let i = 0; i < mervalDolares.length; i++) {
      if (typeof variacion[i] !== 'number') {
        console.log(mervalDolares[i])
      }
    }

    const datoMerval = {
      nombre: 'merval',
      fechas: fechas.reverse(),
      datosActuales: {},
      datosHistoricos: {
        merval: mervalDolares.reverse(),
        variacion: variacion.reverse(),
      },
    }

    const coleccionDatos = await Dato.find({nombre: 'merval'})
    if (coleccionDatos.length === 0) {await Dato.create(datoMerval)}
    else {await Dato.findOneAndReplace({nombre: 'merval'}, datoMerval)}
  }

  catch(e) {console.log(e)}
}

// Cortes de luz
const listaCortesRegex = /var addressPoints_Cuadro_D = \[.+\]/
const elementosRegex = /\[[-\d\.]+,[-\d\s\.]+,[\s\d]+,[\s"]+.+?"\]/g

async function actualizarCortes() {
  try {
    const res = await axios.get('https://www.enre.gov.ar/mapaCortes/datos/Datos_PaginaWeb.js')
    const data = res.data

    const listaComoString = listaCortesRegex.exec(data)[0].replace('var addressPoints_Cuadro_D = ', '')
    const elementosListaString = listaComoString.match(elementosRegex)

    const elementosParseados = elementosListaString.map(elem => JSON.parse(elem))

    const features = elementosParseados.map(elem => {
      return {
        type: "Feature",
        properties: {
          popupData: elem[3],
        },
        geometry: {
          type: "Point",
          coordinates: [elem[1], elem[0]]
        }
      }
    })

    const cortesGeoJson = {
      type: "FeatureCollection",
      features: features
    }

    const jsonStr = JSON.stringify(cortesGeoJson);
    const compressedData = pako.gzip(jsonStr, {level: 9});
    const buffer = Buffer.from(compressedData);

    const datosCortes = {
      nombre: "cortes",
      geoData: buffer,
    }

    const coleccionDatos = await GeoDato.find({nombre: 'cortes'})
    if (coleccionDatos.length === 0) {await GeoDato.create(datosCortes)}
    else {await GeoDato.findOneAndReplace({nombre: 'cortes'}, datosCortes)}
  }

  catch(e) {console.log(e)}
}

// Riesgo pais
const riesgoApi = axios.create({
  baseURL: `https://mercados.ambito.com//riesgopais/historico-general/01-01-2013/${hoyFormateado}`
});

async function actualizarRiesgo() {
  try {
    const resRiesgo = await riesgoApi.get('');
    const riesgoPais = resRiesgo.data.slice(1).map(dato => parseFloat(dato[1]))
    const fechas = resRiesgo.data.slice(1).map(dato => dato[0])

    const datoRiesgo = {
      nombre: 'riesgo',
      fechas: fechas.reverse(),
      datosActuales: {},
      datosHistoricos: {
        'Riesgo Pais': riesgoPais.reverse()
      },
    }

    const coleccionDatos = await Dato.find({nombre: 'riesgo'})
    if (coleccionDatos.length === 0) {await Dato.create(datoRiesgo)}
    else {await Dato.findOneAndReplace({nombre: 'riesgo'}, datoRiesgo)}
  }

  catch(e) {console.log(e)}
}


// Commodities

module.exports = {actualizarDolar, actualizarInflacion, actualizarCrimen, actualizarPobreza, actualizarEmpleo,
                  actualizarProducto, actualizarEmision, actualizarBarrios, actualizarMerval, actualizarCortes,
                  actualizarRiesgo}
