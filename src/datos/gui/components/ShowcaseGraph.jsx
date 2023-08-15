import LineChart from './LineChart'

function parseDateString(dateString) {
  // Split the string into [dd, mm, yyyy]
  let parts = dateString.split('-')

  // Note: JavaScript counts months from 0, so we subtract 1 from the month number
  let date = new Date(parts[2], parts[1] - 1, parts[0])

  return date
}

export default function ShowcaseGraph({modo, rangoHistorico, datos, nombre, rangoInicial, tipo, bar}) {
  function setIndices(fechas, fechaDesde=rangoHistorico[0], fechaHasta=rangoHistorico[1]) {
    let indiceDesde = 0
    let indiceHasta = fechas.length - 1

    for (let i = 0; i < fechas.length - 1; i++) {
      const fechaDate1 = new Date(parseDateString(fechas[i].replaceAll('/', '-')));
      const fechaDate2 = new Date(parseDateString(fechas[i + 1].replaceAll('/', '-')));

      if (fechaDate1 < fechaDesde && fechaDesde <= fechaDate2) {
        indiceDesde = i + 1
      }
      
      if (fechaDate1 < fechaHasta && fechaHasta <= fechaDate2) {
        indiceHasta = i + 1
      }
    }

    const extremoInvalido = datos.datosHistoricos[tipo][indiceHasta] === 0 || datos.datosHistoricos[tipo][indiceHasta] === null;
    
    if (extremoInvalido) {
      indiceHasta -= 1
    }
    if (datos.datosHistoricos[tipo][indiceDesde] === 0 || datos.datosHistoricos[tipo][indiceDesde] === null) {
      indiceDesde += 1
    }

    if (fechaHasta === rangoInicial[1] && !extremoInvalido) return [indiceDesde]
    else return [indiceDesde, indiceHasta + 1]
  }

  // Setea bien las fechas
  let fechas
  if (Array.isArray(datos.fechas)) {
    fechas = datos.fechas.map(fecha => fecha.toString())
  }
  else {
    fechas = datos.fechas[tipo].map(fecha => fecha.toString())
  }

  // Agrega el dato actual como hoy si no esta
  let today = new Date();
  let formattedDate = today.toLocaleDateString("en-GB").replaceAll('/', '-');

  const diaHabil = !(today.getDay() === 6) && !(today.getDay() === 0);
  const faltaFecha = fechas[fechas.length - 1] !== formattedDate;
  const hayDatoActual = datos.datosActuales[tipo] !== undefined;

  const datosEjeX = [...datos.datosHistoricos[tipo]];

  if (hayDatoActual && diaHabil && nombre !== 'Ingresos' && nombre !== 'Distribución Ingreso') {
    if (faltaFecha) {
      fechas.push(formattedDate)
      datosEjeX.push(datos.datosActuales[tipo])  
    }
    else {
      datosEjeX[datosEjeX.length - 1] = datos.datosActuales[tipo]  
    }
  }

  const chartData = {
    labels: fechas.slice(...setIndices(fechas, ...rangoHistorico)),
    datasets: [{
      label: tipo,
      data: datosEjeX.slice(...setIndices(fechas, ...rangoHistorico)),
      borderWidth: 2,
      pointRadius: 0.7,
      pointHitRadius: 10,
    }]
  }

  return (
    <div className={`mb-2 h-48 ${modo === 'carta' ? 'sm:h-[17rem]' : 'sm:h-[20rem]'}`}>
      <LineChart chartData={chartData} bar={bar}/>
    </div>
  )
}
