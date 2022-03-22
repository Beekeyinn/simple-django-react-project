import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { isAuthenticated } from ".";

const PrivateRoutes = () => {
  let auth = isAuthenticated();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
