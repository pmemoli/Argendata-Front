import React from 'react'

export default function ShowcaseOptions({modo, datos, rangoHistorico, setRangoHistorico}): JSX.Element {
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

  if (modo === 'carta') return (<></>)
  
  else return (
    <div className={`mt-5 p-1 flex justify-between mb-1 z-[1] sm:text-xl`}>
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
  )
}
