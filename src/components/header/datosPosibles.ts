interface datoItem {
    nombre: string,
    path: string,
  }
  
export const datosPosibles: datoItem[] = [
    {nombre: 'Dolar', path: 'dolar'}, {nombre: 'IPC', path: 'inflacion'}, {nombre: 'Emision', path: 'emision'},
    {nombre: 'Crimen', path: 'crimen'}, {nombre: 'Pobreza', path: 'pobreza'}, {nombre: 'Produccion', path: 'producto'},
    {nombre: 'Empleo', path: 'empleo'}, {nombre: 'Merval', path: 'merval'}, {nombre: 'Riesgo Pais', path: 'riesgo'},
    {nombre: 'Gasto Publico', path: 'gasto'}, {nombre: 'Barrios Populares', path: 'barrios'}, {nombre: 'Cortes de Luz', path: 'cortes'}
  ];
  