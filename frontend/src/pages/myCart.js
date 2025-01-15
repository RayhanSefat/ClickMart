import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../templates/navbar";
import getCurrentUsername from "../services/getCurrentUsername";
import processImagePath from "../services/processImagePath";

export default function MyCart() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const username = getCurrentUsername();

        // Fetch cart data for the current user
        const cartResponse = await axios.get(
          `http://localhost:5000/api/cart/get-cart-by-user/${username}`
        );
        console.log(cartResponse.data["cart"]);

        const productIDs = cartResponse.data["cart"][0]["productID"];
        const quantities = cartResponse.data["cart"][0]["quantity"];
        console.log(productIDs);
        console.log(quantities);

        if (productIDs.length !== quantities.length) {
          throw new Error("Product IDs and quantities mismatch.");
        }

        // Fetch detailed product information for each productID
        const productDetailsPromises = productIDs.map((productID) =>
          axios.get(
            `http://localhost:5000/api/products/get-product-by-id/${productID}`
          )
        );

        const productDetailsResponses = await Promise.all(
          productDetailsPromises
        );

        // Combine product details with cart quantities
        const combinedData = productDetailsResponses.map((response, index) => ({
          ...response.data, // Product details
          quantityInCart: quantities[index], // Quantity from cart
        }));

        setCartItems(combinedData);
      } catch (error) {
        setError("Failed to load cart items. Please try again.");
        console.error(error);
      }
    }

    fetchCartItems();
  }, []);

  async function upadateCartProductQuantity(product, updatedQuantity) {
    try {
      const username = getCurrentUsername();

      // Update the quantity in the backend
      await axios.put(`http://localhost:5000/api/cart/update-cart`, {
        username,
        productID: product._id,
        quantity: updatedQuantity,
      });

      // Update the quantity in the frontend
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantityInCart: updatedQuantity }
            : item
        )
      );
    } catch (error) {
      setError("Failed to update quantity. Please try again.");
      console.error(error);
    }
  }

  function decreaseQuantity(product) {
    const updatedQuantity = product.quantityInCart - 1;
    upadateCartProductQuantity(product, updatedQuantity);
  }

  function increaseQuantity(product) {
    const updatedQuantity = product.quantityInCart + 1;
    upadateCartProductQuantity(product, updatedQuantity);
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2 className="text-primary">My Cart</h2>
        {error && <p className="text-danger">{error}</p>}
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {cartItems.length > 0 ? (
            cartItems.map((product, index) => (
              <div className="col" key={index}>
                <div className="card mb-3" style={{ maxWidth: "18rem" }}>
                  <h5 className="text-danger">{product.name}</h5>
                  <img
                    src={processImagePath(product.imagePath)}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <p className="card-text">
                      {product.description || "No description available."}
                    </p>
                    <p className="text-success">
                      <strong>Price:</strong> BDT {product.price}
                    </p>
                    <p className="text-success">
                      <strong>Available quantity:</strong>{" "}
                      {product.quantityAvailable}
                    </p>
                    <p className="text-success">
                      <strong>Quantity in Cart:</strong>{" "}
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => decreaseQuantity(product)}
                      >
                        -
                      </button>{" "}
                      {product.quantityInCart}{" "}
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => increaseQuantity(product)}
                      >
                        +
                      </button>
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        Category: {product.category || "Uncategorized"}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items in cart.</p>
          )}
        </div>
      </div>
    </div>
  );
}
