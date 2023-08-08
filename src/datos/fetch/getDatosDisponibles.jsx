export const datosDisponibles = {
    'Dólar y Finanzas': [
      {nombre: 'Dólar', path: 'dolar'},
      {nombre: 'Merval', path: 'merval'},
      {nombre: 'Riesgo País', path: 'riesgo'},
    ],
  
    'Macro': [
      {nombre: 'PBI', path: 'producto'},
      {nombre: 'Inflación', path: 'inflacion'},
      {nombre: 'Trabajo', path: 'trabajo'},
      {nombre: 'Ingresos', path: 'ingresos'},
      {nombre: 'Distribución Ingresos', path:'distribucion'},
      {nombre: 'Gasto Público', path: 'gasto'},
    ],
  
    'Sociedad': [
      {nombre: 'Pobreza', path: 'pobreza'},
      {nombre: 'Crimen', path: 'crimen'},
    ],
  
    'BCRA': [
      {nombre: 'Base Monetaria', path: 'basemonetaria'},
    ],
  
    'Mapas': [
      {nombre: 'Cortes de Luz AMBA', path: 'cortes'},
      {nombre: 'Barrios Populares', path: 'barrios'}
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