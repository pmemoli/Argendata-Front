import React, {useState} from 'react'
import Modal from 'react-modal'

const customStyles = {
    content: {
      top: '50%',
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

export default function Instrucciones() {
    const [modalIsOpen, setIsOpen] = useState(false)

    function closeModal() {
      setIsOpen(false)
    }

    return (
    <div>
        <button onClick={() => setIsOpen(true)} className='hover:text-stroke'>
            Como usar
        </button>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Informacion"
          style={customStyles}
          ariaHideApp={false}
        >
          <img className='sm:h-[87vh]' src={require('../../../assets/instrucciones.png')}></img>
        </Modal>
    </div>
    )
}
