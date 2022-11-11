import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';

import CssBaseline from '@mui/material/CssBaseline';
import ProductDetails from './pages/ProductDetails';
import Order from './pages/Order';
import SignUp from './pages/SignUp';
import Success from './pages/Success';
import Shop from './pages/Shop';

const App = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/details/:slug" element={<ProductDetails />} />
          <Route path="/order" element={<Order />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/checkout-success" element={<Success />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
