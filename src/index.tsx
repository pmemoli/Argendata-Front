import { BrowserRouter } from 'react-router-dom';
import {ProSidebarProvider} from 'react-pro-sidebar';
import ReactDOM from 'react-dom/client';
import ReactGA from "react-ga4";
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

ReactGA.initialize("G-ES40M8VMEQ");

root.render(
  <ProSidebarProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProSidebarProvider>
);

const SendAnalytics = ()=> {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
  });
}
