import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  const token = localStorage.getItem('authToken'); // Get the saved token
  if (!token) return false; // If there's no token, the user isn't signed in

  try {
      // Decode the token and check if it's expired
      const decoded = JSON.parse(atob(token.split('.')[1])); // Get the payload
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decoded.exp > currentTime; // True if the token hasn't expired
  } catch (err) {
      return false; // Invalid token
  }
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;