import { useEffect, useState } from "react"
import DatoAnalitico from "../datos/DatoAnalitico"

export default function Home({organizacionHome}) {
  const [componentesHome, setComponentesHome] = useState([])

  useEffect(() => {
    let componentesTemp = []

    let i = 0
    let j = 0
  
    for (let dataCarta of organizacionHome) {
      if ((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)) {
        componentesTemp.push(
          <span className='sm:col-span-2' key={dataCarta.id}>
            <DatoAnalitico modo='carta' nombre={dataCarta.id}/>
          </span>
        )
      }
  
      else if ((i % 2 === 1 && j % 2 === 0) || (i % 2 === 0 && j % 2 === 1)) {
        componentesTemp.push(
          <DatoAnalitico modo='carta' key={dataCarta.id} nombre={dataCarta.id}/>
        )
      }
  
      if (i % 2 === 1) j++
  
      i++
    }  

    setComponentesHome(componentesTemp)
  }, [organizacionHome])

  return (
    <div className='flex flex-col min-h-full lg:grid lg:grid-cols-2 xl15:grid-cols-3 md:gap-2 md:ml-5 md:mr-5'>
      {componentesHome}
  </div>
  )
}
