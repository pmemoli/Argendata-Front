import LineChart from '../LineChart';

interface Chart {
  labels: string[],
  datasets: [{
    label: string,
    data: number[],
  }]
};

export default function ShowcaseGraph({modo, rangoHistorico, datos, nombre, rangoInicial, tipo}) {
  function setIndices(fechaDesde=rangoHistorico[0], fechaHasta=rangoHistorico[1]): number[] {
    const fechas: string[] = datos.fechas;

    let indiceDesde: number = 0;
    let indiceHasta: number = fechas.length - 1;

    for (let i = 0; i < fechas.length - 1; i++) {
      let prefix = '';
      if (nombre === 'Dolar') {
        prefix = '20';
      }

      const fechaDate1: Date = new Date(prefix + fechas[i]);
      const fechaDate2: Date = new Date(prefix + fechas[i + 1]);

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

  const chartData: Chart = {
    labels: datos.fechas.slice(...setIndices(...rangoHistorico)),
    datasets: [{
      label: tipo,
      data: datos.datosHistoricos[tipo].slice(...setIndices(...rangoHistorico)),
    }]
  };

  return (
    <div className={`mb-2 h-48 ${modo === 'carta' ? 'sm:h-[17rem]' : 'sm:h-[20rem]'}`}>
      <LineChart chartData={chartData}/>
    </div>
  )
}
