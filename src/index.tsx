import { BrowserRouter } from 'react-router-dom';
import {ProSidebarProvider} from 'react-pro-sidebar';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ProSidebarProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProSidebarProvider>
);
