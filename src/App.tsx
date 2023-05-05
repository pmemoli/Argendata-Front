import {useState, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/header/Header';
import Home from './pages/Home';
import Dolar from './datos/Dolar';
import Inflacion from './datos/Inflacion';
import Emision from './datos/Emision';
import Crimen from './datos/Crimen';
import Empleo from './datos/Empleo';
import Pobreza from './datos/Pobreza';
import Producto from './datos/Producto';
import Barrios from './datos/Barrios';
import Merval from './datos/Merval';
import Cortes from './datos/Cortes';
import Contribucion from './pages/Contribucion';
import Riesgo from './datos/Riesgo';
import Gasto from './datos/Gasto';
import Ingresos from './datos/Ingresos';

interface data {
  nombre: string,
  datosActuales: {
    [dato: string] : number,
  },
  datosHistoricos: {
    [dato: string] : number,
  }
}

interface mixedData {
  [tipoDato: string]: data
}

interface cacheData {
  [nombreDataset: string]: {
    datos: data | mixedData | Uint8Array,
    ultimaActualizacionCache: Date,
    ultimaActualizacionApi: string,
  }
}

const savedState: string = localStorage.getItem('cacheArgendata');

const test = JSON.parse(savedState, (key, value) => {
  if (key === 'ultimaActualizacion') {
    return new Date(value);
  } else {
    return value;
  }
});

function App() {
  const [cacheData, setCacheData] = useState<cacheData>(test);
  
  useEffect(() => {
    if (cacheData !== null) {
      let cacheCopy = {...cacheData};
      if (cacheData.barrios !== undefined) delete cacheCopy['barrios'];
      
      try {
        localStorage.setItem('cacheArgendata', JSON.stringify(cacheCopy));
      }

      catch(e) {console.log(e)}
    }
  }, [cacheData]);

  return (
    <div className='flex flex-col justify-between min-h-screen bg-[hsl(215,21%,11%)] text-gray-200 font-fira font-thin'>
      <Header/>
    
      <div className='flex-grow mt-4'>
        <Routes>
          <Route path='/' element={<Home cacheData={cacheData} setCacheData={setCacheData}/>}></Route>
          <Route path='/dolar' element={<Dolar modo='pagina' cacheData={cacheData} setCacheData={setCacheData}/>}></Route>
          <Route path='/inflacion' element={<Inflacion modo='pagina' cacheData={cacheData} setCacheData={setCacheData}/>}></Route>
          <Route path='/emision' element={<Emision modo='pagina' cacheData={cacheData} setCacheData={setCacheData}/>}></Route>
          <Route path='/crimen' element={<Crimen modo='pagina' cacheData={cacheData} setCacheData={setCacheData}/>}></Route>
          <Route path='/empleo' element={<Empleo modo='pagina' cacheData={cacheData} setCacheData={setCacheData}/>}></Route>
          <Route path='/pobreza' element={<Pobreza modo='pagina' cacheData={cacheData} setCacheData={setCacheData}/>}></Route>
          <Route path='/producto' element={<Producto modo='pagina' cacheData={cacheData} setCacheData={setCacheData}/>}></Route>
          <Route path='/merval' element={<Merval modo='pagina' cacheData={cacheData} setCacheData={setCacheData}/>}></Route>
          <Route path='/barrios' element={<Barrios modo='pagina' cacheData={cacheData} setCacheData={setCacheData}/>}></Route>
          <Route path='/cortes' element={<Cortes modo='pagina' cacheData={cacheData} setCacheData={setCacheData}/>}></Route>
          <Route path='/riesgo' element={<Riesgo modo='pagina' cacheData={cacheData} setCacheData={setCacheData}/>}></Route>
          <Route path='/gasto' element={<Gasto modo='pagina' cacheData={cacheData} setCacheData={setCacheData}/>}></Route>
          <Route path='/ingresos' element={<Ingresos modo='pagina' cacheData={cacheData} setCacheData={setCacheData}/>}></Route>

          <Route path='/contribucion' element={<Contribucion/>}></Route>
        </Routes>
      </div>

      <Footer/>
    </div>
  );
}

export default App;
