import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom'
import Clientes from './Clientes';
import Factura from './Factura';

const App = () => {
  return (
      <Routes>
        <Route exact path="/" element={<Clientes />} />
        <Route path="/factura" element={<Factura/>} />
      </Routes>
  );
};

export default App;
