import { useEffect } from 'react';

export default function DropdownMenu({optionArray, selectedOption, setOption}) {
  useEffect(() => {
    setOption(selectedOption);
  }, [])
  
  const customStyle = {
    option: (base, state) => ({
      ...base,
      backgroundColor: 'blue',
    })
  }

  return (
    <div className='mt-1 sm:mt-0'>
      <div className={`absolute w-24 sm:w-40 ml-1 sm:text-xl sm:p-1 truncate whitespace-nowrap `}>
        <select defaultValue={selectedOption} onChange={(e) => setOption(e.target.value)} className='sm:h-10 font-fira rounded-md text-white bg-transparent h-7 '>
          {optionArray.map(option => (
            <option className='text-black truncate'>
              {option}
            </option>)
          )}
        </select>
      </div>
    </div>
  )
}
