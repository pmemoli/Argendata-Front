import React, {useState, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
    fontSize: '1rem',
    backgroundColor: 'rgba(22, 27, 34, 1)',
  },
  overlay: {
    backgroundColor: 'rgba(22, 25, 27, 0.40)',
    zIndex: 1000
  }
}

export default function Buscador() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const inputRef = useRef()

  function closeModal() {setIsOpen(false)}


  return (
    <div className='z-[2]'>
      <button className='focus:outline-none' onClick={() => {setIsOpen(true)}}>
        <img className='w-7 sm:w-8 mt-6 mr-2 sm:mr-3 ' src={require('../../../assets/buscador.png')}/>
      </button>

      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Informacion"
          style={customStyles}
          ariaHideApp={false}
      >
        <div>
          <form>
            <input ref={inputRef} className='rounded-sm w-52 sm:w-96 focus:outline-none pl-1' autoFocus/>
            <button type='submit' onClick={() => {
              if (inputRef.current.value !== '') {
                navigate(`/busqueda/${inputRef.current.value}`)
                closeModal()}
              }}
              className='ml-4 text-white text-lg sm:text-xl font-thin rounded-sm pl-2 pr-2'
            >Buscar</button>
          </form>
        </div>
      </Modal>
    </div>
  )
}
