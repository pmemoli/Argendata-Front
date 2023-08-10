export const datosDisponibles = {
    'Dólar y Finanzas': [
      {nombre: 'Dólar', path: 'dolar',
      descripcion: 'Principales cotizaciones del dólar.'},

      {nombre: 'Merval', path: 'merval',
      descripcion: 'Índice S&P Merval del mercado de valores de Buenos Aires.'},
      
      {nombre: 'Riesgo País', path: 'riesgo',
      descripcion: 'El Riesgo País de la Argentina segun JP Morgan.'},
    ],
  
    'Macro': [
      {nombre: 'PBI', path: 'producto',
      descripcion: 'Producto Bruto Interno total y per capita.'},

      {nombre: 'Inflación', path: 'inflacion',
      descripcion: 'IPC mensual e interanual'},
      
      {nombre: 'Trabajo', path: 'trabajo',
      descripcion: 'Principales tasas de trabajo: empleo, desempleo y actividad.'},
      
      {nombre: 'Ingresos', path: 'ingresos',
      descripcion: 'Ingresos por familia y per capita'},
      
      {nombre: 'Distribución Ingresos', path:'distribucion',
      descripcion: 'Distribución de los ingresos segun deciles.'},
      
      {nombre: 'Gasto Público', path: 'gasto', 
      descripcion: 'Gasto público consolidado en porcentaje del PBI.'},
    ],
  
    'Sociedad': [
      {nombre: 'Pobreza', path: 'pobreza',
      descripcion: 'Porcentaje de la población bajo la línea de pobreza e indigencia.'},

      {nombre: 'Crimen', path: 'crimen',
      descripcion: 'Tasa de homicidios y robos cada 100 mil personas.'},
    ],
  
    'BCRA': [
      {nombre: 'Base Monetaria', path: 'basemonetaria',
      descripcion: 'Base monetaria en activos y pasivos emitidos por el BCRA.'},
    ],
  
    'Mapas': [
      {nombre: 'Cortes de Luz AMBA', path: 'cortes',
      descripcion: 'Cortes de luz en el AMBA a tiempo real.'},

      {nombre: 'Barrios Populares', path: 'barrios', 
      descripcion: 'Ubicación de todos los barrios populares del país.'}
    ]
}

export const pathesAnaliticos = []
export const pathesGeograficos = []
for (let key of Object.keys(datosDisponibles)) {
    for (let elem of datosDisponibles[key]) {
        if (key !== 'Mapas') {
            pathesAnaliticos.push(elem.path)
        }
        else {
            pathesGeograficos.push(elem.path)
        }
    }
}