import React, { use, useEffect, useState } from "react";
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

  function addToCart(product) {
    axios
      .post("http://localhost:5000/api/cart/add-to-cart", {
        username: getCurrentUsername(),
        productID: product._id,
        quantity: 1,
      })
      .then(() => {
        alert(`${product.name} added to cart successfully!`);
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        alert("Failed to add product to cart.");
      });
  }

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
                <button className="btn btn-primary" onClick={ () => addToCart(product) }>Add to cart</button>
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
