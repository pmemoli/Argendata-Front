import LineChart from '../LineChart';

interface Chart {
  labels: string[],
  datasets: [{
    label: string,
    data: number[],
    borderColor?: string,
    pointBackgroundColor?: string,
    borderWidth?: number,
    pointRadius?: number,
    pointHitRadius?: number,
  }]
};

function parseDateString(dateString) {
  // Split the string into [dd, mm, yyyy]
  let parts = dateString.split('-');

  // Note: JavaScript counts months from 0, so we subtract 1 from the month number
  let date = new Date(parts[2], parts[1] - 1, parts[0]);

  return date;
}

export default function ShowcaseGraph({modo, rangoHistorico, datos, nombre, rangoInicial, tipo, histogram}) {
  function setIndices(fechas, fechaDesde=rangoHistorico[0], fechaHasta=rangoHistorico[1]): number[] {
    let indiceDesde: number = 0;
    let indiceHasta: number = fechas.length - 1;

    for (let i = 0; i < fechas.length - 1; i++) {
      const fechaDate1: Date = new Date(parseDateString(fechas[i].replaceAll('/', '-')));
      const fechaDate2: Date = new Date(parseDateString(fechas[i + 1].replaceAll('/', '-')));

      if (fechaDate1 < fechaDesde && fechaDesde <= fechaDate2) {
        indiceDesde = i + 1;
      }
      
      if (fechaDate1 < fechaHasta && fechaHasta <= fechaDate2) {
        indiceHasta = i + 1;
      }
    }

    const extremoInvalido: boolean = datos.datosHistoricos[tipo][indiceHasta] === 0 || datos.datosHistoricos[tipo][indiceHasta] === null;
    
    if (extremoInvalido) {
      indiceHasta -= 1;
    }
    if (datos.datosHistoricos[tipo][indiceDesde] === 0 || datos.datosHistoricos[tipo][indiceDesde] === null) {
      indiceDesde += 1;
    }

    if (fechaHasta === rangoInicial[1] && !extremoInvalido) return [indiceDesde];
    else return [indiceDesde, indiceHasta + 1];
  }

  // Setea bien las fechas
  let fechas: string[];
  if (Array.isArray(datos.fechas)) {
    fechas = datos.fechas.map(fecha => fecha.toString());
  }
  else {
    fechas = datos.fechas[tipo].map(fecha => fecha.toString())
  }

  // Agrega el dato actual como hoy si no esta
  let today: Date = new Date();
  let formattedDate: string = today.toLocaleDateString("en-GB").replaceAll('/', '-');

  const diaHabil: boolean = !(today.getDay() === 6) && !(today.getDay() === 0);
  const faltaFecha: boolean = fechas[fechas.length - 1] !== formattedDate;
  const hayDatoActual: boolean = datos.datosActuales[tipo] !== undefined;

  if (faltaFecha && hayDatoActual && diaHabil && nombre !== 'Ingresos Per Capita') {
    fechas.push(formattedDate);
    datos.datosHistoricos[tipo].push(datos.datosActuales[tipo]);
  }

  const chartData: Chart = {
    labels: fechas.slice(...setIndices(fechas, ...rangoHistorico)),
    datasets: [{
      label: tipo,
      data: datos.datosHistoricos[tipo].slice(...setIndices(fechas, ...rangoHistorico)),
      borderWidth: 2,
      pointRadius: 0.7,
      pointHitRadius: 10,
    }]
  };

  return (
    <div className={`mb-2 h-48 ${modo === 'carta' ? 'sm:h-[17rem]' : 'sm:h-[20rem]'}`}>
      <LineChart chartData={chartData} histogram={histogram}/>
    </div>
  )
}
