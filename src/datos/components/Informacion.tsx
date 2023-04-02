import {useState} from 'react';
import Modal from 'react-modal';

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
      
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.40)',
    zIndex: 1000
  }
};

export default function Informacion({texto}: {texto: string}): JSX.Element {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className='p-1 absolute right-2'>
      <button onClick={() => setIsOpen(true)}>
        <img className='w-5' src={require('../../assets/information.png')}></img>
      </button>

      <div className='z-[2]'>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Informacion"
          style={customStyles}
          ariaHideApp={false}
        >
          {texto}
        </Modal>
      </div>
    </div>
  )
}
