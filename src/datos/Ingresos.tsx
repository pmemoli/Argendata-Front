import {useState, useEffect} from 'react';
import DatosAnaliticos from './components/DatosAnaliticos';
import {getDataAnalitica} from './utilidades/getDataAnalitica';

interface datosIngresosInterface {
  fechas: string[],
  datosHistoricos: {
    mediana: number[],
    media: number[],
  },
  datosActuales: {},
};
                          
const hoy: Date = new Date();
const fechaComienzoDatos: Date = new Date('2000/01/01');  

const info: string = 
`Mediana, media (promedio) e indice gini de los ingresos per capita de toda la 
poblacion (ingresos totales en la familia / cantidad integrantes) e 
ingresos per capita dentro de la poblacion con ingresos.

El grafico muestra el ingreso ajustado por inflacion (ipc) en base de pesos
de 01/01/2017. El indicador muestra el valor real del ultimo mes reportado.

Se calcula el ingreso ajustado con la formula
Salario Ajustado = Salario Real * 1 / (1 + Inflacion Acumulada Desde 2017 / 100)

Fuente Indec.

https://www.indec.gob.ar/indec/web/Nivel4-Tema-4-31-60 para ingresos

https://www.datos.gob.ar/series/api/series/?ids=173.1_INUCLEOLEO_DIC-_0_10 para ipc`

export default function Ingresos({modo, cacheData, setCacheData}): JSX.Element {  
  const [datosIngresos, setDatosIngresos] = useState<datosIngresosInterface>();
  const [ultimaActualizacion, setUltimaActualizacion] = useState<string>();
  const [estado, setEstado] = useState<string>('Total');
  const [estadosPosibles, setEstadosPosibles] = useState<string[]>();

  useEffect(() => {getDataAnalitica('ingresos', cacheData, setCacheData, setDatosIngresos, setUltimaActualizacion, true, setEstadosPosibles)}, []);

  function renderContent(): JSX.Element {
    if (datosIngresos === undefined) return (
      <div className='sm:text-xl'>
        Cargando...
      </div>
    )
   
    else return (
    <div>
      <DatosAnaliticos 
      nombre='Ingresos Per Capita'
      modo={modo}
      datos={datosIngresos[estado]}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad=''
      unidades={{'mediana': '$', 'media': '$', 'gini': ''}}
      mostrarValores={true}
      round={3}
      manejoEstados={{
        setEstado: setEstado,
        estadosPosibles: estadosPosibles,
        estado: 'Total',
        slider: true,
      }}
      textoInfo={info}
      ultimaActualizacion={ultimaActualizacion}
      path='ingresos'
      />
    </div>
    )
  }

  return (
  <div className='z-[1]'>
    {renderContent()}
  </div>
  )
}
