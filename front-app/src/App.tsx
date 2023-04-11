import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import Products from './views/Products';
import Product from './views/Product';
import PersonalInformation from './views/PersonalInformation';
import SuccessfullyUpdated from './views/SuccessfullyUpdated';

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
      <Route path='/personalInformation' element={<PersonalInformation />} />
      <Route path='/SuccessfullyUpdated' element={<SuccessfullyUpdated />} />
    </Routes>
  );
}

export default App;
