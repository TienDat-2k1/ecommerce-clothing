import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/header/Header';
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
