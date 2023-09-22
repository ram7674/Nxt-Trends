import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import Header from '../Header'
import AllProductsSection from '../AllProductsSection'
import PrimeDealsSection from '../PrimeDealsSection'

import './index.css'

const Products = () => {
  const navigate = useNavigate()

  useEffect(()=>{  //this useEffect 
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined){
      navigate('/login')
    }
  },[navigate])

  return(
    <>
      <Header />
      <div className='product-sections'>
        <PrimeDealsSection />
        <AllProductsSection />
      </div>
    </>
  )
}

export default Products