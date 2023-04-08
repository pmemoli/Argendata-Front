import BarriosPopulares from "../datos/Barrios";
import Crimen from "../datos/Crimen";
import Dolar from "../datos/Dolar";
import Emision from "../datos/Emision";
import Empleo from "../datos/Empleo";
import Inflacion from "../datos/Inflacion";
import Finanzas from "../datos/Finanzas";
import Pobreza from "../datos/Pobreza";
import Producto from "../datos/Producto";

export default function Home({cacheData, setCacheData}) {
  return (
    <div className='flex flex-col min-h-full sm:grid lg:grid-cols-3 sm:gap-2 sm:ml-5 sm:mr-5 '>
      <span className='sm:col-span-2'><Dolar modo='carta' cacheData={cacheData} setCacheData={setCacheData}/></span>
      <Inflacion modo='carta'  cacheData={cacheData} setCacheData={setCacheData}/>
      <Crimen modo='carta'  cacheData={cacheData} setCacheData={setCacheData}/>
      <span className='sm:col-span-2'><Pobreza modo='carta'  cacheData={cacheData} setCacheData={setCacheData}/></span>
      <span className='sm:col-span-2'><Producto modo='carta'  cacheData={cacheData} setCacheData={setCacheData}/></span>
      <Empleo modo='carta'  cacheData={cacheData} setCacheData={setCacheData}/>
      <Emision modo='carta'  cacheData={cacheData} setCacheData={setCacheData}/>
      <span className='sm:col-span-2'><Finanzas modo='carta'  cacheData={cacheData} setCacheData={setCacheData}/></span>
    </div>
  )
}
