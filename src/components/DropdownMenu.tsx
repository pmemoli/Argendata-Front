import Select from 'react-select';

export default function DropdownMenu({optionArray, selectedOption, setOption}): JSX.Element {  
  const hiddenOptions = optionArray.includes('2do trimestre 2020') ? 'w-16 overflow-x-hidden sm:w-60' : ''

  function handleSelect(option): void {
    setOption(option);
  }
  
  const customStyle: any = {
    option: (base, state) => ({
      ...base,
      backgroundColor: 'blue',
    })
  }

  return (
    <div className='mt-1'>
      <div className={`absolute ${hiddenOptions} ml-1 z-[3] sm:text-xl sm:p-1`}>
        <select onChange={(e) => setOption(e.target.value)} className='sm:h-10 font-fira rounded-md text-white bg-transparent h-7 '>
          {optionArray.map(option => (<option className='text-black'>{option}</option>))}
        </select>
      </div>
    </div>
  )
}
