import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Header from '../Header';
import CartListView from '../CartListView' 

import './index.css';

const Cart = () => {
  const navigate = useNavigate()
  
  useEffect(()=>{
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined){
      navigate('/login')
    }
  },[navigate])

  return(
    <>
    <Header />
    <div className="cart-container">
      <div className="cart-content-container">
        <h1 className="cart-heading">My Cart</h1>
        <CartListView />
      </div>
    </div>
  </>
  )
}

export default Cart