import DatoAnalitico from "../datos/DatoAnalitico"

export default function Home({cacheData, setCacheData}) {
  return (
    <div className='flex flex-col min-h-full sm:grid lg:grid-cols-3 sm:gap-2 sm:ml-5 sm:mr-5'>
      <span className='sm:col-span-2'>
        <DatoAnalitico modo='carta' nombre='dolar' cacheData={cacheData} setCacheData={setCacheData}/>
      </span>
      
      <DatoAnalitico modo='carta' nombre='inflacion' cacheData={cacheData} setCacheData={setCacheData}/>
      <DatoAnalitico modo='carta' nombre='crimen' cacheData={cacheData} setCacheData={setCacheData}/>
      
      <span className='sm:col-span-2'>
        <DatoAnalitico modo='carta' nombre='pobreza' cacheData={cacheData} setCacheData={setCacheData}/>
      </span>
      
      <span className='sm:col-span-2'>
        <DatoAnalitico modo='carta' nombre='producto' cacheData={cacheData} setCacheData={setCacheData}/>
      </span>

      <DatoAnalitico modo='carta' nombre='trabajo' cacheData={cacheData} setCacheData={setCacheData}/>
      <DatoAnalitico modo='carta' nombre='basemonetaria' cacheData={cacheData} setCacheData={setCacheData}/>

      <span className='sm:col-span-2'>
        <DatoAnalitico modo='carta' nombre='ingresos' cacheData={cacheData} setCacheData={setCacheData}/>
      </span>

      <span className='sm:col-span-2'>
        <DatoAnalitico modo='carta' nombre='merval' cacheData={cacheData} setCacheData={setCacheData}/>
      </span>

      <DatoAnalitico modo='carta' nombre='gasto' cacheData={cacheData} setCacheData={setCacheData}/>
    </div>
  )
}
