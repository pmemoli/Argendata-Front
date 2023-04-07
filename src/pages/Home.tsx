import BarriosPopulares from "../datos/Barrios";
import Crimen from "../datos/Crimen";
import Dolar from "../datos/Dolar";
import Emision from "../datos/Emision";
import Empleo from "../datos/Empleo";
import Inflacion from "../datos/Inflacion";
import Finanzas from "../datos/Finanzas";
import Pobreza from "../datos/Pobreza";
import Producto from "../datos/Producto";

export default function Home() {
  return (
    <div className='flex flex-col min-h-full sm:grid lg:grid-cols-3 sm:gap-2 sm:ml-5 sm:mr-5 '>
      <span className='sm:col-span-2'><Dolar modo='carta'/></span>
      <Inflacion modo='carta'/>
      <Crimen modo='carta'/>
      <span className='sm:col-span-2'><Pobreza modo='carta'/></span>
      <span className='sm:col-span-2'><Producto modo='carta'/></span>
      <Empleo modo='carta'/>
      <Emision modo='carta'/>
      <span className='sm:col-span-2'><Finanzas modo='carta'/></span>
    </div>
  )
}
