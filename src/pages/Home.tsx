import Crimen from "../datos/Crimen";
import Dolar from "../datos/Dolar";
import Emision from "../datos/Emision";
import Empleo from "../datos/Empleo";
import Inflacion from "../datos/Inflacion";
import Pobreza from "../datos/Pobreza";
import Producto from "../datos/Producto";

export default function Home() {
  return (
    <div className='flex flex-col min-h-full'>
      <Dolar modo='carta'/>
      <Inflacion modo='carta'/>
      <Crimen modo='carta'/>
      <Pobreza modo='carta'/>
      <Empleo modo='carta'/>
      <Producto modo='carta'/>
      <Emision modo='carta'/>
    </div>
  )
}
