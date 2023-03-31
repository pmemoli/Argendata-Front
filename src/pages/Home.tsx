import Crimen from "../datos/Crimen"
import Dolar from "../datos/Dolar"
import Emision from "../datos/Emision"
import Inflacion from "../datos/Inflacion"

export default function Home() {
  return (
    <div className='flex flex-col min-h-full'>
      <Dolar modo='carta'/>
      <Inflacion modo='carta'/>
      <Crimen modo='carta'/>
      <Emision modo='carta'/>
    </div>
  )
}
