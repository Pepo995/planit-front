import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Login from './views/Login';
import Products from './views/Products';
import Register from './views/Register';

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
