import {useState} from 'react'
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
  },
  overlay: {
    backgroundColor: 'rgba(22, 25, 27, 0.40)',
    zIndex: 1000
  }
}

function convertDateFormat(inputDate) {
  // Split the date string into [mm, dd, yyyy]
  let parts = inputDate.split('/')

  // Pad single digit day or month with leading zero
  let day = parts[1].padStart(2, '0')
  let month = parts[0].padStart(2, '0')

  // Rearrange the parts and join with dashes
  let outputDate = [day, month, parts[2]].join('-')

  return outputDate
}

export default function Informacion({texto, createdAt}) {
  const [modalIsOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div className='p-1 absolute right-2'>
      <button onClick={() => setIsOpen(true)}>
        <img className='w-5 sm:w-7' src={require('../../../assets/information.png')}></img>
      </button>

      <div className='z-[2]'>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Informacion"
          style={customStyles}
          ariaHideApp={false}
        >
          {texto + `\n\nUltima actualizacion: ${convertDateFormat(createdAt)}`}
        </Modal>
      </div>
    </div>
  )
}
