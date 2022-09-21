import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignInPage from './pages/auth/SignInPage';
import Checkout from './pages/Checkout/Checkout';
import DetailProduct from './pages/DetailProduct/DetailProduct';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Main from './router/Main';
import './sass/_global.scss';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<DetailProduct />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        <Route path="/auth">
          <Route index element={<SignInPage />} />
          <Route path="sign-up" element={<SignInPage />} />
        </Route>
        <Route path="/admin"></Route>
      </Routes>
    </>
  );
}

export default App;
