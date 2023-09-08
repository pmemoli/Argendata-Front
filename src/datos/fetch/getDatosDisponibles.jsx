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

      {nombre: 'Deuda', path: 'deuda',
      descripcion: 'Deuda en millones de dólares y % del PBI.'},

      {nombre: 'Déficit Fiscal', path: 'deficit',
      descripcion: 'Déficit fiscal financiero y primario.'},

      {nombre: 'Gasto Público', path: 'gasto', 
      descripcion: 'Gasto público consolidado en porcentaje del PBI.'},
      
      {nombre: 'Balanza Comercial', path: 'balanza',
      descripcion: 'Balanza comercial en millones de dolares.'},
    ],
  
    'Sociedad': [
      {nombre: 'Pobreza', path: 'pobreza',
      descripcion: 'Porcentaje de la población bajo la línea de pobreza e indigencia.'},

      {nombre: 'Crimen', path: 'crimen',
      descripcion: 'Tasa de homicidios y robos cada 100 mil personas.'},

      {nombre: 'Ingresos', path: 'ingresos',
      descripcion: 'Ingresos por familia y per capita'},

      {nombre: 'Trabajo', path: 'trabajo',
      descripcion: 'Principales tasas de trabajo: empleo, desempleo y actividad.'},

      {nombre: 'Compos. Empleo', path: 'composempleo',
      descripcion: 'Porcentaje de empleo no registrado, registrado privado y registrado público.'},

      {nombre: 'Canasta', path: 'canasta',
      descripcion: 'Canasta básica y alimentaria en pesos por adulto individual y hogar.'},

      {nombre: 'Desigualdad', path:'distribucion',
      descripcion: 'Distribución de los ingresos segun deciles.'},
    ],
  
    'BCRA': [
      {nombre: 'Base Monetaria', path: 'basemonetaria',
      descripcion: 'Base monetaria en activos y pasivos emitidos por el BCRA.'},

      {nombre: 'Tasa de Interés', path: 'tasainteres',
      descripcion: 'Tasa de interés, promedio mensual en porcentaje nominal anual. Por depósitos a plazo fijo de 30 a 59 días de plazo.'},

      {nombre: 'Reservas del BCRA', path: 'reservas',
      descripcion: 'Reservas internacionales del BCRA en millónes de dolares estadounidenses.'},
    ],

    'Demografia': [
      {nombre: 'Cant. Habitantes', path: 'poblacion',
      descripcion: 'Cantidad de habitantes.'},

      {nombre: 'Migración', path: 'migracion',
      descripcion: 'Inmigración total y como porcentaje de la población. Migración neta (inmigrantes - emigrantes) por año.'},

      {nombre: 'Natalidad', path: 'natalidad',
      descripcion: 'Tasa de natalidad, nacidos vivos en un año.'},

      {nombre: 'Mortalidad', path: 'mortalidad',
      descripcion: 'Tasa de mortalidad total e infantil en un año.'},

      {nombre: 'Esperanza de vida', path: 'esperanza',
      descripcion: 'Esperanza de vida.'},
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