import { useEffect } from 'react';
import Select from 'react-select';

export default function DropdownMenu({optionArray, selectedOption, setOption}): JSX.Element {  
  const hiddenOptionsDist = optionArray.includes('2do trimestre 2020') ? 'w-16 overflow-x-hidden sm:w-60' : ''
  const hiddenOptionsIngresos = optionArray.includes('Total') ? 'w-16 overflow-x-hidden sm:w-60' : ''

  useEffect(() => {
    setOption(selectedOption);
  }, [])
  
  const customStyle: any = {
    option: (base, state) => ({
      ...base,
      backgroundColor: 'blue',
    })
  }

  return (
    <div className='mt-1'>
      <div className={`absolute ${hiddenOptionsDist} ${hiddenOptionsIngresos} ml-1 z-[3] sm:text-xl sm:p-1`}>
        <select defaultValue={selectedOption} onChange={(e) => setOption(e.target.value)} className='sm:h-10 font-fira rounded-md text-white bg-transparent h-7 '>
          {optionArray.map(option => (<option className='text-black'>{option}</option>))}
        </select>
      </div>
    </div>
  )
}
