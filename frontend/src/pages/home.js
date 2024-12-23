import React, { useEffect, useState } from "react";
import Navbar from "../templates/navbar";
import axios from "axios";
import processImagePath from "../services/processImagePath";
import getCurrentUsername from "../services/getCurrentUsername";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/get-all-products-except-user/${getCurrentUsername()}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div className="card mb-3" style={{ maxWidth: "18rem" }}>
              <h5 className="text-danger">{product.name}</h5>
              <img
                src={processImagePath(product.imagePath)}
                className="card-img-top"
                alt={product.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="">
                <p className="card-text">
                  {product.description || "No description available."}
                </p>
                <p className="text-success">
                  <strong>Price:</strong> BDT {product.price}
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    Category: {product.category || "Uncategorized"}
                  </small>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Products are loading...</p>
        )}
      </div>
    </div>
  );
}
