import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './services/protectRoute';
import Home from "./pages/home";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import AddProduct from './pages/addProduct';

function App() {
  return (
    <Routes>
    <Route path='/' element={
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    } />
    <Route path='/add-product' element={
      <ProtectedRoute>
        <AddProduct />
      </ProtectedRoute>
    } />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
    </Routes>
  );
}

export default App;
