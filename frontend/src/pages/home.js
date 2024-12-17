import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('./api/products/get-all-products');
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        {products.length > 0? (
          products.map((product, index) => (
            <div>
              <h3>product.name</h3>
              product.desciption
            </div>
          ))
        ) : (
          <p>Products are loading...</p>
        )}
      </div>
    </div>
  )
};