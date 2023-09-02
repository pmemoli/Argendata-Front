import LineChart from './LineChart'

function parseDateString(dateString) {
  // Split the string into [dd, mm, yyyy]
  let parts = dateString.split('-')

  // Note: JavaScript counts months from 0, so we subtract 1 from the month number
  let date = new Date(parts[2], parts[1] - 1, parts[0])

  return date
}

function intersectionIndices(dates1, dates2) {
  const indices1 = [];
  const indices2 = [];

  dates1.forEach((date1, index1) => {
    dates2.forEach((date2, index2) => {
      if (date1 === date2) {
        indices1.push(index1);
        indices2.push(index2);
      }
    });
  });

  return [indices1, indices2];
}

function intersectionIndices3(dates1, dates2, dates3) {
  const set2 = new Set(dates2);
  const set3 = new Set(dates3);
  const indices1 = [];
  const indices2 = [];
  const indices3 = [];

  dates1.forEach((date, index) => {
    if (set2.has(date) && set3.has(date)) {
      indices1.push(index);
      indices2.push(dates2.indexOf(date));
      indices3.push(dates3.indexOf(date));
    }
  });

  return [indices1, indices2, indices3];
}

// El codigo de esto esta asqueroso e inescalable. Se modularizara en algun momento historico.
export default function ShowcaseGraph({modo, rangoHistorico, datos, nombre, rangoInicial, comparar, tipo, bar, estado}) {
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

  // Se queda con las intersecciones de fechas y datos
  let indicesOrig, indicesComp1, indicesComp2
  let valoresComp1, valoresComp2
  if (comparar[0] !== null && comparar[1] !== null) {
    [indicesOrig, indicesComp1, indicesComp2] = intersectionIndices3(fechas, comparar[0].fechas, comparar[1].fechas);

    fechas = indicesOrig.map(i => fechas[i])
  }
  else if (comparar[0] !== null) {
    [indicesOrig, indicesComp1] = intersectionIndices(fechas, comparar[0].fechas)

    fechas = indicesOrig.map(i => fechas[i])
  }
  else if (comparar[1] !== null) {
    [indicesOrig, indicesComp2] = intersectionIndices(fechas, comparar[1].fechas)

    fechas = indicesOrig.map(i => fechas[i])
  }

  // Agrega el dato actual como hoy si no esta
  let today = new Date();
  let formattedDate = today.toLocaleDateString("en-GB").replaceAll('/', '-');

  const diaHabil = !(today.getDay() === 6) && !(today.getDay() === 0);
  const faltaFecha = fechas[fechas.length - 1] !== formattedDate;
  const hayDatoActual = datos.datosActuales[tipo] !== undefined;

  let datosEjeX = [...datos.datosHistoricos[tipo]];

  if (comparar[0] !== null) {
    if (hayDatoActual && diaHabil && nombre !== 'Ingresos' && !bar) {
      indicesComp1.push(comparar[0].valores.length - 1)
    }

    datosEjeX = indicesOrig.map(i => datosEjeX[i])
    valoresComp1 = indicesComp1.map(i => comparar[0].valores[i])
  }

  if (comparar[1] !== null) {
    if (hayDatoActual && diaHabil && nombre !== 'Ingresos' && !bar) {
      indicesComp2.push(comparar[1].valores.length - 1)
    }

    if (comparar[0] === null) datosEjeX = indicesOrig.map(i => datosEjeX[i])
    valoresComp2 = indicesComp2.map(i => comparar[1].valores[i])
  }

  if (hayDatoActual && diaHabil && nombre !== 'Ingresos' && !bar) {
    if (faltaFecha) {
      fechas.push(formattedDate)
      datosEjeX.push(datos.datosActuales[tipo])
    }
    else {
      datosEjeX[datosEjeX.length - 1] = datos.datosActuales[tipo]  
    }
  }

  console.log(datosEjeX)
  console.log(datosEjeX.slice(...setIndices(fechas, ...rangoHistorico)))

  const chartData = {
    labels: fechas.slice(...setIndices(fechas, ...rangoHistorico)),
    datasets: [{
      label: `${bar ? 'Distribución' : tipo} - ${estado}`,
      data: datosEjeX.slice(...setIndices(fechas, ...rangoHistorico)),
      borderWidth: 2,
      pointRadius: 0.7,
      borderColor: 'rgba(52, 153, 222, 1)',
      backgroundColor: 'rgba(52, 153, 222, 0.5)',
      pointHitRadius: 12,
    }]
  }

  if (comparar[0] !== null) {
    chartData['datasets'].push({
      label: comparar[0].nombre,
      data: valoresComp1.slice(...setIndices(fechas, ...rangoHistorico)),
      borderWidth: 2,
      pointRadius: 0.7,
      pointHitRadius: 12,
      borderColor: 'rgba(255, 127, 14, 1)',
      backgroundColor: 'rgba(255, 127, 14, 0.5)',
    })
  }

  if (comparar[1] !== null) {
    chartData['datasets'].push({
      label: comparar[1].nombre,
      data: valoresComp2.slice(...setIndices(fechas, ...rangoHistorico)),
      borderWidth: 2,
      pointRadius: 0.7,
      pointHitRadius: 12,
      borderColor: 'rgba(139, 101, 223, 1)',
      backgroundColor: 'rgba(139, 101, 223, 0.5)',
    })
  }

  return (
    <div className={`mb-2 ${modo === 'carta' ? 'sm:h-[17rem]' : 'sm:h-[20rem]'}`}>
      <LineChart chartData={chartData} bar={bar}/>
    </div>
  )
}
