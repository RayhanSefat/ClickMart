import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/home";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
    </Routes>
  );
}

export default App;
