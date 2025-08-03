import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../templates/navbar";
import getCurrentUsername from "../services/getCurrentUsername";

export default function Billing() {
  const [billingItems, setBillingItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBillingDetails() {
      try {
        const username = getCurrentUsername();
        const response = await axios.get(
          `http://localhost:5000/api/cart/get-billing-details/${username}`
        );
        setBillingItems(response.data.billingItems);
        setTotalAmount(response.data.totalAmount);
      } catch (error) {
        setError("Failed to load billing details. Please try again.");
        console.error(error);
      }
    }

    fetchBillingDetails();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>Billing Details</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="list-group">
            {billingItems.length > 0 ? (
                billingItems.map((item, index) => (
                <div key={index} className="list-group-item">
                    <h5>{item.productName}</h5>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                </div>
                ))
            ) : (
                <p>No billing details available.</p>
            )}
            <div>
                <h4>Total Amount: ${totalAmount.toFixed(2)}</h4>
            </div>
        </div>
      </div>
    </div>
  );
}