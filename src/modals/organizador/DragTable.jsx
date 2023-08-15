import React, {useEffect, useState} from 'react'
import {datosDisponibles} from '../../datos/fetch/getDatosDisponibles'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

function getDisponibles(organizacionActual) {
  const datosCompletos = []

  for (let key of Object.keys(datosDisponibles)) {
    if (key !== 'Mapas') {
      for (let value of datosDisponibles[key]) {
        datosCompletos.push({id: value.path, name: value.nombre})
      } 
    }
  }

  const disponibles = datosCompletos.filter(itemDisp => !organizacionActual.some(itemOrg => itemOrg.id === itemDisp.id))

  return disponibles
}

export default function DragTable({organizacionHome, setOrganizacionHome}) {
  const [listas, setListas] = useState({
    'home': organizacionHome,
    'disponibles': getDisponibles(organizacionHome)
  })

  useEffect(() => {
    setListas({
      'home': organizacionHome,
      'disponibles': getDisponibles(organizacionHome)
    })
  }, [organizacionHome])

  useEffect(() => {
    setOrganizacionHome(listas.home)
  }, [listas])

  function onDragEnd(result) {
    const { source, destination } = result;
  
    // Dropped outside the list or same location
    if (!destination) {
      return;
    }
  
    if (source.droppableId === destination.droppableId) {
      // Rearrange in the same list
      const items = Array.from(listas[source.droppableId]);
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);
      setListas((prev) => ({ ...prev, [source.droppableId]: items }))
    } 
    else {
      // Move to another list
      if (destination.droppableId === 'home' && listas.home.length === 10) return
      if (destination.droppableId === 'disponibles' && listas.home.length === 1) return

      const sourceItems = Array.from(listas[source.droppableId]);
      const destinationItems = Array.from(listas[destination.droppableId]);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, movedItem);
      setListas((prev) => ({
        ...prev,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destinationItems,
      }))
    }
  }
  
  return (
    <div className='text-white'>
      <DragDropContext onDragEnd={onDragEnd}>
          <div className='flex flex-col gap-4 sm:flex-row sm:gap-10'>
          {/*Droppable de datos en Home*/}
          <div>
            <h3 className='text-lg mb-2'>Orden en Inicio:</h3>
            <div className='p-3 pl-4 border-2 border-zinc-600 rounded-md w-48'>
            <Droppable droppableId={'home'} key={'home'}>
              {(provided) => (
                <ul className={'home'} {...provided.droppableProps} ref={provided.innerRef}>
                  {listas['home'].map(({id, name}, index) => (

                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li className='text-white' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          {name}
                        </li>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
            </div>
          </div>

          <div>
            <h3 className='text-lg mb-2'>Datos Disponibles:</h3>
            <div className='p-3 pl-4 border-2 border-zinc-600 rounded-md  w-48'>

            <Droppable droppableId={'disponibles'} key={'disponibles'}>
              {(provided) => (
                <ul className={'disponibles'} {...provided.droppableProps} ref={provided.innerRef}>
                  {listas['disponibles'].map(({id, name}, index) => (

                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li className='text-white' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          {name}
                        </li>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
            </div>
          </div>

        </div>
      </DragDropContext>
    </div>
  )
}
