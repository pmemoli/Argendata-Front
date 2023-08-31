import React, {useEffect, useRef, useState} from 'react'

// Todo este codigo relacionado a agregar mas de un grafico es ASQUEROSO.
// Lo hice en un dia para sacarmelo de encima, se modularizara en algun punto de la historia.
export default function CompareOptions({setComparar, datos, bar}) {
  const refCategoria = [useRef(), useRef()]
  const refDato = [useRef(), useRef()]

  const [show, setShow] = useState([false, false])

  function updateComparar(showIndex) {    
    if (!show[showIndex]) {      
      setComparar(prevComparar => {
      const newComparar = [...prevComparar]
      newComparar[showIndex] = null
      return newComparar
    })}

    else {
      const nombre = `${bar ? 'Distribución' : refDato[showIndex].current.value} - ${refCategoria[showIndex].current.value}`
      const valores = datos[refCategoria[showIndex].current.value]['datosHistoricos'][refDato[showIndex].current.value]
      const datosActuales = datos[refCategoria[showIndex].current.value]['datosActuales'][refDato[showIndex].current.value]

      let fechas
      if (Array.isArray(datos[refCategoria[showIndex].current.value].fechas)) {
        fechas = datos[refCategoria[showIndex].current.value].fechas.map(fecha => fecha.toString())
      }
      else {
        fechas = datos[refCategoria[showIndex].current.value].fechas[refDato[showIndex].current.value].map(fecha => fecha.toString())
      }      

      if (datosActuales !== undefined) {
        valores.push(datosActuales)
      }

      setComparar(prevComp => {
        const newComp = [...prevComp]

        newComp[showIndex] = {
          nombre: nombre.length > 40 ? nombre.slice(0, 40) + '...' : nombre,
          valores: valores,
          fechas: fechas,
        }

        return newComp
      })
    }
  }

  function update() {
    updateComparar(0)
    updateComparar(1)
  }

  useEffect(() => {
    update()
  }, [show])

  return (
    <div className='mb-5 sm:mt-5'>
      <div className='grid grid-cols-3 gap-2 justify-between'>
        <span>Comparar</span>
        <span>Categoria</span>
        <span>Dato</span>

        <input onChange={() => {
          setShow(prevShow => {
            const newShow = [...prevShow]
            newShow[0] = !newShow[0]
            return newShow}) 
          }} className=' justify-self-start ml-1 w-4' type="checkbox"/>

        <select ref={refCategoria[0]} onChange={update} className='text-white bg-transparent'>
          {Object.keys(datos).map(dato => (
            <option className='text-black'>{dato}</option>
          ))}
        </select>

        <select ref={refDato[0]} onChange={update} className='text-white bg-transparent'>
          {Object.keys(datos[Object.keys(datos)[0]]['datosHistoricos']).map(dato => (
            <option className='text-black'>{dato}</option>
          ))}
        </select>

        <input onChange={() => {setShow(prevShow => {
          const newShow = [...prevShow]
          newShow[1] = !newShow[1]
          return newShow
        })}} className={`${!show[0] && !show[1] ? 'hidden' : ''} justify-self-start ml-1 w-4`} type="checkbox"/>

        <select ref={refCategoria[1]} onChange={update} className={`${!show[0] && !show[1] ? 'hidden' : ''} text-white bg-transparent`}>
          {Object.keys(datos).map(dato => (
            <option className='text-black'>{dato}</option>
          ))}
        </select>

        <select ref={refDato[1]} onChange={update} className={`${!show[0] && !show[1] ? 'hidden' : ''} text-white bg-transparent`}>
          {Object.keys(datos[Object.keys(datos)[0]]['datosHistoricos']).map(dato => (
            <option className='text-black'>{dato}</option>
          ))}
        </select>
      </div>

      <div className='mt-4 sm:mt-3 text-xs sm:text-sm'>¡Cuidado con los datos en escalas distintas!</div>
    </div>
  )
}
