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
`Mediana, media (promedio) e indice gini de los ingresos per capita por familia
(ingresos totales / cantidad integrantes).

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

  useEffect(() => {getDataAnalitica('ingresos', cacheData, setCacheData, setDatosIngresos, setUltimaActualizacion)}, []);

  function renderContent(): JSX.Element {
    if (datosIngresos === undefined) return (
      <div className='sm:text-xl'>
        Cargando...
      </div>
    )
   
    else return (
    <div>
      <DatosAnaliticos 
      nombre='Ingresos Pais (Base 2017)'
      modo={modo}
      datos={datosIngresos}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad=''
      unidades={{'mediana': '$', 'media': '$', 'gini': ''}}
      mostrarValores={true}
      manejoEstados={{}}
      round={3}
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
