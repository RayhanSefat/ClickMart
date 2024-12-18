import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/home";
import SignUp from "./pages/signup";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-up' element={<SignUp />} />
    </Routes>
  );
}

export default App;
