import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import Products from './views/Products';

function App() {
  return (
    <Routes>
      <Route path='/' />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/products' element={<Products />} />
    </Routes>
  );
}

export default App;
