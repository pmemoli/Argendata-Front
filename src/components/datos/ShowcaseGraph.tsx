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
  function setIndices(fechaDesde=rangoHistorico[0], fechaHasta=rangoHistorico[1]): number[] {
    const fechas: string[] = datos.fechas;

    let indiceDesde: number = 0;
    let indiceHasta: number = fechas.length - 1;

    for (let i = 0; i < fechas.length - 1; i++) {
      let prefix = '';

      const fechaDate1: Date = new Date(parseDateString(prefix + fechas[i]));
      const fechaDate2: Date = new Date(parseDateString(prefix + fechas[i + 1]));

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

  //console.log(datos.fechas.map(fecha => formatearFecha(new Date(fecha))));

  const chartData: Chart = {
    labels: datos.fechas.slice(...setIndices(...rangoHistorico)),
    datasets: [{
      label: tipo,
      data: datos.datosHistoricos[tipo].slice(...setIndices(...rangoHistorico)),
      borderWidth: 2,
      pointRadius: 0.7,
      pointHitRadius: 7,
    }]
  };

  return (
    <div className={`mb-2 h-48 ${modo === 'carta' ? 'sm:h-[17rem]' : 'sm:h-[20rem]'}`}>
      <LineChart chartData={chartData} histogram={histogram}/>
    </div>
  )
}
