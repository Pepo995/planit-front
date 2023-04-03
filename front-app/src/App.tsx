import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import Products from './views/Products';
import Product from './views/Product';

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
