import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
 
  return isAuthenticated ? (
    user.isVarified ? (
      <Outlet />
    ) : (
      <Navigate to="/verify-email" />
    )
  ) : (
    <Navigate to="/signin" />
  );
}

export default PrivateRoute;
