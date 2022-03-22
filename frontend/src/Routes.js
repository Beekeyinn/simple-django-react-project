import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import Cart from "./core/Cart";
import Home from "./core/Home";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import UserDashboard from "./user/UserDashboard";

const OwnRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="register" exact element={<SignUp />} />
        <Route path="login" exact element={<SignIn />} />
        <Route element={<PrivateRoutes />}>
          <Route path="dashboard" exact element={<UserDashboard />} />
          <Route path="cart" exact element={<Cart />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default OwnRoutes;
