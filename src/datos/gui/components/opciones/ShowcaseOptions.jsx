import React from 'react'
import CompareOptions from './CompareOptions';

export default function ShowcaseOptions({modo, datos, rangoHistorico, setRangoHistorico, setComparar, bar}) {
  function downloadData() {
    const st = JSON.stringify(datos);
    const blob = new Blob([st], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "datos.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  console.log(Object.keys(datos[Object.keys(datos)[0]]['datosHistoricos']))

  if (modo === 'carta') return (<></>)
  
  else return (
    <div className='mt-5 p-1 mb-1 z-[1] sm:text-xl'>
      {(Object.keys(datos).length > 1 || Object.keys(datos[Object.keys(datos)[0]]['datosHistoricos']).length > 1) &&
       <CompareOptions datos={datos} setComparar={setComparar} bar={bar}/>}
      <div className='flex justify-between'>
        <div>
          <div className='mb-2'>
            <label>Desde:</label>
            <input onChange={e => {
              setRangoHistorico([new Date(e.target.value), rangoHistorico[1]])
            }} className='text-black ml-1 pl-1 font-light bg-zinc-400 z-[1] relative' type='date'/>
          </div>

          <div>
            <label>Hasta:</label>
            <input onChange={e => {
              setRangoHistorico([rangoHistorico[0], new Date(e.target.value)])
            }} className='text-black ml-2 pl-1 font-light bg-zinc-400 z-[1] relative' type='date'></input>
          </div>
        </div>

        <button onClick={() => {downloadData()}} className='mr-2 text-black font-light bg-zinc-400 p-1 rounded-md z-[1]'>Descargar datos</button>
      </div>
    </div>
  )
}
