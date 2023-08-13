import { useEffect, useState } from "react"
import DatoAnalitico from "../datos/DatoAnalitico"

export default function Home({cacheData, setCacheData, organizacionHome}) {
  const [componentesHome, setComponentesHome] = useState([])

  useEffect(() => {
    console.log("OrganizacionHome changed:", organizacionHome);

    let componentesTemp = []

    let i = 0
    let j = 0
  
    for (let dataCarta of organizacionHome) {
      if ((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)) {
        componentesTemp.push(
          <span className='sm:col-span-2' key={dataCarta.id}>
            <DatoAnalitico modo='carta' nombre={dataCarta.id} cacheData={cacheData} setCacheData={setCacheData}/>
          </span>
        )
      }
  
      else if ((i % 2 === 1 && j % 2 === 0) || (i % 2 === 0 && j % 2 === 1)) {
        componentesTemp.push(
          <DatoAnalitico modo='carta' key={dataCarta.id} nombre={dataCarta.id} cacheData={cacheData} setCacheData={setCacheData}/>
        )
      }
  
      if (i % 2 === 1) j++
  
      i++
    }  

    setComponentesHome(componentesTemp)
  }, [organizacionHome])

  return (
    <div className='flex flex-col min-h-full sm:grid lg:grid-cols-3 sm:gap-2 sm:ml-5 sm:mr-5'>
      {componentesHome}
  </div>
  )
}
