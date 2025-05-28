import './index.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
// import StoreContextProvider from './context/StoreContext.jsx'
import { StoreProvider } from './context/StoreContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
 <StoreProvider>
 <App />
 </StoreProvider>
 
  </BrowserRouter>


)
