import React from 'react'
import {useParams} from 'react-router-dom'
import {useState, useRef} from 'react'
import Resultados from './components/Resultados'

export default function Busqueda() {  
  const {busquedaInicial} = useParams()
  const [busqueda, setBusqueda] = useState(busquedaInicial)
  const inputRef = useRef()

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputRef.current.value !== '') {
      setBusqueda(inputRef.current.value)
    }
  }

  return (
    <div className='flex justify-center relative z[1] text-lg min-h-[70vh]' onKeyDown={handleKeyDown}>
      <div className='p-2 border-2 w-[90vw] border-zinc-600 sm:w-1/2 rounded-md'>
        <div className='relative flex justify-center w-full mb-2'>
          <input className='w-2/3 rounded-sm text-black pl-2 font-normal focus:outline-none'
          ref={inputRef} defaultValue={busquedaInicial}/>
          
          <button
          onClick={() => {setBusqueda(inputRef.current.value)}}
          className='ml-4 text-white text-lg sm:text-xl font-thin rounded-sm pl-2 pr-2'>
            Buscar
          </button>
        </div>

        <div className='flex flex-col gap-3 p-4 border-t-2 border-zinc-600 text-base sm:text-lg'>
          <Resultados busqueda={busqueda}/>
        </div>

        <div className='absolute bottom-2 text-sm'>
          La búsqueda se hace sobre el Indec, BCRA, etc.
        </div>
      </div>
    </div>
  )
}
