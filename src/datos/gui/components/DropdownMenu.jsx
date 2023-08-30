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
    <div className='absolute sm:mt-0'>
      <div className={`w-24 sm:w-36 ml-1 sm:text-xl truncate whitespace-nowrap hover:font-light`}>
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
