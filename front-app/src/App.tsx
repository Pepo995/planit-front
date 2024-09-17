import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Login from './views/Login';
import Product from './views/Product';
import Products from './views/Products';
import Register from './views/Register';

function App() {
  return (
    <Routes>
      <Route path='/' />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/products'>
        <Route index element={<Products />} />
        <Route path=':id' element={<Product />} />
      </Route>
    </Routes>
  );
}

export default App;
