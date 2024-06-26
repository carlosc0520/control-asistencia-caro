// src/index.js
import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EnviarQR from './views/EnviarQR';
import Index from './views/Index';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Index />} />
        <Route path="enviar-codigo-qr" element={<EnviarQR />} />
        <Route path="registrar-asistencia" element={<Index />} />
      </Route>
    </Routes>
  </Router>
</React.StrictMode>
);

reportWebVitals();
