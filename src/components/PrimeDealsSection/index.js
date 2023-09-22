import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { ThreeDots } from 'react-loader-spinner';
import ProductCard from '../ProductCard';
import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

function PrimeDealsSection() {
  const [primeDeals, setPrimeDeals] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    getPrimeDeals();
  }, []);

  const getPrimeDeals = async () => {
    setApiStatus(apiStatusConstants.inProgress);

    const jwtToken = Cookies.get('jwt_token');

    const apiUrl = 'https://apis.ccbp.in/prime-deals';
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };

    try {
      const response = await fetch(apiUrl, options);
      console.log(response)
      if (response.ok === true) {
        const fetchedData = await response.json();
        const updatedData = fetchedData.prime_deals.map((product) => ({
          title: product.title,
          brand: product.brand,
          price: product.price,
          id: product.id,
          imageUrl: product.image_url,
          rating: product.rating,
        }));
        setPrimeDeals(updatedData);
        setApiStatus(apiStatusConstants.success);
      } 
      else if (response.status === 401) {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const renderPrimeDealsList = () => {
    return (
      <div>
        <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
        <ul className="products-list">
          {primeDeals.map((product) => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    );
  };

  const renderPrimeDealsFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
      alt="Register Prime"
      className="register-prime-image"
    />
  );

  const renderLoadingView = () => (
    <div className="products-loader-container">
      <ThreeDots type="ThreeDots" color="#0b69ff" height={50} width={50} />
    </div>
  );

  switch (apiStatus) {
    case apiStatusConstants.success:
      return renderPrimeDealsList();
    case apiStatusConstants.failure:
      return renderPrimeDealsFailureView();
    case apiStatusConstants.inProgress:
      return renderLoadingView();
    default:
      return null;
  }
}

export default PrimeDealsSection;






























/* import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import ProductCard from '../ProductCard';
import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

function PrimeDealsSection() {
  const [primeDeals, setPrimeDeals] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    getPrimeDeals();
  }, []);

  const getPrimeDeals = async () => {
    setApiStatus(apiStatusConstants.inProgress);

    const jwtToken = Cookies.get('jwt_token');

    const apiUrl = 'https://apis.ccbp.in/prime-deals';
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };
    const response = await fetch(apiUrl, options);

    if (response.ok === true) {
      const fetchedData = await response.json();
      const updatedData = fetchedData.prime_deals.map((product) => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }));
      setPrimeDeals(updatedData);
      setApiStatus(apiStatusConstants.success);
    }

    if (response.status === 401) {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const renderPrimeDealsList = () => (
    <div>
      <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
      <ul className="products-list">
        {primeDeals.map((product) => (
          <ProductCard productData={product} key={product.id} />
        ))}
      </ul>
    </div>
  );

  const renderPrimeDealsFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
      alt="Register Prime"
      className="register-prime-image"
    />
  );

  switch (apiStatus) {
    case apiStatusConstants.success:
      return renderPrimeDealsList();
    case apiStatusConstants.failure:
      return renderPrimeDealsFailureView();
    default:
      return null;
  }
}

export default PrimeDealsSection;
 */