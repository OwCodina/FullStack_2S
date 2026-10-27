import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/tema.css';
import App from './App.jsx';
import { RolProvider } from './context/RolContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RolProvider>
        <App />
      </RolProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
