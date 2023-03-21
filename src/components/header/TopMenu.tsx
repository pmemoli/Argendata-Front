// @ts-nocheck

function setZ(toggled: bool): string {
  if (toggled) return 'z-0';
  else return 'z-50';
}

export default function TopMenu({toggled}) {
  const datosPosibles: string[] = [
    'Dolar', 'IPC', 'Clima', 'Emision', 'Cortes de Luz',
    'PBI', 'Pobreza', 'Crimen', 'Barrios populares', 'Incendios'
  ];

  return (
    <div className='text-md bg-slate-800 flex items-center ml-1'>
      <div id='slider' className={`w-full overflow-x-scroll whitespace-nowrap scroll-smooth no-scrollbar ${setZ(toggled)}`}>
        {datosPosibles.map((dato: string) => (
          <span className="mr-3">{dato}</span>
        ))}
       </div>
    
    </div>
  )
}
