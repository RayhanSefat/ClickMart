import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './services/protectRoute';
import Home from "./pages/home";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import AddProduct from './pages/addProduct';
import MyProducts from './pages/myProducts';
import MyCart from './pages/myCart';
import Billing from './pages/billing';
import EditMyProduct from './pages/editMyProduct';  

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
    <Route path='/my-products' element={
      <ProtectedRoute>
        <MyProducts />
      </ProtectedRoute>
    } />
    <Route path='/my-cart' element={
      <ProtectedRoute>
        <MyCart />
      </ProtectedRoute>
    } />
    <Route path='/billing' element={
      <ProtectedRoute>
        <Billing />
      </ProtectedRoute>
    } />
    <Route path='/edit-my-product/:id' element={
      <ProtectedRoute>
        <EditMyProduct />
      </ProtectedRoute>
    } />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
    </Routes>
  );
}

export default App;
