import {useState} from 'react';
import DatosAnaliticos from './components/DatosAnaliticos';

const pobreza: number[] = [30.3, 28.6, 25.7, 27.3, 32.0, 35.4, 35.5, 40.9, 42.0, 40.6, 37.3, 36.5, 39.2];
const indigencia: number[] = [6.1, 6.2, 4.8, 4.9, 6.7, 7.7, 8.0, 10.5, 10.5, 10.7, 8.2, 8.8, 8.1];
const fechas: string[] = ['2017-01-01', '2017-06-01', '2018-01-01','2018-06-01', '2019-01-01', '2019-06-01', '2020-01-01',
                          '2020-06-01', '2021-01-01','2021-06-01', '2022-01-01', '2022-06-01', '2023-01-01'];

interface datosPobrezaInterface {
  fechas: string[],
  datosHistoricos: {
    pobreza: number[],
    indigencia: number[],
  },
  datosActuales: {},
};
                          

const hoy: Date = new Date();
const fechaComienzoDatos: Date = new Date('2000/01/01');  

const info: string = 
`Porcentaje de la poblacion bajo la linea de pobreza e indigencia.
Fuente Indec.
https://www.indec.gob.ar/indec/web/Nivel4-Tema-4-46-152`

export default function Pobreza({modo}): JSX.Element {  
  const [datosPobreza, setDatosPobreza] = useState<datosPobrezaInterface>({
    fechas: fechas,
    datosHistoricos: {
      pobreza: pobreza,
      indigencia: indigencia
    },
    datosActuales: {}
  });


  function renderContent(): JSX.Element {
    if (datosPobreza === undefined) return (
      <div>
        Cargando...
      </div>
    )
   
    else return (
    <div>
      <DatosAnaliticos 
      nombre='Pobreza'
      modo={modo}
      datos={datosPobreza}
      rangoInicial={[fechaComienzoDatos, hoy]}
      unidad='%'
      mostrarValores={true}
      manejoEstados={{}}
      round={1}
      textoInfo={info}
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
