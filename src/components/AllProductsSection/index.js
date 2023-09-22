import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import Cookies from 'js-cookie';

import ProductCard from '../ProductCard';
import ProductsHeader from '../ProductsHeader';
import './index.css';

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
];

function AllProductsSection() {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeOptionId, setActiveOptionId] = useState(sortbyOptions[0].optionId);

  useEffect(() => {
    getProducts();
  }, [activeOptionId]);

  const getProducts = async () => {
    setIsLoading(true);
    const jwtToken = Cookies.get('jwt_token');
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };

    try {
      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const fetchedData = await response.json();
        const updatedData = fetchedData.products.map((product) => ({
          title: product.title,
          brand: product.brand,
          price: product.price,
          id: product.id,
          imageUrl: product.image_url,
          rating: product.rating,
        }));
        setProductsList(updatedData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.error('Error fetching products');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error);
    }
  };

  const updateActiveOptionId = (newActiveOptionId) => {
    setActiveOptionId(newActiveOptionId);
  };

  const renderProductsList = () => (
    <>
      <ProductsHeader
        activeOptionId={activeOptionId}
        sortbyOptions={sortbyOptions}
        updateActiveOptionId={updateActiveOptionId}
      />
      <ul className="products-list">
        {productsList.map((product) => (
          <ProductCard productData={product} key={product.id} />
        ))}
      </ul>
    </>
  );

  const renderLoader = () => (
    <div className="products-loader-container">
      <ThreeDots type="ThreeDots" color="#0b69ff" height={50} width={50} />
    </div>
  );

  return isLoading ? renderLoader() : renderProductsList();
}

export default AllProductsSection;
