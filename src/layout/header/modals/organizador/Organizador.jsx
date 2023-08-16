import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'
import DragTable from './DragTable'

export default function Organizador({organizacionHome, setOrganizacionHome}) {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
  
    window.addEventListener('resize', handleResize)
  
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  function closeModal() {
    setIsOpen(false)
  }

  const customStyles = {
    content: {
      position: 'absolute', // Make sure this is relative
      margin: 'auto', // Centralize the modal in the overlay flex container
      maxWidth: windowWidth <= 600 ? '14.5rem' : '29rem',
      maxHeight: windowWidth <= 600 ? '80%' : '25rem',
      whiteSpace: 'pre-line',
      wordBreak: 'break-word',
      fontSize: '1rem',
      backgroundColor: 'rgba(22, 27, 34, 1)',
    },
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(22, 25, 27, 0.40)',
      zIndex: 1000
    }
  }
  
  return (
    <div className=''>
      <button onClick={() => setIsOpen(true)}>
        Organizar Inicio
      </button>

      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Organizador"
          style={customStyles}
          ariaHideApp={false}
        >
        <div className='flex flex-col justify-between h-full'>
          <DragTable organizacionHome={organizacionHome} setOrganizacionHome={setOrganizacionHome}/>

          <div className='mt-2 text-sm text-white flex justify-between items-center'>
            <p>
              Se pueden agregar hasta 10 datos.
            </p>

            <button onClick={() => {
              setOrganizacionHome([
                {id: 'dolar', name: 'Dólar'}, {id: 'inflacion', name: 'Inflación'},
                {id: 'pobreza', name: 'Pobreza'}, {id: 'ingresos', name: 'Ingresos'},
                {id: 'basemonetaria', name: 'Base Monetaria'}, {id: 'reservas', name: 'Reservas del BCRA'},  
                {id: 'riesgo', name: 'Riesgo'}, {id: 'merval', name: 'Merval'},  
                {id: 'producto', name: 'Producto'}, {id: 'gasto', name: 'Gasto'}
              ])
            }} 
            className='bg-gray-800 p-1 w-[6.5rem] sm:w-auto rounded-md sm:p-2'>
              Reiniciar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
