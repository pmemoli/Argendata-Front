import Select from 'react-select';

export default function DropdownMenu({optionArray, selectedOption, setOption}): JSX.Element {  
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
      <div className='absolute ml-1 z-[3] sm:text-xl sm:p-1'>
        <select onChange={(e) => setOption(e.target.value)} className='sm:h-10 font-fira rounded-md text-white bg-transparent h-7'>
          {optionArray.map(option => (<option className='text-black'>{option}</option>))}
        </select>
      </div>
    </div>
  )
}
