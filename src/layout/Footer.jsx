import {useLocation} from 'react-router-dom'

export default function Footer() {
  const location = useLocation()

  function renderCafecito() {
    if (location.pathname === '/donar') {
      return <></>
    }
    else {
      return (
        <a className='flex items-center mr-1 z-[1]' href='https://cafecito.app/argendata' rel='noopener' target='_blank'>
          <img className='h-6' srcset='https://cdn.cafecito.app/imgs/buttons/button_5.png 1x, https://cdn.cafecito.app/imgs/buttons/button_5_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_5_3.75x.png 3.75x' src='https://cdn.cafecito.app/imgs/buttons/button_5.png' alt='Invitame un café en cafecito.app' />
        </a>
      )
    }
  }

  return (
    <div className='border-t border-gray-500 sm:mt-2'>
      <div className='flex justify-between'>
        <div className='flex items-center relative z-[1] ml-2 mb-1 mt-1 gap-2'>
          <a href="mailto:demnitth@gmail.com" target="_blank" className='mb-1 ml-1'>
            <img className='w-5' src={require('../assets/mail.png')}/>  
          </a> 

          <a href="https://github.com/pmemoli/Argendata-Front" target="_blank" className='mb-1 ml-1'>
            <img className='w-5' src={require('../assets/github.png')}/>  
          </a>
        </div>

        {renderCafecito()}
      </div>
    </div>
  )
}
