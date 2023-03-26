import {Route, Routes} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/header/Header';
import Home from './pages/Home';
import Dolar from './datos/Dolar';
import Inflacion from './datos/Inflacion';
import Emision from './datos/Emision';

function App() {
  return (
    <div className='flex flex-col justify-between min-h-screen bg-slate-800 text-gray-200 font-fira font-thin'>
      <Header/>
    
      <div className='flex-grow mt-9'>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/dolar' element={<Dolar modo='pagina'/>}></Route>
          <Route path='/inflacion' element={<Inflacion modo='pagina'/>}></Route>
          <Route path='/emision' element={<Emision modo='pagina'/>}></Route>
        </Routes>
      </div>

      <Footer/>
    </div>
  );
}

export default App;
