import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Products from './components/Products';
import ProductItemDetails from './components/ProductItemDetails';
import Cart from './components/Cart';
import NotFound from './components/NotFound';

import CartContext from './context/CartContext';

import './App.css';

const App = () => {
  const [cartList, setCartList] = useState([]);

  const addCartItem = (product) => {
    console.log(product);
    setCartList((prevCartList) => [...prevCartList, product]);
  };

  const deleteCartItem = (productId) => {
    setCartList((prevCartList) =>
      prevCartList.filter((item) => item.id !== productId)
    );
  };

  return (
    <BrowserRouter>
      <CartContext.Provider
        value={{
          cartList: cartList,
          addCartItem: addCartItem,
          deleteCartItem: deleteCartItem,
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductItemDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  );
};
export default App;