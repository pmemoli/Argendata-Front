interface datoItem {
  nombre: string,
  path: string,
}

export const datosPosibles: datoItem[] = [
    {nombre: 'Dolar', path: 'dolar'}, {nombre: 'Inflacion', path: 'inflacion'}, {nombre: 'Emision', path: 'emision'},
    {nombre: 'Crimen', path: 'crimen'}, {nombre: 'Pobreza', path: 'pobreza'}, {nombre: 'Producto', path: 'producto'},
    {nombre: 'Empleo', path: 'empleo'}, {nombre: 'Merval', path: 'merval'}, {nombre: 'Riesgo Pais', path: 'riesgo'},
    {nombre: 'Gasto Publico', path: 'gasto'}, {nombre: 'Ingresos Per Capita', path: 'ingresos'}, 
    {nombre: 'Distribucion Ingreso', path: 'distribucion'},
    {nombre: 'Barrios Populares', path: 'barrios'}, {nombre: 'Cortes de Luz', path: 'cortes'},
  ];
