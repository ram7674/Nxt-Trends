import React from 'react'

const CartContext = React.createContext({
/*   cartList: [
    {
      title: "Products",
      brand: 'Brand Name',
      id: 1001,
      imageUrl: 'favicon.ico',
      price: 880,
      quantity: 1,
    },
    {
      title: "Products",
      brand: 'Brand Name',
      id: 1001,
      imageUrl: 'favicon.ico',
      price: 85,
      quantity: 1,
    },
  ], */
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
})

export default CartContext