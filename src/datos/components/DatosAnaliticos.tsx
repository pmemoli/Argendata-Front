import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import LineChart from '../../components/LineChart';
import Select from 'react-select';
import DropdownMenu from '../../components/DropdownMenu';

interface DataAnalitica {
  fechas: string[],
  datosHistoricos: {
    [datos: string]: number[]
  },
  datosActuales: {
    [datos: string]: number,
  }
};

interface ParametrosAceptados {
  nombre: string,
  modo: 'carta' | 'pagina',
  datos: DataAnalitica,
  rangoInicial: Date[],
  unidad: string,
  mostrarValores: boolean,
  manejoEstados: {
    estadosPosibles?: string[],
    setEstado?: React.Dispatch<React.SetStateAction<string>>,
    slider?: boolean,
    estado?: string,
  },
  round: number,
};

interface Chart {
  labels: string[],
  datasets: [{
    label: string,
    data: number[],
  }]
};

interface TiposDatos {
  cronologia: string,
  nombreDatos: string,
}

function getTipos(datos: DataAnalitica): TiposDatos[] {
  const tipos: TiposDatos[] = [];
  Object.keys(datos).map((tipoTiempo: string): void => {
    if (tipoTiempo !== 'fechas') {
      Object.keys(datos[tipoTiempo]).map((tipoDato: string): void => {
        tipos.push({'cronologia': tipoTiempo, 'nombreDatos': tipoDato});
      })
    };
  });

  return tipos;
}

export default function DatosAnaliticos({nombre, modo, datos, rangoInicial, unidad, mostrarValores, manejoEstados, round}: ParametrosAceptados): JSX.Element {
  const tipos: TiposDatos[] = getTipos(datos);

  const [indiceEstado, setIndiceEstado] = useState<number>(0);
  const [tipo, setTipo] = useState<string>(tipos[0].nombreDatos);  
  const [rangoHistorico, setRangoHistorico] = useState<Date[]>(rangoInicial);

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

    if (fechaHasta === rangoInicial[1]) return [indiceDesde];
    else return [indiceDesde, indiceHasta + 1];
  }

  function downloadData(): void {
    const st: string = JSON.stringify(datos);
    const blob: Blob = new Blob([st], { type: 'application/json' });
    const url: string = URL.createObjectURL(blob);

    const link: HTMLAnchorElement = document.createElement("a");
    link.href = url;
    link.download = "datos.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const chartData: Chart = {
    labels: datos.fechas.slice(...setIndices(...rangoHistorico)),
    datasets: [{
      label: nombre,
      data: datos.datosHistoricos[tipo].slice(...setIndices(...rangoHistorico)),
    }]
  };

  function renderEstadoButton(): JSX.Element {
    if (manejoEstados.estadosPosibles !== undefined) {
      if (manejoEstados.slider === false) {
        return (
          <button onClick={() => {
            manejoEstados.setEstado(manejoEstados.estadosPosibles[(indiceEstado + 1) % (manejoEstados.estadosPosibles.length)]);
            setIndiceEstado((indiceEstado + 1) % (manejoEstados.estadosPosibles.length));
            }} className='absolute ml-1'>
            {manejoEstados.estadosPosibles[indiceEstado].charAt(0).toUpperCase() + manejoEstados.estadosPosibles[indiceEstado].slice(1)}
          </button>
        );
      }

      else {
        return (
          <DropdownMenu optionArray={manejoEstados.estadosPosibles} selectedOption={manejoEstados.estado} setOption={manejoEstados.setEstado}/>
        );
      }
    }

    else return <></>;
  };

  function renderPage(): JSX.Element {
    if (modo === 'pagina') return (
      <div className={`mt-5 p-1 flex justify-between mb-1 z-[1]`}>
        <div>
          <div className='mb-2'>
            <label>Desde:</label>
            <input onChange={e => {
              setRangoHistorico([new Date(e.target.value), rangoHistorico[1]])
            }} className='text-black ml-1 pl-1 bg-gray-400 z-[1] relative' type='date'/>
          </div>

          <div>
            <label>Hasta:</label>
            <input onChange={e => {
              setRangoHistorico([rangoHistorico[0], new Date(e.target.value)])
            }} className='text-black ml-2 pl-1 bg-gray-400 z-[1] relative' type='date'></input>
          </div>
        </div>

        <button onClick={() => {downloadData()}} className='mr-2 text-black bg-gray-400 p-1 rounded-md z-[1]'>Descargar datos</button>
      </div>
    )
  }

  return (
    <div className='border-2 rounded-md mb-3 ml-2 mr-2 p-1 pl-2 z-[1] relative'>

    {renderEstadoButton()}

    <Link to={`/${nombre.toLowerCase()}`}>
      <h2 className="text-xl flex justify-center mt-1 mb-2 z-[1]">{nombre}</h2>    
    </Link>

    <div className='mb-3 overflow-x-scroll whitespace-nowrap scroll-smooth no-scrollbar'>
      <div className="flex justify-around">
        {tipos.map((val: TiposDatos): JSX.Element => {
          if (!mostrarValores) return <></>

          if (val.cronologia === 'datosHistoricos') {
            return (
              <button onClick={() => setTipo(val.nombreDatos)} className={`${val.nombreDatos === tipo ? 'bg-slate-700': ''} p-1 rounded-sm z-[1]`}>
                <h3>
                  {val.nombreDatos.charAt(0).toUpperCase() + val.nombreDatos.slice(1)}
                  : {datos[val.cronologia][val.nombreDatos][datos[val.cronologia][val.nombreDatos].length - 1].toFixed(round)}{unidad}
                  </h3>
              </button>
            )
          }

          else {
            return (
              <h3 className='p-1 z-[1]'>{val.nombreDatos}: {datos[val.cronologia][val.nombreDatos].toFixed(round)}{unidad}</h3>                
            )
          }
        })}
      </div>
    </div>

    <div className='mb-2'>
      <LineChart chartData={chartData}/>
    </div>

    {renderPage()}
    </div>
  )
}
